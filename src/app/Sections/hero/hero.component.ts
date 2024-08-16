import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100px)', opacity: 0 }),
        animate('0.5s 0.1s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100px)', opacity: 0 }),
        animate('0.5s 0.1s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HeroComponent {

  private themeSubject = new BehaviorSubject<string>('light');
  theme$ = this.themeSubject.asObservable();
  theme: string = 'light'; 
  text: string = '';

  currentTextIndex: number = 0; 
  texts: string[] = ['FullStack DEV', 'UNDERGRADUATE', 'SRI LANKA'];

  ngOnInit(): void {
    
    this.theme$.subscribe(currentTheme => {
      this.theme = currentTheme;
    });

    this.startTypewriterEffect();
    
  }
  startTypewriterEffect() {
    const speed = 40; 
    const delayBetweenTexts = 1000;
    const displaytime = 3000;
    let index = 0;

    const typeWriter = () => {
      if (index < this.texts[this.currentTextIndex].length) {
        this.text += this.texts[this.currentTextIndex].charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      } else {
        setTimeout(() => {
          this.text = ''; 
          index = 0; 
          this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
          typeWriter(); 
        }, displaytime);
      }
    };

    typeWriter();
  }

  toggleTheme() {
    const currentTheme = this.themeSubject.value;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.themeSubject.next(newTheme);
    document.body.classList.toggle('dark', this.theme === 'dark');
    document.body.classList.toggle('light', this.theme === 'light');
  }

  scroll(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
 
}
