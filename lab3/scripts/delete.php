<?php
/**
 * Created by PhpStorm.
 * User: Snxt
 * Date: 2018/5/18
 * Time: 19:17
 */

require_once "MyDB.php";

$db = new MyDB();

$table = $_GET["table"];
$key = $_GET["key"];
if ($table === "bill-detail") $table = "bill_detail";
else if ($table === "store") $table = "store_room";

$sql = "delete from ".$table." where ";
$tmp = array();
foreach ($key as $k => $v) {
    $tmp[] = $k."=".$v;
}
$sql .= join(" and ", $tmp);

if ($db->query($sql)) echo "success";
else echo $sql;
