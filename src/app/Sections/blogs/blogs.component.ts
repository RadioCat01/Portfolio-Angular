import { Component, HostListener, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  animations: [
    trigger('fadeSlideIn', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(50px)' })),
      transition('out => in', animate('0.5s')),
      transition('in => out', animate('0.5s'))
    ])
  ]
})
export class BlogsComponent {

  inView = false;
  animationPlayed = false; // Track if the animation has been played

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkView();
  }

  checkView(): void {
    const element = document.getElementById('projects');
    if (element) {
      const rect = element.getBoundingClientRect();
      if (!this.animationPlayed && rect.top <= window.innerHeight && rect.bottom >= 0) {
        this.inView = true;
        this.animationPlayed = true;
        console.log('Animation triggered');
      }
    }
  }
  

  springJpa: string = 'icons8-spring-boot-480.png';
  springRe: string = 'reactive-spring-boot.png';
  springBoot: string = 'spring-boot.svg';

}
