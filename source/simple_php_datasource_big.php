<?php 
error_reporting(0);
/**
 * Open DataTable
 *
 * An open source application base on Jquery, PHP and Mysql
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2017, Open DataTable
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	    Open DataTable
 * @author	    Open DataTable Team
 * @copyright	Copyright (c) 2017,Open DataTable (http://opendatatable.com/)
 * @license	    http://opensource.org/licenses/MIT	MIT License
 * @link	    http://opendatatable.com/
 * @since	    Version 1.0.0
 * @version     1.0.3
 * @filesource
 */

//Config//
$con=mysqli_connect("localhost","root","","big_data");
if(!$con){
	die("Connection fail".mysqli_connect_error());
}

$Table='emp';
$Cols=array("id","f_name","l_name","gender","dob","doj");
$Join=" ";
$WhereClause=" ";
//Config End// 

if(isset($Join) && !empty(trim($Join)))
{

	foreach($Cols as &$co)
	{
		$JoinCols[]=trim($co);

		$new_col=explode(' AS ',$co);
		if(isset($new_col[0]) && isset($new_col[1]))
		{
			$co=trim($new_col[1]);
			$SearchCol[]=trim($new_col[0]);
		}
		else
		{
			$new_col_p=explode(".",$new_col[0]);
			$co=trim($new_col_p[1]);
			$SearchCol[]=trim($new_col[0]);
		}
	}
}
else
{
	$JoinCols=$Cols;
	$SearchCol=$Cols;
}

if(isset($_GET['odt_Start']) && isset($_GET['odt_Stop']) )
{
	$Limit=" LIMIT ".$_GET['odt_Start'].",".$_GET['odt_Stop'];
}
else
{
	$Limit="";	
}

if(isset($_GET['sortCol']) && isset($_GET['sortType']) && !empty($_GET['sortType']) && !empty($_GET['sortType']) ) 
{

	$OrderBy=" ORDER BY ".$SearchCol[$_GET['sortCol']]." ".$_GET['sortType'];
}
else
{
	$OrderBy=" ";	
}

//Search all
if(isset($_GET['odtSearch']) &&  !empty($_GET['odtSearch']) ){

	if(!empty(trim($WhereClause)))
	{
		$WhereClause=" AND ".$WhereClause;	
	}
	else
	{
		$WhereClause=" ";	
	}
	
	$b=array_map(function($col){
		return $col." LIKE '%".$_GET['odtSearch']."%'";
	},$SearchCol);
	
	$WhereClause=" WHERE (".implode(" OR ",$b)." )".$WhereClause;		
}
else{

	if(!empty(trim($WhereClause)))
	{
		$WhereClause="WHERE ".$WhereClause;	
	}
	else
	{
		$WhereClause="";	
	}
}

//Col Search
if(isset($_GET['ColSearch']) &&  !empty($_GET['ColSearch']) )
{
	$pt_html=array();
	foreach ($_GET['ColSearch'] as $key => $value)
	{
		if(!empty($value))
		{	
			$pt_html[]=$SearchCol[$key]." LIKE '%".$value."%'";
		}
	}
	
	if(empty(trim($WhereClause)))
	{	
		if(!empty($pt_html))
		$WhereClause=" WHERE ".implode(" AND ", $pt_html);	
			
	}
	else
	{
		if(!empty($pt_html))
		$WhereClause.=" AND (".implode(" AND ", $pt_html).")";
	}
	
}

$sql="select ".implode(",",$JoinCols)." FROM  ".$Table." ".$Join." ".$WhereClause.$OrderBy.$Limit;

$sqlC="select count(*) as count FROM ".$Table." ".$Join." ".$WhereClause;



$resultC=mysqli_query($con,$sqlC);
$data['num_rows']=mysqli_fetch_array($resultC)['count'];

$result=mysqli_query($con,$sql);	
$data['num_rec']=mysqli_num_rows($result);
 
 while($row=mysqli_fetch_array($result)) {

 	// row data
 	$dataRaw=array();
 	foreach ($Cols as  $col) {
 		
 		$dataRaw[]=$row[$col];
 	}

 	$dataRaw[6]='';
 	$data['row'][]=$dataRaw;

 }

echo json_encode($data);
?>
