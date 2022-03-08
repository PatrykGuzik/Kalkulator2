const popupBackground = document.querySelector(".popup-background");
const btnX = document.querySelector(".btn-x-img");
const popup = document.querySelector(".popup");

// window.setTimeout("showPopUp()", 2000);

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
const nameOfVariables = {JEDZENIE:"Jedzenie","ENERGIA DOMU":"Energia domu", "TRANSPORT":"Transport", "CZAS WOLNY":"Czas wolny", KONSUMPCJA:"Konsumpcja", ODPADY:"Odpady"};

let innerPopUp = '<h4>Lorem ipsum</h4>';

// 3 najbardziej emisyjne aktywności
// let theBiggest = getBiggest(detailsList,6);
// if (TRANSPORT == 0){
// 	theBiggest = getBiggest(detailsList,5);
// }

console.log(theBiggest);

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

innerPopUp += `<p>dolor mit amet</p>`;
innerPopUp += accordionStart;

// żarówka
innerPopUp += '<img src="img/path869.png" alt="">';
popup.innerHTML = innerPopUp;

const accordion = document.querySelector(".accordion");
getAccordion(accordion);

// _______________________FUNCTIONS__________________________

// function getBiggest(obj, count){
// 	jsonObj = Object.assign({}, obj);
// 	theBiggests = [];
	
// 	for(let i=0; i<count ;i++){
// 	  let theBiggest = 0;
// 	  let theBiggestName = '';
	  
// 	  for(let i=0; i< Object.keys(jsonObj).length ;i++){
// 		if (jsonObj[Object.keys(jsonObj)[i]] > theBiggest){
// 		theBiggest = jsonObj[Object.keys(jsonObj)[i]];
// 		theBiggestName = Object.keys(jsonObj)[i];
// 		};
// 	  }
// 	  delete jsonObj[theBiggestName];
// 	  theBiggests.push(theBiggestName)
// 	}
	
// 	return theBiggests;
//   }