<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title> PETITION WORKS PRIORITY UPDATION </title>
<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css"/>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<link rel="stylesheet" type="text/css" href="Assests/Plugins/pdfexpand_prrws/source/jquery.fancybox.css" media="screen" />
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<!--<link href="Assests/Plugins/sliderbar/bootstrap-slider.css" rel="stylesheet" type="text/css"/>-->
<script src="https://use.fontawesome.com/07d3416f74.js"></script>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/print.css" rel="stylesheet" type="text/css"/>
 <link rel="stylesheet" type="text/css" href="Assests/SimplePagination/simplePagination.css"/>
 <style>
	
	
 </style>
</head>
<body>
<header style="box-shadow:none;" class="dispalyNone">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3">
					<img src="Assests/images/aplogo.png" class="" style="width: 80px; height: 80px; padding: 10px;"/>
				</div>
				<div class="col-sm-4 m_top10 col-xs-9">
					<h3 class="text-capital"><span style="color: rgb(255, 255, 255); font-weight: bold; margin-right: 7px;font-size: 20px;">MINISTER</span> <span class="text-color">PETITION MANAGEMENT SYSTEM</span></h3>
					<p style="color: rgb(255, 255, 255);">Information Technology,Panchayathi Raj,Rural Water Supply & </p>
					<p style="color: rgb(255, 255, 255);">Rural Development</p>
				</div>
				<div class="col-sm-5 col-xs-12 pull-right innerPageHeader">
					<i class="glyphicon glyphicon-th menu-cls pull-right" style="position:relative;color:#AA8440"></i>
					<div class="menuCls">
						<div class="arrow_box_top">
							<div class="row">
								<div style="padding:10px;">
									<!--<div class="col-sm-5">
										<h4 style="border-radius: 5px; background-color: rgb(51, 51, 51); padding: 6px;"><a href="representationRequestEntry" style="color: rgb(255, 255, 255) ! important; font-size: 14px;">ADD PETITION</a></h4>
									</div>
									<div class="col-sm-6">
										<h4 style="border-radius: 5px; background-color: rgb(51, 51, 51); padding: 6px;" ><a href="representationRequestEntryViewMembers" style="color: rgb(255, 255, 255) ! important; font-size: 14px;">VIEW PETITION</a></h4>
									</div>-->
								</div>
								<div id="menuId"></div>
							</div>
							<!--<div class="row">
								<div style="padding:10px;">
								<div class="col-sm-5">
										<h4 style="border-radius: 5px; background-color: rgb(51, 51, 51); padding: 6px;"><a href="representationsDashboard" style="color: rgb(255, 255, 255) ! important; font-size: 14px;">DASHBOARD</a></h4>
									</div>
								</div>
							</div>-->
							<div class="row">
								<div style="padding:10px;">
								<div class="col-sm-12">
									<a class="btn btn-primary btnSearch m_top5 pull-right" href="petitionsLogout" style="display:inline-block" style="cursor:pointer;"><i class="fa fa-sign-out" style="color:#FFBA00;"></i>&nbsp;&nbsp;Sign-out</a>
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</nav>
<%@ page import="com.itgrids.dto.UserVO" %>
<% 
	UserVO userVo=(UserVO)session.getAttribute("User");
out.println("<h4 class='pull-right' style='margin:6px 10px; color:green;'>&nbsp;&nbsp; "+userVo.getUserName()+"</h4>");   
%>
</header>
<main>
		<div class="container-fluid">
			<div class="row dispalyNone">
				<div class="col-sm-12">	
					<div class="col-sm-3 pull-right">
						<div class="input-group inline-block">
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar clearDataCls" aria-hidden="true"></span>
							</span>
							<input type="text"  class="form-control" id="dateRangePickerId"/>
						</div>
					</div>
					
				</div>
			</div>
			<div class="white-block petition_block dispalyNone">
				<div class="row">
					<div class="col-sm-3 " id="deptsDivId">
						<label>DEPARTMENT</label>
						<select class="form-control chosen-select"  data-placeholder="SELECT DEPARTMENT"  id="departmntId1" multiple>
						</select>
					</div>
					<div class="col-sm-3">
						<label>STATUS</label>
						<select class="chosen-select form-control " id="statusLocId1" data-placeholder="All" multiple>
							<!--<option value="0">All</option>-->
						</select>
					</div>
					<div class="col-sm-3">
						<label>SUBJECT</label>
						<select class="chosen-select form-control" id="subjectId1" data-placeholder="All" multiple>
							<!--<option value="0">All</option>-->
						</select>
					</div>
					<div class="col-sm-3">
						<label>SUB SUBJECT</label>
						<select class="chosen-select form-control" id="SubSubjectId" data-placeholder="All" multiple>
							<!--<option value="0">All</option>-->
						</select>
					</div>
				</div>
				<div class="row m_top20">
					<div class="col-sm-3" id="districtCandDiv">
						<label>DISTRICT</label>
						<select class="form-control chosen-select clearDataCls" data-placeholder="SELECT DISTRICT " id="districtCandId1" multiple>
							<!--<option value="0">All</option>-->
						</select>
						<!--<div class="error_colorCls" id="districtCandErrDiv"></div>-->
					</div>
					<div class="col-sm-3" id="constituencyCanDiv">
						<label>CONSTITUENCY</label>
						<select class="form-control chosen-select clearDataCls"  data-placeholder="SELECT CONSTITUENCY "  id="constituencyCanId1" multiple>
							<!--<option value="0">All</option>-->
						</select>
						<!--<div class="error_colorCls" id="constituencyCanErrDiv"></div>-->
					</div>
					<div class="col-sm-3">
						<input type="button"  class="btn btn-success btn-mini btn-sm m_top20" onclick="getPetitionsDetails();" value="GET DETAILs" />
					</div>
				</div>
			</div>

			<div id="printableArea"  class="displayBlock">
				<div class="white-block pad_10" id="printcontent">
					<div id="pdfWiswPetitionsView" ></div>
				</div>
			</div>
			
		</div>
		</section>
