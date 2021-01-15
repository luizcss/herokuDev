# Qualidade - Análise Estática de Código

A análise estática contempla a verificação da qualidade do código desenvolvido de aplicação SPA com objetivo de melhorar a aderência a boas práticas de programação e aos padrões definidos pela organização. Essa análise é efetuada pela ferramenta **TSLint**, que oferece um conjunto de regras de boas práticas para código TypeScript, com apoio da bibliotecas Codelyzer.

## Dependências

Para executar a análise estática utilizando as bibliotecas descritas acima, as seguintes dependências devem ser configuradas na arquivo **package.json** da aplicação SPA:

```json
{
  "typescript": "~3.5.3",
  "tslint": "~5.12.0",
  "codelyzer": "~4.5.0"
}
```

## Como utilizar

As regras verificadas pelo TSLint devem ser configuradas no arquivo **tslint.json**. Caso o arquivo não esteja incluído, deve ser criado manualmente como abaixo:

```json
{
  "rulesDirectory": ["node_modules/codelyzer"],
  "rules": {
    "arrow-return-shorthand": true,
    "callable-types": true,
    "class-name": true,
    "comment-format": [true, "check-space"],
    "curly": true,
    "deprecation": {
      "severity": "warn"
    },
    "eofline": true,
    "forin": true,
    "import-blacklist": [true, "rxjs/Rx"],
    "import-spacing": true,
    "indent": [true, "spaces"],
    "interface-over-type-literal": true,
    "label-position": true,
    "max-line-length": [true, 140],
    "member-access": false,
    "member-ordering": [
      true,
      {
        "order": ["static-field", "instance-field", "static-method", "instance-method"]
      }
    ],
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [true, "debug", "info", "time", "timeEnd", "trace"],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-super": true,
    "no-empty": false,
    "no-empty-interface": true,
    "no-eval": true,
    "no-inferrable-types": [true, "ignore-params"],
    "no-misused-new": true,
    "no-non-null-assertion": true,
    "no-shadowed-variable": true,
    "no-string-literal": false,
    "no-string-throw": true,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": true,
    "no-unnecessary-initializer": true,
    "no-unused-expression": true,
    "no-use-before-declare": true,
    "no-var-keyword": true,
    "object-literal-sort-keys": false,
    "prefer-const": true,
    "quotemark": [true, "single"],
    "radix": true,
    "semicolon": [true, "always"],
    "triple-equals": [true, "allow-null-check"],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "unified-signatures": true,
    "variable-name": false,
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ],
    "no-output-on-prefix": true,
    "use-input-property-decorator": true,
    "use-output-property-decorator": true,
    "use-host-property-decorator": true,
    "no-input-rename": true,
    "no-output-rename": true,
    "use-life-cycle-interface": true,
    "use-pipe-transform-interface": true,
    "component-class-suffix": true,
    "directive-class-suffix": true,
    "cyclomatic-complexity": [true, 5],
    "no-duplicate-variable": true
  }
}
```

