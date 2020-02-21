var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>',
tabArr = [{name: 'Category Wise',type: 'CategoryWise'}, {name: 'Age Wise', type: 'AgeWise'}, {name: 'Gender Wise', type: 'GenderWise'}];
locationWiseArr = [{name:'District',locationType:"district"}, {name:'Mandal',locationType:"mandal"} , {name:'Panchayat',locationType:"panchayat"}],
grievanceArr=[{id:1,value:"1-4"},{id:2,value:"5-8"},{id:3,value:"9-12"},{id:4,value:"13-16"},{id:5,value:"17-20"},{id:6,value:"21-24"},{id:7,value:"25-28"},{id:8,value:"28-31"},{id:8,value:">31"}]
fromDateStr="07-09-2018",
toDateStr=moment().format("DD-MM-YYYY");
var globallocId = 0;
var globallevelId = 0;
var globalLocationType="state";
var globalLocationValue=0;

$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
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
    'Today' : [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'This Year': [moment().startOf('Year'), moment()],
    'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
	'OverAll':["07-09-2018", moment().format("DD-MM-YYYY")]
  }
  }); 
  
$('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
	fromDateStr = picker.startDate.format('DD-MM-YYYY');
	toDateStr = picker.endDate.format('DD-MM-YYYY');
	if(picker.chosenLabel == 'OverAll')
	{
		$("#dateRangePicker").val('OverAll');
	}
	
	onloadCalls();
}); 

$("#selectedName").attr("attr_id","0");
$("#selectedName").attr("attr_levelidvalue","2");


