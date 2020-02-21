var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var locationArr = [{name:"district",id:1},{name:"constituency",id:2},{name:"mandal",id:3},{name: "panchayat",id:4}];
//var locationArr = [{name:"district",id:1}];
var bgColorArr={"Service": "#eaeaff  ","Govt": "#ebfcf0 "};

var currentFromDate = moment().subtract(1, 'year').startOf('year').format("DD-MM-YYYY");
var currentToDate= moment().format("DD-MM-YYYY");
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
	$(".menuCls-table2").hide();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
	$(".menuCls-table2").hide();
});
$("#dateRangePickerIVRS").daterangepicker({
	opens: 'left',
	startDate: currentFromDate,
	endDate: currentToDate,
	locale: {
	  format: 'DD-MM-YYYY'
	},
	ranges: {
	'OverAll':[moment().subtract(1, 'year').startOf('year').format("DD-MM-YYYY"),  moment().format("DD-MM-YYYY")],
	   'Today' : [moment(), moment()],
	   'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
	   'This Month': [moment().startOf('month'),moment()],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	   'This Year': [moment().startOf('Year'), moment()],
	   'Last 1 Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
	}
});
var dates= $("#dateRangePickerIVRS").val("OverAll");
var pickerDates = currentFromDate+' - '+currentToDate
$('#dateRangePickerIVRS').on('apply.daterangepicker', function(ev, picker) {
	currentFromDate = picker.startDate.format('DD-MM-YYYY');
	currentToDate = picker.endDate.format('DD-MM-YYYY');
	if(picker.chosenLabel == 'OverAll')
	{
		$("#dateRangePickerIVRS").val('OverAll');
	}
	onloadcalls("change");
});

setTimeout(function(){	
	onloadcalls("onLoad");
}, 1500);

function onloadcalls(type){
	
	$(".switch-btn-New li").removeClass("active");
	$(".switch-btn-New li:nth-child(1)").addClass("active");
	
	if(globalDeptId.length == 0){
		globalDeptId = 0;
	}
	if(type == "onLoad"){		
		//getSatisfactionTrending(globalDeptId,"currentFromDate",currentToDate);
		getIvrsDepartmentList("deptsIVRSId");
	}	
	getIvrsOverViewDetails();
	resetSelectBox();
	getIvrsDepartmentList("deptLocId");
	getSatisfactionTrending(globalDeptId,moment().startOf('Year').format("DD-MM-YYYY"), moment().format("DD-MM-YYYY"),0);
	getAllSchemesForDepatment(globalDeptId);
	getAllQuestionsForSchemesAndDeparments(globalDeptId,0);
	getIvrsDeptWiseDetails("deptWise","consolidated");
	getIvrsDeptWiseDetails("schemeWise","consolidated");
	getQuestionWiseDetails(globalDeptId,"state",1);
	locationWiseIVRSDetails("ivrs","consolidated");	
}
$('.chosen-select').chosen();
function getIvrsDepartmentList(divId){
	var json ={
		deptId: globalDeptId
	}
	$.ajax({                
		type:'POST',    
		url: 'getIvrsDepartmentList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildSelectBox(result,divId);					
			//buildDepartmentTab(result);
		}else{
			
		}
	});
}
function buildSelectBox(result,divId){
	var str='';	
	$("#"+divId).append('<option value="0" selected>All</option>');
	for(var i in result){
		$("#"+divId).append('<option value="'+result[i].id+'">'+result[i].name+'</option>');
	}
	if(divId =="deptsIVRSId" || divId =="deptLocId"){
		$("#"+divId).val(globalDeptId).trigger("chosen:updated");
	}	
	else{
		$("#"+divId).trigger("chosen:updated");
	}
}

$(document).on('change','#deptsIVRSId',function(){
	globalDeptId = $(this).val();
	console.log($(this).val());
	onloadcalls("change");	
	$("#deptLocId").val($(this).val()).trigger("chosen:updated");	
})
function getIvrsOverViewDetails(){	
	$('#ivrsOverViewDivId').html(spinner);
	var json ={
		deptId: globalDeptId,
		fromDateStr: currentFromDate,
		toDateStr: currentToDate
	}
	$.ajax({                
		type:'POST',    
		url: 'getIvrsOverViewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildIvrsOverViewDetails(result);
		}else{
			$('#ivrsOverViewDivId').html("NO DATA AVAILABLE");
		}
	});
}
function buildIvrsOverViewDetails(result){
	var str='';
	str+='<div class="row">';	
		str+='<div class="col-sm-12">';	
			str+='<h4 class="font_weight text-capital f_16">Overview</h4>';
		str+='</div>';
	str+='</div>';
	str+='<div class="m_top10 pad_10 bg_f5 border_d4" style="box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);">';		
		str+='<div class="row">';			
			str+='<div class="col-sm-3 m_top10">';
				str+='<div class="pad_10 border_d2" style="background-color: #e5dede;">';
					str+='<h5 class="font_weight text-capital">Total</h5>';
					str+='<div class="row text-center m_top10">';
						str+='<div class="col-sm-6">';
							str+='<h5 class="font_weight">IVRS Calls</h5>';
							if(result.ivrsCalls != null && result.ivrsCalls>0){
								str+='<h4 class="font_weight m_top10">'+result.ivrsCalls+'</h4>';
							}else{
								str+='<h4 class="font_weight m_top10">-</h4>';
							}
							
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<h5 class="font_weight">Answered</h5>';
							if(result.answered != null && result.answered >0){
								str+='<h4 class="font_weight m_top10">'+result.answered+'</h4>';								
							}else{
								str+='<h4 class="font_weight m_top10">-</h4>';
							}
							if(result.answeredPerc != null && result.answeredPerc >0){
								str+='<h5 class="m_top5 font_weight text-success">'+result.answeredPerc+'%</h5>';								
							}else{
								str+='<h5 class="m_top5 font_weight text-success">-</h5>';
							}
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';							
			str+='<div class="col-sm-9">';
				str+='<div class="row">';
				for(var i in result.subList){
					str+='<div class="col-sm-6 m_top10">';						
						if(result.subList[i].name == "Service"){
							str+='<div class="border_purple pad_10 white-block">';
								str+='<h5 class="font_weight text-capital">Satisfication-Department</h5>';
							}else if(result.subList[i].name == "Govt"){
								str+='<div class="border_lightgreen pad_10 white-block">';
								str+='<h5 class="font_weight text-capital">Satisfication-Government</h5>';
						}							
							str+='<div class="row text-center m_top10">';
								str+='<div class="col-sm-4">';
									str+='<h5 class="font_weight">Answered</h5>';
									if(result.subList[i].answered != null && result.subList[i].answered >0){
										str+='<h4 class="font_weight m_top10">'+result.subList[i].answered+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10">-</h4>';
									}
								str+='</div>';
								str+='<div class="col-sm-4">';
									str+='<h5 class="font_weight">Yes</h5>';
									if(result.subList[i].yesCount != null && result.subList[i].yesCount >0){
										str+='<h4 class="font_weight m_top10">'+result.subList[i].yesCount+'</h4>';										
									}else{
										str+='<h4 class="font_weight m_top10">-</h4>';
									}
									if(result.subList[i].yesPerc != null && result.subList[i].yesPerc >0){
										str+='<h5 class="m_top5 font_weight text-success">'+result.subList[i].yesPerc+' %</h5>';									
									}else{
										str+='<h5 class="m_top5 font_weight">-</h5>';
									}
								str+='</div>';
								str+='<div class="col-sm-4">';
									str+='<h5 class="font_weight">No</h5>';
									if(result.subList[i].noCount != null && result.subList[i].noCount >0){
										str+='<h4 class="font_weight m_top10">'+result.subList[i].noCount+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10">-</h4>';
									}if(result.subList[i].noCount != null && result.subList[i].noCount >0){
										str+='<h5 class="m_top5 font_weight text-danger">'+result.subList[i].noPerc+' %</h5>';
									}else{
										str+='<h5 class="m_top5 font_weight text-danger">-</h5>';
									}																			
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				}
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$('#ivrsOverViewDivId').html(str);
}

