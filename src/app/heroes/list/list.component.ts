import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IHero } from 'src/app/interfaces/hero';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  // Getting the heroes from the parent with @Input
  @Input()
  heroes: IHero[] = [];
  sub: Subscription | undefined;
  index: string | null = null;

  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    // Here we refresh our table after a DB update
    setTimeout(() => {
      this.sub = this.dataService.getHeroes()
        .subscribe((heroes: IHero[]) => {
          if (heroes == null) {
            this.heroes = [];
            this.dataService.setHeroes(heroes);
          } else {
            this.heroes = heroes;
            this.dataService.setHeroes(heroes);
          }
        });
    }, 500);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe;
  }

}
