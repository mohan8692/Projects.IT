var activitiesComponent = activitiesComponent || {};
	levelWiseActivitiesArr = [{'id':3, 'name':'District'},{'id':4, 'name':'Parliament'},{'id':5, 'name':'Constituency'}],
	colorIndexObj = {"positive":"badge_green","negative": "badge_red","equal": "badge_yellow"};
	tableColorObj = {"Sevamitra":"sevamitraClr","Booth Incharge": "boothClr","Area Incharge": "areaClr"};
function basicActivitiesDetails(blockValue,divId,chosenLabel,subBlockValue){
	var modalBlock='';
	modalBlock+='<div id="activitiesOverviewId"></div>';
	modalBlock+='<div id="activitiesVarianceBlockId"></div>';
	
	modalBlock+='<div class="card mt-3" style="background-color:#F6F7FB;">';
		modalBlock+='<div class="card-header" style="background-color:#F6F7FB;">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<h6 class="font_weight m_bottom_0 m_top10 text-capital">Party Activities - Overview <span id="centerHeadId">Details</span></h6>';
				modalBlock+='</div>';			
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<ul class="list-inline switch-btn-New float-right m_bottom_0 totalActivitiesCls">';
						modalBlock+='<li attr_type="overAll" attr_block_value="'+blockValue+'" attr_sub_block_value="'+subBlockValue+'" class="active">Overall</li>';
						modalBlock+='<li attr_type="category" attr_block_value="'+blockValue+'" attr_sub_block_value="'+subBlockValue+'">Categeory</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		modalBlock+='<div class="card-body">';
			modalBlock+='<div id="totalActivitiesBlockId"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div class="card mt-3" style="background-color:#F6F7FB;">';
		modalBlock+='<div class="card-header" style="background-color:#F6F7FB;">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<h6 class="font_weight m_bottom_0 m_top10 text-capital">Location Wise Overview <span id="centerHeadId">Details</span></h6>';
				modalBlock+='</div>';			
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<ul class="list-inline switch-btn-New float-right m_bottom_0 locationWiseActivityCls">';
						modalBlock+='<li attr_type="Overall" class="active" attr_block_value="'+blockValue+'" attr_sub_block_value="'+subBlockValue+'">Overall</li>';
						modalBlock+='<li attr_type="Categeory" attr_block_value="'+blockValue+'" attr_sub_block_value="'+subBlockValue+'">Categeory</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';		
		modalBlock+='</div>';
		modalBlock+='<div class="card-body">';			
			modalBlock+='<div id="activitiesLevelWiseDetailsId"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	$(".blockWiseModalDivId").html(modalBlock);
	
	activitiesComponent.ajax.activitiesDetails("getActivityTypeWiseOverview","activitiesOverviewId",divId,blockValue,subBlockValue);
	activitiesComponent.ajax.activitiesDetails("getSevaMiraActivityVarianceReportDetails","activitiesVarianceBlockId",divId,blockValue,subBlockValue);
	activitiesComponent.ajax.activitiesDetails("getOverAllDetailsOfPartyActvities","totalActivitiesBlockId",divId,blockValue,subBlockValue,"","overAll");
	activitiesComponent.onLoadCalls.buildActivitiesLocationWiseLevels(blockValue,subBlockValue);
}

