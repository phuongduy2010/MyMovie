import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-component',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-component.html',
  styleUrl: './loading-component.css'
})
export class LoadingComponent {
  @Input() show = false;
}
