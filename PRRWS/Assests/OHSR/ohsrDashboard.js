var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var globalStatusObj={"ALL":"#000","Mechanized Dewatering":"#F64340","Sludge Removal":"#EB6F2C","High Pressure Cleaning":"#EB9A1D","Vacuum Cleaning":"#9DC639","Anti Bacterial Spray":"#97A702","UV Radiation":"#00CA85"}
var globalStatusBackGroundObj={"ALL":"#000","Mechanized Dewatering":"#FEEBEA","Sludge Removal":"#FCEFE8","High Pressure Cleaning":"#FCF4E7","Vacuum Cleaning":"#F4F8EA","Anti Bacterial Spray":"#F4F5E4","UV Radiation":"#E4F9F2"}
var currentFromDate=moment().startOf('Year').format("DD-MM-YYYY");
var currentToDate=moment().format("DD-MM-YYYY");
var globalImagesResults='';
var defaultDistrictId='';
var globalLocType = 'State';
var	globalLocId = 1;

$/* ("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
	$(".menuCls-table2").hide();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
	$(".menuCls-table2").hide();
}); */
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});

$(document).on("click",".menuDataCollapse",function(){
	globalLocId = $(this).attr("attr_id");
	var levelId = $(this).attr("attr_levelIdValue");
	console.log(levelId);
	$("#selectedName").text($(this).html());
	$("#selectedName").attr("attr_levelid",levelId);
	$("#selectedName").attr("attr_id",globalLocId);	
					
	if(levelId == 2){
		globalLocType = 'State';		
		locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3}];
	}else if(levelId == 3){
		globalLocType = 'District';	
		locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3}];
	}else if(levelId == 4){
		globalLocType = 'Constituency';
		locationArr =[{name:"Constituency",id:2},{name:"Mandal",id:3}];
	}
	onloadcalls();	
})

