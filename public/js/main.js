$(document).ready(async function () {



    var searchInfo = document.getElementById("search-info");
    var querySubmit = document.getElementById("querySubmit");
    var inputSubmit = document.getElementById("inputSubmit");
    var toggle = document.getElementById("toggleButton");
    var selectedQuery = document.getElementById("select-query");
    var getqueryVariables = document.getElementsByClassName("queryVariable");
    var queryVariables = {primaryType: undefined, minYear: undefined, maxYear: undefined, block: undefined, ward: undefined, district: undefined};
    var currentQuery = "/SelectAlliucr"
    var crimeType = "crimeType";
    var timeStart = "2000";
    var timeEnd = "2020";
    var block = "NULL";
    var district = "NULL";
    var ward = "NULL";
    var list = 0;


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
        currentQuery = selectedQuery.options[selectedQuery.selectedIndex].value;
        console.log(currentQuery);
    });

    var updateVariables = function() {
        queryVariables.primaryType = getqueryVariables[0].value;
        queryVariables.minYear = getqueryVariables[1].value;
        queryVariables.maxYear = getqueryVariables[2].value;
        queryVariables.block = getqueryVariables[3].value;
        queryVariables.ward = getqueryVariables[4].value;
        queryVariables.district = getqueryVariables[5].value;
        console.log(queryVariables);
    };

    for (var i = 0; i < getqueryVariables.length; i++){
        getqueryVariables[i].addEventListener('click', updateVariables)
    }
    querySubmit.addEventListener("click", async function () {
        //searchInfo.submit();
        try {
            const list1 = await postData(currentQuery, queryVariables);
            list = list1;
            console.log(list); // JSON-string from `response.json()` call

          } catch (error) {
            console.error(error);
          }
        GFG_FUN();

    });

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
         },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
      }

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




