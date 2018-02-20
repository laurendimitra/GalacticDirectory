import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
import { People } from './people';
import { MessageService } from './message.service';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class PersonService {
 
  private peopleUrl = 'api/people';  // URL to web api
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
 
  /** GET heroes from the server */
  getPeople (): Observable<People[]> {
    return this.http.get<People[]>(this.peopleUrl)
      .pipe(
        tap(people => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }
 
  /** GET hero by id. Return `undefined` when id not found */
  getPersonNo404<Data>(id: number): Observable<People> {
    const url = `${this.peopleUrl}/?id=${id}`;
    return this.http.get<People[]>(url)
      .pipe(
        map(people => people[0]), // returns a {0|1} element array
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<People>(`getPeople id=${id}`))
      );
  }
 
  /** GET hero by id. Will 404 if id not found */
  getPerson(id: number): Observable<People> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get<People>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<People>(`getPeople id=${id}`))
    );
  }
 
  /* GET heroes whose name contains search term */
  searchPerson(term: string): Observable<People[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<People[]>(`api/people/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<People[]>('searchPeople', []))
    );
  }
 
  //////// Save methods //////////
 
  /** POST: add a new hero to the server */
  addPerson (people: People): Observable<People> {
    return this.http.post<People>(this.peopleUrl, people, httpOptions).pipe(
      tap((people: People) => this.log(`added hero w/ name=${people.name}`)),
      catchError(this.handleError<People>('addPeople'))
    );
  }
 
  /** DELETE: delete the hero from the server */
  deletePerson (people: People | string): Observable<People> {
    const name = typeof people === 'string' ? people : people.name;
    const url = `${this.peopleUrl}/${name}`;
 
    return this.http.delete<People>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted people name=${name}`)),
      catchError(this.handleError<People>('deletePeople'))
    );
  }
 
  /** PUT: update the hero on the server */
  updatePerson (people: People): Observable<any> {
    return this.http.put(this.peopleUrl, people, httpOptions).pipe(
      tap(_ => this.log(`updated people name=${people.name}`)),
      catchError(this.handleError<any>('updatePeople'))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PersonService: ' + message);
  }
}