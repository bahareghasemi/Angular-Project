import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule,CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedImage: string | ArrayBuffer | null = null;
  originalImage: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result;
          this.originalImage = this.selectedImage;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  applyGrayscale(): void {
    if (this.selectedImage && typeof this.selectedImage === 'string') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = this.selectedImage;

      image.onload = () => {
        if (ctx) {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
          }
          ctx.putImageData(imageData, 0, 0);
          this.selectedImage = canvas.toDataURL();
        }
      };
    }
  }

  applyBrightness(): void {
    if (this.selectedImage && typeof this.selectedImage === 'string') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = this.selectedImage;

      image.onload = () => {
        if (ctx) {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 1.2);
            data[i + 1] = Math.min(255, data[i + 1] * 1.2);
            data[i + 2] = Math.min(255, data[i + 2] * 1.2);
          }
          ctx.putImageData(imageData, 0, 0);
          this.selectedImage = canvas.toDataURL();
        }
      };
    }
  }

  resetImage(): void {
    this.selectedImage = this.originalImage;
  }
}