$("#dateRangePicker").daterangepicker({
	opens: 'left',
	startDate: currentFromDate,
	endDate: currentToDate,
	locale: {
	  format: 'DD-MM-YYYY'
	},
	ranges: {
	   'OverAll':[moment().subtract(20, 'years').startOf('year').format("DD-MM-YYYY"),  moment().format("DD-MM-YYYY")],
	   'Today' : [moment(), moment()],
	   'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
	   'This Month': [moment().startOf('month'),moment()],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	   'This Year': [moment().startOf('Year'), moment()],
	   'Last 1 Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
	}
});
var dates= $("#dateRangePicker").val();
var pickerDates = currentFromDate+' - '+currentToDate
if(dates == pickerDates)
{
	$("#dateRangePicker").val('This Year');
}
$('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
	currentFromDate = picker.startDate.format('DD-MM-YYYY');
	currentToDate = picker.endDate.format('DD-MM-YYYY');
	if(picker.chosenLabel == 'This Year')
	{
		$("#dateRangePicker").val('This Year');
	}
	onloadcalls();
});
onloadcalls();
function onloadcalls(){
	getOhsrOverviewDetails();
	getPhaseWiseOhsrDetails();
	timeLineAndLocationWiseDetails();
	stateLevelWiseDetails();	
	locationWiseDetails();
	getLocationWiseStagesList();
} 
function getOhsrOverviewDetails(){
	$('.spinnerCls').html(spinner);
	$('#ohsrDoNutChart').html(spinner);
	var json ={
		"fromDate":currentFromDate,
		"toDate":currentToDate,
		"locationType" : globalLocType,
		"locationTypeId" : globalLocId
	}
	$.ajax({                
		type:'POST',    
		url: 'getOhsrOverviewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildOhsrOverviewDetails(result);
		}else{
			
		}
	});
}
function buildOhsrOverviewDetails(result){
	$('#totNumOhrrsCntId').html(result.totalOhrsCunt);
	$('#completedOhrsCnt').html(result.completedOhsrCunt);
	$('#completedOhrsCntPerc').html(result.completedOhsrPerc+"%");
	$('#inProgressOhrsCnt').html(result.inProgressOhsrCunt);
	$('#inProgressOhrsCntPerc').html(result.inProgressOhsrPerc+'%');
	$('#notStartedCnt').html(result.notStartedOhsrCunt);
	$('#notStartedCntPerc').html(result.notStartedOhsrPerc+'%');
	
	buildDonutChart(parseInt(result.totalOhrsCunt),parseFloat(result.completedOhsrPerc),parseFloat(result.inProgressOhsrPerc),parseFloat(result.notStartedOhsrPerc));
}
function buildDonutChart(totalOhrsCunt,completed,inprogress,notStarted){
  $('#ohsrDoNutChart').highcharts( {
    colors:['#055309','#00ADF9','#FD0303'],
    chart: {
       type: 'pie',
       backgroundColor: 'transparent',
       spacingTop: 15, 
      
    },
    title: {
      text: '<h6>OHSRs<br/><b>'+totalOhrsCunt+'</b></h6>',
      align: 'center',
      verticalAlign: 'middle',
      y: -25,
      useHTML: true
    },
     tooltip: {
      enabled: false,
      pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
      
    },
    plotOptions: {
      pie: {
        shadow: false,
        size:120,
        innerSize:60,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance:-15,
          color: '#fff',
          format: '{point.percentage:.2f} %',
        },
        showInLegend: true,
      }      
        },    
    legend: {      
      layout: 'horizontal',
      align: 'left',      
      verticalAlign: 'bottom',  
      useHTML: true,
      symbolHeight: 8,
      symbolWidth: 8,
      symbolRadius: 4,      
    },
    series: [{
      name: 'Share',
      data: [
        { name: 'COMPLETED', y:completed },
        { name: 'IN-PROGRESS', y: inprogress},
        { name: 'NOT STARTED', y: notStarted },
      ]
    }]
  });
}
function getPhaseWiseOhsrDetails(){
	$('#ohsrColumnChart').html(spinner);
	var json ={
		"fromDate":currentFromDate,
		"toDate":currentToDate,
		"locationType" : globalLocType,
		"locationTypeId" : globalLocId
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getPhaseWiseOhsrDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildPhaseWiseOhsrDetails(result);
		}else{
			$('#ohsrColumnChart').html("No Data Available");
		}
	});
}
function buildPhaseWiseOhsrDetails(result){
	var categories=[];
	var completedCntArr=[];
	var inCompletedCntArr=[];
	var notStartedCntArr=[];
	var mainArr=[];
	for(var i in result){
		categories.push(result[i].name);
		completedCntArr.push(parseInt(result[i].completedOhsrCunt));
		inCompletedCntArr.push(parseInt(result[i].inProgressOhsrCunt));
		notStartedCntArr.push(parseInt(result[i].notStartedOhsrCunt));
	}
	mainArr.push({name: 'COMPLETED',data: completedCntArr},{ name: 'INPROGRESS',data: inCompletedCntArr}, {name: 'NOT STARTED',data: notStartedCntArr});
	buildColumnGraph(categories,mainArr);
}
function buildColumnGraph(categories,mainArr){
	$('#ohsrColumnChart').highcharts( {
		colors:['#055309','#00ADF9','#FD0303'],
		chart: {
			type: 'column',
			spacingTop: 30, 
			backgroundColor: 'transparent'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: categories,
			style:{
				fontWeight:'bold',
				fontSize:'12',
			},
		},
		yAxis: {
			title: {
				text: 'Total OHRSs',
				style:{
					fontWeight:'bold',
					verticalAlign:'middle',
				},
			},
			stackLabels: {
				enabled: true,
				style: {
					fontWeight: 'bold',
				}
			}
		},
		/* legend: {
			align: 'center',
			x: -30,
			verticalAlign: 'bottom',
			y: 25,
			floating: false,
			backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
			borderColor: '#CCC',
			borderWidth: 1,
			shadow: false
		}, */
		legend: {
		  enabled: true,
		  layout: 'horizontal',
		  align: 'center',
		  verticalAlign: 'bottom',
		  useHTML: true,
		  symbolHeight: 10,
		  symbolWidth: 10,
		  symbolRadius: 5,        
		},
		tooltip: {
			headerFormat: '<b>{point.x}</b><br/>',
			pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
		},
		plotOptions: {
			column: {
				stacking: '',
				dataLabels: {
					enabled: true,
					color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
				}
			}
		},
		series: mainArr,
	});
}
function timeLineAndLocationWiseDetails(){
	var collapse='';
		collapse+='<div class="panel-group" id="accordionTimeLine" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="headingTimeLine">';
					collapse+='<a role="button" class="panelCollapseIcon"   data-toggle="collapse" data-parent="#accordionTimeLine" href="#collapseTimeLine" aria-expanded="true" aria-controls="collapseTimeLine">';
						collapse+='<h4 class="panel-title">TIME LINE Vs LOCATION - WORKS MONITORING</h4>';
					collapse+='</a>';
				collapse+='</div>';
				collapse+='<div id="collapseTimeLine" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTimeLine">';
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';
							collapse+='<div class="col-sm-2">';
								collapse+='<label>Level<span id="warningText" class="m_left_10 bad_color"></span></label>';
								collapse+='<select class="form-control chosen-select" id="levelId">';
									//collapse+='<option value="0" >Select Level</option>';
									collapse+='<option value="3" selected>District</option>';
									collapse+='<option value="12">Division</option>';
									collapse+='<option value="13">Sub Division</option>';
									collapse+='<option value="5">Mandal</option>';
									//collapse+='<option value="6">Village</option>';
								collapse+='</select>';
							collapse+='</div>';
							collapse+='<div class="col-sm-2 districtCls">';
								collapse+='<label>District</label>';
								collapse+='<select class="form-control chosen-select" id="districtId">';
									collapse+='<option value="0">Select District</option>';
								collapse+='</select>';
							collapse+='</div>';
							collapse+='<div class="col-sm-2 divisionCls" style="display:none;">';
								collapse+='<label>Division</label>';
								collapse+='<select class="form-control chosen-select" id="divisionId">';
									collapse+='<option value="0">Select Division</option>';
								collapse+='</select>';
							collapse+='</div>';
							collapse+='<div class="col-sm-2 subdivisionCls" style="display:none;">';
								collapse+='<label>Sub-Division</label>';
								collapse+='<select class="form-control chosen-select" id="subdivisionId">';
									collapse+='<option value="0">Select Sub Division</option>';
								collapse+='</select>';
							collapse+='</div>';
							collapse+='<div class="col-sm-2 mandalCls" style="display:none;">';
								collapse+='<label>Mandal</label>';
								collapse+='<select class="form-control chosen-select" id="mandalId">';
									collapse+='<option value="0">Select Mandal</option>';
								collapse+='</select>';
							collapse+='</div>';
							/* collapse+='<div class="col-sm-2">';
								collapse+='<label>Village</label>';
								collapse+='<select class="form-control chosen-select" id="villageId">';
									collapse+='<option value="0">Select Village</option>';
								collapse+='</select>';
							collapse+='</div>'; */
							collapse+='<div class="col-sm-2">';
								collapse+='<button type="button" class="btn btn-primary btn-sm getTimeLocationCls m_top20">SUBMIT</button>';
							collapse+='</div>';
						collapse+='</div>';
						collapse+='<div class="row">';
							collapse+='<div id="workStagesDivId"></div>';
						collapse+='</div>';
						collapse+='<div class="row">';
							collapse+='<div class="col-sm-12">';
								collapse+='<div class="pad_border m_top10">';
									collapse+='<div id="workStagesCommulativeGraphDivId" style="height:200px;"></div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
						
						
						collapse+='<div class="row">';
							collapse+='<hr class="m_bottom_0" style="border-top: 1px solid #777 !important;"/>';
							collapse+='<div class="col-sm-12 m_top10">';
								collapse+='<div id="timeLineLocationDetailsDivId"></div>';
							collapse+='</div>';
						collapse+='</div>';
				
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
		collapse+='</div>';
	
	$("#timeLinesWorkTypesDivId").html(collapse);
	$(".chosen-select").chosen();
	getAllDistrictsOfAp('districtId','District');
	getAllDistrictsOfAp('locationWiseDistrictId','District');	
	getAllStages("workStagesDivId");
	getLocationStageWiseWorksForLineGraph(0,0,0,"workStagesCommulativeGraphDivId");
	getLocationWisePhaseStatusList();
}
function getAllDistrictsOfAp(divId,LevelVal){
	$("#"+divId).html('');
	var json = {};
	$.ajax({                
		type:'POST',    
		url: 'getAllDistrictsOfAp',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,LevelVal);
		}
	});
}
$(document).on("change","#districtId",function(){
	var districtId=$(this).val();
	//if(districtId == 0){
		$("#divisionId").html('');
		$("#divisionId").append('<option value="0">All</option>');
		$("#divisionId").trigger("chosen:updated");
		$("#subdivisionId").html('');
		$("#subdivisionId").append('<option value="0">All</option>');
		$("#subdivisionId").trigger("chosen:updated");
		$("#mandalId").html('');
		$("#mandalId").append('<option value="0">All</option>');
		$("#mandalId").trigger("chosen:updated");
	//}
	getDivisionsOfDistrict(districtId,'divisionId','Division');
});	
$(document).on("change","#locationWiseDistrictId",function(){
	var districtId=$(this).val();
	if(districtId == 0){
		$("#locationWiseDivisionId").html('');
		$("#locationWiseDivisionId").append('<option value="0">All</option>');
		$("#locationWiseDivisionId").trigger("chosen:updated");
		$("#locationWiseSubdivisionId").html('');
		$("#locationWiseSubdivisionId").append('<option value="0">All</option>');
		$("#locationWiseSubdivisionId").trigger("chosen:updated");
		$("#locationWiseMandalId").html('');
		$("#locationWiseMandalId").append('<option value="0">All</option>');
		$("#locationWiseMandalId").trigger("chosen:updated");
	}
	getDivisionsOfDistrict(districtId,'locationWiseDivisionId','Division');
});
function getDivisionsOfDistrict(districtId,divId,LevelVal){
	$("#"+divId).html('');
	var json = {
		 "districtId":districtId
	};
	$.ajax({                
		type:'POST',    
		url: 'getDivisionsOfDistrict',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,LevelVal);
		}
	});
}
$(document).on("change","#divisionId",function(){
	var divisonId=$(this).val();
	//if(divisonId == 0){
		$("#subdivisionId").html('');
		$("#subdivisionId").append('<option value="0">All</option>');
		$("#subdivisionId").trigger("chosen:updated");
		$("#mandalId").html('');
		$("#mandalId").append('<option value="0">All</option>');
		$("#mandalId").trigger("chosen:updated");
	//}
	getSubDivisionsOfDivision(divisonId,'subdivisionId','Sub Division');	
});
$(document).on("change","#locationWiseDivisionId",function(){
	var divisonId=$(this).val();
	//if(divisonId == 0){		
		$("#locationWiseSubdivisionId").html('');
		$("#locationWiseSubdivisionId").append('<option value="0">All</option>');
		$("#locationWiseSubdivisionId").trigger("chosen:updated");
		$("#locationWiseMandalId").html('');
		$("#locationWiseMandalId").append('<option value="0">All</option>');
		$("#locationWiseMandalId").trigger("chosen:updated");
	//}
	getSubDivisionsOfDivision(divisonId,'locationWiseSubdivisionId','Sub Division');
});
function getSubDivisionsOfDivision(divisonId,divId,LevelVal){
	$("#"+divId).html('');
	var json = {
		 "divisonId":divisonId
	};
	$.ajax({                
		type:'POST',    
		url: 'getSubDivisionsOfDivision',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,LevelVal);
		}
	});
}
$(document).on("change","#subdivisionId",function(){
	var subDivisonId=$(this).val();
	if(subDivisonId == 0){
		$("#mandalId").html('');
		$("#mandalId").append('<option value="0">All</option>');
		$("#mandalId").trigger("chosen:updated");
	}
	getTehsilsOfSubDivision(subDivisonId,'mandalId','Mandal');
});
$(document).on("change","#locationWiseSubdivisionId",function(){
	var subDivisonId=$(this).val();
	if(subDivisonId == 0){		
		$("#locationWiseMandalId").html('');
		$("#locationWiseMandalId").append('<option value="0">All</option>');
		$("#locationWiseMandalId").trigger("chosen:updated");
	}
	getTehsilsOfSubDivision(subDivisonId,'locationWiseMandalId','Mandal');
});
function getTehsilsOfSubDivision(subDivisonId,divId,LevelVal){
	$("#"+divId).html('');
	var json = {
		 "subDivisonId":subDivisonId
	};
	$.ajax({                
		type:'POST',    
		url: 'getTehsilsOfSubDivision',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId,LevelVal);
		}else{
			$("#"+divId).html("<option value='0'>All</option>").chosen().trigger("chosen:updated");
		}
	});
}
function buildSelectBox(result,divId,LevelVal){
	var str='';	
	$("#"+divId).html('');
	if(globalLocId != 1 && (divId =="districtId" || divId =="locationWiseDistrictId")){
		for(var i in result){
			if(globalLocId == result[i].key){
				$("#"+divId).append('<option value="'+result[i].key+'">'+result[i].value+'</option>');
			}			
		}		
	}else{
		$("#"+divId).append('<option value="0" selected>All</option>');
		for(var i in result){
			$("#"+divId).append('<option value="'+result[i].key+'">'+result[i].value+'</option>');
		}	
	}
	$("#"+divId).trigger("chosen:updated");	
	
}	
function getAllStages(workStagesDivId){
	$('#'+workStagesDivId).html(spinner);
	var json ={
	}
	$.ajax({                
		type:'POST',    
		url: 'getAllStages',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildStages(result,workStagesDivId);
		}else{
			
		}
	});
}
function buildStages(result,workStagesDivId){
	var str='';		
	if(workStagesDivId == "workStagesDivId"){
		levelType="workStagesCommulativeGraphDivId";
		str+='<hr class="m_bottom_0" style="border-top: 1px solid #777 !important;"/>';
	}else if(workStagesDivId == "locationWiseWorkStagesDivId"){
		levelType="locationLevelFourthBlockDivId";
	}	
	str+='<div class="pad_10 status">';
		str+='<ul class="list-inline workStagesCls">';
			str+='<li style="border:2px solid #000" attr_work_statusid ="0" attr_value="ALL" attr_levelType="'+levelType+'" attr_work_id="1"><h5 style="background-color:#000">All</h5></li>';
			for(var i in result){				
				str+='<li  attr_work_statusid="'+result[i].id+'" attr_value="'+result[i].name+'" attr_levelType="'+levelType+'" attr_work_id="1"><h5 style="background-color:'+globalStatusObj[result[i].name]+'">'+result[i].name+'</h5></li>';
			}
		str+='</ul>';
	str+='</div>'
	str+='<hr class="m_bottom_0" style="border-top: 1px solid #777 !important;margin-top: 10px;"/>';
	
	$('#'+workStagesDivId).html(str);	
	
}
function getLocationStageWiseWorksForLineGraph(statusId,levelId,levelValue,divId){	
	$("#"+divId).html(spinner);	
	var districtId=$("#districtId").val();
	var divisonId=$("#divisionId").val();
	var subDivisonId=$("#subdivisionId").val();
	var mandalId=$("#mandalId").val();	
	if(levelId == 3){
		districtId=levelValue;
	}else if(levelId == 12){
		divisonId=levelValue;
	}else if(levelId == 13){
		subDivisonId=levelValue;
	}else if(levelId == 5){
		mandalId=levelValue;
	}
	var json ={
			"fromDate" : currentFromDate,
		  "toDate": currentToDate,
		  "statusId"  : statusId,
		  "districtId" :   districtId,
		  "divisonId"   : divisonId,
		  "subDivisonId" :subDivisonId,
		  "mandalId"  : mandalId,
		  "locationType" : globalLocType,
		  "locationTypeId" : globalLocId
		  
	}
	$.ajax({                
		type:'POST',    
		url: 'getLocationStageWiseWorksForLineGraph',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result != undefined && result != '' ){
			$("#"+divId).css("height","200px");
			buildLocationStageWiseWorksForLineGraph(result,divId,statusId);		
		}else{			
			$("#"+divId).html("No Data Available");
			$("#"+divId).removeAttr("style");
		}
	});
}
function buildLocationStageWiseWorksForLineGraph(result,divId,statusId){
	var mainDataArr=[];
	var wpPosArr1=[];
	var categoriesArr=[];
	if(statusId != 0){
		statusId = statusId -1;
	}
	var j=statusId;
	for(var i in result[j].subList){
		categoriesArr.push(result[j].subList[i].date);
	}
	for(var i in result){		
		var wpPosArr=[];
		for(var j in result[i].subList){
			wpPosArr.push(result[i].subList[j].totalOhrsCunt);
		}
		var obj={
			name:result[i].name,
			data: wpPosArr,
			color:globalStatusObj[result[i].name]
		};
		mainDataArr.push(obj);
	}
	
	$('#'+divId).highcharts({
		chart: {
			type: 'spline',
			backgroundColor:'transparent'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			categories:categoriesArr
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
				text: ''
			},
			labels: {
				formatter: function () {
					return this.value;
				}
			}
		},
		tooltip: {
			formatter: function () {
			var s = '<b>' + this.x + '</b>';

				$.each(this.points, function () {
					if(this.series.name != "Series 1")  
					s += '<br/><b style="color:'+this.series.color+'">' + this.series.name + '</b> : ' +
					this.y+"";
				});

				return s;
			},
			shared: true
		},
		plotOptions: {
			
		},
		series: mainDataArr
	}); 
}
function getLocationWisePhaseStatusList(){
	$('#timeLineLocationDetailsDivId').html(spinner);
	var levelId=$("#levelId").val()
	var districtId=$("#districtId").val();
	var divisonId=$("#divisionId").val();
	var subDivisonId=$("#subdivisionId").val();
	var mandalId=$("#mandalId").val();
	var json ={
			"fromDate" :currentFromDate,
			  "toDate": currentToDate,
			  "locationLevelId" :levelId,
			  "districtId" :   districtId,
			  "divisonId"   : divisonId,
			  "subDivisonId" :subDivisonId,
			  "mandalId"  :mandalId,
			  "locationType" : globalLocType,
		      "locationTypeId" : globalLocId
	}
	$.ajax({                
		type:'POST',    
		url: 'getLocationWisePhaseStatusList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildLocationWisePhaseStatusList(result);
		}else{
			
		}
	});
}
function buildLocationWisePhaseStatusList(result){
	var length=10;
	var colspan = 6;
	var phaseClrArr ={"phaseI": "#DBFBFD","phaseII": "#B8F6F8","phaseIII": "#8BDADE"}
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC" id="ohrsLocationDataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th style="background-color:#F3F3F3 !important;" rowspan="3">Location</th>';
					str+='<th style="background-color:#C6DEEA !important;" rowspan="3">Total OHSRs</th>';
					str+='<th style="background-color:#C4EEE6 !important;" rowspan="3">Target OHSRs</th>';
					str+='<th style="background-color:#C4EEE6 !important;" rowspan="3">%</th>';
					if(result[0].subList.length > 0){
						str+='<th style="background-color:#E3E3E3 !important;" colspan="10">CYCLE - 6 MONTHS</th>';
					}
				str+='</tr>';
				str+='<tr>';
				if(result[0].subList.length > 0){
					for(var i in result[0].subList){							
						str+='<th style="background-color:'+phaseClrArr[result[0].subList[i].name]+' !important;" colspan="10">'+result[0].subList[i].name+'<br/>('+result[0].subList[i].startDate+' to '+result[0].subList[i].endDate+')</th>';
					}
				}
				str+='</tr>';
				if(result[0].subList.length > 0){
					str+='<tr>';					
						str+='<th style="background-color:#fff !important; color:#FC0404 !important;">Not Started</th>';
						str+='<th style="background-color:#fff !important; color:#FC0404 !important;">%</th>';
						str+='<th style="background-color:#fff !important; color:#118DC4 !important;">In-Progress</th>';
						str+='<th style="background-color:#fff !important; color:#118DC4 !important;">%</th>';
						str+='<th style="background-color:#fff !important; color:#025E11 !important;">Completed</th>';
						str+='<th style="background-color:#fff !important; color:#025E11 !important;">%</th>';
						str+='<th style="background-color:#fff !important; color:#025E11 !important;">Approved</th>';
						str+='<th style="background-color:#fff !important; color:#025E11 !important;">%</th>';
						str+='<th style="background-color:#fff !important; color:#FC0404 !important;">Not Approved</th>';
						str+='<th style="background-color:#fff !important; color:#FC0404 !important;">%</th>';
					str+='</tr>';
				}
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td style="text-align:left !important; cursor:pointer;"><a class="openNextTrShowCls" attr_tr_name="'+result[i].locationName.replace(/\s/g,'')+'" attr_tot_ohsr_cnt="'+result[i].totalOhrsCunt+'" attr_targ_cnt="'+result[i].targetOhsrCunt+'" attr_locationscopelid="'+result[i].locationId+'" attr_work_id="1" attr_sub_length="'+result[0].subList.length+'">'+result[i].locationName+'</td>';
						str+='<td style="background-color:#E6F3F9 !important;">'+result[i].totalOhrsCunt+'</td>';
						str+='<td style="background-color:#E5FBF7 !important;">'+result[i].targetOhsrCunt+'</td>';
						str+='<td class="text-successs" style="background-color:#E5FBF7 !important;">'+result[i].perc+'</td>';
						if(result[i].subList.length > 0){
							for(var j in result[i].subList){
								if(result[i].subList[j].notStartedOhsrCunt > 0){
									str+='<td style="background-color:#fff !important;">'+result[i].subList[j].notStartedOhsrCunt+'</td>';
								} else{
									str+='<td style="background-color:#fff !important;">-</td>';
								}
								if(result[i].subList[j].notStartedOhsrPerc > 0){
									str+='<td  class="text-successs" style="background-color:#fff !important;">'+result[i].subList[j].notStartedOhsrPerc+'</td>';
								}else{
									str+='<td  class="text-successs" style="background-color:#fff !important;">-</td>';
								}
								if(result[i].subList[j].inProgressOhsrCunt > 0){	
									str+='<td style="background-color:#fff !important;">'+result[i].subList[j].inProgressOhsrCunt+'</td>';
								} else{
									str+='<td style="background-color:#fff !important;">-</td>';
								}
								if(result[i].subList[j].inProgressOhsrPerc > 0){
									str+='<td  class="text-successs" style="background-color:#fff !important;">'+result[i].subList[j].inProgressOhsrPerc+'</td>';
								}else{
									str+='<td  class="text-successs" style="background-color:#fff !important;">-</td>';
								}
								if(result[i].subList[j].completedOhsrCunt > 0){
									str+='<td style="background-color:#fff !important;">'+result[i].subList[j].completedOhsrCunt+'</td>';
								}else{
									str+='<td style="background-color:#fff !important;">-</td>';
								}
								if(result[i].subList[j].completedOhsrPerc > 0){
									str+='<td  class="text-successs" style="background-color:#fff !important;">'+result[i].subList[j].completedOhsrPerc+'</td>';
								}else{
									str+='<td  class="text-successs" style="background-color:#fff !important;">-</td>';
								}								
								if(result[i].subList[j].approvedCount > 0){
									str+='<td "style="cursor:pointer;background-color:#fff !important;"><a class ="statusClkCls" attr_locationId="'+result[i].locationId+'" attr_status_id ="4">'+result[i].subList[j].approvedCount+'</td>';
								} else{
									str+='<td style="background-color:#fff !important;">-</td>';
								}
								if(result[i].subList[j].approvedPer > 0){
									str+='<td  class="text-successs" style="background-color:#fff !important;cursor:pointer;">'+result[i].subList[j].approvedPer+'</td>';
								}else{
									str+='<td  class="text-successs" style="background-color:#fff !important;">-</td>';
								}
								if(result[i].subList[j].notApprovedCount > 0){
									str+='<td style=" cursor:pointer; background-color:#fff !important;"><a class ="statusClkCls" attr_status_id ="5" attr_locationId="'+result[i].locationId+'">'+result[i].subList[j].notApprovedCount+'</td>';
								}else{
									str+='<td style="background-color:#fff !important;">-</td>';
								} 
								if(result[i].subList[j].notApprovedPer > 0){
									str+='<td  class="text-successs" style="background-color:#fff !important;">'+result[i].subList[j].notApprovedPer+'</td>';
								}else{
									str+='<td  class="text-successs" style="background-color:#fff !important;">-</td>';
								}
								
							}
						}
					str+='</tr>';
					/* str+='<tr class="show'+result[i].locationName.replace(/\s/g,'')+i+'" style="display:none;">';
						str+='<td colspan="'+length+'" style="background-color: #dbdbdb !important;">';
							str+='<div id="subLocationLevelWiseStatusDivId'+i+'"></div>';
						str+='</td">';
					str+='</tr>'; */	
				}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$('#timeLineLocationDetailsDivId').html(str);
	 $("#ohrsLocationDataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 25, 35, 50, -1], [15, 25, 35, 50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "swachadhara",
				filename:  'swachadhara'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); 
}
$(document).on("click",".openNextTrShowCls",function(){
	//var tr_id = $(this).attr("attr_tr_id");
	var tr_name = $(this).attr("attr_tr_name");
	var totOhsrCnt=$(this).attr("attr_tot_ohsr_cnt");
	var targCnt=$(this).attr("attr_targ_cnt");
	var locationScopeId = $(this).attr("attr_locationscopelid");
	var locationLevelId =	$('#levelId').val();
	var levelName = $("#levelId option:selected").text();	
	$('#timeLineLocationWiseModalHeadingId').html(tr_name+" "+levelName+" - All Stages Details");
	$('#timeLineLocationWiseModalId').modal('show');
	getLocationPhaseWiseStatuDetailsForStages(locationScopeId,locationLevelId,totOhsrCnt,targCnt);
	//var subListLen=parseInt($(this).attr('attr_sub_length'));
	 /* if($(this).hasClass('active')){
		$(this).removeClass('fa fa-plus').addClass('fa fa-minus');
		$(this).removeClass('plus_icon_WMS').addClass('minus_icon_WMS');
		$(this).removeClass('active');
		$(".show"+tr_name+tr_id).show(); 
		getLocationPhaseWiseStatuDetailsForStages(locationScopeId,locationLevelId,totOhsrCnt,targCnt);
	}else{
		$(this).removeClass('fa fa-minus').addClass('fa fa-plus');
		$(this).removeClass('minus_icon_WMS').addClass('plus_icon_WMS');
		$(this).addClass('active');
		$(".show"+tr_name+tr_id).hide();  
	}*/ 
});
function getLocationPhaseWiseStatuDetailsForStages(locationScopeId,locationLevelId,totOhsrCnt,targCnt){
	$("#timeLineLocationWiseModalDivId").html(spinner);
	var json ={
		  "fromDate" : currentFromDate,
		  "toDate": currentToDate,
		  "locationLevelId" : locationLevelId,
		  "locationValue" : locationScopeId,
		  "locationType" : globalLocType,
		  "locationTypeId" : globalLocId
		}
	$.ajax({                
		type:'POST',    
		url: 'getLocationPhaseWiseStatuDetailsForStages',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildLocationPhaseWiseStatuDetailsForStages(result,totOhsrCnt,targCnt);
			
		}else{
			$("#timeLineLocationWiseModalDivId").html("No Data Available");
		}
	});
}

