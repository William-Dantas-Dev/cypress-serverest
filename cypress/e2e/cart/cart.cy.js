import { faker } from '@faker-js/faker';
import { cartResponseSchema } from '../../contracts/cart/cart.response.contract';

describe('Carts', () => {
    it('GET - Deve buscar todos os carrinhos cadastrados', () => {
        cy.getAllCarts((response) => {
            const responseValidation = cartResponseSchema.validate(response.body)
            expect(responseValidation.error, 'Contrato Validado').to.be.undefined
            expect(response.body.quantidade, 'quantidade deve bater com length')
                .to.eq(response.body.carrinhos.length)
        })
    })

    
})