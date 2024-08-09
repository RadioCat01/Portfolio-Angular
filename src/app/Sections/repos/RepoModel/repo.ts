export interface Repo {
    name: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    language: string | null;
    updated_at: string;
    owner: {
      avatar_url: string;
    };
    html_url: string;
}
