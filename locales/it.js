/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.

Italian translation by Daniele Forsi <dforsi@gmail.com>
*/

// translations of labels
var translations =
{
	"back" : "Indietro",
	"details" : "Dettagli",
	"search" : "Avanti",
	"spam" : "Segnala errori",
	"title" : "Mappa e dati da <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> e sotto <a href=\"http://creativecommons.org/licenses/by-sa/2.0/deed.it\" title=\"CC-BY-SA 2.0\">Licenza CC-BY-SA 2.0</a>.<br />Ombreggiatura rilievi: <a href=\"http://nasa.gov/\">NASA SRTM</a>.",
	"info" : "Informazioni",
	"contact" : "Contatti",
	"loading" : "Caricamento...",
	"nothing" : "Nessun risultato.",
	"nothingmore" : "Nessun altro risultato.",
	"update" : "Ultimo aggiornamento:",
	"showMarker" : "Ingrandire per vedere i marcatori",
	"empty" : "Inserimento vuoto.",
	"more" : "Altri dettagli",
	"moreresults" : "Altri risultati...",
	"less" : "Meno",
	"hide" : "Nascondi",
	"show" : "Mostra",
	"permalink" : "Permalink",
	"finish" : "Finish",
	"markerLoading" : "Caricamento punti...",
	"hillshading" : "Ombreggiatura rilievi",
	"object" : "Dettagli POI",
	"marker" : "Marcatori",
	"searchresults" : "Risultati della ricerca",
	"routing" : "Route",
	"searchoption" : "Cercare solo nella mappa visualizzata",
	"close" : "Fare clic per chiudere",
	"ad" : "Migliorare i dati! Correggere i collegamenti obsoleti e rotto con il nuovo sito web check da Keep Right!",
	"inolm" : "Visualizza in OpenLinkMap...",
	"embed" : "HTML-Code",
	"embeddescription" : "Copia questo codice HTML sul tuo sito web per mostrare una piccola mappa con un pennarello.",
	"embedattribution" : 'Mappa e dati &copy; <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> e contributivo <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.it" target="_blank">CC-BY-SA</a>'
};

// descriptions for search results
var descriptions =
{
	"city" : "#county#, #state#, #country#",
	"country" : "",
	"county" : "#state#, #country#",
	"footway" : "#city#, #county#, #country#",
	"hamlet" : "#county#, #country#",
	"house_number" : "#city#, #county#, #country#",
	"island" : "#state#, #country#",
	"isolated_dwelling" : "#county#, #state#, #country#",
	"locality" : "#county#, #state#, #country#",
	"place" : "#county#, #state#, #country#",
	"postcode" : "#county#, #state#, #country#",
	"region" : "#country#",
	"road" : "#city#, #county#, #country#",
	"state" : "#country#",
	"state_district" : "#state#, #country#",
	"suburb" : "#city#, #county#, #country#",
	"town" : "#state#, #country#",
	"village" : "#county#, #country#",
	"poi" : "#footway# #road# #house_number#, #postcode# #village# #city#, #country#",
	"name" : "#footway# #road# #house_number#"
};

