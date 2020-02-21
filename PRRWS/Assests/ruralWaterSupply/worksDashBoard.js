	//Angular Start  getAlertsOfCategoryByStatusWise()
var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var levelWiseOverviewArr = ['state','district','constituency','mandal'];
var currentYear="";
if(moment().format('MM').toString < "04"){
	currentYear = moment().year()
}else{
	currentYear = moment().year()+1;
}
var toDateStr=moment().format('DD-MM-YYYY');
var fromDateStr=moment().startOf('isoWeek').format('DD-MM-YYYY');

$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
var startyear= moment().year()-15;
var glStartDate = moment().subtract(15, 'years').startOf('year').format("DD-MM-YYYY");
var	glEndDate = "01-04-"+currentYear;

getAllFiniancialYears();
getAllSchemes();

function getAllSchemes(){
	$("#schemeDivId").html('');
	var json = {
	}
	$.ajax({                
		type:'POST',    
		url: 'getRwsProgramsCodeAndName',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			for(var i in result){
				$("#schemeDivId").append("<option value="+result[i].programCode+" selected>"+result[i].programName+"</option>");
				
			}
			$('#schemeDivId').multiselect("destroy");
			$('#schemeDivId').multiselect({
				enableFiltering: true,
				includeSelectAllOption: true,
				selectAllText: 'All',
				maxHeight: 300,
				buttonWidth: '100%',
				dropDown: true,
				selectAllName: true,
				allSelectedText: 'All Schemes',
				onChange: function() {
					 onloadCalls();
				},onSelectAll: function() {
					 onloadCalls();
				}
			});
		}
	});
}

function getAllFiniancialYears(){
	$("#financialYearId").html('');

	var json = {
	}
	$.ajax({                
		type:'POST',    
		url: 'getAllFiniancialYears',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#financialYearId").append("<option value="+startyear+"-"+currentYear+">All Financial Years</option>");
		$("#financialYearId").append("<option value='2008-2014'>Before 2014</option>");
		$("#financialYearId").append("<option value=2014-"+currentYear+">2014-"+currentYear+"</option>");
		if(result != null && result.length >0){
			for(var i in result){
				var value = result[i].financialYear.split('-');
				$("#financialYearId").append("<option value="+result[i].financialYear+">"+result[i].financialYear+"</option>");
				
			}
			$("#financialYearId").val(startyear+'-'+currentYear);
		}
		
		$("#financialYearId").chosen();
		$("#financialYearId").trigger('chosen:updated');
			onloadCalls();	
	});
}
$(document).on("change","#financialYearId",function(){
	var split=$(this).val().split('-')
	var yearId = $(this).val();
	glStartDate="01-04-"+split[0];
	glEndDate="01-04-"+split[1];
	onloadCalls();
});
$("#dateRangePickerAUM").daterangepicker({
	opens: 'left',
	startDate: glStartDate,
	endDate: glEndDate,
	locale: {
	  format: 'DD-MM-YYYY'
	},
	ranges: {
		'All':[moment().subtract(15, 'years').startOf('year').format("DD-MM-YYYY"), "01-04-"+currentYear],
		'Today' : [moment(), moment()],
		'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		'This Month': [moment().startOf('month'), moment()],
		'This Year': [moment().startOf('Year'), moment()],
		'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
		'Last 2 Year': [moment().subtract(2, 'Year'), moment()],
		'Last 3 Year': [moment().subtract(3, 'Year'), moment()]	
	}
 });
 
var dates= $("#dateRangePickerAUM").val();
var pickerDates = glStartDate+' - '+glEndDate;
if(dates == pickerDates)
{
$("#dateRangePickerAUM").val('All');
}
$('#dateRangePickerAUM').on('apply.daterangepicker', function(ev, picker) {
	glStartDate = picker.startDate.format('DD-MM-YYYY')
	glEndDate = picker.endDate.format('DD-MM-YYYY')
	if(picker.chosenLabel == 'All')
	{
	  $("#dateRangePickerAUM").val('All');
	}
	$("#financialYearId").val(startyear+'-'+currentYear);
	$("#financialYearId").trigger('chosen:updated');
		onloadCalls();
});

function onloadCalls(){
	
	var statusType =$('input:radio[name=optradio1]:checked').val();
	levelWiseOverview();
	getSchemeWiseWorkDetails('','state','graph');
	//getExceedWorkDetailsLocationWise("onGoing");
	getExceedWorkDetailsLocationWise("state","state","graph",statusType,"onGoing")
	getNotGroundedWorkDetailsLocationWise("state","state","graph",statusType,"notGrounded");
	gettAllRwsWorksByScheme();
}
function gettAllRwsWorksByScheme(){
	
	$("#encSchemesTableDivId").html(spinner);
	$("#encSchemesEffeciencyDivId").html(spinner);
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	
	var json = {
		year:yearVal,
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
	}
	
	$.ajax({                
		type:'POST',    
		url: 'getAllWorksByScheme',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildgettAllRwsWorksBySchemeDetails(result);
		}else{
			
			$("#encSchemesTableDivId").html('No Data Available');
			$("#encSchemesEffeciencyDivId").html('No Data Available');
		}
		
	});
}