function getIvrsDeptWiseDetails(reportType,displayType){
	$("#ivrs"+reportType+"DetailsDivId").html(spinner);
	var json ={
		deptId: globalDeptId,
		fromDateStr: currentFromDate,
		toDateStr: currentToDate,
		reportType: reportType,
		displayType : displayType
	}
	$.ajax({                
		type:'POST',    
		url: 'getDepartmentWiseIvrsDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length > 0){
			if(reportType == "deptWise" && displayType == "consolidated"){
				buildIvrsDeptWiseDetails(result,reportType);
			}else if(reportType == "schemeWise" && displayType == "consolidated"){
				buildIvrsDeptWiseDetails(result,reportType);
			}else if(reportType == "deptWise" && displayType == "monthWise"){
				buildIvrsDeptAndSchemeMonthlyWiseDetails(result,reportType);
			}else if(reportType == "schemeWise" && displayType == "monthWise"){
				buildIvrsDeptAndSchemeMonthlyWiseDetails(result,reportType);
			}
			
		}else{
			$("#ivrs"+reportType+"DetailsDivId").html("NO DATA AVAILABLE");
		}
	});
}
function buildIvrsDeptWiseDetails(result,reportType){	
	var str='';	
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="dataTable_'+reportType+'" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2">Department</th>';
						str+='<th rowspan="2">Services/Schemes</th>';
						str+='<th rowspan="2">Questions</th>';
						str+='<th rowspan="2">IVRS Calls</th>';
						str+='<th rowspan="2">Answered</th>';
						str+='<th rowspan="2">%</th>';
						str+='<th colspan="4" style="background-color: #eaeaff   !important;">Departments Satisfaction</th>';
						str+='<th colspan="4" style="background-color: #ebfcf0  !important">Govt Satisfaction</th>';
					str+='</tr>';
					str+='<tr>';
					for(var i in result[0].subList){
						str+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">yes</th>';
						str+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">%</th>';
						str+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">No</th>';
						str+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">%</th>';
					}
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					str+='<tr>';
					for(var i in result){
						if(reportType == "deptWise"){
							if(result[i].name != null && typeof(result[i].name) != "undefined"){
								str+='<td>'+result[i].name+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].schemeCount != null && result[i].schemeCount >0){
								str+='<td>'+result[i].schemeCount+'</td>';
							}else{
								str+='<td>-</td>';
							}
						}else if(reportType == "schemeWise"){
							if(result[i].deptName != null && typeof(result[i].deptName) != "undefined"){
								str+='<td>'+result[i].deptName+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].name != null && typeof(result[i].name) != "undefined"){
								str+='<td>'+result[i].name+'</td>';
							}else{
								str+='<td>-</td>';
							}
						}
						if(result[i].questionsCount != null && result[i].questionsCount >0){
							str+='<td>'+result[i].questionsCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].ivrsCalls != null && result[i].ivrsCalls >0){
							str+='<td>'+result[i].ivrsCalls+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].answered != null && result[i].answered >0){
							str+='<td>'+result[i].answered+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].answeredPerc != null && result[i].answeredPerc >0){
							str+='<td class="text-success">'+result[i].answeredPerc+'</td>';
						}else{
							str+='<td>-</td>';
						}
						for(var j in result[i].subList){
							if(result[i].subList[j].yesCount != null && result[i].subList[j].yesCount >0){
								str+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].yesCount+'</td>';
							}else{
								str+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">-</td>';
							}
							if(result[i].subList[j].yesPerc != null && result[i].subList[j].yesPerc >0){
								str+='<td class="text-success" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].yesPerc+'</td>';
							}else{
								str+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">-</td>';
							}
							if(result[i].subList[j].noCount != null && result[i].subList[j].noCount >0){
								str+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].noCount+'</td>';
							}else{
								str+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">-</td>';
							}
							if(result[i].subList[j].noPerc != null && result[i].subList[j].noPerc >0){
								str+='<td class="text-danger" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].noPerc+'</td>';
							}else{
								str+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">-</td>';
							}
						}
					str+='</tr>';
					}						
					
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	
	$("#ivrs"+reportType+"DetailsDivId").html(str);
	
	if(reportType !="deptWise"){
		$("#dataTable_"+reportType).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]]
		});	
	}
}
function buildDepartmentTab(result){
	var str='';
	str+='<ul class="status_Block deptTabsCls">';							
		str+='<li class="active activateCls m_top5" attr_id="0">All</li>';
		for(var i in result){
			str+='<li class="activateCls m_top5" attr_id="'+result[i].id+'">'+result[i].name+'</li>';
		}				
	str+='</ul>';
	$("#deptsGraph").html(str);
}
$(document).on("click",".activateCls",function(){
	$(".activateCls").removeClass("active");	
	$(this).addClass("active");	
})
/* $(document).on('click','.deptTabsCls li',function(){
	var departmentId = $(this).attr("attr_id");
	console.log(departmentId);
	getSatisfactionTrending(departmentId,locFromDate,locToDate);
}) */
var locFromDate = moment().startOf('Year').format("DD-MM-YYYY");
var locToDate= moment().format("DD-MM-YYYY");;
$(document).on("change","#yeardDivId",function(){
	var departmentId = $(".deptTabsCls li.active ").attr("attr_id");
	var questionId = $("#questionsDivId").val();
	var yearValue=$(this).val();	
	locFromDate = "01-01-"+yearValue;
	locToDate = "31-12-"+yearValue;	
	getSatisfactionTrending(departmentId,locFromDate,locToDate,questionId);
})
function getSatisfactionTrending(deptId,fromDateStr,toDateStr,questionId){		
	$('#satisfactionTrendingChartDivId').html(spinner);
	var json ={
		deptId: deptId,
		fromDateStr: fromDateStr,
		toDateStr: toDateStr,
		questionId: questionId
	}
	$.ajax({                
		type:'POST',    
		url: 'getSatisfactionTrending',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildSatisfactionTrending(result);
		}else{
			$('#satisfactionTrendingChartDivId').html("NO DATA AVAILABLE");
		}
	});
}
	//graph
	function buildSatisfactionTrending(result) {
		var monthArr=[];
		var deptCountArr=[];
		var govtCountArr=[];		
		for(var i in result){			
			monthArr.push(result[i].name);
			deptCountArr.push({y: parseFloat(result[i].deptYesPerc),"extra":result[i].deptCount});
			govtCountArr.push({y: parseFloat(result[i].govtYesPerc),"extra":result[i].govtCount});			
		}		
		$("#satisfactionTrendingChartDivId").highcharts( {
			colors:[ '#1925C9','#006D57'],	
			 chart: {
				type: 'line',
				backgroundColor:'transparent'
			},
			title: {
				text: ''
			},
			xAxis: {				
				categories: monthArr,
				labels: {
					style: {
						color: '#333',
						fontSize:'10px',
						fontWeight:'bold',
					}
				},				
			},
			yAxis: {
				min: 0,
				title: {
					text: '',
				},
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},
			credits: {
				enabled:false
			},
			plotOptions: {
			   
			},
			tooltip: {
			useHTML:true,
				formatter: function () {
					return '<b>' + this.x + '</b><br/>' +
						this.series.name + ':<b> ' + this.y+'</b> % ('+this.point.extra+')';
					
				}
			},
			series: [{
				name: 'Departments Satisfaction',
				data: deptCountArr
			}, {
				name: 'Govt Satisfaction',
				data: govtCountArr
			}],
			legend: {
				enabled:true,
			}
		});
	}
