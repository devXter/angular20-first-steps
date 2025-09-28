import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Data {
  getUserData(): Observable<{ name: string }> {
    // Simulamos una llamada HTTP que tarda 1.5 segundos
    return of({ name: 'Francisco' })
      .pipe(
        delay(1500)
      );
  }

}
