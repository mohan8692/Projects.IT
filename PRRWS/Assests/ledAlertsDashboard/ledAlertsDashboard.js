var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var glTotalValue;
var glTotalAlerts=0;
var locationWiseArr = ['District', 'Constituency', 'Mandal'];
//var currentFromDate=moment().format("DD-MM-YYYY");
var currentFromDate= moment().subtract(3, 'years').startOf('year').format("DD-MM-YYYY");
var currentToDate=moment().format("DD-MM-YYYY");

var glChange="";
var glyearData = moment().format("YYYY");
var glmonthData = moment().format("MM");
var monthNames = {'01':'Jan', '02':'Feb', '03':'Mar', '04':'Apr', '05':'May', '06':'Jun', '07':'Jul', '08':'Aug', '09':'Sep', '10':'Oct', '11':'Nov', '12':'Dec'};
var glDeptId = 73;

var url = window.location.href;
var wurl = url.substr(0,(url.indexOf(".com")+4));
if(wurl.length == 3)
	wurl = url.substr(0,(url.indexOf(".in")+3));
	wurl = "http://mytdp.com/"
onloadCalls();
function onloadCalls() {
	//$(".select-chosen").chosen();
	getLedDashBoardOverview("onLOad",'o',0);
	setTimeout(function(){
		$("#monthPicker").val(glmonthData);
		getLedStatusDetailsInfo('o',0,"Overall");
		getLedAlertLifeCycleAnalysisDetailsInfo("alertlife",'o',0,"Overall");
		getLedTimeLineAnalysisDetailsInfo("weekly",'o',0,"Overall");
		locationWiseData();
	}, 3000);
}
$("#dateRangePicker").daterangepicker({
	opens: 'left',
	startDate: currentFromDate,
	endDate: currentToDate,
	locale: {
	  format: 'DD-MM-YYYY'
	},
	ranges: {
	   'Today' : [moment(), moment()],
	   'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
	   'This Month': [moment().startOf('month'),moment()],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	   'This Year': [moment().startOf('Year'), moment()],
	   'Last 1 Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
	   'OverAll':['01-01-2015', moment()]
	}
});
var dates= $("#dateRangePicker").val();
var pickerDates = currentFromDate+' - '+currentToDate
if(dates == pickerDates)
{
	$("#dateRangePicker").val('OverAll');
}
$('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
	currentFromDate = picker.startDate.format('DD-MM-YYYY');
	currentToDate = picker.endDate.format('DD-MM-YYYY');
	if(picker.chosenLabel == 'OverAll')
	{
		$("#dateRangePicker").val('OverAll');
	}
	onloadCalls();
	$("#monthPicker").hide();
	$(".statusCheckedCls").prop("checked",true);
});
var defaultYear = "2018"
$("#yearRangePicker").datetimepicker({
	defaultDate: moment(defaultYear,"YYYY"),
	format: 'YYYY',	
	viewMode:'months',
});
function getLedDashBoardOverview(callType,category,id){
	glTotalAlerts = 0;
	if(callType != "onClick"){
		$("#overallLEDListId").html(spinner);
	}else{
		$("#overallLedStatusListId").html(spinner);
		$("#statusOverviewListId").html(spinner);
		$("#ledAlertsChartId").html(spinner);
	}
	var json={
		
	}
	$.ajax({                
	type:'GET', 
	url: wurl+"/WebService/getLedDashBoardViewInfo/"+currentFromDate+"/"+currentToDate+"/"+category+"/"+id+"/"+glDeptId+"",	
	//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getLedDashBoardViewInfo/"+currentFromDate+"/"+currentToDate+"/"+category+"/"+id+"/"+glDeptId+"",
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			if(callType != "onClick"){
				buildLedDashBoardOverview(result,category);
			}else{
				buildAlertChart(result,"ledAlertsChartId");
			}
		} else {
			$(".overallLEDListId").html("NO DATA AVAILABLE");
		}
	});
}
function buildLedDashBoardOverview(result,category){
	var str='';
	var str1='';
	var alertImg = {'Print Media':'print_media_alert_icon','EESL':'ESSL_alerts','NREDCAP':'NREDCAP_alerts','Electronic Media':'electronic_media_alert_icon','Call Center':'call_center_icon'};
	str+='<div class="panelCls pad_10">';
		str+='<div class="row">';
			str+='<div class="col-sm-3 pad_rgt4">';
				str+='<div class="pad_light_yash_bg border_yash">';
					str+='<ul class="nav nav-tabs overallNav">';
						str+='<li class="active tabsClickCls" attr_tab_name="Overall" attr_tab_id="0" attr_category="o">';
							str+='<a data-toggle="tab" href="#Overall">';
								str+='<div class="row">';
									str+='<div class="col-sm-9">';
										str+='<div class="media">';
											str+='<div class="media-left">';
												str+='<img src="Assests/images/overall_alerts.png" class="media-object" style="width: 45px;">';
											str+='</div>';
											str+='<div class="media-body text-center">';
												str+='<h6 class="media-heading font_weight">OVERALL</h6>';
												str+='<h4 class="media-heading font_weight m_top10 totalCountCls" id="overallCountId"></h4>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<i class="fa fa-angle-right pull-right m_top15" aria-hidden="true"></i>';
									str+='</div>';
								str+='</div>';
							str+='</a>';	
						str+='</li>';
						for(var i in result.subList1) {
							glTotalAlerts = glTotalAlerts + result.subList1[i].alertCnt;
							str+='<li class="tabsClickCls" attr_tab_name="'+result.subList1[i].name+'" attr_tab_id="'+result.subList1[i].id+'" attr_category="'+result.subList1[i].category+'">';
								str+='<a data-toggle="tab" href="#'+result.subList1[i].name.replace(/\s+/g, '')+'">';
									str+='<div class="row">';
										str+='<div class="col-sm-9">';
											str+='<div class="media">';
												str+='<div class="media-left">';
													str+='<img src="Assests/images/'+alertImg[result.subList1[i].name]+'.png" class="media-object" style="width: 45px;">';
												str+='</div>';
												str+='<div class="media-body text-center">';
													str+='<h6 class="media-heading font_weight text-capital">'+result.subList1[i].name+'</h6>';
													str+='<h4 class="media-heading font_weight m_top10"><span class="totalCountCls">'+result.subList1[i].alertCnt+'</span> <span class="text-success font_12">'+result.subList1[i].percentage+'%</span></h4>';
												str+='</div>';
											str+='</div>';
										str+='</div>';
										str+='<div class="col-sm-3">';
											str+='<i class="fa fa-angle-right pull-right m_top15" aria-hidden="true"></i>';
										str+='</div>';
									str+='</div>';
								str+='</a>';
							str+='</li>';
						}
					str+='</ul>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-9 pad_left4">';
				str+='<div class="pad_light_yash_bg border_yash">';
					//str+='<div class="white-block border_yash" style="padding:10px 0px;">';
						/*str+='<div class="tab-content">';
							str+='<div class="row">';
								str+='<div class="col-sm-12">';*/
									str+='<div id="overallLedStatusListId"></div>';
								/*str+='</div>';
							str+='</div>';
						str+='</div>';*/
					//str+='</div>';
				str+='</div>';
				str+='<div id="statusOverviewListId"></div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	str+='<div class="panelCls pad_10 m_top20">';
		str+='<div class="row">';
			str+='<div class="col-sm-12">';
				str+='<div class="border_yash">';
					str+='<div id="ledAlertsChartId" style="height:300px"></div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';	
	
	str1+='<ul class="list-inline m_top10 pad_10 border_yash" style="background-color:#E0E2E2;">';
		str1+='<li>';
			str1+='<label class="checkbox-inline selectAllClk"><input class="selectAllBoxChk" type="checkbox" id="selectAllInputId" value="" checked>Select All</label>';
		str1+='</li>';
		for(var i in result.list) {
			str1+='<li class="margin_left">';
				str1+='<label class="checkbox-inline"><input class="checkBoxCls" type="checkbox" value="'+result.list[i].name+'" checked>'+result.list[i].name+' <a class="toolTipCls" data-placement="right" data-toggle="tooltip" title="'+result.list[i].address+'"><i class="fa fa-info-circle font_10" aria-hidden="true" style="color:#D50667"></i></a></label>';
			str1+='</li>';
		}
	str1+='</ul>';
	
	$("#overallLEDListId").html(str);
	$("#checkBoxStatusId").html(str1);
	$("#overallCountId").html(glTotalAlerts);
	$(".toolTipCls").tooltip();
	//for(var i in result.list) {
		buildAlertChart(result,"ledAlertsChartId",category);
	//}
}
function buildAlertChart(result,divId,category) {
	var str='';
	var str1='';
	var totalDiscommAlerts = 0;
	var totalCcmsAlerts = 0;
	var nameClr = {'MM':'#9B0000','SI':'#A26B21','CF':'#808100','OT':'#008081','NS':'#000082','NI':'#FF0000','LV':'#FF9A00','HV':'#3875DB','LO':'#000000'};
	var bgClr = {'pending':'#F15559','Action In Progress':'#FEB3B0','Reopen':'#E47C7B','Closed':'#56D58E','Completed':'#029E4A','proposal':'#C57070'};
	
		str+='<div class="row">';
			str+='<div class="col-sm-5 pad_rgt4">';
				str+='<div class="row">';
					str+='<div class="col-sm-6 pad_rgt4">';
						str+='<div class="pad_10 text-center border_yash bg_E9" style="height:109px;">';
							str+='<h5 class="font_weight m_top15">TOTAL</h5>';
							str+='<h4 class="font_weight m_top10" id="totalCountListId"></h4>';
						str+='</div>';
					str+='</div>';
					for(var i in result.list) {
						if(result.list[i].type == "Street Light") {
							str+='<div class="col-sm-6 pad_left4">';
								str+='<div class="panel panel-default mb_0" style="border-radius:0px; background-color:#F3F1F2">';
									str+='<div class="panel-heading bg_E9 pad_5"><h5 class="text-capital">'+result.list[i].type+' - '+result.list[i].alertCnt+'</h5></div>';
									str+='<div class="panel-body pad_5">';
										str+='<div class="white-block border_yash border_relative_block streetLight" style="padding:15px 5px;">';
											str+='<h5 class="font_weight"><span style="color:'+nameClr[result.list[i].name]+'">'+result.list[i].name+'</span> <span class="pull-right">'+result.list[i].alertCnt+'</span></h5>';
											str+='<h6 class="m_top10">'+result.list[i].address+' <span class="pull-right font_14">'+result.list[i].percentage+'%</span></h6>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						}
					}
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-7 pad_left4">';
				str+='<div class="panel panel-default mb_0" style="border-radius:0px; background-color:#F3F1F2">';
					str+='<div class="panel-heading bg_E9 pad_5"><h5 class="text-capital" style="color:#2224ab;">DISCOMM - <span id="discommId"></span></h5></div>';
						str+='<div class="panel-body pad_5">';
							str+='<div class="mainBlockUl">';
								str+='<ul class="blocksLi">';
								for(var i in result.list) {
									if(result.list[i].type == "Discomm") {
										totalDiscommAlerts = totalDiscommAlerts + result.list[i].alertCnt;
										str+='<li>';
											str+='<div class="white-block border_yash border_relative_block" style="padding:15px 5px;">';
												str+='<h5 class="font_weight"><span style="color:'+nameClr[result.list[i].name]+'">'+result.list[i].name+'</span> <span class="pull-right">'+result.list[i].alertCnt+'</span></h5>';
												str+='<h6 class="m_top10">'+result.list[i].address+' <span class="pull-right font_14">'+result.list[i].percentage+'%</span></h6>';
											str+='</div>';
										str+='</li>';
									}
								}
								str+='</ul>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="row m_top10">';
			str+='<div class="col-sm-12">';
				str+='<div class="panel panel-default mb_0" style="border-radius:0px; background-color:#F3F1F2">';
					str+='<div class="panel-heading bg_E9 pad_5"><h5 class="text-capital" style="color:#1A6E4C;">CCMS - <span id="ccmsId">5,000</span></h5></div>';
					str+='<div class="panel-body pad_5">';
						str+='<div class="mainBlockUl">';
							str+='<ul class="blocksLi">';
							for(var i in result.list) {
								if(result.list[i].type == "CCMS") {
									totalCcmsAlerts = totalCcmsAlerts + result.list[i].alertCnt;
									str+='<li>';
										str+='<div class="white-block border_yash border_relative_block" style="padding:15px 5px;">';
											str+='<h5 class="font_weight"><span style="color:'+nameClr[result.list[i].name]+'">'+result.list[i].name+'</span> <span class="pull-right">'+result.list[i].alertCnt+'</span></h5>';
											str+='<h6 class="m_top10">'+result.list[i].address+' <span class="pull-right font_14">'+result.list[i].percentage+'%</span></h6>';
										str+='</div>';
									str+='</li>';
								}
							}
							str+='</ul>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	
	str1+='<div class="pad_light_yash_bg border_yash m_top15">';
		str1+='<h6 class="font_weight text-capital">Status Overview</h6>';
		str1+='<div class="mainBlockUl m_top10">';
			str1+='<ul class="blocksLi">';
			for(var i in result.assignList) {
				str1+='<li>';
					str1+='<div class="panel panel-default mb_0" style="border-radius:0px; background-color:#F8F7F5;">';
						str1+='<div class="panel-heading pad_5 text-center" style="border-radius:0px; background-color:'+bgClr[result.assignList[i].name]+'">';
							str1+='<h5 class="text-capital font_weight" style="color:#fff;">'+result.assignList[i].name+'</h5>';
						str1+='</div>';
						str1+='<div class="panel-body">';
							str1+='<h5><span class="font_weight">'+result.assignList[i].count+'</span> <span class="pull-right">'+result.assignList[i].percentage+'%</h5>';
						str1+='</div>';
					str1+='</div>';	
				str1+='</li>';
			}
			str1+='</ul>';
		str1+='</div>';	
	str1+='</div>';
	$("#overallLedStatusListId").html(str);
	$("#statusOverviewListId").html(str1);
	$("#discommId").html(totalDiscommAlerts);
	$("#ccmsId").html(totalCcmsAlerts);
	if(category == "o") {
		$("#totalCountListId").html(glTotalAlerts);
	} else {
		$("#totalCountListId").html(glTotalValue);
	}
	/* var nameClr = {'MM':'#9B0000','SI':'#A26B21','CF':'#808100','OT':'#008081','NS':'#000082','NI':'#FF0000','LV':'#FF9A00','HV':'#3875DB','LO':'#000000'};
	var categoriesArr=[];
	var dataArr=[];
		str+='<div id="Overall" class="tab-pane fade in active">';
			str+='<ul class="list-inline ledAlertsSlickSlider">';
				str+='<li class="ledAlertsBor text-center m_lr10" style="background-color:#E9E9E9; height:110px;">';
					str+='<h5 class="font_weight m_top20">TOTAL</h5>';
					str+='<h4 class="font_weight m_top10" id="totalCountListId"></h4>';
				str+='</li>';
				for(var i in result.list) {
					str+='<li class="ledAlertsBor text-center m_lr10" style="height:110px;">';
						str+='<h4 class="font_weight text-danger" style="color:'+nameClr[result.list[i].name]+'">'+result.list[i].name+'</h4>';
						if(result.list[i].address != null) {
							str+='<h6 class="font_weight m_top5 text-muted f_10">'+result.list[i].address+'</h6>';
						} else {
							str+='<h6 class="font_weight m_top5 text-muted f_10">-</h6>';
						}
						str+='<h4 class="font_weight m_top10">'+result.list[i].alertCnt+'</h4>';
						str+='<h6 class="font_weight m_top5 text-success">'+result.list[i].percentage+'%</h6>';
					str+='</li>';
				}
			str+='</ul>';
		str+='</div>';
		
		str+='<div style="padding:0px 10px;">';
			str+='<div class="ledAlertsBor m_top10">';
				str+='<div id="ledAlertsChartId" style="height:300px"></div>';
			str+='</div>';
		str+='</div>';
	$("#overallLedStatusListId").html(str);
	if(category == "o") {
		$("#totalCountListId").html(glTotalAlerts);
	} else {
		$("#totalCountListId").html(glTotalValue);
	}
	
	$('.ledAlertsSlickSlider').slick({
		slide: 'li',
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: false,
		//autoplaySpeed: 2000,
		variableWidth:false,
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
		]
	}); */
	var categoriesArr=[];
	var dataArr=[];
	for(var i in result.subList2){
		var categeoriesList = result.subList2[i].date1;
		categoriesArr.push(categeoriesList);
		dataArr.push({"y":result.subList2[i].percentage,"extra":result.subList2[i].locationCnt});
	}
	$('#'+divId).highcharts({
		chart: {
			type: 'areaspline'
		},
		title: {
			text: '<h6>LED Alerts - Trending</h6>',
			align: 'left'
		},
		legend: {
			enabled: false
		},
		xAxis: {
			categories: categoriesArr,
		 },
		yAxis: {
			min:0,
			max:100,
			title: {
				text: 'percentage'
			}
		},
		tooltip: {
			 formatter: function() {
				return  (this.x)+"<br/>"+(this.point.extra)+" - "+(this.y)+"%";
			},
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			 line: {
				dataLabels: {
					enabled: true
				},
				enableMouseTracking: true
			},
			areaspline: {
				fillOpacity: 0.1
			},
			series: {
				marker: {
					fillColor: "#fff",
					lineWidth: 1,
					lineColor: '#37BC9A'
				}
			},
		},
		series: [{
			name: '',
			color: '#37BC9A',
			data: dataArr
		}]
	});
}
function locationWiseData() {
	var collapse='';
	for(var i in locationWiseArr)
	{
		collapse+='<div class="panel-group" id="accordion'+locationWiseArr[i]+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+locationWiseArr[i]+'">';
					/* if(i == 0)
					{
						collapse+='<a id="tenStar'+locationWiseArr[i]+'" role="button" class="panelCollapseIcon '+locationWiseArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+locationWiseArr[i]+'" href="#collapse'+locationWiseArr[i]+'" aria-expanded="true" aria-controls="collapse'+locationWiseArr[i]+'">';
					}else{ */
						collapse+='<a role="button" class="panelCollapseIcon collapseLocationCls'+locationWiseArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+locationWiseArr[i]+'" href="#collapse'+locationWiseArr[i]+'" aria-expanded="true" aria-controls="collapse'+locationWiseArr[i]+'">';
					//}
					 collapse+='<h4 class="panel-title text-capital">'+locationWiseArr[i]+' Wise</h4>';
						
					collapse+='</a>';
				collapse+='</div>';
				/* if(i == 0)
				{
					collapse+='<div id="collapse'+locationWiseArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+locationWiseArr[i]+'">';
				}else{ */
					collapse+='<div id="collapse'+locationWiseArr[i]+'" class="panel-collapse collapse collapseLocationInCls'+locationWiseArr[i]+'" role="tabpanel" aria-labelledby="heading'+locationWiseArr[i]+'">';
				//}
				
					collapse+='<div class="panel-body">';
						collapse+='<div id="levelWiseLEDAlerts'+locationWiseArr[i]+'"></div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	}
	$("#levelWiseLEDAlertsId").html(collapse);
	for(var i in locationWiseArr){
		getLEDLocationAndStatusDetailsInfo(locationWiseArr[i],0,"o","Overall");
	}
}
function getLEDLocationAndStatusDetailsInfo(locationTypeVal,id,categeoryType,name){
	$("#levelWiseLEDAlerts"+locationTypeVal).html(spinner);
	$(".collapseLocationCls"+locationTypeVal).removeClass("collapsed");
	$(".collapseLocationInCls"+locationTypeVal).addClass("in");
	var selectFilterArr =[];
	if(name == "EESL" || name == "NREDCAP" || name == "Overall") {
		$(".checkBoxCls").each(function () {
			if($(this).is(":checked")){
				selectFilterArr.push($(this).val());
			}
		});
		if(selectFilterArr.length > 0){
			selectFilterArr=selectFilterArr;
		}else{
			selectFilterArr =["''"];
		}
	} else {
		selectFilterArr =["''"];
	}
	var json={
		
	}
	$.ajax({                
	type:'GET',    
	url:  wurl+"/WebService/getLEDLocationAndStatusDetailsInfo/"+currentFromDate+"/"+currentToDate+"/Status/"+locationTypeVal+"/"+id+"/"+glDeptId+"/"+categeoryType+"/"+selectFilterArr+"",
	//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getLEDLocationAndStatusDetailsInfo/"+currentFromDate+"/"+currentToDate+"/Status/"+locationTypeVal+"/"+id+"/"+glDeptId+"/"+categeoryType+"/"+alertCodeType,
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){ 
		if(result !=null){
			buildLEDLocationAndStatusDetailsInfo(result,locationTypeVal,id,categeoryType,name);
		} else {
			$("#levelWiseLEDAlerts"+locationTypeVal).html('NO DATA AVAILABLE');
		}
	});
}
function buildLEDLocationAndStatusDetailsInfo(result,locationTypeVal,id,categeoryType,name){
	var str='';
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_default" id="'+locationTypeVal+'DataTable">';
			str+='<thead>';
				str+='<tr>';
				if(locationTypeVal == "District") {
					str+='<th>District Name</th>';
				} else if(locationTypeVal == "Constituency") {
					str+='<th>Constituency Name</th>';
				} else {
					str+='<th>Mandal Name</th>';
				}
					str+='<th>Overall</th>';
					for(var i in result[0].voList) {
						if(result[0].voList[i].districtName != "Pending") {
							str+='<th>'+result[0].voList[i].districtName+'</th>';
							str+='<th>%</th>';
						}
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				str+='<tr>';
					str+='<td>'+result[i].districtName+'</td>';
					if(result[i].count != null && result[i].count != 0) {
						str+='<td class="ledAlertsModalClkCls" block_type="locationWise" attr_head_id="'+result[i].districtName+'" attr_name="'+name+'" attr_type="'+locationTypeVal+'" attr_dist_id="'+result[i].districtId+'" attr_category_id="'+id+'" attr_category_type="'+categeoryType+'" attr_status_id="0" attr_start_index="0" attr_end_index="10" style="cursor:pointer;"><a>'+result[i].count+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					for(var j in result[i].voList) {
						if(result[i].voList[j].districtName != "Pending") {	
							if(result[i].voList[j].count != null && result[i].voList[j].count != 0) {
								str+='<td class="ledAlertsModalClkCls" block_type="locationWise" attr_head_id="'+result[i].districtName+'" attr_name="'+name+'" attr_type="'+locationTypeVal+'" attr_dist_id="'+result[i].districtId+'" attr_category_id="'+id+'" attr_category_type="'+categeoryType+'" attr_status_id="'+result[i].voList[j].districtId+'" attr_start_index="0" attr_end_index="10" style="cursor:pointer;"><a>'+result[i].voList[j].count+'</td>';
							} else {
								str+='<td>-</td>';
							}
							if(result[i].voList[j].percentage != null && result[i].voList[j].percentage != 0) {
								str+='<td class="text-success">'+result[i].voList[j].percentage+'</td>';
							} else {
								str+='<td>-</td>';
							}
						}
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#levelWiseLEDAlerts"+locationTypeVal).html(str);
	if(locationTypeVal != "District") {
		$("#"+locationTypeVal+'DataTable').dataTable({
			"paging":   true,
			"info":     true,
			"searching": true,
			"autoWidth": true,
			"iDisplayLength": 10,
			"aaSorting": [[ 5, "desc" ]], 
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			"scrollX":true,
			"fixedColumns":{ "leftColumns":1},
		});
	} else {
		$("#"+locationTypeVal+'DataTable').dataTable({
			"paging":   false,
			"info":     false,
			"searching": true,
			"autoWidth": false,
			"iDisplayLength": 15,
			"aaSorting": [[ 5, "desc" ]], 
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			"scrollX":true,
			"fixedColumns":{ "leftColumns":1},
		});
	}
	$(".collapseLocationCls"+locationTypeVal).addClass("collapsed");
	$(".collapseLocationInCls"+locationTypeVal).removeClass("in");
}
function getLedStatusDetailsInfo(category,id,name){
	$("#columnChartId").html(spinner);
	var selectFilterArr =[];
	if(name == "EESL" || name == "NREDCAP" || name == "Overall") {
		$(".checkBoxCls").each(function () {
			if($(this).is(":checked")){
				selectFilterArr.push($(this).val());
			}
		});
		if(selectFilterArr.length > 0){
			selectFilterArr=selectFilterArr;
		}else{
			selectFilterArr =["''"];
		}
	} else {
		selectFilterArr =["''"];
	}
	var json={
		
	}
	$.ajax({              
	type:'GET',    
	url:  wurl+"/WebService/getLedStatusDetailsInfo/"+currentFromDate+"/"+currentToDate+"/"+category+"/"+id+"/"+glDeptId+"/"+selectFilterArr+"",
	//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getLedStatusDetailsInfo/"+currentFromDate+"/"+currentToDate+"/"+category+"/"+id+"/"+glDeptId+"/"+selectFilterArr+"",
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildLedStatusDetailsInfo(result);
		}
	});
}
function buildLedStatusDetailsInfo(result) {
	var categoriesArr=[];
	var dataArr=[];
	var colorsArr=[];
	for(var i in result.list){
		if(result.list[i].status != "Pending") {
			var categeoriesList = result.list[i].status;
			var colorsList = result.list[i].color;
			colorsArr.push(colorsList);
			categoriesArr.push(categeoriesList);
			dataArr.push({"y":result.list[i].statusCount,"extra":result.list[i].statusPerc});
		}
	}
	$('#columnChartId').highcharts( {
		colors: colorsArr,
		chart: {
			borderColor: '#ccc',
			borderWidth: 1,
			type: 'column'
		},
		title: {
			text: '<h6>Alerts Status View</h6>',
			align: 'left'
		},
		subtitle: {
			text: ''
		},
		credits:{
			enabled:false,
		},
		xAxis: {
			categories: categoriesArr, 
			labels: {
				style: {
					fontSize: '10px',
					fontFamily: 'Verdana, sans-serif',
					fontWeight:'bold'
				}
			}
		},
		plotOptions: {
			series: {
				pointWidth: 40,
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
						if(this.y != 0){
							return  (this.y)+"<br/>"+(this.point.extra)+"%";
						}
					}
				}
			},
		},
		tooltip: {
			useHTML:true,
			color: '#000',
			style: {
				fontWeight: 'bold',
			},
			 formatter: function() {
				return  (this.x)+"<br/>"+(this.y)+" - "+(this.point.extra)+"%";
			},
		},
		yAxis: {
			min: 0,
			lineWidth:1,
			gridLineWidth:0,
			lineColor:'#F8D2D2',
			title: {
				text: ''
			},
			labels: {
				style: {
					fontSize: '10px',
					fontFamily: 'Verdana, sans-serif',
					fontWeight:'bold'
				}
			}
		},
		legend: {
			enabled: false
		},
		series: [{
			name: 'Population',
			"colorByPoint": true,
			data: dataArr,
		}]
	});
}
function getLedAlertLifeCycleAnalysisDetailsInfo(type,category,id,name){
	$("#alertsLifeCycleId").html(spinner);
	/*$(".panelCollapseCls").removeClass("collapsed");
	$(".panelCollapseInCls").addClass("in");*/
	var selectFilterArr =[];
	if(name == "EESL" || name == "NREDCAP" || name == "Overall") {
		$(".checkBoxCls").each(function () {
			if($(this).is(":checked")){
				selectFilterArr.push($(this).val());
			}
		});
		if(selectFilterArr.length > 0){
			selectFilterArr=selectFilterArr;
		}else{
			selectFilterArr =["''"];
		}
	} else {
		selectFilterArr =["''"];
	}
	var json={
		
	}
	$.ajax({                
	type:'GET',
	url:  wurl+"/WebService/getLedAlertLifeCycleAnalysisDetailsInfo/"+currentFromDate+"/"+currentToDate+"/"+category+"/"+id+"/"+glDeptId+"/"+selectFilterArr+"/"+type+"",
	//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getLedAlertLifeCycleAnalysisDetailsInfo/"+currentFromDate+"/"+currentToDate+"/"+category+"/"+id+"/"+glDeptId+"/"+selectFilterArr+"/"+type+"",
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildLedAlertLifeCycleAnalysisDetailsInfo(result,type,name,id,category);
		}
	});
}
function buildLedAlertLifeCycleAnalysisDetailsInfo(result,type,name,id,category) {
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC" id="alertsDataTableId">';
			str+='<thead>';
				str+='<tr>';
					if(type == "alertlife") {
						str+='<th style="min-width:100px;">Alert Life</th>';
					} else {
						str+='<th style="min-width:100px;">Alert Code</th>';
						str+='<th style="min-width:210px;">Description</th>';
					}
					str+='<th>Overall</th>';
					for(var i in result.subList1[0].list) {
						if(result.subList1[0].list[i].status != "Pending") {
							str+='<th>'+result.subList1[0].list[i].status+'</th>';
							str+='<th>%</th>';
						}
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result.subList1) {
				str+='<tr>';
					str+='<td style="text-align:left !important;">'+result.subList1[i].smType+'</td>';
					if(type != "alertlife") {
						if(result.subList1[i].desc !=null && result.subList1[i].desc !="" && result.subList1[i].desc != undefined && result.subList1[i].desc.length >0) {
							str+='<td>'+result.subList1[i].desc.toUpperCase()+'</td>';
						} else {
							str+='<td>-</td>';//jagad
						}
					}
					if(result.subList1[i].count != null && result.subList1[i].count != 0) {
						str+='<td class="ledAlertsModalClkCls" block_type="alertLifeCycle" attr_category_type="'+category+'" attr_head_id="alert lifecycle analysis" attr_name="'+name+'" attr_alert_type="'+type+'" attr_category_id="'+id+'" attr_led_code="'+result.subList1[i].smType+'" attr_range_id="'+result.subList1[i].smTypeId+'" attr_status_id="0" style="cursor:pointer;"><a>'+result.subList1[i].count+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					for(var j in result.subList1[i].list) {
						if(result.subList1[i].list[j].status != "Pending") {
							if(result.subList1[i].list[j].statusCount != null && result.subList1[i].list[j].statusCount != 0) {
								str+='<td class="ledAlertsModalClkCls" block_type="alertLifeCycle" attr_category_type="'+category+'" attr_head_id="alert lifecycle analysis" attr_name="'+name+'" attr_alert_type="'+type+'" attr_category_id="'+id+'" attr_led_code="'+result.subList1[i].smType+'" attr_range_id="'+result.subList1[i].smTypeId+'" attr_status_id="'+result.subList1[i].list[j].statusId+'" style="cursor:pointer;"><a>'+result.subList1[i].list[j].statusCount+'</a></td>';
							} else {
								str+='<td>-</td>';
							}
							if(result.subList1[i].list[j].statusPerc != null && result.subList1[i].list[j].statusPerc != 0) {
								str+='<td class="text-success">'+result.subList1[i].list[j].statusPerc+'</td>';
							} else {
								str+='<td>-</td>';
							}
						}
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#alertsLifeCycleId").html(str);
	var fixedColumn;
	if(type == "alertlife") {
		fixedColumn = 1;
	} else {
		fixedColumn = 2;
	}
	$("#alertsDataTableId").dataTable({
		"paging":   false,
		"info":     false,
		"searching": false,
		"autoWidth": true,
		"iDisplayLength": 10,
		"aaSorting": [[ 5, "desc" ]], 
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"scrollX":true,
		"fixedColumns":{ "leftColumns":fixedColumn},
	}); 
	$(".DTFC_LeftBodyLiner").css({
		"overflow":"hidden",
	});	
	/*$(".panelCollapseCls").addClass("collapsed");
	$(".panelCollapseInCls").removeClass("in");*/
}
function getLedTimeLineAnalysisDetailsInfo(type,category,id,name){
	$("#overallId").html(spinner);
	var currentFromYear;
	var currentToYear;
	var selectFilterArr =[];
	if(name == "EESL" || name == "NREDCAP" || name == "Overall") {
		$(".checkBoxCls").each(function () {
			if($(this).is(":checked")){
				selectFilterArr.push($(this).val());
			}
		});
		if(selectFilterArr.length > 0){
			selectFilterArr=selectFilterArr;
		}else{
			selectFilterArr =["''"];
		}
	} else {
		selectFilterArr =["''"];
	}
	if(glChange	!= null && glChange == "statusChange"){
		currentFromYear=$("#yearRangePicker").val();
		currentToYear=$("#monthPicker").val();
	} else{
		currentFromYear = glyearData;
		currentToYear = glmonthData;
	}
	var json={
		
	}
	$.ajax({                
	type:'GET',
	url:  wurl+"/WebService/getLedTimeLineAnalysisDetailsInfo/"+currentFromYear+"/"+currentToYear+"/"+category+"/"+id+"/"+glDeptId+"/"+selectFilterArr+"/"+type+"",
	//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getLedTimeLineAnalysisDetailsInfo/"+currentFromYear+"/"+currentToYear+"/"+category+"/"+id+"/"+glDeptId+"/"+selectFilterArr+"/"+type+"",
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildLedTimeLineAnalysisDetailsInfo(result,type,id,name);
		}
	});
}
function buildLedTimeLineAnalysisDetailsInfo(result,type,id,name){
	var str='';
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_custom_SC" id="timeLineDataTableId">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Alert Code</th>';
					str+='<th>Description</th>';
					str+='<th>Overall</th>';
					for(var i in result[0].list) {
						if(type == "weekly"){
							str+='<th>'+result[0].list[i].category+' </br> <span class="text-muted f_10">'+result[0].list[i].type+'</span></th>';
						} else {
							str+='<th>'+result[0].list[i].category+'</th>';
						}
						str+='<th>%</th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				str+='<tr>';
					str+='<td>'+result[i].smType+'</td>';
					if(result[i].desc !=null && result[i].desc !="" && result[i].desc != undefined && result[i].desc.length >0) {
						str+='<td>'+result[i].desc.toUpperCase()+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].count != null && result[i].count != 0) {//jaag
						str+='<td class="ledAlertsModalClkCls" block_type="timeLineAnalysis" attr_month_id="0" attr_led_code="'+result[i].smType+'" attr_name="'+name+'" attr_head_id="timeline analysis" attr_search_type="'+type+'" attr_week_id="0" attr_category_id="'+id+'" style="cursor:pointer;"><a>'+result[i].count+'<a></td>';
					} else {
						str+='<td>-</td>';
					}
					for(var j in result[i].list) {
						if(type == "weekly"){
							var week = result[i].list[j].category[result[i].list[j].category.length-1];
						} else {
							week = "0";
						}
						if(result[i].list[j].count != null && result[i].list[j].count != 0) {
							str+='<td class="ledAlertsModalClkCls" block_type="timeLineAnalysis" attr_month_id="'+result[i].list[j].smTypeId+'" attr_led_code="'+result[i].smType+'" attr_name="'+name+'" attr_head_id="timeline analysis" attr_search_type="'+type+'" attr_week_id="'+week+'" attr_category_id="'+id+'" style="cursor:pointer;"><a>'+result[i].list[j].count+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result[i].list[j].statusPerc != null && result[i].list[j].statusPerc != 0) {
							str+='<td class="text-success">'+result[i].list[j].statusPerc+'</td>';
						} else {
							str+='<td class="text-success">-</td>';
						}
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#overallId").html(str);
	//$("#monthPicker option:selected").html(glmonthData);
	$('.chosen-single').chosen();
	if(type != "weekly"){
		$("#timeLineDataTableId").dataTable({
			"paging":   false,
			"info":     false,
			"searching": false,
			"autoWidth": false,
			"iDisplayLength": 10,
			"aaSorting": [[ 5, "desc" ]], 
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			"scrollX":true,
			"fixedColumns":{ "leftColumns":2},
		});
	}
}

function getLedDashBoardLocationWiseDetailsClick(divId,type,distId,categoryId,categoryType,statusId,startIndex,endIndex,selectFilterArr,blockType){
	$("#"+divId).html(spinner);
	var json={
		
	}
	$.ajax({                
	type:'GET', 
	url: wurl+"/WebService/getLedDashBoardLocationWiseDetailsClick/"+currentFromDate+"/"+currentToDate+"/"+type+"/"+categoryId+"/"+glDeptId+"/"+categoryType+"/"+selectFilterArr+"/"+statusId+"/"+distId+"/"+startIndex+"/"+endIndex+"",	
	//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getLedDashBoardLocationWiseDetailsClick/"+currentFromDate+"/"+currentToDate+"/"+type+"/"+categoryId+"/"+glDeptId+"/"+categoryType+"/"+selectFilterArr+"/"+statusId+"/"+distId+"/"+startIndex+"/"+endIndex+"",
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildLedDashBoardLocationWiseDetailsClick(result,divId,type,distId,categoryId,categoryType,statusId,startIndex,endIndex,selectFilterArr,'','','','',blockType);
		} else {
			//$(".overallLEDListId").html("NO DATA AVAILABLE");
		}
	});
}
function getLedTimeLineAnalysisDetailsInfoClick(divId,searchType,categoryId,selectFilterArr,weekId,startIndex,endIndex,monthId,blockType){
	$("#"+divId).html(spinner);
	if(glChange	!= null && glChange == "statusChange"){
		currentFromYear=$("#yearRangePicker").val();
		currentToYear=$("#monthPicker").val();
	} else{
		currentFromYear = glyearData;
		currentToYear = glmonthData;
	}
	var ledId ='';
	if(searchType == "monthly") {
		ledId = monthId;
	} else if(searchType == "weekly"){
		ledId = currentToYear;
	}
	var json={
		
	}
	$.ajax({                
	type:'GET', 
	url: wurl+"/WebService/getLedTimeLineAnalysisDetailsInfoClick/"+currentFromYear+"/"+ledId+"/"+searchType+"/"+glDeptId+"/"+categoryId+"/"+selectFilterArr+"/"+weekId+"/"+startIndex+"/"+endIndex+"",	
	//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getLedTimeLineAnalysisDetailsInfoClick/"+currentFromYear+"/"+ledId+"/"+searchType+"/"+glDeptId+"/"+categoryId+"/"+selectFilterArr+"/"+weekId+"/"+startIndex+"/"+endIndex+"",
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			//buildLedDashBoardLocationWiseDetailsClick(result,divId,'',0,categoryId,'',0,startIndex,endIndex,selectFilterArr,weekId,searchType,monthId,0);
			//buildLedDashBoardLocationWiseDetailsClick(divId,'','',categoryId,'','',startIndex,endIndex,selectFilterArr,weekId,searchType,monthId,'',blockType);
			buildLedDashBoardLocationWiseDetailsClick(result,divId,'','',categoryId,'','',startIndex,endIndex,selectFilterArr,weekId,searchType,monthId,'',blockType);
		} else {
			//$(".overallLEDListId").html("NO DATA AVAILABLE");
		}
	});
}
function getLedAlertLifeCycleAnalysisDetailsInfoTypeCliq(divId,type,categoryType,categoryId,selectFilterArr,statusId,rangeId,startIndex,endIndex,blockType){
	$("#"+divId).html(spinner);
	var json={
		
	}
	$.ajax({                
	type:'GET', 
	url: wurl+"/WebService/getLedAlertLifeCycleAnalysisDetailsInfoTypeCliq/"+currentFromDate+"/"+currentToDate+"/"+type+"/"+categoryType+"/"+glDeptId+"/"+categoryId+"/"+selectFilterArr+"/"+rangeId+"/"+statusId+"/"+startIndex+"/"+endIndex+"",	
	//url: "http://192.168.11.137:8080/PartyAnalyst/WebService/getLedAlertLifeCycleAnalysisDetailsInfoTypeCliq/"+currentFromDate+"/"+currentToDate+"/"+type+"/"+categoryType+"/"+glDeptId+"/"+categoryId+"/"+selectFilterArr+"/"+rangeId+"/"+statusId+"/"+startIndex+"/"+endIndex+"",
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildLedDashBoardLocationWiseDetailsClick(result,divId,type,'',categoryId,categoryType,statusId,startIndex,endIndex,selectFilterArr,'','','',rangeId,blockType);
		} else {
			//$(".overallLEDListId").html("NO DATA AVAILABLE");
		}
	});
}
function buildLedDashBoardLocationWiseDetailsClick(result,divId,type,distId,categoryId,categoryType,statusId,startIndex,endIndex,selectFilterArr,weekId,searchType,monthId,rangeId,blockType) {
	var str='';
	var alertId = '';
	var totalCount = result[0].total;
	
	
	str+='<div class="row">';
		str+='<div class="col-sm-12 m_top10" expand-main="false">';
		str+='<div class="table-responsive">';
			str+='<div class="classicView">';
				str+='<table style="background-color:#fff;" id="dataTable" class="table table-bordered ledTable">';
					str+='<thead>';
						str+='<th></th>';
						str+='<th>Id</th>';
						str+='<th>CcmsId</th>';
						str+='<th>Title</th>';
						str+='<th><span class="channel-name">Source</span></th>';
						str+='<th><span class="location-name">Location</span></th>';
						/* if(blockType =="closedAndReopend"){
							str+='<th><span class="channel-name">Present Status</span></th>';
						}else{ */
							str+='<th><span class="channel-name">Status</span></th>';
						//}
						str+='<th><span class="channel-name">Ofcr Name</span></th>';//alertStatus
						str+='<th><span class="channel-name">Ofcr Location</span></th>';
						//str+='<th><span class="channel-name">Lag Days</span></th>';
						//str+='<th>Subtask <i class="fa fa-level-down"></i></th>';
						//if(blockType !="closedReopen"){
							str+='<th></th>';
						//}
						
					str+='</thead>';
					str+='<tbody>';
					for(var i in result)
					{
						
							str+='<tr>';
								str+='<td>';
									
								if(result[i].severtyColor != null)
								{
									str+='<i class="glyphicon glyphicon-cog text-danger"  style="color:'+result[i].severtyColor+';margin-right:3px;"></i>';
								}else{
									str+='<i class="glyphicon glyphicon-cog text-danger"  style="color:#eee;margin-right:3px;"></i>';
								}
								
								str+='</td>';
								str+='<td> ';
									if(result[i].id != null)
									{
										str+=''+result[i].id+'</td>';
									}else{
										str+='-</td>';
									}
								str+='<td> ';
									if(result[i].ccmsId != null)
									{
										str+=''+result[i].ccmsId+'</td>';
									}else{
										str+='-</td>';
									}
									
								str+='<td>';
									if(result[i].title != null)
									{
										str+='<span class="alert-title" data-toggle="tooltip" data-placement="top" title="'+result[i].title+'">'+result[i].title+'</span>';
									}else{
										str+='<span class="alert-title" data-toggle="tooltip" data-placement="top" title="-">-</span>';
									}
								str+='</td>';
								str+='<td>';
									if(result[i].source != null)
									{
										str+='<span data-toggle="tooltip" class="channel-name" data-placement="top" title="'+result[i].source+'">'+result[i].source+'</span>';
									}else{
										str+='<span data-toggle="tooltip" class="channel-name" data-placement="top" title="-">-</span>';
									}
								str+='</td>';
								
								str+='<td>';
									if(result[i].location != null)
									{
										str+='<span data-toggle="tooltip" class="location-name" data-placement="top" title="'+result[i].location+'">'+result[i].location+'</span>';
									}else{
										str+='<span data-toggle="tooltip" class="location-name" data-placement="top" title="-">-</span>';
									}
									
								str+='</td>';
								str+='<td class="text-center">';
									if(result[i].status != null)
									{
										str+='<span class="channel-name" data-toggle="tooltip" class="location-name" data-placement="top" title="'+result[i].status+'">'+result[i].status+'</span>';
									}else{
										str+='<span class="channel-name" data-toggle="tooltip" class="location-name" data-placement="top" title="-">-</span>';
									}
									
								str+='</td>';
								str+='<td class="text-center">';
									if(result[i].problem != null)
									{
										str+='<span class="channel-name" data-toggle="tooltip" class="location-name" data-placement="top" title="'+result[i].problem+'">'+result[i].problem+'</span>';
									}else{
										str+='<span class="channel-name" data-toggle="tooltip" class="location-name" data-placement="top" title="-">-</span>';
									}
									
								str+='</td>'; 
								 str+='<td class="text-center">';
									if(result[i].relatedTo != null)
									{
										str+='<span class="channel-name" data-toggle="tooltip" class="location-name" data-placement="top" title="'+result[i].relatedTo+'">'+result[i].relatedTo+'</span>';
									}else{
										str+='<span class="channel-name" data-toggle="tooltip" class="location-name" data-placement="top" title="-">-</span>';
									}
									
								str+='</td>';
								//if(blockType !="closedReopen"){
								str+='<td>';
									if(result[i].id != null && result[i].id > 0)
									{
										str+='<span class="arrow-icon pull-right alertIdCls" attr_statusId="'+result[i].statusId+'" attr_alertId="'+result[i].id+'" expand-icon="block1">';
											str+='<i class="glyphicon glyphicon-menu-right"></i>';
										str+='</span>';

									}else{
										str+='-';
									}
									
								str+='</td>';
								//}
							str+='</tr>';
					}
					str+='</tbody>';
				str+='</table>';
			
			str+='</div>';
		str+='</div>';
		str+='</div>';
		str+='<div id="rightSideExpandView"></div>';
	str+='</div>';
	
	$("#"+divId).html(str);
	//if(blockType != "closedAndReopend"){
		/* $("#dataTable").dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]]
		}); */
		
	if(startIndex == 0 && totalCount > 0){									//setTimeout(5000);
		$("#paginationDivId").pagination({
			//"iDisplayLength": 10,
			items: totalCount,
			itemsOnPage: 10,
			cssStyle: 'light-theme',
			hrefTextPrefix: '#pages-',
			onPageClick: function(pageNumber) { 
				var num=(pageNumber-1)*10;
				//getLedDashBoardLocationWiseDetailsClick(divId,type,distId,categoryId,categoryType,statusId,num,endIndex,selectFilterArr,weekId,searchType,monthId,rangeId);
				if(blockType == "locationWise"){
					getLedDashBoardLocationWiseDetailsClick(divId,type,distId,categoryId,categoryType,statusId,num,endIndex,selectFilterArr);
				} else if(blockType == "timeLineAnalysis"){
					getLedTimeLineAnalysisDetailsInfoClick(divId,searchType,categoryId,selectFilterArr,weekId,num,endIndex,monthId,blockType);
				} else if(blockType == "alertLifeCycle"){
					getLedAlertLifeCycleAnalysisDetailsInfoTypeCliq(divId,type,categoryType,categoryId,selectFilterArr,statusId,rangeId,num,endIndex,blockType);
				}
			}
		});
	}
		
}
$(document).on('click', '.switch-btn-apita li', function(){
	$('.switch-btn-apita li').removeClass("active");
	$(this).addClass("active");
	var value = $(this).attr("attr_type");
	var category = '';
	var id =0;
	$(".tabsClickCls").each(function(){
		if($(this).hasClass("active")){
			category =  $(this).attr('attr_category');
			id =  $(this).attr('attr_tab_id');
			name =  $(this).attr('attr_tab_name');
		}
	});
	getLedAlertLifeCycleAnalysisDetailsInfo(value,category,id,name);
});
$(document).on('click', '.tabsClickCls', function(){
	glTotalValue = $(this).find('.totalCountCls').text();
	$(".selectAllBoxChk").prop('checked',true);
	$(".checkBoxCls").prop('checked',true);
	var category = $(this).attr("attr_category");
	var id = $(this).attr("attr_tab_id");
	var name = $(this).attr("attr_tab_name");
	var type = $('.checkedStatusCls').find('input:checked').parent().attr('attr_val');
	$("#headNameId").html(name+'&nbsp;Details');
	
	if(name == "EESL" || name == "NREDCAP" || name == "Overall") {
		for(var i in locationWiseArr){
			getLEDLocationAndStatusDetailsInfo(locationWiseArr[i],id,category,name);
		}
		getLedDashBoardOverview("onClick",category,id);
		getLedAlertLifeCycleAnalysisDetailsInfo("alertlife",category,id,name);
		getLedStatusDetailsInfo(category,id,name);
		getLedTimeLineAnalysisDetailsInfo(type,category,id,name);
		$("#checkBoxStatusId").show();
		$(".alertCodeCls").show();
	} else {
		for(var i in locationWiseArr){
			getLEDLocationAndStatusDetailsInfo(locationWiseArr[i],id,category,name);
		}
		getLedDashBoardOverview("onClick",category,id);
		getLedAlertLifeCycleAnalysisDetailsInfo("alertlife",category,id,name);
		getLedStatusDetailsInfo(category,id,name);
		getLedTimeLineAnalysisDetailsInfo("monthly",category,id,name);
		$("#checkBoxStatusId").hide();
		$(".alertCodeCls").hide();
		$(".alertLifeCls").addClass("active");
		$(".alertCodeCls").removeClass("active");
	}
});
$(document).on('click','.selectAllClk', function(){
	var type = $('.checkedStatusCls').find('input:checked').parent().attr('attr_val');
	var value = $('.switch-btn-apita li.active').attr("attr_type");
	var category = '';
	var id =0;
	$(".tabsClickCls").each(function(){
		if($(this).hasClass("active")){
			category =  $(this).attr('attr_category');
			id =  $(this).attr('attr_tab_id');
			name =  $(this).attr('attr_tab_name');
		}
	});
	if($("#selectAllInputId").is(":checked")){
		$(".checkBoxCls").prop('checked',true);
	}else{
		$(".checkBoxCls").prop('checked',false);
	}
	getLedTimeLineAnalysisDetailsInfo(type,category,id,name);
	getLedAlertLifeCycleAnalysisDetailsInfo(value,category,id,name);
	getLedStatusDetailsInfo(category,id,name);
	for(var i in locationWiseArr) {
		getLEDLocationAndStatusDetailsInfo(locationWiseArr[i],id,category,name)
	}
});
$(document).on('click','.checkBoxCls', function(){
	var flage= true;
	var type = $('.checkedStatusCls').find('input:checked').parent().attr('attr_val');
	var value = $('.switch-btn-apita li.active').attr("attr_type");
	var category = '';
	var id =0;
	$(".tabsClickCls").each(function(){
		if($(this).hasClass("active")){
			category =  $(this).attr('attr_category');
			id =  $(this).attr('attr_tab_id');
			name =  $(this).attr('attr_tab_name');
		}
	});
	$(".checkBoxCls").each(function () {
		if(!$(this).is(":checked")){
			flage=false;
			return false;
		}
	});
	
	/*var flage2= false;
	$(".checkBoxCls").each(function () {
		if($(this).is(":checked")){
			flage2=true;
		}
	});
	if(flage2==false ){
		$(".checkBoxCls").attr("checked",true);
		$(".selectAllBoxChk").attr("checked",true);
	}*/
	
	if(flage == true){
		$("#selectAllInputId").prop('checked',true);
	}else{
		$("#selectAllInputId").prop('checked',false);
	}
	getLedTimeLineAnalysisDetailsInfo(type,category,id,name);
	getLedAlertLifeCycleAnalysisDetailsInfo(value,category,id,name);
	getLedStatusDetailsInfo(category,id,name);
	for(var i in locationWiseArr) {
		getLEDLocationAndStatusDetailsInfo(locationWiseArr[i],id,category,name)
	}
});
$(document).on("change",".checkedStatusCls",function(){
	var type = $(this).attr("attr_val");
	var category,id,name,year;
	category=$('.overallNav').find('li.active').attr('attr_category');
	id=$('.overallNav').find('li.active').attr('attr_tab_id');
	name=$('.overallNav').find('li.active').attr('attr_tab_name');
	if(type == "monthly"){
	  $('#monthPicker').hide();
	  $("#monthPicker").val(0);
	}else{
		$('#monthPicker').show();
		$("#monthPicker").val(glmonthData);
	}
	getLedTimeLineAnalysisDetailsInfo(type,category,id,name);
})
$(document).on("dp.change","#yearRangePicker",function(){
	var type = $('.checkedStatusCls').find('input:checked').parent().attr('attr_val');
	var category,id,name;
	glChange="statusChange";
	category=$('.overallNav').find('li.active').attr('attr_category');
	id=$('.overallNav').find('li.active').attr('attr_tab_id');
	name=$('.overallNav').find('li.active').attr('attr_tab_name');
	getLedTimeLineAnalysisDetailsInfo(type,category,id,name);
});
$(document).on("change","#monthPicker",function(){
	var type = $('.checkedStatusCls').find('input:checked').parent().attr('attr_val');
	var category,id,name;
	glChange="statusChange";
	category=$('.overallNav').find('li.active').attr('attr_category');
	id=$('.overallNav').find('li.active').attr('attr_tab_id');
	name=$('.overallNav').find('li.active').attr('attr_tab_name');
	getLedTimeLineAnalysisDetailsInfo(type,category,id,name);

});
$(document).on("click",".ledAlertsModalClkCls",function(){
	$("#alertsClickId").modal("show");
	var blockType = $(this).attr("block_type");
	var rangeId = $(this).attr("attr_range_id");
	var alertType = $(this).attr("attr_alert_type");
	var monthId = $(this).attr("attr_month_id");
	var ledCode = $(this).attr("attr_led_code");
	var name = $(this).attr("attr_name");
	var headingName = $(this).attr("attr_head_id");
	var weekId = $(this).attr("attr_week_id");
	var searchType = $(this).attr("attr_search_type");
	var type = $(this).attr("attr_type");
	var distId = $(this).attr("attr_dist_id");
	var categoryId = $(this).attr("attr_category_id");
	var categoryType = $(this).attr("attr_category_type");
	var statusId = $(this).attr("attr_status_id");
	var startIndex =0;
	var endIndex = 10;
	
	$(".paginationDivCls").html('');
	$("#alertsHeadingId").html(headingName+'&nbsp;Details')
	var selectFilterArr =[];
	if(name == "EESL" || name == "NREDCAP" || name == "Overall") {
		$(".checkBoxCls").each(function () {
			if($(this).is(":checked")){
				selectFilterArr.push($(this).val());
			}
		});
		if(selectFilterArr.length > 0){
			selectFilterArr=selectFilterArr;
		}else{
			selectFilterArr =["''"];
		}
	} else {
		selectFilterArr =["''"];
	}
	if(blockType == "locationWise"){
		if(statusId == 0){
			getLedDashBoardLocationWiseDetailsClick("ledAlertsTableDataId",type,distId,categoryId,categoryType,"''",startIndex,endIndex,selectFilterArr,blockType);
		} else {
			getLedDashBoardLocationWiseDetailsClick("ledAlertsTableDataId",type,distId,categoryId,categoryType,statusId,startIndex,endIndex,selectFilterArr,blockType);
		}
	} else if(blockType == "timeLineAnalysis") {
		getLedTimeLineAnalysisDetailsInfoClick("ledAlertsTableDataId",searchType,categoryId,ledCode,weekId,startIndex,endIndex,monthId,blockType);
	} else if(blockType == "alertLifeCycle") {
		if(statusId == 0){
			statusId = "''";
		} else {
			statusId = statusId;
		}
		if(alertType == "alertlife"){
			getLedAlertLifeCycleAnalysisDetailsInfoTypeCliq("ledAlertsTableDataId",alertType,categoryType,categoryId,selectFilterArr,statusId,rangeId,startIndex,endIndex,blockType);
		} else {
			getLedAlertLifeCycleAnalysisDetailsInfoTypeCliq("ledAlertsTableDataId",alertType,categoryType,categoryId,ledCode,statusId,0,startIndex,endIndex,blockType);
		}
	}
});