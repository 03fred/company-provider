<?php
require_once("dao/PhoneDao.php");
require_once("domain/Phone.php");

class PhoneService{
    
    public function insert($provider_id,$phones){ 
    $phoneDao = new PhoneDao();
    foreach ($phones as $key => $value){
     $phoneDao->insert($provider_id,$value);
    }
        
}

public function listAll(){ 
    $phoneDao = new PhoneDao();
   return  $phoneDao->listAll();
}

}
