<?php 
$con=mysqli_connect("localhost","root","","country_city");
if(!$con){
	die("Connection fail".mysqli_connect_error());
}


$req_method=$_SERVER['REQUEST_METHOD'];

$name=$_POST['name'];
$city=$_POST['city'];
$work_area=$_POST['work_area'];
$country=$_POST['country'];
$grade=$_POST['grade'];

if($req_method=="POST")
{	
	mysqli_query($con,"INSERT INTO customer_2(CUST_NAME,CUST_CITY,WORKING_AREA,CUST_COUNTRY,GRADE)
	VALUES('$name','$city','$work_area','$country','$grade')");
	var_dump($_POST);
	echo "success";
}
else if($req_method=="PUT")
{
	$id=$_POST['id'];
	mysqli_query($con,"UPDATE customer_2 set 
	CUST_NAME='$name',
	CUST_CITY='$city',
	WORKING_AREA='$work_area',
	CUST_COUNTRY='$country',
	GRADE='$grade' 
	WHERE id='$id'");
	echo "success";
}
else if($req_method=="DELETE")
{
	$id=$_GET['id'];
	mysqli_query($con,"DELETE from customer_2 where id='$id'");
	echo "success";
}
else
{
	echo "error";
}

?>