// translations of OpenLayers
OpenLayers.Lang.it =
{
	'unhandledRequest': "Richiesta non gestita, ritornato ${statusText}",
	'Permalink': "Permalink",
	'Overlays': "Livelli sovrapposti",
	'Base Layer': "Livelli di base",
	'sameProjection': "La mappa d'insieme funziona solo quando è nella stessa proiezione della mappa principale",
	'readNotImplemented': "Lettura non implementata.",
	'writeNotImplemented': "Scrittura non implementata.",
	'noFID': "Impossibile aggiornare una feature per la quale non c'è un FID.",
	'errorLoadingGML': "Errore durante la lettura del file GML ${url}",
	'browserNotSupported': "Il browser in uso non supporta il rendering vettoriale. I renderer attualmente supportati sono:\n${renderers}",
	'componentShouldBe': "addFeatures : il componente deve essere un ${geomType}",
	'getFeatureError':
		"getFeatureFromEvent chiamata su un livello senza renderer. Questo solitamente significa che è stato " +
		"distrutto un livello, ma non qualche gestore associato ad esso.",
	'minZoomLevelError':
		"La proprietà minZoomLevel è pensata solo per l'uso " +
		"con i livelli discendenti FixedZoomLevels. Il fatto che " +
		"questo livello WFS controlli minZoomLevel è una cosa del passato del " +
		"passato. Tuttavia non possiamo rimuoverlo senza il rischio " +
		"di rompere le applicazioni basate su OL che dipendono da esso." +
		" Perciò ne sconsigliamo l'uso -- il controllo di minZoomLevel " +
		"qua sotto verrà rimosso nella 3.0. Al suo posto usare le " +
		"impostazioni di risoluzione min/max come descritto qui: " +
		"http://trac.openlayers.org/wiki/SettingZoomLevels",
	'commitSuccess': "Transazione WFS: SUCCESSO ${response}",
	'commitFailed': "Transazione WFS: FALLIMENTO ${response}",
	'googleWarning':
		"Il livello Google non si è caricato correttamente.<br><br>" +
		"Per sbarazzarsi di questo messaggio, scegliere un nuovo BaseLayer " +
		"nel selettore di livelli nell'angolo superiore destro.<br><br>" +
		"Molto probabilmente, questo è accaduto perché lo script della libreria Google Maps " +
		"non è stato incluso o non contiene la chiave " +
		"API giusta per questo sito.<br><br>" +
		"Sviluppatori: per farlo funzionare correttamente " +
		"<a href='http://trac.openlayers.org/wiki/Google' " +
		"target='_blank'>fare clic qui</a>",
	'getLayerWarning':
		"Il livello ${layerType} non si è caricato correttamente.<br><br>" +
		"Per sbarazzarsi di questo messaggio, scegliere un nuovo BaseLayer " +
		"nel selettore di livelli nell'angolo superiore destro.<br><br>" +
		"Molto probabilmente, questo è accaduto perché lo script della libreria ${layerLib} " +
		"non è stato incluso correttamente.<br><br>" +
		"Sviluppatori: per farlo funzionare correttamente " +
		"<a href='http://trac.openlayers.org/wiki/${layerLib}' " +
		"target='_blank'>fare clic qui</a>",
	'Scale = 1 : ${scaleDenom}': "Scala = 1 : ${scaleDenom}",
	'W': 'O',
	'E': 'E',
	'N': 'N',
	'S': 'S',
	'graticule': 'Reticolo',
	'layerAlreadyAdded': "Si è tentato di aggiungere il livello ${layerName} alla mappa, ma è già stato aggiunto",
	'reprojectDeprecated':
		"Si sta usando l'opzione 'reproject' " +
		"sul livello ${layerName}. Questa opzione è sconsigliata: " +
		"il suo uso è stato progettato per permettere di visualizzare dati su " +
		"mappe di base commerciali, ma tale funzionalità dovrebbe essere ottenuta ora usando " +
		"il supporto Mercatore sferico. Ulteriori informazioni sono disponibili all'indirizzo " +
		"http://trac.openlayers.org/wiki/SphericalMercator",
	'methodDeprecated':
		"Questo metodo è sconsigliato e sarà rimosso nella 3.0. " +
		"Al suo posto usare ${newMethod}.",
	'boundsAddError': "È necessario passare sia il valore \"x\" che il valore \"y\" alla funzione \"add\".",
	'lonlatAddError': "È necessario passare sia il valore \"lon\" che il valore \"lat\" alla funzione \"add\"",
	'pixelAddError': "È necessario passare sia il valore \"x\" che il valore \"y\" alla funzione \"add\".",
	'unsupportedGeometryType': "Tipo geometrico non supportato: ${geomType}",
	'pagePositionFailed': "OpenLayers.Util.pagePosition fallita: l'elemento con id ${elemId} potrebbe essere fuori posto.",
	'filterEvaluateNotImplemented': "\"evaluate\" non è implementata per questo tipo di filtro.",
	'end': ''
};