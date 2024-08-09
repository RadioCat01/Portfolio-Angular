import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './Sections/hero/hero.component';
import { ReposComponent } from './Sections/repos/repos.component';
import { BlogsComponent } from './Sections/blogs/blogs.component';
import { AboutMeComponent } from './Sections/about-me/about-me.component';
import { ContactComponent } from './Sections/contact/contact.component';
import { FooterComponent } from './Sections/footer/footer.component';
import { SkillsComponent } from './Sections/skills/skills.component';
import { BlogCardComponent } from './Common/blog-card/blog-card.component';
import { ProjectCardComponent } from './Common/project-card/project-card.component';
import { SkillListComponent } from './Common/skill-list/skill-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    ReposComponent,
    BlogsComponent,
    AboutMeComponent,
    ContactComponent,
    FooterComponent,
    SkillsComponent,
    BlogCardComponent,
    ProjectCardComponent,
    SkillListComponent,
    HomePageComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