function buildLocationPhaseWiseStatuDetailsForStages(result,totOhsrCnt,targCnt){
	var k=0;
	var statusClrArr ={"Mechanized Dewatering":"#feebea","Sludge Removal":"#fcefe8","High Pressure Cleaning":"#fcf4e7","Vacuum Cleaning":"#f4f8ea","Anti Bacterial Spray":"#f4f5e4","UV Radiation":"#e4f9f2"}
	var str='';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC" id="">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2">Cleaning Stage</th>';
						str+='<th rowspan="2">Total OHSRs</th>';
						str+='<th rowspan="2">Target OHSRs</th>';						
						for(var j in result[0].subList){
							str+='<th colspan="6">'+result[0].subList[j].name+'</th>';
						}
						
					str+='</tr>';					
					str+='<tr>';					
						str+='<th color:#025E11 !important;">Completed</th>';
						str+='<th color:#025E11 !important;">%</th>';
						str+='<th color:#118DC4 !important;">In-Progress</th>';
						str+='<th color:#118DC4 !important;">%</th>';
						str+='<th color:#FC0404 !important;">Not Started</th>';
						str+='<th color:#FC0404 !important;">%</th>';
					str+='</tr>';
				str+='</thead>';					
				str+='<tbody>';	
				for(var i in result){
					k=k+1;
					str+='<tr>';
						if(result[i].name != null && typeof(result[i].name)!= "undefined"){
							str+='<td style="text-align: left !important; background-color:'+statusClrArr[result[i].name]+'"><span class="statusRoundCss" style="background-color:'+globalStatusObj[result[i].name]+' !important; margin-right: 5px;">0'+k+'</span>'+result[i].name+'</td>';
						}else{
							str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
						}
						if(totOhsrCnt !== null && totOhsrCnt.length > 0){
							str+='<td style="background-color:'+statusClrArr[result[i].name]+'">'+totOhsrCnt+'</td>';
						}else{
							str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
						}
						if(targCnt !== null && targCnt.length > 0){
							str+='<td style="background-color:'+statusClrArr[result[i].name]+'">'+targCnt+'</td>';
						}else{
							str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
						}
					
					if(result[i].subList != null && result[i].subList.length > 0){
						for(var j in result[i].subList){
							var completedOhsrPerc = (result[i].subList[j].completedOhsrCunt*100/targCnt).toFixed(2);
							var inProgressOhsrPerc = (result[i].subList[j].inProgressOhsrCunt*100/targCnt).toFixed(2);
							var notStartedOhsrCunt = targCnt-result[i].subList[j].completedOhsrCunt-result[i].subList[j].inProgressOhsrCunt;
							var notStartedOhsrPerc = (notStartedOhsrCunt*100/targCnt).toFixed(2);
							if(result[i].subList[j].completedOhsrCunt !== null && result[i].subList[j].completedOhsrCunt > 0){
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">'+result[i].subList[j].completedOhsrCunt+'</td>';
							}else{
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
							}
							if(completedOhsrPerc !== null && completedOhsrPerc > 0){
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">'+completedOhsrPerc+'</td>';
							}else{
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
							}
							if(result[i].subList[j].inProgressOhsrCunt !== null && result[i].subList[j].inProgressOhsrCunt > 0){
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">'+result[i].subList[j].inProgressOhsrCunt+'</td>';
							}else{
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
							}
							if(inProgressOhsrPerc !== null && inProgressOhsrPerc > 0){
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">'+inProgressOhsrPerc+'</td>';
							}else{
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
							}
							if(notStartedOhsrCunt !== null && notStartedOhsrCunt > 0){
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">'+notStartedOhsrCunt+'</td>';
							}else{
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
							}
							if(notStartedOhsrPerc !== null && notStartedOhsrPerc > 0){
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">'+notStartedOhsrPerc+'</td>';
							}else{
								str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
							}
						}
					}else{
						str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
						str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
						str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
						str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
						str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
						str+='<td style="background-color:'+statusClrArr[result[i].name]+'">-</td>';
					}
					
					str+='</tr>';	
				}
				str+='</tbody>';					
			str+='</table>';
		str+='</div>';
	str+='</div>';
	if(result[0].subList.length > 0){
		$("#timeLineLocationWiseModalDivId").html(str);
	}else{
		$("#timeLineLocationWiseModalDivId").html("NO DATA AVAILABLE");
	}
	
}
$(document).on("change","#levelId",function(){
	$("#warningText").html("");
	var levelId=$(this).val();
	getAllDistrictsOfAp('districtId','District');	
	getDivisionsOfDistrict(globalLocId,'divisionId','Division');
	if(levelId == 3){
		$(".districtCls").show();
		$(".divisionCls,.subdivisionCls,.mandalCls").hide();
		$("#divisionId").html('');
		$("#divisionId").append('<option value="0">All</option>');
		$("#divisionId").trigger("chosen:updated");
		$("#subdivisionId").html('');
		$("#subdivisionId").append('<option value="0">All</option>');
		$("#subdivisionId").trigger("chosen:updated");
		$("#mandalId").html('');
		$("#mandalId").append('<option value="0">All</option>');
		$("#mandalId").trigger("chosen:updated");
	}else if(levelId == 12){
		$(".districtCls,.divisionCls").show();
		$(".subdivisionCls,.mandalCls").hide();
		$("#divisionId").html('');
		$("#divisionId").append('<option value="0">All</option>');
		$("#divisionId").trigger("chosen:updated");
	}else if(levelId == 13){
		$(".districtCls,.divisionCls,.subdivisionCls").show();
		$(".mandalCls").hide();
		$("#divisionId").html('');
		$("#divisionId").append('<option value="0">All</option>');
		$("#divisionId").trigger("chosen:updated");
		$("#subdivisionId").html('');
		$("#subdivisionId").append('<option value="0">All</option>');
		$("#subdivisionId").trigger("chosen:updated");
	}else if(levelId == 5){
		$(".districtCls,.divisionCls,.subdivisionCls,.mandalCls").show();
		$("#divisionId").html('');
		$("#divisionId").append('<option value="0">All</option>');
		$("#divisionId").trigger("chosen:updated");
		$("#subdivisionId").html('');
		$("#subdivisionId").append('<option value="0">All</option>');
		$("#subdivisionId").trigger("chosen:updated");
		$("#mandalId").html('');
		$("#mandalId").append('<option value="0">All</option>');
		$("#mandalId").trigger("chosen:updated");
	}else if(levelId == 0){
		$(".districtCls,.divisionCls,.subdivisionCls,.mandalCls").hide();
	}
});	
$(document).on("click",".getTimeLocationCls",function(){
	var levelValue=$("#levelId").val();
	if(levelValue == 0){
		$("#warningText").html("Please select a level");
	}else{
		$("#warningText").html("");
		$(".workStagesCls li").removeAttr("style");
		$(".workStagesCls li:nth-child(1)").css("border","2px solid #000");
		getLocationStageWiseWorksForLineGraph(0,0,0,"workStagesCommulativeGraphDivId");
		getLocationWisePhaseStatusList();
	}

});
$(document).on("click",".workStagesCls li",function(){	
	var statusId = $(this).attr("attr_work_statusid")
	var statusName = $(this).attr("attr_value");
	var divId = $(this).attr("attr_levelType");		
	$(".workStagesCls li").removeAttr("style");
	$(this).css("border","2px solid "+globalStatusObj[statusName]+"")
	getLocationStageWiseWorksForLineGraph(statusId,0,0,divId);
	
	
});
function stateLevelWiseDetails(){
	var collapse='';
		collapse+='<div class="panel-group" id="accordionStateLevel" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="headingStateLevel">';
					collapse+='<a role="button" class="panelCollapseIcon"   data-toggle="collapse" data-parent="#accordionStateLevel" href="#collapseStateLevel" aria-expanded="true" aria-controls="collapseStateLevel">';
						collapse+='<h4 class="panel-title text-capital">STATE LEVEL OVERVIEW</h4>';
					collapse+='</a>';
				collapse+='</div>';
				collapse+='<div id="collapseStateLevel" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingStateLevel">';
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';
							collapse+='<div id="stateLevelFirstBlockDivId"></div>';
					    collapse+='</div>';
						collapse+='<div class="row">';
							collapse+='<hr class="m_bottom_0" style="border-top: 1px solid #777 !important;">';
							collapse+='<div id="stateLevelSecondBlockDivId"></div>';
					    collapse+='</div>';
						
						collapse+='<div class="row">';
							collapse+='<hr class="m_bottom_0" style="border-top: 1px solid #777 !important;">';
							collapse+='<div id="stateLevelThirdBlockDivId"></div>';
					    collapse+='</div>';
						
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
		collapse+='</div>';
	
	$("#stateLevelWorkTypesDivId").html(collapse);
	getLevelWiseWorkImagesDetails(2,1,"stateLevelFirstBlockDivId","mainBlock","");
	getStageWiseImagesDetails(2,1,"stateLevelThirdBlockDivId");	
}
function getLevelWiseWorkImagesDetails(scopeId,locationId,divId,buildType,statusId){
	if(buildType =="mainBlock"){
		$("#"+divId).html(spinner);	
		var json ={
			"fromDate":currentFromDate,
			"toDate":currentToDate,
			"scopeId":scopeId,
			"locationId":locationId, 
			"locationType" : globalLocType,
		    "locationTypeId" : globalLocId
			}	
	}else{
		$("#"+divId).html(spinner);	
		var json ={
			"fromDate":currentFromDate,
			"toDate":currentToDate,
			"scopeId":scopeId,
			"locationId":locationId,
			"statusId":statusId,
			"locationType" : globalLocType,
		    "locationTypeId" : globalLocId
			}	
	}	
		
	$.ajax({                
		type:'POST',    
		url: 'getLevelWiseWorkImagesDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			if(buildType =="mainBlock"){
				buildLevelWiseWorkImagesDetails(result,divId);
				buildgetRecentWorkDocuments(result,"stateLevelSecondBlockDivId");
			}else{
				buildDayWiseDocumentsImages(result,statusId,divId);
			}
		}else{
			$("#"+divId).html("No Data Available");
			$("#ohrsImagesDivId").html("No Data Available");
		}
	});
}
function buildLevelWiseWorkImagesDetails(result,divId){	
	var str='';	
	if(divId == "stateLevelFirstBlockDivId"){
		str+='<div class="col-sm-3">';
			str+='<div class="bg_yash_color_10 m_top10">';
				str+='<div class="row">';
					str+='<div class="col-sm-12 text-center">';
						str+='<h5 class=" text-capital">Work proposal for</h5>';
						if(result.totalPanchayats != null && result.totalPanchayats> 0){
							str+='<h3 class=" text-capital m_top10" style="color:#0080FF">'+result.totalPanchayats+' <small class="">VILLAGES</small></h3>';
						}else{
							str+='<h3 class=" text-capital m_top10" style="color:#0080FF"> - </h3>';
						}						
					str+='</div>';				
				str+='</div>';
			str+='</div>';			
		str+='</div>';
	}
		str+='<div class="col-sm-3">';
			str+='<div class="bg_yash_color_10 m_top10 text-center">';
			if(result.totalOhrsCunt != null && result.totalOhrsCunt > 0){
				str+='<h3 class="" style="color:#0080FF">'+result.totalOhrsCunt+'</h3>';			
			}else{
				str+='<h3 class="" style="color:#0080FF">-</h3>';			
			}
				str+='<h5 class=" m_top10 text-capital">TARGET OHSRs</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3">';
			str+='<div class="bg_yash_color_10 m_top10 text-center">';
			if(result.completedOhsrCunt != null && result.completedOhsrCunt >0){
				str+='<h3 class=" good_color">'+result.completedOhsrCunt+'</h3>';
			}else{
				str+='<h3 class=" good_color">-</h3>';
			}
				str+='<h5 class=" m_top10 text-capital">completed</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3">';
			str+='<div class="bg_yash_color_10 m_top10 text-center">';
			if(result.completedOhsrPerc != null && result.completedOhsrPerc >0){
				str+='<h3 class="good_color">'+result.completedOhsrPerc+'%</h3>';
			}else{
				str+='<h3 class=" good_color">-</h3>';
			}			
				str+='<h5 class=" m_top10 text-capital">completed works</h5>';
			str+='</div>';
		str+='</div>';	
		
	$("#"+divId).html(str);	
}
function buildgetRecentWorkDocuments(result,divId){
	var str='';
	str+='<div class="col-sm-12 m_top10">';
		str+='<h4 class="font_weight text-capital" style="color:#252D30;">OHSR WORK Images</h4>';
	str+='</div>';
	str+='<div class="col-sm-12">';
	str+='<ul class="list-inline ugdImagesSlickSlider'+divId+'">';
	for(var i in result.imageList){
		str+='<li class="col-sm-3 m_top10">';
			str+='<div class="ugdImagesCss">';
				str+='<img src="http://www.'+result.imageList[i].imagePath+'" style="width: 100%;height: 200px;"/>';
				str+='<div class="card-img-overlay1">';
					str+='<h4 class="font_weight color_white f_12">District : '+result.imageList[i].districtName+'</h4>';
					str+='<h4 class="font_weight color_white f_12">Mandal : '+result.imageList[i].tehsilName+'</h4>';
					str+='<h4 class="font_weight color_white m_top5 f_12">Village : '+result.imageList[i].panchayatName+'</h4>';	
					str+='<h4 class="font_weight color_white m_top5 f_12">Cleaning Stage : '+result.imageList[i].cleaningStage+'</h4>';	
					str+='<h4 class="font_weight color_white m_top5 f_12">'+result.imageList[i].updatedDate+'</h4>';
				str+='</div>';
			str+='</div>';
		str+='</li>';
	}
	str+='</ul>';
	str+='</div>';
	
	$("#"+divId).html(str);
	$(".ugdImagesSlickSlider"+divId).slick({
		slides:'li',
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		variableWidth: false,
		autoplay:true,
		arrows: true,
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	 });
}
function getStageWiseImagesDetails(scopeId,locationId,divId){
	
	$("#"+divId).html(spinner);		
	var json ={
		"fromDate":currentFromDate,
		"toDate":currentToDate,
		"scopeId" : scopeId,
		"locationId" : locationId,
		"locationType" : globalLocType,
		"locationTypeId" : globalLocId
	}
	$.ajax({                
		type:'POST',    
		url: 'getStageWiseImagesDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildStageWiseImagesDetails(result,divId);
		}else{
			$("#"+divId).html("No Data Available");			
		}
	});
}
function buildStageWiseImagesDetails(result,divId){
	var k=0;
	var str='';	
	str+='<div class="pad_10 m_top10">';
		str+='<div class="row">';		
			for(var i in result){
				k=k+1;
				str+='<div class="col-sm-2 m_top5">';
					if(divId == "stateLevelThirdBlockDivId"){
						str+='<img class="imageClickCls" attr_statusId="'+result[i].id+'"  attr_statusName="'+result[i].name+'" src="http://www.'+result[i].imageList[0].imagePath+'" style="width: 100%;height: 100px;"/>';
					}else{
						str+='<img class="" attr_statusId="'+result[i].id+'"  attr_statusName="'+result[i].name+'" src="http://www.'+result[i].imageList[0].imagePath+'" style="width: 100%;height: 100px;"/>';
					}
					
					
					str+='<div class="card-img-overlay" style="height:50px;">';	
						str+='<h5 class="statusRoundCss" style="background-color:'+globalStatusObj[result[i].name]+' !important;">0'+k+'</h5>';
					str+='</div>';
					str+='<div class="card-img-overlay2">';	
						str+='<h5 class="color_white font_weight">'+result[i].name+'</h5>';
					str+='</div>';				
					str+='<div class="row">';
						str+='<div class="col-sm-12 m_top5">';
							str+='<div class="bg_StatusWorkCss">';
							if(divId=="stateLevelThirdBlockDivId"){
								str+='<h5 class="font_weight">OHSRs</h5>';
								str+='<div class="ohsrSlider">';
									str+='<input class="m_top10" id="statusBar'+divId+''+i+'" data-slider-id="statusBar'+divId+''+i+'Slider" type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1"  data-slider-enabled="false" data-slider-value="'+result[i].completedOhsrPerc+'" data-slider-tooltip="hide"/>';
									str+='<span class="font_weight pull-right text-info">'+parseFloat(result[i].completedOhsrPerc)+' <small class="text-info">%</small></span>';								
								str+='</div>';
								str+='<h5 class="font_weight m_top5">'+result[i].completedOhsrCunt+'</h5>';	
								
								str+='<hr class="m_bottom_0 m_top10" style="border-top: 1px solid #ddd !important;"/>';
							}
								str+='<h5 class="font_weight m_top10">Work in Progress</h5>';
								str+='<input class="m_top10" id="statusBarWorks'+divId+''+i+'" data-slider-id="statusBarWorks'+divId+''+i+'Slider" type="text" data-slider-min="0" data-slider-max="100"  data-slider-enabled="false" data-slider-step="1" data-slider-value="'+result[i].inProgressOhsrPerc+'" data-slider-tooltip="hide"/>';
								str+='<span class="font_weight pull-right good_color">'+parseFloat(result[i].inProgressOhsrPerc)+' <small class="good_color">%</small></span>';								
								str+='<h5 class="font_weight m_top5">'+result[i].inProgressOhsrCunt+'</h5>';
								str+='<div class="m_top5 ohsrImgSlider" style="padding: 5px; border:1px solid #ccc;">';								
									str+='<ul class="list-inline" id="imageSliderModal'+divId+''+i+'" style="margin-left:1px !important;">';
									for(var j in result[i].imageList){
										/* str+='<li><img src="http://www.'+result[i].imageList[j].imagePath+'" style="width:50px;height:40px;"/></li>'; */
										str+='<li>';
										str+='<a href="http://www.'+result[i].imageList[j].imagePath+'" class="fancybox" data-fancybox="gallery" data-width="640" data-height="360" >';
										str+='<img class="img-responsive" src="http://www.'+result[i].imageList[j].imagePath+'" alt="" style="width:50px;height:40px;"/>';
										str+='</a></li>';
									}										
									str+='</ul>';
								str+='</div>';
							str+='</div>';	
						str+='</div>';
					str+='</div>';
				str+='</div>';
			}				
		str+='</div>';	
	str+='</div>';
	$("#"+divId).html(str);		
	for(var i in result){
		$('#statusBar'+divId+''+i).slider({
			/* formatter: function(value) {
				return 'Current value: ' + value;
			} */
		});
		$('#statusBarWorks'+divId+''+i).slider({
			/* formatter: function(value) {
				return 'Current value: ' + value;
			} */
		});	
		$("#imageSliderModal"+divId+i).slick({
			slides:'li',
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			variableWidth: true,
			autoplay: true,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: true,
				dots: false
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
		 });
	}
	$('.fancybox').fancybox();
	
	
}
function locationWiseDetails(){
	var collapse='';
		collapse+='<div class="panel-group" id="accordionLocationWise" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="headingLocationWise">';
					collapse+='<a role="button" class="panelCollapseIcon"   data-toggle="collapse" data-parent="#accordionLocationWise" href="#collapseLocationWise" aria-expanded="true" aria-controls="collapseLocationWise">';
						collapse+='<h4 class="panel-title text-capital">LOCATION WISE OVERVIEW</h4>';
					collapse+='</a>';
				collapse+='</div>';
				collapse+='<div id="collapseLocationWise" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingLocationWise">';
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';
							collapse+='<div class="col-sm-2">';
								collapse+='<label>Level<span id="warnText" class="bad_color m_left_10"></span></label>';
								collapse+='<select class="form-control chosen-select" id="locationWiseLevelId">';
									//collapse+='<option value="0">Select Level</option>';
									collapse+='<option value="3" selected>District</option>';
									collapse+='<option value="12">Division</option>';
									collapse+='<option value="13">Sub Division</option>';
									collapse+='<option value="5">Mandal</option>';
									//collapse+='<option value="6">Village</option>';
								collapse+='</select>';
							collapse+='</div>';
							collapse+='<div class="col-sm-2 locationWiseDistrictCls">';
								collapse+='<label>District</label>';
								collapse+='<select class="form-control chosen-select" id="locationWiseDistrictId">';
									collapse+='<option value="0">Select District</option>';
								collapse+='</select>';
							collapse+='</div>';
							collapse+='<div class="col-sm-2 locationWiseDivisionCls" style="display:none;">';
								collapse+='<label>Division</label>';
								collapse+='<select class="form-control chosen-select" id="locationWiseDivisionId">';
									collapse+='<option value="0">Select Division</option>';
								collapse+='</select>';
							collapse+='</div>';
							collapse+='<div class="col-sm-2 locationWiseSubdivisionCls" style="display:none;">';
								collapse+='<label>Sub-Division</label>';
								collapse+='<select class="form-control chosen-select" id="locationWiseSubdivisionId">';
									collapse+='<option value="0">Select Sub Division</option>';
								collapse+='</select>';
							collapse+='</div>';
							collapse+='<div class="col-sm-2 locationWiseMandalCls" style="display:none;">';
								collapse+='<label>Mandal</label>';
								collapse+='<select class="form-control chosen-select" id="locationWiseMandalId">';
									collapse+='<option value="0">Select Mandal</option>';
								collapse+='</select>';
							collapse+='</div>';							
							collapse+='<div class="col-sm-2">';
								collapse+='<button type="button" class="btn btn-primary btn-sm getLocationWiseCls m_top25">SUBMIT</button>';
							collapse+='</div>';
						collapse+='</div>';
						
						collapse+='<div class="row">';
							collapse+='<div id="locationWiseDetailsBlockDivId"></div>';
					    collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
		collapse+='</div>';
	
	$("#locationWiseWorkTypesDivId").html(collapse);
	$(".chosen-select").chosen();
	getLocationWiseStagesList();
}
$(document).on("change","#locationWiseLevelId",function(){
	$("#warnText").html("");
	var levelId=$(this).val();
	//getAllDistrictsOfAp('locationWiseDistrictId','District');	
	getDivisionsOfDistrict(globalLocId,'locationWiseDivisionId','Division');
	if(levelId == 3){
		$(".locationWiseDistrictCls").show();
		$(".locationWiseDivisionCls,.locationWiseSubdivisionCls,.locationWiseMandalCls").hide();
		$("#locationWiseDivisionId").html('');
		$("#locationWiseDivisionId").append('<option value="0">All</option>');
		$("#locationWiseDivisionId").trigger("chosen:updated");
		
		$("#locationWiseSubdivisionId").html('');
		$("#locationWiseSubdivisionId").append('<option value="0">All</option>');
		$("#locationWiseSubdivisionId").trigger("chosen:updated");
		
		$("#locationWiseMandalId").html('');
		$("#locationWiseMandalId").append('<option value="0">All</option>');
		$("#locationWiseMandalId").trigger("chosen:updated");
		
	}else if(levelId == 12){
		$(".locationWiseDistrictCls,.locationWiseDivisionCls").show();
		$(".locationWiseSubdivisionCls,.locationWiseMandalCls").hide();
		$("#locationWiseDivisionId").html('');
		$("#locationWiseDivisionId").append('<option value="0">All</option>');
		$("#locationWiseDivisionId").trigger("chosen:updated");
	}else if(levelId == 13){
		$(".locationWiseDistrictCls,.locationWiseDivisionCls,.locationWiseSubdivisionCls").show();
		$(".locationWiseMandalCls").hide();
		
		$("#locationWiseDivisionId").html('');
		$("#locationWiseDivisionId").append('<option value="0">All</option>');
		$("#locationWiseDivisionId").trigger("chosen:updated");
		
		$("#locationWiseSubdivisionId").html('');
		$("#locationWiseSubdivisionId").append('<option value="0">All</option>');
		$("#locationWiseSubdivisionId").trigger("chosen:updated");
	}else if(levelId == 5){
		$(".locationWiseDistrictCls,.locationWiseDivisionCls,.locationWiseSubdivisionCls,.locationWiseMandalCls").show();
		$("#locationWiseDivisionId").html('');
		$("#locationWiseDivisionId").append('<option value="0">All</option>');
		$("#locationWiseDivisionId").trigger("chosen:updated");
		
		$("#locationWiseSubdivisionId").html('');
		$("#locationWiseSubdivisionId").append('<option value="0">All</option>');
		$("#locationWiseSubdivisionId").trigger("chosen:updated");
		
		$("#locationWiseMandalId").html('');
		$("#locationWiseMandalId").append('<option value="0">All</option>');
		$("#locationWiseMandalId").trigger("chosen:updated");
	}else if(levelId == 0){
		$(".locationWiseDistrictCls,.locationWiseDivisionCls,.locationWiseSubdivisionCls,.locationWiseMandalCls").hide();
	}
	
});
$(document).on("click",".getLocationWiseCls",function(){
	var levelValue=$("#locationWiseLevelId").val();districtId
	var levelValue=$("#locationWiseLevelId").val();
	if(levelValue == 0){
		$("#warnText").html("Please select a level");
	}else{
		$("#warnText").html("");
		getLocationWiseStagesList();
	}
});		
function getLocationWiseStagesList(){	
	$("#locationWiseDetailsBlockDivId").html(spinner);	
	var locationLevelId = $("#locationWiseLevelId").val();
	var districtId = $("#locationWiseDistrictId").val();
	var divisonId = $("#locationWiseDivisionId").val();
	var subDivisonId = $("#locationWiseSubdivisionId").val();
	var mandalId = $("#locationWiseMandalId").val();	
	var json ={
		"fromDate":currentFromDate,
		"toDate":currentToDate,
		"locationLevelId" : locationLevelId,
		"districtId" :   districtId,
		"divisonId"   : divisonId,
		"subDivisonId" : subDivisonId,
		"mandalId"  : mandalId,
		"locationType" : globalLocType,
		"locationTypeId" : globalLocId		
	}
	$.ajax({                
		type:'POST',    
		url: 'getLocationWiseStagesList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){			
			buildLocationLevelWiseStagesList(result,locationLevelId,"locationWiseDetailsBlockDivId");
		}else{
			$("#locationWiseDetailsBlockDivId").html("No Data Available");
		}
	});
}
$(document).on("click",".locationWisePopupCls",function(){
	var locId = $(this).attr("attr_locId");
	var levelId = $(this).attr("attr_levelId"); 
	var locationName = $(this).attr("attr_locationName");	
	var levelName = $("#locationWiseLevelId option:selected").text();	
	$("#locationLevelPopupId").modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	getLevelWiseWorkImagesDetails(levelId,locId,"locationLevelFirstBlockDivId","mainBlock","");
	getStageWiseImagesDetails(levelId,locId,"locationWiseDocumentsDivId");	
	getLocationLevelWiseStagesList(levelId,locId);
	getAllStages("locationWiseWorkStagesDivId");
	getLocationStageWiseWorksForLineGraph(0,levelId,locId,"locationLevelFourthBlockDivId")
	$("#locationLevelHeadingId").html(locationName+" "+levelName+"- OVERVIEW");
	$(".workZoneCloseCls").removeClass('closeSecondModal');		
});	
function getLocationLevelWiseStagesList(levelId,locId){	
	$("#locationLevelSecondBlockDivId").html(spinner);	
	var json ={
		"fromDate":currentFromDate,
		"toDate":currentToDate,
		"locationLevelId" : levelId,
		"locationValue" : locId,
		"reportType" : "panchayat",
		"locationType" : globalLocType,
		"locationTypeId" : globalLocId
		
		}
	$.ajax({                
		type:'POST',    
		url: 'getLocationLevelWiseStagesList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){			
			buildLocationLevelWiseStagesList(result,levelId,"locationLevelSecondBlockDivId");
		}else{
			$("#locationLevelSecondBlockDivId").html("No Data Available");
		}
	});
}
function buildLocationLevelWiseStagesList(result,levelId,divId){
	var str='';	
	str+='<div class="col-sm-12 m_top10">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC" id="'+divId+'DataTable">';
				str+='<thead>';
					str+='<tr>';
					if(divId !="locationWiseDetailsBlockDivId"){
						str+='<th>Tehsil Name</th>';
					}
						str+='<th>LOCATION</th>';
						str+='<th>Target&nbsp;OHSR\'s</th>';		
						str+='<th>Mechanized Dewatering</th>';
						str+='<th>%</th>';
						str+='<th>Sludge Removal</th>';
						str+='<th>%</th>';
						str+='<th>High Pressure Cleaning</th>';
						str+='<th>%</th>';
						str+='<th>Vacuum Cleaning</th>';
						str+='<th>%</th>';
						str+='<th>Anti Bacterial Spray</th>';
						str+='<th>%</th>';
						str+='<th>UV Radiation</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							if(divId =="locationWiseDetailsBlockDivId"){
								if(result[i].locationName != null && typeof(result[i].locationName) != "undefined"){
									str+='<td style="text-align:left !important;"><a class="locationWisePopupCls" attr_locationName="'+result[i].locationName+'" attr_locId="'+result[i].locationId+'" attr_levelId="'+levelId+'">'+result[i].locationName+'</a></td>';
								}else{
									str+='<td>-</td>';
								}
								
							}else{
								if(result[i].tehsilName != null && typeof(result[i].tehsilName) != "undefined"){
									str+='<td style="text-align:left !important;font-weight: normal !important;">'+result[i].tehsilName+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(result[i].locationName != null && typeof(result[i].locationName) != "undefined"){
									str+='<td style="text-align:left !important;font-weight: normal !important;">'+result[i].locationName+'</td>';
								}else{
									str+='<td>-</td>';
								}
							}
							if(result[i].targetOhsrCunt != null && result[i].targetOhsrCunt >0){
								str+='<td>'+result[i].targetOhsrCunt+'</td>';	
							}else{
								str+='<td>-</td>';
							}
							if(result[i].mechanizedCunt != null && result[i].mechanizedCunt >0){
								str+='<td>'+result[i].mechanizedCunt+'</td>';	
							}else{
								str+='<td>-</td>';
							}								
							if(result[i].mechanizedCuntPerc != null && result[i].mechanizedCuntPerc>0){
								str+='<td class="text-success">'+result[i].mechanizedCuntPerc+'</td>';	
							}else{
								str+='<td>-</td>';
							}
							if(result[i].sludgeCunt != null && result[i].sludgeCunt >0){
								str+='<td>'+result[i].sludgeCunt+'</td>';	
							}else{
								str+='<td>-</td>';
							}								
							if(result[i].sludgeCuntPerc != null && result[i].sludgeCuntPerc >0){								
								str+='<td class="text-success">'+result[i].sludgeCuntPerc+'</td>';	
							}else{								
								str+='<td>-</td>';
							}							
							if(result[i].highPressureCunt != null && result[i].highPressureCunt >0){
								str+='<td>'+result[i].highPressureCunt+'</td>';	
							}else{
								str+='<td>-</td>';
							}								
							if(result[i].highPressureCuntPerc != null && result[i].highPressureCuntPerc >0){
								str+='<td class="text-success">'+result[i].highPressureCuntPerc+'</td>';	
							}else{
								str+='<td>-</td>';
							}
							if(result[i].vacuumCleaningCunt != null && result[i].vacuumCleaningCunt >0){
								str+='<td>'+result[i].vacuumCleaningCunt+'</td>';	
							}else{
								str+='<td>-</td>';
							}								
							if(result[i].vacuumCleaningCuntPerc != null && result[i].vacuumCleaningCuntPerc >0){
								str+='<td class="text-success">'+result[i].vacuumCleaningCuntPerc+'</td>';	
							}else{
								str+='<td>-</td>';
							}
							if(result[i].antiBacterialCunt != null && result[i].antiBacterialCunt >0){
								str+='<td>'+result[i].antiBacterialCunt+'</td>';	
							}else{
								str+='<td>-</td>';
							}								
							if(result[i].antiBacterialCuntPerc != null && result[i].antiBacterialCuntPerc >0){
								str+='<td class="text-success">'+result[i].antiBacterialCuntPerc+'</td>';	
							}else{
								str+='<td>-</td>';
							}if(result[i].uVRadiationCunt != null && result[i].uVRadiationCunt>0){
								str+='<td>'+result[i].uVRadiationCunt+'</td>';	
							}else{
								str+='<td>-</td>';
							}								
							if(result[i].uVRadiationCuntPerc != null && result[i].uVRadiationCuntPerc >0){
								str+='<td class="text-success">'+result[i].uVRadiationCuntPerc+'</td>';	
							}else{
								str+='<td>-</td>';
							}
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';		
	$("#"+divId).html(str);
	$("#"+divId+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "swachadhara",
				filename:  'swachadhara'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});	
}