activitiesComponent.onLoadCalls = (function(){
	function buildActivitiesLocationWiseLevels(blockValue,subBlockValue){
		var collapse='';
		collapse+='<section>';
		for(var i in levelWiseActivitiesArr)
		{
			collapse+='<div class="row">';
				if(i== 0){
					collapse+='<div class="col-sm-12">';
				}else{
					collapse+='<div class="col-sm-12 m_top10">';
				}		
						collapse+='<div class="" id="accordion'+levelWiseActivitiesArr[i].name+'" role="tablist" aria-multiselectable="true">';
							collapse+='<div class="card card-white card_body_border">';
								collapse+='<div class="card-header card-header-custom card_black" role="tab" id="heading'+levelWiseActivitiesArr[i].name+'">';
									/* if(i == 0)
									{
										collapse+='<a role="button" class="panelCollapseIcon '+levelWiseActivitiesArr[i].name+' "  data-toggle="collapse" data-parent="#accordion'+levelWiseActivitiesArr[i].name+'" href="#collapse'+levelWiseActivitiesArr[i].name+'" aria-expanded="true" aria-controls="collapse'+levelWiseActivitiesArr[i].name+'">';
									}else{
										collapse+='<a role="button" class="panelCollapseIcon  '+levelWiseActivitiesArr[i].name+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+levelWiseActivitiesArr[i].name+'" href="#collapse'+levelWiseActivitiesArr[i].name+'" aria-expanded="true" aria-controls="collapse'+levelWiseActivitiesArr[i].name+'">';
									} */
									collapse+='<a role="button" class="panelCollapseIcon  '+levelWiseActivitiesArr[i].name+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+levelWiseActivitiesArr[i].name+'" href="#collapse'+levelWiseActivitiesArr[i].name+'" aria-expanded="true" aria-controls="collapse'+levelWiseActivitiesArr[i].name+'">';
								
									collapse+='<h6 class="card-title text-uppercase card-title-custom font_15">'+levelWiseActivitiesArr[i].name+' Wise Details</h6>';
										
									collapse+='</a>';
								collapse+='</div>';
								/* if(i == 0)
								{
									collapse+='<div id="collapse'+levelWiseActivitiesArr[i].name+'" class="collapse show" role="tabpanel" aria-labelledby="heading'+levelWiseActivitiesArr[i].name+'">';
								}else{
									collapse+='<div id="collapse'+levelWiseActivitiesArr[i].name+'" class="collapse collapsedIn show" role="tabpanel" aria-labelledby="heading'+levelWiseActivitiesArr[i].name+'">';
								} */
								collapse+='<div id="collapse'+levelWiseActivitiesArr[i].name+'" class="collapse collapsedIn show" role="tabpanel" aria-labelledby="heading'+levelWiseActivitiesArr[i].name+'">';
								
									collapse+='<div class="card-body pad_5">';
										collapse+='<div id="activities'+levelWiseActivitiesArr[i].name+'WiseDetailsId" class="m_top10"></div>';
									collapse+='</div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
				collapse+='</div>';
				collapse+='</div>';
		}
		collapse+='</section>';
		$("#activitiesLevelWiseDetailsId").html(collapse);
		$(".chosen_select").chosen();
		
		for(var i in levelWiseActivitiesArr){
			activitiesComponent.ajax.activitiesDetails("getLocationWiseDetailsForActivites",'activities'+levelWiseActivitiesArr[i].name+'WiseDetailsId',"activitiesId",blockValue,subBlockValue,levelWiseActivitiesArr[i].name,"Overall");
		}
	}
	
	return {
		buildActivitiesLocationWiseLevels : buildActivitiesLocationWiseLevels
	}
}());

