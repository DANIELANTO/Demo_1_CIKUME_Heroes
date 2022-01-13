import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IHero } from "../interfaces/hero";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class DataService {
  // We'll use the HttpClient Service in our heroService
  constructor(private _httpClient: HttpClient) { }

  heroes!: IHero[];
  // Get the heroes from FireBase
  getHeroes(): Observable<IHero[]> {
    return this._httpClient.get<IHero[]>('https://heroes-3847d-default-rtdb.firebaseio.com/heroes.json');
  }

  // Add a new Hero Method
  addNewHero(hero: IHero){
    if (this.heroes == null) {
      this.heroes = [];
    }
      this.heroes.push(hero);
      this._httpClient.put('https://heroes-3847d-default-rtdb.firebaseio.com/heroes.json', this.heroes)
        .subscribe({
          next: response => console.log('Normal: Resultado de agregar un nuevo heroe: ', response),
          error: error => console.log('Somethig went wrong adding a new hero: (', error)
        });
  }

  // Update a hero
  updateHero(index: number, hero: IHero){
    this.heroes[index] = hero;
    let url: string;
    url = 'https://heroes-3847d-default-rtdb.firebaseio.com/heroes/' + index + '.json';
    this._httpClient.put(url, hero).subscribe({
      next: response => console.log('Resultado de modificar un heroe: ', response),
      error: error => console.log('Something went wrong trying to update a hero: ', error)
    });
  }

  // Delete a Hero
  deleteHero(index: number){
    this.heroes[index].show = false;
    let currentlyHero = this.heroes[index];
    let url: string;
    url = 'https://heroes-3847d-default-rtdb.firebaseio.com/heroes/' + index + '.json';
    this._httpClient.put(url, currentlyHero).subscribe({
      next: response => console.log('Resultado de eliminar un heroe: ', response),
      error: error => console.log('Something went wrong trying to update a hero: ', error)
    });
  }

  // Set te currently heroes array
  setHeroes(heroes: IHero[]): void {
    this.heroes = heroes;
  }

  //  Find a Hero
  findHero(index: number) {
    let hero: IHero = this.heroes[index];
    return hero;
  }
}





/*              HOW TO BUILD A SERVICE               */

/*

  Step 1: Create a Class and a method into the class that can allow us
          get the data.


  Step 2: Use the Injectable Directive and register it into the root path;
          
  Step 3: then go to the component where you would like to use it.'
          In this case "app.component.ts" and use dependency injection 
          into the constructor() and finally use the method that we created
          in the HeroService Class.
*/