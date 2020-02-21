var partyMeetingLevelIds =[];
var partyMeetingTypeIds=[];
function basicMeetingDetails(meetingBlockValue,chosenLabel){
	var modalBlock='';
	
	modalBlock+='<div class="row">';
		modalBlock+='<div class="col">';
				modalBlock+='<h6 class="font_weight" id="meetingHeadingId">OVERALL MEETINGS - OVERVIEW</h6>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div id="meetingOverAllDivId"></div>';
	
	if(meetingBlockValue !=4 && meetingBlockValue !=7){
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col m_top20">';
					modalBlock+='<h6 class="font_weight">ATTENDANCE</h6>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div id="meetingAttendanceDetailsDivId"></div>';	
	}
	modalBlock+='<div class="row">';
		modalBlock+='<div class="col m_top20">';
				modalBlock+='<h6 class="font_weight">MOM - OVERVIEW</h6>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div id="momMeetingOverAllDivId"></div>';
	
	modalBlock+='<div id="actiobalMeetingsBlockDivId"></div>';
	
	modalBlock+='<div class="row">';
			modalBlock+='<div class="col m_top20">';
				modalBlock+='<h6 class="font_weight">MEETINGS VARIANCE REPORT - <small>OverAll</small></h6>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div class="row">';
		modalBlock+='<div class="col">';
			modalBlock+='<div id="variationMeetingDivId"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div id="locationWiseMeetingOverAllDivId"></div>';
	
	$(".blockWiseModalDivId").html(modalBlock);
	
	if(meetingBlockValue == 0){
		$("#meetingHeadingId").html("OVERALL MEETINGS - OVERVIEW");
	}else if(meetingBlockValue == 2){
		$("#meetingHeadingId").html("DISTRICT MEETINGS - OVERVIEW");
	}else if(meetingBlockValue == 3){
		$("#meetingHeadingId").html("CONSTITUENCY MEETINGS - OVERVIEW");
	}else if(meetingBlockValue == 4){
		$("#meetingHeadingId").html("MANDAL TOWN DIVISION MEETING - OVERVIEW");
	}else if(meetingBlockValue == 7){
		$("#meetingHeadingId").html("VILLAGE WARD MEETING - OVERVIEW");
	}
	
	onloadMeetingModalCalls(meetingBlockValue,chosenLabel);
}

