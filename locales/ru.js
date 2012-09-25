/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See olm.openstreetmap.de/info for details.

Russian translation by NothisIm, see https://github.com/NothisIm
*/

// translations of labels
var translations =
{
	"back" : "Назад",
	"details" : "Подробнее",
	"search" : "Поиск",
	"spam" : "Сообщить об ошибке на карте",
	"title" : "Карта и данные <a href=\"http://www.openstreetmap.org/copyright\">© OpenStreetMap contributors</a>.<br />Карта высот: <a href=\"http://nasa.gov/\">NASA SRTM</a>.",
	"info" : "О сайте",
	"contact" : "Связаться с нами",
	"loading" : "Загрузка...",
	"nothing" : "Ничего не найдено.",
	"nothingmore" : "Больше нет результатов.",
	"update" : "Последнее обновление:",
	"showMarker" : "Увеличьте масштаб для отображения меток",
	"empty" : "Пустой ввод.",
	"more" : "Узнать больше",
	"moreresults" : "Ещё результаты...",
	"less" : "Меньше",
	"hide" : "Спрятать",
	"show" : "Показать",
	"permalink" : "Постоянная ссылка",
	"finish" : "Завершить",
	"markerLoading" : "Загрузка точек...",
	"hillshading" : "Карта высот",
	"object" : "POI-информация",
	"marker" : "Метка",
	"searchresults" : "Результаты поиска",
	"routing" : "Маршрут",
	"searchoption" : "Искать только на видимом участке карты",
	"close" : "Нажмите для закрытия",
	"ad" : "Совершенствуйте данные! Исправьте неправильные ссылки на веб-сайты с помощью нового валидатора веб-сайтов от Keepright!",
	"inolm" : "Показать в OpenLinkMap...",
	"embed" : "HTML-код",
	"embeddescription" : "Copia questo codice HTML sul tuo sito web per mostrare una piccola mappa con un pennarello.",
	"embedattricution" : 'Данные карты &copy; <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> и участников <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.en" target="_blank">CC-BY-SA</a>'
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
OpenLayers.Lang.ru =
{
	'unhandledRequest': "Непредвиденный результат запроса ${statusText}",
	'Permalink': "Постоянная ссылка",
	'Overlays': "Слои",
	'Base Layer': "Подложка",
	'sameProjection': "Обзорная карта работает только в той же проекции, что и основаная",
	'readNotImplemented': "Чтение не реализовано.",
	'writeNotImplemented': "Запись не реализована.",
	'noFID': "Невозможно обновить свойство без FID.",
	'errorLoadingGML': "Ошибка при загрузке GML файла ${url}",
	'browserNotSupported': "Ваш браузер не поддерживает векторную визуализацию. В настоящее время поддерживаются такие визуализаторы:\n${renderers}",
	'componentShouldBe': "addFeatures : компонент должен быть типа ${geomType}",
	'getFeatureError':
		"getFeatureFromEvent вызвано на слое без визуализатора. Обычно это вызвано тем, что вы " +
		"удалили слой, но не удалили связанный с ним обработчик событий.",
	'minZoomLevelError':
		"Свойство minZoomLevel предназначено для использования только " +
		"со слоями-производными FixedZoomLevels. То, что  " +
		"слой wfs проверяет minZoomLevel, является пережитком " +
		"прошлого. Однако, мы не можем устранить это без возможных " +
		"сбоев приложений, основанных на OL и зависящих от этого." +
		" Проверка на minZoomLevel будет удалена в версии 3.0. До этого " +
		"будет принято считать тег устаревшим. Вместо него, пожалуйста, " +
		"используйте настройки разрешения min/max как описано здесь: " +
		"http://trac.openlayers.org/wiki/SettingZoomLevels",
	'commitSuccess': "WFS Транзакция: SUCCESS ${response}",
	'commitFailed': "WFS Транзакция: FAILED ${response}",
	'googleWarning':
		"Слой Google Layer не смог корректно загрузиться.<br><br>" +
		"Чтоб убрать это сообщение, Выберите другой слой Подложки " +
		"в переключателе слоев в правом верхнем углу.<br><br>" +
		"Скорее всего, это произошло из-за того, что библиотека скриптов Google Maps " +
		"либо не было включена, либо не содержит в себе корректный API ключ " +
		"для вашего сайта.<br><br>" +
		"Для разработчиков: если вы хотите помочь устранить эту неисправность, " +
		"<a href='http://trac.openlayers.org/wiki/Google' " +
		"target='_blank'>нажмите сюда</a>",
	'getLayerWarning':
		"Слой ${layerType} Layer не смог корректно загрузиться.<br><br>" +
		"Чтоб убрать это сообщение, Выберите другой слой Подложки " +
		"в переключателе слоев в правом верхнем углу.<br><br>" +
		"Скорее всего, это произошло из-за того, что библиотека ${layerLib} " +
		"либо не было включена, либо не содержит в себе корректный API ключ " +
		"для вашего сайта.<br><br>" +
		"Для разработчиков: если вы хотите помочь устранить эту неисправность, " +
		"<a href='http://trac.openlayers.org/wiki/${layerLib}' " +
		"target='_blank'>нажмите сюда</a>",
		'Scale = 1 : ${scaleDenom}': "Масштаб = 1 : ${scaleDenom}",
	'W': 'З',
	'E': 'В',
	'N': 'С',
	'S': 'Ю',
	'graticule': 'Координатная сетка',
	'layerAlreadyAdded': "Вы пытаетесь загрузить в карту слой: ${layerName}, который уже был добавлен",
	'reprojectDeprecated':
		"Вы используете опцию 'reproject' " +
		"на слое ${layerName}. Эта опция устарела: " +
		"её использование было спроектировано для поддержки отображения данных в коммерческих " +
		"картах, но на данный момент эта функциональность должна быть получена использованием поддержки " +
		"Spherical Mercator. Более подробная информация доступна на " +
		"http://trac.openlayers.org/wiki/SphericalMercator.",
	'methodDeprecated':
		"Метод устарел и будет удален из версии 3.0. " +
		"Пожалуйста, используйте ${newMethod} вместо него.",
	'boundsAddError': "Вы должны ввести оба значения - х и у - в фунцию добавления.",
	'lonlatAddError': "Вы должны ввести оба значения - широту и долготу - в функцию добавления.",
	'pixelAddError': "Вы должны ввести оба значения - х и у - в фунцию добавления.",
	'unsupportedGeometryType': "Неподдерживаемый геометрический тип: ${geomType}",
	'pagePositionFailed': "OpenLayers.Util.pagePosition failed: элемент с id ${elemId} может быть перенесен.",
	'filterEvaluateNotImplemented': "evaluate не имплементировано для этого типа фильтра.",
	'end': '',
	'proxyNeeded': "Возможно вам необходимо установить OpenLayers.ProxyHost для доступа к ${url}."+
	"Смотрите на http://trac.osgeo.org/openlayers/wiki/FrequentlyAskedQuestions#ProxyHost",
};
