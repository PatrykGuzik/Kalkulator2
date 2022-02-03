const settings = 
{'Transport':
    {'--bgImage':'url(../img/transport.jpg)',
    '--formColor':'rgba(255, 255, 255, 0.5)',
    '--fontColor':'rgb(0, 0, 0)',
    '--mainRadioColor':'rgb(0, 0, 0)'}
}
console.log(settings);

function setStyleHomeEnergy() {
    document.documentElement.style.setProperty('--bgImage', 'url(../img/home_energy.jpg)');
    document.documentElement.style.setProperty('--formColor', 'rgba(0, 0, 0, 0.5)');
    document.documentElement.style.setProperty('--fontColor', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--mainRadioColor', 'rgb(255, 255, 255)');
}

function setStyleTransport() {
    document.documentElement.style.setProperty('--bgImage', 'url(../img/transport.jpg)');
    document.documentElement.style.setProperty('--formColor', 'rgba(255, 255, 255, 0.5)');
    document.documentElement.style.setProperty('--fontColor', 'rgb(0, 0, 0)');
    document.documentElement.style.setProperty('--mainRadioColor', 'rgb(0, 0, 0)');
}