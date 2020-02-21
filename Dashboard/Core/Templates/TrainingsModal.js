var trainingComponent = trainingComponent || {};
	levelWiseTrainingArr = [{'id':3, 'name':'District'},{'id':4, 'name':'Parliament'},{'id':5, 'name':'Constituency'},{'id':6, 'name':'Mandal'},{'id':8, 'name':'Village'}],
	colorIndexObj = {2:"badge_green",3: "badge_red",4: "badge_yellow"};
var globalChar = "details";
function basicTrainingsDetails(blockValue,divId,chosenLabel){
	var modalBlock='';
	modalBlock+='<div class="row">';
		modalBlock+='<div class="col-sm-1">';
			modalBlock+='<label class="float-right">Program:</label>';
		modalBlock+='</div>';
		modalBlock+='<div class="col-sm-2">';
			modalBlock+='<select class="form-control chosen_select" id="programId">';
				modalBlock+='<option value="0">All</option>';
			modalBlock+='</select>';
		modalBlock+='</div>';
		modalBlock+='<div class="col-sm-1">';
			modalBlock+='<label class="float-right">Category:</label>';
		modalBlock+='</div>';
		modalBlock+='<div class="col-sm-2">';
			modalBlock+='<select class="form-control chosen_select" attr_block_value="'+blockValue+'" id="categorySelectBoxId">';
				modalBlock+='<option value="0">All</option>';
			modalBlock+='</select>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	modalBlock+='<div class="m_top10" id="trainingDetailsId'+divId+'"></div>';
	modalBlock+='<div id="varianceDetailsId'+divId+'"></div>';
	modalBlock+='<div id="dayWiseDetailsId'+divId+'"></div>';
	modalBlock+='<div id="categeoryWiseDetailsId'+divId+'"></div>';
	
	modalBlock+='<div class="card mt-3" style="background-color:#F6F7FB;">';
		modalBlock+='<div class="card-header" style="background-color:#F6F7FB;">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<h6 class="font_weight m_bottom_0 m_top10 text-capital">Training Center Wise <span id="centerHeadId">Details</span></h6>';
				modalBlock+='</div>';			
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<ul class="list-inline switch-btn-New float-right m_bottom_0 centerWiseVarianceCls">';
						modalBlock+='<li attr_block_type="centerWiseDetailsId'+divId+'" attr_type="details" attr_block_value="'+blockValue+'" class="active">Details</li>';
						modalBlock+='<li attr_block_type="centerWiseDetailsId'+divId+'" attr_type="variance" attr_block_value="'+blockValue+'">Variance</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		modalBlock+='<div class="card-body">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<ul class="list-inline switch-btn-New m_bottom_0 centerWiseCharcterCls">';
						modalBlock+='<li attr_block_type="centerWiseDetailsIdtrainingsId" attr_type="details" attr_block_value="'+blockValue+'" class="active">Details</li>';
						modalBlock+='<li attr_block_type="centerWiseDetailsIdtrainingsId" attr_type="Category" attr_block_value="'+blockValue+'">Category</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<ul class="list-inline basic_list_type float-right m_bottom_0 dayWiseView" style="display:none;">';
						modalBlock+='<li style="background: #fff; padding: 5px 10px;margin-top: 5px;">';
							modalBlock+='<div class="form-check form-check-inline float-right">';
							  modalBlock+='<input class="form-check-input dayWiseCheck" type="checkbox" id="DayWise" value="">';
							  modalBlock+='<label class="form-check-label font_weight" for="DayWise">Day Wise</label>';
							modalBlock+='</div>';
						modalBlock+='</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		
			modalBlock+='<div id="centerWiseDetailsId'+divId+'"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';		
	
	modalBlock+='<div class="card mt-3" style="background-color:#F6F7FB;">';
		modalBlock+='<div class="card-header" style="background-color:#F6F7FB;">';
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-6">';
					modalBlock+='<h6 class="font_weight m_bottom_0 m_top10 text-capital">Location Wise Details</h6>';
				modalBlock+='</div>';
				modalBlock+='<div class="col-sm-3">';
					modalBlock+='<ul class="list-inline basic_list_type float-right m_bottom_0 dayWiseLevelWiseOverview">';
						modalBlock+='<li style="background: #fff; padding: 5px 10px;margin-top: 5px;">';
							modalBlock+='<div class="form-check form-check-inline float-right">';
							  modalBlock+='<input class="form-check-input dayWiseLevelWiseCheck" type="checkbox" id="DayWiseLevelWise" value="">';
							  modalBlock+='<label class="form-check-label font_weight" for="DayWiseLevelWise">Day Wise</label>';
							modalBlock+='</div>';
						modalBlock+='</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
				modalBlock+='<div class="col-sm-3">';
					modalBlock+='<ul class="list-inline switch-btn-New float-right m_bottom_0 locationWiseVarianceCls">';
						modalBlock+='<li attr_type="details" class="active" attr_blockvalue="'+blockValue+'">Details</li>';
						modalBlock+='<li attr_type="comparision" attr_blockvalue="'+blockValue+'">Comparision</li>';
					modalBlock+='</ul>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		modalBlock+='<div class="card-body">';			
			modalBlock+='<div id="trainingLevelWiseDetailsId"></div>';
		modalBlock+='</div>';
	modalBlock+='</div>';
	
	$(".blockWiseModalDivId").html(modalBlock);
	$(".chosen_select").chosen();

	trainingComponent.ajax.trainingDetails("getBoothCategoryDetails","categorySelectBoxId");
	trainingComponent.ajax.trainingDetails("getSevamitraTrainingTotalMembersDetails","trainingDetailsId"+divId,divId,blockValue,"","","","","","","","","");
	trainingComponent.ajax.trainingDetails("getSevamitraAttendedOverviewDetails","varianceDetailsId"+divId,divId,blockValue,"","","","","","","","",[]);
	trainingComponent.ajax.trainingDetails("getSevamitraVarianceReportPerformance","dayWiseDetailsId"+divId,divId,blockValue,"","","","","","","","",[]);
	trainingComponent.ajax.trainingDetails("getCategoryWiseSevamitraUserAnalysis","categeoryWiseDetailsId"+divId,divId,blockValue,"","","","","","","","",[]);
	//trainingComponent.ajax.trainingDetails("getCenterWiseCategoryOverView","centerWiseDetailsId"+divId,"",blockValue,"details");
	trainingComponent.ajax.trainingDetails("getCenterWiseOverView","centerWiseDetailsId"+divId,"",blockValue,"details");
	trainingComponent.onLoadCalls.buildTrainingLocationWiseLevels(blockValue);
}

