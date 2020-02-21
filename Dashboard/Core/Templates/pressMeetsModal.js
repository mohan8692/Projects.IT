var debatesAndPressMeetComponent = debatesAndPressMeetComponent || {};
var componentTypeIds=[],
	globalState ="ap",
	leaderType = "top",
	editionType = 0,
	statusArr = [{"name": "HISTORICAL HIGH","className": "badge_blue"},
				{"name": "HISTORICAL LOW","className": "badge_pink"},
				{"name": "HIGH","className": "badge_green"},
				{"name": "LOW","className": "badge_red"},
				{"name": "SAME","className": "badge_yellow"}],
	colorIndexObj = {0: "badge_blue",1: "badge_pink",2: "badge_green",3: "badge_red",4: "badge_yellow"},
	designationArr = [{name:"MP",id:"1"},{name:"MLA",id:"2"},{name:"STATE MINISTER",id:"6"},{name:"EX-MLA",id:"8"},{name:"MLC",id:"12"},
					{name:"MP (RAJYA SABHA)",id:"16"},{name:"State Official Spokes Person",id:"39"},{name:"AP LEGISLATIVE COUNCIL -WHIP",id:"47"},
					{name:"Others",id:"0"}];
					
function basicPressMeetsAndDebatesDetails(blockValue,divId,chosenLabel){
	var modalBlock='';
	leaderType = "top";
	modalBlock+='<div id="partyWiseTotalDebateDetailsDivId'+divId+'"></div>';
	
	//SCALE BASED PERFORMANCE COHORT
			modalBlock+='<div class="card m_top20">';
				modalBlock+='<div class="card-header card_bg" style="padding: 5px;">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-4">';
						modalBlock+='<h6 class="font_weight m_bottom_0" style="margin-top: 15px;font-size: 14px;margin-left: 10px;">SCALE BASED PERFORMANCE COHORT</h6>';
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-8">';
						modalBlock+='<ul class="list-inline basic_list_type m_bottom_0 float-right" style="position: relative;top: 8px;">';
							for(var i in statusArr){
								modalBlock+='<li>';
									modalBlock+='<p><span class="debates_border '+statusArr[i].className+'"></span> '+statusArr[i].name+' </p>';
								modalBlock+='</li>';							
							}
						modalBlock+='</ul>';
					modalBlock+='</div>';
				 modalBlock+='</div>';
				
			modalBlock+='</div>';
			   modalBlock+='<div class="card-body pad_5 color_bg_white">';
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col">';
							modalBlock+='<div id="scaleBasedPerformanceCohortDivId'+divId+'"></div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
			   modalBlock+='</div>';
			modalBlock+='</div>'; 
		
		//CANDIDATE OVERALL PERFORMANCE COHORT
			
				modalBlock+='<div class="card m_top20">';
					modalBlock+='<div class="card-header card_bg" style="padding:5px;">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<h6 class="font_weight m_bottom_0" style="margin-top: 8px;font-size: 14px;margin-left: 10px;">CANDIDATE OVERALL PERFORMANCE COHORT - <small id="candidateOvrAllPerParty'+divId+'">TDP</small></h6>';
							modalBlock+='</div>';													
							modalBlock+='<div class="col-sm-6">';
								modalBlock+='<ul class="list-inline basic_list_type m_bottom_0 float-right" style="position: relative;top: 8px;">';
									for(var i in statusArr){
										modalBlock+='<li>';
											modalBlock+='<p><span class="debates_border '+statusArr[i].className+'"></span> '+statusArr[i].name+'</p>';
										modalBlock+='</li>';							
									}
								modalBlock+='</ul>';
								
							modalBlock+='</div>';
						modalBlock+='</div>';
						modalBlock+='</div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				    modalBlock+='<div class="card-body pad_5 color_bg_white">';
						modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-2 m_top10">';
									modalBlock+='<div class="input-group">';
											modalBlock+=' <div class="input-group-prepend">';
												modalBlock+='<label class="input-group-text font_13" for="inputGroupSelect01">Party</label>';
											modalBlock+=' </div>'
											modalBlock+='<select class="custom-select float-right font_13 candidateOvrAllPerParty" attr_divId="'+divId+'">';
												modalBlock+='<option value="">ALL</option>';
												modalBlock+='<option value="872" selected>TDP</option>';
												modalBlock+='<option value="1117">YSRC</option>';
												modalBlock+='<option value="163">BJP</option>';
												modalBlock+='<option value="886">TRS</option>';
												modalBlock+='<option value="265">CPI</option>';
												modalBlock+='<option value="1892">JANASENA</option>';
												modalBlock+='<option value="362">INC</option>';
												modalBlock+='<option value="269">CPM</option>';
											modalBlock+='</select>';
										modalBlock+='</div>';
									modalBlock+='</div>';
								modalBlock+='<div class="col-sm-3 m_top10 candidateDesigHideShowCls">';
									modalBlock+='<div class="input-group">';
											modalBlock+=' <div class="input-group-prepend">';
												modalBlock+='<label class="input-group-text font_13" for="inputGroupSelect01">Designation</label>';
											modalBlock+=' </div>'
											modalBlock+='<select class="custom-select float-right font_13 candidateOvrAllPerDesigId" attr_divId="'+divId+'">';
												modalBlock+='<option value="" selected>All</option>';
												for(var i in designationArr){
													modalBlock+='<option value="'+designationArr[i].id+'">'+designationArr[i].name+'</option>';
												}	
											modalBlock+='</select>';
										modalBlock+='</div>';
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-2 m_top10">';
									modalBlock+='<div class="input-group">';
											modalBlock+=' <div class="input-group-prepend">';
												if(divId == "debatesId"){
													modalBlock+='<label class="input-group-text font_13" for="inputGroupSelect01">Debates</label>';
												}else{
													modalBlock+='<label class="input-group-text font_13" for="inputGroupSelect01">PressMeets</label>';
												}
												
											modalBlock+=' </div>'
											modalBlock+='<select class="custom-select float-right font_13 debatesCountCls" attr_divId="'+divId+'">';
												modalBlock+='<option value="1">1</option>';
												if(divId == "debatesId"){
													modalBlock+='<option value="3">3</option>';
													modalBlock+='<option value="5" selected>5</option>';
												}else{
													modalBlock+='<option value="3" selected>3</option>';
													modalBlock+='<option value="5">5</option>';
												}
												
												
												modalBlock+='<option value="10">10</option>';
												modalBlock+='<option value="15">15</option>';
												modalBlock+='<option value="20">20</option>';
												modalBlock+='<option value="20">25</option>';
													
											modalBlock+='</select>';
										modalBlock+='</div>';
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-4 m_top10">';
									modalBlock+='<ul class="list-inline switch-custom top8poor8Cls" style="margin-top: 3px;margin-bottom: 0px;">';
										modalBlock+='<li class="active" attr_type="top" attr_divId="'+divId+'">TOP 10 LEADERS</li>';
										modalBlock+='<li attr_type="poor" attr_divId="'+divId+'">POOR 10 LEADERS</li>';
									modalBlock+='</ul>';
								modalBlock+='</div>';
							modalBlock+='</div>';
					
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col m_top20">';
								modalBlock+='<div id="candidateOverallPerformanceCohortDivid'+divId+'"></div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
				    modalBlock+='</div>';
				modalBlock+='</div>';
				
				//DESIGNATION WISE OVERALL PERFORMANCE
					modalBlock+='<div class="card m_top20">';
					   modalBlock+='<div class="card-header card_bg">';
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-10">';
									modalBlock+='<h6 class="font_weight m_bottom_0" style="margin-top: 6px;font-size: 14px;margin-left: 10px;">DESIGNATION WISE OVERALL PERFORMANCE - <small id="designationPartyId'+divId+'">TDP</small></h6>';
								modalBlock+='</div>';
								if(divId != "debatesId"){
									modalBlock+='<div class="col-sm-2 float-right">';
										modalBlock+='<select class="chosen-select float-right roleBasedPartyId"  attr_divId="'+divId+'">';
												modalBlock+='<option value="">ALL</option>';
												modalBlock+='<option value="872" selected>TDP</option>';
												modalBlock+='<option value="1117">YSRC</option>';
												modalBlock+='<option value="163">BJP</option>';
												modalBlock+='<option value="886">TRS</option>';
												modalBlock+='<option value="265">CPI</option>';
												modalBlock+='<option value="1892">JANASENA</option>';
												modalBlock+='<option value="362">INC</option>';
												modalBlock+='<option value="269">CPM</option>';
											modalBlock+='</select>';
									modalBlock+='</div>';
								}
							 modalBlock+='</div>';
							 
						   modalBlock+='</div>';
						   modalBlock+='<div class="card-body pad_5 color_bg_white">';
								modalBlock+='<div class="row">';
									modalBlock+='<div class="col">';
										modalBlock+='<div id="designationWiseTotalDebateDetailsDivId'+divId+'"></div>';
									modalBlock+='</div>';
								modalBlock+='</div>';
						   modalBlock+='</div>';
						modalBlock+='</div>';
		
	 
			
			
			
			//DAY SCALE BASED PERFORMANCE COHORT
			if(divId == "debatesId"){
				modalBlock+='<div class="card m_top20">';
					modalBlock+='<div class="card-header card_bg" style="padding: 5px;">';
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-7">';
							modalBlock+='<h6 class="font_weight" style="margin-top: 15px;font-size: 14px;margin-left: 10px;">DAY WISE SCALE BASED PERFORMANCE COHORT - <small id="dayWiseScaleSelectedPartyId'+divId+'">TDP (Last 6 Months)</small></h6>';
						modalBlock+='</div>';
						modalBlock+='<div class="col-sm-2 float-right">';
							modalBlock+='<select class="chosen-select float-right dayWiseScaleDtsParty" attr_divId="'+divId+'" style="position: relative;top: 8px;">';
									modalBlock+='<option value="">ALL</option>';
									modalBlock+='<option value="872" selected>TDP</option>';
									modalBlock+='<option value="1117">YSRC</option>';
									modalBlock+='<option value="163">BJP</option>';
									modalBlock+='<option value="886">TRS</option>';
									modalBlock+='<option value="265">CPI</option>';
									modalBlock+='<option value="1892">JANASENA</option>';
									modalBlock+='<option value="362">INC</option>';
									modalBlock+='<option value="269">CPM</option>';
								modalBlock+='</select>';
						modalBlock+='</div>';
						modalBlock+='<div class="col-sm-3 float-right">';
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
				   modalBlock+='<div class="card-body pad_5 color_bg_white">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col">';
								modalBlock+='<div id="scaleBasedPerformanceCohortVarianceDivId'+divId+'"></div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
				   modalBlock+='</div>';
				modalBlock+='</div>';
			}
			
			//ROLE BASED PERFORMANCE COHORT
			modalBlock+='<div class="card m_top20">';
				modalBlock+='<div class="card-header card_bg" style="padding: 5px;">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-7">';
						modalBlock+='<h6 class="font_weight" style="margin-top: 15px;font-size: 14px;margin-left: 10px;">ROLE BASED PERFORMANCE COHORT - <small id="dayWiseRoleSelectedPartyId'+divId+'">TDP (Last 6 Months)</small></h6>';
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-2 float-right">';
						modalBlock+='<select class="chosen-select float-right dayWiseRoleDtsParty" attr_divId="'+divId+'" style="position: relative;top: 8px;">';
								modalBlock+='<option value="">ALL</option>';
								modalBlock+='<option value="872" selected>TDP</option>';
								modalBlock+='<option value="1117">YSRC</option>';
								modalBlock+='<option value="163">BJP</option>';
								modalBlock+='<option value="886">TRS</option>';
								modalBlock+='<option value="265">CPI</option>';
								modalBlock+='<option value="1892">JANASENA</option>';
								modalBlock+='<option value="362">INC</option>';
								modalBlock+='<option value="269">CPM</option>';
							modalBlock+='</select>';
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-3 float-right">';
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
			   modalBlock+='<div class="card-body pad_5 color_bg_white">';
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col">';
							modalBlock+='<div id="roleBasedPerformanceCohortVarianceDivId'+divId+'"></div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
			   modalBlock+='</div>';
			modalBlock+='</div>';
			
			 //Channel Vs Parties
			modalBlock+='<div class="card m_top20">';
				modalBlock+='<div class="card-header card_bg" style="padding: 5px;">';
				modalBlock+='<div class="row">';
					modalBlock+='<div class="col-sm-6">';
						if(divId == "debatesId"){
							modalBlock+='<h6 class="font_weight" style="margin-top: 15px;font-size: 14px;margin-left: 10px;">CHANNELS VS PARTIES</h6>';
						}else{
							modalBlock+='<h6 class="font_weight" style="margin-top: 15px;font-size: 14px;margin-left: 10px;">PUBLICATIONS VS PARTIES</h6>';
						}
						
					modalBlock+='</div>';
					modalBlock+='<div class="col-sm-6">';
						modalBlock+='<ul class="list-inline basic_list_type m_bottom_0 float-right" style="position: relative;top: 8px;">';
								for(var i in statusArr){
									modalBlock+='<li>';
										modalBlock+='<p><span class="debates_border '+statusArr[i].className+'"></span> '+statusArr[i].name+' </p>';
									modalBlock+='</li>';							
								}
						modalBlock+='</ul>';
					modalBlock+='</div>';
				 modalBlock+='</div>';			
				modalBlock+='</div>';
				   modalBlock+='<div class="card-body pad_5 color_bg_white">';
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col">';
								modalBlock+='<div id="channelVsPartiesDivId'+divId+'"></div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
				   modalBlock+='</div>';
				modalBlock+='</div>';
			
			// SCALE WISE PERFORMANCE
			//if(divId == "debatesId"){
				modalBlock+='<div class="row">';
						modalBlock+='<div class="col m_top20">';
							modalBlock+='<h6 class="font_weight text-uppercase" style="margin-top: 15px;font-size: 14px;">Scale Wise Performance</h6>';
					modalBlock+='</div>';
				modalBlock+='</div>';		
				modalBlock+='<div class="new_border_yash_pad pad_10">';
					/*modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-2 float-right">';
							modalBlock+='<select class="chosen-select float-right MonthlyScalePartyId" attr_divId="'+divId+'">';
									modalBlock+='<option value="0" selected>ALL</option>';
									modalBlock+='<option value="872">TDP</option>';
									modalBlock+='<option value="1117">YSRC</option>';
									modalBlock+='<option value="163">BJP</option>';
									modalBlock+='<option value="886">TRS</option>';
									modalBlock+='<option value="265">CPI</option>';
									modalBlock+='<option value="1892">JANASENA</option>';
									modalBlock+='<option value="362">INC</option>';
									modalBlock+='<option value="269">CPM</option>';
								modalBlock+='</select>';
						modalBlock+='</div>';
					modalBlock+='</div>';*/		
					modalBlock+='<div class="row">';
						modalBlock+='<div class="col-sm-12">';
							modalBlock+='<div id="scaleWisePerformance'+divId+'" style="height: 250px;"></div>';
						modalBlock+='</div>';
					modalBlock+='</div>';
				modalBlock+='</div>';	
			//}			
		$(".blockWiseModalDivId").html(modalBlock);
		$(".chosen-select").chosen();

		if(chosenLabel == "Overall"){
			customStartDate="";
			customEndDate="";
		}
		if(divId == "debatesId"){
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetPartyWiseDetails(divId,"getPartyWiseTotalDebateDetails","Debates");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetDesignationDetails(divId,"getDesignationWiseTotalDebateDetails","Debates");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetScaleBasedDetails(divId,"getScaleBasedPerformanceCohort","Debates");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getRolesPerformanceOfCandidate",5,"Debates");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails(divId,"getDayWiseScaleBasedPerformanceCohort","Debates","scaleBasedPerformanceCohortVarianceDivId");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails(divId,"getDayWiseRoleBasedPerformanceCohort","Debates","roleBasedPerformanceCohortVarianceDivId");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetChannelAndPartyWiseDetails(divId,"getChannelAndPartyWiseDetails");
			//debatesAndPressMeetComponent.ajax.debatesAndPressMeetMonthWiseScaleList(divId,"getMonthWiseScaleList");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetPartyWiseOverallMonthlyscaleList(divId,"getPartyWiseOverallMonthlyscaleList",0);
		}else if(divId == "pressmeetsId"){
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetPartyWiseDetails(divId,"getPrintMediaOverAllPartyWiseCounts","Pressmeets");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetDesignationDetails(divId,"getPressmeetDesignationWiseOverviewDetails","Pressmeets");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetScaleBasedDetails(divId,"getPressMeetScaleBasedPerformanceCohort","Pressmeets");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getPressMeetCandidateOverAllPerformanceCohort",3,"Pressmeets");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails(divId,"getPressmeetRoleBasedPerformanceCohort","Pressmeets","roleBasedPerformanceCohortVarianceDivId");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetChannelAndPartyWiseDetails(divId,"getPressMeetChannelVsPartysDetails");
			debatesAndPressMeetComponent.ajax.debatesAndPressMeetMonthWiseScaleList(divId,"getPressMeetMonthWisePartyDetails",0);
			
		}
	
}

