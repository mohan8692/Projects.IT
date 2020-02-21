var printMediaComponent = printMediaComponent || {};

var overAllNewsPopup = "";
var varianceInputParam = "";
var newsTypeInputParam = "";
var partyVsPubInputParam = "";
var districtWisePartyInputParam = "";
var constituencyWisePartyInputParam = "";
var parliamentWisePartyInputParam = "";

function basicPrintMediaDetails(blockValue,divId,chosenLabel){
	var modalBlock='';
		
			modalBlock+='<div class="card">';
			   modalBlock+='<div class="card-header">';
				if(divId == "printMediaId"){
					modalBlock+='<h6 class="font_weight m_bottom_0">OVERALL OVERVIEW</h6>';
				}else{
					modalBlock+='<h6 class="font_weight m_bottom_0">OVERALL OVERVIEW - <small>Time Wise Details</small></h6>';
				}
			   modalBlock+='</div>';
			   modalBlock+='<div class="card-body">';
					modalBlock+='<div id="overAllNewsDetailsId'+divId+'"></div>';
			   modalBlock+='</div>';
			modalBlock+='</div>';
			
			modalBlock+='<div id="overAllActionBotsDetailsId'+divId+'"></div>';
		
		modalBlock+='<div class="card card_bg m_top20">';
		   modalBlock+='<div class="card-header">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-6">';
						modalBlock+='<h6 class="font_weight m_bottom_0 m_top10">VARIANCE - <small id="variancePartyNameId">TDP</small></h6>';
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-3 float-right">';
						modalBlock+='<div class="input-group">';
						 modalBlock+=' <div class="input-group-prepend">';
							modalBlock+='<label class="input-group-text" for="inputGroupSelect01">Select Party</label>';
						 modalBlock+=' </div>';
							 modalBlock+='<select class="float-right custom-select variancePartyId" id="" attr_divId="'+divId+'" attr_blockValue="'+blockValue+'" >';
								//modalBlock+='<option value="">ALL</option>';
								modalBlock+='<option value="872" selected>TDP</option>';
								modalBlock+='<option value="1117">YSRC</option>';
								modalBlock+='<option value="163">BJP</option>';
								modalBlock+='<option value="1853">JANASENA</option>';
								modalBlock+='<option value="362">INC</option>';
							modalBlock+='</select>';
						modalBlock+='</div>';
					modalBlock+='</div>';
					
					modalBlock+='<div class="col-sm-3 float-right">';
						modalBlock+='<div class="input-group">';
						 modalBlock+=' <div class="input-group-prepend">';
							modalBlock+='<label class="input-group-text" for="inputGroupSelect01">Select Edition</label>';
						 modalBlock+=' </div>';
							 modalBlock+='<select class="float-right custom-select varianceEditionTypeCls" id="" attr_divId="'+divId+'" attr_blockValue="'+blockValue+'" >';
								modalBlock+='<option value="0" selected>ALL</option>';
								if(divId == "printMediaId"){
									modalBlock+='<option value="1">Main Edition</option>';
									modalBlock+='<option value="2">District Edition</option>';
								}else{
									modalBlock+='<option value="1">News Bulletin</option>';
									modalBlock+='<option value="2">News Program</option>';	
								}
								
							modalBlock+='</select>';
						modalBlock+='</div>';
					modalBlock+='</div>';
					
			   modalBlock+='</div>';
		   modalBlock+='</div>';
		   modalBlock+='<div class="card-body pad_5 card_bg">';
				modalBlock+='<div id="varianceNewsDetailsId'+divId+'"></div>';
		   modalBlock+='</div>';
		modalBlock+='</div>';
	
		if(divId == "printMediaI"){//varainceblock
			modalBlock+='<div class="card m_top20">';
			   modalBlock+='<div class="card-header" style="padding-bottom: 0px;">';
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-4">';
							modalBlock+='<h6 class="font_weight m_bottom_0 m_top10">NEWS TYPE ANALYSIS</h6>';
						modalBlock+='</div>';
						modalBlock+='<div class="col-sm-8">';
							modalBlock+='<ul class="list-inline basic_list_type m_bottom_0 float-right">';
							
								modalBlock+='<li>';
									modalBlock+='<p>GOOD <span class="green_border"></span></p>';
								modalBlock+='</li>';
								
								modalBlock+='<li>';
									modalBlock+='<p>BAD <span class="red_border"></span></p>';
								modalBlock+='</li>';
								
								modalBlock+='<li>';
									modalBlock+='<p>NEUTRAL <span class="yellow_border"></span></p>';
								modalBlock+='</li>';
								
							modalBlock+='</ul>';
						modalBlock+='</div>';
					 modalBlock+='</div>';
					
			   modalBlock+='</div>';
			   modalBlock+='<div class="card-body pad_5">';
					modalBlock+='<div id="newsTypeAnalysisDetailsId'+divId+'"></div>';
			   modalBlock+='</div>';
			modalBlock+='</div>';
		}
		
		modalBlock+='<div class="card card_bg m_top20">';
		   modalBlock+='<div class="card-header">';
			modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-4">';
						if(divId == "printMediaId"){
							modalBlock+='<h6 class="font_weight m_bottom_0 m_top10">PARTIES VS PUBLICATIONS</h6>';
						}else{
							modalBlock+='<h6 class="font_weight m_bottom_0 text-uppercase m_top10">State Wise - Programs Overview</h6>';
						}
						
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-8 float-right">';
						modalBlock+='<ul class="list-inline switch-btn-New float-right editionWisePartyVsPubCls m_bottom_0">';
							
							if(divId == "printMediaId"){
								modalBlock+='<li attr_type="0" attr_blockValue="'+blockValue+'" class="active" attr_divId="'+divId+'">BOTH</li>';	
								modalBlock+='<li attr_type="1" attr_blockValue="'+blockValue+'" attr_divId="'+divId+'">MAIN EDITION</li>';
								modalBlock+='<li attr_type="2" attr_blockValue="'+blockValue+'" attr_divId="'+divId+'">DISTRICT EDITION</li>';
							}else{
								modalBlock+='<li attr_type="0" attr_blockValue="'+blockValue+'" class="active" attr_divId="'+divId+'">BOTH</li>';
								modalBlock+='<li attr_type="1" attr_blockValue="'+blockValue+'" attr_divId="'+divId+'">News Bulletin</li>';
								modalBlock+='<li attr_type="2" attr_blockValue="'+blockValue+'" attr_divId="'+divId+'">News Program</li>';
							}
					modalBlock+='</ul>';
					modalBlock+='</div>';
			   modalBlock+='</div>';
		   modalBlock+='</div>';
		   modalBlock+='<div class="card-body pad_5 card_bg">';
				modalBlock+='<div id="partyVsPublicationDetailsId'+divId+'"></div>';
		   modalBlock+='</div>';
		modalBlock+='</div>';
		
		
		
		modalBlock+='<div class="card m_top20">';
		   modalBlock+='<div class="card-header" style="padding-bottom: 0px;">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-4">';
						modalBlock+='<h6 class="font_weight m_bottom_0 m_top10">LOCATION WISE OVERVIEW</h6>';
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-8">';
						modalBlock+='<ul class="list-inline basic_list_type m_bottom_0 float-right">';
						
							modalBlock+='<li>';
								modalBlock+='<p>GOOD <span class="green_border"></span></p>';
							modalBlock+='</li>';
							
							modalBlock+='<li>';
								modalBlock+='<p>BAD <span class="red_border"></span></p>';
							modalBlock+='</li>';
							
							modalBlock+='<li>';
								modalBlock+='<p>NEUTRAL <span class="yellow_border"></span></p>';
							modalBlock+='</li>';
							
						modalBlock+='</ul>';
					modalBlock+='</div>';
				 modalBlock+='</div>';
				
		   modalBlock+='</div>';
		   modalBlock+='<div class="card-body pad_5">';
		   
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-12 m_top10">';
						modalBlock+='<h6 class="font_weight m_bottom_0 text-uppercase">District Wise Details</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				 
				modalBlock+='<div id="districtWiseDetailsId'+divId+'"></div>';
				
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-12 m_top10">';
						modalBlock+='<h6 class="font_weight m_bottom_0 text-uppercase">Constituency Wise Details</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				
				modalBlock+='<div id="constituencyWiseDetailsId'+divId+'"></div>';
				
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-12 m_top10">';
						modalBlock+='<h6 class="font_weight m_bottom_0 text-uppercase">Parliament Wise Details</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				
				modalBlock+='<div id="parliamentWiseDetailsId'+divId+'"></div>';
		   modalBlock+='</div>';
		modalBlock+='</div>';
	
	$(".blockWiseModalDivId").html(modalBlock);
	$(".chosen-select").chosen();
	
	if(chosenLabel == "Overall"){
		customStartDate = moment().subtract(6, 'month').format('DD/MM/YYYY');
		customEndDate = moment().format('DD/MM/YYYY');
		$(".getSelectedMeetingDatesCls li").removeClass("active");
		$(".addClassNewsDft").addClass("active");
		$(".dateSelectedId").html("Last 6 Months");
	}
	
	var fromDateNews = customStartDate.split("/");
	var toDateNews =  customEndDate.split("/"); 
	
	fromDateSpitNews = fromDateNews[0]+"-"+fromDateNews[1]+"-"+fromDateNews[2];
	toDateSpitNews = toDateNews[0]+"-"+toDateNews[1]+"-"+toDateNews[2];
	
	newsPaperIds = "";
	newsChannelIds="";
	if(blockValue == 0){
		newsPaperIds = "2,3,5,8,1";
		newsChannelIds = "1,2,3,4,5,6,7";
	}else{
		newsPaperIds=blockValue;
		newsChannelIds=blockValue;
	}
	
	if(blockValue == 0){
		newsPaperIds1 = "''";
		newsChannelIds1 = "''";
	}else if(blockValue == 2){
		newsPaperIds1 = "6,7,20,21";
	} else if(blockValue == 3){
		newsPaperIds1 = "8,9,22,23";
		newsChannelIds1 = "10,12";
	} else if(blockValue == 5){
		newsChannelIds1 = "11,13";
	}
	if(divId == "printMediaId"){
		overAllNewsPopup = "getCoreDashBoardPartyWiseCountDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsPaperIds
		varianceInputParam = "getCoreDashBoardPartyWiseVarianceDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+globalpartyId+"/"+globalEditioinTypeId+"/"+newsPaperIds
		newsTypeInputParam = "getCoreDashBoardNewsTypeAnalysis/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsPaperIds
		partyVsPubInputParam = "getCoreDashBoardpartyVsPublicationAnalysis/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsPaperIds+"/"+globalEditioinTypeId
		districtWisePartyInputParam = "getDistrictWisePartyCounts/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsPaperIds+"/"+globalEditioinTypeId+"/district"
		constituencyWisePartyInputParam = "getDistrictWisePartyCounts/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsPaperIds+"/"+globalEditioinTypeId+"/constituency"
		parliamentWisePartyInputParam = "getDistrictWisePartyCounts/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsPaperIds+"/"+globalEditioinTypeId+"/parliament"
		overallActionBotsInputParam = "getBotsPMOverallDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/1/"+newsPaperIds1
		
		printMediaComponent.ajax.printMediaDetails(overAllNewsPopup,"overAllNewsDetailsId","",divId);//First Block
		printMediaComponent.ajax.printMediaDetails(varianceInputParam,"varianceNewsDetailsId","",divId);//Third Block
		printMediaComponent.ajax.printMediaDetails(newsTypeInputParam,"newsTypeAnalysisDetailsId","NEWS TYPE ANALYSIS",divId);//Fourth Block
		printMediaComponent.ajax.printMediaDetails(partyVsPubInputParam,"partyVsPublicationDetailsId","PARTIES VS PUBLICATIONS",divId);//Five Block
		printMediaComponent.ajax.printMediaDetails(districtWisePartyInputParam,"districtWiseDetailsId","DISTRICT WISE OVERVIEW",divId);//Six Block
		printMediaComponent.ajax.printMediaDetails(constituencyWisePartyInputParam,"constituencyWiseDetailsId","CONSTITUENCY WISE OVERVIEW",divId);//Six Block
		printMediaComponent.ajax.printMediaDetails(parliamentWisePartyInputParam,"parliamentWiseDetailsId","PARLIAMENT WISE OVERVIEW",divId);//Six Block
		if(blockValue == 0 || blockValue == 2 || blockValue == 3){
			printMediaComponent.ajax.printMediaDetails(overallActionBotsInputParam,"overAllActionBotsDetailsId","ACTION BOTS",divId);
		}
		
	}else if(divId == "elctronicMediaId"){
		overAllNewsPopup = "getCoreDashBoardEMPartyWiseCountDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsChannelIds
		varianceInputParam = "getEMPartyWiseVarianceDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+globalpartyId+"/"+globalEditioinTypeId+"/"+newsChannelIds
		partyVsPubInputParam = "getCoreDashBoardpartyVsChannelAnalysis/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsChannelIds+"/"+globalEditioinTypeId
		districtWisePartyInputParam = "getDistrictWiseEMPartyCounts/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsChannelIds+"/"+globalEditioinTypeId+"/district"
		constituencyWisePartyInputParam = "getDistrictWiseEMPartyCounts/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsChannelIds+"/"+globalEditioinTypeId+"/constituency"
		parliamentWisePartyInputParam = "getDistrictWiseEMPartyCounts/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsChannelIds+"/"+globalEditioinTypeId+"/parliament"
		overallActionBotsInputParam = "getBotsPMOverallDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/2/"+newsChannelIds1
		
		
		printMediaComponent.ajax.printMediaDetails(overAllNewsPopup,"overAllNewsDetailsId","",divId);//First Block
		printMediaComponent.ajax.printMediaDetails(varianceInputParam,"varianceNewsDetailsId","",divId);//Third Block
		printMediaComponent.ajax.printMediaDetails(partyVsPubInputParam,"partyVsPublicationDetailsId","State Wise - Programs Overview",divId);//Five Block
		printMediaComponent.ajax.printMediaDetails(districtWisePartyInputParam,"districtWiseDetailsId","DISTRICT WISE OVERVIEW",divId);//Six Block
		printMediaComponent.ajax.printMediaDetails(constituencyWisePartyInputParam,"constituencyWiseDetailsId","CONSTITUENCY WISE OVERVIEW",divId);//Six Block
		printMediaComponent.ajax.printMediaDetails(parliamentWisePartyInputParam,"parliamentWiseDetailsId","PARLIAMENT WISE OVERVIEW",divId);//Six Block
		if(blockValue == 0 || blockValue == 3 || blockValue == 5){
			printMediaComponent.ajax.printMediaDetails(overallActionBotsInputParam,"overAllActionBotsDetailsId","ACTION BOTS",divId);
		}
	}
	
	
	
}

