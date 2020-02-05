<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS,PUT, DELETE");
header('Content-Type: application/json');
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;
// $app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
//     $name = $args['name'];
//     $response->getBody()->write("Hello, $name");

//     return $response;
// });

// $app->get('/countries',function(Request $request, Response $response, array $args)use($countries){
//     return $response->withJson($countries);
// });

$app->post('/users',function(Request $request, Response $response, $args) use($app) {

    // $parsedBody = $request->getBody();
   
    // $email = $parsedBody['email'];
    

    $fname = $request->getParam('fname');
    $lname = $request->getParam('lname');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');

    //handle for blank

    $password=md5($request->getParam('pwd'));
    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");
    $sql = "INSERT INTO users(first_name,last_name,email_id,contact_no,pwd) VALUES ('$fname','$lname','$email','$phone','$password');";
    // mysqli_query($link, $sql);
    if(mysqli_query($link, $sql)){
        return $response->withJson(array("success" => 1, "emailId" => $email ,"fname"=>$fname,"lname"=>$lname,"contactno"=>$phone),200);
    }else{
        return $response->withJson(array("success" => 0));
    }
    
});

$app->get('/profile',function(Request $request, Response $response, array $args) {

    $usermail = $request->getParam('emailId');
    $password=md5($request->getParam('pwd'));
    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");
    $checkuser="SELECT * FROM users WHERE EMAIL_ID = '$usermail'";
    $userexist=mysqli_query($link, $checkuser);
    $checkresult=mysqli_num_rows($userexist);
    $sql= "SELECT * FROM users WHERE EMAIL_ID = '$usermail' AND  PWD = '".$password."'";
    $result = mysqli_query($link, $sql);
    $numrows = mysqli_num_rows($result);
    if(mysqli_num_rows($result)>0){
        while($row = mysqli_fetch_array($result)){
            $fname=$row[0];
            $lname=$row[1];
            $useremail=$row[2];
            $usercontact=$row[3];
            return $response->withJson(array("success" => 1, "emailId" => $useremail ,"fname" => $fname,"lname" => $lname,"contactno" => $usercontact),200);
        }
    }else if($checkresult===0){
        return $response->withJson(array("success" => -1));
    }else{
        return $response->withJson(array("success" => 0));
    }

});

$app->delete('/deleteprofile',function(Request $request, Response $response) use($app) {

    $usermail = $request->getParam('emailId');
    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");

    $sql= "DELETE FROM users WHERE EMAIL_ID ='".$usermail."'";
    $result = mysqli_query($link,$sql);
    if(mysqli_affected_rows($link)){
        return $response->withJson(array("success" => 1),200);
    }else{
        return $response->withJson(array('success' => 0));
    }
    
});

$app->put('/updateprofile',function(Request $request, Response $response) use($app) {

    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");
  
    $fname = $request->getParam('fname');
    $lname = $request->getParam('lname');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');

    $sql= "UPDATE users set first_name='$fname',last_name='$lname',contact_no='$phone',email_id='$email' WHERE email_id = '$email'";

    if(mysqli_query($link, $sql)){
        return $response->withJson(array("success" => 1),200);
    }else{
        return $response->withJson(array('success' => 0));
    }
});

$app->run();