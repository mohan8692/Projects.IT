var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var workIdsArr=[];
var selectedWorkIdsArr=[];
var selectedDeptIdsArr=[];
var colorCode=["","#FF5733","","#01B0B6","#0701B6","#C70039","#B6B001","#B6B001","#17B601"];

//getting Dynamic Browser URL
var windowUrl = window.location.href;
var wurl = windowUrl.substr(0,(windowUrl.indexOf("/cadreDetailsAction")));
wurl = wurl.replace("/PartyAnalyst","");
var allCheckedColumnsArr=[];

$(".scrollTableColCls").mCustomScrollbar({setHeight:'400px'});
function locationLevelRefresh(){
	
	$("#districtCandId").html('');
	$("#districtCandId").trigger('chosen:updated');
	
	$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');

	$("#designationsId").html('<option value="0">Select Designation</option>');
	$("#designationsId").trigger('chosen:updated');
	
	$("#departmentId").html('<option value="0">Select Department</option>');
	$("#departmentId").trigger('chosen:updated');
	
	
	//$("#statusId").html('<option value="0">Select Status</option>');
	//$("#statusId").trigger('chosen:updated');
	if(searchBy == "total" || searchBy==""){
		getDepartmntsDetails();
		$("#locationSelId").val('all');
		$("#locationSelId").trigger('chosen:updated');
		$( "#locationSelId" ).trigger( "change" );
	}else{
		onLoadClickDataDetails();
	}
	
	$("#nameId").val(' ');
	$("#mobileId").val(' ');
	$("#emailId").val(' ');
	$("#endorsmentNoId").val(' ');
	$("#summaryId").html("");
	$('#updatStatusChangeId').css('background-color','#449d44');
	$('#updatStatusChangeId').css('border-color','#449d44');
	$('.paginationId').html('');
	$("#representationRequestEntryTable").html('');
	hideAndShowSelectBox();
}
function hideAndShowSelectBox(){
	
	$("#districtConsMandDivId").hide();
	$("#designationDiv").hide();
	$("#departMentsDiv").hide();
	$("#nameDivid").hide();
	$("#mobileDivid").hide();
	$("#emailDivid").hide();
	$("#endorsmentNoDivid").hide();
	$("#subjectDivId").hide();	
	$("#referralNameDiv").hide();
	//$("#petitionId").prop("checked",false);
}


	$('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
		currentFromDate = picker.startDate.format('DD-MM-YYYY');
		currentToDate = picker.endDate.format('DD-MM-YYYY');
		if(picker.chosenLabel == 'All')
		{
			$("#dateRangePicker").val('All');
		}
		locationLevelRefresh();
		$("#petitionSubWorkRadioDivId").hide();
		//$("#workId").prop("checked",true);
	});

$(".chosen-select").chosen();

/* $(document).on('cut copy paste', function (e) {
	e.preventDefault();
}); */

$(document).on("click",".advancedSrchCls",function(){
	$("#advancedSearchVal").val('');
});

$(document).on("click",".selectedCls",function(){
	selectedWorkIdsArr=[];
	var isSelected=$(this).attr('isSeleted');
	var worksId=$(this).attr('attr_worksId');
	if(isSelected =='true'){
		if(worksId == 0){	
			$(".selectedCls").each(function(){
				$(".selectedCls").attr('isSeleted','false');
				$(".selectedCls").removeClass("btn-success");
				$(".selectedCls").addClass("btn-info");
			}); 
		}else{
			$(this).attr('isSeleted','false');
			$(this).removeClass("btn-success");
			$(this).addClass("btn-info");
			
			$(".selectedCls").each(function(){
				var innerIsSelected=$(this).attr('isSeleted');
				var innerWorkId=$(this).attr('attr_worksId');
				if(innerIsSelected =='true' && innerWorkId == 0){
					$(this).attr('isSeleted','false');
					$(this).removeClass("btn-success");
					$(this).addClass("btn-info");
				}
			});
		}
	}else if(isSelected =='false'){
		if(worksId == 0){	
			$(".selectedCls").each(function(){
				$(".selectedCls").attr('isSeleted','true');
				$(".selectedCls").removeClass("btn-info");
				$(".selectedCls").addClass("btn-success");
			});
		}else{
			$(this).attr('isSeleted','true');
			$(this).addClass("btn-success");
			$(this).removeClass("btn-info");
			
			var totalWorks =0;
			$(".selectedCls").each(function(){
				var innerIsSelected=$(this).attr('isSeleted');
				var innerWorkId=$(this).attr('attr_worksId');
				if(innerIsSelected =='true' && innerWorkId > 0){
					totalWorks=totalWorks+1;
				}
			});
			
			
			if(totalWorks == workIdsArr.length){
				$(".selectedCls").each(function(){
					var innerWorkId=$(this).attr('attr_worksId');
					if(innerWorkId == 0){
						$(this).attr('isSeleted','true');
						$(this).removeClass("btn-info");
						$(this).addClass("btn-success");
					}
				});
			
			}
		}
	}
	
	$(".selectedCls").each(function(){
		var innerWorkId=$(this).attr('attr_worksId');
		var workId=$(this).attr('attr_worksId');
		var deptId=$(this).attr('attr_worksId');
		var isseleted=$(this).attr('isSeleted');
		if(innerWorkId > 0 && isseleted=='true'){
			selectedWorkIdsArr.push(workId);
			selectedDeptIdsArr.push(deptId);
		}
	});
});

$(document).on("change",".clearDataCls",function(){
	$('#updatStatusChangeId').css('background-color','#449d44');
	$('#updatStatusChangeId').css('border-color','#449d44');
	$('.paginationId').html('');
	$("#representationRequestEntryTable").html('');
	$("#summaryId").html("");
	$("#petitionSubWorkRadioDivId").hide();
	//$("#workId").prop('checked',false);
	//$("#petitionId").prop('checked',true);
});
function clearData(){
	$('#updatStatusChangeId').css('background-color','#449d44');
	$('#updatStatusChangeId').css('border-color','#449d44');
	$('.paginationId').html('');
	$("#summaryId").html("");
	$("#representationRequestEntryTable").html('');
	$("#petitionSubWorkRadioDivId").hide();
}

function representationRequestEntryTable(result){
	var str='';
	str+='<div class="panel panel-default" style="margin-top:-8px;">';
		str+='<div class="panel-heading" style="background-color:#344650; color:#fff;" data-toggle="collapse">';
			str+='<h4 class="panel-title">';
			str+='<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"> REPRESENTATIONS DETAILS </a></h4>';
		str+='</div>';
		str+='<div id="collapseTwo" class="panel-collapse collapse in">';
		str+='<div class="panel-body">';
		str+='<div class="table-responsive">';
			str+='<table class="table table_customRep table-bordered" id="workDetailsTab">';
				str+='<thead>';
					str+='<tr>';
						str+='<th title="Representation Date" >REPR.&nbsp;DATE</th>';
						str+='<th title="Endorsment No" >ENDORS&nbsp;NO</th>';
						str+='<th title="Endorsment Date" >ENDORS&nbsp;DATE</th>';
						str+='<th title="Representee Name" >REPRESENTEE&nbsp;NAME</th>';
						str+='<th title="Referrer Name" >REF.&nbsp;NAME</th>';
						str+='<th title="Referreer Designation" >REF.&nbsp;DESIGNATION</th>';				
						str+='<th style="min-width:200px !important;"  title="Work Description" >WORK&nbsp;DESC.</th>';
						//str+='<th>No&nbsp;of&nbsp;Works</th>';
						str+='<th>Estimation Cost(in Lakhs)</th>';
						str+='<th>STATUS</th>';
						str+='<th>ACTION</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						for(var j in result[i].subList){
					var endorsmentNo='';
					str+='<tr>';
						if (result[i].raisedDate != null && typeof(result[i].raisedDate) != "undefined")
							str+='<td style="text-align:center;">'+result[i].raisedDate+'</td>';
						else
							str+='<td style="text-align:center;"> - </td>';
						if (result[i].subList[j].endorsementNO != null && result[i].subList[j].endorsementNO != 0){
							str+='<td style="text-align:center;">'+result[i].subList[j].endorsementNO+'</td>';
							endorsmentNo=result[i].subList[j].endorsementNO;
						}else
							str+='<td style="text-align:center;"> - </td>';
						
						
						if (result[i].subList[j].endorsmentDate != null && result[i].subList[j].endorsmentDate != "")
							str+='<td style="text-align:center;">'+result[i].subList[j].endorsmentDate+'</td>';
						else
							str+='<td style="text-align:center;"> - </td>';
						if (result[i].name != null && typeof(result[i].name) != "undefined")
							str+='<td style="text-align:center;">'+result[i].name+'</td>';
						else
							str+='<td style="text-align:center;"> - </td>';
						
						if (result[i].referrerName != null && typeof(result[i].referrerName) != "undefined")
							str+='<td style="text-align:center;">'+result[i].referrerName+'</td>';
						else
							str+='<td style="text-align:center;"> - </td>';
						if (result[i].desigName != null && typeof(result[i].desigName) != "undefined")
							str+='<td style="text-align:center;">'+result[i].desigName+'</td>';
						else
							str+='<td style="text-align:center;"> - </td>';
						if (result[i].subList[j].workName != null && result[i].subList[j].workName != "")
							str+='<td>'+result[i].subList[j].workName+'</td>';
						else
							str+='<td style="text-align:center;"> - </td>';
						/* if (result[i].noOfWorks != null && typeof(result[i].noOfWorks) != "undefined")
							str+='<td>'+result[i].noOfWorks+'</td>';
						else
							str+='<td> - </td>'; */
						if (result[i].subList[j].estimationCost != "" && result[i].subList[j].estimationCost != "0")
							str+='<td style="text-align:center;">'+result[i].subList[j].estimationCost+'</td>';
						else
							str+='<td style="text-align:center;">-</td>';
						if (result[i].subList[j].statusType != "" && typeof(result[i].subList[j].statusType) != "undefined")
							str+='<td style="text-align:center;">'+result[i].subList[j].statusType+'</td>';
						else
							str+='<td style="text-align:center;">-</td>';
							str+='<td class="text-center"><i class="fa fa-eye viewBtnCls tooltipCls" aria-hidden="true" attr_enrorsNo="'+endorsmentNo+'" attr_petiotion_id="'+result[i].petitionId+'" attr_sub_work_id="'+result[i].subList[j].id+'" style="margin-right: 20px; font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="View Petition"> </i>';
						//24 - userId - admin_user
						//if(userId == 24){
							str+='<a href="'+wurl+'/representationRequestEdit?petitionId='+result[i].petitionId+'" target="_blank"><i class="tooltipCls fa fa-pencil-square-o" aria-hidden="true" style="font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="Edit Petition"></i></a>';
						/*}else{
							if(result[i].subList[j].statusType == 'Pending Endorsement' || result[i].subList[j].statusId == 1) 
								str+='<a href="'+wurl+'/representationRequestEdit?petitionId='+result[i].petitionId+'" target="_blank"><i class="tooltipCls fa fa-pencil-square-o" aria-hidden="true" style="font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="Edit Petition"></i></a>';
						}
						*/
						str+='</td>';
					str+='</tr>';
					}
					}
				str+='</tbody>';
			str+='</table>';
			str+='</div>';
			str+='</div>';
		str+='</div>';	
	str+='</div>';
	$("#representationRequestEntryTable").html(str);
	$(".tooltipCls").tooltip();
	
	$("#workDetailsTab").dataTable({
		"paging":   true,
		"info":     false,
		"searching": true,
		"autoWidth": true,
		//"sDom": '<"top"iflp>rt<"bottom"><"clear">',
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 50, 100, -1], [10, 50, 100, "All"]]
	});
}
$('#advanceSearchBtnId').prop("checked",true);
if($('#advanceSearchBtnId').prop( "checked")){
	$("#advanceSearchBtnId").prop({disabled: true});
}