function getAllSchemesForDepatment(deptId){		
	var json ={
		deptId: deptId,
		fromDateStr: currentFromDate,
		toDateStr: currentToDate,		
	}
	$.ajax({                
		type:'POST',    
		url: 'getAllSchemesForDepatment',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildSelectBox(result,"serviceDivId")
		}else{
			
		}
	});
}
function getAllQuestionsForSchemesAndDeparments(deptId,schemeId){		
	var json ={
		deptId: deptId,
		fromDateStr: currentFromDate,
		toDateStr: currentToDate,
		schemeId : schemeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getAllQuestionsForSchemesAndDeparments',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildSelectBox(result,"questionsDivId");
		}else{
			
		}
	});
}
	
function locationWiseIVRSDetails(divId,buildType){
	var collapse='';
	for(var i in locationArr){
		collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+locationArr[i].id+'">';
				if(i == 0){
					collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+locationArr[i].id+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'">';
				}else{
					collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+locationArr[i].id+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'">';
				}	
					collapse+='<h4 class="panel-title text-capital">'+locationArr[i].name+'</h4>';
					collapse+='</a>';
				collapse+='</div>';
				
				if(i == 0){
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'">';
				}else{
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i].id+'">';
				}
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';
							collapse+='<div class="col-sm-12">';
								collapse+='<div id="'+divId.replace(/\s+/g, '')+'_'+locationArr[i].name+'"></div>';
							collapse+='</div>';
						collapse+='</div>';
						//console.log(divId.replace(/\s+/g, '')+'_'+locationArr[i].id);
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';		
	}
	$("#IVRSLocationWiseDetailsDivId").html(collapse);
	for(var i in locationArr){		
		getLocationWiseIvrsDetails(globalDeptId,0,0,locationArr[i].name,buildType,locationArr[i].id);
	}
}
function getLocationWiseIvrsDetails(deptId,schemeId,questionId,locationType,buildType,locId){	
	$('#ivrs_'+locationType).html(spinner);
	var json ={
		deptId: deptId,
		fromDateStr: currentFromDate,
		toDateStr: currentToDate,
		locationType : locationType,		
		schemeId : schemeId,
		questionId: questionId,
		displayType : buildType
	}
	$.ajax({                
		type:'POST',    
		url: 'getLocationWiseIvrsDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			if(buildType == "consolidated"){
				buildLocationWiseIvrsDetails(result,locationType,deptId);
			}else{
				buildLocationMonthWiseIvrsDetails(result,locationType,deptId,locId);
			}
			
		}else{
			$('#ivrs_'+locationType).html("NO DATA AVAILABLE");
		}
	});
}
function buildLocationWiseIvrsDetails(result,locationType,deptId){
		var tableView='';
		tableView+='<div class="table-responsive">';
			tableView+='<table class="table table-bordered table_default" id="dataTable_'+locationType+'" style="width:100%;">';
				tableView+='<thead>';
					tableView+='<tr>';
						tableView+='<th rowspan="2">District</th>';
						if(locationType != null && locationType != "district"){
							tableView+='<th rowspan="2">Constituency</th>';
						}
						if(locationType != null &&( locationType == "mandal" || locationType =="panchayat")){
							tableView+='<th rowspan="2">Mandal</th>';
						}
						if(locationType != null && locationType =="panchayat"){
							tableView+='<th rowspan="2">panchayat</th>';
						}						
						tableView+='<th rowspan="2">IVRS Calls</th>';
						tableView+='<th rowspan="2">Answered</th>';
						tableView+='<th rowspan="2">%</th>';
						tableView+='<th colspan="4" style="background-color: #eaeaff   !important;">Departments Satisfaction</th>';
						tableView+='<th colspan="4" style="background-color: #ebfcf0   !important;">Govt Satisfaction</th>';
					tableView+='</tr>';
					tableView+='<tr>';
					for(var i in result[0].subList){
						tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">yes</th>';
						tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">%</th>';
						tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">no</th>';
						tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">%</th>';
					}						
					tableView+='</tr>';
				tableView+='</thead>';
				tableView+='<tbody>';
				for(var i in result){
					tableView+='<tr>';					
					if(locationType != null && (locationType != "district")){
						if(result[i].districtName != null && typeof(result[i].districtName) != "undefined"){
							tableView+='<td style="text-align: left !important;">'+result[i].districtName+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						
					}
					if(locationType != null && (locationType == "mandal" || locationType == "panchayat")){
						if(result[i].constituencyName != null && typeof(result[i].constituencyName) != "undefined"){
							tableView+='<td style="text-align: left !important;">'+result[i].constituencyName+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						
					}
					if(locationType != null && locationType == "panchayat"){						
						if(result[i].mandalName != null && typeof(result[i].mandalName) != "undefined"){
							tableView+='<td style="text-align: left !important;">'+result[i].mandalName+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
					}
						if(result[i].name != null && typeof(result[i].name) != "undefined"){
							tableView+='<td style="text-align: left !important;"><a class="locaWiseQuestCls"style="text-align: left !important; cursor: pointer;" attr_locationId="'+result[i].id+'" attr_locType="'+locationType+'" attr_dept="'+deptId+'">'+result[i].name+'</a></td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].ivrsCalls != null && result[i].ivrsCalls >0){
							tableView+='<td>'+result[i].ivrsCalls+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].answered != null && result[i].answered >0){
							tableView+='<td>'+result[i].answered+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].answeredPerc != null && result[i].answeredPerc >0){
							tableView+='<td class="text-success">'+result[i].answeredPerc+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						for(var j in result[i].subList){
							if(result[i].subList[j].yesCount != null && result[i].subList[j].yesCount >0){
								tableView+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].yesCount+'</td>';
							}else{
								tableView+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">-</td>';
							}
							if(result[i].subList[j].yesPerc != null && result[i].subList[j].yesPerc >0){
								tableView+='<td class="text-success" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].yesPerc+'</td>';
							}else{
								tableView+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">-</td>';
							}
							if(result[i].subList[j].noCount != null && result[i].subList[j].noCount >0){
								tableView+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].noCount+'</td>';
							}else{
								tableView+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">-</td>';
							}
							if(result[i].subList[j].noPerc != null && result[i].subList[j].noPerc >0){
								tableView+='<td class="text-danger" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].noPerc+'</td>';
							}else{
								tableView+='<td style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">-</td>';
							}
						}
					tableView+='</tr>';
				}
				tableView+='</tbody>';
			tableView+='<table>';
		tableView+='</div>';
		$("#ivrs_"+locationType).html(tableView);		
		$("#dataTable_"+locationType).dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]]
	});	
	}
