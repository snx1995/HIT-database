<?php
/**
 * Created by PhpStorm.
 * User: Snxt
 * Date: 2018/5/20
 * Time: 14:11
 */

require_once "MyDB.php";

$db = new MyDB();

$sql = $_GET["sql"];

$result = $db->query($sql);

$response = array();
$cols = array();
$d = array();
$flag = false;

while ($row = $result->fetch_assoc()) {
    $data = array();
    foreach ($row as $k => $v) {
        if (!$flag) {
            $cols[] = $k;
        }
        $data[$k] = $v;
    }
    $flag = true;
    $d[] = $data;
}

$response["cols"] = $cols;
$response["data"] = $d;

echo json_encode($response);