trainingComponent.onLoadCalls = (function(){
	function buildTrainingLocationWiseLevels(blockValue){
		var collapse='';
		collapse+='<section>';
		for(var i in levelWiseTrainingArr)
		{
			collapse+='<div class="row">';
				if(i== 0){
					collapse+='<div class="col-sm-12">';
				}else{
					collapse+='<div class="col-sm-12 m_top10">';
				}		
						collapse+='<div class="" id="accordion'+levelWiseTrainingArr[i].name+'" role="tablist" aria-multiselectable="true">';
							collapse+='<div class="card card-white card_body_border">';
								collapse+='<div class="card-header card-header-custom card_black" role="tab" id="heading'+levelWiseTrainingArr[i].name+'">';
									/* if(i == 0)
									{
										collapse+='<a role="button" class="panelCollapseIcon '+levelWiseTrainingArr[i].name+' "  data-toggle="collapse" data-parent="#accordion'+levelWiseTrainingArr[i].name+'" href="#collapse'+levelWiseTrainingArr[i].name+'" aria-expanded="true" aria-controls="collapse'+levelWiseTrainingArr[i].name+'">';
									}else{
										collapse+='<a role="button" class="panelCollapseIcon  '+levelWiseTrainingArr[i].name+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+levelWiseTrainingArr[i].name+'" href="#collapse'+levelWiseTrainingArr[i].name+'" aria-expanded="true" aria-controls="collapse'+levelWiseTrainingArr[i].name+'">';
									} */
									collapse+='<a role="button" class="panelCollapseIcon  '+levelWiseTrainingArr[i].name+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+levelWiseTrainingArr[i].name+'" href="#collapse'+levelWiseTrainingArr[i].name+'" aria-expanded="true" aria-controls="collapse'+levelWiseTrainingArr[i].name+'">';
								
									collapse+='<h6 class="card-title text-uppercase card-title-custom font_15">'+levelWiseTrainingArr[i].name+' Wise Details</h6>';
										
									collapse+='</a>';
								collapse+='</div>';
								/* if(i == 0)
								{
									collapse+='<div id="collapse'+levelWiseTrainingArr[i].name+'" class="collapse show" role="tabpanel" aria-labelledby="heading'+levelWiseTrainingArr[i].name+'">';
								}else{
									collapse+='<div id="collapse'+levelWiseTrainingArr[i].name+'" class="collapse collapsedIn show" role="tabpanel" aria-labelledby="heading'+levelWiseTrainingArr[i].name+'">';
								} */
								collapse+='<div id="collapse'+levelWiseTrainingArr[i].name+'" class="collapse collapsedIn show" role="tabpanel" aria-labelledby="heading'+levelWiseTrainingArr[i].name+'">';
								
									collapse+='<div class="card-body pad_5">';
									if(levelWiseTrainingArr[i].name == "Mandal" || levelWiseTrainingArr[i].name == "Village"){
										collapse+='<div class="row mt-2">';
											collapse+='<div class="col-sm-3">';
												collapse+='<label class="text-capital font_15 font_weight"> District</label>';
												collapse+='<select class="form-control chosen_select distClkCls" attr_divId="'+levelWiseTrainingArr[i].name+'levelWiseOverviewIdConstituency" attr_locType ="'+levelWiseTrainingArr[i].name+'" id="'+levelWiseTrainingArr[i].name+'levelWiseOverviewIdDistrict">';
													collapse+='<option value="0">All</option>';
												collapse+='</select>';
											collapse+='</div>';
											collapse+='<div class="col-sm-3">';
												collapse+='<label class="text-capital font_15 font_weight"> Constituency</label>';
												collapse+='<select class="form-control chosen_select constClkCls" attr_divId="'+levelWiseTrainingArr[i].name+'levelWiseOverviewIdMandal" attr_locType ="'+levelWiseTrainingArr[i].name+'" id="'+levelWiseTrainingArr[i].name+'levelWiseOverviewIdConstituency">';
													collapse+='<option value="0">All</option>';
												collapse+='</select>';
											collapse+='</div>';
											if(levelWiseTrainingArr[i].name == "Village"){
												collapse+='<div class="col-sm-3">';
													collapse+='<label class="text-capital font_15 font_weight"> Mandal</label>';
													collapse+='<select class="form-control chosen_select" id="'+levelWiseTrainingArr[i].name+'levelWiseOverviewIdMandal">';
														collapse+='<option value="0">All</option>';
													collapse+='</select>';
												collapse+='</div>';
											}
											collapse+='<div class="m_top20 col-sm-2">';
												collapse+='<button type="button" class="btn btn-sm btn-success btnClkCls m_top15" attr_block_value="'+blockValue+'" attr_location_type="'+levelWiseTrainingArr[i].name+'"  attr_type="details" id="'+levelWiseTrainingArr[i].name+'ButId">Submit</button>';
											collapse+='</div>';
										collapse+='</div>';
									}
										collapse+='<div id="Training'+levelWiseTrainingArr[i].name+'WiseDetailsId" class="m_top10"></div>';
									collapse+='</div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
				collapse+='</div>';
				collapse+='</div>';
		}
		collapse+='</section>';
		$("#trainingLevelWiseDetailsId").html(collapse);
		$(".chosen_select").chosen();
		
		var locationScopeId = "";
		var locationValuesArr = [];
		for(var i in levelWiseTrainingArr){
			if(levelWiseTrainingArr[i].name == "Mandal" || levelWiseTrainingArr[i].name == "Village"){//  MandallevelWiseOverviewIdDistrict
				trainingComponent.ajax.trainingDetails('getAllDistrictIdAndNameAction',levelWiseTrainingArr[i].name+"levelWiseOverviewIdDistrict","","","",levelWiseTrainingArr[i].name)
			}
			if(levelWiseTrainingArr[i].name != "Village"){
				trainingComponent.ajax.trainingDetails('getLocationWiseSevamitraDetails','Training'+levelWiseTrainingArr[i].name+'WiseDetailsId',"",blockValue,"",levelWiseTrainingArr[i].name,levelWiseTrainingArr[i].id,"","",locationScopeId,locationValuesArr,"details");
			}	
		}
	}
	
	return {
		buildTrainingLocationWiseLevels : buildTrainingLocationWiseLevels
	}
}());

trainingComponent.ajax = (function(){
    function trainingDetails(url,blockId,divId,blockValue,blockType,locationType,locationId,distId,constId,locationScopeId,locationValuesArr,type,categoryId){
		if(locationValuesArr == 0){
			locationValuesArr =[];
		}
		$("#"+blockId).html(spinner);
		var json;
		if(blockId == "categorySelectBoxId"){
			json = {
				"categoryId": ""
			}
		}else if(blockId == "trainingDetailsIdtrainingsId"){
			json = {
				"fromDateStr":customStartDate,
				"toDateStr": customEndDate,
				"trainingCampProgramId":blockValue,
				"activityMemberId":"44",
				"categoryId":categoryId
			}
		}else if(blockId == "centerWiseDetailsIdtrainingsId"){
			json = {
				"fromDateStr":customStartDate,
				"toDateStr": customEndDate,
				"trainingCampProgramId":blockValue,
				"activityMemberId":"44"
			}
		} else if(blockId == "varianceDetailsIdtrainingsId" || blockId == "categeoryWiseDetailsIdtrainingsId"){
			json = {
				"activityMemberId": 44,
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"stateId": 1,
                "programId":blockValue,
                "trainingTypeId":2,
				"categoryIds":categoryId
			}
		} else if(blockId == "dayWiseDetailsIdtrainingsId"){
			json = {
				"activityMemberId": 44,
				"stateId": 1,
				"programId":blockValue,
				"trainingTypeId":2,
				"categoryIds":categoryId
			}
		} else if(blockId == "Training"+locationType+"WiseDetailsId"){
			json = {
				"fromDateStr":customStartDate,
				"toDateStr": customEndDate,
				"trainingCampProgramId":blockValue,
				"blockId":locationId,
				"locationScopeId" :locationScopeId,
				"locationValues":locationValuesArr
			}

		} else if(blockId == locationType+"levelWiseOverviewIdDistrict"){
			json = {
				
			}
		} else if(blockId == locationType+"levelWiseOverviewIdConstituency"){
			json = {
				"districtId":distId,
				"locationScopeId":0,
				"locationScopeValuesArr":[]
			}
		} else if(blockId == locationType+"levelWiseOverviewIdMandal"){
			json = {
				"consitencyId":constId
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
				if(blockId == "categorySelectBoxId"){
					trainingComponent.buildAjaxCallResult.buildCategorySelectBox(response,blockId);
				}else if(blockId == "trainingDetailsIdtrainingsId"){
					trainingComponent.buildAjaxCallResult.buildOverAlltraining(response,divId,blockId);
				}else if(blockId == "varianceDetailsIdtrainingsId"){
					trainingComponent.buildAjaxCallResult.buildVarianceDetails(response,divId,blockId);
				}else if(blockId == "dayWiseDetailsIdtrainingsId"){
					trainingComponent.buildAjaxCallResult.buildDayWiseDetails(response,divId,blockId);
				}else if(blockId == "categeoryWiseDetailsIdtrainingsId"){
					trainingComponent.buildAjaxCallResult.buildCategeoryWiseDetails(response,divId,blockId);
				}else if(blockId == "centerWiseDetailsIdtrainingsId"){
					trainingComponent.buildAjaxCallResult.buildCenterWiseDetails(response,blockId,blockValue,blockType);
				}else if(blockId == "Training"+locationType+"WiseDetailsId"){
					if(type == "details"){
						trainingComponent.buildAjaxCallResult.buildLocationWiseDetails(response,blockId,locationType,blockValue);
					}else if(type == "comparision"){
						trainingComponent.buildAjaxCallResult.buildLocationWiseCategorySevamitraDetails(response,locationType,blockValue,blockId);
					}
					
				}else if(blockId == locationType+"levelWiseOverviewIdDistrict" || blockId == locationType+"levelWiseOverviewIdConstituency" || blockId == locationType+"levelWiseOverviewIdMandal"){
					trainingComponent.buildAjaxCallResult.buildSelectBoxDetails(response,blockId,locationType);
				}
			}else{
				$("#"+blockId).html('No Data Available');
			}
		});
	}
	
	return {
        trainingDetails : trainingDetails,	
	}
}());

