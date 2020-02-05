<?php session_start();

/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
include "dbutil.php";

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

if($value===-1){
  echo json_encode(array('success' => -1));
  exit();
}else{
  echo json_encode(array('success' => 0));
  exit();
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
      echo json_encode(array('success' => 1,'fname'=>$fname,'lname'=>$lname,'email'=>$useremail,'contactno'=>$usercontact));
    }
}

session_destroy();
mysqli_close($link);

?>
