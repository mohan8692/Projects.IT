var componentTypeIds=[];
var globalResultsCollabrate="";
function basicActionBotsAlertsDetails(blockValue){
	var modalBlock='';
		modalBlock+='<div class="row">';
				modalBlock+='<div class="col">';
					modalBlock+='<h6 class="font_weight">OVERALL ALERTS</h6>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col">';
					modalBlock+='<div id="overAllActionBotsAlertsDivId"></div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			
		modalBlock+='<div id="actiobalActionBotsBlockDivId"></div>';
		
		modalBlock+='<div id="actionBotsCategoryLevelBlockDivId"></div>';
		
		modalBlock+='<div id="categoryWiseAlertsBlockDivId"></div>';
		
		modalBlock+='<div id="locationWiseActionBotsAlertsOverAllDivId"></div>';
		
	$(".blockWiseModalDivId").html(modalBlock);
	$(".tooltipCls").tooltip();
	
	onloadActionBotsAlertModalCalls(blockValue);
}
function onloadActionBotsAlertModalCalls(blockValue){
	componentTypeIds = [];
	if(blockValue == 0){
		componentTypeIds =[1,2,3,4,5,6];
	}else{
		componentTypeIds.push(blockValue);
		
	}
	getStatusWiseOveralAlerts(blockValue);
	getComponentWiseActionBotsDetails();
	getComponentWiseCategoryDetails();
	
	categoryWiseVarianceDetails(blockValue);
	getLocationWiseActionBoatsDetails(blockValue);
	
}
$(document).on("click",".actionBotsClkCls",function(){
	var actionBotsCategory = [];
	var componentArr = [];
	var alertStatusArr=[];
	var alertStatusIdsArr=[];
	$("#actionBotsSubClickDetailsDivId").html('');
	var clickType = $(this).attr("attr_click_type");
	var locationLevel = $(this).attr("attr_location_level");
	var locationId = $(this).attr("attr_location_id");
	var alertStatus = $(this).attr("attr_alert_status");
	var jsonType = $(this).attr("attr_json_type");
	var categoryName = $(this).attr("attr_categoty_name");
	var botName = $(this).attr("attr_bot_name");
	var botType = $(this).attr("attr_type");
	var categoryId = $(this).attr("attr_category_id");
	var is_alert_status = $(this).attr("attr_is_alert_status");
	var componentId = $(this).attr("attr_component_type")
	
	
	if(clickType == "alertClick"){
		if(alertStatus !=null && alertStatus.length > 0){
			var statusids =alertStatus.split(",");
			alertStatusIdsArr = alertStatusIdsArr.concat(statusids);
		}
		if(componentId == 0){
			componentArr = [1,2,3,4]
		}else{
			componentArr.push(componentId);
		}
	}else{
		componentArr.push(componentId);
	}
	
	
	if(is_alert_status == 0){
		alertStatusArr=[2,3,4];
	}else{
		if(is_alert_status == "open"){
			alertStatusArr=[2,3];
		}else if(is_alert_status == "closed"){
			alertStatusArr=[4];
		}else if(is_alert_status == "total"){
			alertStatusArr=[2,3,4];
		}else{
			alertStatusArr.push(is_alert_status)
		}
		
	}
	
	if(categoryId ==0){
		actionBotsCategory=[];
	}else{
		actionBotsCategory.push(categoryId);
	}
	
	
	
	$("#actionBotsModalDivId").modal("show");
	if(clickType == "alertClick"){
		$("#actionBotsHeadingId").html("ALERTS");
	}else if(clickType !="collaboratorsSubClick"){
		$("#actionBotsHeadingId").html(categoryName);
	}
	
	
	if(clickType == "botsClick") {
		getComponentWiseBotsDetailsClick("actionBotsDetailsDivId",botType,componentArr,actionBotsCategory,categoryName,botName,clickType);
	} else if(clickType == "collaboratorsClick") {
		globalResultsCollabrate="";
		getCollaboratorsWiseFilledBotsAndAssignedAlertsDetailsClick("actionBotsDetailsDivId",botType,componentArr,categoryName,botName,clickType,actionBotsCategory,categoryId,componentId)
	} else if(clickType == "alertClick") { 
		getActionBotsAlertsDetailsActions("actionBotsDetailsDivId",componentArr,categoryId,alertStatusArr,clickType,jsonType,alertStatusIdsArr,locationLevel,locationId);
	}else if(clickType == "collaboratorsSubClick"){
		buildComponentWiseBotsDetailsSubClick(componentId,categoryName,clickType);
	}
});
function getStatusWiseOveralAlerts(blockValue){
		$("#overAllActionBotsAlertsDivId").html(spinner);
		var json={
			"fromDateStr":customStartDate,
			"toDateStr":customEndDate,
			"stateId":"1",
			"activityMemberId":"44",
			"componentList":componentTypeIds
		};
		 $.ajax({
            url: "getStatusWiseOveralAlerts",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	if(result !=null && result.length>0){
					buildOverAllActionBotsAlertStatusWiseDetails(result,blockValue);
				}else{
					$("#overAllActionBotsAlertsDivId").html("No Data Available");
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
}

function buildOverAllActionBotsAlertStatusWiseDetails(result,blockValue){
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
									if(result[0].totalCount !=null && result[0].totalCount>0){
										modalBlock+='<h5 class="font_weight m_top5 actionBotsClkCls" attr_click_type="alertClick" attr_json_type="overallJson" attr_status_name="Total" attr_is_alert_status="0" attr_component_type="'+blockValue+'" attr_category_id="0">'+result[0].totalCount+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
									}
										
									modalBlock+='</div>';
									modalBlock+='<div class="col-sm-6">';
										modalBlock+='<img src="Core/images/tdp_logo.png" class="float-right" style="height:40px;width:40px;border-radius:50%"/>';
									modalBlock+='</div>';
								modalBlock+='</div>';
								
							modalBlock+='</li>';
							if(result !=null && result.length>0){
								for(var i in result){
									modalBlock+='<li>';
										modalBlock+='<span class="text-capital">'+result[i].name+'</span>';
										modalBlock+='<div class="row">';
											modalBlock+='<div class="col-sm-6">';
												if(result[i].count !=null && result[i].count>0){
													modalBlock+='<h5 class="font_weight m_top5 actionBotsClkCls" attr_click_type="alertClick" attr_json_type="overallJson" attr_status_name="'+result[i].name+'" attr_is_alert_status="'+result[i].id+'" attr_component_type="'+blockValue+'" attr_category_id="0">'+result[i].count+'</h5>';
												}else{
													modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
												}
												
											modalBlock+='</div>';
											modalBlock+='<div class="col-sm-6">';
												modalBlock+='<i class="'+statusObj[result[i].name]+' fa-2x float-right" style="color:'+statusColorObj[result[i].name]+';"></i>';
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
	$("#overAllActionBotsAlertsDivId").html(modalBlock)
}


function getComponentWiseActionBotsDetails(){
	 
	$("#actiobalActionBotsBlockDivId").html(spinner);
	
	 var json={
		 "fromDateStr":customStartDate,
		"toDateStr":customEndDate,
		"stateId":"1",
		"activityMemberId":"44",
		"componentList":componentTypeIds
	 };
	  $.ajax({
		 url: "getComponentWiseActionBotsDetails",
		 data: JSON.stringify(json),
		 type: "POST",
		 dataType: 'json', 
		 beforeSend: function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },
		 success: function(result) {
			 if(result !=null && result.length>0){
				 buildComponentWiseActionBotsDetails(result);
			 }else{
				 $("#actiobalActionBotsBlockDivId").html("No Data Available");
			 }
			
		 },
		failure: function(xhr) {
			return xhr;
		 }
	 });
 }
 
 function buildComponentWiseActionBotsDetails(result){
	var modalBlock='';
	var totalExecutedBots = 0;
	var totalSuccess = 0;
	var totalFailure = 0; 
		 modalBlock+='<div class="row">';
			modalBlock+='<div class="col m_top20">';
					modalBlock+='<img src="Core/images/logo-ActionBots.png" class="img-responsive" alt="actionBots" style="width: 200px;height: auto;"/>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		
		modalBlock+='<div class="new_border_yash_pad">';
			modalBlock+='<div class="col">';
				modalBlock+='<div class="table-responsive">';
					modalBlock+='<table class="table table_custom_actionBots m_bottom_0" id="dataTableComponentWiseActionBotsId">';
						modalBlock+='<thead>';
							modalBlock+='<tr>';
								modalBlock+='<th>Component</th>';
								modalBlock+='<th>Total Bots</th>';
								modalBlock+='<th>Executed Bots</th>';
								modalBlock+='<th>Success</th>';
								modalBlock+='<th>Failure</th>';
							modalBlock+='</tr>';
						modalBlock+='</thead>';
						modalBlock+='<tbody>';
						for(var i in result){
							totalExecutedBots = totalExecutedBots + result[i].executedBots;
							totalSuccess = totalSuccess + result[i].succussCount;
							totalFailure = totalFailure + result[i].failureCount;
							modalBlock+='<tr>';
								modalBlock+='<td style="text-align: left !important;">';
									if(result[i].name == "Party Meetings"){
										modalBlock+='<h5 class="font_weight font_15"><img src="Core/images/'+result[i].name+'.png" class="component_img" style="width: 50px;height: auto;"/> '+result[i].name+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight font_15"><img src="Core/images/'+result[i].name+'.png" class="component_img"/> '+result[i].name+'</h5>';
									}
								modalBlock+='</td>';
										
								modalBlock+='<td>';
									modalBlock+='<h5 class="font_weight font_18">'+result[i].count+'</h5>';
								modalBlock+='</td>';
								
								modalBlock+='<td>';
									if(result[i].executedBots !=null && result[i].executedBots>0){
										modalBlock+='<h5 class="font_weight font_18 actionBotsClkCls" attr_click_type="botsClick" attr_type="execute" attr_component_type="'+result[i].id+'" attr_categoty_name="'+result[i].name+'" attr_category_id="0">'+result[i].executedBots+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight font_18">  - </h5>';
									}
								modalBlock+='</td>';
										
								modalBlock+='<td>';
									if(result[i].succussCount !=null && result[i].succussCount>0){
										modalBlock+='<h5 class="color_green font_weight font_18"><span class="actionBotsClkCls" attr_click_type="botsClick" attr_type="success" attr_component_type="'+result[i].id+'" attr_categoty_name="'+result[i].name+'" attr_category_id="0">'+result[i].succussCount+'</span> (<small>'+result[i].succussPer+' %</small>)</h5>';
									}else{
										modalBlock+='<h5 class="color_green font_weight font_18"> - </h5>';
									}
								modalBlock+='</td>';
								
								modalBlock+='<td>';
									if(result[i].failureCount !=null && result[i].failureCount>0){
										modalBlock+='<h5 class="color_red font_weight font_18"><span class="actionBotsClkCls" attr_click_type="botsClick" attr_type="present" attr_component_type="'+result[i].id+'" attr_categoty_name="'+result[i].name+'" attr_category_id="0">'+result[i].failureCount+'</span> (<small>'+result[i].failurePer+' %</small>)</h5>';
									}else{
										modalBlock+='<h5 class="color_red font_weight font_18"> - </h5>';
									}
								modalBlock+='</td>';
							modalBlock+='</tr>';
						}
						modalBlock+='</tbody>';
						modalBlock+='<tfoot>';
							modalBlock+='<tr>';
								modalBlock+='<td><h5 class="font_weight font_15"><img src="Core/images/icon-bell-small.png" class="component_img"> Total Bots</h5></td>';
								modalBlock+='<td><h5 class="font_weight">'+result[0].totalCount+'</h5></td>';
								modalBlock+='<td><h5 class="font_weight">'+totalExecutedBots+'</h5></td>';
								modalBlock+='<td><h5 class="color_green font_weight">'+totalSuccess+'</h5></td>';
								modalBlock+='<td><h5 class="color_red font_weight">'+totalFailure+'</h5></td>';
							modalBlock+='</tr>';
						modalBlock+='</tfoot>';
					modalBlock+='</table>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
	$("#actiobalActionBotsBlockDivId").html(modalBlock);
 }
 
 function getComponentWiseCategoryDetails(){
	 
	$("#actionBotsCategoryLevelBlockDivId").html(spinner);
	
	 var json={
		 "fromDateStr":customStartDate,
		"toDateStr":customEndDate,
		"stateId":"1",
		"activityMemberId":"44",
		"componentList":componentTypeIds
	 };
	  $.ajax({
		 url: "getComponentWiseCategoryDetails",
		 data: JSON.stringify(json),
		 type: "POST",
		 dataType: 'json', 
		 beforeSend: function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },
		 success: function(result) {
			 if(result !=null && result.length>0){
				 buildComponentWiseCategoryDetails(result);
			 }else{
				 $("#actionBotsCategoryLevelBlockDivId").html('');
			 }
			
		 },
		failure: function(xhr) {
			return xhr;
		 }
	 });
 }
 
 function buildComponentWiseCategoryDetails(result){
	  var modalBlock='';
	 	
		modalBlock+='<div class="new_border_yash_pad m_top20">';
			for(var i in result){
				modalBlock+='<div class="col m_top10">';
					if($(window).width() < 800){
						modalBlock+='<div class="table-responsive">';
					}
					modalBlock+='<table class="table table_custom_meeting table_custom_bg_white_color" id="dataTableComponentWiseCategoryId'+i+'">';
						modalBlock+='<thead>';
							modalBlock+='<tr>';
								modalBlock+='<th rowspan="2" style="min-width: 25%;"><img src="Core/images/logo-ActionBots.png" class="img-responsive" alt="actionBots" style="width: 100px;height: auto;"/> '+result[i].componentName+'</th>';
								modalBlock+='<th colspan="2">Fail Bots</th>';
								modalBlock+='<th rowspan="2">VARIANCE</th>';
								modalBlock+='<th colspan="3">Alerts</th>';
								modalBlock+='<th rowspan="3">Collaborators</th>';
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
							for(var j in result[i].list){
								modalBlock+='<tr>';
									modalBlock+='<td class="">'+result[i].list[j].name+'</td>';
									if(result[i].list[j].presentBots !=null && result[i].list[j].presentBots>0){
										modalBlock+='<td class="actionBotsClkCls" attr_click_type="botsClick" attr_type="present" attr_component_type="'+result[i].id+'" attr_categoty_name="'+result[i].componentName+'" attr_bot_name="'+result[i].list[j].name+'" attr_category_id="'+result[i].list[j].categoryId+'">'+emptyCheck(result[i].list[j].presentBots)+'</td>';
									}else{
										modalBlock+='<td class=""> - </td>';
									}
									if(result[i].list[j].pastBots !=null && result[i].list[j].pastBots>0){
										modalBlock+='<td class="actionBotsClkCls" attr_click_type="botsClick" attr_type="past" attr_component_type="'+result[i].id+'" attr_categoty_name="'+result[i].componentName+'" attr_bot_name="'+result[i].list[j].name+'" attr_category_id="'+result[i].list[j].categoryId+'">'+emptyCheck(result[i].list[j].pastBots)+'</td>';
									}else{
										modalBlock+='<td class="" > - </td>';
									}
									
									
									modalBlock+='<td class="">';
										if(result[i].list[j].impact == "positive"){
											modalBlock+='<span class="color_green"> '+result[i].list[j].percentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
										}else{
											modalBlock+='<span class="color_red"> '+result[i].list[j].percentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
										}
									modalBlock+='</td>';
									
									if(result[i].list[j].openCount !=null && result[i].list[j].openCount>0){
										modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="overallJson" attr_is_alert_status="open" attr_component_type="'+result[i].id+'" attr_category_id="'+result[i].list[j].categoryId+'">'+emptyCheck(result[i].list[j].openCount)+'</td>';
									}else{
										modalBlock+='<td class=""> - </td>';
									}
									
									if(result[i].list[j].closedCount !=null && result[i].list[j].closedCount>0){
										modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="overallJson" attr_is_alert_status="closed" attr_component_type="'+result[i].id+'" attr_category_id="'+result[i].list[j].categoryId+'">'+emptyCheck(result[i].list[j].closedCount)+'</td>';
									}else{
										modalBlock+='<td class=""> - </td>';
									}
									
									
									if(result[i].list[j].totalCount !=null && result[i].list[j].totalCount>0){
										modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="overallJson" attr_is_alert_status="total" attr_component_type="'+result[i].id+'" attr_category_id="'+result[i].list[j].categoryId+'">'+emptyCheck(result[i].list[j].totalCount)+'</td>';
									}else{
										modalBlock+='<td class=""> - </td>';
									}
									
									
									if(result[i].list[j].collaboratorsCount !=null && result[i].list[j].collaboratorsCount>0){
										modalBlock+='<td class="actionBotsClkCls" attr_click_type="collaboratorsClick" attr_component_type="'+result[i].id+'" attr_categoty_name="'+result[i].componentName+'" attr_bot_name="'+result[i].list[j].name+'" attr_category_id="'+result[i].list[j].categoryId+'">'+emptyCheck(result[i].list[j].collaboratorsCount)+'</td>';
									}else{
										modalBlock+='<td class=""> - </td>';
									}
									
								modalBlock+='</tr>';
							}
						modalBlock+='</tbody>';
						
					modalBlock+='</table>';
					 if($(window).width() < 800){
							modalBlock+='</div>';
					}
				modalBlock+='</div>';
			}
			
		modalBlock+='</div>';
		
	$("#actionBotsCategoryLevelBlockDivId").html(modalBlock);
	for(var i in result){
		initializeDataTableWithOutPagination("dataTableComponentWiseCategoryId"+i);
		$("#dataTableComponentWiseCategoryId"+i).tableHeadFixer({"head" : false, "left" : 1}); 
	}
 }
 
 function categoryWiseVarianceDetails(blockValue){
	 
	 if(blockValue == 1){
		 var categoryWiseAlertArr = [{id:1,name:'Print Media'}];
	 }else if(blockValue == 2){
		 var categoryWiseAlertArr = [{id:2,name:'Electronic Media'}];
	 }else  if(blockValue == 3){
		 var categoryWiseAlertArr = [{id:3,name:'Party Meetings'}];
	 }else  if(blockValue == 4){
		 var categoryWiseAlertArr = [{id:4,name:'Tours'}];
	 }else{
		 var categoryWiseAlertArr = [{id:1,name:'Print Media'},{id:2,name:'Electronic Media'},{id:3,name:'Party Meetings'},{id:4,name:'Tours'}];
	 }
	
	var modalBlock='';
	
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col m_top20">';
				modalBlock+='<h6 class="font_weight">ALERTS VARIANCE REPORT</h6>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="table_border_yash_pad m_top10">';
			for(var i in categoryWiseAlertArr){
				modalBlock+='<div id="categoryWiseAlert'+categoryWiseAlertArr[i].name.replace(/\s+/g, '')+'"></div>';
				
				getActionBoatsVarianceReportDetails(categoryWiseAlertArr[i].id,categoryWiseAlertArr[i].name);
			}
		modalBlock+='</div>';
		$("#categoryWiseAlertsBlockDivId").html(modalBlock);
		
 }
 function getActionBoatsVarianceReportDetails(componentId,componentName){
	 
	 $("#categoryWiseAlert"+componentName.replace(/\s+/g, '')).html(spinner);
	 var json={
		 "fromDateStr":customStartDate,
		 "toDateStr":customEndDate,
		 "stateId":"1",
		 "activityMemberId":"44",
		 "componentId":componentId 
	 };
	  $.ajax({
		 url: "getActionBoatsVarianceReportDetails",
		 data: JSON.stringify(json),
		 type: "POST",
		 dataType: 'json', 
		 beforeSend: function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },
		 success: function(result) {
			if(result !=null){
				buildActionBoatsVarianceReportDetails(result,componentName);
			}else{
				$("#categoryWiseAlert"+componentName.replace(/\s+/g, '')).html('');
			}
		 },
		failure: function(xhr) {
			return xhr;
		 }
	 });
 }
 
 function buildActionBoatsVarianceReportDetails(result,componentName){
	 var str='';
		
			str+='<div class="row">';
				str+='<div class="col">';
					if($(window).width() < 800){
						str+='<div class="table-responsive">';
					}
						str+='<table class="table table_custom_meeting" id="dataTable'+componentName.replace(/\s+/g, '')+'">';
							str+='<thead>';
								str+='<tr>';
									str+='<th rowspan="2">'+componentName+'</th>';
									str+='<th colspan="2">Total Alerts</th>';
									str+='<th rowspan="2">VARIANCE</th>';
									str+='<th colspan="2">Open</th>';
									str+='<th rowspan="2">VARIANCE</th>';
									str+='<th colspan="2">Closed</th>';
									str+='<th rowspan="2">VARIANCE</th>';
								str+='</tr>';
								str+='<tr>';
									str+='<th>Present</th>';
									str+='<th>Past</th>';
									str+='<th>Present</th>';
									str+='<th>Past</th>';
									str+='<th>Present</th>';
									str+='<th>Past</th>';
								str+='</tr>';
							str+='</thead>';
							str+='<tbody>';
								for(var i in result.list){
									str+='<tr>';
										str+='<td>'+result.list[i].name+'</td>';
										str+='<td class="color_light_yellow">'+emptyCheck(result.list[i].presentBots)+'</td>';
										str+='<td class="color_light_yellow">'+emptyCheck(result.list[i].pastBots)+'</td>';
										str+='<td class="color_light_yellow">';
											if(result.list[i].impact == "positive"){
												str+='<span class="color_green"> '+result.list[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
											}else{
												str+='<span class="color_red"> '+result.list[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
											}
										str+='</td>';
										
										str+='<td class="color_light_blue">'+emptyCheck(result.list[i].openPresentBoats)+'</td>';
										str+='<td class="color_light_blue">'+emptyCheck(result.list[i].openPastBoats)+'</td>';
										str+='<td class="color_light_blue">';
											if(result.list[i].openImpact == "positive"){
												str+='<span class="color_green"> '+result.list[i].openPercentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
											}else{
												str+='<span class="color_red"> '+result.list[i].openPercentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
											}
										str+='</td>';
										
										str+='<td class="color_bg_white">'+emptyCheck(result.list[i].closedPresentBoats)+'</td>';
										str+='<td class="color_bg_white">'+emptyCheck(result.list[i].closedPastBoats)+'</td>';
										str+='<td class="color_bg_white">';
											if(result.list[i].closedImpact == "positive"){
												str+='<span class="color_green"> '+result.list[i].closedPercentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
											}else{
												str+='<span class="color_red"> '+result.list[i].closedPercentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
											}
										str+='</td>';
										
									str+='</tr>';
								}
							str+='</tbody>';
							
						str+='</table>';
						if($(window).width() < 800){
							str+='</div>';	
						}
					
				str+='</div>';	
			str+='</div>';	
		$("#categoryWiseAlert"+componentName.replace(/\s+/g, '')).html(str);
		initializeDataTableWithOutPagination("dataTable"+componentName.replace(/\s+/g, ''));
		$("#dataTable"+componentName.replace(/\s+/g, '')).tableHeadFixer({"head" : false, "left" : 1}); 
 }
 
  function getLocationWiseActionBoatsDetails(blockValue){
	 
	 $("#locationWiseActionBotsAlertsOverAllDivId").html(spinner);
	
	 var json={
		 "fromDateStr":customStartDate,
		 "toDateStr":customEndDate,
		 "stateId":"1",
		 "activityMemberId":"44",
		 "componentList":componentTypeIds
	 };
	  $.ajax({
		 url: "getLocationWiseActionBoatsDetails",
		 data: JSON.stringify(json),
		 type: "POST",
		 dataType: 'json', 
		 beforeSend: function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },
		 success: function(result) {
			if(result !=null){
				buildLocationWiseActionBoatsDetails(result,blockValue);
			}else{
				$("#locationWiseActionBotsAlertsOverAllDivId").html('');
			}
		 },
		failure: function(xhr) {
			return xhr;
		 }
	 });
 }
 
 function buildLocationWiseActionBoatsDetails(result,blockValue){
	var modalBlock='';
		if(result.list !=null && result.list.length>0){
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-12 m_top10">';
					modalBlock+='<div class="pad_10">';
							modalBlock+='<h6 class="font_weight">DISTRICT WISE ALERTS</h6>';
						modalBlock+='</div>';	
					modalBlock+='</div>';	
				modalBlock+='</div>';
				
				modalBlock+='<div class="new_border_yash_pad">';
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-12">';
							modalBlock+='<div class="pad_10" style="padding-bottom: 0px;">';
								modalBlock+='<div class="table-responsive">';
									modalBlock+='<table class="table table_custom_meeting table-bordered" id="districtWiseActionBotsDataTable1">';
										modalBlock+='<thead>';
											modalBlock+='<tr>';
												modalBlock+='<th>District</th>';
												//modalBlock+='<th>Total Alerts</th>';
												modalBlock+='<th>Action Required</th>';
												//modalBlock+='<th>%</th>';
												modalBlock+='<th>Completed</th>';
												modalBlock+='<th>%</th>';
												modalBlock+='<th>Pending</th>';
												modalBlock+='<th>%</th>';
											modalBlock+='</tr>';
										modalBlock+='</thead>';
										modalBlock+='<tbody>';
											for(var i in result.list){
												modalBlock+='<tr>';
													modalBlock+='<td class="color_bg_white">'+result.list[i].locationName+'</td>';
													/* if(result.list[i].totalCount !=null && result.list[i].totalCount>0){
														modalBlock+='<td style="background-color:#D9E1F2">'+result.list[i].totalCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#D9E1F2"> - </td>';
													} */
													if(result.list[i].actionRequiredCount !=null && result.list[i].actionRequiredCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list[i].locationId+'" attr_location_level="district" attr_alert_status="'+result.list[i].actionRequiredstatusIds+'" attr_component_type="'+blockValue+'" style="background-color:#FFF2CC">'+result.list[i].actionRequiredCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FFF2CC"> - </td>';
													}
													/* if(result.list[i].actionRequiredPercentage	 !=null && result.list[i].actionRequiredPercentage	>0){
														modalBlock+='<td class="color_green" style="background-color:#FFF2CC">'+result.list[i].actionRequiredPercentage+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FFF2CC"> - </td>';
													} */
													if(result.list[i].completedCount !=null && result.list[i].completedCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list[i].locationId+'" attr_location_level="district" attr_alert_status="'+result.list[i].completedstatusIds+'" attr_component_type="'+blockValue+'" style="background-color:#E2EFDA">'+result.list[i].completedCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#E2EFDA"> - </td>';
													}
													if(result.list[i].completedPercentage !=null && result.list[i].completedPercentage	>0){
														modalBlock+='<td class="color_green" style="background-color:#E2EFDA">'+result.list[i].completedPercentage+'</td>';
													}else{
														modalBlock+='<td style="background-color:#E2EFDA"> - </td>';
													}
													if(result.list[i].pendingCount	!=null && result.list[i].pendingCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list[i].locationId+'" attr_location_level="district" attr_alert_status="'+result.list[i].pendingstatusIds+'" attr_component_type="'+blockValue+'" style="background-color:#FBD5D8">'+result.list[i].pendingCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FBD5D8"> - </td>';
													}
													if(result.list[i].pendingPercentage	!=null && result.list[i].pendingPercentage	>0){
														modalBlock+='<td class="color_red" style="background-color:#FBD5D8">'+result.list[i].pendingPercentage+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FBD5D8"> - </td>';
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
				modalBlock+='</div>';
				
			
		}
		if(result.list1 !=null && result.list1.length>0){	
			modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-12 m_top10">';
					modalBlock+='<div class="pad_10">';
							modalBlock+='<h6 class="font_weight">PARLIAMENT WISE ALERTS</h6>';
						modalBlock+='</div>';	
					modalBlock+='</div>';	
				modalBlock+='</div>';
				
			modalBlock+='<div class="new_border_yash_pad">';
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-12">';
							modalBlock+='<div class="pad_10" style="padding-bottom: 0px;">';
								modalBlock+='<div class="table-responsive">';
									modalBlock+='<table class="table table_custom_meeting table-bordered" id="parliamentWiseActionBotsDataTable1">';
										modalBlock+='<thead>';
											modalBlock+='<tr>';
												modalBlock+='<th>Parliament</th>';
												//modalBlock+='<th>Total Alerts</th>';
												modalBlock+='<th>Action Required</th>';
												//modalBlock+='<th>%</th>';
												modalBlock+='<th>Completed</th>';
												modalBlock+='<th>%</th>';
												modalBlock+='<th>Pending</th>';
												modalBlock+='<th>%</th>';
											modalBlock+='</tr>';
										modalBlock+='</thead>';
										modalBlock+='<tbody>';
											for(var i in result.list1){
												modalBlock+='<tr>';
													modalBlock+='<td class="color_bg_white">'+result.list1[i].locationName+'</td>';
													/* if(result.list1[i].totalCount !=null && result.list1[i].totalCount>0){
														modalBlock+='<td style="background-color:#D9E1F2">'+result.list2[i].totalCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#D9E1F2"> - </td>';
													} */
													if(result.list1[i].actionRequiredCount !=null && result.list1[i].actionRequiredCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list1[i].locationId+'" attr_location_level="parliament" attr_alert_status="'+result.list1[i].actionRequiredstatusIds+'" attr_component_type="'+blockValue+'" style="background-color:#FFF2CC">'+result.list1[i].actionRequiredCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FFF2CC"> - </td>';
													}
													/* if(result.list1[i].actionRequiredPercentage	 !=null && result.list1[i].actionRequiredPercentage	>0){
														modalBlock+='<td class="color_green" style="background-color:#FFF2CC">'+result.list2[i].actionRequiredPercentage+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FFF2CC"> - </td>';
													} */
													if(result.list1[i].completedCount !=null && result.list1[i].completedCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list1[i].locationId+'" attr_location_level="parliament" attr_alert_status="'+result.list1[i].completedstatusIds+'" attr_component_type="'+blockValue+'" style="background-color:#E2EFDA">'+result.list1[i].completedCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#E2EFDA"> - </td>';
													}
													if(result.list1[i].completedPercentage !=null && result.list1[i].completedPercentage	>0){
														modalBlock+='<td class="color_green" style="background-color:#E2EFDA">'+result.list1[i].completedPercentage	+'</td>';
													}else{
														modalBlock+='<td style="background-color:#E2EFDA"> - </td>';
													}
													if(result.list1[i].pendingCount	!=null && result.list1[i].pendingCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list1[i].locationId+'" attr_location_level="parliament" attr_alert_status="'+result.list1[i].pendingstatusIds+'" attr_component_type="'+blockValue+'" class="" style="background-color:#FBD5D8">'+result.list1[i].pendingCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FBD5D8"> - </td>';
													}
													if(result.list1[i].pendingPercentage !=null && result.list1[i].pendingPercentage	>0){
														modalBlock+='<td class="color_red" style="background-color:#FBD5D8">'+result.list1[i].pendingPercentage+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FBD5D8"> - </td>';
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
					modalBlock+='</div>';
				}
				if(result.list2 !=null && result.list2.length>0){
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-12 m_top10">';
						modalBlock+='<div class="pad_10" style="padding-bottom: 0px;">';
								modalBlock+='<h6 class="font_weight">CONSTITUENCY WISE ALERTS</h6>';
							modalBlock+='</div>';	
						modalBlock+='</div>';	
					modalBlock+='</div>';
					
					modalBlock+='<div class="new_border_yash_pad">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-12">';
								modalBlock+='<div class="pad_10">';
										modalBlock+='<div class="table-responsive">';
											modalBlock+='<table class="table table_custom_meeting table-bordered" id="constituencyWiseActionBostsDataTable1">';
												modalBlock+='<thead>';
											modalBlock+='<tr>';
												modalBlock+='<th>Constituency</th>';
												//modalBlock+='<th>Total Alerts</th>';
												modalBlock+='<th>Action Required</th>';
												//modalBlock+='<th>%</th>';
												modalBlock+='<th>Completed</th>';
												modalBlock+='<th>%</th>';
												modalBlock+='<th>Pending</th>';
												modalBlock+='<th>%</th>';
											modalBlock+='</tr>';
										modalBlock+='</thead>';
										modalBlock+='<tbody>';
											for(var i in result.list2){
												modalBlock+='<tr>';
													modalBlock+='<td class="color_bg_white">'+result.list2[i].locationName+'</td>';
													/* if(result.list2[i].totalCount !=null && result.list2[i].totalCount>0){
														modalBlock+='<td style="background-color:#D9E1F2">'+result.list2[i].totalCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#D9E1F2"> - </td>';
													} */
													if(result.list2[i].actionRequiredCount !=null && result.list2[i].actionRequiredCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list2[i].locationId+'" attr_location_level="constituency" attr_alert_status="'+result.list2[i].actionRequiredstatusIds+'" attr_component_type="'+blockValue+'" style="background-color:#FFF2CC">'+result.list2[i].actionRequiredCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FFF2CC"> - </td>';
													}
													/* if(result.list2[i].actionRequiredPercentage	 !=null && result.list2[i].actionRequiredPercentage	>0){
														modalBlock+='<td class="color_green" style="background-color:#FFF2CC">'+result.list2[i].actionRequiredPercentage+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FFF2CC"> - </td>';
													} */
													if(result.list2[i].completedCount !=null && result.list2[i].completedCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list2[i].locationId+'" attr_location_level="constituency" attr_alert_status="'+result.list2[i].completedstatusIds+'" attr_component_type="'+blockValue+'" style="background-color:#E2EFDA">'+result.list2[i].completedCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#E2EFDA"> - </td>';
													}
													if(result.list2[i].completedPercentage !=null && result.list2[i].completedPercentage	>0){
														modalBlock+='<td class="color_green" style="background-color:#E2EFDA">'+result.list2[i].completedPercentage	+'</td>';
													}else{
														modalBlock+='<td style="background-color:#E2EFDA"> - </td>';
													}
													if(result.list2[i].pendingCount	!=null && result.list2[i].pendingCount>0){
														modalBlock+='<td class="actionBotsClkCls" attr_click_type="alertClick" attr_json_type="locationJson" attr_location_id="'+result.list2[i].locationId+'" attr_location_level="constituency" attr_alert_status="'+result.list2[i].pendingstatusIds+'" attr_component_type="'+blockValue+'" style="background-color:#FBD5D8">'+result.list2[i].pendingCount+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FBD5D8"> - </td>';
													}
													if(result.list2[i].pendingPercentage !=null && result.list2[i].pendingPercentage	>0){
														modalBlock+='<td class="color_red" style="background-color:#FBD5D8">'+result.list2[i].pendingPercentage+'</td>';
													}else{
														modalBlock+='<td style="background-color:#FBD5D8"> - </td>';
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
					modalBlock+='</div>';
				}
			$("#locationWiseActionBotsAlertsOverAllDivId").html(modalBlock);
			
			
			$("#districtWiseActionBotsDataTable1").dataTable({
				"iDisplayLength": 10,
				"aaSorting": [],
				"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]
			});
			
			$("#parliamentWiseActionBotsDataTable1").dataTable({
				"iDisplayLength": 10,
				"aaSorting": [],
				"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]
			});
			
			$("#constituencyWiseActionBostsDataTable1").dataTable({
				"iDisplayLength": 10,
				"aaSorting": [],
				"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]
			});
			
			
			$("#districtWiseActionBotsDataTable1").tableHeadFixer({"head" : false, "left" : 1});
			$("#parliamentWiseActionBotsDataTable1").tableHeadFixer({"head" : false, "left" : 1});
			$("#constituencyWiseActionBostsDataTable1").tableHeadFixer({"head" : false, "left" : 1});
		}


function getComponentWiseBotsDetailsClick(divId,botType,componentArr,actionBotsCategory,categoryName,botName,clickType){
	$("#"+divId).html(spinner);
	var json={
		"fromDateStr":customStartDate,
		"toDateStr":customEndDate,
		"stateId":"1",
		"activityMemberId":"44",
		"componentList":componentArr,
		"actionBotsCategoryIds":actionBotsCategory,//2nd block click empty
        "type":botType//present,past,success,execute present-failure
	};
	$.ajax({
		url: "getComponentWiseBotsDetailsClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				buildComponentWiseBotsDetailsClick(result,divId,categoryName,botName,clickType,"","");
			}else{
				$("#"+divId).html('No Data Available');
			}
			
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function getCollaboratorsWiseFilledBotsAndAssignedAlertsDetailsClick(divId,botType,componentArr,categoryName,botName,clickType,actionBotsCategory,categoryId,componentId){
	$("#"+divId).html(spinner);
	var json={
			"fromDateStr":customStartDate,
			"toDateStr":customEndDate,
			"stateId":"1",
			"activityMemberId":"44",
			"componentList":componentArr,
			"actionBotsCategoryIds":actionBotsCategory
		};
	
	$.ajax({
		url: "getCollaboratorsWiseFilledBotsAndAssignedAlertsDetailsClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				globalResultsCollabrate=result;
				buildComponentWiseBotsDetailsClick(result,divId,categoryName,botName,clickType,categoryId,componentId);
			}else{
				$("#"+divId).html('No Data Available');
			}
			
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
//"actionBotsDetailsDivId",componentArr,categoryId,alertStatusArr,clickType
function getActionBotsAlertsDetailsActions(divId,componentArr,categoryId,alertStatusArr,clickType,jsonType,alertStatusIdsArr,locationLevel,locationId){
	$("#"+divId).html(spinner);
	var json={};
	if(jsonType == "locationJson") {
		json={
			"stateId": 1, // State
			"fromDateStr": customStartDate, 
			"toDateStr": customEndDate,
			"activityMemberId": "44",
			"alertStatusIds" : alertStatusIdsArr, // Alert Type for open 2,3 closed 4
			"componentList":componentArr, // Ex:1-print
			"alertTypeId":categoryId, 	// Category Type */
			"locationLevel":locationLevel,
			"locationId":locationId
		};
	} else {
		json={
			"stateId": 1, // State
			"fromDateStr": customStartDate, 
			"toDateStr": customEndDate,
			"activityMemberId": "44",
			"alertStatusIds" : alertStatusArr, // Alert Type for open 2,3 closed 4
			"componentList":componentArr, // Ex:1-print
			"alertTypeId":categoryId // Category Type */
		};
	}
	$.ajax({
		url: "getActionBotsAlertsDetailsActions",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				buildComponentWiseBotsDetailsClick(result,divId,"","",clickType,"","");
			}else{
				$("#"+divId).html('No Data Available');
			}
			
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildComponentWiseBotsDetailsClick(result,divId,categoryName,botName,clickType,categoryId,componentId) {
	var str='';
	if(clickType != "alertClick"){
		str+='<div class="row">';
			str+='<div class="col-sm-4">';
				str+='<div class="pad_10 text-center border_bg">';
					str+='<h5 class="font_weight text-capital font_15">Source</h5>';
					str+='<h5 class="font_weight color_green font_15">TDP Party</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-4">';
				str+='<div class="pad_10 text-center border_bg">';
					str+='<h5 class="font_weight text-capital font_15">Component</h5>';
					str+='<h5 class="font_weight color_green font_15">'+categoryName+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-4">';
				str+='<div class="pad_10 text-center border_bg">';
					str+='<h5 class="font_weight text-capital font_15">Bot</h5>';
					if(botName !=null && botName.trim().length>0){
						str+='<h5 class="font_weight color_green font_15">'+botName+'</h5>';
					}else{
						str+='<h5 class="font_weight color_green font_15"> - </h5>';
					}
					
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<h5 class="font_weight text-capital m_top10 font_15">Exicution Track Details</h5>';
	}
	
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="table-responsive">';
				if(clickType == "botsClick") {
					str+='<table class="table table_custom_meeting table-bordered m_top10" id="dataTable'+clickType+'">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Run Time</th>';
								str+='<th>Previous Base Value</th>';
								str+='<th>Threshold</th>';
								str+='<th>Present Value</th>';
								str+='<th>Collabirator</th>';
								str+='<th>Message</th>';
								str+='<th>Document</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result) {
							str+='<tr>';
								str+='<td>'+result[i].runTime+'</td>';
								str+='<td>'+emptyCheck(result[i].previousValue)+'</td>';
								str+='<td>'+result[i].thresholdValue+'</td>';
								str+='<td>'+emptyCheck(result[i].presentValue)+'</td>';
								if(result[i].componentName !=null && result[i].componentName.trim().length>0){
									str+='<td>'+result[i].componentName+'</td>';
								}else{
									str+='<td> - </td>';
								}
								
								str+='<td style="text-align:left !important;">'+result[i].massage+'</td>';
								if(result[i].path != null && result[i].path != 'undefined'){
									str+='<td><i class="far fa-file-pdf fa-2x botPDFDownloadCls" style="color:#337AB7;" attr_run_time="'+result[i].runTime+'" attr_path='+result[i].path+'></i></td>';	
								}else{
									str+='<td>-</td>';	
								}
								
							str+='</tr>';
						}
						str+='</tbody>';
					str+='</table>';
				} else if(clickType == "collaboratorsClick"){
					str+='<table class="table table_custom_meeting table-bordered m_top10 table-condensed" id="dataTable'+clickType+'">';
						str+='<thead>';
							str+='<tr>';
								str+='<th rowspan="2">Name</th>';
								str+='<th rowspan="2">Bot Count</th>';
								str+='<th rowspan="2">Bots Failed</th>';
								str+='<th colspan="3">Alerts Assigned</th>';
							str+='</tr>';
							str+='<tr>';
								str+='<th>Open</th>';
								str+='<th>Close</th>';
								str+='<th>Total</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result[0].list) {
								str+='<tr>';
									str+='<td>'+result[0].list[i].componentName+'</td>';
									if(result[0].list[i].succussCount !=null && result[0].list[i].succussCount>0){
										str+='<td class="actionBotsClkCls" attr_click_type="collaboratorsSubClick" attr_component_type="'+result[0].list[i].collaboratorsId+'" attr_categoty_name="'+result[0].list[i].componentName+'" attr_bot_name="" attr_category_id="">'+emptyCheck(result[0].list[i].succussCount)+'</td>';
									}else{
										str+='<td> - </td>';
									}
									str+='<td>'+emptyCheck(result[0].list[i].count)+'</td>';
									str+='<td>'+emptyCheck(result[0].list[i].openCount)+'</td>';
									str+='<td>'+emptyCheck(result[0].list[i].closedCount)+'</td>';
									str+='<td>'+emptyCheck(result[0].list[i].totalCount)+'</td>';
								str+='</tr>';	
						}
						str+='</tbody>';
					str+='</table>';	
				}else if(clickType == "alertClick"){
					str+='<table class="table table_custom_meeting table-bordered m_top10 table-condensed" id="dataTable'+clickType+'">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Title</th>';
								str+='<th>Created Time</th>';
								str+='<th>Last Updated Time</th>';
								str+='<th>Current Status</th>';
								str+='<th>Lag Days</th>';
								str+='<th>Alert Impact Level</th>';
								str+='<th>Location</th>';
								str+='<th>Collabirator</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result) {
							str+='<tr>';
								str+='<td>'+result[i].title+'</td>';
								
								if(result[i].createdDate !=null && result[i].createdDate.trim().length>0){
									str+='<td>'+result[i].createdDate+'</td>';
								}else{
									str+='<td> - </td>';
								}
								
								if(result[i].updatedDate !=null && result[i].updatedDate.trim().length>0){
									str+='<td>'+result[i].updatedDate+'</td>';
								}else{
									str+='<td> - </td>';
								}
								
								str+='<td>'+result[i].status+'</td>';
								str+='<td>'+emptyCheck(result[i].interval)+'</td>';
								str+='<td>'+result[i].alertLevel+'</td>';
								str+='<td style="text-align:left !important;">'+result[i].location+'</td>';
								if(result[i].name != null && result[i].name.trim().length>0){
									str+='<td style="text-align:left !important;">'+result[i].name+'</td>';	
								}else{
									str+='<td>-</td>';	
								}
							str+='</tr>';
						}
						str+='</tbody>';
					str+='</table>';	
				}
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	$("#"+divId).html(str);
	
	initializeDataTableWithPagination("dataTable"+clickType);
	$("#dataTable"+clickType).tableHeadFixer({"head" : false, "left" : 1});
}

function buildComponentWiseBotsDetailsSubClick(componentId,categoryName,clickType){
	var str='';
	
	str+='<div class="row">';
		str+='<div class="col-sm-12 m_top20">';
			str+='<h4 class="font_weight text-capital m_top10 font_15">'+categoryName+' Wise Details</h4>';
		str+='</div>';
	str+='</div>';
	
	str+='<div class="row">';
		str+='<div class="col-sm-12 m_top10">';
			str+='<div class="table-responsive">';
				str+='<table class="table table_custom_meeting table-bordered m_top10 table-condensed" id="dataTableSubAC'+clickType+'">';
					str+='<thead>';
						str+='<tr>';
							str+='<th rowspan="2">Bot Name</th>';
							str+='<th rowspan="2">Bots Failed</th>';
							str+='<th colspan="3">Alerts Assigned</th>';
						str+='</tr>';
						str+='<tr>';
							str+='<th>Total</th>';
							str+='<th>Open</th>';
							str+='<th>Close</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
					for(var i in globalResultsCollabrate){
						if(i !=0){
							if(componentId == globalResultsCollabrate[i].collaboratorsId){
								str+='<tr>';
									str+='<td>'+globalResultsCollabrate[i].name+'</td>';
									str+='<td>'+emptyCheck(globalResultsCollabrate[i].count)+'</td>';
									str+='<td>'+emptyCheck(globalResultsCollabrate[i].totalCount)+'</td>';
									str+='<td>'+emptyCheck(globalResultsCollabrate[i].openCount)+'</td>';
									str+='<td>'+emptyCheck(globalResultsCollabrate[i].closedCount)+'</td>';
								str+='</tr>';
							}
						}
						
						
					}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	$("#actionBotsSubClickDetailsDivId").html(str);
	
	initializeDataTableWithPagination("dataTableSubAC"+clickType);
	$("#dataTableSubAC"+clickType).tableHeadFixer({"head" : false, "left" : 1});
	
	
}
 function emptyCheck(filedValue){
	var returnVal = ' - ';
	if( filedValue !=null && filedValue > 0){
		returnVal = filedValue;
	}
	return returnVal;
}

$(document).on('click','.botPDFDownloadCls',function(){
		var pdfPath="";
		pdfPath = $(this).attr("attr_path");
		var runtime = $(this).attr("attr_run_time");
		
		var xhr = new XMLHttpRequest();
		xhr.open("GET", pdfPath, true);
		xhr.responseType = "blob";
		xhr.onload = function(){
			
			var urlCreator = window.URL || window.webkitURL;
			var imageUrl = urlCreator.createObjectURL(this.response);
			var tag = document.createElement('a');
			tag.href = imageUrl;
			tag.download = "Notification_Monitor("+runtime+").pdf" ;
			document.body.appendChild(tag);
			tag.click();
			document.body.removeChild(tag);
		}
		xhr.send();
});