function buildgettAllRwsWorksBySchemeDetails(result){
	var str=''; var total =0; var grounded=0;
	var total =0; var grounded=0; var entrust=0;var commissionedCount=0;
	var techSanctioned=0; var underProgress=0; var completed=0; var notGrounded=0;
	for(var i in result){
		total =total+parseInt(result[i].adminSanctionedCount);
		grounded = grounded+parseInt(result[i].groundedCount);
		techSanctioned =techSanctioned+parseInt(result[i].technicalSanctionedCount);
		entrust = entrust+parseInt(result[i].entrustedCount);
		underProgress =underProgress+parseInt(result[i].undrProcessCount);
		completed = completed+parseInt(result[i].completedCount);
		notGrounded=notGrounded+parseInt(result[i].notgroundedCount);
		commissionedCount=commissionedCount+parseInt(result[i].commissionedCount)
	}
	str+='<div class="col-sm-12 m_top10">';
	tableView+='<div class="panel panel-default panel-black"><div class="panel-heading"><h5 class="font_weight">SechemeWise Works Count</h5></div></div>';
	tableView+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_custom_SC">';
				str+='<thead>';
					str+='<tr>';
						str+='<th >TOTAL ADMIN SANCTIONED</th>';
						str+='<th style="background-color:#def2f7">TOTAL EFFICIENCY %</th>';
						str+='<th>TOTAL GROUNDED</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					str+='<tr>';
						str+='<td>'+total+'</td>';
						str+='<td style="background-color:#def2f7">'+(parseFloat(grounded/total)*100).toFixed(2)+'</td>';
						str+='<td>'+grounded+'</td>';
					str+='</tr>';
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#encSchemesEffeciencyDivId").html(str);
	var tableView='';
	tableView+='<div class="col-sm-12 m_top10">';
		tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered exceedCls table_custom_SC" id="dataTableSchems1">';
			tableView+='<thead>';
			tableView+='<tr>';
				tableView+='<th>GRANT&nbsp;NAME</th>';
				tableView+='<th>ADMIN SANCTIONED</th>';
				tableView+='<th>TECHNICALLY SANCTIONED</th>';
				tableView+='<th>ENTRUSTED</th>';
				tableView+='<th>NOT GROUNDED</th>';
				tableView+='<th style="background-color:#def2f7">EFFICIENCY&nbsp;%</th>';
				tableView+='<th>GROUNDED</th>';
				tableView+='<th>UNDER PROCESS</th>';
				tableView+='<th>COMPLETED</th>';
				tableView+='<th>COMISSIONED</th>';
					
			tableView+='</tr>';
				
			tableView+='</thead>';
			tableView+='<tbody>';
			for(var i in result){
				tableView+='<tr>';
						tableView+='<td>'+result[i].locationName+'</td>';
						if(result[i].adminSanctionedCount !=null && parseInt(result[i].adminSanctionedCount)>0){
							tableView+='<td class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="adminSanctioned" style="cursor:pointer;text-decoration:underline">'+result[i].adminSanctionedCount+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						
						if(result[i].technicalSanctionedCount !=null && parseInt(result[i].technicalSanctionedCount)>0){
						tableView+='<td class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="techSanctioned" style="cursor:pointer;text-decoration:underline">'+result[i].technicalSanctionedCount+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].entrustedCount !=null && parseInt(result[i].entrustedCount)>0){
						tableView+='<td class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="entrusted" style="cursor:pointer;text-decoration:underline">'+result[i].entrustedCount+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].notgroundedCount !=null && result[i].notgroundedCount>0){
						tableView+='<td class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="not grounded" style="cursor:pointer;text-decoration:underline">'+result[i].notgroundedCount+'</td>';					
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].adminSanctionedCount !=null && result[i].adminSanctionedCount>0){
						tableView+='<td style="background-color:#def2f7">'+(parseFloat(result[i].groundedCount/result[i].adminSanctionedCount)*100).toFixed(2)+'%</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].groundedCount !=null && result[i].groundedCount>0){
						tableView+='<td class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="ongoing" style="cursor:pointer;text-decoration:underline">'+result[i].groundedCount+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].undrProcessCount !=null && result[i].undrProcessCount>0){
						tableView+='<td class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="Grounded" style="cursor:pointer;text-decoration:underline">'+result[i].undrProcessCount+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].completedCount !=null && result[i].completedCount>0){
							tableView+='<td class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="completed" style="cursor:pointer;text-decoration:underline">'+result[i].completedCount+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].commissionedCount !=null && result[i].commissionedCount>0){
							tableView+='<td class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="Commissioned" style="cursor:pointer;text-decoration:underline">'+result[i].commissionedCount+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
					tableView+='</tr>';
			}
			tableView+='</tbody>';
			tableView+='<tbody>';
					tableView+='<tr>';
						tableView+='<td>Total</td>';
						tableView+='<td>'+total+'</td>';
						tableView+='<td>'+techSanctioned+'</td>';
						tableView+='<td>'+entrust+'</td>';
						tableView+='<td>'+notGrounded+'</td>';
						tableView+='<td style="background-color:#def2f7">'+(parseFloat(grounded/total)*100).toFixed(2)+'%</td>';
						tableView+='<td>'+grounded+'</td>';
						tableView+='<td>'+underProgress+'</td>';
						tableView+='<td>'+completed+'</td>';
						tableView+='<td>'+commissionedCount+'</td>';
					tableView+='</tr>';
				tableView+='</tbody>';
		tableView+='</table>';
		tableView+='</div>';
	tableView+='</div>';
	$("#encSchemesTableDivId").html(tableView);
	$("#dataTableSchems1").dataTable({
		"order": [ 0, 'desc' ],
		"iDisplayLength" : 5,
		"aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Rws Works',
				filename:  'Rws Works'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
	
}
function levelWiseOverview()
{
	var statusType =$('input:radio[name=optradio1]:checked').val();
	if(statusType == ""){
		statusName ="All";
		
	}else{
		statusName ="OnGoing";
	}		
	
	var collapse = '';
	collapse+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
		for(var i in levelWiseOverviewArr)
		{
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+levelWiseOverviewArr[i]+'">';
					if(i ==0)
					{
						collapse+='<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#accordion" href="#collapse'+levelWiseOverviewArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseOverviewArr[i]+'" >';
					}else{
						collapse+='<a role="button" class="panelCollapseIcon collapsed clickToViewTable" data-toggle="collapse" data-parent="#accordion" href="#collapse'+levelWiseOverviewArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseOverviewArr[i]+'" attr_block_id="'+levelWiseOverviewArr[i]+'levelBlockId" attr_state_type="'+statusType+'" attr_loc="'+levelWiseOverviewArr[i]+'" attr_cnt="0">';
					}
					
						collapse+='<h4 class="panel-title text-capital">'+levelWiseOverviewArr[i]+' level overview</h4>';
					collapse+='</a>';
				collapse+='</div>';
				if(i == 0)
				{
					collapse+='<div id="collapse'+levelWiseOverviewArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+levelWiseOverviewArr[i]+'">';
				}else{
					collapse+='<div id="collapse'+levelWiseOverviewArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+levelWiseOverviewArr[i]+'">';
				}
				
				
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';
							collapse+='<div class="col-sm-12">';
								collapse+='<ul class="list-inline switch-btn workWiseDetailsCls">';
									collapse+='<li attr_type="works" attr_location_type="'+levelWiseOverviewArr[i]+'" attr_status="'+statusType+'" class="f_14">OverAll Works</li>';
									if(statusType =="ongoing"){
										collapse+='<li class="active f_14" attr_type="exceed" attr_location_type="'+levelWiseOverviewArr[i]+'" attr_status="'+statusType+'" >Under Progress-Exceeded Works</li>';
									}else{
										collapse+='<li class="active f_14" attr_type="exceed" attr_location_type="'+levelWiseOverviewArr[i]+'" attr_status="'+statusType+'" >Grounded-Exceeded Works</li>';
									}
									
									collapse+='<li attr_type="notGrounded" attr_location_type="'+levelWiseOverviewArr[i]+'" attr_status="'+statusType+'" class="f_14">Not Grounded Exceeded Works</li>';
								collapse+='</ul>';
							collapse+='</div>';
						collapse+='</div>';
						collapse+='<div class="row m_top20">';
							collapse+='<div class="col-sm-12">';
								collapse+='<div id="'+levelWiseOverviewArr[i]+'levelBlockId"></div>';
							collapse+='</div>';
						collapse+='</div>';
					
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		}
	collapse+='</div>';
	$("#levelWiseOverviewId").html(collapse);
	$(".chosen-select").chosen({width :'100%'});
	for(var i in levelWiseOverviewArr)
	{

		if(levelWiseOverviewArr[i] == "state"){
			//getSchemeWiseWorkDetails(levelWiseOverviewArr[i]+'levelBlockId','state','table');
			getExceedWorkDetailsLocationWise(levelWiseOverviewArr[i]+'levelBlockId',"state","table",statusType,"onGoing")
		}
		else if(levelWiseOverviewArr[i] == "district"){
			//getSchemeWiseWorkDetails(levelWiseOverviewArr[i]+'levelBlockId','district','table');
			getExceedWorkDetailsLocationWise(levelWiseOverviewArr[i]+'levelBlockId',"district","table",statusType,"onGoing")
		}
		else if(levelWiseOverviewArr[i] == "constituency"){
			//getSchemeWiseWorkDetails(levelWiseOverviewArr[i]+'levelBlockId','constituency','table');
			getExceedWorkDetailsLocationWise(levelWiseOverviewArr[i]+'levelBlockId',"constituency","table",statusType,"onGoing")
		}
		else if(levelWiseOverviewArr[i] == "mandal"){
			//getSchemeWiseWorkDetails(levelWiseOverviewArr[i]+'levelBlockId','mandal','table');
			getExceedWorkDetailsLocationWise(levelWiseOverviewArr[i]+'levelBlockId',"mandal","table",statusType,"onGoing")
		}
		
	}
	
}

function getSchemeWiseWorkDetails(blockId,locationType,type){
	var typeVal="";
	if(type=='graph'){
		$("#habitationWorksPWS,#habitationWorksCPWS").html(spinner);
		$("#habitationWorks").html(spinner);
		typeVal ="graph"
	}else{
		$("#"+blockId).html(spinner);
		
	}
	var schemeValArr=[];
	var schemeVal =$("#schemeDivId").val();
	if(schemeVal==null || schemeVal==""){
		schemeValArr=[];
	}else{
		for(var i in schemeVal){
			var schemeId="";
			if(schemeVal[i].length ==1){
				schemeId="0"+schemeVal[i]
			}else{
				schemeId=schemeVal[i];
			}
			schemeValArr.push(schemeId);
		}
	}
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	var json = {
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
		year:yearVal,
		locationType:locationType,
		type:typeVal,/* 
		filterType:filterType,
		filterValue:filterValue,
		districtValue:districtValue, */
		schemeIdStr:schemeValArr
	}
		  
	$.ajax({
		url: 'getLocationWiseSchemeWiseWorkDetails',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp){
			if(ajaxresp !=null && ajaxresp.length>0){
				if(type == "graph"){
					buildSchemeWiseWorkDetailsforState(ajaxresp);
				}else{
					locationwiseTableBlocks(ajaxresp,blockId,locationType);
				}
				
			}else{
				if(type == "graph"){
					$("#habitationWorks").html("No Data Available");
					$("#habitationWorksPWS,#habitationWorksCPWS").html("No Data Available");
				}else{
					$("#"+blockId).html("No Data Available");
				}
				
			}
		}
	});
}
function locationwiseTableBlocks(GLtbodyArr,blockId,locationType){
	var tableView='';
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered" id="dataTable3'+blockId+'">';
			tableView+='<thead class="text-capital">';
				tableView+='<tr>';
					tableView+='<th rowspan="2">'+locationType+'</th>';
					if(GLtbodyArr[0] !=null && GLtbodyArr[0].subList !=null && GLtbodyArr[0].subList.length>0){
						for(var j in GLtbodyArr[0].subList){
								if(GLtbodyArr[0].subList[j].assetType == 'PWS' || GLtbodyArr[0].subList[j].assetType == "CPWS"){
									tableView+='<th colspan="15">'+GLtbodyArr[0].subList[j].assetType+'</th>';
								}
							
						}
					}
				tableView+='</tr>';
				tableView+='<tr>';
					tableView+='<th>admin Sanctioned</th>';
					tableView+='<th>Techincal Sanctioned</th>';
					tableView+='<th>%</th>';
					tableView+='<th>entrusted</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Grounded</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Not Grounded</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Under Progress</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Completed</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Commissioned</th>';
					tableView+='<th>%</th>';
					tableView+='<th>admin Sanctioned</th>';
					tableView+='<th>Techincal Sanctioned</th>';
					tableView+='<th>%</th>';
					tableView+='<th>entrusted</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Grounded</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Not Grounded</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Under Progress</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Completed</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Commissioned</th>';
					tableView+='<th>%</th>';
				tableView+='</tr>'
			tableView+='</thead>';
			tableView+='<tbody style="background-color:white;">';
				for(var i in GLtbodyArr){
					tableView+='<tr>';
						tableView+='<td>'+GLtbodyArr[i].locationName+'</td>';
					
						if(GLtbodyArr[i].subList !=null && GLtbodyArr[i].subList.length>0){
							for(var j in GLtbodyArr[i].subList){
								if(GLtbodyArr[i].subList[j].assetType == 'PWS' || GLtbodyArr[i].subList[j].assetType == "CPWS"){
									
									if(GLtbodyArr[i].subList[j].adminSanctionedCount !=null && GLtbodyArr[i].subList[j].adminSanctionedCount>0){
										tableView+='<td class="schemsClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'"attr_location_type="'+locationType+'"attr_filter_value="'+GLtbodyArr[i].locationIdStr+'" attr_district_val="'+GLtbodyArr[i].districtId+'"attr_total_count = "'+GLtbodyArr[i].subList[j].adminSanctionedCount+'" attr_type = "adminSanctioned" attr_location_name= "'+GLtbodyArr[i].locationName+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].subList[j].adminSanctionedCount+'</td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].technicalSanctionedCount !=null && GLtbodyArr[i].subList[j].technicalSanctionedCount>0){
										tableView+='<td class="schemsClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'"attr_location_type="'+locationType+'"attr_filter_value="'+GLtbodyArr[i].locationIdStr+'" attr_district_val="'+GLtbodyArr[i].districtId+'"attr_total_count = "'+GLtbodyArr[i].subList[j].technicalSanctionedCount+'" attr_type = "techSanctioned" attr_location_name= "'+GLtbodyArr[i].locationName+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].subList[j].technicalSanctionedCount+'</td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].adminSanctionedCount !=null && GLtbodyArr[i].subList[j].adminSanctionedCount>0){
										tableView+='<td><small style="color:#0FBE08">'+(parseFloat(GLtbodyArr[i].subList[j].technicalSanctionedCount/GLtbodyArr[i].subList[j].adminSanctionedCount)*100).toFixed(1)+'</small></td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].entrustedCount !=null && GLtbodyArr[i].subList[j].entrustedCount>0){
										tableView+='<td class="schemsClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'"attr_location_type="'+locationType+'"attr_filter_value="'+GLtbodyArr[i].locationIdStr+'" attr_district_val="'+GLtbodyArr[i].districtId+'"attr_total_count = "'+GLtbodyArr[i].subList[j].entrustedCount+'" attr_type = "entrusted" attr_location_name= "'+GLtbodyArr[i].locationName+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].subList[j].entrustedCount+'</td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].adminSanctionedCount !=null && GLtbodyArr[i].subList[j].adminSanctionedCount>0){
										tableView+='<td><small style="color:#0FBE08">'+(parseFloat(GLtbodyArr[i].subList[j].entrustedCount/GLtbodyArr[i].subList[j].adminSanctionedCount)*100).toFixed(1)+'</small></td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].groundedCount !=null && GLtbodyArr[i].subList[j].groundedCount>0){
										tableView+='<td class="schemsClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'"attr_location_type="'+locationType+'"attr_filter_value="'+GLtbodyArr[i].locationIdStr+'" attr_district_val="'+GLtbodyArr[i].districtId+'"attr_total_count = "'+GLtbodyArr[i].subList[j].groundedCount+'" attr_type = "ongoing" attr_location_name= "'+GLtbodyArr[i].locationName+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].subList[j].groundedCount+'</td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].adminSanctionedCount !=null && GLtbodyArr[i].subList[j].adminSanctionedCount>0){
										tableView+='<td><small style="color:#0FBE08">'+(parseFloat(GLtbodyArr[i].subList[j].groundedCount/GLtbodyArr[i].subList[j].adminSanctionedCount)*100).toFixed(1)+'</small></td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].notgroundedCount !=null && GLtbodyArr[i].subList[j].notgroundedCount>0){
										tableView+='<td class="schemsClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'" attr_location_type="'+locationType+'"attr_filter_value="'+GLtbodyArr[i].locationIdStr+'" attr_district_val="'+GLtbodyArr[i].districtId+'" attr_total_count = "'+GLtbodyArr[i].subList[j].adminSanctionedCount+'" attr_type = "not grounded" attr_location_name= "'+GLtbodyArr[i].locationName+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].subList[j].notgroundedCount+'</td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].adminSanctionedCount !=null && GLtbodyArr[i].subList[j].adminSanctionedCount>0){
										tableView+='<td><small style="color:#0FBE08">'+(parseFloat(GLtbodyArr[i].subList[j].notgroundedCount/GLtbodyArr[i].subList[j].adminSanctionedCount)*100).toFixed(1)+'</small></td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].undrProcessCount !=null && GLtbodyArr[i].subList[j].undrProcessCount>0){
										tableView+='<td class="schemsClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'"attr_location_type="'+locationType+'"attr_filter_value="'+GLtbodyArr[i].locationIdStr+'" attr_district_val="'+GLtbodyArr[i].districtId+'"attr_total_count = "'+GLtbodyArr[i].subList[j].undrProcessCount+'" attr_type = "Grounded" attr_location_name= "'+GLtbodyArr[i].locationName+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].subList[j].undrProcessCount+'</td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].adminSanctionedCount !=null && GLtbodyArr[i].subList[j].adminSanctionedCount>0){
										tableView+='<td><small style="color:#0FBE08">'+(parseFloat(GLtbodyArr[i].subList[j].undrProcessCount/GLtbodyArr[i].subList[j].adminSanctionedCount)*100).toFixed(1)+'</small></td>';
									}else{
										tableView+='<td> - </td>';
									}												
									if(GLtbodyArr[i].subList[j].completedCount !=null && GLtbodyArr[i].subList[j].completedCount>0){
										tableView+='<td class="schemsClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'" attr_location_type="'+locationType+'"attr_filter_value="'+GLtbodyArr[i].locationIdStr+'" attr_district_val="'+GLtbodyArr[i].districtId+'" attr_total_count = "'+GLtbodyArr[i].subList[j].adminSanctionedCount+'" attr_type = "completed" attr_location_name= "'+GLtbodyArr[i].locationName+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].subList[j].completedCount+'</td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].adminSanctionedCount !=null && GLtbodyArr[i].subList[j].adminSanctionedCount>0){
										tableView+='<td><small style="color:#0FBE08">'+(parseFloat(GLtbodyArr[i].subList[j].completedCount/GLtbodyArr[i].subList[j].adminSanctionedCount)*100).toFixed(1)+'</small></td>';
									}else{
										tableView+='<td> - </td>';
									}	
									if(GLtbodyArr[i].subList[j].commissionedCount !=null && GLtbodyArr[i].subList[j].commissionedCount>0){
										tableView+='<td class="schemsClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'" attr_location_type="'+locationType+'"attr_filter_value="'+GLtbodyArr[i].locationIdStr+'" attr_district_val="'+GLtbodyArr[i].districtId+'" attr_total_count = "'+GLtbodyArr[i].subList[j].adminSanctionedCount+'" attr_type = "Commissioned" attr_location_name= "'+GLtbodyArr[i].locationName+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].subList[j].commissionedCount+'</td>';
									}else{
										tableView+='<td> - </td>';
									}
									if(GLtbodyArr[i].subList[j].adminSanctionedCount !=null && GLtbodyArr[i].subList[j].adminSanctionedCount>0){
										tableView+='<td><small style="color:#0FBE08">'+(parseFloat(GLtbodyArr[i].subList[j].commissionedCount/GLtbodyArr[i].subList[j].adminSanctionedCount)*100).toFixed(1)+'</small></td>';
									}else{
										tableView+='<td> - </td>';
									}	
								}
							}
						}else{
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
							tableView+='<td> - </td>';tableView+='<td> - </td>';tableView+='<td> - </td>';
						}
					tableView+='</tr>';
				}
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	$("#"+blockId).html(tableView);
	if(blockId != 'statelevelBlockId'){
		$("#dataTable3"+blockId).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"order": [ 0, 'asc' ],
			"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			"scrollX":true,
			"fixedColumns":{
				"leftColumns":1,
			},
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			buttons: [
				{
					extend		:'csvHtml5',
					text		:'<i class="fa fa-file-text-o"></i>',
					titleAttr	: 'CSV',
					title		:  "ENC WORKS DASHBOARD",
					filename	:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}
}

function buildSchemeWiseWorkDetailsforState(result){
	var PWSAdminSanctionCount ="";
	var CPWSAdminSanctionCount="";
	$("#groundedID").html(parseInt(result[0].subList[0].groundedCount)+parseInt(result[0].subList[1].groundedCount));
	$("#underProgID").html(parseInt(result[0].subList[0].undrProcessCount)+parseInt(result[0].subList[1].undrProcessCount));
	$("#notGroundedID").html(parseInt(result[0].subList[0].notgroundedCount)+parseInt(result[0].subList[1].notgroundedCount));
	
	var pwsDataArr =[];var cpwsDataArr =[];
	for(var i in result[0].subList){
		if(result[0].subList[i].assetType == "PWS"){
			PWSAdminSanctionCount= result[0].subList[i].adminSanctionedCount;
			
			pwsDataArr.push({"name": 'Admin Sanctioned',"y": PWSAdminSanctionCount,color:'#5fc24f'});
			pwsDataArr.push({"name":  'Techincal Sanctioned',y: result[0].subList[i].technicalSanctionedCount,color:'#418CF0'});
			pwsDataArr.push({"name":  'Entrusted',y: result[0].subList[i].entrustedCount,color:'#FFBF00'});
			pwsDataArr.push({"name":  'Grounded',y: result[0].subList[i].groundedCount,color:'#ACFA58'});
			pwsDataArr.push({"name":  'Not Grounded',y: result[0].subList[i].notgroundedCount,color:'#DF013A'});
			pwsDataArr.push({"name":  'Under Progress',y: result[0].subList[i].undrProcessCount,color:'#FA5858'});
			pwsDataArr.push({"name": 'Completed',y:result[0].subList[i].completedCount,color:'#009999'});
			pwsDataArr.push({"name": 'Commissioned',y:result[0].subList[i].commissionedCount,color:'#009988'});
			
		}else if(result[0].subList[i].assetType == "CPWS"){
			CPWSAdminSanctionCount= result[0].subList[i].adminSanctionedCount;
			
			cpwsDataArr.push({"name": 'Admin Sanctioned',"y": CPWSAdminSanctionCount,color:'#5fc24f'});
			cpwsDataArr.push({"name":  'Techincal Sanctioned',y: result[0].subList[i].technicalSanctionedCount,color:'#418CF0'});
			cpwsDataArr.push({"name":  'Entrusted',y: result[0].subList[i].entrustedCount,color:'#FFBF00'});
			cpwsDataArr.push({"name":  'Grounded',y: result[0].subList[i].groundedCount,color:'#ACFA58'});
			cpwsDataArr.push({"name":  'Not Grounded',y: result[0].subList[i].notgroundedCount,color:'#DF013A'});
			cpwsDataArr.push({"name":  'Under Progress',y: result[0].subList[i].undrProcessCount,color:'#FA5858'});
			cpwsDataArr.push({"name": 'Completed',y:result[0].subList[i].completedCount,color:'#009999'});
			cpwsDataArr.push({"name": 'Commissioned',y:result[0].subList[i].commissionedCount,color:'#009988'});
			
		}
	}
	
	$("#habitationWorksPWS").highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
	   
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			type: 'category'
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			allowDecimals: false,
			min: 0,
			title: {
				text: ''
			}

		},
		legend: {
			enabled: false
		},
		
		plotOptions: {
				column: {
					//colorByPoint: true
					dataLabels: {
						useHTML:true,
						enabled: true,
						color: '#000',
						style: {
							fontWeight: '',
							fontSize:'9px'
						},
						align: 'center',
						formatter: function() {
							if(this.point.name !="Admin Sanctioned"){
								if(this.y == 0){
									return null;
								}else{
									var name=this.point.name;
									var pcnt = (this.y / PWSAdminSanctionCount) * 100;
									return '<span>'+this.y+'<br>('+Highcharts.numberFormat(pcnt)+'%)</span>';
								}
							}else{
								return '<span>'+this.y+'</span>';
							}
						}
					}
				}
			},

		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
		},

		series: [{
			name: 'Works',
			colorByPoint: true,
			data: pwsDataArr
		}]
	});
	
	$("#habitationWorksCPWS").highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
	   
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			type: 'category'
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			allowDecimals: false,
			min: 0,
			title: {
				text: ''
			}

		},
		legend: {
			enabled: false
		},
		
		plotOptions: {
				column: {
					//colorByPoint: true
					dataLabels: {
						useHTML:true,
						enabled: true,
						color: '#000',
						style: {
							fontWeight: '',
							fontSize:'9px'
						},
						align: 'center',
						formatter: function() {
							if(this.point.name !="Admin Sanctioned"){
								if(this.y == 0){
									return null;
								}else{
									var name=this.point.name;
									var pcnt = (this.y / CPWSAdminSanctionCount) * 100;
									return '<span>'+this.y+'<br>('+Highcharts.numberFormat(pcnt)+'%)</span>';
								}
							}else{
								return '<span>'+this.y+'</span>';
							}
						}
					}
				}
			},

		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
		},

		series: [{
			name: 'Works',
			colorByPoint: true,
			data: cpwsDataArr
		}]
	});
	
}