</main>

<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/login/loginMenu.js"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<!--<script src="Assests/Plugins/sliderbar/bootstrap-slider.js" type="text/javascript"></script>-->
<script src="Assests/SimplePagination/simplePagination3.js" type="text/javascript"></script>

<!--<script src="Assests/ruralWaterSupply/custom.js" type="text/javascript"></script>-->
<script src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js" type="text/javascript"></script>
<!-- for file uploader -->
<script type="text/javascript" src="Assests/Plugins/pdfexpand_prrws/source/jquery.fancybox.js"></script>
<!--<script src="Assests/representationRequest/representationsDashboard.js" type="text/javascript"></script>-->
<script type="text/javascript">
$(".chosen-select").chosen();
var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var currentToDate = "";
var currentFromDate="";
	currentFromDate=moment().subtract(7, 'year').format("DD-MM-YYYY");
	currentToDate=moment().add(38,"year").format("DD-MM-YYYY");

//$("#dateRangePickerId").val('All');
$("#dateRangePickerId").daterangepicker({
		opens: 'left',
		startDate: currentFromDate,
		endDate: currentToDate,
		locale: {
		  format: 'DD-MM-YYYY'
		},
		ranges: {
		   'All':[moment().subtract(7,"year").format("DD-MM-YYYY"), moment().add(38,"year").format("DD-MM-YYYY")],
		   'Today' : [moment(), moment()],
		   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		   'This Month': [moment().startOf('month'), moment()],
		   'This Year': [moment().startOf('Year'), moment()],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		   'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
		   
		}
	});
	$('#dateRangePickerId').on('apply.daterangepicker', function(ev, picker) {
		currentFromDate = picker.startDate.format('DD-MM-YYYY');
		currentToDate = picker.endDate.format('DD-MM-YYYY');
		if(picker.chosenLabel == 'All')
		{
			$("#dateRangePickerId").val('All');
		}
		$("#pdfWiswPetitionsView").html('');
		locationlevels();
		onloadcalls();
		
		
	});
	
	function locationlevels(){
	$("#subjectId1").html('<option value ="0">Select Subject</option>');
	$("#subjectId1").trigger('chosen:updated');
	
	$("#SubSubjectId").html('<option value ="0">Select Sub Subject</option>');
	$("#SubSubjectId").trigger('chosen:updated');
	
	$("#districtCandId1").html('<option value ="0">Select District</option>');
	$("#districtCandId1").trigger('chosen:updated');
	
	$("#constituencyCanId1").html('<option value ="0">Select Constituency</option>');
	$("#constituencyCanId1").trigger('chosen:updated');
	}

onloadcalls();
function onloadcalls()
{
	//$("#constituencyCanId1").chosen();
	//getConstituenciesBySearchTypeAndDistrict([]);
	getDepartmntsDetails();
	getStatusList();
	getSubjectsBySearchType();
	getSubSubjectsBySubjectId();
	getDistrictBySearchTypeInsubject();
	getConstituencyBySearchTypeAndDistrictIdInSubSubject();
	
}

function getDepartmntsDetails(){
 var json = {
		 reportType :"department",
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 departmentId:0,
		 statusId:""
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
		
		$("#departmntId1").empty();
		if(result != null && result.length >0){
			$("#departmntId1").append("<option value='0' selected> ALL </option>");
		if(result !=null && result.length >0){
			for(var i in result)
				$("#departmntId1").append("<option value='"+result[i].key+"' >"+result[i].value+"</option>");
			
		}
	}
		$("#departmntId1").trigger('chosen:updated');
	});	 
}




