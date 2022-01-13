import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IHero } from 'src/app/interfaces/hero';
import { DataService } from 'src/app/services/data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  constructor(private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _spinner: NgxSpinnerService) { }

  @Input() hero: IHero = {
    show: true,
    name: '',
    power: 0
  };

  sub: Subscription | undefined;
  index: string | null = null;
  delete: boolean = false;
  textButton: string = 'Add Hero';
  textForm: string = 'Add a New Hero';

  onAddNewHero(): void {
    // Taking care that our hero has a name
    if (this.hero.name.trim().length === 0) { return; }

    // Making sure that we are not adding a new hero instead when we edit one of them
    if (this.index) {
      // If index is available, we update the info
      this._dataService.updateHero(Number(this.index), this.hero);
 
      this._spinner.show();
      setTimeout(() => {
        this._spinner.hide();
      }, 500);

    } else {
      // If index is null, that means that we are creating a new Hero
      this._dataService.addNewHero(this.hero);
 
      this._spinner.show();
      setTimeout(() => {
        this._spinner.hide();
      }, 1500);

    }

    // Setting default values
    this.hero = {
      show: true,
      name: '',
      power: 0
    }
    this._router.navigate(['heroes']);
  }

  deleteHero() {
    if (this.index) {
      this._dataService.deleteHero(Number(this.index));

      this._spinner.show();
      setTimeout(() => {
        this._spinner.hide();
      }, 1500);
    }

    // Setting default values
    this.hero = {
      show: true,
      name: '',
      power: 0
    }
    this._router.navigate(['heroes']);
  }

  ngOnInit() {

    this.sub = this._route.paramMap
      .subscribe(params => {
        this.index = params.get("id");

        if (this.index != null) {
          let hero: IHero = this._dataService.findHero(Number(this.index));
          this.hero.name = hero.name;
          this.hero.power = hero.power;
          this.delete = true;
          this.textButton = 'Save Hero';
          this.textForm = 'Edit Hero';
        }
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe;
  }
}


/*
  Input it's used to share info from a Parent Component to a Child Component

  Output is used to emit events, but how EventEmitter is generic, 
  we can emit: string, number, object and so on...
  And it dp it from a Child Component to a Parent Component
*/ 