trainingComponent.buildAjaxCallResult = (function(){
	function buildCategorySelectBox(response,blockId){
		var selectBox='';
		selectBox+='<option value="0">All</option>';
		for(var i in response) {
			selectBox+='<option value="'+response[i].categoryId+'">'+response[i].categoryName+'</option>';
		}
		$("#"+blockId).html(selectBox);
		$("#"+blockId).trigger("chosen:updated");
	}
	
	function buildOverAlltraining(response,divId,blockId){
	
		var responseArr=[{'image':'inviteeAttended','color':'#109800','name':'Invitee Attended','count':response.inviteeAttendedCount,'perc':response.inviteeattendedPerc,'textColor':'color_green'},
						{'image':'yetToTrain','color':'#FF2020','name':'Yet To Train','count':response.yetTrained,'perc':response.nonInviteePerc,'textColor':'color_red'}];
		var modalBlock='';
		modalBlock+='<div class="borderFilterCls">';
			modalBlock+='<h6 class="font_weight m_bottom_0 text-capital">'+response.name+' - OVERVIEW</h6>';
			modalBlock+='<div class="row m_top10">';
				modalBlock+='<div class="col-sm-4">';
					modalBlock+='<div class="bg_white_padding box_shadow" style="border:1px solid #1086FC;">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<div class="media">';
									modalBlock+='<img src="Core/images/totalMembers.png" class="mb-1" alt="Total Members">';
									modalBlock+='<div class="media-body">';
										modalBlock+='<h5 class="text-capital font_15 mt-3">Total Members</h5>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<h5 class="font_weight text-center mt-2"> '+emptyCheck(response.totalcount)+' </h5>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			for(var i in responseArr) {
				modalBlock+='<div class="col-sm-4">';
					modalBlock+='<div class="bg_white_padding box_shadow" style="border:1px solid '+responseArr[i].color+';">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<div class="media">';
									modalBlock+='<img src="Core/images/'+responseArr[i].image+'.png" class="mb-1" alt="Total Members">';
									modalBlock+='<div class="media-body">';
										modalBlock+='<h5 class="text-capital font_15 mt-3">'+responseArr[i].name+'</h5>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<h5 class="font_weight text-center mt-2 mb-0"> '+emptyCheck(responseArr[i].count)+' </h5>';
								modalBlock+='<h6 class="font_weight text-center '+responseArr[i].textColor+' font_14 mb-0"> '+emptyCheck(responseArr[i].perc)+' %</h6>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			}
			modalBlock+='</div>';
			modalBlock+='<div class="row mt-3">';
				modalBlock+='<div class="col-sm-4">';
					modalBlock+='<div class="bg_white_padding box_shadow" style="border:1px solid #1086FC;">';
						modalBlock+='<h5 class="text-capital mt-2"><span class="font_15">Trained</span> <span class="float-right font_weight">'+emptyCheck(response.trainedCount)+'</span></h5>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="col-sm-4">';
					modalBlock+='<div class="bg_white_padding box_shadow" style="border:1px solid #109800;">';
						modalBlock+='<h5 class="text-capital mt-2"><span class="font_15">Non Invitee Attended</span> <span class="float-right font_weight">'+emptyCheck(response.nonInviteeAttended)+'</span></h5>';
					modalBlock+='</div>';
				modalBlock+='</div>';
				modalBlock+='<div class="col-sm-4">';
					modalBlock+='<div class="bg_white_padding box_shadow" style="border:1px solid #E9B81F;">';
						modalBlock+='<h5 class="text-capital mt-2"><span class="font_15">Total Training Centers</span> <span class="float-right font_weight">'+emptyCheck(response.total)+'</span></h5>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
		$("#programId").html('<option value="0">'+response.name+'</option>');
		$("#programId").trigger("chosen:updated");
	}
	
	function buildVarianceDetails(response,divId,blockId) {
		var modalBlock='';
		modalBlock+='<div class="row">';
			modalBlock+='<div class="col-sm-12 pad_left_right5">';
				modalBlock+='<div class="mainBlockUl mt-3">';
					modalBlock+='<ul class="list-inline blocksLi varianceListStl">';
					for(var i in response.subList1)	{
						modalBlock+='<li class="box_shadow">';
							modalBlock+='<div class="card">';
								modalBlock+='<div class="card-header">';
									modalBlock+='<h5 class="mb-0"><span class="text-capital font_15"> '+response.subList1[i].name+'</span> <span class="font_weight float-right">'+emptyCheck(response.subList1[i].count)+'</span></h5>';
								modalBlock+='</div>';
								modalBlock+='<div class="card-body p-2">';
									modalBlock+='<div class="row">';
										modalBlock+='<div class="col-sm-6">';
											modalBlock+='<h6 class="mt-2 mb-0 font_14">Invitee Attended</h6>';
											modalBlock+='<h5 class="mt-1 mb-0">'+emptyCheck(response.subList1[i].inviteeAttendedCount)+'</h5>';
										modalBlock+='</div>';
										modalBlock+='<div class="col-sm-6">';
											modalBlock+='<h6 class="mt-2 mb-0 font_14">Non-Invitee Attended</h6>';
											modalBlock+='<h5 class="mt-1 mb-0">'+emptyCheck(response.subList1[i].nonInviteeAttenedCount)+'</h5>';
										modalBlock+='</div>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
					}
					for(var i in response.subList2)	{
						modalBlock+='<li class="box_shadow">';
						if(response.subList2[i].name == "1 Day Attended"){
							modalBlock+='<div class="card" style="background-color:#F9EABA;">';
								modalBlock+='<div class="card-header" style="background-color:#FBF2D5;">';
						} else {
							modalBlock+='<div class="card" style="background-color:#B4EAB0;">';
								modalBlock+='<div class="card-header" style="background-color:#D2F2CF;">';
						}
									modalBlock+='<h5 class="mb-0"><span class="text-capital font_15"> '+response.subList2[i].name+'</span> <span class="font_weight float-right">'+emptyCheck(response.subList2[i].count)+'</span></h5>';
								modalBlock+='</div>';
								modalBlock+='<div class="card-body p-2">';
									modalBlock+='<div class="row">';
										modalBlock+='<div class="col-sm-6">';
											modalBlock+='<h6 class="mt-2 mb-0 font_14">Invitee Attended</h6>';
											modalBlock+='<h5 class="mt-1 mb-0">'+emptyCheck(response.subList2[i].inviteeAttendedCount)+'</h5>';
										modalBlock+='</div>';
										modalBlock+='<div class="col-sm-6">';
											modalBlock+='<h6 class="mt-2 mb-0 font_14">Non-Invitee Attended</h6>';
											modalBlock+='<h5 class="mt-1 mb-0">'+emptyCheck(response.subList2[i].nonInviteeAttenedCount)+'</h5>';
										modalBlock+='</div>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='</div>';
						modalBlock+='</li>';
					}
					modalBlock+='</ul>';	
				modalBlock+='</div>';	
			modalBlock+='</div>';	
		modalBlock+='</div>';	
		$("#"+blockId).html(modalBlock);
	}
	
	function buildDayWiseDetails(response,divId,blockId) {
		var modalBlock='';
		modalBlock+='<div class="card mt-3" style="background-color:#F6F7FB;">';
			modalBlock+='<div class="card-header" style="background-color:#F6F7FB;">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-9">';
						modalBlock+='<h6 class="font_weight m_bottom_0 m_top10">VARIANCE</h6>';
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-3">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<h6 class="font_11 mt-2">Attendance:</h6>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<select class="form-control chosen_select">';
									modalBlock+='<option value="0" selected>Invitee Attended</option>';
								modalBlock+='</select>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body">';
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
				if($(window.width)>800){
					modalBlock+='<div class="table-responsive">';
				}
					modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="varianceDataTableId">';
						modalBlock+='<thead>';
							modalBlock+='<tr>';
								modalBlock+='<th rowspan="2"></th>';
								modalBlock+='<th colspan="2">Total Trained</th>';
								for(var i in response[0].subList1){
									modalBlock+='<th colspan="2">'+response[0].subList1[i].name+'</th>';
								}
								for(var i in response[0].subList2){
									modalBlock+='<th colspan="2">'+response[0].subList2[i].name+'</th>';
								}
							modalBlock+='</tr>';
							modalBlock+='<tr>';
								modalBlock+='<th>PRESENT</th>';
								modalBlock+='<th>PAST</th>';
								for(var i in response[0].subList1){
									modalBlock+='<th>PRESENT</th>';
									modalBlock+='<th>PAST</th>';
								}
								for(var i in response[0].subList2){
									modalBlock+='<th>PRESENT</th>';
									modalBlock+='<th>PAST</th>';
								}
							modalBlock+='</tr>';
						modalBlock+='</thead>';
						modalBlock+='<tbody>';
						for(var i in response) {
							modalBlock+='<tr>';
								modalBlock+='<td>'+response[i].name+'</td>';
								if(response[i].status == "LOW"){
									if(response[i].presentCount != 0 && response[i].presentCount>0){
										modalBlock+='<td><span class="number_css badge" style="background-color:#fd0000 !important;color:#fff;">'+response[i].presentCount+'</span></td>';
									}else {
										modalBlock+='<td>-</td>';
									}
								} else if(response[i].status == "HIGH"){
									if(response[i].presentCount != 0 && response[i].presentCount>0){
										modalBlock+='<td><span class="number_css badge" style="background-color:#66e672 !important;color:#fff;">'+response[i].presentCount+'</span></td>';
									}else {
										modalBlock+='<td>-</td>';
									}
								} else {
									if(response[i].presentCount != 0 && response[i].presentCount>0){
										modalBlock+='<td><span class="number_css badge" style="background-color:#EFCD21 !important;color:#fff;">'+response[i].presentCount+'</span></td>';
									}else {
										modalBlock+='<td>-</td>';
									}
								}
								if(response[i].pastCount != 0 && response[i].pastCount>0){
									modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].pastCount+'</span></td>';
								}else {
									modalBlock+='<td>-</td>';
								}
								for(var j in response[i].subList1){
									if(response[i].subList1[j].status == "LOW"){
										if(response[i].subList1[j].presentCount != 0 && response[i].subList1[j].presentCount>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#fd0000 !important;color:#fff;">'+response[i].subList1[j].presentCount+'</span></td>';
										}else {
											modalBlock+='<td>-</td>';
										}
									} else if(response[i].subList1[j].status == "HIGH"){
										if(response[i].subList1[j].presentCount != 0 && response[i].subList1[j].presentCount>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#66e672 !important;color:#fff;">'+response[i].subList1[j].presentCount+'</span></td>';
										}else {
											modalBlock+='<td>-</td>';
										}
									} else {
										if(response[i].subList1[j].presentCount != 0 && response[i].subList1[j].presentCount>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#EFCD21 !important;color:#fff;">'+response[i].subList1[j].presentCount+'</span></td>';
										}else {
											modalBlock+='<td>-</td>';
										}
									}
									if(response[i].subList1[j].pastCount != 0 && response[i].subList1[j].pastCount>0){
										modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].subList1[j].pastCount+'</span></td>';
									}else {
										modalBlock+='<td>-</td>';
									}
								}
								for(var j in response[i].subList2){
									if(response[i].subList2[j].status == "LOW"){
										if(response[i].subList2[j].presentCount != 0 && response[i].subList2[j].presentCount>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#fd0000 !important;color:#fff;">'+response[i].subList2[j].presentCount+'</span></td>';
										}else {
											modalBlock+='<td>-</td>';
										}
									} else if(response[i].subList2[j].status == "HIGH"){
										if(response[i].subList2[j].presentCount != 0 && response[i].subList2[j].presentCount>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#66e672 !important;color:#fff;">'+response[i].subList2[j].presentCount+'</span></td>';
										}else {
											modalBlock+='<td>-</td>';
										}
									} else {
										if(response[i].subList2[j].presentCount != 0 && response[i].subList2[j].presentCount>0){
											modalBlock+='<td><span class="number_css badge" style="background-color:#EFCD21 !important;color:#fff;">'+response[i].subList2[j].presentCount+'</span></td>';
										}else {
											modalBlock+='<td>-</td>';
										}
									}
									if(response[i].subList2[j].pastCount != 0 && response[i].subList2[j].pastCount>0){
										modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].subList2[j].pastCount+'</span></td>';
									}else {
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
		$("#"+blockId).html(modalBlock);
		initializeDataTableWithOutPagination("varianceDataTableId");
		$("#varianceDataTableId").tableHeadFixer({"head" : false, "left" : 1});
		$(".chosen_select").chosen();
	}
	
	function buildCategeoryWiseDetails(response,divId,blockId){
		var modalBlock='';
		modalBlock+='<div class="card mt-3" style="background-color:#F6F7FB;">';
			modalBlock+='<div class="card-header" style="background-color:#F6F7FB;">';
				modalBlock+='<h6 class="font_weight m_bottom_0 m_top10">CATEGORY WISE</h6>';
			modalBlock+='</div>';
			modalBlock+='<div class="card-body">';
				modalBlock+='<ul class="list-inline trainingSlickSlider mb-0">';
				for(var i in response){
					modalBlock+='<li style="margin:2px 4px;">';
						modalBlock+='<div class="card">';
							modalBlock+='<div class="card-header pad_10">';
								modalBlock+='<h5 class="font_weight mb-0" style="color:#46BDA4;">'+response[i].name+'</h5>';
							modalBlock+='</div>';
							modalBlock+='<div class="card-body p-2">';
								modalBlock+='<h6 class="mt-3 mb-0 font_14"><span class="font_weight">Trained Members</span> <span class="float-right">'+response[i].count+' </br><span class="color_green font_11">'+response[i].percentage+'%</span></span></h6>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</li>';
				}
				modalBlock+='</ul>';	
			modalBlock+='</div>';
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
		$('.trainingSlickSlider').slick({
			slide: 'li',
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			//autoplaySpeed: 2000,
			variableWidth:false,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
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
			]
		});
	}
	
	function buildCenterWiseDetails(response,blockId,blockValue,blockType){
		var modalBlock='';
		if(globalChar == "details") {
			$("#centerHeadId").html(globalChar);
		}else {
			$("#centerHeadId").html(globalChar+" Report");
		}
		
		modalBlock+='<div class="table-responsive m_top10">';
		if(blockType == "details") {
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="centerWiseDetailsDataTableId">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="3">CENTER NAMES</th>';
						modalBlock+='<th colspan="3" style="background-color:#F1F2EC;">BATCHES CURRENT STATUS</th>';
						modalBlock+='<th colspan="5" style="background-color:#E9F2EE;">ATTENDED DETAILS</th>';
						modalBlock+='<th rowspan="3">Day 1 Attended</th>';
						if(blockValue != 14){
							modalBlock+='<th rowspan="3">Day 2 Attended</th>';
						}
						modalBlock+='<th rowspan="3">1 Day Attended</th>';
						if(blockValue != 14){
							modalBlock+='<th rowspan="3">2 Day Attended</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="2" style="background-color:#F1F2EC;">TOTAL</th>';
						modalBlock+='<th rowspan="2" style="background-color:#F1F2EC;">RUNNING</th>';
						modalBlock+='<th rowspan="2" style="background-color:#F1F2EC;">COMPLETED</th>';
						modalBlock+='<th rowspan="2" style="background-color:#E9F2EE;">TOTAL ATTENDED</th>';
						modalBlock+='<th colspan="2" style="background-color:#E9F2EE;">INVITEE ATTENDED</th>';
						modalBlock+='<th colspan="2" style="background-color:#E9F2EE;">NON INVITEE ATTENDED</th>';
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						modalBlock+='<th style="background-color:#E9F2EE;">COUNT</th>';
						modalBlock+='<th style="background-color:#E9F2EE;">%</th>';
						modalBlock+='<th style="background-color:#E9F2EE;">COUNT</th>';
						modalBlock+='<th style="background-color:#E9F2EE;">%</th>';
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in response) {
					modalBlock+='<tr>';
						modalBlock+='<td>'+response[i].name+'</td>';
						modalBlock+='<td style="background-color:#FFFFF6;">'+emptyCheck(response[i].total)+'</td>';
						modalBlock+='<td style="background-color:#FFFFF6;">'+emptyCheck(response[i].runningBatchCount)+'</td>';
						modalBlock+='<td style="background-color:#FFFFF6;">'+emptyCheck(response[i].completedBatchCount)+'</td>';
						modalBlock+='<td style="background-color:#F6FFF8;">'+emptyCheck(response[i].attended)+'</td>';
						modalBlock+='<td style="background-color:#F6FFF8;">'+emptyCheck(response[i].inviteeAttendedCount)+'</td>';
						modalBlock+='<td class="color_green" style="background-color:#F6FFF8;">'+emptyCheck(response[i].attPer)+'</td>';
						modalBlock+='<td style="background-color:#F6FFF8;">'+emptyCheck(response[i].nonInvitee)+'</td>';
						modalBlock+='<td class="color_green" style="background-color:#F6FFF8;">'+emptyCheck(response[i].yetPer)+'</td>';
						modalBlock+='<td>'+emptyCheck(response[i].day1Count)+'</td>';
						if(blockValue != 14){
							modalBlock+='<td>'+emptyCheck(response[i].day2Count)+'</td>';
						}
						modalBlock+='<td>'+emptyCheck(response[i].firstDayCount)+'</td>';
						if(blockValue != 14){
							modalBlock+='<td>'+emptyCheck(response[i].seconddayCount)+'</td>';
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		} else if(blockType == "variance"){
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="centerWiseDetailsDataTableId">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="3">CENTER NAMES</th>';
						for(var i in response[0].subList){
							modalBlock+='<th colspan="2">'+response[0].subList[i].name+'</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response[0].subList){
							modalBlock+='<th colspan="2">TOTAL TRAINED</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
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
						for(var j in response[i].subList) {
							if(response[i].subList[j].inviteeAttendedCount != null && response[i].subList[j].inviteeAttendedCount >0){	
								modalBlock+='<td><span class="number_css badge '+colorIndexObj[response[i].subList[j].colorIndex]+'">'+response[i].subList[j].inviteeAttendedCount+'</span></td>';
							}else {
								modalBlock+='<td>-</td>';
							}
							if(response[i].subList[j].pastInviteeAtendedCount != null && response[i].subList[j].pastInviteeAtendedCount >0){
								modalBlock+='<td><span class="number_css badge" style="background-color:#EFF1F3 !important;color:#333;">'+response[i].subList[j].pastInviteeAtendedCount+'</span></td>';
							}else {
								modalBlock+='<td>-</td>';
							}
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';		
		}
		modalBlock+='</div>';
		modalBlock+='<div class="table-responsive m_top10">';
		if(blockType == "detailsCategory") {
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="centerWiseDetailsDataTableId">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="2">CENTER NAMES</th>';
						modalBlock+='<th colspan="3" style="background-color:#F1F2EC;">BATCHES CURRENT STATUS</th>';
						for(var i in response[0].subList1){
							if(blockValue != 14){
								modalBlock+='<th class="colspanCls" colspan="1" attr_blockValue='+blockValue+'"">'+response[0].subList1[i].name+'</th>';
							}else{
								modalBlock+='<th class="colspanCls"colspan="1" attr_blockValue='+blockValue+'"">'+response[0].subList1[i].name+'</th>';
							}
						}
					modalBlock+='</tr>';	
					modalBlock+='<tr>';	
						modalBlock+='<th style="background-color:#F1F2EC;">TOTAL</th>';
						modalBlock+='<th style="background-color:#F1F2EC;">RUNNING</th>';
						modalBlock+='<th style="background-color:#F1F2EC;">COMPLETED</th>';
						for(var i in response[0].subList1){
							modalBlock+='<th style="background-color:#E9F2EE;">INVITEE ATTENDED</th>';
							modalBlock+='<th class="dayWiseCls">Day 1 Attended</th>';
							if(blockValue != 14){
								modalBlock+='<th class="dayWiseCls">Day 2 Attended</th>';
								modalBlock+='<th class="dayWiseCls">1 Day Attended</th>';
								modalBlock+='<th class="dayWiseCls">2 Day Attended</th>';
							}
						}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in response) {
					modalBlock+='<tr>';
						modalBlock+='<td>'+response[i].name+'</td>';
						modalBlock+='<td style="background-color:#FFFFF6;">'+emptyCheck(response[i].total)+'</td>';
						modalBlock+='<td style="background-color:#FFFFF6;">'+emptyCheck(response[i].runningBatchCount)+'</td>';
						modalBlock+='<td style="background-color:#FFFFF6;">'+emptyCheck(response[i].completedBatchCount)+'</td>';
						for(var j in response[i].subList1){
							modalBlock+='<td style="background-color:#F6FFF8;">'+emptyCheck(response[i].subList1[j].attended)+'</td>';
							modalBlock+='<td class="dayWiseCls">'+emptyCheck(response[i].subList1[j].day1Count)+'</td>';
							if(blockValue != 14){
								modalBlock+='<td class="dayWiseCls">'+emptyCheck(response[i].subList1[j].day2Count)+'</td>';
								modalBlock+='<td class="dayWiseCls">'+emptyCheck(response[i].subList1[j].firstDayCount)+'</td>';
								modalBlock+='<td class="dayWiseCls">'+emptyCheck(response[i].subList1[j].seconddayCount)+'</td>';
							}
						}
						
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		} else if(blockType == "varianceCategory"){
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="centerWiseDetailsDataTableId">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="4">CENTER NAMES</th>';
						var cols = parseInt(response[0].subList1[0].subList.length) *2;
						for(var i in response[0].subList1){
							modalBlock+='<th colspan="'+cols+'">'+response[0].subList1[i].name+'</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response[0].subList1){
							for(var j in response[0].subList1[0].subList){
								modalBlock+='<th colspan="2">'+response[0].subList1[0].subList[j].name+'</th>';
							}
						}												
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response[0].subList1){
							for(var j in response[0].subList1[0].subList){
								modalBlock+='<th colspan="2">TOTAL TRAINED</th>';
							}
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response[0].subList1){
							for(var j in response[0].subList1[0].subList){
								modalBlock+='<th>PRESENT</th>';
								modalBlock+='<th>PAST</th>';
							}
						}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in response) {
					modalBlock+='<tr>';
						modalBlock+='<td>'+response[i].name+'</td>';
						for(var j in response[i].subList1) {
							for(var k in response[i].subList1[j].subList){
								if(response[i].subList1[j].subList[k].inviteeAttendedCount != null && response[i].subList1[j].subList[k].inviteeAttendedCount > 0){
									modalBlock+='<td><span class="number_css badge '+colorIndexObj[response[i].subList1[j].subList[k].colorIndex]+'">'+response[i].subList1[j].subList[k].inviteeAttendedCount+'</span></td>';
								}else{
									modalBlock+='<td>-</td>';
								}									
								if(response[i].subList1[j].subList[k].pastInviteeAtendedCount != null && response[i].subList1[j].subList[k].pastInviteeAtendedCount > 0){
									modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash">'+response[i].subList1[j].subList[k].pastInviteeAtendedCount+'</h6></td>';
								}else{
									modalBlock+='<td>-</td>';
								}
							}							
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';		
		}
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
		initializeDataTableWithPagination("centerWiseDetailsDataTableId");
		$("#centerWiseDetailsDataTableId").tableHeadFixer({"head" : false, "left" : 1});
	}
	
	function buildSelectBoxDetails(response,blockId,locationType){
		var modalBlock='';
		if(blockId == locationType+"levelWiseOverviewIdConstituency"){
			modalBlock+='<option value="0" selected>Select Constituency</option>';
		}else if(blockId == locationType+"levelWiseOverviewIdMandal"){
			modalBlock+='<option value="0" selected>Select Mandal</option>';
		}else{
			modalBlock+='<option value="0" selected>All</option>';
		}
		for(var i in response) {
			if(blockId == locationType+"levelWiseOverviewIdDistrict"){
				modalBlock+='<option value="'+response[i].districtId+'">'+response[i].district+'</option>';
			}else if(blockId == locationType+"levelWiseOverviewIdConstituency"){
				modalBlock+='<option value="'+response[i].consitencyId+'">'+response[i].consitencyName+'</option>';
			}else{
				modalBlock+='<option value="'+response[i].mandalId+'">'+response[i].mandalName+'</option>';
			}
		}
		$("#"+blockId).html(modalBlock);
		$("#"+blockId).trigger("chosen:updated");
	}
	
	function buildLocationWiseDetails(response,blockId,locationType,blockValue){//pj
		var modalBlock='';
		modalBlock+='<div class="table-responsive">';
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="'+locationType+'DataTableId">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
					if(locationType == "District"){
						modalBlock+='<th rowspan="2">DISTRICT</th>';
					}else if(locationType == "Parliament"){
						modalBlock+='<th rowspan="2">PARLIAMENT</th>';
					}else if(locationType == "Constituency"){
						modalBlock+='<th rowspan="2">DISTRICT</th>';
						modalBlock+='<th rowspan="2">PARLIAMENT</th>';
						modalBlock+='<th rowspan="2">CONSTITUENCY</th>';
					}else if(locationType == "Mandal"){
						modalBlock+='<th rowspan="2">DISTRICT</th>';
						modalBlock+='<th rowspan="2">PARLIAMENT</th>';
						modalBlock+='<th rowspan="2">CONSTITUENCY</th>';
						modalBlock+='<th rowspan="2">MANDAL/MUNCIPLAITY</th>';
					}else if(locationType == "Village"){
						modalBlock+='<th rowspan="2">DISTRICT</th>';
						modalBlock+='<th rowspan="2">PARLIAMENT</th>';
						modalBlock+='<th rowspan="2">CONSTITUENCY</th>';
						modalBlock+='<th rowspan="2">MANDAL/MUNCIPLAITY</th>';
						modalBlock+='<th rowspan="2">VILLAGE</th>';
					}
						modalBlock+='<th rowspan="2">TOTAL MEMBERS</th>';
						modalBlock+='<th colspan="2">TRAINED</th>';
						modalBlock+='<th colspan="2">YET TO TRAIN</th>';
						modalBlock+='<th colspan="2">DAY1 ATTENDED</th>';
						if(blockValue != 14){
							modalBlock+='<th colspan="2">DAY2 ATTENDED</th>';
						}
						modalBlock+='<th colspan="2">1DAYS ATTENDED</th>';
						if(blockValue != 14){
							modalBlock+='<th colspan="2">2DAYS ATTENDED</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						modalBlock+='<th>COUNT</th>';
						modalBlock+='<th>%</th>';
						modalBlock+='<th>COUNT</th>';
						modalBlock+='<th>%</th>';
						modalBlock+='<th>COUNT</th>';
						modalBlock+='<th>%</th>';
						if(blockValue != 14){
							modalBlock+='<th>COUNT</th>';
							modalBlock+='<th>%</th>';
						}
						modalBlock+='<th>COUNT</th>';
						modalBlock+='<th>%</th>';
						if(blockValue != 14){
							modalBlock+='<th>COUNT</th>';
							modalBlock+='<th>%</th>';
						}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in response) {
					modalBlock+='<tr>';
						if(locationType == "District"){
							modalBlock+='<td class="text-capital">'+response[i].name+'</td>';
						}else if(locationType == "Parliament"){
							modalBlock+='<td class="text-capital">'+response[i].name+'</td>';
						}else if(locationType == "Constituency"){
							modalBlock+='<td class="text-capital">'+response[i].addressVO.districtName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].addressVO.parliamentName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].name+'</td>';
						}else if(locationType == "Mandal"){
							modalBlock+='<td class="text-capital">'+response[i].addressVO.districtName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].addressVO.parliamentName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].addressVO.constituencyName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].name+'</td>';
						}else if(locationType == "Village"){
							modalBlock+='<td class="text-capital">'+response[i].addressVO.districtName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].addressVO.parliamentName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].addressVO.constituencyName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].addressVO.tehsilName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].name+'</td>';
						}
						modalBlock+='<td>'+emptyCheck(response[i].total)+'</td>';
						modalBlock+='<td>'+emptyCheck(response[i].inviteeAttendedCount)+'</td>';
						modalBlock+='<td class="color_green">'+emptyCheck(response[i].inviteeattendedPerc)+'</td>';
						modalBlock+='<td>'+emptyCheck(response[i].nonInvitee)+'</td>';
						modalBlock+='<td class="color_green">'+emptyCheck(response[i].nonInviteePerc)+'</td>';
						modalBlock+='<td>'+emptyCheck(response[i].day1Count)+'</td>';
						modalBlock+='<td class="color_green">'+emptyCheck(response[i].day1Perc)+'</td>';
						if(blockValue != 14){
							modalBlock+='<td>'+emptyCheck(response[i].day2Count)+'</td>';
							modalBlock+='<td class="color_green">'+emptyCheck(response[i].day2Perc)+'</td>';
						}
						modalBlock+='<td>'+emptyCheck(response[i].firstDayCount)+'</td>';
						modalBlock+='<td class="color_green">'+emptyCheck(getPercentage(response[i].firstDayCount,response[i].inviteeAttendedCount))+'</td>';
						if(blockValue != 14){
							modalBlock+='<td>'+emptyCheck(response[i].seconddayCount)+'</td>';
							modalBlock+='<td class="color_green">'+emptyCheck(getPercentage(response[i].seconddayCount,response[i].inviteeAttendedCount))+'</td>';
						}
					modalBlock+='</tr>';
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
		if(locationType == "District"){
			initializeDataTableWithOutPagination(locationType+"DataTableId");
		}else {
			initializeDataTableWithPagination(locationType+"DataTableId");
		}
		if(locationType == "District" || locationType == "Parliament"){
			$("#"+locationType+'DataTableId').tableHeadFixer({"left" : 1});
		}else if(locationType == "Constituency") {
			$("#"+locationType+'DataTableId').tableHeadFixer({"left" : 3});
		}else if(locationType == "Mandal") {
			$("#"+locationType+'DataTableId').tableHeadFixer({"left" : 4});
		}else if(locationType == "Village") {
			$("#"+locationType+'DataTableId').tableHeadFixer({"left" : 5});
		}
	}
	function buildLocationWiseCategorySevamitraDetails(response,locationType,blockValue,blockId){
		var modalBlock = '';
		modalBlock+='<div class="table-responsive">';
			modalBlock+='<table class="table table_custom_news_variance trainingCss m_bottom_0" id="'+locationType+'LevelWiseComparisionDataTable">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';						
						if(locationType != "District" && locationType != "Parliament" ){
							modalBlock+='<th rowspan="2">DISTRICT</th>';
							modalBlock+='<th rowspan="2">PARLIAMENT</th>';
						}if(locationType == "Mandal" || locationType == "Village" ){
							modalBlock+='<th rowspan="2">CONSTITUENCY</th>';
						}if(locationType == "Village"){
							modalBlock+='<th rowspan="2">MANDAL</th>';
						}
						modalBlock+='<th rowspan="2">'+locationType+'</th>';
						for(var i in response[0].subList){
							if(blockValue == 14){
								modalBlock+='<th colspan="5" class="colspanlevelWiseCls">'+response[0].subList[i].name+'</th>';
							}else{
								modalBlock+='<th colspan="5" class="colspanlevelWiseCls">'+response[0].subList[i].name+'</th>';
							}
							
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
					for(var i in response[0].subList){
						modalBlock+='<th>TOTAL MEMBERS</th>';
						modalBlock+='<th>TRAINED</th>';
						modalBlock+='<th>%</th>';
						modalBlock+='<th>YET TO TRAIN</th>';
						modalBlock+='<th>%</th>';
						modalBlock+='<th class="dayWiseLevelWiseCls">DAY 1 ATTENDED</th>';
						modalBlock+='<th class="dayWiseLevelWiseCls">%</th>';
						if(blockValue != 14){
							modalBlock+='<th class="dayWiseLevelWiseCls">DAY 2 ATTENDED</th>';
							modalBlock+='<th class="dayWiseLevelWiseCls">%</th>';
							modalBlock+='<th class="dayWiseLevelWiseCls">1 DAYS ATTENDED</th>';
							modalBlock+='<th class="dayWiseLevelWiseCls">%</th>';
							modalBlock+='<th class="dayWiseLevelWiseCls">2 DAYS ATTENDED</th>';
							modalBlock+='<th class="dayWiseLevelWiseCls">%</th>';
						}	
					}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
					for(var i in response){
					modalBlock+='<tr>';
						if(locationType != "District" && locationType != "Parliament" ){
							modalBlock+='<td class="text-capital">'+response[i].addressVO.districtName+'</td>';
							modalBlock+='<td class="text-capital">'+response[i].addressVO.parliamentName+'</td>';
						}if(locationType == "Mandal" || locationType == "Village" ){
							modalBlock+='<td class="text-capital">'+response[i].addressVO.constituencyName+'</td>';
						}if(locationType == "Village"){
							modalBlock+='<td class="text-capital">'+response[i].addressVO.tehsilName+'</td>';
						}
						modalBlock+='<td>'+response[i].name+'</td>';
						for(var j in response[i].subList){
							modalBlock+='<td>'+emptyCheck(response[i].subList[j].total)+'</td>';
							modalBlock+='<td>'+emptyCheck(response[i].subList[j].inviteeAttendedCount)+'</td>';
							modalBlock+='<td class="text-success">'+emptyCheck(response[i].subList[j].inviteeattendedPerc)+'</td>';
							modalBlock+='<td>'+emptyCheck(response[i].subList[j].nonInvitee)+'</td>';
							modalBlock+='<td class="text-success">'+emptyCheck(response[i].subList[j].nonInviteePerc)+'</td>';
							modalBlock+='<td class="dayWiseLevelWiseCls">'+emptyCheck(response[i].subList[j].day1Count)+'</td>';
							modalBlock+='<td class="text-success dayWiseLevelWiseCls">'+emptyCheck(response[i].subList[j].day1Perc)+'</td>';
							if(blockValue != 14){
								modalBlock+='<td class="dayWiseLevelWiseCls">'+emptyCheck(response[i].subList[j].day2Count)+'</td>';
								modalBlock+='<td class="text-success dayWiseLevelWiseCls">'+emptyCheck(response[i].subList[j].day2Perc)+'</td>';
								modalBlock+='<td class="dayWiseLevelWiseCls">'+emptyCheck(response[i].subList[j].firstDayCount)+'</td>';
								modalBlock+='<td class="text-success dayWiseLevelWiseCls">'+emptyCheck(response[i].subList[j].attPer)+'</td>';
								modalBlock+='<td class="dayWiseLevelWiseCls">'+emptyCheck(response[i].subList[j].seconddayCount)+'</td>';
								modalBlock+='<td class="text-success dayWiseLevelWiseCls">'+emptyCheck(response[i].subList[j].yetPer)+'</td>';
							}
						}
					modalBlock+='</tr>';
					}					
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		modalBlock+='</div>';
		$("#"+blockId).html(modalBlock);
		initializeDataTableWithPagination(locationType+"LevelWiseComparisionDataTable");
		var fixedCols = 1;
		if(locationType  == "Constituency"){
			fixedCols = 2;
		}else if(locationType  == "Mandal"){
			fixedCols = 3;
		}else if(locationType  == "Village"){
			fixedCols = 4;
		}else{
			fixedCols = 1;
		}
		$('#'+locationType+'LevelWiseComparisionDataTable').tableHeadFixer({"head" : false, "left" : 1});
	}
	
	return {
        buildOverAlltraining 	   : buildOverAlltraining,
        buildVarianceDetails	   : buildVarianceDetails,
        buildDayWiseDetails  	   : buildDayWiseDetails,
        buildCenterWiseDetails     : buildCenterWiseDetails,
        buildLocationWiseDetails   : buildLocationWiseDetails,
        buildCategeoryWiseDetails  : buildCategeoryWiseDetails,
        buildSelectBoxDetails  	   : buildSelectBoxDetails,
		buildLocationWiseCategorySevamitraDetails : buildLocationWiseCategorySevamitraDetails,
		buildCategorySelectBox	   : buildCategorySelectBox	
	}
}());

