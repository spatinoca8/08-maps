import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavarComponent } from './shared/component/navar/navar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavarComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maps-app';
}
