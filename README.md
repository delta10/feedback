# Feedback tool - Delta10
## Setup

### Backend - PocketBase
Installeer pocketbase
```sh
brew install pocketbase
```
Laad de testdata en run vervolgens de pocketbase backend
```sh
pocketbase backup restore /pb_data/backups/testdata.zip
pocketbase serve
```


### Frontend
Installeer node
```sh
brew install node
```

Installeer de dependancies en run de lokale dev omgeving
```sh
npm install
npm run dev
```

