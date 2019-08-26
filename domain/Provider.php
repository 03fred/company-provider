<?php
require_once('utils/validations/CpfCnpjValidation.php');
require_once("utils/Utils.php");

class Provider{
  
    private $id;
    private $name;
    private $cpfCnpj;
    private $dateRegister;
    private $rg;
    private $birth;
    private $companyId;
   

    public function __construct($name,$cpfCnpj,$dateRegister,$companyId,$birth,$rg){
        $this->setName($name);
        $this->setCpfCnpj($cpfCnpj);
        $this->setDateRegister($dateRegister);
        $this->setCompanyId($companyId);
        $this->setBirth($birth);
        $this->setRg($rg);
       
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

    public function getRg(){
        return $this->rg;
    }
    
    public function setRg($rg){
         $this->rg = $rg;
    }

    public function getBirth(){
        return $this->birth;
    }
    
    public function setBirth($birth){
         $this->birth = $birth;
    }
    

    public function setCompanyId($companyId){
         $this->companyId = $companyId;
    }
    
    public function getCompanyId(){
        return $this->companyId;
    }
    

    public function setCpfCnpj($cpfCnpj){
        $cpfCnpj = Utils::returnNumber($cpfCnpj);
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
           "companyId"=>$this -> getCompanyId(),
           "rg"=>$this -> getRg(),
           "birth"=>$this->getBirth()
    
        ));
    }

   
    


}
?>