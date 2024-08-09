import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { trigger, style, transition, animate, state } from '@angular/animations';


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
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
    ])
  ]
})
export class ProjectCardComponent {

  @Input() repo: any;
  @ViewChild('card', { static: false }) card!: ElementRef;

  isExpanded = false;
  animationPlayed = false;
  inView = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  getDisplayedContent(): string {
    const words = this.repo.readme.split(' ');
    if (this.isExpanded) {
      return words.slice(0, 50).join(' ') + (words.length > 50 ? '...' : '');
    }
    return words.slice(0, 6).join(' ') + (words.length > 20 ? '...' : '');
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
