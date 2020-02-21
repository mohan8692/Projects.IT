var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var spinner_count = '<div class="row"><div class="col-sm-12"><img src="Assests/images/spinner.gif" style="width:20px;height:20px;"/></div></div>';
var globalResultsDepartments;
var globalResultsStatus;
var globalResultsComponent;
var globalResultsPanchayat;
var globalResultsMandal;
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});

setTimeout(function(){
 onloadCalls();
},1000);

$("#dateRangeConvergenceDateId").daterangepicker({
	locale: {
	  format: 'DD-MM-YYYY'
	},
	singleDatePicker: true,
    showDropdowns: true
});
$('#dateRangeConvergenceDateId').val("");
$("#dateRangeAdminSanctionId").daterangepicker({
	locale: {
	  format: 'DD-MM-YYYY'
	},
	singleDatePicker: true,
    showDropdowns: true
});	
$("#dateRangeCGFResDateId").daterangepicker({
	locale: {
	  format: 'DD-MM-YYYY'
	},
	singleDatePicker: true,
    showDropdowns: true
});
$('#dateRangeCGFResDateId').val("");
$("#dateRangeAdminSanctionId").daterangepicker({
	locale: {
	  format: 'DD-MM-YYYY'
	},
	singleDatePicker: true,
    showDropdowns: true
});
$("#dateRangeAdminSanctionId").val("");
$("#dateRangeTargetDateToFinishId").daterangepicker({
	locale: {
	  format: 'DD-MM-YYYY'
	},
	singleDatePicker: true,
    showDropdowns: true
});
$('#dateRangeTargetDateToFinishId').val("");
function onloadCalls(){
	$(".chosen-select").chosen();
	var locationtype='';
	initializeMultipleUploadNewDocument("uploadDocumentId");
	if(locationScopeId == 3){
		$(".mandalCls").show();
		getMandalsByDistrict("mandalId","Mandal");
		locationtype="district";
	}else{
		$(".mandalCls").hide();
		getPanchayatsByTehsil(locationScopeValue,"panchayatId","Panchayat")
		locationtype="mandal";
	}
	
	getDepartmentWiseDetails(clustrId);
	getWorkWiseDetailsByUser(locationtype,locationScopeValue,clustrId,"");
		
	getComponents("componenetId","Component");
	getAllStatus("workStatusId","Work Status");
	getDepartments("departmentId","Department");
}

function getMandalsByDistrict(divId,levelType){ 
	var json={
	}
	$.ajax({
		type:'POST',
		url:'getMandalsByDistrict',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,levelType);
			globalResultsMandal = result;
		}
	})
}
$(document).on("change","#mandalId",function(e){
	getPanchayatsByTehsil($(this).val(),"panchayatId","Panchayat")
});
function getPanchayatsByTehsil(locationId,divId,levelType){ 
	var json={
		"locationId" :locationId	
	}
	$.ajax({
		type:'POST',
		url:'getPanchayatsByTehsil',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,levelType);
			globalResultsPanchayat = result;
		}
	})
}
function getComponents(divId,levelType){ 
	var json={
		
	}
	$.ajax({
		type:'POST',
		url:'getComponents',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,levelType);
			globalResultsComponent = result;
		}
	})
}
function getAllStatus(divId,levelType){ 
	var json={
		
	}
	$.ajax({
		type:'POST',
		url:'getAllStatus',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,levelType);
			globalResultsStatus = result;
		}
	})
}
function getDepartments(divId,levelType){ 
	var json={
		
	}
	$.ajax({
		type:'POST',
		url:'getDepartments',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,levelType);
			globalResultsDepartments = result;
		}
	})
}
function buildSelectBox(result,divId,levelType){
	var str='';
		str+='<option value="0">Select '+levelType+'</option>';
		for(var i in result){
			if(divId == "departmentId"){
				str+='<option value="'+result[i].departmentId+'">'+result[i].departmentName+'</option>';
			}else if(divId == "workStatusId"){
				str+='<option value="'+result[i].statusId+'">'+result[i].statusName+'</option>';
			}else if(divId == "componenetId"){
				str+='<option value="'+result[i].rurbanComponentId+'">'+result[i].componentName+'</option>';
			}else{
				str+='<option value="'+result[i].id+'">'+result[i].name+'</option>';
			}
			
		}
		
	$("#"+divId).html(str);
	$("#"+divId).chosen();
	$("#"+divId).trigger("chosen:updated");
	
}
$(document).on("click",".rurbanworksCls li",function(e){
	var type = $(this).attr("attr_type");
	if(type == "work"){
		$(".worksCls").show();
		$(".dashBoardCls").hide();
	}else if(type == "dashBoard"){
		$(".dashBoardCls").show();
		$(".worksCls").hide();
	}
});
$( document ).ready(function() {
  
});
function getDepartmentWiseDetails(clustrId){   
  $('#totalWorksId').html(spinner_count);
  $('#totalCostId').html(spinner_count);
  $('#cgfCostId').html(spinner_count);
  $('#convergenceCostId').html(spinner_count);
  $('#cgfAmountReleasedId').html(spinner_count);  
  $('#adminSanctionedWorksId').html(spinner_count);
  $('#adminSanctionedFundId').html(spinner_count);
  $('#techSancId').html(spinner_count);
  $('#techSancPercId').html(spinner_count);
  $('#notTechSancId').html(spinner_count);
  $('#notTechSancPercId').html(spinner_count);
  $('#entrustedId').html(spinner_count);
  $('#entrustedPercId').html(spinner_count);
  $('#notEntrustedId').html(spinner_count);
  $('#notEntrustedPercId').html(spinner_count); 
  $('#groundedId').html(spinner_count); 
  $('#groundedPercId').html(spinner_count); 
  $('#notGroundedId').html(spinner_count); 
  $('#notGroundedPercId').html(spinner_count); 
  $('#completedIds').html(spinner_count); 
  $('#completedPercId').html(spinner_count); 
  $('#notCompletedId').html(spinner_count); 
  $('#notCompletedPercId').html(spinner_count); 
  $('#convReleasedId').html(spinner_count);
  var json={
	buildType:"cluster",
	clusterId:clustrId
  }
  $.ajax({
    type:'POST',
    url:'getClusterWiseCounts',
    datatType:'json',
    data: JSON.stringify(json),
    beforeSend : function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
    if(result !=null && result.length>0){
      buildOverAllData(result,clustrId);
    }else{
		var spinners="-";
		$('#totalWorksId').html(spinners);
		$('#totalCostId').html(spinners);
		$('#cgfCostId').html(spinners);
		$('#convergenceCostId').html(spinners);
		$('#cgfAmountReleasedId').html(spinners);  
		$('#adminSanctionedWorksId').html(spinners);
		$('#adminSanctionedFundId').html(spinners);
		$('#techSancId').html(spinners);
		$('#techSancPercId').html(spinners);
		$('#notTechSancId').html(spinners);
		$('#notTechSancPercId').html(spinners);
		$('#entrustedId').html(spinners);
		$('#entrustedPercId').html(spinners);
		$('#notEntrustedId').html(spinners);
		$('#notEntrustedPercId').html(spinners); 
		$('#groundedId').html(spinners); 
		$('#groundedPercId').html(spinners); 
		$('#notGroundedId').html(spinners); 
		$('#notGroundedPercId').html(spinners); 
		$('#completedIds').html(spinners); 
		$('#completedPercId').html(spinners); 
		$('#notCompletedId').html(spinners); 
		$('#notCompletedPercId').html(spinners);
		 $('#convReleasedId').html(spinners);
    }
    
  });
}

