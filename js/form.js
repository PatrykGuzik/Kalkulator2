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
		if (answers[4].answer > 0) {
			pages[4] = true;
		} else {
			pages[4] = false;
		}
	}

	drawInputText(question) {
		let header = "";

		if (this.isFirstQuestionOnPage(question)) {
			header += `<h3 class="main-question-text"> ${question.pytanie_pl} </h3> `;
		} else {
			header = "";
		}

		return `<div class="form-object input-text-object">  
                    <p>${header}</p>
                    <p>${question.pytanie_pomocnicze_pl}</p> 
                    <input id="${question.id}" type="text" class="input-object"> 
					<p class="validate-input"> wpisz liczbę większą lub równą 0 </p>
                </div>`;
	}

	updateInputText() {
		const inputText = document.querySelectorAll(".input-text-object");

		for (let i = 0; i < Object.keys(inputText).length; i++) {
			inputText[i].addEventListener("input", () => {
				const inputObject = inputText[i].querySelector(".input-object");
				const inputObjectId = inputObject.id;
				const inputTextValue = parseInt(inputObject.value, 10);

				if (Number.isInteger(inputTextValue) && inputTextValue >= 0) {
					answers[inputObjectId - 1].answer = inputTextValue;
				} else {
					answers[inputObjectId - 1].answer = null;
				}

				this.isFull();
				inputText[i].querySelector(".validate-input").style.display = "none";
			});
		}
	}

	drawRadio(question) {
		let subQuestions = "";
		let numberOfSubQuestions = Object.keys(
			question.mozliwe_odpowiedzi_pl.split(";")
		).length;

		for (let j = 0; j < numberOfSubQuestions; j++) {
			let subQuestion = question.mozliwe_odpowiedzi_pl.split(";")[j];
			subQuestions += `<label style="display:block"> 
                <input id="${question.id}" type="radio" name="r${question.id}" class="input-object">  ${subQuestion}
            </label>`;
		}
		return `<div class="form-object radio-object">  
                    <h3>${question.pytanie_pl}</h3> 
                    ${subQuestions}
					<p class="validate-radio"> Zaznacz jedną odpowiedź </p>
                </div>`;
	}

	updateRadio() {
		const inputRadio = document.querySelectorAll(".radio-object");

		for (let i = 0; i < Object.keys(inputRadio).length; i++) {
			inputRadio[i].addEventListener("input", () => {
				const inputValues = [];
				const inputObject = inputRadio[i].querySelector(".input-object");
				const nameObject = inputObject.name;
				const inputObjectId = inputObject.id;
				const values = document.getElementsByName(nameObject);
				let inputRadioValue = 0;

				values.forEach(element => {
					inputValues.push(element.checked);
				});

				for (let i = 0; i < inputValues.length; i++) {
					if (inputValues[i]) {
						inputRadioValue = i + 1;
					}
				}

				answers[inputObjectId - 1].answer = inputRadioValue;

				this.isFull();
				inputRadio[i].querySelector(".validate-radio").style.display = "none";
			});
		}
	}

	validateForms() {
		const formObject = document.querySelectorAll(".form-object");
		const formsOnPage = this._getFormsOnPage();
		const answersOnPage = this._getAnswersOnPage(formsOnPage);

		for (let i = 0; i < formsOnPage.length; i++) {
			if (answersOnPage[i] == null) {
				if (formObject[formsOnPage[i] - 1].classList.contains("radio-object")) {
					formObject[formsOnPage[i] - 1].querySelector(
						".validate-radio"
					).style.display = "block";
				}
				if (
					formObject[formsOnPage[i] - 1].classList.contains("input-text-object")
				) {
					formObject[formsOnPage[i] - 1].querySelector(
						".validate-input"
					).style.display = "block";
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
				formsOnPage.push(parseInt(inputObjectId, 10));
			}
		});
		return formsOnPage;
	}

	_getAnswersOnPage(formsOnPage) {
		const answersOnPage = [];
		for (let i = 0; i < formsOnPage.length; i++) {
			answers.forEach(element => {
				if (element.id == formsOnPage[i]) {
					answersOnPage.push(element.answer);
				}
			});
		}
		return answersOnPage;
	}

	drawCheckbox(question) {
		let subQuestions = "";
		let numberOfSubQuestions = Object.keys(
			question.mozliwe_odpowiedzi_pl.split(";")
		).length;

		for (let j = 0; j < numberOfSubQuestions; j++) {
			let subQuestion = question.mozliwe_odpowiedzi_pl.split(";")[j];
			subQuestions += `<label style="display:block"> 
                <input id="${question.id}" type="checkbox" name="c${question.id}" class="input-object">  ${subQuestion}
            </label>`;
		}
		return `<div class="form-object checkbox-object">  
                    <h3>${question.pytanie_pl}</h3> 
                    ${subQuestions}
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

			values.forEach(element => {
				inputValues.push(element.checked);
			});

			answers[inputObjectId - 1].answer = inputValues;

			inputCheckbox[i].addEventListener("input", () => {
				const inputValues = [];
				values.forEach(element => {
					inputValues.push(element.checked);
				});

				answers[inputObjectId - 1].answer = inputValues;

				this.isFull();
			});
		}
	}

	drawSlider(question) {
		let header = "";
		let subQuestion = "";
		let subQuestions = [];
		let describes = [];

		if (this.isFirstQuestionOnPage(question)) {
			header += `<h3 class="main-question-slider"> ${question.pytanie_pl} </h3> `;
		} else {
			header = "";
		}

		let numberOfSubQuestions = Object.keys(
			question.mozliwe_odpowiedzi_pl.split(";")
		).length;
		for (let j = 0; j < numberOfSubQuestions; j++) {
			let subQuestion = question.mozliwe_odpowiedzi_pl.split(";")[j];
			let describe = question.range_pl_opis.split(";")[j];
			subQuestions.push(subQuestion);
			describes.push(describe);
		}

		if (question.pytanie_pomocnicze_pl != null) {
			subQuestion += `<p><b>${question.pytanie_pomocnicze_pl}</b></p>`;
		}

		const middleValue = Number.parseInt(numberOfSubQuestions / 2);

		return `<div class="form-object slider-object">  
                    ${header}
                    ${subQuestion}
                    <p class="slider-value">${subQuestions[middleValue]}</p>
                    <input id="${question.id}" type="range" min="1" max="${numberOfSubQuestions}" class="input-object slider"> 
                    <p class="slider-describe">${describes[middleValue]}</p>
                </div>`;
	}

	updateSlider() {
		const inputSliders = document.querySelectorAll(".slider-object");

		for (let i = 0; i < Object.keys(inputSliders).length; i++) {
			const inputObject = inputSliders[i].querySelector(".input-object");
			const sliderValue = inputSliders[i].querySelector(".slider-value");
			const inputObjectId = inputObject.id;

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
					sliderObjectsList[i].mozliwe_odpowiedzi_pl.split(";")[
						inputObject.value - 1
					];
				sliderDescribe.innerHTML =
					sliderObjectsList[i].range_pl_opis.split(";")[inputObject.value - 1];

				answers[inputObjectId - 1].answer = parseInt(inputObject.value, 10);

				this.isFull();
			});

			answers[inputObjectId - 1].answer = parseInt(inputObject.value, 10);
		}
	}

	drawSliderPercent(question) {
		let header = "";

		if (this.isFirstQuestionOnPage(question)) {
			header += `<h3 class="main-question-slider-percent"> ${question.pytanie_pl} </h3> `;
		} else {
			header = "";
		}

		return `<div class="form-object slider-percent-object">  
                    ${header}
                    <p><b>${question.pytanie_pomocnicze_pl}</b></p>
                    <p class="slider-percent-value">50%</p>
                    <input id="${question.id}" type="range" min="0" max="100" class="input-object slider"> 
                    
                </div>`;
	}

	updateSliderPercent() {
		const inputSlidersPercent = document.querySelectorAll(
			".slider-percent-object"
		);

		for (let i = 0; i < Object.keys(inputSlidersPercent).length; i++) {
			const inputObject = inputSlidersPercent[i].querySelector(".input-object");
			const inputObjectId = inputObject.id;

			inputSlidersPercent[i].addEventListener("input", () => {
				const sliderValue = inputSlidersPercent[i].querySelector(
					".slider-percent-value"
				);

				sliderValue.value = inputObject.value;

				sliderValue.innerHTML = `${inputObject.value}%`;

				this.isFull();
			});
			answers[inputObjectId - 1].answer = parseInt(inputObject.value, 10) / 100;
		}
	}

	isFirstQuestionOnPage(questionSlider) {
		let listOfquestionsOnPage = this.getListQuestionstOnPage(
			questionSlider.page
		);
		if (listOfquestionsOnPage[0] == questionSlider) return true;
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
}
