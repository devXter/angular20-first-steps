import { Component, computed, input, InputSignal, Signal } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss'
})
export class Child {
  // 1. Recibimos el input como una signal
  public message: InputSignal<string> = input.required<string>();

  // 2. Creamos un estado derivado a partir de esa signal de entrada
  public greeting: Signal<string> = computed((): string => `!Hola, ${this.message()}`);

}