function onloadMeetingModalCalls(meetingBlockValue,chosenLabel){
	partyMeetingLevelIds =[];
	partyMeetingTypeIds=[];
	
	tourCustomStartDate="";
	tourCustomEndDate="";
	if(customStartDate != customEndDate){
		if(chosenLabel == "thisMonth"){
			tourCustomStartDate = moment().startOf('month').format('DD/MM/YYYY');
			tourCustomEndDate = moment().endOf('month').format('DD/MM/YYYY');
		}else if(chosenLabel == "lastMonth"){
			tourCustomStartDate=moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY');
			tourCustomEndDate=moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
		}else if(chosenLabel == "last3Month"){
			tourCustomStartDate = moment().subtract(3, 'month').startOf('month').format('DD/MM/YYYY');
			tourCustomEndDate = moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
		}else if(chosenLabel == "last6Month"){
			tourCustomStartDate = moment().subtract(6, 'month').startOf('month').format('DD/MM/YYYY');
			tourCustomEndDate = moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
		}else{
			tourCustomStartDate=moment().subtract(10, 'years').startOf('year').format('DD/MM/YYYY');
			tourCustomEndDate=moment().format('DD/MM/YYYY');
		}
		
	}else{
		tourCustomStartDate=customStartDate;
		tourCustomEndDate = customEndDate;
	}
	
	if(meetingBlockValue == 0){
		partyMeetingLevelIds =[2,3,4,5,6,7,8];
		partyMeetingTypeIds=[2,3,14,15];
	}else{
		if(meetingBlockValue == 4){
			partyMeetingLevelIds.push(4);
			partyMeetingLevelIds.push(5);
			partyMeetingLevelIds.push(6);
			partyMeetingTypeIds=[15];
		}else if(meetingBlockValue == 7){
			partyMeetingLevelIds.push(7);
			partyMeetingLevelIds.push(8);
			partyMeetingTypeIds=[14];
		}else{
			partyMeetingLevelIds.push(meetingBlockValue);
			partyMeetingTypeIds.push(meetingBlockValue);
		}
		
	}
	getLocationWiseStatusWiseMeetingsOverView(meetingBlockValue);
	getPartyMeetingMomOverview(meetingBlockValue);
	levelWiseMeetingData(meetingBlockValue);
	getMeetingVarianceReport("variationMeetingDivId","","","onload",meetingBlockValue);
	if(meetingBlockValue !=4 || meetingBlockValue !=7){
		getPartyMeetingInvitesNonInvitesDetails(meetingBlockValue);
	}
	getruleWiseActionBotsOverviewMeetings();
}
function getLocationWiseStatusWiseMeetingsOverView(meetingBlockValue){
	 $("#meetingOverAllDivId").html(spinner);
	
	var json={  
		"stateId":1,
		"fromDateStr":tourCustomStartDate,
	    "toDateStr":tourCustomEndDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingTypeIds":partyMeetingTypeIds,
		"activityMemberId":44

	};
	 $.ajax({
		url: "getLocationWiseStatusWiseMeetingsOverView",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				buildLocationWiseStatusWiseMeetingsOverView(result,meetingBlockValue);
			}else{
				$("#meetingOverAllDivId").html("No Data Available")
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildLocationWiseStatusWiseMeetingsOverView(result,meetingBlockValue){
	
	var modalBlock='';
	var statusObj={'MAYBE':'fas fa-exclamation-triangle','NO':'far fa-times-circle','YES':'far fa-check-circle','NOT UPDATED':'fas fa-spinner'}
	var statusColorObj={'MAYBE':'color_orange','NO':'color_red','YES':'color_green','NOT UPDATED':'color_blue'}
	var totalMeetingCount=0;
	for(var i in result){
		if(result[i].name == "Total"){
			totalMeetingCount = result[i].count;
		}
	}
	modalBlock+='<div class="new_border_yash_pad">';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="mainBlockUl">';
					modalBlock+='<ul class="list-inline blocksLi">';
						for(var i in result){
							modalBlock+='<li>';
								
								if(result[i].name == "Total"){
									modalBlock+='<h6 class="">'+result[i].name+' </h6>';
									//modalBlock+='<h6 class="">'+result[i].name+'  </h6>';
									modalBlock+='<h5 class="font_weight m_top10">'+result[i].count+' <img src="Core/images/tdp_logo.png" class="float-right" style="height:40px;width:40px;border-radius:50%"/></h5>';
								}else{
									modalBlock+='<h6 class="">'+result[i].name+'</h6>';
									var  Perc = (result[i].count/totalMeetingCount*100).toFixed(2);
									if(result[i].count !=null && result[i].count>0){
										modalBlock+='<h5 class="font_weight m_top10">'+result[i].count+'  <small class="'+statusColorObj[result[i].name]+'"> '+Perc+' %</small> <i class="float-right '+statusObj[result[i].name]+' '+statusColorObj[result[i].name]+' font_28"/></h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
									}
									
								}
								
							modalBlock+='</li>';
						}
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		if(meetingBlockValue !=4 && meetingBlockValue !=7){
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12 pad_left_right_23 m_top10">';
					modalBlock+='<div class="table-responsive">';
						modalBlock+='<table class="table table-bordered table_custom_meeting_Att">';
							modalBlock+='<thead>';
								modalBlock+='<tr>';
									modalBlock+='<th>Meeting With Out Attendance</th>';
									modalBlock+='<th>Meeting With Attendance</th>';
									modalBlock+='<th>Meeting With Attendance %</th>';
									modalBlock+='<th>Meeting With Images</th>';
									modalBlock+='<th>Meeting With MOM</th>';
								modalBlock+='</tr>';
							modalBlock+='</thead>';
							modalBlock+='<tbody>';
								modalBlock+='<tr>';
									if(result[0].meetingWithoutAttendance !=null && result[0].meetingWithoutAttendance>0){
										if(result[0].meetingWithoutAttendance !=null && result[0].meetingWithoutAttendance>0){
											modalBlock+='<td class="getLevelWiseMeetingDetailsCls" attr_click_type="MeetingWithOutAttendance" attr_name="Meeting With Out Attendance Details">'+result[0].meetingWithoutAttendance+'</td>';
										}else{
											modalBlock+='<td> - </td>';
										}
										
									}else{
										modalBlock+='<td> - </td>';
									}
									if(result[0].meetingWithAttendance !=null && result[0].meetingWithAttendance>0){
										modalBlock+='<td>'+result[0].meetingWithAttendance+' <i class="fas fa-info-circle color_yash getLevelWiseMeetingDetailsCls" attr_click_type="MeetingWithAttendance" attr_filter_Type="MeetingDetails"></i> </td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									
									modalBlock+='<td>'+emptyCheck(result[0].meetingWithAttendancePerc)+'</td>';
									modalBlock+='<td>'+emptyCheck(result[0].documentCount)+'</td>';
									
									if(result[0].momcount !=null && result[0].momcount>0){
										modalBlock+='<td><span class="getLevelWiseMeetingDetailsCls" attr_click_type="tabManualMomUpNUp" attr_filter_Type="UpdatedMeetings" attr_name="Meetings With MOM Details" attr_meeting_block_val="'+meetingBlockValue+'">'+result[0].momcount+'</span></td>';
									}else{
										
									}
									
								modalBlock+='</tr>';
							modalBlock+='</tbody>';
						modalBlock+='</table>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		}
	modalBlock+='</div>';
	$("#meetingOverAllDivId").html(modalBlock)
}

function getPartyMeetingMomOverview(meetingBlockValue){
	 $("#momMeetingOverAllDivId").html(spinner);
	
	var json={  
		"stateId":1,
		"fromDateStr":tourCustomStartDate,
	    "toDateStr":tourCustomEndDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"activityMemberId":44


	};
	 $.ajax({
		url: "getPartyMeetingMomOverview",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null){
				buildPartyMeetingMomOverview(result,meetingBlockValue);
			}else{
				$("#momMeetingOverAllDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildPartyMeetingMomOverview(result,meetingBlockValue){
	var modalBlock='';
	
	modalBlock+='<div class="new_border_yash_pad">';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="mainBlockUl">';
					modalBlock+='<ul class="list-inline blocksLi">';
						modalBlock+='<li>';
							modalBlock+='<h6 class="">Total Conducted Meetings</h6>';
							if(result.totalConductedMeetings !=null && result.totalConductedMeetings>0){
								modalBlock+='<h5 class="font_weight m_top10"><span class="getLevelWiseMeetingDetailsCls" attr_click_type="tabManualMomUpNUp" attr_filter_Type="TotalMeetings" attr_name="Total Conducted Meetings Details" attr_meeting_block_val="'+meetingBlockValue+'">'+result.totalConductedMeetings+'</span></h5>';
							}else{
								modalBlock+='<h5 class="font_weight m_top10"> - </h5>';   
							}
							
						modalBlock+='</li>';
						modalBlock+='<li>';
							modalBlock+='<h6 class="">MOM Updated Meetings</h6>';
							var  momUpdatedMeetingsPerc = (result.momUpdatedMeetings/result.totalConductedMeetings*100).toFixed(2);
							if(result.momUpdatedMeetings !=null && result.momUpdatedMeetings>0){
								modalBlock+='<h5 class="font_weight m_top10"><span class="getLevelWiseMeetingDetailsCls" attr_click_type="tabManualMomUpNUp" attr_filter_Type="UpdatedMeetings" attr_name="MOM Updated Meetings Details" attr_meeting_block_val="'+meetingBlockValue+'">'+result.momUpdatedMeetings+'</span> <small class="color_green"> '+momUpdatedMeetingsPerc+' %</small> <i class="float-right far fa-check-circle color_green font_28"/></h5>';
							}else{
								modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
							}
							
						modalBlock+='</li>';
						modalBlock+='<li>';
							modalBlock+='<h6 class="">MOM Not Updated Meetings</h6>';
							var  momNonUpdatedMeetingsPerc = (result.momNonUpdatedMeetings/result.totalConductedMeetings*100).toFixed(2);
							if(result.momNonUpdatedMeetings !=null && result.momNonUpdatedMeetings>0){
								modalBlock+='<h5 class="font_weight m_top10"><span class="getLevelWiseMeetingDetailsCls" attr_click_type="tabManualMomUpNUp" attr_filter_Type="notUpdatedMeetings" attr_name="MOM Not Updated Meetings" attr_meeting_block_val="'+meetingBlockValue+'">'+result.momNonUpdatedMeetings+'</span> <small class="color_red"> '+momNonUpdatedMeetingsPerc+' %</small> <i  class="float-right far fa-times-circle color_red font_28"/></h5>';
							}else{
								modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
							}
							
						modalBlock+='</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12 m_top10" style="padding-left: 23px;padding-right: 23px;">';
					modalBlock+='<div class="bg_yash_padding">';
						modalBlock+='<h6 class="font_weight">MOM</h6>';
						
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-3 m_top10">';
								modalBlock+='<div class="bg_white_padding">';
										modalBlock+='<h6 class="">Total</h6>';
										if(result.totalCount !=null && result.totalCount>0){
											modalBlock+='<h5 class="font_weight m_top10 getLevelWiseMeetingDetailsCls"  attr_click_type="momClick" attr_filter_Type="TotalMoms" attr_name="MOM DETAILS" attr_meeting_block_val="'+meetingBlockValue+'">'+result.totalCount+'</h5>';
										}else{
											modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
										}
										
								modalBlock+='</div>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-3 m_top10">';
								modalBlock+='<div class="bg_white_padding">';
										modalBlock+='<h6 class="">General</h6>';
										var  momGeneralPerc = (result.momGeneral/result.totalCount*100).toFixed(2);
										if(result.momGeneral !=null && result.momGeneral>0){
											modalBlock+='<h5 class="font_weight m_top10">'+result.momGeneral+' </h5>';
										}else{
											modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
										}
										
								modalBlock+='</div>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6 m_top10">';
								modalBlock+='<div class="bg_white_padding">';
									modalBlock+='<div class="row">';
										modalBlock+='<div class="col-sm-4 border_right">';
											modalBlock+='<h6 class="">Actionable</h6>';
											var  momActionablePerc = (result.momActionable/result.totalCount*100).toFixed(2);
											if(result.momActionable !=null && result.momActionable>0){
												modalBlock+='<h5 class="font_weight m_top10">'+result.momActionable+'  </h5>';
											}else{
												modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
											}
											
										modalBlock+='</div>';
										modalBlock+='<div class="col-sm-8">';
											modalBlock+='<div class="row">';
												for(var i in result.subList1){
													modalBlock+='<div class="col-sm-6">';
														if(result.subList1[i].locationName == "Govt"){
															modalBlock+='<h6 class="m_bottom_0"><img src="Core/images/GOVT.png" class="" style="height:40px;width:40px;border-radius:50%"/> '+result.subList1[i].locationName+' </h6>';
														}else{
															modalBlock+='<h6 class="m_bottom_0"><img src="Core/images/tdp_logo.png" class="" style="height:40px;width:40px;border-radius:50%"/> '+result.subList1[i].locationName+' </h6>';
														}
														if(result.subList1[i].totalCount !=null && result.subList1[i].totalCount>0){
															modalBlock+='<h5 class="font_weight  m_bottom_0" style="margin-left: 35px;">'+result.subList1[i].totalCount+'</h5>';
														}else{
															modalBlock+='<h5 class="font_weight  m_bottom_0" style="margin-left: 35px;"> - </h5>';
														}
														
													modalBlock+='</div>';
												}
											modalBlock+='</div>';	
										modalBlock+='</div>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
	modalBlock+='</div>';	
	
	$("#momMeetingOverAllDivId").html(modalBlock);
	
}

function levelWiseMeetingData(meetingBlockValue)
{
	if(meetingBlockValue == 2){
		var levelWiseMeetingArr = ['District'];
	}else{
		var levelWiseMeetingArr = ['District','Parliament','Constituency'];
	}
	
	
	var collapse='';
	collapse+='<section>';
	for(var i in levelWiseMeetingArr)
	{
		collapse+='<div class="row">';
			collapse+='<div class="col-sm-12 m_top10">';
					collapse+='<div class="" id="accordion'+levelWiseMeetingArr[i]+'" role="tablist" aria-multiselectable="true">';
						collapse+='<div class="card card-white">';
							collapse+='<div class="card-header card-header-custom" role="tab" id="heading'+levelWiseMeetingArr[i]+'">';
								/* if(i == 0)
								{
									collapse+='<a role="button" class="panelCollapseIcon '+levelWiseMeetingArr[i]+' "  data-toggle="collapse" data-parent="#accordion'+levelWiseMeetingArr[i]+'" href="#collapse'+levelWiseMeetingArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseMeetingArr[i]+'">';
								}else{
									collapse+='<a role="button" class="panelCollapseIcon  '+levelWiseMeetingArr[i]+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+levelWiseMeetingArr[i]+'" href="#collapse'+levelWiseMeetingArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseMeetingArr[i]+'">';
								} */
								collapse+='<a role="button" class="panelCollapseIcon  '+levelWiseMeetingArr[i]+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+levelWiseMeetingArr[i]+'" href="#collapse'+levelWiseMeetingArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseMeetingArr[i]+'">';
							
								collapse+='<h4 class="card-title text-uppercase card-title-custom">'+levelWiseMeetingArr[i]+' Wise Details </h4>';
									
								collapse+='</a>';
							collapse+='</div>';
							/* if(i == 0)
							{
								collapse+='<div id="collapse'+levelWiseMeetingArr[i]+'" class="collapse show" role="tabpanel" aria-labelledby="heading'+levelWiseMeetingArr[i]+'">';
							}else{
								collapse+='<div id="collapse'+levelWiseMeetingArr[i]+'" class="collapse collapsedIn show" role="tabpanel" aria-labelledby="heading'+levelWiseMeetingArr[i]+'">';
							} */
							collapse+='<div id="collapse'+levelWiseMeetingArr[i]+'" class="collapse collapsedIn show" role="tabpanel" aria-labelledby="heading'+levelWiseMeetingArr[i]+'">';
							
								collapse+='<div class="card-body pad_5">';
									collapse+='<div id="meetingLevelWise'+levelWiseMeetingArr[i]+'"></div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
			collapse+='</div>';
			collapse+='</div>';
	}
	collapse+='</section>';
	$("#locationWiseMeetingOverAllDivId").html(collapse);
	for(var i in levelWiseMeetingArr){
		getLocationWiseAndMeetinStatusPartyMeetingDetails(levelWiseMeetingArr[i],meetingBlockValue);
	}
	
	
}

function getLocationWiseAndMeetinStatusPartyMeetingDetails(locationLevel,meetingBlockValue){
	 $("#meetingLevelWise"+locationLevel).html(spinner);
	 var json={  
		 "fromDateStr":tourCustomStartDate,
		 "toDateStr":tourCustomEndDate,
		 "stateId":"1",
		 "activityMemberId":"44",
		 "componentId":3,
		 "locationLevel":locationLevel,//Parliament,Constituency
		 "partyMeetingLevelIds":partyMeetingLevelIds

	};
	 $.ajax({
		url: "getLocationWiseBotMeetingAndAttendanceDetails",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				buildLocationWiseAndMeetinStatusPartyMeetingDetails(result,locationLevel,meetingBlockValue);
			}else{
				$("#meetingLevelWise"+locationLevel).html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
//swadhin
function buildLocationWiseAndMeetinStatusPartyMeetingDetails(result,locationLevel,meetingBlockValue){
	var str='';
	
	//str+='<div class="table_border_yash_pad">';
		str+='<div class="row">';
			str+='<div class="col">';
					str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="levelWiseDataTable'+locationLevel+'" style="width:100% !important">';
						str+='<thead>';
							str+='<tr>';
								str+='<th class="no-sort" rowspan="2"></th>';
								str+='<th colspan="2">ACTION BOTS FAILED</th>';
								str+='<th rowspan="2">VARIANCE</th>';
								str+='<th rowspan="2">Total Meetings</th>';
								str+='<th rowspan="2">CONDUCTED MEETINGS</th>';
								str+='<th rowspan="2">%</th>';
								str+='<th rowspan="2">VARIANCE</th>';
								
								if(meetingBlockValue !=4 && meetingBlockValue !=7){
									str+='<th rowspan="2">Total Invited</th>';
									str+='<th rowspan="2">Total Present Attended</th>';
									str+='<th rowspan="2">Total Past Attended</th>';
									str+='<th rowspan="2">VARIANCE</th>';
									str+='<th colspan="2">TAB Attended</th>';
									str+='<th rowspan="2">VARIANCE</th>';
								} 
								
								str+='<th rowspan="2">IMAGES</th>';
								//str+='<th rowspan="2">VARIANCE</th>';
								str+='<th rowspan="2">MOM POINTS</th>';
								str+='<th rowspan="2">VARIANCE</th>';
							str+='</tr>';
							str+='<tr>';
								str+='<th>Present</th>';
								str+='<th>Past</th>';
								if(meetingBlockValue !=4 && meetingBlockValue !=7){
									str+='<th>Present Attended</th>';    
									str+='<th>Past Attended</th>';
								} 
							str+='</tr>';
						str+='</thead>';
						
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td class="getLevelWiseMeetingDetailsCls" attr_click_type="locationWiseVariance" attr_location_id="'+result[i].id+'" attr_filter_Type="'+locationLevel+'" attr_name="'+result[i].name+' '+locationLevel+' VARIANCE Details" style="text-decoration:none;color:#098bea;">'+result[i].name+'</td>';
									str+='<td class="">'+emptyCheck(result[i].presentActionBoatsFailed)+'</td>';
									str+='<td class="">'+emptyCheck(result[i].pastActionBoatsFailed)+'</td>';
									str+='<td class="">';
										if(result[i].impact == "positive"){
											str+='<span class="color_green"> '+result[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
										}else{
											str+='<span class="color_red"> '+result[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
										}
									str+='</td>';
									if(result[i].total !=null && result[i].total>0){
										str+='<td class="getLevelWiseMeetingDetailsCls" attr_click_type="locationWiseConductedMeetings" attr_location_id="'+result[i].id+'" attr_filter_Type="'+locationLevel+'" attr_name="'+result[i].name+' '+locationLevel+' Conducted Meetings Details" attr_status="">'+emptyCheck(result[i].total)+'</td>';
									}else{
										str+='<td class=""> - </td>';
									}
									
									
									if(result[i].conducted !=null && result[i].conducted>0){
										if(locationLevel == "Parliament"){
											str+='<td class="" attr_click_type="locationWiseConductedMeetings" attr_location_id="'+result[i].id+'" attr_filter_Type="'+locationLevel+'" attr_name="'+result[i].name+' '+locationLevel+' Conducted Meetings Details">'+emptyCheck(result[i].conducted)+'</td>';
										}else{
											str+='<td class="getLevelWiseMeetingDetailsCls" attr_click_type="locationWiseConductedMeetings" attr_location_id="'+result[i].id+'" attr_filter_Type="'+locationLevel+'" attr_name="'+result[i].name+' '+locationLevel+' Conducted Meetings Details" attr_status="Y">'+emptyCheck(result[i].conducted)+'</td>';
										}
										
									}else{
										str+='<td class=""> - </td>';
									}
									
									str+='<td class="">'+emptyCheck(result[i].conductedPercentage)+'</td>';
									
									str+='<td class="">';
										if(result[i].conductedImpact == "positive"){
											str+='<span class="color_green"> '+result[i].conductedPerc.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
										}else{
											str+='<span class="color_red"> '+result[i].conductedPerc.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
										}
									str+='</td>';
									
									if(meetingBlockValue !=4 && meetingBlockValue !=7){
										str+='<td class="">'+emptyCheck(result[i].presentInviteesCount)+'</td>';//      
										str+='<td class="">'+emptyCheck(result[i].presentInviteeAttended)+'</td>';//      
										str+='<td class="">'+emptyCheck(result[i].pastInviteeAttended)+'</td>';//      
										
										str+='<td class="">';
											if(result[i].attendanceImpact == "positive"){
												str+='<span class="color_green"> '+result[i].attendanceVariance.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
											}else{
												str+='<span class="color_red"> '+result[i].attendanceVariance.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
											}
										str+='</td>';
										
										str+='<td class="">'+emptyCheck(result[i].presentTabInviteeAttended)+'</td>';//  
										str+='<td class="">'+emptyCheck(result[i].pastTabInviteeAttended)+'</td>';//  
										str+='<td class="">';
											if(result[i].tabAttendanceImpact == "positive"){
												str+='<span class="color_green"> '+result[i].tabAttendanceVariance.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
											}else{
												str+='<span class="color_red"> '+result[i].tabAttendanceVariance.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
											}
										str+='</td>';
										
									} 
									if(result[i].presentImageCount !=null && result[i].presentImageCount>0){
										str+='<td class=""><span class="getLevelWiseMeetingDetailsCls" attr_click_type="imageClick" attr_location_id="'+result[i].id+'" attr_filter_Type="'+locationLevel+'" attr_name="'+result[i].name+' '+locationLevel+' Image Details" >'+emptyCheck(result[i].presentImageCount)+'</span></span></td>';
									}else{
										str+='<td class=""> - </td>';
									}
									
									
									/* str+='<td class="">';
										if(result[i].imageCountImpact == "positive"){
											str+='<span class="color_green"> '+result[i].imageCountPerc.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
										}else{
											str+='<span class="color_red"> '+result[i].imageCountPerc.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
										}
									str+='</td>'; */
									
									if(result[i].presentMomCount !=null && result[i].presentMomCount>0){
										str+='<td class="getLevelWiseMeetingDetailsCls" attr_click_type="locationWiseMOMPoints" attr_location_id="'+result[i].id+'" attr_filter_Type="'+locationLevel+'" attr_name="'+result[i].name+' '+locationLevel+' MOM POINTS Details">'+emptyCheck(result[i].presentMomCount)+'</td>';
									}else{
										str+='<td class=""> - </td>';
									}
									
									str+='<td class="">';
										if(result[i].momCountImpact == "positive"){
											str+='<span class="color_green"> '+result[i].momCountPerc.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
										}else{
											str+='<span class="color_red"> '+result[i].momCountPerc.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
										}
									str+='</td>';
								str+='</tr>';
							}
						str+='</tbody>';
					str+='</table>';
					str+='</div>';	
				
			str+='</div>';	
		str+='</div>';	
	//str+='</div>';	
	$("#meetingLevelWise"+locationLevel).html(str);
	
	if(locationLevel != "District") {
		initializeDataTableWithPagination("levelWiseDataTable"+locationLevel)
	}else{
		initializeDataTableWithOutPagination("levelWiseDataTable"+locationLevel)
	}
	$("#levelWiseDataTable"+locationLevel).tableHeadFixer({"head" : false, "left" : 1}); 
	
				
}
function getMeetingVarianceReport(divId,filter_TypeVal,locationId,buildType,meetingBlockValue){
	
	$("#"+divId).html(spinner);
	var locationScopeVal="";
	
	if(filter_TypeVal == ""){
		locationScopeVal="";
	}else if(filter_TypeVal == "District"){
		locationScopeVal=3;
	}else if(filter_TypeVal == "Parliament"){
		locationScopeVal=4;
	}else{
		locationScopeVal=5;
	}
	if(buildType == "onload"){
		var json={  
			 "activityMemberId":44,
			 "stateId":1,
			 "fromDateStr":"",
			 "toDateStr":"",
			 "partyMeetingLevelIds":partyMeetingLevelIds,
			 "locationScopeId":locationScopeVal,//3,4,5
			 "locationId":locationId
			 
		};
		}else{
			var json={  
			 "activityMemberId":44,
			 "stateId":1,
			 "fromDateStr":"",
			 "toDateStr":"",
			 "partyMeetingLevelIds":partyMeetingLevelIds,
			 "locationScopeId":locationScopeVal,//3,4,5
			 "locationId":locationId
			 
		};
	}
	
	 $.ajax({
		url: "getMeetingVarianceReport",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.subList !=null && result.subList.length>0){
				buildMeetingVarianceReport(result,divId,meetingBlockValue);
			}else{
				$("#"+divId).html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
//123
function buildMeetingVarianceReport(result,divId,meetingBlockValue){
	var str='';
		str+='<div class="table-responsive">';
		str+='<table class="table table_custom_meeting" id="variationMeetingDataTableId'+divId+'">';
			str+='<thead>';
				str+='<tr>';
					str+='<th class="no-sort" rowspan="2"></th>';
					str+='<th colspan="2">ACTION BOTS FAILED</th>';
					str+='<th rowspan="2">VARIANCE</th>';
					str+='<th rowspan="2">Total Meetings</th>';
					str+='<th rowspan="2">CONDUCTED MEETINGS</th>';
					str+='<th rowspan="2">%</th>';
					str+='<th rowspan="2">VARIANCE</th>';
					
					if(meetingBlockValue !=4 && meetingBlockValue !=7){
						str+='<th rowspan="2">Total Invited</th>';
						str+='<th rowspan="2">Total Present Attended</th>';
						str+='<th rowspan="2">Total Past Attended</th>';
						str+='<th rowspan="2">VARIANCE</th>';
						str+='<th colspan="2">TAB Attended</th>';
						str+='<th rowspan="2">VARIANCE</th>';
					}
					
					str+='<th rowspan="2">IMAGES</th>';
					//str+='<th rowspan="2">VARIANCE</th>';     
					str+='<th rowspan="2">MOM POINTS</th>';
					str+='<th rowspan="2">VARIANCE</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>Present</th>';
					str+='<th>Past</th>';
					if(meetingBlockValue !=4 && meetingBlockValue !=7){
						str+='<th>Present Attended</th>';    
						str+='<th>Past Attended</th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			if(result.subList !=null && result.subList.length>0){
				for(var i in result.subList){
					str+='<tr>';
						str+='<td>'+result.subList[i].name+'</td>';
						str+='<td class="">'+emptyCheck(result.subList[i].presentActionBoatsFailed)+'</td>';
						str+='<td class="">'+emptyCheck(result.subList[i].pastActionBoatsFailed)+'</td>';
						str+='<td class="">';
							if(result.subList[i].actionBoatsImpact == "positive"){
								str+='<span class="color_green"> '+result.subList[i].actionBoatsPercentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
							}else{
								str+='<span class="color_red"> '+result.subList[i].actionBoatsPercentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
							}
						str+='</td>';
						str+='<td class="">'+emptyCheck(result.subList[i].presentTotal)+'</td>';
						str+='<td class="">'+emptyCheck(result.subList[i].presentConducted)+'</td>';
						str+='<td class="">'+emptyCheck(result.subList[i].presentPercentage)+'</td>';
						str+='<td class="">';
							if(result.subList[i].impact == "positive"){
								str+='<span class="color_green"> '+result.subList[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
							}else{
								str+='<span class="color_red"> '+result.subList[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
							}
						str+='</td>';
						
						if(meetingBlockValue !=4 && meetingBlockValue !=7){
							str+='<td class="">'+emptyCheck(result.subList[i].presentInviteesCount)+'</td>';//      
							str+='<td class="">'+emptyCheck(result.subList[i].presentInviteeAttended)+'</td>';//      
							str+='<td class="">'+emptyCheck(result.subList[i].pastInviteeAttended)+'</td>';//      
							
							str+='<td class="">';
								if(result.subList[i].attendanceImpact == "positive"){
									str+='<span class="color_green"> '+result.subList[i].attendanceVariance.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
								}else{
									str+='<span class="color_red"> '+result.subList[i].attendanceVariance.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
								}
							str+='</td>';            
							
							str+='<td class="">'+emptyCheck(result.subList[i].presentTabInviteeAttended)+'</td>';//  
							str+='<td class="">'+emptyCheck(result.subList[i].pastTabInviteeAttended)+'</td>';//  
							str+='<td class="">';
								if(result.subList[i].tabAttendanceImpact == "positive"){
									str+='<span class="color_green"> '+result.subList[i].tabAttendanceVariance.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
								}else{
									str+='<span class="color_red"> '+result.subList[i].tabAttendanceVariance.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
								}
							str+='</td>';
							
						}
						str+='<td class="">'+emptyCheck(result.subList[i].presentImageCount)+'</td>';
						
						/* str+='<td class="">';
							if(result.subList[i].imageCountImpact == "positive"){
								str+='<span class="color_green"> '+result.subList[i].imageCountPerc.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
							}else{
								str+='<span class="color_red"> '+result.subList[i].imageCountPerc.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
							}
						str+='</td>'; */
						
						str+='<td class="">'+emptyCheck(result.subList[i].presentMomCount)+'</td>';
						str+='<td class="">';
							if(result.subList[i].momCountImpact == "positive"){
								str+='<span class="color_green"> '+result.subList[i].momCountPerc.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
							}else{
								str+='<span class="color_red"> '+result.subList[i].momCountPerc.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
							}
						str+='</td>';
					str+='</tr>';
				}
			}else{
				str+='<tr>';
					str+='<td colspan="12" class="text-center">No Data Available</td>';
				str+='</tr>';
			}
				
			str+='</tbody>';
			
		str+='</table>';
		str+='</div>';	
				
			
	$("#"+divId).html(str);
	
	initializeDataTableWithOutPagination("variationMeetingDataTableId"+divId)
	$("#variationMeetingDataTableId"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
	
}
 function getPartyMeetingInvitesNonInvitesDetails(meetingBlockValue){
	
	$("#meetingAttendanceDetailsDivId").html(spinner);
	
	 var json={
		"activityMemberId":"44",	
		 "stateId":"1",
		 "fromDateStr":tourCustomStartDate,
	     "toDateStr":tourCustomEndDate,
		 "partyMeetingLevelIds":partyMeetingLevelIds,
		 "partyMeetingMainTypeId":1
	 };
	  $.ajax({
		 url: "getPartyMeetingInvitesNonInvitesDetails",
		 data: JSON.stringify(json),
		 type: "POST",
		 dataType: 'json', 
		 beforeSend: function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },
		 success: function(result) {
			if(result !=null){
				buildPartyMeetingInvitesNonInvitesDetails(result,meetingBlockValue);
			}else{
				$("#meetingAttendanceDetailsDivId").html('');
			}
		 },
		failure: function(xhr) {
			return xhr;
		 }
	 });
 }

 function buildPartyMeetingInvitesNonInvitesDetails(result,meetingBlockValue){
	 var modalBlock='';
	 modalBlock+='<div class="new_border_yash_pad">';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="mainBlockUl">';
					modalBlock+='<ul class="list-inline blocksLi">';
							modalBlock+='<li>';
								modalBlock+='<h6 class="">Invited</h6>';
								if(result.invited !=null && result.invited>0){
									modalBlock+='<h5 class="font_weight m_top10">'+result.invited+'</h5>';
								}else{
									modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
								}
								
							modalBlock+='</li>';
							modalBlock+='<li>';
								modalBlock+='<h6 class="">Invitee Attended</h6>';
								if(result.inviteeAttendedPercentage !=null && result.inviteeAttendedPercentage>0){
									modalBlock+='<h5 class="font_weight m_top10"><span class="getLevelWiseMeetingDetailsCls" attr_click_type="attendanceClick" attr_filter_Type="present" attr_name="" attr_meeting_block_val="'+meetingBlockValue+'" style="text-decoration:underline;">'+result.inviteeAttended+'</span> <small class="color_green">'+result.inviteeAttendedPercentage+' %</small></h5>';
								}else{
									modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
								}
								
							modalBlock+='</li>';
							modalBlock+='<li>';
								modalBlock+='<h6 class="">Invitee Absent</h6>';
								if(result.abscentPercentage !=null && result.abscentPercentage>0){
									modalBlock+='<h5 class="font_weight m_top10"><span class="getLevelWiseMeetingDetailsCls" attr_click_type="attendanceClick" attr_filter_Type="absent" attr_name="" attr_meeting_block_val="'+meetingBlockValue+'" style="text-decoration:underline;">'+result.absent+'</span>  <small class="color_green">'+result.abscentPercentage+' %</small></h5>';
								}else{
									modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
								}
								
							modalBlock+='</li>';
							modalBlock+='<li>';
								modalBlock+='<h6 class="">Non-Invitee Attended</h6>';
								if(result.nonInviteeAttendedPercentage !=null && result.nonInviteeAttendedPercentage>0){
									modalBlock+='<h5 class="font_weight m_top10">'+result.nonInvitee+'  <small class="color_green">'+result.nonInviteeAttendedPercentage+' %</small></h5>';
								}else{
									modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
								}
								
							modalBlock+='</li>';
							modalBlock+='<li>';
								modalBlock+='<h6 class="">Images</h6>';
								if(result.imagesCovered !=null && result.imagesCovered>0){
									modalBlock+='<h5 class="font_weight m_top10"><span class="getLevelWiseMeetingDetailsCls" attr_click_type="imageClick" attr_location_id="" attr_filter_Type="" attr_name="Image Details" attr_meeting_block_val="'+meetingBlockValue+'" style="text-decoration:underline;">'+result.imagesCovered+'</span></h5>';
								}else{
									modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
								}
								
							modalBlock+='</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12 pad_left_right_23 m_top10">';
				modalBlock+='<div class="bg_yash_padding">';
					 modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-6">';
							modalBlock+='<div class="bg_white_css">';
								modalBlock+='<div class="row">';
										modalBlock+='<div class="col-sm-6">';
											modalBlock+='<div style="background-color:#fff;border:none;">';
												modalBlock+='<h6 class="m_bottom_0 font_weight">TAB</h6>';
													modalBlock+='<div class="row">';
														modalBlock+='<div class="col-sm-6 m_top5">';
															modalBlock+='<h6 class="m_bottom_0">Meetings</h6>';
															if(result.tabAttendanceMeetings !=null && result.tabAttendanceMeetings>0){
																modalBlock+='<h5 class="font_weight"><span class="getLevelWiseMeetingDetailsCls" attr_click_type="tabManualMomUpNUp" attr_filter_Type="TabAttendedMeetings" attr_name="TAB Attendance Meeting Details" attr_meeting_block_val="'+meetingBlockValue+'">'+result.tabAttendanceMeetings+'</span> <small class="font_weight color_green">'+result.tabAttendanceMeetingPerc+' %</small> </h5>';
															}else{
																modalBlock+='<h5 class="font_weight"> - </h5>';
															}
															
														modalBlock+='</div>';
														modalBlock+='<div class="col-sm-6 m_top5">';
															modalBlock+='<h6 class="m_bottom_0">Memberes</h6>';
															modalBlock+='<h5 class="font_weight">'+emptyCheck(result.tabAttendedMember)+'</h5>';
														modalBlock+='</div>';
													modalBlock+='</div>';
												
											modalBlock+='</div>';
										modalBlock+='</div>';
										
										modalBlock+='<div class="col-sm-3">';
											modalBlock+='<div class="bg_yash_padding">';
												modalBlock+='<h6 class="m_bottom_0">Invitees Attended</h6>';
												modalBlock+='<h5 class="font_weight m_top10 m_bottom_0">'+emptyCheck(result.tabAttendedMemberInvites)+'</h5>';
											modalBlock+='</div>';
										modalBlock+='</div>';
										
										modalBlock+='<div class="col-sm-3">';
											modalBlock+='<div class="bg_yash_padding">';
												modalBlock+='<h6 class="m_bottom_0">Non Invitees Attended</h6>';
												modalBlock+='<h5 class="font_weight m_top10 m_bottom_0">'+emptyCheck(result.tabAttendedMemberNonInvites)+'</h5>';
											modalBlock+='</div>';
										modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
						
							modalBlock+='<div class="col-sm-6">';
							modalBlock+='<div class="bg_white_css">';
								modalBlock+='<div class="row">';
										modalBlock+='<div class="col-sm-6">';
											modalBlock+='<div style="background-color:#fff;border:none;">';
												modalBlock+='<h6 class="m_bottom_0 font_weight">MANUAL</h6>';
												modalBlock+='<div class="row">';
														modalBlock+='<div class="col-sm-6 m_top5">';
															modalBlock+='<h6 class="m_bottom_0">Meetings</h6>';
															if(result.manualAttendanceMeetings !=null && result.manualAttendanceMeetings>0){
																modalBlock+='<h5 class="font_weight"><span class="getLevelWiseMeetingDetailsCls" attr_click_type="tabManualMomUpNUp" attr_name="Manual Attendance Meeting Details" attr_filter_Type="ManualAttendedMeetings" attr_meeting_block_val="'+meetingBlockValue+'">'+result.manualAttendanceMeetings+' </span> <small class="font_weight color_green">'+result.manAttendanceMeetingPerc+' %</small></h5>';
															}else{
																modalBlock+='<h5 class="font_weight"> - </h5>';
															}
															
														modalBlock+='</div>';
														modalBlock+='<div class="col-sm-6 m_top5">';
															modalBlock+='<h6 class="m_bottom_0">Memberes</h6>';
															modalBlock+='<h5 class="font_weight">'+emptyCheck(result.manualAttendedMembers)+'</h5>';
														modalBlock+='</div>';
													modalBlock+='</div>';
											modalBlock+='</div>';
										modalBlock+='</div>';
										modalBlock+='<div class="col-sm-3">';
											modalBlock+='<div class="bg_yash_padding">';
												modalBlock+='<h6 class="m_bottom_0">Invitees Attended</h6>';
												modalBlock+='<h5 class="font_weight m_top10 m_bottom_0">'+emptyCheck(result.manualAttendedMembersInvites)+'</h5>';
											modalBlock+='</div>';
										modalBlock+='</div>';
										modalBlock+='<div class="col-sm-3">';
											modalBlock+='<div class="bg_yash_padding">';
												modalBlock+='<h6 class="m_bottom_0">Non Invitees Attended</h6>';
												modalBlock+='<h5 class="font_weight m_top10 m_bottom_0">'+emptyCheck(result.manualAttendedMembersNonInvites)+'</h5>';
											modalBlock+='</div>';
										modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
	modalBlock+='</div>';
	$("#meetingAttendanceDetailsDivId").html(modalBlock);
 }
 
 function getruleWiseActionBotsOverviewMeetings(){
	
	$("#actiobalMeetingsBlockDivId").html(spinner);
	
	 var json={
		 "activityMemberId":"44",	
		 "stateId":"1",
		 "fromDateStr":tourCustomStartDate,
	     "toDateStr":tourCustomEndDate,
		 "partyMeetingLevelIds":partyMeetingLevelIds,
		 "moduleType":"MEETING"
	 };
	  $.ajax({
		 url: "ruleWiseActionBotsOverview",
		 data: JSON.stringify(json),
		 type: "POST",
		 dataType: 'json', 
		 beforeSend: function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },
		 success: function(result) {
			 if(result !=null && result.length>0){
				 buildruleWiseActionBotsOverviewMeetings(result);
			 }else{
				 $("#actiobalMeetingsBlockDivId").html('');
			 }
			
		 },
		failure: function(xhr) {
			return xhr;
		 }
	 });
 }
 
 function buildruleWiseActionBotsOverviewMeetings(result){
	
	 var modalBlock='';
	 
	 modalBlock+='<div class="row">';
		modalBlock+='<div class="col m_top20">';
				modalBlock+='<img src="Core/images/logo-ActionBots.png" class="img-responsive" alt="actionBots" style="width: 200px;height: auto;"/>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	 
	 modalBlock+='<div class="card">';
	   modalBlock+='<div class="card-header">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12">';
					modalBlock+='<div class="mainBlockUl">';
						modalBlock+='<ul class="list-inline blocksBgWhiteLi">';
							modalBlock+='<li><img src="Core/images/Party Meetings.png" class="img-responsive" alt="actionBots" style="width: 50px;height: auto;"/> Party Meetings</li>';
							modalBlock+='<li>Total Bots : <span class="h5_font font_weight">'+emptyCheck(result[0].ruleIdCount)+'</span></li>';
							modalBlock+='<li>Executed Bots : <span class="h5_font font_weight">'+emptyCheck(result[0].executedBots)+'</span></li>';
							modalBlock+='<li>Success : <span class="h5_font font_weight color_green">'+emptyCheck(result[0].success)+' (<small>'+result[0].successPercentage+' %</small>)</span></li>';
							modalBlock+='<li>Failure : <span class="h5_font font_weight color_red">'+emptyCheck(result[0].fail)+' (<small>'+result[0].failPercentage+' %</small>)</span></li>';
						modalBlock+='</ul>';
					 modalBlock+='</div>';
				 modalBlock+='</div>';
			 modalBlock+='</div>';		
	   modalBlock+='</div>';
	   modalBlock+='<div class="card-body pad_10">';
			
			modalBlock+='<div class="table-responsive">';
			modalBlock+='<table class="table table_custom_meeting table_custom_alternative_color" id="partyMeetingDataTableId">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="2"></th>';
						modalBlock+='<th colspan="2">Fail Bots</th>';
						modalBlock+='<th rowspan="2">VARIANCE</th>';
						modalBlock+='<th colspan="3">Alerts</th>';
					modalBlock+='</tr>';
					
					modalBlock+='<tr>';
						modalBlock+='<th>Present</th>';
						modalBlock+='<th>Past</th>';
						modalBlock+='<th>Open</th>';
						modalBlock+='<th>Closed</th>';
						modalBlock+='<th>Total</th>';
					modalBlock+='</tr>';
					
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
					for(var i in result){
						modalBlock+='<tr>';
							modalBlock+='<td class="">'+result[i].name+'</td>';
							modalBlock+='<td class="">'+emptyCheck(result[i].presentConducted)+'</td>';
							modalBlock+='<td class="">'+emptyCheck(result[i].futureConducted)+'</td>';
							modalBlock+='<td class="">';
								if(result[i].impact == "positive"){
									modalBlock+='<span class="color_green"> '+result[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
								}else{
									modalBlock+='<span class="color_red"> '+result[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
								}
							modalBlock+='</td>';
							modalBlock+='<td class="">'+emptyCheck(result[i].open)+'</td>';
							modalBlock+='<td class="">'+emptyCheck(result[i].close)+'</td>';
							modalBlock+='<td class="">'+emptyCheck(result[i].total)+'</td>';
						modalBlock+='</tr>';
					}
				modalBlock+='</tbody>';
				
			modalBlock+='</table>';
			 modalBlock+='</div>';
	   modalBlock+='</div>';
	modalBlock+='</div>';
	
	$("#actiobalMeetingsBlockDivId").html(modalBlock);
	initializeDataTableWithOutPagination("partyMeetingDataTableId")
	$("#partyMeetingDataTableId").tableHeadFixer({"head" : false, "left" : 1}); 
 }
$(document).on("click",".getLevelWiseMeetingDetailsCls",function(){
	$("#meetingWiseAttendanceDtsDivId").html('');
	var click_type_val = $(this).attr("attr_click_type");
	var filter_Type = $(this).attr("attr_filter_Type");
	var name = $(this).attr("attr_name");
	var locationId = $(this).attr("attr_location_id");
	var locStatus = $(this).attr("attr_status");
	var meeting_block_val = $(this).attr("attr_meeting_block_val");
	
	$("#meetingTypeModalDivId").modal("show");
	
	if(click_type_val == "MeetingWithAttendance"){
		$("#meetingTypeHeadingId").html("Meeting With Attendance DETAILS")
		getPartyMeetingWithAttendanceDetailsByClick(filter_Type)
	}else if(click_type_val == "attendanceClick"){
		if(filter_Type == "present"){
			$("#meetingTypeHeadingId").html("Invitee Attended DETAILS")
		}else{
			$("#meetingTypeHeadingId").html("Absent DETAILS")
		}
		getPartyMeetingInvitesNonInvitesClickDetails(filter_Type,"onload",0,"");
	}else if(click_type_val == "imageClick"){
		$("#meetingTypeHeadingId").html(name)
		getPartyMeetingImageDetailsByClick(filter_Type,locationId,meeting_block_val);
	}else if(click_type_val == "tabManualMomUpNUp"){
		$("#meetingTypeHeadingId").html(name);
		getPartyMeetingDetailsForMomClick(filter_Type,meeting_block_val);
	}else if(click_type_val =="locationWiseConductedMeetings"){
		$("#meetingTypeHeadingId").html(name);
		getConductedPartyMeetingDetailsByClick(filter_Type,locationId,locStatus);
	}else if(click_type_val == "momClick"){
		$("#meetingTypeHeadingId").html(name);
		getTotalMomDetailsByClick(filter_Type,meeting_block_val);
	}else if(click_type_val == "locationWiseMOMPoints"){
		$("#meetingTypeHeadingId").html(name);
		buildTotalMomDetailsByClickMOMPoints(filter_Type,locationId,"");
	}else if(click_type_val =="locationWiseVariance"){
		$("#meetingTypeHeadingId").html(name);
		getMeetingVarianceReport("meetingWiseWiseModalDivId",filter_Type,locationId,"change",meeting_block_val)
	}else if(click_type_val == "MeetingWithOutAttendance"){
		$("#meetingTypeHeadingId").html(name);
		getMeetingWithOutAttendanceDetails();
	}
});

$(document).on("click",".closeSecondModal",function(){
	setTimeout(function(){
		$("body").addClass("modal-open")
	},1000);
});

function emptyCheck(filedValue){
	var returnVal = ' - ';
	if( filedValue !=null && filedValue > 0){
		returnVal = filedValue;
	}
	return returnVal;
}
function getPartyMeetingWithAttendanceDetailsByClick(click_type_val){
	$("#meetingWiseWiseModalDivId").html(spinner);
	var json={
		"activityMemberId":"44",
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":"1",
		"toDateStr":tourCustomEndDate,
		"filterType":click_type_val //Meeting With Attendance
		
	};
	 $.ajax({
		url: "getPartyMeetingWithAttendanceDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				buildgetPartyMeetingWithAttendanceDetails(result);
			}else{
				$("#meetingWiseWiseModalDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildgetPartyMeetingWithAttendanceDetails(result){
	
	var str='';
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="meetingWiseWiseDataTable" style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Meeting Name</th>';
								str+='<th>Meeting Level</th>';
								str+='<th>Total Invitee</th>';
								str+='<th>Total Invitee Attended</th>';
								str+='<th>Total Invitee Absent</th>';
							str+='</tr>';
						str+='</thead>';
						
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td>'+result[i].meetingName+'</td>';
									str+='<td>'+result[i].meetingLevel+'</td>';
									if(result[i].inviteesCount !=null && result[i].inviteesCount>0){
										str+='<td class="inviteeAndInviteeAttendedDtsCls" attr_click_type="meetingWithAttendance" attr_level_type="InviteeDetails" attr_meeting_id="'+result[i].id+'" attr_name="'+result[i].meetingName+'">'+result[i].inviteesCount+'</td>';
									}else{
										str+='<td class=""> - </td>';
									}
									if(result[i].inviteeAttendedCount !=null && result[i].inviteeAttendedCount>0){
										str+='<td class="inviteeAndInviteeAttendedDtsCls" attr_click_type="meetingWithAttendance" attr_level_type="InviteeAttendedDetails" attr_meeting_id="'+result[i].id+'" attr_name="'+result[i].meetingName+'">'+result[i].inviteeAttendedCount+'</td>';
									}else{
										str+='<td class=""> - </td>';
									}
									if(result[i].absentCount !=null && result[i].absentCount>0){
										str+='<td class="inviteeAndInviteeAttendedDtsCls" attr_click_type="meetingWithAttendance" attr_level_type="AbsentDetails" attr_meeting_id="'+result[i].id+'" attr_name="'+result[i].meetingName+'">'+result[i].absentCount+'</td>';
									}else{
										str+='<td class=""> - </td>';
									}
									
								str+='</tr>';
							}
						str+='</tbody>';
					str+='</table>';
					str+='</div>';
				
			str+='</div>';	
		str+='</div>';	
		str+='<div class="scrollTopDivId"></div>';
	$("#meetingWiseWiseModalDivId").html(str);
	
	initializeDataTableWithOutPagination("partyMeetingDataTableId")
	$("#meetingWiseWiseDataTable").tableHeadFixer({"head" : false, "left" : 1}); 	
}

$(document).on("click",".inviteeAndInviteeAttendedDtsCls",function(){
	
	var level_type = $(this).attr("attr_level_type");
	var meeting_id = $(this).attr("attr_meeting_id");
	var click_type = $(this).attr("attr_click_type");
	var name = $(this).attr("attr_name");
	$(".modalScroll").animate({
			scrollTop: $(".scrollTopDivId").offset().top},
	'slow');
	
	if(click_type == "meetingWithAttendance"){
		getPartyMeetingWithAttendanceDetailsByMeetingId(level_type,meeting_id,name);
	}else{
		getPartyMeetingInvitesNonInvitesClickDetails(level_type,"change",meeting_id,name);
	}
	
	
	
});

function getPartyMeetingWithAttendanceDetailsByMeetingId(level_type,meeting_id,name){
	$("#meetingWiseAttendanceDtsDivId").html(spinner);
	var json={
		"activityMemberId":"44",
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":"1",
		"toDateStr":tourCustomEndDate,
		"filterType":level_type,
		"id":meeting_id
		
	};
	 $.ajax({
		url: "getPartyMeetingWithAttendanceDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				buildPartyMeetingWithAttendanceDetailsByMeetingId(result,name);
			}else{
				$("#meetingWiseAttendanceDtsDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildPartyMeetingWithAttendanceDetailsByMeetingId(result,name){
	var str='';
	
	str+='<div class="row">';
		str+='<div class="col m_top20">';
			str+='<h6 class="text-uppercase font_weight">'+name+'</h6>';
		str+='</div>';
	str+='</div>';
	
	str+='<div class="row">';
		str+='<div class="col m_top10">';
			
			str+='<div class="table-responsive">';
				str+='<table class="table table_custom_meeting" id="meetingWiseAttendanceDataTable" style="width:100%">';
					str+='<thead>';
						str+='<tr>';
							str+='<th>Candidate Name</th>';
							str+='<th>Designation</th>';
							str+='<th>Mobile No</th>';
							str+='<th>meeting Level</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						for(var i in result){
							str+='<tr>';
								str+='<td>'+result[i].name+'</td>';
								str+='<td style="text-align:left !important;">'+result[i].role+'</td>';
								str+='<td>'+result[i].mobileNumber+'</td>';
								str+='<td>'+result[i].meetingLevel+'</td>';
							str+='</tr>';
						}
					str+='</tbody>';
				str+='</table>';
				str+='</div>';	
			
		str+='</div>';	
	str+='</div>';	
	
	$("#meetingWiseAttendanceDtsDivId").html(str);
	initializeDataTableWithPagination("meetingWiseAttendanceDataTable")
	$("#meetingWiseAttendanceDataTable").tableHeadFixer({"head" : false, "left" : 1}); 
}

function getPartyMeetingInvitesNonInvitesClickDetails(click_type_val,buildType,cadreId,name){
	
	if(buildType == "onload"){
		$("#meetingWiseWiseModalDivId").html(spinner);
		var json={
			"activityMemberId":"44",
			"fromDateStr":tourCustomStartDate,
			"partyMeetingLevelIds":partyMeetingLevelIds,
			"partyMeetingMainTypeId":1,
			"stateId":"1",
			"toDateStr":tourCustomEndDate,
			"filterType":click_type_val
		};
	}else{
		$("#meetingWiseAttendanceDtsDivId").html(spinner);
		var json={
			"activityMemberId":"44",
			"fromDateStr":tourCustomStartDate,
			"partyMeetingLevelIds":partyMeetingLevelIds,
			"partyMeetingMainTypeId":1,
			"stateId":"1",
			"toDateStr":tourCustomEndDate,
			"filterType":click_type_val,
			"cadreId":cadreId
		};
	}
	
	 $.ajax({
		url: "getPartyMeetingInvitesNonInvitesClickDetails",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			console.log(result)
			if(result !=null && result.length>0){
				if(buildType == "onload"){
					buildPartyMeetingInvitesNonInvitesClickDetails(result,click_type_val);
				}else{
					buildPartyMeetingSubLevelInvitesNonInvitesClickDetails(result,name);
				}
				
			}else{
				if(buildType == "onload"){
					$("#meetingWiseWiseModalDivId").html("No Data Available");
				}else{
					$("#meetingWiseAttendanceDtsDivId").html("No Data Available");
				}
				
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildPartyMeetingInvitesNonInvitesClickDetails(result,click_type_val){
	var str='';
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="meetingWiseWiseDataTable2" style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Candidate Name</th>';
								str+='<th>Mobile No</th>';
								str+='<th>No of Meetings Invited</th>';
								if(click_type_val == "absent"){
									str+='<th>No of Meetings Absent</th>';
								}else{
									str+='<th>No of Meetings Attended</th>';
								}
								
							str+='</tr>';
						str+='</thead>';
						
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td>'+result[i].name+'</td>';
									str+='<td>'+result[i].mobileNumber+'</td>';
									if(result[i].inviteesCount !=null && result[i].inviteesCount>0){
										str+='<td class="inviteeAndInviteeAttendedDtsCls" attr_click_type="attendanceSubClick" attr_level_type="presentInvited" attr_meeting_id="'+result[i].id+'" attr_name="Invitee Attended Meeting Details">'+result[i].inviteesCount+'</td>';
									}else{
										str+='<td> - </td>';
									}
									if(click_type_val == "absent"){
										if(result[i].absentCount !=null && result[i].absentCount>0){
											str+='<td class="inviteeAndInviteeAttendedDtsCls" attr_click_type="attendanceSubClick" attr_level_type="AbsentInvitees" attr_meeting_id="'+result[i].id+'" attr_name="Absent Meeting Details">'+result[i].absentCount	+'</td>';
										}else{
											str+='<td> - </td>';
										}
									}else{
										if(result[i].inviteeAttendedCount !=null && result[i].inviteeAttendedCount>0){
											str+='<td class="inviteeAndInviteeAttendedDtsCls" attr_click_type="attendanceSubClick" attr_level_type="presentInvitedAttended" attr_meeting_id="'+result[i].id+'" attr_name="Attended Meeting Details">'+result[i].inviteeAttendedCount+'</td>';
										}else{
											str+='<td> - </td>';
										}
									}
									
									
								str+='</tr>';
							}
						str+='</tbody>';
					str+='</table>';
					str+='</div>';	
				
			str+='</div>';	
		str+='</div>';	
		str+='<div class="scrollTopDivId"></div>';
	$("#meetingWiseWiseModalDivId").html(str);
	initializeDataTableWithPagination("meetingWiseWiseDataTable2");
	$("#meetingWiseWiseDataTable2").tableHeadFixer({"head" : false, "left" : 1}); 
}

function getPartyMeetingImageDetailsByClick(filter_Type,locationId,meeting_block_val){
	$("#meetingWiseWiseModalDivId").html(spinner);
	
	var locationLevel='';
	if(filter_Type == "District"){
		locationLevel = "DISTRICT";
	}else if(filter_Type == "Parliament"){
		locationLevel = "PARLIAMENTCONSTITUENCY";
	}else if(filter_Type == "Constituency"){
		locationLevel = "CONSTITUENCY";
	}else{
		locationLevel='';
	}
	
	var json={
		"activityMemberId":44,
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":1,
		"toDateStr":tourCustomEndDate,
		"locationLevel":locationLevel,
		"locationValue":locationId
		
	};
	 $.ajax({
		url: "getPartyMeetingImageDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			console.log(result)
			if(result !=null && result.length>0){
				buildPartyMeetingImageDetailsByClick(result,"imagesClick",meeting_block_val);
			}else{
				$("#meetingWiseWiseModalDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildPartyMeetingImageDetailsByClick(result,buildType,meeting_block_val){
	var str='';
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="meetingWiseWiseDataTable3" style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Meeting Name</th>';
								str+='<th>Meeting Level</th>';
								str+='<th>Conducted Date</th>';
								if(meeting_block_val == 2){
									str+='<th>District</th>';
								}else if(meeting_block_val == 3){
									str+='<th>District</th>';
									str+='<th>Constituency</th>';
								}else if(meeting_block_val == 4){
									str+='<th>District</th>';
									str+='<th>Constituency</th>';
									str+='<th>Mandal</th>';
								}else if(meeting_block_val == 7){
									str+='<th>District</th>';
									str+='<th>Constituency</th>';
									str+='<th>Mandal</th>';
									str+='<th>VILLAGE</th>';
								}
								if(buildType != "imagesClick"){
									str+='<th>Mom Points</th>';
								}
								
								str+='<th>Images</th>';
							str+='</tr>';
						str+='</thead>';
						
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td>'+result[i].meetingName+'</td>';
									str+='<td>'+result[i].meetingLevel+'</td>';
									str+='<td>'+result[i].conductedDate+'</td>';
									if(meeting_block_val == 2){
										str+='<td>'+result[i].districtName+'</td>';
									}else if(meeting_block_val == 3){
										str+='<td>'+result[i].districtName+'</td>';
										str+='<td>'+result[i].constituencyName+'</td>';
									}else if(meeting_block_val == 4){
										str+='<td>'+result[i].districtName+'</td>';
										str+='<td>'+result[i].constituencyName+'</td>';
										str+='<td>'+result[i].tehsilName+'</td>';
									}else if(meeting_block_val == 7){
										str+='<td>'+result[i].districtName+'</td>';
										str+='<td>'+result[i].constituencyName+'</td>';
										str+='<td>'+result[i].tehsilName+'</td>';
										str+='<td>'+result[i].panchayatName+'</td>';
									}
									if(buildType != "imagesClick"){
										if(result[i].momCount !=null && result[i].momCount>0){
											str+='<td>'+result[i].momCount+'</td>';
										}else{
											str+='<td> - </td>';
										}
									}
									
									str+='<td style="text-align:left !important;">';
										str+='<div class="row">';
											str+='<div class="col-sm-12">';
												str+='<ul class="list-inline modalImagesUl">';
													if(result[i].paths !=null && result[i].paths.length>0){
														for(var j in result[i].paths){
															//if($.trim($('img').attr("onerror",'https://www.mytdp.com/party_meetings/'+result[i].paths[j]+'')) != ""){
																str+='<li>';
																	str+='<a class="fancybox-button" rel="fancybox-button" href="https://www.mytdp.com/party_meetings/'+result[i].paths[j]+'" title="Party Meeting Images">';
																		str+='<img onerror="setDefaultImage(this);" src="https://www.mytdp.com/party_meetings/'+result[i].paths[j]+'" alt="image" style="width:50px;height:50px;" />';
																	str+='</a>';
																	//str+='<a class="fancybox-button"  href="#inlineMainFLPDF'+i+''+j+'" title="">';
																		//str+='<img class="" onerror="setDefaultImage(this);" src="https://www.mytdp.com/party_meetings/'+result[i].paths[j]+'" alt="image" style="width:50px;height:50px;">';
																	//str+='</a>';
																str+='</li>';
																/* str+='<div id="inlineMainFLPDF'+i+''+j+'" rel="fancybox-button" style="width:100%;display: none;">';
																	str+='<img src="https://www.mytdp.com/party_meetings/'+result[i].paths[j]+'" style="cursor:pointer;height:250px;width:250px"></img>';
																str+='</div>'; */
															//}
															
														}
													}else{
														str+='<li>Images Not Available</li>';
													}
												str+='</ul>';
											str+='</div>';
										str+='</div>';
									str+='</td>';
								str+='</tr>';
							}
						str+='</tbody>';
					str+='</table>';
					str+='</div>';	
				
			str+='</div>';	
		str+='</div>';	
	$("#meetingWiseWiseModalDivId").html(str);
	$(".fancybox-button").fancybox({
		prevEffect		: 'none',
		nextEffect		: 'none',
		closeBtn		: false,
		helpers		: {
			title	: { type : 'inside' },
			buttons	: {}
		}
	});
	$('.fancybox-skin').width(800);
	$('.fancybox-inner').width(800);
	$('.fancybox-wrap').width(800);
	$('.fancybox-skin').height(800);
	$('.fancybox-inner').height(800);
	$('.fancybox-wrap').height(800);
	/* $(".fancybox-button").fancybox({  
		prevEffect		: 'none',
		nextEffect		: 'none',
		closeBtn		: false,
		helpers		: {
			title	: { type : 'inside' },
			buttons	: {}
		}
	}); */
	initializeDataTableWithPagination("meetingWiseWiseDataTable3");
	$("#meetingWiseWiseDataTable3").tableHeadFixer({"head" : false, "left" : 1}); 
	
}
function setDefaultImage(img){
	img.src = "Core/images/human.jpg";
	img.style="display:none;background-color:#fff;";
}



function getPartyMeetingDetailsForMomClick(filter_Type,meeting_block_val){
	$("#meetingWiseWiseModalDivId").html(spinner);
	var json={
		"activityMemberId":"44",
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":"1",
		"toDateStr":tourCustomEndDate,
		"filterType":filter_Type //TotalMeetings,UpdatedMeetings,notUpdatedMeetings,TabAttendedMeetings,ManualAttendedMeetings
		
	};
	 $.ajax({
		url: "getPartyMeetingDetailsForMomClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			console.log(result)
			if(result !=null && result.length>0){
				buildPartyMeetingImageDetailsByClick(result,"tabManUPNotUpAttendanceClick",meeting_block_val);
			}else{
				$("#meetingWiseWiseModalDivId").html("No Data Available");
			}
			
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function getConductedPartyMeetingDetailsByClick(filter_Type,locationId,locStatus){
	$("#meetingWiseWiseModalDivId").html(spinner);
	var locationLevel='';
	if(filter_Type == "District"){
		locationLevel = "DISTRICT";
	}else if(filter_Type == "Parliament"){
		locationLevel = "PARLIAMENTCONSTITUENCY";
	}else{
		locationLevel = "CONSTITUENCY";
	}
	var json={
		"activityMemberId":"44",
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":"1",
		"toDateStr":tourCustomEndDate,
		"meetingStatus":locStatus,
		"locationLevel":locationLevel,
		"locationValue":locationId
		
	};
	 $.ajax({
		url: "getConductedPartyMeetingDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			console.log(result)
			if(result !=null && result.length>0){
				buildConductedPartyMeetingDetails(result,locationLevel);
			}else{
				$("#meetingWiseWiseModalDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildConductedPartyMeetingDetails(result,locationLevel){
	var str='';
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="meetingWiseWiseDataTable26" style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Meeting Name</th>';
								if(locationLevel == "DISTRICT"){
									str+='<th>District Name</th>';
								}else{
									str+='<th>District Name</th>';
									str+='<th>Constituency Name</th>';
								}
								str+='<th>Conducted Date</th>';
								str+='<th>Meeting Status</th>';
								str+='<th>MOM Points</th>';
							str+='</tr>';
						str+='</thead>';
						
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td>'+result[i].meetingName+'</td>';
									if(locationLevel == "DISTRICT"){
										str+='<td style="text-align:left !important;">'+result[i].districtName+'</td>';
									}else{
										str+='<td style="text-align:left !important;">'+result[i].districtName+'</td>';
										str+='<td style="text-align:left !important;">'+result[i].constituencyName+'</td>';
									}
									
									str+='<td>'+result[i].conductedDate+'</td>';
									str+='<td>'+result[i].isCondacted+'</td>';
									if(result[i].totalCount !=null && result[i].totalCount>0){
										str+='<td>'+result[i].totalCount+'</td>';
									}else{
										str+='<td> - </td>';
									}
								str+='</tr>';
							}
						str+='</tbody>';
					str+='</table>';
					str+='</div>';	
				
			str+='</div>';	
		str+='</div>';	
	$("#meetingWiseWiseModalDivId").html(str);
	initializeDataTableWithPagination("meetingWiseWiseDataTable26");
	$("#meetingWiseWiseDataTable26").tableHeadFixer({"head" : false, "left" : 1}); 
}


//Level Wise Mom Points Click and Mom Block Click
//For Level Wise Y-Actional ,N-General
//2	In Progress 3	Completed

function getTotalMomDetailsByClick(filter_Type,meeting_block_val){
	$("#meetingWiseWiseModalDivId").html(spinner);
	var json={
		"activityMemberId":"44",
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":"1",
		"toDateStr":tourCustomEndDate,
		"meetingStatus":"",
		"meetingStatusList":[],
		"locationLevel":"",//CONSTITUENCY,PARLIAMENTCONSTITUENCY
		"locationValue":"",
		"filterType":filter_Type // InduvidalMoms TotalMoms
		
	};
	 $.ajax({
		url: "getTotalMomDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			console.log(result)
			if(result !=null){
				buildMomDetails(result,filter_Type,meeting_block_val);
			}else{
				$("#meetingWiseWiseModalDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildMomDetails(result,filter_Type,meeting_block_val){
	var modalBlock='';
	if(result.filesList !=null && result.filesList.length>0){
		var totalMoms=0;
		for(var i in result.filesList){
			if(result.filesList[i].id != 4){
				
				totalMoms =totalMoms+result.filesList[i].count;
			}
			
		}
		modalBlock+='<div class="new_border_yash_pad">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12">';
					modalBlock+='<div class="mainBlockUl">';
						modalBlock+='<ul class="list-inline blocksLi">';
							modalBlock+='<li>';
									modalBlock+='<h6 class="">Total Moms</h6>';
									if(totalMoms !=null && totalMoms>0){
										modalBlock+='<h5 class="font_weight m_top10">'+totalMoms+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
									}
									
								modalBlock+='</li>';
							for(var i in result.filesList){
								var perc = (result.filesList[i].count/totalMoms*100).toFixed(2);
								modalBlock+='<li>';
									modalBlock+='<h6 class="">'+result.filesList[i].name+'</h6>';
									if(result.filesList[i].count !=null && result.filesList[i].count>0){
										modalBlock+='<h5 class="font_weight m_top10">'+result.filesList[i].count+' <small class="color_green font_weight">'+perc+' %</small></h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top10"> - </h5>';
									}
									
								modalBlock+='</li>';
							}
						modalBlock+='</ul>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
	}
	
	modalBlock+='<div class="new_border_yash_pad m_top10 pad_10">';
		modalBlock+='<div class="row">';
				modalBlock+='<div class="col">';
					modalBlock+='<ul class="list-inline switch-btn-New float-right momStatusWiseCls">';
						modalBlock+='<li attr_type="" attr_filter_Type="'+filter_Type+'" class="active" attr_meeting_block_val="'+meeting_block_val+'">All</li>';
						modalBlock+='<li attr_type="N" attr_filter_Type="'+filter_Type+'" attr_meeting_block_val="'+meeting_block_val+'">General</li>';
						modalBlock+='<li attr_type="Y" attr_filter_Type="'+filter_Type+'" attr_meeting_block_val="'+meeting_block_val+'">Actionable</li>';
				modalBlock+='</ul>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col">';
				modalBlock+='<div id="MomStatusWiseDetailsDivID"></div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	$("#meetingWiseWiseModalDivId").html(modalBlock);
	getTotalMomStatusWiseDetailsByClick(filter_Type,"",meeting_block_val);
}
$(document).on("click",".momStatusWiseCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	
	var momStatus = $(this).attr("attr_type");
	var filter_Type = $(this).attr("attr_filter_Type");
	var meeting_block_val = $(this).attr("attr_meeting_block_val");
	
	getTotalMomStatusWiseDetailsByClick(filter_Type,momStatus,meeting_block_val);
});

function getTotalMomStatusWiseDetailsByClick(filter_Type,momStatus,meeting_block_val){
	$("#MomStatusWiseDetailsDivID").html(spinner);
	var json={
		"activityMemberId":"44",
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":"1",
		"toDateStr":tourCustomEndDate,
		"meetingStatus":momStatus,
		"meetingStatusList":[],
		"locationLevel":"",//CONSTITUENCY,PARLIAMENTCONSTITUENCY
		"locationValue":"",
		"filterType":filter_Type // InduvidalMoms TotalMoms
		
	};
	 $.ajax({
		url: "getTotalMomDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			console.log(result)
			if(result !=null && result.minutesList !=null && result.minutesList.length>0){
				buildMomStatusWiseTableDetails(result,meeting_block_val);
			}else{
				$("#MomStatusWiseDetailsDivID").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildMomStatusWiseTableDetails(result,meeting_block_val){
	var str='';
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="meetingWiseWiseDataTable29" style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								if(meeting_block_val == 2){
									str+='<th>District</th>';
								}else if(meeting_block_val == 3){
									str+='<th>District</th>';
									str+='<th>Constituency</th>';
								}else if(meeting_block_val == 4){
									str+='<th>District</th>';
									str+='<th>Constituency</th>';
									str+='<th>Mandal</th>';
								}else if(meeting_block_val == 7){
									str+='<th>District</th>';
									str+='<th>Constituency</th>';
									str+='<th>Mandal</th>';
									str+='<th>VILLAGE</th>';
								}
								str+='<th>Meeting Level</th>';
								str+='<th>Meeting Name</th>';
								str+='<th>Meeting Date</th>';
								str+='<th>MOM Description</th>';
								str+='<th>MOM Type</th>';
								//str+='<th>MOM Documents</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						if(result.minutesList !=null && result.minutesList.length>0){
							for(var i in result.minutesList){
								str+='<tr>';
									if(meeting_block_val == 2){
										str+='<td>'+result.minutesList[i].districtName+'</td>';
									}else if(meeting_block_val == 3){
										str+='<td>'+result.minutesList[i].districtName+'</td>';
										str+='<td>'+result.minutesList[i].constituencyName	+'</td>';
									}else if(meeting_block_val == 4){
										str+='<td>'+result.minutesList[i].districtName+'</td>';
										str+='<td>'+result.minutesList[i].constituencyName	+'</td>';
										str+='<td>'+result.minutesList[i].tehsilName+'</td>';
									}else if(meeting_block_val == 7){
										str+='<td>'+result.minutesList[i].districtName+'</td>';
										str+='<td>'+result.minutesList[i].constituencyName+'</td>';
										str+='<td>'+result.minutesList[i].tehsilName+'</td>';
										str+='<td>'+result.minutesList[i].panchayatName+'</td>';
									}
									str+='<td>'+result.minutesList[i].meetingLevel+'</td>';
									str+='<td>'+result.minutesList[i].meetingName+'</td>';
									str+='<td>'+result.minutesList[i].date+'</td>';
									str+='<td>'+result.minutesList[i].momDescription+'</td>';
									if(result.minutesList[i].momType == "Y"){
										str+='<td>Actionable</td>';
									}else{
										str+='<td>General</td>';
									}
									
								str+='</tr>';
							}
						}else{
							str+='<tr>';
								str+='<td colspan="5">No Data Available</td>';
							str+='</tr>';
						}
							
						str+='</tbody>';
					str+='</table>';
					str+='</div>';	
				
			str+='</div>';	
		str+='</div>';	
	$("#MomStatusWiseDetailsDivID").html(str);
	initializeDataTableWithPagination("meetingWiseWiseDataTable29");
	$("#meetingWiseWiseDataTable29").tableHeadFixer({"head" : false, "left" : 1}); 
}

function buildTotalMomDetailsByClickMOMPoints(filter_Type,locationId,momStatus){
	var modalBlock='';
	
	modalBlock+='<div class="new_border_yash_pad m_top10">';
		modalBlock+='<div class="row">';
				modalBlock+='<div class="col">';
					modalBlock+='<ul class="list-inline switch-btn-New float-right momPointWiseCls">';
						modalBlock+='<li attr_type=""  attr_filter_Type="'+filter_Type+'" attr_location_id="'+locationId+'" class="active">All</li>';
						modalBlock+='<li attr_type="N" attr_filter_Type="'+filter_Type+'" attr_location_id="'+locationId+'" >General</li>';
						modalBlock+='<li attr_type="Y" attr_filter_Type="'+filter_Type+'" attr_location_id="'+locationId+'" >Actionable</li>';
				modalBlock+='</ul>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col">';
				modalBlock+='<div id="locationWiseMomPointsDetailsDivID"></div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	$("#meetingWiseWiseModalDivId").html(modalBlock);
	
	getTotalMomDetailsByClickMOMPoints(filter_Type,locationId,momStatus);
	
}
function getTotalMomDetailsByClickMOMPoints(filter_TypeVal,locationIdVal,momStatusVal){
	$("#locationWiseMomPointsDetailsDivID").html(spinner);
	
	var locationLevel='';
	if(filter_TypeVal == "District"){
		locationLevel = "DISTRICT";
	}else if(filter_TypeVal == "Parliament"){
		locationLevel = "PARLIAMENTCONSTITUENCY";
	}else{
		locationLevel = "CONSTITUENCY";
	}
	
	var json={
		"activityMemberId":"44",
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":"1",
		"toDateStr":tourCustomEndDate,
		"meetingStatus":momStatusVal,
		"meetingStatusList":[],
		"locationLevel":locationLevel,//CONSTITUENCY,PARLIAMENTCONSTITUENCY
		"locationValue":locationIdVal,
		"filterType":"InduvidalMoms" // InduvidalMoms TotalMoms
		
	};
	 $.ajax({
		url: "getTotalMomDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			console.log(result)
			if(result !=null){
				buildTotalLocationWiseMomPoint(result);
			}else{
				$("#locationWiseMomPointsDetailsDivID").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

$(document).on("click",".momPointWiseCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	
	var momStatusVal = $(this).attr("attr_type");
	var filter_TypeVal = $(this).attr("attr_filter_Type");
	var locationIdVal = $(this).attr("attr_location_id");
	getTotalMomDetailsByClickMOMPoints(filter_TypeVal,locationIdVal,momStatusVal);
});

function buildTotalLocationWiseMomPoint(result){
	var str='';
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="meetingWiseWiseDataTable89" style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Meeting Level</th>';
								str+='<th>Meeting Name</th>';
								str+='<th>Meeting Date</th>';
								str+='<th>MOM Description</th>';
								str+='<th>MOM Type</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						if(result.minutesList !=null && result.minutesList.length>0){
							for(var i in result.minutesList){
								str+='<tr>';
									str+='<td>'+result.minutesList[i].meetingLevel+'</td>';
									str+='<td>'+result.minutesList[i].meetingName+'</td>';
									str+='<td>'+result.minutesList[i].date+'</td>';
									str+='<td>'+result.minutesList[i].momDescription+'</td>';
									if(result.minutesList[i].momType == "Y"){
										str+='<td>Actionable</td>';
									}else{
										str+='<td>General</td>';
									}
									
								str+='</tr>';
							}
						}else{
							str+='<tr>';
								str+='<td colspan="5">No Data Available</td>';
							str+='</tr>';
						}
							
						str+='</tbody>';
					str+='</table>';
					str+='</div>';	
				
			str+='</div>';	
		str+='</div>';	
	$("#locationWiseMomPointsDetailsDivID").html(str);
	initializeDataTableWithPagination("meetingWiseWiseDataTable89");
	$("#meetingWiseWiseDataTable89").tableHeadFixer({"head" : false, "left" : 1}); 
}
function buildPartyMeetingSubLevelInvitesNonInvitesClickDetails(result,name){
	
	var str='';
		str+='<div class="row">';
			str+='<div class="col m_top20">';
				str+='<h6 class="text-uppercase font_weight">'+name+'</h6>';
			str+='</div>';
		str+='</div>';
		
	
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="meetingWiseWiseDataTable2dd" style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Candidate Name</th>';
								str+='<th>Meeting Name</th>';
								str+='<th>Meeting Level</th>';
								str+='<th>Conducted Date</th>';
								str+='<th>Designation</th>';
								str+='<th>District</th>';
								str+='<th>Attended Status</th>';
							str+='</tr>';
						str+='</thead>';
						
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td>'+result[i].cadreName	+'</td>';
									str+='<td>'+result[i].name+'</td>';
									str+='<td>'+result[i].meetingLevel+'</td>';
									str+='<td>'+result[i].conductedDate+'</td>';
									str+='<td>'+result[i].role+'</td>';
									str+='<td>'+result[i].districtName+'</td>';
									str+='<td>'+result[i].impact+'</td>';
									
									
								str+='</tr>';
							}
						str+='</tbody>'; 
					str+='</table>';
					str+='</div>';	
				
			str+='</div>';	
		str+='</div>';	
		str+='<div class="scrollTopDivId"></div>';
	$("#meetingWiseAttendanceDtsDivId").html(str);
	initializeDataTableWithPagination("meetingWiseWiseDataTable2dd");
	$("#meetingWiseWiseDataTable2dd").tableHeadFixer({"head" : false, "left" : 1}); 
}

function getMeetingWithOutAttendanceDetails(){
	$("#meetingWiseWiseModalDivId").html(spinner);
	var json={
		"activityMemberId":"44",
		"fromDateStr":tourCustomStartDate,
		"partyMeetingLevelIds":partyMeetingLevelIds,
		"partyMeetingMainTypeId":1,
		"stateId":"1",
		"toDateStr":tourCustomEndDate
	};
	 $.ajax({
		url: "getPartyMeetingWithoutAttendanceDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			console.log(result)
			if(result !=null){
				buildMeetingWithOutAttendanceDetails(result);
			}else{
				$("#meetingWiseWiseModalDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildMeetingWithOutAttendanceDetails(result){
	var str='';
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_meeting" id="meetingWithoutAttendanceDataTable" style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Meeting Name</th>';
								str+='<th>Meeting Level</th>';
								str+='<th>Remark</th>';
							str+='</tr>';
						str+='</thead>';
						
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td>'+result[i].meetingName+'</td>';
									str+='<td>'+result[i].meetingLevel+'</td>';
									str+='<td>'+result[i].remark+'</td>';
								str+='</tr>';
							}
						str+='</tbody>';
					str+='</table>';
					str+='</div>';
				
			str+='</div>';	
		str+='</div>';	
	$("#meetingWiseWiseModalDivId").html(str);
	
	initializeDataTableWithOutPagination("meetingWithoutAttendanceDataTable")
	$("#meetingWithoutAttendanceDataTable").tableHeadFixer({"head" : false, "left" : 1}); 	
}