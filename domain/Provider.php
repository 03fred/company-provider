<?php
require_once('utils/validations/CpfCnpjValidation.php');

class Provider{
  
    private $id;
    private $name;
    private $cpfCnpj;
    private $dateRegister;
    private $companyId;
   

    public function __construct($name,$cpfCnpj,$dateRegister,$companyId){
        $this->setName($name);
        $this->setCpfCnpj($cpfCnpj);
        $this->setDateRegister($dateRegister);
        $this->setCompanyId($companyId);
       
    }

    public function getId(){
        return $this->id;
    }
    
    public function setId($id){
         $this->id = $id;
    }

    
    public function getName(){
        return $this->name;
    }
    
    public function setName($name){
         $this->name = $name;
    }

    public function setCompanyId($companyId){
         $this->companyId = $companyId;
    }
    
    public function getCompanyId(){
        return $this->companyId;
    }
    

    public function setCpfCnpj($cpfCnpj){
        $cpfCnpj = Provider::returnNumber($cpfCnpj);
     if(CpfCnpjValidation::validar_cnpj($cpfCnpj) || CpfCnpjValidation::validarCpf($cpfCnpj)){
       $this->cpfCnpj = $cpfCnpj;
     }
     
   }
   
   public function getCpfCnpj(){
       return $this->cpfCnpj;
   }
   

    public function setDateRegister($dateRegister){
         $this->dateRegister = $dateRegister;
    }
    public function getDateRegister(){
        return $this->dateRegister;
    }
    
  

    public function __toString()
    {
        return json_encode(array(
           "name"=> $this -> getName(),
           "dateRegister"=>$this -> getDateRegister(),
           "cpfCnpj"=>$this -> getCpfCnpj(),
           "companyId"=>$this -> getCompanyId()
    
        ));
    }

    static function returnNumber($str) {
        return preg_replace("/[^0-9]/", "", $str);
    }
    


}
?>