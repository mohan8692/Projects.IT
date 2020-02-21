var CBNArmyComponent = CBNArmyComponent || {};
var colorIndexCbnArmyObj = {"High": "badge_green","Low": "badge_red","Same": "badge_yellow"};

	levelWiseCBNArmyArr = ['District','Constituency','Mandal'];

function basicCBNArmyDetails(blockValue,divId,chosenLabel){
	var modalBlock='';
	modalBlock+='<div id="CBNArmyOverViewDetailsId"></div>';
	modalBlock+='<div id="socialmediaOverViewDetailsId"></div>';
	modalBlock+='<div id="socialmediaTimeLineId"></div>';
	modalBlock+='<div id="socialmediaTaskDetailsId"></div>';
	modalBlock+='<div class="row">';
		modalBlock+='<div class="col-sm-6 m_top10">';
			modalBlock+='<div id="socialmediaWiseFBPostDetailsId"></div>';
		modalBlock+='</div>';
		modalBlock+='<div class="col-sm-6 m_top10">';
			modalBlock+='<div id="socialmediaWiseTwitterPostDetailsId"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	//VARIANCE DETAILS
	modalBlock+='<div class="card m_top10 card_body_border">';
		modalBlock+='<div class="card-header card_bg">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<h6 class="m_top5 font_weight text-capital font_15 m_bottom_0">Variance Details - <small id="varianceSubTitleId">Likes</small></h6>';
				modalBlock+='</div>';					
				modalBlock+='<div class="col-sm-6 float-right">';
					modalBlock+='<ul class="list-inline basic_list_type m_bottom_0 float-right">';
							modalBlock+='<li>';
								modalBlock+='<p class="m_bottom_0"><span class="green_border"></span> HIGH</p>';
							modalBlock+='</li>';
							
							modalBlock+='<li>';
								modalBlock+='<p class="m_bottom_0"><span class="red_border"></span> LOW</p>';
							modalBlock+='</li>';
							
							modalBlock+='<li>';
								modalBlock+='<p class="m_bottom_0"><span class="yellow_border"></span> SAME</p>';
							modalBlock+='</li>';
						modalBlock+='</ul>';
				modalBlock+='</div>';
			 modalBlock+='</div>';			
		modalBlock+='</div>';
		modalBlock+='<div class="card-body pad_10 color_bg_white">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12 float-right">';
					modalBlock+='<ul class="list-inline switch-custom cbnArmyVarianceCls m_bottom_0 float-right">';
						modalBlock+='<li class="active" attr_type="Likes"><i class="fas fa-thumbs-up mr-2"></i>Likes</li>';
						modalBlock+='<li attr_type="Tasks"><i class="fas fa-tasks mr-2"></i>Tasks</li>';
						modalBlock+='<li attr_type="Shares"><i class="fas fa-share-alt mr-2"></i>Shares/Retweet</li>';
						modalBlock+='<li attr_type="Comments"><i class="far fa-comment mr-2"></i>Comments/Reply</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			modalBlock+='<div class="row m_top10">';
				modalBlock+='<div class="col">';
					modalBlock+='<div id="CBNArmyVarianceDetailsId"></div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	//LOCATION WISE
	modalBlock+='<div class="card m_top10 card_body_border">';
		modalBlock+='<div class="card-header card_bg">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<h6 class="font_weight text-capital font_15 m_bottom_0 m_top5">Location Wise Details</h6>';
				modalBlock+='</div>';					
				modalBlock+='<div class="col-sm-6 float-right">';
					modalBlock+='<ul class="list-inline switch-custom float-right m_bottom_0 cbnArmyLevelWiseCls">';
						modalBlock+='<li class="active" attr_type="Tasks">Tasks</li>';
						modalBlock+='<li attr_type="Registrations">Registrations</li>';						
					modalBlock+='</ul>';
				modalBlock+='</div>';
			 modalBlock+='</div>';			
		modalBlock+='</div>';
		modalBlock+='<div class="card-body">';			
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col">';
					modalBlock+='<div id="CBNArmyLevelWiseDetailsId"></div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
	modalBlock+='</div>';	
	
	$(".blockWiseModalDivId").html(modalBlock);
	
	// ajax calls
	CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmyRegistrationDetails','CBNArmyOverViewDetailsId','','');
	CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmySocialMediaOverviewDetails','socialmediaOverViewDetailsId','facebook','');
	CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmySocialMediaTimeLineDetails','socialmediaTimeLineId','','');
	CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmySocialMediaWiseTaskDetails','socialmediaTaskDetailsId','','');
	CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmySocialMediaWisePostsDetails','socialmediaWiseFBPostDetailsId','facebook','');
	CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmySocialMediaWisePostsDetails','socialmediaWiseTwitterPostDetailsId','twitter','');
	CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmyVarianceDetails','CBNArmyVarianceDetailsId','Likes','');
	CBNArmyComponent.onLoadCalls.buildCBNArmyLocationWiseLevels();
	
	
	
}
CBNArmyComponent.onLoadCalls = (function(){
	function buildCBNArmyLocationWiseLevels(){			
		var collapse='';
		collapse+='<section>';
		for(var i in levelWiseCBNArmyArr)
		{
			collapse+='<div class="row">';
				if(i== 0){
					collapse+='<div class="col-sm-12">';
				}else{
					collapse+='<div class="col-sm-12 m_top10">';
				}		
						collapse+='<div class="" id="accordion'+levelWiseCBNArmyArr[i]+'" role="tablist" aria-multiselectable="true">';
							collapse+='<div class="card card-white card_body_border">';
								collapse+='<div class="card-header card-header-custom card_black" role="tab" id="heading'+levelWiseCBNArmyArr[i]+'">';
									/* if(i == 0)
									{
										collapse+='<a role="button" class="panelCollapseIcon '+levelWiseCBNArmyArr[i]+' "  data-toggle="collapse" data-parent="#accordion'+levelWiseCBNArmyArr[i]+'" href="#collapse'+levelWiseCBNArmyArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseCBNArmyArr[i]+'">';
									}else{
										collapse+='<a role="button" class="panelCollapseIcon  '+levelWiseCBNArmyArr[i]+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+levelWiseCBNArmyArr[i]+'" href="#collapse'+levelWiseCBNArmyArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseCBNArmyArr[i]+'">';
									} */
									collapse+='<a role="button" class="panelCollapseIcon  '+levelWiseCBNArmyArr[i]+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+levelWiseCBNArmyArr[i]+'" href="#collapse'+levelWiseCBNArmyArr[i]+'" aria-expanded="true" aria-controls="collapse'+levelWiseCBNArmyArr[i]+'">';
								
									collapse+='<h6 class="card-title text-uppercase card-title-custom font_15">'+levelWiseCBNArmyArr[i]+' Wise Details - <small id="'+levelWiseCBNArmyArr[i]+'SubTitleId">Tasks</small></h6>';
										
									collapse+='</a>';
								collapse+='</div>';
								/* if(i == 0)
								{
									collapse+='<div id="collapse'+levelWiseCBNArmyArr[i]+'" class="collapse show" role="tabpanel" aria-labelledby="heading'+levelWiseCBNArmyArr[i]+'">';
								}else{
									collapse+='<div id="collapse'+levelWiseCBNArmyArr[i]+'" class="collapse collapsedIn show" role="tabpanel" aria-labelledby="heading'+levelWiseCBNArmyArr[i]+'">';
								} */
								collapse+='<div id="collapse'+levelWiseCBNArmyArr[i]+'" class="collapse collapsedIn show" role="tabpanel" aria-labelledby="heading'+levelWiseCBNArmyArr[i]+'">';
								
									collapse+='<div class="card-body pad_5">';
										collapse+='<div id="CBNArmy'+levelWiseCBNArmyArr[i]+'WiseDetailsId"></div>';
									collapse+='</div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
				collapse+='</div>';
				collapse+='</div>';
		}
		collapse+='</section>';
		$("#CBNArmyLevelWiseDetailsId").html(collapse);
		for(var i in levelWiseCBNArmyArr){
			CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmyLevelsWiseDetails','CBNArmy'+levelWiseCBNArmyArr[i]+'WiseDetailsId','Tasks',levelWiseCBNArmyArr[i]);
		}
	}
	
	return {
		buildCBNArmyLocationWiseLevels : buildCBNArmyLocationWiseLevels
	}
}());


