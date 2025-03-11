# Feedback tool - Delta10
De ontwikkelomgeving van de web applicatie waarmee Delta10 feedback en suggesties verzamelt van haar klanten.

## Benodigdheden

Om dit project te draaien, heb je de volgende software nodig:

- **Node.js** (aanbevolen versie: 18+)
- **npm** (of Yarn/Pnpm)
- **PocketBase** (backend)

### Installatie op macOS (met Homebrew)

Je kunt de benodigde software eenvoudig installeren met Homebrew:

1. **Installeer Homebrew (als je dit nog niet hebt):**

   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Installeer Node.js en npm:**

   ```sh
   brew install node
   ```

3. **Controleer of Node.js en npm correct zijn geïnstalleerd:**

   ```sh
   node -v
   npm -v
   ```

4. **Installeer PocketBase:**

   ```sh
   brew install --cask pocketbase
   ```

   PocketBase kan nu worden gestart met:

   ```sh
   pocketbase serve
   ```

## Installatie

1. **Kloon de repository:**
   ```sh
   git clone https://github.com/delta10/feedback.git
   cd feedback
   ```

2. **Installeer dependencies:**
   ```sh
   npm install
   ```

3. **Start de ontwikkelserver:**
   ```sh
   npm run dev
   ```
   Standaard bereikbaar op `http://localhost:4321`
    <br><br>
4. **PocketBase starten en backup herstellen:**
   Download en start PocketBase:
   ```sh
   ./pocketbase serve
   ```
   Laad de testdata door deze backup te herstellen:
   ```sh
   ./pocketbase restore testdata.zip
   ```
   Standaard bereikbaar op `http://127.0.0.1:8090/`
    <br><br>


## Projectstructuur

```plaintext
📦 jouw-projectnaam
├── 📂 src                      # Hoofdmap met de applicatiecode
│   ├── 📂 assets               # Afbeeldingen en SVG bestanden
│   │   ├── astro.svg
│   │   ├── background.svg
│   ├── 📂 components           # React componenten
│   │   ├── 📂 auth             # Authenticatiecomponenten
│   │   │   ├── LoginForm.tsx
│   │   │   ├── Logout.tsx
│   │   │   ├── Redirect.tsx
│   │   │   ├── SignupForm.tsx
│   │   ├── 📂 forum            # Forum-gerelateerde componenten
│   │   │   ├── FeedbackForum.tsx
│   │   │   ├── FeedbackForumRow.tsx
│   │   │   ├── ForumCreateDialog.tsx
│   │   │   ├── ForumHeader.tsx
│   │   │   ├── ForumPost.tsx
│   │   ├── 📂 ui               # UI-componenten met ShadCN
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── textarea.tsx
│   ├── 📂 hooks                # Custom React hooks
│   │   ├── useLikes.ts
│   │   ├── usePosts.ts
│   ├── 📂 layouts              # Astro layout bestanden
│   │   ├── BaseLayout.astro
│   ├── 📂 lib                  # Algemene helperfuncties
│   │   ├── utils.ts
│   ├── 📂 pages                # Astro pagina's
│   │   ├── index.astro
│   │   ├── login.astro
│   │   ├── signup.astro
│   │   ├── 📂 posts
│   │   │   ├── [id].astro
│   ├── 📂 store                # State management
│   │   ├── authStore.ts
│   ├── 📂 styles               # CSS stijlen
│   │   ├── global.css
│   ├── 📂 utils                # Hulpfuncties en PocketBase setup
│   │   ├── dateFormatting.ts
│   │   ├── pocketbase.ts
├── 📂 public                   # Openbare statische bestanden
├── 📂 pb_data                  # PocketBase database gegevens en backups
├── 📂 pb_migrations            # PocketBase migraties
├── 📄 astro.config.mjs         # Astro configuratie
├── 📄 components.json          # Componentconfiguratie
├── 📄 package.json             # NPM package configuratie
├── 📄 package-lock.json        # NPM dependency lockfile
├── 📄 tsconfig.json            # TypeScript configuratie
├── 📄 README.md                # Documentatie
```