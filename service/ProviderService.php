<?php
require_once("dao/ProviderDao.php");
require_once("dao/UtilsDao.php");
require_once("domain/Provider.php");

class ProviderService{
  
    public function insert($data){ 
    $providerDao = new ProviderDao();
    return $providerDao->insert($data);
   }

 public function dateNow(){
    setlocale(LC_ALL, 'pt_BR.utf-8', 'pt_BR', 'Portuguese_Brazil');
    date_default_timezone_set('America/Sao_Paulo');
    return date("Y-m-d H:i:s");


}

public function listAll(){ 
  $dao = new UtilsDao();
  $query = "select * from provider";
 return  $dao->list($query);
}

public function listProviderForCompanyId($id){ 
  $dao = new UtilsDao();
  $query = "select * from provider where company_id = ".$id;
  $list = $dao->list($query);
 return ProviderService::dateFormatArray($list);
}

public static function dateFormatArray($list){
  if(count($list) > 0){
    foreach($list as $key=>$value){
      $list[$key]['date_register'] = date("d/m/Y", strtotime($value['date_register']));
    }
    return $list;
  }
}

}



?>