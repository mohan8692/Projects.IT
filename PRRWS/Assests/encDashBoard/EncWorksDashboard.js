var spinner = '<div class="row"><div class="col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var currentYear="";
if(moment().format('MM').toString < "04"){
	currentYear = moment().year()
}else{
	currentYear = moment().year()+1;
}
var startyear= moment().year()-15;
var glStartDate = moment().subtract(15, 'years').startOf('year').format("DD-MM-YYYY");
var glEndDate = "01-04-"+currentYear;
var toDateStr=moment().format('DD-MM-YYYY');
var fromDateStr=moment().startOf('isoWeek').format('DD-MM-YYYY');
var globallocId = 0;
var globallevelId = 0;
var globalLocationType="";
var globalLocationValue=0;

	
var globalLocationName='';
$("#selectedName").attr("attr_id","0");
$("#selectedName").attr("attr_levelidvalue","2");

$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
getAllFiniancialYears();
getAllSchemes();
function getAllSchemes(){
	$("#schemeDivId").html('');
	var json = {
	}
	$.ajax({                
		type:'POST',    
		url: 'getPRProgramsCodeAndName',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			for(var i in result){
				$("#schemeDivId").append("<option value="+result[i].subGrantId+" selected>"+result[i].programName+'-'+result[i].subGrantName+"</option>");
				
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
		'2014 To Till Now':["01-04-2014", moment().format("DD-MM-YYYY")],
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
	getLocationWiseWorksInformation(globalLocationType,globalLocationType,"graph");
	//getLocationWiseWorkTargetsNacheivements("state","state","graph");
	getLocationWiseExceededWorkDetails("state","state","graph",statusType,"overAll")
	getLocationWiseNotGroundedExceededWorkDetails("state","state","graph",statusType,"notGrounded");
	gettAllEncWorksByScheme();
	weekWiseReport();
}


function levelWiseOverview()
{
	var levelWiseOverviewArr=[];
	if(globalLocationType !=null && globalLocationType.length ==0){
		levelWiseOverviewArr = ['state','district','constituency','mandal'];
	}else if(globalLocationType !=null && globalLocationType =='district'){
		levelWiseOverviewArr = ['district','constituency','mandal'];
	}else if(globalLocationType !=null && globalLocationType =='constituency'){
		levelWiseOverviewArr = ['constituency','mandal'];
	}else if(globalLocationType !=null && globalLocationType =='mandal'){
		levelWiseOverviewArr = ['mandal'];
	}
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
						collapse+='<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#accordion" href="#collapse'+levelWiseOverviewArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseOverviewArr[i]+'">';
					}else{
						collapse+='<a role="button" class="panelCollapseIcon collapsed clickToViewTable" data-toggle="collapse" data-parent="#accordion" href="#collapse'+levelWiseOverviewArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseOverviewArr[i]+'" attr_block_id="'+levelWiseOverviewArr[i]+'levelBlockId" attr_loc="'+levelWiseOverviewArr[i]+'" attr_cnt="0" attr_status="'+statusType+'">';
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
										collapse+='<li class="active f_14" attr_type="exceed" attr_location_type="'+levelWiseOverviewArr[i]+'" attr_status="'+statusType+'" >underProgress-Exceeded Works</li>';
									}else{
										collapse+='<li class="active f_14" attr_type="exceed" attr_location_type="'+levelWiseOverviewArr[i]+'" attr_status="'+statusType+'" >Grounded-Exceeded Works</li>';
									}
									
									collapse+='<li attr_type="notGrounded" attr_location_type="'+levelWiseOverviewArr[i]+'" attr_status="'+statusType+'" class="f_14">Not Grounded Exceeded Works</li>';
									/* collapse+='<li attr_type="targets" attr_location_type="'+levelWiseOverviewArr[i]+'" attr_status="'+statusType+'">Target&Achivements</li>'; */
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
		getLocationWiseExceededWorkDetails(levelWiseOverviewArr[i]+'levelBlockId',levelWiseOverviewArr[i],'table',statusType,"overAll"); 
	}
	
}
// over All Works
function getLocationWiseWorksInformation(blockId,filterType,type){
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	var schemeValArr=[];
	var schemeVal =$("#schemeDivId").val();
	if(schemeVal==null || schemeVal==""){
		schemeValArr=[];
	}else{
		schemeValArr=schemeVal;
	}
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	if(type=='graph'){
		$("#enclocationWiseChart").html(spinner);
	}else{
		$("#"+blockId).html(spinner);
		
	}
		var json = {
			locationType:globalLocationType,
			fromDateStr:glStartDate,
			toDateStr:glEndDate,
			year:yearVal,
			schemeIdStr:schemeValArr,
			filterType:filterType,
			locationId:globalLocationValue
		}
		$.ajax({                
			type:'POST',    
			url: 'getLocationWiseEncWorksInformation',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
		 	if(result !=null && result.length>0){
				if(type=='graph'){
					buildLocationWiseWorksGraph(result);
				}
				locationwiseTableBlocks(result,blockId,filterType);
			}else{
				
				$('#'+blockId).html("NO DATA AVAILABLE");
			}
		});
}

function locationwiseTableBlocks(result,blockId,locationTypes){
	var locationType= locationTypes;
	var table='';
		table+='<div class="table-responsive">';
			table+='<table class="table table-bordered m_top10" id="'+blockId+'dataTableId">';
				table+='<thead>';
					if(blockId == 'statelevelBlockId'){
						table+='<th style="background-color:#def2f7">STATE</th>';
					}
					else if(blockId == 'districtlevelBlockId'){
						table+='<th style="background-color:#def2f7">DISTRICTS</th>';
					}else if(blockId == 'constituencylevelBlockId'){
						table+='<th style="background-color:#def2f7">CONSTITUENCY</th>';
					}else if(blockId == 'mandallevelBlockId'){
						table+='<th style="background-color:#def2f7">MANDALS</th>';
					}
									
					table+='<th style="background-color:#def2f7">ADMIN SANCTIONED</th>';
					table+='<th style="background-color:#def2f7">NOT TECHNICALLY SANCTIONED</th>';
					table+='<th style="background-color:#def2f7">%</th>';
					table+='<th style="background-color:#def2f7">TECHNICALLY SANCTIONED</th>';
					table+='<th style="background-color:#def2f7">%</th>';
					table+='<th style="background-color:#def2f7">NOT ENTRUSTED</th>';
					table+='<th style="background-color:#def2f7">%</th>';
					table+='<th style="background-color:#def2f7">ENTRUSTED</th>';
					table+='<th style="background-color:#def2f7">%</th>';
					table+='<th style="background-color:#f9e3f0">NOT GROUNDED</th>';
					table+='<th style="background-color:#f9e3f0">%</th>';
					table+='<th style="background-color:#f9e3f0">GROUNDED</th>';
					table+='<th style="background-color:#f9e3f0">%</th>';
					table+='<th style="background-color:#f9e3f0">UNDER PROGRESS</th>';
					table+='<th style="background-color:#f9e3f0">%</th>';
					table+='<th style="background-color:#f9e3f0">COMPLETED</th>';
					table+='<th style="background-color:#f9e3f0">%</th>';
					
				table+='</thead>';
				table+='<tbody>';
				for(var i in result){
					var notTechSanctioned = result[i].adminSanctionCount-result[i].technicallySanctionedCount;
					var notEntrusted = result[i].technicallySanctionedCount-result[i].totalWorksEntrusted;
					table+='<tr>';
						table+='<td style="background-color:#def2f7;font-weight:bold !important;">'+result[i].locationName+'</td>';
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount !=0){
							table+='<td class="schemsClickView"  attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+result[i].adminSanctionCount+'" attr_type = "adminSanctioned" attr_location_name="'+result[i].locationName+'" style=" background-color:#def2f7; cursor:pointer;text-decoration:underline;font-weight:bold !important;">'+result[i].adminSanctionCount+'</td>';
						}else{
							table+='<td style="background-color:#def2f7">-</td>';
						}
						if(notTechSanctioned !=null && notTechSanctioned !=0){
							table+='<td class="schemsClickView"  attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+notTechSanctioned+'" attr_type = "Not Techincal Sancationed" attr_location_name="'+result[i].locationName+'" style=" background-color:#def2f7; cursor:pointer;text-decoration:underline;font-weight:bold !important;">'+notTechSanctioned+'</td>';
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount >0){
								table+='<td style="background-color:#def2f7;font-weight:bold !important;">'+parseFloat((notTechSanctioned/result[i].adminSanctionCount)*100).toFixed(2)+'</td>';
							}else{
								table+='<td style="background-color:#def2f7">-</td>';
							}
						}else{
							table+='<td style="background-color:#def2f7">-</td>';
							table+='<td style="background-color:#def2f7">-</td>';
						}
						if(result[i].technicallySanctionedCount !=null && result[i].technicallySanctionedCount !=0){
							table+='<td class="schemsClickView"  attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+result[i].technicallySanctionedCount+'" attr_type = "Techincal Sancationed" attr_location_name="'+result[i].locationName+'" style=" background-color:#def2f7; cursor:pointer;text-decoration:underline;font-weight:bold !important;">'+result[i].technicallySanctionedCount+'</td>';
						
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount >0 ){
								table+='<td style="background-color:#def2f7;font-weight:bold !important;">'+parseFloat((result[i].technicallySanctionedCount/result[i].adminSanctionCount)*100).toFixed(2)+'</td>';
							}else{
								table+='<td style="background-color:#def2f7">-</td>';
							}
						}else{
							table+='<td style="background-color:#def2f7">-</td>';
							table+='<td style="background-color:#def2f7">-</td>';
						}
						if(notEntrusted !=null && notEntrusted !=0){
							table+='<td class="schemsClickView"  attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+notEntrusted+'" attr_type = "Not Entrusted" attr_location_name="'+result[i].locationName+'" style=" background-color:#def2f7; cursor:pointer;text-decoration:underline;font-weight:bold !important;">'+notEntrusted+'</td>';
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount >0){
								table+='<td style="background-color:#def2f7;font-weight:bold !important;">'+parseFloat((notEntrusted/result[i].adminSanctionCount)*100).toFixed(2)+'</td>';
							}else{
								table+='<td style="background-color:#def2f7">-</td>';
							}
						}else{
							table+='<td style="background-color:#def2f7">-</td>';
							table+='<td style="background-color:#def2f7">-</td>';
						}
						if(result[i].totalWorksEntrusted !=null && result[i].totalWorksEntrusted !=0){
							table+='<td class="schemsClickView"  attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+result[i].totalWorksEntrusted+'" attr_type = "entrusted" attr_location_name="'+result[i].locationName+'" style=" background-color:#def2f7; cursor:pointer;text-decoration:underline;font-weight:bold !important;">'+result[i].totalWorksEntrusted+'</td>';
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount >0){
								table+='<td style="background-color:#def2f7;font-weight:bold !important;">'+parseFloat((result[i].totalWorksEntrusted/result[i].adminSanctionCount)*100).toFixed(2)+'</td>';
							}else{
								table+='<td style="background-color:#def2f7">-</td>';
							}
						}else{
							table+='<td style="background-color:#def2f7">-</td>';
							table+='<td style="background-color:#def2f7">-</td>';
						}
						if(result[i].notGrounded !=null && result[i].notGrounded !=0){
							table+='<td class="schemsClickView"  attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+result[i].notGrounded+'" attr_type = "Not Grounded" attr_location_name="'+result[i].locationName+'" style="background-color:#f9e3f0;cursor:pointer;text-decoration:underline;font-weight:bold !important;">'+result[i].notGrounded+'</td>';
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount >0){
								table+='<td style="background-color:#f9e3f0;font-weight:bold !important;">'+parseFloat((result[i].notGrounded/result[i].adminSanctionCount)*100).toFixed(2)+'</td>';
							}else{
								table+='<td style="background-color:#f9e3f0">-</td>';
							}
						}else{
							table+='<td style="background-color:#f9e3f0">-</td>';
							table+='<td style="background-color:#f9e3f0">-</td>';
						}
						if(result[i].groundedCount !=null && result[i].groundedCount !=0){
							table+='<td class="schemsClickView"  attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+result[i].groundedCount+'" attr_type = "Grounded" attr_location_name="'+result[i].locationName+'" style="background-color:#f9e3f0;cursor:pointer;text-decoration:underline;font-weight:bold !important;">'+result[i].groundedCount+'</td>';
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount >0){
								table+='<td style="background-color:#f9e3f0;font-weight:bold !important;">'+parseFloat((result[i].groundedCount/result[i].adminSanctionCount)*100).toFixed(2)+'</td>';
							}else{
								table+='<td style="background-color:#f9e3f0">-</td>';
							}
						}else{
							table+='<td style="background-color:#f9e3f0">-</td>';
							table+='<td style="background-color:#f9e3f0">-</td>';
						}
						if(result[i].underProcessCount !=null && result[i].underProcessCount !=0){
						table+='<td class="schemsClickView"  attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+result[i].underProcessCount+'" attr_type = "UnderProgress" attr_location_name="'+result[i].locationName+'" style="background-color:#f9e3f0;cursor:pointer;text-decoration:underline;font-weight:bold !important;;">'+result[i].underProcessCount+'</td>';
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount >0){
								table+='<td style="background-color:#f9e3f0;font-weight:bold !important;">'+parseFloat((result[i].underProcessCount/result[i].adminSanctionCount)*100).toFixed(2)+'</td>';
							}else{
								table+='<td style="background-color:#f9e3f0">-</td>';
							}
							}else{
								table+='<td style="background-color:#f9e3f0">-</td>';
								table+='<td style="background-color:#f9e3f0">-</td>';
						}
						if(result[i].completedCount !=null && result[i].completedCount !=0){
							table+='<td class="schemsClickView" attr_location_type="'+locationType+'" attr_filter_value="'+result[i].locationId+'"attr_total_count = "'+result[i].completedCount+'" attr_type = "Completed" attr_location_name="'+result[i].locationName+'" style="background-color:#f9e3f0;cursor:pointer;text-decoration:underline;font-weight:bold !important;">'+result[i].completedCount+'</td>';
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount >0){
								table+='<td style="background-color:#f9e3f0;font-weight:bold !important;">'+parseFloat((result[i].completedCount/result[i].adminSanctionCount)*100).toFixed(2)+'</td>';
							}else{
								table+='<td style="background-color:#f9e3f0">-</td>';
							}
						}else{
							table+='<td style="background-color:#f9e3f0">-</td>';
							table+='<td style="background-color:#f9e3f0">-</td>';
						}
						
					table+='</tr>';
				}
				table+='</tbody>';
			table+='</table>';
		table+='</div>';
		$("#"+blockId).html(table);
		$("#"+blockId+"dataTableId").dataTable({
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

function buildLocationWiseWorksGraph(result){
	var adminSanctionCount = result[0].adminSanctionCount;
	var techcount =result[0].technicallySanctionedCount;
	var entrusted= result[0].totalWorksEntrusted;
	var grounded =result[0].groundedCount;
	$("#groundedID").html(result[0].groundedCount);
	$("#underProgID").html(result[0].underProcessCount);
	$("#notGroundedID").html(result[0].notGrounded);
	
	var dataArr =[];
	dataArr.push({"name": 'Admin Sanctioned',"y": result[0].adminSanctionCount,color:'#5fc24f'});
	dataArr.push({"name": 'Not Techincal Sancationed',y:  result[0].adminSanctionCount-result[0].technicallySanctionedCount,color:'#ed0e27'});
	dataArr.push({"name": 'Techincal Sancationed',y: result[0].technicallySanctionedCount,color:'#418CF0'});
	dataArr.push({"name": 'Not Entrusted',y: result[0].technicallySanctionedCount-result[0].totalWorksEntrusted,color:'#ed0e27'});
	dataArr.push({"name": 'Entrusted',y: result[0].totalWorksEntrusted,color:'#FFBF00'});
	dataArr.push({"name": 'Not Grounded',y: result[0].notGrounded,color:'#ed0e27'});
	dataArr.push({"name": 'Grounded',y: result[0].groundedCount,color:'#ACFA58'});
	dataArr.push({"name": 'UnderProgress',y: result[0].underProcessCount,color:'#FA5858'});
	dataArr.push({"name": 'Completed',y:result[0].completedCount,color:'#009999'});
	
	
	$("#enclocationWiseChart").highcharts({
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
				cursor: 'pointer',
				 point: {
					events: {
						click: function () {
							$("#modalHablitationDivId").modal('show');
							$("#modalExceededTable").html('');
							$("#modalSchemsTable").html('');
							$("#modalAmountSchemeTable").html('');
							$('#modalReviewReportTable').html('');
							$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+globalLocationName+"&nbsp;&nbsp;"+globalLocationType+"("+this.name+")&nbsp;&nbsp;Overview</h4>");
								getOnclickWorkSchemsDetails(this.name,this.y,globalLocationValue,globalLocationType,"","","graph");
								getAmountWiseEncWorksCount(this.name,this.y,globalLocationValue,globalLocationType,"","graph");
						}
					}
				},
				pointWidth: 35,
				gridLineWidth: 30,
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
								var pcnt = (this.y / adminSanctionCount) * 100;
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
			data: dataArr
		}]
	});
}

