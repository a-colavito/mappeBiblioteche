# mappeBiblioteche

Questo progetto riguarda la visualizzazione delle mappe delle biblioteche di Ateneo, utilizzando le mappe di **OpenStreetMap** e la libreria JavaScript **Leaflet**.

## Struttura del progetto

L'intero progetto è contenuto nella cartella **SBAMappe**, che include i file HTML per le quattro mappe delle biblioteche dell'Ateneo. All'interno di questa cartella, ci sono altre tre sottocartelle:

- **Dataset**
- **Script**
- **Style**

### Cartella **Dataset**

Questa cartella contiene la sottocartella **Percorsi**, che a sua volta include i file JS con le variabili (di nome identico al file) per inizializzare i dati **GeoJSON** relativi ai percorsi. Tutti i dati su punti, poligoni, risorse e percorsi vengono estratti da questi file.

### Cartella **Script**

La cartella **Script** contiene un unico file, **MapLogic.js**, che gestisce la logica delle mappe. Le principali funzionalità di questo file includono:

- **Costruttore di mappa**: una funzione che accetta parametri come `centerCoordinates`, `zoomLevel`, ecc., per impostare i layer di Leaflet e determinare come la biblioteca viene rappresentata sulla mappa e nel menu a tendina.
- **Aggiunta di layer personalizzati** alla mappa.
- **Gestione del menu a tendina**: permette di togglare il menu e inizializzare i percorsi, mostrando le informazioni relative alla biblioteca.
- **Personalizzazione delle funzioni di Leaflet**: estende la libreria Leaflet con personalizzazioni specifiche.

La funzione costruttore semplifica l'inizializzazione della mappa, consentendo di inserire le personalizzazioni tramite parametri passati alla funzione **initializeMap**. Questo approccio rende il codice HTML più snello e facilita l'aggiunta di nuove risorse semplicemente richiamando lo script nel file HTML della nuova risorsa.

### Cartella **Style**

La cartella **Style** contiene il file **SBACSS**, che gestisce l'aspetto del menu delle mappe e implementa la classe `.hidden`, essenziale per il corretto funzionamento del toggle del menu insieme a **MapLogic.js**.

Il foglio di stile include il colore del Politecnico di Bari per l'intestazione del menu e un font di prova (che può essere rimosso senza problemi per evitare conflitti).

**Nota:** La dimensione della mappa non è gestita nel foglio di stile, ma è definita direttamente nel file HTML per praticità.

### Singoli file HTML delle biblioteche

I file HTML per ciascuna biblioteca sono molto semplici. Importano le librerie e i fogli di stile di Leaflet, quindi popolano il contenuto dell'HTML tramite la funzione **initializeMap**.

Tutti gli elementi nel menu a tendina vengono generati dalla funzione **initializeMap**. Inoltre, il menu e il contenitore della mappa sono strutturati in modo gerarchico, in modo che rimangano "attaccati" tra loro.

## Ulteriori scelte e informazioni utili

- I percorsi sono stati creati utilizzando MapTier, un'applicazione web che permette di creare percorsi e convertirli in file GeoJSON. I percorsi sono stati realizzati internamente e non sono stati presi da risorse online.
- Il file **MapLogic.js** è stato commentato in modo dettagliato, poiché ci sono alcune situazioni in cui è stato necessario forzare il comportamento di Leaflet per sovrascrivere regole personalizzate (come marker rossi e percorsi con il colore del Politecnico di Bari).
- Le librerie sono importate dal web, ma potrebbe essere più efficiente scaricarle in locale su un server del Politecnico. Non essendo particolarmente esperto di sviluppo web, non posso dire quale soluzione sarebbe la migliore per ottimizzare il caricamento.

## Possibili sviluppi futuri per mappare l'intero Politecnico

A mio parere, ci sono due opzioni per mappare l'intero Politecnico:

1. **Utilizzare le piantine CAD del Politecnico**: queste potrebbero essere aggiunte come layer personalizzati su OpenStreetMap utilizzando Leaflet.
2. **Estrarre i dati GeoJSON dall'applicazione BeFreeCampus**: fare un porting dell'app in chiave web, eventualmente come WebApp o utilizzando soluzioni come Flutter per renderla disponibile su più dispositivi.

Entrambe le opzioni offrono vantaggi e svantaggi. La scelta di estrarre i dati GeoJSON e mappare il Politecnico tramite codice offre grande modularità e facilità nel modificare la posizione delle risorse (ad esempio, se gli uffici vengono spostati, non è necessario richiedere una nuova piantina, basta modificare il codice). D'altra parte, implementare la mappa utilizzando le piantine offre maggiore visibilità sugli accessi, come scale e ascensori, e permetterebbe di inserire risorse in un contesto dettagliato.

Entrambe le soluzioni permetterebbero di mappare ogni piano e migliorare la referenziazione delle risorse, sia in termini di accessibilità che di supporto per utenti esterni e interni nella ricerca delle strutture.

La combinazione di Leaflet e OpenStreetMap fornisce un framework solido per entrambe le soluzioni.

## Contatti

Per qualsiasi richiesta di informazioni, [Inviami un'email](mailto:adolfocolavito@hotmail.it).
