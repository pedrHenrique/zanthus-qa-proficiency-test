# SauceDemo com Playwright

Projeto de automação para a Seção 2 do teste técnico. As quatro etapas do item 3.3 do enunciado são quatro testes separados, organizados no mesmo arquivo e numerados no relatório.

1. Acessar o SauceDemo e realizar login com `standard_user` / `secret_sauce`.
2. Ordenar o catálogo e localizar o produto específico `Sauce Labs Backpack` pelo nome exato.
3. Adicionar esse produto ao carrinho e conferir o item.
4. Validar nome, preço e quantidade do produto no resumo do checkout.

## Executar

Requisitos: Node.js 22 ou superior, npm e acesso à internet.

```bash
cd saucedemo-playwright
npm ci
npx playwright install chromium
npm run typecheck
npm test
npm run report
```

## Como o código está organizado

```text
tests/checkout.spec.ts   Quatro testes: login, produto, carrinho e checkout
utils/pages/             Ações e validações de cada tela
utils/pageObject/        Locators nomeados, separados por tela
data/test-data.ts        Usuário público, produto e comprador fictício
playwright.config.ts     Navegador, esperas, relatório e evidências de falha
```

Cada tela tem dois arquivos: um define como localizar seus elementos; o outro define o que fazer e conferir naquela tela. Há quatro telas: login, catálogo, carrinho e checkout.

Os testes ficam agrupados em `test.describe` e aparecem no relatório como `CHK 01 - Acessar a URL e realizar login`, `CHK 02 - Buscar um produto específico no catálogo`, `CHK 03 - Adicionar o item ao carrinho de compras` e `CHK 04 - Validar a presença correta do produto no checkout`.

Cada teste usa uma sessão independente. Os cenários de produto, carrinho e checkout preparam o estado necessário dentro de uma etapa `Preparação`, visível no relatório. Assim, o teste de checkout pode rodar sozinho e os demais continuam executando mesmo se o teste de login falhar. O fluxo de ações mantém a ordem de negócio dentro de cada cenário; não há compartilhamento de carrinho entre testes.

### Veja como as evidências funcionam

As evidências são gerenciadas automaticamente pelo Playwright, apenas pela configuração:

```ts
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

A screenshot é capturada somente em falhas. O vídeo é gravado durante a execução e mantido somente quando o teste falha; em caso de sucesso, é descartado. O teste não chama funções de captura manual.

| Saída | Caminho |
| --- | --- |
| Screenshots e vídeos de falhas | `artifacts/test-results/` |
| Relatório HTML | `artifacts/html-report/index.html` |

`npm run report` abre o relatório. As saídas ficam fora do Git e são substituídas nas próximas execuções.

## Docker

O Dockerfile usa a imagem oficial do Playwright 1.62.1, a mesma versão do pacote, e instala as dependências com `npm ci` e o lockfile. A imagem já contém os browsers e suas bibliotecas. O Compose executa os testes e mantém a pasta `artifacts` no host.

```bash
docker compose up --build --abort-on-container-exit --exit-code-from tests
docker compose down
```

## Uso de IA

A IA auxiliou na estrutura inicial, nos locators e na configuração de evidências. A revisão e o entendimento do código do foi humana.