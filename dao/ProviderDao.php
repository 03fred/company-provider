<?php
class ProviderDao{


    public function insert($data)
    {
       $data = json_decode($data,true);
       
        $sql = new Sql();
        $query = "Call insert_provider(:CPFCNPJ,:DATEREGISTER,:NAME,:COMPANY_ID,:BIRTH,:RG)";
        
         $data = $sql->select($query, array(
            ':NAME' => $data['name'],
            ':COMPANY_ID' => $data['companyId'],
            ':DATEREGISTER' => $data['dateRegister'],
            ':CPFCNPJ' => $data['cpfCnpj'],
            ':RG' => $data['rg'],
            ':BIRTH' => $data['birth']
        ));
        
      return $data;
    }


    
}



?>