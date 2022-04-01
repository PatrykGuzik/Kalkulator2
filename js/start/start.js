let lang = "pl";

let isCode = false;
if (sessionStorage.getItem("answersE")) {
	sessionStorage.removeItem("answersE");
}

sessionStorage.setItem("page", 1);
sessionStorage.setItem("lang", "pl");
sessionStorage.setItem("isFinish", "false");

// test

const date = new Date();
const start_time = date.getTime();


setTimeout(() => {
	const date2 = new Date();
	const stop_time = date2.getTime();

}, 2000);

// ----------

const loading = document.querySelector(".loading");
function approve() {
	const codeInputValue = document.querySelector(".code-input").value;

	if (!isCode) {
		const date = new Date();
		sessionStorage.setItem("start_time", date.getTime());
		window.location.href = "calc.html";
		sessionStorage.setItem("code", "null");
	} else {
		loading.style.visibility = "visible";
		CheckCode(codeInputValue);
	}
}

const codeContainer = document.querySelector(".code-container");
const codeQ = document.querySelector(".code-q");

let code_text = ["Posiadasz kod?", "Jednak nie masz kodu?"];
let code_click = "Kliknij tutaj";

const codeQBtn = document.querySelector(".code-q-btn");

function activateCodeContainer() {
	if (codeContainer.style.display == "none") {
		codeContainer.style.display = "block";
		codeQ.innerHTML = code_text[1];
		codeQBtn.innerHTML = code_click;
		isCode = true;
	} else {
		codeContainer.style.display = "none";
		codeQ.innerHTML = code_text[0];
		codeQBtn.innerHTML = code_click;
		isCode = false;
	}
}

activateCodeContainer();

// fetch(`${serverLink}/api/answers/?format=json`, {
// 	headers: {
// 		Authorization: apiKey,
// 	},
// })
// 	.then(response => response.json())
// 	.then(data => myFunction(data));

function CheckCode(codeInput) {
	fetch(`${serverLink}/api/codes/?format=json`, {
		headers: {
			Authorization: apiKey,
		},
	})
		.then(response => response.json())
		.then(data => Check(data, codeInput));
}

function Check(data, codeInput) {
	isCodeInBase = false;
	const wrongCode = document.querySelector(".wrong-code");

	for (let i = 0; i < data.length; i++) {
		if (data[i].code == codeInput) isCodeInBase = true;
	}

	if (isCodeInBase) {
		wrongCode.style.display = "none";
		document.documentElement.style.setProperty(
			"--inputBorderColor",
			"rgba(0, 128, 0, 0.801)"
		);
		sessionStorage.setItem("code", codeInput);
		const date = new Date();
		sessionStorage.setItem("start_time", date.getTime());
		window.location.href = "calc.html";

	} else {
		wrongCode.style.display = "block";
		document.documentElement.style.setProperty("--inputBorderColor", "red");
	}

	loading.style.visibility = "hidden";
}

// Cookies -------------------------------------------------------------------------

const cookies = document.querySelector(".cookies-info");
const btnCookies = document.querySelector(".btn-cookies");

if (localStorage.getItem("isAcceptedPrivatePolicy") != "true") {
	showCookiesBox();
}

function showCookiesBox() {
	setTimeout(() => {
		cookies.style.transform = "translateY(0)";
	}, 1000);
}

btnCookies.addEventListener("click", function () {
	localStorage.setItem("isAcceptedPrivatePolicy", "true");
	cookies.style.transform = "translateY(100%)";
});

// Język

const container = document.querySelector(".container");
const conHeader = container.querySelector("h3");
const conContent = container.querySelector("p");

const btn_start = document.querySelector(".button-start");
const btn_support = document.querySelector(".btn-support");
const more_info_1 = document.querySelector(".more-info :nth-child(1)");
const more_info_2 = document.querySelector(".more-info :nth-child(2)");
const enter_code = document.querySelector(".enter-code");

function changeLanguage() {
	switch (lang) {
		case "pl":
			code_text = ["Posiadasz kod?", "Jednak nie masz kodu?"];
			code_click = "Kliknij tutaj";
			codeQ.innerHTML = code_text[0];
			codeQBtn.innerHTML = code_click;
			enter_code.innerHTML = "Podaj kod";
			btn_start.innerHTML = "ZACZNIJ!";
			btn_support.innerHTML = "Wspieraj nas";
			more_info_1.innerHTML = "Dowiedz się więcej o działalności";
			more_info_2.innerHTML = "naszej Fundacji";
			conHeader.innerHTML =
				"Oblicz jaki wpływ na środowisko mają Twoje codzienne działania!";
			conContent.innerHTML =
				"Podejmij pierwszy krok już teraz i skorzystaj z kalkulatora śladu węglowego stworzonego przez zespół projektowy Carbon Footprint Foundation i dowiedz się jak zminimalizować swój ślad węglowy";
			break;
		case "ang":
			code_text = ["Have a code?", "Don't have a code?"];
			code_click = "Click here";
			codeQ.innerHTML = code_text[0];
			codeQBtn.innerHTML = code_click;
			enter_code.innerHTML = "Enter code";
			btn_start.innerHTML = "START!";
			btn_support.innerHTML = "Support us";
			more_info_1.innerHTML = "Learn more about";
			more_info_2.innerHTML = "our Foundation";
			conHeader.innerHTML =
				"Calculate the impact of your daily activities on the environment!";
			conContent.innerHTML = `Take the first step now, use the Carbon Footprint Foundation project team’s carbon
	footprint calculator and find out how to minimise your carbon footprint.`;
			break;
	}
}

// Język Przycisk
let btnActive = false;
const langBtn = document.querySelector(".lang");

langBtn.addEventListener("click", function () {
	this.style.transform = "translateX(0)";
	btnActive = true;
});

const langPL = langBtn.querySelector(".lang-pl");
const langEng = langBtn.querySelector(".lang-ang");

langPL.addEventListener("click", function () {
	removeActiveClasses();
	langPL.classList.add("lang-active");
	sessionStorage.setItem("lang", "pl");
	lang = "pl";
	changeLanguage();
});

langEng.addEventListener("click", function () {
	removeActiveClasses();
	langEng.classList.add("lang-active");
	sessionStorage.setItem("lang", "ang");
	lang = "ang";
	changeLanguage();
});

function removeActiveClasses() {
	langPL.classList.remove("lang-active");
	langEng.classList.remove("lang-active");
}
