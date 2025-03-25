# Feedback tool - Delta10
De ontwikkelomgeving van de web applicatie waarmee Delta10 feedback en suggesties verzamelt van haar klanten.

## Benodigdheden

Om dit project te draaien, heb je de volgende software nodig:

- **Node.js** 
- **npm** 
- **PocketBase** (backend)

## Project Installatie

1. **Clone de repository:**
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


4. **Insalleer en run de backend in docker**
   ```sh
   docker compose up
   ```
5. **Laad de testdata:**
   ```sh
   node src/utils/loadTestData.js  
   ```
6. **login op: http://localhost:4321 met de volgende super user credentials:**

   email: admin@example.com

   ww: password1234


7. **Login op http://127.0.0.1:8090/ met dezelfde credentials**

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
│   │   │   ├── Forum.tsx
│   │   │   ├── ForumRow.tsx
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