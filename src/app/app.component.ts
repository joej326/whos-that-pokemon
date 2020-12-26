import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'whos-that-pokemon';
  resetComponent = false;

  handleResetComponent(): void {
    this.resetComponent = true;

    setTimeout(() => {
      this.resetComponent = false;
    }, 100);
  }
}