function getStatusList(){
	$("#statusLocId1").html('');
	var selStatusId = $("#statusLocId1").val();
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
		if(result !=null && result.length >0){
			//$("#statusLocId").html("<option value='0' selected>All Status</option>");
			for(var i in result){
				$("#statusLocId1").append("<option value='"+result[i].id+"'>"+result[i].name+"</option>");
			}
		}
		//$("#statusLocId1").chosen();
		$("#statusLocId1").trigger('chosen:updated');
  }); 
}


$(document).on('change','#departmntId1',function(){
	var deptIdsLst =[];
	$("#subjectId1").html('<option value ="0">Select Subject</option>');
	$("#subjectId1").trigger('chosen:updated');
	
	$("#SubSubjectId").html('<option value ="0">Select Sub Subject</option>');
	$("#SubSubjectId").trigger('chosen:updated');
	
	$("#districtCandId1").html('<option value ="0">Select District</option>');
	$("#districtCandId1").trigger('chosen:updated');
	
	$("#constituencyCanId1").html('<option value ="0">Select Constituency</option>');
	$("#constituencyCanId1").trigger('chosen:updated');
	
	
		var depts =$("#departmntId1").val();
		 if(depts != null && depts.length >0){
			deptIdsLst=depts;
		 }
		 
		 if(depts != null && depts.length>0){
			 for(var i in depts){
				 if(parseInt(depts[i])==0){
				 deptIdsLst=[];
				 }
			 }
		 }
		 
	//var departmentId = $("#departmntId1").val();
	
	getSubjectsBySearchType(deptIdsLst);
	getSubSubjectsBySubjectId(deptIdsLst);
	getDistrictBySearchTypeInsubject(deptIdsLst);
	getConstituencyBySearchTypeAndDistrictIdInSubSubject(deptIdsLst);
	
	
})
function getSubjectsBySearchType(deptIdsLst){
	$("#statusLocId").html("");
	$("#statusLocId").html("<option value='0' > All  </option>");
	$("#subjectId1").html('');
		
	var selStatusId = $("#statusLocId1").val();
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}
	var json = {
		 reportType :'subject',
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 statusIds:statusIds,
		 assetType:"0",
		 deptIdsList :deptIdsLst
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
		$("#statusLocId").html("");
		 if(result !=null && result.length >0){
			 $("#subjectId1").html("<option value='0' > All </option>");
			for(var i in result){
				$("#subjectId1").append("<option value='"+result[i].key+"'>"+result[i].value+"</option>");
			}
		}
		$("#subjectId1").trigger('chosen:updated');
		
	});	
}

$(document).on('change','#subjectId1',function(){
	var subjectIdLst =[];
	var subjectId =$("#subjectId1").val();
		 if(subjectId != null && subjectId.length>0){
				subjectIdLst=subjectId;
		 }
		 if(subjectId != null && subjectId.length>0){
			 for(var i in subjectId){
				 if(parseInt(subjectId[i])==0){
					subjectIdLst=[];
				 }
			 }
		 }
	
	getSubSubjectsBySubjectId(subjectIdLst);
	getDistrictBySearchTypeInsubject(subjectIdLst);
	getConstituencyBySearchTypeAndDistrictIdInSubSubject(subjectIdLst);
});
function getSubSubjectsBySubjectId(subjectIdLst){
	$("#statusLocId").html("");
	 $("#SubSubjectId").html("");
	//$("#statusLocId").html("<option value='0' selected> All  </option>");

		var deptIdsLst =[];
		var subjectIds = [];
		var subSubjectIds=[];
		var selStatusId = $("#statusLocId1").val();
	var statusIds = [];
	if(selStatusId != null && selStatusId.length >0){
		statusIds=selStatusId;
	}
	
	 var depts =$("#departmntId1").val();
		 if(depts != null && depts.length>0){
			deptIdsLst=depts;
		 }
	 if(depts != null && depts.length>0){
		 for(var i in depts){
			 if(parseInt(depts[i])==0){
			 deptIdsLst=[];
			 }
		  }
	  }
	  var subjctidVal = $("#subjectId1").val();
	if(subjctidVal != null && subjctidVal.length>0){
		subjectIds=subjctidVal;
	}
	if(subjctidVal != null && subjctidVal.length>0){
		for(var i in subjctidVal){
			if(parseInt(subjctidVal[i])==0){
				subjectIds=[];
			}
		}
	}
	
	var subSubjectIdVal = $("#SubSubjectId").val();
	if(subSubjectIdVal != null && subSubjectIdVal.length>0){
		subSubjectIds = subSubjectIdVal;
	}
	
	if(subSubjectIdVal != null && subSubjectIdVal.length >0){
		for(var i in subSubjectIdVal){
			if(parseInt(subSubjectIdVal[i])==0){
				subSubjectIds=[];
			}
		}
	}
	
	var json = {
		 reportType :'subSubject',
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 statusIds:statusIds,
		 assetType:"0",
		 deptIdsList :deptIdsLst,
		 subjectIdsLst : subjectIds,
		 subSubjectIdsLst : subSubjectIds
		}           
	$.ajax({              
		type:'POST',    
		url: 'getSubSubjectsBySubjectId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#statusLocId").html("");
		 if(result !=null && result.length >0){
			 $("#SubSubjectId").html("<option value='0'> All </option>");
			for(var i in result){
				$("#SubSubjectId").append("<option value='"+result[i].key+"'>"+result[i].value+"</option>");
			}
		}

		$("#SubSubjectId").trigger('chosen:updated');
	});	
}

