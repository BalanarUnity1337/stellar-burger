/// <reference types="cypress" />

import { API_BASE_URL, REFRESH_TOKEN_KEY } from '@/shared/constants.ts';

const dragBun = (selector: string): void => {
  cy.get(selector).trigger('dragstart');
  cy.get('[data-cy="drop-target-bun"]').eq(0).trigger('drop');
};

const dragIngredient = (selector: string): void => {
  cy.get(selector).trigger('dragstart');
  cy.get('[data-cy="drop-target-ingredient"]').trigger('drop');
};

describe('Burger Constructor Page', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_BASE_URL}ingredients`, {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.intercept('GET', `${API_BASE_URL}auth/user`, {
      fixture: 'auth/user.json',
    }).as('getUser');

    cy.intercept('POST', `${API_BASE_URL}orders`, {
      fixture: 'orders/create.json',
    }).as('createOrder');

    localStorage.setItem(REFRESH_TOKEN_KEY, 'refresh-token');

    cy.visit('/');
  });

  it('Visit burger constructor page', () => {
    cy.contains('Соберите бургер');
  });

  it('"Checkout" button is not available without ingredients', () => {
    cy.wait(['@getIngredients', '@getUser']);
    cy.get('[data-cy="create-order-button"]').should('be.disabled');
  });

  describe('Drag & Drop works correctly', () => {
    beforeEach(() => {
      cy.wait(['@getIngredients', '@getUser']);
    });

    it('Bun is dragged and dropped', () => {
      dragBun('[data-cy="draggable-bun-1"]');

      cy.get('[data-cy="drop-target-bun"]')
        .eq(0)
        .get('[data-cy*="bun"]')
        .should('exist');
    });

    it('Ingredients are dragged and dropped', () => {
      dragIngredient('[data-cy="draggable-main-1"]');
      dragIngredient('[data-cy="draggable-sauce-1"]');

      cy.get('[data-cy="drop-target-ingredient"]')
        .find('[data-cy^="ingredient"]')
        .should('have.length', 2);
    });
  });

  describe('Order processing', () => {
    it('Should create order and open modal', () => {
      cy.wait(['@getIngredients', '@getUser']);

      dragBun('[data-cy="draggable-bun-1"]');
      dragIngredient('[data-cy="draggable-main-1"]');
      dragIngredient('[data-cy="draggable-sauce-1"]');

      cy.get('[data-cy="create-order-button"]').as('createOrderButton');

      cy.get('@createOrderButton').should('not.be.disabled');
      cy.get('@createOrderButton').click();

      cy.wait('@createOrder');

      cy.get('[data-cy="modal-create-order"]').should('be.visible');
    });
  });
});
