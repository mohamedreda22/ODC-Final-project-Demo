import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent {
  // Logic for viewing contact requests goes here
}
