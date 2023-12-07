import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container-fluid">
        <img
          src="assets/logo.png"
          alt="Logo"
          width="60"
          height="48"
          class="d-inline-block align-text-top"
        />
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLinkActive="active" routerLink="/home"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLinkActive="active" routerLink="/menu"
                >Menu</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent {}