Esta é a configuração padrão definida pela arquitetura, caso queira adicionar alguma outra regra, consulte a [documentação oficial](https://palantir.github.io/tslint/rules/) do TSLint para a lista completa de regras disponíveis.

Para realizar a análise, execute o seguinte comando (configurado no **package.json**):

```ts
npm run tslint:report
```

Será gerado um arquivo **tslint.report** com o resultado da análise. Caso queira ver o resultado diretamente no console, remova o trecho ":report" do comando.

## Desenvolvimento integrado ao Visual Studio Code

A arquitetura recomenda o uso da [extensão](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) do TSLint para o Visual Studio Code. Através dessa extensão é possível saber se alguma das regras está sendo violada em tempo de desenvolvimento. Para instalar a extensão siga o passo-a-passo abaixo:

1. Acesse a paleta de comandos (ctrl+shift+p) e digite **ext install**, selecione o item **"Extensions: Install Extensions"**.
2. Digite **"tslint"** na aba "Extensions" no lado esquerdo, selecione a primeira opção e clique em **install**.
3. Reinicie o Visual Studio Code. Ao término da abertura, e quando um arquivo de TypeScript estiver aberto, deverá aparecer no canto inferior da tela azul, uma indicação do plugin rodando.

## Regras

**class-name**
Definição:

Valida se os nomes de Classes e Interfaces foram escritos no formato PascalCase.

**component-class-suffix**
Definição:

Verifica se as classes definidas dentro dos arquivos \*.component.ts possuem o sufixo Component em seu nome.

**cyclomatic-complexity**
Definição:

Avalia a complexidade de uma função de acordo com a quantidade de caminhos alternativos que o código pode percorrer. A complexidade máxima recomendada pela arquitetura é 5.

**comment-format**
Definição:

Verifica se a formatação dos comentários do código estão no padrão linha única. Essa regra tem como objetivo manter o código legível e consistente.

**directive-class-suffix**
Definição:

Verifica se as classes definidas dentro dos arquivos \*.directive.ts possuem o sufixo Directive em seu nome.

**max-line-length**
Definição:

Valida se as linhas de código possuem no máximo 140 caracteres.

**no-arg**
Definição:

Não permite o uso da propriedade arguments.callee.

**no-bitwise**
Definição:

Valida se não há operadores bit a bit sendo utilizados no código. Os operadores listados a seguir estão banidos pela regra: &, &=, |, |=, ^, ^=, <<, <<=,>>, >>=, >>>, >>>=, e ~.

A regra não proíbe a utilização de & e | para operações de união e intercessão. A utilização desses tipos de operadores diminui a manutenibilidade do código.

**no-console**
Definição:

Valida se não há métodos "console" perdidos pelo código. Em geral, métodos "console" não são apropriados para o código em produção.

**no-construct**
Definição:

Não permite o acesso aos construtores dos tipos String, Number e Boolean, como por exemplo na expressão new Number(10).

**no-debugger**
Definição:

Não permite o uso do operador debbuger. Em geral, o operador debbuger não é apropriado para o código em produção.

**no-duplicate-variable**
Definição:

Valida que uma variável não está sendo redeclarada dentro de um mesmo bloco de código.

**no-eval**
Definição:

Não permite o uso da função eval do JavaScript.

**no-unused-expression**
Definição:

Valida que não há expressões “perdidas” no meio do código, que não representam atribuição de valor a uma variável ou chamada de função.

**no-use-before-declare**
Definição:

Valida se as variáveis não estão sendo utilizadas sem terem sido declaradas.

**no-var-keyword**
Definição:

Não permite a utilização da palavra “var” para declarar variáveis, devendo ser usado o padrão de declaração com let ou const do TypeScript.

**semicolon**
Definição:

Valida se todas as linhas de código terminam com um caractere de ponto e vírgula

**variable-name**
Definição:

Valida se as variáveis estão escritas nos formatos lowerCamelCase ou UPPER_CASE e que não estão sendo utilizados nomes reservados da linguagem TypeScript como any, Number, number, String, string, Boolean, boolean, Undefined e undefined.

## Validação no Quality Gate (Sonar)

---PENDENTE ALINHAMENTO COM BRK

| Regra                  | Grau de Severidade |
| ---------------------- | ------------------ |
| class-name             | major              |
| component-class-suffix | major              |
| cyclomatic-complexity  | major              |
| comment-format         | major              |
| directive-class-suffix | major              |
| max-line-length        | critical           |
| no-arg                 | major              |
| no-bitwise             | critical           |
| no-console             | critical           |
| no-construct           | major              |
| no-debugger            | critical           |
| no-duplicate-variable  | major              |
| no-eval                | critical           |
| no-unused-expression   | major              |
| no-use-before-declare  | major              |
| no-var-keyword         | major              |
| semicolon              | major              |
| variable-name          | major              |

As outras regras que estão listadas no arquivo de **tslint.json** que **não foram mencionadas representam itens MINOR**.
