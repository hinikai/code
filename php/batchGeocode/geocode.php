<?php

$addresses = file_get_contents('address');
$addresses = explode("\n", $addresses);

$len = count($addresses);
$output = array();
for ($i = 0; $i < $len - 1; $i++) {
    var_dump($i);
    $geocodeUrl = "http://restapi.gaode.com/v3/geocode/geo?address=" . urlencode($addresses[$i]) . "&output=json&key=84c460603051d356d7a39450a467362d";
    $result = file_get_contents($geocodeUrl);
    $result = json_decode($result);
    if ($result->geocodes && count($result->geocodes) > 0) {
        $location = $result->geocodes[0]->location;
    }
    $output[] = $addresses[$i] . "," . $location;
}

$output = implode("\n", $output);

$outputFile = fopen("output.csv", "w");
fwrite($outputFile, $output);
fclose($outputFile);

