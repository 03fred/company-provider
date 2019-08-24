<?php
class ProviderDao{


    public function insert($data)
    {
        echo $data;
       $data = json_decode($data,true);
       
        $sql = new Sql();
        $query = "insert into provider(name,company_id,date_register,cpf_cnpj) values ". 
        "(:NAME,:COMPANY_ID,:DATEREGISTER,:CPFCNPJ)";
        
        $sql->select($query, array(
            ':NAME' => $data['name'],
            ':COMPANY_ID' => $data['companyId'],
            ':DATEREGISTER' => $data['dateRegister'],
            ':CPFCNPJ' => $data['cpfCnpj']
        ));
        
    
    }


    function listAll(){
        $sql = new Sql();
        return  $sql->select("select *from company");
    }
    
}



?>