function buildOverAllData(result,clustrId){
  var str="";
  for(var i in  result){	
    if(result[i].id !=null && result[i].id ==clustrId){	
	  if(result[i].totalCount !=null && result[i].totalCount >0){
        $('#totalWorksId').html(result[i].totalCount);
      }else{
        $('#totalWorksId').html('-');
      }if(result[i].totalCost !=null && result[i].totalCost >0){
        $('#totalCostId').html(result[i].totalCost+' <small class="white_color">Crs</small> ');
      }else{
        $('#totalCostId').html('-');
      }if(result[i].cgfCost !=null && result[i].cgfCost >0){
        $('#cgfCostId').html(result[i].cgfCost+' <small class="white_color">Crs</small>');
      }else{
        $('#cgfCostId').html('-');
      }if(result[i].convergenceCost !=null && result[i].convergenceCost >0){
        $('#convergenceCostId').html(result[i].convergenceCost+' <small class="white_color">Crs</small>');
      }else{
        $('#convergenceCostId').html('-');
      }if(result[i].cgfAmountPaid !=null && result[i].cgfAmountPaid >0){
        $('#cgfAmountReleasedId').html(result[i].cgfAmountPaid+' <small class="white_color">Crs</small> ');
      }else{
        $('#cgfAmountReleasedId').html('-');
      } if(result[i].convergenceExpenditure !=null && result[i].convergenceExpenditure >0){
        $('#convReleasedId').html(parseFloat(result[i].convergenceExpenditure).toFixed(2)+' <small class="white_color">Crs</small> ');
      }else{
        $('#convReleasedId').html('-');
      } if(result[i].adminSanctionedAmt !=null && result[i].adminSanctionedAmt >0){
        $('#adminSanctionedFundId').html(result[i].adminSanctionedAmt+' <small class="white_color">Crs</small>');
      }else{
        $('#adminSanctionedFundId').html('-');
      }if(result[i].adminSanctioned !=null && result[i].adminSanctioned >0){
        $('#admSancId').html(result[i].adminSanctioned);
      }else{
        $('#admSancId').html('-');
      }if(result[i].adminSanctionedPerc !=null && result[i].adminSanctionedPerc >0){
        $('#admSancPercId').html(result[i].adminSanctionedPerc+' <small class="good_color">%</small>');
      }else{
        $('#admSancPercId').html('-');
      }if(result[i].notAdminSanctioned !=null && result[i].notAdminSanctioned >0){
        $('#notAdmSancId').html(result[i].notAdminSanctioned);
      }else{
        $('#notAdmSancId').html('-');
      }if(result[i].notAdminSanctionedPer !=null && result[i].notAdminSanctionedPer >0){
        $('#notAdmSancPercId').html(result[i].notAdminSanctionedPer+' <small class="good_color">%</small>');
      }else{
        $('#notAdmSancPercId').html('-');
      }if(result[i].techSanctioned !=null && result[i].techSanctioned >0){
        $('#techSancId').html(result[i].techSanctioned);
      }else{
        $('#techSancId').html('-');
      }if(result[i].techSanctionedPerc !=null && result[i].techSanctionedPerc >0){
        $('#techSancPercId').html(result[i].techSanctionedPerc+' <small class="good_color">%</small>');
      }else{
        $('#techSancPercId').html('-');
      }if(result[i].notTechSanctioned !=null && result[i].notTechSanctioned >0){
        $('#notTechSancId').html(result[i].notTechSanctioned);
      }else{
        $('#notTechSancId').html('-');
      }if(result[i].notTechSanctionedPerc !=null && result[i].notTechSanctionedPerc >0){
        $('#notTechSancPercId').html(result[i].notTechSanctionedPerc+' <small class="good_color">%</small>');
      }else{
        $('#notTechSancPercId').html('-');
      }if(result[i].entrusted !=null && result[i].entrusted >0){
        $('#entrustedId').html(result[i].entrusted);
      }else{
        $('#entrustedId').html('-');
      }if(result[i].entrustedPerc !=null && result[i].entrustedPerc >0){
        $('#entrustedPercId').html(result[i].entrustedPerc+' <small class="good_color">%</small>');
      }else{
        $('#entrustedPercId').html('-');
      }if(result[i].notEntrusted !=null && result[i].notEntrusted >0){
        $('#notEntrustedId').html(result[i].notEntrusted);
      }else{
        $('#notEntrustedId').html('-');
      }if(result[i].notEntrustedPerc !=null && result[i].notEntrustedPerc >0){
        $('#notEntrustedPercId').html(result[i].notEntrustedPerc+' <small class="good_color">%</small>');
      }else{
        $('#notEntrustedPercId').html('-');
      }if(result[i].grounded !=null && result[i].grounded >0){
        $('#groundedId').html(result[i].grounded);
      }else{
        $('#groundedId').html('-');
      }if(result[i].groundedPerc !=null && result[i].groundedPerc >0){
        $('#groundedPercId').html(result[i].groundedPerc+' <small class="good_color">%</small>');
      }else{
        $('#groundedPercId').html('-');
      }if(result[i].notGrounded !=null && result[i].notGrounded >0){
        $('#notGroundedId').html(result[i].notGrounded);
      }else{
        $('#notGroundedId').html('-');
      }if(result[i].notGroundedPerc !=null && result[i].notGroundedPerc >0){
        $('#notGroundedPercId').html(result[i].notGroundedPerc+' <small class="good_color">%</small>');
      }else{
        $('#notGroundedPercId').html('-');
      }if(result[i].completed !=null && result[i].completed >0){
        $('#completedId').html(result[i].completed);
      }else{
        $('#completedId').html('-');
      }if(result[i].completedPerc !=null && result[i].completedPerc >0){
        $('#completedPercId').html(result[i].completedPerc+' <small class="good_color">%</small>');
      }else{
        $('#completedPercId').html('-');
      }if(result[i].underProgress !=null && result[i].underProgress >0){
        $('#notCompletedId').html(result[i].underProgress);
      }else{
        $('#notCompletedId').html('-');
      }if(result[i].underProgressPerc !=null && result[i].underProgressPerc >0){
        $('#notCompletedPercId').html(result[i].underProgressPerc+' <small class="good_color">%</small>');
      }else{
        $('#notCompletedPercId').html('-');
      }
	  if(result[i].adminSanctionedAmt !=null && result[i].adminSanctionedAmt >0){
        $('#adminSancAmtId').html(result[i].adminSanctionedAmt+' <small>Crs</small> ');
      }else{
        $('#adminSancAmtId').html('-');
      }if(result[i].totalCost !=null && result[i].totalCost >0){
        $('#notAdminSancAmtId').html(parseFloat(result[i].totalCost-result[i].adminSanctionedAmt).toFixed(2)+' <small>Crs</small> ');
      }else{
        $('#notAdminSancAmtId').html('-');
      }if(result[i].techSanctionedAmt !=null && result[i].techSanctionedAmt >0){
        $('#techSancAmtId').html(result[i].techSanctionedAmt+' <small>Crs</small> ');
      }else{
        $('#techSancAmtId').html('-');
      }if(result[i].notTechSanctionedAmt !=null && result[i].notTechSanctionedAmt >0){
        $('#notTechSancAmtId').html(result[i].notTechSanctionedAmt+' <small>Crs</small> ');
      }else{
        $('#notTechSancAmtId').html('-');
      }if(result[i].entrustedAmt !=null && result[i].entrustedAmt >0){
        $('#entrustedAmtId').html(result[i].entrustedAmt+' <small>Crs</small> ');
      }else{
        $('#entrustedAmtId').html('-');
      }if(result[i].notEntrustedAmt !=null && result[i].notEntrustedAmt >0){
        $('#notEntrustedAmtId').html(result[i].notEntrustedAmt+' <small>Crs</small> ');
      }else{
        $('#notEntrustedAmtId').html('-');
      }if(result[i].groundedAmt !=null && result[i].groundedAmt >0){
        $('#groundedAmtId').html(result[i].groundedAmt+' <small>Crs</small> ');
      }else{
        $('#groundedAmtId').html('-');
      }if(result[i].notGroundedAmt !=null && result[i].notGroundedAmt >0){
        $('#notGroundedAmtId').html(result[i].notGroundedAmt+' <small>Crs</small> ');
      }else{
        $('#notGroundedAmtId').html('-');
      }if(result[i].completedAmt !=null && result[i].completedAmt >0){
        $('#completedAmtId').html(result[i].completedAmt+' <small>Crs</small> ');
      }else{
        $('#completedAmtId').html('-');
      }if(result[i].underProgressAmt !=null && result[i].underProgressAmt >0){
        $('#notCompletedAmtId').html(result[i].underProgressAmt+' <small>Crs</small> ');
      }else{
        $('#notCompletedAmtId').html('-');
      }
    }
  }
  $('#overAllBlockDataId').html(str);
}
function getWorkWiseDetailsByUser(locationType,locationId,clusterId,workId){ 
		$('#workDetailsId').html(spinner);
		$('.worksDeleteCls').hide();
		var json={
		locationType : locationType,
		locationId : locationId,
		clusterId : clusterId,
		workId : workId
	}
	$.ajax({
		type:'POST',
		url:'getWorkWiseDetailsByUser',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildWorkWiseDetailsByUser(result,locationType);
			
		}else{
			$('#workDetailsId').html("NO DATA AVAILABLE");
		}
	})
}
$(document).on("click",".workWiseDetailsCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	console.log(type);
	console.log(locationScopeId);
	var locationtype='';
	if(locationScopeId == "3"){
		locationtype="district";
	}else if(locationScopeId == "5"){
		locationtype="mandal";
	}
	if(type == "works"){	
		$('.worksDeleteCls').show();
		getWorkWiseDetailsByUser(locationtype,locationScopeValue,clustrId,"");
	}else {
		$('.worksDeleteCls').hide();
		getComponentandDepartmentWiseWorksDetails(clustrId,locationScopeValue,locationtype,type);
	}

});
function buildWorkWiseDetailsByUser(result,locationType){
	var tableView='';
		tableView+='<div class="table-responsive m_top10">';
	
		tableView+='<table class="table table-bordered table_custom_SC" id="worksTable" style="width:100% !important;">';
			tableView+='<thead>';
				tableView+='<tr>';
					tableView+='<th rowspan="2">Work Id</th>';
					tableView+='<th  rowspan="2">Works Name</th>';
					tableView+='<th rowspan="2">Panchayat Name</th>';
					tableView+='<th  rowspan="2">Department Name</th>';
					tableView+='<th  rowspan="2">Update</th>';
					tableView+='<th  rowspan="2">Status</th>';
					tableView+='<th  colspan="3">Estimated Cost</th>';
					tableView+='<th  rowspan="2">C.G.F Expenditure</th>';
					tableView+='<th  rowspan="2">Conv. Expenditure</th>';
					tableView+='<th  rowspan="2">Admin Sanctioned Fund</th>';
					tableView+='<th  rowspan="2">Delete</th>';
				tableView+='</tr>';
				tableView+='<tr>';
					tableView+='<th>Total</th>';
					tableView+='<th>C.G.F</th>';
					tableView+='<th>Conv.</th>';
				tableView+='</tr>';
			tableView+='</thead> ';             
			tableView+='<tbody>';
			for(var i in result){
				tableView+='<tr>';	
					if(result[i].rurbanWorkId !=  null){
						tableView+='<td style="text-align:left !important;">'+result[i].rurbanWorkId+'</td>';
					}else{
						tableView+='<td>-</td>';
					}	
					tableView+='<td>'+result[i].rurbanWorkName+'</td>';
					if(result[i].panchayatName !=  null){
						tableView+='<td style="text-align:left !important;">'+result[i].panchayatName+'</td>';
					}else{
						tableView+='<td>-</td>';
					}	
					if(result[i].departmentName != null){
						tableView+='<td>'+result[i].departmentName+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					
					tableView+='<td><i class="fa fa-edit worksEditCls" style="cursor:pointer; color: #63a3d4;" attr_works_Id="'+result[i].rurbanWorkId+'" attr_cluster_id="'+result[i].clusterId+'" attr_locationId="'+result[i].tehsilId+'" attr_locationType="'+locationType+'"></i></td>';
					
					if(result[i].statusName != null){
						tableView+='<td>'+result[i].statusName+'</td>';
					} else{
						tableView+='<td>-</td>';
					}
					if(result[i].totalCost != null && result[i].totalCost > 0){
						tableView+='<td>'+parseFloat(result[i].totalCost).toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].cgfCost != null && result[i].cgfCost > 0){
						tableView+='<td>'+parseFloat(result[i].cgfCost).toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].convergenceCost != null && result[i].convergenceCost > 0){
						tableView+='<td>'+parseFloat(result[i].convergenceCost).toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].cgfAmountPaid != null && result[i].cgfAmountPaid > 0){
						tableView+='<td>'+parseFloat(result[i].cgfAmountPaid).toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].convergenceExpenditure != null && result[i].convergenceExpenditure > 0){
						tableView+='<td>'+parseFloat(result[i].convergenceExpenditure).toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].adminSanctionedAmount != null && result[i].adminSanctionedAmount > 0){
						tableView+='<td>'+parseFloat(result[i].adminSanctionedAmount).toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					tableView+='<td><input type="checkbox" class="worksDeleteChkCls"  attr_works_Id="'+result[i].rurbanWorkId+'" attr_cluster_id="'+result[i].clusterId+'" /></td>';
				tableView+='</tr>';
			}
			tableView+='</tbody>';               
		tableView+='</table>';
		tableView+='</div>';
	$('#workDetailsId').html(tableView);
	$('.tooltipCls').tooltip();
	$("#worksTable").dataTable({
		"iDisplayLength": 10,
			"aaSorting": [],
			"order": [ 0, 'asc' ],
			"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			buttons: [
				{
					extend		:'csvHtml5',
					text		:'<i class="fa fa-file-text-o"></i>',
					titleAttr	: 'CSV',
					title		:  "ENC WORKS DASHBOARD",
					filename	:  'Rurban Work Wise detais'+moment().format("DD/MMMM/YYYY  HH:MM:SS"),
				}
			]
	});
}
function getComponentandDepartmentWiseWorksDetails(clustrId,locationId,locationType,buildType){ 
		$('#workDetailsId').html(spinner);
		var json={
		locationType : locationType,
		locationId : locationId,
		clustrId : clustrId,
		buildType : buildType
	}
	console.log(json);
	$.ajax({
		type:'POST',
		url:'getComponentandDepartmentWiseWorksDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildComponentandDepartmentWiseWorksDetails(result,buildType);
		}else{
			$('#workDetailsId').html("NO DATA AVAILABLE");
		}
	})
}
function buildComponentandDepartmentWiseWorksDetails(result,buildType){

	var totalWorksCount=0;
	var estimatedTotalCount=0;
	var totalEstimatedCgf=0;
	var totalEstimatedConvergence=0;
	var totalCgfSanctioned=0;
	var totalAdminWorks = 0;
	var totalAdminFund =0;
	var totalTechWorks=0;
	var totalEntrusted=0;
	var totalGrounded=0;
	var totalInprogress=0;
	var totalCompleted=0;
	var totalEfficiency=0,totalConvExpenditure =0;
	var tableView='';
		tableView+='<div class="table-responsive m_top10">';
		tableView+='<table class="table table-bordered table_custom_SC" id="cmptDeptTable" style="width:100% !important;">';
			tableView+='<thead>';
				tableView+='<tr>';
					if(buildType == "component"){
						tableView+='<th rowspan="2">Component Name</th>';
					}else if(buildType == "department"){
						tableView+='<th rowspan="2">Department Name</th>';
					}
					tableView+='<th rowspan="2">Total Works</th>';
					tableView+='<th colspan="3">Estimated Cost</th>';
					tableView+='<th rowspan="2">C.G.F Sanctioned</th>';
					tableView+='<th rowspan="2">Conv. Expenditure</th>';
					tableView+='<th colspan="2">Admin Sanctioned</th>';
					tableView+='<th rowspan="2">Technical Sanctioned Works</th>';
					tableView+='<th rowspan="2">Entrusted Works</th>';
					tableView+='<th rowspan="2" style="background-color:#f9eee3;">Efficiency &nbsp;%</th>';
					tableView+='<th rowspan="2">Grounded</th>';
					tableView+='<th rowspan="2">In Progress</th>';
					tableView+='<th rowspan="2">Completed</th>';
				tableView+='</tr>';
				tableView+='<tr>';
					tableView+='<th>Total</th>';
					tableView+='<th>C.G.F</th>';
					tableView+='<th>Conv.</th>';
					tableView+='<th>Works</th>';
					tableView+='<th>Fund</th>';
				tableView+='</tr>';
			tableView+='</thead>';
			tableView+='<tbody>';
			for(var i in result){

				var efficiency=0;
				if(result[i].adminsanctionedCount != null && result[i].adminsanctionedCount >0 && result[i].groundedCount != null && result[i].groundedCount >0){
					efficiency = (result[i].groundedCount)*100/result[i].adminsanctionedCount;
				}
				totalWorksCount = totalWorksCount+result[i].totalWorksCount;
				estimatedTotalCount = estimatedTotalCount +result[i].estimatedTotal;
				totalEstimatedCgf = totalEstimatedCgf + result[i].estimatedCgf;
				totalEstimatedConvergence = totalEstimatedConvergence + result[i].estimatedConvergence;
				totalCgfSanctioned = totalCgfSanctioned + result[i].estimatedCgfAMountPaid;
				totalConvExpenditure = totalConvExpenditure + result[i].convergenceExpenditure;
				totalAdminWorks = totalAdminWorks + result[i].adminsanctionedCount;
				totalAdminFund = totalAdminFund+result[i].adminSanctionedFund;
				totalTechWorks = totalTechWorks + result[i].techSanctionedCount;
				totalEntrusted = totalEntrusted + result[i].entrustedCount;
				totalGrounded = totalGrounded + result[i].groundedCount;
				totalInprogress = totalInprogress + result[i].inProgressCount;
				totalCompleted = totalCompleted + result[i].completedCount;
				
				tableView+='<tr>';
					if(buildType == "component"){
						if(result[i].componentName != null && result[i].componentName.length>0){
							tableView+='<td>'+result[i].componentName+'</td>';
						} else{
							tableView+='<td>-</td>';
						}
					}else if(buildType == "department"){
						if(result[i].departmentName != null){
							tableView+='<td>'+result[i].departmentName+'</td>';
						} else{
							tableView+='<td>-</td>';
						}
					}					
					if(result[i].totalWorksCount != null && result[i].totalWorksCount >0){
						tableView+='<td>'+result[i].totalWorksCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].estimatedTotal != null && result[i].estimatedTotal >0){
						tableView+='<td>'+result[i].estimatedTotal+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].estimatedCgf != null && result[i].estimatedCgf >0){
						tableView+='<td>'+result[i].estimatedCgf+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].estimatedConvergence != null && result[i].estimatedConvergence >0){
						tableView+='<td>'+result[i].estimatedConvergence+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].estimatedCgfAMountPaid != null && result[i].estimatedCgfAMountPaid >0){
						tableView+='<td>'+result[i].estimatedCgfAMountPaid+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].convergenceExpenditure != null && result[i].convergenceExpenditure >0){
						tableView+='<td>'+result[i].convergenceExpenditure.toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].adminsanctionedCount != null && result[i].adminsanctionedCount >0){
						tableView+='<td>'+result[i].adminsanctionedCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].adminSanctionedFund != null && result[i].adminSanctionedFund >0){
						tableView+='<td>'+result[i].adminSanctionedFund.toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					
					if(result[i].techSanctionedCount != null && result[i].techSanctionedCount >0){
						tableView+='<td>'+result[i].techSanctionedCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].entrustedCount != null && result[i].entrustedCount >0){
						tableView+='<td>'+result[i].entrustedCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(efficiency != null && efficiency >0){
						tableView+='<td style="background-color:#f9eee3;>'+efficiency.toFixed(2)+'&nbsp;%</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].groundedCount != null && result[i].groundedCount >0){
						tableView+='<td>'+result[i].groundedCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].inProgressCount != null && result[i].inProgressCount >0){
						tableView+='<td>'+result[i].inProgressCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].completedCount != null && result[i].completedCount >0){
						tableView+='<td>'+result[i].completedCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
			}						
				tableView+='</tr>';
			tableView+='</tbody>';

				if(totalGrounded != null &&totalGrounded>0 && totalAdminWorks != null && totalAdminWorks>0){
					totalEfficiency = (totalGrounded *100)/totalAdminWorks;
				}
				tableView+='<tr>';
					tableView+='<th>Total</th>';
					if(totalWorksCount != null && totalWorksCount>0){
						tableView+='<td>'+totalWorksCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(estimatedTotalCount != null && estimatedTotalCount>0){
						tableView+='<td>'+estimatedTotalCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalEstimatedCgf != null && totalEstimatedCgf>0){
						tableView+='<td>'+totalEstimatedCgf.toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalEstimatedConvergence != null && totalEstimatedConvergence>0){
						tableView+='<td>'+totalEstimatedConvergence.toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalCgfSanctioned != null && totalCgfSanctioned>0){
						tableView+='<td>'+totalCgfSanctioned.toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalConvExpenditure != null && totalConvExpenditure >0){
						tableView+='<td>'+totalConvExpenditure.toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalAdminWorks != null && totalAdminWorks>0){
						tableView+='<td>'+totalAdminWorks+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalAdminFund != null && totalAdminFund>0){
						tableView+='<td>'+totalAdminFund.toFixed(2)+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalTechWorks != null && totalTechWorks>0){
						tableView+='<td>'+totalTechWorks+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalEntrusted != null && totalEntrusted>0){
						tableView+='<td>'+totalEntrusted+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalEfficiency != null && totalEfficiency >0){
						tableView+='<td style="background-color:#f9eee3;>'+totalEfficiency.toFixed(2)+'&nbsp;%</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalGrounded != null && totalGrounded>0){
						tableView+='<td>'+totalGrounded+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalInprogress != null && totalInprogress>0){
						tableView+='<td>'+totalInprogress+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(totalCompleted != null && totalCompleted>0){
						tableView+='<td>'+totalCompleted+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
				tableView+='</tr>';
			
		tableView+='</table>';
	tableView+='</div>';
	
	$('#workDetailsId').html(tableView);
	$('.tooltipCls').tooltip();
		$("#cmptDeptTable").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]]
	});
}
$(document).on("click",".worksEditCls",function(e){
	var workId = $(this).attr("attr_works_Id");
	var clusterId = $(this).attr("attr_cluster_id");
	var locationId = $(this).attr("attr_locationId");
	var locationType = $(this).attr("attr_locationType");
	$("#workUpdationModalId").modal("show");
	getWorkWiseDetailsByUserByUpdation(locationType,locationId,clusterId,workId);
});

