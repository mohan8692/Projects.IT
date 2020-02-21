//global variables
var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var locationArr = ["State","District","Constituency","Mandal"];
/* var currentFromDate = "01-01-2017";
var currentToDate = "01-01-2018"; */
var globaldeptIds="";
var getDeptHodsArr=[];
var deptJson=[];
var allSourceIds="1,10,11,12,13,14,16,17,18,19,2,4,6,7,9"
var globalTop =20;
var currentFromDate=moment().startOf('Year').format("DD-MM-YYYY");
var currentToDate=moment().format("DD-MM-YYYY");

$(".chosen-select").chosen();
buildHodsJson();
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
	$(".menuCls-table2").hide();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
	$(".menuCls-table2").hide();
});
$(document).on("click","input[type='checkbox']",function(){	
	
	var value = $(this).val();
	if(value == 0){
		$(".individual").prop("checked",false);
	}else{
		$("#allId").prop("checked",false);
	}
});

$(document).on("click",".getDeptWiseHodsCls",function(){
	getDeptHodsArr=[];
    $(".getDeptWiseHodsCls").each(function(){
        if($(this).is(":checked"))
            getDeptHodsArr.push($(this).attr("attr_dept"));
    });
	buildHodsJson();
	
});
$(document).on("click",".getDepartmentWiseCls",function(){
	var selectedHODs = [];	
	// for individual select
	$('#deptHODId option:selected').each(function (){	
		if($(this).val() != 0 ){
			selectedHODs.push($(this).val());				
		}else{
			selectedHODs=[];
			$('#deptHODId option').each(function (){
				selectedHODs.push($(this).val());
			});
			selectedHODs.shift();	//delete all value
		}
		for(var k in selectedHODs){
			if(k==0){
				globaldeptIds = selectedHODs[k];
			}else{
				globaldeptIds += "," + selectedHODs[k];
			}
		}
	});
	console.log(globaldeptIds);	
	onloadCalls();
});

$("#dateRangePickerGrievance").daterangepicker({
		opens: 'left',
		startDate: currentFromDate,
		endDate: currentToDate,
		locale: {
		  format: 'DD-MM-YYYY'
		},
		ranges: {
			'ALL' : ["01-04-2014", moment().format("DD-MM-YYYY")],
		   'Today' : [moment(), moment()],
		   'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
		   'This Month': [moment().startOf('month'),moment()],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'This Year': [moment().startOf('Year'), moment()],
		   'Last 1 Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		}
	});
	var dates= $("#dateRangePickerGrievance").val();
	var pickerDates = currentFromDate+' - '+currentToDate;
	if(dates == pickerDates)
	{
		$(dateRangePickerGrievance).val('This Year');
	}
	$('#dateRangePickerGrievance').on('apply.daterangepicker', function(ev, picker) {
		currentFromDate = picker.startDate.format('DD-MM-YYYY');
		currentToDate = picker.endDate.format('DD-MM-YYYY');
		if(picker.chosenLabel == 'This Year')
		{
			$("#dateRangePickerGrievance").val('This Year');
		}		
		onloadCalls();
	});


function onloadCalls(){
	/* var selectedDeptIds=[];
	var deptWiseHodId= $("#deptHODId").val();
	if($.inArray("0", deptWiseHodId !==1)) {
		selectedDeptIds.push("100082","100083","100081","100072","100073","100074","100331","100332","100333","100334","100335","100336")
	}else{
		selectedDeptIds= $(this).val();
	}
	
	for(var i in selectedDeptIds){
		if(i==0){
			globaldeptIds = selectedDeptIds[i]
		}else{
			globaldeptIds = globaldeptIds+","+selectedDeptIds[i]
		}
	}
	 
	console.log(globaldeptIds)*/
	
	$(".grievanceTableViewCls li").removeClass("active");
	$(".grievanceTableViewCls li:nth-child(1)").addClass("active");
	$("#deptId").trigger("chosen:updated");
	getSourceWiseGrievancesOverview(globaldeptIds);
	getStatusWiseGrievancesOverview("0",globaldeptIds,"tabpaneblock1_0");
	getDayWiseGrievancesCount("0",globaldeptIds,"grievancesGraph_0","MonthWise");
	getFinacialStatusWiseGrieviancesCount("0",globaldeptIds,"tabpaneblock3_0","Financial");		
	buildlevelWiseGrievanceDetails("grievance","location",globaldeptIds);
	buildlevelWiseTopGrievanceDetails("topGrievance","topGrievance",globaldeptIds)	
}

//clicks
$(document).on("click",".tab_bordered li",function(){
	$(this).closest("ul").find("li").removeClass("active_li");
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active_li");	
	var source_Id = $(this).attr("attr_sourceId");
	var name = $(this).attr("attr_source_name");
	//var type = $(this).attr("attr_graph_type");
	$(".grievancesProgressCls li").attr("attr_sourceId",source_Id);
	$("#topGrievanceSubmit").attr("attr_sourceId",source_Id);
	$(".grievancesProgressCls li").attr("attr_name",name);
	$(".graphHeadingCls").html("Month Wise " +'( '+name+' ) Grievances');
	if($(this).hasClass('active_li')){
		getStatusWiseGrievancesOverview(source_Id,globaldeptIds,"tabpaneblock1_"+source_Id);
		getDayWiseGrievancesCount(source_Id,globaldeptIds,"grievancesGraph_"+source_Id,"MonthWise");
		getFinacialStatusWiseGrieviancesCount(source_Id,globaldeptIds,"tabpaneblock3_"+source_Id,'Financial');	
	}
});
$(document).on("click","[href_source]",function(){
	var elementId =  $(this).attr("href_source");
	$("[href_source_block]").hide();
	$("[href_source_block="+elementId+"]").show();
});
$(document).on("click",".grievancesProgressCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type='';
	var source_Id='';
	var name='';
	if($(this).hasClass("active")){
		type = $(this).attr("attr_type");
		name = $(this).attr("attr_name");
		source_Id = $(this).attr("attr_sourceId");
		console.log($(this).attr("attr_sourceId"));
		//$(".tab_bordered li").attr("attr_graph_type",type);
	}
	//Month Wise (All Sources) Grievances
	if(type=="MonthWise"){
		$(".graphHeadingCls").html('Mont Wise ( '+name+' ) Grievances');
	}else if(type== "DayWise"){
		$(".graphHeadingCls").html('Day Wise ( '+name+' ) Grievances');
	}
	getDayWiseGrievancesCount(source_Id,globaldeptIds,"grievancesGraph_"+source_Id,type);
});
$(document).on("click",".financialNonfinancialCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var fnf = $(this).attr("attr_fnf");	
	$(".ulfnfclass").hide();
	$("#fnf_"+fnf).show();	
	
});
$(document).on("click",".grievanceTableViewCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var blockType = $(this).attr("attr_type");
	if(blockType == "topGrievance"){
		$(".locationCls").hide();
		$(".topGrievanceCls").show();
	}else if(blockType == "location"){
		$(".topGrievanceCls").hide();
		$(".locationCls").show();
	}
	//buildlevelWiseGrievanceDetails("grievance",blockType,globaldeptIds);
});


