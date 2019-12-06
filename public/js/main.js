$(document).ready(async function () {



    var searchInfo = document.getElementById("search-info");
    var submit = document.getElementById("submit");
    var toggle = document.getElementById("toggleButton");
    var selectedQuery = document.getElementById("select-query");
    var crimeType = "crimeType";
    var timeStart = "2000";
    var timeEnd = "2020";
    var block = "NULL";
    var district = "NULL";
    var ward = "NULL";

    //grabs everything after = in URL, pretty basic will need improvement if passing more than one variable.
    var queryType = (window.location.href).slice(window.location.href.search('=') + 1, window.location.href.length);

    //checks if URL has attribute, if not then it does nothing else it fetchs the appropriate function
    if(queryType != "http://localhost:8000/"){
        const response = await fetch(queryType);
        var iucrList = await response.json();
        console.log(iucrList);
    }

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
    //changes the action on the query submit form based on what search dropdown is chosen
    // so that the appropriate stored procedure is called
    selectedQuery.addEventListener("change", function(){
        document.queryForm.action = selectedQuery.options[selectedQuery.selectedIndex].value;
    });

    //submits query form to connection.js so that it can store variables from form then perform query.
    submit.addEventListener("click", async function () {
        searchInfo.submit();

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


