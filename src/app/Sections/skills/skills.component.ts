import { Component, HostListener } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
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
    ])
  ]
})
export class SkillsComponent {

  inView = false;
  animationPlayed = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkView();
  }

  checkView(): void {
    if (!this.animationPlayed) {
      this.inView = this.isElementInView('#skills');
      if (this.inView) this.animationPlayed = true;
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

  java = 'icons8-java-480.png';
  c = 'icons8-c-48.png';
  spring = 'icons8-spring-boot-480.png';
  springR = 'reactive-spring-boot.png';
  react = 'icons8-react-native-480.png';
  js = 'icons8-javascript-480.png';
  angular = 'icons8-angular-240.png';
  typeS = 'icons8-typescript-480.png';
  ps = 'pngwing.com.png';
  mongo = 'mongodb.svg';
  uni = 'unity.svg';
  hy = 'Hibernate.svg';

}