$(document).on("click",".centerWiseVarianceCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var blockType = $(this).attr("attr_type");
	var blockName = $(this).attr("attr_block_type");
	var blockValue = $(this).attr("attr_block_value");
	var clickType = $(".centerWiseCharcterCls li.active").attr("attr_type");
	
	$(".dayWiseView").hide();
	globalChar = blockType;
	if(blockType == "details") {
		if(clickType == "details"){
			trainingComponent.ajax.trainingDetails("getCenterWiseOverView",blockName,"",blockValue,"details");
		}else {
			$(".dayWiseView").show();
			trainingComponent.ajax.trainingDetails("getCenterWiseCategoryOverView",blockName,"",blockValue,blockType+"Category");
		}
	} else {
		if(clickType == "details"){
			trainingComponent.ajax.trainingDetails("getCenterWiseOverallVariance",blockName,"",blockValue,"variance");
		}else {
			trainingComponent.ajax.trainingDetails("getCenterWiseCategoryOverallVariance",blockName,"",blockValue,blockType+"Category");
		}	
	}
});

$(document).on("click",".centerWiseCharcterCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var blockType = $(this).attr("attr_type");
	var blockName = $(this).attr("attr_block_type");
	var blockValue = $(this).attr("attr_block_value");
	
	$(".dayWiseView").hide();
	if(blockType == "details") {
		if(globalChar == "details"){
			trainingComponent.ajax.trainingDetails("getCenterWiseOverView",blockName,"",blockValue,"details");
		}else {
			trainingComponent.ajax.trainingDetails("getCenterWiseOverallVariance",blockName,"",blockValue,"variance");
		}
	} else {
		if(globalChar+"Category" == "detailsCategory"){
			if($(".dayWiseCheck").is(":checked")){
				$(".dayWiseCheck").attr("checked",false);
			}
			$(".dayWiseView").show();
			trainingComponent.ajax.trainingDetails("getCenterWiseCategoryOverView",blockName,"",blockValue,globalChar+"Category");
		}else{
			trainingComponent.ajax.trainingDetails("getCenterWiseCategoryOverallVariance",blockName,"",blockValue,globalChar+"Category");
		}
	}
});

