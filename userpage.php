<?php session_start();
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
include "dbutil.php";

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$firstname = $_POST['firstName'];
$lastname = $_POST['lastName'];
$emailId = $_POST['email'];
$contact = $_POST['contact'];
$password=md5($_POST['password']);
$_SESSION["username"] = "$firstname";
$_SESSION["searchid"]="";

if($firstname===''||$lastname===''||$emailId===''||$contact===''||$password===''){
   echo json_encode(array('success' => -1));
   exit;
}

$app = new \Slim\App;
$app->post('/users', function (Request $request, Response $response, array $args) use ($app)  {  

   $sql = "INSERT INTO users(first_name,last_name,email_id,contact_no,pwd) VALUES ('$firstname','$lastname','$emailId','$contact','$password');";

   if(mysqli_query($link, $sql)){//see the return values
      // $app->response()->headers->set('Content-Type', 'application/json');
      // echo json_encode(array("status" => "success", "code" => 1));
      // $app->$response->withJson(array('success' => 1,'fname'=>$firstname,'lname'=>$lastname,'email'=>$emailId,'contactno'=>$contact));

      // $req = $app->request();
      //  echo json_encode($req->post(array('success' => 1,'fname'=>$firstname,'lname'=>$lastname,'email'=>$emailId,'contactno'=>$contact)));
      // $response->getBody()->write(json_encode(array('success' => 1,'fname'=>$firstname,'lname'=>$lastname,'email'=>$emailId,'contactno'=>$contact)));
      // $response->body(json_encode(array('success' => 1,'fname'=>$firstname,'lname'=>$lastname,'email'=>$emailId,'contactno'=>$contact)));
      return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode(array('success' => 1,'fname'=>$firstname,'lname'=>$lastname,'email'=>$emailId,'contactno'=>$contact)));


   }else{
      echo json_encode(array('success' => 0));
   }
});
$app->run();
echo json_encode(array('success' => 1,'fname'=>$firstname,'lname'=>$lastname,'email'=>$emailId,'contactno'=>$contact));
mysqli_close($link);
?>