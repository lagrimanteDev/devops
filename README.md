# Utilizando o GITHUB Workflows

Este repositório demonstra o uso do GitHub Actions para automatizar processos de CI/CD.

Criado em : 04/09/2026

## Exercicios da Aula 5

### 1. Runner vazio

Antes do checkout, `index.html` nao aparece na listagem: o Runner inicia com o
workspace vazio. A mensagem do `echo` aparece porque ela e executada pelo shell,
independentemente de existirem arquivos. Portanto, essa mensagem sozinha nao
comprova que o codigo foi carregado e nao e um teste confiavel de presenca dos
arquivos.

### 2. Checkout e auditoria

Depois de `actions/checkout@v4`, o repositorio e copiado para o workspace e os
arquivos passam a aparecer no `ls -R`. Se a auditoria vier antes do checkout,
ela encontrara o workspace vazio, pois os passos executam na ordem escrita.

`uses` executa uma Action reutilizavel, como `actions/checkout@v4`.
`run` executa um comando no Runner, como `find . -name "*.html" | wc -l`.

### 3. HTMLHint

O `with` fornece configuracoes ou entradas para uma Action. Como a Action
apresentada no material nao esta disponivel, o workflow usa o linter direto:
`npx --yes htmlhint "**/*.html"`. Se o caminho apontar para um arquivo que nao
existe, nenhum arquivo pode ser validado; por isso o log e a contagem de arquivos
devem ser conferidos para evitar um falso sucesso.

### 4. Fail Fast

Erros de `alt`, tags abertas ou ausencia de `title` fazem o HTMLHint interromper
o job e apontar arquivo, linha e regra. Corrigir antes do deploy e mais barato e
previsivel do que descobrir o problema depois que o cliente abriu o site.

Na Parte A, os testes produziram estas regras: sem `<title>`, `title-require`;
sem `</section>`, `tag-pair`; e sem `alt` na imagem, `alt-require`. Depois de
registrar cada falha, os tres problemas foram corrigidos antes da publicacao.

### 5. Versoes das Actions

Uma referencia inexistente, como `actions/checkout@v99`, faz o job falhar antes
de executar os passos seguintes. Fixar uma versao conhecida torna o pipeline
mais estavel e previsivel. Sem fixacao, uma mudanca futura da Action pode alterar
o comportamento ou introduzir uma falha inesperada. Versoes controladas tambem
reduzem o risco operacional e facilitam auditoria e reproducao.

### 6. Estrutura final

O workflow valida `index.html`, `sobre.html` e `contato.html`, aplica as regras
de `.htmlhintrc` e mostra a quantidade de arquivos HTML encontrados. Para
observar cada etapa no GitHub, faca um push por experimento e abra o caminho
`Job -> passo -> log`.