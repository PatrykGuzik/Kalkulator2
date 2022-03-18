let isCode = false;
if (sessionStorage.getItem("answersE")) {
	sessionStorage.removeItem("answersE");
}

sessionStorage.setItem("page", 1);

const loading = document.querySelector(".loading");
function approve() {
	const codeInputValue = document.querySelector(".code-input").value;

	if (!isCode) {
		window.location.href = "calc.html";
		sessionStorage.setItem("code", "null");
	} else {
		loading.style.visibility = "visible";
		CheckCode(codeInputValue);
	}
}

const codeContainer = document.querySelector(".code-container");
const codeQ = document.querySelector(".code-q");

function activateCodeContainer() {
	if (codeContainer.style.display == "none") {
		codeContainer.style.display = "block";
		codeQ.innerHTML = "Jednak nie masz kodu?";
		isCode = true;
	} else {
		codeContainer.style.display = "none";
		codeQ.innerHTML = "Posiadasz kod?";
		isCode = false;
	}
}

function CheckCode(codeInput) {
	fetch(`${serverLink}/api/codes/?format=json`)
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

if(localStorage.getItem("isAcceptedPrivatePolicy") != "true"){
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
