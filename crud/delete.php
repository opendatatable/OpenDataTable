<?php 
$con=mysqli_connect("localhost","root","12345","country_city");
if(!$con){
	die("Connection fail".mysqli_connect_error());
}
$id=$_GET['id'];
mysqli_query($con,"DELETE from customer_2 where id='$id'");
?>