$(document).on('change','#SubSubjectId',function(){
	var subSubjectIdLst =[];
	var subSubjectId = $("#SubSubjectId").val();
		 if(subSubjectId != null && subSubjectId.length>0){
		 subSubjectIdLst=subSubjectId;
		 }
		 if(subSubjectId != null && subSubjectId.length>0){
			 for(var i in subSubjectId){
				 if(parseInt(subSubjectId[i])==0){
				 subSubjectIdLst=[];
				 }
			 }
		 }
	getDistrictBySearchTypeInsubject(subSubjectIdLst);
	getConstituencyBySearchTypeAndDistrictIdInSubSubject(subSubjectIdLst)
});

var statusIds = [];
function getPetitionsDetails(){
	
	var locationId;
	var districtName;
	var constituencyName;
	var assemblyName;
	var locationIDsArr =[];
	var districtIdArr = [];
	var selStatusId = $("#statusLocId1").val();
	
	var districtIdVal = $("#districtCandId1").val();
	
	if(districtIdVal != null && districtIdVal.length >0){
		districtIdArr = districtIdVal;
	}
	 
	if(districtIdVal != null && districtIdVal.length >0){
		for(var i in districtIdVal){
			if(parseInt(districtIdVal[i])==0){
				districtIdArr = districtIdVal;
			}
		}
	}
	var constituencyId=$("#constituencyCanId1").val();
	if(constituencyId != null && constituencyId.length > 0){
		locationIDsArr=constituencyId;
	}
		
	if(constituencyId != null && constituencyId.length>0){
		for(var i in constituencyId){
			if(parseInt(constituencyId[i])==0){
				locationIDsArr=[];
			}
		}
	}
	
	var departmentIdMainList =[];
	var deptIds =  $("#departmntId1").val();

	if(deptIds != null && deptIds.length >0){
		departmentIdMainList=deptIds;
	}
	
	if(deptIds != null && deptIds.length>0){
		for(var i in deptIds){
			if(parseInt(deptIds[i])==0){
				departmentIdMainList=[];
			}
		}
	}
	
	var statusArr = [];
	statusIds =$("#statusLocId1").val();
	if(statusIds != null && statusIds.length>0){
		statusArr=statusIds;
	}
	
	if(statusIds != null && statusIds.length>0){
		for(var i in statusIds){
			if(parseInt(statusIds[i])==0){
				statusArr=[];
			}
		}
	}
	
	var subjArr = [];
	var subjIds =$("#subjectId1").val();
	if(subjIds != null && subjIds .length>0){
		subjArr=subjIds;
	}
	
	if(subjIds != null && subjIds.length>0){
		for(var i in subjIds){
			if(parseInt(subjIds[i])==0){
				subjArr=[];
			}
		}
	}
	
	var subSubjectIdVal = $("#SubSubjectId").val();
	var subSubjectIds=[];
	if(subSubjectIdVal != null && subSubjectIdVal.length>0){
		subSubjectIds = subSubjectIdVal;
	}
	
	if(subSubjectIdVal != null && subSubjectIdVal.length >0){
		for(var i in subSubjectIdVal){
			if(parseInt(subSubjectIdVal[i])==0){
				subSubjectIds=[];
			}
		}
	}
	  var json = {
			constituencyIdsList: locationIDsArr, 
			deptIdsList: departmentIdMainList,
			statusIdsList: statusArr,
			subjectIdsList: subjArr,
			subSubjectIdsList: subSubjectIds,
			districtIdsList: districtIdArr,
			fromDate :currentFromDate,
		    endDate : currentToDate
		};
	 $("#pdfWiswPetitionsView").html(spinner);
	  $.ajax({              
		type:'POST',    
		url: 'getPetitionDetailsForPDFDocument',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		}
	  }).done(function(result){
		$('#loadingId'+locationId+'').html('');
		if(result != null){
		  buildPetitionDetailsForPDF(result);
		}
	  });
}


  
  function buildPetitionDetailsForPDF(result){
	var str='';
	str+='<div class="petition_print_heading m_top10">';
		var assemblyName=" KAVALI ";
		var str='';
		str+='<div class="row">';
			str+='<div class="col-sm-12">';
				str+='<button class="btn btn-md btn-success printViewCls pull-right dispalyNone" attr_divId="printableArea">Print</button>';
			str+='</div>';	
		str+='</div>';
		
		str+='<div class="petition_print_heading m_top10">';
			str+='<div class="row">';
				str+='<h4 class="font_weight text-center"> WORK DETAILS </h4>';
			str+='</div>';
		str+='</div>';

		
		str+='<div class="row m_top5">'
					str+='<div class="col-sm-12">'
						str+='<div class="">';
						str+='<table class="table details-overview_petition_print1" id="worksDetailsTab" >';
							str+='<thead>';
								str+='<tr>';
									//str+='<th style="width:70px; !important;">GIVEN&nbsp;DATE</th>';
									str+='<th><h6 class="font_size_12"> WORK&nbsp;REF&nbsp;NO </h6></th>';
									str+='<th><h6 class="font_size_12"> ENDORS&nbsp;NO </h6></th>';									
									str+='<th><h6 class="font_size_12"> CONSTITUENCY </h6></th>';
									str+='<th><h6 class="font_size_12"> MANDAL  </h6></th>';
									str+='<th><h6 class="font_size_12"> PANCHAYAT </h6></th>';
									str+='<th><h6 class="font_size_12"> WORK&nbsp;DESC </h6></th>';
									str+='<th><h6 class="font_size_12"> EST&nbsp;COST<br>(in Lakhs) </h6></th>';
									//str+='<th>REF BY</th>';
									//str+='<th>ACTION MEMO</th>';
									//str+='<th>GO ISSUED </th>';
									//str+='<th>PENDING&nbsp;@</th>';
									str+='<th><h6 class="font_size_12">  UPDATE PRIORITY<br/><span class="f-12">(Ex:1,2,3...)</span> </h6></th>';
									str+='</tr>';
								str+='</thead>';
								str+='<tbody>';
								
		if(result != null && result.length>0){
			for(var s in result){
				for(var i in result[s].subWorksList){
					if(typeof result[s].subWorksList[i] != 'undefined' && result[s].subWorksList[i] != null){
						
						//if(result[s].subWorksList[i].subWorksList != null && result[s].subWorksList[i].length>0){
							//console.log(s+" : "+i+" - "+result[s].subWorksList[i]);
							for(var k in result[s].subWorksList[i].subWorksList){
								//console.log(result[s].subWorksList[i].subWorksList[k]);
								//if(typeof result[s].subWorksList[i].subWorksList[k] != 'undefined' && result[s].subWorksList[i].subWorksList[k] != null){
									str+='<tr>';
									/*if(typeof result[s].subWorksList[i].subWorksList[k].representationDate != 'undefined' && result[s].subWorksList[i].subWorksList[k].representationDate != null)
										str+='<td  style="width:70px; !important;">'+result[s].subWorksList[i].subWorksList[k].representationDate+'</td>';
									else
										str+='<td></td>';
									*/
									if(typeof result[s].subWorksList[i].subWorksList[k].workId != 'undefined' && result[s].subWorksList[i].subWorksList[k].workId != null)
										str+='<td><h6 class="font_size1_12">'+result[s].subWorksList[i].subWorksList[k].workId+'</h6></td>';
									else 
										str+='<td></td>';
									if(typeof result[s].subWorksList[i].subWorksList[k].endorsmentNo != 'undefined' && result[s].subWorksList[i].subWorksList[k].endorsmentNo != null)
										str+='<td><h6 class="font_size1_12">'+result[s].subWorksList[i].subWorksList[k].endorsmentNo+'</h6></td>';
									else 
										str+='<td></td>';
									if(result[s].subWorksList[i].subWorksList[k].addressVO != null){
										/*str+='<td>';
										if(typeof result[s].subWorksList[i].subWorksList[k].addressVO.districtName != 'undefined' && result[s].subWorksList[i].subWorksList[k].addressVO.districtName .length>0)
											str+='D:'+result[s].subWorksList[i].subWorksList[k].addressVO.districtName+'<br/>';
										str+='</td>';*/
										str+='<td><h6 class="font_size1_12">';
										if(typeof result[s].subWorksList[i].subWorksList[k].addressVO.assemblyName != 'undefined'  && result[s].subWorksList[i].subWorksList[k].addressVO.assemblyName .length>0)
											str+=''+result[s].subWorksList[i].subWorksList[k].addressVO.assemblyName+'<br/>';
										str+='</h6></td>';
										str+='<td><h6 class="font_size1_12">';
											if(typeof result[s].subWorksList[i].subWorksList[k].addressVO.tehsilName != 'undefined'  && result[s].subWorksList[i].subWorksList[k].addressVO.tehsilName .length>0)
												str+=''+result[s].subWorksList[i].subWorksList[k].addressVO.tehsilName+'<br/>';
										str+='</h6></td>';
										str+='<td><h6 class="font_size1_12">';
											if(typeof result[s].subWorksList[i].subWorksList[k].addressVO.panchayatName != 'undefined'  && result[s].subWorksList[i].subWorksList[k].addressVO.panchayatName .length>0)
												str+='P:'+result[s].subWorksList[i].subWorksList[k].addressVO.panchayatName+'';
										str+='</h6></td>';
									}else{
										str+='<td></td>';
										str+='<td></td>';
										str+='<td></td>';
									}
								
									
									if(typeof result[s].subWorksList[i].subWorksList[k].workDescription != 'undefined' && result[s].subWorksList[i].subWorksList[k].workDescription != null)
										str+='<td><h6 class="font_size1_12">'+result[s].subWorksList[i].subWorksList[k].workDescription+'</h6></td>';
									else 
										str+='<td></td>';
								
								
									if(typeof result[s].subWorksList[i].subWorksList[k].estimationCost != 'undefined' && result[s].subWorksList[i].subWorksList[k].estimationCost != null)
										str+='<td><h6 class="font_size1_12">'+result[s].subWorksList[i].subWorksList[k].estimationCost+'</h6></td>';
									else 
										str+='<td></td>';
									if(typeof result[s].subWorksList[i].subWorksList[k].priority != 'undefined' && parseInt(result[s].subWorksList[i].subWorksList[k].priority)>0)
										str+='<td  style="text-align:center;" title="Please enter priority"> <span class="prirotyCls1" style="display:none;">'+result[s].subWorksList[i].subWorksList[k].priority+' </span>  <input type="text" class="prirotyCls" attr_work_id="'+result[s].subWorksList[i].subWorksList[k].workId+'" attr_value="'+result[s].subWorksList[i].subWorksList[k].priority+'" attr_petition_id="'+result[s].subWorksList[i].subWorksList[k].petitionId+'" maxlength="10" placeholder="" value="'+result[s].subWorksList[i].subWorksList[k].priority+'" style="width:50px;text-align:center;" id="priorityTextId'+k+'" onblur="checkSequence(\'priorityTextId'+k+'\')"/></td>';
									else
										str+='<td  style="text-align:center;"  title="Please enter priority"> <input type="text" class="prirotyCls" attr_work_id="'+result[s].subWorksList[i].subWorksList[k].workId+'" attr_petition_id="'+result[s].subWorksList[i].subWorksList[k].petitionId+'" maxlength="10" placeholder=""  style="width:50px;text-align:center;" onblur="checkSequence(\'priorityTextId'+k+'\')" attr_value="" id="priorityTextId'+k+'"/></td>';
									str+='</tr>';
									
								//}
							}
						}
					//}
				}
			}
			
			
								str+='</tbody>';
						str+='</table>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
		}
		str+='<button type="button" class="btn btn-success m_top10 pull-right dispalyNone" onclick="updatePriorityDetailsforPetitionsWorks()">SUBMIT DETAILS</button>';
		$('#pdfWiswPetitionsView').html(str);
		
		var districtName = "";
		var assemblyName = "";
		var finalName="";
		var districtIdVal = $("#districtCandId1").val();
		var constituencyId=$("#constituencyCanId1").val();
		
		if(constituencyId != null && constituencyId.length>0){
			assemblyName = $("#constituencyCanId1 option:selected").text();
			finalName = assemblyName+"_CONSTITUENCY_PRIORITY_LIST" ;
		}else if(districtIdVal != null && districtIdVal.length>0){
			districtName = $("#districtCandId1 option:selected").text();
			finalName = districtName+"_DISTRICT_PRIORITY_LIST" ;
		}
		finalName = finalName.toUpperCase();
		
		$("#worksDetailsTab").dataTable({
		"paging":   false,
		"info":     false,
		"searching": true,
		"autoWidth": true,
		//"sDom": '<"top"iflp>rt<"bottom"><"clear">',
		/*"iDisplayLength": 500,
		"aaSorting": [[ 0, "desc" ]],
		"aLengthMenu": [[500,200,100 -1], [ 500,200,100, "All"]],
		*/
		//"iDisplayLength": -1,
		"aaSorting": ["7"],
		//"aLengthMenu": [[50, 100, 500, -1], [50, 100, 500, "All"]],
		
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
				/*{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o" title="Excel"></i>',
					titleAttr: 'CSV',
					exportOptions: {
						columns: ':visible'
					}
				}*/
				{
					title: ''+finalName+'',
					extend:    'excelHtml5',
					text:      '<i class="fa fa-file-excel-o" id="exportExcelId" ></i>',
					titleAttr: 'Excel'
					
				}
			]
	}); 
	/*
	$(".prirotyCls").keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			$(".error_Mgscls").show();
               return false;
		}
	   });
		*/
		
		//$('.printViewCls').trigger('click');
 }
 
 
 
 $(document).on("click","#exportExcelId",function()
{
	$('.prirotyCls1').show();
	$('.prirotyCls').hide();
	setTimeout(function () {
		$('.prirotyCls1').hide();
		$('.prirotyCls').show();
	 }, 1000);
});	

 function getDistrictBySearchTypeInsubject(){
	 $("#districtCandId1").html('');
	 var deptIds = [];
	 var subjectIds =[];
	 var subSubjectIds = [];
	 
   var depts =$("#departmntId1").val();
	if(depts != null && depts.length>0){
		deptIds=depts;
	}
	if(depts != null && depts.length>0){
		for(var i in depts){
			if(parseInt(depts[i])==0){
				deptIds=[];
			}
		}
	}
	var subjctidVal = $("#subjectId1").val();
	if(subjctidVal != null && subjctidVal.length>0){
		subjectIds=subjctidVal;
	}
	if(subjctidVal != null && subjctidVal.length>0){
		for(var i in subjctidVal){
			if(parseInt(subjctidVal[i])==0){
				subjectIds=[];
			}
		}
	}
	
	var subSubjectIdVal = $("#SubSubjectId").val();
	if(subSubjectIdVal != null && subSubjectIdVal.length >0){
		subSubjectIds = subSubjectIdVal;
	}
	if(subSubjectIdVal != null && subSubjectIdVal.length >0){
		for(var i in subSubjectIdVal){
			if(parseInt(subSubjectIdVal[i])==0){
				subSubjectIds=[];
			}
		}
	}
 var json = {
		 filterType :"work",
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 deptIdsList:deptIds,
		 subjectIdsLst : subjectIds,
		 subSubjectIdsLst : subSubjectIds
		 
		}           
	$.ajax({              
		type:'POST',    
		url: 'getDistrictBySearchTypeInsubject',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length >0){
		 $("#districtCandId1").html("<option value='0'>Select District</option>");
			for(var i in result){
				$("#districtCandId1").append("<option value='"+result[i].id+"'>"+result[i].name+"</option>");;
			}
		}
		//$("#districtCandId1").chosen();
		$("#districtCandId1").trigger('chosen:updated');
		
	});	
}
$(document).on("change","#districtCandId1",function()
{
	getConstituencyBySearchTypeAndDistrictIdInSubSubject($(this).val());
});	

