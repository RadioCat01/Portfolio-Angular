import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { Repo } from '../../Sections/repos/RepoModel/repo';

@Injectable({
  providedIn: 'root'
})
export class GitAPIService {
  private apiUrl = 'https://api.github.com/users/RadioCat01/repos';

  constructor(private http: HttpClient) { }

 
 
  getRepositories(): Observable<Repo[]> {
    return this.http.get<Repo[]>(this.apiUrl).pipe(
      switchMap(repos => {
        const readmeRequests = repos.map(repo =>
          this.getReadme(repo.name).pipe(
            map(readmeContent => ({
              ...repo,
              readme: readmeContent
            })),
            catchError(() => of({
              ...repo,
              readme: 'README not available'
            }))
          )
        );
        return forkJoin(readmeRequests);
      })
    );
  }

  private getReadme(repoName: string): Observable<string> {
    const readmeUrl = `https://raw.githubusercontent.com/RadioCat01/${repoName}/main/README.md`;
    return this.http.get(readmeUrl, { responseType: 'text' }).pipe(
      catchError(() => of('README not available'))
    );
  }
}
