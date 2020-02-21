var url = window.location.href;
	var wurl = url.substr(0,(url.indexOf(".com")+4));
	if(wurl.length == 3)
		wurl = url.substr(0,(url.indexOf(".in")+3));
$(document).on("click","[expand-icon]",function(){
    var expandBlockName = $(this).attr("expand-icon");
	var alertId = $(this).attr("attr_alertId");
	var statusId = $(this).attr("attr_statusId");
	$("[expand-icon]").closest("li").removeClass("active");
	$("[expand-icon]").removeClass("text-primary");
	$(this).addClass("text-primary");
	$(this).closest("li").addClass("active");
	 rightSideExpandView(alertId);
	glStr = '';
	setTimeout(function(){
		$("[expanded-block="+expandBlockName+"]").show().css("transition"," ease-in, width 0.7s ease-in-out");
	},750);
	setTimeout(function(){
		$("#alertManagementPopup").scrollTop(0);
	},780);
	if($("[expand-main]").attr("expand-main") === 'false')
	{	
		$("[expand-main]").attr("expand-main","true");
		$("[expanded-channel]").attr("expanded-channel","true");
		$("[expand-main]").addClass("col-sm-4").removeClass("col-sm-12").css("transition"," ease-in-out, width 0.7s ease-in-out");
	}
});
$(document).on("click","[expanded-close]",function(){
	var expandBlockName = $(this).attr("expanded-close");
	if($("[expand-main]").attr("expand-main") === 'true')
	{
		$("[expand-main]").attr("expand-main","false");
	}else{
		$("[expand-main]").attr("expand-main","true");
	}
	$("[expanded-block="+expandBlockName+"]").hide();
	$("[expand-main]").removeClass("col-sm-4").addClass("col-sm-12").css("transition"," ease-in-out, width 0.7s ease-in-out");
});
	
function rightSideExpandView(alertId)
{
	$("#rightSideExpandView").html(spinner);
    $(".assignedUser1").html('');
	var str='';
	str+='<div class="col-sm-8 pad_left0" expanded-block="block1" style="display: none;">';
		str+='<div class="panel-right">';
			str+='<div style="box-shadow:0px 0px 2px 2px rgba(0,0,0,0.2)">';
				str+='<i class="glyphicon glyphicon-remove pull-right"  expanded-close="block1"></i>';
				str+='<div class="panel panel-default">';
				
					str+='<div class="panel-heading" id="mainBlockStates">';
						str+='<div class="row">';
							str+='<div class="col-sm-4">';
								str+='<div id="assignedUser"></div>';
							str+='</div>';
							str+='<div class="col-sm-8 pull-right" style="">';
								str+='<ul class="list-icons list-inline pull-right" status-icon="block1">';
									
									/*  str+='<li data-toggle="tooltip" data-placement="top" title="Departments" id="departDivId" style="display:none;">';
										str+='<span class=""></span><span id="mainDeprtmntId" attr_alert_id="'+alertId+'"><i class="fa fa-empire" aria-hidden="true"></i></span>';
									str+='</li>'; */
									
									str+='<li status-icon-block="alertStatus" attr_alert_id="'+alertId+'" subAlertId=""  data-toggle="tooltip" data-placement="top" title="alert status" id="displayStatusId" style="display:none;" > ';
										str+='<span class="status-icon arrow-icon" id="statusIdColor"></span><span id="statusId">Pending</span>';
									str+='</li>';
									
									str+='<li data-toggle="tooltip" data-placement="top" title="Present Proposal Status" id="proposalId" style="display:none;" > ';
										str+='<span class="status-icon arrow-icon"></span><span id="presntPrposalstatusId"></span>';
									str+='</li>';
								
									str+='<li data-toggle="tooltip" data-placement="top" title="Present Rejoinder Status" id="rejoinderId" style="display:none;" > ';
										str+='<span class="status-icon arrow-icon"></span><span id="presntRejoinderstatusId"></span>';
									str+='</li>';
									str+='<li id="historyId" style="display:none;" status-icon-block="alertHistory" attr_alert_id="'+alertId+'" subAlertId="" >';
										str+='<i class="fa fa-road" data-toggle="tooltip" data-placement="top" title="Alert History"></i>';
									str+='</li>';
								
								str+='</ul>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					
					
					str+='<div id="main_alert_block">';
						str+='<div class="panel-body" >';
							str+='<p><i class="fa fa-fire"></i> Impact Level : <span id="impactLevel"></span>';
								str+='<span class="text-danger pull-right"><i class="glyphicon glyphicon-cog"></i> Priority:<span id="priorityBodyId"> HIGH</span></span>';
							str+='</p>';
							str+='<div id="callerDetailsDIv"></div>';
							str+='<div id="statusDtlsDiv"></div>';
							str+='<div id="alertDetails"></div>';
							str+='<div id="articleAttachment"></div>';
							str+='<div id="alertCategory"></div>';
							str+='<div id="rejoinderAttachments"></div>';
							str+='<div id="alertGeneralComments"></div>';
						str+='</div>';
						
					str+='</div>';
				
				
				str+='</div>';
				
				
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#rightSideExpandView").html(str);
	$('[data-toggle="tooltip"]').tooltip();
	$(".chosenSelect").chosen({width:'100%'});
	
	
	getStatusCompletionInfo(alertId);
	getAssignedOfficersDetails(alertId);
	getDepartmentsByAlert(alertId);
	getAlertData(alertId);
	getCommentsForAlert(alertId);
	getAlertCategoryByAlert(alertId);
	getDocumentsForAlerts(alertId);
	
}
var isAdmin = "";
var globalUserType = "";
var globalStatusId = 0;
var isStatusAvailable=true;
var globalEntitlement= "";

