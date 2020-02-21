	var url = window.location.href;
	var wurl = url.substr(0,(url.indexOf(".com")+4));
	if(wurl.length == 3)
		wurl = url.substr(0,(url.indexOf(".in")+3));
	
	var globalEnrollementyearIdArr=[];
	var spinner = '<div class="row"><div class="col"><div class="d2d-loader"><div class="loader"></div><img src="Core/images/LOADER.png"/></div></div></div>';
	var globalEnrollementYearIdsForAlert = 0;
    /* Setting script code start */
	 var impactLevelObj =  {"0":"All","1":"State","2":"District","4":"PARLIAMENT CONSTITUENCY","3":"Constituency","8":"CORP-GMC","5":"Mandal/MUNICIPALITY","7":"Village/ward/PANCHAYAT"};	
	 var localLevelObj =  {"2":"State","3":"District","4":"Constituency","5":"Mandal/MUNICIPALITY","6":"Village/ward/HAMLET"};	
	 
	 
	 var globalIssueCategoryArr=[];
	 var customStartDateAlert = moment().startOf('month').format('DD/MM/YYYY');
	 var customEndDateAlert = moment().endOf('month').format('DD/MM/YYYY');
	 var globalStateId=1;
	  var globalAlertStatusArr = ["1","2","3","4"];
	  var globalImpactScopeArr = [];
	  var globalDistrictImpactLevelScopeArr = [];
	  var globalPaliamentImpactLevelScopeArr = [];
	  var globalCorpGhmcImpactScopeSArr = [];
	  var globalConstituencyImpactScopeArr = [];
	  
	  
	//called in jsp page
	setTimeout(function(){ 
			defaultAlertCalls();
	}, 1000);	

	
	$("#dateRangeIdForAlert").daterangepicker({
		opens: 'left',
	    startDate: customStartDateAlert,
        endDate: customEndDateAlert,
		locale: {
		  format: 'DD/MM/YYYY'
		},
		ranges: {
			'Today': [moment(), moment()],
			'YesterDay': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
		    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		    'Last 3 Months': [moment().subtract(3, 'month'), moment()],
		    'Last 6 Months': [moment().subtract(6, 'month'), moment()],
			'This Year': [moment().startOf('Year'), moment()],
		    'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
            'Overall' : [moment().subtract(30, 'years').startOf('year'), moment()]
        }
	})
	
	var dates= $("#dateRangeIdForAlert").val();
	$("#alertDateHeadingId").html(customStartDateAlert+" - "+customEndDateAlert);
	$('#dateRangeIdForAlert').on('apply.daterangepicker', function(ev, picker) {
	   $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str",$("#alertCategoryTypeHiddenId").attr("attr_alert_static_category_id_string"));
	   customStartDateAlert = picker.startDate.format('DD/MM/YYYY');
	   customEndDateAlert = picker.endDate.format('DD/MM/YYYY');
	   $("#alertDateHeadingId").html(customStartDateAlert+"-"+customEndDateAlert);
	  defaultAlertCalls(); 
	});
	
