var EMCoverageComponent = EMCoverageComponent || {};

var overAllEMNewsPopup = "";
var varianceInputEMParam = "";

function basicEMCoverageTimeDetails(blockValue,divId,chosenLabel){
	var modalBlock='';
		
			modalBlock+='<div class="card">';
			   modalBlock+='<div class="card-header">';
					modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<h6 class="font_weight m_bottom_0">OVERALL OVERVIEW - <small>Time Wise Details</small></h6>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6 float-right">';
							modalBlock+='<ul class="list-inline switch-btn-New float-right m_bottom_0 programWiseEMDetailsCls">';
								modalBlock+='<li attr_type="0" attr_blockValue="'+blockValue+'" class="active" >BOTH</li>';
								modalBlock+='<li attr_type="1" attr_blockValue="'+blockValue+'" >News Bulletin</li>';
								modalBlock+='<li attr_type="2" attr_blockValue="'+blockValue+'">News Program</li>';
							modalBlock+='</ul>';
						modalBlock+='</div>';
				   modalBlock+='</div>';
				   
					
			   modalBlock+='</div>';
			   modalBlock+='<div class="card-body">';
					modalBlock+='<div id="overAllEMNewsDetailsId"></div>';
			   modalBlock+='</div>';
			modalBlock+='</div>';
		
		
			modalBlock+='<div class="card card_bg m_top20">';
			   modalBlock+='<div class="card-header">';
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-6">';
							modalBlock+='<h6 class="font_weight m_bottom_0 m_top10">VARIANCE</h6>';
						modalBlock+='</div>';
						modalBlock+='<div class="col-sm-6 float-right">';
						modalBlock+='<ul class="list-inline switch-btn-New float-right m_bottom_0 benefitWiseEMVarianceCls">';
							modalBlock+='<li attr_type="1" class="active" attr_blockValue="'+blockValue+'">POSITIVE</li>';	
							modalBlock+='<li attr_type="2" attr_blockValue="'+blockValue+'">NEGATIVE</li>';
					modalBlock+='</ul>';
					modalBlock+='</div>';
				   modalBlock+='</div>';
			   modalBlock+='</div>';
			   modalBlock+='<div class="card-body pad_5 card_bg">';
					modalBlock+='<div id="varianceEMNewsDetailsId"></div>';
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
	
	newsChannelIds = "";
	if(blockValue == 0){
		newsChannelIds = "1,2,3,4,5,6,7";
	}else{
		newsChannelIds=blockValue;
	}
	
	
	overAllEMNewsPopup = "getEMOverallCandidateWiseCoverage/"+locationValueNews+"/"+locationIdNews+"/"+globalEditioinTypeId+"/"+newsChannelIds
	varianceInputEMParam = "getEMOverallCandidateWiseVariance/"+locationValueNews+"/"+locationIdNews+"/"+globalEditioinTypeId+"/"+newsChannelIds+"/"+globalBenefitId
	
	EMCoverageComponent.ajax.emCoverageDetails(overAllEMNewsPopup,"overAllEMNewsDetailsId","");//First Block
	EMCoverageComponent.ajax.emCoverageDetails(varianceInputEMParam,"varianceEMNewsDetailsId","");//Third Block
	
	
}

EMCoverageComponent.ajax = (function(){
    function emCoverageDetails(inputParams,blockId,headingName){
		$("#"+blockId).html(spinner);
		
		$.ajax({
			url: wurl+"/CommunityNewsPortal/webservice/"+inputParams
			//url: "http://localhost:8080/CommunityNewsPortal/webservice/getDetailedPartyMainEditionsOverview/"+globalUserAccessLevelId+"/"+temp+"/"+globalState+"/"+startDate+"/"+endDate+"/"+newsPaperIdsStr
		}).then(function(response){
			if(response !=null && response.length>0){
				if(blockId == "overAllEMNewsDetailsId"){
					EMCoverageComponent.buildAjaxCallResult.buildEMCoverageNews(response);
				}else{
					EMCoverageComponent.buildAjaxCallResult.buildEMCoverageVarianceNews(response);
				}
			}else{
				$("#"+blockId).html('No Data Available');
			}
			
			
		});
		
    }
	return {
        emCoverageDetails : emCoverageDetails,
	}
}());

