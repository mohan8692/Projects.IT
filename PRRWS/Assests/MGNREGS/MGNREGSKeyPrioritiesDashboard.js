var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>',
	locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3}],
	currentFromDate =moment().format("DD-MM-YYYY"),
	currentToDate= moment().format("DD-MM-YYYY"),
	globalLocType = 'State',
	globalLocId = 1,
	globalBuildType ="Weekly",
	NODATAMSG = "NO DATA AVAILABLE";

$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});

$(document).on("click",".selectionWiseDtsCls li",function(){
	
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	
	var type = $(this).attr("attr_type");
	if(type == "achievement"){
		$(".achievement").show();
		$(".expenditure").hide();
		$("#blockWiseHeadingId").html("Achievement Wise Details")
	}else{
		$(".expenditure").show();
		$(".achievement").hide();
		$("#blockWiseHeadingId").html("Expenditure Wise Details")
	}
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

$("#dateRangePickerKeyPrior").daterangepicker({
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
var dates= $("#dateRangePickerKeyPrior").val("OverAll");
var pickerDates = currentFromDate+' - '+currentToDate
$('#dateRangePickerKeyPrior').on('apply.daterangepicker', function(ev, picker) {
	currentFromDate = picker.startDate.format('DD-MM-YYYY');
	currentToDate = picker.endDate.format('DD-MM-YYYY');
	if(picker.chosenLabel == 'OverAll')
	{
		$("#dateRangePickerKeyPrior").val('OverAll');
	}
	//onloadcalls();
});
onloadcalls();
function onloadcalls(){
	$(".chosen-select").chosen();
	getDepartmentWiseDetails();
	getAllGovtDepartments("componentCompareDepartment");
	getComponentWiseComparisonDetails(0);
	
	getAllGovtDepartments("componentAnalysisDepartment");
	getComponentsByDepartmentId("componentDivId",2);
	//getComponentAnalysisDetails(2,1);
	
	getAllGovtDepartments("locationDepartment");
	getComponentsByDepartmentId("locationComponentDivId",2);
	buildlevelWiseDetails("keyPrior");
	getComponentWiseDistrictWiseDetails();
	
	//Expenditure Calls
	getStateLevelExpenditureOverviewDetails();
	getDepartmentWiseExpenditureDetails();
	getDistrictWiseExpenditureDetails("Expenditure","deptwiseExpenditureDetailsDivId");
	getDistrictWiseExpenditureDetails("Timely Payments","deptwiseTimlyDetailsDivId");
}

//DEPARTMENT WISE DETAILS
function getDepartmentWiseDetails(){	
	$("#departmentwiseDetailsDivId").html(spinner)	;
	var json={
		deptId : 0,	
		locationId : globalLocId,
		locationType : globalLocType,
		type : globalBuildType//"Combined"
	}
	$.ajax({                
	type:'POST',    
	url: 'getDepartmentWiseComparisonDetails',//'getDepartmentWiseDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){	
			buildDepartmentWiseDetails(result);
		}else{	
			$("#departmentwiseDetailsDivId").html(NODATAMSG);
		}
	});
}

function buildDepartmentWiseDetails(result){
	//var colorObj = {"January":"#da4a76","February":"#614f91","March":"#399acd","April": "#cf001a","May":"#da4a76","June": "#614f91","July":"#399acd","August": "#cf001a","September":"#da4a76","October": "#614f91","November":"#399acd","December": "#cf001a"/*,"Week1":"#da4a76","Week2":"#614f91","Week3":"#399acd","Week4":"#cf001a","Week5":"#da4a76","Week6":"#614f91","Week":"#6a5acd"*/};
	
	var	colorObj = {};
	for(var i in result[0].subList){
		if(i % 4 == 0){
			colorObj[result[0].subList[i].name] = "#da4a76";
		}else if(i % 4 == 1){
			colorObj[result[0].subList[i].name] = "#614f91";
		}if(i % 4 == 2){
			colorObj[result[0].subList[i].name] = "#399acd";
		}if(i % 4 == 3){
			colorObj[result[0].subList[i].name] = "#cf001a";
		}		
			
	}
	var str = '';
	str+='<div class="row">';
		str+='<div class="col-sm-6">';
			str+='<div class="row">	';		
				str+='<div class="col-sm-3">';
					str+='<h5 class="pad_10_10 border_yash margin_bottom font_weight text-center" style="padding:18px;">Department</h5>';
					
					for(var i in result){
						var colorAtr = result[i].name;
							colorAtr = colorAtr.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
							
						str+='<div class="row">';
							str+='<div class="col-sm-3">';
								str+='<div class="arrow_box" attr_color="'+colorAtr+'" style="z-index:1; background-color: '+result[i].colorCode+';width:45px;" >';
									str+='<h4 class="kp-h411 text-center"  style="color:#fff;"><span style="font-weight:bold;font-size:14px;" class="tooltipCls" data-toggle="tooltip" title="Components">'+result[i].count+'</span></h4>';	
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-9">';
								str+='<div class="arrow_box_yash">';
									if(result[i].name !=null && result[i].name.length>8){
										str+='<h4 class="kp-h4" style="font-size:12px;color:#333;"><span class="tooltipCls" data-toggle="tooltip" title="'+result[i].name+'">'+result[i].name.substring(0,8)+'..</span></h4>';	
									}else{
										str+='<h4 class="kp-h4" style="font-size:12px;color:#333;">'+result[i].name+'</h4>';	
									}
									
								str+='</div>';
								str+='</div>';
						str+='</div>';
							
						//console.log(result[i].name);
						/* str+='<div class="margin_bottom getCls">';
							str+='<div class="row">';
								str+='<div class="col-sm-6">';
									var colorAtr = result[i].name;
									colorAtr = colorAtr.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
									str+='<div class="arrow_box pad_10_10 text-center" attr_color="'+colorAtr+'" style="z-index:1; background-color: '+result[i].colorCode+'">';									
										str+='<h4 class="font_weight">'+result[i].count+'</h4>';
										str+='<h6 class="m_top5 white_color font_weight">Components</h6>';
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-6">';
									if(result[i].name.length > 25){
										str+='<div class="arrow_box_yash pad_12_0 text-center" style="position: relative;left:-32px;>';
									}else{
										str+='<div class="arrow_box_yash pad_20_0 text-center" style="position: relative;left:-32px;">';	
									}									
										str+='<h6 class="m_top5">'+result[i].name+'</h6>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>'; */
					}
				str+='</div>';
				str+='<div class="col-sm-3">';
					str+='<h5 class="font_weight margin_bottom pad_10_responsive" style="background-color:#f1a200; color:#fff;">'+result[0].subList[0].name+'</h5>';
					for(var i in result){
						if(result[i].subList[0].percentage != null && result[i].subList[0].percentage >0 && result[i].subList[0].percentage >= 100){
							str+='<h4 class="kp-h4 text-success text-center" style="font-size:14px;">'+parseFloat(result[i].subList[0].percentage).toFixed(2)+' %</h4>';
						}else if(result[i].subList[0].percentage != null && result[i].subList[0].percentage >0 && result[i].subList[0].percentage <100){
							str+='<h4 class="kp-h4 text-danger text-center" style="font-size:14px;">'+parseFloat(result[i].subList[0].percentage).toFixed(2)+' %</h4>';
						}else{
							str+='<h4 class="kp-h4 text-center" style="font-size:14px;">-</h4>';
						}
													
					}
				str+='</div>';
				str+='<div class="col-sm-3">';
					str+='<h5 class="font_weight margin_bottom pad_10_responsive" style="background-color:#086b1a; color:#fff;">'+result[0].subList[1].name+'</h5>';
					for(var i in result){	
						if(result[i].subList[1].percentage != null && result[i].subList[1].percentage >0 && result[i].subList[1].percentage >= 100){
							str+='<h4 class="kp-h4 text-success text-center" style="font-size:14px;">'+parseFloat(result[i].subList[1].percentage).toFixed(2)+' %</h4>';
						}else if(result[i].subList[1].percentage != null && result[i].subList[1].percentage >0 && result[i].subList[1].percentage <100){
							str+='<h4 class="kp-h4 text-danger text-center" style="font-size:14px;">'+parseFloat(result[i].subList[1].percentage).toFixed(2)+' %</h4>';
						}else{
							str+='<h4 class="kp-h4 text-center" style="font-size:14px;">-</h4>';
						}													
					}
				str+='</div>';
				str+='<div class="col-sm-3">';
					str+='<h5 class="font_weight margin_bottom pad_10_responsive" style="background-color:red;color:#fff; padding:17px;">'+result[0].subList[2].name+'</h5>';
					for(var i in result){
						if(result[i].subList[2].percentage != null && result[i].subList[2].percentage >0 && result[i].subList[2].percentage >100) {
							str+='<h4 class="kp-h4 text-success text-center" style="font-size:14px;">'+parseFloat(result[i].subList[2].percentage).toFixed(2)+' %</h4>';
						}else if(result[i].subList[2].percentage != null && result[i].subList[2].percentage >0 && result[i].subList[2].percentage <= 100) {
							str+='<h4 class="kp-h4 text-danger text-center" style="font-size:14px;">'+parseFloat(result[i].subList[2].percentage).toFixed(2)+' %</h4>';
						}else{
							str+='<h4 class="kp-h4 text-center" style="font-size:14px;">-</h4>';
						}													
					}
				str+='</div>';
			/* str+='<div class="custom_ul">';									
				str+='<ul class="list-inline custom_li">';
					str+='<li>';
						if(globalBuildType == "Weekly"){
							str+='<h5 class="pad_10_10 good_color border_yash margin_bottom" style="width:100%;padding: 18px 10px;">Department</h5>';
						}else{
							str+='<h5 class="pad_10_10 good_color border_yash margin_bottom" style="width:100%;">Department</h5>';
						}
						for(var i in result){
							//console.log(result[i].name);
							str+='<div class="margin_bottom getCls">';
								str+='<div class="row">';
									str+='<div class="col-sm-8">';
										var colorAtr = result[i].name;
										colorAtr = colorAtr.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
										str+='<div class="arrow_box pad_10_10 text-center" attr_color="'+colorAtr+'" style="z-index:1; background-color: '+result[i].colorCode+'">';									
											str+='<h4 class="font_weight">'+result[i].count+'</h4>';
											str+='<h6 class="m_top5 white_color font_weight">Components</h6>';
										str+='</div>';
									str+='</div>';
									str+='<div class="col-sm-4">';
										if(result[i].name.length > 25){
											str+='<div class="arrow_box_yash pad_12_0 text-center" style="position: relative;left:-32px;>';
										}else{
											str+='<div class="arrow_box_yash pad_20_0 text-center" style="position: relative;left:-32px;">';	
										}									
											str+='<h6 class="m_top5">'+result[i].name+'</h6>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						}												
					str+='</li>';
					str+='<li>';	
						if(globalBuildType == "Weekly"){
							str+='<h5 class="pad_10_10 font_weight margin_bottom" style="background-color:#f1a200; color:#fff;padding: 18px 10px;">'+result[0].subList[0].name+'</h5>';
						}else{
							str+='<h5 class="pad_10_10 font_weight margin_bottom" style="background-color:#f1a200; color:#fff;">'+result[0].subList[0].name+'</h5>';						
						}
						for(var i in result){							
							str+='<h4 class="kp-h4" style="font-size:14px;">'+result[i].subList[0].percentage+' %</h4>';							
						}						
					str+='</li>';
				str+='</ul>';
			str+='</div>'; */
			
			str+='</div>';
		str+='</div>';								
		str+='<div class="col-sm-6">';
			str+='<div class="row">';			
				str+='<div class="col-sm-12">';									
					str+='<ul class="list-inline kp-row sliderTable">';
						var k = 3;
						for(var i in result){
							 if( k < result[i].subList.length){
								 str+='<li>';
								if(globalBuildType =="Weekly" || globalBuildType =="Combined"){								
									str+='<h5 class="f_13 font_weight" style="background-color: '+colorObj[result[0].subList[k].name]+';">'+result[0].subList[k].name+'<p class="">'+result[0].subList[k].fromDateFormat+'&nbsp;-&nbsp;'+result[0].subList[k].toDateFormat+'</p></h5>';
								}else{
									str+='<h5 class="f_13 font_weight" style="background-color: '+colorObj[result[0].subList[k].name]+';padding:18px;">'+result[0].subList[k].name+'</h5>';
								}									
								
								for(var m in result){
									//console.log(m+"-"+k)
									if(result[m].subList[k].percentage != null && result[m].subList[k].percentage >0 && result[m].subList[k].percentage <100){
										str+='<h4 class="font_weight text-danger">'+result[m].subList[k].percentage+' %</h4>';
									}else if(result[m].subList[k].percentage != null && result[m].subList[k].percentage >0 &&  result[m].subList[k].percentage >100){
										str+='<h4 class="font_weight text-success">'+result[m].subList[k].percentage+' %</h4>';
									}else{
										str+='<h4>-</h4>';
									}										
								}
								k++;
								str+='</li>';
							} 
						}						
					str+='</ul>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#departmentwiseDetailsDivId").html(str);
	$(".tooltipCls").tooltip();
	buildSlick('sliderTable');
	$('[attr_custom=key]').remove();
	var arrow = '';
	for(var i in result){
		var colorAtr = result[i].name;
			colorAtr = colorAtr.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
		arrow+='[attr_color='+colorAtr+']:after{border-left-color:'+result[i].colorCode+' !important}';
	}
	$('head').append("<style type='text/css' attr_custom='key'>"+arrow+"</style>");
}

function buildSlick(className){
		$('.'+className).slick({
		  slides:'li',
		  infinite: false,
		  speed: 300,
		  slidesToShow: 5,
		  slidesToScroll: 1,
		  variableWidth: true,
		  responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
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

// COMPONENT WISE COMPARISION DETAILS

function getComponentWiseComparisonDetails(deptId){	
	$("#componentWiseComparisionDivId").html(spinner)	;
	var json={
		deptId : deptId,		
		locationId : globalLocId,
		locationType : globalLocType,
		type : globalBuildType//"Combined",
	}
	$.ajax({                
	type:'POST',    
	url: 'getComponentWiseComparisonDetailsNew',//'getComponentWiseComparisonDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){			
			buildComponentWiseComparisonDetails(result);
		}else{	
			$("#componentWiseComparisionDivId").html(NODATAMSG);
		}
	});
}
function buildComponentWiseComparisonDetails(result){
	var str = '';
	str+='<div class="table-responsive m_top20">';
		str+='<table class="table table-bordered table_default2 m_top10" id="'+globalBuildType+'ComponentWiseDataTable" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">Department</th>';
					str+='<th rowspan="2"><div style="width: 180px;">Component</div></th>';
					//str+='<th rowspan="2"><div style="width: 100px">Target</div></th>';
					for(var i in result[0].subList){
						if(i == 0){
							str+='<th colspan="3" class="bg_KP_overall">overall</th>';
						}else if(i== 1){
							str+='<th colspan="3" class="bg_KP_ytd">'+result[0].subList[i].name+'</th>';
						}else if(i== 2){
							str+='<th rowspan="2" class="bg_KP_spillOver">'+result[0].subList[i].name+'</th>';
						}else{
							if(globalBuildType == "Monthly"){
								str+='<th colspan="2">'+result[0].subList[i].name+'</th>';
							}else{
								str+='<th colspan="2">'+result[0].subList[i].name+'<p>'+result[0].subList[i].fromDateFormat+'&nbsp;-&nbsp;'+result[0].subList[i].toDateFormat+'</p></th>';
							}
						}						
					}										
				str+='</tr>';
				str+='<tr>';
					str+='<th class="bg_KP_overall">Target</th>';
					str+='<th class="bg_KP_overall">Achievement</th>';
					str+='<th class="bg_KP_overall"><div style="width: 100px">%</div></th>';
					str+='<th class="bg_KP_ytd">Target</th>';
					str+='<th class="bg_KP_ytd">Achievement</th>';
					str+='<th class="bg_KP_ytd"><div style="width: 100px">%</div></th>';
					for(var i in result[0].subList){					
						if(i > 2) {
							str+='<th>Achievement</th>';
							str+='<th>%</th>';
						}
					}	
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td  class="fixedColCls">'+getValues(result[i].departmentName)+'</td>';
					str+='<td  class="fixedColCls" style="text-align: left !important;"><span class="tooltipCls" data-toggle="tooltip" data-container="body" data-placement="top" data-html="true" title="Units : '+getValues(result[i].type)+'"><i class="fa fa-info-circle" style="color: #646566; margin-right: 5px;"></i></span>'+result[i].name+'</td>';	
					for(var j in result[i].subList){
						if(result[i].subList[j].id != null && result[i].subList[j].id == 0){
							str+='<td class="bg_KP_overall">'+getValues(Math.round(parseFloat(result[i].subList[j].target)))+'</td>';
							str+='<td class="bg_KP_overall">'+getValues(parseFloat(result[i].subList[j].completed).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
							str+= getPercentageWithArrows(result[i].subList[j].percentage,"bg_KP_overall");
						}else if(result[i].subList[j].id != null && result[i].subList[j].id == 13){
							str+='<td class="bg_KP_ytd">'+getValues(Math.round(parseFloat(result[i].subList[j].weeklyTarget)))+'</td>';
							str+='<td class="bg_KP_ytd">'+getValues(parseFloat(result[i].subList[j].completed).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
							str+= getPercentageWithArrows(result[i].subList[j].percentage,"bg_KP_ytd");
						}else if(result[i].subList[j].id != null && result[i].subList[j].id == 14){
							str+='<td class="bg_KP_spillOver">'+getValues(parseFloat(result[i].subList[j].percentage).toFixed(2))+'</td>';
						}else{
							str+='<td>'+getValues(parseFloat(result[i].subList[j].completed).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
							str+= getPercentageWithArrows(result[i].subList[j].percentage,"");	
						}						
						
					}				
				str+='</tr>';
			}				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#componentWiseComparisionDivId").html(str);
	$(".tooltipCls").tooltip();
	initializeDataTable(globalBuildType+'ComponentWiseDataTable');
	$("#"+globalBuildType+"ComponentWiseDataTable").tableHeadFixer({"head" : false, "left" : 2});
}

// COMPONENT ANALYSIS DETAILS

function getComponentAnalysisDetails(deptId,componentId){	
	$("#componentAnalysisGraphId").html(spinner)	;
	var json={
		deptId : deptId,
		componentId	: componentId,
		locationId : globalLocId,
		locationType : globalLocType,
		type : globalBuildType,
	}
	$.ajax({                
	type:'POST',    
	url: 'getComponentAnalysisDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){			
			buildComponentAnalysisDetails(result);
		}else{	
			$("#componentAnalysisGraphId").html(NODATAMSG);
		}
	});
}

function buildComponentAnalysisDetails(result){
	var monthsArr = [],
		countArr = [],
		yAxisText=$("#componentDivId option:selected").text();
		
	for(var i in result){
		monthsArr.push(result[i].name);
		countArr.push(parseFloat(result[i].completed));
	}
	
	$("#componentAnalysisGraphId").highcharts({
	 chart: {
			type: 'line'
		},
		title: "",
		xAxis: {
			categories: monthsArr,
			title: {
				text: '',
				style: {
					color: '#323332'
				}
			}
		},
		yAxis: {
			title: {
				text: yAxisText,
				style: {
					color: '#323332'
				}
			},
			min: 0,
			borderColor: '#050607'
		},	
		 tooltip: {
			
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: false
				},
				enableMouseTracking: true
			}
		},
		legend: {
			enabled:false
		},
		series: [{
			name: 'Completed',
			color: '#1960AB',
			data: countArr
		}]
	});
}

// LEVEL WISE DETAILS

function buildlevelWiseDetails(divId){	
	var collapse='';
	for(var i in locationArr){
		collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+locationArr[i].name+'">';
				if(i == 0){
					collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+locationArr[i].name+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'">';
				}else{
					collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+locationArr[i].name+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'">';
				}	
						collapse+='<h4 class="panel-title text-capital">'+locationArr[i].name+' level overview</h4>';
								
					collapse+='</a>';
				collapse+='</div>';
				
				if(i == 0){
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'">';
				}else{
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'">';
				}
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';						
							collapse+='<div class="col-sm-12 m_top10">'
								collapse+='<div id="'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'Details"></div>';								
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';		
	}
	$("#keyPrioritiesLocationWiseDetailsDivId").html(collapse);
	for(var i in locationArr){
		getLevelWiseComponentDetails(locationArr[i].name,locationArr[i].id,2,2);		
		
	}
}

function getLevelWiseComponentDetails(SublocationType,cols,deptId,componentId){	
	$('#keyPrior'+SublocationType+'Details').html(spinner)	;
	var json={
		locationType : globalLocType, //menu 
		locationId : globalLocId,
		sublocaType  : SublocationType, // locationArr
		deptId : deptId,
		componentId : componentId,
		type : globalBuildType
	}
	$.ajax({                
	type:'POST',    
	url: 'getLevelWiseComponentDetailsNew',//'getLevelWiseComponentDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){			
			buildlevelWiseComponentDetails(result,SublocationType,cols);
		}else{	
			$('#keyPrior'+SublocationType+'Details').html(NODATAMSG);
		}
	});
}

function buildlevelWiseComponentDetails(result,locationType,cols){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_default2 m_top10" id="keyPrior'+locationType+'DataTable" style="width:100%">';
			str+='<thead>';
				str+='<tr>';
					if(locationType != "District"){
						str+='<th rowspan="2">District</th>';
					}if(locationType == "Mandal"){
						str+='<th rowspan="2">constituency</th>';
					}
					str+='<th rowspan="2">'+locationType+'</th>';

					for(var i in result[0].subList){
						if(i == 0){
							str+='<th colspan="3" class="bg_KP_overall">overall</th>';
						}else if(i== 1){
							str+='<th colspan="3" class="bg_KP_ytd">'+result[0].subList[i].name+'</th>';
						}else if(i== 2){
							str+='<th rowspan="2" class="bg_KP_spillOver">'+result[0].subList[i].name+'</th>';
						}else{
							if(globalBuildType == "Monthly"){
								str+='<th colspan="2">'+result[0].subList[i].name+'</th>';
							}else{
								str+='<th colspan="2">'+result[0].subList[i].name+'<p>'+result[0].subList[i].fromDateFormat+'&nbsp;-&nbsp;'+result[0].subList[i].toDateFormat+'</p></th>';
							}
						}						
					}					
				str+='</tr>';
				str+='<tr>';
					str+='<th class="bg_KP_overall">Target</th>';
					str+='<th class="bg_KP_overall">Achievement</th>';
					str+='<th class="bg_KP_overall"><div style="width: 100px">%</div></th>';
					str+='<th class="bg_KP_ytd">Target</th>';
					str+='<th class="bg_KP_ytd">Achievement</th>';
					str+='<th class="bg_KP_ytd"><div style="width: 100px">%</div></th>';
				for(var i in result[0].subList){					
					if(i > 2) {
						str+='<th>Achievement</th>';
						str+='<th>%</th>';
					}
				}	
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';						
						str+='<td class="fixedColCls" style="text-align: left !important;">'+result[i].districtName+'</td>';
						if(locationType != "District"){
							str+='<td class="fixedColCls" style="text-align: left !important;">'+result[i].constituencyName+'</td>';
						}if(locationType == "Mandal"){
							str+='<td class="fixedColCls" style="text-align: left !important;">'+result[i].mandalName+'</td>';
						}
						//str+='<td>'+result[i].target+'</td>';
						
						for(var j in result[i].subList){
							if(result[i].subList[j].id != null && result[i].subList[j].id == 0){
								str+='<td class="bg_KP_overall">'+getValues(Math.round(parseFloat(result[i].subList[j].target)))+'</td>';
								str+='<td class="bg_KP_overall">'+getValues(parseFloat(result[i].subList[j].completed).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
								str+=getPercentageWithArrows(result[i].subList[j].percentage,"bg_KP_overall");								
							}else if(result[i].subList[j].id != null && result[i].subList[j].id == 13){
								str+='<td class="bg_KP_ytd">'+getValues(Math.round(parseFloat(result[i].subList[j].weeklyTarget)))+'</td>';
								str+='<td class="bg_KP_ytd">'+getValues(parseFloat(result[i].subList[j].completed).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
								str+=getPercentageWithArrows(result[i].subList[j].percentage,"bg_KP_ytd");
							}else if(result[i].subList[j].id != null && result[i].subList[j].id == 14){
								str+='<td class="bg_KP_spillOver">'+getValues(parseFloat(result[i].subList[j].percentage).toFixed(2))+'</td>';								
							}else{
								str+='<td>'+getValues(parseFloat(result[i].subList[j].completed).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
								str+= getPercentageWithArrows(result[i].subList[j].percentage,"");	
							}						
							
						}									
					str+='</tr>';
				}
				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';	
	$('#keyPrior'+locationType+'Details').html(str);
	initializeDataTable('keyPrior'+locationType+'DataTable');
	$("#keyPrior"+locationType+"DataTable").tableHeadFixer({"head" : false, "left" : 1});
	
	
}
 
 // DEPARTMENTS SELECT BOX
function getAllGovtDepartments(divId){		
	var json={
		
	}
	$.ajax({                
	type:'POST',    
	url: 'getAllGovtDepartments',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){			
			buildSelectBox(result,divId);
		}else{	
			
		}
	});
}

// COMPONENT WISE SELECT BOX
function getComponentsByDepartmentId(divId,deptId){		
	var json={
		deptId : deptId,
	}
	$.ajax({                
	type:'POST',    
	url: 'getComponentsByDepartmentId',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){			
			buildSelectBox(result,divId);
		}else{	
			
		}
	});
}

function buildSelectBox(result,divId){	
	$("#"+divId).empty().trigger("chosen:updated");
	if(divId == "componentCompareDepartment"){
		$("#"+divId).append('<option value="0" selected>All</option>');
	}
	for(var i in result){
		if(i == 0 && divId != "componentCompareDepartment"){
			$("#"+divId).append('<option value="'+result[i].id+'" selected>'+result[i].name+'</option>');
		}else{
			$("#"+divId).append('<option value="'+result[i].id+'">'+result[i].name+'</option>');
		}
		
	}
	$("#"+divId).trigger("chosen:updated");	
}

// Combined View
function getComponentWiseDistrictWiseDetails(){	
	$("#KPComponentsDistrictComparisionDivId").html(spinner)
	var json={
		locationType : globalLocType,
		locationId : globalLocId,
		type : globalBuildType //Monthly , Weekly
	}
	$.ajax({                
	type:'POST',    
	url: 'getComponentWiseDistrictWiseDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){			
			buildComponentWiseDistrictWiseDetails(result);
		}else{	
			$("#KPComponentsDistrictComparisionDivId").html(NODATAMSG)
		}
	});
}

function buildComponentWiseDistrictWiseDetails(result){
	var str  = '';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_default2 m_top10" id="componentWiseKeyPrior'+globalBuildType+'DistrictComparisionDataTable" style="width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="3">Department</th>';
					str+='<th rowspan="3"><div style="width:150px;">Component</div></th>';
					str+='<th colspan="3" class="bg_KP_overall">OverAll</th>';
					str+='<th rowspan="3" class="bg_KP_ytd" title="Percentage Based on Yet To Date Target">% on YTD Target</th>';
					str+='<th rowspan="3" class="bg_KP_spillOver">spill over %</th>';
					for(var i in result[0].districtList){
						var length = 5+(result[0].districtList[i].subList.length*2);
						str+='<th colspan="'+length+'">'+result[0].districtList[i].districtName+'</th>';
					}					
				str+='</tr>';
				str+='<tr>';
					str+='<th rowspan="2" class="bg_KP_overall">Target</th>';
					str+='<th rowspan="2" class="bg_KP_overall">Achievement</th>';
					str+='<th rowspan="2" class="bg_KP_overall">%</th>';					
					for(var i in result[0].districtList){
						str+='<th colspan="3" class="bg_KP_overall">Overall</th>';
						str+='<th rowspan="2" class="bg_KP_ytd" title="Percentage Based on Yet To Date Target">% on YTD Target</th>';
						str+='<th rowspan="2" class="bg_KP_spillOver">spill over %</th>';
						for(var k in result[0].districtList[i].subList){
							str+='<th colspan="2" style="background-color:#f2f2f2;">'+result[0].districtList[i].subList[k].name+'<br/>('+result[0].districtList[i].subList[k].fromDate+' to '+result[0].districtList[i].subList[k].toDate+')</th>';
						}
					}
				str+='</tr>';					
				str+='<tr>';
					for(var i in result[0].districtList){
						str+='<th class="bg_KP_overall">Target</th>';
						str+='<th class="bg_KP_overall">Achievement</th>';
						str+='<th class="bg_KP_overall">%</th>';
						for(var k in result[0].districtList[i].subList){
							str+='<th style="background-color:#f2f2f2;">Achievement</th>';
							str+='<th style="background-color:#f2f2f2;">%</th>';
							/* str+='<th style="background-color:#f2f2f2;">Achievement</th>';
							str+='<th style="background-color:#f2f2f2;">%</th>'; */
						}
					}
					
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td class="fixedColCls">'+result[i].departmentName+'</td>';
						str+='<td class="fixedColCls">'+result[i].componentName+'</td>';
						str+='<td class="bg_KP_overall">'+getValues(Math.round(parseFloat(result[i].overAllTarget)))+'</td>';
						str+='<td class="bg_KP_overall">'+getValues(parseFloat(result[i].achievement).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
						str+=getPercentageWithArrows(result[i].percOnOverAllTarget,"bg_KP_overall");
						str+=getPercentageWithArrows(result[i].percOnAsofTodayTarget,"bg_KP_ytd");
						str+=getPercentageWithArrows(result[i].spillOverPerc,"bg_KP_spillOver");
						for(var j in result[i].districtList){
							str+='<td class="bg_KP_overall">'+getValues(Math.round(result[i].districtList[j].overAllTarget))+'</td>';
							str+='<td class="bg_KP_overall">'+getValues(parseFloat(result[i].districtList[j].achievement).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
							str+=getPercentageWithArrows(result[i].districtList[j].percOnOverAllTarget,"bg_KP_overall");
							str+=getPercentageWithArrows(result[i].districtList[j].percOnAsofTodayTarget,"bg_KP_ytd");
							str+=getPercentageWithArrows(result[i].districtList[j].spillOverPerc,"bg_KP_spillOver");
							if(result[i].districtList[j].subList != null && result[i].districtList[j].subList.length >0){
								for(var k in result[i].districtList[j].subList){
									str+='<td>'+getValues(parseFloat(result[i].districtList[j].subList[k].achievement).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'))+'</td>';
									str+=getPercentageWithArrows(result[i].districtList[j].subList[k].percOnOverAllTarget,"");
								}
							}else{
								str+='<td>-</td>';
								str+='<td>-</td>';
								str+='<td>-</td>';
								str+='<td>-</td>';
							}
							
						}
					str+='</tr>';
				}				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	
	$("#KPComponentsDistrictComparisionDivId").html(str);
	initializeDataTable('componentWiseKeyPrior'+globalBuildType+'DistrictComparisionDataTable');
	$("#componentWiseKeyPrior"+globalBuildType+"DistrictComparisionDataTable").tableHeadFixer({"head" : false, "left" : 2});
}
/*
 CLICKS
=============================
*/

 // DEPARTMENT ON CHANGE  -- (COMPONENT COMPARISION)
  $(document).on("change","#componentCompareDepartment",function(){
	var deptId = $(this).val();
	getComponentWiseComparisonDetails(deptId);
	
 });
 
 // DEPARTMENT ON CHANGE  -- (COMPONENT ANALYSIS)
 $(document).on("change","#componentAnalysisDepartment",function(){
	var deptId = $(this).val();
	$("#componentDivId").html("");	
	getComponentsByDepartmentId("componentDivId",deptId)
	
 });
 
  // SUBMIT  -- (COMPONENT ANALYSIS)
$(document).on("click",".CASubmit",function(){
	var	deptId = $("#componentAnalysisDepartment").val(),
		componentId = $("#componentDivId").val();
		//getComponentAnalysisDetails(deptId,componentId);
		for(var i in locationArr){
		getLevelWiseComponentDetails(locationArr[i].name,locationArr[i].id,deptId,componentId);
	}
});

 // DEPARTMENT ON CHANGE  -- (LOCATION WISE)	
 $(document).on("change","#locationDepartment",function(){
	var deptId = $(this).val();
	$("#locationComponentDivId").html("");	
	getComponentsByDepartmentId("locationComponentDivId",deptId);	 
	
 });
 
/*   // SUBMIT  -- (LOCATION WISE)
$(document).on("click",".LOCSubmit",function(){
	var	deptId = $("#locationDepartment").val(),
		componentId = $("#locationComponentDivId").val();
	for(var i in locationArr){
		getLevelWiseComponentDetails(locationArr[i].name,deptId,componentId);
	}		
}); */

$(document).on("click",".tabCls",function(){	
	$('.sub-tab').toggle();
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
});

$(document).on("click",".workComparisionCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");	
	globalBuildType = $(this).data("type")
	if(globalBuildType =="Monthly"){
		$(".weeklyNoteCls").hide();
	}else if(globalBuildType =="Weekly"){
		$(".weeklyNoteCls").show();
	}
	onloadcalls();
})

function getValues(value){
	if(isNaN(value)){
		if (value != null &&  value.trim().length > 0) {
			return value
		} else {
			return "-";
		}
	}else{
		if (value != null &&  value > 0) {
			return value
		} else {
			return "-";
		}
	}
}
function initializeDataTable(divId){
	var paging = true;
	var info = true;
	if(divId =="dataTableExpendDistrictWise" || divId =="dataTableTimlyDistrictWise"){
		paging = false;
		info = false;
	}
	$('#'+divId).dataTable({
		"iDisplayLength": 13,
		"aaSorting": [],
		"paging" : paging,
		"info" : info,
		"aLengthMenu" : true,
		"aLengthMenu": [[13,20,25,50, -1], [13,20,25,50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				//extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o generateExcelcdfdf" attr_id="'+divId+'" title="Excel"></i>',
				//titleAttr: 'CSV',
			}
		]
	});
}

$(document).on("click",".generateExcelcdfdf",function(){
	var id = $(this).attr("attr_id");
	tableToExcel(id, 'MGREGS Key Priorities');
});

$(document).on("click",".show-view",function(){	
	var $this = $(this);
	if($this.text() == 'Click to more'){
		$this.html('Click for less');
		$this.addClass("active");
		$(".show-details").addClass("active");
	}else if($this.text() == 'Click for less'){
		$this.html('Click to more');
		$(".show-details").removeClass("active");
		$this.removeClass("active");
	}
});

function getPercentageWithArrows(percentage,bgCls){
	var str=''
	if(percentage != null && percentage >= 100 && percentage >0){
		str='<td class="text-success '+bgCls+'">'+parseFloat(percentage).toFixed(2)+'</td>';		
		
	}else if(percentage != null && percentage >0 && percentage <100){
		str='<td class="text-danger '+bgCls+'">'+parseFloat(percentage).toFixed(2)+'</td>';		
	}else{
		str='<td class="'+bgCls+'">-</td>';		
	}
	return str;
}



function getStateLevelExpenditureOverviewDetails(){	
	$("#overAllExpenditureDts").html(spinner);
	var json={
		"fromDate":"24/08/2018",
		  "fromMonth":"201808",
		  "year":"2018-2019",
		  "toDate":"2018-10",
		  "fromDateStr":"2018-04",
		  "yearsStr":"2018",
		  "locationType":"state",
		  "locationIdStr":"-1",
		  "subLocation":"state"

	}
	$.ajax({                
	type:'POST',    
	url: 'getStateLevelExpenditureOverviewDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildStateLevelExpenditureOverviewDetails(result);
		}else{
			$("#overAllExpenditureDts").html("No Data Available");
		}	
	});
}	

function buildStateLevelExpenditureOverviewDetails(result){
	var str='';
	
		str+='<div class="row">';
			str+='<div class="col-sm-2 m_top10">';
				str+='<div class="pad_bg">';
					str+='<h5 class="text-center font_weight">TOTAL<br/>DEPARTMENTS</h5>';
					str+='<div class="row">';
						str+='<div class="pad_bg_white m_top20">';
							str+='<h4 class="font_weight text-center">'+result.count+'</h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-7 m_top10">';
				str+='<div class="row">';
					str+='<div class="col-sm-4">';
						str+='<div class="pad_10_bg">';
							str+='<h5 class="font_weight">THIS WEEK</h5>';
							str+='<h4 class="text-center m_top20">Total - <span class="font_weight">'+result.weeklyExp+'</span></h4>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 m_top20">';
									str+='<div class="pad_yash_10">';
										str+='<div class="row">';
											str+='<div class="col-sm-12">';
												str+='<h5 class="text-center font_weight">Wage</h5>';
												str+='<h5 class="text-center font_weight m_top5">'+result.weeklyExpWage+' <small class="color_green font_weight">'+result.weeklyWagePerc+'%</small></h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-6 m_top20">';
									str+='<div class="pad_yash_10">';
										str+='<div class="row">';
											str+='<div class="col-sm-12">';
												str+='<h5 class="text-center font_weight">Material</h5>';
												str+='<h5 class="text-center font_weight m_top5">'+result.weeklyExpMat+' <small class="color_green font_weight">'+result.weeklyMatPerc+'%</small></h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="col-sm-4">';
						str+='<div class="pad_10_bg">';
							str+='<h5 class="font_weight">THIS MONTH</h5>';
							str+='<h4 class="text-center m_top20">Total   <span class="font_weight">'+result.monthlyExp+'</span></h4>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 m_top20">';
									str+='<div class="pad_yash_10">';
										str+='<div class="row">';
											str+='<div class="col-sm-12">';
												str+='<h5 class="text-center font_weight">Wage</h5>';
												str+='<h5 class="text-center font_weight m_top5">'+result.monthlyExpWage+' <small class="color_green font_weight">'+result.monthlyWagePerc+'%</small></h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-6 m_top20">';
									str+='<div class="pad_yash_10">';
										str+='<div class="row">';
											str+='<div class="col-sm-12">';
												str+='<h5 class="text-center font_weight">Material</h5>';
												str+='<h5 class="text-center font_weight m_top5">'+result.monthlyExpMat+'  <small class="color_green font_weight">'+result.monthlyMatPerc+'%</small></h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="col-sm-4">';
						str+='<div class="pad_10_bg">';
							str+='<h5 class="font_weight">TILL THIS YEAR</h5>';
							str+='<h4 class="text-center m_top20">Total   <span class="font_weight">'+result.yearlyExp+'</span></h4>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 m_top20">';
									str+='<div class="pad_yash_10">';
										str+='<div class="row">';
											str+='<div class="col-sm-12">';
												str+='<h5 class="text-center font_weight">Wage</h5>';
												str+='<h5 class="text-center font_weight m_top5">'+result.yearlyExpWage+' <small class="color_green font_weight">'+result.yearlyWagePerc+'%</small></h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-6 m_top20">';
									str+='<div class="pad_yash_10">';
										str+='<div class="row">';
											str+='<div class="col-sm-5">';
												str+='<h5 class="text-center font_weight">Material</h5>';
												str+='<h5 class="text-center font_weight m_top5">'+result.yearlyExpMat+'  <small class="color_green font_weight">'+result.yearlyMatPerc+'%</small></h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div class="pad_10_bg_yash">';
					str+='<div class="row">';
						str+='<div class="col-sm-8">';
							str+='<h5 class="font_weight text-center m_top15">AVILABLE <br/>MATERIAL BALANCE</h5>';
						str+='</div>';
						str+='<div class="col-sm-4">';
							str+='<div class="pad_bg_white">';
								str+='<h4 class="font_weight text-center">'+result.materialAvail+'</h4>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="pad_10_bg_yash m_top5">';
					str+='<div class="row">';
						str+='<div class="col-sm-8">';
							str+='<h5 class="font_weight text-center m_top15">FTO GENERATED <br/>WITH IN 3 DAYS</h5>';
						str+='</div>';
						str+='<div class="col-sm-4">';
							str+='<div class="pad_bg_green">';
								var ftogenerated = parseInt(result.ftogenerated);
								str+='<h4 class="font_weight text-center">'+ftogenerated.toFixed(2)+'</h4>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	
	
	$("#overAllExpenditureDts").html(str);
	
}
function getDepartmentWiseExpenditureDetails(){	
	$("#departmentwiseExpenditureDetailsDivId").html(spinner);
	var json={
	 "fromDate":"24/08/2018",
	  "fromMonth":"201808",
	  "year":"2018-2019",
	  "toDate":"2018-10",
	  "fromDateStr":"2018-04",
	  "yearsStr":"2018",
	  "locationType":"state",
	  "locationIdStr":"-1",
	  "subLocation":"state"
	}
	
	$.ajax({                
	type:'POST',    
	url: 'getDepartmentWiseExpenditureDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){	
			buildDepartmentWiseExpenditureDetails(result);
		}else{	
			$("#departmentwiseExpenditureDetailsDivId").html("No Data Available");
		}
	});
}	


