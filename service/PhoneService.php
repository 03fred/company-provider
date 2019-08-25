<?php
require_once("dao/PhoneDao.php");
require_once("domain/Phone.php");
require_once("dao/UtilsDao.php");

class PhoneService{
    
    public function insert($provider_id,$phones){ 
    $phoneDao = new PhoneDao();
    foreach ($phones as $key => $value){
     $phoneDao->insert($provider_id,$value);
    }
        
}

public function listPhoneForProviderId($id){ 
    $dao = new UtilsDao();
    $query = "select * from phone where provider_id = ".$id;
   return  $dao->list($query);
  }

}
