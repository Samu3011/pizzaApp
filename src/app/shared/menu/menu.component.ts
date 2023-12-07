import { Component } from '@angular/core';
import { Pizza } from 'src/app/models/pizza.models';
import { PizzaService } from 'src/app/service/pizza.service/pizza.service';
import { PizzaState } from 'src/app/state/pizza.state';

@Component({
  selector: 'app-menu',
  template: `
    <div class="container">
      <div class="text-center">
        <h3 *ngIf="arrayOfPizza">Scegli la pizza che vuoi ordinare</h3>
        <hr />
        <button
          *ngIf="arrayOfPizza"
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          [disabled]="totale <= 0"
        >
          Carrello
        </button>
        <div>
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Carrello
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body" *ngFor="let pizza of cart">
                  <img [src]="pizza.image" width="30px" height="32" />
                  {{ pizza.name }} - qt.{{ pizza.quantity }} * €{{
                    pizza.price.toFixed(2)
                  }}
                  <h5 class="mt-3">Totale: €{{ totale }}</h5>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    (click)="isBuy()"
                    data-bs-dismiss="modal"
                    routerLink="/home"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm mt-2" *ngFor="let pizza of arrayOfPizza">
              <div class="card" style="width: 18rem;">
                <img [src]="pizza.image" class="card-img-top" alt="..." />
                <div class="card-body justify">
                  <h5 class="card-title text-center">{{ pizza.name }}</h5>
                  <p class="text-center">€{{ pizza.price }}</p>
                  <p>
                    <button
                      type="button"
                      class="btn btn-danger"
                      (click)="isRemove(pizza)"
                    >
                      -
                    </button>
                    <span class="text-center m-5">{{ pizza.quantity }}</span>
                    <button
                      type="button"
                      class="btn btn-success"
                      (click)="isAdd(pizza)"
                    >
                      +
                    </button>
                  </p>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    (click)="deletePizza(pizza.id)"
                  >
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MenuComponent {
  arrayOfPizza?: Pizza[];
  pizza?: Pizza;
  cart: Pizza[] = [];
  totale: number = 0;

  constructor(
    public pizzaService: PizzaService,
    public PizzaState: PizzaState
  ) {
    pizzaService.getPizzas().subscribe((res) => {
      this.arrayOfPizza = res;
    });
  }

  isAdd(pizza: Pizza) {
    this.pizzaService.getPizza(pizza.id).subscribe((res) => {
      this.pizza = res;
      this.cart = this.cart.filter((res) => res.id !== this.pizza?.id);
      pizza.quantity++;
      this.pizza.quantity = pizza.quantity;
      this.totale = this.totale + pizza.price;
      console.log(this.totale);
      this.cart.push(this.pizza);
    });
  }

  isRemove(pizza: Pizza) {
    this.pizzaService.getPizza(pizza.id).subscribe((res) => {
      this.pizza = res;
      if (pizza.quantity != 0) {
        this.cart = this.cart.filter((res) => res.id !== this.pizza?.id);
        pizza.quantity -= 1;
        this.pizza.quantity = pizza.quantity;
        this.totale = this.totale - pizza.price;
        this.cart.push(this.pizza);
      }

      if (pizza.quantity == 0) {
        this.cart.pop();
      }
    });
  }

  isBuy() {
    this.arrayOfPizza = [];
    this.pizza = undefined;
    this.cart = [];
    this.totale = 0;
  }

  deletePizza(id: number) {
    this.arrayOfPizza = this.arrayOfPizza?.filter((res) => res.id !== id);
  }
}
