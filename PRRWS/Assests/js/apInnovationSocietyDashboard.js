var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
onloadcalls();
function onloadcalls(){
	getApInnovationOverViewDetails();
	getStartUpsProfileDetails();
	getStageDetails();
	getSectorDetails();
	getAllTypesDetails("Startup","startupsTabId");
	getActivitiesProfile();
	getTargetsAndAchievementDetails();
	getDistrictWiseDetails();
	getAllBootCampDetails();
	getTrainingAndPlacementOverViewDetails();
	getTrainingOverviewCourseWise();
}
var globalFromDateAPI=moment().subtract(15, 'years').startOf('year').format("DD/MM/YYYY");
var globalToDateAPI=moment().format("DD/MM/YYYY");
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
  $("#dateRangePicker").daterangepicker({
    opens: 'left',
    startDate: globalFromDateAPI,
    endDate: globalToDateAPI,
    locale: {
    format: 'DD/MM/YYYY' 
  } ,
  ranges: {
   // 'All':[overallDaterangePicker()],
    'Today' : [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'This Year': [moment().startOf('Year'), moment()],
    'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
	'OverAll':[moment().subtract(15, 'years').startOf('year').format("DD/MM/YYYY"), moment().format("DD/MM/YYYY")]
  }
  });
  
  $('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
		globalFromDateAPI = picker.startDate.format('DD/MM/YYYY');
		globalToDateAPI = picker.endDate.format('DD/MM/YYYY');
		if(picker.chosenLabel == 'OverAll')
		{
			$("#dateRangePicker").val('OverAll');
		}
		getTrainingOverviewCourseWise(0);
		getTrainingAndPlacementOverViewDetails(0);
	});
function getApInnovationOverViewDetails(){
	if($(window).width()<1200){
		$('.tableResponce').addClass('table-responsive');
		if($(window).width()<=360){
			$('.tableResponce').removeClass('table-responsive');
			$('.tableResponce ul li').css({"display":"inline-block","margin-top":"10px"});
		}
	}else{
		
		$('.tableResponce').removeClass('table-responsive');
	}
	$(".spinnerCls").html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : ""
	};
	$.ajax({                
		type:'POST',
		url: 'getApInnovationOverViewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildApInnovationOverViewDetails(result);
		}else{
			
		}
	});
}
function buildApInnovationOverViewDetails(result){
	var empGenCnt=result.emplFull+result.emplPart;
	$('#startupsId').html(result.startUps);
	$('#acceleratorsId').html(result.accelerators);
	$('#incubatorsId').html(result.incubators);
	$('#enablersId').html(result.enablers);
	$('#mentorsId').html(result.mentors);
	$('#activitiesId').html(result.activities);
	$('#revGenId').html(result.revenueGeneration);
	$('#vCAngInvestId').html(result.angel);
	$('#industCollId').html(result.industryCollaborations);
	$('#atalTinkerLabsId').html(result.aTLs);
	$('#edcId').html(result.edc);
	$('#empGenId').html(empGenCnt);	
	$('#leadId').html(result.leadsCount);
	//$('#activitiescompletedId').html(result.completedCount);
	$('#activitiesUpComingId').html(result.upComingCount);	
}

