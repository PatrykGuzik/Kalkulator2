function DrawRecommendation(d) {
	// po załadowaniu wszystkich danych ukrywamy "loading"
	hideLoading();


	//-----------------------------TRANSPORT-----------------------------
	let innerTransport = "";

	const theBiggestTransport = getBiggest(getBiggerInCategory("transport"), 3);

	// ANSWERSE["T_samochPaliwo"] =5 ;

	getRightOrderTransport(theBiggestTransport);

	function getRightOrderTransport(theBiggestCategory) {
		theBiggestCategory.forEach(element => {
			getByParameterTransport(element);
		});
	}

	function getByParameterTransport(param) {
		switch (param) {
			case "T_samochod":
				getSamochod();
				break;
			case "T_samolot":
				getSamolot();
				break;
			case "T_motor":
				getMotor();
				break;
			case "T_pociag":
				getPociag();
				break;
			case "T_tramwaj":
				getTramwaj();
				break;
		}
	}

	function getSamochod() {
		if (ANSWERS["T_samochod"] > 0) {
			// innerTransport += `<p class="red-border">${getRecByName("T_samochod")}</p>`
			saveToInnerTransport("T_samochod");

			switch (ANSWERSE["T_samochPaliwo"]) {
				case 1:
					saveToInnerTransport("T_samochod_benzyna");
					break;
				case 2:
					saveToInnerTransport("T_samochod_diesel");
					break;
				case 3:
					saveToInnerTransport("T_samochod_gaz");
					break;
				case 4:
					saveToInnerTransport("T_samochod_hybryda");
					break;
				case 5:
					saveToInnerTransport("T_samochod_elek");
					break;
			}
		}
	}

	function getSamolot() {
		if (ANSWERS["T_samolot"] > 0) {
			saveToInnerTransport("T_samolot");
		}
	}

	function getMotor() {
		if (ANSWERS["T_motor"] > 0) {
			if (ANSWERSE["T_motorPaliwo"] == 1) {
				saveToInnerTransport("T_motor_ben_dies_gas");
			}
		}
	}

	function getPociag() {
		if (ANSWERS["T_pociag"] > 0) {
			saveToInnerTransport("T_pociag");
		}
	}

	function getTramwaj() {
		if (ANSWERS["T_tramwaj"] > 0) {
			saveToInnerTransport("T_tramwaj");
		}
	}

	recommendationsByCat["TRANSPORT"] = innerTransport;

	//-------------------------------JEDZENIE-----------------------------

	const theBiggestJedzenie = getBiggest(getBiggerInCategory("jedzenie"), 3);

	let innerJedzenie = "";

	getRightOrderJedzenie(theBiggestJedzenie);

	function getRightOrderJedzenie(theBiggestCategory) {
		theBiggestCategory.forEach(element => {
			getByParameterJedzenie(element);
		});
	}

	function getByParameterJedzenie(param) {
		switch (param) {
			case "J_animalProduct":
				getZwierz();
				break;
			case "J_kawaHerbata":
				getKawa();
				break;
			case "J_wodaButel":
				getWoda();
				break;
		}
	}

	function getZwierz() {
		if (ANSWERSE["J_animalProduct"] > 2) {
			saveToInnerJedzenie("J_zwierz");
		}
	}

	function getKawa() {
		if (ANSWERSE["J_kawaHerbata"] > 2) {
			saveToInnerJedzenie("J_kawa");
		}
	}

	function getWoda() {
		if (ANSWERSE["J_wodaButel"] > 2) {
			saveToInnerJedzenie("J_woda_but");
		}
	}

	recommendationsByCat["JEDZENIE"] = innerJedzenie;

	//------------------------------ENERGIA DOMU-------------------------
	const theBiggestEnergiaDomu = getBiggest(getBiggerInCategory("energia"), 5);

	innerEnergiaDomu = "";

	getRightOrderEnergiaDomu(theBiggestEnergiaDomu);

	function getRightOrderEnergiaDomu(theBiggestCategory) {
		theBiggestCategory.forEach(element => {
			getByParameterEnergiaDomu(element);
		});
	}

	function getByParameterEnergiaDomu(param) {
		switch (param) {
			case "E_budynekEfficient":
				getWydajnoscDomu();
				break;
			case "E_prysznic":
				getPrysznic();
				break;
			case "E_pranie":
				getPranie();
				break;
			case "E_prad":
				getPrad();
				break;
		}
	}

	function getWydajnoscDomu() {
		if (ANSWERSE["E_budynekEfficient"] > 2) {
			saveToInnerEnergiaDomu("E_ocieplenie");

			switch (ANSWERSE["E_zrodlaOgrzewania"]) {
				case 2: // węgiel
					saveToInnerEnergiaDomu("E_ociep_wegiel");
					break;
				case 3: // gaz
					saveToInnerEnergiaDomu("E_ociep_bio_gaz");
					break;
				case 6: // bio gaz
					saveToInnerEnergiaDomu("E_ociep_bio_gaz");
					break;
			}
		}
	}

	function getPrysznic() {
		if (ANSWERSE["E_prysznicIle"] > 0) {
			if (ANSWERSE["E_prysznicCzas"] > 9) {
				saveToInnerEnergiaDomu("E_prysznic");
			}
		}
	}

	function getPranie() {
		if (ANSWERSE["E_pranieTemp"] == 3) {
			saveToInnerEnergiaDomu("E_pranie");
		}
		if (ANSWERSE["E_suszenie"] == 2) {
			saveToInnerEnergiaDomu("E_suszenie");
		}
	}

	function getPrad() {
		if (ANSWERSE["E_rachunkiEnergia"] > 250) {
			saveToInnerEnergiaDomu("E_prad");
		}
	}

	recommendationsByCat["ENERGIA DOMU"] = innerEnergiaDomu;

	//-----------------------------CZAS WOLNY----------------------------

	const theBiggestCzasWolny = getBiggest(getBiggerInCategory("czas_wolny"), 7);

	innerCzasWolny = "";
	let electro = 0;

	getRightOrderCzasWolny(theBiggestCzasWolny);

	function getRightOrderCzasWolny(theBiggestCategory) {
		theBiggestCategory.forEach(element => {
			getByParameterCzasWolny(element);
		});
	}

	function getByParameterCzasWolny(param) {
		switch (param) {
			case "C_rejs":
				getRejs();
				break;
			case "C_netflix":
				if (electro == 0) {
					getElectro();
				}
				break;
			case "C_music":
				if (electro == 0) {
					getElectro();
				}
				break;
			case "C_online":
				if (electro == 0) {
					getElectro();
				}
				break;
			case "C_egzotyczneLoty":
				getEgzot();
				break;
			case "C_booksPapier":
				getKsiazkaPapier();
				break;
			case "C_zagraniczneHotele":
				getZagHotel();
				break;
			case "C_zagraniczneOrganizacje":
				getOrganZag();
				break;
			case "C_wakacjeZagraniczne":
				getZag();
				break;
		}
	}

	function getRejs() {
		if (ANSWERSE["C_cechyWakacji"][0]) {
			saveToInnerCzasWolny("C_rejs");
		}
	}
	function getOrganZag() {
		if (ANSWERSE["C_cechyWakacji"][3]) {
			saveToInnerCzasWolny("C_organizowane");
		}
	}
	function getEgzot() {
		if (ANSWERSE["C_cechyWakacji"][1]) {
			saveToInnerCzasWolny("C_inny_kontynent");
		}
	}
	function getZagHotel() {
		if (ANSWERSE["C_cechyWakacji"][2]) {
			saveToInnerCzasWolny("C_hotel");
		}
	}
	function getZag() {
		if (
			ANSWERSE["C_cechyWakacji"][1] ||
			ANSWERSE["C_cechyWakacji"][2] ||
			ANSWERSE["C_cechyWakacji"][3] ||
			ANSWERSE["C_cechyWakacji"][4] ||
			ANSWERSE["C_cechyWakacji"][9]
		) {
			saveToInnerCzasWolny("C_hotel");
		}
	}
	function getKsiazkaPapier() {
		if (ANSWERSE["C_booksPapier"] > 10) {
			saveToInnerCzasWolny("C_ksiazki");
		}
	}
	function getElectro() {
		if (
			ANSWERSE["C_musicTime"] > 30 ||
			ANSWERSE["C_netflixTime"] > 15 ||
			ANSWERSE["C_onlineTime"] > 30
		) {
			saveToInnerCzasWolny("C_cyfra");
			electro += 1;
		}
	}

	recommendationsByCat["CZAS WOLNY"] = innerCzasWolny;

	//----------------------------Konsumpcja----------------------------------

	const theBiggestKonsumpcja = getBiggest(
		getBiggerInCategory("konsumpcja"),
		15
	);

	innerKonsumpcja = "";
	let buty = 0;

	getRightOrderKonsumpcja(theBiggestKonsumpcja);

	function getRightOrderKonsumpcja(theBiggestCategory) {
		theBiggestCategory.forEach(element => {
			getByParameterKonsumpcja(element);
		});
	}

	function getByParameterKonsumpcja(param) {
		switch (param) {
			case "K_elektr":
                getElektr();
				break;
			case "K_skora":
				if (buty == 0) {
					getButy();
				}
				break;
			case "K_skoropod":
				if (buty == 0) {
					getButy();
				}
				break;
			case "K_guma":
				if (buty == 0) {
					getButy();
				}
				break;
			case "K_inne":
				if (buty == 0) {
					getButy();
				}
				break;
			case "K_noweUbrania":
                getUbrania()
				break;
			case "K_kosmetyki":
                
				break;
			case "K_tkanina":
                getTkanina();
				break;
			case "K_zakupy":
                getZakupy();
				break;
		}
	}

    function getButy() {
        if (
			ANSWERSE["K_skora"] > 1 ||
			ANSWERSE["K_skoropod"] > 1 ||
			ANSWERSE["K_guma"] > 1 ||
			ANSWERSE["K_inne"] > 1 ||
			ANSWERSE["K_tkanina"] > 1 
		) {
			saveToInnerKonsumpcja("K_buty");
            buty += 1
		}
    }
    function getUbrania() {
        if (ANSWERSE["K_noweUbrania"] > 10) {
			saveToInnerKonsumpcja("K_ubrania");
		}
    }
    function getElektr() {
        if (ANSWERSE["K_sprzetyEle"] > 3) {
			saveToInnerKonsumpcja("K_elektro");
		}
    }
    function getTkanina() {
        if (ANSWERSE["K_rodzajMaterialu"] > 2) {
			saveToInnerKonsumpcja("K_material");
		}
    }
    function getZakupy() {
        if (ANSWERSE["K_sklepy"] > 2) {
			saveToInnerKonsumpcja("K_wysylka");
		}
    }


	recommendationsByCat["KONSUMPCJA"] = innerKonsumpcja;

	//---------------------------Odpady-----------------------------------
    const theBiggestOdpady = getBiggest(getBiggerInCategory("odpady"), 4);

	innerOdpady = "";

    let odpady = 0;
	getRightOrderOdpady(theBiggestOdpady);

	function getRightOrderOdpady(theBiggestCategory) {
		theBiggestCategory.forEach(element => {
			getByParameterOdpady(element);
		});
	}

	function getByParameterOdpady(param) {
		switch (param) {
			case "O_odpadPlastik":
				if (odpady == 0) {
					getOdpady();
				}
				break;
			case "O_odpadPapier":
				if (odpady == 0) {
					getOdpady();
				}
				break;
			case "O_odpadBio":
				if (odpady == 0) {
					getOdpady();
				}
				break;
			case "O_odpadJedzenie":
				getOdpadyJedzenie();
				break;
		}
	}

    function getOdpady() {
        if (
			ANSWERSE["O_odpadBio"] < 0.9 ||
			ANSWERSE["O_odpadPapier"] < 0.9 ||
			ANSWERSE["O_odpadPlastik"] < 0.9
		) {
			saveToInnerOdpady("O_odpady");
			odpady += 1;
		}
    }

    function getOdpadyJedzenie() {
        if (ANSWERSE["O_odpadJedzenie"] > 0.1){
            saveToInnerOdpady("O_jedzenie");
        }
    }

	recommendationsByCat["ODPADY"] = innerOdpady;

	// save to Inners

	function saveToInnerTransport(name, isRed = false) {
		innerClass = "";
		if (isRed) {
			innerClass = "red-border";
		}

		innerTransport += `<p class="${innerClass}">${getRecByName(name)}</p>`;
	}

	function saveToInnerJedzenie(name, isRed = false) {
		innerClass = "";
		if (isRed) {
			innerClass = "red-border";
		}

		innerJedzenie += `<p class="${innerClass}">${getRecByName(name)}</p>`;
	}

	function saveToInnerEnergiaDomu(name, isRed = false) {
		innerClass = "";
		if (isRed) {
			innerClass = "red-border";
		}

		innerEnergiaDomu += `<p class="${innerClass}">${getRecByName(name)}</p>`;
	}

	function saveToInnerCzasWolny(name, isRed = false) {
		innerClass = "";
		if (isRed) {
			innerClass = "red-border";
		}

		innerCzasWolny += `<p class="${innerClass}">${getRecByName(name)}</p>`;
	}

    function saveToInnerKonsumpcja(name, isRed = false) {
		innerClass = "";
		if (isRed) {
			innerClass = "red-border";
		}

		innerKonsumpcja += `<p class="${innerClass}">${getRecByName(name)}</p>`;
	}

    function saveToInnerOdpady(name, isRed = false) {
		innerClass = "";
		if (isRed) {
			innerClass = "red-border";
		}

		innerOdpady += `<p class="${innerClass}">${getRecByName(name)}</p>`;
	}

	function getRecByName(name) {
		for (let i = 0; i < d.length; i++) {
			if (d[i].name == name) {
				return d[i][`rekomendacja_${lang}`];
			}
		}
	}

	function getBiggerInCategory(category) {
		bigger = {};

		for (let i = 0; i < Object.keys(ANSWERS).length; i++) {
			if (Object.keys(ANSWERS)[i].charAt(0) == category[0].toUpperCase()) {
				bigger[Object.keys(ANSWERS)[i]] = Object.values(ANSWERS)[i];
			}
		}

		return bigger;
	}
}
