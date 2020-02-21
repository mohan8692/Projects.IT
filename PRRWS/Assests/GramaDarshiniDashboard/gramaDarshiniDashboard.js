var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>',
tabArr = [{name: 'Nodal Officers'}, {name: 'Scheduled/Visits'}, {name: 'Grievances'}, {name: 'Schemes' }];
locationWiseArr = [{name:'District'},/* {name:'Constituency'} , {name:'Mandal'} , {name:'Panchayath'}*/],
fromDateStr=moment().subtract(15, 'years').startOf('year').format("DD-MM-YYYY"),
toDateStr=moment().format("DD-MM-YYYY"),globalLocId = "0" ,globalLocType = "State";
//nprYear ="2018",
//partnershipYear ="2018";
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
	$(".menuCls-table2").hide();
});

/* $(document).on("click",function(){
	$(".menu-data-cls").hide();
	$(".menuCls-table2").hide();
});
$("#dateRangePicker").daterangepicker({
    opens: 'left',
    startDate: fromDateStr,
    endDate: toDateStr,
    locale: {
    format: 'DD-MM-YYYY' 
  } ,
  ranges: {
   // 'All':[overallDaterangePicker()],
    'Today' : [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'This Year': [moment().startOf('Year'), moment()],
    'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
	'OverAll':[moment().subtract(15, 'years').startOf('year').format("DD-MM-YYYY"), moment().format("DD-MM-YYYY")]
  }
  }); 
  
$('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
	currentfromdate = picker.startDate.format('DD-MM-YYYY');
	currentToDate = picker.endDate.format('DD-MM-YYYY');
	if(picker.chosenLabel == 'OverAll')
	{
		$("#dateRangePicker").val('OverAll');
	}
	
	onloadCalls();
}); */
/* $(document).on("click","#selectedName,#selectedName1",function(e){
	e.stopPropagation();
	$(".multi-level-selection-menu").show();
});
$(document).on("click","#selectedName,#selectedName1",function(){
	$(".arrowIconChanged").parent().find('i.fa').removeClass("fa-chevron-down");
	$(".arrowIconChanged").parent().find('i.fa').addClass("fa-chevron-up");
}); */

//buildGrievancesBlockDetails();
//buildGrievancesRowDetails();
//buildGrievancesTableDetails();
/* $(document).on("click",".menuDataCollapse",function(){
	globalLocId = $(this).attr("attr_id");
	var levelId = $(this).attr("attr_levelIdValue");	
	$("#selectedName").text($(this).html());
	$("#selectedName").attr("attr_levelid",levelId);
	$("#selectedName").attr("attr_id",globalLocId);	
					
	if(levelId == 2){
		globalLocType = 'State';
		locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}else if(levelId == 3){
		globalLocType = 'District';	
		locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}else if(levelId == 4){
		globalLocType = 'Constituency';
		locationArr =[{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}
	
	onloadcalls();
}) */
onloadCalls();
function onloadCalls(){
	//$(".chosen-single").chosen();
	buildGrievancesBlockDetails();
	//buildGrievancesRowDetails();
	getGramaDarshiniOverViewDetails();
	getGrievancesDetails();
	getGramaDarshiniDepartments();
	//getGrievancesDatabyType("subIssue","","10");
	getGramaDarshiniOfficerOverViewDetails();
	locationWiseData();
	getGramaDarshiniLocationLevelWiseDetails();
	//buildTrendingGraphDetails();
}