debatesAndPressMeetComponent.ajax = (function(){
    function debatesAndPressMeetDesignationDetails(divId,url,divType){
		$("#designationWiseTotalDebateDetailsDivId"+divId).html(spinner);
		var partyIds = [];
		var selectedId = "";	
		if(divId == "debatesId"){
			selectedId = 872;	
		}else{
			selectedId = $(".roleBasedPartyId option:selected").val();	
		}
		
		if(selectedId != ""){
			partyIds.push(selectedId);
		}
		
		var json={
			"fromDateStr": customStartDate,
			"toDateStr": customEndDate,
			"state": globalState,
			"partyIds":partyIds,
			"debateLocationIdList":[1],
			"debateParticipantLocationIdList":[1]
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
				if(response !=null && response.length>0){
					debatesAndPressMeetComponent.buildAjaxCallResult.buildDesignationWiseWiseData(response,divId,divType,selectedId);
				}else{
					$("#designationWiseTotalDebateDetailsDivId"+divId).html("No Data Available");
				}
				
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	
	function debatesAndPressMeetScaleBasedDetails(divId,url,divTypeVal){
		$("#scaleBasedPerformanceCohortDivId"+divId).html(spinner);
		var json={
			"fromDateStr": customStartDate,
			"toDateStr": customEndDate,
			"state": globalState,
			"debateLocationIdList":[1],
			"debateParticipantLocationIdList":[1]
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
				if(response !=null && response.length>0){
					debatesAndPressMeetComponent.buildAjaxCallResult.buildScaleBasedDetails(response,divId,divTypeVal);
				}else{
					$("#scaleBasedPerformanceCohortDivId"+divId).html("No Data Available");
				}
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	
	function debatesAndPressMeetCandidateRoleBasedDetails(divId,url,debatesCount,divTypeVal){
		$("#candidateOverallPerformanceCohortDivid"+divId).html(spinner);
		var partyIds = [];		
		var selectedPartyId = $(".candidateOvrAllPerParty").val();	
		if(selectedPartyId != ""){
			partyIds.push(selectedPartyId);
		}
		
		var designationIds = [];	
		if(divId == "debatesId"){
			if(selectedPartyId !=872){
				designationIds = [];
				var selectedDesgId = $(".candidateOvrAllPerDesigId").val();	
			}else{
				var selectedDesgId = $(".candidateOvrAllPerDesigId").val();	
				if(selectedDesgId != ""){
					designationIds.push(selectedDesgId);
				}
			}
		}else{
			var selectedDesgId = $(".candidateOvrAllPerDesigId").val();	
			if(selectedDesgId != ""){
				designationIds.push(selectedDesgId);
			}
		}	
		
		
		
		if(divId == "debatesId"){
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"state": globalState,
				"partyIds": partyIds,
				"designationIds":designationIds,
				"type":leaderType,
				"id": debatesCount,
                "debateLocationIdList":[1],
			    "debateParticipantLocationIdList":[1]
			};
		}else{
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"state": globalState,
				"partyIds": partyIds,
				"designationIds":designationIds,
				"type":leaderType,
				"id": debatesCount,
				"editionTypeId" : editionType,
				"debateLocationIdList":[1],
			    "debateParticipantLocationIdList":[1]
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
				if(response !=null && response.length > 0){
					debatesAndPressMeetComponent.buildAjaxCallResult.buildCandidateRoleBasedDetails(response,divId,selectedPartyId,selectedDesgId,divTypeVal);
				}else{
					$("#candidateOverallPerformanceCohortDivid"+divId).html("No Data Available");
				}
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	
	function debatesAndPressMeetPartyWiseDetails(divId,url,divType){
		$("#partyWiseTotalDebateDetailsDivId"+divId).html(spinner);
		if(divId == "debatesId"){
			var json={
			"fromDateStr": customStartDate,
			"toDateStr": customEndDate,
			"state": globalState,
			"debateLocationIdList":[1],
			"debateParticipantLocationIdList":[1]
		};
		}else{
			var json={
			"fromDateStr": customStartDate,
			"toDateStr": customEndDate,
			"stateId": 1,
            "debateLocationIdList":[1],
			"debateParticipantLocationIdList":[1]
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
				if(response !=null){
					debatesAndPressMeetComponent.buildAjaxCallResult.buildPartyWiseDetails(response,divId,divType);
				}else{
					$("#partyWiseTotalDebateDetailsDivId"+divId).html("No Data Available");
				}
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	
	function debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails(divId,url,divType,blockId){
		$("#"+blockId+divId).html(spinner);
		
		var partyIds = [];
		if(blockId == "scaleBasedPerformanceCohortVarianceDivId"){
			var selectedId = $(".dayWiseScaleDtsParty option:selected").val();	
			if(selectedId != ""){
				partyIds.push(selectedId);
			}
		}else{
			partyIds = [];
			var selectedId = $(".dayWiseRoleDtsParty option:selected").val();	
			if(selectedId != ""){
				partyIds.push(selectedId);
			}
		}
			
		
		var json={
			"fromDateStr": moment().subtract(6, 'month').format('DD/MM/YYYY'),
			"toDateStr": moment().format('DD/MM/YYYY'),
			"state": globalState,
			"partyIds":partyIds,
			"debateLocationIdList":[1],
			"debateParticipantLocationIdList":[1]
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
				if(response !=null && response.subList !=null  && response.subList.length>0){
					debatesAndPressMeetComponent.buildAjaxCallResult.buildDayWiseScaleBasedPerformanceCohortDetails(response,divId,divType,blockId,selectedId);
				}else{
					$("#"+blockId+divId).html("No Data Available");
				}
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	function debatesAndPressMeetChannelAndPartyWiseDetails(divId,url){
		$("#channelVsPartiesDivId"+divId).html(spinner);
		if(divId == "debatesId"){
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"state": globalState,
				"debateLocationIdList":[1],
			    "debateParticipantLocationIdList":[1]
			};
		}else{
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"state": globalState,
				"editionTypeId":0,
				"debateLocationIdList":[1],
			    "debateParticipantLocationIdList":[1]
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
				if(response !=null && response.list !=null && response.list.length>0){
					debatesAndPressMeetComponent.buildAjaxCallResult.buildChannelAndPartyWiseDetails(response,divId);
				}else{
					$("#channelVsPartiesDivId"+divId).html("No Data Available");
				}
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	
	function debatesAndPressMeetMonthWiseScaleList(divId,url,partyId){
		
		$("#scaleWisePerformance"+divId).html(spinner);	
		var partyIdsArray=[];
		  if(partyId == 0){
			  partyIdsArray=[];
		  }else{
			  partyIdsArray.push(parseInt(partyId));
		  }
		if(divId == "debatesId"){
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"state": globalState,
				"partyIds": partyIdsArray,
				"debateLocationIdList":[1],
			    "debateParticipantLocationIdList":[1]

			};
		}else{
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"partyIds": partyIdsArray,
				"debateLocationIdList":[1],
			    "debateParticipantLocationIdList":[1]

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
				if(response !=null && response.length>0){
					debatesAndPressMeetComponent.buildAjaxCallResult.buildPartyWiseOverallMonthlyscaleList(response,divId,partyId);
				}else{
					$("#scaleWisePerformance"+divId).html("No Data Available");
				}
				
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	
	function debatesAndPressMeetPartyWiseOverallMonthlyscaleList(divId,url,partyId){
		$("#scaleWisePerformance"+divId).html(spinner);
		var json={
			"fromDateStr": customStartDate,
			"toDateStr": customEndDate,
			"state": globalState,
			"debateLocationIdList":[1],
			"debateParticipantLocationIdList":[1]
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
				if(response !=null && response.length>0){
					debatesAndPressMeetComponent.buildAjaxCallResult.buildPartyWiseOverallMonthlyscaleList(response,divId,partyId);
				}else{
					$("#scaleWisePerformance"+divId).html("No Data Available");
				}
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	return {
		debatesAndPressMeetDesignationDetails:debatesAndPressMeetDesignationDetails,
        debatesAndPressMeetScaleBasedDetails : debatesAndPressMeetScaleBasedDetails,
		debatesAndPressMeetCandidateRoleBasedDetails:debatesAndPressMeetCandidateRoleBasedDetails,
		debatesAndPressMeetPartyWiseDetails:debatesAndPressMeetPartyWiseDetails,
		debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails:debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails,
		debatesAndPressMeetChannelAndPartyWiseDetails:debatesAndPressMeetChannelAndPartyWiseDetails,
		debatesAndPressMeetMonthWiseScaleList:debatesAndPressMeetMonthWiseScaleList,
		debatesAndPressMeetPartyWiseOverallMonthlyscaleList : debatesAndPressMeetPartyWiseOverallMonthlyscaleList
    }
	
}());

debatesAndPressMeetComponent.buildAjaxCallResult = (function(){
	function buildDesignationWiseWiseData(result,divId,divType,selectedId){
		var partyId = $(".roleBasedPartyId").val();
		var modalBlock = '';
			modalBlock+='<div class="table-responsive">';	
				modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0" id="designationWiseDatatable'+divId+'" style="width:100%">';
					modalBlock+='<thead>';
						modalBlock+='<tr>';
							modalBlock+='<th rowspan="2">Designations</th>';
							modalBlock+='<th colspan="2">Total '+divType+'</th>';
							modalBlock+='<th colspan="2">Total Spokes Persons</th>';				
							modalBlock+='<th colspan="2">Performance</th>';
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
					for(var i in result){
						modalBlock+='<tr>';	
							modalBlock+='<td>'+result[i].name+'</td>';
							if(result[i].debateCount != null && result[i].debateCount > 0){
								if(divId =="debatesId"){
									modalBlock+='<td  class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="debate" attr_designationId="'+result[i].id+'" attr_sortingType="present" attr_cadreId=" " attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+result[i].debateCount+'</td>';
								}else{
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="pressmeet" attr_designationId="'+result[i].id+'" attr_sortingType="present" attr_cadreId="" attr_filterType="" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+result[i].debateCount+'</td>';	
								}
								
							}else{
								modalBlock+='<td>-</td>';
							}
							if(result[i].pastDebateCount != null && result[i].pastDebateCount > 0){
								if(divId =="debatesId"){
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="debate" attr_designationId="'+result[i].id+'" attr_sortingType="past" attr_cadreId=" " attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+result[i].pastDebateCount+'</td>';
								}else{
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="pressmeet" attr_designationId="'+result[i].id+'" attr_sortingType="past" attr_cadreId="" attr_filterType="" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+result[i].pastDebateCount+'</td>';
								}
								
							}else{
								modalBlock+='<td>-</td>';
							}
							
							if(result[i].candidateCount != null && result[i].candidateCount > 0){
								if(divId =="debatesId"){
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="debate" attr_designationId="'+result[i].id+'" attr_sortingType="present" attr_cadreId=" " attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="designationWise" attr_name="DESIGNATION DEBATE DETAILS">'+result[i].candidateCount+'</td>';
								}else{
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="candidate" attr_designationId="'+result[i].id+'" attr_sortingType="present" attr_cadreId="" attr_filterType="designationCandidateWise" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+result[i].candidateCount+'</td>';
								}
								
							}else{
								modalBlock+='<td>-</td>';
							}
							if(result[i].pastCandidateCount != null && result[i].pastCandidateCount > 0){
								if(divId =="debatesId"){
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="debate" attr_designationId="'+result[i].id+'" attr_sortingType="past" attr_cadreId=" " attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="designationWise" attr_name="DESIGNATION DEBATE DETAILS">'+result[i].pastCandidateCount+'</td>';
								}else{
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="candidate" attr_designationId="'+result[i].id+'" attr_sortingType="past" attr_cadreId="" attr_filterType="designationCandidateWise" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+result[i].pastCandidateCount+'</td>';
								}
								
							}else{
								modalBlock+='<td>-</td>';
							}
							if(result[i].scalePerc != null && result[i].scalePerc > 0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexObj[result[i].colorIndex]+'">'+result[i].scalePerc+'</h6></td>';
							}else{
								modalBlock+='<td>-</td>';
							}
							if(result[i].pastScalePerc != null && result[i].pastScalePerc > 0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash ">'+result[i].pastScalePerc+'</h6></td>';
							}else{
								modalBlock+='<td>-</td>';
							}					
						modalBlock+='</tr>';
					}					
					modalBlock+='</tbody>';
				modalBlock+='</table>';	
			modalBlock+='</div>';					
			$("#designationWiseTotalDebateDetailsDivId"+divId).html(modalBlock);
			initializeDataTableWithPagination("designationWiseDatatable"+divId);
			$("#designationWiseDatatable"+divId).tableHeadFixer({"head" : false, "left" : 1});
			
	}
	function buildScaleBasedDetails(result,divId,divTypeVal){
		var modalBlock='';	
			if($(window).width() < 800){
				modalBlock+='<div class="table-responsive">';	
			}
			modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0" id="scaleBasedPerformanceDataTable'+divId+'">';
				modalBlock+='<thead>';								
					modalBlock+='<tr>';
						modalBlock+='<th class="bg_f6" rowspan="2">Political Parties</th>';
						for(var i in result[0].subList){
							modalBlock+='<th class="bg_f6" colspan="2">';
								modalBlock+='<div class="float-left">';								
									modalBlock+='<img class="d-inline" src="Core/images/parties/'+result[0].subList[i].partyName+'.png" alt="image"/>';
									modalBlock+='<span class="d-inline ml-2">'+result[0].subList[i].partyName+'</span>';								
								modalBlock+='</div>';
							modalBlock+='</th>';
						}					
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in result[0].subList){
							modalBlock+='<th>Present</th>';
							modalBlock+='<th>Past</th>';
						}
					modalBlock+='</tr>';					
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
					modalBlock+='<tr>';		
						modalBlock+='<td>Total '+divTypeVal+'</td>';							
						for(var j in result[0].subList){								
							if(result[0].subList[j].debateCount != null && result[0].subList[j].debateCount > 0){
								if(divId == "debatesId"){
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[0].subList[j].id+'" attr_level_type="debate" attr_designationId=" " attr_sortingType="present" attr_cadreId=" " attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+result[0].subList[j].debateCount+'</td>';
								}else{
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[0].subList[j].id+'" attr_level_type="pressmeet" attr_designationId="" attr_sortingType="present" attr_cadreId="" attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+result[0].subList[j].debateCount+'</td>';
								}
								
							}else{
								modalBlock+='<td>-</td>';
							}
							if(result[0].subList[j].pastDebateCount != null && result[0].subList[j].pastDebateCount > 0){
								if(divId == "debatesId"){
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[0].subList[j].id+'" attr_level_type="debate" attr_designationId=" " attr_sortingType="past" attr_cadreId=" " attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+result[0].subList[j].pastDebateCount+'</td>';
								}else{
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[0].subList[j].id+'" attr_level_type="pressmeet" attr_designationId="" attr_sortingType="past" attr_cadreId="" attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+result[0].subList[j].pastDebateCount+'</td>';
								}
								
							}else{
								modalBlock+='<td>-</td>';
							}	
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';						
						for(var i in result){
							modalBlock+='<td>'+result[i].name+'</td>';							
							for(var j in result[i].subList){								
								if(result[i].subList[j].scalePerc != null && result[i].subList[j].scalePerc > 0){
									modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexObj[result[i].subList[j].colorIndex]+'">'+result[i].subList[j].scalePerc+'</h6></td>';
								}else{
									modalBlock+='<td>-</td>';
								}
								if(result[i].subList[j].pastScalePerc != null && result[i].subList[j].pastScalePerc > 0){
									modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash">'+result[i].subList[j].pastScalePerc+'</td>';
								}else{
									modalBlock+='<td>-</td>';
								}								
							}
							modalBlock+='</tr>';										
						}
					
				modalBlock+='</tbody>';
			modalBlock+='</table>';
			if($(window).width() < 800){
				modalBlock+='</div>';
			}	
		
		
		$("#scaleBasedPerformanceCohortDivId"+divId).html(modalBlock);
		initializeDataTableWithPagination("scaleBasedPerformanceDataTable"+divId);
		$("#scaleBasedPerformanceDataTable"+divId).tableHeadFixer({"head" : false, "left" : 1});
	}
	
	function buildCandidateRoleBasedDetails(result,divId,selectedPartyId,selectedDesgId,divTypeVal){
		var modalBlock='';
		if(result[0].subList != null && result[0].subList.length > 0){
			
			modalBlock+='<div class="table-responsive">';	
			modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0" id="rolesPerformanceDataTable'+divId+'">';
				modalBlock+='<thead>';								
					modalBlock+='<tr>';
						modalBlock+='<th>LEADERS</th>';							
						for(var i in result[0].subList){
							modalBlock+='<th colspan="2">'+result[0].subList[i].partyName+'</th>';	
						}					
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						modalBlock+='<th>PARTY</th>';							
						for(var i in result[0].subList){
							modalBlock+='<th colspan="2"><img src="Core/images/parties/'+result[0].subList[i].name+'.png" alt="'+result[0].subList[i].name+'"/></th>';
						}					
					modalBlock+='</tr>';							
					modalBlock+='<tr>';
						modalBlock+='<th>COMPARISON</th>';							
						for(var i in result[0].subList){
							modalBlock+='<th>present</th>';	
							modalBlock+='<th>past</th>';																
						}					
					modalBlock+='</tr>';													
				 modalBlock+='</thead>';
				modalBlock+='<tbody>';
					modalBlock+='<tr>';		
						modalBlock+='<td>Total '+divTypeVal+'</td>';							
						for(var j in result[0].subList){								
							if(result[0].subList[j].debateCount != null && result[0].subList[j].debateCount > 0){
								if(divId == "debatesId"){
									modalBlock+='<td  class="getCountClickDetailsCls" attr_partyId="'+result[0].subList[j].candidateId+'" attr_level_type="debate" attr_designationId="'+selectedDesgId+'" attr_sortingType="present" attr_cadreId="'+result[0].subList[j].id+'" attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+result[0].subList[j].debateCount+'</td>';
								}else{
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[0].subList[j].candidateId+'" attr_level_type="pressmeet" attr_designationId="'+selectedDesgId+'" attr_sortingType="present" attr_cadreId="'+result[0].subList[j].id+'" attr_filterType="" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+result[0].subList[j].debateCount+'</td>';
								}
								
							}else{
								modalBlock+='<td>-</td>';
							}
							if(result[0].subList[j].pastDebateCount != null && result[0].subList[j].pastDebateCount > 0){
								if(divId == "debatesId"){
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[0].subList[j].candidateId+'" attr_level_type="debate" attr_designationId="'+selectedDesgId+'" attr_sortingType="past" attr_cadreId="'+result[0].subList[j].id+'" attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+result[0].subList[j].pastDebateCount+'</td>';
								}else{
									modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[0].subList[j].candidateId+'" attr_level_type="pressmeet" attr_designationId="'+selectedDesgId+'" attr_sortingType="past" attr_cadreId="'+result[0].subList[j].id+'" attr_filterType="" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+result[0].subList[j].pastDebateCount+'</td>';
								}
								
							}else{
								modalBlock+='<td>-</td>';
							}	
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';						
						for(var i in result){
							modalBlock+='<td>'+result[i].name+'</td>';							
							for(var j in result[i].subList){								
								if(result[i].subList[j].scalePerc != null && result[i].subList[j].scalePerc > 0){
									modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexObj[result[i].subList[j].colorIndex]+'">'+result[i].subList[j].scalePerc+'</h6></td>';
								}else{
									modalBlock+='<td>-</td>';
								}
								if(result[i].subList[j].pastScalePerc != null && result[i].subList[j].pastScalePerc > 0){
									modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge badge_yash">'+result[i].subList[j].pastScalePerc+'</td>';
								}else{
									modalBlock+='<td>-</td>';
								}								
							}
							modalBlock+='</tr>';										
						}
					
				modalBlock+='</tbody>';
			modalBlock+='</table>';	
			modalBlock+='</div>';
			
		$("#candidateOverallPerformanceCohortDivid"+divId).html(modalBlock);
		initializeDataTableWithPagination("rolesPerformanceDataTable"+divId);
		$("#rolesPerformanceDataTable"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
		}else{
			$("#candidateOverallPerformanceCohortDivid"+divId).html("NO Data Available");
		}	
		
	}
	
	function buildPartyWiseDetails(result,divId,divType){
		var partyNamesObj = {"TDP":"Telugu Desam Party","YSRC": "YSR Congress Party","JANASENA":"Jana Sena Party",
						"BJP":"Bharatiya Janata Party","INC":"Indian National Congress","CPI":"Communist Party of India",
						"CPM":"Communist Party of India(Marxist)","TRS":"Telangana Rashtra Samithi"};
						
		var modalBlock = '';
		modalBlock+='<div class="row">';	
			modalBlock+='<div class="col">';	
					modalBlock+='<div class="table-responsive">';	
					modalBlock+='<table class="table table_political_parties table_custom_bg_white_color mb-0" id="partyWiseDebatesDataTable'+divId+'">';
						modalBlock+='<thead>';
							modalBlock+='<tr>';
								modalBlock+='<th>Political Parties</th>';
								modalBlock+='<th>Total '+divType+'</th>';
								modalBlock+='<th>Total Spokes Persons</th>';
								modalBlock+='<th>Performance</th>';
							modalBlock+='</tr>';				
						modalBlock+='</thead>';
						modalBlock+='<tbody>';
							if(divId == "debatesId"){
								if(result !=null && result.length>0){
									for(var i in result){	
										modalBlock+='<tr>';						
											modalBlock+='<td>';	
												modalBlock+='<img class="d-inline" src="Core/images/parties/'+result[i].partyName+'.png"/>';							
												modalBlock+='<span class="d-inline ml-3">'+partyNamesObj[result[i].partyName]+'</span>';
											modalBlock+='</td>';
											if(result[i].debateCount != null && result[i].debateCount > 0){
												
												modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[i].id+'" attr_level_type="debate" attr_designationId=" " attr_sortingType=" " attr_cadreId=" " attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+result[i].debateCount+'</td>';
											}else{
												modalBlock+='<td>-</td>';
											}
											if(result[i].candidateCount != null && result[i].candidateCount > 0){
												modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result[i].id+'" attr_level_type="candidate" attr_designationId=" " attr_sortingType=" " attr_cadreId=" " attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+result[i].candidateCount+'</td>';
											}else{
												modalBlock+='<td>-</td>';
											}
											if(result[i].scalePerc != null && result[i].scalePerc > 0){
												modalBlock+='<td>'+result[i].scalePerc+'</td>';
											}else{
												modalBlock+='<td>-</td>';
											}					
										modalBlock+='</tr>';
									}
								}else{
									modalBlock+='<tr>';	
										modalBlock+='<td colspan="4">No Data Available</td>';	
									modalBlock+='</tr>';									
								}
								
							}else{
								if(result.pressmeetList !=null && result.pressmeetList.length>0){
									for(var i in result.pressmeetList){	
										modalBlock+='<tr>';						
											modalBlock+='<td>';							
												modalBlock+='<img class="d-inline" src="Core/images/parties/'+result.pressmeetList[i].partyName+'.png"/>';							
												modalBlock+='<span class="d-inline ml-3">'+partyNamesObj[result.pressmeetList[i].partyName]+'</span>';
											modalBlock+='</td>';
											if(result.pressmeetList[i].pressMeetCount != null && result.pressmeetList[i].pressMeetCount > 0){
												modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result.pressmeetList[i].partyId+'" attr_level_type="pressmeet" attr_designationId="0" attr_sortingType="" attr_cadreId="0" attr_filterType="" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="PRESSMEET DETAILS">'+result.pressmeetList[i].pressMeetCount+'</td>';
											}else{
												modalBlock+='<td>-</td>';
											}
											if(result.pressmeetList[i].candidateArticleCount != null && result.pressmeetList[i].candidateArticleCount > 0){
												modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+result.pressmeetList[i].partyId+'" attr_level_type="candidate" attr_designationId="0" attr_sortingType="" attr_cadreId="0" attr_filterType="" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="PRESSMEET DETAILS">'+result.pressmeetList[i].candidateArticleCount+'</td>';
											}else{
												modalBlock+='<td>-</td>';
											}
											if(result.pressmeetList[i].overAllPerfomance != null && result.pressmeetList[i].overAllPerfomance > 0){
												modalBlock+='<td>'+result.pressmeetList[i].overAllPerfomance.toFixed(2)+'</td>';
											}else{
												modalBlock+='<td>-</td>';
											}					
										modalBlock+='</tr>';
									}
								}else{
										modalBlock+='<tr>';	
											modalBlock+='<td colspan="4">No Data Available</td>';	
										modalBlock+='</tr>';									
									}
							}				
						modalBlock+='</tbody>';
					modalBlock+='</table>';	
				modalBlock+='</div>';		
			modalBlock+='</div>';
			modalBlock+='</div>';
		$("#partyWiseTotalDebateDetailsDivId"+divId).html(modalBlock);
		initializeDataTableWithOutPagination("partyWiseDebatesDataTable"+divId);
		$("#partyWiseDebatesDataTable"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
	}
	
	function buildDayWiseScaleBasedPerformanceCohortDetails(result,divId,divType,blockId,selectedId){
		var modalBlock='';
			modalBlock+='<div class="table-responsive">';	
			modalBlock+='<table class="table  table_custom_news_variance m_bottom_0" id="roleBasedPerformanceDataTable'+blockId+''+divId+'">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="2"></th>';
						modalBlock+='<th colspan="2">'+divType+'</th>';
						if(divId != "debatesId"){
							modalBlock+='<th colspan="2">OVERALL PERFORMANCE</th>';
						}
						
						for(var i in result.subList[0].scaleList){
							modalBlock+='<th colspan="2">'+result.subList[0].scaleList[i].name+'</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						if(divId != "debatesId"){
							modalBlock+='<th>Present</th>';
							modalBlock+='<th>Past</th>';
						}
						
						modalBlock+='<th>Present</th>';
						modalBlock+='<th>Past</th>';
						for(var i in result.subList[0].scaleList){
							modalBlock+='<th>Present</th>';
							modalBlock+='<th>Past</th>';
						}
						
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
				for(var i in result.subList){
					modalBlock+='<tr>';
						modalBlock+='<td>'+result.subList[i].name+'</td>';
						if(divId == "debatesId"){
							modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="debate" attr_designationId=" " attr_sortingType="present" attr_cadreId=" " attr_filterType="dayWise" attr_presentDateList="'+result.subList[i].presentDateList+'" attr_futureDateList=" " attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+emptyCheck(result.subList[i].debateCount)+'</td>';
						}else{
							modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="pressmeet" attr_designationId=" " attr_sortingType="present" attr_cadreId="" attr_filterType="dayWise" attr_presentDateList="'+result.subList[i].presentDateList+'" attr_futureDateList=" " attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+emptyCheck(result.subList[i].debateCount)+'</td>';	
						}
						if(divId == "debatesId"){
							modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="debate" attr_designationId=" " attr_sortingType="past" attr_cadreId=" " attr_filterType="dayWise" attr_presentDateList=" " attr_futureDateList="'+result.subList[i].futureDateList+'" attr_click_type="debatesWise" attr_name="DEBATE DETAILS">'+emptyCheck(result.subList[i].pastDebateCount)+'</td>';
						}else{
							modalBlock+='<td  class="getCountClickDetailsCls" attr_partyId="'+selectedId+'" attr_level_type="pressmeet" attr_designationId=" " attr_sortingType="past" attr_cadreId="" attr_filterType="dayWise" attr_presentDateList=" " attr_futureDateList="'+result.subList[i].futureDateList+'" attr_click_type="pressmeetWise" attr_name="pressmeet DETAILS">'+emptyCheck(result.subList[i].pastDebateCount)+'</td>';
						}
						
						if(divId != "debatesId"){
							if(result.subList[i].scalePerc !=null && result.subList[i].scalePerc>0){
								modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexObj[result.subList[i].colorIndex]+'">'+emptyCheck(result.subList[i].scalePerc)+'</h6></td>';
							}else{
								modalBlock+='<td> - </td>';
							}
							if(result.subList[i].pastScalePerc !=null && result.subList[i].pastScalePerc>0){
								modalBlock+='<td><h6 class="font_weight font_14 badge_yash mb-0 number_css badge ">'+emptyCheck(result.subList[i].pastScalePerc)+'</h6></td>';
							}else{
								modalBlock+='<td> - </td>';
							}
						}
						for(var j in result.subList[i].scaleList){
								if(result.subList[i].scaleList[j].scalePerc !=null && result.subList[i].scaleList[j].scalePerc>0){
									modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexObj[result.subList[i].scaleList[j].colorIndex]+'">'+emptyCheck(result.subList[i].scaleList[j].scalePerc)+'</h6></td>';
								}else{
									modalBlock+='<td>-</td>';
								}
								
								if(result.subList[i].scaleList[j].pastScalePerc != null && result.subList[i].scaleList[j].pastScalePerc> 0){
									modalBlock+='<td><h6 class="font_weight font_14 badge_yash mb-0 number_css badge ">'+emptyCheck(result.subList[i].scaleList[j].pastScalePerc)+'</h6></td>';
								}else{
									modalBlock+='<td>-</td>';
								}
								
							}
					modalBlock+='</tr>';
					
				}
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		modalBlock+='</div>';
		$("#"+blockId+divId).html(modalBlock);
		initializeDataTableWithOutPagination("roleBasedPerformanceDataTable"+blockId+divId);
		$("#roleBasedPerformanceDataTable"+blockId+divId).tableHeadFixer({"head" : false, "left" : 1}); 
	}
	function buildChannelAndPartyWiseDetails(response,divId){
		var modalBlock='';
			if($(window).width() < 800){
					modalBlock+='<div class="table-responsive">';	
				}
			modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0" id="channelVsPartiesDataTable'+divId+'">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th rowspan="2">Channel</th>';
						for(var i in response.list[0].list){
							modalBlock+='<th colspan="2">';
								modalBlock+='<img class="d-inline" src="Core/images/parties/'+response.list[0].list[i].candidateName+'.png"/>';							
								modalBlock+='<span class="d-inline ml-3">'+response.list[0].list[i].candidateName+'</span>';
							modalBlock+='</th>';
						}
					modalBlock+='</tr>';
					modalBlock+='<tr>';
						for(var i in response.list[0].list){
							modalBlock+='<th>Present</th>';
							modalBlock+='<th>Past</th>';
						}
					modalBlock+='</tr>';
				modalBlock+='</thead>';
				modalBlock+='<tbody>';
					for(var i in response.list){
						modalBlock+='<tr>';
							if(i==0){
								modalBlock+='<td>'+response.list[i].name+'</td>';
							}else{
								modalBlock+='<td class="sprite"><img src="Core/images/Nes_Papers_Small LOGO/'+response.list[i].name+'.png" alt="image"/></td>';
							}
							
							for(var j in response.list[i].list){
								if(typeof response.list[i].list[j].colorIndex == "undefined"){
									modalBlock+='<td><h6 class="mb-0 font_weight font_14 badge_yash number_css badge">'+emptyCheck(response.list[i].list[j].scalePerc)+'</h6></td>';
								}else{
									modalBlock+='<td><h6 class="mb-0 font_weight font_14 number_css badge '+colorIndexObj[response.list[i].list[j].colorIndex]+'">'+emptyCheck(response.list[i].list[j].scalePerc)+'</h6></td>';
								}
								if(response.list[i].list[j].pastScalePerc != null && response.list[i].list[j].pastScalePerc> 0){
									modalBlock+='<td><h6 class="font_weight font_14 badge_yash mb-0 number_css badge ">'+emptyCheck(response.list[i].list[j].pastScalePerc)+'</h6></td>';
								}else{
									modalBlock+='<td>-</td>';
								}
								
							}
						modalBlock+='</tr>';
					}
				modalBlock+='</tbody>';
			modalBlock+='</table>';
			if($(window).width() < 800){
				modalBlock+='</div>';
			}	
		$("#channelVsPartiesDivId"+divId).html(modalBlock);
		initializeDataTableWithOutPagination("channelVsPartiesDataTable"+divId);
		$("#channelVsPartiesDataTable"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
	}
	function buildPartyWiseOverallMonthlyscaleList(result,divId,partyId){
		var categoriesArr=[];
		var mainScaleArr=[];
		if(partyId  == 0){
			var JANASENAArr = [];//1
			var TDPArr = [];//2
			var YSRCArr = [];//3
			var TRSArr = [];//4
			var INCArr = [];//4
			var BJPArr = [];//4
			var CPMArr = [];//4
			var OTHERSArr = [];//4
			for(var i in result){
					categoriesArr.push(result[i].monthName);
					if(result[i].coreDebateVOList !=null &&  result[i].coreDebateVOList.length>0){
						for(var j in result[i].coreDebateVOList){  
							 if(result[i].coreDebateVOList[j].name=="JANASENA"){
								 JANASENAArr.push({"y":result[i].coreDebateVOList[j].scalePerc});
							}else if(result[i].coreDebateVOList[j].name=="TDP"){
								 TDPArr.push({"y":result[i].coreDebateVOList[j].scalePerc});
							}else if(result[i].coreDebateVOList[j].name=="YSRC"){
								 YSRCArr.push({"y":result[i].coreDebateVOList[j].scalePerc});
							}else if(result[i].coreDebateVOList[j].name=="TRS"){
								 TRSArr.push({"y":result[i].coreDebateVOList[j].scalePerc});
							}else if(result[i].coreDebateVOList[j].name=="INC"){
								 INCArr.push({"y":result[i].coreDebateVOList[j].scalePerc});
							}else if(result[i].coreDebateVOList[j].name=="BJP"){
								 BJPArr.push({"y":result[i].coreDebateVOList[j].scalePerc});
							}else if(result[i].coreDebateVOList[j].name=="CPM"){
								 CPMArr.push({"y":result[i].coreDebateVOList[j].scalePerc});
							}else if(result[i].coreDebateVOList[j].name=="OTHERS"){
								 OTHERSArr.push({"y":result[i].coreDebateVOList[j].scalePerc});
							}
						}
					}
				}
				if(JANASENAArr != null && JANASENAArr.length > 0){
						mainScaleArr.push({name:'JANASENA',data:JANASENAArr,color:"#E33939"});  
					}
					if(TDPArr != null && TDPArr.length > 0){
						mainScaleArr.push({name:'TDP',data:TDPArr,color:"#FF9F10"});  
					}
					if(YSRCArr != null && YSRCArr.length > 0){
						mainScaleArr.push({name:'YSRC',data:YSRCArr,color:"#2C96E8"});  
					}
					if(TRSArr != null && TRSArr.length > 0){
						mainScaleArr.push({name:'TRS',data:TRSArr,color:"#FE0175"});  
					}
					
					if(INCArr != null && INCArr.length > 0){
						mainScaleArr.push({name:'INC',data:INCArr,color:"#008E46"});  
					}
					if(BJPArr != null && BJPArr.length > 0){
						BJPArr.push({name:'BJP',data:BJPArr,color:"#F97D09"});  
					}
					if(CPMArr != null && CPMArr.length > 0){
						mainScaleArr.push({name:'CPM',data:CPMArr,color:"#BE0203"});  
					}
					if(OTHERSArr != null && OTHERSArr.length > 0){
						mainScaleArr.push({name:'OTHERS',data:OTHERSArr,color:"#ffa3a3"});  
					}
		}else{
			    var fourFiveAboveArr = [];//1
				var fourpointTwoArr = [];//2
				var fourpointZeroArr = [];//3
				var threepounteightArr = [];//4
				var threepointsevenArr = [];//4
				
				for(var i in result){
					if(divId != "pressmeetsId"){
						categoriesArr.push(result[i].monthName);
					}else{
						categoriesArr.push(result[i].name);
					}
					
					if(result[i].coreDebateVOList !=null &&  result[i].coreDebateVOList.length>0){
						for(var j in result[i].coreDebateVOList){  
							 if(result[i].coreDebateVOList[j].name=="4.5 && Above"){
								 fourFiveAboveArr.push({"y":result[i].coreDebateVOList[j].debateCount});
							}else if(result[i].coreDebateVOList[j].name=="4.2-4.4"){
								 fourpointTwoArr.push({"y":result[i].coreDebateVOList[j].debateCount});
							}else if(result[i].coreDebateVOList[j].name=="4.0-4.1"){
								 fourpointZeroArr.push({"y":result[i].coreDebateVOList[j].debateCount});
							}else if(result[i].coreDebateVOList[j].name=="3.8-3.9"){
								 threepounteightArr.push({"y":result[i].coreDebateVOList[j].debateCount});
							}else if(result[i].coreDebateVOList[j].name=="3.7 && below"){
								 threepointsevenArr.push({"y":result[i].coreDebateVOList[j].debateCount});
							}
						}
					}
				}	
					if(fourFiveAboveArr != null && fourFiveAboveArr.length > 0){
						mainScaleArr.push({name:'4.5 && Above',data:fourFiveAboveArr,color:"#2C96E8"});  
					}
					if(fourpointTwoArr != null && fourpointTwoArr.length > 0){
						mainScaleArr.push({name:'4.2-4.4',data:fourpointTwoArr,color:"#0FC297"});  
					}
					if(fourpointZeroArr != null && fourpointZeroArr.length > 0){
						mainScaleArr.push({name:'4.0-4.1',data:fourpointZeroArr,color:"#FFC21F"});  
					}
					if(threepounteightArr != null && threepounteightArr.length > 0){
						mainScaleArr.push({name:'3.8-3.9',data:threepounteightArr,color:"#FF9F10"});  
					}
					
					if(threepointsevenArr != null && threepointsevenArr.length > 0){
						mainScaleArr.push({name:'3.7 && below',data:threepointsevenArr,color:"#E33939"});  
					}
	
		}
	  
		//console.log(mainScaleArr)
			
		 $("#scaleWisePerformance"+divId).highcharts({
			chart: {
				type: 'column',
				backgroundColor:'transparent'
			},
			title: {
				text: ''
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				min: 0,
				gridLineWidth: 0,
				minorGridLineWidth: 0,
				categories: categoriesArr,
			},
			yAxis: {
				min: 0,
				gridLineWidth: 0,
				minorGridLineWidth: 0,
				title: {
					text: ''
				}
			},
			tooltip: {
				formatter: function () {
					var s = '<b>' + this.x + '</b>';

					$.each(this.points, function () {
						s += '<br/><b style="color:'+this.series.color+'">' + this.series.name + '</b> : ' +
							(this.y)+'';
					});

					return s;
				},
				shared: true
			},
			plotOptions: {
				column: {
					pointWidth: 15,
					gridLineWidth: 8,
					dataLabels: {
						enabled: false,
						align:"center",
						 formatter: function() {
							if (this.y == 0) {
								return null;
							} else {
								return (this.y) +'';
							}
						}
					  
					}
				},
			},
			series: mainScaleArr
		});		
		
	}	
		
	return {
        buildDesignationWiseWiseData : buildDesignationWiseWiseData,
		buildScaleBasedDetails:buildScaleBasedDetails,
		buildCandidateRoleBasedDetails:buildCandidateRoleBasedDetails,
		buildPartyWiseDetails:buildPartyWiseDetails,
		buildDayWiseScaleBasedPerformanceCohortDetails:buildDayWiseScaleBasedPerformanceCohortDetails,
		buildChannelAndPartyWiseDetails:buildChannelAndPartyWiseDetails,
		buildPartyWiseOverallMonthlyscaleList : buildPartyWiseOverallMonthlyscaleList
    }
}());

$(document).on("change",".roleBasedPartyId",function(){
	var divId = $(this).attr("attr_divId");

	var partyName = $(".roleBasedPartyId option:selected").text();
	$("#designationPartyId"+divId).html(partyName);

	if(divId == "debatesId"){
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetDesignationDetails(divId,"getDesignationWiseTotalDebateDetails","Debates");
	}else{
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetDesignationDetails(divId,"getPressmeetDesignationWiseOverviewDetails","Pressmeets");
	}
});

$(document).on("click",".switch-custom li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
});

$(document).on("click",".top8poor8Cls li",function(){	
	var divId = $(this).attr("attr_divId");
	leaderType = $(this).attr("attr_type");
	var debatesCount  =$(".debatesCountCls").val();
	
	if(divId == "debatesId"){
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getRolesPerformanceOfCandidate",debatesCount,"Debates");
	}else{
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getPressMeetCandidateOverAllPerformanceCohort",debatesCount,"Pressmeets");
	}
	
});

$(document).on("change",".dayWiseScaleDtsParty",function(){
	var divId = $(this).attr("attr_divId");

	var partyName = $(".dayWiseScaleDtsParty option:selected").text();
	$("#dayWiseScaleSelectedPartyId"+divId).html(partyName);

	if(divId == "debatesId"){
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails(divId,"getDayWiseScaleBasedPerformanceCohort","Debates","scaleBasedPerformanceCohortVarianceDivId");
	}
});
$(document).on("change",".dayWiseRoleDtsParty",function(){
	var divId = $(this).attr("attr_divId");

	var partyName = $(".dayWiseRoleDtsParty option:selected").text();
	$("#dayWiseRoleSelectedPartyId"+divId).html(partyName);

	if(divId == "debatesId"){
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails(divId,"getDayWiseRoleBasedPerformanceCohort","Debates","roleBasedPerformanceCohortVarianceDivId");
	}else{
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetDayWiseScaleBasedPerformanceCohortDetails(divId,"getPressmeetRoleBasedPerformanceCohort","Pressmeets","roleBasedPerformanceCohortVarianceDivId");
	}
});
$(document).on("change",".candidateOvrAllPerParty",function(){
	var divId = $(this).attr("attr_divId");
	var partyName = $(".candidateOvrAllPerParty option:selected").text();
	var partyId = $(".candidateOvrAllPerParty").val();
	$("#candidateOvrAllPerParty"+divId).html(partyName);
	var debatesCount  =$(".debatesCountCls").val();
	
	if(divId == "debatesId"){
		if(partyId != "872"){
			$(".candidateDesigHideShowCls").hide();
		}else{
			$(".candidateDesigHideShowCls").show();
		}
	}
	if(divId == "debatesId"){
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getRolesPerformanceOfCandidate",debatesCount,"Debates");
	}else{
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getPressMeetCandidateOverAllPerformanceCohort",debatesCount,"Pressmeets");
	}
	
});
$(document).on("change",".candidateOvrAllPerDesigId",function(){
	var divId = $(this).attr("attr_divId");	
	var debatesCount  =$(".debatesCountCls").val();
	if(divId == "debatesId"){
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getRolesPerformanceOfCandidate",debatesCount,"Debates");
	}else{
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getPressMeetCandidateOverAllPerformanceCohort",debatesCount,"Pressmeets");
	}
	
});

$(document).on("change",".MonthlyScalePartyId",function(){
	var divId = $(this).attr("attr_divId");
	var partyId=$(this).val();
	if(partyId == 0){
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetPartyWiseOverallMonthlyscaleList(divId,"getPartyWiseOverallMonthlyscaleList",partyId);
	}else{
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetMonthWiseScaleList(divId,"getMonthWiseScaleList",partyId);
	}
});
function emptyCheck(filedValue){
	var returnVal = ' - ';
	if( filedValue !=null && filedValue > 0){
		returnVal = filedValue;
	}
	return returnVal;
}

	
  function getCoreDebateBasicDetailsOfParty(partyIdsArr,level_type,designationId,sortingType,cadreId,filterType,presentDateListArr,futureDateList,click_type){
		if(click_type == "debatesWise"){
			$("#meetingWiseWiseModalDivId").html(spinner);	
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"state": globalState,
				"partyIds":partyIdsArr,
				"type":level_type,	//debate
				"designationId": designationId,
				"sortingType": sortingType,  // past or present 
				"cadreId" : cadreId,
				"filterType": filterType,	 //dayWise
				"presentDateList" : presentDateListArr,	//presentDateList (or) 
				"futureDateList" : futureDateList,
				"debateLocationIdList":[1],
				"debateParticipantLocationIdList":[1]
			};
		}else{
			$("#meetingWiseAttendanceDtsDivId").html(spinner);	
			var json={
				"fromDateStr": customStartDate,
				"toDateStr": customEndDate,
				"state": globalState,
				"partyIds":partyIdsArr,
				"type":level_type,	//debate
				"designationId": designationId,
				"sortingType": sortingType,  // past or present 
				"cadreId" : cadreId,
				"filterType": filterType,	 //dayWise
				"presentDateList" : presentDateListArr,	//presentDateList (or) 
				"futureDateList" : futureDateList,
				"debateLocationIdList":[1],
				"debateParticipantLocationIdList":[1]
			};
		}
			
		
		
		
        $.ajax({
            url: "getCoreDebateBasicDetailsOfParty",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
				if(response !=null && response.length>0){
					if(click_type == "debatesWise"){
						buildCoreDebateBasicDetailsOfParty(response,level_type,click_type)
					}else{
						buildCoreDebateBasicDetailsOfParty(response,level_type,click_type)
					}
					
				}else{
					if(click_type == "debatesWise"){
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
	
function buildCoreDebateBasicDetailsOfParty(response,type,click_type){
	var modalBlock='';
		modalBlock+='<div class="table-responsive">';
			modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0" id="coreDebatesDataTable">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						if(type =="candidate"){
							modalBlock+='<th>Candidate Name</th>';
						}
						modalBlock+='<th>Subject</th>';
						modalBlock+='<th>Start Time</th>';
						modalBlock+='<th>End Time</th>';
						modalBlock+='<th>Observer</th>';
						modalBlock+='<th>Channel</th>';
					modalBlock+='</tr>';
				modalBlock+='<thead>';
				modalBlock+='<tbody>';
				for(var i in response){
					modalBlock+='<tr>';
						var name='';
						var name='';
						var subject='';
						var candiName='';
						if(response[i].debateSubject !=null && response[i].debateSubject.length>0){
							for(var j in response[i].debateSubject){
									name=name.concat(response[i].debateSubject);
							}
								subject=getTitleContent(name,30);
								if(response[i].candidateName !=null && response[i].candidateName.length>0)
									candiName=getTitleContent(response[i].candidateName,30);
						}
						if(type =="candidate"){
							modalBlock+='<td><a class="debateDetailsCls" attr_debateId='+response[i].id+'  style="cursor:pointer;">'+candiName.toUpperCase()+'</a></td>';
							
						}
						
						modalBlock+='<td><a class="debateDetailsCls" attr_debateId='+response[i].id+'  style="cursor:pointer;">'+subject+'</a></td>';
						modalBlock+='<td>'+response[i].startTime+'</td>';
						modalBlock+='<td>'+response[i].endTime+'</td>';
						modalBlock+='<td>'+response[i].observerName+'</td>';
						modalBlock+='<td>'+response[i].charecterName+'</td>';
					modalBlock+='</tr>';
				}
					
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		modalBlock+='</div>';
	if(click_type == "debatesWise"){
		$("#meetingWiseWiseModalDivId").html(modalBlock);
	}else{
		$("#meetingWiseAttendanceDtsDivId").html(modalBlock);
	}	
	initializeDataTableWithPagination("coreDebatesDataTable");
	
}

$(document).on("click",".debateDetailsCls",function(){
	var debateId = $(this).attr("attr_debateId");
	var  stateId = $(this).attr("attr_state_id");
	window.open("http://www.leadertoleader.in/debateReportAction.action?debateId="+debateId+"&stateId="+stateId+"");
	//window.open('debateReportAction.action?debateId='+debateId+'','_blank');		 
});
function getTitleContent(name,showCharVal){
	ellipsetext=". ."
	var showChar = showCharVal;
	var content = name;
	if(content!=null){
		if(content.length > showChar) {
		var c = content.substr(0, showChar);
		var html = c + ellipsetext;
		return html;
		}
	}
   
	return name;
}
$(document).on("change",".debatesCountCls",function(){
	var debatesCount = $(this).val();
	var divId = $(this).attr("attr_divId");	
	if(divId == "debatesId"){
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getRolesPerformanceOfCandidate",debatesCount,"Debates");
	}else{
		debatesAndPressMeetComponent.ajax.debatesAndPressMeetCandidateRoleBasedDetails(divId,"getPressMeetCandidateOverAllPerformanceCohort",debatesCount,"Pressmeets");
	}
	
});

$(document).on("click",".getCountClickDetailsCls",function(){
	$("#meetingWiseAttendanceDtsDivId").html('');
	
	var partyId = $(this).attr("attr_partyId");	
	var level_type = $(this).attr("attr_level_type");	
	var designationId = $(this).attr("attr_designationId");	
	var sortingType = $(this).attr("attr_sortingType");	
	var cadreId = $(this).attr("attr_cadreId");	
	var filterType = $(this).attr("attr_filterType");	
	var presentDateList = $(this).attr("attr_presentDateList");	
	var futureDateList = $(this).attr("attr_futureDateList");	
	var click_type = $(this).attr("attr_click_type");	
	var name = $(this).attr("attr_name");	
	
	var partyIdsArr=[];
	var presentDateListArr = [];
	var futureDateListArr = [];
	
	
	if(partyId == " "){
		partyIdsArr=[];
	}else{
		partyIdsArr.push(partyId);
	}
	if(presentDateList == " "){
		presentDateListArr = [];
	}else{
		var stringIds = presentDateList,
		strx   = stringIds.split(',');
		presentDateListArr = presentDateListArr.concat(strx);
	}
	
	if(futureDateList == " "){
		futureDateListArr = [];
	}else{
		var stringIds = futureDateList,
		strx   = stringIds.split(',');
		futureDateListArr = futureDateListArr.concat(strx);
	}
	
	
	if(click_type != "designationWiseSubClick" && click_type != "pressmeetDesigSubClick"){
		$("#meetingTypeHeadingId").html(name);
		$("#meetingTypeModalDivId").modal("show");
	}
	
	
	if(click_type == "debatesWise"){
		getCoreDebateBasicDetailsOfParty(partyIdsArr,level_type,designationId,sortingType,cadreId,filterType,presentDateListArr,futureDateListArr,click_type);
	}else if(click_type == "designationWiseSubClick"){
		getCoreDebateBasicDetailsOfParty(partyIdsArr,level_type,designationId,sortingType,cadreId,filterType,presentDateListArr,futureDateListArr,click_type);
	}else if(click_type == "designationWise"){
		getDesignationWiseCandiadteCountClick(partyIdsArr,designationId,sortingType);
	}else if(click_type == "pressmeetWise"){
		getPressMeetOrCandidateDetailsByClicks(partyIdsArr,level_type,designationId,sortingType,cadreId,filterType,presentDateListArr,futureDateListArr,click_type,partyId,name);
	}else if(click_type == "pressmeetDesigSubClick"){
		getPressMeetOrCandidateDetailsByClicks(partyIdsArr,level_type,designationId,sortingType,cadreId,filterType,presentDateListArr,futureDateListArr,click_type,partyId,name);
	}
});

 function getDesignationWiseCandiadteCountClick(partyIdsArr,designationId,sortingType){
	  $("#meetingWiseWiseModalDivId").html(spinner);		
		var json={
			 "fromDateStr":customStartDate,
			"toDateStr": customEndDate,
			"state": "ap",
			"designationId":designationId,
			"partyIds":partyIdsArr,
			"sortingType":sortingType,//past senario
			 "debateLocationIdList":[1],
			 "debateParticipantLocationIdList":[1]
		};
	
	
	$.ajax({
		url: "getDesignationWiseCandiadteCountClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(response) {
			if(response !=null && response.length>0){
				buildDesignationWiseCandiadteCountClick(response,designationId,sortingType);
			}else{
				$("#meetingWiseWiseModalDivId").html("No Data Available");	
					
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
	
}

function buildDesignationWiseCandiadteCountClick(response,designationId,sortingType,click_type){
	var modalBlock='';
	modalBlock+='<div class="table-responsive">';
		modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0" id="coreDebatesDesigDataTable">';
			modalBlock+='<thead>';
				modalBlock+='<tr>';
					modalBlock+='<th>Candidate Name</th>';
					modalBlock+='<th>Debates</th>';
					modalBlock+='<th>OverAll Performance</th>';
					for(var i in response[0].subList){
						modalBlock+='<th>'+response[0].subList[i].name+'</th>';
					}
				modalBlock+='</tr>';
			modalBlock+='<thead>';
			modalBlock+='<tbody>';
			for(var i in response){
				modalBlock+='<tr>';
					modalBlock+='<td>'+response[i].candidateName+'</td>';
					modalBlock+='<td class="getCountClickDetailsCls" attr_partyId=" " attr_level_type="debate" attr_designationId="'+designationId+'" attr_sortingType="'+sortingType+'" attr_cadreId="'+response[i].candidateId+'" attr_filterType=" " attr_presentDateList=" " attr_futureDateList=" " attr_click_type="designationWiseSubClick" attr_name="'+response[i].candidateName+' DEBATE DETAILS">'+response[i].debateCount+'</td>';
					modalBlock+='<td>'+response[i].scalePerc+'</td>';
					for(var j in response[i].subList){
						modalBlock+='<td>'+response[i].subList[j].scalePerc+'</td>';
					}
				modalBlock+='</tr>';
			}
			modalBlock+='</tbody>';
		modalBlock+='</table>';
	modalBlock+='</div>';
	
	$("#meetingWiseWiseModalDivId").html(modalBlock);
	initializeDataTableWithPagination("coreDebatesDesigDataTable");
	
}

function getPressMeetOrCandidateDetailsByClicks(partyIdsArr,level_type,designationId,sortingType,cadreId,filterType,presentDateListArr,futureDateListArr,click_type,partyId,name){
	if(click_type == "pressmeetDesigSubClick"){
		$("#meetingWiseAttendanceDtsDivId").html(spinner);		
		var json={
			"fromDateStr": customStartDate,
			"toDateStr": customEndDate,
			"partyIds":partyIdsArr,
			"type":level_type,	//debate
			"designationId": designationId,
			"sortingType": sortingType,  // past or present 
			"cadreId" : cadreId,
			"filterType": filterType,	 //dayWise
			"presentDateList" : presentDateListArr,	//presentDateList (or) 
			"futureDateList" : futureDateListArr
		};
	}else{
		$("#meetingWiseWiseModalDivId").html(spinner);		
		var json={
			"fromDateStr": customStartDate,
			"toDateStr": customEndDate,
			"partyIds":partyIdsArr,
			"type":level_type,	//debate
			"designationId": designationId,
			"sortingType": sortingType,  // past or present 
			"cadreId" : cadreId,
			"filterType": filterType,	 //dayWise
			"presentDateList" : presentDateListArr,	//presentDateList (or) 
			"futureDateList" : futureDateListArr
		};
	}
	
	
	$.ajax({
		url: "getPressMeetOrCandidateDetailsByClicks",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(response) {
			if(response !=null && response.length>0){
				if(level_type == "candidate"){
					buildPressMeetOrCandidateSpokenDetailsByClicks(response,filterType,designationId,sortingType,partyId);
				}else{
					buildPressMeetOrCandidateDetailsByClicks(response,click_type,name);
				}
				
			}else{
				if(click_type == "pressmeetDesigSubClick"){
					$("#meetingWiseAttendanceDtsDivId").html("No Data Available");
				}else{
					$("#meetingWiseWiseModalDivId").html("No Data Available");
				}
						
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}

function buildPressMeetOrCandidateSpokenDetailsByClicks(response,filterType,designationId,sortingType,partyId){
	var modalBlock='';
		modalBlock+='<div class="table-responsive">';
			modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0" id="corePressmeetSpokenDataTable">';
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th>Candidate Name</th>';
						if(filterType == "designationCandidateWise"){
							modalBlock+='<th>PressMeets</th>';
						}else{
							modalBlock+='<th>Designation</th>';
						}
						
						modalBlock+='<th>Party Name</th>';
						for(var i in response[0].scaleList){
							modalBlock+='<th>'+response[0].scaleList[i].name+'</th>';
						}
					modalBlock+='</tr>';
				modalBlock+='<thead>';
				modalBlock+='<tbody>';
				for(var i in response){
					modalBlock+='<tr>';
						modalBlock+='<td>'+response[i].name+'</td>';
						if(filterType == "designationCandidateWise"){
							modalBlock+='<td class="getCountClickDetailsCls" attr_partyId="'+partyId+'" attr_level_type="pressmeet" attr_designationId="'+designationId+'" attr_sortingType="'+sortingType+'" attr_cadreId="'+response[i].id+'" attr_filterType="designationCandidateWise" attr_presentDateList=" " attr_futureDateList=" " attr_click_type="pressmeetDesigSubClick" attr_name="'+response[i].name+' DEBATE DETAILS">'+response[i].debateCount+'</td>';
						}else{
							modalBlock+='<td style="text-align:left !important;">'+response[i].candidateDesignation+'</td>';
						}
						
						modalBlock+='<td>'+response[i].partyName+'</td>';
						for(var j in response[i].scaleList){
							modalBlock+='<td>'+response[i].scaleList[j].scalePerc+'</td>';
						}
					modalBlock+='</tr>';
				}
					
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		modalBlock+='</div>';
		
	$("#meetingWiseWiseModalDivId").html(modalBlock);
	initializeDataTableWithPagination("corePressmeetSpokenDataTable");
	
}

function buildPressMeetOrCandidateDetailsByClicks(response,click_type,name){
	var modalBlock='';
		if(click_type == "pressmeetDesigSubClick"){
			modalBlock+='<div class="row">';
				modalBlock+='<div class="col-sm-12 m_top20">';
					modalBlock+='<h6 class="font_weight text-uppercase">'+name+'</h6>';
				modalBlock+='</div>';
			modalBlock+='</div>';
		}
			
		
		modalBlock+='<div class="table-responsive">';
			modalBlock+='<table class="table table-bordered table_custom_news m_bottom_0 m_top10" id="corePressmeetDataTable'+click_type+'">'; 
				modalBlock+='<thead>';
					modalBlock+='<tr>';
						modalBlock+='<th>Candidate Name</th>';
						modalBlock+='<th>Title</th>';
						modalBlock+='<th>Conducted Date</th>';
						modalBlock+='<th>Party Name</th>';
					modalBlock+='</tr>';
				modalBlock+='<thead>';
				modalBlock+='<tbody>';
				for(var i in response){
					modalBlock+='<tr>';
						modalBlock+='<td>'+response[i].candidateName+'</td>';
						modalBlock+='<td style="text-align:left !important;">'+response[i].name+'</td>';
						modalBlock+='<td>'+response[i].startTime+'</td>';
						modalBlock+='<td>'+response[i].partyName+'</td>';
					modalBlock+='</tr>';
				}
					
				modalBlock+='</tbody>';
			modalBlock+='</table>';
		modalBlock+='</div>';
	
	if(click_type == "pressmeetDesigSubClick"){
		$("#meetingWiseAttendanceDtsDivId").html(modalBlock);
	}else{
		$("#meetingWiseWiseModalDivId").html(modalBlock);
	}	
	
	initializeDataTableWithPagination("corePressmeetDataTable"+click_type);
}