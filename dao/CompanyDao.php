<?php
class CompanyDao{


    public function insert($data)
    {
     
        $data = json_decode($data,true);
       
        $sql = new Sql();
        $query = "insert into company(name,cnpj,uf) values (:BUSINESSNAME,:CNPJ,:UF)";
        
        $sql->select($query, array(
            ':BUSINESSNAME' => $data['businessName'],
            ':CNPJ' => $data['cnpj'],
            ':UF' => $data['uf']
            
        ));
        
    
    }


    public function listAll(){
        $sql = new Sql();
        return  $sql->select("SELECT * FROM company");
    }
    
}



?>