function getWorkWiseDetailsByUserByUpdation(locationType,locationId,clusterId,workId){ 
		$("#workWiseUpdationDivId").html(spinner);
		var json={
		locationType : locationType,
		locationId : locationId,
		clusterId : clusterId,
		workId : workId
	}
	$.ajax({
		type:'POST',
		url:'getWorkWiseDetailsByUser',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildWorkWiseDetailsByUserByUpdation(result,locationType,workId);
		}else{
			$("#workWiseUpdationDivId").html("No Data Available")
		}
	})
}

function buildWorkWiseDetailsByUserByUpdation(result,locationType,workId){
	var str='';
	var cgfDate="";
	var targetDate="";
	var adminDate="";
	var convergence="";
	for(var i in result){
		$('#estimationCostUpdatedId').val(parseFloat(result[i].totalCost).toFixed(2))
		adminDate =result[i].adminSanctionedDate;targetDate=result[i].targetDate;
		cgfDate=result[i].cgfReleasedDate;
		convergence=result[i].convergenceExpenditureDate
			str+='<form action="updateWorkdata" id="updateWorkdataID" enctype="multipart/form-data" method="post">';
		str+='<div class="row">';
			 str+='<div class="col-sm-8">';
			str+='<label>Enter Work Name</label>';
			str+='<input type="text" class="form-control" id="workNameUpdatedId" name= "workName" value="'+result[i].rurbanWorkName+'" placeholder="Enter Work Name" >';
		str+=' </div>';	
		str+='</div>';
		str+='<div class="row">';
			str+='<div class="col-sm-2 m_top10">';
				str+='<label>Panchayat</label>';
				str+='<select class="form-control chosen-select" id="panchayatUpdatedId" name="panchayatId" >';
					if(globalResultsPanchayat !=null && globalResultsPanchayat.length>0){
						str+='<option value="0">Select Panchayat</option>';
						for(var j in globalResultsPanchayat){
							if(globalResultsPanchayat[j].id == result[i].panchayatId){
								str+='<option value="'+globalResultsPanchayat[j].id+'" selected>'+globalResultsPanchayat[j].name+'</option>';
							}else{
								str+='<option value="'+globalResultsPanchayat[j].id+'">'+globalResultsPanchayat[j].name+'</option>';
							}
						}
					}
				str+='</select>';
			str+='</div>';
			
			str+='<div class="col-sm-2 m_top10">';
				str+='<label>Components</label>';
				str+='<select class="form-control chosen-select" id="componenetUpdatedId" name="componentId" >';
					if(globalResultsComponent !=null && globalResultsComponent.length>0){
						str+='<option value="0">Select Component</option>';
						for(var j in globalResultsComponent){
							if(globalResultsComponent[j].rurbanComponentId == result[i].rurbanComponentId){
								str+='<option value="'+globalResultsComponent[j].rurbanComponentId+'" selected>'+globalResultsComponent[j].componentName+'</option>';
							}else{
								str+='<option value="'+globalResultsComponent[j].rurbanComponentId+'">'+globalResultsComponent[j].componentName+'</option>';
							}
						}
					}
				str+='</select>';	
			str+='</div>';
			
			str+='<div class="col-sm-2 m_top10">';
				str+='<label>Departments</label>';
				str+='<select class="form-control chosen-select" id="departmentUpdatedId" name="departmentId" >';
					if(globalResultsDepartments !=null && globalResultsDepartments.length>0){
						str+='<option value="0">Select Department</option>';
						for(var j in globalResultsDepartments){
							if(globalResultsDepartments[j].departmentId == result[i].departmentId){
								str+='<option value="'+globalResultsDepartments[j].departmentId+'" selected>'+globalResultsDepartments[j].departmentName+'</option>';
							}else{
								str+='<option value="'+globalResultsDepartments[j].departmentId+'">'+globalResultsDepartments[j].departmentName+'</option>';
							}
						}
					}
				str+='</select>';	
			str+='</div>';
			str+='<div class="col-sm-2 m_top10">';
				str+='<label>Work Status</label>';
				str+='<select class="form-control chosen-select" id="workStatusUpdatedId" name="workStatusId">';
					if(globalResultsStatus !=null && globalResultsStatus.length>0){
						str+='<option value="0" disabled>Select Work Status</option>';
						for(var j in globalResultsStatus){
								/* if(result[i].statusId-1 < globalResultsStatus[j].statusId){
									if(globalResultsStatus[j].statusId == result[i].statusId){
										str+='<option value="'+globalResultsStatus[j].statusId+'" selected>'+globalResultsStatus[j].statusName+'</option>';
									}else{
										str+='<option value="'+globalResultsStatus[j].statusId+'">'+globalResultsStatus[j].statusName+'</option>';
									}
								}else{
									str+='<option value="'+globalResultsStatus[j].statusId+'" disabled>'+globalResultsStatus[j].statusName+'</option>';
								} */
								if(globalResultsStatus[j].statusId == result[i].statusId){
								str+='<option value="'+globalResultsStatus[j].statusId+'" selected>'+globalResultsStatus[j].statusName+'</option>';
							}else{
								str+='<option value="'+globalResultsStatus[j].statusId+'">'+globalResultsStatus[j].statusName+'</option>';
							}
						}
					}
				str+='</select>';
			str+='</div>';
		str+='</div>';
		str+='<hr style="border-top: 1px solid #ccc;"/>';
		str+='<div class="row">';
			str+='<div class="col-sm-3 m_top10">';
				str+='<label>Estimation Cost</label><br>';
				str+='<div class="col-sm-6 m_top20">';
					str+='CGF :';
				str+='</div>';
				str+='<div class="col-sm-6">';
					str+='<input type="text" class="form-control m_top10" value="'+parseFloat(result[i].cgfCost).toFixed(2)+'"  id="estimationCostUpdated1Id" name="TotalCgfAmount" placeholder="Enter CGF In Lakhs" onkeyup=updateEstimatedTotalAmount()>';
				str+='</div>';
				str+='<div class="col-sm-6 m_top20">';
					str+=' Convergence :';
				str+='</div>';
				str+='<div class="col-sm-6">';
					str+='<input type="text" class="form-control m_top10" value="'+parseFloat(result[i].convergenceCost).toFixed(2)+'"  id="estimationCostUpdated2Id" placeholder="Enter Convergence In Lakhs" name="totalConvergenceAmount" onkeyup=updateEstimatedTotalAmount()>';					
				str+='</div>';
				str+='<div class="col-sm-6 m_top20">';
					str+='Total :';
				str+='</div>';
				str+='<div class="col-sm-6">';
					str+='<input type="text" class="form-control m_top10" name="totalAmount" value="'+parseFloat(result[i].totalCost).toFixed(2)+'" id="estimationCostUpdatedId" name= "totalAmount" placeholder="Enter Total Cost In Lakhs" disabled>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-2 m_top10">';
				str+='<label class="m_top20">Convergence Paid Date</label>';
				str+='<div class="row">';
					str+='<div class="col-sm-12 m_top10">';
						str+='<span class="input-group dateRangePickerCls">'; 
							str+='<input type="text" class="form-control" id="convExpDateUpdatedId" value="'+result[i].convergenceExpenditureDate+'"  name="convExpDate" style="width:135px;"/>';
							str+='<span class="input-group-addon">';
								str+='<i class="glyphicon glyphicon-calendar"></i>';
							str+='</span>';
						str+='</span>';
					str+='</div>';
				str+='</div>';
				str+='<label class="m_top10">Convergence Expenditure</label>';
				str+='<input type="text" class="form-control" value="'+parseFloat(result[i].convergenceExpenditure).toFixed(2)+'" id="convergenceExpenditureUpdatedId"  name="convergenceExpenditure" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value)"  placeholder="Enter Amount In Lakhs" >';
			str+='</div>';
			str+='<div class="col-sm-2 m_top10">';
				str+='<label class="m_top20">CGF Paid Date</label>';
				str+='<div class="row">';
					str+='<div class="col-sm-12 m_top10">';
						str+='<span class="input-group dateRangePickerCls">'; 
							str+='<input type="text" id="CGFResDateUpdatedId" value='+result[i].cgfReleasedDate+'  name="cgfReleasedDate" style="width:135px;" class="form-control" />';
							str+='<span class="input-group-addon">';
								str+='<i class="glyphicon glyphicon-calendar"></i>';
							str+='</span>';
						str+='</span>';
					str+='</div>';
				str+='</div>';
				str+='<label class="m_top10">CGF Expenditure</label>';
				str+='<input type="text" class="form-control" value="'+parseFloat(result[i].cgfAmountPaid).toFixed(2)+'" id="cgfReleasedUpdatedId"  name="cgfReleasedAmount" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value)"  placeholder="Enter Amount In Lakhs" >';
			str+='</div>';
			str+='<div class="col-sm-2 m_top10">';
				str+='<label class="m_top20">Admin Sanctioned Date</label>';
				str+='<div class="row">';
					str+='<div class="col-sm-12 m_top10">';
						str+='<span class="input-group dateRangePickerCls">';
							str+='<input type="text" id="adminSanctionDateUpdatedId" value='+result[i].adminSanctionedDate+' name="adminSanctionedDate" style="width:135px;" class="form-control"/>';
							str+='<span class="input-group-addon">';
								str+='<i class="glyphicon glyphicon-calendar"></i>';
							str+='</span>';
						str+='</span>';
					str+='</div>'; 
				str+='</div>'; 
				str+='<label class="m_top10">Admin Sanctioned</label>';
				str+='<input type="text" class="form-control" value="'+parseFloat(result[i].adminSanctionedAmount).toFixed(2)+'" id="adminSanctionUpdatedId" name="adminSanctionedAmount" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value)"   placeholder="Enter Amount In Lakhs" >';
			str+='</div>';
			str+='<div class="col-sm-5 m_top10">';
				str+='<label class="m_top20">Target Date to Finish</label>';
				str+='<div class="row">';
					str+='<div class="col-sm-12 m_top10">';
						str+='<span class="input-group dateRangePickerCls">';
							str+='<input type="text" id="TargetDateToFinishUpdatedId" name="tagetDate" style="width:135px;" value="'+result[i].targetDate+'" class="form-control" />';
							str+='<span class="input-group-addon">';
								str+='<i class="glyphicon glyphicon-calendar"></i>';
							str+='</span>';
						str+='</span>';
					str+='</div>'; 
				str+='</div>'; 
				/* str+='<div class="row">';
					str+='<div class="col-sm-5">';				
						str+='<label class="m_top10">Already Paid to Agency</label>';
						str+='<input type="text" class="form-control" name=""value="'+parseFloat(result[i].totalMadeAmount).toFixed(2)+'" id="" style="width:120px;" placeholder="Enter Amount In Lakhs" disabled>';						
					str+='</div>';
					if(parseFloat(result[i].totalMadeAmount) < parseFloat(result[i].adminSanctionedAmount)){
						str+='<div class="col-sm-5">';				
							str+='<label class="m_top10">Amount Paid to Agency</label>';
							str+='<input type="text" class="form-control" name="releasedAmount"value="0" id="amountPaidVendorUpdatedId" style="width:120px;" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value)"  placeholder="Enter Amount In Lakhs">';						
						str+='</div>';
					}
				str+='</div>'; */
			str+='</div>';
		
		str+='</div>';
		
		/* str+='<div class="row">';
			str+='<div class="col-sm-3 m_top10">';
				str+='<label>Add Files</label>';
				str+='<input type="file" value="" name="uploadDocuments" id="uploadDocumentUpdatedId" />';
			str+='</div>';
		str+='</div>';
 */		str+='<div class="row">';
			str+='<div class="col-sm-2 m_top20">';
				str+='<button type="button" class="btn btn-primary btn-md font_weight" id="updateProfileId" onclick="updateWork('+workId+')">UPDATE</button>';
			str+='</div>';
			str+='<div id="successSpinnerDivId1" style="display:none;">';
				str+='<div class="col-sm-1 m_top20">';
					str+='<div class="d2d-loader"><div class="loader"></div>';
						str+='<img src="Assests/images/spinner.gif" style="width:42px;"/>';
					str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='</div>';	
		str+='<div class="row">';
			str+='<div class="col-sm-6 col-sm-offset-2">';
				str+='<h4 id="otpSuccssMgsId1" class="text-center font_weight" style="color:green;"></h4>';
			str+='</div>';
		str+='</div>';
		str+='</form>';
	}	
	$("#workWiseUpdationDivId").html(str);
	$("#mandalUpdatedId, #panchayatUpdatedId, #componenetUpdatedId, #departmentUpdatedId, #workStatusUpdatedId").chosen().trigger("chosen:updated");
	initializeMultipleUploadNewDocument("uploadDocumentUpdatedId");
	
	$("#convExpDateUpdatedId").daterangepicker({
		locale: {
		  format: 'DD-MM-YYYY'
		},
		singleDatePicker: true,
		showDropdowns: true
	});
	
	$("#CGFResDateUpdatedId").daterangepicker({
		locale: {
		  format: 'DD-MM-YYYY'
		},
		singleDatePicker: true,
		showDropdowns: true
	});
	$("#adminSanctionDateUpdatedId").daterangepicker({
		locale: {
		  format: 'DD-MM-YYYY'
		},
		singleDatePicker: true,
		showDropdowns: true
	});
	$("#TargetDateToFinishUpdatedId").daterangepicker({
		locale: {
		  format: 'DD-MM-YYYY'
		},
		singleDatePicker: true,
		showDropdowns: true
	});
	if(cgfDate.trim().length == 0){
		$("#CGFResDateUpdatedId").val("");
	}if(targetDate.trim().length == 0){
		$("#TargetDateToFinishUpdatedId").val("");
	}if(adminDate.trim().length == 0){
		$("#adminSanctionDateUpdatedId").val("");
	}if(convergence.trim().length ==0){
		$("#convExpDateUpdatedId").val("");
	}
}


