var candidateReferralDoc=[];
var projectDocuments=[];
var coveringLetterDoc=[];
var detailedReportDoc=[];
var globalStatusArr=[];
var selectdWorksArr=[];
var departmentSelectArr=[];
var mainWorkCoveringDocuments=[];
var historyLetterArr=[];
var historyDocsArr=[];
var glPetitionId=0;
var  globalDesignationName= '';
var  globalDesignationId= 0;
$('#actionTypeStr').val('COMPLETED');
var globalReviewStatus='';
var globalActionName='';
var assignedBy='';
var assignedTo='';
var globalActionId='';
var subjectIdsArr=[];
var selectionType="";
/*
$(document).on("click",".actionCls",function(){
	var isSelected=false;
	$(this).each(function(){
		if($(this).is(":checked")){
			 isSelected=true;
		}
	});
	
	if(!isSelected){
		$(this).prop("checked",true);
	}
	$("#finalapproveFile").html('');
	$('.actionCls').not(this).removeAttr('checked');
	var value = $(this).val();
	$("#endorsWorksId").html('Save Details')
	$("#assignToId,#officerId,#actionTypId,#documentTypeId,#referranceNoDivId").val('0');
	$("#assignToId,#officerId,#actionTypId,#documentTypeId,#referranceNoDivId").trigger("chosen:updated");
		
	if(value == "ASSIGNED"){
		if(globalReviewStatus == "ASSIGNED"){
				if($(this).is(":checked")){
					$("#statusChangeDivId").hide();
					$("#assignDesignationDivId").show();
					$("#assignOfficerDivId").show();
					$("#fileUploadDiv").hide();
					$("#assighTypeId").show();
					getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr);
					$('#actionTypeStr').val(value);
			}else{
				// $(".actionChangeCls").hide();
				 $("#statusChangeDivId").hide();
				 $("#fileUploadDiv").show();
				 $("#assignDesignationDivId").hide();
				 $("#assignOfficerDivId").hide();
				 $("#assighTypeId").hide();
				 $("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
				 initializeSingleUploadDocument("uploadEndorsementDocId");	
				 $("#endorsWorksId").html('Save Details')
				 $('#actionTypeStr').val('REVIEW');
			}
		}else{
			if($(this).is(":checked")){
				$("#statusChangeDivId").hide();
				$("#uploadFileDivCls").hide();
				$("#finalApproDocDiv").hide();
				$("#documentTypeDivId").hide();
				$("#referranceNoDivId").hide();
				$("#assignDesignationDivId").show();
				$("#assignOfficerDivId").show();
				$("#fileUploadDiv").hide();
				$("#assighTypeId").show();
				getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr);
				$('#actionTypeStr').val(value);
			}else{
				
			}
			
		}
		
		
		
	}else{
		if(globalReviewStatus == "COMPLETED"){
			$("#statusChangeId").val('0')
			$("#statusChangeId").trigger("chosen:updated");
			$("#statusChangeDivId").show();
			$("#uploadFileDivCls").show();
			$("#finalApproDocDiv").hide();
			$("#assignDesignationDivId").hide();
			$("#assighTypeId").hide();
			$("#assignOfficerDivId").hide();
			$('#actionTypeStr').val(value);
		}
		
	}
}); 
*/
$(document).on("click",".viewBtnCls",function(){
	var petionId = $(this).attr("attr_petiotion_id");
	var endorsNo = $(this).attr("attr_enrorsNo");
	$("#representeeViewId").html("");
	$("#representeeDetailsModelDivId").modal("show");
	getPetitionDetails(petionId,endorsNo);
 });
 function getPetitionDetailsBuildImages(){
	 $("#imageBuildingId").html(spinner);
   var json = {
       petitionId:glPetitionId,//38,//100031
	   pageType:"viewPage"
    };
  $.ajax({              
    type:'POST',    
    url: 'setPmRepresenteeDataToResultView',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
    if(result != null){
		buildImages(result);
	}else{
		$("#imageBuildingId").html("No Data Available");
	}
  });
}
 function getPetitionDetails(petitionId,endorsNo){
	 $("#endorsmentNo").val('');
	$("#representeeViewId").html(spinner);
	$('#petitionId').val(petitionId);
	$('#petitionsId').val(petitionId);
	glPetitionId = petitionId;
   var json = {
       petitionId:petitionId,//38,//100031
	   pageType:"viewPage"
    };
  $.ajax({              
    type:'POST',    
    url: 'setPmRepresenteeDataToResultView',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
    if(result != null){
		buildPetitionDetailsView(result);
	}else{
		$("#representeeViewId").html("NO DATA AVAILABLE");
	}
  });
}

