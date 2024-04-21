import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  template: `
    <ng-container *ngIf="isExpanded; else otherTemplate">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <a href="/login" id="person-login">
            <img src="../../assets/images/person.png" alt="Ícone" height="50" class="d-inline-block align-top" title="Fazer Login">
            <span id="person-login-label">Fazer Login</span>
        </a>
      </div>
      </div>
    </nav>
    </ng-container>
    <ng-template #otherTemplate>
      teste
    </ng-template>
  `,
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = true;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
