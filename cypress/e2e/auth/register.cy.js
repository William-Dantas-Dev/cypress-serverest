import { faker } from '@faker-js/faker';
import { registerRequest } from '../../contracts/auth/register.request.contract'
import { registerErrorConflict, registerErrorValidation, registerSuccess } from '../../contracts/auth/register.response.contract';

describe('Auth /usuarios - Cadastro', () => {


    it('POST - Deve cadastrar um usuário válido (201) e seguir o contrato', () => {
        const payload = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        }
        cy.validatePayload(registerRequest, payload).then(validation => {
            expect(validation.error).to.be.undefined
        })

        cy.registerRequest(payload, (response) => {
            expect(response.status).to.eq(201)
            const responseValidation = registerSuccess.validate(response.body)
            expect(responseValidation.error).to.be.undefined
        })
    });

    it('POST - Não deve permitir e-mail duplicado', () => {
        const payload = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        }

        cy.validatePayload(registerRequest, payload).then(validation => {
            expect(validation.error).to.be.undefined
        })

        cy.registerRequest(payload, (response) => {
            expect(response.status).to.eq(201)
            const responseValidation = registerSuccess.validate(response.body)
            expect(responseValidation.error).to.be.undefined

            cy.registerRequest(payload, (response2) => {
                expect(response2.status).to.eq(400)
                cy.validatePayload(registerErrorConflict, response2.body).then(({ error }) => expect(error).to.be.undefined);
            })
        })
    })

    it('POST - Deve falhar com e-mail inválido', () => {
        const bad = {
            nome: faker.person.fullName(),
            email: 'invalido@@dominio',
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        };

        cy.registerRequest(bad, (res) => {
            expect([400, 422]).to.include(res.status);
            cy.log('Resposta recebida Test:', JSON.stringify(res.body))
            cy.validatePayload(registerErrorValidation, res.body)
                .then(({ error }) => expect(error).to.be.undefined);
        });
    });

    it('deve falhar sem campos obrigatórios', () => {
        const bad = {
            email: faker.internet.email().toLowerCase(),
            administrador: 'true'
        };

        cy.registerRequest(bad, (res) => {
            expect([400, 422]).to.include(res.status);
            cy.validatePayload(registerErrorValidation, res.body)
                .then(({ error }) => expect(error).to.be.undefined);
        });
    });
})