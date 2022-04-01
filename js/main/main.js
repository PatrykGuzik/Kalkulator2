//przekierowanie:
if (!sessionStorage.getItem("code")) {
	location.href="index.html";
}
if (sessionStorage.getItem("isFinish") == "true") {
	location.href="index.html";
}


let page = 1;
if(sessionStorage.getItem("page")){
	page = JSON.parse(sessionStorage.getItem("page"));
}
let pages = {};
let answers = [];
let answersE = {};
let calc_answers = [];
let isValidate = true;
let showInfo = false;
// LANGUAGE: pl / ang / ...
let lang = sessionStorage.getItem("lang");

let numbersQuestionsForCounter = {};

let nrQuestionsInCategory = {};

const bntLeft = document.querySelector(".btn-left");
const bntRight = document.querySelector(".btn-right");
const btnNext = document.querySelector(".btn-next");

//Loading---------------------------------------------------------------------------
const loader = document.querySelector(".loading");

function displayLoading() {
	loader.classList.add("display");

	setTimeout(() => {
		loader.classList.remove("display");
	}, 60000);
}

function hideLoading() {
	loader.classList.remove("display");
}

//Fetch ---------------------------------------------------------------------------------------------------

displayLoading();

fetch(`${serverLink}/api/questions/?format=json`,{
	headers: {
		'Authorization': apiKey
		}
})
	.then(response => response.json())
	.then(data => drawForms(data));