EMCoverageComponent.buildAjaxCallResult = (function(){
		function buildEMCoverageNews(response){
			var modalBlock='';
				modalBlock+='<div class="row">';
						modalBlock+='<div class="col">';
							modalBlock+='<div class="table-responsive">';
								modalBlock+='<table class="table table-bordered table-condensed table_custom_EMNews" id="dataTableEMCoverageOverAllNewsId" style="width:100%">';
									modalBlock+='<thead>';
										modalBlock+='<tr>';
											modalBlock+='<th rowspan="3"></th>';
											for(var i in response[0].subList){
												modalBlock+='<th colspan="4">';
													modalBlock+='<div class="media">';
													 modalBlock+=' <img class="mr-3" src="Core/images/'+response[0].subList[i].name+'.png" alt="Generic placeholder image">';
													  modalBlock+='<div class="media-body">';
														modalBlock+='<h6 class="font_weight m_top5" style="text-align:left !important;">'+response[0].subList[i].name+'</h6>';
													  modalBlock+='</div>';
													   modalBlock+='<h6 class="font_weight m_top5 float-right"><img class="mr-3" src="Core/images/'+response[0].subList[i].name+'.png" alt="Generic placeholder image"></h6>';
													modalBlock+='</div>';
												modalBlock+='</th>';
											}
										modalBlock+='</tr>';
										modalBlock+='<tr>';
											for(var i in response[0].subList){
												modalBlock+='<th colspan="2">Positive <span class="color_green"> ( +ve ) </span></th>';
												modalBlock+='<th colspan="2">Negative <span class="color_red">( -ve ) </span></th>';
											}
										modalBlock+='</tr>';
										modalBlock+='<tr>';
											for(var i in response[0].subList){
												modalBlock+='<th>Time</th>';
												modalBlock+='<th>%</th>';
												modalBlock+='<th>Time</th>';
												modalBlock+='<th>%</th>';
											}
										modalBlock+='</tr>';
									modalBlock+='</thead>';
									modalBlock+='<tbody>';
										for(var i in response){
											modalBlock+='<tr>';
												modalBlock+='<td>'+response[i].name+'</td>';
												for(var j in response[i].subList){
													modalBlock+='<td>'+response[i].subList[j].overAllCoveredTime+'</td>';
													modalBlock+='<td class="color_green">'+response[i].subList[j].percentage+'</td>';
													modalBlock+='<td>'+response[i].subList[j].overAllBenefitTime+'</td>';
													modalBlock+='<td class="color_red">'+response[i].subList[j].overAllPer+'</td>';
												}
											modalBlock+='</tr>';
										}
									modalBlock+='</tbody>';
								modalBlock+='</table>';
							 modalBlock+='</div>';  
						modalBlock+='</div>';
					modalBlock+='</div>';
			  
			
			$("#overAllEMNewsDetailsId").html(modalBlock);
			initializeDataTableWithPagination("dataTableEMCoverageOverAllNewsId")
			$("#dataTableEMCoverageOverAllNewsId").tableHeadFixer({"head" : false, "left" : 1}); 
			
		
		}
		function buildEMCoverageVarianceNews(response){
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
								modalBlock+='<table class="table  table_custom_news_variance m_bottom_0" id="varianceEMNewsDataTableId">';
									modalBlock+='<thead>';
										modalBlock+='<tr>';
											modalBlock+='<th rowspan="2"></th>';
											for(var i in response[0].subList){
												modalBlock+='<th colspan="2">'+response[0].subList[i].name+'</th>';
											}
										modalBlock+='</tr>';
										modalBlock+='<tr>';
											for(var i in response[0].subList){
												modalBlock+='<th>Present</th>';
												modalBlock+='<th>Past</th>';
											}
										modalBlock+='</tr>';
									modalBlock+='</thead>';
									modalBlock+='<tbody>';
									for(var i in response){
										modalBlock+='<tr>';
											modalBlock+='<td>'+response[i].name+'</td>';
											
											for(var j in response[i].subList){
												if(response[i].subList[j].partyAlertCntPer !=null && response[i].subList[j].partyAlertCntPer>0){
													modalBlock+='<td><span class="number_css badge " style="background-color:'+varianceColorObj[response[i].subList[j].impact]+' !important;color:#fff;">'+response[i].subList[j].partyAlertCntPer+'</span></td>';
												}else{
													modalBlock+='<td> - </td>';
												}
												if(response[i].subList[j].overAllPer !=null && response[i].subList[j].overAllPer>0){
													modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].subList[j].overAllPer+'</span></td>';
												}else{
													modalBlock+='<td> - </td>';
												}
												
												
											}
										modalBlock+='</tr>';
										
									}
									modalBlock+='</tbody>';
								modalBlock+='</table>';
							 modalBlock+='</div>';  
						modalBlock+='</div>';
					modalBlock+='</div>';
				$("#varianceEMNewsDetailsId").html(modalBlock);
				initializeDataTableWithOutPagination("varianceEMNewsDataTableId");
				$("#varianceEMNewsDataTableId").tableHeadFixer({"head" : false, "left" : 1}); 
		}
	return {
        buildEMCoverageNews : buildEMCoverageNews,
		buildEMCoverageVarianceNews:buildEMCoverageVarianceNews
	}
}());