printMediaComponent.ajax = (function(){
    function printMediaDetails(inputParams,blockId,headingName,divId){
		$("#"+blockId+divId).html(spinner);
		var urlVal = '';
		if(blockId == "overAllActionBotsDetailsId"){
			urlVal= wurl+"/NotificationMonitor/WebService/"+inputParams
		} else {
			urlVal= wurl+"/CommunityNewsPortal/webservice/"+inputParams
		}
		$.ajax({
			url:urlVal
			//url: "http://localhost:8080/CommunityNewsPortal/webservice/getDetailedPartyMainEditionsOverview/"+globalUserAccessLevelId+"/"+temp+"/"+globalState+"/"+startDate+"/"+endDate+"/"+newsPaperIdsStr
		}).then(function(response){
			if(response !=null && response.length>0){
				if(blockId == "overAllNewsDetailsId"){
					printMediaComponent.buildAjaxCallResult.buildOverAllNews(response,divId);
				}else if(blockId == "varianceNewsDetailsId"){
					printMediaComponent.buildAjaxCallResult.buildNewsVarianceDetails(response,divId);
				}else if(blockId == "newsTypeAnalysisDetailsId" || blockId == "partyVsPublicationDetailsId" || blockId == "districtWiseDetailsId" || blockId == "constituencyWiseDetailsId" || blockId == "parliamentWiseDetailsId"){
					printMediaComponent.buildAjaxCallResult.buildNewsTypePartyPubliDistrictDetails(response,blockId,headingName,divId);
				}else if(blockId == "overAllActionBotsDetailsId") {
					printMediaComponent.buildAjaxCallResult.buildOverallActionBotsDetails(response,blockId,headingName,divId);
				}
			}else{
				$("#"+blockId+divId).html('No Data Available');
			}
			
			
		});
		
    }
	return {
        printMediaDetails : printMediaDetails,
	}
}());