// exceed  Work details
function getLocationWiseExceededWorkDetails(blockId,filterType,type,statusType,workType){
	
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
		schemeValArr=schemeVal;
	}
	if(type=='graph'){
		$("#ExceededWorkDetailsGraph").html(spinner);
	}else{
		$("#"+blockId).html(spinner);
		
	}
		var json = {
			locationType:globalLocationType,
			fromDateStr:glStartDate,
			toDateStr:glEndDate,
			status:statusType,
			year:yearVal,
			schemeIdStr:schemeValArr,
			filterType:filterType,
			locationId:globalLocationValue
		}
		$.ajax({                
			type:'POST',    
			url: 'getExceededEncWorks',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
		 	if(result !=null && result.length>0){
				if(type=='graph'){
					buildGraphforExceededWorks(result,statusType)
				}else{
					buildExceededWorksBlocks(result,blockId,filterType,statusType,workType);
				}
			}else{
				if(type=='graph'){
					$("#ExceededWorkDetailsGraph").html("NO DATA AVAILABLE");
				}else{
					$('#'+blockId).html("NO DATA AVAILABLE");
				}
			}
		});
}
function buildGraphforExceededWorks(response,statusType){
	var dataArr = [];
	var totalCount=0;
	var statusNamesArr=[];
	var colors = [];
	if(statusType !=null && statusType==""){
		for(var i in response){
		  for(var j in response[i].subList){
				var tempArr = [];
				statusNamesArr.push(response[i].subList[j].name);
				dataArr.push({"y":response[i].subList[j].count,color: "#EE6CA9","extra":""+response[i].subList[j].ongoingPWSExceededCount+"-"+response[i].subList[j].completedPWSExceededCount});
				totalCount=totalCount+response[i].subList[j].count;
				
			}
		}
		$("#ExceededWorkDetailsGraph").highcharts({
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
				categories: statusNamesArr
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
					if(this.x == "In Time"){
						return '<b>' + this.x + '</b><br/>' +
						'Total : ' + this.y + '<br/>'+
						'Under Progress Works :' +value[0]+ '<br/>' +
						'Completed Works :' +value[1]+ '';
					}else{
						return '<b>' + this.x + '</b><br/>' +
						'Total : ' + this.y + '<br/>'+
						'OnGoing Exceeded Works :' +value[0]+ '<br/>' +
						'Completed Exceeded Works :' +value[1]+ '';
					}
					
				}
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
							if(this.y == 0){
								return null;
							}else{
								var pcnt = (this.y / totalCount) * 100;
								return '<span>'+this.y+'<br>('+Highcharts.numberFormat(pcnt)+'%)</span>';
							}
							
						}
					}
				}
			},
			series: [{
				name: '',
				data: dataArr,
				showInLegend: false
			}]
			
		});
	}else{
		var totalCount1=0;
		for(var i in response){
		  for(var j in response[i].subList){
				var tempArr = [];
				statusNamesArr.push(response[i].subList[j].name);
				dataArr.push({"y":response[i].subList[j].ongoingPWSExceededCount,color: "#EE6CA9"});
				totalCount1=totalCount1+response[i].subList[j].ongoingPWSExceededCount;
				
			}
		}
		$("#ExceededWorkDetailsGraph").highcharts({
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
				categories: statusNamesArr
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
					if(this.x == "In Time"){
						return '<b>' + this.x + '</b><br/>' +
						'Total : ' + this.y + '<br/>'+
						'underProgress Works :' +this.y+ '<br/>';
					}else{
						return '<b>' + this.x + '</b><br/>' +
						'Total : ' + this.y + '<br/>'+
						'underProgress Exceeded Works :' +this.y+ '<br/>';
					}
				}
			},
			plotOptions: {
				column: {
					dataLabels: {
						useHTML:true,
						enabled: true,
						color: '#000',
						align: 'center',
						style: {
							fontWeight: '',
							fontSize:'9px'
						},
						formatter: function() {
							if(this.y == 0){
								return null;
							}else{
								var pcnt = (this.y / totalCount1) * 100;
								return '<span>'+this.y+'<br>('+Highcharts.numberFormat(pcnt)+'%)</span>';
							
							}
							
						}
					}
				}
			},
			series: [{
				name: '',
				data: dataArr,
				showInLegend: false
			}]
			
		});
	}
		
}
 function buildExceededWorksBlocks(result,blockId,locationType,statusType,workType){
	 var table='';
	 	table+='<div class="table-responsive">';
			table+='<table class="table table-bordered m_top10" id="'+blockId+'dataTableId1">';
				table+='<thead>';
					table+='<tr>';
						if(blockId == 'statelevelBlockId'){
							table+='<th rowspan="2">STATE</th>';
						}else if(blockId == 'districtlevelBlockId'){
							table+='<th rowspan="2">DISTRICTS</th>';
						}else if(blockId == 'constituencylevelBlockId'){
							table+='<th rowspan="2">CONSTITUENCY</th>';
						}else if(blockId == 'mandallevelBlockId'){
							table+='<th rowspan="2">MANDALS</th>';
						}
						table+='<th rowspan="2">Total Works</th>';
						table+='<th rowspan="2">Total Exceeded</th>';
						for(var i in result[0].subList){
							if(result[0].subList[i].name !=null && result[0].subList[i].name =='In Time'){
								table+='<th colspan="2" style="background-color:#AAFFAF">'+result[0].subList[i].name+'</th>';
							}else{
								table+='<th colspan="2" style="background-color:#FF7D79">'+result[0].subList[i].name+'</th>';
							}
										
						}
					table+='</tr>';
					table+='<tr>';
						for(var i in result[0].subList){
							if(result[0].subList[i].name !=null && result[0].subList[i].name =='In Time'){
								table+='<th style="background-color:#AAFFAF">works</th>';
								table+='<th style="background-color:#AAFFAF"><span class="colspanLenIncstate"><i class="fa fa-inr m_top5" style="font-size:12px" aria-hidden="true"></i>&nbsp;In CR.</span></th>';
							}else{
								table+='<th style="background-color:#FF7D79">works</th>';
								table+='<th style="background-color:#FF7D79"><span class="colspanLenIncstate"><i class="fa fa-inr m_top5" style="font-size:12px" aria-hidden="true"></i>&nbsp;In CR.</span></th>';
							}
							
							
						}
					table+='</tr>';
					
				table+='</thead>';
				table+='<tbody>';
					for(var i in result){
						table+='<tr>';
							table+='<td>'+result[i].name+'</td>';
							if(result[i].count !=null && result[i].count>0){
								table+='<td class="schemsClickView" style="cursor:pointer;text-decoration:underline" attr_status="'+statusType+'" attr_location_type="'+locationType+'" attr_total_count = "'+result[i].count+'" attr_location_name="'+result[i].name+'" attr_district_val="'+result[i].locationIdStr+'" attr_filter_value="Total" attr_type="'+workType+'">'+result[i].count+'</td>';
							}else{
								table+='<td>-</td>';
							}
							if(result[i].ongoingPWSExceededCount !=null && result[i].ongoingPWSExceededCount>0){
								table+='<td class="schemsClickView" style="cursor:pointer;text-decoration:underline;" attr_status="'+statusType+'" attr_location_type="'+locationType+'" attr_total_count = "'+result[i].count+'" attr_location_name="'+result[i].name+'" attr_district_val="'+result[i].locationIdStr+'" attr_filter_value="Total Exceeded" attr_type="'+workType+'">'+result[i].ongoingPWSExceededCount+'</td>';
							}else{
								table+='<td>-</td>';
							}
							for(var j in result[i].subList){
								if(result[i].subList[j].name !=null && result[i].subList[j].name =='In Time') {
									if(result[i].subList[j].count !=null && result[i].subList[j].count>0){
									
									table+='<td class="schemsClickView" style="cursor:pointer;text-decoration:underline; background-color:#AAFFAF;font-weight:bold !important;" attr_status="'+statusType+'" attr_location_type="'+locationType+'" attr_filter_value="'+result[i].subList[j].name+'" attr_total_count = "'+result[i].subList[j].count+'" attr_type="'+workType+'" attr_location_name="'+result[i].name+'" attr_district_val="'+result[i].locationIdStr+'" >'+result[i].subList[j].count+'</td>';
									table+='<td style="background-color:#AAFFAF;font-weight:bold !important;">'+parseFloat(result[i].subList[j].sanctionedAmount/10000000).toFixed(2)+'</td>';
									}else{
										table+='<td style="background-color:#AAFFAF">-</td>';
										table+='<td style="background-color:#AAFFAF">-</td>';
									}
								}else{
									if(result[i].subList[j].count !=null && result[i].subList[j].count>0){
									
									table+='<td class="schemsClickView" style="cursor:pointer;text-decoration:underline; background-color:#FF7D79 !important;font-weight:bold !important;"  attr_status="'+statusType+'" attr_location_type="'+locationType+'" attr_filter_value="'+result[i].subList[j].name+'" attr_total_count = "'+result[i].subList[j].count+'" attr_type="'+workType+'" attr_location_name="'+result[i].name+'" attr_district_val="'+result[i].locationIdStr+'">'+result[i].subList[j].count+'</td>';
									table+='<td style="background-color:#FF7D79;font-weight:bold">'+parseFloat(result[i].subList[j].sanctionedAmount/10000000).toFixed(2)+'</td>';
									}else{
										table+='<td style="background-color:#FF7D79">-</td>';
										table+='<td style="background-color:#FF7D79">-</td>';
									}
								}
																
							}
						table+='</tr>';
					}
				table+='</tbody>';
			table+='</table>';
		table+='</div>';
	$("#"+blockId).html(table);
		
	if(blockId != 'statelevelBlockId'){
		$("#"+blockId+"dataTableId1").dataTable({
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
					title		:  "ENC WORKS DASHBOARD",
					filename	:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend		:'pdfHtml5',
					text		:'<i class="fa fa-file-pdf-o"></i>',
					titleAttr	:'PDF',
					title		: "ENC WORKS DASHBOARD",
					filename	: blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					orientation	: "landscape",
					pageSize	: 'A3',
					customize	: function (doc) {
								doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
						}
				}
			]
		});
	}
 }	 
 
 //Not grounded works
 
 function getLocationWiseNotGroundedExceededWorkDetails(blockId,filterType,type,empty,workType){
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
		schemeValArr=schemeVal;
	}
	if(type=='graph'){
		$("#NotGroundedExceededWorkDetailsGraph").html(spinner);
	}else{
		$("#"+blockId).html(spinner);
		
	}
		var json = {
			locationType:globalLocationType,
			fromDateStr:glStartDate,
			toDateStr:glEndDate,
			year:yearVal,
			schemeIdStr:schemeValArr,
			filterType:filterType,
			locationId:globalLocationValue
		}
		$.ajax({                
			type:'POST',    
			url: 'getLocationWiseNotGroundedWorks',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
		 	if(result !=null && result.length>0){
				if(type=='graph'){
					buildNotGroundedGraphforExceededWorks(result)
				}else{
					buildExceededWorksBlocks(result,blockId,filterType,"",workType);
				}
			}else{
				if(type=='graph'){
					$("#NotGroundedExceededWorkDetailsGraph").html("NO DATA AVAILABLE");
				}else{
					$('#'+blockId).html("NO DATA AVAILABLE");
				}
			}
		});
}

