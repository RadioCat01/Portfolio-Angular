import { Component, OnInit, HostListener } from '@angular/core';
import { GitAPIService } from '../../Common/GITService/git-api.service';
import { Repo } from './RepoModel/repo';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrl: './repos.component.scss',
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
export class ReposComponent implements OnInit{

  constructor(private githubService: GitAPIService) { }

  repos!: Repo[];
  inView = false;

  ngOnInit(): void {
    this.githubService.getRepositories().subscribe(
      (data: Repo[]) => {
        this.repos = data;
        this.saveToLocalStorage(data);
        this.checkRepo();
      },
      error => console.error(error)
    );
  }

  checkRepo(): void {
    if (this.repos && this.repos.length > 0) {
      console.log(this.repos);
    }
  }

  saveToLocalStorage(data: Repo[]): void {
    localStorage.setItem('repos', JSON.stringify(data));
  }

  getFromLocalStorage(): Repo[] {
    const data = localStorage.getItem('repos');
    return data ? JSON.parse(data) : [];
  }

  refreshData(): void {
    this.githubService.getRepositories().subscribe(
      (data: Repo[]) => {
        this.repos = data;
        this.saveToLocalStorage(data);
      },
      error => console.error(error)
    );
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkView();
  }

  checkView(): void {
    const element = document.getElementById('projects');
    if (element) {
      const rect = element.getBoundingClientRect();
      this.inView = rect.top <= window.innerHeight && rect.bottom >= 0;
    }
  }
}
