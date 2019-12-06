$(document).ready(async function () {



    var searchInfo = document.getElementById("search-info");
    var submit = document.getElementById("submit");
    var toggle = document.getElementById("toggleButton");
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


    submit.addEventListener("click", async function () {
        searchInfo.submit();
        /*const response = await fetch('/getCountByCrime', {
            method: 'POST',
            //body: JSON.stringify({primaryType: })
        });*/
        /*const response = await fetch('/getCountByCrime');
        var iucrList = await response.json();
        console.log(iucrList);*/
        //You can put in the queury here, selects queuery on the data selected.

    });

    toggle.addEventListener('click', function switchVisible() {
        if (document.getElementById('hideDiv')) {

            if (document.getElementById('hideDiv').style.display == 'none') {
                document.getElementById('hideDiv').style.display = 'block';
                document.getElementById('showDiv').style.display = 'none';
            } else {
                document.getElementById('hideDiv').style.display = 'none';
                document.getElementById('showDiv').style.display = 'block';
            }
        }
    });

});


