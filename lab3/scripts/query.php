<?php
/**
 * Created by PhpStorm.
 * User: Snxt
 * Date: 2018/5/11
 * Time: 9:10
 */

require_once "MyDB.php";

$db = new MyDB();

$requestTable = $_GET["table"];

$sql = null;

if ($requestTable === "employee") $sql = "select * from employee";
else if ($requestTable === "supplier") $sql = "select * from supplier";
else if ($requestTable === "production") $sql = "select * from production";
else if ($requestTable === "shelter") $sql = "select * from shelter";
else if ($requestTable === "bill") $sql = "select * from bill";
else if ($requestTable === "bill-detail") $sql = "select * from bill_detail";
else if ($requestTable === "store") $sql = "select * from store_room";
else if ($requestTable === "truck") $sql = "select * from truck";
else if ($requestTable === "supply") $sql = "select * from supply";

$response = array(
    "status"=>200,
    "data"=>null
);
if ($sql !== null) {

    $result = $db->query($sql);
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $item = array();
        foreach ($row as $key => $value) {
            $item[$key] = $value;
        }
        $data[] = $item;
    }
    $response["data"] = $data;
} else {
    $response["status"] = 404;
}

echo json_encode($response);