activitiesComponent.ajax = (function(){
    function activitiesDetails(url,blockId,divId,blockValue,subBlockValue,locationType,type){
		$("#"+blockId).html(spinner);
		var json;
		if(blockId == "activitiesOverviewId"){
			json = {
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"stateId":1, 
				"activityMemberId":44,
				"typeId":blockValue,
				"subTypeId":subBlockValue,
				"categoryIds":[]
			}
		} else if(blockId == "activitiesSubBlockOverviewId"){
			json = {
				"fromDateStr":customStartDate,
				"toDateStr":customEndDate,
				"activityTypeId":blockValue,
				"activitySubTypeId":subBlockValue,
				"activityMemberId":44,
				"type":"type",
				"categoryIds":[]
			}
		} else if(blockId == "activitiesVarianceBlockId"){
			json = {
				"stateId":1, 
				"activityMemberId":44,
				"typeId":blockValue,
				"subTypeId":subBlockValue,
				"categoryIds":[]
			}
		} else if(blockId == "totalActivitiesBlockId"){
			json = {
				"fromDateStr":customStartDate,
				"toDateStr":customEndDate,
				"activityTypeId":blockValue,
				"activitySubTypeId":subBlockValue, // 0,2,3
				"activityMemberId":44,
				"type":type, //overAll,category
				"categoryIds":[]
			}
		} else if(blockId == "activities"+locationType+"WiseDetailsId"){
			json = {
				"fromDateStr":customStartDate,
				"toDateStr": customEndDate,
				"stateId":1,
				"activityMemberId":44,
				"typeId":blockValue,
				"subTypeId":subBlockValue,
				"locationLevel":locationType,//District,Parliament,Constituency
				"categoryIds":[]
			}

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
		}).then(function(response){
			if(response !=null){
				if(blockId == "activitiesOverviewId"){
					activitiesComponent.buildAjaxCallResult.buildActivitiesOverview(response,divId,blockId,blockValue,subBlockValue);
				}else if(blockId == "activitiesSubBlockOverviewId"){
					activitiesComponent.buildAjaxCallResult.buildActivitiesSubBlockOverview(response,divId,blockId);
				}else if(blockId == "activitiesVarianceBlockId"){
					activitiesComponent.buildAjaxCallResult.buildActivitiesVarianceBlockDetails(response,divId,blockId);
				}else if(blockId == "totalActivitiesBlockId"){
					activitiesComponent.buildAjaxCallResult.buildOverallActivitiesBlockDetails(response,divId,blockId,type);
				}else if(blockId == "activities"+locationType+"WiseDetailsId"){
					activitiesComponent.buildAjaxCallResult.buildActivitiesLocationWiseDetails(response,divId,blockId,locationType,type);
				}
			}else{
				$("#"+blockId).html('No Data Available');
			}
		});
	}
	
	return {
        activitiesDetails : activitiesDetails,
	}
}());
activitiesComponent.buildAjaxCallResult = (function(){
	function buildActivitiesOverview(response,divId,blockId,blockValue,subBlockValue){
		var modalBlock='';
		modalBlock+='<div class="card card_body_border mt-3" style="background-color:#F6F7FB;">';
			modalBlock+='<div class="card-header" style="background-color:#F6F7FB;">';
				modalBlock+='<h6 class="font_weight m_bottom_0">OVERVIEW</h6>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body pad_10">';
				modalBlock+='<div class="mainBlockUl">';
					modalBlock+='<ul class="list-inline blocksLi activitiesStl">';
						modalBlock+='<li attr_type_id="'+response[0].typeId+'" attr_subType_id="0">';
							modalBlock+='<div class="borderFilterCls" style="background-color:#EBEDF1;">';
								modalBlock+='<h6 class="mb-0 text-capital">'+response[0].name+' ACTIVITIES</h6>';
								if(blockValue == response[0].typeId){
									modalBlock+='<div class="card block_shadow mt-2 orangeBrd" style="background-color:#fff;">';
								}else{
									modalBlock+='<div class="card block_shadow mt-2" style="background-color:#fff;">';
								}
									modalBlock+='<div class="card-header">';
										modalBlock+='<h6 class="m_bottom_0 font_14 text-capital">Total Activities <span class="float-right font_weight" style="font-size:1.15rem;">'+response[0].totalActvities+'</span></h6>';
									modalBlock+='</div>';
									modalBlock+='<div class="card-body p-2">';
										modalBlock+='<div class="row text-center">';
											modalBlock+='<div class="col-sm-6">';
												modalBlock+='<h6 class="font_14">Total Events</h6>';
												modalBlock+='<h5 class="font_weight mb-0">'+response[0].totalActivitiesOccured+'</h5>';
											modalBlock+='</div>';
											modalBlock+='<div class="col-sm-6">';
												modalBlock+='<h6 class="font_14">Booths Covered</h6>';
												modalBlock+='<h5 class="font_weight mb-0">'+response[0].totalBoothCovered+' <span class="color_green font_14">'+response[0].coveredPerc+'%</span></h5>';
											modalBlock+='</div>';
										modalBlock+='</div>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
						modalBlock+='<li>';
							modalBlock+='<div class="borderFilterCls" style="background-color:#EBEDF1;">';
								modalBlock+='<h6 class="mb-0 text-capital">ROLE ACTIVITIES</h6>';
								modalBlock+='<div class="mainBlockUl">';
									modalBlock+='<ul class="list-inline blocksLi activitiesStl">';
									for(var i in response){
										if(response[i].name != "Party" && response[i].name != "Own"){
											modalBlock+='<li attr_type_id="'+response[i].typeId+'" attr_subType_id="'+response[i].subTypeId+'">';
												if(subBlockValue == response[i].subTypeId){
													modalBlock+='<div class="card block_shadow mt-2 orangeBrd" style="background-color:#fff;">';
												} else{
													modalBlock+='<div class="card block_shadow mt-2" style="background-color:#fff;">';
												}
													modalBlock+='<div class="card-header">';
														modalBlock+='<h6 class="m_bottom_0 font_14 text-capital">'+response[i].name+' <span class="float-right font_weight" style="font-size:1.15rem;">'+response[i].totalActvities+'</span></h6>';
													modalBlock+='</div>';
													modalBlock+='<div class="card-body p-2">';
														modalBlock+='<div class="row text-center">';
															modalBlock+='<div class="col-sm-6">';
																modalBlock+='<h6 class="font_14">Total Events</h6>';
																modalBlock+='<h5 class="font_weight mb-0">'+response[i].totalActivitiesOccured+'</h5>';
															modalBlock+='</div>';
															modalBlock+='<div class="col-sm-6">';
																modalBlock+='<h6 class="font_14">Booths Covered</h6>';
																modalBlock+='<h5 class="font_weight mb-0">'+response[i].totalBoothCovered+' <span class="color_green font_14">'+response[i].coveredPerc+'%</span></h5>';
															modalBlock+='</div>';
														modalBlock+='</div>';
													modalBlock+='</div>';
												modalBlock+='</div>';
											modalBlock+='</li>';
										}
									}
									modalBlock+='</ul>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
						modalBlock+='<li attr_type_id="'+response[3].typeId+'" attr_subType_id="0">';
							modalBlock+='<div class="borderFilterCls" style="background-color:#EBEDF1;">';
								modalBlock+='<h6 class="mb-0 text-capital">'+response[3].name+' ACTIVITIES</h6>';
								if(blockValue == response[3].typeId){
									modalBlock+='<div class="card block_shadow mt-2 orangeBrd" style="background-color:#fff;">';
								}else{
									modalBlock+='<div class="card block_shadow mt-2" style="background-color:#fff;">';
								}
									modalBlock+='<div class="card-header">';
										modalBlock+='<h6 class="m_bottom_0 font_14 text-capital">Total Activities <span class="float-right font_weight" style="font-size:1.15rem;">'+response[3].totalActvities+'</span></h6>';
									modalBlock+='</div>';
									modalBlock+='<div class="card-body p-2">';
										modalBlock+='<div class="row text-center">';
											modalBlock+='<div class="col-sm-6">';
												modalBlock+='<h6 class="font_14">Total Events</h6>';
												modalBlock+='<h5 class="font_weight mb-0">'+response[3].totalActivitiesOccured+'</h5>';
											modalBlock+='</div>';
											modalBlock+='<div class="col-sm-6">';
												modalBlock+='<h6 class="font_14">Booths Covered</h6>';
												modalBlock+='<h5 class="font_weight mb-0">'+response[3].totalBoothCovered+' <span class="color_green font_14">'+response[3].coveredPerc+'%</span></h5>';
											modalBlock+='</div>';
										modalBlock+='</div>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
				modalBlock+='<div id="activitiesSubBlockOverviewId"></div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		
		$("#"+blockId).html(modalBlock);
		activitiesComponent.ajax.activitiesDetails("getBoothCoveredDetailsByDatesWise","activitiesSubBlockOverviewId","activitiesId",blockValue);
	}
	
	function buildActivitiesSubBlockOverview(response,divId,blockId){
		var modalBlock='';
		modalBlock+='<div class="borderFilterCls mt-3" style="background-color:#EBEDF1; margin:0px 10px;">';
			modalBlock+='<div class="row">';
			for(var i in response) {
				modalBlock+='<div class="col-sm-3">';
				if(i == 0){
					modalBlock+='<div class="card card_body_border mt-2 orangeBrd" style="background-color:#fff;">';
				}else{
					modalBlock+='<div class="card card_body_border mt-2" style="background-color:#fff;">';
				}
						modalBlock+='<div class="card-header">';
							modalBlock+='<h6 class="m_bottom_0 font_14">'+response[i].name+' <span class="float-right font_weight" style="font-size:1.15rem;">'+response[i].total+'</span></h6>';
						modalBlock+='</div>';
						modalBlock+='<div class="card-body p-2">';
							modalBlock+='<div class="row text-center">';
								modalBlock+='<div class="col-sm-6">';
									modalBlock+='<h6 class="font_14">Total Events</h6>';
									modalBlock+='<h5 class="font_weight mb-0">'+response[i].totalBoothsCoveredCount+'</h5>';
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-6">';
									modalBlock+='<h6 class="font_14">Booths Covered</h6>';
									modalBlock+='<h5 class="font_weight mb-0">'+response[i].count+' <span class="color_green font_14">'+response[i].percentage+'%</span></h5>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			}
			modalBlock+='</div>';
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
	}
	
	function buildActivitiesVarianceBlockDetails(response,divId,blockId) {
		var modalBlock='';
		modalBlock+='<div class="borderFilterCls mt-3" style="background-color:#EBEDF1;">';
			modalBlock+='<h6 class="font_weight">PARTY ACTIVITIES</h6>';
			modalBlock+='<div class="card mt-3">';
				modalBlock+='<div class="card-header">';
					modalBlock+='<h6 class="font_weight m_bottom_0">VARIANCE</h6>';
				modalBlock+='</div>';
				modalBlock+='<div class="card-body p-3">';
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col m_top10">';
							modalBlock+='<ul class="list-inline basic_list_type mb-0 float-right">';
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
					if($(window.width)>800){
						modalBlock+='<div class="table-responsive">';
					}
						modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="varianceDataTableId">';
							modalBlock+='<thead>';
								modalBlock+='<tr>';
									modalBlock+='<th rowspan="2"></th>';
									modalBlock+='<th colspan="2">Total Booths Covered</th>';
									for(var i in response[0].subList){
										modalBlock+='<th colspan="2">'+response[0].subList[i].name+' Covered Booths</th>';
									}
								modalBlock+='</tr>';
								modalBlock+='<tr>';
									modalBlock+='<th>PRESENT</th>';
									modalBlock+='<th>PAST</th>';
									for(var i in response[0].subList){
										modalBlock+='<th>PRESENT</th>';
										modalBlock+='<th>PAST</th>';
									}
								modalBlock+='</tr>';
							modalBlock+='</thead>';
							modalBlock+='<tbody>';
							for(var i in response) {
								modalBlock+='<tr>';
									modalBlock+='<td>'+response[i].name+'</td>';
									if(response[i].presentCoveredBoothCount != null && response[i].presentCoveredBoothCount>0){
										modalBlock+='<td><span class="number_css badge '+colorIndexObj[response[i].impact]+'">'+response[i].presentCoveredBoothCount+'</span></td>';
									}else{
										modalBlock+='<td>-</td>';
									}
									if(response[i].pastCoveredBoothCount != null && response[i].pastCoveredBoothCount>0){
										modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].pastCoveredBoothCount+'</span></td>';
									}else{
										modalBlock+='<td>-</td>';
									}
									for(var j in response[i].subList){
										if(response[i].subList[j].presentCoveredBoothCount != null && response[i].subList[j].presentCoveredBoothCount>0){
											modalBlock+='<td><span class="number_css badge '+colorIndexObj[response[i].subList[j].impact]+'">'+response[i].subList[j].presentCoveredBoothCount+'</span></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
										if(response[i].subList[j].pastCoveredBoothCount != null && response[i].subList[j].pastCoveredBoothCount>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].subList[j].pastCoveredBoothCount+'</span></td>';
										}else{
											modalBlock+='<td>-</td>';
										}
									}
								modalBlock+='</tr>';
							}
							modalBlock+='</tbody>';
						modalBlock+='</table>';
					if($(window.width)>800){
						modalBlock+='</div>';
					}
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
	}
	
	function buildOverallActivitiesBlockDetails(response,divId,blockId,type){
		var modalBlock='';
		modalBlock+='<div class="table-responsive m_top10">';
		if(type == "overAll"){
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="activitiesOverviewDataTable" style="width:100%;">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="3">Program Name</th>';
						modalBlock+='<th colspan="2" class="totalClr">Total Covered Booths</th>';
						for(var i in response[0].subList){
							modalBlock+='<th colspan="3" class="'+tableColorObj[response[0].subList[i].name]+'">'+response[0].subList[i].name+' Covered Booths</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="2" class="totalClr">Total</th>';
						modalBlock+='<th rowspan="2" class="totalClr">Images</th>';
						for(var i in response[0].subList){
							modalBlock+='<th colspan="2" class="'+tableColorObj[response[0].subList[i].name]+'">Total</th>';
							modalBlock+='<th rowspan="2" class="'+tableColorObj[response[0].subList[i].name]+'">Images</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response[0].subList){
							modalBlock+='<th class="'+tableColorObj[response[0].subList[i].name]+'">Count</th>';
							modalBlock+='<th class="'+tableColorObj[response[0].subList[i].name]+'">%</th>';
						}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in response){
					modalBlock+='<tr>';
						modalBlock+='<td>'+response[i].name+'</td>';
						modalBlock+='<td class="totalClr">'+response[i].totalCount+'</td>';
						modalBlock+='<td class="totalClr">'+response[i].totalImageCount+'</td>';
						for(var j in response[i].subList){
							modalBlock+='<td class="'+tableColorObj[response[i].subList[i].name]+'">'+response[i].subList[j].count+'</td>';
							modalBlock+='<td class="color_green '+tableColorObj[response[i].subList[i].name]+'">'+response[i].subList[j].countPerc+'</td>';
							modalBlock+='<td class="'+tableColorObj[response[i].subList[i].name]+'">'+response[i].subList[j].imageCount+'</td>';
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';	
		} else {
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="activitiesOverviewDataTable" style="width:100%;">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="4">Program Name</th>';
						for(var i in response[0].subList){
							modalBlock+='<th colspan="'+(((response[0].subList[i].subList.length)*3)+2)+'">'+response[0].subList[i].name+'</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response[0].subList){
							modalBlock+='<th colspan="2" class="totalClr">Total Covered Booths</th>';
							for(var j in response[0].subList[i].subList){
								modalBlock+='<th colspan="3" class="'+tableColorObj[response[0].subList[i].subList[j].name]+'">'+response[0].subList[i].subList[j].name+' Covered Booths</th>';
							}
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response[0].subList){
							modalBlock+='<th rowspan="2" class="totalClr">Total</th>';
							modalBlock+='<th rowspan="2" class="totalClr">Images</th>';
							for(var j in response[0].subList[i].subList){
								modalBlock+='<th colspan="2" class="'+tableColorObj[response[0].subList[i].subList[j].name]+'">Total</th>';
								modalBlock+='<th rowspan="2" class="'+tableColorObj[response[0].subList[i].subList[j].name]+'">Images</th>';
							}
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response[0].subList){
							for(var j in response[0].subList[i].subList){
								modalBlock+='<th class="'+tableColorObj[response[0].subList[i].subList[j].name]+'">Count</th>';
								modalBlock+='<th class="'+tableColorObj[response[0].subList[i].subList[j].name]+'">%</th>';
							}
						}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in response){
					modalBlock+='<tr>';
						modalBlock+='<td>'+response[i].name+'</td>';
						for(var j in response[i].subList){
							modalBlock+='<td class="totalClr">'+response[i].subList[j].totalCount+'</td>';
							modalBlock+='<td class="totalClr">'+response[i].subList[j].totalImageCount+'</td>';
							for(var k in response[i].subList[j].subList){
								modalBlock+='<td class="'+tableColorObj[response[i].subList[j].subList[k].name]+'">'+response[i].subList[j].subList[k].count+'</td>';
								modalBlock+='<td class="color_green '+tableColorObj[response[i].subList[j].subList[k].name]+'">'+response[i].subList[j].subList[k].countPerc+'</td>';
								modalBlock+='<td class="'+tableColorObj[response[i].subList[j].subList[k].name]+'">'+response[i].subList[j].subList[k].imageCount+'</td>';
							}
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';	
		}			
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
		initializeDataTableWithOutPagination("activitiesOverviewDataTable");
		$("#activitiesOverviewDataTable").tableHeadFixer({"left" : 1});
	}
	
	function buildActivitiesLocationWiseDetails(response,divId,blockId,locationType,type){
		var modalBlock='';
		catColorObj = {"Total Covered Booths":"totalClr","Sevamitra Covered Booths":"sevamitraClr","Booth Incharge Covered Booths": "boothClr","Area Incharge Covered Booths": "areaClr"};
		modalBlock+='<div class="table-responsive m_top10">';
		if(type == "Overall"){
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="locationWise'+locationType+'DataTableId" style="width:100%;">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						if(locationType == "District"){
							modalBlock+='<th rowspan="3">DISTRICT NAMES</th>';
						}else if(locationType == "Parliament"){
							modalBlock+='<th rowspan="3">PARLIAMENT NAMES</th>';
						}else{
							modalBlock+='<th rowspan="3">CONSTITUENCY NAMES</th>';
						}
						modalBlock+='<th rowspan="3">TOTAL BOOTHS</th>';
						modalBlock+='<th colspan="3" style="background-color:#F1F2EC;">Total Booths Covered</th>';
						for(var i in response[0].subList){
							modalBlock+='<th colspan="3" class="'+tableColorObj[response[0].subList[i].name]+'">'+response[0].subList[i].name+' Covered Booths</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						modalBlock+='<th colspan="2" style="background-color:#F1F2EC;">TOTAL</th>';
						modalBlock+='<th rowspan="2" style="background-color:#F1F2EC;">Images</th>';
						for(var i in response[0].subList){
							modalBlock+='<th colspan="2" class="'+tableColorObj[response[0].subList[i].name]+'">TOTAL</th>';
							modalBlock+='<th rowspan="2" class="'+tableColorObj[response[0].subList[i].name]+'">Images</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						modalBlock+='<th style="background-color:#F1F2EC;">COUNT</th>';
						modalBlock+='<th style="background-color:#F1F2EC;">%</th>';
						for(var i in response[0].subList){
							modalBlock+='<th class="'+tableColorObj[response[0].subList[i].name]+'">COUNT</th>';
							modalBlock+='<th class="'+tableColorObj[response[0].subList[i].name]+'">%</th>';
						}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in response) {
					modalBlock+='<tr>';
						modalBlock+='<td class="text-capital">'+response[i].roleName+'</td>';
						modalBlock+='<td>'+emptyCheck(response[i].totalCount)+'</td>';
						modalBlock+='<td style="background-color:#F1F2EC;">'+emptyCheck(response[i].totalBoothsCovered)+'</td>';
						modalBlock+='<td class="color_green" style="background-color:#F1F2EC;">'+emptyCheck(response[i].coveredBoothsPerc)+'</td>';
						modalBlock+='<td style="background-color:#F1F2EC;">'+emptyCheck(response[i].totalBoothsCoveredImages)+'</td>';
						for(var j in response[i].subList){
							modalBlock+='<td class="'+tableColorObj[response[i].subList[j].name]+'">'+emptyCheck(response[i].subList[j].coveredBooths)+'</td>';
							modalBlock+='<td class="color_green '+tableColorObj[response[i].subList[j].name]+'">'+emptyCheck(response[i].subList[j].coveredBoothsPerc)+'</td>';
						modalBlock+='<td class="'+tableColorObj[response[i].subList[j].name]+'">'+emptyCheck(response[i].subList[j].coveredBoothsImages)+'</td>';
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		}else{
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="locationWise'+locationType+'DataTableId" style="width:100%;">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						if(locationType == "District"){
							modalBlock+='<th rowspan="4">DISTRICT NAMES</th>';
						}else if(locationType == "Parliament"){
							modalBlock+='<th rowspan="4">PARLIAMENT NAMES</th>';
						}else{
							modalBlock+='<th rowspan="4">CONSTITUENCY NAMES</th>';
						}
						for(var i in response[0].categoryList){
							modalBlock+='<th colspan="'+(((response[0].categoryList[i].roleList.length)*3)+1)+'">'+response[0].categoryList[i].name+'</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
					for(var i in response[0].categoryList){
						modalBlock+='<th rowspan="3">TOTAL BOOTHS</th>';
						for(var j in response[0].categoryList[i].roleList){
							modalBlock+='<th class="'+catColorObj[response[0].categoryList[i].roleList[j].name]+'" colspan="3">'+response[0].categoryList[i].roleList[j].name+'</th>';
						}
					}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
					for(var i in response[0].categoryList){
						for(var j in response[0].categoryList[i].roleList){
							modalBlock+='<th class="'+catColorObj[response[0].categoryList[i].roleList[j].name]+'" colspan="2">Total</th>';
							modalBlock+='<th class="'+catColorObj[response[0].categoryList[i].roleList[j].name]+'" rowspan="2">Images</th>';
						}
					}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
					for(var i in response[0].categoryList){
						for(var j in response[0].categoryList[i].roleList){
							modalBlock+='<th class="'+catColorObj[response[0].categoryList[i].roleList[j].name]+'">Count</th>';
							modalBlock+='<th class="'+catColorObj[response[0].categoryList[i].roleList[j].name]+'">%</th>';
						}
					}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in response) {
					modalBlock+='<tr>';
						modalBlock+='<td class="text-capital">'+response[i].name+'</td>';
						for(var j in response[i].categoryList){
							for(var k in response[i].categoryList[j].roleList){
								if(response[i].categoryList[j].roleList[k].name == "Total Covered Booths"){
									modalBlock+='<td>'+response[i].categoryList[j].roleList[k].totalBooth+'</td>';
								}
								modalBlock+='<td class="'+catColorObj[response[i].categoryList[j].roleList[k].name]+'">'+response[i].categoryList[j].roleList[k].coveredBooths+'</td>';
								modalBlock+='<td class="color_green '+catColorObj[response[i].categoryList[j].roleList[k].name]+'">'+response[i].categoryList[j].roleList[k].coveredBoothsPerc+'</td>';
								modalBlock+='<td class="'+catColorObj[response[i].categoryList[j].roleList[k].name]+'">'+response[i].categoryList[j].roleList[k].coveredBoothsImages+'</td>';
							}
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';	
		}
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
		if(locationType == "District"){
			initializeDataTableWithOutPagination('locationWise'+locationType+'DataTableId');
		}else {
			initializeDataTableWithPagination('locationWise'+locationType+'DataTableId');
		}
		$("#locationWise"+locationType+'DataTableId').tableHeadFixer({"left" : 1});
	}
	
	return {
        buildActivitiesOverview : buildActivitiesOverview,
		buildActivitiesSubBlockOverview : buildActivitiesSubBlockOverview,
		buildActivitiesVarianceBlockDetails : buildActivitiesVarianceBlockDetails,
		buildActivitiesLocationWiseDetails : buildActivitiesLocationWiseDetails,
		buildOverallActivitiesBlockDetails : buildOverallActivitiesBlockDetails
    }
}());

$(document).on("click",".locationWiseActivityCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	var blockValue = $(this).attr("attr_block_value");
	var subBlockValue = $(this).attr("attr_sub_block_value");
	if(type == "Overall"){
		for(var i in levelWiseActivitiesArr){
			activitiesComponent.ajax.activitiesDetails("getLocationWiseDetailsForActivites",'activities'+levelWiseActivitiesArr[i].name+'WiseDetailsId',"activitiesId",blockValue,subBlockValue,levelWiseActivitiesArr[i].name,type);
		}
	}else{
		for(var i in levelWiseActivitiesArr){
			activitiesComponent.ajax.activitiesDetails("getCategoryWiseLocationDetailsForActivites",'activities'+levelWiseActivitiesArr[i].name+'WiseDetailsId',"activitiesId",blockValue,subBlockValue,levelWiseActivitiesArr[i].name,type);
		}
	}
});
$(document).on("click",".totalActivitiesCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	var blockValue = $(this).attr("attr_block_value");
	var subBlockValue = $(this).attr("attr_sub_block_value");
	activitiesComponent.ajax.activitiesDetails("getOverAllDetailsOfPartyActvities","totalActivitiesBlockId","activitiesId",blockValue,subBlockValue,"",type);
});