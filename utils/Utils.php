<?php 
class Utils{

    static function redirecPageInitial(){
        header("Location:/fornecedor-empresa/pages/index.html");
        exit;
    }

    static function returnNumber($str) {
        return preg_replace("/[^0-9]/", "", $str);
    }

}

?>