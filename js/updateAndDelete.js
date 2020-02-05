
 /**
  * This is a function called when the user clicks the delete button, it deletes the user from the table.
  *
  * @param {rowIndex} element - A row object
  * @return nothing
  *
  * @example
  *    deleteUser(element)-->from this element we get RowIndex no. 
  */
 function deleteUser(element) {
 
  //dialogbox asks whether the user wants to continue or not
  Swal.fire({
   title: 'Are you sure?',
   text: "You won't be able to revert this!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
   if (result.value) {
    $("table tr:eq(" + element.parentNode.parentNode.rowIndex + ")").remove();
    id--;
    //if users is 1 then no data, so add the text above the table.
    if (id === 1) {
     $("#usercreate").text("Please create new users");
    }
   } else {
    Swal.fire(
     'User not deleted',
     'Don\'t worry!',
     'success'
    )
   }
  })
 }
 /**
  * This is a editUser() function accepts the current object passed as this which will be used 
  *  to track current user
  *
  * @param {object} user - A row object
  * @return nothing
  *
  * @example
  *
  *     editUser(object)-->from this row object we extract the text values of all the field
  */
 //
 function editUser(user) {
  // debugger;
  
  if ($("#firstname").val() !== "" || $("#lastname").val() !== "") {
   var clear = confirm("Your entered will be cleared. Do you want to continue");
   if (clear === false) { //scenario when form is dirty, so if it doesn"t want to override values we simply return
    return;
   }
   if (clear == true) { //if user wants to override and edit the values then there must be dropdowns so we remove it
    //reason to put here  as if the below code is put in the code then there will be a problem for select tag as select
    //tags and options are not yet created for the user and hence it wouldn"t work. 
    // $("#dropdown").val("India").change();
   }
  }
 
  todelete = $(user).parents("tr")[0].rowIndex;
  delId = $(user).parents("tr")[0].cells[0].innerText;
  var col2 = $(user).parents("tr")[0].cells[1].innerText; // get current row 2nd  cell TD value
  var col3 = $(user).parents("tr")[0].cells[2].innerText; // get current row 3rd  cell  TD value
  var col4 = $(user).parents("tr")[0].cells[3].innerText; // get current row 4th  cell TD value
  var col5 = $(user).parents("tr")[0].cells[4].innerText; // get current row 5th  cell TD value
 
  $("#submit").val("Save");
  inputfname.val(col2);
  inputlname.val(col3);
  inputemailid.val(col4);
  $("#contactno").val(col5);
  $("#pwd").val("**********");
  $("#dropdown").val(map.get(col2).country).change();
  $("#states").val(map.get(col2).state).change();
  $("#cityname").val(map.get(col2).city).change();
  
  bool = true;
  scrollToTop();
 }
 