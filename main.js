$(document).ready(async function(){

   const response = await fetch('/test');
   var iucrList = await response.json();
   console.log(iucrList);


   var primarySearch = "crimeType";


   $("#toggleButton").click(function(){
      alert("hello");
   });


   $("select#CrimeType").change(function() {
      primarySearch = $("#searchTypeSelection").val();
      alert("hi");
   });





});