//nav tabs
function getSourceWiseGrievancesOverview(globaldeptIds){
	$("#sourcesTabId").html(spinner);
	var json={
		fromDate:currentFromDate,
		toDate:currentToDate,
		departmentId: globaldeptIds,		
	}
	$.ajax({                
	type:'POST',    
	url: 'getSourceWiseGrievancesOverview',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildSourceWiseGrievancesOverview(result);
			$("#tabpaneblock1_0").html(spinner);
			$("#grievancesGraph_0").html(spinner);
			$("#tabpaneblock3_0").html(spinner);
			/*getStatusWiseGrievancesOverview("0",globaldeptIds,"tabpaneblock1_0");
			getDayWiseGrievancesCount("0",globaldeptIds,"grievancesGraph_0","MonthWise");
			getFinacialStatusWiseGrieviancesCount("0",globaldeptIds,"tabpaneblock3_0","Financial");	*/		
		}
	});
}
//nav tabs building
function buildSourceWiseGrievancesOverview(result){
	var allSourcesTotal=0;
	var allSourcesClosed=0;
	var allSourcesPending=0;
	for(var i in result){
		allSourcesTotal = parseInt(allSourcesTotal) + parseInt(result[i].total);
		allSourcesClosed = parseInt(allSourcesClosed) + parseInt(result[i].closed);
		allSourcesPending = parseInt(allSourcesPending) +parseInt(result[i].pending);
	}
	var allSourcesClosedPerc = parseFloat((allSourcesClosed/allSourcesTotal)*100).toFixed(2);
	var allSourcesPendingPerc = parseFloat((allSourcesPending/allSourcesTotal)*100).toFixed(2);
	var str='';
	//tabs
	str+='<div class="col-sm-3">';
		if($(window).width() < 768)
		{
			str+='<select class="form-control chosen-select">';
				for(var  i in result)
				{
					str+='<option href_source="#source'+result[i].sourceId+'">'+result[i].sourceName+'</option>';
					
				}				
			str+='</select>';
		}else{
			str+='<ul class="nav nav-tabs tab_bordered" role="tablist">';
				for(var i in result){
					var closedPerc=0.0;
					var pendingPerc=0.0;
					closedPerc=parseFloat((result[i].closed/result[i].total)*100).toFixed(2);
					pendingPerc=parseFloat((result[i].pending/result[i].total)*100).toFixed(2);
					if(result[i].sourceId !=null && result[i].sourceId == "0"){
						str+='<li role="presentation"  class="active_li" attr_sourceId="'+result[i].sourceId+'" attr_source_name="'+result[i].sourceName+'" attr_graph_type="MonthWise">';	
					}else{
						str+='<li role="presentation" attr_sourceId="'+result[i].sourceId+'" attr_source_name="'+result[i].sourceName+'" attr_graph_type="MonthWise">';	
					}
						str+='<a href="#source'+result[i].sourceId+'" data-toggle="tab" class="">';
							str+='<div class="row">';
								str+='<div class="col-sm-10">';
									str+='<div class="media">';
										str+='<div class="media-left">';									
											str+='<img src="Assests/images/grievance/'+result[i].sourceName+'.png" class="media-object m_top10" style="width:30px">'; 
										str+='</div>';
										str+='<div class="media-body">';
											str+='<h5 class="media-heading color_black m_top5">'+result[i].sourceName+'</h5>';
											if(result[i].total != null && result[i].total >0){
												str+='<h4 class="color_black font_weight m_top5">'+result[i].total+'</h4>';
											}else{
												str+='<h4 class="color_black font_weight m_top5">-</h4>';
											}										
										str+='</div>';
									str+='</div>';									
								str+='</div>';
								str+='<div class="col-sm-2">';
									str+='<i class="fa fa-angle-right color_black f_30 m_top15"></i>';
								str+='</div>';
								str+='<div class="col-sm-12">';
								str+='<h6 class="color_black m_top10">Closed:&nbsp;';
									if(result[i].closed != null && result[i].closed >0){
										str+='<span class="font_weight"style="margin-right: 10px;">&nbsp;'+result[i].closed+'<span class="good_color">&nbsp;&nbsp;'+closedPerc+'%</span></span>';
									}else{
										str+='<span class="font_weight"style="margin-right: 10px;">-</span>';
									}
									if(result[i].pending != null && result[i].pending >0){
										str+='Pending:&nbsp;<span class="font_weight">'+result[i].pending+'<span class="bad_color">&nbsp;&nbsp;'+pendingPerc+'%</span></span>';
									}else{
										str+='Pending:&nbsp;<span class="font_weight">-</span>';
									}									
								str+='</h6>';
								str+='</div>';	
							str+='</div>';	
						str+='</a>';
					str+='</li>';
				}			
			str+='</ul>';
		}
	str+='</div>';
	//tab content
	str+='<div class="col-sm-9">';		
		str+='<div class="tab-content">';
			str+='<div class="tab-pane active" id="source0">';
				//for all sources(default building)
				str+='<div id="tabpaneblock1_0"></div>';
				str+='<div class="pad_10 m_top10 box_shadow_grievance">';
					str+='<div class="row m_top10">';
							str+='<div class="col-sm-9">';
								str+='<h5 class="font_weight graphHeadingCls">Month Wise (All Sources) Grievances</h5>';
							str+='</div>';
							str+='<div class="col-sm-3">';
								str+='<ul class="list-inline pull-right calendar_active_IHHL_cls m_top10 grievancesProgressCls">';
									str+='<li class="defaultActiveClsDay " attr_type="DayWise" attr_sourceId="0" attr_name="All Sources"><img src="Assests/icons/Today_icon.png"/>&nbsp;&nbsp;<b><span>Day</span></b></li>';
									str+='<li class="active" attr_type="MonthWise" attr_sourceId="0" attr_name="All Sources"><img src="Assests/icons/CustomRange_icon.png" />&nbsp;&nbsp;<b><span>Month</span></b></li';
									str+='</li>';
								str+='</ul>';
							str+='</div>';
						str+='</div>';
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-12">';
								str+='<div id="grievancesGraph_0" style="height:300px;"></div>';
							str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div id="tabpaneblock3_0"></div>';				
			str+='</div>';	
			for(var i in result){
				str+='<div class="tab-pane" href_source_block="source'+result[i].sourceId+'" id="source'+result[i].sourceId+'">';				
					//block-1
					str+='<div id="tabpaneblock1_'+result[i].sourceId+'"></div>';
					//Graph(block-2)
					str+='<div class="pad_10 m_top10 box_shadow_grievance">';
						str+='<div class="row m_top10 ">';
						str+='<div class="col-sm-9">';
							str+='<h5 class="font_weight graphHeadingCls"></h5>';
						str+='</div>';
						str+='<div class="col-sm-3">';
							str+='<ul class="list-inline pull-right calendar_active_IHHL_cls m_top10 grievancesProgressCls">';
								str+='<li class="defaultActiveClsDay " attr_type="DayWise" attr_sourceId="" attr_name=""><img src="Assests/icons/Today_icon.png"/>&nbsp;&nbsp;<b><span>Day</span></b></li>';
								str+='<li class="active" attr_type="MonthWise" attr_sourceId="" attr_name=""><img src="Assests/icons/CustomRange_icon.png" />&nbsp;&nbsp;<b><span>Month</span></b></li';
								str+='</li>';
							str+='</ul>';
						str+='</div>';
						str+='<div id="grievancesGraph_'+result[i].sourceId+'" style="height:300px;"></div>';
						str+='</div>';
					str+='</div>';
					//block-3
					str+='<div id="tabpaneblock3_'+result[i].sourceId+'"></div>';	
				str+='</div>';
			}			
		str+='</div>';
	str+='</div>';
	$("#sourcesTabId").html(str);	
}
function getStatusWiseGrievancesOverview(sourceId,globaldeptIds,divId){
	$("#"+divId).html(spinner);
	var json={
		fromDate:currentFromDate,
		toDate:currentToDate,
		sourceId: sourceId,
		departmentId: globaldeptIds
	}
	$.ajax({                
	type:'POST',    
	url: 'getStatusWiseGrievancesOverview',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildStatusWiseGrievancesOverview(result,sourceId,divId);
		}
	});
}
function buildStatusWiseGrievancesOverview(result,sourceId,divId){	
	//alert(divId);
	var str='';
	str+='<div class="row">';
		str+='<div class="custom_ul">';
			for(var i in result){
				str+='<ul class="list-inline custom_li">';
				str+='<li class="white-block border_black">';			
					str+='<div class="pad_10_10 text-center" >';
						str+='<h5 class="f_13 font_weight">Total</h5>';
						if(result[i].total != null && result[i].total >0){
							str+='<h4 class="font_weight m_top10">'+result[i].total+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top10">-</h4>';
						}					
						str+='<h5 class="m_top5">Grievances</h5>';
					str+='</div>';				
				str+='</li>';
				str+='<li class="white-block border_green">';			
					str+='<div class="pad_10_10 text-center" >';
						str+='<h5 class="good_color f_13 font_weight">Closed</h5>';
						if(result[i].closed != null && result[i].closed >0){
							str+='<h4 class="font_weight m_top10">'+result[i].closed+'</h4>';
							str+='<h5 class="good_color font_weight m_top5">'+((result[i].closed/result[i].total)*100).toFixed(2)+'%</h5>';
						}else{
							str+='<h4 class="font_weight m_top10">-</h4>';
						}							
					str+='</div>';				
				str+='</li>';
				str+='<li class="white-block border_red">';		
					str+='<div class="pad_10_10 text-center" >';
						str+='<h5 class=" bad_color f_13 font_weight">Pending</h5>';
						if(result[i].pending != null && result[i].pending >0){
							str+='<h4 class="font_weight m_top10">'+result[i].pending+'</h4>';
							str+='<h5 class="bad_color font_weight m_top5">'+((result[i].pending/result[i].total)*100).toFixed(2)+'%</h5>';
						}else{
							str+='<h4 class="font_weight m_top10">-</h4>';
						}						
					str+='</div>';				
				str+='</li>';
				str+='<li class="white-block border_green">';			
					str+='<div class="pad_10_10" >';
					str+='<div class="row" >';
						str+='<div class="col-sm-3" >';
							str+='<h5 class=" good_color f_13 font_weight">Sanctioned</h5>';
							if(result[0].sanctioned != null && result[0].sanctioned >0){
								str+='<h4 class="font_weight m_top10">'+result[0].sanctioned+'</h4>';
								str+='<h5 class="good_color font_weight m_top5">'+((result[0].sanctioned/result[0].total)*100).toFixed(2)+'%</h5>';
							}else{
								str+='<h4 class="font_weight m_top10">-</h4>';
							}			
						str+='</div>';
						str+='<div class="col-sm-3" >';
							str+='<h5 class=" good_color f_13 font_weight">Eligible</h5>';
							if(result[i].eligible != null && result[i].eligible >0){
								str+='<h4 class="font_weight m_top10">'+result[i].eligible+'</h4>';
								str+='<h5 class="good_color font_weight m_top5">'+((result[i].eligible/result[i].total)*100).toFixed(2)+'%</h5>';
							}else{
								str+='<h4 class="font_weight m_top10">-</h4>';
							}	
						str+='</div>';
						str+='<div class="col-sm-3" >';
							str+='<h5 class=" clr_warning f_13 font_weight">Verified Not Sanc.</h5>';
							if(result[i].verified_not_sanctioned != null && result[i].verified_not_sanctioned >0){
								str+='<h4 class="font_weight m_top10">'+result[i].verified_not_sanctioned+'</h4>';
								str+='<h5 class="clr_warning font_weight m_top5">'+((result[i].verified_not_sanctioned/result[i].total)*100).toFixed(2)+'%</h5>';
							}else{
								str+='<h4 class="font_weight m_top10">-</h4>';
							}	
						str+='</div>';
						str+='<div class="col-sm-3" >';
							str+='<h5 class=" good_color f_13 font_weight">Rejected</h5>';
							if(result[0].rejected != null && result[0].rejected >0){
								str+='<h4 class="font_weight m_top10">'+result[0].rejected+'</h4>';
								str+='<h5 class="good_color font_weight m_top5">'+((result[0].rejected/result[0].total)*100).toFixed(2)+'%</h5>';
							}else{
								str+='<h4 class="font_weight m_top10">-</h4>';
							}
						str+='</div>';						
					str+='</div>';				
					str+='</div>';				
				str+='</li>';
				str+='<li class="white-block border_red f_13">';			
					str+='<div class="pad_10_10 text-center" >';
						str+='<h5 class=" bad_color font_weight">Not Processed</h5>';
							if(result[i].not_processed != null && result[i].not_processed >0){
								str+='<h4 class="font_weight m_top10">'+result[i].not_processed+'</h4>';
								str+='<h5 class="bad_color font_weight m_top5">'+((result[i].not_processed/result[i].total)*100).toFixed(2)+'%</h5>';
							}else{
								str+='<h4 class="font_weight m_top10">-</h4>';
							}						
					str+='</div>';				
				str+='</li>';

			str+='</ul>';
			}
						
		str+='</div>';
	str+='</div>';
	$("#"+divId).html(str);
}
//graph(block-2)
function getDayWiseGrievancesCount(sourceId,globaldeptIds,divId,type){
	$("#"+divId).html(spinner);
	var json={
		fromDate:currentFromDate,
		toDate:currentToDate,
		sourceId: sourceId,
		departmentId: globaldeptIds,
		type: type
	}
	$.ajax({                
	type:'POST',    
	url: 'getDayWiseGrievancesCount',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildDayWiseGrievancesCount(result,sourceId,divId,type);
		}
	});
}
function buildDayWiseGrievancesCount(result,sourceId,divId,type){
	var countsArr=[];
	var monthNameArr=[];	
	for(var i in result){
		countsArr.push(parseInt(result[i].total_Count));
		/* if(type=="MonthWise"){
			monthNameArr.push(result[i].month);
		}else{
			monthNameArr.push(result[i].date);
		} */
		monthNameArr.push(result[i].day);
	}
	$('#'+divId).highcharts(
		{colors:['#e3f6cd'],
		  chart: {
				type: 'areaspline',
				backgroundColor:'transparent'
			},
			title: {
				text: '',
			},
			legend: {
				enabled: false,
			},
			xAxis: {
				
				categories: monthNameArr,
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
			tooltip: {
					 formatter: function() {
						return  (this.x)+"<br/>Count - "+(this.y)+"";
					},
					//headerFormat: '<b>{series.name}</b><br/>',
					//pointFormat: '{point.y}'
				},
			credits: {
				enabled: false
			},
			plotOptions: {
					areaspline: {
					fillOpacity: 0.5,
					lineColor: '#25CAA1',
					 dataLabels: {
							enabled: true,
							color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'gray',
							formatter: function() {
								return (this.y);
							},
						},
				},
			series: {
					marker: {
						fillColor: '#FFFFFF',
						lineColor: '#25CAA1',
						lineWidth: 1,  // inherit from series
					}
				}
			},
			series: [{
				name: '',
				data: countsArr,	
			}]
	});	
}
//block-3
function getFinacialStatusWiseGrieviancesCount(sourceId,globaldeptIds,divId,buildType){
	//alert(sourceId);
	$("#"+divId).html(spinner);
	var json={
		fromDate:currentFromDate,
		toDate:currentToDate,
		sourceId: sourceId,
		departmentId: globaldeptIds,		
	}
	$.ajax({                
	type:'POST',    
	url: 'getFinacialStatusWiseGrieviancesCount',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildFinacialStatusWiseGrieviancesCount(result,sourceId,divId,buildType);
		}else{
			
		}
	});
}
function buildFinacialStatusWiseGrieviancesCount(result,sourceId,divId,type){
	var str='';		
	str+='<div class="pad_10 m_top50 box_shadow_grievance">';
		str+='<div class="row">';
			str+='<div class="col-sm-12 m_top10">';
				str+='<div class="table-responsive lightBlackBrdr">';
					str+='<table class="table table_custom_SC">';
						str+='<thead>';
							str+='<tr>';						
								str+='<th>Type</th>';
								str+='<th>Total</th>';
								str+='<th>Sanctioned</th>';
								str+='<th>Eligible</th>';
								str+='<th>Verified Not Sanctioned</th>';
								str+='<th>Rejected</th>';
								str+='<th>Not Processed</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result){
							str+='<tr>';
							if(result[i].fnf != null && typeof(result[i].fnf) != "undefined"){
								str+='<td style="text-align: left !important;">'+result[i].fnf+'</td>';
							}else{
								str+='<td>-</td>';
							}						
							if(result[i].total != null && result[i].total >0){
								str+='<td>'+result[i].total+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].sanctioned != null && result[i].sanctioned >0){
								str+='<td>'+result[i].sanctioned+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].eligible != null && result[i].eligible >0){
								str+='<td>'+result[i].eligible+'</td>';
							}else{
								str+='<td>-</td>';
							}
							
							if(result[i].verified_not_sanctioned != null && result[i].verified_not_sanctioned >0){
								str+='<td>'+result[i].verified_not_sanctioned+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].rejected != null && result[i].rejected >0){
								str+='<td>'+result[i].rejected+'</td>';
							}else{
								str+='<td>-</td>';
							}	
							if(result[i].not_processed != null && result[i].not_processed >0){
								str+='<td>'+result[i].not_processed+'</td>';
							}else{
								str+='<td>-</td>';
							}
							str+='</tr>';
						}
						str+='</tbody>';
					str+='</table>';				
				str+='</div>';
				str+='<ul class="list-inline m_top10 switch-btn pull-right financialNonfinancialCls" role="tabCummulative" style="margin-bottom: 10px;">';
					for(var i in result){          
					  if(i==0){
						str+='<li class="active " attr_fnf="'+i+'_'+sourceId+'" style="font-size:12px !important;">'+result[i].fnf+'</li>';
					  }else{
						str+='<li attr_fnf="'+i+'_'+sourceId+'" style="font-size:12px !important;">'+result[i].fnf+'</li>';
					  }
					}
				str+='</ul>';
		
			
				for(var i in result){   
					if(i==0){
						str+='<div class="row  ulfnfclass" id="fnf_'+i+'_'+sourceId+'" >';
					}else{
						str+='<div class="row  ulfnfclass" id="fnf_'+i+'_'+sourceId+'" style="display:none;">';
					}
						 str+='<div class="custom_ul">';
							str+='<ul class="list-inline custom_li">';
								str+='<li class="m_top10 border_black">';
									str+='<div class="">';
										str+='<h5 class="font_weight ">Total</h5>';
										if(result[i].total != null && result[i].total >0){
											str+='<h4 class="font_weight pad_10_10">'+result[i].total+'</h4>';
										}else{
											str+='<h4 class="font_weight pad_10_10">-</h4>';
										}
									str+='</div>';
								str+='</li>';
								str+='<li class="m_top10 border_green" >';
									str+='<div class="pad_10_10" >';
										str+='<div class="row">';
											str+='<div class="col-sm-3" >';
												str+='<h5 class="font_weight pad_10_10 good_color">Sanctioned</h5>';
												if(result[i].sanctioned != null && result[i].sanctioned >0){
													str+='<h4 class="font_weight pad_10_10">'+result[i].sanctioned +'</h4>';
													str+='<h5 class="good_color m_bottom5">'+((result[i].sanctioned*100)/result[i].total).toFixed(2)+' %</h5>';
												}else{
													str+='<h4 class="font_weight pad_10_10">-</h4>';
												}
											str+='</div>';
											str+='<div class="col-sm-3" >';
												str+='<h5 class="font_weight pad_10_10 good_color" >Eligible</h5>';
												if(result[i].eligible != null && result[i].eligible >0){
													str+='<h4 class="font_weight pad_10_10">'+result[i].eligible+'</h4>';
													str+='<h5 class="good_color m_bottom5">'+((result[i].eligible*100)/result[i].total).toFixed(2)+' %</h5>';
												}else{
													str+='<h4 class="font_weight pad_10_10">-</h4>';
												}
											str+='</div>';
											str+='<div class="col-sm-3" >';
												str+='<h5 class="font_weight pad_10_10 clr_warning" >Verified Not Sanc.</h5>';
												if(result[i].verified_not_sanctioned != null && result[i].verified_not_sanctioned >0){
													str+='<h4 class="font_weight pad_10_10">'+result[i].verified_not_sanctioned+'</h4>';
													str+='<h5 class="clr_warning m_bottom5">'+((result[i].verified_not_sanctioned*100)/result[i].total).toFixed(2)+' %</h5>';
												}else{
													str+='<h4 class="font_weight pad_10_10">-</h4>';
												}
											str+='</div>';
											str+='<div class="col-sm-3" >';
												str+='<h5 class="font_weight pad_10_10 good_color">Rejected</h5>';
												if(result[i].rejected != null && result[i].rejected >0){
													str+='<h4 class="font_weight pad_10_10">'+result[i].rejected+'</h4>';
													str+='<h5 class="good_color m_bottom5">'+((result[i].rejected*100)/result[i].total).toFixed(2)+' %</h5>';
												}else{
													str+='<h4 class="font_weight pad_10_10">-</h4>';
												}
											str+='</div>';
								str+='</li>';
								str+='<li class="m_top10 border_red">';
									str+='<h5 class="font_weight pad_10_10 bad_color">Not Processed</h5>';
									if(result[i].not_processed != null && result[i].not_processed >0){
										str+='<h4 class="font_weight pad_10_10">'+result[i].not_processed+'</h4>';
										str+='<h5 class="bad_color m_bottom5">'+((result[i].not_processed*100)/result[i].total).toFixed(2)+' %</h5>';
									}else{
										str+='<h4 class="font_weight pad_10_10">-</h4>';						
									}								
								str+='</li>';
							str+='</ul>';
						str+='</div>'; 	
							for(var j in result[i].subList){
								str+='<div class="col-sm-12">';
									str+='<h4 class="font_weight m_top10">'+result[i].subList[j].type+'</h4>';
								str+='</div>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="col-sm-2 m_top10">';
											str+='<div class="white-block box_shadow_grievance pad_10_10">';
												str+='<h5 class="text-center m_top10">Total</h5>';
												str+='<h4 class="font_weight m_top10 text-center" style="margin-bottom:25px;">'+result[i].subList[j].total+'</h4>';
											str+='</div>';
										str+='</div>';
										str+='<div class="col-sm-8 m_top10">';
										str+='<div class="white-block box_shadow_grievance pad_10_10">';
											str+='<div class="row">';
												str+='<div class="col-sm-3 m_top10">';											
														str+='<h5 class="text-center good_color">Sanctioned</h5>';
														str+='<h4 class="font_weight m_top10 text-center">'+result[i].subList[j].sanctioned+'</h4>';
														str+='<h5 class="good_color m_bottom5 text-center ">'+((result[i].subList[j].sanctioned*100)/result[i].subList[j].total).toFixed(2)+' %</h5>';
												str+='</div>';
												str+='<div class="col-sm-3 m_top10">';
													//str+='<div class="white-block box_shadow_grievance pad_10_10">';
														str+='<h5 class="text-center good_color">Eligible</h5>';
														str+='<h4 class="font_weight m_top10 text-center">'+result[i].subList[j].eligible+'</h4>';
														str+='<h5 class="good_color m_bottom5 text-center">'+((result[i].subList[j].eligible*100)/result[i].subList[j].total).toFixed(2)+'%</h5>';
													//str+='</div>';
												str+='</div>';										
												str+='<div class="col-sm-3 m_top10 ">';
													//str+='<div class="white-block box_shadow_grievance pad_10_10">';
														str+='<h5 class="text-center clr_warning">Verified Not Sanc.</h5>';
														str+='<h4 class="font_weight m_top10 text-center">'+result[i].subList[j].verified_not_sanctioned+'</h4>';
														str+='<h5 class="clr_warning m_bottom5 text-center">'+((result[i].subList[j].verified_not_sanctioned*100)/result[i].subList[j].total).toFixed(2)+' %</h5>';
													//str+='</div>';
												str+='</div>';										
												str+='<div class="col-sm-3 m_top10">';
													//str+='<div class="white-block box_shadow_grievance pad_10_10">';
														str+='<h5 class="text-center good_color">Rejected</h5>';
														str+='<h4 class="font_weight m_top10 text-center">'+result[i].subList[j].rejected+'</h4>';
														str+='<h5 class="good_color m_bottom5 text-center">'+((result[i].subList[j].rejected*100)/result[i].subList[j].total).toFixed(2)+' %</h5>';
													//str+='</div>';
												str+='</div>';
											str+='</div>';
										str+='</div>';
										str+='</div>';
										str+='<div class="col-sm-2 m_top10">';
											str+='<div class="white-block box_shadow_grievance pad_10_10">';
												str+='<h5 class="text-center m_top10 bad_color">Not Processed</h5>';
												str+='<h4 class="font_weight m_top10 text-center">'+result[i].subList[j].not_processed+'</h4>';
												str+='<h5 class="bad_color m_bottom5 text-center">'+((result[i].subList[j].not_processed*100)/result[i].subList[j].total).toFixed(2)+' %</h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
								
							}	
							
					str+='</div>';	
				}
			
		str+='</div>';
	str+='</div>';
	$("#"+divId).html(str);
}
function buildlevelWiseTopGrievanceDetails(divId,blockType,globaldeptIds){	
//alert(2);
	var locationArr = ["Top"];
	
	var collapse='';
	for(var i in locationArr){
		collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+locationArr[i]+'">';
				if(i == 0){
					collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+locationArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}else{
					collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+locationArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}	if(blockType == "location"){
						collapse+='<h4 class="panel-title text-capital">'+locationArr[i]+' level overview</h4>';
					}else if(blockType == "officer"){
						collapse+='<h4 class="panel-title text-capital">'+locationArr[i]+' level Officers overview</h4>';
					}else{
						collapse+='<h4 class="panel-title text-capital">'+locationArr[i]+' Grievances overview</h4>';
					}					
					collapse+='</a>';
				collapse+='</div>';
				
				if(i == 0){
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}else{
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';
							collapse+='<div class="col-sm-12">';
								collapse+='<div id="'+divId.replace(/\s+/g, '')+'DivId"></div>';
							collapse+='</div>';
						collapse+='</div>';
						
						//console.log(divId.replace(/\s+/g, '')+''+locationArr[i]+''+blockType);
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';		
	}
	$("#topGrievanceTableViewDetailsDivId").html(collapse);
	getTopGrievianceDetails(allSourceIds,globaldeptIds,globalTop);
	
}

function buildlevelWiseGrievanceDetails(divId,blockType,globaldeptIds){	
//alert(2);
	var locationArr =["State","District","Constituency","Mandal"];
	
	var collapse='';
	for(var i in locationArr){
		collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+locationArr[i]+'">';
				if(i == 0){
					collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+locationArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}else{
					collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+locationArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}	if(blockType == "location"){
						collapse+='<h4 class="panel-title text-capital">'+locationArr[i]+' level overview</h4>';
					}else if(blockType == "officer"){
						collapse+='<h4 class="panel-title text-capital">'+locationArr[i]+' level Officers overview</h4>';
					}else{
						collapse+='<h4 class="panel-title text-capital">'+locationArr[i]+' Grievances overview</h4>';
					}					
					collapse+='</a>';
				collapse+='</div>';
				
				if(i == 0){
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}else{
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';
							collapse+='<div class="col-sm-12">';
								collapse+='<div id="'+divId.replace(/\s+/g, '')+''+locationArr[i]+''+blockType+'"></div>';
							collapse+='</div>';
						collapse+='</div>';
						//console.log(divId.replace(/\s+/g, '')+''+locationArr[i]+''+blockType);
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';		
	}
	$("#locationGrievanceTableViewDetailsDivId").html(collapse);
	
	for(var j in locationArr){
		getLocationWiseGrieviancesCount(allSourceIds,globaldeptIds,"",locationArr[j]);	
	}
	
}
function getTopGrievianceDetails(sourceId,globaldeptIds,topper){	
	$("#topGrievanceDivId").html(spinner);
	var json={
		fromDate:currentFromDate,
		toDate:currentToDate,		
		departmentId: globaldeptIds,
		sourceId: sourceId,
		topper: topper
	}
	$.ajax({                
	type:'POST',    
	url: 'getTopGrievianceDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildcTopGrievianceDetails(result,sourceId);
		}else{
			$("#topGrievanceDivId").html("No Data Available");
		}
	});
}
function buildcTopGrievianceDetails(result,sourceId){	
	var tableView ='';
	tableView+='<div class="pad_border m_top20 apita_customSlider" style="background-color:#ddd3;">';
		tableView+='<div class="row">';
			tableView+='<div class="col-sm-12">';
				tableView+='<div class="col-sm-10 m_top10">';
					tableView+='<input class="apita_customSlider" id="topGrievanceSlider" type="text" style="width:100% !important;">';
				tableView+='</div>';	
				tableView+='<div class="col-sm-2">';
					tableView+='<button class="btn btn-primary btn-sm" id="topGrievanceSubmit" attr_SourceId="'+sourceId+'">Submit</button>';
				tableView+='</div>';	
			tableView+='</div>';	
		tableView+='</div>';	
	tableView+='</div>';	
	tableView+='<div class="col-sm-12 m_top20">';
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered table_custom_SC" id="topGrievancedataTable">';
			tableView+='<thead>';
				tableView+='<tr>';
					tableView+='<th>Issue Name</th>';
					tableView+='<th>Dept</th>';
					tableView+='<th>Dependancy</th>';
					tableView+='<th>Type</th>';
					tableView+='<th>Total</th>';
					tableView+='<th>Sanctioned</th>';
					tableView+='<th>Eligible</th>';
					tableView+='<th>Verified Not Sanctioned</th>';
					tableView+='<th>Rejected</th>';
					tableView+='<th>Not Processed</th>';
				tableView+='</tr>';
			tableView+='</thead>';
			tableView+='<tbody>';
				for(var i in result){
					tableView+='<tr>';
					if(result[i].issueName != null && result[i].issueName.length >0){
						tableView+='<td style="text-align:left !important;">'+result[i].issueName +'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].deptName != null && result[i].deptName.length >0){
						tableView+='<td>'+result[i].deptName +'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].fnf != null && result[i].fnf.length >0){
						tableView+='<td>'+result[i].fnf +'</td>';
					}else{
						tableView+='<td>-</td>';
					}					
					if(result[i].type != null && result[i].type.length >0){
						tableView+='<td>'+result[i].type +'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].total != null && result[i].total >0){
						tableView+='<td>'+result[i].total +'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].sanctioned != null && result[i].sanctioned >0){
						tableView+='<td class="good_color">'+result[i].sanctioned +'</td>';
					}else{
						tableView+='<td class="good_color">-</td>';
					}	
					if(result[i].eligible != null && result[i].eligible >0){
						tableView+='<td class="good_color">'+result[i].eligible +'</td>';
					}else{
						tableView+='<td class="good_color">-</td>';
					}
					if(result[i].verified_not_sanctioned != null && result[i].verified_not_sanctioned >0){
						tableView+='<td class="good_color">'+result[i].verified_not_sanctioned +'</td>';
					}else{
						tableView+='<td class="good_color">-</td>';
					}
					if(result[i].rejected != null && result[i].rejected >0){
						tableView+='<td class="good_color">'+result[i].rejected +'</td>';
					}else{
						tableView+='<td class="good_color">-</td>';
					}	
					if(result[i].not_processed != null && result[i].not_processed >0){
						tableView+='<td class="bad_color">'+result[i].not_processed +'</td>';
					}else{
						tableView+='<td class="bad_color">-</td>';
					}
				tableView+='</tr>';
				}
				
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	tableView+='</div>';	
	$("#topGrievanceDivId").html(tableView);
	$("#topGrievancedataTable").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]]
	});
	$("#topGrievanceSlider").slider({
	min :0,
	max : 100,
	step: 1,
	value: globalTop,
	tooltip: 'always',
	formatter: function(value) {
		//console.log(value);
		return value;
	}
	});
}

