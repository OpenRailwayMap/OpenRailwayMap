<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See https://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	// email address to send error reports to
	$mail = "info@openrailwaymap.org";

	// base part of the server url, must end with '/'
	if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']) {
		$urlbase = 'https://';
		$defaultport = 443;
	} else {
		$urlbase = 'http://';
		$defaultport = 80;
	}
	$urlbase .= $_SERVER['SERVER_NAME'];
	if ($_SERVER['SERVER_PORT'] != $defaultport)
		$urlbase .= ':' . $_SERVER['SERVER_PORT'];
	unset($defaultport);
	$urlbase .= $_SERVER['CONTEXT_PREFIX'];
	$subdir = dirname(substr($_SERVER['SCRIPT_FILENAME'], strlen($_SERVER['CONTEXT_DOCUMENT_ROOT'])));
	if ($subdir === '.')
		$subdir = '';
	$urlbase .= $subdir . '/';
	unset($subdir);

	$langs = array(
		"ca" => array("ca_ES", "Català"),
		"cs" => array("cs_CZ", "Česky"),
		"da" => array("da_DK", "Dansk"),
		"de" => array("de_DE", "Deutsch"),
		"el" => array("el_GR", "Ελληνικά"),
		"en" => array("en_GB", "English"),
		"es" => array("es_ES", "Español"),
		"fi" => array("fi_FI", "Suomi"),
		"fr" => array("fr_FR", "Français"),
		"hu" => array("hu_HU", "Magyar"),
		"ja" => array("ja_JP", "日本語"),
		"lt" => array("lt_LT", "Lietuvių"),
		"nl" => array("nl_NL", "Nederlands"),
		"nqo" => array("nqo_GN", "ߒߞߏ"),
		"pl" => array("pl_PL", "Polski"),
		"pt" => array("pt_PT", "Português"),
		"ru" => array("ru_RU", "Русский"),
		"sl" => array("sl_SI", "Slovenščina"),
		"sv" => array("sv_SE", "Svenska"),
		"tr" => array("tr_TR", "Türkçe"),
		"uk" => array("uk_UA", "Українська"),
		"vi" => array("vi_VN", "Tiếng Việt"),
		"zh_CN" => array("zh_CN", "简体中文")
		"zh_TW" => array("zh_TW", "正體中文")
	);
	// name of application
	$appname = "OpenRailwayMap";
	// useragent used for curl requests
	$useragent = "openrailwaymap.org";
?>