function buildDepartmentWiseExpenditureDetails(result){
	var colorExpObj = {"HO":"#6a5acd","ITDA":"#008080","PR":"#6cc851","MCC": "#fd676c","Forest":"#fcb922","R & B Dept":"#db7093","AH":"#6a5acd","School Education Department":"#fd676c","WCC":"#6495ed"};
	var colorTableExpObj = {"This Week":"#F2A300","This Month":"#DA4B76","Till This Year":"#624F91","Available Material Balance": "#399ACD","FTO Generated With In 3 Days %":"#DA4A76"};
	var str = '';
		str+='<div class="row">';
			str+='<div class="col-sm-3 m_top10">';
				str+='<h5 class="pad_10_10 border_yash margin_bottom font_weight text-center" style="padding:28px;">Department</h5>';
				
				for(var i in result){
					var colorExAtr = result[i].departmentName
						colorExAtr = colorExAtr.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
					str+='<div class="row">';
						str+='<div class="col-sm-4">';
							str+='<div class="arrow_box"  attr_color="'+colorExAtr+'" style="z-index:1; background-color:'+colorExpObj[result[i].departmentName]+'">';
								str+='<div class="kp-h412">';
									str+='<h4 class="text-center font_weight getDeptWiseClickDts"  attr_name="'+result[i].departmentName+'" style="color:#fff;cursor:pointer;">'+result[i].count+'</h4>';	
									str+='<h4 class="text-center font_weight m_top5 f_12" style="color:#fff;">Components</h4>';	
								str+='</div>';
								
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-8">';
							str+='<div class="arrow_box_yash">';
								if(result[i].departmentName !=null && result[i].departmentName.length>8){
									str+='<h4 class="kp-h4" style="font-size:12px;color:#333;"><span class="tooltipCls" data-toggle="tooltip" title="'+result[i].departmentName+'">'+result[i].departmentName.substring(0,8)+'..</span></h4>';	
								}else{
									str+='<h4 class="kp-h4" style="font-size:12px;color:#333;">'+result[i].departmentName+'</h4>';	
								}
							str+='</div>';
							str+='</div>';
					str+='</div>';
				}
			str+='</div>';								
			str+='<div class="col-sm-9 m_top10">';
				str+='<div class="row">';			
					str+='<div class="col-sm-12">';									
						str+='<ul class="list-inline kpE-row sliderTableExpenditure">';
								var k = 0;
								for(var i in result){
									 if( k < result[i].subList.length){
										str+='<li>';
										  if(result[0].subList[k].name == "This Week" || result[0].subList[k].name == "This Month" || result[0].subList[k].name == "Till This Year"){
												str+='<div style="background-color:'+colorTableExpObj[result[0].subList[k].name]+' !important;padding:5px;">';
													str+='<h4 class="font_weight m_top5 color_white">'+result[0].subList[k].name+'</h4>';	
													str+='<div class="row">';
														str+='<div class="col-sm-4 m_top5">';
															str+='<h5 class="font_weight color_white">Wage</h5>';
														str+='</div>';
														str+='<div class="col-sm-4 m_top5">';
															str+='<h5 class="font_weight color_white">Material</h5>';
														str+='</div>';
														str+='<div class="col-sm-4 m_top5">';
															str+='<h5 class="font_weight color_white">Total</h5>';
														str+='</div>';
													str+='</div>';
													
												str+='</div>';
										  }else if(result[0].subList[k].name == "Available Material Balance"){
											  str+='<div style="background-color:'+colorTableExpObj[result[0].subList[k].name]+' !important;padding:20px;">';
												str+='<h4 class="font_weight color_white">Available <br/> Material Balance</h4>';	
											  str+='</div>';
										  }else{
											  str+='<div style="background-color:'+colorTableExpObj[result[0].subList[k].name]+' !important;padding:20px;">';
												str+='<h4 class="font_weight color_white">FTO Generated <br/> With In 3 Days %</h4>';	
											  str+='</div>';
										  }
											
										for(var m in result){
											 if(result[m].subList[k].name == "This Week" ||result[m].subList[k].name == "This Month" || result[m].subList[k].name == "Till This Year"){
												 str+='<div class="border_expend_css">';
													str+='<div class="row">';
														str+='<div class="col-sm-4">';
															str+='<h4 class="font_weight">'+result[m].subList[k].wage+'</h4>';
															str+='<p class="font_weight m_top5 f_12 color_green">'+result[m].subList[k].wagePerc+'%</p>';
														str+='</div>';
														str+='<div class="col-sm-4">';
															str+='<h4 class="font_weight">'+result[m].subList[k].material+'</h4>';
															str+='<p class="font_weight m_top5 f_12 color_green">'+result[m].subList[k].materialPerc+'%</p>';
														str+='</div>';
														str+='<div class="col-sm-4">';
															str+='<h4 class="font_weight f_12">'+result[m].subList[k].total+'</h4>';
														str+='</div>';
													str+='</div>';
												str+='</div>';
											 }else if(result[m].subList[k].name == "Available Material Balance"){
												str+='<div class="border_expend1_css">';
													str+='<h4 class="font_weight">'+result[m].subList[k].materialAvail+'</h4>';
												str+='</div>';
											 }else{
												str+='<div class="border_expend1_css">';
													 str+='<h4 class="font_weight">'+result[m].subList[k].ftogenerated+'</h4>';
												str+='</div>';
											 }
										}	
										k++;	
										str+='</li>';
										 
									
									} 
								}
								
								
											
						str+='</ul>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	$("#departmentwiseExpenditureDetailsDivId").html(str);
	$(".tooltipCls").tooltip();
	buildSlickE('sliderTableExpenditure');
	$('[attr_custom=key]').remove();
	var arrowExp = '';
	for(var i in result){
		var colorExAtr = result[i].departmentName
			colorExAtr = colorExAtr.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
		arrowExp+='[attr_color='+colorExAtr+']:after{border-left-color:'+colorExpObj[result[i].departmentName]+' !important}';
	}
	$('head').append("<style type='text/css' attr_custom='key'>"+arrowExp+"</style>");
}
function buildSlickE(className){
		$('.'+className).slick({
		  slides:'li',
		  infinite: false,
		  speed: 300,
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  variableWidth: true,
		  responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
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
$(document).on("click",".districtWiseExpTimelyDtsCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var levelType = $(this).attr('attr_type');
	$('#expendTimPaymenttitId').html(levelType);
	var tableId = $(this).attr('attr_table_id');
	$('.expendPaymentShowHideCls').hide();
	$('#'+tableId).show();
	//getDistrictWiseExpenditureDetails(levelType,tableId);
});

function getDistrictWiseExpenditureDetails(levelType,tableId){
	$("#"+tableId).html(spinner);
	if(levelType == "Expenditure"){
		var json={
			"fromDate" : "05/10/2018",
			"fromMonth" : "201810",
			"year" : "2018-2019",
			"type" : levelType
		}
	}else{
		var json={
			"fromDate" : "2018-04",
			"toDate" : "2018-10",
			"year" : "2018",
			"locationType" : "state",
			"locationId" : "-1",
			"sublocaType":  "district",
			"type" : levelType
		}
	}
	$.ajax({                
	type:'POST',    
	url: 'getDistrictWiseExpenditureDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length>0){
			if(levelType == "Expenditure"){
				buildDistrictWiseExpenditureDetails(result,tableId);
			}else{
				buildDistrictWiseTimlyDetails(result,tableId);
			}
		}else{
			$("#"+tableId).html("No Data Available");
		}
	});
}	

function buildDistrictWiseTimlyDetails(result,tableId){
	var table='';
		table+='<div class="row m_top20">';
			table+='<div class="col-sm-12">';
				table+='<div class="table-responsive">';
					table+='<table class="table table-bordered table_custom_SC" id="dataTableTimlyDistrictWise" style="width:100%">';
						table+='<thead>';
							table+='<tr>';
								table+='<th rowspan="2">District Name</th>';
								table+='<th colspan="9">% FTO Generated With 3 Days</th>';
							table+='</tr>';
							table+='<tr>';
								table+='<th>HO</th>';
								table+='<th>ITDA</th>';
								table+='<th>PR</th>';
								table+='<th>MCC</th>';
								table+='<th>Forest</th>';
								table+='<th>SERP</th>';
								table+='<th>Animal Husbandary</th>';
								table+='<th>School Education Department</th>';
								table+='<th>WCC</th>';
							table+='</tr>';
						table+='</thead>';
						table+='<tbody>';
							for(var i in result){
								table+='<tr>';
									table+='<td class="" style="text-align:left !important;" attr_name="'+result[i].name+'">'+result[i].name+'</td>';
									
									if(result[i].ho !=null && result[i].ho>0){
										if(result[i].ho >= 90 && result[i].ho <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].ho+'</span></td>';
										}else if(result[i].ho >= 60 && result[i].ho < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].ho+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].ho+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
									
									if(result[i].itda !=null && result[i].itda>0){
										if(result[i].itda >= 90 && result[i].itda <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].itda+'</span></td>';
										}else if(result[i].itda >= 60 && result[i].itda < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].itda+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].itda+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
									
									if(result[i].pr !=null && result[i].pr>0){
										if(result[i].pr >= 90 && result[i].pr <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].pr+'</span></td>';
										}else if(result[i].pr >= 60 && result[i].pr < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].pr+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].pr+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
									
									if(result[i].mcc !=null && result[i].mcc>0){
										if(result[i].mcc >= 90 && result[i].mcc <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].mcc+'</span></td>';
										}else if(result[i].mcc >= 60 && result[i].mcc < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].mcc+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].mcc+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
									
									if(result[i].forest !=null && result[i].forest>0){
										if(result[i].forest >= 90 && result[i].forest <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].forest+'</span></td>';
										}else if(result[i].forest >= 60 && result[i].forest < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].forest+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].forest+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
									
									if(result[i].serp !=null && result[i].serp>0){
										if(result[i].serp >= 90 && result[i].serp <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].serp+'</span></td>';
										}else if(result[i].serp >= 60 && result[i].serp < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].serp+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].serp+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
									
									if(result[i].ah !=null && result[i].ah>0){
										if(result[i].ah >= 90 && result[i].ah <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].ah+'</span></td>';
										}else if(result[i].ah >= 60 && result[i].ah < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].ah+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].ah+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
									
									if(result[i].schoolEducation !=null && result[i].schoolEducation>0){
										if(result[i].schoolEducation >= 90 && result[i].schoolEducation <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].schoolEducation+'</span></td>';
										}else if(result[i].schoolEducation >= 60 && result[i].schoolEducation < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].schoolEducation+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].schoolEducation+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
									
									if(result[i].wcc !=null && result[i].wcc>0){
										if(result[i].wcc >= 90 && result[i].wcc <= 100){
											table+='<td><span  style="background-color:#00AF50;color:#fff;padding:5px;border-radius:3px;">'+result[i].wcc+'</span></td>';
										}else if(result[i].wcc >= 60 && result[i].wcc < 90){
											table+='<td><span  style="background-color:#ff6600;color:#fff;padding:5px;border-radius:3px;">'+result[i].wcc+'</span></td>';
										}else{
											table+='<td><span  style="background-color:#FF0000;color:#fff;padding:5px;border-radius:3px;">'+result[i].wcc+'</span></td>';
										}
										
									}else{
										table+='<td> - </td>';
									}
								table+='</tr>';
							}
						table+='</tbody>';
					table+='</table>';
				table+='</div>';
			table+='</div>';
		table+='</div>';
	$("#"+tableId).html(table);
	initializeDataTable("dataTableTimlyDistrictWise");
	$("#dataTableTimlyDistrictWise").tableHeadFixer({"head" : false, "left" : 1});
	
}
function buildDistrictWiseExpenditureDetails(result,tableId){
	var table='';
		table+='<div class="row m_top20">';
			table+='<div class="col-sm-12">';
				table+='<div class="table-responsive">';
					table+='<table class="table table-bordered table_custom_SC tableGrey" id="dataTableExpendDistrictWise" style="width:100%">';
						table+='<thead>';
							table+='<tr>';
								table+='<th rowspan="4">District Name</th>';
							table+='</tr>';
							table+='<tr>';
							for(var i in result[0].subList){
								table+='<th  colspan="10">'+result[0].subList[i].name+'</th>';
								
							}
							table+='</tr>';
							table+='<tr>';
							for(var i in result[0].subList){
								table+='<th   colspan="3">This week</th>';
								table+='<th  colspan="3">This Month</th>';
								table+='<th  colspan="3">This year</th>';
								table+='<th  colspan="1">avilable</th>';
							}
							table+='</tr>';
							table+='<tr>';
							for(var i in result[0].subList){	
								table+='<th>Wage</th>';
								table+='<th>Meterial</th>';
								table+='<th>Total</th>';
								table+='<th>Wage</th>';
								table+='<th>Meterial</th>';
								table+='<th>Total</th>';
								table+='<th>Wage</th>';
								table+='<th>Meterial</th>';
								table+='<th>Total</th>';
								table+='<th>Meterial Balance</th>';
							}
							table+='</tr>';
						table+='</thead>';
						table+='<tbody>';
						for(var i in result){
							table+='<tr>';
								table+='<td class="" style="text-align:left !important;" attr_name="'+result[i].name+'">'+result[i].name+'</td>';
								for(var j in result[i].subList){
									table+='<td>'+emptyCheckWithString(result[i].subList[j].weekWage)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].weekMaterial)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].weekTotal)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].monthWage)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].monthMaterial)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].monthTotal)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].yearWage)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].yearMaterial)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].yearTotal)+'</td>';
									table+='<td>'+emptyCheckWithString(result[i].subList[j].availMaterial)+'</td>';
								}
							table+='</tr>';
						}
						table+='</tbody>';
					table+='</table>';
				table+='</div>';
			table+='</div>';
		table+='</div>';
		
	$("#"+tableId).html(table);
	initializeDataTable("dataTableExpendDistrictWise");
	$("#dataTableExpendDistrictWise").tableHeadFixer({"head" : false, "left" : 1}); 
	
}

