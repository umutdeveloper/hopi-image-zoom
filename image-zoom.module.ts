import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageZoomComponent } from './image-zoom.component';
import { ImageZoomDirective } from './image-zoom.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ImageZoomComponent, ImageZoomDirective],
    exports: [ImageZoomComponent],
})
export class ImageZoomModule {}
