<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;
$app->get('/api/userlist', function (Request $request, Response $response, array $args) {

    $sql="SELECT* FROM USERS";
    $link = mysqli_connect("localhost", "raj", "Raj@199704", "couponusers");
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_array($result);
    return $response->withJson($row);
});

$app->run();