function getExceedWorkDetailsLocationWise(blockId,locationType,type,statusType,workType){
	if(type != 'table'){
		$("#ExceededTargetDetailsTotal").html(spinner);
		$("#ExceededTargetDetails").html(spinner);
	}else{
		$("#"+blockId).html(spinner);
	}
	var schemeValArr=[];
	var schemeVal =$("#schemeDivId").val();
	if(schemeVal==null || schemeVal==""){
		schemeValArr=[];
	}else{
		for(var i in schemeVal){
				var schemeId="";
				if(schemeVal[i].length ==1){
					schemeId="0"+schemeVal[i]
				}else{
					schemeId=schemeVal[i];
				}
				schemeValArr.push(schemeId);
			}
	}
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
			
 	var json = {
			year:yearVal,
			fromDateStr:glStartDate,
			toDateStr:glEndDate,
			districtValue:"",
			filterType:"",
			filterValue:"",
			locationType:locationType, 
			assetTypeList:['CPWS','PWS'],
			"status" : statusType,
			"schemeIdStr":schemeValArr
			}
	
	$.ajax({                
		type:'POST',    
		url: 'getExceedWorkDetailsLocationWise2',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(ajaxresp){
	 	if(ajaxresp !=null && ajaxresp.length>0){
			if(type != 'table'){
				buildGraph(ajaxresp);
			}else{
				buildExceededWorksBlocks(ajaxresp,blockId,locationType,statusType,workType);
			}
		}else{
			$("#ExceededTargetDetailsTotal,#ExceededTargetDetails").html("No Data Available");
			$("#"+blockId).html("No Data Available");
		}
	});
}
function buildExceededWorksBlocks(GLtbodyArr,blockId,locationType,statusType,workType){
	var tableView='';
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered" id="dataTable'+blockId+locationType+'">';
			tableView+='<thead class="text-capital">';
				var totalCPWSCount=0;var totalPWSInTime=0;var totalPWSExceed=0;
				var totalPWSCount=0;var totalCPWSInTime=0;var totalCPWSExceed=0;
				var length = (GLtbodyArr[0].subList[0].subList.length+1)*2;
				for(var i in GLtbodyArr){
					for(var j in GLtbodyArr[i].subList){
						if(GLtbodyArr[i].subList[j].assetType == "CPWS"){
							totalCPWSCount = totalCPWSCount+GLtbodyArr[i].subList[j].count;
							totalCPWSExceed=totalCPWSExceed+GLtbodyArr[i].subList[j].ongoingPWSExceededCount;
							totalCPWSInTime= totalCPWSInTime+GLtbodyArr[i].subList[j].belowOneCount;
						}else{
							totalPWSCount = totalPWSCount+GLtbodyArr[i].subList[j].count;
							totalPWSExceed=totalPWSExceed+GLtbodyArr[i].subList[j].ongoingPWSExceededCount;
							totalPWSInTime= totalPWSInTime+GLtbodyArr[i].subList[j].belowOneCount;
						}
						
						
					}
				}
				tableView+='<tr>';
					tableView+='<th rowspan="3">'+locationType+'</th>';
					for(var i in GLtbodyArr[0].subList){
						if(GLtbodyArr[0].subList[i].assetType == "CPWS"){
							tableView+='<th colspan="'+length+'" class="" >'+GLtbodyArr[0].subList[i].assetType+'&nbsp;-&nbsp;Works('+totalCPWSCount+')&nbsp;<span style="margin-left: 226px;">In Time - '+totalCPWSInTime+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Exceeded - '+totalCPWSExceed+'</span></th>';
						}else{
							tableView+='<th colspan="'+length+'" class="" >'+GLtbodyArr[0].subList[i].assetType+'&nbsp;-&nbsp;Works('+totalPWSCount+')&nbsp;<span style="margin-left: 226px;">In Time - '+totalPWSInTime+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Exceeded - '+totalPWSExceed+' </span></th>';
							
							
						}
						
					}
				tableView+='</tr>'
				tableView+='<tr>';
					
					tableView+='<th colspan="2" class="">TOTAL Exceeded</th>';
					
					for(var i in GLtbodyArr[0].subList[0].subList){
						if(GLtbodyArr[0].subList[0].subList[i].name=="In Time"){
							tableView+='<th colspan="2" style="background-color:#AAFFAF">'+GLtbodyArr[0].subList[0].subList[i].name+'</th>';
						}else{
							tableView+='<th colspan="2" style="background-color:#ff7d79">'+GLtbodyArr[0].subList[0].subList[i].name+'</th>';
						}
						
					}
					tableView+='<th colspan="2" class="">TOTAL Exceeded</th>';
					
					for(var i in GLtbodyArr[0].subList[0].subList){
						if(GLtbodyArr[0].subList[0].subList[i].name=="In Time"){
							tableView+='<th colspan="2" style="background-color:#AAFFAF">'+GLtbodyArr[0].subList[0].subList[i].name+'</th>';
						}else{
							tableView+='<th colspan="2" style="background-color:#ff7d79">'+GLtbodyArr[0].subList[0].subList[i].name+'</th>';
						}
						
					}		
				tableView+='</tr>'
				tableView+='<tr>';
					
					tableView+='<th>Works</th>';
					tableView+='<th><span class="colspanLenInc'+locationType+'"><i class="fa fa-inr m_top5" aria-hidden="true" style="font-size:12px"></i>&nbsp;in&nbsp;Lac<span>';
					tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </span></th>';
					
					for(var i in GLtbodyArr[0].subList[0].subList){
						if(GLtbodyArr[0].subList[0].subList[i].name=="In Time"){
							tableView+='<th style="background-color:#AAFFAF">Works</th>';
							
							tableView+='<th  style="background-color:#AAFFAF"><span class="colspanLenInc'+locationType+'"><i class="fa fa-inr m_top5" aria-hidden="true" style="font-size:12px"></i>&nbsp;in&nbsp;Lac<span>';
							
							tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </span></th>';
						}else{
							tableView+='<th style="background-color:#ff7d79">Works</th>';
							
							tableView+='<th  style="background-color:#ff7d79"><span class="colspanLenInc'+locationType+'"><i class="fa fa-inr m_top5" aria-hidden="true" style="font-size:12px"></i>&nbsp;in&nbsp;Lac<span>';
							
							tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </span></th>';
						}
					
					}
					
					tableView+='<th class="">Works</th>';
					
					tableView+='<th><span class="colspanLenInc'+locationType+'"><i class="fa fa-inr m_top5" aria-hidden="true" style="font-size:12px"></i>&nbsp;in&nbsp;Lac<span>';
					tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </span></th>';
					
					for(var i in GLtbodyArr[0].subList[0].subList){
						
						if(GLtbodyArr[0].subList[0].subList[i].name=="In Time"){
							tableView+='<th style="background-color:#AAFFAF">Works</th>';
							
							tableView+='<th  style="background-color:#AAFFAF"><span class="colspanLenInc'+locationType+'"><i class="fa fa-inr m_top5" aria-hidden="true" style="font-size:12px"></i>&nbsp;in&nbsp;Lac<span>';
							
							tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </span></th>';
						}else{
							tableView+='<th style="background-color:#ff7d79">Works</th>';
							
							tableView+='<th  style="background-color:#ff7d79"><span class="colspanLenInc'+locationType+'"><i class="fa fa-inr m_top5" aria-hidden="true" style="font-size:12px"></i>&nbsp;in&nbsp;Lac<span>';
							
							tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </span></th>';
						}
					
					}
				tableView+='</tr>'
			tableView+='</thead>';
			tableView+='</tbody>';
				for(var i in GLtbodyArr){
				tableView+='<tr>';
					tableView+='<td>'+GLtbodyArr[i].name+'</td>';
					for(var j in GLtbodyArr[i].subList){
						var cpwsPerc =0;
						var pswsPerc=0;
						if(GLtbodyArr[i].subList[j].assetType == "CPWS"){
							
								cpwsPerc = (GLtbodyArr[i].subList[j].count/totalCPWSCount*100).toFixed(2);
							if(GLtbodyArr[i].subList[j].count !=null && GLtbodyArr[i].subList[j].count>0){
								tableView+='<td><span  class="schemeClickView"  attr_status="CPWS" attr_location_type="'+locationType+'" attr_filter_value="" attr_district_val="'+GLtbodyArr[i].locationIdStr+'" attr_total_count = "'+GLtbodyArr[i].subList[j].count+'" attr_type = "'+workType+'_exccedSchemes" attr_location_name= "'+GLtbodyArr[i].name+'" style="cursor:pointer;text-decoration:underline" >'+GLtbodyArr[i].subList[j].ongoingPWSExceededCount+'</span><br/></td>';
							}else{
								tableView+='<td> - </td>';
							}
							
						}else{
							
							pswsPerc = (GLtbodyArr[i].subList[j].count/totalPWSCount*100).toFixed(2);
							if(GLtbodyArr[i].subList[j].count !=null && GLtbodyArr[i].subList[j].count>0){
								tableView+='<td><span  class="schemeClickView"  attr_status="PWS" attr_location_type="'+locationType+'" attr_filter_value="" attr_district_val="'+GLtbodyArr[i].locationIdStr+'" attr_total_count = "'+GLtbodyArr[i].subList[j].count+'" attr_type = "'+workType+'_exccedSchemes" attr_location_name= "'+GLtbodyArr[i].name+'" style="cursor:pointer;text-decoration:underline" >'+GLtbodyArr[i].subList[j].ongoingPWSExceededCount+'</span><br/></td>';
							}else{
								tableView+='<td> - </td>';
							}
							
						}
						if(GLtbodyArr[i].subList[j].ongoingPWSExceededAmount !=null && GLtbodyArr[i].subList[j].ongoingPWSExceededAmount>0){
							tableView+='<td><span class="colspanLenInc'+locationType+'">'+GLtbodyArr[i].subList[j].ongoingPWSExceededAmount+'<span>';
							tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </span></td>';

						}else{
							tableView+='<td><span class="colspanLenInc'+locationType+'"></span> - <span class="colspanLen" style="display:none"> - </span></td>';
						}
					
						for(var k in GLtbodyArr[i].subList[j].subList){
							if(GLtbodyArr[i].subList[j].subList[k].name=="In Time"){
								if(GLtbodyArr[i].subList[j].subList[k].count !=null && GLtbodyArr[i].subList[j].subList[k].count>0){
									tableView+='<td style="background-color:#AAFFAF;"><span  class="schemeClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'" attr_location_type="'+locationType+'" attr_filter_value="'+GLtbodyArr[i].subList[j].subList[k].name+'" attr_district_val="'+GLtbodyArr[i].locationIdStr+'" attr_total_count = "'+GLtbodyArr[i].subList[j].subList[k].count+'" attr_type = "'+workType+'_exccedSchemes" attr_location_name= "'+GLtbodyArr[i].name+'" style="cursor:pointer;text-decoration:underline;font-weight:bold !important;" >'+GLtbodyArr[i].subList[j].subList[k].count+'</span><br/> <small style="color:green;font-weight:bold !important;">'+GLtbodyArr[i].subList[j].subList[k].percentage+' %</small></td>';
								}else{
									tableView+='<td style="background-color:#AAFFAF;"> - </td>';
								}
								
								if(GLtbodyArr[i].subList[j].subList[k].sanctionedAmount !=null && GLtbodyArr[i].subList[j].subList[k].sanctionedAmount>0){
									tableView+='<td style="background-color:#AAFFAF;font-weight:bold !important;"><span class="colspanLenInc'+locationType+'">'+GLtbodyArr[i].subList[j].subList[k].sanctionedAmount+'';
									tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </td>';
								}else{
									tableView+='<td style="background-color:#AAFFAF;font-weight:bold !important;"><span class="colspanLenInc'+locationType+'"> - </span><span class="colspanLen" style="display:none"> - </span> - </td>';
								}
							}else{
								if(GLtbodyArr[i].subList[j].subList[k].count !=null && GLtbodyArr[i].subList[j].subList[k].count>0){
									tableView+='<td style="background-color:#ff7d79;font-weight:bold !important;"><span  class="schemeClickView"  attr_status="'+GLtbodyArr[i].subList[j].assetType+'" attr_location_type="'+locationType+'" attr_filter_value="'+GLtbodyArr[i].subList[j].subList[k].name+'" attr_district_val="'+GLtbodyArr[i].locationIdStr+'" attr_total_count = "'+GLtbodyArr[i].subList[j].subList[k].count+'" attr_type = "'+workType+'_exccedSchemes" attr_location_name= "'+GLtbodyArr[i].name+'" style="cursor:pointer;text-decoration:underline" >'+GLtbodyArr[i].subList[j].subList[k].count+'</span><br/> <small style="color:green;">'+GLtbodyArr[i].subList[j].subList[k].percentage+' %</small></td>';
								}else{
									tableView+='<td style="background-color:#ff7d79;"> - </td>';
								}
								
								if(GLtbodyArr[i].subList[j].subList[k].sanctionedAmount !=null && GLtbodyArr[i].subList[j].subList[k].sanctionedAmount>0){
									tableView+='<td style="background-color:#ff7d79;font-weight:bold !important;"><span class="colspanLenInc'+locationType+'">'+GLtbodyArr[i].subList[j].subList[k].sanctionedAmount+'';
									tableView+='<span class="colspanLen'+locationType+'" style="display:none"> - </td>';
								}else{
									tableView+='<td style="background-color:#ff7d79;"><span class="colspanLenInc'+locationType+'"> - </span><span class="colspanLen" style="display:none"> - </span> - </td>';
								}

							}
						}
					}
				tableView+='</tr>';
				}
				tableView+='</tbody>';				
		tableView+='</table>';
	tableView+='</div>';
	$("#"+blockId).html(tableView);
	$("#dataTable"+blockId+locationType).dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"order": [ 0, 'asc' ],
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"scrollX":true,
		"fixedColumns":{
			"leftColumns":1,
		},
		buttons: [
			{
				extend		:'csvHtml5',
				text		:'<i class="fa fa-file-text-o"></i>',
				titleAttr	: 'CSV',
				title		:  "ENC WORKS DASHBOARD",
				filename	:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
	
}
function buildGraph(result)
{
	var colorsArr=['#EE6CA9','#C61379'];
	var cateArr = [];
	var pwsArr = [];
	var cpwsArr = [];
	var totalWorksPWS = 0;
	var OnGoingExceededWorks =[];
	var CompletedExceededWorks =[];
	var CommissionedExceededWorks =[];
	var totalWorksCPWS = 0;
	var totalAmountPWS = 0;
	var totalAmountCPWS = 0;
	
	var OnGoingExceededWorks='';
	var CompletedExceededWorks='';
	var CommissionedExceededWorks='';
	
	for(var i in result[0].subList)
	{
		
		if(result[0].subList[i].assetType == 'PWS'){
			totalWorksPWS = totalWorksPWS + result[0].subList[i].count;
			
		}else if(result[0].subList[i].assetType == 'CPWS'){
			totalWorksCPWS = totalWorksCPWS + result[0].subList[i].count;
			
		}
		
		for( var j in result[0].subList[i].subList){
			cateArr.push(result[0].subList[i].subList[j].name);
			if(result[0].subList[i].assetType == 'PWS'){
				pwsArr.push({"y":result[0].subList[i].subList[j].count,"extra":""+result[0].subList[i].subList[j].ongoingPWSExceededCount+"-"+result[0].subList[i].subList[j].completedPWSExceededCount+"-"+result[0].subList[i].subList[j].commissionedPWSExceededCount});
			}else if(result[0].subList[i].assetType == 'CPWS'){
				cpwsArr.push({"y":result[0].subList[i].subList[j].count,"extra":""+result[0].subList[i].subList[j].ongoingPWSExceededCount+"-"+result[0].subList[i].subList[j].completedPWSExceededCount+"-"+result[0].subList[i].subList[j].commissionedPWSExceededCount});
			}
		}
	}
	$("#ExceededTargetDetailsTotal").highcharts({
		chart: {
			type: 'column'
			
		},
		title: {
			text: null
		},
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			categories:["Total"]
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			allowDecimals: false,
			min: 0,
			title: {
				text: null
			}
		},
		tooltip: {
			formatter: function () {
				return '<b>' + this.x + '</b><br/>' +
					this.series.name + ': ' + this.y + '<br/>'
					//+'Total: ' + this.point.stackTotal;
			}
		},
		plotOptions: {
			column: {
				stacking: 'normal'
			}
		},
		series: [{
			name: 'PWS',
			data: [totalWorksPWS],
			stack: 'PWS',
			color:'#EE6CA9'
		}, {
			name: 'CPWS',
			data: [totalWorksCPWS],
			stack: 'CPWS',
			color:'#C61379'
		}]
	});
	$("#ExceededTargetDetails").highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: null
		},
		xAxis: {
			categories:cateArr
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			allowDecimals: false,
			min: 0,
			title: {
				text: null
			}
		},
		tooltip: {
			formatter: function () {
				var value = (this.point.extra).split("-");
				return '<b>' + this.x + '</b><br/>' +
					this.series.name + ': ' + this.y + '<br/>' +
					//'Total: ' + this.point.stackTotal + '<br/>' +
					
					'OnGoingExceededWorks :' +value[0]+ '<br/>' +
					'CompletedExceededWorks :' +value[1]+ '<br/>' +
					'CommissionedExceededWorks :' +value[2]+ '';
			}
		},
		plotOptions: {
			column: {
				stacking: 'normal'
			}
		},
		series: [{
			name: 'PWS',
			data: pwsArr,
			stack: 'PWS',
			color:'#EE6CA9'
		}, {
			name: 'CPWS',
			data: cpwsArr,
			stack: 'CPWS',
			color:'#C61379'
			}]
	});
}

