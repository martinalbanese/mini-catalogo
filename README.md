# Mini-Catalogo (Fullstack con Spring Boot e React/Typescript)

Questo progetto implementa un'applicazione di catalogo prodotti che offre una gestione CRUD completa per Prodotti e Categorie, con funzionalità avanzate di ricerca, filtro e paginazione. Il backend è realizzato con Spring Boot (Java), il frontend con React/Vite (TypeScript) e il database è MySQL, orchestrati tramite Docker Compose.

## Specifiche del progetto

| Componente | Stack | Operazioni Principali |
|-------|-----|-----------|
| Backend (API) | Spring Boot 3, Java 21, JPA/Hibernate, MySQL | CRUD completo, List Prodotti con filtri avanzati (testo, prezzo, categoria), Paginazione. |
| Frontend (UI) | React (TS), Vite, React Router | Viste separate per Categorie e Prodotti, Form di creazione/modifica, Interfaccia di filtro dinamica. |
| Infrastruttura | Docker Compose | Avvio rapido con tre servizi isolati (MySQL, Backend, Frontend). |

## Requisiti di Avvio

Per eseguire il progetto tramite Docker Compose, devi avere installato:
- Docker Desktop: (Include Docker Engine e Docker Compose).
- Git (opzionale, ma consigliato per clonare il progetto).

## Avvio Rapido con Docker Compose

Il modo più semplice per avviare l'intera applicazione (backend, frontend e database) è utilizzare il file compose.yaml dalla directory principale.

### 1. Clonazione e Navigazione
``` bash
git clone https://de.pons.com/%C3%BCbersetzung/italienisch-deutsch/la+tua
cd mini-catalogo
```

### 2. Configurazione Credenziali Database

Le credenziali sono già configurate nel compose.yaml, ma per chiarezza:

| Servizio | Variabili d'Ambiente | Valore |
|-------|-----|-----------|
| MySQL(Interno)| MYSQL_USER, MYSQL_PASSWORD | test, test |

### 3. Build e Avvio (Comando Unico)

Dalla directory principale (mini-catalogo), esegui:
```bash
docker compose up --build -d
```

| Porta | Servizio | Indirizzo |
|-------|-----|-----------|
| Frontend | React/Vite | http://localhost:5173/ |
| Backend | Spring Boot API | http://localhost:8080/api |
| Database | MySQL | localhost:3307 |

### 4. Pulizia

Per spegnere e rimuovere tutti i container (mantenendo i dati del DB nel volume):

```bash
docker compose down
```

Per spegnere e rimuovere tutto (inclusi i dati del DB):

```bash
docker compose down -v
```

## Struttura e Architettura

Il progetto segue una chiara separazione di responsabilità:

| Directory | Contenuto | Ruolo |
|-------|-----|-----------|
| catalogo-backend/ | Codice Spring Boot (entities, services, controllers) | Logica di business e API REST |
| catalogo_frontend/ | Codice React/Vite (components, hooks, types) | Interfaccia Utente e Gestione Stato/Chiamate API |
| compose.yaml/ | Definizione dei tre servizi Docker | Orchestrazione |
