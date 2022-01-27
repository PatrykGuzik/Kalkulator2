let page = 1;
let pages = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true };
let answers = [];
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

			console.log(skip);
			page += skip;
		}
	}

	function changePageLeft() {
		if (pages[page - 1] == true) {
			page -= 1;
		} else {
			skip = 1;
			let i = 1;
			while (pages[page - i] == false) {
				skip++;
				i--;
			}

			console.log(skip);
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
	});

	// PRZYCISK TYMCZASOWY
	const bntTemp = document.querySelector(".btn-tmp");
	bntTemp.addEventListener("click", () => {
		console.log(answers);
		updateView();
	});
}

//---------------------------------------------------------------------------------

// tworzenie instancji
// const form = new Form(json_tmp, ".form-box");
// form.drawInputsByType();
// form.updateAndValidateInputs();

// const info = new Info(info_tmp, ".info-box");
// info.drawInfo();

// const all_form_objects = document.querySelectorAll(".form-object");
// const all_info_objects = document.querySelectorAll(".info-object");

// wyświetlanie Inputów
// function showAndHiddenInput() {
// 	for (let i = 0; i < json_tmp.length; i++) {
// 		if (json_tmp[i].page == page) {
// 			all_form_objects[i].style.display = "block";
// 		} else {
// 			all_form_objects[i].style.display = "none";
// 		}
// 	}
// }

// function showAndHiddenInfo() {
// 	for (let i = 0; i < info_tmp.length; i++) {
// 		if (info_tmp[i].page == page) {
// 			all_info_objects[i].style.display = "block";
// 		} else {
// 			all_info_objects[i].style.display = "none";
// 		}
// 	}
// }

const categoryName = document.querySelector(".category-name");

function updateCategoryName(json) {
	for (let i = 0; i < json.length; i++) {
		if (json[i].page == page) {
			categoryName.innerHTML = json[i].kategoria
				.toUpperCase()
				.replace("_", " ");
			break;
		}
	}
}


const pageNumber = document.querySelector(".page-number");
function updatePageNr(max){
	pageNumber.innerHTML = `${page}/${max}`;
}

// function updateView(){
// 	updateCategoryName();
// 	showAndHiddenInfo();
// 	showAndHiddenInput();
// 	// getNumbersOfQuestionsOnPage();
// }

// PRZYCISK TYMCZASOWY
// const bntTemp = document.querySelector(".btn-tmp");
// bntTemp.addEventListener("click", () => {
// 	console.log(answers);
// 	console.log(test);
// 	info_tmp = test;
// });

// updateView()
// const bntLeft = document.querySelector(".btn-left");
// const bntRight = document.querySelector(".btn-right");
// bntLeft.addEventListener("click", () => {
// 	if (page > 1) {
// 		page -= 1;
// 		updateView()
// 	}
// });

// bntRight.addEventListener("click", () => {
// 	if (page < numbersOfPages) {
// 		page += 1;
// 		updateView()
// 	}
// });

// Numery pytań

function getNumbersOfQuestionsOnPage() {
	let numbers = [];
	const formObject = document.querySelectorAll(".form-object");
	formObject.forEach(element => {
		let inputObjectId = element.querySelector(".input-object");

		if (element.style.display != "none") {
			numbers.push(parseInt(inputObjectId.id, 10));
		}
		// console.log(element.style.display);
		// console.log(inputObjectId.id);
	});

	console.log(numbers);
}
