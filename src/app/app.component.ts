import { Component } from '@angular/core';
import { AuthServices } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-app';
  constructor(private auth: AuthServices) {
    this.auth.login();
  }
}
