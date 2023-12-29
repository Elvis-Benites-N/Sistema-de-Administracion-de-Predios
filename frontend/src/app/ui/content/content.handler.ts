import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class ContentHandler {
  private subject = new Subject<number>();
  private subExportar = new Subject<void>();

  public exportando = false;

  constructor() {}

  public scrollToTop(valor: number = 0): void {
    this.subject.next(valor);
  }

  public emitExportar(): void {
    this.subExportar.next();
  }

  public escuchar(): Observable<number> {
    return this.subject.asObservable();
  }

  public escucharExportar(): Observable<void> {
    return this.subExportar.asObservable();
  }
}
