var designationIdsArr=[];

function basicTourDetails(blockValue,chosenLabel){
	var modalBlock='';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col">';
				modalBlock+='<h6 class="font_weight">OVERVIEW</h6>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col">';
				modalBlock+='<div id="overAlltoursDivId"></div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
	modalBlock+='<div id="actionBotsMonthlyDetailsDivId"></div>';
	
	modalBlock+='<div id="designationWiseTourDivId"></div>';
	
	modalBlock+='<div class="row">';
		modalBlock+='<div class="col m_top20">';
			modalBlock+='<h6 class="font_weight text-uppercase">Tours VARIANCE REPORT</h6>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div class="new_border_yash_pad pad_10">';	
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="col-sm-2 float-right">';
					modalBlock+='<select class="form-control chosen_select varianceSelectClk">';
						modalBlock+='<option value="Complaince">Complaince</option>';
						modalBlock+='<option value="Non Complance">Non Complance</option>';
						modalBlock+='<option value="Submitted">Submitted</option>';
						modalBlock+='<option value="Not Submitted" selected>Not Submitted</option>';
					modalBlock+='</select>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12 m_top10">';
				modalBlock+='<div id="varianceReportTourBlockDivId"></div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
	modalBlock+='</div>';	
	
	
	modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-4 m_top10">';
				modalBlock+='<h6 class="font_weight m_bottom_0" style="position: relative;top: 15px;">DESIGNATION WISE TOUR DETAILS</h6>';
		modalBlock+='</div>';
		modalBlock+='<div class="col-sm-8 m_top10 float-right">';
			modalBlock+='<ul class="list-inline switch-btn-New toursComplainsDtsCls float-right m_bottom_0">';
				modalBlock+='<li attr_type="all" class="active" attr_tour_block_val="'+blockValue+'">All</li>';
				modalBlock+='<li attr_type="complaince" attr_tour_block_val="'+blockValue+'">Complaince</li>';
				modalBlock+='<li attr_type="nonComplaince" attr_tour_block_val="'+blockValue+'">Non - Complance</li>';
				modalBlock+='<li attr_type="submitted" attr_tour_block_val="'+blockValue+'">Submitted</li>';
				modalBlock+='<li attr_type="notSubmitted" attr_tour_block_val="'+blockValue+'">Not- Submitted</li>';
			modalBlock+='</ul>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div class="row">';
			modalBlock+='<div class="col m_top10">';
				modalBlock+='<div id="consolidatedReportBlockDivId"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	//modalBlock+='<div id="locationWiseToursOverAllDivId"></div>';
	
	$(".blockWiseModalDivId").html(modalBlock);
	$(".tooltipCls").tooltip();
	
	onloadToursModalCalls(blockValue,chosenLabel);
}

