import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { ImageZoomDirective } from './image-zoom.directive';

@Component({
    selector: 'ade-image-zoom',
    templateUrl: './image-zoom.component.html',
    styleUrls: ['./image-zoom.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageZoomComponent implements AfterViewInit {
    @Input() imageSrc: string;
    @ViewChild('imageZoom') imageZoom: ImageZoomDirective;
    @ViewChild('image') image: ElementRef<HTMLImageElement>;

    constructor(private cd: ChangeDetectorRef) {}

    isZoomEnabled = false;

    ngAfterViewInit(): void {
        const img = new Image();
        img.src = this.imageSrc;
        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            if (this.image.nativeElement.width !== width || this.image.nativeElement.height !== height) {
                this.isZoomEnabled = true;
                this.cd.detectChanges();
            }
        };
    }

    zoomIn() {
        if (this.isZoomEnabled) {
            this.imageZoom.zoomIn();
        }
    }

    zoomOut() {
        if (this.isZoomEnabled) {
            this.imageZoom.zoomOut();
        }
    }
}
