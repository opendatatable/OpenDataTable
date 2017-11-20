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

 		//0-noOfButtonsToShow,
		//1-no_btn,
		//2-no_rec_per_page,
		//3-odtSearch,
		//4-setting_sort_col,
		//5-setting_sort_type,
		//6-noCols,
		//7-setting.url,
		//8-is_paginationLoad,
		//9-setting
		//10-start_limit

(function($)
{
	$.fn.ODTDestroy=function (option) 
	{
		var tl=$(this);
		tl.prev('.odt-top').remove();
		tl.next('.odt-pagination-container').remove();
		tl.find('tbody').empty();
	}

	//Fetch Data//
	function FetchData(tl,allSettings)
	{
		var allSetting=allSettings;
		var url=allSettings[7]+"?odtSearch="+allSettings[3]+"&odt_Start="+allSettings[10]+"&odt_Stop="+allSettings[2]+"&sortCol="+allSettings[4]+"&sortType="+allSettings[5];
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
				if(data!='null')
				{
					var jsonData =   $.parseJSON(JSON.stringify(data));
					var num_rows =   parseInt(jsonData.num_rows);
					var num_rec  =   parseInt(jsonData.num_rec);
					
					if(allSetting[8]==0)
					{	
						var no_btn_lo= Math.ceil(num_rows/allSetting[2]);
						allSetting[1]=no_btn_lo;
						allSetting[8]=1;
						pagination(tl,1,allSetting);
					}

					var tdData="";
					
					if(num_rec>0 && num_rows>0)
					{	
						for(var i=0;i<jsonData.row.length;i++)
						{
							var RowData=jsonData.row[i];
							var r="<tr>";
							for(var col=0;col<allSetting[6];col++)
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
						
						
						
						var sto=str+parseInt(allSetting[2])-1;
						if(num_rows<allSetting[2])
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
						pagination(tl,'null',allSetting);
						tl.next('div').find('.odt-show-entry').html('Showing 0 to 0 of 0 entries');
					}
				}

				
				else
				{
					tl.children('tbody').html("No Data Found....");
				}
				
				allSetting[9].callback.call(this);
			}
		});
		
		return this;
	}

	//Fetch Data END//



	//Pagination//
	function pagination(tl,ClikedBtn,allSettings)
	{
		var btn="";
		if(ClikedBtn=='null')
		{
			btn+="<li href='#' class='disable'><a><<</a></li>";
			btn+="<li href='#' class='disable' ><a>>></a>";
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
				btn+="<li class='disable disabled'><a href='#'> <<</a></li>"; 		
			}	
			else
			{
				btn+="<li  class='odt_Pbtn'  data-count='"+prvBtn+"' ><a href='#'> <<</a></li>"; 
			}
			
			
			for(var st=Start;st<=Stop;st++)
			{
				if(st==ClikedBtn)
				{
					btn+="<li  class='odt_Pbtn active'  data-count='"+st+"' ><a href='#'>"+st+"</a></li>";
				}
				else
				{	
					btn+="<li class='odt_Pbtn'  data-count='"+st+"' ><a  href='#'>"+st+"</a></li>";
				}
				c++;
			}
			
			
			var nxtBtn=ClikedBtn+1;
			
			if(ClikedBtn>=allSettings[1])
			{
				btn+="<li  class='disable disabled' ><a href='#'> >></a></li>"; 
			}
			else
			{
				btn+="<li  class='odt_Pbtn'  data-count='"+nxtBtn+"' ><a href='#'> >></a></li>"; 
			}
		}
		//btn+="</ul>";

		//$(btn).insertAfter(".pagination");
		tl.next('div').find(".pagination").html(btn);

		
		tl.next('div').find(".pagination").find(".odt_Pbtn").click(function()
		{	

			var pos=$(this).data('pos');
			var btn_val=parseInt($(this).data('count'));
			
			pagination(tl,btn_val,allSettings);
			var startLimit=(parseInt($(this).data('count'))-1)*allSettings[2];
			allSettings[10]=startLimit;
			FetchData(tl,allSettings);
			var end=startLimit+allSettings[2];
			return false;
		});
	}



	
	//Pagination END//
	
	$.fn.OpenDataTable=function (option) 
	{
       return this.each(function ()
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
			var display_no_of_rec=(setting.hide_no_of_rec) ? 'display:none':'';
			var start_limit=0;

			//setting_sort_col
			tl.allSettings=[noOfButtonsToShow,no_btn,no_rec_per_page,odtSearch,setting_sort_col,setting_sort_type,noCols,setting.url,is_paginationLoad,setting,start_limit];
			tl.children('tbody').html("loading, please wait....");
			tl.addClass('odt-main');
			
			var TopHtml=
			'<div class="odt-top"><div class="odt-display-record  pull-left" style="'+display_no_of_rec+'" >'+
				'Display '+
				'<select id="odt-rec-per-page form-control">'+
					'<option value="10">10</option>'+
					'<option value="25">25</option>'+
					'<option value="50">50</option>'+
					'<option value="100">100</option>'+
				'</select>'+
				' records '+
			'</div>'+
			'<div class="odt-main-search pull-right" style="'+display_search+'" ><input type="search" placeholder="Search" id="search" class="odt-search form-control"></div></div>';
			
			var bottomHtml='<div class="odt-pagination-container">'+
				'<div class="odt-show-entry pull-left"></div>'+
				'<div class="odt-pagination">'+
					'<ul class="pagination  pull-right"></ul>'+
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
					
					
					var customHtml='<div class="odt-col pull-left" data-colno='+key+' >'+$(this).text()+'</div>';
						customHtml+='<div class="odt-arrow pull-right">';
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
					htmlColSearch+='<input type="text" class="odt-colSearch form-control" data-colindex='+i+'></td>';
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
				
				tl.allSettings[2]=noRecPerPage;
				tl.allSettings[3]=SearchData;
				tl.allSettings[4]=colno;
				tl.allSettings[5]=LocalsortType;
				tl.allSettings[8]=0;
				tl.allSettings[10]=0;
				FetchData(tl,tl.allSettings);
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
				
				var noRecPerPage = tl.prev('div').find('.odt-display-record').find("select").val();
				tl.allSettings[2]=noRecPerPage;
				tl.allSettings[3]=$(this).val();
				tl.allSettings[4]=colno;
				tl.allSettings[5]=LocalsortType;
				tl.allSettings[5]=LocalsortType;
				tl.allSettings[8]=0;
				tl.allSettings[10]=0;
				FetchData(tl,tl.allSettings);
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
				tl.allSettings[2]=$(this).val();
				tl.allSettings[3]=SearchData;
				tl.allSettings[4]=colno;
				tl.allSettings[5]=LocalsortType;
				tl.allSettings[8]=0;
				tl.allSettings[10]=0;
				FetchData(tl,tl.allSettings);
			});

			tl.find('thead').find('tr').find('th').unbind().click(function(event)
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
					
					tl.allSettings[2]=noRecPerPage;
					tl.allSettings[3]=SearchData;
					tl.allSettings[4]=sortCol;
					tl.allSettings[5]=sortType;
					tl.allSettings[8]=0;
					tl.allSettings[10]=0;	

					FetchData(tl,tl.allSettings);
				}
				return false;
			});
			FetchData(tl,tl.allSettings);
		});
	}
})(jQuery);