function buildPetitionDetailsView(result){
	buildImages(result);
	 globalDesignationName=$("#hiddenDesignationName").text();
	 globalDesignationId =$("#hiddenDesignationId").val();
	 candidateReferralDoc=[];
	 coveringLetterDoc=[];
	 detailedReportDoc=[];
	 mainWorkCoveringDocuments=[];
	 subjectIdsArr=[];
	 //globalReviewStatus='ASSIGNED';
	 //globalReviewStatus='ASSIGNED';
	 globalReviewStatus=result.actionType;
	 var enrorsNo = 0;
	if(typeof (result.actionType) != 'undefined' && result.actionType !='undefined'){
		globalReviewStatus = result.actionType;
	}else{
		globalReviewStatus="COMPLETED";
	}
	
	if(typeof (result.worksStatus) != 'undefined' && result.worksStatus !='undefined'){
		globalActionName = result.worksStatus;
	}else{
		globalActionName="Pending Endorsement";
	}
	
	if(typeof (result.worksStatusId) != 'undefined' && result.worksStatusId !='undefined'){
		globalActionId = result.worksStatusId;
	}else{
		globalActionId=1;
	}
	
	if(typeof (result.endorsmentNo) != 'undefined' && result.endorsmentNo !='undefined'){
		enrorsNo = result.endorsmentNo;
	}
	$("#endorsmentNo").val(enrorsNo);
	$("#hiddenEndorseNo").val(enrorsNo);
	 $('#forwardText').html('FORWARD FOR');
	 $('#actionTypeStr').val(globalReviewStatus.toUpperCase());
	 $("#letterNameId").html(""+globalActionName.toUpperCase()+"");
	 if( globalReviewStatus.toUpperCase() =='')
		 $('#actioncopyRefId').show();
	 
		$('#uploadFileDivCls').hide();
		$('#actionmemoDivId').hide();
		$('#detaildReportReviewFiledsDivId').hide();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
	 $("#finalApproDocDiv").hide();
	 if(globalReviewStatus=='COMPLETED'){
		//alert(glDesignationId);
		 if(glDesignationId == 23){
			 if(globalActionId==3){
				 $('#uploadFileDivCls').hide();				 
				 $('#actionmemoDivId').hide();
				 //alert(3);
		//$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
			 }
			$("#letterNameId").html(""+globalActionName.toUpperCase()+"")
			 
		 }else if(glDesignationId == 2 || glDesignationId == 86){
			 $("#uploadFileDivCls").hide();
			 $('#actionmemoDivId').hide();
			// alert(4);
		//$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
			 $('#endorsWorksId').html('FORWARD PETITION');
			 $('#forwardText').html('SELECT ACTION');
		 }else{
			 $("#letterNameId").html(""+globalActionName.toUpperCase()+"")
		 }
	 }else{
		 $("#uploadFileDivCls").hide();
		 $('#actionmemoDivId').hide();
		 
		//$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
	 }
	 
	 if(glDesignationId != 23 && glDesignationId != 2 && glDesignationId != 86){
		 //$("#uploadFileDivCls").show();
	 }
	 if(glDesignationId == 84 || glDesignationId == 93 || glDesignationId == 94 || glDesignationId == 95 || glDesignationId == 96 || glDesignationId == 97 || glDesignationId == 98){
		 $("#letterNameId").html(" MEMO / LETTER ")
	 }
	var str='';
	
	var statusId = result.statusId;
	candidateReferralDoc=[];
	projectDocuments=[];
	coveringLetterDoc=[];
	detailedReportDoc=[];
	historyLetterArr=[];
	
	str+='<div class="pad_pink_bg">';
		str+='<div class="row">';
			str+='<div class="col-sm-4">';
				str+='<h4 class="text-capital m_top10">PETITION STATUS & DETAILS</h4>';
			str+='</div>';
			str+='<div class="col-sm-2 border_left_yash border_right_yash">';
				str+='<p>Representation Type</p>';
				str+='<h5 class="font_weight">'+result.representationType+'</h5>';
			str+='</div>';
			str+='<div class="col-sm-2 border_right_yash">';
				str+='<p>Petition ID</p>';
				str+='<h5 class="font_weight">'+result.petitionId+'</h5>';
			str+='</div>';
			str+='<div class="col-sm-2 border_right_yash">';
				str+='<p>Representation Date</p>';
				str+='<h5 class="font_weight">'+result.representationdate+'</h5>';
			str+='</div>';
			str+='<div class="col-sm-2">';
				if(statusId == 1)
					str+='<span class="pending_color font_weight" style="font-size: 20px;"> <i class="fa fa-pause round_status_pending" aria-hidden="true" style="position: relative;top: -2px;"></i> Pending </span>';
				else if(statusId == 8)
					str+='<span class="completed_color font_weight" style="font-size: 20px;"> <i class="fa  fa-check " aria-hidden="true" style="position: relative;top: -2px;"></i>Completed</span>';
				else if(statusId == 4)
					str+='<span class="completed_color font_weight" style="font-size: 15px;"> <i class="fa  fa-check " aria-hidden="true" style="position: relative;top: -2px;"></i>Look for Next Year</span>';
				else if(statusId == 5)
					str+='<span class="completed_color font_weight" style="font-size: 15px;"> <i class="fa  fa-check " aria-hidden="true" style="position: relative;top: -2px;"></i>Not Possible</span>';
				else if(statusId == 9)
					str+='<span class="completed_color font_weight" style="font-size: 15px;"> <i class="fa  fa-check " aria-hidden="true" style="position: relative;top: -2px;"></i>Partially Completed</span>';
				else //if(statusId != 1 && statusId != 8 )// ! pendigin endorse/ ! next year/! not possible/! completed
					str+='<span class="pending_color font_weight" style="font-size: 20px;"> <i class="fa fa-pause round_status_pending" aria-hidden="true" style="position: relative;top: -2px;"></i>In Progress</span>';
			str+='</div>';
			
		str+='</div>';
	str+='</div>';
	for(var h in result.historyList){
			if(h ==0){
				str+='<div class="row m_top20">';
				str+='<div class="col-sm-12">';
					
					str+='<div class="table-desig-scroll">';
					str+='<div style="border:1px solid #ddd;padding:10px;" class="m_top10">';
					str+='<h5 class="font_weight panel-title">PETITION LATEST HISTORY</h5>';
					//for(var i in result.historyList[h].petitionHistoryList){
					//	if(i==0){
							if(typeof(result.historyList[h].subList1) !='undefined' && result.historyList[h].subList1 != null && result.historyList[h].subList1.length>0){
								for(var j in result.historyList[h].subList1){
									if(j==0){
									if(typeof(result.historyList[h].subList1[j].subList1) !='undefined' && result.historyList[h].subList1[j].subList1 != null && result.historyList[h].subList1[j].subList1.length>0){
										for(var k in result.historyList[h].subList1[j].subList1){
											if(k==0){
											str+='<div class="pad_light_yash_bg m_top20" style="border: 1px solid #ccc;border-radius: 5px;">';
												str+='<div class="row">';
													str+='<div class="">';
														
														str+='<div class="col-sm-3 pull-left">';
															if(result.historyList[h].subList1[j].subList1[k].stautus == "Completed"){
																	str+='<div class="pad_white_bg " style="padding:10px;border: 1px solid #00DF0F;">';
																	str+='<h5 class="font_weight" ><span style="background-color:#00DF0F;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;"></span> Status : '+result.historyList[h].subList1[j].subList1[k].stautus+'</h5>';	
															}else if(result.historyList[h].subList1[j].subList1[k].stautus == "Pending Endorsement"){
																str+='<div class="pad_white_bg " style="padding:10px;border: 1px solid #1283C8;">';
																str+='<h5 class="font_weight" ><span style="background-color:#0090FF;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;"></span> Status : '+result.historyList[h].subList1[j].subList1[k].stautus+'</h5>';
															}else if(result.historyList[h].subList1[j].subList1[k].stautus == "Final Approval" || result.historyList[h].subList1[j].subList1[k].stautus == "Action Memo" || result.historyList[h].subList1[j].subList1[k].stautus == "Detailed Report"){
																str+='<div class="pad_white_bg " style="padding:10px;border: 1px solid #FFC400;">';
																str+='<h5 class="font_weight" ><span style="background-color:#FFC400;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;"></span> Status : '+result.historyList[h].subList1[j].subList1[k].stautus+'</h5>';
															}else{
																str+='<div class="pad_white_bg " style="padding:10px;border: 1px solid #FFC400;">';
																str+='<h5 class="font_weight" ><span style="background-color:#FFC400;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;"></span> Status : '+result.historyList[h].subList1[j].subList1[k].stautus+'</h5>';
															}
															str+='</div>';
														str+='</div>';
														
														if(typeof(result.historyList[h].subList1[j].subList1[k].subList1) !='undefined' && result.historyList[h].subList1[j].subList1[k].subList1 != null && result.historyList[h].subList1[j].subList1[k].subList1.length>0){
															for(var l in result.historyList[h].subList1[j].subList1[k].subList1){
																if(result.historyList[h].subList1[j].subList1[k].subList1[l].actionId == 4){
																	
																	if(typeof(result.historyList[h].subList1[j].subList1[k].subList1[l].subList1) !='undefined' && result.historyList[h].subList1[j].subList1[k].subList1[l].subList1 != null && result.historyList[h].subList1[j].subList1[k].subList1[l].subList1.length>0){
																		for(var m in result.historyList[h].subList1[j].subList1[k].subList1[l].subList1){
																			var obj ={
																						filesArr:result.historyList[h].subList1[j].subList1[k].subList1[l].subList1[m].filesList,
																						name:"petitionLatestHistory"+m+""
																					}
																					historyDocsArr.push(obj);
																			str+='<div class="col-sm-3">';
																				str+='<div style=""><p class=" pull-right docsViewCls" attr_docs="historyDocs" attr_name="petitionLatestHistory'+m+'" attr_candidate_id="" style="color:#1283C8;cursor:pointer;margin-right: 30px;margin-top: 10px"><i class="fa fa-paperclip" aria-hidden="true"></i> <u>'+result.historyList[h].subList1[j].subList1[k].subList1[l].subList1[m].name+' </u></p></div>';
																			str+='</div>';
																		}
																	}
																}
															}
														}
														
													str+='</div>';
													if(typeof(result.historyList[h].subList1[j].subList1[k].subList1) !='undefined' && result.historyList[h].subList1[j].subList1[k].subList1 != null && result.historyList[h].subList1[j].subList1[k].subList1.length>0){
														str+='<div class="col-sm-12 m_top15 ">';
														
															str+='<h5 class="pull-left f_12 font_weight"><span style="color:#1283C8">ACTION:</span> '+result.historyList[h].subList1[j].subList1[k].subList1[0].actionName+'</h5>';
														
														str+='</div>';
														
														str+='<div class="col-sm-12 m_top5">';
															str+='<b>Remarks : </b>';
															str+='<h5>'+result.historyList[h].subList1[j].subList1[k].subList1[0].remarks+'</h5>';
														str+='</div>';
													}
													str+='<div class="col-sm-12 m_top15 ">';
															if(typeof(result.historyList[h].subList1[j].subList1[k].assignedToDesignation) !='undefined' && result.historyList[h].subList1[j].subList1[k].assignedToDesignation != null && result.historyList[h].subList1[j].subList1[k].assignedToDesignation.length>0){
																	str+='<div class="col-sm-6">';
																		str+='<h5 class="pull-left"  ><u style="color:#1283C8" > FORWARDED TO</u> : '+result.historyList[h].subList1[j].subList1[k].assignedToOfficerName+' '+result.historyList[h].subList1[j].subList1[k].assignedToDesignation+'</h5>';
																	str+='</div>';
															}else if(typeof(result.historyList[h].subList1[j].subList1[k].assignedToOfficerName) !='undefined' && result.historyList[h].subList1[j].subList1[k].assignedToOfficerName != null && result.historyList[h].subList1[j].subList1[k].assignedToOfficerName.length>0){
																	str+='<div class="col-sm-6">';
																		str+='<h5 class="pull-left"  ><u style="color:#1283C8" > FORWARDED TO</u> : '+result.historyList[h].subList1[j].subList1[k].assignedToOfficerName+' '+result.historyList[h].subList1[j].subList1[k].assignedToDesignation+'</h5>';
																	str+='</div>';
															}
										var officerDesig = "";
										var ofcrDesigId = result.historyList[h].subList1[j].subList1[k].pmOfficerDesgId ;
										//if(ofcrDesigId != 86 && ofcrDesigId != 23 && ofcrDesigId != 94 &&  ofcrDesigId != 95
										//&& ofcrDesigId != 96 && ofcrDesigId != 97 && ofcrDesigId != 98){
												officerDesig = result.historyList[h].subList1[j].subList1[k].officerDesig;
										//	}
														str+='<div class="col-sm-3 pull-right">';
															str+='<div class="pad_white_bg" style="padding:7px;border: 1px solid #1283C8;">';
																str+='<h5 class="font_weight" style="color:#1283C8;text-transform:uppercase;"> FORWARDED BY&nbsp;:<br>'+result.historyList[h].subList1[j].subList1[k].designation+'</h5>';
																if(officerDesig != ""){
																	str+='<h5 class="font_weight f_10 m_top5">'+officerDesig+'</h5>';
																}
															str+='</div>';
														str+='</div>';
														str+='<div class="col-sm-2 pull-right">';
														str+='<div class="pad_white_bg" style="padding:5px;border: 1px solid #1283C8; height:48px;">';
															str+='<h5 class="pull-right"> <span style="color:#1283C8" >DATE & TIME </span>'+result.historyList[h].subList1[j].timeStr+' @ '+result.historyList[h].subList1[j].subList1[k].timeStr+'</h5>';
														str+='</div>';
														str+='</div>';
														assignedBy = result.historyList[h].subList1[j].subList1[k].designation;
														if(globalActionId == 1 )
															$("#endorseMentHeadingId").html(" <span class='text-warning'>Present Status </span>: "+globalActionName) ;
														/*else if(globalActionId != 1 )
															$("#endorseMentHeadingId").html(" <span style='color:"+colorCode[1]+"'> Present Status : </span>"+globalActionName+" Pending  ,  <b class='text-success'> Assigned By </b>:"+result.historyList[h].subList1[j].subList1[k].designation+" ") ;*/
														else
															$("#endorseMentHeadingId").html("<span style='color:#455862'> Endorsed No </span>- "+enrorsNo+" ,<span style='color:"+colorCode[3]+"'> Present Status </span>: "+globalActionName+"    , <b class='text-success'> FORWARDED BY </b>:"+result.historyList[h].subList1[j].subList1[k].designation+"&nbsp;"+result.historyList[h].subList1[j].subList1[k].officerDesig+" ");
														
													str+='</div>';
												str+='</div>';
											str+='</div>';
											
												str+='<div class="row m_top10">';
													str+='<div class="col-sm-12">';
														str+='<button type="button" class="btn btn-primary workWiseHistroyCls  pull-right" attr_work_id="'+glPetitionId+'" attr_sub_work_id="0" >View History</button>';
												//	str+='</div>';
											//	str+='</div>';
											//	str+='<div class="row m_top10">';
													//str+='<div class="col-sm-6">';	
													if(glDesignationId != null && parseInt(glDesignationId) == 92){
														;
													}else{													
														str+='<button type="button" class="btn btn-primary btn-sm pull-right petitionWiseViewCommentsCls" attr_petition_id ="'+result.petitionId+'" style="margin-right: 15px"> ADD COMMENT </button>';
													}
													str+='</div>';
												str+='</div>'; 
											}
										
										}
									}
								}
							}
						}
					//}
						
				str+='</div>';		
				str+='</div>';		
					
				str+='</div>';
			str+='</div>';
		}
	}

	/*
	for(var h in result.historyList){
			if(h ==0){
				str+='<div class="pad_light_yash_bg m_top10 border_yash border_radius_5">';
				str+='<div class="row">';
					str+='<div class="col-sm-12">';
						str+='<h5 class="text-capital font_weight">Latest History</h5>';
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-6">';
								str+='<h5>Time : <b>'+result.historyList[h].timeStr+'</b></h5>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<h5>User : '+result.historyList[h].userName+'<b></b></h5>';
							str+='</div>';
						str+='</div>';
						str+='<div class="row m_top5">';
							str+='<div class="col-sm-10">';
								if(result.historyList[h].remarks !=null && result.historyList[h].remarks.length>100){
									str+='<h5 class="tooltipCls" data-toggle="tooltip" title="'+result.historyList[h].remarks+'">Remarks : <b>'+result.historyList[h].remarks.substring(0,100)+'...</b></h5>';
								}else{
									str+='<h5>Remarks : <b>'+result.historyList[h].remarks+'</b></h5>';
								}
								
							str+='</div>';
							//str+='<div class="col-sm-2">';
								//str+='<div class="pull-right tooltipCls "  data-toggle="tooltip"   style="cursor:pointer;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 50px;margin-right: 30px" title="VIEW REPRESENTATION HISTORY"  ></i><br/></div>';
						//str+='</div>';
					
					str+='<div class="col-sm-2">';
						str+='<button type="button" class="btn btn-primary workWiseHistroyCls" attr_work_id="'+glPetitionId+'" attr_sub_work_id="0" >View Histroy</button>';
					str+='</div>';
					
							str+='</div>';
							str+='<div class="row m_top5">';
							str+='<div class="col-sm-6">';
								if(result.historyList[h].filesList !=null && result.historyList[h].filesList.length>0){
									//historyLetterArr=result.historyList[h].filesList;
									historyLetterArr=[];
									str+='<h5 class="docsViewCls" attr_docs="historyLetter"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i>files</h5>';
								}
								
							str+='</div>';
						str+='</div>';
						
					str+='</div>';
				str+='</div>';
				str+='</div>'; 
			}
		}
		*/
		
	//Comment
	
	if(result.representationType == "REPRESENTEE"){
		str+='<div class="pad_yash_bg m_top20">';
			str+='<div class="row">';
				str+='<div class="col-sm-12">';
					str+='<h5 class="font_weight panel-title">REPRESENTEE DETAILS</h5>';
				str+='</div>';
					for(var i in result.representeeDetailsList){
						str+='<div class="col-sm-12 m_top10">';
							str+='<div class="pad_white_bg">';
								str+='<div class="row">';
								
									str+='<div class="col-sm-1">';
										if(result.representeeDetailsList[i].candidatePath != null && result.representeeDetailsList[i].candidatePath.trim().length>0){
											str+='<img src="'+result.representeeDetailsList[i].candidatePath+'" class="imageCssPopUp"></img>';
										}else{
											str+='<img src="http://www.mytdp.com/images/User.png" class="imageCssPopUp"></img>';
										}
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<div class="pad_light_yash_bg">';
											str+='<p>Name:</p>';
											str+='<h5 class="font_weight m_top5">'+result.representeeDetailsList[i].name+'</h5>';
											if(result.representeeDetailsList[i].tdpCadreId !=null && result.representeeDetailsList[i].tdpCadreId>0){
												str+='<h5 class="font_weight f_12 m_top10">TDP Cadre</h5>';
											}else{
												str+='<h5 class="font_weight f_12 m_top20"></h5>';
											}
											//str+='<h5 class="font_weight f_10">'+result.referDetailsList[i].+'</h5>';
										str+='</div>';
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<div class="pad_light_yash_bg">';
											str+='<p>Contact Details:</p>';
											if(result.representeeDetailsList[i].email !=null && result.representeeDetailsList[i].email.trim().length>0){
												str+='<p class="m_top5">Email Id:<b class="margin_left">'+result.representeeDetailsList[i].email+'</b></p>';
											}
											if(result.representeeDetailsList[i].mobileNO !=null && result.representeeDetailsList[i].mobileNO>0){
												str+='<p>Contact No:<b class="margin_left">'+result.representeeDetailsList[i].mobileNO+'</b></p>';
											}
											
										str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-5">';
										str+='<div class="pad_light_yash_bg">';
											str+='<p>Address Details:</p>';
											str+='<div class="row m_top5">';
											if((result.representeeDetailsList[i].addressVO.panchayatName !=null && result.representeeDetailsList[i].addressVO.panchayatName.trim().length>0) && (result.representeeDetailsList[i].addressVO.tehsilName !=null && result.representeeDetailsList[i].addressVO.tehsilName.trim().length>0)){
												str+='<div class="col-sm-7">';
													if(result.representeeDetailsList[i].addressVO.panchayatName !=null && result.representeeDetailsList[i].addressVO.panchayatName.trim().length>0){
														str+='<p>Village:<b class="margin_left">'+result.representeeDetailsList[i].addressVO.panchayatName+'</b></p>';
													}
													if(result.representeeDetailsList[i].addressVO.tehsilName !=null && result.representeeDetailsList[i].addressVO.tehsilName.trim().length>0){
														str+='<p>Mandal:<b class="margin_left">'+result.representeeDetailsList[i].addressVO.tehsilName+'</b></p>';
													}
													
												str+='</div>';
											}
												
											str+='<div class="col-sm-4">';
													if(result.representeeDetailsList[i].addressVO.assemblyName !=null && result.representeeDetailsList[i].addressVO.assemblyName.trim().length>0){
														str+='<p>Constituency:<b class="margin_left">'+result.representeeDetailsList[i].addressVO.assemblyName+'</b></p>';
													}
													if(result.representeeDetailsList[i].addressVO.districtName !=null && result.representeeDetailsList[i].addressVO.districtName.trim().length>0){
														str+='<p>District:<b class="margin_left">'+result.representeeDetailsList[i].addressVO.districtName+'</b></p>';
													}
												
											str+='</div>';
											str+='</div>';
											
										str+='</div>';
									str+='</div>';
									
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}
				
			str+='</div>';
		str+='</div>';
	}
	else if(result.representationType == "SELF"){
		str+='<div class="pad_yash_bg m_top20">';
			
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<h5 class="font_weight panel-title">REPRESENTEE DETAILS</h5>';
			str+='<div class="candidateRepresenteeDetails'+result.representationType+'DivId">';
			for(var i in result.representeeDetailsList){
				str+='<div class="bgColorCandidatesView" attr_type='+result.representationType+' attr_candidateId='+result.representeeDetailsList[i].refCandidateId+' id="candidate'+result.representationType+''+result.representeeDetailsList[i].refCandidateId+'" style="background-color: #fff;border: none;box-shadow: none;">';
				
				if(result.representationType == "REPRESENTEE" || result.representationType == "REPRESENT"){
					//str+='<input id="existinfRefDetails'+i+'" class="refCandidatesCls" name="referList['+i+'].refCandidateId" value="'+result.representeeDetailsList[i].refCandidateId+'" type="hidden">';
				}else{							
					str+='<input id="existinfRefDetails'+i+''+j+'" class="refCandidatesCls" name="refCandidateId" value="'+result.representeeDetailsList[i].refCandidateId+'" type="hidden">';
							if(result.representeeDetailsList[i].fileNamesList !=null && result.representeeDetailsList[i].fileNamesList.length>0){
								for(var j in result.representeeDetailsList[i].fileNamesList){
									str+='<input type="hidden" id="existingrefDocument'+i+''+j+'" name="referList['+i+'].fileNamesList['+j+'].value" value="'+result.representeeDetailsList[i].fileNamesList[j].value+'">';	
								}
							}
							
				}
						
					str+='<div class="row">';
						str+='<div class="col-sm-2">';
							if(result.representeeDetailsList[i].candidatePath != null && result.representeeDetailsList[i].candidatePath.length>0){
								str+='<img src="'+result.representeeDetailsList[i].candidatePath+'" class="imageCss"></img>';
								if(result.representeeDetailsList[i].partyName != null && result.representeeDetailsList[i].partyName.length>0){
									str+='<span style="position: absolute;right: 33px;"><img src="Assests/images/'+result.representeeDetailsList[i].partyName+'.PNG" class="smallerImg"></img></span>';
								}else{
									str+='<span style="position: absolute;right: 33px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
								}
								
							}else{
								str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
							}
						str+='</div>';
						
						str+='<div class="col-sm-3">';
									str+='<div class="nameAddressCss">';
										str+='<h5 class="font_weight">Name:</h5>';
										str+='<h5 class="m_top5">'+result.representeeDetailsList[i].name+'</h5>';
										str+='<h5 class="m_top10 font_weight">Designation</h5>';
										if(typeof(result.representeeDetailsList[i].designation != 'undefined') && result.representeeDetailsList[i].designation != null ){
											
										}
										var designtion = result.representeeDetailsList[i].designation.replace("State Minister","");
										str+='<h5 class="text_bold m_top10">'+designtion+'</h5>';
										if(typeof(result.representeeDetailsList[i].candidateAddressVO) !='undefined' && result.representeeDetailsList[i].candidateAddressVO != null){
											if(result.representeeDetailsList[i].candidateAddressVO.assemblyName != null && result.representeeDetailsList[i].candidateAddressVO.assemblyName.length>0)
											str+='<h5 class="m_top5">'+result.representeeDetailsList[i].candidateAddressVO.assemblyName+' Constituency,</h5>';
										if(result.representeeDetailsList[i].candidateAddressVO.districtName != null && result.representeeDetailsList[i].candidateAddressVO.districtName.length>0)
											str+='<h5 class="m_top5">District :'+result.representeeDetailsList[i].candidateAddressVO.districtName+' , ';
										if(result.representeeDetailsList[i].candidateAddressVO.stateName != null && result.representeeDetailsList[i].candidateAddressVO.stateName.length>0)
											str+='<h5> State :'+result.representeeDetailsList[i].candidateAddressVO.stateName+'</h5>';
									str+='</div>';
							str+='</div>';
						
							str+='<div class="col-sm-2">';
								str+='<div class="nameAddressCss">';
									str+='<h5 class="font_weight">Party:</h5>';
									str+='<h5 class="m_top5">'+result.representeeDetailsList[i].partyName+'</h5>';
									str+='<h5 class="m_top10 font_weight">Contact Details</h5>';
									str+='<h5 class="text_bold m_top10">Email-id: '+result.representeeDetailsList[i].email+'</h5>';
									str+='<h5 class="m_top5">Contact No : '+result.representeeDetailsList[i].mobileNO+'</h5>';
								str+='</div>';
							str+='</div>';
						
							 str+='<div class="col-sm-3">';
								str+='<div class="nameAddressCss">';
									str+='<h5 class="font_weight">Address:</h5>';
							if(result.representeeDetailsList[i].candidateNativeAddressVO != null && result.representeeDetailsList[i].candidateNativeAddressVO.stateName != null && result.representeeDetailsList[i].candidateNativeAddressVO.stateName.length>0){
								if(result.representeeDetailsList[i].candidateNativeAddressVO.panchayatName != null && result.representeeDetailsList[i].candidateNativeAddressVO.panchayatName.length>0)
										str+='<h5 class="m_top5">Panchayat  : '+result.representeeDetailsList[i].candidateNativeAddressVO.panchayatName+' </h5>';
								if(result.representeeDetailsList[i].candidateNativeAddressVO.tehsilName != null && result.representeeDetailsList[i].candidateNativeAddressVO.tehsilName.length>0)
										str+='<h5 class="m_top5">Mandal/Munci.  : '+result.representeeDetailsList[i].candidateNativeAddressVO.tehsilName+' </h5>';
								if(result.representeeDetailsList[i].candidateNativeAddressVO.assemblyName != null && result.representeeDetailsList[i].candidateNativeAddressVO.assemblyName.length>0)
										str+='<h5 class="m_top5">Constituency  : '+result.representeeDetailsList[i].candidateNativeAddressVO.assemblyName+' </h5>';
								if(result.representeeDetailsList[i].candidateNativeAddressVO.districtName != null && result.representeeDetailsList[i].candidateNativeAddressVO.districtName.length>0)
										str+='<h5 class="m_top5"> District  : '+result.representeeDetailsList[i].candidateNativeAddressVO.districtName+' ,</h5> ';
									
								if(result.representeeDetailsList[i].candidateNativeAddressVO.stateName != null && result.representeeDetailsList[i].candidateNativeAddressVO.stateName.length>0)
										str+='<h5 class="m_top5"> State : '+result.representeeDetailsList[i].candidateNativeAddressVO.stateName+'</h5>';
							}else{
										str+='<h5 class="m_top5">Not Available</h5>';
								}		
									
								str+='</div>';
							str+='</div>'; 
							str+='<div class="col-sm-2">';
								if(result.representeeDetailsList[i].fileNamesList !=null && result.representeeDetailsList[i].fileNamesList.length>0){
										str+='<h5 class="view_referral_Doc docsViewCls m_top10 f_10" attr_docs="referral" attr_candidate_id="'+result.representeeDetailsList[i].id+'" style="cursor:pointer;padding:10px;"> SELF REFERRAL LETTER </h5>';
										candidateReferralDoc = result.representeeDetailsList[i].fileNamesList;
									}else{
										str+='<h5 class="view_referral_Doc_empty m_top10 f_10" style="cursor:no-drop;padding:10px;">REFERRAL LETTER </h5>';
									}
							str+='</div>';
						str+='</div>';
						
						str+='</div>';
					str+='</div>';
					
					str+='</div>';
				str+='</div>';
			}
			str+='</div>';
		str+='</div>';
	str+='</div>';	
		str+='</div>';
	}
	}
	
	str+='<div class="pad_yash_bg m_top20">';
			str+='<div class="row">';
			if(result.referDetailsList !=null && result.referDetailsList.length>0){
				str+='<div class="col-sm-12">';
					str+='<h5 class="font_weight panel-title">REFERRED BY</h5>';
				str+='</div>';
					str+='<div class="col-sm-12 m_top10">';
						for(var i in result.referDetailsList){
							str+='<div class="col-sm-6">';
								str+='<div class="pad_white_bg">';
									str+='<div class="row">';
										str+='<div class="col-sm-3">';
											if(result.referDetailsList[i].candidatePath != null && result.referDetailsList[i].candidatePath.trim().length>0){
												str+='<img src="'+result.referDetailsList[i].candidatePath+'" class="imageCss" style="width:120px;height:120px;"></img>';
												str+='<span style="position: absolute; left: 100px;"><img src="Assests/images/'+result.referDetailsList[i].partyName+'.PNG" class="smallerImg" ></img></span>';
											}else{
												str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss" style="width:120px;height:120px;"></img>';
											}
											if(result.referDetailsList[i].fileNamesList !=null && result.referDetailsList[i].fileNamesList.length>0){
												str+='<h5 class="view_referral_Doc docsViewCls m_top10 f_10" attr_docs="referral" attr_candidate_id="'+result.referDetailsList[i].id+'" style="cursor:pointer;padding:10px;">REFERRAL LETTER </h5>';
												candidateReferralDoc = result.referDetailsList[i].fileNamesList;
											}else{
												str+='<h5 class="view_referral_Doc_empty m_top10 f_10" style="cursor:no-drop;padding:10px;">REFERRAL LETTER </h5>';
												
											}
											
										str+='</div>';
										str+='<div class="col-sm-9">';
											str+='<div class="pad_light_yash_bg">';
												str+='<h5>Name:</h5>';
												if(result.referDetailsList[i].name !=null && result.referDetailsList[i].name.trim().length>0){
													str+='<h4 class="font_weight m_top5">'+result.referDetailsList[i].name+'</h4>';
												}else{
													str+='<h4 class="font_weight m_top5"> - </h4>';
												}
												
												str+='<h5 class="font_weight m_top5">('+result.referDetailsList[i].designation+'),'+result.referDetailsList[i].candidateAddressVO.assemblyName+','+result.referDetailsList[i].candidateAddressVO.districtName+'</h5>';
												
											str+='</div>';
											str+='<div class="pad_light_yash_bg m_top10">';
												str+='<div class="row m_top5">';
													str+='<div class="col-sm-6">';
														str+='<h5>Party:</h5>';
														if(result.referDetailsList[i].partyName !=null && result.referDetailsList[i].partyName.trim().length>0){
															str+='<h5 class="font_weight m_top10">'+result.referDetailsList[i].partyName+'</h5>';
														}else{
															str+='<h5 class="font_weight m_top10"> - </h5>';
														}
														
													str+='</div>';
													str+='<div class="col-sm-6">';
														str+='<h5>Contact Details:</h5>';
														if(result.referDetailsList[i].email !=null && result.referDetailsList[i].email.trim().length>0){
															str+='<h5 class="m_top5 font_weight">Email Id:<b class="margin_left">'+result.referDetailsList[i].email+'</b></h5>';
														}
														if(result.referDetailsList[i].mobileNO !=null && result.referDetailsList[i].mobileNO>0){
															str+='<h5 class="font_weight">Contact No:<b class="margin_left">'+result.referDetailsList[i].mobileNO+'</b></h5>';
														}else{
															str+='<h5 class="font_weight">Contact No:<b class="margin_left"> - </b></h5>';
														}
														
													str+='</div>';
												str+='</div>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
							
						}
					str+='</div>';
				}
			str+='</div>';
		str+='</div>';
	
	
		str+='<div class="pad_yash_bg m_top20">';
			str+='<div class="row">';
				str+='<div class="">';
					str+='<div class="col-sm-10">';
						str+='<h5 class="font_weight panel-title">WORK TYPE DETAILS</h5>';
							str+='<div class="pad_white_bg m_top5">';
								str+='<div class="row">';
									str+='<div class="col-sm-7">';
										str+='<h5>Name of the Work</h5>';
										if(result.workName !=null && result.workName.trim().length>0){
											if(result.workName !=null && result.workName.length>120){
												str+='<h5 class="font_weight tooltipCls m_top10" data-toggle="tooltip" title="'+result.workName+'">'+result.workName.substring(0,120)+'...</h5>';
											}else{
												str+='<h5 class="font_weight  m_top10">'+result.workName+'</h5>';
											}
											
										}else{
											str+='<h5 class="font_weight  m_top10"> - </h5>';
										}
										
									str+='</div>';
									str+='<div class="col-sm-2 border_right_yash border_left_yash">';
										str+='<div style="padding:5px;background-color:#D1AB66;">';
											str+='<h5>No of Works</h5>';
											str+='<h4 class="font_weight m_top10">'+result.noOfWorks+'</h4>';
										str+='</div>';
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<div style="padding:5px;background-color:#D1AB66;">';
											str+='<h5>Work&nbsp;Cost&nbsp;(Est.&nbsp;Cost&nbsp;in&nbsp;Lakh)</h5>';
											if(result.estimateCostStr !=null && result.estimateCostStr>0){
												str+='<h4 class="font_weight m_top10">'+result.estimateCostStr+'</h4>';
											}else{
												str+='<h4 class="font_weight m_top10">0</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-2">';
						str+='<h5> PETITION DOCUMENTS </h5>';
						projectDocuments=[];
						if(result.fileList !=null && result.fileList.length>0){
							str+='<div class="view_referral_Doc docsViewCls m_top15 text-center" attr_docs="fileList" style="cursor:pointer;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i><br/> <h5 class="m_top10">VIEW DOCUMENTS</h5></div>';
							projectDocuments = result.fileList;
						}else{
							str+='<div class="view_referral_Doc_empty m_top15 text-center" attr_docs="fileList" style="cursor:no-drop;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i><br/> <h5 class="m_top10">VIEW DOCUMENTS</h5></div>';
							
						}
						
					str+='</div>';
				str+='</div>';
				
				str+='<div class="">';
					str+='<div class="col-sm-10 m_top10">';
						str+='<h5 class="text-capital font_weight panel-title">Status Wise Works Overview</h5>';
							str+='<div class="pad_white_bg m_top5" style="border:1px solid #D1AB66;">';
								str+='<div class="row">';
									str+='<div class="col-sm-3">';
										str+='<div style="padding:5px;background-color:#D1AB66;">';
											str+='<h5>Total Works</h5>';
											str+='<h4 class="font_weight m_top10">'+result.noOfWorks+'</h4>';
										str+='</div>';
									str+='</div>';
									var statusList = 0;
									for(var i in result.statusList){
										if(i==0){
											globalStatusArr=result.statusList[i].subList;
										}
										
										statusList = statusList+1;
										
											if(result.statusList[i].count !=null && result.statusList[i].count>0){
												str+='<div class="col-sm-3 m_top5">';
												str+='<div style="padding:5px;background-color:#ccc;border:1px solid #d1ab66;">';
													if(result.statusList[i].value !=null && result.statusList[i].value.length>20){
														str+='<h5 class="tooltipCls" data-toggle="tooltip" title="'+result.statusList[i].value+'"><span class="rankingColor"><span style="top: -1px;position: relative;font-size: 12px;">'+statusList+'</span></span >'+result.statusList[i].value.substring(0,20)+'...</h5>';
													}else{
														str+='<h5><span class="rankingColor"><span style="top: -1px;position: relative;font-size: 12px;">'+statusList+'</span></span>'+result.statusList[i].value+'</h5>';
													}
													
													str+='<h4 class="font_weight m_top10">'+result.statusList[i].count+'</h4>';
											str+='</div>';
											str+='</div>';
											}else{
											/*	str+='<div class="col-sm-3 m_top5">';
											str+='<div style="padding:5px;background-color:#F5F5F5;border:1px solid #d1ab66;">';
													if(result.statusList[i].value !=null && result.statusList[i].value.length>20){
														str+='<h5 class="tooltipCls" data-toggle="tooltip" title="'+result.statusList[i].value+'"><span class="rankingColor"><span style="top: -1px;position: relative;font-size: 12px;">'+statusList+'</span></span>'+result.statusList[i].value.substring(0,20)+'...</h5>';
													}else{
														str+='<h5><span class="rankingColor"><span style="top: -1px;position: relative;font-size: 12px;">'+statusList+'</span></span>'+result.statusList[i].value+'</h5>';
													}
													
													
													str+='<h4 class="font_weight m_top10">'+result.statusList[i].count+'</h4>';
											str+='</div>';
											str+='</div>';*/
											}
											
										
									}
									
									
								str+='</div>';
							str+='</div>';
					str+='</div>';
					
				str+='</div>';
				
			str+='</div>';
		str+='</div>';
		
		str+='<div class="row m_top10">';
				str+='<div class="col-sm-12" style="padding: 10px;">';
					str+='<div class="col-sm-2 pull-right">';
						str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
							str+='<span style="margin-left: 0px;margin-right: 25px;">CLASSICAL VIEW </span><input type="checkbox" id="inlineCheckbox1" value="1" class="tableTypeCls" style="margin-top: 2px;" checked >';
						str+='</label>';
					str+='</div>';
					
					str+='<div class="col-sm-2 pull-right">';
						str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
							str+='<span style="margin-left: 0px;margin-right: 25px;">GRID VIEW </span><input type="checkbox" id="inlineCheckbox1" value="2" class="tableTypeCls" style="margin-top: 2px;" >';
						str+='</label>';
					str+='</div>';
					
				str+='</div>';
		str+='</div>';	
		str+='<div id="tableViewDiv"></div>';
			
	$("#representeeViewId").html(str);
	$(".tooltipCls").tooltip();
	
	buildWorksDetils(result);/*
	$("#workDetails1Tab").dataTable({
		"paging":   true,
		"info":     false,
		"searching": true,
		"autoWidth": true,
		//"sDom": '<"top"iflp>rt<"bottom"><"clear">',
		"iDisplayLength": -1,
		"aaSorting": [[ 8, "desc" ]],
		"aLengthMenu": [[500, 100, 200, -1], [500, 100, 200, "All"]]
	});
	$('.dataTables_wrapper').addClass(" m_top25");*/
}
function buildWorksDetils(result){
	
	str='';
	
		str+='<div class="row m_top20">';
			str+='<div class="col-sm-12">';
		for(var i in result.subWorksList){
			str+='<div id="classicalViewDiv">';	
				str+='<div class="panel-group" id="accordionView1'+i+'">';
					str+='<div class="panel panel-default panel-blue">';
						str+='<div class="panel-heading" id="headingView1'+i+'">';
							if(i==0){
								str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionView1'+i+'" href="#collapseView1'+i+'" aria-expanded="true" aria-controls="collapseView1'+i+'">';
							}else{
								str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionView1'+i+'" href="#collapseView1'+i+'" aria-expanded="true" aria-controls="collapseView1'+i+'">';
							}
							
							if(result.subWorksList[i].endorsmentNo !=null && result.subWorksList[i].endorsmentNo !=0){
								endorseMenNo =result.subWorksList[i].endorsmentNo;
								str+='<h4 class="panel-title text-capital " >Endorsed - '+result.subWorksList[i].endorsmentNo+'</h4>';
							}else{
								endorseMenNo='';
								str+='<h4 class="panel-title text-capital">Pending Endorsed</h4>';
							}
						 	str+='</a>';
						 str+='</h4>';
						str+='</div>';
						if(i==0){
							str+='<div id="collapseView1'+i+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingView1'+i+'">';
						}else{
							str+='<div id="collapseView1'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingView1'+i+'">';
						}
						
											
						 str+='<div class="panel-body" style="background-color: #F7F7F7;">';
						  if(result.subWorksList[i].endorsmentNo !=null && result.subWorksList[i].endorsmentNo !=0){
									str+='<div class="row">';
										str+='<div class="col-sm-9">';
											str+='<div class="pad_white_bg border_yash">';
												str+='<div class="row">';
													str+='<div class="col-sm-3">';
														str+='<h5 class="font_weight">Endorsment ID</h5>';
														str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].endorsmentNo+'</h5>';
													str+='</div>';
													str+='<div class="col-sm-3">';
														str+='<h5 class="font_weight">No of works</h5>';
														str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].noOfWorks+'</h5>';
													str+='</div>';
													str+='<div class="col-sm-6">';
														str+='<h5 class="font_weight">Endorsment Date</h5>';
														str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].endorsmentDate+'</h5>';
													str+='</div>';
												str+='</div>';
											str+='</div>';
										str+='</div>';
							str+='</div>';
							 str+='<div class="panel-body" style="background-color: #F7F7F7;">';
										mainWorkCoveringDocuments=[];
										for(var k in result.reportTypeFilesList){
											if(result.reportTypeFilesList[k].key == "COVERING LETTER"){
												if(result.reportTypeFilesList[k].filesList !=null && result.reportTypeFilesList[k].filesList.length>0){
													str+='<div class="col-sm-3">';
													str+='<div class="view_referral_Doc docsViewCls text-center" attr_docs="mainWorkCovering" style="cursor:pointer;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW COVERING DOCUMENTS  </h5></div>';
														str+='</div>';
													mainWorkCoveringDocuments.push(result.reportTypeFilesList[k].filesList[0]);
												}else{
													str+='<div class="col-sm-3">';
													str+='<div class="view_referral_Doc_empty  text-center" attr_docs="mainWorkCovering" style="cursor:no-drop;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW COVERING DOCUMENTS </h5></div>';
														str+='</div>';
												}
											}else if(result.reportTypeFilesList[k].key == "ACTION COPY"){
												if(result.reportTypeFilesList[k].filesList !=null && result.reportTypeFilesList[k].filesList.length>0){
													str+='<div class="col-sm-3">';
													str+='<div class="view_referral_Doc docsViewCls text-center" attr_docs="covering" style="cursor:pointer;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW &nbsp;ACTION&nbsp;COPY</h5></div>';
														str+='</div>';
													coveringLetterDoc.push(result.reportTypeFilesList[k].filesList[0]);
												}else{
													str+='<div class="col-sm-3">';
													str+='<div class="view_referral_Doc_empty  text-center" attr_docs="covering" style="cursor:no-drop;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW &nbsp;ACTION&nbsp;COPY</h5></div>'; 
														str+='</div>';
												}
											}
											else if(result.reportTypeFilesList[k].key == "DETAILED REPORT"){
												if(result.reportTypeFilesList[k].filesList !=null && result.reportTypeFilesList[k].filesList.length>0){
													str+='<div class="col-sm-3">';
													str+='<div class="view_referral_Doc docsViewCls text-center" attr_docs="detailed" style="cursor:pointer;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW DETAILED REPORT</h5></div>';
														str+='</div>';
													detailedReportDoc.push(result.reportTypeFilesList[k].filesList[0]);
												}else{
													str+='<div class="col-sm-3">';
													str+='<div class="view_referral_Doc_empty  text-center" attr_docs="detailed" style="cursor:no-drop;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW DETAILED REPORT</h5></div>'; 
														str+='</div>';
												}
											}
										}
									
									str+='</div>';
								}
							 str+='</div>';	
							 
							 
							 var totalWorksToUpdate=result.subWorksList[i].subWorksList.length;
								for(var j in result.subWorksList[i].subWorksList){
									if(result.subWorksList[i].subWorksList[j].status == "Completed"){
										totalWorksToUpdate = parseInt(totalWorksToUpdate)-parseInt(1);
									}
								}
							if(	( result.statusList[0].subList != null && result.statusList[0].subList.length > 0 ) || globalDesignationId == 2 || globalDesignationId == 86 ){
								str+='<div class="row m_top10">';
										str+='<div class="col-sm-12">';
											str+='<div class="col-sm-2 pull-right">';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													//str+='<button type="button" style="margin-right:15px" class="btn btn-primary btn-sm pull-right viewCommentsCls" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> ADD COMMENT </button>';
												}
											str+='</div>';
											str+='<div class="col-sm-2 pull-right">';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													if(parseInt(totalWorksToUpdate) >0){
														if(result.statusList[0].subList.length > 0 ){
															str+='<button  type="button" class="btn btn-primary btn-sm  pull-right updateStatusChangeCls activeUpdateStatusCls" style="cursor:pointer;" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'"  attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> UPDATE STATUS </button>';
														}else{
															str+='<button  type="button" class="btn btn-primary btn-sm  pull-right updateStatusChangeCls" style="cursor:pointer;" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'"  attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> UPDATE STATUS </button>';
														}
													}
												}
											str+='</div>';
											str+='<div class="col-sm-2 pull-right">';
												str+='<h5>';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
														str+='<span style="margin-left: 0px;margin-right: 25px;">SELECT ALL</span><input type="checkbox" id="inlineCheckbox1" value="" class="workStatusClassicalViewSelectedAllCls" style="margin-top: 2px;" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'">';
													str+='</label>';
													
												}
												str+='</h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
							}
							str+='<table class="table table_customRep table-bordered  m_top25" id="workDetails1Tab" >';
								str+='<thead>';
									str+='<tr>';
										if(	( result.statusList[0].subList != null && result.statusList[0].subList.length > 0 ) || globalDesignationId == 2 || globalDesignationId == 86 ){
											str+='<th style="text-align:center" title="Select All"> <input type="checkbox" name="" id="" class="workStatusClassicalViewSelectedAllCls" value="0" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'" />&nbsp;ALL&nbsp</th>';
										}
											str+='<th style="text-align:center" >DISTRICT</th>';
											str+='<th style="text-align:center" >CONSTITUENCY</th>';
											str+='<th style="text-align:center" >MANDAL/ MUNCIPALITY</th>';
											//str+='<th style="text-align:center" >PANCHAYAT</th>';
											str+='<th style="text-align:center" >DEPARTMENT</th>';
											str+='<th style="text-align:center" >SUBJECT</th>';
											//str+='<th style="text-align:center" >SUB-SUBJECT</th>';
											//str+='<th style="text-align:center" >GRANT</th>';
											str+='<th style="text-align:center" >EST. COST</th>';
											str+='<th style="text-align:center" >STATUS</th>';
											str+='<th style="text-align:center;width: 250px;" class="descriptionCls"  >DESCRIPTION</th>';
									str+='</tr>';
								str+='</thead>';
							str+='<tbody>';
							
							for(var j in result.subWorksList[i].subWorksList){
								if(typeof(result.subWorksList[i].subWorksList[j].subjectId) !='undefined' && parseInt(result.subWorksList[i].subWorksList[j].subjectId)>0)
									subjectIdsArr.push(result.subWorksList[i].subWorksList[j].subjectId);
								
								str+='<tr>';
								if(	( result.statusList[0].subList != null && result.statusList[0].subList.length > 0 ) || globalDesignationId == 2 || globalDesignationId == 86 ){
									str+='<td  style="text-align:center" > <input type="checkbox" name="" id="" value="'+result.subWorksList[i].subWorksList[j].workId+'" class="workStatusUpdateCls ClassicalViewCheckbox'+result.subWorksList[i].endorsmentNo+'" style="margin-top: 2px;" attr_department_id="'+result.subWorksList[i].subWorksList[j].deptId+'" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"/></td>';
									if(typeof result.subWorksList[i].subWorksList[j].addressVO.districtName != 'undefined' && result.subWorksList[i].subWorksList[j].addressVO.districtName != null && result.subWorksList[i].subWorksList[j].addressVO.districtName.length>0)
										str+='<td  style="text-align:center" >'+result.subWorksList[i].subWorksList[j].addressVO.districtName+'</td>';
									else
										str+='<td  style="text-align:center" > - </td>';
								}
									if(typeof result.subWorksList[i].subWorksList[j].addressVO.assemblyName != 'undefined' && result.subWorksList[i].subWorksList[j].addressVO.assemblyName != null && result.subWorksList[i].subWorksList[j].addressVO.assemblyName.length>0)
										str+='<td  style="text-align:center" >'+result.subWorksList[i].subWorksList[j].addressVO.assemblyName+'</td>';
									else
										str+='<td  style="text-align:center" > - </td>';
									if(typeof result.subWorksList[i].subWorksList[j].addressVO.tehsilName != 'undefined' && result.subWorksList[i].subWorksList[j].addressVO.tehsilName != null && result.subWorksList[i].subWorksList[j].addressVO.tehsilName.length>0)
										str+='<td  style="text-align:center" >'+result.subWorksList[i].subWorksList[j].addressVO.tehsilName+'</td>';
									else
										str+='<td  style="text-align:center" > - </td>';
									//if(typeof result.subWorksList[i].subWorksList[j].addressVO.panchayatName != 'undefined' && result.subWorksList[i].subWorksList[j].addressVO.panchayatName != null && result.subWorksList[i].subWorksList[j].addressVO.panchayatName.length>0)
									//	str+='<td>'+result.subWorksList[i].subWorksList[j].addressVO.panchayatName+'</td>';
									//else
									//	str+='<td> - </td>';
									if(typeof result.subWorksList[i].subWorksList[j].deptName != 'undefined' && result.subWorksList[i].subWorksList[j].deptName != null && result.subWorksList[i].subWorksList[j].deptName.length>0)
										str+='<td  style="text-align:center" >'+result.subWorksList[i].subWorksList[j].deptName+'</td>';
									else
										str+='<td  style="text-align:center" > - </td>';
									if(typeof result.subWorksList[i].subWorksList[j].subject != 'undefined' && result.subWorksList[i].subWorksList[j].subject != null && result.subWorksList[i].subWorksList[j].subject.length>0)
										str+='<td  style="text-align:center" >'+result.subWorksList[i].subWorksList[j].subject+'</td>';
									else
										str+='<td  style="text-align:center" > - </td>';
								//	if(typeof result.subWorksList[i].subWorksList[j].subSubject != 'undefined' && result.subWorksList[i].subWorksList[j].subSubject != null && result.subWorksList[i].subWorksList[j].subSubject.length>0)
									//	str+='<td>'+result.subWorksList[i].subWorksList[j].subSubject+'</td>';
									//else
									//	str+='<td> - </td>';
									//if(typeof result.subWorksList[i].subWorksList[j].grantName != 'undefined' && result.subWorksList[i].subWorksList[j].grantName != null && result.subWorksList[i].subWorksList[j].grantName.length>0)
									//	str+='<td  style="text-align:center" >'+result.subWorksList[i].subWorksList[j].grantName+'</td>';
									//else
									//	str+='<td  style="text-align:center" > - </td>';
									
									if(typeof result.subWorksList[i].subWorksList[j].estimateCost != 'undefined' && result.subWorksList[i].subWorksList[j].estimateCost != null && result.subWorksList[i].subWorksList[j].estimateCost.length>0)
										str+='<td  style="text-align:center" >'+result.subWorksList[i].subWorksList[j].estimateCost+'</td>';
									else
										str+='<td  style="text-align:center" > - </td>';
									if(typeof result.subWorksList[i].subWorksList[j].status != 'undefined' && result.subWorksList[i].subWorksList[j].status != null && result.subWorksList[i].subWorksList[j].status.length>0)
										str+='<td  style="text-align:center;" >'+result.subWorksList[i].subWorksList[j].status+'</td>';
									else
										str+='<td  style="text-align:center;" > - </td>';
									
									
									if(typeof result.subWorksList[i].subWorksList[j].workName != 'undefined' && result.subWorksList[i].subWorksList[j].workName != null && result.subWorksList[i].subWorksList[j].workName.length>0){
										if(result.subWorksList[i].subWorksList[j].workName !=null && result.subWorksList[i].subWorksList[j].workName.length>50){
											str+='<td><span class="tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].workName+'">'+result.subWorksList[i].subWorksList[j].workName.substring(0,50)+'...</span></td>';
										}else{
											str+='<td>'+result.subWorksList[i].subWorksList[j].workName+'</td>';
										}
										
									}
									else{
										str+='<td style="text-align:center;"> - </td>';
									}
									
								str+='</tr>';
							}
							str+='</tbody>';
						str+='</table>';
					
					if(	( result.statusList[0].subList != null && result.statusList[0].subList.length > 0) || globalDesignationId == 2 || globalDesignationId == 86 ){
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-12">';
								str+='<div class="col-sm-2 pull-right">';
									if(glDesignationId != null && parseInt(glDesignationId) == 92){
										;
									}else{
										//str+='<button type="button" style="margin-right:15px" class="btn btn-primary btn-sm pull-right viewCommentsCls" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> ADD COMMENT </button>';
									}
								str+='</div>';
								str+='<div class="col-sm-2 pull-right">';
									if(glDesignationId != null && parseInt(glDesignationId) == 92){
										;
									}else{
										if(parseInt(totalWorksToUpdate) >0){
											if(result.statusList[0].subList.length > 0){
												str+='<button  type="button" class="btn btn-primary btn-sm  pull-right updateStatusChangeCls activeUpdateStatusCls" style="cursor:pointer;" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'"  attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> UPDATE STATUS </button>';
											}else{
												str+='<button  type="button" class="btn btn-primary btn-sm  pull-right updateStatusChangeCls" style="cursor:pointer;" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'"  attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> UPDATE STATUS </button>';
											}
										}
									}
								str+='</div>';
								str+='<div class="col-sm-2 pull-right">';
									str+='<h5>';
									if(glDesignationId != null && parseInt(glDesignationId) == 92){
										;
									}else{
										str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
											str+='<span style="margin-left: 0px;margin-right: 25px;">SELECT ALL</span><input type="checkbox" id="inlineCheckbox1" value="" class="workStatusClassicalViewSelectedAllCls" style="margin-top: 2px;" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'">';
										str+='</label>';
										
									}
									str+='</h5>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}
					str+='</div>';
				str+='</div>';			
				str+='</div>';			
			}
			str+='</div>';
		str+='</div>';		
			
		
		str+='<div class="row m_top20" id="gridViewdiv" style="display:none;">';
			str+='<div class="col-sm-12">';
		for(var i in result.subWorksList){
			var endorseMenNo='';
				str+='<div class="panel-group" id="accordionView'+i+'">';
					str+='<div class="panel panel-default panel-blue">';
						str+='<div class="panel-heading" id="headingView'+i+'">';
							if(i==0){
								str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionView'+i+'" href="#collapseView'+i+'" aria-expanded="true" aria-controls="collapseView'+i+'">';
							}else{
								str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionView'+i+'" href="#collapseView'+i+'" aria-expanded="true" aria-controls="collapseView'+i+'">';
							}
							
							if(result.subWorksList[i].endorsmentNo !=null && result.subWorksList[i].endorsmentNo !=0){
								endorseMenNo =result.subWorksList[i].endorsmentNo;
								str+='<h4 class="panel-title text-capital">Endorsed - '+result.subWorksList[i].endorsmentNo+'</h4>';
							}else{
								endorseMenNo='';
								str+='<h4 class="panel-title text-capital">Pending Endorsed</h4>';
							}
						 	str+='</a>';
						 str+='</h4>';
						str+='</div>';
						if(i==0){
							str+='<div id="collapseView'+i+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingView'+i+'">';
						}else{
							str+='<div id="collapseView'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingView'+i+'">';
						}
						  str+='<div class="panel-body" style="background-color: #F7F7F7;">';
						  if(result.subWorksList[i].endorsmentNo !=null && result.subWorksList[i].endorsmentNo !=0){
									str+='<div class="row">';
										str+='<div class="col-sm-9">';
											str+='<div class="pad_white_bg border_yash">';
												str+='<div class="row">';
													str+='<div class="col-sm-3">';
														str+='<h5 class="font_weight">Endorsment ID</h5>';
														str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].endorsmentNo+'</h5>';
													str+='</div>';
													str+='<div class="col-sm-3">';
														str+='<h5 class="font_weight">No of works</h5>';
														str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].noOfWorks+'</h5>';
													str+='</div>';
													str+='<div class="col-sm-6">';
														str+='<h5 class="font_weight">Endorsment Date</h5>';
														str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].endorsmentDate+'</h5>';
													str+='</div>';
												str+='</div>';
											str+='</div>';
										str+='</div>';
										str+='<div class="col-sm-3">';
										mainWorkCoveringDocuments=[];
										for(var k in result.reportTypeFilesList){
											console.log(result.reportTypeFilesList[k].key);
											if(result.reportTypeFilesList[k].key == "COVERING LETTER"){
												
												if(result.reportTypeFilesList[k].filesList !=null && result.reportTypeFilesList[k].filesList.length>0){
													str+='<div class="view_referral_Doc docsViewCls text-center" attr_docs="mainWorkCovering" style="cursor:pointer;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW COVERING DOCUMENTS  </h5></div>';
													
													mainWorkCoveringDocuments.push(result.reportTypeFilesList[k].filesList[0]);
												}else{
													str+='<div class="view_referral_Doc_empty  text-center" attr_docs="mainWorkCovering" style="cursor:no-drop;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW COVERING DOCUMENTS </h5></div>'; 
												}
											}
											else if(result.reportTypeFilesList[k].key == "ACTION COPY"){
												if(result.reportTypeFilesList[k].filesList !=null && result.reportTypeFilesList[k].filesList.length>0){
													str+='<div class="view_referral_Doc docsViewCls text-center" attr_docs="mainWorkCovering" style="cursor:pointer;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW &nbsp;ACTION&nbsp;COPY</h5></div>';
													
													coveringLetterDoc.push(result.reportTypeFilesList[k].filesList[0]);
												}else{
													str+='<div class="view_referral_Doc_empty  text-center" attr_docs="mainWorkCovering" style="cursor:no-drop;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW &nbsp;ACTION&nbsp;COPY</h5></div>'; 
												}
											}
											else if(result.reportTypeFilesList[k].key == "DETAILED REPORT"){
												if(result.reportTypeFilesList[k].filesList !=null && result.reportTypeFilesList[k].filesList.length>0){
													str+='<div class="view_referral_Doc docsViewCls text-center" attr_docs="mainWorkCovering" style="cursor:pointer;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW DETAILED REPORT</h5></div>';
													
													detailedReportDoc.push(result.reportTypeFilesList[k].filesList[0]);
												}else{
													str+='<div class="view_referral_Doc_empty  text-center" attr_docs="mainWorkCovering" style="cursor:no-drop;padding:8px;"><i class="fa fa-file-text" aria-hidden="true" style="font-size: 22px;"></i> <h5 class="m_top10">VIEW DETAILED REPORT</h5></div>'; 
												}
											}
										}
										
										if(result.subWorksList[i].subWorksList != null && result.subWorksList[i].subWorksList.length>0){
											if(result.subWorksList[i].subWorksList[0].reportTypeFilesList != null && result.subWorksList[i].subWorksList[0].reportTypeFilesList.length>0){
												for(var k in result.subWorksList[i].subWorksList[0].reportTypeFilesList){
													if(result.subWorksList[i].subWorksList[0].reportTypeFilesList[k].key == "DETAILED REPORT"){
														str+='<div class="col-sm-4">';
															if(result.subWorksList[i].subWorksList[0].reportTypeFilesList[k].filesList !=null && result.subWorksList[i].subWorksList[0].reportTypeFilesList[k].filesList.length>0){
																str+='<h5 class="view_referral_Doc docsViewCls f_11" attr_docs="detailed" style="cursor:pointer;">VIEW&nbsp;DETAILED&nbsp;REPORT</h5>';
																detailedReportDoc=result.subWorksList[i].subWorksList[0].reportTypeFilesList[k].filesList;
															}else{
																str+='<h5 class="view_referral_Doc_empty f_11" attr_docs="detailed" style="cursor:no-drop;">VIEW&nbsp;DETAILED&nbsp;REPORT</h5>';
															}
															
														str+='</div>';
														
													}else if(result.subWorksList[i].subWorksList[0].reportTypeFilesList[k].key == "ACTION COPY"){
														str+='<div class="col-sm-4">';
															if(result.subWorksList[i].subWorksList[0].reportTypeFilesList[k].filesList !=null && result.subWorksList[i].subWorksList[0].reportTypeFilesList[k].filesList.length>0){
																str+='<h5 class="view_referral_Doc docsViewCls f_11" attr_docs="covering" style="cursor:pointer;">VIEW&nbsp;ACTION&nbsp;COPY</h5>';
																coveringLetterDoc=result.subWorksList[i].subWorksList[0].reportTypeFilesList[k].filesList;
															}else{
																str+='<h5 class="view_referral_Doc_empty f_11" attr_docs="covering" style="cursor:no-drop;">VIEW&nbsp;ACTION&nbsp;COPY</h5>';
															}
															
														str+='</div>';
													}
												}
											}
										}
												
										str+='</div>';
									str+='</div>';
								}
								
								var totalWorksToUpdate=result.subWorksList[i].subWorksList.length;
								for(var j in result.subWorksList[i].subWorksList){
									if(result.subWorksList[i].subWorksList[j].status == "Completed"){
										totalWorksToUpdate = parseInt(totalWorksToUpdate)-parseInt(1);
									}
								}
								
								str+='<div class="row m_top10">';
										str+='<div class="col-sm-12">';
											str+='<div class="col-sm-2 pull-right">';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													//str+='<button type="button" style="margin-right:15px" class="btn btn-primary btn-sm pull-right viewCommentsCls" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> ADD COMMENT </button>';
												}
											str+='</div>';
											str+='<div class="col-sm-2 pull-right">';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													if(parseInt(totalWorksToUpdate) >0){
														//str+='<button  type="button" class="btn btn-primary btn-sm  pull-right updateStatusChangeCls" style="cursor:pointer;" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'"  attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> UPDATE STATUS </button>';
													}
												}
											str+='</div>';
											str+='<div class="col-sm-2 pull-right">';
												str+='<h5>';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													//str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
													//	str+='<span style="margin-left: 0px;margin-right: 25px;">SELECT ALL</span><input type="checkbox" id="inlineCheckbox1" value="" class="workStatusSelectedAllCls" style="margin-top: 2px;" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'">';
													//str+='</label>';
													
												}
													
												str+='</h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
									
								
								var workCount = 0;
								str+='<div class="row">';
									for(var j in result.subWorksList[i].subWorksList){
										workCount = workCount+1;
										str+='<div class="col-sm-6 m_top10">';
												if(result.subWorksList[i].subWorksList[j].status == "Completed"){
													str+='<div class="panel panel-default panel-completed">';
												}else{
													str+='<div class="panel panel-default panel-pending">';
												}
											  str+='<div class="panel-heading">';
												if(result.subWorksList[i].subWorksList[j].status == "Completed"){
													str+='<div class="row">';
														str+='<div class="col-sm-3">';
															str+='<h3 class="panel-title">WORK No - '+workCount+'</h3>';
														str+='</div>';
														str+='<div class="col-sm-6">';
															str+='<span class="pull-right completed_color"><i class="fa fa-check round_status_completed" aria-hidden="true"></i> Completed</span>';
														str+='</div>';
														str+='<div class="col-sm-3">';
															str+='<h5 class="pull-right">';
															if(glDesignationId != null && parseInt(glDesignationId) == 92){
																;
															}else{
																str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
																str+='</label>';
															}
															str+='</h5>';
														str+='</div>';
													str+='</div>';
												}else if(result.subWorksList[i].subWorksList[j].status == "Pending Endorsement"){
													globalActionName = result.subWorksList[i].subWorksList[j].status;
													str+='<div class="row">';
														str+='<div class="col-sm-3">';
															str+='<h3 class="panel-title">WORK No - '+workCount+'</h3>';
														str+='</div>';
														str+='<div class="col-sm-6">';
															str+='<span class="pull-right pending_color"> <i class="fa fa-pause round_status_pending" aria-hidden="true"></i>Pending Endorsement</span>';
														str+='</div>';
														str+='<div class="col-sm-3">';
															str+='<h5 class="pull-right">';
															if(glDesignationId != null && parseInt(glDesignationId) == 92){
																;
															}else{
																//str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
																//str+='<span style="margin-left: 0px;margin-right: 25px;">SELECT</span> <input type="checkbox" id="" value="'+result.subWorksList[i].subWorksList[j].workId+'" class="workStatusUpdateCls checkbox'+result.subWorksList[i].endorsmentNo+'" style="margin-top: 2px;" attr_department_id="'+result.subWorksList[i].subWorksList[j].deptId+'" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'">';
																//str+='</label>';
															}
															str+='</h5>';
														str+='</div>';
													str+='</div>';
												}else if(result.subWorksList[i].subWorksList[j].status == "Final Approval" || result.subWorksList[i].subWorksList[j].status == "Action Memo" || result.subWorksList[i].subWorksList[j].status == "Detailed Report"){
													globalActionName = result.subWorksList[i].subWorksList[j].status;
													str+='<div class="row">';
														str+='<div class="col-sm-3">';
															str+='<h3 class="panel-title">WORK No - '+workCount+'</h3>';
														str+='</div>';
														str+='<div class="col-sm-6">';
															str+='<span class="pull-right pending_color"> <i class="fa fa-pause round_status_pending" aria-hidden="true"></i>'+result.subWorksList[i].subWorksList[j].status+'</span>';
														str+='</div>';
														str+='<div class="col-sm-3">';
														if(endorseMenNo !=''){
															str+='<h5 class="pull-right">';
															if(glDesignationId != null && parseInt(glDesignationId) == 92){
																;
															}else{
																//str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
																//	str+='<span style="margin-left: 0px;margin-right: 25px;">SELECT</span> <input type="checkbox" id="" value="'+result.subWorksList[i].subWorksList[j].workId+'" class="workStatusUpdateCls checkbox'+result.subWorksList[i].endorsmentNo+'" style="margin-top: 2px;" attr_department_id="'+result.subWorksList[i].subWorksList[j].deptId+'" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'">';
																//str+='</label>';
															}
															str+='</h5>';
														}
														str+='</div>';
													str+='</div>';
												}else if(result.subWorksList[i].subWorksList[j].status == "Not Possible" || result.subWorksList[i].subWorksList[j].status == "Look for Next Year" || result.subWorksList[i].subWorksList[j].status == "Completed" || result.subWorksList[i].subWorksList[j].status == "Partially Completed" ){
													str+='<div class="row">';
														str+='<div class="col-sm-3">';
															str+='<h3 class="panel-title">WORK No - '+workCount+'</h3>';
														str+='</div>';
														str+='<div class="col-sm-6">';
															
															str+='<span class="pull-right pending_color"><i class="fa fa-check round_status_pending" aria-hidden="true"></i> '+result.subWorksList[i].subWorksList[j].status+'</span>';
														str+='</div>';
														str+='<div class="col-sm-3">';
															
													str+='</div>';
												}else{
													globalActionName = result.subWorksList[i].subWorksList[j].status;
													str+='<div class="row">';
														str+='<div class="col-sm-3">';
															str+='<h3 class="panel-title">WORK No - '+workCount+'</h3>';
														str+='</div>';
														str+='<div class="col-sm-6">';
															//str+='<span class="pull-right pending_color"> <i class="fa fa-pause round_status_pending" aria-hidden="true"></i>'+result.subWorksList[i].subWorksList[j].status+'</span>';
															str+='<span class="pull-right pending_color"><i class="fa fa-check round_status_pending" aria-hidden="true"></i> '+result.subWorksList[i].subWorksList[j].status+'</span>';
														str+='</div>';
														str+='<div class="col-sm-3">';
															str+='<h5 class="pull-right">';
															//str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
															//	str+='<span style="margin-left: 0px;margin-right: 25px;">SELECT</span> <input type="checkbox" id="" value="'+result.subWorksList[i].subWorksList[j].workId+'" class="workStatusUpdateCls checkbox'+result.subWorksList[i].endorsmentNo+'" style="margin-top: 2px;" attr_department_id="'+result.subWorksList[i].subWorksList[j].deptId+'" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'">';
															//str+='</label>';
															str+='</h5>';
														str+='</div>';
													str+='</div>';
												}
											 str+='</div>';
											 str+='<div class="panel-body">';
													str+='<div class="row">';
															str+='<div class="col-sm-3" style="border-right: 1px solid #ddd;">';
																str+='<div class="m_top10">';
																	str+='<h5 class="">Work Type</h5>';
																	if(result.subWorksList[i].subWorksList[j].workType !=null && result.subWorksList[i].subWorksList[j].workType.trim().length>0){
																		if(result.subWorksList[i].subWorksList[j].workType !=null && result.subWorksList[i].subWorksList[j].workType.length>15){
																			str+='<h5 class="font_weight m_top10 tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].workType+'">'+result.subWorksList[i].subWorksList[j].workType.substring(0,15)+'...</h5>';
																		}else{
																			str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].subWorksList[j].workType+'</h5>';
																		}
																		
																	}else{
																		str+='<h5 class="font_weight m_top10"> - </h5>';
																	}
																	
																str+='</div>';
																
																str+='<div class="m_top15">';
																	str+='<h5 class="">Brief Lead</h5>';
																	if(result.subWorksList[i].subWorksList[j].briefLeadName !=null && result.subWorksList[i].subWorksList[j].briefLeadName.trim().length>0){
																		if(result.subWorksList[i].subWorksList[j].briefLeadName !=null && result.subWorksList[i].subWorksList[j].briefLeadName.length>15){
																			str+='<h5 class="font_weight m_top10 tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].briefLeadName+'">'+result.subWorksList[i].subWorksList[j].briefLeadName.substring(0,15)+'...</h5>';
																		}else{
																			str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].subWorksList[j].briefLeadName+'</h5>';
																		}
																		
																	}else{
																		str+='<h5 class="font_weight m_top10"> - </h5>';
																	}
																	
																str+='</div>';
																
																str+='<div class="m_top15">';
																	str+='<h5 class="">Grant Under</h5>';
																	if(result.subWorksList[i].subWorksList[j].grantName !=null && result.subWorksList[i].subWorksList[j].grantName.trim().length>0){
																		if(result.subWorksList[i].subWorksList[j].grantName !=null && result.subWorksList[i].subWorksList[j].grantName.length>15){
																			str+='<h5 class="font_weight m_top10 tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].grantName+'">'+result.subWorksList[i].subWorksList[j].grantName.substring(0,15)+'...</h5>';
																		}else{
																			str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].subWorksList[j].grantName+'</h5>';
																		}
																		
																	}else{
																		str+='<h5 class="font_weight m_top10"> - </h5>';
																	}
																	
																str+='</div>';
																
																str+='<div class="m_top15 margin_bottom">';
																	str+='<h5 class="">Est Cost</h5>';
																	if(result.subWorksList[i].subWorksList[j].estimateCostStr !=null && result.subWorksList[i].subWorksList[j].estimateCostStr>0){
																		str+='<h5 class="font_weight m_top10"><i class="fa fa-inr" aria-hidden="true" style="color:green;"></i> '+result.subWorksList[i].subWorksList[j].estimateCostStr+' Lakhs</h5>';
																	}else{
																		str+='<h5 class="font_weight m_top10"> - </h5>';
																	}
																	
																str+='</div>';
															str+='</div>';
															str+='<div class="col-sm-9">';
																
																str+='<div class="pad_light_yash_bg border_yash border_radius_5">';
																	str+='<div class="row">';
																		str+='<div class="col-sm-4">';
																			str+='<h5 class="">Subject</h5>';
																			if(result.subWorksList[i].subWorksList[j].subject !=null && result.subWorksList[i].subWorksList[j].subject.trim().length>0){
																				if(result.subWorksList[i].subWorksList[j].subject !=null && result.subWorksList[i].subWorksList[j].subject.length>10){
																					str+='<h5 class="font_weight m_top5 tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].subject+'">'+result.subWorksList[i].subWorksList[j].subject.substring(0,10)+'...</h5>';
																				}else{
																					str+='<h5 class="font_weight m_top5">'+result.subWorksList[i].subWorksList[j].subject+'</h5>';
																				}
																				
																			}else{
																				str+='<h5 class="font_weight m_top5"> - </h5>';
																			}
																			 
																		str+='</div>';
																		str+='<div class="col-sm-4">';
																			str+='<h5 class="">Sub-Subject</h5>';
																			if(result.subWorksList[i].subWorksList[j].subSubject !=null && result.subWorksList[i].subWorksList[j].subSubject.trim().length>0){
																				if(result.subWorksList[i].subWorksList[j].subSubject !=null && result.subWorksList[i].subWorksList[j].subSubject.length>10){
																					str+='<h5 class="font_weight m_top5 tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].subSubject+'">'+result.subWorksList[i].subWorksList[j].subSubject.substring(0,10)+'...</h5>';
																				}else{
																					str+='<h5 class="font_weight m_top5">'+result.subWorksList[i].subWorksList[j].subSubject+'</h5>';
																				}
																				
																			}else{
																				str+='<h5 class="font_weight m_top5"> - </h5>';
																			}
																		str+='</div>';
																		str+='<div class="col-sm-4">';
																			str+='<h5 class="">Department</h5>';
																			if(result.subWorksList[i].subWorksList[j].deptName != null && result.subWorksList[i].subWorksList[j].deptName.trim().length>0){
																				if(result.subWorksList[i].subWorksList[j].deptName !=null && result.subWorksList[i].subWorksList[j].deptName>10){
																					str+='<h5 class="font_weight m_top5 tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].deptName+'">'+result.subWorksList[i].subWorksList[j].deptName.substring(0,10)+'...</h5>';
																				}else{
																					str+='<h5 class="font_weight m_top5">'+result.subWorksList[i].subWorksList[j].deptName+'</h5>';
																				}
																				
																			}else{
																				str+='<h5 class="font_weight m_top5"> - </h5>';
																			}
																		str+='</div>';
																	str+='</div>';
																str+='</div>';
																
																str+='<div class="pad_light_yash_bg m_top10 border_yash border_radius_5">';
																	str+='<div class="row">';
																		str+='<div class="col-sm-12">';
																			if(result.subWorksList[i].subWorksList[j].leadName != null && result.subWorksList[i].subWorksList[j].leadName.trim().length>0){
																				if(result.subWorksList[i].subWorksList[j].leadName !=null && result.subWorksList[i].subWorksList[j].leadName.length>35){
																					str+='<h5 class="">Lead: <span class="font_weight f_12 tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].leadName+'">'+result.subWorksList[i].subWorksList[j].leadName+'</span></h5>';
																				}else{
																					str+='<h5 class="">Lead: <span class="font_weight f_12">'+result.subWorksList[i].subWorksList[j].leadName+'</span></h5>';
																				}
																				
																			}else{
																				str+='<h5 class="">Lead:  - </h5>';
																			}
																			
																			
																		str+='</div>';
																	str+='</div>';
																str+='</div>';
																
																str+='<div class="pad_light_yash_bg m_top10 border_yash border_radius_5">';
																	str+='<div class="row">';
																		str+='<div class="col-sm-12">';
																			str+='<h5>';
																			if(result.subWorksList[i].subWorksList[j].addressVO.districtName != null && result.subWorksList[i].subWorksList[j].addressVO.districtName.trim().length>0){
																				str+='<span class="m_top5 tooltipCls" style="margin-left: 5px;" data-toggle="tooltip" title="DISTRICT">D: <b>'+result.subWorksList[i].subWorksList[j].addressVO.districtName+'</b>,</span>';
																			}else{
																					//str+='<span class="m_top5"> D: -, </span>';
																			}
																			if(result.subWorksList[i].subWorksList[j].addressVO.assemblyName != null && result.subWorksList[i].subWorksList[j].addressVO.assemblyName.trim().length>0){
																				str+='<span class="m_top5 tooltipCls" data-toggle="tooltip" style="margin-left: 5px;" title="CONSTITUENCY">C: <b>'+result.subWorksList[i].subWorksList[j].addressVO.assemblyName+'</b>,</span>';
																			}else{
																				//str+='<span class="m_top5">C: - ,</span>';
																			}
																			
																			if(result.subWorksList[i].subWorksList[j].addressVO.tehsilName !=null && result.subWorksList[i].subWorksList[j].addressVO.tehsilName.trim().length>0){
																				str+='<span class="m_top5 tooltipCls" data-toggle="tooltip" style="margin-left: 5px;" title="MANDAL">M: <b>'+result.subWorksList[i].subWorksList[j].addressVO.tehsilName+'</b>,</h5>';
																			}else{
																				//str+='<span class="m_top5">M: - ,</span>';
																			}
																			if(result.subWorksList[i].subWorksList[j].addressVO.panchayatName !=null && result.subWorksList[i].subWorksList[j].addressVO.panchayatName.trim().length>0){
																				str+='<span class="m_top5 tooltipCls" data-toggle="tooltip" style="margin-left: 5px;" title="PANCHAYAT">P: <b>'+result.subWorksList[i].subWorksList[j].addressVO.panchayatName+'</b>,</h5>';
																			}else{
																				//str+='<span class="m_top5">P: - ,</span>';
																			}
																			str+='</h5>';
																		str+='</div>';
																		
																	str+='</div>';
																str+='</div>';
																
																str+='<div class="pad_light_yash_bg m_top20 border_yash border_radius_5">';
																	str+='<div class="row">';
																		str+='<div class="col-sm-12">';
																			str+='<h5 class="">WORK DISCRIPTION</h5>'
																			if(result.subWorksList[i].subWorksList[j].workName != null && result.subWorksList[i].subWorksList[j].workName.trim().length>0){
																				if(result.subWorksList[i].subWorksList[j].workName !=null && result.subWorksList[i].subWorksList[j].workName.length>80){
																					str+='<h5 class="font_weight m_top5 tooltipCls" data-toggle="tooltip" title="'+result.subWorksList[i].subWorksList[j].workName+'">'+result.subWorksList[i].subWorksList[j].workName.substring(0,80)+'...</h5>';
																				}else{
																					str+='<h5 class="font_weight m_top10">'+result.subWorksList[i].subWorksList[j].workName+'</h5>';
																				}
																				
																			}else{
																				str+='<h5 class="font_weight m_top10"> - </h5>';
																			}
																		str+='</div>';
																	str+='</div>';
																str+='</div>';
																
															
														str+='</div>';
														
													str+='</div>';
													
													str+='<div class="pad_light_yash_bg m_top10 border_yash border_radius_5">';
														str+='<div class="row">';
													for(var k in result.subWorksList[i].subWorksList[j].reportTypeFilesList){
														if(result.subWorksList[i].subWorksList[j].reportTypeFilesList[k].key == "DETAILED REPORT"){
															str+='<div class="col-sm-4">';
																if(result.subWorksList[i].subWorksList[j].reportTypeFilesList[k].filesList !=null && result.subWorksList[i].subWorksList[j].reportTypeFilesList[k].filesList.length>0){
																	str+='<h5 class="view_referral_Doc docsViewCls f_11" attr_docs="detailed" style="cursor:pointer;">VIEW&nbsp;DETAILED&nbsp;REPORT</h5>';
																	detailedReportDoc=result.subWorksList[i].subWorksList[j].reportTypeFilesList[k].filesList;
																}else{
																	str+='<h5 class="view_referral_Doc_empty f_11" attr_docs="detailed" style="cursor:no-drop;">VIEW&nbsp;DETAILED&nbsp;REPORT</h5>';
																}
																
															str+='</div>';
															
														}else if(result.subWorksList[i].subWorksList[j].reportTypeFilesList[k].key == "ACTION COPY"){
															str+='<div class="col-sm-4">';
																if(result.subWorksList[i].subWorksList[j].reportTypeFilesList[k].filesList !=null && result.subWorksList[i].subWorksList[j].reportTypeFilesList[k].filesList.length>0){
																	str+='<h5 class="view_referral_Doc docsViewCls f_11" attr_docs="covering" style="cursor:pointer;">VIEW&nbsp;ACTION&nbsp;COPY</h5>';
																	coveringLetterDoc=result.subWorksList[i].subWorksList[j].reportTypeFilesList[k].filesList;
																}else{
																	str+='<h5 class="view_referral_Doc_empty f_11" attr_docs="covering" style="cursor:no-drop;">VIEW&nbsp;ACTION&nbsp;COPY</h5>';
																}
																
															str+='</div>';
														}
													}
													str+='<div class="col-sm-4">';
														//str+='<h5 class="view_referral_Doc workWiseHistroyCls f_11 " attr_work_id="'+glPetitionId+'" attr_sub_work_id="'+result.subWorksList[i].subWorksList[j].workId+'"  style="cursor:pointer;">VIEW&nbsp;HISTORY</h5>';
													str+='</div>';
													str+='</div>';
												str+='</div>';

											  str+='</div>';
											str+='</div>';
										str+='</div>';
										
									}
								str+='</div>';
								
								
									str+='<div class="row m_top10">';
										str+='<div class="col-sm-12">';
											str+='<div class="col-sm-2 pull-right">';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													//str+='<button type="button" style="margin-right:15px" class="btn btn-primary btn-sm pull-right viewCommentsCls" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> ADD COMMENT </button>';
												}
											str+='</div>';
											str+='<div class="col-sm-2 pull-right">';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													if(parseInt(totalWorksToUpdate) >0){
														//str+='<button  type="button" class="btn btn-primary btn-sm  pull-right updateStatusChangeCls" style="cursor:pointer;" attr_total_works="'+result.subWorksList[i].noOfWorks+'" attr_petition_id="'+petitionId+'"  attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'"> UPDATE STATUS </button>';
													}
												}
											str+='</div>';
											str+='<div class="col-sm-2 pull-right">';
												str+='<h5>';
												if(glDesignationId != null && parseInt(glDesignationId) == 92){
													;
												}else{
													//str+='<label class="checkbox-inline" style="background-color: #fff;padding: 5px;border: 1px solid #ddd;">';
													//	str+='<span style="margin-left: 0px;margin-right: 25px;">SELECT ALL</span><input type="checkbox" id="inlineCheckbox1" value="" class="workStatusSelectedAllCls" style="margin-top: 2px;" attr_enrorsNo="'+result.subWorksList[i].endorsmentNo+'">';
													//str+='</label>';
												}
												str+='</h5>';
												
												
											str+='</div>';
										
									//ara
											
												
												
											
										str+='</div>';
									str+='</div>';
								
								
						  str+='</div>';
						str+='</div>';
					 str+='</div>';
				 str+='</div>';
			}
		
			str+='</div>';
		str+='</div>';
		
	$("#tableViewDiv").html(str);
	$(".tooltipCls").tooltip();
	
	$("#workDetails1Tab").dataTable({
		"paging":   true,
		"info":     false,
		"searching": true,
		"autoWidth": true,
		//"sDom": '<"top"iflp>rt<"bottom"><"clear">',
		"iDisplayLength": -1,
		"aaSorting": [[ 8, "desc" ]],
		"aLengthMenu": [[500, 100, 200, -1], [500, 100, 200, "All"]]
	});
	$('.dataTables_wrapper').addClass(" m_top25");
		
}

