/*== clicks Start ==*/

function alertDetailsByClick(divId,alertsList,fromDate,toDate,categeoryType){
	$("#"+divId).html(spinner);
	
	var json={  
		"activityMemberId":44,
		"alertStatusIds": alertsList,
		"alertBasicTypeId":alertBasicTypeId,
		"alertCategoryIds":categeoryType,
		"fromDateStr":fromDate,
		"toDateStr":toDate,
		"stateId":1,
		"edtionsIds":[],
		"impactLevel":impactLevelAlert  		
	};
	 $.ajax({
		url: "getAlertDetailsByClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null){
				buildAlertDetailsByClick(result,divId);
			}else{
				$("#"+divId).html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function locationWiseAlertDetailsClick(divId,statusArr,locationScopeId,locationValue,impactLevelArr,impactScopeArr){
	$("#"+divId).html(spinner);
	var json={  
		"activityMemberId":44,
		"fromDateStr":customStartDate,
		"locationScopeId":locationScopeId,
		"stateId":1,
		"alertBasicTypeId":alertBasicTypeId,
		"toDateStr":customEndDate,
		"alertCategoryIds":alert_categoryIdsArr,
		"locationValue":locationValue,
		"alertStatusIds":statusArr,
		"impactLevelIds":impactLevelArr,
		"impactScopeIds":impactScopeArr, 
		"impactLevel":impactLevelAlert  	
	};
	 $.ajax({
		url: "getLocationWiseAlertDetailsClick",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result !=null){
				buildAlertDetailsByClick(result,divId);
			}else{
				$("#"+divId).html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildAlertDetailsByClick(result,divId) {
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table_custom_meeting m_top10" id="overallDataTable'+divId+'">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Alert Source</th>';
					str+='<th>Title</th>';
					str+='<th>Created Time</th>';
					str+='<th>Last Updated Time</th>';
					str+='<th>Current Status</th>';
					str+='<th>Lag Days</th>';
					str+='<th>Alert Impact Level</th>';
					str+='<th>Location Level</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+result[i].source+'</td>';
					str+='<td class="descAlertCls" attr_alert_status="'+result[i].status+'" attr_alert_id="'+result[i].id+'" style="cursor:pointer; text-decoration:underline;">'+result[i].title+'</td>';
					str+='<td>'+result[i].createdTime+'</td>';
					str+='<td>'+result[i].createdDate+'</td>';
					str+='<td>'+result[i].status+'</td>';
					str+='<td>'+result[i].interval+'</td>';
					str+='<td>'+result[i].alertLevel+'</td>';
					str+='<td>'+result[i].location+'</td>';
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	str+='<div class="scrollTopDivId"></div>';
	$("#"+divId).html(str);
	initializeDataTableWithPagination("overallDataTable"+divId);
	$("#overallDataTable"+divId).tableHeadFixer({"head" : false, "left" : 1}); 
}

$(document).on("click",".politicalAlertsClkCls",function(){

	$("#meetingWiseAttendanceDtsDivId").html('');
	var categeoryType = [];
	var statusArr = [];
	var impactLevelArr = [];
	var impactScopeArr = [];
	var categeory = $('.variationCls:checked').val();
	var statusReport = $('.comparisionCls:checked').val();
	var clickType = $(this).attr("attr_click_type");
	var block = $(this).attr("attr_block");
	var heading = $(this).attr("attr_alerts_head");
	var fromDate = $(this).attr("attr_from_date");
	var toDate = $(this).attr("attr_to_date");
	
	var statusName = $(this).attr("attr_status_name");
	var locationScopeId = $(this).attr("attr_location_scope");
	var locationValue = $(this).attr("attr_location_value");
	var impactLevel = $(this).attr("attr_impact_level");
	var scopeId = $(this).attr("attr_scope_id");
	
	if(block == "categeory"){
		if(categeory == "") {
			categeoryType = alert_categoryIdsArr;
		} else {
			categeoryType.push(categeory);
		}
	} else if(block == "status"){
		if(statusReport == "") {
			statusArr = [];
		} else {
			statusArr.push(statusReport);
		}
		impactLevelArr.push(impactLevel);
		impactScopeArr.push(scopeId);
	} else if(block == "location"){
		if(statusName == "ActionRequired"){
			statusArr = [1,2,3,4];
		} else if(statusName == "completed"){
			statusArr = [4];
		}else if(statusName == "pending"){
			statusArr = [1,2,3];
		}
		
		if(locationScopeId == "District") {
			locationScopeId = 3;
		} else if(locationScopeId == "Constituency") {
			locationScopeId = 5;
		}else{
			locationScopeId = 4;
		}
	}else {
		categeoryType = alert_categoryIdsArr;
	}
	
	$("#meetingTypeHeadingId").html(heading+ " Details");
	$("#meetingTypeModalDivId").modal("show");
	if(clickType == "overallAlerts") {
		var alertIdsStr = $(this).attr("attr_alert_status")
		var alertsList=[];
		if(alertIdsStr.length >0){
			var stringIds = alertIdsStr,
			strx   = stringIds.split(',');
			alertsList = alertsList.concat(strx);
		}
		alertDetailsByClick("meetingWiseWiseModalDivId",alertsList,fromDate,toDate,categeoryType);
	} else if(clickType == "locationBlock") {
		locationWiseAlertDetailsClick("meetingWiseWiseModalDivId",statusArr,locationScopeId,locationValue,impactLevelArr,impactScopeArr);
	}
});
/*== clicks End ==*/
/*=== inner clicks start === */
function alertDataInfo(divId,alertId,alertStatus){
	var str1='';
	str1+='<hr style="border-top:1px solid #ccc;">';
	str1+='<h4 class="pad_10 m-0" id="tourDocHeadingId" style="background-color: #bdbcbc;">Cadre Registration Comparison Details</h4>';
	str1+='<div class="pad_10" style="border:1px solid #ccc;">';
		str1+='<div class="row">';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12">'; 
				str1+='<div id="cdrModelId"></div>';
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12">'; 
				str1+='<div id="alertDestId" ></div>';
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">'; 
				str1+='<div id="sourceHeadingId"></div>';
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12">';
				str1+='<div id="headingNameId" ></div>';
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">'; 
				str1+='<div id="alertDocHeadingId"></div>';
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12">'; 
				str1+='<div id="alertDocId" ></div>';
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">'; 
				str1+='<div id="alertAttachTitId"></div>';    
			str1+='</div>'; 
			str1+='<div class="col-md-12 col-xs-12 col-sm-12">'; 
				str1+='<div id="alertAttachImgId"></div>';  
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">';
				str1+='<div id="alertGroupAttachTitId"></div>';    
			str1+='</div>'; 
			str1+='<div class="col-md-12 col-xs-12 col-sm-12">'; 
				str1+='<div id="alertGroupAttachImgId"></div>';  
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">'; 
				str1+='<div id="alertInvolvedCandidates"></div>';        
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">'; 
				str1+='<div id="alertAssignedCandidates"></div>';  
			str1+='</div>';
			str1+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">';
				str1+='<div id="alertStatusDiv" ></div>';    
			str1+='</div>';
			str1+='<div  class="col-md-12 col-xs-12 col-sm-12">'; 
				str1+='<div id="alertCommentsDiv"></div>';
			str1+='</div>';
			str1+='<div  class="col-md-12 col-xs-12 col-sm-12 m_top10">';
				str1+='<div id="alertVerificationDiv"></div>';    
			str1+='</div>';
			str1+='<div  class="col-md-12 col-xs-12 col-sm-12">'; 
				str1+='<div id="alertVerificationDtlsDiv"></div>';  
			str1+='</div>';
		str1+='</div>';
	str1+='</div>';
	$("#"+divId).html(str1);
	getAlertData(alertId);
	getAlertAssignedCandidates(alertId);
	getAlertStatusCommentsTrackingDetails(alertId,alertStatus);
	getVerificationDtls(alertId);
}
function getAlertData(alertId){ 
	var json ={
		"alertId" :alertId
	}
	$.ajax({
		url: "getAlertsData",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			$("#alertGroupAttachTitId,#alertGroupAttachImgId").html(' ');
			if(result != null && result.length > 0){
				buildAlertData(result);
				if(result[0].categoryId == 2)
				{
					getGroupedArticlesInfo(result[0].alertCategoryTypeId)
				}
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildAlertData(result){
	var docName = '';
	var extName =[];
	
	
	$("#tourDocHeadingId").html("<h5 style='color:#FFFFFF;font-size:14px;'>ALERT TITLE</h5><h5 class='text-capital m_top10' style='color:#000'>"+result[0].title+"</h5>");
	$("#cdrModelId").html("<h5 class='headingColorStyling m-0'>ALERT DESCRIPTION</h5>");
	$("#alertDestId").html("<p class='m-0' style='border: 1px solid rgb(211, 211, 211); padding: 6px;'>"+result[0].desc+"</p>");
	$("#sourceHeadingId").html("<h5 class='headingColorStyling m-0'>ALERT SOURCE</h5>");
	$("#headingNameId").html("<p class='m-0' style='border: 1px solid rgb(211, 211, 211); padding: 10px;'>"+result[0].alertSource+"</p>");
	
	if(result[0].documentList != null && result[0].documentList.length >= 1){
		$("#alertDocHeadingId").html("<h5  class='headingColorStyling m-0'>ALERT DOCUMENTS</h5>");
		var docStr = '';
		docStr+='<ul>';
		for(var i in result[0].documentList){
			docName = result[0].documentList[i];
			extName = docName.split(".");
			if(result[0].documentNameList[i].search('#') != -1 || result[0].documentNameList[i].search('u0') != -1){
				var randumNum = result[0].documentList[i].substring(result[0].documentList[i].indexOf("/")+1,result[0].documentList[i].lastIndexOf("."));      
				docStr+='<li id="document0'+i+'"><a href="/Reports/'+result[0].documentList[i]+'" target="_blank">'+randumNum+'.'+extName[1]+'</a></li>';  
			}else{
				docStr+='<li id="document0'+i+'"><a href="/Reports/'+result[0].documentList[i]+'" target="_blank">'+result[0].documentNameList[i]+'.'+extName[1]+'</a></li>';  
			}
			
		}
		docStr+='</ul>';
		$("#alertDocId").html(docStr);    
	}
	if(result[0].imageUrl != null && result[0].imageUrl.length > 1){    
		$("#alertAttachTitId").html("<h5 class='headingColorStyling m-0'>ALERT ATTACHMENTS</h5>");
		var imgStr = '';
		imgStr+='<ul class="list-inline imageUrlUlCls m-0" style="border: 1px solid rgb(211, 211, 211); padding:5px;">';
		imgStr+='<li><img src="http://mytdp.com/NewsReaderImages/'+result[0].imageUrl+'" style="width: 90px; height: 90px;cursor:pointer;" class="articleImgDetailsCls" attr_articleId="'+result[0].alertCategoryTypeId+'"></img></li>';
		imgStr+='</ul> '; 
		$("#alertAttachImgId").html(imgStr);  
	}
	var str='';
	var invCandCnt = 0;
	if(result[0].subList.length > 0){
		for(var i in result){
			for(var j in result[i].subList){
				if(result[i].subList[j].name != null && result[i].subList[j].name.length > 1){    
					invCandCnt+=1;
				}
			}    
		}
		str+='<h5 class="text-capital headingColorStyling m-0">Involved Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;'+invCandCnt+'</h5>';           
		str+='<ul class="list-inline assignedCandidatesUl1 m-0">';     
		for(var i in result){
			for(var j in result[i].subList){   
				if(result[i].subList[j].name != null && result[i].subList[j].name.length > 1){
					str+='<li>';      
						str+='<p style="color: rgb(0, 0, 0);"><b>'+result[i].subList[j].name+'</b></p>';
						if(result[i].subList[j].mobileNo.length <= 1  || result[i].subList[j].mobileNo == null){
						}else{
							str+='<p><i> - </i>'+result[i].subList[j].mobileNo+'</p>';      
						}  
						if(result[i].subList[j].committeePosition != null){
							str+='<p><i> - </i>'+result[i].subList[j].committeePosition+'</p>';  
						}     
					str+='</li>';      
				}
			}    
		}
		str+='</ul>';      
		
		$("#alertInvolvedCandidates").html(str);       
	}else{
		str+='<h5 class="text-capital headingColorStyling m-0">Involved Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<strong>0</strong></h5>'; 
		$("#alertInvolvedCandidates").html(str);        
	}
	
	$(".assignedCandidatesUl1").slick({          
		 slide: 'li',
		 slidesToShow: 4,
		 slidesToScroll: 3,    
		 infinite: false,
		  responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 5,
				slidesToScroll: 3,
				infinite: false,
				dots: false
			  }
			},
			{
			  breakpoint: 800,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
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
function getAlertAssignedCandidates(alertId){ 
	//GlobalAlertData = [];
	var json ={
		"alertId" :alertId
	}
	$.ajax({
		url: "getAlertAssignedCandidates",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result != null && result.length > 0){   
				buildAlertAssignedCandidates(result);  
			}else{
				var str = '';
				str+='<h5 class="text-capital headingColorStyling m-0">Assigned Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<strong>0</strong></h5>';  
				$("#alertAssignedCandidates").html(str);    
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildAlertAssignedCandidates(result) {
	var str='';
	if(result[0].subList.length > 0){  
		str+='<h5 class="text-capital headingColorStyling m-0">Assigned Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;'+result[0].subList.length+'</h5>';
		str+='<ul class="list-inline assignedCandidatesUl m-0">';
		for(var i in result)
		{
			for(var j in result[i].subList)
			{
				str+='<li>';
					str+='<p style="color:#000"><b>'+result[i].subList[j].name+'</b></p>';
					if(result[i].subList[j].committeePosition == null || result[i].subList[j].committeePosition.length <= 1){     
					}else{
						str+='<p><i> - '+result[i].subList[j].committeePosition+'</i></p>';
					}
					if(result[i].subList[j].mobileNo == null || result[i].subList[j].mobileNo.length <= 1){     
					}else{
						str+='<p><i> - '+result[i].subList[j].mobileNo+'</i></p>';
					}
					if(result[i].subList[j].locationVO.districtName == null || result[i].subList[j].locationVO.districtName.length <= 1){     
					}else{
						str+='<p><i> - '+result[i].subList[j].locationVO.districtName+'</i></p>';
					}  
				str+='</li>';
			}
		}
		str+='</ul>';
		
		$("#alertAssignedCandidates").html(str);
	}else{
		str+='<h5 class="text-capital headingColorStyling m-0">Assigned Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<strong>0</strong></h5>';  
		$("#alertAssignedCandidates").html(str);                    
	}
	
	$(".assignedCandidatesUl").slick({
		 slide: 'li',
		 slidesToShow: 4,
		 slidesToScroll: 3,
		 infinite: false,
		  responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 5,
				slidesToScroll: 3,
				infinite: false,
				dots: false
			  }
			},
			{
			  breakpoint: 800,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
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
function getGroupedArticlesInfo(articleId)
	{
		$.ajax({
			  type : 'GET',      
			  url: wurl+"/CommunityNewsPortal/webservice/getGroupedArticlesInfo/"+articleId+""
			  //url: "http://localhost:8080/CommunityNewsPortal/webservice/getGroupedArticlesInfo/"+articleId+""
		}).then(function(result){
			$("#alertGroupAttachTitId").html("<h5 class='headingColorStyling'>GROUPED ARTICLES</h5>");
			var str='';
			if(result !=null && result.length>0){
				str+='<ul class="list-inline imageUrlUlCls" style="border: 1px solid rgb(211, 211, 211); padding:5px;">';
				for(var i in result)
				{
					if(articleId != result[i].id){
						str+='<li class="articleImgDetailsCls" attr_articleId='+result[i].id+' style="cursor:pointer"><img src="http://mytdp.com/NewsReaderImages/'+result[i].name+'" style="width: 150px; height: 150px;margin-top:5px;"></img></li>';
					}
				}
				str+='</ul>';
			}
			$("#alertGroupAttachImgId").html(str);
		});
	}
function getAlertStatusCommentsTrackingDetails(alertId,alertStatus){ 
	var json ={
		"alertId" :alertId
	}
	$.ajax({
		url: "getAlertStatusCommentsTrackingDetails",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(result != null) {          
				buildAlertStatusCommentsTrackingDetails(result,alertStatus);    
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildAlertStatusCommentsTrackingDetails(result,alertStatus)
{
	var docName = '';
	var extName = [];
	$("#alertStatusDiv").html("<h4 class='headingColorStyling m-0' style='font-size:15px;'>ALERT STATUS</h4>");          
	if(result != null && result.length > 0){  
		var length = result.length;
		length = length - 1;
		var str='';  
		str+='<div class="col-md-12 col-xs-12 col-sm-12">';
			str+='<ul class="nav nav-tabs alertCommentUl" role="tablist">';  
			for(var i in result)
			{
			   if(result[i].currentSts == result[i].status)  
			   {  
					str+='<li class="m_top10" role="presentation"><a class="active" href="#commentStatus'+i+'" aria-controls="commentStatus'+i+'" role="tab" data-toggle="tab"><span>'+result[i].status+'</span><span class="float-right" style="color: #777 !important;"><i class="fas fa-hourglass-half fa-2x"></i></span><br/><span class="color_FF">'+result[i].sublist2[0].date+'</span></a></li>';
				}else{
					str+='<li role="presentation" class="active m_top10"><a href="#commentStatus'+i+'" aria-controls="commentStatus'+i+'" role="tab" data-toggle="tab"><span>'+result[i].status+'</span><span class="float-right" style="color: #777 !important;margin-left: 15px;"><i class="fas fa-check fa-2x"></i></span><br/><span class="color_FF">'+result[i].sublist2[0].date+'<span></a></li>';
				}        
				
			}
			str+='</ul>';
			str+='<div class="tab-content alertComment">';
				for(var i in result)
				{
				   if(result[i].currentSts == result[i].status)  
					{
						str+='<div role="tabpanel" class="tab-pane active" id="commentStatus'+i+'">';
					}else{
						str+='<div role="tabpanel" class="tab-pane " id="commentStatus'+i+'">';
					}
					for(var j in result[i].sublist2)
					{
						str+='<div class="row m_top10">';
							str+='<div class="col-md-2 col-xs-12 col-sm-2">';
								var date = result[i].sublist2[j].date      
								var dateArr = date.split("-");
								var year = dateArr[0];  
								var month = dateArr[1];
								var day = dateArr[2];
								str+='<table class="table tableCalendar">';
									str+='<tr>';
										str+='<td colspan="2">';
											str+='<h3>'+day+'</h3>';
										str+='</td>';
									str+='</tr>';
									str+='<tr>';
										str+='<td>'+getMonth(month)+'</td>';        
										str+='<td>'+year+'</td>';
									str+='</tr>';
								str+='</table>';
							str+='</div>';
							str+='<div class="col-md-10 col-xs-12 col-sm-10" style="padding-left:0px;">';
								str+='<ul class="alertStatusTracking">';
									str+='<li>';  
										str+='<div class="arrow_box_left" style="background: #f5f3f8 none repeat scroll 0 0 !important;">';
										for(var k in result[i].sublist2[j].sublist)
										{	
											str+='<div>';
												str+='<p><span style="color:#A286C0;font-size:13px;">COMMENT SOURCE&nbsp;&nbsp;:&nbsp;</span>';
												for(var l in result[i].sublist2[j].sublist[k])
												{
													str+='&nbsp;&nbsp;<span class="glyphicon glyphicon-user"></span> <span>'+result[i].sublist2[j].sublist[k][l].cadreName+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 18px;">|</span>';
												}   
												str+='&nbsp;&nbsp;&nbsp;&nbsp; <small style="font-size:11px">'+result[i].sublist2[j].sublist[k][0].timeString+'</small>';
												str+='</p>';  
												str+='<p><span style="color:#A286C0;font-size:13px;">COMMENT:</span><br>';
												str+='<p class="m_top10">'+result[i].sublist2[j].sublist[k][0].comment+'</p>';
												if(result[i].sublist2[j].sublist[k][0].docList != null && result[i].sublist2[j].sublist[k][0].docList.length > 0){
													str+='<p><span style="color:#A286C0;font-size:13px;">DOCUMENTS:</span><br>';
													str+='<ul>';
													for(var t in result[i].sublist2[j].sublist[k][0].docList){
														docName = result[i].sublist2[j].sublist[k][0].docList[t].name;
														extName = docName.split("/");  
														str+='<li id="document'+result[i].id+'"><a href="/Reports/'+result[i].sublist2[j].sublist[k][0].docList[t].name+'" target="_blank">'+extName[1]+'</a></li>';
													}
													str+='</ul>';    
												}
												str+='<p><span class="float-right" style="color:#A286C0;font-size:13px;">UPDATED BY: '+result[i].sublist2[j].sublist[k][0].userName+'</span></p>';
												str+='<hr style="border-color:#a792d2 -moz-use-text-color -moz-use-text-color;"/>';
											str+='</div>';   
										}
										str+='</div>';    
									str+='</li>';
								str+='</ul>';
							str+='</div>';
						str+='</div>';
					}           
				str+='</div>';
				}
			str+='</div>';
		str+='</div>';
		$("#alertCommentsDiv").html(str);
	}else{
		var str = '';
		var statusArr = {"1":"Pending","2":"Notified","3":"Action In Progess","4":"Completed","5":"Unable To Resolve","6":"Action Not Required","7":"Duplicate"};            
		str+='<div class="col-md-12 col-xs-12 col-sm-12">';
		str+='<ul class="nav nav-tabs alertCommentUl" role="tablist">';
		for(var i = 1 ; i <= 7 ; i++){
			if(alertStatus == statusArr[i]){
				str+='<li class="m_top10" role="presentation" style="pointer-events: none;"><a class="active" href="#commentStatus'+i+'" aria-controls="commentStatus'+i+'" role="tab" data-toggle="tab">'+statusArr[i]+'<span><i class="fas fa-check fa-2x"></i></span><br/></a></li>';
			}else{
				str+='<li class="m_top10" role="presentation" style="pointer-events: none;"><a href="#commentStatus'+i+'" aria-controls="commentStatus'+i+'" role="tab" data-toggle="tab">'+statusArr[i]+'<br/></a></li>';
			}
		}
		str+='</ul>';       
		str+='<div class="tab-content alertComment">';  
		$("#alertCommentsDiv").html(str);       
	}
}
function getVerificationDtls(alertId){ 
	var json ={
		"alertId" :alertId
	}
	$.ajax({
		url: "getAlertVerificationDetails",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			$("#converSationDtlsDivId").html(' ');
			buildAlertVerificationStatusRlst(result);
		},
		failure: function(xhr) {
			return xhr;
		}
	});
}
function buildAlertVerificationStatusRlst(result){
	var str = '';
	if(result.conversationList != null && result.conversationList.length > 0){
		$("#alertVerificationDiv").html("<h4 class='verifyHeadingColorStyling m-0' style='font-size:15px;'>VERIFICATION STATUS-"+result.actionTypeStatus+"</h4>");  
		for(var i in result.conversationList){
			str+='<p class="text-capital panelTitleFont m_top20 verifyHeadingColorStyling m-0" style="font-size:12px;">'+result.conversationList[i].heading+'</p>';  
			if(result.conversationList[i].comments != null && result.conversationList[i].comments.length > 0){
				str+='<p class="m-0" style="border: 1px solid rgb(211, 211, 211); padding: 6px;">'+result.conversationList[i].comments+'</p>';     
			}
			var documentList = result.conversationList[i].documentList;
			if(documentList != null && documentList.length > 0){
				str+='<p style="font-weight:bold;font-size:12px;" class="text-capital m_top10 panelTitleFont headingColorStyling m-0">Attachments</p>';
				str+='<ul class="attachmentsBlock">';
				var order = 0;
				for(var k in documentList){
					order = order+1;
					var fullName = documentList[k];
					var nameArr = fullName.split(".");
					var type = nameArr[1];  
					var orderStr='';
					if(k<9){
						orderStr ="0"+order;
					}else{
						orderStr = order;  
					}
					var attachment = orderStr+'&nbspAttachment.'+type;
					str+='<li id="showAlertVerificationPdfId" attr_filePath="'+fullName+'" style="cursor:pointer;"><i class="glyphicon glyphicon-paperclip"></i><span class="border"> '+attachment+' </span></li>';
				}
				str+='</ul>';
			}
			if(result.conversationList[i].name != null && result.conversationList[i].name.length > 0){
				str+='<p class="text-right m-0" style="color:#7155D6;font-size:12px;">Created By:'+result.conversationList[i].name+'('+result.conversationList[i].updateTime+'&nbsp'+result.conversationList[i].time+')</p>';     
			}  
		}
		str+='<hr class="m_top10" style="border-top: 1px solid #ccc;">';
		$("#alertVerificationDtlsDiv").html(str);
	}
}
function getTotalArticledetails(articleId){
	$("#myModalShowNew").modal('show');
	$("#myModalShowNewId").html('<div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div>');
	var url = window.location.href;
	  var wurl = url.substr(0,(url.indexOf(".com")+4));
	  if(wurl.length == 3)
	  wurl = url.substr(0,(url.indexOf(".in")+3));
	//var wurl="http://mytdp.com";
	  $.ajax({       
		  type : 'GET',      
		  url: wurl+"/CommunityNewsPortal/webservice/getArticlesFullDetails/"+articleId+""
		  //url: "http://mytdp.com/CommunityNewsPortal/webservice/getArticlesFullDetails/"+articleId+""          
		  //url: "http://localhost:8080/CommunityNewsPortal/webservice/getArticlesFullDetails/"+articleId+""     
	}).then(function(results){
		var obj = ["","State","District","Constituency","Parliament","Mandal","Panchayat","Village","CORP-GMC","Ward","NATIONAL","INTERNATIONAL","MUNICIPALITY"];
			var result = results[0];
			var str = '';
				str+='<div class="modal-header">';
					str+='<h4 class="modal-title" id="myModalLabel">';
						str+='<button type="button" class="close close_btn_stl1 closeSecondModal" data-dismiss="modal"><i class="far fa-times-circle"></i></button>';
						str+='<p class="mb-0" style="height:40px;" id="mdlArtclTtl">'+result.articleTitle+'</p>';
					str+='</h4>';
				str+='</div>';
				str+='<div class="modal-body">';
					str+='<div class="row">';
						str+='<div class="col-md-12 col-xs-12 col-sm-12">';
							str+='<p class="mb-0 text-italic font-16" id="mdlArtclDesc"><i>Edition Source :'+result.editionSource+' ['+result.articleInsertedTime+' ]</i></p>';
							str+='<img class="mainImage"  src="http://mytdp.com/NewsReaderImages/'+result.imageURL+'" style="display:block;margin:auto;border:1px solid #ddd;width:100%" alt="Img Title"/>';
						str+='</div>';
						str+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">';
							str+='<h4 class="card-title text-success">Description</h4>';
							str+='<p class="m-0 f_14">'+result.description+'</p>';
						str+='</div>';
						str+='<div class="col-md-12 col-xs-12 col-sm-12">';
						if( result.subList != null && result.subList.length > 0){
							for(var i in result.subList){
								/* Candidate*/
								str+='<div class="row m_top10">';
									str+='<div class="col-md-6 col-xs-12 col-sm-12">';
										str+='<div class="card panelArticleGroup">';
											str+='<div class="card-header cardHeaderStl">';
												str+='<h5 class="card-title mb-0">FROM WHOM</h5>';
											str+='</div>';
											str+='<div class="card-body">';
											/* From Table*/
											if(result.subList[i].fromList != null && result.subList[i].fromList.length > 0){
												for( var j in result.subList[i].fromList){
													str+='<table class="table table-bordered m_top10">';
														str+='<tr>';
															if( result.subList[i].fromList[j].organizationName != null && $.trim(result.subList[i].fromList[j].organizationName).length > 0 ){
																str+='<td><img class="img-circle" src="newCoreDashBoard/img/'+result.subList[i].fromList[j].organizationName+'.png" style="width:30px;height:30px;" onerror="setDefaultImage(this);"/> '+result.subList[i].fromList[j].organizationName+'</td>';
															}
															str+='<td><img class="img-circle" src="images/'+result.subList[i].fromList[j].benefit+'.png" style="width:20px;height:20px;" alt=""/> '+result.subList[i].fromList[j].benefit+'</td>';
														str+='</tr>';
														str+='<tr>';
															str+='<td colspan="2">';
																var candidataExist = false;
																if( result.subList[i].fromList[j].candidateName != null && $.trim(result.subList[i].fromList[j].candidateName).length > 0 ){
																	candidataExist = true; 
																	str+=''+result.subList[i].fromList[j].candidateName;
																}
																if( result.subList[i].fromList[j].designation != null && $.trim(result.subList[i].fromList[j].designation).length > 0 ){
																	candidataExist = true; 
																	str+=' ('+result.subList[i].fromList[j].designation + ")";
																}
																if(!candidataExist){
																	str+=' - ';
																}
															str+='</td>';
														str+='</tr>';
														str+='<tr>';
															str+='<td colspan="2">';
																if(result.subList[i].fromList[j].impactLevel != null && $.trim(result.subList[i].fromList[j].impactLevel).length > 0){
																	str+='<p class="m-0">Impact Level : '+result.subList[i].fromList[j].impactLevel+'</p>';	
																}else{ 
																	str+='<p class="m-0">Impact Level : - </p>';	
																}
																if(result.subList[i].fromList[j].categories != null && $.trim(result.subList[i].fromList[j].categories).length > 0){
																	str+='<p class="m-0">Category : '+result.subList[i].fromList[j].categories+'</p>';	
																}else{ 
																	str+='<p class="m-0">Category : - </p>';	
																}
																if(result.subList[i].fromList[j].newsActivity != null && $.trim(result.subList[i].fromList[j].newsActivity).length > 0){
																	str+='<p class="m-0">News Activity : '+result.subList[i].fromList[j].newsActivity+' </p>';
																}else{ 
																	str+='<p class="m-0">News Activity : - </p>';	
																}
																if(result.subList[i].fromList[j].newsType != null && $.trim(result.subList[i].fromList[j].newsType).length > 0){
																	str+='<p class="m-0">News type : '+result.subList[i].fromList[j].newsType+' </p>';
																}else{ 
																	str+='<p class="m-0">News type : - </p>';	
																}
																if( result.subList[i].fromList[j].newsType != null && result.subList[i].fromList[j].newsType == "Problems"){
																	if(result.subList[i].fromList[j].newsRelated != null && $.trim(result.subList[i].fromList[j].newsRelated).length > 0){
																		str+='<p class="m-0">News Related : '+result.subList[i].fromList[j].newsRelated+' </p>';
																	}else{ 
																		str+='<p class="m-0">News Related : - </p>';	
																	}
																	if(result.subList[i].fromList[j].priority != null && $.trim(result.subList[i].fromList[j].priority).length > 0){
																		str+='<p class="m-0">Priority : '+result.subList[i].fromList[j].priority+' </p>';
																	}else{ 
																		str+='<p class="m-0">Priority : - </p>';	
																	}
																	if(result.subList[i].fromList[j].solution != null && $.trim(result.subList[i].fromList[j].solution).length > 0){
																		str+='<p class="m-0">Solution : '+result.subList[i].fromList[j].solution+' </p>';
																	}else{ 
																		str+='<p class="m-0">Solution : - </p>';	
																	}
																}
															str+='</td>';
														str+='</tr>';
													str+='</table>';
												}
											}
										str+='</div>';//card-body
									str+='</div>';//card
								str+='</div>';//colmd6
								str+='<div class="col-md-6 col-xs-12  col-sm-12">';
									str+='<div class="card panelArticleGroup">';
										str+='<div class="card-header cardHeaderStl">';
											str+='<h5 class="card-title mb-0">TO WHOM</h5>';
										str+='</div>';
										str+='<div class="card-body">';
											/* TO Table*/
											if(result.subList[i].toList != null && result.subList[i].toList.length > 0){
												for( var j in result.subList[i].toList){
													str+='<table class="table table-bordered m_top10">';
														str+='<tr>';
															if( result.subList[i].toList[j].organizationName != null && $.trim(result.subList[i].toList[j].organizationName).length > 0 ){
																str+='<td><img class="img-circle" src="newCoreDashBoard/img/'+result.subList[i].toList[j].organizationName+'.png" style="width:30px;height:30px;" onerror="setDefaultImage(this);"/> '+result.subList[i].toList[j].organizationName+'</td>';
															}else{
																str+='<td> - </td>';
															}
															str+='<td><img class="img-circle" src="images/'+result.subList[i].toList[j].benefit+'.png" style="width:20px;height:20px;" alt=""/> '+result.subList[i].toList[j].benefit+'</td>';
														str+='</tr>';
														str+='<tr>';
															str+='<td colspan="2">';
																var candidataExist = false;
																if( result.subList[i].toList[j].candidateName != null && $.trim(result.subList[i].toList[j].candidateName).length > 0 ){
																	candidataExist = true; 
																	str+=''+result.subList[i].toList[j].candidateName;
																}
																if( result.subList[i].toList[j].designation != null && $.trim(result.subList[i].toList[j].designation).length > 0 ){
																	candidataExist = true; 
																	str+=' ('+result.subList[i].toList[j].designation + ")";
																}
																if(!candidataExist){
																	str+=' - ';
																}
															str+='</td>';
														str+='</tr>';
														str+='<tr>';
															str+='<td colspan="2">';
																		
																if(result.subList[i].toList[j].impactLevel != null && $.trim(result.subList[i].toList[j].impactLevel).length > 0){
																  str+='<p class="m-0">Impact Level : '+result.subList[i].toList[j].impactLevel+'</p>';	
																}else{ 
																  str+='<p class="m-0">Impact Level : - </p>';	
																}
																	
																if(result.subList[i].toList[j].categories != null && $.trim(result.subList[i].toList[j].categories).length > 0){
																  str+='<p class="m-0">Category : '+result.subList[i].toList[j].categories+'</p>';	
																}else{ 
																  str+='<p class="m-0">Category : - </p>';	
																}
																if(result.subList[i].toList[j].newsActivity != null && $.trim(result.subList[i].toList[j].newsActivity).length > 0){
																  str+='<p class="m-0">News Activity : '+result.subList[i].toList[j].newsActivity+' </p>';
																}else{ 
																  str+='<p class="m-0">News Activity : - </p>';	
																}
																if(result.subList[i].toList[j].newsType != null && $.trim(result.subList[i].toList[j].newsType).length > 0){
																  str+='<p class="m-0">News type : '+result.subList[i].toList[j].newsType+' </p>';
																}else{ 
																  str+='<p class="m-0">News type : - </p>';	
																}
																if( result.subList[i].toList[j].newsType != null && result.subList[i].toList[j].newsType == "Problems"){
																	
																	if(result.subList[i].toList[j].newsRelated != null && $.trim(result.subList[i].toList[j].newsRelated).length > 0){
																	  str+='<p class="m-0">News Related : '+result.subList[i].toList[j].newsRelated+' </p>';
																	}else{ 
																	  str+='<p class="m-0">News Related : - </p>';	
																	}
																	if(result.subList[i].toList[j].priority != null && $.trim(result.subList[i].toList[j].priority).length > 0){
																	  str+='<p class="m-0">Priority : '+result.subList[i].toList[j].priority+' </p>';
																	}else{ 
																	  str+='<p class="m-0">Priority : - </p>';	
																	}
																	if(result.subList[i].toList[j].solution != null && $.trim(result.subList[i].toList[j].solution).length > 0){
																	  str+='<p class="m-0">Solution : '+result.subList[i].toList[j].solution+' </p>';
																	}else{ 
																	  str+='<p class="m-0">Solution : - </p>';	
																	}
																}
															str+='</td>';
														str+='</tr>';
													str+='</table>';
												}
											}
													
										str+='</div>';//card body
									str+='</div>';//card
								str+='</div>';//colmd6
										
							str+='</div>';//row
						}
					}
							
				str+='</div>';//colmd12
			str+='</div>';//row
			/* Article Scope Location */
			str+='<div class="col-md-12 col-xs-12 col-sm-12">';
				str+='<div class="card panelArticleGroup mt-2">';
					str+='<div class="card-header cardHeaderStl">';
						str+='<h5 class="card-title mb-0">LOCATION DETAILS</h5>';
					str+='</div>';
					str+='<div class="card-body">';
						str+='<table class="table table-condensed">';
							str+='<tr>';
								str+='<td>Impact Scope : </td>';
								if(result.impactScopeId!=null){
									str+='<td>'+obj[result.impactScopeId]+'</td>';
								}else{
									str+='<td> - </td>';
								}
							str+='</tr>';
							str+='<tr>';
								str+='<td>Location : </td>';
								if(result.scopeLocation!=null){
									str+='<td>'+result.scopeLocation+'</td>';
								}else{
									str+='<td> - </td>';
								}
							str+='</tr>';
						str+='</table>';       
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
						
		str+='<div class="row">';
		/*Lnking*/
			str+='<div class="col-md-6">';
				str+='<div class="card panelArticleGroup m-3">';
					str+='<div class="card-header cardHeaderStl">';
						str+='<h5 class="card-title mb-0">LINKED ARTICLES</h5>';
					str+='</div>';
					str+='<div class="card-body">';
						 if( result.linkedList != null && result.linkedList.length > 1){
						str+='<div class="row">';
							for( var i in result.linkedList){
								if(result.linkedList[i].articleId !=articleId ){
									str+='<div class="col-md-4" style="margin-top:5px;">';
										str+='<img  class="thumbnail img-responsive linkedArticlesClickId" src="http://mytdp.com/NewsReaderImages/'+result.linkedList[i].imageURL+'" style="display:block;margin:auto;height:90px;cursor:pointer"/>';
									str+='</div>';
								}
							}
						str+='</div>';
						}else{
							str+="<h5> No Linked Articles Available </h5>";
						}
						
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';  
		$("#myModalShowNewId").html(str);
	});    
}
function getMonth(month){
	if(month=="01"){
		return "Jan"
	}else if(month=="02"){
		return "Feb"
	}else if(month=="03"){
		return "Mar"
	}else if(month=="04"){
		return "Apr"
	}else if(month=="05"){
		return "May"
	}else if(month=="06"){
		return "Jun"
	}else if(month=="07"){
		return "Jul"
	}else if(month=="08"){
		return "Aug"
	}else if(month=="09"){
		return "Sep"
	}else if(month=="10"){
		return "Oct"
	}else if(month=="11"){
		return "Nov"
	}else if(month=="12"){  
		return "Dec"
	}  
}
$(document).on("click",".descAlertCls",function(){
	
	var alertId = $(this).attr("attr_alert_id");
	var alertStatus = $(this).attr("attr_alert_status");
	$(".modalScroll").animate({
		scrollTop: $(".scrollTopDivId").offset().top},
	'slow');
	alertDataInfo("meetingWiseAttendanceDtsDivId",alertId,alertStatus);
});
$(document).on("click",".articleImgDetailsCls",function(){
	var articleId= $(this).attr("attr_articleId");
	getTotalArticledetails(articleId);
});
/*=== inner clicks End === */