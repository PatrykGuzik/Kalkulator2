
function drawSlider(){
	fetch(`${serverLink}/api/informations/?format=json`,{
		headers: {
			'Authorization': apiKey
			}
	})
	.then(response => response.json())
	.then(data => DrawInfo(data));
}
drawSlider()

function DrawInfo(d) {
	const mediaScroller = document.querySelector(".media-scroller");

	let infoHeader = ''
        switch (lang) {
			case "pl": infoHeader = 'Czy wiesz, że...'; break;
			case "ang": infoHeader = 'Did you know that...'; break;
		}

	let mediaScrollerInner = "";

	for (let i = 0; i < Object.keys(d).length; i++) {
		mediaScrollerInner += ` <div class="media-element cat-${d[i].kategoria}">
                                <div class="info">

                                    <div class="info-content">
                                        <h3>${infoHeader}</h3>
                                        <p>${d[i][`informacja_${lang}`]}</p>
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

	// const bigInfoContainer = document.querySelector(".big-info-container");
	// const infoBtn = document.querySelector(".info-btn");
	// const bigInfo = document.querySelector(".big-info");

	fetch(`${serverLink}/api/recommendations/?format=json`,{
		headers: {
			'Authorization': apiKey
			}
	})
		.then(response => response.json())
		.then(data => DrawRecommendation(data));
}