$(document).on("click",".imageClickCls",function(){
	var statusId = $(this).attr("attr_statusId");
	var statusName = $(this).attr("attr_statusName");
	$("#ugdMonitoringImagesDivId").html('');
	$("#ugdMonitoringDatesDivId").html('');
	//currentFromDate=moment().subtract(20, 'years').startOf('year').format("DD-MM-YYYY");
	//currentToDate=moment().format("DD-MM-YYYY");
		
	$("#imageDocumentsModalDivId").modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	$("#workStageHeadingId").html(statusName);
	getAllPhases(statusId);
	getLocationDetailsbyLocationScope(statusId,2,1,"ohrsLocationDivId","districtsBlock");
	getLevelWiseWorkImagesDetails(2,1,"ohrsImagesDivId","imageBlock",statusId);
	
});
$(document).on("click",".getDatesCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var statusId = $(this).attr("attr_statusId");
	var dateType = $(this).attr("attr_dateType");
	
	$(".removeCollapsedls").removeClass('collapsed');
	$(".removeCollapsedInls").removeClass('in');
	
	if(dateType == "overAll"){
		currentFromDate=moment().subtract(20, 'years').startOf('year').format("DD-MM-YYYY");
		currentToDate=moment().format("DD-MM-YYYY");
	}else if(dateType == "today"){
		currentFromDate=moment().format("DD-MM-YYYY");
		currentToDate=moment().format("DD-MM-YYYY");
	}else if(dateType == "thisYear"){
		currentFromDate=moment().startOf('Year').format("DD-MM-YYYY");
		currentToDate=moment().format("DD-MM-YYYY");
	}else{
		var startDate = dateType.split("/");
		currentFromDate=startDate[0];
		currentToDate=startDate[1];
	}
	getLocationDetailsbyLocationScope(statusId,2,1,"ohrsLocationDivId","districtsBlock");
	getLevelWiseWorkImagesDetails(2,1,"ohrsImagesDivId","imageBlock",statusId);
	
	
});
function getAllPhases(statusId){	
	$('#phasesListsDivId').html(spinner);
	var json ={};
	$.ajax({                
		type:'POST',    
		url: 'getAllPhases',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildPhasesWiseDetails(result,statusId);
		}else{
			$('#phasesListsDivId').html("No Data Available");
		}
	});
}

