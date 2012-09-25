/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/

// translations of labels
var translations =
{
	"back" : "Retour",
	"details" : "Détails",
	"search" : "Recherche",
	"spam" : "Signaler une erreur sur le carte",
	"title" : "Données sont tirées <a href=\"http://www.openstreetmap.org/copyright\">© OpenStreetMap contributors</a>.<br />Terrain: <a href=\"http://nasa.gov/\">NASA SRTM</a>",
	"info" : "Plus d'informations",
	"contact" : "Contact",
	"loading" : "Chargement...",
	"nothing" : "Aucun résultat n'a été trouvé.",
	"nothingmore" : "Pas de nouveaux résultats.",
	"update" : "Dernière mise à jour:",
	"showMarker" : "Plus un zoom avant pour visualiser les points",
	"empty" : "Rien entré.",
	"more" : "Davantage",
	"moreresults" : "Plus de résultats...",
	"less" : "Moins",
	"hide" : "Fermer",
	"show" : "Voir",
	"permalink" : "Permalien",
	"finish" : "Prêt",
	"markerLoading" : "Points sont chargés...",
	"hillshading" : "Terrain",
	"object" : "Détails",
	"marker" : "Marqueurs",
	"searchresults" : "Résultats de la recherche",
	"routing" : "Route",
	"searchoption" : "Chercher seulement dans la vue en cours",
	"close" : "Cliquez pour fermer",
	"ad" : "Améliorer les données! Corriger les liens périmés et rompu avec le chèque nouveau site de Keep Right!",
	"inolm" : "Afficher dans le OpenLinkMap...",
	"embed" : "HTML-Code",
	"embeddescription" : "Copiez ce code HTML pour votre site web pour montrer une petite carte avec un marqueur.",
	"embedattribution" : 'Données sont tirées &copy; <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> et contributif <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.fr" target="_blank">CC-BY-SA</a>'
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
OpenLayers.Lang["fr"] = OpenLayers.Util.applyDefaults({
	'unhandledRequest': "Requête non gérée, retournant ${statusText}",
	'Permalink': "Permalien",
	'Overlays': "Calques",
	'Base Layer': "Calque de base",
	'sameProjection': "La carte de situation ne fonctionne que lorsque sa projection est la même que celle de la carte principale",
	'readNotImplemented': "Lecture non implémentée.",
	'writeNotImplemented': "Ecriture non implémentée.",
	'noFID': "Impossible de mettre à jour un objet sans identifiant (fid).",
	'errorLoadingGML': "Erreur au chargement du fichier GML ${url}",
	'browserNotSupported': "Votre navigateur ne supporte pas le rendu vectoriel. Les renderers actuellement supportés sont : \n${renderers}",
	'componentShouldBe': "addFeatures : le composant devrait être de type ${geomType}",
	'getFeatureError': "getFeatureFromEvent a été appelé sur un calque sans renderer. Cela signifie généralement que vous avez détruit cette couche, mais que vous avez conservé un handler qui lui était associé.",
	'minZoomLevelError': "La propriété minZoomLevel doit seulement être utilisée pour des couches FixedZoomLevels-descendent. Le fait que cette couche WFS vérifie la présence de minZoomLevel est une relique du passé. Nous ne pouvons toutefois la supprimer sans casser des applications qui pourraient en dépendre. C\'est pourquoi nous la déprécions -- la vérification du minZoomLevel sera supprimée en version 3.0. A la place, merci d\'utiliser les paramètres de résolutions min/max tel que décrit sur : http://trac.openlayers.org/wiki/SettingZoomLevels",
	'commitSuccess': "Transaction WFS : SUCCES ${response}",
	'commitFailed': "Transaction WFS : ECHEC ${response}",
	'googleWarning': "La couche Google n\'a pas été en mesure de se charger correctement.\x3cbr\x3e\x3cbr\x3ePour supprimer ce message, choisissez une nouvelle BaseLayer dans le sélecteur de couche en haut à droite.\x3cbr\x3e\x3cbr\x3eCela est possiblement causé par la non-inclusion de la librairie Google Maps, ou alors parce que la clé de l\'API ne correspond pas à votre site.\x3cbr\x3e\x3cbr\x3eDéveloppeurs : pour savoir comment corriger ceci, \x3ca href=\'http://trac.openlayers.org/wiki/Google\' target=\'_blank\'\x3ecliquez ici\x3c/a\x3e",
	'getLayerWarning': "La couche ${layerType} n\'est pas en mesure de se charger correctement.\x3cbr\x3e\x3cbr\x3ePour supprimer ce message, choisissez une nouvelle BaseLayer dans le sélecteur de couche en haut à droite.\x3cbr\x3e\x3cbr\x3eCela est possiblement causé par la non-inclusion de la librairie ${layerLib}.\x3cbr\x3e\x3cbr\x3eDéveloppeurs : pour savoir comment corriger ceci, \x3ca href=\'http://trac.openlayers.org/wiki/${layerLib}\' target=\'_blank\'\x3ecliquez ici\x3c/a\x3e",
	'Scale = 1 : ${scaleDenom}': "Echelle ~ 1 : ${scaleDenom}",
	'W': "O",
	'E': "E",
	'N': "N",
	'S': "S",
	'layerAlreadyAdded': "Vous avez essayé d\'ajouter à la carte le calque : ${layerName}, mais il est déjà présent",
	'reprojectDeprecated': "Vous utilisez l\'option \'reproject\' sur la couche ${layerName}. Cette option est dépréciée : Son usage permettait d\'afficher des données au dessus de couches raster commerciales.Cette fonctionalité est maintenant supportée en utilisant le support de la projection Mercator Sphérique. Plus d\'information est disponible sur http://trac.openlayers.org/wiki/SphericalMercator.",
	'methodDeprecated': "Cette méthode est dépréciée, et sera supprimée à la version 3.0. Merci d\'utiliser ${newMethod} à la place.",
	'boundsAddError': "Vous devez passer les deux valeurs x et y à la fonction add.",
	'lonlatAddError': "Vous devez passer les deux valeurs lon et lat à la fonction add.",
	'pixelAddError': "Vous devez passer les deux valeurs x et y à la fonction add.",
	'unsupportedGeometryType': "Type de géométrie non supporté : ${geomType}",
	'pagePositionFailed': "OpenLayers.Util.pagePosition a échoué: l\'élément d\'id ${elemId} pourrait être mal positionné.",
	'filterEvaluateNotImplemented': "évaluer n\'a pas encore été implémenté pour ce type de filtre.",
	'proxyNeeded': "Vous avez très probablement besoin de renseigner OpenLayers.ProxyHost pour accéder à ${url}. Voir http://trac.osgeo.org/openlayers/wiki/FrequentlyAskedQuestions#ProxyHost"
});