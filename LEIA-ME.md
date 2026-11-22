# 🏡 Nossa Casa — como colocar no ar (GitHub + Firebase)

Mesmo esquema do sistema da GECEEN: o **GitHub Pages** hospeda o site, o **Firebase** guarda e sincroniza os dados e o app pode ser **instalado na tela inicial** do celular. Leva uns 15 minutos, uma vez só.

## 1. Firebase (onde ficam os dados)
1. Acesse https://console.firebase.google.com → **Adicionar projeto** → nome `nossa-casa` (pode desligar o Google Analytics).
2. Menu **Criação → Firestore Database → Criar banco de dados** → local `southamerica-east1 (São Paulo)` → **modo de produção**.
3. Na aba **Regras**, apague tudo, cole o conteúdo do arquivo `firestore.rules`, **troque os dois e-mails** pelos de vocês e clique em **Publicar**.
4. Menu **Criação → Authentication → Vamos começar → E-mail/senha → Ativar**.
5. Em **Authentication → Usuários → Adicionar usuário**, crie o seu login e o da Rebeca (e-mail + senha). Use os mesmos e-mails das regras.
6. Engrenagem ⚙️ → **Configurações do projeto** → em "Seus aplicativos" clique em **</>** → apelido `nossa-casa-web` → **Registrar app**. Deixe aberta a tela com o `firebaseConfig`.

## 2. GitHub (onde fica o site)
1. Em https://github.com/new crie o repositório `nossa-casa` (**Public**, porque o GitHub Pages grátis exige isso; os dados não ficam no GitHub, ficam no Firebase protegidos por login).
2. Clique em **uploading an existing file** e arraste **todos os arquivos desta pasta** → **Commit changes**.
3. Abra o arquivo `config.js` no GitHub → ✏️ editar → cole os valores do `firebaseConfig` (passo 1.6) → **Commit changes**.
4. **Settings → Pages** → Source: `Deploy from a branch` → Branch `main` / `(root)` → **Save**.
5. Em 1–2 minutos o site fica em: `https://SEU-USUARIO.github.io/nossa-casa/`

## 3. No celular (virar app)
- **Android (Chrome):** abra o link → menu ⋮ → **Instalar app** / **Adicionar à tela inicial**.
- **iPhone (Safari):** abra o link → botão compartilhar ⬆️ → **Adicionar à Tela de Início**.

Abre em tela cheia, com ícone próprio, e funciona até sem internet (sincroniza quando a conexão voltar).

## 4. Primeiro uso
- Faça login → **Ajustes → Fotos** para colocar as fotos de vocês na tela de entrada (elas ficam guardadas no Firebase, não no GitHub).
- Se já lançaram coisas na versão do Claude: lá em **Ajustes → Backup → Gerar backup**, copie; aqui em **Ajustes → Backup → Restaurar backup**, cole.

## Atualizar o sistema depois
Substitua só o `index.html` no GitHub (Add file → Upload files). **Não substitua o `config.js`**, senão perde a configuração do Firebase. O app no celular se atualiza sozinho na próxima vez que abrir.

## Arquivos
| Arquivo | Para que serve |
|---|---|
| `index.html` | O sistema inteiro |
| `config.js` | Chaves do Firebase (você preenche uma vez) |
| `manifest.webmanifest`, `icon-*.png` | Nome e ícone do app no celular |
| `sw.js` | Faz o app abrir sem internet |
| `firestore.rules` | Regras de segurança (colar no Firebase, não precisa estar no GitHub) |