function getNotGroundedWorkDetailsLocationWise(blockId,locationType,type,empty,workType){
	if(type == 'graph'){
		$("#ExceededNotGroundedTotal").html(spinner);
		$("#NotGroundedTargetDetails").html(spinner);
	}else{
		$("#"+blockId).html(spinner);
	}
	
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	var schemeValArr=[];
	var schemeVal =$("#schemeDivId").val();
	if(schemeVal==null || schemeVal==""){
		schemeValArr=[];
	}else{
		for(var i in schemeVal){
			var schemeId="";
			if(schemeVal[i].length ==1){
				schemeId="0"+schemeVal[i]
			}else{
				schemeId=schemeVal[i];
			}
			schemeValArr.push(schemeId);
		}
	}
 	var json = {
		year:yearVal,
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
		districtValue:"",
		filterType:"",
		filterValue:"",
		locationType:locationType, 
		schemeIdStr:schemeValArr
		
	}
	
	$.ajax({                
		type:'POST',    
		url: 'getNotGroundedWorkDetailsLocationWise',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(ajaxresp){
		
	 	if(ajaxresp !=null && ajaxresp.length>0){
			if(type=='graph'){
				buildnotGroundedGraph(ajaxresp);
			}else{
				buildExceededWorksBlocks(ajaxresp,blockId,locationType,type,workType);
			}
		}else{
			$("#ExceededNotGroundedTotal,#NotGroundedTargetDetails").html("No Data Available");
			$("#"+blockId).html("No Data Available");
		}
	});
}


function buildnotGroundedGraph(result)
{
	var colorsArr=['#EE6CA9','#C61379'];
	var cateArr = [];
	var pwsArr = [];
	var cpwsArr = [];
	var totalWorksPWS = 0;
	var OnGoingExceededWorks =[];
	var CompletedExceededWorks =[];
	var CommissionedExceededWorks =[];
	var totalWorksCPWS = 0;
	var totalAmountPWS = 0;
	var totalAmountCPWS = 0;
	
	var OnGoingExceededWorks='';
	var CompletedExceededWorks='';
	var CommissionedExceededWorks='';
	
	for(var i in result[0].subList)
	{
		
		
		if(result[0].subList[i].assetType == 'PWS'){
			totalWorksPWS = totalWorksPWS + result[0].subList[i].count;
			
		}else if(result[0].subList[i].assetType == 'CPWS'){
			totalWorksCPWS = totalWorksCPWS + result[0].subList[i].count;
			
		}
		
		for( var j in result[0].subList[i].subList){
			cateArr.push(result[0].subList[i].subList[j].name);
			if(result[0].subList[i].assetType == 'PWS'){
				pwsArr.push({"y":result[0].subList[i].subList[j].count,"extra":""+result[0].subList[i].subList[j].ongoingPWSExceededCount+"-"+result[0].subList[i].subList[j].completedPWSExceededCount+"-"+result[0].subList[i].subList[j].commissionedPWSExceededCount});
			}else if(result[0].subList[i].assetType == 'CPWS'){
				cpwsArr.push({"y":result[0].subList[i].subList[j].count,"extra":""+result[0].subList[i].subList[j].ongoingPWSExceededCount+"-"+result[0].subList[i].subList[j].completedPWSExceededCount+"-"+result[0].subList[i].subList[j].commissionedPWSExceededCount});
			}
		}
	}
	$("#ExceededNotGroundedTotal").highcharts({
		chart: {
			type: 'column'
			
		},
		title: {
			text: null
		},
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			categories:["Total"]
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			allowDecimals: false,
			min: 0,
			title: {
				text: null
			}
		},
		tooltip: {
			formatter: function () {
				return '<b>' + this.x + '</b><br/>' +
					this.series.name + ': ' + this.y + '<br/>'
					//+'Total: ' + this.point.stackTotal;
			}
		},
		plotOptions: {
			column: {
				stacking: 'normal'
			}
		},
		series: [{
			name: 'PWS',
			data: [totalWorksPWS],
			stack: 'PWS',
			color:'#EE6CA9'
		}, {
			name: 'CPWS',
			data: [totalWorksCPWS],
			stack: 'CPWS',
			color:'#C61379'
		}]
	});
	$("#NotGroundedTargetDetails").highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: null
		},
		xAxis: {
			categories:cateArr
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			allowDecimals: false,
			min: 0,
			title: {
				text: null
			}
		},
		tooltip: {
			formatter: function () {
				var value = (this.point.extra).split("-");
				return '<b>' + this.x + '</b><br/>' +
					this.series.name + ': ' + this.y + '<br/>' ;
			}
		},
		plotOptions: {
			column: {
				stacking: 'normal'
			}
		},
		series: [{
			name: 'PWS',
			data: pwsArr,
			stack: 'PWS',
			color:'#EE6CA9'
		}, {
			name: 'CPWS',
			data: cpwsArr,
			stack: 'CPWS',
			color:'#C61379'
			}]
		});
	
}

