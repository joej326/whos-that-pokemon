import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'titleee';
  start = true;
  urls = new Array();
  displayedPokemon: any;
  choices = [];
  choiceMade = false;
  chosenCorrectly = false;
  correctSubmit = false;
  alreadyFetched = [];
  obsArray: Observable<any>[] = new Array();

  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
    this.fetchPokemon();
  }

  fetchPokemon(): void {
    console.log('comp method');
    const randNum = Math.floor(Math.random() * Math.floor(900)) + 1;
    this.fetchService.fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${randNum}`).subscribe(
      (data) => {
        console.log(data);
        this.displayedPokemon = data;
        // this.urls = data.results.map((r: any) => r.url);
        this.getRemainingPokemon();
      }
    );
  }

  getRemainingPokemon(): void {
    let counter = 12;
    while (counter > 0) {
      let randNum = Math.floor(Math.random() * Math.floor(900)) + 1;
      const ranNumAlreadyGenerated = this.alreadyFetched.some(id => id === randNum);
      while (ranNumAlreadyGenerated) {
        randNum = Math.floor(Math.random() * Math.floor(900)) + 1;
      }
      this.alreadyFetched.push(randNum);
      this.obsArray.push(this.fetchService.fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${randNum}`));
      --counter;
    }
    // this.urls.map(url => {
    // });
    forkJoin(this.obsArray).subscribe(
      data => {
        console.log(data);
        this.choices = data;
        this.choices.push(this.displayedPokemon);
        this.shuffleArray();
      }
    );
  }

  shuffleArray(): void {
    for (let i = this.choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = this.choices[i];
        this.choices[i] = this.choices[j];
        this.choices[j] = temp;
    }
  }

  handleChoice(id): void {
    this.choiceMade = true;
    this.chosenCorrectly = this.displayedPokemon.id === id;

    if (this.chosenCorrectly) {
    }
  }

  handleSubmit(): void {
    if (this.chosenCorrectly) {
      this.correctSubmit = true;
      setTimeout(() => {
        alert('Ian: it worked!');
      }, 100);
    } else {
      alert('I don\'t THINK so!');
    }
  }

}