function submitWork(){
	 var isValid = validateData();
	//alert("isValid"+isValid);
	if(isValid==0){
		return;
	} 
	var formData = new FormData(); 
	$('#workdataID input,#workdataID select').each(function(){  
		var input = $(this);
		var attr = input.attr('name');
		var value = input.val();
		var text =input.attr('type');
		var voName = $(this).attr("attr_name");
		var id=$(this).attr("id");
		/* if(text == "file" || skipVar == 'skip'){
			if(id=="uploadDocumentId"){//fileList
			console.log(this.files.length);
				if(this.files !=null && this.files.length>0){
					 for(var i = 0; i < this.files.length; i++){
						formData.append(voName+"["+i+"].multipartFile", this.files[i]);
						console.log(voName+"["+i+"].multipartFile", this.files[i])
					 }
				}
			}
		}
		 if (typeof attr !== typeof undefined && attr !== false) {
			 if(skipVar !='skip' && text !="file"){
				formData.append(input.attr('name'), htmlEncode(input.val()));
			 }
		 } */
		 formData.append(input.attr('name'), input.val());
		 formData.append("clusterId",clustrId);
	});  
	 saveAndUpdateWork(formData,"save");
}

function validateData(){
	var flag = 1;
	var workName = $("#workNameId").val();
	var mandalId = $("#mandalId").val();    
	var panchayatId = $("#panchayatId").val();
	var componenetId = $("#componenetId").val();
	var departmentId = $("#departmentId").val();
	var workStatusId = $("#workStatusId").val();
	var estimationCostId = $("#estimationCostId").val();
	var estimationCost1Id = $("#estimationCost1Id").val();
	var estimationCost2Id = $("#estimationCost2Id").val();
	var cgfReleasedId = $("#cgfReleasedId").val();
	var cgfReleasedDate = $("#cgfReleasedDate").val();
	var adminSanctionId = $("#adminSanctionId").val();
	var dateRangeAdminSanctionId = $("#dateRangeAdminSanctionId").val();
	var amountPaidVendorId = $("#amountPaidVendorId").val();
	var uploadDocumentId = $("#uploadDocumentId").val();
	var convergenceExpenditure= $("#convergenceExpenditureId").val();
	var dateRangeConvergenceDate= $("#dateRangeConvergenceDateId").val();
	//work name
	if(workName == null || workName.trim().length == 0){ 
		$("#errWorkNameId").show();      
		$("#errWorkNameId").text("Enter Work Name");
		flag=0;
		return flag;
	}else{
		$("#errWorkNameId").hide();
	}
	//panchayatId name 
	if(panchayatId == null || panchayatId.trim().length == 0 || panchayatId==0){ 
		$("#errPanchayatId").show();      
		$("#errPanchayatId").text("Please select Panchayat");
		flag=0;
		return flag;
	}else{
		$("#errPanchayatId").hide();
	}

	//componenetId number
	if(componenetId == null || componenetId.trim().length == 0 || componenetId==0 ){ 
		$("#errComponenetId").show();      
		$("#errComponenetId").text("Please select component");
		flag=0;
		return flag;
	}else{
		$("#errComponenetId").hide();
	}
	//department
	if(departmentId == null || departmentId.trim().length == 0 || departmentId==0){ 
		$("#errDepartmentId").show();      
		$("#errDepartmentId").text("Please select Department");
		flag=0;
		return flag;
	}else{
		$("#errDepartmentId").hide();
	}
	//workStatus
	if(workStatusId == null || workStatusId.trim().length == 0 || workStatusId==0){ 
		$("#errWorkStatusId").show();      
		$("#errWorkStatusId").text("Please select Status");
		flag=0;
		return flag;
	}else{
		$("#errWorkStatusId").hide();
	}
	//estimationCost
	
	/* if(estimationCost1Id == null || estimationCost1Id.trim().length == 0){ 
		$("#errEstimationCost1Id").show();      
		$("#errEstimationCost1Id").text("Please Enter Estimation CGF Amount");
		flag=0;
		return flag;
	}else{
		$("#errEstimationCost1Id").hide();
	}
	if(estimationCost2Id == null || estimationCost2Id.trim().length == 0){ 
		$("#errEstimationCost2Id").show();      
		$("#errEstimationCost2Id").text("Please Enter Estimated Convergence Amount");
		flag=0;
		return flag;
	}else{
		$("#errEstimationCost2Id").hide();
	}
	//cgf Fund
	if(cgfReleasedId == null || cgfReleasedId.trim().length == 0 ){ 
		$("#errCgfReleasedAmount").show();      
		$("#errCgfReleasedAmount").text("Please Enter CGF Released Amount");
		flag=0;
		return flag;
	}else{
		$("#errCgfReleasedAmount").hide();
	}
	//adminSanctioned
 	if(adminSanctionId == null || adminSanctionId.trim().length == 0){ 
		$("#errAdminSanctionId").show();      
		$("#errAdminSanctionId").text("Please Enter AdminSanctioned Amount");
		flag=0;
		return flag;
	}else{
		$("#errAdminSanctionId").hide();
	}
	
	if(convergenceExpenditure == null || convergenceExpenditure.trim().length == 0){ 
		$("#errconvergenceExpenditure").show();      
		$("#errconvergenceExpenditure").text("Please Enter convergenceExpenditure");
		flag=0;
		return flag;
	}else{
		$("#errconvergenceExpenditure").hide();
	} */
	return flag;
}

