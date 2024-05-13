
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LightboxService } from '../services/lightbox.service';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnDestroy {
  currentIndex: number = 0;
  showLightbox: boolean = false;
  private openSubscription: Subscription;

  constructor(private lightboxService: LightboxService) {
    this.openSubscription = this.lightboxService.open$.subscribe(index => {
      this.currentIndex = index;
      this.showLightbox = true;
    });
  }

  ngOnDestroy(): void {
    this.openSubscription.unsubscribe();
  }

  closeLightbox(): void {
    this.showLightbox = false;
  }

  nextImage(): void {
    // Implementación para cambiar a la siguiente imagen
  }

  prevImage(): void {
    // Implementación para cambiar a la imagen anterior
  }
}