function getData() {
	fetch("http://127.0.0.1:8000/api/answers/?format=json")
		.then(response => response.json())
		.then(data => myFunction(data));
}

getData()



function myFunction(data) {
    
    console.log(data);

    const dataLength = Object.keys(data).length

    let csv = '';
    let header = '';
    const csvFileData = []

    for (let i = 0; i < dataLength; i++) {
        const JSONData = JSON.parse(data[i].calc_answers) 
        const JSONDataLength = Object.keys(JSONData).length
        row = [];

        row.push(data[i].id)
        row.push(data[i].code)

        for (let j = 1; j <= JSONDataLength; j++) {
            row.push(JSONData[j])
        }
        csvFileData.push(row)

        if(i == 0){
            for (let j = 1; j <= JSONDataLength; j++) {
                header += `${j}`
                if (j<JSONDataLength) header += ","
                else header += "\n"
            }
        }

        console.log(row);

    }

 
    csv += header
    


    csvFileData.forEach(function(row) {
        csv += row.join(',');
        csv += "\n";
    });



    const dBtn = document.querySelector(".download-button")
    dBtn.addEventListener("click", () => {
        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        
        //provide the name for the CSV file to be downloaded
        hiddenElement.download = 'data_calc.csv';
        hiddenElement.click();
    })
}