$("#advancedSearchButtonDivId").show();
$(document).on("change","#locationSelId",function(){
	$("#subjectId").html('');
	$("#referralNameId").html('<option value="0">Select Referral Name</option>');
	$("#referralNameId").trigger('chosen:updated');
	$("#errMsgId").html("");
	$('.clearCls').val('');
	$("#departMentsDiv").hide();
	$("#subjectDivId").hide();
	$("#pmOfficerDivId").hide();
	$("#designationDiv").hide()//inputSearchDivid
	$("#referralNameDiv").hide()//inputSearchDivid
	$("#nameDivid").hide();
	$("#mobileDivid").hide();
	$("#emailDivid").hide();
	$("#endorsmentNoDivid").hide();
	$("#districtCandId").html('');
	$("#districtCandId").trigger('chosen:updated');
	$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
	$("#designationsId").html('<option value="0">Select Designation</option>');
	$("#designationsId").trigger('chosen:updated');
	//$("#statusId").html('<option value="0">Select Status</option>');
	//$("#statusId").trigger('chosen:updated');
	$("#departmentId").html('<option value="0">Select Department</option>');
	$("#departmentId").trigger('chosen:updated');
	  $("#locationErrDivlId").html('');
	  $("#districtCandErrDiv").html('');
	  $("#constituencyCanErrDiv").html('');
	  $("#mandalCanErrDiv").html('');
	  $("#designationErrDiv").html('');
	  $("#departMentsErrDiv").html('');
	  $("#subJErrMsg").html('');
	  $("#officerErrMsg").html('');
	   $("#nameErrDivId").html('');
	   $("#mobileErrDivId").html('');
	   $("#emailErrDivId").html('');
	   $("#endorsmentNoErrDivId").html('');
	     //$('#parametersList').show();
	    $("#nameId").html('');
	    $("#mobileId").html('');
	    $("#emailId").html('');
	  $("#endorsmentNoId").html('');
	  $('#leadOtherDivId').hide();
	  $('#leadOtherId').val('');
	  $('#leadOtherId').html('');
	
	  $("#selectLeadId").html('');
	  $("#selectLeadId").html('<option value="0">Select Lead</option>');
	 $("#selectLeadId").trigger('chosen:updated');
	 $("#selectLeadDivId").hide();
		
   $('#advanceSearchBtnId').prop("checked",false); 
	var searchType=$(this).val();
	var dateRangeStr =$("#dateRangePicker").val();
	//getStatusList(statusId);
	getDistrictBySearchType(searchType,'districtCandId',dateRangeStr);
	if(searchType == 'all'){
		//$('#parametersList').hide();
		$("#districtConsMandDivId").hide();
		 $('#petitionSubWorkRadioDivId').hide();
		$("#advancedSearchButtonDivId").show();
		$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
		$('#advanceSearchBtnId').prop("checked",true);
		if($('#advanceSearchBtnId').prop( "checked",false)){
			$("#advanceSearchBtnId").prop({disabled: true});
		}
			$("#endorsmentNoDivid").hide();
		return;
	}
	
	if(searchType == 'work' || searchType =='representee' || searchType =='referral'){
			$("#districtCandId").html('');
			$("#districtCandId").trigger('chosen:updated');
			$("#endorsmentNoDivid").hide();
			$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
	        $("#designationsId").trigger('chosen:updated');
			$("#nameId").val(' ');
			$("#mobileId").val(' ');
			$("#emailId").val(' ');
			$("#endorsmentNoId").val(' ');
		    $('#advanceSearchBtnId').prop("checked",true);
			$('#petitionSubWorkRadioDivId').hide();
			$("#districtConsMandDivId").show();
			$("#advancedSearchButtonDivId").show();
			$("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
			if($('#advanceSearchBtnId').prop( "checked",false)){
				$("#advanceSearchBtnId").prop({disabled: true});
			}
			
	}else if(searchType == 'referrelDesignation' || searchType == 'representeeDesignation'){
	
			$("#districtCandId").html('<option value="0">Select District</option>');
			$("#districtCandId").trigger('chosen:updated');
			
			$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
			$("#nameId").val(' ');
			$("#mobileId").val(' ');
			$("#emailId").val(' ');
			$("#endorsmentNoId").val(' ');
			 $('#petitionSubWorkRadioDivId').hide();
			var serchTypValue = $(this).val();
			if(serchTypValue == 'referrelDesignation'){
				 $('#petitionSubWorkRadioDivId').hide();
				 $("#advanceSearchBtnId").prop({disabled: false});
				 $("#referralNameDiv").show();
		         $("#districtConsMandDivId").hide();
		         $("#advancedSearchButtonDivId").show();
			     $("#designationDiv").show();
				 $("#workId").prop("checked",false);
				$("#petitionId").prop("checked",true);
			 getDesignationsBySearchType(serchTypValue,"designationsId",0,statusId);
		   
			}else if(serchTypValue == 'representeeDesignation'){
				 $('#petitionSubWorkRadioDivId').hide();
				 $("#advanceSearchBtnId").prop({disabled: false});
				  getDesignationsBySearchType(serchTypValue,"designationsId",0,statusId);
				  $("#designationDiv").show();
				  $("#districtConsMandDivId").hide();
				  $("#advancedSearchButtonDivId").show();
					$("#workId").prop("checked",false);
					$("#petitionId").prop("checked",true);
			}
			 $('#advanceSearchBtnId').click(function(){
             if($(this).prop("checked") == true){
              $("#districtConsMandDivId").show();

	       }else if($(this).prop("checked") == false){
			  $("#districtConsMandDivId").hide();
		    } 
			 
		   });
				
		
	}else if(searchType == 'department'){
		$("#districtCandId").html('<option value="0">Select District</option>');
		$("#districtCandId").trigger('chosen:updated');
		$("#endorsmentNoDivid").hide();
		$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
		$("#nameId").val(' ');
		$("#mobileId").val(' ');
		$("#emailId").val(' ');
		$("#endorsmentNoId").val(' ');
         $('#petitionSubWorkRadioDivId').hide();
	    $('#advanceSearchBtnId').prop("checked",false);
		$("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
	getDepartmentsBySearchType(searchType,"departmentId",0,statusId);
		$("#departMentsDiv").show();
		$("#districtConsMandDivId").hide();
		$("#advancedSearchButtonDivId").show();
		$("#advanceSearchBtnId").prop({disabled: false});
	$('#advanceSearchBtnId').click(function(){
           if($(this).prop("checked") == true){
		   $("#districtConsMandDivId").show()
	    }else if($(this).prop("checked") == false){
			 $("#districtConsMandDivId").hide();
		} 
		});
	}else if(searchType == 'subject'){
		$("#districtCandId").html('');
		$("#constituencyCanId").html('');
		$("#mandalCanId").html('');
		$("#districtCandId").html('');
		$("#districtCandId").trigger('chosen:updated');
		$("#endorsmentNoDivid").hide();
		//$("#constituencyCanId").html('<option value="0">Select Constituency</option>');
		//$("#constituencyCanId").trigger('chosen:updated');
		
		$("#mandalCanId").html('');
		$("#mandalCanId").trigger('chosen:updated');
		$("#nameId").val(' ');
		$("#mobileId").val(' ');
		$("#emailId").val(' ');
		$("#endorsmentNoId").val(' ');       
	          $('#petitionSubWorkRadioDivId').hide();
	   $('#advanceSearchBtnId').prop("checked",false);
	    $("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
	  
	getSubjectsBySearchType(searchType,"subjectId",0,statusId);
		$("#subjectDivId").show();
		$("#districtConsMandDivId").hide();
		$("#advancedSearchButtonDivId").show();
	
		$("#advanceSearchBtnId").prop({disabled: false});
		$('#advanceSearchBtnId').click(function(){
			   if($(this).prop("checked") == true){
			   $("#districtConsMandDivId").show()
			}else if($(this).prop("checked") == false){
				 $("#districtConsMandDivId").hide();
			} 
		});
		if((distId != null && distId!=0) || (constId != null && constId!=0 )){
			$("#advanceSearchBtnId").prop({disabled: false});
			$('#advanceSearchBtnId').prop("checked",true);
		if($('#advanceSearchBtnId').prop( "checked")){
				$("#advanceSearchBtnId").prop({disabled: false});
				 $("#districtConsMandDivId").show();
			}			
		}
	
   }else if(searchType == 'pmOfficer'){
		$("#districtCandId").html('');
		$("#districtCandId").trigger('chosen:updated');
		$("#endorsmentNoDivid").hide();
		$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
		$("#nameId").val(' ');
		$("#mobileId").val(' ');
		$("#emailId").val(' ');
		$("#endorsmentNoId").val(' ');       
	      $('#petitionSubWorkRadioDivId').hide();
	   $('#advanceSearchBtnId').prop("checked",true);
	    $("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
	  getChildOfficersByParentOfficerId(searchType,"pmOfficerId",0,statusId);
		$("#pmOfficerDivId").show();
		$("#districtConsMandDivId").hide();
		$("#advancedSearchButtonDivId").show();
	
		//$("#advanceSearchBtnId").prop({disabled: false});
		if($('#advanceSearchBtnId').prop( "checked")){
				$("#advanceSearchBtnId").prop({disabled: true});
			}
			
	/* $('#advanceSearchBtnId').click(function(){
           if($(this).prop("checked") == true){
		   $("#districtConsMandDivId").show()
	    }else if($(this).prop("checked") == false){
			 $("#districtConsMandDivId").hide();
		} 
			 
		 }); */
	
   }else if(searchType == 'lead'){
		$("#selectLeadId").html('');
		$("#selectLeadId").trigger('chosen:updated');
		$("#selectLeadDivId").show();
		$("#endorsmentNoDivid").hide();
		$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
		$("#nameId").val(' ');
		$("#mobileId").val(' ');
		$("#lead").val(' ');
		$("#emailId").val(' ');
		$("#endorsmentNoId").val(' ');       
	          $('#petitionSubWorkRadioDivId').hide();
	   $('#advanceSearchBtnId').prop("checked",false);
	    $("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
		getPmBriefLeadList(0);
		$("#subjectDivId").hide();
		$("#selectLeadDivId").show();
		$("#districtConsMandDivId").hide();
		$("#advancedSearchButtonDivId").show();
	
		$("#advanceSearchBtnId").prop({disabled: false});
	$('#advanceSearchBtnId').click(function(){
           if($(this).prop("checked") == true){
		   $("#districtConsMandDivId").show()
	    }else if($(this).prop("checked") == false){
			 $("#districtConsMandDivId").hide();
		} 
			 
		 });
	
   }else if(searchType == 'name' ||  searchType =='mobile' ||   searchType =='email' || searchType =='endorsmentNO'){
		var searchType1=$(this).val();
		if(searchType1 == 'name'){
			 $('#petitionSubWorkRadioDivId').hide();
			$('#advanceSearchBtnId').prop("checked",false);
		    $("#nameDivid").show();
			 $("#districtConsMandDivId").hide();
			 $("#advancedSearchButtonDivId").show();
				$("#districtCandId").html('');
				$("#districtCandId").trigger('chosen:updated');
				$("#endorsmentNoDivid").hide();
				$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
				
				$("#designationsId").html('<option value="0">Select Designation</option>');
				$("#designationsId").trigger('chosen:updated');
				$("#mobileId").val(' ');
				$("#emailId").val(' ');
				$("#endorsmentNoId").val(' ');
	
			 $("#advanceSearchBtnId").prop({disabled: false});
			 $("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
		}else if(searchType1 == 'mobile'){
			 $('#petitionSubWorkRadioDivId').hide();
			$('#advanceSearchBtnId').prop("checked",false);
			$("#mobileDivid").show();
			 $("#districtConsMandDivId").hide();
			 $("#advancedSearchButtonDivId").show();
			 $("#districtCandId").html('');
	         $("#districtCandId").trigger('chosen:updated');
			$("#endorsmentNoDivid").hide();
	        $("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
			 $("#designationsId").html('<option value="0">Select Designation</option>');
	         $("#designationsId").trigger('chosen:updated');
			 $("#nameId").val(' ');
	         $("#emailId").val(' ');
	         $("#endorsmentNoId").val(' ');
	        
	       $("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
			$("#advanceSearchBtnId").prop({disabled: false});
		}else if(searchType1 == 'email'){
			 $('#petitionSubWorkRadioDivId').hide();
			$('#advanceSearchBtnId').prop("checked",false);
			$("#emailDivid").show();
			$("#districtConsMandDivId").hide();
			$("#advancedSearchButtonDivId").show();
	         $("#districtCandId").html('');
	         $("#districtCandId").trigger('chosen:updated');
			$("#endorsmentNoDivid").hide();
	        $("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
			  $("#designationsId").html('<option value="0">Select Designation</option>');
	         $("#designationsId").trigger('chosen:updated');
			  $("#nameId").val(' ');
			  $("#mobileId").val(' ');
			  $("#endorsmentNoId").val(' ');
	         $("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
			$("#advanceSearchBtnId").prop({disabled: false});
		}else if(searchType1 == 'endorsmentNO'){
			$('#petitionSubWorkRadioDivId').hide();
			$('#advanceSearchBtnId').prop("checked",false);
			$("#endorsmentNoDivid").show();
			$("#districtConsMandDivId").hide();
	         $("#districtCandId").html('');
	         $("#districtCandId").trigger('chosen:updated');
			$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
			  $("#designationsId").html('<option value="0">Select Designation</option>');
	          $("#designationsId").trigger('chosen:updated');
			  $("#nameId").val(' ');
			  $("#mobileId").val(' ');
			  $("#emailId").val(' ');
	         $("#workId").prop("checked",false);
			$("#petitionId").prop("checked",true);
			$("#advancedSearchButtonDivId").show();
			$("#advanceSearchBtnId").prop({disabled: false});
		}
	
		 $('#advanceSearchBtnId').click(function(){
           if($(this).prop("checked") == true){
            $("#districtConsMandDivId").show();

	    }else if($(this).prop("checked") == false){
			  $("#districtConsMandDivId").hide();
		} 
			 
		 });
	}		 
});
$(document).on("change","#districtCandId",function(){
	$("#constituencyCanId").html('');
	
	$("#constituencyCanId").trigger('chosen:updated');
	$("#mandalCanId").trigger('chosen:updated');
	var searchType=$("#locationSelId").val();
	var distictId=$(this).val();
	if(distictId != null){
		distictId = distictId;
		 getConstituenciesBySearchTypeAndDistrict(searchType,distictId,'constituencyCanId');
	}

});
$(document).on("change","#constituencyCanId",function(){
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
	var searchType=$("#locationSelId").val();
	var consituencyId=$(this).val();
	getMandalsBySearchTypeAndConstituency(searchType,consituencyId,'mandalCanId');
});
$(document).on("change","#designationsId",function(){
	$("#referralNameId").html('<option value="0">Select Referral Name</option>');
	$("#referralNameId").trigger('chosen:updated');
	
	$("#districtCandId").html('');
	$("#districtCandId").trigger('chosen:updated');
	
	$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
	var searchType=$("#locationSelId").val();
	var dateRangeStr =$("#dateRangePicker").val();
	getDistrictBySearchType(searchType,'districtCandId',dateRangeStr);
	var desigIds= [];
	var desig = $(this).val();
	if(desig != null || desig !=0){
			desigIds =  desig;
			getPetitionReferredMemberDetails(desigIds,0,statusId);
	}
	
});
$(document).on("change","#departmentId",function(){
	var searchType=$("#locationSelId").val();
	var dateRangeStr =$("#dateRangePicker").val();
	getDistrictBySearchType(searchType,'districtCandId',dateRangeStr);
});
$(document).on("change","#subjectId",function(){
	$("#districtCandId").html('');
	$("#districtCandId").trigger('chosen:updated');
	
	$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
	
	var searchType=$("#locationSelId").val();
	var dateRangeStr =$("#dateRangePicker").val();
	getDistrictBySearchType(searchType,'districtCandId',dateRangeStr);
});
$(document).on("change","#selectLeadId",function(){
    $("#districtCandId").html('');
	$("#districtCandId").trigger('chosen:updated');
	
	$("#constituencyCanId").html('');
	$("#constituencyCanId").trigger('chosen:updated');
	
	$("#mandalCanId").html('');
	$("#mandalCanId").trigger('chosen:updated');
	
	var searchType=$("#locationSelId").val();
	var dateRangeStr =$("#dateRangePicker").val();
	getDistrictBySearchType(searchType,'districtCandId',dateRangeStr);
});
function getDistrictBySearchType(searchType,selBoxId,dateRangeStr){

	$("#"+selBoxId).html("");
	$("#"+selBoxId).empty();
	$("#"+selBoxId).trigger('chosen:updated');
	var desigIds= [];
	var deptIds = [];
	var desigType='';
	var subjArr = [];
	var filterType=$("#locationSelId").val();
	var statIdsArr=[];
	var leadIdArr =[];
	  var desig=$("#designationsId").val();//
	  if(desig != null && desig !=0){
			desigIds =  desig;
		if(filterType == 'referrelDesignation'){
			desigType="referral";
		}else if(filterType == 'representeeDesignation'){
			desigType="representee";
		}
	  }/* else if(desigId >0){
		  desigIds.push(desigId);
		  if(filterType == 'referrelDesignation'){
			desigType="referral";
		}else if(filterType == 'representeeDesignation'){
			desigType="representee";
		}
	  } */
  var filterValue ="";
  if(filterType == 'name'){
	    filterValue=$("#nameId").val();
   }else if(filterType == 'mobile'){
	    filterValue=$("#mobileId").val();
   }else if(filterType == 'email'){
	    filterValue=$("#emailId").val();
   }else if(filterType == 'endorsmentNO'){
	    filterValue=$("#endorsmentNoId").val();
   }
	var depts =$("#departmntId").val();
	if(depts != null && depts !=0){
		deptIds=depts;
	}/* else if(deptId >0){
		deptIds.push(deptId);
	} */
	if(deptIds != null && deptIds.length>0){
		for(var i in deptIds){
			if(parseInt(deptIds[i])==0){
				deptIds=[];
			}
		}
	}

	var subjIds =$("#subjectId").val();
	if(subjIds != null && subjIds !=0){
		subjArr=subjIds;
	}/* else if(subjId>0){ 
		subjArr.push(subjId);
	} */
	var selStatusId = $("#statusId").val();
   var statusIds = [];
   if(selStatusId != null && selStatusId.length >0){
    statusIds=selStatusId;
   }/* else if(statusId.length >0){
   var statusList = statusId.split(',');
   for(var i=0;i<=statusList.length-1;i++){
   statusIds.push(statusList[i]);
   }
   } */
  
   var selectLeadIdVal = $("#selectLeadId").val();
   if(selectLeadIdVal != null && selectLeadIdVal !=0){
	    leadIdArr = selectLeadIdVal;
		 
   }
  
 var json = {
		 filterType :searchType,
		 filterValue:filterValue,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 deptIdsList:deptIds,
		 designationIds:desigIds,
		 pType:desigType,
		 subProgramIdsList:subjArr,
		 leadIdsList:leadIdArr
		}           
	$.ajax({              
		type:'POST',    
		url: 'getDistrictBySearchType',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length >0){
			//$("#"+selBoxId).html("<option value='0'>All</option>");
			for(var i in result){
				if(distId != null && distId==result[i].key){
					$("#"+selBoxId).append("<option value='"+result[i].key+"' selected>"+result[i].value+"</option>");
				}else{
					$("#"+selBoxId).append("<option value='"+result[i].key+"'>"+result[i].value+"</option>");
				}
			}
		}
		$("#"+selBoxId).trigger('chosen:updated');
		 if(distId >0){
			getConstituenciesBySearchTypeAndDistrict('work',[distId],'constituencyCanId');
		} 
		if(distId >0 && constId==0){
			getRepresentativeSearchDetails1("petition",0,"");
		} 
	});	
}
function getConstituenciesBySearchTypeAndDistrict(searchType,distictId,selBoxId){
	
	$("#"+selBoxId).html("");
	$("#"+selBoxId).empty();
	//$("#selBoxId").html('<option value="0">Select Constituency</option>');
	$("#selBoxId").trigger('chosen:updated');
	
	var desigIds= [];
 var deptIds = [];
 var desigType='';
 var subjArr =[];
 var leadIdArr = [];
 var desig=$("#designationsId").val();//
 if(desig != null || desig !=0){
 desigIds = desig;
 var filterType=$("#locationSelId").val();
 if(filterType == 'referrelDesignation'){
 desigType="referral";
 }else if(filterType == 'representeeDesignation'){
 desigType="representee";
 }
 }
 var depts =$("#departmntId").val();
 if(depts != null || depts !=0){
 deptIds=depts;
 }
 if(deptIds != null && deptIds.length>0){
		for(var i in deptIds){
			if(parseInt(deptIds[i])==0){
				deptIds=[];
			}
		}
	}
	
 var selStatusId = $("#statusId").val();
var statusIds = [];
if(selStatusId != null && selStatusId.length >0){
statusIds=selStatusId;
}else if(statusId >0){
var statusList = statusId.split(',');
for(var i=0;i<statusList.length-1;i++){
statusIds.push(statusList[i]);
}
}
var subjIds =$("#subjectId").val();
	if(subjIds != null && subjIds !=0){
		subjArr=subjIds;
	}

var selectLeadIdVal =$("#selectLeadId").val();
   if(selectLeadIdVal != null && selectLeadIdVal !=0){
	    leadIdArr = selectLeadIdVal;
   }
  
  var filterValue ="";
  if(filterType == 'name'){
	    filterValue=$("#nameId").val();
   }else if(filterType == 'mobile'){
	    filterValue=$("#mobileId").val();
   }else if(filterType == 'email'){
	    filterValue=$("#emailId").val();
   }else if(filterType == 'endorsmentNO'){
	    filterValue=$("#endorsmentNoId").val();
   }
   
 var json = {
		 filterType :searchType,
		 filterValue:filterValue,
		 searchLvlVals: distictId,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 deptIdsList:deptIds,
		 designationIds:desigIds,
		 type:desigType,
		 statusIds:statusIds,
		 subProgramIdsList:subjArr,
		 leadIdsList:leadIdArr
		}           
	$.ajax({              
		type:'POST',    
		url: 'getConstituenciesBySearchTypeAndDistrict',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length >0){
			//$("#"+selBoxId).html("<option value='0'>All</option>");
			//$("#"+selBoxId).html("<option value='0'>Select Constituency</option>");
			for(var i in result){
				if(parseInt(result[i].key)>0){
					if(constId != null && constId==result[i].key){
						$("#"+selBoxId).append("<option value='"+result[i].key+"' selected>"+result[i].value+"</option>");
					}else{
						$("#"+selBoxId).append("<option value='"+result[i].key+"'>"+result[i].value+"</option>");
					}
				}
			}
		}
		$("#"+selBoxId).trigger('chosen:updated');
		if(constId>0){
			getMandalsBySearchTypeAndConstituency("work",[constId],'mandalCanId');
			getRepresentativeSearchDetails1("petition",0,"");
		} 
	});	
}
function getMandalsBySearchTypeAndConstituency(searchType,consituencyId,selBoxId){
	//$("#"+selBoxId).html("<option value='0'>Select Mandal</option>");
	$("#"+selBoxId).trigger('chosen:updated');
	var desigIds= [];
	var deptIds = [];
	var desigType='';
	var subjArr = [];
	var leadIdArr = [];
	  var desig=$("#designationsId").val();//
	  if(desig != null || desig !=0){
			desigIds =  desig;
		var filterType=$("#locationSelId").val();
		if(filterType == 'referrelDesignation'){
			desigType="referral";
		}else if(filterType == 'representeeDesignation'){
			desigType="representee";
		}
	  }
	var depts =$("#departmntId").val();
	if(depts != null || depts !=0){
		deptIds=depts;
	}
	if(deptIds != null && deptIds.length>0){
		for(var i in deptIds){
			if(parseInt(deptIds[i])==0){
				deptIds=[];
			}
		}
	}
	
	  var selStatusId = $("#statusId").val();
	  var statusIds = [];
		if(selStatusId != null && selStatusId.length >0){
		     statusIds=selStatusId;
		 }else if(statusId >0){
		 var statusList = statusId.split(',');
		 for(var i=0;i<statusList.length-1;i++){
		    statusIds.push(statusList[i]);
		 }
		 }
		 var subjIds =$("#subjectId").val();
	if(subjIds != null && subjIds !=0){
		subjArr=subjIds;
	}
	 var selectLeadIdVal =$("#selectLeadId").val();
	   if(selectLeadIdVal != null && selectLeadIdVal !=0){
			leadIdArr = selectLeadIdVal;
	   }
 var filterValue ="";
  if(filterType == 'name'){
	    filterValue=$("#nameId").val();
   }else if(filterType == 'mobile'){
	    filterValue=$("#mobileId").val();
   }else if(filterType == 'email'){
	    filterValue=$("#emailId").val();
   }else if(filterType == 'endorsmentNO'){
	    filterValue=$("#endorsmentNoId").val();
   }
   
 var json = {
		 filterType :searchType,
		 filterValue:filterValue,
		 searchLvlVals: consituencyId,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 deptIdsList:deptIds,
		 designationIds:desigIds,
		 pType:desigType,
		 statusIds:statusIds,
		 subProgramIdsList:subjArr,
		 leadIdsList:leadIdArr
		}           
	$.ajax({              
		type:'POST',    
		url: 'getMandalsBySearchTypeAndConstituency',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#"+selBoxId).empty();
		if(result !=null && result.length >0){
			//$("#"+selBoxId).html("<option value='0'>All</option>");
			for(var i in result){
				$("#"+selBoxId).append("<option value='"+result[i].key+"'>"+result[i].value+"</option>");
			}
		}
		$("#"+selBoxId).trigger('chosen:updated');
	});	
}

function getDesignationsBySearchType(searchType,selBoxId,onLoaddesigId,statusId){
	$("#referralNameId").html('<option value="0">Select Referral Name</option>');
	$("#referralNameId").trigger('chosen:updated');
	var selStatusId = $("#statusId").val();
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}else if(statusId.length >0){
		var statusList = statusId.split(',');
		for(var i=0;i<=statusList.length-1;i++){
			statusIds.push(statusList[i]);
		}
	}
	var deptIds =  $("#departmntId").val();
var deptIdsList = [];
	if(deptIds != null && deptIds.length >0){
		deptIdsList=deptIds;
	}
if(deptIdsList != null && deptIdsList.length>0){
	for(var i in deptIdsList){
		if(parseInt(deptIdsList[i])==0){
			deptIdsList=[];
		}
	}
}
 var json = {
		 reportType :searchType,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 sourceId:onLoaddesigId,
		 statusIds :statusIds,
		 deptIdsList : deptIdsList
		}            
	$.ajax({              
		type:'POST',    
		url: 'getDesignationsBySearchType',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#"+selBoxId).empty();
		if(result !=null && result.length >0){
			//$("#designationDiv").show();
			//$("#"+selBoxId).html("<option value='0'>Select Designation</option>");
			for(var i in result){
				if(desigId >0 && desigId == result[i].key){
					$("#"+selBoxId).append("<option value='"+result[i].key+"' selected>"+result[i].value+"</option>");
				}else {
					$("#"+selBoxId).append("<option value='"+result[i].key+"'>"+result[i].value+"</option>");
				}
			}
		}
		$("#"+selBoxId).trigger('chosen:updated');
		if(desigId >0){
		getPetitionReferredMemberDetails([desigId],0,statusId);
		}
		if(searchBy == 'referral' && desigId >0){
			getRepresentativeSearchDetails1("petition",0,"");
		}
	});	
}

function getDepartmentsBySearchType(searchType,selBoxId,ondeptId,statusId){
	$("#"+selBoxId).html("");
	$("#"+selBoxId).empty();
	$("#"+selBoxId).trigger('chosen:updated');
	var selStatusId = $("#statusId").val();
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}else if(statusId.length >0){
		var statusList = statusId.split(',');
		for(var i=0;i<=statusList.length-1;i++){
			statusIds.push(statusList[i]);
		}
	}
	var dptId = $("#departmentId").val();
	if(dptId != null && dptId.length >0){
		ondeptId=dptId;
	}
 var json = {
		 reportType :searchType,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 departmentId:ondeptId,
		 statusId:statusIds
		}           
	$.ajax({              
		type:'POST',    
		url: 'getDepartmentsBySearchType',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		
		if(result !=null && result.length >0){
			$("#departMentsDiv").show();
			//$("#"+selBoxId).html("<option value='0'>Select Department</option>");
			for(var i in result){
				if(deptId != null && deptId==result[i].key){
					$("#"+selBoxId).append("<option value='"+result[i].key+"' selected>"+result[i].value+"</option>");
				}else{
					$("#"+selBoxId).append("<option value='"+result[i].key+"' >"+result[i].value+"</option>");
				}
			}
		}
		$("#"+selBoxId).trigger('chosen:updated');
		if(searchBy == 'department' && deptId >0){
			getRepresentativeSearchDetails1("petition",0,"");
		}
	});	
}
 function searchValidations(){
	 var isError=false;
	  $("#officerErrMsg").html('');
	 $("#leadErrMsg").html('');
	  $("#locationErrDivlId").html('');
	  $("#districtCandErrDiv").html('');
	  $("#constituencyCanErrDiv").html('');
	  $("#mandalCanErrDiv").html('');
	  $("#designationErrDiv").html('');
	  $("#departMentsErrDiv").html('');
	  $("#subJErrMsg").html('');
	   $("#nameErrDivId").html('');
	   $("#mobileErrDivId").html('');
	   $("#emailErrDivId").html('');
	   $("#endorsmentNoErrDivId").html('');
	 var locationType = $("#locationSelId").val();
	 var districtId=$("#districtCandId").val();
	  var constituencyId=$("#constituencyCanId").val();
	   var mandalId=$("#mandalCanId").val();
	    var emialRegExp =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var phonePattern= /^\d{10}$/;
	 /*if(locationType == null || locationType =='all'){
		 $("#locationErrDivlId").html('<h5>Please select location </h5>');
		 isError=true;
	 }
	  if(districtId == null || districtId ==0){
		 $("#districtCandErrDiv").html('<h5>Please select district </h5>');
		 isError=true;
	 }
	
  if(constituencyId == null || constituencyId ==0){
		 $("#constituencyCanErrDiv").html('<h5>Please select Constituency </h5>');
		 isError=true;
	 }
	 if(mandalId == null || mandalId ==0){
		 $("#mandalCanErrDiv").html('<h5>Please select mandal </h5>');
		 isError=true;
	 }
	 */
	 if($("#designationDiv").is(':visible')){
		  var designationsId=$("#designationsId").val();
		  if(designationsId == null || designationsId ==0){
			 $("#designationErrDiv").html('<h5>Please select designation </h5>');
			 isError=true;
			}
	}
	/* if($("#referralNameDiv").is(':visible')){
		  var referralNameId=$("#referralNameId").val();
		  if(referralNameId == null || referralNameId ==0){
			 $("#referralNameErrDiv").html('<h5>Please select designation </h5>');
			 isError=true;
			}
	} */
	if($("#departMentsDiv").is(':visible')){
		  var deptId=$("#departmentId").val();
		  if(deptId == null || deptId ==0){
			 $("#departMentsErrDiv").html('<h5>Please select department </h5>');
			 isError=true;
			}
	}
	if($("#subjectDivId").is(':visible')){
		  var subjId=$("#subjectId").val();
		  if(subjId == null || subjId ==0){
			 $("#subJErrMsg").html('<h5>Please select subject </h5>');
			 isError=true;
			}
	}
	if($("#pmOfficerDivId").is(':visible')){
		  var pmOfficerId = $("#pmOfficerId").val();
		  if(pmOfficerId == null || pmOfficerId ==0){
			 $("#officerErrMsg").html('<h5>Please select pmofficer </h5>');
			 isError=true;
			}
	}
	if($("#selectLeadDivId").is(':visible')){
		  var leadId=$("#selectLeadId").val();
		  if(leadId == null || leadId ==0){
			 $("#leadErrMsg").html('<h5>Please select lead </h5>');
			 isError=true;
			}
	}
	if($("#nameDivid").is(':visible')){
		  var nameVal=$("#nameId").val();
		  if(nameVal == null || nameVal.trim().length ==0 ){
			 $("#nameErrDivId").html('<h5>Please enter name </h5>');
			 isError=true;
			}else if(nameVal.trim().length<4){
			 $("#nameErrDivId").html('<h5>Please enter atleast 3 charactor  </h5>');
			 isError=true;
			}
	}
	if($("#mobileDivid").is(':visible')){
		  var mobileVal=$("#mobileId").val();
		  if(mobileVal == null || mobileVal.trim().length ==0 ){
			 $("#mobileErrDivId").html('<h5>Please enter mobile number </h5>');
			 isError=true;
			}else if(mobileVal.length != 10 || !phonePattern.test(mobileVal)){
				 $("#mobileErrDivId").html('<h5>Please enter valid mobile number </h5>');
				 isError=true;
			}
	}
	if($("#emailDivid").is(':visible')){
		  var emailVal=$("#emailId").val();
		  if(emailVal == null || emailVal.trim().length ==0 ){
			 $("#emailErrDivId").html('<h5>Please enter email </h5>');
			 isError=true;
			}else if(!emialRegExp.test(emailVal)){
				 $("#emailErrDivId").html('<h5>Please enter valid email </h5>');
				 isError=true;
			}
	}
	if($("#endorsmentNoDivid").is(':visible')){
		  var endorsmentNo=$("#endorsmentNoId").val();
		  if(endorsmentNo == null || endorsmentNo ==0){
			 $("#endorsmentNoErrDivId").html('<h5>Please select endorsment number </h5>');
			 isError=true;
			}
	}
	
		 return isError;
	 
	
 }
 $(document).on("click","#advanceSearchId",function(){
	var isErr= searchValidations();
	if(isErr == true)
		return; 
	//$("#workId").prop("checked",false);
	//$("#petitionId").prop("checked",true);
	
	$('#updatStatusChangeId').css('background-color','#449d44');
	$('#updatStatusChangeId').css('border-color','#449d44');
		$('.paginationId').html('');
		
	var reportType = $(this).attr('reportType');
	$(".petitionSubWorkRadoCls").each(function(){
	if($(this).is(":checked")){
		var typeVal =  $(this).attr("attr_type");
		//alert(typeVal);
		if(typeVal == "subWork"){
			$("#representationRequestEntryTable").html('');
			$("#petitionId").prop("checked",false);
			getRepresentativeSearchDetails1(typeVal,0,reportType);
			$("#petitionSubWorkRadioDivId").show();
		}else if(typeVal == "petition"){
			$("#workId").prop("checked",false);
			$("#representationRequestEntryTable").html('');
			getRepresentativeSearchDetails1(typeVal,0,reportType);
			$("#petitionSubWorkRadioDivId").show();
		}
		}
	});
	
 });

 $(document).on("click","#advanceExcelId",function(){
	var isErr= searchValidations();
	if(isErr == true)
		return; 
	var reportType = $(this).attr('reportType');
	$(".petitionSubWorkRadoCls").each(function(){
	if($(this).is(":checked")){
		var typeVal =  $(this).attr("attr_type");
		$('#excelLoadingId').html(spinner);
		getRepresentativeSearchDetails1(typeVal,0,reportType);
	}
	});
 });
 
/* $(document).on("click",".viewBtnCls",function(){
	var petionId = $(this).attr("attr_petiotion_id");
	var endorsNo = $(this).attr("attr_enrorsNo");
	$("#representeeViewId").html("");
	$("#representeeDetailsModelDivId").modal("show");
   getPetitionDetails(petionId,endorsNo);
 }); */
 
 function getFinalArr(inputArr){
	 var returnArr =[];
	 if(inputArr != null && inputArr.length>0){
		for(var i in inputArr){
			if(parseInt(inputArr[i])==0){
				returnArr=[];
				break;
			}else{
				returnArr.push(parseInt(inputArr[i]));
			}
		}
	}
	return returnArr;
 }
function getRepresentativeSearchDetails1(value,globalStIndex,reportType){
	
	if(reportType =='' || reportType.length ==0)
		$("#petitionSubWorkRadioDivId").hide();
	
	$("#errMsgId").html("");
	$("#subJErrMsg").html('');
	$("#summaryId").html("");
	if(globalStIndex == 0)
		$(".paginationId").html("");
	
		var workStatus ="";
		var viewType ="";
		var divType="";
		var assetType="";
	$(".menuCls-table").hide();
		var allColumnArr= ["RepresentationDate", "EndorsmentNo", "EndorsmentDate", "RepresenteeType", "RepresenteeName", "RepresenteeDesignation", "ReferrerName", "ReferreerDesignation", "WorkDescription", "EstimationCost","noofWorks","Status", "Department", "LeadName", "Subject", "SubSubject", "GrantName", "WorkType", "HasCoveringLtr", "HasActionCopy", "HasDetailedReport", "HasFinalCopy", "HasOthersCopy", "HasWorkCopy","HasReprRefDocs", "WithWhome", "LastUpdatedTime"];
		for(var i in allColumnArr){
			$("."+allColumnArr[i]).hide();
		}
		
	
		allCheckedColumnsArr=[];
		$(".getColumnCls").each(function(){
			if($(this).is(":checked")){
				allCheckedColumnsArr.push($(this).val());
				if($(this).val() =="HasWorkCopy"){
					workStatus = "checked"
				}else if($(this).val() =="HasReprRefDocs"){
					viewType = "checked"
				}else if($(this).val() =="HasCoveringLtr" || $(this).val() =="HasActionCopy" || $(this).val() =="HasDetailedReport" || $(this).val() =="HasFinalCopy" || $(this).val() =="HasOthersCopy"){
					divType = "checked"
				}else if($(this).val() =="WithWhome" || $(this).val() =="LastUpdatedTime"){
					assetType = "checked"
				}
			}	
		}); 
		for(var i in allCheckedColumnsArr){
			$("."+allCheckedColumnsArr[i]).show();
		}
	//	console.log(allCheckedColumnsArr);
		
   var startDate = currentFromDate;
   var endDate = currentToDate;
	var radioTypeVal = value;
   var filterType=$("#locationSelId").val();
    var filterValue="";
   if(filterType == 'referrelDesignation' || filterType == 'representeeDesignation'){
	  var desig=$("#designationsId").val();//
	   for(var i in desig){
			filterValue = filterValue+desig[i]+",";
		}
	    if($("#designationDiv").is(':visible')){
		  if(filterValue == null || filterValue ==0){
			 $("#errMsgId").html('<h5>Please select designation </h5>');
			 return;
			}
	}
	if(filterType == 'referrelDesignation'){
	 var refrName=$("#referralNameId").val();	
	 if(refrName != null && refrName != 0){
		 filterValue='';
		 filterType = "referralName";
		 for(var i in refrName){
			filterValue = filterValue+refrName[i]+",";
		}
	 }
	}
   }else if(filterType == 'department'){
	    var depts =$("#departmentId").val();
		for(var i in depts){
			filterValue = filterValue+depts[i]+",";
		}
		if($("#departMentsDiv").is(':visible')){
		  if(filterValue == null || filterValue ==0){
			 $("#errMsgId").html('<h5>Please select department </h5>');
			 return;
			}
	}
   }else if(filterType == 'subject'){
	    var subjects =$("#subjectId").val();
		for(var i in subjects){
			filterValue = filterValue+subjects[i]+",";
		}
		if($("#subjectDivId").is(':visible')){
		  if(filterValue == null || filterValue ==0){
			 $("#errMsgId").html('<h5>Please select subject </h5>');
			 return;
			}
	}
   }else if(filterType == 'lead'){
	    var selectLeadId =$("#selectLeadId").val();
		for(var i in selectLeadId){
			filterValue = filterValue+selectLeadId[i]+",";
		}
		if($("#selectLeadDivId").is(':visible')){
		  if(filterValue == null || filterValue ==0){
			 $("#errMsgId").html('<h5>Please select lead </h5>');
			 return;
			}
	}
	 }else if(filterType == 'pmOfficer'){
	    var pmOficerId =$("#pmOfficerId").val();
		for(var i in pmOficerId){
			filterValue = filterValue+pmOficerId[i]+",";
		}
		if($("#pmOfficerDivId").is(':visible')){
		  if(filterValue == null || filterValue ==0){
			 $("#officerErrMsg").html('<h5>Please select pmOfficer </h5>');
			 return;
			}
	}
   }else if(filterType == 'name'){
	    filterValue=$("#nameId").val();
   }else if(filterType == 'mobile'){
	    filterValue=$("#mobileId").val();
   }else if(filterType == 'email'){
	    filterValue=$("#emailId").val();
   }else if(filterType == 'endorsmentNO'){
	    filterValue=$("#endorsmentNoId").val();
   }else if(filterType == 'pmOfficer'){
	    var pmOfficers=$("#pmOfficerId").val();
		for(var i in pmOfficers){
			filterValue = filterValue+pmOfficers[i]+",";
		}
   }else if(filterType == 'all'){
	  // startDate = "";
		//endDate = "";
   }
   
	var districtId=$("#districtCandId").val();
	 var constituencyId=$("#constituencyCanId").val();
	 var mandalId=$("#mandalCanId").val();
	 var searchLevelValue = [];
	 var searchLevelId;
	 if(districtId != null && districtId.length > 0){
		 searchLevelValue = [];
		  searchLevelValue=districtId;
	  searchLevelId=3;
	 }
	 
if(constituencyId != null && constituencyId.length > 0){
	searchLevelValue = [];
	searchLevelId=4;
	searchLevelValue=constituencyId
}
if(mandalId != null && mandalId.length > 0){
	searchLevelValue = [];
	searchLevelId=5;
	searchLevelValue=mandalId
}
/* var stausIds ;
if($("#statusId").val() != 0){
	 stausIds = $("#statusId").val();
} */
var selStatusId = $("#statusId").val();
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}/* else if(statusId.length >0){
		var statusList = statusId.split(',');
		for(var i=0;i<=statusList.length-1;i++){
			statusIds.push(statusList[i]);
		}
	} */
var deptIds =  $("#departmntId").val();
var deptIdsList = [];
	if(deptIds != null && deptIds.length >0){
		deptIdsList=deptIds;
	}else if(deptId.length >0){
		var deptList = deptId.split(',');
		for(var i=0;i<=deptList.length-1;i++){
			deptIdsList.push(deptList[i]);
		}
	} 
if(deptIdsList != null && deptIdsList.length>0){
	for(var i in deptIdsList){
		if(parseInt(deptIdsList[i])==0){
			deptIdsList=[];
		}
	}
}
var briefLeadIdsArr=[];
var briefLeadId = $("#selectLeadId").val();
	if(briefLeadId != null && briefLeadId.length >0){
		briefLeadIdsArr=briefLeadId;
	}
	
	searchLevelValue = getFinalArr(searchLevelValue);
	deptIdsList = getFinalArr(deptIdsList);
	statusIds = getFinalArr(statusIds);
	briefLeadIdsArr = getFinalArr(briefLeadIdsArr);
	
	if(reportType =='' || reportType.length ==0)
		$("#representationRequestEntryTable").html(spinner);
var json = {
    filterType :filterType,//mobileno/department/name/email
    filterValue:filterValue,
    searchLevelId:searchLevelId,
    searchLvlVals:searchLevelValue,
    fromDate :startDate,
	toDate : endDate,
   // fromRange:0,
   // toRange:0,
   // minVal:0,
    //maxVal:4,
    //startValue:0,
    //endValue:0,
	searchDeptIdsList:deptIdsList,
	statusIds:statusIds,
	govtSchmeIdsList:[],
	sourceIdsList:[],
	designationIds:[],
	subProgramIdsList:[],
	divType:divType,//cover,action,detailed,final and other docs
	assetType:assetType,//with whome and latest updated time
	workStatus:workStatus,//work docs
	viewType:viewType,//repRefDocs
	radioSelection:radioTypeVal,
	briefLeadIdsList:briefLeadIdsArr,
	firstIndex:globalStIndex,
	reportTypeId:reportType,
	maxResult:100	
    }
  
  $.ajax({                
    type:'POST',    
    url: 'getRepresentativeSearchWiseDetails',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  $('#excelLoadingId').html('');
	  if(reportType == ""){
		  if(reportType =='' || reportType.length ==0){
			$("#summaryId").html('');
			$("#representationRequestEntryTable").html("");
		  }
			if(result != null && result.length>0){
				$("#petitionSubWorkRadioDivId").show();
				var countByDate = 0;
				petitionWiseRepresenteeDetails(result,radioTypeVal,globalStIndex,countByDate,reportType);
				buildSummeryDetails(result);
				
				/*if(radioTypeVal == "petition"){
					buildSummeryDetails(result);
					petitionWiseRepresenteeDetails(result)
				}else{
					buildSummeryDetails(result);
					representationRequestEntryTable(result);
				}
				*/
			}else{
			  $("#representationRequestEntryTable").html("NO DATA AVAILABLE");
			}
	  }else{
		  window.open('http://www.mydepartments.in/PRRWS/'+result[0].url+'');
	  }
    
  }); 
}
function buildSummeryDetails(result){
		var statusOverViewFlage=false;
	var str=""; 
	str+='<div class="panel panel-default" style="margin:15px;">';
		str+='<div class="panel-heading" style="background-color:#344650; color:#fff;">';
			str+='<h4 class="panel-title"> STATUS OVERVIEW </h4>';
		str+='</div>';
		str+='<div class="panel-body">';
			str+='<div class="col-sm-12">';
				str+='<div class="table-responsive">';
					str+='<table class="table" style="border: 1px solid lightgreen; text-align:center;">';
						str+='<thead>';
							str+='<tr>';
							for(var i in result[0].statusList){
								str+='<th style="background-color:#B3B3B3; border:1px solid #DDDDDD; font-size:12px;">'+result[0].statusList[i].name.toUpperCase()+'</th>';
							}
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
							str+='<tr>';
							for(var i in result[0].statusList){
								if(result[0].statusList[i].petitionIds.length >0){
									str+='<td style="border:1px solid #DDDDDD;"><span title="Total Representations">'+result[0].statusList[i].petitionIds.length+'</span>/<span title="Total Works">'+result[0].statusList[i].subWorkIds.length+'</span></td>';
								statusOverViewFlage=true;
								}else{
									str+='<td data-toggle="tooltip" title="representations"  style="border:1px solid #DDDDDD;">-</td>';
								}
							}
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';
				str+='</div>';	
			str+='</div>';	
	str+='</div>';
	$("#summaryId").html(str);
	if(statusOverViewFlage == false){
		$("#summaryId").hide();
	}else{
		$("#summaryId").show();
	}
}
var globalStatusIds = [];
function getStatusList(onLoadstatusId){
	 $("#statusId").html('');
	var selStatusId = $("#statusId").val();
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}else if(onLoadstatusId.length >0){
		var statusList = onLoadstatusId.split(',');
		for(var i=0;i<=statusList.length-1;i++){
			statusIds.push(statusList[i]);
		}
	}
	var json = {
		statusIds :statusIds
	}
  $.ajax({                
    type:'POST',    
    url: 'getStatusList',
    dataType: 'json',
	data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
   var statusList =[];
		if(statusId != null && statusId.length > 0){
				if(statusId.length >0){
					   var statsList = statusId.split(',');
						for(var i=0;i<=statsList.length-1;i++){
						statusList.push(statsList[i]);
					}
				}
			}
		if(result !=null && result.length >0){
			//$("#statusId").html("<option value='0'>All</option>");
			for(var i in result){
				if ( $.inArray(result[i].id.toString(), statusList) == -1) {
					$("#statusId").append("<option value='"+result[i].id+"'>"+result[i].name+"</option>");
				}else{
					$("#statusId").append("<option value='"+result[i].id+"' selected>"+result[i].name+"</option>");
				}
				globalStatusIds.push(result[i].id.toString());
			}
			if(searchBy == 'officer' && statusName !=''){
				if ( $.inArray(statusId.toString(), globalStatusIds) == -1) {
				  $("#statusId").append("<option value='"+statusId+"' selected>"+statusName+"</option>");
				}
			}
		}
		$("#statusId").trigger('chosen:updated');
		if(searchBy == 'total' && statusId >0){
			getRepresentativeSearchDetails1("petition",0,"");
		}
  }); 
}

//getPetitionDetails(1778,'');
function getPetitionDetailsDummy(petitionId,endorsNo){
	$("#representeeViewId").html(spinner);
	selectedWorkIdsArr=[];
   var json = {
       petitionId:petitionId,//38,//100031
	   pageType:"viewPage"
    };
  $.ajax({              
    type:'POST',    
    url: 'setPmRepresenteeDataToResultView',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
    //console.log(result);
	if(result != null){
		setPmRepresenteeDataToResultView(result,endorsNo);
	}else{
		$("#representeeViewId").html("NO DATA AVAILABLE");
	}
  });
}
var referralDocs = [];
var workDocs = [];
var coveringDocs=[];
var petitionId ='';
function setPmRepresenteeDataToResultView(result,endorsNo){
	selectedWorkIdsArr=[];
	workIdsArr=[];
	var str="";
	petitionId =''
	referralDocs = [];
	workDocs = [];
	//str+='';
	//$("#representeeViewId").html(spinner);
	if(result != null && (result.referDetailsList.length >0 || result.representeeDetailsList.length >0)){
		
		petitionId =result.petitionId;
		var representeeList = [];
		if(result.representationType =="SELF" && result.referDetailsList.length >0){
			representeeList = result.referDetailsList;
		}else if(result.representeeDetailsList.length >0){
			representeeList = result.representeeDetailsList;
		}
	str+='<div class="col-md-12 col-xs-12 col-sm-12 m_top20">';
				str+='<div class="col-sm-6">';
					str+='<h4>REPRESENTEE DETAILS  <span style="margin-left:20px;">';
					/*if(endorsNo != null && endorsNo.length>0)
						str+='(<b>Endorsement No: </b> '+endorsNo+')</span></h4>';
					*/
					
					if(result.representationdate != null && result.representationdate.length>0)
						str+='<b>REPRESENTATION DATE : </b> '+result.representationdate+'</span></h4>';
					
					str+='<div class="block_padding_10 m_top10">';
						
						str+='<div class="media">';
							str+='<div class="media-left" style="text-align:center">';
							if(representeeList[0].candidatePath != null && representeeList[0].candidatePath.length>0)
								str+='<img style="width: 60px ! important; height: 60px ! important; margin-top: 6px;" src="'+representeeList[0].candidatePath+'" class="imageCss">';
							else
								str+='<i class="fa fa-user-circle fa-5x" aria-hidden="true" style="#EBEBEB"></i>';
							
							/*
								str+='<div class="bg_light-Color" style="padding:10px;margin-top:5px;">';
									str+='<p alt="Representation Date">Repr.&nbsp;Date</p>';
									str+='<p><b>'+result.representationdate+'</b></p>';
								str+='</div>';
							*/
							
							str+='</div>';
							str+='<div class="media-body">';
								str+='<div class="bg_light-Color" style="padding:10px">';
									//str+='<p><b>Name</b></p>';
									str+='<h4><b>'+representeeList[0].name+'</b></h4>';
									if(representeeList[0].tdpCadreId != null){
										if(representeeList[0].designation != null && representeeList[0].designation !='')
											str+='<span><b>('+representeeList[0].designation+'),</b>';
										else
											str+='<span><b style="color:orange;">TDP CADRE</b></span>';
									}
										
									str+='<div class="row" style="margin-top:10px;">';
										str+='<div class="col-sm-12 col-md-6">';
											str+='<h5><b> NATIVE ADDRESS : </b></h5>';
											if(result.representationType =="REPRESENTEE" && result.referDetailsList.length >0){
												str+='<p>Mandal: '+(representeeList[0].addressVO.tehsilName != ""?representeeList[0].addressVO.tehsilName:" - ")+'</p>';
												str+='<p>Constituency : '+(representeeList[0].addressVO.assemblyName != ""?representeeList[0].addressVO.assemblyName:" - ")+'</p>';
												str+='<p>District : '+(representeeList[0].addressVO.districtName != ""?representeeList[0].addressVO.districtName:" - ")+'</p>';
											}else if(result.representationType =="SELF" && result.referDetailsList.length >0){
												str+='<p>Mandal: '+(representeeList[0].candidateNativeAddressVO.tehsilName != ""?representeeList[0].candidateNativeAddressVO.tehsilName:" - ")+'</p>';
												str+='<p>Constituency : '+(representeeList[0].candidateNativeAddressVO.assemblyName != ""?representeeList[0].candidateNativeAddressVO.assemblyName:" - ")+'</p>';
												str+='<p>District : '+(representeeList[0].candidateNativeAddressVO.districtName != ""?representeeList[0].candidateNativeAddressVO.districtName:" - ")+'</p>';
											}
											str+='</div>';
											if(representeeList[0].email != "" || representeeList[0].mobileNO != "" || representeeList[0].voterCardNo != "" || representeeList[0].voterCardNo != undefined ){
												str+='<div class="col-sm-12 col-md-6"  style="margin-top:10px;">';
													str+='<h5><b>CONTACT DETAILS :</b></h5>';
														if(representeeList[0].email != "")
															str+='<p>Email id : '+(representeeList[0].email != ""?representeeList[0].email:" - ")+'</p>';
														if(representeeList[0].mobileNO != "")
															str+='<p>Contact No : '+(representeeList[0].mobileNO != ""?representeeList[0].mobileNO:" - ")+'</p>';
														if(representeeList[0].voterCardNo != "" && representeeList[0].voterCardNo != undefined)
															str+='<p>Voter Card No : '+(representeeList[0].voterCardNo != "" && representeeList[0].voterCardNo != undefined?representeeList[0].voterCardNo:" - ")+'</p>';
												str+='</div>';
											}
											
									str+='</div>';
									
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					coveringDocs = result.coveringLetterPathsList;
					//ara
					if(coveringDocs != null && coveringDocs.length>0)
						;//str+='<div style=""><p class="viewDivId pull-right docsViewCls" attr_docs="covering" style="cursor:pointer;margin-right: 30px;margin-top: 10px"><i class="fa fa-file-text" aria-hidden="true"></i> VIEW COVERING LETTER </p></div>';
					
				str+='</div>';
				str+='<div class="col-sm-6 ">';
					str+='<h4> REFERRED MEMBERS DETAILS </h4>';
					str+='<div class="block_padding_10 m_top10">';
						for(var i in result.referDetailsList){
						str+='<div class="media">';
							//str+='<div class="media-left" style="text-align:center">';
								//str+='<img class="media-object thumbnail" onerror="setDefaultImage(this);" alt="Candidate Image" style="width: 60px !important; height: 60px  !important;" src="http://mytdp.com/'+result.referDetailsList.candidatePath+'"></img>';								
							//str+='</div>';
							str+='<div class="media-left" >';
								if(result.referDetailsList[i].candidatePath != null && result.referDetailsList[i].candidatePath.length>0){
										str+='<img style="width: 60px ! important; height: 60px ! important; margin-top: 6px;" src="'+result.referDetailsList[i].candidatePath+'" class="imageCss"></img>';
								}else{
										str+='<i class="fa fa-user-circle fa-5x" aria-hidden="true" style="#EBEBEB"></i>';
										str+='<span style="position: relative; top: -62px; left: 39px;">';
										if(result.referDetailsList[i].partyName != null && result.referDetailsList[i].partyName =='TDP')
											str+='<img src="Assests/images/TDP.PNG" style="width: 20px;" class="smallerImg"></img></span>';
								}
							str+='</div>';
							str+='<div class="media-body">';
								str+='<div class="bg_light-Color" style="padding:10px">';
									//str+='<p><b>Name</b></p>';
									str+='<h4><b>'+result.referDetailsList[i].name+'</b></h4>';
									str+='<span><b>('+result.referDetailsList[i].designation+'),</b>';
									str+='<h5><b> PUBLIC REPRESENTATIVE ADDRESS : </b></h5>';
									if(result.referDetailsList[i].candidateAddressVO.assemblyName != null && result.referDetailsList[i].candidateAddressVO.assemblyName.length>0)
										str+='<h5> Constityency : '+result.referDetailsList[i].candidateAddressVO.assemblyName+' ,</h5> ';
									if(result.referDetailsList[i].candidateAddressVO.districtName != null && result.referDetailsList[i].candidateAddressVO.districtName.length>0)
										str+='<h5> District : '+result.referDetailsList[i].candidateAddressVO.districtName+'.</h5></span>';
									if(result.referDetailsList[i].candidateAddressVO.stateName != null && result.referDetailsList[i].candidateAddressVO.stateName.length>0)
										str+='<h5> State : '+result.referDetailsList[i].candidateAddressVO.stateName+'.</h5></span>';
									
									str+='<div class="row">';
										str+='<div class="col-sm-12 col-md-6">';
											str+='<h5><b>Party:</b>';
											str+=''+result.referDetailsList[i].partyName+' </h5>';
										str+='</div>';
										str+='<div class="col-sm-12 col-md-6">';
											str+='<h5><b>CONTACT DETAILS :</b></h5>';
											if(result.referDetailsList[i].email != "")
												str+='<p>Email id : '+result.referDetailsList[i].email+'</p>';
											if(result.referDetailsList[i].mobileNO != "")
												str+='<p>Contact No : '+result.referDetailsList[i].mobileNO+'</p>';
										str+='</div>';
										if(result.referDetailsList[i].fileNamesList.length >0){
										referralDocs.push(result.referDetailsList[i]);
											str+='<div style=""><p class="viewDivId pull-right docsViewCls" attr_docs="referral" attr_candidate_id="'+result.referDetailsList[i].id+'" style="cursor:pointer;margin-right: 30px;margin-top: 10px"><i class="fa fa-file-text" aria-hidden="true"></i> VIEW REFERRAL LETTER </p></div>';
										}
									str+='</div>';
									
								str+='</div>';
							str+='</div>';
						str+='</div>';
						}
					str+='</div>';
					
				str+='</div>';
				/* str+='<div class="col-sm-12 m_top20">';
					str+='<h5><b>CANDIDATE PREVIOUS WORKS</b></h5>';
					str+='<table class="table table-bordered">';
						str+='<thead>';
							str+='<th>NAME OF WORK</th>';
							str+='<th>LOCATION</th>';
							str+='<th>WORKS</th>';
							str+='<th>EST COST</th>';
						str+='</thead>';
						str+='<tbody>';
							str+='<tr>';
								str+='<td>Special repairs to CPWS Scheme to Raiwada & other habitations</td>';
								str+='<td>Srikakulam</td>';
								str+='<td>12</td>';
								str+='<td>210.00</td>';
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
				str+='<div class="clearfix"></div>'; */
				//for(var j in result.worksList){
				str+='<div class="col-sm-10 m_top20">';
					str+='<h5><b>WORK TYPE DETAILS</b></h5>';

					str+='<table class="table table-bordered" cellpadding="100" style="border:1px solid grey;margin-top:10px;">';
						str+='<tbody>';
							str+='<tr>';
								str+='<td style="background-color:lightgrey;text-align: center;font-weight: bold;padding: 17px" > NAME OF THE WORK </td>';
								str+='<td style="background-color:#D1AB66;text-align: center;font-weight: bold;padding: 17px;">NO OF WORKS </td>';
								str+='<td style="background-color:#D1AB66;text-align: center;font-weight: bold;padding: 17px">WORK IN COST </td>';
							str+='</tr>';
							str+='<tr>';
								str+='<td>'+result.workName+'</td>';
								str+='<td style="background-color:#D1AB66;text-align: center;font-weight: bold;padding: 17px">'+result.noOfWorks+'</td>';
								str+='<td style="background-color:#D1AB66;text-align: center;font-weight: bold;padding: 17px">'+result.estimateCost+'</td>';
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';

				str+='</div>';
				if(result.fileList.length >0){
				str+='<div class="col-sm-2 m_top20">';
					str+='<h5><b>OTHER DOCUMENTS</b></h5>';
					workDocs = result.fileList;
						str+='<div style=""><p class="viewDivId pull-right docsViewCls" attr_docs="workDocs" style="cursor:pointer;margin-right: 30px;margin-top: 10px;"><i class="fa fa-file-text" aria-hidden="true"></i> VIEW DOCUMENT</p></div>';
				str+='</div>';
				}
				str+='<div class="clearfix"></div>';
				str+='<div class="col-sm-12 m_top20" style="border-bottom:5px solid #EBEBEB;border-top:5px solid #EBEBEB;">';
					str+='<table class="table">';
						str+='<td style="font-weight: bold;"> NO OF WORKS - '+result.noOfWorks+'</td>';
						/* str+='<td style="padding:15px"><i class="fa fa-check-circle-o" aria-hidden="true" style="padding-right:10px;color:#01A64E;font-size:15px"></i>Endorse</td>';
						str+='<td style="padding:15px"><i class="fa fa-times-circle-o" aria-hidden="true" style="padding-right:10px;color:#EC2027;font-size:15px"></i>Rejected</td>';
						str+='<td><button class="btn">Select All</button></td>';
						str+='<td><button class="btn btn-success">Final Approval</button></td>';
						str+='<td><button class="btn btn-danger">Not Possible</button></td>';
						str+='<td><button class="btn btn-danger">Reject</button></td>'; */
					str+='</table>';
				str+='</div>';
				
				if(result.statusList != null && result.statusList.length>0){
					str+='<div class="col-sm-12 m_top20" style="border-bottom:5px solid #EBEBEB;border-top:5px solid #EBEBEB;">';
					str+='<table class="table table-condensed table-bordered  m_top20" style="margin-bottom:20px;">';
						str+='<thead>';
						for(var s in result.statusList){
							str+='<th  style="text-align:center;color:'+colorCode[result.statusList[s].key]+';">'+result.statusList[s].value.toUpperCase()+'</th>';
						}						
						str+='</thead>';
						str+='<tbody>';
						for(var s in result.statusList){
							if(result.statusList[s].count == 0)
								str+='<td  style="text-align:center"> - </td>';
							else
								str+='<td  style="text-align:center">'+result.statusList[s].count+'</td>';
						}						
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
				
				}
				var isAllEndorsed=true;
				for(var j in result.subWorksList){	
					for(var k in result.subWorksList[j].subWorksList){
						workIdsArr.push(result.subWorksList[j].subWorksList[k].workId);
						var leadName = result.subWorksList[j].subWorksList[k].leadName;
						if(leadName == null || leadName.length ==0){
							isAllEndorsed=false;
						}
					}
				}
				if(result.statusList != null && result.statusList.length>0){
					var accessStatusList = result.statusList[0].subList;
					str+='<div class="col-sm-12 m_top20 pull-right" style="border-bottom:5px solid #EBEBEB;border-top:5px solid #EBEBEB;">';
					
					if(accessStatusList != null && accessStatusList.length>0){
							str+='<div class="row ">';
							str+='<div class="col-sm-3 m_top10 ">';
								str+='<button class="btn btn-info modelEndoreCls" attr_statusId="0" style="margin-bottom:10px;" > UPDATE PRESENT STATUS  </button>';
							str+='</div>';
							for(var s in accessStatusList){
								if(s==3 || s==6|| s==9){
									str+='<div class="row ">';
									str+='<div class="col-sm-3 m_top10 ">';
									str+='</div>';
							
									str+='<div class="col-sm-3 m_top10 ">';
								}else{
									str+='<div class="col-sm-3 m_top10 ">';
								}
								
								if(accessStatusList[s].key == 1){
									if(!isAllEndorsed)
										str+='<button class="statusCls endorseCls modelEndoreCls btn " attr_statusId="'+accessStatusList[s].key+'"  style="color:'+colorCode[accessStatusList[s].key]+';margin-bottom:10px;width: 200px;margin-left: -9px;" attr_next_status_id="6" attr_type="endosePopup" attr_petition_id="'+result.petitionId+'"> ENDORSE </button>';
									str+='<div id="endorseErrMsgId" style="color:red;"></div>';
								}
								if(accessStatusList[s].key == 5){
										str+='<button class="statusCls btn modelEndoreCls" attr_next_status_id="5" attr_statusId="'+accessStatusList[s].key+'"  style="color:'+colorCode[accessStatusList[s].key]+';margin-bottom:10px;width: 200px;margin-left: -9px;" attr_type="notPossiblePopup" attr_petition_id="'+result.petitionId+'"> NOT POSSIBLE </button>';
								}
								if(accessStatusList[s].key == 3){
										str+='<button class="statusCls btn  modelEndoreCls" attr_next_status_id="8" attr_statusId="'+accessStatusList[s].key+'"  style="color:'+colorCode[accessStatusList[s].key]+';margin-bottom:10px;;width: 200px" attr_type="notPossiblePopup"> '+accessStatusList[s].value.toUpperCase()+' </button>';
								}
								if(accessStatusList[s].key == 4){
										str+='<button class="statusCls btn modelEndoreCls" attr_next_status_id="4" attr_statusId="'+accessStatusList[s].key+'"  style="color:'+colorCode[accessStatusList[s].key]+';margin-bottom:10px;;width: 200px" attr_type="notPossiblePopup"> '+accessStatusList[s].value.toUpperCase()+' </button>';
								}
								if(accessStatusList[s].key == 6){
										str+='<button class="statusCls btn  modelEndoreCls" attr_next_status_id="7" attr_statusId="'+accessStatusList[s].key+'"  style="color:'+colorCode[accessStatusList[s].key]+';margin-bottom:10px;;width: 200px" attr_type="notPossiblePopup"> UPLOAD ACTION MEMO </button>';
								}
								if(accessStatusList[s].key == 7){
										str+='<button class="statusCls btn  modelEndoreCls" attr_next_status_id="3" attr_statusId="'+accessStatusList[s].key+'"  style="color:'+colorCode[accessStatusList[s].key]+';margin-bottom:10px;;width: 200px" attr_type="notPossiblePopup"> UPLOAD DETAILED REPORT </button>';
								}
								
								str+='</div>';
							}
							str+='</div>';
					}
					str+='</div>';
				}
				
				if(result.subWorksList[j].subWorksList.length != null && result.subWorksList[j].subWorksList.length <= 1){
					
				}else {
					str+='<div class="col-sm-12 m_top20">';

					str+='<div class="col-sm-12  ">';
							str+='<button class="btn btn-info selectedCls pull-right" isSeleted="false" attr_worksId="0" attr_dept_id="0" style="margin-bottom:10px;" > SELECT ALL  </button>';
						str+='</div>';
				}

				var workCount = 0;
				str+='<div class="row">';
				for(var j in result.subWorksList){
				for(var k in result.subWorksList[j].subWorksList){
					var leadName = result.subWorksList[j].subWorksList[k].leadName;
					
					workCount = workCount+1;
					
						str+='<div class="col-sm-6 m_top10">';
							str+='<h5><b>WORK NO '+workCount+'</b> <b class="pull-right" >STATUS: <span  style="color:'+colorCode[result.subWorksList[j].subWorksList[k].statusId]+';"> '+result.subWorksList[j].subWorksList[k].status.toUpperCase()+'</span></b></h5>';
							str+='<div class="bg_light-Color block_padding_10 m_top10">';
								str+='<table class="table table-bordered">';
									str+='<tr>';
										str+='<td><b> WORK TYPE </b></br><b>'+result.subWorksList[j].subWorksList[k].workType+'</b> </td>';
										//str+='(status:'+result.subWorksList[j].subWorksList[k].status+')';
										str+='<td colspan="2">';
											str+='<p><b>LOCATION</b></p>';
											str+='<span style="display:inline-block;padding:10px"><b>District</b></br>'+result.subWorksList[j].subWorksList[k].addressVO.districtName+'</span>';
											if(result.subWorksList[j].subWorksList[k].addressVO.assemblyName != "")
											str+='<span style="display:inline-block;padding:10px" class="text-capitalized"><b>Constituency</b></br>'+result.subWorksList[j].subWorksList[k].addressVO.assemblyName+'</span>';
											if(result.subWorksList[j].subWorksList[k].addressVO.tehsilName.trim() != "")
											str+='<span style="display:inline-block;padding:10px">Mandal</br><b>'+result.subWorksList[j].subWorksList[k].addressVO.tehsilName+'</b></span>';
										str+='</td>';
									str+='</tr>';
									str+='<tr>';
										str+='<td><b>SUBJECT: </b>'+result.subWorksList[j].subWorksList[k].subject+'</td>';
										str+='<td><b>SUB-SUBJECT:  </b>'+result.subWorksList[j].subWorksList[k].subSubject+'</td>';
										str+='<td><b>DEPARTMENT : </b>'+result.subWorksList[j].subWorksList[k].deptName+'</td>';
									str+='</tr>';
								str+='</table>';
							str+='</div>';
						str+='</div>';
						
						str+='<div class="col-sm-6 m_top10">';
							str+='<h5><b>WORK DESCRIPTION</b> ';
							/*if(result.subWorksList[j].subWorksList[k].statusId == 1)
								str+=' <span class="pull-right" style="color:orange" > <b style="color:#000"> STATUS: </b><b> '+result.subWorksList[j].subWorksList[k].status.toUpperCase()+'  </b> </span> ';
							else if(result.subWorksList[j].subWorksList[k].statusId == 8 )
								str+=' <span class="pull-right" style="color:green;" > <b style="color:#000"> STATUS: </b><b> '+result.subWorksList[j].subWorksList[k].status.toUpperCase()+'  </b> </span> ';
							else
								str+='<span class="pull-right" > <b style="color:#000"> STATUS:</b><b>'+result.subWorksList[j].subWorksList[k].status.toUpperCase()+'  </b> </span> ';*/
							
							//if(result.subWorksList[j].subWorksList[k].leadName == null || result.subWorksList[j].subWorksList[k].leadName.length ==0)
								str+=' <span class="pull-right"  style=""> <button class="btn btn-info selectedCls" attr_work_id="'+result.subWorksList[j].subWorksList[k].workId+'"  isSeleted="false" attr_dept_id="'+result.subWorksList[j].subWorksList[k].deptName+'" attr_worksId="'+result.subWorksList[j].subWorksList[k].workId+'"  > SELECT </button> </span> ';
							
							str+='</h5>';
							str+='<div class=" block_padding_3 m_top10">';
								str+='<p style="font-size:12px;border: 1px solid lightgray; width: 570px;height: 150px;padding: 10px;">'+result.subWorksList[j].subWorksList[k].workName+'</p>';
							str+='</div>';
						str+='</div>';
						
					str+='</div>';
				str+='</div>';
				str+='<div class="col-sm-12">';
					str+='<div class="bg_light-Color block_padding_3 m_top10">';
						str+='<table class="table">';
							str+='<tbody>';
								str+='<td><b>Lead Details :</b> <span>'+result.subWorksList[j].subWorksList[k].leadName+'</span></td>';
								str+='<td><b>Brief Lead:</b><span>'+result.subWorksList[j].subWorksList[k].briefLeadName+'</span></td>';
								str+='<td><b>Grant Under :</b><span>'+result.subWorksList[j].subWorksList[k].grantName+'</span></td>';
								str+='<td><b>Est Cost :</b><span>'+result.subWorksList[j].subWorksList[k].estimateCost+'</span></td>';
								str+='<td><b>eOffice ID :</b><span>'+result.subWorksList[j].subWorksList[k].eOfficeId+'</span></td>';
							str+='</tbody>';
						str+='</table>';
					str+='</div>';
				
				}
				
			}
			str+='</div>';
		str+='</div>';
		/* str+='<div class="col-sm-12 m_top20" style="border-bottom:5px solid #EBEBEB"></div>';
				str+='<div class="col-sm-12 m_top20">';
					str+='<button class="btn btn-success pull-right">SUBMIT</button>';
				str+='</div>';
			str+='</div>'; */
	
	$("#representeeViewId").html(str);
}else{
	$("#representeeViewId").html("No Data Available");
}
}
	function setDefaultImage(img){
			  img.src = "http://www.mytdp.com/images/User.png";
	}
/* $(document).on("click",".docsViewCls",function(){
	$("#docsModalDivId").modal("show");
	var docsList = [];
	var str="";
	if($(this).attr("attr_docs") == "referral"){
		$("#viewDocumentHeading").html("Referral Documents")
		 for(var i = 0; i<referralDocs.length; i++){
			if(referralDocs[i].id == $(this).attr("attr_candidate_id")){
				docsList  = referralDocs[i].fileNamesList;
			 }
		 }
	}else if($(this).attr("attr_docs") == "workDocs"){
		$("#viewDocumentHeading").html("Work Documents")
		docsList = workDocs;
	}else if($(this).attr("attr_docs") == "covering"){
		$("#viewDocumentHeading").html("Covering Letter")
		docsList = coveringDocs;
	}
	
	if(docsList != null && docsList.length >0){
			for(var j in docsList){
				var scanCopySpl = docsList[j].value.split("."); 
				var scanCopyExt = $.trim(scanCopySpl[scanCopySpl.length-1].toLowerCase()); 
					str+='<div class="col-sm-6">';
						
						str+='<div class="viewImageCss">';
						if(scanCopyExt =="pdf"){
							str+='<a class="fancyboxView" href="#inline'+j+'">';
							str+='<div class="mouse-over">Expand</div>';
								str+='<object data="'+docsList[j].value+'" type="application/pdf" width="100%"height="300px;"></object>';
							str+='</a>';
							str+='<div id="inline'+j+'" style="width:100%;display: none;">';
								str+='<object data="'+docsList[j].value+'" type="application/pdf"   style="cursor:pointer;height:1000px;width:1000px"></object>';
							str+='</div>';
							
						}else if( scanCopyExt =="jpeg" || scanCopyExt =="jpg"  || scanCopyExt =="gif"  || scanCopyExt =="bmp"  || scanCopyExt =="png"){
							str+='<a class="fancyboxView" href="#inline'+j+'">';
								str+='<img src="'+docsList[j].value+'"  width="100%" height="300px;"></img>';
							str+='</a>';
							str+='<div id="inline'+j+'" style="width:100%;display: none;">';
								str+='<img src="'+docsList[j].value+'"    style="cursor:pointer;height:1000px;width:1000px"></object>';
							str+='</div>';
						}else{
							str+='<b>Click <a href="javascript:{};" onclick="openDoc(\''+docsList[j].value+'\')">Here</a> To View Document</b>';
						}
			
				str+='</div>';
			str+='</div>';
	
		}
	}

		$("#docsViewModalId").html(str);
		$(".fancyboxView").fancybox();
}); */

function openDoc(docmnt){
	 window.open(docmnt);
}

function getPetitionReferredMemberDetails(desigIds,selrefCanId,statusId){
	var selStatusId = $("#statusId").val();
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}else if(statusId.length >0){
		var statusList = statusId.split(',');
		for(var i=0;i<=statusList.length-1;i++){
			statusIds.push(statusList[i]);
		}
	}
	var desig = $("#designationsId").val();
	if(desig != null || desig !=0){
			desigIds =  desig;
	}
	var refrralCandId = $("#referralNameId").val();
	if(refrralCandId != null && refrralCandId.length >0){
		selrefCanId=refrralCandId;
	}
	var deptIds =  $("#departmntId").val();
    var deptIdsList = [];
	if(deptIds != null && deptIds.length >0){
		deptIdsList=deptIds;
	}
	if(deptIdsList != null && deptIdsList.length>0){
		for(var i in deptIdsList){
			if(parseInt(deptIdsList[i])==0){
				deptIdsList=[];
			}
		}
	}
     var json = {
		 designationIds:desigIds,
		 reprType :"referralView",
		 referrerCandidateId:selrefCanId,
		 statusIds :statusIds,
		 deptIdsList : deptIdsList
		}           
	$.ajax({              
		type:'POST',    
		url: 'getPetitionReferredMemberDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#referralNameId").empty();
		if(result !=null && result.length >0){
			//$("#referralNameDiv").show();
			//$("#"+selBoxId).html("<option value='0'>Select Designation</option>");
			for(var i in result){
				if(refCanId != "" && refCanId == result[i].designationId){
					$("#referralNameId").append("<option value='"+result[i].designationId+"' selected>"+result[i].petitionMemberVO.name+"-"+result[i].petitionMemberVO.memberType+"-"+result[i].candidateAddressVO.assemblyName+"</option>");
				}else{
					$("#referralNameId").append("<option value='"+result[i].designationId+"'>"+result[i].petitionMemberVO.name+"-"+result[i].petitionMemberVO.memberType+"-"+result[i].candidateAddressVO.assemblyName+"</option>");
				}
			}
		}
		$("#referralNameId").trigger('chosen:updated');
		if(searchBy == 'referralCan' && refCanId >0){
			getRepresentativeSearchDetails1("petition",0,"");
		}
	});	
}
function updatePetitionStatusDetails(){
	 
	   var petitionIdsList = [1,2,3,4];
	   var subWorkIdsList = [1,2,3,4];
	   var json = {
		   statusId : 1,
	       remarks:"",
		   petitionIdsList:petitionIdsList,
		   subWorkIdsList:subWorkIdsList
	    };
	  $.ajax({              
	    type:'POST',    
	    url: 'updatePetitionStatusDetails',
	    dataType: 'json',
	    data : JSON.stringify(json),
	    beforeSend :   function(xhr){
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    }
	  }).done(function(result){
	   // console.log(result);
		if(result != null){
			
		}else{
			
		}
	  });
	}
 $(document).on("click",".closeSecondModal",function(){
    setTimeout(function(){
      $("body").addClass("modal-open");
    },1000);
  });
   
 function getPmBriefLeadList(id){
	 globalDesignationId =$("#hiddenDesignationId").val();
	 if(parseInt(id) == 0)
		id=0;
	else
		id=globalDesignationId;
	
	var selStatusId = $("#statusId").val();
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}else if(statusId.length >0){
		var statusList = statusId.split(',');
		for(var i=0;i<=statusList.length-1;i++){
			statusIds.push(statusList[i]);
		}
	}
	
		var deptIds =  $("#departmntId").val();
		//alert(deptIds);
	var deptIdsList = [];
		if(deptIds != null && deptIds.length >0){
			deptIdsList=deptIds;
		}
	if(deptIdsList != null && deptIdsList.length>0){
		for(var i in deptIdsList){
			if(parseInt(deptIdsList[i])==0){
				deptIdsList=[];
			}
		}
	}
	 
	 $("#leadId").html('');
	 $("#leadId").html('<option value="0"> Select lead </option>');
   var json = {
      designationId:id,
	  deptIdsList : deptIdsList,
	   statusIds :statusIds,
	   fromDate :currentFromDate,
	   toDate : currentToDate
	   
    };
  $.ajax({              
    type:'POST',    
    url: 'getPmBriefLeadList',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  if(result !=null && result.length>0){
		  if(parseInt(id)>0){
			  $("#leadDivId").show();
			  $("#selectLeadDivId").hide();
				$("#leadId").html('<option value="0">Select lead</option>');
				for(var i in result){
					if(parseInt(result[i].key)==28 || parseInt(result[i].key)==2)
						$("#leadId").append('<option value="'+result[i].key+'" selected>'+result[i].value+' </option>');
					else
						$("#leadId").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
				}
		  }else{
			   $("#leadDivId").hide();
			   $("#selectLeadDivId").show();
			  $("#selectLeadId").html('<option value="0">Select lead</option>');
				for(var i in result){
						$("#selectLeadId").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
				}
		  }
			
		}
		
		if(searchBy == 'lead' && briefleadId >0){
			 if(typeof(briefleadId) != 'undefined' && briefleadId !=''){
				$("#selectLeadId").val(briefleadId);
				 $("#selectLeadDivId").show();
			}
			$("#selectLeadId").trigger('chosen:updated');
			$('#locationSelId').val('lead');
			getRepresentativeSearchDetails1("petition",0,"");
		}
		if(parseInt(id)>0)
			$("#leadId").trigger('chosen:updated');
		else
			$("#selectLeadId").trigger('chosen:updated');
	});	 
}

function getPmGrantList(){
	 $("#grantId").html('');
	 $("#grantId").html('<option value="0">Select grant under </option>');
   var json = {
      
    };
  $.ajax({              
    type:'POST',    
    url: 'getPmGrantList',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  if(result !=null && result.length>0){
			 $("#grantId").html('<option value="0">Select grant under </option>');
			for(var i in result){
				$("#grantId").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#grantId").trigger('chosen:updated');
	});	 
}

function getLoginUserAccessSubDeptDesignationDetail(selectedDeptIdsArr){
	globalDesignationId =$("#hiddenDesignationId").val();
	 $("#assignToId").html('');
	 $("#assignToId").html('<option value="0"> SELECT DESIGNATION </option>');
	 
	$("#officerId").html('');
	$("#officerId").html('<option value ="0">SELECT OFFICER  </option>');
	
 var json = {
	 deptIdsList : selectedDeptIdsArr,
	 statusId : $('option:selected', '#statusChangeId').attr('attr_next_status_id')
	}           
$.ajax({              
	type:'POST',    
	url: 'getLoginUserAccessSubDeptDesignationDetail',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
}).done(function(result){
	if(result !=null && result.length>0){
		$("#assignToId").html('<option value ="0">SELECT DESIGNATION </option>');
		for(var i in result){
			if(glDesignationId == 2 || glDesignationId==86){// minister/OSD
				if(result[i].key == 23 ){
					$("#assignToId").append('<option value ="'+result[i].key+'" selected>'+result[i].value.toUpperCase()+'</option>');
					getDeptDesignationOfficerDetail(result[i].key);
				}else
					$("#assignToId").append('<option value ="'+result[i].key+'">'+result[i].value.toUpperCase()+'</option>');
			}else if(glDesignationId == 23){
				if(result[i].key == 94 ){// PS
					$("#assignToId").append('<option value ="'+result[i].key+'" selected>'+result[i].value.toUpperCase()+'</option>');
					getDeptDesignationOfficerDetail(result[i].key);
				}else
					$("#assignToId").append('<option value ="'+result[i].key+'">'+result[i].value.toUpperCase()+'</option>');
			}else{
				$("#assignToId").append('<option value ="'+result[i].key+'">'+result[i].value.toUpperCase()+'</option>');
			}
			
		}
	}
	$("#assignToId").trigger('chosen:updated');
});	
}

$(document).on('change','.popUpChangesCls',function(){
	var onChangeValue = $(this).val();
	getDeptDesignationOfficerDetail(onChangeValue)
})

function getDeptDesignationOfficerDetail(onChangeValue){
	var petitionId = $("#petitionsId").val();
	
	$("#officerId").html('');
	$("#officerId").html('<option value ="0">SELECT OFFICER  </option>');
	$("#officerId").trigger('chosen:updated');
	var deptDesignationId = onChangeValue;
 var json = {
		//deptDesignationId : deptDesignationId,
		pmDeptDesignationOfficerId : deptDesignationId,
		deptIdsList : departmentSelectArr,
		statusId : $('option:selected', '#statusChangeId').attr('attr_next_status_id'),
		petitionId : petitionId
	}           
$.ajax({              
	type:'POST',    
	url: 'getDeptDesignationOfficerDetail',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
}).done(function(result){
	if(result != null && result.length >0){
		$("#officerId").html('<option value ="0">SELECT OFFICER </option>');
		for(var i in result){
			if(result[i].key == 381)// jawahar reddy
				$("#officerId").append('<option value ="'+result[i].key+'" selected>'+result[i].value.toUpperCase()+'</option>');
			else
				$("#officerId").append('<option value ="'+result[i].key+'" >'+result[i].value.toUpperCase()+'</option>');
		}
	}
	$("#officerId").trigger('chosen:updated');
});	
}


$(document).on('click','.modelEndoreCls',function(){
	var statusId = $(this).attr("attr_statusId");
	//alert(nextStatusId)
	$("#nextStatusId").val(nextStatusId);
	$("#totalWorksId").html(workIdsArr.length);
	$("#selectdWorksId").html(selectedWorkIdsArr.length);
	var nonSelected = workIdsArr.length-selectedWorkIdsArr.length;
	$("#notSeleWorksId").html(nonSelected);
	
	if(statusId == 0){
		$("#endorseMentModalDivId").modal("show");
		$("#fileUploadDiv").hide();
		$("#remarksDivId").show();
		$("#fileUploadingDivId").hide();
		$("#leadDivId").hide();
		$("#grantDivId").hide();
		$("#assignOfficerDivId").hide();
		$("#assignDesignationDivId").hide();
		$("#endorsementDivId").hide();
		return;
	}

	var nextStatusId = $(this).attr("attr_next_status_id");
	$("#endorseErrMsgId").html("");
	$("#officerId").html('');
	$("#officerId").html('<option value ="0">Select Officer </option>');
	$("#remarksId").html("");
	$("#endorsmentNo").val('');
	$("#uploadFile").html('');
	if(selectedWorkIdsArr.length>0){
		$("#endorseMentModalDivId").modal("show");
		if(statusId == 1){

			$("#remarksDivId").show();
			$("#fileUploadingDivId").show();
			$("#leadDivId").show();
			$("#grantDivId").show();
			$("#assignOfficerDivId").show();
			$("#assignDesignationDivId").show();
			$("#fileUploadDiv").show();

			$("#leadId").html('<option value ="0">SELECT LEAD </option>');
			$("#grantId").html('<option value ="0">SELECT UNDER GRANT</option>');
			$("#assignToId").html('<option value ="0">SELECT DEPARTMENT</option>');
			$("#officerId").html('<option value ="0">SELECT OFFICER </option>');
			$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
			
			$("#assignToId").html('');
			 $("#assignToId").html('<option value="0"> Select designation </option>');
			 
			$("#officerId").html('');
			$("#officerId").html('<option value ="0">SELECT OFFICER  </option>');
			
			initializeSingleUploadDocument("uploadEndorsementDocId");
			
			getPmBriefLeadList($("#hiddenDesignationId").val());
			getPmGrantList();
			getLoginUserAccessSubDeptDesignationDetail(selectedDeptIdsArr);
		}
		else if(statusId == 6 || statusId == 7){
			$("#remarksDivId").show();
			$("#fileUploadingDivId").show();
			$("#leadDivId").hide();
			$("#grantDivId").hide();
			$("#assignOfficerDivId").hide();
			$("#assignDesignationDivId").hide();
			$("#endorsementDivId").hide();
			$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
			initializeSingleUploadDocument("uploadEndorsementDocId");
			$("#fileUploadDiv").show();
		}else if(statusId == 3 || statusId == 4 || statusId == 5){
			$("#fileUploadDiv").hide();
			$("#remarksDivId").show();
			$("#fileUploadingDivId").hide();
			$("#leadDivId").hide();
			$("#grantDivId").hide();
			$("#assignOfficerDivId").hide();
			$("#assignDesignationDivId").hide();
			$("#endorsementDivId").hide();
		}

	}else{
		alert(" Please select atleast one work. ");
		return;
	}
});


function getPmActionTypeList(){
	$("#actionTypId").html("<option value='0' selected>SELECT ASSIGN TYPE</option>");
	$("#actionTypId").trigger('chosen:updated');
	 var json = {
		}           
	$.ajax({              
		type:'POST',    
		url: 'getPmActionTypeList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			for(var i in result){
				$("#actionTypId").append("<option value='"+result[i].key+"'>"+result[i].value+"</option>");
			}
		}
		$("#actionTypId").trigger('chosen:updated');
	});	
	}
	
function onLoadClickDataDetails(){
	getPmActionTypeList();
	if(glDesignationId == 2 || glDesignationId == 86 || glDesignationId == 92){
		//$('#imageBuildingId').show();
	}else{
		//$('#imageBuildingId').css("display","none");
		//$('#imageBuildingId').hide();
	}
	$("#actionTypId").trigger('chosen:updated');
	
	
	if(searchBy == 'referral' || searchBy == 'referralCan'){
		//$("#locationSelId").html('');
		$("#locationSelId").val('referrelDesignation').trigger('chosen:updated');
		$( "#locationSelId" ).trigger( "change" );
		//$("#locationSelId").html('<option value="referrelDesignation"> Referral Designation wise </option>');
		//$("#locationSelId").trigger('chosen:updated');
		//$( "#locationSelId" ).trigger( "change" );
	}else if(searchBy == 'department'){
		$("#locationSelId").val('department').trigger('chosen:updated');
		$( "#locationSelId" ).trigger( "change" );
	}else if(searchBy == 'subject'){
		$("#locationSelId").val('subject').trigger('chosen:updated');
		$( "#locationSelId" ).trigger( "change" );
	}else if(searchBy == 'lead'){
		$("#locationSelId").val('lead').trigger('chosen:updated');
		$("#selectLeadId").val(briefleadId);
	}else if(searchBy == 'officer'){
		$("#locationSelId").val('pmOfficer').trigger('chosen:updated');
		$( "#locationSelId" ).trigger( "change" );
	}else if(searchBy == 'district' || (distId != null && distId!=0 )){
		$("#locationSelId").val('work').trigger('chosen:updated');
		$( "#locationSelId" ).trigger( "change" );
	}else if(searchBy == 'constituency' || (constId != null && constId!=0 )){
		$("#locationSelId").val('work').trigger('chosen:updated');
		$( "#locationSelId" ).trigger( "change" );
	}
	
}

function checkIsNumber(id,value){
	 if(isNaN(value)){
		$('#'+id+'').val('');
	 }
}
function getSubjectsBySearchType(searchType,selBoxId,subjectId,statusId){
	$("#"+selBoxId).html("");
	$("#"+selBoxId).empty();
	$("#"+selBoxId).trigger('chosen:updated');
	var selStatusId = $("#statusId").val();
	$("#errMsgId").html("");
	//alert(statusId)
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}else if(statusId >0){
		var statusList = statusId.split(',');
		for(var i=0;i<statusList.length-1;i++){
			statusIds.push(statusList[i]);
		}
	}
	var selSubjId = $("#subjectId").val();
	if(selSubjId != null && selSubjId.length >0){
		subjectId =selSubjId;
	}
	
	var deptIds =  $("#departmntId").val();
	var deptIdsList = [];
		if(deptIds != null && deptIds.length >0){
			deptIdsList=deptIds;
		}
	if(deptIdsList != null && deptIdsList.length>0){
		for(var i in deptIdsList){
			if(parseInt(deptIdsList[i])==0){
				deptIdsList=[];
			}
		}
	}

 var json = {
		 reportType :searchType,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 statusIds:statusIds,
		 assetType:subjectId,
		 deptIdsList :deptIdsList
		}           
	$.ajax({              
		type:'POST',    
		url: 'getSubjectsBySearchType',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#subJErrMsg").html('');
		 //$("#"+selBoxId).empty();
		  var subctList =[];
		if(subjId != null && subjId.length > 0){
				if(subjId.length >0){
					   var subjectsArr = subjId.split(',');
						for(var i=0;i<=subjectsArr.length-1;i++){
						subctList.push(subjectsArr[i]);
					}
				}
			}
		if(result !=null && result.length >0){
			//$("#"+selBoxId).html("<option value='0'>Select Department</option>");
			//$("#subjectDivId").show();
			for(var i in result){
				if ( $.inArray(result[i].key.toString(), subctList) == -1) {
					$("#"+selBoxId).append("<option value='"+result[i].key+"' >"+result[i].value+"</option>");
				}else{
					$("#"+selBoxId).append("<option value='"+result[i].key+"' selected>"+result[i].value+"</option>");
				}
			}
		}
		$("#"+selBoxId).trigger('chosen:updated');
		if(searchBy == 'subject' && distId ==0 && subjId >0){
			getRepresentativeSearchDetails1("petition",0,"");
		} 
	});	
}
/*
getPetitionTrackingHistoryDetails();
function getPetitionTrackingHistoryDetails(){
 var subworkIdsList = [1,2,3];
 var json = {
 petitionId : 1,
 subworkIdsList : subworkIdsList
 } 
$.ajax({ 
 type:'POST', 
 url: 'getPetitionTrackingHistoryDetails',
 dataType: 'json',
 data : JSON.stringify(json),
 beforeSend : function(xhr){
 xhr.setRequestHeader("Accept", "application/json");
 xhr.setRequestHeader("Content-Type", "application/json");
 }
}).done(function(result){
 
}); 
}
*/

// $("#menuVerticalId ul").append('<li style="margin-left: 7px; width: 298px; margin-bottom: 5px;"><a href="'+subList[j].url+'" >'+subList[j].name+'</a></li>');
/* function buildMenu(result){
	var str='';
	if(result.length ==1){
		for(var i in result){
			str+='<div class="panel panel-default" style="margin:0px 4px;">';
					str+='<div class="panel-heading" style="background-color:#a45e43e6;">';
			str+='<div id="collapse'+i+'" class="">';
				str+='<ul class="list-group">';
				for(var j in result[i].subList){
					str+='<li><div class="row"><div class="col-md-12 petCs"><a href="'+result[i].subList[j].url+'" attr_id="'+result[i].subList[j].entitlementUrlId+'">'+result[i].subList[j].name+'</a></div></div></li>';	
				}
				str+='</ul>';
			str+='</div>';
			str+='</div>';
			str+='</div>';
			
					
		}
	}else{
		for(var i in result){
			str+='<div class="panel-group" id="accordion'+i+'">';
				str+='<div class="panel panel-default">';
					str+='<div class="panel-heading">';
						str+='<h4 class="panel-title" data-toggle="collapse" data-parent="#accordion'+i+'" href="#collapse'+i+'" >';
							str+='<a style="cursor:pointer;">'+result[i].name+'</a>';
						str+='</h4>';
					str+='</div>';
					str+='<div id="collapse'+i+'" class="panel-collapse collapse">';
						str+='<ul class="list-group">';
						for(var j in result[i].subList){
							str+='<li><a href="'+result[i].subList[j].url+'" attr_id="'+result[i].subList[j].entitlementUrlId+'">'+result[i].subList[j].name+'</a></li>';
						}
						str+='</ul>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		 }
		
	}
	
		$("#menuId").html(str); 
} */

$(document).on("click",".petitionSubWorkRadoCls",function(){
	if($(this).is(":checked")){
		var typeVal =  $(this).attr("attr_type");
		$('#updatStatusChangeId').css('background-color','#449d44');
	$('#updatStatusChangeId').css('border-color','#449d44');
		$('.paginationId').html('');
		if(typeVal == "subWork"){
			$("#representationRequestEntryTable").html('');
			$("#petitionId").prop("checked",false);
			getRepresentativeSearchDetails1(typeVal,0,"");
			$("#petitionSubWorkRadioDivId").show();
		}else if(typeVal == "petition"){
			$("#workId").prop("checked",false);
			$("#representationRequestEntryTable").html('');
			getRepresentativeSearchDetails1(typeVal,0,"");
			$("#petitionSubWorkRadioDivId").show();
		}
	}
});
$(document).on("click",".menu-cls-table",function(e){
	e.stopPropagation();
	$(".menuCls-table").toggle();
});
$(document).on("click",function(e){
	var searchContainerCls = $(".menuCls-table");
	if (!searchContainerCls.is(e.target) 
        && searchContainerCls.has(e.target).length === 0) {
        searchContainerCls.hide();
    }
});

function petitionWiseRepresenteeDetails(myResult,radioTypeVal,globalStIndex,countByDate,reportType){
	 
	 var  RepresentationDate=false;
	 var  EndorsmentNo=false; 
	 var  EndorsmentDate=false; 
	 var  RepresenteeType=false; 
	 var  RepresenteeName=false; 
	 var  RepresenteeDesignation=false; 
	 var  ReferrerName=false; 
	 var  ReferreerDesignation=false; 
	 var  WorkDescription=false; 
	 var  EstimationCost=false; 
	 var  Status=false; 
	 var  noofWorks=false; 
	 var  Department=false; 
	 var  LeadName=false; 
	 var  Subject=false; 
	 var  SubSubject=false; 
	 var  GrantName=false; 
	 var  WorkType=false; 
	 var  HasCoveringLtr=false; 
	 var  HasActionCopy=false; 
	 var  HasDetailedReport=false; 
	 var  HasFinalCopy=false; 
	 var  HasOthersCopy=false; 
	 var  HasWorkCopy=false; 
	 var  WithWhome=false; 
	 var  LastUpdatedTime=false;
	 var HasReprRefDocs =false;
	var str='';
	str+='<div class="panel panel-default" style="margin-top:-8px;">';
		str+='<div class="panel-heading" style="background-color:#344650; color:#fff;">';
			str+='<h4 class="panel-title">';
			str+='<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"> REPRESENTATIONS DETAILS </a></h4>';
			
			str+='</div>';
		str+='</div>';
		
		str+='<div id="collapseTwo" class="panel-collapse collapse in">';
		str+='<div class="panel-body">';
		if(myResult !=null && myResult.length>0){
			if(globalStIndex == 0){
					countByDate=myResult[0].totalResultCount;
			}
		//if($(window).width>800){
			str+='<div class="table-responsive">';
		//}
		
			str+='<table class="table table_customRep table-bordered" id="workDetailsTab">';
				str+='<thead>';
					str+='<tr>';
					
					var alreadyBuild=false;
					if(glDesignationId == 23){
						$('#updatStatusChangeId').css('background-color','#e6e6e6;');
						$('#updatStatusChangeId').css('border-color','#e6e6e6;');
						
						str+='<th style="text-align:center" title="Select All"> <input type="checkbox" name="" id="" class="petitionsSelectedAllCls" value="0" />&nbsp;ALL&nbsp </th>';
					}
					for(var n in allCheckedColumnsArr){
						if(allCheckedColumnsArr[n].trim() =='RepresentationDate'){
							RepresentationDate =true;
							str+='<th  class="RepresentationDate"><span title="Representation Date" class="tooltipCls" data-toggle="tooltip">REPR.DATE</span></th>';
						}else if(allCheckedColumnsArr[n].trim() =='EndorsmentNo'){
							EndorsmentNo =true;
							str+='<th class="EndorsmentNo"><span title="Endorsment No" class="tooltipCls" data-toggle="tooltip">ENDORS NO</span></th>';
						}else if(allCheckedColumnsArr[n].trim() =='EndorsmentDate'){
							EndorsmentDate =true;
							str+='<th class="EndorsmentDate" ><span title="Endorsment Date" class="tooltipCls" data-toggle="tooltip">ENDORS DATE</span></th>';
						}else if(allCheckedColumnsArr[n].trim() =='RepresenteeType'){
							RepresenteeType =true;
							str+='<th  class="RepresenteeType" ><span title="Representee Type" class="tooltipCls" data-toggle="tooltip">REP TYPE</span></th>';
						}else if(allCheckedColumnsArr[n].trim() =='RepresenteeName'){
							RepresenteeName =true;
							str+='<th class="RepresenteeName" ><span title="Representee Name" class="tooltipCls" data-toggle="tooltip">REPRESENTEE NAME</span></th>';
						}else if(allCheckedColumnsArr[n].trim() =='RepresenteeDesignation'){
							RepresenteeDesignation =true;
							str+='<th class="RepresenteeDesignation" ><span title="Representee Designation" class="tooltipCls" data-toggle="tooltip">REP. DESIGNATION</span></th>';
					/*	}else if(allCheckedColumnsArr[n].trim() =='ReferrerName'){
							ReferrerName =true;
							str+='<th class="ReferrerName" ><span title="Referrar Name" class="tooltipCls" data-toggle="tooltip">REF NAME</span></th>';
						}else if(allCheckedColumnsArr[n].trim() =='ReferreerDesignation'){
							ReferreerDesignation =true;
							str+='<th class="ReferreerDesignation" ><span title="Referrar Designation" class="tooltipCls" data-toggle="tooltip">REF DESIGNATION</span></th>';*/
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
						}else if(allCheckedColumnsArr[n].trim() =='WorkDescription'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							WorkDescription =true;
							str+='<th  class="WorkDescription" ><span style="min-width:200px !important;"  title="Work Description" class="tooltipCls" data-toggle="tooltip">WORK DESC</span></th>';
						}else if(allCheckedColumnsArr[n].trim() =='EstimationCost'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							EstimationCost =true;
							str+='<th  class="EstimationCost" >ESTIMATION COST (in Lakhs)</th>';
						}else if(allCheckedColumnsArr[n].trim() =='noofWorks'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							noofWorks =true;
							if(radioTypeVal=="petition")
								str+='<th  class="noofWorks" >NO OF WORKS</th>';
						}else if(allCheckedColumnsArr[n].trim() =='Status'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							Status =true;
							str+='<th class="Status" >STATUS</th>';
						}else if(allCheckedColumnsArr[n].trim() =='Department'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							Department =true;
							str+='<th  class="Department">DEPARTMENT</th>';	//columnShowHide	
						}else if(allCheckedColumnsArr[n].trim() =='Subject'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							Subject =true;
							str+='<th  class="Subject ">SUBJECT</th>';
						}else if(allCheckedColumnsArr[n].trim() =='SubSubject'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							SubSubject =true;
							str+='<th  class="SubSubject ">SUB_SUBJECT</th>';
						}else if(allCheckedColumnsArr[n].trim() =='GrantName'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							GrantName =true;
							str+='<th  class="GrantName ">GRANT NAME</th>';	
						}else if(allCheckedColumnsArr[n].trim() =='LeadName'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							LeadName =true;
							str+='<th  class="LeadName ">LEAD NAME</th>';
						}else if(allCheckedColumnsArr[n].trim() =='WorkType'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							WorkType =true;
							str+='<th  class="WorkType ">WORK TYPE</th>';
						}else if(allCheckedColumnsArr[n].trim() =='HasReprRefDocs'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							HasReprRefDocs =true;
							str+='<th  class="HasReprRefDocs "> REPR REF DOCS</th>';
						}else if(allCheckedColumnsArr[n].trim() =='HasWorkCopy'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							HasWorkCopy =true;
							str+='<th  class="HasWorkCopy "> WORK DOCS</th>';
						}else if(allCheckedColumnsArr[n].trim() =='HasCoveringLtr'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							HasCoveringLtr =true;
							str+='<th  class="HasCoveringLtr "> COVERING LTR</th>';
						}else if(allCheckedColumnsArr[n].trim() =='HasActionCopy'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							HasActionCopy =true;
							str+='<th  class="HasActionCopy "> ACTION COPY</th>';
						}else if(allCheckedColumnsArr[n].trim() =='HasDetailedReport'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							HasDetailedReport =true;
							str+='<th  class="HasDetailedReport "> DETAILED REPORT</th>';
						}else if(allCheckedColumnsArr[n].trim() =='HasFinalCopy'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							HasFinalCopy =true;
							str+='<th  class="HasFinalCopy "> FINAL COPY</th>';
						}else if(allCheckedColumnsArr[n].trim() =='HasOthersCopy'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							HasOthersCopy =true;
							str+='<th  class="HasOthersCopy "> OTHERS COPY</th>';						
						}else if(allCheckedColumnsArr[n].trim() =='WithWhome'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							
							WithWhome =true;
							str+='<th  class="WithWhome "> CURRENTLY WITH </th>';
						}else if(allCheckedColumnsArr[n].trim() =='LastUpdatedTime'){
							
							if(!alreadyBuild){
								alreadyBuild = true;
								str+='<th>DISTRICT</th>';
								str+='<th>ASSEMBLY</th>';
								str+='<th>MANDAL/MUNCI.</th>';
							}
							
							 
							LastUpdatedTime =true;
							str+='<th  class="LastUpdatedTime ">LAST UPDATED TIME</th>';
						}
					}
					
					str+='<th>ACTION</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				
					for(var s in myResult){
					  /* for(var j in result[i].subList){
						  var noofWorks = result[i].subList;
					} */
					var result=[];
					if(radioTypeVal=="petition")
						result.push(myResult[s]);
					else
						result=myResult[s].subList;
					
					for(var i in result){
					
					var endorsmentNo='';
					str+='<tr>';
					if(result[i].endorsementNO != null && result[i].endorsementNO != 0){
						endorsmentNo=result[i].endorsementNO;
					}
					if(glDesignationId == 23){
						str+='<td  style="text-align:center" > <input type="checkbox" name="" id="" value="'+result[i].petitionId+'" class="petitionStatusUpdateCls"/> &nbsp; ';
						//str+='<i class="fa fa-eye viewBtnCls tooltipCls" aria-hidden="true" attr_enrorsNo="'+endorsmentNo+'" attr_petiotion_id="'+result[i].petitionId+'"  style="margin-right: 20px; font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="View Petition"> </i>';
						str+='</td>';	
					}
					
					  if(RepresentationDate){	
						if(result[i].raisedDate != null && typeof(result[i].raisedDate) != "undefined"){
							str+='<td style="text-align:center;cursor:pointer;" aria-hidden="true" data-container="body" data-placement="top" data-toggle="tooltip" attr_petiotion_id="'+result[i].petitionId+'" attr_enrorsNo="'+endorsmentNo+'" class="RepresentationDate viewBtnCls tooltipCls" data-original-title="View Petition">'+result[i].raisedDate+'</td>';
						}else{
							str+='<td style="text-align:center;" class="RepresentationDate "> - </td>';
						}
					  }
					  if(EndorsmentNo){
						if(result[i].endorsementNO != null && result[i].endorsementNO != 0){
							str+='<td style="text-align:center;cursor:pointer;" aria-hidden="true" data-container="body" data-placement="top" data-toggle="tooltip"  attr_petiotion_id="'+result[i].petitionId+'" attr_enrorsNo="'+endorsmentNo+'" class="EndorsmentNo viewBtnCls tooltipCls" data-original-title="View Petition">'+result[i].endorsementNO+'</td>';
							endorsmentNo=result[i].endorsementNO;
						}else{
							str+='<td style="text-align:center;" class="EndorsmentNo"> - </td>';
						}
					  }
					  if(EndorsmentDate){
						if(result[i].endorsmentDate != null && result[i].endorsmentDate != ""){
							str+='<td style="text-align:center;" class="EndorsmentDate">'+result[i].endorsmentDate+'</td>';
						}else{
							str+='<td style="text-align:center;" class="EndorsmentDate"> - </td>';
						}
					  }
					  if(RepresenteeType){
						if(result[i].dataType != null && result[i].dataType != ""){
							str+='<td style="text-align:center;" class="RepresenteeType">'+result[i].dataType+'</td>';
						}else{
							str+='<td style="text-align:center;" class="RepresenteeType"> - </td>';
						}
					  }
					  if(RepresenteeName){
						if (myResult[s].name != null && typeof(myResult[s].name) != "undefined"){
							str+='<td style="text-align:center;" class="RepresenteeName">'+myResult[s].name+'</td>';
						}else{
							str+='<td style="text-align:center;" class="RepresenteeName"> - </td>';
						}
					  }
					  if(RepresenteeDesignation){
						if (result[i].representDesig != null && typeof(result[i].representDesig) != "undefined"){
							str+='<td style="text-align:center;" class="RepresenteeDesignation">'+result[i].representDesig+'</td>';
						}else{
							str+='<td style="text-align:center;" class="RepresenteeDesignation"> - </td>';
						}
					/*	if (result[i].referrerName != null && typeof(result[i].referrerName) != "undefined"){
							str+='<td style="text-align:center;" class="ReferrerName">'+result[i].referrerName+'</td>';
						}else{
							str+='<td style="text-align:center;" class="ReferrerName"> - </td>';
						}
						if (result[i].desigName != null && typeof(result[i].desigName) != "undefined"){
							str+='<td style="text-align:center;" class="ReferreerDesignation">'+result[i].desigName+'</td>';
						}else{
							str+='<td style="text-align:center;" class="ReferreerDesignation"> - </td>';
						}*/
						
					  }
					  
					  if(typeof(result[i].addressVO) !='undefined'){
							if(result[i].addressVO.districtName != '')
								str+='<td  style="text-align:center;">'+result[i].addressVO.districtName+'</td>';
							else
								str+='<td  style="text-align:center;"> - </td>';
							if(result[i].addressVO.assemblyName != '')						
								str+='<td  style="text-align:center;">'+result[i].addressVO.assemblyName+'</td>';
							else 
								str+='<td  style="text-align:center;"> - </td>';
							if(result[i].addressVO.tehsilName != '')
								str+='<td  style="text-align:center;">'+result[i].addressVO.tehsilName+'</td>';
							else
								str+='<td  style="text-align:center;"> - </td>';
						}else{
							str+='<td  style="text-align:center;"> - </td>';
							str+='<td  style="text-align:center;"> - </td>';
							str+='<td  style="text-align:center;"> - </td>';
						}
						
					  if(WorkDescription){
						if (result[i].workName != null && result[i].workName != ""){
							//if(result[i].workName !=null && result[i].workName.length>50){
								//str+='<td class="WorkDescription" ><span class="tooltipCls" data-toggle="tooltip" title="'+result[i].workName+'">'+result[i].workName.substring(0,50)+'...</span></td>';
							//}else{
								str+='<td class="WorkDescription" >'+result[i].workName+'</td>';
							//}
							
						}
						else{
							str+='<td style="text-align:center;" class="WorkDescription" > - </td>';
						}
						/* if (result[i].noOfWorks != null && typeof(result[i].noOfWorks) != "undefined")
							str+='<td>'+result[i].noOfWorks+'</td>';
						else
							str+='<td> - </td>'; */
					
						
					  }
					   
					  
					  if(EstimationCost){
						  if (result[i].estimationCost != "" && result[i].estimationCost != "0"){
							var estCost = parseFloat(result[i].estimationCost);
							str+='<td style="text-align:center;" class="EstimationCost">'+estCost.toFixed(2)+'</td>';
						}else{
							str+='<td style="text-align:center;" class="EstimationCost">-</td>';
						}
						/*if (result[i].statusType != "" && typeof(result[i].statusType) != "undefined" ){
							str+='<td style="text-align:center;">'+result[i].statusType+'</td>';
						}else{
							if (result[i].endorsementNO != null && result[i].endorsementNO != 0){
							str+='<td style="text-align:center;"> In Progress </td>';
							}
							else{
								str+='<td style="text-align:center;">-</td>';
							}
						}
						*/
					  }
					  if(noofWorks){
						if (result[i].noOfWorks != null && typeof(result[i].noOfWorks) != "undefined"){
							var filledWorksCount = 0;
							if(result[i].subList != 'undefined' && result[i].subList != null && result[i].subList.length>0) 
								filledWorksCount = result[i].subList.length;
							if(radioTypeVal=="petition"){
								str+='<td class="noofWorks" >';
									str+='<h4 class="viewBtnCls" attr_enrorsNo="'+endorsmentNo+'" attr_petiotion_id="'+result[i].petitionId+'"><span title="Entered works count" data-toggle="tooltip" data-placement="top" style="font-size: 16px;cursor:pointer" class="tooltipCls">'+result[i].noOfWorks+'</span> <!--(<span class="tooltipCls" title="Total works count" data-toggle="tooltip" data-placement="top" style="font-size: 16px;cursor:pointer">'+filledWorksCount+'</span>)--></h4>';
								str+='</td>';
							}
							//str+='<td class="text-center"><i class="viewBtnCls tooltipCls" aria-hidden="true" attr_enrorsNo="'+endorsmentNo+'" attr_petiotion_id="'+result[i].petitionId+'"  style="margin-right: 20px; font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top"  </i> <span title="Entered works count " >'+filledWorksCount+' </span>/ <span title="Total works count " >'+result[i].noOfWorks+' </span> </td>';
						}else{
							str+='<td class="noofWorks" > - </td>';
						}
					  }
					  if(Status){
						if (result[i].petitionStatusId != null && result[i].petitionStatusId == 1){
							str+='<td style="text-align:center;" class="Status"> PENDING ENDORSEMENT </td>';
						}else if (result[i].petitionStatusId != null && result[i].petitionStatusId == 2){
							str+='<td style="text-align:center;" class="Status"> IN-PROGRESS </td>';
						}else if (result[i].petitionStatusId != null && result[i].petitionStatusId == 8){
							str+='<td style="text-align:center;" class="Status"> COMPLETED </td>';
						}
						else{
							str+='<td style="text-align:center;" class="Status">-</td>';
						}
					  }
					 
					  if(Department){
						if (result[i].deptName != null && result[i].deptName != ""){
							str+='<td style="text-align:center;" class="Department ">'+result[i].deptName+'</td>';
						}else{
							str+='<td style="text-align:center;" class="Department ">-</td>';
						}
					  }
					  if(Subject){
						
						if(result[i].subjectName != null && result[i].subjectName != ""){
							str+='<td style="text-align:center;" class="Subject ">'+result[i].subjectName+'</td>';
						}else{
							str+='<td style="text-align:center;" class="Subject "> - </td>';
						}
					  }
					  if(SubSubject){
						if(result[i].subSubjectname != null && result[i].subSubjectname != ""){
							str+='<td style="text-align:center;" class="SubSubject ">'+result[i].subSubjectname+'</td>';
						}else{
							str+='<td style="text-align:center;" class="SubSubject "> - </td>';
						}
					  }
					  if(GrantName){
						if(result[i].grantName != null && result[i].grantName != ""){
							str+='<td style="text-align:center;" class="GrantName ">'+result[i].grantName+'</td>';
						}else{
							str+='<td style="text-align:center;" class="GrantName "> - </td>';
						}
					  }
					  if(WorkType){
						if(result[i].workType != null && result[i].workType != ""){
							str+='<td style="text-align:center;" class="WorkType ">'+result[i].workType+'</td>';
						}else{
							str+='<td style="text-align:center;" class="WorkType "> - </td>';
						}
					  }
					  if(LeadName){
						
						if (result[i].leadName != null && result[i].leadName != ""){
							str+='<td style="text-align:center;" class="LeadName ">'+result[i].leadName+'</td>';
						}else{
							str+='<td style="text-align:center;" class="LeadName ">-</td>';
						}
					  }
						if(HasReprRefDocs){
						if(result[i].hasRepRefDocs != null && result[i].hasRepRefDocs.length>0){
							//str+='<td style="text-align:center;" class="HasReprRefDocs "><h5><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i></h5></td>';
							str+='<td style="text-align:center;" class="HasReprRefDocs "> YES </td>';
						}else{
							str+='<td style="text-align:center;" class="HasReprRefDocs "> - </td>';
						}
					  }
					  if(HasWorkCopy){
						
						/////////
						if(result[i].hasWorkDocs != null && result[i].hasWorkDocs.length>0){
							//str+='<td style="text-align:center;" class="HasWorkCopy "><h5><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i></h5></td>';
							str+='<td style="text-align:center;" class="HasWorkCopy "> YES </td>';
						}else{
							str+='<td style="text-align:center;" class="HasWorkCopy "> - </td>';
						}
					  }
					  if(HasCoveringLtr){
						if(result[i].hasCoverLtr != null && result[i].hasCoverLtr.length>0){
							//str+='<td style="text-align:center;" class="HasCoveringLtr "><h5><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i></h5></td>';
							str+='<td style="text-align:center;" class="HasCoveringLtr "> YES </td>';
						}else{
							str+='<td style="text-align:center;" class="HasCoveringLtr "> - </td>';
						}
					  }
					  if(HasActionCopy){
						if(result[i].hasActionCopy != null && result[i].hasActionCopy.length>0){
							//str+='<td style="text-align:center;" class="HasActionCopy "><h5><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i></h5></td>';
							str+='<td style="text-align:center;" class="HasActionCopy "> YES </td>';
						}else{
							str+='<td style="text-align:center;" class="HasActionCopy "> - </td>';
						}
					  }
					  if(HasDetailedReport){
						if(result[i].hasDetailedReport != null && result[i].hasDetailedReport.length>0){
							//str+='<td style="text-align:center;" class="HasDetailedReport "><h5><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i></h5></td>';
							str+='<td style="text-align:center;" class="HasDetailedReport "> YES </td>';
						}else{
							str+='<td style="text-align:center;" class="HasDetailedReport "> - </td>';
						}
					  }
					  if(HasFinalCopy){
						if(result[i].hasFinalCopy != null && result[i].hasFinalCopy.length>0){
							//str+='<td style="text-align:center;" class="HasFinalCopy "><h5><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i></h5></td>';
							str+='<td style="text-align:center;" class="HasFinalCopy "> YES </td>';
						}else{
							str+='<td style="text-align:center;" class="HasFinalCopy "> - </td>';
						}
					  }
					  if(HasOthersCopy){
						if(result[i].hasOthersCopy != null && result[i].hasOthersCopy.length>0){
							//str+='<td style="text-align:center;" class="HasOthersCopy "><h5><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i></h5></td>';
							str+='<td style="text-align:center;" class="HasOthersCopy "> YES </td>';
						}else{
							str+='<td style="text-align:center;" class="HasOthersCopy "> - </td>';
						}
					  }
					  if(WithWhome){
						
						////
						if(result[i].officerName != null && result[i].officerName != ""){
							str+='<td style="text-align:center;" class="WithWhome ">'+result[i].officerName+'</td>';
						}else{
							str+='<td style="text-align:center;" class="WithWhome "> - </td>';
						}
					  }
					  if(LastUpdatedTime){
						if(result[i].lastUpdatedTime != null && result[i].lastUpdatedTime != ""){
							str+='<td style="text-align:center;" class="LastUpdatedTime ">'+result[i].lastUpdatedTime+'</td>';
						}else{
							str+='<td style="text-align:center;" class="LastUpdatedTime "> - </td>';
						}
					  }
					  
							str+='<td class="text-center"><i class="fa fa-eye viewBtnCls tooltipCls" aria-hidden="true" attr_enrorsNo="'+endorsmentNo+'" attr_petiotion_id="'+result[i].petitionId+'"  style="margin-right: 20px; font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="View Petition"> </i>';
							
							var alreadyGiven=false;
							if(endorsmentNo == null || endorsmentNo.length == 0){
								 alreadyGiven=true;
								str+='<a href="'+wurl+'/representationRequestEdit?petitionId='+result[i].petitionId+'" target="_blank"><i class="tooltipCls fa fa-pencil-square-o" aria-hidden="true" style="font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="Edit Petition"></i></a>';
							}
							
							if(parseInt(endorsmentNo) == 2630 || parseInt(endorsmentNo) == 2585){
								 alreadyGiven=true;
								str+='<a href="'+wurl+'/representationRequestEdit?petitionId='+result[i].petitionId+'" target="_blank"><i class="tooltipCls fa fa-pencil-square-o" aria-hidden="true" style="font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="Edit Petition"></i></a>';
							}
							//if(!alreadyGiven && (userId == 25 || userId == 26 || userId == 27 || userId == 28)){
							//	str+='<a href="'+wurl+'/representationRequestEdit?petitionId='+result[i].petitionId+'" target="_blank"><i class="tooltipCls fa fa-pencil-square-o" aria-hidden="true" style="font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="Edit Petition"></i></a>';
							//}
							
						//24 - userId - admin_user
						//if(userId == 24){
							//str+='<a href="'+wurl+'/representationRequestEdit?petitionId='+result[i].petitionId+'" target="_blank"><i class="tooltipCls fa fa-pencil-square-o" aria-hidden="true" style="font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="Edit Petition"></i></a>';
						/*}else{
							if(result[i].subList[j].statusType == 'Pending Endorsement' || result[i].subList[j].statusId == 1) 
								str+='<a href="'+wurl+'/representationRequestEdit?petitionId='+result[i].petitionId+'" target="_blank"><i class="tooltipCls fa fa-pencil-square-o" aria-hidden="true" style="font-size: 16px;cursor:pointer" data-toggle="tooltip" data-placement="top" title="Edit Petition"></i></a>';
						}
						*/
						str+='</td>';						
					str+='</tr>';
					}
				}
				str+='</tbody>';
			str+='</table>';
			//if($(window).width>800){
				str+='</div>';
			//}
			
			if(globalStIndex == 0 && countByDate > 10){
				//setTimeout(5000);
				$(".paginationId").pagination({
					items: countByDate,
					itemsOnPage: 100,
					cssStyle: 'light-theme',
					hrefTextPrefix: '#pages-',
					onPageClick: function(pageNumber) { 
						var num=(pageNumber-1)*100;
						$(".petitionSubWorkRadoCls").each(function(){
							if($(this).is(":checked")){
								var typeVal =  $(this).attr("attr_type");
									//alert(typeVal);
									if(typeVal == "subWork"){
										$("#representationRequestEntryTable").html('');
										$("#petitionId").prop("checked",false);
										getRepresentativeSearchDetails1(typeVal,num,reportType);
										$("#petitionSubWorkRadioDivId").show();
									}else if(typeVal == "petition"){
										$("#workId").prop("checked",false);
										$("#representationRequestEntryTable").html('');
										getRepresentativeSearchDetails1(typeVal,num,reportType);
										$("#petitionSubWorkRadioDivId").show();
									}
								}
							});
					}
					
				});
			}
				str+='</div>';
			
		}else{
			$(".paginationId").html("");
						
			str+='<div class="col-sm-12" style="text-align:center;"> <h4> No Data Available </h4> </div>';
		}
			str+='</div>';
		str+='</div>';	
	str+='</div>';
	$("#representationRequestEntryTable").html(str);
	$(".tooltipCls").tooltip();
	 $("#workDetailsTab").dataTable({
		"paging":   true,
		"info":     false,
		"searching": true,
		"autoWidth": true,
		//"sDom": '<"top"iflp>rt<"bottom"><"clear">',
		/*"iDisplayLength": 500,
		"aaSorting": [[ 0, "desc" ]],
		"aLengthMenu": [[500,200,100 -1], [ 500,200,100, "All"]],
		*/
		"iDisplayLength": 100,
		"aaSorting": [],
		"aLengthMenu": [[10,50, 100, 500, -1], [10,50, 100, 500, "All"]],
		
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
				{
					//extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o" reportType="excel" id="advanceExcelId"  title="Excel"></i><span id="excelLoadingId"></span>'
					//titleAttr: 'CSV'
					//exportOptions: {
					//	columns: ':visible'
					//}
				}
			]
	}); 
	 var Collength = $(".line_heightCls li").length;
	if(Collength>8){
		$(".scrollTableColCls").mCustomScrollbar({setHeight:'400px'});
	}
	$('#workDetailsTab_paginate').hide();
  }
  $(document).on("click",".petitionModelClose",function(){
	setTimeout(function(){
	 $('body').addClass("modal-open");
	}, 500);
	});
