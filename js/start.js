sessionStorage.setItem("code", "null");

function approve() {
	const codeInput = document.querySelector(".code-input");
	console.log(codeInput.value);
	sessionStorage.setItem("code", codeInput.value);

	window.location.href = "index.html";
}

const codeContainer = document.querySelector(".code-container");
function activateCodeContainer() {
	if (codeContainer.style.display == "none") codeContainer.style.display = "block";
    else codeContainer.style.display = "none"
		
}
