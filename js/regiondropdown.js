  /**
  * This is a function dropdown() is shown based on the selection of country, state and city.
  * The value selected is passed to the further dropdown to show the options
  * @param - none
  * 
  * @return -none
  *
  */
 function dropdownfunction() {
  var country = $('#dropdown');
  //first country is selected based on country the states are shown and based on states cities will be shown by calling the thirddropdown() method
  if (country.val() === 'India') {
   var array = ["Maharashtra", "Delhi"];
  } else if (country.val() === 'Australia') {
   var array = ["South Australia", "Victoria"];
  } else if (country.val() === 'Canada') {
   var array = ["Alberta", "Columbia"];
  }
  var concatString = "<option value=\"\">Select</option>";
  for (var i = 0; i < array.length; i++) {
   concatString += "<option>" + array[i] + "</option>";
  }
  concatString = "<select class=\"custom-select\" required=\"required\" id=\"states\" onchange=\"thirdDropdown(this)\">" + concatString + "</select>";
  obj.country = country.val();
  $('#output').html(concatString);
 }
 
 /**
  * This is a function thirddropdown, which is displayed on the selection of the city,
  * @param {object} element - An object option is passed. We get the value on element.value
  * @return none
  *
  * @example
  *     thirdDropdown(dropdown)-->dropdown value is passed here
  */
 function thirdDropdown(element) {
  var cities = [];
  if (element.value === "Maharashtra") {
   cities = ["pawai", "thane"];
  } else if (element.value === "Delhi") {
   cities = ["Noida", "South-Delhi"];
  } else if (element.value === "South Australia") {
   cities = ["Dunstan", "Mitchell"];
  } else if (element.value === "Victoria") {
   cities = ["Altona", "Euroa"];
  } else if (element.value === "Alberta") {
   cities = ["Acadia", "Bighorn"];
  } else if (element.value === "Columbia") {
   cities = ["Washington"];
  }
  var concatString = "<option value=\"\">Select</option>";
  for (var i = 0; i < cities.length; i++) {
   concatString += "<option>" + cities[i] + "</option>";
  }
  obj.state = element.value;
  concatString = "<select class=\"custom-select\" required=\"required\" id=\"cityname\" onchange=\"cityvalue(this)\">" + concatString + "</select>";
  $("#output2").html(concatString);
 }
 
 /**
  * This is a function cityvalue which is used to store the final city value
  * @param {object} element - A option object
  * 
  * @example
  *     foo(cityOption)--> city option dropdown is passed
  */
 function cityvalue(element) {
  obj.city = element.value; //getting the value of the value
  dropdown.push(obj);
  // console.log(map);
  city = element.value;
 }