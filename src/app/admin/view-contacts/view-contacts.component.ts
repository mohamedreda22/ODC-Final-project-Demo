import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent {
  contacts: any[] = []; 
  selectedContact: any = null; // To hold the contact being edited
  isEditMode: boolean = false; // Toggle for edit mode

  newContact={_id:'', name:'', email:'', subject:'', message:''}

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

  // Initiate editing a contact
  editContact(contact: any) {
    this.selectedContact = { ...contact }; // Clone the contact object to avoid live changes
    this.isEditMode = true; // Open the form
  }

  // Save the updated contact
  updateContact() {
    if (this.selectedContact && this.selectedContact._id) {
      this.http.put(`http://localhost:5000/api/contact/${this.selectedContact._id}`, this.selectedContact).subscribe(
        () => {
          this.loadContacts();
          this.isEditMode = false; // Close the form after saving
          this.selectedContact = null; // Reset selected contact
        },
        (error) => {
          console.error('Error updating contact', error);
        }
      );
    }
  }

  // Cancel the update and close the form
  cancelUpdate() {
    this.isEditMode = false;
    this.selectedContact = null; // Reset selected contact
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
