import { Component, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  public searchTerm: WritableSignal<string> = signal('');

  constructor() {
    // 1. Convertimos la signal en un observable
    toObservable(this.searchTerm)
      .pipe(
        // 2. Filtramos primero: sólo dejamos pasar valores con 3 o más caracteres
        filter((value: string): boolean => value.length >= 3),
        // 3. Luego, esperamos 300ms después de la última pulsación
        debounceTime(300),
        // 4. Solo emitimos si el valor es diferente al anterior
        distinctUntilChanged()
      )
      .subscribe((value: string): void => {
        // 5. Aquí haríamos la llamada a la API
        console.log(`Buscando: ${ value }...`);
      })
  }

}
