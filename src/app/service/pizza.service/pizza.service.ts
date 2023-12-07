import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pizza } from 'src/app/models/pizza.models';
import { PizzaState } from 'src/app/state/pizza.state';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(public http: HttpClient, public PizzaState: PizzaState) {}

  getPizzas() {
    return this.http.get<Pizza[]>(
      'https://my-json-server.typicode.com/zoelounge/menupizza/cards'
    );
  }

  getPizza(id: number) {
    return this.http.get<Pizza>(
      `https://my-json-server.typicode.com/zoelounge/menupizza/cards/${id}`
    );
  }
}
