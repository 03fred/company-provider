<?php
class PhoneDao{


    public function insert($id_provider,$phone)
    {
       
        $sql = new Sql();
        $query = "insert into phone(number,provider_id) values (:NUMBER,:PROVIDER_ID)";
        
        $sql->select($query, array(
            ':NUMBER' => $phone,
            ':PROVIDER_ID' => $id_provider
        ));
        
    
    }


}



?>