function getGramaDarshiniOverViewDetails(){
	$("#overviewId").html(spinner);
	json={
		typeId : "1",
		fromDate : fromDateStr,
		toDate : toDateStr,
		locationType :globalLocType,
		locationId:globalLocId
	}
	$.ajax({
		type:'POST',
		url:'getGramaDarshiniOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildOverviewDetails(result);
		}
	})	
}
function buildOverviewDetails(result){
	var str='';
		str+='<div class="row m_top10">';
			str+='<div class="col-sm-6 col-md-3 m_top10">';
				str+='<div class="white-block pad_5 border_yash" style="box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);">';
					str+='<div id="donutChartId" style="height: 213px;"></div>';
				str+='</div>';
			str+='</div>';
			// str+='<div class="col-sm-8">';
					// str+='<div class="row">';
						str+='<div class="col-sm-6 col-md-3 m_top10">';
							str+='<div class="white-block border_yash pad_10" style="box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);">';
								str+='<div class="media">';
									str+='<div class="media-left">';
										str+='<div class="media-object">';
											str+='<img src="Assests/images/Group 2928.png" style="width:60px;height:30px;"/>';
										str+='</div>';
									str+='</div>';
									str+='<div class="media-body">';
										str+='<div class="pull-right">';
											str+='<p class="font_weight m_top10 text-capital">Sheduled/Visits</p>';
										str+='</div>';
									str+='</div>';
								str+='</div>';	
								str+='<div class="m_top10" style="border-bottom: 1px solid #DBD5D5;"></div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-8">';
										str+='<p class="f_13 font_weight">Scheduled&nbsp;GP/Wards&nbsp;<i  style="color: #272E7E;"></i></p>';
									str+='</div>';
									str+='<div class="col-sm-4">';
										str+='<p class="font_weight f_13">'+result.scheduled+'</p>';
									str+='</div>';
									/* str+='<div class="col-sm-3">';
										str+='<h5 class="f_13 font_weight text-success">-%</h5>';
									str+='</div>'; */
								str+='</div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-8">';
										str+='<p class="f_13 font_weight text-left">Visited&nbsp;GP/Wards&nbsp;<i  m_left20" style="color: #272E7E;"></i></p>';
									str+='</div>';
									str+='<div class="col-sm-4">';
										str+='<p class="font_weight">'+result.visited+'</p>';
									str+='</div>';
									/* str+='<div class="col-sm-3">';
										str+='<p class="f_13 text-success font_weight">-%</p>';
									str+='</div>'; */
								str+='</div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-8">';
										str+='<p class="f_13 font_weight text-left">Files/Reports</p>';
									str+='</div>';
									str+='<div class="col-sm-4">';
										str+='<p class="font_weight">'+result.files+'</p>';
									str+='</div>';
								/* 	str+='<div class="col-sm-6">';
										str+='<p class="font_weight m_left10">'+result.files+'</p>';
									str+='</div>'; */
								str+='</div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-8">';
										str+='<p class="f_13 font_weight text-left" style="padding-bottom: 5px;">Upcomming/Schedule</p>';
									str+='</div>';
									str+='<div class="col-sm-4">';
										str+='<p class="font_weight f_13">-</p>';
									str+='</div>';
									/* str+='<div class="col-sm-6">';
										str+='<p class="font_weight m_left10">-</p>';
									str+='</div>'; */
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-6 col-md-3 m_top10">';
							str+='<div class="white-block border_yash pad_10" style="box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);">';
								str+='<div class="media">';
									str+='<div class="media-left">';
										str+='<div class="media-object">';
											str+='<img src="Assests/images/Total_Grievance_icon.png" style="width:60px;height:30px;"/>';
										str+='</div>';
									str+='</div>';
									str+='<div class="media-body">';
										str+='<div class="pull-right">';
											str+='<p class="font_weight m_top10 text-capital">Grievances</p>';
										str+='</div>';
									str+='</div>';
								str+='</div>';	
								str+='<div class="m_top10" style="border-bottom: 1px solid #DBD5D5;"></div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-6">';
										str+='<p class="f_13 font_weight text-left">Total</p>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<p class="font_weight">'+result.totalGps+'</p>';
									str+='</div>';
								str+='</div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-6">';
										str+='<p class="f_13 font_weight text-left">Individual</p>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<p class="font_weight">'+result.individualTotal+'<span class="f_13 text-success font_weight m_left20">'+result.individualPerc+'%</span></p>';
									str+='</div>';
									/* str+='<div class="col-sm-3">';
										str+='<p class="f_12 text-success font_weight">'+result.individualPerc+'%</p>';
									str+='</div>'; */
								str+='</div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-6">';
										str+='<p class="f_13 font_weight text-left">Community</p>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<p class="font_weight">'+result.communityTotal+'<span class="f_13 text-success font_weight m_left20">'+result.communityPerc+'%</span></p>';
									str+='</div>';
									/* str+='<div class="col-sm-3">';
										str+='<p class="f_12 text-success font_weight">'+result.communityPerc+'%</p>';
									str+='</div>'; */
								str+='</div>';
								str+='<div class="white-block border_yash border_radius_5 m_top10 pad_5" style="background-color: #FBF7F7 !important;">';
									str+='<div class="row">';
										str+='<div class="col-sm-6">';
											str+='<p class="f_13 font_weight text-left">Resolved</p>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<p class="font_weight">'+result.resolved+'<span class="f_13 text-success font_weight m_left20">'+result.resolvedPerc+'%</span></p>';
										str+='</div>';
										/* str+='<div class="col-sm-3">';
											str+='<h5 class="f_12 text-success font_weight">'+result.resolvedPerc+'%</h5>';
										str+='</div>'; */
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-6 col-md-3 m_top10">';
							str+='<div class="white-block border_yash pad_10" style="box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);">';
								str+='<div class="media">';
									str+='<div class="media-left">';
										str+='<div class="media-object">';
											str+='<img src="Assests/images/Layer 1 copy.png" style="width:60px;height:30px;"/>';
										str+='</div>';
									str+='</div>';
									str+='<div class="media-body">';
										str+='<div class="pull-right">';
											str+='<p class="font_weight m_top10 text-capital">Schemes</p>';
										str+='</div>';
									str+='</div>';
								str+='</div>';	
								str+='<div class="m_top10" style="border-bottom: 1px solid #DBD5D5;"></div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-6">';
										str+='<p class="f_13 font_weight text-left">Total appeal</p>';
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<p class="font_weight">'+result.schemes+'</p>';
									str+='</div>';
								str+='</div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-6">';
										str+='<p class="f_13 font_weight text-left">Self</p>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<p class="font_weight">-</p>';
									str+='</div>';
									/* str+='<div class="col-sm-3">';
										str+='<p class="f_12 text-success font_weight">-%</p>';
									str+='</div>'; */
								str+='</div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-6">';
										str+='<p class="f_13 font_weight text-left">Family</p>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<p class="font_weight">-</p>';
									str+='</div>';
									/* str+='<div class="col-sm-3">';
										str+='<p class="f_12 text-success font_weight">-%</p>';
									str+='</div>'; */
								str+='</div>';
								str+='<div class="white-block border_yash border_radius_5 m_top10 pad_5" style="background-color: #FBF7F7 !important;">';
									str+='<div class="row">';
										str+='<div class="col-sm-6">';
											str+='<p class="f_13 font_weight text-left">Govt&nbsp;Accepted</p>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<p class="font_weight">-</p>';
										str+='</div>';
										/* str+='<div class="col-sm-3">';
											str+='<p class="f_12 text-success font_weight">-%</p>';
										str+='</div>'; */
								str+='</div>';
							str+='</div>';
						str+='</div>';
					// str+='</div>';
				// str+='</div>';
			str+='</div>';
		str+='</div>';
	$("#overviewId").html(str);
	donutChart(result,"donutChartId");
}
function donutChart(result,divId) {
	var dataArr=[];
		dataArr.push({"name": "App Installed -<b>  "+result.appInstalled+"</b><span class='text-success font_weight m_left10'>  ("+result.appInstalledPerc+"%)</span>","y":parseFloat(result.appInstalledPerc)},
					 {"name": "App Not Installed -<b>  "+result.appNotInstalled+"</b><span class='text-danger font_weight m_left10'> ("+result.appNotInstalledPerc+"%)</span>","y":parseFloat(result.appNotInstalledPerc)});
	$('#'+divId).highcharts( {
		colors:['#AACA1F','#DDDFDD'],
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
			marginTop:-5
		},
		legend: {
			/* align: 'middle',
			verticalAlign: 'middle',
			layout: 'vertical',
			itemStyle: {
				fontSize:'12px',
			}, */
			useHTML: true
		},
		title: {
			verticalAlign: 'middle',
			floating: true,
			text: '<div class="row"><div class="col-sm-12" style="top: -45px; left: 5px;"><img src="Assests/images/Total_Users_icon.png" alt="" class="m_left10"/></div></div><div class="row"><div class="col-sm-12" style="top: -50px;"><h6 class="m_top5 font_weight">Nodal Officers</h6><h6 class="m_top5 font_weight text-center">'+result.totalOfficers+'</h6></div></div>',
			style: {
				fontSize:'12px',
				fontWeight: 'bold'
			},
			x:0,
			y:0,
			useHTML: true
		},
		tooltip: {
			enabled: false
		},
		credits:{
			enabled:false
		},
		plotOptions: {
			pie: {
				innerSize:'75%',
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					},
				}
			},
			series:{
				showInLegend:true
			}
		},
		series: [{
			data: dataArr
		}]
	});
}
function getGramaDarshiniOfficerOverViewDetails(){
		$("#tableId").html(spinner);
		json={
			typeId : "2",
		    fromDateStr : fromDateStr,
		    toDateStr : toDateStr,
			locationType :globalLocType,
			locationId:globalLocId
		}
	$.ajax({
		type:'POST',
		url:'getGramaDarshiniOfficerOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildTableDetails(result);
		}
	})	
}
function buildTableDetails(result){
	var str='';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="firstBlockDataTable" style="width: 100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Nodal Officer Level</th>';
						str+='<th>Officers</th>';
						str+='<th>App Installations</th>';
						str+='<th>%</th>';
						str+='<th>Scheduled GP/Wards</th>';
						str+='<th>Visited GP/Wards</th>';
						str+='<th>%</th>';
						str+='<th>Attached files/reports</th>';
						str+='<th>Upcomming/Schedule</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td>'+getValues(result[i].name)+'</td>';
							str+='<td>'+getValues(result[i].totalOfficers)+'</td>';
							str+='<td>'+getValues(result[i].appInstalled)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].appInstalledPerc)+'</td>';
							str+='<td>'+getValues(result[i].scheduled)+'</td>';
							str+='<td>'+getValues(result[i].visited)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].visitedPerc)+'</td>';
							str+='<td>'+getValues(result[i].files)+'<i class="m_left10 fa fa-file-pdf-o" style="color: #D2C4C4;"></i></td>';
							str+='<td>-</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		$("#tableId").html(str);
		$("#firstBlockDataTable").dataTable({
		"paging": false,
		"aaSorting": [],
		"ordering": true,
		"searching": false,
		"info":false,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "",
				filename:  ''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function buildTrendingGraphDetails(){
	$("#trendingVisitsGraphId").highcharts({
		chart: {
			type: 'line'
		},
		title: "",
		xAxis: {
			categories: ['Week - 1 <br> (1st Aug - 7th Aug)', 'Week - 2 <br> (8th Aug - 14th Aug)', 'Week - 3 <br> (15th Aug - 21th Aug)', 'Week - 4 <br> (22th Aug - 28th Aug)', 'Week - 5 <br> (29th Aug - 31th Aug)']
		},
		yAxis: {
		  title: {
				text: 'P a n c h a y a t s / W a r d s'
		  },
		},  
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
				enableMouseTracking: true
			}
		},
		legend: {
			enabled: false
		},	
		series: [{
			name: '',
			color: '#259ABC',
			data: [ 600, 400 , 800 , 400 , 200],
			 marker: {
				fillColor: 'white',
				lineWidth: 2,
				lineColor: '#68CEF3'
			}
		}]
	});
}
function buildGrievancesBlockDetails(){
	var str='';
	str+='<div class="li_blocks m_top10" style="border-spacing: 10px 0px;">';
		str+='<ul class="ulTabStyleCls blocksCls">';
			for(var i in tabArr){
				if(tabArr[i].name == "Grievances"){
					str+='<li class="active text-capital displayBlock" attr_name="'+tabArr[i].name+'"><div class="bordBottom">'+tabArr[i].name+'</div></li>';
				}else{
					str+='<li class="text-capital displayBlock" attr_name="'+tabArr[i].name+'"><div class="bordBottom">'+tabArr[i].name+'</div></li>';
				}
			}
		str+='</ul>';
	str+='</div>';
	$("#ulLiTabsCls").html(str);
}
function getGrievancesDetails(){
		$("#blockOneId").html(spinner);
		json={
			fromDate :fromDateStr,
			toDate : toDateStr
			/*locationType:globalLocType,
			locationId:globalLocId*/
		}
	$.ajax({
		type:'POST',
		url:'getGrievancesDetails',
		datatType:'json',
		data: JSON.stringify(json),
		//targetSpace: "blockOneId",
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildGrievancesRowDetails(result);
		}
	})	
}