$(document).on("click",".exceedWorkTypeCls",function(e){
	var statusType = $(this).val();
	if(statusType == ""){
		$(".headingExceedId").html("All Exceeded Works")
	}else{
		$(".headingExceedId").html("OnGoing Exceeded Works")
	}	
	getExceedWorkDetailsLocationWise("state","state","graph",statusType,"onGoing");
	levelWiseOverview();
});

// onClick of tab change
 $(document).on("click",".workWiseDetailsCls li",function(e){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	var locationType = $(this).attr("attr_location_type");
	var statusType1 =$('input:radio[name=optradio1]:checked').val();
	if(type == "works"){
		if(locationType == "state"){
			getSchemeWiseWorkDetails(locationType+'levelBlockId','state','table');
		}
		else if(locationType == "district"){
			getSchemeWiseWorkDetails(locationType+'levelBlockId','district','table');
			
		}
		else if(locationType == "constituency"){
			getSchemeWiseWorkDetails(locationType+'levelBlockId','constituency','table');
		}
		else if(locationType == "mandal"){
			getSchemeWiseWorkDetails(locationType+'levelBlockId','mandal','table');
		}
	}else if(type == "exceed"){
		if(locationType == "state"){
			getExceedWorkDetailsLocationWise(locationType+'levelBlockId','state','table',statusType1,"onGoing");
		}
		else if(locationType == "district"){
			getExceedWorkDetailsLocationWise(locationType+'levelBlockId','district','table',statusType1,"onGoing");
		}
		else if(locationType == "constituency"){
			
			getExceedWorkDetailsLocationWise(locationType+'levelBlockId','constituency','table',statusType1,"onGoing");
		}
		else if(locationType == "mandal"){
			getExceedWorkDetailsLocationWise(locationType+'levelBlockId','mandal','table',statusType1,"onGoing");
		}
	}else if(type == "notGrounded"){
		if(locationType == "state"){
			getNotGroundedWorkDetailsLocationWise(locationType+'levelBlockId','state','table',"","notGrounded");
		}
		else if(locationType == "district"){
			getNotGroundedWorkDetailsLocationWise(locationType+'levelBlockId','district','table',"","notGrounded");
		}
		else if(locationType == "constituency"){
			getNotGroundedWorkDetailsLocationWise(locationType+'levelBlockId','constituency','table',"","notGrounded");
		}
		else if(locationType == "mandal"){
			getNotGroundedWorkDetailsLocationWise(locationType+'levelBlockId','mandal','table',"","notGrounded");
			
		}
	}
});

