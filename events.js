/** 
 * dom event triggers the function formsubmit function
 * on submit of the form
 * 
*/
$('#form').on('submit', registrationformaction.formsubmit);
$('#userdetails').on('submit', registrationformaction.fetchdetails);
$('#subscription-mail').on('submit',registrationformaction.deleteuserdetails);

$('#exampleModal').on('hidden.bs.modal', function (e) {//bootstrap modal closing function
  $("#userid").val("");
  $("#userpwd").val("");
  $(".invalidId").text("");
});


function showRegisterPage(){

  $(".change").hide();
  $(".hidenav").show();
  $(".ordering").show();
  $(".third-card").show();
  $(".hidecards").show();
  $(".hidelastcard").show();
  $(".last-card").show();
  $(".delete").hide();
}

$("#colorpick").change(registrationformaction.backgroundColor);