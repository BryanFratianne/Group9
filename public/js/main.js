$(document).ready(async function () {

    const response = await fetch('/test');
    var iucrList = await response.json();
    console.log(iucrList);
});

