# 🏡 Nossa Casa — como colocar no ar (GitHub + Firebase)

Mesmo esquema do sistema da GECEEN: o **GitHub Pages** hospeda o site, o **Firebase** guarda e sincroniza os dados e o app pode ser **instalado na tela inicial** do celular. Leva uns 15 minutos, uma vez só.

## ✅ Já configurado
- Site: **https://geceen.github.io/nossa-casa/** (GitHub Pages, branch `main`)
- Firebase: projeto **nossa-casa-780ef** (conta geceen.adm@gmail.com), Firestore em São Paulo, login por e-mail/senha ativado, cadastro público desligado e regras publicadas (só logado acessa).
- `config.js` já preenchido.

## Falta só: criar os logins de vocês
Firebase → **Authentication → Usuários → Adicionar usuário** → e-mail e senha de cada um (o seu e o da Rebeca). Para adicionar outra pessoa no futuro, é o mesmo caminho.

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