function buildNotGroundedGraphforExceededWorks(response){
	
	var dataArr = [];
	var totalCount=0;
	var statusnotGroundNamesArr=[];
	var colors1 = []
	for(var i in response){
		for(var j in response[i].subList){
			var tempArr = [];
			statusnotGroundNamesArr.push(response[i].subList[j].name);
			dataArr.push({"y":response[i].subList[j].count,color: "#C61379","extra":""+response[i].subList[j].ongoingPWSExceededCount+"-"+response[i].subList[j].completedPWSExceededCount});
			totalCount=totalCount+response[i].subList[j].count;
			
		}
	}
	$("#NotGroundedExceededWorkDetailsGraph").highcharts({
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
			categories: statusnotGroundNamesArr,
			
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
				if(this.x == "In Time"){
					return '<b>' + this.x + '</b><br/>' +
					'Not grounded : ' + this.y + '';
				}else{
					return '<b>' + this.x + '</b><br/>' +
					'Not grounded Exceeded : ' + this.y + '';
				}
				
			}
		},
		plotOptions: {
			column: {
				//colorByPoint: true
				dataLabels: {
					useHTML:true,
					enabled: true,
					color: '#000',
					align: 'center',
					style: {
						fontWeight: '',
						fontSize:'9px'
					},
					formatter: function() {
						if(this.y == 0){
							return null;
						}else{
							var pcnt = (this.y / totalCount) * 100;
							return '<span>'+this.y+'<br>('+Highcharts.numberFormat(pcnt)+'%)</span>';
						}
						
					}
				}
			}
		},
		series: [{
			name: '',
			data: dataArr,
			showInLegend: false
		}]
	});
}


