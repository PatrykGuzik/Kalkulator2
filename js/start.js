let isCode = false;

function approve() {
	const codeInputValue = document.querySelector(".code-input").value;

	if (!isCode) {
		window.location.href = "index.html";
		sessionStorage.setItem("code", "null");
	} else {
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
	fetch("http://127.0.0.1:8000/api/codes/?format=json")
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
        window.location.href = "index.html";
		

	} else {
		wrongCode.style.display = "block";
		document.documentElement.style.setProperty("--inputBorderColor", "red");
	}
}
