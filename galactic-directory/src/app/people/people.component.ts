import { Component, OnInit } from '@angular/core';
 
import { People } from '../people';
import { PersonService } from '../person.service';
 
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: People[];
 
  constructor(private personService: PersonService) { }
 
  ngOnInit() {
    this.getPeople();
  }
 
  getPeople(): void {
    this.personService.getPeople()
    .subscribe(people => this.people = people);
  }
 
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.personService.addPerson({ name } as People)
      .subscribe(people => {
        this.people.push(people);
      });
  }
 
  delete(people: People): void {
    this.people = this.people.filter(p => p !== people);
    this.personService.deletePerson(people).subscribe();
  }
}
