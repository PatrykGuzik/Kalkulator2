// Przekierowanie
if (!sessionStorage.getItem("answers")) {
	location.href="start.html";
}
//Loading---------------------------------------------------------------------------
const loader = document.querySelector(".loading");

let chosenDetail = "null";

function displayLoading() {
	loader.classList.add("display");

	setTimeout(() => {
		loader.classList.remove("display");
	}, 60000);
}

function hideLoading() {

	setTimeout(() => {
		loader.classList.remove("display");
		drawStats();
		// window.setTimeout("showPopUp()", 2000);
	}, 0);
	
}

displayLoading();

// ----dane---
const SWIAT = 4.9;
const POLSKA = 8;
const KIRGISTAN = 13;
const SUDAN = 7.1;
const ROSJA = 10.5;
const USA = 14.2;
const CHINY = 7.4;
const MEKSYK = 2.7;

const ANSWERS = JSON.parse(sessionStorage.getItem("answers"));
const ANSWERSE = JSON.parse(sessionStorage.getItem("answersE"));
console.log(ANSWERSE);
// zmienic na const
let TRANSPORT = Number.parseFloat(sessionStorage.getItem("TRANSPORT") / 1000);
let ODPADY = Number.parseFloat(sessionStorage.getItem("ODPADY") / 1000);
let ENERGIA_DOMU = Number.parseFloat(
	sessionStorage.getItem("ENERGIA_DOMU") / 1000
);
let JEDZENIE = Number.parseFloat(sessionStorage.getItem("JEDZENIE") / 1000);
let CZAS_WOLNY = Number.parseFloat(sessionStorage.getItem("CZAS_WOLNY") / 1000);
let KONSUMPCJA = Number.parseFloat(sessionStorage.getItem("KONSUMPCJA") / 1000);

//Dev
// TRANSPORT = 3;
// ODPADY = 1.2;
// ENERGIA_DOMU = 0.3;
// JEDZENIE = 2.3;
// CZAS_WOLNY = 1.1
// KONSUMPCJA = 2.2;

const SUMA =
	TRANSPORT + ODPADY + ENERGIA_DOMU + JEDZENIE + CZAS_WOLNY + KONSUMPCJA;

const RED = "#FF3939";
const GREEN = "#5A9D55";
const YELLOW = "#FFAE34";

const detailsList = {
	TRANSPORT: TRANSPORT,
	ODPADY: ODPADY,
	"ENERGIA DOMU": ENERGIA_DOMU,
	JEDZENIE: JEDZENIE,
	"CZAS WOLNY": CZAS_WOLNY,
	KONSUMPCJA: KONSUMPCJA,
};



const statsList = {
	"Twój wynik": SUMA,
	Świat: SWIAT,
	Polska: POLSKA,
	Chiny: CHINY,
	USA: USA,
	Meksyk: MEKSYK,
};

const ratingGood = "Jest dobrze! Emitujesz mniej niż przeciętny Polak.";
const ratingMid = "No tak średnio bym powiedział.";
const ratingBad =
	"Jest bardzo źle! Emitujesz rocznie więcej CO2 niż statystyczny Polak.";

const rating = document.querySelector(".rating");

// ---------------------RATING--------------------

if (SUMA > POLSKA + 1) {
	rating.innerHTML = ratingBad;
	rating.style.backgroundColor = "rgba(255, 31, 31, 0.8)";
}
if (SUMA < POLSKA - 1) {
	rating.innerHTML = ratingGood;
	rating.style.backgroundColor = "rgba(77, 135, 72, 0.8)";
}
if (SUMA >= POLSKA - 1 && SUMA <= POLSKA + 1) {
	rating.innerHTML = ratingMid;
	rating.style.backgroundColor = "rgba(255, 200, 50, 0.8)";
}