function buildGrievancesRowDetails(result){
	var str='';
	str+='<div class="white-block border_yash pad_10 m_top10">';
			str+='<div class="row">';
				str+='<div class="col-sm-12 col-md-10">';
					str+='<div class="white-block border_yash pad_10" style="border: 1px solid #E4E3E3; box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);">';
						str+='<div class="row">';
							str+='<div class="col-sm-4 col-md-2">';
								str+='<div class="white-block border_yash pad_10">';
									str+='<p class="text-center font_weight" style="margin-top: 30px;">Total<br>Grievances</p>';
									str+='<h5 class="text-center font_weight m_top5" style="margin-bottom: 16px;">'+result.totalGps+'</h5>';
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-4 col-md-5">';
								str+='<div class="white-block border_yash pad_10">';
									str+='<p class="text-center font_weight">Individual</p>';
									str+='<h5 class="text-center font_weight m_top10">'+result.individualTotal+'<span class="f_13 text-success m_left20">'+result.individualPerc+'%</span></h6>';
									str+='<div class="m_top5" style="border-bottom: 1px solid #CACACA;"></div>';
									str+='<div class="row m_top10">';
										str+='<div class="col-sm-6" style="border-right: 1px solid #CACACA;">';
											str+='<p class="text-center font_weight">Financial</p>';
											str+='<h5 class="text-center font_weight m_top10">'+result.individualFinancial+'<span class="f_13 text-success m_left20">'+result.indivivualFinancialPerc+'%</span></h6>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<p class="text-center font_weight">Non&nbsp;Financial</p>';
											str+='<h5 class="text-center font_weight m_top10">'+result.individualNonFinancial+'<span class="f_13 text-success m_left20">'+result.indivivualNonFinancialPerc+'%</span></h6>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-4 col-md-5">';
								str+='<div class="white-block border_yash pad_10">';
									str+='<p class="text-center font_weight">community</p>';
									str+='<h5 class="text-center font_weight m_top10">'+result.communityTotal+'<span class="f_13 text-success m_left20">'+result.communityPerc+'%</span></h6>';
									str+='<div class="m_top5" style="border-bottom: 1px solid #CACACA;"></div>';
									str+='<div class="row m_top10">';
										str+='<div class="col-sm-6" style="border-right: 1px solid #CACACA;">';
											str+='<p class="text-center font_weight">Financial</p>';
											str+='<h5 class="text-center font_weight m_top10">'+result.communityFinancial+'<span class="f_13 text-success m_left20">'+result.communityFinancialPerc+'%</span></h6>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<p class="text-center font_weight">Non&nbsp;Financial</p>';
											str+='<h5 class="text-center font_weight m_top10">'+result.communityNonFinancial+'<span class="f_13 text-success m_left20">'+result.communityNonFinancialPerc+'%</span></h6>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="col-sm-12 col-md-2">';
					str+='<div class="white-block border_yash pad_10" style="box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);">';
						str+='<p class="text-center font_weight" style="margin-top: 35px;">Resolved<br>Grievances</p>';
						str+='<h5 class="text-center font_weight m_top5" style="margin-bottom: 35px;">'+result.resolved+'</h5>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	$("#blockOneId").html(str);
}
function getGramaDarshiniDepartments(){
		$("#blockTwoId").html(spinner);
		json={
		
		}
	$.ajax({
		type:'POST',
		url:'getGramaDarshiniDepartments',
		datatType:'json',
		data: JSON.stringify(json),
		//targetSpace: "blockOneId",
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildGrievancesBlockRadioDetails(result);
		}
	})	
}
function buildGrievancesBlockRadioDetails(result){
	var str='';
		str+='<div class="white-block border_yash pad_5 m_top10">';
			str+='<h5 class="font_weight text-capital pad_10">Grievances</h5>';
			str+='<div class="white-block pad_5 border_yash">';
				str+='<div class="row">';
					str+='<div class="col-sm-8 col-md-4">';
						str+='<div class="groupBox containerRadio" style="padding-left: 10px !important;">';
							str+='<ul class="list-inline">';
								str+='<li>';
									str+='<label class="radio-inline"><input class="radioBtnCls" type="radio" attr_type="department" name="grievances" value="Department&nbsp;Wise"><span class="checkmarkRadio"></span>Department Wise</label>';
								str+='</li>';
								str+='<li>';
									str+='<label class="radio-inline"><input class="radioBtnCls" type="radio" attr_type="issue" name="grievances" value="Issue Wise"><span class="checkmarkRadio"></span>Issue Wise</label>';
								str+='</li>';
								str+='<li>';
									str+='<label class="radio-inline"><input class="radioBtnCls" type="radio" attr_type="subIssue" name="grievances" value="Sub Issue Wise" checked><span class="checkmarkRadio"></span>Sub Issue Wise</label>';
								str+='</li>';
							str+='</ul>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-2 col-md-1 m_top10">';
						str+='<label>Department:</label>';
					str+='</div>';
					str+='<div class="col-sm-2 col-md-3 m_top5">';
						str+='<select class="chosen-single form-control grivDeptCls">';
							str+='<option value="" attr_dept="">All</option>';
							for(var i in result){
								str+='<option value="'+result[i].name+'">'+result[i].name+'</option>';
							}
						str+='</select>';
					str+='</div>';
					str+='<div class="col-sm-7 col-md-4 m_top5">';
						str+='<div class="containerRadio " style="padding: 5px !important;">';
							str+='<div class="row">';
								str+='<div class="col-sm-3">';
									str+='<label class="radio-inline"><input class="topRadioBtnCls" type="radio" name="top" attr_result="10" value="Top 10" checked><span class="checkmarkRadio"></span>Top 10</label>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<label class="radio-inline"><input class="topRadioBtnCls" type="radio" name="top" attr_result="20" value="Top 20"><span class="checkmarkRadio"></span>Top 20</label>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<label class="radio-inline"><input class="topRadioBtnCls" type="radio" name="top" attr_result="30" value="Top 30"><span class="checkmarkRadio"></span>Top 30</label>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<label class="radio-inline"><input class="topRadioBtnCls" type="radio" name="top" attr_result="0" value="All"><span class="checkmarkRadio"></span>All</label>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='<div id="grivRadBtnTabId"></div>';
		str+='</div>';
	$("#blockTwoId").html(str);
	$(".chosen-single").chosen();
	getGrievancesDatabyType("subIssue","","10");

}
function getGrievancesDatabyType(type,dept,max){
		$("#grivRadBtnTabId").html(spinner);
		json={
			 "type": type,	//"issue"/"subIssue",
		     "pDept": dept, 	// deptName
		     "maxResult": max 	// top10/top20/top30 0
		}
	$.ajax({
		type:'POST',
		url:'getGrievancesDatabyType',
		datatType:'json',
		data: JSON.stringify(json),
		//targetSpace: "blockOneId",
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildGrievancesRowTableDetails(result,type,dept,max);
		}
	})	
}
function buildGrievancesRowTableDetails(result,type,dept,max){
	var str='';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="GrievancesTableDataTable" style="width: 100%;">';
				str+='<thead>';
					str+='<tr>';
						if(type == "subIssue"){
							str+='<th>Sub Issue Name</th>';
							str+='<th>Issue Name</th>';
							str+='<th>Department</th>';
						}
						if(type == "issue"){
							str+='<th>Issue Name</th>';
							str+='<th>Department</th>';
						}
						if(type == "department"){
							str+='<th>Department</th>';
						}
						str+='<th>Dependancy</th>';
						str+='<th>Category</th>';
						str+='<th>Total</th>';
						str+='<th>Resolved</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							if(type == "department"){
								str+='<td>'+getValues(result[i].department)+'</td>';
							}
							if(type == "issue"){
								str+='<td>'+getValues(result[i].issue)+'</td>';
								str+='<td>'+getValues(result[i].department)+'</td>';
							}
							if(type == "subIssue"){
								str+='<td>'+getValues(result[i].subIssue)+'</td>';
								str+='<td>'+getValues(result[i].issue)+'</td>';
								str+='<td>'+getValues(result[i].department)+'</td>';
							}
							str+='<td>'+getValues(result[i].dependancy)+'</td>';
							str+='<td>'+getValues(result[i].category)+'</td>';
							str+='<td>'+getValues(result[i].total)+'</td>';
							str+='<td>'+getValues(result[i].resolved)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].resolvedPerc)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		$("#grivRadBtnTabId").html(str);
		$("#GrievancesTableDataTable").dataTable({
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
				title:	   "",
				filename:  ''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function getScheduledOrVisitDetails(){
		$("#blockOneId").html(spinner);
		json={
			fromDateStr : fromDateStr,
			toDateStr : toDateStr,
			type: "5",
			locationType:globalLocType,
			locationId:globalLocId
		}
	$.ajax({
		type:'POST',
		url:'getScheduledOrVisitDetails',
		datatType:'json',
		data: JSON.stringify(json),
		//targetSpace: "blockOneId",
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildScheduledBlockDetails(result);
		}
	})	
}
function buildScheduledBlockDetails(result){
	var str='';
		str+='<div class="white-block border_yash  pad_10 m_top10">';
			str+='<div class="row">';
				str+='<div class="col-sm-12 col-md-10">';
					str+='<div class="white-block border_yash pad_10" style="box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);">';
						str+='<div class="row">';
							str+='<div class="col-sm-4 col-md-2">';
								str+='<div class="white-block border_yash pad_10">';
									str+='<p class="text-center font_weight" style="margin-top: 20px;">Total<br>GP/Wards</p>';
									str+='<h5 class="text-center font_weight m_top5" style="margin-bottom: 17px;">'+result.totalGps+'</h5>';
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-4 col-md-5">';
								str+='<div class="white-block border_yash pad_5">';
									str+='<p class="text-center font_weight">Visited</p>';
									str+='<h5 class="text-center font_weight m_top10">'+result.visited+'<span class="f_13 text-success m_left10">'+result.visitedPerc+'%</span></h5>';
									str+='<div style="border-bottom: 1px solid #CACACA;" class="m_top5"></div>';
									str+='<div class="row m_top10">';
										str+='<div class="col-sm-6" style="border-right: 1px solid #CACACA;">';
											str+='<p class="text-center font_weight">GPs</p>';
											str+='<h5 class="text-center font_weight m_top10">'+result.visitedGps+'<span class="f_13 text-success m_left10">'+result.visitedGpsPerc+'%</span></h5>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<p class="text-center font_weight">Wards</p>';
											str+='<h5 class="text-center font_weight m_top10">'+result.visitedWards+'<span class="f_13 text-success m_left10">'+result.visitedWardsPerc+'%</span></h5>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-4 col-md-5">';
								str+='<div class="white-block border_yash pad_5">';
									str+='<p class="text-center font_weight">Scheduled</p>';
									str+='<h5 class="text-center font_weight m_top10">'+result.scheduled+'<span class="f_13 text-success m_left10">'+result.scheduledPerc+'%</span></h5>';
									str+='<div style="border-bottom: 1px solid #CACACA;" class="m_top5"></div>';
									str+='<div class="row m_top10">';
										str+='<div class="col-sm-6" style="border-right: 1px solid #CACACA;">';
											str+='<p class="text-center font_weight">GPs</p>';
											str+='<h5 class="text-center font_weight m_top10">'+result.scheduledGps+'<span class="f_13 text-success m_left10">'+result.scheduledGpsPerc+'%</span></h5>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<p class="text-center font_weight">Wards</p>';
											str+='<h5 class="text-center font_weight m_top10">'+result.scheduledWards+'<span class="f_13 text-success m_left10">'+result.scheduledWardsPerc+'%</span></h5>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="col-sm-12 col-md-2">';
					str+='<div class="white-block border_yash pad_10" style="box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);">';
						str+='<p class="text-center font_weight" style="margin-top: 35px;">Attached<br>Files/Reports</p>';
						str+='<h5 class="text-center font_weight m_top5" style="margin-bottom: 25px;">'+result.files+'</h5>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	$("#blockOneId").html(str);
}
function buildScheduledTableDetails(){
	var str='';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="scheduledDataTable" style="width: 100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2">Locations</th>';
						str+='<th rowspan="2">Total</th>';
						str+='<th rowspan="2">Visited</th>';
						str+='<th rowspan="2">%</th>';
						str+='<th rowspan="2">Grievance Not Collected</th>';
						str+='<th rowspan="2">%</th>';
						str+='<th rowspan="2">Grievance Collected</th>';
						str+='<th rowspan="2">%</th>';
						str+='<th colspan="18">Grievance Collections</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>1-10</th>';
						str+='<th>%</th>';
						str+='<th>11-30</th>';
						str+='<th>%</th>';
						str+='<th>31-50</th>';
						str+='<th>%</th>';
						str+='<th>51-70</th>';
						str+='<th>%</th>';
						str+='<th>71-90</th>';
						str+='<th>%</th>';
						str+='<th>91-110</th>';
						str+='<th>%</th>';
						str+='<th>111-130</th>';
						str+='<th>%</th>';
						str+='<th>131-150</th>';
						str+='<th>%</th>';
						str+='<th>>150</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					str+='<tr>';
						str+='<td>-</td>';
						str+='<td>-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
						str+='<td>-</td>';
						str+='<td class="text-success">-</td>';
					str+='</tr>';
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		$("#blockTwoId").html(str);
		/* $("#scheduledDataTable").dataTable({
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
				title:	   "",
				filename:  ''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); */
}
function getNodalOfficersTabDetails(){
		$("#blockOneId").html(spinner);
		json={
			fromDateStr : fromDateStr,
		    toDateStr :toDateStr,
		    locationType : globalLocType,
		    locationId :globalLocId
		}
	$.ajax({
		type:'POST',
		url:'getNodalOfficersTabDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildNodalOfficersTableDetails(result);
		}
	})	
}
function buildNodalOfficersTableDetails(result){
	var str='';
		str+='<div class="white-block border_yash pad_10 m_top10">';
			str+='<h5 class="font_weight text-capital">App Installations</h5>';
			str+='<div class="li_blocks m_top10" style="border-spacing: 10px 0px;">';
				str+='<ul class="installationsTabCls blocksCls">';
						str+='<li class="displayBlock pad_10">';
							str+='<h5 class="font_weight m_top10">Total Nodal Officers</h5>';
							str+='<h5 class="font_weight m_top10 mar_bot_15">'+result.totalOfficers+'</h5>';
						str+='</li>';
						str+='<li class="displayBlock pad_10">';
							str+='<h5 class="font_weight m_top10">Overall</h5>';
							str+='<h5 class="text-center font_weight m_top10 mar_bot_15">'+result.overAllAppInstalled+'<span class="f_13 text-success" style="margin-left: 20px;">'+result.overAllPerc+'%</span></h5>';
						str+='</li>';
						str+='<li class="displayBlock pad_10">';
							str+='<h5 class="font_weight m_top10">Today</h5>';
							str+='<h5 class="text-center font_weight m_top10 mar_bot_15">'+result.todayAppInstalled+'<span class="f_13 text-success" style="margin-left: 20px;">'+result.todayPerc+'%</span></h5>';
						str+='</li>';                                         
						str+='<li class="displayBlock pad_10">';              
							str+='<h5 class="font_weight m_top10">Yesterday</h5>';    
							str+='<h5 class="text-center font_weight m_top10 mar_bot_15">-<span class="f_13 text-success" style="margin-left: 20px;">-%</span></h5>';
						str+='</li>';                                         
						str+='<li class="displayBlock pad_10">';              
							str+='<h5 class="font_weight m_top10">Last 7 Days</h5>';  
							str+='<h5 class="text-center font_weight m_top10 mar_bot_15">-<span class="f_13 text-success" style="margin-left: 20px;">-%</span></h5>';
						str+='</li>';                                        
						str+='<li class="displayBlock pad_10">';             
							str+='<h5 class="font_weight m_top10">This Month</h5>';  
							str+='<h5 class="text-center font_weight m_top10 mar_bot_15">-<span class="f_13 text-success" style="margin-left: 20px;">-%</span></h5>';
						str+='</li>';
						str+='<li class="displayBlock pad_10">';
							str+='<h5 class="font_weight m_top10">Last Month</h5>';
							str+='<h5 class="text-center font_weight m_top10 mar_bot_15">-<span class="f_13 text-success" style="margin-left: 20px;">-%</span></h5>';
						str+='</li>';
				str+='</ul>';
			str+='</div>';
		str+='</div>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default nodOfcTable" id="nodalOfficersDataTable" style="width: 100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2">GP/Wards</th>';
						str+='<th rowspan="2">Overall Officers</th>';
						str+='<th colspan="7">Nodal Officers</th>';
					str+='</tr>';
					str+='<tr>';
					if(globalLocType =="State"){
						str+='<th>State</th>';
					}
						str+='<th>District</th>';
						str+='<th>Constituency</th>';
						str+='<th>Mandal</th>';
						str+='<th>Town</th>';
						str+='<th>Village</th>';
						str+='<th>Ward</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result.subList){
						str+='<tr>';
							str+='<td>'+getValues(result.subList[i].name)+'</td>';
							str+='<td>'+getValues(result.subList[i].totalGps)+'</td>';
							if(globalLocType =="State"){
							str+='<td>'+getValues(result.subList[i].state)+'</td>';
							}
							str+='<td>'+getValues(result.subList[i].district)+'</td>';
							str+='<td>'+getValues(result.subList[i].constituency)+'</td>';
							str+='<td>'+getValues(result.subList[i].mandal)+'</td>';
							str+='<td>'+getValues(result.subList[i].town)+'</td>';
							str+='<td>'+getValues(result.subList[i].village)+'</td>';
							str+='<td>'+getValues(result.subList[i].ward)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		$("#blockOneId").html(str);
		/* $("#nodalOfficersDataTable").dataTable({
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
				title:	   "",
				filename:  ''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); */
}

