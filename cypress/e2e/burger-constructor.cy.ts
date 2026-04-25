import * as orderFixture from '../fixtures/order.json';
import * as ingredientsFixture from '../fixtures/ingredients.json';

const API_URL = Cypress.env('BURGER_API_URL');

describe('Проверка правильной работы конструктора бургеров', () => {
  describe('Оформления заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'testAccessToken');
      window.localStorage.setItem('refreshToken', 'testRefreshToken');

      cy.intercept('GET', `${API_URL}/ingredients`, { fixture: 'ingredients' });
      cy.intercept('GET', `${API_URL}/auth/user`, { fixture: 'user' });
      cy.intercept('POST', `${API_URL}/orders`, { fixture: 'order' });

      cy.visit('/');
    });

    afterEach(() => {
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
    });

    it('Процесс оформления заказа отрабатывает правильно', () => {
      // Есть хотя бы одна булка
      cy.get('[data-cy="ingredient-bun"]').should('have.length.at.least', 1);
      // Есть хотя бы одна начинка
      cy.get('[data-cy="ingredient-main"]').should('have.length.at.least', 1);
      // Есть хотя бы один соус
      cy.get('[data-cy="ingredient-sauce"]').should('have.length.at.least', 1);

      // Првоеряем, что булки и ингредиенты изначально не выбраны
      cy.get('[data-cy="no-buns-top"]').should('be.visible');
      cy.get('[data-cy="no-buns-bottom"]').should('be.visible');
      cy.get('[data-cy="no-ingredients"]').should('be.visible');

      // Добавляем булку и ингредиенты
      // Добавление булки
      cy.get('[data-cy="ingredient-bun"]:first-of-type button').click();
      // Добавление начинки
      cy.get('[data-cy="ingredient-main"]:first-of-type button').click();
      // Добавление соуса
      cy.get('[data-cy="ingredient-sauce"]:first-of-type button').click();

      // Нажатие на кнопку оформления заказа
      cy.get('[data-cy="order-button"]').click();

      // Модальное окно отображается и в нем отображается правильный номер заказа
      cy.get('#modals [data-cy="order-details-number"]').should(
        'have.text',
        orderFixture.order.number
      );

      // Закрываем модальное окно созданного заказа
      cy.get('#modals [data-cy="close-modal-button"]').click();

      // Првоеряем, что модальное окно закрыто
      cy.get('#modals').children().should('have.length', 0);

      // Проверяем, что булки и ингредиенты сбрасываются после оформления заказа
      cy.get('[data-cy="no-buns-top"]').should('be.visible');
      cy.get('[data-cy="no-buns-bottom"]').should('be.visible');
      cy.get('[data-cy="no-ingredients"]').should('be.visible');
    });
  });

  describe('Работа с модальным окном ингредиента', () => {
    beforeEach(() => {
      cy.intercept('GET', `${API_URL}/ingredients`, { fixture: 'ingredients' });

      cy.visit('/');
    });

    it('Ингредиент отображается в модальном окне при клике', () => {
      const ingredientId = ingredientsFixture.data[0]._id;

      // Кликаем ингредиенту
      cy.get(`[data-cy="ingredient-link-${ingredientId}"]`).click();

      // Модальное окно открывается и отображает правильную информацию
      cy.get(`#modals [data-cy="ingredient-name-${ingredientId}"]`).should(
        'have.text',
        ingredientsFixture.data[0].name
      );
    });

    describe('Закрытие модального окна ингредиента', () => {
      beforeEach(() => {
        const ingredientId = ingredientsFixture.data[0]._id;

        // Кликаем ингредиенту
        cy.get(`[data-cy="ingredient-link-${ingredientId}"]`).click();

        // Проверяем, что модальное окно открылось
        cy.get('#modals').children().should('have.length.at.least', 1);
      });

      it('Модальное окно ингредиента закрывается по клику на кнопку закрытия', () => {
        // Закрываем модальное окно по клику на кнопку закрытия
        cy.get('#modals [data-cy="close-modal-button"]').click();

        // Првоеряем, что модальное окно закрыто
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Модальное окно ингредиента закрывается по клику на оверлей', () => {
        // Закрываем модальное окно по клику на оверлей
        cy.get('[data-cy="modal-overlay"]').click({ force: true });

        // Првоеряем, что модальное окно закрыто
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });
});
