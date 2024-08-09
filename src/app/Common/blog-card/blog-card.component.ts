import { Component, HostListener, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
  animations: [
    trigger('fadeSlideIn', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(50px)' })),
      transition('out => in', [
        animate('0.5s')
      ]),
      transition('in => out', [
        animate('0.5s')
      ])
    ])]
})
export class BlogCardComponent {

  @Input() src!: string;
  @Input() link!: string; 
  @Input() h3!: string; 
  @Input() p!: string; 

  animationPlayed = false;
  inView = false;

  @ViewChild('card', { static: false }) card!: ElementRef;

  ngAfterViewInit() {
    this.checkView(); // Check view when component is initialized
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkView();
  }

  checkView(): void {
    if (!this.animationPlayed) {
      const rect = this.card.nativeElement.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        this.inView = true;
        this.animationPlayed = true; 
      }
    }
  }

}