function getConstituencyBySearchTypeAndDistrictIdInSubSubject(distictId){

	var deptIds = [];
	 var subjectIds =[];
	 var subSubjectIds = [];
	 
   var depts =$("#departmntId1").val();
	if(depts != null && depts.length >0){
		deptIds=depts;
	}
	if(depts != null && depts.length>0){
		for(var i in depts){
			if(parseInt(depts[i])==0){
				deptIds=[];
			}
		}
	}
	var subjctidVal = $("#subjectId1").val();
	if(subjctidVal != null && subjctidVal.length >0){
		subjectIds=subjctidVal;
	}
	if(subjctidVal != null && subjctidVal.length>0){
		for(var i in subjctidVal){
			if(parseInt(subjctidVal[i])==0){
				subjectIds=[];
			}
		}
	}
	
	var subSubjectIdVal = $("#SubSubjectId").val();
	if(subSubjectIdVal != null && subSubjectIdVal.length >0){
		subSubjectIds = subSubjectIdVal;
	}
	if(subSubjectIdVal != null && subSubjectIdVal.length >0){
		for(var i in subSubjectIdVal){
			if(parseInt(subSubjectIdVal[i])==0){
				subSubjectIds=[];
			}
		}
	}
	
	var json = {
		 filterType :"work",
		 searchLvlVals: distictId,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 deptIdsList:deptIds,
		 subjectIdsLst : subjectIds,
		 subSubjectIdsLst : subSubjectIds
		 
	}  	

	$.ajax({              
		type:'POST',    
		url: 'getConstituencyBySearchTypeAndDistrictIdInSubSubject',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#constituencyCanId1").empty();
		if(result !=null && result.length >0){
			 $("#constituencyCanId1").html("<option value='0'>Select Constituency</option>");
			for(var i in result){
				$("#constituencyCanId1").append("<option value='"+result[i].id+"'>"+result[i].name+"</option>");
			}
		}
		
		$("#constituencyCanId1").chosen();
		$("#constituencyCanId1").trigger('chosen:updated');
	});	
}

