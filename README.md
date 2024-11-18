### Organização do projeto NEXT 14
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
