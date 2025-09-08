import getUsersResponseContract from "../../contracts/users/get.users.response.contract"

describe('GET - Users', () => {
    it('GET - Deve realizar busca por usuarios com sucesso e validar contratos', () => {
        cy.getUsers((response) => {
            const responseValidation = getUsersResponseContract.validate(response.body)
            expect(responseValidation.error, 'Contrato Validado').to.be.undefined
            expect(response.body.quantidade, 'quantidade deve bater com length')
                .to.eq(response.body.usuarios.length)
        })
    })

    it('GET - Deve realizar busca de usuario por ID (comparar com item da lista)', () => {
        cy.getUsers((responseAll) => {
            const responseValidation = getUsersResponseContract.validate(responseAll.body)
            expect(responseValidation.error).to.be.undefined
            const user = responseAll.body.usuarios[0]
            const userId = user._id
            expect(userId, 'Deve existir um _id válido').to.exist
            cy.getUsers((responseById) => {
                expect(responseById.body).to.have.property('_id', userId)
                expect(responseById.body, 'Testar Usuario').to.deep.equal(user)
            }, userId)
        })
    })

    it('GET - Deve retornar erro ao buscar usuario com ID válido porém inexistente', () => {
        const invalidId = 'idinexistente123'

        cy.request({
            method: 'GET',
            url: `/usuarios/${invalidId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.eq("Usuário não encontrado")
        })
    })

    it('GET - Deve retornar erro ao buscar usuario com ID inexistente (exemplo fixo)', () => {
        const invalidId = 'id_inexistente_123'

        cy.request({
            method: 'GET',
            url: `/usuarios/${invalidId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('id')
            expect(response.body.id).to.eq("id deve ter exatamente 16 caracteres alfanuméricos")
        })
    })
})