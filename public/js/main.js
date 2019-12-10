$(document).ready(async function () {



    var searchInfo = document.getElementById("search-info");
    var querySubmit = document.getElementById("querySubmit");
    var inputSubmit = document.getElementById("inputSubmit");
    var toggle = document.getElementById("toggleButton");
    var selectedQuery = document.getElementById("select-query");
    var getqueryVariables = document.getElementsByClassName("queryVariable");
    var getinputVariables = document.getElementsByClassName("inputQueryVariable");
    var queryVariables = {
        primaryType: undefined,
        minYear: undefined,
        maxYear: undefined,
        block: undefined,
        ward: undefined,
        district: undefined
    };
    var inputVariables = {
        district: undefined,
        ward: undefined,
        block: undefined,
        date: undefined,
        longitude: undefined,
        latitude: undefined,
        caseNumber: undefined,
        iucr: undefined,
        primaryType: undefined,
        description: undefined,
        locationDescription: undefined,
        domestic: undefined,
        arrest: undefined,
        year: undefined
    };
    var currentQuery = "/SelectAlliucr";
    var crimeType = "crimeType";
    var timeStart = "2000";
    var timeEnd = "2020";
    var block = "NULL";
    var district = "NULL";
    var ward = "NULL";
    var list = 0;

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

    //updates object that stores information for query requests from fields
    var updateQueryVariables = function() {
        queryVariables.primaryType = getqueryVariables[0].value;
        queryVariables.minYear = getqueryVariables[1].value;
        queryVariables.maxYear = getqueryVariables[2].value;
        queryVariables.block = getqueryVariables[3].value;
        queryVariables.ward = getqueryVariables[4].value;
        queryVariables.district = getqueryVariables[5].value;
        console.log(queryVariables);
    };

    //updates object that stores information for update requests from fields.
    var updateInputVariables = function() {
        inputVariables.district = getinputVariables[0].value;
        inputVariables.ward = getinputVariables[1].value;
        inputVariables.block = getinputVariables[2].value;
        inputVariables.date = getinputVariables[3].value;
        inputVariables.longitude = getinputVariables[4].value;
        inputVariables.latitude = getinputVariables[5].value;
        inputVariables.caseNumber = getinputVariables[6].value;
        inputVariables.iucr = getinputVariables[7].value;
        inputVariables.primaryType = getinputVariables[8].value;
        inputVariables.description = getinputVariables[9].value;
        inputVariables.locationDescription = getinputVariables[10].value;
        inputVariables.domestic = getinputVariables[11].value;
        inputVariables.arrest = getinputVariables[12].value;
        inputVariables.year = getinputVariables[13].value;
        console.log(inputVariables);
    };
    //creates event listeners that updates object when one of the query request options is changed
    for (var i = 0; i < getqueryVariables.length; i++){
        getqueryVariables[i].addEventListener('change', updateQueryVariables)
    }
    //creates event listeners that updates object when one of the input fields have changed
    for (var i = 0; i < getinputVariables.length; i++){
        getinputVariables[i].addEventListener('change', updateInputVariables)
    }

    //runs when submit button has been entered on query page
    querySubmit.addEventListener("click", async function () {
        updateQueryVariables();
        try {
            const list1 = await postData(currentQuery, updateQueryVariables);
            list = list1;
            console.log(list); // JSON-string from `response.json()` call

          } catch (error) {
            console.error(error);
          }
        GFG_FUN();

    });
    //fetch request with approprate patameters such as POST, accepts url and object
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

      //Runs when submit button is pressed on update database page
    inputSubmit.addEventListener("click", async function () {
        updateInputVariables();
        //currentQuery = "/input";
        try {
            const list1 = await postData(currentQuery, updateQueryVariables);
            list = list1;
            console.log(list); // JSON-string from `response.json()` call

        } catch (error) {
            console.error(error);
        }
        alert("Input Complete");
    });
    //Runs when toggle button is selected it hides query page and shows update page
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
    //takes JSON with results from database and creates a table
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