function buildNodalOfficersCheckBoxes(){
	var str='';
	//nodalWiseArr = [{name:'State', value: '1'}, {name:'District', value: '2'}, {name:'Constituency', value: '3'} , {name:'Mandal', value: '4'} , {name:'Municipality', value: '5'} , {name:'Village', value: '6'}, {name:'Panchayath', value: '7'}],
		str+='<div class="white-block m_top20 border_yash pad_10">';
			str+='<h5 class="font_weight text-capital">Nodal Officers Wise</h5>';
			str+='<div class="white-block border_yash pad_5 border_radius_5 m_top10">';
				str+='<ul class="list-inline">';
					str+='<li>';
						str+='<label class="m_left20">Officer Level</label>';
					str+='</li>';
					if(globalLocType != null && globalLocType == "State"){
						str+='<li>';
							str+='<label class="checkbox-inline m_left20"><input class="checkboxCls" type="checkbox" value="1" checked>State</label>';
						str+='</li>';
					}
					if(globalLocType != null && globalLocType == "District"){
						str+='<li>';
							str+='<label class="checkbox-inline m_left20"><input class="checkboxCls" type="checkbox" value="2" checked>District</label>';
						str+='</li>';
					}else {
						str+='<li>';
							str+='<label class="checkbox-inline m_left20"><input class="checkboxCls" type="checkbox" value="2">District</label>';
						str+='</li>';
					}
					str+='<li>';
						str+='<label class="checkbox-inline m_left20"><input class="checkboxCls" type="checkbox" value="3" >Constituency</label>';
					str+='</li>';
					str+='<li>';
						str+='<label class="checkbox-inline m_left20"><input class="checkboxCls" type="checkbox" value="4">Mandal</label>';
					str+='</li>';
					str+='<li>';
						str+='<label class="checkbox-inline m_left20"><input class="checkboxCls" type="checkbox" value="5" >Municipality</label>';
					str+='</li>';
					str+='<li>';
						str+='<label class="checkbox-inline m_left20"><input class="checkboxCls" type="checkbox" value="6">Village</label>';
					str+='</li>';
					str+='<li>';
						str+='<label class="checkbox-inline m_left20"><input class="checkboxCls" type="checkbox" value="7">Ward</label>';
					str+='</li>';
				str+='</ul>';
			str+='</div>';
			str+='<div id="nodalOfcTable"></div>';
		str+='</div>';
	$("#blockTwoId").html(str);
}
function getNodalOfficerTabLevelWiseDetails(value){
		$("#nodalOfcTable").html(spinner);
		json={
			fromDateStr : fromDateStr,
		    toDateStr :toDateStr,
		    locationType : globalLocType,
		    locationId :globalLocId,
			searchLevelId : value
		}
	$.ajax({
		type:'POST',
		url:'getNodalOfficerTabLevelWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildNodalOfficersWiseTableDetails(result,value);
		}
	})	
}
function buildNodalOfficersWiseTableDetails(result,value){
	var str='';
			str+='<div class="table-responsive m_top10">';
				str+='<table class="table table-bordered table_default" id="nodalOfficersWiseDataTable" style="width: 100%;">';
					str+='<thead>';
						str+='<tr>';
							if(value == "2"){
								str+='<th>District Name</th>';
							}
							if(value == "3"){
								str+='<th>District Name</th>';
								str+='<th>Constituency Name</th>';
							}
							if(value == "4"){
								str+='<th>District Name</th>';
								str+='<th>Constituency Name</th>';
								str+='<th>Mandal Name</th>';
							}
							if(value == "5"){
								str+='<th>District Name</th>';
								str+='<th>Constituency Name</th>';
								str+='<th>Mandal Name</th>';
								str+='<th>Municipality Name</th>';
							}
							if(value == "6"){
								str+='<th>District Name</th>';
								str+='<th>Constituency Name</th>';
								str+='<th>Mandal Name</th>';
								str+='<th>Municipality Name</th>';
								str+='<th>Village Name</th>';
							}
							if(value == "7"){
								str+='<th>District Name</th>';
								str+='<th>Constituency Name</th>';
								str+='<th>Mandal Name</th>';
								str+='<th>Municipality Name</th>';
								str+='<th>Village Name</th>';
								str+='<th>Ward Name</th>';
							}
							str+='<th>Officer Name</th>';
							str+='<th>Designation</th>';
							str+='<th>App Installation</th>';
							str+='<th>Scheduled GP/Wards</th>';
							str+='<th>Visited</th>';
							str+='<th>%</th>';
							str+='<th>Upcomming/Schedule</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						for(var i in result){
							str+='<tr>';
								if(value == "2"){
									str+='<td>'+getValues(result[i].districtName)+'</td>';
								}
								if(value == "3"){
									str+='<td>'+getValues(result[i].districtName)+'</td>';
									str+='<td>'+getValues(result[i].constituencyName)+'</td>';
								}
								if(value == "4"){
									str+='<td>'+getValues(result[i].districtName)+'</td>';
									str+='<td>'+getValues(result[i].constituencyName)+'</td>';
									str+='<td>'+getValues(result[i].mandalName)+'</td>';
								}
								if(value == "5"){
									str+='<td>'+getValues(result[i].districtName)+'</td>';
									str+='<td>'+getValues(result[i].constituencyName)+'</td>';
									str+='<td>'+getValues(result[i].mandalName)+'</td>';
									str+='<td>-</td>';
								}
								if(value == "6"){
									str+='<td>'+getValues(result[i].districtName)+'</td>';
									str+='<td>'+getValues(result[i].constituencyName)+'</td>';
									str+='<td>'+getValues(result[i].mandalName)+'</td>';
									str+='<td>-</td>';
									str+='<td>'+getValues(result[i].panchayatName)+'</td>';
								}
								if(value == "7"){
									str+='<td>'+getValues(result[i].districtName)+'</td>';
									str+='<td>'+getValues(result[i].constituencyName)+'</td>';
									str+='<td>'+getValues(result[i].mandalName)+'</td>';
									str+='<td>-</td>';
									str+='<td>'+getValues(result[i].panchayatName)+'</td>';
									str+='<td>-</td>';
								}
								str+='<td>'+getValues(result[i].name)+'</td>';
								str+='<td>'+getValues(result[i].designation)+'</td>';
								str+='<td>'+getValues(result[i].appInstallationStatus)+'</td>';
								str+='<td>'+getValues(result[i].scheduled)+'</td>';
								str+='<td>'+getValues(result[i].visited)+'</td>';
								str+='<td>'+getValues(result[i].perc)+'</td>';
								str+='<td>-</td>';
							str+='</tr>';
						}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		$("#nodalOfcTable").html(str);
		if(value == 2){
			$("#nodalOfficersWiseDataTable").dataTable({
				"iDisplayLength": 15,
				"info": false,
				"aaSorting": [],
				//"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
				"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-5'i><'col-sm-7'p>>",
				buttons: [
					{
						extend:    'csvHtml5',
						text:      '<i class="fa fa-file-text-o"></i>',
						titleAttr: 'CSV',
						title:	   "",
						filename:  ''+moment().format("DD/MMMM/YYYY  HH:MM"),
					}
				]
			});
		}else {
			$("#nodalOfficersWiseDataTable").dataTable({
				"iDisplayLength": 15,
				"info": true,
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
						title:	   "",
						filename:  ''+moment().format("DD/MMMM/YYYY  HH:MM"),
					}
				]
			});
		}
}
function getSchemeOverViewDetails(){
		$("#blockOneId").html(spinner);
		json={
			fromDateStr :fromDateStr,
		    toDateStr :toDateStr,
		    locationType : globalLocType,
		    locationId :globalLocId
		}
	$.ajax({
		type:'POST',
		url:'getSchemeOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildSchemesOverviewBlockDetails(result);
		}
	})	
}
function buildSchemesOverviewBlockDetails(result){
	var str='';
	str+='<div class="groupBox border_yash m_top10" style="background-color:  #DCDCDB !important;">';
		str+='<h5 class="font_weight text-capital">Schemes Overview</h5>';
	str+='</div>';
	str+='<div class="white-block pad_10 border_yash">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_default" id="schemesOverviewDataTable" style="width: 100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Scheme Name</th>';
						str+='<th>Applied</th>';
						str+='<th>Govt Accepted</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td>'+getValues(result[i].name)+'</td>';
							str+='<td>'+getValues(result[i].schemes)+'</td>';
							str+='<td>-</td>';
							str+='<td class="text-success">-</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#blockOneId").html(str);
	$("#schemesOverviewDataTable").dataTable({
		"paging": false,
		"aaSorting": [],
		"ordering": true,
		"searching": false,
		"info":false,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "",
				filename:  ''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}

function locationWiseData(){
	var collapse='';
	for(var i in locationWiseArr){
		collapse+='<div class="panel-group m_top20" id="accordion'+locationWiseArr[i].name+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+locationWiseArr[i].name+'">';
					if(i == 0){
						collapse+='<a id="smart'+locationWiseArr[i].name+'" role="button" class="panelCollapseIcon '+locationWiseArr[i].name+'"  data-toggle="collapse" data-parent="#accordion'+locationWiseArr[i].name+'" href="#collapse'+locationWiseArr[i].name+'" aria-expanded="true" aria-controls="collapseheading'+locationWiseArr[i].name+'">';
					}else{
						collapse+='<a id="smart'+locationWiseArr[i].name+'" role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordion'+locationWiseArr[i].name+'" href="#collapse'+locationWiseArr[i].name+'" aria-expanded="true" aria-controls="collapseheading'+locationWiseArr[i].name+'">';
					}
					 collapse+='<h5 class="panel-title text-capital">'+locationWiseArr[i].name+' Wise Details</h5>';
						
					collapse+='</a>';
				collapse+='</div>';
				if(i == 0){
					collapse+='<div id="collapse'+locationWiseArr[i].name+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+locationWiseArr[i].name+'">';
				}else{
					collapse+='<div id="collapse'+locationWiseArr[i].name+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+locationWiseArr[i].name+'">';
				}
					collapse+='<div class="panel-body">';
						//for(var i in locationWiseArr[i].name){
							collapse+='<div id="locationWiseDivId"></div>';
						//}
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	}
	$("#levelWiseDivId").html(collapse);
}
function getGramaDarshiniLocationLevelWiseDetails(){
		$("#locationWiseDivId").html(spinner);
		json={
			fromDateStr :fromDateStr,
		    toDateStr :toDateStr,
		    locationType : globalLocType,
		    locationId :globalLocId
		}
	$.ajax({
		type:'POST',
		url:'getGramaDarshiniLocationLevelWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildLocationWiseDetails(result);
		}
	})	
}
function buildLocationWiseDetails(result){
	var str='';
	//nodalWiseArr = [{name:'State', value: '1'}, {name:'District', value: '2'}, {name:'Constituency', value: '3'} , {name:'Mandal', value: '4'} , {name:'Municipality', value: '5'} , {name:'Village', value: '6'}, {name:'Panchayath', value: '7'}],
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_default" id="locationWiseDataTable" style="width: 100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">District Name</th>';
					str+='<th rowspan="2">Nodal Officers</th>';
					str+='<th rowspan="2">App Installed</th>';
					str+='<th rowspan="2">%</th>';
					str+='<th colspan="6">GP/Wards</th>';
					str+='<th rowspan="2">Schemes Applied</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>Total</th>';
					str+='<th>Scheduled</th>';
					str+='<th>%</th>';
					str+='<th>Visited</th>';
					str+='<th>%</th>';
					str+='<th>Attached Files</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
					
						str+='<td>'+getValues(result[i].districtName)+'</td>';
						str+='<td>'+getValues(result[i].totalOfficers)+'</td>';
						str+='<td>'+getValues(result[i].appInstalled)+'</td>';
						str+='<td class="text-success">'+getValues(result[i].appInstalledPerc)+'</td>';
						str+='<td>'+getValues(result[i].totalGps)+'</td>';
						str+='<td>'+getValues(result[i].scheduledGps)+'</td>';
						str+='<td class="text-success">'+getValues(result[i].scheduledGpsPerc)+'</td>';
						str+='<td>'+getValues(result[i].visitedGps)+'</td>';
						str+='<td class="text-success">'+getValues(result[i].visitedGpsPerc)+'</td>';
						str+='<td>'+getValues(result[i].files)+'<i class="m_left10 fa fa-file-pdf-o" style="color: #D2C4C4;"></i></td>';
						str+='<td>'+getValues(result[i].schemes)+'</td>';
					str+='</tr>';
				}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#locationWiseDivId").html(str);
	$("#locationWiseDataTable").dataTable({
		"paging": false,
		"aaSorting": [],
		"ordering": true,
		"searching": false,
		"info":false,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "",
				filename:  ''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
$(document).on("click",".trendingGraphCls li",function(){
	$(this).closest('ul').find("li").removeClass('active');
	$(this).addClass('active');
	//graphType = $(this).data("type");
	//buildTrendingGraphDetails();
});
$(document).on("click",".ulTabStyleCls li",function(){
	$(this).closest('ul').find("li").removeClass('active');
	$(this).addClass('active');
	var type = $(".radioBtnCls").prop('checked',true);
	var max = $(".topRadioBtnCls").prop('checked',true);
	var dept = $(".grivDeptCls").prop('checked',true);
	tabId = $(this).attr("attr_name");
	if(tabId == "Grievances"){
		getGrievancesDetails();
		getGramaDarshiniDepartments();
		getGrievancesDatabyType(type,dept,max);
		$("#blockThreeId").html("");
	}
	if(tabId == "Scheduled/Visits"){
		getScheduledOrVisitDetails();
		//buildScheduledTableDetails();
		$("#blockTwoId").html("");
		$("#blockThreeId").html("");
	}
	if(tabId == "Nodal Officers"){
		getNodalOfficersTabDetails();
		buildNodalOfficersCheckBoxes();
		if(globalLocType == "State"){
			getNodalOfficerTabLevelWiseDetails("1");
		}else{
			getNodalOfficerTabLevelWiseDetails("2");
		}
		//$("#blockThreeId").html("");
	}
	if(tabId == "Schemes"){
		getSchemeOverViewDetails();
		$("#blockTwoId").html("");
		$("#blockThreeId").html("");
	}
});
function getValues(value){
	var type= typeof value;	
	if(type == "string"){
		if(value == null || value.length == 0 || value == 0){
			value = "-";
		}
	}else if(type == "number"){
		if(value == null || value == 0){
			value = "-";
		}
	}else if(type == "undefined"){		
		value = "-";
	}	
	return value;
}
$(document).on("click",".checkboxCls",function(){
	$('.checkboxCls').prop('checked',false);
	var value = $(this).val();
	$(this).prop('checked',true);
	getNodalOfficerTabLevelWiseDetails(value);
})
$(document).on("click",".radioBtnCls",function(){
	$('.radioBtnCls').prop('checked',false);
	$(this).prop('checked',true);
	var type = $(this).attr("attr_type");
	var dept = $(".grivDeptCls").val();
	var max = $(".topRadioBtnCls:checked").attr("attr_result");
	getGrievancesDatabyType(type,dept,max);
})
 $(document).on("click",".topRadioBtnCls",function(){
	$('.topRadioBtnCls').prop('checked',false);
	$(this).prop('checked',true);
	var type = $(".radioBtnCls:checked").attr("attr_type");
	var dept = $(".grivDeptCls").val();
	var max = $(this).attr("attr_result");
	getGrievancesDatabyType(type,dept,max);
	
})
$(document).on("change",".grivDeptCls",function(){
	var type = $(".radioBtnCls:checked").attr("attr_type");
	var dept = $(this).val();
	var max = $(".topRadioBtnCls:checked").attr("attr_result");
	getGrievancesDatabyType(type,dept,max);
}) 
var stateArr = [{'name':'Andhra Pradesh','value':0}];
collapseMenu(1,stateArr,'multi-level-selection-menu');
function getLGDDistrictCodes(divId,levelId,locationScopeId){
	$("."+divId).html(spinner);
	//var type = 'constituency' //district to constituency (only consider type like this)
	var json = {
				  
	}
	$.ajax({
		url : "getLGDDistrictCodes",     
		data : JSON.stringify(json),
		type : "POST",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			collapseMenu(levelId,result,divId)
		}
	});
}
function collapseMenu(id,resultArr,buildId)
{
	if(id == 2)
	{
		levelIdValue = 3;
	}else if(id == 3)
	{
		levelIdValue = 4;
	}else{
		levelIdValue = 2;
	}
	var collapse = '';
	
	collapse+='<div class="panel-group dashedBorder" id="accordion'+id+'" role="tablist" aria-multiselectable="true">';
	for(var i in resultArr)
	{
		collapse+='<div class="panel panelExpand">';
			collapse+='<div class="panel-heading" role="tab" id="heading'+resultArr[i].value+'">';
				collapse+='<h4 class="panel-title">';
					if(levelIdValue == 2)
					//if(levelIdValue == 2)
					{
						collapse+='<a role="button" style="height:10px;width:10px;display:inline-block;" attr_levelIdValue="'+levelIdValue+'" attr_distId="'+resultArr[i].value+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].value+'" attr_targetId="collapseMenu'+resultArr[i].value+'Id"  class="panelCollapseIcon panelCollapseIconClick collapsed" data-toggle="collapse" data-parent="#accordion'+id+'" href="#collapse'+resultArr[i].value+'" aria-expanded="true" aria-controls="collapse'+resultArr[i].value+'">&nbsp;</a>';
					}
					collapse+='<span style="padding-left:10px;cursor:pointer;" class="menuDataCollapse"  attr_levelIdValue="'+levelIdValue+'" attr_distid="" attr_levelId="'+id+'" attr_id="'+resultArr[i].value+'" attr_targetId="collapseMenu'+resultArr[i].value+'Id" >'+resultArr[i].name+'</span>';
				collapse+='</h4>';
			collapse+='</div>';
			collapse+='<div id="collapse'+resultArr[i].value+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+resultArr[i].value+'">';
				collapse+='<div class="panel-body">';
					collapse+='<div class="collapseMenu'+resultArr[i].value+'Id"></div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	}
	collapse+='</div>';
	$("."+buildId).html(collapse);
}

$(document).on("click",".panelCollapseIconClick",function(e){
	e.stopPropagation();
	var buildId = $(this).attr("attr_targetId");
	var locationScopeId = $(this).attr("attr_id");
	var levelId = $(this).attr("attr_levelIdValue");
	$("#selectedName").attr("attr_distid","");
	var type = '';
	if(levelId == 4)
	{
		type='';
		locationScopeId = locationScopeId;
	}
	if(levelId == "3" || levelId == 3)
	{
		locationScopeId = $(this).attr("attr_distid");
		type='constituency';
		$("#selectedName").attr("attr_distid",locationScopeId);
	}
	getLGDDistrictCodes(buildId,levelId,locationScopeId)
});
$(".multi-level-selection-menu").hide();
$(document).on("click",function(){
	$(".multi-level-selection-menu").hide();
});
$(document).on("click","#selectedName,#selectedName1",function(e){
	e.stopPropagation();
	$(".multi-level-selection-menu").show();
});
$(document).on("click",".menuDataCollapse",function(){
	globalLocId = $(this).attr("attr_id");
	var levelId = $(this).attr("attr_levelIdValue");	
	$("#selectedName").text($(this).html());
	$("#selectedName").attr("attr_levelid",levelId);
	$("#selectedName").attr("attr_id",globalLocId);	
					
	 if(levelId == 2){
		globalLocType = 'State';
		//locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}else if(levelId == 3){
		globalLocType = 'District';	
		//locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}/* else if(levelId == 4){
		globalLocType = 'Constituency';
		//locationArr =[{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}  */
	
	onloadCalls();
})