import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    
    this.http.post('http://localhost:5000/api/contact', this.contactForm.value)
      .subscribe({
        next: (response) => {
          // console.log('Message sent', response);
          // alert('Your message has been sent!');
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error sending message', error);
          alert('There was an issue sending your message.');
        }
      });
  }
}