$(document).on("click",".locationWiseVarianceCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	var blockValue = $(this).attr("attr_blockvalue");
	$(".btnClkCls").attr("attr_type",type);
	if(type == "comparision"){
		if($(".dayWiseLevelWiseCheck").is(":checked")){
			$(".dayWiseLevelWiseCheck").attr("checked",false);
		}
		$(".dayWiseLevelWiseOverview").show();
		for(var i in levelWiseTrainingArr){
			if(levelWiseTrainingArr[i].name == "Mandal" || levelWiseTrainingArr[i].name == "Village"){//  MandallevelWiseOverviewIdDistrict
				trainingComponent.ajax.trainingDetails('getAllDistrictIdAndNameAction',levelWiseTrainingArr[i].name+"levelWiseOverviewIdDistrict","","","",levelWiseTrainingArr[i].name)
			}
				trainingComponent.ajax.trainingDetails('getLocationWiseCategorySevamitraDetails','Training'+levelWiseTrainingArr[i].name+'WiseDetailsId',"",blockValue,"",levelWiseTrainingArr[i].name,levelWiseTrainingArr[i].id,"","",levelWiseTrainingArr[i].id,[],type);
		}
		
	}else if(type == "details"){
		$(".dayWiseLevelWiseOverview").hide();
		for(var i in levelWiseTrainingArr){
			if(levelWiseTrainingArr[i].name == "Mandal" || levelWiseTrainingArr[i].name == "Village"){//  MandallevelWiseOverviewIdDistrict
				trainingComponent.ajax.trainingDetails('getAllDistrictIdAndNameAction',levelWiseTrainingArr[i].name+"levelWiseOverviewIdDistrict","","","",levelWiseTrainingArr[i].name)
			}
			trainingComponent.ajax.trainingDetails('getLocationWiseSevamitraDetails','Training'+levelWiseTrainingArr[i].name+'WiseDetailsId',"",blockValue,"",levelWiseTrainingArr[i].name,levelWiseTrainingArr[i].id,"","",levelWiseTrainingArr[i].id,[],type);
		}
		
	}
});

