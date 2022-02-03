let page = 1;
let pages = {};
let answers = [];
let calc_answers = [];
let isValidate = true;
let showInfo = false;

const bntLeft = document.querySelector(".btn-left");
const bntRight = document.querySelector(".btn-right");
const btnNext = document.querySelector(".btn-next");

//Fetch ---------------------------------------------------------------------------------------------------
fetch("http://127.0.0.1:8000/api/questions/?format=json")
	.then(response => response.json())
	.then(data => drawForms(data));

fetch("http://127.0.0.1:8000/api/informations/?format=json")
	.then(response => response.json())
	.then(data => DrawInfo(data));

function DrawInfo(d) {
	info = new Info(d, ".info-box");
	info.drawInfo();

	const allFormObjects = document.querySelectorAll(".form-object");
	const infoBox = document.querySelector(".info-box");
	for (let i = 0; i < Object.keys(allFormObjects).length; i++) {
		allFormObjects[i].addEventListener("input", () => {
			console.log("lol");
			showAndHiddenInfo(d);
			infoBox.style.opacity = "1";
		});
	}

	bntLeft.addEventListener("click", () => {
		hiddenInfo(d);
		infoBox.style.opacity = "0";
	});

	bntRight.addEventListener("click", () => {
		hiddenInfo(d);
		infoBox.style.opacity = "0";
	});

	btnNext.addEventListener("click", () => {
		hiddenInfo(d);
		infoBox.style.opacity = "0";
	});
}

function drawForms(d) {
	let numbersOfQuestions = Object.keys(d).length;
	let numbersOfPages = d[numbersOfQuestions - 1].page;

	makePlaceForAnswers(numbersOfQuestions);
	makePagesNrForView(numbersOfPages);

	form = new Form(d, ".form-box");
	form.drawInputsByType();
	form.updateAndValidateInputs();

	const all_form_objects = document.querySelectorAll(".form-object");

	updateView(form, d, all_form_objects, numbersOfPages);

	bntLeft.addEventListener("click", () => {
		if (page > 1) {
			changePageIfIsValidate(form, false, d, all_form_objects, numbersOfPages);
		}
	});

	bntRight.addEventListener("click", () => {
		if (page < numbersOfPages) {
			changePageIfIsValidate(form, true, d, all_form_objects, numbersOfPages);
		}
	});

	btnNext.addEventListener("click", () => {
		if (page < numbersOfPages) {
			changePageIfIsValidate(form, true, d, all_form_objects, numbersOfPages);
		}
	});

	// PRZYCISK TYMCZASOWY
	const bntTemp = document.querySelector(".btn-tmp");
	bntTemp.addEventListener("click", () => {
		if (page == numbersOfPages) {
			updateView(form, d, all_form_objects, numbersOfPages);
			getCalcValues();
			console.log("wysłane");
		}
	});
}

//---------------------------------------------------------------------------------

// przygotowanie miejsca na odpowiedzi
function makePlaceForAnswers(numbersOfQuestions) {
	for (let i = 1; i < numbersOfQuestions + 1; i++) {
		answers.push({ id: i, answer: null });
	}
}

// przygotowanie stron do wyświetlenia
function makePagesNrForView(numbersOfPages) {
	for (let i = 1; i < numbersOfPages + 1; i++) {
		pages[i] = true;
	}
}

// wyświetlanie odpowiednich inputów
function showAndHiddenInput(formDate, inputs) {
	for (let i = 0; i < formDate.length; i++) {
		if (formDate[i].page == page) {
			inputs[i].style.display = "block";
		} else {
			inputs[i].style.display = "none";
		}
	}
}

// zmiana strony z uwzględnieniem pytań warunkowych
function changePageRight() {
	if (pages[page + 1] == true) {
		page += 1;
	} else {
		skip = 1;
		let i = 1;
		while (pages[page + i] == false) {
			skip++;
			i++;
		}

		page += skip;
	}
}

function changePageLeft() {
	if (pages[page - 1] == true) {
		page -= 1;
	} else {
		skip = 1;
		let i = -1;
		while (pages[page + i] == false) {
			skip++;
			i--;
		}

		page -= skip;
	}
}

// odświeżanie
function updateView(form, formDate, inputs, numbersOfPages) {
	form.updateAndValidateInputs();
	showAndHiddenInput(formDate, inputs);
	updateCategoryName(formDate);
	form.isFull();
	// updatePageNr(numbersOfPages);
}

function changePageIfIsValidate(
	form,
	isRight,
	formDate,
	inputs,
	numbersOfPages
) {
	if (isValidate) {
		form.updateConditionalQuestions();
		if (isRight) changePageRight();
		else changePageLeft();

		updateView(form, formDate, inputs, numbersOfPages);
	} else {
		form.validateForms();
	}
}

// Info
function showAndHiddenInfo(infoDate) {
	const all_info_objects = document.querySelectorAll(".info-object");
	for (let i = 0; i < infoDate.length; i++) {
		if (infoDate[i].page == page) {
			all_info_objects[i].style.display = "block";
		} else {
			all_info_objects[i].style.display = "none";
		}
	}
}

function hiddenInfo(infoDate) {
	const all_info_objects = document.querySelectorAll(".info-object");
	for (let i = 0; i < infoDate.length; i++) {
		all_info_objects[i].style.display = "none";
	}
}
//-----------------------------------------------------------------------------------
const categoryName = document.querySelector(".category-name");

const categories = categoryName.querySelectorAll("li");

function updateCategoryName(json) {
	for (let i = 0; i < json.length; i++) {
		if (json[i].page == page) {
			switch (json[i].kategoria) {
				case "metryczka":
					changeColorCat(0);
					setStyleTransport();
					break;

				case "transport":
					changeColorCat(1);
					setStyleHomeEnergy();
					break;

				default:
					break;
			}
		}
	}
}

function changeColorCat(nrOfCategory) {
	categories[nrOfCategory].classList.add("active-cat");

	for (let i = 0; i < categories.length; i++) {
		if (i == nrOfCategory) {
			continue;
		}
		if (categories[i].classList.contains("active-cat")) {
			categories[i].classList.remove("active-cat");
		}
	}
}

const pageNumber = document.querySelector(".page-number");
function updatePageNr(max) {
	pageNumber.innerHTML = `${page}/${max}`;
}

function getNumbersOfQuestionsOnPage() {
	let numbers = [];
	const formObject = document.querySelectorAll(".form-object");
	formObject.forEach(element => {
		let inputObjectId = element.querySelector(".input-object");

		if (element.style.display != "none") {
			numbers.push(parseInt(inputObjectId.question_nr, 10));
		}
		// console.log(element.style.display);
		// console.log(inputObjectId.id);
	});

	console.log(numbers);
}