function buildPhasesWiseDetails(result,statusId){
	var str='';
	
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<ul class="list-inline dateliCss getDatesCls">';
				str+='<li class="" style="padding: 18px;position: relative;top: -8px;" attr_statusId="'+statusId+'" attr_dateType="overAll"><h5>OVERALL</h5></li>';
				
				str+='<li class="active" attr_statusId="'+statusId+'" attr_dateType="thisYear" style="padding: 18px;position: relative;top: -8px;" >';
					str+='<h5 class="text-capital text-center">THIS YEAR</h5>';
				str+='</li>';
				
				str+='<li class="" attr_statusId="'+statusId+'" attr_dateType="today">';
					str+='<h5 class="text-capital text-center">TODAY</h5>';
					str+='<h6>'+moment().format("DD-MM-YYYY")+'</h6>';
				str+='</li>';
				for(var i in result){
					if((typeof result[i].startDate !=null && typeof result[i].startDate !="undefined" && typeof result[i].startDate !=undefined) && (typeof result[i].endDate !=null && typeof result[i].endDate !="undefined" && typeof result[i].endDate !=undefined)){
						str+='<li class="" attr_statusId="'+statusId+'" attr_dateType="'+result[i].startDate+' - '+result[i].endDate+'">';
							str+='<h5 class="text-capital text-center">'+result[i].name+'</h5>';
							str+='<h6>'+result[i].startDate+' / '+result[i].endDate+'</h6>';
						str+='</li>';
					}
					
				}
			str+='</ul>';
		str+='</div>';
	str+='</div>';
	
	$("#phasesListsDivId").html(str);
}