$(document).on("click",".uploadFuncCls",function(){
	$("#statusChangeId").val('0');
	$('#nextStatusId').val("");
	//$("#statusChangeId").trigger("chosen:updated");
	$('.uploadFuncCls').not(this).removeAttr('checked');
	$("#coverLetterPath").val('');
	$("#coveringLetterGenerator").html(""); 
				 $("#remarkIdErr").html("");
				 $("#ajaxcallImageId").html("");
				 $("#fileUploadIdDiv").hide();//uploadFileDivCls
				$("#fileUploadDiv").hide();
				$("#commentsDivId").show();
				$("#leadDivId").hide();
				$("#grantDivId").hide();
				$("#assignOfficerDivId").hide();
				$("#assignDesignationDivId").hide();
				$("#endorsementDivId").hide();
				
				$("#endorsmentNo").val('');
				$("#remarksId").val('');
				$("#leadId").html('');
				$("#leadId").html('<option value="0"> SELECT LEAD </option>');
				$("#leadId").trigger("chosen:updated");
				$("#grantId").html('');
				$("#grantId").html('<option value="0">SELECT GRANT UNDER</option>');
				$("#grantId").trigger("chosen:updated");
				$("#assignToId").html('<option value ="0">SELECT DEPARTMENT</option>');
				$("#officerId").html('<option value ="0">SELECT OFFICER </option>');
				$("#finalapproveFile").html('');
				$("#statusChangeDivId").show();
	if($(this).is(":checked")){
		$("#uploadCoverFileDivCls").show();
		$("#uploadCoverFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadCoveringDocId" class="m_top10"/>');
			initializeSingleUploadDocument("uploadCoveringDocId");
		//$("#endorseFunctionDivId").hide();
	}else{
		//$("#endorseFunctionDivId").show();
		$("#uploadCoverFileDivCls").hide();
	}
	
	/* if($(this).val() == "endorse"){
		alert($(this).val())
		$("#endorseFunctionDivId").show();
		$("#uploadCoverFileDivCls").hide();
	}else{
		alert($(this).val());
		$("#uploadCoverFileDivCls").show();
		$("#uploadCoverFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadCoveringDocId" class="m_top10"/>');
			initializeSingleUploadDocument("uploadCoveringDocId");
		$("#endorseFunctionDivId").hide();
	} */
	});
	 $(document).on("click",".getColumnAllCls",function(){
		
		var chekedVal = $(this).val();
		if(chekedVal == "selectAll"){
			if($(this).is(":checked")){
				$(".getColumnCls").prop("checked",true);
			}else{
				$(".getColumnCls").prop("checked",false);
			}
			
			
		}
	});
	$(document).on("click",".selectedColumnsTableCls",function(){
		$(".menuCls-table").hide();
		var allColumnArr= ["RepresentationDate", "EndorsmentNo", "EndorsmentDate", "RepresenteeType", "RepresenteeName", "RepresenteeDesignation", "ReferrerName", "ReferreerDesignation", "WorkDescription", "EstimationCost",  "noofWorks","Status", "Department", "LeadName", "Subject", "SubSubject", "GrantName", "WorkType", "HasCoveringLtr", "HasActionCopy", "HasDetailedReport", "HasFinalCopy", "HasOthersCopy", "HasWorkCopy", "WithWhome", "LastUpdatedTime"];
		for(var i in allColumnArr){
			$("."+allColumnArr[i]).hide();
		}
		/*
		allCheckedColumnsArr=[];
		$(".getColumnCls").each(function(){
			if($(this).is(":checked")){
				allCheckedColumnsArr.push($(this).val());
			}	
		}); 
		for(var i in allCheckedColumnsArr){
			$("."+allCheckedColumnsArr[i]).show();
		}
		console.log(allCheckedColumnsArr);*/
		$('#advanceSearchId').trigger('click');
		
	});	
/* $(document).click(function() {
    $(".menuCls-table").hide();
}); */

$(document).on("click",".petitionsSelectedAllCls",function(){
	if($(this).is(":checked")){
		$(".petitionStatusUpdateCls").prop("checked",true);
	}else{
		$(".petitionStatusUpdateCls").prop("checked",false);
	}
});


$(document).on("click",".petitionStatusUpdateCls",function(){
	var notSelectedCount=0;
	$(".petitionsSelectedAllCls").prop("checked",false);
	$('.petitionStatusUpdateCls').each(function(){
		if($(this).is(":checked")){
			;
		}else{
			notSelectedCount=parseInt(notSelectedCount)+1;
		}
	});
	if(parseInt(notSelectedCount)==0)
		$(".petitionsSelectedAllCls").prop("checked",true);
});

$(document).on("click",".addRemoveModel",function(){
	if(glDesignationId == 23)
		$('#updatStatusChangeId').show();
	else
		$('#updatStatusChangeId').hide();
});
$(document).on("click","#updatStatusChangeId",function(){
	//$('#updatStatusChangeId').hide();
	
	selectdWorksArr=[];
	departmentSelectArr=[];
	$(".petitionStatusUpdateCls").each(function(){
		if($(this).is(":checked")){
			var value=$(this).val();
			if(parseInt(value)>0)
				selectdWorksArr.push(value);
		}
	});
	
	if(selectdWorksArr.length == 0){
		alert("Please select atleast one work to update.");
		return ;
	}
	
	selectionType ="all";
	    $("#endorseDivId").hide();
	    $('#uploadFileDivCls').hide();
		$('#actionmemoDivId').hide();
		$('#detaildReportReviewFiledsDivId').hide();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		 $("#actioncopyRefId").val(""); 
		 $("#uploadFile").html(""); 
		 $("#coveringLetterGenerator").html(""); 
		 $("#remarkIdErr").html("");
		 $("#ajaxcallImageId").html("");
		 $("#fileUploadIdDiv").hide();//uploadFileDivCls
	var totalWorks = $(this).attr("attr_total_works");
	
	
	$("#fileUploadDiv").hide();
	$("#commentsDivId").show();
	$("#leadDivId").hide();
	$("#grantDivId").hide();
	$("#assignOfficerDivId").hide();
	$("#assignDesignationDivId").hide();
	$("#endorsementDivId").hide();
	$(".uploadFuncCls").prop("checked",false);
	$("#endorsmentNo").val('');
	$("#remarksId").val('');
	$("#leadId").html('');
	$("#leadId").html('<option value="0"> SELECT LEAD </option>');
	$("#leadId").trigger("chosen:updated");
	$("#grantId").html('');
	$("#grantId").html('<option value="0">SELECT GRANT UNDER</option>');
	$("#grantId").trigger("chosen:updated");
    $("#assignToId").html('<option value ="0">SELECT DEPARTMENT</option>');
	$("#officerId").html('<option value ="0">SELECT OFFICER </option>');
	$("#finalapproveFile").html('');
	$("#statusChangeDivId").show();

	$('.addRemoveModel').removeClass('closeSecondModal');
	$('#endorsWorksId').html("Save Details");
	var notSeleWorks = totalWorks - selectdWorksArr.length;
	//alert(globalActionName);
	$("#statusChangeId").html('');
	$("#statusChangeId").append('<option attr_next_status_id="0" value="0"> SELECT ACTION </option>');
	
	$("#statusChangeId").append('<option attr_next_status_id="7" value="7"> DETAILED REPORT </option>');
	$("#statusChangeId").append('<option attr_next_status_id="10" value="10"> DETAILED REPORT WITH ESTIMATION </option>');
	$("#statusChangeId").append('<option attr_next_status_id="11" value="11"> PUT-UP FILE </option>');
	$("#statusChangeId").append('<option attr_next_status_id="13" value="13"> EXAMINE & TAKE NECESSARY ACTION </option>');
	$("#statusChangeId").append('<option attr_next_status_id="12" value="12"> OTHERS </option>');
	
	
	$("#statusChangeId").chosen();
	$("#statusChangeId").trigger('chosen:updated');
	
	$("#endorseMentModalDivId").modal("show");
	
//	$("#totalWorksId").html(totalWorks)
//	$("#selectdWorksId").html(selectdWorksArr.length)
//	$("#notSeleWorksId").html(notSeleWorks)
	//ara
	//getPetitionDetailsBuildImages();
	
	
});	

$(document).on("change","#leadId",function(){
	var leadSelectedId = $(this).val();
	$('#leadOtherDivId').hide();
	$('#leadOtherId').val('');
	$('#leadOtherId').html('');
	//alert(leadSelectedId);
	if(leadSelectedId != null && parseInt(leadSelectedId)>0 && (leadSelectedId == 37 || leadSelectedId == 38) ){
		$('#leadOtherDivId').show();
	}
});

function getChildOfficersByParentOfficerId(searchType,selBoxId,officerId,statusId){
	var selStatusId = $("#statusId").val();
	$("#"+selBoxId).empty();
	//alert(statusId)
	 var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}else if(statusId >0){
		var statusList = statusId.split(',');
		for(var i=0;i<statusList.length-1;i++){
			statusIds.push(statusList[i]);
		}
	}
	var officerIds =[];
	var selOffcrId = $("#pmOfficerId").val();
	if(selOffcrId != null && selOffcrId.length >0){
		var statusList = statusId.split(',');
		officerIds =statusList;
	} else if(officerId >0){
		var officerList = officerId.split(',');
		for(var i=0;i<officerList.length-1;i++){
			officerIds.push(officerList[i]);
		}
	}
	var deptIds =  $("#departmntId").val();
	var deptIdsList = [];
	if(deptIds != null && deptIds.length >0){
		deptIdsList=deptIds;
	}else if(deptId.length >0){
		var deptList = deptId.split(',');
		for(var i=0;i<=deptList.length-1;i++){
			deptIdsList.push(deptList[i]);
		}
	} 
if(deptIdsList != null && deptIdsList.length>0){
	for(var i in deptIdsList){
		if(parseInt(deptIdsList[i])==0){
			deptIdsList=[];
		}
	}
}

 var json = {
		 reportType :searchType,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 statusIds:statusIds,
		 searchLvlVals:officerIds,
		 deptIdsList:deptIdsList
		}           
	$.ajax({              
		type:'POST',    
		url: 'getChildOfficersByParentOfficerId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 
		if(result !=null && result.length >0){
			//$("#"+selBoxId).html("<option value='0'>Select Department</option>");
			//$("#subjectDivId").show();
			for(var i in result){
				if(gblOfficerId != null && gblOfficerId==result[i].key){
					$("#"+selBoxId).append("<option value='"+result[i].key+"' selected>"+result[i].value+"</option>");
				}else{
					if(result[i].key !=230 && result[i].key !=398 && result[i].key !=381)
						$("#"+selBoxId).append("<option value='"+result[i].key+"' >"+result[i].value+"</option>");
					else if(glDesignationId == 2 && (result[i].key ==230 || result[i].key ==398 || result[i].key ==381))
						$("#"+selBoxId).append("<option value='"+result[i].key+"' >"+result[i].value+"</option>");
					else if(glDesignationId == 23 && result[i].key ==398 )
						$("#"+selBoxId).append("<option value='"+result[i].key+"' >"+result[i].value+"</option>");
					else if(glDesignationId == 23 && result[i].key ==381 )
						$("#"+selBoxId).append("<option value='"+result[i].key+"' >"+result[i].value+"</option>");
				}
			}
		}
		$("#"+selBoxId).trigger('chosen:updated');
		if(searchBy == 'officer' && gblOfficerId >0){
			getRepresentativeSearchDetails1("petition",0,"");
		}  
	});	
}

$(document).on("click","#advanceSearchBtnId",function(){
	
	if($('#advanceSearchBtnId').prop( "checked")){
		var searchType=$("#locationSelId").val();
		var dateRangeStr =$("#dateRangePicker").val();
		getDistrictBySearchType(searchType,'districtCandId',dateRangeStr);
	}
});