function getStartUpsProfileDetails(){
	$("#startUpsProfileTabId").html(spinner);
	$('.startupBlcSpinner').html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : ""
	};
	$.ajax({                
		type:'POST',
		url: 'getStartUpsProfileDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildStartUpsProfileDetails(result);
		}else{
			$("#startUpsProfileTabId").html("No Data Avilable");
		}
	});
}
function buildStartUpsProfileDetails(result){
	$('#revGenBlcId').html(result.revenueGeneration);
	$('#incStartupsId').html(result.incubatorsStartups);
	$('#accStartupsId').html(result.acceleratorsStartups);
	$('#funRaisedId').html(result.fundRaised);
	var str='';
		str='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_custom_SC tableStyleCls" style="width:100%;">';
				str+='<thead>';
					str+'<tr>';
						str+='<th>Target Startups</th>';
						str+='<th>Achived Startups</th>';
						str+='<th>From Incubators</th>';
						str+='<th>From Accelerators</th>';
						str+='<th>Existed</th>';
						str+='<th>Brought</th>';
						str+='<th>Angel Investors</th>';
						str+='<th>Enablers</th>';
					str+='</tr>';
				str+='</thead>';
				str+'<tbody>';
					str+='<tr>';
						str+='<td>';
							str+='<h5 class="font_weight">'+result.startUps+'</h5>';
						str+='</td>';
						str+='<td>';
							str+='<h5 class="font_weight itBlueCol startupProfileCls" data-type="startUps">'+result.achieved+'</h5>';
							str+='<h5 class="text-success m_top10 font_weight">'+result.achievedPerc+' %</h5>';
						str+='</td>';						
						str+='<td>';
							str+='<h5 class="font_weight itBlueCol startupProfileCls" data-type="Incubator">'+result.incubators+'</h5>';
							str+='<h5 class="text-success m_top10 font_weight">'+result.incubatorPerc+' %</h5>';
						str+='</td>';
						str+='<td>';
							str+='<h5 class="font_weight itBlueCol startupProfileCls" data-type="Accelarator">'+result.accelerators+'</h5>';
							str+='<h5 class="text-success m_top10 font_weight">'+result.accelaratorPerc+' %</h5>';
						str+='</td>';
						if(result.existed != null && result.existed > 0){
							str+='<td>';
								str+='<h5 class="font_weight itBlueCol">'+result.existed+'</h5>';
							str+='</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='<td>';
							str+='<h5 class="font_weight itBlueCol">'+result.brought+'</h5>';
						str+='</td>';
						str+='<td>';
							str+='<h5 class="font_weight itBlueCol">'+result.angel+'</h5>';
						str+='</td>';
						str+='<td>';
							str+='<h5 class="font_weight itBlueCol">'+result.enablers+'</h5>';
						str+='</td>';
					str+='</tr>';
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#startUpsProfileTabId").html(str);
}
function getStageDetails(){
	$("#stageTableBlcId").html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : ""
	};
	$.ajax({                
		type:'POST',
		url: 'getStageDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildTable(result,"stageTableBlcId","stage");
		}else{
			$("#stageTableBlcId").html("No Data Available");
		}
	});
}
function getSectorDetails(){
	$("#sectTableBlcId").html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : ""
	};
	$.ajax({                
		type:'POST',
		url: 'getSectorDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildTable(result,"sectTableBlcId","sectror");
		}else{
			$("#sectTableBlcId").html("No Data Available");
		}
	});
}
function buildTable(result,tabId,type){
	var str=''
	str='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_custom_SC tableStyleCls" id="dataTable'+type+'" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					if(type=="stage"){
						str+='<th style="text-align:left !important;">Stage</th>';
					}else{
						str+='<th style="text-align:left !important;width:25%;">Sector</th>';
					}
						str+='<th>Total</th>';
						str+='<th>From Incubators</th>';
						str+='<th>From Accelerators</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td style="text-align:left !important;" class="font_weight">'+result[i].name+'</td>';
						str+='<td class="font_weight itBlueCol startupProfStagesCls" data-type="Total" data-id="'+result[i].id+'" data-build-type="'+type+'" data-name="'+result[i].name+'">'+result[i].total+'</td>';
						if(result[i].incubators > 0){
							str+='<td class="font_weight itBlueCol startupProfStagesCls" data-type="Incubator" data-id="'+result[i].id+'" data-build-type="'+type+'" data-name="'+result[i].name+'">'+result[i].incubators+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].accelerators > 0)
							str+='<td class="font_weight itBlueCol startupProfStagesCls" data-type="Accelarator" data-id="'+result[i].id+'" data-build-type="'+type+'" data-name="'+result[i].name+'">'+result[i].accelerators+'</td>';
						else
							str+='<td>-</td>';
					str+='</tr>';
				}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+tabId).html(str);
	if(type != 'stage'){
		$("#dataTable"+type).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "APInnovationSociety",
					filename:  'APInnovationSociety_'+type+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
	}
	
}
function getAllTypesDetails(type,tabId){
	$("#"+tabId).html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
		type : type,
	};
	$.ajax({                
		type:'POST',
		url: 'getAllTypesDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildAllTypesDetails(result,type,tabId,"",true);
		}else{
			$("#"+tabId).html("No Data Available");
		}
	});
}
function buildAllTypesDetails(result,type,tabId,buildType,hasClick){	
	var str='';	
	str='<div class="groupBox border_yash">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC  tablePureGreyCol " id="dataTable'+type+''+buildType.replace(/\s+/g, '')+'" style="width:100%;">';
			str+='<thead>';
				if(type=="Startup"){
					str+='<tr>';
						str+='<th rowspan="2" style="text-align:left !important;">Startup Name</th>';
						str+='<th rowspan="2">Innovator</th>';
						str+='<th rowspan="2">Innovation</th>';
						str+='<th rowspan="2">Stage</th>';
						str+='<th rowspan="2">Sector</th>';
						str+='<th rowspan="2">Revenue</th>';
						str+='<th rowspan="2">Fund Raised</th>';						
						str+='<th rowspan="2">Angel Invester</th>';						
						str+='<th rowspan="2">Incubator / Accelerators</th>';
						str+='<th colspan="3">Employees</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Fulltime</th>';
						str+='<th>Parttime</th>';
						str+='<th>Intern</th>';
					str+='</tr>';
				}else if(type=="Incubators"){
					str+='<tr>';
						str+='<th>Type</th>';
						str+='<th style="text-align:left !important;">Incubator Name</th>';
						str+='<th>Location</th>';
						str+='<th>No.of Startups</th>';
						str+='<th>Revenue</th>';
						str+='<th>Funding Raised</th>';
						str+='<th>Market Access</th>';
						str+='<th>Employment</th>';
						str+='<th>No.of Mentors</th>';
					str+='</tr>';
				}else if(type=="Enablers"){
					str+='<tr>';
						str+='<th style="text-align:left !important;">Enablers Name</th>';
						str+='<th>Type Of Benefits</th>';
						str+='<th>No Of Benificiaries</th>';
					str+='</tr>';
				}else if(type=="Mentors"){
					str+='<tr>';
						str+='<th style="text-align:left !important;min-width: 20%;">Mentor Name</th>';
						str+='<th>Designation</th>';
						str+='<th>Organization</th>';
						str+='<th>Sector</th>';
						str+='<th>Contact</th>';
						str+='<th >Partner&nbsp;Name</th>';
						str+='<th >Partner&nbsp;Type</th>'; 
					str+='</tr>';					
				}else if(type=="EDC"){
					str+='<tr>';
						str+='<th style="text-align:left !important;">College Name</th>';
						str+='<th>District Name</th>';
						str+='<th>Venue</th>';
						str+='<th>Co-Ordiantor Name</th>';
						str+='<th>Year</th>';						
					str+='</tr>';	
				}else if(type=="AtalTinkeringLabs"){
					str+='<tr>';
						str+='<th style="text-align:left !important;">School Name</th>';
						str+='<th>School Code</th>';
						str+='<th>District Name</th>';
						str+='<th>Location</th>';
						str+='<th>Year Of Sanction</th>';						
					str+='</tr>';	
				}else if(type=="AngelInvestors"){	
					str+='<tr>';
						str+='<th style="text-align:left !important;">Investor Name</th>';
						str+='<th>Organization</th>';
						str+='<th>Designation</th>';
						str+='<th>Contact</th>';
						str+='<th>Invested On Startups</th>';
					str+='</tr>';	
				}else if(type=="IndustryCollaborations"){
					str+='<tr>';
						str+='<th style="text-align:left !important;">Industry Name</th>';
						str+='<th>Incubators</th>';
						str+='<th>Accelerators</th>';						
					str+='</tr>';
				}else if(type=="Leads"){
					str+='<tr>';
						str+='<th style="text-align:left !important;">StartUp Name</th>';
						str+='<th>Organization</th>';
						str+='<th>Aspect</th>';						
						str+='<th>Status</th>';						
						str+='<th>Remarks</th>';						
					str+='</tr>';
				}						
			str+='</thead>';
				str+='<tbody>';
				for(var i in result){
					str+='<tr>';
					if(type=="Startup"){	
						str+='<td style="text-align:left !important;" class="font_weight">'+getValues(result[i].startup)+'</td>';
						str+='<td class="font_weight">'+getValues(result[i].innovator)+'</td>';
						if(result[i].innovation != null && result[i].innovation.length >30){
							str+='<td class="font_weight><span class="tooltipCls" style="cursor:pointer;" data-toggle="tooltip" data-placement="top" title="'+result[i].innovation+'">'+result[i].innovation.substring(0,30)+'</span></td>';							
						}else{
							str+='<td class="font_weight">'+getValues(result[i].innovation)+'</td>';
						}
						
						str+='<td class="font_weight">'+getValues(result[i].stage)+'</td>';
						str+='<td class="font_weight">'+getValues(result[i].sector)+'</td>';
						if(result[i].revenueGenerated != null && result[i].revenueGenerated != 0){
							str+='<td class="font_weight">'+result[i].revenueGenerated+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].fundRaised != null  && result[i].fundRaised != 0){
							str+='<td class="font_weight">'+result[i].fundRaised+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].investor != null && result[i].investor != 0){
							str+='<td class="font_weight">'+result[i].investor+'</td>';
						}else{
							str+='<td>-</td>';
						}
						
						str+='<td>'+getValues(result[i].incubator)+'</td>';
						if(result[i].permentJobs  != null && result[i].permentJobs != 0){
							str+='<td class="font_weight">'+result[i].permentJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].temporaryJobs != null &&  result[i].temporaryJobs != 0){
							str+='<td class="font_weight">'+result[i].temporaryJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].internJobs != null && result[i].internJobs != 0){
							str+='<td class="font_weight">'+result[i].internJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						
					}else if(type=="Incubators"){
						if(result[i].type != null && result[i].type != 0){
							str+='<td class="font_weight">'+result[i].type+'</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='<td style="text-align:left !important;" class="font_weight">'+result[i].incubator+'</td>';
						if(result[i].districtName != null && result[i].districtName != 0){
							str+='<td class="font_weight">'+result[i].districtName+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].startup != null && result[i].startup != 0){
							if(hasClick){								
								str+='<td class="font_weight itBlueCol startUpCompInfoCls" data-id="'+result[i].id+'" data-type="Incubators" data-name="'+result[i].incubator+'">'+result[i].startup+'</td>';
							}else{
								str+='<td class="font_weight" data-id="'+result[i].id+'" data-type="Incubators" data-name="'+result[i].incubator+'">'+result[i].startup+'</td>';
							}
							
						}else{
							str+='<td>-</td>';
						}
						if(result[i].revenueGenerated != null && result[i].revenueGenerated != 0){
							str+='<td class="font_weight">'+result[i].revenueGenerated+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].fundRaised != null && result[i].fundRaised != 0){
							str+='<td class="font_weight">'+result[i].fundRaised+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].marketAccess != null && result[i].marketAccess != 0){
							str+='<td class="font_weight">'+result[i].marketAccess+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].employmentCreated != null && result[i].employmentCreated != 0){
							str+='<td class="font_weight">'+result[i].employmentCreated+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].mentors != null && result[i].mentors != 0){
							str+='<td class="font_weight">'+result[i].mentors+'</td>';
						}else{
							str+='<td>-</td>';
						}
					}else if(type=="Enablers"){
						str+='<td style="text-align:left !important;" class="font_weight">'+result[i].name+'</td>';
						str+='<td>'+result[i].typeOfBenifit+'</td>';
						str+='<td class="font_weight itBlueCol startUpCompInfoCls" data-id="'+result[i].id+'" data-type="Enablers" data-name="'+result[i].name+'">'+result[i].noOfBenificiaries+'</td>';
						
					}else if(type=="Mentors"){
						str+='<td style="text-align:left !important;"><h5 class="font_weight">'+result[i].name+'</td>';
						if(result[i].designation != null && result[i].designation != 0){
							str+='<td class="font_weight">'+result[i].designation+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].organization != null && result[i].organization != 0){
							str+='<td class="font_weight">'+result[i].organization+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].sector != null && result[i].sector != 0){
							str+='<td class="font_weight">'+result[i].sector+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].phone != null && result[i].phone != 0){
							str+='<td class="font_weight">'+result[i].phone+'</td>';
						}else{
							str+='<td>-</td>';
						}
						 if(result[i].partner != null && result[i].partner != 0){
							str+='<td class="font_weight">'+result[i].partner+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].type != null && result[i].type != 0){
							str+='<td class="font_weight">'+result[i].type+'</td>';
						}else{
							str+='<td>-</td>';
						} 
					}else if(type=="AtalTinkeringLabs"){
							str+='<td style="text-align:left !important;" class="font_weight">'+getValues(result[i].name)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].code)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].districtName)+'</td>';
							if(result[i].address != null && result[i].address != 0){
							str+='<td class="font_weight">'+result[i].address+'</td>';
							}else{
							str+='<td>-</td>';
							} 
							//str+='<td class="font_weight">'+result[i].address+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].d365)+'</td>';
						
					}else if(type=="EDC"){
							str+='<td style="text-align:left !important;" class="font_weight">'+getValues(result[i].name)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].districtName)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].venue)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].facultyName)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].estYear)+'</td>';
					}else if(type=="AngelInvestors"){
						str+='<td style="text-align:left !important;" class="font_weight">'+getValues(result[i].name)+'</td>';
						if(result[i].organization != null && result[i].organization != 0){
							str+='<td class="font_weight">'+result[i].organization+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].designation != null && result[i].designation != 0){
							str+='<td class="font_weight">'+result[i].designation+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].phone != null && result[i].phone != 0){
							str+='<td class="font_weight">'+result[i].phone+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].investedStartups != null && result[i].investedStartups != 0){
							str+='<td class="font_weight itBlueCol startUpCompInfoCls" data-id="'+result[i].id+'" data-type="AngelInvestors" data-name="'+result[i].name+'">'+result[i].investedStartups+'</td>';
						}else{
							str+='<td>-</td>';
						}
					}else if(type=="IndustryCollaborations"){
						str+='<td style="text-align:left !important;" class="font_weight">'+getValues(result[i].sector)+'</td>';
						if(result[i].incubator != null && result[i].incubator != 0){
							str+='<td class="font_weight">'+result[i].incubator+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].accelarator != null && result[i].accelarator != 0){
							str+='<td class="font_weight">'+result[i].accelarator+'</td>';
						}else{
							str+='<td>-</td>';
						}
					}else if(type=="Leads"){
						str+='<td style="text-align:left !important;" class="font_weight">'+getValues(result[i].name)+'</td>';
						if(result[i].organization != null && result[i].organization != 0){
							str+='<td class="font_weight">'+result[i].organization+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].aspect != null && result[i].aspect != 0){
							str+='<td class="font_weight">'+result[i].aspect+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].status != null && result[i].status != 0){
							str+='<td class="font_weight">'+result[i].status+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].reMarks != null && result[i].reMarks != 0){
							str+='<td class="font_weight">'+result[i].reMarks+'</td>';
						}else{
							str+='<td>-</td>';
						}
					}
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#"+tabId).html(str);
	$(".tooltipCls").tooltip();
	$("#dataTable"+type+''+buildType.replace(/\s+/g, '')).dataTable({
		"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "APInnovationSociety",
					filename:  'APInnovationSociety_'+type+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
	});
}
$(document).on("click",".alltypeClsClc li",function(){
	var tabId=$(this).find('a').attr('att_tab_id');
	var type=$(this).find('a').attr('attr_type');
	getAllTypesDetails(type,tabId);
	
});
function getActivitiesProfile(){
$("#activityProfTabId").html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
	};
	$.ajax({                
		type:'POST',
		url: 'getActivitiesProfile',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildActivitiesProfile(result);
		}else{
			$("#activityProfTabId").html("No Data Available");
		}
	});
}
function buildActivitiesProfile(result){
	var str=''
		str='<div class="row">';
			str+='<ul class="list-inline switch-btn pull-right activityProfileCls">';
				str+='<li class="active" attr_type="Completed">Completed</li>';
				str+='<li attr_type="Upcoming">Upcoming</li>';
			str+='</ul>';
		str+='</div>';
		str+='<div class="m_top10">';
			str+='<div class="table-responsive m_top10">';
				str+='<table class="table table-bordered table_custom_SC tableStyleCls m_top10" id="activityProfdataTable" style="width:100%;">';
					str+='<thead>';
						str+='<tr>';
							str+='<th style="text-align:left !important;width:25%;">Activity Name</th>';
							str+='<th>Overall Activities</th>';
							str+='<th>30 Days</th>';
							str+='<th>90 Days</th>';
							str+='<th>180 Days</th>';
							str+='<th>365 Days</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						for(var i in result){
							str+='<tr>';
								str+='<td style="text-align:left !important;" class="font_weight">'+result[i].type+'';
								str+='</td>';
								if(result[i].total > 0){
									str+='<td class="font_weight itBlueCol activitiesCls" data-id="'+result[i].id+'" data-scope-id="0" data-type="'+result[i].type+'">'+result[i].total+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(result[i].d30 > 0){
									str+='<td class="font_weight itBlueCol activitiesCls" data-id="'+result[i].id+'" data-scope-id="30" data-type="'+result[i].type+'">'+result[i].d30+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(result[i].d90 > 0){
									str+='<td class="font_weight itBlueCol activitiesCls" data-id="'+result[i].id+'" data-scope-id="90" data-type="'+result[i].type+'">'+result[i].d90+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(result[i].d180 > 0){
									str+='<td class="font_weight itBlueCol activitiesCls" data-id="'+result[i].id+'" data-scope-id="180" data-type="'+result[i].type+'">'+result[i].d180+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(result[i].d365 > 0){
									str+='<td class="font_weight itBlueCol activitiesCls" data-id="'+result[i].id+'" data-scope-id="365" data-type="'+result[i].type+'">'+result[i].d365+'</td>';
								}else{
									str+='<td>-</td>';
								}
							str+='</tr>';
						}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
	$("#activityProfTabId").html(str);
	$("#activityProfdataTable").dataTable({
		"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "APInnovationSociety",
					filename:  'APInnovationSociety_'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
	});
}
function getActivitiesProfileUpcomingDetails(){
$("#activityProfTabId").html(spinner);
	var json = {
		
	};
	$.ajax({                
		type:'POST',
		url: 'getActivitiesProfileUpcomingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildActivitiesProfileUpcomingDetails(result);
		}else{
			$("#activityProfTabId").html("No Data Available");
		}
	});
}
function buildActivitiesProfileUpcomingDetails(result){
	var str=''
	str+='<div class="row">';
		str+='<ul class="list-inline switch-btn pull-right activityProfileCls">';
			str+='<li attr_type="Completed">Completed</li>';
			str+='<li class="active" attr_type="Upcoming">Upcoming</li>';
		str+='</ul>';
	str+='</div>';
	str+='<div class="m_top10">';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_custom_SC tableStyleCls m_top10" id="activityProfdataTable" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th style="text-align:left !important;width:25%;">Activity Name</th>';
						str+='<th>Date Of Event</th>';
						str+='<th>Created On</th>';
						str+='<th>Days to coming of Event</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td style="text-align:left !important;" class="font_weight">'+result[i].name+'</td>';
							str+='<td>'+result[i].date+'</td>';
							str+='<td>'+result[i].createdOn+'</td>';
							str+='<td>'+result[i].count+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#activityProfTabId").html(str);
	$("#activityProfdataTable").dataTable({
		"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "APInnovationSociety",
					filename:  'APInnovationSociety_'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
	});
}
function getTargetsAndAchievementDetails(){
$("#targVsAchTabId").html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
	};
	$.ajax({                
		type:'POST',
		url: 'getTargetsAndAchievementDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildTargetsAndAchievementDetails(result);
		}else{
			$("#targVsAchTabId").html("No Data Available");
		}
	});
}
function buildTargetsAndAchievementDetails(result){
	var str='';
		str='<div class="table-responsive">';
			str+='<table class="table table-bordered  table_custom_SC tableGreyCol" id="targVsAchTabDataTable" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2" style="text-align:left !important;">Component Name</th>';
						str+='<th colspan="3" style="background-color: #C9CDD5 !important;">Overall</th>';
						str+='<th colspan="3">Quarter-1</th>';
						str+='<th colspan="3">Quarter-2</th>';
						str+='<th colspan="3">Quarter-3</th>';
						str+='<th colspan="3">Quarter-4</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th style="background-color: #C9CDD5 !important;">Target</th>';
						str+='<th style="background-color: #C9CDD5 !important;">Achieved</th>';
						str+='<th style="background-color: #C9CDD5 !important;">%</th>';
						str+='<th>Target</th>';
						str+='<th>Achieved</th>';
						str+='<th>%</th>';
						str+='<th>Target</th>';
						str+='<th>Achieved</th>';
						str+='<th>%</th>';
						str+='<th>Target</th>';
						str+='<th>Achieved</th>';
						str+='<th>%</th>';
						str+='<th>Target</th>';
						str+='<th>Achieved</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody class="bg_ff">';
				for(var i in result){
					str+='<tr>';
						str+='<td class="" style="text-align:left !important;">'+result[i].name+'</td>';
						if(result[i].overAllTarget !=null && result[i].overAllTarget != 0){
							str+='<td class="font_weight">'+result[i].overAllTarget+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].overAllAchieved !=null && result[i].overAllAchieved != 0){
							str+='<td class="font_weight">'+result[i].overAllAchieved+'</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='<td class="font_weight text-success">'+result[i].overAllPerc+'</td>';
						if(result[i].q1target !=null && result[i].q1target != 0){
							str+='<td class="font_weight">'+result[i].q1target+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].q1achieved !=null && result[i].q1achieved != 0){
							str+='<td class="font_weight">'+result[i].q1achieved+'</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='<td class="font_weight text-success">'+result[i].q1perc+'</td>';
						if(result[i].q2target !=null && result[i].q2target != 0){
							str+='<td class="font_weight ">'+result[i].q2target+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].q2achieved !=null && result[i].q2achieved != 0){
							str+='<td class="font_weight">'+result[i].q2achieved+'</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='<td class="font_weight text-success">'+result[i].q2perc+'</td>';
						if(result[i].q3target !=null && result[i].q3target != 0){
							str+='<td class="font_weight">'+result[i].q3target+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].q3achieved !=null && result[i].q3achieved != 0){
							str+='<td class="font_weight">'+result[i].q3achieved+'</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='<td class="font_weight text-success">'+result[i].q3perc+'</td>';
						if(result[i].q4target !=null && result[i].q4target != 0){
							str+='<td class="font_weight">'+result[i].q4target+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].q4achieved !=null && result[i].q4achieved != 0){
							str+='<td class="font_weight">'+result[i].q4achieved+'</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='<td class="font_weight text-success">'+result[i].q4perc+'</td>';
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#targVsAchTabId").html(str);
	$("#targVsAchTabDataTable").dataTable({
		"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "APInnovationSociety",
					filename:  'APInnovationSociety_TargetsAndAchievement'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
	});
	/* for(var i in result){
		buildBarChart( "barGraph"+i+"0",result[i].overAllTarget,result[i].overAllAchieved);			
		buildBarChart( "barGraph"+i+"1",result[i].q1target,result[i].q1achieved);			
		buildBarChart( "barGraph"+i+"2",result[i].q2target,result[i].q2achieved);			
		buildBarChart( "barGraph"+i+"3",result[i].q3target,result[i].q3achieved);			
		buildBarChart( "barGraph"+i+"4",result[i].q4target,result[i].q4achieved);			
	} */
	
}
function getDistrictWiseDetails(){
	$("#districtWiseDetTabId").html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
	};
	$.ajax({                
		type:'POST',
		url: 'getDistrictWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildDistrictWiseDetails(result);
		}else{
			$("#districtWiseDetTabId").html("No Data Available");
		}
	});
}
function buildDistrictWiseDetails(result){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_bg_white m_top10" id="dataTableDistWise" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2" style="text-align:left !important;">District Name</th>';
					str+='<th rowspan="2">No.of Startups</th>';
					str+='<th rowspan="2">Revenue</th>';
					str+='<th rowspan="2">Incubators/Accelerators</th>';
					str+='<th rowspan="2">Activities</th>';
					str+='<th rowspan="2">Atal Tinkering Labs</th>';
					str+='<th colspan="3">Employment Created</th>';							
				str+='</tr>';
				str+='<tr>';
					str+='<th>Full time</th>';
					str+='<th>Part time</th>';
					str+='<th>Intern</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody class="text-center bg_ff">';
			for(var i in result){
				str+='<tr>';
					str+='<td style="text-align:left !important;" class="font_weight">'+result[i].name+'</td>';
					if(result[i].startUps > 0){
						str+='<td class="font_weight itBlueCol districtClickCls" data-id="'+result[i].id+'" data-type="Startups" data-name="'+result[i].name+'">'+result[i].startUps+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].revenueGeneration != null && result[i].revenueGeneration != 0){
					str+='<td class="font_weight">'+result[i].revenueGeneration+'</td>';
					}else{
					str+='<td>-</td>';
					}
					if(result[i].incubators > 0){
						str+='<td class="font_weight itBlueCol districtClickCls" data-id="'+result[i].id+'" data-type="Incubators" data-name="'+result[i].name+'">'+result[i].incubators+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].activities > 0){
						str+='<td class="font_weight itBlueCol districtClickCls"  data-id="'+result[i].id+'" data-type="Activities" data-name="'+result[i].name+'">'+result[i].activities+'</td>';
					}else{
						str+='<td>-</td>';
					}
					str+='<td class="font_weight itBlueCol districtClickCls"  data-id="'+result[i].id+'" data-type="AtalTinkeringLabs" data-name="'+result[i].name+'">'+result[i].aTLs+'</td>';
					if(result[i].emplFull > 0){
						str+='<td class="font_weight itBlueCol">'+result[i].emplFull+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].emplPart > 0){
						str+='<td class="font_weight itBlueCol">'+result[i].emplPart+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].empIntern > 0){
						str+='<td class="font_weight itBlueCol">'+result[i].empIntern+'</td>';
					}else{
						str+='<td>-</td>';
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';		
	$("#districtWiseDetTabId").html(str);
	$("#dataTableDistWise").dataTable({
		"aaSorting": [],
		"searching": false,
		"paging":   false,		
		"info":     false,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "APInnovationSociety",
				filename:  'APInnovationSociety_Activities'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
	
}

//vasanthi

$(document).on("click",".startupProfileCls",function(){
	var $this = $(this),
	type = $this.data("type");
	//alert(type);
	$("#APInnovationModalId").modal('show');
	$("#APInnovationModalHeadingId").html(type+" - Details");
	getStartUpsProfileClickingDetails(type,"APInnovationModalDetailsDivId");
});


function getStartUpsProfileClickingDetails(type,divId){
	$("#"+divId).html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
		type : type 
	};
	$.ajax({                
		type:'POST',
		url: 'getStartUpsProfileClickingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){			
			buildAllTypesDetails(result,"Startup",divId,"startUpProfile",false);
		}else{
			$("#"+divId).html("No Data Available");
		}
	});
}
$(document).on("click",".startupProfStagesCls",function(){
	var $this = $(this),
	type = $this.data("type"),
	buildType = $this.data("build-type"),
	name = $this.data("name"),
	deptId = $this.data("id");	
	$("#APInnovationModalId").modal('show');
	$("#APInnovationModalHeadingId").html(name+" - "+type+" Details");
	if(buildType == "stage"){		
		getStagesClickingDetails(type,deptId,"APInnovationModalDetailsDivId");
	}else{
		getSectorClickingDetails(type,deptId,"APInnovationModalDetailsDivId");
	}
	
});
function getStagesClickingDetails(type,deptId,divId){
	$("#"+divId).html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
		type : type ,
		deptId : deptId
	};
	$.ajax({                
		type:'POST',
		url: 'getStagesClickingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){			
			buildAllTypesDetails(result,"Startup",divId,"startUpProfStages",false);
		}else{
			$("#"+divId).html("No Data Available");
		}
	});
}
function getSectorClickingDetails(type,deptId,divId){
	$("#"+divId).html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
		type : type ,
		deptId : deptId
	};
	$.ajax({                
		type:'POST',
		url: 'getSectorClickingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){			
			buildAllTypesDetails(result,"Startup",divId,"startUpProfSectors",false);
		}else{
			$("#"+divId).html("No Data Available");
		}
	});
}
$(document).on("click",".districtClickCls",function(){
	var $this = $(this),
	type = $this.data("type"),
	name = $this.data("name"),
	deptId = $this.data("id");	
	$("#APInnovationModalId").modal('show');
	if(type == "AtalTinkeringLabs"){
		$("#APInnovationModalHeadingId").html(name+" District - ATAL Tinkering Labs");
	}else{
		$("#APInnovationModalHeadingId").html(name+" District - "+type);
	}	
	getDistictClikingDetails(type,deptId,"APInnovationModalDetailsDivId");
});