function getLocationDetailsbyLocationScope(statusId,scopeId,locationId,divId,buildType){
	$("#"+divId).html(spinner);
	if(buildType == "districtsBlock"){
		var json = {
			  "fromDate":currentFromDate,
			  "toDate":currentToDate,
			  "scopeId":scopeId,
			  "locationId":locationId,
			  "statusId":statusId,
			  "locationType" : globalLocType,
		      "locationTypeId" : globalLocId
			  
		};
	}else if(buildType == "divisionsBlock"){
		var json = {
			  "fromDate":currentFromDate,
			  "toDate":currentToDate,
			  "scopeId":scopeId,
			  "locationId":locationId,
			  "statusId":statusId
		};
	}else if(buildType == "subDivisionsBlock"){
		var json = {
			  "fromDate":currentFromDate,
			  "toDate":currentToDate,
			  "scopeId":scopeId,
			  "locationId":locationId,
			  "statusId":statusId
		};
	}else if(buildType == "mandalsBlock"){
		var json = {
			  "fromDate":currentFromDate,
			  "toDate":currentToDate,
			  "scopeId":scopeId,
			  "locationId":locationId,
			  "statusId":statusId
		};
	}
	$.ajax({                
		type:'POST',    
		url: 'getLocationDetailsbyLocationScope',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			if(buildType == "districtsBlock"){
				buildDistrictWiseDetails(result,statusId);
			}else if(buildType == "divisionsBlock"){
				buildDivisionsWiseDetails(result,statusId,divId);
			}else if(buildType == "subDivisionsBlock"){
				buildsubDivisionsWiseDetails(result,statusId,divId);
			}else if(buildType == "mandalsBlock"){
				buildmandalWiseDetails(result,statusId,divId);
			}
		}else{
			$("#"+divId).html("");
		}
	});
}

