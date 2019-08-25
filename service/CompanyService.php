<?php
require_once("dao/CompanyDao.php");
require_once("dao/UtilsDao.php");
require_once("domain/Company.php");
$utilsDao = new UtilsDao();
$companyDao = new CompanyDao();

class CompanyService{

    public function insert($data){ 
    global $companyDao;
    $companyDao->insert($data);
}

public function listAll(){ 
    global $utilsDao;
    $query = "select * from company";
   return  $utilsDao->list($query);
}

public function findById($id){ 
   global $utilsDao;
    $query = "select * from company where id_company =".$id;
   return  $utilsDao->findById($query);

}

}



?>