// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");

// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage = 50;

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var ufodata = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  // Set the value of endingIndex to startingIndex + resultsPerPage
  var endingIndex = startingIndex + resultsPerPage;
  var ufodatasubset = ufodata.slice(startingIndex, endingIndex);
  
  $tbody.innerHTML = "";
  for (var i = 0; i < ufodatasubset.length; i++) {
    // Get get the current address object and its fields
    var ufo = ufodatasubset[i];
    var fields = Object.keys(ufo);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufo[field];
    }
  }
}

// Add an event listener to the button, call handleButtonClick when clicked
$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
  // Increase startingIndex by resultsPerPage, render the next section of the table
  startingIndex += resultsPerPage;
  renderTable();
  // Check to see if there are any more results to render
  if (startingIndex + resultsPerPage >= ufodata.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All EVIDENCE Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterdatetime = $datetimeInput.value.trim().toLowerCase();
  var filtercity = $cityInput.value.trim().toLowerCase();
  var filterstate = $stateInput.value.trim().toLowerCase();
  var filtercountry = $countryInput.value.trim().toLowerCase();
  var filtershape = $shapeInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  // filteredAddresses = addressData.filter(function(address) {
  //   var addressState = address.state.substring(0, filterState.length).toLowerCase();
  //   var addressCity = address.city.substring(0, filterCity.length).toLowerCase();
  ufodata = dataSet.filter(function(ufo) {
    var ufodatetime = ufo.datetime.substring(0, filterdatetime.length).toLowerCase();
    var ufocity = ufo.city.substring(0, filtercity.length).toLowerCase();
    var ufostate = ufo.state.substring(0, filterstate.length).toLowerCase();
    var ufocountry = ufo.country.substring(0, filtercountry.length).toLowerCase();
    var ufoshape = ufo.shape.substring(0, filtershape.length).toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    if (ufodatetime === filterdatetime && ufocity === filtercity && ufostate === filterstate && ufocountry === filtercountry && ufoshape === filtershape ) {
      return true;
    }
    return false;
    // return ufostate === filterstate;
    // return ufocountry === filtercountry;
    // return ufoshape === filtershape;

  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
