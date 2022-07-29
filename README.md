# Template de Node com Fastify

![Node.js CI](https://github.com/rodrigocode4/node-fastify-template/actions/workflows/ci.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/rodrigocode4/node-fastify-template/badge.svg?branch=main)](https://coveralls.io/github/rodrigocode4/node-fastify-template?branch=main)
[![Licença](https://img.shields.io/badge/license-MIT-green/)](./LICENSE.md)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?logo=yarn&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?logo=amazon-aws&logoColor=white)

> Este projeto tem como proposta, ser um template "completo" para iniciar projetos para produção, com: Swagger, Banco de Dados, Lint, ORM entre outras coisas já configuradas para você apenas colocar a mão nas regras de negócio definidas nas suas tasks.


## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Node.js versão >= 16.15.0
* Yarn versão >= 1.22.18
* Docker versão >= 20.10.16
* Docker Compose versão >= 2.7.0


## ☕ Configurando variáveis de ambiente
Crie a variável de ambiente `.env`, usando o modelo `.env.example`, com o seguinte comando (se vc user unix) no terminal:

```
cat .env.example >> .env
```

## 🐳 Subindo banco de dados com docker compose
Para criar as tabelas no banco de dados, execute no terminal:
```
docker compose up -d
```

## 🚀 Instalando as depedências
Para instalar os pacotes de depedências, execute no terminal:
```
yarn install
```

## 🎲 Migrations de banco de dados
Para criar as tabelas no banco de dados, execute no terminal:
```
yarn migrate:run
```

Para deletar as tabelas no banco de dados, execute no terminal:
```
yarn migrate:reset
```

## 🏗 Iniciando o projeto para dev
```
yarn start
```

## 🃏 Rodando testes do projeto
```
yarn test
```

## 📫 Contribuindo o projeto
Para contribuir com o projeto, siga estas etapas:

1. Faça o fork deste repositório.
2. Crie um branch a partir da `develop`: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as usando [conventional commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) : `git commit -m feat: '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie o pull request.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 😄 Toda contriuição é bem-vinda

## 📝 Licença

Esse projeto está sob licença [MIT](LICENSE.md).

[⬆ Voltar ao topo](#)<br>
