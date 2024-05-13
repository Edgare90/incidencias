// lightbox.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  private openSubject = new Subject<number>();
  open$ = this.openSubject.asObservable();

  openLightbox(index: number): void {
    this.openSubject.next(index);
  }
}