$(document).on("click",".benefitWiseEMVarianceCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	globalBenefitId="";
	
	globalBenefitId = $(this).attr("attr_type");
	var blockValue = $(this).attr("attr_blockValue");
	
	var fromDateNews = customStartDate.split("/");
	var toDateNews =  customEndDate.split("/"); 
	
	fromDateSpitNews = fromDateNews[0]+"-"+fromDateNews[1]+"-"+fromDateNews[2];
	toDateSpitNews = toDateNews[0]+"-"+toDateNews[1]+"-"+toDateNews[2];
	
	
	newsChannelIds = "";
	if(blockValue == 0){
		newsChannelIds = "1,2,3,4,5,6,7";
	}else{
		newsChannelIds=blockValue;
	}
	
	varianceInputEMParam = "getEMOverallCandidateWiseVariance/"+locationValueNews+"/"+locationIdNews+"/"+globalEditioinTypeId+"/"+newsChannelIds+"/"+globalBenefitId
	EMCoverageComponent.ajax.emCoverageDetails(varianceInputEMParam,"varianceEMNewsDetailsId","");//Third Block
	
	
});

$(document).on("click",".programWiseEMDetailsCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	globalEditioinTypeId="";
	
	globalEditioinTypeId = $(this).attr("attr_type");
	var blockValue = $(this).attr("attr_blockValue");
	
	var fromDateNews = customStartDate.split("/");
	var toDateNews =  customEndDate.split("/"); 
	
	fromDateSpitNews = fromDateNews[0]+"-"+fromDateNews[1]+"-"+fromDateNews[2];
	toDateSpitNews = toDateNews[0]+"-"+toDateNews[1]+"-"+toDateNews[2];
	
	
	newsChannelIds = "";
	if(blockValue == 0){
		newsChannelIds = "1,2,3,4,5,6,7";
	}else{
		newsChannelIds=blockValue;
	}
	
	overAllEMNewsPopup = "getEMOverallCandidateWiseCoverage/"+locationValueNews+"/"+locationIdNews+"/"+globalEditioinTypeId+"/"+newsChannelIds
	EMCoverageComponent.ajax.emCoverageDetails(overAllEMNewsPopup,"overAllEMNewsDetailsId","");//First Block
	
	
});