function getConstituenciesBySearchTypeAndDistrict(distictId){
	
	var json = {
		filterType :"work",
		 searchLvlVals: distictId,
		 fromDate :currentFromDate,
		 toDate : currentToDate,
		 deptIdsList:[],
		 designationIds:[],
		 type:'',
		 statusIds:[]
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
		$("#constituencyCanId1").empty();
		if(result !=null && result.length >0){
			for(var i in result){
				$("#constituencyCanId1").append("<option value='"+result[i].key+"'>"+result[i].value+"</option>");
			}
		}
		
		$("#constituencyCanId1").chosen();
		$("#constituencyCanId1").trigger('chosen:updated');
	});	
}

function checkSequence(id){
	return;
	var currentEnteredValue=$("#"+id+"").val();
	var existingValue=$("#"+id+"").attr('attr_value');
	var maxEnteredValue=0;
	 $('.prirotyCls').each(function(){
		var attr_workId = $(this).attr('attr_work_id');
		var attr_priority_id = $(this).attr('attr_petition_id');
		var priority = $(this).val();
		
		if(parseInt(maxEnteredValue)<parseInt(priority)){
			maxEnteredValue = parseInt(priority);
		}
	 });
	 
	 console.log("111 : "+maxEnteredValue);
	 console.log("222 : "+parseInt(currentEnteredValue));
	 
	 if((parseInt(maxEnteredValue)+1) == parseInt(currentEnteredValue))
	 {
		 return;
	 }else{
		 if(existingValue ==""){
			$("#"+id+"").val("");
		 }else if(existingValue == currentEnteredValue){
			$("#"+id+"").val(existingValue);
		 }else{
			alert("Sequence of priority required.");
			$("#"+id+"").val("");
		 }
	 }
}
function updatePriorityDetailsforPetitionsWorks(){
   var formData = new FormData();
   var i=0;
   var priorityArr =[];
   var worksArr=[];
   var hasDuplicate=false;
   $('.prirotyCls').each(function(){
    var attr_workId = $(this).attr('attr_work_id');
    var attr_priority_id = $(this).attr('attr_petition_id');
    var priority = $(this).val();
	 $(this).css("background-color","#fff");
		//if(parseInt(priority) >0){
			if(priorityArr != null && priorityArr.length>0){
			  for(var i in priorityArr){
				if(parseInt(priorityArr[i])==parseInt(priority)){
				  hasDuplicate=true;
					$(this).css("background-color","#f2c5c1");
				}
			  }
			}
			var obj;
			if(priority == null || priority.length==0){
				obj={
				  "workId":attr_workId,
				  "petitionId":attr_priority_id
				}
			}else{
				obj={
				  "workId":attr_workId,
				  "petitionId":attr_priority_id,
				  "priority":priority
				}
			}
			//console.log(obj);
			worksArr.push(obj);
			console.log(obj);
			priorityArr.push(priority);
		//}    
   });
   
   if(worksArr == null || worksArr.length ==0){
	 worksArr=[];
	 priorityArr =[];
      alert("Please enter atleast one work priority number.");
     return;
   }
   if(hasDuplicate){
     worksArr=[];
	 priorityArr =[];
      alert("Duplicate priority numbers not allowed.Please check once.");
     return;
   }
   
 /*  worksArr=[];
  var obj={
    "workId":1774,
    "petitionId":1778,
    "priority":2
  }
  
  console.log(obj);
  worksArr.push(obj);
  */
  
  var json = {
       worksList:worksArr
    };
  
   if(!hasDuplicate){
    $("#prioritySubmitButtonId").attr("disabled",true);  
  
    $.ajax({              
      type:'POST',    
      url: 'updatePriorityDetailsforPetitionWorks',
      dataType: 'json',
      data : JSON.stringify(json),
      beforeSend :   function(xhr){
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
      }
      }).done(function(result){
        $("#savingDetailsSpinner").html('');
        if(result!=null){
          if(result.exceptionMsg == "SUCCESS" || result.exceptionMsg == "success"){
           setTimeout(function () {
            $("#ajaxcallImageId").html("<center><h4 style='color: green;'> Updated Successfully... </h4></center>");
            alert("Work(s) details updated successfully");
			getPetitionsDetails();
          }, 5000);
          }else{
            $('#endorsWorksId').show();
            $("#endorsWorksId").attr("disabled",false);
          }
        }else{
          $("#endorsWorksId").attr("disabled",false);
          $('#endorsWorksId').show();
        }
      }
    );
   }
}

$(document).on("change","#departmntId1,#districtCandId1,#constituencyCanId1,#statusLocId1,#subjectId1,#SubSubjectId",function(){
	$("#pdfWiswPetitionsView").html('');
});	


$(document).on("click",".printViewCls",function(){
	printDiv();
});
function printDiv() {
	 var printContents = document.getElementById('printableArea').innerHTML;
	 var originalContents = document.getElementById("printcontent").innerHTML;
	 document.title = "";
     document.getElementById("printcontent").innerHTML = printContents;
	 window.print();
     document.getElementById("printcontent").innerHTML = originalContents;
	 $(".dispalyNone").show();
}

</script>
</body>
</html>
