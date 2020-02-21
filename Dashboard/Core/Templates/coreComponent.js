var CoreComponent = CoreComponent || {};
var componentsList = [];
CoreComponent.ajax = (function(){
    function dynamicAjaxCalls(levelType,blockId,inputParams,url,module_owner,icon,sub_heading,expandURL,mobileNo){
		$("#"+blockId).html(spinner);
		var json = inputParams || {};
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
				if(blockId == "specialMeetingId"){
					CoreComponent.buildAjaxCallResult.buildMainTailSpecialMeetingData(response,levelType,blockId,module_owner,icon,sub_heading,expandURL,mobileNo);
				}else{
					CoreComponent.buildAjaxCallResult.buildMainTailData(response,levelType,blockId,module_owner,icon,sub_heading,expandURL,mobileNo);
				}
				
			},
            failure: function(xhr) {
                return xhr;
            }
        });
		
    }
	function newsDynamicAjaxCalls(levelType,blockId,mainTailUrl,module_owner,icon,sub_heading,expandURL,mobileNo){
		$("#"+blockId).html(spinner);
		var fromDateNews = moment().subtract(1, 'Year').format('DD-MM-YYYY');
		var toDateNews =  moment().format('DD-MM-YYYY');
		var locationValue = 1;
		var locationId = 2;
		$.ajax({
			url: wurl+"/CommunityNewsPortal/webservice/"+mainTailUrl+"/"+fromDateNews+"/"+toDateNews+"/"+locationValue+"/"+locationId+"/"+globalpartyId+"/"+globalEditioinTypeId+"/"+globalBenefitId
		}).then(function(response){
			if(blockId == "printMediaId" || blockId == "elctronicMediaId"){
				CoreComponent.buildAjaxCallResult.buildMainTailData(response,levelType,blockId,module_owner,icon,sub_heading,expandURL,mobileNo);
			}else{
				CoreComponent.buildAjaxCallResult.buildMainTailEMCoverageData(response,levelType,blockId,module_owner,icon,sub_heading,expandURL,mobileNo);
			}
		});
		
    }
	
	
	return {
        dynamicAjaxCalls : dynamicAjaxCalls,
		newsDynamicAjaxCalls:newsDynamicAjaxCalls
    }
	
	
		
}());
CoreComponent.buildAjaxCallResult = (function(){
     function buildMainTailData(response,levelType,blockId,module_owner,icon,sub_heading,expandURL,mobileNo){
		var appendData='';
		var benefitName="";
		if(globalBenefitId == 1){
			benefitName = "+ve"
		}else{
			benefitName = "-ve"
		}
		if(response !=null && response.length>0){
			//appendData+='<div class="row">';
				for(var i in response){
					var rightSideTotalCount='';
					var subHeadingCount='';
					if(blockId == "politicalAlertId" || blockId == "actionBotsId" || blockId == "printMediaId" || blockId == "elctronicMediaId" || blockId  =="cbnArmyId" || blockId  == "trainingsId"){
						rightSideTotalCount = response[i].totalAlertCnt;
						subHeadingCount = response[i].actionInProgessCnt;
					}else if(blockId == "toursId"){
						rightSideTotalCount = response[i].noOfCandidate;
						subHeadingCount = response[i].total;
					}else{
						rightSideTotalCount = response[i].total;
						subHeadingCount = response[i].notConducted;
					}
					var changedBlockName="";
					if(blockId == "printMediaId"){
						changedBlockName = response[i].name+" PRINT MEDIA"
					}else if(blockId == "elctronicMediaId"){
						changedBlockName = response[i].name+" ELECTRONIC MEDIA"
					}else{
						changedBlockName = response[i].name
					}
					appendData+='<div class="col-sm-4 m_top15" id="'+changedBlockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';	
						appendData+='<div class="card border_relative">';
							  appendData+='<div class="card-body">';
								if(blockId == "debatesId"){
									appendData+='<h5 class="font_weight"><i class="fas fa-bell color_yash"></i> <span class="color_yash font_16 text-uppercase">DEBATES</h5>';
								}else if(blockId == "pressmeetsId"){
									appendData+='<h5 class="font_weight"><i class="fas fa-bell color_yash"></i> <span class="color_yash font_16 text-uppercase">PRESSMEETS</h5>';
								}else{
									if(response[i].name == "OVERALL"){
										appendData+='<h5 class="font_weight">'+icon+' <span class="color_yash font_16 text-uppercase">'+changedBlockName+'</span> - <span class="font_16">'+rightSideTotalCount+'</span></h5>';
									}else{
										appendData+='<h5 class="font_weight">'+icon+' <span class="color_yash font_16 text-uppercase">'+response[i].name+'</span> - <span class="font_16">'+rightSideTotalCount+'</span></h5>';
									}
									
								}
								
									appendData+='<div class="bg_yash_css pad_10 margin_left_right_10">';
										appendData+='<div class="row">';
											appendData+='<div class="col">';
												 if(blockId == "toursId"){
													appendData+='<h6 class="font_14 m_bottom_0 font_weight">'+sub_heading+' - <span class="font_weight font_14">'+subHeadingCount+'</span> <span class="float-right font_weight font_14"> PENDING - <span class="font_weight font_14">'+response[i].notConducted+'</span> <small class="color_red font_weight"> ('+response[i].percentage+'%)</small></span> </h6>';
												 }else if(blockId == "debatesId" || blockId == "pressmeetsId"){
													appendData+='<h6 class="font_14 m_bottom_0 font_weight">TDP RATING TILL NOW <span class="float-right font_weight font_16">'+response[i].percentage+'/5</span> </h6>';
												 }else if(blockId == "printMediaId" || blockId == "elctronicMediaId"){
												 		if(globalBenefitId == 1){
												 			appendData+='<h6 class="font_14 m_bottom_0 font_weight">'+sub_heading+'  <span class="float-right font_weight font_16">'+subHeadingCount+' <small class="color_green font_weight">('+response[i].percentage+'%)</small></span> </h6>';//pj
												 		}else{
												 			appendData+='<h6 class="font_14 m_bottom_0 font_weight">'+sub_heading+'  <span class="float-right font_weight font_16">'+subHeadingCount+' <small class="color_red font_weight">('+response[i].percentage+'%)</small></span> </h6>';//pj
												 		}
												 }else {
													appendData+='<h6 class="font_14 m_bottom_0 font_weight">'+sub_heading+'  <span class="float-right font_weight font_16">'+subHeadingCount+' <small class="color_red font_weight">('+response[i].percentage+'%)</small></span> </h6>';
												}
											appendData+='</div>';
										appendData+='</div>';
									appendData+='</div>';	
									
									appendData+='<div class="row">';
										for(var j in response[i].subList){
											if(response[i].subList.length == 4){
												appendData+='<div class="col-sm-6 m_top10 pad_left_right5">';
											}else{
												appendData+='<div class="col-sm-4 m_top10 pad_left_right5">';
											}
												appendData+='<div class="bg_yash_css pad_5">';
													if(blockId == "politicalAlertId" || blockId == "actionBotsId" || blockId == "debatesId" || blockId == "pressmeetsId" || blockId  =="cbnArmyId" || blockId  == "trainingsId" || blockId == "activitiesId"){
														appendData+='<h6 class="font_12 m_bottom_0 font_weight text-uppercase">'+response[i].subList[j].name+'</h6>';
													}else if(blockId == "meetingId" || blockId == "toursId"){
														appendData+='<h6 class="font_12 m_bottom_0 font_weight text-uppercase">'+response[i].subList[j].name+' - '+response[i].subList[j].total+'</h6>';
													}else if(blockId == "printMediaId" || blockId == "elctronicMediaId") {
														appendData+='<h6 class="font_12 m_bottom_0 font_weight text-uppercase">'+response[i].subList[j].name+'</h6>';
													}
													appendData+='<div class="bg_white_css m_top5">';
													if(blockId == "politicalAlertId"  || blockId == "actionBotsId"){
														appendData+='<h6 class="text-center font_weight tip" data-tip="tip-meeting'+blockId+''+i+''+j+'">';
															if(response[i].subList[j].impact == "positive"){
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class="color_green">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_green"></i></span>';
																}else{
																	appendData+='<span class="color_green">0.0 %</span>';
																}
																
															}else{
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class=" color_red">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_red"></i></span>';
																}else{
																	appendData+='<span class=" color_red">0.0 %</span>';
																}
																
															}
														appendData+='</h6>';	
													}else if(blockId == "meetingId" || blockId == "toursId" || blockId  == "activitiesId"){
														appendData+='<h6 class="text-center font_weight tip" data-tip="tip-meeting'+blockId+''+i+''+j+'">';
															if(response[i].subList[j].impact == "positive"){
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class="color_green">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_green"></i></span>';
																}else{
																	appendData+='<span class="color_green">0.0 %</span>';
																}
																
															}else{
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class=" color_red">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_red"></i></span>';
																}else{
																	appendData+='<span class=" color_red">0.0 %</span>';
																}
																
															}
														appendData+='</h6>';	
													}else if(blockId == "printMediaId" || blockId == "elctronicMediaId"){
														appendData+='<h6 class="text-center font_weight tip" data-tip="tip-meeting'+blockId+''+i+''+j+'">';
															if(response[i].subList[j].impact == "positive"){
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	if(globalBenefitId == 1){
																		appendData+='<span class="color_green checkStatusCls'+levelType+'" attr_statustype=1 attr_party_id="'+globalpartyId+'" attr_edn_type_id="'+globalEditioinTypeId+'">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_green"></i></span>';
																	}else{
																		appendData+='<span class="color_green checkStatusCls'+levelType+'" attr_statustype=2 attr_party_id="'+globalpartyId+'" attr_edn_type_id="'+globalEditioinTypeId+'">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_green"></i></span>';
																	}
																	
																}else{
																	appendData+='<span class="color_green">0.0 %</span>';
																}
																
															}else{
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	if(globalBenefitId == 1){
																		appendData+='<span class=" color_red checkStatusCls'+levelType+'" attr_statustype=1 attr_party_id="'+globalpartyId+'" attr_edn_type_id="'+globalEditioinTypeId+'">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_red"></i></span>';
																	}else{
																		appendData+='<span class=" color_red checkStatusCls'+levelType+'" attr_statustype=2 attr_party_id="'+globalpartyId+'" attr_edn_type_id="'+globalEditioinTypeId+'">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_red"></i></span>';
																	}
																	
																}else{
																	appendData+='<span class=" color_red">0.0 %</span>';
																}
																
															}
														appendData+='</h6>';
													}else if(blockId == "debatesId" || blockId == "pressmeetsId"){
														appendData+='<h6 class="text-center font_weight tip" data-tip="tip-meeting'+blockId+''+i+''+j+'">';
															if(response[i].subList[j].impact == "positive"){
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class="color_green">'+response[i].subList[j].percentage+'%</span> <span class=""><i class="fas fa-arrow-up color_green"></i></span>';
																}else{
																	appendData+='<span class="color_green">0.0 %</span>';
																}
																
															}else{
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class=" color_red">'+response[i].subList[j].percentage+'%</span> <span class=""><i class="fas fa-arrow-down color_red"></i></span>';
																}else{
																	appendData+='<span class=" color_red">0.0 %</span>';
																}
																
															}
														appendData+='</h6>';
													}else if(blockId  =="cbnArmyId"){
														appendData+='<h6 class="text-center font_weight tip" data-tip="tip-meeting'+blockId+''+i+''+j+'">';
															if(response[i].subList[j].impact == "positive"){
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class="color_green">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_green"></i></span>';
																}else{
																	appendData+='<span class="color_green">0.0 %</span>';
																}
																
															}else{
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class=" color_red">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_red"></i></span>';
																}else{
																	appendData+='<span class=" color_red">0.0 %</span>';
																}
																
															}
														appendData+='</h6>';	
													}else if(blockId  == "trainingsId"){
														appendData+='<h6 class="text-center font_weight tip" data-tip="tip-meeting'+blockId+''+i+''+j+'">';
															if(response[i].subList[j].impact == "positive"){
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class="color_green">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_green"></i></span>';
																}else{
																	appendData+='<span class="color_green">0.0 %</span>';
																}
																
															}else{
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	appendData+='<span class=" color_red">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_red"></i></span>';
																}else{
																	appendData+='<span class=" color_red">0.0 %</span>';
																}
																
															}
														appendData+='</h6>';	
													}
													
														appendData+='<div id="tip-meeting'+blockId+''+i+''+j+'" class="tip-content hidden">';
															if(blockId == "politicalAlertId" || blockId == "actionBotsId" ||  blockId  =="cbnArmyId" || blockId  == "trainingsId"){
																appendData+='<h6 class="align_left">Present - <b>'+response[i].subList[j].presentTotal+'</b></h6>'; 
																appendData+='<h6 class="align_left">Past - <b>'+response[i].subList[j].futureTotal+'</b></h6>'; 
															}else if(blockId == "meetingId" || blockId == "toursId"){
																appendData+='<h6 class="align_left">Present : Y - <b>'+response[i].subList[j].presentConducted+'</b>, N - <b>'+response[i].subList[j].presentNotConducted+'</b></h6>'; 
																appendData+='<h6 class="align_left">Past : Y - <b>'+response[i].subList[j].futureConducted+'</b></h6>'; 
															}else if(blockId == "debatesId" || blockId == "pressmeetsId"){
																appendData+='<h6 class="align_left">Present - <b>'+response[i].subList[j].scalePerc+'</b></h6>'; 
																appendData+='<h6 class="align_left">Past - <b>'+response[i].subList[j].pastScalePerc+'</b></h6>'; 
															}else if(blockId == "printMediaId" || blockId == "elctronicMediaId"){
																
																appendData+='<h6 class="align_left">Present- Total- <b>'+response[i].subList[j].reopenCount+'</b> , '+benefitName+' <b>'+response[i].subList[j].presentTotal+'</b> (<b> '+response[i].subList[j].overAllPer+'% </b>)</h6>'; 
																
																appendData+='<h6 class="align_left">Past- Total- <b>'+response[i].subList[j].reopenCountForOfficer+'</b> , '+benefitName+' <b>'+response[i].subList[j].futureTotal+'</b> (<b> '+response[i].subList[j].grandOverAllper+'% </b>)</h6>'; 
															}else if(blockId  == "activitiesId"){
																appendData+='<h6 class="align_left">Present - <b>'+response[i].subList[j].presentConducted+'</b></h6>'; 
																appendData+='<h6 class="align_left">Past - <b>'+response[i].subList[j].futureConducted+'</b></h6>'; 
															}
																
														appendData+='</div>';
													appendData+='</div>';
												appendData+='</div>';
											appendData+='</div>';
										}
										appendData+='</div>';
									
								appendData+='</div>';
							  
							 appendData+='<div class="card-footer pad_3">';
									appendData+='<div class="row">';
											appendData+='<div class="col">';
												if(blockId == "actionBotsId"){
													var mobileNoObj={'Peddi Rama Rao':'9391005610','G Rajesh':'9989910909'};
													appendData+='<span class="font_14 font_weight m_top5 text-uppercase" style="margin-left: 10px;">'+response[i].ownerName+' <a class="fa fa-phone tooltipCls" data-toggle="tooltip" title="" style="margin-left:5px;transform: rotate(100deg);cursor:pointer;" data-original-title="+91 '+mobileNoObj[response[i].ownerName]+'" href="tel:+91 '+mobileNoObj[response[i].ownerName]+'"></a></span>'; 
												}else{
													appendData+='<span class="font_14 font_weight m_top5 text-uppercase" style="margin-left: 10px;">'+module_owner+' <a class="fa fa-phone tooltipCls" data-toggle="tooltip" title="" style="margin-left:5px;transform: rotate(100deg);cursor:pointer;" data-original-title="+91 '+mobileNo+'" href="tel:+91 '+mobileNo+'"></a></span>';
												}
												
												if(blockId == "politicalAlertId"){
													
													if(response[i].name =="POLITICAL ALERTS"){
														appendData+='<span class="float-right"><a href="'+expandURL+'?type=withoutstatus" target="_blank" style="color:#000"><i class="fas fa-external-link-alt tooltipCls" style="margin-right: 10px;" data-toggle="tooltip" title="Read More" data-placement="top"></i></a></span>';
														
														
													}
														appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="'+response[i].id+'" attr_block_name="'+response[i].name+'" attr_alert_categoryIds="'+response[i].categotyIdList+'" style="margin-right: 20px;"></i></span>';
													
												}else if(blockId == "meetingId" || blockId == "actionBotsId" || blockId == "toursId"  || blockId == "printMediaId" || blockId == "elctronicMediaId" || blockId == "debatesId" || blockId == "pressmeetsId" || blockId == "cbnArmyId" || blockId  == "trainingsId"){
													
													if(blockId == "printMediaId"){
														appendData+='<span class="float-right"><i data-toggle="tooltip" title="Map View" data-placement="top" class="fas fa-map-marker-alt coreDashBoardModalViewCls tooltipCls" attr_view_type="map" attr_div_id="'+blockId+'" attr_block_value="'+response[i].id+'" attr_block_name="'+response[i].name+'" attr_alert_categoryIds="'+response[i].categotyIdList+'" style="margin-right: 20px;"></i></span>';
													}
													
													if(typeof response[i].id !=null && typeof response[i].id !="undefined"){
														appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="'+response[i].id+'" attr_block_name="'+response[i].name+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
													}else{
														appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="0" attr_block_name="'+response[i].name+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
														
													}
													
												}else if(blockId  == "activitiesId"){
													appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="'+response[i].typeId+'"  attr_block_Subvalue="'+response[i].subTypeId+'" attr_block_name="'+response[i].name+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
												}
												appendData+=''+CoreComponent.favourite.buildIcon(changedBlockName)+'';
												appendData+='<span style="float: right;margin-right: 10px;margin-top: -2px;display:none;" class="addRemoveFavLoadingId'+changedBlockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'"><img src="Core/images/smallLoader.gif" style="width:15px;height:15px;"/></span>';
											appendData+='</div>';
									appendData+='</div>';
							  appendData+='</div>';
						appendData+='</div>';
					appendData+='</div>';	
				}
			//appendData+='</div>';
		}else{
			appendData+='<h5 class="">No Data Available</h6> '; 
		}
		
		$("#"+blockId).html('<div class="row">'+appendData+'</div>');
		
		
		for(var i in response){
			var favBlockName="";
			if(blockId == "printMediaId"){
				favBlockName = response[i].name+" PRINT MEDIA"
			}else if(blockId == "elctronicMediaId"){
				favBlockName = response[i].name+" ELECTRONIC MEDIA"
			}else{
				favBlockName = response[i].name
			}
			var blockName = favBlockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
			if(getFavouriteTrue(componentsList,blockName) && $("#favouritesDivId").find("#"+blockName).length == 0){
				var data = $("#"+blockName).html();
				$("#favouritesDivId").find('.d2d-loader').closest('.row').remove();
				$("#favouritesDivId").append('<div class="col-sm-4" favBlock="'+blockName+'">'+data+'</div>');
			}
		}
		
		
		$(".tooltipCls").tooltip();
		$('.tip').each(function () {
			$(this).tooltip(
			{
				html: true,
				title: $('#' + $(this).data('tip')).html()
			});
		});
		
		
		
	}
	
	 function buildMainTailEMCoverageData(response,levelType,blockId,module_owner,icon,sub_heading,expandURL,mobileNo){
		var appendData='';
		var benefitName="";
		if(globalBenefitId == 1){
			benefitName = "+ve"
		}else{
			benefitName = "-ve"
		}
		if(response !=null && response.length>0){
			//appendData+='<div class="row">';
				for(var i in response){
					var changedBlockName = response[i].name+" EM COVERAGE TIME"
					
					
					appendData+='<div class="col-sm-4 m_top15" id="'+changedBlockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';	
						appendData+='<div class="card border_relative">';
							  appendData+='<div class="card-body">';
								if(response[i].name == "OVERALL"){
									appendData+='<h5 class="font_weight">'+icon+' <span class="color_yash font_16 text-uppercase">'+changedBlockName+'</span> - <span class="font_16">'+response[i].overAllCoveredTime+'</span></h5>';
								}else{
									appendData+='<h5 class="font_weight">'+icon+' <span class="color_yash font_16 text-uppercase">'+response[i].name+'</span> - <span class="font_16">'+response[i].overAllCoveredTime+'</span></h5>';
								}
								
								
									appendData+='<div class="bg_yash_css pad_10 margin_left_right_10">';
										appendData+='<div class="row">';
											appendData+='<div class="col">';
												 if(globalBenefitId == 1){
														appendData+='<h6 class="font_14 m_bottom_0 font_weight">'+sub_heading+'  <span class="float-right font_weight font_16">'+response[i].overAllBenefitTime+' <small class="color_green font_weight">('+response[i].percentage+'%)</small></span> </h6>';//pj
													}else{
														appendData+='<h6 class="font_14 m_bottom_0 font_weight">'+sub_heading+'  <span class="float-right font_weight font_16">'+response[i].overAllBenefitTime+' <small class="color_red font_weight">('+response[i].percentage+'%)</small></span> </h6>';//pj
													}
											appendData+='</div>';
										appendData+='</div>';
									appendData+='</div>';	
									
									appendData+='<div class="row">';
										for(var j in response[i].subList){
											if(response[i].subList.length == 4){
												appendData+='<div class="col-sm-6 m_top10 pad_left_right5">';
											}else{
												appendData+='<div class="col-sm-4 m_top10 pad_left_right5">';
											}
												appendData+='<div class="bg_yash_css pad_5">';
													appendData+='<h6 class="font_12 m_bottom_0 font_weight text-uppercase">'+response[i].subList[j].name+'</h6>';
													appendData+='<div class="bg_white_css m_top5">';
													
														appendData+='<h6 class="text-center font_weight tip" data-tip="tip-meeting'+blockId+''+i+''+j+'">';
															if(response[i].subList[j].impact == "positive"){
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	if(globalBenefitId == 1){
																		appendData+='<span class="color_green checkStatusCls'+levelType+'" attr_statustype=1 attr_party_id="'+globalpartyId+'" attr_edn_type_id="'+globalEditioinTypeId+'">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_green"></i></span>';
																	}else{
																		appendData+='<span class="color_green checkStatusCls'+levelType+'" attr_statustype=2 attr_party_id="'+globalpartyId+'" attr_edn_type_id="'+globalEditioinTypeId+'">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_green"></i></span>';
																	}
																	
																}else{
																	appendData+='<span class="color_green">0.0 %</span>';
																}
																
															}else{
																if(typeof response[i].subList[j].percentage !=null && typeof response[i].subList[j].percentage  != "undefined" && typeof response[i].subList[j].percentage != undefined && response[i].subList[j].percentage>0){
																	if(globalBenefitId == 1){
																		appendData+='<span class=" color_red checkStatusCls'+levelType+'" attr_statustype=1 attr_party_id="'+globalpartyId+'" attr_edn_type_id="'+globalEditioinTypeId+'">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_red"></i></span>';
																	}else{
																		appendData+='<span class=" color_red checkStatusCls'+levelType+'" attr_statustype=2 attr_party_id="'+globalpartyId+'" attr_edn_type_id="'+globalEditioinTypeId+'">'+response[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_red"></i></span>';
																	}
																	
																}else{
																	appendData+='<span class=" color_red">0.0 %</span>';
																}
																
															}
														appendData+='</h6>';
													
													
														appendData+='<div id="tip-meeting'+blockId+''+i+''+j+'" class="tip-content hidden">';
																appendData+='<h6 class="align_left">Present- Total- <b>'+response[i].subList[j].presentTotalCoveredTime+'</b> , '+benefitName+' <b>'+response[i].subList[j].overAllCoveredTime+'</b> (<b> '+response[i].subList[j].overAllPer+'% </b>)</h6>'; 
																
																appendData+='<h6 class="align_left">Past- Total- <b>'+response[i].subList[j].pastTotalCoveredTime+'</b> , '+benefitName+' <b>'+response[i].subList[j].overAllBenefitTime+'</b> (<b> '+response[i].subList[j].grandOverAllper+'% </b>)</h6>';
																
														appendData+='</div>';
													appendData+='</div>';
												appendData+='</div>';
											appendData+='</div>';
										}
										appendData+='</div>';
									
								appendData+='</div>';
							  
							 appendData+='<div class="card-footer pad_3">';
									appendData+='<div class="row">';
											appendData+='<div class="col">';
													appendData+='<span class="font_14 font_weight m_top5 text-uppercase" style="margin-left: 10px;">'+module_owner+' <a class="fa fa-phone tooltipCls" data-toggle="tooltip" title="" style="margin-left:5px;transform: rotate(100deg);cursor:pointer;" data-original-title="'+mobileNo+'" href="tel:'+mobileNo+'"></a></span>';
												
													//appendData+='<span class="float-right"><a href="'+expandURL+'?type=withoutstatus" target="_blank" style="color:#000"><i class="fas fa-external-link-alt tooltipCls" style="margin-right: 10px;" data-toggle="tooltip" title="Read More" data-placement="top"></i></a></span>';
													
													 if(typeof response[i].id !=null && typeof response[i].id !="undefined"){
														appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="'+response[i].id+'" attr_block_name="'+response[i].name+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
													}else{
														appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="0" attr_block_name="'+response[i].name+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
														
													} 
													
												appendData+=''+CoreComponent.favourite.buildIcon(changedBlockName)+'';
												appendData+='<span style="float: right;margin-right: 10px;margin-top: -2px;display:none;" class="addRemoveFavLoadingId'+changedBlockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'"><img src="Core/images/smallLoader.gif" style="width:15px;height:15px;"/></span>';
											appendData+='</div>';
									appendData+='</div>';
							  appendData+='</div>';
						appendData+='</div>';
					appendData+='</div>';	
				}
			//appendData+='</div>';
		}else{
			appendData+='<h5 class="">No Data Available</h6> '; 
		}
		
		$("#"+blockId).html('<div class="row">'+appendData+'</div>');
		
		for(var i in response){
			var favBlockName=response[i].name+" EM COVERAGE TIME";
			var blockName = favBlockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
			if(getFavouriteTrue(componentsList,blockName) && $("#favouritesDivId").find("#"+blockName).length == 0){
				var data = $("#"+blockName).html();
				$("#favouritesDivId").find('.d2d-loader').closest('.row').remove();
				$("#favouritesDivId").append('<div class="col-sm-4" favBlock="'+blockName+'">'+data+'</div>');
			}
		}
		
		$(".tooltipCls").tooltip();
		$('.tip').each(function () {
			$(this).tooltip(
			{
				html: true,
				title: $('#' + $(this).data('tip')).html()
			});
		});
	}
	
	
	function buildMainTailSpecialMeetingData(response,levelType,blockId,module_owner,icon,sub_heading,expandURL,mobileNo){
		var appendData='';
		if(response !=null && response.subList	 !=null && response.subList.length>0){
			appendData+='<div class="bg_white_padding m_top20" style="border:1px solid #ddd;">';
				appendData+='<div class="row">';
					appendData+='<div class="col-sm-12">';
						appendData+='<h5 class="font_weight color_yash m_bottom_0 m_top10">SPECIAL MEETINGS - ON GOING</h5>';
					appendData+='</div>';
				appendData+='</div>';
				
				appendData+='<div class="row">';
					for(var i in response.subList){
						appendData+='<div class="col-sm-4 m_top15" id="'+response.subList[i].name.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';	
							appendData+='<div class="card border_relative">';
								  appendData+='<div class="card-body">';
									
									appendData+='<h5 class="font_weight">'+icon+' <span class="color_yash font_16 text-uppercase">'+response.subList[i].name+'</span> - <span class="font_16">'+response.subList[i].count+'</span></h5>';
									
										appendData+='<div class="bg_yash_css pad_10 margin_left_right_10">';
											appendData+='<div class="row">';
												appendData+='<div class="col">';
													appendData+='<h6 class="font_14 m_bottom_0 font_weight">'+sub_heading+'  <span class="float-right font_weight font_16">'+response.subList[i].inviteeAbsentCount+' <small class="color_red font_weight">('+response.subList[i].inviteeAbsentPerc+'%)</small></span> </h6>';
												appendData+='</div>';
											appendData+='</div>';
										appendData+='</div>';	
										
										appendData+='<div class="row">';
											for(var j in response.subList[i].subList){
												appendData+='<div class="col-sm-4 m_top10 pad_left_right5">';
												
													appendData+='<div class="bg_yash_css pad_5">';
														if(response.subList[i].subList[j].name !=null && response.subList[i].subList[j].name.length>8){
															appendData+='<h6 class="font_12 m_bottom_0 font_weight text-uppercase tooltipCls" data-toggle="tooltip" data-placement="top" title="'+response.subList[i].subList[j].name+'">'+response.subList[i].subList[j].name.substring(0,8)+'.. - '+response.subList[i].subList[j].count+'</h6>';
														}else{
															appendData+='<h6 class="font_12 m_bottom_0 font_weight text-uppercase">'+response.subList[i].subList[j].name+' - '+response.subList[i].subList[j].count+'</h6>';
														}
														
														
														appendData+='<div class="bg_white_css m_top5">';
															appendData+='<h6 class="text-center font_weight">';
																if(typeof response.subList[i].subList[j].inviteeAttendedPerc !=null && typeof response.subList[i].subList[j].inviteeAttendedPerc  != "undefined" && typeof response.subList[i].subList[j].inviteeAttendedPerc != undefined && response.subList[i].subList[j].inviteeAttendedPerc>0){
																	appendData+='<span class="">'+response.subList[i].subList[j].inviteeAttendedPerc.toFixed(1)+'%</span>';
																}else{
																	appendData+='<span class="">0.0 %</span>';
																}
															appendData+='</h6>';	
														appendData+='</div>';
													appendData+='</div>';
												appendData+='</div>';
											}
											appendData+='</div>';
										
									appendData+='</div>';
								  
								 appendData+='<div class="card-footer pad_3">';
										appendData+='<div class="row">';
												appendData+='<div class="col">';
													appendData+='<span class="font_14 font_weight m_top5 text-uppercase" style="margin-left: 10px;">'+module_owner+' <a class="fa fa-phone tooltipCls" data-toggle="tooltip" title="" style="margin-left:5px;transform: rotate(100deg);cursor:pointer;" data-original-title="+91 '+mobileNo+'" href="tel:+91 '+mobileNo+'"></a></span>';
													
													/* if(typeof response.subList[i].id !=null && typeof response.subList[i].id !="undefined"){
														appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="'+response.subList[i].id+'" attr_block_name="'+response.subList[i].name+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
													}else{
														appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="0" attr_block_name="'+response.subList[i].name+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
														
													} */
													
													appendData+=''+CoreComponent.favourite.buildIcon(response.subList[i].name)+'';
													appendData+='<span style="float: right;margin-right: 10px;margin-top: -2px;display:none;" class="addRemoveFavLoadingId'+response.subList[i].name.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'"><img src="Core/images/smallLoader.gif" style="width:15px;height:15px;"/></span>';
												appendData+='</div>';
										appendData+='</div>';
								  appendData+='</div>';
							appendData+='</div>';
						appendData+='</div>';
					}
				appendData+='</div>';	
			appendData+='</div>';	
		}
		
		if(response !=null && response.subList2	 !=null && response.subList2.length>0){
			appendData+='<div class="row">';
				for(var i in response.subList2){
					appendData+='<div class="col-sm-4 m_top20" id="'+response.subList2[i].name.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';	
						appendData+='<div class="card border_relative">';
							  appendData+='<div class="card-body">';
								
								appendData+='<h5 class="font_weight">'+icon+' <span class="color_yash font_16 text-uppercase">'+response.subList2[i].name+'</span> - <span class="font_16">'+response.subList2[i].totalInvitees+'</span></h5>';
								
									appendData+='<div class="bg_yash_css pad_10 margin_left_right_10">';
										appendData+='<div class="row">';
											appendData+='<div class="col">';
												appendData+='<h6 class="font_14 m_bottom_0 font_weight">'+sub_heading+'  <span class="float-right font_weight font_16">'+response.subList2[i].totalNotAttended+' <small class="color_red font_weight">('+response.subList2[i].totalNotAttendedPerc+'%)</small></span> </h6>';
											appendData+='</div>';
										appendData+='</div>';
									appendData+='</div>';	
									
									appendData+='<div class="row">';
										for(var j in response.subList2[i].subList){
											appendData+='<div class="col-sm-6 m_top10 pad_left_right5">';
											
												appendData+='<div class="bg_yash_css pad_5">';
													appendData+='<h6 class="font_12 m_bottom_0 font_weight text-uppercase">'+response.subList2[i].subList[j].name+'</h6>';
													appendData+='<div class="bg_white_css m_top5">';
														appendData+='<h6 class="text-center font_weight tip" data-tip="tip-meeting'+blockId+''+i+''+j+'">';
															if(response.subList2[i].subList[j].impact == "positive"){
																if(typeof response.subList2[i].subList[j].percentage !=null && typeof response.subList2[i].subList[j].percentage  != "undefined" && typeof response.subList2[i].subList[j].percentage != undefined && response.subList2[i].subList[j].percentage>0){
																	appendData+='<span class="color_green">'+response.subList2[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-up color_green"></i></span>';
																}else{
																	appendData+='<span class="color_green">0.0 %</span>';
																}
																
															}else{
																if(typeof response.subList2[i].subList[j].percentage !=null && typeof response.subList2[i].subList[j].percentage  != "undefined" && typeof response.subList2[i].subList[j].percentage != undefined && response.subList2[i].subList[j].percentage>0){
																	appendData+='<span class=" color_red">'+response.subList2[i].subList[j].percentage.toFixed(1)+'%</span> <span class=""><i class="fas fa-arrow-down color_red"></i></span>';
																}else{
																	appendData+='<span class=" color_red">0.0 %</span>';
																}
																
															}
														appendData+='</h6>';	
													
														appendData+='<div id="tip-meeting'+blockId+''+i+''+j+'" class="tip-content hidden">';
															appendData+='<h6 class="align_left">Present : Invitees - <b>'+response.subList2[i].subList[j].presentTotalInviteed+'</b>,Invitee Attendend - <b>'+response.subList2[i].subList[j].presentTotalAttended+'</b></h6>'; 
															appendData+='<h6 class="align_left">Past : Invitees - <b>'+response.subList2[i].subList[j].pastTotalInviteed+'</b> ,Invitee Attendend - <b>'+response.subList2[i].subList[j].pastTotalAttended+'</b></h6>'; 
																
														appendData+='</div>';
													appendData+='</div>';
												appendData+='</div>';
											appendData+='</div>';
										}
										appendData+='</div>';
									
								appendData+='</div>';
							  
							 appendData+='<div class="card-footer pad_3">';
									appendData+='<div class="row">';
											appendData+='<div class="col">';
												appendData+='<span class="font_14 font_weight m_top5 text-uppercase" style="margin-left: 10px;">'+module_owner+' <a class="fa fa-phone tooltipCls" data-toggle="tooltip" title="" style="margin-left:5px;transform: rotate(100deg);cursor:pointer;" data-original-title="+91 '+mobileNo+'" href="tel:+91 '+mobileNo+'"></a></span>';
												
												if(typeof response.subList2[i].id !=null && typeof response.subList2[i].id !="undefined"){
													appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="'+response.subList2[i].id+'" attr_block_name="'+response.subList2[i].name+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
												}else{
													appendData+='<span class="float-right"><i data-toggle="tooltip" title="Expand View" data-placement="top" class="fas fa-expand coreDashBoardModalViewCls tooltipCls" attr_view_type="details" attr_div_id="'+blockId+'" attr_block_value="0" attr_block_name="'+response.subList2[i].name.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" attr_alert_categoryIds="" style="margin-right: 20px;"></i></span>';
													
												}
												
												appendData+=''+CoreComponent.favourite.buildIcon(response.subList2[i].name)+'';
												appendData+='<span style="float: right;margin-right: 10px;margin-top: -2px;display:none;" class="addRemoveFavLoadingId'+response.subList2[i].name.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'"><img src="Core/images/smallLoader.gif" style="width:15px;height:15px;"/></span>';
											appendData+='</div>';
									appendData+='</div>';
							  appendData+='</div>';
						appendData+='</div>';
					appendData+='</div>';	
				}
			appendData+='</div>';
		}else{
			appendData+='<h5 class="">No Data Available</h6> '; 
		}
		
		$("#"+blockId).html(''+appendData+'');
		$(".tooltipCls").tooltip();
		
		for(var i in response.subList2){
			var favBlockName=response.subList2[i].name;
			
			var blockName = favBlockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
			if(getFavouriteTrue(componentsList,blockName) && $("#favouritesDivId").find("#"+blockName).length == 0){
				var data = $("#"+blockName).html();
				$("#favouritesDivId").find('.d2d-loader').closest('.row').remove();
				$("#favouritesDivId").append('<div class="col-sm-4" favBlock="'+blockName+'">'+data+'</div>');
			}
		}
		
		
		for(var i in response.subList){
			var favBlockName=response.subList[i].name;
			
			var blockName = favBlockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
			if(getFavouriteTrue(componentsList,blockName) && $("#favouritesDivId").find("#"+blockName).length == 0){
				var data = $("#"+blockName).html();
				$("#favouritesDivId").find('.d2d-loader').closest('.row').remove();
				$("#favouritesDivId").append('<div class="col-sm-4" favBlock="'+blockName+'">'+data+'</div>');
			}
		}
		
		
	}
	
	return {
        buildMainTailData : buildMainTailData,
		buildMainTailEMCoverageData:buildMainTailEMCoverageData,
		buildMainTailSpecialMeetingData:buildMainTailSpecialMeetingData
	}
}());

