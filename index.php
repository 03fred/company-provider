<?php 

session_start();
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

require_once("vendor/autoload.php");
require_once("service/CompanyService.php");
require_once("domain/Company.php");
require_once("service/ProviderService.php");
require_once("domain/Provider.php");
require_once("config.php");

$app = new \Slim\App;

// Fetch DI Container
$container = $app->getContainer();

// Register provider
$container['flash'] = function () {
    return new \Slim\Flash\Messages();
};

$app->get('/', function () {
  header("Location:pages/index.html");
  exit;
  });

  $app->post('/register-company', function () {
    $service = new CompanyService();
    $company = new Company($_POST['businessName'], $_POST['cnpj'],$_POST['uf']);
    $service->insert($company);
  });
  
  $app->post('/register-provider', function() {
    $service = new ProviderService();
    $provider = new Provider($_POST['name'], $_POST['cpfCnpj'],$service->dateNow(),$_POST['companyId']);
    $service->insert($provider);
    
  });

  $app->get('/find-all-company', function(){
    $service = new CompanyService();
     echo json_encode($service->listAll());
     exit;
    });



$app->run();
?>