CBNArmyComponent.ajax = (function(){
	function cbnArmyAjaxCalls(url,blockId,type,locationType){
		$("#"+blockId).html(spinner);
		if(blockId == "socialmediaTimeLineId"){
			var json={};
		}else if(blockId == "CBNArmyVarianceDetailsId"){
			var json={
				"type" : type
			}
		}else{
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"type" : type,
				"locationType" : locationType
			};
		}
		
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
				if(response != null){
					if(blockId == "CBNArmyOverViewDetailsId"){
						CBNArmyComponent.buildAjaxCallResult.buildCBNArmyOverViewDetails(response,blockId)
					}else if(blockId == "socialmediaOverViewDetailsId"){
						CBNArmyComponent.buildAjaxCallResult.buildCBNArmySocialmediaOverViewDetails(response,blockId)
					}else if(blockId == "socialmediaTimeLineId"){
						CBNArmyComponent.buildAjaxCallResult.buildCBNArmySocialmediaTimeLineDetails(response,blockId)
					}else if(blockId == "socialmediaTaskDetailsId"){
						CBNArmyComponent.buildAjaxCallResult.buildCBNArmySocialmediaTaskDetails(response,blockId)
					}else if(blockId == "socialmediaWiseFBPostDetailsId" || blockId == "socialmediaWiseTwitterPostDetailsId"){
						CBNArmyComponent.buildAjaxCallResult.buildCBNArmySocialmediaPostDetails(response,blockId,type)
					}else if(blockId == "CBNArmyVarianceDetailsId"){
						CBNArmyComponent.buildAjaxCallResult.buildCBNArmyVarianceDetails(response,blockId,type)
					}else if((blockId == "CBNArmyDistrictWiseDetailsId" || blockId == "CBNArmyConstituencyWiseDetailsId" || blockId == "CBNArmyMandalWiseDetailsId") && type == "Tasks"){
						CBNArmyComponent.buildAjaxCallResult.buildCBNArmyLevelsWiseTasksDetails(response,blockId,type,locationType)
					}else if((blockId == "CBNArmyDistrictWiseDetailsId" || blockId == "CBNArmyConstituencyWiseDetailsId" || blockId == "CBNArmyMandalWiseDetailsId") && type == "Registrations"){
						CBNArmyComponent.buildAjaxCallResult.buildCBNArmyLevelsWiseRegistrationsDetails(response,blockId,type,locationType)
					} 
				}else{
					$('#'+blockId).html('NO DATA AVAILABLE');
				}
				
			},
            failure: function(xhr) {
                return xhr;
            }
        });
	}
	return {
		cbnArmyAjaxCalls : cbnArmyAjaxCalls
	}
}());


