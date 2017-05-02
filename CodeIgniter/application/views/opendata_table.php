<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><html>
	<head>
		<title>Open DataTable Codeigniter Example</title>
		<meta name="description" content="Open DataTable is a JQuery plug-in. It is fast, very much realiable, easy to implement, highly flexible and comes with a very beautiful UI.It is currently avaiblable only with PHP MySQL data source and under development for supporting other data sources in near future">
      <meta name="keyword" content="JQuery data table, Php data table, simple data table">
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
		<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css">
		<script src="<?php echo base_url(); ?>assets/js/OpenDataTable.js"></script>
		<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
		<script type="text/javascript" src="assets/js/prism.js"></script>
		 <link href="<?php echo base_url(); ?>assets/css/prism.css" rel="stylesheet">

		<script type="text/javascript">
		$(document).ready(function(){
			$(".OpenDataTable").OpenDataTable({
				url:"<?php echo base_url() ?>index.php/opendatatable/simple_datasource",
			});
			
		});
		</script>

		<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-98093724-1', 'auto');
  ga('send', 'pageview');

</script>
	</head>
	<body>
		<h1 class="logo"> <a href="http://opendatatable.com/"> <span class="logo1">Open</span> DataTable</a></h1>
		<h2>Codeigniter Example</h2>

		<p><b>Required files</b><br>
		<a href="https://code.jquery.com/jquery-2.2.4.js">jquery-2.2.4.js</a><br>
	                  <a href="https://github.com/opendatatable/OpenDataTable/blob/master/source/simple_php_datasource.php">Click to view CI example</a><br>
	                 <a href="https://github.com/opendatatable/OpenDataTable/blob/master/country_city.sql">country_city.sql</a><br>
		</p>
		<b>Code (view/opendata_table.php)</b><br>
			for controller click above link and see the exmaple. 	
		 <pre class="language-markup">
    <code class="language-markup">
 &lt;html>
   &lt;head>
     &lt;title>Open Data Table&lt;/title>
     &lt;script src="https://code.jquery.com/jquery-2.2.4.js">&lt;/script>
     &lt;link rel="stylesheet" type="text/css" href="style.css">
     &lt;script src="OpenDataTable.js">&lt;/script>
     &lt;script type="text/javascript">
    $(document).ready(function(){
      $(".OpenDataTable").OpenDataTable({  
        url: <code class="language-php">"&lt;?php echo base_url() ?>index.php/opendatatable/simple_datasource",
      });
    });
     &lt;/script>
   &lt;/head>
   &lt;body>
     &lt;table class="OpenDataTable">
	       &lt;thead>
		       &lt;tr>
			        &lt;th>Code&lt;/th>
			        &lt;th>Name&lt;/th>
			        &lt;th>Continent&lt;/th>
		        &lt;/tr>
	       &lt;/thead>
       &lt;tbody>&lt;/tbody>
     &lt;/table>
   &lt;/body>
 &lt;/html>


    </code></pre>
    <p><b>Output</b></p>	
		<table class="OpenDataTable">
			<thead>
			<tr>
				<th>Code</th>
				<th>Name</th>
				<th>Continent</th>
			</tr>
			</thead>
			<tbody></tbody>
		</table>
	</body>
</html>