$(document).on('click','#locationWiseSubmit',function(){
	var deptId = $("#deptLocId").val();
	var schemeId = $("#serviceDivId").val();	
	var questionId = $("#questionsDivId").val();
	getSatisfactionTrending(deptId,locFromDate,locToDate,questionId);
	for(var i in locationArr){
		getLocationWiseIvrsDetails(deptId,schemeId,questionId,locationArr[i].name,"consolidated");
	}	
});
var locDept;
$(document).on("change","#deptLocId",function(){
	locDept = $(this).val();	
	$("#serviceDivId").html('');
	getAllSchemesForDepatment(locDept);
	$("#serviceDivId").trigger("chosen:updated");		
	$("#questionsDivId").html('');		
	getAllQuestionsForSchemesAndDeparments(locDept,0);
	$("#questionsDivId").trigger("chosen:updated");
});
$(document).on("change","#serviceDivId",function(){	
	var schemeId = $(this).val();	
	$("#questionsDivId").html('');
	getAllQuestionsForSchemesAndDeparments(locDept,schemeId);
	$("#questionsDivId").trigger("chosen:updated");
});

function getQuestionWiseDetails(deptId,locationType,locationId){
	$("#IVRSQuesDetailsModalId").html("");
	if(locationType != null && locationType == "state"){
		$('#ivrsQuestionsDivId').html("");
		$('#ivrsQuestionsDivId').html(spinner);
	}else{
		$('#IVRSQuestionsModalId').html("");
		$('#IVRSQuestionsModalId').html(spinner);
	}
	
	var json ={		
		fromDateStr: currentFromDate,
		toDateStr: currentToDate,
		deptId: deptId,		
		locationType : locationType,
		locationId: locationId
	}
	$.ajax({                
		type:'POST',    
		url: 'getQuestionWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildQuestionWiseDetails(result,locationType,locationId,deptId);
		}else{
			if(locationType != null && locationType == "state"){
				$('#ivrsQuestionsDivId').html("NO DATA AVAILABLE");
			}else{
				$('#IVRSQuestionsModalId').html("NO DATA AVAILABLE");
			}			
		}
	});
}
function buildQuestionWiseDetails(result,locationType,locationId,deptId){	
	var str='';
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-12">';
		if(locationType != null && locationType == "state"){		
			str+='<div class="panel-group" id="accordion'+locationType+'" role="tablist" aria-multiselectable="true">';
				str+='<div class="panel panel-default panel-black">';
					str+='<div class="panel-heading" role="tab" id="headingOne'+locationType+'">';
						str+='<a class="panelCollapseIcon collapsed ivrs2 panel-title" role="button" data-toggle="collapse" data-parent="#accordion'+locationType+'" href="#collapseOne'+locationType+'" aria-expanded="false" aria-controls="collapseOne'+locationType+'" style="text-decoration: none !important;">';
							str+='<h4 class="text-capital font_weight f_16">IVRS Questions </h4>';
						str+='</a>';
					str+='</div>';
					str+='<div id="collapseOne'+locationType+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne'+locationType+'">';
						str+='<div class="panel-body">';
		}
							str+='<div class="table-responsive m_top10">';
								str+='<table class="table-bordered table_default table-condensed" id="dataTable1_'+locationType+'" style="width:100%;">';
									str+='<thead>';
										str+='<tr>';
											str+='<th rowspan="2">Department</th>';
											str+='<th rowspan="2">Scheme</th>';
											str+='<th rowspan="2">Question</th>';
											str+='<th rowspan="2">IVRS Calls</th>';
											str+='<th rowspan="2">Answered</th>';
											str+='<th rowspan="2">%</th>';
											str+='<th colspan="4">Department</th>';
											for(var i in result[0].questionsList){
												str+='<th colspan="4">'+result[0].questionsList[i].name+'</th>';							
											}
										str+='</tr>';
										str+='<tr>';
											for(var i in result[0].subList){								
												str+='<th>'+result[0].subList[i].name+'</th>';
												str+='<th>%</th>';
											}
											for(var i in result[0].questionsList){
												for(var j in result[0].questionsList[i].subList){
													str+='<th>'+result[0].questionsList[i].subList[j].name+'</th>';
													str+='<th>%</th>';
												}
											}
										str+='</tr>';
									str+='</thead>';
									str+='<tbody>';					
									 for(var i in result){
										str+='<tr>';
											str+='<td>'+result[i].deptName+'</td>';
											str+='<td>'+result[i].schemeName+'</td>';
											if(result[i].name != null && typeof result[i].name != "undefined"){
												str+='<td><a class="ivrsQuestionCls" style=" cursor: pointer;" attr_questionId="'+result[i].id+'" attr_locType="'+locationType+'" attr_locId="'+locationId+'" attr_deptId="'+result[i].deptId+'" attr_schemeId="'+result[i].schemeId+'">'+result[i].name+'</a></td>';
											}else{
												str+='<td>-</td>';	
											}											
											str+='<td>'+result[i].ivrsCalls+'</td>';					
											str+='<td>'+result[i].answered+'</td>';
											str+='<td class="text-danger">'+result[i].answeredPerc+'</td>';
											for(var j in result[i].subList){
												str+='<td>'+result[i].subList[j].answered+'</td>';
												str+='<td class="text-danger">'+result[i].subList[j].answeredPerc+'</td>';
											}						
											for(var j in result[i].questionsList){
												for(var k in result[i].questionsList[j].subList){
													str+='<td>'+result[i].questionsList[j].subList[k].answered+'</td>';
												str+='<td class="text-danger">'+result[i].questionsList[j].subList[k].answeredPerc+'</td>';
												}							
											}
										str+='</tr>';						
									} 
									str+='</tbody>';
								str+='</table>';
							str+='</div>';
							if(locationType != "state"){	
								str+='<div id="scrollTopDivId"></div>';
							}
			if(locationType != null && locationType == "state"){		
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			}
		str+='</div>';
	str+='</div>';
	if(locationType != null && locationType == "state"){
		$('#ivrsQuestionsDivId').html(str);
	}else{
		$('#IVRSQuestionsModalId').html(str);
	}		
	
	$("#dataTable1_"+locationType).dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[ 10, 15,50, -1], [10, 15,50, "All"]]
	});	
}
//Click On IVRS Question
$(document).on("click",".ivrsQuestionCls",function(){
	var quesId= $(this).attr("attr_questionId");
	var locType= $(this).attr("attr_locType");
	var locId= $(this).attr("attr_locId");
	var deptId= $(this).attr("attr_deptId");
	var schemeId= $(this).attr("attr_schemeId");
	
	$("#IVRSQuesDetailsModalId").css("background-color","#e0e0e0");
	if(locType != "state"){
		$(".modal").animate({ scrollTop: $('#scrollTopDivId').offset().top }, 'slow');
	}
	
	$("#ivrsQuestionModalId").modal("show");
	
	getLevelWiseIvrsQuestionDetails(deptId,quesId,locType,locId,schemeId);
})

