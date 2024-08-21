import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  setUserData(data: any) {
    this.userData.next(data);
  }

  getUserData() {
    return this.userData.getValue();
  }
}