$(document).on("click",".updateStatusChangeCls",function(){
	 $("#endorsWorksId").attr("disabled",false);
	$("#coverLetterLableDivId").hide();
	selectionType="onlyOne";
	var enrorsNo = $(this).attr("attr_enrorsNo");
	if(globalActionId == 1 )
		$("#endorseMentHeadingId").html(" <span class='text-warning'>Present Status </span>: "+globalActionName) ;
	/*else if(globalActionId != 1 )
		$("#endorseMentHeadingId").html(" <span style='color:"+colorCode[1]+"'> Present Status : </span>"+globalActionName+" Pending  ,  <b class='text-success'> Assigned By </b>:"+assignedBy+" ") ;*/
	else
		$("#endorseMentHeadingId").html("<span style='color:#455862'> Endorsed No </span>- "+enrorsNo+" ,<span style='color:"+colorCode[3]+"'> Present Status </span>: "+globalActionName+"    , <b class='text-success'> FORWARDED BY </b>:"+assignedBy+" ");
	if((glDesignationId == 2 || glDesignationId==86) && enrorsNo != null && enrorsNo>0){
	  $("#endorseDivId").show();
	 // $("#hiddenEndorseNo").val(enrorsNo);
	}
	
	 $('#uploadFileDivCls').hide();
		$('#actionmemoDivId').hide();
		$('#detaildReportReviewFiledsDivId').hide();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
	 $("#actioncopyRefId").val(""); 
	 $("#uploadFile").html(""); 
	 $("#coveringLetterGenerator").html(""); 
	 $("#remarkIdErr").html("");
	 $("#ajaxcallImageId").html("");
	 $("#fileUploadIdDiv").hide();//uploadFileDivCls
	var totalWorks = $(this).attr("attr_total_works");
	
	var petionId = $(this).attr("attr_petition_id")
	$("#fileUploadDiv").hide();
	$("#commentsDivId").show();
	$("#leadDivId").hide();
	$("#grantDivId").hide();
	$("#assignOfficerDivId").hide();
	$("#assignDesignationDivId").hide();
	$("#endorsementDivId").hide();
	$(".uploadFuncCls").prop("checked",false);
	$("#endorsmentNo").val('');
	$("#remarksId").val('');
	$("#leadId").html('');
	$("#leadId").html('<option value="0"> SELECT LEAD </option>');
	$("#leadId").trigger("chosen:updated");
	$("#grantId").html('');
	$("#grantId").html('<option value="0">SELECT GRANT UNDER</option>');
	$("#grantId").trigger("chosen:updated");
    $("#assignToId").html('<option value ="0">SELECT DEPARTMENT</option>');
	$("#officerId").html('<option value ="0">SELECT OFFICER </option>');
	$("#finalapproveFile").html('');
	if(globalReviewStatus == "COMPLETED"){
		$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
		initializeSingleUploadDocument("uploadEndorsementDocId");
	}
		
	$("#statusChangeDivId").show();
	$('.addRemoveModel').addClass('closeSecondModal');
	selectdWorksArr=[];
	$(".workStatusUpdateCls").each(function(){
		if($(this).is(":checked")){
			selectdWorksArr.push($(this).val());
			departmentSelectArr.push($(this).attr("attr_department_id"));
		}
	});
	//console.log(selectdWorksArr);
	if(selectdWorksArr.length == 0){
		alert("Please select atleast one work to update.");
		return ;
	}
	$('#endorsWorksId').html("Save Details");
	var notSeleWorks = totalWorks - selectdWorksArr.length;
	//alert(globalActionName);
	$("#statusChangeId").html('');
	if(globalStatusArr !=null && globalStatusArr.length>0){
		 $("#statusChangeId").append('<option value="0" attr_next_status_id="0" >SELECT ACTION</option>');
		for(var i in globalStatusArr){
			var nextStatusId=6;
			if(globalStatusArr[i].key == 1)
				nextStatusId=6;
			else if(globalStatusArr[i].key == 6)
				nextStatusId=7;
			//else if(globalStatusArr[i].key == 7)
				//nextStatusId=3;
			else if(globalStatusArr[i].key == 3)
				nextStatusId=8;
			else if(globalStatusArr[i].key == 4)
				nextStatusId=4;
			else if(globalStatusArr[i].key == 5)
				nextStatusId=5;	
			
			if(enrorsNo !=null && enrorsNo>0){
				if(globalStatusArr[i].key !=1){
					$("#statusChangeId").append('<option attr_next_status_id="'+globalStatusArr[i].key+'" value="'+globalStatusArr[i].key+'">'+globalStatusArr[i].value.toUpperCase()+'</option>');
				}
			}else{
				if(globalStatusArr[i].key == 1)
					$("#statusChangeId").append('<option attr_next_status_id="'+nextStatusId+'" value="'+globalStatusArr[i].key+'"> ENDORSE PETITION </option>');
				else if(globalStatusArr[i].key == 6){
					//if(globalActionId !=6)
						$("#statusChangeId").append('<option attr_next_status_id="'+globalStatusArr[i].key+'" value="'+globalStatusArr[i].key+'"> ACTION COPY</option>');
				}
				else if(globalStatusArr[i].key == 7){
					//if(globalActionId !=7)
						$("#statusChangeId").append('<option attr_next_status_id="'+globalStatusArr[i].key+'" value="'+globalStatusArr[i].key+'"> DETAILEDREPORT </option>');
				}
				else if(globalStatusArr[i].key == 3){
					//if(globalActionId !=3)
						$("#statusChangeId").append('<option attr_next_status_id="'+globalStatusArr[i].key+'" value="'+globalStatusArr[i].key+'"> FINAL APPROVAL </option>');
				}
				else if(globalStatusArr[i].key == 4){
					if(globalActionId !=4)
						$("#statusChangeId").append('<option attr_next_status_id="'+globalStatusArr[i].key+'" value="'+globalStatusArr[i].key+'"> LOOK FOR NEXT YEAR </option>');
				}
				else if(globalStatusArr[i].key == 5){
					if(globalActionId !=5)
						$("#statusChangeId").append('<option attr_next_status_id="'+globalStatusArr[i].key+'" value="'+globalStatusArr[i].key+'"> NOT POSSIBLE </option>');
				}
				/*
				if(globalStatusArr[i].key == 1)
					$("#statusChangeId").append('<option attr_next_status_id="'+nextStatusId+'" value="'+nextStatusId+'"> ENDORSE PETITION </option>');
				*/
				else
					$("#statusChangeId").append('<option attr_next_status_id="'+globalStatusArr[i].key+'" value="'+globalStatusArr[i].key+'">'+globalStatusArr[i].value.toUpperCase()+'</option>');
			}	
			
		}
	}
	$("#statusChangeId").chosen();
	$("#statusChangeId").trigger('chosen:updated');
	
	$("#endorseMentModalDivId").modal("show");
	 $('#imageBuildingId').show();
	if(enrorsNo == null || typeof enrorsNo == 'undefined' || parseInt(enrorsNo) == 0)
		;//$("#endorseMentHeadingId").html(" PRESENT STATUS : "+globalActionName.toUpperCase()+" PENDING ") ;
	else
		;//$("#endorseMentHeadingId").html(" Endorsed No - "+enrorsNo+" , PRESENT STATUS : "+globalActionName.toUpperCase()+" PENDING ");
	
	$("#totalWorksId").html(totalWorks)
	$("#selectdWorksId").html(selectdWorksArr.length)
	$("#notSeleWorksId").html(notSeleWorks)
	//ara
	//getPetitionDetailsBuildImages();
	if(globalReviewStatus == "ASSIGNED"){
		if(!$('#inlineCheckbox2').is(":checked")){
			//$(".actionChangeCls").hide();
			 $("#statusChangeDivId").show();
			 $("#fileUploadDiv").show();
			 $("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
			 initializeSingleUploadDocument("uploadEndorsementDocId");	
			 $("#endorsWorksId").html('Save Details')
			 $('#actionTypeStr').val('REVIEW');
		}
	 }else{
		  //$(".actionChangeCls").show();
		  $("#statusChangeDivId").show();
		  $("#fileUploadDiv").hide();
		  $("#endorsWorksId").html('Save Details')
		 $('#actionTypeStr').val(globalReviewStatus);
	 }
	 //here hide the  SELECT ACTION ,Comment,COVERING LETTER,WORK DOCUMENT,REFER DOCUMENT IF ( DESIGANTION ID =2 AND SELECT ACTION  LIST IS EMPATY
	 if((glDesignationId == 2 || glDesignationId == 86 )&& !$(this).hasClass("activeUpdateStatusCls")){//kk
		$("#statusChangeDivId").hide();
		$("#commentsDivId").hide();
		$("#imageBuildingId").hide();//
		$("#endorseDivId").hide();
		$("#uploadCoverFileDivCls").show();
		$("#uploadCoverFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadCoveringDocId" class="m_top10"/>');
		initializeSingleUploadDocument("uploadCoveringDocId");
	}else{
		$("#commentsDivId").show();
		$('#imageBuildingId').show();
		 $("#statusChangeDivId").show();

	}
});	

$(document).on("click","#assignToUserId",function(){
	var assignType = $(this).val();
	//alert(assignType);
	$("#commentsDivId").hide();
	if(glDesignationId == 23){
		$("#assignOfficerDivId").show();
		$("#assignDesignationDivId").show();
	}else{
		$("#assignOfficerDivId").hide();
		$("#assignDesignationDivId").hide();
	}
	getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr);
	$("#assighTypeId").hide();
	$("#assignToId").html('');
	$("#assignToId").html('<option value="0"> Select designation </option>');
	$("#officerId").html('');
	$("#officerId").html('<option value ="0">SELECT OFFICER  </option>');
	$('#assignningTypeId').html('FORWARD TO');
	$("#assignToId").trigger("chosen:updated");
	$("#officerId").trigger("chosen:updated");
	$('#endorsWorksId').html('Save Details');
	$("#actionTypId").val("0");
	$("#actionTypId").trigger('chosen:updated');
	$('#actionTypeStr').val('COMPLETED');
	if ($(this).is(':checked')) {
		if(assignType == 'ASSIGNED'){
			getPmActionTypeList();
			$('#assignningTypeId').html('ASSIGN TO');
			$('#actionTypeStr').val('ASSIGNED');
			$('#endorsWorksId').html('Assign');
			$("#assighTypeId").show();
			$("#commentsDivId").show();
			$("#assignOfficerDivId").show();
			$("#assignDesignationDivId").show();
		}
	}
});
$(document).on("change","#assignTypeId",function(){
	
	
	$("#commentsDivId").hide();
	$("#assignOfficerDivId").hide();
	$("#assignDesignationDivId").hide();
	$("#assighTypeId").hide();
	$("#assignToId").html('');
	$("#assignToId").html('<option value="0"> Select designation </option>');
	$("#officerId").html('');
	$("#officerId").html('<option value ="0">SELECT OFFICER  </option>');
	
	$("#assignToId").trigger("chosen:updated");
	$("#officerId").trigger("chosen:updated");
	//$('#actionTypeStr').val('COMPLETED');
	$('#endorsWorksId').html('Save Details');
	$("#actionTypId").val("0");
	$("#actionTypId").trigger('chosen:updated');
	$("#statusChangeDivId").show();
	if(assignType == 'ASSIGNED'){
		//$('#actionTypeStr').val('ASSIGNED');
		
		$('#endorsWorksId').html('Assign');
		$("#statusChangeDivId").show();
		$("#assighTypeId").show();
		$("#commentsDivId").show();
		$("#assignOfficerDivId").show();
		$("#assignDesignationDivId").show();
		//getPmActionTypeList(); 
		getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr);
	}
	
});
$(document).on("change","#statusChangeId",function(){	
	var statusId = $(this).val();
	var nextStatusId = $('option:selected', this).attr('attr_next_status_id') ;
		$('#coverLetterPath').val('');
		$('#endorsementNoErr').html('');
		$('#leadIdErr').html('');
	    $('#grantIdErr').html('');
		$('#assignToIdErr').html('');
	    $('#officerIdErr').html('');
		$("#remarkIdErr").html('');
		$('#statusIdErrStr').html('');
		$("#officerId").html('<option value="0">SELECT OFFICER </option>');
        $("#officerId").trigger("chosen:updated");
		$("#remarksId").val('');
		$("#endorsmentNo").val('');
		$("#actionTypeDivId").hide();
		$("#coverLetterLableDivId").hide();
		$("#assighTypeId").hide();
		$("#finalApproDocDiv").hide();
		$("#finalapproveFile").html('');
		$("#documentTypeId").val('0')
		$("#documentTypeId").trigger("chosen:updated");
		$("#fileUploadIdDiv").hide();
		//$("#uploadCoveringLetterFile").html('');
		
	$('#nextStatusId').val(0);
	if(nextStatusId != null && nextStatusId>0)
		$('#nextStatusId').val(nextStatusId);
	if(statusId == 1){
		$("#endorsementNoErr").html('');
		$("#coveringLetterGenerator").html("");
		//$("#letterNameId").html("COVERING");
		$("#endorsementDivId").show();
		$("#commentsDivId").show();
		$("#leadDivId").show();
		$("#coverLetterLableDivId").show();
		$("#grantDivId").show();
		$("#assignOfficerDivId").show();
		$("#assignDesignationDivId").show();
		$("#fileUploadDiv").hide();
		$("#documentTypeDivId").hide();
		$("#referranceNoDivId").hide();
		$("#fileUploadIdDiv").show();
		//$(".saveEnable").prop("disabled", true);
		$("#buttonNameId").html("Forward")
		//$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
		//initializeSingleUploadDocument("uploadEndorsementDocId");
		getPmBriefLeadList($("#hiddenDesignationId").val());
		getPmGrantList();
		
		$("#assignToId").html('');
		 $("#assignToId").html('<option value="0"> Select designation </option>');
		 
		$("#officerId").html('');
		$("#officerId").html('<option value ="0">SELECT OFFICER  </option>');
		//$("#uploadCoveringLetterFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadCoveringLetterFileDocId" class="m_top10"/>');
		//initializeSingleUploadDocument("uploadCoveringLetterFileDocId");
		
		getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr);
		//$('.saveEnable').attr('data-toggle', 'tooltip');
		//$('.saveEnable').attr('title', 'Please generate the covering letter.');
	}else if(statusId == 6 || statusId == 10 || statusId == 11 || statusId == 12 || statusId == 13 ){
		$("#endorsementNoErr").html('');
		$("#endorsentDivId").hide();
		$("#coveringLetterGenerator").html("");
		$("#remarksId").val('');
		//$("#letterNameId").html("ACTION COPY");
		$("#endorsementDivId").hide();
		$("#commentsDivId").show();
		$("#leadDivId").hide();
		$("#grantDivId").hide();
		
		$('#assignningTypeId').html('FORWARD TO');
		$("#assignOfficerDivId").show();
		$("#assignDesignationDivId").show();
		$("#documentTypeDivId").hide();
		$("#referranceNoDivId").hide();
		$("#endorsementDivId").hide();
		$("#buttonNameId").html("Forward")
		$(".saveEnable").prop("disabled", false);
		$('.saveEnable').removeAttr('title');
		//$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
		//initializeSingleUploadDocument("uploadEndorsementDocId");
		$("#fileUploadDiv").show();
		$("#fileUploadIdDiv").hide();
		$("#actionTypeDivId").show();
		getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr);
	}/*else if(statusId == 3){
		$("#endorsementNoErr").html('');
		$("#endorsentDivId").hide();
		$("#coveringLetterGenerator").html("");
		$("#remarksId").val('');
		//$("#letterNameId").html("FINAL COPY");
		$("#endorsementDivId").hide();
		$("#commentsDivId").show();
		$("#leadDivId").hide();
		$("#grantDivId").hide();
		$("#assignOfficerDivId").hide();
		$("#assignDesignationDivId").hide();
		$("#documentTypeDivId").hide();
		$("#referranceNoDivId").hide();
		$("#endorsementDivId").hide();
		$("#buttonNameId").html("Forward")
		$(".saveEnable").prop("disabled", false);
		$('.saveEnable').removeAttr('title');
		//$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
		//initializeSingleUploadDocument("uploadEndorsementDocId");
		$("#fileUploadDiv").show();
		$("#fileUploadIdDiv").hide();
		
		$("#assignToId").html('');
		 $("#assignToId").html('<option value="0"> Select designation </option>');
		 
		$("#officerId").html('');
		$("#officerId").html('<option value ="0">SELECT OFFICER  </option>');
		
		//getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr)
	}*/else if(statusId == 3){
		$("#endorsementNoErr").html('');
		$("#endorsentDivId").hide();
		$("#coveringLetterGenerator").html("");
		$("#remarksId").val('');
		//$("#letterNameId").html("FINAL COPY");
		$("#endorsementDivId").hide();
		$("#commentsDivId").show();
		$("#leadDivId").hide();
		$("#grantDivId").hide();
		$("#assignOfficerDivId").hide();
		$("#assignDesignationDivId").hide();
		$("#documentTypeDivId").show();
		$("#referranceNoDivId").show();
		$("#endorsementDivId").hide();
		$("#buttonNameId").html("Forward")
		$(".saveEnable").prop("disabled", false);
		$('.saveEnable').removeAttr('title');
		$("#finalapproveFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploaddEndorsementDocId" class="m_top10"/>');
		initializeSingleUploadDocument("uploaddEndorsementDocId");
		$("#finalApproDocDiv").show();
		$("#fileUploadDiv").hide();
		$("#fileUploadIdDiv").hide();
		$("#uploadFileDivCls").hide();
		$('#actionmemoDivId').hide();
		$('#detaildReportReviewFiledsDivId').hide();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
		 $("#assignToId").html('');
		 $("#assignToId").html('<option value="0"> Select designation </option>');
		 
		 $("#documentTypeId").val(0);
		 $("#documentTypeId").trigger('chosen:updated');
		 $("#referranceNoId").html('');
		 
		$("#officerId").html('');
		$("#officerId").html('<option value ="0">SELECT OFFICER  </option>');
		
		getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr)
	}else if(statusId == 7){
		$("#endorsentDivId").hide();
		$("#remarkIdErr").html('');
		$("#remarksId").val('');
		//$("#letterNameId").html("DETAILED REPORT");
		$("#commentsDivId").show();
		$("#leadDivId").hide();
		$("#grantDivId").hide();
		$("#assignOfficerDivId").show();
		$("#assignDesignationDivId").show();
		$("#documentTypeDivId").hide();
		$("#referranceNoDivId").hide();
		$("#endorsementDivId").hide();
		$("#detaildReportReviewFiledsDivId").hide();
		$("#actionTypeDivId").show();
		$("#buttonNameId").html("Save Details")
		if(glDesignationId == 84|| glDesignationId == 93 || glDesignationId == 94 || glDesignationId == 95 || glDesignationId == 96 || glDesignationId == 97 || glDesignationId == 98){
			$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
			initializeSingleUploadDocument("uploadEndorsementDocId");
			$("#letterNameId").html(" MEMO / LETTER ")
		}
		$("#fileUploadDiv").show();
		$("#fileUploadIdDiv").hide();
		//$(".saveEnable").prop("disabled", false);
		//$('.saveEnable').removeAttr('title');
		$("#coveringLetterGenerator").html("");
		$('#uploadFileDivCls').hide();
		$('#actionmemoDivId').hide();
		$('#detaildReportReviewFiledsDivId').hide();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
		$("#uploadFile").html('');
		getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr);
	}else if(statusId == 4 || statusId == 5){
		$("#endorsentDivId").hide();
		$("#remarkIdErr").html('');
		$("#remarksId").val('')
		//$("#letterNameId").html("");
		$("#commentsDivId").show();
		$("#leadDivId").hide();
		$("#grantDivId").hide();
		$("#assignOfficerDivId").hide();
		$("#assignDesignationDivId").hide();
		$("#endorsementDivId").hide();
	    $("#fileUploadDiv").hide();
		$("#documentTypeDivId").hide();
		$("#referranceNoDivId").hide();
		$("#fileUploadIdDiv").hide();
		$("#buttonNameId").html("Save Details")
		//$(".saveEnable").prop("disabled", false);
		//$('.saveEnable').removeAttr('title');
		$("#coveringLetterGenerator").html("");
	}
	else if(statusId == 0){
		$("#endorsentDivId").hide();
		$("#coverLetterLableDivId").hide();
		//$("#letterNameId").html("");
		$("#fileUploadDiv").hide();
		$("#commentsDivId").show();
		$("#leadDivId").hide();
		$("#grantDivId").hide();
		$("#assignOfficerDivId").hide();
		$("#assignDesignationDivId").hide();
		$("#endorsementDivId").hide();
		$("#endorsmentNo").val('');
		$("#documentTypeDivId").hide();
		$("#referranceNoDivId").hide();
		$("#remarksId").val('');
		$("#leadId").html('');
		//$(".saveEnable").prop("disabled", false);
		//$('.saveEnable').removeAttr('title');
		//$('.saveEnable').tooltip({disabled: true});
		$("#leadId").html('<option value="0"> SELECT LEAD </option>');
		$("#leadId").trigger("chosen:updated");
		$("#grantId").html('');
		$("#grantId").html('<option value="0">SELECT GRANT UNDER</option>');
		$("#grantId").trigger("chosen:updated");
		$("#assignToId").html('<option value ="0">SELECT DEPARTMENT</option>');
		$("#officerId").html('<option value ="0">SELECT OFFICER </option>');
		//$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');	
		$("#coveringLetterGenerator").html("");
		$("#fileUploadIdDiv").hide();
		$('#uploadFileDivCls').hide();
		$('#actionmemoDivId').hide();
		$('#detaildReportReviewFiledsDivId').hide();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
		$("#uploadFile").html('');
		return;
	}
	if(statusId == 6 || statusId == 3 || statusId == 4 || statusId == 5 ){
		$('#uploadFileDivCls').hide();
		$('#actionmemoDivId').hide();
		$('#detaildReportReviewFiledsDivId').hide();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
		$("#uploadFile").html('');
	}else if(statusId == 14 || statusId == 15 ){
		$("#uploadFileDivCls").show();
		$('#actionmemoDivId').hide();
		
		$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
		$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
		initializeSingleUploadDocument("uploadEndorsementDocId");
		
		
	} 
	if(glDesignationId == 23){
		$('#actionTypeStr').val("ASSIGNED");
		$("#uploadFileDivCls").hide();
		$('#actionmemoDivId').hide();
	
		$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
		$("#uploadFile").html('');
		
		/*if(statusId == 6){
			$('#actionTypeStr').val("ASSIGNED");
			$("#uploadFileDivCls").hide();
			$("#uploadFile").html('');
		}
		else if(statusId != 6){
			$("#uploadFileDivCls").show();
			$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
			initializeSingleUploadDocument("uploadEndorsementDocId");
			$('#actionTypeStr').val("COMPLETED");
		} */
	}else if(glDesignationId == 94 || glDesignationId == 95 || glDesignationId == 96 || glDesignationId == 97 || glDesignationId == 98){
		if(statusId == 6){
			$('#actionTypeStr').val("ASSIGNED");
			$("#uploadFileDivCls").hide();
			$('#actionmemoDivId').hide();
			
		$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
			$("#uploadFile").html('');
		}
		else if(statusId != 6){
			$("#uploadFileDivCls").show();
			$('#actionmemoDivId').hide();
			
			if(statusId != 7)
				$('#detaildReportReviewFiledsDivId').show();
			else
				$('#detaildReportReviewFiledsDivId').hide();
			
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
			$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
			initializeSingleUploadDocument("uploadEndorsementDocId");
			$('#actionTypeStr').val("COMPLETED");
		} 
	}
	
	if(statusId == 14 || statusId == 15 ){
		$("#uploadFileDivCls").show();
		$('#actionmemoDivId').hide();
		
		$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
		$("#uploadFile").html('<input type="file" attr_name="" name="" attr_image_tyep=""  id="uploadEndorsementDocId" class="m_top10"/>');
		initializeSingleUploadDocument("uploadEndorsementDocId");
		$("#assignToId").html('<option value ="0">SELECT DEPARTMENT</option>');
		$("#officerId").html('<option value ="0">SELECT OFFICER </option>');
		$("#assignOfficerDivId").show();
		$("#assignDesignationDivId").show();
		$('#actionTypeStr').val("COMPLETED");
		getLoginUserAccessSubDeptDesignationDetail(departmentSelectArr);
	}else if(statusId == 3){
		$('#actionTypeStr').val("COMPLETED");
			$("#uploadFileDivCls").hide();
			$('#actionmemoDivId').hide();
			
		
		$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
			$("#uploadFile").html('');
	}		
});	
$(document).on("click",".docsViewCls",function(){
	$("#docsViewModalId").html('');
	$("#docsModalDivId").modal("show");
	var docsList = [];
	var str="";
	
	if($(this).attr("attr_docs") == "referral"){
		$("#viewDocumentHeading").html("Referral Documents")
		 docsList = candidateReferralDoc;
	}else if($(this).attr("attr_docs") == "fileList"){
		$("#viewDocumentHeading").html("Work Documents")
		 docsList = projectDocuments;
	}else if($(this).attr("attr_docs") == "covering"){
		$("#viewDocumentHeading").html("Covering Letters")
		 docsList = coveringLetterDoc;
	}else if($(this).attr("attr_docs") == "detailed"){
		$("#viewDocumentHeading").html("Detailed Reports")
		 docsList = detailedReportDoc;
	}else if($(this).attr("attr_docs") == "mainWorkCovering"){
		$("#viewDocumentHeading").html("Detailed Reports")
		 docsList = mainWorkCoveringDocuments;
	}else if($(this).attr("attr_docs") == "historyLetter"){
		$("#viewDocumentHeading").html("Uploaded Documents")
		 docsList = historyLetterArr;
	}else if($(this).attr("attr_docs") == "historyDocs"){
		$("#viewDocumentHeading").html("Uploaded Documents");
		var attr_name =$(this).attr('attr_name');
		if(historyDocsArr != null && historyDocsArr.length>0){
			for(var i in historyDocsArr){
				if(historyDocsArr[i].name==attr_name)
					docsList = historyDocsArr[i].filesArr;
			}
		}
	}
	
	if(docsList != null && docsList.length >0){
			for(var j in docsList){
				var scanCopySpl = docsList[j].value.split("."); 
				var scanCopyExt = $.trim(scanCopySpl[scanCopySpl.length-1].toLowerCase()); 
					str+='<div class="col-sm-6">';
						str+='<div class="viewImageCss">';
						if(scanCopyExt =="pdf"){
							str+='<a class="fancyboxView" href="#inline'+j+'">';
							str+='<div class="mouse-over"><a class="fancyboxView" target="_blank"  href="'+docsList[j].value+'"> Expand </a> </div>';
								str+='<object data="'+docsList[j].value+'" type="application/pdf" width="100%"height="300px;"></object>';
								
							str+='</a>';
							str+='<div id="inline'+j+'" style="width:100%;display: none;">';
								str+='<object data="'+docsList[j].value+'" type="application/pdf"   style="cursor:pointer;height:1000px;width:1000px"></object>';
								
							str+='</div>';
							
						}else if( scanCopyExt =="jpeg" || scanCopyExt =="jpg"  || scanCopyExt =="gif"  || scanCopyExt =="bmp"  || scanCopyExt =="png"){
							str+='<a class="fancyboxView" href="#inline'+j+'">';
							str+='<div class="mouse-over"><a class="fancyboxView" target="_blank"  href="/docsList[j].value"> Expand </a></div>';
								str+='<img src="'+docsList[j].value+'"  width="100%" height="300px;"></img>';
								
							str+='</a>';
							str+='<div id="inline'+j+'" style="width:100%;display: none;">';
								str+='<img src="'+docsList[j].value+'"    style="cursor:pointer;height:1000px;width:1000px"></object>';
								
							str+='</div>';
						}else{
							str+='<b>Click <a href="javascript:{};" onclick="openDoc(\''+docsList[j].value+'\')">Here</a> To View Document</b>';
							
						}
			
				str+='</div>';
			str+='</div>';
	
		}
	}

		$("#docsViewModalId").html(str);
		$(".fancyboxView").fancybox({live: false});
		
});