$(document).on("click",".schemsClickView",function(){
	
	var status = $(this).attr("attr_status");
	var totalCount=$(this).attr("attr_total_count");
	var workStatus=$(this).attr("attr_type");
	var locationValue = $(this).attr("attr_filter_value");
	var locationType=$(this).attr("attr_location_type");
	var districtVal=$(this).attr("attr_district_val");
	var locationName=$(this).attr("attr_location_name");
	
		$("#modalHablitationDivId").modal('show');
		$("#modalSchemsExceedTable").html('');
		$("#modalReviewReportTable").html('');
		$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+locationName+"&nbsp;&nbsp;"+locationType+"&nbsp;&nbsp;"+status+"&nbsp;"+"("+workStatus+")&nbsp;&nbsp;Overview</h4>");
		getOnclickWorkSchemsDetails(status,workStatus,totalCount,locationValue,locationType,
		districtVal,"","");
	
});
/* class ="grantClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="adminSanctioned" style="cursor:pointer;text-decoration:underline" */
$(document).on("click",".grantClickView",function(){

	var workstatus = $(this).attr("attr_type");
	var grantType=$(this).attr("attr_grant_type");
	var grantId =($(this).attr("attr_id"));
		$("#modalHablitationDivId").modal('show');
		$("#modalgrantSchemsTable").html('');
		$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+grantType+"&nbsp;&nbsp;"+workstatus+"&nbsp;&nbsp;Overview</h4>");
		getOnclickWorkSchemsDetails("",workstatus,"","","","",grantId,"grant");
	
});

$(document).on("click",".schemeClickView",function(){
	 
	var workStatus=$(this).attr("attr_type");
	console.log(workStatus);
	var statusType=""
	var assetType = $(this).attr("attr_status");
	var totalCount=$(this).attr("attr_total_count");
	var exceededDuration=$(this).attr("attr_filter_value");
	var locationValue = $(this).attr("attr_district_val");
	var locationType=$(this).attr("attr_location_type");
	var locationName=$(this).attr("attr_location_name");
	//assetType,locationType,exceededDuration,locationValue,statusType
	
	if(workStatus == "onGoing_exccedSchemes"){
		$("#modalHablitationDivId").modal('show');
		$("#modalSchemsExceedTable").html('');
		$("#modalSchemsTable").html('');
		$("#modalReviewReportTable").html('');
		$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+locationName+"&nbsp;&nbsp;"+locationType+"&nbsp;&nbsp;"+assetType+"&nbsp;"+"("+exceededDuration+")&nbsp;&nbsp;Overview</h4>");
		getOnClickExceedWorkDetails(assetType,locationType,exceededDuration,locationValue,statusType);
	}else if(workStatus == "notGrounded_exccedSchemes"){
		$("#modalHablitationDivId").modal('show');
		$("#modalSchemsTable").html('');
		$("#modalSchemsExceedTable").html('');
		$("#modalReviewReportTable").html('');
		$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+locationName+"&nbsp;&nbsp;"+locationType+"&nbsp;&nbsp;"+assetType+"&nbsp;"+"("+exceededDuration+")&nbsp;&nbsp;Overview</h4>");
		getOnClickNotGroubnWorkDetails(assetType,locationType,exceededDuration,locationValue,statusType);
	}
	
});
function getOnclickWorkSchemsDetails(status,workStatus,totalCount,locationValue,locationType,districtVal,grantId,type){
	if(type =="grant"){
		$("#modalSchemsTable").html(spinner);
	}else{
		$("#modalSchemsTable").html(spinner);
	}
	
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	var schemeValArr=[];
	if(grantId !=null && grantId.length>0){
		var schemeId="";
		if(grantId.length ==1){
			schemeId="0"+grantId
		}else{
			schemeId=grantId
		}
		schemeValArr.push(schemeId);
	}else{
		var schemeVal =$("#schemeDivId").val();
		if(schemeVal==null || schemeVal==""){
			schemeValArr=[];
		}else{
			for(var i in schemeVal){
					 var schemeId="";
					if(schemeVal[i].length ==1){
						schemeId="0"+schemeVal[i]
					}else{
						schemeId=schemeVal[i];
					} 
					schemeValArr.push(schemeId);
				}
		}
	}
	
	var filterValue ='';
	var filterType = '';	
	if(locationType == "state"){
		filterValue="";
		filterType="";
	}else{
		filterValue = locationValue;
		filterType = locationType;
	}
	var districtValStr="";	
	if(locationType == "mandal"){
		districtValStr = districtVal;
		
	}
	
	var json = {
		year:yearVal,
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
		workStatus:workStatus,
		districtValue:districtValStr,
		filterType:filterType,
		filterValue:filterValue,
		assetType:status,
		"schemeIdStr":schemeValArr
	}
	
	$.ajax({                
		type:'POST',    
		url: 'getLocattionWiseOnclickWorkDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildOnclickWorkSchemsDetails(result,status,workStatus,totalCount);
		}else{
			
			$("#modalSchemsTable").html('No Data Available');
		}
		
	});
}

//schems build
function buildOnclickWorkSchemsDetails(result,status,workStatus,totalCount){
	var tableView='';
	tableView+='<div class="table-responsive">';
	tableView+='<table class="table table-bordered exceedCls table_custom_SC" id="dataTableSchems">';
		tableView+='<thead>';
		tableView+='<tr>';
				tableView+='<th>Work ID</th>';
				tableView+='<th>Work NAME</th>';
				tableView+='<th>DISTRICT</th>';
				tableView+='<th>CONSTITUENCY</th>';
				tableView+='<th>MANDAL</th>';
				tableView+='<th>HABITATIONS NAME</th>';
				tableView+='<th>SANCTIONED AMOUNT</th>';
			 
				if(workStatus !="not grounded"){
				tableView+='<th>TARGET DATE</th>';
				tableView+='<th>ADMIN SANCTIONED DATE</th>';
				tableView+='<th>TECHNICAL SANCTIONED DATE</th>';
				tableView+='<th>ENTRUSTED DATE</th>';
				tableView+='<th>GROUNDED DATE</th>';
				tableView+='<th>COMPLETION DATE</th>';
				}else{
					tableView+='<th>ADMIN DATE</th>';
					tableView+='<th>TARGET DATE</th>';
				} 
				
			tableView+='</tr>';
			
		tableView+='</thead>';
		tableView+='<tbody>';
		for(var i in result){
			tableView+='<tr>';
					tableView+='<td>'+result[i].workId+'</td>';
					tableView+='<td style="text-align:left !important;">'+result[i].workName+'</td>';
					tableView+='<td>'+result[i].districtName+'</td>';
					tableView+='<td>'+result[i].constituencyName+'</td>';
					tableView+='<td>'+result[i].mandalName+'</td>';
					tableView+='<td>'+result[i].habitationName+'</td>';
					if(typeof result[i].sacntionedAmount === undefined ||typeof result[i].sacntionedAmount =="undefined" || result[i].sacntionedAmount =='' ){
						tableView+='<td>-</td>';
					}else{
						tableView+='<td>'+result[i].sacntionedAmount+'</td>';
					}
					if(workStatus !="not grounded"){
						if(typeof result[i].targetDate === undefined ||typeof result[i].targetDate =="undefined" || result[i].targetDate =='' ){
							tableView+='<td>-</td>';
						}else{
							tableView+='<td>'+result[i].targetDate+'</td>';
						}
						if(typeof result[i].adminDate === undefined ||typeof result[i].adminDate =="undefined" || result[i].adminDate ==''){
							tableView+='<td>-</td>';
						}else{
							tableView+='<td>'+result[i].adminDate+'</td>';
						}
						if(typeof result[i].technicalSanctionDate === undefined ||typeof result[i].technicalSanctionDate =="undefined" || result[i].technicalSanctionDate ==''){
							tableView+='<td>-</td>';
						}else{
							tableView+='<td>'+result[i].technicalSanctionDate+'</td>';
						}
						if(typeof result[i].entrustedDate === undefined ||typeof result[i].entrustedDate =="undefined" || result[i].entrustedDate ==''){
							tableView+='<td>-</td>';
						}else{
							tableView+='<td>'+result[i].entrustedDate+'</td>';
						}
						if(typeof result[i].groundingDate === undefined ||typeof result[i].groundingDate =="undefined" || result[i].groundingDate =='' ){
							tableView+='<td>-</td>';
						}else{
							tableView+='<td>'+result[i].groundingDate+'</td>';
						}
						if(typeof result[i].completionDate === undefined ||typeof result[i].completionDate =="undefined" || result[i].completionDate =='' ){
							tableView+='<td>-</td>';
						}else{
							tableView+='<td>'+result[i].completionDate+'</td>';
						}						
					}else{
						if(typeof result[i].adminDate === undefined ||typeof result[i].adminDate =="undefined" || result[i].adminDate =='' ){
							tableView+='<td>-</td>';
						}else{
							tableView+='<td>'+result[i].adminDate+'</td>';
						}
						if(typeof result[i].targetDate === undefined ||typeof result[i].targetDate =="undefined" || result[i].targetDate =='' ){
							tableView+='<td>-</td>';
						}else{
						tableView+='<td>'+result[i].targetDate+'</td>';
						}
					} 
				tableView+='</tr>';
		}
		tableView+='</tbody>';
	tableView+='</table>';
	tableView+='</div>';
	$("#modalSchemsTable").html(tableView);
	$("#dataTableSchems").dataTable({
		"order": [ 0, 'desc' ],
		"iDisplayLength" : 10,
		"aLengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],
		"scrollX":true,
		"fixedColumns":{ "leftColumns":6},
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Rural Water Supply',
				filename:  'Rural Water Supply'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}			
		]
	});
}

function getOnClickExceedWorkDetails(assetType,locationType,exceededDuration,locationValue,statusType){
	$("#modalSchemsExceedTable").html(spinner);
	$('.exceedWorkTypeCls').each(function(i, obj){
		 if($(this).is(':checked')){
			statusType = $(this).val();
		 }
	});
	var yearVal="";
	var districtId="";
	var locationVal ="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
		
	}
	var schemeValArr=[];
	var schemeVal =$("#schemeDivId").val();
	if(schemeVal==null || schemeVal==""){
		schemeValArr=[];
	}else{
		for(var i in schemeVal){
			var schemeId="";
			if(schemeVal[i].length ==1){
				schemeId="0"+schemeVal[i]
			}else{
				schemeId=schemeVal[i];
			}
			schemeValArr.push(schemeId);
		}
	}
	if(locationType=='mandal'){
		districtId=locationValue.substr(0,2);
		 locationVal=locationValue.substr(2,3);
	}else{
		locationVal=locationValue;
	}
 	var json = {
		"assetType":assetType,
		"fromDateStr":glStartDate,
		"toDateStr":glEndDate,
		"locationType":locationType,
		"exceededDuration":exceededDuration,
		"locationIdStr":locationVal,
		"status" : statusType,
		"year": yearVal,
		"districtValue":districtId,
		"schemeIdStr":schemeValArr
		 
	}
	
	$.ajax({                
		type:'POST',    
		url: 'getOnClickExceedWorkDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
	 	if(result !=null && result.length>0){
			buildOnclickWorkSchemsExccedDetails(result,exceededDuration);
		}else{
			
			$("#modalSchemsExceedTable").html('No Data Available');
		}
	});
}

