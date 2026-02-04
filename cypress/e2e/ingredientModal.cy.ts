/// <reference types="cypress" />

import { API_BASE_URL } from '@/shared/constants.ts';

describe('Ingredient Modal', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_BASE_URL}ingredients`, {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.visit('/');

    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-sauce-1"]').click();

    cy.get('[data-cy="modal-ingredient"]').as('modalIngredient');
    cy.get('@modalIngredient')
      .get('[data-cy="ingredient-details-sauce-1"]')
      .as('ingredientDetails');
  });

  it('Should open ingredient modal', () => {
    cy.get('@modalIngredient').should('be.visible');

    cy.get('@ingredientDetails').should('exist');
    cy.get('@ingredientDetails').contains('Соус Spicy-X');
  });

  it('Should close ingredient modal by close button', () => {
    cy.get('[data-cy="modal-close-button"]').click();

    cy.get('@modalIngredient').should('not.exist');
  });

  it('Should close ingredient modal by overlay', () => {
    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.get('@modalIngredient').should('not.exist');
  });

  it('Should close ingredient modal by Escape', () => {
    cy.get('@modalIngredient').trigger('keydown', {
      key: 'Escape',
    });

    cy.get('@modalIngredient').should('not.exist');
  });

  it('When page is refreshed, modal remains open', () => {
    cy.reload();

    cy.get('@modalIngredient').should('exist').should('be.visible');
  });
});
