<?php
/**
 * Created by PhpStorm.
 * User: Snxt
 * Date: 2018/5/8
 * Time: 15:24
 */

include_once "MyDB.php";

$db = new MyDB();

$sql = "select * from pages";
$result = $db->query($sql);
$response = array();
while (($row = $result->fetch_assoc()) !== null) {
    $page = array(
        "id"=>$row["id"],
        "path"=>$row["path"],
        "title"=>$row["title"]
    );
    $response[] = $page;
}
echo json_encode($response);
$db->close();
