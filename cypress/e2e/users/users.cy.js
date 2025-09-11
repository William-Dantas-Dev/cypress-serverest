import { faker } from '@faker-js/faker';
import usersResponseContract from "../../contracts/users/users.request.contract"

describe('Users', () => {
    it('GET - Deve realizar busca por usuarios com sucesso e validar contratos', () => {
        cy.getUsers((response) => {
            const responseValidation = usersResponseContract.validate(response.body)
            expect(responseValidation.error, 'Contrato Validado').to.be.undefined
            expect(response.body.quantidade, 'quantidade deve bater com length')
                .to.eq(response.body.usuarios.length)
        })
    })

    it('GET - Deve realizar busca de usuario por ID (comparar com item da lista)', () => {
        cy.getUsers((responseAll) => {
            const responseValidation = usersResponseContract.validate(responseAll.body)
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

    it('PUT - Deve alterar um usuário já cadastrado', () => {
        const payload = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        }

        cy.getUsers((responseAll) => {
            const responseValidation = usersResponseContract.validate(responseAll.body)
            expect(responseValidation.error).to.be.undefined
            const user = Cypress._.sample(responseAll.body.usuarios)
            cy.putUser((response) => {
                expect(response.status, 'status code').to.eq(200)
                expect(response.body.message).to.eq("Registro alterado com sucesso")
            }, user._id, payload)
        })
    })

    it('PUT - Deve realizar cadastro caso id invalido', () => {
        const payload = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        }

        cy.putUser((response) => {
            expect(response.status, 'status code').to.eq(201)
            expect(response.body.message).to.eq("Cadastro realizado com sucesso")
        }, "id_inexistente_123", payload)
    })

    it('PUT - Deve ocorrer erro caso e-mail ja cadastrado', () => {
        const payload = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        }

        cy.getUsers((responseAll) => {
            const responseValidation = usersResponseContract.validate(responseAll.body)
            expect(responseValidation.error).to.be.undefined

            const users = responseAll.body.usuarios
            expect(users.length, 'Precisa haver ao menos 2 usuários').to.be.greaterThan(1)

            const [userA, userB] = Cypress._.sampleSize(users, 2)
            expect(userA._id, 'userA id').to.exist
            expect(userB.email, 'userB email').to.exist

            const payloadDuplicado = {
                ...payload,
                email: userB.email,
            }
            cy.putUser((response) => {
                expect(response.status, 'status code').to.eq(400)
                expect(response.body.message).to.eq("Este email já está sendo usado")
            }, userA._id, payloadDuplicado)
        })
    })

    it('DELETE - Deve deletar o usuario com sucesso', () => {
        cy.getUsers((responseAll) => {
            const responseValidation = usersResponseContract.validate(responseAll.body)
            expect(responseValidation.error).to.be.undefined
            const user = Cypress._.sample(responseAll.body.usuarios)
            cy.deleteUser((response) => {
                expect(response.status, 'Status Code').to.eq(200)
                expect(response.body.message).to.eq("Registro excluído com sucesso")
            }, user._id)
        })
    })

    it('DELETE - Deve ocorrer erro ao tentar deletar usuario com ID invalido', () => {
        cy.deleteUser((response) => {
            expect(response.status, 'Status Code').to.eq(200)
            expect(response.body.message).to.eq("Nenhum registro excluído")
        }, "id_inexistente_123")
    })

    it('DELETE - Deve ocorrer erro ao tentar deletar usuario com carrinho cadastrado', () => {
        cy.deleteUser((response) => {
            // TO DO
        }, "id_inexistente_123")
    })
})