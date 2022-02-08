const settings = 
{'Transport':
    {'--bgImage':'url(../img/transport.jpg)',
    '--formColor':'rgba(255, 255, 255, 0.5)',
    '--fontColor':'rgb(0, 0, 0)',
    '--mainRadioColor':'rgb(0, 0, 0)'}
}

function setStyleTransport() {
    document.documentElement.style.setProperty('--bgImage', 'url(../img/transport.jpg)');
    lightTheme();
}

function setStyleHomeEnergy() {
    document.documentElement.style.setProperty('--bgImage', 'url(../img/home_energy.jpg)');
    darkTheme();
}

function setStyleWaste(){
    document.documentElement.style.setProperty('--bgImage', 'url(../img/waste.jpg)');
    darkTheme();
}

function setStyleFood(){
    document.documentElement.style.setProperty('--bgImage', 'url(../img/food.jpg)');
    darkTheme();
}

function setStyleFreeTime(){
    document.documentElement.style.setProperty('--bgImage', 'url(../img/entertainment.jpg)');
    darkTheme();
}

function setStyleConsumption(){
    document.documentElement.style.setProperty('--bgImage', 'url(../img/lifestyle.jpg)');
    darkTheme();
}



function darkTheme(){
    document.documentElement.style.setProperty('--formColor', 'rgba(0, 0, 0, 0.7)');
    document.documentElement.style.setProperty('--fontColor', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--mainRadioColor', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--rangeWhellColor', 'white');
    document.documentElement.style.setProperty('--rangeColor', '#5A9D55');
}

function lightTheme(){
    document.documentElement.style.setProperty('--formColor', 'rgba(255, 255, 255, 0.7)');
    document.documentElement.style.setProperty('--fontColor', 'rgb(0, 0, 0)');
    document.documentElement.style.setProperty('--mainRadioColor', 'rgb(0, 0, 0)');
    document.documentElement.style.setProperty('--rangeWhellColor', 'white');
    document.documentElement.style.setProperty('--rangeColor', 'black');
}