$(document).on("change",".distClkCls",function(){
	var distId = $(this).val();
	var selectDivId = $(this).attr("attr_divId");
	var locationType = $(this).attr("attr_locType");
	trainingComponent.ajax.trainingDetails('getAllConstituencyIdAndNameBasedOnDistIdAction',selectDivId,"","","",locationType,"",distId);	
});

$(document).on("change",".constClkCls",function(){
	var constId = $(this).val();
	var selectDivId = $(this).attr("attr_divId");
	var locationType = $(this).attr("attr_locType");
	trainingComponent.ajax.trainingDetails('getAllMandalListBasedOnConstIdAction',selectDivId,"","","",locationType,"","",constId);
});

$(document).on("change","#categorySelectBoxId",function(){
	var catId = $(this).val();
	var blockValue = $(this).attr("attr_block_value");
	var categoryIdArr = [];
	if(catId>0){
		categoryIdArr.push(catId);
	}
	trainingComponent.ajax.trainingDetails("getSevamitraTrainingTotalMembersDetails","trainingDetailsIdtrainingsId","trainingsId",blockValue,"","","","","","","","",catId);
	trainingComponent.ajax.trainingDetails("getSevamitraAttendedOverviewDetails","varianceDetailsIdtrainingsId","trainingsId",blockValue,"","","","","","","","",categoryIdArr);
	trainingComponent.ajax.trainingDetails("getSevamitraVarianceReportPerformance","dayWiseDetailsIdtrainingsId","trainingsId",blockValue,"","","","","","","","",categoryIdArr);
});

