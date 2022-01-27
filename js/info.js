class Info {
	constructor(jsonInfo, innerPlace) {
		this.jsonInfo = jsonInfo;
		this.innerPlace = innerPlace;
		this.numberOfInfo = this.jsonInfo.length;
	}

    drawInfo(){
        const info_box = document.querySelector(this.innerPlace);
		let info_box_inner = '';
        
        for (let i = 0; i < this.numberOfInfo; i++) {
            
            info_box_inner += 
            `<div class="info-object">
                <h4>Czy wiesz że...</h4>
                <p>${this.jsonInfo[i].informacja_pl}</p>
            </div>
            `
        }
        

        info_box.innerHTML = info_box_inner;
    }
}