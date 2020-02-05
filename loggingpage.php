<?php session_start();
include "dbutil.php";

  $id=$_POST['userid'];
  $password=md5($_POST['pwd']);
  // $id="re@gmail.com";
  // $password=md5("Raj@1");
  $_SESSION["searchid"] = "$id";
  $_SESSION["searchpwd"]="$password";
  $checkuser="SELECT * FROM users WHERE EMAIL_ID = '".$_SESSION['searchid']."'";
  $sql= "SELECT * FROM users WHERE EMAIL_ID = '".$_SESSION['searchid']."' AND  PWD ='$password'";
  $userexist=mysqli_query($link, $checkuser);
  $checkresult=mysqli_num_rows($userexist);

  $result = mysqli_query($link, $sql);
  $numrows = mysqli_num_rows($result);
  // echo $numrows;
  if($numrows>0){
     json_encode(array('success' => 1));
    // $value=1;
  }else if($checkresult===0){
    // echo json_encode(array('success' => -1));
    echo json_encode(array('success' => 0));
    exit();
  }else{
    // echo json_encode(array('success' => 0));
    echo json_encode(array('success' => -1));
    exit();
  }
  // Check connection
if($link === false){
  die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Attempt select query execution
if($_SESSION["searchid"]){
  $sql= "SELECT * FROM users WHERE EMAIL_ID = '".$_SESSION['searchid']."' AND  PWD ='".$_SESSION['searchpwd']."'";
}
if($result = mysqli_query($link, $sql)){
  if(mysqli_num_rows($result) ==1){
    while($row = mysqli_fetch_array($result)){
      $fname=$row['FIRST_NAME'];
      $lname=$row['LAST_NAME'];
      $useremail=$row['EMAIL_ID'];
      $usercontact=$row['CONTACT_NO'];
      $id=$row['ID'];
    }
  }
}
echo json_encode(array('success' => 1,'fname' => $fname,'lname' => $lname,'email' => $useremail,'contactno' => $usercontact));

session_destroy();
mysqli_close($link);

  //1st check-> for 1 response if user exist
  //2nd check-> for -1 response if user is not registered
  //3rd check->if user enters wrong credentials.

?>