function endorsingSubWorksAndAssigningToOfficer(){
	
	var flag = false;
	$("#ajaxcallImageId").html('');
     $('#endorsementNoErr').html(' ');
	 $('#leadIdErr').html('');
	 $('#grantIdErr').html('');
	 $('#assignToIdErr').html('');
	 $('#officerIdErr').html('');
	 $('#remarkIdErr').html('');
	 $('#statusIdErrStr').html(' ');
	 $('#fileUploadIdErr').html(' ');
	 
	
	var endorsementId =$("#endorsmentNo").val();
	var leadIdValue = $("#leadId").val();
	var otherLeadName = $("#leadOtherId").val();
	 //var grantIdValue = $("#grantId").val();
	 var assignToIdValue = $("#assignToId").val();
	var officerIdValue = $("#officerId").val();
	var remarksId ="";
	if($("#commentsDivId").is(':visible')){
		 remarksId =$("#remarksId").val();
	}
	var statusId = $("#statusChangeId").val();
	var documentTypeId = $("#documentTypeId").val();
	var coveringLetterPath=$('#coverLetterPath').val();
		
	if(statusId == 0){
		if($("#statusChangeDivId").is(':visible')){
		 $("#statusIdErrStr").html('<h5>Please select action </h5>');
			 flag=true;
	}
	if($("#commentsDivId").is(':visible')){
		if(remarksId == 0 || remarksId == '' || remarksId == null || remarksId.trim().length == 0){
			$('#remarkIdErr').html("<h5 style='color:red;'>Comment is required</h5>");
			   flag = true ; 
		 }else{
			$('#remarkIdErr').html("");
		 }
	}
	}else if(statusId == 1){
		if($("#statusChangeDivId").is(':visible')){
		  if(endorsementId == 0 || endorsementId == '' || endorsementId == null || endorsementId.trim().length == 0){
			   $('#endorsementNoErr').html("<h5 style='color:red;'>Endosment no is required</h5>");
		        flag =true;
	       }else{
			   $('#endorsementNoErr') .html("");
		   }
		   
		   if($("#fileUploadIdDiv").is(':visible')){
			if(coveringLetterPath ==null || coveringLetterPath.length ==0){
				 $('#coveringLetterPthErr').html("<h5 style='color:red;'>Please generate Covering Letter to endorse the petition.</h5>");
					flag =true;
		    }else{
				$('#coveringLetterPthErr') .html("");
		    }
		   }
			if(leadIdValue == null || leadIdValue ==0){
				$('#leadIdErr').html("<h5 style='color:red;'>Please select brief lead</h5>");
				flag =true; 
			}else{
				  $('#leadIdErr').html("");
			}
			/* if(grantIdValue == null || grantIdValue ==0){
				 $('#grantIdErr').html("<h5 style='color:red;'>Please select grant</h5>");
				 flag =true ; ;
			 }else{
				  $('#grantIdErr').html("");
			 }*/
		 
			 if(assignToIdValue == null || assignToIdValue==0){
				$('#assignToIdErr').html("<h5 style='color:red;'>Please select assign to</h5>");
				flag =true ; 
			 }else{
				 $('#assignToIdErr').html("");
			 }
			 
			 if(officerIdValue == null || officerIdValue==0){
				 $('#officerIdErr').html("<h5 style='color:red;'>Please select officer </h5>");
				 flag = true ; 
			 }else{
				  $('#officerIdErr').html(""); 
			 } 
			 
			if(remarksId == 0 || remarksId == '' || remarksId == null || remarksId.trim().length == 0){
				//$('#remarkIdErr').html("<h5 style='color:red;'>Comment is required</h5>");
				//   flag = true ; 
			 }else{
				 $('#remarkIdErr').html("");
			 }
			 
			  if(leadIdValue != null && (parseInt(leadIdValue) == 37 || parseInt(leadIdValue)==38)){
				 if(otherLeadName == 0 || otherLeadName == '' || otherLeadName == null || otherLeadName.trim().length == 0){
						$('#leadOtherErr').html("<h5 style='color:red;'>Other Lead Name is required</h5>");
						flag =true;
					}
					else if( otherLeadName.trim().length <5){
						 $('#leadOtherErr').html("<h5 style='color:red;'>Please enter a valid Other Lead Name...( Min 5 charactors required)</h5>");
						flag =true;
					 }
					else{
					   $('#leadOtherErr') .html("");
					}
			 }
			 
		}
	 }else if(statusId == 6){
		  if(assignToIdValue == null || assignToIdValue==0){
			$('#assignToIdErr').html("<h5 style='color:red;'>Please select assign to</h5>");
			   flag =true ; 
		  }else{
			 $('#assignToIdErr').html("");
		  }
		 if(officerIdValue == null || officerIdValue==0){
			 $('#officerIdErr').html("<h5 style='color:red;'>Please select officer </h5>");
			    flag = true ; 
		 }else{
			  $('#officerIdErr').html(""); 
		 } 
		if(remarksId == 0 || remarksId == '' || remarksId == null || remarksId.trim().length == 0){
			//$('#remarkIdErr').html("<h5 style='color:red;'>Comment is required</h5>");
			//   flag = true ; 
		 }else{	
			 //$('#remarkIdErr').html("");
		 }
	}else if(statusId == 4  || statusId == 5){
		  var remarksId =$("#remarksId").val();
		 if(remarksId == 0 || remarksId == '' || remarksId == null || remarksId.trim().length == 0){
			$('#remarkIdErr').html("<h5 style='color:red;'>Comment is required</h5>");
			  flag = true ; 
		 }else{
			$('#remarkIdErr').html("");
		 }
	 }else if(statusId == 7  || statusId == 10  || statusId == 11  || statusId == 12 || statusId == 13 ||statusId == 14  ||statusId == 15){
		  if(assignToIdValue == null || assignToIdValue==0){
			$('#assignToIdErr').html("<h5 style='color:red;'>Please select assign to</h5>");
			   flag =true ; 
		  }else{
			 $('#assignToIdErr').html("");
		  }
		 if(officerIdValue == null || officerIdValue==0){
			 $('#officerIdErr').html("<h5 style='color:red;'>Please select officer </h5>");
				flag = true ; 
		 }else{
			  $('#officerIdErr').html(""); 
		 } 
		  $('#fileUploadIdErr').html(""); 
		 
		   if(glDesignationId == 79  || glDesignationId == 80   || glDesignationId == 81  ||  glDesignationId == 82  || glDesignationId == 83  ||  glDesignationId == 84  || glDesignationId == 87 || glDesignationId == 93 || glDesignationId == 94 || glDesignationId == 95 || glDesignationId == 96 || glDesignationId == 97 || glDesignationId == 98){
				var uploadfile = document.getElementById('uploadEndorsementDocId');
				if(uploadfile != null && uploadfile.value == '')
				{
					$('#fileUploadIdErr').html('Please upload the attachment');
					flag = true ; 
				}
		   }
	}else if(statusId == 8){
		if(documentTypeId == null || documentTypeId==0){
			 $('#documentTypeIdErr').html("<h5 style='color:red;'>Please select document type </h5>");
			 flag = true ; 
		 }else{
			  $('#documentTypeIdErr').html(""); 
		 } 
	}
	 $('#fileCoverUploadIdErr').html(""); 
	 
	 if(endorsementId == null || endorsementId.length==0){
		endorsementId =$("#hiddenEndorseNo").val();
	 }
	 
	if((glDesignationId == 2 || glDesignationId==86) && endorsementId.trim().length >0){
		if($("#uploadCoverFileDivCls").is(':visible')){
			   var uploadfile = document.getElementById('uploadCoveringDocId');
			if(uploadfile != null && uploadfile.value == '')
			{
				$('#fileCoverUploadIdErr').html('Please upload the covering letter');
				flag = true ; 
			}
			 $('#endorseDivId').show();
			  $("#nextStatusId").val('');
			 $("#nextStatusId").val(6);
		 }
	}
	
	if(flag==true){
		return;
	}
	
//return;
	$("#ajaxcallImageId").html("<center><h4 style='color: green;'>Please Wait......  </h4></center>");
	   //$('#endorsWorksId').hide();
	   var endorsementNO="";
	   var formData = new FormData();
	   formData.append("petitionId",glPetitionId);
	   formData.append("selectionType",selectionType);
	   
	   $('#endorsingSubWorksId input').each(
		  function(){			  
			var input = $(this);
			var text =input.attr('type');
			var id = input.attr('id');
			//debugger;
			if (typeof id !== typeof undefined && id !== false) {
				if(text=='text' || text=='hidden'){
					var name = $('#'+id+'').attr('name');
					if(id == 'actioncopyRefId'){
						formData.append($('#'+id+'').attr('attr_name'), $('#'+id+'').val());						
					}else if(name =='refNo' && (formData.get('refNo') == null || formData.get('refNo') == undefined || formData.get('refNo') == 'undefined')){
						formData.append(name, $('#'+id+'').val());
					}else{
						formData.append(name, $('#'+id+'').val());
					}
					
					if(name=="petitionId")
						petitionId = $('#'+id+'').val();
					else if(name=="endorsementNO")
						endorsementNO = $('#'+id+'').val();
						
				}else if(text=='radio'){
					if($('#'+id+'').is(':checked')){
						var name = $('#'+id+'').attr('name');
						formData.append(name, $('#'+id+'').val());
					}
				}else if(text=='file'){
					if(this.files !=null && this.files.length>0){
						for(var i = 0; i < this.files.length; i++){
							formData.append("filesList["+i+"]", this.files[i]);
						}
					}
				}
			}			
		}
	);
	
	$('#endorsingSubWorksId textarea').each(
		  function(){			  
			var input = $(this);
				var id = input.attr('id');
				if (typeof id !== typeof undefined && id !== false) {
				var name = $('#'+id+'').attr('name');
				formData.append(name, $('#'+id+'').val());
			}
		}
	);
	
	$('#endorsingSubWorksId select').each(
		  function(){			  
				var input = $(this);
				var id = input.attr('id');
				if (typeof id !== typeof undefined && id !== false) {
					var name = $('#'+id+'').attr('name');
					formData.append(name, $('#'+id+'').val());
			}
		}
	);
//	alert(endorsementId);
//	alert(glDesignationId);
	//alert($("#nextStatusId").val());
	if(selectdWorksArr !=null && selectdWorksArr.length>0){
			for(var i = 0; i < selectdWorksArr.length; i++){
				formData.append("workIds["+i+"]", selectdWorksArr[i]);
				if($("#nextStatusId").val()==6){
					if(formData.get('statusType') == null || formData.get('statusType') == undefined || formData.get('statusType') == 'undefined')
						formData.append("statusType", "COVERING LETTER");
				}else if($("#nextStatusId").val()==7 || $("#nextStatusId").val()==10 || $("#nextStatusId").val()==11 || $("#nextStatusId").val()==12 || $("#nextStatusId").val()==13  ){
					if(formData.get('statusType') == null || formData.get('statusType') == undefined || formData.get('statusType') == 'undefined')
						formData.append("statusType", "ACTION COPY");
				}else if($("#nextStatusId").val()==3){
					if(formData.get('statusType') == null || formData.get('statusType') == undefined || formData.get('statusType') == 'undefined')
						formData.append("statusType", "OTHER REPORT");
				}else if($("#nextStatusId").val()==14){
					if(formData.get('statusType') == null || formData.get('statusType') == undefined || formData.get('statusType') == 'undefined')
						formData.append("statusType", "DETAILED REPORT");
				}else{
					if((formData.get('statusType') == null || formData.get('statusType') == undefined || formData.get('statusType') == 'undefined') && !$(".uploadFuncCls").is(":checked")){
						formData.append("statusType", "OTHER REPORT");
					}
				}
		}
	//if($(".uploadFuncCls").is(":checked")){
		if($("#endorseDivId").is(':visible')){
			formData.delete("statusType");
			formData.append("statusType", "COVERING LETTER");
			formData.append("dataType", $(".uploadFuncCls").val());
			if(endorsementId == null || endorsementId.length==0){
				alert("some thing wrong. Please try again.");
				return;
			}
				
		}
		console.log(formData.get('statusType'));
		/*
		var nextStatusId=6;
			if(globalStatusArr[i].key == 1)
				nextStatusId=6;
			else if(globalStatusArr[i].key == 6)
				nextStatusId=7;
			//else if(globalStatusArr[i].key == 7)
				//nextStatusId=3;
			else if(globalStatusArr[i].key == 3)
				nextStatusId=8;
			else if(globalStatusArr[i].key == 4)
				nextStatusId=4;
			else if(globalStatusArr[i].key == 5)
				nextStatusId=5;	
		
		*/
	}
	if($('#actionTypeStr').val() == ""){
		$('#actionTypeStr').val("COMPLETED");
	}
	//return;
	//alert(111);
	//formData.append("petitionId", petitionId);
	//alert(formData.get("refNo"));
	$("#endorsWorksId").attr("disabled",true);
$.ajax({
			url: $("#endorsingSubWorksId").attr("action"),
			data: formData,
			type: "POST",               
			processData: false,
			contentType: false,
			success: function(result) {
				$("#savingDetailsSpinner").html('');
				
					if(result!=null){
					  if(result.exceptionMsg == "SUCCESS"){
						
						 setTimeout(function () {
							$("#ajaxcallImageId").html("<center><h4 style='color: green;'>Updated Successfully</h4></center>");
							alert("Work(s) details updated successfully");
							window.location.reload();
						}, 5000);
						    setTimeout(function () {
						 $("#endorseMentModalDivId").modal("hide");
						}, 6000); 
							//$(".saveEnable").prop("disabled", true);							
						  //getPetitionDetails(petitionId,endorsementNO);
						 
						 // $("#statusMsgAppntReqt").html("<center><h3 style='color: green;margin-top:-25px;'>Application Saved Successfully</h3></center>").fadeOut(4000);
					  }else{
						  $('#endorsWorksId').show();
						  $("#endorsWorksId").attr("disabled",false);
					  }
					}else{
						$("#endorsWorksId").attr("disabled",false);
					 $('#endorsWorksId').show();
					}
			},
			error: function(request,error) { 
				$("#savingDetailsSpinner").html('');
				setTimeout(function () {
						$("#ajaxcallImageId").html("<center><h4 style='color: red;'>Error occured while updating details.try again.</h4></center>")
						}, 5000);
						//$(".saveEnable").prop("disabled", false);
				//console.log(request);
				//console.log(error);
				 //$("#").html("<center><h5 style='color: green;margin-top:-25px;'>Error occured while updating details.Pelase check once any required data missing to fill.Then try again.</h5></center>")
				 //$("#ajaxImageId").hide();
				//alert("Error occured while updating details.Pelase check once any required data missing to fill.Then try again.");	
				$('#endorsWorksId').show();	
				$("#endorsWorksId").attr("disabled",false);
			}
     });
 }	
 
 $(document).on("click",".workStatusClassicalViewSelectedAllCls",function(){
	var endorsNo = $(this).attr("attr_enrorsNo");
	
	if($(this).is(":checked")){
		$(".workStatusClassicalViewSelectedAllCls").prop("checked",true);
		$(".ClassicalViewCheckbox"+endorsNo).prop("checked",true);
	}else{
		$(".workStatusClassicalViewSelectedAllCls").prop("checked",false);
		$(".ClassicalViewCheckbox"+endorsNo).prop("checked",false);
	}
 });
 
 $(document).on("click",".workStatusSelectedAllCls",function(){
	var endorsNo = $(this).attr("attr_enrorsNo");
	if($(this).is(":checked")){
		$(".checkbox"+endorsNo).prop("checked",true);
	}else{
		$(".checkbox"+endorsNo).prop("checked",false);
	}
 });
 
 $(document).on('click','.viewCommentsCls',function(){
	var totalWorks = $(this).attr("attr_total_works");
	var enrorsNo = $(this).attr("attr_enrorsNo");
	$('#endorseDivId').hide();
	$('.uploadCoverFileDivCls').hide();
	 
	selectdWorksArr=[];
	$(".workStatusUpdateCls").each(function(){
		if($(this).is(":checked")){
			selectdWorksArr.push($(this).val());
			departmentSelectArr.push($(this).attr("attr_department_id"));
		}
	});
	if(selectdWorksArr.length == 0){
		alert("Please select atleast one work to update.");
		return ;
	}
	
	$("#remarksId").val('');
	//$("#endorseMentHeadingId").html("Comment ");
	$("#finalapproveFile").html('');
	$("#remarkIdErr").html('');
	$("#viewImageCss").html('');
	$("#coverLetterLableDivId").hide();
	$("#endorsementDivId").hide();
	$("#coveringLetterGenerator").hide();
	$("#fileUploadIdDiv").hide();
	$("#totalWorkEditDivId").hide();
	$("#statusChangeDivId").hide();
	$("#endorsentDivId").hide();
	$("#leadDivId").hide();
	$("#grantDivId").hide();
	$("#assignDesignationDivId").hide();
	$("#assignOfficerDivId").hide();
	$("#fileUploadDiv").hide();
	$("#commentsDivId").show();
	$("#saveBtnId").show();
	
	$("#endorseMentModalDivId").modal("show");
	 
	$('#endorsWorksId').show();
	$('#endorsWorksId').html("Save Details");
	
});