function getLevelWiseIvrsQuestionDetails(deptId,questionId,locationType,locationId,schemeId){	
	$("#IVRSQuesDetailsModalId").html("");	
	$("#IVRSQuesDetailsModalId").html(spinner);		
	var json ={		
		fromDateStr: currentFromDate,
		toDateStr: currentToDate,
		deptId: deptId,
		questionId:questionId,
		locationType : locationType,
		locationId:locationId,
		schemeId : schemeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getLevelWiseIvrsQuestionDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildLevelWiseIvrsQuestionDetails(result);
		}else{			
			$("#IVRSQuesDetailsModalId").html("NO DATA AVAILABLE");
		}
	});
}
function buildLevelWiseIvrsQuestionDetails(result){
	var unSatisfiedCount;
	var str='';
	str+='<div class="row">';
	str+='<div class="pad_10 clearfix">';	
	for(var k in result){
		if(result[k].name == "Service"){	
			str+='<div class="col-sm-6">';
				if((result[0].subList != null && result[0].subList.length > 0) || (result[0].subQuestList != null &&  result[0].subQuestList.length > 0)){
					str+='<div class="pad_10 white-block" style="border: 1px solid #eb933c;">';
					if(result[0].subList != null && result[0].subList.length > 0){
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<h5 class="font_weight"><span class="dot"></span>';						
											str+='<span class="m_left_10">'+result[k].subList[0].name+'</span></h5>';											
									str+='</div>';
									for(var i in result[0].subList[0].subList){
										if(result[0].subList[0].subList[i].id == 2){
											unSatisfiedCount = result[0].subList[0].subList[i].count;
										}
										str+='<div class="col-sm-6 m_top10 text-center">';
											str+='<h5>'+result[0].subList[0].subList[i].name+'</h5>';
											str+='<h5 class="font_weight m_top10">'+result[0].subList[0].subList[i].count+'</h5>';
											str+='<h5 class="m_top5 text-success">'+result[0].subList[0].subList[i].perc+' %</h5>';
										str+='</div>';
						}
							str+='</div>';
					}
					if( result[0].subQuestList != null &&  result[0].subQuestList.length > 0){
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										for(var i in result[0].subQuestList){
											str+='<table class="table border_yash m_top10 table_custom_IVRS">';
												str+='<tbody>';							
													str+='<tr>';								
														str+='<td colspan="3">'+result[0].subQuestList[i].name+'</td>';
													str+='</tr>';
												for(var j in result[0].subQuestList[i].subList){
													str+='<tr>';
														str+='<td class=" font_weight" style="text-align: left !important;">'+result[0].subQuestList[i].subList[j].name+'</td>';
														str+='<td class=" font_weight">'+result[0].subQuestList[i].subList[j].count+'</td>';
														var unSatisfiedPerc = ((parseFloat(result[0].subQuestList[i].subList[j].count) * 100) / unSatisfiedCount).toFixed(2);
														str+='<td class="text-success">'+result[0].subQuestList[i].subList[j].perc+' %</td>';
													str+='</tr>	';
												}				
												str+='</tbody>';
											str+='</table>';
										}
										
									str+='</div>';
									
							str+='</div>';
					}							
				 str+='</div>';	
				}else{
					str+='<h5 class="font_weight">No Data Available</h5>';	
				}	
				str+='</div>';
		}
		if(result[k].name == "Govt"){
			str+='<div class="col-sm-6">';
			if(result[k].subList != null && result[k].subList.length >0){
				for(var i in result[k].subList){
					str+='<div class="pad_10 white-block" style="border: 1px solid #eb933c;">';
						str+='<div class="row">';
							str+='<div class="col-sm-12">';
								str+='<h5 class=""><span class="dot"></span>';							
									str+='<span class="m_left_10 font_weight">'+result[k].subList[i].name+'</span></h5>';
							str+='</div>';
						if(result[k].subList[i].subList != null && result[k].subList[i].subList.length >0){
							for(var j in result[k].subList[i].subList){
								str+='<div class="col-sm-6 m_top10 text-center">';
									str+='<h5 class="font_weight">'+result[k].subList[i].subList[j].name+'</h5>';
									str+='<h5 class="font_weight m_top10">'+result[k].subList[i].subList[j].count+'</h5>';
									str+='<h5 class="m_top5 text-success">'+result[k].subList[i].subList[j].perc+' %</h5>';
								str+='</div>';
							}
						}
						
						str+='</div>';
					str+='</div>';
				}
			}/* else{
				str+='<h5 class="font_weight">No Data Available</h5>';	
			}	 */
					
			str+='</div>';
		}	
	}							
	str+='</div>';
	str+='</div>';	
	$("#IVRSQuesDetailsModalId").html(str);
}

