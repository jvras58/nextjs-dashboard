# Dashboard Afiliados Betinha

## 📖 Sobre o Projeto

O **Dashboard Afiliados Betinha** é uma aplicação web desenvolvida para análise de dados relacionados aos afiliados da plataforma **Betinha**. Através de uma interface limpa e dinâmica, o dashboard permite a visualização e interação com métricas e relatórios específicos de cada afiliado.

Este projeto é um dashboard desenvolvido com Next.JS, inspirado no Google Data Studio. O objetivo é criar uma aplicação rápida e eficiente, superando as limitações de desempenho do Google Data Studio.

## Link de Referência

[Google Data Studio](https://lookerstudio.google.com/u/0/reporting/bf4f21cf-438e-4ba6-baf8-53daa70d2e57/page/tUbQE)

## Problema

O Google Data Studio pode ser lento e às vezes trava, então a velocidade é essencial para este projeto.

## 🚀 Tecnologias e Ferramentas

Este projeto foi desenvolvido utilizando **Next.js** com **shadcn/UI** para componentização e **Firebase** para armazenamento e gerenciamento de dados.

### Stack do Projeto

Este projeto é uma aplicação web que utiliza **Next.js**, um framework React focado em renderização do lado servidor e funcionalidades modernas de desenvolvimento web. O Firebase é utilizado para gerenciar dados dos afiliados, enquanto o frontend fornece uma navegação fluida entre as diferentes páginas e dashboards.

As tecnologias utilizadas são:

| **Tecnologia**        | **Versão**       |
|-----------------------|------------------|
| **Runtime**           |                  |
| Node.js               | v18.x.x          |
| **Framework**         |                  |
| Next.js               | v13.x.x          |
| **Banco de Dados**    |                  |
| Firebase              | v9.x.x           |
| **Devtime**           |                  |
| npm                   | v9.x.x           |

### Organização do Projeto
```
/
├─📁 public            ->  [Pagina para imagens e icons e arquivos csv]
├─📁 src               ->  [Implementação da aplicação]
│ ├─📁 app           ->  [Entrypoint]
│ │ ├─📁 api
│ │ │  ├─📁 sheets  ->  [Api Router sheets]
│ │ │  │ ├─⚛ route.ts
| | |  
│ │ ├─📁 dashboard
│ │ │  ├─📁 [slug]  ->  [Router dinamica do dashboard]
│ │ │  │ ├─⚛ page.tsx
| | |  | 
│ │ |  ├─⚛ page.tsx -> [Router base com os cards dos afiliados]
| | |  
│ │ ├─📁 campanha 
│ │ |  ├─⚛ page.tsx -> [page com sistema de geração de links]
| | |  
│ │ ✨ favicon.ico
│ │ ⚛  page.tsx         ->  [Páginas de entrada [que chama o component de dashboard]] 
│ │ 
│ ├─📁 components        ->  [components proprios]
│ │ ├─📁 xxxxxxx
│ │ │ ├─⚛ xxxxx.tsx
│ │ | 
│ │ ├─📁 ui              ->  [components UI]
│ │ │ ├─⚛ xxxxx.tsx
│ │ |
│ ├─📁 css              ->  []
│ │  ├─🖌️ style.css
│ │  ├─🖌️ satoshi.css
│ │  
│ ├─📁 Config         ->  [configuração de conexões]
│ │  ├─⚛ firebaseConfig.ts
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
│ ├─📁 service         ->  [Servicos utilizados]
│ │  ├─ 📁 google
│ │  |   ├─🇹 sheets.ts
| |  |   ├─🇹 xxxxxxx.ts
│ │  ├─ 📁 firestore
| |  |   ├─🇹 xxxxxxx.ts
| |
│ ├─📁 types         ->  [tipagem para o typescript]
│ │  ├─🇹 xxxx.ts
│ │      ...
│ .env-semple
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

## ⚙️ Instalação e Configuração

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/nextjs-dashboard.git
   cd nextjs-dashboard
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env` na raiz do projeto com suas credenciais:

   1. `.env`
      ```bash
      <!-- Firebase Conexão -->
      NEXT_PUBLIC_API_KEY=your_api_key
      NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
      NEXT_PUBLIC_PROJECT_ID=your_project_id
      NEXT_PUBLIC_STORAGE_BUCKET=your_storage_bucket
      NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
      NEXT_PUBLIC_APP_ID=your_app_id
      NEXT_PUBLIC_MEASUREMENT_ID=your_measurement_id

      <!-- Google Api conexão -->
      NEXT_PUBLIC_GOOGLE_SHEETS_TYPE="service_account"
      NEXT_PUBLIC_GOOGLE_SHEETS_PROJECT_ID="xxxxxxxxxxxxx"
      NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY_ID="xxxxxxxxxxxxxx"
      NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxxxxxxxxx\n-----END PRIVATE KEY-----\n"
      NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL="xxxxxx@xxxxxxx.iam.gserviceaccount.com"
      NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_ID="xxxxxxxxxxxxxx"
      NEXT_PUBLIC_GOOGLE_SHEETS_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
      NEXT_PUBLIC_GOOGLE_SHEETS_TOKEN_URI="https://oauth2.googleapis.com/token"
      NEXT_PUBLIC_GOOGLE_SHEETS_AUTH_PROVIDER_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
      NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_CERT_URL="https://www.googleapis.com/robot/v1/metadata/x509/testing-spreadsheets%40betinha-testing.iam.gserviceaccount.com"

      <!-- Google Planilha code -->
      <!--  id da planilha: -->
      NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID="xxxxxxxxxxxxxxxxxx"
      <!--  id da pagina operações: -->
      NEXT_PUBLIC_GOOGLE_SHEETS_OPERATIONS_SHEET_ID="x"
      <!--  id da pagina de Estados: -->
      NEXT_PUBLIC_GOOGLE_SHEETS_STATES_SHEET_ID="x"

      <!--  NEXTAUTH CONFIG -->
      NEXTAUTH_URL=http://localhost:3000
      NEXTAUTH_SECRET=xxxxx

      <!-- Password Seed -->
      NAME_STRING="xxxxxxx"
      EMAIL_STRING="xxxx@exemple.com"  
      ADMIN_PASSWORD="xxxx@"
      ```

4. Execute as migrações do banco de dados utilizando o Prisma:
   ```bash
   npm run migrate
   ```
   > Isso aplicará todas as alterações definidas no arquivo `schema.prisma`

5. Popule o banco de dados com dados iniciais:
   ```bash
   npm run seed
   ```
   > Esta etapa criará registros básicos necessários para testar a aplicação

6. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
   > O servidor será iniciado em modo de desenvolvimento com hot-reload

7. Visualize o dashboard:
   ```
   http://localhost:3000
   ```
   > A página principal do dashboard será carregada

8. Para acessar a área restrita:
   ```
   http://localhost:3000/login
   ```
   > Utilize as credenciais definidas no arquivo 

.env

:
   > - Email: user@nextmail.com
   > - Senha: 123456

📝 **Observação**: Certifique-se de que todas as variáveis de ambiente estejam configuradas corretamente no arquivo 
.env antes de iniciar a aplicação.


## Configurações do Firebase

Usando as configurações do Firebase da Betinha, tanto o Data Studio quanto o parâmetro dinâmico utilizado devem ser `/betinha1731`.

   ```
   http://localhost:3000/dashboard/betinha1731
   ```


## 💻 Funcionalidades Principais


## 🔧 Como Contribuir

1. Faça um **fork** do repositório.
2. Crie uma nova branch:  
   `git checkout -b minha-nova-rota`
3. Faça suas alterações e comite:  
   `git commit -am 'Adiciona nova funcionalidade'`
4. Envie as alterações para o seu repositório remoto:  
   `git push origin minha-nova-rota`
5. Abra um **pull request** explicando as modificações realizadas.

## 📝 CHECKLIST:

[Checklist](docs\CHECKLIST.MD)

## 📝 Autor

- **Betinha Devs**
- **jvras**

## 📜 Licença

Este projeto ainda não possui licença definida.

## 📖 Documentação

[Next.js 14](https://nextjs.org/docs/14/getting-started)

[Next.js caching](https://nextjs.org/docs/app/building-your-application/caching)

[FireBase](https://firebase.google.com/docs)

[FireStore](https://firebase.google.com/docs/firestore)

[Server Actions](https://react.dev/reference/rsc/server-actions)

[UseQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)

[Google Api](https://theoephraim.github.io/node-google-spreadsheet/#/)

