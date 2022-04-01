const filterInput = document.querySelector(".filter-input");
let fileName = "calc_data";
let typeData = "calc_answers"; // calc_answers || answers
let dataToDownload = '';

getData();
getCodeDesc();



const changeDataBtn = document.querySelector(".change-data")
changeDataBtn.addEventListener("click", ()=>{
	if (typeData == "calc_answers") {
		typeData = "answers"
		fileName = "raw_data"
		changeDataBtn.innerHTML = "zmień na obliczone"
	}else{
		typeData = "calc_answers"
		fileName = "calc_data"
		changeDataBtn.innerHTML = "zmień na surowe"
	}
	getData();
	getCodeDesc();
})












// -----------------------------------
function getData() {
	fetch(`${serverLink}/api/answers/?format=json`, {
		headers: {
			Authorization: apiKey,
		},
	})
		.then(response => response.json())
		.then(data => myFunction(data));
}

function getCodeDesc() {
	fetch(`${serverLink}/api/codes/?format=json`, {
		headers: {
			Authorization: apiKey,
		},
	})
		.then(response => response.json())
		.then(data => codeDesc(data));
}
function codeDesc(data) {
	// const codeDesc = document.querySelector(".code-description");
	// const codes = document.querySelector(".codes");
	// let innerCodes = "|";
	// codeDesc.innerHTML = "";
	// isCode = false;

	// // for (let i = 0; i < Object.keys(data).length; i++) {
	// // 	if (data[i].code == filterInput.value) {
	// // 		codeDesc.innerHTML = data[i].description;
	// // 		// fileName = `_${data[i].code}`;
	// // 		isCode = true;
	// // 	}

	// // 	innerCodes += ` ${data[i].code}   | `;
	// // }

	// // if (!isCode) {
	// // 	fileName = "";
	// // }

	// codes.innerHTML = innerCodes;
}

function myFunction(data) {
	const dataLength = Object.keys(data).length;
	let csv = "";
	let filterData = [];
	for (let i = 0; i < dataLength; i++) {
		filterData.push(data[i]);
	}

	let filterDataLength = Object.keys(filterData).length;

	// const filterButton = document.querySelector(".filter-button");
	// filterButton.addEventListener("click", () => {
	// 	filterData = [];
		
	// 	if (filterInput.value == "") {
	// 		for (let i = 0; i < dataLength; i++) {
	// 			filterData.push(data[i]);
	// 		}
	// 	} else {
	// 		for (let i = 0; i < dataLength; i++) {
	// 			if (data[i].code == filterInput.value) {
	// 				filterData.push(data[i]);
	// 			}
	// 		}
	// 	}
	// 	filterDataLength = Object.keys(filterData).length;
	// 	console.log(filterData);
	// 	showData();
	// 	getCodeDesc();
	// 	filterInput.value = ""
	// });

	function showData() {
		csv = "";
		let header = "";
		const csvFileData = [];

		let tableHeader = "";
		let tableBody = "";

		header += "id,code,time,";
		tableHeader += "<tr> <th>id</th> <th>code</th> <th>time</th> ";

		for (let i = 0; i < filterDataLength; i++) {
			const JSONData = JSON.parse(filterData[i][`${typeData}`]); //  <---------------
			const JSONDataLength = Object.keys(JSONData).length;

			row = [];
			rowTableBody = "<tr>";
			let suma = 0;

			row.push(filterData[i].id);
			row.push(filterData[i].code);
			row.push(filterData[i].time);

			rowTableBody += `<td>${filterData[i].id}</td>`;
			rowTableBody += `<td>${filterData[i].code}</td>`;
			rowTableBody += `<td>${filterData[i].time}</td>`;

			for (let j = 0; j < JSONDataLength; j++) {
				if (Array.isArray(Object.values(JSONData)[j])) {
					for (let i = 0; i < Object.values(JSONData)[j].length; i++) {
						row.push(Object.values(JSONData)[j][i]);
						rowTableBody += `<td>${Object.values(JSONData)[j][i]}</td>`;
					
					}
				} else {
					row.push(Object.values(JSONData)[j]);
					suma += Object.values(JSONData)[j];
					rowTableBody += `<td>${Object.values(JSONData)[j]}</td>`;
				}
			}

			csvFileData.push(row);

			if (i == 0) {
				for (let j = 0; j < JSONDataLength; j++) {
					if (
						Object.keys(JSONData)[j] == "C_cechyWakacji" &&
						typeData == "answers"
					) {
						header += `C_cruise,`;
						header += `C_exoticFlights,`;
						header += `C_foreignHotels,`;
						header += `C_abroadOrganizations,`;
						header += `C_holidaysTrains,`;
						header += `C_holidaysNational,`;
						header += `C_holidaysCamping,`;
						header += `C_holidaysSelfOrg,`;
						header += `C_holidaysNearby,`;
						header += `C_holidaysAbroad`;

						// tableHeader += `<th>${Object.keys(JSONData)[j]}</th>`;
						tableHeader += `<th>C_cruise</th>`;
						tableHeader += `<th>C_exoticFlights</th>`;
						tableHeader += `<th>C_foreignHotels</th>`;
						tableHeader += `<th>C_abroadOrganizations</th>`;
						tableHeader += `<th>C_holidaysTrains</th>`;
						tableHeader += `<th>C_holidaysNational</th>`;
						tableHeader += `<th>C_holidaysCamping</th>`;
						tableHeader += `<th>C_holidaysSelfOrg</th>`;
						tableHeader += `<th>C_holidaysNearby</th>`;
						tableHeader += `<th>C_holidaysAbroad</th>`;
					} else {
						header += `${Object.keys(JSONData)[j]}`;
						tableHeader += `<th>${Object.keys(JSONData)[j]}</th>`;
					}

					if (j < JSONDataLength - 1) header += ",";
					else header += "\n";
				}
			}

			// rowTableBody += `<th>${suma.toFixed(2)}</th></tr>`;

			tableBody += rowTableBody;
		}

		// console.log(csvFileData);
		tableHeader += "</tr>";
		csv += header;
		// csv += "\n";
		csvFileData.forEach(function (row) {
			csv += row.join(",");
			csv += "\n";
		});

		// Tabela
		const tableHeaderBody = tableHeader + tableBody;

		const table = document.querySelector(".table-data");
		table.innerHTML = tableHeaderBody;
	}
	showData();
	dataToDownload = csv;

	
}



// Pobieranie danych
	const dBtn = document.querySelector(".download-button");
	dBtn.addEventListener("click", () => {
		console.log(dataToDownload);
		const hiddenElement = document.createElement("a");
		hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(dataToDownload);
		hiddenElement.target = "_blank";

		//provide the name for the CSV file to be downloaded
		hiddenElement.download = `${fileName}.csv`;
		hiddenElement.click();
	});