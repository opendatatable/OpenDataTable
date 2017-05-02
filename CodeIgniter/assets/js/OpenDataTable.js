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
 * @copyright	Copyright (c) 2007,Open DataTable (http://opendatatable.com/)
 * @license	    http://opensource.org/licenses/MIT	MIT License
 * @link	    http://opendatatable.com/
 * @since	    Version 1.0.0
 * @version     1.0.2
 * @filesource
 */

(function($)
{
	
	//Fetch Data//
	$.fn.FetchData=function(tl,url,allSettings)
	{
		var noOfButtonsToShow=allSettings[0];
		var no_btn=allSettings[1];
		var no_rec_per_page=allSettings[2];
		var odtSearch=allSettings[3];
		var sortCol=allSettings[4];
		var sortType=allSettings[5];
		var noCols=allSettings[6];
		var mainUrl=allSettings[7];
		var is_paginationLoad=allSettings[8];
		var setting=allSettings[9];

		var colSearchChain="";
		tl.find('.odt-colSearch').each(function(){
			var key=$(this).data('colindex');
			colSearchChain+='&ColSearch['+key+']='+$(this).val();
		});
		
		if(colSearchChain!="")
		{

			var url=url+colSearchChain;
		}	

		$.ajax({
			url:url,
			dataType: "json",
			success: function(data)
			{
				var allSettings=[noOfButtonsToShow,no_btn,no_rec_per_page,odtSearch,sortCol,sortType,noCols,mainUrl,is_paginationLoad,setting];
				
				if(data!='null')
				{
					var jsonData =   $.parseJSON(JSON.stringify(data));
					var num_rows =   parseInt(jsonData.num_rows);
					var num_rec  =   parseInt(jsonData.num_rec);
					
					if(allSettings[8]==0)
					{	
						var no_btn_lo= Math.ceil(num_rows/allSettings[2]);
						var allSettings=[allSettings[0],no_btn_lo,allSettings[2],allSettings[3],allSettings[4],allSettings[5],allSettings[6],allSettings[7],1,allSettings[9]];	
						tl.pagination(tl,1,allSettings);
					}

					var tdData="";
					
					if(num_rec>0 && num_rows>0)
					{	
						for(var i=0;i<jsonData.row.length;i++)
						{
							var RowData=jsonData.row[i];
							var r="<tr>";
							for(var col=0;col<noCols;col++)
							{
								var colhide=tl.find("[data-colno='"+col+"']").closest('th').data('colhide');
								if(colhide=="yes") 
								r+='<td style="display:none">';
								else
								r+='<td>';
								r+=RowData[col]+"</td>";
							}
							r+="</tr>";
							tdData+=r;
						}
							

						tl.children('tbody').html(tdData);

						var arr  = url.split('&');
						var arr2 = arr[1].split('=');
						var str  = parseInt(arr2[1])+1;
						
						
						
						var sto=str+parseInt(allSettings[2])-1;
						if(num_rows<allSettings[2])
						{
							sto=num_rec;	
						}
						else if(sto>num_rows)
						{
							sto=num_rows;
						}

						
						tl.next('div').find('.odt-show-entry').html('Showing '+str+' to '+sto+' of '+num_rows+' entries');
					}
					else
					{
						tl.children('tbody').html("No Data Found....");
						tl.pagination(tl,'null',allSettings);
						tl.next('div').find('.odt-show-entry').html('Showing 0 to 0 of 0 entries');
					}
				}

				
				else
				{
					tl.children('tbody').html("No Data Found....");
				}
				
				allSettings[9].callback.call(this);
			}
		});
		
		return this;
	}

	//Fetch Data END//



	//Pagination//
	$.fn.pagination=function(tl,ClikedBtn,allSettings)
	{
		var btn="";
		if(ClikedBtn=='null')
		{
			btn+="<li href='#' class='disable'><<</a></li>";
			btn+="<li href='#' class='disable' >>></a>";
		}
		else
		{	
			var c=1;

			var adj=allSettings[0]-3;
			var Start=parseInt(ClikedBtn)-2;
			var Stop=parseInt(ClikedBtn)+adj;	
			
			if(allSettings[1]<allSettings[0])
			{
				Stop=allSettings[1];
				Start=1;
			}
			else
			{
				if(Stop>=allSettings[1])
				{	
					Stop=allSettings[1];
					Start=Stop-allSettings[0];
					Start=Start+1;
				}
				if(Start<1)
				{
					Stop=allSettings[0];
					Start=1;
				}
			}	
				
		
			var prvBtn=ClikedBtn-1;
			
			
			//var btn='<ul style="float:left" >';
			
			if(ClikedBtn==0 || prvBtn==0)
			{
				btn+="<li href='#' class='disable'><<</a></li>"; 		
			}	
			else
			{
				btn+="<li href='#' class='odt_Pbtn'  data-count='"+prvBtn+"' ><<</a></li>"; 
			}
			
			
			for(var st=Start;st<=Stop;st++)
			{
				if(st==ClikedBtn)
				{
					btn+="<li href='#' class='odt_Pbtn active'  data-count='"+st+"' >"+st+"</a></li>";
				}
				else
				{	
					btn+="<li href='#' class='odt_Pbtn'  data-count='"+st+"' >"+st+"</a></li>";
				}
				c++;
			}
			
			
			var nxtBtn=ClikedBtn+1;
			
			if(ClikedBtn>=allSettings[1])
			{
				btn+="<li href='#' class='disable' >>></a>"; 
			}
			else
			{
				btn+="<li href='#' class='odt_Pbtn'  data-count='"+nxtBtn+"' >>></a></li>"; 
			}
		}
		//btn+="</ul>";

		//$(btn).insertAfter(".pagination");
		tl.next('div').find(".pagination").html(btn);

		
		tl.next('div').find(".pagination").find(".odt_Pbtn").click(function()
		{	

			var pos=$(this).data('pos');
			var btn_val=parseInt($(this).data('count'));
			
			tl.pagination(tl,btn_val,allSettings);
			var startLimit=(parseInt($(this).data('count'))-1)*allSettings[2];

			tl.FetchData(tl,allSettings[7]+"?odtSearch="+allSettings[3]+"&odt_Start="+startLimit+"&odt_Stop="+allSettings[2]+"&sortCol="+allSettings[4]+"&sortType="+allSettings[5],allSettings);
			var end=startLimit+allSettings[2];
			return false;
		});
	}

	//Pagination END//
	
	$.fn.extend({
	
	OpenDataTable: function (option) 
	{
        
        var setting=$.extend(
		{
			url:"api.php",
			default_sort:{sort_col:'',sort_type:''},
			hide_search: false,
			hide_no_of_rec: false,
			callback: function() {}	
		},option);	

		var tl=$(this);
		var no_btn=0;
		var is_paginationLoad=0;
		var odtSearch="";
		var noOfButtonsToShow=5;
		var no_rec_per_page=10;
		var sortCol="";
		var sortType="";
		var noCols = $(this).children('thead').children('tr').children('th').length;	
		var setting_sort_type=setting.default_sort.sort_type;
		var setting_sort_col=setting.default_sort.sort_col;
		var display_search=(setting.hide_search) ? 'display:none':'';
		var display_no_of_rec=(setting.hide_no_of_rec) ? 'display:none':'';;

		tl.children('tbody').html("loading, please wait....");
		tl.addClass('odt-main');
		
		var TopHtml=
		'<div class="odt-top"><div class="odt-display-record" style="'+display_no_of_rec+'" >'+
			'Display '+
			'<select id="odt-rec-per-page">'+
				'<option value="10">10</option>'+
				'<option value="25">25</option>'+
				'<option value="50">50</option>'+
				'<option value="100">100</option>'+
			'</select>'+
			' records '+
		'</div>'+
		'<div class="odt-main-search" style="'+display_search+'" >Search : <input type="search" id="search" class="odt-search"></div></div>';
		
		var bottomHtml='<div class="odt-pagination-container">'+
			'<div class="odt-show-entry"></div>'+
			'<div class="odt-pagination">'+
				'<ul class="pagination"></ul>'+
			'</div>'+
		'</div>';

		
			$(TopHtml).insertBefore(tl);
		
		$(bottomHtml).insertAfter(tl);

		var colSearchData=[];
		tl.children('thead').children('tr').children('th').each(function(key,value){
			var is_sortable=$(this).data('sortable');
			var is_colSearch=$(this).data('colsearch');
			var is_hide=$(this).data('colhide');
			if(is_hide=='yes')
			{

				$(this).hide();
			}
			if(is_colSearch=="yes")
			{
				colSearchData.push(key);
			}		
			if(is_sortable=="no")
			{	
				var customHtml='<div class="odt-col" data-colno='+key+' >'+$(this).text()+'</div></div>';
			}
			else
			{
				
				
				var customHtml='<div class="odt-col" data-colno='+key+' >'+$(this).text()+'</div>';
					customHtml+='<div class="odt-arrow">';
					if(setting_sort_type=="ASC" && parseInt(setting_sort_col)==key)
					{		
						customHtml+='<span class="up-arrow"></span>';
						customHtml+='<span class="down-arrow" style="display:none"></span>';
						$(this).attr("data-sort", "DESC");  
					}
					else if(setting_sort_type=="DESC" && parseInt(setting_sort_col)==key)
					{	
						customHtml+='<span class="up-arrow" style="display:none"></span>';
						customHtml+='<span class="down-arrow"></span>';
						$(this).attr("data-sort", "ASC");  
					}
					else
					{	
						customHtml+='<span class="up-arrow"></span>';
						customHtml+='<span class="down-arrow"></span>';
						$(this).attr("data-sort", "ASC");  
					}
					customHtml+='</div>';
			}
					
			$(this).html(customHtml);		
		});
		
		var htmlColSearch="<tr>",countS=0;
		for(i=0;i<noCols;i++)
		{	

			var colhide=tl.find("[data-colno='"+i+"']").closest('th').data('colhide');
			if(colhide=="yes") 
			htmlColSearch+='<td style="display:none">';
			else
			htmlColSearch+='<td>';
								

			if($.inArray(i, colSearchData) !== -1)
			{	
				htmlColSearch+='<input type="text" class="odt-colSearch" data-colindex='+i+'></td>';
				countS++;
			}
			else{
				htmlColSearch+='</td>';
			}
		}
		htmlColSearch+="</tr>";
		if(countS>0)
		{ 
			$(htmlColSearch).insertAfter(tl.children('thead'));
		}
		tl.find('.odt-colSearch').keyup(function(){
			
			var key=$(this).data('colindex');
			var SearchData=tl.prev('div').find('.odt-search').val();
			var activeCol=tl.find('thead').find('tr').find('th').find(".odt-active");
			var current_status=activeCol.parent().data('sort');
			var colno=activeCol.data("colno");
			
			if(colno===undefined)
			{
			  colno=0;
			}	
			var LocalsortType;
			if(current_status=="ASC")
			{
				LocalsortType='DESC';
			}
			else
			{
				LocalsortType='ASC';
			}

			var noRecPerPage=tl.prev('div').find('.odt-display-record').find("select").val();
			var allSettings=[noOfButtonsToShow,no_btn,noRecPerPage,SearchData,colno,LocalsortType,noCols,setting.url,is_paginationLoad,setting];
			tl.FetchData(tl,allSettings[7]+"?odtSearch="+allSettings[3]+"&odt_Start=0&odt_Stop="+allSettings[2]+"&sortCol="+allSettings[4]+"&sortType="+allSettings[5],allSettings);
		});

		tl.prev('.odt-top').find('.odt-search').keyup(function()
		{
			var activeCol=tl.find('thead').find('tr').find('th').find(".odt-active");
			var current_status=activeCol.parent().data('sort');
			var colno=activeCol.data("colno");
			if(colno===undefined)
			{
				colno=0;
			}	
			var LocalsortType;
			if(current_status=="ASC")
			{
				LocalsortType='DESC';
			}
			else
			{
				LocalsortType='ASC';
			}
			
			var noRecPerPage=tl.prev('div').find('.odt-display-record').find("select").val();
			var allSettings=[noOfButtonsToShow,no_btn,noRecPerPage,$(this).val(),colno,LocalsortType,noCols,setting.url,is_paginationLoad,setting];
			tl.FetchData(tl,allSettings[7]+"?odtSearch="+$(this).val()+"&odt_Start=0&odt_Stop="+allSettings[2]+"&sortCol="+allSettings[4]+"&sortType="+allSettings[5],allSettings);
		});

		tl.prev('.odt-top').find('.odt-display-record').find("select").change(function()
		{
			var SearchData=tl.prev('div').find('.odt-search').val();
			var activeCol=tl.find('thead').find('tr').find('th').find(".odt-active");
			var current_status=activeCol.parent().data('sort');
			var colno=activeCol.data("colno");
			
			if(colno===undefined)
			{
			  colno=0;
			}	
			var LocalsortType;
			if(current_status=="ASC")
			{
				LocalsortType='DESC';
			}
			else
			{
				LocalsortType='ASC';
			}


			var allSettings=[noOfButtonsToShow,no_btn,$(this).val(),SearchData,colno,LocalsortType,noCols,setting.url,is_paginationLoad,setting];
			tl.FetchData(tl,allSettings[7]+"?odtSearch="+allSettings[3]+"&odt_Start=0&odt_Stop="+allSettings[2]+"&sortCol="+allSettings[4]+"&sortType="+allSettings[5],allSettings);
		});

		tl.find('thead').find('tr').find('th').click(function(event)
		{
			

			var is_sortable=$(this).data('sortable');
			$(this).find('.odt-col').removeClass('odt-active');
			$(this).find('.odt-col').addClass('odt-active');
			if(is_sortable!='no')
			{		
				$(this).parent().find('.up-arrow').show();
				$(this).parent().find('.down-arrow').show();	
				var sortType = $(this).data('sort');
				var sortCol  = $(this).parent().children().index($(this));
				
				if(sortType=='ASC')
				{
					
					$(this).data('sort','DESC');
					$(this).find('.up-arrow').show();
					$(this).find('.down-arrow').hide();
					var cVal=$(this).data('sort');
				}
				else{
					$(this).data('sort','ASC');
					$(this).find('.up-arrow').hide();
					$(this).find('.down-arrow').show();
					var cVal=$(this).data('sort');
				}


				var noRecPerPage=tl.prev('div').find('.odt-display-record').find("select").val();
				var SearchData=tl.prev('div').find('.odt-search').val();
				var allSettings=[noOfButtonsToShow,no_btn,noRecPerPage,SearchData,sortCol,sortType,noCols,setting.url,0,setting];
				tl.FetchData(tl,allSettings[7]+"?odtSearch="+allSettings[3]+"&odt_Start=0&odt_Stop="+allSettings[2]+"&sortCol="+sortCol+"&sortType="+sortType,allSettings);
			}
			return false;
		});

		
		setting_sort_col
		var allSettings=[noOfButtonsToShow,no_btn,no_rec_per_page,odtSearch,setting_sort_col,setting_sort_type,noCols,setting.url,is_paginationLoad,setting];
		tl.FetchData(tl,setting.url+"?odtSearch="+odtSearch+"&odt_Start=0&odt_Stop="+no_rec_per_page+"&sortCol="+setting_sort_col+"&sortType="+setting_sort_type,allSettings);
	}
});

})(jQuery);