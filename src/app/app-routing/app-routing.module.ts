import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from '../heroes/hero/hero.component';

const routes: Routes = [
  {path: '', component: HeroComponent},
  {path: 'heroes', component: HeroComponent},
  {path: 'heroes/:id', component: HeroComponent}
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