// radio button click
$(document).on("click",".exceedWorkTypeCls",function(e){
	var statusType = $(this).val();
	if(statusType == ""){
		$(".headingExceedId").html("All Exceeded Works")
	}else{
		$(".headingExceedId").html("OnGoing Exceeded Works")
	}	
	getLocationWiseExceededWorkDetails("state","state","graph",statusType);
	levelWiseOverview();
});

// onClick of tab change
 $(document).on("click",".workWiseDetailsCls li",function(e){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	$(".workWiseDetailsCls li").removeClass("active");
	$(".workWiseDetailsCls li[attr_type="+type+"]").addClass("active")
	var locationType = $(this).attr("attr_location_type");
	var statusType1 =$('input:radio[name=optradio1]:checked').val();
	
	var levelWiseOverviewArr=[];
	if(globalLocationType !=null && globalLocationType.length ==0){
		levelWiseOverviewArr = ['state','district','constituency','mandal'];
	}else if(globalLocationType !=null && globalLocationType =='district'){
		levelWiseOverviewArr = ['district','constituency','mandal'];
	}else if(globalLocationType !=null && globalLocationType =='constituency'){
		levelWiseOverviewArr = ['constituency','mandal'];
	}else if(globalLocationType !=null && globalLocationType =='mandal'){
		levelWiseOverviewArr = ['mandal'];
	}
	for(var i in levelWiseOverviewArr){
		
		if(type == "works"){
			getLocationWiseWorksInformation(levelWiseOverviewArr[i]+'levelBlockId',levelWiseOverviewArr[i],'table');		
		}else if(type == "exceed"){
			getLocationWiseExceededWorkDetails(levelWiseOverviewArr[i]+'levelBlockId',levelWiseOverviewArr[i],'table',statusType1,"overAll");
		}else if(type == "notGrounded"){
			getLocationWiseNotGroundedExceededWorkDetails(levelWiseOverviewArr[i]+'levelBlockId',levelWiseOverviewArr[i],'table',"","notGrounded");
		}
	}
});

