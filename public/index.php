<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS,PUT, DELETE");
header('Content-Type: application/json');
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;


$mw = function ($request, $response, $next) {
    // $response->getBody()->write('BEFORE');
    //add validation here :
    // $parsedBody = $request->getParsedBody();
    if($request->getParam('key')==='IVJhakAxOTk3MDQj'){
       return $next($request, $response);
    }else{
        return $response->withJson(array("success" => 0,"errormessage"=>"Authorized key not matched","error code"=>401),401);
    }

};

$app->post('/users',function(Request $request, Response $response){

    $fname = $request->getParam('fname');
    $lname = $request->getParam('lname');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');

    // $parsedBody = $request->getParsedBody();
    // $fname = $parsedBody['fname'];
    // $lname = $parsedBody['lname'];
    // $phone = $parsedBody['phone'];
    // $email = $parsedBody['email'];

    $password=md5($request->getParam('pwd'));
    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");
    $checkuser="SELECT * FROM users WHERE EMAIL_ID = '$email'";
    $userexist=mysqli_query($link, $checkuser);
    $checkresult=mysqli_num_rows($userexist);
    if($checkresult){
        return $response->withJson(array("success" => 0,"errormessage"=>"Email_Id already exists","error code"=>200),200);
    }

    $sql = "INSERT INTO users(first_name,last_name,email_id,contact_no,pwd) VALUES ('$fname','$lname','$email','$phone','$password');";
    
    if(mysqli_query($link, $sql)){
        $id_Fetch="SELECT ID FROM USERS WHERE EMAIL_ID='$email'";
        $row=mysqli_fetch_array(mysqli_query($link, $id_Fetch));
        return $response->withJson(array("success" => 1, "emailId" => $email ,"fname"=>$fname,"lname"=>$lname,"contactno"=>$phone,"ID"=>$row['ID']),201);
    }

})->add($mw);

$app->post('/users/{id}',function(Request $request, Response $response, array $args)  use($app){

    // $usermail = $request->getParam('emailId');
    // $password=md5($request->getParam('pwd'));
    $id = $args['id'];
    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");
    $checkuser="SELECT * FROM users WHERE ID = '$id'";
    $userexist=mysqli_query($link, $checkuser);
    $checkresult=mysqli_num_rows($userexist);
    $sql= "SELECT * FROM users WHERE ID = '$id'";
    $result = mysqli_query($link, $sql);
    $numrows = mysqli_num_rows($result);
    if($numrows>0){
        while($row = mysqli_fetch_array($result)){
            $fname=$row[0];
            $lname=$row[1];
            $useremail=$row[2];
            $usercontact=$row[3];
            return $response->withJson(array("success" => 1, "emailId" => $useremail ,"fname" => $fname,"lname" => $lname,"contactno" => $usercontact),200);
        }
    }
    return $response->withJson(array("success" => 0,"errormessage"=>"User Doesn't exist","status code"=>200),200);
});

$app->delete('/users/{id}',function(Request $request, Response $response, array $args){

    $userId = $args['id'];
    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");

    $sql= "DELETE FROM users WHERE ID ='$userId'";
    $result = mysqli_query($link,$sql);
    if(mysqli_affected_rows($link)){
        return $response->withJson(array(),204);
    }
    return $response->withJson(array('success' => 0,'errormessage'=>'user doesn\'t exist'),200);
    // }
    
});

$app->put('/users/{id}',function(Request $request, Response $response,array $args)  use($app) {

    $userId = $args['id'];
    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");
  
    //keeping here getparsed body() throwing warning
    // $parsedBody = $request->getParsedBody();
    // $fname = $parsedBody['fname'];
    // $lname = $parsedBody['lname'];
    // $phone = $parsedBody['phone'];
    // $email = $parsedBody['email'];

    $fname = $request->getParam('fname');
    $lname = $request->getParam('lname');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $checkuser="SELECT * FROM users WHERE ID = '$userId'";
    $userexist=mysqli_query($link, $checkuser);
    $checkresult=mysqli_num_rows($userexist);
    // print_r($checkresult);
    // exit();
    if($checkresult){
        $sql= "UPDATE users set first_name='$fname',last_name='$lname',contact_no='$phone',email_id='$email' WHERE ID = '$userId'";
        return $response->withJson(array("success" => 1,"message"=>"succesfully updated"),200);
    }
    return $response->withJson(array("success" => 0,'message'=>'User Doesn\'t Exist'),400);
    
});

$app->run();