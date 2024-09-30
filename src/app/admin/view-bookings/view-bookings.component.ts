import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent {
  bookings: any[] = []; 
  token: string | null = localStorage.getItem('token'); // JWT token
  isEditMode = false; // To control form visibility
  selectedBooking: any = null; // Holds the booking to be updated
  
  constructor(private http: HttpClient) {
    this.loadBookings(); 
  }

  // Load all bookings from the API
  loadBookings() {
    this.http.get<any[]>('http://localhost:5000/api/booking')
    .subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error loading bookings', error);
      }
    );
  }

  // Edit a booking by selecting it and showing the update form
  editBooking(booking: any) {
    this.isEditMode = true;
    this.selectedBooking = { ...booking }; // Create a copy of the selected booking
  }

  // Update a booking by ID
  updateBooking() {
    if (!this.selectedBooking) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.put(`http://localhost:5000/api/booking/${this.selectedBooking._id}`, this.selectedBooking, { headers }).subscribe(
      () => {
        this.loadBookings(); 
        this.isEditMode = false; // Close the form after updating
        this.selectedBooking = null; // Clear the selected booking
      },
      (error) => {
        console.error('Error updating booking', error);
      }
    );
  }

  // Delete a booking by ID
  deleteBooking(_id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.delete(`http://localhost:5000/api/booking/${_id}`, { headers }).subscribe(
      () => {
        this.loadBookings(); 
      },
      (error) => {
        console.error('Error deleting booking', error);
      }
    );
  }

  // Cancel the update process and hide the form
  cancelUpdate() {
    this.isEditMode = false;
    this.selectedBooking = null;
  }
}