function getDistictClikingDetails(type,deptId,divId){
	$("#"+divId).html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
		type : type ,
		deptId : deptId
	};
	$.ajax({                
		type:'POST',
		url: 'getDistictClikingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			if(type == "Activities"){
				buildActivitesDetails(result,divId,"districtWise");
			}else if(type == "Startups"){
				buildDistrictStartUpDetails(result,divId,"districtWise");
			}else{
				buildAllTypesDetails(result,type,divId,"districtWise",false);
			}
			
		}else{
			$("#"+divId).html("No Data Available");
		}
	});
}

function buildActivitesDetails(result,divId,buildType){
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="table-responsive">';
				str+='<table class="table table-bordered table_bg_white m_top10" id="dataTable'+buildType+'" style="width:100% !important;">';
					str+='<thead>';
						str+='<tr>';
							str+='<th>Activity Name</th>';
							str+='<th>Venue</th>';							
							str+='<th>From Date</th>';
							str+='<th>To Date</th>';
							str+='<th>Description</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
					for(var i in result){
						str+='<tr>';
						if(buildType == "districtWise"){
							str+='<td>'+getValues(result[i].type)+'</td>';	
						}else{
							str+='<td>'+getValues(result[i].conductedBy)+'</td>';	
						}													
							str+='<td>'+getValues(result[i].address)+'</td>';
							str+='<td>'+getValues(result[i].fromDate)+'</td>';
							str+='<td>'+getValues(result[i].toDate)+'</td>';
							str+='<td>'+getValues(result[i].description)+'</td>';
							
						str+='</tr>';
					}						
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#dataTable"+buildType).dataTable({		
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "APInnovationSociety",
				filename:  'APInnovationSociety_Activities'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}