function buildOnclickWorkSchemsExccedDetails(result,exceededDuration){
	var tableView='';
	tableView+='<div class="table-responsive">';
	tableView+='<table class="table table-bordered table_custom_SC exceedCls" id="dataTableSchems13">';
		tableView+='<thead>';
		tableView+='<tr>';
				tableView+='<th  class="text-capital">Work CODE</th>';
				tableView+='<th  class="text-capital">Work&nbsp;NAME</th>';
				tableView+='<th >PROGRAM NAME</th>';
				tableView+='<th>DISTRICT</th>';
				tableView+='<th>CONSTITUENCY</th>';
				tableView+='<th>MANDAL</th>';
				tableView+='<th>HABITATIONS NAME</th>';
				tableView+='<th>SANCTIONED AMOUNT</th>';
				tableView+='<th>GROUNDED DATE</th>';
				tableView+='<th>TARGET DATE</th>';
				tableView+='<th>COMPLETION DATE</th>';
				if(exceededDuration !=='0 Days'){
					tableView+='<th class="text-capital">Exceeded Days</th>';
				}	
				
				tableView+='<th class="text-capital">Work Status</th>';
				tableView+='<th class="text-capital">Reason&nbsp;For&nbsp;Delay</th>';
			tableView+='</tr>';
			
		tableView+='</thead>';
		tableView+='<tbody>';
		for(var i in result){
			tableView+='<tr>';
					tableView+='<td style="min-width:10%;">'+result[i].wrokIdStr+'</td>';
					/* tableView+='<td style="text-align:left !important; min-width:20%;">'+result[i].wrokName.toLowerCase()+'</td>'; */
					if(result[i].wrokName.length>10){
						tableView+='<td style="min-width:10%;"><span data-placement="top" data-container="body" class="tooltipCls" title="'+result[i].wrokName+'" style="text-align:left !important;cursor:pointer !important;">'+result[i].wrokName.substring(0, 10)+'...</span></td>';
					}else{
						tableView+='<td style="min-width:10%;">'+result[i].wrokName.substring(0, 10)+'</td>';
					}
					tableView+='<td style="min-width:10%;">'+result[i].programName+'</td>';
					tableView+='<td>'+result[i].districtName+'</td>';
					tableView+='<td>'+result[i].constituencyName+'</td>';
					tableView+='<td>'+result[i].mandalName+'</td>';
					tableView+='<td>'+result[i].habitationName+'</td>';
					tableView+='<td>'+result[i].sanctionedAmount+'</td>';
					tableView+='<td>'+result[i].groundedDate+'</td>'
					tableView+='<td>'+result[i].targetDate+'</td>';
					if(result[i].workStatus=='Grounded'){
						tableView+='<td>-</td>';
					}else{
						tableView+='<td>'+result[i].completionDate+'</td>';
					}
					if(typeof result[i].noOfDays === undefined || typeof result[i].noOfDays == "undefined" || result[i].noOfDays == null || result[i].noOfDays == 0){
						tableView+='<td> - </td>';
					}else{
						if(exceededDuration !=='0 Days'){
							tableView+='<td>'+result[i].noOfDays+'</td>';
						}
					}
					tableView+='<td>'+result[i].workStatus+'</td>';
					if(typeof result[i].reason === undefined || typeof result[i].reason == "undefined" || result[i].reason == null){
						tableView+='<td> - </td>';
					}else{
						if(result[i].reason.length>10){
							tableView+='<td><span data-placement="top" class="tooltipCls" style="cursor:pointer;" title="'+result[i].reason+'">'+result[i].reason.substring(0, 10)+'...</span></td>';
						}else{
							tableView+='<td>'+result[i].reason.substring(0, 10)+'</td>';
						}
					}
				tableView+='</tr>';
		}
		tableView+='</tbody>';
	tableView+='</table>';
	tableView+='</div>';
	$("#modalSchemsExceedTable").html(tableView);
	$('.tooltipCls').tooltip();
	$("#dataTableSchems13").dataTable({
		"order": [ 0, 'desc' ],
		"iDisplayLength" : 5,
		"aLengthMenu": [[5, 10, 15, 30, 50, -1], [5,10,15,30,50, "All"]],
		"scrollX":true,
		"fixedColumns":{ "leftColumns":3},
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Rural Water Supply',
				filename:  'Rural Water Supply'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
			
		]
	});
}

function getOnClickNotGroubnWorkDetails(assetType,locationType,exceededDuration,locationValue,statusType){
	$("#modalSchemsExceedTable").html(spinner);
	$('.exceedWorkTypeCls').each(function(i, obj){
		 if($(this).is(':checked')){
			statusType = $(this).val();
		 }
	});
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	var schemeValArr=[];
	var schemeVal =$("#schemeDivId").val();
	if(schemeVal==null || schemeVal==""){
		schemeValArr=[];
	}else{
		for(var i in schemeVal){
			var schemeId="";
			if(schemeVal[i].length ==1){
				schemeId="0"+schemeVal[i]
			}else{
				schemeId=schemeVal[i];
			}
			schemeValArr.push(schemeId);
		}
	}
	var districtId="";
	var locationVal ="";
	if(locationType=='mandal'){
		districtId=locationValue.substr(0,2);
		 locationVal=locationValue.substr(2,3);
	}else{
		locationVal=locationValue;
	}
 	var json = {
		"assetType":assetType,
		"fromDateStr":glStartDate,
		"toDateStr":glEndDate,
		"locationType":locationType,
		"exceededDuration":exceededDuration,
		"locationIdStr":locationVal,
		"districtValue":districtId,
		"status" : statusType,
		"year": yearVal,
		"schemeIdStr":schemeValArr
		 
	}
	
	$.ajax({                
		type:'POST',    
		url: 'getOnClickNotGroundedWorkDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
	 	if(result !=null && result.length>0){
			buildOnClickNotGroubnWorkDetails(result,exceededDuration);
		}else{
			
			$("#modalSchemsExceedTable").html('No Data Available');
		}
	});
}