printMediaComponent.buildAjaxCallResult = (function(){
	function buildOverAllNews(response,divId){
		var statusColorObj={'red':'#F26365','green':'#A8D08E'}
		var modalBlock='';
		
		 modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-4">';
				modalBlock+='<div class="table-responsive">';
					modalBlock+='<table class="table table-bordered table_custom_news1 m_bottom_0" id="">';
						modalBlock+='<thead>';
							modalBlock+='<tr>';
								modalBlock+='<th rowspan="2">Parties</th>';
								modalBlock+='<th colspan="2">OverAll</th>';
								modalBlock+='<th colspan="2">(+ve)</th>';
								modalBlock+='<th colspan="2">(-ve)</th>';
							modalBlock+='</tr>';
							modalBlock+='<tr>';
								modalBlock+='<th>Present</th>';
								modalBlock+='<th>Past</th>';
								modalBlock+='<th>Present</th>';
								modalBlock+='<th>Past</th>';
								modalBlock+='<th>Present</th>';
								modalBlock+='<th>Past</th>';
							modalBlock+='</tr>';
						modalBlock+='</thead>';
						modalBlock+='<tbody>';
						for(var i in response){
							if(divId == "printMediaId"){
								modalBlock+='<tr>';
									modalBlock+='<td style="text-align:center !important;"><img class="d-inline" src="Core/images/parties/'+response[i].organization+'.png" style="width: 30px;height: 20px;"/></td>';
									modalBlock+='<td>'+emptyCheck(response[i].overAllPresentTotal)+'</td>';
									modalBlock+='<td>'+emptyCheck(response[i].overAllPastTotal)+'</td>';
									if(response[i].overAllPresentPositive !=null && response[i].overAllPresentPositive>0){
										modalBlock+='<td style="background-color:'+statusColorObj[response[i].benefit]+' !important;">'+response[i].overAllPresentPositive+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									if(response[i].overAllPastPositive !=null && response[i].overAllPastPositive>0){
										modalBlock+='<td>'+response[i].overAllPastPositive+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									if(response[i].overAllPresentNegative !=null && response[i].overAllPresentNegative>0){
										modalBlock+='<td style="background-color:'+statusColorObj[response[i].name]+' !important;">'+response[i].overAllPresentNegative+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									if(response[i].overAllPastNegative !=null && response[i].overAllPastNegative>0){
										modalBlock+='<td>'+response[i].overAllPastNegative+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									
								modalBlock+='</tr>';
							}else{
								modalBlock+='<tr>';
									modalBlock+='<td style="text-align:center !important;"><img class="d-inline" src="Core/images/parties/'+response[i].organization+'.png" style="width: 30px;height: 20px;"/></td>';
									modalBlock+='<td>'+emptyStringLen(response[i].overAllpresentTime)+'</td>';
									
									
									modalBlock+='<td>'+emptyStringLen(response[i].overAllpastTime)+'</td>';
									
									
									if(response[i].overAllPresentPositive !=null && response[i].overAllPresentPositive>0){
										modalBlock+='<td style="background-color:'+statusColorObj[response[i].benefit]+' !important;">'+emptyStringLen(response[i].overAllpresentPosTime)+'</td>';
										
									}else{
										modalBlock+='<td> - </td>';
										
									}
									if(response[i].overAllPastPositive !=null && response[i].overAllPastPositive>0){
										modalBlock+='<td>'+emptyStringLen(response[i].overAllpresentNegTime)+'</td>';
										
									}else{
										modalBlock+='<td> - </td>';
										
									}
									if(response[i].overAllPresentNegative !=null && response[i].overAllPresentNegative>0){
										modalBlock+='<td style="background-color:'+statusColorObj[response[i].name]+' !important;">'+emptyStringLen(response[i].overAllpastPosTime)+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									if(response[i].overAllPastNegative !=null && response[i].overAllPastNegative>0){
										modalBlock+='<td>'+emptyStringLen(response[i].overAllpastNegTime)+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									
								modalBlock+='</tr>';
							}
							
						}
							
							
						modalBlock+='</tbody>';
					modalBlock+='</table>';
				 modalBlock+='</div>';  
			modalBlock+='</div>';
				
			modalBlock+='<div class="col-sm-4">';
				modalBlock+='<div class="table-responsive">';
					modalBlock+='<table class="table table-bordered table_custom_news1 m_bottom_0" id="">';
						modalBlock+='<thead>';
							modalBlock+='<tr>';
								modalBlock+='<th rowspan="2">Parties</th>';
								if(divId == "printMediaId"){
									modalBlock+='<th colspan="2">Main Edition</th>';
								}else{
									modalBlock+='<th colspan="2">News Bulletin</th>';
								}
								
								modalBlock+='<th colspan="2">(+ve)</th>';
								modalBlock+='<th colspan="2">(-ve)</th>';
							modalBlock+='</tr>';
							modalBlock+='<tr>';
								modalBlock+='<th>Present</th>';
								modalBlock+='<th>Past</th>';
								modalBlock+='<th>Present</th>';
								modalBlock+='<th>Past</th>';
								modalBlock+='<th>Present</th>';
								modalBlock+='<th>Past</th>';
							modalBlock+='</tr>';
						modalBlock+='</thead>';
						modalBlock+='<tbody>';
						for(var i in response){
							if(divId == "printMediaId"){
								modalBlock+='<tr>';
									modalBlock+='<td style="text-align:center !important;"><img class="d-inline" src="Core/images/parties/'+response[i].organization+'.png" style="width: 30px;height: 20px;"/></td>';
									modalBlock+='<td style="text-align:center !important;">'+emptyCheck(response[i].totalPostivePrimeCount)+'</td>';
									modalBlock+='<td>'+emptyCheck(response[i].totalPositiveNonPrimeCount)+'</td>';
									if(response[i].positiveCountMain !=null && response[i].positiveCountMain>0){
										modalBlock+='<td style="background-color:'+statusColorObj[response[i].overalIsPrimedescription]+' !important;">'+response[i].positiveCountMain+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									if(response[i].positivePrimeCount !=null && response[i].positivePrimeCount>0){
										modalBlock+='<td >'+response[i].positivePrimeCount+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									if(response[i].negativCountMain !=null && response[i].negativCountMain>0){
										modalBlock+='<td style="background-color:'+statusColorObj[response[i].overalIsNotPrimedescription]+' !important;">'+response[i].negativCountMain+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									if(response[i].negativePrimeCount !=null && response[i].negativePrimeCount>0){
										modalBlock+='<td >'+response[i].negativePrimeCount+'</td>';
									}else{
										modalBlock+='<td> - </td>';
									}
									
								modalBlock+='</tr>';
								
							}else{
								modalBlock+='<tr>';
									modalBlock+='<td style="text-align:center !important;"><img class="d-inline" src="Core/images/parties/'+response[i].organization+'.png" style="width: 30px;height: 20px;"/></td>';
									modalBlock+='<td >'+emptyStringLen(response[i].totalIsPrimePositiveCoveredTime)+'</td>';
									modalBlock+='<td>'+emptyStringLen(response[i].totalIsPrimeNegativeCoveredTime)+' </td>';
									modalBlock+='<td style="background-color:'+statusColorObj[response[i].overalIsPrimedescription]+' !important;">'+emptyStringLen(response[i].positiveIsPrimeCoveredTime)+' </td>';
									modalBlock+='<td >'+emptyStringLen(response[i].mainPositiveArticlePerc)+' </td>';
									modalBlock+='<td style="background-color:'+statusColorObj[response[i].overalIsNotPrimedescription]+' !important;">'+emptyStringLen(response[i].negativeIsPrimeCoveredTime)+' </td>';
									modalBlock+='<td >'+emptyStringLen(response[i].mainNegativeArticlePerc)+' </td>';
									
									
								modalBlock+='</tr>';
							}
							
						}
							
							
						modalBlock+='</tbody>';
					modalBlock+='</table>';
				 modalBlock+='</div>';  
			 modalBlock+='</div>';
		
		modalBlock+='<div class="col-sm-4">';
			modalBlock+='<div class="table-responsive">';
				modalBlock+='<table class="table table-bordered table_custom_news1 m_bottom_0" id="">';
					modalBlock+='<thead>';
						modalBlock+='<tr>';
							modalBlock+='<th rowspan="2">Parties</th>';
							if(divId == "printMediaId"){
								modalBlock+='<th colspan="2">District Edition</th>';
							}else{
								modalBlock+='<th colspan="2">News Program</th>';
							}
							
							modalBlock+='<th colspan="2">(+ve)</th>';
							modalBlock+='<th colspan="2">(-ve)</th>';
						modalBlock+='</tr>';
						modalBlock+='<tr>';
							modalBlock+='<th>Present</th>';
							modalBlock+='<th>Past</th>';
							modalBlock+='<th>Present</th>';
							modalBlock+='<th>Past</th>';
							modalBlock+='<th>Present</th>';
							modalBlock+='<th>Past</th>';
						modalBlock+='</tr>';
					modalBlock+='</thead>';
					modalBlock+='<tbody>';
					for(var i in response){
						if(divId == "printMediaId"){
							modalBlock+='<tr>';
								modalBlock+='<td style="text-align:center !important;"><img class="d-inline" src="Core/images/parties/'+response[i].organization+'.png" style="width: 30px;height: 20px;"/></td>';
								modalBlock+='<td style="text-align:center !important;">'+emptyCheck(response[i].totalNegativePrimeCount)+'</td>';
								modalBlock+='<td>'+emptyCheck(response[i].totalNegativeNonPrimeCount)+'</td>';
								if(response[i].positiveCountDist !=null && response[i].positiveCountDist>0){
									modalBlock+='<td style="background-color:'+statusColorObj[response[i].isPrimedescription]+' !important;">'+response[i].positiveCountDist+'</td>';
								}else{
									modalBlock+='<td> - </td>';
								}
								if(response[i].positiveNonPrimeCount !=null && response[i].positiveNonPrimeCount>0){
									modalBlock+='<td >'+response[i].positiveNonPrimeCount+'</td>';
								}else{
									modalBlock+='<td> - </td>';
								}
								if(response[i].negativCountDist !=null && response[i].negativCountDist>0){
									modalBlock+='<td style="background-color:'+statusColorObj[response[i].isNotPrimedescription]+' !important;">'+response[i].negativCountDist+'</td>';
								}else{
									modalBlock+='<td> - </td>';
								}
								if(response[i].negativeNonPrimeCount !=null && response[i].negativeNonPrimeCount>0){
									modalBlock+='<td >'+response[i].negativeNonPrimeCount+'</td>';
								}else{
									modalBlock+='<td> - </td>';
								}
								
								
							modalBlock+='</tr>';
						}else{
							modalBlock+='<tr>';
								modalBlock+='<td style="text-align:center !important;"><img class="d-inline" src="Core/images/parties/'+response[i].organization+'.png" style="width: 30px;height: 20px;"/></td>';
								modalBlock+='<td>'+emptyStringLen(response[i].totalIsNotPrimePositiveCoveredTime)+' </td>';
								
								
								
								modalBlock+='<td>'+emptyStringLen(response[i].totalIsNotPrimeNegativeCoveredTime)+' </td>';
								modalBlock+='<td style="background-color:'+statusColorObj[response[i].isPrimedescription]+' !important;">'+emptyStringLen(response[i].positiveIsNotPrimeCoveredTime)+' </td>';
								
								
								modalBlock+='<td >'+emptyStringLen(response[i].distPositiveArticlePerc)+' </td>';
								modalBlock+='<td style="background-color:'+statusColorObj[response[i].isNotPrimedescription]+' !important;">'+emptyStringLen(response[i].negativeIsNotPrimeCoveredTime)+' </td>';
								
								modalBlock+='<td >'+emptyStringLen(response[i].distNegativeArticlePerc)+' </td>';
							modalBlock+='</tr>';
							
						}
						
					}
						
						
					modalBlock+='</tbody>';
				modalBlock+='</table>';
			 modalBlock+='</div>';  
		 modalBlock+='</div>';
	 modalBlock+='</div>';
	$("#overAllNewsDetailsId"+divId).html(modalBlock);
}
	
	function buildNewsVarianceDetails(response,divId){
		var varianceColorObj={'low':'#fd0000','high':'#66e672','same':'#efcd21'}
		var modalBlock='';
		
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col m_top10">';
						modalBlock+='<ul class="list-inline basic_list_type m_bottom_0">';
						
							modalBlock+='<li>';
								modalBlock+='<p>HIGH <span class="green_border"></span></p>';
							modalBlock+='</li>';
							
							modalBlock+='<li>';
								modalBlock+='<p>LOW <span class="red_border"></span></p>';
							modalBlock+='</li>';
							
							modalBlock+='<li>';
								modalBlock+='<p>SAME <span class="yellow_border"></span></p>';
							modalBlock+='</li>';
							
						modalBlock+='</ul>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col">';
						modalBlock+='<div class="table-responsive">';
							modalBlock+='<table class="table  table_custom_news_variance m_bottom_0" id="varianceNewsDetailsDataTableId'+divId+'">';
								modalBlock+='<thead>';
									modalBlock+='<tr>';
										modalBlock+='<th rowspan="2"></th>';
										modalBlock+='<th colspan="2">OVERALL</th>';
										modalBlock+='<th colspan="2">POSITIVE(+ve)</th>';
										modalBlock+='<th colspan="2">Negative(-ve)</th>';
									modalBlock+='</tr>';
									modalBlock+='<tr>';
										modalBlock+='<th>Present</th>';
										modalBlock+='<th>Past</th>';
										modalBlock+='<th>Present</th>';
										modalBlock+='<th>Past</th>';
										modalBlock+='<th>Present</th>';
										modalBlock+='<th>Past</th>';
									modalBlock+='</tr>';
								modalBlock+='</thead>';
								modalBlock+='<tbody>';
								for(var i in response){
									modalBlock+='<tr>';
										modalBlock+='<td>'+response[i].name+'</td>';
										if(response[i].presentTotal !=null && response[i].presentTotal>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].presentTotal+'</span></td>';
										}else{
											modalBlock+='<td> - </td>';
										}
										if(response[i].futureTotal !=null && response[i].futureTotal>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].futureTotal+'</span></td>';
										}else{
											modalBlock+='<td> - </td>';
										}
										if(response[i].completedCnt !=null && response[i].completedCnt>0){
											modalBlock+='<td ><span class="number_css badge " style="background-color:'+varianceColorObj[response[i].impact]+' !important;color:#fff;">'+response[i].completedCnt+'</span></td>';
										}else{
											modalBlock+='<td> - </td>';
										}
										if(response[i].actionInProgessCnt !=null && response[i].actionInProgessCnt>0){
											modalBlock+='<td><span class="number_css badge " style="background-color:#EFF1F3!important;color:#333;">'+response[i].actionInProgessCnt+'</span></td>';
										}else{
											modalBlock+='<td> - </td>';
										}
										if(response[i].pendingCnt !=null && response[i].pendingCnt>0){
											modalBlock+='<td ><span class="number_css badge " style="background-color:'+varianceColorObj[response[i].statusType]+';color:#fff;">'+response[i].pendingCnt+'</span></td>';
										}else{
											modalBlock+='<td> - </td>';
										}
										if(response[i].actionNotRequiredCnt !=null && response[i].actionNotRequiredCnt>0){
											modalBlock+='<td><span class="number_css badge " style="background-color:#EFF1F3 !important;color:#333;">'+response[i].actionNotRequiredCnt+'</span></td>';
										}else{
											modalBlock+='<td> - </td>';
										}
										
										
									modalBlock+='</tr>';
									
								}
								modalBlock+='</tbody>';
							modalBlock+='</table>';
						 modalBlock+='</div>';  
					modalBlock+='</div>';
				modalBlock+='</div>';
		  
		
		
		$("#varianceNewsDetailsId"+divId).html(modalBlock);
		initializeDataTableWithOutPagination("varianceNewsDetailsDataTableId"+divId);
		$("#varianceNewsDetailsDataTableId"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
		
	}
	
	function buildNewsTypePartyPubliDistrictDetails(response,blockId,headingName,divId){
		var modalBlock='';
		var newsTypeColorObj={'GOOD':'#A9D08E','BAD':'#FF6565','NEUTRAL':'#EFCD21'}
			if(blockId=="partyVsPublicationDetailsId"){
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col m_top10">';
						modalBlock+='<ul class="list-inline basic_list_type m_bottom_0 float-right">';
						
							modalBlock+='<li>';
								modalBlock+='<p>GOOD <span class="green_border"></span></p>';
							modalBlock+='</li>';
							
							modalBlock+='<li>';
								modalBlock+='<p>BAD <span class="red_border"></span></p>';
							modalBlock+='</li>';
							
							modalBlock+='<li>';
								modalBlock+='<p>NEUTRAL <span class="yellow_border"></span></p>';
							modalBlock+='</li>';
							
						modalBlock+='</ul>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			}
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col m_top10">';
						modalBlock+='<div class="table-responsive">';
							modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0" id="dataTable'+blockId+''+divId+'" style="width:100%">';
								modalBlock+='<thead>';
									modalBlock+='<tr>';
										modalBlock+='<th rowspan="3"></th>';
										for(var i in response[0].coreDashBoardVOList){
											modalBlock+='<th colspan="4">';
												modalBlock+='<img class="d-inline" src="Core/images/parties/'+response[0].coreDashBoardVOList[i].organization+'.png"/>';							
												modalBlock+='<span class="d-inline ml-3">'+response[0].coreDashBoardVOList[i].organization+'</span>';
											modalBlock+='</th>';
										}
									modalBlock+='</tr>';
									modalBlock+='<tr>';
										for(var i in response[0].coreDashBoardVOList){
											modalBlock+='<th colspan="2">Present</th>';
											modalBlock+='<th colspan="2">Past</th>';
										}
									modalBlock+='</tr>';
									modalBlock+='<tr>';
										for(var i in response[0].coreDashBoardVOList){
											modalBlock+='<th >+ve</th>';
											modalBlock+='<th >-ve</th>';
											modalBlock+='<th >+ve</th>';
											modalBlock+='<th >-ve</th>';
										}
									modalBlock+='</tr>';
									
								modalBlock+='</thead>';
								modalBlock+='<tbody>';
									for(var i in response){
										modalBlock+='<tr>';
											if(blockId == "partyVsPublicationDetailsId"){
												if(response[i].organization=="OVERALL"){
													modalBlock+='<td>'+response[i].organization+'</td>';
												}else{
													if(divId == "elctronicMediaId"){
														if(response[i].organization == "SAKSHI"){
															modalBlock+='<td><img src="Core/images/parties/SAKSHI TV.png" alt="image"/></td>';
														}else{
															modalBlock+='<td><img src="Core/images/parties/'+response[i].organization+'.png" alt="image"/></td>';
														}
													}else{
														modalBlock+='<td><img src="Core/images/parties/'+response[i].organization+'.png" alt="image"/></td>';
													}
													
													
												}
											}else{
												modalBlock+='<td>'+response[i].organization+'</td>';
											}
											for(var j in response[i].coreDashBoardVOList){
												if(response[i].coreDashBoardVOList[j].positivePerc !=null && response[i].coreDashBoardVOList[j].positivePerc>0){
													modalBlock+='<td style="background-color:'+newsTypeColorObj[response[i].coreDashBoardVOList[j].benefit]+' !important;">'+response[i].coreDashBoardVOList[j].positivePerc+'</td>';
												}else{
													modalBlock+='<td> - </td>';
												}
												
												if(response[i].coreDashBoardVOList[j].negativePerc !=null && response[i].coreDashBoardVOList[j].negativePerc>0){
													modalBlock+='<td style="background-color:'+newsTypeColorObj[response[i].coreDashBoardVOList[j].name]+' !important;">'+emptyCheck(response[i].coreDashBoardVOList[j].negativePerc)+'</td>';
												}else{
													modalBlock+='<td> - </td>';
												}
												
												
												
												if(response[i].coreDashBoardVOList[j].positiveDistPerc !=null && response[i].coreDashBoardVOList[j].positiveDistPerc>0){
													modalBlock+='<td >'+response[i].coreDashBoardVOList[j].positiveDistPerc+'</td>';
												}else{
													modalBlock+='<td> - </td>';
												}
												
												modalBlock+='<td>'+emptyCheck(response[i].coreDashBoardVOList[j].negativeDistPerc)+'</td>';
											}
										modalBlock+='</tr>';
									}
								modalBlock+='</tbody>';
							modalBlock+='</table>';
						 modalBlock+='</div>';  
					modalBlock+='</div>';
				modalBlock+='</div>';
		  
		
		$("#"+blockId+divId).html(modalBlock);
		if(blockId == "districtWiseDetailsId"){
		initializeDataTableWithOutPagination("dataTable"+blockId+divId)
			
		} else {
			initializeDataTableWithPagination("dataTable"+blockId+divId)
		}
		
		$("#dataTable"+blockId+divId).tableHeadFixer({"head" : false, "left" : 1}); 
	}
	 return {
        buildOverAllNews : buildOverAllNews,
		buildNewsVarianceDetails:buildNewsVarianceDetails,
		buildNewsTypePartyPubliDistrictDetails:buildNewsTypePartyPubliDistrictDetails,buildOverallActionBotsDetails
	}
}());	

function buildOverallActionBotsDetails(response,blockId,headingName,divId){
	var modalBlock='';
	var executedBotsCount;
	modalBlock+='<h6 class="font_weight m_bottom_0 text-uppercase m_top20">'+headingName+'</h6>';
	modalBlock+='<div class="new_border_yash_pad m_top10">';
		modalBlock+='<div class="col">';
			modalBlock+='<div class="table-responsive">';
				modalBlock+='<table class="table table_custom_actionBots m_bottom_0">';
					modalBlock+='<thead>';
						modalBlock+='<tr>';
							modalBlock+='<th>SOURCE</th>';
							modalBlock+='<th>COMPONENT</th>';
							modalBlock+='<th>TOTAL BOTS</th>';
							modalBlock+='<th>EXECUTED BOTS</th>';
							modalBlock+='<th>SUCCESS</th>';
							modalBlock+='<th>FAILURE</th>';
						modalBlock+='</tr>';
					modalBlock+='</thead>';
					modalBlock+='<tbody>';
						modalBlock+='<tr>';
							modalBlock+='<td><img src="Core/images/tdp_logo.png" style="display:block;margin:auto;"></td>';
							if(divId == "printMediaId"){
								modalBlock+='<td><h5 class="font_weight font_15 m_top10"><img src="Core/images/Print Media.png" class="component_img"> Print Media</h5></td>';
							} else {
								modalBlock+='<td><h5 class="font_weight font_15 m_top10"><img src="Core/images/Electronic Media.png" class="component_img"> Electronic Media</h5></td>';
							}
							modalBlock+='<td>';
								modalBlock+='<h5 class="font_weight font_18 m_top10">'+response[0].count+'</h5>';
							modalBlock+='</td>';
							modalBlock+='<td>';
								executedBotsCount = response[0].successCount + response[0].failCount;
								modalBlock+='<h5 class="font_weight font_18 m_top10">'+executedBotsCount+'</h5>';
							modalBlock+='</td>';
							modalBlock+='<td>';
								modalBlock+='<h5 class="color_green font_weight font_18 m_top10">'+response[0].successCount+' (<small>'+response[0].partySuccessPerc+' %</small>)</h5>';
							modalBlock+='</td>';
							modalBlock+='<td>';
								modalBlock+='<h5 class="color_red font_weight font_18 m_top10">'+response[0].failCount+' (<small>'+response[0].partyFailPerc+' %</small>)</h5>';
							modalBlock+='</td>';
						modalBlock+='</tr>';
					modalBlock+='</tbody>';
				modalBlock+='</table>';
			modalBlock+='</div>';
			
			if($(window).width() < 800){
				modalBlock+='<div class="table-responsive">';
			}
			modalBlock+='<table class="table table_custom_meeting table_custom_bg_white_color m_top10" id="dataTableComponentWiseCategoryId'+i+'">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
					if(divId == "printMediaId"){
						modalBlock+='<th rowspan="2" style="min-width: 25%;"><img src="Core/images/logo-ActionBots.png" class="img-responsive" alt="actionBots" style="width: 100px;height: auto;"/> PRINT MEDIA</th>';
					}else {
						modalBlock+='<th rowspan="2" style="min-width: 25%;"><img src="Core/images/logo-ActionBots.png" class="img-responsive" alt="actionBots" style="width: 100px;height: auto;"/> ELECTRONIC MEDIA</th>';
					}
						modalBlock+='<th colspan="2">Fail Bots</th>';
						modalBlock+='<th rowspan="2">VARIANCE</th>';
						modalBlock+='<th rowspan="2">Total Alerts</th>';
					modalBlock+='</tr>';
					
					modalBlock+='<tr>';
						modalBlock+='<th>Present</th>';
						modalBlock+='<th>Past</th>';
					modalBlock+='</tr>';
					
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
					for(var i in response){
						modalBlock+='<tr>';
							modalBlock+='<td>'+response[i].name+'</td>';
							if(response[i].partySuccessCunt !=null && response[i].partySuccessCunt>0){
								modalBlock+='<td>'+response[i].partySuccessCunt+'</td>';
							}else{
								modalBlock+='<td> - </td>';
							}
							if(response[i].partyFailCunt !=null && response[i].partyFailCunt>0){
								modalBlock+='<td>'+response[i].partyFailCunt+'</td>';
							}else{
								modalBlock+='<td> - </td>';
							}
							if(response[i].govrFailPerc !=null && response[i].govrFailPerc>0){
								if(response[i].componentName == "GREEN"){
									modalBlock+='<td style="background-color:#A8D08E !important;">'+response[i].govrFailPerc+' %</td>';
								} else {
									modalBlock+='<td style="background-color:#F26365 !important;">'+response[i].govrFailPerc+' %</td>';
								}
							}else{
								modalBlock+='<td> - </td>';
							}
							if(response[i].govBotsCount !=null && response[i].govBotsCount>0){
								modalBlock+='<td>'+response[i].govBotsCount+'</td>';
							}else{
								modalBlock+='<td> - </td>';
							}
						modalBlock+='</tr>';
					}
				modalBlock+='</tbody>';
				
			modalBlock+='</table>';
			 if($(window).width() < 800){
					modalBlock+='</div>';
			}
		modalBlock+='</div>';
	modalBlock+='</div>';
	$("#"+blockId+divId).html(modalBlock);
}

$(document).on("change",".variancePartyId",function(){
	var divId = $(this).attr("attr_divId");
	var blockValue = $(this).attr("attr_blockValue");
	
	
	var partyName = $(".variancePartyId option:selected").text();
	$("#variancePartyNameId").html(partyName);
	
	globalpartyId =  $(this).val();
	globalEditioinTypeId = $(".varianceEditionTypeCls").val();
	
	
	var fromDateNews = customStartDate.split("/");
	var toDateNews =  customEndDate.split("/"); 
	
	fromDateSpitNews = fromDateNews[0]+"-"+fromDateNews[1]+"-"+fromDateNews[2];
	toDateSpitNews = toDateNews[0]+"-"+toDateNews[1]+"-"+toDateNews[2];
	
	newsPaperIds = "";
	newsChannelIds="";
	if(blockValue == 0){
		var newsPaperIds = "2,3,5,8,1";
		var newsChannelIds = "1,2,3,4,5,6,7";
	}else{
		newsPaperIds=blockValue;
		newsChannelIds=blockValue;
	}
	
	
	if(divId == "printMediaId"){
		varianceInputParam = "getCoreDashBoardPartyWiseVarianceDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+globalpartyId+"/"+globalEditioinTypeId+"/"+newsPaperIds
		printMediaComponent.ajax.printMediaDetails(varianceInputParam,"varianceNewsDetailsId","",divId);//Third Block
	}else{
		varianceInputParam = "getEMPartyWiseVarianceDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+globalpartyId+"/"+globalEditioinTypeId+"/"+newsChannelIds
		printMediaComponent.ajax.printMediaDetails(varianceInputParam,"varianceNewsDetailsId","",divId);//Third Block
	}
	
});



$(document).on("change",".varianceEditionTypeCls",function(){
	var divId = $(this).attr("attr_divId");
	var blockValue = $(this).attr("attr_blockValue");
	
	
	var partyName = $(".variancePartyId option:selected").text();
	$("#variancePartyNameId").html(partyName);
	
	globalEditioinTypeId =  $(this).val();
	globalpartyId =  $(".variancePartyId").val();
	
	var fromDateNews = customStartDate.split("/");
	var toDateNews =  customEndDate.split("/"); 
	
	fromDateSpitNews = fromDateNews[0]+"-"+fromDateNews[1]+"-"+fromDateNews[2];
	toDateSpitNews = toDateNews[0]+"-"+toDateNews[1]+"-"+toDateNews[2];
	
	newsPaperIds = "";
	newsChannelIds = "";
	if(blockValue == 0){
		var newsPaperIds = "2,3,5,8,1";
		var newsChannelIds = "1,2,3,4,5,6,7";
	}else{
		newsPaperIds=blockValue;
		newsChannelIds=blockValue;
	}
	
	
	if(divId == "printMediaId"){
		varianceInputParam = "getCoreDashBoardPartyWiseVarianceDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+globalpartyId+"/"+globalEditioinTypeId+"/"+newsPaperIds
		printMediaComponent.ajax.printMediaDetails(varianceInputParam,"varianceNewsDetailsId","",divId);//Third Block
	}else{
		varianceInputParam = "getEMPartyWiseVarianceDetails/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+globalpartyId+"/"+globalEditioinTypeId+"/"+newsChannelIds
		printMediaComponent.ajax.printMediaDetails(varianceInputParam,"varianceNewsDetailsId","",divId);//Third Block
	}
	
});

$(document).on("click",".editionWisePartyVsPubCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	globalEditioinTypeId="";
	
	globalEditioinTypeId = $(this).attr("attr_type");
	var blockValue = $(this).attr("attr_blockValue");
	var divId = $(this).attr("attr_divId");
	
	var fromDateNews = customStartDate.split("/");
	var toDateNews =  customEndDate.split("/"); 
	
	fromDateSpitNews = fromDateNews[0]+"-"+fromDateNews[1]+"-"+fromDateNews[2];
	toDateSpitNews = toDateNews[0]+"-"+toDateNews[1]+"-"+toDateNews[2];
	
	newsPaperIds = "";
	newsChannelIds = "";
	if(blockValue == 0){
		var newsPaperIds = "2,3,5,8,1";
		var newsChannelIds = "1,2,3,4,5,6,7";
	}else{
		newsPaperIds=blockValue;
		newsChannelIds=blockValue;
	}
	
	
	
	if(divId == "printMediaId"){
		partyVsPubInputParam = "getCoreDashBoardpartyVsPublicationAnalysis/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsPaperIds+"/"+globalEditioinTypeId
		printMediaComponent.ajax.printMediaDetails(partyVsPubInputParam,"partyVsPublicationDetailsId","PARTIES VS PUBLICATIONS",divId);//Five Block
	}else{
		partyVsPubInputParam = "getCoreDashBoardpartyVsChannelAnalysis/"+fromDateSpitNews+"/"+toDateSpitNews+"/"+locationIdNews+"/"+locationValueNews+"/"+newsChannelIds+"/"+globalEditioinTypeId
		printMediaComponent.ajax.printMediaDetails(partyVsPubInputParam,"partyVsPublicationDetailsId","State Wise - Programs Overview",divId);//Five Block
	}
	
	
});

function emptyCheck(filedValue){
	var returnVal = ' - ';
	if( filedValue !=null && filedValue > 0){
		returnVal = filedValue;
	}
	return returnVal;
}

function emptyStringLen(filedValue){
	var returnVal = ' - ';
	if( filedValue !=null && filedValue.trim().length > 0){
		returnVal = filedValue;
	}
	return returnVal;
}
