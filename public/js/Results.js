$(document).ready(async function () {
    const response = await fetch('/getCountByCrime');
    var iucrList = await response.json();
    console.log(iucrList);
});