function buildDistrictWiseDetails(result,statusId){
	var str='';
	str+='<div class="panel-group" id="accordionCons" role="tablist" aria-multiselectable="true">';
		for(var i in result)
		{
		 str+=' <div class="panel panel-default panel-custommodal">';
			str+='<div class="panel-heading" role="tab" id="headingCons'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';
				str+='<a role="button" class="constituencyPopups collapsed accordionmodal-toggle removeCollapsedCls" data-toggle="collapse" data-parent="#accordionCons" href="#collapseCons'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" aria-expanded="true"  attr_scopeId="'+result[i].id+'" attr_dist_name="'+result[i].locationName+'" attr_locationId="'+result[i].locationId+'" attr_statusId="'+statusId+'" aria-controls="collapseCons'+i+'">';
				  str+='<h4 class="panel-title">'+result[i].locationName+' (<b>'+result[i].count+'</b>)</h4>';
				str+='</a>';
			str+='</div>';
			str+='<div id="collapseCons'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" class="panel-collapse collapse removeCollapsedInls" role="tabpanel" aria-labelledby="headingCons'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';
			  str+='<div class="panel-body" >';
				str+='<div id="divisionBlock'+result[i].locationName+'"></div>';
			  str+='</div>';
			str+='</div>';
		  str+='</div>';
		}
		str+='</div>';
	$("#ohrsLocationDivId").html(str);		
}
$(document).on("click",".statusClkCls",function(){
	var statusId = $(this).attr("attr_status_id");
	var locationId = $(this).attr("attr_locationId");
	var locationScopeId =	$('#levelId').val();
	//$('#locationWiseStatusModalHeadingId').html();
	getLocationwiseStatusWiseOhsrDetailsforClick(locationScopeId,locationId,statusId);
});
function getLocationwiseStatusWiseOhsrDetailsforClick(locationScopeId,locationId,statusId){
	$("#locationWiseStatusModalDivId").html(spinner);
	var json ={
		  "fromDate" : currentFromDate,
		  "toDate": currentToDate,
		  "locationScopeId" : locationScopeId,
		  "locationId" : locationId,
		  "statusId":statusId
		}
	$.ajax({                
		type:'POST',    
		url: 'getLocationwiseStatusWiseOhsrDetailsforClick',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildLocationwiseStatusWiseOhsrDetailsforClick(result);
			
		}else{
			$("#locationWiseStatusModalDivId").html("No Data Available");
		}
	});
}
function buildLocationwiseStatusWiseOhsrDetailsforClick(result){
	var str='';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC" id="">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>District Name</th>';
						str+='<th>Mandal Name</th>';
						str+='<th>Panchayat Name</th>';						
						str+='<th>Tank Name</th>';						
						str+='<th>Comment</th>';						
						str+='<th>Verified By</th>';						
						str+='<th>Verified Date</th>';						
					str+='</tr>';					
				str+='</thead>';					
				str+='<tbody>';	
				for(var i in result){
					if(result[i].districtName != null){
						str+='<td>'+result[i].districtName+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].tehsilName != null){
						str+='<td>'+result[i].tehsilName+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].panchayatName != null){
						str+='<td>'+result[i].panchayatName+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].name != null){
						str+='<td>'+result[i].name+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].comment != null){
						str+='<td>'+result[i].comment+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].verifiedBy != null){
						str+='<td>'+result[i].verifiedBy+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].date != null){
						str+='<td>'+result[i].date+'</td>';
					}else{
						str+='<td>-</td>';
					}
				}
				str+='</tbody>';					
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#locationWiseStatusModalDivId").html("NO DATA AVAILABLE");
	
}
$(document).on("click",".constituencyPopups",function(){
	var statusId = $(this).attr("attr_statusId");
	var locationId = $(this).attr("attr_locationId");
	var scopeId = $(this).attr("attr_scopeId");
	var districtName = $(this).attr("attr_dist_name");
	getLevelWiseWorkImagesDetails(scopeId,locationId,"ohrsImagesDivId","imageBlock",statusId);
	getLocationDetailsbyLocationScope(statusId,scopeId,locationId,"divisionBlock"+districtName,"divisionsBlock");
	
});
function buildDivisionsWiseDetails(result,statusId,divId){
	
	var str='';
	str+='<div class="panel-group" id="accordionDivision" role="tablist" aria-multiselectable="true">';
		for(var i in result)
		{
		 str+=' <div class="panel panel-default panel-custommodal">';
			str+='<div class="panel-heading" role="tab" id="headingDivision'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';
				str+='<a role="button" class="divisionsPopups collapsed accordionmodal-toggle removeCollapsedls" data-toggle="collapse" data-parent="#accordionDivision" href="#collapseDivision'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" aria-expanded="true"  attr_scopeId="'+result[i].id+'" attr_dist_name="'+result[i].locationName+'" attr_locationId="'+result[i].locationId+'" attr_statusId="'+statusId+'" aria-controls="collapseDivision'+i+'">';
				  str+='<h4 class="panel-title">'+result[i].locationName+' (<b>'+result[i].count+'</b>)</h4>';
				str+='</a>';
			str+='</div>';
			str+='<div id="collapseDivision'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" class="panel-collapse collapse removeCollapsedInls" role="tabpanel" aria-labelledby="headingDivision'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';
			  str+='<div class="panel-body" >';
				str+='<div id="subDivisionBlock'+result[i].locationName+'"></div>';
			  str+='</div>';
			str+='</div>';
		  str+='</div>';
		}
		str+='</div>';
		
	$("#"+divId).html(str);		
}