function generateCoveringLetterForPetition(){
	//$('#endorsWorksId').hide();
	
	
$("#imageOrPdfDisId").show();
  $('#coveringLetterGenerator').show();
  
	var flag = false;
	$('#endorsementNoErr').html('');
	$('#leadIdErr').html('');
	$('#grantIdErr').html(''); 
	
	var endorsementId =$("#endorsmentNo").val();
	var leadIdValue = $("#leadId").val();
	var otherLeadName = $("#leadOtherId").val();
	
	var grantIdValue = $("#grantId").val();
	var statusId = $("#statusChangeId").val();
	 var assignToIdValue = $("#assignToId").val();
	var officerIdValue = $("#officerId").val();
	if(statusId == 1){
		if(endorsementId == 0 || endorsementId == '' || endorsementId == null || endorsementId.trim().length == 0){
			   $('#endorsementNoErr').html("<h5 style='color:red;'>Endosment no is required</h5>");
		        flag =true;
		}else{
		   $('#endorsementNoErr') .html("");
		}
	    if(leadIdValue == null || leadIdValue ==0){
			$('#leadIdErr').html("<h5 style='color:red;'>Please select brief lead</h5>");
				flag =true; 
			}else{
				$('#leadIdErr').html("");
		}
		/* if(grantIdValue == null || grantIdValue ==0){
			$('#grantIdErr').html("<h5 style='color:red;'>Please select grant</h5>");
		    flag =true ;
		}else{
			 $('#grantIdErr').html("");
		} */
		  if(assignToIdValue == null || assignToIdValue==0){
			$('#assignToIdErr').html("<h5 style='color:red;'>Please select assign to</h5>");
			flag =true ; 
		 }else{
			 $('#assignToIdErr').html("");
		 }
		 
		 if(officerIdValue == null || officerIdValue==0){
			 $('#officerIdErr').html("<h5 style='color:red;'>Please select officer </h5>");
			 flag = true ; 
		 }else{
			  $('#officerIdErr').html(""); 
		 } 
		 
		 if(leadIdValue != null && (parseInt(leadIdValue) == 37 || parseInt(leadIdValue)==38)){
			 if(otherLeadName == 0 || otherLeadName == '' || otherLeadName == null || otherLeadName.trim().length == 0){
					$('#leadOtherErr').html("<h5 style='color:red;'>Other Lead Name is required</h5>");
					flag =true;
				}
				else if( otherLeadName.trim().length <5){
					 $('#leadOtherErr').html("<h5 style='color:red;'>Please enter a valid Other Lead Name...( Min 5 charactors required)</h5>");
					flag =true;
				 }
				else{
				   $('#leadOtherErr') .html("");
				}
		 }
	}
	

	if(flag==true)
	return; 
	 
	 var  schemeIdsListArr =[];
	   var endorsementNO="";
	  // var petitionId=0;
	   var formData = new FormData();
	   formData.append("petitionId",glPetitionId);
	   $('#endorsingSubWorksId input').each(
		  function(){			  
			var input = $(this);
			var text =input.attr('type');
			var id = input.attr('id');
			//debugger;
			if (typeof id !== typeof undefined && id !== false) {
				if(text=='text' || text=='hidden'){
					var name = $('#'+id+'').attr('name');
					formData.append(name, $('#'+id+'').val());
					/* if(name=="petitionId")
						petitionId = $('#'+id+'').val();
					else */  if(name=="endorsementNO")
						endorsementNO = $('#'+id+'').val();
						if(name =="otherLead")
							otherLead = $('#'+id+'').val();
							
				}else if(text=='radio'){
					if($('#'+id+'').is(':checked')){
						var name = $('#'+id+'').attr('name');
						formData.append(name, $('#'+id+'').val());
					}
				}else if(text=='file'){
					if(this.files !=null && this.files.length>0){
						for(var i = 0; i < this.files.length; i++){
								formData.append("filesList["+i+"]", this.files[i]);
						}
					}
				}
			}			
		}
	);
	var lableChcked = "";
	$(".coverLtrLableCls").each(function(){
		if($(this).is(":checked"))
			lableChcked = $(this).val();
	});
	if(lableChcked == '' || lableChcked ==  null){
		alert("check with or without header.");
		return;
	}
	
	var leadId = $("#leadId").val();
	var grantId = $("#grantId").val();
	if(selectdWorksArr !=null && selectdWorksArr.length>0){
			for(var i = 0; i < selectdWorksArr.length; i++){
				schemeIdsListArr.push(selectdWorksArr[i]);
		}
	}
 $('#coveringLetterPthErr').html("<span style='color:green;'> Please wait Covering Letter is generating...</span>");
var json = {
   pageId :glPetitionId,//petitionId
   schemeIdsList:schemeIdsListArr,//subWorkIds
   leadName:leadId,
   groupName:grantId ,
	endValue:endorsementNO,//endorsmentNo
	pType:"viewPage",
	type:"COVERING LETTER",
	filterId:officerIdValue,
	path :lableChcked,
	otherLead : otherLead
  }           
 $.ajax({              
  type:'POST',    
  url: 'generateCoveringLetterForPetition',
  dataType: 'json',
  data : JSON.stringify(json),
  beforeSend :   function(xhr){
   xhr.setRequestHeader("Accept", "application/json");
   xhr.setRequestHeader("Content-Type", "application/json");
  }
 }).done(function(result){
	  $("#coverLetterPath").val("");
	  $('#endorsementNoErr').html("");
	  $('#coveringLetterPthErr').html("");
	 if(result !=null && result.exceptionMsg != "Exist"){
		  $('#endorsementNoErr').html("<span style='color:green;'> covering letter generated successfully...</span>");
		 var str='';
		 var scanCopySpl = result.exceptionMsg.split("."); 
			var scanCopyExt = $.trim(scanCopySpl[scanCopySpl.length-1].toLowerCase()); 
			str+='<div  class="row">';
			str+='<div class="col-sm-4 m_top10">';
				str+='<div class="viewImageCss">';
				if(scanCopyExt =="pdf"){
					str+='<a class="fancyboxView" href="#inlineddd">';
					str+='<div class="mouse-over"> <a class="fancyboxView" target="_blank"  href="http://www.mydepartments.in/PRRWS/'+result.exceptionMsg+'"> Expand </a>  </div>';
						str+='<object data="http://www.mydepartments.in/PRRWS/'+result.exceptionMsg+'" type="application/pdf" width="100%"height="100px;"></object>';
						
					str+='</a>';
					str+='<div id="inlineddd" style="width:100%;display: none;">';
						str+='<object data="http://www.mydepartments.in/PRRWS/'+result.exceptionMsg+'" type="application/pdf"   style="cursor:pointer;height:1000px;width:1000px"></object>';
						
					str+='</div>';
					$("#coverLetterPath").val(result.exceptionMsg);
					//$("#saveBtnId").show();
					//$(".saveEnable").prop("disabled", false);
				}else if( scanCopyExt =="jpeg" || scanCopyExt =="jpg"  || scanCopyExt =="gif"  || scanCopyExt =="bmp"  || scanCopyExt =="png"){
					str+='<a class="fancyboxView" href="#inlineddds">';
					str+='<div class="mouse-over"> <a class="fancyboxView" target="_blank"  href="http://www.mydepartments.in/PRRWS/'+result.exceptionMsg+'"> Expand </a>  </div>';
						str+='<img src="http://www.mydepartments.in/PRRWS/'+result.exceptionMsg+'"  width="100%" height="100px;"></img>';
						
					str+='</a>';
					str+='<div id="inlineddds" style="width:100%;display: none;">';
						str+='<img src="http://www.mydepartments.in/PRRWS/'+result.exceptionMsg+'"    style="cursor:pointer;height:1000px;width:1000px"></object>';
						
					str+='</div>';
					$("#coverLetterPath").val(result.exceptionMsg);
					$("#saveBtnId").show();
				}else{
					str+='<b>Click <a href="javascript:{};" onclick="openDoc(\'http://www.mydepartments.in/PRRWS/'+result.exceptionMsg+'\')">Here</a> To View Document</b>';
					$("#coverLetterPath").val(result.exceptionMsg);
					$("#saveBtnId").show();
				}

		str+='</div>';
	str+='</div>';
	
	$("#coveringLetterGenerator").html(str);
	$(".fancyboxView").fancybox({live: false});
	$('#endorsementNoErr').html("");
	 }else if(result.exceptionMsg == "Exist"){
		 $('#endorsementNoErr').html("");
		 $('#endorsementNoErr').html("<h5 style='color:red;'>This endorsment no exist</h5>");
		}
 }); 
}