function DrawInfo(d) {
	info = new Info(d, ".info-box");
	info.drawInfo();

	const allFormObjects = document.querySelectorAll(".form-object");
	const infoBox = document.querySelector(".info-box");
	for (let i = 0; i < Object.keys(allFormObjects).length; i++) {
		allFormObjects[i].addEventListener("input", () => {
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
	setTimeout(() => {
		hideLoading();
	}, 0);


	let numbersOfQuestions = Object.keys(d).length;
	//TODO: zmienić sposób ustalania ostatniej strony
	let numbersOfPages = d[numbersOfQuestions - 1].page;

	nrQuestionsInCategory = getNrQuestionsInCategory(d);

	makePlaceForAnswers(d);

	if(sessionStorage.getItem("answersE")){
		answersE = JSON.parse(sessionStorage.getItem("answersE"));
	}



	makePagesNrForView(numbersOfPages);

	form = new Form(d, ".form-box");
	form.drawInputsByType();
	form.updateAndValidateInputs();

	// tymczasowe-------------------------
	setNumbersQuestionsForCounter();
	// getNumbersQuestionsOnPage(d);
	//-------------------------------------

	const all_form_objects = document.querySelectorAll(".form-object");

	updateView(form, d, all_form_objects, numbersOfPages);

	bntLeft.addEventListener("click", () => {
		if (page > 1) {
			changePageIfIsValidateLeft(form ,d, all_form_objects, numbersOfPages);
			sessionStorage.setItem("page", JSON.stringify(page));
		}
	});

	bntRight.addEventListener("click", () => {
		if (page < numbersOfPages) {
			changePageIfIsValidateRight(form, d, all_form_objects, numbersOfPages);
			sessionStorage.setItem("page", JSON.stringify(page));
		} else {
			updateView(form, d, all_form_objects, numbersOfPages);
			getCalcValues();
			
			// location.href = "finish.html"; przeniesione do save.js
		
			
			
		}
	});

	btnNext.addEventListener("click", () => {
		if (page < numbersOfPages) {
			changePageIfIsValidateRight(form, d, all_form_objects, numbersOfPages);
			sessionStorage.setItem("page", JSON.stringify(page));
		} else {
			updateView(form, d, all_form_objects, numbersOfPages);
			getCalcValues();
			// location.href = "finish.html";
			
		}
	});

	// PRZYCISK TYMCZASOWY
	// const bntTemp = document.querySelector(".btn-tmp");
	// bntTemp.addEventListener("click", () => {
	// 	if (page) {
	// 		updateView(form, d, all_form_objects, numbersOfPages);
	// 		getCalcValues();
	// 		console.log("wysłane");
	// 	}
	// 	// getNrQuestionsInCategory(d);
	// });




	fetch(`${serverLink}/api/informations/?format=json`,{
		headers: {
			'Authorization': apiKey
			}
	})
	.then(response => response.json())
	.then(data => DrawInfo(data));
}

//---------------------------------------------------------------------------------

// przygotowanie miejsca na odpowiedzi
function makePlaceForAnswers(data) {
	for (let i = 0; i < Object.keys(data).length; i++) {
		answersE[data[i].etykieta] = null;
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

function changePageIfIsValidateRight(
	form,
	formDate,
	inputs,
	numbersOfPages
) {
	if (isValidate) {
		form.updateConditionalQuestions();
		changePageRight();
		updateView(form, formDate, inputs, numbersOfPages);
	} else {
		form.validateForms();
	}
}

function changePageIfIsValidateLeft(
	form,
	formDate,
	inputs,
	numbersOfPages
) {
	form.updateConditionalQuestions();
	changePageLeft();
	updateView(form, formDate, inputs, numbersOfPages);
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

function showInfoTest(infoDate){
	const all_info_objects = document.querySelectorAll(".info-object");
	for (let i = 0; i < infoDate.length; i++) {
		all_info_objects[i].style.display = "block";
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
const counters = categoryName.querySelectorAll(".counter");

function updateCategoryName(json) {
	for (let i = 0; i < json.length; i++) {
		if (json[i].page == page) {
			switch (json[i].kategoria) {
				case "metryczka":
					changeColorCat(0);
					setStyleTransport();
					setNrQuestionInCat("metryczka");
					setQuestionNumber(page);
					break;

				case "transport":
					changeColorCat(1);
					setStyleTransport();
					setNrQuestionInCat("transport");
					setQuestionNumber(page);
					break;

				case "energia_domu":
					changeColorCat(2);
					setStyleHomeEnergy();
					setNrQuestionInCat("energia_domu");
					setQuestionNumber(page);
					break;

				case "odpady":
					changeColorCat(3);
					setStyleWaste();
					setNrQuestionInCat("odpady");
					setQuestionNumber(page);
					break;

				case "jedzenie":
					changeColorCat(4);
					setStyleFood();
					setNrQuestionInCat("jedzenie");
					setQuestionNumber(page);
					break;

				case "czas_wolny":
					changeColorCat(5);
					setStyleFreeTime();
					setNrQuestionInCat("czas_wolny");
					setQuestionNumber(page);
					break;

				case "konsumpcja":
					changeColorCat(6);
					setStyleConsumption();
					setNrQuestionInCat("konsumpcja");
					setQuestionNumber(page);
					break;

				default:
					break;
			}
		}
	}
}

function changeColorCat(nrOfCategory) {
	categories[nrOfCategory].classList.add("active-cat");
	counters[nrOfCategory].classList.add("active-counter");

	for (let i = 0; i < categories.length; i++) {
		if (i == nrOfCategory) {
			continue;
		}
		if (categories[i].classList.contains("active-cat")) {
			categories[i].classList.remove("active-cat");
			counters[i].classList.remove("active-counter");
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
	});

	console.log(numbers);
}

const questionInCat = document.querySelectorAll(".q-in-cat");
function setNrQuestionInCat(category) {
	questionInCat.forEach(element => {
		element.innerHTML = nrQuestionsInCategory[category];
	});
}

function setNumbersQuestionsForCounter() {
	local_pages = 1;
	for (let i = 0; i < Object.keys(nrQuestionsInCategory).length; i++) {
		for (let j = 0; j < Object.values(nrQuestionsInCategory)[i]; j++) {
			// console.log(local_pages + "---" + (j+1) + "---" + Object.keys(nrQuestionsInCategory)[i]);
			numbersQuestionsForCounter[local_pages] = j + 1;

			local_pages += 1;
		}
	}
}

let numbersQuestionsOnPage = {};
function getNrQuestionsInCategory(data) {
	a = [];
	b = [];
	nrQuestionsInCategory = {
		metryczka: 0,
		transport: 0,
		energia_domu: 0,
		odpady: 0,
		jedzenie: 0,
		czas_wolny: 0,
		konsumpcja: 0,
	};

	for (let i = 0; i < Object.keys(data).length; i++) {
		console.log();
		if (!a.includes(data[i].page + data[i].kategoria)) {
			a.push(data[i].page + data[i].kategoria);
			b.push(data[i].kategoria);
		}
	}

	for (let i = 0; i < b.length; i++) {
		switch (b[i]) {
			case "metryczka":
				nrQuestionsInCategory["metryczka"] += 1;
				break;
			case "transport":
				nrQuestionsInCategory["transport"] += 1;
				break;
			case "energia_domu":
				nrQuestionsInCategory["energia_domu"] += 1;
				break;
			case "odpady":
				nrQuestionsInCategory["odpady"] += 1;
				break;
			case "jedzenie":
				nrQuestionsInCategory["jedzenie"] += 1;
				break;
			case "czas_wolny":
				nrQuestionsInCategory["czas_wolny"] += 1;
				break;
			case "konsumpcja":
				nrQuestionsInCategory["konsumpcja"] += 1;
				break;
			default:
				break;
		}
	}

	return nrQuestionsInCategory;
}

const questionNumber = document.querySelectorAll(".q-nr");
function setQuestionNumber(page) {
	questionNumber.forEach(element => {
		element.innerHTML = numbersQuestionsForCounter[page];
	});
}
