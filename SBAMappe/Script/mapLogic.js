function initializeMap(mapId, centerCoordinates, zoomLevel, mapContext, sede, edificio, piano, capacita, percorsoOR, percorsoRD) {
    const map = L.map(mapId).setView(centerCoordinates, zoomLevel);

    // Layer di OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20,
    }).addTo(map);

    // Icone personalizzate per le diverse librerie
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Funzione per settare il colore del percorso
    function setPathStyle() {
        return {
            color: '#3b8794', // Se la libreria non è trovata, usa il colore del PoliBa
            weight: 3,
            opacity: 0.8
        };
    }
//
    // Funzione per aggiungere cerchio al primo punto del percorso
    function addCircleToStartPoint(geoJsonLayer, pathColor) {
        geoJsonLayer.eachLayer(function (layer) {
            if (layer instanceof L.Polyline) {
                const latlngs = layer.getLatLngs();
                const startPoint = latlngs[0]; // Start Point del percorso
                // Qui si aggiunge un cerchio al punto iniziale con lo stesso colore del percorso
                L.circleMarker(startPoint, {
                    radius: 5,   // Raggio del cerchio
                    color: pathColor, // Colore del cerchio uguale al percorso
                    fillColor: pathColor, // Colore di riempimento
                    fillOpacity: 1,
                    weight: 2
                }).addTo(map);
            }
        });
    }

    // Funzione per aggiungere GeoJSON alla mappa con lo stile
    const addGeoJsonToMap = (geoJson) => {
        const pathColor = setPathStyle(); // Ottieni il colore del percorso
        const geoJsonLayer = L.geoJSON(geoJson, {
            style: pathColor,
            pointToLayer: function () {
            } //funzione vuota per evitare la sovrapposizione della libreria standard LeafLet
        }).addTo(map);


        addCircleToStartPoint(geoJsonLayer, pathColor);

        return geoJsonLayer;
    };



    // Aggiunge un solo marker personalizzato per il centro della mappa con un popup
    const centerMarker = L.marker(centerCoordinates, { icon: redIcon }).addTo(map);

    //  toggle del menu
    function toggleMenu() {
        const menu = document.getElementById('map-menu');
        const openMenuIcon = document.getElementById('open-menu-icon');
        const closeButton = document.getElementById('close-menu');

        // Alterna la visibilità del menu
        if (menu.classList.contains('visible')) {
            menu.classList.remove('visible');
            openMenuIcon.classList.remove('hidden');
            closeButton.classList.add('hidden');
        } else {
            menu.classList.add('visible');
            openMenuIcon.classList.add('hidden');
            closeButton.classList.remove('hidden');
        }
    }

    centerMarker.on('click', function () {
        toggleMenu();

        const currentCenter = map.getCenter();
        if (currentCenter.lat !== centerCoordinates[0] || currentCenter.lng !== centerCoordinates[1]) {
            map.flyTo(centerCoordinates, 19, { animate: true, duration: 1 });
            showMenu();
        }
    });

    // Mostra il menu e aggiorna i contenuti
    const showMenu = () => {
        const menu = document.getElementById('map-menu');
        const openMenuIcon = document.getElementById('open-menu-icon');
        const closeButton = document.getElementById('close-menu');

        menu.classList.add('visible');
        openMenuIcon.classList.add('hidden');
        closeButton.classList.remove('hidden');

        document.getElementById('menu-title').textContent = "Biblioteca " + mapContext;
        document.getElementById('sede-content').textContent = sede;
        document.getElementById('edificio-content').textContent = edificio;
        document.getElementById('piano-content').textContent = piano;
        document.getElementById('capacita-content').innerHTML = capacita.replace(/\n/g, '<br>');
        document.getElementById('sede-content').innerHTML = sede.replace(/\n/g, '<br>');
    };

    // Nascondi il menu
    const hideMenu = () => {
        const menu = document.getElementById('map-menu');
        const openMenuIcon = document.getElementById('open-menu-icon');
        const closeButton = document.getElementById('close-menu');
        menu.classList.remove('visible');
        openMenuIcon.classList.remove('hidden');
        closeButton.classList.add('hidden');
    };

    document.getElementById('close-menu').addEventListener('click', hideMenu);
    document.getElementById('open-menu-icon').addEventListener('click', showMenu);

    // Gestione del selettore dei percorsi
    document.getElementById('percorso-selector').addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        let percorsoGeoJson = null;

        if (selectedValue === 'OR') {
            percorsoGeoJson = percorsoOR;
        } else if (selectedValue === 'RD') {
            percorsoGeoJson = percorsoRD;
        }

        if (percorsoGeoJson) {
            // Rimuovi il layer precedente
            if (currentLayer) {
                map.removeLayer(currentLayer);
            }
            // Aggiungi il nuovo percorso
            currentLayer = addGeoJsonToMap(percorsoGeoJson);
        }
    });

    if (percorsoOR) {
        currentLayer = addGeoJsonToMap(percorsoOR);
    }

    showMenu();
}
