<?php

class UtilsDao{

    public function list($query){
        $sql = new Sql();
        return  $sql->select($query);
    }

    public function findById($query){
        $sql = new Sql();
        return  $sql->select($query);
    }

    public function findByName($query,$nome)
    {
        $sql = new Sql();
        $result =  $sql->select($query,array(
        ':nome' => '%'.$nome.'%'
        ));
        if (count($result) > 0) {
          return $result;
        }else{
        return null;
        }

    }

    public function findByDateRegisterOrCpfCnpj($query){
        $sql = new Sql();
        return  $sql->select($query);
    }
}

?>