$(document).on("click",".divisionsPopups",function(){
	var statusId = $(this).attr("attr_statusId");
	var locationId = $(this).attr("attr_locationId");
	var scopeId = $(this).attr("attr_scopeId");
	var districtName = $(this).attr("attr_dist_name");
	getLevelWiseWorkImagesDetails(scopeId,locationId,"ohrsImagesDivId","imageBlock",statusId);
	getLocationDetailsbyLocationScope(statusId,scopeId,locationId,"subDivisionBlock"+districtName,"subDivisionsBlock");
	
});

function buildsubDivisionsWiseDetails(result,statusId,divId){
	
	var str='';
	str+='<div class="panel-group" id="accordionsubDivision" role="tablist" aria-multiselectable="true">';
		for(var i in result)
		{
		 str+=' <div class="panel panel-default panel-custommodal">';
			str+='<div class="panel-heading" role="tab" id="headingsubDivision'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';
				str+='<a role="button" class="subDivisionsPopups collapsed accordionmodal-toggle removeCollapsedls" data-toggle="collapse" data-parent="#accordionsubDivision" href="#collapsesubDivision'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" aria-expanded="true"  attr_scopeId="'+result[i].id+'" attr_dist_name="'+result[i].locationName+'" attr_locationId="'+result[i].locationId+'" attr_statusId="'+statusId+'" aria-controls="collapsesubDivision'+i+'">';
				  str+='<h4 class="panel-title">'+result[i].locationName+' (<b>'+result[i].count+'</b>)</h4>';
				str+='</a>';
			str+='</div>';
			str+='<div id="collapsesubDivision'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" class="panel-collapse collapse removeCollapsedInls" role="tabpanel" aria-labelledby="headingsubDivision'+i+''+result[i].locationName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';
			  str+='<div class="panel-body" >';
				str+='<div id="mandalBlock'+result[i].locationName+'"></div>';
			  str+='</div>';
			str+='</div>';
		  str+='</div>';
		}
		str+='</div>';
		
	$("#"+divId).html(str);		
}

$(document).on("click",".subDivisionsPopups",function(){
	var statusId = $(this).attr("attr_statusId");
	var locationId = $(this).attr("attr_locationId");
	var scopeId = $(this).attr("attr_scopeId");
	var districtName = $(this).attr("attr_dist_name");
	getLevelWiseWorkImagesDetails(scopeId,locationId,"ohrsImagesDivId","imageBlock",statusId);
	getLocationDetailsbyLocationScope(statusId,scopeId,locationId,"mandalBlock"+districtName,"mandalsBlock");
	
});

function buildmandalWiseDetails(result,statusId,divId){
	
	var str='';
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			for(var i in result)
				{
					str+='<ul class="list-inline">';
						for(var i in result)
						{
							str+='<li><a class="getMandalWiseCls" attr_scopeId="'+result[i].id+'" attr_dist_name="'+result[i].locationName+'" attr_locationId="'+result[i].locationId+'" attr_statusId="'+statusId+'" style="cursor:pointer;fon-size:16px;">'+result[i].locationName+'  (<span class="font_weight">'+result[i].count+' </span>)</a></li>';
						}
					 str+='</ul>';
				}
		str+='</div>';	
	str+='</div>';
	
		
	$("#"+divId).html(str);		
}

$(document).on("click",".getMandalWiseCls",function(){
	var statusId = $(this).attr("attr_statusId");
	var locationId = $(this).attr("attr_locationId");
	var scopeId = $(this).attr("attr_scopeId");
	var districtName = $(this).attr("attr_dist_name");
	getLevelWiseWorkImagesDetails(scopeId,locationId,"ohrsImagesDivId","imageBlock",statusId);
});

function buildDayWiseDocumentsImages(result,statusId,divId){
	 var str='';
	 $('.slider-for,.slider-nav').slick('unslick');
	 
	 str+='<div class="row">';
	 str+='<div class="col-sm-12 m_top10">';
		str+='<ul class="list-inline slider-for">';
		if(result.imageList !=null && result.imageList.length>0){
			for(var i in result.imageList){
				str+='<li class="">';
					str+='<h5 class="font_weight">'+result.imageList[i].name+'</h5>';
					
					str+='<img class="thumbnail m_top5" src="http://www.'+result.imageList[i].imagePath+'" style="width: 100%;height:350px;"/>';
				str+='</li>';
			}
		}else{
			str+='<h5 class="font_weight">No Data Available</h5>';
		}
		str+='</ul>';
	str+='</div>';
	str+='</div>';
	str+='</div>';
	
	str+='<div class="">';
		str+='<div class="col-sm-12">';
			str+='<ul class="list-inline slider-nav" style="padding:10px;">';
				if(result.imageList !=null && result.imageList.length>0){
					for(var i in result.imageList){
						str+='<li style="cursor:pointer;">';
							str+='<img class="thumbnail" src="http://www.'+result.imageList[i].imagePath+'" style="width: 70px; height: 70px;"/>';
						str+='</li>'
					}
				}
			str+='</ul>';
		str+='</div>';
	str+='</div>';
	
	 $("#"+divId).html(str);
	 
	 setTimeout(function(){		
			$('.slider-for').slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  slide: 'li',
			  arrows: true,
			  fade: true,
			  //autoplay: true,
			  //autoplaySpeed: 2000,
			  asNavFor: '.slider-nav'
			});
			$('.slider-nav').slick({
			  slidesToShow: 10,
			  slidesToScroll: 0,
			  slide: 'li',
			  asNavFor: '.slider-for',
			  dots: false,
			 //centerMode: true,
			 focusOnSelect: true,
			 variableWidth: true

				})
			$(".slick-list").css("margin-left","17px;");	
			$(".slick-list").css("margin-right","17px;");	
			//$('.slider-nav li:first-child').trigger('click');
			//$('.slider-nav li:first-child').trigger('click');
	},300);
}