import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchQuery!: string;
  searchResults: any[] = [];
  apiEndpoint = 'https://dummyapi.io/data/api/user'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  performSearch() {
    if (this.searchQuery) {
      // Make an HTTP GET request to the API endpoint
      this.http.get<any[]>(`${this.apiEndpoint}?query=${this.searchQuery}`).subscribe(
        (response) => {
          if (Array.isArray(response)) {
            this.searchResults = response;
          } else {
            console.error('API response is not an array:', response);
            this.searchResults = [];
          }
        },
        (error) => {
          console.error('Error occurred during API request:', error);
          this.searchResults = [];
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
