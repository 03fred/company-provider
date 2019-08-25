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

}

?>