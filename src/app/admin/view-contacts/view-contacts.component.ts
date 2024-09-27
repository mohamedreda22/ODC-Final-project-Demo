import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent {
  contacts: any[] = []; 

  constructor(private http: HttpClient) {
    this.loadContacts(); 
  }

  // Load all contacts from the API
  loadContacts() {
    this.http.get<any[]>('http://localhost:5000/api/contact')
      .subscribe(
        (data) => {
          this.contacts = data;
        },
        (error) => {
          console.error('Error loading contacts', error);
        }
      );
  }

  // Delete a contact by ID
  deleteContact(_id: string) {
    this.http.delete(`http://localhost:5000/api/contact/${_id}`).subscribe(
      () => {
        this.loadContacts(); 
      },
      (error) => {
        console.error('Error deleting contact', error);
      }
    );
  }
}
