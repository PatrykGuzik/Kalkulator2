const filterInput = document.querySelector(".filter-input");
let fileName = "";

function getData() {
	fetch(`${serverLink}/api/answers/?format=json`)
		.then(response => response.json())
		.then(data => myFunction(data));
}

function getCodeDesc() {
	fetch(`${serverLink}/api/codes/?format=json`)
		.then(response => response.json())
		.then(data => codeDesc(data));
}

getData();
getCodeDesc();

function codeDesc(data) {
	const codeDesc = document.querySelector(".code-description");
	const codes = document.querySelector(".codes");
	let innerCodes = "|";
	codeDesc.innerHTML = "";
	isCode = false;

	for (let i = 0; i < Object.keys(data).length; i++) {
		if (data[i].code == filterInput.value) {
			codeDesc.innerHTML = data[i].description;
			fileName = `_${data[i].code}`;
			isCode = true;
		}

		innerCodes += ` ${data[i].code}   | `;
	}

	if (!isCode) {
		fileName = '';
	}

	codes.innerHTML = innerCodes;
}

function myFunction(data) {
	const dataLength = Object.keys(data).length;
	let csv = "";
	let filterData = [];
	for (let i = 0; i < dataLength; i++) {
		filterData.push(data[i]);
	}


	let filterDataLength = Object.keys(filterData).length;

	const filterButton = document.querySelector(".filter-button");
	filterButton.addEventListener("click", () => {
		filterData = [];
		if (filterInput.value == "") {
			for (let i = 0; i < dataLength; i++) {
				filterData.push(data[i]);
			}
		} else {
			for (let i = 0; i < dataLength; i++) {
				if (data[i].code == filterInput.value) {
					filterData.push(data[i]);
				}
			}
		}
		filterDataLength = Object.keys(filterData).length;
		console.log(filterData);
		showData();
		getCodeDesc();
	});

	function showData() {
		csv = "";
		let header = "";
		const csvFileData = [];

		let tableHeader = "";
		let tableBody = "";

		header += "id,code,";
		tableHeader += "<tr> <th>id</th> <th>code</th> ";

		

		for (let i = 0; i < filterDataLength; i++) {
			const JSONData = JSON.parse(filterData[i].calc_answers);
			const JSONDataLength = Object.keys(JSONData).length;
		

			row = [];
			rowTableBody = "<tr>";
			let suma = 0;

			row.push(filterData[i].id);
			row.push(filterData[i].code);

			rowTableBody += `<td>${filterData[i].id}</td>`;
			rowTableBody += `<td>${filterData[i].code}</td>`;

			
			for (let j = 0; j < JSONDataLength; j++) {
				// console.log(Object.values(JSONData)[j]);
				row.push(Object.values(JSONData)[j]);
				suma += Object.values(JSONData)[j];
				// TODO sprawdzić czy się zapisuje w odpowiedniej kolejności
				rowTableBody += `<td>${Object.values(JSONData)[j]}</td>`;
			}

			csvFileData.push(row);
			console.log(row);

			if (i == 0) {
				for (let j = 0; j < JSONDataLength; j++) {
					header += `${Object.keys(JSONData)[j]}`;
					tableHeader += `<th>${Object.keys(JSONData)[j]}</th>`;
					if (j < JSONDataLength-1) header += ",";
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

	// Pobieranie danych
	const dBtn = document.querySelector(".download-button");
	dBtn.addEventListener("click", () => {
		const hiddenElement = document.createElement("a");
		hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
		hiddenElement.target = "_blank";

		//provide the name for the CSV file to be downloaded
		hiddenElement.download = `data_calc${fileName}.csv`;
		hiddenElement.click();
	});
}
