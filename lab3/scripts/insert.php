<?php
/**
 * Created by PhpStorm.
 * User: Snxt
 * Date: 2018/5/18
 * Time: 14:29
 */

require_once "MyDB.php";

$db = new MyDB();

$table = $_GET["table"];
$params = $_GET["params"];
if ($table === "bill-detail") $table = "bill_detail";
else if ($table === "store") $table = "store_room";


$sql = "insert into ".$table."(";
$cols = array();
$values = array();

foreach ($params as $key => $value) {
    $cols[] = $key;
    $values[] = $value;
}

$sql = $sql.join(",", $cols).")values(".join(",", $values).")";

if ($db->query($sql)) echo "success";
else echo $sql;