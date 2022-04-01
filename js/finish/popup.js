const popupBackground = document.querySelector(".popup-background");
const btnX = document.querySelector(".btn-x-img");
const popup = document.querySelector(".popup");

window.setTimeout("showPopUp()", 2000);

btnX.addEventListener("click", () => {
	hidePopUp();
});

const btnTip = document.querySelector(".btn-tip");
btnTip.addEventListener("click", () => {
	showPopUp();
});

function showPopUp() {
	popupBackground.style.display = "flex";
}
function hidePopUp() {
	popupBackground.style.display = "none";
}

// zawartość POP-UP
let nameOfVariables = {JEDZENIE:"Jedzenie","ENERGIA DOMU":"Energia domu", "TRANSPORT":"Transport", "CZAS WOLNY":"Czas wolny", KONSUMPCJA:"Konsumpcja", ODPADY:"Odpady"};

let innerPopUp = '<h4>Rekomendacje</h4><p>Sprawdź co możesz zrobić dla planety</p>';

if (lang == "ang") {
	nameOfVariables = {JEDZENIE:"Food","ENERGIA DOMU":"Household Energy", "TRANSPORT":"Transport", "CZAS WOLNY":"Free time", KONSUMPCJA:"Consumption", ODPADY:"Waste"};
	innerPopUp = '<h4>Recommendations</h4><p>lorem ipsum</p>';
}



// 3 najbardziej emisyjne aktywności
// let theBiggest = getBiggest(detailsList,6);
// if (TRANSPORT == 0){
// 	theBiggest = getBiggest(detailsList,5);
// }



let theBiggestSum = 0;

//----buttony----
buttons = [];
theBiggest.forEach(element => {
	fixed = Number.parseFloat(detailsList[element]).toFixed(2)
	buttons.push(`${nameOfVariables[element]} - ${fixed}t`) ;
	theBiggestSum += detailsList[element];
});

const accordionStart = `<div class="accordion"></div>`;

//---------------

theBiggestSum = theBiggestSum;

let theBiggestPercent = 100*theBiggestSum/SUMA;
theBiggestPercent = Number.parseFloat(theBiggestPercent).toFixed(1);


innerPopUp += accordionStart;

// żarówka
innerPopUp += '<img src="img/path869.png" alt="">';
popup.innerHTML = innerPopUp;

const accordion = document.querySelector(".accordion");
getAccordion(accordion);

// _______________________FUNCTIONS__________________________

