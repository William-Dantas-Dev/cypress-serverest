import loginRequest from '../../contracts/auth/login.request.contract'
import { loginSuccessResponse, loginErrorResponse, validationEmailErrorResponse, validationRequiredFieldErrorResponse } from '../../contracts/auth/login.response.contract'
import { faker } from '@faker-js/faker'

describe('Auth - Login', () => {
    const payload = {
        email: 'fulano@qa.com',
        password: 'teste'
    }

    it('Deve realizar login com sucesso e validar contratos', () => {
        cy.validatePayload(loginRequest, payload).then(validation => {
            expect(validation.error).to.be.undefined
        })
        cy.loginRequest(payload, (response) => {
            expect(response.status).to.eq(200)
            const responseValidation = loginSuccessResponse.validate(response.body)
            expect(responseValidation.error).to.be.undefined
        })
    })
    it('Não deve logar com senha incorreta', () => {
        const invalidPayload = {
            ...payload,
            password: 'senha_incorreta'
        }

        cy.validatePayload(loginRequest, invalidPayload).then(validation => {
            expect(validation.error).to.be.undefined
        })

        cy.loginRequest(invalidPayload, (response) => {
            expect(response.status).to.eq(401)
            const responseValidation = loginErrorResponse.validate(response.body)
            expect(responseValidation.error).to.be.undefined
        })
    })

    it('Não deve logar com email invalido', () => {
        const invalidPayload = {
            ...payload,
            email: 'fulano@'
        }

        cy.validatePayload(loginRequest, invalidPayload).then(validation => {
            expect(validation.error).to.not.be.undefined
        })

        cy.loginRequest(invalidPayload, (response) => {
            expect(response.status).to.eq(400)
            const responseValidation = validationEmailErrorResponse.validate(response.body)
            expect(responseValidation.error).to.be.undefined
        })
    })

    it('Não deve logar com email não cadastrado', () => {
        const invalidPayload = {
            ...payload,
            email: faker.internet.email().toLowerCase()
        }

        cy.validatePayload(loginRequest, invalidPayload).then(validation => {
            expect(validation.error).to.be.undefined
        })

        cy.loginRequest(invalidPayload, (response) => {
            expect(response.status).to.eq(401)
            const responseValidation = loginErrorResponse.validate(response.body)
            expect(responseValidation.error).to.be.undefined
        })
    })

    it('Não deve logar com email em branco', () => {
        const invalidPayload = {
            ...payload,
            email: ''
        }

        cy.validatePayload(loginRequest, invalidPayload).then(validation => {
            expect(validation.error).to.not.be.undefined
        })

        cy.loginRequest(invalidPayload, (response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.not.have.property('authorization')
            const responseValidation = validationRequiredFieldErrorResponse.validate(response.body)
            expect(responseValidation.error).to.be.undefined
        })
    })

    it('Não deve logar com password em branco', () => {
        const invalidPayload = {
            ...payload,
            password: ''
        }

        cy.validatePayload(loginRequest, invalidPayload).then(validation => {
            expect(validation.error).to.not.be.undefined
        })

        cy.loginRequest(invalidPayload, (response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.not.have.property('authorization')
            const responseValidation = validationRequiredFieldErrorResponse.validate(response.body)
            expect(responseValidation.error).to.be.undefined
        })
    })
})