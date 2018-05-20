<?php
/**
 * Created by PhpStorm.
 * User: Snxt
 * Date: 2018/5/8
 * Time: 15:11
 */

class MyDB {
    private $serverName = "localhost";
    private $dbName = "dblab3";
    private $userName = "root";
    private $password = "123456789";
    private $conn;

    public function __construct() {
        $this->conn = new mysqli($this->serverName, $this->userName, $this->password, $this->dbName);
        if ($this->conn->connect_error) die("connection failed.");
    }

    public function query($sql) {
        return $this->conn->query($sql);
    }

    public function test() {
        $sql = "select * from student";
        $result = $this->conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            echo $row["snum"]."<br>";
        }
        echo "end";
    }

    public function close() {
        $this->conn->close();
    }
}