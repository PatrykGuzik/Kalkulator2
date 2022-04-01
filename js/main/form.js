class Form {
	constructor(jsonQuestions, innerPlace) {
		this.jsonQuestions = jsonQuestions;
		this.innerPlace = innerPlace;
		this.numberOfQuestions = this.jsonQuestions.length;
	}

	drawInputsByType() {
		const form_box = document.querySelector(this.innerPlace);
		let form_box_inner = "";

		for (let i = 0; i < this.numberOfQuestions; i++) {
			switch (this.jsonQuestions[i].typ_pytania) {
				case "input":
					form_box_inner += this.drawInputText(this.jsonQuestions[i]);
					break;

				case "radio":
					form_box_inner += this.drawRadio(this.jsonQuestions[i]);
					break;

				case "checkbox":
					form_box_inner += this.drawCheckbox(this.jsonQuestions[i]);
					break;

				case "range":
					form_box_inner += this.drawSlider(this.jsonQuestions[i]);
					break;

				case "range_percent":
					form_box_inner += this.drawSliderPercent(this.jsonQuestions[i]);
					break;

				// case "newinput":
				// 	form_box_inner += this.drawNewImputText(this.jsonQuestions[i]);
				// 	break;

				default:
					break;
			}
		}

		form_box.innerHTML = form_box_inner;
	}

	updateAndValidateInputs() {
		this.updateSlider();
		this.updateSliderPercent();
		this.updateInputText();
		this.updateRadio();
		this.updateCheckbox();
	}

	updateConditionalQuestions() {
		// Ważne: nie mylić page z answers[x]

		// TRANSPORT (Ile km przejeżdżasz samochodem?)
		if (answersE["T_samochod"] > 0) this._setStatusPages([4, 5], true);
		else this._setStatusPages([4, 5], false);

		// TRANSPORT (Ile km przejeżdżasz jednośladem?)
		if (answersE["T_motor"] > 0) this._setStatusPages([6, 7], true);
		else this._setStatusPages([6, 7], false);

		// TRANSPORT (Ile razy leciałeś_aś samolotem?)
		if (answersE["T_samolot"] > 0) this._setStatusPages([9], true);
		else this._setStatusPages([9], false);

		// ENERGIA DOMU (Ile razy w tygodniu bierzesz prysznic?)
		if (answersE["E_prysznicIle"] > 0) this._setStatusPages([17], true);
		else this._setStatusPages([17], false);

		// CZAS WOLNY (Ile dni w roku spędzasz na wakacjach?)
		if (answersE["C_dniWakacji"] > 0) this._setStatusPages([28], true);
		else this._setStatusPages([28], false);

		// KONSUMPCJA (Ile nowych ubrań kupujesz w ciągu roku?)
		if (answersE["K_noweUbrania"] > 0) this._setStatusPages([35], true);
		else this._setStatusPages([35], false);
	}

	_setStatusPages(listOfPages, status) {
		if (status) {
			listOfPages.forEach(element => {
				pages[element] = true;
			});
		} else {
			listOfPages.forEach(element => {
				pages[element] = false;
			});
		}
	}

	drawInputText(question) {
		let validateText = '';
		switch (lang) {
			case "pl": validateText = 'wpisz liczbę większą lub równą 0'; break;
			case "ang": validateText = 'Enter a number greater than or equal to 0'; break;
		}
		let header = "";
		let subquestion = `<p>${question[`pytanie_pomocnicze_${lang}`]}</p> `;
		let unit = "";

		if (question[`jednostka_${lang}`] == null) {
			unit = "";
		} else {
			unit = question[`jednostka_${lang}`];
		}

		if (question.pytanie_pomocnicze_pl == null) {
			subquestion = "";
		}

		if (this.isFirstQuestionOnPage(question)) {
			header += `<h3 class="main-question-text"> ${question[`pytanie_${lang}`]} </h3> `;
		} else {
			header = "";
		}

		// zmiana: question.question_nr na question.etykieta
		return `<div class="form-object input-text-object ${this.getLastObjectClassOnPage(
			question
		)} ${question.etykieta}">  
                    <p>${header}</p>
					${subquestion}
					<input id="${
						question.etykieta
					}" type="text" maxlength="5" class="input-object"> <span>${unit}</span>
					<p class="validate-input">${validateText} </p>
					
                </div>`;
	}

	updateInputText() {
		const inputText = document.querySelectorAll(".input-text-object");

		for (let i = 0; i < Object.keys(inputText).length; i++) {
			//-----------zapis z sesji-------------
			const inputObject = inputText[i].querySelector(".input-object");
			const inputObjectId = inputObject.id;
			const ANSWERS = JSON.parse(sessionStorage.getItem("answersE"));

			if (ANSWERS) {
				if (ANSWERS[inputObjectId] != null) {
					inputObject.value = ANSWERS[inputObjectId];
				}
			}
			//-------------------------------------

			inputText[i].addEventListener("input", () => {
				const inputObject = inputText[i].querySelector(".input-object");
				const inputObjectId = inputObject.id;
				const inputTextValue = parseInt(inputObject.value, 10);

				if (Number.isInteger(inputTextValue) && inputTextValue >= 0) {
					// answers[inputObjectId - 1].answer = inputTextValue;
					answersE[inputObjectId] = inputTextValue;
				} else {
					// answers[inputObjectId - 1].answer = null;
					answersE[inputObjectId] = null;
				}

				this.isFull();
				// inputText[i].querySelector(".validate-input").style.display = "none";
				inputText[i].querySelector(".validate-input").style.opacity = "0";
				inputText[i].querySelector(".validate-input").style.transform =
					"translateY(-100%)";
				inputText[i].querySelector(".validate-input").style.fontSize = "0px";

				this.saveDataInSession();
			});
		}
	}

	getLastObjectClassOnPage(question) {
		let lastOnPage = "";

		if (this.isLastQuestionOnPage(question)) {
			lastOnPage += `last-on-page`;
		} else {
			lastOnPage = "";
		}

		return lastOnPage;
	}

	drawRadio(question) {
		let validateText = '';
		switch (lang) {
			case "pl": validateText = 'Zaznacz jedną odpowiedź'; break;
			case "ang": validateText = 'Mark one answer.'; break;
		}
		let subQuestions = "";
		let numberOfSubQuestions = Object.keys(
			question.mozliwe_odpowiedzi_pl.split(";")
		).length;

		let lastOnPage = "";

		if (this.isLastQuestionOnPage(question)) {
			lastOnPage += `last-on-page`;
		} else {
			lastOnPage = "";
		}

		for (let j = 0; j < numberOfSubQuestions; j++) {
			let subQuestion = question[`mozliwe_odpowiedzi_${lang}`].split(";")[j];
			subQuestions += `<label> 
                <input id="${question.etykieta}" type="radio" name="r${question.question_nr}" class="radio input-object">  <span>${subQuestion}</span>
            </label>`;
		}
		return `<div class="form-object radio-object ${this.getLastObjectClassOnPage(
			question
		)} ${question.etykieta}">  
                    <h3>${question[`pytanie_${lang}`]}</h3> 
                    ${subQuestions}
					<div class="validate-radio-box"><p class="validate-radio"> ${validateText} </p></div>
                </div>`;
	}

	updateRadio() {
		const inputRadio = document.querySelectorAll(".radio-object");

		for (let i = 0; i < Object.keys(inputRadio).length; i++) {
			//-----------zapis z sesji-------------
			const inputObject = inputRadio[i].querySelector(".input-object");
			const nameObject = inputObject.name;
			const inputObjectId = inputObject.id;
			const values = document.getElementsByName(nameObject);

			const ANSWERS = JSON.parse(sessionStorage.getItem("answersE"));

			// console.log(inputObjectId + " - " + ANSWERS[inputObjectId]);

			if (ANSWERS) {
				if (ANSWERS[inputObjectId] != null) {
					values[ANSWERS[inputObjectId] - 1].checked = true;
				}
			}
			//-------------------------------------

			inputRadio[i].addEventListener("input", () => {
				const inputValues = [];
				const inputObject = inputRadio[i].querySelector(".input-object");
				const nameObject = inputObject.name;
				const inputObjectId = inputObject.id;
				const values = document.getElementsByName(nameObject);
				let inputRadioValue = 0;

				// console.log(values[0].checked = true);

				values.forEach(element => {
					inputValues.push(element.checked);
				});

				for (let i = 0; i < inputValues.length; i++) {
					if (inputValues[i]) {
						inputRadioValue = i + 1;
					}
				}

				answersE[inputObjectId] = inputRadioValue;

				this.isFull();
				inputRadio[i].querySelector(".validate-radio").style.opacity = "0";
				inputRadio[i].querySelector(".validate-radio").style.transform =
					"translateY(-100%)";
				inputRadio[i].querySelector(".validate-radio").style.fontSize = "0px";

				this.saveDataInSession();
			});
		}
	}

	validateForms() {
		const formObject = document.querySelectorAll(".form-object");
		const formsOnPage = this._getFormsOnPage();
		const answersOnPage = this._getAnswersOnPage(formsOnPage);

		for (let i = 0; i < formsOnPage.length; i++) {
			if (answersOnPage[i] == null) {
				const a = document.querySelector(`.${formsOnPage[i]}`);

				if (a.classList.contains("radio-object")) {
					const b = a.querySelector(".validate-radio");
					b.style.opacity = "1";
					b.style.transform = "translateY(0)";
					b.style.fontSize = "14px";
				}

				if (a.classList.contains("input-text-object")) {
					const b = a.querySelector(".validate-input");
					b.style.opacity = "1";
					b.style.transform = "translateY(0)";
					b.style.fontSize = "14px";
				}
			}
		}
	}

	isFull() {
		const formsOnPage = this._getFormsOnPage();
		const answersOnPage = this._getAnswersOnPage(formsOnPage);

		if (answersOnPage.includes(null)) {
			isValidate = false;
		} else {
			isValidate = true;
		}
	}

	_getFormsOnPage() {
		const formObject = document.querySelectorAll(".form-object");
		const formsOnPage = [];
		formObject.forEach(element => {
			let inputObjectId = element.querySelector(".input-object").id;
			if (element.style.display != "none") {
				// formsOnPage.push(parseInt(inputObjectId, 10));
				formsOnPage.push(inputObjectId);
			}
		});
		// console.log(formsOnPage);
		return formsOnPage;
	}

	_getAnswersOnPage(formsOnPage) {
		const answersOnPage = [];

		for (let i = 0; i < formsOnPage.length; i++) {
			if (answersE[formsOnPage[i]] != null) {
				answersOnPage.push(answersE[formsOnPage[i]]);
			} else {
				answersOnPage.push(null);
			}
		}
		return answersOnPage;
	}

	drawCheckbox(question) {
		let subQuestions = "";
		let numberOfSubQuestions = Object.keys(
			question.mozliwe_odpowiedzi_pl.split(";")
		).length;

		for (let j = 0; j < numberOfSubQuestions; j++) {
			let subQuestion = question[`mozliwe_odpowiedzi_${lang}`].split(";")[j];
			subQuestions += `<label class="checkbox-container"> <p>${subQuestion}</p>
                <input id="${question.etykieta}" type="checkbox" name="c${question.question_nr}" class="input-object">   
				<span class="checkmark"></span>
            </label>`;
		}
		return `<div class="form-object checkbox-object ${this.getLastObjectClassOnPage(
			question
		)}">  
					<h3>${question[`pytanie_${lang}`]}</h3> 
					<div class="checkbox-box">
                    	${subQuestions}
					</div>
                </div>`;
	}

	updateCheckbox() {
		const inputCheckbox = document.querySelectorAll(".checkbox-object");

		for (let i = 0; i < Object.keys(inputCheckbox).length; i++) {
			const inputValues = [];
			const inputObject = inputCheckbox[i].querySelector(".input-object");
			const inputObjectId = inputObject.id;
			const nameObject = inputObject.name;
			const values = document.getElementsByName(nameObject);

			//-----------zapis z sesji-------------
			const ANSWERS = JSON.parse(sessionStorage.getItem("answersE"));

			// console.log(inputObjectId + " - " + ANSWERS[inputObjectId]);

			if (ANSWERS) {
				if (ANSWERS[inputObjectId] != null) {
					answersE = JSON.parse(sessionStorage.getItem("answersE"));
					for (let i = 0; i < ANSWERS[inputObjectId].length; i++) {
						values[i].checked = ANSWERS[inputObjectId][i];
					}
				}
			}
			//-------------------------------------

			values.forEach(element => {
				inputValues.push(element.checked);
			});

			// answers[inputObjectId - 1].answer = inputValues;
			answersE[inputObjectId] = inputValues;

			inputCheckbox[i].addEventListener("input", () => {
				const inputValues = [];
				values.forEach(element => {
					inputValues.push(element.checked);
				});

				// answers[inputObjectId - 1].answer = inputValues;
				answersE[inputObjectId] = inputValues;

				this.isFull();
				this.saveDataInSession();
			});
		}
	}

	drawSlider(question) {
		let header = "";
		let subQuestion = "";
		let subQuestions = [];
		let describes = [];

		if (this.isFirstQuestionOnPage(question)) {
			header += `<h3 class="main-question-slider"> ${question[`pytanie_${lang}`]} </h3> `;
		} else {
			header = "";
		}

		let numberOfSubQuestions = Object.keys(
			question[`mozliwe_odpowiedzi_${lang}`].split(";")
		).length;
		for (let j = 0; j < numberOfSubQuestions; j++) {
			let subQuestion = question[`mozliwe_odpowiedzi_${lang}`].split(";")[j];
			let describe = question[`range_${lang}_opis`].split(";")[j];
			subQuestions.push(subQuestion);
			describes.push(describe);
		}

		if (question.pytanie_pomocnicze_pl != null) {
			subQuestion += `<p><b>${question[`pytanie_pomocnicze_${lang}`]}</b></p>`;
		}

		const middleValue = Number.parseInt(numberOfSubQuestions / 2);

		return `<div class="form-object slider-object ${this.getLastObjectClassOnPage(
			question
		)}">  
                    ${header}
                    ${subQuestion}
                    <div class="slider-value">${
											subQuestions[middleValue]
										}</div></br>
                    <input id="${
											question.etykieta
										}" type="range" min="1" max="${numberOfSubQuestions}" class="input-object slider"> 
                    <p class="slider-describe">${describes[middleValue]}</p>
                </div>`;
	}

	updateSlider() {
		const inputSliders = document.querySelectorAll(".slider-object");

		for (let i = 0; i < Object.keys(inputSliders).length; i++) {
			const inputObject = inputSliders[i].querySelector(".input-object");
			const sliderValue = inputSliders[i].querySelector(".slider-value");
			const inputObjectId = inputObject.id;

			this.updateProgressSlider(inputObject);

			//-----------zapis z sesji-------------
			const sliderDescribe = inputSliders[i].querySelector(".slider-describe");
			sliderValue.value = inputObject.value;
			const sliderObjectsList = [];

			for (let j = 0; j < Object.keys(this.jsonQuestions).length; j++) {
				if (this.jsonQuestions[j].typ_pytania == "range") {
					sliderObjectsList.push(this.jsonQuestions[j]);
				}
			}
			sliderValue.innerHTML =
				sliderObjectsList[i][`mozliwe_odpowiedzi_${lang}`].split(";")[
					inputObject.value - 1
				];
			sliderDescribe.innerHTML =
				sliderObjectsList[i][`range_${lang}_opis`].split(";")[inputObject.value - 1];

			const ANSWERS = JSON.parse(sessionStorage.getItem("answersE"));

			if (ANSWERS) {
				if (ANSWERS[inputObjectId] != null) {
					inputObject.value = ANSWERS[inputObjectId];
				}
			}
			//-------------------------------------

			inputSliders[i].addEventListener("input", () => {
				const sliderDescribe =
					inputSliders[i].querySelector(".slider-describe");

				sliderValue.value = inputObject.value;
				const sliderObjectsList = [];

				for (let j = 0; j < Object.keys(this.jsonQuestions).length; j++) {
					if (this.jsonQuestions[j].typ_pytania == "range") {
						sliderObjectsList.push(this.jsonQuestions[j]);
					}
				}

				sliderValue.innerHTML =
					sliderObjectsList[i][`mozliwe_odpowiedzi_${lang}`].split(";")[
						inputObject.value - 1
					];
				sliderDescribe.innerHTML =
					sliderObjectsList[i][`range_${lang}_opis`].split(";")[inputObject.value - 1];

				// update paska progressu:
				this.updateProgressSlider(inputObject);

				// answers[inputObjectId - 1].answer = parseInt(inputObject.value, 10);
				answersE[inputObjectId] = parseInt(inputObject.value, 10);

				this.isFull();
				this.saveDataInSession();
			});

			// answers[inputObjectId - 1].answer = parseInt(inputObject.value, 10);
			answersE[inputObjectId] = parseInt(inputObject.value, 10);
		}
	}

	drawSliderPercent(question) {
		let header = "";
		let subQuestion = "";

		if (this.isFirstQuestionOnPage(question)) {
			header += `<h3 class="main-question-slider-percent"> ${question[`pytanie_${lang}`]} </h3> `;
		} else {
			header = "";
		}

		if (question.pytanie_pomocnicze_pl != null) {
			subQuestion += `<p><b>${question[`pytanie_pomocnicze_${lang}`]}</b></p>`;
		}

		return `<div class="form-object slider-percent-object ${this.getLastObjectClassOnPage(
			question
		)} ${question.etykieta}">  
                    ${header}
                    <p><b>${subQuestion}</b></p>
                    <p class="slider-percent-value">50%</p>
                    <input id="${
											question.etykieta
										}" type="range" min="0" max="100" class="input-object slider"> 
                    
                </div>`;
	}

	updateSliderPercent() {
		const inputSlidersPercent = document.querySelectorAll(
			".slider-percent-object"
		);

		for (let i = 0; i < Object.keys(inputSlidersPercent).length; i++) {
			const inputObject = inputSlidersPercent[i].querySelector(".input-object");
			const inputObjectId = inputObject.id;
			const sliderValue = inputSlidersPercent[i].querySelector(
				".slider-percent-value"
			);

			const ANSWERS = JSON.parse(sessionStorage.getItem("answersE"));
			sliderValue.innerHTML = `${inputObject.value}%`;

			if (ANSWERS) {
				if (ANSWERS[inputObjectId] != null) {
					inputObject.value = ANSWERS[inputObjectId] * 100;
				}
			}

			this.updateProgressSlider(inputObject);


			inputSlidersPercent[i].addEventListener("input", () => {
				const sliderValue = inputSlidersPercent[i].querySelector(
					".slider-percent-value"
				);

				sliderValue.value = inputObject.value;
			

				sliderValue.innerHTML = `${inputObject.value}%`;

				this.isFull();
				answersE[inputObjectId] = parseInt(inputObject.value, 10) / 100;

				this.saveDataInSession();

				// update paska progressu:
				this.updateProgressSlider(inputObject);
			});

			// answers[inputObjectId - 1].answer = parseInt(inputObject.value, 10) / 100;
			answersE[inputObjectId] = parseInt(inputObject.value, 10) / 100;
		}
	}

	isFirstQuestionOnPage(question) {
		let listOfquestionsOnPage = this.getListQuestionstOnPage(question.page);
		if (listOfquestionsOnPage[0] == question) return true;
		else return false;
	}

	isLastQuestionOnPage(question) {
		let listOfquestionsOnPage = this.getListQuestionstOnPage(question.page);
		if (listOfquestionsOnPage[listOfquestionsOnPage.length - 1] == question)
			return true;
		else return false;
	}

	getListQuestionstOnPage(page) {
		let listQuestionsOnPage = [];
		for (let i = 0; i < this.numberOfQuestions; i++) {
			if (this.jsonQuestions[i].page == page) {
				listQuestionsOnPage.push(this.jsonQuestions[i]);
			}
		}
		return listQuestionsOnPage;
	}

	saveDataInSession() {
		sessionStorage.setItem("answersE", JSON.stringify(answersE));
	}


	updateProgressSlider(input_object){
		// update paska progressu:
		const maxValue = input_object.max;
		const minValue = input_object.min;
		const difference = maxValue - minValue;
		const percentProgress =
			(100 / difference) * parseInt(input_object.value, 10) -
			100 / difference;

			input_object.style.background = `linear-gradient(90deg, var(--rangeColor) ${percentProgress}%, rgb(223, 223, 223) ${percentProgress}%)`;
	}
}
