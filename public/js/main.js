$(document).ready(async function () {



    var searchInfo = document.getElementById("search-info");
    var querySubmit = document.getElementById("querySubmit");
    var inputSubmit = document.getElementById("inputSubmit");
    var toggle = document.getElementById("toggleButton");
    var selectedQuery = document.getElementById("select-query");
    var crimeType = "crimeType";
    var timeStart = "2000";
    var timeEnd = "2020";
    var block = "NULL";
    var district = "NULL";
    var ward = "NULL";
    var list = 0;

    //grabs everything after = in URL, pretty basic will need improvement if passing more than one variable.
    var queryType = (window.location.href).slice(window.location.href.search('=') + 1, window.location.href.length);

    /*$("#toggleButton").click(function () {
        alert("shouldToggleHere");
    });*/

    $("select#CrimeType").change(function () {
        primarySearch = this.value;
        alert("crimeType changed");
    });

    $("#select-yearStart").change(function () {
        var temp = parseInt(this.value);
        if (temp > timeEnd) {
            alert("Year range invalid");
            $(this).val(timeStart);
        } else {
            timeStart = this.value;
            alert("changed start year");
        }
    });

    $("#select-yearEnd").change(function () {
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


    querySubmit.addEventListener("click", async function () {
        searchInfo.submit();
    });

    inputSubmit.addEventListener("click", async function () {
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

    //checks if URL has attribute, if not then it does nothing else it fetchs the appropriate function
    if (queryType != "http://localhost:8000/") {
        async function loadResults() {
            const response = await fetch(queryType);
            list = await response.json();
            console.log(list);
            console.log(list.recordset.length);
        }

        window.onload = loadResults().then(function () {

            GFG_FUN();

            // Appending the header to the table
            //$("#table").append(header);
            //return columns;
        });
    }

    function GFG_FUN() {
        var cols = [];

        for (var i = 0; i < list.recordset.length; i++) {
            for (var k in list.recordset[i]) {
                if (cols.indexOf(k) === -1) {
                    console.log("working");
                    // Push all keys to the array
                    cols.push(k);
                }
            }
        }

        // Create a table element
        var table = document.createElement("table");

        // Create table row tr element of a table
        var tr = table.insertRow(-1);

        for (var i = 0; i < cols.length; i++) {

            // Create the table header th element
            var theader = document.createElement("th");
            theader.innerHTML = cols[i];

            // Append columnName to the table row
            tr.appendChild(theader);
        }

        // Adding the data to the table
        for (var i = 0; i < list.recordset.length; i++) {

            // Create a new row
            trow = table.insertRow(-1);
            for (var j = 0; j < cols.length; j++) {
                var cell = trow.insertCell(-1);

                // Inserting the cell at particular place
                cell.innerHTML = list.recordset[i][cols[j]];
            }
        }

        // Add the newely created table containing json data
        var el = document.getElementById("table");
        el.innerHTML = "";
        el.appendChild(table);
    }
});




