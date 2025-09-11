import { faker } from '@faker-js/faker';
import { productsResponseContract, productSchema, productSchemaRegister } from "../../contracts/products/products.request.contract"
import { loginSuccessResponse } from '../../contracts/auth/login.response.contract'
import { productCreatedResponse } from '../../contracts/products/products.response.contract';

describe('Users', () => {
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

    it('POST - Deve cadastrar um produto válido (201) e seguir o contrato', () => {
        const payload = {
            nome: faker.commerce.productName(),
            preco: faker.number.int(100),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int(100)
        }

        cy.validatePayload(productSchemaRegister, payload).then(validation => {
            expect(validation.error).to.be.undefined
        })

        cy.then(() => {
            const token = Cypress.env('token')
            expect(token, 'token deve estar definido').to.exist
            cy.registerProduct((response) => {
                expect(response.status, 'status code').to.eq(201)
                cy.log('Payload Recebido: ', JSON.stringify(response.body))
                const responseValidation = productCreatedResponse.validate()
                expect(responseValidation.error).to.be.undefined
            }, payload, token)
        })
    });

    it('POST - Não deve cadastrar produto com nome já existente (400)', () => {
        const existingProductPayload = {
            nome: faker.commerce.productName(),
            preco: faker.number.int(100),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int(100)
        }

        cy.then(() => {
            const token = Cypress.env('token')
            expect(token, 'token deve estar definido').to.exist
            cy.registerProduct((response) => {
                expect(response.status, 'status code').to.eq(201)
                cy.log('Payload Recebido: ', JSON.stringify(response.body))
                const responseValidation = productCreatedResponse.validate()
                expect(responseValidation.error).to.be.undefined
                const duplicatePayload = {
                    nome: existingProductPayload.nome,
                    preco: faker.number.int(100),
                    descricao: faker.commerce.productDescription(),
                    quantidade: faker.number.int(100)
                }
                cy.registerProduct((duplicateResponse) => {
                    expect(duplicateResponse.status).to.eq(400);
                    expect(duplicateResponse.body.message).to.eq('Já existe produto com esse nome');
                }, duplicatePayload, token)
            }, existingProductPayload, token)
        })
    })

    it.only('POST - Não deve cadastrar produto por Token de acesso ausente, inválido ou expirado', () => {
        const payload = {
            nome: faker.commerce.productName(),
            preco: faker.number.int(100),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int(100)
        }

        cy.validatePayload(productSchemaRegister, payload).then(validation => {
            expect(validation.error).to.be.undefined
        })

        cy.registerProduct((response) => {
            expect(response.status, 'status code').to.eq(401)
            cy.log('Payload Recebido: ', JSON.stringify(response.body))
            const responseValidation = productCreatedResponse.validate()
            expect(responseValidation.error).to.be.undefined
            expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        }, payload, "token")
    });

    it('GET - Deve realizar busca por produtos com sucesso e validar contratos', () => {
        cy.getProducts((response) => {
            const responseValidation = productsResponseContract.validate(response.body)
            expect(responseValidation.error, 'Contrato Validado').to.be.undefined
            expect(response.body.quantidade, 'quantidade deve bater com length')
                .to.eq(response.body.produtos.length)
        })
    })

    it('GET - Deve realizar busca de produto por ID (comparar com item da lista)', () => {
        cy.getProducts((responseAll) => {
            const responseValidation = productsResponseContract.validate(responseAll.body)
            expect(responseValidation.error).to.be.undefined
            const user = responseAll.body.produtos[0]
            const userId = user._id
            expect(userId, 'Deve existir um _id válido').to.exist
            cy.getProducts((responseById) => {
                expect(responseById.body).to.have.property('_id', userId)
                expect(responseById.body, 'Testar Produto').to.deep.equal(user)
            }, userId)
        })
    })

    it('GET - Deve retornar erro ao buscar produto com ID válido porém inexistente', () => {
        const invalidId = 'idinexistente123'

        cy.request({
            method: 'GET',
            url: `/produtos/${invalidId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.eq("Produto não encontrado")
        })
    })

    it('GET - Deve retornar erro ao buscar produto com ID inexistente (exemplo fixo)', () => {
        const invalidId = 'id_inexistente_123'

        cy.request({
            method: 'GET',
            url: `/produtos/${invalidId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('id')
            expect(response.body.id).to.eq("id deve ter exatamente 16 caracteres alfanuméricos")
        })
    })
})