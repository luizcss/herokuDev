# Mocks

Esta seção tem como objetivo explicar como utilizar os mocks customizáveis com o Node Liquid Bus (NLB). O Node Liquid Bus é uma arquitetura de back for front (BFF) desenvolvida em NodeJS pela Accenture focada em clientes da área de utilities.

## Como funciona o sistema de mocks no NLB

Ao receber um contrato de uma API é necessário criá-la dentro do seu módulo correspondente no diretório **config/modules/nome-do-modulo**. Exemplo:

**billings.json**
```json
{
    "jwt": {
        "required": true,
        "audience": "brk-portal",
        "allowedPermissions": [
            "mod:san:billings"
        ],
        "expires": 600,
        "create": true,
        "createPayload": {
          "username": "username",
          "USERID": "userid"
        },
        "requiredPayload": {
          "username": "username",
          "USERID": "userid"
        },
        "profile": {
            "forward": true
        }
      },
    "methods": {
        "post": true,
        "get": false
    },
    "log": {
        "request": true,
        "requestBody": false,
        "response": true,
        "responseBody": false
    },
    "filter": {
        "out": {
            "userid": false
        }
    },
    "channel": {
        "param": "channel"
    }
}
```

Ao fazer isso seguindo essa estrutura de diretórios, o módulo correspondente implementado no NodeJS irá criar a api de forma dinâmica. O response mockado será retornado caso exista um mock corresponde para api na pasta mocks e possua a flag **active: true**.

## Como criar um novo mock de serviço

1. Acesse o diretório **config/mocks/nome-do-modulo**, onde *nome-do-modulo* corresponde ao nome do módulo que retorna os dados requisitados (ex.: san, sap, oracle crm ...). 
2. Dentro desse diretório crie um json com o nome da API a ser mockada.

No exemplo a seguir criaremos um mock para a API Billings do módulo SAN:

```json
{
  "mocks": {
    "active": true,
    "delay": {
      "type": "fixed",
      "value": 500
    },
    "matches": [
      {
        "params": {
          "userid": 1
        },
        "return": {
          "E_RESULT": "",
          "E_MSG": "",
          "billingsList": [
            {
              "year": 2020,
              "month": "Janeiro",
              "value": 1050.00,
              "status": "Paga"
            },
            {
              "year": 2020,
              "month": "Fevereiro",
              "value": 750.00,
              "status": "Paga"
            },
            {
              "year": 2020,
              "month": "Março",
              "value": 850.00,
              "status": "Paga"
            },
            {
              "year": 2020,
              "month": "Abril",
              "value": 750.00,
              "status": "Paga"
            },
            {
              "year": 2020,
              "month": "Maio",
              "value": 10250.00,
              "status": "Paga"
            }
          ]
        }
      },
      {
        "params": {
          "userid": 2
        },
        "return": {
          "E_RESULT": "",
          "E_MSG": "",
          "billingsList": [
            {
              "year": "2019",
              "month": "Abril",
              "value": 150.00,
              "status": "Pendente"
            },
            {
              "year": "2019",
              "month": "Maio",
              "value": 250.00,
              "status": "Pendente"
            }
          ]
        }
      },
      {
        "params": {
          "userid": 3
        },
        "return": {
          "E_RESULT": "",
          "E_MSG": "",
          "billingsList": [
            {
              "year": "2019",
              "month": "Janeiro",
              "value": 58.00,
              "status": "Paga"
            },
            {
              "year": "2019",
              "month": "Fevereiro",
              "value": 50.00,
              "status": "Paga"
            },
            {
              "year": "2019",
              "month": "Março",
              "value": 356.00,
              "status": "Paga"
            },
            {
              "year": "2020",
              "month": "Abril",
              "value": 159.00,
              "status": "Pendente"
            },
            {
              "year": "2020",
              "month": "Maio",
              "value": 250.00,
              "status": "Bloqueada"
            }
          ]
        }
      }
    ],
    "default": {
      "E_RESULT": "999",
      "E_MSG": "ERRO"
    }
  }
}
```

A propriedade **active** indica se o mock está ativo para aquele serviço ou não.

A propriedade **delay** indicar o tempo que o serviço deverá levar para ser retornado do servidor.

A propriedade **matches** é um array que contém todas as possíveis respostas de retorno.

### Estrutura da resposta

A resposta pode ser composta por dois campos:

* **params:** são os parâmetros da requisição que levam aquela resposta a ser retornada.
* **return:** conteúdo da resposta mockada. Atualmente os campos **E_RESULT** e **E_MSG** são obrigatórios em todas as respostas, caso venham vazios é uma requisição de sucesso, caso contenham algum valor, a api retorna erro 500 com o código real de erro e a mensagem retornados nesses dois campos.

```json
{
    "params": {
        "userid": 2
    },
    "return": {
        "E_RESULT": "",
        "E_MSG": "",
        "billingsList": [
        {
            "year": "2019",
            "month": "Abril",
            "value": 150.00,
            "status": "Pendente"
        },
        {
            "year": "2019",
            "month": "Maio",
            "value": 250.00,
            "status": "Pendente"
        }
        ]
    }
}
```

## Como rodar

Ao criar uma nova API / mock sempre é necessário rodar o comando a seguir para buildar os módulos do servidor:

```
grunt debug
```

Execute o comando:

```
npm start
```

O back-end para aplicação estará disponível na **porta 9003**.