<?php
require_once("dao/ProviderDao.php");
require_once("domain/Provider.php");

class ProviderService{
  
    public function insert($data)
{ 
    $providerDao = new ProviderDao();
    $providerDao->insert($data);
}

static function dateNow(){
    setlocale(LC_ALL, 'pt_BR.utf-8', 'pt_BR', 'Portuguese_Brazil');
    date_default_timezone_set('America/Sao_Paulo');
    return date("Y-m-d H:i:s");


}

}



?>