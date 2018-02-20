import { Component, OnInit } from '@angular/core';
import { People } from '../people';
import { PersonService } from '../person.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  people: People[] = [];
 
  constructor(private personService: PersonService) { }
 
  ngOnInit() {
    this.getPeople();
  }
 
  getPeople(): void {
    this.personService.getPeople()
      .subscribe(people => this.people = people.slice(1, 5));
  }
}