$(document).on("click",".btnClkCls",function(){
	var typeVal=$(this).attr("attr_location_type");
	var blockValue=$(this).attr("attr_block_value");
	var type=$(this).attr("attr_type");
	var blockNo='';
	var distId = $("#"+typeVal+"levelWiseOverviewIdDistrict").val();
	var constId = $("#"+typeVal+"levelWiseOverviewIdConstituency option:selected").val();
	var locationValuesArr=[];		
		
	if(typeVal == "Mandal"){
		if(distId !=null && distId != 0){
			locationScopeId = 5;
			locationValuesArr.push(constId);
		}else{				
			locationScopeId = 0;
			locationValuesArr = [];
		}			
		blockNo = 6;
	}else if(typeVal == "Village"){			
		var mandalId = $("#VillagelevelWiseOverviewIdMandal option:selected").val();
		if(distId != null && distId != 0 && constId != null && constId !=0){
			locationScopeId=6;
			if(constId != 0){
				locationValuesArr.push(mandalId);
			}else{
				locationValuesArr = [];
			}
		}else if(distId != null && distId != 0 && constId != null && constId ==0){
			locationScopeId=5;
			locationValuesArr = [];
		}			
		blockNo = 8;
	}
	if(type == "details"){
		trainingComponent.ajax.trainingDetails('getLocationWiseSevamitraDetails','Training'+typeVal+'WiseDetailsId',"",blockValue,"",typeVal,blockNo,"","",locationScopeId,locationValuesArr,type);
	}else if(type == "comparision"){
		trainingComponent.ajax.trainingDetails('getLocationWiseCategorySevamitraDetails','Training'+typeVal+'WiseDetailsId',"",blockValue,"",typeVal,blockNo,"","",locationScopeId,locationValuesArr,type);		
	}
		
		
});

