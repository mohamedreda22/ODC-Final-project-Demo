import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent {
  bookings: any[] = []; 

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

  // Delete a booking by ID
  deleteBooking(_id: string) {
    this.http.delete(`http://localhost:5000/api/booking/${_id}`).subscribe(
      () => {
        this.loadBookings(); 
      },
      (error) => {
        console.error('Error deleting booking', error);
      }
    );
  }
}
