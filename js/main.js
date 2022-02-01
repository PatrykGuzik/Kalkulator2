let page = 1;
let pages = {};
let answers = [];
let calc_answers = [];
let isValidate = true;

const bntLeft = document.querySelector(".btn-left");
const bntRight = document.querySelector(".btn-right");

// TEST Fetch ---------------------------------------------------------------------------------------------------
fetch("http://127.0.0.1:8000/api/questions/?format=json")
	.then(response => response.json())
	.then(data => form(data));

fetch("http://127.0.0.1:8000/api/informations/?format=json")
	.then(response => response.json())
	.then(data => info(data));

function info(d) {
	info = new Info(d, ".info-box");
	info.drawInfo();

	const all_info_objects = document.querySelectorAll(".info-object");

	function showAndHiddenInfo() {
		for (let i = 0; i < d.length; i++) {
			if (d[i].page == page) {
				all_info_objects[i].style.display = "block";
			} else {
				all_info_objects[i].style.display = "none";
			}
		}
	}

	showAndHiddenInfo();

	function updateView() {
		showAndHiddenInfo();
	}

	bntLeft.addEventListener("click", () => {
		updateView();
	});

	bntRight.addEventListener("click", () => {
		updateView();
	});
}

function form(d) {
	let numbersOfQuestions = Object.keys(d).length;
	let numbersOfPages = d[numbersOfQuestions - 1].page;

	// przygotowanie miejsca na odpowiedzi
	for (let i = 1; i < numbersOfQuestions + 1; i++) {
		answers.push({ id: i, answer: null });
	}

	// przygotowanie stron do wyświetlenia
	for (let i = 1; i < numbersOfPages + 1; i++) {
		pages[i] = true;
	}

	form = new Form(d, ".form-box");
	form.drawInputsByType();
	form.updateAndValidateInputs();

	const all_form_objects = document.querySelectorAll(".form-object");

	function showAndHiddenInput() {
		for (let i = 0; i < d.length; i++) {
			if (d[i].page == page) {
				all_form_objects[i].style.display = "block";
			} else {
				all_form_objects[i].style.display = "none";
			}
		}
	}

	function updateView() {
		form.updateAndValidateInputs();
		showAndHiddenInput();
		updateCategoryName(d);
		form.isFull();
		updatePageNr(numbersOfPages);
	}

	updateView();

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

	bntLeft.addEventListener("click", () => {
		if (page > 1) {
			if (isValidate) {
				form.updateConditionalQuestions();
				changePageLeft();
				updateView();
			} else {
				form.validateForms();
			}
		}
	});

	bntRight.addEventListener("click", () => {
		if (page < numbersOfPages) {
			if (isValidate) {
				form.updateConditionalQuestions();
				changePageRight();
				updateView();
			} else {
				form.validateForms();
			}
		}

		// if (page > numbersOfPages) {
		// 	updateView(); // update View jest konieczne do zapisu
		// 	getCalcValues();
		// 	window.location.href = "finish.html";
		// 	console.log(page);
		// }
	});

	// PRZYCISK TYMCZASOWY
	const bntTemp = document.querySelector(".btn-tmp");
	bntTemp.addEventListener("click", () => {
		if (page == numbersOfPages) {
			updateView();
			getCalcValues();
			console.log("wysłane");
		}
	});
}

//---------------------------------------------------------------------------------

const categoryName = document.querySelector(".category-name");

const categories = categoryName.querySelectorAll("li");
console.log(categories);

function updateCategoryName(json) {
	for (let i = 0; i < json.length; i++) {
		if (json[i].page == page) {
			switch (json[i].kategoria) {
				case "metryczka":
					changeColorCat(0)
					break;

				case "transport":
					changeColorCat(1)
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

