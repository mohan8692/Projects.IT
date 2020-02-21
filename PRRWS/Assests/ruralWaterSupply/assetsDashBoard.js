var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var levelWiseOverviewArr = ['state','district','constituency','division','subDivision','mandal'];
var currentYear="";
if(moment().format('MM').toString < "04"){
	currentYear = moment().year()
}else{
	currentYear = moment().year()+1;
}
var activeType="";
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
var glStartDate = "01-04-2014";
var	glEndDate = "01-04-"+currentYear;
getAllFiniancialYears();

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
		$("#financialYearId").append("<option value='1978-2050'>All Financial Years</option>");
		$("#financialYearId").append("<option value='1978-2014'>Before 2014</option>");
		$("#financialYearId").append("<option value=2014-"+currentYear+">2014-"+currentYear+"</option>");
		if(result != null && result.length >0){
			for(var i in result){
				var value = result[i].financialYear.split('-');
				$("#financialYearId").append("<option value="+result[i].financialYear+">"+result[i].financialYear+"</option>");
				
			}
			$("#financialYearId").val('2014-'+currentYear);
		}
		
		$("#financialYearId").chosen();
		$("#financialYearId").trigger('chosen:updated');
			onloadCalls("New");	
	});
}

$(document).on("change","#financialYearId",function(){
	var split=$(this).val().split('-')
	var yearId = $(this).val();
	glStartDate="01-04-"+split[0];
	glEndDate="01-04-"+split[1];
	onloadCalls("New");
});
$("#dateRangePickerAUM").daterangepicker({
	opens: 'left',
	startDate: glStartDate,
	endDate: glEndDate,
	locale: {
	  format: 'DD-MM-YYYY'
	},
	ranges: {
		'All':['01-01-1978', moment().add(10, 'years').endOf('year').format("DD-MM-YYYY")],
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
$("#dateRangePickerAUM").val('2014 To Till Now');
}
$('#dateRangePickerAUM').on('apply.daterangepicker', function(ev, picker) {
	glStartDate = picker.startDate.format('DD-MM-YYYY')
	glEndDate = picker.endDate.format('DD-MM-YYYY')
	if(picker.chosenLabel == '2014 To Till Now')
	{
	  $("#dateRangePickerAUM").val('2014 To Till Now');
	}
	$("#financialYearId").val('1900-2050');
	$("#financialYearId").trigger('chosen:updated');
		onloadCalls("New");
});

$(document).on("click",".alertCategoryWiseCls li",function(){
	$(this).parent("ul").find("li").removeClass("active");
	$(this).addClass("active");
	activeType = $(this).attr("attr_type");
	if(activeType !=null && activeType=='N'){
		glStartDate = "";
		glEndDate = "";
		$('#dateRangePickerCls').hide();
		$('#yearid').hide();
		onloadCalls("overAll");	
	}else{
		glStartDate = "01-04-2014";
		glEndDate = "01-04-"+currentYear;
		$('#dateRangePickerCls').show();
		$('#yearid').show();
		onloadCalls("New");	
	}
	//document.getElementsByClassName("btn-primary")[0].disabled = "true";
});



function onloadCalls(type){
	
	var statusType =$('input:radio[name=optradio1]:checked').val();
	levelWiseOverview(type);
	getAssetInfoBetweenDates("state","state","graph",statusType,"onGoing",type);
}

function levelWiseOverview(type)
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
						collapse+='<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#accordion" href="#collapse'+levelWiseOverviewArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseOverviewArr[i]+'">';
					}else{
						collapse+='<a role="button" class="panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse'+levelWiseOverviewArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseOverviewArr[i]+'">';
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
		getAssetInfoBetweenDates(levelWiseOverviewArr[i]+'levelBlockId',levelWiseOverviewArr[i],"table",statusType,"onGoing",type);
	}
}

function getAssetInfoBetweenDates(blockId,locationType,type,statusType,workType,dataType){
	if(type =="graph"){
			$("#assets").html(spinner);
		}else{
			$("#"+blockId).html(spinner);
			
		}
		var yearVal="";
		if(activeType !="N"){
			var financialVal =$("#financialYearId").val();
			if(financialVal != 0){
				 yearVal=financialVal;
			}
		}
		var url ="";
		if(dataType=='overAll'){
			url="getAssetsByschemeNew";
		}else{
			url ="getAssetsByscheme";
		}
		var json = {
			fromDateStr:glStartDate,
			toDateStr:glEndDate,
			year:yearVal,
			/* filterType:filterType,
			filterValue:filterValue,
			districtValue:districtValue, */
			locationType:locationType,
			type:type
		}
		$.ajax({
			url: url,
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result){
				if(dataType=="overAll"){
					
					if(type == "graph"){
						buildAssetCompareGraph(result);
					}
					if(result !=null && result.length>0){
						buildAssetComparision(result,blockId,locationType,statusType,workType);
					}else{
						$("#"+blockId).html("No Data Available");
					}		
				}else{
					if(type == "graph"){
						buildAssetInfoBetweenDates(result);
					}
					if(result !=null && result.length>0){
						buildAssetData(result,blockId,locationType,statusType,workType);
					}else{
						$("#"+blockId).html("No Data Available");
					}
					
				}
			}
		});
}