function getFavouriteTrue(array,name){
	
	function components(favourite) {
		return favourite === name;
	}
	
	
	return array.find(components);
}

CoreComponent.favourite = (function(){
	
	function buildIcon(blockName){
		blockName = blockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
		if(getFavouriteTrue(componentsList,blockName)){
			return "<i class='favouriteCls fas fa-star float-right favourite rotate-center' type='selected' favouriteBlock="+blockName+"></i>";
		}else{
			return "<i class='favouriteCls far fa-star float-right favourite' type='notSelected' favouriteBlock="+blockName+"></i>";
		}
		
	}
	function init(){
		$(document).on('click','.favouriteCls',function(){
			var type = $(this).attr('type'),
				blockName = $(this).attr('favouriteBlock');
			if(type === 'notSelected' && type){
				saveComponent(blockName)
			}else if(type === 'selected' && type){
				deleteComponent(blockName)
			}
		});
	}
	function saveComponent(blockName){
		$(".addRemoveFavLoadingId"+blockName).show();
		$(".noFavComCls").remove();
		var json = {
			name:blockName
		}
		$.ajax({                
			type:'POST',    
			url: 'saveFavouriteComponentDtls',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			$(".addRemoveFavLoadingId"+blockName).hide();
			filter(blockName,'add',result);
		});    
	}
	function deleteComponent(blockName){
		$(".addRemoveFavLoadingId"+blockName).show();
		var json = {
			name:blockName
		}
		$.ajax({                
			type:'POST',    
			url: 'deleteFavouriteComponent',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			$(".addRemoveFavLoadingId"+blockName).hide();
			if(result.message == "success"){
				filter(blockName,'remove',result);
				if($("#favouritesDivId").find("[favBlock]").length == 0){
					$("#favouritesDivId").html("<div class='col-sm-12 noFavComCls'><h6 class='m_top20 font_weight'>You Don't Have Any favourites Components</h6></div>")
				}else{
					$(".noFavComCls").remove();
				}
			}
			
		});    
	}
	function getComponent(blockName){
		$("#favouritesDivId").html(spinner);
		var componentNameArr = [];
		var json = {componentNameList:[]} 
		$.ajax({                
			type:'POST',    
			url: 'getFavouriteComponents',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result !=null && result.length>0){
				$(".noFavComCls").remove();
				for(var i in result){
					componentsList.push(result[i].name)
				}
			}else{
				$("#favouritesDivId").html("<div class='col-sm-12 noFavComCls'><h6 class='m_top20 font_weight'>You Don't Have Any favourites Components</h6></div>")
			}
			
		});    
	}
	function filter(blockId,type,result){
		if(type == 'add'){
			var data = $("#"+blockId).html();
			$("#favouritesDivId").find('.d2d-loader').closest('.row').remove();
			$("#favouritesDivId").append('<div class="col-sm-4" favBlock="'+blockId+'">'+data+'</div>');
			$("[favouriteBlock="+blockId+"]").attr('type','selected').addClass("fas rotate-center").removeClass("far");
			$("#modalOverViewBlockDivId").html('<div class="modal-body text-center text-success font_weight" style="padding:20px;font-size:20px;">BLOCK ADDED SUCCESSFULLY</div>')
		}else if(type == 'remove'){
			$("[favBlock="+blockId+"]").remove();
			$("[favouriteBlock="+blockId+"]").attr('type','notSelected').removeClass("fas").addClass("far");
			$("#modalOverViewBlockDivId").html('<div class="modal-body text-center text-danger font_weight" style="padding:20px;font-size:20px;">BLOCK REMOVED SUCCESSFULLY</div>')
		}
		$("#overViewDetailsModalDivId").find('.modal-dialog').css("min-width",'30%');
		$("#overViewDetailsModalDivId").modal('show');
		
		
		setTimeout(function(){
			$("[favouriteBlock="+blockId+"]").removeClass("rotate-center");
			//$("#overViewDetailsModalDivId").find('.modal-dialog').css("min-width",'65%');
			$("#overViewDetailsModalDivId").modal('hide');
			$("#modalOverViewBlockDivId").html('');
		},2000)
	}
	return {
		init : init,
		saveComponent: saveComponent,
		deleteComponent: deleteComponent,
		getComponent: getComponent,
		buildIcon:buildIcon
	};
}());