$(document).on("click",".dayWiseCheck",function(){
	var isChecked = $(".dayWiseCheck").is(":checked");
	if(isChecked){		
		var blockValue = $ (".colspanCls").attr("attr_blockValue");
		if(blockValue == 14){
			$(".colspanCls").attr("colspan","2");
		}else{
			$(".colspanCls").attr("colspan","5");
		}			
		$(".dayWiseCls").show();
		
	}else{
		$(".colspanCls").attr("colspan","1");	
		$(".dayWiseCls").hide();
	}
})

$(document).on("click",".dayWiseLevelWiseCheck",function(){
	var isChecked = $(".dayWiseLevelWiseCheck").is(":checked");
	if(isChecked){		
		var blockValue = $ (".colspanlevelWiseCls").attr("attr_blockValue");
		if(blockValue == 14){
			$(".colspanlevelWiseCls").attr("colspan","7");
		}else{
			$(".colspanlevelWiseCls").attr("colspan","13");
		}			
		$(".dayWiseLevelWiseCls").show();
		
	}else{
		$(".colspanlevelWiseCls").attr("colspan","5");
		$(".dayWiseLevelWiseCls").hide();
	}
})

function getPercentage(subCount,totalCnt) {
  var percentage = (subCount*100)/totalCnt;
   if (percentage != null && percentage > 0) {
     return percentage.toFixed(2);
   }
}