function getStatusCompletionInfo(alertId){
	isStatusAvailable=true;
	$("#updateStatusChangeBody").html(spinner);
	$("#statusDtlsDiv").html(spinner);
	$.ajax({
		url: wurl+"/WebService/getStatusCompletionInfo/"+alertId+"/0/0/0/0/0"
		//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getStatusCompletionInfo/"+alertId+"/0/0/0/0/0"
	}).then(function(result){
		$("#updateStatusChangeBody").html('');
		$("#statusDtlsDiv").html('');
		$('#displayStatusId,#displayAssignIconId,#displaySubTasksliId,#displayDueDate1,#displayDueDate2,#displayPriority,#historyId').hide();
		$('#displayStatusId').attr('status-icon-block','alertStatus');
		$('#docAttachmentId').hide();
		
		if(result != null && result.length>0){
			var buildTypeStr = result[0].applicationStatus.split('-')[0].trim();
			globalUserType = buildTypeStr;
			var sttatusId = result[0].applicationStatus.split('-')[1].trim();
			globalStatusId = sttatusId; 
			
			if(result.length  == 1)
				isStatusAvailable=false;
			
			if(result[0].idnameList != null && result[0].idnameList.length > 0)
			{
				var str='';
				str+='<div class="row m_top20">';
					str+='<div class="col-sm-1 text-center body-icons"><i class="fa fa-volume-control-phone fa-2x"></i></div>';
					str+='<div class="col-sm-11">';
						str+='<h3>Caller Details </h3>';
						str+='<ul class="list-inline slickSlider">';
						for(var  j in result[0].idnameList)
						{
							str+='<li style="padding:0px 8px;margin:0px 5px;border:1px solid #ddd;">';
								str+='<table class="table table-condensed">';
									str+='<tr>';
										str+='<td>Name</td>';
										str+='<td>: '+result[0].idnameList[j].callerName+'</td>';
									str+='</tr>';
									str+='<tr>';
										str+='<td>Mobile No</td>';
										str+='<td>: '+result[0].idnameList[j].mobileNo+'</td>';
									str+='</tr>';
									str+='<tr>';
										str+='<td>Caller</td>';
										str+='<td>: '+result[0].idnameList[j].userType+'</td>';
									str+='</tr>';
								str+='</table>';
							str+='</li>';
						}
						str+='</ul>';
						
					str+='</div>';
				str+='</div>';
				$("#callerDetailsDIv").html(str);
				if(result[0].idnameList.length > 3)
				{
					$('.slickSlider').slick({
						slide: 'li',
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: false,
						swipe:false,
						touchMove:false,
						variableWidth: false
					});
				}
				
			}
			
			$('#historyId').show();
			var entitlement = result[0].positionName;
			globalEntitlement = entitlement;
			if(result[0].dueDateStr != null && result[0].dueDateStr.trim().length>0){
				$('.modal-date').html(result[0].dueDateStr)
				$('.modal-date1').html(result[0].dueDateStr)
			}else{
				$('#displayDueDate2').hide();
				$('#displayDueDate1').hide();
			}
			
			if(buildTypeStr=='own'){  
				$('#displayStatusId,#displaySubTaskli,#displaySubTasksliId').show();	
				$('#docAttachmentId').show();	
				$('#displayDueDate1').show();
				$('#displayDueDate2').hide();
				
				
				
				if(globalStatusId == 12 ){ // closed
					isStatusAvailable=false;
					$('#displaySubTasksliId,#docAttachmentId').hide();
				}else {
					isStatusAvailable=true;
				}				
			}
			else if(buildTypeStr=='subUser'){	
				$('#displaySubTasksliId').hide();		
				$('#displayDueDate1').hide();
				$('#displayStatusId').show();
				$('#displayStatusId').removeAttr('status-icon-block');
				
				$('#displayDueDate2,#displayPriority').show();
				
				// closed-12, completed-4, reopen-11
				if( globalStatusId == 12 || globalStatusId == 4 || globalStatusId == 11){
					isStatusAvailable=true;
				}
				if(globalStatusId != 12){ // for not closed status alerts 
					$('#displaySubTasksliId,#docAttachmentId').show();					
				}
			}else if(buildTypeStr=='same'){ 
				$('#displaySubTasksliId,#docAttachmentId,#displayPriority').show();
				$('#displayStatusId').show();       
				$('#displayDueDate1').show(); 
				isStatusAvailable=false;
			}
			else if(buildTypeStr=='other'){
				$('#displaySubTasksliId').hide();				
				$('#displayDueDate1').hide();				
				$('#displayDueDate2').hide();				
				$('#displayStatusId').show();
				isStatusAvailable=false;				
			}
			if((sttatusId == 1  || sttatusId == 8 || sttatusId==9) && result[0].userStatus != null && result[0].userStatus =='admin'){
				$('#displayAssignIconId').show();
				$('#docAttachmentId').show();	
				 assignUser(alertId);
				 
			}
		
			if(result[0].userStatus != null && result[0].userStatus =="admin"){
				isAdmin = "true";
				//$('#displayStatusId').attr('status-icon-block','');
				$('#displaySubTasksliId,#displayDueDate1,#displayDueDate2,#displayPriority').hide(); 
				if(sttatusId !=1)
					$('#docAttachmentId').show(); 
			}else{
				$('#displayStatusId').attr('status-icon-block','alertStatus');
				isAdmin = "false";
			}
			
			if(isAdmin=='false'){				
				$('#displayStatusId').attr('status-icon-block','alertStatus');
			}
			alertStatus(result,alertId);	

			if(globalStatusId == 12 || globalStatusId ==8 || globalStatusId ==9  ){ // closed || Wrongly Mapped Designation || Wrongly Mapped Department
				$('#displaySubTasksliId,#docAttachmentId,#displayPriority,#displayDueDate2').hide();
				$('#displayDueDate1').show();
			}
			 if(globalStatusId ==8 || globalStatusId ==9){
				$("#departDivId").show();
			} 
			
			//alert(" isStatusAvailable :"+isStatusAvailable);
		}else{
			$('#displayAssignIconId').show();
			$('#displayStatusId').show();
			$('#displaySubTasksliId').hide();  
			$('#docAttachmentId').hide();  
		}	
		setTimeout(function(){
			$("body").addClass("modal-open");
		},1000);
		
	});	
}
var glStr='';
var globalPropasalStr='';
function alertStatus(result,alertId)
{
	glStr='';
	globalPropasalStr='';
	var str1='';
	var str=''; 
		str1+='<div class="panel panel-default panel-white m_top20 alert-status-change-body">';
			str1+='<div class="panel-heading" style="margin-left: 20px;">';
				str1+='<div class="row" id="changeStatusDivId">';
				for(var i in result)
				{
					
					str1+='<div class="col-sm-4">';
						str1+='<div class="radioStyling">';
							if(globalStatusId == parseInt(result[i].id))
							{
								str1+='<input class="alertStatusCls" attr_id="'+result[i].id+'" type="radio" name="group1" id="radio-'+result[i].id+'">';
							}else
							{
								str1+='<input class="alertStatusCls" attr_id="'+result[i].id+'" type="radio" name="group1" id="radio-'+result[i].id+'">';
							}
							str1+='<label for="radio-'+result[i].id+'"><span class="radio" >'+result[i].name+'</span></label>';
						str1+='</div>';
					str1+='</div>';
				}				
				str1+='</div>';
			str1+='</div>';
			str1+='<div class="panel panel-default proposalAppendBlockDivCls" style="display:none;background-color:#ededed">';
				str1+='<div class="panel-heading" style="background-color:#ededed;padding-left:15px;">';
					str1+='<h4 class="panel-title">Proposal Information</h4>';
				str1+='</div>';
				str1+='<div class="panel-body" style="background-color:#ededed">';
					str1+='<div class="row">';
						str1+='<div class="col-sm-12">';
							str1+='<div class="m_top10">';
								str1+='<label class="checkbox-inline">';
								  str1+='<input type="checkbox" class="proposalCheckbox" value="1" name="statusChekBx">Financial Assistance<span style="color:red">*</span>';
								str1+='</label>';
								str1+='<label class="checkbox-inline">';
								  str1+='<input type="checkbox" class="proposalCheckbox" value="2" name="statusChekBx">Policy Decision Required<span style="color:red">*</span>';
								str1+='</label>';
								str1+='<label class="checkbox-inline">';
								  str1+='<input type="checkbox" class="proposalCheckbox" value="3" name="statusChekBx">Others<span style="color:red">*</span>';
								str1+='</label>';
							str1+='</div>';
						str1+='</div>';
						str1+='<div class="col-sm-4">';
							str1+='<div class="input-group amountCls m_top20" style="display:none;">';
								str1+='<span class="input-group-addon">';
									str1+='<i class="fa fa-inr"></i>';
								str1+='</span>';
								str1+='<input type="text" class="form-control" placeholder="Enter Amount" id="amountId">';
							str1+='</div>';
							str1+='<span id="errMsgAmuntId"></span>';
						str1+='</div>';
					str1+='</div>';
				str1+='</div>';
			str1+='</div>';
			
			 str1+='<div class="panel panel-default rejoinderDivCls" style="display:none;background-color:#ededed">';
				str1+='<div class="panel-heading" style="background-color:#ededed;padding-left:15px;">';
					str1+='<h4 class="panel-title">Rejoinder Status</h4>';
				str1+='</div>';
				str1+='<div class="panel-body" style="background-color:#ededed" >';
					str1+='<div class="row">';
						str1+='<div class="col-sm-12">';
							str1+='<div class="m_top10">';
								str1+='<label class="checkbox-inline" id="rejinderReqId">';
								  str1+='<input type="checkbox" class="rejoinderCheckbox" value="1" name="RejoinderChekBx">Rejoinder Request<span style="color:red">*</span>';
								str1+='</label>';
								str1+='<label class="checkbox-inline" id="rejinderRespnseId">';
								  str1+='<input type="checkbox" class="rejoinderCheckbox" value="2" name="RejoinderChekBx">Rejoinder Response<span style="color:red">*</span>';
								str1+='</label>';
								str1+='<form id="alertAssignAttachemntFrRejoinderStatusId" name="uploadAttachementFrRejoinderStatus">';
									str1+='<input type="file" id="rejoinderAttachmentId" name="imageForDisplay" style="margin-top:21px; margin-left:35px;">';
									str1+='<input type="hidden" value="'+alertId+'" name="alertVO.alertId">';
								str1+='</form>';
							str1+='</div>';
						str1+='</div>';
					str1+='</div>';
				str1+='</div>';
			str1+='</div>'; 

			
			str1+='<div class="panel-body pad_0 m_top20">';
				str1+='<textarea class="form-control" id="updateStatusChangeComment" placeholder="Comment.."></textarea>';
			str1+='</div>';
		str1+='</div>';

	
	str1+='<button class="btn btn-primary btn-sm text-capital" attr_alert_id="'+alertId+'" subTaskId="" id="updateStatusChangeId">update</button>';
	str1+='<span id="updateStatusChangeAjaxSymbol"></span>';
	str1+='<span id="updateStatusChangeMsg"></span>';
	
		str+='<div class="col-sm-12">';
			str+='<div style="padding:10px;background-color:#ddd">';
			if(globalPropCategory != null){
				str+='<p><strong>Proposal Category </strong>:'+globalPropCategory+'</p>';
			}
			if(globalPropReqAunt != null && globalPropReqAunt.length > 0){
				str+='<p class="m_top5"><strong>Requested Amount </strong>:'+globalPropReqAunt+'/- </p>';
			}
			str+='</div>';	
		str+='</div>';	
		str+='<div class="col-sm-4">';
			str+='<div class="radioStyling">';
				str+='<input class="alertStatusCls alertStatusAmountCls" attr_id="3" type="radio" name="group1" id="radio-1">';
				str+='<label for="radio-1"><span class="radio">Proposal Accept<span style="color:red;"> *</span></span></label>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-4">';
			str+='<div class="radioStyling ">';
				str+='<input class="alertStatusCls alertStatusAmountCls" attr_id="2" type="radio" name="group1" id="radio-2">';
				str+='<label for="radio-2"><span class="radio">Proposal Reject<span style="color:red;"> *</span></span></label>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-6">';
			str+='<div class="input-group m_top5 alertStatusAmountInputCls" style="display:none;">';
				str+='<span class="input-group-addon">';
					str+='<i class="fa fa-inr"></i>';
				str+='</span>';
				str+='<input type="text" class="form-control" placeholder="Enter Approved Amount" id="approvedAmountId">';
			str+='</div>';
			str+='<span id="errMsgAprAmuntId"></span>';
		str+='</div>'; 
	   str+='<div class="panel-body pad_0">';
		str+='<textarea class="form-control m_top10" id="acceptedStatusChangeComment" placeholder="Comment.."></textarea>';
	str+='</div>';
	str+='<button class="btn btn-primary btn-sm text-capital" attr_alert_id="'+alertId+'" subTaskId="" id="updatePrposalStatsId">update</button>';
	str1+='<span id="updateProposalStatusChangeMsg"></span>';
	glStr=str1;
	globalPropasalStr=str;
	//$("#updateStatusChangeBody").html(str1);
	
}
function getCommentsForAlert(alertId){
	$("#alertGeneralComments").html(spinner);
	$.ajax({
		url: wurl+"/WebService/viewAlertHistory/"+alertId+"/task"
		//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/viewAlertHistory/"+alertId+"/task"
	}).then(function(result){
		
		if(result != null && result.length > 0)
		{
			buildCommentsForAlert(result);
		}else{
			$("#alertGeneralComments").html("NO DATA");
		}
		
	});	
}
var globalPropCategory;
var	globalPropReqAunt;	
var	globalPrposalCategoryId;	
function buildCommentsForAlert(result)
{
	var str='';
	str+='<div class="row m_top20">';
		str+='<div class="col-sm-1 text-center body-icons">';
			str+='<i class="fa fa-road fa-2x"></i>';
		str+='</div>';
		str+='<div class="col-sm-11">';
			str+='<h4 class="text-muted text-capital">complete alert history</h4>';
		str+='<ul class="alert-myfoot m_top10" style="list-style:outside none none">';
		for(var i in result){
			
			str+='<li>';
			str+='<span class="alert-history-date"  style="background-color: lightpink;padding: 3px;border-radius: 5px;" >'+result[i][0].trackingDate+'</span>';
			for(var j in result[i]){
					if(result[i][j].actionType == 'Assigning'){     
						str+='<p class="alert-history-status m_top20 text-capital" style="background-color: lightgrey;padding: 3px;border-radius: 5px;"><span class="status-icon arrow-icon"></span>Action : '+result[i][j].actionType+'  <span class="pull-right"><span style="color:slategrey;font-weight:bold;margin-left: 25px"> Time </span> : <span style="font-size:10px">  '+result[i][j].trackingTime+'  </span></span></p>'; 
						str+='<p class=" alert-history-user m_top20 text-capital "> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Assigned BY </span> : <span style="font-size:10px">  '+result[i][j].updatedUserName+'  </span>    </p>';
						
					}else if(result[i][j].actionType == 'Attachment'){
						str+='<p class="alert-history-status m_top20 text-capital" style="background-color: lightgrey;padding: 3px;border-radius: 5px;"><span class="status-icon arrow-icon"></span>Action : '+result[i][j].actionType+' <span class="pull-right"> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Time </span> : <span style="font-size:10px">  '+result[i][j].trackingTime+'  </span></span></p>'; 
						str+='<p><span class="alert-history-body text-capital"><a target="_blank"  href="../images/'+result[i][j].document+'" width="25%" style="margin-left: 25px;" class="m_top5" >'+result[i][j].document+'</a></span></p>';       
						str+='<p class=" alert-history-user m_top20 text-capital "> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> UPDATED BY </span> : <span style="font-size:10px">'+result[i][j].updatedUserName+'  </span>';     
						if(result[i][j].position != "admin"){
							str+='<span style="color:slategrey;font-weight:bold;margin-left: 25px"> DEPT </span> : <span style="font-size:10px">  '+result[i][j].deptName+'  </span>   <span style="color:slategrey;font-weight:bold;margin-left: 25px"> DESIGNATION </span> : <span style="font-size:10px">  '+result[i][j].designation+'  </span>  <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Location </span> : <span style="font-size:10px">  '+result[i][j].location+'  </span>';
						}
						str+='</p>';     
					}else if(result[i][j].actionType == 'Due Date'){
						str+='<p class="alert-history-status m_top20 text-capital" style="background-color: lightgrey;padding: 3px;border-radius: 5px;"><span class="status-icon arrow-icon"></span>Action : '+result[i][j].actionType+'  <span class="pull-right"><span style="color:slategrey;font-weight:bold;margin-left: 25px"> Time </span> : <span style="font-size:10px">  '+result[i][j].trackingTime+'  </span></span></p>'; 
						
						str+='<p class="m_top20 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 25px">Changed Date </span> : '+result[i][j].dueDate+'</p>';
						
						str+='<p class=" alert-history-user m_top20 text-capital "> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> UPDATED BY </span> : <span style="font-size:10px">  '+result[i][j].updatedUserName+'  </span>';  
						if(result[i][j].position != "admin"){
							str+='<span style="color:slategrey;font-weight:bold;margin-left: 25px"> DEPT </span> : <span style="font-size:10px">  '+result[i][j].deptName+'  </span>   <span style="color:slategrey;font-weight:bold;margin-left: 25px"> DESIGNATION </span> : <span style="font-size:10px">  '+result[i][j].designation+'  </span>  <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Location </span> : <span style="font-size:10px">  '+result[i][j].location+'  </span>';
						}
						str+='</p>';
						
					}else if(result[i][j].actionType == 'Priority'){
						str+='<p class="alert-history-status m_top20 text-capital" style="background-color: lightgrey;padding: 3px;border-radius: 5px;"><span class="status-icon arrow-icon"></span>Action : '+result[i][j].actionType+'  <span class="pull-right"><span style="color:slategrey;font-weight:bold;margin-left: 25px"> Time </span> : <span style="font-size:10px">  '+result[i][j].trackingTime+'  </span></span></p>'; 
						
						str+='<p class="m_top20 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 25px">Priority </span> : '+result[i][j].severty+'</p>';
						
						str+='<p class=" alert-history-user m_top20 text-capital "> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> UPDATED BY </span> : <span style="font-size:10px">  '+result[i][j].updatedUserName+'  </span>';     
						if(result[i][j].position != "admin"){
							str+='<span style="color:slategrey;font-weight:bold;margin-left: 25px"> DEPT </span> : <span style="font-size:10px">  '+result[i][j].deptName+'  </span>   <span style="color:slategrey;font-weight:bold;margin-left: 25px"> DESIGNATION </span> : <span style="font-size:10px">  '+result[i][j].designation+'  </span>  <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Location </span> : <span style="font-size:10px">  '+result[i][j].location+'  </span>';
						}
						str+='</p>';
					}else if(result[i][j].actionType == 'Status Change'){
						str+='<p class="alert-history-status m_top20 text-capital" style="background-color: lightgrey;padding: 3px;border-radius: 5px;"><span class="status-icon arrow-icon"></span>Action : '+result[i][j].actionType+'  <span class="pull-right"><span style="color:slategrey;font-weight:bold;margin-left: 25px"> Time </span> : <span style="font-size:10px">  '+result[i][j].trackingTime+'  </span></span></p>'; 
						
						
						 str+='<p class="m_top20 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 25px">Status </span> :';
						if(result[i][j].status == 'Proposal'){
							str+=''+result[i][j].status+'';
								str+='<p class="text-capital myfontStyle m_top5"> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Proposal Status </span> :'+result[i][j].proposalStatus+'</p>';
								globalPrposalCategoryId = result[i][j].categoryId;
							 if(result[i][j].categoryId == 1 ){
								 globalPropCategory = result[i][j].category;
								globalPropReqAunt = result[i][j].amount;
								str+='<p class="text-capital myfontStyle m_top5"><span style="color:slategrey;font-weight:bold;margin-left: 25px"> Proposal Categoty </span> :'+result[i][j].category+'';
								if(result[i][j].proposalStatus == 'Proposal Accept'){
									str+='<span class="text-capital myfontStyle m_top5" style="color:slategrey;font-weight:bold;margin-left: 25px"> Proposal Amount </span> :'+result[i][j].amount+'/-';
									str+='<span class="text-capital myfontStyle m_top5" style="color:slategrey;font-weight:bold;margin-left: 25px">Approved Amount </span> :'+result[i][j].approvedAmount+'/-</p>';
								}else{
									str+='<span class="text-capital myfontStyle m_top5" style="color:slategrey;font-weight:bold;margin-left: 25px"> Proposal Amount </span> :'+result[i][j].amount+'/- </p>';
								}
							}else{
								globalPropCategory = result[i][j].category;
								globalPropReqAunt = result[i][j].amount;
								str+='<p class="text-capital myfontStyle m_top5"><span style="color:slategrey;font-weight:bold;margin-left: 25px"> Proposal Categoty </span> :'+result[i][j].category+'</p>';
							}
						}else if(result[i][j].status == 'Rejoinder'){
							str+=''+result[i][j].status+'';
								str+='<p class="text-capital myfontStyle m_top5"> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Rejoinder Status </span> :'+result[i][j].rejinderStatus+'</p>';
						}else {
							str+=''+result[i][j].status+'</p>';
						} 
						
						str+='<p class="alert-history-body m_top5 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Comment </span>: '+result[i][j].comment+'</p>';
						
						str+='<p class=" alert-history-user m_top20 text-capital "> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> UPDATED BY </span> : <span style="font-size:10px">  '+result[i][j].updatedUserName+'  </span>';     
						if(result[i][j].position != "admin"){
							str+='<span style="color:slategrey;font-weight:bold;margin-left: 25px"> DEPT </span> : <span style="font-size:10px">  '+result[i][j].deptName+'  </span>   <span style="color:slategrey;font-weight:bold;margin-left: 25px"> DESIGNATION </span> : <span style="font-size:10px">  '+result[i][j].designation+'  </span>  <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Location </span> : <span style="font-size:10px">  '+result[i][j].location+'  </span>';
						}
						str+='</p>';
					}else if(result[i][j].actionType == 'Comment'){
						str+='<p class="alert-history-status m_top20 text-capital" style="background-color: lightgrey;padding: 3px;border-radius: 5px;"><span class="status-icon arrow-icon"></span>Action : '+result[i][j].actionType+' <span class="pull-right"> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Time </span> : <span style="font-size:10px">  '+result[i][j].trackingTime+'  </span></span></p>'; 
						
						
						str+='<p class="alert-history-body m_top5 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 18px"> Comment </span>: '+result[i][j].comment+'</p>';
						
						str+='<p class=" alert-history-user m_top20 text-capital "> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> UPDATED BY </span> : <span style="font-size:10px">  '+result[i][j].updatedUserName+'  </span>';
						if(result[i][j].position != "admin"){
							str+='<span style="color:slategrey;font-weight:bold;margin-left: 25px"> DEPT </span> : <span style="font-size:10px">  '+result[i][j].deptName+'  </span>   <span style="color:slategrey;font-weight:bold;margin-left: 25px"> DESIGNATION </span> : <span style="font-size:10px">  '+result[i][j].designation+'  </span>  <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Location </span> : <span style="font-size:10px">  '+result[i][j].location+'  </span>';
						}
						str+='</p>';
					}else if(result[i][j].actionType == 'Feedback Status'){
						str+='<p class="alert-history-status m_top20 text-capital" style="background-color: lightgrey;padding: 3px;border-radius: 5px;"><span class="status-icon arrow-icon"></span>Action : '+result[i][j].actionType+' <span class="pull-right"> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Time </span> : <span style="font-size:10px">  '+result[i][j].trackingTime+'  </span></span></p>'; 
						
						if(result[i][j].alertFeedbackStatus != null && result[i][j].alertFeedbackStatus != ""){
							str+='<p class="alert-history-body m_top5 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 18px"> Feed back Status </span>: '+result[i][j].alertFeedbackStatus+'</p>'; 
						}
						if(result[i][j].alertCallerName != null && result[i][j].alertCallerName != ""){
							str+='<p class="alert-history-body m_top5 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 18px"> Caller Name </span>: '+result[i][j].alertCallerName+'</p>';
						}
						if(result[i][j].status != null && result[i][j].status != ""){
							str+='<p class="alert-history-body m_top5 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 18px"> Alert Status </span>: '+result[i][j].status+'</p>';
						}
						
						str+='<p class="alert-history-body m_top5 text-capital myfontStyle"> <span style="color:slategrey;font-weight:bold;margin-left: 18px"> Comment </span>: '+result[i][j].comment+'</p>';
						
						str+='<p class=" alert-history-user m_top20 text-capital "> <span style="color:slategrey;font-weight:bold;margin-left: 25px"> UPDATED BY </span> : <span style="font-size:10px">  '+result[i][j].updatedUserName+'  </span>';
						if(result[i][j].position != "admin"){
							str+='<span style="color:slategrey;font-weight:bold;margin-left: 25px"> DEPT </span> : <span style="font-size:10px">  '+result[i][j].deptName+'  </span>   <span style="color:slategrey;font-weight:bold;margin-left: 25px"> DESIGNATION </span> : <span style="font-size:10px">  '+result[i][j].designation+'  </span>  <span style="color:slategrey;font-weight:bold;margin-left: 25px"> Location </span> : <span style="font-size:10px">  '+result[i][j].location+'  </span>';
						}
						str+='</p>';
					}
			}
		str+='</li>';	
		
		}
		str+='</ul>';
	str+='</div>';
	//$("#alertManagementPopup1 .modal-dialog").css("width","60%")
	$("#alertGeneralComments").html(str);
//}
}
function getAlertData(alertId){
	$("#alertDetails").html(spinner);
	$.ajax({
		url: wurl+"/WebService/getAlertData/"+alertId
		//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getAlertData/"+alertId
	}).then(function(result){
		$("#alertDetails").html('');
		
		//getInvolvedMembersDetilas(alertId);
		//getSubTaskInfoForAlert(alertId);
		//getCommentsForAlert(alertId);
		
		if(result != null && result.length > 0){
			buildAlertDataNew(result)
			if(result[0].categoryId == 2)
			{
				getGroupedArticlesInfo(result[0].alertCategoryTypeId)
			}
			if(result[0].categoryId == 5){
				buildSocialMediaImage(result[0].documentList);
			}
		}else{
			$("#alertDetails").html("NO DATA AVAILABLE...");
		}
		
	});	
}
function getGroupedArticlesInfo(articleId)
{
	$.ajax({
		  type : 'GET',      
		  url: wurl+"/CommunityNewsPortal/webservice/getGroupedArticlesInfo/"+articleId+""
		  //url: "http://192.168.11.147:8080/CommunityNewsPortal/webservice/getGroupedArticlesInfo/"+articleId+""
	}).then(function(result){
		//$("#alertDetails").append(str);
	});
}

