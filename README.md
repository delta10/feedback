# Feedback tool - Delta10
De ontwikkelomgeving van de web applicatie waarmee Delta10 feedback en suggesties verzamelt van haar klanten.

## Benodigdheden

Om dit project te draaien, heb je de volgende software nodig:

- **Node.js** 

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

3. **Start de frontend ontwikkelserver:**
   ```sh
   npm run dev
   ```
   Standaard bereikbaar op `http://localhost:4321`


4. **Initialiseer en draai de backend in een command**
   ```sh
   ./init.sh
   ```
5. **login op de backend: http://0.0.0.0:8090/_/ met de volgende super user credentials:**

   email: admin@example.com

   ww: password1234


6. **Login op de frontend: (http://localhost:4321/login) met dezelfde credentials**   


## Project opstarten
1. **Start de frontend ontwikkelserver:**
   ```sh
   npm run dev
   ```
   Standaard bereikbaar op `http://localhost:4321`


2. **Start de backend in docker**
   ```sh
   docker compose up
   ```

3. **Laad de testdata (optioneel):**
   ```sh
   cd pb_data
   unzip -o backups/testdata.zip
   docker restart pocketbase 
   ```

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