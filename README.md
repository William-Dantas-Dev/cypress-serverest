# 📌 Cypress Serverest

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green)](https://nodejs.org/)  
[![Cypress](https://img.shields.io/badge/Cypress-15.x-brightgreen)](https://www.cypress.io/)  
[![Joi](https://img.shields.io/badge/joi-18.x-brightgreen)](https://joi.dev/)  
[![Faker JS](https://img.shields.io/badge/FakerJs-18.x-brightgreen)](https://fakerjs.dev)  
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  

Projeto de **testes automatizados de API** utilizando **Cypress** e a API **[Serverest](https://serverest.dev/)** para simulação de um ambiente de e-commerce.  
Inclui **validação de contratos** com [Joi](https://joi.dev/).  

---

## 🚀 Tecnologias utilizadas
- [Node.js](https://nodejs.org/)  
- [Cypress](https://www.cypress.io/)  
- [Serverest](https://serverest.dev/)  
- [Joi](https://joi.dev/)
- [Fakerjs](https://fakerjs.dev)

---

## 📂 Estrutura do projeto
```bash
cypress-serverest/
├── cypress/
├── ├── contracts  
│   ├── e2e/
│   │   └── users.cy.js
│   ├── fixtures/
│   ├── support/
│   └── videos/
│
├── cypress.config.js 
├── package.json
└── README.md
```
---

## 📑 Cenários de Teste Implementados

### 🔐 Auth - Login
- ✅ **Login com sucesso**  
- ❌ **Login com senha incorreta** → deve retornar erro de autenticação  
- ❌ **Login com e-mail inválido** → deve retornar erro de validação  
- ❌ **Login com e-mail não cadastrado** → deve retornar erro de usuário inexistente  
- ❌ **Login com e-mail em branco** → deve retornar erro de campo obrigatório  
- ❌ **Login com password em branco** → deve retornar erro de campo obrigatório  

### 🔐 Auth - Register (`POST /usuarios`)
- ✅ **Cadastro com sucesso (201)** → validar contrato e retorno  
- ❌ **Não deve permitir e-mail duplicado** → deve retornar erro `400` e contrato de conflito  
- ❌ **Deve falhar com e-mail inválido** → deve retornar erro `400/422` e contrato de validação  
- ❌ **Deve falhar sem campos obrigatórios** → deve retornar erro `400/422` e contrato de validação 

### 👥 Usuários
- ✅ **Listar usuários com sucesso** → validar contrato e consistência entre `quantidade` e `usuarios.length`  
- ✅ **Buscar usuário por ID válido** → comparar com item da listagem  
- ❌ **Buscar usuário com ID válido porém inexistente** → deve retornar erro `400` com `"Usuário não encontrado"`  
- ❌ **Buscar usuário com formato de ID inválido** → deve retornar erro `400` com `"id deve ter exatamente 16 caracteres alfanuméricos"`  
- ✅ **Alterar usuário com sucesso** → Deve alterar um usuário já cadastrado 
- ✅ **Cadastrar usuário com Id invalido** → Deve realizar cadastro caso id invalido
- ❌ **Cadastro com e-mail ja cadastrado** → Deve ocorrer erro caso e-mail ja cadastrado
- ✅ **Deletar usuário com sucesso** → Deve deletar o usuario com sucesso
- ❌ **Erro ao deletar usuário - ID Invalido** → Deve ocorrer erro ao tentar deletar usuario com ID invalido
- ❌ **Erro ao deletar usuário com carrinho** -> TODO

### 📦 Produtos
- (em desenvolvimento)  

### 🛒 Carrinho
- (em desenvolvimento)  

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
