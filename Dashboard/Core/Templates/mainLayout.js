var CoreDashboard = CoreDashboard || {};
var spinner = '<div class="row"><div class="col"><div class="d2d-loader"><div class="loader"></div><img src="Core/images/LOADER.png"/></div></div></div>';
var customStartDate = moment().subtract(3, 'month').startOf('month').format('DD/MM/YYYY');
var customEndDate = moment().format('DD/MM/YYYY');

var mapPresentCustomStartDate = moment().startOf('month').format('DD-MM-YYYY');
var mapPresentCustomEndDate = moment().endOf('month').format('DD-MM-YYYY');

var mapPastCustomStartDate = moment().subtract(1, 'month').startOf('month').format('DD-MM-YYYY');
var mapPastCustomEndDate = moment().subtract(1, 'month').endOf('month').format('DD-MM-YYYY');
var url = window.location.href;
var wurl = url.substr(0,(url.indexOf(".com")+4));
if(wurl.length == 3)
	wurl = url.substr(0,(url.indexOf(".in")+3)); 

 /*var wurl="http://192.168.11.137:8080"; 
var wurl="http://mytdp.com";*/

var globalpartyId = 872 ;
var globalEditioinTypeId = 0;
var globalBenefitId = 1;
var tourCustomStartDate="";
var tourCustomEndDate="";

var newsPaperIds = "";
var newsChannelIds = "";
var fromDateSpitNews =  "";
var toDateSpitNews =  "";
var locationValueNews = 1;
var locationIdNews = 2;

CoreDashboard.mainLayout = (function(){
	 function buildmainLayout(categoryId,loginWiseResponseBlocks){
		var block='';
		for(var i in blockArr){
			for(var j in blockArr[i].categoryWiseArr){
					for(var lg in loginResponse){
						if(loginResponse[lg].id == blockArr[i].blockNo){
							block+='<div id="'+blockArr[i].categoryWiseArr[j].id+'" class="" block-category-type="'+blockArr[i].blockName+'" style="display:'+blockArr[i].blockShow+'"></div>';
						}
					}
				}
		}
		$("#"+categoryId).html(block);
		$(".tooltipCls").tooltip();
		
		
		var jsonInputParams={
			 "fromDateStr":"",
			 "toDateStr":"",
			 "stateId":"1",
			 "activityMemberId":"44",
			 "partyMeetingMainTypeId":3
		};
		var jsonInputTourParams={
			 "fromDateStr":"01/03/2015",
			 "toDateStr":moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY'),
			 "stateId":"1",
			 "activityMemberId":"44"
		};
		for(var i in blockArr){
			for(var lg in loginResponse){
				if(loginResponse[lg].id == blockArr[i].blockNo){
					for(var j in blockArr[i].categoryWiseArr){
						if(blockArr[i].categoryWiseArr[j].id == "toursId"){
							CoreComponent.ajax.dynamicAjaxCalls(blockArr[i].blockName,blockArr[i].categoryWiseArr[j].id,jsonInputTourParams,blockArr[i].categoryWiseArr[j].mian_tail_ajax_call,blockArr[i].categoryWiseArr[j].module_owner,blockArr[i].categoryWiseArr[j].icon,blockArr[i].categoryWiseArr[j].sub_heading,blockArr[i].categoryWiseArr[j].url,blockArr[i].categoryWiseArr[j].mobileNo);
						}else if(blockArr[i].categoryWiseArr[j].id == "printMediaId" || blockArr[i].categoryWiseArr[j].id == "elctronicMediaId" || blockArr[i].categoryWiseArr[j].id == "emCovreageTimeId"){
							CoreComponent.ajax.newsDynamicAjaxCalls(blockArr[i].blockName,blockArr[i].categoryWiseArr[j].id,blockArr[i].categoryWiseArr[j].mian_tail_ajax_call,blockArr[i].categoryWiseArr[j].module_owner,blockArr[i].categoryWiseArr[j].icon,blockArr[i].categoryWiseArr[j].sub_heading,blockArr[i].categoryWiseArr[j].url,blockArr[i].categoryWiseArr[j].mobileNo);
						}else if(blockArr[i].categoryWiseArr[j].id != "favouritesDivId"){
							CoreComponent.ajax.dynamicAjaxCalls(blockArr[i].blockName,blockArr[i].categoryWiseArr[j].id,jsonInputParams,blockArr[i].categoryWiseArr[j].mian_tail_ajax_call,blockArr[i].categoryWiseArr[j].module_owner,blockArr[i].categoryWiseArr[j].icon,blockArr[i].categoryWiseArr[j].sub_heading,blockArr[i].categoryWiseArr[j].url,blockArr[i].categoryWiseArr[j].mobileNo);
						}
					}
				}
			}
			
		}
	}
	
	
	
    return {
        buildmainLayout : buildmainLayout
	}
	
	
}());

