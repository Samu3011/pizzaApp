import { Injectable } from '@angular/core';
import { Pizza } from '../models/pizza.models';

@Injectable({
  providedIn: 'root',
})
export class PizzaState {
  pizzas?: Pizza[];

  init(pizzas: Pizza[]) {
    this.pizzas = pizzas;
  }

  deletePizza(id: number) {
    this.pizzas = this.pizzas?.filter((p) => p.id !== id);
  }
}
