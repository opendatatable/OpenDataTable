<?php 
$con=mysqli_connect("localhost","root","12345","country_city");
if(!$con){
	die("Connection fail".mysqli_connect_error());
}


$name=$_POST['name'];
$city=$_POST['city'];
$work_area=$_POST['work_area'];
$country=$_POST['country'];
$grade=$_POST['grade'];

mysqli_query($con,"INSERT INTO customer_2(CUST_NAME,CUST_CITY,WORKING_AREA,CUST_COUNTRY,GRADE)
VALUES('$name','$city','$work_area','$country','$grade')");


echo "success";?>