import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { People }         from '../people';
import { PersonService }  from '../person.service';
 
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: [ './person-detail.component.css' ]
})
export class PersonDetailComponent implements OnInit {
  @Input() people: People;
 
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getPerson();
  }
 
  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(person => this.people = person);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.personService.updatePerson(this.people)
      .subscribe(() => this.goBack());
  }
}
