import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

@Directive({
  selector: '[debounce]'
})
export class DebounceDirective implements OnInit, OnDestroy {

  @Output()
  public onDebounce = new EventEmitter<any>();

  @Input('timeDebounce')
  public timeDebounce: number = 500;

  private subscription: Subscription;

  constructor(public model: NgControl) {}

  ngOnInit() {
    this.subscription = this.model.valueChanges
      .pipe(debounceTime(this.timeDebounce), distinctUntilChanged())
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
