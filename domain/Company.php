<?php

require_once('utils/validations/CpfCnpjValidation.php');

class Company
{

    private $uf;
    private $businessName;
    private $cnpj;
    

    public function __construct($businessName,$cnpj,$uf){
        $this->setBusinessName($businessName);
        $this->setCnpj($cnpj);
        $this->setUf($uf);

    }

   public function getUf(){
    return $this->uf;
   }

   public function setUf($uf){
      $this->uf = $uf;
   }

   public function getBusinessName(){
    return $this->businessName;
   }
   
   public function setBusinessName($businessName){
   $this->businessName = $businessName;
   }
    
   public function setCnpj($cnpj){
    if(CpfCnpjValidation::validar_cnpj($cnpj)){
        $this->cnpj = $cnpj;
      }/*else {
        throw new Exception("CNPJ INFORMADO NÃO É VÁLIDO");
    }*/
   }

   public function getCnpj(){
     return $this->cnpj;
   }


    
   public function __toString()
   {
       return json_encode(array(
          "businessName"=> $this -> getBusinessName(),
          "cnpj"=>$this -> getCnpj(),
          "uf"=> $this-> getUf()
   
       ));
   }
   
    
}
?>
