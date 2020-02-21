var alertBasicTypeId=0;
var impactLevelAlert="";
var alert_categoryIdsArr=[];
function basicPoliticalAlertsDetails(blockValue,alert_categoryIds){
	var modalBlock='';
	modalBlock+='<div class="row">';
			modalBlock+='<div class="col">';
				modalBlock+='<h6 class="font_weight">OVERALL ALERTS</h6>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col">';
				modalBlock+='<div id="overAllPoliticalAlertsDivId"></div>';
			modalBlock+='</div>'; 
		modalBlock+='</div>';
		
		modalBlock+='<div class="row">';
				modalBlock+='<div class="col m_top20">';
					modalBlock+='<h6 class="font_weight">VARIANCE REPORT - <small class="text-uppercase">OverAll</small></h6>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="new_border_yash_pad">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="form-check form-check-inline">';
					modalBlock+='<input class="form-check-input variationCls" name="inlineRadioOptionsV" type="radio" id="inlineCheckboxV1" value="" checked>';
					modalBlock+='<label class="form-check-label" for="inlineCheckboxV1">All</label>';
				modalBlock+='</div>';
				modalBlock+='<div class="form-check form-check-inline">';
				if(blockValue == 1){
					modalBlock+='<input class="form-check-input variationCls" name="inlineRadioOptionsV" type="radio" id="inlineCheckboxV2" value="2">';
				}else{
					modalBlock+='<input class="form-check-input variationCls" name="inlineRadioOptionsV" type="radio" id="inlineCheckboxV2" value="11">';
				}
					modalBlock+='<label class="form-check-label text-uppercase" for="inlineCheckboxV2">Print Media</label>';
				modalBlock+='</div>';
				modalBlock+='<div class="form-check form-check-inline">';
				if(blockValue == 1){
					modalBlock+='<input class="form-check-input variationCls" name="inlineRadioOptionsV" type="radio" id="inlineCheckboxV3" value="3">';
				}else{
					modalBlock+='<input class="form-check-input variationCls" name="inlineRadioOptionsV" type="radio" id="inlineCheckboxV3" value="12">';
				}
					
					modalBlock+='<label class="form-check-label text-uppercase" for="inlineCheckboxV3">Electronic Media</label>';
				modalBlock+='</div>';
				if(blockValue == 1){
					modalBlock+='<div class="form-check form-check-inline">';
						modalBlock+='<input class="form-check-input variationCls" name="inlineRadioOptionsV"  type="radio" id="inlineCheckboxV4" value="1">';
						modalBlock+='<label class="form-check-label text-uppercase" for="inlineCheckboxV4">Manual</label>';
					modalBlock+='</div>';
				}
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col m_top10">';
				modalBlock+='<div id="variationPoliticalAlertsDivId"></div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="row">';
				modalBlock+='<div class="col m_top20">';
					modalBlock+='<h6 class="font_weight">STATUS WISE REPORT</h6>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="new_border_yash_pad">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="form-check form-check-inline">';
					modalBlock+='<input class="form-check-input comparisionCls" name="inlineRadioOptions" type="radio" id="inlineCheckbox1" value="" checked/>';
					modalBlock+='<label class="form-check-label" for="inlineCheckbox1">All</label>';
				modalBlock+='</div>';
				modalBlock+='<div class="form-check form-check-inline">';
					modalBlock+='<input class="form-check-input comparisionCls" name="inlineRadioOptions" type="radio" id="inlineCheckbox2" value="1"/>';
					modalBlock+='<label class="form-check-label" for="inlineCheckbox2">PENDING</label>';
				modalBlock+='</div>';
				modalBlock+='<div class="form-check form-check-inline">';
					modalBlock+='<input class="form-check-input comparisionCls" name="inlineRadioOptions"  type="radio" id="inlineCheckbox3" value="2"/>';
					modalBlock+='<label class="form-check-label" for="inlineCheckbox3">NOTIFIED</label>';
				modalBlock+='</div>';
				modalBlock+='<div class="form-check form-check-inline">';
					modalBlock+='<input class="form-check-input comparisionCls" name="inlineRadioOptions" type="radio" id="inlineCheckbox4" value="3"/>';
					modalBlock+='<label class="form-check-label" for="inlineCheckbox4">ACTION IN PROGRESS</label>';
				modalBlock+='</div>';
				modalBlock+='<div class="form-check form-check-inline">';
					modalBlock+='<input class="form-check-input comparisionCls" name="inlineRadioOptions" type="radio" id="inlineCheckbox5" value="4"/>';
					modalBlock+='<label class="form-check-label" for="inlineCheckbox5">COMPLETED</label>';
				modalBlock+='</div>';
				modalBlock+='<div class="form-check form-check-inline">';
					modalBlock+='<input class="form-check-input comparisionCls" name="inlineRadioOptions" type="radio" id="inlineCheckbox6" value="others"/>';
					modalBlock+='<label class="form-check-label" for="inlineCheckbox6">OTHERS</label>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col m_top10">';
				modalBlock+='<div id="comparisionPoliticalAlertsDivId"></div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		
		modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-8 m_top10">';
					modalBlock+='<h6 class="font_weight m_bottom_0" style="position: relative;top: 15px;">CONSOLIDATED VIEW OF EXCEPTIONAL REPORTS</h6>';
			modalBlock+='</div>';
			modalBlock+='<div class="col-sm-4 m_top10 float-right">';
				modalBlock+='<ul class="list-inline switch-btn-New politicalAlertsVarStatusCls float-right m_bottom_0">';
						modalBlock+='<li attr_type="variance">VARIANCE WISE</li>';
						modalBlock+='<li attr_type="status" class="active">STATUS WISE</li>';
				modalBlock+='</ul>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="row">';
				modalBlock+='<div class="col">';
					modalBlock+='<div id="consoliatedPoliticalAlertsDivId"></div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		$(".blockWiseModalDivId").html(modalBlock);
		$(".tooltipCls").tooltip();
		
		onloadPoliticalAlertModalCalls(blockValue,alert_categoryIds);
}
function onloadPoliticalAlertModalCalls(blockValue,alert_categoryIds){
	if(blockValue == 1){
		alertBasicTypeId=1;
		impactLevelAlert="";
	}else if(blockValue == 2){
		alertBasicTypeId=2;
		impactLevelAlert="state";
	}else{
		alertBasicTypeId=2;
		impactLevelAlert="district";
	}
	alert_categoryIdsArr=[];
	var stringIds = alert_categoryIds,
		strx   = stringIds.split(',');
	alert_categoryIdsArr = alert_categoryIdsArr.concat(strx);
	
	getOverAllAlertStatusWiseDetails();
	getPoliticalAlertStatusWiseOverviewDetails("");
	getAlertImpactLevelComparsionDetails("");
	buildExceptionalReportCalls("totalAlert");
}
$(document).on("click",".variationCls",function(){
	$('.variationCls').not(this).prop('checked', false);
	var value = $(this).val();
	getPoliticalAlertStatusWiseOverviewDetails(value);
});
$(document).on("click",".comparisionCls",function(){
	$('.comparisionCls').not(this).prop('checked', false);
	var value = $(this).val();
	getAlertImpactLevelComparsionDetails(value);
});
$(document).on("click",".alertExceptionalCls",function(){
	$('.alertExceptionalCls').not(this).prop('checked', false);
	var value = $(this).attr("attr_val");
	buildExceptionalReportCalls(value);
});
function getOverAllAlertStatusWiseDetails(){
		$("#overAllPoliticalAlertsDivId").html(spinner);
		var Arr=["1","2","3","4","6","7"];// alert status(pending,notified,action in progress,completed,action not required, dupilcate)
		
		var json={
			"fromDateStr":customStartDate,
			"toDateStr":customEndDate,
			"stateId" : 1,
			"activityMemberId":"44",
			"alertStatusIds":Arr,
			"edtionsIds":["1","2","3"],  
			"alertBasicTypeId":alertBasicTypeId,
			"impactLevel":impactLevelAlert
		};
		 $.ajax({
            url: "getOverAllAlertStatusWiseDetails",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	if(result !=null){
					buildOverAllAlertStatusWiseDetails(result);
				}else{
					$("#overAllPoliticalAlertsDivId").html("No Data Available");
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
}

function buildOverAllAlertStatusWiseDetails(result){
	var modalBlock='';
	var statusObj={'Completed':'far fa-check-circle','Pending':'far fa-pause-circle','Notified':'fas fa-exclamation-triangle','Action In Progress':'fas fa-spinner'}
	var statusColorObj={'Completed':'green','Pending':'#F4D701','Notified':'#9C95AE','Action In Progress':'#00ABD1'}
	
	modalBlock+='<div class="new_border_yash_pad">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12">';
					modalBlock+='<div class="mainBlockUl">';
						modalBlock+='<ul class="list-inline blocksLi">';
							modalBlock+='<li>';
								modalBlock+='<span class="text-capital">PARTY</span>';
								modalBlock+='<div class="row">';
									modalBlock+='<div class="col-sm-6">';
									if(result.count !=null && result.count>0){
										modalBlock+='<h5 class="font_weight m_top5">'+result.count+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
									}
										
									modalBlock+='</div>';
									modalBlock+='<div class="col-sm-6">';
										modalBlock+='<img src="Core/images/tdp_logo.png" class="float-right" style="height:40px;width:40px;border-radius:50%"/>';
									modalBlock+='</div>';
								modalBlock+='</div>';
								
							modalBlock+='</li>';
							if(result.sublist !=null && result.sublist.length>0){
								for(var i in result.sublist){
									modalBlock+='<li>';
										modalBlock+='<span class="text-capital">'+result.sublist[i].status+'</span>';
										modalBlock+='<div class="row">';
											modalBlock+='<div class="col-sm-6">';
												if(result.sublist[i].count !=null && result.sublist[i].count>0){
													modalBlock+='<h5 class="font_weight m_top5 politicalAlertsClkCls" attr_block="overall" attr_from_date="'+customStartDate+'" attr_to_date="'+customEndDate+'" attr_click_type="overallAlerts" attr_alert_status="'+result.sublist[i].statusIds+'" attr_alerts_head="'+result.sublist[i].status+'">'+result.sublist[i].count+'</h5>';
												}else{
													modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
												}
												
											modalBlock+='</div>';
											modalBlock+='<div class="col-sm-6">';
												modalBlock+='<i class="'+statusObj[result.sublist[i].status]+' fa-2x float-right" style="color:'+statusColorObj[result.sublist[i].status]+';"></i>';
											modalBlock+='</div>';
										modalBlock+='</div>';
										
									modalBlock+='</li>';
								}
							}
							
						modalBlock+='</ul>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
	$("#overAllPoliticalAlertsDivId").html(modalBlock)
}
function getPoliticalAlertStatusWiseOverviewDetails(alertCategoryId){
	$("#variationPoliticalAlertsDivId").html(spinner);
	    var alertCategoryIds=[];
		if(alertCategoryId == ""){
			alertCategoryIds=alert_categoryIdsArr;
		}else{
			alertCategoryIds.push(alertCategoryId);
		}
		
		var json={  
			  "fromDateStr":"",
			  "toDateStr":"",
			  "stateId" : 1,  
			  "activityMemberId":"44",
			  "alertCategoryIds" :alertCategoryIds,
			  "alertBasicTypeId":alertBasicTypeId,
			  "impactLevel":impactLevelAlert
		};
		 $.ajax({
            url: "getPoliticalAlertStatusWiseOverviewDetails",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	if(result !=null && result.subList !=null && result.subList.length>0){
					buildPoliticalAlertStatusWiseOverviewDetails(result);
				}else{
					$("#variationPoliticalAlertsDivId").html("No Data Available")
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
}

function buildPoliticalAlertStatusWiseOverviewDetails(result){
	var str='';
	var statusObj={'CLOSED':'COMPLETED','IN PROGRESS':'ACTION IN PROGRESS','OTHERS':'OTHERS','NOTIFIED':'NOTIFIED','PENDING':'PENDING'}
	str+='<div class="new_border_yash_pad">';
		str+='<div class="col">';
			str+='<div class="table-responsive">';
				str+='<table class="table table_custom_css" id="variationDataTableId" style="width:100%">';
					str+='<thead>';
						str+='<tr>';
							str+='<th class="no-sort"></th>';
							str+='<th>INCREASE/DECREASE</th>';
							for(var i in result.subList[0].statusList){
								str+='<th>'+result.subList[0].statusList[i].name+'</th>';
							}
						str+='</tr>';        
					str+='</thead>';
					str+='<tbody>';
						for(var i in result.subList){
							str+='<tr>';
								str+='<td>'+result.subList[i].name+'</td>';
								str+='<td>';
									if(result.subList[i].impact == "positive"){
										if(result.subList[i].percentage !=null && result.subList[i].percentage>0){
											str+='<span class="color_green"> '+result.subList[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-down color_green"></i> </span> ';
										}else{
											str+='<span class="color_green"> - </span> ';
										}
										
									}else{
										if(result.subList[i].percentage !=null && result.subList[i].percentage>0){
											str+='<span class="color_red"> '+result.subList[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-up color_red"></i> </span> ';
										}else{
											str+='<span class="color_red"> - </span> ';
										}
										
									}
								str+='</td>';
								
								for(var j in result.subList[i].statusList){
									if(result.subList[i].statusList[j].alertCnt !=null && result.subList[i].statusList[j].alertCnt>0){
										str+='<td class="politicalAlertsClkCls" attr_block="categeory" attr_click_type="overallAlerts" attr_from_date="'+result.subList[i].fromDateStr+'" attr_to_date="'+result.subList[i].toDateStr+'" attr_alert_status="'+result.subList[i].statusList[j].statusIds+'" attr_alerts_head="'+result.subList[i].name+'">'+result.subList[i].statusList[j].alertCnt+'</td>';
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
	$("#variationPoliticalAlertsDivId").html(str);
	initializeDataTableWithOutPagination("variationDataTableId");
	$("#variationDataTableId").tableHeadFixer({"head" : false, "left" : 1}); 
}

function getAlertImpactLevelComparsionDetails(alertStatusId){
	$("#comparisionPoliticalAlertsDivId").html(spinner);
	    var alertStatusIds=[];
		if(alertStatusId == ""){
			alertStatusIds=[];
		}else if(alertStatusId == "others"){
			alertStatusIds.push(6)
			alertStatusIds.push(7)
		}else{
			alertStatusIds.push(alertStatusId)
		}
		var json={  
			   "fromDateStr":customStartDate,
			   "toDateStr":customEndDate,
			    "stateId" : 1,  
			   "activityMemberId":"44",
			   "alertStatusIds":alertStatusIds,
			   "alertBasicTypeId":alertBasicTypeId,
			   "impactLevel":impactLevelAlert 
		};
		 $.ajax({
            url: "getAlertImpactLevelComparsionDetails",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	if(result !=null && result.length>0){
					buildAlertImpactLevelComparsionDetails(result);
				}else{
					$("#comparisionPoliticalAlertsDivId").html("No Data Available")
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
}

function buildAlertImpactLevelComparsionDetails(result){
	var str='';
	str+='<div class="new_border_yash_pad">';
		str+='<div class="col">';
			str+='<div class="table-responsive">';
				str+='<table class="table table_custom_css" id="comparisionDataTableId"  style="width:100%">';
					str+='<thead>';
						str+='<tr>';
							str+='<th class="no-sort"><span>LOCATION</span>/<span class="loaction_bottom">IMPACT</span></th>';
							for(var i in result[0].sublist){
								if(result[0].sublist[i].impactStatus == "VILLAGE/WARD/PANCHAYAT"){
									str+='<th>VILLAGE/WARD</th>';
								}else{
									str+='<th>'+result[0].sublist[i].impactStatus+'</th>';
								}
								
							}
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						for(var i in result){
							str+='<tr>';
								str+='<td>'+result[i].locationScope+'</td>';
								for(var j in result[i].sublist){
									if(result[i].sublist[j].count != 0 && result[i].sublist[j].count != null && result[i].sublist[j].count != "undefined"){
										str+='<td class="politicalAlertsClkCls" attr_click_type="locationBlock" attr_block="status" attr_location_scope="0" attr_location_value="" attr_impact_level="'+result[i].locationScopeId+'" attr_scope_id="'+result[i].sublist[j].impactId+'" attr_alerts_head="'+result[i].locationScope+'">'+result[i].sublist[j].count+'</td>';
									} else {
										str+='<td>-</td>';           
									}
								}
							str+='</tr>';
						}
					str+='</tbody>';
					
				str+='</table>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#comparisionPoliticalAlertsDivId").html(str);
	initializeDataTableWithOutPagination("comparisionDataTableId");
	$("#comparisionDataTableId").tableHeadFixer({"head" : false, "left" : 1}); 
}

function buildExceptionalReportCalls(alertType){
	var str='';
	var excepArr=[{blockId:3,id:'District',name:'DISTRICT'},{blockId:5,id:'Parliament',name:'PARLIMENT'},{blockId:5,id:'Constituency',name:'CONSTITUENCY'}];
	for(var i in excepArr){
			str+='<div class="new_border_yash_pad pad_15 m_top5">';
				str+='<div class="row">';
				str+='<div class="col-sm-12">';
				 if(excepArr[i].name != "DISTRICT"){
					str+='<h6 class="text-uppercase m_top10 font_weight font_14">';
				 }else{
					 str+='<h6 class="text-uppercase font_weight font_14">';
				 }	
					 if(excepArr[i].name == "CONSTITUENCY"){
						str+='<span class="statusBlockCls">'; 
						str+=''+excepArr[i].name+' WISE  STATUS ALERTS DETAILS</span>';
						str+='<span class="varianceBlockCls" style="display:none;">CONSTITUENCY WISE VARIANCE DETAILS</span></h6>'; 
					}else if(excepArr[i].name == "PARLIMENT"){
						str+='<span class="statusBlockCls">'; 
						str+=''+excepArr[i].name+' WISE  STATUS ALERTS DETAILS </span>';
						str+='<span class="varianceBlockCls" style="display:none;">PARLIAMENT WISE VARIANCE DETAILS</span></h6>'; 
					}else{
						str+=' <span class="statusBlockCls">'+excepArr[i].name+' WISE  STATUS ALERTS DETAILS</span> <span class="varianceBlockCls" style="display:none;">'+excepArr[i].name+' VARIANCE DETAILS</span> </h6>';
					}
					
					
				str+='</div>';
			str+='</div>';
			str+='<div class="row">';
				str+='<div class="col">';
					str+='<div id="exceptionalReportVariance'+excepArr[i].id+'Block" class="varianceBlockCls" style="display:none;"></div>';
					str+='<div id="exceptionalReport'+excepArr[i].id+'" class="statusBlockCls"></div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	
	$("#consoliatedPoliticalAlertsDivId").html(str);
	for(var i in excepArr){
		if(excepArr[i].id != "Parliament"){
			getLocationWiseAlertExceptionalReportsDetails(excepArr[i].blockId,alertType,excepArr[i].id,excepArr[i].name,13);
		}
		
	}
	
	getParliamentWiseAlertExceptionalReportsDetails(5,alertType,"Parliament","PARLIMENT",7);
}	

function getLocationWiseAlertExceptionalReportsDetails(locationScopeId,sortingType,divId,name,constituencyCountVar){
	    $("#exceptionalReport"+divId).html(spinner);
		var json={  
			"activityMemberId": 44,
			"stateId": 1,  
			"locationScopeId": locationScopeId, //3-district,5-constituency
			"sortingType":sortingType, // totalAlert,Completed,Pending,ActionRequired
			"fromDateStr":customStartDate,
			"toDateStr":customEndDate,
			"alertBasicTypeId":alertBasicTypeId,
			"impactLevel":impactLevelAlert                               
		};
		 $.ajax({
            url: "getLocationWiseAlertExceptionalReportsDetails",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	if(result !=null && result.length>0){
					buildLocationWiseAlertExceptionalReportsDetails(result,divId,name,sortingType,constituencyCountVar);
				}else{
					$("#exceptionalReport"+divId).html("No Data Available")
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
	}
	
function getParliamentWiseAlertExceptionalReportsDetails(locationScopeId,sortingType,divId,name,parliamentCountVar){
	     $("#exceptionalReport"+divId).html(spinner);
		var json={  
			    "activityMemberId": 44,
				"stateId": 1,
				"locationScopeId":locationScopeId,
				"sortingType":sortingType, // totalAlert,Completed,Pending,ActionRequired
				"fromDateStr":customStartDate,
			    "toDateStr":customEndDate,
				"alertBasicTypeId":alertBasicTypeId,
				"impactLevel":impactLevelAlert               
		};
		 $.ajax({
            url: "getParliamentWiseAlertExceptionalReportsDetails",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	if(result !=null && result.length>0){
					buildParliamentWiseAlertExceptionalReportsDetails(result,divId,name,sortingType,parliamentCountVar);
				}else{
					$("#exceptionalReport"+divId).html("No Data Available")
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
	}
	
	function buildLocationWiseAlertExceptionalReportsDetails(result,divId,name,sortingType,constituencyCountVar){
		var str='';
		var countVar =0;
		var statusNamesObj={'totalAlert':'total','Completed':'Completed','Pending':'Pending','ActionRequired':'Action Required'}
		
		
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_table" id="dataTableId'+divId+'" style="width:100%;">';
						str+='<thead>';
							str+='<tr>';
								if(divId == "District"){
									str+='<th>District</th>';
								}else if(divId == "Constituency"){
									str+='<th>Constituency</th>';
								}
								//str+='<th>Total Alerts</th>';
								str+='<th>Action Required</th>';
								//str+='<th>%</th>';
								str+='<th>Completed</th>';
								str+='<th>%</th>';
								str+='<th>Pending</th>';
								str+='<th>%</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td>'+result[i].name+'</td>';
									//str+='<td>'+result[i].totalAlert+'</td>';
									if(result[i].actionRequired != 0 && result[i].actionRequired != null && result[i].actionRequired != "undefined"){
										str+='<td class="politicalAlertsClkCls" attr_click_type="locationBlock" attr_status_name="ActionRequired" attr_block="location" attr_location_scope="'+divId+'" attr_location_value="'+result[i].id+'" attr_impact_level="" attr_scope_id="" attr_alerts_head="'+result[i].name+'">'+emptyCheck(result[i].actionRequired)+'</td>';
									} else {
										str+='<td>-</td>';
									}
									//str+='<td class="color_green font_weight">'+result[i].actionRequiredPer+'</td>';
									if(result[i].completed != 0 && result[i].completed != null && result[i].completed != "undefined"){
										str+='<td class="politicalAlertsClkCls" attr_click_type="locationBlock" attr_status_name="completed" attr_block="location" attr_location_scope="'+divId+'" attr_location_value="'+result[i].id+'" attr_impact_level="" attr_scope_id="" attr_alerts_head="'+result[i].name+'">'+emptyCheck(result[i].completed)+'</td>';
									} else {
										str+='<td>-</td>';
									}
									str+='<td class="color_green font_weight">'+emptyCheck(result[i].completedPer)+'</td>';
									if(result[i].pending != 0 && result[i].pending != null && result[i].pending != "undefined"){
										str+='<td class="politicalAlertsClkCls" attr_click_type="locationBlock" attr_status_name="pending" attr_block="location" attr_location_scope="'+divId+'" attr_location_value="'+result[i].id+'" attr_impact_level="" attr_scope_id="" attr_alerts_head="'+result[i].name+'">'+emptyCheck(result[i].pending)+'</td>';
									} else {
										str+='<td>-</td>';
									}	
									str+='<td class="color_green font_weight">'+emptyCheck(result[i].pendingPer)+'</td>';
								str+='</tr>';
								/*  countVar =countVar+1;
									if (countVar === constituencyCountVar) {
										break;
									} */
								
							}
						str+='</tbody>';
						
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		$("#exceptionalReport"+divId).html(str);
		if(divId == "Constituency"){
			initializeDataTableWithPagination("dataTableId"+divId);
		}else{
			initializeDataTableWithOutPagination("dataTableId"+divId);
		}
		 
		 $("#dataTableId"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
		 $("#dataTableIdConstituency_length").remove();
	}
	
	function buildParliamentWiseAlertExceptionalReportsDetails(result,divId,name,sortingType,parliamentCountVar){
		var str='';
		var countVar =0;
		var statusNamesObj={'totalAlert':'total','Completed':'Completed','Pending':'Pending','ActionRequired':'Action Required'}
		str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_table" id="dataTableId'+divId+'" style="width:100%;">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Parliament</th>';
								//str+='<th>Total Alerts</th>';
								str+='<th>Action Required</th>';
								//str+='<th>%</th>';
								str+='<th>Completed</th>';
								str+='<th>%</th>';
								str+='<th>Pending</th>';
								str+='<th>%</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
							for(var i in result){
								str+='<tr>';
									str+='<td>'+result[i].name+'</td>';
									//str+='<td>'+result[i].totalAlert+'</td>';
									if(result[i].actionRequired != 0 && result[i].actionRequired != null && result[i].actionRequired != "undefined"){
										str+='<td class="politicalAlertsClkCls" attr_click_type="locationBlock" attr_status_name="ActionRequired" attr_block="location" attr_location_scope="Parliament" attr_location_value="'+result[i].id+'" attr_impact_level="" attr_scope_id="" attr_alerts_head="'+result[i].name+'">'+emptyCheck(result[i].actionRequired)+'</td>';
									} else {
										str+='<td>-</td>';
									}
									//str+='<td class="color_green font_weight">'+result[i].actionRequiredPer+'</td>';
									if(result[i].completed != 0 && result[i].completed != null && result[i].completed != "undefined"){
										str+='<td class="politicalAlertsClkCls" attr_click_type="locationBlock" attr_status_name="completed"  attr_block="location" attr_location_scope="'+divId+'" attr_location_value="'+result[i].id+'" attr_impact_level="" attr_scope_id=""attr_alerts_head="'+result[i].name+'">'+emptyCheck(result[i].completed)+'</td>';
									} else {
										str+='<td>-</td>';
									}	
									str+='<td class="color_green font_weight">'+emptyCheck(result[i].completedPer)+'</td>';
									if(result[i].pending != 0 && result[i].pending != null && result[i].pending != "undefined"){
										str+='<td class="politicalAlertsClkCls" attr_click_type="locationBlock" attr_status_name="pending" attr_block="location" attr_location_scope="'+divId+'" attr_location_value="'+result[i].id+'" attr_impact_level="" attr_scope_id="" attr_alerts_head="'+result[i].name+'">'+result[i].pending+'</td>';
									} else {
										str+='<td>-</td>';
									}	
									str+='<td class="color_green font_weight">'+emptyCheck(result[i].pendingPer)+'</td>';
								str+='</tr>';
								/* countVar =countVar+1;
								if (countVar == parliamentCountVar) {
									break;
								} */
								
							}
						str+='</tbody>';
						
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		$("#exceptionalReport"+divId).html(str);
		initializeDataTableWithPagination("dataTableId"+divId);
		$("#dataTableId"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
	}
	
	
$(document).on("change",".parliamentWiseSelectedRangeCls",function(){
	var parliamentCountVar = $(this).val();
	getParliamentWiseAlertExceptionalReportsDetails(5,"totalAlert","Parliament","PARLIMENT",parliamentCountVar);
});

$(document).on("change",".constituencyWiseSelectedRangeCls",function(){
	var constituencyCountVar = $(this).val();
	getLocationWiseAlertExceptionalReportsDetails(5,"totalAlert","Constituency","CONSTITUENCY",constituencyCountVar);
});

$(document).on("click",".politicalAlertsVarStatusCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	if(type == "variance"){
		$(".varianceBlockCls").show();
		$(".statusBlockCls").hide();
		var locationArr=[{blockId:3,id:'District'},{blockId:4,id:'Parliament'},{blockId:5,id:'Constituency'}];
		for(var i in locationArr){
			getDistrictWiseVarianceReport(locationArr[i].blockId,locationArr[i].id);
		}
	}else{
		$(".varianceBlockCls").hide();
		$(".statusBlockCls").show();
	}
});

function getDistrictWiseVarianceReport(locationScopeId,divId){
	$("#exceptionalReportVariance"+divId+"Block").html(spinner);
	var json={  
		 "fromDateStr":"",
		 "toDateStr":"",
		 "stateId":"1",
		 "activityMemberId":"44",
		 "alertTypeId":1,
		 "locationScopeId":locationScopeId,
		 "alertBasicTypeId":alertBasicTypeId,
		 "impactLevel":impactLevelAlert                        
	};
	 $.ajax({
		url: "getDistrictWiseVarianceReport",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.subList !=null && result.subList.length>0){
				buildDistrictWiseVarianceReport(result,divId,locationScopeId);
			}else{
				$("#exceptionalReportVariance"+divId+"Block").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildDistrictWiseVarianceReport(result,divId,locationScopeId){
	var str='';
	
	str+='<div class="row">';
			str+='<div class="col">';
				str+='<div class="table-responsive">';
					str+='<table class="table table_custom_table1 table-bordered" id="dataTableIdVarianceReport'+divId+'"  style="width:100%">';
						str+='<thead>';
							str+='<tr>';
								if(locationScopeId == 3){
									str+='<th rowspan="2">District</th>';
								}else if(locationScopeId == 4){
									str+='<th rowspan="2">Parliament</th>';
								}else if(locationScopeId == 5){
									str+='<th rowspan="2">Constituency</th>';
								}
								
								for(var i in result.subList[0].subList){
									str+='<th colspan="3">'+result.subList[0].subList[i].name+'</th>';
								}
							str+='</tr>';
							str+='<tr>';
							for(var i in result.subList[0].subList){
								str+='<th>Present</th>';
								str+='<th>Past</th>';
								str+='<th>Variance</th>';
							}	
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
							for(var i in result.subList){
								str+='<tr>';
									str+='<td>'+result.subList[i].name+'</td>';
									for(var j in result.subList[i].subList){
										if(result.subList[i].subList[j].presentTotal !=null && result.subList[i].subList[j].presentTotal>0){
											str+='<td>'+result.subList[i].subList[j].presentTotal+'</td>';
										}else{
											str+='<td> - </td>';
										}
										if(result.subList[i].subList[j].futureTotal !=null && result.subList[i].subList[j].futureTotal>0){
											str+='<td>'+result.subList[i].subList[j].futureTotal+'</td>';
										}else{
											str+='<td> - </td>';
										}
										if(result.subList[i].subList[j].percentage !=null && result.subList[i].subList[j].percentage>0){
											str+='<td>';
											if(result.subList[i].subList[j].impact == "positive"){
												
												str+='<span class="color_green">'+result.subList[i].subList[j].percentage.toFixed(0)+'%</span> <span class=""><i class="fas fa-arrow-down  color_green"></i></span>';
											}else{
												str+='<span class=" color_red">'+result.subList[i].subList[j].percentage.toFixed(0)+'%</span> <span class=""><i class="fas fa-arrow-up color_red"></i></span>';
											}
											str+='</td>';
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
		$("#exceptionalReportVariance"+divId+"Block").html(str);
		if(divId == "District"){
			initializeDataTableWithOutPagination("dataTableIdVarianceReport"+divId);
		}else{
			initializeDataTableWithPagination("dataTableIdVarianceReport"+divId);
		}
		$("#dataTableIdVarianceReport"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
}
function emptyCheck(filedValue){
	var returnVal = ' - ';
	if( filedValue !=null && filedValue > 0){
		returnVal = filedValue;
	}
	return returnVal;
}