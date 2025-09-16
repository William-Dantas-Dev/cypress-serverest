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
- ✅ **POST - Login com sucesso** → deve realizar login com sucesso com dados validados
- ❌ **POST - Login com senha incorreta** → deve retornar erro de autenticação  
- ❌ **POST - Login com e-mail inválido** → deve retornar erro de validação  
- ❌ **POST - Login com e-mail não cadastrado** → deve retornar erro de usuário inexistente  
- ❌ **POST - Login com e-mail em branco** → deve retornar erro de campo obrigatório  
- ❌ **POST - Login com password em branco** → deve retornar erro de campo obrigatório  

### 🔐 Auth - Register
- ✅ **POST - Cadastro com sucesso (201)** → validar contrato e retorno  
- ❌ **POST - Não deve permitir e-mail duplicado** → deve retornar erro `400` e contrato de conflito  
- ❌ **POST - Deve falhar com e-mail inválido** → deve retornar erro `400/422` e contrato de validação  
- ❌ **POST - Deve falhar sem campos obrigatórios** → deve retornar erro `400/422` e contrato de validação 

### 👥 Usuários
- ✅ **GET - Listar usuários com sucesso** → validar contrato e consistência entre `quantidade` e `usuarios.length`  
- ✅ **GET - Buscar usuário por ID válido** → comparar com item da listagem  
- ❌ **GET - Buscar usuário com ID válido porém inexistente** → deve retornar erro `400` com `"Usuário não encontrado"`  
- ❌ **GET - Buscar usuário com formato de ID inválido** → deve retornar erro `400` com `"id deve ter exatamente 16 caracteres alfanuméricos"`  
- ✅ **PUT - Alterar usuário com sucesso** → Deve alterar um usuário já cadastrado 
- ✅ **PUT - Cadastrar usuário com Id invalido** → Deve realizar cadastro caso id invalido
- ❌ **PUT - Cadastro com e-mail ja cadastrado** → Deve ocorrer erro caso e-mail ja cadastrado
- ✅ **DELETE - Deletar usuário com sucesso** → Deve deletar o usuario com sucesso
- ❌ **DELETE - Erro ao deletar usuário - ID Invalido** → Deve ocorrer erro ao tentar deletar usuario com ID invalido
- ❌ **DELETE - Erro ao deletar usuário com carrinho** -> TODO

### 📦 Produtos
- ✅ **POST - Cadastrar Produto** → Deve cadastrar um produto válido (201) e seguir o contrato
- ❌ **POST - Cadastrar Produto Nome Ja Existente** → Não deve cadastrar produto com nome já existente (400)
- ❌ **POST - Validar token ao Cadastrar produto** → Não deve cadastrar produto por Token de acesso ausente, inválido ou expirado
- ✅ **PUT - Alterar Produto** → Deve alterar um produto válido (200) e seguir o contrato
- ✅ **PUT - Alterar o produto - Cadastro** → Deve cadastrar um produto caso ID não seja encontrado (201)
- ❌ **PUT - Validar token ao Alterar produto** → Não deve alterar produto por Token de acesso ausente, inválido ou expirado
- ❌ **PUT - Erro ao alterar produto com mesmo nome** → deve retornar erro `400` ao alterar produto com nome ja cadastrado
- ✅ **GET - Listar todos os produtos** → validar contrato e consistência entre `quantidade` e `produtos.length`  
- ✅ **GET - Buscar produto por ID válido** → comparar com item da listagem  
- ❌ **GET - Buscar produto com ID válido porém inexistente** → deve retornar erro `400` com `"Produto não encontrado"` 
- ❌ **GET - Buscar produto com formato de ID inválido** → deve retornar erro `400` com `"id deve ter exatamente 16 caracteres alfanuméricos"` 
- ✅ **DELETE - Deletar Produto** → Deve deletar um produto valido
- ❌ **DELETE - Validar token ao Deletar produto** → Não deve deletar produto por Token de acesso ausente, inválido ou expirado

### 🛒 Carrinho
- ✅ **GET - Deve pegar todos os Carrinhos** → Deve buscar todos os carrinhos cadastrados
- ✅ **POST - Cadastrar Carrinho** → Deve cadastrar um novo carrinho que vincula com o usuário autenticado
- ✅ **DELETE - Deletar Carrinho** → Deve deletar o carrinho do usuário autenticado

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