$(document).on("click",".activitiesCls",function(){
	var $this = $(this),
	deptId = $this.data("id"),
	scopeId = $this.data("scope-id");
	type = $this.data("type");
	//alert(type);
	$("#APInnovationModalId").modal('show');
	if(scopeId == "0"){
		$("#APInnovationModalHeadingId").html(type+" - OverAll Activities");
	}else{
		$("#APInnovationModalHeadingId").html(type+" -- "+scopeId+" Days Activities");
	}
	
	getActivityProfileClikingDetails(scopeId,deptId,"APInnovationModalDetailsDivId");
}); 

function getActivityProfileClikingDetails(scopeId,deptId,divId){
	$("#"+divId).html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : "",
		scopeId : scopeId ,
		deptId : deptId
	};
	$.ajax({                
		type:'POST',
		url: 'getActivityProfileClikingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildActivitesDetails(result,divId,"activity");			
		}else{
			$("#"+divId).html("No Data Available");
		}
	});
}
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

function buildDistrictStartUpDetails(result,divId,buildType){
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="table-responsive">';
				str+='<table class="table table-bordered table_bg_white m_top10" id="dataTableId" style="width:100% !important;">';
					str+='<thead>';
						str+='<tr>';
							str+='<th>StartUp Name</th>';
							//str+='<th>Innovator</th>';							
							str+='<th>Stage</th>';
							str+='<th>Sector</th>';
							str+='<th>Revenue</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
					for(var i in result){
						str+='<tr>';									
							str+='<td>'+getValues(result[i].startup)+'</td>';
							//str+='<td>'+getValues(result[i].innovator)+'</td>';
							str+='<td>'+getValues(result[i].stage)+'</td>';
							str+='<td>'+getValues(result[i].sector)+'</td>';
							str+='<td>'+getValues(result[i].revenueGenerated)+'</td>';
							
						str+='</tr>';
					}						
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#dataTableId").dataTable({		
		"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "APInnovationSociety",
					filename:  'APInnovationSociety_'+buildType+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
	});
}

