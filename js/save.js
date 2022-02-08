const answersToSend = {};

function getCalcValues() {
	fetch("http://127.0.0.1:8000/api/values/?format=json")
		.then(response => response.json())
		.then(data => saveToCalcAnswers(data));
}

function sendToBase() {
	const toSendAnswers = JSON.stringify(answersE);
	const toSendCalcAnswers = JSON.stringify(answersToSend);

	let _data = {
		code: sessionStorage.getItem("code"),
		answers: toSendAnswers,
		calc_answers: toSendCalcAnswers,
	};
	fetch("http://127.0.0.1:8000/api/answers/?format=json", {
		method: "POST",
		body: JSON.stringify(_data),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	}).then(response => response.json());
}

function saveToCalcAnswers(data) {
	//-----------------------------------Metryczka----------------------------------------
	answersToSend["M_plec"] = answersE["M_plec"];
	answersToSend["M_wiek"] = answersE["M_wiek"];
	answersToSend["M_zamieszkanie"] = answersE["M_zamieszkanie"];
	answersToSend["M_wyksztalcenie"] = answersE["M_wyksztalcenie"];
	//------------------------------------TRANSPORT----------------------------------------

	// Samochód
	spalanie = answersE["T_samochSpalanie"];
	ileKm = answersE["T_samochod"] / 7;
	dniWRoku = 364;
	benzyna = 1;
	diesel = 2;
	lpg = 3;
	hybryda = 4;
	prad = 5;
	if (answersE["T_samochod"] == 0) {
		answersToSend["T_samochod"] = 0;
	} else {
		if (answersE["T_samochPaliwo"] == benzyna)
			answersToSend["T_samochod"] =
				(spalanie / 100) * ileKm * getValue("benzyna") * dniWRoku;
		if (answersE["T_samochPaliwo"] == diesel)
			answersToSend["T_samochod"] =
				(spalanie / 100) * ileKm * getValue("diesel") * dniWRoku;
		if (answersE["T_samochPaliwo"] == lpg)
			answersToSend["T_samochod"] =
				(spalanie / 100) * ileKm * getValue("lpg") * dniWRoku;
		if (answersE["T_samochPaliwo"] == hybryda)
			answersToSend["T_samochod"] =
				(spalanie / 100) * ileKm * getValue("hybryda") * dniWRoku;
		if (answersE["T_samochPaliwo"] == prad)
			answersToSend["T_samochod"] =
				(spalanie / 100) * ileKm * getValue("prad_elektryczny") * dniWRoku;
	}

	// Autobus
	spalanie_autobus = getValue("autobus_spalanie");
	ileKmAutobus = answersE["T_autobus"] / 7;

	if (answersE["autobus"] == 0) {
		answersToSend["T_autobus"] = 0;
	} else {
		answersToSend["T_autobus"] =
			((spalanie_autobus / 100) *
				ileKmAutobus *
				getValue("hybryda") *
				dniWRoku) /
			35;
	}

	// Motocykl/Jednoślad
	spalanie_mot = answersE["T_motorSpalanie"];
	ileKmMot = answersE["T_motor"] / 7;

	if (answersE["T_motor"] == 0) {
		answersToSend["T_motor"] = 0;
	} else {
		if (answersE["T_motorPaliwo"] == benzyna)
			answersToSend["T_motor"] =
				(spalanie_mot / 100) * ileKmMot * getValue("benzyna") * dniWRoku;
		if (answersE["T_motorPaliwo"] == diesel)
			answersToSend["T_motor"] =
				(spalanie_mot / 100) * ileKmMot * getValue("diesel") * dniWRoku;
		if (answersE["T_motorPaliwo"] == lpg)
			answersToSend["T_motor"] =
				(spalanie_mot / 100) * ileKmMot * getValue("lpg") * dniWRoku;
		if (answersE["T_motorPaliwo"] == hybryda)
			answersToSend["T_motor"] =
				(spalanie_mot / 100) * ileKmMot * getValue("hybryda") * dniWRoku;
		if (answersE["T_motorPaliwo"] == prad)
			answersToSend["T_motor"] =
				(spalanie_mot / 100) *
				ileKmMot *
				getValue("prad_elektryczny") *
				dniWRoku;
	}

	// Pociąg
	pociag = getValue("pociag");
	ileKmPociag = answersE["T_pociag"] / 7;

	if (answersE["T_pociag"] == 0) {
		answersToSend["T_pociag"] = 0;
	} else {
		answersToSend["T_pociag"] = ileKmPociag * pociag * dniWRoku;
	}

	// Tramwaj
	tramwaj = getValue("tramwaj");
	ileKmTramwaj = answersE["T_tramwaj"] / 7;

	if (answersE["T_tramwaj"] == 0) {
		answersToSend["T_tramwaj"] = 0;
	} else {
		answersToSend["T_tramwaj"] = ileKmTramwaj * tramwaj * dniWRoku;
	}

	// Samolot
	ileRazySamolotem = answersE["T_samolot"];
	jakDlugoSamolotem = answersE["T_samolotCzas"];

	if (answersE["T_samolot"] == 0) {
		answersToSend["T_samolot"] = 0;
	} else {
		answersToSend["T_samolot"] =
			ileRazySamolotem * jakDlugoSamolotem * getValue("samolot");
	}

	//---------------------------ENERGIA DOMU-----------------------------

	//---------------------------ODPADY-----------------------------------

	// O_odpadBio O_odpadPapier O_odpadPlastik O_odpadSzklo O_odpadJedzenie

	bio = getValue("bio");
	pcBio = answersE["O_odpadBio"];

	// console.log("----"+bio+' '+pcBio);

	//---------------------------JEDZENIE---------------------------------

	//mieso
	miesoNigdy = getValue("miesoNigdy");
	miesoRzadko = getValue("miesoRzadko");
	miesoCzasem = getValue("miesoCzasem");
	miesoCzesto = getValue("miesoCzesto");
	miesoBardzoCzesto = getValue("miesoBardzoCzesto");

	mieso = answersE["J_animalProduct"];
	switch (mieso) {
		case 1:
			answersToSend["J_animalProduct"] = miesoNigdy;
			break;
		case 2:
			answersToSend["J_animalProduct"] = miesoRzadko;
			break;
		case 3:
			answersToSend["J_animalProduct"] = miesoCzasem;
			break;
		case 4:
			answersToSend["J_animalProduct"] = miesoCzesto;
			break;
		case 5:
			answersToSend["J_animalProduct"] = miesoBardzoCzesto;
			break;
		default:
			break;
	}
	//alko
	alkoNigdy = 0;
	akloRzadko = getValue("alkoRzadko");
	alkoCzasem = getValue("alkoCzasem");
	alkoCzesto = getValue("alkoCzesto");
	alkoBardzoCzesto = getValue("alkoBardzoCzesto");

	alko = answersE["J_alkohol"];
	switch (alko) {
		case 1:
			answersToSend["J_alkohol"] = alkoNigdy;
			break;
		case 2:
			answersToSend["J_alkohol"] = akloRzadko;
			break;
		case 3:
			answersToSend["J_alkohol"] = alkoCzasem;
			break;
		case 4:
			answersToSend["J_alkohol"] = alkoCzesto;
			break;
		case 5:
			answersToSend["J_alkohol"] = alkoBardzoCzesto;
			break;
		default:
			break;
	}
	//cola
	colaNigdy = 0;
	colaRzadko = getValue("colaRzadko");
	colaCzasem = getValue("colaCzasem");
	colaCzesto = getValue("colaCzesto");
	colaBardzoCzesto = getValue("colaBardzoCzesto");

	alko = answersE["J_cola"];
	switch (alko) {
		case 1:
			answersToSend["J_cola"] = colaNigdy;
			break;
		case 2:
			answersToSend["J_cola"] = colaRzadko;
			break;
		case 3:
			answersToSend["J_cola"] = colaCzasem;
			break;
		case 4:
			answersToSend["J_cola"] = colaCzesto;
			break;
		case 5:
			answersToSend["J_cola"] = colaBardzoCzesto;
			break;
		default:
			break;
	}
	//soki
	sokiNigdy = 0;
	sokiRzadko = getValue("sokiRzadko");
	sokiCzasem = getValue("sokiCzasem");
	sokiCzesto = getValue("sokiCzesto");
	sokiBardzoCzesto = getValue("sokiBardzoCzesto");

	soki = answersE["J_soki"];
	switch (soki) {
		case 1:
			answersToSend["J_soki"] = sokiNigdy;
			break;
		case 2:
			answersToSend["J_soki"] = sokiRzadko;
			break;
		case 3:
			answersToSend["J_soki"] = sokiCzasem;
			break;
		case 4:
			answersToSend["J_soki"] = sokiCzesto;
			break;
		case 5:
			answersToSend["J_soki"] = sokiBardzoCzesto;
			break;
		default:
			break;
	}

	//kawa herbata
	kawaHerbataNigdy = 0;
	kawaHerbataRzadko = getValue("kawaHerbataRzadko");
	kawaHerbataCzasem = getValue("kawaHerbataCzasem");
	kawaHerbataCzesto = getValue("kawaHerbataCzesto");
	kawaHerbataBardzoCzesto = getValue("kawaHerbataBardzoCzesto");

	kawaHerbata = answersE["J_kawaHerbata"];
	switch (kawaHerbata) {
		case 1:
			answersToSend["J_kawaHerbata"] = kawaHerbataNigdy;
			break;
		case 2:
			answersToSend["J_kawaHerbata"] = kawaHerbataRzadko;
			break;
		case 3:
			answersToSend["J_kawaHerbata"] = kawaHerbataCzasem;
			break;
		case 4:
			answersToSend["J_kawaHerbata"] = kawaHerbataCzesto;
			break;
		case 5:
			answersToSend["J_kawaHerbata"] = kawaHerbataBardzoCzesto;
			break;
		default:
			break;
	}

	//woda
	wodaKran = getValue("wodaKran");
	wodaKranButMalo = getValue("wodaKranButMalo");
	wodaKranButDuzo = getValue("wodaKranButDuzo");
	wodaButelki = getValue("wodaButelki");

	woda = answersE["J_wodaButel"];
	switch (woda) {
		case 1:
			answersToSend["J_wodaButel"] = wodaKran;
			break;
		case 2:
			answersToSend["J_wodaButel"] = wodaKranButMalo;
			break;
		case 3:
			answersToSend["J_wodaButel"] = wodaKranButDuzo;
			break;
		case 4:
			answersToSend["J_wodaButel"] = wodaButelki;
			break;
		default:
			break;
	}
	//---------------------------CZAS WOLNY-------------------------------

	//-------------------------KONSUMPCJA---------------------------------

	// Podsumowanie
	let TRANSPORT = 0;
	let ENERGIA_DOMU = 0;
	let ODPADY = 0;
	let JEDZENIE = 0;
	let CZAS_WOLNY = 0;
	let KONSUMPCJA = 0;

	for (let i = 0; i < Object.keys(answersToSend).length; i++) {
		if (Object.keys(answersToSend)[i].charAt(0) == "T") {
			TRANSPORT += Number.parseInt(Object.values(answersToSend)[i]);
		}
		if (Object.keys(answersToSend)[i].charAt(0) == "J") {
			JEDZENIE += Number.parseInt(Object.values(answersToSend)[i]);
		}
	}


	// Wysyłanie do danych sesyjnych
	sessionStorage.setItem("TRANSPORT", TRANSPORT);
	sessionStorage.setItem("ENERGIA_DOMU", ENERGIA_DOMU);
	sessionStorage.setItem("ODPADY", ODPADY);
	sessionStorage.setItem("JEDZENIE", JEDZENIE);
	sessionStorage.setItem("CZAS_WOLNY", CZAS_WOLNY);
	sessionStorage.setItem("KONSUMPCJA", KONSUMPCJA);
	// Wysyłamy dane do bazy
	sendToBase();

	// Przekierowanie
	// location.href="finish.html";

	console.log(answersToSend);
	// console.log("wysłane");

	// Dodatkowe funkcje
	function getValue(name) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].name == name) {
				return data[i].value;
			}
		}
	}
}