var globalProposalStatus;
var globalRejoinderStatus;
function buildAlertDataNew(result)
{
	var str='';
	var str1='';
	$("#statusId").html(result[0].status);
	if($("#displayStatusId #statusId").html() == 'Proposal'){
		$("#proposalId").show();
		globalProposalStatus = result[0].committeeName;
		$("#presntPrposalstatusId").html(result[0].committeeName);
	}
	if($("#displayStatusId #statusId").html() == 'Rejoinder'){
		$("#rejoinderId").show();
		globalRejoinderStatus = result[0].comment;
		$("#presntRejoinderstatusId").html(result[0].comment);
		//globalRejoinderStatus = result[0].comment;
	}
	$("#impactLevel").html(result[0].regionScope);
	if(result[0].severity != null)
	{
		$("#priorityBodyId").html(result[0].severity);
	}
	$("#statusIdColor").css("background-color",result[0].statusColor);
	if(result[0].dueDate != null && result[0].dueDate.length>0)
	{
		$('.modal-date').data('daterangepicker').setStartDate(result[0].dueDate);
		$('.modal-date').data('daterangepicker').setEndDate(result[0].dueDate);
		if(result[0].dueDate != null && result[0].dueDate.length>0){
			$('.modal-date').html(result[0].dueDate);
			$('.modal-date1').html(result[0].dueDate);
		}
	}else{
			$('#displayDueDate2').hide();
			$('#displayDueDate1').hide();
		}
	
	//priorityRadioCls
	if(result[0].severityId != null && result[0].severityId > 0){
		$("input[name=alert-status-change-list][value='"+result[0].severityId+"']").prop("checked",true);
	}
	
	str+='<div class="row m_top20">';
		for(var i in result)
		{
			str+='<div class="col-sm-1 text-center body-icons">';
				str+='<i class="fa fa-check fa-2x"></i>';
			str+='</div>';
			str+='<div class="col-sm-11">';
				str+='<h3>'+result[i].title+'</h3>';
				str+='<p class="m_top10">'+result[i].desc+'</p>';
				str+='<p class="m_top10"><small> <i class="fa fa-map-marker"></i> '+result[i].locationVO.state+'(S),'+result[i].locationVO.districtName+'(D),'+result[i].locationVO.constituencyName+'(C),'+result[i].locationVO.tehsilName+'(M)'+result[i].locationVO.wardName+','+result[i].locationVO.villageName+'(P),'+result[i].locationVO.hamletName+'(H)</small></p>';
				str+='<p class="m_top10"><small> <i class="fa fa-calendar"></i> Created : '+result[i].date+'</small></p>';
			str+='</div>';
		}
	str+='</div>';
	/*str+='<div class="row m_top20">';
		str+='<div class="col-sm-1 text-center body-icons">';
			str+='<i class="fa fa-paperclip fa-2x"></i>';
		str+='</div>';*/
		str+='<div class="col-sm-11">';
			for(var i in result.documentList)
			{
				str+='<img class="articleDetailsCls img-responsive m_top20" src="../Reports/'+result.documentList[i]+'" style="width: 150px; height: 150px;cursor:pointer"/>';
			}
		str+='</div>';
	str+='</div>';
	str1+='<div class="row m_top20">';
	
		if(result[i].imageUrl !=null && result[i].imageUrl.length>0){
			str1+='<div class="col-sm-1 text-center body-icons">';
				str1+='<i class="fa fa-paperclip fa-2x"></i>';
			str1+='</div>';
			if(result[i].imageUrl != null){
				str1+='<div class="col-sm-4">';
					str1+='<h4 class="text-muted text-capital">article attachment</h4>';
					str1+='<img class="articleDetailsCls img-responsive m_top20" attr_articleId='+result[i].alertCategoryTypeId+' src="../NewsReaderImages/'+result[i].imageUrl+'" style="width: 150px; height: 150px;cursor:pointer"/>';
				str1+='</div>';
				str1+='<div class="col-sm-7" id="existingDocsDivId"></div>';
			}else{
				str1+='<div class="col-sm-11" id="existingDocsDivId"></div>';
			}
		}else{
			str1+='<div class="col-sm-1 text-center body-icons">';
				str1+='<i class="fa fa-paperclip fa-2x"></i>';
			str1+='</div>';
			str1+='<div class="col-sm-11" id="existingDocsDivId"></div>';
		}
		
	str1+='</div>';
	
	var str2='';
	
	str2+='<div class="row m_top20">';
	
		if(result[i].rejinderDocList !=null && result[i].rejinderDocList.length>0){
			str2+='<div class="col-sm-1 text-center body-icons">';
				str2+='<i class="fa fa-reply-all fa-2x"></i>';
			str2+='</div>';
			str2+='<div class="col-sm-11">';
				str2+='<div class="bg_EE">';
					for(var j in result[i].rejinderDocList)
					{
						str2+='<div class="media">';
							str2+='<div class="media-left">';
							if(j == 0){
								str2+='<i class="fa fa-commenting-o fa-2x" aria-hidden="true" style="color:orange"></i>';
							}else if(j == 1 && result[i].rejinderDocList[j].subList1 != null && result[i].rejinderDocList[j].subList1.length > 0 ){
								str2+='<i class="fa fa-commenting fa-2x" aria-hidden="true" style="color:red"></i>';
							}
							str2+='</div>';
							str2+='<div class="media-body">';
								if(j == 0 && result[i].rejinderDocList[j].subList1 != null){
									str2+='<p><span style="color:orange">'+result[i].rejinderDocList[j].name+'</span></p>';
								}else if(j == 1 && result[i].rejinderDocList[j].subList1 != null && result[i].rejinderDocList[j].subList1.length > 0 ){
									str2+='<p><span style="color:red">'+result[i].rejinderDocList[j].name+'</span></p>';
								}
								
								for(var k in result[i].rejinderDocList[j].subList1)
								{
									 var nameArr = result[i].rejinderDocList[j].subList1[k].name.split('/');
									 var name1 = nameArr[3];
									str2+='<p><i class="fa fa-file-o" aria-hidden="true"></i>&nbsp;&nbsp;<a href="http://www.mytdp.com/images/'+result[i].rejinderDocList[j].subList1[k].name+'" style="cursor:pointer;">'+name1+'</a>&nbsp;&nbsp;(<i class="fa fa-calendar" aria-hidden="true"></i> &nbsp;'+result[i].rejinderDocList[j].subList1[k].date1+')</p>';
								}
								
							str2+='</div>';
						str2+='</div>';
					}
					
				str2+='</div>';
			str2+='</div>';
		}
		
	str2+='</div>';
	
	$("#alertDetails").html(str);
	$("#articleAttachment").html(str1);
	$("#rejoinderAttachments").html(str2);
	
}
function buildSocialMediaImage(result){
	$("#existingDocsDivId").html('');
	var str='';
	
	if(result !=null && result.length>0){
		str+='<ul class="list-inline imageShowOpen">';
			for(var i in result){
				str+='<span style="background-color: gray; display: inline-block; border-radius: 5px; height: 8px; width: 8px;"></span><li class="" style="margin-top:25px;" attr_doc_id="'+i+'"  attr_path="'+result[i]+'">';
					str+='<img src="../images/'+result[i]+'" style="width: 100px; height: 100px;cursor:pointer" />';
					//str+='<a target="_blank" href="http://www.mytdp.com/images/'+result[i].name+'" style="cursor:pointer;">'+result[i].name+'</a>';
				str+='</li>&nbsp;&nbsp;';
			}
		str+='</ul>';
		}
		setTimeout(function(){
			$("#existingDocsDivId").html(str);	
		},1000);
		
}