//update Work
function updateWork(workId){
 	//var isValid = validateData();
	//alert("isValid"+isValid);
	//if(isValid==0){
	//	return;
	//} 
	$("#successSpinnerDivId").show();
	var formData = new FormData(); 
	$('#updateWorkdataID input,#updateWorkdataID select').each(function(){  
		var input = $(this),
			attr = input.attr('name'),
			value = input.val(),
			text =input.attr('type'),
			voName = $(this).attr("attr_name"),
			id=$(this).attr("id");
			if(input.attr('name') !=null && typeof input.attr('name') !='undefined' ){
				if(input.attr('name') != 'adminSanctionedDate' && input.attr('name') != 'cgfReleasedDate' && input.attr('name') != 'tagetDate' && input.attr('name') != 'convExpDate'){
					formData.append(input.attr('name'), input.val());
				}
			}
		
	}); 
	formData.append("clusterId",clustrId);
	formData.append("workId",workId);
	formData.append("adminSanctionedDate",$("#adminSanctionDateUpdatedId").val());
	formData.append("cgfReleasedDate",$("#CGFResDateUpdatedId").val());
	formData.append("convExpDate",$("#convExpDateUpdatedId").val());
	formData.append("tagetDate",$("#TargetDateToFinishUpdatedId").val());
	saveAndUpdateWork(formData,"updation"); 	
}

