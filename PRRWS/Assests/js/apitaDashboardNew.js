var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
/* var customStartDate =  moment().startOf('year').add(5, 'months').format("DD/MM/YYYY");
var customEndDate = moment().startOf('year').add(1,'year').startOf('month').add(5, 'months').format("DD/MM/YYYY"); */
var customStartDate = "01/04/"+moment().startOf('year').format("YYYY");
var customEndDate = moment().format("DD/MM/YYYY");
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
onloadCalls();
function onloadCalls(){
	$(".tooltipCls").tooltip();
	$(".chosen-select").chosen();
	getTrainingAndPlacementOverViewDetails("");
	getJobFairOverViewDetails("all","jobFairId",0);
	getTrainingOverviewCourseWise(0);
	getDistrictDetails();
	getTopCompaniesHiringDetails("companiesHiringTabBlkId",0,0);
	getTrainingOverviewLocationWise(0,"trainingOverviewDetailsDivId");
	//getTrainingOverviewCollegeWise(0,"trainingOverviewCollegeWiseDivId");
	getTrendingOverView(1,1,"");
	getEventTypeDetails("","","");
}
var totalCourses = 0;
var totalStudentTrainedCount = 0;
var engineeringTotalCount = 0;
var degreeTotalCount = 0;
var postGraduateTotalCount = 0;
var othersTotalCount = 0;
var engineeringPerc = 0.0;
var degreePerc = 0.0;
var postGraduatePerc = 0.0;
var othersPerc = 0.0;
$(".chosen-select").chosen();
/* $("#dateRangeForTrainingId").daterangepicker({
	opens: 'left',
	 startDate: customStartDate,
	 endDate: customEndDate,
	locale: {
	  format: 'DD/MM/YYYY'
	},
	ranges: {
	   'All':[moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY"), moment().format("DD/MM/YYYY")],
	   'Today' : [moment(), moment()],
	   'Yesterday' : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	   'This Month': [moment().startOf('month'), moment().endOf('month')],
	   'Last 7 Days': [moment().subtract(7, 'days'), moment()],
	   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	   'This Year': [moment().startOf('Year'), moment()],
       'Last 1 Year': [moment().subtract(1, 'Year'), moment()]
	}
});
$('#dateRangeForTrainingId').on('apply.daterangepicker', function(ev, picker) {
    customStartDate=picker.startDate.format('DD/MM/YYYY');
	customEndDate=picker.endDate.format('DD/MM/YYYY');
	onloadCalls();
}); */
$("#dateRangePickerMGNF").val(customStartDate);
$("#dateRangePickerMGNT").val(customEndDate);
$("#dateRangePickerMGNF").datetimepicker({
	format: 'DD/MM/YYYY',
	viewMode:'months'
});
$("#dateRangePickerMGNT").datetimepicker({
	format: 'DD/MM/YYYY',
	viewMode:'months'
});
$('#dateRangePickerMGNT').on('dp.change', function(e){ 
	customEndDate = e.date.format("DD/MM/YYYY");
	onloadCalls();
});
$('#dateRangePickerMGNF').on('dp.change', function(e){ 
	customStartDate = e.date.format("DD/MM/YYYY");
	onloadCalls();
});
function getTrainingAndPlacementOverViewDetails(districtId){
	$("#trainingDetailsDivId").html(spinner);
	var json={
		"fromDateStr" :customStartDate,
		"toDateStr" : customEndDate,
		"locationId" : districtId
	}
	$.ajax({
		type:'POST',
		url:'getTrainingAndPlacementOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildTrainingAndPlacementDetails(result,districtId);
		}
	})
}
function buildTrainingAndPlacementDetails(result,districtId) {
	var trainingObj={"names":["Courses","Colleges","Trained Students","Training Locations","Trainers"], "images":["courses","collages","trained_students","trained_locations","trainers"], "counts":[result.courseCount,result.trainedCollege,result.trainedStudent,result.trainingLocation,result.trainersCount]};
	var placementsObj={"names":["Recruitment Drives","Colleges","Registered Candidates","Companies","Placed Candidates"], "images":["job_fairs","collages","trained_students","companies","placed_students"], "counts":[result.megaJobFairs,result.collegeCount,result.registeredCandidates,result.companiesParticipated,result.selectedCandidates]};
	var eventsObj={"names":["Industry Academia Conclave","TV5 College Connect Program"], "images":["nri-icon","TV5_logo"], "counts":[result.iacCount,result.tv5Count]};
	/* var HackathonObj={"names":["Courses","Colleges","Trained Students","Training Locations","Trainers"], "images":["courses","collages","trained_students","trained_locations","trainers"], "counts":[result.hackCourses,result.hackColleges,result.hackStudentsCount,result.trainingLocation,result.hackTrainers]}; */
	var length;
	
	var str='';
	str+='<div class="row m_top20">';
		if($(window).width()<800){
			str+='<div class="col-sm-6">';
		} else {
			str+='<div class="col-sm-6 pad_rgt4">';
		}
			str+='<div style="border:1px solid #FFA70F; border-radius:3px; padding:10px 5px;">';
				str+='<span class="headClrOrange font_weight font_16">';
					str+='<img src="Assests/images/seo-training.png" alt="..."> Trainings';
				str+='</span>';
				str+='<div class="li_blocks m_top10" style="border-spacing:4px 0px;">';
					str+='<ul class="blocksCls">';
					length=trainingObj.names.length;
					for(i=0;i<length;i++){
						if(trainingObj.names[i] != "Training Locations") {
							if($(window).width()<800){
								str+='<li class="li_border m_top5" style="display:block;">';
							} else {
								str+='<li class="li_border">';
							}
								str+='<div class="media">';
									str+='<div class="media-left pad_0">';
										str+='<img src="Assests/images/'+trainingObj.images[i]+'.png" class="media-object">';
									str+='</div>';
									str+='<div class="media-body">';
										str+='<h5 class="font_weight">'+trainingObj.names[i]+'</h5>';
									str+='</div>';
								str+='</div>';
								if(trainingObj.counts[i] !=null && trainingObj.counts[i]>0){
									str+='<h4 class="font_weight font_16 m_top20 companiesClkCls" attr_name="'+trainingObj.names[i]+'" attr_location="'+districtId+'" attr_block_name="trainingBlock" attr_type="Courses" attr_head_Name="'+trainingObj.names[i]+'" style="cursor:pointer;"><a>'+trainingObj.counts[i]+'</a></h4>';
								}else {
									str+='<h4 class="font_weight font_16 m_top20">-</h4>';
								}
							str+='</li>';
						}
					}
					str+='</ul>';
				str+='</div>';
			str+='</div>';	
		str+='</div>';
		if($(window).width()<800){
			str+='<div class="col-sm-6">';
		} else {
			str+='<div class="col-sm-6 pad_left4">';
		}
			str+='<div style="border:1px solid #40EAC2; border-radius:3px; padding:10px 5px;">';
				str+='<span class="headClrPlacement font_weight font_16">';
					str+='<img src="Assests/images/meeting.png" alt="..."> Placements';
				str+='</span>';
				str+='<div class="li_blocks m_top10" style="border-spacing:4px 0px;">';
					str+='<ul class="blocksCls">';
					length=placementsObj.names.length;
					for(i=0;i<length;i++){
						if(trainingObj.names[i] != "Colleges") {
							if($(window).width()<800){
								str+='<li class="li_border m_top5" style="display:block;">';
							} else {
								str+='<li class="li_border">';
							}
								str+='<div class="media">';
									str+='<div class="media-left pad_0">';
										str+='<img src="Assests/images/'+placementsObj.images[i]+'.png" class="media-object">';
									str+='</div>';
									str+='<div class="media-body">';
										str+='<h5 class="font_weight">'+placementsObj.names[i]+'</h5>';
									str+='</div>';
								str+='</div>';
								if(placementsObj.counts[i] !=null && placementsObj.counts[i]>0){
									str+='<h4 class="font_weight font_16 m_top15 companiesClkCls" attr_name="'+placementsObj.names[i]+'"  attr_location="'+districtId+'"  attr_block_name="PlacementsBlock" attr_head_Name="'+placementsObj.names[i]+'" style="cursor:pointer;"><a>'+placementsObj.counts[i]+'</a></h4>';
								}else {
									str+='<h4 class="font_weight font_16 m_top15">-</h4>';
								}
							str+='</li>';
						}
					}
					str+='</ul>';
				str+='</div>';
			str+='</div>';	
		str+='</div>';
	str+='</div>';
	 str+='<div class="row m_top10">';
		/* if($(window).width()<800){
			str+='<div class="col-sm-6">';
		} else {
			str+='<div class="col-sm-6 pad_rgt4">';
		}
			str+='<div style="border:1px solid #82A7E0; border-radius:3px; padding:10px 5px;">';
				str+='<span class="headClrOrange font_weight font_16" style="background: linear-gradient(to right, #82A7E0, #fff);">';
					str+='<img src="Assests/images/seo-training.png" alt="..."> Hackathon';
				str+='</span>';
				str+='<div class="li_blocks m_top10" style="border-spacing:4px 0px;">';
					str+='<ul class="blocksCls">';
					length=HackathonObj.names.length;
					for(i=0;i<length;i++){
						if(HackathonObj.names[i] != "Training Locations") {
							if($(window).width()<800){
								str+='<li class="li_border m_top5" style="display:block;">';
							} else {
								str+='<li class="li_border">';
							}
								str+='<div class="media">';
									str+='<div class="media-left pad_0">';
										str+='<img src="Assests/images/'+HackathonObj.images[i]+'.png" class="media-object">';
									str+='</div>';
									str+='<div class="media-body">';
										str+='<h5 class="font_weight">'+HackathonObj.names[i]+'</h5>';
									str+='</div>';
								str+='</div>';
								if(HackathonObj.counts[i] !=null && HackathonObj.counts[i]>0){
									str+='<h4 class="font_weight font_16 m_top20 companiesClkCls" attr_name="'+HackathonObj.names[i]+'" attr_location="'+districtId+'" attr_block_name="hackathonBlock" attr_type="hackathonCourses" attr_head_Name="'+HackathonObj.names[i]+'" style="cursor:pointer;"><a>'+HackathonObj.counts[i]+'</a></h4>';
								}else {
									str+='<h4 class="font_weight font_16 m_top20">-</h4>';
								}
							str+='</li>';
						}
					}
					str+='</ul>';
				str+='</div>';
			str+='</div>';	
		str+='</div>';  */
		if($(window).width()<800){
			str+='<div class="col-sm-6">';
		} else {
			str+='<div class="col-sm-6 pad_rgt4">';
		}
			str+='<div style="border:1px solid #5ACE30; border-radius:3px; padding:10px 5px;">';
				str+='<span class="headClrPlacement font_weight font_16" style="background: linear-gradient(to right, #5ACE30, #fff);">';
					str+='<img src="Assests/images/check-all.png" alt="..." style="width:4%;"> Events';
				str+='</span>';
				str+='<div class="li_blocks m_top10" style="border-spacing:4px 0px;">';
					str+='<ul class="blocksCls">';
					length=eventsObj.names.length;
					for(i=0;i<length;i++){
						if($(window).width()<800){
							str+='<li class="li_border m_top5" style="display:block;">';
						} else {
							str+='<li class="li_border">';
						}
							str+='<div class="media">';
								str+='<div class="media-left pad_0">';
									str+='<img src="Assests/images/'+eventsObj.images[i]+'.png" class="media-object" style="width:30px;">';
								str+='</div>';
								str+='<div class="media-body">';
									str+='<h5 class="font_weight">'+eventsObj.names[i]+'</h5>';
								str+='</div>';
							str+='</div>';
							if(eventsObj.counts[i] !=null && eventsObj.counts[i]>0){
								str+='<h4 class="font_weight font_16 m_top15 companiesClkCls" attr_name="'+eventsObj.names[i]+'"  attr_location="'+districtId+'"  attr_block_name="eventsBlock" attr_event="click" attr_head_Name="'+eventsObj.names[i]+'" style="cursor:pointer;"><a>'+eventsObj.counts[i]+'</a></h4>';
							}else {
								str+='<h4 class="font_weight font_16 m_top15">-</h4>';
							}
						str+='</li>';
					}
					str+='</ul>';
				str+='</div>';
			str+='</div>';		
		str+='</div>';		
	str+='</div>';
	$("#trainingDetailsDivId").html(str);
}

function getCoursesInfo(divId,districtId,type) {
	$("#"+divId).html(spinner);
	var json={
		"locationId" : districtId,
		"fromDateStr" :customStartDate,
		"toDateStr" : customEndDate,
		"type" : type
	}
	$.ajax({
		type:'POST',
		url:'getCoursesInfo',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildCoursesInfo(result,divId);
		}
	})
}
function buildCoursesInfo(result,divId) {
	var str='';
	var k=1;
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC m_top10" id="'+divId+'dataTable">';
			str+='<thead style="background-color:#E1F8FF;">';
				str+='<tr>';
					str+='<th>Id</th>';
					str+='<th>Name</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				str+='<tr>';
					str+='<td>'+k+'</td>';
					str+='<td>'+result[i].drivesName+'</td>';
				str+='</tr>';
				k=k+1;
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+divId+"dataTable").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
	});
}

function getTrainersInfo(divId,districtId,type) {
	$("#"+divId).html(spinner);
	var json={
		"locationId" : districtId,
		"fromDateStr" :customStartDate,
		"toDateStr" : customEndDate,
		"type" : type
	}
	$.ajax({
		type:'POST',
		url:'getTrainersInfo',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildCoursesInfo(result,divId);
		}
	})
}
function getJobFairOverViewDetails(drive,divId,districtId){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"locationId" : districtId,
		"type" : drive
	}
	$.ajax({
		type:'POST',
		url:'getJobFairOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildJobFairOverViewDetails(result,divId);
		}else{
			$("#jobFairId").html("<div class='table-responsive'><table class='table m_top10'><thead><th style='background-color:#E1F8FF;'><h4 class='text-center'>No Data Available</h4></th></thead></table></div>");
		}
	})
}
function buildJobFairOverViewDetails(result,divId) {
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table_custom_SC jobFairTableStyle m_top10" id="'+divId+'dataTable">';
			str+='<thead style="background-color:#E1F8FF;">';
				str+='<tr>';
					str+='<th>Name</th>';
					str+='<th>VENUE</th>';
					str+='<th>START DATE</th>';
					str+='<th>END DATE</th>';
					str+='<th>COMPANIES</th>';
					str+='<th>CANDIDATES REGISTERED</th>';
					//str+='<th><h6>CANDIDATES</h6>ATTENDED</th>';
					str+='<th>CANDIDATES SELECTED</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				str+='<tr>';
					str+='<td class="font_weight" style="text-align:left !important;">'+result[i].drivesName+'</td>';
					if(result[i].specialization != undefined) {
						str+='<td class="font_weight" style="text-align:left !important;">'+result[i].specialization+'</td>';
					} else {
						str+='<td class="font_weight">-</td>';
					}
					str+='<td>'+result[i].startDate+'</td>';
					str+='<td>'+result[i].endDate+'</td>';
					if(result[i].companiesParticipated !=null && result[i].companiesParticipated>0){
						str+='<td class="companiesClkCls" attr_head_Name="'+result[i].drivesName+'" attr_name="COMPANIES" attr_block_name="jobFairBlock" attr_id="'+result[i].id+'" style="cursor:pointer;"><a>'+result[i].companiesParticipated+'</a></td>';
					} else {
						str+='<td><a>-</a></td>';
					}
					if(result[i].registeredCandidates !=null && result[i].registeredCandidates>0){
						str+='<td class="companiesClkCls" attr_head_Name="'+result[i].drivesName+'" attr_name="REGISTERED" attr_block_name="jobFairBlock" attr_id="'+result[i].id+'" style="cursor:pointer;"><a>'+result[i].registeredCandidates+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					/*
					if(result[i].candidateAttended !=null && result[i].candidateAttended>0){
						str+='<td>'+result[i].candidateAttended+'</td>';
					} else {
						str+='<td>-</td>';
					}*/
					str+='<td class="companiesClkCls" attr_head_Name="'+result[i].drivesName+'" attr_name="SELECTED" attr_block_name="jobFairBlock" attr_id="'+result[i].id+'" style="cursor:pointer;"><a>'+result[i].selectedCandidates+'</a> <i class="fa fa-lg fa-check-circle" style="color:#77BFB2;"></i></td>';
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+divId+'dataTable').dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Labour Budget',
				filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
			},
			
		]
	});
}
function technicalAndNontechnical(districtId) {
	var str='';
	str+='<div class="table-responsive mb_20">';
		str+='<table class="table table-bordered table_custom_SC m_top10" id="techAndNonTech'+districtId+'" style="width:100% !important;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">Courses</th>';
					//str+='<th rowspan="2">Training Centers</th>';
					str+='<th rowspan="2">Total Students Trained</th>';
					str+='<th colspan="2">Engineering</th>';
					str+='<th colspan="2">Degree</th>';
					str+='<th colspan="2">Post Graduate</th>';
					str+='<th colspan="2">Others</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>count</th>';
					str+='<th>%</th>';
					str+='<th>count</th>';
					str+='<th>%</th>';
					str+='<th>count</th>';
					str+='<th>%</th>';
					str+='<th>count</th>';
					str+='<th>%</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				str+='<tr>';
					str+='<td class="text-primary companiesClkCls" attr_location="'+districtId+'" attr_name="Courses" attr_head_Name="Courses" attr_block_name="trainingOverviewAllBlock" attr_type="courses" id="coursedId" style="cursor:pointer;">0</td>';
					//str+='<td>-</td>';
					str+='<td class="text-primary companiesClkCls" attr_location="'+districtId+'" attr_name="totalStudentsTrained" attr_head_Name="Total Students Trained" attr_block_name="trainingOverviewAllBlock" attr_type="courses" style="cursor:pointer;" id="totalStudentTrainedCountId">0</td>';
					str+='<td class="text-primary companiesClkCls" attr_location="'+districtId+'"  attr_name="totalEngineeringCount" attr_head_Name="Engineering" attr_block_name="trainingOverviewAllBlock" attr_type="courses" style="cursor:pointer;" id="totalEngineeringCountId" >0</td>';
					str+='<td class="text-success" id="engineeringPercId">0</td>';
					str+='<td class="text-primary companiesClkCls" attr_location="'+districtId+'" attr_name="totalDegreeCount" attr_head_Name="Degree" attr_block_name="trainingOverviewAllBlock" attr_type="courses" style="cursor:pointer;" id="totalDegreeCountId">0</td>';
					str+='<td class="text-success" id="degreePercId">0</td>';
					str+='<td class="text-primary companiesClkCls"  attr_location="'+districtId+'" attr_name="totalPostGraduateCount" attr_head_Name="Post Graduate" attr_block_name="trainingOverviewAllBlock" attr_type="courses" style="cursor:pointer;" id="totalpostGraduateCountId">0</td>';
					str+='<td class="text-success" id="postGraduatePercId">0</td>';
					str+='<td class="text-primary companiesClkCls"  attr_location="'+districtId+'" attr_name="totalOthersCount" attr_head_Name="Others" attr_block_name="trainingOverviewAllBlock" attr_type="courses" style="cursor:pointer;" id="othersCountId">4,365</td>';
					str+='<td class="text-success" id="othersPercId">40.19%</td>';
				str+='</tr>';
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#allDetailsId").html(str); 
	$("#techAndNonTech"+districtId).dataTable({
		"order": [[ 7, "desc" ]],
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Labour Budget',
				filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
			},
			
		]
	});
}
function getTrainingOverviewCourseWise(districtId){
	$("#allDetailsId").html(spinner);
	$("#technicalId").html(spinner);
	$("#nonTechnicalId").html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"districtId" : districtId
	}
	$.ajax({
		type:'POST',
		url:'getTrainingOverviewCourseWise',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.technicalList != null && result.technicalList.length > 0){
			buildTrainingOverviewCourseWise(result.technicalList,"technicalId",districtId);
			buildTrainingOverviewCourseWiseForHackthon(result.technicalList,"techHacthonId",districtId);
		} else {
			$("#technicalId").html("<div class='text-center m_top_bottom' style='border:1px solid #ccc;'>No Data Available</div>");
			$("#trainHackathonDetailsDivId").html("<div class='text-center m_top_bottom' style='border:1px solid #ccc;'>No Data Available</div>");
		}
		if(result != null && result.nonTechnicalList != null && result.nonTechnicalList.length > 0){
			buildTrainingOverviewCourseWise(result.nonTechnicalList,"nonTechnicalId",districtId);
			technicalAndNontechnical(districtId);
		} else {
			$("#nonTechnicalId").html("<div class='text-center m_top_bottom' style='border:1px solid #ccc;'>No Data Available</div>");
			$("#allDetailsId").html("<div class='text-center m_top_bottom' style='border:1px solid #ccc;'>No Data Available</div>");
		}
		$("#coursedId").html(totalCourses);
		$("#totalStudentTrainedCountId").html(totalStudentTrainedCount);
		$("#totalEngineeringCountId").html(engineeringTotalCount);

		$('#totalEngineeringCountId').attr('attr_qualification_id', result.technicalList[0].qualificationTypeList[0].value);
		engineeringPerc = Math.round((engineeringTotalCount/totalStudentTrainedCount)*100);
		$("#engineeringPercId").html(engineeringPerc);
		$("#totalDegreeCountId").html(degreeTotalCount);
		$('#totalDegreeCountId').attr('attr_qualification_id', result.technicalList[0].qualificationTypeList[1].value);
		degreePerc = Math.round((degreeTotalCount/totalStudentTrainedCount)*100);
		$("#degreePercId").html(degreePerc);
		$("#totalpostGraduateCountId").html(postGraduateTotalCount);
		$('#totalpostGraduateCountId').attr('attr_qualification_id', result.technicalList[0].qualificationTypeList[2].value);
		postGraduatePerc = Math.round((postGraduateTotalCount/totalStudentTrainedCount)*100);
		$("#postGraduatePercId").html(postGraduatePerc);
		$("#othersCountId").html(othersTotalCount);
		$('#othersCountId').attr('attr_qualification_id', result.technicalList[0].qualificationTypeList[3].value);
		othersPerc = Math.round((othersTotalCount/totalStudentTrainedCount)*100);
		$("#othersPercId").html(othersPerc);
	})
}
function buildTrainingOverviewCourseWise(result,divId,districtId) {
	var str='';
	if($(window).width() < 800) {
		str+='<div class="table-responsive mb_20">';
	}
		str+='<table class="table table-bordered table_custom_SC m_top10" id="'+divId+'dataTable" style="min-width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">Course Name</th>';
					//str+='<th rowspan="2">Training Centers</th>';
					str+='<th rowspan="2">Total Students Trained</th>';
					for(var i in result[0].qualificationTypeList) {
						str+='<th colspan="2">'+result[0].qualificationTypeList[i].property+'</th>';
					}
				str+='</tr>';
				str+='<tr>';
				for(var i in result[0].qualificationTypeList) {
					str+='<th>count</th>';
					str+='<th>%</th>';		
				}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
			if(result[i].courseId != 4 && result[i].courseId != 5){
				totalCourses = totalCourses + 1;
				totalStudentTrainedCount = totalStudentTrainedCount + result[i].totalStudentTrained;
				str+='<tr>';
					str+='<td style="text-align:left !important;">'+result[i].courseName+'</td>';
					/* if(result[i].trainingCenterCount !=null && result[i].trainingCenterCount>0){
						str+='<td><u>'+result[i].trainingCenterCount+'</u></td>';
					} else {
						str+='<td>-</td>';  
					} */
					
					str+='<td class="companiesClkCls" attr_location="'+districtId+'" attr_companyId="'+result[i].courseId+'" attr_name="trainedStudents" attr_head_Name="'+result[i].courseName+'" attr_block_name="technicalBlock" attr_type="courses" style="cursor:pointer;" ><a>'+result[i].totalStudentTrained+'</a></td>';
					
					for(var j in result[i].qualificationTypeList) {
						if(result[i].qualificationTypeList[j].property	== "Engineering"){
							engineeringTotalCount = engineeringTotalCount + result[i].qualificationTypeList[j].count;
						}else if(result[i].qualificationTypeList[j].property	== "Degree"){
							degreeTotalCount = degreeTotalCount + result[i].qualificationTypeList[j].count;
						} else if(result[i].qualificationTypeList[j].property	== "Post Graduate"){
							postGraduateTotalCount = postGraduateTotalCount + result[i].qualificationTypeList[j].count;
						} else {
							othersTotalCount = othersTotalCount + result[i].qualificationTypeList[j].count;
						}
						if(result[i].qualificationTypeList[j].count !=null && result[i].qualificationTypeList[j].count>0){
							str+='<td class="companiesClkCls"  attr_location="'+districtId+'" attr_companyId="'+result[i].courseId+'" attr_name="qualificationCount" attr_qualification_id="'+result[i].qualificationTypeList[j].value+'" attr_head_Name="'+result[i].courseName+'" attr_block_name="technicalBlock" attr_type="courses" style="cursor:pointer;"><a>'+result[i].qualificationTypeList[j].count+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result[i].qualificationTypeList[j].percent !=null && result[i].qualificationTypeList[j].percent>0){
							str+='<td class="text-success">'+result[i].qualificationTypeList[j].percent+'%</td>';
						} else {
							str+='<td class="text-success">-</td>';
						}
					}
					str+='</tr>';
					
				}
			}
			str+='</tbody>';
		str+='</table>';
	if($(window).width() < 800) {	
		str+='</div>';
	}
	$("#"+divId).html(str);
	$("#"+divId+'dataTable').dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Labour Budget',
				filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
			},
			
		]
	});
}
function buildTrainingOverviewCourseWiseForHackthon(result,divId,districtId) {
	var str='';
	if($(window).width() < 800) {
		str+='<div class="table-responsive mb_20">';
	}
		str+='<table class="table table-bordered table_custom_SC m_top10" id="'+divId+'dataTable" style="min-width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">Technology</th>';
					//str+='<th rowspan="2">Training Centers</th>';
					str+='<th rowspan="2">CANDIDATES PARTICIPATED</th>';
					for(var i in result[0].qualificationTypeList) {
						str+='<th colspan="2">'+result[0].qualificationTypeList[i].property+'</th>';
					}
				str+='</tr>';
				str+='<tr>';
				for(var i in result[0].qualificationTypeList) {
					str+='<th>count</th>';
					str+='<th>%</th>';		
				}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				if(result[i].courseId == 4 || result[i].courseId == 5){
				str+='<tr>';
					str+='<td style="text-align:left !important;">'+result[i].courseName+'</td>';
					/* if(result[i].trainingCenterCount !=null && result[i].trainingCenterCount>0){
						str+='<td><u>'+result[i].trainingCenterCount+'</u></td>';
					} else {
						str+='<td>-</td>';  
					} */
					str+='<td class="companiesClkCls" attr_location="'+districtId+'" attr_companyId="'+result[i].courseId+'" attr_name="trainedStudents" attr_head_Name="'+result[i].courseName+'" attr_block_name="technicalBlock" attr_type="hackathonCourses" style="cursor:pointer;" ><a>'+result[i].totalStudentTrained+'</a></td>';
					
					for(var j in result[i].qualificationTypeList) { 
						/* if(result[i].qualificationTypeList[j].property	== "Engineering"){
							engineeringTotalCount = engineeringTotalCount + result[i].qualificationTypeList[j].count;
						}else if(result[i].qualificationTypeList[j].property	== "Degree"){
							degreeTotalCount = degreeTotalCount + result[i].qualificationTypeList[j].count;
						} else if(result[i].qualificationTypeList[j].property	== "Post Graduate"){
							postGraduateTotalCount = postGraduateTotalCount + result[i].qualificationTypeList[j].count;
						} else {
							othersTotalCount = othersTotalCount + result[i].qualificationTypeList[j].count;
						} */
						if(result[i].qualificationTypeList[j].count !=null && result[i].qualificationTypeList[j].count>0){
							str+='<td class="companiesClkCls"  attr_location="'+districtId+'" attr_companyId="'+result[i].courseId+'" attr_name="qualificationCount" attr_qualification_id="'+result[i].qualificationTypeList[j].value+'" attr_head_Name="'+result[i].courseName+'" attr_block_name="technicalBlock" attr_type="hackathonCourses" style="cursor:pointer;"><a>'+result[i].qualificationTypeList[j].count+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result[i].qualificationTypeList[j].percent !=null && result[i].qualificationTypeList[j].percent>0){
							str+='<td class="text-success">'+result[i].qualificationTypeList[j].percent+'%</td>';
						} else {
							str+='<td class="text-success">-</td>';
						}
					}
					str+='</tr>';
					
				}
			}
			str+='</tbody>';
		str+='</table>';
	if($(window).width() < 800) {	
		str+='</div>';
	}
	$("#trainHackathonDetailsDivId").html(str);
	$("#"+divId+'dataTable').dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Labour Budget',
				filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
			},
			
		]
	});
}
function getDistrictDetails(){
	var json={
	}
	$.ajax({
		type:'POST',
		url:'getDistrictDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result!=undefined ){
			for(var i in result){
				$("#trainingOverViewDistrictDrpId,#trainingOverviewSelId").append('<option value="'+result[i].id+'">'+result[i].drivesName+'</option>');
				$("#trainingOverViewDistrictDrpId,#trainingOverviewSelId").trigger("chosen:updated");
			}
		}
	})
}
function getTopCompaniesHiringDetails(divId,id,districtId){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"locationId" :districtId,
		"driveTypeId" :id
	}
	$.ajax({
		type:'POST',
		url:'getTopCompaniesHiringDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result!=undefined ){
			buildTopCompaniesHiringDetails(result,divId,id,districtId);
		}
	})
}
function buildTopCompaniesHiringDetails(result,divId,driveTypeId,districtId){
	var str='';
	if($(window).width()<800){
		str='<div class="table-responsive m_top10">';
	}
		str+='<table class="table table-bordered m_top10 table_custom_SC" id="'+divId+'dataTable" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">Rank</th>';
					str+='<th rowspan="2" style="width:25%;">Company Name</th>';
					str+='<th rowspan="2">Sector Name</th>';
					str+='<th  colspan="4">';
						str+='<h5 class="font_12 font_weight icon_stl"><img src="Assests/images/Group 1251.png" class="media-object">Hired Candidates</h5>';
					str+='</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>Male</th>';
					str+='<th>Female</th>';
					str+='<th>Transgender</th>';
					str+='<th>Not Specified</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td><div class="companies_rounded">'+result[i].rank+'</div></td>';
					str+='<td style="text-align:left !important;">'+result[i].drivesName+'</td>';
					str+='<td>'+result[i].candidateName+'</td>';
					if(result[i].megaJobFairs>0){//pj
						str+='<td class="companiesClkCls" attr_location="'+districtId+'" attr_drive_typeId="'+driveTypeId+'" attr_head_Name="'+result[i].drivesName+'" attr_name="MALE" attr_companyId="'+result[i].companiesParticipated+'" attr_block_name="topCompanies" style="cursor:pointer;"><a>'+result[i].megaJobFairs+'</a></td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].individualDrives>0){
						str+='<td class="companiesClkCls" attr_location="'+districtId+'" attr_drive_typeId="'+driveTypeId+'" attr_head_Name="'+result[i].drivesName+'" attr_name="FEMALE" attr_companyId="'+result[i].companiesParticipated+'" attr_block_name="topCompanies" style="cursor:pointer;"><a>'+result[i].individualDrives+'</a></td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].transgenderCount>0){
						str+='<td class="companiesClkCls" attr_location="'+districtId+'" attr_drive_typeId="'+driveTypeId+'" attr_head_Name="'+result[i].drivesName+'" attr_name="TRANSGENDER" attr_companyId="'+result[i].companiesParticipated+'" attr_block_name="topCompanies" style="cursor:pointer;"><a>'+result[i].transgenderCount+'</a></td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].otherGnederCount>0){
						str+='<td class="companiesClkCls" attr_location="'+districtId+'" attr_drive_typeId="'+driveTypeId+'" attr_head_Name="'+result[i].drivesName+'" attr_gender_type="genderType" attr_name="NOT SPECIFIED" attr_companyId="'+result[i].companiesParticipated+'" attr_block_name="topCompanies" style="cursor:pointer;"><a>'+result[i].otherGnederCount+'</a></td>';
					}else{
						str+='<td>-</td>';
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	if($(window).width()<800){	
		str+='</div>';
	}
	$("#"+divId).html(str);
	$("#"+divId+'dataTable').dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Labour Budget',
				filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
			},
			
		]
		
	});
}

function getTrainingOverviewLocationWise(districtId,divId){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		districtId : districtId
	}
	$.ajax({
		type:'POST',
		url:'getTrainingOverviewLocationWise',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildTrainingOverviewLocationWiseDetails(result,divId); 
		}else {
			$("#trainingOverviewDetailsDivId").html("No Data Available");
		}
	})
}
function buildTrainingOverviewLocationWiseDetails(result,divId) {
	var str='';
	if($(window).width()<800){
		str+='<div class="table-responsive">';
	}
		str+='<table class="table table-bordered m_top10 table_custom_SC" id="'+divId+'dataTable" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
				if(divId == "trainingOverviewDetailsDivId") {
					str+='<th rowspan="3">District Name</th>';
					//str+='<th rowspan="3">Colleges</th>';
				} else {
					str+='<th rowspan="3">College Name</th>';
					str+='<th rowspan="3">Address</th>';
					str+='<th rowspan="3">College Location</th>';
				}
					str+='<th colspan="5">Students Trained</th>';
					str+='<th colspan="5">Students Placement</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th rowspan="2">Total</th>';
					str+='<th colspan="2">Technical</th>';
					str+='<th colspan="2">Non Technical</th>';
					str+='<th rowspan="2">Registered</th>';
					str+='<th colspan="2">Placed</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>count</th>';
					str+='<th>%</th>';
					str+='<th>count</th>';
					str+='<th>%</th>';
					str+='<th>count</th>';
					str+='<th>%</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result.locationDetailsList) {
				if(result.locationDetailsList[i].districtName != "Not Specified"){
					str+='<tr>';
						str+='<td style="text-align:left !important;">'+result.locationDetailsList[i].districtName+'</td>';
						/* if(result.locationDetailsList[i].collegesCount !=null && result.locationDetailsList[i].collegesCount>0) {
							str+='<td class="" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock" attr_location="'+result.locationDetailsList[i].districtId+'" attr_name="collages" attr_college_id="'+result.locationDetailsList[i].collegesCount+'"><a>'+result.locationDetailsList[i].collegesCount+'</a></td>';
						} else {
							str+='<td>-</td>';
						} */
						if(result.locationDetailsList[i].totalStudentTrained !=null && result.locationDetailsList[i].totalStudentTrained>0) {
							str+='<td class="companiesClkCls" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock" attr_location="'+result.locationDetailsList[i].districtId+'" attr_name="total"><a>'+result.locationDetailsList[i].totalStudentTrained+'</a></td>'; 
						} else {
							str+='<td>-</td>';
						}
						if(result.locationDetailsList[i].totalTechnicalStudent !=null && result.locationDetailsList[i].totalTechnicalStudent>0) {
							str+='<td class="companiesClkCls" attr_specialization="'+result.locationDetailsList[i].technicalId+'" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock" attr_location="'+result.locationDetailsList[i].districtId+'" attr_name="technicalCount"><a>'+result.locationDetailsList[i].totalTechnicalStudent+'</a></td>';
						} else {
							str+='<td>-</td>';
						}//pj
						if(result.locationDetailsList[i].totalTechnicalStudentPercent !=null && result.locationDetailsList[i].totalTechnicalStudentPercent>0) {
							str+='<td class="text-success">'+result.locationDetailsList[i].totalTechnicalStudentPercent+'%</td>';
						} else {
							str+='<td class="text-success">-</td>';
						}
						if(result.locationDetailsList[i].totalNonTechnicalStudent !=null && result.locationDetailsList[i].totalNonTechnicalStudent>0) {
							str+='<td class="companiesClkCls" attr_specialization="'+result.locationDetailsList[i].nonTechnicalId+'" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock" attr_location="'+result.locationDetailsList[i].districtId+'" attr_name="nonTechnicalCount"><a>'+result.locationDetailsList[i].totalNonTechnicalStudent+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result.locationDetailsList[i].totalNonTechnicalStudentPercent !=null && result.locationDetailsList[i].totalNonTechnicalStudentPercent>0) {
							str+='<td class="text-success" attr_id="'+result.locationDetailsList[i].districtId+'">'+result.locationDetailsList[i].totalNonTechnicalStudentPercent+'%</td>';
						} else {
							str+='<td class="text-success">-</td>';
						}
						if(result.locationDetailsList[i].registeredCount !=null && result.locationDetailsList[i].registeredCount>0) {
							str+='<td class="companiesClkCls" attr_name="registered" attr_location="'+result.locationDetailsList[i].districtId+'" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock"><a>'+result.locationDetailsList[i].registeredCount+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result.locationDetailsList[i].placedStudentCount !=null && result.locationDetailsList[i].placedStudentCount>0) {
							str+='<td class="companiesClkCls" attr_name="placed" attr_location="'+result.locationDetailsList[i].districtId+'" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock"><a>'+result.locationDetailsList[i].placedStudentCount+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result.locationDetailsList[i].placedStudentPercent !=null && result.locationDetailsList[i].placedStudentPercent>0) {
							str+='<td class="text-success">'+result.locationDetailsList[i].placedStudentPercent+'%</td>';
						} else {
							str+='<td>-</td>';
						}
					str+='</tr>';
				}
			}
			str+='</tbody>';
			str+='<tfoot>';
				for(var i in result.locationDetailsList) {
					if(result.locationDetailsList[i].districtName =="Not Specified"){
						str+='<tr>';
							str+='<td style="text-align:left !important;">'+result.locationDetailsList[i].districtName+'</td>';
						if(result.locationDetailsList[i].totalStudentTrained !=null && result.locationDetailsList[i].totalStudentTrained>0) {
							str+='<td class="companiesClkCls" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock" attr_location="'+result.locationDetailsList[i].districtId+'" attr_name="total"><a>'+result.locationDetailsList[i].totalStudentTrained+'</a></td>'; 
						} else {
							str+='<td>-</td>';
						}
						if(result.locationDetailsList[i].totalTechnicalStudent !=null && result.locationDetailsList[i].totalTechnicalStudent>0) {
							str+='<td class="companiesClkCls" attr_specialization="'+result.locationDetailsList[i].technicalId+'" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock" attr_location="'+result.locationDetailsList[i].districtId+'" attr_name="technicalCount"><a>'+result.locationDetailsList[i].totalTechnicalStudent+'</a></td>';
						} else {
							str+='<td>-</td>';
						}//pj
						if(result.locationDetailsList[i].totalTechnicalStudentPercent !=null && result.locationDetailsList[i].totalTechnicalStudentPercent>0) {
							str+='<td class="text-success">'+result.locationDetailsList[i].totalTechnicalStudentPercent+'%</td>';
						} else {
							str+='<td class="text-success">-</td>';
						}
						if(result.locationDetailsList[i].totalNonTechnicalStudent !=null && result.locationDetailsList[i].totalNonTechnicalStudent>0) {
							str+='<td class="companiesClkCls" attr_specialization="'+result.locationDetailsList[i].nonTechnicalId+'" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock" attr_location="'+result.locationDetailsList[i].districtId+'" attr_name="nonTechnicalCount"><a>'+result.locationDetailsList[i].totalNonTechnicalStudent+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result.locationDetailsList[i].totalNonTechnicalStudentPercent !=null && result.locationDetailsList[i].totalNonTechnicalStudentPercent>0) {
							str+='<td class="text-success" attr_id="'+result.locationDetailsList[i].districtId+'">'+result.locationDetailsList[i].totalNonTechnicalStudentPercent+'%</td>';
						} else {
							str+='<td class="text-success">-</td>';
						}
						if(result.locationDetailsList[i].registeredCount !=null && result.locationDetailsList[i].registeredCount>0) {
							str+='<td class="companiesClkCls" attr_name="registered" attr_district_type="districtType" attr_location="0" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock"><a>'+result.locationDetailsList[i].registeredCount+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result.locationDetailsList[i].placedStudentCount !=null && result.locationDetailsList[i].placedStudentCount>0) {
							str+='<td class="companiesClkCls" attr_name="placed" attr_district_type="districtType" attr_location="0" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock"><a>'+result.locationDetailsList[i].placedStudentCount+'</a></td>';
						} else {
							str+='<td>-</td>';
						}
						if(result.locationDetailsList[i].placedStudentPercent !=null && result.locationDetailsList[i].placedStudentPercent>0) {
							str+='<td class="text-success">'+result.locationDetailsList[i].placedStudentPercent+'%</td>';
						} else {
							str+='<td>-</td>';
						}
						str+='</tr>';
					}
					
				}
			str+='</tfoot>';
		str+='</table>';
	if($(window).width()<800){	
		str+='</div>';
	}
	$("#"+divId).html(str);
	$("#"+divId+'dataTable').dataTable({
		"paging":   false,
		"info":     false,
		"searching": true,
		"autoWidth": true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Labour Budget',
				filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
			},
			
		]
	});
}

/* function getTrainingOverviewCollegeWise(districtId,divId){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		districtId : districtId
	}
	$.ajax({
		type:'POST',
		url:'getTrainingOverviewCollegeWise',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
		   xhr.setRequestHeader("Accept", "application/json");
		   xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildTrainingOverviewLocationWiseDetails(result,divId); 
		}
	})
} */
//clicks
function getTrainingColleges(divId,districtId,type){
	$("#"+divId).html(spinner);
	var json={
		districtId : districtId,
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"type" : type
	}
	$.ajax({
		type:'POST',
		url:'getTrainingColleges',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildTrainingColleges(result,divId); 
		}
	})
}
function buildTrainingColleges(result,divId){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC m_top10" id="'+divId+'dataTable">';
			str+='<thead style="background-color:#E1F8FF;">';
				str+='<tr>';
					str+='<th>College Name</th>';
					str+='<th>Address</th>';
					str+='<th>District</th>';
					str+='<th>Trained Students</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result.collegeDetailsList) {
				str+='<tr>';
					str+='<td style="text-align:left !important; min-width:15%;">'+result.collegeDetailsList[i].collegeName+'</td>';
					str+='<td style="text-align:left !important; min-width:15%;">'+result.collegeDetailsList[i].address+'</td>';
					str+='<td style="text-align:left !important; min-width:15%;">'+result.collegeDetailsList[i].districtName+'</td>';
					if(result.collegeDetailsList[i].totalStudentTrained !=null && result.collegeDetailsList[i].totalStudentTrained>0) {
						str+='<td style="min-width:15%;">'+result.collegeDetailsList[i].totalStudentTrained+'</td>';
					} else {
						str+='<td>-</td>';
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+divId+"dataTable").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
	});
}

function getPlacementCollegeDetails(divId){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		locationId : 0
	}
	$.ajax({
		type:'POST',
		url:'getPlacementCollegeDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildPlacementCollegeDetails(result,divId); 
		}
	})
}
function buildPlacementCollegeDetails(result,divId) {
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC m_top10" id="'+divId+'dataTable">';
			str+='<thead style="background-color:#E1F8FF;">';
				str+='<tr>';
					str+='<th>S.no</th>';
					str+='<th>College Name</th>';
					//str+='<th>Status Name</th>';
					//str+='<th>District Name</th>';
					//str+='<th>Registered Candidates</th>';
					str+='<th>Selected Candidates</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				str+='<tr>';
					str+='<td>'+result[i].id+'</td>';
					str+='<td style="text-align:left !important;">'+result[i].drivesName+'</td>';
					/* str+='<td>'+result[i].candidateName+'</td>';
					str+='<td>'+result[i].district+'</td>';
					if(result[i].registeredCandidates !=null && result[i].registeredCandidates>0){
						str+='<td>'+result[i].registeredCandidates+'</td>';
					} else {
						str+='<td>-</td>';
					} */
					if(result[i].selectedCandidates !=null && result[i].selectedCandidates>0) {
						str+='<td>'+result[i].selectedCandidates+'</td>';
					} else {
						str+='<td>-</td>';
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+divId+"dataTable").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
	});
}
function getCandidatesOverViewDetails(type,divId,districtId,id,gender,companyId,collegeId,overViewType,minVlue,maxValue,selectedCanidatesInOverview,districtType,genderType){ 
	$("#"+divId).html(spinner);	
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"districtId" : districtId,
		"type"	: type,
		"driveTypeId" :id,
		"districtType" : districtType,
		"genderType" : genderType,
		"gender" : gender,
		"companyId" : companyId,
		"collegeId" : collegeId,
		"overViewType":overViewType,
		"minValue":minVlue,
		"maxValue":maxValue,
		"trainingtype":selectedCanidatesInOverview
	}
	$.ajax({
		type:'POST',
		url:'getCandidatesOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildCandidatesOverViewDetails(result,type,divId,overViewType,json);
		}else{
			$("#"+divId).html("No Data Available");
		}
	})
}
function buildCandidatesOverViewDetails(result,type,divId,overViewType,jsObj){
	var tableView ='';
	tableView+='<div class="table-responsive m_top20">';
		tableView+='<table class="table table-bordered table_custom_SC dataTableCandidateWise">'; // '+type+'
			tableView+='<thead>';
				tableView+='<tr>';
					tableView+='<th>Candidate Name</th>';
					//tableView+='<th>Contact Number</th>';
					tableView+='<th>Qualification</th>';
					tableView+='<th>Community</th>';
					tableView+='<th>District</th>';
					tableView+='<th>Specialization in Graduation</th>';
					if(overViewType != "overViewType"){
						if(type != "registered Candidate") {
						tableView+='<th>Job Role</th>';
						//tableView+='<th>CTC</th>';
						tableView+='<th>Company Name</th>';
						} else {
							tableView+='<th>jobfair Name</th>';
						}
					}
					
				tableView+='</tr>';				
			tableView+='</thead>';			
			tableView+='<tbody>';
				for( var i in result){
				tableView+='<tr>';
					if(result[i].candidateName != null && result[i].candidateName.length >0){
						tableView+='<td style="text-align:left !important; min-width:18%;">'+result[i].candidateName+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					/* if(result[i].contactNumber != null && result[i].contactNumber >0){
						tableView+='<td>'+result[i].contactNumber+'</td>';
					}else{
						tableView+='<td>-</td>';
					} */
					if(result[i].qualification != null && result[i].qualification.length >0){
						tableView+='<td>'+result[i].qualification+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].community != null && result[i].community.length >0){
						tableView+='<td>'+result[i].community+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].district != null && result[i].district.length >0){
						tableView+='<td>'+result[i].district+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(result[i].specialization != null && result[i].specialization.length >0){
						tableView+='<td>'+result[i].specialization+'</td>';
					}else{
						tableView+='<td>-</td>';
					}
					if(overViewType != "overViewType"){
						if(type != "registered Candidate") {
							if(result[i].jobRole != null && result[i].jobRole.length >0){
								tableView+='<td>'+result[i].jobRole+'</td>';
							}else{
								tableView+='<td>-</td>';
							}
							/* if(result[i].salary != null && result[i].salary >0){
								tableView+='<td>'+result[i].salary+'</td>';
							}else{
								tableView+='<td>-</td>';
							} */
							if(result[i].drivesName != null && result[i].drivesName.length >0){
								tableView+='<td>'+result[i].drivesName+'</td>';
							}else{
								tableView+='<td>-</td>';
							}	
						} else {
							if(result[i].placementType != null && result[i].placementType.length >0){
								tableView+='<td>'+result[i].placementType+'</td>';
							}else{
								tableView+='<td>-</td>';
							}
						}
					}
				tableView+='</tr>';
				}				
			tableView+='</tbody>';			
		tableView+='</table>';
	tableView+='</div>';
	$("#"+divId).html(tableView);
			if (jsObj.minValue == 0) { 
				var itemsCount = result[0].recordCount;
				var maxResults = jsObj.maxValue;
				$("#paginationCountDivId").html('<h4 style="color:#337ab7;">Total Records: ' +itemsCount+'</h4>');
				$("#paginationDivId").html('');
				$("#paginationDivId").pagination({
					"iDisplayLength": 10,
					items: itemsCount,
					itemsOnPage: maxResults,
					cssStyle: 'light-theme',
					onPageClick: function(pageNumber, event) {
					var startFromResult2 = (pageNumber - 1) * 10;
				getCandidatesOverViewDetails(jsObj.type,divId,jsObj.districtId,jsObj.driveTypeId,jsObj.gender,jsObj.companyId,jsObj.collegeId,jsObj.overViewType,startFromResult2,jsObj.maxValue,jsObj.trainingtype,jsObj.districtType,jsObj.genderType)	
			}
		});
	 }
	$('.dataTableCandidateWise').dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		 "paging":   false,
		 "info":     false,
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
	});
	$(".chosen-select").chosen();
} 

function getTrainingStudentDetails(divId,qualificationId,companyId,districtId,specializationId,collegeId,overViewType,minValue,type){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"locationId" : districtId,
		"companyId" : companyId,
		"qualificationId" : qualificationId,
		"specializationId" : specializationId,
		"casteGroupId" : collegeId,
		"overViewType":overViewType,
		"minValue":minValue,
		"maxValue":10,
		"type" : type
	}
	$.ajax({
		type:'POST',
		url:'getTrainingStudentDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildTrainingStudentDetails(result,divId,json); 
		}
	})
}
function buildTrainingStudentDetails(result,divId,jsObj) {
	var tableView='';
	tableView+='<div class="table-responsive m_top20">';
		tableView+='<table class="table table-bordered table_custom_SC dataTable" id="'+divId+'dataTable">';
			tableView+='<thead>';
				tableView+='<tr>';
					tableView+='<th>Candidate Name</th>';
					tableView+='<th>Qualification</th>';
					tableView+='<th>Community</th>';
					tableView+='<th>District</th>';
					tableView+='<th>Specialization in Graduation</th>';
					//tableView+='<th>College Name</th>';
				tableView+='</tr>';	
			tableView+='</thead>';	
			tableView+='<tbody>';
			for(var i in result) {
				tableView+='<tr>';
					tableView+='<td style="text-align:left !important; min-width:18%;">'+result[i].candidateName+'</td>';
					tableView+='<td>'+result[i].qualification+'</td>';
					tableView+='<td>'+result[i].community+'</td>';
					tableView+='<td>'+result[i].district+'</td>';
					if(result[i].specialization != null && result[i].specialization.length >0){
						tableView+='<td>'+result[i].specialization+'</td>';
					} else {
						tableView+='<td>-</td>';
					}
					//tableView+='<td>'+result[i].drivesName+'</td>';
				tableView+='</tr>';
			}
			tableView+='</tbody>';	
		tableView+='</table>';
	tableView+='</div>';	
	$("#"+divId).html(tableView);
	if (jsObj.minValue == 0) { 
				var itemsCount = result[0].recordCount;
				var maxResults = jsObj.maxValue;
				$("#paginationCountDivId").html('<h4 style="color:#337ab7;">Total Records: ' +itemsCount+'</h4>');
				$("#paginationDivId").html('');
				$("#paginationDivId").pagination({
					items: itemsCount,
					itemsOnPage: maxResults,
					cssStyle: 'light-theme',
					onPageClick: function(pageNumber, event) {
						var startFromResult2 = (pageNumber - 1) * 10;
				getTrainingStudentDetails(divId,jsObj.qualificationId,jsObj.companyId,jsObj.locationId,jsObj.specializationId,jsObj.casteGroupId,jsObj.overViewType,startFromResult2,jsObj.type)			
			}
		});
	 }
	$("#"+divId+'dataTable').dataTable({
		 "paging":   false,
		 "info":     false,
		"aLengthMenu": [[10, 15, 20,50, -1], [10, 15, 20,50, "All"]],
		"retrieve":true
	});
}
$(document).on("click",".activateCls li",function(){
	$(".activateCls li").removeClass("active");	
	$(this).addClass("active");
});	
$(document).on("click",".yearActivateCls li",function(){
	$(".yearActivateCls li").removeClass("active");	
	$(this).addClass("active");
});
$(document).on("click",".jobFairClkCls li",function(){
	$(".jobFairClkCls li").removeClass("active"); 
	$(this).addClass("active");  
	var drive = $(this).attr("attr_name");
	getJobFairOverViewDetails(drive,"jobFairId");
});
$(document).on("change","#trainingOverViewDistrictDrpId",function(){
	var districtId=$(this).val();
	getTopCompaniesHiringDetails("companiesHiringTabBlkId",0,districtId);
	
});
$(document).on("change","#trainingOverviewSelId",function(){
	var districtId=$(this).val();
	getTrainingOverviewCourseWise(districtId);	
});
/* $(document).on("change","#collageWiseDistritSelId",function(){
	var districtId=$(this).val();
	getTrainingOverviewCollegeWise(districtId,"trainingOverviewCollegeWiseDivId");	
}); */ 