$(document).on("click",".getDeptWiseClickDts",function(){
	var deptName = $(this).attr("attr_name");
	$("#deptHeadingId").html(deptName+" Department Component Details");
	$("#deptWiseModalId").modal("show");
	
	getComponentWiseDetailsbyDepartment(deptName);
	
});
function getComponentWiseDetailsbyDepartment(deptName){	
	$("#deptWiseDtsDivId").html(spinner);
	var json={
	  "fromDate":"24/08/2018",
	  "fromMonth":"201808",
	  "year":"2018-2019",
	  "toDate":"2018-10",
	  "fromDateStr":"2018-04",
	  "yearsStr":"2018",
	  "locationType":"state",
	  "locationIdStr":"-1",
	  "subLocation":"state",
	  "deptType":deptName
	}
	$.ajax({                
	type:'POST',    
	url: 'getComponentWiseDetailsbyDepartment',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildComponentWiseDetailsbyDepartment(result);
		}else{
			$("#deptWiseDtsDivId").html("No Data Available");
		}
	});
}	

function buildComponentWiseDetailsbyDepartment(result){
	var table='';
		table+='<div class="row">';
			table+='<div class="col-sm-12">';
				table+='<div class="table-responsive m_top10">';
					table+='<table class="table table-bordered tableGrey table_custom_SC">';
						table+='<thead>';
							table+='<tr>';
								table+='<th rowspan="2">Work Name</th>';
								table+='<th colspan="3">This Week</th>';
								table+='<th colspan="3">This Month</th>';
								table+='<th colspan="3">Till THis Year</th>';
								table+='<th rowspan="2">Available Meterial Balance</th>';
							table+='</tr>';
							table+='<tr>';
								table+='<th>Wage</th>';
								table+='<th>Material</th>';
								table+='<th>Total</th>';
								table+='<th>Wage</th>';
								table+='<th>Material</th>';
								table+='<th>Total</th>';
								table+='<th>Wage</th>';
								table+='<th>Material</th>';
								table+='<th>Total</th>';
							table+='</tr>';
						table+='</thead>';
						table+='<tbody>';
							for(var i in result){
								
								table+='<tr>';
									table+='<td  style="text-align:left !important;">'+result[i].name+'</td>';
									if(result[i].weeklyExpWage != null && result[i].weeklyExpWage > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].weeklyExpWage+'<br><span class="text-success f_12">'+result[i].weeklyWagePerc +'</span></h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].weeklyExpMat != null && result[i].weeklyExpMat > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].weeklyExpMat+'<br><span class="text-success f_12">'+result[i].weeklyMatPerc +'</span></h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].weeklyExp != null && result[i].weeklyExp > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].weeklyExp+'</h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].monthlyExpWage != null && result[i].monthlyExpWage > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].monthlyExpWage+'<br><span class="text-success f_12">'+result[i].monthlyWagePerc +'</span></h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].monthlyExpMat != null && result[i].monthlyExpMat > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].monthlyExpMat+'<br><span class="text-success f_12">'+result[i].monthlyMatPerc +'</span></h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].monthlyExp != null && result[i].monthlyExp > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].monthlyExp+'</h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].yearlyExpWage != null && result[i].yearlyExpWage > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].yearlyExpWage+'<br><span class="text-success f_12">'+result[i].yearlyWagePerc +'</span></h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].yearlyExpMat != null && result[i].yearlyExpMat > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].yearlyExpMat+'<br><span class="text-success f_12">'+result[i].monthlyMatPerc +'</span></h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].yearlyExp != null && result[i].yearlyExp > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].yearlyExp+'</h5></td>';
									}else{
										table+='<td>-</td>';
									}
									if(result[i].materialAvail != null && result[i].materialAvail > 0){
										table+='<td><h5 class="pad_light_yash_bg font_weight">'+result[i].materialAvail+'</h5></td>';
									}else{
										table+='<td>-</td>';
									}
								table+='</tr>';
							}
						table+='</tbody>';
					table+='</table>';
				table+='</div>';
			table+='</div>';
		table+='</div>';
	$("#deptWiseDtsDivId").html(table);
}

 function emptyCheckWithString(filedValue){
	var returnVal = ' - ';
	if( filedValue !=null && filedValue.trim() > 0){
		returnVal = filedValue;
	}
	return returnVal;
}