// onclick

$(document).on("click",".schemsClickView",function(){
	
	var status = $(this).attr("attr_status");
	var totalCount=$(this).attr("attr_total_count");
	var workStatus=$(this).attr("attr_type");
	var locationValue = $(this).attr("attr_filter_value");
	var locationType=$(this).attr("attr_location_type");
	var districtVal=$(this).attr("attr_district_val");
	var locationName=$(this).attr("attr_location_name");
	var grantId=$(this).attr("attr_id");
	var type=$(this).attr("type");
	if(workStatus == "overAll"){
		$("#modalHablitationDivId").modal('show');
		$("#modalExceededTable").html('');
		$("#modalSchemsTable").html('');
		$("#modalAmountSchemeTable").html('');
		$('#modalReviewReportTable').html('');
		$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+locationName+"&nbsp;&nbsp;"+locationType+"&nbsp;&nbsp;"+"("+locationValue+")&nbsp;&nbsp;Overview</h4>");
		getOnClickExceedWorkDetails(workStatus,totalCount,locationType,locationValue,districtVal,status);
	}else if(workStatus == "notGrounded"){
		$("#modalHablitationDivId").modal('show');
		$("#modalExceededTable").html('');
		$("#modalSchemsTable").html('');
		$("#modalAmountSchemeTable").html('');
		$('#modalReviewReportTable').html('');
		$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+locationName+"&nbsp;&nbsp;"+locationType+"&nbsp;&nbsp;"+status+"&nbsp;"+"("+locationValue+")&nbsp;&nbsp;Overview</h4>");
		getOnClickNotGroubnWorkDetails(workStatus,totalCount,locationType,locationValue,districtVal,status);
	}else{
		$("#modalHablitationDivId").modal('show');
			$("#modalExceededTable").html('');
		$("#modalSchemsTable").html('');
		$("#modalAmountSchemeTable").html('');
		$('#modalReviewReportTable').html('');
		$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+locationName+"&nbsp;&nbsp;"+locationType+"&nbsp;&nbsp;"+"("+workStatus+")&nbsp;&nbsp;Overview</h4>");
		getOnclickWorkSchemsDetails(workStatus,totalCount,locationValue,locationType,"",grantId,type);
		getAmountWiseEncWorksCount(workStatus,totalCount,locationValue,locationType,grantId,type);
	}
	
});

// get Onclcick overAll Works

function getOnclickWorkSchemsDetails(workStatus,totalCount,locationValue,locationType,amountRange,grantId,type){
	var worktype ='';
	if(workStatus=='Not Techincal Sancationed'){
		worktype='notTechSanctioned';
	}else if(workStatus=='Techincal Sancationed'){
		worktype='techSanctioned';
	}else if(workStatus=='Not Entrusted'){
		worktype='notEntrusted';
	}else if(workStatus=='UnderProgress'){
		worktype='Grounded';
	}else if(workStatus=='Grounded'){
		worktype='ongoing';
	}else{
		worktype =workStatus;
	}
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	var schemeValArr=[];
	if(grantId !=null && grantId>0){
		schemeValArr.push(grantId);
	}else{
		var schemeVal =$("#schemeDivId").val();
		if(schemeVal==null || schemeVal==""){
			schemeValArr=[];
		}else{
			schemeValArr=schemeVal;
		}
	}
	
	$("#modalSchemsTable").html(spinner);
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	var json = {
		year:yearVal,
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
		workStatus:worktype,
		locationType:locationType,
		locationValue:locationValue,
		schemeIdStr:schemeValArr,
		amountRange:amountRange,
		type:type
	}
	
	$.ajax({                
		type:'POST',    
		url: 'getLocationWiseEncWorksdetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildOnclickWorkSchemsDetails(result,status,workStatus,totalCount,amountRange);
		}else{
			
			$("#modalSchemsTable").html('No Data Available');
		}
		
	});
}

