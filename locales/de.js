/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/

// translations of labels
var translations =
{
	"back" : "Zurück",
	"details" : "Details",
	"search" : "Suchen",
	"spam" : "Kartenfehler melden",
	"title" : "Datensatz und Karten <a href=\"http://www.openstreetmap.org/copyright\">© OpenStreetMap contributors</a>.<br />Höhenprofil: <a href=\"http://nasa.gov/\">NASA SRTM</a>.",
	"info" : "Mehr Infos",
	"contact" : "Kontakt",
	"loading" : "Laden...",
	"nothing" : "Nichts gefunden.",
	"nothingmore" : "Keine weiteren Ergebnisse.",
	"update" : "Letzte Aktualisierung:",
	"showMarker" : "Hineinzoomen, um Marker anzuzeigen",
	"empty" : "Leere Eingabe.",
	"more" : "Mehr Infos",
	"moreresults" : "Weitere Treffer...",
	"less" : "Weniger",
	"hide" : "Ausblenden",
	"show" : "Einblenden",
	"permalink" : "Permanentlink",
	"finish" : "Fertig",
	"markerLoading" : "Punkte laden...",
	"hillshading" : "Höhenprofil",
	"object" : "POI-Details",
	"marker" : "Markierungen",
	"searchresults" : "Suchergebnisse",
	"routing" : "Route",
	"searchoption" : "Nur im aktuellen Kartenausschnitt suchen",
	"close" : "Klicken zum Schließen",
	"ad" : "Verbessere die Daten! Korrigiere veraltete und fehlerhafte Links mit dem neuen Website Checker von Keepright!",
	"inolm" : "In OpenLinkMap zeigen...",
	"embed" : "HTML-Code",
	"embeddescription" : "Kopieren Sie diesen HTML-Code und binden sie ihn ein in eine eigene Webseite ein, um eine kleine Karte mit einer Markierung anzuzeigen.",
	"embedattribution" : 'Karte und Daten &copy; <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> und Mitwirkende <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.de" target="_blank">CC-BY-SA</a>'
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
OpenLayers.Lang.de =
{
	'unhandledRequest': "Unbehandelte Anfragerückmeldung ${statusText}",
	'Permalink': "Permanentlink",
	'Overlays': "Zusatzinfos",
	'Base Layer': "Grundkarte",
	'sameProjection': "Die Übersichtskarte funktioniert nur, wenn sie dieselbe Projektion wie die Hauptkarte verwendet",
	'readNotImplemented': "Lesen nicht implementiert.",
	'writeNotImplemented': "Schreiben nicht implementiert.",
	'noFID': "Ein Feature, für das keine FID existiert, kann nicht aktualisiert werden.",
	'errorLoadingGML': "Fehler beim Laden der GML-Datei ${url}",
	'browserNotSupported': "Ihr Browser unterstützt keine Vektordarstellung. Aktuell unterstützte Renderer:\n${renderers}",
	'componentShouldBe': "addFeatures: Komponente muss vom Typ ${geomType} sein",
	'getFeatureError': "getFeatureFromEvent wurde vom einem Layer ohne Renderer aufgerufen. Dies bedeutet normalerweise, dass ein Layer entfernt wurde, aber nicht Handler, die auf ihn verweisen.",
	'minZoomLevelError': "Die \x3ccode\x3eminZoomLevel\x3c/code\x3e-Eigenschaft ist nur für die Verwendung mit \x3ccode\x3eFixedZoomLevels\x3c/code\x3e-untergeordneten Layers vorgesehen. Das dieser \x3ctt\x3ewfs\x3c/tt\x3e-Layer die \x3ccode\x3eminZoomLevel\x3c/code\x3e-Eigenschaft überprüft ist ein Relikt der Vergangenheit. Wir können diese Überprüfung nicht entfernen, ohne das OL basierende Applikationen nicht mehr funktionieren. Daher markieren wir es als veraltet - die \x3ccode\x3eminZoomLevel\x3c/code\x3e-Überprüfung wird in Version 3.0 entfernt werden. Bitte verwenden Sie stattdessen die Min-/Max-Lösung, wie sie unter http://trac.openlayers.org/wiki/SettingZoomLevels beschrieben ist.",
	'commitSuccess': "WFS-Transaktion: Erfolgreich ${response}",
	'commitFailed': "WFS-Transaktion: Fehlgeschlagen ${response}",
	'googleWarning': "Der Google-Layer konnte nicht korrekt geladen werden.\x3cbr\x3e\x3cbr\x3eUm diese Meldung nicht mehr zu erhalten, wählen Sie einen anderen Hintergrundlayer aus dem LayerSwitcher in der rechten oberen Ecke.\x3cbr\x3e\x3cbr\x3eSehr wahrscheinlich tritt dieser Fehler auf, weil das Skript der Google-Maps-Bibliothek nicht eingebunden wurde oder keinen gültigen API-Schlüssel für Ihre URL enthält.\x3cbr\x3e\x3cbr\x3eEntwickler: Besuche \x3ca href=\'http://trac.openlayers.org/wiki/Google\' target=\'_blank\'\x3edas Wiki\x3c/a\x3e für Hilfe zum korrekten Einbinden des Google-Layers",
	'getLayerWarning': "Der ${layerType}-Layer konnte nicht korrekt geladen werden.\x3cbr\x3e\x3cbr\x3eUm diese Meldung nicht mehr zu erhalten, wählen Sie einen anderen Hintergrundlayer aus dem LayerSwitcher in der rechten oberen Ecke.\x3cbr\x3e\x3cbr\x3eSehr wahrscheinlich tritt dieser Fehler auf, weil das Skript der \'${layerLib}\'-Bibliothek nicht eingebunden wurde.\x3cbr\x3e\x3cbr\x3eEntwickler: Besuche \x3ca href=\'http://trac.openlayers.org/wiki/${layerLib}\' target=\'_blank\'\x3edas Wiki\x3c/a\x3e für Hilfe zum korrekten Einbinden von Layern",
	'Scale = 1 : ${scaleDenom}': "Maßstab = 1 : ${scaleDenom}",
	'W': "W",
	'E': "O",
	'N': "N",
	'S': "S",
	'layerAlreadyAdded': "Sie versuchen den Layer „${layerName}“ zur Karte hinzuzufügen, er wurde aber bereits hinzugefügt",
	'reprojectDeprecated': "Sie verwenden die „Reproject“-Option des Layers ${layerName}. Diese Option ist veraltet: Sie wurde entwickelt um die Anzeige von Daten auf kommerziellen Basiskarten zu unterstützen, aber diese Funktion sollte jetzt durch Unterstützung der „Spherical Mercator“ erreicht werden. Weitere Informationen sind unter http://trac.openlayers.org/wiki/SphericalMercator verfügbar.",
	'methodDeprecated': "Die Methode ist veraltet und wird in 3.0 entfernt. Bitte verwende stattdessen ${newMethod}.",
	'boundsAddError': "Beide Werte (x und y) müssen der add-Funktion übergeben werden.",
	'lonlatAddError': "Beide Werte (lon und lat) müssen der add-Funktion übergeben werden.",
	'pixelAddError': "Beide Werte (x und y) müssen der add-Funktion übergeben werden.",
	'unsupportedGeometryType': "Nicht unterstützter Geometrie-Typ: ${geomType}",
	'pagePositionFailed': "OpenLayers.Util.pagePosition fehlgeschlagen: Element mit Id ${elemId} möglicherweise falsch platziert.",
	'filterEvaluateNotImplemented': "„evaluate“ ist für diesen Filter-Typ nicht implementiert."
};