function getAlertCategoryByAlert(alertId){
	
	$("#alertCategory").html(spinner);
	$.ajax({
		url: wurl+"/WebService/getAlertCategoryByAlert/"+alertId
		//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getAlertCategoryByAlert/"+alertId
	}).then(function(result){
		if(result != null)
		{
			var str='';
			str+='<div class="row m_top20">';
				str+='<div class="col-sm-1 text-center body-icons">';
					str+='<i class="fa fa-tags fa-2x"></i>';
				str+='</div>';
				str+='<div class="col-sm-11">';
					str+='<h4 class="text-muted text-capital">category</h4>';
					if(result.name !=null){
						str+='<p class="m_top20"><span class="label label-default label-category">'+result.name+'</span></p>';
					}else{
						str+='<p class="m_top20"><span class="label label-default label-category"> - </span></p>';
					}
					
				str+='</div>';
			str+='</div>';
			$("#alertCategory").html(str);
		}
	});	
}
function getSubTaskInfoForAlert(alertId){
	$("#alertSubtask").html(spinner);
	$.ajax({
		url: wurl+"/WebService/getSubTaskInfoForAlert/"+alertId
		//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getSubTaskInfoForAlert/"+alertId
	}).then(function(result){
		$("#alertSubtask").html('');
		if(result != null && result.length > 0)
		{
			buildSubTaskInfoForAlert(result,alertId);
		}
	});	
}
function buildSubTaskInfoForAlert(result,alertId)
{
	var str='';
	
		
		for(var i in result)
		{
			if(result[i].attachementsList != null && result[i].attachementsList.length>0){
				str+='<div class="row m_top20">';
					str+='<div class="col-sm-1 text-center body-icons">';
						str+='<i class="fa fa-level-down fa-2x"></i>';
					str+='</div>';
					
					str+='<div class="col-sm-11">';
						str+='<h4 class="text-muted text-capital"> My Sub Tasks : </h4>';
						str+='<ul class="assign-subtask-list m_top20">';
						for(var k in result[i].attachementsList){
							str+='<li class="assigned subTaskCls " style="cursor:pointer;margin-left: 5px" attr_sub_alert_Id="'+result[i].attachementsList[k].alertId+'" attr_alert_id="'+alertId+'">';
									str+='<div class="row">';
										str+='<div class="col-sm-1">';
											str+='<i class="glyphicon glyphicon-ok"></i>';
										str+='</div>';
										str+='<div class="col-sm-10" >';
											str+='<p>'+result[i].attachementsList[k].title+' ';
											
											str+='</p>';
											str+='<small class="pull-right">DEPT : <span style="color: #60bbfd;">'+result[i].attachementsList[k].deptName+'</span> DESIGNATION : <span style="color: #60bbfd;">'+result[i].attachementsList[k].designation+'</span> Location : <span style="color: #60bbfd;">'+result[i].attachementsList[k].location+'</span> </small>';
										str+='</div>';
										str+='<div class="col-sm-1">';
											str+='<span class="icon-name icon-primary" style="background-color: '+result[i].attachementsList[k].color+'" title="'+result[i].attachementsList[k].status+'"></span>';
											/* str+='<ul class="list-icons list-inline">';
												str+='<li> <span class="status-icon arrow-icon" id="statusIdColor" style="background-color: '+result[i].attachementsList[k].color+'" title="'+result[i].attachementsList[k].status+'"></span> </li>';
											str+='</ul>'; */
										str+='</div>';
									str+='</div>';
							str+='</li>';
						}
						str+='</ul>';
					str+='</div>';
				str+='</div>';
				
			}
			if(result[i].commentList != null && result[i].commentList.length>0){
				str+='<div class="row m_top20">';
					str+='<div class="col-sm-1 text-center body-icons">';
						str+='<i class="fa fa-level-down fa-2x"></i>';
					str+='</div>';
				str+='<div class="col-sm-11 ">';
					str+='<h4 class="text-muted text-capital"> Sub Tasks involved : </h4>';
					str+='</div>';
					str+='<div class="col-sm-11 col-sm-offset-1">';
						str+='<ul class="assign-subtask-list m_top20">';
						for(var k in result[i].commentList){
							str+='<li class="assigned subTaskCls " style="cursor:pointer;" attr_sub_alert_Id="'+result[i].commentList[k].alertId+'" attr_alert_id="'+alertId+'">';
									str+='<div class="row">';
										str+='<div class="col-sm-1">';
											str+='<i class="glyphicon glyphicon-ok"></i>';
										str+='</div>';
										str+='<div class="col-sm-10" >';
											str+='<p>'+result[i].commentList[k].title+'';
											
											str+='</p>';
											str+='<small class="pull-right">DEPT : <span style="color: #60bbfd;">'+result[i].commentList[k].deptName+'</span> DESIGNATION : <span style="color: #60bbfd;">'+result[i].commentList[k].designation+'</span> Location : <span style="color: #60bbfd;">'+result[i].commentList[k].location+'</span> </small>';
										str+='</div>';
										str+='<div class="col-sm-1">';
											str+='<span class="icon-name icon-primary" id="statusIdColor" style="background-color: '+result[i].commentList[k].color+'"  title="'+result[i].commentList[k].status+'"></span>';
											/* str+='<ul class="list-icons list-inline">';
												str+='<li> <span class="status-icon arrow-icon" id="statusIdColor" style="background-color: '+result[i].commentList[k].color+'"  title="'+result[i].commentList[k].status+'"></span> </li>';
											str+='</ul>'; */
											//str+='<i class="glyphicon glyphicon-menu-right pull-right"></i>';
										//	str+='<span class="icon-name icon-primary"></span>';
											//str+='<span class="label label-default">...</span>';
										str+='</div>';
									str+='</div>';
							str+='</li>';
						}
						str+='</ul>';
					str+='</div>';
				
			}
		}	
	str+='</div>';	

	$("#alertSubtask").html(str);
}
function getDocumentsForAlerts(alertId){
	$("#existingDocsDivId").html("");
	$("#existingDocsDivId").html(spinner);
	$.ajax({
		url: wurl+"/WebService/getDocumentsForAlerts/"+alertId
		//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getDocumentsForAlerts/"+alertId
	}).then(function(result){
		$("#existingDocsDivId").html('');
		if(result != null && result.length > 0){
			var str='';
			str+='<h4 class="text-muted text-capital">alert attachment</h4>';
			str+='<ul class="list-inline imageShowOpen">';
			for(var i in result){
				str+='<span style="background-color: gray; display: inline-block; border-radius: 5px; height: 8px; width: 8px;"></span><li class="" style="margin-top:25px;" attr_doc_id="'+result[i].id+'"  attr_path="'+result[i].name+'" id="imageAttachmentOpen'+result[i].id+'" >';
					str+='<img src="../images/'+result[i].name+'" style="width: 100px; height: 100px;cursor:pointer" />';
					//str+='<a target="_blank" href="http://www.mytdp.com/images/'+result[i].name+'" style="cursor:pointer;">'+result[i].name+'</a>';
				str+='</li>&nbsp;&nbsp;';
				
			}
			str+='</ul>';
			$("#existingDocsDivId").html(str);
		}
	});	
}
var globalSubTaskDeptId=0;
function getDepartmentsByAlert(alertId){
	
	$.ajax({
		url: wurl+"/WebService/getDepartmentsByAlert/"+alertId
		//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getDepartmentsByAlert/"+alertId
	}).then(function(result){
		var str='';
		str+='<p class="m_top20">';
			for(var i in result)
			{
				str+='<span class="label label-default label-category">'+result[i].name+'</span>';
				globalSubTaskDeptId=result[i].id;
			}
		str+='</p>';
		$("#alertDetails").append(str);
		
	});	
}	
function getAssignedOfficersDetails(alertId){
	
	$.ajax({
		url: wurl+"/WebService/getAssignedOfficersDetails/"+alertId
		//url: "http://192.168.11.147:8080/PartyAnalyst/WebService/getAssignedOfficersDetails/"+alertId
	}).then(function(result){
		if(result != null && result.length > 0)
		{
			buildAssignedOfficersDetailsForAlert(result);
		}else{
			assignUser(alertId);
		}
		
	});	
}
function buildAssignedOfficersDetailsForAlert(result)
{
	var str='';
	var splitNameArr = result[0].name.split(" ");
	var value = "";
	if(splitNameArr != null && splitNameArr.length>1)
		value = splitNameArr[1];
	else
		value = splitNameArr[0];  
	
	str+='<div class="media">';
		/* str+='<div class="media-left">';
			str+='<span class="icon-name icon-primary">'+result[0].name.substring(0,1)+''+value.substring(0,1)+'</span>';
		str+='</div>'; */
		str+='<div class="media-body">';
			/* str+='<p> - '+result[0].designation+'<br> (<i class="glyphicon glyphicon-phone"></i> '+result[0].mobileNo+')</p>';
			str+='<p>Location : '+result[0].source+'</p>';
			
			str+='<p>'+result[0].name+' - '+result[0].department+'</p>'; */
			str+='<p> ASSIGN TO: <i class="fa fa-level-down "></i></p> ';
			str+='<p>'+result[0].designation+' <br> <i class="glyphicon glyphicon-phone"></i> : '+result[0].mobileNo+'</p>';
			str+='<p>Location :  '+result[0].source+'</p>';			
			str+='<p>Dept : '+result[0].department+'</p>'; 
			
			str+='<p></p>';
		str+='</div>';
	str+='</div>';
	$("#assignedUser").html(str);
	$(".assign-user").hide();
}
function assignUser(alertId)
{
	var str='';
	str+='<div class="assign-user">';
		str+='<ul class="list-icons list-inline">';
			str+='<li id="displayAssignIconId" attr_alertId="'+alertId+'" style="display:none;">';
				str+='<i class="glyphicon glyphicon-user"></i>Click To Assignee  ';
			str+='</li>';
		str+='</ul>';
		str+='<div class="assign-user-body" style="display:none">';
			str+='<form id="alertAssign" name="alertAssignForm">';
				str+='<div class="arrow_box_top">';
					str+='<div>';
						str+='<div class="row">';  
							str+='<div class="col-sm-12">';
								str+='<div id="assignErrorDivId" class="text-danger text-capitalize" style="margin-bottom:10px;"></div>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<label>Department<span style="color:red">*</span>&nbsp;&nbsp; <span style="color:#18A75A;" id="errMsgDeptId"></span></label>';
								str+='<select class="chosenSelect" id="assignDepartmentId" name="alertAssigningVO.mainDepartmentId">';
									str+='<option value="0">Select Department</option>';
									//str+='<option value="49">RWS</option>';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<label>Sub Department<span style="color:red">*</span>&nbsp;&nbsp; <span style="color:#18A75A;" id="errMsgDeptId"></span></label>';
								str+='<select class="chosenSelect" id="departmentsId" name="alertAssigningVO.departmentId">	';
									str+='<option value="0">Select Sub Department</option>';
									//str+='<option value="49">RWS</option>';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<label>Impact Level<span style="color:red">*</span>&nbsp;&nbsp; <span style="color:#18A75A;" id="errMsgLvlId"></span></label>';
								str+='<select  class="chosenSelect" id="locationLevelSelectId" name="alertAssigningVO.levelId">	';
									str+='<option></option>';
								str+='</select>';
							str+='</div>';
							str+='<div id="parentLevelDivId"> </div>';
							
							str+='<div class="col-sm-6">';
								str+='<label>Designation<span style="color:red">*</span>&nbsp;&nbsp; <span style="color:#18A75A;" id="errMsgDesgId"></span></label>';
								str+='<select name="alertAssigningVO.designationId" id="designationsId" class="chosenSelect">';
									str+='<option></option>	';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<label>Officer Name<span style="color:red">*</span>&nbsp;&nbsp; <span style="color:#18A75A;" id="errMsgOffcrId"></span></label>';
								str+='<select name="alertAssigningVO.govtOfficerId" id="officerNamesId" class="chosenSelect">';
									str+='<option></option>';
								str+='</select>';
							str+='</div>';
						str+='</div>';
						str+='<input type="hidden" id="hiddenAlertId" value="'+alertId+'" name="alertAssigningVO.alertId"/>';
					str+='</div>';
				str+='</div>';
			str+='<div class="panel-footer text-right pad_5 border_1 bg_EE">';
				str+='<button class="btn btn-primary btn-sm text-capital" id="assignOfficerId" type="button">assign</button>';
				str+='<img style="display: none;" alt="Processing Image" src="./images/icons/search.gif" id="assiningLdngImg">';
				str+='<span class="text-success" id="assignSuccess"></span>';
			str+='</div>';
			str+='</form>';
		str+='</div>';
	str+='</div>';
	$("#assignedUser").html(str);
	$(".chosenSelect").chosen({width:'100%'});
	$('#displayAssignIconId').show();
	
	//getDepartmentDetailsOfAlert(alertId);
}