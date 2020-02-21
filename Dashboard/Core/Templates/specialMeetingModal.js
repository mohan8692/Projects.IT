var specialMeetingsComponent = specialMeetingsComponent || {};
var defaultInputs = {	
	"filterId" : "",
	"sessionId" : "",
	"meetingStatus" : "",
	"sessionName" : "",
	"type":"false"
	
};
var globalDesigResponse;
var globalSuccessParams;
function basicSpecialMeetingDetails(blockValue,divIdWithOutSpace,chosenLabel,buildTypeId){
	var modalBlock='';
	var divId = divIdWithOutSpace.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
	modalBlock+='<div id="spMeetingsOverViewDetailsId'+divId+'"></div>';

	modalBlock+='<div class="p-3 m_top10" id="meetingsSecondBlock'+divId+'">';
		modalBlock+='<div id="spMeetingsOverviewAttendanceDetailsId'+divId+'"></div>';		
		modalBlock+='<div id="spMeetingsTabAttendanceDetailsId'+divId+'"></div>';
	modalBlock+='</div>';
	if(blockValue == 0){
		modalBlock+='<div id="overallSpecialMeetingsDetailsId'+divId+'"></div>';
		
	}else{
		modalBlock+='<div class="m_top10" id="meetingsFourthBlock'+divId+'">'; 
			modalBlock+='<div id="meetingsDetailsCountsId'+divId+'"></div>';			
		modalBlock+='</div>';
		modalBlock+='<div class="pad_white_border m_top10 meetingClicksCls displayNoneCls">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12">';
					modalBlock+='<h6 class="text-capital font_weight mtngsCntAtnDtlsNameId"></h6>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			modalBlock+='<div id="meetingsDetailsCountsAttendanceId'+divId+'"></div>';
			modalBlock+='<div id="meetingsDetailsCountsTabAttendanceId'+divId+'"></div>';
			modalBlock+='<div class="card m_top20">';
				modalBlock+='<div class="card-header">';				
						modalBlock+='<h6 class="font_weight text-capital m_bottom_0" style="margin-left: -10px;">SESSIONS</h6>'
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="card-body pad_10">';
					modalBlock+='<div id="meetingsDetailsCountsSessionId'+divId+'"></div>';
				modalBlock+='</div>';
			modalBlock+='</div>';			
			modalBlock+='<div id="designationSummaryId'+divId+'" class="desigScrollCls"></div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="card m_top10 displayNoneCls imagesSlideDiv" >';
			modalBlock+='<div class="card-header pad_10 card_bg">';
				modalBlock+='<h6 class="font_14 font_weight m_bottom_0 text-capital">Images</h6>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body color_bg_white pad_10">';
				modalBlock+='<div id="imageDetailsByMeetingId'+divId+'"></div>';	
			modalBlock+='</div>';
		modalBlock+='</div>';
	}
	modalBlock+='<div id="meetingsVarianceReportId'+divId+'"></div>';
	modalBlock+='<div class="row m_top10 scrollDivCls">';
		modalBlock+='<div class="col-sm-12">';
			modalBlock+='<h6 class="font_weight text-capital splMtngExpTitleId"></h6>';
			modalBlock+='<div class="overallSplMtngsExpnd"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	$("."+buildTypeId).html(modalBlock);
	//console.log(defaultInputs);
	specialMeetingsComponent.ajax.specialMeetingOnLoadCalls(blockValue,chosenLabel);
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getSpecialMeetingOverViewForDashBoard",defaultInputs,divId,blockValue,"spMeetingsOverViewDetailsId"+divId);
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getMeetingTypeAttendanceDetails",defaultInputs,divId,blockValue,"spMeetingsOverviewAttendanceDetailsId"+divId);
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getTabAndManualSpecialMeetingAttendanceDetaislByMeetingId",defaultInputs,divId,blockValue,"spMeetingsTabAttendanceDetailsId"+divId);
	specialMeetingsComponent.ajax.getSpecialMeetingsVarianceReport("getSpecialMeetingVarianceReport",divId,blockValue,"meetingsVarianceReportId"+divId);	
	
	if(blockValue == 0){		
		var overAllSpMtngInputs ={}
		$.extend(overAllSpMtngInputs,defaultInputs,{"filterId" : "OverAllBlock","chosenLabel":chosenLabel});
		
		specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getMeetingTypeAttendanceDetails",overAllSpMtngInputs,divId,blockValue,"overallSpecialMeetingsDetailsId"+divId);	
	}else{
		
		specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getLevelWiseSpecialMeetingsDetaisCounts",defaultInputs,divId,blockValue,"meetingsDetailsCountsId"+divId);
	}
	
	
}