//Click On Districts or Constituency's or Mandals or Panchayaths
$(document).on("click",".locaWiseQuestCls",function(){	
	var deptId = $(this).attr("attr_dept");
	var locationId = $(this).attr("attr_locationId");
	var locType = $(this).attr("attr_locType");	
	$("#ivrsQuestionModalId").modal("show");
	getQuestionWiseDetails(deptId,locType,locationId);
})
$(document).on("click",".closeIVRS",function(){
	$("#IVRSQuestionsModalId").html('');
	$("#IVRSQuesDetailsModalId").html('');
})
function resetSelectBox(){
	//$("#deptsIVRSId").html('');
	$("#deptLocId").html('');
	$("#serviceDivId").html('');
	$("#questionsDivId").html('');
}

$(document).on("click",".getMonthAndConsoliadtedCls li",function(){
	$(this).closest('ul').find("li").removeClass('active');
	$(this).addClass('active');
	var type=$(this).attr("attr_type");
	if(type == "monthWise"){
		$("#locFilterCls").show();
	}else{
		setTimeout(function(){	
			$("#locPercId").trigger("click");
		}, 500);		
		$("#locFilterCls").hide();
	}
	locationWiseIVRSDetails("ivrs",type);
});

function buildLocationMonthWiseIvrsDetails(result,locationType,deptId,locId){
		var tableView='';
		tableView+='<div class="table-responsive">';
			tableView+='<table class="table table-bordered table_default" id="dataTable_'+locationType+'" style="width:100%;">';
				tableView+='<thead>';
					tableView+='<tr>';
						tableView+='<th rowspan="3">District</th>';
						if(locationType != null && locationType != "district"){
							tableView+='<th rowspan="3">Constituency</th>';
						}
						if(locationType != null &&( locationType == "mandal" || locationType =="panchayat")){
							tableView+='<th rowspan="3">Mandal</th>';
						}
						if(locationType != null && locationType =="panchayat"){
							tableView+='<th rowspan="3">panchayat</th>';
						}
						for(var i in result[0].subList){
							var length= result[0].subList[i].subList.length*2;
							tableView+='<th colspan="'+length+'" style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">'+result[0].subList[i].name+'</th>';
						}		
					tableView+='</tr>';
					
					tableView+='<tr>';
						for(var i in result[0].subList){
							for(var j in result[0].subList[i].subList){
								tableView+='<th colspan="2" style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">'+result[0].subList[i].subList[j].name+'</th>';
							}
						}
					tableView+='</tr>';
					
					tableView+='<tr>';
					for(var i in result[0].subList){
						for(var j in result[0].subList[i].subList){
							tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">yes</th>';
							tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;display:none;">yes</th>';
							tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">No</th>';
							tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;display:none;">No</th>';
						}
						
					}
					tableView+='</tr>';
				tableView+='</thead>';
				tableView+='<tbody>';
					for(var i in result){
						tableView+='<tr>';					
						if(locationType != null && (locationType != "district")){
							if(result[i].districtName != null && typeof(result[i].districtName) != "undefined"){
								tableView+='<td class="white-block" style="text-align: left !important;">'+result[i].districtName+'</td>';
							}else{
								tableView+='<td class="white-block">-</td>';
							}
							
						}
						if(locationType != null && (locationType == "mandal" || locationType == "panchayat")){
							if(result[i].constituencyName != null && typeof(result[i].constituencyName) != "undefined"){
								tableView+='<td class="white-block" style="text-align: left !important;">'+result[i].constituencyName+'</td>';
							}else{
								tableView+='<td class="white-block">-</td>';
							}
							
						}
						if(locationType != null && locationType == "panchayat"){						
							if(result[i].mandalName != null && typeof(result[i].mandalName) != "undefined"){
								tableView+='<td class="white-block" style="text-align: left !important;">'+result[i].mandalName+'</td>';
							}else{
								tableView+='<td class="white-block">-</td>';
							}
						}
						if(result[i].name != null && typeof(result[i].name) != "undefined"){
							tableView+='<td class="white-block" style="text-align: left !important;"><a class="locaWiseQuestCls"style="text-align: left !important; cursor: pointer;" attr_locationId="'+result[i].id+'" attr_locType="'+locationType+'" attr_dept="'+deptId+'">'+result[i].name+'</a></td>';
						}else{
							tableView+='<td class="white-block">-</td>';
						}
						for(var j in result[i].subList){
							for(var k in result[i].subList[j].subList){
								if(result[i].subList[j].subList[k].yesPerc !=null && result[i].subList[j].subList[k].yesPerc>0){
									tableView+='<td class="locPercCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].subList[k].yesPerc+'<small>%</small></td>';
								}else{
									tableView+='<td class="locPercCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;"> - </td>';
								}
								if(result[i].subList[j].subList[k].yesCount !=null && result[i].subList[j].subList[k].yesCount>0){
									tableView+='<td class="locCountCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;display:none;">'+result[i].subList[j].subList[k].yesCount+'</td>';
								}else{
									tableView+='<td class="locCountCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;display:none;"> - </td>';
								}
								if(result[i].subList[j].subList[k].noPerc !=null && result[i].subList[j].subList[k].noPerc>0){
									tableView+='<td class="locPercCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].subList[k].noPerc+'<small>%</small></td>';
								}else{
									tableView+='<td class="locPercCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;"> - </td>';
								}
								if(result[i].subList[j].subList[k].noCount !=null && result[i].subList[j].subList[k].noCount>0){
									tableView+='<td class="locCountCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;display:none;">'+result[i].subList[j].subList[k].noCount+'</td>';
								}else{
									tableView+='<td class="locCountCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;display:none;"> - </td>';
								}
								
							}
						}	
							
						tableView+='</tr>';
					}
				tableView+='</tbody>';
			tableView+='<table>';
		tableView+='</div>';
		$(".ivrs"+''+locId).trigger("click");
		$("#ivrs_"+locationType).html(tableView);		
		$("#dataTable_"+locationType).dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"scrollX":        true,		
		"scrollCollapse": true,		
		"fixedColumns":   {
			"leftColumns": locId,
		},
		
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "ivrs",
				filename:  'ivrs'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); 			
	$(".DTFC_LeftBodyLiner").css({
		"overflow-x":"hidden",
		"overflow-y":"hidden",
		"top": "-11px"
	});	 	 
	setTimeout(function(){ 
		$(".ivrs"+''+locId).trigger("click");
	}, 500);
	
	}

