<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Opendatatable extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in opendatatable
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('opendata_table');
	}
	public function simple_datasource()
	{
		
		//Config//
		$Table='Country';
		$Cols=array("Code","Name","Continent");
		$Join=" ";
		$WhereClause=" ";
		//Config End// 

		if(isset($Join) && !empty(trim($Join)))
		{

			foreach($Cols as &$co)
			{
				$JoinCols[]=trim($co);

				$new_col=explode("AS",$co);
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

		if(isset($this->input->get('odt_Start')) && isset($this->input->get('odt_Stop')) )
		{
			$Limit=" LIMIT ".$this->input->get('odt_Start').",".$this->input->get('odt_Stop');
		}
		else
		{
			$Limit="";	
		}

		if(isset($this->input->get('sortCol')) && isset($this->input->get('sortType')) && !empty($this->input->get('sortType')) && !empty($this->input->get('sortType')) ) 
		{

			$OrderBy=" ORDER BY ".$SearchCol[$this->input->get('sortCol')]." ".$this->input->get('sortType');
		}
		else
		{
			$OrderBy=" ";	
		}

		//Search all
		if(isset($this->input->get('odtSearch')) &&  !empty($this->input->get('odtSearch')) ){

			if(!empty(trim($WhereClause)))
			{
				$WhereClause=" AND ".$WhereClause;	
			}
			else
			{
				$WhereClause=" ";	
			}
			
			$b=array_map(function($col){
				return $col." LIKE '%".$this->input->get('odtSearch')."%'";
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
		if(isset($this->input->get('ColSearch')) &&  !empty($this->input->get('ColSearch')) )
		{
			$pt_html=array();
			foreach ($this->input->get('ColSearch') as $key => $value)
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



		$resultC=$this->db->query($sqlC);

		$row_new =$resultC->row_array();
		$data['num_rows']=$row_new['count'];

		$result=$this->db->query($sql);	
		$data['num_rec']=$result->num_rows();


		foreach ($result->result_array() as $row) {
			$dataRaw=array();
		 	foreach ($Cols as  $col) {
		 		
		 		$dataRaw[]=$row[$col];
		 	}

		 	$data['row'][]=$dataRaw;
		}
		
		echo json_encode($data);
	}
}
