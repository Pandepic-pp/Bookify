import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent {
  @Input() imageLink: string = '';
  @Input() bookName: string = '';
  @Input() author: string = '';
  @Input() fromPage: string = '';
  @Input() price!: number;
}