$(document).on("click",".getDeptWiseCls li",function(){
	$(this).closest('ul').find("li").removeClass('active');
	$(this).addClass('active');
	var type=$(this).attr("attr_type");
	if(type == "monthWise"){
		$("#deptFilterCls").show();
	}else{
		setTimeout(function(){	
			$("#deptPercId").trigger("click");
		}, 500);
		$("#deptFilterCls").hide();
	}
	getIvrsDeptWiseDetails("deptWise",type);
});

$(document).on("click",".getSchemeWiseCls li",function(){
	$(this).closest('ul').find("li").removeClass('active');
	$(this).addClass('active');
	var type=$(this).attr("attr_type");	
	if(type == "monthWise"){
		$("#schemeFilterCls").show();
	}else{
		setTimeout(function(){	
			$("#schemePercId").trigger("click");
		}, 500);
		$("#schemeFilterCls").hide();
	}
	getIvrsDeptWiseDetails("schemeWise",type);
});

function buildIvrsDeptAndSchemeMonthlyWiseDetails(result,reportType){
	var tableView='';	
		tableView+='<div class="table-responsive m_top10">';
			tableView+='<table class="table table-bordered table_default" id="dataTableMonthly_'+reportType+'" style="width:100%;">';
				tableView+='<thead>';
					tableView+='<tr>';
						tableView+='<th rowspan="3">Department</th>';
						tableView+='<th rowspan="3">Services/Schemes</th>';
						tableView+='<th rowspan="3">Questions</th>';
						
						for(var i in result[0].subList){
							var length= result[0].subList[i].subList.length*2;
							if(result[0].subList[i].name == "Service"){
								tableView+='<th colspan="'+length+'" style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">Departments Satisfaction</th>';
							}else{
								tableView+='<th colspan="'+length+'" style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">'+result[0].subList[i].name+'</th>';
							}
							
						}
					tableView+='</tr>';
					tableView+='<tr>';
						for(var i in result[0].subList){
							for(var j in result[0].subList[i].subList){
								tableView+='<th colspan="2" style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">'+result[0].subList[i].subList[j].name+'</th>';
							}
						}
					tableView+='</tr>';
					tableView+='<tr>';
					for(var i in result[0].subList){
						for(var j in result[0].subList[i].subList){
							tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">yes</th>';
							tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;display: none;">yes</th>';
							tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important;">No</th>';
							tableView+='<th style="background-color:'+bgColorArr[result[0].subList[i].name]+' !important; display: none;">No</th>';
						}
						
					}
					tableView+='</tr>';
					
				tableView+='</thead>';
				tableView+='<tbody>';
					for(var i in result){
						tableView+='<tr>';
							if(reportType == "deptWise"){
								if(result[i].name != null && typeof(result[i].name) != "undefined"){
									tableView+='<td class="white-block">'+result[i].name+'</td>';
								}else{
									tableView+='<td class="white-block">-</td>';
								}
								if(result[i].schemeCount != null && result[i].schemeCount >0){
									tableView+='<td class="white-block">'+result[i].schemeCount+'</td>';
								}else{
									tableView+='<td class="white-block">-</td>';
								}
							}else if(reportType == "schemeWise"){
								if(result[i].deptName != null && typeof(result[i].deptName) != "undefined"){
									tableView+='<td class="white-block">'+result[i].deptName+'</td>';
								}else{
									tableView+='<td class="white-block">-</td>';
								}
								if(result[i].name != null && typeof(result[i].name) != "undefined"){
									tableView+='<td class="white-block">'+result[i].name+'</td>';
								}else{
									tableView+='<td class="white-block">-</td>';
								}
							}
							tableView+='<td class="white-block">'+result[i].questionsCount+'</td>';
							for(var j in result[i].subList){
								for(var k in result[i].subList[j].subList){
									if(result[i].subList[j].subList[k].yesCount !=null && result[i].subList[j].subList[k].yesCount>0){
										tableView+='<td class="'+reportType+'countCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;display:none;">'+result[i].subList[j].subList[k].yesCount+'</td>';
									}else{
										tableView+='<td class="'+reportType+'countCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;display:none;"> - </td>';
									}
									if(result[i].subList[j].subList[k].yesPerc !=null && result[i].subList[j].subList[k].yesPerc>0){
										tableView+='<td class="'+reportType+'percCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].subList[k].yesPerc+'<small>%</small></td>';
									}else{
										tableView+='<td class="'+reportType+'percCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;"> - </td>';
									}
									if(result[i].subList[j].subList[k].noCount !=null && result[i].subList[j].subList[k].noCount>0){
										tableView+='<td class="'+reportType+'countCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;display:none;">'+result[i].subList[j].subList[k].noCount+'</td>';
									}else{
										tableView+='<td class="'+reportType+'countCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;display:none;"> - </td>';
									}
									if(result[i].subList[j].subList[k].noPerc !=null && result[i].subList[j].subList[k].noPerc>0){
										tableView+='<td class="'+reportType+'percCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;">'+result[i].subList[j].subList[k].noPerc+'<small>%</small></td>';
									}else{
										tableView+='<td class="'+reportType+'percCls" style="background-color:'+bgColorArr[result[i].subList[j].name]+' !important;"> - </td>';
									}
								}
							}
						tableView+='</tr>';
					}						
				tableView+='</tbody>';
			tableView+='</table>';
		tableView+='</div>';
	
	$("#ivrs"+reportType+"DetailsDivId").html(tableView);	
	//if(reportType =="deptWise"){		
		$("#dataTableMonthly_"+reportType).dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],			
			"aLengthMenu": [[ 10, 30,50, -1], [10, 30,50, "All"]],
			"scrollX":        true,		
			"scrollCollapse": true,		
			"fixedColumns":   {
				"leftColumns": 3,
			},
			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "ivrs"+reportType+"",
					filename:  "ivrs"+reportType+""+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		}); 			
		$(".DTFC_LeftBodyLiner").css({
			"overflow-x":"hidden",
			"overflow-y":"hidden",
			"top": "-11px"
		});	
	//}
}
$(document).on('click', '[name="deptFilter"]', function (){
	console.log($(this).val());
	var type = $(this).val();
	if(type == "percentage"){
		$(".deptWisecountCls").hide();
		$(".deptWisepercCls").show();		
	}else{
		$(".deptWisepercCls").hide();
		$(".deptWisecountCls").show();		
	}
});
$(document).on('click', '[name="schemeFilter"]', function (){	
	var type = $(this).val();
	if(type == "percentage"){
		$(".schemeWisecountCls").hide();
		$(".schemeWisepercCls").show();		
	}else{
		$(".schemeWisepercCls").hide();
		$(".schemeWisecountCls").show();		
	}
});
$(document).on('click', '[name="locFilter"]', function (){	
	var type = $(this).val();
	if(type == "percentage"){
		$(".locCountCls").hide();
		$(".locPercCls").show();		
	}else{
		$(".locPercCls").hide();
		$(".locCountCls").show();		
	}
});