function getLocationWiseGrieviancesCount(allSourceIds,globaldeptIds,locationValue,locationType){	
	$("#grievance"+locationType+"location").html(spinner);
	var json={
		fromDate:currentFromDate,
		toDate:currentToDate,		
		departmentId: globaldeptIds,
		sourceId: allSourceIds,
		locationValue: locationValue,
		locationType: locationType
	}
	$.ajax({                
	type:'POST',    
	url: 'getLocationWiseGrieviancesCount',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildLocationWiseGrieviancesCount(result,locationType);
		}else{
		$("#grievance"+locationType).html('NO DATA AVLABLE');	
		}
	});
}

function buildLocationWiseGrieviancesCount(result,locationType){
	var tableView ='';
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered table_custom_SC" id ="dataTable_'+locationType+'location">';
			tableView+='<thead>';
				tableView+='<tr>';
					tableView+='<th rowspan="2">'+locationType+'</th>';
					tableView+='<th colspan="6">Total Grievances</th>';
					for(var k in result[0].subList){
						tableView+='<th colspan="6">'+result[0].subList[k].fnf+'</th>';
					}
				tableView+='</tr>';
				tableView+='<tr>';
					tableView+='<th>Total</th>';
					tableView+='<th class="">Sanctioned</th>';
					tableView+='<th class="">Eligible</th>';
					tableView+='<th class="">Verified Not Sanctioned</th>';
					tableView+='<th class="">Rejected</th>';
					tableView+='<th class="">Not Processed</th>';
				for(var i in result[0].subList){
					tableView+='<th>Total</th>';
					tableView+='<th class="">Sanctioned</th>';
					tableView+='<th class="">Eligible</th>';
					tableView+='<th class="">Verified Not Sanctioned</th>';
					tableView+='<th class="">Rejected</th>';
					tableView+='<th class="">Not Processed</th>';
				}
				tableView+='</tr>';
			tableView+='</thead>';
			tableView+='<tbody>';
				for(var i in result){
					tableView+='<tr>';
					if(result[i].location != null && result[i].location.length >0){
							tableView+='<td style="text-align:left !important;">'+result[i].location+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].total != null && result[i].total >0){
							tableView+='<td >'+result[i].total+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].sanctioned != null && result[i].sanctioned >0){
						tableView+='<td class="good_color">'+result[i].sanctioned+'</td>';
					}else{
						tableView+='<td class="good_color">-</td>';
					}
					if(result[i].eligible != null && result[i].eligible >0){
						tableView+='<td class="good_color">'+result[i].eligible+'</td>';
					}else{
						tableView+='<td class="good_color">-</td>';
					}
					if(result[i].verified_not_sanctioned != null && result[i].verified_not_sanctioned >0){
						tableView+='<td class="good_color">'+result[i].verified_not_sanctioned+'</td>';
					}else{
						tableView+='<td class="good_color">-</td>';
					}
					
					if(result[i].rejected != null && result[i].rejected >0){
						tableView+='<td class="good_color">'+result[i].rejected+'</td>';
					}else{
						tableView+='<td class="good_color">-</td>';
					}
					if(result[i].not_processed != null && result[i].not_processed >0){
						tableView+='<td class="bad_color">'+result[i].not_processed+'</td>';
					}else{
						tableView+='<td class="bad_color">-</td>';
					}
					for(var j in result[i].subList){
						if(result[i].subList[j].total != null && result[i].subList[j].total >0){
							tableView+='<td>'+result[i].subList[j].total+'</td>';
						}else{
							tableView+='<td>-</td>';
						}
						if(result[i].subList[j].sanctioned != null && result[i].subList[j].sanctioned >0){
							tableView+='<td class="good_color">'+result[i].subList[j].sanctioned+'</td>';
						}else{
							tableView+='<td class="good_color">-</td>';
						}
						if(result[i].subList[j].eligible != null && result[i].subList[j].eligible >0){
							tableView+='<td class="good_color">'+result[i].subList[j].eligible+'</td>';
						}else{
							tableView+='<td class="good_color">-</td>';
						}
						if(result[i].subList[j].verified_not_sanctioned != null && result[i].subList[j].verified_not_sanctioned >0){
							tableView+='<td class="good_color">'+result[i].subList[j].verified_not_sanctioned+'</td>';
						}else{
							tableView+='<td class="good_color">-</td>';
						}
						
						if(result[i].subList[j].rejected != null && result[i].subList[j].rejected >0){
							tableView+='<td class="good_color">'+result[i].subList[j].rejected+'</td>';
						}else{
							tableView+='<td class="good_color">-</td>';
						}
						if(result[i].subList[j].not_processed != null && result[i].subList[j].not_processed >0){
							tableView+='<td class="bad_color">'+result[i].subList[j].not_processed+'</td>';
						}else{
							tableView+='<td class="bad_color">-</td>';
						}
					}
					tableView+='</tr>';
				}
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	
	$("#grievance"+locationType+"location").html(tableView);
	if(locationType !='State'){
		$("#dataTable_"+locationType+"location").dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"order": [ 0, 'asc' ],
			"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			"aLengthMenu": [[15, 20, 25, -1], [15, 20, 25, "All"]],
			buttons: [
				{
					extend		:'csvHtml5',
					text		:'<i class="fa fa-file-text-o"></i>',
					titleAttr	: 'CSV',
					title		:  "Grievance DASHBOARD",
					filename	:  locationType+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}
}
$(document).on("click","#topGrievanceSubmit",function(){
	console.log($("#topGrievanceSlider").val());
	var source_ID=$(this).attr("attr_SourceId");
	//var topValue = "";
	globalTop = parseInt($("#topGrievanceSlider").val());
	console.log(globalTop);
	getTopGrievianceDetails(source_ID,globaldeptIds,globalTop);
});
function buildHodsJson(){
$("#deptHODId").html(""); 	
 deptJson=[];
  var prObj={    
      departmentName:"PR",
      hodList:[{hodId:"100082",hodName:"COMMISSIONER, PANCHAYATHI RAJ"},
      {hodId:"100083",hodName:"ENGINEERING WING, PANCHAYITHI RAJ"}]
    }; 
  var rwsObj={
      departmentName:"RWS",
      hodList:[{hodId:"100081",hodName:"RURAL WATER SUPPLY"}]
    }; 
  var rdObj={
      departmentName:"RD",
      hodList:[{hodId:"100072",hodName:"COMISSIONARATE OF RURAL DEVELOPMENT"},
      {hodId:"100073",hodName:"SOCIETY FOR ELIMINATION OF RURAL POVERTY"},
      {hodId:"100074",hodName:"NATIOANAL RURAL EMPLOYMENT GUARANTEE SCHEME"}]
    }; 
  var itecObj={
      departmentName:"ITEC",
      hodList:[{hodId:"100331",hodName:"MEESEVA"},
      {hodId:"100332",hodName:"Andhra Pradesh Technology Services Limited"},{hodId:"100333",hodName:"AP INFORMATION TECHNOLOGY ACADEMY / INSTITUTE OF ECONOMIC GROWTH"},
      {hodId:"100334",hodName:"Society for AP Network"},{hodId:"100335",hodName:"AP Electronics & Information Technology Society"},{hodId:"100336",hodName:"AP Innovation Society"}]
   };
   
   if(getDeptHodsArr !=null && getDeptHodsArr.length>0){
	   for(var i in getDeptHodsArr){
		   if(getDeptHodsArr[i] == "PR"){
			   deptJson.push(prObj);
		   }else if(getDeptHodsArr[i] == "RWS"){
			   deptJson.push(rwsObj);
		   }else if(getDeptHodsArr[i] == "RD"){
			   deptJson.push(rdObj);
		   }else if(getDeptHodsArr[i] == "ITEC"){
			   deptJson.push(itecObj);
		   }else if(getDeptHodsArr[i] == "all"){
				deptJson.push(prObj);
				deptJson.push(rwsObj);
				deptJson.push(rdObj);
				deptJson.push(itecObj);
		   }
	   }
   }else{
	    deptJson.push(prObj);
		deptJson.push(rwsObj);
		deptJson.push(rdObj);
		deptJson.push(itecObj);
   }
   
  $("#deptHODId").append("<option value='0' selected>All</option>");
 	if(deptJson != null && deptJson.length >0){
		for(var i in deptJson){
			for(var j in deptJson[i].hodList){ 
				$("#deptHODId").append("<option value="+deptJson[i].hodList[j].hodId+">"+deptJson[i].hodList[j].hodName+"</option>");
				if(j==0 && i==0){
					globaldeptIds=deptJson[i].hodList[j].hodId;
				}else{
					globaldeptIds=globaldeptIds+","+deptJson[i].hodList[j].hodId
				}
				
			}
		}
	}
	$("#deptHODId").trigger("chosen:updated"); 
	console.log(" first call");
	console.log(globaldeptIds);
	onloadCalls();
}
var departmentArrGlob =[];
	departmentArrGlob.push("0");
	$(document).on("change","#deptHODId",function(){//ara1
	 	values = $(this).val();//debugger;
		if(values != null && values.length > 0){
			for(var i=0; i<values.length; i++) {
			//console.log(values[i]+" -- "+financialArrGlob+" -- "+$.inArray(values[i], financialArrGlob));
				if($.inArray(values[i], departmentArrGlob) == -1){
					if(values[i] == 0){values=[];values.push("0");
						$('#deptHODId').find($('option')).attr('selected',false)
						$("#deptHODId").val(0);
						$("#deptHODId").trigger('chosen:updated');
						departmentArrGlob = [];
						departmentArrGlob.push("0");
					}else{
						$('#deptHODId option:selected').each(function (index, option) { 							
							if($(this).val()==0){
								$(option).attr('selected',false); 
								$("#deptHODId").trigger('chosen:updated');
							}
							departmentArrGlob=[];
							departmentArrGlob.push($(this).val());
						});
					}
				}
				
			 }
		}
		
});
getLocationWiseGrievanceDetails();
//clicks
function getLocationWiseGrievanceDetails(){	
	//$("#grievance"+locationType+"location").html(spinner);
	var json={
		fromDate:currentFromDate,
		toDate:currentToDate,		
		departmentId: globaldeptIds,
		sourceId: allSourceIds,
		distcrictCode:"1",
		locationName:"MACHILIPATNAM",
		status:"Elgible",
		type:"financialComm"
	}
	$.ajax({                
	type:'POST',    
	url: 'getLocationWiseGrievanceDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			
		}else{
		//$("#grievance"+locationType).html('NO DATA AVLABLE');	
		}
	});
}
