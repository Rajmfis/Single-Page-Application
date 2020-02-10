


/**
 * This is a function which is being called when the 
 * document is loaded on the browser. The validations are 
 * for @phonenumber and @emailid  
 * @firstName @lastName @passowrd @region are the required fields.
 */

(function() {
  
  $('.loader').fadeOut(2000);

  $('[data-toggle="popover"]').popover(); 
  $('[data-toggle="tooltip"]').tooltip();

  //the function validates the phone,email,password fields
  jQuery.validator.addMethod("customEmail", function(value, element) {
   return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
  }, "Please enter valid email address!");
  jQuery.validator.addMethod("phone", function(value, element) {
   return this.optional(element) || /^([0-9]{10,11})+$/.test(value);
  }, "Please enter valid phone number!");
  $.validator.addMethod("pwcheck", function(value) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[A-Z]/.test(value);
  });
  var registerForm = $("#form");
  var subscribeMail=$("#subscription-mail");
  
  // subscribeMail.validate({
  //   onkeyup: function(element) {
  //     $(element).valid()
  //    },
  //    rules:{
  //     email: {
  //       required: true,
  //       customEmail: true
  //      },
  //    },
  //    messages:{
  //     email: {
  //       required: 'Please enter email!',
  //       email: 'Please enter valid email!'
  //      },
  //    }
  // });

  // if(firstname&&lastname&&password&&inputEmail&&phone){
  registerForm.validate({
   onkeyup: function(element) {
    $(element).valid()
   },
   rules: {
    firstName: {
     required: true,
    },
    lastName: {
     required: true,
    },
    email: {
     required: true,
     customEmail: true
    },
    contact: {
     required: true,
     phone: true
    },
    password: {
     pwcheck: true
    },
    region: {
     required: true
    },
   },
   messages: {
    firstName: {
     required: 'Please enter first name!'
    },
    lastName: {
     required: 'Please enter last name!'
    },
    username: {
     required: 'Please enter username!'
    },
    email: {
     required: 'Please enter email!',
     email: 'Please enter valid email!'
    },
    contact: {
     required: 'Please enter phone number',
     phone: 'please enter valid phone number'
    },
    password: {
     required: 'Please enter password!',
     pwcheck:'Please enter Password consisting of atleast One capital letter, one small letter, one special character, one number'
    },
    region: {
     required: "Please select an option from the list"
    },
   }
  });
 
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../jsonfile/userjsondata.json", true);
  xhr.onload = function() {
   if (this.status === 200) {
    // console.log(this.responseText);
    const userDetails = JSON.parse(this.responseText);
 
    for (var counter = 0; counter < userDetails.length; counter++){
     city = userDetails[counter].City;
     obj.country = userDetails[counter].Country;
     obj.state = userDetails[counter].State;
     obj.city = userDetails[counter].City;
     map.set(userDetails[counter].FirstName,obj);
     registrationformaction.createrowdata(userDetails[counter].FirstName,
      userDetails[counter].LastName,
      userDetails[counter].Email, userDetails[counter].ContactNo,
      userDetails[counter].Pwd);
    }
 
    // alert(userDetails[randomUserIndex].FirstName);
    //passing the values we got from the json and
    //storing into the html table once the page is loaded
 
    //can"t keep dropdown values explitcitly
    //as on selection of one other generates so can"t be kept
    //as first only is not there
   }
  }
  xhr.send();
 })();
 
//adding events in js is removing the message. try to find out ?????
//  $('#subscription-mail').submit(function emailSubscribe(e){

//   if($('#subsmail').val()===''){
//   //  alert('Please enter your email id');
//   }
//   clearSubscriptionInput($('#subsmail').val());
//   e.preventDefault();
//  });

 function clearSubscriptionInput(inputEmail){

  myFunction();
  $('#subsmail').val('');
 }

 function myFunction() {
  var form = $("#subscription-mail");
  var originalContent = form.html();
  form.html("<h3>Please click on the link sent to your mail and Confirm</h3>");
  setTimeout(function() {
    form.html(originalContent);
  }, 5000);
 }