function buildOnclickWorkSchemsDetails(result,status,workStatus,totalCount,amountRange){
	var tableView='';
	tableView+='<div class="row m_top20">';
		tableView+='<div class="panel panel-default panel-black">';
			tableView+='<div class="panel-heading">';
				if(amountRange !=null && ( amountRange.length==0 || amountRange =="")){
					tableView+='<h5 class="font_weight">OverAll Works</h5>';
				}else{
					var range=""
					if(amountRange=="0-499999"){
						range="Less&nbsp;Than&nbsp;5,00,000";
					}else if(amountRange=="500000-999999"){
						range="5,00,000-10,00,000";
					}else if(amountRange=="1000000-4999999"){
						range="10,00,000-50,00,000";
					}else if(amountRange=="5000000-above"){
						range="50,00,000&nbsp;&&nbsp;Above";
					}
					tableView+='<h5 class="font_weight">'+range+' Works</h5>';
				}
				
			tableView+='</div>';
		tableView+='</div>';
	tableView+='</div>';
	tableView+='<div class="table-responsive m_top10">';
		tableView+='<table class="table table-bordered table_custom_SC encWorksCls" id="dataTableSchems">';
			tableView+='<thead>';
			tableView+='<tr>';
					tableView+='<th>Work ID</th>';
					tableView+='<th>Work NAME</th>';
					tableView+='<th>Grant Type</th>';
					tableView+='<th>Sub Grant Type</th>';
					tableView+='<th>DISTRICT</th>';
					tableView+='<th>CONSTITUENCY</th>';
					tableView+='<th>MANDAL</th>';
					tableView+='<th>HABITATIONS NAMES</th>';
					tableView+='<th>SANCTIONED AMOUNT(In Lakhs)</th>';
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
					tableView+='<th>UPDATED DATE</th>';
				tableView+='</tr>';
				
			tableView+='</thead>';
			tableView+='<tbody>';
			for(var i in result){
				tableView+='<tr>';
						tableView+='<td>'+result[i].workId+'</td>';
						tableView+='<td style="text-align:left !important;">'+result[i].workName+'</td>';
						tableView+='<td>'+result[i].grantName+'</td>';
						tableView+='<td>'+result[i].subGrantName+'</td>';
						tableView+='<td>'+result[i].districtName+'</td>';
						tableView+='<td>'+result[i].constituencyname+'</td>';
						tableView+='<td>'+result[i].mandalName+'</td>';
						tableView+='<td>'+result[i].habCode+'</td>';
						if(typeof result[i].sanctionedAmount === undefined ||typeof result[i].sanctionedAmount =="undefined" || result[i].sanctionedAmount =='' ){
							tableView+='<td>-</td>';
						}else{
							tableView+='<td>'+parseFloat(result[i].sanctionedAmount/100000).toFixed(2)+'</td>';
						}
						if(workStatus !="not grounded"){
							if(typeof result[i].targetDate === undefined ||typeof result[i].targetDate =="undefined" || result[i].targetDate =='' ){
								tableView+='<td>-</td>';
							}else{
								tableView+='<td>'+result[i].targetDate+'</td>';
							}if(typeof result[i].adminDate === undefined ||typeof result[i].adminDate =="undefined" || result[i].adminDate =='' ){
								tableView+='<td>-</td>';
							}else{
								tableView+='<td>'+result[i].adminDate+'</td>';
							}if(typeof result[i].techSanctionDate === undefined ||typeof result[i].techSanctionDate =="undefined" || result[i].techSanctionDate =='' ){
								tableView+='<td>-</td>';
							}else{
								tableView+='<td>'+result[i].techSanctionDate+'</td>';
							}if(typeof result[i].entrustedDate === undefined ||typeof result[i].entrustedDate =="undefined" || result[i].entrustedDate =='' ){
								tableView+='<td>-</td>';
							}else{
								tableView+='<td>'+result[i].entrustedDate+'</td>';
							}if(typeof result[i].groundedDate === undefined ||typeof result[i].groundedDate =="undefined" || result[i].groundedDate =='' ){
								tableView+='<td>-</td>';
							}else{
								tableView+='<td>'+result[i].groundedDate+'</td>';
							}if(typeof result[i].completedDate === undefined ||typeof result[i].completedDate =="undefined" || result[i].completedDate =='' ){
								tableView+='<td>-</td>';
							}else{
								tableView+='<td>'+result[i].completedDate+'</td>';
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
						if(typeof result[i].updatedTime === undefined ||typeof result[i].updatedTime =="undefined" || result[i].updatedTime =='' ){
								tableView+='<td>-</td>';
						}else{
							var dateStr= result[i].updatedTime.split(" ");
							tableView+='<td>'+dateStr[0]+'</td>';
						}
						
					tableView+='</tr>';
			}
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	$("#modalSchemsTable").html(tableView);
	$("#dataTableSchems").dataTable({
		"order": [ 0, 'desc' ],
		"iDisplayLength" : 5,
		"aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
		"scrollX":true,
		"fixedColumns":{ "leftColumns":2},
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Enc Works',
				filename:  'Enc Works'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
//getOnClickExceedWorkDetails(workStatus,totalCount,locationType,locationValue,districtVal);
function getOnClickExceedWorkDetails(workStatus,totalCount,locationType,locationValue,districtVal,status){
	
	$("#modalExceededTable").html(spinner);
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
		schemeValArr=schemeVal;
	}
	var json = {
		year:yearVal,
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
		exceededDuration:locationValue,
		locationType:locationType,
		locationValue:districtVal,
		schemeIdStr:schemeValArr,
		status:status
	}
	
	$.ajax({                
		type:'POST',    
		url: 'getOnclickExceededEncWorks',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildOnclickExcededWorkSchemsDetails(result,status,workStatus,totalCount);
		}else{
			
			$("#modalExceededTable").html('No Data Available');
		}
		
	});
}

function getOnClickNotGroubnWorkDetails(workStatus,totalCount,locationType,locationValue,districtVal){
	$("#modalExceededTable").html(spinner);
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
		schemeValArr=schemeVal;
	}
	var json = {
		year:yearVal,
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
		exceededDuration:locationValue,
		locationType:locationType,
		locationValue:districtVal,
		schemeIdStr:schemeValArr
		}
	
	$.ajax({                
		type:'POST',    
		url: 'getOnclickNotGroundedExceededEncWorks',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildOnclickExcededWorkSchemsDetails(result,status,workStatus,totalCount);
		}else{
			
			$("#modalExceededTable").html('No Data Available');
		}
		
	});
}

function buildOnclickExcededWorkSchemsDetails(result,status,workStatus,totalCount){
	var tableView='';
	tableView+='<div class="table-responsive">';
	tableView+='<table class="table table-bordered table_custom_SC encWorksCls" id="dataTableSchems2">';
		tableView+='<thead>';
		tableView+='<tr>';
				tableView+='<th>Work ID</th>';
				tableView+='<th>Work Name</th>';
				tableView+='<th>Grant Type</th>';
				tableView+='<th>District</th>';
				tableView+='<th>Constituency</th>';
				tableView+='<th>Mandal</th>';
				tableView+='<th>Habitation Names</th>';
				tableView+='<th>Sancationed Amount(In Lakhs)</th>';
				tableView+='<th>Exceeded Days</th>';
				tableView+='<th>Work Status</th>';
				tableView+='<th>Reasons&nbsp;For&nbsp;Delay</th>';
			tableView+='</tr>';
			
		tableView+='</thead>';
		tableView+='<tbody>';
		for(var i in result){
			tableView+='<tr>';
					
					tableView+='<td>'+result[i].wrokIdStr+'</td>';				
					tableView+='<td style="text-align:left !important; min-width:15%;">'+result[i].wrokName+'</td>';
					tableView+='<td>'+result[i].assetType+'</td>';
					tableView+='<td>'+result[i].districtName+'</td>';
					tableView+='<td>'+result[i].constituencyName+'</td>';
					tableView+='<td>'+result[i].mandalName+'</td>';
					tableView+='<td style="text-align:left !important;">'+result[i].habitationName+'</td>';
					if(typeof result[i].sanctionedAmount === undefined ||typeof result[i].sanctionedAmount =="undefined" || result[i].sanctionedAmount =='' ){
						tableView+='<td>-</td>';
					}else{
						tableView+='<td>'+parseFloat(result[i].sanctionedAmount/100000).toFixed(2)+'</td>';
					}
					tableView+='<td>'+result[i].noOfDays+'</td>';
					tableView+='<td>'+result[i].workStatus+'</td>';
					tableView+='<td style="text-align:left !important;">'+result[i].reason+'</td>';		
					
				tableView+='</tr>';
		}
		tableView+='</tbody>';
	tableView+='</table>';
	tableView+='</div>';
	$("#modalExceededTable").html(tableView);
	$("#dataTableSchems2").dataTable({
		"order": [ 0, 'desc' ],
		"iDisplayLength" : 5,
		"aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
		/* "scrollX":true,
		"fixedColumns":{ "leftColumns":2}, */
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Enc Works',
				filename:  'Enc Works'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}

function gettAllEncWorksByScheme(){
	
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
		locationType:globalLocationType,
		locationId:globalLocationValue
	}
	
	$.ajax({                
		type:'POST',    
		url: 'gettAllEncWorksByScheme',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildgettAllEncWorksBySchemeDetails(result);
		}else{
			$("#encSchemesEffeciencyDivId").html('No Data Available');
			$("#encSchemesTableDivId").html('No Data Available');
		}
		
	});
}

function buildgettAllEncWorksBySchemeDetails(result){
	var str=''; var total =0; var grounded=0; var entrust=0;
	var techSanctioned=0; var underProgress=0; var completed=0; var notGrounded=0;
	for(var i in result){
		total =total+parseInt(result[i].adminSanctionCount);
		grounded = grounded+parseInt(result[i].groundedCount);
		techSanctioned =techSanctioned+parseInt(result[i].technicallySanctionedCount);
		entrust = entrust+parseInt(result[i].totalWorksEntrusted);
		underProgress =underProgress+parseInt(result[i].underProcessCount);
		completed = completed+parseInt(result[i].completedCount);
		notGrounded=notGrounded+parseInt(result[i].notGrounded);
	}
	str+='<div class="col-sm-12 m_top10">';
		str+='<div class="table-responsive">';
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
						str+='<td style="background-color:#def2f7">'+(parseFloat(grounded/total)*100).toFixed(2)+'%</td>';
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
			tableView+='<table class="table table-bordered" id="dataTableSchems1">';
				tableView+='<thead>';
				tableView+='<tr>';
					tableView+='<th>GRANT&nbsp;NAME-SUB&nbsp;GRANT</th>';
					tableView+='<th>ADMIN SANCTIONED</th>';
					tableView+='<th>TECHNICALLY SANCTIONED</th>';
					tableView+='<th>ENTRUSTED</th>';
					tableView+='<th>NOT GROUNDED</th>';
					tableView+='<th style="background-color:#def2f7">EFFICIENCY %</th>';
					tableView+='<th>GROUNDED</th>';
					tableView+='<th>UNDER PROGRESS</th>';
					tableView+='<th>COMPLETED</th>';
						
				tableView+='</tr>';
					
				tableView+='</thead>';
				tableView+='<tbody>';
				for(var i in result){
					tableView+='<tr>';
							tableView+='<td>'+result[i].districtName+'-'+result[i].locationName+'</td>';
							if(result[i].adminSanctionCount !=null && parseInt(result[i].adminSanctionCount)>0){
								tableView+='<td class ="schemsClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="adminSanctioned" attr_location_type="'+globalLocationType+'" attr_location_name="'+globalLocationName+'" attr_filter_value="'+globalLocationValue+'"  type="graph" style="cursor:pointer;text-decoration:underline">'+result[i].adminSanctionCount+'</td>';
							}else{
								tableView+='<td>-</td>';
							}
							
							if(result[i].technicallySanctionedCount !=null && parseInt(result[i].technicallySanctionedCount)>0){
							tableView+='<td class ="schemsClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="Techincal Sancationed" attr_filter_value="'+globalLocationValue+'" attr_location_type="'+globalLocationType+'" attr_location_name="'+globalLocationName+'" type="graph" style="cursor:pointer;text-decoration:underline">'+result[i].technicallySanctionedCount+'</td>';
							}else{
								tableView+='<td>-</td>';
							}
							if(result[i].totalWorksEntrusted !=null && parseInt(result[i].totalWorksEntrusted)>0){
							tableView+='<td class ="schemsClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="entrusted" attr_filter_value="'+globalLocationValue+'" attr_location_type="'+globalLocationType+'" attr_location_name="'+globalLocationName+'"  type="graph" style="cursor:pointer;text-decoration:underline">'+result[i].totalWorksEntrusted+'</td>';
							}else{
								tableView+='<td>-</td>';
							}
							if(result[i].notGrounded !=null && result[i].notGrounded>0){
							tableView+='<td class ="schemsClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="Not Grounded"  attr_filter_value="'+globalLocationValue+'" attr_location_type="'+globalLocationType+'" attr_location_name="'+globalLocationName+'" type="graph" style="cursor:pointer;text-decoration:underline">'+result[i].notGrounded+'</td>';					
							}else{
								tableView+='<td>-</td>';
							}
							if(result[i].adminSanctionCount !=null && result[i].adminSanctionCount>0){
							tableView+='<td style="background-color:#def2f7">'+(parseFloat(result[i].groundedCount/result[i].adminSanctionCount)*100).toFixed(2)+'%</td>';
							}else{
								tableView+='<td>-</td>';
							}
							if(result[i].groundedCount !=null && result[i].groundedCount>0){
							tableView+='<td class ="schemsClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_type="Grounded"  attr_filter_value="'+globalLocationValue+'" attr_location_type="'+globalLocationType+'" attr_location_name="'+globalLocationName+'" type="graph" style="cursor:pointer;text-decoration:underline">'+result[i].groundedCount+'</td>';
							}else{
								tableView+='<td>-</td>';
							}
							if(result[i].underProcessCount !=null && result[i].underProcessCount>0){
							tableView+='<td class ="schemsClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_filter_value="'+globalLocationValue+'" attr_type="UnderProgress" attr_location_type="'+globalLocationType+'" attr_location_name="'+globalLocationName+'"  type="graph" style="cursor:pointer;text-decoration:underline">'+result[i].underProcessCount+'</td>';
							}else{
								tableView+='<td>-</td>';
							}
							if(result[i].completedCount !=null && result[i].completedCount>0){
								tableView+='<td class ="schemsClickView" attr_grant_type="'+result[i].locationName+'" attr_id="'+result[i].locationId+'" attr_filter_value="'+globalLocationValue+'" attr_location_type="'+globalLocationType+'" attr_location_name="'+globalLocationName+'" type="graph" attr_type="Completed" style="cursor:pointer;text-decoration:underline">'+result[i].completedCount+'</td>';
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
				title:	   'Enc Works',
				filename:  'Enc Works'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
	
}

function getAmountWiseEncWorksCount(workStatus,totalCount,locationValue,locationType,grantId,type){
	
	var worktype ='';
	if(workStatus=='Not Techincal Sancationed'){
		worktype='notTechSanctioned';
	}else if(workStatus=='Techincal Sancationed'){
		worktype='techSanctioned';
	}else if(workStatus=='Not Entrusted'){
		worktype='notEntrusted';
	}else if(workStatus=='UnderProgress'){
		worktype='Grounded';
	}else if(workStatus=='Grounded'){
		worktype='ongoing';
	}else{
		worktype =workStatus;
	}
	
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	var schemeValArr=[];
	var schemeValArr=[];
	if(grantId !=null && grantId>0){
		schemeValArr.push(grantId);
	}else{
		var schemeVal =$("#schemeDivId").val();
		if(schemeVal==null || schemeVal==""){
			schemeValArr=[];
		}else{
			schemeValArr=schemeVal;
		}
	}
	$("#modalAmountSchemeTable").html(spinner);
	var yearVal="";
	var financialVal =$("#financialYearId").val();
	if(financialVal != 0){
		 yearVal=financialVal;
	}
	var json = {
		year:yearVal,
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
		workStatus:worktype,
		locationType:locationType,
		locationValue:locationValue,
		schemeIdStr:schemeValArr,
		type:type
	}
	
	$.ajax({                
		type:'POST',    
		url: 'getAmountWiseEncWorksCount',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildAmountWiseEncWorks(result,status,workStatus,totalCount,locationValue,locationType,grantId,type);
		}else{
			
			$("#modalAmountSchemeTable").html('No Data Available');
		}
		
	});
}

function buildAmountWiseEncWorks(result,status,workStatus,totalCount,locationValue,locationType,grantId,type){
	var tableView='';
	tableView+='<div class="table-responsive">';
	tableView+='<table class="table table-bordered" id="dataTableSchems1">';
		tableView+='<thead>';
		tableView+='<tr>';
			tableView+='<th>AMOUNT&nbsp;RANGE</th>';
			for(var i in result){
				if(result[i].workName=="0-500000"){
					tableView+='<td align="center" class=>Less&nbsp;Than&nbsp;5,00,000</td>';
				}else if(result[i].workName=="500001-4000000"){
					tableView+='<td align="center">5,00,000-40,00,000</td>';
				}else if(result[i].workName=="4000001-20000000"){
					tableView+='<td align="center">40,00,000-2,00,00,000</td>';
				}else if(result[i].workName=="20000001-above"){
					tableView+='<td align="center">2,00,00,000&nbsp;&&nbsp;Above</td>';
				}
		}
		
		tableView+='</tr>';
		tableView+='<tr>';
			tableView+='<th>Works&nbsp;Count</th>';
			for(var i in result){
				if(result[i].workName=="0-500000"){
					if(result[i].adminSanctionCount !=0){
						tableView+='<td align="center" class="schemsClickView1"  attr_location_type="'+locationType+'" attr_filter_value="'+locationValue+'"attr_total_count = "'+result[i].adminSanctionCount+'" attr_type = "'+workStatus+'" attr_id="'+grantId+'" attr_location_name="'+result[i].workName+'" attr_is_graph="'+type+'"style="cursor:pointer;text-decoration:underline">'+result[i].adminSanctionCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					
				}else if(result[i].workName=="500001-4000000"){
					if(result[i].adminSanctionCount !=0){
						tableView+='<td align="center" class="schemsClickView1"  attr_location_type="'+locationType+'" attr_filter_value="'+locationValue+'"attr_total_count = "'+result[i].adminSanctionCount+'" attr_type = "'+workStatus+'" attr_id="'+grantId+'" attr_location_name="'+result[i].workName+'" attr_is_graph="'+type+'" style="cursor:pointer;text-decoration:underline">'+result[i].adminSanctionCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
				}else if(result[i].workName=="4000001-20000000"){
					if(result[i].adminSanctionCount !=0){
						tableView+='<td align="center" class="schemsClickView1"  attr_location_type="'+locationType+'" attr_filter_value="'+locationValue+'"attr_total_count = "'+result[i].adminSanctionCount+'" attr_type = "'+workStatus+'" attr_id="'+grantId+'" attr_location_name="'+result[i].workName+'" attr_is_graph="'+type+'" style="cursor:pointer;text-decoration:underline">'+result[i].adminSanctionCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
				}else if(result[i].workName=="20000001-above"){
					if(result[i].adminSanctionCount !=0){
						tableView+='<td align="center" class="schemsClickView1"  attr_location_type="'+locationType+'" attr_filter_value="'+locationValue+'"attr_total_count = "'+result[i].adminSanctionCount+'" attr_type = "'+workStatus+'" attr_id="'+grantId+'" attr_location_name="'+result[i].workName+'" attr_is_graph="'+type+'" style="cursor:pointer;text-decoration:underline">'+result[i].adminSanctionCount+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
				}
		}
		tableView+='</tr>';
		tableView+='</thead>';
	tableView+='</table>';
	tableView+='</div>';
	$("#modalAmountSchemeTable").html(tableView);
	
}

$(document).on("click",".schemsClickView1",function(){
	
	var status = $(this).attr("attr_status");
	var totalCount=$(this).attr("attr_total_count");
	var workStatus=$(this).attr("attr_type");
	var locationValue = $(this).attr("attr_filter_value");
	var locationType=$(this).attr("attr_location_type");
	var districtVal=$(this).attr("attr_district_val");
	var grantType= $(this).attr("attr_grant_type");
	var locationName=$(this).attr("attr_location_name");
	var grantId=$(this).attr("attr_id");
	var type = $(this).attr("attr_is_graph");
	$("#modalSchemsTable").html('');
	getOnclickWorkSchemsDetails(workStatus,totalCount,locationValue,locationType,locationName,grantId,type);
		
});

function weekWiseReport(){
	$("#weeklyReportTableDivId").html(spinner);
	var json = {
		toDateStr:toDateStr,
		fromDateStr:fromDateStr,
		locationType:globalLocationType,
		locationId:globalLocationValue
	}
	$.ajax({                
		type:'POST',    
		url: 'getWeekWiseReport',
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
	var totalGround=0;var totalTechSanc=0; var totalComp=0;
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
			}
		}
	}
	var tableView='';
	tableView+='<div class="col-sm-12 m_top10">';
		tableView+='<div class="table-responsive">';
			tableView+='<table class="table table-bordered" id="dataTablereviewId">';
				tableView+='<thead>';
					tableView+='<tr>';
					tableView+='<td  rowspan="2">Previous Status</div></td>'
					tableView+='<td rowspan="2" align:center>Total Count</td>'
					tableView+='<td rowspan="2" align:center>Status Changed Count</td>'
					tableView+='<td rowspan="2" align:center>Changed %</td>'
					tableView+='<td colspan="5" style="background-color:#ccc;">Current Status</td>';
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
	$("#modalHabliHeadingId").html("Status From "+previousStatus+" To "+currentStatus+" Changed Works" )
	$('#modalReviewReportTable').html("");
	$('#modalAmountSchemeTable').html("");
	$('#modalSchemsTable').html("");
	$('#modalExceededTable').html("");
	$('#modalNotGroundedExceededTable').html("");
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
		previousStatus:previousStatus,
		locationType:globalLocationType,
		locationId:globalLocationValue
	}
	$.ajax({                
		type:'POST',    
		url: 'getweekWiseReportStatusDetailsData',
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
								tableView+='<td>'+result[i].status+'</td>';
								if(result[i].previous !=null && result[i].previous.length>0){
									tableView+='<td>'+result[i].previous+'</td>';
								}else{
									tableView+='<td>New</td>';
								}								
								tableView+='<td>'+result[i].districtName+'</td>';
								tableView+='<td>'+result[i].mandalName+'</td>';
								tableView+='<td>'+result[i].adminDate+'</td>';
								tableView+='<td>'+parseFloat(result[i].sanctionedAmount/100000).toFixed(2)+'</td>';
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
 $(document).on("click",".menuDataCollapse",function(){
	globallocId = $(this).attr("attr_id");
	globallevelId = $(this).attr("attr_levelidvalue");
	globalLocationName=$(this).attr("attr_name");
	if(globallevelId == 2 || globallevelId == 0){
		globalLocationType = "";
		globalLocationValue=0;
	}else if(globallevelId == 3){
		globalLocationType = "district";
		globalLocationValue=globallocId;
	}else if(globallevelId == 4){
		globalLocationType = "constituency";
		globalLocationValue=globallocId;
	}else if(globallevelId == 5){
		globalLocationType = "mandal";
		globalLocationValue=globallocId;
	}
	$("#selectedName").text($(this).html());
	$("#selectedName").attr("attr_id",globallocId);
	$("#selectedName").attr("attr_levelidvalue",globallevelId);
	$("#selectedName").attr("attr_name",globalLocationName);	
	getAllSchemes();
	onloadCalls();
});