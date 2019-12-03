$(document).ready(async function () {

    //const response = await fetch('/getCountByCrime');
    //var iucrList = await response.json();
    //console.log(iucrList);


    var crimeType = "crimeType";
    var timeStart = "2000";
    var timeEnd = "2020";
    var block = "NULL";
    var district = "NULL";
    var ward = "NULL";

    $("#toggleButton").click(function () {
        alert("shouldToggleHere");
    });


    $("select#CrimeType").change(function () {
        primarySearch = this.value;
        alert("crimeType changed");
    });

    $("#yearStart").change(function () {
        var temp = parseInt(this.value);
        if (temp > timeEnd) {
            alert("Year range invalid");
            $(this).val(timeStart);
        } else {
            timeStart = this.value;
            alert("changed start year");
        }
    });
    $("#yearEnd").change(function () {
        var temp = parseInt(this.value);
        if (temp < timeStart) {
            alert("Year range invalid");
            $(this).val(timeEnd);
        } else {
            timeEnd = this.value;
            alert("changed end year");
        }
    });

    $("#submit").click(function () {
        //You can put in the queuryr here, selects queuery on the data selected. 

    })


});