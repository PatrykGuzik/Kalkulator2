
const btn_next = document.querySelector(".btn-next");
const btn_support = document.querySelector(".btn-support");
const more_info_1 = document.querySelector(".more-info :nth-child(1)");
const more_info_2 = document.querySelector(".more-info :nth-child(2)");

const your_footprint = document.querySelector(".your-footprint");
const btn_tip  = document.querySelector(".btn-tip");
const finish_info_1 = document.querySelector(".finish-info :nth-child(1)");
const finish_info_2 = document.querySelector(".finish-info :nth-child(2)");
const finish_inf_box = document.querySelector(".finish-info-box :nth-child(2)")
const header_details = document.querySelector(".header-details")

switch (lang) {
	case "pl":


		break;
	case "ang":
        btn_support.innerHTML = "Support us"
        more_info_1.innerHTML = "Learn more about"
        more_info_2.innerHTML = "our Foundation"

        your_footprint.innerHTML = "Your annual carbon footprint";
        btn_tip.innerHTML = "WHAT CAN I DO?"
        finish_info_1.innerHTML = "Your choice matters!"
        finish_info_2.innerHTML = "Try to implement our recommendations. Remember that system changes are necessary to facilitate the transformation. Consider taking part in the local initiatives and consider which environmental aspects are the most important for you. The system affects how we function, but it is we who create the system, and we have the power to change it."
        finish_inf_box.innerHTML = "Every tonne of CO2 emissions contributes to global warming"
        header_details.innerHTML = "Details"
		break;
}

function changeDetaisDescribe() {
    
}