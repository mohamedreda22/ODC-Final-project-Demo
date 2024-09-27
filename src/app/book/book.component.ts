import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule],  // Add FormsModule here
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  bookingData = {
    date: '',
    time: '',
    name: '',
    phone: '',
    person: 1
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/booking', this.bookingData)
      .subscribe({
        next: (response) => {
          console.log('Booking confirmed', response);
          alert('Booking confirmed!');
          this.clearForm();
        },
        error: (error) => {
          console.error('Error submitting booking', error);
          alert('There was an issue with your booking.');
        }
      });
  }

  clearForm() {
    this.bookingData = { date: '', time: '', name: '', phone: '', person: 1 };
  }
}