$(document).on('click','.petitionWiseViewCommentsCls',function(){
 var pettinId = $(this).attr("attr_petition_id")
 
 $("#ajaxcallImageId").html('');
 $("#coverLetterLableDivId").hide();
 $("#remarksId").val('');
 $("#uploadFileDivCls").hide();
 $('#actionmemoDivId').hide();

		$('#detaildReportReviewFiledsDivId').show();
		$('#sanctinedAmountId').val('');
		$('#workInKmId').val('');
		$('#actioncopyRefId').val('');
 //$("#endorseMentHeadingId").html(" Update Latest Information ");
 $("#remarkIdErr").html('');
 $("#endorsementDivId").hide();
 $("#totalWorkEditDivId").hide();
 $("#statusChangeDivId").hide();
 $("#endorsentDivId").hide();
 $("#leadDivId").hide();
 $("#grantDivId").hide();
 $("#assignDesignationDivId").hide();
 $("#assignOfficerDivId").hide();
 $("#fileUploadDiv").hide();
 $("#fileUploadIdDiv").hide();
 $("#commentsDivId").show();
 $("#saveBtnId").show(); 
 $("#finalapproveFile").html('');
 $("#endorseMentModalDivId").modal("show");
 
 $('#endorsWorksId').show();
 $('#endorseDivId').hide();
 $('#uploadCoverFileDivCls').hide();
 $('#endorseDivId').hide();
 $('#imageBuildingId').hide();
 $("#imageOrPdfDisId").hide();
  $('#coveringLetterGenerator').hide();
 $('#endorsWorksId').html("Save Details");
 
})

 $(document).bind('keypress', function(event) {
 var keyCode = (event.keyCode ? event.keyCode : event.which); 
 if(keyCode == 13){
	$('#advanceSearchId').trigger('click');
 } 
});
$(document).on("click",".workWiseHistroyCls",function(){
	$("#petitionHistroyModalId").modal("show");
	var petitinId=$(this).attr('attr_work_id');
	var workId=$(this).attr('attr_sub_work_id');
	getPetitionAndWorkWiseHistoryDetails(petitinId,workId);
 });


