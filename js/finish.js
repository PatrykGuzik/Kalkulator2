
const code = sessionStorage.getItem('code');


console.log(code);

const transport = document.querySelector(".transport")
transport.innerHTML = Number.parseFloat(sessionStorage.getItem('TRANSPORT')).toFixed(2);


