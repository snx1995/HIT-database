<?php
/**
 * Created by PhpStorm.
 * User: Snxt
 * Date: 2018/5/18
 * Time: 19:10
 */

require_once "MyDB.php";

$db = new MyDB();

$table = $_GET["table"];
if ($table === "bill-detail") $table = "bill_detail";
else if ($table === "store") $table = "store_room";

$keys = $_GET["key"];
$data = $_GET["data"];

$sql = "update ".$table." set ";

$tmp = array();
foreach ($data as $k => $v) {
    $tmp[] = $k."='".$v."'";
}

$sql = $sql.join(" , ", $tmp)." where ";
$tmp2 = array();
foreach ($keys as $k => $v) {
    $tmp2[] = $k."='".$v."'";
}

$sql = $sql.join(" and ", $tmp2);

if ($db->query($sql)) echo "success";
else echo $sql;
