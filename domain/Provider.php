<?php

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
     $this->cpfCnpj = $cpfCnpj;
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


    public static function validarCpf($cpf): bool
    {
        if (empty($cpf)) {
            return false;
        }

        $cpf = preg_match('/[0-9]/', $cpf) ? $cpf : 0;

        $cpf = str_pad($cpf, 11, '0', STR_PAD_LEFT);


        if (strlen($cpf) != 11) {
            echo "length";
            return false;
        } else if (
            $cpf == '00000000000' ||
            $cpf == '11111111111' ||
            $cpf == '22222222222' ||
            $cpf == '33333333333' ||
            $cpf == '44444444444' ||
            $cpf == '55555555555' ||
            $cpf == '66666666666' ||
            $cpf == '77777777777' ||
            $cpf == '88888888888' ||
            $cpf == '99999999999'
        ) {
            return false;
        } else {

            for ($t = 9; $t < 11; $t++) {

                for ($d = 0, $c = 0; $c < $t; $c++) {
                    $d += $cpf{
                        $c} * (($t + 1) - $c);
                }
                $d = ((10 * $d) % 11) % 10;
                if ($cpf{
                    $c} != $d) {
                    return false;
                }
            }

            return true;
        }
    }


}
?>