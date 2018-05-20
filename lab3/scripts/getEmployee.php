<?php
/**
 * Created by PhpStorm.
 * User: Snxt
 * Date: 2018/5/8
 * Time: 18:52
 */

include_once "MyDB.php";

$db = new MyDB();

$type = $_GET["type"];
$sql = "";
$response = array();

if ($type != null) {
    if ($type == "all") {
        $sql = "select * from employee";
    }

    if ($sql != "") {

        $result = $db->query($sql);
        while ($row = $result->fetch_assoc()) {
            $employee = array(
                "eid"=>$row["eid"],
                "ename"=>$row["ename"],
                "ebirth"=>$row["ebirth"],
                "edate"=>$row["edate"],
                "econtact"=>$row["econtact"],
                "eaddress"=>$row["eaddress"],
                "eposition"=>$row["eposition"]
            );
            $response[] = $employee;
        }
        echo json_encode($response);
    }
}
