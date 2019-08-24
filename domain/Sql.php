<?php
class Sql extends PDO{
private $conn;

public function __construct()
{
    $servername = "127.0.0.1";
    $username = "fred";
    $password = "29111993";
    $dbname = "provider_company";
    $this->conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
}

private function setParams($statment , $parameters = array())
{
    foreach($parameters as $key => $value){

        $this -> setParam($statment,$key,$value);
     }

}

private function setParam($statment,$key,$value){

    $statment -> bindParam($key,$value);
}


public function query($rowQuery , $params = array()){
$stmt = $this->conn->prepare($rowQuery);
 $this -> setParams($stmt,$params);
  $stmt ->execute();
  return $stmt;

}

public function select ($rowQuery,$params =  array()):array{
 $stmt = $this -> query($rowQuery,$params);
return $stmt -> fetchAll((PDO::FETCH_ASSOC));

}

}

?>