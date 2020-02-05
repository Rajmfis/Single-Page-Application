// the below selectors are the div tag selectors
const divfname=$('#firstName');
const divlname=$('#lastName');
var divmail=$('#Email');
const divcontact=$('#Contact');
const divpwd=$('#Password');

//the below selectors are the input fields selectors
const inputfname=$('#firstname');
const inputlname=$('#lastname');
const inputemailid=$('#emailId');
const inputcontactno=$('#contactno');

//regex code
var regexEmailPattern = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,10}).([a-z]{2,10}?)$/;
var regexPhonePattern = /^([0-9]{10,11})$/;

