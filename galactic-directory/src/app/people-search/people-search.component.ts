import { Component, OnInit } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { People } from '../people';
import { PersonService } from '../person.service';
 
@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: [ './people-search.component.css' ]
})
export class PeopleSearchComponent implements OnInit {
  people$: Observable<People[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private personService: PersonService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.people$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.personService.searchPerson(term)),
    );
  }
}