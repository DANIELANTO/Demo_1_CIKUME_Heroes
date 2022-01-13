import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/interfaces/hero';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {
  name: string = '';
  power: number = 0;
  heroes: IHero[] = [];
  sub: Subscription | undefined;
  index: number = 0;

  hero: IHero = {
    show: true,
    name: '',
    power: 0
  }

  // Here we have Dependency Injection
  constructor(private _dataService: DataService) { }

  // Here we get the heroes that we have in the json File
  ngOnInit() {
    this.heroes = this._dataService.heroes;
  }
}
