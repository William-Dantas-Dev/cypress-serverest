import { cartDeleteResponse, cartResponseSchema, successCartRegister } from '../../contracts/cart/cart.response.contract';
import { loginSuccessResponse } from '../../contracts/auth/login.response.contract'
import { productsResponseContract } from '../../contracts/products/products.request.contract';

describe('Carts', () => {
    beforeEach(() => {
        const loginPayload = {
            email: 'fulano@qa.com',
            password: 'teste'
        }

        cy.loginRequest(loginPayload, (response) => {
            expect(response.status).to.eq(200)
            const validation = loginSuccessResponse.validate(response.body)
            expect(validation.error).to.be.undefined

            Cypress.env('token', response.body.authorization)
        })
    })

    it('GET - Deve buscar todos os carrinhos cadastrados', () => {
        cy.getAllCarts((response) => {
            const responseValidation = cartResponseSchema.validate(response.body)
            expect(responseValidation.error, 'Contrato Validado').to.be.undefined
            expect(response.body.quantidade, 'quantidade deve bater com length')
                .to.eq(response.body.carrinhos.length)
        })
    })

    it('POST - Deve cadastrar um novo carrinho que vincula com o usuario autenticado', () => {
        cy.getProducts((response) => {
            expect(response.status, 'status code').to.eq(200)
            const responseValidation = productsResponseContract.validate(response.body)
            expect(responseValidation.error, 'Contrato Validado').to.be.undefined
            expect(response.body.quantidade, 'quantidade deve bater com length')
                .to.eq(response.body.produtos.length)
            const [product1, product2] = response.body.produtos.slice(0, 2);
            const bodyCart = {
                produtos: [
                    { idProduto: product1._id, quantidade: 1 },
                    { idProduto: product2._id, quantidade: 1 }
                ]
            }
            cy.then(() => {
                const token = Cypress.env('token')
                cy.registerCart((responseCart) => {
                    cy.log('Resposta recebida:', JSON.stringify(responseCart.body))
                    const responseCartValidation = successCartRegister.validate(responseCart.body)
                    expect(responseCartValidation.error, 'Contrato Validado').to.be.undefined
                }, bodyCart, token)
            })
        })
    })

    it('DELETE - Deve deletar o carrinho do usuario autenticado', () => {
        cy.then(() => {
            const token = Cypress.env('token')
            cy.deleteCart((response) => {
                cy.log('Resposta recebida:', JSON.stringify(response.body))
                expect(response.status, 'status code').to.eq(200)
                const responseValidation = cartDeleteResponse.validate(response.body)
                expect(responseValidation.error, 'Contrato Validado').to.be.undefined
            }, 'cancelar-compra', token)
        })
    })


})