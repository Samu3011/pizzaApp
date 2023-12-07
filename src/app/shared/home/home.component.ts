import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pizza } from 'src/app/models/pizza.models';
import { PizzaService } from 'src/app/service/pizza.service/pizza.service';
import { PizzaState } from 'src/app/state/pizza.state';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-sm mt-2" *ngFor="let pizza of arrayOfPizza">
          <div class="card" style="width: 18rem;">
            <img [src]="pizza.image" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ pizza.name }}</h5>
              <p class="card-text">
                {{ pizza.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent {
  arrayOfPizza: Pizza[] = [];

  constructor(
    public PizzaService: PizzaService,
    public PizzaState: PizzaState
  ) {
    PizzaService.getPizzas().subscribe((res) => {
      console.log(res);
      this.arrayOfPizza = res;
    });
  }
}
