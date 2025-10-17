/**
 * Lightbox Component
 *
 * Simple image viewer with keyboard navigation
 * - Click image to open full view
 * - Arrow keys to navigate (← →)
 * - Escape to close
 * - Click outside to close
 */

interface LightboxImage {
  src: string;
  width: number;
  height: number;
}

export default class Lightbox {
  private overlay: HTMLElement;
  private imageElement: HTMLImageElement;
  private counterElement: HTMLElement;
  private images: LightboxImage[];
  private currentIndex: number = 0;

  constructor(images: LightboxImage[]) {
    this.images = images;
    this.overlay = this.createOverlay();
    this.imageElement = this.overlay.querySelector('.lightbox-image')!;
    this.counterElement = this.overlay.querySelector('.lightbox-counter')!;

    this.attachEventListeners();
  }

  private createOverlay(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style.display = 'none';
    overlay.innerHTML = `
      <div class="lightbox-content">
        <img class="lightbox-image" alt="" />
        <button class="lightbox-button lightbox-close" aria-label="Close lightbox">×</button>
        <button class="lightbox-button lightbox-prev" aria-label="Previous image">‹</button>
        <button class="lightbox-button lightbox-next" aria-label="Next image">›</button>
        <div class="lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  private attachEventListeners(): void {
    // Close button
    const closeBtn = this.overlay.querySelector('.lightbox-close');
    closeBtn?.addEventListener('click', () => this.close());

    // Navigation buttons
    const prevBtn = this.overlay.querySelector('.lightbox-prev');
    const nextBtn = this.overlay.querySelector('.lightbox-next');
    prevBtn?.addEventListener('click', () => this.prev());
    nextBtn?.addEventListener('click', () => this.next());

    // Click outside to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.overlay.style.display === 'flex') {
        switch (e.key) {
          case 'Escape':
            this.close();
            break;
          case 'ArrowLeft':
            this.prev();
            break;
          case 'ArrowRight':
            this.next();
            break;
        }
      }
    });
  }

  public open(index: number): void {
    this.currentIndex = index;
    this.overlay.style.display = 'flex';
    // Trigger reflow for transition
    this.overlay.offsetHeight;
    this.overlay.classList.add('active');
    this.updateImage();
    document.body.style.overflow = 'hidden';
  }

  public close(): void {
    this.overlay.classList.remove('active');
    setTimeout(() => {
      this.overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  public prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  public next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  private updateImage(): void {
    const image = this.images[this.currentIndex];
    this.imageElement.src = image.src;
    this.imageElement.width = image.width;
    this.imageElement.height = image.height;
    this.counterElement.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
  }
}