function saveAndUpdateWork(formData,type){
	if(type=='updation'){
		$("#successSpinnerDivId1").show();
		$("#updateProfileId").attr("disabled","disabled");
	}else{
		$("#saveWorkId").attr("disabled","disabled");
		$("#successSpinnerDivId").show();
	}
	
	$.ajax({       
		url: 'saveRurbanWork',
		data: formData,
		type: "POST",               
		processData: false,
		contentType: false,        
		success: function(ajaxresp) {
			if(ajaxresp !=null){
				if(ajaxresp.responseCode==1){
					if(type=='updation'){
						$("#successSpinnerDivId1").hide();
						$("#updateProfileId").hide();
						$("#otpSuccssMgsId1").html("<center><h4 style='color: green;'>Work Updated Successfully</h4></center>");
					}else{
						$("#successSpinnerDivId").hide();$("#saveWorkId").hide();
						$("#otpSuccssMgsId").html("<center><h4 style='color: green;'>Work Saved Successfully</h4></center>");
					}
					setTimeout(function() {
						window.location.reload(); 
					}, 3000);
				}else if(ajaxresp.responseCode==2){   
					if(type=='updation'){
						$("#successSpinnerDivId1").hide();				
						$("#otpSuccssMgsId1").html("<center><h4 style='color: red;'>"+ajaxresp.statusName+"</h4></center>");
						setTimeout(function() {     
						$("#otpSuccssMgsId1").html('');	
						$("#updateProfileId").attr("disabled",false);						
					}, 3000);
					}else{
						$("#successSpinnerDivId").hide();				
						$("#otpSuccssMgsId").html("<center><h4 style='color: red;'>"+ajaxresp.statusName+"</h4></center>");
						setTimeout(function() {     
						$("#otpSuccssMgsId").html('');	
						$("#saveWorkId").attr("disabled",false);						
					}, 3000);
					}
									
				}else{
					if(type=='updation'){
						$("#successSpinnerDivId1").hide();$("#updateProfileId").attr("disabled",false);
						$("#otpSuccssMgsId1").html("<center><h4 style='color: red;'>Work Updated Failed. TryAgain.... </h4></center>");
					}else{
						$("#successSpinnerDivId").hide();$("#saveWorkId").attr("disabled",false);
						$("#otpSuccssMgsId").html("<center><h4 style='color: red;'>Work Saved Failed. TryAgain....</h4></center>");
					}
					setTimeout(function() {
						$("#otpSuccssMgsId").html('');
					}, 3000);
				}				
			}				
		},
		error:function(error,request){
			console.log(request);
			console.log(error);        
		}		
	});
}

