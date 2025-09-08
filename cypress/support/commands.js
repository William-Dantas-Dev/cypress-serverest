Cypress.Commands.add('validatePayload', (schema, payload, options = {}) => {
    const result = schema.validate(payload, options)
    return cy.wrap(result)
})

Cypress.Commands.add('loginRequest', (payload, callback) => {
    cy.request({
        method: 'POST',
        url: '/login',
        body: payload,
        failOnStatusCode: false
    }).then((response) => {
        cy.log('Payload enviado:', JSON.stringify(payload))
        cy.log('Resposta recebida:', JSON.stringify(response.body))
        callback(response)
    })
})

Cypress.Commands.add('registerRequest', (payload, callback) => {
    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: payload,
        failOnStatusCode: false
    }).then((response) => {
        cy.log('Payload enviado:', JSON.stringify(payload))
        cy.log('Resposta recebida:', JSON.stringify(response.body))
        callback(response)
    })
})

Cypress.Commands.add('getUsers', (callback, id = null) => {
    cy.request({
        method: 'GET',
        url: id == null ? `/usuarios` : `/usuarios/${id}`,
    }).then((response) => {
        expect(response.status, 'status code').to.eq(200)
        expect(response.headers, 'headers').to.have.property('content-type')
        expect(response.headers['content-type']).to.match(/application\/json/i)
        callback(response)
    })
})