specialMeetingsComponent.ajax = (function(){
	var spMeetingTypeIds = [];
	
	function specialMeetingOnLoadCalls(blockValue,chosenLabel){
		if(blockValue == 0){
			spMeetingTypeIds = []
		}else{
			spMeetingTypeIds = [];
			spMeetingTypeIds.push(blockValue);
		}
		spMeetingsStartDate="";
		spMeetingsEndDate="";
		if(customStartDate != customEndDate){
			if(chosenLabel == "thisMonth"){
				spMeetingsStartDate = moment().startOf('month').format('DD/MM/YYYY');
				spMeetingsEndDate = moment().endOf('month').format('DD/MM/YYYY');
			}else if(chosenLabel == "lastMonth"){
				spMeetingsStartDate=moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY');
				spMeetingsEndDate=moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
			}else if(chosenLabel == "last3Month"){
				spMeetingsStartDate = moment().subtract(3, 'month').startOf('month').format('DD/MM/YYYY');
				spMeetingsEndDate = moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
			}else if(chosenLabel == "last6Month"){
				spMeetingsStartDate = moment().subtract(6, 'month').startOf('month').format('DD/MM/YYYY');
				spMeetingsEndDate = moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
			}else{
				spMeetingsStartDate = moment().subtract(10, 'years').startOf('year').format('DD/MM/YYYY');
				spMeetingsEndDate = moment().format('DD/MM/YYYY');
			}
			
		}else{
			spMeetingsStartDate = customStartDate;
			spMeetingsEndDate = customEndDate;
		}
	}

	function specialMeetingAjaxCalls(url,inputParams,divId,blockValue,blockId){		
		$("#"+blockId).html(spinner);		
		var json={				
			"stateId":1,
			"activityMemberId":"44",
			"state":"AP",
			"partyMeetingMainTypeId":3,
			"partyMeetingLevelIds":[],// const
			"designationId":0, //districtId constant
			"type":inputParams.type,	//"false",	//isNonInvitee constant	
			"fromDateStr": spMeetingsStartDate,
			"toDateStr": spMeetingsEndDate,
			"partyMeetingTypeIds": spMeetingTypeIds,
			"filterType":inputParams.filterId, 
			"partyMeetingId": inputParams.partyMeetingId ,				
			"id":inputParams.sessionId,		//"5027", //SessionId
			"meetingStatus":inputParams.meetingStatus,//absent ,late
		};
		
		$.ajax({
			url: url,
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(response) {
				var successParams ={
					"divId": divId,
					"blockId": blockId,
					"blockValue": blockValue,
					"partyMeetingId":inputParams.partyMeetingId,
					"meetingStatus": inputParams.meetingStatus,
					"sessionName": inputParams.sessionName,
					"chosenLabel": inputParams.chosenLabel,
					"type": inputParams.type,
					
				}
				//console.log(successParams)
				if(response != null && response.length > 0 ){
					if(url == "getSpecialMeetingMemberDtls"){
						globalDesigResponse = response;
						globalSuccessParams = successParams;
					}
					if(blockId == "spMeetingsOverViewDetailsId"+divId){
						specialMeetingsComponent.buildAjaxCallResult.buildSpecialMeetingsOverView(response,successParams);
					}else if(blockId == "spMeetingsOverviewAttendanceDetailsId"+divId || blockId == "meetingsDetailsCountsAttendanceId"+divId){
						specialMeetingsComponent.buildAjaxCallResult.buildMeetingTypeAttendanceDetails(response,successParams);
					}else if(blockId == "spMeetingsTabAttendanceDetailsId"+divId || blockId == "meetingsDetailsCountsTabAttendanceId"+divId){
						specialMeetingsComponent.buildAjaxCallResult.buildSpecialMeetingTabAttedanceDetails(response,successParams);
					}else if(blockId == "overallSpecialMeetingsDetailsId"+divId){
						specialMeetingsComponent.buildAjaxCallResult.buildOverAllSpecialMeetingDetails(response,successParams);
					}else if(blockId == "meetingsDetailsCountsId"+divId){
						specialMeetingsComponent.buildAjaxCallResult.buildLevelWiseSpecialMeetingsDetaisCounts(response,successParams);
					}else if(blockId == "meetingsDetailsCountsSessionId"+divId){
						specialMeetingsComponent.buildAjaxCallResult.buildOverallAttendedSessionCountsBasedOnMeeting(response,successParams);
					}else if(blockId == "designationSummaryId"+divId){						
						specialMeetingsComponent.buildAjaxCallResult.buildDesignationWiseSummaryDetails(response,successParams,false);
					}else if(blockId == "imageDetailsByMeetingId"+divId){
						specialMeetingsComponent.buildAjaxCallResult.buildImagesDetailsByMeeting(response,successParams);
					}
				}else{
					$("#"+blockId).html("No Data Available");
				}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
	}
	function getSpecialMeetingsVarianceReport(url,divId,blockValue,blockId){
		$("#"+blockId).html(spinner);
		var json={	
			"stateId":1,
			"partyMeetingMainTypeId":3,
			"activityMemberId":44,
			"partyMeetingTypeIds":spMeetingTypeIds,
			"partyMeetingLevelIds":[1,2]			
		};	
		$.ajax({
			url: url,
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(response) {
				var successParams ={
					"divId": divId,
					"blockId": blockId,
					"blockValue": blockValue,					
				}
				if(response != null){
					specialMeetingsComponent.buildAjaxCallResult.buildMeetingsVarianceReport(response,successParams);
				}else{
					$("#"+blockId).html("No Data Available");
				}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
	}
	return{
		specialMeetingOnLoadCalls : specialMeetingOnLoadCalls,
		specialMeetingAjaxCalls : specialMeetingAjaxCalls,
		getSpecialMeetingsVarianceReport : getSpecialMeetingsVarianceReport
	};
	
	
}());

specialMeetingsComponent.buildAjaxCallResult = (function(){
	function buildSpecialMeetingsOverView(response,successParams){
		var clrObj = {"STATE": "color_green", "DISTRICT": "color_red"}
		var modalBlock = '';
		modalBlock+='<div class="table_border_yash_pad">';
			modalBlock+='<div class="row">';
			for(var i in response){
				modalBlock+='<div class="col-sm-3">';
					if(i== 0){
						modalBlock+='<div class="pad_yash_border">';
							modalBlock+='<h6 class="text-capital font_15 font_weight">'+response[i].meetingLevel+'</h6>';
							if(response[i].count != null && response[i].count > 0){
								modalBlock+='<h6 class="text-capital font_weight">'+response[i].count+'</h6>';
							}else{
								modalBlock+='<h6 class="text-capital font_weight">-</h6>';
							}
						modalBlock+='</div>';
					}else{
						modalBlock+='<div class="pad_white_border">';
							modalBlock+='<h6 class="text-capital font_15 font_weight">'+response[i].meetingLevel+'</h6>';
							if(response[i].count != null && response[i].count > 0){
								modalBlock+='<h6 class="text-capital font_weight">'+response[i].count+'<small class="'+clrObj[response[i].meetingLevel]+' ml-3">'+response[i].percentage+'%</small></h6>';
							}else{
								modalBlock+='<h6 class="text-capital font_weight">-</h6>';
							}
						modalBlock+='</div>';
					}					
				modalBlock+='</div>';
			}				
			modalBlock+='</div>';
		modalBlock+='</div>';
		$('#'+successParams.blockId).html(modalBlock);
	}

	function buildMeetingTypeAttendanceDetails(response,successParams){
		$("#meetingsSecondBlock"+successParams.divId).addClass("table_border_yash_pad");	
	
		var modalBlock = '';
		//modalBlock+='<div class="table_border_yash_pad">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col">';
					modalBlock+='<div class="pad_yash_border">';
						modalBlock+='<h6 class="text-capital font_12">Invited</h6>';
						modalBlock+='<h6 class="text-capital font_weight">'+setValue(response[0].inviteeCount)+'</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="col">';
					modalBlock+='<div class="table_border_yash_pad bg_ed">';
						modalBlock+='<h6 class="text-capital font_12">Invitee Attended</h6>';
						if(successParams.partyMeetingId != null){
							modalBlock+='<h6 class="text-capital font_weight memberDtlsCls cursorCls underlineCss" attr_meetingId="'+successParams.partyMeetingId+'" attr_divId="'+successParams.divId+'" attr_blockValue="'+successParams.blockValue+'" attr_meetingStatus="attended">'+setValue(response[0].inviteeAttendedCount)+'</h6>';
						}else{
							modalBlock+='<h6 class="text-capital font_weight">'+setValue(response[0].inviteeAttendedCount)+'</h6>';
						}						
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="col">';
					modalBlock+='<div class="table_border_yash_pad bg_ed">';
						modalBlock+='<h6 class="text-capital font_12">Absent</h6>';
						if(successParams.partyMeetingId != null){
							modalBlock+='<h6 class="text-capital font_weight memberDtlsCls cursorCls underlineCss" attr_meetingId="'+successParams.partyMeetingId+'" attr_divId="'+successParams.divId+'" attr_blockValue="'+successParams.blockValue+'" attr_name="" attr_meetingStatus="absent">'+setValue(response[0].absentCount)+'</h6>';
						}else{
							modalBlock+='<h6 class="text-capital font_weight">'+setValue(response[0].absentCount)+'</h6>';
						}
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="col">';
					modalBlock+='<div class="table_border_yash_pad bg_ed">';
						modalBlock+='<h6 class="text-capital font_12">Non-Invitee Attended</h6>';
						modalBlock+='<h6 class="text-capital font_weight">'+setValue(response[0].nonInviteeAttendedCount)+'</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="col">';
					modalBlock+='<div class="table_border_yash_pad bg_ed">';
						modalBlock+='<h6 class="text-capital font_12">Images</h6>';
						modalBlock+='<h6 class="text-capital font_weight">'+setValue(response[0].imageCount)+'</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		//modalBlock+='</div>';
		$('#'+successParams.blockId).html(modalBlock);
	}
	
	function buildOverAllSpecialMeetingDetails(response,successParams){
		var modalBlock = '';
		modalBlock+='<div class="table_border_yash_pad m_top20">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12">';
					modalBlock+='<h6 class="font_weight text-capital">Special Meetings</h6>';
				modalBlock+='</div>';
				for(var i in response){
					modalBlock+='<div class="col-sm-6 m_top10">';
						modalBlock+='<div class="card">';
							modalBlock+='<div class="card-header pad_10" style="background-color:#e3e4e6;">';
								modalBlock+='<div class="row">';
									modalBlock+='<div class="col-sm-10">';
										modalBlock+='<h6 class="font_weight m_bottom_0 text-capital font_15 m_top5">'+response[i].name+' - <span>'+setValue(response[i].count)+'</span></h6>';
									modalBlock+='</div>';
									modalBlock+='<div class="col-sm-2 float-right">';
										modalBlock+='<span class="font_weight float-right font_12 m_top5"><i class="fas fa-expand-arrows-alt splMeetingsClkCls cursorCls" attr_blockValue="'+response[i].id+'" attr_divId="overallSplMtngsExpnd" attr_chosenLabel="'+successParams.chosenLabel+'" attr_name="'+response[i].name+'"></i></span>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
							modalBlock+='<div class="card-body color_bg_white pad_10_0">';							
								modalBlock+='<div class="mainBlockUl">';
									modalBlock+='<ul class="list-inline blocksLi">';
										modalBlock+='<li class="text-center">';
											modalBlock+='<h6 class="text-capital font_12">Invitees</h6>';
											modalBlock+='<h6 class="text-capital font_weight font_14">'+setValue(response[i].inviteeCount)+'</h6>';
										modalBlock+='</li>';
										modalBlock+='<li class="text-center">';
											modalBlock+='<h6 class="text-capital font_12">ATTENDED</h6>';
											modalBlock+='<h6 class="text-capital font_weight font_14">'+setValue(response[i].inviteeAttendedCount)+'</h6>';
										modalBlock+='</li>';
										modalBlock+='<li class="text-center">';
											modalBlock+='<h6 class="text-capital font_12">LATE</h6>';
											modalBlock+='<h6 class="text-capital font_weight font_14">'+setValue(response[i].lateAttendedCount)+'</h6>';
										modalBlock+='</li>';
										modalBlock+='<li class="text-center">';
											modalBlock+='<h6 class="text-capital font_12">ABSENT</h6>';
											modalBlock+='<h6 class="text-capital font_weight font_14">'+setValue(response[i].absentCount)+'</h6>';
										modalBlock+='</li>';
										modalBlock+='<li class="text-center">';
											modalBlock+='<h6 class="text-capital font_12 tooltipCls" data-toggle="tooltip" title="Non-Invitee Attended">N-I ATTEN..</h6>';
											modalBlock+='<h6 class="text-capital font_weight font_14">'+setValue(response[i].nonInviteeAttendedCount)+'</h6>';
										modalBlock+='</li>';
										modalBlock+='<li class="text-center">';
											modalBlock+='<h6 class="text-capital font_12">IMAGES</h6>';
											modalBlock+='<h6 class="text-capital font_weight font_14">'+setValue(response[i].imageCount)+'</h6>';
										modalBlock+='</li>';
									modalBlock+='</ul>';
								modalBlock+='</div>';								
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				}
			modalBlock+='</div>';
			/* modalBlock+='<div class="row m_top10">';
				modalBlock+='<div class="col-sm-12">';
					modalBlock+='<h6 class="font_weight text-capital splMtngExpTitleId"></h6>';
					modalBlock+='<div class="overallSplMtngsExpnd"></div>';
				modalBlock+='</div>';
			modalBlock+='</div>'; */
		modalBlock+='</div>';
		
		$('#'+successParams.blockId).html(modalBlock);
		$(".tooltipCls").tooltip();
	}
	function buildMeetingsVarianceReport(response,successParams){
		var colorThemeObj = {"positive": "badge_green","negative":"badge_red","equal":"badge_yellow"}
		var modalBlock = '';
		modalBlock+='<div class="card m_top20">';
			modalBlock+='<div class="card-header card_bg" style="padding: 0 5px;">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-6">';
						modalBlock+='<h6 class="font_weight" style="margin-top: 15px;margin-left: 10px;">MEETINGS VARIANCE REPORT</h6>';
					modalBlock+='</div>';					
					modalBlock+='<div class="col-sm-6 float-right">';
						modalBlock+='<ul class="list-inline basic_list_type m_bottom_0 float-right" style="position: relative;top: 8px;">';
							modalBlock+='<li>';
								modalBlock+='<p><span class="green_border"></span> HIGH</p>';
							modalBlock+='</li>';
							modalBlock+='<li>';
								modalBlock+='<p><span class="red_border"></span> LOW</p>';
							modalBlock+='</li>';
							modalBlock+='<li>';
								modalBlock+='<p><span class="yellow_border"></span> SAME</p>';
							modalBlock+='</li>';
						modalBlock+='</ul>';
					modalBlock+='</div>';
				 modalBlock+='</div>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body color_bg_white">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col">';
						modalBlock+='<div class="table-responsive">';	
							modalBlock+='<table class="table  table_custom_news_variance m_bottom_0" id="" style="border: 1px solid #c0bfbf !important;">';
								modalBlock+='<thead>';
									modalBlock+='<tr>';
										modalBlock+='<th rowspan="2"></th>';
										modalBlock+='<th colspan="2">MEETINGS</th>';
										modalBlock+='<th colspan="2">INVITEES</th>';
										modalBlock+='<th colspan="2">ATTENDED</th>';
										modalBlock+='<th colspan="2">LATE ATTENDED</th>';
										modalBlock+='<th colspan="2">ABSENT</th>';
										modalBlock+='<th colspan="2" title="NON-INVITEE ATTENDED">N-I ATTENDED</th>';
										
									modalBlock+='</tr>';
									modalBlock+='<tr>';							
										for(var i = 0 ; i < 6 ; i++){
											modalBlock+='<th>Present</th>';
											modalBlock+='<th>Past</th>';
										}							
									modalBlock+='</tr>';
								modalBlock+='</thead>';
								modalBlock+='<tbody>';
								for(var i in response.subList){
									modalBlock+='<tr>';
										modalBlock+='<td>'+response.subList[i].name+'</td>';
										modalBlock+='<td>'+setValue(response.subList[i].presentConducted)+'</td>';
										modalBlock+='<td>'+setValue(response.subList[i].pastConducted)+'</td>';
										modalBlock+='<td>'+setValue(response.subList[i].presentInviteesCount)+'</td>';
										modalBlock+='<td>'+setValue(response.subList[i].pastInviteesCount)+'</td>';
										
										if(response.subList[i].presentInviteeAttendedPerc != null && response.subList[i].presentInviteeAttendedPerc >0){
											modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorThemeObj[response.subList[i].inviteAttendedImpact]+'">'+response.subList[i].presentInviteeAttendedPerc+'</h6></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
										if(response.subList[i].pastInviteeAttendedPerc != null && response.subList[i].pastInviteeAttendedPerc >0){
											modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash">'+response.subList[i].pastInviteeAttendedPerc+'</h6></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
										if(response.subList[i].presentInviteesLateAttendedPerc != null && response.subList[i].presentInviteesLateAttendedPerc >0){
											modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorThemeObj[response.subList[i].lateAttendedImpact]+'">'+response.subList[i].presentInviteesLateAttendedPerc+'</h6></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
										if(response.subList[i].pastInviteesLateAttendedPerc != null && response.subList[i].pastInviteesLateAttendedPerc >0){
											modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash">'+response.subList[i].pastInviteesLateAttendedPerc+'</h6></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
										if(response.subList[i].presentInviteesAbsentPerc != null && response.subList[i].presentInviteesAbsentPerc >0){
											modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorThemeObj[response.subList[i].inviteeAbsentImpact]+'">'+response.subList[i].presentInviteesAbsentPerc+'</h6></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
										if(response.subList[i].pastInviteesAbsentPerc != null && response.subList[i].pastInviteesAbsentPerc >0){
											modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash">'+response.subList[i].pastInviteesAbsentPerc+'</h6></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
										if(response.subList[i].presentNonInviteeAttended != null && response.subList[i].presentNonInviteeAttended >0){
											modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorThemeObj[response.subList[i].nonInviteeAttenedImpact]+'">'+response.subList[i].presentNonInviteeAttended+'</h6></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
										if(response.subList[i].pastNonInviteeAttended != null && response.subList[i].pastNonInviteeAttended >0){
											modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash">'+response.subList[i].pastNonInviteeAttended+'</h6></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
									modalBlock+='</tr>';
								}
								modalBlock+='</tbody>';
							modalBlock+='</table>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';			
		$('#'+successParams.blockId).html(modalBlock);
	}
	function buildSpecialMeetingTabAttedanceDetails(response,successParams){
		var modalBlock = '';
			modalBlock+='<div class="table_border_yash_pad bg_ed m_top10">';
			modalBlock+='<div class="row">';
				for(var i in response){
					modalBlock+='<div class="col-sm-6">';
						modalBlock+='<div class="pad_white_border">';
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col">';
									modalBlock+='<h6 class="text-capital font_12 m_top5">TAB ATTENDANCE<br/>MEMBERS</h6>';
									modalBlock+='<h5 class="text-capital font_weight">'+setValue(response[i].tabAttendedMembers)+'</h5>';
								modalBlock+='</div>';
								modalBlock+='<div class="col">';
									modalBlock+='<div class="pad_yash_border">';
										modalBlock+='<h6 class="text-capital font_12">INVITEES</h6>';
										modalBlock+='<h5 class="text-capital font_weight">'+setValue(response[i].inviteeAttendedCount)+'</h5>';
									modalBlock+='</div>';
								modalBlock+='</div>';
								modalBlock+='<div class="col">';
									modalBlock+='<div class="pad_yash_border">';
										modalBlock+='<h6 class="text-capital font_12">NON INVITEES</h6>';
										modalBlock+='<h5 class="text-capital font_weight">'+setValue(response[i].nonInviteeAttendedCount)+'</h5>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-6">';
						modalBlock+='<div class="pad_white_border">';
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col">';
									modalBlock+='<h6 class="text-capital font_12 m_top5">MANUAL ATTENDANCE MEMBERS</h6>';
									modalBlock+='<h6 class="text-capital font_weight">'+setValue(response[i].manualAttendedMembers)+'</h6>';
								modalBlock+='</div>';
								modalBlock+='<div class="col">';
									modalBlock+='<div class="pad_yash_border">';
										modalBlock+='<h6 class="text-capital font_12">INVITEES</h6>';
										modalBlock+='<h6 class="text-capital font_weight">'+setValue(response[i].manualInviteMembers)+'</h6>';
									modalBlock+='</div>';
								modalBlock+='</div>';
								modalBlock+='<div class="col">';
									modalBlock+='<div class="pad_yash_border">';
										modalBlock+='<h6 class="text-capital font_12">NON INVITEES</h6>';
										modalBlock+='<h6 class="text-capital font_weight">'+setValue(response[i].manualNonInviteMembers)+'</h6>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				}
				
			modalBlock+='</div>';
			modalBlock+='</div>';
		$('#'+successParams.blockId).html(modalBlock);
	}
	function buildLevelWiseSpecialMeetingsDetaisCounts(response,successParams){
		$("meetingsFourthBlock"+successParams.divId).addClass("table_border_yash_pad");
		var modalBlock = '';
		modalBlock+='<div class="row m_top10">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="table-responsive">';
					modalBlock+='<table class="table table-condensed table_custom_news" id="spMeetingsDetailsCountDataTable" style="width:100%;border:1px solid #c0bfbf !important;">';
						modalBlock+='<thead>';
							modalBlock+='<tr>';
								modalBlock+='<th>Meetings Names</th>';
								modalBlock+='<th>INVITEES</th>';
								modalBlock+='<th>ATTENDED</th>';
								modalBlock+='<th>%</th>';
								modalBlock+='<th>LATE ATTENDED</th>';
								modalBlock+='<th>%</th>';
								modalBlock+='<th>ABSENT</th>';
								modalBlock+='<th>%</th>';
								modalBlock+='<th>NON-INVITEES ATTENDED</th>';
							modalBlock+='</tr>';
						modalBlock+='</thead>';
						modalBlock+='<tbody>';
							for(var i in response){
								modalBlock+='<tr>';
									if(response[i].name != null && response[i].name.trim().length > 0){
										modalBlock+='<td>'+response[i].name+'<i class="fa fa-info-circle ml-2 cursorCls getMeetingsDetailsCls" attr_meetingId="'+response[i].id+'" attr_divId="'+successParams.divId+'" attr_blockValue="'+successParams.blockValue+'" attr_name="'+response[i].name+'"></i></td>';
									}else{
										modalBlock+='<td>-</td>';
									}									
									modalBlock+='<td>'+setValue(response[i].inviteeCount)+'</td>';
									modalBlock+='<td>'+setValue(response[i].inviteeAttendedCount)+'</td>';
									modalBlock+='<td>'+setValue(response[i].inviteeAttendedPerc)+'</td>';
									modalBlock+='<td>'+setValue(response[i].lateAttendedCount)+'</td>';
									modalBlock+='<td>'+setValue(response[i].lateAttendedPerc)+'</td>';
									modalBlock+='<td>'+setValue(response[i].inviteeAbsentCount)+'</td>';
									modalBlock+='<td>'+setValue(response[i].inviteeAbsentPerc)+'</td>';
									modalBlock+='<td>'+setValue(response[i].nonInviteeAttendedCount)+'</td>';
								modalBlock+='</tr>';
							}
							
						modalBlock+='</tbody>';
					modalBlock+='</table>';
				modalBlock+='</tbody>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		$('#'+successParams.blockId).html(modalBlock);
		initializeDataTableWithPagination("spMeetingsDetailsCountDataTable");
	}
	
	function buildOverallAttendedSessionCountsBasedOnMeeting(response,successParams){
		var modalBlock = '';
		modalBlock+='<div class="row">';
		for(var i in response){
			modalBlock+='<div class="col-sm-4">';
				modalBlock+='<div class="card">';
					modalBlock+='<div class="card-header card_bg pad_10">';
						modalBlock+='<h6 class="font_14 font_weight m_bottom_0">'+response[i].name+'</h6>';
					modalBlock+='</div>';
					modalBlock+='<div class="card-body color_bg_white pad_10">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-4">';
								modalBlock+='<h6 class="text-capital font_12  font_weight">Attended</h6>';
								if(response[i].inviteeAttendedCount != null && response[i].inviteeAttendedCount > 0){
									modalBlock+='<h6 class="text-capital font_weight font_15"><span class="getdesgSummDtlsCls cursorCls underlineCss" attr_sessionId="'+response[i].sessionId+'" attr_divId="'+successParams.divId+'" attr_blockValue="'+successParams.blockValue+'" attr_status="attended" attr_meetingId="'+successParams.partyMeetingId+'" attr_sessionName="'+response[i].name+'" attr_searchRequired="N">'+response[i].inviteeAttendedCount+'</span><small class="color_green ml-2">'+response[i].inviteeAttendedPerc+' %</small></h6>';
								}else{
									modalBlock+='<h6 class="text-capital font_12  font_weight">-</h6>';
								}
								
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-4">';
								modalBlock+='<h6 class="text-capital font_12  font_weight">Absent</h6>';
								if(response[i].inviteeAbsentPerc != null && response[i].inviteeAbsentPerc > 0){
									modalBlock+='<h6 class="text-capital font_weight font_15"><span class="getdesgSummDtlsCls cursorCls underlineCss" attr_sessionId="'+response[i].sessionId+'" attr_divId="'+successParams.divId+'" attr_blockValue="'+successParams.blockValue+'" attr_status="absent" attr_meetingId="'+successParams.partyMeetingId+'" attr_sessionName="'+response[i].name+'" attr_searchRequired="N">'+response[i].inviteeAbsentCount+'</span><small class="color_green ml-2">'+response[i].inviteeAbsentPerc+' %</small></h6>';
								}else{
									modalBlock+='<h6 class="text-capital font_12  font_weight">-</h6>';
								}
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-4">';
								modalBlock+='<h6 class="text-capital font_12  font_weight">late</h6>';
								if(response[i].inviteeAbsentPerc != null && response[i].inviteeAbsentPerc > 0){
									modalBlock+='<h6 class="text-capital font_weight font_15"><span class="getdesgSummDtlsCls cursorCls underlineCss" attr_sessionId="'+response[i].sessionId+'" attr_divId="'+successParams.divId+'" attr_blockValue="'+successParams.blockValue+'" attr_status="late" attr_meetingId="'+successParams.partyMeetingId+'" attr_sessionName="'+response[i].name+'" attr_searchRequired="N">'+response[i].lateAttendedCount+'</span><small class="color_green ml-2">'+response[i].lateAttendedPerc+'%</small></h6>';
								}else{
									modalBlock+='<h6 class="text-capital font_12  font_weight">-</h6>';
								}
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		}
		modalBlock+='</div>';
		$('#'+successParams.blockId).html(modalBlock);
	}
	function buildDesignationWiseSummaryDetails(response,successParams,searchDesignation,isFilter){
		var sessionClrObj = {"intime":"text-success","late":"text-danger"}
		var modalBlock = '';
		if((successParams.type != null && successParams.type == "false") || isFilter ){
			modalBlock+='<div class="card m_top10">';
				modalBlock+='<div class="card-header card_bg pad_10">';
					modalBlock+='<h6 class="font_14 font_weight m_bottom_0">DESIGNATIONS SUMMARY<small class="text-capital"> - '+successParams.sessionName+'( '+successParams.meetingStatus+' )</small></h6>';
				modalBlock+='</div>';
				modalBlock+='<div class="card-body color_bg_white pad_10">';
					for(var i in response[0].publicRepDesgList){
						modalBlock+='<span class="font_13 font_weight text-capital">'+response[0].publicRepDesgList[i].name+'</span> ';
						modalBlock+='(<span class="font_13 font_weight color_green designFilterCls cursorCls" attr_searchRequired="Y" attr_desg_name="'+response[0].publicRepDesgList[i].name+'">'+response[0].publicRepDesgList[i].count+'</span>)';
						if( i!= response[0].publicRepDesgList.length -1 ){
							modalBlock+=' , ';
						}
					}
				modalBlock+='</div>';
			modalBlock+='</div>';
		}
		
		
		modalBlock+='<div class="card m_top10">';
			modalBlock+='<div class="card-header pad_10">';
				modalBlock+='<h6 class="font_14 font_weight m_bottom_0">MEMBER DETAILS</h6>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body color_bg_white pad_10">';
				modalBlock+='<div class="row m_top10">';
					modalBlock+='<div class="col-sm-12">';
						modalBlock+='<div class="table-responsive">';
							modalBlock+='<table class="table table-condensed table_custom_news memberDtlsScrollCls" id="desgSummaryDataTable" style="width:100%;border: 2px solid #dee2e6;">';
								modalBlock+='<thead>';
									modalBlock+='<tr>';
										modalBlock+='<th>District Name</th>';
										modalBlock+='<th>Leader Name</th>';
										modalBlock+='<th>Designation</th>';
										modalBlock+='<th>Contact Number</th>';
										modalBlock+='<th>Invitation Status</th>';  
										modalBlock+='<th>All Sessions</th>';
										if(successParams.type != null && successParams.type == "false"){										
											if(response[0].sessionLevel.length > 0){
												for(var i in response[0].sessionLevel){      
													modalBlock+='<th>'+response[0].sessionLevel[i]+'</th>';
												}  
											}else{
												modalBlock+='<th>Attendance</th>';    
											}
										}else if(successParams.type != null && successParams.type == "meeting"){
											for(var i in response[0].subList){
												modalBlock+='<th>'+response[0].subList[i].name+'</th>';
											}
											
										}
										modalBlock+='<th> Remarks </th>'; 
									modalBlock+='</tr>';
								modalBlock+='</thead>';
								modalBlock+='<tbody>';
								for(var i in response){
									var build = false;
									if(successParams.searchRequired == "Y"){
									  if(response[i].subList != null && response[i].subList.length > 0){
											for( var j in response[i].subList){
												if(response[i].subList[j].trim().toUpperCase() == searchDesignation.trim().toUpperCase()){
													build = true;
													break;
												}
											}
										}
									}else{
										build = true;
									}
									if(build){
										modalBlock+='<tr>';  
											modalBlock+='<td>'+response[i].districtName+'</td>';
											modalBlock+='<td>'+response[i].name+'</td>';
											modalBlock+='<td>'+response[i].status+'</td>';
											modalBlock+='<td>'+response[i].mobileNo+'</td>';
											
											if(successParams.type != null && successParams.type == "false"){
												if(response[i].isInvitee == "true"){
													modalBlock+='<td>Invitee</td>'; 
												}else{
													modalBlock+='<td class="text-danger">Non Invitee</td>';   
												}
												for(var j in response[i].sessionList){
													if(response[i].sessionList[j] == "intime"){
														modalBlock+='<td class="text-success">Y('+(response[i].attendedTimeList[parseInt(j)-1]).substring(0,5)+')</td>';
													}else if(response[i].sessionList[j] == "late"){
														modalBlock+='<td class="text-danger">Y('+(response[i].attendedTimeList[parseInt(j)-1]).substring(0,5)+')</td>';
													}else if(response[i].sessionList[j] == "absent"){  
														modalBlock+='<td>N</td>';  
													}else{  
														modalBlock+='<td>'+response[i].sessionList[j]+'</td>';             
													}  
												}
											}else if(successParams.type != null && successParams.type == "meeting"){
												modalBlock+='<td>'+response[i].status+'</td>';
												modalBlock+='<td>'+response[i].count+'</td>';
												for(var j in response[i].subList){												
													if(response[i].subList[j].sessionStatus != "N"){
														modalBlock+='<td class="'+sessionClrObj[response[i].subList[j].attendedStatus]+'">'+response[i].subList[j].sessionStatus+'('+response[i].subList[j].attendedTime.substring(0,5)+')</td>';
													}else{
														modalBlock+='<td>'+response[i].subList[j].sessionStatus+'</td>';
													}
													
												}
												
											}
											modalBlock+='<td>'+setValue(response[i].remark)+'</td>';   
											
										modalBlock+='</tr>';
									}
								}									
								modalBlock+='</tbody>';
							modalBlock+='</table>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		$('#'+successParams.blockId).html(modalBlock);
		initializeDataTableWithPagination("desgSummaryDataTable");
	}
	
	function buildImagesDetailsByMeeting(response,successParams){
		var modalBlock = '';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12">';
			modalBlock+='<div class="pad_yash_border">';
				modalBlock+='<ul class="list-inline meetingsSlider'+successParams.divId+' m_bottom_0">';
					for(var i in response){
						modalBlock+='<li>';
							modalBlock+='<img class="img-fluid" src="https://mytdp.com/party_meetings/'+response[i].name+'" style="height:150px;width:200px;">';
						modalBlock+='</li>';
					}
				modalBlock+='</ul>';
			modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		$('#'+successParams.blockId).html(modalBlock);
		buildSlickSlider(".meetingsSlider"+successParams.divId);
	}
	return{
		buildSpecialMeetingsOverView : buildSpecialMeetingsOverView,
		buildMeetingTypeAttendanceDetails : buildMeetingTypeAttendanceDetails,
		buildSpecialMeetingTabAttedanceDetails : buildSpecialMeetingTabAttedanceDetails,
		buildOverAllSpecialMeetingDetails : buildOverAllSpecialMeetingDetails,
		buildMeetingsVarianceReport : buildMeetingsVarianceReport,
		buildLevelWiseSpecialMeetingsDetaisCounts : buildLevelWiseSpecialMeetingsDetaisCounts,
		buildOverallAttendedSessionCountsBasedOnMeeting : buildOverallAttendedSessionCountsBasedOnMeeting,
		buildDesignationWiseSummaryDetails : buildDesignationWiseSummaryDetails,
		buildImagesDetailsByMeeting : buildImagesDetailsByMeeting
	};

	
}());

// CLICKS
$(document).on("click",".getMeetingsDetailsCls",function(){
	var meetingTypeId = $(this).attr("attr_meetingId"),
		divId = $(this).attr("attr_divId"),
		blockValue = $(this).attr("attr_blockValue"),
		name = $(this).attr("attr_name");
	$(".meetingClicksCls").removeClass("displayNoneCls");
	$(".mtngsCntAtnDtlsNameId").html(name);
	$("#designationSummaryId"+divId).html("");
	$("html,body").animate({
		scrollTop: $(".meetingClicksCls").offset().top},'slow');
	
	var mtngTypeAtndInputs = {};
	$.extend(mtngTypeAtndInputs,defaultInputs,{"partyMeetingId":meetingTypeId,"type":"meeting","meetingStatus":"attended"});
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getMeetingTypeAttendanceDetails",mtngTypeAtndInputs,divId,blockValue,"meetingsDetailsCountsAttendanceId"+divId);
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getTabAndManualSpecialMeetingAttendanceDetaislByMeetingId",mtngTypeAtndInputs,divId,blockValue,"meetingsDetailsCountsTabAttendanceId"+divId);
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getOverallAttendedSessionCountsBasedOnMeeting",mtngTypeAtndInputs,divId,blockValue,"meetingsDetailsCountsSessionId"+divId);
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getMembersDetailsForSpecialMeetings",mtngTypeAtndInputs,divId,blockValue,"designationSummaryId"+divId);
	//
	$(".imagesSlideDiv").removeClass("displayNoneCls");
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getSpecialMeetingImageDetailsByMeetingWise",mtngTypeAtndInputs,divId,blockValue,"imageDetailsByMeetingId"+divId);	
});

$(document).on("click",".getdesgSummDtlsCls",function(){
	var divId = $(this).attr("attr_divId"),
		blockValue = $(this).attr("attr_blockValue"),
		sessionId = $(this).attr("attr_sessionId"),
		status = $(this).attr("attr_status"),
		meetingTypeId = $(this).attr("attr_meetingId"),
		sessionName = $(this).attr("attr_sessionName"),
		searchRequired = $(this).attr("attr_searchRequired");
		$("html,body").animate({
			scrollTop: $(".desigScrollCls").offset().top},'slow');
		var desgInputs = {};
	$.extend(desgInputs,defaultInputs,{"partyMeetingId":meetingTypeId,"filterId" : "","sessionId" : sessionId,"meetingStatus" : status,"sessionName": sessionName,"searchRequired":searchRequired})
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getSpecialMeetingMemberDtls",desgInputs,divId,blockValue,"designationSummaryId"+divId);
	
});


function buildSlickSlider(selectorName){
	$(selectorName).slick({
			 slide: 'li',
			 slidesToShow: 6,
			 slidesToScroll: 2,
			 infinite: false,
			 responsive: [
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: 4,
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
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			  ]
		});
}
$(document).on("click",".splMeetingsClkCls",function(){
	var blockValue = $(this).attr("attr_blockValue"),
		divId = $(this).attr("attr_divId"),
		chosenLabel = $(this).attr("attr_chosenLabel"),
		name = $(this).attr("attr_name");
		$(".splMtngExpTitleId").html(name);
		$("html,body").animate({
			scrollTop: $(".scrollDivCls").offset().top},'slow');
			
		basicSpecialMeetingDetails(blockValue,divId,chosenLabel,divId);		
	
});
$(document).on("click",".memberDtlsCls",function(){
	var meetingTypeId = $(this).attr("attr_meetingId"),
		divId = $(this).attr("attr_divId"),
		blockValue = $(this).attr("attr_blockValue"),	
		meetingStatus = $(this).attr("attr_meetingStatus");
	$(".meetingClicksCls").removeClass("displayNoneCls");
	$("html,body").animate({
			scrollTop: $(".desigScrollCls").offset().top},'slow');
	var mtngTypeAtndInputs = {};
	$.extend(mtngTypeAtndInputs,defaultInputs,{"partyMeetingId":meetingTypeId,"type":"meeting","meetingStatus":meetingStatus});
	specialMeetingsComponent.ajax.specialMeetingAjaxCalls("getMembersDetailsForSpecialMeetings",mtngTypeAtndInputs,divId,blockValue,"designationSummaryId"+divId);
});

$(document).on("click",".designFilterCls",function(){
	var searchRequired = $(this).attr("attr_searchRequired"),
		desgnationName = $(this).attr("attr_desg_name");
		$("html,body").animate({
			scrollTop: $(".memberDtlsScrollCls").offset().top},'slow');
	var searchParams = {};
	$.extend(searchParams,globalSuccessParams,{"searchRequired" : searchRequired});
	specialMeetingsComponent.buildAjaxCallResult.buildDesignationWiseSummaryDetails(globalDesigResponse,searchParams,desgnationName,true);
});