function checkIsNumber(id,value){
	 if(isNaN(value)){
		$('#'+id+'').val('');
	 }else {
		 ;
	 }
}
function estimatedTotalAmount(){
	var amount1 =0;
	var amount2 =0;
	if($('#estimationCost2Id').val() != null && $('#estimationCost2Id').val().length >0){
		amount1 =$('#estimationCost2Id').val();
	}
	if($('#estimationCost1Id').val() != null && $('#estimationCost1Id').val().length >0 ){
		amount2 =$('#estimationCost1Id').val();
	}	
	var estimationCostId =parseFloat(amount1)+parseFloat(amount2);
	$('#estimationCostId').val(estimationCostId);
}

function updateEstimatedTotalAmount(){
	var amount1 =0;
	var amount2 =0; 
	if($('#estimationCostUpdated2Id').val() != null && $('#estimationCostUpdated2Id').val().length >0){
		amount1 =$('#estimationCostUpdated2Id').val();
	}
	if($('#estimationCostUpdated1Id').val() != null && $('#estimationCostUpdated1Id').val().length >0 ){
		amount2 =$('#estimationCostUpdated1Id').val();
	}	
	var estimationCostId =parseFloat(amount1)+parseFloat(amount2);
	$('#estimationCostUpdatedId').val(estimationCostId);
}
function validateAmount(value,fieldId){
	$('.ErrCls').html('');
	var enteredAmount =parseFloat(0.0);
	var estimationAmount= parseFloat($('#'+fieldId+'').val());
	$(".amountCls").each(function(){
		var value = $(this).val();
		if(value!= null && value.length>0){
			if(parseFloat(value) <=0){
				//$('#Err'+fieldId+'').html("Invalid estimation cost entered. Please check once.");
				return;
			}else{
				enteredAmount = parseFloat(enteredAmount)+parseFloat(value);
			}
		}
	});
	
	if(enteredAmount>estimationAmount){
		//$('#Err'+fieldId+'').html("Total estimation cost reached. Please check once.");
		//$('#'+fieldId+'').val('');
	}
	//$('#'+fieldId).val('');
	if(parseInt(enteredAmount)>0){
		$('#'+fieldId).val(enteredAmount);
	}
}
$(document).on("click",".worksDeleteChkCls",function(){
	if($(".worksDeleteChkCls").is(":checked")){
		$('.worksDeleteCls').show();
	}else{
		$('.worksDeleteCls').hide();
	}
})

$(document).on("click",".worksDeleteCls",function(){
	$("#workDeleteModalId").modal("show");	
	var workId =[];
	$('.worksDeleteChkCls').each(function(){
		if($(this).is(":checked")){
			workId.push($(this).attr("attr_works_Id"));
		}		
	});
	$("#messageId").html('Are you sure you want to delete?');
	$(".deleteConformCls").attr("attr_workId",workId);
});
$(document).on("click",".deleteConformCls",function(){	
	var workId = $(this).attr("attr_workId");
	deleteRurbanWork(workId);	
});
function deleteRurbanWork(workId){ 		
		var json={		
		workids : workId
	}
	$.ajax({
		type:'DELETE',
		url:'deleteRurbanWork',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){		
			if(result.statusId == 1){
				$("#messageId").html('<span class="good_color">Work Deleted Successfully</span>');
				setTimeout(function(){
					$("#workDeleteModalId").modal("hide");	
				},2000);				
				getWorkWiseDetailsByUser("","",clustrId,"");
			}
			$('.worksDeleteCls').hide();
		}else{
			$("#messageId").html('<span class="bad_color"> Try again....</span>');
		}
	})
}