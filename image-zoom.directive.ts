import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input, NgZone, OnDestroy } from '@angular/core';
import { Throttle } from '../decorators/throttle.decorator';

const DEFAULT_MAX_ZOOM_LEVEL = 5;

@Directive({
    selector: '[adeImageZoom]',
    exportAs: 'adeImageZoom',
})
export class ImageZoomDirective implements OnDestroy {
    @Input() maxZoomLevel: number = DEFAULT_MAX_ZOOM_LEVEL;
    @Input() minZoomLevel: number = 1;

    private zoomLevel: number = 1;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private startMouseX: number = 0;
    private startMouseY: number = 0;
    private isPanning: boolean = false;
    private isTrackpadMove: boolean = false;
    private isCmdOrCtrlPressed: boolean = false;
    private rect?: DOMRect;
    private zoomImageEl?: HTMLImageElement;
    private parentElements: HTMLElement[] = [];
    private preventDefaultListener = (event: MouseEvent) => event.preventDefault();

    get isImageMoveable() {
        return this.zoomLevel > 1 && this.isPanning;
    }

    constructor(private el: ElementRef, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

    @Throttle(50)
    @HostListener('wheel', ['$event'])
    onWheel(event: WheelEvent) {
        this.ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                event.preventDefault();
                this.isTrackpadMove = this.detectTrackPadMove(event);
                this.setupRect();
                if (this.isTrackpadMove && !this.isCmdOrCtrlPressed) {
                    if (!this.isPanning) {
                        if (event.deltaX === 0 && event.deltaY === 0) {
                            // Double tap with touchpad to zoom out
                            if (this.rect) {
                                this.handleTransform(1, this.rect.left, this.rect.top);
                            }
                        } else {
                            // Move with touchpad
                            this.isPanning = true;
                            this.startMouseX = event.clientX;
                            this.startMouseY = event.clientY;
                            this.adjustMoveOffset(event.clientX - event.deltaX, event.clientY - event.deltaY);
                            this.updateTransform();
                            this.isPanning = false;
                        }
                    }
                } else if (!this.isPanning) {
                    // Zoom with wheel or CMD/Ctrl + touchpad
                    const delta = Math.sign(event.deltaY) * 0.1 * this.zoomLevel;
                    const newZoomLevel = Math.min(
                        this.maxZoomLevel,
                        Math.max(this.minZoomLevel, this.zoomLevel - delta)
                    );
                    this.adjustOffset(newZoomLevel, event.clientX, event.clientY);
                    this.zoomLevel = newZoomLevel;
                    this.updateTransform();
                }
            });
        });
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Meta' || event.key === 'Control') {
            this.isCmdOrCtrlPressed = true;
        }
    }

    @HostListener('window:keyup', ['$event'])
    handleKeyUp(event: KeyboardEvent): void {
        if (event.key === 'Meta' || event.key === 'Control') {
            this.isCmdOrCtrlPressed = false;
        }
    }

    @HostListener('mousedown', ['$event']) startPan(event: MouseEvent) {
        this.isPanning = true;
        this.startMouseX = event.clientX;
        this.startMouseY = event.clientY;
    }

    @HostListener('mouseup') stopPan() {
        this.isPanning = false;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.isPanning = false;
    }

    @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                this.setupRect();
                if (this.isPanning) {
                    this.adjustMoveOffset(event.clientX, event.clientY);
                    this.updateTransform();
                }
            });
        });
    }

    zoomIn() {
        if (this.zoomLevel < this.maxZoomLevel && this.rect) {
            const newZoomLevel = this.zoomLevel + 1;
            this.adjustOffset(
                newZoomLevel,
                (this.rect.width + this.rect.left) / 2,
                (this.rect.top + this.rect.height) / 2
            );
            this.zoomLevel = Math.min(newZoomLevel, this.maxZoomLevel);
            this.updateTransform();
        }
    }

    zoomOut() {
        if (this.zoomLevel > this.minZoomLevel && this.rect) {
            const newZoomLevel = this.zoomLevel - 1;
            this.adjustOffset(
                newZoomLevel,
                (this.rect.width + this.rect.left) / 2,
                (this.rect.top + this.rect.height) / 2
            );
            this.zoomLevel = Math.max(newZoomLevel, this.minZoomLevel);
            this.updateTransform();
        }
    }

    ngOnDestroy(): void {
        this.parentElements.forEach((parentElement) => {
            parentElement.removeEventListener('mousemove', this.preventDefaultListener);
        });
    }

    private detectTrackPadMove(e: WheelEvent) {
        var isTrackpad = false;
        if ((e as any).wheelDeltaY) {
            if (Math.floor((e as any).wheelDeltaY / 10) * 10 === Math.floor((e.deltaY * -3) / 10) * 10) {
                isTrackpad = true;
            }
        } else if (e.deltaMode === 0) {
            isTrackpad = true;
        }
        return isTrackpad;
    }

    private handleTransform(zoomLevel: number, clientX: number, clientY: number) {
        const newZoomLevel = zoomLevel;
        this.adjustOffset(newZoomLevel, clientX, clientY);
        this.zoomLevel = newZoomLevel;
        this.updateTransform();
        this.cdr.detectChanges();
    }

    private setupRect() {
        if (!this.rect) {
            const divElement = this.el.nativeElement as HTMLDivElement;
            this.rect = divElement.getBoundingClientRect();
            let parentElement: HTMLElement | null = divElement;
            do {
                parentElement = parentElement.parentElement;
                if (parentElement) {
                    parentElement.addEventListener('mousemove', this.preventDefaultListener);
                    this.parentElements.push(parentElement);
                }
            } while (parentElement && parentElement.nodeName !== 'BODY');
        }
    }

    private adjustMoveOffset(clientX: number, clientY: number) {
        if (this.rect) {
            // Calculate started mouse pointer position
            const x = Math.max(this.startMouseX - this.rect.left, 0);
            const y = Math.max(this.startMouseY - this.rect.top, 0);

            // Add offset and current zoom level to find real mouse position.
            const mouseX = (x - this.offsetX) / this.zoomLevel;
            const mouseY = (y - this.offsetY) / this.zoomLevel;

            // Find the rendered rect dimensions
            const rectZoomWidth = this.rect.width * this.zoomLevel;
            const rectZoomHeight = this.rect.height * this.zoomLevel;

            // Calculate the new mouse pointer position
            const newX = Math.max(clientX - this.rect.left, 0);
            const newY = Math.max(clientY - this.rect.top, 0);

            // Add offset and current zoom level to find real new mouse position.
            const newMouseX = (newX - this.offsetX) / this.zoomLevel;
            const newMouseY = (newY - this.offsetY) / this.zoomLevel;

            // Find the difference between old and new position
            const diffX = (mouseX - newMouseX) * this.zoomLevel;
            const diffY = (mouseY - newMouseY) * this.zoomLevel;

            if (newMouseX !== mouseX || newMouseY !== mouseY) {
                // Move image in the new position
                this.offsetX = Math.min(Math.max(this.offsetX - diffX, this.rect.width - rectZoomWidth), 0);
                this.offsetY = Math.min(Math.max(this.offsetY - diffY, this.rect.height - rectZoomHeight), 0);

                // Set the new mouse position for the next iterations.
                this.startMouseX = clientX;
                this.startMouseY = clientY;
            }
        }
    }

    private adjustOffset(newZoomLevel: number, clientX: number, clientY: number) {
        if (this.rect) {
            // Calculate mouse pointer position
            const x = Math.max(clientX - this.rect.left, 0);
            const y = Math.max(clientY - this.rect.top, 0);

            // Add offset and current zoom level to find real mouse position.
            const mouseX = (x - this.offsetX) / this.zoomLevel;
            const mouseY = (y - this.offsetY) / this.zoomLevel;

            // Find the relative mouse position
            const xRatio = mouseX / this.rect.width;
            const yRatio = mouseY / this.rect.height;

            // Find the new rect dimensions
            const rectZoomWidth = this.rect.width * newZoomLevel;
            const rectZoomHeight = this.rect.height * newZoomLevel;

            // Find the new relative mouse position
            const newMouseX = xRatio * rectZoomWidth;
            const newMouseY = yRatio * rectZoomHeight;

            // Show image in the same position
            this.offsetX = Math.min(Math.max(x - newMouseX, this.rect.width - rectZoomWidth), 0);
            this.offsetY = Math.min(Math.max(y - newMouseY, this.rect.height - rectZoomHeight), 0);
        }
    }

    private updateTransform() {
        if (!this.zoomImageEl) {
            this.zoomImageEl = this.el.nativeElement.querySelector('.zoom-image');
        }
        if (this.zoomImageEl) {
            this.zoomImageEl.style.width = `${this.zoomLevel * 100}%`;
            this.zoomImageEl.style.height = `${this.zoomLevel * 100}%`;
            this.zoomImageEl.style.left = `${this.offsetX}px`;
            this.zoomImageEl.style.top = `${this.offsetY}px`;
        }
    }
}
