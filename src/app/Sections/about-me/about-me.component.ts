import { Component, HostListener } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  animations: [
    trigger('fadeSlideIn', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-100px)' })),
      transition('out => in', [
        animate('0.5s')
      ]),
      transition('in => out', [
        animate('0.5s')
      ])
    ]),
    trigger('fadeSlideInX', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      state('out', style({ opacity: 0, transform: 'translateX(-100px)' })),
      transition('out => in', [
        animate('0.5s')
      ]),
      transition('in => out', [
        animate('0.5s')
      ])
    ]),
    trigger('fadeSlideInXReverse', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      state('out', style({ opacity: 0, transform: 'translateX(100px)' })),
      transition('out => in', [
        animate('0.5s')
      ]),
      transition('in => out', [
        animate('0.5s')
      ])
    ])
  ]
})
export class AboutMeComponent {

  h1InView = false;
  imgInView = false;
  pInView = false;

  h1AnimationPlayed = false;
  imgAnimationPlayed = false;
  pAnimationPlayed = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkView();
  }

  checkView(): void {
    if (!this.h1AnimationPlayed) {
      this.h1InView = this.isElementInView('#AboutMe h1');
      if (this.h1InView) this.h1AnimationPlayed = true;
    }
    
    if (!this.imgAnimationPlayed) {
      this.imgInView = this.isElementInView('#AboutMe img');
      if (this.imgInView) this.imgAnimationPlayed = true;
    }
    
    if (!this.pAnimationPlayed) {
      this.pInView = this.isElementInView('#AboutMe p');
      if (this.pInView) this.pAnimationPlayed = true;
    }
  }

  isElementInView(selector: string): boolean {
    const element = document.querySelector(selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top <= window.innerHeight && rect.bottom >= 0;
    }
    return false;
  }

  aboutpic = 'aboutmePic.jpg';
  CV = 'Sample-CV.pdf'; 

  scroll(id:string): void{
    const pageid = document.getElementById(id);
    if (pageid) {
      pageid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