function alertsClickActions()
{
	
		 
		$(document).on("click",".constituencyUl li",function(){
				$(".constituencyUl li").removeClass("active");
				$(this).addClass("active");
		});
		$(document).on("click",".districtUl li",function(){
				$(".districtUl li").removeClass("active");
				$(this).addClass("active");
		});
		$(document).on("click",".basicAlertSetClose",function(){
			$(this).closest(".basicAlertBlockDropDown").hide();
		});
		$(document).on("click",".articleImgDetailsCls",function(){
			var articleId= $(this).attr("attr_articleId");
			getTotalArticledetails(articleId);
		});

		$(document).on("click",".prgrmCmmttAndOthrCls",function(){
			$("#tourDocumentBodyId").html("");           
			$("#tourDocumentBodyId").html(spinner);           
			$("#tourDocumentId").modal("show");
			var totalAlertCnt = $(this).attr("attr_alert_count");
			$("#alertCntTitId").html("TOTAL ALERTS - "+totalAlertCnt);
			var cadreId = $(this).attr("attr_cadre_id");
			var statusId = $(this).attr("attr_status_id");
			var selectType = $(this).attr("attr_selected_type");
			
			var alertId = 1;
			var editionId = 0;
			
			var districtId = $("#districtSelectBoxId").val();
			var alertStatusArr = [];
				if(statusId == 0){
				alertStatusArr = globalAlertStatusArr;
				}else{
				  alertStatusArr.push(statusId);	
				}
			var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
			
			
			var json={ 
				fromDateStr			:customStartDateAlert,       
				toDateStr		    :customEndDateAlert,
				stateId				:globalStateId,
				scopeIdList			:globalImpactScopeArr,
				activityMemberId	:44,
				cadreId				:cadreId,
				alertStatusIds		:alertStatusArr,
				resultType			:selectType,
				alertTypeId			:alertId,
				editionTypeId		:editionId,
				districtId			:districtId,
				alertCategoryIds	:alertCategoryArr
			};
			
		 $.ajax({
				url: "getAlertDetailsTdpCadreWise",
				data: JSON.stringify(json),
				type: "POST",
				dataType: 'json', 
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(result) {
					if(result != null && result.length > 0){
						buildAlertDtls(result);    
					}
				},
				failure: function(xhr) {
					return xhr;
				}
				});
	 	}); 	
		$(document).on("click",".pubRepDtlsCls",function(){
			$("#tourDocumentId").find(".close").addClass("modalClose");
			$("#tourDocumentId").find(".modal-footer .btn").addClass("modalClose");
			$("#tourDocumentBodyId").html("");           
			$("#tourDocumentBodyId").html(spinner);           
			$("#tourDocumentId").modal("show");
			var publicRepresentativeTypeId = $(this).attr("attr_pub_rep_type_id");
			var cadreId = $(this).attr("attr_cadre_id");
			var statusId = $(this).attr("attr_status_id");
			var alertCount = $(this).attr("attr_alert_count");
			$("#alertCntTitId").html("TOTAL ALERTS-"+alertCount);  
			var alertId = 1;
			var editionId = 0;
			var alertStatusArr = [];
			if(statusId == 0){
			  alertStatusArr = globalAlertStatusArr;	
			}else{
			  alertStatusArr.push(statusId);	
			}
			var districtId = $("#districtSelectBoxId").val();
			var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
			
			
			var json={  
				fromDateStr			:customStartDateAlert,       
				toDateStr		    :customEndDateAlert,
				stateId				:1,
				scopeIdList			:globalImpactScopeArr,
				activityMemberId	:44,
				publicRepresentativeTypeId:publicRepresentativeTypeId,
				cadreId				:cadreId,
				alertStatusIds		:alertStatusArr,
				alertTypeId			:alertId,
				editionIds			:editionId,
				districtId			:districtId,
				alertCategoryIds	:alertCategoryArr
			};
			 $.ajax({
				url: "getAlertDtlsForPubRep",
				data: JSON.stringify(json),
				type: "POST",
				dataType: 'json', 
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(result) {
					if(result != null && result.length > 0){
						buildAlertDtls(result);    
					}else{
						
					}
				},
				failure: function(xhr) {
					return xhr;
				}
			});
			  
		});  
		$(document).on("click",".commitLvlCls",function(){
			var commitLvlIdArr = [];
			var commitLvlVal = $("input:radio[name=commitLvlName]:checked").val();
			if(commitLvlVal == "All"){
				commitLvlIdArr.push(10);
				commitLvlIdArr.push(11);
				commitLvlIdArr.push(5);
				commitLvlIdArr.push(7);
				commitLvlIdArr.push(6);
				commitLvlIdArr.push(8);
				commitLvlIdArr.push(12);
				getTotalAlertGroupByPubRepThenStatus("Party Committee",0,"alertDetailsDivId",commitLvlIdArr,"");
			}else if(commitLvlVal == "State"){
				 commitLvlIdArr.push(10);
				 getTotalAlertGroupByPubRepThenStatus("Party Committee",0,"alertDetailsDivId",commitLvlIdArr,"");
			}else if(commitLvlVal == "District"){
				commitLvlIdArr.push(11);
				getTotalAlertGroupByPubRepThenStatus("Party Committee",0,"alertDetailsDivId",commitLvlIdArr,"");
			}else if(commitLvlVal == "Mandal"){
				commitLvlIdArr.push(5);
				commitLvlIdArr.push(7);
				getTotalAlertGroupByPubRepThenStatus("Party Committee",0,"alertDetailsDivId",commitLvlIdArr,"");
			}else if(commitLvlVal == "Village"){
				commitLvlIdArr.push(6);
				commitLvlIdArr.push(8);    
				getTotalAlertGroupByPubRepThenStatus("Party Committee",0,"alertDetailsDivId",commitLvlIdArr,"");
			}else if(commitLvlVal == "Central"){
				commitLvlIdArr.push(12);    
				getTotalAlertGroupByPubRepThenStatus("Party Committee",0,"alertDetailsDivId",commitLvlIdArr,"");	
			}
		});
		$(document).on("click",".commettDtlsCls",function(){
			$("#tourDocumentId").find(".close").addClass("modalClose");
			$("#tourDocumentId").find(".modal-footer .btn").addClass("modalClose");
			
			$("#tourDocumentBodyId").html("");           
			$("#tourDocumentBodyId").html(spinner);           
			$("#tourDocumentId").modal("show");  
			var alertCount = $(this).attr("attr_alert_count");
			$("#alertCntTitId").html("TOTAL ALERTS-"+alertCount);
			var cadreId = $(this).attr("attr_cadre_id");
			var designationId = $(this).attr("attr_designation_id");
			var commitTypeId = $(this).attr("attr_commit_id");
			var statusId = $(this).attr("attr_status_id");
			var commitLvlIdArr = [];
			var commitLvlVal = $("input:radio[name=commitLvlName]:checked").val();
			if(commitLvlVal == "All"){
				commitLvlIdArr.push(10);
				commitLvlIdArr.push(11);
				commitLvlIdArr.push(5);
				commitLvlIdArr.push(7);
				commitLvlIdArr.push(6);
				commitLvlIdArr.push(8);
				commitLvlIdArr.push(12);
			}else if(commitLvlVal == "State"){
				 commitLvlIdArr.push(10);
			}else if(commitLvlVal == "District"){
				commitLvlIdArr.push(11);
			}else if(commitLvlVal == "Mandal"){
				commitLvlIdArr.push(5);
				commitLvlIdArr.push(7);
			}else if(commitLvlVal == "Village"){
				commitLvlIdArr.push(6);
				commitLvlIdArr.push(8);
			}else if(commitLvlVal == "Central"){
				commitLvlIdArr.push(12);	
			} 
			getAlertDtlsAssignedByPartyCommite(commitTypeId,designationId,commitLvlIdArr,cadreId,statusId);  
			
		});
		$(document).on("click",".expandIcon",function(){
			if($(this).hasClass("glyphicon-minus") == true){
				$(".expandIcon").addClass("glyphicon-plus").removeClass("glyphicon-minus");
				$(this).closest("tr").next("tr.subElement").hide();
			}else{
				var divId = $(this).attr("attr_div_id");
				var selectTypeId = $(this).attr("attr_selected_type");
				var designationId = $(this).attr("attr_designation_id");
				var commitLvlIdArr = [];
				var commitLvlVal = $("input:radio[name=commitLvlName]:checked").val();
				if(commitLvlVal == "All"){
					commitLvlIdArr.push(10);
					commitLvlIdArr.push(11);
					commitLvlIdArr.push(5);
					commitLvlIdArr.push(7);
					commitLvlIdArr.push(6);
					commitLvlIdArr.push(8);
					commitLvlIdArr.push(12);
				}else if(commitLvlVal == "State"){
					 commitLvlIdArr.push(10);
				}else if(commitLvlVal == "District"){
					commitLvlIdArr.push(11);
				}else if(commitLvlVal == "Mandal"){
					commitLvlIdArr.push(5);
					commitLvlIdArr.push(7);
				}else if(commitLvlVal == "Village"){
					commitLvlIdArr.push(6);
					commitLvlIdArr.push(8);
				}else if(commitLvlVal == "Central")  {
				  commitLvlIdArr.push(12);	
				}
				if(selectTypeId == "Party Committee"){    
					getTotalAlertGroupByPubRepThenStatusBellow(commitLvlIdArr,designationId,divId,selectTypeId);
					$("#"+divId).html(spinner);  
				}    
				if(selectTypeId == "Public Representative"){           
					getTotalAlertGroupByPubRepThenStatus(selectTypeId,designationId,divId,[0],"bellow");   
				}
				
				$(".expandIcon").addClass("glyphicon-plus").removeClass("glyphicon-minus");
				$(this).removeClass("glyphicon-plus").addClass("glyphicon-minus");
				$(".subElement").hide();
				$(this).closest("tr").next("tr.subElement").show();
			}  
		});
		$(document).on("click",".expandIcon2",function(){     
			if($(this).hasClass("glyphicon-minus") == true){
				$(".expandIcon2").addClass("glyphicon-plus").removeClass("glyphicon-minus");
				$(this).closest("tr").next("tr.subElement_").hide();
			}else{
				var designationId = $(this).attr("attr_designation_id");
				var commitTypeId = $(this).attr("attr_commit_id");
				var selectionType = $(this).attr("attr_selected_type");
				var divId = $(this).attr("attr_div_id");
				var commitLvlIdArr = [];
				var commitLvlVal = $("input:radio[name=commitLvlName]:checked").val();
				if(commitLvlVal == "All"){
					commitLvlIdArr.push(10);
					commitLvlIdArr.push(11);
					commitLvlIdArr.push(5);
					commitLvlIdArr.push(7);
					commitLvlIdArr.push(6);
					commitLvlIdArr.push(8);
					commitLvlIdArr.push(12);
				}else if(commitLvlVal == "State"){
					 commitLvlIdArr.push(10);
				}else if(commitLvlVal == "District"){
					commitLvlIdArr.push(11);
				}else if(commitLvlVal == "Mandal"){
					commitLvlIdArr.push(5);
					commitLvlIdArr.push(7);
				}else if(commitLvlVal == "Village"){
					commitLvlIdArr.push(6);
					commitLvlIdArr.push(8);
				}else if(commitLvlVal == "Central"){
				  commitLvlIdArr.push(12);	
				}
				getMemForPartyCommitDesg(commitTypeId,designationId,commitLvlIdArr,selectionType,divId);
				$("#"+divId).html(spinner);
				$(".expandIcon2").addClass("glyphicon-plus").removeClass("glyphicon-minus");   
				$(this).removeClass("glyphicon-plus").addClass("glyphicon-minus");
				$(".subElement_").hide();    
				$(this).closest("tr").next("tr.subElement_").show();    
			}             
		});
		$(document).on("click",".alertAssignCls",function(){
				   var groupAssignType = $(this).html().split("-")[0].trim();
				  if(groupAssignType == "Public Representative"){
					  getTotalAlertGroupByPubRepThenStatus(groupAssignType,0,"alertDetailsDivId",[0],"")
				  }else if(groupAssignType == "Party Committee"){
					  var commitLvlIdArr = [];
					  commitLvlIdArr.push(10);
					  commitLvlIdArr.push(11);
					  commitLvlIdArr.push(5);
					  commitLvlIdArr.push(7);
					  commitLvlIdArr.push(6);
					  commitLvlIdArr.push(8);    
					  commitLvlIdArr.push(12);    
					  getTotalAlertGroupByPubRepThenStatus(groupAssignType,0,"alertDetailsDivId",commitLvlIdArr,"");  
				  }else if(groupAssignType == "Program Committee"){
					  getOtherAndPrgrmCmmtteeTypeAlertCndtDtls(groupAssignType,"alertDetailsDivId")
				  }else if(groupAssignType == "Others"){
					  getOtherAndPrgrmCmmtteeTypeAlertCndtDtls(groupAssignType,"alertDetailsDivId");
				  }
			});
			
		$(document).on("click",".alertModalCloseCls",function(){
			 $(".commitLvlCls").prop('checked',false);
			 $("#commitLvlId1").prop('checked',true);
		});		
		$(document).on("click",".descAlertCls",function(){
			$("#cdrModelDivId").find(".close").addClass("modalClose");
			$("#cdrModelDivId").find(".modal-footer .btn").addClass("modalClose");
			$("#tourDocHeadingId").html("");
			$("#cdrModelId").html("");
			$("#alertDestId").html("");
			$("#sourceHeadingId").html("");
			$("#headingNameId").html("");
			$("#alertAttachTitId").html("");
			$("#alertAttachImgId").html("");
			$("#alertInvolvedCandidates").html("");
			$("#alertAssignedCandidates").html("");
			$("#alertCommentsDiv").html("");
			$("#tourDocHeadingId").html("ALERT TITLE <br>");
			$("#alertVerificationDiv").html("");
			$("#alertVerificationDtlsDiv").html("");
			
			$("#alertDocHeadingId").html("");
			$("#alertDocId").html("");
			
			$("#cdrModelDivId").modal("show");
			var alertId = $(this).attr("attr_alert_id");
			var alertStatus = $(this).attr("attr_alert_status");
			getAlertData(alertId);
			getAlertAssignedCandidates(alertId);    
			getAlertStatusCommentsTrackingDetails(alertId,alertStatus);
			getVerificationDtls(alertId);
		});
		$(document).on("click",".modalClose",function(){  
			$(this).removeClass("modalClose");
			setTimeout(function(){
				$("body").addClass("modal-open");
			},1000);
			
		});
		$(document).on("click",".topModalClose",function(){
			setTimeout(function(){
				$('body').addClass("modal-open");
			}, 400);                     
		});
		
		
		
		$(document).on("click",".alertSettingBlock",function(e){
			$(this).closest(".alertsBlock").find(".basicAlertBlockDropDown").toggle();
			e.stopPropagation();
		});
		
	   $(document).on("click",".alertSetClose",function(){
			$(".specialAlertDropDown").hide(); 
		 });
		 
		$(document).on("click","#alertImpactSelectAllId",function(){
			 if ($(this).prop('checked')) {
				$(".alertImpactCheckCls").prop('checked', true);
			} else {
				$(".alertImpactCheckCls").prop('checked', false);
			}
		});
		$(document).on("click",".alertSettingCloseCls",function(){      
			$(".specialAlertDropDown").toggle();                    
		});
		$(document).on("click","#alertImpactScopeSelectAllId",function(){
				if ($(this).prop('checked')) {
					$(".alertImpactCheckCls").prop('checked', true);
				} else {
					$(".alertImpactCheckCls").prop('checked', false);
				}
		});
		$(document).on("click","#alertStatusSelectAllId",function(){
				 if ($(this).prop('checked')) {
					$(".alertStausCls").prop('checked', true);
				} else {
					$(".alertStausCls").prop('checked', false);
				}
		});
		/* $(document).on("click",".alertsShowBody",function(){
			if($(this).text() == 'Click to more')
			{
				$(this).text("Click for less");
				$(".alertsHideBody").addClass("active");
			}else{
				$(this).text("Click to more");
				$(".alertsHideBody").removeClass("active");
			}
		}); */
		$(document).on("click","[alert_overview_col]",function(){
			var id = $(this).attr("alert_overview_col");
			$("[alert_overview_col_body]").hide();
			if($(this).html() == '+')
			{
				$("[alert_overview_col]").html("+");
				$(this).html("-")
				$("[alert_overview_col_body="+id+"]").show();
				
			}else{
				$(this).html("+")
				$("[alert_overview_col_body="+id+"]").hide();
			}
			
			
		});
		$(document).on("click","[alert_overview_col_inner]",function(){
			var id = $(this).attr("alert_overview_col_inner");
			$("[alert_overview_col_inner_body]").hide();
			if($(this).html() == '+')
			{
				$("[alert_overview_col_inner]").html("+");
				$(this).html("-")
				$("[alert_overview_col_inner_body="+id+"]").show();
				
			}else{
				$(this).html("+")
				$("[alert_overview_col_inner_body="+id+"]").hide();
			}
		});
		
		 /* Expend Script start */
	 
}
	
     function getAlertDtlsBasedOnSelection(type){
		//updating attribute
		$("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str",$("#alertCategoryTypeHiddenId").attr("attr_alert_static_category_id_string"));
		
		 if (globalEnrollementyearIdArr != null) {
		    globalEnrollementYearIdsForAlert = globalEnrollementyearIdArr;	 
		 }
		  //Clear arrays
		    globalAlertStatusArr = [];
		    globalImpactScopeArr = [];
		    globalDistrictImpactLevelScopeArr = [];
			globalPaliamentImpactLevelScopeArr = [];
		    globalCorpGhmcImpactScopeSArr = [];
		    globalConstituencyImpactScopeArr = [];
		 $(".alertImpactSettingCls li").each(function() {
		  if($(this).find("input").is(":checked")){
			 var selectionType = $(this).find("input").attr("attr_scope_type").trim();
			 if(selectionType == "State"){
				globalImpactScopeArr.push(1); 
			 }else if(selectionType == "District"){
				globalImpactScopeArr.push(2);
				globalDistrictImpactLevelScopeArr.push(2);
			}else if(selectionType == "Parliament"){
				globalImpactScopeArr.push(4);   
				globalDistrictImpactLevelScopeArr.push(4);
				globalPaliamentImpactLevelScopeArr.push(4);
			}else if(selectionType == "Constituency"){
				globalImpactScopeArr.push(3);
				globalDistrictImpactLevelScopeArr.push(3);
				globalConstituencyImpactScopeArr.push(3);
				globalPaliamentImpactLevelScopeArr.push(3);
			}else if(selectionType == "mandalMuncipality"){
				globalImpactScopeArr.push(5);  
				globalImpactScopeArr.push(12);  
				globalDistrictImpactLevelScopeArr.push(5);  
				globalDistrictImpactLevelScopeArr.push(12); 
				globalConstituencyImpactScopeArr.push(5);				
				globalConstituencyImpactScopeArr.push(12);
				globalPaliamentImpactLevelScopeArr.push(5);
				globalPaliamentImpactLevelScopeArr.push(12);
			}else if(selectionType == "VillageWardPanchayat"){
				globalImpactScopeArr.push(7);  
				globalImpactScopeArr.push(9);	
				globalImpactScopeArr.push(6);	
				globalDistrictImpactLevelScopeArr.push(7);  
				globalDistrictImpactLevelScopeArr.push(9);	
				globalDistrictImpactLevelScopeArr.push(6);
				globalConstituencyImpactScopeArr.push(7);  
				globalConstituencyImpactScopeArr.push(9);	
				globalConstituencyImpactScopeArr.push(6);
				globalPaliamentImpactLevelScopeArr.push(7);
				globalPaliamentImpactLevelScopeArr.push(9);   
				globalPaliamentImpactLevelScopeArr.push(6);             
			}else if(selectionType == "MuncipalityGMC"){
			   globalImpactScopeArr.push(8);
			   globalDistrictImpactLevelScopeArr.push(8);
			   globalCorpGhmcImpactScopeSArr.push(8);
			} 
		  }
	   });
	     //Status Setting
	    $(".alertStatusSettingUl li").each(function() {
		  if($(this).find("input").is(":checked")){
			 var alertStatusId = $(this).find("input").attr("attr_status_id");
		       if(alertStatusId != 0){
				   globalAlertStatusArr.push(alertStatusId);
			   }
		  }
	   });
	    if(globalImpactScopeArr.length == 0){
			alert("Please Select Impact Scope.");
			return;
		}
		 if(globalAlertStatusArr.length == 0){
			alert("Please Select Status.");
			return;
		}
	   if(type == "click"){
		        $(".constituencyUl li").removeClass("active");
				$(".constituencyUl li:first-child").addClass("active");
				$(".districtUl li").removeClass("active");
				$(".districtUl li:first-child").addClass("active");
			    $("#alertTypeHiddenId").attr("attr_alert_id",1);
		        $("#alertEditionTypeHiddenId").attr("attr_alert_edition_id",0);  
				$(".alertComparisonblock").hide();
			    $(".alertImpctLevelBlcock").show();	
			    $(".alertFilterCls li").removeClass("active");
			    $(".alertFilterCls li:nth-child(1)").addClass("active");
			    $(".collapseTblViewCls").removeClass("active");
			    $(".collapseHIghChartViewCls").addClass("active");
	  		    $(".impactLevelCls").attr("attr_level","Overview");
				
				$(".alertLocationDiv").show();
				$("#hiddenLevelTypeId").attr("attr_level_type","impactScopeWise");
				$("#locationAlertsId").prop("checked",false);
                $("#impactAlertsId").prop("checked",true);
				$(".locImptLevelDivCls").show();
				getStateImpactandItsSubLevelAlert("impactScopeWise");
				getDistrictImpactandItsSubLevelAlert("Decending","0","impactScopeWise");
				getParliamentImpactandItsSubLevelAlert("Decending","0","0","impactScopeWise");
				getCorpGMCAlert(0,"impactScopeWise");
				getConstituencyImpactandItsSubLevelAlert("Decending","0","0","impactScopeWise");
				getAssignGroupTypeAlertDtlsByImpactLevelWise(0);
			$(".basicAlertBlockDropDown").hide(); 
		}
	 }
   
	
	function defaultAlertCalls()
	{      
			alertsClickActions();
			$(".constituencyUl li").removeClass("active");
			$(".constituencyUl li:first-child").addClass("active");
			$(".districtUl li").removeClass("active");
			$(".districtUl li:first-child").addClass("active");
			$(".collapseTblViewCls").removeClass("active");
			$(".collapseHIghChartViewCls").addClass("active");
			$(".impactLevelCls").attr("attr_level","Overview");
			$(".alertComparisonblock").hide();
			$(".alertImpctLevelBlcock").show();	
			$(".locImptLevelDivCls").show();
			$("#locationAlertsId").prop("checked",false);
			$("#impactAlertsId").prop("checked",true);
			$("#hiddenLevelTypeId").attr("attr_level_type","impactScopeWise");
			getAlertDtlsBasedOnSelection('default'); 
			
			if(typeId == "status"){
				 $(".alertFilterCls li").removeClass("active");
				 $(".alertFilterCls li:nth-child(2)").addClass("active");
				 $(".locImptLevelDivCls").hide();
				 $(".impactLevelCls").attr("attr_level","Status");
				
				 getStateImpactLevelAlertStatusWise();
				 getTotalAlertGroupByLocationThenStatus("Decending","0");
				 getTotalAlertGroupByLocationThenStatusForParliament("Decending","0","0");
				 getGhmcImpactLevelAlertStatusWise("0");
				 getConstituencyAlertStatusWise("Decending","0","0");
				 getAssignGroupTypeAlertDtlsByImpactLevelWise(0);
			}else{
				$(".alertFilterCls li").removeClass("active");
				$(".alertFilterCls li:nth-child(1)").addClass("active");
				getStateImpactandItsSubLevelAlert("impactScopeWise");
				getDistrictImpactandItsSubLevelAlert("Decending","0","impactScopeWise");
				getParliamentImpactandItsSubLevelAlert("Decending","0","0","impactScopeWise");       
				getCorpGMCAlert(0,"impactScopeWise");
				getConstituencyImpactandItsSubLevelAlert("Decending","0","0","impactScopeWise");
				getAssignGroupTypeAlertDtlsByImpactLevelWise(0);
			}
			
			
		   
	}
	
	$(document).on("click",".activeUlCls li",function(){
		$(this).closest("ul").find("li").removeClass("active");
		$(this).addClass("active");
	});
	function getAlertDetails(optionId)
	{
		var scopeIdsArr = [];
		var option = optionId;
		  $(".alertImpctLevelBlcock").show();	
 		  $(".alertComparisonblock").hide();
		 $(".constituencyUl li").removeClass("active");
	     $(".constituencyUl li:first-child").addClass("active");
		 $(".districtUl li").removeClass("active");
	     $(".districtUl li:first-child").addClass("active");
		 $(".collapseTblViewCls").removeClass("active");
		 $(".collapseHIghChartViewCls").addClass("active");
		if(option == "1"){
			$("#locationAlertsId").prop("checked",false);
            $("#impactAlertsId").prop("checked",true);			
			$(".locImptLevelDivCls").show();
		    $("#hiddenLevelTypeId").attr("attr_level_type","impactScopeWise");
			$(".impactLevelCls").attr("attr_level","Overview");
			getStateImpactandItsSubLevelAlert("impactScopeWise");
			getDistrictImpactandItsSubLevelAlert("Decending","0","impactScopeWise");
			getParliamentImpactandItsSubLevelAlert("Decending","0","0","impactScopeWise");
			getCorpGMCAlert("0","impactScopeWise");
			getConstituencyImpactandItsSubLevelAlert("Decending","0","0","impactScopeWise");
			getAssignGroupTypeAlertDtlsByImpactLevelWise(0);
		 }else if(option == "2"){
			 $(".locImptLevelDivCls").hide();
			 $(".impactLevelCls").attr("attr_level","Status");
			 getStateImpactLevelAlertStatusWise();
			 getTotalAlertGroupByLocationThenStatus("Decending","0");
			 getTotalAlertGroupByLocationThenStatusForParliament("Decending","0","0");
			 getGhmcImpactLevelAlertStatusWise("0");
			 getConstituencyAlertStatusWise("Decending","0","0");
			 getAssignGroupTypeAlertDtlsByImpactLevelWise(0);
		}else if(option == "5"){
			$(".locImptLevelDivCls").hide();
			$(".impactLevelCls").attr("attr_level","Category");
			 getStateImpactLevelAlertStatusWiseIssueCategory();
			 getTotalAlertGroupByLocationThenStatusIssueCategory("Decending","0");
			 getTotalAlertGroupByLocationThenStatusForParliamentIssueCategory("Decending","0","0");
			 getGhmcImpactLevelAlertStatusWiseIssueCategory("0");
			 getConstituencyAlertStatusWiseIssueCategory("Decending","0","0");
			 getAssignGroupTypeAlertDtlsByImpactLevelWise(0);
		}
		else if(option =="3"){
			 $(".locImptLevelDivCls").hide();
			$(".impactLevelCls").attr("attr_level","Publication");
			getStateImpcatLevelAlertCntPublicationWise();
			getDistrictWisePublicationAlert("Decending","0");
			getParliamentWisePublicationAlert("Decending",0,0);
			getCorpGHMCImpcatLevelAlertCntPublicationWise("0");
			getConstituencyWisePublicationAlert("Decending","0","0");
			getAssignGroupTypeAlertDtlsByImpactLevelWise(0);
		}else if(option =="4"){
			 $(".locImptLevelDivCls").hide();
		  $("#alertChildActivityMemberDivId").html('');
		  $("#childUserTypeDetailsDivForAlerts").html('');
		  $("#candidateLocationAlertDtlsStatusWiseDivId").html('');
		  $(".alertImpctLevelBlcock").hide();	
 		  $(".alertComparisonblock").show();
		  getAllItsSubUserTypeIdsByParentUserTypeIdForAlert();
		}
	}
	
	
	
	function buildAlertDtls(result){
		$("#cadreExcelExpBtnId").show();
		var str='';
		str+='<div class="table-responsive">';
		if($(window).width() < 800)
		{
			str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed alertDtlsTabStyle" id="alertDtlsTabId">';   
		}else{
			str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed" id="alertDtlsTabId">'; 
		}  
		str+='<thead>';
			str+='<tr>';
             str+='<th>Alert Source</th>';
             str+='<th>Title</th>';
             str+='<th>Created Time</th>';
			 str+='<th>Last Updated Date</th>';
			 str+='<th>Current Status</th>'	 
			 str+='<th>LAG Days</th>';
			 str+='<th>Alert Impact Level</th>';
			 str+='<th>Location</th>';
			 str+='</tr>';
		 str+='</thead>';
		 str+='<tbody>';
		 for(var i in result){
			str+='<tr>';
			if(result[i].source != null && result[i].source.length > 0){
				str+='<td><strong>'+result[i].source+'</strong></td>';         
			}else{
				str+='<td> - </td>';     
			}
			if(result[i].title != null && result[i].title.length > 0){
				str+='<td class="descAlertCls" style="cursor:pointer;" attr_alert_status="'+result[i].status+'" attr_alert_id="'+result[i].id+'"><strong><u>'+result[i].title+'</u></strong></td>';         
			}else{
				str+='<td> - </td>';     
			} //createdDate
			if(result[i].createdTime != null && result[i].createdTime.length > 0){
				str+='<td>'+result[i].createdTime+'</td>';      
			}else{
				str+='<td> - </td>';  
			}
			if(result[i].updatedDate != null && result[i].updatedDate.length > 0){
				str+='<td>'+result[i].updatedDate+'</td>';      
			}else{
				str+='<td> - </td>';  
			}
			if(result[i].status != null && result[i].status.length > 0){
				str+='<td>'+result[i].status+'</td>';      
			}else{
				str+='<td> - </td>';  
			}
			if(result[i].interval != null){
				str+='<td>'+(parseInt(result[i].interval)-parseInt(1))+'</td>';            
			}else{
				str+='<td> - </td>';  
			}
			if(result[i].alertLevel != null && result[i].alertLevel.length > 0){
				str+='<td>'+result[i].alertLevel+'</td>';               
			}else{
				str+='<td> - </td>';  
			}
			if(result[i].location != null && result[i].location.length > 0){
				str+='<td>'+result[i].location+'</td>';      
			}else{
				str+='<td> - </td>';        
			}
			//str+='<td><button type="button" class="btn btn-default btn-success descAlertCls" attr_alert_id="'+result[i].id+'">Alert Details</button></td>';  
			
			str+='</tr>';
			}
			 str+='</tbody>';
			 str+='</table>';
			 str+='</div>';
		 $("#tourDocumentBodyId").html(str);          
		  $("#alertDtlsTabId").dataTable({  
				 "aaSorting": [[ 4, "desc" ]], 
				"iDisplayLength" : 10,
				"aLengthMenu": [[10,20,50, 100, -1], [10,20,50, 100, "All"]]					
			 }); 
	}
	var globalStr1 = '';  
	
	function getAlertAssignedCandidates(alertId){
		GlobalAlertData = [];
		var json={  
				alertId			:alertId      
			};
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
						str+='<h5 class="text-muted text-capital headingColorStyling">Assigned Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<strong>0</strong></h5>';  
						$("#alertAssignedCandidates").html(str);    
					}  
				},
				failure: function(xhr) {
					return xhr;
				}
			});	
	}
	function getAlertData(alertId){    
		var json={  
			alertId			:alertId      
		};
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
		$("#cdrModelId").html("<h5 class='text-muted headingColorStyling'>ALERT DESCRIPTION</h5>");
		$("#alertDestId").html("<p style='border: 1px solid rgb(211, 211, 211); padding: 6px;'>"+result[0].desc+"</p>");
		$("#sourceHeadingId").html("<h5 class='text-muted headingColorStyling'>ALERT SOURCE</h5>");
		$("#headingNameId").html("<p style='border: 1px solid rgb(211, 211, 211); padding: 10px;'>"+result[0].alertSource+"</p>");
		
		if(result[0].documentList != null && result[0].documentList.length >= 1){
			$("#alertDocHeadingId").html("<h5  class='text-muted headingColorStyling'>ALERT DOCUMENTS</h5>");
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
			$("#alertAttachTitId").html("<h5  class='text-muted headingColorStyling'>ALERT ATTACHMENTS</h5>");
			if(result[0].categoryId == 10){
				var docStr = '';
				docStr+='<ul>';
					docStr+='<li id="document0'+i+'"><a href="http://mytdp.com/NotificationMonitor/report_documents/'+result[0].imageUrl+'" target="_blank" style="color:#000">attachment</a></li>'; 
					docStr+='</ul>';
				$("#alertAttachImgId").html(docStr);    
			}
			else{
			var imgStr = '';
			imgStr+='<ul class="list-inline imageUrlUlCls" style="border: 1px solid rgb(211, 211, 211); padding:5px;">';
			imgStr+='<li><img src="http://mytdp.com/NewsReaderImages/'+result[0].imageUrl+'" style="width: 90px; height: 90px;cursor:pointer;" class="articleImgDetailsCls" attr_articleId="'+result[0].alertCategoryTypeId+'"></img></li>';
			imgStr+='</ul> '; 
			$("#alertAttachImgId").html(imgStr);  
			}
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
			str+='<h5 class="text-muted text-capital headingColorStyling">Involved Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;'+invCandCnt+'</h5>';           
			str+='<ul class="list-inline assignedCandidatesUl1">';     
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
			str+='<h5 class="text-muted text-capital headingColorStyling">Involved Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<strong>0</strong></h5>'; 
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
	function getGroupedArticlesInfo(articleId)
	{
		$.ajax({
			  type : 'GET',      
			  url: wurl+"/CommunityNewsPortal/webservice/getGroupedArticlesInfo/"+articleId+""
			  //url: "http://localhost:8080/CommunityNewsPortal/webservice/getGroupedArticlesInfo/"+articleId+""
		}).then(function(result){
			$("#alertGroupAttachTitId").html("<h5 class='text-muted headingColorStyling'>GROUPED ARTICLES</h5>");
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
			var json={  
				alertId			:alertId      
			};
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
					if(result != null)           
						buildAlertStatusCommentsTrackingDetails(result,alertStatus);     
				},
				failure: function(xhr) {
					return xhr;
				}
			});	
	}
	
	
	function getTotalAlertGroupByLocationThenStatus(sortingType,districtId){
		/*Hiding Block if impact Level is not selected*/
		$(".districtImpactLevelBlockCls").show();
		if(globalDistrictImpactLevelScopeArr == null || globalDistrictImpactLevelScopeArr.length == 0){
			$(".districtImpactLevelBlockCls").hide();
			return;
		}
		$("#districtImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		var editionId = 0;
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");

		 $("#districtOverviewHeadingId").html("District overview - impact alerts");
			
			var json={  
				fromDateStr:		customStartDateAlert,  
				toDateStr :			customEndDateAlert,
				stateId : 			1,  
				scopeIdList:		globalDistrictImpactLevelScopeArr,
				activityMemberId : "44",
				group			 :	"",
				alertTypeId : 		alertId,
				editionIds : 		editionId,
				filterType:			"District",
				locationValue : 	districtId,
				alertStatusIds :	globalAlertStatusArr, 
				sortingType : 		sortingType,
				districtId : 		0,
				alertCategoryIds:	alertCategoryArr
			}; 
		
		$.ajax({
            url: "getTotalAlertGroupByLocationThenStatus",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	  globalDistrictLevelRlst = result;
					if(result != null && result.length > 0){
						buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWise(result,"districtImpactLevelHighChartDivId",districtId,"District");	
					}else{
						$(".districtImpactLevelBlockCls").hide();
					}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
			
	}
	
	function getTotalAlertGroupByLocationThenStatusIssueCategory(sortingType,districtId){
		/*Hiding Block if impact Level is not selected*/
		$(".districtImpactLevelBlockCls").show();
		if(globalDistrictImpactLevelScopeArr == null || globalDistrictImpactLevelScopeArr.length == 0){
			$(".districtImpactLevelBlockCls").hide();
			return;
		}
		$("#districtImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		var editionId = 0;
		 $("#districtOverviewHeadingId").html("District overview - impact alerts");
			var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
			
			var json={  
				fromDateStr:		customStartDateAlert,  
				toDateStr :			customEndDateAlert,
				stateId : 			1,  
				scopeIdList:		globalDistrictImpactLevelScopeArr,
				activityMemberId : "44",
				group			 :	"",
				alertId : 			alertId,
				editionIds : 		editionId,
				filterType:			"District",
				locationValue : 	districtId,
				alertStatusIds :	globalAlertStatusArr, 
				sortingType : 		sortingType,
				districtId : 		0,
				alertCategoryIds:	alertCategoryArr
			}; 
		
		$.ajax({
            url: "getLocationAndIssueCategoryWiseAlerts",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	 globalDistrictLevelRlst = result;
					if(result != null && result.length > 0){
						buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWiseIssueCategory(result,"districtImpactLevelHighChartDivId",districtId,"District");	
					}else{
						$(".districtImpactLevelBlockCls").hide();
					}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
			
	}
	
	function buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWiseIssueCategory(result,divId,locationValue,locationType){
		if(result != null && result.length > 10){
			var highChartDivHight = result.length*40;
			$("#"+divId).height(highChartDivHight);
		}else{
			$("#"+divId).height(400);		
		}
			
		if(result != null && result.length > 0){
			var locatinNameArr = [];
			var str = '';
			if(divId=="districtImpactLevelHighChartDivId"){
			    str+='<option value="0">All</option>';	 
			}else if(divId=="constituencyLevelHighChartDivId"){
				str+='<option value="0">All</option>'; 
			}else{
				str+='<option value="0">All</option>'; 
			}
			for(var i in result){
				locatinNameArr.push(result[i].name.toUpperCase());
				str+='<option value="'+result[i].id+'">'+result[i].name.toUpperCase()+'</option>';
			}
			if(locationValue == 0){ // Building district for searching first time only
				if(divId=="districtImpactLevelHighChartDivId"){
					$("#districtSelectBoxId").val(' ');
					$("#districtSelectBoxId").html(str);
				}else if(divId=="constituencyLevelHighChartDivId"){
					$("#constituencySeletBoxId").val(' ');
					$("#constituencySeletBoxId").html(str);  
				}else{
					$("#parliamentSelectBoxId").val(' ');
					$("#parliamentSelectBoxId").html(str);  
				}
			}
			var pendingAlertArr = [];
			var notifiedAlertArr = [];
			var actionInProgessAlertArr = [];
			var completedAlertArr = [];
			var unblTRslvAlertArr = [];
			var actionNotRequiredAlertArr = [];
			
			 
			for(var i in result){
				for(var j in result[i].subList1){
					if(result[i].subList1[j].statusTypeId==1){
						pendingAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name}); 
					}else if(result[i].subList1[j].statusTypeId==2){
						notifiedAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==3){
						actionInProgessAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==4){
						completedAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==5){
						unblTRslvAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==6){
						actionNotRequiredAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}
				}
			}
			var mainJosnObjArr = [];
			if(pendingAlertArr != null && pendingAlertArr.length > 0){
				mainJosnObjArr.push({name:'Internal Bickerings',data:pendingAlertArr,color:"#A27FC2"});  
			}
			if(notifiedAlertArr != null && notifiedAlertArr.length > 0){
				mainJosnObjArr.push({name:'Corruption Charges',data:notifiedAlertArr,color:"#0175F3"});  
			}
			if(actionInProgessAlertArr != null && actionInProgessAlertArr.length > 0){
				mainJosnObjArr.push({name:'Misbehaviour',data:actionInProgessAlertArr,color:"#3EC3FF"});  
			}
			if(completedAlertArr != null && completedAlertArr.length > 0){
				mainJosnObjArr.push({name:'Anti Party Activities',data:completedAlertArr,color:"#049968"});  
			}
			if(unblTRslvAlertArr != null && unblTRslvAlertArr.length > 0){
				mainJosnObjArr.push({name:'Anti Government Activities',data:unblTRslvAlertArr,color:"#F21A98"});  
			}
			if(actionNotRequiredAlertArr != null && actionNotRequiredAlertArr.length > 0){
				mainJosnObjArr.push({name:'Others',data:actionNotRequiredAlertArr,color:"#FD6E07"});  
			}
			
			var getWidth = $("#districtOvervwGraph").width();
			$("#"+divId).css("width",getWidth);	
			$("#"+divId).highcharts({
				chart: {
					type: 'bar'
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
					categories: locatinNameArr,
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					title: {
						text: '',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}, 
					stackLabels: {
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						},
						formatter: function() {
                        return  (this.total);
                    },
					}
				},
				tooltip: {
					valueSuffix: ' ',
					shared:true
				},
				plotOptions: {
					bar: {
					stacking: 'normal',
						dataLabels: {
							align: 'center',
							x :5,
							y:-3,
							enabled: false,
							 formatter: function() {
								if (this.y === 0) {
									return null;
								} else {
									return Highcharts.numberFormat(this.y,0);      
								}
							}
						}
					},
					series: {
							cursor: 'pointer',
							point: {
							events: {
								click: function () {
									var locationInfo = (this.extra).split("-");
									var alertStatusId = locationInfo[0];
									var locationId = locationInfo[1];
									var totalAlertCnt = locationInfo[2];
									var locationType = locationInfo[3];
									var locationName = locationInfo[4];
									 if(totalAlertCnt == 0){
										return;  
									 }
									  getAlertIssueCategoryDetails(alertStatusId,locationId,totalAlertCnt,locationType,locationName);
								}
							}
						}
					}
				},
				legend: {
						reversed: false,
						verticalAlign:'top'
						},
				credits: {
					enabled: false
				},
				series: mainJosnObjArr
			});
		}else{
			 $("#"+divId).html("NO DATA AVAILABLE.");
		}
		if(result != null && result.length > 10){ 
			$("#constituencyOvervwGraph").mCustomScrollbar();//{setHeight:'600px'}
			$("#constituencyOvervwGraph").css("height","655px");
			//$("#constituencyOvervwGraph").mCustomScrollbar({setHeight:'655px'})
		}else{
			$("#constituencyOvervwGraph").css("height","auto");
		}
	}
	
	function buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWise(result,divId,locationValue,locationType){
		if(result != null && result.length > 10){
			var highChartDivHight = result.length*40;
			$("#"+divId).height(highChartDivHight);
		}else{
			$("#"+divId).height(400);		
		}
			
		if(result != null && result.length > 0){
			var locatinNameArr = [];
			var str = '';
			if(divId=="districtImpactLevelHighChartDivId"){
			    str+='<option value="0">All</option>';	 
			}else if(divId=="constituencyLevelHighChartDivId"){
				str+='<option value="0">All</option>'; 
			}else{
				str+='<option value="0">All</option>'; 
			}
			for(var i in result){
				locatinNameArr.push(result[i].name.toUpperCase());
				str+='<option value="'+result[i].id+'">'+result[i].name.toUpperCase()+'</option>';
			}
			if(locationValue == 0){ // Building district for searching first time only
				if(divId=="districtImpactLevelHighChartDivId"){
					$("#districtSelectBoxId").val(' ');
					$("#districtSelectBoxId").html(str);
				}else if(divId=="constituencyLevelHighChartDivId"){
					$("#constituencySeletBoxId").val(' ');
					$("#constituencySeletBoxId").html(str);  
				}else{
					$("#parliamentSelectBoxId").val(' ');
					$("#parliamentSelectBoxId").html(str);  
				}
			}
			var pendingAlertArr = [];
			var notifiedAlertArr = [];
			var actionInProgessAlertArr = [];
			var completedAlertArr = [];
			var unblTRslvAlertArr = [];
			var actionNotRequiredAlertArr = [];
			var duplicateAlertArr = [];
			 
			var wrnglyMppdDsgntnAlertArr = [];
			var wrnglyMppdDprtmntAlertArr = [];
			var rejoinderAlertArr = [];
			var incompleteAlertArr = [];
			var closedAlertArr = [];
			var proposalAlertArr = [];
			 
			for(var i in result){
				for(var j in result[i].subList1){
					if(result[i].subList1[j].statusTypeId==1){
						pendingAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name}); 
					}else if(result[i].subList1[j].statusTypeId==2){
						notifiedAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==3){
						actionInProgessAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==4){
						completedAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==5){
						unblTRslvAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==6){
						actionNotRequiredAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==7){
						duplicateAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==8){
						wrnglyMppdDsgntnAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==9){
						wrnglyMppdDprtmntAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==10){
						rejoinderAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==11){
						incompleteAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==12){
						closedAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(result[i].subList1[j].statusTypeId==13){
						proposalAlertArr.push({y:result[i].subList1[j].totalAlertCnt,"extra":result[i].subList1[j].statusTypeId+"-"+result[i].id+"-"+result[i].subList1[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}
				}
			}
			var mainJosnObjArr = [];
			if(pendingAlertArr != null && pendingAlertArr.length > 0){
				mainJosnObjArr.push({name:'Pending',data:pendingAlertArr,color:"#A27FC2"});  
			}
			if(notifiedAlertArr != null && notifiedAlertArr.length > 0){
				mainJosnObjArr.push({name:'Notified',data:notifiedAlertArr,color:"#0175F3"});  
			}
			if(actionInProgessAlertArr != null && actionInProgessAlertArr.length > 0){
				mainJosnObjArr.push({name:'Action In Progess',data:actionInProgessAlertArr,color:"#3EC3FF"});  
			}
			if(completedAlertArr != null && completedAlertArr.length > 0){
				mainJosnObjArr.push({name:'Completed',data:completedAlertArr,color:"#049968"});  
			}
			if(unblTRslvAlertArr != null && unblTRslvAlertArr.length > 0){
				mainJosnObjArr.push({name:'Unable to Resolve',data:unblTRslvAlertArr,color:"#F21A98"});  
			}
			if(actionNotRequiredAlertArr != null && actionNotRequiredAlertArr.length > 0){
				mainJosnObjArr.push({name:'Action Not Required',data:actionNotRequiredAlertArr,color:"#FD6E07"});  
			}
			if(duplicateAlertArr != null && duplicateAlertArr.length > 0){
				mainJosnObjArr.push({name:'Duplicate',data:duplicateAlertArr,color:"#CF0001"});  
			}
			if(wrnglyMppdDsgntnAlertArr != null && wrnglyMppdDsgntnAlertArr.length > 0){
				mainJosnObjArr.push({name:'Wrongly Mapped Designation',data:wrnglyMppdDsgntnAlertArr,color:"#FE9900"});  
			} 
			if(wrnglyMppdDprtmntAlertArr != null && wrnglyMppdDprtmntAlertArr.length > 0){
				mainJosnObjArr.push({name:'Wrongly Mapped Department',data:wrnglyMppdDprtmntAlertArr,color:"#0C9514"});  
			}
			if(rejoinderAlertArr != null && rejoinderAlertArr.length > 0){
				mainJosnObjArr.push({name:'Rejoinder',data:rejoinderAlertArr,color:"#82CA9C"});  
			} 
			if(incompleteAlertArr != null && incompleteAlertArr.length > 0){
				mainJosnObjArr.push({name:'Incomplete',data:incompleteAlertArr,color:"#C9AC82"});  
			} 
			if(closedAlertArr != null && closedAlertArr.length > 0){
				mainJosnObjArr.push({name:'Closed',data:closedAlertArr,color:"#ababab"});  
			}
			if(proposalAlertArr != null && proposalAlertArr.length > 0){
				mainJosnObjArr.push({name:'Proposal',data:proposalAlertArr,color:"#FFA07A"});  
			}
			var getWidth = $("#districtOvervwGraph").width();
			$("#"+divId).css("width",getWidth);	
			$("#"+divId).highcharts({
				chart: {
					type: 'bar'
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
					categories: locatinNameArr,
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					title: {
						text: '',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}, 
					stackLabels: {
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						},
						formatter: function() {
                        return  (this.total);
                    },
					}
				},
				tooltip: {
					valueSuffix: ' ',
					shared:true
				},
				plotOptions: {
					bar: {
					stacking: 'normal',
						dataLabels: {
							align: 'center',
							x :5,
							y:-3,
							enabled: false,
							 formatter: function() {
								if (this.y === 0) {
									return null;
								} else {
									return Highcharts.numberFormat(this.y,0);      
								}
							}
						}
					},
					series: {
							cursor: 'pointer',
							point: {
							events: {
								click: function () {
									var locationInfo = (this.extra).split("-");
									var alertStatusId = locationInfo[0];
									var locationId = locationInfo[1];
									var totalAlertCnt = locationInfo[2];
									var locationType = locationInfo[3];
									var locationName = locationInfo[4];
									 if(totalAlertCnt == 0){
										return;  
									 }
									 
									locationAlertDetails(alertStatusId,locationId,totalAlertCnt,locationType,locationName);
								}
							}
						}
					}
				},
				legend: {
						reversed: false,
						verticalAlign:'top'
						},
				credits: {
					enabled: false
				},
				series: mainJosnObjArr
			});
		}else{
			 $("#"+divId).html("NO DATA AVAILABLE.");
		}
		if(result != null && result.length > 10){ 
			$("#constituencyOvervwGraph").mCustomScrollbar();//{setHeight:'600px'}
			$("#constituencyOvervwGraph").css("height","655px");
			//$("#constituencyOvervwGraph").mCustomScrollbar({setHeight:'655px'})
		}else{
			$("#constituencyOvervwGraph").css("height","auto");
		}
	} 
		 
	function buildAlertAssignedCandidates(result)
	{
	var str='';
	if(result[0].subList.length > 0){  
		str+='<h5 class="text-muted text-capital headingColorStyling">Assigned Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;'+result[0].subList.length+'</h5>';
		str+='<ul class="list-inline assignedCandidatesUl">';
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
		str+='<h5 class="text-muted text-capital headingColorStyling">Assigned Candidates&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<strong>0</strong></h5>';  
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
function buildAlertStatusCommentsTrackingDetails(result,alertStatus)
{
	var docName = '';
	var extName = [];
	$("#alertStatusDiv").html("<h4 class='text-muted headingColorStyling' style='font-size:15px;'>ALERT STATUS</h4>");          
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
					str+='<li class="m_top10" role="presentation"><a href="#commentStatus'+i+'" aria-controls="commentStatus'+i+'" role="tab" data-toggle="tab"><span>'+result[i].status+'</span><span class="glyphicon glyphicon-hourglass pull-right" style="font-size: 22px;color: #777 !important;"></span><br/><span class="color_FF">'+result[i].sublist2[0].date+'</span></a></li>';
				}else{
					str+='<li role="presentation" class="active m_top10"><a href="#commentStatus'+i+'" aria-controls="commentStatus'+i+'" role="tab" data-toggle="tab"><span>'+result[i].status+'</span><span class="glyphicon glyphicon-ok pull-right" style="font-size: 22px;color: #777 !important;margin-left: 15px;"></span><br/><span class="color_FF">'+result[i].sublist2[0].date+'<span></a></li>';
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
												str+='<p><span class="pull-right" style="color:#A286C0;font-size:13px;">UPDATED BY: '+result[i].sublist2[j].sublist[k][0].userName+'</span></p>';
												str+='<hr style="margin-top:20px;border-color:#a792d2 -moz-use-text-color -moz-use-text-color;"/>';
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
				str+='<li class="m_top10" role="presentation" style="pointer-events: none;"><a href="#commentStatus'+i+'" aria-controls="commentStatus'+i+'" role="tab" data-toggle="tab">'+statusArr[i]+'<span class="glyphicon glyphicon-ok"></span><br/></a></li>';
			}else{
				str+='<li class="m_top10" role="presentation" style="pointer-events: none;"><a href="#commentStatus'+i+'" aria-controls="commentStatus'+i+'" role="tab" data-toggle="tab">'+statusArr[i]+'<br/></a></li>';
			}
		}
		str+='</ul>';       
		str+='<div class="tab-content alertComment">';    
		$("#alertCommentsDiv").html(str);       
	}
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

function getAssignGroupTypeAlertDtlsByImpactLevelWise(disctrictId){
	 $(".groupAssignCls").show();
	 $("#groupAssignAlertDlsDivId").html(spinner);
	 	
       var alertId = 1;
	   var editionId = 0;
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalImpactScopeArr,
			alertTypeId	:		alertId,
			editionIds:			editionId,
			districtId      :	disctrictId,
			alertStatusIds:		["1","2","3","4"],
			enrollementYearIds :[2],
			alertCategoryIds:alertCategoryArr
		};
		 $.ajax({
            url: "getAssignGroupTypeAlertDtlsByImpactLevelWise",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	if(result != null && result.length > 0){
					buildAlertAssignGroupAlertsDtls(result);
				}else{
					$("#groupAssignAlertDlsDivId").html('NO DATA AVAILABLE.');
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
	}
	function buildAlertAssignGroupAlertsDtls(result){ 
        	
		$("#groupAssignAlertDlsDivId").html("");
		var str ='';
		if(result !=null && result.length >0){
			    
				   for(var i in result){
		              if(result[i].totalAlertCnt > 0){
					  str+='<div class="col-md-4 col-xs-12 col-sm-12">';
						
						str+='<h4 class="alertAssignCls text-capital" attr_type='+result[i].name+' style="text-align:center;cursor:pointer;color:rgb(51, 122, 183)">'+result[i].name+" - "+result[i].totalAlertCnt+'</h4>';
						str+='<div id="groupAssign'+i+'" style="height:300px;"></div>'; 
					  str+='</div>';
			         }
			      }
		 			
		}
		$("#groupAssignAlertDlsDivId").html(str);  
			if(result !=null && result.length >0){
				for(var i in result){
					var groupAssingName;
					groupAssingName = result[i].name+"["+result[i].totalAlertCnt+"]";
					if(result[i].subList1 !=null && result[i].subList1.length >0){
						var groupAssignTypeName =[];
						var alertCnt = [];
						var count = [];
						for(var j in result[i].subList1){
							var uniqCnt = {};
							if(result[i].totalAlertCnt > 0){
								groupAssignTypeName.push(result[i].subList1[j].statusType.toUpperCase());
								alertCnt.push(result[i].subList1[j].alertCount);
								var uniqCnt = {y:parseInt(result[i].totalAlertCnt)-parseInt(result[i].subList1[j].alertCount),color:"#D3D3D3"};
								count.push(uniqCnt);
							}
						}
						if(alertCnt.length != 0){
						$(function () {
									$('#groupAssign'+i+'').highcharts({
										colors: ['#A185BF','#0166FF','#32CCFE','#019966','#FF6600','#CC0001'],     
										chart: {
											type: 'column'
										},
										title: {
											text: null
										},
									   
										xAxis: {
											 min: 0,
												 gridLineWidth: 0,
												 minorGridLineWidth: 0,
												 categories: groupAssignTypeName,
											labels: {
													rotation: -45,
													style: {
														fontSize: '11px',
														fontFamily: 'Verdana, sans-serif'
													},
												}
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
													if(this.series.name != "Series 1")  
													s += '<br/><b style="color:'+this.series.color+'">' + this.series.name + '</b> : ' +
														this.y+' - ' +
														(Highcharts.numberFormat(this.percentage,1)+'%');
												});

												return s;
											},
											shared: true
										},
										legend: {   
																
												enabled: false,				
																
											},				
										plotOptions: {
											column: {
												stacking: 'percent',  
												dataLabels:{
													enabled: false,
													formatter: function() {
														if (this.y === 0) {
															return null;
														} else {
															return Highcharts.numberFormat(this.percentage,1) + '%';
														}
													}
												},
												
											},
										},
										series: [{
											data: count  
										}, {
											name: "Number of alerts",
											data: alertCnt,
											colorByPoint: true
										}]
									});
								});	
						}else{
						 $("#groupAssign"+i).css("height","35px");
						 // $(".groupAssignCls").hide();
						}
					}
				}
			}else{
				$("#groupAssignAlertDlsDivId").html("<div class='col-md-12 col-xs-12 col-sm-12'>No Data Available</div>")
			}
			if ($('#groupAssignAlertDlsDivId').is(':empty')){ // hiding heading if highchart is not building
				$(".groupAssignCls").hide();
			} 
	}
	
	
function getTotalAlertGroupByPubRepThenStatus(groupAssignType,publicRepresentativeTypeId,divId,commitLvlIdArr,level){
		$("#commitLvlId").hide();  
		if(groupAssignType == "Party Committee"){
			$("#commitLvlId").show();
		}else{
			$("#commitLvlId").hide();        
		}
	   $("#alertModalHeadingId").html(groupAssignType+" Alert Details");
	   $("#"+divId).html(spinner);
	   $("#alertModalId").modal("show");
	
	    var alertId = 1;
		var editionId = 0;
	   var districtId = $("#districtSelectBoxId").val();
	   var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			stateId				:1,
			scopeIdList			:globalImpactScopeArr,
			activityMemberId	:44,
			publicRepresentativeTypeId	:publicRepresentativeTypeId,
			commitLvlIdList				:commitLvlIdArr,
			groupAssignType				:groupAssignType,
			alertTypeId			:alertId,
			editionIds			:editionId,
			districtId			:districtId,
			alertStatusIds		:globalAlertStatusArr,
			enrollementYearIds	:[2],
			alertCategoryIds	:alertCategoryArr
		};
		 $.ajax({
			url: "getTotalAlertGroupByPubRepThenStatus",
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result) {
				 if(result != null && result.length > 0){
					   buildAlertGroupAssignDtlsRlst(result,divId,groupAssignType,level,publicRepresentativeTypeId,0);
					}else{
					  $("#"+divId).html("NO DATA AVAILABLE.");	  
					}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
		
	   
}  
	function buildAlertGroupAssignDtlsRlst(result,divId,groupAssignType,level,publicRepresentativeTypeId,commitTypeId){
		var str = '';            
		str+='<div class="table-responsive">';
		str+='<table class="table table-bordered tablePopup">';
			str+='<thead class="text-capitalize">';
				if(groupAssignType == "Party Committee" && level == "bellow"){
					str+='<th>Designation</th>';       
				}else if(groupAssignType == "Public Representative" && level == "bellow"){
					str+='<th>Candidate Name</th>';            
				}else{
					str+='<th>'+groupAssignType+'</th>';  
				}  
				str+='<th>Total Alerts</th>';
				if(result[0].subList1 != null && result[0].subList1.length > 0){
					for(var i in result[0].subList1){
						str+='<th>'+result[0].subList1[i].category+'</th>';
					}  
				}
				str+='</thead>';
				str+='<tbody>';
			for(var i in result){
				str+='<tr>';
				if(groupAssignType == "Public Representative" && level == "bellow"){
					str+='<td>'+result[i].status+'</td>';
				}else if(groupAssignType == "Party Committee" && level == "bellow"){  
					str+='<td>'+result[i].status+'<i class="glyphicon glyphicon-plus expandIcon2" attr_designation_id="'+result[i].statusId+'" attr_commit_id="'+commitTypeId+'" attr_selected_type=\''+groupAssignType+'\' attr_div_id="memberTblId_'+result[i].statusId+'"></i></td>';       
				}else{      
					str+='<td>'+result[i].status+'<i class="glyphicon glyphicon-plus expandIcon" attr_designation_id="'+result[i].statusId+'"  attr_selected_type=\''+groupAssignType+'\' attr_div_id="memberTblId'+result[i].statusId+'"></i></td>';
				} 
				if(groupAssignType == "Public Representative" && level == "bellow"){
					str+='<td style="cursor:pointer;" class="pubRepDtlsCls" attr_cadre_id="'+result[i].statusId+'" attr_pub_rep_type_id="'+publicRepresentativeTypeId+'" attr_status_id="0" attr_alert_count="'+result[i].count+'">'+result[i].count+'</td>';
				}else{
					str+='<td>'+result[i].count+'</td>';
				}  
					   
				if(result[i].subList1 != null && result[i].subList1.length > 0){
					for(var j in result[i].subList1){
						if(result[i].subList1[j].categoryCount == 0){
							str+='<td>'+result[i].subList1[j].categoryCount+'</td>';
						}else{
							if(groupAssignType == "Public Representative" && level == "bellow"){
								str+='<td style="cursor:pointer;" class="pubRepDtlsCls" attr_cadre_id="'+result[i].statusId+'" attr_pub_rep_type_id="'+publicRepresentativeTypeId+'" attr_status_id="'+result[i].subList1[j].categoryId+'" attr_alert_count="'+result[i].subList1[j].categoryCount+'">'+result[i].subList1[j].categoryCount+'</td>';
							}else{
								str+='<td>'+result[i].subList1[j].categoryCount+'</td>';      
							}
						}
							
					}
				}
				str+='</tr>';
				//str+='<tr class="subElement" style="display: none">';
				if(groupAssignType == "Party Committee" && level == "bellow"){
					str+='<tr class="subElement_" style="display: none">';
					str+='<td id="memberTblId_'+result[i].statusId+'" colspan="8">';     
				}else{
					str+='<tr class="subElement" style="display: none">';
					str+='<td id="memberTblId'+result[i].statusId+'" colspan="8">';     
				}
				str+='</td>';      
				str+='</tr>';
			}
		str+='</tbody>';
		str+='</table>';
		str+='</div>';
		$("#"+divId).html(str);
	}  
		
		
 function getOtherAndPrgrmCmmtteeTypeAlertCndtDtls(groupAssignType,divId){
	  $("#commitLvlId").hide();
	  $("#alertModalHeadingId").html(groupAssignType+" Alert Details");
	  $("#"+divId).html(spinner);
	  $("#alertModalId").modal("show");
	  
		
		var alertId = 1;
		var editionId = 0;
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");

		var districtId = $("#districtSelectBoxId").val();
		var json={ 
			activityMemberId	:44,
			stateId				:1,
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			scopeIdList			:globalImpactScopeArr,
			resultType			:groupAssignType,
			alertTypeId			:alertId,
			editionTypeId		:editionId,
			districtId			:districtId,
			alertStatusIds		:globalAlertStatusArr,
			enrollementYearIds	:[2],
			alertCategoryIds	:alertCategoryArr
			
		};
		 $.ajax({
			url: "getOtherAndPrgrmCmmtteeTypeAlertCndtDtls",
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result) {
				if(result != null && result.length > 0){
					buildProgramCommiteeAndOtherMemberDtls(result,divId,groupAssignType);
				}else{
				  $("#"+divId).html("NO DATA AVAILABLE.");	
				}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
	}
function buildProgramCommiteeAndOtherMemberDtls(result,divId,groupAssignType){
		var str = '';
		str+='<div class="table-responsive">';
		 str+='<table class="table table-bordered tablePopup">';
			 str+='<thead>';
			   str+='<th>Candidate Name</th>';
			   str+='<th>Total Alerts</th>';
			   if(result[0].subList1 != null && result[0].subList1.length > 0){
				   for(var i in result[0].subList1){
					   str+='<th>'+result[0].subList1[i].statusType+'</th>';
				   }  
			   }
			 str+='</thead>';
			 str+='<tbody>';
			 for(var i in result){
				   str+='<tr>';
				   str+='<td>'+result[i].name+'</td>';
				   if(result[i].totalAlertCnt > 0){
					str+='<td class="prgrmCmmttAndOthrCls" attr_selected_type=\''+groupAssignType+'\' attr_alert_count="'+result[i].totalAlertCnt+'" attr_cadre_id="'+result[i].id+'" attr_status_id="0" style="cursor:pointer;">'+result[i].totalAlertCnt+'</td>';  
				   }else{
					str+='<td>'+result[i].totalAlertCnt+'</td>';   
				   }
					 if(result[i].subList1 != null && result[i].subList1.length > 0){
						 for(var j in result[i].subList1){
							    if(result[i].subList1[j].statusCnt > 0){
								str+='<td class="prgrmCmmttAndOthrCls" attr_selected_type=\''+groupAssignType+'\' attr_alert_count="'+result[i].subList1[j].statusCnt+'" attr_cadre_id="'+result[i].id+'" attr_status_id="'+result[i].subList1[j].statusTypeId+'" style="cursor:pointer;">'+result[i].subList1[j].statusCnt+'</td>';		
								}else{
								str+='<td>'+result[i].subList1[j].statusCnt+'</td>';	
								}
						}
					 }
				  str+='</tr>';
		 }
		  str+='</tbody>';
		  str+='</table>';
		  str+='</div>';
			 $("#"+divId).html(str);
	}

	
	function getMemForPartyCommitDesg(commitTypeId,designationId,commitLvlIdArr,selectionType,divId){
		
		var alertId = 1;
		var editionId = 0;
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		var districtId = $("#districtSelectBoxId").val();
		
		var json={  
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			stateId				:1,
			scopeIdList			:globalImpactScopeArr,
			activityMemberId	:44,
			commitLvlIdList		:commitLvlIdArr,
			commitTypeId		:commitTypeId,
			designationId		:designationId,
			alertTypeId			:alertId,
			editionIds			:editionId,
			districtId			:districtId,
			alertStatusIds		:globalAlertStatusArr,
			enrollementYearIds	:[2],
			alertCategoryIds	:alertCategoryArr
		};
		 $.ajax({
			url: "getMemForPartyCommitDesg",
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result) {
				if(result != null && result.length > 0){       
					buildMemForPartyCommitDesg(result,selectionType,commitTypeId,designationId,divId);
				}else{
				  $("#"+divId).html("NO DATA AVAILABLE.");  	
				}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
	}
	function buildMemForPartyCommitDesg(result,selectionType,commitTypeId,designationId,divId){
		var str = '';
		str+='<div class="table-responsive">';
		str+='<table class="table table-bordered tablePopup">';
			str+='<thead>';
				str+='<th>Candidate Name</th>';        
				str+='<th>Total Alerts</th>';
				if(result[0].subList1 != null && result[0].subList1.length > 0){
					for(var i in result[0].subList1){
						str+='<th>'+result[0].subList1[i].category+'</th>';
					}  
				}
				str+='</thead>';
				str+='<tbody>';
			for(var i in result){
				str+='<tr>';
				
				str+='<td>'+result[i].status+'</td>';
				if(result[i].count != 0){
					str+='<td style="cursor:pointer;" class="commettDtlsCls" attr_commit_id="'+commitTypeId+'" attr_designation_id="'+designationId+'" attr_cadre_id="'+result[i].statusId+'" attr_status_id="0" attr_alert_count="'+result[i].count+'">'+result[i].count+'</td>';
				}else{
					str+='<td>'+result[i].count+'</td>';
				}  
					   
				if(result[i].subList1 != null && result[i].subList1.length > 0){
					for(var j in result[i].subList1){
						if(result[i].subList1[j].categoryCount == 0){
							str+='<td>'+result[i].subList1[j].categoryCount+'</td>';
						}else{
							str+='<td style="cursor:pointer;" class="commettDtlsCls" attr_cadre_id="'+result[i].statusId+'" attr_commit_id="'+commitTypeId+'" attr_designation_id="'+designationId+'" attr_status_id="'+result[i].subList1[j].categoryId+'" attr_alert_count="'+result[i].subList1[j].categoryCount+'">'+result[i].subList1[j].categoryCount+'</td>';
						}        	
					}
				}      
				str+='</tr>';
			}
		str+='</tbody>';
		str+='</table>';
		str+='</div>';
		$("#"+divId).html(str);  
	}
	
	function getAlertDtlsAssignedByPartyCommite(commitTypeId,designationId,commitLvlIdArr,cadreId,statusId){
		
	   var alertId = 1;
		var editionId = 0;
	    var districtId = $("#districtSelectBoxId").val();
		var alertStatusArr = [];
		 if(statusId == 0){
			alertStatusArr= globalAlertStatusArr;
		 }else{
		     alertStatusArr.push(statusId);	 
		 }
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			stateId				:1,
			scopeIdList			:globalImpactScopeArr,
			activityMemberId	:44,
			commitLvlIdList		:commitLvlIdArr,
			commitTypeId		:commitTypeId,
			designationId		:designationId,
			cadreId				:cadreId,
			alertStatusIds		:alertStatusArr,
			alertTypeId			:alertId,
			editionIds			:editionId,
			districtId			:districtId,
			enrollementYearIds	:[2],
			alertCategoryIds	:alertCategoryArr
		};
		 $.ajax({
			url: "getAlertDtlsAssignedByPartyCommite",
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result) {
				if(result != null && result.length > 0){       
					buildAlertDtls(result);      
				}else{  
					
				}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
	}
	
	function getTotalAlertGroupByPubRepThenStatusBellow(commitLvlIdArr,commitTypeId,divId,selectTypeId){
		var alertId = 1;
		var editionId = 0;
		var districtId = $("#districtSelectBoxId").val();
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			stateId				:1,
			scopeIdList			:globalImpactScopeArr,
			activityMemberId	:44,
			publicRepresentativeTypeId	:publicRepresentativeTypeId,
			commitLvlIdList				:commitLvlIdArr,
			groupAssignType				:groupAssignType,
			position			:"bellow",
			designationId		:commitTypeId,
			alertTypeId			:alertId,
			editionIds			:editionId,
			districtId			:districtId,
			alertStatusIds		:globalAlertStatusArr,
			enrollementYearIds	:[2],
			alertCategoryIds	:alertCategoryArr
		};
		 $.ajax({
			url: "getDesigWiseTdpCommitAlertCount",
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result) {
				if(result != null && result.length > 0){
					buildAlertGroupAssignDtlsRlst(result,divId,selectTypeId,"bellow",0,commitTypeId);
				}else{
				  $("#"+divId).html("NO DATA AVAILABLE.");	  
				}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
		
	}
	
	 function getStateImpactLevelAlertStatusWise(){
		 $(".stateImpactLevelBlockCls").show();
		$("#stateImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		var editionId = 0;
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		$("#stateOverviewHeadingId").html("State overview - impact alerts");
		
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalImpactScopeArr,
			alertTypeId : 		alertId,
			editionIds : 		editionId,
			alertStatusIds : 	globalAlertStatusArr,
			districtId : 		0,
			alertCategoryIds:	alertCategoryArr
		};
		 $.ajax({
            url: "getStateOrGhmcImpactLevelAlertStatusWise",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalStateLevelRslt = result;
				$("#stateImpactLevelHighChartDivId").html(' ');
				if(result !=null && result.statusList != null && result.statusList.length > 0){
				   buildStateImpactLevelHighChartStatusWiseRslt(result,"");	
				}else{
				  $(".stateImpactLevelBlockCls").hide();	
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	
	function getStateImpactLevelAlertStatusWiseIssueCategory(){
		 $(".stateImpactLevelBlockCls").show();
		$("#stateImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		var editionId = 0;
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");

		$("#stateOverviewHeadingId").html("State overview - impact alerts");
		
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalImpactScopeArr,
			alertTypeId : 		alertId,
			editionIds : 		editionId,
			alertStatusIds : 	globalAlertStatusArr,
			districtId : 		0,
			alertCategoryIds:	alertCategoryArr
		};
		
		$.ajax({
            url: "getStateWiseAlertIssueCategoryDetails",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalStateLevelRslt = result;
				$("#stateImpactLevelHighChartDivId").html(' ');
				if(result !=null && result.statusList != null && result.statusList.length > 0){
				   buildStateImpactLevelHighChartStatusWiseRslt(result,"Category");	
				}else{
				  $(".stateImpactLevelBlockCls").hide();	
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	
	function buildStateImpactLevelHighChartStatusWiseRslt(result,tabType){
			if(result !=null){
				var statusList = result.statusList;
			    var statusNameArr =[];
				var alertCnt = [];
				var count = [];
				var totalAlertCnt = result.alertCount;
					alertCnt.push({"y":totalAlertCnt,"extra":"0-"+"0-"+result.alertCount+"-StateImpactLevel-"+""});
					count.push({"y":parseInt(result.alertCount)-parseInt(result.alertCount),"extra":"0-"+"-0-"+result.alertCount+"-StateImpactLevel-"+"",color:"#D3D3D3"})
					statusNameArr.push("Total");
					for(var i in statusList){    
				   var uniqCnt = {};
					statusNameArr.push(statusList[i].name);
					alertCnt.push({"y":statusList[i].alertCount,"extra":statusList[i].id+"-0-"+statusList[i].alertCount+"-StateImpactLevel-"+statusList[i].name});
					var uniqCnt = {"y":parseInt(totalAlertCnt)-parseInt(statusList[i].alertCount),"extra":statusList[i].id+"-0-"+statusList[i].alertCount+"-StateImpactLevel-"+statusList[i].name,color:"#D3D3D3"};
					count.push(uniqCnt);
					}
			       var getWidth = $("#stateOvervwGraph").width();
					$("#stateImpactLevelHighChartDivId").css("width",getWidth);	
				   $(function () {
					$('#stateImpactLevelHighChartDivId').highcharts({
						colors: ['#66728C','#A185BF','#0166FF','#32CCFE','#019966','#FF6600','#CC0001'],     
						chart: {
							type: 'column'
						},
						title: {
							text: ''
						},
					 	xAxis: {
							 min: 0,
								 gridLineWidth: 0,
								 minorGridLineWidth: 0,
								 categories: statusNameArr,
							labels: {
									//rotation: -45,
									style: {
										fontSize: '11px',
										fontFamily: 'Verdana, sans-serif'
									},
									formatter: function() {
										if(this.value.toString() >=8){
											return this.value.toString().substring(0, 8)+'...';
										}else{
											return this.value;
										}
										
									},
									style: {
										fontSize: '11px',
										fontFamily: '"Lucida Grande","Lucida Sans Unicode",Arial,Helvetica,sans-serif',
										textTransform: "uppercase"
									}
								}
						},
						yAxis: {
							min: 0,
								   gridLineWidth: 0,
									minorGridLineWidth: 0,
							title: {
								text: ''
							},
							stackLabels: {
								enabled: true,
								style: {
									fontWeight: 'bold',
									color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
								},
								formatter: function() {
								return  (this.total);
							},
							}
							
						},
					 	tooltip: {
							formatter: function () {
								var s = '<b>' + this.x + '</b>';

									$.each(this.points, function () {
									if(this.series.name != "Series 1")  
									s += '<br/><b style="color:'+this.series.color+'">' + this.series.name + '</b> : ' +
										this.y/* +' - ' +
										(Highcharts.numberFormat(this.percentage,1)+'%'); */
								});

								return s;
							},
							shared: true
						},
						
						legend: {   
												
								enabled: false,				
												
							},				
							plotOptions: {
								column: {
									stacking: 'percent',  
									dataLabels:{
										enabled: false,
										formatter: function() {
											if (this.y === 0) {
												return null;
											} else {
												return Highcharts.numberFormat(this.percentage,1) + '%';
											}
										}
									},
									
								},
								series: {
								cursor: 'pointer',
								point: {
								events: {
									click: function () {
										var stateImpactInfo = (this.extra).split("-");
										 var alertStatusId = stateImpactInfo[0];
										var locationId = stateImpactInfo[1];
										var totalAlertCnt = stateImpactInfo[2];
										var impactLevel = stateImpactInfo[3];
										var alertStatus = stateImpactInfo[4];
										 if(totalAlertCnt == 0){
											return;  
										 }
										 if(tabType == "Category"){
											 getAlertIssueCategoryDetails(alertStatusId,locationId,totalAlertCnt,impactLevel,alertStatus);
										 }else{
											 locationAlertDetails(alertStatusId,locationId,totalAlertCnt,impactLevel,alertStatus);
										 }
										
									}
								}
							}
						}
							},
						series: [{
							data: count    
						}, {
							name: "Number of alerts",
							data: alertCnt,
							colorByPoint: true
						}]
					});
				});	
			}else{
				$("#stateImpactLevelHighChartDivId").html("<div class='col-md-12 col-xs-12 col-sm-12'>No Data Available</div>")
			}
		}	 
	
	function buildDistrictWiseAlert(districtIdArr,totalAlertCnt,constituencyId,alertStatusId,locationLevel,locationType,isPublication,publicationValue){
		var locationElectionBodyId = 0;
		$("#tourDocumentBodyId").html("");           
		$("#tourDocumentBodyId").html(spinner);   
		$("#alertCntTitId").html("TOTAL ALERTS - "+totalAlertCnt);        
		$("#tourDocumentId").modal("show");
		var scopeIdsArr = [];
		var parliamentId = 0;		
		 if(locationType != null && locationType=="Constituency"){
			 scopeIdsArr = globalConstituencyImpactScopeArr;
		 }else if(locationType=="District"){
			  scopeIdsArr = globalDistrictImpactLevelScopeArr;
		 }else if(locationType=="Parliament"){
			  scopeIdsArr = globalPaliamentImpactLevelScopeArr;
			  parliamentId = constituencyId;
		 }else if(locationType=="StateImpactLevel")	{
			 scopeIdsArr = globalImpactScopeArr;
		 }else if(locationType=="GHMCImpactLevel"){
			 var districtId = $("#districtSelectBoxId").val();
			 if(districtId > 0){
				districtIdArr.push(districtId); 
			 }
			  scopeIdsArr = globalCorpGhmcImpactScopeSArr; 
			  locationElectionBodyId=constituencyId;
			  constituencyId=0;
		 }  
		var alertId = 1;
		var editionId = 0;
		var alertStatusArr =[];
		   if(alertStatusId == 0){
			   alertStatusArr = globalAlertStatusArr;
		   }else{
			 alertStatusArr.push(alertStatusId);   
		   }
		   var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			stateId				:1,
			scopeIdList			:scopeIdsArr,
			activityMemberId	:44,
			districtList		:districtIdArr,
			alertTypeId			:alertId,
			editionIds			:editionIds,
			constituencyId      :constituencyId,
			alertStatusIds		:alertStatusArr,
			locationLevel		:locationLevel,
			isPublication		:isPublication,
			publicationIdStr	:publicationValue,
			localElectionBodyId :locationElectionBodyId,
			type				:"impactScopeWise",
			parliamentId		:parliamentId,
			alertCategoryIds	:alertCategoryArr
			
		};
		 $.ajax({
			url: "getDistrictAndStateImpactLevelWiseAlertDtls",
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result) {
				 if(result != null && result.length > 0){
					buildAlertDtls(result);    
				}else{
					$("#tourDocumentBodyId").html("NO DATA AVAILABLE.");	
				}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
		
	}

function getTotalArticledetails(articleId){
	$("#myModalShowNew").modal('show');
	$("#myModalShowNewId").html(spinner);
	
	var url = window.location.href;
	  var wurl = url.substr(0,(url.indexOf(".com")+4));
	  if(wurl.length == 3)
	  wurl = url.substr(0,(url.indexOf(".in")+3));
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
					str+='<button type="button" class="close topModalClose" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
						str+='<p class="m_bottom0" style="height:40px;" id="mdlArtclTtl">'+result.articleTitle+'</p>';
					str+='</h4>';
					str+='</div>';
					str+='<div class="modal-body">';
					str+='<div class="row">';
					str+='<div class="col-md-12 col-xs-12 col-sm-12">';
						str+='<p class="m_bottom0 text-italic font-16" id="mdlArtclDesc"><i>Edition Source :'+result.editionSource+' ['+result.articleInsertedTime+' ]</i></p>';
						str+='<img class="mainImage"  src="http://mytdp.com/NewsReaderImages/'+result.imageURL+'" style="display:block;margin:auto;border:1px solid #ddd;width:100%" alt="Img Title"/>';
					str+='</div>';
					str+='<div class="col-md-12 col-xs-12 col-sm-12 m_top10">';
					str+='<h4 class="panel-title text-success">Description</h4>';
					str+='<p class="m_0 f_14">'+result.description+'</p>';
					str+='</div>';
					str+='<div class="col-md-12 col-xs-12 col-sm-12">';
					if( result.subList != null && result.subList.length > 0){
						for(var i in result.subList){
							/* Candidate*/
							str+='<div class="row m_top10">';
							str+='<div class="col-md-6 col-xs-12 col-sm-12">';
							str+='<div class="panel panel-default panelArticleGroup">';
							str+='<div class="panel-heading">';
							str+='<h4 class="panel-title">FROM WHOM</h4>';
							str+='</div>';
							str+='<div class="panel-body">';
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
											str+='<p class="m_0">Impact Level : '+result.subList[i].fromList[j].impactLevel+'</p>';	
										}else{ 
											str+='<p class="m_0">Impact Level : - </p>';	
										}
										if(result.subList[i].fromList[j].categories != null && $.trim(result.subList[i].fromList[j].categories).length > 0){
											str+='<p class="m_0">Category : '+result.subList[i].fromList[j].categories+'</p>';	
										}else{ 
											str+='<p class="m_0">Category : - </p>';	
										}
										if(result.subList[i].fromList[j].newsActivity != null && $.trim(result.subList[i].fromList[j].newsActivity).length > 0){
											str+='<p class="m_0">News Activity : '+result.subList[i].fromList[j].newsActivity+' </p>';
										}else{ 
											str+='<p class="m_0">News Activity : - </p>';	
										}
										if(result.subList[i].fromList[j].newsType != null && $.trim(result.subList[i].fromList[j].newsType).length > 0){
											str+='<p class="m_0">News type : '+result.subList[i].fromList[j].newsType+' </p>';
										}else{ 
											str+='<p class="m_0">News type : - </p>';	
										}
										if( result.subList[i].fromList[j].newsType != null && result.subList[i].fromList[j].newsType == "Problems"){
											if(result.subList[i].fromList[j].newsRelated != null && $.trim(result.subList[i].fromList[j].newsRelated).length > 0){
												str+='<p class="m_0">News Related : '+result.subList[i].fromList[j].newsRelated+' </p>';
											}else{ 
												str+='<p class="m_0">News Related : - </p>';	
											}
											if(result.subList[i].fromList[j].priority != null && $.trim(result.subList[i].fromList[j].priority).length > 0){
												str+='<p class="m_0">Priority : '+result.subList[i].fromList[j].priority+' </p>';
											}else{ 
												str+='<p class="m_0">Priority : - </p>';	
											}
											if(result.subList[i].fromList[j].solution != null && $.trim(result.subList[i].fromList[j].solution).length > 0){
												str+='<p class="m_0">Solution : '+result.subList[i].fromList[j].solution+' </p>';
											}else{ 
												str+='<p class="m_0">Solution : - </p>';	
											}
										}
										str+='</td>';
										str+='</tr>';
										str+='</table>';
									}
								}
							str+='</div>';//panel-body
							str+='</div>';//panel
							str+='</div>';//colmd6
							str+='<div class="col-md-6 col-xs-12  col-sm-12">';
							str+='<div class="panel panel-default panelArticleGroup">';
							str+='<div class="panel-heading">';
							str+='<h4 class="panel-title">TO WHOM</h4>';
							str+='</div>';
							str+='<div class="panel-body">';
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
																			  str+='<p class="m_0">Impact Level : '+result.subList[i].toList[j].impactLevel+'</p>';	
																			}else{ 
																			  str+='<p class="m_0">Impact Level : - </p>';	
																			}
																		
																		    if(result.subList[i].toList[j].categories != null && $.trim(result.subList[i].toList[j].categories).length > 0){
																			  str+='<p class="m_0">Category : '+result.subList[i].toList[j].categories+'</p>';	
																			}else{ 
																			  str+='<p class="m_0">Category : - </p>';	
																			}
																			if(result.subList[i].toList[j].newsActivity != null && $.trim(result.subList[i].toList[j].newsActivity).length > 0){
																			  str+='<p class="m_0">News Activity : '+result.subList[i].toList[j].newsActivity+' </p>';
																			}else{ 
																			  str+='<p class="m_0">News Activity : - </p>';	
																			}
																			if(result.subList[i].toList[j].newsType != null && $.trim(result.subList[i].toList[j].newsType).length > 0){
																			  str+='<p class="m_0">News type : '+result.subList[i].toList[j].newsType+' </p>';
																			}else{ 
																			  str+='<p class="m_0">News type : - </p>';	
																			}
																			if( result.subList[i].toList[j].newsType != null && result.subList[i].toList[j].newsType == "Problems"){
																				
																				if(result.subList[i].toList[j].newsRelated != null && $.trim(result.subList[i].toList[j].newsRelated).length > 0){
																				  str+='<p class="m_0">News Related : '+result.subList[i].toList[j].newsRelated+' </p>';
																				}else{ 
																				  str+='<p class="m_0">News Related : - </p>';	
																				}
																				if(result.subList[i].toList[j].priority != null && $.trim(result.subList[i].toList[j].priority).length > 0){
																				  str+='<p class="m_0">Priority : '+result.subList[i].toList[j].priority+' </p>';
																				}else{ 
																				  str+='<p class="m_0">Priority : - </p>';	
																				}
																				if(result.subList[i].toList[j].solution != null && $.trim(result.subList[i].toList[j].solution).length > 0){
																				  str+='<p class="m_0">Solution : '+result.subList[i].toList[j].solution+' </p>';
																				}else{ 
																				  str+='<p class="m_0">Solution : - </p>';	
																				}
																			}
																		str+='</td>';
																	str+='</tr>';
																str+='</table>';
															}
														}
														
													str+='</div>';//panelbody
												str+='</div>';//panel
											str+='</div>';//colmd6
											
										str+='</div>';//row
								  }
								}
								
								str+='</div>';//colmd12
							str+='</div>';//row
								/* Article Scope Location */
								str+='<div class="col-md-12 col-xs-12 col-sm-12">';
									str+='<div class="panel panel-default panelArticleGroup">';
										str+='<div class="panel-heading">';
											str+='<h4 class="panel-title">LOCATION DETAILS</h4>';
										str+='</div>';
										str+='<div class="panel-body">';
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
									str+='<div class="panel panel-default panelArticleGroup">';
										str+='<div class="panel-heading">';
											str+='<h4 class="panel-title">LINKED ARTICLES</h4>';
										str+='</div>';
										str+='<div class="panel-body">';
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
	
	
	function getVerificationDtls(alertId){
		var json={  
				alertId			:alertId      
			};
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
			$("#alertVerificationDiv").html("<h4 class='text-muted verifyHeadingColorStyling' style='font-size:15px;'>VERIFICATION STATUS-"+result.actionTypeStatus+"</h4>");  
			for(var i in result.conversationList){
				str+='<p class="text-capital panelTitleFont m_top20 verifyHeadingColorStyling" style="font-size:12px;">'+result.conversationList[i].heading+'</p>';  
				if(result.conversationList[i].comments != null && result.conversationList[i].comments.length > 0){
					str+='<p style="border: 1px solid rgb(211, 211, 211); padding: 6px;">'+result.conversationList[i].comments+'</p>';     
				}
				var documentList = result.conversationList[i].documentList;
				if(documentList != null && documentList.length > 0){
					str+='<p style="font-weight:bold;font-size:12px;" class="text-capital m_top10 panelTitleFont headingColorStyling">Attachments</p>';
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
					str+='<p class="text-right" style="color:#7155D6;font-size:12px;">Created By:'+result.conversationList[i].name+'('+result.conversationList[i].updateTime+'&nbsp'+result.conversationList[i].time+')</p>';     
				}  
			}
			str+='<hr class="m_top10" style="border-top: 1px solid #ccc;">';
			$("#alertVerificationDtlsDiv").html(str);
		}
   }
   $(document).on('click','#showAlertVerificationPdfId',function(){      
		var dbFilePath = $(this).attr("attr_filePath");    
     	var str = ''; 
		var fileNameArr = dbFilePath.split(".");
		window.open('/Reports/tour_documents/'+dbFilePath,'_blank');
	});          
	function alertDetails(typeId,count,type)
	{
		var alertTypeId = typeId;
		var alertCount = count;
		var selectedAlertType = type;
		getAlertDetatilsByAlertType(alertTypeId,alertCount,selectedAlertType,globalImpactScopeArr,0,"impactScopeWise","overallAlert");
	}
	
	function getImpactLevelWiseAlertDtls(impactLevelId,totalAlertCnt,selectionType){
		
		var impactScopArr = [];
		if(selectionType != null && selectionType=="impactScopeWise"){
			if(impactLevelId == 5){
			  impactScopArr.push(5);
			  impactScopArr.push(12);
			}else if(impactLevelId == 7){
			  impactScopArr.push(6);
			  impactScopArr.push(7);
			  impactScopArr.push(9);
			}else if(impactLevelId == 0){
			  impactScopArr = globalImpactScopeArr;
			}else{
			  impactScopArr.push(impactLevelId);
			}
		}else if(selectionType=="locationWise"){
			if(impactLevelId == 5){
			  impactScopArr.push(5);
			  impactScopArr.push(7);
			}else if(impactLevelId == 6){
			  impactScopArr.push(6);
			  impactScopArr.push(8);
			  impactScopArr.push(11);
			}else if(impactLevelId == 0){
			  impactScopArr = [2,3,4,5,6,7,8,11];
			}else{
			   impactScopArr.push(impactLevelId);
			}
		}
		
		var alertTypeId = 1;
		
		var editionIds = 0;
		
		var impactLevel ="";
		if (selectionType=="locationWise"){
			if(impactLevelId == 0){
		    impactLevel = "Total Alerts";	
			}else{
			   impactLevel = localLevelObj[impactLevelId]+" Local Level Alerts";	
			}
		}
		if (selectionType=="impactScopeWise") {
			if(impactLevelId == 0){
			   impactLevel = "Total Alerts";	
			}else{
			  impactLevel = impactLevelObj[impactLevelId]+" Impact Alerts";	
			}
		}
		
		getAlertDetatilsByAlertType(alertTypeId,totalAlertCnt,impactLevel.toUpperCase(),impactScopArr,editionIds,selectionType,"");
	}
	function getAlertDetatilsByAlertType(alertTypeId,alertCount,selectedAlertType,impactScopArr,editionIds,selectionType,resultType){
		$("#tourDocumentBodyId").html("");           
		$("#tourDocumentBodyId").html(spinner);           
		$("#tourDocumentId").modal("show");  
		$("#alertCntTitId").html(""+selectedAlertType+"-"+alertCount);
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		if (resultType == "overallAlert") {
			alertCategoryArr = [];
			alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_static_category_id_string").split(",");
		}
		var json={  
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			stateId				:1,
			alertTypeId			:alertTypeId,
			activityMemberId	:44,
			scopeIdList			:impactScopArr,
			alertStatusIds		:globalAlertStatusArr,
			editionIds			:editionIds,
			type				:selectionType,
			alertCategoryIds	:alertCategoryArr,	
		};
		 $.ajax({
			url: "getAlertDetailsByAlertType",
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result) {
				if(result != null && result.length > 0){
					buildAlertDtls(result);   
				}
			},
			failure: function(xhr) {
				return xhr;
			}
		});	
		
	}
	/* function getDistrictListByStateId(globalActivityMemberId,globalUserTypeId){
		
		var alertTypeId = $("#alertTypeHiddenId").attr("attr_alert_id");
		if(alertTypeId == undefined){
			alertTypeId = 0;
		}
		var editionId = $("#alertEditionTypeHiddenId").attr("attr_alert_edition_id");
		if(editionId == undefined){
			editionId = 0;
		}
		var jsObj = { 
			stateId :globalStateId,
            activityMemberId:globalActivityMemberId,
			userTypeId:globalUserTypeId,
			fromDate : customStartDateAlert,      
			toDate : customEndDateAlert,
			alertTypeId:alertTypeId,
			editionId:editionId,
		}                  
		$.ajax({
			type : 'POST',        
			url : 'getDistrictListByStateIdAction.action',
			dataType : 'json',      
			data : {task:JSON.stringify(jsObj)}    
		}).done(function(result){
			$("#dstrctSlctBxId").html(' ');
			if(result != null && result.length > 0){
				var str = '';
				str+='<option value="0">All DISTRICTS</option>';
                for(var i in result){
					str+='<option value="'+result[i].id+'">'+result[i].name+'</option>';			
				}				
				$("#dstrctSlctBxId").html(str);
			}
		});  
	} */
	function locationAlertDetails(alertStatusId,locationIdStr,totalAlertCnt,loctionType,locationLevel){
		var locationLevel = locationLevel;
		var districtIdArr =[];
		var constituencyId = 0;    
		 if(loctionType=="Constituency"){
			constituencyId = locationIdStr;  
		}else if(loctionType=="District"){
		   districtIdArr = locationIdStr.split(",");	
		}else if(loctionType=="Parliament"){               
			constituencyId = locationIdStr;
		}else if(loctionType=="GHMCImpactLevel"){
			constituencyId = locationIdStr;
		} 
		buildDistrictWiseAlert(districtIdArr,totalAlertCnt,constituencyId,alertStatusId,locationLevel,loctionType,"false",0);
	}
	
	function getLocationWiseAlertDtls(locationIdStr,totalAlertCnt,loctionType,impactLevelId,selectionType){
		var locationLevel = "";
		var districtIdArr =[];
		var constituencyId = 0;
		var parliamentId = 0;
		var locationLevel = "";
		var locationElectionBodyId = 0;
		 if(loctionType=="Constituency"){
			constituencyId = locationIdStr;  
		}else if(loctionType=="District"){
			districtIdArr = locationIdStr.split(",");	
		}else if(loctionType == "localElectionBody"){
			if(locationIdStr ==0){
				var districtId = $("#districtSelectBoxId").val();
				   if(districtId > 0){
					 districtIdArr.push(districtId);  
				   }
				   locationLevel="OtherLocations";
			}
			locationElectionBodyId = locationIdStr;
		}else if(loctionType == "Parliament"){  
			parliamentId = locationIdStr;
		} 
	
		var impactScopArr = [];
		if(selectionType != null && selectionType=="impactScopeWise"){
			if(impactLevelId == 5){
				impactScopArr.push(5);
				impactScopArr.push(12);
			}else if(impactLevelId == 7){
				impactScopArr.push(6);
				impactScopArr.push(7);
				impactScopArr.push(9);
			}else if(impactLevelId == 0){
				if(loctionType=="Constituency"){
					impactScopArr = globalConstituencyImpactScopeArr;
				}else if(loctionType=="District"){
					impactScopArr = globalDistrictImpactLevelScopeArr;
				}else if(loctionType == "Parliament"){
					impactScopArr = globalPaliamentImpactLevelScopeArr;
				}
			}else{
			   impactScopArr.push(impactLevelId);
			}
		}else if( selectionType=="locationWise"){
			if(impactLevelId == 5){
				impactScopArr.push(5);
				impactScopArr.push(7);
			}else if(impactLevelId == 6){
				impactScopArr.push(6);
				impactScopArr.push(8);
				impactScopArr.push(11);
			}else if(impactLevelId == 0){
				if(loctionType=="Constituency"){ 
					impactScopArr = [4,5,6,7,8,11];
				}else if(loctionType=="District"){
					impactScopArr = [3,4,5,6,7,8,10,11];
				}else if(loctionType=="Parliament"){
					impactScopArr = [4,5,6,7,8,10,11];
				}
			}else{
			   impactScopArr.push(impactLevelId);
			}
		}
		var impactLevel ="";
		if (selectionType=="locationWise"){
			if(impactLevelId == 0){
		    impactLevel = "Total Alerts";	
			}else{
			   impactLevel = localLevelObj[impactLevelId]+" Local Level Alerts";	
			}
		}
		if (selectionType=="impactScopeWise") {
			if(impactLevelId == 0){
			   impactLevel = "Total Alerts";	
			}else{
			  impactLevel = impactLevelObj[impactLevelId]+" Impact Alerts";	
			}
		}
		
		getLcatnWiseAlertDtls(locationLevel,impactLevel.toUpperCase(),districtIdArr,totalAlertCnt,constituencyId,impactScopArr,locationElectionBodyId,selectionType,parliamentId);
	}

	function getLcatnWiseAlertDtls(locationLevel,impactLevel,districtIdArr,totalAlertCnt,constituencyId,impactScopArr,locationElectionBodyId,selectionType,parliamentId){
		$("#tourDocumentBodyId").html("");           
		$("#tourDocumentBodyId").html(spinner);   
		$("#alertCntTitId").html(impactLevel+" - "+totalAlertCnt);        
		$("#tourDocumentId").modal("show");
		var alertId = 1;
		
		var editionIds = 0;
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			stateId 			: 1,
			scopeIdList			:impactScopArr,
			activityMemberId 	: "44",
			districtList		:districtIdArr,	
			alertTypeId			:alertId,
			constituencyId 		:constituencyId,
			alertStatusIds		:globalAlertStatusArr,
			locationLevel 		: locationLevel,
			isPublication  		:false ,
			editionIds			:editionIds,
			publicationIdStr  	:0,
			localElectionBodyId :locationElectionBodyId ,
			type                :selectionType,
			parliamentId        :parliamentId,
			alertCategoryIds    :alertCategoryArr
			
		};
		 $.ajax({
            url: "getDistrictAndStateImpactLevelWiseAlertDtls",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	if(result != null && result.length > 0){
					buildAlertDtls(result);    
				}else{
				$("#tourDocumentBodyId").html("NO DATA AVAILABLE.");	
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	function getConstituencyAlertStatusWise(sortingType,constituencyId,districtId){
		$(".constituencyImpactLevelBlockCls").show();	
		if(globalConstituencyImpactScopeArr == null || globalConstituencyImpactScopeArr.length == 0){
			$(".constituencyImpactLevelBlockCls").hide();
			return;
		}
		$("#constituencyLevelHighChartDivId").html(spinner);
		var alertId = 1;
		
		var editionId = 0;
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		$("#constituencyOverviewHeadingId").html("Constituency overview - impact alerts");
		
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalConstituencyImpactScopeArr,
			group		:		"",
			alertTypeId	:		1,
			editionIds:			0,
			filterType	:		"Constituency",
			locationValue  	:	constituencyId,	
			alertStatusIds:		globalAlertStatusArr,
			sortingType		:	sortingType,
			districtId      :	districtId,
			alertCategoryIds:alertCategoryArr
		};
		 $.ajax({
            url: "getTotalAlertGroupByLocationThenStatus",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalConstituencyLevelRlst = result;
				$("#constituencyLevelHighChartDivId").html(' ');
				if(result != null && result.length > 0){  
					buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWise(result,"constituencyLevelHighChartDivId",constituencyId,"Constituency"); 
				}else{
					$(".constituencyImpactLevelBlockCls").hide();
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		 
	}
	
	function getConstituencyAlertStatusWiseIssueCategory(sortingType,constituencyId,districtId){
		$(".constituencyImpactLevelBlockCls").show();	
		if(globalConstituencyImpactScopeArr == null || globalConstituencyImpactScopeArr.length == 0){
			$(".constituencyImpactLevelBlockCls").hide();
			return;
		}
		$("#constituencyLevelHighChartDivId").html(spinner);
		var alertId = 1;
		
		var editionId = 0;
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");

		$("#constituencyOverviewHeadingId").html("Constituency overview - impact alerts");
		
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalConstituencyImpactScopeArr,
			group		:		"",
			alertId	:			alertId,
			editionIds:			editionId,
			filterType	:		"Constituency",
			locationValue  	:	constituencyId,	
			alertStatusIds:		globalAlertStatusArr,
			sortingType		:	sortingType,
			districtId      :	districtId,
			alertCategoryIds:alertCategoryArr
		};
		 $.ajax({
            url: "getLocationAndIssueCategoryWiseAlerts",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalConstituencyLevelRlst = result;
				$("#constituencyLevelHighChartDivId").html(' ');
				if(result != null && result.length > 0){  
					buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWiseIssueCategory(result,"constituencyLevelHighChartDivId",constituencyId,"Constituency"); 
				}else{
					$(".constituencyImpactLevelBlockCls").hide();
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	
	
	function buildDistrictOrConstituencyLevelRlstInTabularFormatStatusWise(result,locationType,divId){
		var str='';
		str+='<div class="table-responsive">';
		if(divId=="constituencyLevelTblDivId"){
			str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="constituencyAlertDataTblId">'; 
		}else if(divId=="districtImpactLevelTblDivId"){
			str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="districtAlertDataTblId">';  
		}else{
			str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="parliamentAlertDataTblId">'; 
		}
		str+='<thead>';
			str+='<th>'+locationType+'</th>';
			str+='<th>Total</th>';
			if(result != null && result.length > 0){
				if(result[0].subList1 != null && result[0].subList1.length > 0){
					for(var k in result[0].subList1){
						str+='<th>'+result[0].subList1[k].statusType+'</th>';		 
					}
				}
			}
		str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
				str+='<td>'+result[i].name.toUpperCase()+'</td>';
				if(result[i].totalAlertCnt > 0){
					str+='<td  style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" class="locationAlertCls" attr_location_level="'+result[i].name+'" attr_location_type='+locationType+' attr_alert_count='+result[i].totalAlertCnt+' onClick="locationAlertDetails(0,\''+result[i].id+'\',\''+result[i].totalAlertCnt+'\',\''+locationType+'\',\''+result[i].name+'\');" attr_location_id = '+result[i].statusTypeId+' attr_alert_status_id="0">'+result[i].totalAlertCnt+'</td>'; 
				}else{
					str+='<td class="text-center">-</td>';      		
				} 
				if(result[i].subList1 != null && result[i].subList1.length > 0){
					for(var j in result[i].subList1){
						if(result[i].subList1[j].totalAlertCnt > 0){
							str+='<td  style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" class="locationAlertCls" onClick="locationAlertDetails(\''+result[i].subList1[j].statusTypeId+'\',\''+result[i].id+'\',\''+result[i].subList1[j].totalAlertCnt+'\',\''+locationType+'\',\''+result[i].name+'\');" attr_location_type='+locationType+' attr_alert_count='+result[i].subList1[j].totalAlertCnt+' attr_location_level="'+result[i].name+'" attr_location_id = '+result[i].id+' attr_alert_status_id='+result[i].subList1[j].statusTypeId+'>'+result[i].subList1[j].totalAlertCnt+'</td>';      	
						}else{
							str+='<td class="text-center">-</td>';      	
						} 
					}	
				}
				str+='</tr>';
			}
			str+='</tbody>';
			str+='</table>';
			$("#"+divId).html(str);
		str+='</div>';
		if(divId=="constituencyLevelTblDivId"){
			$("#constituencyAlertDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]			
			});   	
		}else if(divId == "districtImpactLevelTblDivId"){
			$("#districtAlertDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
			});   	
		}else{
			$("#parliamentAlertDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
			});
		}
	}
	
	function buildDistrictOrConstituencyLevelRlstInTabularFormatStatusWiseIssueCategory(result,locationType,divId){
		var str='';
		str+='<div class="table-responsive">';
		if(divId=="constituencyLevelTblDivId"){
			str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="constituencyAlertDataTblId">'; 
		}else if(divId=="districtImpactLevelTblDivId"){
			str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="districtAlertDataTblId">';  
		}else{
			str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="parliamentAlertDataTblId">'; 
		}
		str+='<thead>';
			str+='<th>'+locationType+'</th>';
			str+='<th>Total</th>';
			if(result != null && result.length > 0){
				if(result[0].subList1 != null && result[0].subList1.length > 0){
					for(var k in result[0].subList1){
						str+='<th>'+result[0].subList1[k].statusType+'</th>';		 
					}
				}
			}
		str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
				str+='<td>'+result[i].name.toUpperCase()+'</td>';
				if(result[i].totalAlertCnt > 0){
					str+='<td  style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" class="locationAlertCls" attr_location_level="'+result[i].name+'" attr_location_type='+locationType+' attr_alert_count='+result[i].totalAlertCnt+' onClick="getAlertIssueCategoryDetails(0,\''+result[i].id+'\',\''+result[i].totalAlertCnt+'\',\''+locationType+'\',\''+result[i].name+'\');" attr_location_id = '+result[i].statusTypeId+' attr_alert_status_id="0">'+result[i].totalAlertCnt+'</td>'; 
				}else{
					str+='<td class="text-center">-</td>';      		
				} 
				if(result[i].subList1 != null && result[i].subList1.length > 0){
					for(var j in result[i].subList1){
						if(result[i].subList1[j].totalAlertCnt > 0){
							str+='<td  style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" class="locationAlertCls" onClick="getAlertIssueCategoryDetails(\''+result[i].subList1[j].statusTypeId+'\',\''+result[i].id+'\',\''+result[i].subList1[j].totalAlertCnt+'\',\''+locationType+'\',\''+result[i].name+'\');" attr_location_type='+locationType+' attr_alert_count='+result[i].subList1[j].totalAlertCnt+' attr_location_level="'+result[i].name+'" attr_location_id = '+result[i].id+' attr_alert_status_id='+result[i].subList1[j].statusTypeId+'>'+result[i].subList1[j].totalAlertCnt+'</td>';      	
						}else{
							str+='<td class="text-center">-</td>';      	
						} 
					}	
				}
				str+='</tr>';
			}
			str+='</tbody>';
			str+='</table>';
			$("#"+divId).html(str);
		str+='</div>';
		if(divId=="constituencyLevelTblDivId"){
			$("#constituencyAlertDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]			
			});   	
		}else if(divId == "districtImpactLevelTblDivId"){
			$("#districtAlertDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
			});   	
		}else{
			$("#parliamentAlertDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
			});
		}
	}
	
	function getDistrictWisePublicationAlert(sortingType,districtId){
		/*Hiding Block if impact Level is not selected*/
		 $(".districtImpactLevelBlockCls").show();	
		if(globalDistrictImpactLevelScopeArr == null || globalDistrictImpactLevelScopeArr.length == 0){
			$(".districtImpactLevelBlockCls").hide();
			return;
		}
		 $("#districtOverviewHeadingId").html("District overview - impact alerts");
		$("#districtImpactLevelHighChartDivId").html(spinner);
    	var alertId = 1;
		
		var editionId = 0;
		
	   var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={
				"stateId"			:1,
				"fromDateStr"		:customStartDateAlert,
				"toDateStr"			:customEndDateAlert,
				"scopeIdList"		:globalDistrictImpactLevelScopeArr,
				"activityMemberId"	:"44",
				"alertTypeId"		:"1",
				"editionIds"		:"0",
				"filterType"		:"District",
				"locationValue"		:districtId,
				"alertStatusIds"	:globalAlertStatusArr,
				"sortingType"		:sortingType,
				"districtId"		:0,
				"alertCategoryIds"	:alertCategoryArr
			}; 
		
		$.ajax({
            url: "getPublicationWiseAlert",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalDistrictLevelRlst = result;
				$("#districtImpactLevelHighChartDivId").html('');
				if(result != null && result.length > 0){
				 buildDistrictOrConstituencyImpactLevelHighChartRsltPublicationWise(result,"districtImpactLevelHighChartDivId",districtId,"District");	
				}else{
				 $(".districtImpactLevelBlockCls").hide();		
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
	 
	}
	
	function getConstituencyWisePublicationAlert(sortingType,constituencyId,districtId){
		 $(".constituencyImpactLevelBlockCls").show();	
		if(globalConstituencyImpactScopeArr == null || globalConstituencyImpactScopeArr.length == 0){
			$(".constituencyImpactLevelBlockCls").hide();
			return;
		}
		 $("#constituencyOverviewHeadingId").html("Constituency overview - impact alerts");
		$("#constituencyLevelHighChartDivId").html(spinner);
    	var alertId = 1;
		
		var editionId = 0;
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
        var districtArr=[];
			
			var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalConstituencyImpactScopeArr,
			alertTypeId	:		alertId,
			editionIds:			editionId,
			filterType	:		"Constituency",
			locationValue  	:	constituencyId,	
			alertStatusIds:		globalAlertStatusArr,
			sortingType		:	sortingType,
			districtId      :	districtId,
			alertCategoryIds:alertCategoryArr
		};
		 $.ajax({
            url: "getPublicationWiseAlert",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalConstituencyLevelRlst = result;
				$("#constituencyLevelHighChartDivId").html('');
				if(result != null && result.length > 0){
				   buildDistrictOrConstituencyImpactLevelHighChartRsltPublicationWise(result,"constituencyLevelHighChartDivId",constituencyId,"Constituency");	
				}else{
				   $(".constituencyImpactLevelBlockCls").hide();
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		 
	}
	
	
	
	 function buildDistrictOrConstituencyImpactLevelHighChartRsltPublicationWise(result,divId,locationValue,locationType){
		   
		if(result != null && result.length > 10){
			var highChartDivHight = result.length*40;
			$("#"+divId).height(highChartDivHight);
		 }else{
			$("#"+divId).height(400);		
		 }
		 if(result != null && result.length > 0){
			 var locationName = [];
			 var str = '';
			 if(divId == "districtImpactLevelHighChartDivId"){
				  str+='<option value="0">All</option>';	 
			 }else{
				   str+='<option value="0">All</option>';
			 }
			 
			 for(var i in result){
				 locationName.push(result[i].name.toUpperCase());
				 str+='<option value="'+result[i].id+'">'+result[i].name.toUpperCase()+'</option>';
			 }
			     if(locationValue == 0){ // Building district for searching first time only
				  if(divId=="districtImpactLevelHighChartDivId"){
					  $("#districtSelectBoxId").val(' ');
					  $("#districtSelectBoxId").html(str);
				  }else if(divId=="constituencyLevelHighChartDivId"){
					  $("#constituencySeletBoxId").val(' ');
					  $("#constituencySeletBoxId").html(str);  
				  }else{
					  $("#parliamentSelectBoxId").val(' ');
					  $("#parliamentSelectBoxId").html(str); 
				  }
			    }
             	var andhraBhoomiAlertArr = []; //Appending value 2
				var andhraJyothiAlertArr = [];
				var eenaaduAlertArr = [];
				var vaarthaAlertArr = [];
				var vishalandhraAlertArr= [];
				var prajaSaktiAlertArr= [];
				var sakshiAlertArr= [];
				var newIndianExpressAlertArr= [];
				var deccanChronicleAlertArr= [];
				var timesOfIndiaAlertArr= [];
				var hinduAlertArr= [];
				var hansIndiaAlertArr= [];
				var namastheTelangaanaAlertArr= [];
				var navaTelangaanaAlertArr= [];
				var aNDHRAPRABHAAlertArr= [];
				var oNLINEAlertArr= [];
				
				var tV9AlertArr= [];  //Appending value 1
				var tV5AlertArr= [];
				var  eTVAPAlertArr= [];
				var sAKSHITVAlertArr= [];
				var aBNAertArrAlertArr= [];
				var tenTVArrAlertArr= [];
				var nTVArr = []; 
				
			   for(var i in result){
				 for(var j in result[i].subList){
					 var publicatinId = parseInt(result[i].subList[j].publicationId);
				    if(publicatinId==21){
						 andhraBhoomiAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name}); 
					}else if(publicatinId==22){
					andhraJyothiAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==23){
						 eenaaduAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==24){
						 vaarthaAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==25){
						 vishalandhraAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==27){
						 prajaSaktiAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==28){
						 sakshiAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==210){
						 newIndianExpressAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==211){
						 deccanChronicleAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==212){
						 timesOfIndiaAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==213){
						 hinduAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==214){
						 hansIndiaAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==215){
						 namastheTelangaanaAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==216){
						 navaTelangaanaAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==217){
						 aNDHRAPRABHAAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==218){
						 oNLINEAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==11){
						 tV9AlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==12){
						 tV5AlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==13){
						 eTVAPAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==14){
						 sAKSHITVAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==15){
						 aBNAertArrAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==16){
						 tenTVArrAlertArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}else if(publicatinId==17){
						 nTVArr.push({y:result[i].subList[j].totalAlertCnt,"extra":result[i].subList[j].publicationId+"-"+result[i].id+"-"+result[i].subList[j].totalAlertCnt+"-"+locationType+"-"+result[i].name});
					}
					
				 }
			 }
			 	
		       var mainJosnObjArr = [];
			   if(andhraBhoomiAlertArr != null && andhraBhoomiAlertArr.length > 0){
				mainJosnObjArr.push({name:'AndhraBhoomi',data:andhraBhoomiAlertArr,color:"#87C9D9"});  
			   }
			   if(andhraJyothiAlertArr != null && andhraJyothiAlertArr.length > 0){
				mainJosnObjArr.push({name:'AndhraJyothi',data:andhraJyothiAlertArr,color:"#3B82BE"});  
			  }
			  if(eenaaduAlertArr != null && eenaaduAlertArr.length > 0){
				mainJosnObjArr.push({name:'Eenaadu',data:eenaaduAlertArr,color:"#59BEF3"});  
			  }
			  if(vaarthaAlertArr != null && vaarthaAlertArr.length > 0){
				mainJosnObjArr.push({name:'Vaartha',data:vaarthaAlertArr,color:"#433EC0"});  
			  }
			  if(vishalandhraAlertArr != null && vishalandhraAlertArr.length > 0){
				mainJosnObjArr.push({name:'Vishalandhra',data:vishalandhraAlertArr,color:"#EA0F0D"});  
			  }
			  if(prajaSaktiAlertArr != null && prajaSaktiAlertArr.length > 0){
				mainJosnObjArr.push({name:'PrajaSakti',data:prajaSaktiAlertArr,color:"#6E82BD"});  
			  }
			  if(sakshiAlertArr != null && sakshiAlertArr.length > 0){
				mainJosnObjArr.push({name:'Sakshi',data:sakshiAlertArr,color:"#FEE60C"});  
			  }
			  if(newIndianExpressAlertArr != null && newIndianExpressAlertArr.length > 0){
				mainJosnObjArr.push({name:'NewIndianExpress',data:newIndianExpressAlertArr,color:"#5AF471"});  
			  }
			   if(deccanChronicleAlertArr != null && deccanChronicleAlertArr.length > 0){
				mainJosnObjArr.push({name:'DeccanChronicle',data:deccanChronicleAlertArr,color:"#54D2F2"});  
			  }
			   if(timesOfIndiaAlertArr != null && timesOfIndiaAlertArr.length > 0){
				mainJosnObjArr.push({name:'TimesOfIndia',data:timesOfIndiaAlertArr,color:"#ACA0F7"});  
			  }
			   if(hinduAlertArr != null && hinduAlertArr.length > 0){
				mainJosnObjArr.push({name:'Hindu',data:hinduAlertArr,color:"#F56CF7"});  
			  }
			   if(hansIndiaAlertArr != null && hansIndiaAlertArr.length > 0){
				mainJosnObjArr.push({name:'HansIndia',data:hansIndiaAlertArr,color:"#ED7B2F"});  
			  }
			  if(namastheTelangaanaAlertArr != null && namastheTelangaanaAlertArr.length > 0){
				mainJosnObjArr.push({name:'NamastheTelangaana',data:namastheTelangaanaAlertArr,color:"#ED7B2F"});  
			  }
			   if(navaTelangaanaAlertArr != null && navaTelangaanaAlertArr.length > 0){
				mainJosnObjArr.push({name:'NavaTelangaana',data:navaTelangaanaAlertArr,color:"#EDA8E2"});  
			  }
			   if(aNDHRAPRABHAAlertArr != null && aNDHRAPRABHAAlertArr.length > 0){
				mainJosnObjArr.push({name:'ANDHRAPRABHA',data:aNDHRAPRABHAAlertArr,color:"#2C81CB"});  
			  }
			  if(oNLINEAlertArr != null && oNLINEAlertArr.length > 0){
				mainJosnObjArr.push({name:'ONLINE',data:oNLINEAlertArr,color:"#EAE3C5"});  
			  }
			  if(tV9AlertArr != null && tV9AlertArr.length > 0){
				mainJosnObjArr.push({name:'TV9',data:tV9AlertArr,color:"#D62624"});  
			  }
			   if(tV5AlertArr != null && tV5AlertArr.length > 0){
				mainJosnObjArr.push({name:'TV5',data:tV5AlertArr,color:"#8510e5"});  
			  }
			   if(eTVAPAlertArr != null && eTVAPAlertArr.length > 0){
				mainJosnObjArr.push({name:'E TV AP',data:eTVAPAlertArr,color:"#FEC16D"});  
			  }
			   if(sAKSHITVAlertArr != null && sAKSHITVAlertArr.length > 0){
				mainJosnObjArr.push({name:'SAKSHI TV',data:sAKSHITVAlertArr,color:"#EA701E"});  
			  }
			   if(aBNAertArrAlertArr != null && aBNAertArrAlertArr.length > 0){
				mainJosnObjArr.push({name:'ABN',data:aBNAertArrAlertArr,color:"#B85C5C"});  
			  }
			   if(tenTVArrAlertArr != null && tenTVArrAlertArr.length > 0){
				mainJosnObjArr.push({name:'10 TV',data:tenTVArrAlertArr,color:"#F2CCAF"});  
			  }
			   if(nTVArr != null && nTVArr.length > 0){
				mainJosnObjArr.push({name:'N TV',data:nTVArr,color:"#FA0290"});  
			  }
		     var getWidth = $("#constituencyOvervwGraph").width();
			  $("#"+divId).css("width",getWidth);
			  
			  $("#"+divId).highcharts({
				chart: {
					type: 'bar'
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
					categories: locationName,
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					title: {
						text: '',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					},
					stackLabels: {
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						},
						formatter: function() {
                        return  (this.total);
                    },
					}
				},
				tooltip: {
					valueSuffix: ' ',
					shared :true
				},
				plotOptions: {
					bar: {
					stacking: 'normal',
						dataLabels: {
							align:"center",
							y:-5,
							enabled: false,
							 formatter: function() {
								if (this.y === 0) {
									return null;
								} else {
									return Highcharts.numberFormat(this.y,0);      
								}
							}
						}
					},
						series: {
							cursor: 'pointer',
							point: {
							events: {
								click: function () {
									var publicationInfo = (this.extra).split("-");
									var publicationId = publicationInfo[0];
									var locationId = publicationInfo[1];
									var totalAlertCnt = publicationInfo[2];
									var locatinType = publicationInfo[3];
									var locationName = publicationInfo[4];
									 if(totalAlertCnt == 0){
										return;  
									 }
									getAlertPublicationDetails(publicationId,locationId,totalAlertCnt,locatinType,locationName);
								}
							}
						}
				        }
				},
				legend: {
						reversed: false,
						verticalAlign:'top',
						useHTML:true,
						labelFormatter: function () {return '<img src="Core/images/Nes_Papers_Small LOGO/'+this.name+'.png"  style="width:40px;"/>';}
						
						},
				credits: {
					enabled: false
				},
				series: mainJosnObjArr
			});
		 }else{
			 $("#"+divId).html("NO DATA AVAILABLE.");
		 }
		 if(divId == "constituencyLevelHighChartDivId"){
			 if(result != null && result.length > 15){
				$("#constituencyOvervwGraph").mCustomScrollbar();//{setHeight:'600px'}
				$("#constituencyOvervwGraph").css("height","600px");
		     }else{
				$("#constituencyOvervwGraph").css("height","auto");
			 } 
		 }
	}     
	
  function buildDistrictOrConstituencyImpactLevelTabularRsltPublicationWise(result,divId,locationType){
	 var str='';
	  str+='<div class="table-responsive">';
	 if(divId=="constituencyLevelTblDivId"){
		  str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="cnsttncyWsPublctnAlrtCntSmmryDataTblId">'; 
	 }else if(divId=="districtImpactLevelTblDivId"){
		   str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="dstrctWsPublctnAlrtCntSmmryDataTblId">';
	 }else{
		 str+='<table style="background-color:#EDEEF0;border:1px solid #ddd" class="table table-condensed table-bordered text_align_center" id="parliamentWsPublctnAlrtCntSmmryDataTblId">';
	 }
	 
		 str+='<thead>';
		 if(divId=="constituencyLevelTblDivId"){
				str+='<th>Constituency</th>';
		 }else if(divId=="districtImpactLevelTblDivId"){
			  str+='<th>District</th>';
		 }else{
			str+='<th>Parliament</th>';
		 }
		      
			   str+='<th>Total</th>';
		       if(result != null && result.length > 0){
				    if(result[0].subList != null && result[0].subList.length > 0){
						 for(var k in result[0].subList){
							str+='<th>'+result[0].subList[k].publicationName+'</th>';		 
						 }
					}
			   }
		str+='</thead>';
		 str+='<tbody>';
		  for(var i in result){
				str+='<tr>';
				str+='<td>'+result[i].name.toUpperCase()+'</td>';
				 if(result[i].totalAlertCnt > 0){
					str+='<td  style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" class="publicationCls" onClick="getAlertPublicationDetails(0,\''+result[i].id+'\',\''+result[i].totalAlertCnt+'\',\''+locationType+'\',\''+result[i].name+'\');" attr_location_level="'+result[i].name+'" attr_location_type="'+locationType+'" attr_alert_count="'+result[i].totalAlertCnt+'" attr_location_id = "'+result[i].id+'" attr_alert_publication_id="0" >'+result[i].totalAlertCnt+'</td>'; 
				}else{
				  str+='<td class="text-center">-</td>';      		
				} 
				if(result[i].subList != null && result[i].subList.length > 0){
					for(var j in result[i].subList){
							if(result[i].subList[j].totalAlertCnt > 0){
								str+='<td  style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" class="publicationCls" onClick="getAlertPublicationDetails(\''+result[i].subList[j].publicationId+'\',\''+result[i].id+'\',\''+result[i].subList[j].totalAlertCnt+'\',\''+locationType+'\',\''+result[i].name+'\');" attr_location_type="'+locationType+'" attr_alert_count="'+result[i].subList[j].totalAlertCnt+'" attr_location_level="'+result[i].name+'" attr_location_id = "'+result[i].id+'" attr_alert_publication_id="'+result[i].subList[j].publicationId+'"   >'+result[i].subList[j].totalAlertCnt+'</td>';      	
							}else{
								str+='<td class="text-center">-</td>';      	
							} 
					 }	
				}
				str+='</tr>';
			}
			 str+='</tbody>';
			 str+='</table>';
	      $("#"+divId).html(str);
		  str+='</div>';
			if(divId=="constituencyLevelTblDivId"){
				$("#cnsttncyWsPublctnAlrtCntSmmryDataTblId").dataTable({
					"aaSorting": [],
					"iDisplayLength" : 15,
					"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]			
				});   	
			}else if(divId == "districtImpactLevelTblDivId"){
				$("#dstrctWsPublctnAlrtCntSmmryDataTblId").dataTable({
					"aaSorting": [],
					"iDisplayLength" : 15,
					"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
				});   	
			}else{
				$("#parliamentWsPublctnAlrtCntSmmryDataTblId").dataTable({
					"aaSorting": [],
					"iDisplayLength" : 15,
					"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
				});
			}
		}
		
	function getAlertPublicationDetails(publicationId,locationIdStr,totalAlertCnt,loctionType,locationLevel){
		
		var locationIdStr = locationIdStr
		var loctionType = loctionType
		var districtIdArr =[];
		var constituencyId = 0;
		if(loctionType=="Constituency"){
			constituencyId = locationIdStr;  
		}else if(loctionType=="District"){
			 districtIdArr = locationIdStr.split(",");	
		}else if(loctionType=="Parliament"){
			constituencyId = locationIdStr;
		}
		var alertStatusId = 0;
		var isPublication = "true";
		buildDistrictWiseAlert(districtIdArr,totalAlertCnt,constituencyId,alertStatusId,locationLevel,loctionType,isPublication,publicationId);
	}	
	
	 $(document).on("click",".linkedArticlesClickId",function(){	 
			var temp=$(this).attr('src');
			$(this).attr('src',$(".mainImage").attr('src'));
			$(".mainImage").attr('src',temp);
		});
		
 /* New Ajax Call Based on New Design */
 
 /*Sorting script start */
 
 function getSortedDistrictInRequiredFormat(type){
	   var selectedLevel = $(".impactLevelCls").attr("attr_level");
	     $(".districtCollapseTblViewCls").removeClass("active");
	     $(".districtCollapseHIghChartViewCls").addClass("active");
		 $(".collapseTblViewCls").removeClass("active");
	     $(".collapseHIghChartViewCls").addClass("active");
		 $(".constituencyCollapseTblViewCls").removeClass("active");
	     $(".constituencyHighChartViewCls").addClass("active");
	     var districtId = $("#districtSelectBoxId").val();
		 var status="";
	     if(type=="Search"){
			$(".districtUl li").removeClass("active");
		    $(".districtUl li:first-child").addClass("active");	
			status = type;
			type = "Decending";
			
		}
	  var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	  if(selectedLevel == "Overview"){
		  if(status =="Search"){
			getDistrictImpactandItsSubLevelAlert(type,districtId,selectionType);
			getParliamentImpactandItsSubLevelAlert(type,0,districtId,selectionType); 			
			getCorpGMCAlert(districtId,selectionType);
			getConstituencyImpactandItsSubLevelAlert(type,0,districtId,selectionType); 
			getAssignGroupTypeAlertDtlsByImpactLevelWise(districtId);	  
		  }else{
			getDistrictImpactandItsSubLevelAlert(type,districtId,selectionType);  
		  }
	  }else if(selectedLevel == "Status"){
		   if(status =="Search"){
			 getTotalAlertGroupByLocationThenStatus(type,districtId); 
			 getGhmcImpactLevelAlertStatusWise(districtId);
			 getTotalAlertGroupByLocationThenStatusForParliament(type,0,districtId);
			 getConstituencyAlertStatusWise(type,0,districtId);
			 getAssignGroupTypeAlertDtlsByImpactLevelWise(districtId);
		  }else{
			getTotalAlertGroupByLocationThenStatus(type,districtId);  
		  }
		
	  }else if(selectedLevel == "Publication"){
		   if(status =="Search"){
			    getDistrictWisePublicationAlert(type,districtId);
				getParliamentWisePublicationAlert(type,0,districtId);				
				getCorpGHMCImpcatLevelAlertCntPublicationWise(districtId);
				getConstituencyWisePublicationAlert(type,0,districtId);
				getAssignGroupTypeAlertDtlsByImpactLevelWise(districtId); 
		   }else{
			   getDistrictWisePublicationAlert(type,districtId);    
		   }
	  }else if(selectedLevel == "Category"){
		  if(status =="Search"){
			 getTotalAlertGroupByLocationThenStatusIssueCategory(type,districtId); 
			 getGhmcImpactLevelAlertStatusWiseIssueCategory(districtId);
			 getTotalAlertGroupByLocationThenStatusForParliamentIssueCategory(type,0,districtId);
			 getConstituencyAlertStatusWiseIssueCategory(type,0,districtId);
			 getAssignGroupTypeAlertDtlsByImpactLevelWise(districtId);
		  }else{
			getTotalAlertGroupByLocationThenStatusIssueCategory(type,districtId);  
		  }		
	  } 
 }

function getSortedParliamentInRequiredFormat(type){
	$(".parliamentCollapseTblViewCls").removeClass("active");
	$(".parliamentCollapseHIghChartViewCls").addClass("active");
	var selectedLevel = $(".impactLevelCls").attr("attr_level");
	var parliamentId = $("#parliamentSelectBoxId").val();
	var districtId = $("#districtSelectBoxId").val();;
	if(type=="Search"){
		$(".parliamentUl li").removeClass("active");
		$(".parliamentUl li:first-child").addClass("active");
		type = "Decending";
	}
	var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	
	if(selectedLevel == "Overview"){
		getParliamentImpactandItsSubLevelAlert(type,parliamentId,districtId,selectionType);  
	}else if(selectedLevel == "Status"){             
		getTotalAlertGroupByLocationThenStatusForParliament(type,parliamentId,districtId)
	}else if(selectedLevel == "Publication"){
		getParliamentWisePublicationAlert(type,parliamentId,districtId)  
	}else if(selectedLevel == "Category"){
		getTotalAlertGroupByLocationThenStatusForParliamentIssueCategory(type,parliamentId,districtId) 
	}  
}
 
  function getSortedConstituencyInRequiredFormat(type){
	  $(".constituencyCollapseTblViewCls").removeClass("active");
	  $(".constituencyHighChartViewCls").addClass("active");
	    var selectedLevel = $(".impactLevelCls").attr("attr_level");
	    var constituencyId = $("#constituencySeletBoxId").val();
		var districtId = $("#districtSelectBoxId").val();;
	    if(type=="Search"){
			 $(".constituencyUl li").removeClass("active");
		     $(".constituencyUl li:first-child").addClass("active");
		     type = "Decending";
		}
		var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	  if(selectedLevel == "Overview"){
		 getConstituencyImpactandItsSubLevelAlert(type,constituencyId,districtId,selectionType);  
	  }else if(selectedLevel == "Status"){
		getConstituencyAlertStatusWise(type,constituencyId,districtId);
	  }else if(selectedLevel == "Publication"){
	    getConstituencyWisePublicationAlert(type,constituencyId,districtId);  
	  }else if(selectedLevel == "Category"){
		  getConstituencyAlertStatusWiseIssueCategory(type,constituencyId,districtId);
	  } 
 }
 /*End */

var globalStateLevelRslt; 
var globalDistrictLevelRlst;
var globalCorpGmcLevelRlst;
var globalConstituencyLevelRlst;
var globalParliamentLevelRlst;

 function stateLevelHighchartBuildingFunction(){
	  var selectedLevel = $(".impactLevelCls").attr("attr_level");
	  var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	  if(selectedLevel == "Overview"){
		 buildStateImpactLevelHighChartRslt(globalStateLevelRslt,selectionType);  
	  }else if(selectedLevel == "Status"){
		buildStateImpactLevelHighChartStatusWiseRslt(globalStateLevelRslt); 
	  }else if(selectedLevel == "Publication"){
	    buildStateOrGhmcImpactLevelHighChartRsltPublicationWise(globalStateLevelRslt,"stateImpactLevelHighChartDivId","StateImpactLevel");  
	  }else if(selectedLevel == "Category"){
		buildStateImpactLevelHighChartStatusWiseRslt(globalStateLevelRslt,"Category");   
	  }
 }
  function stateLevelTblBuildingFunction(){
	  var selectedLevel = $(".impactLevelCls").attr("attr_level");
	   var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	  if(selectedLevel == "Overview"){
		 buildStateImpactLevelTabularRslt(globalStateLevelRslt,selectionType);  
	  }else if(selectedLevel == "Status"){
		buildStateImpactLevelTabularRsltStatusWise(globalStateLevelRslt,"stateImpactLevelTblDivId","StateImpactLevel");
	  }else if(selectedLevel == "Publication"){
		buildStateOrGhmcImpactLevelTabularRsltPublicationWise(globalStateLevelRslt,"stateImpactLevelTblDivId","StateImpactLevel");  
	  }else if(selectedLevel == "Category"){
		  buildStateImpactLevelTabularRsltStatusWise(globalStateLevelRslt,"stateImpactLevelTblDivId","StateImpactLevel","Category");
	  }
 }
 
 function districtLevelHighchartBuildingFunction(){
	 var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	 var selectedLevel = $(".impactLevelCls").attr("attr_level");
	 var districtId = $("#districtSelectBoxId").val();
	  if(selectedLevel == "Overview"){
		  buildDistrictImpactLevelHighChartRslt(globalDistrictLevelRlst,districtId,selectionType);  
	  }else if(selectedLevel == "Status"){
		buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWise(globalDistrictLevelRlst,"districtImpactLevelHighChartDivId",districtId,"District");
	  }else if(selectedLevel == "Publication"){
	   buildDistrictOrConstituencyImpactLevelHighChartRsltPublicationWise(globalDistrictLevelRlst,"districtImpactLevelHighChartDivId",districtId,"District");  
	  }else if(selectedLevel == "Category"){
		  buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWiseIssueCategory(globalDistrictLevelRlst,"districtImpactLevelHighChartDivId",districtId,"District");
	  }
 }
  function districtLevelTblBuildingFunction(){
	   var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	   var selectedLevel = $(".impactLevelCls").attr("attr_level");
	  if(selectedLevel == "Overview"){
		  buildDistrictOrConstituencyImpactLevelTabularRslt(globalDistrictLevelRlst,"districtImpactLevelTblDivId","District",selectionType);  
	  }else if(selectedLevel == "Status"){
		buildDistrictOrConstituencyLevelRlstInTabularFormatStatusWise(globalDistrictLevelRlst,"District","districtImpactLevelTblDivId");
	  }else if(selectedLevel == "Publication"){
		buildDistrictOrConstituencyImpactLevelTabularRsltPublicationWise(globalDistrictLevelRlst,"districtImpactLevelTblDivId","District");  
	  }else if(selectedLevel == "Category"){
		  buildDistrictOrConstituencyLevelRlstInTabularFormatStatusWiseIssueCategory(globalDistrictLevelRlst,"District","districtImpactLevelTblDivId");
	  }
 }
 function gmcLevelHighchartBuildingFunction(){
	   var selectedLevel = $(".impactLevelCls").attr("attr_level");
	  if(selectedLevel == "Overview"){
		 buildCorpGmcImpactLevelHighChartRslt(globalCorpGmcLevelRlst);  
	  }else if(selectedLevel == "Status"){
		buildCorpGmcImpactLevelHighChartRsltStatusWise1(globalCorpGmcLevelRlst);
	  }else if(selectedLevel == "Publication"){
	    buildStateOrGhmcImpactLevelHighChartRsltPublicationWise(globalCorpGmcLevelRlst,"gmcImpactLevelHighChartDivId","GHMCImpactLevel");	  
	  }else if(selectedLevel == "Category"){
		  buildCorpGmcImpactLevelHighChartRsltStatusWise1(globalCorpGmcLevelRlst,"Category");
	  }
 }
  function gmcLevelTblBuildingFunction(){
	   var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	   var selectedLevel = $(".impactLevelCls").attr("attr_level");
	  if(selectedLevel == "Overview"){
		 buildCorpGmcImpactLevelTabularRslt(globalCorpGmcLevelRlst,"localElectionBody",selectionType);  
	  }else if(selectedLevel == "Status"){
		buildStateOrGhmcImpactLevelTabularRsltStatusWise(globalCorpGmcLevelRlst,"gmcImpactLevelTblDivId","GHMCImpactLevel"); 
	  }else if(selectedLevel == "Publication"){
		buildStateOrGhmcImpactLevelTabularRsltPublicationWise(globalCorpGmcLevelRlst,"gmcImpactLevelTblDivId","GHMCImpactLevel");  
	  }else if(selectedLevel == "Category"){
		  buildStateOrGhmcImpactLevelTabularRsltStatusWise(globalCorpGmcLevelRlst,"gmcImpactLevelTblDivId","GHMCImpactLevel","Category"); 
	  }
 }
 function constituencyLevelHighchartBuildingFunction(){
	   var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	   var selectedLevel = $(".impactLevelCls").attr("attr_level");
	    var constituencyId = $("#constituencySeletBoxId").val();
	  if(selectedLevel == "Overview"){
		 buildConstituencyImpactLevelHighChartRslt(globalConstituencyLevelRlst,constituencyId,selectionType);  
	  }else if(selectedLevel == "Status"){
		buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWise(globalConstituencyLevelRlst,"constituencyLevelHighChartDivId",constituencyId,"Constituency"); 
	  }else if(selectedLevel == "Publication"){
		buildDistrictOrConstituencyImpactLevelHighChartRsltPublicationWise(globalConstituencyLevelRlst,"constituencyLevelHighChartDivId",constituencyId,"Constituency");  
	  }else if(selectedLevel == "Category"){
		  buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWiseIssueCategory(globalConstituencyLevelRlst,"constituencyLevelHighChartDivId",constituencyId,"Constituency"); 
	  }
 }
  function constituencyTblBuildingFunction(){
	    var selectedLevel = $(".impactLevelCls").attr("attr_level");
		var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	  if(selectedLevel == "Overview"){
		 buildDistrictOrConstituencyImpactLevelTabularRslt(globalConstituencyLevelRlst,"constituencyLevelTblDivId","Constituency",selectionType);  
	  }else if(selectedLevel == "Status"){
		 buildDistrictOrConstituencyLevelRlstInTabularFormatStatusWise(globalConstituencyLevelRlst,"Constituency","constituencyLevelTblDivId"); 
	  }else if(selectedLevel == "Publication"){
		buildDistrictOrConstituencyImpactLevelTabularRsltPublicationWise(globalConstituencyLevelRlst,"constituencyLevelTblDivId","Constituency");  
	  }else if(selectedLevel == "Category"){
		 buildDistrictOrConstituencyLevelRlstInTabularFormatStatusWiseIssueCategory(globalConstituencyLevelRlst,"Constituency","constituencyLevelTblDivId");
		
	}
 }
function getStateImpactandItsSubLevelAlert(selectionType){
	    $(".stateImpactLevelBlockCls").show();
		$("#stateImpactLevelHighChartDivId").html(spinner);
       
		var level = "impact";
		 if(selectionType=="locationWise"){
			 level="location"
		 }
		$("#stateOverviewHeadingId").html("state overview - "+level+" alerts");
		
		var editionId = 0;
		var alertId = 1;
		var impactScopeArr = [];
		if(selectionType=="impactScopeWise"){
			impactScopeArr = globalImpactScopeArr;
		}else if(selectionType=="locationWise"){
			impactScopeArr =[2,3,4,5,6,7,8,11];
		}
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		impactScopeArr,
			alertTypeId	:		alertId,
			editionIds:			editionId,
			alertStatusIds:		globalAlertStatusArr,
			selectionType:		selectionType,
			alertCategoryIds:alertCategoryArr
		};
		 $.ajax({
            url: "getStateImpactandItsSubLevelAlertDetails",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalStateLevelRslt = result;
				   if(result != null && result.subList1 != null && result.subList1.length > 0){
					   buildStateImpactLevelHighChartRslt(result,selectionType);
				   }else{
					   $(".stateImpactLevelBlockCls").hide();  
				   }
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	
	function buildStateImpactLevelHighChartRslt(result,selectionType){
		if(result.subList1 != null && result.subList1.length > 0){
			var impactLevelColorObj =  {"1":"#967BDC","2":"#51D9B1","3":"#34CCFD","8":"#1062FB","5":"#009662","7":"#FC690D"};	
			var locationLevelColorObj =  {"2":"#967BDC","3":"#51D9B1","4":"#34CCFD","7":"#1062FB","5":"#009662","6":"#FC690D"};	
			var jsonObjArr = [];
			var colorArr = [];
			
			for(var i in result.subList1){
				jsonObjArr.push({"name":result.subList1[i].name,"data":[{y:result.subList1[i].alertCount,extra: result.subList1[i].id+"-"+selectionType}]});
				 if(selectionType=="impactScopeWise"){
					colorArr.push(impactLevelColorObj[result.subList1[i].id]);	
				 }else if(selectionType=="locationWise"){
					colorArr.push(locationLevelColorObj[result.subList1[i].id]); 
				 }
				
			}
			var getWidth = $("#stateOvervwGraph").width();
			$("#stateImpactLevelHighChartDivId").css("width",getWidth);	
			 $("#stateImpactLevelHighChartDivId").highcharts({
				 colors:colorArr,
				chart: {
					type: 'bar'
				},
				title: {
					text: null
				},
				xAxis: {
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					categories: ['']
				},
				yAxis: {
						min: 0,
						gridLineWidth: 0,
						minorGridLineWidth: 0,
						 title: {
							text: null
						},
						 stackLabels: {
						enabled: true,
						
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						},
						formatter: function() {
                        return  (this.total);
                    },
					}
				},
				legend: {
					reversed: false,
					verticalAlign:'top'
				},
				 tooltip: {
					 formatter: function() {
                        return  (this.series.name)+" - "+(this.y);
                    },
					//headerFormat: '<b>{series.name}</b><br/>',
					//pointFormat: '{point.y}'
				},
				 plotOptions: {
					bar: {
						stacking: 'normal',
						dataLabels: {
							enabled: false,
							 formatter: function() {
								if (this.y === 0) {
									return null;
								} else {
									return Highcharts.numberFormat(this.y,0);      
								}
							}
						},
						
					},
					  series: {
						 cursor: 'pointer',
						 events: {
							click: function (event) {
								var impactLevelId=this.data[0].options.extra.split("-")[0];
								var levelType=this.data[0].options.extra.split("-")[1];
								getImpactLevelWiseAlertDtls(impactLevelId,this.data[0].options.y,levelType);
							}
						}
					}
				},
				series: jsonObjArr
			});
		}else{
		 $("#stateImpactLevelHighChartDivId").html("NO DATA AVAILABLE.");	
		}
	}
	function buildStateImpactLevelTabularRslt(result,selectionType){
	  var str= '';
	   if(result.subList1 != null && result.subList1.length > 0){
		   str+='<div class="table-responsive">';
			str+='<table class="table table-bordered text_align_center">';
				str+='<thead class="bg_ED">';
				str+='<th>TOTAL</th>';
				for(var i in result.subList1){
					str+='<th>'+result.subList1[i].name+'</th>';
				}
				str+='</thead>';
				str+='<tbody>';
				str+='<tr>';
				str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getImpactLevelWiseAlertDtls(0,\''+result.alertCount+'\',\''+selectionType+'\');">'+result.alertCount+'</td>';
				for(var j in result.subList1){
					 if(result.subList1[j].alertCount > 0){
						str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getImpactLevelWiseAlertDtls(\''+result.subList1[j].id+'\',\''+result.subList1[j].alertCount+'\',\''+selectionType+'\');">'+result.subList1[j].alertCount+'</td>';	
					 }else{
					str+='<td style="text-align:center;">-</td>';	 
					 }
					
				}
				str+='</tr>';
			str+='</table>';
		str+='</div>'
	   }else{
		 str+='NO DATA AVAILABLE';  
	   }
	   $("#stateImpactLevelTblDivId").html(str);
	}
	
	function getDistrictImpactandItsSubLevelAlert(sortingType,districtId,selectionType){
		
		/*Hiding Block if impact Level is not selected*/
		$(".districtImpactLevelBlockCls").show();
		console.log(globalDistrictImpactLevelScopeArr);
		if(globalDistrictImpactLevelScopeArr == null || globalDistrictImpactLevelScopeArr.length == 0){
			$(".districtImpactLevelBlockCls").hide();
			return;
		}
		$("#districtImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		
		var editionId =0;
		
		
		var level = "impact";
		 if(selectionType=="locationWise"){
			 level="location"
		 }
		 
		$("#districtOverviewHeadingId").html("District overview - "+level+" alerts");
		
		
		var impactScopeArr = [];
		if(selectionType=="impactScopeWise"){
			impactScopeArr = globalDistrictImpactLevelScopeArr;
		}else if(selectionType=="locationWise"){
			impactScopeArr =[3,4,5,6,7,8,11];
		}
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			activityMemberId : "44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		impactScopeArr,
			alertTypeId : 		alertId,
			editionIds : 		editionId,
			alertStatusIds :    globalAlertStatusArr,
			resultType : 		"District",
			locationValue : 	districtId,
			sortingType : 		sortingType,
			districtId : 		0,
			selectionType : 	selectionType,
			alertCategoryIds:	alertCategoryArr
		};
		
		$.ajax({
            url: "getDistrictOrConstituencyImpactandItsSubLevelAlert",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	  globalDistrictLevelRlst = result;
				   if(result != null && result.subList1 != null && result.subList1.length > 0){
					   buildDistrictImpactLevelHighChartRslt(result,districtId,selectionType);
				   }else{
					  $(".districtImpactLevelBlockCls").hide();  
				   }
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	
	function buildDistrictImpactLevelHighChartRslt(result,districtId,selectionType){
		 if(result.subList1 != null && result.subList1.length > 0){
			 var districtNameArr = [];
			 var str='';
			 str+='<option value="0">All</option>';
			 for(var i in result.subList1){
				   districtNameArr.push(result.subList1[i].name);
				   str+='<option value="'+result.subList1[i].id+'">'+result.subList1[i].name.toUpperCase()+'</option>';
			 }
			 if(districtId == 0){ // Building district for searching first time only
				  $("#districtSelectBoxId").val(' ');
		          $("#districtSelectBoxId").html(str);
			 }
		    
			 var districtImpactArr = [];
			 var corpGhmcImpactArr = [];
			 var constituencyImpactArr = [];
			 var parliamentImpactArr = [];
			 var mndlMuncpltyImprArr = [];
			 var vllgWrdPnchytImpctArr = [];
			 for(var i in result.subList1){
				 for(var j in result.subList1[i].subList1){
					 if(selectionType != null && selectionType=="impactScopeWise"){
						  if(result.subList1[i].subList1[j].id==2){
							districtImpactArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						  }else if(result.subList1[i].subList1[j].id==8){
							corpGhmcImpactArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});  
						  }else if(result.subList1[i].subList1[j].id==3){
							 constituencyImpactArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
						  }else if(result.subList1[i].subList1[j].id==4){
							 parliamentImpactArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
						  }else if(result.subList1[i].subList1[j].id==5){
							  mndlMuncpltyImprArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						  }else if(result.subList1[i].subList1[j].id==7){
							 vllgWrdPnchytImpctArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
						  }
					 }else if(selectionType != null && selectionType=="locationWise"){
						 if(result.subList1[i].subList1[j].id==3){
							districtImpactArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						  }else if(result.subList1[i].subList1[j].id==4){
							 constituencyImpactArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
						  }else if(result.subList1[i].subList1[j].id==10){
							 parliamentImpactArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
						  }else if(result.subList1[i].subList1[j].id==5){
							  mndlMuncpltyImprArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						  }else if(result.subList1[i].subList1[j].id==6){
							 vllgWrdPnchytImpctArr.push({"y":result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-District"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
						  } 
					 }
					 
				 }
			 }
			
			var mainJosnObjArr = [];
			if(districtImpactArr != null && districtImpactArr.length > 0){
				mainJosnObjArr.push({name:'DISTRICT',data:districtImpactArr,color:"#51D9B1"});  
			}
			if(corpGhmcImpactArr != null && corpGhmcImpactArr.length > 0){
				mainJosnObjArr.push({name:'CORP-GMC',data:corpGhmcImpactArr,color:"#1062FB"});  
			}
			if(parliamentImpactArr != null && parliamentImpactArr.length > 0){
				mainJosnObjArr.push({name:'PARLIAMENT',data:parliamentImpactArr,color:"#728C00"});  
			}
			if(constituencyImpactArr != null && constituencyImpactArr.length > 0){
				mainJosnObjArr.push({name:'CONSTITUENCY',data:constituencyImpactArr,color:"#34CCFD"});  
			}
			if(mndlMuncpltyImprArr != null && mndlMuncpltyImprArr.length > 0){
				mainJosnObjArr.push({name:'MANDAL/MUNICIPALITY',data:mndlMuncpltyImprArr,color:"#009662"});  
			}
			if(selectionType != null && selectionType=="impactScopeWise"){
				if(vllgWrdPnchytImpctArr != null && vllgWrdPnchytImpctArr.length > 0){
					mainJosnObjArr.push({name:'VILLAGE/WARD/PANCHAYAT',data:vllgWrdPnchytImpctArr,color:"#FC690D"});  
				}
			}else if(selectionType != null && selectionType=="locationWise"){
				if(vllgWrdPnchytImpctArr != null && vllgWrdPnchytImpctArr.length > 0){
					mainJosnObjArr.push({name:'VILLAGE/WARD/HAMLET',data:vllgWrdPnchytImpctArr,color:"#FC690D"});  
				}  
			}
			  var getWidth = $("#districtOvervwGraph").width();
			  $("#districtImpactLevelHighChartDivId").height(650);	
			  $("#districtImpactLevelHighChartDivId").css("width",getWidth);	
			  $("#districtImpactLevelHighChartDivId").highcharts({
				chart: {
					type: 'column'
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
					categories: districtNameArr,
					title: {
						text: null
					},
					labels: {
						//rotation: -45,
						style: {
							fontSize: '11px',
							fontFamily: '"Lucida Grande","Lucida Sans Unicode",Arial,Helvetica,sans-serif',
							textTransform: "uppercase"
						}
					}
				},
				yAxis: {
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					title: {
						text: '',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					},
					 stackLabels: {
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						},
						formatter: function() {
                        return  (this.total);
                    },
					}
				},
				tooltip: {
					valueSuffix: ' ',
					shared:true
					
				},
				plotOptions: {
					column: {
					stacking: 'normal',
						dataLabels: {
							align: "center",
							x:-8,
							enabled: false,
							 formatter: function() {
								if (this.y === 0) {
									return null;
								} else {
									return Highcharts.numberFormat(this.y,0);      
								}
							}
						}
					},
					series: {
							cursor: 'pointer',
							point: {
								events: {
									click: function () {
										var distInfo = (this.extra).split("-");
										var districtId = distInfo[0];
										var totalAlertCnt = distInfo[1];
										var locationType = distInfo[2];
										var impactScopeId = distInfo[3];
										var selectionType = distInfo[4];
										getLocationWiseAlertDtls(districtId,totalAlertCnt,locationType,impactScopeId,selectionType);
									}
								}
							}
						}
				},
				legend: {
						reversed: false,
						verticalAlign:'top'
						},
				credits: {
					enabled: false
				},
				series: mainJosnObjArr
			});
		 }else{
			 $("#districtImpactLevelHighChartDivId").html("NO DATA AVAILABLE.");
		 }
	}
	
	
	function buildDistrictOrConstituencyImpactLevelTabularRslt(result,divId,locationType,selectionType){
		var str= '';
		if(result.subList1 != null && result.subList1.length > 0){
			var impactLevelObj = result.subList1[0].subList1;
			str+='<div class="table-responsive">';
		    if(divId=="constituencyLevelTblDivId"){
				str+='<table class="table table-bordered text_align_center" id="constituencyLevelDataTblId">';	
			}else if(divId=="districtImpactLevelTblDivId"){
				str+='<table class="table table-bordered text_align_center" id="DistrictLevelDataTblId">';	
			}else{
				str+='<table class="table table-bordered text_align_center" id="ParliamentLevelDataTblId">';
			}
			str+='<thead class="bg_ED">';
			if(divId=="constituencyLevelTblDivId"){
				str+='<th>Constituency</th>';
			}else if(divId=="districtImpactLevelTblDivId"){
				str+='<th>District</th>';
			}else{
				str+='<th>Parliament</th>';   
			}
				
			str+='<th>Total</th>';
			for(var i in impactLevelObj){
				str+='<th>'+impactLevelObj[i].name+'</th>';
			}
			str+='</thead>';
			str+='<tbody>';
			for(var i in result.subList1){
				str+='<tr>';
				str+='<td>'+result.subList1[i].name.toUpperCase()+'</td>';
				if(result.subList1[i].totalAlertCnt > 0){
					str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getLocationWiseAlertDtls(\''+result.subList1[i].id+'\',\''+result.subList1[i].totalAlertCnt+'\',\''+locationType+'\',0,\''+selectionType+'\');">'+result.subList1[i].totalAlertCnt+'</td>';	  
				}else{
					str+='<td style="text-align:center;">-</td>';	  
				}
				for(var j in result.subList1[i].subList1){
					if(result.subList1[i].subList1[j].alertCount > 0){
						str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getLocationWiseAlertDtls(\''+result.subList1[i].id+'\',\''+result.subList1[i].subList1[j].alertCount+'\',\''+locationType+'\',\''+result.subList1[i].subList1[j].id+'\',\''+selectionType+'\');">'+result.subList1[i].subList1[j].alertCount+'</td>';	 	
					}else{
						str+='<td  style="text-align:center;"> - </td>';	  
					}
				}
			}
				str+='</tr>';
				str+='</table>';
			str+='</div>'
		}else{
			str+='NO DATA AVAILABLE';  
		}
		$("#"+divId).html(str);
		if(divId=="constituencyLevelTblDivId"){
			$("#constituencyLevelDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
			});   
		}else if(divId=="districtImpactLevelTblDivId"){
			$("#DistrictLevelDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
			});   
		}else{
			$("#ParliamentLevelDataTblId").dataTable({
				"aaSorting": [],
				"iDisplayLength" : 15,
				"aLengthMenu": [[10,15,20,30,50, 100, -1], [10,15,20,30,50, 100, "All"]]
			});
		}
	}
	function getCorpGMCAlert(districtId,selectionType){
		$(".gmcImpactLevelBlockCls").show();	
		/*Hiding Block if impact Level is not selected*/
		if(globalCorpGhmcImpactScopeSArr == null || globalCorpGhmcImpactScopeSArr.length == 0){
			$(".gmcImpactLevelBlockCls").hide();
			 return;
		}
		$("#gmcImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		
		var editionId = 0;
		
		
		 var level = "impact";
		 if(selectionType=="locationWise"){
			 level="location"
		 }
		$("#corpOverviewHeadingId").html("CORP-GMC overview - "+level+" alerts");
		
	    var impactScopeArr = [];
		if(selectionType=="impactScopeWise"){
			impactScopeArr = globalCorpGhmcImpactScopeSArr;
		}else if(selectionType=="locationWise"){
			impactScopeArr =[7];
		}
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			activityMemberId : "44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		impactScopeArr,
			alertTypeId : 		alertId,
			editionIds : 		editionId,
			alertStatusIds :    globalAlertStatusArr,
			districtId		:districtId,
			selectionType : 	selectionType,
			alertCategoryIds:	alertCategoryArr
		};
		
		$.ajax({
            url: "getCorpGMCAlert",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	  globalCorpGmcLevelRlst = result;
					if(result != null && result.subList1 != null && result.subList1.length > 0){
						buildCorpGmcImpactLevelHighChartRslt(result,selectionType);
					}else{
						$(".gmcImpactLevelBlockCls").hide();
					}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
			
	}
	
	function buildCorpGmcImpactLevelHighChartRslt(result,selectionType){  
		var corpGmcImparArr = [];
		 if(result.subList1.length ==1){
			 if(result.subList1[0].id==0){
				$(".gmcImpactLevelBlockCls").hide(); 
			 }
		 }
	  	if(result.subList1 != null && result.subList1.length > 0){
			for(var i in result.subList1){
				if(result.subList1[i].id ==0)
					continue;
				var obj1 = {
					name: result.subList1[i].name,
					y: result.subList1[i].alertCount,
					extra:result.subList1[i].id+"-"+selectionType       
				};
				corpGmcImparArr.push(obj1);
			}	
		}
		var getWidth = $("#corpGmcOvervwGraph").width();
		$("#gmcImpactLevelHighChartDivId").css("width",getWidth);	
	    $("#gmcImpactLevelHighChartDivId").highcharts({  
				colors: ['#53BF8B'],    
				chart: {
					type: 'column'
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
					
					type: 'category',
					labels: {
								formatter: function() {
									if(this.value.toString()>=10){
										return this.value.toString().substring(0, 10)+'...';
									}else{
										return this.value;
									}
									
								},
								style: {
									fontSize: '11px',
									fontFamily: '"Lucida Grande","Lucida Sans Unicode",Arial,Helvetica,sans-serif',
									textTransform: "uppercase"
								}
							},
							
				},
				yAxis: {
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					title: {
						text: ''
					},
					labels: {
						enabled:false
					},
					 stackLabels: {
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						},
						formatter: function() {
                        return  (this.total);
                    },
					}
				},
				legend: {
					enabled: false
				},	
				plotOptions: {
					column: {
						stacking: 'normal',
						dataLabels: {
							enabled: false,
							 formatter: function() {
								if (this.y === 0) {
									return null;
								} else {
									return Highcharts.numberFormat(this.y,0);      
								}
							}
						}
					},
					series: {
						cursor: 'pointer',
						point: {
							events: {
								click: function () {
									var localElectionBodyId = this.extra.split("-")[0];
									var selectionType = this.extra.split("-")[1];
									var totalAlertCnt = this.y;
									var scopeId = 0;
									if(selectionType=="impactScopeWise"){
										scopeId = 8;
									}else if(selectionType=="locationWise"){
										scopeId = 7;
									}
									getLocationWiseAlertDtls(localElectionBodyId,totalAlertCnt,'localElectionBody',scopeId,selectionType);
								}
							}
						}  
				     },
				},
				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>'
				},
			 	series: [{    
					name: 'Number Of Alerts',    
					data: corpGmcImparArr
				}],
			 
			});  
	}
	
	function buildCorpGmcImpactLevelTabularRslt(result,locationType,selectionType){
	  var str= '';
	  var scopeId =0;
	  if(selectionType == "impactScopeWise"){
		  scopeId = 8;
	  }else if(selectionType == "locationWise"){
		  scopeId = 7;
	  }
	   if(result.subList1 != null && result.subList1.length > 0){
		   var impactLevelObj = result.subList1[0].subList1;
		   str+='<div class="table-responsive">';
			str+='<table class="table table-bordered text_align_center">';
				str+='<thead class="bg_ED text-capital">';
				str+='<th style="text-align:center;">CORP-GMC</th>';
				str+='<th style="text-align:center;">Total</th>';
				str+='</thead>';
				str+='<tbody>';
				 for(var i in result.subList1){
				  if(result.subList1[i].id ==0)
					continue;
				  str+='<tr>';
				  str+='<td style="text-align:center;">'+result.subList1[i].name+'</td>';
				  if(result.subList1[i].alertCount > 0){
					str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getLocationWiseAlertDtls(\''+result.subList1[i].id+'\',\''+result.subList1[i].alertCount+'\',\''+locationType+'\',\''+scopeId+'\',\''+selectionType+'\');">'+result.subList1[i].alertCount+'</td>';  
				  }else{
					str+='<td style="text-align:center;">-</td>';  
				  }
				  str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>'
	   }else{
		 str+='NO DATA AVAILABLE';  
	   }
	   $("#gmcImpactLevelTblDivId").html(str);
	}
	function getConstituencyImpactandItsSubLevelAlert(sortingType,constituencyId,districtId,selectionType){
		/*Hiding Block if impact Level is not selected*/
		$(".constituencyImpactLevelBlockCls").show();	
		if(globalConstituencyImpactScopeArr == null || globalConstituencyImpactScopeArr.length == 0){
			$(".constituencyImpactLevelBlockCls").hide();
			return;
		}
	  $("#constituencyLevelHighChartDivId").html(spinner);
		var alertId = 1;
		
		var editionId = 0;
		
		 var level = "impact";
		 if(selectionType=="locationWise"){
			 level="location"
		 }
		$("#constituencyOverviewHeadingId").html("Constituency overview - "+level+" alerts");
		var impactScopeArr = [];
		if(selectionType=="impactScopeWise"){
			impactScopeArr = globalConstituencyImpactScopeArr;
		}else if(selectionType=="locationWise"){
			impactScopeArr =[4,5,6,7,8,11];
		}
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		impactScopeArr,
			alertTypeId	:		alertId,
			editionIds:			editionId,
			alertStatusIds:		globalAlertStatusArr,
			locationValue  	:	constituencyId,	
			sortingType		:	sortingType,
			resultType      :	"Constituency",
			districtId      :	districtId,
			selectionType:		selectionType,
			alertCategoryIds:alertCategoryArr
		};
		 $.ajax({
            url: "getDistrictOrConstituencyImpactandItsSubLevelAlert",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	 globalConstituencyLevelRlst = result;
				if(result != null && result.subList1!= null && result.subList1.length>0){
				   buildConstituencyImpactLevelHighChartRslt(result,constituencyId,selectionType);	
				}else{
					$(".constituencyImpactLevelBlockCls").hide();
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}

	function getParliamentImpactandItsSubLevelAlert(sortingType,constituencyId,districtId,selectionType){
		/*Hiding Block if impact Level is not selected*/
		$(".parliamentImpactLevelBlockCls").show();	
		if(globalPaliamentImpactLevelScopeArr == null || globalPaliamentImpactLevelScopeArr.length == 0){
			$(".parliamentImpactLevelBlockCls").hide();
			return;
		}
		$("#parliamentImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		
		var editionId =0;
		
		var level = "impact";
		if(selectionType=="locationWise"){
			level="location"
		}
		$("#parliamentOverviewHeadingId").html("Parliament overview - "+level+" alerts");
		var impactScopeArr = [];
		if(selectionType=="impactScopeWise"){
			impactScopeArr = globalPaliamentImpactLevelScopeArr;
		}else if(selectionType=="locationWise"){
			impactScopeArr =[4,5,6,7,8,11];
		}
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			activityMemberId : "44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		impactScopeArr,
			alertTypeId : 		alertId,
			editionIds : 		editionId,
			alertStatusIds :    globalAlertStatusArr,
			locationValue : 	districtId,
			sortingType : 		sortingType,
			resultType : 		"Parliament",
			districtId : 		0,
			selectionType : 	selectionType,
			alertCategoryIds:	alertCategoryArr
		};
		$.ajax({
            url: "getDistrictOrConstituencyImpactandItsSubLevelAlert",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	  globalParliamentLevelRlst = result;
					if(result != null && result.subList1!= null && result.subList1.length>0){
					   buildParliamentImpactLevelHighChartRslt(result,constituencyId,selectionType);	
					}else{
						$(".parliamentImpactLevelBlockCls").hide();
					}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	
	function buildConstituencyImpactLevelHighChartRslt(result,constituencyId,selectionType){
		   if(result.subList1!= null && result.subList1.length > 10){
				var highChartDivHight = result.subList1.length*40;
				$("#constituencyLevelHighChartDivId").height(highChartDivHight);
			}else{
				$("#constituencyLevelHighChartDivId").height(250);		
			}
		 if(result.subList1 != null && result.subList1.length > 0){
			 var str = '';
			 str+='<option value="0">All</option>';
			  var constituencyName = [];
			 for(var i in result.subList1){
				 constituencyName.push(result.subList1[i].name);
				 str+='<option value="'+result.subList1[i].id+'">'+result.subList1[i].name+'</option>';
			 }
			 if(constituencyId == 0){
			    $("#constituencySeletBoxId").val('');//building first time only constituency for searching type
                $("#constituencySeletBoxId").html(str);	 
			 }
			
			 var constituencyImpactArr = [];
			 var mndlMuncpltyImprArr = [];
			 var vllgWrdPnchytImpctArr = [];
			 for(var i in result.subList1){
				 for(var j in result.subList1[i].subList1){
					 if(selectionType!= null && selectionType=="impactScopeWise"){
						   if(result.subList1[i].subList1[j].id==3){
							if(result.subList1[i].subList1[j].alertCount >= 0){
							 constituencyImpactArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Constituency"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
							}
						  }else if(result.subList1[i].subList1[j].id==5){
							  if(result.subList1[i].subList1[j].alertCount >= 0){
							  mndlMuncpltyImprArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Constituency"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
							  }
						  }else if(result.subList1[i].subList1[j].id==7){
							if(result.subList1[i].subList1[j].alertCount >= 0){
						  vllgWrdPnchytImpctArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Constituency"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
							}					  
						  }
					 }else if(selectionType != null && selectionType=="locationWise"){
						  if(result.subList1[i].subList1[j].id==4){
							if(result.subList1[i].subList1[j].alertCount >= 0){
							   constituencyImpactArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Constituency"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
							}
						  }else if(result.subList1[i].subList1[j].id==5){
							  if(result.subList1[i].subList1[j].alertCount >= 0){
							    mndlMuncpltyImprArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Constituency"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
							  }
						  }else if(result.subList1[i].subList1[j].id==6){
							if(result.subList1[i].subList1[j].alertCount >= 0){
						      vllgWrdPnchytImpctArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Constituency"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
							}					  
						  }  
					 }
				 }
			 }
		       var mainJosnObjArr = [];
			   if(constituencyImpactArr != null && constituencyImpactArr.length > 0){
				 mainJosnObjArr.push({name:'CONSTITUENCY',data:constituencyImpactArr,color:"#34CCFD"});  
			  }
			   if(mndlMuncpltyImprArr != null && mndlMuncpltyImprArr.length > 0){
				 mainJosnObjArr.push({name:'MANDAL/MUNICIPALITY',data:mndlMuncpltyImprArr,color:"#059E69"});  
			  }
			  if(selectionType != null && selectionType=="impactScopeWise"){
				  if(vllgWrdPnchytImpctArr != null && vllgWrdPnchytImpctArr.length > 0){
				   mainJosnObjArr.push({name:'VILLAGE/WARD/PANCHAYAT',data:vllgWrdPnchytImpctArr,color:"#FE6406"}); 
				  }				  
			  }else if(selectionType != null && selectionType=="locationWise"){
				   if(vllgWrdPnchytImpctArr != null && vllgWrdPnchytImpctArr.length > 0){
				    mainJosnObjArr.push({name:'VILLAGE/WARD/HAMLET',data:vllgWrdPnchytImpctArr,color:"#FE6406"});  
			        } 
			  }
			 
			  var getWidth = $("#constituencyOvervwGraph").width();
			  $("#constituencyLevelHighChartDivId").css("width",getWidth);	
			  $("#constituencyLevelHighChartDivId").highcharts({
				chart: {
					type: 'bar'
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
					categories: constituencyName,
					title: {
						text: null
					},
					
				},
				yAxis: {
					min: 0,
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					title: {
						text: '',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					},
					 stackLabels: {
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						},
						formatter: function() {
                        return  (this.total);
                    },
					}
				},
				tooltip: {
					valueSuffix: ' ',
					shared:true
				},
				plotOptions: {
					bar: {
					stacking: 'normal',
						dataLabels: {
							align:"center",
							x:5,
							y:-5,
							enabled: false,
							 formatter: function() {
								if (this.y === 0) {
									return null;
								} else {
									return Highcharts.numberFormat(this.y,0);      
								}
							}
						}
					},
					series: {
							cursor: 'pointer',
							point: {
								events: {
									click: function () {
										var constituencyInfo = (this.extra).split("-");
										var constituencyId = constituencyInfo[0];
										var totalAlertCnt = constituencyInfo[1];
										var locationType = constituencyInfo[2];
										var impactScopeId = constituencyInfo[3];
										var selectionType = constituencyInfo[4];
										getLocationWiseAlertDtls(constituencyId,totalAlertCnt,locationType,impactScopeId,selectionType);
									}
								}
							}
						}
					
				},
				legend: {
						reversed: true,
						verticalAlign:'top'
						},
				credits: {
					enabled: false
				},
				series: mainJosnObjArr
			});
		 }else{
			 $("#constituencyLevelHighChartDivId").html("NO DATA AVAILABLE.");
		 }
			if(result.subList1!= null && result.subList1.length > 15){
				$("#constituencyOvervwGraph").mCustomScrollbar();//{setHeight:'600px'}
				$("#constituencyOvervwGraph").css("height","600px");
			}else{
				$("#constituencyOvervwGraph").css("height","auto");
			}
	}
	
 function getGhmcImpactLevelAlertStatusWise(districtId){
	   /*Hiding Block if impact Level is not selected*/
	      $(".gmcImpactLevelBlockCls").show();	
		if(globalCorpGhmcImpactScopeSArr == null || globalCorpGhmcImpactScopeSArr.length == 0){
			$(".gmcImpactLevelBlockCls").hide();
			 return;
		}
		$("#gmcImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		
		var editionId =0;
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		$("#corpOverviewHeadingId").html("CORP-GMC overview - impact alerts");
		
		var json={  
			activityMemberId : "44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalCorpGhmcImpactScopeSArr,
			alertTypeId : 		alertId,
			editionIds : 		editionId,
			alertStatusIds :    globalAlertStatusArr,
			districtId : 		0,
			alertCategoryIds:	alertCategoryArr
			
			
		};
		$.ajax({
            url: "getStateOrGhmcImpactLevelAlertStatusWise",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	 globalCorpGmcLevelRlst = result;
					if(result != null && result.categoryList != null && result.categoryList.length > 0){
					  //buildCorpGmcImpactLevelHighChartRsltStatusWise(result);	
					  buildCorpGmcImpactLevelHighChartRsltStatusWise1(result);
					}else{
					  $(".gmcImpactLevelBlockCls").hide();		
					}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
			
	}
	
	function getGhmcImpactLevelAlertStatusWiseIssueCategory(districtId){
	   /*Hiding Block if impact Level is not selected*/
	      $(".gmcImpactLevelBlockCls").show();	
		if(globalCorpGhmcImpactScopeSArr == null || globalCorpGhmcImpactScopeSArr.length == 0){
			$(".gmcImpactLevelBlockCls").hide();
			 return;
		}
		$("#gmcImpactLevelHighChartDivId").html(spinner);
		var alertId = 1;
		
		var editionId = 0;
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");

		$("#corpOverviewHeadingId").html("CORP-GMC overview - impact alerts");
		
		
		var json={  
			activityMemberId : "44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalCorpGhmcImpactScopeSArr,
			alertTypeId : 		alertId,
			editionIds : 		editionId,
			alertStatusIds :    globalAlertStatusArr,
			districtId : 		0,
			alertCategoryIds:	alertCategoryArr
			
			
		};
		$.ajax({
            url: "getStateWiseAlertIssueCategoryDetails",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	 globalCorpGmcLevelRlst = result;
				// if(result.alertCount == 0){
				  // $(".gmcImpactLevelBlockCls").hide();	
				// }
				if(result != null && result.categoryList != null && result.categoryList.length > 0){
				  //buildCorpGmcImpactLevelHighChartRsltStatusWise(result);	
				  buildCorpGmcImpactLevelHighChartRsltStatusWise1(result,"Category");
				}else{
				  $(".gmcImpactLevelBlockCls").hide();		
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	
	
	function buildCorpGmcImpactLevelHighChartRsltStatusWise1(result,tabType){
		if(result != null && result.categoryList.length > 10){
			var highChartDivHight = result.categoryList.length*40;
			$("#gmcImpactLevelHighChartDivId").height(highChartDivHight);
		}else{
			$("#gmcImpactLevelHighChartDivId").height(400);		
		}
		var locationType ="GHMCImpactLevel"	
		if(result != null && result.categoryList.length > 0){
			var locatinNameArr = [];
			for(var i in result.categoryList){
				locatinNameArr.push(result.categoryList[i].name);
				
			} 
			/* var locatinNameArr = [];
			var str = '';
			if(divId=="districtImpactLevelHighChartDivId"){
				//  str+='<option value="-1">Select District</option>';	 
			    str+='<option value="0">All</option>';	 
			}else if(divId=="constituencyLevelHighChartDivId"){
				//str+='<option value="-1">Select Constituency</option>'; 
				str+='<option value="0">All</option>'; 
			}else{
				str+='<option value="0">All</option>'; 
			}
			for(var i in result.categoryList){
				locatinNameArr.push(result.categoryList[i].name);
				str+='<option value="'+result.categoryList[i].id+'">'+result.categoryList[i].name+'</option>';
			} */
			
			var pendingAlertArr = [];
			var notifiedAlertArr = [];
			var actionInProgessAlertArr = [];
			var completedAlertArr = [];
			var unblTRslvAlertArr = [];
			var actionNotRequiredAlertArr = [];
			var duplicateAlertArr = [];
			 
			var wrnglyMppdDsgntnAlertArr = [];
			var wrnglyMppdDprtmntAlertArr = [];
			var rejoinderAlertArr = [];
			var incompleteAlertArr = [];
			var closedAlertArr = [];
			var proposalAlertArr = [];
			 
			for(var i in result.categoryList){
				for(var j in result.categoryList[i].statusList){
					if(result.categoryList[i].statusList[j].id==1){
						pendingAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name}); 
					}else if(result.categoryList[i].statusList[j].id==2){
						notifiedAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==3){
						actionInProgessAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==4){
						completedAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==5){
						unblTRslvAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==6){
						actionNotRequiredAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==7){
						duplicateAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==8){
						wrnglyMppdDsgntnAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==9){
						wrnglyMppdDprtmntAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==10){
						rejoinderAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==11){
						incompleteAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==12){
						closedAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}else if(result.categoryList[i].statusList[j].id==13){
						proposalAlertArr.push({y:result.categoryList[i].statusList[j].alertCount,"extra":result.categoryList[i].statusList[j].id+"-"+result.categoryList[i].id+"-"+result.categoryList[i].statusList[j].alertCount+"-"+locationType+"-"+result.categoryList[i].name});
					}
				}
			}
			var mainJosnObjArr = [];
			if(pendingAlertArr != null && pendingAlertArr.length > 0){
				mainJosnObjArr.push({name:'Pending',data:pendingAlertArr,color:"#A27FC2"});  
			}
			if(notifiedAlertArr != null && notifiedAlertArr.length > 0){
				mainJosnObjArr.push({name:'Notified',data:notifiedAlertArr,color:"#0175F3"});  
			}
			if(actionInProgessAlertArr != null && actionInProgessAlertArr.length > 0){
				mainJosnObjArr.push({name:'Action In Progess',data:actionInProgessAlertArr,color:"#3EC3FF"});  
			}
			if(completedAlertArr != null && completedAlertArr.length > 0){
				mainJosnObjArr.push({name:'Completed',data:completedAlertArr,color:"#049968"});  
			}
			if(unblTRslvAlertArr != null && unblTRslvAlertArr.length > 0){
				mainJosnObjArr.push({name:'Unable to Resolve',data:unblTRslvAlertArr,color:"#F21A98"});  
			}
			if(actionNotRequiredAlertArr != null && actionNotRequiredAlertArr.length > 0){
				mainJosnObjArr.push({name:'Action Not Required',data:actionNotRequiredAlertArr,color:"#FD6E07"});  
			}
			if(duplicateAlertArr != null && duplicateAlertArr.length > 0){
				mainJosnObjArr.push({name:'Duplicate',data:duplicateAlertArr,color:"#CF0001"});  
			}
			if(wrnglyMppdDsgntnAlertArr != null && wrnglyMppdDsgntnAlertArr.length > 0){
				mainJosnObjArr.push({name:'Wrongly Mapped Designation',data:wrnglyMppdDsgntnAlertArr,color:"#FE9900"});  
			} 
			if(wrnglyMppdDprtmntAlertArr != null && wrnglyMppdDprtmntAlertArr.length > 0){
				mainJosnObjArr.push({name:'Wrongly Mapped Department',data:wrnglyMppdDprtmntAlertArr,color:"#0C9514"});  
			}
			if(rejoinderAlertArr != null && rejoinderAlertArr.length > 0){
				mainJosnObjArr.push({name:'Rejoinder',data:rejoinderAlertArr,color:"#82CA9C"});  
			} 
			if(incompleteAlertArr != null && incompleteAlertArr.length > 0){
				mainJosnObjArr.push({name:'Incomplete',data:incompleteAlertArr,color:"#C9AC82"});  
			} 
			if(closedAlertArr != null && closedAlertArr.length > 0){
				mainJosnObjArr.push({name:'Closed',data:closedAlertArr,color:"#ababab"});  
			}
			if(proposalAlertArr != null && proposalAlertArr.length > 0){
				mainJosnObjArr.push({name:'Proposal',data:proposalAlertArr,color:"#FFA07A"});  
			}
			var getWidth = $("#corpGmcOvervwGraph").width();
			$("#gmcImpactLevelHighChartDivId").css("width",getWidth);	
			$("#gmcImpactLevelHighChartDivId").highcharts({
				chart: {
					type: 'bar'
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
					categories: locatinNameArr,
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					min: 0,
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					title: {
						text: '',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}, 
					stackLabels: {
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						},
						formatter: function() {
                        return  (this.total);
                    },
					}
				},
				tooltip: {
					valueSuffix: ' ',
					shared:true
				},
				plotOptions: {
					bar: {
					stacking: 'normal',
						dataLabels: {
							align: 'center',
							x :5,
							y:-3,
							enabled: false,
							 formatter: function() {
								if (this.y === 0) {
									return null;
								} else {
									return Highcharts.numberFormat(this.y,0);      
								}
							}
						}
					},
					series: {
							cursor: 'pointer',
							point: {
							events: {
								click: function () {
									var locationInfo = (this.extra).split("-");
									var alertStatusId = locationInfo[0];
									var locationId = locationInfo[1];
									var totalAlertCnt = locationInfo[2];
									var locationType = locationInfo[3];
									var locationName = locationInfo[4];
									 if(totalAlertCnt == 0){
										return;  
									 }
									 
									if(tabType == "Category"){
										getAlertIssueCategoryDetails(alertStatusId,locationId,totalAlertCnt,locationType,locationName);
									}else{
										locationAlertDetails(alertStatusId,locationId,totalAlertCnt,locationType,locationName);
									} 
									
								}
							}
						}
					}
				},
				legend: {
						reversed: false,
						verticalAlign:'top'
						},
				credits: {
					enabled: false
				},
				series: mainJosnObjArr
			});
		}else{
			 $("#gmcImpactLevelHighChartDivId").html("NO DATA AVAILABLE.");
		}
		if(result != null && result.categoryList.length > 10){ 
			$("#corpGmcOvervwGraph").mCustomScrollbar();//{setHeight:'600px'}
			$("#corpGmcOvervwGraph").css("height","655px");
			//$("#constituencyOvervwGraph").mCustomScrollbar({setHeight:'655px'})
		}else{
			$("#corpGmcOvervwGraph").css("height","auto");
		}
	} 
	function buildCorpGmcImpactLevelHighChartRsltStatusWise(result){
		
		if(result.statusList != null && result.statusList.length > 0 ){
				 var statusList = result.categoryList[0].statusList;
			     var statusNameArr =[];
				 var alertCnt = [];
				 var count = [];
				  var totalAlertCnt = result.alertCount;
				     //Pushing Total Alert
					alertCnt.push({"y":totalAlertCnt,"extra":"0-"+"0-"+result.alertCount+"-GHMCImpactLevel-"+""});
					count.push({"y":parseInt(result.alertCount)-parseInt(result.alertCount),"extra":"0-"+"0-"+result.alertCount+"-GHMCImpactLevel-"+"",color:"#D3D3D3"})
					statusNameArr.push("Total");
					for(var i in statusList){    
				   var uniqCnt = {};
					statusNameArr.push(statusList[i].name);
					alertCnt.push({"y":statusList[i].alertCount,"extra":statusList[i].id+"-0-"+statusList[i].alertCount+"-GHMCImpactLevel-"+statusList[i].name});
					var uniqCnt = {"y":parseInt(totalAlertCnt)-parseInt(statusList[i].alertCount),"extra":statusList[i].id+"-0-"+statusList[i].alertCount+"-GHMCImpactLevel-"+statusList[i].name,color:"#D3D3D3"};
					count.push(uniqCnt);
					}

				   var getWidth = $("#corpGmcOvervwGraph").width();
					$("#gmcImpactLevelHighChartDivId").css("width",getWidth);	
				   $(function () {
					$('#gmcImpactLevelHighChartDivId').highcharts({
						colors: ['#53BF8B','#53BF8B','#53BF8B','#53BF8B','#53BF8B','#53BF8B','#53BF8B'],     
						chart: {
							type: 'column'
						},
						title: {
							text: ''
						},
					   
						xAxis: {
							 min: 0,
								 gridLineWidth: 0,
								 minorGridLineWidth: 0,
								 categories: statusNameArr,
							labels: {
									//rotation: -45,
									style: {
										fontSize: '11px',
										fontFamily: 'Verdana, sans-serif'
									},
									formatter: function() {
										if(this.value.toString() >=8){
											return this.value.toString().substring(0, 8)+'...';
										}else{
											return this.value;
										}
										
									},
									style: {
										fontSize: '11px',
										fontFamily: '"Lucida Grande","Lucida Sans Unicode",Arial,Helvetica,sans-serif',
										textTransform: "uppercase"
									}
								}
						},
						yAxis: {
							min: 0,
								   gridLineWidth: 0,
									minorGridLineWidth: 0,
							title: {
								text: ''
							},
							stackLabels: {
								enabled: true,
								style: {
									fontWeight: 'bold',
									color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
								},
								formatter: function() {
									return  (this.total);
								},
							}
							
						},
					 	tooltip: {
							formatter: function () {
								var s = '<b>' + this.x + '</b>';

									$.each(this.points, function () {
									if(this.series.name != "Series 1")  
									s += '<br/><b style="color:'+this.series.color+'">' + this.series.name + '</b> : ' +
										this.y/* +' - ' +
										(Highcharts.numberFormat(this.percentage,1)+'%'); */
								});

								return s;
							},
							shared: true
						},
						
						legend: {   
												
								enabled: false,				
												
							},				
							plotOptions: {
								column: {
									stacking: 'percent',  
									dataLabels:{
										enabled: false,
										formatter: function() {
											if (this.y === 0) {
												return null;
											} else {
												return Highcharts.numberFormat(this.percentage,1) + '%';
											}
										}
									},
									
								},
									series: {
								cursor: 'pointer',
								point: {
								events: {
									click: function () {
										var ghmcInfo = (this.extra).split("-");
										 var alertStatusId = ghmcInfo[0];
										var locationId = ghmcInfo[1];
										var totalAlertCnt = ghmcInfo[2];
										var impactLevel = ghmcInfo[3];
										var alertStatus = ghmcInfo[4];
										 if(totalAlertCnt == 0){
											return;  
										 }
										locationAlertDetails(alertStatusId,locationId,totalAlertCnt,impactLevel,alertStatus);
									}
								}
							}
						   }
							},
						series: [{
							data: count    
						}, {
							name: "Number of alerts",
							data: alertCnt,
							colorByPoint: true
						}]
					});
				});	
			}else{
				$("#gmcImpactLevelHighChartDivId").html("<div class='col-md-12 col-xs-12 col-sm-12'>No Data Available</div>")
			}
	}
	function buildStateImpactLevelTabularRsltStatusWise(result,divId,locationType,tabType){
	  var str= '';
	   if(result.statusList != null && result.statusList.length > 0){
		   str+='<div class="table-responsive">';
			str+='<table class="table table-bordered text_align_center">';
				str+='<thead class="bg_ED">';
				str+='<th>Total</th>';
				for(var i in result.statusList){
				str+='<th>'+result.statusList[i].name+'</th>';	
				}
				str+='</thead>';
				str+='<tbody>';
				 str+='<tr>';
				 
				 if(tabType == "Category"){
					 if(result.alertCount >0){
					 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getAlertIssueCategoryDetails(0,0,\''+result.alertCount+'\',\''+locationType+'\',\''+result.name+'\');">'+result.alertCount+'</td>';  
					}else{
						str+='<td style="text-align:center;">-</td>';   
					}
				  
					 for(var i in result.statusList){
						 if(result.statusList[i].alertCount > 0){
							 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getAlertIssueCategoryDetails(\''+result.statusList[i].id+'\',0,\''+result.statusList[i].alertCount+'\',\''+locationType+'\',\''+result.statusList[i].name+'\');">'+result.statusList[i].alertCount+'</td>';
						 }else{
							str+='<td style="text-align:center">-</td>'; 
						 }
					}
				 }else{					 
					if(result.alertCount >0){
					 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="locationAlertDetails(0,0,\''+result.alertCount+'\',\''+locationType+'\',\''+result.name+'\');">'+result.alertCount+'</td>';  
					}else{
					str+='<td style="text-align:center;">-</td>';   
					}
				  
					 for(var i in result.statusList){
						 if(result.statusList[i].alertCount > 0){
							 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="locationAlertDetails(\''+result.statusList[i].id+'\',0,\''+result.statusList[i].alertCount+'\',\''+locationType+'\',\''+result.statusList[i].name+'\');">'+result.statusList[i].alertCount+'</td>';
						 }else{
							str+='<td style="text-align:center">-</td>'; 
						 }
					}					
				 }
				   
				str+='</tr>';
			str+='</table>';
		str+='</div>'
	   }else{
		 str+='NO DATA AVAILABLE';  
	   }
	   $("#"+divId).html(str);
	}
	function buildStateOrGhmcImpactLevelTabularRsltStatusWise(result,divId,locationType,tabType){
		var str= '';
	   if(result.categoryList != null && result.categoryList.length > 0){
		   str+='<div class="table-responsive">';
			str+='<table class="table table-bordered text_align_center">';
				str+='<thead class="bg_ED">';
				str+='<th>Corporation/GMC</th>';
				str+='<th>Total</th>';
				for(var i in result.categoryList[0].statusList){
				str+='<th>'+result.categoryList[0].statusList[i].name+'</th>';	
				}
				str+='</thead>';
				str+='<tbody>';
				 
				 if(tabType == "Category"){
					 for(var i in result.categoryList){
					 str+='<tr>';
					str+='<td>'+result.categoryList[i].name+'</td>';
					if(result.categoryList[i].alertCount >0){
					 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getAlertIssueCategoryDetails(0,\''+result.categoryList[i].id+'\',\''+result.categoryList[i].alertCount+'\',\''+locationType+'\',\''+result.categoryList[i].name+'\');">'+result.categoryList[i].alertCount+'</td>';  
				   }else{
					str+='<td style="text-align:center;">-</td>';   
				   }
				   for(var j in result.categoryList[i].statusList){
							if(result.categoryList[i].statusList[j].alertCount > 0){
							 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="getAlertIssueCategoryDetails(\''+result.categoryList[i].statusList[j].id+'\',\''+result.categoryList[i].id+'\',\''+result.categoryList[i].statusList[j].alertCount+'\',\''+locationType+'\',\''+result.categoryList[i].statusList[j].name+'\');">'+result.categoryList[i].statusList[j].alertCount+'</td>';
							}else{
							str+='<td style="text-align:center">-</td>'; 
							} 
					 }
					 str+='</tr>';
					}
				 }else{
					 for(var i in result.categoryList){
					 str+='<tr>';
					str+='<td>'+result.categoryList[i].name+'</td>';
					if(result.categoryList[i].alertCount >0){
					 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="locationAlertDetails(0,\''+result.categoryList[i].id+'\',\''+result.categoryList[i].alertCount+'\',\''+locationType+'\',\''+result.categoryList[i].name+'\');">'+result.categoryList[i].alertCount+'</td>';  
				   }else{
					str+='<td style="text-align:center;">-</td>';   
				   }
				   for(var j in result.categoryList[i].statusList){
							if(result.categoryList[i].statusList[j].alertCount > 0){
							 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="locationAlertDetails(\''+result.categoryList[i].statusList[j].id+'\',\''+result.categoryList[i].id+'\',\''+result.categoryList[i].statusList[j].alertCount+'\',\''+locationType+'\',\''+result.categoryList[i].statusList[j].name+'\');">'+result.categoryList[i].statusList[j].alertCount+'</td>';
							}else{
							str+='<td style="text-align:center">-</td>'; 
							} 
					 }
					 str+='</tr>';
					}
					 
				 }
				/*  for(var i in result.categoryList){
					 for(var j in result.categoryList[i].statusList){
							if(result.categoryList[i].statusList[j].alertCount > 0){
							 str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" onClick="locationAlertDetails(\''+result.categoryList[i].statusList[j].id+'\',0,\''+result.categoryList[i].statusList[j].alertCount+'\',\''+locationType+'\',\''+result.categoryList[i].statusList[j].name+'\');">'+result.categoryList[i].statusList[j].alertCount+'</td>';
							}else{
							str+='<td style="text-align:center">-</td>'; 
							} 
					 }
				} */
				
			str+='</table>';
		str+='</div>'
	   }else{
		 str+='NO DATA AVAILABLE';  
	   }
	   $("#"+divId).html(str);
	}
 function getStateImpcatLevelAlertCntPublicationWise(){
	    $(".stateImpactLevelBlockCls").show();
		$("#stateImpactLevelHighChartDivId").html(spinner);
    	var alertId = 1;
		
		var editionId = 0;
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");

		$("#stateOverviewHeadingId").html("State overview - impact alerts");
    	
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalImpactScopeArr,
			alertId : 			"1",
			editionIds : 		"0",
			alertStatusIds : 	globalAlertStatusArr,
			districtId : 		0,
			alertCategoryIds:	alertCategoryArr
		};   
		$.ajax({
            url: "getStateOrGHMCImpcatLevelAlertCntPublicationWise",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalStateLevelRslt = result;
				if(result != null && result.subList1 != null && result.subList1.length > 0){
				 buildStateOrGhmcImpactLevelHighChartRsltPublicationWise(result,"stateImpactLevelHighChartDivId","StateImpactLevel");	
				}else{
				  $(".stateImpactLevelBlockCls").hide();
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	}
	function buildStateOrGhmcImpactLevelHighChartRsltPublicationWise(result,divId,impactLevel){
		
		var publicationNameArr =[];
		var alertCntArr = [];
		var count = [];
	  	if(result.subList1 != null && result.subList1.length > 0){
			var totalAlertCnt = result.alertCnt;
			publicationNameArr.push("Total");
			count.push({y:parseInt(totalAlertCnt)-parseInt(totalAlertCnt),"extra":"0-0-"+result.alertCnt+"-"+impactLevel+"-"+"Total",color:"#D3D3D3"})
			alertCntArr.push({y:totalAlertCnt,"extra":"0-0-"+result.alertCnt+"-"+impactLevel+"-"+"Total"});
				for(var i in result.subList1){
						publicationNameArr.push(result.subList1[i].name);
						alertCntArr.push({y:result.subList1[i].alertCnt,"extra":result.subList1[i].id+"-0-"+result.subList1[i].alertCnt+"-"+impactLevel+"-"+result.subList1[i].name});
						var uniqCnt = {y:parseInt(totalAlertCnt)-parseInt(result.subList1[i].alertCnt),"extra":result.subList1[i].id+"-0-"+result.subList1[i].alertCnt+"-"+impactLevel+"-"+result.subList1[i].name,color:"#D3D3D3"};
						count.push(uniqCnt);
				}	

				   var getWidth = $("#stateOvervwGraph").width();
		            $("#"+divId).css("width",getWidth);	
				   $(function () {
					$("#"+divId).highcharts({
						colors: ['#53BF8B'],     
						chart: {
							type: 'column'
						},
						title: {
							text: ''
						},
					   
						xAxis: {
							min: 0,
							gridLineWidth: 0,
							minorGridLineWidth: 0,
							categories: publicationNameArr,
							type: 'category',
							labels: {
										useHTML: true,
										formatter: function() {
											if(this.value=="Total"){
												return this.value;
											}
											return '<img src="Core/images/Nes_Papers_Small LOGO/'+this.value+'.png" style="width:40px;"/>';
											
										},
										//rotation: -55,
										style: {
											fontSize: '10px',
											fontFamily: 'Verdana, sans-serif'
										},
									}
							
						},
						yAxis: {
							min: 0,
								   gridLineWidth: 0,
									minorGridLineWidth: 0,
							title: {
								text: ''
							},
							
							
						},
					 	tooltip: {
							formatter: function () {
								var s = '<b>' + this.x + '</b>';

									$.each(this.points, function () {
									if(this.series.name != "Series 1")  
									s += '<br/><b style="color:'+this.series.color+'">' + this.series.name + '</b> : ' +
										this.y/* +' - ' +
										(Highcharts.numberFormat(this.percentage,1)+'%'); */
								});

								return s;
							},
							shared: true
						},
						
						legend: {   
												
								enabled: false,				
												
							},				
							plotOptions: {
								column: {
									stacking: 'percent',  
									dataLabels:{
										enabled: false,
										formatter: function() {
											if (this.y === 0) {
												return null;
											} else {
												return (this.y);
											}
										}
									},
									
								},
								series: {
							cursor: 'pointer',
							point: {
							events: {
								click: function () {
									var publicationInfo = (this.extra).split("-");
									var publicationId = publicationInfo[0];
									var locationId = publicationInfo[1];
									var totalAlertCnt = publicationInfo[2];
									var impactLevel = publicationInfo[3];
									var locationName = publicationInfo[4];
									 if(totalAlertCnt == 0){
										return;  
									 }
									getAlertPublicationDetails(publicationId,locationId,totalAlertCnt,impactLevel,locationName);
								}
							}
						}
				        }
							},
						series: [{
							data: count    
						}, {
							name: "Number of alerts",
							data: alertCntArr,
							colorByPoint: true,
							stackLabels: {
								enabled: true,
								formatter: function() {
									if (this.y === 0) {
										return null;
									} else {
										return (this.y);
									}
								},
								style: {
									fontWeight: 'bold',
									color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
								},
							
						}
						}]
					});
				});	
			}else{
				$("#"+divId).html("<div class='col-md-12 col-xs-12 col-sm-12'>No Data Available</div>")
			}
	}
 function getCorpGHMCImpcatLevelAlertCntPublicationWise(districtId){
		/*Hiding Block if impact Level is not selected*/
		 $(".gmcImpactLevelBlockCls").show();	
		if(globalCorpGhmcImpactScopeSArr == null || globalCorpGhmcImpactScopeSArr.length == 0){
			$(".gmcImpactLevelBlockCls").hide();
			 return;
		}
		 $("#corpOverviewHeadingId").html("CORP-GMC overview - impact alerts");
		$("#gmcImpactLevelHighChartDivId").html(spinner);
    	var alertId = 1;
		
		var editionId = 0;
		
		var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		var json={  
			activityMemberId : 	"44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalCorpGhmcImpactScopeSArr,
			alertId : 			alertId,
			editionIds : 		alertId,
			alertStatusIds : 	globalAlertStatusArr,
			districtId : 		0,
			alertCategoryIds:	alertCategoryArr
		};   
		$.ajax({
            url: "getStateOrGHMCImpcatLevelAlertCntPublicationWise",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	globalCorpGmcLevelRlst = result;
				if(result != null && result.subList1 != null && result.subList1.length > 0){
					buildStateOrGhmcImpactLevelHighChartRsltPublicationWise(result,"gmcImpactLevelHighChartDivId","GHMCImpactLevel");
				}else{
					$(".gmcImpactLevelBlockCls").hide();
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		 
	}
	function buildStateOrGhmcImpactLevelTabularRsltPublicationWise(result,divId,locationType){
	  var str= '';
	   if(result.subList1 != null && result.subList1.length > 0){
		   str+='<div class="table-responsive">';
			str+='<table class="table table-bordered text_align_center">';
				str+='<thead class="bg_ED">';
				str+='<th>Total</th>';
				for(var i in result.subList1){
				str+='<th>'+result.subList1[i].name+'</th>';	
				}
				str+='</thead>';
				str+='<tbody>';
				 str+='<tr>';
				  if(result.alertCnt > 0){
					  str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" class="publicationCls" onClick="getAlertPublicationDetails(0,0,\''+result.alertCnt+'\',\''+locationType+'\',\''+result.name+'\');">'+result.alertCnt+'</td>';
				  }else{
					str+='<td style="text-align:center;">-</td>';  
				  }
				  
				 for(var i in result.subList1){
				  if(result.subList1[i].alertCnt > 0){
				      str+='<td style="text-align:center;cursor:pointer;color:rgb(51, 122, 183);font-size:13px;" class="publicationCls" onClick="getAlertPublicationDetails(\''+result.subList1[i].id+'\',0,\''+result.subList1[i].alertCnt+'\',\''+locationType+'\',\''+result.subList1[i].name+'\');">'+result.subList1[i].alertCnt+'</td>';	  
				  }else{
					  str+='<td style="text-align:center;">-</td>'; 
				  }
				}
				 str+='</tr>';
			str+='</table>';
		str+='</div>'
	   }else{
		 str+='NO DATA AVAILABLE';  
	   }
	   $("#"+divId).html(str);
	}

    
function getLocationWiseAlertDetails(){
$(".collapseTblViewCls").removeClass("active");
$(".collapseHIghChartViewCls").addClass("active");
$("#hiddenLevelTypeId").attr("attr_level_type","locationWise");
getStateImpactandItsSubLevelAlert("locationWise");
getDistrictImpactandItsSubLevelAlert("Decending","0","locationWise");
getParliamentImpactandItsSubLevelAlert("Decending","0","0","locationWise");             
getCorpGMCAlert("0","locationWise");
getConstituencyImpactandItsSubLevelAlert("Decending","0","0","locationWise");
getAssignGroupTypeAlertDtlsByImpactLevelWise(0);
};	

$(document).on("click",".checkedAlertsCls",function(){      
	$(".checkedAlertsCls").prop("checked",false);
	$(this).prop("checked",true);	
});

//swadhin    
function buildParliamentImpactLevelHighChartRslt(result,constituencyId,selectionType){
	if(result.subList1!= null && result.subList1.length > 10){
		var highChartDivHight = result.subList1.length*40;
		$("#parliamentImpactLevelHighChartDivId").height(highChartDivHight);
	}else{
		$("#parliamentImpactLevelHighChartDivId").height(250);		
	}
	if(result.subList1 != null && result.subList1.length > 0){
		var str = '';
		str+='<option value="0">All</option>';
		var parliamentName = [];
		for(var i in result.subList1){
			parliamentName.push(result.subList1[i].name.toUpperCase());
			str+='<option value="'+result.subList1[i].id+'">'+result.subList1[i].name.toUpperCase()+'</option>';
		}
		if(constituencyId == 0){
			$("#parliamentSelectBoxId").val('');//building first time only parliament for searching type
			$("#parliamentSelectBoxId").html(str);	 
		}
			  //parliament
			  
		var parliamentImpactArr = [];
		var constituencyImpactArr = [];
		var mndlMuncpltyImprArr = [];
		var vllgWrdPnchytImpctArr = [];
		for(var i in result.subList1){
			for(var j in result.subList1[i].subList1){
				if(selectionType!= null && selectionType=="impactScopeWise"){
					if(result.subList1[i].subList1[j].id==3){
						if(result.subList1[i].subList1[j].alertCount >= 0){
							constituencyImpactArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Parliament"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
						}
					}else if(result.subList1[i].subList1[j].id==4){
						if(result.subList1[i].subList1[j].alertCount >= 0){
							parliamentImpactArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Parliament"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						}
					}else if(result.subList1[i].subList1[j].id==5){
						if(result.subList1[i].subList1[j].alertCount >= 0){
							mndlMuncpltyImprArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Parliament"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						}
					}else if(result.subList1[i].subList1[j].id==7){
						if(result.subList1[i].subList1[j].alertCount >= 0){
							vllgWrdPnchytImpctArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Parliament"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						}					  
					}
				}else if(selectionType != null && selectionType=="locationWise"){
					if(result.subList1[i].subList1[j].id==4){
						if(result.subList1[i].subList1[j].alertCount >= 0){
							constituencyImpactArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Parliament"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType}); 
						}
					}else if(result.subList1[i].subList1[j].id==5){
						if(result.subList1[i].subList1[j].alertCount >= 0){
							mndlMuncpltyImprArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Parliament"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						}
					}else if(result.subList1[i].subList1[j].id==6){
						if(result.subList1[i].subList1[j].alertCount >= 0){
							vllgWrdPnchytImpctArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Parliament"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						}					  
					}else if(result.subList1[i].subList1[j].id==10){  
						if(result.subList1[i].subList1[j].alertCount >= 0){
							parliamentImpactArr.push({y:result.subList1[i].subList1[j].alertCount,"extra":result.subList1[i].id+"-"+result.subList1[i].subList1[j].alertCount+"-Parliament"+"-"+result.subList1[i].subList1[j].id+"-"+selectionType});
						}					  
					}  
				}
			}
		}
		var mainJosnObjArr = [];
		if(parliamentImpactArr != null && parliamentImpactArr.length > 0){
			mainJosnObjArr.push({name:'PARLIAMENT',data:parliamentImpactArr,color:"#728C00"});  
		}
		if(constituencyImpactArr != null && constituencyImpactArr.length > 0){
			mainJosnObjArr.push({name:'CONSTITUENCY',data:constituencyImpactArr,color:"#34CCFD"});  
		}
		if(mndlMuncpltyImprArr != null && mndlMuncpltyImprArr.length > 0){
			mainJosnObjArr.push({name:'MANDAL/MUNICIPALITY',data:mndlMuncpltyImprArr,color:"#059E69"});  
		}
		if(selectionType != null && selectionType=="impactScopeWise"){
			if(vllgWrdPnchytImpctArr != null && vllgWrdPnchytImpctArr.length > 0){
				mainJosnObjArr.push({name:'VILLAGE/WARD/PANCHAYAT',data:vllgWrdPnchytImpctArr,color:"#FE6406"}); 
			}				  
		}else if(selectionType != null && selectionType=="locationWise"){
			if(vllgWrdPnchytImpctArr != null && vllgWrdPnchytImpctArr.length > 0){
				mainJosnObjArr.push({name:'VILLAGE/WARD/HAMLET',data:vllgWrdPnchytImpctArr,color:"#FE6406"});  
			} 
		}
			 
		var getWidth = $("#parliamentOvervwGraph").width();
		$("#parliamentImpactLevelHighChartDivId").css("width",getWidth);	
		$("#parliamentImpactLevelHighChartDivId").highcharts({
			chart: {
				type: 'bar'
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
				categories: parliamentName,
				title: {
					text: null
				},
					
			},
			yAxis: {
				min: 0,
				min: 0,
				gridLineWidth: 0,
				minorGridLineWidth: 0,
				title: {
					text: '',
					align: 'high'
				},
				labels: {
					overflow: 'justify'
				},
				 stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					},
					formatter: function() {
						return  (this.total);
					},
				}
			},
			tooltip: {
				valueSuffix: ' ',
				shared:true
			},
			plotOptions: {
				bar: {
				stacking: 'normal',
					dataLabels: {
						align:"center",
						x:5,
						y:-5,
						enabled: false,
						formatter: function() {
							if (this.y === 0) {
								return null;
							} else {
								return Highcharts.numberFormat(this.y,0);      
							}
						}
					}
				},
				series: {
					cursor: 'pointer',
					point: {
						events: {
							click: function () {
								var constituencyInfo = (this.extra).split("-");
								var constituencyId = constituencyInfo[0];
								var totalAlertCnt = constituencyInfo[1];
								var locationType = constituencyInfo[2];
								var impactScopeId = constituencyInfo[3];
								var selectionType = constituencyInfo[4];
								getLocationWiseAlertDtls(constituencyId,totalAlertCnt,locationType,impactScopeId,selectionType);
							}
						}
					}
				}
				
			},
			legend: {
				reversed: true,
				verticalAlign:'top'
			},
			credits: {
				enabled: false
			},
			series: mainJosnObjArr
		});
	}else{
		$("#parliamentImpactLevelHighChartDivId").html("NO DATA AVAILABLE.");
	}
	if(result.subList1!= null && result.subList1.length > 15){
		$("#parliamentOvervwGraph").mCustomScrollbar();//{setHeight:'600px'}
		$("#parliamentOvervwGraph").css("height","600px");
	}else{
		$("#parliamentOvervwGraph").css("height","auto");
	}	
}
function parliamentLevelHighchartBuildingFunction(){
	var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	var selectedLevel = $(".impactLevelCls").attr("attr_level");
	var parliamentId = $("#parliamentSelectBoxId").val();
	if(selectedLevel == "Overview"){
		buildParliamentImpactLevelHighChartRslt(globalParliamentLevelRlst,parliamentId,selectionType);  
	}else if(selectedLevel == "Status"){
		buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWise(globalParliamentLevelRlst,"parliamentImpactLevelHighChartDivId",parliamentId,"Parliament"); 
	}else if(selectedLevel == "Publication"){
		buildDistrictOrConstituencyImpactLevelHighChartRsltPublicationWise(globalParliamentLevelRlst,"parliamentImpactLevelHighChartDivId",parliamentId,"Parliament");
	}else if(selectedLevel == "Category"){
		buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWiseIssueCategory(globalParliamentLevelRlst,"parliamentImpactLevelHighChartDivId",parliamentId,"Parliament");
	}
}
function parliamentLevelTblBuildingFunction(){
	var selectedLevel = $(".impactLevelCls").attr("attr_level");
	var selectionType =  $("#hiddenLevelTypeId").attr("attr_level_type");
	if(selectedLevel == "Overview"){
		buildDistrictOrConstituencyImpactLevelTabularRslt(globalParliamentLevelRlst,"parliamentImpactLevelTblDivId","Parliament",selectionType);  
	}else if(selectedLevel == "Status"){        
		buildDistrictOrConstituencyLevelRlstInTabularFormatStatusWise(globalParliamentLevelRlst,"Parliament","parliamentImpactLevelTblDivId"); 
	}else if(selectedLevel == "Publication"){  
		buildDistrictOrConstituencyImpactLevelTabularRsltPublicationWise(globalParliamentLevelRlst,"parliamentImpactLevelTblDivId","Parliament");  
	}else if(selectedLevel == "Category"){
		buildDistrictOrConstituencyLevelRlstInTabularFormatStatusWiseIssueCategory(globalParliamentLevelRlst,"Parliament","parliamentImpactLevelTblDivId"); 
		
	}
}
function getTotalAlertGroupByLocationThenStatusForParliament(sortingType,parliamentId,districtId){
	$(".parliamentImpactLevelBlockCls").show();	
	if(globalPaliamentImpactLevelScopeArr == null || globalPaliamentImpactLevelScopeArr.length == 0){
		$(".parliamentImpactLevelBlockCls").hide();
		return;
	}
	$("#parliamentImpactLevelHighChartDivId").html(spinner);
	var alertId = 1;
	
	var editionId =0;
	
	var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");

	$("#parliamentOverviewHeadingId").html("Parliament overview - impact alerts");         
	var json={  
			activityMemberId : "44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalPaliamentImpactLevelScopeArr,
			group : 			"",
			alertTypeId : 		"1",
			editionIds : 		"0",
			alertStatusIds :    globalAlertStatusArr,
			filterType : 		"Parliament",
			locationValue : 	parliamentId,
			sortingType : 		sortingType,
			districtId : 		districtId,
			alertCategoryIds:	alertCategoryArr
		};
		$.ajax({
            url: "getTotalAlertGroupByLocationThenStatus",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	 globalParliamentLevelRlst = result;
				//$("#parliamentImpactLevelHighChartDivId").html(' ');
				if(result != null && result.length > 0){  
					buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWise(result,"parliamentImpactLevelHighChartDivId",parliamentId,"Parliament"); 
				}else{
					$(".parliamentImpactLevelBlockCls").hide();
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
		
	
}

function getTotalAlertGroupByLocationThenStatusForParliamentIssueCategory(sortingType,parliamentId,districtId){
	$(".parliamentImpactLevelBlockCls").show();	
	if(globalPaliamentImpactLevelScopeArr == null || globalPaliamentImpactLevelScopeArr.length == 0){
		$(".parliamentImpactLevelBlockCls").hide();
		return;
	}
	$("#parliamentImpactLevelHighChartDivId").html(spinner);
	var alertId = 1;
	
	var editionId =0;
	
	var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");

	$("#parliamentOverviewHeadingId").html("Parliament overview - impact alerts");  

		var json={  
			activityMemberId : "44",      
			stateId : 			1,           
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			scopeIdList:		globalPaliamentImpactLevelScopeArr,
			group : 			"",
			alertId : 			alertId,
			editionIds : 		editionId,
			alertStatusIds :    globalAlertStatusArr,
			filterType : 		"Parliament",
			locationValue : 	parliamentId,
			sortingType : 		sortingType,
			districtId : 		districtId,
			alertCategoryIds:	alertCategoryArr
		};
		$.ajax({
            url: "getLocationAndIssueCategoryWiseAlerts",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	 globalParliamentLevelRlst = result;
					//$("#parliamentImpactLevelHighChartDivId").html(' ');
					if(result != null && result.length > 0){  
						buildDistrictOrConstituencyImpactLevelHighChartRsltStatusWiseIssueCategory(result,"parliamentImpactLevelHighChartDivId",parliamentId,"Parliament"); 
					}else{
						$(".parliamentImpactLevelBlockCls").hide();
					}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
	
}

function getParliamentWisePublicationAlert(sortingType,parliamentId,districtId){
	$(".parliamentImpactLevelBlockCls").show();	
	if(globalPaliamentImpactLevelScopeArr == null || globalPaliamentImpactLevelScopeArr.length == 0){
		$(".parliamentImpactLevelBlockCls").hide();
		return;
	}
	$("#parliamentOverviewHeadingId").html("Parliament overview - impact alerts");
	$("#parliamentImpactLevelHighChartDivId").html(spinner);
    var alertId = 1;
	
	var editionId = 0;
	
	var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
	var districtArr=[];
	
	var json={  
			fromDateStr:		customStartDateAlert,       
			toDateStr :			customEndDateAlert,
			stateId : 			1,           
			scopeIdList:		globalPaliamentImpactLevelScopeArr,
			activityMemberId : "44",      
			alertStatusIds :    globalAlertStatusArr,
			alertTypeId : 		"1",
			editionIds : 		"0",
			filterType : 		"Parliament",
			locationValue : 	parliamentId,
			sortingType : 		sortingType,
			districtId : 		districtId,
			alertCategoryIds:	alertCategoryArr
		};
		$.ajax({
            url: "getPublicationWiseAlert",
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json', 
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(result) {
            	 globalParliamentLevelRlst = result;
				//$("#constituencyLevelHighChartDivId").html('');
				if(result != null && result.length > 0){
				   buildDistrictOrConstituencyImpactLevelHighChartRsltPublicationWise(result,"parliamentImpactLevelHighChartDivId",parliamentId,"Parliament");	
				}else{  
				   $(".parliamentImpactLevelBlockCls").hide();   
				}
            },
            failure: function(xhr) {
                return xhr;
            }
        });
	
}

	//balu Clicking Scenario
	function getAlertIssueCategoryDetails(issueCategoryId,locationIdStr,totalAlertCnt,locationType,locationLevel){
		var locationLevel = locationLevel;
		var districtIdArr =[];
		var constituencyId = 0;    
		 if(locationType=="Constituency"){
			constituencyId = locationIdStr;  
		}else if(locationType=="District"){
		   districtIdArr = locationIdStr.split(",");	
		}else if(locationType=="Parliament"){               
			constituencyId = locationIdStr;
		}else if(locationType=="GHMCImpactLevel"){
			constituencyId = locationIdStr;
		} 
		getIssueCategoryWiseLocationAlertBriefDetails(districtIdArr,totalAlertCnt,constituencyId,issueCategoryId,locationLevel,locationType);
	}
	function getIssueCategoryWiseLocationAlertBriefDetails(districtIdArr,totalAlertCnt,constituencyId,issueCategoryId,locationLevel,locationType){
		var locationElectionBodyId = 0;
		$("#tourDocumentBodyId").html("");           
		$("#tourDocumentBodyId").html(spinner);   
		$("#alertCntTitId").html("TOTAL ALERTS - "+totalAlertCnt);        
		$("#tourDocumentId").modal("show");
		var scopeIdsArr = [];
		var parliamentId = 0;		
		 if(locationType != null && locationType=="Constituency"){
			 scopeIdsArr = globalConstituencyImpactScopeArr;
		 }else if(locationType=="District"){
			  scopeIdsArr = globalDistrictImpactLevelScopeArr;
		 }else if(locationType=="Parliament"){
			  scopeIdsArr = globalPaliamentImpactLevelScopeArr;
			  parliamentId = constituencyId;
		 }else if(locationType=="StateImpactLevel")	{
			 scopeIdsArr = globalImpactScopeArr;
		 }else if(locationType=="GHMCImpactLevel"){
			 var districtId = $("#districtSelectBoxId").val();
			 if(districtId > 0){
				districtIdArr.push(districtId); 
			 }
			  scopeIdsArr = globalCorpGhmcImpactScopeSArr; 
			  locationElectionBodyId=constituencyId;
			  constituencyId=0;
		 }  
		var alertTypeId = 1;
		
		var editionIds = 0;
		

		alertStatusArr = globalAlertStatusArr;

		var issueCategoryArr =[];
		   if(issueCategoryId == 0){  
			   issueCategoryArr = globalIssueCategoryArr;
		   }else{
			 issueCategoryArr.push(issueCategoryId);   
		   }
		   var alertCategoryArr = $("#alertCategoryTypeHiddenId").attr("attr_alert_category_id_str").split(",");
		
		
		var json={  
			fromDateStr			:customStartDateAlert,       
			toDateStr		    :customEndDateAlert,
			stateId				:1,
			impactLevelIds		:scopeIdsArr,
			activityMemberId	:44,
			districtList		:districtIdArr,
			alertTypeId			:alertTypeId,
			editionIds			:editionIds,
			constituencyId      :constituencyId,
			alertStatusIds		:alertStatusArr,
			locationLevel		:locationLevel,
			localElectionBodyId :locationElectionBodyId,
			type				:"impactScopeWise",
			parliamentId		:parliamentId,
			issueCategoryIds	:issueCategoryArr,
			alertCategoryIds	:alertCategoryArr
			
		};
		 $.ajax({
			url: "getIssueCategoryWiseLocationAlertDetails",
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(result) {
				if(result != null && result.length > 0){
						buildAlertDtls(result);    
					}else{
						$("#tourDocumentBodyId").html("NO DATA AVAILABLE.");	
					}
			},
			failure: function(xhr) {
				return xhr;
			}
		});
		
}