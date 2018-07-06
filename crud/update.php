<?php 
$con=mysqli_connect("localhost","root","12345","country_city");
if(!$con){
	die("Connection fail".mysqli_connect_error());
}

$id=$_POST['id'];
$name=$_POST['name'];
$city=$_POST['city'];
$work_area=$_POST['work_area'];
$country=$_POST['country'];
$grade=$_POST['grade'];

mysqli_query($con,"UPDATE customer_2 set 
	CUST_NAME='$name',
	CUST_CITY='$city',
	WORKING_AREA='$work_area',
	CUST_COUNTRY='$country',
	GRADE='$grade' 
	WHERE id='$id'");


echo "success";?>