import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Child } from './features/child/child';
import { Data } from './core/services/data';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable } from 'rxjs';
import { Search } from './core/layout/search/search';

export const clock$: Observable<number> = interval(1000);

@Component({
  selector: 'app-root',
  imports: [
    Child,
    Search
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private dataService: Data = inject(Data);

  // Convertimos el Observable a una Signal
  // El valor inicial es 'undefined' hasta que el Observable emita.
  public user: Signal<{ name: string } | undefined> = toSignal(this.dataService.getUserData());

  // reto
  public clock: Signal<number> = toSignal(clock$, { initialValue: 0 });


  // Patrones básico de signal
  public count: WritableSignal<number> = signal(0);
  public doubleCount: Signal<number> = computed(() => this.count() * 2);
  public isEven: Signal<boolean> = computed(() => this.count() % 2 === 0);

  public userName: WritableSignal<string> = signal('Mundo');

  constructor() {
    // Creamos el efecto aquí
    effect((): void => {
      console.log(`El contador ha cambiado a: ${ this.count() }`);
    });

    effect(() => {
      this.isEven()
        ? console.log('El contador es par')
        : console.log('El contador es impar');
    });

    effect(() => {
      console.log(`El nombre de usuario es: ${ this.userName() }`);
    });
  }

  increment(): void {
    this.count.update((current: number): number => current + 1);
  }

  decrement(): void {
    this.count.update((current: number): number => Math.max(0, current - 1));
  }

  reset(): void {
    this.count.set(0);
  }
}