$(document).on("click",".startUpCompInfoCls",function(){
	var $this = $(this),
	type = $this.data("type"),
	name = $this.data("name"),
	deptId = $this.data("id");	
	$("#startUpCompInforModalId").modal('show');
	
	if(type != null && type == "Enablers"){
		$("#startUpCompInfoModalHeadingId").html(name+" - Beneficiary Details");
	}else{
		$("#startUpCompInfoModalHeadingId").html(name+" - StartUp Details");
	}
	getStartupCompleteInformationClickingDetails(type,deptId);
});

function getStartupCompleteInformationClickingDetails(type,deptId){
	$("#startUpCompInfoModalDetailsDivId").html(spinner);
	var json = {
		 type : type,
		 deptId : deptId
	};
	$.ajax({                
		type:'POST',
		url: 'getStartupCompleteInformationClickingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length > 0){
			buildStartupCompInfoClickingDetails(result,type,deptId);
		}else{
			$("#startUpCompInfoModalDetailsDivId").html("No Data Available");
		}
	});
}

function buildStartupCompInfoClickingDetails(result,type,deptId){
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="table-responsive">';
				str+='<table class="table table-bordered table_bg_white m_top10" id="dataTableId'+type+'" style="width:100% !important;">';
					str+='<thead>';
					if(type != null && type == "Incubators"){
						str+='<tr>';
						str+='<th rowspan="2" style="text-align:left !important;">Startup Name</th>';
						str+='<th rowspan="2">Innovator</th>';
						str+='<th rowspan="2">Stage</th>';
						str+='<th rowspan="2">Sector</th>';
						str+='<th rowspan="2">Revenue</th>';
						str+='<th rowspan="2">Fund Raised</th>';						
						str+='<th rowspan="2">Angel Invester</th>';						
						str+='<th rowspan="2">Incubator / Accelerators</th>';
						str+='<th colspan="3">Employees</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Fulltime</th>';
						str+='<th>Parttime</th>';
						str+='<th>Intern</th>';
					str+='</tr>';
					}else if(type != null && type == "AngelInvestors"){
						str+='<th>Startup Name</th>';
						str+='<th>Revenue Generated</th>';
					}else if(type != null && type == "Enablers"){
						if(deptId != null && deptId == 4){
							str+='<th>Beneficiary Name</th>';
							str+='<th>Type of Benefit</th>';
							str+='<th>Date</th>';
							str+='<th>Profession</th>';
							str+='<th>Organization</th>';
						}else if(deptId != null && deptId == 8){
							str+='<th>Beneficiary Name</th>';
							str+='<th>Type of Benefit</th>';
							str+='<th>Date</th>';
							str+='<th>starups</th>';
							str+='<th>Area/Field</th>';
							str+='<th>Subject</th>';
						}
					}else if(type != null && type == "BootCampParticipants"){
						str+='<th>Participant Name</th>';
						str+='<th>College Name</th>';
						str+='<th>Cource</th>';
						str+='<th>Branch</th>';
						str+='<th>Year</th>';
					}
						
					str+='</thead>';
					str+='<tbody>';
					for(var i in result){
						if(type != null && type == "Incubators"){
						str+='<tr>';									
							str+='<td style="text-align:left !important;" class="font_weight">'+getValues(result[i].startup)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].innovator)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].stage)+'</td>';
							str+='<td class="font_weight">'+getValues(result[i].sector)+'</td>';
							if(result[i].revenueGenerated != null && result[i].revenueGenerated != 0){
								str+='<td class="font_weight">'+result[i].revenueGenerated+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].fundRaised != null  && result[i].fundRaised != 0){
								str+='<td class="font_weight">'+result[i].fundRaised+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].investor != null && result[i].investor != 0){
								str+='<td class="font_weight">'+result[i].investor+'</td>';
							}else{
								str+='<td>-</td>';
							}
							
							str+='<td>'+getValues(result[i].incubator)+'</td>';
							if(result[i].permentJobs  != null && result[i].permentJobs != 0){
								str+='<td class="font_weight">'+result[i].permentJobs+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].temporaryJobs != null &&  result[i].temporaryJobs != 0){
								str+='<td class="font_weight">'+result[i].temporaryJobs+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].internJobs != null && result[i].internJobs != 0){
								str+='<td  class="font_weight">'+result[i].internJobs+'</td>';
							}else{
								str+='<td>-</td>';
							}
						str+='</tr>';
						}else if(type != null && type == "AngelInvestors"){
							str+='<tr>';
								if(result[i].startup != null &&  result[i].startup != 0){
									str+='<td class="font_weight">'+result[i].startup+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(result[i].revenueGenerated != null && result[i].revenueGenerated != 0){
									str+='<td  class="font_weight">'+result[i].revenueGenerated+'</td>';
								}else{
									str+='<td>-</td>';
								}
							str+='</tr>';
						}else if(type != null && type == "Enablers"){
							if(deptId != null && deptId == 4){
								str+='<tr>';
									str+='<td>'+getValues(result[i].name)+'</td>';
									str+='<td>'+getValues(result[i].typeOfBenifit)+'</td>';
									str+='<td>'+getValues(result[i].fromDate)+'</td>';
									str+='<td>'+getValues(result[i].category)+'</td>';
									str+='<td>'+getValues(result[i].organization)+'</td>';
								str+='</tr>';
							}else if(deptId != null && deptId == 8){
								str+='<td>'+getValues(result[i].name)+'</td>';
								str+='<td>'+getValues(result[i].type)+'</td>';
								str+='<td>'+getValues(result[i].fromDate)+'</td>';
								str+='<td>'+getValues(result[i].startup)+'</td>';
								str+='<td>'+getValues(result[i].sector)+'</td>';
								str+='<td>'+getValues(result[i].description)+'</td>';
							}
						}else if(type != null && type == "BootCampParticipants"){
							str+='<tr>';
								str+='<td>'+getValues(result[i].name)+'</td>';
								str+='<td>'+getValues(result[i].collegeName)+'</td>';
								str+='<td>'+getValues(result[i].course)+'</td>';
								str+='<td>'+getValues(result[i].branch)+'</td>';
								str+='<td>'+getValues(result[i].estYear)+'</td>';
							str+='</tr>';
						}
					}						
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#startUpCompInfoModalDetailsDivId").html(str);
	$("#dataTableId"+type).dataTable({		
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "APInnovationSociety",
				filename:  'APInnovationSociety_'+type+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function getAllBootCampDetails(){
	$("#bootCampDetailsDivId").html(spinner);
	var json = {
		
	};
	$.ajax({                
		type:'POST',
		url: 'getAllBootCampDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			buildAllBootCampDetails(result);
		}else{
			$("#bootCampDetailsDivId").html("No Data Available");
		}
	});
}
function buildAllBootCampDetails(result){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_bg_white m_top10" id="dataTableBootCampWise" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Bootcamp Name</th>';
					str+='<th>Venue</th>';
					str+='<th>Place</th>';
					str+='<th>From Date</th>';
					str+='<th>To Date</th>';
					str+='<th>Total Participants</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody class="text-center bg_ff">';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+getValues(result[i].name)+'</td>';
					str+='<td>'+getValues(result[i].venue)+'</td>';
					str+='<td>'+getValues(result[i].place)+'</td>';
					str+='<td>'+getValues(result[i].fromDate)+'</td>';
					str+='<td>'+getValues(result[i].toDate)+'</td>';
					if(result[i].total != null && result[i].total != 0){
						str+='<td class="font_weight itBlueCol bootCampPartiCls" data-id="'+result[i].id+'"  data-name="'+result[i].name+'">'+getValues(result[i].total)+'</td>';
					}else{
						str+='<td>-</td>';
					}
					
					
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';		
	$("#bootCampDetailsDivId").html(str);
	$("#dataTableBootCampWise").dataTable({		
		"aaSorting": [],
		"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "APInnovationSociety",
					filename:  'APInnovationSociety_BootCampDetails'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
	
	});
}
$(document).on("click",".bootCampPartiCls",function(){
	var $this = $(this),
	name = $this.data("name"),
	deptId = $this.data("id");	
	$("#startUpCompInforModalId").modal('show');
	$("#startUpCompInfoModalHeadingId").html(name+" - BootCamp Participant Details");
	getBootCampParticipantsClickingDetails(deptId);
});

function getBootCampParticipantsClickingDetails(deptId){
	$("#startUpCompInfoModalDetailsDivId").html('');
	$("#startUpCompInfoModalDetailsDivId").html(spinner);
	var json = {
		deptId : deptId
	};
	$.ajax({                
		type:'POST',
		url: 'getBootCampParticipantsClickingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			buildStartupCompInfoClickingDetails(result,"BootCampParticipants",null);
		}else{
			$("#startUpCompInfoModalDetailsDivId").html("No Data Available");
		}
	});
}
function getTrainingOverviewCourseWise(districtId){
	$("#trainHackathonDetailsDivId").html(spinner);
	var json={
		"fromDateStr" : globalFromDateAPI,
		"toDateStr" : globalToDateAPI,
		"districtId":districtId
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
			buildTrainingOverviewCourseWiseForHackthon(result.technicalList,"trainHackathonDetailsDivId",districtId);
		} else {
			$("#trainHackathonDetailsDivId").html("<div class='text-center m_top_bottom' style='border:1px solid #ccc;'>No Data Available</div>");
		}
	})
}

