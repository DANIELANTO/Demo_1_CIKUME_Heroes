import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'HeroesApp';

  constructor(private _router: Router){}

  goHome(){
    this._router.navigate(['heroes']);
  }
}