$(document).on("click",".coreDashBoardModalViewCls",function(){
	//$("#overViewDetailsModalDivId").find('.modal-dialog').css("min-width",'90%');
	$("#moreDetailsBlockDivId").removeClass('animated fadeOutLeft');
	$("#moreDetailsBlockDivId").show();
	var divId = $(this).attr("attr_div_id");
	var blockValue = $(this).attr("attr_block_value");
	var actionBotsBlockName = $(this).attr("attr_block_name");
	var alert_categoryIds = $(this).attr("attr_alert_categoryIds");
	var view_type = $(this).attr("attr_view_type");
	var subBlockValue = $(this).attr("attr_block_Subvalue");
	
	//$("#overViewDetailsModalDivId").modal("show");
	$("html,body").animate({
			scrollTop: $(".scrollMoreDetailsCls").offset().top},
	'slow');
	
    customStartDate =moment().subtract(3, 'month').startOf('month').format('DD/MM/YYYY');
	customEndDate = moment().format('DD/MM/YYYY');
	
	buildDefaultModalBlockView(divId,blockValue,actionBotsBlockName,alert_categoryIds,view_type,subBlockValue);
});
$(document).on("click",".closeMoreDetailsBlockCls",function(){
	$("#moreDetailsBlockDivId").addClass('animated fadeOutLeft');
	setTimeout(function(){
		$("#moreDetailsBlockDivId").hide();
		$('html,body').animate({
			scrollTop: $(".scrollTopDefault").offset().top
		},'slow');
	},1200)
	
});	
function buildDefaultModalBlockView(divId,blockValue,actionBotsBlockName,alert_categoryIds,view_type,subBlockValue){
	var modalBlock='';
	for(var i in blockArr){
		for(var j in blockArr[i].categoryWiseArr){
			if(blockArr[i].categoryWiseArr[j].id == divId){
				modalBlock+='<div class="card border_relative_modal red" style="height:auto !important;">';
					if(view_type == "details"){
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-12">';
								if(blockArr[i].categoryWiseArr[j].id == "actionBotsId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <img src="Core/images/logo-ActionBots.png" class="img-responsive" alt="actionBots" style="width: 200px;height: auto;"/> <small class=""> - '+actionBotsBlockName+' (<span class="dateSelectedId">'+customStartDate+' - '+customEndDate+'</span>)</small>';
								}else if(blockArr[i].categoryWiseArr[j].id == "meetingId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital">'+actionBotsBlockName+'</span>  - <small class="font_12 dateSelectedId" id="">'+customStartDate+' - '+customEndDate+'</small>';
								}else if(blockArr[i].categoryWiseArr[j].id == "toursId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital"> '+actionBotsBlockName+' TOURS</span>  - <small class="font_12 dateSelectedId" id="">'+customStartDate+' - '+customEndDate+'</small>';
								}else if(blockArr[i].categoryWiseArr[j].id == "printMediaId" || blockArr[i].categoryWiseArr[j].id == "elctronicMediaId" || blockArr[i].categoryWiseArr[j].id == "emCovreageTimeId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital"> '+actionBotsBlockName+' NEWS</span>  - <small class="font_12 dateSelectedId" id="">'+customStartDate+' - '+customEndDate+'</small>';
								}else if(blockArr[i].categoryWiseArr[j].id == "debatesId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital"> DEBATES </span>  - <small class="font_12 dateSelectedId" id="">'+customStartDate+' - '+customEndDate+'</small>';
								}else{
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital"> '+actionBotsBlockName+'</span>  - <small class="font_12 dateSelectedId" id="">'+customStartDate+' - '+customEndDate+'</small>';
								}
									
									modalBlock+='<button type="button" class="close close_btn_stl2 float-right closeMoreDetailsBlockCls"><i class="far fa-times-circle"></i></button>';
									modalBlock+='</h4>';
								modalBlock+='</div>';
							modalBlock+='</div>';
							modalBlock+='<hr class="hr_cls"/>';
								modalBlock+='<div class="row">';
									modalBlock+='<div class="col">';
										modalBlock+='<ul class="list-inline datesBlockLi float-right getSelectedMeetingDatesCls">';
											modalBlock+='<li init-id="dateRangeMeetingCustomId" attr_type="customDates" attr_div_id="'+divId+'" attr_block_value="'+blockValue+'" attr_alert_categoryIds="'+alert_categoryIds+'"></li>';
											modalBlock+='<li attr_type="thisMonth" attr_div_id="'+divId+'" attr_block_value="'+blockValue+'" attr_alert_categoryIds="'+alert_categoryIds+'">THIS MONTH</li>';
											modalBlock+='<li attr_type="lastMonth" attr_div_id="'+divId+'" attr_block_value="'+blockValue+'" attr_alert_categoryIds="'+alert_categoryIds+'">LAST MONTH</li>';
											modalBlock+='<li class="active" attr_type="last3Month" attr_div_id="'+divId+'" attr_block_value="'+blockValue+'" attr_alert_categoryIds="'+alert_categoryIds+'">LAST 3 MONTH</li>';
											modalBlock+='<li class="addClassNewsDft" attr_type="last6Month" attr_div_id="'+divId+'" attr_block_value="'+blockValue+'" attr_alert_categoryIds="'+alert_categoryIds+'">LAST 6 MONTH</li>';
											modalBlock+='<li  attr_type="overAll" attr_div_id="'+divId+'" attr_block_value="'+blockValue+'" attr_alert_categoryIds="'+alert_categoryIds+'">OVERALL</li>';
										modalBlock+='</ul>';
									modalBlock+='</div>';
								modalBlock+='</div>';
							modalBlock+='<div class="blockWiseModalDivId"></div>';
						modalBlock+='</div>';
					}else{
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-12">';
								if(blockArr[i].categoryWiseArr[j].id == "actionBotsId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <img src="Core/images/logo-ActionBots.png" class="img-responsive" alt="actionBots" style="width: 200px;height: auto;"/> <small class="">Geo Graphical Overview</small>';
								}else if(blockArr[i].categoryWiseArr[j].id == "meetingId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital">'+actionBotsBlockName+'</span>  - <small>Geo Graphical Overview</small>';
								}else if(blockArr[i].categoryWiseArr[j].id == "toursId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital"> '+actionBotsBlockName+' TOURS</span>  -<small>Geo Graphical Overview</small>';
								}else if(blockArr[i].categoryWiseArr[j].id == "printMediaId" || blockArr[i].categoryWiseArr[j].id == "elctronicMediaId" || blockArr[i].categoryWiseArr[j].id == "emCovreageTimeId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital"> '+actionBotsBlockName+' NEWS</span>  - <small>Geo Graphical Overview</small>';
								}else if(blockArr[i].categoryWiseArr[j].id == "debatesId"){
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital"> DEBATES </span>  - <small>Geo Graphical Overview</small>';
								}else{
									modalBlock+='<h4 class="color_yash">'+blockArr[i].categoryWiseArr[j].icon+' <span class="font_weight text-capital"> '+actionBotsBlockName+'</span>  - <small>Geo Graphical Overview</small>';
								}
									
									modalBlock+='<button type="button" class="close close_btn_stl2 float-right closeMoreDetailsBlockCls"><i class="far fa-times-circle"></i></button>';
							modalBlock+='</div>';
						modalBlock+='</div>';
						modalBlock+='<hr class="hr_cls"/>';
						
						modalBlock+='<div class="borderFilterCls">';
							
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-12">';
									modalBlock+='<h5 class="font_weight">FILTERS</h5>';
								modalBlock+='</div>';
							modalBlock+='</div>';
							
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-4 m_top10">';
								
										modalBlock+='<div class="col-sm-12">';
											modalBlock+='<label style="font-size:14px;font-weight:bold;">Level</label>';
										modalBlock+='</div>';	
									
									modalBlock+='<ul class="list-inline  mapLevelCss">';
										modalBlock+='<li class="active" attr_type="district" attr_block_value="'+blockValue+'">District</li>';
										modalBlock+='<li attr_type="constituency" attr_block_value="'+blockValue+'">Constituency</li>';
										modalBlock+='<li attr_type="parliament" attr_block_value="'+blockValue+'">Parliament</li>';
									modalBlock+='</ul>';
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-4 m_top10">';
									modalBlock+='<div class="row">';
										modalBlock+='<div class="col-sm-6">';
											modalBlock+='<label style="font-size:14px;font-weight:bold;">Component Name</label>';
											modalBlock+='<select class="form-control chosen-select" id="componentNameId">';
												modalBlock+='<option value="0">Select Component</option>';
												modalBlock+='<option value="1" selected>Print Media</option>';
											modalBlock+='</select>';
										modalBlock+='</div>';
										 modalBlock+='<div class="col-sm-6">';
											modalBlock+='<label style="font-size:14px;font-weight:bold;">Sub Component Name</label>';
											modalBlock+='<select class="form-control chosen-select" id="subComponentNameId">';
												modalBlock+='<option value="select">Select Sub Component</option>';
												modalBlock+='<option value="0" attr_value="0">OverAll</option>';
												modalBlock+='<option value="2" attr_value="2">AndhraJyothi</option>';
												modalBlock+='<option value="3" attr_value="3">Eenaadu</option>';
												modalBlock+='<option value="5" attr_value="4">Vishalandhra</option>';
												modalBlock+='<option value="8" attr_value="5">Sakshi</option>';
												modalBlock+='<option value="1" attr_value="1">AndhraBhoomi</option>';
											modalBlock+='</select>';	
										modalBlock+='</div>'; 
									modalBlock+='</div>';
								modalBlock+='</div>';
								modalBlock+='<div class="col-sm-4 m_top10">';
									modalBlock+='<div class="row">';
										modalBlock+='<div class="col-sm-4">';
											modalBlock+='<label style="font-size:14px;font-weight:bold;">Party</label>';
											modalBlock+='<select class="form-control chosen-select" id="mapPartyId">';
												modalBlock+='<option value="0">Select Party</option>';
												modalBlock+='<option value="872">TDP</option>';
												modalBlock+='<option value="1117">YSRC</option>';
												modalBlock+='<option value="362">INC</option>';
												modalBlock+='<option value="163">BJP</option>';
												modalBlock+='<option value="1853">JANASENA</option>';
											modalBlock+='</select>';
										modalBlock+='</div>';
										modalBlock+='<div class="col-sm-4">';
											modalBlock+='<label style="font-size:14px;font-weight:bold;">Benefit</label>';
											modalBlock+='<select class="form-control chosen-select" id="mapBenefitId">';
												modalBlock+='<option value="0">Select Benefit</option>';
												modalBlock+='<option value="1">Positive</option>';
												modalBlock+='<option value="2">Negative</option>';
											modalBlock+='</select>';
										modalBlock+='</div>';
										modalBlock+='<div class="col-sm-4">';
											modalBlock+='<label style="font-size:14px;font-weight:bold;">Edition</label>';
											modalBlock+='<select class="form-control chosen-select" id="mapEditionId">';
												modalBlock+='<option value="0">All</option>';
												modalBlock+='<option value="1">Main</option>';
												modalBlock+='<option value="2">District</option>';
											modalBlock+='</select>';
										modalBlock+='</div>';
									modalBlock+='</div>';
								modalBlock+='</div>';
								
							modalBlock+='</div>';
							
							modalBlock+='<div class="row">';
								modalBlock+='<div class="col-sm-12">';
									modalBlock+='<button type="button" class="btn btn-success getSelectionWiseMapDetailsCls m_top5 float-right" style="border-radius:0px;">GET DETAILS</button>';
								modalBlock+='</div>';
							modalBlock+='</div>';
								
						modalBlock+='</div>';
						
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6 m_top20">';
								modalBlock+='<dateRangePicker init-id="dateRangePresntId" class=""></dateRangePicker>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6 m_top20">';
								modalBlock+='<dateRangePicker init-id="dateRangePastId" class=""></dateRangePicker>';
							modalBlock+='</div>';
						modalBlock+='</div>';
						
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-4 m_top20">';
								modalBlock+='<h5 class="font_weight text-uppercase" id="mapHeadingId">District Wise Print Media Details</h5>';
							modalBlock+='</div>';
								modalBlock+='<div class="col-sm-8">';
									modalBlock+='<div id="rangeBuildMapId"></div>';
								modalBlock+='</div>';
						modalBlock+='</div>';
						
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6 m_top20 districtMapCls">';
								modalBlock+='<div id="blockWiseMapDistrictPresentDivId" style="height:750px;"></div>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6 m_top20 districtMapCls">';
								modalBlock+='<div id="blockWiseMapDistrictPastDivId" style="height:750px;"></div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
						
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6 m_top20 constituencyMapCls" style="display:none;">';
								modalBlock+='<div id="blockWiseMapConstituencyPresentDivId"  style="height:750px;"></div>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6 m_top20 constituencyMapCls"  style="display:none;">';
								modalBlock+='<div id="blockWiseMapConstituencyPastDivId"  style="height:750px;"></div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
						
						
						modalBlock+='<div class="row">';
							modalBlock+='<div class="col-sm-6 m_top20 parliamentMapCls"  style="display:none;">';
								modalBlock+='<div id="blockWiseMapParliamentPresentDivId" style="height:750px;"></div>';
							modalBlock+='</div>';
							modalBlock+='<div class="col-sm-6 m_top20 parliamentMapCls"  style="display:none;">';
								modalBlock+='<div id="blockWiseMapParliamentPastDivId" style="height:750px;"></div>';
							modalBlock+='</div>';
						modalBlock+='</div>';
					}
						
			}
			
		}
	}
	$("#moreDetailsBlockDivId").html(modalBlock);
	
	$(".chosen-select").chosen();
	
	
	
	if(view_type == "details"){
		blockTypeWiseCalls(divId,blockValue,alert_categoryIds,"last3Month",subBlockValue);
	}else{
		$("#subComponentNameId").val(blockValue);
		$("#subComponentNameId").trigger("chosen:updated");
		
		$("#mapPartyId").val(globalpartyId);
		$("#mapPartyId").trigger("chosen:updated");
		
		$("#mapBenefitId").val(globalBenefitId);
		$("#mapBenefitId").trigger("chosen:updated");
		
		$("#mapEditionId").val(globalEditioinTypeId);
		$("#mapEditionId").trigger("chosen:updated");
		
		blockMapTypeWiseCalls(blockValue);
		
		var extraPresent = {
			opens: 'left',
			startDate: mapPresentCustomStartDate,
			endDate: mapPresentCustomEndDate,
			locale: {
			  format: 'DD-MM-YYYY'
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
		}
		
		CoreComponent.datepicker.datepickerInit('dateRangePresntId')
		CoreComponent.datepicker.datePickerExtraVal('dateRangePresntId',extraPresent);
		
		var dates= $("#dateRangePresntId").val();
		var pickerDates = mapPresentCustomStartDate+' - '+mapPresentCustomEndDate
		if(dates == pickerDates)
		{
			$("#dateRangePresntId").val('This Month');
		}
		
		var extraPast = {
			opens: 'left',
			startDate: mapPastCustomStartDate,
			endDate: mapPastCustomEndDate,
			locale: {
			  format: 'DD-MM-YYYY'
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
		}
		
		CoreComponent.datepicker.datepickerInit('dateRangePastId')
		CoreComponent.datepicker.datePickerExtraVal('dateRangePastId',extraPast);
		var dates= $("#dateRangePastId").val();
		var pickerDates = mapPastCustomStartDate+' - '+mapPastCustomEndDate
		if(dates == pickerDates)
		{
			$("#dateRangePastId").val('Last Month');
		}
		
		
		$('#dateRangePresntId').on('apply.daterangepicker', function(ev, picker) {
			mapPresentCustomStartDate = picker.startDate.format('DD-MM-YYYY');
			mapPresentCustomEndDate = picker.endDate.format('DD-MM-YYYY');
			
			var type="";
			$('.mapLevelCss li').each(function () {
				if($(this).hasClass("active")){
					type = $(this).attr("attr_type");
				}
			});
			callMaps(type,globalMapBlockValue,"presentDuration");
			
		});	
		$('#dateRangePastId').on('apply.daterangepicker', function(ev, picker) {
			mapPastCustomStartDate = picker.startDate.format('DD-MM-YYYY');
			mapPastCustomEndDate = picker.endDate.format('DD-MM-YYYY');
			
			var type="";
			$('.mapLevelCss li').each(function () {
				if($(this).hasClass("active")){
					type = $(this).attr("attr_type");
				}
			});
			
			callMaps(type,globalMapBlockValue,"pastDuration");
			
		});
	}
	
	
	var extra = {
		opens: 'left',
		startDate: customStartDate,
		endDate: customEndDate,
		locale: {
		  format: 'DD/MM/YYYY'
		}
	}
	
	CoreComponent.datepicker.datepickerMeetingInit('dateRangeMeetingCustomId');
	CoreComponent.datepicker.datePickerExtraVal('dateRangeMeetingCustomId',extra);
	
	$(".dateSelectedId").html("Last 3 Months");
	var dates= $("#dateRangeId").val();
	var pickerDates = customStartDate+' - '+customEndDate
	if(dates == pickerDates)
	{
		$("#dateRangeId").val('Last 3 Months');
	}
	
	$('#dateRangeMeetingCustomId').on('apply.daterangepicker', function(ev, picker) {
		customStartDate = picker.startDate.format('DD/MM/YYYY');
		customEndDate = picker.endDate.format('DD/MM/YYYY');
		getPickerChosenLabelCall(picker.chosenLabel);
		$(".mapLevelCss li").removeClass("active");
		$(".mapLevelCss li:nth-child(1)").addClass("active");
		blockTypeWiseCalls(divId,blockValue,alert_categoryIds,picker.chosenLabel,subBlockValue);
		
	});	
}
	
	function blockTypeWiseCalls(divId,blockValue,alert_categoryIds,chosenLabel,subBlockValue){
		if(divId == "politicalAlertId"){
			basicPoliticalAlertsDetails(blockValue,alert_categoryIds);
		}else if(divId == "meetingId"){
			basicMeetingDetails(blockValue,chosenLabel);
		}else if(divId == "actionBotsId"){
			basicActionBotsAlertsDetails(blockValue);
		}else if(divId == "toursId"){
			basicTourDetails(blockValue,chosenLabel);
		}else if(divId == "debatesId" || divId == "pressmeetsId"){
			basicPressMeetsAndDebatesDetails(blockValue,divId,chosenLabel);
		}else if(divId == "printMediaId" || divId == "elctronicMediaId"){
			basicPrintMediaDetails(blockValue,divId,chosenLabel);
		}else if(divId == "emCovreageTimeId"){
			basicEMCoverageTimeDetails(blockValue,divId,chosenLabel);
		}else if(divId == "cbnArmyId"){
			basicCBNArmyDetails(blockValue,divId,chosenLabel);
		}else if(divId == "specialMeetingId"){
			basicSpecialMeetingDetails(blockValue,divId,chosenLabel,"blockWiseModalDivId");
		}else if(divId == "trainingsId"){
			basicTrainingsDetails(blockValue,divId,chosenLabel);
		}else if(divId == "activitiesId"){
			basicActivitiesDetails(blockValue,divId,chosenLabel,subBlockValue);
		}
	}
	
	function getPickerChosenLabelCall(chosenLabel){
		
		if(chosenLabel == 'Overall'){
			$(".dateSelectedId").html("Overall");
			$("#dateRangeId").val("Overall");
			
		}else if(chosenLabel == 'Last 6 Months'){
			$(".dateSelectedId").html("Last 6 Months");
			$("#dateRangeId").val("Last 6 Months");
			
		}else if(chosenLabel == 'This Month'){
			$(".dateSelectedId").html("This Month");
			$("#dateRangeId").val("This Month");
			
		}else if(chosenLabel == 'Last Month'){
			$(".dateSelectedId").html("Last Month");
			$("#dateRangeId").val("Last Month");
			
		}else if(chosenLabel == 'Last 3 Months'){
			$(".dateSelectedId").html("Last 3 Months");
			$("#dateRangeId").val("Last 3 Months");
		}else if(chosenLabel == 'This Year'){
			$(".dateSelectedId").html("This Year");
			$("#dateRangeId").val("This Year");
		}else if(chosenLabel == 'Last 1 Year'){
			$(".dateSelectedId").html("Last 1 Year");
			$("#dateRangeId").val("Last 1 Year");
		}else{
			$(".dateSelectedId").html(customStartDate+" - "+customEndDate);
		}
	}
	
	$(document).on("click",".getSelectedMeetingDatesCls li",function(e){
		$(this).closest("ul").find("li").removeClass("active");
		$(this).addClass("active");
		var type = $(this).attr("attr_type");
		var divId = $(this).attr("attr_div_id");
		var blockValue = $(this).attr("attr_block_value");
		var alert_categoryIds = $(this).attr("attr_alert_categoryIds");
		if(type == "customDates"){
			e.stopPropagation();
		}else if(type == "thisMonth"){
			customStartDate=moment().startOf('month').format('DD/MM/YYYY');
			customEndDate=moment().endOf('month').format('DD/MM/YYYY');
			$(".dateSelectedId").html("This Month");
			blockTypeWiseCalls(divId,blockValue,alert_categoryIds,type);
		}else if(type == "lastMonth"){
			customStartDate=moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY');
			customEndDate=moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');
			$(".dateSelectedId").html("Last Month");
			blockTypeWiseCalls(divId,blockValue,alert_categoryIds,type);
		}else if(type == "last3Month"){
			customStartDate=moment().subtract(3, 'month').startOf('month').format('DD/MM/YYYY');
			customEndDate=moment().format('DD/MM/YYYY');
			$(".dateSelectedId").html("Last 3 Month");
			blockTypeWiseCalls(divId,blockValue,alert_categoryIds,type);
		}else if(type == "last6Month"){
			customStartDate=moment().subtract(6, 'month').startOf('month').format('DD/MM/YYYY');
			customEndDate=moment().format('DD/MM/YYYY');
			$(".dateSelectedId").html("Last 6 Month");
			blockTypeWiseCalls(divId,blockValue,alert_categoryIds,type);
		}else if(type == "overAll"){
			customStartDate=moment().subtract(10, 'years').startOf('year').format('DD/MM/YYYY');
			customEndDate=moment().format('DD/MM/YYYY');
			$(".dateSelectedId").html("OverAll");
			blockTypeWiseCalls(divId,blockValue,alert_categoryIds,type);
		}
	});


function initializeDataTableWithOutPagination(divId){
	$("#"+divId).dataTable({
		"paging":   false,
		"info":     false,
		"searching": false,
		"autoWidth": true,
		"aaSorting": []
	});
}
function initializeDataTableWithPagination(divId){
	$("#"+divId).dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]
	});
}