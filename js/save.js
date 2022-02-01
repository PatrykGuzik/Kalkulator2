const test = {};

for (let i = 1; i <= 6; i++) {
	test[i] = null;
}

function getCalcValues() {
	fetch("http://127.0.0.1:8000/api/values/?format=json")
		.then(response => response.json())
		.then(data => saveToCalcAnswers(data));
}

function sendToBase() {
	const toSendAnswers = JSON.stringify(answers);
	const toSendCalcAnswers = JSON.stringify(test);

	let _data = {
		code: sessionStorage.getItem('code'),
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
	// Samochód
	spalanie = answers[10].answer;
	ileKm = answers[4].answer;
	tygWRoku = 52;
	benzyna = 1;
	diesel = 2;
	lpg = 3;
	hybryda = 4;
	prad = 5;
	if (answers[4].answer == 0) {
		test[1] = 0;
	} else {
		if (answers[9].answer == benzyna)
			test[1] = (spalanie / 100) * ileKm * getValue("benzyna") * tygWRoku;
		if (answers[9].answer == diesel)
			test[1] = (spalanie / 100) * ileKm * getValue("diesel") * tygWRoku;
		if (answers[9].answer == lpg)
			test[1] = (spalanie / 100) * ileKm * getValue("lpg") * tygWRoku;
		if (answers[9].answer == hybryda)
			test[1] = (spalanie / 100) * ileKm * getValue("hybryda") * tygWRoku;
		if (answers[9].answer == prad)
			test[1] =
				(spalanie / 100) * ileKm * getValue("prad_elektryczny") * tygWRoku;
	}

	// Autobus
	spalanie_autobus = getValue("autobus_spalanie");
	ileKmAutobus = answers[5].answer;

	if (answers[5].answer == 0) {
		test[2] = 0;
	} else {
		test[2] =
			((spalanie_autobus / 100) *
				ileKmAutobus *
				getValue("hybryda") *
				tygWRoku) /
			35;
	}

	// Motocykl/Jednoślad
	spalanie_mot = answers[12].answer;
	ileKmMot = answers[6].answer;

	if (answers[6].answer == 0) {
		test[3] = 0;
	} else {
		if (answers[11].answer == benzyna)
			test[3] =
				(spalanie_mot / 100) * ileKmMot * getValue("benzyna") * tygWRoku;
		if (answers[11].answer == diesel)
			test[3] = (spalanie_mot / 100) * ileKmMot * getValue("diesel") * tygWRoku;
		if (answers[11].answer == lpg)
			test[3] = (spalanie_mot / 100) * ileKmMot * getValue("lpg") * tygWRoku;
		if (answers[11].answer == hybryda)
			test[3] =
				(spalanie_mot / 100) * ileKmMot * getValue("hybryda") * tygWRoku;
		if (answers[11].answer == prad)
			test[3] =
				(spalanie_mot / 100) *
				ileKmMot *
				getValue("prad_elektryczny") *
				tygWRoku;
	}

	// Pociąg
	pociag = getValue("pociag");
	ileKmPociag = answers[7].answer;

	if (answers[7].answer == 0) {
		test[4] = 0;
	} else {
		test[4] = ileKmPociag * pociag * tygWRoku;
	}

	// Tramwaj
	tramwaj = getValue("tramwaj");
	ileKmTramwaj = answers[8].answer;

	if (answers[7].answer == 0) {
		test[5] = 0;
	} else {
		test[5] = ileKmTramwaj * tramwaj * tygWRoku;
	}

	// Samolot
	ileRazySamolotem = answers[13].answer;
	jakDlugoSamolotem = answers[14].answer;

	if (answers[13].answer == 0) {
		test[6] = 0;
	} else {
		test[6] = ileRazySamolotem * jakDlugoSamolotem * getValue("samolot");
	}

	//----------------------------------------------------

	// Podsumowanie
	let TRANSPORT = 0;

	for (let i = 1; i <= Object.keys(test).length; i++) {
		TRANSPORT += test[i];
	}
	// Wysyłanie do danych sesyjnych
	sessionStorage.setItem("TRANSPORT", Math.round(TRANSPORT));
	// Wysyłamy dane do bazy
	sendToBase();

	console.log("wysłane");

	// Dodatkowe funkcje
	function getValue(name) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].name == name) {
				return data[i].value;
			}
		}
	}
}
