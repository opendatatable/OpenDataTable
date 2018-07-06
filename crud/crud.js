var url="../source/simple_php_datasource_crud.php";
$(document).ready(function(){
	$(".OpenDataTable").OpenDataTable({
	url:url,
});

// Save Data
$("#Form").submit(function(){
	$('#addModal').find('.save').val("saving....");
	$('#addModal').find('.save').attr('disabled','disabled');
	$.ajax({
		type:"POST",
		url:"action.php",
		data:$("#Form").serialize(),
		success:function(data)
		{ 
			$(".OpenDataTable").ODTDestroy();
			$(".OpenDataTable").OpenDataTable({
				url:url,
			});

			if(data=='success')
			{  
				$("#addModal").find('.alert-success').show();
			}
			else{
				$("#addModal").find('.alert-danger').show();
			}
			$('#addModal').find('input').val('');
			$('#addModal').find('.save').val("Add");
			$('#addModal').find('.save').prop("disabled", false);
		}
	});
	return false;
});

// Update Data
$("#Form2").submit(function()
{
	$('#editModal').find('.btn').val("saving....");
	$('#editModal').find('.btn').attr('disabled','disabled');
	$.ajax({
		type:"PUT",
		url:"action.php",
		data:$("#Form2").serialize(),
		success:function(data)
		{ 
			$(".OpenDataTable").ODTDestroy();
			$(".OpenDataTable").OpenDataTable({
			url:url,
		});
		if(data=='success')
		{  
			$("#editModal").find('.alert-success').show();
		}
		else{
			$("#editModal").find('.alert-danger').show();
		}
			$('#editModal').find('.btn').val("Update");
			$('#editModal').find('.btn').prop("disabled", false);
		}
	});
	return false;
});



//Delete Data
$(document).on("click", ".delete", function(event)
{
	$('#deleteModal').find('.delConfirm').attr('data-id',$(this).data("id"));
	return false;
});

$(document).on("click",".delConfirm",function(e){
	var id=$(this).attr('data-id');
	$.ajax({
		type:"DELETE",
		url:"action.php?id="+id,
		success:function(data)
		{ 
			$(".OpenDataTable").ODTDestroy();
			$(".OpenDataTable").OpenDataTable({
			url:url,
			});
		}
	});
	$('#deleteModal').removeClass('fade').modal('hide');
	return false;
});



//edit section
$(document).on("click", ".edit", function(event)
{
	$('#editModal').find('input[name=name]').val($(this).data('name'));
	$('#editModal').find('input[name=id]').val($(this).data('id'));
	$('#editModal').find('input[name=city]').val($(this).data('city'));
	$('#editModal').find('input[name=work_area]').val($(this).data('area'));
	$('#editModal').find('input[name=country]').val($(this).data('country'));
	$('#editModal').find('input[name=grade]').val($(this).data('grade'));
	$('#editModal').find('.alert-dismissible').hide();
});


});
