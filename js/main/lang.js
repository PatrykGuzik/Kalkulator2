const cat_t = document.querySelector(".cat-t");
const cat_e = document.querySelector(".cat-e");
const cat_o = document.querySelector(".cat-o");
const cat_j = document.querySelector(".cat-j");
const cat_c = document.querySelector(".cat-c");
const cat_k = document.querySelector(".cat-k");
const btn_next = document.querySelector(".btn-next");
const btn_support = document.querySelector(".btn-support");
const more_info_1 = document.querySelector(".more-info :nth-child(1)");
const more_info_2 = document.querySelector(".more-info :nth-child(2)");

switch (lang) {
	case "pl":
        cat_t.innerHTML = "TRANSPORT"
        cat_e.innerHTML = "ENERGIA DOMU"
        cat_o.innerHTML = "ODPADY"
        cat_j.innerHTML = "JEDZENIE"
        cat_c.innerHTML = "CZAS WOLNY"
        cat_k.innerHTML = "KONSUMPCJA"
        btn_next.innerHTML = "Dalej"
		break;
	case "ang":
        cat_t.innerHTML = "TRANSPORT"
        cat_e.innerHTML = "HOUSEHOLD ENERGY"
        cat_o.innerHTML = "Waste"
        cat_j.innerHTML = "Food"
        cat_c.innerHTML = "Free time"
        cat_k.innerHTML = "Consumption"
        btn_next.innerHTML = "Next"
        btn_support.innerHTML = "Support us"
        more_info_1.innerHTML = "Learn more about"
        more_info_2.innerHTML = "our Foundation"
		break;
}