$(document).on("click",".menuDataCollapse",function(){
	globallocId = $(this).attr("attr_id");
	globallevelId = $(this).attr("attr_levelidvalue");
	globalLocationName=$(this).attr("attr_name");
	if(globallevelId == 2 || globallevelId == 0){
		globalLocationType = "state";
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
	onloadCalls();
});

$(".chosen-select").chosen();
onloadCalls();
function onloadCalls(){
	getYuvaNesthamOverviewDetails();
	getYuvanesthamTimelineOverveiw();
	locationWiseData();
	getApplicationsDetails("CategoryWise","categoryWiseDivId");
	getApplicationsDetails("AgeWise","ageWiseDivId");
	getApplicationsDetails("GenderWise","genderWiseDivId");
	getApplicationsDetails("EducationWise","educationWiseDivId");
	
	getGrievanceTypeWiseDetails("2","grievanceTypeDivId");
	getGrievanceTypeWiseDetails("1","grievanceLifeCycleDivId");
} 
function getYuvaNesthamOverviewDetails(){
		$("#overviewId").html(spinner);
		json={
			"fromDateStr" :  fromDateStr,
			"toDateStr" :  toDateStr,
			"filterType":globalLocationType,
			"filterValue":globalLocationValue,
			"typeId":2
		}
	$.ajax({
		type:'POST',
		url:'getYuvaNesthamOverviewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildOverviewDetails(result);
		}else{
			$("#overviewId").html("No Data Available");
		}
	})	
}
function buildOverviewDetails(result){
	str='';
	
	str+='<div class="row">';
		str+='<div class="col-sm-2 m_top10">';
			str+='<div class="panel panel-default block_shadow">';
			 str+='<div class="panel-body" style="background-color:#ff9700">';
				str+='<div class="row" >';
					str+='<div class="col-sm-12">';
						str+='<div class="pad_30">';
							str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/applied.png" style="width: 70px;height: 70px;"/>';
							str+='<h5 class="font_weight text-capital m_top20  text-center color_white">Applied</h5>';
							str+='<h3 class="font_weight m_top10 text-center color_white">'+getValues(result.totalRegistrations)+'</h3>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			 str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-8 m_top10">';
			str+='<div class="panel panel-default block_shadow">';
				str+='<div class="panel-heading panel_head_custom" style="background-color:#22a45f;">';
					if(result.fullFilledPerc !=null && result.fullFilledPerc>0){
						str+='<h4 class="text-capital font_weight"><img src="Assests/images/yuvanestamimages/fullfilled.png" width="25px" height="25px"/> <span class="name_alignment color_white">FULL FILLED</span> <span class="pull-right font_weight color_white">'+result.fullFilledAppl+'<small class="font_weight color_white" style="margin-left: 10px;">'+result.fullFilledPerc+'%</small></span></h4>';
					}else{
						str+='<h4 class="text-capital font_weight"><img src="Assests/images/yuvanestamimages/fullfilled.png" width="25px" height="25px"/> <span class="name_alignment color_white">FULL FILLED</span><span class="pull-right font_weight color_white">-<small class="font_weight color_white" style="margin-left: 10px;">%</small></span></h4>';
					}
					
				str+='</div>';
				str+='<div class="panel-body">';
					str+='<div class="row">';
						str+='<div class="col-sm-8">';
							
							str+='<div class="pad_10 border_yash" style="background-color:#f5f5f5;">';
								str+='<div class="row">';
								str+='<div class="col-sm-3">';
									str+='<div class="m_top20">';
										str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/optin.png"/>';
										str+='<h5 class="font_weight text-capital m_top10 text-center f_14">OPT-IN</h5>';
										str+='<h3 class="font_weight m_top10 text-center f_21">'+getValues(result.optIn)+'</h3>';
										if(result.optInPerc !=null && result.optInPerc>0){
											str+='<h5 class="font_weight m_top10 text-center color_green">'+result.optInPerc+' %</h5>';
										}else{
											str+='<h5 class="font_weight m_top10 text-center color_green"> - </h5>';
										}
										
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<div class="pad_border1">';
										str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/Verified.png" width="30px" height="30px" />';
										str+='<h5 class="font_weight text-capital m_top10 f_14 text-center">Verified</h5>';
										str+='<h3 class="font_weight m_top10 text-center f_21">'+getValues(result.verified)+'</h3>';
										if(result.verifiedPerc !=null && result.verifiedPerc>0){
											str+='<h5 class="font_weight m_top10 text-center color_green">'+result.verifiedPerc+' %</h5>';
										}else{
											str+='<h5 class="font_weight m_top10 text-center"> - </h5>';
										}
										
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<div class="pad_border1">';
										str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/Sanctioned.png" width="30px" height="30px" />';
										str+='<h5 class="font_weight text-capital m_top10 f_14 text-center">Sanctioned</h5>';
										str+='<h3 class="font_weight m_top10 text-center f_21">'+getValues(result.sanctioned)+'</h3>';
										if(result.sanctionedPerc !=null && result.sanctionedPerc>0){
											str+='<h5 class="font_weight m_top10 text-center color_green">'+result.sanctionedPerc+' %</h5>';
										}else{
											str+='<h5 class="font_weight m_top10 text-center"> - </h5>';
										}
										
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<div class="pad_border1">';
										str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/payments.png" width="30px" height="30px" />';
										str+='<h5 class="font_weight text-capital m_top10 f_14 text-center">Payments</h5>';
										str+='<h3 class="font_weight m_top10 text-center f_21">'+getValues(result.paymentCount)+'</h3>';
										if(result.paymentPerc !=null && result.paymentPerc>0){
											str+='<h5 class="font_weight m_top10 text-center color_green">'+result.paymentPerc+' %</h5>';
										}else{
											str+='<h5 class="font_weight m_top10 text-center"> - </h5>';
										}
									str+='</div>';
								str+='</div>';
							str+='</div>';
							str+='</div>';
						str+='</div>';
						//str+='<div class="col-sm-4">';
							//str+='<div class="pad_10" style="background-color:#f5f5f5;">';
								//str+='<div class="row">';
								str+='<div class="col-sm-2 m_top10">';
									str+='<div class="pad_border1">';
										str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/thismonth.png" width="30px" height="30px"/>';
										str+='<h5 class=" font_weight text-capital m_top10 f_14 text-center">This Month Payments</h5>';
										str+='<h3 class="font_weight m_top20 text-center f_21" style="margin-bottom: 5px;">'+getValues(result.amount)+' Crs</h3>';
										
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-2 m_top10">';
									str+='<div class="pad_border1">';
										str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/optout.png" width="30px" height="30px"/>';
										str+='<h5 class="font_weight text-capital m_top10 text-center f_14">OPT-OUT</h5>';
										str+='<h3 class="font_weight m_top10 text-center f_21">'+getValues(result.optOut)+'</h3>';
										if(result.optOutPerc !=null && result.optOutPerc>0){
											str+='<h5 class="font_weight m_top10 text-center color_green">'+result.optOutPerc+' %</h5>';
										}else{
											str+='<h5 class="font_weight m_top10 text-center color_green"> - </h5>';
										}
										
									//str+='</div>';
								//str+='</div>';
							//str+='</div>';
						str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-2 m_top10">';
			str+='<div class="panel panel-default block_shadow" style="margin-bottom: 5px;">';
			 str+='<div class="panel-body" style="background-color:#ff2d34;">';
				str+='<div class="media">';
					str+='<div class="media-left">';
						str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/grievances.png" style="width:25px;height:25px;margin-top: 10px;" />';
					str+='</div>';
					str+='<div class="media-body">';
						str+='<h5 class="text-capital f_14 text-center font_weight color_white">Grievances</h5>';
						str+='<h3 class="font_weight text-center color_white">'+getValues(result.total)+'</h3>';
					str+='</div>';
				str+='</div>';
			 str+=' </div>';
			str+='</div>';
			str+='<div class="panel panel-default block_shadow" style="margin-bottom: 5px;">';
			 str+=' <div class="panel-body">';
				str+='<div class="media">';
					str+='<div class="media-left">';
						str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/pending.png" style="width: 25px;height: 25px;margin-top: 10px;" />';
					str+='</div>';
					str+='<div class="media-body">';
						str+='<h5 class="font_weight text-capital f_14 text-center">Pending</h5>';
						str+='<h3 class="font_weight m_top10 text-center" style="font-size: 19px;">'+getValues(result.pending)+' <span style="font-size:14px;" class="color_green" style="font-size:12px;">'+getValues(result.pendingPerc)+' %</span></h3>';
					str+='</div>';
				str+='</div>';
			 str+=' </div>';
			str+='</div>';
			str+='<div class="panel panel-default block_shadow">';
			 str+=' <div class="panel-body">';
				str+='<div class="media">';
					str+='<div class="media-left">';
						str+='<img class="image_alignment_Css" src="Assests/images/yuvanestamimages/resolved.png" style="width: 25px;height: 25px;margin-top: 10px;" />';
					str+='</div>';
					str+='<div class="media-body">';
						str+='<h5 class="text-capital f_14 text-center font_weight">Resolved</h5>';
						str+='<h3 class="font_weight m_top10 f_21 text-center">'+getValues(result.resolved)+' <span style="font-size:12px;" class="color_green">'+getValues(result.resolvedPerc)+' %</span></h3>';
					str+='</div>';
				str+='</div>';
			 str+=' </div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#overviewId").html(str);
}
function getYuvanesthamTimelineOverveiw(){
	$("#timeLineViewTableId").html(spinner);
	var json = {
		"filterType":globalLocationType,
		"filterValue":globalLocationValue,
		"fromDate" : fromDateStr,
		"toDate" : toDateStr
	};
	$.ajax({                
		type:'POST',
		url: 'getYuvanesthamTimelineOverveiw',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildYuvanesthamTimelineOverveiw(result);
		}else{
			$("#timeLineViewTableId").html("No Data Avislable");
		}
	});
}
function buildYuvanesthamTimelineOverveiw(result){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC" id="timeLineViewDataTableId" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Date</th>';
					str+='<th>Total Full Filled</th>';
					str+='<th>OPT-IN</th>';
					str+='<th>%</th>';
					str+='<th>OPT-OUT</th>';
					str+='<th>%</th>';
					str+='<th>Grievances</th>';
					str+='<th>Resolved</th>';
					str+='<th>%</th>'; 
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+getValues(result[i].date)+'</td>';
					str+='<td>'+getValues(result[i].totalApplications)+'</td>';
					str+='<td>'+getValues(result[i].total)+'</td>';
					str+='<td class="color_green">'+getValues(result[i].totalPerc)+'</td>';										
					str+='<td>'+getValues(result[i].optOut)+'</td>';
					str+='<td class="color_green">'+getValues(result[i].optOutPerc)+'</td>';
					str+='<td>'+getValues(result[i].totalGriv)+'</td>';
					str+='<td>'+getValues(result[i].resolved)+'</td>';
					str+='<td class="color_green">'+getValues(result[i].resolvedPerc)+'</td>';
					
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#timeLineViewTableId").html(str);
	$("#timeLineViewDataTableId").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10,20,30, -1], [10,20,30, "All"]],			
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "yuvanesthamTimeLine",
				filename:  'yuvanesthamTimeLine'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function getGrievanceTypeWiseDetails(typeId,divId){
		$("#"+divId).html(spinner);
		json={
			typeId : typeId,
			fromDate : fromDateStr,
			toDate : toDateStr
		}
	$.ajax({
		type:'POST',
		url:'getGrievanceTypeWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildGrievanceTypeWiseDetails(result,typeId,divId);
		}else{
			$("#"+divId).html("No Data Available");
		}
	})	
}
function buildGrievanceTypeWiseDetails(result,typeId,divId){
	var str='';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_custom_SC" style="width: 100%;" id="grievanceDataTableId'+divId+'">';
				str+='<thead>';
					str+='<tr>';
						if(typeId == "2"){
							str+='<th>Grievance Type</th>';
						}
						if(typeId == "1"){
							str+='<th>Age Of Grievance</th>';
						}
						str+='<th>Total Grievances</th>';
						str+='<th>Resolved</th>';
						str+='<th>%</th>';
						str+='<th>Pending</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							if(typeId == "2"){
								str+='<td style="text-align:left !important;">'+result[i].type+'</td>';
							}	
							if(typeId == "1"){
								str+='<td>'+grievanceArr[Number(parseInt(result[i].type))].value+' Days</td>';
							}
							str+='<td>'+getValues(result[i].total)+'</td>';
							str+='<td>'+getValues(result[i].resolved)+'</td>';
							str+='<td class="color_green">'+getValues(result[i].resolvedPerc)+'</td>';
							str+='<td>'+getValues(result[i].pending)+'</td>';
							str+='<td class="color_green">'+getValues(result[i].pendingPerc)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#"+divId).html(str);
	$(".tooltipCls").tooltip(); 
	if(typeId == 2){
		$("#grievanceDataTableId"+divId).dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[10,20,30, -1], [10,20,30, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "",
					filename:  'yuvnesthamgrieavance'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}else{
		$("#grievanceDataTableId"+divId).dataTable({
			"paging":   false,
			"info":     false,
			"searching": false,
			"autoWidth": true,
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "",
					filename:  'yuvnesthamgrieavance'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}
	
}
function getApplicationsDetails(levelType,divId){
		$("#"+divId).html(spinner);
		json={
			fromDateStr : fromDateStr,
			toDateStr : toDateStr,
			type : levelType,
			"filterType":globalLocationType,
			"filterValue":globalLocationValue
		}
	$.ajax({
		type:'POST',
		url:'getApplicationsDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildCategoryTableBlockDetails(result,levelType,divId);
		}else{
			$("#"+divId).html("No Data Available");
		}
	})	
}
function buildCategoryTableBlockDetails(result,levelType,divId){
	var str='';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC" id="categoryTabDataTableId'+divId+'" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						if(levelType == "CategoryWise"){
							str+='<th>Category</th>';
						}else if(levelType == "GenderWise"){
							str+='<th>Gender</th>';
						}else if(levelType == "AgeWise"){
							str+='<th>Age Range</th>';
						}else if(levelType == "EducationWise"){
							str+='<th>Education Type</th>';
						}
						str+='<th>Total Full Filled</th>';
						if(levelType == "CategoryWise"){
							str+='<th>%</th>';
						}
						str+='<th>OPT-IN</th>';
						str+='<th>%</th>';
						str+='<th>OPT-OUT</th>';
						str+='<th>%</th>';
						str+='<th>Sanctioned</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td>'+getValues(result[i].category)+'</td>';
							str+='<td>'+getValues(result[i].totalApplications)+'</td>';
							if(levelType == "CategoryWise"){
								str+='<td class="color_green">'+getValues(result[i].applicationPerc)+'</td>';
							}
							str+='<td>'+getValues(result[i].total)+'</td>';
							str+='<td class="color_green">'+getValues(result[i].totalPerc)+'</td>';
							str+='<td>'+getValues(result[i].optOut)+'</td>';
							str+='<td class="text-danger">'+getValues(result[i].optOutPerc)+'</td>';
							str+='<td>'+getValues(result[i].sanctioned)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#"+divId).html(str);
	$("#categoryTabDataTableId"+divId).dataTable({
		"iDisplayLength": 15,
		"paging": false,
		"aaSorting": [],
		"ordering": true,
		"searching": true,
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
				filename:  'yuvanestham'+levelType+'_'+moment().format("DD/MMMM/YYYY  HH:MM"),
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
						collapse+='<div id="locationWiseDivId'+locationWiseArr[i].name+'"></div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	}
	$("#levelWiseDivId").html(collapse);
	for(var i in locationWiseArr) {
		getYuvanesthamLocationWiseDetails(locationWiseArr[i].name,locationWiseArr[i].locationType,'locationWiseDivId'+locationWiseArr[i].name);
	}
}
function getYuvanesthamLocationWiseDetails(name,locationType,tableId){
	$("#"+tableId).html(spinner);
		var json = {
			"fromDateStr":fromDateStr,
			"toDateStr":toDateStr,
			"locationType":locationType,
			"filterType":globalLocationType,
			"filterValue":globalLocationValue
		};
		$.ajax({                
			type:'POST',
			url: 'getYuvanesthamLocationWiseDetails',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result !=null && result.length >0){
				buildYuvanesthamLocationWiseDetails(result,locationType,name,tableId);
			}else{
				$("#"+tableId).html("No Data Avilable");
			}
		});
}
function buildYuvanesthamLocationWiseDetails(result,locationType,locationVal,tableId){
	var str='';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC" id="locationWiseDataTable'+locationVal+'" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						if(locationType == "district"){
							str+='<th>District&nbsp;Name</th>';
						}else if(locationType == "mandal"){
							str+='<th>District&nbsp;Name</th>';
							str+='<th>Mandal&nbsp;Name</th>';
						}else if(locationType == "panchayat"){
							str+='<th>District&nbsp;Name</th>';
							str+='<th>Mandal&nbsp;Name</th>';
							str+='<th>Panchayat&nbsp;Name</th>';
						}
						str+='<th>Total Full Filled</th>';
						str+='<th>OPT-IN</th>';
						str+='<th>%</th>';
						str+='<th>OPT-&nbsp;OUT</th>';
						str+='<th>%</th>';
						str+='<th>Sanctioned</th>';
						str+='<th>Grievances</th>';
						str+='<th>Resolved</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							if(locationType == "district"){
								str+='<td style="text-align:left !important;">'+result[i].districtName+'</td>';
							}else if(locationType == "mandal"){
								str+='<td style="text-align:left !important;">'+result[i].districtName+'</td>';
								str+='<td style="text-align:left !important;">'+result[i].mandalName+'</td>';
							}else if(locationType == "panchayat"){
								str+='<td style="text-align:left !important;">'+result[i].districtName+'</td>';
								str+='<td style="text-align:left !important;">'+result[i].mandalName+'</td>';
								str+='<td style="text-align:left !important;">'+result[i].panchayatName+'</td>';
							}
							str+='<td>'+getValues(result[i].totalApplications)+'</td>';
							str+='<td>'+getValues(result[i].total)+'</td>';
							str+='<td class="color_green">'+getValues(result[i].totalPerc)+'</td>';
							str+='<td>'+getValues(result[i].optOut)+'</td>';
							str+='<td class="color_green">'+getValues(result[i].optOutPerc)+'</td>';
							str+='<td>'+getValues(result[i].sanctioned)+'</td>';
							str+='<td>'+getValues(result[i].totalGriv)+'</td>';
							str+='<td>'+getValues(result[i].resolved)+'</td>';
							str+='<td class="color_green">'+getValues(result[i].resolvedPerc)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#"+tableId).html(str);
	if(locationType !=null && locationType!='district'){
		$("#locationWiseDataTable"+locationVal).dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[ 10,20, 30,50, -1], [10,20, 30,50, "All"]],
			"retrieve":true,
			"info": true,
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "",
					filename:  'yuvanestham'+locationType+'wise'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}else{
		$("#locationWiseDataTable"+locationVal).dataTable({
			"paging":   false,
			"ordering": true,
			"info":     false,
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "",
					filename:  'yuvanestham'+locationType+'wise'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}
}
$(document).on("click",".mainBlockClkCls li", function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	
	tabId = $(this).attr("attr_name");
	type = $(this).attr("attr_type");
	typeId = $(this).attr("attr_typeId");
	
	$("#headingGriTypeId").html(tabId);
	if(typeId == 1){
		$("#grievanceTypeDivId").hide();
		$("#grievanceLifeCycleDivId").show();
	}else{
		$("#grievanceTypeDivId").show();
		$("#grievanceLifeCycleDivId").hide();
	}
	//getGrievanceTypeWiseDetails(typeId);
});
$(document).on("click",".appBlockClkCls li", function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	
	tabId = $(this).attr("attr_name");
	type = $(this).attr("attr_type");
	typeId = $(this).attr("attr_typeId");
	
	$("#headingAppTypeId").html(tabId);
	
	if(typeId == "CategoryWise"){
		$("#categoryWiseDivId").show();
		$("#ageWiseDivId").hide();
		$("#genderWiseDivId").hide();
		$("#educationWiseDivId").hide();
	}else if(typeId == "AgeWise"){
		$("#categoryWiseDivId").hide();
		$("#ageWiseDivId").show();
		$("#genderWiseDivId").hide();
		$("#educationWiseDivId").hide();
	}else if(typeId == "GenderWise"){
		$("#categoryWiseDivId").hide();
		$("#ageWiseDivId").hide();
		$("#genderWiseDivId").show();
		$("#educationWiseDivId").hide();
	}else{
		$("#categoryWiseDivId").hide();
		$("#ageWiseDivId").hide();
		$("#genderWiseDivId").hide();
		$("#educationWiseDivId").show();
	}
	//getApplicationsDetails(type);
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