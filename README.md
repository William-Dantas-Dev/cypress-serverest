# 📌 Cypress Serverest

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)  
[![Cypress](https://img.shields.io/badge/Cypress-15.x-brightgreen)](https://www.cypress.io/)  
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  

Projeto de **testes automatizados de API** utilizando **Cypress** e a API **[Serverest](https://serverest.dev/)** para simulação de um ambiente de e-commerce.  
Inclui **validação de contratos** com [Joi](https://joi.dev/).  

---

## 🚀 Tecnologias utilizadas
- [Node.js](https://nodejs.org/)  
- [Cypress](https://www.cypress.io/)  
- [Serverest](https://serverest.dev/)  
- [Joi](https://joi.dev/) – para contratos de resposta  

---

## 📂 Estrutura do projeto
```bash
cypress-serverest/
├── cypress/
├── ├── contracts  
│   ├── e2e/              # Cenários de testes E2E
│   │   └── users.cy.js   # Exemplo de testes de usuários
│   ├── fixtures/         # Massa de dados para os testes
│   ├── support/          # Configurações e comandos customizados
│   └── videos/           # Gravações dos testes (ignorado no git)
│
├── cypress.config.js     # Configurações do Cypress
├── package.json
└── README.md
```

---

## ⚙️ Instalação

Clone o repositório:  
```bash
git clone https://github.com/William-Dantas-Dev/cypress-serverest.git
cd cypress-serverest
```

Instale as dependências:  
```bash
npm install
```

---

## ▶️ Como rodar os testes

### Abrir interface do Cypress
```bash
npx cypress open
```

### Rodar em modo headless
```bash
npx cypress run
```

---

## 📋 Scripts úteis

No `package.json` você pode rodar:  

```bash
# Abrir Cypress com interface
npm run cypress:open

# Rodar todos os testes em headless
npm run cypress:run
```

---

## 📜 Licença
Este projeto é apenas para fins de estudo e prática de automação de testes.  
