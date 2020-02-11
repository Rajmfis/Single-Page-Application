
 
 var registrationformaction = (function() {
  /**
   * The method is called on submitting the form. 
   * It captures the inputs @emailId @contactno @firstname @lastname @password
   * there is a method called to store all the inputs in a table "createTable()"
   * "resetForm()" is called to clear all the input fields 
   */
  function submitAction(event) {
    
    if($("#firstname").val()==''&&$("#lastname").val()==''&&$("#contactno").val()==''&&$("#emailId").val()==''&&$("#pwd").val()==''){
      return;
    }
    
    event.preventDefault();
    event.stopImmediatePropagation();
    
    var jsonObj={
      "fname":$("#firstname").val(),
      "lname":$("#lastname").val(),
      "phone":$("#contactno").val(),
      "email":$("#emailId").val(),
      "pwd":$("#pwd").val(),
    };
    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/users',
      crossDomain: true,
      dataType: 'json',
      data: jsonObj,
      success: function(response){
        var jsonData = response;
        if(jsonData.success === 1){
          htmlValue='<nav class="nav navbar navbar-expand-lg navbar-light " style="background-color: #68a5d1;">'+
          '<a class="navbar-brand" href="#" style="font-family: \'Courgette\', cursive;\
          ;font-size: xx-large;">Grab Coupon</a>'+
           '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>'+
           '</button>'+
           '<div class="collapse navbar-collapse" id="navbarText">'+
             '<ul class="navbar-nav ml-auto">'+
               '<li class="nav-item"> <a class="nav-link" href="#"><span style="color:whitesmoke;font-size: x-large;">Home</span></a>'+
               '</li>'+
               '<li class="nav-item needmargin"> <a class="nav-link" href="#"><span style="color:whitesmoke;font-size:x-large;">Subscription</span></a>'+
                       '</li>'+
               '<li class="nav-item needmargin"> '+
                 '<a class="nav-link" href="#" onclick="showRegisterPage();"'+
                   '<span style="color:whitesmoke;font-size:x-large;">Logout</span></a>'+
               '</li>'+
             '</ul>'+
           '</div>'+
        '</nav>'+
        '<div class="profile-info">'+
          '<div class="row">'+
         '<div class="col-sm-6">'+
           '<div class="card">'+
             '<div class="card-body">'+
               '<h5 class="card-title">Welcome '+jsonData.fname+'</h5>'+
               '<p class="card-text">You are subscribed for our Services</p>'+
               '<a href="#" class="btn btn-primary">Explore more about new Services</a>'+
             '</div>'+
           '</div>'+
         '</div>'+
         '<div class="col-sm-6">'+
           '<div class="card">'+
             '<div class="card-body">'+
               '<h5 class="card-title">Profile Details: </h5>'+
               '<p class="card-text">Name: '+jsonData.fname+' '+jsonData.lname+'</p>'+
               '<p class="card-text">Email: '+jsonData.emailId+'</p>'+
               '<p class="card-text">Contact Details: '+jsonData.contactno+'</p>'+
               '<a href="#" class="btn btn-primary">Change Password</a>'+
             '</div>'+
           '</div>'+
         '</div>'+
        '</div>'+
       '</div>';
      // $('.loader').fadeOut(2000);//not working??
          $(".change").show();
          $(".change").html(htmlValue);
          
          $('#exampleModal').modal('hide');
          //hidelastcard,ordering,hidenav
          $(".hidenav").hide();
          $(".ordering").hide();
          $(".third-card").hide();
          $(".hidecards").hide();
          $(".hidelastcard").hide();
          $(".last-card").hide();
          resetForm();
        }else{
          alert("Email  Id Already exists. Please enter another email ID");
        }
      }
    });
  }

  function fetchname(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var jsonData={
      // "emailId":$("#usermail").val(),
      // "pwd":$("#userpassword").val()
      "id":$("#userid").val(),
      "pwd":$("#userpwd").val()
      // "key":"IVJhakAxOTk3MDQj"
    };
      $.ajax({
        type: "post",
        url: 'http://localhost:8080/users/'+jsonData.id,
        crossDomain: true,
        dataType: 'json',
        data:jsonData,
        success: function(response){
          try {
            var jsonData = response;
            if (jsonData.success === 1){
              htmlValue='<nav class="nav navbar navbar-expand-lg navbar-light " style="background-color: #68a5d1;">'+
          '<a class="navbar-brand" href="#" style="font-family: \'Courgette\', cursive;\
          ;font-size: xx-large;">Grab Coupon</a>'+
           '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>'+
           '</button>'+
           '<div class="collapse navbar-collapse" id="navbarText">'+
             '<ul class="navbar-nav ml-auto">'+
               '<li class="nav-item"> <a class="nav-link" href="#"><span style="color:whitesmoke;font-size: x-large;">Home</span></a>'+
               '</li>'+
              //  '<li class="nav-item"> <a class="nav-link" id="delbtn" href="#"><span style="color:whitesmoke;font-size: x-large;">DeleteUser</span></a>'+
              '</li>'+
               '<li class="nav-item needmargin"> <a class="nav-link" href="#"><span style="color:whitesmoke;font-size:x-large;">Subscription</span></a>'+
                       '</li>'+
               '<li class="nav-item needmargin"> '+
               
                 '<a class="nav-link" href="#" onclick="showRegisterPage();"'+
                   '<span style="color:whitesmoke;font-size:x-large;">Logout</span></a>'+             
               '</li>'+
             '</ul>'+
           '</div>'+
        '</nav>'+
        '<div class="profile-info">'+
          '<div class="row">'+
         '<div class="col-sm-6">'+
           '<div class="card">'+
             '<div class="card-body">'+
               '<h5 class="card-title">Welcome '+jsonData.fname+'</h5>'+
               '<p class="card-text">You are subscribed for our Services</p>'+
               '<a href="#" class="btn btn-primary">Explore more about new Services</a>'+
             '</div>'+
           '</div>'+
         '</div>'+
         '<div class="col-sm-6">'+
           '<div class="card">'+
             '<div class="card-body">'+
               '<h5 class="card-title">Profile Details: </h5>'+
               '<p class="card-text">Name:'+jsonData.fname+' '+jsonData.lname+'</p>'+
               '<p class="card-text">Email:'+jsonData.emailId+'</p>'+
               '<p class="card-text">Contact Details:'+jsonData.contactno+'</p>'+
               '<a href="#" class="btn btn-primary">Change Password</a>'+
             '</div>'+
           '</div>'+
         '</div>'+
        '</div>'+
       '</div>';
       $('#exampleModal').modal('hide');
       $(".change").show();
       $(".change").html(htmlValue);
       //hidelastcard,ordering,hidenav
       $(".hidenav").hide();
       $(".ordering").hide();
       $(".third-card").hide();
       $(".hidecards").hide();
       $(".hidelastcard").hide();
       $(".last-card").hide();
      }else{
        $(".invalidId").text(response.errormessage);
      }
      }catch (error) {
        alert("Error occurred while parsing json "+error);
      }
    }
   });
  }

  function deleteUser(){
    
    if($("#subsmail").val()==''){
      alert("please enter the id");
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    var form = $("#subscription-mail");
    var originalContent = form.html();
    var jsonData={
      "id":$("#subsmail").val()
    };
      $.ajax({
        type: "delete",
        url: 'http://localhost:8080/users/'+jsonData.id,
        crossDomain: true,
        dataType: 'json',
        // data: jsonData,
        statusCode: {
          204: function() {
            form.html("<h3>User Deleted</h3>");
                setTimeout(function() {
                form.html(originalContent);
              }, 5000);
          }
        },
        success: function(response){
          try {
            var jsonData = response;
            if (jsonData.success === 0){
              // form.html("<h3>User Deleted</h3>");
              //   setTimeout(function() {
              //   form.html(originalContent);
              // }, 5000);
            // }else{
              form.html("<h3>User doesn't exist</h3>");
              setTimeout(function() {
              form.html(originalContent);
            }, 5000);
            }
          }catch (error) {
            // alert("Error occurred while parsing json "+error);
          }
        }
      });
  }

  function changeBackgroundColor() {
   $("body").css("background-color", $("#colorpick").val());
  } 
  /**
  * This is a function resetform() is called for clearing all the inputfields
  * @example
  * resetForm()
  */
  function resetForm() { //the method is called from validate, when all the records are submitted and 
    //put in the table
   inputfname.val("");
   inputlname.val("");
   inputemailid.val("");
   $("#contactno").val("");
   $("#pwd").val("");
   $("#dropdown").val("");
   $("#states").remove();
   $("#cityname").remove();
 
  }
 
  /**
   * This is called on submitting the form for creating the table
   *
   * @param {string} firstname - A string param
   * @param {string} lastname - A string param
   * @param {string} inputEmail - A string param
   * @param {string} phone - A string param
   * 
   * @return void
   *
   * @example
   *     createTable('raj','yadav','raj@gmail.com','70894048393')
   */
  function createTable(firstname, lastname, inputEmail, phone) {
   //it is used to create table row and columns everytime when the user submits the details in the form
   var mytable = $("table");
   oldId = id;
   //the block checks if there is any row to delete
   if (bool === true && todelete !== undefined) {
    $("table tr:eq(" + todelete + ")").remove();
    bool = false;
    todelete = undefined;
    id = delId;
   }
 
   var row = "<tr id=\"data\"><td>" + id + "</td><td>" +
    firstname + "</td><td>" + lastname + "</td><td>" + inputEmail + "</td><td>" + phone + "</td><td>" + city + "</td><td>" + "<button onclick=\"deleteUser(this);\"><i class=\"far fa-trash-alt\"></i></button> <button onclick=\"editUser(this);\"><i class=\"fas fa-edit\"></i></button>" + "</td></tr>";
   mytable.append(row); //append method is used with jquery for table
  //  alert('in the edit function');
   $("#submit").val("Submit");
   $("#usercreate").text("");
   id = oldId + 1;
   map.set(firstname, obj);
   obj = {};
  }

  return {
   formsubmit: submitAction,
   backgroundColor: changeBackgroundColor,
   createrowdata:createTable,
   fetchdetails:fetchname,
   deleteuserdetails:deleteUser
  }
 })();
 