CoreComponent.datepicker = (function(){
   function datepickerMeetingInit( initId ) {
		var datePickerBlock = '';
		datePickerBlock+='<span type="text" class="" id="' + initId + '">CUSTOM DATE RANGE</span>';
		$( '[init-id=' + initId + ']' ).html( datePickerBlock );
	}
	function datepickerInit( initId ) {
		var dateRangesPickerBlock = '';
		
		dateRangesPickerBlock+='<div class="input-group" style="width: 265px;">';
			 dateRangesPickerBlock+='<div class="input-group-prepend">';
				dateRangesPickerBlock+='<span class="input-group-text" id="basic-addon1"><i class="fas fa-calendar-alt"></i></span>';
			 dateRangesPickerBlock+='</div>';
			  dateRangesPickerBlock+='<input type="text" class="form-control" id="' + initId + '">';
			dateRangesPickerBlock+='</div>'; 
		$( 'dateRangePicker[init-id=' + initId + ']' ).html( dateRangesPickerBlock );
	}
	function datePickerExtraVal( id, extra ) {
		$( '#' + id ).daterangepicker( extra );
	}
	return {
		datePickerExtraVal: datePickerExtraVal,
		datepickerMeetingInit: datepickerMeetingInit,
		datepickerInit:datepickerInit
	};
}());