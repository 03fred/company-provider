<?php 

session_start();
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

require_once("config.php");
require_once("vendor/autoload.php");
require_once("service/CompanyService.php");
require_once("domain/Company.php");
require_once("service/ProviderService.php");
require_once("utils/Utils.php");
require_once("domain/Provider.php");
require_once("service/PhoneService.php");



$app = new \Slim\App();


$app->get('/', function () {
  Utils::redirecPageInitial();
  exit;
  });

  $app->post('/register-company', function () {
    $service = new CompanyService();
    $company = new Company($_POST['businessName'], $_POST['cnpj'],$_POST['uf']);
    $service->insert($company);
    Utils::redirecPageInitial();
  });
  
  $app->post('/register-provider', function() {
    $service = new ProviderService();
    $birth = '';
    $rg = '';
   if(isset($_POST['birth']) && isset($_POST['birth'])){
    $birth = $_POST['birth'];
    $rg = $_POST['birth'];
   }else{
    $birth = null;
    $rg = null;
   }

    $provider = new Provider($_POST['name'], $_POST['cpfCnpj'],$service->dateNow(),$_POST['companyID'],$birth,$rg);
    $data = $service->insert($provider);
    $phoneService = new PhoneService();
    $phoneService->insert($data[0]['id_provider'],$_POST['phones']);
    Utils::redirecPageInitial();
    echo $provider;
    exit;
  });

   $app->get('/find-all-company', function(){
    $service = new CompanyService();
     echo json_encode($service->listAll());
     exit;
    });

    $app->get('/find-providers/{id}', function ($request, $response, $args) {
      $service = new ProviderService();
      $providers = $service->listProviderForCompanyId($args['id']);
      echo json_encode($providers);
      exit;
     });


     $app->get('/find-phones/{id}', function ($request, $response, $args) {
      $phoneService = new PhoneService();
      $phones = $phoneService->listPhoneForProviderId($args['id']);
      echo json_encode($phones);
      exit;
     });

     $app->get('/find-provider-param/{searchValue}/{value}', function ($request, $response, $args) {

      $service = new ProviderService();
      switch($args['searchValue']){
      case '1':
      $data = $service->findByName($args['value']);
      break;
      case '2':
      $data = $service->findByDateRegisterOrCpfCnpj("cpf_cnpj",Utils::returnNumber($args['value']));
      break;
      case '3':
      $data = $service->findByDateRegisterOrCpfCnpj("date_register",$args['value']);
      break;
      default:
      break;
      }
     
      echo json_encode($data);
      exit;
     });


$app->run();
?>