function buildAssetCompareGraph(result){
	
	var colorsArr=['#EE6CA9','#C61379'];
	var cateArr = [];
	var pwsArr = [];
	var cpwsArr = [];
	var before2014Total = 0;
	var After2014Total = 0;
	var totalAmountPWS = 0;
	var totalAmountCPWS = 0;
	
	var OnGoingExceededWorks='';
	var CompletedExceededWorks='';
	var CommissionedExceededWorks='';
	
	for(var i in result[0].basicList)
	{
		
		if(result[0].basicList[i].year == 'Before 2014'){
			before2014Total = before2014Total + result[0].basicList[i].count;
			
		}else if(result[0].basicList[i].year == 'After 2014'){
			After2014Total = After2014Total + result[0].basicList[i].count;
			
		}
		
		for( var j in result[0].basicList[i].basicList){
			cateArr.push(result[0].basicList[i].basicList[j].assetType);
			if(result[0].basicList[i].year == 'Before 2014'){
				pwsArr.push({"y":result[0].basicList[i].basicList[j].count,"extra":""});
			}else if(result[0].basicList[i].year == 'After 2014'){
				cpwsArr.push({"y":result[0].basicList[i].basicList[j].count,"extra":""});
			}
		}
	}
	$("#assets").highcharts({
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
					 '';
			}
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {
					enabled: true,
					y: -20,
					verticalAlign: 'top'
				}
			}
		},
		series: [{
			name: 'Before 2014',
			data: pwsArr,
			stack: 'PWS',
			color:'#EE6CA9'
		}, {
			name: 'After 2014',
			data: cpwsArr,
			stack: 'CPWS',
			color:'#C61379'
			}]
	});
	
}
function buildAssetInfoBetweenDates(result){
	var ajaxresp = null;
	if(result != null && result.length > 0){
		if(result[0].basicList != null && result[0].basicList.length > 0){
		  ajaxresp = result[0].basicList;
		}
		if(ajaxresp !=null && ajaxresp.length>0){
			var dataArr = [];
			var totalCount=0;
			var statusNamesArr=[];
				for(var i in ajaxresp)
				{
					var tempArr = [];
					statusNamesArr.push(ajaxresp[i].assetType);
					tempArr.push(parseInt(ajaxresp[i].count));
					dataArr.push(tempArr);
					totalCount=totalCount+parseInt(ajaxresp[i].count);
				  
				}
				var colors = ['#14BBAE'];
				var id = 'assets';
				var type = {
					type: 'column',
					backgroundColor:'transparent'
				};
				var legend = {
					enabled: false
				};
				var title = {
					text: ''
				};
				var yAxis = {
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					title: {
						text: null
					},
				};
				var xAxis = {
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					categories: statusNamesArr
				};
				var plotOptions ={ column: {
						colorByPoint: false
					}};
				var tooltip = {
					useHTML:true,
					formatter: function () {
						var pcnt = (this.y / totalCount) * 100;
						return '<b>' + this.x + '</b><br/>' +
							this.y+"-"+((Highcharts.numberFormat(pcnt)))+'%';
					}
				};

				var data = [{
					name: '',
					data: dataArr,

					dataLabels: {
						enabled: true,
						color: '#000',
						align: 'center',
						formatter: function() {
							var pcnt = (this.y / totalCount) * 100;
							return '<span>'+this.y+'<br>('+Highcharts.numberFormat(pcnt)+'%)</span>';
						}
					}
				}];
				highcharts(id,type,xAxis,yAxis,legend,data,plotOptions,tooltip,colors,title);
		}
	}else{
		$("#assets").html("No Data Available")
	}
}

function highcharts(id,type,xAxis,yAxis,legend,data,plotOptions,tooltip,colors,title)
{
	
	'use strict';
	$('#'+id).highcharts({
		 colors: colors,
		chart: type,
		title: title,
		subtitle: {
			text: null
		},
		xAxis: xAxis,
		yAxis: yAxis,
		tooltip: tooltip,
		plotOptions: plotOptions,
		legend: legend,
		series: data
	});
}