function buildImages(result){
	var str='';
	str+='<div class="col-sm-12 m_top15" id="ScrollDivId" style="height:400px; overflow:scroll;">';
		str+='<ul class="partyWiseSlickApply list-inline">';
		if(typeof(result.allFileList) != 'undefined' && result.allFileList != null && result.allFileList.length>0){
			//$('#imageBuildingId').show();
			for(var i in  result.allFileList){
				var scanCopySpl = result.allFileList[i].value.split(".");
				var scanCopyExt = $.trim(scanCopySpl[scanCopySpl.length-1].toLowerCase());
				
				if(scanCopyExt =="pdf"){
						str+='<div class="media" style="background-color: #455963; padding: 5px;">';
							str+='<div class="media-left">';
								str+='<i class="fa fa-file-pdf-o" aria-hidden="true" style="font-size: 22px; color:#fff;"></i>';
							str+='</div>';
							str+='<div class="media-body">';
								str+='<h5 class="media-heading">';
									str+='<a class="showPdfOrImagIdCls" attr_status="'+scanCopyExt+'"  attr_value="'+result.allFileList[i].value+'" style="cursor:pointer; color: #fff;">'+result.allFileList[i].name+'_'+(parseInt(i)+1)+'</a> </br>';
								str+='</h5>';
							str+='</div>';
						str+='</div>';
						//str+='<li><object data="'+attr_value+'" style="width:100%; height:400px;"></object></li>';
				}else if( scanCopyExt =="jpeg" || scanCopyExt =="jpg" || scanCopyExt =="gif" || scanCopyExt =="bmp" || scanCopyExt =="png"){
						str+='<div class="media" style="background-color: #455963; color: #fff; padding: 5px;">';
							str+='<div class="media-left">';
								str+='<i class="fa fa-file-image-o" aria-hidden="true" style="font-size: 22px; color:#fff;"></i>';
							str+='</div>';
							str+='<div class="media-body">';
								str+='<h5 class="media-heading">';
									str+='<a class="showPdfOrImagIdCls" attr_status="'+scanCopyExt+'" attr_value="'+result.allFileList[i].value+'" style="cursor:pointer; color: #fff;>'+result.allFileList[i].name+'_'+(parseInt(i)+1)+'</a> </br>';
								str+='</h5>';
							str+='</div>';
						str+='</div>';	
						//str+='<li><img src="'+attr_value+'" style="width:100%; height:400px;"></li>';						
				}
			}
		}else{
			//$('#imageBuildingId').hide();      
		}
		str+='</ul>';
	str+='</div>';	
	
	$("#imageBuildingId").html(str);	
	if(result.allFileList.length < 1){
		//$("#imageBuildingId").hide();
	}
	$(".partyWiseSlickApply").slick({
			 slide: 'li',
			 slidesToShow: 1,
			 slidesToScroll: 1,
			 infinite: false,
			 swipeToSlide:false,
			 swipe:false,
			 touchMove:false,
			
		}); 
	 
}

function getPetitionAndWorkWiseHistoryDetails(petitinId,workId){
	$('#headingTileHistoryId').html('');
	$("#petitionHistroyDetailsId").html(spinner);
	 var subworkIdsList = [];//[1,2,3];
	 var isSubworkHistory=false;
	 if(parseInt(workId)>0){
		 subworkIdsList.push(workId);
		 isSubworkHistory = true;
	 }
	 
	 var json = {
		petitionId : petitinId,
		subworkIdsList : subworkIdsList
	 } 
	 
	$.ajax({ 
		type:'POST', 
		url: 'getPetitionAndWorkWiseHistoryDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
		}).done(function(result){
			if(result !=null){
				buildPetitionAndWorkWiseHistoryDetails(result,isSubworkHistory);
			}else{
				$("#petitionHistroyDetailsId").html("No Data Available");
			}
		}); 
	}