CBNArmyComponent.buildAjaxCallResult = (function(){
	
	function buildCBNArmyOverViewDetails(response,blockId){
		var modalBlock='';
		//Registrations -- Block
		modalBlock+='<div class="card card_body_border">';
			modalBlock+='<div class="card-header card_bg" style="padding-left:5px;">';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<h6 class="font_weight m_bottom_0 text-capital font_15">Registrations</h6>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col">';
						modalBlock+='<div class="bg_white_pad5 block_shadow text-center">';
							modalBlock+='<p class="font_15 font_weight text-capital">Registrations</p>';
							modalBlock+='<h5 class="font_weight">'+setValue(response.regiCunt)+'</h5>';
						modalBlock+='</div>';
					modalBlock+='</div>';
					modalBlock+='<div class="col">';
						modalBlock+='<div class="bg_white_pad5 block_shadow text-center">';
							modalBlock+='<p class="font_15 font_weight text-capital">Accepted</p>';
							if(response.acceptedCunt != null && response.acceptedCunt>0) {
								modalBlock+='<h5 class="font_weight">'+response.acceptedCunt+'<small class="m_left10 color_green">'+response.acceptedPerc+' %</small></h5>';
							} else {
								modalBlock+='<h5 class="font_weight">-</h5>';
							}
						modalBlock+='</div>';
					modalBlock+='</div>';
					modalBlock+='<div class="col">';
						modalBlock+='<div class="bg_white_pad5 block_shadow text-center">';
							modalBlock+='<p class="font_15 font_weight text-capital">Pending</p>';
							if(response.pendingCunt != null && response.pendingCunt>0) {
								modalBlock+='<h5 class="font_weight">'+response.pendingCunt+'<small class="m_left10 color_green">'+response.pendingPerc+' %</small></h5>';
							} else {
								modalBlock+='<h5 class="font_weight">-</h5>';
							}
						modalBlock+='</div>';
					modalBlock+='</div>';
					modalBlock+='<div class="col">';
						modalBlock+='<div class="bg_white_pad5 block_shadow text-center">';
							modalBlock+='<p class="font_15 font_weight text-capital">Rejected</p>';
							if(response.rejectedCunt != null && response.rejectedCunt>0) {
								modalBlock+='<h5 class="font_weight">'+response.rejectedCunt+'<small class="m_left10 color_green">'+response.rejectedPerc+'%</small></h5>';
							} else {
								modalBlock+='<h5 class="font_weight">-</h5>';
							}
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		//Time Line -- Block
		modalBlock+='<div class="card m_top10 card_body_border">';
		modalBlock+='<div class="card-body card_bg">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12">';
					modalBlock+='<h6 class="font_weight m_bottom_0 text-capital font_15">Time Line Wise Details</h6>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			modalBlock+='<div class="row m_top10">';		
				modalBlock+='<div class="col">';
					modalBlock+='<div class="table-responsive">';
						modalBlock+='<table class="table table-bordered table-condensed table_custom_news table_custom_bg_white_color" id="cbnarmyOverViewTimeLineDataTable" style="width:100%;">';
							modalBlock+='<thead>';
								modalBlock+='<tr>';
									modalBlock+='<th rowspan="2"></th>';
									modalBlock+='<th rowspan="2">Registrations</th>';
									modalBlock+='<th colspan="2">Accepted</th>';
									modalBlock+='<th colspan="2">Pending</th>';
									modalBlock+='<th colspan="2">Rejected</th>';
								modalBlock+='</tr>';
								modalBlock+='<tr>';
									modalBlock+='<th>count</th>';
									modalBlock+='<th>%</th>';
									modalBlock+='<th>count</th>';
									modalBlock+='<th>%</th>';
									modalBlock+='<th>count</th>';
									modalBlock+='<th>%</th>';
								modalBlock+='</tr>';
							modalBlock+='</thead>';
							modalBlock+='<tbody>';
								for(var i in response.subList){
									modalBlock+='<tr>';
										modalBlock+='<td>'+setValue(response.subList[i].name)+'</td>';
										modalBlock+='<td>'+setValue(response.subList[i].regiCunt)+'</td>';
										modalBlock+='<td>'+setValue(response.subList[i].acceptedCunt)+'</td>';
										modalBlock+='<td class="color_green">'+setValue(response.subList[i].acceptedPerc)+'</td>';
										modalBlock+='<td>'+setValue(response.subList[i].pendingCunt)+'</td>';
										modalBlock+='<td class="color_green">'+setValue(response.subList[i].pendingPerc)+'</td>';
										modalBlock+='<td>'+setValue(response.subList[i].rejectedCunt)+'</td>';
										modalBlock+='<td class="color_green">'+setValue(response.subList[i].rejectedPerc)+'</td>';
									modalBlock+='</tr>';
								}
							modalBlock+='</tbody>';
						modalBlock+='</table>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		modalBlock+='</div>';
		
		$('#'+blockId).html(modalBlock);
		initializeDataTableWithOutPagination("cbnarmyOverViewTimeLineDataTable");
	}
	
	//SOCIAL MEDIA OVERVIEW
	function buildCBNArmySocialmediaOverViewDetails(response,blockId){
		var socialMediaBgClrObj = {"facebook":"bg_fb","twitter": "bg_twitter","Events":"bg_events"},
			socialMediaObj = {"facebook" : {"label1":"Posts","label2":"Shares","label3":"Likes","label4":"Comments"},
				"twitter" : {"label1":"Tweets","label2":"Retweet","label3":"Likes","label4":"Reply"},
				"Events" : {"label1":"Events","label2":"Invited","label3":"Attended","label4":"Not Attended"}
			};
		var socialMediaIconObj = {"facebook":"fab fa-facebook-f","twitter": "fab fa-twitter","Events":"far fa-calendar-alt"};
			 
		var modalBlock = '';		
		modalBlock+='<div class="card m_top10 card_body_border">';
			modalBlock+='<div class="card-body card_bg">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-12">';
						modalBlock+='<h6 class="font_weight m_bottom_0 text-capital font_15">Social Media Overview</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="row">';
					for(var i in response){
						modalBlock+='<div class="col-sm-4 m_top10">';
							modalBlock+='<div class="card card_body_border">';
								modalBlock+='<div class="card-header '+socialMediaBgClrObj[response[i].name]+' br_none" style="padding: 12px 10px;">';
									modalBlock+='<h6 class="font_weight m_bottom_0 color_white text-capital">'+response[i].name+' - <i class="'+socialMediaIconObj[response[i].name]+'"></i></h6>';
								modalBlock+='</div>';
								modalBlock+='<div class="card-body bg_yash" style="padding:10px 0px;">';
									modalBlock+='<div class="row">';
										modalBlock+='<div class="col">';
											modalBlock+='<div class="ul_blocks">';
												modalBlock+='<ul class="list-inline custom_ul">';
													modalBlock+='<li>';
														modalBlock+='<h6 class="font_12 text-capital font_weight">'+socialMediaObj[response[i].name].label1+'</h6>';
														modalBlock+='<p class="font_weight m_bottom_0">'+response[i].post+'</p>';
													modalBlock+='</li>';
													modalBlock+='<li>';
														modalBlock+='<h6 class="font_12 text-capital font_weight">'+socialMediaObj[response[i].name].label2+'</h6>';
														modalBlock+='<p class="font_weight m_bottom_0">'+response[i].shares+'</p>';
													modalBlock+='</li>';
													modalBlock+='<li>';
														modalBlock+='<h6 class="font_12 text-capital font_weight">'+socialMediaObj[response[i].name].label3+'</h6>';
														modalBlock+='<p class="font_weight m_bottom_0">'+response[i].likes+'</p>';
													modalBlock+='</li>';
													modalBlock+='<li>';
														modalBlock+='<h6 class="font_12 text-capital font_weight">'+socialMediaObj[response[i].name].label4+'</h6>';
														modalBlock+='<p class="font_weight m_bottom_0">'+response[i].comments+'</p>';
													modalBlock+='</li>';
												modalBlock+='</ul>';
										modalBlock+='</div>';										
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
					}
					
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		$('#'+blockId).html(modalBlock);
	}
	
	//SOCIAL MEDIA TIME LINE
	function buildCBNArmySocialmediaTimeLineDetails(response,blockId){
		var modalBlock = '';		
		modalBlock+='<div class="card m_top10 card_body_border">';
			modalBlock+='<div class="card-header card_bg">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-12">';
						modalBlock+='<h6 class="font_weight m_bottom_0 text-capital font_15">Time Line Wise Details</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body color_bg_white">';
				modalBlock+='<div class="row m_top10">';
					modalBlock+='<div class="col-sm-12">';
					modalBlock+='<div class="table-responsive">';
						modalBlock+='<table class="table table-condensed table_custom_style" id="socialMediaTimeLineDataTable" style="width:100%;">';
							modalBlock+='<thead>';
								modalBlock+='<tr>';
									modalBlock+='<th rowspan="2"></th>';
									modalBlock+='<th colspan = "7"><img class="" src="Core/images/facebook_icon.png" alt="facebook"></th>';
									modalBlock+='<th colspan = "7"><img class="" src="Core/images/twitter_icon.png" alt="twitter"></th>';
									modalBlock+='<th colspan = "7"><span class="font_weight m_bottom_0 text-capital font_15 events_label"><i class="far fa-calendar-alt" style="margin-right:7px;"></i>Events</span></th>';
								modalBlock+='</tr>';
								modalBlock+='<tr>';
									for(i=0; i<2;i++){
										modalBlock+='<th>Posts</th>';
										modalBlock+='<th>Assigned</th>';
										modalBlock+='<th>Task done</th>';
										modalBlock+='<th>%</th>';
										modalBlock+='<th>Shares</th>';
										modalBlock+='<th>Likes</th>';
										modalBlock+='<th>Comments</th>';										
									}									
										modalBlock+='<th>Events</th>';
										modalBlock+='<th>Invited</th>';
										modalBlock+='<th>Attended</th>';
										modalBlock+='<th>Not Attended</th>';
								modalBlock+='</tr>';
							modalBlock+='</thead>';
							modalBlock+='<tbody>';
							for(var i in response){
								modalBlock+='<tr>';
									modalBlock+='<td>'+setValue(response[i].name)+'</td>';
									for(var j in response[i].subList){
										if(response[i].subList[j].name != null && response[i].subList[j].name != "Events"){
											modalBlock+='<td>'+setValue(response[i].subList[j].post)+'</td>';
											modalBlock+='<td>'+setValue(response[i].subList[j].totalTasks)+'</td>';
											modalBlock+='<td>'+setValue(response[i].subList[j].completedTasks)+'</td>';
											if(response[i].subList[j].totalTasks != null && response[i].subList[j].totalTasks >0){
												modalBlock+='<td class="color_green">'+((parseFloat(response[i].subList[j].completedTasks) * 100)/parseFloat(response[i].subList[j].totalTasks)).toFixed(2)+'</td>';
											}else{
												modalBlock+='<td>-</td>';
											}
											modalBlock+='<td>'+setValue(response[i].subList[j].shares)+'</td>';
											modalBlock+='<td>'+setValue(response[i].subList[j].likes)+'</td>';
											modalBlock+='<td>'+setValue(response[i].subList[j].comments)+'</td>';
										}else{
											modalBlock+='<td>'+setValue(response[i].subList[j].cunt)+'</td>';
											modalBlock+='<td>'+setValue(response[i].subList[j].invited)+'</td>';
											modalBlock+='<td>'+setValue(response[i].subList[j].attended)+'</td>';
											modalBlock+='<td>'+setValue(response[i].subList[j].notAttended)+'</td>';
										}
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
		
		$('#'+blockId).html(modalBlock);
		initializeDataTableWithPagination("socialMediaTimeLineDataTable");
		$("#socialMediaTimeLineDataTable").tableHeadFixer({"head" : true, "left" : 1}); 
	}
		
	//SOCIAL MEDIA TASS DETAILS
	function buildCBNArmySocialmediaTaskDetails(response,blockId){
		var modalBlock = '';
		modalBlock+='<div class="row">';
		for(var i in response){
			modalBlock+='<div class="col-sm-4 m_top10">';
				modalBlock+='<div class="card card_body_border">';
					modalBlock+='<div class="card-header card_bg" style="padding-left:0px;">';
						modalBlock+='<div class="col-sm-6">';
							if(response[i].name != null && response[i].name == "Events"){
								modalBlock+='<span class="font_weight m_bottom_0 text-capital font_15 events_label"><i class="far fa-calendar-alt" style="margin-right:7px;"></i>'+setValue(response[i].name)+'</span>';
							}else{
								modalBlock+=' <img class="" src="Core/images/'+response[i].name+'_icon.png" alt="'+response[i].name+'">';
							}	
						modalBlock+='</div>';
					modalBlock+='</div>';
					modalBlock+='<div class="card-body card_bg" style="padding:10px 0px;">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col">';
								modalBlock+='<div class="ul_blocks">';
									modalBlock+='<ul class="list-inline custom_ul">';
										modalBlock+='<li>';
											if(response[i].name != null && response[i].name == "Events"){
												modalBlock+='<h6 class="font_12 text-capital font_weight">Invited</h6>';
											}else{
												modalBlock+='<h6 class="font_12 text-capital font_weight">Assigned Task</h6>';
											}												
											modalBlock+='<p class="font_weight m_bottom_0 font_15">'+setValue(response[i].totalTasks)+'</p>';
										modalBlock+='</li>';
										modalBlock+='<li>';
											if(response[i].name != null && response[i].name == "Events"){
												modalBlock+='<h6 class="font_12 text-capital font_weight">Attended</h6>';
											}else{
												modalBlock+='<h6 class="font_12 text-capital font_weight">Completed</h6>';
											}
											modalBlock+='<p class="font_weight m_bottom_0 font_15">'+setValue(response[i].completedTasks)+'<small class="m_left10 color_green">'+setValue(response[i].acceptedPerc)+' %</small></p>';
										modalBlock+='</li>';
										modalBlock+='<li>';
											if(response[i].name != null && response[i].name == "Events"){
												modalBlock+='<h6 class="font_12 text-capital font_weight">Not-Attended</h6>';
											}else{
												modalBlock+='<h6 class="font_12 text-capital font_weight">Pending</h6>';
											}
											modalBlock+='<p class="font_weight m_bottom_0 font_15">'+setValue(response[i].pendingTasks)+'<small class="m_left10 color_red">'+setValue(response[i].pendingPerc)+' %</small></p>';
										modalBlock+='</li>';
									modalBlock+='</ul>';
							modalBlock+='</div>';										
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		}
			
		modalBlock+='</div>';
		
		$('#'+blockId).html(modalBlock);
	}
	
	// SOCIAL MEDIA POST WISE DETAILS
	function buildCBNArmySocialmediaPostDetails(response,blockId,mediaType){
		var modalBlock = '';
		modalBlock+='<div class="card card_body_border">';
			modalBlock+='<div class="card-header card_bg">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-3">';
						modalBlock+=' <img class="" src="Core/images/'+mediaType+'_icon.png" alt="'+mediaType+'">';
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-9 float-right">';
						modalBlock+='<h6 class="m_bottom_0 text-capital m_top5 font_15  float-right">Posts - <sapn class="font_16 font_weight">'+response.length+'</span></h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body color_bg_white pad_10">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-12">';
						modalBlock+='<div class="table-responsive">';
							modalBlock+='<table class="table table-bordered table-condensed table_custom_news  table_custom_bg_white_color" id="'+mediaType+'PostDataTable" style="width:100%">';
								modalBlock+='<thead>';
									modalBlock+='<tr>';
										modalBlock+='<th>'+mediaType+' Posts</th>';
										modalBlock+='<th>Date</th>';
										modalBlock+='<th>Assigned</th>';
										modalBlock+='<th>Task Done</th>';
										modalBlock+='<th>%</th>';
									modalBlock+='</tr>';
								modalBlock+='</thead>';
								modalBlock+='<tbody>';
									for(var i in response){
										modalBlock+='<tr>';
											if(response[i].title != null && response[i].title.length > 15){
											modalBlock+='<td><a href="'+response[i].link+'" target="_blank"><span data-toggle = "tooltip" data-placement="top" title="'+response[i].title+'" class="tooltipCls">'+response[i].title.substring(0,15)+'...</span></a></td>';
											}else{
											modalBlock+='<td><a href="'+response[i].link+'" target="_blank">'+setValue(response[i].title)+'</a></td>';
											}		  
											modalBlock+='<td>'+setValue(response[i].createdDate)+'</td>';		  
											modalBlock+='<td>'+setValue(response[i].assigned)+'</td>';		  
											modalBlock+='<td>'+setValue(response[i].completed)+'</td>';
											modalBlock+='<td class="color_green">'+setValue(response[i].percentage)+'</td>';
										modalBlock+='</tr>';
									}
								modalBlock+='</tbody>';
							modalBlock+='</table>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		$('#'+blockId).html(modalBlock);
		$('.tooltipCls').tooltip();
		initializeDataTableWithPagination(mediaType+"PostDataTable");
	}
	
	//VARIANCE DETAILS
	function buildCBNArmyVarianceDetails(response,blockId,type){
		var modalBlock='';
		modalBlock+='<div class="table-responsive">';	
			modalBlock+='<table class="table  table_custom_news_variance m_bottom_0" id="cbnArmyVarianceDataTable" style="border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="2"></th>';
						if(type == "Tasks"){
							modalBlock+='<th colspan="2">Facebook - Task Completed</th>';
							modalBlock+='<th colspan="2">Twitter - Task Completed</th>';				
						}else{
							modalBlock+='<th colspan="2">Facebook</th>';
							modalBlock+='<th colspan="2">Twitter</th>';
						}
						modalBlock+='<th colspan="2">Event - Attended</th>';
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i=0; i<3; i++){
							modalBlock+='<th>PRESENT</th>';
							modalBlock+='<th>PAST</th>';
						}						
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
					for(var i in response){
						modalBlock+='<tr>';
							modalBlock+='<td class="text-capital">'+setValue(response[i].name)+'</td>';
							if(response[i].fbPresent != null && response[i].fbPresent > 0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexCbnArmyObj[response[i].fbStatus]+'">'+response[i].fbPresent+'</h6></td>';
							}else{
								modalBlock+='<td>-</td>';
							}
							if(response[i].fbPast != null && response[i].fbPast > 0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash">'+response[i].fbPast+'</h6></td>';
							}else{
								modalBlock+='<td>-</td>';
							}
							if(response[i].twitterPresent != null && response[i].twitterPresent > 0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexCbnArmyObj[response[i].twitterStatus]+'">'+response[i].twitterPresent+'</h6></td>';
							}else{
								modalBlock+='<td>-</td>';
							}
							if(response[i].twitterPast != null && response[i].twitterPast > 0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash ">'+response[i].twitterPast+'</h6></td>';
							}else{
								modalBlock+='<td>-</td>';
							}
							if(response[i].eventsPresent != null && response[i].eventsPresent > 0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexCbnArmyObj[response[i].eventsStatus]+'">'+response[i].eventsPresent+'</h6></td>';
							}else{
								modalBlock+='<td>-</td>';
							}
							if(response[i].eventsPast != null && response[i].eventsPast > 0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash ">'+response[i].eventsPast+'</h6></td>';
							}else{
								modalBlock+='<td>-</td>';
							}
							
							
							
							
						modalBlock+='</tr>';
					}
					
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		modalBlock+='</div>';		
		
		$('#'+blockId).html(modalBlock);
		initializeDataTableWithOutPagination("cbnArmyVarianceDataTable");
	}
	
	//LEVEL WISE DETAILS -- TASKS
	
	function buildCBNArmyLevelsWiseTasksDetails(response,blockId,type,locationType){
		var modalBlock='';
		modalBlock+='<div class="col-sm-12 m_top10 ">';	
			modalBlock+='<div class="table-responsive">';	
				modalBlock+='<table class="table  table_custom_news_variance m_bottom_0" id="cbnArmy'+type+''+locationType+'DataTable" style="border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;">';
					modalBlock+='<thead>';
						modalBlock+='<tr>';
							if(locationType == "Constituency" || locationType == "Mandal"){
								modalBlock+='<th rowspan="3">District</th>';
							}
							if(locationType == "Mandal"){
								modalBlock+='<th rowspan="3">Constituency</th>';
							}						
							modalBlock+='<th rowspan="3">'+locationType+'</th>';
							modalBlock+='<th rowspan="3">Members</th>';
							modalBlock+='<th colspan="10"><img class="" src="Core/images/facebook_icon.png" alt="facebook"></th>';
							modalBlock+='<th colspan="10"><img class="" src="Core/images/twitter_icon.png" alt="twitter"></th>';
						modalBlock+='</tr>';
						modalBlock+='<tr>';	
							for(var i=0 ; i< 2 ; i++){
								modalBlock+='<th colspan="2">Tasks Assigned</th>';
								modalBlock+='<th colspan="4">Tasks Pending</th>';
								modalBlock+='<th colspan="4">Tasks Completed</th>';
							}						
						modalBlock+='</tr>';
						modalBlock+='<tr>';
							for(var i=0 ; i< 6 ; i++){
								if(i == 0 || i == 3){
									modalBlock+='<th>Present</th>';
									modalBlock+='<th>Past</th>';	
								}else{
									modalBlock+='<th>Present</th>';
									modalBlock+='<th>%</th>';
									modalBlock+='<th>Past</th>';	
									modalBlock+='<th>%</th>';	
								}
							}
						modalBlock+='</tr>';
					modalBlock+='</thead>';
					modalBlock+='<tbody>';
						for(var i in response){
							modalBlock+='<tr>';
								modalBlock+='<td>'+setValue(response[i].district)+'</td>';
								if(locationType == "Constituency" || locationType == "Mandal"){
									modalBlock+='<td>'+setValue(response[i].assembly)+'</td>';
								}
								if(locationType == "Mandal"){
									modalBlock+='<td>'+setValue(response[i].mandal)+'</td>';
								}
								modalBlock+='<td>'+response[i].cunt+'</td>';
								for(var j in response[i].subList){
									modalBlock+='<td>'+setValue(response[i].subList[j].assignedPresent)+'</td>';
									modalBlock+='<td>'+setValue(response[i].subList[j].assignedPast)+'</td>';
									modalBlock+='<td>'+setValue(response[i].subList[j].pendingPresent)+'</td>';
									modalBlock+='<td class="color_red">'+setValue(response[i].subList[j].pendingPresentPerc)+'</td>';
									modalBlock+='<td>'+setValue(response[i].subList[j].pendingPast)+'</td>';
									modalBlock+='<td class="color_red">'+setValue(response[i].subList[j].pendingPastPerc)+'</td>';
									modalBlock+='<td>'+setValue(response[i].subList[j].completedPresent)+'</td>';
									modalBlock+='<td class="color_green">'+setValue(response[i].subList[j].completedPresentPerc)+'</td>';
									modalBlock+='<td>'+setValue(response[i].subList[j].completedPast)+'</td>';
									modalBlock+='<td class="color_green">'+setValue(response[i].subList[j].completedPastPerc)+'</td>';
								}
							modalBlock+='</tr>';
						}
						
					modalBlock+='</tbody>';
				modalBlock+='</table>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		$('#'+blockId).html(modalBlock);
		initializeDataTableWithPagination('cbnArmy'+type+''+locationType+'DataTable');
		if(locationType == "Mandal"){
			fixedCols = 3;
		}else if(locationType == "Constituency"){
			fixedCols = 2;
		}else if(locationType == "District"){
			fixedCols = 1;
		}
		$('#cbnArmy'+type+''+locationType+'DataTable').tableHeadFixer({"head" : true, "left" : fixedCols}); 
	}
	
	//LEVEL WISE DETAILS -- REGISTRATIONS
	
	function buildCBNArmyLevelsWiseRegistrationsDetails(response,blockId,type,locationType){
		var fixedCols = 0;
		var modalBlock='';
		modalBlock+='<div class="col-sm-12 m_top10 ">';	
			modalBlock+='<div class="table-responsive">';	
				modalBlock+='<table class="table  table_custom_news_variance m_bottom_0" id="cbnArmy'+type+''+locationType+'DataTable" style="border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;">';
					modalBlock+='<thead>';
						modalBlock+='<tr>';
							if(locationType == "Constituency" || locationType == "Mandal"){
								modalBlock+='<th rowspan="2">District</th>';
							}
							if(locationType == "Mandal"){
								modalBlock+='<th rowspan="2">Constituency</th>';
							}						
							modalBlock+='<th rowspan="2">'+locationType+'</th>';						
							for(var i in response[0].subList){
								modalBlock+='<th colspan="4">'+response[0].subList[i].name+'</th>';
							}											
						modalBlock+='</tr>';						
						modalBlock+='<tr>';								
							for(var i in response[0].subList){
								modalBlock+='<th>Present</th>';
								modalBlock+='<th>%</th>';
								modalBlock+='<th>Past</th>';	
								modalBlock+='<th>%</th>';	
							}
						modalBlock+='</tr>';						
					modalBlock+='</thead>';
					modalBlock+='<tbody>';
						for(var i in response){
							modalBlock+='<tr>';
								modalBlock+='<td>'+setValue(response[i].district)+'</td>';
								if(locationType == "Constituency" || locationType == "Mandal"){
									modalBlock+='<td>'+setValue(response[i].assembly)+'</td>';
								}
								if(locationType == "Mandal"){
									modalBlock+='<td>'+setValue(response[i].mandal)+'</td>';
								}								
								for(var j in response[i].subList){
									modalBlock+='<td>'+setValue(response[i].subList[j].present)+'</td>';
									modalBlock+='<td class="color_green">'+setValue(response[i].subList[j].presentPerc)+'</td>';	
									modalBlock+='<td>'+setValue(response[i].subList[j].past)+'</td>';	
									modalBlock+='<td class="color_green">'+setValue(response[i].subList[j].pastPerc)+'</td>';									
								}
							modalBlock+='</tr>';
						}
						
					modalBlock+='</tbody>';
				modalBlock+='</table>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		$('#'+blockId).html(modalBlock);
		initializeDataTableWithPagination('cbnArmy'+type+''+locationType+'DataTable');
		if(locationType == "Mandal"){
			fixedCols = 3;
		}else if(locationType == "Constituency"){
			fixedCols = 2;
		}else{
			fixedCols = 1;
		}
		$('#cbnArmy'+type+''+locationType+'DataTable').tableHeadFixer({"head" : true, "left" : fixedCols}); 
	}
	return {
		buildCBNArmyOverViewDetails : buildCBNArmyOverViewDetails,
		buildCBNArmySocialmediaOverViewDetails : buildCBNArmySocialmediaOverViewDetails,
		buildCBNArmySocialmediaTimeLineDetails : buildCBNArmySocialmediaTimeLineDetails,
		buildCBNArmySocialmediaTaskDetails : buildCBNArmySocialmediaTaskDetails,
		buildCBNArmySocialmediaPostDetails : buildCBNArmySocialmediaPostDetails,
		buildCBNArmyVarianceDetails : buildCBNArmyVarianceDetails,
		buildCBNArmyLevelsWiseTasksDetails : buildCBNArmyLevelsWiseTasksDetails,
		buildCBNArmyLevelsWiseRegistrationsDetails : buildCBNArmyLevelsWiseRegistrationsDetails
	}
}());

function setValue(value){
	if(isNaN(value)){
		if (value != null &&  value.trim().length > 0) {
			return value
		} else {
			return "-";
		}
	}else{
		if (value != null &&  value > 0) {
			return value
		} else {
			return "-";
		}
	}
}
// clicks -- VARIANCE

$(document).on("click",".cbnArmyVarianceCls li",function(){
	var type = $(this).attr("attr_type");
	$("#varianceSubTitleId").html(type);
	CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmyVarianceDetails','CBNArmyVarianceDetailsId',type,'');
});

//clicks -- LEVEL WISE
$(document).on("click",".cbnArmyLevelWiseCls li",function(){
	var type = $(this).attr("attr_type");	
	for(var i in levelWiseCBNArmyArr){
		$("#"+levelWiseCBNArmyArr[i]+"SubTitleId").html(type);
		CBNArmyComponent.ajax.cbnArmyAjaxCalls('getCbnArmyLevelsWiseDetails','CBNArmy'+levelWiseCBNArmyArr[i]+'WiseDetailsId',type,levelWiseCBNArmyArr[i]);
	}
});