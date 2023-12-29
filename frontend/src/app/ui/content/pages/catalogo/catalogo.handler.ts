import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root',
})
export class ListarEquivalenciasHandler {
  private subject = new Subject<void>();

  constructor() {}

  public refrescarData(): void {
    this.subject.next();
  }

  public escuchar(): Observable<void> {
    return this.subject.asObservable();
  }
}