function buildTrainingOverviewCourseWiseForHackthon(result,divId,districtId) {
	var str='';
	if($(window).width() < 800) {
		str+='<div class="table-responsive mb_20 m_top20">';
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
function getTrainingStudentDetails(qualificationId,companyId,districtId,specializationId,collegeId,overViewType,minValue,type){
	$("#companiesModalDivId").html(spinner);
	var json={
		"fromDateStr" : globalFromDateAPI,
		"toDateStr" : globalToDateAPI,
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
			buildTrainingStudentDetails(result,json); 
		}
	})
}
function buildTrainingStudentDetails(result,jsObj) {
	var tableView='';
	tableView+='<div class="table-responsive m_top20">';
		tableView+='<table class="table table-bordered table_custom_SC dataTable" id="companiesModalDivIddataTable">';
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
	$("#companiesModalDivId").html(tableView);
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
				getTrainingStudentDetails(jsObj.qualificationId,jsObj.companyId,jsObj.locationId,jsObj.specializationId,jsObj.casteGroupId,jsObj.overViewType,startFromResult2,jsObj.type)			
			}
		});
	 }
	$("#companiesModalDivIddataTable").dataTable({
		 "paging":   false,
		 "info":     false,
		"aLengthMenu": [[10, 15, 20,50, -1], [10, 15, 20,50, "All"]],
		"retrieve":true,
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
function getCoursesInfo(divId,districtId,type) {
	$("#"+divId).html(spinner);
	var json={
		"locationId" : districtId,
		"fromDateStr" :globalFromDateAPI,
		"toDateStr" : globalToDateAPI,
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
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]
	});
}
function getTrainingColleges(divId,districtId,type){
	$("#"+divId).html(spinner);
	var json={
		districtId : districtId,
		"fromDateStr" : globalFromDateAPI,
		"toDateStr" : globalToDateAPI,
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
function getTrainersInfo(divId,districtId,type) {
	$("#"+divId).html(spinner);
	var json={
		"locationId" : districtId,
		"fromDateStr" :globalFromDateAPI,
		"toDateStr" : globalToDateAPI,
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
function getTrainingAndPlacementOverViewDetails(){
	  $("#trainingDetailsDivId").html(spinner);
	var json={
		"fromDateStr" :globalFromDateAPI,
		"toDateStr" : globalToDateAPI,
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
			buildTrainingAndPlacementDetails(result,0);
		}
	})
}
function buildTrainingAndPlacementDetails(result,districtId) {
var str='';
	var HackathonObj={"names":["Courses","Colleges","Trained Students","Training Locations","Trainers"], "images":["courses","collages","trained_students","trained_locations","trainers"], "counts":[result.hackCourses,result.hackColleges,result.hackStudentsCount,result.trainingLocation,result.hackTrainers]}; 
	
	 str+='<div class="row m_top10">';
		 if($(window).width()<800){
			str+='<div class="col-sm-12">';
		} else {
			str+='<div class="col-sm-12 pad_rgt4">';
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
		str+='</div>';  
	$("#trainingDetailsDivId").html(str);
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
	if(blockName == "technicalBlock"){
		if(name == "trainedStudents") {
			getTrainingStudentDetails("",companyId,0,"","","trainingBlocktrainedStudents",0,type);
		} else {
			getTrainingStudentDetails(qualificationId,companyId,0,"","","trainingBlocktrainedStudents",0,type);
		}
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
			getTrainingStudentDetails("","",0,"","","overViewType",0,type);
		}else if(name == "Trainers") {
			if($(window).width()<800){
				$('.widthclass').css("width","95%");
			} else {
				$('.widthclass').css("width","50%");
			}
			getTrainersInfo("companiesModalDivId",0,type);
		}
	}
	
});
$(document).on("click",".activityProfileCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
		
	var blockType = $(this).attr("attr_type");
	if(blockType == "Completed"){
		getActivitiesProfile();
	}else{
		getActivitiesProfileUpcomingDetails();
	}
});