<?php

class Phone
{

    private $numberPhone;
    private $provider_id;
    

    public function __construct($numberPhone,$provider_id){
    //não me atentei tanto as validações ...porém geralmente eu faço elas aqui...
        $this->setNumberPhone($numberPhone);
        $this->setprovider_id($provider_id);
    }

   public function getNumberPhone(){
    return $this->numberPhone;
   }

   public function setNumberPhone($numberPhone){
      $this->numberPhone = $numberPhone;
   }

   public function getprovider_id(){
    return $this->provider_id;
   }
   
   public function setprovider_id($provider_id){
   $this->provider_id = $provider_id;
   }
    
    
   public function __toString()
   {
       return json_encode(array(
          "providerId"=> $this -> getprovider_id(),
          "numberPhone"=>$this -> getNumberPhone()
   
       ));
   }
   
    
}
?>