function buildOnClickNotGroubnWorkDetails(result,exceededDuration){
	var tableView='';
	tableView+='<div class="table-responsive">';
	tableView+='<table class="table table-bordered exceedCls table_custom_SC" id="dataTableSchems12">';
		tableView+='<thead>';
		tableView+='<tr>';
				tableView+='<th class="text-capital">Work CODE</th>';
				tableView+='<th class="text-capital">Work NAME</th>';
				tableView+='<th>PROGRAM NAME</th>';
				tableView+='<th>DISTRICT</th>';
				tableView+='<th>CONSTITUENCY</th>';
				tableView+='<th>MANDAL</th>';
				tableView+='<th>HABITATIONS NAME</th>';
				tableView+='<th>SANCTIONED AMOUNT</th>';
				if(exceededDuration !=='0 Days'){
					tableView+='<th class="text-capital">Exceeded Days</th>';
				}	
				
				tableView+='<th class="text-capital">Work Status</th>';
			tableView+='</tr>';
			
		tableView+='</thead>';
		tableView+='<tbody>';
		for(var i in result){
			tableView+='<tr>';
					tableView+='<td>'+result[i].wrokIdStr+'</td>';
					tableView+='<td>'+result[i].wrokName+'</td>';
					tableView+='<td>'+result[i].programName+'</td>';
					tableView+='<td>'+result[i].districtName+'</td>';
					tableView+='<td>'+result[i].constituencyName+'</td>';
					tableView+='<td>'+result[i].mandalName+'</td>';
					tableView+='<td>'+result[i].habitationName+'</td>';
					tableView+='<td>'+result[i].sanctionedAmount+'</td>';
					
					if(typeof result[i].noOfDays === undefined || typeof result[i].noOfDays == "undefined" || result[i].noOfDays == null || result[i].noOfDays == 0){
						tableView+='<td> - </td>';
					}else{
						if(exceededDuration !=='0 Days'){
							tableView+='<td>'+result[i].noOfDays+'</td>';
						}
					}
					tableView+='<td>'+result[i].workStatus+'</td>';
				tableView+='</tr>';
		}
		tableView+='</tbody>';
	tableView+='</table>';
	tableView+='</div>';
	$("#modalSchemsExceedTable").html(tableView);
	$("#dataTableSchems12").dataTable({
		"order": [ 0, 'desc' ],
		"iDisplayLength" : 10,
		"aLengthMenu": [[10, 20, 30, 40, -1], [10, 20, 30, 40, "All"]],
		"scrollX":true,
		"fixedColumns":{ "leftColumns":7},
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Rural Water Supply',
				filename:  'Rural Water Supply'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
weekWiseReport();
function weekWiseReport(){
	$("#weeklyReportTableDivId").html(spinner);
	var json = {
		toDateStr:toDateStr,
		fromDateStr:fromDateStr
	}
	$.ajax({                
		type:'POST',    
		url: 'getRwsWeekWiseReport',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildWeeklyReport(result);
		}else{
			
			$("#weeklyReportTableDivId").html('No Data Available');
		}
		
	});

}
function buildWeeklyReport(result){
	var totalCount=0; var modifiedTotal=0; var totalAdmin=0; var totalEntrust=0;
	var totalGround=0;var totalTechSanc=0; var totalComp=0;var totalCommission=0;
	for(var i in result){
		totalCount=totalCount+result[i].totalCount;
		modifiedTotal=result[i].groundedCount+modifiedTotal;
		for(var j in result[i].subList){
			if(result[i].subList[j].status =='Admin Sanctioned'){
				totalAdmin=result[i].subList[j].groundedCount+totalAdmin;
			}else if(result[i].subList[j].status =='Technical Sanctioned'){
				totalTechSanc=result[i].subList[j].groundedCount+totalTechSanc;
			}else if(result[i].subList[j].status == 'Entrusted'){
				totalEntrust=result[i].subList[j].groundedCount+totalEntrust;
			}else if(result[i].subList[j].status == 'Grounded'){
				totalGround=result[i].subList[j].groundedCount+totalGround;
			}else if(result[i].subList[j].status == 'Completed'){
				totalComp=result[i].subList[j].groundedCount+totalComp;
			}else if(result[i].subList[j].status == 'Commissioned'){
				totalCommission=result[i].subList[j].groundedCount+totalCommission;
			}
		}
	}
	var tableView='';
	tableView+='<div class="col-sm-12 m_top10">';
		tableView+='<div class="row">';
			tableView+='<table class="table table-bordered" id="dataTablereviewId">';
				tableView+='<thead>';
					tableView+='<tr>';
					tableView+='<td  rowspan="2">Previous Status</div></td>'
					tableView+='<td rowspan="2" align:center>Total Count</td>'
					tableView+='<td rowspan="2" align:center>Status Changed Count</td>'
					tableView+='<td rowspan="2" align:center>Changed %</td>'
					tableView+='<td colspan="6" style="background-color:#ccc;">Current Status</td>';
					tableView+='</tr>';
					tableView+='<tr>';
						for(var i in result[0].subList){
							tableView+='<td>'+result[0].subList[i].status+'</td>';
						}
					tableView+='</tr>';
				tableView+='</thead>';
				tableView+='<tbody>';
					for(var i in result){
							tableView+='<tr>';
								tableView+='<td >'+result[i].status+'</td>';
								if(result[i].totalCount !=null && result[i].totalCount >0){
									tableView+='<td>'+result[i].totalCount+'</td>';
								}else{
									tableView+='<td>-</td>';
								}
								if(result[i].groundedCount !=null && result[i].groundedCount >0){
									tableView+='<td>'+result[i].groundedCount+'</td>';
								}else{
									tableView+='<td>-</td>';
								}
								if(result[i].percentage !=null && result[i].percentage >0){
									tableView+='<td>'+result[i].percentage+' %</td>';
								}else{
									tableView+='<td>-</td>';
								}
								for(var j in result[i].subList){
									if(result[i].subList[j].groundedCount !=null && result[i].subList[j].groundedCount >0){
										tableView+='<td class="reviewReportClick" attr_current_status="'+result[i].subList[j].status+'"  attr_previous_status="'+result[i].status+'" attr_count="'+result[i].subList[j].groundedCount+'"  style="cursor:pointer;text-decoration-line: underline">'+result[i].subList[j].groundedCount+'</td>';
									}else{
										tableView+='<td>-</td>';
									}
								}
							tableView+='</tr>';
						}
				tableView+='</tbody>';
				tableView+='<tbody>';
					tableView+='<tr>';
						tableView+='<td>Total</td>';
						if(totalCount !=null && totalCount>0){
							tableView+='<td>'+totalCount+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(modifiedTotal !=null && modifiedTotal>0){
							tableView+='<td>'+modifiedTotal+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(totalCount !=null && totalCount>0){
							tableView+='<td>'+parseFloat((modifiedTotal/totalCount)*100).toFixed(2)+' %</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(totalAdmin !=null && totalAdmin>0){
							tableView+='<td>'+totalAdmin+'</td>';
						}else{
							tableView+='<td>-</td>';
						}if(totalTechSanc !=null && totalTechSanc>0){
							tableView+='<td>'+totalTechSanc+'</td>';
						}else{
							tableView+='<td>-</td>';
						}if(totalEntrust !=null && totalEntrust>0){
							tableView+='<td>'+totalEntrust+'</td>';
						}else{
							tableView+='<td>-</td>';
						}if(totalGround !=null && totalGround>0){
							tableView+='<td>'+totalGround+'</td>';
						}else{
							tableView+='<td>-</td>';
						}if(totalComp !=null && totalComp>0){
							tableView+='<td>'+totalComp+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(totalComp !=null && totalComp>0){
							tableView+='<td>'+totalComp+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						
					tableView+='</tr>';
				tableView+='</tbody>';
			tableView+='</table>';
		tableView+='</div>';
	tableView+='</div>';
	$("#weeklyReportTableDivId").html(tableView);
	
	$("#dataTablereviewId").dataTable({
	searching: false,
	paging: false,
	 "bInfo" : false,
	 dom: 'C<"clear">lfrtip',
	"aoColumnDefs": [{
            "sType": "rank",
			targets: 0,
            "bSortable": true
        } ]
	});
}

function getRank(name) {
 
    var rankNumber;
     
    if (name == "New Entries"){
        rankNumber = 1;
    } else if (name == "Admin Sanctioned"){
        rankNumber = 2;
    } else if (name == "Technical Sanctioned") {
        rankNumber = 3;
    }  else  if(name="Entrusted"){
		rankNumber = 4;
	}else if (name == "Grounded") {
        rankNumber = 5;
    } else if (name == "Completed") {
        rankNumber = 6;
    }else if (name == "Commissioned") {
        rankNumber = 7;
    }
     
    return rankNumber;
}

jQuery.fn.dataTableExt.oSort["rank-desc"] = function (x, y) {
	
        return getRank(x) < getRank(y);
};
     
jQuery.fn.dataTableExt.oSort["rank-asc"] = function (x, y) {
	
        return getRank(x) > getRank(y);
}

$("#dateRangePickerReport").daterangepicker({
	opens: 'left',
	minDate:'01-07-2018',
	startDate: moment().startOf('isoWeek').format("DD-MM-YYYY"),
	endDate: moment().format('DD-MM-YYYY'),
	locale: {
	  format: 'DD-MM-YYYY'
	},
	ranges: {
		'This week':[moment().startOf('isoWeek').format("DD-MM-YYYY"), moment().format("DD-MM-YYYY")],
		'Today' : [moment(), moment()],
		'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		'This Month': [moment().startOf('month'), moment()],
			
	}
 });
 
var reportdates= $("#dateRangePickerReport").val();
var reportPickerDates = fromDateStr+' - '+toDateStr;
if(reportdates == reportPickerDates)
{
$("#dateRangePickerReport").val('This week');
}
$('#dateRangePickerReport').on('apply.daterangepicker', function(ev, picker) {
	fromDateStr = picker.startDate.format('DD-MM-YYYY')
	toDateStr = picker.endDate.format('DD-MM-YYYY')
	if(picker.chosenLabel == 'This week')
	{
	  $("#dateRangePickerReport").val('This week');
	}
		weekWiseReport();
});

$(document).on("click",".reviewReportClick",function(){
	var previousStatus = $(this).attr("attr_previous_status");
	var currentStatus=$(this).attr("attr_current_status");
	var totalCount=$(this).attr("attr_count");
console.log(previousStatus+" TO "+currentStatus+" Changed Works");
	$("#modalHablitationDivId").modal('show');
	$("#modalHabliHeadingId").html("Status From "+previousStatus+" To "+currentStatus+" Changed Works" );
	$('#modalSchemsTable').html("");
	$('#modalSchemsExceedTable').html("");
	$('#modalReviewReportTable').html("");
	reviewReportOnClick(previousStatus,currentStatus);

});
var resultObj;
function reviewReportOnClick(previousStatus,currentStatus){	
		$("#modalReviewReportTable").html(spinner);			
	var json = {
		toDateStr:toDateStr,
		fromDateStr:fromDateStr,
		workStatus:currentStatus,
		previousStatus:previousStatus
	}
	$.ajax({                
		type:'POST',    
		url: 'getRwsWeekWiseReportStatusDetailsData',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){			
			buildreviewReportOnClick(result);			
			resultObj = result;
		}else{
			$("#modalReviewReportTable").html('No Data Available');
		}
		
	});
}

function buildreviewReportOnClick(result){
	var tableView='';
		tableView+='<div class="table-responsive">';
			tableView+='<table class="table table-bordered" id="modalReviewReportTableDTID">';
				tableView+='<thead>';
					tableView+='<tr>';
						tableView+='<th>work Id</th>';
						tableView+='<th>work Name</th>';
						tableView+='<th>work Previous Status</th>';
						tableView+='<th>work Current Status</th>';
						tableView+='<th>District</th>';
						tableView+='<th>Mandal</th>';
						tableView+='<th>Admin Sanc. Date</th>';
						tableView+='<th>Sanctioned Amount</th>';
						tableView+='<th>History</th>';
					tableView+='</tr>';
				tableView+='</thead>';
				tableView+='<tbody>';
					for(var i in result){
							tableView+='<tr>';
								tableView+='<td>'+result[i].workId+'</td>';
								tableView+='<td>'+result[i].workName+'</td>';
								tableView+='<td>'+result[i].previous+'</td>';
								if(result[i].previous !=null && result[i].previous.length>0){
									tableView+='<td>'+result[i].status+'</td>';
								}else{
									tableView+='<td>New</td>';
								}								
								tableView+='<td>'+result[i].districtName+'</td>';
								tableView+='<td>'+result[i].mandalName+'</td>';
								tableView+='<td>'+result[i].adminDate+'</td>';
								tableView+='<td>'+parseFloat(result[i].sanctionedAmount1).toFixed(2)+'</td>';
								tableView+='<td><i class="fa fa-history worksHistory text-info" aria-hidden="true" style="cursor:pointer;" attr_workId='+result[i].workId+'></i></td>';
								
							tableView+='</tr>';
						}
				tableView+='</tbody>';
			tableView+='</table>';
		tableView+='</div>';
	$("#modalReviewReportTable").html(tableView);
	
	$("#modalReviewReportTableDTID").dataTable({
			"iDisplayLength": 15,
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
				title		:  "ENC Review DASHBOARD",
				filename	:  'ENC Review'+moment().format("DD/MMMM/YYYY  HH:MM"),
			} ]
	});
}
$(document).on("click",".worksHistory",function(){
	$("#worksHistoryDivId").modal('show');
	$("#worksHistoryHeadingId").html("Work Tracking List");
	var workId = $(this).attr("attr_workId");
	$('#worksHistoryDivId button').addClass("closeShowPdfCls");
	buidHistoryOnClick(workId);
});
function buidHistoryOnClick(workId){	
	var tableView='';
		tableView+='<div class="table-responsive">';
			tableView+='<table class="table table-bordered" id="historyTableDTID">';
				tableView+='<thead>';
					tableView+='<tr>';
						tableView+='<th>Status</th>';
						tableView+='<th>Admin Sanc. Date</th>';
						tableView+='<th>Tech. Sanc. Date</th>';
						tableView+='<th>Entrusted Date</th>';
						tableView+='<th>Grounded Date</th>';
						tableView+='<th>Completed Date</th>';						
						tableView+='<th>Updated Date</th>';	
					tableView+='</tr>';
				tableView+='</thead>';
				tableView+='<tbody>';
				for(var i in resultObj){
					if(resultObj[i].workId == workId){
						for(var j in resultObj[i].subList){
							tableView+='<tr>';
							tableView+='<td>'+resultObj[i].subList[j].status+'</td>';
								if(resultObj[i].subList[j].adminDate != null && resultObj[i].subList[j].adminDate.length > 0){
									tableView+='<td>'+resultObj[i].subList[j].adminDate.substring(0,10)+'</td>';
								}else{
									tableView+='<td>-</td>';
								}
								if(resultObj[i].subList[j].techSanctionDate != null && resultObj[i].subList[j].techSanctionDate.length > 0){								
									tableView+='<td>'+resultObj[i].subList[j].techSanctionDate.substring(0,10)+'</td>';
								}else{
									tableView+='<td>-</td>';
								}if(resultObj[i].subList[j].entrustedDate != null && resultObj[i].subList[j].entrustedDate.length > 0){								
									tableView+='<td>'+resultObj[i].subList[j].entrustedDate.substring(0,10)+'</td>';
								}else{
									tableView+='<td>-</td>';
								}if(resultObj[i].subList[j].groundedDate != null && resultObj[i].subList[j].groundedDate.length > 0){								
									tableView+='<td>'+resultObj[i].subList[j].groundedDate.substring(0,10)+'</td>';
								}else{
									tableView+='<td>-</td>';
								}
								if(resultObj[i].subList[j].completedDate != null && resultObj[i].subList[j].completedDate.length > 0){								
									tableView+='<td>'+resultObj[i].subList[j].completedDate.substring(0,10)+'</td>';
								}else{
									tableView+='<td>-</td>';
								}
								if(resultObj[i].subList[j].updatedTime != null && resultObj[i].subList[j].updatedTime.length > 0){								
									tableView+='<td>'+resultObj[i].subList[j].updatedTime.substring(0,19)+'</td>';
								}else{
									tableView+='<td>-</td>';
								}
							tableView+='</tr>';
						}
					}							
				}
				tableView+='</tbody>';
			tableView+='</table>';
		tableView+='</div>';
	$("#worksHistoryTable").html(tableView);
}

$(document).on("click",".closeShowPdfCls",function(){
    setTimeout(function(){
      $('body').addClass("modal-open");
    }, 500);
	$('#worksHistoryDivId button').removeClass("closeShowPdfCls");
});
 