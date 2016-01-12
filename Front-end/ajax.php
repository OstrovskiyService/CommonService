<?php
var $result = "";
var $type = "";
var $service = "";
var $addService = "";
if (isset($_POST[service])) {
    $type = $_POST['type'];
    $service = $_POST['service'];
    $addService = $_POST['addService'];
}

$result = $type.$service.$addService;

echo(json_encode($result));