function onloadToursModalCalls(tourBlockValue,chosenLabel) {
	
	designationIdsArr =[];
	if(tourBlockValue == 0){
		designationIdsArr =[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
	}else{
		designationIdsArr.push(tourBlockValue)
		
	}
	tourCustomEndDate="";
	tourCustomStartDate="";
	function getDay(){
		var date = new Date();
		var dd = date.getDate(); 
		return dd;
	}
	if(customStartDate != customEndDate){
		if(chosenLabel == "thisMonth"){
			tourCustomStartDate=moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY');
			tourCustomEndDate = moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
		}else if(chosenLabel == "lastMonth"){
			tourCustomStartDate=moment().subtract(2, 'month').startOf('month').format('DD/MM/YYYY');
			tourCustomEndDate = moment().subtract(2, 'month').endOf('month').format('DD/MM/YYYY');
		}else if(chosenLabel == "last3Month"){  
			tourCustomStartDate=moment().subtract(4, 'month').startOf('month').format('DD/MM/YYYY');
			tourCustomEndDate = moment().subtract(2, 'month').endOf('month').format('DD/MM/YYYY');
		}else if(chosenLabel == "last6Month"){
			tourCustomStartDate=moment().subtract(7, 'month').startOf('month').format('DD/MM/YYYY');
			tourCustomEndDate = moment().subtract(2, 'month').endOf('month').format('DD/MM/YYYY');
		}else{
			tourCustomStartDate=customStartDate;
			tourCustomEndDate = moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
		}
	}else{
		tourCustomStartDate=customStartDate;
		tourCustomEndDate = customEndDate;
	}
	
	$(".chosen_select").chosen();
	getDesignationWiseTourOverviewDetails(tourBlockValue);
	getruleWiseActionBotsToursOverview();
	getTourVarianceReport("Not Submitted");
	getConsolidatedReport("all","mainBuild");
	//levelWiseTourData();
}

function getDesignationWiseTourOverviewDetails(tourBlockValue){
	$("#overAlltoursDivId").html(spinner);
	var json={
		"fromDateStr":tourCustomStartDate,
		"toDateStr":tourCustomEndDate,
		"stateId":"1",
		"activityMemberId":"44",
		"designationIds":designationIdsArr
	};
	 $.ajax({
		url: "getLocationWiseToursOverviewDetails",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null){
				buildDesignationWiseTourOverviewDetails(result,tourBlockValue);
			}else{
				$("#overAlltoursDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildDesignationWiseTourOverviewDetails(result,tourBlockValue) {
	var modalBlock='';
	var modalBlock1='';
	var overViewRslt = result.overAllDetailsVO;
	
	var totalCamplains=0;
    var totalNonCamplains=0;
    var tottalCount=0;
    var totalSubmitted=0;
    var submittedCount = 0;
    var totalNotSubmitted=0;
    var totalSubNotSubmmitted=0;
    var totalSubmittedLeaderCnt = 0;
    	
      for(var i in result){
	    submittedCount = submittedCount+result[i].submitedLeaderCnt;
        totalNotSubmitted = totalNotSubmitted+result[i].notSubmitedLeaserCnt;
        totalSubmitted = totalSubmitted+result[i].totalSubmittedToursCnt;  
        tottalCount = tottalCount + result[i].count;//total leader 
        totalCamplains = totalCamplains + result[i].complainceCnt;
        totalNonCamplains = totalNonCamplains+ result[i].nonComplainceCnt;
      }
   
	
	modalBlock+='<div class="new_border_yash_pad">';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="mainBlockUl">';
					modalBlock+='<ul class="list-inline blocksLi">';
						modalBlock+='<li>';
							modalBlock+='<span class="text-capital">Total Leaders </span>';
							if(tottalCount > 0){
								modalBlock+='<h5 class="font_weight m_top5 " attr_filter_type="all" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="">'+tottalCount+'</h5>';
							}else{
								modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
							}
						modalBlock+='</li>';
						modalBlock+='<li>';
							modalBlock+='<span class="text-capital">Total Tours</span>';
							if(totalSubmitted > 0){
								modalBlock+='<h5 class="font_weight m_top5 " attr_filter_type="all" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="">'+totalSubmitted+'</h5>';
							}else{
								modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
							}
						modalBlock+='</li>';
						
						modalBlock+='<li>';
							modalBlock+='<span class="text-capital">Not Submitted</span>';
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-6">';
									if(totalNotSubmitted > 0){
										modalBlock+='<h5 class="font_weight m_top5 " attr_filter_type="notSubmitteed" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="">'+totalNotSubmitted+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
									}
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-6">';
									modalBlock+='<i class="far fa-times-circle fa-2x float-right" style="color:#FF0000;"></i>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
						
						modalBlock+='<li>';
							modalBlock+='<span class="text-capital">Submitted</span>';
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-6">';
									if(submittedCount > 0){
										modalBlock+='<h5 class="font_weight m_top5 " attr_filter_type="submitted" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="">'+submittedCount+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
									}
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-6">';
									modalBlock+='<i class="far fa-check-circle fa-2x float-right" style="color:green;"></i>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
						
						
						modalBlock+='<li>';
							modalBlock+='<span class="text-capital">Compliance</span>';
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-6">';
									if(totalCamplains > 0){
										modalBlock+='<h5 class="font_weight m_top5 " attr_filter_type="Complaince" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="">'+totalCamplains+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
									}
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-6">';
									modalBlock+='<i class="far fa-check-circle fa-2x float-right" style="color:green;"></i>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
						modalBlock+='<li>';
							modalBlock+='<span class="text-capital">Non Compliance</span>';
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-6">';
									if(totalNonCamplains > 0){
										modalBlock+='<h5 class="font_weight m_top5 " attr_filter_type="noncompliance" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="">'+totalNonCamplains+'</h5>';
									}else{
										modalBlock+='<h5 class="font_weight m_top5"> - </h5>';
									}
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-6">';
									modalBlock+='<i class="far fa-times-circle fa-2x float-right" style="color:#0040AF;"></i>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	
		
	if(result !=null && result.length>0){
		
		modalBlock1+='<div class="new_border_yash_pad pad_10 mt-2">';
			modalBlock1+='<div class="table-responsive">';
				modalBlock1+='<table class="table table-bordered table_custom_meeting" id="DesignationWiseToursDatableId11">';
					modalBlock1+='<thead>';
						modalBlock1+='<tr>';
							modalBlock1+='<th>Designation</th>';
							modalBlock1+='<th class="color_light_blue">Total Leaders</th>';
							modalBlock1+='<th class="color_light_blue">Total Tours</th>';
							modalBlock1+='<th class="color_light_yellow">Not Submitted</th>';
							modalBlock1+='<th class="color_light_yellow">%</th>';
							modalBlock1+='<th class="color_light_yellow">Submitted</th>';
							modalBlock1+='<th class="color_light_yellow">%</th>';
							modalBlock1+='<th class="color_light_green">Compliance</th>';
							modalBlock1+='<th class="color_light_green">%</th>';
							modalBlock1+='<th class="color_light_green">Non Compliance</th>';
							modalBlock1+='<th class="color_light_green">%</th>';
						modalBlock1+='</tr>';
					modalBlock1+='</thead>';
					modalBlock1+='<tbody>';
					for(var i in result){
						modalBlock1+='<tr>';
							modalBlock1+='<td>'+result[i].designation+'</td>';//ara
							if(result[i].count !=null && result[i].count>0){
								modalBlock1+='<td class="color_light_blue getTourClickDetailsCls"  attr_view_type="clickView" attr_filter_type="all" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="'+result[i].designationId+'">'+emptyCheck(result[i].count)+'</td>';
							}else{
								modalBlock1+='<td class="color_light_blue"> - </td>';
							}
							
							if(result[i].totalSubmittedToursCnt !=null && result[i].totalSubmittedToursCnt>0){
								modalBlock1+='<td class="color_light_blue"  attr_filter_type="all" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="'+result[i].id+'">'+emptyCheck(result[i].totalSubmittedToursCnt)+'</td>';
							}else{
								modalBlock1+='<td class="color_light_blue"> - </td>';
							}
							
							if(result[i].notSubmitedLeaserCnt !=null && result[i].notSubmitedLeaserCnt>0){
								modalBlock1+='<td class="color_light_yellow" attr_filter_type="notSubmitteed" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="'+result[i].id+'">'+emptyCheck(result[i].notSubmitedLeaserCnt)+'</td>';
							}else{
								modalBlock1+='<td class="color_light_yellow"> - </td>';
							}
							
							modalBlock1+='<td class="color_light_yellow color_green">'+emptyCheck(getPercentage(result[i].notSubmitedLeaserCnt,result[i].totalSubmittedToursCnt))+'</td>';
							
							if(result[i].submitedLeaderCnt !=null && result[i].submitedLeaderCnt>0){
								modalBlock1+='<td class="color_light_yellow" attr_filter_type="submitted" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="'+result[i].id+'">'+emptyCheck(result[i].submitedLeaderCnt)+'</td>';
							}else{
								modalBlock1+='<td class="color_light_yellow"> - </td>';
							}
							
							modalBlock1+='<td class="color_light_yellow color_green">'+emptyCheck(getPercentage(result[i].submitedLeaderCnt,result[i].totalSubmittedToursCnt))+'</td>';
							
							if(result[i].complainceCnt !=null && result[i].complainceCnt>0){
								modalBlock1+='<td class="color_light_green " attr_filter_type="Complaince" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="'+result[i].id+'">'+emptyCheck(result[i].complainceCnt)+'</td>';
							}else{
								modalBlock1+='<td class="color_light_green"> - </td>';
							}
							
							modalBlock1+='<td class="color_light_green color_green">'+emptyCheck(getPercentage(result[i].complainceCnt,result[i].totalSubmittedToursCnt))+'</td>';
							
							if(result[i].nonComplainceCnt !=null && result[i].nonComplainceCnt>0){
								modalBlock1+='<td class="color_light_green " attr_filter_type="noncompliance" attr_tour_block_val="'+tourBlockValue+'" attr_designation_id="'+result[i].id+'">'+emptyCheck(result[i].nonComplainceCnt)+'</td>';
							}else{
								modalBlock1+='<td class="color_light_green"> - </td>';
							}
							modalBlock1+='<td class="color_light_green color_green">'+emptyCheck(getPercentage(result[i].nonComplainceCnt,result[i].totalSubmittedToursCnt))+'</td>';
						modalBlock1+='</tr>';
					}
					modalBlock1+='</tbody>';
				modalBlock1+='</table>';
			modalBlock1+='</div>';
		modalBlock1+='</div>';
	}
	
	
	$("#overAlltoursDivId").html(modalBlock);
	$("#designationWiseTourDivId").html(modalBlock1);
	initializeDataTableWithPagination("DesignationWiseToursDatableId11");
	$("#DesignationWiseToursDatableId11").tableHeadFixer({"head" : false, "left" : 1}); 
	
}
function getruleWiseActionBotsToursOverview(){
	 
	$("#actionBotsMonthlyDetailsDivId").html(spinner);
	
	 var json={
		 "activityMemberId":"44",	
		 "stateId":"1",
		 "fromDateStr":tourCustomStartDate,
	     "toDateStr":tourCustomEndDate,
		 "partyMeetingLevelIds":[],
		 "moduleType":"TOUR",
		 "designationIds":designationIdsArr
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
				 buildruleWiseActionBotsToursOverview(result);
			 }else{
				 $("#actionBotsMonthlyDetailsDivId").html('');
			 }
			
		 },
		failure: function(xhr) {
			return xhr;
		 }
	 });
 }
 
 function buildruleWiseActionBotsToursOverview(result){
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
							modalBlock+='<li><img src="Core/images/Tours.png" class="img-responsive" alt="actionBots" style="width: 30px;height: auto;"/>Tours</li>';
							modalBlock+='<li>Total Bots : <span class="h5_font font_weight">'+emptyCheck(result[0].ruleIdCount)+'</span></li>';
							modalBlock+='<li>Executed Bots : <span class="h5_font font_weight">'+emptyCheck(result[0].executedBots)+'</span></li>';
							if(result[0].successPercentage !=null && result[0].successPercentage>0){
								modalBlock+='<li>Success : <span class="h5_font font_weight color_green">'+emptyCheck(result[0].success)+' (<small>'+result[0].successPercentage+' %</small>)</span></li>';
							}else{
								modalBlock+='<li>Success : <span class="h5_font font_weight color_green"> - </span></li>';
							}
							if(result[0].failPercentage !=null && result[0].failPercentage>0){
								modalBlock+='<li>Failure : <span class="h5_font font_weight color_red">'+emptyCheck(result[0].fail)+' (<small>'+result[0].failPercentage+' %</small>)</span></li>';
							}else{
								modalBlock+='<li>Failure : <span class="h5_font font_weight color_red"> - </span></li>';
							}
							
						modalBlock+='</ul>';
					 modalBlock+='</div>';
				 modalBlock+='</div>';
			 modalBlock+='</div>';		
	   modalBlock+='</div>';
	   modalBlock+='<div class="card-body">';
			 if($(window).width() < 800){
					modalBlock+='<div class="table-responsive">';
			}
			modalBlock+='<table class="table table_custom_meeting" id="tourActionBotsDataTableId">';
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
									if(result[i].percentage != 0) {
										modalBlock+='<span class="color_green"> '+result[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
									} else {
										modalBlock+='<span class="color_green"> '+result[i].percentage.toFixed(2)+'% </span> ';
									}
								}else{
									if(result[i].percentage != 0) {
										modalBlock+='<span class="color_red"> '+result[i].percentage.toFixed(2)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
									} else {
										modalBlock+='<span class="color_red"> '+result[i].percentage.toFixed(2)+'% </span> ';
									}
								}
							modalBlock+='</td>';
							modalBlock+='<td class="">'+emptyCheck(result[i].open)+'</td>';
							modalBlock+='<td class="">'+emptyCheck(result[i].close)+'</td>';
							modalBlock+='<td class="">'+emptyCheck(result[i].total)+'</td>';
						modalBlock+='</tr>';
					}
				modalBlock+='</tbody>';
				
			modalBlock+='</table>';
			 if($(window).width() < 800){
					modalBlock+='</div>';
			}
	   modalBlock+='</div>';
	modalBlock+='</div>';
	
	$("#actionBotsMonthlyDetailsDivId").html(modalBlock);
	initializeDataTableWithOutPagination("tourActionBotsDataTableId");
	$("#tourActionBotsDataTableId").tableHeadFixer({"head" : false, "left" : 1});
 }
 function getTourVarianceReport(value){
	$("#varianceReportTourBlockDivId").html(spinner);
	var json={
		"fromDateStr":moment().subtract(20, 'month').startOf('month').format('DD/MM/YYYY'),
		"toDateStr":moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY'),
		"stateId":"1",
		"activityMemberId":44,
		"designationIds":designationIdsArr
	};
	 $.ajax({
		url: "getTourVarianceReport",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				buildTourVarianceReport(result,value);
			}else{
				$("#varianceReportTourBlockDivId").html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildTourVarianceReport(result,value) {
	var modalBlock='';
	var totalImpact,totalPerc,totalCount,totalPastCount;
	var sublistLen=0;
		modalBlock+='<div class="table-responsive">';
			modalBlock+='<table class="table table-bordered table_custom_meeting" id="actionBotsToursDatableId" style="width:100%">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th style="min-width:100px; !important;"></th>';
						modalBlock+='<th>INCREASE&nbsp;/&nbsp;DECREASE</th>';
						modalBlock+='<th>TOTAL Present '+value+'</th>';
						modalBlock+='<th>TOTAL Past '+value+'</th>';
						for(var i in result[0].subList) {
							modalBlock+='<th>'+result[0].subList[i].name+'</th>';
						}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in result) {
					sublistLen = result[i].subList.length;
					modalBlock+='<tr>';
						modalBlock+='<td style="min-width:100px; !important;">'+result[i].name+'</td>';
							if(value == "Complaince") {
								totalImpact = result[i].subList[0].totalComplainceImpact;
								totalPerc = result[i].subList[0].totalComplaincePerc;
								totalCount = result[i].subList[0].totalComplaince;
								totalPastCount=result[i].subList[0].totalPastComplaince;
							} else if(value == "Non Complance") {
								totalImpact = result[i].subList[0].totalNonComplainceImpact;
								totalPerc = result[i].subList[0].totalNonComplaincePerc;
								totalCount = result[i].subList[0].totalNonComplaince;
								totalPastCount=result[i].subList[0].totalPastNonComplaince;
							} else if(value == "Submitted") {
								totalImpact = result[i].subList[0].totalSubmittedImpact;
								totalPerc = result[i].subList[0].totalSubmittedPerc;
								totalCount = result[i].subList[0].totalSubmitted;
								totalPastCount=result[i].subList[0].totalPastSubmitted;
							} else {
								totalImpact = result[i].subList[0].totalNotSubmittedImpact;
								totalPerc = result[i].subList[0].totalNotSubmittedPerc;
								totalCount = result[i].subList[0].totalNotSubmitted;
								totalPastCount=result[i].subList[0].totalPastNotSubmitted;
							}
							modalBlock+='<td class="">';
							if(totalPerc !=null && totalPerc>0){
									if(totalImpact == "positive"){
										modalBlock+='<span class="color_green"> '+totalPerc.toFixed(0)+'% <i class="fas fa-arrow-up color_green"></i> </span> ';
									}else{
										modalBlock+='<span class="color_red"> '+totalPerc.toFixed(0)+'% <i class="fas fa-arrow-down color_red"></i> </span> ';
									}
							}else{
								modalBlock+='<span class=""> - <span>';
							}
							modalBlock+='</td>';
							modalBlock+='<td>'+emptyCheck(totalCount)+'</td>';
							modalBlock+='<td>'+emptyCheck(totalPastCount)+'</td>';
							
						for(var j in result[i].subList) {
							
							if(value == "Complaince") {
								modalBlock+='<td>'+emptyCheck(result[i].subList[j].complainceCnt)+'</td>';
							} else if(value == "Non Complance") {
								modalBlock+='<td>'+emptyCheck(result[i].subList[j].nonComplainceCnt)+'</td>';
							} else if(value == "Submitted") {
								modalBlock+='<td>'+emptyCheck(result[i].subList[j].submitedLeaderCnt)+'</td>';
							} else {
								modalBlock+='<td>'+emptyCheck(result[i].subList[j].notSubmitedLeaserCnt)+'</td>';
							}
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		modalBlock+='</div>';	
		
	$("#varianceReportTourBlockDivId").html(modalBlock);
	initializeDataTableWithOutPagination("actionBotsToursDatableId");
	$("#actionBotsToursDatableId").tableHeadFixer({"head" : false, "left" : 1,'z-index': 0});
	
	
	
}

function getConsolidatedReport(type,buildType){
	if(buildType == "mainBuild"){
		$("#consolidatedReportBlockDivId").html(spinner);
			var json={
				"fromDateStr":tourCustomStartDate,
				"toDateStr":tourCustomEndDate,
				"stateId":"1",
				"activityMemberId":44,
				"filterType":type,
				"percent":0,
				"designationIds":designationIdsArr
			};
	}else{
		$("#designationWiseToursDetailsDivId").html(spinner);
			var json={
				"fromDateStr":tourCustomStartDate,
				"toDateStr":tourCustomEndDate,
				"stateId":"1",
				"activityMemberId":44,
				"userTypeId":2,
				"filterType":type,
				"percent":0,
				"designationIds":designationIdsArr
			};
	}
	
	 $.ajax({
		url: "getConsolidatedReport",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null && result.length>0){
				buildConsolidatedReport(result,buildType);
			}else{
				if(buildType == "mainBuild"){
					$("#consolidatedReportBlockDivId").html("No Data Available");
				}else{
					$("#designationWiseToursDetailsDivId").html("No Data Available");
				}
				
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildConsolidatedReport(result,buildType){
	var modalBlock='';
	modalBlock+='<div class="new_border_yash_pad pad_10">';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12">';
				modalBlock+='<div class="table-responsive">';
					modalBlock+='<table class="table table_custom_meeting" id="actionBotsconsolidatedDatableId'+buildType+'">';
						modalBlock+='<thead>';
							modalBlock+='<tr>';
								modalBlock+='<th>Name</th>';
								modalBlock+='<th>Designation</th>';
								modalBlock+='<th>Months Submitted</th>';
								modalBlock+='<th>Months Not Submitted</th>';
								modalBlock+='<th>Months Complaince</th>';
								modalBlock+='<th>Months Non Complaince</th>';
							modalBlock+='</tr>';
						modalBlock+='</thead>';
						modalBlock+='<tbody>';
						for(var i in result) {
							modalBlock+='<tr>';	
								modalBlock+='<td>'+result[i].name+'</td>';
								modalBlock+='<td>'+result[i].designation+'</td>';
								modalBlock+='<td>'+result[i].monthsSubmited+'</td>';
								modalBlock+='<td>'+result[i].monthsNotSubmited+'</td>';
								modalBlock+='<td>'+result[i].monthsComplaincne+'</td>';
								modalBlock+='<td>'+result[i].monthsNotComplaince+'</td>';
							modalBlock+='</tr>';
						}
						modalBlock+='</tbody>';
					modalBlock+='</table>';
				modalBlock+='</div>';	
			modalBlock+='</div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	if(buildType == "mainBuild"){
		$("#consolidatedReportBlockDivId").html(modalBlock);
	}else{
		$("#designationWiseToursDetailsDivId").html(modalBlock);
	}
	
	initializeDataTableWithPagination("actionBotsconsolidatedDatableId"+buildType);
	$("#actionBotsconsolidatedDatableId"+buildType).tableHeadFixer({"head" : false, "left" : 1});
}

function levelWiseTourData() {
	var levelWiseTourArr = [{name:'District',id:"3"},{name:'Parliament',id:"4"},{name:'Constituency',id:"5"}];	
	var collapse='';
	collapse+='<section>';
	for(var i in levelWiseTourArr)
	{
		collapse+='<div class="row">';
			collapse+='<div class="col-sm-12 m_top10">';
					collapse+='<div class="" id="accordion'+levelWiseTourArr[i].name+'" role="tablist" aria-multiselectable="true">';
						collapse+='<div class="card card-white">';
							collapse+='<div class="card-header card-header-custom" role="tab" id="heading'+levelWiseTourArr[i].name+'">';
								if(i == 0)
								{
									collapse+='<a role="button" class="panelCollapseIcon '+levelWiseTourArr[i].name+'"  data-toggle="collapse" data-parent="#accordion'+levelWiseTourArr[i].name+'" href="#collapse'+levelWiseTourArr[i].name+'" aria-expanded="true" aria-controls="collapse'+levelWiseTourArr[i].name+'">';
								}else{
									collapse+='<a role="button" class="panelCollapseIcon collapsedCls '+levelWiseTourArr[i].name+'"  data-toggle="collapse" data-parent="#accordion'+levelWiseTourArr[i].name+'" href="#collapse'+levelWiseTourArr[i].name+'" aria-expanded="true" aria-controls="collapse'+levelWiseTourArr[i].name+'">';
								}
								collapse+='<h4 class="card-title text-uppercase card-title-custom">'+levelWiseTourArr[i].name+' Wise Details</h4>';
									
								collapse+='</a>';
							collapse+='</div>';
							if(i == 0)
							{
								collapse+='<div id="collapse'+levelWiseTourArr[i].name+'" class="collapse show" role="tabpanel" aria-labelledby="heading'+levelWiseTourArr[i].name+'">';
							}else{
								collapse+='<div id="collapse'+levelWiseTourArr[i].name+'" class="collapse collapseShowCls show" role="tabpanel" aria-labelledby="heading'+levelWiseTourArr[i].name+'">';
							}
							
								collapse+='<div class="card-body">';
									collapse+='<div id="tourLevelWise'+levelWiseTourArr[i].name+'"></div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
			collapse+='</div>';
			collapse+='</div>';
	}
	collapse+='</section>';
	$("#locationWiseToursOverAllDivId").html(collapse);
	for(var i in levelWiseTourArr){
		getLocationWiseComplainceCount(levelWiseTourArr[i].name,levelWiseTourArr[i].id,"Complaince");
	}
}
function getLocationWiseComplainceCount(locationLevel,locationScopeId,type){
	 
	$("#tourLevelWise"+locationLevel).html(spinner);
	
	var json={
		"fromDateStr":tourCustomStartDate,
		"toDateStr":tourCustomEndDate,
		"stateId":"1",
		"activityMemberId":44,
		"sortingType":type,
		"locationScopeId":locationScopeId, //3,4,5
		"designationIds":designationIdsArr
	};
	$.ajax({
		 url: "getLocationWiseComplainceCount",
		 data: JSON.stringify(json),
		 type: "POST",
		 dataType: 'json', 
		 beforeSend: function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },
		 success: function(result) {
			 if(result !=null){
				buildLocationWiseComplainceCount(result,locationLevel);
			 }else{
				$("#tourLevelWise"+locationLevel).html('No Data Available');
			 }
			
		 },
		failure: function(xhr) {
			return xhr;
		 }
	});
 }
function buildLocationWiseComplainceCount(result,locationLevel) {
	var collapse='';
	collapse+='<div class="table_border_yash_pad">';
		collapse+='<div class="row">';
			collapse+='<div class="col">';
				if($(window).width() < 800){
					collapse+='<div class="table-responsive">';
				}
					collapse+='<table class="table table_custom_meeting" id="levelWiseDataTable'+locationLevel+'" style="width:100%">';
						collapse+='<thead>';
							collapse+='<tr>';
							if(locationLevel == "Parliament") {
								collapse+='<th>Parliament</th>';
							} else {
								collapse+='<th>District</th>';
							}
								collapse+='<th>Total Leaders</th>';
								collapse+='<th>Not Submitted</th>';
								collapse+='<th>%</th>';
								collapse+='<th>Submitted</th>';
								collapse+='<th>%</th>';
								collapse+='<th>Complaince</th>';
								collapse+='<th>%</th>';
								collapse+='<th>Non Complaince</th>';
								collapse+='<th>%</th>';
							collapse+='</tr>';
						collapse+='</thead>';
						collapse+='<tbody>';
						for(var i in result) {
							collapse+='<tr>';
								collapse+='<td>'+result[i].name+'</td>';
								if(result[i].totalCandidate !=null && result[i].totalCandidate>0){
									collapse+='<td class="color_light_blue " attr_filter_type="all" attr_level_id="'+result[i].id+'" attr_level_val="'+locationLevel+'" attr_click_type="location">'+emptyCheck(result[i].totalCandidate)+'</td>';
								}else{
									collapse+='<td class="color_light_blue"> - </td>';
								}
								if(result[i].totalNotSubmited !=null && result[i].totalNotSubmited>0){
									collapse+='<td class="color_light_yellow " attr_filter_type="notSubmitteed" attr_level_id="'+result[i].id+'" attr_level_val="'+locationLevel+'" attr_click_type="location">'+emptyCheck(result[i].totalNotSubmited)+'</td>';
								}else{
									collapse+='<td class="color_light_yellow"> - </td>';
								}
								
								collapse+='<td class="color_light_yellow color_green">'+emptyCheck(result[i].notSubmitedPercent)+'</td>';
								if(result[i].totalSubmited !=null && result[i].totalSubmited>0){
									collapse+='<td class="color_light_yellow " attr_filter_type="submitted" attr_level_id="'+result[i].id+'" attr_level_val="'+locationLevel+'" attr_click_type="location">'+emptyCheck(result[i].totalSubmited)+'</td>';
								}else{
									collapse+='<td class="color_light_yellow"> - </td>';
								}
								
								collapse+='<td class="color_light_yellow color_green">'+emptyCheck(result[i].submitedPercent)+'</td>';
								if(result[i].totalComplaince !=null && result[i].totalComplaince>0){
									collapse+='<td class="color_light_green " attr_filter_type="Complaince" attr_level_id="'+result[i].id+'" attr_level_val="'+locationLevel+'" attr_click_type="location">'+emptyCheck(result[i].totalComplaince)+'</td>';
								}else{
									collapse+='<td class="color_light_green"> - </td>';
								}
								
								collapse+='<td class="color_light_green color_green">'+emptyCheck(result[i].complaincePercent)+'</td>';
								
								if(result[i].totalNonComplaince !=null && result[i].totalNonComplaince>0){
									collapse+='<td class="color_light_green " attr_filter_type="noncompliance" attr_level_id="'+result[i].id+'" attr_level_val="'+locationLevel+'" attr_click_type="location">'+emptyCheck(result[i].totalNonComplaince)+'</td>';
								}else{
									collapse+='<td class="color_light_green"> - </td>';
								}
								
								collapse+='<td class="color_light_green color_green">'+emptyCheck(result[i].notComplaincePercent)+'</td>';
							collapse+='</tr>';
						}
						collapse+='</tbody>';
					collapse+='</table>';
					if($(window).width() < 800){
						collapse+='</div>';	
					}
			collapse+='</div>';	
		collapse+='</div>';	
	collapse+='</div>';
	$("#tourLevelWise"+locationLevel).html(collapse);
	
	/* if(result ==null || result.length == 0){
		$("#accordion"+locationLevel).hide();
	} */
	
	if(locationLevel != "District") {
		initializeDataTableWithPagination("levelWiseDataTable"+locationLevel);
	}else {
		initializeDataTableWithOutPagination("levelWiseDataTable"+locationLevel);
	}
	$("#levelWiseDataTable"+locationLevel).tableHeadFixer({"head" : false, "left" : 1})
}
 
 
function getPercentage(subCount,totalCnt) {
   var percentage = (subCount*100)/totalCnt;
   if (percentage != null && percentage > 0) {
     return percentage.toFixed(2);
   } else {
     return 0;
   }
 }
 
function emptyCheck(filedValue){
	var returnVal = ' - ';
	if( filedValue !=null && filedValue > 0){
		returnVal = filedValue;
	}
	return returnVal;
}
$(document).on('change','.varianceSelectClk',function(){
	var value = $(this).val();
	getTourVarianceReport(value);
});
$(document).on("click",".toursComplainsDtsCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	var tourBlockValue = $(this).attr("attr_tour_block_val");
	
	designationIdsArr =[];
	if(tourBlockValue == 0){
		designationIdsArr =[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
	}else{
		designationIdsArr.push(tourBlockValue)
		
	}
	
	if(type != "nonComplaince"){
		getConsolidatedReport(type,"mainBuild");
	}else{
		getTourLeaderDtlsBasedOnSelectionType(type,"mainBuild");
	}
	
	
});
$(document).on("click",".getTourClickDetailsCls",function(){
	designationIdsArr=[];
	$("#meetingWiseAttendanceDtsDivId").html('');
	var filter_Type = $(this).attr("attr_filter_Type");
	var designationId = $(this).attr("attr_designation_id");
	var tour_block_val = $(this).attr("attr_tour_block_val");
	
	var level_id = $(this).attr("attr_level_id");
	var level_val = $(this).attr("attr_level_val");
	var clickType = $(this).attr("attr_click_type");
	var viewType = $(this).attr("attr_view_type");
	
	if(viewType == "clickView"){
		designationIdsArr.push(designationId);
	}
	
	
	$("#meetingTypeHeadingId").html("LEADERS DETAILED REPORT");
	$("#meetingTypeModalDivId").modal("show");
	
	
	buildTourLeaderDetailsClick(filter_Type,"clickView",designationId);
	
});

function buildTourLeaderDetailsClick(filter_Type,clickType,designationId){
	var modalBlock='';
	
	modalBlock+='<div class="row">';
		modalBlock+='<div class="col-sm-12 m_top10 float-right">';
			modalBlock+='<ul class="list-inline switch-btn-New toursComplainsDtsClickCls float-right m_bottom_0">';
				modalBlock+='<li attr_type="all" class="active" attr_designation_id="'+designationId+'">All</li>';
				modalBlock+='<li attr_type="complaince" attr_designation_id="'+designationId+'">Complaince</li>';
				modalBlock+='<li attr_type="nonComplaince" attr_designation_id="'+designationId+'">Non - Complance</li>';
				modalBlock+='<li attr_type="submitted" attr_designation_id="'+designationId+'">Submitted</li>';
				modalBlock+='<li attr_type="notSubmitted" attr_designation_id="'+designationId+'">Not- Submitted</li>';
			modalBlock+='</ul>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div class="row">';
		modalBlock+='<div class="col-sm-12 m_top10">';
			modalBlock+='<div id="designationWiseToursDetailsDivId"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	$("#meetingWiseWiseModalDivId").html(modalBlock);
	getConsolidatedReport(filter_Type,clickType);
}
$(document).on("click",".toursComplainsDtsClickCls li",function(){
	designationIdsArr=[];
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	
	var designationId = $(this).attr("attr_designation_id");
	
	designationIdsArr.push(designationId);
	if(type != "nonComplaince"){
		getConsolidatedReport(type,"clickView");
	}else{
		getTourLeaderDtlsBasedOnSelectionType(type,"clickView");
	}
});

function getTourLeaderDtlsBasedOnSelectionType(filter_Type,buildType){
	if(buildType == "mainBuild"){
		$("#consolidatedReportBlockDivId").html(spinner);
			var json={
				"activityMemberId":"44",
				"stateId":1,
				"fromDateStr":tourCustomStartDate,
				"toDateStr":tourCustomEndDate,
				"designationIds":designationIdsArr,
				"filterType":filter_Type, 
				"type":"coreDashbaord"

			};
	}else{
		$("#designationWiseToursDetailsDivId").html(spinner);
		var json={
			"activityMemberId":"44",
			"stateId":1,
			"fromDateStr":tourCustomStartDate,
			"toDateStr":tourCustomEndDate,
			"designationIds":designationIdsArr,
			"filterType":filter_Type, 
			"type":"coreDashbaord"

		};
	}
	
	$.ajax({
		 url: "getTourLeaderDtlsBasedOnSelectionType",
		 data: JSON.stringify(json),
		 type: "POST",
		 dataType: 'json', 
		 beforeSend: function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },
		 success: function(result) {
			 if(result !=null && result.length>0){
				buildTourMemberDetails(result,buildType);
			 }else{
				 if(buildType == "mainBuild"){
					 $("#consolidatedReportBlockDivId").html('No Data Available');
				 }else{
					 $("#designationWiseToursDetailsDivId").html('No Data Available');
				 }
				
			 }
			
		 },
		failure: function(xhr) {
			return xhr;
		 }
	});
 }
 function buildTourMemberDetails(result,buildType){
    
    if(result != null && result.length > 0){
      var str1='';
	      
      for(var i in result){
	   if(result[i].subList3 == null || result[i].subList3.length == 0){
		  continue;	
		}
		
		str1+='<div class="new_border_yash_pad pad_10 m_top10">';
			str1+='<div class="row">';
				str1+='<div class="col m_top10">';
					str1+='<h6 class="font_weight text-uppercase">'+result[i].name+'&nbsp&nbspTours Submitted Report</h6>';
				str1+='</div>';
			str1+='</div>';
			
			str1+='<div class="row">';
				str1+='<div class="col m_top10">';
					str1+='<div id="tourMemberDtls'+i+'"></div>';
				str1+='</div>';
			str1+='</div>';
		str1+='</div>';
	  }
	  if(buildType == "mainBuild"){
		   $("#consolidatedReportBlockDivId").html(str1);
	  }else{
		   $("#designationWiseToursDetailsDivId").html(str1);
	  }
     
    }
    if(result != null && result.length > 0){
		for(var i in result){
		  if(result[i].subList3 == null || result[i].subList3.length == 0){
			$("#tourMemberDtls"+i).html('NO DATA AVAILABLE');
			 return;			
		  }
			var str='';
			var length = result
				if($(window).width() < 800)
				{
					str+='<div class="table-responsive">';
				}
			  str+='<table class="table table-bordered table_custom_meeting" id="tourDetailsDataTabelId'+buildType+''+i+'">';
				  str+='<thead>';
					str+='<tr>';
						var maxLengthForSpan = 0;
						if(result[i].subList3 != null && result[i].subList3.length > 0){
						  for(var j in result[i].subList3){
							if(result[i].subList3[j].subList3 != null && result[i].subList3[j].subList3.length > 0)
							  maxLengthForSpan = result[i].subList3[j].subList3.length;
						  }
						}
						str+='<th rowspan="2">Leaders Name</th>';
						/* if(maxLengthForSpan >=3){
						  str+='<th rowspan="'+(maxLengthForSpan)+'" class="text-capital text-center" style="vertical-align: middle;">Leaders Name</th>';
						}else{
						  str+='<th rowspan="'+(maxLengthForSpan+1)+'" class="text-capital text-center" style="vertical-align: middle;">Leaders Name</th>';
						} */
						
						str+='<th colspan="'+(maxLengthForSpan+1)+'" rowspan="1">Complaince RATIO</th>';
						
						for(var k in result[i].subList3[0].subList3){
						  str+='<th colspan="2" rowspan="1">'+result[i].subList3[0].subList3[k].name+'</th>';
						}
					  
					  str+='</tr>';
					  str+='<tr>';
						
						str+='<th>over all</th>';
							for(var k in result[i].subList3[0].subList3){
							  str+='<th >'+result[i].subList3[0].subList3[k].name+'</th>';
							  
							}
						for(var k in result[i].subList3[0].subList3){
						str+='<th>Target</th>';
						str+='<th>Toured</th>';
						}
					  str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						//str+='<td></td>';
							for(var j in result[i].subList3){
							  str+='<tr>';
								str+='<td>'+result[i].subList3[j].name+'</td>';//santosh
								if(result[i].subList3[j].complaincePer !=null && result[i].subList3[j].complaincePer>0){
									str+='<td>'+result[i].subList3[j].complaincePer+'%</td>';
								}else{
									str+='<td> - </td>';
								}
								for(var k in result[i].subList3[j].subList3){
									if(result[i].subList3[j].subList3[k].complaincePer !=null && result[i].subList3[j].subList3[k].complaincePer>0){
										str+='<td>'+result[i].subList3[j].subList3[k].complaincePer+'%</td>';
									}else{
										str+='<td> - </td>';
									}
								 	
								}                        
							  for(var k in result[i].subList3[j].subList3){
								var monthList = result[i].subList3[j].subList3[k].monthList;
								if(result[i].subList3[j].subList3[k].targetDays !=null && result[i].subList3[j].subList3[k].targetDays>0){
									str+='<td>'+result[i].subList3[j].subList3[k].targetDays+'</td>';
								}else{
									str+='<td> - </td>';
								}
								
								str+='<td>';
								if(result[i].subList3[j].subList3[k].complainceDays !=null && result[i].subList3[j].subList3[k].complainceDays>0){
									str+='<span>'+result[i].subList3[j].subList3[k].complainceDays+'</span> <span class="dropdown-toggle" style="cursor:pointer;" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-info-circle"></i></span>';
								}else{
									str+=' - ';
								}
								str+='<div class="dropdown-menu posAlignmentCls" aria-labelledby="dropdownMenu2" >';
									str+='<div class="arrow_box_top1">';
										str+='<table class="table table-bordered table_custom_news">';
											str+='<thead>';
											str+='<th>Month</th>';
											str+='<th>Target</th>';
											str+='<th>Tour</th>';
											str+='<th>Complaince</th>';
											str+='</thead>';
											str+='<tbody>';
													 if(monthList != null && monthList.length > 0){
														 for(var l in monthList){
															str+='<tr>';
															if(monthList[l].name != null && monthList[l].name.length > 0){
															str+='<td style="border-top:none !important">'+monthList[l].name+'</td>';	
															}else{
															str+='<td style="border-top:none !important"> - </td>';	
															}
															str+='<td class="text-center;">'+monthList[l].targetDays+'</td>';
															if(monthList[l].complainceDays > 0){
															str+='<td class="text-center;">'+monthList[l].complainceDays+'</td>';	
															}else{
															str+='<td> - </td>';	
															}
															if(monthList[l].complainceDays == 0){
															str+='<td>-</td>';	
															}else if(monthList[l].complainceDays>=monthList[l].targetDays){
															str+='<td><i class="fas fa-check-circle" style="color:green;"></i></small>&nbsp&nbspYES<small></td>';		
															}else if(monthList[l].complainceDays<monthList[l].targetDays){
															 str+='<td><i class="fas fa-time-circle" style="color:red;"></i></small>&nbsp&nbspNO<small></td>';			
															}
														   str+='</tr>'; 
														 }
													 }
											str+='</tbody>';
											str+='</table>';
									str+='</div>';
								str+='</div>';
								str+='</td>';
							  }
							  str+='</tr>';
							}
						  
						str+='</tbody>';
						
				  str+='</table>';
				
				if($(window).width() < 800)
				{
					str+='</div>';
				}
			$("#tourMemberDtls"+i).html(str);
			initializeDataTableWithPagination("tourDetailsDataTabelId"+buildType+i);
			
	 	}
    }
  }
  
  $(document).on("click",".tour-dropdown-cls",function(e){
		e.stopPropagation();
		$(".menu-data-cls1").toggle();
	});

	$(document).on("click",".menu-data-cls1",function(e){
		e.stopPropagation();
	});

	$(document).on("click",function(){
		$(".menu-data-cls1").hide();
	});
	