function buildAssetComparision(GLtbodyArr,blockId,locationType,statusType,workType){
	var tableView='';
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered" id="dataTable'+blockId+locationType+'">';
		tableView+='<thead class="text-capital">';
			tableView+='<tr>';
			tableView+='<th rowspan="2">'+locationType+'</th>';
			if(GLtbodyArr[0] !=null && GLtbodyArr[0].basicList !=null && GLtbodyArr[0].basicList.length>0){
				for(var j in GLtbodyArr[0].basicList){
					tableView+='<th colspan="2">'+GLtbodyArr[0].basicList[j].assetType+'</th>';
				}
			}
			tableView+='<th colspan="2">Total</th>';
			tableView+='</tr>';
			tableView+='<tr>';
			if(GLtbodyArr[0].basicList[0] !=null && GLtbodyArr[0].basicList[0].basicList !=null && GLtbodyArr[0].basicList[0].basicList.length>0){
				for(var j in GLtbodyArr[0].basicList){
					for(var k in GLtbodyArr[0].basicList[j].basicList){
						tableView+='<th>'+GLtbodyArr[0].basicList[j].basicList[k].year+'</th>';
					}
				}
			}
			for(var k in GLtbodyArr[0].basicList[0].basicList){
				tableView+='<th>'+GLtbodyArr[0].basicList[0].basicList[k].year+'</th>';
			}
			tableView+='</tr>';
			tableView+='</thead>';
			tableView+='<tbody>';
			for(var i in GLtbodyArr){
				var beforeTotal=0; var afterTotal=0;
				tableView+='<tr>';
					tableView+='<td>'+GLtbodyArr[i].name+'</td>';
				if(GLtbodyArr[i].basicList !=null && GLtbodyArr[i].basicList.length>0){
					for(var j in GLtbodyArr[i].basicList){
						for(var k in GLtbodyArr[i].basicList[j].basicList){
							if(GLtbodyArr[i].basicList[j].basicList[k].count !=null && GLtbodyArr[i].basicList[j].basicList[k].count>0){
								tableView+='<td class="" attr_status="'+GLtbodyArr[i].basicList[j].assetType+'" attr_filter_value="'+GLtbodyArr[i].goNumber+'" attr_district_val="'+GLtbodyArr[i].parentLocationId+'" attr_location_type="'+locationType+'" attr_total_count = "'+GLtbodyArr[i].basicList[j].basicList[k].count+'" attr_location_name="'+GLtbodyArr[i].name+'" >'+GLtbodyArr[i].basicList[j].basicList[k].count+'</td>';
							}else{
								tableView+='<td> - </td>';
							}
							if(GLtbodyArr[i].basicList[j].basicList[k].year=="Before 2014"){
								beforeTotal=beforeTotal+GLtbodyArr[i].basicList[j].basicList[k].count;
							}else{
								afterTotal=afterTotal+GLtbodyArr[i].basicList[j].basicList[k].count;
							}
						}
					}
				}
				if(beforeTotal>0){
					tableView+='<td>'+beforeTotal+' </td>';
				}else{
					tableView+='<td> - </td>';
				}if(afterTotal>0){
					tableView+='<td>'+afterTotal+' </td>';
				}else{
					tableView+='<td> - </td>';
				}
				tableView+='</tr>';
			} 
			tableView+='</tbody>';				
		tableView+='</table>';
	tableView+='</div>';
	$("#"+blockId).html(tableView);
	
	if(blockId != 'statelevelBlockId'){
		$("#dataTable"+blockId+locationType).dataTable({
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
					title		:  "Assets DASHBOARD",
					filename	:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}
}

function buildAssetData(GLtbodyArr,blockId,locationType,statusType,workType){

	var tableView='';
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered" id="dataTable'+blockId+locationType+'">';
		tableView+='<thead class="text-capital">';
			tableView+='<tr>';
			tableView+='<th>'+locationType+'</th>';
			if(GLtbodyArr[0] !=null && GLtbodyArr[0].basicList !=null && GLtbodyArr[0].basicList.length>0){
				for(var j in GLtbodyArr[0].basicList){
					tableView+='<th>'+GLtbodyArr[0].basicList[j].assetType+'</th>';
				}
			}
			tableView+='<th>TOTAL</th>';
			tableView+='</tr>';
			
			tableView+='</thead>';
			tableView+='<tbody>';
			for(var i in GLtbodyArr){
				var totalCount=0;
				tableView+='<tr>';
					tableView+='<td>'+GLtbodyArr[i].name+'</td>';
				
				if(GLtbodyArr[i].basicList !=null && GLtbodyArr[i].basicList.length>0){
					for(var j in GLtbodyArr[i].basicList){
						if(GLtbodyArr[i].basicList[j].count !=null && GLtbodyArr[i].basicList[j].count>0){
							tableView+='<td class="assetsClickView" attr_status="'+GLtbodyArr[i].basicList[j].assetType+'" attr_filter_value="'+GLtbodyArr[i].goNumber+'" attr_district_val="'+GLtbodyArr[i].parentLocationId+'" attr_location_type="'+locationType+'" attr_total_count = "'+GLtbodyArr[i].basicList[j].count+'" attr_location_name="'+GLtbodyArr[i].name+'" style="cursor:pointer;text-decoration:underline">'+GLtbodyArr[i].basicList[j].count+'</td>';
						}else{
							tableView+='<td> - </td>';
						}
						
						totalCount =totalCount+GLtbodyArr[i].basicList[j].count;
					}
				}
				if(totalCount >0){
					tableView+='<td>'+totalCount+'</td>';
				}else{
					tableView+='<td> - </td>';
				}
				
				tableView+='</tr>';
			}
			tableView+='</tbody>';				
		tableView+='</table>';
	tableView+='</div>';
	$("#"+blockId).html(tableView);
	
	if(blockId != 'statelevelBlockId'){
		$("#dataTable"+blockId+locationType).dataTable({
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
					title		:  "Assets DASHBOARD",
					filename	:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}

}

$(document).on("click",".assetsClickView",function(){
	$("#modalHablitationTable").html('');
	$("#modalAlertTable").html('');
	$("#modalAssetsTable").html('');
	$("#modalWaterSourceTable").html('');
	$("#modalIvrStatusTable").html('');
	$("#modalKpiTable").html('');
	$("#modalSchemsTable").html('');
	
	var status = $(this).attr("attr_status");
	var locationValue = $(this).attr("attr_filter_value");
	var locationType=$(this).attr("attr_location_type");
	var totalCount=$(this).attr("attr_total_count");
	var locationName=$(this).attr("attr_location_name");
	var districtVal = $(this).attr("attr_district_val");
	$("#modalHablitationDivId").modal('show');
	$("#modalHabliHeadingId").html("<h4 class='text-capital'>"+locationName+"&nbsp;&nbsp;"+locationType+"&nbsp;&nbsp;"+status+"&nbsp;&nbsp;Overview</h4>");
	var startIndex=0;
	getAssetDetailsByAssetType(status,locationType,locationValue,startIndex,totalCount,districtVal);
	
	
});

function getAssetDetailsByAssetType(status,locationType,locationValue,startIndex,totalCount,districtVal){
	$("#modalAssetsTable").html(spinner);
	var yearVal="";
	if(activeType !="N"){
		var financialVal =$("#financialYearId").val();
		if(financialVal != 0){
			 yearVal=financialVal;
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
		var districtVal1="";
		if(locationType == "mandal"){
			districtVal1=districtVal;
		}

	var json = {
		assetType:status,
		fromDateStr:glStartDate,
		toDateStr:glEndDate,
		filterType:filterType,
		filterValue:filterValue,
		year:yearVal,
		districtValue:districtVal1
	}
	$.ajax({                
		type:'POST',    
		url: 'getAssetDetailsBySchemeType',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildAssetDetailsByAssetType(result,status,locationType,locationValue,startIndex,totalCount);
		}else{
			$(".paginationId").html("");
			$("#modalAssetsTable").html('No Data Available');
		}
		
	});
}
//Asssets build
function buildAssetDetailsByAssetType(result,status,locationType,locationValue,startIndex,totalCount){
	var tableView='';
	tableView+='<table class="table table-bordered" id="dataTableAssetsTable">';
		tableView+='<thead>';
		tableView+='<tr>';
				tableView+='<th>DISTRICT</th>';
				tableView+='<th>CONSTITUENCY</th>';
				tableView+='<th>MANDAL</th>';
				tableView+='<th>HABITATIONS NAME</th>';
				tableView+='<th>HABITATIONS CODE</th>';
				tableView+='<th>ASSEST NAME</th>';
				tableView+='<th>ASSEST CODE</th>';
				tableView+='<th>ASSEST COST (In Lakhs)</th>';
			tableView+='</tr>';
			
		tableView+='</thead>';
		tableView+='<tbody>';
		for(var i in result){
			tableView+='<tr>';
					tableView+='<td>'+result[i].districtName+'</td>';
					tableView+='<td>'+result[i].constituencyName+'</td>';
					tableView+='<td>'+result[i].mandalName+'</td>';
					tableView+='<td>'+result[i].habitationName+'</td>';
					tableView+='<td>'+result[i].habitationCode+'</td>';
					tableView+='<td>'+result[i].assestName+'</td>';
					tableView+='<td>'+result[i].assestCode+'</td>';
					tableView+='<td>'+(parseFloat(result[i].assestCost)).toFixed(2)+'</td>';
				tableView+='</tr>';
		}
		tableView+='</tbody>';
	tableView+='</table>';
	$("#modalAssetsTable").html(tableView);
	$("#dataTableAssetsTable").dataTable({
		"order": [ 0, 'desc' ],
		"iDisplayLength" : 15,
		"aLengthMenu": [[15, 30, 50, -1], [15,30,50, "All"]],
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
