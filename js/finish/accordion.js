// const recommendationsByCat = [
// 	"",
// 	"",
// 	"",
// 	"",
// 	"",
// 	"",
// 	""
// ];

const recommendationsByCat = {
	TRANSPORT: "tr",
	ODPADY: "od",
	"ENERGIA DOMU": "en",
	JEDZENIE: "jed",
	"CZAS WOLNY": "cw",
	KONSUMPCJA: "kon",
};

let buttons = ["but1", "but2", "but3", "but4"];
function getAccordion(accordion) {
	let accordionInner = getButtons(buttons) + `<div class="info-box"></div>`;
	accordion.innerHTML = accordionInner;

	const infoBox = document.querySelector(".info-box");

	infoBox.classList.add("expand");

	setTimeout(() => {
		infoBox.innerHTML = `<p class="info-box-text">${
			recommendationsByCat[theBiggest[0]]
		}</p>`;
	}, 2000);

	const infoBoxText = document.querySelector(".info-box-text");

	const BUTTONS = document.querySelectorAll(".btn-nav");
	BUTTONS[0].classList.add("active");

	function removeActiveClass() {
		BUTTONS.forEach(element => {
			element.classList.remove("active");
		});
	}

	BUTTONS.forEach(element => {
		
		

		element.addEventListener("click", () => {
			if (
				!element.classList.contains("active") &&
				infoBox.classList.contains("expand")
			) {
				removeActiveClass();

				element.classList.add("active");
				btn = document.querySelector(`#${element.id}`);

				showAndHiddenInfoBox();

				nrId = element.id[element.id.length - 1];

				setTimeout(() => {
					infoBox.innerHTML = `<p class="info-box-text">${
						recommendationsByCat[theBiggest[nrId - 1]]
					}</p>`;
					showAndHiddenInfoBox();
				}, 500);
			}
		});
	});

	function getButtons(list) {
		naw = '<div class="nav">';
		for (let i = 0; i < list.length; i++) {
			naw += `<button id="but-${i + 1}" class="btn-nav">${buttons[i]}</button>`;
		}
		naw += "</div>";
		return naw;
	}

	function showAndHiddenInfoBox() {
		infoBox.classList.toggle("expand");
		infoBox.classList.toggle("collapse");
	}

	function removeEmptyInfoBox() {
		console.log("------------------");
		for (let i = 0; i < Object.keys(recommendationsByCat).length; i++) {
			console.log(recommendationsByCat[Object.keys(recommendationsByCat)[i]]);
		}
	}
}



setTimeout(() => {
	

	for (let i = 0; i < theBiggest.length; i++) {
		const btnToRemove = document.querySelector(`#but-${i+1}`)
		
		if (recommendationsByCat[theBiggest[i]] == "") {
			// console.log(recommendationsByCat[theBiggest[i]]);
			btnToRemove.style.display = "none"
			
		}
	}


}, 2000);