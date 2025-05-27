import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  onlyBookster: boolean = true;
  isOnlyBookster: EventEmitter<boolean> = new EventEmitter<boolean>();

  refresh() {
    this.isOnlyBookster.emit(this.onlyBookster);
  }
}
