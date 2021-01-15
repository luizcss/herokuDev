# Versionamento de Código

## Padrão de Commit

A presente arquitetura segue o padrão de commits [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification). Abaixo segue um resumo dos principais padrões de mensagem:
	
* patches: git commit -a -m "fix(parsing): fixed a bug in our parser"
* features: git commit -a -m "feat(parser): we now have a parser \o/"
* breaking changes: git commit -a -m "feat(new-parser): introduces a new parsing library BREAKING CHANGE: new library does not support foo-construct"
* outras mudanças:		
    * docs: git commit -a -m "docs: fixed up the docs a bit" 
    * style: git commit -a -m "style: fixed up the styles a bit"
    * refactor: git commit -a -m "refactor: some refactor code"
    * perf: git commit -a -m "perf: improved performance a bit"
    * test: git commit -a -m "test: fixed up the tests a bit"