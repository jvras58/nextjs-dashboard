# Projeto Dashboard Usando Next.JS

Este projeto é um dashboard desenvolvido com Next.JS, inspirado no Google Data Studio. O objetivo é criar uma aplicação rápida e eficiente, superando as limitações de desempenho do Google Data Studio.

## Link de Referência
[Google Data Studio](https://lookerstudio.google.com/u/0/reporting/bf4f21cf-438e-4ba6-baf8-53daa70d2e57/page/tUbQE)

## Problema
O Google Data Studio pode ser lento e às vezes trava, então a velocidade é essencial para este projeto.

## Configurações do Firebase
Usando as configurações do Firebase da Betinha, tanto o Data Studio quanto o parâmetro dinâmico utilizado devem ser `/betinha1731`.

## Organização do Projeto NEXT 14

```
/
├─📁 public            ->  [Pagina para imagens e icons]
├─📁 src               ->  [Implementação da aplicação]
│ ├─📁 app           ->  [Entrypoint]
│ │ ├─📁 charts 
│ │ │  ├─📁 basic-chart ->  [Route das paginas de graficos base]
│ │ │  │ ├─⚛ page.tsx
│ │ |
│ │ ├─📁 tables         ->  [Route das paginas de tabelas]
│ │   ├─⚛ page.tsx
│ │ 
│ │ ✨ favicon.ico
│ │ ⚛  layout.tsx
│ │ ⚛  page.tsx         ->  [Páginas de entrada [que chama o component de dashboard]] 
│ │ 
│ ├─📁 components        ->  [components proprios]
│ │ ├─📁 xxxxxxx
│ │ │ ├─⚛ xxxxx.tsx
│ │ 
│ │ ├─📁 ui              ->  [components UI]
│ │ │ ├─⚛ xxxxx.tsx
│ │ 
│ ├─📁 css              ->  []
│ │  ├─🖌️ style.css
│ │  ├─🖌️ satoshi.css
│ │
│ ├─📁 firebase         ->  [configuração do firebase]
│ │  ├─⚛ config.tsx
│ │
│ ├─📁 fonts         ->  [fonts do front]
│ │  ├─ 𝓐 xxxxx-xxx.eot
│ │  ├─ 𝓐 xxxxx-xxx.tft
│ │  ├─ 𝓐 xxxxx-xxx.wolf
│ │     ...
│ ├─📁 hooks         ->  []
│ │  ├─⚛ useXXXX.tsx
│ │      ...
│ ├─📁 lib         ->  []
│ │  ├─🇹 utils.ts
│ │
│ ├─📁 types         ->  [tipagem para o typescript]
│ │  ├─🇹 xxxx.ts
│ │      ...
│ .env
│ .eslintrc.json
│ 𝓟 .prettierrc
| {} components.json ->  [configuração do shadcn/UI]
| 🇹 jsvectormap.d.ts
| 🇹 next-env.d.ts
| 🇹 next-env.d.ts
| 𝓝  next.config.mjs
| 🇹 tailwind.config.ts
| {} tsconfig.json
├─📄 .gitignore
├─🇯‌🇸‌ package.json    ->  Definições para o projeto
├─📄 README.MD
```


## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm install`
Instala as dependências do projeto.

### `npm run dev`
Inicia o servidor de desenvolvimento.

## Configuração do Firebase

Certifique-se de configurar as regras de segurança no Firebase para permitir a leitura e escrita no banco de dados.

### Observação sobre Variáveis de Ambiente

Devido a limitações do Next.js e preguiça do programado, as variáveis de ambiente no arquivo `.env` só funcionam corretamente em arquivos Node, como `api/route.js`. Para contornar essa limitação temporariamente, a configuração do Firebase deve ser definida diretamente em [`config`](src/firebase/config.tsx). Para mais informações, consulte a [documentação do Next.js sobre variáveis de ambiente](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables).