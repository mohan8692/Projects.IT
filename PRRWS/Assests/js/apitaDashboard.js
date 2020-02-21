var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var customStartDate = /* moment().format("DD/MM/YYYY"); */ moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY");
var customEndDate = /* moment().format("DD/MM/YYYY"); */ moment().format('DD/MM/YYYY');
onloadCalls();
function onloadCalls(){
	$(".tooltipCls").tooltip();
	$(".chosen-select").chosen();
	getTrainingAndPlacementOverViewDetails();
	getJobFairOverViewDetails("all","jobFairId");
	getTrainingOverviewCourseWise();
	getDistrictDetails();
	getTopCompaniesHiringDetails("companiesHiringTabBlkId","0","");
	getTrainingOverviewLocationWise(0,"trainingOverviewDetailsDivId");
	getTrainingOverviewCollegeWise(0,"trainingOverviewCollegeWiseDivId");
	getTrendingOverView(1,1);
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
$("#dateRangeForTrainingId").daterangepicker({
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
	}
});
$('#dateRangeForTrainingId').on('apply.daterangepicker', function(ev, picker) {
    customStartDate=picker.startDate.format('DD/MM/YYYY');
	customEndDate=picker.endDate.format('DD/MM/YYYY');
	onloadCalls();
});
function getTrainingAndPlacementOverViewDetails(){
	$("#trainingDetailsDivId").html(spinner);
	var json={
		"fromDateStr" :customStartDate,
		"toDateStr" : customEndDate,
		"locationId" : ""
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
			buildTrainingAndPlacementDetails(result);
		}
	})
}
function buildTrainingAndPlacementDetails(result) {
	var trainingObj={"names":["Colleges","Trained Students","Training Locations","Courses","Trainers"], "images":["collages","trained_students","trained_locations","courses","trainers"],
	"counts":[result.trainedCollege,result.trainedStudent,result.trainingLocation,result.courseCount,result.trainersCount]};
	var placementsObj={"names":["Colleges","Registered Students","Job Fairs","Companies","Placed Students"], "images":["collages","trained_students","job_fairs","companies","placed_students"],
	"counts":[result.collegeCount,result.registeredCandidates,result.megaJobFairs,result.companiesParticipated,result.selectedCandidates]};
	var length;
	
	var str='';
	str+='<div class="row m_top20">';
		str+='<div class="col-sm-6">';
			str+='<div class="pad_10" style="border:1px solid #FFA70F; border-radius:3px;">';
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
									str+='<h4 class="font_weight font_16 m_top20 companiesClkCls" attr_name="'+trainingObj.names[i]+'" attr_block_name="trainingBlock" attr_head_Name="'+trainingObj.names[i]+'" style="cursor:pointer;"><a>'+trainingObj.counts[i]+'</a></h4>';
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
		str+='<div class="col-sm-6">';
			str+='<div class="pad_10" style="border:1px solid #40EAC2; border-radius:3px;">';
				str+='<span class="headClrPlacement font_weight font_16">';
					str+='<img src="Assests/images/meeting.png" alt="..."> Placements';
				str+='</span>';
				str+='<div class="li_blocks m_top10" style="border-spacing:4px 0px;">';
					str+='<ul class="blocksCls">';
					length=placementsObj.names.length;
					for(i=0;i<length;i++){
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
								str+='<h4 class="font_weight font_16 m_top15 companiesClkCls" attr_name="'+placementsObj.names[i]+'" attr_block_name="PlacementsBlock" attr_head_Name="'+placementsObj.names[i]+'" style="cursor:pointer;"><a>'+placementsObj.counts[i]+'</a></h4>';
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

function getCoursesInfo(divId) {
	$("#"+divId).html(spinner);
	var json={
	
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
					str+='<td>'+result[i].id+'</td>';
					str+='<td>'+result[i].drivesName+'</td>';
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

function getTrainersInfo(divId) {
	$("#"+divId).html(spinner);
	var json={
	
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
function getJobFairOverViewDetails(drive,divId){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"locationId" : "",
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
					str+='<th><h6>CANDIDATES</h6>REGISTERED</th>';
					//str+='<th><h6>CANDIDATES</h6>ATTENDED</th>';
					str+='<th><h6>CANDIDATES</h6>SELECTED</th>';
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
						str+='<td><a>-</a></td>';
					}
					/**)
					if(result[i].candidateAttended !=null && result[i].candidateAttended>0){
						str+='<td>'+result[i].candidateAttended+'</td>';
					} else {
						str+='<td>-</td>';
					}**/
					str+='<td class="companiesClkCls" attr_head_Name="'+result[i].drivesName+'" attr_name="SELECTED" attr_block_name="jobFairBlock" attr_id="'+result[i].id+'" style="cursor:pointer;"><a>'+result[i].selectedCandidates+'</a>&nbsp;<i class="fa fa-lg fa-check-circle" style="color:#77BFB2;"></i></td>';
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
	});
}
function technicalAndNontechnical() {
	var str='';
	str+='<div class="table-responsive mb_20">';
		str+='<table class="table table-bordered table_custom_SC m_top10">';
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
					str+='<td class="text-primary companiesClkCls" attr_name="Courses" attr_head_Name="Courses" attr_block_name="trainingOverviewAllBlock" id="coursedId" style="cursor:pointer;">0</td>';
					//str+='<td>-</td>';
					str+='<td class="text-primary companiesClkCls" attr_name="totalStudentsTrained" attr_head_Name="Total Students Trained" attr_block_name="trainingOverviewAllBlock" style="cursor:pointer;" id="totalStudentTrainedCountId">0</td>';
					str+='<td class="text-primary companiesClkCls" attr_name="totalEngineeringCount" attr_head_Name="Engineering" attr_block_name="trainingOverviewAllBlock" style="cursor:pointer;" id="totalEngineeringCountId" >0</td>';
					str+='<td class="text-success" id="engineeringPercId">0</td>';
					str+='<td class="text-primary companiesClkCls" attr_name="totalDegreeCount" attr_head_Name="Degree" attr_block_name="trainingOverviewAllBlock" style="cursor:pointer;" id="totalDegreeCountId">0</td>';
					str+='<td class="text-success" id="degreePercId">0</td>';
					str+='<td class="text-primary companiesClkCls" attr_name="totalPostGraduateCount" attr_head_Name="Post Graduate" attr_block_name="trainingOverviewAllBlock" style="cursor:pointer;" id="totalpostGraduateCountId">0</td>';
					str+='<td class="text-success" id="postGraduatePercId">0</td>';
					str+='<td class="text-primary companiesClkCls" attr_name="totalOthersCount" attr_head_Name="Others" attr_block_name="trainingOverviewAllBlock" style="cursor:pointer;" id="othersCountId">4,365</td>';
					str+='<td class="text-success" id="othersPercId">40.19%</td>';
				str+='</tr>';
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#allDetailsId").html(str); 
}
function getTrainingOverviewCourseWise(){
	$("#allDetailsId").html(spinner);
	$("#technicalId").html(spinner);
	$("#nonTechnicalId").html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		districtId : 0
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
			buildTrainingOverviewCourseWise(result.technicalList,"technicalId");
		} else {
			$("#technicalId").html("<div class='text-center m_top_bottom' style='border:1px solid #ccc;'>No Data Available</div>");
		}
		if(result != null && result.nonTechnicalList != null && result.nonTechnicalList.length > 0){
			buildTrainingOverviewCourseWise(result.nonTechnicalList,"nonTechnicalId");
			technicalAndNontechnical();
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
function buildTrainingOverviewCourseWise(result,divId) {
	var str='';
	str+='<div class="table-responsive mb_20">';
		str+='<table class="table table-bordered table_custom_SC m_top10">';
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
				totalCourses = totalCourses + 1;
				totalStudentTrainedCount = totalStudentTrainedCount + result[i].totalStudentTrained;
				str+='<tr>';
					str+='<td style="text-align:left !important;">'+result[i].courseName+'</td>';
					/* if(result[i].trainingCenterCount !=null && result[i].trainingCenterCount>0){
						str+='<td><u>'+result[i].trainingCenterCount+'</u></td>';
					} else {
						str+='<td>-</td>';  
					} */
					str+='<td class="companiesClkCls" attr_companyId="'+result[i].courseId+'" attr_name="trainedStudents" attr_head_Name="'+result[i].courseName+'" attr_block_name="technicalBlock" style="cursor:pointer;"><a>'+result[i].totalStudentTrained+'</a></td>';
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
							str+='<td class="companiesClkCls" attr_companyId="'+result[i].courseId+'" attr_name="qualificationCount" attr_qualification_id="'+result[i].qualificationTypeList[j].value+'" attr_head_Name="'+result[i].courseName+'" attr_block_name="technicalBlock" style="cursor:pointer;"><a>'+result[i].qualificationTypeList[j].count+'</a></td>';
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
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
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
				$("#trainingOverViewDistrictDrpId,#locationWiseDistritSelId,#collageWiseDistritSelId").append('<option value="'+result[i].id+'">'+result[i].drivesName+'</option>');
				$("#trainingOverViewDistrictDrpId,#locationWiseDistritSelId,#collageWiseDistritSelId").trigger("chosen:updated");
			}
		}
	})
}
function getTopCompaniesHiringDetails(divId,id,locationId){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"locationId" :locationId,
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
			buildTopCompaniesHiringDetails(result,divId);
		}
	})
}
function buildTopCompaniesHiringDetails(result,divId){
var str='';
	if($(window).width()<800){
		str='<div class="table-responsive m_top10">';
	}
		str+='<table class="table table-bordered m_top10 table_custom_SC" id="'+divId+'dataTable" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">Rank</th>';
					str+='<th rowspan="2" style="width:25%;">';
						str+='<div class="media">';
							str+='<div class="media-left">';
								str+='<i class="fa fa-building fa-lg m_top5" aria-hidden="true" style="color:#A7DC4A;"></i>';
							str+='</div>';
							str+='<div class="media-body" style="width:100%;">';
								str+='<h4 class="media-heading font_weight m_top5 font_12">Company Name</h4>';
							str+='</div>';
						str+='</div>';
					str+='</th>';
					str+='<th rowspan="2" style="width:25%;">';
						str+='<div class="media">';
							str+='<div class="media-left">';
								/* str+='<img src="Assests/images/Group 2258.png" class="media-object" style="margin-top:3px;">'; */
							str+='</div>';
							str+='<div class="media-body" style="width:100%;">';
								str+='<h4 class="media-heading font_weight m_top5 font_12">Sector Name</h4>';
							str+='</div>';
						str+='</div>';
					str+='</th>';
					str+='<th  colspan="2">';
						str+='<div class="media">';
							str+='<div class="media-left">';
								str+='<img src="Assests/images/Group 1251.png" class="media-object">';
							str+='</div>';
							str+='<div class="media-body" style="width:100%;">';
								str+='<h4 class="media-heading font_weight m_top5 font_12">Hired Candidates</h4>';
							str+='</div>';
						str+='</div>';
					str+='</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>Male</th>';
					str+='<th>Female</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td><div class="companies_rounded">'+result[i].rank+'</div></td>';
					str+='<td style="text-align:left !important;">'+result[i].drivesName+'</td>';
					str+='<td>'+result[i].candidateName+'</td>';
					if(result[i].megaJobFairs>0){//pj
						str+='<td class="companiesClkCls" attr_head_Name="'+result[i].drivesName+'" attr_name="MALE" attr_companyId="'+result[i].companiesParticipated+'" attr_block_name="topCompanies" style="cursor:pointer;"><a>'+result[i].megaJobFairs+'</a></td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].individualDrives>0){
						str+='<td class="companiesClkCls" attr_head_Name="'+result[i].drivesName+'" attr_name="FEMALE" attr_companyId="'+result[i].companiesParticipated+'" attr_block_name="topCompanies" style="cursor:pointer;"><a>'+result[i].individualDrives+'</a></td>';
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
					str+='<th rowspan="3">Colleges</th>';
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
				str+='<tr>';
					str+='<td style="text-align:left !important;">'+result.locationDetailsList[i].districtName+'</td>';
					if(result.locationDetailsList[i].collegesCount !=null && result.locationDetailsList[i].collegesCount>0) {
						str+='<td class="" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock" attr_location="'+result.locationDetailsList[i].districtId+'" attr_name="collages" attr_college_id="'+result.locationDetailsList[i].collegesCount+'"><a>'+result.locationDetailsList[i].collegesCount+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
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
					str+='<td class="text-success">'+result.locationDetailsList[i].totalTechnicalStudentPercent+'%</td>';
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
					str+='<td class="companiesClkCls" attr_name="registered" attr_location="'+result.locationDetailsList[i].districtId+'" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock"><a>'+result.locationDetailsList[i].registeredCount+'</a></td>';
					if(result.locationDetailsList[i].placedStudentCount !=null && result.locationDetailsList[i].placedStudentCount>0) {
						str+='<td class="companiesClkCls" attr_name="placed" attr_location="'+result.locationDetailsList[i].districtId+'" attr_head_Name="'+result.locationDetailsList[i].districtName+'" attr_block_name="locationWiseBlock"><a>'+result.locationDetailsList[i].placedStudentCount+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					str+='<td class="text-success">'+result.locationDetailsList[i].placedStudentPercent+'%</td>';
				str+='</tr>';
			}
			for(var i in result.collegeDetailsList) {
				str+='<tr>';
					str+='<td style="min-width:20%;text-align:left !important;">'+result.collegeDetailsList[i].collegeName+'</td>';
					if(result.collegeDetailsList[i].address != null && result.collegeDetailsList[i].address != '') {
						str+='<td style="min-width:20%;text-align:left !important;">'+result.collegeDetailsList[i].address+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result.collegeDetailsList[i].districtName !=null && result.collegeDetailsList[i].districtName != '') {
						str+='<td style="min-width:20%;text-align:left !important;">'+result.collegeDetailsList[i].districtName+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result.collegeDetailsList[i].totalStudentTrained !=null && result.collegeDetailsList[i].totalStudentTrained>0) {
						str+='<td class="companiesClkCls" attr_name="total" attr_college_id="'+result.collegeDetailsList[i].collegeId+'" attr_location="'+result.collegeDetailsList[i].districtId+'" attr_head_Name="'+result.collegeDetailsList[i].collegeName+'"  attr_block_name="collegeWiseBlock"><a>'+result.collegeDetailsList[i].totalStudentTrained+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					if(result.collegeDetailsList[i].totalTechnicalStudent !=null && result.collegeDetailsList[i].totalTechnicalStudent>0) {
						str+='<td class="companiesClkCls" attr_college_id="'+result.collegeDetailsList[i].collegeId+'" attr_specialization="'+result.collegeDetailsList[i].technicalId+'" attr_name="technicalCount" attr_location="'+result.collegeDetailsList[i].districtId+'" attr_head_Name="'+result.collegeDetailsList[i].collegeName+'"  attr_block_name="collegeWiseBlock"><a>'+result.collegeDetailsList[i].totalTechnicalStudent+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					if(result.collegeDetailsList[i].totalTechnicalStudentPercent !=null && result.collegeDetailsList[i].totalTechnicalStudentPercent>0) {
						str+='<td class="text-success">'+result.collegeDetailsList[i].totalTechnicalStudentPercent+'%</td>';
					} else {
						str+='<td class="text-success">-</td>';
					}
					if(result.collegeDetailsList[i].totalNonTechnicalStudent !=null && result.collegeDetailsList[i].totalNonTechnicalStudent>0) {//pj
						str+='<td class="companiesClkCls" attr_college_id="'+result.collegeDetailsList[i].collegeId+'" attr_specialization="'+result.collegeDetailsList[i].nonTechnicalId+'" attr_name="nonTechnicalCount" attr_location="'+result.collegeDetailsList[i].districtId+'" attr_head_Name="'+result.collegeDetailsList[i].collegeName+'"  attr_block_name="collegeWiseBlock"><a>'+result.collegeDetailsList[i].totalNonTechnicalStudent+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					if(result.collegeDetailsList[i].totalNonTechnicalStudentPercent !=null && result.collegeDetailsList[i].totalNonTechnicalStudentPercent>0) {
						str+='<td class="text-success" attr_id="'+result.collegeDetailsList[i].districtId+'">'+result.collegeDetailsList[i].totalNonTechnicalStudentPercent+'</td>';
					} else {
						str+='<td class="text-success">-</td>';
					}
					if(result.collegeDetailsList[i].registeredCount !=null && result.collegeDetailsList[i].registeredCount>0) {
						str+='<td class="companiesClkCls" attr_college_id="'+result.collegeDetailsList[i].collegeId+'" attr_name="registered" attr_location="'+result.collegeDetailsList[i].districtId+'" attr_head_Name="'+result.collegeDetailsList[i].collegeName+'"  attr_block_name="collegeWiseBlock"><a>'+result.collegeDetailsList[i].registeredCount+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					if(result.collegeDetailsList[i].placedStudentCount !=null && result.collegeDetailsList[i].placedStudentCount>0) {
						str+='<td class="companiesClkCls" attr_college_id="'+result.collegeDetailsList[i].collegeId+'" attr_name="placed" attr_location="'+result.collegeDetailsList[i].districtId+'" attr_head_Name="'+result.collegeDetailsList[i].collegeName+'"  attr_block_name="collegeWiseBlock"><a>'+result.collegeDetailsList[i].placedStudentCount+'</a></td>';
					} else {
						str+='<td>-</td>';
					}
					if(result.collegeDetailsList[i].placedStudentPercent !=null && result.collegeDetailsList[i].placedStudentPercent>0) {
						str+='<td class="text-success">'+result.collegeDetailsList[i].placedStudentPercent+'%</td>';
					} else {
						str+='<td class="text-success">-</td>';
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
	});
}

function getTrainingOverviewCollegeWise(districtId,divId){
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
}
//clicks
function getTrainingColleges(divId){
	$("#"+divId).html(spinner);
	var json={
		districtId : 0
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
function getCandidatesOverViewDetails(type,divId,districtId,id,gender,companyId,collegeId){ 
	$("#"+divId).html(spinner);	
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"districtId" : districtId,
		"type"	: type,
		"driveTypeId" :id,
		"gender" : gender,
		"companyId" : companyId,
		"collegeId" : collegeId
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
			buildCandidatesOverViewDetails(result,type,divId);
		}else{
			$("#"+divId).html("No Data Available");
		}
	})
}
function buildCandidatesOverViewDetails(result,type,divId){
	var tableView ='';
	tableView+='<div class="table-responsive m_top20">';
		tableView+='<table class="table table-bordered table_custom_SC dataTable">'; // '+type+'
			tableView+='<thead>';
				tableView+='<tr>';
					tableView+='<th>Candidate Name</th>';
					//tableView+='<th>Contact Number</th>';
					tableView+='<th>Qualification</th>';
					tableView+='<th>Community</th>';
					tableView+='<th>District</th>';
					tableView+='<th>Specialization in Graduation</th>';
					if(type != "registered Candidate") {
						tableView+='<th>Job Role</th>';
						//tableView+='<th>CTC</th>';
						tableView+='<th>Company Name</th>';
					} else {
						tableView+='<th>jobfair Name</th>';
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

				tableView+='</tr>';
				}				
			tableView+='</tbody>';			
		tableView+='</table>';
	tableView+='</div>';
	$("#"+divId).html(tableView);
	$('.dataTable').dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20,50, -1], [10, 15, 20,50, "All"]],
		"retrieve":true
	});
	$(".chosen-select").chosen();
} 

function getTrainingStudentDetails(divId,qualificationId,companyId,districtId,specializationId,collegeId){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr" : customStartDate,
		"toDateStr" : customEndDate,
		"locationId" : districtId,
		"companyId" : companyId,
		"qualificationId" : qualificationId,
		"specializationId" : specializationId,
		"casteGroupId" : collegeId
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
			buildTrainingStudentDetails(result,divId); 
		}
	})
}
function buildTrainingStudentDetails(result,divId) {
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
					tableView+='<th>College Name</th>';
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
					tableView+='<td>'+result[i].drivesName+'</td>';
				tableView+='</tr>';
			}
			tableView+='</tbody>';	
		tableView+='</table>';
	tableView+='</div>';	
	$("#"+divId).html(tableView);
	$("#"+divId+'dataTable').dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
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
$(document).on("change","#locationWiseDistritSelId",function(){
	var districtId=$(this).val();
	getTrainingOverviewLocationWise(districtId,"trainingOverviewDetailsDivId");	
});
$(document).on("change","#collageWiseDistritSelId",function(){
	var districtId=$(this).val();
	getTrainingOverviewCollegeWise(districtId,"trainingOverviewCollegeWiseDivId");	
});

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
	getTrendingOverView(yearId,monthId);
});
function getTrendingOverView(yearId,monthId){
	$("#trendingGraphDivId").html(spinner);
	var json={
		  "fromDateStr" : customStartDate,
		  "toDateStr" : customEndDate,
		  "locationId" :  "",
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