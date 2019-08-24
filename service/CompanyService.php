<?php
require_once("dao/CompanyDao.php");
require_once("domain/Company.php");

class CompanyService{
  
    public function insert($data){ 
    $companyDao = new CompanyDao();
    $companyDao->insert($data);
}

public function listAll(){ 
    $companyDao = new CompanyDao();
   return  $companyDao->listAll();
}

}



?>