//------------------------------STATYSTYKI------------------------------
function drawStats() {
	const statsWorld = document.querySelector(".stats-world");
	let statsWorldInner = "";

	for (let i = 0; i < Object.keys(statsList).length; i++) {
		value = Object.values(statsList)[i].toFixed(1);
		heightBar = value * 6;
		arrow = "";
		if (value > 30) {
			heightBar = 30 * 6;
			arrow = `<div class="arrow"></div>`;
		}
		describe = Object.keys(statsList)[i];
		barColor = changeBarColor(value);
		statsWorldInner += `<div class="result">
                            <div class="result-value">${value}t</div>
							${arrow}
                            <div class="result-bar" style="height:${heightBar}px; background-color:${barColor}"></div>
                            <div class="result-describe">${describe}</div>
                        </div>
                        `;
	}

	statsWorld.innerHTML = statsWorldInner;

	function changeBarColor(value) {
		if (value > POLSKA + 1) return RED;
		if (value < POLSKA - 1) return GREEN;
		if (value >= POLSKA - 1 && value <= POLSKA + 1) return YELLOW;
	}

	//---------------------------szczegóły-----------------------------
	const details = document.querySelector(".details");
	let detailsInner = "";

	for (let i = 0; i < Object.keys(detailsList).length; i++) {
		value = Object.values(detailsList)[i];
		percent = (value * 100) / SUMA;
		percentFixed = Number.parseFloat(percent).toFixed(1);
		describe = Object.keys(detailsList)[i];
		barColor = changeBarColor(value);
		detailsInner += `<div class="result">
                        <div class="result-value">${percentFixed}%</div>
                        <div class="result-bar" style="height:${
													percentFixed * 2
												}px"></div>
                        <div class="result-describe">${describe}</div>
                    </div>
                        `;
	}

	details.innerHTML = detailsInner;


// ______________CLICK STATS______________
	const results = details.querySelectorAll(".result")
	const mediaScroller = document.querySelector(".media-scroller");
	let activeResult = "null"


	results.forEach(element => {
		element.addEventListener("click",()=>{
			removeActiveClass()
			activeResult = element.querySelector(".result-describe").innerHTML

			hideNotActive()
			element.classList.add("result-active")
			chosenDetail = element.querySelector(".result-describe").innerHTML;
		})
	});

	function removeActiveClass(){
		results.forEach(element => {
			element.classList.remove("result-active")
		})
	}

	function hideNotActive(){
		hiddenAllElements()
		const infoElements = mediaScroller.querySelectorAll(".media-element")
		infoElements.forEach(element => {
			showElement(element, activeResult)
		});
		
	}

	function showElement(element, category){

		switch (category) {
			case "TRANSPORT":
				if (element.classList.contains("cat-transport")) {
					element.style.display = "block";
				}
				break;

			case "ODPADY":
				if (element.classList.contains("cat-odpady")) {
					element.style.display = "block";
				}
				break;

			case "ENERGIA DOMU":
				if (element.classList.contains("cat-energia_domu")) {
					element.style.display = "block";
				}
				break;

			case "JEDZENIE":
				if (element.classList.contains("cat-jedzenie")) {
					element.style.display = "block";
				}
				break;
			case "CZAS WOLNY":
				if (element.classList.contains("cat-czas_wolny")) {
					element.style.display = "block";
				}
				break;
			case "KONSUMPCJA":
				if (element.classList.contains("cat-konsumpcja")) {
					element.style.display = "block";
				}
				break;
		}
		
	}

	function hiddenAllElements(){
		const infoElements = mediaScroller.querySelectorAll(".media-element")
		infoElements.forEach(element => {
			
			element.style.display = "none";
			
		});
	}

}


// najbardziej emisyjne aktywności
let theBiggestLenght=0;
getBiggest(detailsList,6).forEach(element => {
	if(element != ""){
		theBiggestLenght +=1
	}
});

let theBiggest = getBiggest(detailsList,theBiggestLenght);




// _______________________FUNCTIONS__________________________

function getBiggest(obj, count){
	jsonObj = Object.assign({}, obj);
	theBiggests = [];
	
	for(let i=0; i<count ;i++){
	  let theBiggest = 0;
	  let theBiggestName = '';
	  
	  for(let i=0; i< Object.keys(jsonObj).length ;i++){
		if (jsonObj[Object.keys(jsonObj)[i]] > theBiggest){
		theBiggest = jsonObj[Object.keys(jsonObj)[i]];
		theBiggestName = Object.keys(jsonObj)[i];
		};
	  }
	  delete jsonObj[theBiggestName];
	  theBiggests.push(theBiggestName)
	}
	
	return theBiggests;
  }