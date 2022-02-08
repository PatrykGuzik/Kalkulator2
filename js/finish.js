// const code = sessionStorage.getItem('code');

// console.log(code);

// const transport = document.querySelector(".transport")
// transport.innerHTML = Number.parseFloat(sessionStorage.getItem('TRANSPORT')).toFixed(2);


// ----dane---
const SWIAT = 4.9;
const POLSKA = 9;
const KIRGISTAN = 13;
const SUDAN = 7.1;
const ROSJA = 10.5;

const TRANSPORT = Number.parseFloat(sessionStorage.getItem('TRANSPORT')/1000);
const ODPADY = Number.parseFloat(sessionStorage.getItem('ODPADY')/1000);
const ENERGIA_DOMU = Number.parseFloat(sessionStorage.getItem('ENERGIA_DOMU')/1000);
const JEDZENIE = Number.parseFloat(sessionStorage.getItem('JEDZENIE')/1000);
const CZAS_WOLNY = Number.parseFloat(sessionStorage.getItem('CZAS_WOLNY')/1000);
const KONSUMPCJA = Number.parseFloat(sessionStorage.getItem('KONSUMPCJA')/1000);
console.log(TRANSPORT + ODPADY);

const SUMA = TRANSPORT + ODPADY + ENERGIA_DOMU + JEDZENIE + CZAS_WOLNY + KONSUMPCJA;

const RED = '#FF3939'
const GREEN = '#5A9D55';
const YELLOW = '#FFAE34';


const detailsList = {
    "TRANSPORT":TRANSPORT,
    "ODPADY":ODPADY,
    "ENERGIA DOMU":ENERGIA_DOMU,
    "JEDZENIE":JEDZENIE,
    "CZAS WOLNY":CZAS_WOLNY,
    "KONSUMPCJA":KONSUMPCJA
}

const statsList = {
	"Twój wynik": SUMA,
	"Świat": SWIAT,
	"Polska": POLSKA,
	"Kirgistan": KIRGISTAN,
	"Sudan": SUDAN,
	"Rosja": ROSJA,
};
console.log("suma: " + SUMA);

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

const statsWorld = document.querySelector(".stats-world");
let statsWorldInner = "";

for (let i = 0; i < Object.keys(statsList).length; i++) {
	value = Object.values(statsList)[i].toFixed(1);
	describe = Object.keys(statsList)[i];
    barColor = changeBarColor(value);
	statsWorldInner += `<div class="result">
                            <div class="result-value">${value}t</div>
                            <div class="result-bar" style="height:${value * 6}px; background-color:${barColor}"></div>
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
    percent = value*100/SUMA;
    percentFixed = Number.parseFloat(percent).toFixed(1)
	describe = Object.keys(detailsList)[i];
    barColor = changeBarColor(value);
	detailsInner += `<div class="result">
                        <div class="result-value">${percentFixed}%</div>
                        <div class="result-bar" style="height:${percentFixed*2}px"></div>
                        <div class="result-describe">${describe}</div>
                    </div>
                        `;
}


details.innerHTML = detailsInner;

// ----------------------------slider-------------------------------

const mediaScroller = document.querySelector(".media-scroller");

let mediaScrollerInner = "";

for (let i = 0; i < 15; i++) {
	mediaScrollerInner += ` <div class="media-element">
                                <div class="info">

                                    <div class="info-content">
                                        <h3>Czy wiesz że...</h3>
                                        <p>...Lorem ipsum dolor sit amet consectetur adipisicing elit. Et itaque excepturi ut corporis amet in possimus, qui rem asperiores provident reprehenderit debitis velit optio nobis? Nostrum at et tempore eius.</p>
                                    </div>

                                    <img src="img/path869.png" alt="">
                                
                                </div>

                            </div>`;
}


mediaScroller.innerHTML = mediaScrollerInner;

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

btnRight.addEventListener("click", () => {
	mediaScroller.scrollLeft += document.body.clientWidth * 0.75;
});

btnLeft.addEventListener("click", () => {
	mediaScroller.scrollLeft -= document.body.clientWidth * 0.75;
});

const bigInfoContainer = document.querySelector(".big-info-container");
const infoBtn = document.querySelector(".info-btn");
const bigInfo = document.querySelector(".big-info");