$(document).on("click",".getTrendingDetailsCls",function(){
	var yearId='';
	var monthId='';
	
	$('.activateCls li').each(function(i, obj){
		 if($(this).hasClass("active")){
			monthId = $(this).attr("attr_monthId")
		 }
	});
	$('.yearActivateCls li').each(function(i, obj){
		 if($(this).hasClass("active")){
			yearId = $(this).attr("attr_yearId")
		 }
	});
	getTrendingOverView(yearId,monthId,"");
});
function getTrendingOverView(yearId,monthId,districtId){
	$("#trendingGraphDivId").html(spinner);
	var json={
		  "fromDateStr" : customStartDate,
		  "toDateStr" : customEndDate,
		  "locationId" :  districtId,
		  "companyId" : yearId,//Year
		  "casteGroupId" : monthId
	}
	$.ajax({
		type:'POST',
		url:'getTrendingOverView',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildTrendingOverView(result);
		}else{
			$("#trendingGraphDivId").html("No Data Available");
		}
	})
}
function buildTrendingOverView(result){
	var str='';
	if(result !=null && result.length>0){
		str+='<div class="row">';
			str+='<div class="col-sm-12 m_top10">';
				if(result.length>=3){
						str+='<ul class="list-inline multiGraphSlickCls">';
				}else{
					str+='<div class="multiGraphCls">';
						str+='<ul class="list-inline multiGraphUlCls">';
				}
					for(var i in result){
						str+='<li class="" style="border:1px solid #ddd;padding:5px;">';
							str+='<div id="trendingGraph'+result[i].id+'DivId" style="height:250px;"></div>';
						str+='</li>';
					}
					if(result.length>=3){
						str+='</ul>';
					}else{
						str+='</ul>';
						str+='</div>';	
					}	
			str+='</div>';
		str+='</div>';
		
		$("#trendingGraphDivId").html(str);
		if(result.length>=3){
			$(".multiGraphSlickCls").slick({
				slides:'li',
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				variableWidth: false,
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
		
	}	
	if(result !=null && result.length>0){
		for(var i in result){
			var categoriesArr=[];
			var trainingBatchArr=[];
			var jobFairCountArr=[];
			if(result[i].apitaSubList !=null && result[i].apitaSubList.length>0){
				for(var j in result[i].apitaSubList){
					categoriesArr.push(result[i].apitaSubList[j].drivesName);
					trainingBatchArr.push(result[i].apitaSubList[j].trainersCount);
					jobFairCountArr.push(result[i].apitaSubList[j].jobFairCount);
					
				}
			}
			$('#trendingGraph'+result[i].id+'DivId').highcharts({
				
				chart: {
					type: 'column'
				},
				title: {
					text: result[i].id
				},
				subtitle: {
					text: ''
				},
				xAxis: {
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					categories: categoriesArr,
					crosshair: true
				},
				yAxis: {
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					tickInterval: 20,
					title: {
						text: ''
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
					column: {
						pointWidth: 20,
						gridLineWidth: 10
					}
				},
				series: [{
					name: 'Trained Batches',
					data: trainingBatchArr,
					color:'#07C59F'

				}, {
					name: 'Job Fairs',
					data: jobFairCountArr,
					color:'#0EB6D9'

				}]
			});
		}
	}
}
$(document).on("click",".companiesClkCls",function(){
	$("#paginationDivId").html('');
	$("#paginationCountDivId").html('');
	$('.widthclass').css("width","95%");
	var type = $(this).attr("attr_type");
	var id = $(this).attr("attr_id");
	var event = $(this).attr("attr_event");
	var districtId = $(this).attr("attr_location");
	var districtType = $(this).attr("attr_district_type");
	var genderType = $(this).attr("attr_gender_type");
	var collegeId = $(this).attr("attr_college_id");
	var specializationId = $(this).attr("attr_specialization");
	var qualificationId = $(this).attr("attr_qualification_id");
	var companyId = $(this).attr("attr_companyId");
	var name = $(this).attr("attr_name");
	var heading = $(this).attr("attr_head_Name");
	var blockName = $(this).attr("attr_block_name");
	$("#companiesModalId").modal("show");
	$("#companiesHeadingId").html(heading+'&nbsp;Details');
			
	if(blockName == "jobFairBlock"){
		if(name == "COMPANIES") {
			getTopCompaniesHiringDetails("companiesModalDivId",id,"");
		}else if(name == "REGISTERED") {
			getCandidatesOverViewDetails("registered Candidate","companiesModalDivId","",id,"","","","JobFariREGISTERED",0,10,"")
		}else if(name == "SELECTED") {
			getCandidatesOverViewDetails("selected Candidate","companiesModalDivId","",id,"","","",
			"JobFariSelected",0,10,"")
		}
	}else if(blockName == "trainingBlock"){
		if(name == "Courses") {
			if($(window).width()<800){
				$('.widthclass').css("width","95%");
			} else {
				$('.widthclass').css("width","50%");
			}
			getCoursesInfo("companiesModalDivId",0,type);
		}else if(name == "Trainers") {
			if($(window).width()<800){
				$('.widthclass').css("width","95%");
			} else {
				$('.widthclass').css("width","50%");
			}
			getTrainersInfo("companiesModalDivId",0,type);
		}else if(name == "Colleges") {
			getTrainingColleges("companiesModalDivId",0,type);
		}else if(name == "Trained Students") {
			getTrainingStudentDetails("companiesModalDivId","","",0,"","","overViewType",0,type);
		}
	}else if(blockName == "PlacementsBlock"){
		if(name == "Registered Candidates") {
			getCandidatesOverViewDetails("registered Candidate","companiesModalDivId",0,"","","","","overViewType",0,10,"");
		} else if(name == "Placed Candidates") {
			getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",0,"","","","","overViewType",0,10,"selectedCanidatesInOverview");
		}else if(name == "Colleges") {
			if($(window).width()<800){
				$('.widthclass').css("width","95%");
			} else {
				$('.widthclass').css("width","50%");
			}
			getPlacementCollegeDetails("companiesModalDivId");
		}else if(name == "Recruitment Drives") {
			getJobFairOverViewDetails("all","companiesModalDivId",0);
		} else  if(name == "Companies") {
			getTopCompaniesHiringDetails("companiesModalDivId",0,0);
		}
	}else if(blockName == "eventsBlock"){
		getEventTypeDetails("companiesModalDivId",name,event);
	}else if(blockName == "hackathonBlock"){
		if(name == "Courses") {
			if($(window).width()<800){
				$('.widthclass').css("width","95%");
			} else {
				$('.widthclass').css("width","50%");
			}
			getCoursesInfo("companiesModalDivId",0,type);
		}else if(name == "Colleges") {
			getTrainingColleges("companiesModalDivId",0,type);
		}else if(name == "Trained Students") {
			getTrainingStudentDetails("companiesModalDivId","","",0,"","","overViewType",0,type);
		}else if(name == "Trainers") {
			if($(window).width()<800){
				$('.widthclass').css("width","95%");
			} else {
				$('.widthclass').css("width","50%");
			}
			getTrainersInfo("companiesModalDivId",0,type);
		}
	}else if(blockName == "topCompanies"){
		var driveTypeId = $(this).attr("attr_drive_typeId");
		if(name == "MALE") {
			getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",districtId,driveTypeId,"M",companyId,"","MaleSelected",0,10,"");
		}else  if(name == "FEMALE") {
			getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",districtId,driveTypeId,"F",companyId,"","FemaleSelected",0,10,"");
		}else  if(name == "TRANSGENDER") {
			getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",districtId,driveTypeId,"O",companyId,"","TransGenderSelected",0,10,"");
		}else  if(name == "NOT SPECIFIED") {
			getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",districtId,driveTypeId,"",companyId,"","TransGenderSelected",0,10,"","",genderType);
		}
	}else if(blockName == "trainingOverviewAllBlock"){
		if(name == "Courses") {
			if($(window).width()<800){
				$('.widthclass').css("width","95%");
			} else {
				$('.widthclass').css("width","50%");
			}
			getCoursesInfo("companiesModalDivId",districtId,type);
		} else if(name == "totalStudentsTrained") {
			getTrainingStudentDetails("companiesModalDivId","","",districtId,"","","trainingBlocktrainedStudents",0,type);
		} else {
			getTrainingStudentDetails("companiesModalDivId",qualificationId,"",districtId,"","","trainingBlocktrainedStudents",0,type);
		}
	} else if(blockName == "technicalBlock"){
		if(name == "trainedStudents") {
			getTrainingStudentDetails("companiesModalDivId","",companyId,districtId,"","","trainingBlocktrainedStudents",0,type);
		} else {
			getTrainingStudentDetails("companiesModalDivId",qualificationId,companyId,districtId,"","","trainingBlocktrainedStudents",0,type);
		}
	} else if(blockName == "locationWiseBlock"){
		if(name == "collages") {
			//getTrainingStudentDetails("companiesModalDivId","","",districtId,"trainedStudents",0);
		} else if(name == "total") {
			getTrainingStudentDetails("companiesModalDivId","","",districtId,"","","trainingBlocktrainedStudents",0);
		} else if(name == "technicalCount" || name == "nonTechnicalCount") {
			getTrainingStudentDetails("companiesModalDivId","","",districtId,specializationId,"","trainedStudents",0);
		} else if(name == "registered") {
			getCandidatesOverViewDetails("registered Candidate","companiesModalDivId",districtId,"","","","","locationWiseRegistered",0,10,"",districtType);
		} else if(name == "placed") {
			getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",districtId,"","","","","locationWiseSelected",0,10,"",districtType);
		}
	} /* else if(blockName == "collegeWiseBlock"){
		var districtVal= $("#collageWiseDistritSelId").val();
		if(name == "registered") {
			getCandidatesOverViewDetails("registered Candidate","companiesModalDivId",districtVal,"","","",collegeId,"");
		} else if(name == "placed") {
			getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",districtVal,"","","",collegeId,"");
		} else if(name == "total") {
			getTrainingStudentDetails("companiesModalDivId","","",districtVal,"",collegeId,"trainedStudents",0);
		} else if(name == "technicalCount" || name == "nonTechnicalCount") {
			getTrainingStudentDetails("companiesModalDivId","","",districtVal,specializationId,collegeId,"trainedStudents",0); 
		}
	} */
});	
function getEventTypeDetails(divId,name,event){
	$("#tv5OverviewDetailsDivId").html(spinner);
	$("#industryAcademyDetailsDivId").html(spinner);
	$("#"+divId).html(spinner);
	var json={
		  "fromDateStr" : customStartDate,
		  "toDateStr" : customEndDate,
		}
		$.ajax({
			type:'POST',
			url:'getEventTypeDetails',
			datatType:'json',
			data: JSON.stringify(json),
			beforeSend : function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result !=null){
				if(event == "click"){
					if(name == "Industry Academia Conclave"){
						buildEventTypeTv5Details(result.secondSubList,divId,name);
					} else {
						buildEventTypeTv5Details(result.subList,divId,name);
					}
				}
					buildEventTypeTv5Details(result.subList,"tv5OverviewDetailsDivId","");
					buildEventTypeTv5Details(result.secondSubList,"industryAcademyDetailsDivId","");
			}else{
				$("#"+divId).html("No Data Available");
			}
		})
}
function buildEventTypeTv5Details(result,divId,name){
	var lenthOfSubList;
	var str='';
		str='<div class="table-responsive">';
			str+='<table class="table table-bordered mb_20 table_custom_SC" id="'+divId+'dataTable">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Date</th>';
						str+='<th>Venue</th>';
						str+='<th>District</th>';
						if(divId == "tv5OverviewDetailsDivId" || name == "TV5 College Connect Program"){
							str+='<th>MENTORS PARTICIPATED</th>';
						} else {
							str+='<th>INDUSTRY EXPERTS PARTICIPATED</th>';
							str+='<th>NUMBER OF STUDENTS PARTICIPATED</th>';
						}
						str+='<th>Program Video</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result){
					lenthOfSubList=result[i].subList.length+1;
					str+='<tr>';
						str+='<td>'+result[i].eventDate+'</td>';
						str+='<td>'+result[i].venueName+'</td>';
						str+='<td>'+result[i].districtName+'</td>';
						if(divId == "tv5OverviewDetailsDivId" || name == "TV5 College Connect Program"){
						str+='<td>';
							for(var j in result[i].subList){
								str+='<h5>'+result[i].subList[j].mentorName+',&nbsp;'+result[i].subList[j].designation+',&nbsp;'+result[i].subList[j].organization+' </h5>';
								if(result[i].subList.length-1 != j){
									str+='<hr style="margin:10px -9px;">';
								}
							}
						str+='</td>';
						} else {
							str+='<td>';
								for(var j in result[i].subList){
									str+='<h5>'+result[i].subList[j].mentorName+',&nbsp;'+result[i].subList[j].designation+',&nbsp;'+result[i].subList[j].organization+' </h5>';
									if(result[i].subList.length-1 != j){
										str+='<hr style="margin:10px -9px;">';
									}
								}
							str+='</td>';
							str+='<td>-</td>';
						}
						if(divId == "tv5OverviewDetailsDivId" || name == "TV5 College Connect Program"){
							if(result[i].link != null && result[i].link.length>0 && result[i].link != undefined) {
								str+='<td><a href="'+result[i].link+'" target="_blank">Event Video</a></td>';
							} else {
								str+='<td>-</td>';
							}
						} else {
							str+='<td>-</td>';
						}
							
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';	
	$("#"+divId).html(str);
	/* $("#"+divId+'dataTable').dataTable({
		"iDisplayLength": 5,
		 "paging":   false,
		 "info":     false,
		"aLengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
		"retrieve":true
	}); */
}
$(document).on("click","[role='tabCummulative'] li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var finanicialYearType = $(this).attr("attr_type")
	if(finanicialYearType == "thisFin"){
		customStartDate = "01/04/"+moment().startOf('year').format("YYYY");
		customEndDate = moment().format("DD/MM/YYYY");
		$("#dateRangePickerMGNF").val(customStartDate);
		$("#dateRangePickerMGNT").val(customEndDate);
	}else{
		customStartDate = "01/04/"+(parseInt(moment().startOf('year').format("YYYY")-1));
		customEndDate = "31/03/"+moment().startOf('year').format("YYYY");
		$("#dateRangePickerMGNF").val(customStartDate);
		$("#dateRangePickerMGNT").val(customEndDate);
	}
	onloadCalls();
});