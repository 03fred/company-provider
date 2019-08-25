<?php
require_once("dao/CompanyDao.php");
require_once("dao/UtilsDao.php");
require_once("domain/Company.php");

class CompanyService{
  
    public function insert($data){ 
    $dao = new CompanyDao();
    $dao->insert($data);
}

public function listAll(){ 
    $dao = new UtilsDao();
    $query = "select * from company";
   return  $dao->list($query);
}

public function findById($id){ 
    $dao = new UtilsDao();
    $query = "select * from company where id_company =".$id;
   return  $dao->findById($query);

}

}



?>