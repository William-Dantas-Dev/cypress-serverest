import { faker } from '@faker-js/faker';
import productsResponseContract from "../../contracts/products/products.response.contract"

describe('Users', () => {
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