function buildPetitionAndWorkWiseHistoryDetails(result,isSubworkHistory){
	$('#headingTileHistoryId').html('');
	var str='';
	
	if(isSubworkHistory == false){
		$('#headingTileHistoryId').html('PETITION HISTORY');
			str+='<div class="pad_light_yash_bg" style="border: 1px solid #ccc;border-radius: 5px;padding:5px;">';
				str+='<div class="row">';
					str+='<div class="col-sm-12">';
						str+='<div class="col-sm-6" style="padding-left: 0px;">';
							str+='<div class="pad_white_bg" style="padding:5px;border: 1px solid #1283C8;">';
								str+='<div class="row">';
								for(var i in result.statusList){
									if(result.statusList[i].value == "TOTAL" || result.statusList[i].value == "PENDING"){
										if(result.statusList[i].value == "TOTAL"){
											str+='<div class="col-sm-2">';
												str+='<h5 class="font_weight m_top10">Total&nbsp;Works</h5>';
												str+='<h5 class="font_weight m_top10">'+result.statusList[i].count+'</h5>';
											str+='</div>';
										}else if(result.statusList[i].value == "PENDING"){
											str+='<div class="col-sm-2">';
												str+='<h5 class="font_weight pending_color m_top10">Pending</h5>';
												str+='<h5 class="font_weight m_top10">'+result.statusList[i].count+'</h5>';
											str+='</div>';
										}
										
									}
								}
								str+='<div class="col-sm-8">';
									str+='<div class="pad_green">';
										str+='<div class="row">';
											for(var i in result.statusList){	
												if(result.statusList[i].value == "ENDORSED"){
													str+='<div class="col-sm-3">';
														str+='<h5 class="font_weight completed_color m_top10">Endorsed</h5>';
														str+='<h5 class="font_weight m_top10">'+result.statusList[i].count+'</h5>';
													str+='</div>';
												}
											}
											str+='<div class="col-sm-9">';
												str+='<div class="pad_white_bg" style="padding:5px;">';
													str+='<div class="row">';
													for(var i in result.statusList){
														/*if(result.statusList[i].value == "IN-PROGRESS"){
															str+='<div class="col-sm-6">';
																str+='<h5 class="font_weight pending_color m_top5">In&nbsp;Progress</h5>';
																str+='<h5 class="font_weight m_top10">'+result.statusList[i].count+'</h5>';
															str+='</div>';
														}else */ if(result.statusList[i].value == "COMPLETED"){
															str+='<div class="col-sm-6">';
																str+='<h5 class="font_weight completed_color m_top5">Completed</h5>';
																str+='<h5 class="font_weight m_top10">'+result.statusList[i].count+'</h5>';
															str+='</div>';
														}
													}	
														
													str+='</div>';
												str+='</div>';
											str+='</div>';
												
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="col-sm-2 border_right_yash">';
						str+='<h5 class="font_weight  m_top5">Created Date</h5>';
						str+='<h5 class="font_weight m_top10">'+result.insertedDate+'</h5>';
					str+='</div>';
					
					str+='<div class="col-sm-2">';
						str+='<h5 class="font_weight  m_top5">Petition ID</h5>';
						str+='<h5 class="font_weight m_top10">'+result.petitionId+'</h5>';
					str+='</div>';
					
					str+='<div class="col-sm-2">';
					 if(result.statusId == 1){
							str+='<div class="" style="padding:10px;background-color:#FFEED0;">';
						 }else if(result.statusId != null && parseInt(result.statusId)==2){
							 str+='<div class="" style="padding:10px;background-color:#FFEED0;">';
						 }else{
							str+='<div class="" style="padding:10px;background-color:#DAEEE0;">';
						 }
						 
						
							str+='<div class="media">';
							str+='<a class="pull-left" style="padding-right: 5px;">';
								 if(result.statusId == 1){
									str+='<i class="fa fa-pause round_status_pending" aria-hidden="true" style="color:#FFAA00"></i>';
								 }else if(result.statusId != null && parseInt(result.statusId)==2){
									 str+='<i class="fa fa-pause round_status_pending" aria-hidden="true" style="color:#FFAA00"></i>';
								 }else{
									 str+='<i class="fa fa-check round_status_pending completed_color" aria-hidden="true"></i>';
								 }
									
							  str+='</a>';
							  str+='<div class="media-body">';
							  
							  if(result.statusId == 1)
									str+='<h4 class="pull-right pending_color font_weight" style="margin-bottom: 10px;"> Pending</h4>';
								else if(result.statusId != null && parseInt(result.statusId)==4)
									str+='<h4 class="pull-right pending_color font_weight" style="margin-bottom: 10px;"> Look for Next Year </h4>';
								else if(result.statusId != null && parseInt(result.statusId)==5)
									str+='<h4 class="pull-right completed_color font_weight" style="margin-bottom: 10px;"> Not Possible </h4>';
								else if(result.statusId != null && parseInt(result.statusId)==9)
									str+='<h4 class="pull-right completed_color font_weight" style="margin-bottom: 10px;"> Partially Completed </h4>';
								else if(result.statusId != null && parseInt(result.statusId)==8)
									str+='<h4 class="pull-right completed_color font_weight" style="margin-bottom: 10px;"> Completed</h4>';
								str+='<h6>Petition Status</h6>';
							  str+='</div>';
							str+='</div>';  
						str+='</div>';
					str+='</div>';
					
				str+='</div>';
			str+='</div>';
		str+='</div>';

		
	str+='<div class="panel-group m_top10" id="accordionViewHistable">';
		str+='<div class="panel panel-default panel-blue">';
			str+='<div class="panel-heading" id="headingViewHistable" style="display:none;">';
				str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionViewHistable" href="#collapseViewHistable" aria-expanded="true" aria-controls="collapseViewHistable">';
				str+='<h4 class="panel-title text-capital">PETITION WORKS LATEST HISTORY</h4>';
				str+='</a>';
			 str+='</h4>';
			str+='</div>';
			
			  str+='<div id="collapseViewHistable" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingViewHistable">';	
				
			  str+='<div class="panel-body">';
					str+='<div style="border: 1px solid #ddd;margin-top: 20px;">';
						str+='<div class="row m_top20">';
							str+='<div class="col-sm-12">';
								str+='<div class="table-responsive">';
									str+='<table class="table table_custom_pet">';
										str+='<thead>';
											str+='<tr>';
												str+='<th>';
													str+='WORK NO';
												str+='</th>';
												str+='<th>';
													str+='DEPARTMENT';
												str+='</th>';
												str+='<th>';
													str+='WORK DETAILS';
												str+='</th>';
												str+='<th>';
													str+='LATEST COMMENT';
												str+='</th>';
												//str+='<th>';
												//	str+='DESIGNATION';
												//str+='</th>';
												str+='<th>';
													str+='PENDING @';
												str+='</th>';
												str+='<th>';
													str+='STATUS';
												str+='</th>';
											str+='</tr>';
										str+='</thead>';
										str+='<tbody>';
										
											for(var i in result.subList1){
												if(i==0){
													if(typeof(result.subList1[i].subList1) != 'undefined' && result.subList1[i].subList1 != null && result.subList1[i].subList1.length>0){
												
													for(var k in result.subList1[i].subList1){
														if(parseInt(result.subList1[i].subList1[k].workId)>0){
																str+='<tr>';
																	str+='<td>'+parseInt(k)+'</td>';
																	str+='<td>'+result.subList1[i].subList1[k].subList1[0].subList1[0].pmDepartment+'</td>';
																	str+='<td>'+result.subList1[i].subList1[k].subList1[0].subList1[0].subWorkDesc+'</td>';
																	str+='<td>'+result.subList1[i].subList1[k].subList1[0].subList1[0].subList1[0].remarks+'<br> '+result.subList1[i].subList1[k].subList1[0].timeStr+' @ '+result.subList1[i].subList1[k].subList1[0].subList1[0].timeStr+'</td>';
																	//str+='<td>'+result.subList1[i].subList1[k].subList1[0].subList1[0].designation+'</td>';
																	if(typeof(result.subList1[i].subList1[k].subList1[0].subList1[0].assignedToDesignation) !='undefined' && result.subList1[i].subList1[k].subList1[0].subList1[0].assignedToDesignation != null && result.subList1[i].subList1[k].subList1[0].subList1[0].assignedToDesignation.length>0)
																		str+='<td>'+result.subList1[i].subList1[k].subList1[0].subList1[0].assignedToDesignation+'</td>';
																	else
																		str+='<td>-</td>';
																	str+='<td>'+result.subList1[i].subList1[k].subList1[0].subList1[0].stautus+'</td>';
																str+='</tr>';
														}
													}
												}
											}
											}
										str+='</tbody>';
									str+='</table>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='</div>';
			  str+='</div>';
		str+='</div>';
	str+='</div>';
			  
	

		
	$('#headingTileHistoryId').html('PETITION HISTORY');
	str+='<div class="row m_top20">';
		str+='<div class="col-sm-12">';
			str+='<h5 class="font_weight"> Petition History </h5>';
			str+='<div class="">';
			str+='<div style="border:1px solid #ddd;padding:10px;" class="m_top10">';
			for(var i in result.petitionHistoryList){
				if(i==0){
					str+='<ul class="message-timeline" style="margin-top: 20px;">';
					if(typeof(result.petitionHistoryList[i].subList1) !='undefined' && result.petitionHistoryList[i].subList1 != null && result.petitionHistoryList[i].subList1.length>0){
						for(var j in result.petitionHistoryList[i].subList1){
							
							
							str+='<li>';
							str+='<span style="margin-left: 35px; margin-top: 0px;">'+result.petitionHistoryList[i].subList1[j].timeStr+'</span><span class="date"><i class="fa fa-calendar" aria-hidden="true" style="font-size: 22px;color: #fff;margin-top: 3px;"></i></span>';
													
							if(typeof(result.petitionHistoryList[i].subList1[j].subList1) !='undefined' && result.petitionHistoryList[i].subList1[j].subList1 != null && result.petitionHistoryList[i].subList1[j].subList1.length>0){
								for(var m in result.petitionHistoryList[i].subList1[j].subList1){
									str+='<div class="message-block">';
									if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Completed"){
										str+='<span class="time" style="border:1px solid #1BE00D">'+result.petitionHistoryList[i].subList1[j].subList1[m].timeStr+'</span>';	
									}else if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Pending Endorsement"){
										str+='<span class="time" style="border:1px solid #0090FF">'+result.petitionHistoryList[i].subList1[j].subList1[m].timeStr+'</span>';	
									}else if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Final Approval" || result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Action Memo" || result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Detailed Report"){
										str+='<span class="time" style="border:1px solid #FFC400">'+result.petitionHistoryList[i].subList1[j].subList1[m].timeStr+'</span>';	
									}else{
										str+='<span class="time" style="border:1px solid #1BE00D">'+result.petitionHistoryList[i].subList1[j].subList1[m].timeStr+'</span>';	
									}
									
									str+='<div class="row">';
									str+='<div class="col-sm-12">';
									
									if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Completed"){
										str+='<div style="border: 1px solid #1BE00D;padding: 5px;margin-top: 6px;position: relative;left: -6px;border-left: none;padding-bottom: 0px;background-color: #F5F5F5;">';
										str+='<p class="panel-title text_bold"></p>';
										str+='<h5 style="margin-top: 19px;border-left: 1px solid #1BE00D;margin-left: -6px;">';
									}else if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Pending Endorsement"){
										str+='<div style="border: 1px solid #0090FF;padding: 5px;margin-top: 6px;position: relative;left: -6px;border-left: none;padding-bottom: 0px;background-color: #F5F5F5;">';
										str+='<p class="panel-title text_bold"></p>';
										str+='<h5 style="margin-top: 19px;border-left: 1px solid #0090FF;margin-left: -6px;">';
									}else if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Final Approval" || result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Action Memo" || result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Detailed Report"){
										str+='<div style="border: 1px solid #FFC400;padding: 5px;margin-top: 6px;position: relative;left: -6px;border-left: none;padding-bottom: 0px;background-color: #F5F5F5;">';
										str+='<p class="panel-title text_bold"></p>';
										str+='<h5 style="margin-top: 19px;border-left: 1px solid #FFC400;margin-left: -6px;">';
									}else{
										str+='<div style="border: 1px solid #1BE00D;padding: 5px;margin-top: 6px;position: relative;left: -6px;border-left: none;padding-bottom: 0px;background-color: #F5F5F5;">';
										str+='<p class="panel-title text_bold"></p>';
										str+='<h5 style="margin-top: 19px;border-left: 1px solid #1BE00D;margin-left: -6px;">';
									}
									
									
									str+='<div style="padding: 6px;">';
									str+='<div class="row">';
									str+='<div style="margin-top: -15px;margin-left: 16px;">';
										str+='<div class="col-sm-4">';
											str+='<div class="pad_white_bg" style="border: 1px solid #ccc;">';
											str+='<h5 class="font_weight f_13">';
											if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Completed"){
												str+='<span style="background-color:#1BE00D;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;">';
												str+='</span> Status :'+result.petitionHistoryList[i].subList1[j].subList1[m].stautus+'';
											}else if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Pending Endorsement"){
												str+='<span style="background-color:#317CB8;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;">';
												str+='</span> Status : '+result.petitionHistoryList[i].subList1[j].subList1[m].stautus+'';
											}else if(result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Final Approval" || result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Action Memo" || result.petitionHistoryList[i].subList1[j].subList1[m].stautus == "Detailed Report"){
												str+='<span style="background-color:#FFC400;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;">';
												str+='</span> Status : '+result.petitionHistoryList[i].subList1[j].subList1[m].stautus+'';
											}else{
												str+='<span style="background-color:#1BE00D;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;">';
												str+='</span> Status : '+result.petitionHistoryList[i].subList1[j].subList1[m].stautus+'';
											}
											str+='</h5>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
							
							if(typeof(result.petitionHistoryList[i].subList1[j].subList1[m].subList1) != 'undefined' && result.petitionHistoryList[i].subList1[j].subList1[m].subList1 != null && result.petitionHistoryList[i].subList1[j].subList1[m].subList1.length>0){
								str+='<h5 class="font_weight f_12 m_top10" style="margin-left: 20px;"><span style="color:#1283C8">ACTION</span>: '+result.petitionHistoryList[i].subList1[j].subList1[m].subList1[0].actionName+'</h5>';
							
								str+='<h5 class="font_weight f_12 m_top10" style="margin-left: 20px;"> </h5> <p style="margin-left: 20px;" class="m_top5">'+result.petitionHistoryList[i].subList1[j].subList1[m].subList1[0].remarks+' </p>';
							}
							if(typeof(result.petitionHistoryList[i].subList1[j].subList1[m].assignedToDesignation) !='undefined' && result.petitionHistoryList[i].subList1[j].subList1[m].assignedToDesignation != null && result.petitionHistoryList[i].subList1[j].subList1[m].assignedToDesignation.length>0)
								str+='<h5 class="font_weight f_12 m_top10" style="margin-left: 20px;"><span style="color:#1283C8">FORWARDED TO </span>: '+result.petitionHistoryList[i].subList1[j].subList1[m].assignedToOfficerName+' '+result.petitionHistoryList[i].subList1[j].subList1[m].assignedToDesignation+'</h5>';
							else if(typeof(result.petitionHistoryList[i].subList1[j].subList1[m].assignedToOfficerName) !='undefined' && result.petitionHistoryList[i].subList1[j].subList1[m].assignedToOfficerName != null && result.petitionHistoryList[i].subList1[j].subList1[m].assignedToOfficerName.length>0)
								str+='<h5 class="font_weight f_12 m_top10" style="margin-left: 20px;"><span style="color:#1283C8">FORWARDED TO </span>: '+result.petitionHistoryList[i].subList1[j].subList1[m].assignedToOfficerName+' '+result.petitionHistoryList[i].subList1[j].subList1[m].assignedToDesignation+'</h5>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										if(typeof(result.petitionHistoryList[i].subList1[j].subList1[m].subList1) !='undefined' && result.petitionHistoryList[i].subList1[j].subList1[m].subList1 != null && result.petitionHistoryList[i].subList1[j].subList1[m].subList1.length>0){
											for(var s in result.petitionHistoryList[i].subList1[j].subList1[m].subList1){
												if(result.petitionHistoryList[i].subList1[j].subList1[m].subList1[s].actionId == 4){
													if(typeof(result.petitionHistoryList[i].subList1[j].subList1[m].subList1[s].subList1) !='undefined' && result.petitionHistoryList[i].subList1[j].subList1[m].subList1[s].subList1 != null && result.petitionHistoryList[i].subList1[j].subList1[m].subList1[s].subList1.length>0){
														
														for(var p in result.petitionHistoryList[i].subList1[j].subList1[m].subList1[s].subList1){
															var obj ={
																filesArr:result.petitionHistoryList[i].subList1[j].subList1[m].subList1[s].subList1[p].filesList,
																name:"petitionsHistory"+m+""+p+""+j+""
															}
															historyDocsArr.push(obj);
															
															str+='<div class="col-sm-3 m_top15">';
																str+='<div style="background-color: #fff;padding:3px;border: 1px solid #ddd;">';
																	str+='<div style="padding:5px;background-color:#fff">';
																		str+='<h5 class="font_weight f_13 docsViewCls" attr_docs="historyDocs" attr_name="petitionsHistory'+m+''+p+''+j+'" style="cursor:pointer;color:#1283C8;" ><i class="fa fa-paperclip" aria-hidden="true"></i><u> '+result.petitionHistoryList[i].subList1[j].subList1[m].subList1[s].subList1[p].name+'</u></h5>';
																	str+='</div>';
																str+='</div>';
															str+='</div>';
															
															
															
														}
													}
													
												}
											}
										}
										var officerDesig = "";
										var ofcrDesigId = result.petitionHistoryList[i].subList1[j].subList1[m].pmOfficerDesgId ;
										//if(ofcrDesigId != 86 && ofcrDesigId != 23 && ofcrDesigId != 94 &&   ofcrDesigId != 95
										//&& ofcrDesigId != 96 && ofcrDesigId != 97 && ofcrDesigId != 98){
												officerDesig = "("+result.petitionHistoryList[i].subList1[j].subList1[m].officerDesig+")";
										//	}
										str+='<div class="col-sm-3 pull-right">';
										str+='<div style="background-color: #fff;padding:10px;border: 1px solid #ddd;">';
											//str+='<h5 class="font_weight" style="text-transform:uppercase"><span style="color:#1283C8">UPDATED BY </span>  : <br>'+result.petitionHistoryList[i].subList1[j].subList1[m].designation+''+ofcDesigLoca+'<br>('+result.petitionHistoryList[i].subList1[j].subList1[m].pmDepartmentName+')</h5>';
											str+='<h5 class="font_weight" style="text-transform:uppercase"><span style="color:#1283C8">FORWARDED BY </span> : '+result.petitionHistoryList[i].subList1[j].subList1[m].designation+'<br>'+officerDesig+'</h5>';
										str+='</div>';
										
																str+='</div>';
															str+='</div>';
														str+='</div>';
													str+='</div>';
														/* str+='<div class="row">';
															str+='<div class="col-sm-12">';
																
															str+='</div>';
														str+='</div>';	 */		
														
												str+='</div>';
											str+='</h5>';
										str+='</div>';
										str+='</div>';
									 str+='</div>';	
									//str+='</div>';

								}
							}
							str+='</li>';
							

						}
						str+='</ul>';
					}
				}
			}
}else{
	$('#headingTileHistoryId').html(' WORK WISE HISTORY');
	str+='<div class="row m_top20">';
		str+='<div class="col-sm-12">';
			str+='<h5 class="font_weight"></h5>';
			str+='<div class="table-desig-scroll">';
				str+='<div style="border:1px solid #ddd;padding:10px;" class="m_top10">';
				for(var i in result.subList1){
					if(i==0){
						if(typeof(result.subList1) !='undefined' && result.subList1 != null && result.subList1.length>0){
							for(var j in result.subList1){
								if(typeof(result.subList1[j].subList1) !='undefined' && result.subList1[j].subList1 != null && result.subList1[j].subList1.length>0){
									for(var k in result.subList1[j].subList1){
										if(typeof(result.subList1[j].subList1[k].subList1) !='undefined' && result.subList1[j].subList1[k].subList1 != null && result.subList1[j].subList1[k].subList1.length>0){
											for(var l in result.subList1[j].subList1[k].subList1){
												str+='<ul class="message-timeline" style="margin-top: 20px;">';
												str+='<li>';
														str+='<span style="margin-left: 35px; margin-top: 0px;">'+result.subList1[j].subList1[k].subList1[l].timeStr+'</span><span class="date"><i class="fa fa-calendar" aria-hidden="true" style="font-size: 22px;color: #fff;margin-top: 3px;"></i></span>';
												
												if(typeof(result.subList1[j].subList1[k].subList1[l].subList1) !='undefined' && result.subList1[j].subList1[k].subList1[l].subList1 != null && result.subList1[j].subList1[k].subList1[l].subList1.length>0){
													for(var m in result.subList1[j].subList1[k].subList1[l].subList1){
														str+='<div class="message-block">';
														if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Completed"){
															str+='<span class="time" style="border:1px solid #1BE00D">'+result.subList1[j].subList1[k].subList1[l].subList1[m].timeStr+'</span>';	
														}else if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Pending Endorsement"){
															str+='<span class="time" style="border:1px solid #0090FF">'+result.subList1[j].subList1[k].subList1[l].subList1[m].timeStr+'</span>';	
														}else if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Final Approval" || result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Action Memo" || result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Detailed Report"){
															str+='<span class="time" style="border:1px solid #FFC400">'+result.subList1[j].subList1[k].subList1[l].subList1[m].timeStr+'</span>';	
														}else{
															str+='<span class="time" style="border:1px solid #1BE00D">'+result.subList1[j].subList1[k].subList1[l].subList1[m].timeStr+'</span>';	
														}
														
														str+='<div class="row">';
														str+='<div class="col-sm-12">';
															
															if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Completed"){
																str+='<div style="border: 1px solid #1BE00D;padding: 5px;margin-top: 6px;position: relative;left: -6px;border-left: none;padding-bottom: 0px;background-color: #F5F5F5;">';
																str+='<p class="panel-title text_bold"></p>';
																str+='<h5 style="margin-top: 19px;border-left: 1px solid #1BE00D;margin-left: -6px;">';
															}else if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Pending Endorsement"){
																str+='<div style="border: 1px solid #0090FF;padding: 5px;margin-top: 6px;position: relative;left: -6px;border-left: none;padding-bottom: 0px;background-color: #F5F5F5;">';
																str+='<p class="panel-title text_bold"></p>';
																str+='<h5 style="margin-top: 19px;border-left: 1px solid #0090FF;margin-left: -6px;">';
															}else if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Final Approval" || result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Action Memo" || result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Detailed Report"){
																str+='<div style="border: 1px solid #FFC400;padding: 5px;margin-top: 6px;position: relative;left: -6px;border-left: none;padding-bottom: 0px;background-color: #F5F5F5;">';
																str+='<p class="panel-title text_bold"></p>';
																str+='<h5 style="margin-top: 19px;border-left: 1px solid #FFC400;margin-left: -6px;">';
															}else{
																str+='<div style="border: 1px solid #1BE00D;padding: 5px;margin-top: 6px;position: relative;left: -6px;border-left: none;padding-bottom: 0px;background-color: #F5F5F5;">';
																str+='<p class="panel-title text_bold"></p>';
																str+='<h5 style="margin-top: 19px;border-left: 1px solid #1BE00D;margin-left: -6px;">';
															}
															 
															 
																
																	str+='<div style="padding: 6px;">';
																			str+='<div class="row">';
																			str+='<div style="margin-top: -15px;margin-left: 16px;">';
																				str+='<div class="col-sm-4">';
																					str+='<div class="pad_white_bg">';
																					str+='<h5 class="font_weight f_13">';
																					if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Completed"){
																						str+='<span style="background-color:#1BE00D;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;">';
																						str+='</span> Status :'+result.subList1[j].subList1[k].subList1[l].subList1[m].stautus+'';
																					}else if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Pending Endorsement"){
																						str+='<span style="background-color:#317CB8;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;">';
																						str+='</span> Status : '+result.subList1[j].subList1[k].subList1[l].subList1[m].stautus+'';
																					}else if(result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Final Approval" || result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Action Memo" || result.subList1[j].subList1[k].subList1[l].subList1[m].stautus == "Detailed Report"){
																						str+='<span style="background-color:#FFC400;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;">';
																						str+='</span> Status : '+result.subList1[j].subList1[k].subList1[l].subList1[m].stautus+'';
																					}else{
																						str+='<span style="background-color:#1BE00D;width: 15px;height: 15px;display: inline-block;border-radius: 50%;position: relative;top: 3px;">';
																						str+='</span> Status : '+result.subList1[j].subList1[k].subList1[l].subList1[m].stautus+'';
																					}
																					str+='</h5>';
																				str+='</div>';
																			str+='</div>';
																		str+='</div>';
																	str+='</div>';
																	if(typeof(result.subList1[j].subList1[k].subList1[l].subList1[m].subList1) !='undefined' && result.subList1[j].subList1[k].subList1[l].subList1[m].subList1 != null && result.subList1[j].subList1[k].subList1[l].subList1[m].subList1.length>0){
																		str+='<h5 class="font_weight f_12 m_top10" style="margin-left: 20px;"><span style="color:#1283C8">ACTION</span>: '+result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[0].actionName+'</h5>';
																	
																		str+='<h5 class="font_weight f_12 m_top10" style="margin-left: 20px;"><span style=""> Remarks </span>: </h5> <p style="margin-left: 20px;" class="m_top5">'+result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[0].remarks+' </p>';
																	}
																		if(typeof(result.subList1[j].subList1[k].subList1[l].subList1[m].assignedToDesignation) !='undefined' && result.subList1[j].subList1[k].subList1[l].subList1[m].assignedToDesignation != null && result.subList1[j].subList1[k].subList1[l].subList1[m].assignedToDesignation.length>0)
																			str+='<h5 class="font_weight f_12 m_top10" style="margin-left: 20px;"><span style="color:#1283C8">FORWARDED TO </span>: '+result.subList1[j].subList1[k].subList1[l].subList1[m].assignedToOfficerName+' '+result.subList1[j].subList1[k].subList1[l].subList1[m].assignedToDesignation+'</h5>';
																			str+='<div class="row">';
																				str+='<div class="col-sm-12">';
																			if(typeof(result.subList1[j].subList1[k].subList1[l].subList1[m].subList1) !='undefined' && result.subList1[j].subList1[k].subList1[l].subList1[m].subList1 != null && result.subList1[j].subList1[k].subList1[l].subList1[m].subList1.length>0){
																				for(var s in result.subList1[j].subList1[k].subList1[l].subList1[m].subList1){
																					if(result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[s].actionId == 4){
																						if(typeof(result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[s].subList1) !='undefined' && result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[s].subList1 != null && result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[s].subList1.length>0){
																							
																							for(var p in result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[s].subList1){
																							
																									var obj ={
																										filesArr:result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[s].subList1[p].filesList,
																										name:"worksHistory"+m+""+p+""+j+""
																									}
																									historyDocsArr.push(obj);
																									
																								str+='<div class="col-sm-3 m_top15">';
																									str+='<div style="background-color: #fff;padding:3px;border: 1px solid #ddd;">';
																										str+='<div style="padding:5px;background-color:#fff">';
																											str+='<h5 class="font_weight f_13 docsViewCls" attr_docs="historyDocs" attr_name="worksHistory'+m+''+p+''+j+'" style="cursor:pointer;color:#1283C8;" ><i class="fa fa-paperclip" aria-hidden="true"></i><u >'+result.subList1[j].subList1[k].subList1[l].subList1[m].subList1[s].subList1[p].name+'</u></h5>';
																										str+='</div>';
																									str+='</div>';
																								str+='</div>';
																								
																								
																							}
																						}
																						
																					}
																				}
																			}
																			var officerDesig="";
											var ofcrDesigId =result.petitionHistoryList[i].subList1[j].subList1[m].pmOfficerDesgId ;
												//if(ofcrDesigId != 86 && ofcrDesigId != 23 && ofcrDesigId != 94 &&  ofcrDesigId != 95
										//&& ofcrDesigId != 96 && ofcrDesigId != 97 && ofcrDesigId != 98){
												officerDesig = result.petitionHistoryList[i].subList1[j].subList1[m].officerDesig;
										//	}
																			str+='<div class="col-sm-3 pull-right">';
																					str+='<div style="background-color: #fff;padding:10px;border: 1px solid #ddd;">';
																						str+='<h5 class="font_weight" style="text-transform:uppercase"><span style="color:#1283C8">FORWARDED BY </span>  : <br>'+result.subList1[j].subList1[k].subList1[l].subList1[m].designation+'</h5>';
																						if(officerDesig != ""){
																							str+='<h5 class="font_weight m_top5" style="text-align: center;">'+officerDesig+'</h5>';
																						}
																		
																					str+='</div>';
																				str+='</div>';
																			str+='</div>';
																		str+='</div>';
																			/* str+='<div class="row">';
																				str+='<div class="col-sm-12">';
																					
																				str+='</div>';
																			str+='</div>';	 */		
																			
																	str+='</div>';
																str+='</h5>';
															str+='</div>';
															str+='</div>';
														 str+='</div>';	
												str+='</div>';
												
													}
												}
												str+='</li>';
											str+='</ul>';
												
											}
										}
									}
								}
							}
						}
					}
				}								
				str+='</div>';		
			str+='</div>';		
		
		str+='</div>';
	str+='</div>';
}

	$("#petitionHistroyDetailsId").html(str);
	
	if(result.petitionHistoryList.length>6){
		$(".table-desig-scroll").mCustomScrollbar({setHeight:'400px'});
	}
}
getPmDocumentTypeList(); 
function getPmDocumentTypeList(){
	
	 var json = {
		
		}           
	$.ajax({              
		type:'POST',    
		url: 'getPmDocumentTypeList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 $("#documentTypeId").html('<option value="0">Select Document Type</option>');
			for(var i in result){
				$("#documentTypeId").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#documentTypeId").trigger('chosen:updated');
	});	
	}

$(document).on("click",".selectCls",function(){
	$('.workSelectCls').prop('checked',false);
	if($(this).is(":checked")){
		$('.workSelectCls').prop('checked',true);
	};
});

$(document).on("click",".tableTypeCls",function(){
	var value=$(this).val();
	
	if($(this).is(":checked")){
		$('.tableTypeCls').prop('checked',false);
		$(this).prop('checked',true);
	}
	var isSelected=false;
	$('.tableTypeCls').each(function(){
		if($(this).is(":checked")){
			isSelected=true;
		}
	});
	
	if(!isSelected){
		$(this).prop('checked',true);
	}
	
	$('#gridViewdiv').hide();
	$('#classicalViewDiv').hide();
	if(value == 2)
		$('#gridViewdiv').show();
	else if(value == 1)
		$('#classicalViewDiv').show();
	
});
$(document).on("click",".showPdfOrImagIdCls",function(){
	
  var docStatus=$(this).attr('attr_status');
  var docUrl=$(this).attr('attr_value');
  var str='';
  if(docStatus=="pdf")
  {
    str='<object data="'+docUrl+'" style="width:100%; height:400px;"></object>';
    $("#imageOrPdfDisId").html(str);
  }
  else{
    
    str='<img src="'+docUrl+'" style="width:100%; height:400px;"></object>';
    $("#imageOrPdfDisId").html(str);
  }
  
});

	