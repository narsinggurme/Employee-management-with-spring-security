import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  quotes: string[] = [
    "“Bhagwa is the color of energy and strength.”",
    "“Code is like humor. When you have to explain it, it’s bad.”",
    "“Simplicity is the soul of efficiency.”",
    "“Strive for progress, not perfection.”",
    "“Discipline and dedication build success.”"
  ];

  ngOnInit(): void {
    let index = 0;
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.innerText = this.quotes[index];
      setInterval(() => {
        index = (index + 1) % this.quotes.length;
        quoteElement!.style.opacity = "0";
        setTimeout(() => {
          quoteElement!.innerText = this.quotes[index];
          quoteElement!.style.opacity = "1";
        }, 500);
      }, 4000);
    }
  }
}
