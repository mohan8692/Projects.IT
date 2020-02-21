var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
//var smallSpinner = '<img src="Assests/images/spinner.gif"/>';
var smallSpinner = '<img src="Assests/images/spinner.gif" style="width:25px;height:25px;"/>';
var glStartDate = '2018-04-01'//moment().startOf('year').format("YYYY-MM")+'-1';
var glEndDate = moment().format("YYYY-MM")+'-30';
var glStartDateForWebservice = moment().format("DD/MM/YYYY");
var glEndDateForWebservice = moment().format("DD/MM/YYYY");
var globalDivName;
var globalMCCMainDivName;
var $windowWidth = $(window).width();
var globalFinancialYear = "2018";
var globalResultsPendingWorks;
var globalResultsWeeklyReportWorks;

	$(".toolTipCls").tooltip();
	$("#selectedName").tooltip();
	$("#getWebserviceDetailsId").tooltip();
	$(document).keydown(function(event){
		if(event.keyCode==123){
			alert("Hoo no! don't try to expose me");
			return false;
		}
		else if(event.ctrlKey && event.shiftKey && event.keyCode==73){        
			alert("Hoo no! don't try to expose me");
			return false;  //Prevent from ctrl+shift+i
		}
	});
	var width = $(window).width()
	$(document).on('click','[collapse-overview]', function(){
		var type = $(this).attr("collapse-overview");
		if($(this).html() == '+')
		{
			$(this).html('-')
			$("[collapse-overview-body="+type+"]").show('slow');
		}else{
			$(this).html('+')
			$("[collapse-overview-body="+type+"]").hide('slow');
		}
	});
	$(document).on('click','[overview-popup-block]', function(){
		var projectDivId = $(this).attr("overview-popup-block");
		var levelId = $(this).attr("attr_levelId");
		var locationId = $(this).attr("attr_locationId");
		var mccMainProjectid = $(this).attr("attr_mcc_main_projectId");
		globalMCCMainDivName = mccMainProjectid;
		var levelType = 'state';
		var locType = '';
		var dataArr = '';
		var districtId = $("#selectedName").attr("attr_distId");
		if(levelId == 2)
		{
			locType = 'state';
			dataArr = ['state','district','constituency','mandal','panchayat'];
		}else if(levelId == 3)
		{
			locType = 'district';
			dataArr = ['district','constituency','mandal','panchayat'];
		}else if(levelId == 4)
		{
			locType = 'constituency'
			dataArr = ['constituency','mandal','panchayat'];
		}
		var tableId = projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '');
		$("#nregsPanExpModalId").modal('hide');
		$("#consolidatedView,#projectOverviewBlock").hide();
		$("#projectData").show();
		projectData(projectDivId,levelId,locationId);
		$('html,body').animate({
			scrollTop: $("#projectData").offset().top},
		'slow');
		
	});
	$(document).on('click','[overview-block]', function(){
		globalMCCMainDivName = '';
		var projectDivId = $(this).attr("overview-block");
		var levelId = $("[overview-block]").attr("attr_levelId");
		var locationId = $("[overview-block]").attr("attr_locationId");
			globalDivName = projectDivId;
			
			$("#consolidatedView").hide();
			$("#pendingWorksComponentView").hide();
			$("#pendingWorksComponentDivId").html('');
			$("#projectOverviewBlock,#projectData").show();
			$("[overview-state],[overview-district],.tableMenu li").removeClass("active");		
			$("[overview-state='"+projectDivId+"'],[overview-district='"+projectDivId+"']").addClass("active");
			$(".overviewAllCls").hide(); 
			if(globalDivName != "Pending Works" && globalDivName != "Weekly Comparision"){
				projectData(projectDivId,levelId,locationId);
			}
			if(globalDivName != 'coffee'&& globalDivName != 'Renovation and Improvements to existing Check Dams Check Wall'&& globalDivName != 'Road Formation Upto WBM GR II Including CD works'&& globalDivName != 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas'&& globalDivName !=  'Construction Of Animal Hostel'&& globalDivName != 'Roads for Unconnected Habitations 2011-12' && globalDivName != 'Construction of New Check Dam' && globalDivName !=  'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' && globalDivName !=  'Construction of Food Grains Storage Structures of 250MT' && globalDivName !=  'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' && globalDivName !=  'Construction of Village Haats Infrastructure fecilities' && globalDivName !=  'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' && globalDivName != 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' && globalDivName != 'Construction of Buildings for women self help group federation' && globalDivName != 'Work Site Facilities' && globalDivName != 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' && globalDivName != 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' && globalDivName != 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' && globalDivName != 'Production of Grafts in HNTC' && globalDivName != 'Improvements of RYTHU BAZAR' && globalDivName != 'Roads for Unconnected Habitations 2012-13 and afterwards' && globalDivName != 'HNTC Development' && globalDivName != 'New Open Well for Drinking water purpose' && globalDivName != 'Construction of Crematoria Burial Grounds' && globalDivName != 'Repairs to Existing Check Dam' && globalDivName != 'Formation of Road upto Gravel surface including CD works to agriculture fields' && globalDivName != 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' && globalDivName != 'Construction of Food Grains Storage Structures of 500MT' && globalDivName != 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' && globalDivName != 'Raising of Cashew bag seedlings for 2014-15' && globalDivName != 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas'  && globalDivName != 'Cattle Ponds' && globalDivName != 'Desilting of Drinking Water Tanks' && globalDivName != 'Comprehensive Restoration of minor Irrigation Tank1' && globalDivName != 'Animal Husbandry Others' && globalDivName != 'Comprehensive Restoration of minor Irrigation Tank' && globalDivName != "Azolla Production Unit" && globalDivName != "Construction of silopits of 3 MTs capacity" && globalDivName != "Fodder trough for Cattle Cattle drinking water trough" && globalDivName != "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" && globalDivName != "Raising of Perinnial Fodder" && globalDivName != "Raising of Silvipasture clubbed with subabul plantation" && globalDivName != "Construction of Checkdam across peeraiah vanka Check Dam 1" && globalDivName != "Man Days Comparision" && globalDivName != 'Greenary works Chettu' && globalDivName != 'Agriculture Related Works' && globalDivName != 'Rural Sanitation Works' && globalDivName != 'Soil Moisture Conservation works Neeru' && globalDivName != 'Works in community lands' && globalDivName != 'IJP PROGRAM WORKS' && globalDivName != 'Institutional Development Works' && globalDivName != 'Road Works' && globalDivName != 'Water Harvesting Structures Neeru' && globalDivName != 'AH-Live Stock Related works' && globalDivName != 'Expenditure' && globalDivName !='Daily Labour Turnout' && globalDivName !='FA Vacancies' && globalDivName !='Material Availability' && globalDivName !='Not Yet Completed Works' && globalDivName !='YearWiseExpenditure' && globalDivName !='Pending Works' && globalDivName !='Nutri Garden' && globalDivName !='Soak Pits' && globalDivName !='NRM Works' && globalDivName != 'Seed Dibbling' && globalDivName != 'Nursery' && globalDivName != 'Maintenance of Nurseries' && globalDivName != 'BT RoadsITDA' && globalDivName != 'BT RoadsPR' && globalDivName != 'Gravel Link RoadsPR' && globalDivName != 'WBM RoadsITDA' && globalDivName != 'WBM RoadsPR' && globalDivName != 'Weekly Comparision' && globalDivName != 'Departments Material Expenditure' && globalDivName != 'Approach Roads to Fish PondsMCC' && globalDivName != 'Construction of compound wallSchool Education Department')
			{
				overviewData(projectDivId,levelId,locationId);
			}
			if(globalDivName == "Pending Works"){
				getComponentWiseYearWisePaymentWisePendingWorksCollapse();
			}
			if(globalDivName == "Weekly Comparision"){
				getComponentWiseWeeklyProgressCollapse();
			}
			
			$('html,body').animate({
				scrollTop: $("#projectOverviewBlock").offset().top},
			'slow');
	});
	$(document).on("click",".rightNavigationMenuRes",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(".rightNavigationMenu ul,.backgroundBlock").hide();
		}
		else{
			$(this).addClass("active");
			$(".rightNavigationMenu ul,.backgroundBlock").show();
		}
	});
	$("header").on("click",".menu-cls",function(e){
		e.stopPropagation();
		$(".menu-data-cls").toggle();
	});
	$(document).on("click",function(){
		$(".menu-data-cls").hide();
	});
	$(".chosenSelect").chosen({width:'100%'})
	
	$("#dateRangePickerMGNF").val('2018-04-01');
	$("#dateRangePickerMGNT").val(moment().format("YYYY-MM")+'-30');
	
	
	$("#dateRangePickerMGNF").datetimepicker({
		format: 'YYYY-MM',
		viewMode:'months'
	});
	$("#dateRangePickerMGNT").datetimepicker({
		format: 'YYYY-MM',
		viewMode:'months'
	});
	$('#dateRangePickerMGNT').on('dp.change', function(e){ 
		glEndDate = e.date.format("YYYY-MM")+"-31";
		var levelId = $("#selectedName").attr("attr_levelId");
		var locId = $("#selectedName").attr("attr_id");
		var districtId = $("#selectedName").attr("attr_distid");
		var locType = '';
		
		manDaysEndDate = e.date.format("YYYYMM");
		
		if(levelId == 2)
		{
			locType = 'state'
		}else if(levelId == 3)
		{
			locType = 'district'
		}else if(levelId == 4)
		{
			locType = 'constituency'
		}
		var blockName = '';
		$(".panel-block-white").each(function(){
			if($(this).hasClass("active"))
			{
				blockName = $(this).attr("overview-block");
			}
		});
		
		$("#projectOverviewBlock,#projectData").html('');
		buildNREGSProjectsOverview(overViewArr,'');
		for(var i in overViewArr)
		{
			$("[overview-block='"+overViewArr[i]+"']").append(spinner);
			if(overViewArr[i] == 'NTR 90 Days' || overViewArr[i] == 'Production of Bricks' || overViewArr[i] == 'Cattle Drinking Water Troughs' || overViewArr[i] == 'Raising of Perinnial Fodders' || overViewArr[i] == 'Fish Ponds' || overViewArr[i] == 'Fish Drying Platforms' || overViewArr[i] == 'NTR Rural House' || overViewArr[i] == 'OPGK-Perinnials' || overViewArr[i] == 'OPGK-Annuals')
			{
				getNREGSProjectsAbstractNew(overViewArr[i],locType,locId,'',levelId);
			}else if(overViewArr[i] == 'Soak Pits')
			{
				getSoakPitsAbstractLevelsWiseData(overViewArr[i],locType,locId,'0',levelId,'');
			}else if(overViewArr[i] == 'Weekly Comparision')
			{
				getApWeeklyAcheivementAbstractData(overViewArr[i],locType,locId,'',levelId);
			}
			else if(overViewArr[i] == 'FA Vacancies')
			{
				getLocationWiseFAVacencies(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Material Availability')
			{
				getMaterialAvailabilityStatusForFinancialYear(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Not Yet Completed Works')
			{
				getWorkCompletionData(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Raising and Maintenance of Block Plantations' || overViewArr[i] == 'Raising and Maintenance of nurseries' || overViewArr[i] == 'Soil and Moisture Conservation Works' || overViewArr[i] == 'Raising and Maintenance of Avenue plantations' || overViewArr[i] == 'Seed Dibbling' || overViewArr[i] == 'Nursery' || overViewArr[i] == 'Maintenance of Nurseries')
			{
				getNREGSForestProjectsAbstract(overViewArr[i],locType,locId,'',levelId);
			}else if(overViewArr[i] == 'Payments')
			{
				getNregaPaymentsAbsAndOverviewDtls(overViewArr[i],locType,locId,levelId,'abstract');
			}else if(overViewArr[i] == 'Greenary works Chettu' || overViewArr[i] == 'Agriculture Related Works' || overViewArr[i] == 'Rural Sanitation Works' || overViewArr[i] == 'Soil Moisture Conservation works Neeru' || overViewArr[i] == 'Works in community lands' || overViewArr[i] == 'IJP PROGRAM WORKS' || overViewArr[i] == 'Institutional Development Works' || overViewArr[i] == 'Road Works' || overViewArr[i] == 'Water Harvesting Structures Neeru' || overViewArr[i] == 'AH-Live Stock Related works'){
				getNregaOtherMCCAbstarctData(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Renovation and Improvements to existing Check Dams Check Wall' || overViewArr[i] == 'Road Formation Upto WBM GR II Including CD works' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || overViewArr[i] == 'Construction Of Animal Hostel' || overViewArr[i] == 'Roads for Unconnected Habitations 2011-12' || overViewArr[i] == 'Construction of New Check Dam' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 250MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || overViewArr[i] == 'Construction of Village Haats Infrastructure fecilities' || overViewArr[i] == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || overViewArr[i] == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || overViewArr[i] == 'Construction of Buildings for women self help group federation' || overViewArr[i] == 'Work Site Facilities' || overViewArr[i] == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || overViewArr[i] == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || overViewArr[i] == 'Production of Grafts in HNTC' || overViewArr[i] == 'Improvements of RYTHU BAZAR' || overViewArr[i] == 'Roads for Unconnected Habitations 2012-13 and afterwards' || overViewArr[i] == 'HNTC Development' || overViewArr[i] == 'New Open Well for Drinking water purpose' || overViewArr[i] == 'Construction of Crematoria Burial Grounds' || overViewArr[i] == 'Repairs to Existing Check Dam' || overViewArr[i] == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || overViewArr[i] == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 500MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || overViewArr[i] == 'Raising of Cashew bag seedlings for 2014-15' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || overViewArr[i] == 'Comprehensive Restoration of minor Irrigation Tank' || overViewArr[i] == "Azolla Production Unit" || overViewArr[i] == "Construction of silopits of 3 MTs capacity" || overViewArr[i] == "Fodder trough for Cattle Cattle drinking water trough" || overViewArr[i] == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || overViewArr[i] == "Raising of Perinnial Fodder" || overViewArr[i] == "Raising of Silvipasture clubbed with subabul plantation"){
				getNregaCovergancePROtherLevelData(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == "Man Days Comparision"){
					getManWorkDaysOfNrega(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == "Expenditure"){
					getManWorksExpenditureAbstarct(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Daily Labour Turnout'){
				getFieldManDaysWorkDetails(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}
			else if(overViewArr[i] != 'Weekly Comparision')
			{
				getNREGSAbstractDataByType(overViewArr[i],locType,locId,'',levelId,'dateChange');
			}
			if(levelId == 4)
			{
				if(overViewArr[i] == 'NTR 90 Days' || overViewArr[i] == 'Production of Bricks' || overViewArr[i] == 'Cattle Drinking Water Troughs' || overViewArr[i] == 'Raising of Perinnial Fodders' || overViewArr[i] == 'Fish Ponds' || overViewArr[i] == 'Fish Drying Platforms' || overViewArr[i] == 'NTR Rural House' || overViewArr[i] == 'OPGK-Perinnials' || overViewArr[i] == 'OPGK-Annuals')
				{
					getNREGSProjectsAbstractNewFrConstituency(overViewArr[i],locType,locId,districtId,'',levelId);
				}else if(overViewArr[i] == 'FA Vacancies')
				{
					getLocationWiseFAVacencies(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Material Availability')
				{
					getMaterialAvailabilityStatusForFinancialYear(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Not Yet Completed Works')
				{
					getWorkCompletionData(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Payments')
				{
					getNregaPaymentsAbsAndOverviewDtls(overViewArr[i],locType,locId,levelId,'abstract');
				}else if(overViewArr[i] != 'Weekly Comparision'){
					getNREGSAbstractDataByTypeFrConstituency(overViewArr[i],locType,locId,districtId,'',levelId);
				}
			}
		}
	});
	$('#dateRangePickerMGNF').on('dp.change', function(e){ 
		glStartDate = e.date.format("YYYY-MM")+"-01";
		var levelId = $("#selectedName").attr("attr_levelId");
		var locId = $("#selectedName").attr("attr_id");
		var districtId = $("#selectedName").attr("attr_distid");
		var locType = '';
		
		manDaysStartDate = e.date.format("YYYYMM");
		
		var fromDatteee = new Date(glStartDate);
		var lastFinaYearDatee = new Date("2018-03-31");
		if(fromDatteee > lastFinaYearDatee)
			globalFinancialYear = "2018";
		else
			globalFinancialYear = "2017";
		
		if(levelId == 2)
		{
			locType = 'state'
		}else if(levelId == 3)
		{
			locType = 'district'
		}
		var blockName = '';
		$(".panel-block-white").each(function(){
			if($(this).hasClass("active"))
			{
				blockName = $(this).attr("overview-block");
			}
		});
		$("#projectOverviewBlock,#projectData").html('');
		
		buildNREGSProjectsOverview(overViewArr,'');
		getNREGSLevelWiseConsolidatedReportConsolidated(levelId,locType,locType,locId,"ConsolidatedView"+locType,districtId,'completed');
		for(var i in overViewArr)
		{
			$("[overview-block='"+overViewArr[i]+"']").append(spinner);
			if(overViewArr[i] == 'NTR 90 Days' || overViewArr[i] == 'Production of Bricks' || overViewArr[i] == 'Cattle Drinking Water Troughs' || overViewArr[i] == 'Raising of Perinnial Fodders' || overViewArr[i] == 'Fish Ponds' || overViewArr[i] == 'Fish Drying Platforms' || overViewArr[i] == 'NTR Rural House' || overViewArr[i] == 'OPGK-Perinnials' || overViewArr[i] == 'OPGK-Annuals')
			{
				getNREGSProjectsAbstractNew(overViewArr[i],locType,locId,'',levelId);
			}else if(overViewArr[i] == 'Soak Pits')
			{
				getSoakPitsAbstractLevelsWiseData(overViewArr[i],locType,locId,'0',levelId,'');
			}else if(overViewArr[i] == 'Weekly Comparision')
			{
				getApWeeklyAcheivementAbstractData(overViewArr[i],locType,locId,'',levelId);
			}else if(overViewArr[i] == 'FA Vacancies')
			{
				getLocationWiseFAVacencies(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Material Availability')
			{
				getMaterialAvailabilityStatusForFinancialYear(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Not Yet Completed Works')
			{
				getWorkCompletionData(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}
			else  if(overViewArr[i] == 'Raising and Maintenance of Block Plantations' || overViewArr[i] == 'Raising and Maintenance of nurseries' || overViewArr[i] == 'Soil and Moisture Conservation Works' || overViewArr[i] == 'Raising and Maintenance of Avenue plantations' || overViewArr[i] == 'Seed Dibbling' || overViewArr[i] == 'Nursery' || overViewArr[i] == 'Maintenance of Nurseries')
			{
				getNREGSForestProjectsAbstract(overViewArr[i],locType,locId,'',levelId);
			}else if(overViewArr[i] == 'Payments')
			{
				getNregaPaymentsAbsAndOverviewDtls(overViewArr[i],locType,locId,levelId,'abstract');
			}else if(overViewArr[i] == 'Greenary works Chettu' || overViewArr[i] == 'Agriculture Related Works' || overViewArr[i] == 'Rural Sanitation Works' || overViewArr[i] == 'Soil Moisture Conservation works Neeru' || overViewArr[i] == 'Works in community lands' || overViewArr[i] == 'IJP PROGRAM WORKS' || overViewArr[i] == 'Institutional Development Works' || overViewArr[i] == 'Road Works' || overViewArr[i] == 'Water Harvesting Structures Neeru' || overViewArr[i] == 'AH-Live Stock Related works'){
				getNregaOtherMCCAbstarctData(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Renovation and Improvements to existing Check Dams Check Wall' || overViewArr[i] == 'Road Formation Upto WBM GR II Including CD works' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || overViewArr[i] == 'Construction Of Animal Hostel' || overViewArr[i] == 'Roads for Unconnected Habitations 2011-12' || overViewArr[i] == 'Construction of New Check Dam' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 250MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || overViewArr[i] == 'Construction of Village Haats Infrastructure fecilities' || overViewArr[i] == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || overViewArr[i] == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || overViewArr[i] == 'Construction of Buildings for women self help group federation' || overViewArr[i] == 'Work Site Facilities' || overViewArr[i] == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || overViewArr[i] == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || overViewArr[i] == 'Production of Grafts in HNTC' || overViewArr[i] == 'Improvements of RYTHU BAZAR' || overViewArr[i] == 'Roads for Unconnected Habitations 2012-13 and afterwards' || overViewArr[i] == 'HNTC Development' || overViewArr[i] == 'New Open Well for Drinking water purpose' || overViewArr[i] == 'Construction of Crematoria Burial Grounds' || overViewArr[i] == 'Repairs to Existing Check Dam' || overViewArr[i] == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || overViewArr[i] == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 500MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || overViewArr[i] == 'Raising of Cashew bag seedlings for 2014-15' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || overViewArr[i] == 'Comprehensive Restoration of minor Irrigation Tank' || overViewArr[i] == "Azolla Production Unit" || overViewArr[i] == "Construction of silopits of 3 MTs capacity" || overViewArr[i] == "Fodder trough for Cattle Cattle drinking water trough" || overViewArr[i] == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || overViewArr[i] == "Raising of Perinnial Fodder" || overViewArr[i] == "Raising of Silvipasture clubbed with subabul plantation"){
				getNregaCovergancePROtherLevelData(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == "Man Days Comparision"){
					getManWorkDaysOfNrega(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == "Expenditure"){
					getManWorksExpenditureAbstarct(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] == 'Daily Labour Turnout'){
				getFieldManDaysWorkDetails(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
			}else if(overViewArr[i] != 'Weekly Comparision')
			{
				getNREGSAbstractDataByType(overViewArr[i],locType,locId,'',levelId,'dateChange');
			}
			if(levelId == 4)
			{
				if(overViewArr[i] == 'NTR 90 Days' || overViewArr[i] == 'Production of Bricks' || overViewArr[i] == 'Cattle Drinking Water Troughs' || overViewArr[i] == 'Raising of Perinnial Fodders' || overViewArr[i] == 'Fish Ponds' || overViewArr[i] == 'Fish Drying Platforms' || overViewArr[i] == 'NTR Rural House' || overViewArr[i] == 'OPGK-Perinnials' || overViewArr[i] == 'OPGK-Annuals')
				{
					getNREGSProjectsAbstractNewFrConstituency(overViewArr[i],locType,locId,districtId,'',levelId);
				}else if(overViewArr[i] == 'FA Vacancies')
				{
					getLocationWiseFAVacencies(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Material Availability')
				{
					getMaterialAvailabilityStatusForFinancialYear(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Not Yet Completed Works')
				{
					getWorkCompletionData(overViewArr[i],locType,'',locType,locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Payments')
				{
					getNregaPaymentsAbsAndOverviewDtls(overViewArr[i],locType,locId,levelId,'abstract');
				}else if(overViewArr[i] != 'Weekly Comparision'){
					getNREGSAbstractDataByTypeFrConstituency(overViewArr[i],locType,locId,districtId,'',levelId);
				}
			}
		}
	});
	$(document).on('click','#getWebserviceDetailsId', function(){
		getWebserviceHealthDetails(glStartDateForWebservice,glEndDateForWebservice);
	});   
	$(document).on('click','.timelyPaymentRadioCls', function(){
		var programType = $(this).attr("attr_type");
		var divIdd = $(this).attr("attr_id");
		
		var locationType = $(this).attr("attr_locationType");
		var levelId = $(this).attr("attr_levelId");
		var locationId = $(this).attr("overview-locationId");
		var menuLocationType = '';
		var menuLocationId = '';
		var buildType = $(this).attr("attr_name");
		if(levelId == 2)
		{
			menuLocationId = "-1";
			menuLocationType = "state";
		}else if(levelId == 3)
		{
			menuLocationId = locationId;
			menuLocationType = "district";
		}
		getNregaLevelsWiseDataFrNewCalls(divIdd,locationType,menuLocationType,menuLocationId,'Timely Payment',programType)
	}); 
	var globalTimelyPaymentType;
	$(document).on('click','.timelyPaymentOverviewCls', function(){
		var programType = $(this).attr("attr_type");
		globalTimelyPaymentType = programType;
		var levelId = $(this).attr("levelId");
		var menuLocationId = '';
		var menuLocationType = '';
		var districtId = '';
		if(levelId == 2)
		{
			menuLocationId = "-1";
			menuLocationType = "state";
		}else if(levelId == 3)
		{
			menuLocationId = locationId;
			menuLocationType = "district";
		}else if(levelId == 4)
		{
			menuLocationId = locationId;
			menuLocationType = "constituency";
			districtId = $("#selectedName").attr("attr_distId");
		}
		
		getNregasOverview('Timely Payment',menuLocationType,menuLocationId,districtId,programType);
	});   
	$(document).on('click','[overview-level]', function(){
		var levelType = $(this).attr("overview-level");
		if(globalMCCMainDivName == 'Greenary works Chettu' || globalMCCMainDivName == 'Agriculture Related Works' || globalMCCMainDivName == 'Rural Sanitation Works' || globalMCCMainDivName == 'Soil Moisture Conservation works Neeru' || globalMCCMainDivName == 'Works in community lands' || globalMCCMainDivName == 'IJP PROGRAM WORKS' || globalMCCMainDivName == 'Institutional Development Works' || globalMCCMainDivName == 'Road Works' || globalMCCMainDivName == 'Water Harvesting Structures Neeru' || globalMCCMainDivName == 'AH-Live Stock Related works'){
			if(levelType == 'district' || levelType == 'constituency' || levelType == 'mandal' || levelType == 'panchayat')
			{
				return;
			}
		}else if(globalDivName == 'Expenditure'){
			if(levelType == 'district' || levelType == 'constituency' || levelType == 'mandal' || levelType == 'panchayat')
			{
				return;
			}
		}else{
			if(levelType == 'district' || levelType == 'constituency')
			{
				return;
			}
		}
		
		var collapseExpanded = $(this).attr("aria-expanded");
		if(collapseExpanded == true || collapseExpanded == 'true')
		{
			var divId = $(this).attr("overview-divId");
			var levelId = $(this).attr("overview-levelId");
			var locationId = $(this).attr("overview-locationId");
			var menuLocationId = '';
			var menuLocationType = '';
			if(levelId == 2)
			{
				menuLocationId = "-1";
				menuLocationType = "state";
			}else if(levelId == 3)
			{
				menuLocationId = locationId;
				menuLocationType = "district";
			}else if(levelId == 4)
			{
				menuLocationId = locationId;
				menuLocationType = "constituency";
			}
			var theadArr;
			if(globalDivName == "GH"){
				if(levelType == "state" || levelType == "district")
				{
					theadArr = [levelType,'District Target(in Ha)','Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				}else if(levelType == "constituency")
				{
					theadArr = ["district",levelType,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				}else if(levelType == "mandal")
				{
					theadArr = ["district","constituency",levelType,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				}else if(levelType == "panchayat")
				{
					theadArr = ["district","constituency","mandal",levelType,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				}
			}else{
				theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				if(levelType == "constituency")
					theadArr = ["district",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(levelType == "mandal")
					theadArr = ["district","constituency",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(levelType == "panchayat")
					theadArr = ["district","constituency","mandal",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				
				if((globalDivName == 'Cattle Drinking Water Troughs' || globalDivName == 'Raising of Perinnial Fodders') && levelType == "state")
					theadArr = [levelType,'Target','sanctioned Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','sanctioned Percentage'];
				if(globalDivName == 'Farm Ponds' || globalDivName == 'IHHL' || globalDivName == 'Vermi Compost' || globalDivName == 'Burial Ground' || globalDivName == 'Solid Waste Management' || globalDivName == 'Play fields' || globalDivName == 'NTR 90 Days' || globalDivName == 'Production of Bricks')
				{
					if(levelType == "constituency")
					{
						theadArr = ["district",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					}else if(levelType == "mandal"){
						theadArr = ["district","constituency",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					}else if(levelType == "panchayat"){
						theadArr = ["district","constituency","mandal",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					}else{
						theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					}
				}
					
				if(globalDivName == 'Mulbery New' || globalDivName == 'Silk worm New')
				{
					if(levelType == "state")
					{
						theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achivement Percentage','Wage Exp','Material Exp','Total Exp'];
					}else if(levelType == "district")
					{
						theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					}else if(levelType == "constituency")
					{
						theadArr = ["district",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					}else if(levelType == "mandal")
					{
						theadArr = ["district","constituency",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					}else if(levelType == "panchayat")
					{
						theadArr = ["district","constituency","mandal",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					}
				}
					
				
				if((globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW') && (levelType == "state" || levelType == "district"))
					theadArr = [levelType,'Target','sanctioned Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','sanctioned Percentage'];
				
				if((globalDivName == 'Fish Ponds' || globalDivName == 'Fish Drying Platforms') && (levelType == "state" || levelType == "district"))
					theadArr = [levelType,'Target','sanctioned','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','sanctioned Percentage','Achievement Percentage'];
				
				if(globalDivName == 'Anganwadi')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
					else
						theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
				}
				
				if(globalDivName == 'Man Days Comparision')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'This Month','Financial Year as of Today','Increment/Decrement (%)','Last Financial Year Same Day','Last Financial Year','From 2014'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'This Month','Financial Year as of Today','Increment/Decrement (%)','Last Financial Year Same Day','Last Financial Year','From 2014'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'This Month','Financial Year as of Today','Increment/Decrement (%)','Last Financial Year Same Day','Last Financial Year','From 2014'];
					else
						theadArr = [levelType,'This Month','Financial Year as of Today','Increment/Decrement (%)','Last Financial Year Same Day','Last Financial Year','From 2014'];
				}
				
				if(globalDivName == 'Expenditure')
				{
						theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
				}
				if(globalDivName == 'Daily Labour Turnout')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Today','Yesterday','This week','Last Week','This Month','Last Month','Last 3 Months','Last 6 Months','This Fin year'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Today','Yesterday','This week','Last Week','This Month','Last Month','Last 3 Months','Last 6 Months','This Fin year'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Today','Yesterday','This week','Last Week','This Month','Last Month','Last 3 Months','Last 6 Months','This Fin year'];
					else
						theadArr = [levelType,'Today','Yesterday','This week','Last Week','This Month','Last Month','Last 3 Months','Last 6 Months','This Fin year'];
				}
				
				if(globalDivName == 'GP Buildings1' || globalDivName == 'Mandal buildings1')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
					else
						theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
				}
				
				if(globalDivName !='' && (globalDivName == 'Agriculture Related Works' || globalDivName == 'Greenary works Chettu' || globalDivName == 'Rural Sanitation Works' || globalDivName == 'IJP PROGRAM WORKS' || globalDivName == 'Works in community lands' || globalDivName == 'Soil Moisture Conservation works Neeru' || globalDivName == 'Institutional Development Works' || globalDivName == 'Road Works' || globalDivName == 'Water Harvesting Structures Neeru' || globalDivName == 'AH-Live Stock Related works')){
				theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				if(levelType == "constituency")
					theadArr = ["district",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(levelType == "mandal")
					theadArr = ["district","constituency",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(levelType == "panchayat")
					theadArr = ["district","constituency","mandal",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				}
				if(divId == 'FA Vacancies'){
					theadArr = [levelType,'Total','Senior Mate','Junior Mate','Mate'];
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Total','Senior Mate','Junior Mate','Mate'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Total','Senior Mate','Junior Mate','Mate'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Total','Senior Mate','Junior Mate','Mate'];
				}	
				if(divId == 'Material Availability'){
					theadArr = [levelType,'Wage Exp (CR)','Material Entitlement (CR)','Material Exp (CR)','Material %','Balance Material (CR)'];
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Wage Exp (CR)','Material Entitlement (CR)','Material Exp (CR)','Material %','Balance Material (CR)'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Wage Exp','Material Entitlement','Material Exp','Material %','Balance Material'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Wage Exp','Material Entitlement','Material Exp','Material %','Balance Material'];
				}
				if(divId == 'Not Yet Completed Works'){
					theadArr = [levelType,'FY 2014-15','FY 2015-16','FY 2016-17','FY 2017-18','FY 2018-19','Total'];
					if(levelType == "constituency")
						theadArr = ["district",levelType,'FY 2014-15','FY 2015-16','FY 2016-17','FY 2017-18','FY 2018-19','Total'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'FY 2014-15','FY 2015-16','FY 2016-17','FY 2017-18','2018-19','Total'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'FY 2014-15','FY 2015-16','FY 2016-17','FY 2017-18','2018-19','Total'];
				}
				if(globalDivName == 'YearWiseExpenditure')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'2014-15','2015-16','2016-17','2017-18','2018-19','%Growth Over FY 2014-15','%Growth Over FY 2015-16','%Growth Over FY 2016-17','%Growth Over FY 2017-18'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'2014-15','2015-16','2016-17','2017-18','2018-19','%Growth Over FY 2014-15','%Growth Over FY 2015-16','%Growth Over FY 2016-17','%Growth Over FY 2017-18'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'2014-15','2015-16','2016-17','2017-18','2018-19','%Growth Over FY 2014-15','%Growth Over FY 2015-16','%Growth Over FY 2016-17','%Growth Over FY 2017-18'];
					else
						theadArr = [levelType,'2014-15','2015-16','2016-17','2017-18','2018-19','%Growth Over FY 2014-15','%Growth Over FY 2015-16','%Growth Over FY 2016-17','%Growth Over FY 2017-18'];
				}
				
					if(divId == 'Animal Hostels' || divId == 'Mega Kshetralu' || divId == 'Continuous Trenches' || divId == 'Check Dam' || divId == 'Desilting CD' || divId == 'Percolation tank' || divId == 'Rock fill dams' || divId == 'Village Haats' || divId == 'Village Parks' || divId == 'BT RoadsITDA' || divId == 'BT RoadsPR' || divId == 'Gravel Link RoadsPR' || divId == 'WBM RoadsITDA' || divId == 'WBM RoadsPR' || divId == 'Approach Roads to Fish PondsMCC' || divId == 'Construction of compound wallSchool Education Department')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
					else
						theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}
				
				if(divId == 'Mini Percolation tank' || divId == 'Nutri Garden')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
					else if(divId == 'Nutri Garden')
						theadArr = [levelType,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
					else
						theadArr = [levelType,'Target','Grounded','Grounded Percentage','sanctioned Target','sanctioned Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				}
				
				if(divId == 'Soak Pits')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Total GPs','Totals HHs','Grounded GPs','Grounded Soak Pits','In Progress GPs','In Progress Soak Pits','Completed GPs','Completed Soak Pits','Achievement Percentage'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Total GPs','Totals HHs','Grounded GPs','Grounded Soak Pits','In Progress GPs','In Progress Soak Pits','Completed GPs','Completed Soak Pits','Achievement Percentage'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Total GPs','Totals HHs','Grounded GPs','Grounded Soak Pits','In Progress GPs','In Progress Soak Pits','Completed GPs','Completed Soak Pits','Achievement Percentage'];
					else
						theadArr = [levelType,'Total GPs','Totals HHs','Grounded GPs','Grounded Soak Pits','In Progress GPs','In Progress Soak Pits','Completed GPs','Completed Soak Pits','Achievement Percentage'];
				}
				
				if(divId == 'NRM Works')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Target','Completed','Achievement Percentage'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Target','Completed','Achievement Percentage'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Target','Completed','Achievement Percentage'];
					else
						theadArr = [levelType,'Target','Completed','Achievement Percentage'];
				}
				if(divId == 'Departments Material Expenditure')
				{
					if(levelType == "constituency")
						theadArr = ["district",levelType,'Panchayat Raj','ITDA','Forest','Serp','Housing','Animal Husbandary','Fisheries','Sericulture','Education','MCC','WCC','CCC','Total Exp','Balance Material'];
					else if(levelType == "mandal")
						theadArr = ["district","constituency",levelType,'Panchayat Raj','ITDA','Forest','Serp','Housing','Animal Husbandary','Fisheries','Sericulture','Education','MCC','WCC','CCC','Total Exp','Balance Material'];
					else if(levelType == "panchayat")
						theadArr = ["district","constituency","mandal",levelType,'Panchayat Raj','ITDA','Forest','Serp','Housing','Animal Husbandary','Fisheries','Sericulture','Education','MCC','WCC','CCC','Total Exp','Balance Material'];
					else
						theadArr = [levelType,'Panchayat Raj','ITDA','Forest','Serp','Housing','Animal Husbandary','Fisheries','Sericulture','Education','MCC','WCC','CCC','Total Exp','Balance Material'];
				}
			}
			
			
			var tableId = divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+levelType;
			
			$("#"+tableId).html(spinner);
			var districtId = $("#selectedName").attr("attr_distId");
			if(levelType == 'panchayat' || levelType == 'mandal')
			{
				
				if(divId == 'Labour Budget')
					getNREGSLabBugdtLelwiseData(tableId,levelType,menuLocationType,menuLocationId,divId);
				else if(divId == "Agriculture Activities")
					getNregaLevelsWiseDataFrAgriculture(tableId,levelType,menuLocationType,menuLocationId,divId);
				else if(divId == "Average Wage" || divId == "Average Days of Employment" || divId == "HH Completed 100 Days" || divId == "Nurseries")
					getNregaLevelsWiseDataFrNewCalls(tableId,levelType,menuLocationType,menuLocationId,divId);
				else if(divId == "Timely Payment")
					getNregaLevelsWiseDataFrNewCalls(tableId,levelType,menuLocationType,menuLocationId,divId,'-1');
				else if(divId == "Man Days Comparision")
					getManWorkDaysOfNrega(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
				else if(divId == "Expenditure")
					getManWorksExpenditureDetails(tableId,levelType,'',menuLocationType,menuLocationId,divId,districtId,divId,'',levelId);
				else if(divId == "Daily Labour Turnout")
					getFieldManDaysWorkDetails(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
				else if(divId == "Horticulture")//
					getNregaLevelsWiseDataFrHorticulture(tableId,levelType,menuLocationType,menuLocationId,divId);
				else if(divId == "Avenue")//
					getNregaLevelsWiseDataFrAvenue(tableId,levelType,menuLocationType,menuLocationId,divId);
				else if(divId == "CC Roads1"  || divId == "UGDrainage")//
					getNregaLevelsWiseDataForCCRoads(tableId,levelType,menuLocationType,menuLocationId,divId);
				else if(divId == "Payments" ) //&& (levelType == "state" || levelType == "district" || levelType == "mandal"))
					getNregaPaymentsDtlsLocationWise(tableId,levelType,menuLocationType,menuLocationId,'Wage',divId);
				else if(divId == "PaymentsDeptWise")//
					getNregaDeptWisePaymentsDtlsLocationWise(tableId,levelType,menuLocationType,menuLocationId,'Total',divId,"All");
				else if(divId == "YearWiseExpenditure")//
					getYearWiseExpenditureDetails(tableId,levelType,menuLocationType,menuLocationId,divId,theadArr);
				else if(divId == "FAperformance")
					getNregaLevelsWiseDataForFAPerformance(tableId,levelType,menuLocationType,menuLocationId,divId);
				else if(divId == "FA Vacancies")
					getLocationWiseFAVacencies(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
				else if(divId == 'Material Availability')
					getMaterialAvailabilityStatusForFinancialYear(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
				else if(divId == 'Departments Material Expenditure')
					getNregaDeptWiseMaterialExpenditureDtlsLocationWise(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId);
				else if(divId == 'Not Yet Completed Works')
					getWorkCompletionData(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
				else if(divId == 'Raising and Maintenance of Block Plantations' || divId == 'Raising and Maintenance of nurseries' || divId == 'Soil and Moisture Conservation Works' || divId == 'Raising and Maintenance of Avenue plantations' || divId == 'Seed Dibbling' || divId == 'Nursery' || divId == 'Maintenance of Nurseries')
					getNregaForestLevelData(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId);
				else if(divId == 'Greenary works Chettu' || divId == 'Agriculture Related Works' || divId == 'Rural Sanitation Works' || 	divId == 'Soil Moisture Conservation works Neeru' || divId == 'Works in community lands' || divId == 'IJP PROGRAM WORKS' || divId == 'Institutional Development Works' || divId == 'Road Works' || divId == 'Water Harvesting Structures Neeru' || divId == 'AH-Live Stock Related works'){
					getNregaOtherMCCAbstarctData(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
				}
				
				else if(divId == 'coffee')
					getNregaLevelsWiseDataFrCoffeePlantation(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId);
				else if(divId == 'Cattle Ponds' || divId == 'Desilting of Drinking Water Tanks' || divId == 'Comprehensive Restoration of minor Irrigation Tank1' || divId == 'Animal Husbandry Others')					
					getNregaMCCNewComponetsLevelData(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
				else if(divId == 'Renovation and Improvements to existing Check Dams Check Wall' || divId == 'Road Formation Upto WBM GR II Including CD works' || divId == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || divId == 'Construction Of Animal Hostel'|| divId == 'Roads for Unconnected Habitations 2011-12' || divId == 'Construction of New Check Dam' || divId == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || divId == 'Construction of Food Grains Storage Structures of 250MT' || divId == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || divId == 'Construction of Village Haats Infrastructure fecilities' || divId == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || divId == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || divId == 'Construction of Buildings for women self help group federation' || divId == 'Work Site Facilities' || divId == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || divId == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || divId == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || divId == 'Production of Grafts in HNTC' || divId == 'Improvements of RYTHU BAZAR' || divId == 'Roads for Unconnected Habitations 2012-13 and afterwards' || divId == 'HNTC Development' || divId == 'New Open Well for Drinking water purpose' || divId == 'Construction of Crematoria Burial Grounds' || divId == 'Repairs to Existing Check Dam' || divId == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || divId == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || divId == 'Construction of Food Grains Storage Structures of 500MT' || divId == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || divId == 'Raising of Cashew bag seedlings for 2014-15' || divId == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || divId == 'Comprehensive Restoration of minor Irrigation Tank' || divId == "Azolla Production Unit" || divId == "Construction of silopits of 3 MTs capacity" || divId == "Fodder trough for Cattle Cattle drinking water trough" || divId == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || divId == "Raising of Perinnial Fodder" || divId == "Raising of Silvipasture clubbed with subabul plantation")
					getNregaCovergancePROtherLevelData(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
				else if(divId == 'Animal Hostels' || divId == 'Mega Kshetralu' || divId == 'Continuous Trenches' || divId == 'Check Dam' || divId == 'Desilting CD' || divId == 'Mini Percolation tank' || divId == 'Percolation tank' || divId == 'Rock fill dams' || divId == 'Village Haats' || divId == 'Village Parks' || divId == 'Nutri Garden' || divId == 'Soak Pits' || divId == 'NRM Works' || divId == 'BT RoadsITDA' || divId == 'BT RoadsPR' || divId == 'Gravel Link RoadsPR' || divId == 'WBM RoadsITDA' || divId == 'WBM RoadsPR' || divId == 'Approach Roads to Fish PondsMCC' || divId == 'Construction of compound wallSchool Education Department')
					getNregaKeyPropertyComponentsLevelsWiseData(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId);
				else
					getNregaLevelsWiseData(tableId,levelType,theadArr,menuLocationType,menuLocationId,divId,districtId);
			}
		}
		
	});
	
//}

function getNregaForestLevelData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId)
{
	$("#"+divIdd).html(spinner);
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		category : globalDivName,
		locationId : menuLocationId,
		sublocationType : locationTypeNew,
		districtId:districtId
	}
	
	$.ajax({
		url: 'getNregaForestLevelData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationTypeNew == "state"){
							str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
						}
						else if(locationTypeNew == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationTypeNew == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationTypeNew == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationTypeNew == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						
						str+='<td>'+ajaxresp[i].target+'</td>';
						str+='<td>'+ajaxresp[i].grounded+'</td>';
						
						var groundValue = ajaxresp[i].grounded;
						var targetValue = ajaxresp[i].target;
						var groundedPerc = "0.00";
						if(targetValue > 0 && groundValue > 0)
							groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
						
							if(groundedPerc >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 90 && groundedPerc < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 60 && groundedPerc < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
							}
							
							str+='<td>'+ajaxresp[i].notGrounded+'</td>';
							str+='<td>'+ajaxresp[i].inProgress+'</td>';
							str+='<td>'+ajaxresp[i].completed+'</td>';
							
							if(ajaxresp[i].percentage >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationTypeNew,blockName);
		}
	});
}

	$("#dateRangePickerAUM").daterangepicker({   
			opens: 'left',
			startDate: glStartDateForWebservice,
			endDate: glEndDateForWebservice,   
		locale: {
		  format: 'DD/MM/YYYY'
		},
		ranges: {
			'All':[moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY"), moment().add(10, 'years').endOf('year').format("DD/MM/YYYY")],
			'Today' : [moment(), moment()],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		   'Last 3 Months': [moment().subtract(3, 'month'), moment()],
		   'Last 6 Months': [moment().subtract(6, 'month'), moment()],
		   'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
		   'Last 2 Year': [moment().subtract(2, 'Year'), moment()],
		   'Last 3 Year': [moment().subtract(3, 'Year'), moment()],
		   'This Month': [moment().startOf('month'), moment()],
		   'This Year': [moment().startOf('Year'), moment()]
		}
	});
	$('#dateRangePickerAUM').on('apply.daterangepicker', function(ev, picker) {
		
		$(".switch-btn li").removeClass("active");
		$(".switch-btn li:first-child").addClass("active");
		$('[role="tablist"] li:first-child a').trigger('click');
		$('#tabCons a[href="#consLevelGraph"]').trigger('click');
		glStartDateForWebservice = picker.startDate.format('DD/MM/YYYY')
		glEndDateForWebservice = picker.endDate.format('DD/MM/YYYY')
		getWebserviceHealthDetails(glStartDateForWebservice,glEndDateForWebservice);
	});
	function getWebserviceHealthDetails(fromDate,toDate){
		$("#webserviceDetailsModalDivId").modal('show');
		$("#webserviceDetailsModalId").html(spinner);    
		var json = {
					fromDate : fromDate,    
					toDate : toDate, 
				};
		$.ajax({
			url : "getWebserviceHealthDetails",             
			data : JSON.stringify(json),
			type : "POST",
			dataTypa : 'json',   
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(ajaxresp){
				buildWebserviceHealthDetails(ajaxresp);
			}
		});
	}
	function buildWebserviceHealthDetails(ajaxresp){
		var str = "";
		str+='<div class="table-responsive">';
		str+='<table id="webserviceHealthDetailsTableId" class="table table-bordered">';
		str+='<thead>';
		str+='<tr>';
		str+='<th>Provider</th>';
		str+='<th>Module</th>';
		str+='<th>Service Name</th>';
		str+='<th>No of Call</th>';
		str+='<th>Success</th>';
		str+='<th>Fail</th>';
		str+='<th>No Response</th>';
		str+='<th>Total time taken(sec)</th>';
		str+='<th>Total time taken(min)</th>';
		str+='<th>Average time taken(sec)</th>';
		str+='</tr>';
		str+='</thead>';
		str+='<tbody>';
		for (var i in ajaxresp){  
			str+='<tr>';
			str+='<td>'+ajaxresp[i].providerName+'</td>';
			str+='<td>'+ajaxresp[i].moduleName+'</td>';
			str+='<td>'+ajaxresp[i].webserviceName+'</td>';
			str+='<td>'+ajaxresp[i].totalCalls+'</td>';
			str+='<td>'+ajaxresp[i].totalSuccess+'</td>';
			if(ajaxresp[i].totalFail != 0){
				str+='<td>'+ajaxresp[i].totalFail+'</td>';
			}else{
				str+='<td>-</td>';
			}
			if(ajaxresp[i].noResponce != 0){
				str+='<td>'+ajaxresp[i].noResponce+'</td>';
			}else{
				str+='<td>-</td>';      
			}
			str+='<td>'+ajaxresp[i].totalTime+'</td>';
			str+='<td>'+ajaxresp[i].totalTimeInMin+'</td>';
			str+='<td>'+ajaxresp[i].averageTime+'</td>';
			str+='</tr>';
		}
		str+='</tbody>';
		str+='</table>';
		str+='</div>';
		$("#webserviceDetailsModalId").html(str);
		$("#webserviceHealthDetailsTableId").dataTable({
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o" title="Excel"></i>',
					titleAttr: 'CSV',
				},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o" title="PDF"></i>',
					titleAttr: 'PDF',
					orientation: "landscape",
					pageSize:'A3',
					customize: function (doc) {
						doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
					}
				}
			]
		});
		$("a.dt-button").tooltip({placement:'right'});
	}
	
function minimise(Id,count)
{
	var id = Id;
	var minimized_elements = $(id);
	minimized_elements.each(function(){    
		var t = $(this).text();        
		if(t.length < count) return;

		$(this).html(
			'<span class="less">'+t.slice(0,count)+'..</span>'+
			'<span style="display:none;" class="more text-capitalize">'+t+'</span>'
		);

	}); 
	$(document).on("mouseover",id,function(){
		$(this).find('span').hide();
		$(this).find('span.more').show();
	});
	$(document).on("mouseout",id,function(){
		$(this).find('span.less').show();
		$(this).find('span.more').hide();
	});	
}
function projectData(divId,levelId,locationId)
{
	var collapse='';
	var dataArr = '';
	if(levelId == 2)
	{
		if(divId == 'Mandal buildings1')
		{
			dataArr = ['state','district','constituency','mandal'];
		}else{
			dataArr = ['state','district','constituency','mandal','panchayat'];
		}
		
	}else if(levelId == 3)
	{
		if(divId == 'Mandal buildings1')
		{
			dataArr = ['district','constituency','mandal'];
		}else{
			dataArr = ['district','constituency','mandal','panchayat'];
		}
		
	}else if(levelId == 4)
	{
		if(divId == 'Mandal buildings1')
		{
			dataArr = ['constituency','mandal'];
		}else{
			dataArr = ['constituency','mandal','panchayat'];
		}
		
	}
	
	collapse+='<section>';
		collapse+='<div class="row">';
			collapse+='<div class="col-sm-12">';
				for(var i in dataArr)
				{
					if(divId == 'Labour Budget' && i == 0)
					{
						collapse+='<ul class="list-inline">';
							collapse+='<li>Material Percentage Summary</li>';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#00AF50;border-radius:50%;"></span> below 35%</li>';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#ff6600;border-radius:50%;"></span> 35% to 40%</li>';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#FF0000;border-radius:50%;"></span> Above 40%</li>';
						collapse+='</ul>';
					}else if(divId == 'Agriculture Activities' && i == 0)
					{
						collapse+='<ul class="list-inline">';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#00AF50;border-radius:50%;"></span> Above 65%</li>';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#ff6600;border-radius:50%;"></span> 60% to 65%</li>';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#FF0000;border-radius:50%;"></span> Below 60%</li>';
						collapse+='</ul>';
					}
					else if(divId == 'Expenditure' && i == 0)
					{
						collapse+='<ul class="list-inline">';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#0000FE;border-radius:50%;"></span> Historical High</li>';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#FD00FC;border-radius:50%;"></span> Historical Low</li>';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#a7f442;border-radius:50%;"></span> YoY High</li>';
							collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#FD0000;border-radius:50%;"></span> YoY Low</li>';
						collapse+='</ul>';
					}
					else if(divId == 'Not Yet Completed Works' && i == 0)
					{
						collapse+='<ul class="list-inline">';
							collapse+='<li style="color:red"> S-Started</li>';
							collapse+='<li style="color:red"> P-Pending</li>';
							collapse+='<li style="color:red"> %-Percentage</li>';
						collapse+='</ul>';
					}
								
					collapse+='<div class="panel-group" id="accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" role="tablist" aria-multiselectable="true">';
						collapse+='<div class="panel panel-default panel-black">';
							collapse+='<div class="panel-heading" role="tab" id="heading'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
								if(globalMCCMainDivName == 'Greenary works Chettu' || globalMCCMainDivName == 'Agriculture Related Works' || globalMCCMainDivName == 'Rural Sanitation Works' || globalMCCMainDivName == 'Soil Moisture Conservation works Neeru' || globalMCCMainDivName == 'Works in community lands' || globalMCCMainDivName == 'IJP PROGRAM WORKS' || globalMCCMainDivName == 'Institutional Development Works' || globalMCCMainDivName == 'Road Works' || globalMCCMainDivName == 'Water Harvesting Structures Neeru' || globalMCCMainDivName == 'AH-Live Stock Related works'){
									collapse+='<a role="button" class="panelCollapseIcon" overview-levelId="'+levelId+'" overview-locationId="'+locationId+'" overview-divId="'+divId+'" data-toggle="collapse" data-parent="#accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" href="#collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-level-new="dataTable'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
								}
								else if(dataArr[i] == 'state' || dataArr[i] == 'district' || dataArr[i] == 'constituency')
								{
									collapse+='<a role="button" class="panelCollapseIcon" overview-levelId="'+levelId+'" overview-locationId="'+locationId+'" overview-divId="'+divId+'" data-toggle="collapse" data-parent="#accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" href="#collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-level-new="dataTable'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
								}else{
									collapse+='<a role="button" class="panelCollapseIcon collapsed" overview-levelId="'+levelId+'" overview-locationId="'+locationId+'" overview-divId="'+divId+'" overview-level="'+dataArr[i]+'" data-toggle="collapse" data-parent="#accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" href="#collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
								}
									if(divId == 'FAperformance')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - FA Performance</h4>';
									}else if(divId == 'SMC Trench')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - SMC Trenches</h4>';
									}else if(divId == 'Imp to CD')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Improvements to Check Dams and Percolation Tanks</h4>';
									}else if(divId == 'MPT_PT')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Mini Percolation Tanks and Percolation Tanks</h4>';
									}else if(divId == 'GC Works')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Gully Control Works</h4>';
									}else if(divId == 'CD_CW')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Check Dams and Check Walls</h4>';
									}else if(divId == 'CC Roads1')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - CC Roads</h4>';
									}else if(divId == 'Anganwadi')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Anganwadi Buildings</h4>';
									}else if(divId == 'GP Buildings1')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - GP Buildings</h4>';
									}else if(divId == 'Mandal buildings1')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Mandal buildings</h4>';
									}else if(divId == 'GH')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Greening Of Hillocks</h4>';
									}else if(divId == 'IHHL')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Individual HouseHold Latrine</h4>';
									}else if(divId == 'OPGK-Perinnials')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Oorura Pasu Graasa Kshetralu - Perinnials</h4>';
									}else if(divId == 'OPGK-Annuals')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Oorura Pasu Graasa Kshetralu - Annuals</h4>';
									}else if(divId == 'NTR Rural House')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - NTR IHHL</h4>';
									}
									else if(divId == 'PaymentsDeptWise')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Department Wise Payments</h4>';
									}else if(divId == 'Approach Roads to Fish PondsMCC')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Approach Roads to Fish Ponds</h4>';
									}else if(divId == 'Construction of compound wallSchool Education Department')
									{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Construction of compound wall</h4>';
									}else if(divId == 'Man Days Comparision')
									{
										if(dataArr[i] == 'state' || dataArr[i] == 'district' || dataArr[i] == 'constituency')
											collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Man Days Comparision( All Counts Are in Lakhs)</h4>';
										else
											collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Man Days Comparision</h4>';
									}else if(divId == 'Expenditure')
									{
										if(dataArr[i] == 'state' || dataArr[i] == 'district' || dataArr[i] == 'constituency' || dataArr[i] == 'mandal' || dataArr[i] == 'panchayat')
											collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Expenditure (Person Days In Lakhs , Expenditure in Crores.)</h4>';
									}else if(divId == 'Labour Budget'){
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - '+divId+' ( Note : Amount in Lakhs. )</h4>';
									}else if(divId == 'Soak Pits' || divId == 'Nutri Garden' || divId == 'NRM Works' || divId == 'Seed Dibbling' || divId == 'Nursery' || divId == 'Maintenance of Nurseries' || divId == 'BT RoadsITDA' || divId == 'BT RoadsPR' || divId == 'Gravel Link RoadsPR' || divId == 'WBM RoadsITDA' || divId == 'WBM RoadsPR'){
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - '+divId+'</h4>';
									}else{
										collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - '+divId+' ( Note : Amount in Crores. )</h4>';
									}
								collapse+='</a>';
							collapse+='</div>';
							if(globalMCCMainDivName == 'Greenary works Chettu' || globalMCCMainDivName == 'Agriculture Related Works' || globalMCCMainDivName == 'Rural Sanitation Works' || globalMCCMainDivName == 'Soil Moisture Conservation works Neeru' || globalMCCMainDivName == 'Works in community lands' || globalMCCMainDivName == 'IJP PROGRAM WORKS' || globalMCCMainDivName == 'Institutional Development Works' || globalMCCMainDivName == 'Road Works' || globalMCCMainDivName == 'Water Harvesting Structures Neeru' || globalMCCMainDivName == 'AH-Live Stock Related works'){
								collapse+='<div id="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
							}
							else if(dataArr[i] == 'state' || dataArr[i] == 'district' || dataArr[i] == 'constituency')
							{
								collapse+='<div id="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
							}else{
								collapse+='<div id="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
							}
							
								collapse+='<div class="panel-body">';								;
								if(divId == 'Payments')
								{
									collapse+='';
									collapse+='<label class="radio-inline">';
										collapse+='<input name="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-locationId="'+locationId+'" attr_levelId="'+levelId+'" attr_locationType="'+dataArr[i]+'" attr_name="Material"  type="radio" attr_radioBtn="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"/> Material';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input name="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-locationId="'+locationId+'" attr_levelId="'+levelId+'" attr_locationType="'+dataArr[i]+'" attr_name="Wage" type="radio" checked attr_radioBtn="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"/> Wage';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input name="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-locationId="'+locationId+'" attr_levelId="'+levelId+'" attr_locationType="'+dataArr[i]+'" attr_name="Total" type="radio" attr_radioBtn="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"/> Total';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input name="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-locationId="'+locationId+'" attr_levelId="'+levelId+'" attr_locationType="'+dataArr[i]+'" attr_name="All" type="radio" attr_radioBtn="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"/> All';
									collapse+='</label>';
								}
								if(divId == 'PaymentsDeptWise'){
									collapse+='<div class="row">';
										collapse+='<div class="col-sm-2">';
											collapse+='<label>Department:</label>';
											collapse+='<select class="form-control departmentLevelWiseCls paymentDept'+dataArr[i]+'Cls" overview-locationId="'+locationId+'" attr_levelId="'+levelId+'" attr_locationType="'+dataArr[i]+'" name="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
												collapse+='<option  value="All" selected>All</option>';
												collapse+='<option  value="01">ANIMAL HUSBANDRY</option>';
												collapse+='<option  value="02">CCC</option>';
												collapse+='<option  value="03">MCC</option>';
												collapse+='<option  value="04">FOREST</option>';
												collapse+='<option  value="05">PR</option>';
												collapse+='<option  value="06">SERP</option>';
												collapse+='<option  value="07">WCC</option>';
												collapse+='<option  value="08">HO</option>';
												collapse+='<option  value="09">ITDA</option>';
												collapse+='<option  value="10">ACC</option>';
											collapse+='</select>';
										collapse+='</div>';
										collapse+='<div class="col-sm-4" style="margin-top: 30px;margin-left: 20px;">';
											collapse+='<label class="radio-inline">';
												collapse+='<input class="deptRadioCls" name="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-locationId="'+locationId+'" attr_levelId="'+levelId+'" attr_locationType="'+dataArr[i]+'" attr_name="Material"  type="radio" attr_dept_radioBtn="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"/> Material';
											collapse+='</label>';
											collapse+='<label class="radio-inline">';
												collapse+='<input class="deptRadioCls" name="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-locationId="'+locationId+'" attr_levelId="'+levelId+'" attr_locationType="'+dataArr[i]+'" attr_name="Wage" type="radio" attr_dept_radioBtn="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"/> Wage';
											collapse+='</label>';
											collapse+='<label class="radio-inline">';
												collapse+='<input class="deptRadioCls" name="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-locationId="'+locationId+'" attr_levelId="'+levelId+'" attr_locationType="'+dataArr[i]+'" attr_name="Total" type="radio" checked attr_dept_radioBtn="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"/> Total';
											collapse+='</label>';
										collapse+='</div>';
									collapse+='</div>';
								}
								if(divId == 'Expenditure')
									{
										collapse+='<div class="row">';
										collapse+='<div class="col-sm-12">';
										if(dataArr[i] == 'district' || dataArr[i] == 'constituency' || dataArr[i] == 'mandal' || dataArr[i] == 'panchayat'){
											collapse+='<div class="col-sm-3">';
											collapse+='<label><b>District</b></label>';
											collapse+='<select class= "form-control districtExpCls" attr_locationType='+dataArr[i]+' id="expDistrictId'+dataArr[i]+'" attr_blockName="'+divId+'" attr_divIId="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
											collapse+='<option  value="0">Select District</option>';
											collapse+='</select>';
											collapse+='</div>';
										}
										if(dataArr[i] == 'constituency' || dataArr[i] == 'mandal' || dataArr[i] == 'panchayat'){
											collapse+='<div class="col-sm-3">';
											collapse+='<label><b>Constituency</b></label>';
											collapse+='<select class= "form-control constituencyExpCls" attr_locationType='+dataArr[i]+' id="expConstituencyId'+dataArr[i]+'" attr_blockName="'+divId+'" attr_divIId="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
											collapse+='<option  value="0">Select Constituency</option>';
											collapse+='</select><span id="constLoading'+dataArr[i]+'"></span>';
											collapse+='</div>';
										} 
										if(dataArr[i] == 'mandal' || dataArr[i] == 'panchayat'){
											collapse+='<div class="col-sm-3">';
											collapse+='<label><b>Mandal</b></label>';
											collapse+='<select class= "form-control mandalExpCls" attr_locationType='+dataArr[i]+'  id="expMandalId'+dataArr[i]+'" attr_blockName="'+divId+'" attr_divIId="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
											collapse+='<option  value="0">Select mandal</option>';
											collapse+='</select><span id="mandalLoading'+dataArr[i]+'"></span>';
											collapse+='</div>';
										}
										if(dataArr[i] == 'panchayat'){
											collapse+='<div class="col-sm-3">';
											collapse+='<label><b>Panchayat</b></label>';
											collapse+='<select class= "form-control panchayatExpCls" attr_locationType='+dataArr[i]+' id="expPanchayatId'+dataArr[i]+'" attr_blockName="'+divId+'" attr_divIId="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
											collapse+='<option  value="0">Select panchayat</option>';
											collapse+='</select><span id="panchayatLoading'+dataArr[i]+'"></span>';
											collapse+='</div>';
										}
										collapse+='</div>';
										collapse+='</div>';
									}
								if(divId == 'Timely Payment')
								{
									collapse+='<label class="radio-inline">';
										collapse+='<input type="radio" class="timelyPaymentRadioCls" attr_levelId="'+levelId+'"  overview-locationId="'+locationId+'" attr_locationType="'+dataArr[i]+'" attr_type="-1" attr_id="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" checked name="timelyPayment'+dataArr[i]+'"/>ALL';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input type="radio" class="timelyPaymentRadioCls" attr_levelId="'+levelId+'"  overview-locationId="'+locationId+'" attr_locationType="'+dataArr[i]+'" attr_type="MCC" attr_id="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" name="timelyPayment'+dataArr[i]+'"/>MCC';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input type="radio" class="timelyPaymentRadioCls" attr_levelId="'+levelId+'"  overview-locationId="'+locationId+'" attr_locationType="'+dataArr[i]+'" attr_type="WCC" attr_id="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" name="timelyPayment'+dataArr[i]+'"/>WCC';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input type="radio" class="timelyPaymentRadioCls" attr_levelId="'+levelId+'"  overview-locationId="'+locationId+'" attr_locationType="'+dataArr[i]+'" attr_type="DCC" attr_id="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" name="timelyPayment'+dataArr[i]+'"/>DCC';
									collapse+='</label>';
								}
								
								
									collapse+='<div id="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"></div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				}
			collapse+='</div>';
		collapse+='</div>';
	collapse+='</section>';
	$("#projectData").html(collapse);
	for(var i in dataArr){
		if(divId == "Expenditure")
			getAllDistricts(dataArr[i]);
		$("#expConstituencyId"+dataArr[i]).chosen();		
		$("#expMandalId"+dataArr[i]).chosen();		
		$("#expPanchayatId"+dataArr[i]).chosen();		
	}

	//From Menu
	var menuLocationId = '';
	var menuLocationType = '';
	if(levelId == 2)
	{
		menuLocationId = "-1";
		menuLocationType = "state";
	}else if(levelId == 3)
	{
		menuLocationId = locationId;
		menuLocationType = "district";
	}else if(levelId == 4)
	{
		menuLocationId = locationId;
		menuLocationType = "constituency";
	}
	
	if(globalMCCMainDivName == 'Greenary works Chettu' || globalMCCMainDivName == 'Agriculture Related Works' || globalMCCMainDivName == 'Rural Sanitation Works' || globalMCCMainDivName == 'Soil Moisture Conservation works Neeru' || globalMCCMainDivName == 'Works in community lands' || globalMCCMainDivName == 'IJP PROGRAM WORKS' || globalMCCMainDivName == 'Institutional Development Works' || globalMCCMainDivName == 'Road Works' || globalMCCMainDivName == 'Water Harvesting Structures Neeru' || globalMCCMainDivName == 'AH-Live Stock Related works')
		dataArr = ['state','district','constituency','mandal','panchayat'];
	else if(globalDivName == 'Expenditure'){
		dataArr = ['state'];
	}
	else
		dataArr = ['state','district','constituency'];
	for(var i in dataArr)
	{
		var theadArr;
		if(globalDivName == "GH"){
			if(dataArr[i] == "state" || dataArr[i] == "district")
				{
					theadArr = [dataArr[i],'District Target(in Ha)','Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				}else if(dataArr[i] == "constituency")
				{
					theadArr = ["district",dataArr[i],'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				}else if(dataArr[i] == "mandal")
				{
					theadArr = ["district","constituency",dataArr[i],'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				}else if(dataArr[i] == "panchayat")
				{
					theadArr = ["district","constituency","mandal",dataArr[i],'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				}
		}else{
			 theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
			if(dataArr[i] == "constituency")
				theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
			else if(dataArr[i] == "mandal")
				theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
			else if(dataArr[i] == "panchayat")
				theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
			
			if((globalDivName == 'Cattle Drinking Water Troughs' || globalDivName == 'Raising of Perinnial Fodders') && dataArr[i] == "state")
				theadArr = [dataArr[i],'Target','sanctioned Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','sanctioned Percentage'];

			if(globalDivName == 'Mulbery New' || globalDivName == 'Silk worm New')
			{
				if(dataArr[i] == "state")
				{
						theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}else if(dataArr[i] == "district")
				{
					theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}else if(dataArr[i] == "constituency")
				{
					theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}else if(dataArr[i] == "mandal")
				{
					theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}else if(dataArr[i] == "panchayat")
				{
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}
			}
			
			if((globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW') && (dataArr[i] == "state" || dataArr[i] == "district"))
				theadArr = [dataArr[i],'Target','sanctioned Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','sanctioned Percentage'];
			
			if((globalDivName == 'Fish Ponds' || globalDivName == 'Fish Drying Platforms') && (dataArr[i] == "state" || dataArr[i] == "district"))
				theadArr = [dataArr[i],'Target','sanctioned','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','sanctioned Percentage','Achievement Percentage'];
			if(divId == 'Farm Ponds' || divId == 'IHHL' || divId == 'Vermi Compost' || divId == 'Burial Ground' || divId == 'Solid Waste Management' || divId == 'Play fields' || divId == 'NTR 90 Days' || divId == 'Production of Bricks')
			{
				if(dataArr[i] == "state" || dataArr[i] == "district")
				{
					theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}else if(dataArr[i] == "constituency")
				{
					theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}else if(dataArr[i] == "mandal")
				{
					theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}else if(dataArr[i] == "panchayat")
				{
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				}
			}
			
			if(divId == 'Anganwadi')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
				else
					theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
			}
			
			if(divId == 'Man Days Comparision')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'This Month','Financial Year as of Today','Increment/Decrement (%)','Last Financial Year Same Day','Last Financial Year','From 2014'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'This Month','Financial Year as of Today','Increment/Decrement (%)','Last Financial Year Same Day','Last Financial Year','From 2014'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'This Month','Financial Year as of Today','Increment/Decrement (%)','Last Financial Year Same Day','Last Financial Year','From 2014'];
				else
					theadArr = [dataArr[i],'This Month','Financial Year as of Today','Increment/Decrement (%)','Last Financial Year Same Day','Last Financial Year','From 2014'];
			}
			
			if(divId == 'Expenditure')
				{
					theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
				}
			if(divId == 'Daily Labour Turnout')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Today','Yesterday','This week','Last Week','This Month','Last Month','Last 3 Months','Last 6 Months','This Fin year'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Today','Yesterday','This week','Last Week','This Month','Last Month','Last 3 Months','Last 6 Months','This Fin year'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Today','Yesterday','This week','Last Week','This Month','Last Month','Last 3 Months','Last 6 Months','This Fin year'];
				else
					theadArr = [dataArr[i],'Today','Yesterday','This week','Last Week','This Month','Last Month','Last 3 Months','Last 6 Months','This Fin year'];
			}	
			
			if(divId == 'GP Buildings1' || divId == 'Mandal buildings1')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
				else
					theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
			}
			if(divId !='' && (divId == 'Agriculture Related Works' || divId == 'Greenary works Chettu' || divId == 'Rural Sanitation Works' || divId == 'IJP PROGRAM WORKS' || divId == 'Works in community lands' || divId == 'Soil Moisture Conservation works Neeru' || divId == 'Institutional Development Works' || divId == 'Road Works' || divId == 'Water Harvesting Structures Neeru' || divId == 'AH-Live Stock Related works')){
				theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
			}
			
			if(globalMCCMainDivName !='' && (globalMCCMainDivName == 'Agriculture Related Works' || globalMCCMainDivName == 'Greenary works Chettu' || globalMCCMainDivName == 'Rural Sanitation Works' || globalMCCMainDivName == 'IJP PROGRAM WORKS' || globalMCCMainDivName == 'Works in community lands' || globalMCCMainDivName == 'Soil Moisture Conservation works Neeru' || globalMCCMainDivName == 'Institutional Development Works' || globalMCCMainDivName == 'Road Works' || globalMCCMainDivName == 'Water Harvesting Structures Neeru' || globalMCCMainDivName == 'AH-Live Stock Related works')){
				theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
			}
			if(divId == 'FA Vacancies'){
				theadArr = [dataArr[i],'Total','Senior Mate','Junior Mate','Mate'];
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Total','Senior Mate','Junior Mate','Mate'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Total','Senior Mate','Junior Mate','Mate'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Total','Senior Mate','Junior Mate','Mate'];
			}	
			if(divId == 'Material Availability'){
				theadArr = [dataArr[i],'Wage Exp (CR)','Material Entitlement (CR)','Material Exp (CR)','Material %','Balance Material (CR)'];
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Wage Exp (CR)','Material Entitlement (CR)','Material Exp (CR)','Material %','Balance Material (CR)'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Wage Exp','Material Entitlement','Material Exp','Material %','Balance Material'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Wage Exp','Material Entitlement','Material Exp','Material %','Balance Material'];
			}
			if(divId == 'Not Yet Completed Works'){
				theadArr = [dataArr[i],'FY 2014-15','FY 2015-16','FY 2016-17','FY 2017-18','FY 2018-19','Total'];
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'FY 2014-15','FY 2015-16','FY 2016-17','FY 2017-18','FY 2018-19','Total'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'FY 2014-15','FY 2015-16','FY 2016-17','FY 2017-18','FY 2018-19','Total'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'FY 2014-15','FY 2015-16','FY 2016-17','FY 2017-18','FY 2018-19','Total'];
			}
			if(divId == 'YearWiseExpenditure')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'2014-15','2015-16','2016-17','2017-18','2018-19','%Growth Over FY 2014-15','%Growth Over FY 2015-16','%Growth Over FY 2016-17','%Growth Over FY 2017-18'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'2014-15','2015-16','2016-17','2017-18','2018-19','%Growth Over FY 2014-15','%Growth Over FY 2015-16','%Growth Over FY 2016-17','%Growth Over FY 2017-18'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'2014-15','2015-16','2016-17','2017-18','2018-19','%Growth Over FY 2014-15','%Growth Over FY 2015-16','%Growth Over FY 2016-17','%Growth Over FY 2017-18'];
				else
					theadArr = [dataArr[i],'2014-15','2015-16','2016-17','2017-18','2018-19','%Growth Over FY 2014-15','%Growth Over FY 2015-16','%Growth Over FY 2016-17','%Growth Over FY 2017-18'];
			}
			
			if(divId == 'Animal Hostels' || divId == 'Mega Kshetralu' || divId == 'Continuous Trenches' || divId == 'Check Dam' || divId == 'Desilting CD' || divId == 'Percolation tank' || divId == 'Rock fill dams' || divId == 'Village Haats' || divId == 'Village Parks' || divId == 'BT RoadsITDA' || divId == 'BT RoadsPR' || divId == 'Gravel Link RoadsPR' || divId == 'WBM RoadsITDA' || divId == 'WBM RoadsPR' || divId == 'Approach Roads to Fish PondsMCC' || divId == 'Construction of compound wallSchool Education Department')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
				else
					theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}
			
			if(divId == 'Mini Percolation tank' || divId == 'Nutri Garden')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(divId == 'Nutri Garden')
						theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else
					theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','sanctioned Target','sanctioned Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
			}
			
			if(divId == 'Soak Pits')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Total GPs','Total HHs','Grounded GPs','Grounded Soak Pits','In Progress GPs','In Progress Soak Pits','Completed GPs','Completed Soak Pits','Achievement Percentage'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Total GPs','Total HHs','Grounded GPs','Grounded Soak Pits','In Progress GPs','In Progress Soak Pits','Completed GPs','Completed Soak Pits','Achievement Percentage'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Total GPs','Total HHs','Grounded GPs','Grounded Soak Pits','In Progress GPs','In Progress Soak Pits','Completed GPs','Completed Soak Pits','Achievement Percentage'];
				else
					theadArr = [dataArr[i],'Total GPs','Total HHs','Grounded GPs','Grounded Soak Pits','In Progress GPs','In Progress Soak Pits','Completed GPs','Completed Soak Pits','Achievement Percentage'];
			}
			
			if(divId == 'NRM Works')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Target','Completed','Achievement Percentage'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Target','Completed','Achievement Percentage'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Target','Completed','Achievement Percentage'];
				else
					theadArr = [dataArr[i],'Target','Completed','Achievement Percentage'];
			}
			if(divId == 'Departments Material Expenditure')
			{
				if(dataArr[i] == "constituency")
					theadArr = ["district",dataArr[i],'Panchayat Raj','ITDA','Forest','Serp','Housing','Animal Husbandary','Fisheries','Sericulture','Education','MCC','WCC','CCC','Total Exp','Balance Material'];
				else if(dataArr[i] == "mandal")
					theadArr = ["district","constituency",dataArr[i],'Panchayat Raj','ITDA','Forest','Serp','Housing','Animal Husbandary','Fisheries','Sericulture','Education','MCC','WCC','CCC','Total Exp','Balance Material'];
				else if(dataArr[i] == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr[i],'Panchayat Raj','ITDA','Forest','Serp','Housing','Animal Husbandary','Fisheries','Sericulture','Education','MCC','WCC','CCC','Total Exp','Balance Material'];
				else
					theadArr = [dataArr[i],'Panchayat Raj','ITDA','Forest','Serp','Housing','Animal Husbandary','Fisheries','Sericulture','Education','MCC','WCC','CCC','Total Exp','Balance Material'];
			}
		}
		
		var tableId = divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i];
		$("#"+tableId).html(spinner);
		var districtId = $("#selectedName").attr("attr_distId");
		if(divId == 'Labour Budget')
			getNREGSLabBugdtLelwiseData(tableId,dataArr[i],menuLocationType,menuLocationId,divId);
		else if(divId == "Agriculture Activities")
			getNregaLevelsWiseDataFrAgriculture(tableId,dataArr[i],menuLocationType,menuLocationId,divId);
		else if(divId == "Man Days Comparision")
			getManWorkDaysOfNrega(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		else if(divId == "Expenditure")
			getManWorksExpenditureDetails(tableId,dataArr[i],'',menuLocationType,menuLocationId,divId,districtId,divId,'',levelId);
		else if(divId == "Daily Labour Turnout")
			getFieldManDaysWorkDetails(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		else if(divId == "Average Wage" || divId == "Average Days of Employment" || divId == "HH Completed 100 Days")
			getNregaLevelsWiseDataFrNewCalls(tableId,dataArr[i],menuLocationType,menuLocationId,divId);
		else if(divId == "Timely Payment")
			getNregaLevelsWiseDataFrNewCalls(tableId,dataArr[i],menuLocationType,menuLocationId,divId,'-1');
		else if(divId == "Horticulture")//
			getNregaLevelsWiseDataFrHorticulture(tableId,dataArr[i],menuLocationType,menuLocationId,divId);
		else if(divId == "Avenue")//
			getNregaLevelsWiseDataFrAvenue(tableId,dataArr[i],menuLocationType,menuLocationId,divId);
		else if(divId == "CC Roads1" || divId == "UGDrainage")//
			getNregaLevelsWiseDataForCCRoads(tableId,dataArr[i],menuLocationType,menuLocationId,divId);
		else if(divId == "Payments")//
			getNregaPaymentsDtlsLocationWise(tableId,dataArr[i],menuLocationType,menuLocationId,'Wage',divId);
		else if(divId == "PaymentsDeptWise")//
			getNregaDeptWisePaymentsDtlsLocationWise(tableId,dataArr[i],menuLocationType,menuLocationId,'Total',divId,"All");
		else if(divId == "YearWiseExpenditure")//
			getYearWiseExpenditureDetails(tableId,dataArr[i],menuLocationType,menuLocationId,divId,theadArr);
		else if(divId == "FAperformance")
			getNregaLevelsWiseDataForFAPerformance(tableId,dataArr[i],menuLocationType,menuLocationId,divId);
		else if(divId == "FA Vacancies")
			getLocationWiseFAVacencies(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		else if(divId == 'Material Availability')
			getMaterialAvailabilityStatusForFinancialYear(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		else if(divId == 'Departments Material Expenditure')
			getNregaDeptWiseMaterialExpenditureDtlsLocationWise(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId);
		else if(divId == 'Not Yet Completed Works')
			getWorkCompletionData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		else if(divId == 'Raising and Maintenance of Block Plantations' || divId == 'Raising and Maintenance of nurseries' || divId == 'Soil and Moisture Conservation Works' || divId == 'Raising and Maintenance of Avenue plantations' || divId == 'Seed Dibbling' || divId == 'Nursery' || divId == 'Maintenance of Nurseries')
			getNregaForestLevelData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId);
		 else if(globalMCCMainDivName == 'Greenary works Chettu' || globalMCCMainDivName == 'Agriculture Related Works' || globalMCCMainDivName == 'Rural Sanitation Works' || globalMCCMainDivName == 'Soil Moisture Conservation works Neeru' || globalMCCMainDivName == 'Works in community lands' || globalMCCMainDivName == 'IJP PROGRAM WORKS' || globalMCCMainDivName == 'Institutional Development Works' || globalMCCMainDivName == 'Road Works' || globalMCCMainDivName == 'Water Harvesting Structures Neeru' || globalMCCMainDivName == 'AH-Live Stock Related works')
			getNregaOtherMCCLevelData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		else if(divId == 'Greenary works Chettu' || divId == 'Agriculture Related Works' || divId == 'Rural Sanitation Works' || divId == 'Soil Moisture Conservation works Neeru' || divId == 'Works in community lands' || divId == 'IJP PROGRAM WORKS' || divId == 'Institutional Development Works' || divId == 'Road Works' || divId == 'Water Harvesting Structures Neeru' || divId == 'AH-Live Stock Related works'){
			getNregaOtherMCCAbstarctData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		}else if(divId == 'coffee')
			getNregaLevelsWiseDataFrCoffeePlantation(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId);
		else if(divId == 'Cattle Ponds' || divId == 'Desilting of Drinking Water Tanks' || divId == 'Comprehensive Restoration of minor Irrigation Tank1' || divId == 'Animal Husbandry Others')					
			getNregaMCCNewComponetsLevelData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		else if(divId == 'Renovation and Improvements to existing Check Dams Check Wall' || divId == 'Road Formation Upto WBM GR II Including CD works' || divId == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || divId == 'Construction Of Animal Hostel'|| divId == 'Roads for Unconnected Habitations 2011-12' || divId == 'Construction of New Check Dam' || divId == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || divId == 'Construction of Food Grains Storage Structures of 250MT' || divId == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || divId == 'Construction of Village Haats Infrastructure fecilities' || divId == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || divId == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || divId == 'Construction of Buildings for women self help group federation' || divId == 'Work Site Facilities' || divId == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || divId == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || divId == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || divId == 'Production of Grafts in HNTC' || divId == 'Improvements of RYTHU BAZAR' || divId == 'Roads for Unconnected Habitations 2012-13 and afterwards' || divId == 'HNTC Development' || divId == 'New Open Well for Drinking water purpose' || divId == 'Construction of Crematoria Burial Grounds' || divId == 'Repairs to Existing Check Dam' || divId == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || divId == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || divId == 'Construction of Food Grains Storage Structures of 500MT' || divId == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || divId == 'Raising of Cashew bag seedlings for 2014-15' || divId == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || divId == 'Comprehensive Restoration of minor Irrigation Tank' || divId == "Azolla Production Unit" || divId == "Construction of silopits of 3 MTs capacity" || divId == "Fodder trough for Cattle Cattle drinking water trough" || divId == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || divId == "Raising of Perinnial Fodder" || divId == "Raising of Silvipasture clubbed with subabul plantation")
			getNregaCovergancePROtherLevelData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,divId,'overview',levelId);
		else if(divId == 'Animal Hostels' || divId == 'Mega Kshetralu' || divId == 'Continuous Trenches' || divId == 'Check Dam' || divId == 'Desilting CD' || divId == 'Mini Percolation tank' || divId == 'Percolation tank' || divId == 'Rock fill dams' || divId == 'Village Haats' || divId == 'Village Parks' || divId == 'Nutri Garden' || divId == 'Soak Pits' || divId == 'NRM Works' || divId == 'BT RoadsITDA' || divId == 'BT RoadsPR' || divId == 'Gravel Link RoadsPR' || divId == 'WBM RoadsITDA' || divId == 'WBM RoadsPR' || divId == 'Approach Roads to Fish PondsMCC' || divId == 'Construction of compound wallSchool Education Department')
			getNregaKeyPropertyComponentsLevelsWiseData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId);
		else
			getNregaLevelsWiseData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId);
	}
}

$(document).on("change",".departmentLevelWiseCls",function(){
	var blockName = $(this).attr("name");
	var locationType = $(this).attr("attr_locationType");
	var levelId = $(this).attr("attr_levelId");
	var locationId = $(this).attr("overview-locationId");
	var menuLocationType = '';
	var menuLocationId = '';
	var buildType = $('.deptRadioCls:checked').attr("attr_name");
	var department = $(".paymentDept"+locationType+"Cls option:selected").text();
	if(levelId == 2)
	{
		menuLocationId = "-1";
		menuLocationType = "state";
	}else if(levelId == 3)
	{
		menuLocationId = locationId;
		menuLocationType = "district";
	}
	getNregaDeptWisePaymentsDtlsLocationWise(blockName,locationType,menuLocationType,menuLocationId,buildType,'',department);
});

$(document).on("click","[attr_dept_radioBtn]",function(){
	var blockName = $(this).attr("name");
	var locationType = $(this).attr("attr_locationType");
	var levelId = $(this).attr("attr_levelId");
	var locationId = $(this).attr("overview-locationId");
	var menuLocationType = '';
	var menuLocationId = '';
	var buildType = $(this).attr("attr_name");
	var department = $(".paymentDept"+locationType+"Cls option:selected").text();
	if(levelId == 2)
	{
		menuLocationId = "-1";
		menuLocationType = "state";
	}else if(levelId == 3)
	{
		menuLocationId = locationId;
		menuLocationType = "district";
	}
	getNregaDeptWisePaymentsDtlsLocationWise(blockName,locationType,menuLocationType,menuLocationId,buildType,'',department);
});

function overviewData(divId,levelId,locationId)
{
	var collapse = '';
	collapse+='<section>';
		collapse+='<div class="row overviewAllCls">';
			collapse+='<div class="col-sm-12">';
				collapse+='<div class="panel-group" id="accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" role="tablist" aria-multiselectable="true">';
					collapse+='<div class="panel panel-default panel-black">';
						collapse+='<div class="panel-heading" role="tab" id="heading'+divId+'">';
							collapse+='<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" href="#collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';
							if(divId == 'FAperformance')
							{
								collapse+='<h4 class="panel-title text-capitalize">FA Performance overview</h4>';
							}else if(divId == 'SMC Trench')
							{
								collapse+='<h4 class="panel-title text-capitalize">SMC Trenches overview</h4>';
							}else if(divId == 'Imp to CD')
							{
								collapse+='<h4 class="panel-title text-capitalize">Improvements to Check Dams and Percolation Tanks overview</h4>';
							}else if(divId == 'MPT_PT')
							{
								collapse+='<h4 class="panel-title text-capitalize">Mini Percolation Tanks and Percolation Tanks overview</h4>';
							}else if(divId == 'GC Works')
							{
								collapse+='<h4 class="panel-title text-capitalize">Gully Control Works overview</h4>';
							}else if(divId == 'CD_CW')
							{
								collapse+='<h4 class="panel-title text-capitalize">Check Dams and Check Walls overview</h4>';
							}else if(divId == 'OPGK-Perinnials')
							{
								collapse+='<h4 class="panel-title text-capitalize">Oorura Pasu Graasa Kshetralu - Perinnials overview</h4>';
							}else if(divId == 'OPGK-Annuals')
							{
								collapse+='<h4 class="panel-title text-capitalize">Oorura Pasu Graasa Kshetralu - Annuals overview</h4>';
							}else if(divId == 'NTR Rural House')
							{
								collapse+='<h4 class="panel-title text-capitalize">NTR IHHL overview</h4>';
							}else if(divId == 'CC Roads1')
							{
								collapse+='<h4 class="panel-title text-capitalize">CC Roads overview</h4>';
							}else if(divId == 'Anganwadi')
							{
								collapse+='<h4 class="panel-title text-capitalize">Anganwadi Buildings overview</h4>';
							}else if(divId == 'GP Buildings1')
							{
								collapse+='<h4 class="panel-title text-capitalize">GP Buildings overview</h4>';
							}else if(divId == 'IHHL')
							{
								collapse+='<h4 class="panel-title text-capitalize">Individual Household Latrine</h4>';
							}else if(divId == 'Mandal buildings1')
							{
								collapse+='<h4 class="panel-title text-capitalize">Mandal buildings overview</h4>';
							}else if(divId == 'GH')
							{
								collapse+='<h4 class="panel-title text-capitalize">Greening Of Hillocks overview</h4>';
							}
							else if(divId == 'UGDrainage')
							{
								collapse+='<h4 class="panel-title text-capitalize">UG Drainage overview</h4>';
							}
							else if(divId == 'PaymentsDeptWise')
							{
								collapse+='<h4 class="panel-title text-capitalize">Department Wise Payments overview</h4>';
							}
							else{
								collapse+='<h4 class="panel-title text-capitalize">'+divId+' overview</h4>';
							}
								
							collapse+='</a>';
						collapse+='</div>';
						collapse+='<div id="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'">';
							collapse+='<div class="panel-body">';
								if(divId == 'Timely Payment')
								{
									collapse+='<label class="radio-inline">';
										collapse+='<input levelId="'+levelId+'" class="timelyPaymentOverviewCls" type="radio" attr_type="-1" name="timelyPayment'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'Overview" checked/>ALL';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input levelId="'+levelId+'" class="timelyPaymentOverviewCls" type="radio" attr_type="MCC" name="timelyPayment'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'Overview"/>MCC';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input levelId="'+levelId+'" class="timelyPaymentOverviewCls" type="radio" attr_type="WCC" name="timelyPayment'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'Overview"/>WCC';
									collapse+='</label>';
									collapse+='<label class="radio-inline">';
										collapse+='<input levelId="'+levelId+'" class="timelyPaymentOverviewCls" type="radio" attr_type="DCC" name="timelyPayment'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'Overview"/>DCC';
									collapse+='</label>';
								}
								if(divId == "PaymentsDeptWise"){
									collapse+='<div class="row">';
										collapse+='<div class="col-sm-2">';
											collapse+='<label>Department:</label>';
											collapse+='<select class= "form-control departmentOverviewCls" attr_levelId="'+levelId+'" attr_projectDivId="'+divId+'">';
												collapse+='<option  value="01">ANIMAL HUSBANDRY</option>';
												collapse+='<option  value="02">CCC</option>';
												collapse+='<option  value="03">MCC</option>';
												collapse+='<option  value="04">FOREST</option>';
												collapse+='<option  value="05">PR</option>';
												collapse+='<option  value="06">SERP</option>';
												collapse+='<option  value="07">WCC</option>';
												collapse+='<option  value="08">HO</option>';
												collapse+='<option  value="09">ITDA</option>';
												collapse+='<option  value="10">ACC</option>';
											collapse+='</select>';
										collapse+='</div>';
									collapse+='</div>';
								}
								collapse+='<div id="projectOvervw'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'"></div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	collapse+='</section>';
	$("#projectOverviewBlock").html(collapse);
	//For Menu
	var menuLocationId = '';
	var menuLocationType = '';
	var districtId = '';
	if(levelId == 2)
	{
		menuLocationId = "-1";
		menuLocationType = "state";
	}else if(levelId == 3)
	{
		menuLocationId = locationId;
		menuLocationType = "district";
	}else if(levelId == 4)
	{
		menuLocationId = locationId;
		menuLocationType = "constituency";
		districtId = $("#selectedName").attr("attr_distId");
	}
	
	
	if(divId == 'Labour Budget'){
		getNREGSLabourBudgetOverview(divId,menuLocationType,menuLocationId);
		//getNREGSLabourBudgetExpenditure(divId,menuLocationType,menuLocationId,"TOT");
	}
	else if(divId == 'Payments')
		getNregaPaymentsAbsAndOverviewDtls(divId,menuLocationType,menuLocationId,2,'overview');
	else if(divId == 'PaymentsDeptWise')
		getNregaPaymentsDeptWiseOverviewDtls(divId,menuLocationType,menuLocationId,2,"ANIMAL HUSBANDRY");
	else if(divId == 'Timely Payment')
		getNregasOverview(divId,menuLocationType,menuLocationId,districtId,'-1');
	else if(divId == 'Animal Hostels' || divId == 'Mega Kshetralu' || divId == 'Continuous Trenches' || divId == 'Check Dam' || divId == 'Desilting CD' || divId == 'Mini Percolation tank' || divId == 'Percolation tank' || divId == 'Rock fill dams' || divId == 'Village Haats' || divId == 'Village Parks')
		getNregasKeyPropertiesComponentsOverview(divId,menuLocationType,menuLocationId);
	else if(divId == 'Raising and Maintenance of Block Plantations' || divId == 'Raising and Maintenance of nurseries' || divId == 'Soil and Moisture Conservation Works' || divId == 'Raising and Maintenance of Avenue plantations')
		getNregasForestOverview(divId,menuLocationType,menuLocationId,districtId);
	else
		getNregasOverview(divId,menuLocationType,menuLocationId,districtId);
}

function getNregaPaymentsDeptWiseOverviewDtls(type,locType,locId,levelId,department)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#projectOvervw"+type.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: locType,
		locationId : locId,
		sublocaType :locType,
		districtId : districtId,
		deptType : department
	}
	$.ajax({
		url: 'getNregaPaymentsDepartmentWiseOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildPaymentsDeptWiseOverviewData(ajaxresp,type,locType,locId,levelId);
		}
	});
}

$(document).on("change",".departmentOverviewCls",function(){
	var department = $(".departmentOverviewCls option:selected").text();
	var levelId = $(this).attr("attr_levelId");
	var projectDivId = $(this).attr("attr_projectDivId");
	var locationId = $("[overview-block]").attr("attr_locationId");
	
	var menuLocationId = '';
	var menuLocationType = '';
	var districtId = '';
	if(levelId == 2)
	{
		menuLocationId = "-1";
		menuLocationType = "state";
	}else if(levelId == 3)
	{
		menuLocationId = locationId;
		menuLocationType = "district";
	}else if(levelId == 4)
	{
		menuLocationId = locationId;
		menuLocationType = "constituency";
		districtId = $("#selectedName").attr("attr_distId");
	}
	
	
	getNregaPaymentsDeptWiseOverviewDtls(projectDivId,menuLocationType,menuLocationId,levelId,department);
});

function buildPaymentsDeptWiseOverviewData(result,projectDivId,locType,locId,levelId)
{
	var str= '';
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div class="bg_color" style="padding:15px">';
				str+='<div class="row">';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Total Generated / Total Pending</h5>';
							str+='<p>Total Amount Generated : '+result[0].totalAmount+' / '+result[0].totalPendinAmount+'</p>	';
							str+='<p>Wage Amount : '+result[0].totalWage+' / '+result[0].pendingWage+'</p>';
							str+='<p>Material Amount : '+result[0].totalMaterial+' / '+result[0].pendingMaterial+'</p>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">FTO Generated / Not Generated</h5>';
							str+='<p>Total Amount : '+result[0].totalGeneratesAmount+' / '+result[0].totalNotGeneratedAmount+'</p>';
							str+='<p>Wage Amount : '+result[0].generatedWageAmount+' / '+result[0].notGeneratedWagesAmount+'</p>';
							str+='<p>Material Amount : '+result[0].generatedMaterialAmount+' / '+result[0].notGeneratedMaterialAmount+'</p>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">FTO s Uploaded / Not Uploaded</h5>';
							str+='<p>Total Amount : '+result[0].totalUploadsAmount+' / '+result[0].totalNotUploadedAmount+'</p>';
							str+='<p>Wage Amount : '+result[0].uploadedWageAmount+' / '+result[0].notUploadedWagesAmount+'</p>';
							str+='<p>Material Amount : '+result[0].uploadedMaterialAmount+' / '+result[0].notUploadedMaterialAmount+'</p>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="row m_top20">';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">FTO s Sent to Bank / Pending at Server</h5>';
							str+='<p>Total Amount : '+result[0].totalSentBankAmount+' / '+result[0].totalNotSentBankAmount+'</p>';
							str+='<p>Wage Amount : '+result[0].sentBankWageAmount+' / '+result[0].notSentBankWageAmount+'</p>';
							str+='<p>Material Amount : '+result[0].sentBankMaterialAmount+' / '+result[0].notSentBankMaterialAmount+'</p>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<p><h5 class="text-danger">Success / Rejected / Response Pending</h5>';
							str+='<p>Total Amount : '+result[0].totalCompletedAmount+' / '+result[0].totalRejectedAmount+' / '+result[0].totalResponsePendingAmount+'</p>';
							str+='<p>Wage Amount : '+result[0].completedWageAmount+' / '+result[0].rejectedWagesAmount+' / '+result[0].responsePendingWageAmount+'</p>';
							str+='<p>Material Amount : '+result[0].completedMaterialAmount+' / '+result[0].rejectedMaterialAmount+' / '+result[0].responsePendingMaterialAmount+' </p>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Pending At Bank For Want Of Funds / Rejected Regenerate</h5>';
							str+='<p>Total Amount : '+result[0].totalReleasePendingAmount+' / '+result[0].totalReprocessPendingAmount+'</p>';
							str+='<p>Wage Amount :'+result[0].releasePendingWageAmount+' / '+result[0].reprocessPendingWageAmount+'</p>';
							str+='<p>Material Amount : '+result[0].releasePendingMaterialAmount+' / '+result[0].reprocessPendingMaterialAmount+'</p>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#projectOvervw"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(str);
}

function tableView(blockId,theadArr,result,locationType,blockName)
{
	
	var tableView='';
	tableView+='<div class="table-responsive m_top10">';
		tableView+='<table class="table table-bordered dataTable'+blockId+'" style="width:100%;">';
			tableView+='<thead class="text-capitalize">';
			if(blockName == "Expenditure"){
					tableView+=buildtheadManDaysExpenditure();
			}else if(blockName == "Not Yet Completed Works"){
					tableView+=buildtheadNotYetCompletedWorks(locationType);
			}else{
				if(theadArr == 'Payments' || theadArr == 'PaymentsDeptWise')
				{
					tableView+='<tr>';
						if(locationType == 'state')
						{
							tableView+='<th rowspan="2">State</th>';
						}else if(locationType == 'district'){
							tableView+='<th rowspan="2">District</th>';
						}else if(locationType == 'constituency'){
							tableView+='<th rowspan="2">District</th>';
							tableView+='<th rowspan="2">Constituency</th>';
						}else if(locationType == 'mandal'){
							tableView+='<th rowspan="2">District</th>';
							tableView+='<th rowspan="2">Constituency</th>';
							tableView+='<th rowspan="2">Mandal</th>';
						}else if(locationType == 'panchayat'){
							tableView+='<th rowspan="2">District</th>';
							tableView+='<th rowspan="2">Constituency</th>';
							tableView+='<th rowspan="2">Mandal</th>';
							tableView+='<th rowspan="2">Panchayat</th>';
						}
						if(theadArr == 'PaymentsDeptWise')
							tableView+='<th rowspan="2">Department</th>';
						tableView+='<th rowspan="2">Type</th>';
						if(locationType == 'mandal' || locationType == 'panchayat'){
							tableView+='<th rowspan="2">Total Amount Generated </th>';
							tableView+='<th rowspan="2">Total Pending</th>';
							tableView+='<th colspan="5">Details Of Pending Amount</th>';
							//tableView+='<th rowspan="2">Pending at Bank</th>';
							tableView+='<th rowspan="2">Regenerated out of rejected</th>';
						}else{
							tableView+='<th rowspan="2">Total Amount Generated </th>';
							tableView+='<th rowspan="2">Total Pending</th>';
							tableView+='<th colspan="5">Details Of Pending Amount</th>';
							//tableView+='<th rowspan="2">Pending at Bank</th>';
							tableView+='<th rowspan="2">Regenerated out of rejected </th>';
						}
						
					tableView+='</tr>';
					tableView+='<tr>';
					if(locationType == 'mandal' || locationType == 'panchayat'){
						tableView+='<th>FTO s not generated</th>';
						tableView+='<th>FTO s not uploaded</th>';
						tableView+='<th>Not sent to Bank</th>';
						tableView+='<th>Rejected</th>';
						tableView+='<th>Pending at Bank</th>';
					}else{
						tableView+='<th>FTO s not generated</th>';
						tableView+='<th>FTO s not uploaded</th>';
						tableView+='<th>Not sent to Bank</th>';
						//tableView+='<th>Pending at Bank</th>';
						tableView+='<th>Rejected</th>';
						tableView+='<th>Pending at Bank</th>';
					}
						
					tableView+='</tr>';
				}else{
					for(var i in theadArr)
					{
						tableView+='<th class="text-capitalize">'+theadArr[i]+'</th>';
					
					}					
				}
			}
			
				
			tableView+='</thead>';
			tableView+='<tbody>';
				tableView+=result;
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	$("#"+blockId).html(tableView);	
	
	if(blockName == "Expenditure" || theadArr == 'PaymentsDeptWise'){
		if(locationType == 'state'){
			$(".dataTable"+blockId).dataTable({
				"iDisplayLength": 20,
				"aaSorting": [],
				"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
				"scrollX":        true,
				"scrollCollapse": true,
				"fixedColumns":   {
					"leftColumns": 1,
				},
				"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-5'i><'col-sm-7'p>>",
				buttons: [
					{
						extend:    'csvHtml5',
						text:      '<i class="fa fa-file-text-o"></i>',
						titleAttr: 'CSV',
						title:	   blockId,
						filename:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					},
					{
						extend:    'pdfHtml5',
						text:      '<i class="fa fa-file-pdf-o"></i>',
						titleAttr: 'PDF',
						title:	   blockId,
						filename:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
						orientation: "landscape",
						pageSize:'A3',
						customize: function (doc) {
							doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
						}
					}
				]
			});
		}
	}
	if(locationType == 'constituency')
	{
		$(".dataTable"+blockId).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"scrollX":        true,
			"scrollCollapse": true,
			"fixedColumns":   {
				"leftColumns": 2,
			},
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			buttons: [
				
				{
						extend:    'csvHtml5',
						text:      '<i class="fa fa-file-text-o"></i>',
						titleAttr: 'CSV',
						title:	   blockId,
						filename:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o"></i>',
					titleAttr: 'PDF',
					title:	   blockName,
					filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					orientation: "landscape",
					pageSize:'A3',
					customize: function (doc) {
						doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
					}
				}
			]
		});
	}else if(locationType == 'mandal')
	{
		$(".dataTable"+blockId).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"scrollX":        true,
			"scrollCollapse": true,
			"fixedColumns":   {
				"leftColumns": 3,
			},
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   blockName,
					filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o"></i>',
					titleAttr: 'PDF',
					title:	   blockName,
					filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					orientation: "landscape",
					pageSize:'A3',
					customize: function (doc) {
						doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
					}
				}
			]
		});
	}else if(locationType == 'panchayat')
	{
		$(".dataTable"+blockId).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"scrollX":        true,
			"scrollCollapse": true,
			"fixedColumns":   {
				"leftColumns": 4,
			},
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   blockName,
					filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o"></i>',
					titleAttr: 'PDF',
					title:	   blockName,
					filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					orientation: "landscape",
					pageSize:'A3',
					customize: function (doc) {
						doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
					}
				}
			]
		});
	}else if(locationType == 'district')
	{
		$(".dataTable"+blockId).dataTable({
			"iDisplayLength": 20,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			"scrollX":        true,
			"scrollCollapse": true,
			"fixedColumns":   {
				"leftColumns": 1,
			},
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   blockId,
					filename:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o"></i>',
					titleAttr: 'PDF',
					title:	   blockId,
					filename:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					orientation: "landscape",
					pageSize:'A3',
					customize: function (doc) {
						doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
					}
				}
			]
		});
	}
	if(locationType != "state")
	{
		$("[overview-level-new='dataTable"+blockId+"']").trigger("click");
	}
}
function buildNREGSProjectsOverview(result,blockName)
{
	var levelId = $("#selectedName").attr("attr_levelid");
	var str='';
	
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class=" bg_color"  style="border: 5px solid #fff;padding:15px;">';
				str+='<h4 class="text-center m_top10"><b>RURAL DEVELOPMENT - MGNREGS <span class="pull-right" collapse-overview="nonConvergence" style="cursor:pointer;border:1px solid #fff;padding:3px 5px;">-</span></b></h4>';
					str+='<div class="row" collapse-overview-body="nonConvergence">';
						str+='<div class="col-sm-12">';
							str+='<div class="block-border">';
								str+='<h5 class="text-danger">Labour Budget Performance</h5>';
								str+='<div class="row">';	
									for(var i in result)
									{
										if(result[i] == "Labour Budget" || result[i] == "Average Wage" || result[i] == "Average Days of Employment" || result[i] == "HH Completed 100 Days" || result[i] == "Timely Payment" || result[i] == "Payments" || result[i] == "FAperformance" || result[i] == "Agriculture Activities" || result[i] == "Man Days Comparision" || result[i] == "Expenditure" || result[i] == 'Daily Labour Turnout' || result[i] == 'FA Vacancies' || result[i] == 'Material Availability' || result[i] == 'Not Yet Completed Works' || result[i] == "Pending Works" || result[i] == "NRM Works" || result[i] == "Weekly Comparision")
										{
											str+='<div class="col-sm-2 m_top10">';
												str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
													if(result[i].length > 12)
													{
														str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
													}else{
														str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
													}
												str+='</div>';
												if(result[i] == "Payments"){
													str+='<h4 style="background-color:#87ceeb;padding:5px;text-align:center;font-size:12px;cursor:pointer;color:white;text-weight:bold;padding-bottom: 4px;" attr_project_div_id ="'+result[i]+'" overview-block="'+result[i]+'DeptWise">DEPARTMENT WISE</h4>';
												}
												if(result[i] == "Material Availability"){
													str+='<h4 style="background-color:#87ceeb;padding:5px;text-align:center;font-size:12px;cursor:pointer;color:white;text-weight:bold;padding-bottom: 4px;" attr_project_div_id ="'+result[i]+'" overview-block="Departments Material Expenditure">DEPARTMENT WISE</h4>';
												}
												if(result[i] == "Expenditure")
													str+='<h4 style="background-color:#87ceeb;padding:5px;text-align:center;font-size:12px;cursor:pointer;color:white;text-weight:bold;padding-top: 2px;padding-bottom: 2px;" attr_project_div_id ="'+result[i]+'" overview-block="YearWiseExpenditure">YEAR WISE GROWTH</h4>';
													//str+='<span class="glyphicon glyphicon-option-vertical pull-right" aria-hidden="true" title="Click here to get Year Wise Expenditure Growth" style="margin-top: -15px;cursor:pointer;" attr_project_div_id ="'+result[i]+'" overview-block="YearWiseExpenditure"></span>';
											str+='</div>';
										}
									}
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="row m_top10" collapse-overview-body="nonConvergence">';
						str+='<div class="col-sm-12">';
							str+='<div class="block-border">';
								str+='<h5 class="text-danger">MCC Focus Area</h5>';
								str+='<div class="row">';
								for(var i in result)
								{
									if(result[i] == "Farm Ponds" || result[i] == "IHHL" || result[i] == "Vermi Compost" || result[i] == "Imp to CD" || result[i] == "MPT_PT" || result[i] == "GC Works" || result[i] == "CD_CW" || result[i] == "GH" || result[i] == "Solid Waste Management" || result[i] == "Burial Ground" || result[i] == "coffee" || result[i] == 'Comprehensive Restoration of minor Irrigation Tank1' || result[i] == "Soak Pits" || result[i] == "Village Parks" || result[i] == "Play fields" || result[i] == "Approach Roads to Fish PondsMCC"){
										str+='<div class="col-sm-2 m_top10">';
										if(result[i] == "FAperformance"){
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Field Assistant Performance">FA Performan..</h4>';
											str+='</div>';
										}else if(result[i] == 'Imp to CD')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Improvements to Check Dams and Percolation Tanks">Improvements..</h4>';
											str+='</div>';
										}else if(result[i] == 'IHHL')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Individual Household Latrine">Individual H..</h4>';
											str+='</div>';
										}else if(result[i] == 'MPT_PT')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Mini Percolation Tanks and Percolation Tanks">Mini Perco..</h4>';
											str+='</div>';
										}else if(result[i] == 'GC Works')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Gully Control Works">Gully Contr..</h4>';
											str+='</div>';
										}else if(result[i] == 'CD_CW')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Check Dams and Check Walls">Check Dam..</h4>';
											str+='</div>';
										}else if(result[i] == 'GH')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Greening Of Hillocks">Greening O..</h4>';
											str+='</div>';
										}
										else if(result[i] == 'Agriculture Activities')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Agriculture Allied Activities">Agriculture A..</h4>';
											str+='</div>';
										}else if(result[i] == 'Vermi Compost')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Nadep Compost Pits">Nadep Comp..</h4>';
											str+='</div>';
										}else if(result[i] == 'Approach Roads to Fish PondsMCC')
										{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Approach Roads to Fish Ponds">Approach r..</h4>';
											str+='</div>';
										}else{
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										}
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="row m_top10" collapse-overview-body="nonConvergence">';
					str+='<div class="col-sm-12">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger" style="top:-29px">Other MCC</h5>';
							str+='<h5 class="text-danger" style="border: 1px solid #cccccc;margin-left: 4px;padding: 3px;top: -21px;width: 25px;"><span class="pull-right" collapse-overview="nonConvergenceOthers" style="cursor:pointer;border:1px solid #fff;color:#333; margin-right:5px;">+</span></h5>';
							str+='<div class="row" collapse-overview-body="nonConvergenceOthers" style="display:none;">';	
								for(var i in result)
								{
									if(result[i] == 'Greenary works Chettu' || result[i] == 'Agriculture Related Works' || result[i] ==  'Rural Sanitation Works' || result[i] == 'Soil Moisture Conservation works Neeru' || result[i] == 'Works in community lands' || result[i] == 'IJP PROGRAM WORKS' || result[i] == 'Institutional Development Works' || result[i] == 'Road Works' || result[i] == 'Water Harvesting Structures Neeru' || result[i] == 'AH-Live Stock Related works' || result[i] == "SMC Trench" || result[i] == 'Cattle Ponds' || result[i] == 'Desilting of Drinking Water Tanks')
									{
										str+='<div class="col-sm-2 m_top10">';
											if(result[i] == 'SMC Trench')
											{
												str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="SMC Trenches">SMC Trench..</h4>';
												str+='</div>';
											}else{
												str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
													if(result[i].length > 12)
													{
														str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
													}else{
														str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
													}
												str+='</div>';
											}
											if(result[i] != 'SMC Trench' && result[i] != 'Cattle Ponds' && result[i] != 'Desilting of Drinking Water Tanks'){
												str+='<h4 style="background-color:#87ceeb;padding:5px;text-align:center;font-size:12px;cursor:pointer;color:white;text-weight:bold;" class="OtherMCCPopCls" attr_project_div_id ="'+result[i]+'">SUB WORKS</h4>';
											}
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="col-sm-12">';
			str+='<div class=" bg_color"  style="border: 5px solid #fff;padding:15px;">';
				str+='<h4 class="m_top10 text-center"><b>CONVERGENCE-PR DEPTS <span class="pull-right" collapse-overview="convergencePr" style="cursor:pointer;border:1px solid #fff;padding:3px 5px;">+</span></b></h4>';
				str+='<div class="row" collapse-overview-body="convergencePr" style="display:none;">';
					for(var i in result)
					{
						if(result[i] == "CC Roads1" || result[i] == "GP Buildings1" || result[i] == "Mandal buildings1" || result[i] == 'Village Haats' || result[i] == 'Road Formation Upto WBM GR II Including CD works' || result[i] == 'BT RoadsPR' || result[i] == 'Gravel Link RoadsPR' || result[i] == 'WBM RoadsPR'){
							str+='<div class="col-sm-2 m_top10">';
								str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
									if(result[i] == 'CC Roads1')
									{
										str+='<h4 class="panel-block-white-title text-capitalize text-center" title="CC Roads">CC Roads</h4>';
									}else if(result[i] == 'GP Buildings1')
									{
										str+='<h4 class="panel-block-white-title text-capitalize text-center" title="GP Buildings">GP Build..</h4>';
									}else if(result[i] == 'Mandal buildings1')
									{
										str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Mandal buildings">Mandal b..</h4>';
									}else{
										str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
									}
								str+='</div>';
							str+='</div>';
						}
					}
				str+='</div>';
				str+='<div class="row m_top10" collapse-overview-body="convergencePr" style="display:none;">';
					str+='<div class="col-sm-12">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger" style="top:-29px">Other</h5>';
							str+='<h5 class="text-danger" style="border: 1px solid #cccccc;margin-left: 4px;padding: 3px;top: -21px;width: 25px;"><span class="pull-right" collapse-overview="convergenceOthers" style="cursor:pointer;border:1px solid #fff;color:#333;margin-right:5px;">+</span></h5>';
							str+='<div class="row" collapse-overview-body="convergenceOthers" style="display:none;">';
								for(var i in result)
								{
									if(result[i] == 'Renovation and Improvements to existing Check Dams Check Wall' || result[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || result[i] == 'Construction Of Animal Hostel' || result[i] == 'Roads for Unconnected Habitations 2011-12' || result[i] == 'Construction of New Check Dam' || result[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || result[i] == 'Construction of Food Grains Storage Structures of 250MT' || result[i] == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || result[i] == 'Construction of Village Haats Infrastructure fecilities' || result[i] == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || result[i] == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || result[i] == 'Construction of Buildings for women self help group federation' || result[i] == 'Work Site Facilities' || result[i] == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || result[i] == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || result[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || result[i] == 'Production of Grafts in HNTC' || result[i] == 'Improvements of RYTHU BAZAR' || result[i] == 'Roads for Unconnected Habitations 2012-13 and afterwards' || result[i] == 'HNTC Development' || result[i] == 'New Open Well for Drinking water purpose' || result[i] == 'Construction of Crematoria Burial Grounds' || result[i] == 'Repairs to Existing Check Dam' || result[i] == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || result[i] == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || result[i] == 'Construction of Food Grains Storage Structures of 500MT' || result[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || result[i] == 'Raising of Cashew bag seedlings for 2014-15' || result[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || result[i] == 'Comprehensive Restoration of minor Irrigation Tank')
									{
										str+='<div class="col-sm-2 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="col-sm-12">';
			str+='<div class=" bg_color"  style="border: 5px solid #fff;padding:15px;">';
				str+='<h4 class="m_top10 text-center"><b>CONVERGENCE-OTHER DEPTS (Targets Year Wise)<span class="pull-right" collapse-overview="convergenceOthr" style="cursor:pointer;border:1px solid #fff;padding:3px 5px;">+</span></b></h4>';
				str+='<div class="row m_top20" collapse-overview-body="convergenceOthr" style="display:none;">';
					str+='<div class="col-sm-12">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Animal Husbandry</h5>';
							str+='<div class="row">';	
								for(var i in result)
								{
									if(result[i] == "OPGK-Perinnials" || result[i] == "OPGK-Annuals" || result[i] == "Animal Hostels" || result[i] == "Mega Kshetralu" || result[i] == "Fodder trough for Cattle Cattle drinking water trough"){
										str+='<div class="col-sm-2 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
											
												if(result[i] == 'OPGK-Perinnials')
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Oorura Pasu Graasa Kshetralu - Perinnials">Oorura Pas..</h4>';
												}else if(result[i] == 'OPGK-Annuals')
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Oorura Pasu Graasa Kshetralu - Annuals">Oorura Pas..</h4>';
												}else if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				//Vasanti
				str+='<div class="row m_top20" collapse-overview-body="convergenceOthr" style="display:none;">';
					str+='<div class="col-sm-12">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger" style="top:-29px">Animal Husbandry Others</h5>';
							str+='<h5 class="text-danger" style="border: 1px solid #cccccc;margin-left: 4px;padding: 3px;top: -21px;width: 25px;"><span class="pull-right" collapse-overview="animalHusbandryOthers" style="cursor:pointer;border:1px solid #fff;color:#333; margin-right:5px;">+</span></h5>';
							str+='<div class="row" collapse-overview-body="animalHusbandryOthers" style="display:none;">';	
								for(var i in result)
								{
									if(result[i] == "Azolla Production Unit" || result[i] == "Construction of silopits of 3 MTs capacity" || result[i] == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || result[i] == "Raising of Perinnial Fodder" || result[i] == "Raising of Silvipasture clubbed with subabul plantation")
									{
										str+='<div class="col-sm-2 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="row m_top20" collapse-overview-body="convergenceOthr" style="display:none;">';
					str+='<div class="col-sm-12">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Forest</h5>';
							str+='<div class="row">';
								for(var i in result)
								{
									if(result[i] == "Raising and Maintenance of nurseries" || result[i] == 'Continuous Trenches' || result[i] == 'Check Dam' || result[i] == 'Desilting CD' || result[i] == 'Mini Percolation tank' || result[i] == 'Percolation tank' || result[i] == 'Rock fill dams' || result[i] == 'Seed Dibbling' || result[i] == 'Nursery' || result[i] == 'Maintenance of Nurseries'){
										str+='<div class="col-sm-2 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
												if(result[i] == 'Desilting CD'){
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Desilting and Depening of existing Percolation Tank / Mini Percolation Tank / Check Dam">Desilting ..</h4>';
												}
												else if(result[i] == 'Nursery'){
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Raising of Nurseries">Raising o ..</h4>';
												}
												else if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="row m_top20" collapse-overview-body="convergenceOthr" style="display:none;">';
					str+='<div class="col-sm-12">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger" style="top:-29px">Forest Others</h5>';
							str+='<h5 class="text-danger" style="border: 1px solid #cccccc;margin-left: 4px;padding: 3px;top: -21px;width: 25px;"><span class="pull-right" collapse-overview="forestOthers" style="cursor:pointer;border:1px solid #fff;color:#333; margin-right:5px;">+</span></h5>';
							str+='<div class="row" collapse-overview-body="forestOthers" style="display:none;">';
							
								for(var i in result)
								{
									if(result[i] == "Raising and Maintenance of Avenue plantations" || result[i] == "Raising and Maintenance of Block Plantations" || result[i] == 'Soil and Moisture Conservation Works'){
										str+='<div class="col-sm-2 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="row m_top20" collapse-overview-body="convergenceOthr" style="display:none;">';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Fisheries</h5>';
							str+='<div class="row">';	
								for(var i in result)
								{
									if(result[i] == "Fish Drying Platforms" || result[i] == "Fish Ponds"){
										str+='<div class="col-sm-6 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				//str+='</div>';
				//str+='<div class="row m_top20" collapse-overview-body="convergenceOthr" style="display:none;">';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Sericulture</h5>';
							str+='<div class="row">';	
								for(var i in result)
									if(result[i] == "Mulbery New" || result[i] == "Silk worm New" ){
								{
										str+='<div class="col-sm-6 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-2">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">RWS</h5>';
							str+='<div class="row">';	
								for(var i in result)
									if(result[i] == "UGDrainage"){
								{
										str+='<div class="col-sm-12 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-2">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">SERP</h5>';
							str+='<div class="row">';	
								for(var i in result)
								{
									if(result[i] == "Horticulture"){
										str+='<div class="col-sm-12 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="row m_top20" collapse-overview-body="convergenceOthr" style="display:none;">';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Tribal Welfare</h5>';
							str+='<div class="row">';	
								for(var i in result)
								{
									if(result[i] == "BT RoadsITDA" || result[i] == "WBM RoadsITDA"){
										str+='<div class="col-sm-6 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Housing</h5>';
							str+='<div class="row">';	
								for(var i in result)
								{
									if(result[i] == "NTR 90 Days" || result[i] == "Production of Bricks" || result[i] == "NTR Rural House"){
										str+='<div class="col-sm-6 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">School Education</h5>';
							str+='<div class="row">';	
								for(var i in result)
								{
									if(result[i] == "Construction of compound wallSchool Education Department"){
										str+='<div class="col-sm-6 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';	
												str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Construction of compound wall">Construction..</h4>';
											str+='</div>';
										str+='</div>';
									}
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="row m_top20" collapse-overview-body="convergenceOthr" style="display:none;">';
					str+='<div class="col-sm-6">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">ICDS</h5>';
							str+='<div class="row">';	
								for(var i in result)
								{
									if(result[i] == "Nutri Garden" || result[i] == "Avenue" || result[i] == "Anganwadi")
									{
										str+='<div class="col-sm-4 m_top10">';
											str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
												if(result[i] == 'Anganwadi')
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Anganwadi Buildings">Anganwadi B..</h4>';
												}
												else if(result[i].length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i].substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
												}
											str+='</div>';
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
	$("#projectsOverview").html(str);
	

	minimise(".rightNavigationMenu li",8)
	$(".toolTipTitleCls").tooltip();
	if(blockName != null)
	{
		$('[overview-block]').removeClass("active");
		$('[overview-block="'+blockName+'"]').addClass("active");
		$('[overview-block="'+blockName+'"]').trigger('click');
	}
}

//LabourBudget Overview Call נSravanth
function getNREGSLabourBudgetOverview(projectDivId,menuLocationType,menuLocationId)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#projectOvervw"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
        toDate : glEndDate,
		divType : globalDivName,
		locationType : menuLocationType,
		locationId : menuLocationId,
		districtId:districtId
	}
	$.ajax({
		url: 'getLabourBudgetOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNregasOverViewBlock(ajaxresp,projectDivId,menuLocationType,menuLocationId)
		}
	});
}

//LabourBudget Expenditure Call  ?Sravanth
function getNREGSLabourBudgetExpenditure(projectDivId,menuLocationType,menuLocationId,buildType)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#projectExp"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(spinner);
	$("#labourRadioDivId").show();
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
        toDate : glEndDate,
        locationType : menuLocationType,
        locationId : menuLocationId,
		districtId:districtId,
		pType : buildType
	}
  $.ajax({
    url: 'getLabourBudgetExpenditure',
    data: JSON.stringify(json),
    type: "POST",
    dataType: 'json', 
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success: function(ajaxresp) {
		buildLabrBudgetExpBlock(ajaxresp,projectDivId,menuLocationType,menuLocationId,buildType)
    }
  });
}

//LabourBudget LevelWise Data Call ?Sravanth
function getNREGSLabBugdtLelwiseData(divIdd,locationType,menuLocationType,menuLocationId,blockName)
{
	var districtId = $("#selectedName").attr("attr_distid");
	var theadArr = [locationType,'Target Person days','Generated','Achievement Percentage','Wage Expenditure','Material Expenditure','Total Expenditure','Material Perc'];
	if(locationType == "constituency")
		theadArr = ["district",locationType,'Target Person days','Generated','Achievement Percentage','Wage Expenditure','Material Expenditure','Total Expenditure','Material Perc'];
	else if(locationType == "mandal")
		theadArr = ["district","constituency",locationType,'Target Person days','Generated','Achievement Percentage','Wage Expenditure','Material Expenditure','Total Expenditure','Material Perc'];
	else if(locationType == "panchayat")
		theadArr = ["district","constituency","mandal",locationType,'Target Person days','Generated','Achievement Percentage','Wage Expenditure','Material Expenditure','Total Expenditure','Material Perc'];
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocaType : locationType,
		districtId:districtId
	}
	$.ajax({
		url: 'getNregaLevelwiseOverviewForLabourBudgetData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}	
						if(locationType == "state"){
							str+='<td>'+ajaxresp[i].targetPersonDays+'L</td>';
							str+='<td>'+ajaxresp[i].generatedPersonDays+'L</td>';
						}else{
							str+='<td>'+ajaxresp[i].targetPersonDays+'</td>';
							str+='<td>'+ajaxresp[i].generatedPersonDays+'</td>';
						}
						
						if(ajaxresp[i].perAppLB >= 100){
							str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].perAppLB+'</td>';
						}else if(ajaxresp[i].perAppLB >= 90 && ajaxresp[i].perAppLB < 100){
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].perAppLB+'</td>';
						}else if(ajaxresp[i].perAppLB >= 60 && ajaxresp[i].perAppLB < 90){
							str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].perAppLB+'</td>';
						}else{
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].perAppLB+'</td>';
						}
						
						str+='<td>'+ajaxresp[i].wageExpenditure+'</td>';
						str+='<td>'+ajaxresp[i].materialExpenditure+'</td>';
						str+='<td>'+ajaxresp[i].totalExpenditure+'</td>';
						if(ajaxresp[i].materialExpenditurePerc < 35)
						{
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].materialExpenditurePerc+'</td>';
						}else if(ajaxresp[i].materialExpenditurePerc >= 35 && ajaxresp[i].materialExpenditurePerc < 40)
						{
							str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].materialExpenditurePerc+'</td>';
						}else if(ajaxresp[i].materialExpenditurePerc >= 40)
						{
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].materialExpenditurePerc+'</td>';
						}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

function buildNregasOverViewBlock(result,projectDivId,menuLocationType,menuLocationId){
	
	var $windowWidth = $(window).width();
	var str1="";
	if(result.maleLabour != null){
		str1+='<div class="table-responsive">';
			str1+='<table class="table table-bordered m_top10">';
				str1+='<tbody>';
					str1+='<tr>';
						str1+='<td>';
							str1+='	<div class="col-sm-12">';
								str1+='<h4><b>Total labour : '+result.totalLabour+'L</b></h4>';
							str1+='</div>';
							str1+='<div class="col-sm-12 m_top10">';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Male.png"></p><p class="media-body">Male Labours : '+result.maleLabour+'L</p>';
								str1+='</div>';
								str1+='<div class="media"> ';  
								str1+='<p class="media-left">';
									str1+='<img src="Assests/icons/Female.png"></p><p class="media-body">Female Labour : '+result.femaleLabour+'L</p>';
								str1+='</div> ';
							str1+='</div>';
						str1+='</td>';
						str1+='<td>';
							str1+='<div class="col-sm-12">';
								str1+='<h4><b>Total Response : '+result.totalResponse+'L</b></h4>';
							str1+='	</div>';
							str1+='<div class="col-sm-12 m_top10">';
								str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green_Worker.png"></p><p class="media-body">On request work allocated : '+result.onRequestWorkAllocated+'L</p>';
									str1+='</div>';
								str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Orange_Worker.png"></p><p class="media-body">Got work occutionaly :'+result.gotWorkOccutionally+'L</p>';
									str1+='</div>';
								str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Red_Worker.png"></p><p class="media-body">Havent got work :'+result.haveNotGotWork+'L</p>';
								str1+='</div>';
							str1+='</div>';
						str1+='</td>';
						str1+='<td>';
							str1+='<div class="col-sm-12">';
								str1+='<h4><b>Total Budget : <i class="fa fa-inr"></i>'+result.totalBudget+'</b></h4>';
							str1+='</div>';
							str1+='<div class="col-sm-12 m_top10">';
								str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Labours_icon.png"></p><p class="media-body">Budget for Labours : <i class="fa fa-inr"></i>'+result.budgetForLabour+'</p>';
								str1+='</div>';
								str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Bugget_icon.png"></p><p class="media-body">Budget for Material : <i class="fa fa-inr"></i>'+result.budgetForMaterial+'</p>';
									str1+='</div>';
							str1+='</div>';
						str1+='</td>';
					str1+='</tr>';
				str1+='</tbody>';
			str1+='</table>';
		str1+='</div>';
		
	}
	if(result != null && result.districtsInRed != null){
		str1+='<div class="table-responsive">';
			str1+='<table class="table table-bordered m_top10" >';
				str1+='<tbody>';
					str1+='<tr>';
						str1+='<td>';
							str1+='<div class="col-sm-12">';
								str1+='<h4 attr_locationType="district" attr_type="total"><strong>Total Districts : '+result.totalDistricts+'</strong></h4>';
							str1+='</div>';
							str1+='<div class="col-sm-12 m_top10">';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
									if(result.districtsInRed != null && result.districtsInRed > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_locationType="district" attr_type="red" style="cursor:pointer;">Districts in Red : '+result.districtsInRed+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="district" attr_type="red">Districts in Red : '+result.districtsInRed+'</p>';
								str1+='</div>';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
									if(result.districtsInOrange != null && result.districtsInOrange > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="district" attr_type="orange" style="cursor:pointer;">Districts in Orange : '+result.districtsInOrange+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="district" attr_type="orange" >Districts in Orange : '+result.districtsInOrange+'</p>';
								str1+='</div>';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
									if(result.districtsInGreen != null && result.districtsInGreen > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="district" attr_type="green" style="cursor:pointer;">Districts in Green : '+result.districtsInGreen+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="district" attr_type="green" >Districts in Green : '+result.districtsInGreen+'</p>';
								str1+='</div>';
								if(typeof(result.districtsInGold) != "undefined"){
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
										if(result.districtsInGold != null && result.districtsInGold > 0)
											str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="district" attr_type="gold" style="cursor:pointer;">Districts in Gold : '+result.districtsInGold+'</p>';
										else
											str1+='<p class="media-body" attr_locationType="district" attr_type="gold" >Districts in Gold : '+result.districtsInGold+'</p>';
									str1+='</div>';
								}
								
							str1+='</div>';
						str1+='</td>';
						str1+='<td>';
							str1+='<div class="col-sm-12">';
								str1+='<h4 attr_locationType="constituency" attr_type="total"><strong>Total Constituencies : '+result.totalConstituencies+'</strong></h4>';
							str1+='</div>';
							str1+='<div class="col-sm-12 m_top10">';
								str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
								if(result.constituenciesInRed != null && result.constituenciesInRed > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="constituency" attr_type="red" style="cursor:pointer;">Constituencies in Red : '+result.constituenciesInRed+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="constituency" attr_type="red" >Constituencies in Red : '+result.constituenciesInRed+'</p>';
									str1+='</div>';
								str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
								if(result.constituenciesInOrange != null && result.constituenciesInOrange > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="constituency" attr_type="orange" style="cursor:pointer;">Constituencies in Orange : '+result.constituenciesInOrange+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="constituency" attr_type="orange" >Constituencies in Orange : '+result.constituenciesInOrange+'</p>';
									str1+='</div>';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
									if(result.constituenciesInGreen != null && result.constituenciesInGreen > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="constituency" attr_type="green" style="cursor:pointer;">Constituencies in Green : '+result.constituenciesInGreen+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="constituency" attr_type="green" >Constituencies in Green : '+result.constituenciesInGreen+'</p>';
								str1+='</div>';
								if(typeof(result.constituenciesInGold) != "undefined"){
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
										if(result.constituenciesInGold != null && result.constituenciesInGold > 0)
											str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="constituency" attr_type="gold" style="cursor:pointer;">Constituencies in Gold : '+result.constituenciesInGold+'</p>';
										else
											str1+='<p class="media-body" attr_locationType="constituency" attr_type="gold" >Constituencies in Gold : '+result.constituenciesInGold+'</p>';
									str1+='</div>';
								}
							str1+='</div>';	
							
						str1+='</td>';
						str1+='<td>';
							str1+='<div class="col-sm-12">';
								str1+='<h4 attr_locationType="mandal" attr_type="total"><strong>Total Mandals : '+result.totalMandals+'</strong></h4>';
							str1+='</div>';
							str1+='<div class="col-sm-12 m_top10">';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
									if(result.mandalsInRed != null && result.mandalsInRed > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="mandal" attr_type="red" style="cursor:pointer;">Mandals in Red : '+result.mandalsInRed+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="mandal" attr_type="red">Mandals in Red : '+result.mandalsInRed+'</p>';
								str1+='</div>';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
									if(result.mandalsInOrange != null && result.mandalsInOrange > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="mandal" attr_type="orange" style="cursor:pointer;">Mandals in Orange : '+result.mandalsInOrange+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="mandal" attr_type="orange">Mandals in Orange : '+result.mandalsInOrange+'</p>';
								str1+='</div>';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
									if(result.mandalsInGreen != null && result.mandalsInGreen > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="mandal" attr_type="green" style="cursor:pointer;">Mandals in Green : '+result.mandalsInGreen+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="mandal" attr_type="green">Mandals in Green : '+result.mandalsInGreen+'</p>';
								str1+='</div>';
								if(typeof(result.mandalsInGold) != "undefined"){
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
										if(result.mandalsInGold != null && result.mandalsInGold > 0)
											str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="mandal" attr_type="gold" style="cursor:pointer;">Mandals in Gold : '+result.mandalsInGold+'</p>';
										else
											str1+='<p class="media-body" attr_locationType="mandal" attr_type="gold">Mandals in Gold : '+result.mandalsInGold+'</p>';
									str1+='</div>';
								}
							str1+='</div>';	
						str1+='</td>';
						if(globalDivName != null && globalDivName == "Mandal buildings1"){
							str1+='<td>';
							str1+='<div class="col-sm-12">';
								str1+='<h4><strong>Total Villages : '+result.totalVillages+'</strong></h4>';
							str1+='</div>';
							str1+='<div class="col-sm-12 m_top10">';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
										str1+='<p class="media-body" attr_locationType="panchayat" attr_type="red">Villages in Red : '+result.villagesInRed+'</p>';
								str1+='</div>';
								str1+=' <div class="media">';
								   str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
										str1+='<p class="media-body" attr_locationType="panchayat" attr_type="orange">Villages in Orange : '+result.villagesInOrange+'</p>';
								str1+='</div>';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
										str1+='<p class="media-body" attr_locationType="panchayat" attr_type="green">Villages in Green : '+result.villagesInGreen+'</p>';
								str1+='</div>';
								if(typeof(result.villagesInGold) != "undefined"){
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
											str1+='<p class="media-body" attr_locationType="panchayat" attr_type="gold">Villages in Gold : '+result.villagesInGold+'</p>';
									str1+='</div>';
								}
							str1+='</div>';	
						str1+='</td>';
						}else{
							str1+='<td>';
							str1+='<div class="col-sm-12">';
								str1+='<h4><strong>Total Villages : '+result.totalVillages+'</strong></h4>';
							str1+='</div>';
							str1+='<div class="col-sm-12 m_top10">';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
									if(result.villagesInRed != null && result.villagesInRed > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="panchayat" attr_type="red" style="cursor:pointer;">Villages in Red : '+result.villagesInRed+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="panchayat" attr_type="red" style="cursor:pointer;"">Villages in Red : '+result.villagesInRed+'</p>';
								str1+='</div>';
								str1+=' <div class="media">';
								   str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
								   if(result.villagesInOrange != null && result.villagesInOrange > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="panchayat" attr_type="orange" style="cursor:pointer;">Villages in Orange : '+result.villagesInOrange+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="panchayat" attr_type="orange" style="cursor:pointer;">Villages in Orange : '+result.villagesInOrange+'</p>';
								str1+='</div>';
								str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
									if(result.villagesInGreen != null && result.villagesInGreen > 0)
										str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="panchayat" attr_type="green" style="cursor:pointer;">Villages in Green : '+result.villagesInGreen+'</p>';
									else
										str1+='<p class="media-body" attr_locationType="panchayat" attr_type="green" style="cursor:pointer;">Villages in Green : '+result.villagesInGreen+'</p>';
								str1+='</div>';
								if(typeof(result.villagesInGold) != "undefined"){
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
										if(result.villagesInGold != null && result.villagesInGold > 0)
											str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="panchayat" attr_type="gold" style="cursor:pointer;">Villages in Gold : '+result.villagesInGold+'</p>';
										else
											str1+='<p class="media-body" attr_locationType="panchayat" attr_type="gold" style="cursor:pointer;">Villages in Gold : '+result.villagesInGold+'</p>';
									str1+='</div>';
								}
							str1+='</div>';	
						str1+='</td>';
						}
						
					str1+='</tr>';
				str1+='</tbody>';
			str1+='</table>';
		str1+='</div>';
	}else{
		str1+='<p class="m_top20 font_weight">NO DATA AVAILABLE</p>';
	}
	
	
	//var currentYear = moment().year().toString();
	//var lastYear = moment().subtract(1,'year').year().toString();
	if(projectDivId == 'Farm Ponds' || projectDivId == 'IHHL' || projectDivId == 'Vermi Compost' || projectDivId == 'Solid Waste Management' || projectDivId == 'Play fields' || projectDivId == 'Burial Ground' || projectDivId == 'Timely Payment'){		
		var redClor="red";
		var oragneClor="orange";
		var greenColor ="green";
		var goldColor ="gold";
			if(globalFinancialYear != null && globalFinancialYear == "2017")
			//str+='<h4><b>BELOW 20L EXPENDITURE PANCHAYATS CHANGED STATUS SUMMARY FROM NOV-30th TO TODAY</b></h4>';					
				str1+='<h4 class="text-capital font_weight m_top20" style="margin-left: 15px;">'+projectDivId+' Achievement Comparision Summary From NOV-30th to Today</h4>';
			else if(globalFinancialYear != null && globalFinancialYear == "2018")
			//str+='<h4><b>BELOW 20L EXPENDITURE PANCHAYATS CHANGED STATUS SUMMARY FROM JUN-28th TO TODAY</b></h4>';					
				str1+='<h4 class="text-capital font_weight m_top20" style="margin-left: 15px;">'+projectDivId+' Achievement Comparision Summary From JUL-25th to Today</h4>';
		str1+='<div class="table-responsive m_top20">';
			str1+='<table class="table table_right_css">';
				str1+='<thead>';
					str1+='<tr>';
						str1+='<th></th>';
						str1+='<th class = "text-center">Red</th>';
						str1+='<th class = "text-center">Orange</th>';
						str1+='<th class = "text-center">Green</th>';
						str1+='<th class = "text-center">Gold</th>';
					str1+='</tr>';
				str1+='</thead>';
				str1+='<tbody>';
					str1+='<tr>';
						if(globalFinancialYear != null && globalFinancialYear == "2017")
							str1+='<th>As Of Nov 30th</th>';
						else if(globalFinancialYear != null && globalFinancialYear == "2018")
							str1+='<th>As Of Jul 25th</th>';
						str1+=' <td>'+result.previousRedMandals+'</td>';
						str1+=' <td>'+result.previousOrangeMandals+'</td>';
						str1+=' <td>'+result.previousGreenMandals+'</td>';
						str1+=' <td>'+result.previousGoldMandals+'</td>';
					str1+='</tr>';
					str1+='<tr>';
						if(globalFinancialYear != null && globalFinancialYear == "2017")
							str1+='<th>As&nbsp;Of&nbsp;Last Fin. Year</th>';
						else if(globalFinancialYear != null && globalFinancialYear == "2018")
							str1+='<th>As&nbsp;Of&nbsp;Now</th>';
						if(result.mandalsInRed != null && result.mandalsInRed>0){
						str1+=' <td class="commentsBlockCls" attr_divName ='+projectDivId+' attr_location_Type ='+menuLocationType+' attr_loaction_id ='+menuLocationId+' attr_color ='+redClor+' style="cursor:pointer;">'+result.mandalsInRed+'&nbsp;';
							if(result.redType == "Decrement"){
								str1+='<span>(&nbsp;'+parseFloat(result.mandalRedPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-down text-success" aria-hidden="true"></i></span>&nbsp;)';
							}else{
								str1+='<span>(&nbsp;'+parseFloat(result.mandalRedPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-up text-danger" aria-hidden="true"></i></span>&nbsp;)';
							}
							str1+='</td>';
						}else{
							str1+=' <td>'+result.mandalsInRed+'</td>';
						}
						if(result.mandalsInOrange != null && result.mandalsInOrange>0){
						str1+=' <td class="commentsBlockCls" attr_divName ='+projectDivId+' attr_location_Type ='+menuLocationType+' attr_loaction_id ='+menuLocationId+' attr_color ='+oragneClor+' style="cursor:pointer;">'+result.mandalsInOrange+'&nbsp;';
							if(result.orangeType == "Increment"){
								str1+='<span>(&nbsp;'+parseFloat(result.mandalOrangePerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-up text-success" aria-hidden="true"></i></span>&nbsp;)';
							}else{
								str1+='<span>(&nbsp;'+parseFloat(result.mandalOrangePerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i></span>&nbsp;)';
							}
							str1+='</td>';
						}else{
							str1+=' <td>'+result.mandalsInOrange+'</td>';
						}
						if(result.mandalsInGreen != null && result.mandalsInGreen>0){
						str1+=' <td class="commentsBlockCls" attr_divName ='+projectDivId+' attr_location_Type ='+menuLocationType+' attr_loaction_id ='+menuLocationId+' attr_color ='+greenColor+' style="cursor:pointer;">'+result.mandalsInGreen+'&nbsp;';
							if(result.greenType == "Increment"){
								str1+='<span>(&nbsp;'+parseFloat(result.mandalGreenPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-up text-success" aria-hidden="true"></i></span>&nbsp;)';
							}else{
								str1+='<span>(&nbsp;'+parseFloat(result.mandalGreenPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i></span>&nbsp;)';
							}
							str1+='</td>';
						}else{
							str1+=' <td>'+result.mandalsInGreen+'</td>';
						}
						if(result.mandalsInGold != null && result.mandalsInGold>0){
						str1+=' <td class="commentsBlockCls" attr_divName ='+projectDivId+' attr_location_Type ='+menuLocationType+' attr_loaction_id ='+menuLocationId+' attr_color ='+goldColor+' style="cursor:pointer;" >'+result.mandalsInGold+'&nbsp;';
							if(result.goldType == "Increment"){
								str1+='<span>(&nbsp;'+parseFloat(result.mandalGoldPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-up text-success" aria-hidden="true"></i></span>&nbsp;)';
							}else{
								str1+='<span>(&nbsp;'+parseFloat(result.mandalGoldPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i></span>&nbsp;)';
							}
							str1+='</td>';
						}else{
							str1+=' <td>'+result.mandalsInGold+'</td>';
						}
					str1+='</tr>';
				str1+='</tbody>';
			str1+='</table>';
		str1+='</div>';
		if(result.subList != null && result.subList.length >0){
			str1+='<div class="table-responsive m_top20">';
				if(globalFinancialYear != null && globalFinancialYear == "2017")				
					str1+='<h4><b>ACHIEVEMENT PERCENTAGE BELOW 60% MANDALS CHANGED STATUS SUMMARY FROM NOV-30th TO TODAY</b></h4>';
				else if(globalFinancialYear != null && globalFinancialYear == "2018")				
					str1+='<h4><b>ACHIEVEMENT PERCENTAGE BELOW 60% MANDALS CHANGED STATUS SUMMARY FROM JUL-25th TO TODAY</b></h4>';
				str1+='<table class="table table-striped table-bordered table_labour_css m_top10">';
					str1+='<thead>';
						str1+='<tr>';
							str1+='<th></th>';
							if(globalFinancialYear != null && globalFinancialYear == "2017")
								str1+='<th>As Of Nov 30th</th>';
							else if(globalFinancialYear != null && globalFinancialYear == "2018")
								str1+='<th>As Of Jul 25th</th>';
							//str1+='<th>As On Nov 30th</th>';
							if(globalFinancialYear != null && globalFinancialYear == "2017")
								str1+='<th>As&nbsp;Of&nbsp;Last Fin. Year</th>';
							else if(globalFinancialYear != null && globalFinancialYear == "2018")
								str1+='<th>As&nbsp;Of&nbsp;Now</th>';
							//str1+='<th>As Of Last Fin. Year</th>';
							str1+='<th class = "text-center">Changed</th>';
							str1+='<th class = "text-center">Red</th>';
							str1+='<th class = "text-center">Orange</th>';
							str1+='<th class = "text-center">Green</th>';
							str1+='<th class = "text-center">Gold</th>';
						str1+='</tr>';
					str1+='</thead>';
					str1+='<tbody>';
						if(result.subList != null && result.subList.length > 0){
							for(var i in result.subList){
								str1+='<tr>';
									str1+='<td>'+result.subList[i].name+'</td>';
									str1+='<td>'+result.subList[i].previousCount+'</td>';
									str1+='<td>'+result.subList[i].presentCount+'</td>';
									str1+='<td>'+result.subList[i].changedCount+'</td>';
									str1+='<td>'+result.subList[i].mandalsInRed+'</td>';
									str1+='<td>'+result.subList[i].mandalsInOrange+'</td>';
									str1+='<td>'+result.subList[i].mandalsInGreen+'</td>';
									str1+='<td>'+result.subList[i].mandalsInGold+'</td>';
								str1+='</tr>';
							}
						}
					str1+='</tbody>';
				str1+='</table>';
			str1+='</div>';
		}else{
			if(globalFinancialYear != null && globalFinancialYear == "2017")				
				str1+='<h4><b>ACHIEVEMENT PERCENTAGE BELOW 60% MANDALS CHANGED STATUS SUMMARY FROM NOV-30th TO TODAY</b></h4>';
			else if(globalFinancialYear != null && globalFinancialYear == "2018")				
				str1+='<h4><b>ACHIEVEMENT PERCENTAGE BELOW 60% MANDALS CHANGED STATUS SUMMARY FROM JUL-25th TO TODAY</b></h4>';
			str1+='<p class="m_top20 font_weight">NO DATA AVAILABLE</p>';
		}		
	}
	
	if(projectDivId == 'Labour Budget'){
	str1+='<div class="row">';
	str1+='<div class="m_top20 col-sm-5" id="labourRadioDivId" style="display:none;">';
		str1+='<label class="radio-inline">';
			str1+='<input name="'+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" overview-locationId="'+menuLocationId+'" attr_locationType="'+menuLocationType+'" attr_name="TOT"  type="radio" checked attr_levelId="2" attr_labr_budget_radioBtn="'+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'"/> Total';
		str1+='</label>';
		str1+='<label class="radio-inline">';
			str1+='<input name="'+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" overview-locationId="'+menuLocationId+'" attr_locationType="'+menuLocationType+'" attr_name="WAGE" type="radio"  attr_levelId="2" attr_labr_budget_radioBtn="'+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'"/> Wage';
		str1+='</label>';
		str1+='<label class="radio-inline">';
			str1+='<input name="'+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" overview-locationId="'+menuLocationId+'" attr_locationType="'+menuLocationType+'" attr_name="MAT" type="radio"  attr_levelId="2" attr_labr_budget_radioBtn="'+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'"/> Material';
		str1+='</label>';
		str1+='</div>';
	str1+='<div class="expenditure col-sm-7 m_top20">';
	str1+='<strong>No of Panchayaties Vs Expenditure In Lakhs</strong>';
	str1+='</div>';
	str1+='</div>';
	str1+='<div id="projectExp'+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'" style="margin-top:10px;"></div>';
	
	}
	$("#projectOvervw"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(str1);
	if(projectDivId == 'Labour Budget'){
		getNREGSLabourBudgetExpenditure(projectDivId,menuLocationType,menuLocationId,"TOT");
	}
}

//LabourBudget Exp Builing --  Nandhini
function buildLabrBudgetExpBlock(result,projectDivId,menuLocationType,menuLocationId,radioType){
	var str='';
	str+='<div class="col-md-12 table-responsive">';
			str+='<table class="table table-striped table-bordered">';
				str+='<tbody>';
					 str+='<tr>';
						 str+='<td></td>';
						 for(var i in result){
							 str+='<td>'+result[i].name+'</td>';
						 }
					  str+='</tr>';
					  str+=' <tr>';
						if(globalFinancialYear != null && globalFinancialYear == "2017")
							str+=' <td><b>As&nbsp;On&nbsp;Nov&nbsp;30th</b></td>';
						else if(globalFinancialYear != null && globalFinancialYear == "2018")
							str+=' <td><b>As&nbsp;On&nbsp;June&nbsp;28th</b></td>';
						for(var i in result){
							str+='<td>'+result[i].orderNo+'</td>';
						}
					str+='</tr>';
					str+=' <tr>';
						if(globalFinancialYear != null && globalFinancialYear == "2017")
							str+=' <td><b>As&nbsp;Of&nbsp;Last&nbsp;Fin.&nbsp;Year</b></td>';//As Of Now
						else if(globalFinancialYear != null && globalFinancialYear == "2018")
							str+=' <td><b>As&nbsp;Of&nbsp;Now</b></td>';//As Of Now
						for(var i in result){
							if(result[i].count != null && result[i].count != 0){
								str+='<td class="cuntCls" style="cursor:pointer;" attr_range="'+result[i].name+'" attr_location_type="'+menuLocationType+'" attr_loaction_id="'+menuLocationId+'" attr_radioType="'+radioType+'" nowrap>'+result[i].count+'&nbsp;';
								if(result[i].name != null && (result[i].name == "0" || result[i].name == "Below 1" || result[i].name == "1-5" || result[i].name == "5-10" || result[i].name == "10-20")){
									if(result[i].assetType == "Decrement"){
										str+='<span>(&nbsp;'+parseFloat(result[i].todayPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-down text-success" aria-hidden="true"></i></span>&nbsp;)';
									}else{
										str+='<span>(&nbsp;'+parseFloat(result[i].todayPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-up text-danger" aria-hidden="true"></i></span>&nbsp;)';
									}
								}else{
									if(result[i].assetType == "Increment"){
										str+='<span>(&nbsp;'+parseFloat(result[i].todayPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-up text-success" aria-hidden="true"></i></span>&nbsp;)';
									}else{
										str+='<span>(&nbsp;'+parseFloat(result[i].todayPerc).toFixed(2)+'&nbsp;%&nbsp;<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i></span>&nbsp;)';
									}
								}
								str+='</td>';
							}else{
								str+='<td attr_range="'+result[i].name+'" attr_location_type="'+menuLocationType+'" attr_loaction_id="'+menuLocationId+'" nowrap>'+result[i].count+'</td>';
							}
						}
					str+='</tr>';
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		
		str+='<div class="col-md-12 table-responsive m_top20">';
			if(globalFinancialYear != null && globalFinancialYear == "2017")
				str+='<h4><b>BELOW 20L EXPENDITURE PANCHAYATS CHANGED STATUS SUMMARY FROM NOV-30th TO TODAY</b></h4>';
			else if(globalFinancialYear != null && globalFinancialYear == "2018")
				str+='<h4><b>BELOW 20L EXPENDITURE PANCHAYATS CHANGED STATUS SUMMARY FROM JUN-28th TO TODAY</b></h4>';
			str+='<table class="table table-striped table-bordered table_labour_css m_top10">';
				str+='<thead>';
					str+='<tr>';
					str+='<th>Expenditure Ranges (In Lakhs)</th>';
					if(globalFinancialYear != null && globalFinancialYear == "2017"){
						str+='<th>As On Nov 30th</th>';
						str+='<th>As Of Last Fin. Year</th>';
					}
					else if(globalFinancialYear != null && globalFinancialYear == "2018"){
						str+='<th>As On June 28th</th>';
						str+='<th>As Of Now</th>';
					}
					
					str+='<th>Changed</th>';
					//str+='<th>Changed Status</th>';
					//str+='</tr>';
					//str+='<tr>';
					str+='<th>0</th>';
					str+='<th>Below 1</th>';
					str+='<th>1-5</th>';
					str+='<th>5-10</th>';
					str+='<th>10-20</th>';
					str+='<th>Above 20</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					if(result[0].subList != null && result[0].subList.length > 0){
						for(var i in result[0].subList){
							str+='<tr>';
								str+='<td>'+result[0].subList[i].name+'</td>';
								str+='<td>'+result[0].subList[i].orderNo+'</td>';
								str+='<td>'+result[0].subList[i].count+'</td>';
								str+='<td>'+result[0].subList[i].changedCount+'</td>';
								str+='<td>'+result[0].subList[i].zeroCount+'</td>';
								str+='<td>'+result[0].subList[i].belowOneCount+'</td>';
								str+='<td>'+result[0].subList[i].oneToFiveCount+'</td>';
								str+='<td>'+result[0].subList[i].fiveToTenCount+'</td>';
								str+='<td>'+result[0].subList[i].tenToTwentyCount+'</td>';
								str+='<td>'+result[0].subList[i].diffCount+'</td>';
							str+='</tr>';
						}
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#projectExp"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(str);
}

//DistrictConst Call -- Nandhini
function buildDistrictsPopupDetails(result,dataArr){
	var str = '';
	if(result.distList != null && result.distList.length > 0 )
	{
		var theadArr;
		str+='<div class="panel panel-default panel-black m_top10">';
			str+='<div class="panel-heading">';
				str+='<h4 class="panel-title text-capital">'+dataArr+' Details</h4>';
			str+='</div>';
			str+='<div class="panel-body">';
			
			if(globalDivName == "Average Wage" || globalDivName == "Average Days of Employment" || globalDivName == "HH Completed 100 Days"){
				theadArr = [dataArr,'Target','Achievement','Achieved Percentage'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Target','Achievement','Achieved Percentage'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Target','Achievement','Achieved Percentage'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Target','Achievement','Achieved Percentage'];
			}else if(globalDivName == "Timely Payment"){
				theadArr = [dataArr,'Target Percentage','Achievement Percentage','Achieved Percentage'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Target Percentage','Achievement Percentage','Achieved Percentage'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Target Percentage','Achievement Percentage','Achieved Percentage'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Target','Achievement','Achieved Percentage'];
			}else if(globalDivName == "Agriculture Activities"){
				theadArr = [dataArr,'Total Expenditure','Expenditure on Agriculture & Allied Activities','Achievement Percentage'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Total Expenditure','Expenditure on Agriculture & Allied Activities','Achievement Percentage'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Total Expenditure','Expenditure on Agriculture & Allied Activities','Achievement Percentage'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Total Expenditure','Expenditure on Agriculture & Allied Activities','Achievement Percentage'];
			}else if(globalDivName == "Fish Drying Platforms" || globalDivName == "Fish Ponds" || globalDivName == "SMC Trench" || globalDivName == "Imp to CD" || globalDivName == "MPT_PT" || globalDivName == "GC Works" || globalDivName == "CD_CW"){
				theadArr = [dataArr,'Target','Sanctioned Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Sanctioned Percentage'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
			}else if(globalDivName == "Anganwadi"){
				theadArr = [dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','ICDS Exp','Total Exp'];
			}else if(globalDivName == "CC Roads1"){
				theadArr = [dataArr,'Target Length (in KMS)','Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','ACHIEVEMENT PERCENTAGE'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','ACHIEVEMENT PERCENTAGE'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','ACHIEVEMENT PERCENTAGE'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','ACHIEVEMENT PERCENTAGE'];
			}else if(globalDivName == "Horticulture"){
				theadArr = [dataArr,'Target(in Acres)','Sanctioned Area (in Acres)','Pitting  Area (in Acres)','Planting  Area (in Acres)','Pitting Perc','Achievement Percentage'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Target(in Acres)','Sanctioned Area (in Acres)','Pitting  Area (in Acres)','Planting  Area (in Acres)','Pitting Perc','Achievement Percentage'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Target(in Acres)','Sanctioned Area (in Acres)','Pitting  Area (in Acres)','Planting  Area (in Acres)','Pitting Perc','Achievement Percentage'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Target(in Acres)','Sanctioned Area (in Acres)','Pitting  Area (in Acres)','Planting  Area (in Acres)','Pitting Perc','Achievement Percentage'];
			}else if(globalDivName == "Avenue"){
				 theadArr = [dataArr,'Target','Sanctioned Area (in Kms)','Pitting  Area (in Kms)','Planting  Area (in Kms)','Pitting Percentage','Achievement Percentage'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Target','Sanctioned Area (in Kms)','Pitting  Area (in Kms)','Planting  Area (in Kms)','Pitting Percentage','Achievement Percentage'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Target','Sanctioned Area (in Kms)','Pitting  Area (in Kms)','Planting  Area (in Kms)','Pitting Percentage','Achievement Percentage'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Target','Sanctioned Area (in Kms)','Pitting  Area (in Kms)','Planting  Area (in Kms)','Pitting Percentage','Achievement Percentage'];
			}else if(globalDivName == "Nurseries"){
				theadArr = [dataArr,'Sanctioned Amount','Expenditure','Achieved Percentage'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Sanctioned Amount','Expenditure','Achieved Percentage'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Sanctioned Amount','Expenditure','Achieved Percentage'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Sanctioned Amount','Expenditure','Achieved Percentage'];
			}else if(globalDivName == "FAperformance"){
				theadArr = [dataArr,'Demand Collection(10)','D_Musters(10)','Labour Budget Achievement(40)','Rozger Divas(5)','Average Days Of Employement(15)','Average Wage Rate(15)','FladShip Programme Achievement(5)','Total Average(100)'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Demand Collection(10)','D_Musters(10)','Labour Budget Achievement(40)','Rozger Divas(5)','Average Days Of Employement(15)','Average Wage Rate(15)','FladShip Programme Achievement(5)','Total Average(100)'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Demand Collection(10)','D_Musters(10)','Labour Budget Achievement(40)','Rozger Divas(5)','Average Days Of Employement(15)','Average Wage Rate(15)','FladShip Programme Achievement(5)','Total Average(100)'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Demand Collection(10)','D_Musters(10)','Labour Budget Achievement(40)','Rozger Divas(5)','Average Days Of Employement(15)','Average Wage Rate(15)','FladShip Programme Achievement(5)','Total Average(100)'];
			}else if(globalDivName == "GH"){
				theadArr = [dataArr,'District Target(in Ha)','Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Achievement Percentage','Expenditure(in Lakhs)'];
			}else if(globalDivName == "UGDrainage"){
				theadArr = [dataArr,'Target Length (in KMS)','Sanctioned Estimate Cost','Sanctioned Length (in KMS)','Percentage of Sanctioned Length','Expenditure','Completed Length (in KMS)','Achv perc based on Sanc length','ACHIEVEMENT PERCENTAGE'];
				if(dataArr == "constituency")
					theadArr = ["district",dataArr,'Sanctioned Estimate Cost','Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','Achv perc based on Sanc length','ACHIEVEMENT PERCENTAGE'];
				else if(dataArr == "mandal")
					theadArr = ["district","constituency",dataArr,'Sanctioned Estimate Cost','Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','Achv perc based on Sanc length','ACHIEVEMENT PERCENTAGE'];
				else if(dataArr == "panchayat")
					theadArr = ["district","constituency","mandal",dataArr,'Sanctioned Estimate Cost','Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','Achv perc based on Sanc length','ACHIEVEMENT PERCENTAGE'];
			}else{
				if(globalDivName == "Farm Ponds" || globalDivName == "IHHL" || globalDivName == "Vermi Compost" || globalDivName == "Burial Ground" || globalDivName == "Solid Waste Management" || globalDivName == "Play fields" || globalDivName == "NTR 90 Days" || globalDivName == "Production of Bricks" || globalDivName == "Mulbery New" || globalDivName == "Silk worm New"){
					theadArr = [dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','MAterial Exp','Total Exp'];
					if(dataArr == "constituency")
						theadArr = ["district",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','MAterial Exp','Total Exp'];
					else if(dataArr == "mandal")
						theadArr = ["district","constituency",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','MAterial Exp','Total Exp'];
					else if(dataArr == "panchayat")
						theadArr = ["district","constituency","mandal",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','MAterial Exp','Total Exp'];
				}else if(globalDivName == 'Mandal buildings1' || globalDivName == 'GP Buildings1'){
					theadArr = [dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
					if(dataArr == "constituency")
						theadArr = ["district",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
					else if(dataArr == "mandal")
						theadArr = ["district","constituency",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
					else if(dataArr == "panchayat")
						theadArr = ["district","constituency","mandal",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','EGS Exp','CONVERGENCE Exp','Total Exp'];
				}else{
					theadArr = [dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
					if(dataArr == "constituency")
						theadArr = ["district",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
					else if(dataArr == "mandal")
						theadArr = ["district","constituency",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
					else if(dataArr == "panchayat")
						theadArr = ["district","constituency","mandal",dataArr,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				}
				
			}
				 
				str+='<div class="table-responsive">';
				if(globalDivName != 'Labour Budget'){
					str+='<div class="table-responsive">';
						str+='<table class="table table-bordered m_top10 dataTableClsDist">';
							str+='<thead>';
								str+='<tr>';
									for(var i in theadArr)
									{
										str+='<th class="text-capital">'+theadArr[i]+'</th>';
									}
								str+='</tr>';
							str+='</thead>';
						str+='<tbody>';
						
								for(var i in result.distList){
									if(globalDivName == "Average Wage" || globalDivName == "Average Days of Employment" || globalDivName == "HH Completed 100 Days" || globalDivName == "Timely Payment"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										str+='<td>'+result.distList[i].target+'</td>';
										str+='<td>'+result.distList[i].achivement+'</td>';
										
											if(result.distList[i].percentage >= 100){
												str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percentage+'</td>';
											}else if(result.distList[i].percentage >= 90 && result.distList[i].percentage < 100){
												str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percentage+'</td>';
											}else if(result.distList[i].percentage >= 60 && result.distList[i].percentage < 90){
												str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percentage+'</td>';
											}else{
												str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percentage+'</td>';
											}
											
										str+='</tr>';
									}else if(globalDivName == "Agriculture Activities"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										str+='<td>'+result.distList[i].targetPersonDays+'</td>';
										str+='<td>'+result.distList[i].argicultureExpenditure+'</td>';
										if(result.distList[i].achievement < 60){
											str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].achievement+'</td>';
										}else if(result.distList[i].achievement >= 65)
										{
											str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].achievement+'</td>';
										}else if(result.distList[i].achievement >= 60 && result.distList[i].achievement < 65)
										{
											str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].achievement+'</td>';
										}
									str+='</tr>';
									}else if(globalDivName == "Fish Drying Platforms" || globalDivName == "Fish Ponds" || globalDivName == "Anganwadi" || globalDivName == "SMC Trench" || globalDivName == "Imp to CD" || globalDivName == "MPT_PT" || globalDivName == "GC Works" || globalDivName == "CD_CW"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										str+='<td>'+result.distList[i].target+'</td>';
										if(dataArr == "district" && globalDivName != "Anganwadi"){
											str+='<td>'+result.distList[i].sanctionedTarget+'</td>';
										}
										str+='<td>'+result.distList[i].grounded+'</td>';
										var groundedPerc = '';
											groundedPerc = (result.distList[i].grounded/result.distList[i].target*100).toFixed(2);
										
										if(groundedPerc >= 100){
											str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
										}else if(groundedPerc >= 90 && groundedPerc < 100){
											str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
										}else if(groundedPerc >= 60 && groundedPerc < 90){
											str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
										}else{
											str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
										}
										str+='<td>'+result.distList[i].notGrounded+'</td>';
										str+='<td>'+result.distList[i].inProgress+'</td>';
										str+='<td>'+result.distList[i].completed+'</td>';
											
											if(result.distList[i].percentage >= 100){
												str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percentage+'</td>';
											}else if(result.distList[i].percentage >= 90 && result.distList[i].percentage < 100){
												str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percentage+'</td>';
											}else if(result.distList[i].percentage >= 60 && result.distList[i].percentage < 90){
												str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percentage+'</td>';
											}else{
												str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percentage+'</td>';
											}
											
										if(dataArr == "district" && globalDivName != "Anganwadi"){
											if(result.distList[i].percSant >= 100){
												str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percSant+'</td>';
											}else if(result.distList[i].percSant >= 90 && result.distList[i].percSant < 100){
												str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percSant+'</td>';
											}else if(result.distList[i].percSant >= 60 && result.distList[i].percSant < 90){
												str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percSant+'</td>';
											}else{
												str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percSant+'</td>';
											}
										}
										
										if(globalDivName == "Anganwadi"){
											str+='<td>'+result.distList[i].egsExpenditure+'</td>';
											str+='<td>'+result.distList[i].convergenceExpn+'</td>';
											str+='<td>'+result.distList[i].icdsExpenditure+'</td>';
											str+='<td>'+result.distList[i].totalExpenditure+'</td>';
										}
									str+='</tr>';
									}else if(globalDivName == "CC Roads1"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										if(dataArr == "district")
											str+='<td>'+result.distList[i].targetKMS+'</td>';
										str+='<td>'+result.distList[i].sanctionedKMS+'</td>';
										str+='<td>'+result.distList[i].expenditureAmount+'</td>';
										str+='<td>'+result.distList[i].completedKMS+'</td>';
										if(dataArr == "district"){
											if(result.distList[i].percentage >= 100){
												str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percentage+'</td>';
											}else if(result.distList[i].percentage >= 90 && result.distList[i].percentage < 100){
												str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percentage+'</td>';
											}else if(result.distList[i].percentage >= 60 && result.distList[i].percentage < 90){
												str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percentage+'</td>';
											}else{
												str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percentage+'</td>';
											}
										}
										else{
											if(result.distList[i].percSant >= 100){
												str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percSant+'</td>';
											}else if(result.distList[i].percSant >= 90 && result.distList[i].percSant < 100){
												str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percSant+'</td>';
											}else if(result.distList[i].percSant >= 60 && result.distList[i].percSant < 90){
												str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percSant+'</td>';
											}else{
												str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percSant+'</td>';
											}
										}
									str+='</tr>';
									}else if(globalDivName == "Horticulture"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										//str+='<td>'+result.distList[i].target+'</td>';
										str+='<td>'+result.distList[i].targetACRES+'</td>';
										str+='<td>'+result.distList[i].sanctionedACRES+'</td>';
										str+='<td>'+result.distList[i].pittingArea+'</td>';
										str+='<td>'+result.distList[i].plantingArea+'</td>';
											
											if(result.distList[i].targetPittingPerc >= 100){
												str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].targetPittingPerc+'</td>';
											}else if(result.distList[i].targetPittingPerc >= 90 && result.distList[i].targetPittingPerc < 100){
												str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].targetPittingPerc+'</td>';
											}else if(result.distList[i].targetPittingPerc >= 60 && result.distList[i].targetPittingPerc < 90){
												str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].targetPittingPerc+'</td>';
											}else{
												str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].targetPittingPerc+'</td>';
											}
											
											if(result.distList[i].targetPalnting >= 100){
												str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].targetPalnting+'</td>';
											}else if(result.distList[i].targetPalnting >= 90 && result.distList[i].targetPalnting < 100){
												str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].targetPalnting+'</td>';
											}else if(result.distList[i].targetPalnting >= 60 && result.distList[i].targetPalnting < 90){
												str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].targetPalnting+'</td>';
											}else{
												str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].targetPalnting+'</td>';
											}
										str+='</tr>';
									}else if(globalDivName == "Avenue"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										
											str+='<td>'+result.distList[i].targetKMS+'</td>';
											str+='<td>'+result.distList[i].sanctionedKMS+'</td>';
											
											str+='<td>'+result.distList[i].pittingKMS+'</td>';
											str+='<td>'+result.distList[i].plantingKMS+'</td>';
											
												if(result.distList[i].targetPittingPerc >= 100){
													str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].targetPittingPerc+'</td>';
												}else if(result.distList[i].targetPittingPerc >= 90 && result.distList[i].targetPittingPerc < 100){
													str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].targetPittingPerc+'</td>';
												}else if(result.distList[i].targetPittingPerc >= 60 && result.distList[i].targetPittingPerc < 90){
													str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].targetPittingPerc+'</td>';
												}else{
													str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].targetPittingPerc+'</td>';
												}
												if(result.distList[i].sanctionedPerc >= 100){
													str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].sanctionedPerc+'</td>';
												}else if(result.distList[i].sanctionedPerc >= 90 && result.distList[i].sanctionedPerc < 100){
													str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].sanctionedPerc+'</td>';
												}else if(result.distList[i].sanctionedPerc >= 60 && result.distList[i].sanctionedPerc < 90){
													str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].sanctionedPerc+'</td>';
												}else{
													str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].sanctionedPerc+'</td>';
												}
											str+='</tr>';
									}else if(globalDivName == "Nurseries"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										str+='<td>'+result.distList[i].targetPersonDays+'</td>';
										str+='<td>'+result.distList[i].completed+'</td>';
										
										if(result.distList[i].percentage >= 100){
											str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 90 && result.distList[i].percentage < 100){
											str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 60 && result.distList[i].percentage < 90){
											str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percentage+'</td>';
										}else{
											str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percentage+'</td>';
										}
									str+='</tr>';
									}else if(globalDivName == "FAperformance"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										str+='<td>'+result.distList[i].avgDmdMarks+'</td>';
										str+='<td>'+result.distList[i].avgDMusterMarks+'</td>';
										str+='<td>'+result.distList[i].avgLbMarks+'</td>';
										str+='<td>'+result.distList[i].avgRozgarDivasMarks+'</td>';
										str+='<td>'+result.distList[i].avgDaysMarks+'</td>';
										str+='<td>'+result.distList[i].avgAvgWageMarks+'</td>';
										str+='<td>'+result.distList[i].avgFlagshipMarks+'</td>';
										
										if(result.distList[i].percentage >= 100){
											str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 90 && result.distList[i].percentage < 100){
											str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 60 && result.distList[i].percentage < 90){
											str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percentage+'</td>';
										}else{
											str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percentage+'</td>';
										}
									str+='</tr>';
									}else if(globalDivName == "GH"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										if(dataArr == "district")
										str+='<td>'+result.distList[i].target+'</td>';
										str+='<td>'+result.distList[i].sanctionedTarget+'</td>';
										str+='<td>'+result.distList[i].pittingKMS+'</td>';
										str+='<td>'+result.distList[i].plantingKMS+'</td>';
										str+='<td>'+result.distList[i].totalExpenditure+'</td>';
										
										if(result.distList[i].percentage >= 100){
											str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 90 && result.distList[i].percentage < 100){
											str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 60 && result.distList[i].percentage < 90){
											str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percentage+'</td>';
										}else{
											str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percentage+'</td>';
										}
									str+='</tr>';
									}else if(globalDivName == "UGDrainage"){
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										if(dataArr == "district")
											str+='<td>'+result.distList[i].targetKMS+'</td>';
										str+='<td>'+result.distList[i].sanctionedAmount+'</td>';
										str+='<td>'+result.distList[i].sanctionedKMS+'</td>';
										if(dataArr == "district")
											str+='<td>'+result.distList[i].sanctionedPerventage+'</td>';
										str+='<td>'+result.distList[i].expenditureAmount+'</td>';
										str+='<td>'+result.distList[i].completedKMS+'</td>';
										
										if(result.distList[i].percSant >= 100){
											str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percSant+'</td>';
										}else if(result.distList[i].percSant >= 90 && result.distList[i].percSant < 100){
											str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percSant+'</td>';
										}else if(result.distList[i].percSant >= 60 && result.distList[i].percSant < 90){
											str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percSant+'</td>';
										}else{
											str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percSant+'</td>';
										}
										if(result.distList[i].percentage >= 100){
											str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 90 && result.distList[i].percentage < 100){
											str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 60 && result.distList[i].percentage < 90){
											str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percentage+'</td>';
										}else{
											str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percentage+'</td>';
										}
									str+='</tr>';
									}else{
										str+='<tr>';
										if(dataArr == "district"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
										}
										else if(dataArr == "constituency"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
										}
										else if(dataArr == "mandal"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
										}
										else if(dataArr == "panchayat"){
											str+='<td class="text-capital">'+result.distList[i].district+'</td>';
											str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
											str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
											str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
										}
										if(globalDivName == 'Mulbery New')
											str+='<td>'+result.distList[i].mulbTarget+'</td>';
										else if(globalDivName == 'OPGK-Perinnials' || globalDivName == 'OPGK-Annuals')
											str+='<td>'+result.distList[i].opgkTarget+'</td>';
										else
											str+='<td>'+result.distList[i].target+'</td>';
										//str+='<td>'+result.distList[i].target+'</td>';
										str+='<td>'+result.distList[i].grounded+'</td>';
										var groundedPerc = "0.00";
										 if(globalDivName == 'OPGK-Perinnials' || globalDivName == 'OPGK-Annuals'){
										var groundValue = result.distList[i].grounded;
										var targetValue = result.distList[i].opgkTarget;
										if(targetValue > 0 && groundValue > 0)
											groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
										}else if(globalDivName == 'Mulbery New'){
											var groundValue = result.distList[i].grounded;
											var targetValue = result.distList[i].mulbTarget;
											if(targetValue > 0 && groundValue > 0)
												groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
										}else{
											if(result.distList[i].target > 0 && result.distList[i].grounded > 0){
												groundedPerc = ((result.distList[i].grounded*100)/result.distList[i].target).toFixed(2);
											}
										}
										
										if(groundedPerc >= 100){
											str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
										}else if(groundedPerc >= 90 && groundedPerc < 100){
											str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
										}else if(groundedPerc >= 60 && groundedPerc < 90){
											str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
										}else{
											str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
										}
										str+='<td>'+result.distList[i].notGrounded+'</td>';
										if(globalDivName == 'Mulbery New')
											str+='<td>'+result.distList[i].mulbInprogress+'</td>';
										else if(globalDivName == 'OPGK-Perinnials' || globalDivName == 'OPGK-Annuals')
											str+='<td>'+result.distList[i].opgkInProgress+'</td>';
										else
											str+='<td>'+result.distList[i].inProgress+'</td>';
										if(globalDivName == 'Mulbery New')
											str+='<td>'+result.distList[i].mulbCompleted+'</td>';
										else
											str+='<td>'+result.distList[i].completed+'</td>';
										if(result.distList[i].percentage >= 100){
											str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 90 && result.distList[i].percentage < 100){
											str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].percentage+'</td>';
										}else if(result.distList[i].percentage >= 60 && result.distList[i].percentage < 90){
											str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].percentage+'</td>';
										}else{
											str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].percentage+'</td>';
										}
										if(globalDivName == "Farm Ponds" || globalDivName == "IHHL" || globalDivName == "Vermi Compost" || globalDivName == "Burial Ground" || globalDivName == "Solid Waste Management" || globalDivName == "Play fields" || globalDivName == "NTR 90 Days" || globalDivName == "Production of Bricks" || globalDivName == "Mulbery New" || globalDivName == "Silk worm New"){
											str+='<td>'+result.distList[i].wageExpenditure+'</td>';
											str+='<td>'+result.distList[i].materialExpenditure+'</td>';
											str+='<td>'+result.distList[i].totalExpenditure+'</td>';
										}
										
										if(globalDivName == 'Mandal buildings1' || globalDivName == 'GP Buildings1')
											{
												str+='<td>'+result.distList[i].egsExpenditure+'</td>';
												str+='<td>'+result.distList[i].convergenceExpn+'</td>';
												str+='<td>'+result.distList[i].totalExpenditure+'</td>';
											}
									str+='</tr>';
									}
								}
							str+='</tbody>';
						str+='</table>';
					str+='</div>';
				}
				else{
					theadArr = [dataArr,'Target Person days','Generated','Achievement Percentage','Wage Expanditure','Material Expenditure','Total Expenditure','Material Perc'];
					if(dataArr == "constituency")
						theadArr = ["district",dataArr,'Target Person days','Generated','Achievement Percentage','Wage Expanditure','Material Expenditure','Total Expenditure','Material Perc'];
					else if(dataArr == "mandal")
						theadArr = ["district","constituency",dataArr,'Target Person days','Generated','Achievement Percentage','Wage Expanditure','Material Expenditure','Total Expenditure','Material Perc'];
					else if(dataArr == "panchayat")
						theadArr = ["district","constituency","mandal",dataArr,'Target Person days','Generated','Achievement Percentage','Wage Expanditure','Material Expenditure','Total Expenditure','Material Perc'];
					str+='<div class="table-responsive">';
						str+='<table class="table table-bordered m_top10 dataTableClsDist">';
						str+='<thead>';
							str+='<tr>';
								for(var i in theadArr)
								{
									str+='<th class="text-capital">'+theadArr[i]+'</th>';
								}
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
					
						for(var i in result.distList){
							str+='<tr>';
								if(dataArr == "district"){
									str+='<td class="text-capital">'+result.distList[i].district+'</td>';
								}
								else if(dataArr == "constituency"){
									str+='<td class="text-capital">'+result.distList[i].district+'</td>';
									str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
								}
								else if(dataArr == "mandal"){
									str+='<td class="text-capital">'+result.distList[i].district+'</td>';
									str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
									str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
								}
								else if(dataArr == "panchayat"){
									str+='<td class="text-capital">'+result.distList[i].district+'</td>';
									str+='<td class="text-capital">'+result.distList[i].constituency+'</td>';
									str+='<td class="text-capital">'+result.distList[i].mandal+'</td>';
									str+='<td class="text-capital">'+result.distList[i].panchayat+'</td>';
								}
									
								str+='<td>'+result.distList[i].targetPersonDays+'</td>';
								str+='<td>'+result.distList[i].generatedPersonDays+'</td>';
								
									if(result.distList[i].perAppLB >= 100){
										str+='<td style="background-color:#f7b519;color:#fff">'+result.distList[i].perAppLB+'</td>';
									}else if(result.distList[i].perAppLB >= 90 && result.distList[i].perAppLB < 100){
										str+='<td style="background-color:#00AF50;color:#fff">'+result.distList[i].perAppLB+'</td>';
									}else if(result.distList[i].perAppLB >= 60 && result.distList[i].perAppLB < 90){
										str+='<td style="background-color:#ff6600;color:#fff">'+result.distList[i].perAppLB+'</td>';
									}else{
										str+='<td style="background-color:#FF0000;color:#fff">'+result.distList[i].perAppLB+'</td>';
									}
								str+='<td>'+result.distList[i].wageExpenditure+'</td>';
								str+='<td>'+result.distList[i].materialExpenditure+'</td>';
								str+='<td>'+result.distList[i].totalExpenditure+'</td>';
								str+='<td>'+result.distList[i].materialExpenditurePerc+'</td>';
							str+='</tr>';
						}
						str+='</tbody>';
						str+='</table>';
					str+='</div>';
					
				}
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	
	if(result.distConsCuntList != null && result.distConsCuntList.length > 0 )
	{
		str+='<div class="panel panel-default panel-black m_top10">';
			str+='<div class="panel-heading">';
				str+='<h4 class="panel-title text-capital">Constituencies in Districts</h4>';
			str+='</div>';
			str+='<div class="panel-body">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered m_top10 dataTableCls">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>District Name </th>';
								str+='<th style="color:red;">Constituencies In Red </th>';
								str+='<th style="color:orange;">Constituencies In Orange </th>';
								str+='<th style="color:green;">Constituencies In Green </th>';
								str+='<th style="color:gold;">Constituencies In Gold </th>';
								str+='<th>Total </th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						var redTotalCons = 0;
						var orangeTotalCons = 0;
						var greenTotalCons = 0;
						var goldTotalCons = 0;
						var totalConsiCons = 0;
							for(var i in result.distConsCuntList){
								redTotalCons = redTotalCons+result.distConsCuntList[i].constiInRed;
								orangeTotalCons = orangeTotalCons+result.distConsCuntList[i].constiInOrange;
								greenTotalCons = greenTotalCons+result.distConsCuntList[i].constiInGreen;
								goldTotalCons = goldTotalCons+result.distConsCuntList[i].constiInGold;
								totalConsiCons =redTotalCons+ orangeTotalCons+greenTotalCons;
								str+='<tr>';
									str+='<td>'+result.distConsCuntList[i].district+'</td>';
									str+='<td style="color:red;">'+result.distConsCuntList[i].constiInRed+'</td>';
									str+='<td style="color:orange;">'+result.distConsCuntList[i].constiInOrange+'</td>';
									str+='<td style="color:green;">'+result.distConsCuntList[i].constiInGreen+'</td>';
									str+='<td style="color:gold;">'+result.distConsCuntList[i].constiInGold+'</td>';
									str+='<td>'+result.distConsCuntList[i].total+'</td>';
								str+='</tr>';	
							}
							str+='<tr>';
								str+='<td>Total</td>';
								str+='<td>'+redTotalCons+'</td>';
								str+='<td>'+orangeTotalCons+'</td>';
								str+='<td>'+greenTotalCons+'</td>';
								str+='<td>'+goldTotalCons+'</td>';
								str+='<td>'+totalConsiCons+'</td>';
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	if(result.countList != null && result.countList.length > 0 )
	{
		var total = 0;
		str+='<div class="panel panel-default panel-black m_top10">';
			str+='<div class="panel-heading">';
				str+='<h4 class="panel-title text-capital">'+dataArr+'s in Districts</h4>';
			str+='</div>';
			str+='<div class="panel-body">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered m_top10 dataTableCls">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>District Name </th>';
								str+='<th>Count</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
							for(var i in result.countList){
								total = total +result.countList[i].count;
								str+='<tr>';
									str+='<td>'+result.countList[i].district+'</td>';
									str+='<td>'+result.countList[i].count+'</td>';
								str+='</tr>';	
							}
							str+='<tr>';
								str+='<td>Total</td>';
								str+='<td>'+total+'</td>';
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	
	if(result.consMandalList != null && result.consMandalList.length > 0 )
	{
		var total = 0;
		str+='<div class="panel panel-default panel-black m_top10">';
			str+='<div class="panel-heading">';
				str+='<h4 class="panel-title text-capital">'+dataArr+'s in Constitencies</h4>';
			str+='</div>';
			str+='<div class="panel-body">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered m_top10 dataTableCls">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Constituency Name </th>';
								str+='<th>Count</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
							for(var i in result.consMandalList){
								total = total +result.consMandalList[i].count;
								str+='<tr>';
									str+='<td>'+result.consMandalList[i].constituency+'</td>';
									str+='<td>'+result.consMandalList[i].count+'</td>';
								str+='</tr>';	
							}
							str+='<tr>';
								str+='<td>Total</td>';
								str+='<td>'+total+'</td>';
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	if(result.mandalVillageList != null && result.mandalVillageList.length > 0 )
	{
		var total = 0;
		str+='<div class="panel panel-default panel-black m_top10">';
			str+='<div class="panel-heading">';
				str+='<h4 class="panel-title text-capital">Panchayats in Mandals</h4>';
			str+='</div>';
			str+='<div class="panel-body">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered m_top10 dataTableCls">';
						str+='<thead>';
							str+='<tr>';
								str+='<th>Mandal Name </th>';
								str+='<th>Count</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
							for(var i in result.mandalVillageList){
								total = total +result.mandalVillageList[i].count;
								str+='<tr>';
									str+='<td>'+result.mandalVillageList[i].mandal+'</td>';
									str+='<td>'+result.mandalVillageList[i].count+'</td>';
								str+='</tr>';	
							}
							str+='<tr>';
								str+='<td>Total</td>';
								str+='<td>'+total+'</td>';
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	if(result.distMandalCuntList != null && result.distMandalCuntList.length > 0 )
	{
		str+='<div class="panel panel-default panel-black m_top10">';
			str+='<div class="panel-heading">';
				str+='<h4 class="panel-title text-capital">Mandals in '+dataArr+'s</h4>';
			str+='</div>';
			str+='<div class="panel-body">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered m_top10 dataTableCls">';
						str+='<thead class="text-capital">';
							str+='<tr>';
								str+='<th>'+dataArr+'</th>';
								str+='<th style="color:red;">Mandals In Red </th>';
								str+='<th style="color:orange;">Mandals In Orange </th>';
								str+='<th style="color:green;">Mandals In Green </th>';
								str+='<th style="color:gold;">Mandals In Gold </th>';
								str+='<th>Total </th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						redTotalCons = 0;
						orangeTotalCons = 0;
						greenTotalCons = 0;
						goldTotalCons = 0;
						totalConsiCons = 0;
							for(var i in result.distMandalCuntList){
								redTotalCons = redTotalCons+result.distMandalCuntList[i].mandalsInRed;
								orangeTotalCons = orangeTotalCons+result.distMandalCuntList[i].mandalsInOrange;
								greenTotalCons = greenTotalCons+result.distMandalCuntList[i].mandalsInGreen;
								goldTotalCons = goldTotalCons+result.distMandalCuntList[i].mandalsInGold;
								totalConsiCons =redTotalCons+ orangeTotalCons+greenTotalCons;
								str+='<tr>';
									str+='<td>'+result.distMandalCuntList[i].district+'</td>';
									str+='<td style="color:red;">'+result.distMandalCuntList[i].mandalsInRed+'</td>';
									str+='<td style="color:orange;">'+result.distMandalCuntList[i].mandalsInOrange+'</td>';
									str+='<td style="color:green;">'+result.distMandalCuntList[i].mandalsInGreen+'</td>';
									str+='<td style="color:green;">'+result.distMandalCuntList[i].mandalsInGold+'</td>';
									str+='<td>'+result.distMandalCuntList[i].total+'</td>';
								str+='</tr>';	
							}
							str+='<tr>';
								str+='<td>Total</td>';
								str+='<td>'+redTotalCons+'</td>';
								str+='<td>'+orangeTotalCons+'</td>';
								str+='<td>'+greenTotalCons+'</td>';
								str+='<td>'+goldTotalCons+'</td>';
								str+='<td>'+totalConsiCons+'</td>';
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	if(result.distMandalList != null && result.distMandalList.length > 0 )
	{
		str+='<div class="panel panel-default panel-black m_top10">';
			str+='<div class="panel-heading">';
				str+='<h4 class="panel-title text-capital">Villages in '+dataArr+'s</h4>';
			str+='</div>';
			str+='<div class="panel-body">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered m_top10 dataTableCls">';
						str+='<thead class="text-capital">';
							str+='<tr>';
								str+='<th>'+dataArr+'</th>';
								str+='<th style="color:red;">Villages In Red </th>';
								str+='<th style="color:orange;">Villages In Orange </th>';
								str+='<th style="color:green;">Villages In Green </th>';
								str+='<th style="color:gold;">Villages In Gold </th>';
								str+='<th>Total </th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						redTotalCons = 0;
						orangeTotalCons = 0;
						greenTotalCons = 0;
						goldTotalCons = 0;
						totalConsiCons = 0;
							for(var i in result.distMandalList){
								redTotalCons = redTotalCons+result.distMandalList[i].villagesInRed;
								orangeTotalCons = orangeTotalCons+result.distMandalList[i].villagesInOrange;
								greenTotalCons = greenTotalCons+result.distMandalList[i].villagesInGreen;
								goldTotalCons = goldTotalCons+result.distMandalList[i].villagesInGold;
								totalConsiCons =redTotalCons+ orangeTotalCons+greenTotalCons;
								str+='<tr>';
									str+='<td>'+result.distMandalList[i].district+'</td>';
									str+='<td style="color:red;">'+result.distMandalList[i].villagesInRed+'</td>';
									str+='<td style="color:orange;">'+result.distMandalList[i].villagesInOrange+'</td>';
									str+='<td style="color:green;">'+result.distMandalList[i].villagesInGreen+'</td>';
									str+='<td style="color:green;">'+result.distMandalList[i].villagesInGold+'</td>';
									str+='<td>'+result.distMandalList[i].total+'</td>';
								str+='</tr>';	
							}
							str+='<tr>';
								str+='<td>Total</td>';
								str+='<td>'+redTotalCons+'</td>';
								str+='<td>'+orangeTotalCons+'</td>';
								str+='<td>'+greenTotalCons+'</td>';
								str+='<td>'+goldTotalCons+'</td>';
								str+='<td>'+totalConsiCons+'</td>';
							str+='</tr>';
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	$("#nregsConsitenBodyId").html(str);
	$(".dataTableCls").dataTable({
		"order": [[ 1, "asc" ]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF',
				orientation: "landscape",
				pageSize:'A3',
				customize: function (doc) {
					doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				}
			}
		]
	});
	$(".dataTableClsDist").dataTable({
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV'
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF',
				orientation: "landscape",
				pageSize:'A3',
				customize: function (doc) {
					doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				}
			}
		]
	});
	
}

function getNREGSConsCuntData(locationType,type,globalDivName,menuLocationType,menuLocationId)
{
	$("#nregsConsitenBodyId").html(spinner);
	var districtId = $("#selectedName").attr("attr_distId");
	if(typeof globalTimelyPaymentType === undefined  || typeof globalTimelyPaymentType == "undefined"){
		globalTimelyPaymentType = "-1";
	}
	if(globalDivName == 'FAperformance'){
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : '2017-05-30',
			locationType: menuLocationType,
			divType : globalDivName,
			type  : type,
			locationId : menuLocationId,
			sublocaType : locationType,
			districtId:districtId
		}
	}else if(globalDivName == 'Farm Ponds'){
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			type  : type,
			locationId : menuLocationId,
			sublocaType : locationType,
			districtId:districtId,
			program : "-1"
		}
	}else if(globalDivName == 'Timely Payment'){
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			type  : type,
			locationId : menuLocationId,
			sublocaType : locationType,
			districtId : districtId,
			program: globalTimelyPaymentType
		}
	}else{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			type  : type,
			locationId : menuLocationId,
			sublocaType : locationType,
			districtId:districtId
		}
	}
	
	$.ajax({
		url: 'getMGNregsDistrWiseCount',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildDistrictsPopupDetails(ajaxresp,locationType)
		}
	});
}

$(document).on("click",".detailsCls",function(){
	var locationType = $(this).attr("attr_location");
	var type = $(this).attr("attr_type");
	var heading = $(this).html();
	var menuLocationType = $(this).attr("attr_menuLocationType");
	var menuLocationId = $(this).attr("attr_menuLocationId");
	$("#modalHeadingDivId").html(heading);
	getNREGSConsCuntData(locationType,type,globalDivName,menuLocationType,menuLocationId);
});

$(document).on("click",".overviewPopupCls",function(){
	var locationType = $(this).attr("attr_locationType");
	var type = $(this).attr("attr_type");
	var heading = $(this).html();
	$("#nregsConsitenModalId").modal("show");
	$("#modalHeadingDivId").html(heading);
	var menuLocationType = $(this).attr("attr_menuLocationType");
	var menuLocationId = $(this).attr("attr_menuLocationId");
	if(globalDivName == 'Labour Budget')
		getLabourBudgetClickingOverview(menuLocationType,menuLocationId);
	else if(globalDivName == 'Raising and Maintenance of Block Plantations' || globalDivName == 'Raising and Maintenance of nurseries' || globalDivName == 'Soil and Moisture Conservation Works' || globalDivName == 'Raising and Maintenance of Avenue plantations')
		getNregasForestPopUpOverview(menuLocationType,menuLocationId)
	else
		getNregasPopupOverview(menuLocationType,menuLocationId);
	getNREGSConsCuntData(locationType,type,globalDivName,menuLocationType,menuLocationId);
});

//PopupOverview clicking Block 
function buildPopupOverviewBlock(result,menuLocationType,menuLocationId){
	var str1='';
	str1+='<div class="table-responsive">';
		str1+='<table class="table table-bordered m_top10" >';
			str1+='<tbody>';
				str1+='<tr>';
					str1+='<td>';
						str1+='<div class="col-sm-9">';
							str1+='<div class="media">';
								str1+='<h4 attr_location="district" attr_type="total">Total Districts : '+result.totalDistricts+'</h4>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
								if(result.districtsInRed != null && result.districtsInRed > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="district" attr_type="red">Districts in Red : '+result.districtsInRed+'</p>';
								else
									str1+='<p class="media-body" attr_location="district" attr_type="red">Districts in Red : '+result.districtsInRed+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
								if(result.districtsInOrange != null && result.districtsInOrange > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="district" attr_type="orange">Districts in Orange : '+result.districtsInOrange+'</p>';
								else
									str1+='<p class="media-body" attr_location="district" attr_type="orange">Districts in Orange : '+result.districtsInOrange+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
								if(result.districtsInGreen != null && result.districtsInGreen > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="district" attr_type="green">Districts in Green : '+result.districtsInGreen+'</p>';
								else
									str1+='<p class="media-body" attr_location="district" attr_type="green">Districts in Green : '+result.districtsInGreen+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
								if(result.districtsInGold != null && result.districtsInGold > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="district" attr_type="gold">Districts in Gold : '+result.districtsInGold+'</p>';
								else
									str1+='<p class="media-body" attr_location="district" attr_type="green">Districts in Gold : '+result.districtsInGold+'</p>';
							str1+='</div>';
						str1+='</div>';
					str1+='</td>';
					str1+='<td>';
						str1+='<div class="col-sm-9">';
							str1+='<div class="media">';
								str1+='<h4 attr_location="constituency" attr_type="total">Total Constituencies : '+result.totalConstituencies+'</h4>';
							str1+='</div>';
							str1+='<div class="media">';
							str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
							if(result.constituenciesInRed != null && result.constituenciesInRed > 0)
								str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="constituency" attr_type="red">Constituencies in Red : '+result.constituenciesInRed+'</p>';
							else
								str1+='<p class="media-body" attr_location="constituency" attr_type="red">Constituencies in Red : '+result.constituenciesInRed+'</p>';
								str1+='</div>';
							str1+='<div class="media">';
							str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
							if(result.constituenciesInOrange != null && result.constituenciesInOrange > 0)
								str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="constituency" attr_type="orange">Constituencies in Orange : '+result.constituenciesInOrange+'</p>';
							else
								str1+='<p class="media-body" attr_location="constituency" attr_type="orange">Constituencies in Orange : '+result.constituenciesInOrange+'</p>';
								str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
								if(result.constituenciesInGreen != null && result.constituenciesInGreen > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="constituency" attr_type="green">Constituencies in Green : '+result.constituenciesInGreen+'</p>';
								else
									str1+='<p class="media-body" attr_location="constituency" attr_type="green">Constituencies in Green : '+result.constituenciesInGreen+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
								if(result.constituenciesInGold != null && result.constituenciesInGold > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="constituency" attr_type="gold">Constituencies in Gold : '+result.constituenciesInGold+'</p>';
								else
									str1+='<p class="media-body" attr_location="constituency" attr_type="green">Constituencies in Gold : '+result.constituenciesInGold+'</p>';
							str1+='</div>';
						str1+='</div>';	
					str1+='</td>';
					str1+='<td>';
						str1+='<div class="col-sm-9">';
							str1+='<div class="media">';
								str1+='<h4 attr_location="mandal" attr_type="total">Total Mandals : '+result.totalMandals+'</h4>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
								if(result.mandalsInRed != null && result.mandalsInRed > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="mandal" attr_type="red">Mandals in Red : '+result.mandalsInRed+'</p>';
								else
									str1+='<p class="media-body" attr_location="mandal" attr_type="red">Mandals in Red : '+result.mandalsInRed+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
								if(result.mandalsInOrange != null && result.mandalsInOrange > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="mandal" attr_type="orange">Mandals in Orange : '+result.mandalsInOrange+'</p>';
								else
									str1+='<p class="media-body" attr_location="mandal" attr_type="orange">Mandals in Orange : '+result.mandalsInOrange+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
								if(result.mandalsInGreen != null && result.mandalsInGreen > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="mandal" attr_type="green">Mandals in Green : '+result.mandalsInGreen+'</p>';
								else
									str1+='<p class="media-body" attr_location="mandal" attr_type="green">Mandals in Green : '+result.mandalsInGreen+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
								if(result.mandalsInGold != null && result.mandalsInGold > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="mandal" attr_type="gold">Mandals in Gold : '+result.mandalsInGold+'</p>';
								else
									str1+='<p class="media-body" attr_location="mandal" attr_type="green">Mandals in Gold : '+result.mandalsInGold+'</p>';
							str1+='</div>';
						str1+='</div>';	
					str1+='</td>';
					if(globalDivName != null && globalDivName == "Mandal buildings1"){
						str1+='<td>';
						str1+='<div class="col-sm-9">';
							str1+='<div class="media">';
								str1+='<h4>Total Villages : '+result.totalVillages+'</h4>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
									str1+='<p class="media-body" attr_location="panchayat" attr_type="red">Villages in Red : '+result.villagesInRed+'</p>';
							str1+='</div>';
							str1+=' <div class="media">';
							   str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
								str1+='<p class="media-body " attr_location="panchayat" attr_type="orange">Villages in Orange : '+result.villagesInOrange+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
									str1+='<p class="media-body" attr_location="panchayat" attr_type="green">Villages in Green : '+result.villagesInGreen+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
									str1+='<p class="media-body" attr_location="panchayat" attr_type="green">Villages in Gold : '+result.villagesInGold+'</p>';
							str1+='</div>';
						str1+='</div>';	
					str1+='</td>';
					}else{
						str1+='<td>';
						str1+='<div class="col-sm-9">';
							str1+='<div class="media">';
								str1+='<h4>Total Villages : '+result.totalVillages+'</h4>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
								if(result.villagesInRed != null && result.villagesInRed > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="panchayat" attr_type="red">Villages in Red : '+result.villagesInRed+'</p>';
								else
									str1+='<p class="media-body" attr_location="panchayat" attr_type="red">Villages in Red : '+result.villagesInRed+'</p>';
							str1+='</div>';
							str1+=' <div class="media">';
							   str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
							   if(result.villagesInOrange != null && result.villagesInOrange > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="panchayat" attr_type="orange">Villages in Orange : '+result.villagesInOrange+'</p>';
								else
									str1+='<p class="media-body " attr_location="panchayat" attr_type="orange">Villages in Orange : '+result.villagesInOrange+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
								if(result.villagesInGreen != null && result.villagesInGreen > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="panchayat" attr_type="green">Villages in Green : '+result.villagesInGreen+'</p>';
								else
									str1+='<p class="media-body" attr_location="panchayat" attr_type="green">Villages in Green : '+result.villagesInGreen+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Gold.png"></p>';
								if(result.villagesInGold != null && result.villagesInGold > 0)
									str1+='<p class="media-body detailsCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_location="panchayat" attr_type="gold">Villages in Gold : '+result.villagesInGold+'</p>';
								else
									str1+='<p class="media-body" attr_location="panchayat" attr_type="green">Villages in Gold : '+result.villagesInGold+'</p>';
							str1+='</div>';
						str1+='</div>';	
					str1+='</td>';
					}
					
				str1+='</tr>';
			str1+='</tbody>';
		str1+='</table>';
	str1+='</div>';
	$("#nregsOverviewBodyId").html(str1);
	
} 

function getLabourBudgetClickingOverview(menuLocationType,menuLocationId)
{
	$("#nregsOverviewBodyId").html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
        toDate : glEndDate,
        locationType : menuLocationType,
        locationId : menuLocationId
	}
	$.ajax({
		url: 'getLabourBudgetOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildPopupOverviewBlock(ajaxresp,menuLocationType,menuLocationId);
		}
	});
}

function getNregaLevelsWiseDataForFAPerformance(divIdd,locationTypeNew,menuLocationType,menuLocationId,blockName)
{
	$("#"+divIdd).html(spinner);
	var districtId = $("#selectedName").attr("attr_distid");
	var theadArr = [locationTypeNew,'Demand Collection(10)','D_Musters(10)','Labour Budget Achievement(40)','Rozgar Divas(5)','Average Days Of Employment(15)','Average Wage Rate(15)','FlagShip Programme Achievement(5)','Total Average(100)'];
	if(locationTypeNew == "constituency")
		theadArr = ["district",locationTypeNew,'Demand Collection(10)','D_Musters(10)','Labour Budget Achievement(40)','Rozgar Divas(5)','Average Days Of Employment(15)','Average Wage Rate(15)','FlagShip Programme Achievement(5)','Total Average(100)'];
	else if(locationTypeNew == "mandal")
		theadArr = ["district","constituency",locationTypeNew,'Demand Collection(10)','D_Musters(10)','Labour Budget Achievement(40)','Rozgar Divas(5)','Average Days Of Employment(15)','Average Wage Rate(15)','FlagShip Programme Achievement(5)','Total Average(100)'];
	else if(locationTypeNew == "panchayat")
		theadArr = ["district","constituency","mandal",locationTypeNew,'Demand Collection(10)','D_Musters(10)','Labour Budget Achievement(40)','Rozgar Divas(5)','Average Days Of Employment(15)','Average Wage Rate(15)','FlagShip Programme Achievement(5)','Total Average(100)'];
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate 	: glEndDate,//glEndDate,'2017-05-30'
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocaType : locationTypeNew,
		districtId:districtId
	}
	$.ajax({
		url: 'getNregaLevelsWiseDataForFAPerformance',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationTypeNew == "state"){
							str+='<td class="text-capitalize">'+ajaxresp[i].state+'</td>';
						}
						else if(locationTypeNew == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationTypeNew == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationTypeNew == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationTypeNew == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						str+='<td>'+ajaxresp[i].avgDmdMarks+'</td>';
						str+='<td>'+ajaxresp[i].avgDMusterMarks+'</td>';
						str+='<td>'+ajaxresp[i].avgLbMarks+'</td>';
						str+='<td>'+ajaxresp[i].avgRozgarDivasMarks+'</td>';
						str+='<td>'+ajaxresp[i].avgDaysMarks+'</td>';
						str+='<td>'+ajaxresp[i].avgAvgWageMarks+'</td>';
						str+='<td>'+ajaxresp[i].avgFlagshipMarks+'</td>';
						if(ajaxresp[i].avgTotMarks >= 100){
							str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].avgTotMarks+'</td>';
						}else if(ajaxresp[i].avgTotMarks >= 90 && ajaxresp[i].avgTotMarks < 100){
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].avgTotMarks+'</td>';
						}else if(ajaxresp[i].avgTotMarks >= 60 && ajaxresp[i].avgTotMarks < 90){
							str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].avgTotMarks+'</td>';
						}else{
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].avgTotMarks+'</td>';
						}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationTypeNew,blockName);
		}
	});
}
function getNregaLevelsWiseData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId)
{
	$("#"+divIdd).html(spinner);
	if(globalDivName == "Solid Waste Management"){	
		if(globalFinancialYear == "2018"){
			if(locationTypeNew == "district" || locationTypeNew == "state")
			{
				theadArr = [locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','OverAll Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}
			if(locationTypeNew == "constituency")
			{
				theadArr = ["district",locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','OverAll Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}else if(locationTypeNew == "mandal"){
				theadArr = ["district","constituency",locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','OverAll Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}else if(locationTypeNew == "panchayat"){
				theadArr = ["district","constituency","mandal",locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','OverAll Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}else{
				theadArr = [locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','OverAll Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}
		}else{
			if(locationTypeNew == "district" || locationTypeNew == "state")
			{
				theadArr = [locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}
			if(locationTypeNew == "constituency")
			{
				theadArr = ["district",locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}else if(locationTypeNew == "mandal"){
				theadArr = ["district","constituency",locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}else if(locationTypeNew == "panchayat"){
				theadArr = ["district","constituency","mandal",locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}else{
				theadArr = [locationTypeNew,'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage','Wage Exp','Material Exp','Total Exp'];
			}
		}
	}
	if(globalDivName == "Farm Ponds"){
	var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			locationId : menuLocationId,
			sublocaType : locationTypeNew,
			districtId:districtId,
			program : "-1"
		}
	}else{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			locationId : menuLocationId,
			sublocaType : locationTypeNew,
			districtId:districtId
		}
	}
	
	$.ajax({
		url: 'getNregaLevelsWiseData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationTypeNew == "state"){
							str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
						}
						else if(locationTypeNew == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationTypeNew == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationTypeNew == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationTypeNew == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						if(globalDivName == 'GH'){
							if(locationTypeNew == 'state' || locationTypeNew == 'district')
								{
									str+='<td>'+ajaxresp[i].target+'</td>';
								}
								str+='<td>'+ajaxresp[i].sanctionedTarget+'</td>';
								str+='<td>'+ajaxresp[i].pittingKMS+'</td>';
								str+='<td>'+ajaxresp[i].plantingKMS+'</td>';
								
								if(ajaxresp[i].percentage >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
								}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
								}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
								}
								str+='<td>'+ajaxresp[i].totalExpenditure+'</td>';
						}else{
							if(globalDivName == 'Mulbery New' || globalDivName == 'Silk worm New')
							{
								str+='<td>'+ajaxresp[i].mulbTarget+'</td>';
							}
							else if(globalDivName == 'OPGK-Perinnials' || globalDivName == 'OPGK-Annuals')
							{
								str+='<td>'+ajaxresp[i].opgkTarget+'</td>';
							}else
							{
								str+='<td>'+ajaxresp[i].target+'</td>';
							}
							if((globalDivName == 'Cattle Drinking Water Troughs' || globalDivName == 'Raising of Perinnial Fodders') && locationTypeNew == "state"){
								str+='<td>'+ajaxresp[i].sanctionedTarget+'</td>';
							}
							if((globalDivName == 'Fish Ponds' || globalDivName == 'Fish Drying Platforms' || globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW') && (locationTypeNew == "state" || locationTypeNew == "district")){
								str+='<td>'+ajaxresp[i].sanctionedTarget+'</td>';
							}
							
							str+='<td>'+ajaxresp[i].grounded+'</td>';
							
							if((globalDivName == 'Cattle Drinking Water Troughs' || globalDivName == 'Raising of Perinnial Fodders') && locationTypeNew == "state"){
								var groundedPerc = "0.00";
								if(ajaxresp[i].target > 0 && ajaxresp[i].grounded > 0){
									groundedPerc = ((ajaxresp[i].grounded*100)/ajaxresp[i].target).toFixed(2);
								}
								
								if(groundedPerc >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 90 && groundedPerc < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 60 && groundedPerc < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
								}
							}else if((globalDivName == 'Fish Ponds' || globalDivName == 'Fish Drying Platforms' || globalDivName == 'Anganwadi' || globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW') && (locationTypeNew == "state" || locationTypeNew == "district")){
								var groundedPerc = "0.00";
								if(ajaxresp[i].target > 0 && ajaxresp[i].grounded > 0)
									groundedPerc = ((ajaxresp[i].grounded*100)/ajaxresp[i].target).toFixed(2);
								
								if(groundedPerc >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 90 && groundedPerc < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 60 && groundedPerc < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
								}
							}else if(globalDivName == 'OPGK-Perinnials' || globalDivName == 'OPGK-Annuals'){
								var groundValue = ajaxresp[i].grounded;
								var targetValue = ajaxresp[i].opgkTarget;
								var groundedPerc = "0.00";
								if(targetValue > 0 && groundValue > 0)
									groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
								
								if(groundedPerc >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 90 && groundedPerc < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 60 && groundedPerc < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
								}
							}else if(globalDivName == 'Mulbery New' || globalDivName == 'Silk worm New'){
								var groundValue = ajaxresp[i].grounded;
								var targetValue = ajaxresp[i].mulbTarget;
								var groundedPerc = "0.00";
								if(targetValue > 0 && groundValue > 0)
									groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
								
								if(groundedPerc >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 90 && groundedPerc < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 60 && groundedPerc < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
								}
							}else{
								var groundValue = ajaxresp[i].grounded;
								var targetValue = ajaxresp[i].target;
								var groundedPerc = "0.00";
								if(targetValue > 0 && groundValue > 0)
									groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
								
								if(groundedPerc >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 90 && groundedPerc < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 60 && groundedPerc < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
								}
							}
							str+='<td>'+ajaxresp[i].notGrounded+'</td>';
							if(globalDivName == 'Mulbery New')
								str+='<td>'+ajaxresp[i].mulbInprogress+'</td>';
							else if(globalDivName == 'OPGK-Perinnials' || globalDivName == 'OPGK-Annuals')
								str+='<td>'+ajaxresp[i].opgkInProgress+'</td>';
							else
								str+='<td>'+ajaxresp[i].inProgress+'</td>';
							if(globalDivName == 'Mulbery New')
								str+='<td>'+ajaxresp[i].mulbCompleted+'</td>';
							else
								str+='<td>'+ajaxresp[i].completed+'</td>';
							if(globalDivName == 'Solid Waste Management')
							{
								if(globalFinancialYear == "2018")
									str+='<td>'+ajaxresp[i].overAllCompleted+'</td>';
							}
							if((globalDivName == 'Cattle Drinking Water Troughs' || globalDivName == 'Raising of Perinnial Fodders') && locationTypeNew == "state"){
								
								if(ajaxresp[i].sanctionedPerc >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].sanctionedPerc+'</td>';
								}else if(ajaxresp[i].sanctionedPerc >= 90 && ajaxresp[i].sanctionedPerc < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].sanctionedPerc+'</td>';
								}else if(ajaxresp[i].sanctionedPerc >= 60 && ajaxresp[i].sanctionedPerc < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].sanctionedPerc+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].sanctionedPerc+'</td>';
								}
							}
							if(ajaxresp[i].percentage >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
							if((globalDivName == 'Fish Ponds' || globalDivName == 'Fish Drying Platforms' || globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW') && (locationTypeNew == "state" || locationTypeNew == "district")){
								
								if(ajaxresp[i].percSant >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else if(ajaxresp[i].percSant >= 90 && ajaxresp[i].percSant < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else if(ajaxresp[i].percSant >= 60 && ajaxresp[i].percSant < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}
							}
							if(globalDivName == 'Farm Ponds' || globalDivName == 'IHHL' || globalDivName == 'Vermi Compost' || globalDivName == 'Burial Ground' || globalDivName == 'Solid Waste Management' || globalDivName == 'Play fields' || globalDivName == 'NTR 90 Days' || globalDivName == 'Production of Bricks' || globalDivName == 'Mulbery New' || globalDivName == 'Silk worm New')
							{
								str+='<td>'+ajaxresp[i].wageExpenditure+'</td>';
								str+='<td>'+ajaxresp[i].materialExpenditure+'</td>';
								str+='<td>'+ajaxresp[i].totalExpenditure+'</td>';
							}
							
							if(globalDivName == 'Mandal buildings1' || globalDivName == 'GP Buildings1' || globalDivName == 'Anganwadi')
							{
								str+='<td>'+ajaxresp[i].egsExpenditure+'</td>';
								str+='<td>'+ajaxresp[i].convergenceExpn+'</td>';
								if(globalDivName == 'Anganwadi')
									str+='<td>'+ajaxresp[i].icdsExpenditure+'</td>';
								str+='<td>'+ajaxresp[i].totalExpenditure+'</td>';
							}
						}
						
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationTypeNew,blockName);
		}
	});
}

function getNregasOverview(projectDivId,menuLocationType,menuLocationId,districtId,programId)
{
	$("#projectOvervw"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(spinner);
	if(projectDivId == 'FAperformance')
	{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : '2017-05-30',
			divType : globalDivName,
			locationType : menuLocationType,
			locationId : menuLocationId,
			districtId:districtId
		}
	}else if(projectDivId == 'Timely Payment'){
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
		    toDate : glEndDate,
			divType : globalDivName,
			locationType : menuLocationType,
			locationId : menuLocationId,
			districtId:districtId,
			program : programId
		}
	}else{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
	        toDate : glEndDate,
			divType : globalDivName,
			locationType : menuLocationType,
			locationId : menuLocationId,
			districtId:districtId
		}
	}
	
	$.ajax({
		url: 'getNregasOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNregasOverViewBlock(ajaxresp,projectDivId,menuLocationType,menuLocationId);
		}
	});
}

function getNregasForestOverview(projectDivId,menuLocationType,menuLocationId,districtId,programId)
{
	var districtId = $("#selectedName").attr("attr_distId");
	$("#projectOvervw"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(spinner);
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType : menuLocationType,
		locationId : menuLocationId,
		districtId:districtId,
		category : projectDivId
	}
	
	$.ajax({
		url: 'getNregasForestOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNregasOverViewBlock(ajaxresp,projectDivId,menuLocationType,menuLocationId);
		}
	});
}

function getNregasPopupOverview(menuLocationType,menuLocationId)
{
	var districtId = $("#selectedName").attr("attr_distId");
	$("#nregsOverviewBodyId").html(spinner);
	if(typeof globalTimelyPaymentType === undefined  || typeof globalTimelyPaymentType == "undefined"){
		globalTimelyPaymentType = "-1";
	}
	if(globalDivName == 'FAperformance')
	{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : '2017-05-30',
			divType : globalDivName,
			locationType : menuLocationType,
			locationId : menuLocationId,
			districtId:districtId
		}
	}else if(globalDivName == 'Timely Payment'){
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
		    toDate : glEndDate,
			divType : globalDivName,
			locationType : menuLocationType,
			locationId : menuLocationId,
			districtId:districtId,
			program : globalTimelyPaymentType
		}
	}else{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			divType : globalDivName,
			locationType : menuLocationType,
			locationId : menuLocationId,
			districtId:districtId
		}
	}
	
	$.ajax({
		url: 'getNregasOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildPopupOverviewBlock(ajaxresp,menuLocationType,menuLocationId);
		}
	});
}

function getNregaLevelsWiseDataFrNewCalls(divIdd,locationType,menuLocationType,menuLocationId,divId,programId)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#"+divIdd).html(spinner);
	var theadArr = [locationType,'Sanctioned Amount','Expenditure','Achieved Percentage'];
	if( divId == 'Average Wage'){
			theadArr = [locationType,'Target Average Wage','Achieved','Average Wage Percentage'];
			if(locationType == "constituency")
				theadArr = ["district",locationType,'Target Average Wage','Achieved','Average Wage Percentage'];
			else if(locationType == "mandal")
				theadArr = ["district","constituency",locationType,'Target Average Wage','Achieved','Average Wage Percentage'];
			else if(locationType == "panchayat")
				theadArr = ["district","constituency","mandal",locationType,'Target Average Wage','Achieved','Average Wage Percentage'];
	}else if( divId == 'Average Days of Employment'){
			theadArr = [locationType,'Target Average Days of Employment','Achieved','Achieved Percentage'];
			if(locationType == "constituency")
				theadArr = ["district",locationType,'Target Average Days of Employment','Achieved','Achieved Percentage'];
			else if(locationType == "mandal")
				theadArr = ["district","constituency",locationType,'Target Average Days of Employment','Achieved','Achieved Percentage'];
			else if(locationType == "panchayat")
				theadArr = ["district","constituency","mandal",locationType,'Target Average Days of Employment','Achieved','Achieved Percentage'];
	}else if( divId == 'HH Completed 100 Days'){
			theadArr = [locationType,'Target HH Completed 100 Days','Achieved','Achieved Percentage'];
			if(locationType == "constituency")
				theadArr = ["district",locationType,'Target HH Completed 100 Days','Achieved','Achieved Percentage'];
			else if(locationType == "mandal")
				theadArr = ["district","constituency",locationType,'Target HH Completed 100 Days','Achieved','Achieved Percentage'];
			else if(locationType == "panchayat")
				theadArr = ["district","constituency","mandal",locationType,'Target HH Completed 100 Days','Achieved','Achieved Percentage'];
	 }else if(divId == 'Timely Payment'){
			theadArr = [locationType,'Target Percentage','Achievement Percentage','Achieved Percentage'];
			if(locationType == "constituency")
				theadArr = ["district",locationType,'Target Percentage','Achievement Percentage','Achieved Percentage'];
			else if(locationType == "mandal")
				theadArr = ["district","constituency",locationType,'Target Percentage','Achievement Percentage','Achieved Percentage'];
			else if(locationType == "panchayat")
				theadArr = ["district","constituency","mandal",locationType,'Target Percentage','Achievement Percentage','Achieved Percentage'];
	}else{
			if(locationType == "constituency")
				theadArr = ["district",locationType,'Sanctioned Amount','Expenditure','Achieved Percentage'];
			else if(locationType == "mandal")
				theadArr = ["district","constituency",locationType,'Sanctioned Amount','Expenditure','Achieved Percentage'];
			else if(locationType == "panchayat")
				theadArr = ["district","constituency","mandal",locationType,'Sanctioned Amount','Expenditure','Achieved Percentage'];
	}
	if(divId == 'Timely Payment')
	{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			locationId : menuLocationId,
			sublocaType : locationType,
			districtId : districtId,
			program: programId
		}
	}else{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			locationId : menuLocationId,
			sublocaType : locationType,
			districtId : districtId
		}
	}
	
	
	$.ajax({
		url: 'getNregaLevelsWiseDataFrNewCalls',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						if(globalDivName == "Nurseries")
							str+='<td>'+ajaxresp[i].targetPersonDays+'</td>';
						else
							str+='<td>'+ajaxresp[i].target+'</td>';
						str+='<td>'+ajaxresp[i].achivement+'</td>';
						
						if(ajaxresp[i].percentage >= 100){
							str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
						}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
						}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
							str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
						}else{
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
						}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,divId);
		}
	});
}


function getNregaLevelsWiseDataFrAgriculture(divIdd,locationType,menuLocationType,menuLocationId,blockName)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#"+divIdd).html(spinner);
	var theadArr = [locationType,'Total Expenditure','Expenditure on Agriculture & Allied Activities','Achievement Percentage'];
	if(locationType == "constituency")
		theadArr = ["district",locationType,'Total Expenditure','Expenditure on Agriculture & Allied Activities','Achievement Percentage'];
	else if(locationType == "mandal")
		theadArr = ["district","constituency",locationType,'Total Expenditure','Expenditure on Agriculture & Allied Activities','Achievement Percentage'];
	else if(locationType == "panchayat")
		theadArr = ["district","constituency","mandal",locationType,'Total Expenditure','Expenditure on Agriculture & Allied Activities','Achievement Percentage'];
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocaType : locationType,
		districtId:districtId
	}
	$.ajax({
		url: 'getNregaLevelsWiseDataFrAgriculture',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						str+='<td>'+ajaxresp[i].targetPersonDays+'</td>';
						str+='<td>'+ajaxresp[i].argicultureExpenditure+'</td>';
						if(ajaxresp[i].achivement < 60){
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].achivement+'</td>';
						}else if(ajaxresp[i].achivement >= 65)
						{
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].achivement+'</td>';
						}else if(ajaxresp[i].achivement >= 60 && ajaxresp[i].achivement < 65)
						{
							str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].achivement+'</td>';
						}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

function getNregaLevelsWiseDataFrHorticulture(divIdd,locationType,menuLocationType,menuLocationId,blockName)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#"+divIdd).html(spinner);
	 var theadArr = [locationType,'Target(in Acres)','Sanctioned Area (in Acres)','Pitting  Area (in Acres)','Planting  Area (in Acres)','Pitting Perc','Achievement Percentage'];
	if(locationType == "constituency")
		theadArr = ["district",locationType,'Target(in Acres)','Sanctioned Area (in Acres)','Pitting  Area (in Acres)','Planting  Area (in Acres)','Pitting Perc','Achievement Percentage'];
	else if(locationType == "mandal")
		theadArr = ["district","constituency",locationType,'Target(in Acres)','Sanctioned Area (in Acres)','Pitting  Area (in Acres)','Planting  Area (in Acres)','Pitting Perc','Achievement Percentage'];
	else if(locationType == "panchayat")
		theadArr = ["district","constituency","mandal",locationType,'Target(in Acres)','Sanctioned Area (in Acres)','Pitting  Area (in Acres)','Planting  Area (in Acres)','Pitting Perc','Achievement Percentage'];
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocaType : locationType,
		districtId:districtId
	}
	$.ajax({
		url: 'getNregaLevelsWiseDataFrHorticulture',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						
						str+='<td>'+ajaxresp[i].targetACRES+'</td>';
						str+='<td>'+ajaxresp[i].sanctionedACRES+'</td>';
						str+='<td>'+ajaxresp[i].pittingArea+'</td>';
						str+='<td>'+ajaxresp[i].plantingArea+'</td>';
						
							if(ajaxresp[i].targetPittingPerc >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].targetPittingPerc+'</td>';
							}else if(ajaxresp[i].targetPittingPerc >= 90 && ajaxresp[i].targetPittingPerc < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].targetPittingPerc+'</td>';
							}else if(ajaxresp[i].targetPittingPerc >= 60 && ajaxresp[i].targetPittingPerc < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].targetPittingPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].targetPittingPerc+'</td>';
							}
							if(ajaxresp[i].targetPalnting >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].targetPalnting+'</td>';
							}else if(ajaxresp[i].targetPalnting >= 90 && ajaxresp[i].targetPalnting < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].targetPalnting+'</td>';
							}else if(ajaxresp[i].targetPalnting >= 60 && ajaxresp[i].targetPalnting < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].targetPalnting+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].targetPalnting+'</td>';
							}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

function getNregaLevelsWiseDataFrAvenue(divIdd,locationType,menuLocationType,menuLocationId,blockName)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#"+divIdd).html(spinner);
	 var theadArr = [locationType,'Target','Sanctioned Area (in Kms)','Pitting  Area (in Kms)','Planting  Area (in Kms)','Pitting Percentage','Achievement Percentage'];
	if(locationType == "constituency")
		theadArr = ["district",locationType,'Target','Sanctioned Area (in Kms)','Pitting  Area (in Kms)','Planting  Area (in Kms)','Pitting Percentage','Achievement Percentage'];
	else if(locationType == "mandal")
		theadArr = ["district","constituency",locationType,'Target','Sanctioned Area (in Kms)','Pitting  Area (in Kms)','Planting  Area (in Kms)','Pitting Percentage','Achievement Percentage'];
	else if(locationType == "panchayat")
		theadArr = ["district","constituency","mandal",locationType,'Target','Sanctioned Area (in Kms)','Pitting  Area (in Kms)','Planting  Area (in Kms)','Pitting Percentage','Achievement Percentage'];
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocaType : locationType,
		districtId:districtId
	}
	$.ajax({
		url: 'getNregaLevelsWiseDataFrAvenue',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
							str+='<td>'+ajaxresp[i].targetKMS+'</td>';
						str+='<td>'+ajaxresp[i].sanctionedKMS+'</td>';
						str+='<td>'+ajaxresp[i].pittingKMS+'</td>';
						str+='<td>'+ajaxresp[i].plantingKMS+'</td>';
							
							if(ajaxresp[i].targetPittingPerc >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].targetPittingPerc+'</td>';
							}else if(ajaxresp[i].targetPittingPerc >= 90 && ajaxresp[i].targetPittingPerc < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].targetPittingPerc+'</td>';
							}else if(ajaxresp[i].targetPittingPerc >= 60 && ajaxresp[i].targetPittingPerc < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].targetPittingPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].targetPittingPerc+'</td>';
							}
						
							if(ajaxresp[i].sanctionedPerc >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].sanctionedPerc+'</td>';
							}else if(ajaxresp[i].sanctionedPerc >= 90 && ajaxresp[i].sanctionedPerc < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].sanctionedPerc+'</td>';
							}else if(ajaxresp[i].sanctionedPerc >= 60 && ajaxresp[i].sanctionedPerc < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].sanctionedPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].sanctionedPerc+'</td>';
							}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

//var overViewArr = ['Soak Pits'];
var overViewArr = ['Labour Budget','Material Availability','Farm Ponds','Vermi Compost','GH','Solid Waste Management','Burial Ground','Play fields','SMC Trench','Average Wage','Average Days of Employment','HH Completed 100 Days','Timely Payment','Payments','NRM Works','Agriculture Activities','Pending Works','Man Days Comparision','Expenditure','Daily Labour Turnout','Cattle Ponds','Desilting of Drinking Water Tanks','FAperformance','FA Vacancies','Not Yet Completed Works','Weekly Comparision','Village Parks','coffee','Comprehensive Restoration of minor Irrigation Tank1','Soak Pits','Approach Roads to Fish PondsMCC','Greenary works Chettu','Agriculture Related Works', 'Rural Sanitation Works','Soil Moisture Conservation works Neeru','Works in community lands','Institutional Development Works','Road Works','Water Harvesting Structures Neeru','IJP PROGRAM WORKS','AH-Live Stock Related works','Comprehensive Restoration of minor Irrigation Tank','CC Roads1','Anganwadi','GP Buildings1','Construction of silopits of 3 MTs capacity','Fodder trough for Cattle Cattle drinking water trough','Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze','Raising of Perinnial Fodder','Raising of Silvipasture clubbed with subabul plantation','Mandal buildings1','NTR 90 Days','NTR Rural House','Mulbery New','Silk worm New','Horticulture','Fish Ponds','Fish Drying Platforms','OPGK-Perinnials','OPGK-Annuals','Animal Husbandry Others','UGDrainage','Village Haats','BT RoadsPR','Gravel Link RoadsPR','WBM RoadsPR','Renovation and Improvements to existing Check Dams Check Wall','Road Formation Upto WBM GR II Including CD works','Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas','Construction Of Animal Hostel','Roads for Unconnected Habitations 2011-12','Construction of New Check Dam','Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality','Construction of Food Grains Storage Structures of 250MT','Formation of Road upto WBM Gr II surface including CD works in Tribal areas','Construction of Village Haats Infrastructure fecilities','Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham','Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT','Construction of Buildings for women self help group federation','Work Site Facilities','Renovation and Improvements to existing Percolation Tank Mini Percolation tank','GP level BNRGSK knowledge resource centre 2012-13 and afterwards','Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality','Production of Grafts in HNTC','Improvements of RYTHU BAZAR','Roads for Unconnected Habitations 2012-13 and afterwards','HNTC Development','New Open Well for Drinking water purpose','Construction of Crematoria Burial Grounds','Repairs to Existing Check Dam','Formation of Road upto Gravel surface including CD works to agriculture fields','Formation of Approach Road upto Gravel surface including CD works to Burial ground','Construction of Food Grains Storage Structures of 500MT','Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas','Raising of Cashew bag seedlings for 2014-15','Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas','Raising and Maintenance of Avenue plantations','Raising and Maintenance of Block Plantations','Soil and Moisture Conservation Works','Animal Hostels','Mega Kshetralu','Continuous Trenches','Check Dam','Desilting CD','Mini Percolation tank','Percolation tank','Rock fill dams','Nutri Garden','Seed Dibbling','Nursery','Maintenance of Nurseries','BT RoadsITDA','WBM RoadsITDA','Avenue','Construction of compound wallSchool Education Department']; 

buildNREGSProjectsOverview(overViewArr,'')
function onloadCallsBuilding(){
	for(var i in overViewArr)
	{
		$("[overview-block='"+overViewArr[i]+"']").append(spinner);
		if(overViewArr[i] == 'NTR 90 Days' || overViewArr[i] == 'Production of Bricks' || overViewArr[i] == 'Cattle Drinking Water Troughs' || overViewArr[i] == 'Raising of Perinnial Fodders' || overViewArr[i] == 'Fish Ponds' || overViewArr[i] == 'Fish Drying Platforms' || overViewArr[i] == 'NTR Rural House' || overViewArr[i] == 'OPGK-Perinnials' || overViewArr[i] == 'OPGK-Annuals')
		{
			getNREGSProjectsAbstractNew(overViewArr[i],'state',"0",'',2);
		}else if(overViewArr[i] == 'Weekly Comparision')
		{
			getApWeeklyAcheivementAbstractData(overViewArr[i],'state',"0",'',2);
		}else if(overViewArr[i] == 'Soak Pits')
		{
			getSoakPitsAbstractLevelsWiseData(overViewArr[i],'state','state','0',2,'');
		}else if(overViewArr[i] == 'FA Vacancies')
		{
			getLocationWiseFAVacencies(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
		}else if(overViewArr[i] == 'Material Availability')
		{
			getMaterialAvailabilityStatusForFinancialYear(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
		}else if(overViewArr[i] == 'Not Yet Completed Works')
		{
			getWorkCompletionData(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
		}
		else if(overViewArr[i] == 'Raising and Maintenance of Block Plantations' || overViewArr[i] == 'Raising and Maintenance of nurseries' || overViewArr[i] == 'Soil and Moisture Conservation Works' || overViewArr[i] == 'Raising and Maintenance of Avenue plantations' || overViewArr[i] == 'Seed Dibbling' || overViewArr[i] == 'Nursery' || overViewArr[i] == 'Maintenance of Nurseries')
		{
			getNREGSForestProjectsAbstract(overViewArr[i],'state',"0",'',2);
		}else if(overViewArr[i] == 'Payments')
		{
			getNregaPaymentsAbsAndOverviewDtls(overViewArr[i],'state',0,2,'abstract');
		}
		else if(overViewArr[i] == 'Man Days Comparision')
		{
			getManWorkDaysOfNrega(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
		}else if(overViewArr[i] == 'Expenditure')
		{
			getManWorksExpenditureAbstarct(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
		}else if(overViewArr[i] == 'Daily Labour Turnout'){
			getFieldManDaysWorkDetails(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
		}
		else if(overViewArr[i] == 'Greenary works Chettu' || overViewArr[i] == 'Agriculture Related Works' || overViewArr[i] == 'Rural Sanitation Works' || overViewArr[i] == 'Soil Moisture Conservation works Neeru' || overViewArr[i] == 'Works in community lands' || overViewArr[i] == 'IJP PROGRAM WORKS' || overViewArr[i] == 'Institutional Development Works' || overViewArr[i] == 'Road Works' || overViewArr[i] == 'Water Harvesting Structures Neeru' || overViewArr[i] == 'AH-Live Stock Related works'){
			getNregaOtherMCCAbstarctData(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
		}else if(overViewArr[i] == 'Renovation and Improvements to existing Check Dams Check Wall' || overViewArr[i] == 'Road Formation Upto WBM GR II Including CD works' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || overViewArr[i] == 'Construction Of Animal Hostel' || overViewArr[i] == 'Roads for Unconnected Habitations 2011-12' || overViewArr[i] == 'Construction of New Check Dam' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 250MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || overViewArr[i] == 'Construction of Village Haats Infrastructure fecilities' || overViewArr[i] == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || overViewArr[i] == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || overViewArr[i] == 'Construction of Buildings for women self help group federation' || overViewArr[i] == 'Work Site Facilities' || overViewArr[i] == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || overViewArr[i] == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || overViewArr[i] == 'Production of Grafts in HNTC' || overViewArr[i] == 'Improvements of RYTHU BAZAR' || overViewArr[i] == 'Roads for Unconnected Habitations 2012-13 and afterwards' || overViewArr[i] == 'HNTC Development' || overViewArr[i] == 'New Open Well for Drinking water purpose' || overViewArr[i] == 'Construction of Crematoria Burial Grounds' || overViewArr[i] == 'Repairs to Existing Check Dam' || overViewArr[i] == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || overViewArr[i] == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 500MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || overViewArr[i] == 'Raising of Cashew bag seedlings for 2014-15' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || overViewArr[i] == 'Comprehensive Restoration of minor Irrigation Tank' || overViewArr[i] == "Azolla Production Unit" || overViewArr[i] == "Construction of silopits of 3 MTs capacity" || overViewArr[i] == "Fodder trough for Cattle Cattle drinking water trough" || overViewArr[i] == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || overViewArr[i] == "Raising of Perinnial Fodder" || overViewArr[i] == "Raising of Silvipasture clubbed with subabul plantation"){
			getNregaCovergancePROtherLevelData(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
		}else if(overViewArr[i] == 'Pending Works'){
			getOverallPendingWorksAbstract(overViewArr[i],'state',"-1",'',2,'onLoad');
		}
		else if(overViewArr[i] != 'Weekly Comparision'){
			getNREGSAbstractDataByType(overViewArr[i],'state',"0",'',2,'onLoad');
		}
	}
}


function getNregaLevelsWiseDataForCCRoads(divIdd,locationType,menuLocationType,menuLocationId,blockName)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#"+divIdd).html(spinner);
	var theadArr = [];
	if(blockName == "UGDrainage"){
			theadArr = [locationType,'Target Length (in KMS)','Sanctioned Estimate Cost','Sanctioned Length (in KMS)','Percentage of Sanctioned Length','Expenditure','Completed Length (in KMS)','Achv perc based on Sanc length','ACHIEVEMENT PERCENTAGE'];
		if(locationType == "constituency")
			theadArr = ["district",locationType,'Sanctioned Estimate Cost','Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','Achv perc based on Sanc length','ACHIEVEMENT PERCENTAGE'];
		else if(locationType == "mandal")
			theadArr = ["district","constituency",locationType,'Sanctioned Estimate Cost','Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','Achv perc based on Sanc length','ACHIEVEMENT PERCENTAGE'];
		else if(locationType == "panchayat")
			theadArr = ["district","constituency","mandal",locationType,'Sanctioned Estimate Cost','Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','Achv perc based on Sanc length','ACHIEVEMENT PERCENTAGE'];
	}
	else if(blockName == "CC Roads1"){
		theadArr = [locationType,'Target Length (in KMS)','Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','ACHIEVEMENT PERCENTAGE','Egs Exp','Convergence Exp '];
		if(locationType == "constituency")
			theadArr = ["district",locationType,'Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','ACHIEVEMENT PERCENTAGE','Egs Exp','Convergence Exp '];
		else if(locationType == "mandal")
			theadArr = ["district","constituency",locationType,'Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','ACHIEVEMENT PERCENTAGE','Egs Exp','Convergence Exp '];
		else if(locationType == "panchayat")
			theadArr = ["district","constituency","mandal",locationType,'Sanctioned Length (in KMS)','Expenditure','Completed Length (in KMS)','ACHIEVEMENT PERCENTAGE','Egs Exp','Convergence Exp '];
	}
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocaType : locationType,
		districtId:districtId
	}
	$.ajax({
		url: 'getNregaLevelsWiseDataForCCRoads',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						if(blockName == "UGDrainage"){
							if(locationType == "state" || locationType == "district")
								str+='<td>'+ajaxresp[i].targetKMS+'</td>';
							str+='<td>'+ajaxresp[i].sanctionedAmount+'</td>';
							str+='<td>'+ajaxresp[i].sanctionedKMS+'</td>';
							if(locationType == "state" || locationType == "district")
								str+='<td>'+ajaxresp[i].sanctionedPerventage+'</td>';
							str+='<td>'+ajaxresp[i].expenditureAmount+'</td>';
							str+='<td>'+ajaxresp[i].completedKMS+'</td>';
							
							if(ajaxresp[i].percSant >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 90 && ajaxresp[i].percSant < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 60 && ajaxresp[i].percSant < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}
							if(ajaxresp[i].percentage >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
						}
						else if(blockName == "CC Roads1"){
							if(locationType == "state" || locationType == "district")
								str+='<td>'+ajaxresp[i].targetKMS+'</td>';
							str+='<td>'+ajaxresp[i].sanctionedKMS+'</td>';
							str+='<td>'+ajaxresp[i].expenditureAmount+'</td>';
							str+='<td>'+ajaxresp[i].completedKMS+'</td>';
							if(locationType == "state" || locationType == "district"){
								
								if(ajaxresp[i].percentage >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
								}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
								}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
								}
							}
							else{
								if(ajaxresp[i].percSant >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else if(ajaxresp[i].percSant >= 90 && ajaxresp[i].percSant < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else if(ajaxresp[i].percSant >= 60 && ajaxresp[i].percSant < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}
							}
							
							str+='<td>'+ajaxresp[i].egsExpenditure+'</td>';
							str+='<td>'+ajaxresp[i].convergenceExpn+'</td>';
						}
						
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

 //getNregaParliamentData();
function getNregaParliamentData()
{
	//$("#"+divIdd).html(spinner);
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: "state",
		divType : "Agriculture Activities",
		locationId : "-1",
		sublocaType : "constituency"
	}
	$.ajax({
		url: 'getNregaParliamentData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
		}
	});
}   

//ProjectOverviewNew
//getNREGSProjectsAbstractNew();
function getNREGSProjectsAbstractNew(type,locType,locId,blockName,levelId)
{
	$("#nregsOverviewBodyId").html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		type : type,
		locationType: locType,
		locationId : locId
	}
	$.ajax({
		url: 'getNREGSProjectsAbstractNew',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(type,ajaxresp,blockName,locId,locType,levelId);
		}
	});
}

function getMaterialAvailabilityStatusForFinancialYear(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#nregsOverviewBodyId").html(spinner);
	var districtId = $("#selectedName").attr("attr_distid");
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		locationIdStr : menuLocationId,
		sublocationType : locationTypeNew,
		sector : buildType,
		districtId : districtId
	}
	$.ajax({
		url: 'getMaterialAvailabilityStatusForFinancialYear',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'Abstract')
			{
				buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
			}else{
				var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state")
								str+='<td class="text-capitalize">Andhra Pradesh</td>';
							if(locationTypeNew != "state")
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							if(locationTypeNew != "state" && locationTypeNew != "district")
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							if(locationTypeNew == "mandal" || locationTypeNew == "panchayat")
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							if(locationTypeNew == "panchayat")
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							
							str+='<td>'+ajaxresp[i].wageExpenditure+'</td>';
							str+='<td>'+ajaxresp[i].materialEntitlement+'</td>';
							str+='<td>'+ajaxresp[i].materialExpenditure+'</td>';
							if(ajaxresp[i].materialExpenditurePerc < 35){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].materialExpenditurePerc+'</td>';
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].balanceMaterial+'</td>';
							}
							else if(ajaxresp[i].materialExpenditurePerc >= 35 && ajaxresp[i].materialExpenditurePerc < 40){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].materialExpenditurePerc+'</td>';
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].balanceMaterial+'</td>';
							}
							else if(ajaxresp[i].materialExpenditurePerc >= 40){
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].materialExpenditurePerc+'</td>';
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].balanceMaterial+'</td>';
							}
						str+='</tr>';
					}
				}
				tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			}
		}
	});
}

function getWorkCompletionData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#nregsOverviewBodyId").html(spinner);
	var districtId = $("#selectedName").attr("attr_distid");
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		locationIdStr : menuLocationId,
		sublocationType : locationTypeNew,
		sector : buildType,
		districtId : districtId
	}
	$.ajax({
		url: 'getWorkCompletionData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'Abstract')
			{
				buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
			}else{
				var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state")
								str+='<td class="text-capitalize">Andhra Pradesh</td>';
							if(locationTypeNew != "state")
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							if(locationTypeNew != "state" && locationTypeNew != "district")
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							if(locationTypeNew == "mandal" || locationTypeNew == "panchayat")
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							if(locationTypeNew == "panchayat")
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							
							str+='<td>'+ajaxresp[i].started1415+'</td>';
							str+='<td>'+ajaxresp[i].yetCompleted1415+'</td>';
							var per=(ajaxresp[i].yetCompleted1415/ajaxresp[i].started1415)*100;
							str+='<td>'+per.toFixed(2)+'</td>';
							
							str+='<td>'+ajaxresp[i].started1516+'</td>';
							str+='<td>'+ajaxresp[i].yetCompleted1516+'</td>';
							var per=(ajaxresp[i].yetCompleted1516/ajaxresp[i].started1516)*100;
							str+='<td>'+per.toFixed(2)+'</td>';
							
							str+='<td>'+ajaxresp[i].started1617+'</td>';
							str+='<td>'+ajaxresp[i].yetCompleted1617+'</td>';
							var per=(ajaxresp[i].yetCompleted1617/ajaxresp[i].started1617)*100;
							str+='<td>'+per.toFixed(2)+'</td>';
							
							str+='<td>'+ajaxresp[i].started1718+'</td>';
							str+='<td>'+ajaxresp[i].yetCompleted1718+'</td>';
							var per=(ajaxresp[i].yetCompleted1718/ajaxresp[i].started1718)*100;
							str+='<td>'+per.toFixed(2)+'</td>';
							
							str+='<td>'+ajaxresp[i].started1819+'</td>';
							str+='<td>'+ajaxresp[i].yetCompleted1819+'</td>';
							var per=(ajaxresp[i].yetCompleted1819/ajaxresp[i].started1819)*100;
							str+='<td>'+per.toFixed(2)+'</td>';
							
							str+='<td>'+ajaxresp[i].started+'</td>';
							str+='<td>'+ajaxresp[i].yetCompleted+'</td>';
							var per=(ajaxresp[i].yetCompleted/ajaxresp[i].started)*100;
							str+='<td>'+per.toFixed(2)+'</td>';
							
						str+='</tr>';
					}
				}
				tableView(divIdd,'',str,locationTypeNew,blockName);
			}
		}
	});
}

function getLocationWiseFAVacencies(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#nregsOverviewBodyId").html(spinner);
	var json = {
		locationType: menuLocationType,
		locationIdStr : menuLocationId,
		sublocationType : locationTypeNew,
		sector : buildType
	}
	$.ajax({
		url: 'getLocationWiseEmptyVacenciesDetails',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'Abstract')
			{
				buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
			}else{
				var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state")
								str+='<td class="text-capitalize">'+ajaxresp[i].state+'</td>';
							if(locationTypeNew != "state")
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							if(locationTypeNew != "state" && locationTypeNew != "district")
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							if(locationTypeNew == "mandal" || locationTypeNew == "panchayat")
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							if(locationTypeNew == "panchayat")
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							
							str+='<td>'+ajaxresp[i].count+'</td>';
							if(ajaxresp[i].subList != null){
								for(var j in ajaxresp[i].subList){
									str+='<td>'+ajaxresp[i].subList[j].count+'</td>';
								}
							}
							str+='</tr>';
					}
				}
				tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			}
		}
	});
}

var manDaysStartDate = '201804';
var manDaysEndDate = moment().format("YYYYMM");
function getManWorkDaysOfNrega(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	var distrtId = $("#selectedName").attr("attr_distId");
	var toDateArr = glEndDate.split('-');
	var json = {
		fromMonth : manDaysStartDate,
		toMonth : manDaysEndDate,
		locationType: menuLocationType,
		locationId : menuLocationId,
		sector : buildType,
		districtId : distrtId,
		sublocationType : locationTypeNew
	}
	
	$.ajax({
		url: 'getManWorkDaysOfNregaMonthWise',   //'getManWorkDaysOfNrega',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'Abstract')
			{
				buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
			}else{
				var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state"){
								str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
							}
							else if(locationTypeNew == "district"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							}
							else if(locationTypeNew == "constituency"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							}
							else if(locationTypeNew == "mandal"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							}
							else if(locationTypeNew == "panchayat"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							}
							
							str+='<td>'+ajaxresp[i].thisMonth+'</td>';
							str+='<td>'+ajaxresp[i].finAsOfToday+'</td>';
							if(ajaxresp[i].parameter != null && ajaxresp[i].parameter == 'Decrement'){
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].parameter != null && ajaxresp[i].parameter == 'Increment'){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
							str+='<td>'+ajaxresp[i].lastFinSameDay+'</td>';
							str+='<td>'+ajaxresp[i].lastFin+'</td>';
							str+='<td>'+ajaxresp[i].from2014+'</td>';
						str+='</tr>';
					}
				}
				tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			}
		}
	})
}
function getNREGSForestProjectsAbstract(type,locType,locId,blockName,levelId)
{
	$("#nregsOverviewBodyId").html(spinner);
	var districtId = $("#selectedName").attr("attr_distId");
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		type : type,
		locationType: locType,
		locationId : locId,
		districtId : districtId
	}
	$.ajax({
		url: 'getNREGSForestAbstact',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(type,ajaxresp,blockName,locId,locType,levelId);
		}
	});
}

function getNregaPaymentsAbsAndOverview(type,locType,locId,levelId,buildType)
{
	$("#projectOvervw"+type.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: locType,
		divType : type,
		locationId : locId,
		sublocaType :locType
	}
	$.ajax({
		url: 'getNregaPaymentsAbsAndOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'abstract')
			{
				buildNREGSAbstractDataByTypeNew(type,ajaxresp,'',locId,locType,levelId);
			}else if(buildType == 'overview')
			{
				buildPaymentsOverviewData(ajaxresp,type);
			}
			
		}
	});
}

function buildPaymentsOverviewData(result,projectDivId)
{
	var str= '';
	
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div class="bg_color" style="padding:15px">';
				str+='<div class="row">';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Total Generated / Total Pending</h5>';
							str+='<p>Total Amount Generated : '+result[0].totalAmount+' / '+result[0].totalPendinAmount+'</p>	';
							str+='<p>Wage Amount : '+result[0].totalWage+' / '+result[0].pendingWage+'</p>';
							str+='<p>Material Amount : '+result[0].totalMaterial+' / '+result[0].pendingMaterial+'</p>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">FTO Generated / Not Generated</h5>';
							str+='<p>Total Amount : '+result[0].totalGeneratesAmount+' / '+result[0].totalNotGeneratedAmount+'</p>';
							str+='<p>Wage Amount : '+result[0].generatedWageAmount+' / '+result[0].notGeneratedWagesAmount+'</p>';
							str+='<p>Material Amount : '+result[0].generatedMaterialAmount+' / '+result[0].notGeneratedMaterialAmount+'</p>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">FTO s Uploaded / Not Uploaded</h5>';
							str+='<p>Total Amount : '+result[0].totalUploadsAmount+' / '+result[0].totalNotUploadedAmount+'</p>';
							str+='<p>Wage Amount : '+result[0].uploadedWageAmount+' / '+result[0].notUploadedWagesAmount+'</p>';
							str+='<p>Material Amount : '+result[0].uploadedMaterialAmount+' / '+result[0].notUploadedMaterialAmount+'</p>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="row m_top20">';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">FTO s Sent to Bank / Pending at Server</h5>';
							str+='<p>Total Amount : '+result[0].totalSentBankAmount+' / '+result[0].totalNotSentBankAmount+'</p>';
							str+='<p>Wage Amount : '+result[0].sentBankWageAmount+' / '+result[0].notSentBankWageAmount+'</p>';
							str+='<p>Material Amount : '+result[0].sentBankMaterialAmount+' / '+result[0].notSentBankMaterialAmount+'</p>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<p><h5 class="text-danger">Success / Rejected / Response Pending</h5>';
							str+='<p>Total Amount : '+result[0].totalCompletedAmount+' / '+result[0].totalRejectedAmount+' / '+result[0].totalResponsePendingAmount+'</p>';
							str+='<p>Wage Amount : '+result[0].completedWageAmount+' / '+result[0].rejectedWagesAmount+' / '+result[0].responsePendingWageAmount+'</p>';
							str+='<p>Material Amount : '+result[0].completedMaterialAmount+' / '+result[0].rejectedMaterialAmount+' / '+result[0].responsePendingMaterialAmount+' </p>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="block-border">';
							str+='<h5 class="text-danger">Pending At Bank For Want Of Funds / Rejected Regenerate</h5>';
							str+='<p>Total Amount : '+result[0].totalReleasePendingAmount+' / '+result[0].totalReprocessPendingAmount+'</p>';
							str+='<p>Wage Amount :'+result[0].releasePendingWageAmount+' / '+result[0].reprocessPendingWageAmount+'</p>';
							str+='<p>Material Amount : '+result[0].releasePendingMaterialAmount+' / '+result[0].reprocessPendingMaterialAmount+'</p>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#projectOvervw"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(str);
}

function getNREGSAbstractDataByType(type,locType,locId,blockName,levelId,buildDateType)
{
	if(buildDateType == 'onLoad' && type == 'FAperformance')
	{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,//'2017-05-30',
			type : type,
			locationType: locType,
			locationId : locId
		}
	}else{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			type : type,
			locationType: locType,
			locationId : locId
		}
	}
	
	
	$.ajax({
		url: 'getNREGSAbstractDataByType',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(type,ajaxresp,blockName,locId,locType,levelId);
		}
	}); 
}
function buildNREGSAbstractDataByTypeNew(type,result,blockName,locId,locType,levelId)
{
	//console.log(type)
	$("[overview-block='"+type+"']").removeClass("panel-block-white");
	var str='';
	
	//var totalWage = result[0].pendingWage + result[0].
	$("[overview-block='"+type+"']").attr("attr_levelId",levelId);
	$("[overview-block='"+type+"']").attr("attr_locationId",locId);
	if(type == 'Payments' && result != null)
	{
		str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 1px;padding-bottom: 0px;">';
		if(type.length > 12)
		{
			str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
		}else{
			str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
		}
		str+='<small class="text-center font_weight">Total Pending</small>';
		if(result[0].totalPendinAmount != null && result[0].totalPendinAmount.length > 0)
		{
			str+='<h2 class="text-center"><i class="fa fa-inr"></i> '+result[0].totalPendinAmount+'</h2>';
		}else{
			str+='<h2 class="text-center">0</h2>';
		}
		str+='<div class="row">';
			str+='<div class="col-sm-6 text-center pad_right0">';
				str+='<label style="font-size: 12px;margin-bottom: 0px;">Wage</label>';
				if(result[0].pendingWage != null && result[0].pendingWage.length > 0)
				{
					str+='<h4><i class="fa fa-inr" style="position:static"></i>'+result[0].pendingWage+'</h4>';
				}else{
					str+='<h4>0</h4>';
				}
				
			str+='</div>';
			str+='<div class="col-sm-6 text-center pad_left0">';
				str+='<label style="font-size: 12px;margin-bottom: 0px;">Material</label>';
				if(result[0].pendingMaterial != null && result[0].pendingMaterial.length > 0)
				{
					str+='<h4><i class="fa fa-inr" style="position:static"></i>'+result[0].pendingMaterial+'</h4>';
				}else{
					str+='<h4>0</h4>';
				}
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	if(levelId == 3 || levelId == "3"){
		str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
			str+='<small class="panel-block-white-title text-capitalize text-center">STATE&nbsp;LEVEL&nbsp;-&nbsp;Pending</small>';
			str+='<h2 class="text-center">'+result[0].subList[0].totalPendinAmount+'</h2>';
		str+='</div>';
	}
	else if(levelId == 4 || levelId == "4"){
		str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
			str+='<small class="panel-block-white-title text-capitalize text-center">Total Pending</small>';
			str+='<div class="row">';
				str+='<div class="col-sm-6">';
					str+='<p>District</p>';
					str+='<h2 class="text-center m_top10" style="font-size:14px">'+result[0].subList[0].totalPendinAmount+'</h2>';
				str+='</div>';
				str+='<div class="col-sm-6">';
					str+='<p>State</p>';
					str+='<h2 class="text-center m_top10" style="font-size:14px">'+result[0].subList[1].totalPendinAmount+'</h2>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
}
	if(type == 'Daily Labour Turnout' && result != null)
	{
		str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
			if(type.length > 12)
			{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
			}else{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
			}
			str+='<small class="text-center font_weight">Today</small>';
			if(result[0].today != null && result[0].today != 0)
			{
				str+='<h2 class="text-center">'+result[0].today+'</h2>';
			}else{
				str+='<h2 class="text-center">0</h2>';
			}
			str+='<div class="row">';
				str+='<div class="col-sm-6 text-center pad_right0">';
					str+='<label style="font-size: 12px;">This week</label>';
					if(result[0].thisWeek != null && result[0].thisWeek != 0)
					{
						str+='<h4>'+result[0].thisWeek+'</h4>';
					}else{
						str+='<h4>0</h4>';
					}
					
				str+='</div>';
				str+='<div class="col-sm-6 text-center pad_left0">';
					str+='<label style="font-size: 12px;">This Month</label>';
					if(result[0].thisMonth != null && result[0].thisMonth != 0)
					{
						str+='<h4>'+result[0].thisMonth+'</h4>';
					}else{
						str+='<h4>0</h4>';
					}
				str+='</div>';
			str+='</div>';
		str+='</div>';
		if(levelId == 3 || levelId == "3"){
			str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
				str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - TODAY</small>';
				str+='<h2 class="text-center">'+result[0].subList[0].today+'</h2>';
			str+='</div>';
		}
		else if(levelId == 4 || levelId == "4"){
			str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
				str+='<small class="panel-block-white-title text-capitalize text-center">Today</small>';
				str+='<div class="row">';
					str+='<div class="col-sm-6">';
						str+='<p>District</p>';
						str+='<h2 class="text-center" style="font-size:16px">'+result[0].subList[0].today+'</h2>';
					str+='</div>';
					str+='<div class="col-sm-6">';
						str+='<p>State</p>';
						str+='<h2 class="text-center" style="font-size:16px">'+result[0].subList[1].today+'</h2>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		}
	} 
	if(type == 'FA Vacancies' && result != null)
	{
		str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 5px;">';
			if(type.length > 12)
			{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
			}else{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
			}
			str+='<small class="text-center font_weight">Total Vacancies</small>';
			if(result[0].count != null && result[0].count != 0)
			{
				str+='<h2 class="text-center">'+result[0].count+'</h2>';
			}else{
				str+='<h2 class="text-center">0</h2>';
			}
			str+='<div class="row">';
			if(result[0].subList != null && result[0].subList.length > 0){
				for(var i in result[0].subList){
					str+='<div class="col-sm-4 text-center pad_right0">';
						str+='<label title="'+result[0].subList[i].name+'" style="font-size: 12px;margin-bottom: 2px;">'+result[0].subList[i].name.substr(0,10)+'</label>';
						if(result[0].subList[i].count != null && result[0].subList[i].count != 0)
						{
							str+='<h4>'+result[0].subList[i].count+'</h4>';
						}else{
							str+='<h4>0</h4>';
						}
						
					str+='</div>';
				}
			}
			str+='</div>';
		str+='</div>';
		if(levelId == 3 || levelId == "3"){
			str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
				str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - VACANCIES</small>';
				str+='<h2 class="text-center">'+result[0].subList1[0].count+'</h2>';
			str+='</div>';
		}
		else if(levelId == 4 || levelId == "4"){
			str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
				str+='<small class="panel-block-white-title text-capitalize text-center">Total Vacancies</small>';
				str+='<div class="row">';
					str+='<div class="col-sm-6">';
						str+='<p>District</p>';
						str+='<h2 class="text-center">'+result[0].subList1[0].count+'</h2>';
					str+='</div>';
					str+='<div class="col-sm-6">';
						str+='<p>State</p>';
						str+='<h2 class="text-center">'+result[0].subList1[1].count+'</h2>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		}
	} 
	if(type == 'Material Availability' && result != null)
	{
		if(result[0].materialExpenditurePerc < 35)
			str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 1px;padding-bottom: 2px;">';
		else if(result[0].materialExpenditurePerc >= 35 && result[0].materialExpenditurePerc < 40)
			str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'" style="padding-top: 1px;padding-bottom: 2px;">';
		else if(result[0].materialExpenditurePerc >= 40)
			str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 1px;padding-bottom: 2px;">';
		else
			str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 1px;padding-bottom: 2px;">';
			if(type.length > 12)
			{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
			}else{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
			}
			str+='<small class="text-center font_weight">Availability</small>';
			if(result[0].balanceMaterial != null && result[0].balanceMaterial.length > 0)
			{
				str+='<h2 class="text-center"><i class="fa fa-inr"></i> '+result[0].balanceMaterial+'&nbsp;Cr</h2>';
			}else{
				str+='<h2 class="text-center">0</h2>';
			}
			str+='<div class="row">';
				str+='<div class="col-sm-6 text-center pad_right0">';
					str+='<label class="" style="font-size: 12px;margin-bottom: 0px;">Entitlement</label>';
					if(result[0].materialEntitlement != null && result[0].materialEntitlement.length > 0)
					{
						str+='<h4 class="" style="font-size: 13px !important;"><i class="fa fa-inr" style="position:static"></i>'+result[0].materialEntitlement+'&nbsp;Cr</h4>';
					}else{
						str+='<h4  class="">0</h4>';
					}
					
				str+='</div>';
				str+='<div class="col-sm-6 text-center pad_left0">';
					str+='<label class="" style="font-size: 12px;margin-bottom: 0px;">Expenditure</label>';
					if(result[0].materialExpenditure != null && result[0].materialExpenditure.length > 0)
					{
						str+='<h4 class="" style="font-size: 13px !important;"><i class="fa fa-inr" style="position:static"></i>'+result[0].materialExpenditure+'&nbsp;Cr</h4>';
					}else{
						str+='<h4 class="">0</h4>';
					}
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		if(levelId == 3 || levelId == "3"){
			if(result[0].subList[0].materialExpenditurePerc < 35)
				str+='<div class="panel-black-white panel-block-white-high text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
			else if(result[0].subList[0].materialExpenditurePerc >= 35 && result[0].subList[0].materialExpenditurePerc < 40)
				str+='<div class="panel-black-white panel-block-white-medium text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
			else if(result[0].subList[0].materialExpenditurePerc >= 40)
				str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
			else
				str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
				str+='<small class="panel-block-white-title text-capitalize text-center">STATE&nbsp;LEVEL&nbsp;-&nbsp;Availability</small>';
				str+='<h2 class="text-center">'+result[0].subList[0].balanceMaterial+'</h2>';
			str+='</div>';
		}
		else if(levelId == 4 || levelId == "4"){
			str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
				str+='<small class="panel-block-white-title text-capitalize text-center">Total Availability</small>';
				str+='<div class="row">';
					str+='<div class="col-sm-6">';
						str+='<p>District</p>';
						str+='<h2 class="text-center m_top10" style="font-size:16px">'+result[0].subList[0].balanceMaterial+'&nbsp;Cr</h2>';
					str+='</div>';
					str+='<div class="col-sm-6">';
						str+='<p>State</p>';
						str+='<h2 class="text-center m_top10" style="font-size:16px">'+result[0].subList[0].balanceMaterial+'&nbsp;Cr</h2>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		}
	} 
	if(type == 'Not Yet Completed Works' && result != null)
	{
		str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
			if(type.length > 12)
			{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
			}else{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
			}
			str+='<small class="text-center font_weight">Pending Works</small>';
			if(result[0].yetCompleted != null && result[0].yetCompleted != 0)
			{
				var per=(result[0].yetCompleted/result[0].started)*100
				str+='<h2 class="text-center">'+per.toFixed(2)+'%'+'</h2>';
			}else{
				str+='<h2 class="text-center">0</h2>';
			}
			str+='<div class="row">';
				str+='<div class="col-sm-6 text-center pad_right0">';
					str+='<label style="font-size: 12px;">Started</label>';
					if(result[0].started != null && result[0].started != 0)
					{
						str+='<h4>'+result[0].started+'</h4>';
					}else{
						str+='<h4>0</h4>';
					}
					
				str+='</div>';
				str+='<div class="col-sm-6 text-center pad_left0">';
					str+='<label style="font-size: 12px;">Pending</label>';
					if(result[0].yetCompleted != null && result[0].yetCompleted != 0)
					{
						str+='<h4>'+result[0].yetCompleted+'</h4>';
					}else{
						str+='<h4>0</h4>';
					}
				str+='</div>';
			str+='</div>';
		str+='</div>';
		if(levelId == 3 || levelId == "3"){
			var stateper=(result[0].subList[0].yetCompleted/result[0].subList[0].started)*100;
			if(result[0].subList[0].yetCompleted != null && result[0].subList[0].yetCompleted > 0)
				str+='<div class="panel-black-white panel-block-white-high text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
			else
				str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
				str+='<small class="panel-block-white-title text-capitalize text-center">STATE&nbsp;LEVEL&nbsp;-&nbsp;PENDING</small>';
				str+='<h2 class="text-center">'+stateper.toFixed(2)+'%</h2>';
			str+='</div>';
		}
		else if(levelId == 4 || levelId == "4"){
			var distper=(result[0].subList[0].yetCompleted/result[0].subList[0].started)*100;
			var stateper=(result[0].subList[1].yetCompleted/result[0].subList[1].started)*100;
			if(result[0].subList[0].yetCompleted != null && result[0].subList[0].yetCompleted > 0)
				str+='<div class="panel-black-white panel-block-white-high text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
			else
				str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
				str+='<small class="panel-block-white-title text-capitalize text-center">Availability</small>';
				str+='<div class="row">';
					str+='<div class="col-sm-6">';
						str+='<p>District</p>';
						str+='<h2 class="text-center">'+distper.toFixed(2)+'%</h2>';
					str+='</div>';
					str+='<div class="col-sm-6">';
						str+='<p>State</p>';
						str+='<h2 class="text-center">'+stateper.toFixed(2)+'%</h2>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		}
	} 
	if(type == 'Pending Works' && result != null)
	{
		str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 10px;">';
			if(type.length > 12)
			{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
			}else{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
			}
			str+='<small class="text-center font_weight">Percentage</small>';
			if(result.percentage != null && result.percentage != 0)
			{
				str+='<h2 class="text-center">'+result.percentage+'%'+'</h2>';
			}else{
				str+='<h2 class="text-center">0</h2>';
			}
			str+='<div class="row">';
				str+='<div class="col-sm-6 text-center pad_right0">';
					str+='<label style="font-size: 12px;">Sanctioned</label>';
					if(result.sanctionWorks != null && result.sanctionWorks != 0)
					{
						str+='<h4>'+result.sanctionWorks+'</h4>';
					}else{
						str+='<h4>0</h4>';
					}
					
				str+='</div>';
				str+='<div class="col-sm-6 text-center pad_left0">';
					str+='<label style="font-size: 12px;">In Progress</label>';
					if(result.inProgressWorks != null && result.inProgressWorks != 0)
					{
						str+='<h4>'+result.inProgressWorks+'</h4>';
					}else{
						str+='<h4>0</h4>';
					}
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	if(result != null && result.length > 0 && type != 'Payments' && type !='Daily Labour Turnout' && type != 'FA Vacancies' && type != 'Material Availability' && type != 'Not Yet Completed Works' && type != 'Pending Works')
	{
		for(var i in result)
		{
			if(levelId == 2 || levelId == "2" || levelId == 4 || levelId == "4"){
				if(type == 'Agriculture Activities')
				{
					if(result[i].percentage < 60)
					{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 10px;">';
					}else if(result[i].percentage >= 60)
					{
						str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 10px;">';
					}else
					{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 10px;">';
					}
				}
				else if(type == 'Man Days Comparision' || type == 'Expenditure')
				{
					if(result[i].parameter == 'Decrement')
					{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding:5px 10px;padding-bottom: 2px;padding-top:3px;">';
					}else if(result[i].parameter == 'Increment')
					{
						str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding:5px 10px;padding-bottom: 2px;padding-top:3px;">';
					}else
					{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding:5px 10px;padding-bottom: 2px;padding-top:3px;">';
					}
				}else if(type == 'NRM Works')
				{
					if(result[i].percentage >= 100){
						str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 10px;">';
					}else if(result[i].percentage >= 90 && result[i].percentage < 100){
						str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 10px;">';
					}else if(result[i].percentage >= 60 && result[i].percentage < 90){
						str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 10px;">';
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 10px;">';
					}
				}else{
					if(result[i].percentage >= 100){
							str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 90 && result[i].percentage < 100){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 60 && result[i].percentage < 90){
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}
				}
				
					if(type == 'FAperformance')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Field Assistant Performance">FA Performan..</h4>';
					}else if(type == 'SMC Trench')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="SMC Trenches">SMC Trench..</h4>';
					}else if(type == 'Imp to CD')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Improvements to Check Dams and Percolation Tanks">Improvements..</h4>';
					}else if(type == 'MPT_PT')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Mini Percolation Tanks and Percolation Tanks">Mini Perco..</h4>';
					}else if(type == 'GC Works')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Gully Control Works">Gully Contr..</h4>';
					}else if(type == 'CD_CW')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Check Dams and Check Walls">Check Dam..</h4>';
					}else if(type == 'IHHL')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Individual Household Latrine">Individual Ho..</h4>';
					}else if(type == 'GH')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Greening Of Hillocks">Greening O..</h4>';
					}else if(type == 'CC Roads1')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="CC Roads">CC Roads</h4>';
					}else if(type == 'Anganwadi')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Anganwadi Buildings">Anganwadi B..</h4>';
					}else if(type == 'GP Buildings1')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="GP Buildings">GP Build..</h4>';
					}else if(type == 'Mandal Buildings1')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Mandal Buildings">Mandal Bui..</h4>';
					}else if(type == 'OPGK-Perinnials')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Oorura Pasu Graasa Kshetralu - Perinnials">Oorura Pasu..</h4>';
					}else if(type == 'OPGK-Annuals')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Oorura Pasu Graasa Kshetralu - Annuals">Oorura Pasu..</h4>';
					}else if(type == 'NTR Rural House')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="NTR IHHL">NTR IHHL</h4>';
					}
					else if(type == 'UGDrainage')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="UG Drainage">UG Drainage</h4>';
					}
					else if(type == 'Agriculture Activities')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Agriculture Allied Activities">Agriculture A..</h4>';
					}else if(type == 'Vermi Compost')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Nadep Compost Pits">Nadep Comp..</h4>';
					}else if(type == 'Expenditure')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Expenditure">Expenditure </h4>';
					}else if(type == 'Desilting CD')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Desilting and Depening of existing Percolation Tank / Mini Percolation Tank / Check Dam">Desilting..</h4>';
					}else if(type == 'Nursery')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Raising of Nurseries">Raising o..</h4>';
					}else if(type == 'Approach Roads to Fish PondsMCC')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Approach Roads to Fish Ponds">Approach Ro..</h4>';
					}else if(type == 'Construction of compound wallSchool Education Department')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Construction of compound wall">Construction..</h4>';
					}else if(type.length > 12)
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
					}else{
						str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
					}
					
					if(type == 'coffee')
						str+='<small class="text-center font_weight">Planting (%)</small>';
					else if(type == 'Man Days Comparision' || type == 'Expenditure')
						str+='<small class="text-center font_weight">Inc/Dec&nbsp;(%)</small>';
					else
						str+='<small class="text-center font_weight">Achieved</small>';
					
					
					if(result[i].percentage != null && result[i].percentage.length > 0)
					{
						if(type == 'Man Days Comparision'){
							str+='<h2 class="text-center"><span class="tooltipMans" data-toggle="tooltip" data-placement="top" title="Man Days Comparision b/n last Financial Year And This Financial Year">'+result[i].percentage+'</span><small>%</small>';
						}else if(type == 'Expenditure'){
							str+='<h2 class="text-center"><span class="tooltipMans"  data-toggle="tooltip" data-placement="top" title="Expenditure Comparision b/n Last Fin. Year Upto Present Month To This Fin. Year Upto This Month">'+result[i].percentage+'</span><small>%</small>';
						}else{
							str+='<h2 class="text-center">'+result[i].percentage+'<small>%</small>';
						}
						
					}else{
						str+='<h2 class="text-center">0<small>%</small>';
					}
					if(type == 'Agriculture Activities')
					{
						if(result[i].percentage < 60)
						{
							str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
						}else if(result[i].percentage >= 60)
						{
							str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
						}else
						{
							str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
						}
					}
					else if(type == 'Man Days Comparision' || type == 'Expenditure')
					{
						if(result[i].parameter == 'Decrement')
						{
							str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
						}else if(result[i].parameter == 'Increment')
						{
							str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
						}else
						{
							str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
						}
					}else{
							if(result[i].percentage >= 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 90 && result[i].percentage < 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 60 && result[i].percentage < 90){
								str+='<small><i class="fa fa-arrows-v" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else{
								str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}
					}
					
					str+='<div class="row">';
						str+='<div class="col-sm-6 text-center">';
						if(type == 'Greenary works Chettu' || type == 'Agriculture Related Works' || type == 'Rural Sanitation Works' || type == 'Soil Moisture Conservation works Neeru' || type == 'Works in community lands' || type == 'IJP PROGRAM WORKS' || type == 'Institutional Development Works' || type == 'Road Works' || type == 'Water Harvesting Structures Neeru' || type == 'AH-Live Stock Related works' || type == 'Renovation and Improvements to existing Check Dams Check Wall' || type == 'Road Formation Upto WBM GR II Including CD works' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || type == 'Construction Of Animal Hostel' || type == 'Roads for Unconnected Habitations 2011-12' || type == 'Construction of New Check Dam' || type == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || type == 'Construction of Food Grains Storage Structures of 250MT' || type == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || type == 'Construction of Village Haats Infrastructure fecilities' || type == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || type == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || type == 'Construction of Buildings for women self help group federation' || type == 'Work Site Facilities' || type == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || type == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || type == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || type == 'Production of Grafts in HNTC' || type == 'Improvements of RYTHU BAZAR' || type == 'Roads for Unconnected Habitations 2012-13 and afterwards' || type == 'HNTC Development' || type == 'New Open Well for Drinking water purpose' || type == 'Construction of Crematoria Burial Grounds' || type == 'Repairs to Existing Check Dam' || type == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || type == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || type == 'Construction of Food Grains Storage Structures of 500MT' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || type == 'Raising of Cashew bag seedlings for 2014-15' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || type == 'Cattle Ponds' || type == 'Desilting of Drinking Water Tanks' || type == 'coffee' || type == 'Comprehensive Restoration of minor Irrigation Tank1' || type == 'Comprehensive Restoration of minor Irrigation Tank' || type == 'Production of Bricks'){
							str+='<label>Sanctioned</label>';
						}
						else if(type == 'Man Days Comparision'){
							str+='<label style="font-size: 12px;margin-bottom: 2px;">Last Fin Same Day</label>';
						} else if(type == 'Expenditure'){
							str+='<label style="font-size: 12px;margin-bottom: 2px;" title="Last Fin. Year Upto Present&nbsp;Mnth">Last&nbsp;Fin..</label>';
						} 
						else{
							str+='<label style="font-size: 12px;">Target</label>';
						}
							
							if(result[i].target != null && result[i].target.length > 0)
							{
								
								if(result[i].parameter == 'Labour Budget' && levelId == 2)
								{
									str+='<h4>'+result[0].target+'L</h4>';
								}else if(result[0].parameter == 'Timely Payments'){
									str+='<h4>'+result[0].target+'%</h4>';
								}else{
									if(result[i].parameter == 'CC Roads' || result[i].parameter == 'UGDrainage')
										str+='<h4>'+result[0].target+'</h4>';
									else if(result[0].target.length > 7)
										str+='<h4 title="'+parseInt(result[0].target)+'">'+result[0].target.substr(0,7)+'..</h4>';
									else
										str+='<h4>'+parseInt(result[0].target)+'</h4>';
								}
							}else if(type == 'Greenary works Chettu' || type == 'Agriculture Related Works' || type == 'Rural Sanitation Works' || type == 'Soil Moisture Conservation works Neeru' || type == 'Works in community lands' || type == 'IJP PROGRAM WORKS' || type == 'Institutional Development Works' || type == 'Road Works' || type == 'Water Harvesting Structures Neeru' || type == 'AH-Live Stock Related works' || type == 'Renovation and Improvements to existing Check Dams Check Wall' || type == 'Road Formation Upto WBM GR II Including CD works' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || type == 'Construction Of Animal Hostel' || type == 'Roads for Unconnected Habitations 2011-12' || type == 'Construction of New Check Dam' || type == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || type == 'Construction of Food Grains Storage Structures of 250MT' || type == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || type == 'Construction of Village Haats Infrastructure fecilities' || type == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || type == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || type == 'Construction of Buildings for women self help group federation' || type == 'Work Site Facilities' || type == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || type == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || type == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || type == 'Production of Grafts in HNTC' || type == 'Improvements of RYTHU BAZAR' || type == 'Roads for Unconnected Habitations 2012-13 and afterwards' || type == 'HNTC Development' || type == 'New Open Well for Drinking water purpose' || type == 'Construction of Crematoria Burial Grounds' || type == 'Repairs to Existing Check Dam' || type == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || type == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || type == 'Construction of Food Grains Storage Structures of 500MT' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || type == 'Raising of Cashew bag seedlings for 2014-15' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || type == 'Comprehensive Restoration of minor Irrigation Tank' || type == "Azolla Production Unit" || type == "Construction of silopits of 3 MTs capacity" || type == "Fodder trough for Cattle Cattle drinking water trough" || type == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || type == "Raising of Perinnial Fodder" || type == "Raising of Silvipasture clubbed with subabul plantation" || type == "Soak Pits")
							{
								str+='<h4>'+result[0].target+'</h4>';
							}
							else if(type == 'Man Days Comparision'){
								str+='<h4>'+result[0].lastFinSameDay+'</h4>';
							} else if(type == 'Expenditure'){
								str+='<h4>'+result[0].total1718+'</h4>';
							}else{
								str+='<h4>0</h4>';
							}
							
						str+='</div>';
						str+='<div class="col-sm-6 text-center">';
							if(type == 'coffee'){
								str+='<label style="font-size: 12px;">Planting</label>';
							}
							else if(type == 'FAperformance')
							{
								str+='<label style="font-size: 12px;">Achieved</label>';
							}else if(type == 'Man Days Comparision')
							{
								str+='<label style="font-size: 12px;margin-bottom: 2px;">Fin As Of Today</label>';
							} else if(type == 'Expenditure'){
								str+='<label style="font-size: 12px;margin-bottom: 2px;" title="This Fin. Year Upto Present&nbsp;Mnth">This&nbsp;Fin..</label>';
							} else{
								str+='<label style="font-size: 12px;">Completed</label>';
							}
							
							if(result[i].completed != null && result[i].completed.length > 0)
							{
								if(result[i].parameter == 'Labour Budget' && levelId == 2)
								{
									str+='<h4>'+result[i].completed+'L</h4>';
								}else if(result[i].parameter == 'Timely Payments'){
									str+='<h4>'+result[i].completed+'%</h4>';
								}else if(result[i].completed.length > 7){
									str+='<h4 title="'+parseInt(result[i].completed)+'">'+result[i].completed.substr(0,7)+'..</h4>';
								}else{
									str+='<h4>'+parseInt(result[i].completed)+'</h4>';
								}
								
							}else if(type == 'Greenary works Chettu' || type == 'Agriculture Related Works' || type == 'Rural Sanitation Works' || type == 'Soil Moisture Conservation works Neeru' || type == 'Works in community lands' || type == 'IJP PROGRAM WORKS' || type == 'Institutional Development Works' || type == 'Road Works' || type == 'Water Harvesting Structures Neeru' || type == 'AH-Live Stock Related works' || type == 'Renovation and Improvements to existing Check Dams Check Wall' || type == 'Road Formation Upto WBM GR II Including CD works' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || type == 'Construction Of Animal Hostel' || type == 'Roads for Unconnected Habitations 2011-12' || type == 'Construction of New Check Dam' || type == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || type == 'Construction of Food Grains Storage Structures of 250MT' || type == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || type == 'Construction of Village Haats Infrastructure fecilities' || type == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || type == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || type == 'Construction of Buildings for women self help group federation' || type == 'Work Site Facilities' || type == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || type == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || type == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || type == 'Production of Grafts in HNTC' || type == 'Improvements of RYTHU BAZAR' || type == 'Roads for Unconnected Habitations 2012-13 and afterwards' || type == 'HNTC Development' || type == 'New Open Well for Drinking water purpose' || type == 'Construction of Crematoria Burial Grounds' || type == 'Repairs to Existing Check Dam' || type == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || type == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || type == 'Construction of Food Grains Storage Structures of 500MT' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || type == 'Raising of Cashew bag seedlings for 2014-15' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || type == 'Comprehensive Restoration of minor Irrigation Tank' || type == "Azolla Production Unit" || type == "Construction of silopits of 3 MTs capacity" || type == "Fodder trough for Cattle Cattle drinking water trough" || type == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || type == "Raising of Perinnial Fodder" || type == "Raising of Silvipasture clubbed with subabul plantation" || type == "Soak Pits")
							{
								str+='<h4>'+result[0].completed+'</h4>';
							}
							else if(type == 'Man Days Comparision'){
								str+='<h4>'+result[0].finAsOfToday+'</h4>';
							}else if(type == 'Expenditure'){
								str+='<h4>'+result[0].total1819+'</h4>';
							}else{
								str+='<h4>0</h4>';
							}
						str+='</div>';
					str+='</div>';
				str+='</div>';
				if(levelId == 4 || levelId == "4")
				{
					str+='<div class="panel-black-white panel-block-white-high text-center" overview-'+result[i].type+'="'+type+'" style="border-top:1px solid #333;">';
						str+='<small class="panel-block-white-title text-capitalize text-center">ACHIEVED</small>';
						str+='<div class="row">';
						for(var j in result[i].subList)
						{
							if(result[i].subList != null)
							{
								str+='<div class="col-sm-6">';
									str+='<p>'+result[i].subList[j].type+'</p>';
									if(result[i].subList[j].percentage != null && result[i].subList[j].percentage.length > 0)
									{
										if(type == 'Man Days Comparision' || type == 'Expenditure'){
											if(result[i].subList[j].parameter == 'Decrement')
												str+='<h2 class="text-center" style="color:red">'+result[i].subList[j].percentage+'</h2>';
											else if(result[i].subList[j].parameter == 'Increment')
												str+='<h2 class="text-center" style="color:green">'+result[i].subList[j].percentage+'</h2>';
										}else{
											str+='<h2 class="text-center">'+result[i].subList[j].percentage+'</h2>';
										}
									}else{
										str+='<h2 class="text-center">0</h2>';
									}
								str+='</div>';
							}else{
								str+='<div class="col-sm-6">';
									str+='<p>'+result[i].subList[j].type+'</p>';
									str+='<h2 class="text-center">0</h2>';
								str+='</div>';
							}
						}
						str+='</div>';
					str+='</div>';
				}
				
			}else if(levelId == 3 || levelId == "3")
			{
				if(result[i].type == 'DISTRICT')
				{
					if(result[i] != null)
					{
						
						if(result[i].percentage >= 100){
							str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 90 && result[i].percentage < 100){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 60 && result[i].percentage < 90){
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}
							if(type == 'FAperformance')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Field Assistant Performance">FA Performan..</h4>';
							}else if(type == 'SMC Trench')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="SMC Trenches">SMC Trench..</h4>';
							}else if(type == 'Imp to CD')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Improvements to Check Dams and Percolation Tanks">Improvements..</h4>';
							}else if(type == 'MPT_PT')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Mini Percolation Tanks and Percolation Tanks">Mini Perco..</h4>';
							}else if(type == 'GC Works')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Gully Control Works">Gully Contr..</h4>';
							}else if(type == 'CD_CW')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Check Dams and Check Walls">Check Dam..</h4>';
							}else if(type == 'IHHL')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Individual Household Latrine">Individual Ho..</h4>';
							}else if(type == 'GH')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Greening Of Hillocks">Greening O..</h4>';
							}else if(type == 'CC Roads1')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="CC Roads">CC Roads</h4>';
							}else if(type == 'Anganwadi')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Anganwadi Buildings">Anganwadi B..</h4>';
							}else if(type == 'GP Buildings1')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="GP Buildings">GP Build..</h4>';
							}else if(type == 'Mandal Buildings1')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Mandal Buildings">Mandal Bui..</h4>';
							}else if(type == 'OPGK-Perinnials')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Oorura Pasu Graasa Kshetralu - Perinnials">Oorura Pasu..</h4>';
							}else if(type == 'OPGK-Annuals')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Oorura Pasu Graasa Kshetralu - Annuals">Oorura Pasu..</h4>';
							}else if(type == 'NTR Rural House')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="NTR IHHL">NTR IHHL</h4>';
							}else if(type == 'Approach Roads to Fish PondsMCC')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Approach Roads to Fish Ponds">Approach Ro..</h4>';
							}else if(type == 'Construction of compound wallSchool Education Department')
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Construction of compound wall">Construction..</h4>';
							}else if(type.length > 12)
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
							}else{
								str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
							}
							str+='<small class="text-center font_weight">Achieved</small>';
							if(result[i].percentage != null && result[i].percentage.length > 0)
							{
								str+='<h2 class="text-center">'+result[i].percentage+'<small>%</small>';
							}else{
								str+='<h2 class="text-center">0<small>%</small>';
							}
							
							if(result[i].percentage >= 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 90 && result[i].percentage < 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 60 && result[i].percentage < 90){
								str+='<small><i class="fa fa-arrows-v" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else{
								str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}	
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Target</label>';
									if(result[i].target != null && result[i].target.length > 0)
									{
										if(result[0].parameter == 'Timely Payments'){
											str+='<h4>'+result[0].target+'%</h4>';
										}else{
											str+='<h4>'+result[0].target+'</h4>';
										}
									}else{
										str+='<h4>0</h4>';
									}
									
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									if(result[i].completed != null && result[i].completed.length > 0)
									{
										if(result[i].parameter == 'Timely Payments'){
											str+='<h4>'+result[i].completed+'%</h4>';
										}else{
											str+='<h4>'+result[0].completed+'</h4>';
										}
										
									}else{
										str+='<h4>0</h4>';
									}
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
							str+='<h2 class="text-center">0<small>%</small></h2>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Target</label>';
									str+='<h4>0</h4>';
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									str+='<h4>0</h4>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}
					
				}else if(result[i].type == 'STATE')
				{
					if(result[i] != null)
					{
						if(result[i].percentage >= 100){
							str+='<div class="panel-black-white panel-block-white-gold text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
						}else if(result[i].percentage >= 90 && result[i].percentage < 100){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
						}else if(result[i].percentage >= 60 && result[i].percentage < 90){
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
						}	
						str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - ACHIEVED</small>';
							if(result[i].percentage != null && result[i].percentage.length > 0)
							{
								str+='<h2 class="text-center">'+result[i].percentage+'</h2>';
							}else{
								str+='<h2 class="text-center">0</h2>';
							}
						str+='</div>';
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
							str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - ACHIEVED</small>';
							str+='<h2 class="text-center">0</h2>';
						str+='</div>';
					}
				}
				else if(type == 'Greenary works Chettu' || type == 'Agriculture Related Works' || type == 'Rural Sanitation Works' || type == 'Soil Moisture Conservation works Neeru' || type == 'Works in community lands' || type == 'IJP PROGRAM WORKS' || type == 'Institutional Development Works' || type == 'Road Works' || type == 'Water Harvesting Structures Neeru' || type == 'AH-Live Stock Related works' || type == "Soak Pits")
				{
					if(result[i] != null)
					{
						if(result[i].percentage >= 100){
							str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 90 && result[i].percentage < 100){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 60 && result[i].percentage < 90){
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}
						
							str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
							str+='<small class="text-center font_weight">Achieved</small>';
							if(result[i].percentage != null && result[i].percentage.length > 0)
							{
								str+='<h2 class="text-center">'+result[i].percentage+'<small>%</small>';
							}else{
								str+='<h2 class="text-center">0<small>%</small>';
							}
							
							if(result[i].percentage >= 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 90 && result[i].percentage < 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 60 && result[i].percentage < 90){
								str+='<small><i class="fa fa-arrows-v" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else{
								str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}	
						
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Sanctioned</label>';
									if(result[i].target != null && result[i].target > 0)
									{
										str+='<h4>'+result[0].target+'</h4>';
									}else{
										str+='<h4>0</h4>';
									}
									
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									if(result[i].completed != null && result[i].completed > 0)
									{
										str+='<h4>'+result[i].completed+'</h4>';
									}else{
										str+='<h4>0</h4>';
									}
								str+='</div>';
							str+='</div>';
						str+='</div>';
						if(levelId == 3 || levelId == "3"){
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
								str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - ACHIEVED</small>';
								str+='<h2 class="text-center">'+result[0].subList[0].percentage+'</h2>';
							str+='</div>';
						}
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
							str+='<h2 class="text-center">0<small>%</small></h2>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Target</label>';
									str+='<h4>0</h4>';
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									str+='<h4>0</h4>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}
				}
				else  if(type == 'Raising and Maintenance of Block Plantations' || type == 'Raising and Maintenance of nurseries' || type == 'Soil and Moisture Conservation Works' || type == 'Raising and Maintenance of Avenue plantations')
				{
					if(result[i] != null)
					{
						if(result[i].percentage >= 100){
							str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 90 && result[i].percentage < 100){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 60 && result[i].percentage < 90){
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}
						
							str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
							str+='<small class="text-center font_weight">Achieved</small>';
							if(result[i].percentage != null && result[i].percentage.length > 0)
							{
								str+='<h2 class="text-center">'+result[i].percentage+'<small>%</small>';
							}else{
								str+='<h2 class="text-center">0<small>%</small>';
							}
							
							if(result[i].percentage >= 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 90 && result[i].percentage < 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 60 && result[i].percentage < 90){
								str+='<small><i class="fa fa-arrows-v" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else{
								str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}	
						
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Target</label>';
									if(result[i].target != null && result[i].target > 0)
									{
										str+='<h4>'+result[0].target+'</h4>';
									}else{
										str+='<h4>0</h4>';
									}
									
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									if(result[i].completed != null && result[i].completed > 0)
									{
										str+='<h4>'+result[i].completed+'</h4>';
									}else{
										str+='<h4>0</h4>';
									}
								str+='</div>';
							str+='</div>';
						str+='</div>';
						if(levelId == 3 || levelId == "3"){
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
								str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - ACHIEVED</small>';
								str+='<h2 class="text-center">'+result[0].subList[0].percentage+'</h2>';
							str+='</div>';
						}
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
							str+='<h2 class="text-center">0<small>%</small></h2>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Target</label>';
									str+='<h4>0</h4>';
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									str+='<h4>0</h4>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}
				}
				else if(type == 'Renovation and Improvements to existing Check Dams Check Wall' || type == 'Road Formation Upto WBM GR II Including CD works' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || type == 'Construction Of Animal Hostel' || type == 'Roads for Unconnected Habitations 2011-12' || type == 'Construction of New Check Dam' || type == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || type == 'Construction of Food Grains Storage Structures of 250MT' || type == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || type == 'Construction of Village Haats Infrastructure fecilities' || type == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || type == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || type == 'Construction of Buildings for women self help group federation' || type == 'Work Site Facilities' || type == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || type == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || type == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || type == 'Production of Grafts in HNTC' || type == 'Improvements of RYTHU BAZAR' || type == 'Roads for Unconnected Habitations 2012-13 and afterwards' || type == 'HNTC Development' || type == 'New Open Well for Drinking water purpose' || type == 'Construction of Crematoria Burial Grounds' || type == 'Repairs to Existing Check Dam' || type == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || type == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || type == 'Construction of Food Grains Storage Structures of 500MT' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || type == 'Raising of Cashew bag seedlings for 2014-15' || type == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || type == 'Comprehensive Restoration of minor Irrigation Tank' || type == "Azolla Production Unit" || type == "Construction of silopits of 3 MTs capacity" || type == "Fodder trough for Cattle Cattle drinking water trough" || type == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || type == "Raising of Perinnial Fodder" || type == "Raising of Silvipasture clubbed with subabul plantation" || type == "Soak Pits"){
					if(result[i] != null)
					{
						if(result[i].percentage >= 100){
							str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 90 && result[i].percentage < 100){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else if(result[i].percentage >= 60 && result[i].percentage < 90){
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
						}
						
							str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
							str+='<small class="text-center font_weight">Achieved</small>';
							if(result[i].percentage != null && result[i].percentage.length > 0)
							{
								str+='<h2 class="text-center">'+result[i].percentage+'<small>%</small>';
							}else{
								str+='<h2 class="text-center">0<small>%</small>';
							}
							
							if(result[i].percentage >= 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 90 && result[i].percentage < 100){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].percentage >= 60 && result[i].percentage < 90){
								str+='<small><i class="fa fa-arrows-v" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else{
								str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}	
						
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
								if(type == "Azolla Production Unit" || type == "Construction of silopits of 3 MTs capacity" || type == "Fodder trough for Cattle Cattle drinking water trough" || type == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || type == "Raising of Perinnial Fodder" || type == "Raising of Silvipasture clubbed with subabul plantation")
									str+='<label style="font-size: 12px;">Target</label>';
								else
									str+='<label style="font-size: 12px;">Sanctioned</label>';
									if(result[i].target != null && result[i].target > 0)
									{
										str+='<h4>'+result[0].target+'</h4>';
									}else{
										str+='<h4>0</h4>';
									}
									
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									if(result[i].completed != null && result[i].completed > 0)
									{
										str+='<h4>'+result[i].completed+'</h4>';
									}else{
										str+='<h4>0</h4>';
									}
								str+='</div>';
							str+='</div>';
						str+='</div>';
						if(levelId == 3 || levelId == "3"){
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;">';
								str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - ACHIEVED</small>';
								str+='<h2 class="text-center">'+result[0].subList[0].percentage+'</h2>';
							str+='</div>';
						}
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
							str+='<h2 class="text-center">0<small>%</small></h2>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Target</label>';
									str+='<h4>0</h4>';
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									str+='<h4>0</h4>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}
				}
				else if(type == 'Man Days Comparision' || type == 'Expenditure'){
					if(result[i] != null)
					{
						if(result[i].parameter == 'Decrement'){
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 5px;">';
						}else if(result[i].parameter == 'Increment'){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 5px;">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;padding-bottom: 5px;">';
						}
						
							str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
							str+='<small class="text-center font_weight">Inc/Dec&nbsp;(%)</small>';
							
							if(type == 'Man Days Comparision'){
								str+='<h2 class="text-center"><span class="tooltipMans" data-toggle="tooltip" data-placement="top" title="Man Days Comparision b/n last Financial Year And This Financial Year">'+result[i].percentage+'</span><small>%</small>';
							}else if(type == 'Expenditure'){
								str+='<h2 class="text-center"><span class="tooltipMans"  data-toggle="tooltip" data-placement="top" title="Expenditure Comparision b/n Last Fin. Year Upto Present Month To This Fin. Year Upto This Month">'+result[i].percentage+'</span><small>%</small>';
							}
							
							if(result[i].parameter == 'Decrement'){
								str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}else if(result[i].parameter == 'Increment'){
								str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
							}
						
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
								if(type == 'Man Days Comparision'){
									str+='<label style="font-size: 12px;margin-bottom: 2px;">Last Fin Same Day</label>';
								} else if(type == 'Expenditure'){
									str+='<label style="font-size: 12px;margin-bottom: 2px;">Last Fin Upto Same&nbsp;Mnth</label>';
								} 
								
								if(type == 'Man Days Comparision'){
									str+='<h4>'+result[0].lastFinSameDay+'</h4>';
								} else if(type == 'Expenditure'){
									str+='<h4>'+result[0].total1718+'</h4>';
								}
									
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									if(type == 'Man Days Comparision'){
										str+='<label style="font-size: 12px;margin-bottom: 2px;">Fin As Of Today</label>';
									} else if(type == 'Expenditure'){
										str+='<label style="font-size: 12px;margin-bottom: 2px;">This Fin. Year Upto Present&nbsp;Mnth</label>';
									}
									
									if(type == 'Man Days Comparision'){
										str+='<h4>'+result[0].finAsOfToday+'</h4>';
									}else if(type == 'Expenditure'){
										str+='<h4>'+result[0].total1819+'</h4>';
									}
								str+='</div>';
							str+='</div>';
						str+='</div>';
						if(levelId == 3 || levelId == "3"){
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;padding-top: 5px;padding-bottom: 5px;">';
								//str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - Increment/Decrement (%)</small>';
								if(result[0].subList[0].parameter == 'Decrement'){
									str+='<small class="panel-block-white-title text-capitalize text-center" style="color:red">STATE&nbsp;LEVEL&nbsp;-&nbsp;Inc/Dec&nbsp;(%)</small>';
									str+='<h2 class="text-center" style="color:red">'+result[0].subList[0].percentage+'</h2>';
								}else if(result[0].subList[0].parameter == 'Increment'){
									str+='<small class="panel-block-white-title text-capitalize text-center" style="color:green">STATE&nbsp;LEVEL&nbsp;-&nbsp;Inc/Dec&nbsp;(%)</small>';
									str+='<h2 class="text-center" style="color:green">'+result[0].subList[0].percentage+'</h2>';
								}
								//str+='<h2 class="text-center">'+result[0].subList[0].percentage+'</h2>';
							str+='</div>';
						}
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
							str+='<h2 class="text-center">0<small>%</small></h2>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Target</label>';
									str+='<h4>0</h4>';
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label style="font-size: 12px;">Completed</label>';
									str+='<h4>0</h4>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}
				}
			}
		}
	}
	
	$("[overview-block='"+type+"']").html(str);
	$(".panel-block-white-title").tooltip();
	$(".tooltipMans").tooltip();
	if(type == blockName)
	{
		$("[overview-block='"+blockName+"']").trigger("click");
	}
	if(searchParams != null && type.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '') == searchParams.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, ''))
	{
		$('[overview-block="'+searchParams+'"]').trigger('click');
	}
	
}
$(document).on("click",".menuDataCollapse",function(){
	 
		$(".multi-level-selection-menu").css("display","none");
		$(".arrowIconChanged").find('.fa').removeClass("fa-chevron-up");
		$(".arrowIconChanged").find('.fa').addClass("fa-chevron-down");
		$("#projectData,#projectOverviewBlock").html('');
		var blockName = '';
		$(".panel-block-white").each(function(){
			if($(this).hasClass("active"))
			{
				blockName = $(this).attr("overview-block");
			}
		});
		$(".panel-block-white").removeClass("active");
		var locId = $(this).attr("attr_id");
		$("#selectedName").html($(this).html())
		var districtId = $("#selectedName").attr("attr_distId");
		var levelId = $(this).attr("attr_levelIdValue");
		$("#selectedName").attr("attr_levelid",levelId);
		$("#selectedName").attr("attr_id",locId)
		
		if($("#viewSwitchBtn li").hasClass("active"))
		{
			var blockName = '';
			$(".panel-block-white").each(function(){
				if($(this).hasClass("active"))
				{
					blockName = $(this).attr("overview-block");
				}
			});
			$(".panel-block-white").removeClass("active");
			var locId = $(this).attr("attr_id");
			$("#selectedName").html($(this).html())
			var districtId = $("#selectedName").attr("attr_distId");
			var levelId = $(this).attr("attr_levelIdValue");
			$("#selectedName").attr("attr_levelid",levelId);
			$("#selectedName").attr("attr_id",locId);
			
			var subLocType = '';
			var locationType = '';
			var divId = '';
			if(levelId == 2)
			{
				locationType = 'state';
				subLocType = 'state';
				divId = 'ConsolidatedViewstate'
				$("[overview-block='Weekly Comparision']").show();
			}else if(levelId == 3)
			{
				locationType = 'district';
				subLocType = 'district';
				divId = 'ConsolidatedViewdistrict'
				$("[overview-block='Weekly Comparision']").hide();
			}else if(levelId == 4)
			{
				locationType = 'constituency';
				subLocType = 'constituency';
				divId = 'ConsolidatedViewconstituency';
				districtId = $("#selectedName").attr("attr_distId");
				$("[overview-block='Weekly Comparision']").hide();
			}
			//getNREGSLevelWiseConsolidatedReportConsolidated(levelId,locationType,subLocType,locId,divId,districtId,'completed');
			projectDataConsolidated(levelId,locId,districtId)
			//getNREGSLevelWiseConsolidatedReport(levelId,locationType,subLocType,locId,divId,districtId);
			//projectDataConsolidated(levelId,locId,districtId);
		}
		
		if(levelId == 3)
		{
			for(var i in overViewArr)
			{
				$("[overview-block='"+overViewArr[i]+"']").html(spinner);
				if(overViewArr[i] == 'NTR 90 Days' || overViewArr[i] == 'Production of Bricks' || overViewArr[i] == 'Cattle Drinking Water Troughs' || overViewArr[i] == 'Raising of Perinnial Fodders' || overViewArr[i] == 'Fish Ponds' || overViewArr[i] == 'Fish Drying Platforms' || overViewArr[i] == 'NTR Rural House' || overViewArr[i] == 'OPGK-Perinnials' || overViewArr[i] == 'OPGK-Annuals')
				{
					getNREGSProjectsAbstractNew(overViewArr[i],'district',locId,blockName,levelId);
				}else if(overViewArr[i] == 'FA Vacancies')
				{
					getLocationWiseFAVacencies(overViewArr[i],'district','district',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Soak Pits'){
					getSoakPitsAbstractLevelsWiseData(overViewArr[i],'district','district',locId,levelId,'');
				}
				else if(overViewArr[i] == 'Material Availability')
					getMaterialAvailabilityStatusForFinancialYear(overViewArr[i],'district','','district',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				else if(overViewArr[i] == 'Not Yet Completed Works')
					getWorkCompletionData(overViewArr[i],'district','','district',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				else  if(overViewArr[i] == 'Raising and Maintenance of Block Plantations' || overViewArr[i] == 'Raising and Maintenance of nurseries' || overViewArr[i] == 'Soil and Moisture Conservation Works' || overViewArr[i] == 'Raising and Maintenance of Avenue plantations' || overViewArr[i] == 'Seed Dibbling' || overViewArr[i] == 'Nursery' || overViewArr[i] == 'Maintenance of Nurseries')
				{
					getNREGSForestProjectsAbstract(overViewArr[i],'district',locId,'',levelId);
				}else if(overViewArr[i] == 'Payments')
				{
					getNregaPaymentsAbsAndOverviewDtls(overViewArr[i],'district',locId,levelId,'abstract');
				}
				else if(overViewArr[i] == 'Greenary works Chettu' || overViewArr[i] == 'Agriculture Related Works' || overViewArr[i] == 'Rural Sanitation Works' || overViewArr[i] == 'Soil Moisture Conservation works Neeru' || overViewArr[i] == 'Works in community lands' || overViewArr[i] == 'IJP PROGRAM WORKS' || overViewArr[i] == 'Institutional Development Works' || overViewArr[i] == 'Road Works' || overViewArr[i] == 'Water Harvesting Structures Neeru' || overViewArr[i] == 'AH-Live Stock Related works'){
					getNregaOtherMCCAbstarctData(overViewArr[i],'district','','district',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}
				else if(overViewArr[i] == 'Renovation and Improvements to existing Check Dams Check Wall' || overViewArr[i] == 'Road Formation Upto WBM GR II Including CD works' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || overViewArr[i] == 'Construction Of Animal Hostel' || overViewArr[i] == 'Roads for Unconnected Habitations 2011-12' || overViewArr[i] == 'Construction of New Check Dam' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 250MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || overViewArr[i] == 'Construction of Village Haats Infrastructure fecilities' || overViewArr[i] == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || overViewArr[i] == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || overViewArr[i] == 'Construction of Buildings for women self help group federation' || overViewArr[i] == 'Work Site Facilities' || overViewArr[i] == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || overViewArr[i] == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || overViewArr[i] == 'Production of Grafts in HNTC' || overViewArr[i] == 'Improvements of RYTHU BAZAR' || overViewArr[i] == 'Roads for Unconnected Habitations 2012-13 and afterwards' || overViewArr[i] == 'HNTC Development' || overViewArr[i] == 'New Open Well for Drinking water purpose' || overViewArr[i] == 'Construction of Crematoria Burial Grounds' || overViewArr[i] == 'Repairs to Existing Check Dam' || overViewArr[i] == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || overViewArr[i] == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 500MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || overViewArr[i] == 'Raising of Cashew bag seedlings for 2014-15' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || overViewArr[i] == 'Comprehensive Restoration of minor Irrigation Tank' || overViewArr[i] == "Azolla Production Unit" || overViewArr[i] == "Construction of silopits of 3 MTs capacity" || overViewArr[i] == "Fodder trough for Cattle Cattle drinking water trough" || overViewArr[i] == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || overViewArr[i] == "Raising of Perinnial Fodder" || overViewArr[i] == "Raising of Silvipasture clubbed with subabul plantation"){
					getNregaCovergancePROtherLevelData(overViewArr[i],'district','','district',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == "Man Days Comparision"){
					getManWorkDaysOfNrega(overViewArr[i],'district','','district',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == "Expenditure"){
					getManWorksExpenditureAbstarct(overViewArr[i],'district','','district',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Daily Labour Turnout'){
					getFieldManDaysWorkDetails(overViewArr[i],'district','','district',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] != 'Weekly Comparision'){
					getNREGSAbstractDataByType(overViewArr[i],'district',locId,blockName,levelId,'onLoad');
				}
			}
			
		}else if(levelId == 4)
		{
			for(var i in overViewArr)
			{
				$("[overview-block='"+overViewArr[i]+"']").html(spinner);
				if(overViewArr[i] == 'NTR 90 Days' || overViewArr[i] == 'Production of Bricks' || overViewArr[i] == 'Cattle Drinking Water Troughs' || overViewArr[i] == 'Raising of Perinnial Fodders' || overViewArr[i] == 'Fish Ponds' || overViewArr[i] == 'Fish Drying Platforms' || overViewArr[i] == 'NTR Rural House' || overViewArr[i] == 'OPGK-Perinnials' || overViewArr[i] == 'OPGK-Annuals')
				{
					getNREGSProjectsAbstractNewFrConstituency(overViewArr[i],'constituency',locId,districtId,'',levelId);
				}else if(overViewArr[i] == 'FA Vacancies')
				{
					getLocationWiseFAVacencies(overViewArr[i],'constituency','','constituency',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Soak Pits'){
					getSoakPitsAbstractLevelsWiseData(overViewArr[i],'constituency','constituency',locId,levelId,'');
				}
				else if(overViewArr[i] == 'Material Availability')
					getMaterialAvailabilityStatusForFinancialYear(overViewArr[i],'constituency','','constituency',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				else if(overViewArr[i] == 'Not Yet Completed Works')
					getWorkCompletionData(overViewArr[i],'constituency','','constituency',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				else  if(overViewArr[i] == 'Raising and Maintenance of Block Plantations' || overViewArr[i] == 'Raising and Maintenance of nurseries' || overViewArr[i] == 'Soil and Moisture Conservation Works' || overViewArr[i] == 'Raising and Maintenance of Avenue plantations' || overViewArr[i] == 'Seed Dibbling' || overViewArr[i] == 'Nursery' || overViewArr[i] == 'Maintenance of Nurseries')
				{
					getNREGSForestProjectsAbstract(overViewArr[i],'constituency',locId,'',levelId);
				}else if(overViewArr[i] == 'Payments')
				{
					getNregaPaymentsAbsAndOverviewDtls(overViewArr[i],'constituency',locId,levelId,'abstract');
				}else if(overViewArr[i] == 'Greenary works Chettu' || overViewArr[i] == 'Agriculture Related Works' || overViewArr[i] == 'Rural Sanitation Works' || overViewArr[i] == 'Soil Moisture Conservation works Neeru' || overViewArr[i] == 'Works in community lands' || overViewArr[i] == 'IJP PROGRAM WORKS' || overViewArr[i] == 'Institutional Development Works' || overViewArr[i] == 'Road Works' || overViewArr[i] == 'Water Harvesting Structures Neeru' || overViewArr[i] == 'AH-Live Stock Related works'){
					getNregaOtherMCCAbstarctData(overViewArr[i],'constituency','','constituency',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Renovation and Improvements to existing Check Dams Check Wall' || overViewArr[i] == 'Road Formation Upto WBM GR II Including CD works' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || overViewArr[i] == 'Construction Of Animal Hostel' || overViewArr[i] == 'Roads for Unconnected Habitations 2011-12' || overViewArr[i] == 'Construction of New Check Dam' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 250MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || overViewArr[i] == 'Construction of Village Haats Infrastructure fecilities' || overViewArr[i] == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || overViewArr[i] == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || overViewArr[i] == 'Construction of Buildings for women self help group federation' || overViewArr[i] == 'Work Site Facilities' || overViewArr[i] == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || overViewArr[i] == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || overViewArr[i] == 'Production of Grafts in HNTC' || overViewArr[i] == 'Improvements of RYTHU BAZAR' || overViewArr[i] == 'Roads for Unconnected Habitations 2012-13 and afterwards' || overViewArr[i] == 'HNTC Development' || overViewArr[i] == 'New Open Well for Drinking water purpose' || overViewArr[i] == 'Construction of Crematoria Burial Grounds' || overViewArr[i] == 'Repairs to Existing Check Dam' || overViewArr[i] == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || overViewArr[i] == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 500MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || overViewArr[i] == 'Raising of Cashew bag seedlings for 2014-15' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || overViewArr[i] == 'Comprehensive Restoration of minor Irrigation Tank' || overViewArr[i] == "Azolla Production Unit" || overViewArr[i] == "Construction of silopits of 3 MTs capacity" || overViewArr[i] == "Fodder trough for Cattle Cattle drinking water trough" || overViewArr[i] == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || overViewArr[i] == "Raising of Perinnial Fodder" || overViewArr[i] == "Raising of Silvipasture clubbed with subabul plantation"){
					getNregaCovergancePROtherLevelData(overViewArr[i],'constituency','','constituency',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == "Man Days Comparision"){
					getManWorkDaysOfNrega(overViewArr[i],'constituency','','constituency',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == "Expenditure"){
						getManWorksExpenditureAbstarct(overViewArr[i],'constituency','','constituency',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Daily Labour Turnout'){
					getFieldManDaysWorkDetails(overViewArr[i],'constituency','','constituency',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] != 'Weekly Comparision'){
					getNREGSAbstractDataByTypeFrConstituency(overViewArr[i],'constituency',locId,districtId,'',levelId);
				}
			}
		}else if(levelId == 2)
		{
			for(var i in overViewArr)
			{
				$("[overview-block='"+overViewArr[i]+"']").html(spinner);
				if(overViewArr[i] == 'NTR 90 Days' || overViewArr[i] == 'Production of Bricks' || overViewArr[i] == 'Cattle Drinking Water Troughs' || overViewArr[i] == 'Raising of Perinnial Fodders' || overViewArr[i] == 'Fish Ponds' || overViewArr[i] == 'Fish Drying Platforms' || overViewArr[i] == 'NTR Rural House' || overViewArr[i] == 'OPGK-Perinnials' || overViewArr[i] == 'OPGK-Annuals')
				{
					getNREGSProjectsAbstractNew(overViewArr[i],'state',locId,blockName,levelId);
				}else if(overViewArr[i] == 'Soak Pits')
				{
					getSoakPitsAbstractLevelsWiseData(overViewArr[i],'state','state','0',2,blockName);
				}else if(overViewArr[i] == 'Weekly Comparision')
				{
					getApWeeklyAcheivementAbstractData(overViewArr[i],'state',locId,blockName,levelId);
				}
				else  if(overViewArr[i] == 'Raising and Maintenance of Block Plantations' || overViewArr[i] == 'Raising and Maintenance of nurseries' || overViewArr[i] == 'Soil and Moisture Conservation Works' || overViewArr[i] == 'Raising and Maintenance of Avenue plantations' || overViewArr[i] == 'Seed Dibbling' || overViewArr[i] == 'Nursery' || overViewArr[i] == 'Maintenance of Nurseries')
				{
					getNREGSForestProjectsAbstract(overViewArr[i],'state',"0",'',2);
				}else if(overViewArr[i] == 'FA Vacancies')
				{
					getLocationWiseFAVacencies(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}
				else if(overViewArr[i] == 'Material Availability')
					getMaterialAvailabilityStatusForFinancialYear(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				else if(overViewArr[i] == 'Not Yet Completed Works')
					getWorkCompletionData(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				else if(overViewArr[i] == 'Payments')
				{
					getNregaPaymentsAbsAndOverviewDtls(overViewArr[i],'state',locId,levelId,'abstract');
				}else if(overViewArr[i] == 'Greenary works Chettu' || overViewArr[i] == 'Agriculture Related Works' || overViewArr[i] == 'Rural Sanitation Works' || overViewArr[i] == 'Soil Moisture Conservation works Neeru' || overViewArr[i] == 'Works in community lands' || overViewArr[i] == 'IJP PROGRAM WORKS' || overViewArr[i] == 'Institutional Development Works' || overViewArr[i] == 'Road Works' || overViewArr[i] == 'Water Harvesting Structures Neeru' || overViewArr[i] == 'AH-Live Stock Related works'){
					getNregaOtherMCCAbstarctData(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Renovation and Improvements to existing Check Dams Check Wall' || overViewArr[i] == 'Road Formation Upto WBM GR II Including CD works' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting SC habitation or Locality in Plain areas' || overViewArr[i] == 'Construction Of Animal Hostel' || overViewArr[i] == 'Roads for Unconnected Habitations 2011-12' || overViewArr[i] == 'Construction of New Check Dam' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in SC Habitation or Locality' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 250MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works in Tribal areas' || overViewArr[i] == 'Construction of Village Haats Infrastructure fecilities' || overViewArr[i] == 'Providing BT road for Sri Anantha Padmanabha Swamy Temple Hill top Road at Padmabnabham' || overViewArr[i] == 'Construction of Post Harvest facilities Drying Platform including Pucca storage facilities of 100MT' || overViewArr[i] == 'Construction of Buildings for women self help group federation' || overViewArr[i] == 'Work Site Facilities' || overViewArr[i] == 'Renovation and Improvements to existing Percolation Tank Mini Percolation tank' || overViewArr[i] == 'GP level BNRGSK knowledge resource centre 2012-13 and afterwards' || overViewArr[i] == 'Formation of internal road upto WBM Gr II surface including CD works and Drains in other Habitation or Locality' || overViewArr[i] == 'Production of Grafts in HNTC' || overViewArr[i] == 'Improvements of RYTHU BAZAR' || overViewArr[i] == 'Roads for Unconnected Habitations 2012-13 and afterwards' || overViewArr[i] == 'HNTC Development' || overViewArr[i] == 'New Open Well for Drinking water purpose' || overViewArr[i] == 'Construction of Crematoria Burial Grounds' || overViewArr[i] == 'Repairs to Existing Check Dam' || overViewArr[i] == 'Formation of Road upto Gravel surface including CD works to agriculture fields' || overViewArr[i] == 'Formation of Approach Road upto Gravel surface including CD works to Burial ground' || overViewArr[i] == 'Construction of Food Grains Storage Structures of 500MT' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting other habitation or Locality in Plain areas' || overViewArr[i] == 'Raising of Cashew bag seedlings for 2014-15' || overViewArr[i] == 'Formation of Road upto WBM Gr II surface including CD works Connecting ST habitation or Locality in Plain areas' || overViewArr[i] == 'Comprehensive Restoration of minor Irrigation Tank' || overViewArr[i] == "Azolla Production Unit" || overViewArr[i] == "Construction of silopits of 3 MTs capacity" || overViewArr[i] == "Fodder trough for Cattle Cattle drinking water trough" || overViewArr[i] == "Raising of Fodder Maize Fodder Jowar Nutrifeed Sugargraze" || overViewArr[i] == "Raising of Perinnial Fodder" || overViewArr[i] == "Raising of Silvipasture clubbed with subabul plantation"){
					getNregaCovergancePROtherLevelData(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
				}else if(overViewArr[i] == "Man Days Comparision"){
					getManWorkDaysOfNrega(overViewArr[i],'state','','state',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == "Expenditure"){
						getManWorksExpenditureAbstarct(overViewArr[i],'state','','state',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] == 'Daily Labour Turnout'){
					getFieldManDaysWorkDetails(overViewArr[i],'state','','state',locId,overViewArr[i],'',overViewArr[i],'Abstract',levelId);
				}else if(overViewArr[i] != 'Weekly Comparision'){
					getNREGSAbstractDataByType(overViewArr[i],'state',locId,blockName,levelId,'onLoad');
				}
			}
		}
});
var stateArr = [{'name':'Andhra Pradesh','type':1}];
collapseMenu(1,stateArr,'multi-level-selection-menu');
function getAllNregaSubLocationDetails(divId,levelId,locationScopeId,type){
	$("."+divId).html(spinner);
	//var type = 'constituency' //district to constituency (only consider type like this)
	var json = {
		searchLevelId		: levelId,//3
		menuLvelValue		: locationScopeId,//"03"
		type 				: type//"constituency"//		  
	}
	$.ajax({
		url : "getAllNregaSubLocationDetails",     
		data : JSON.stringify(json),
		type : "POST",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			collapseMenu(levelId,result,divId)
		}
	});
}
function collapseMenu(id,resultArr,buildId)
{
	if(id == 2)
	{
		levelIdValue = 3;
	}else if(id == 3)
	{
		levelIdValue = 4;
	}else{
		levelIdValue = 2;
	}
	var collapse = '';
	
	collapse+='<div class="panel-group dashedBorder" id="accordion'+id+'" role="tablist" aria-multiselectable="true">';
	for(var i in resultArr)
	{
		collapse+='<div class="panel panel-default panelExpand">';
			collapse+='<div class="panel-heading" role="tab" id="heading'+resultArr[i].type+'">';
				collapse+='<h4 class="panel-title">';
					if(levelIdValue == 2 || levelIdValue == 3)
					//if(levelIdValue == 2)
					{
						collapse+='<a role="button" style="height:10px;width:10px;display:inline-block;" attr_levelIdValue="'+levelIdValue+'" attr_distId="'+resultArr[i].type+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].type+'" attr_targetId="collapseMenu'+resultArr[i].type+'Id"  class="panelCollapseIcon panelCollapseIconClick collapsed" data-toggle="collapse" data-parent="#accordion'+id+'" href="#collapse'+resultArr[i].type+'" aria-expanded="true" aria-controls="collapse'+resultArr[i].type+'">&nbsp;</a>';
					}
					collapse+='<span style="padding-left:10px;cursor:pointer;" class="menuDataCollapse"  attr_levelIdValue="'+levelIdValue+'" attr_distid="" attr_levelId="'+id+'" attr_id="'+resultArr[i].type+'" attr_targetId="collapseMenu'+resultArr[i].type+'Id" >'+resultArr[i].name+'</span>';
				collapse+='</h4>';
			collapse+='</div>';
			collapse+='<div id="collapse'+resultArr[i].type+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+resultArr[i].type+'">';
				collapse+='<div class="panel-body">';
					collapse+='<div class="collapseMenu'+resultArr[i].type+'Id"></div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	}
	collapse+='</div>';
	$("."+buildId).html(collapse);
}

$(document).on("click",".panelCollapseIconClick",function(e){
	e.stopPropagation();
	var buildId = $(this).attr("attr_targetId");
	var locationScopeId = $(this).attr("attr_id");
	var levelId = $(this).attr("attr_levelIdValue");
	$("#selectedName").attr("attr_distid","");
	var type = '';
	if(levelId == 4)
	{
		type='';
		locationScopeId = locationScopeId;
	}
	if(levelId == "3" || levelId == 3)
	{
		locationScopeId = $(this).attr("attr_distid");
		type='constituency';
		$("#selectedName").attr("attr_distid",locationScopeId);
	}
	getAllNregaSubLocationDetails(buildId,levelId,locationScopeId,type)
});
$(".multi-level-selection-menu").hide();
$(document).on("click",function(){
	$(".multi-level-selection-menu").hide();
});
$(document).on("click","#selectedName,#selectedName1",function(e){
	e.stopPropagation();
	$(".multi-level-selection-menu").show();
});
var modalAfromRange,modaltoRange,modallocationType,modallocationId,modalRange = '';

$(document).on("click",".cuntCls",function(){
	$("#LabBudgtPanExBodyId").html('');
	$("#nregsPanExpModalId").modal("show");
	$("#LabBudgtPanExBodyId").html(spinner);
	$("#LabBudgtPanExBodyOverviewId").html(spinner);
	var range = $(this).attr("attr_range");
	var locationType = $(this).attr("attr_location_type");
	var locationId = $(this).attr("attr_loaction_id");
	var radioType = $(this).attr("attr_radioType");
	var districtId = $("#selectedName").attr("attr_distid");
	var rangeArr;
	var fromRange;
	var toRange;
	if(range == "Below 1"){
		 fromRange = 0;
		 toRange = 1;
	}else if(range == "Above 400"){
		fromRange = 400;
		 toRange = 5000;
	}else if(range == "0"){
		fromRange = 0;
		 toRange = 0;
	}else{
		rangeArr = range.split("-");
		 fromRange = rangeArr[0];
		 toRange = rangeArr[1];
	}
	modalAfromRange = fromRange;
	modaltoRange = toRange;
	modallocationType = locationType;
	modallocationId = locationId;
	modalRange=range;
		$("#larBudExpHeadingId").html('No of Panchayaties Vs Expenditure In Lakhs('+range+')');
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: locationType,
		locationId : locationId,
		fromRange : fromRange,
		toRange : toRange,
		districtId : districtId, 
		pType : radioType
		
	}
	$.ajax({
		url : "getNregaLabourBudgetPanchatVsExpData",     
		data : JSON.stringify(json),
		type : "POST",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			buildLabourBudgetPanExpData(result,'tableView',range);
		}
	});
	$.ajax({
		url : "getNregaPanchatVsExpLevelWiseCountsData",     
		data : JSON.stringify(json),
		type : "POST",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			buildLabourBudgetPanExpData(result,'overView',range);
		}
	});
	
});
function getNregaLabourBudgetPanchatVsExpData(locationType,locationId,fromRange,toRange,districtId,range){
	$("#LabBudgtPanExBodyId").html('');
	$("#LabBudgtPanExBodyId").html(spinner);
	$("#larBudExpHeadingId").html('No of Panchayaties Vs Expenditure In Lakhs('+range+')');
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: locationType,
		locationId : locationId,
		fromRange : fromRange,
		toRange : toRange,
		districtId : districtId
		
	}
	$.ajax({
		url : "getNregaLabourBudgetPanchatVsExpData",     
		data : JSON.stringify(json),
		type : "POST",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			buildLabourBudgetPanExpData(result,'tableView',range);
		}
	});
	}
function buildLabourBudgetPanExpData(result,viewType,range){
	if(viewType == 'tableView')
	{
		var str='';
		if(range == "Below 1"){
			 fromRange = 0;
			 toRange = 1;
		}else if(range == "Above 400"){
			fromRange = 400;
			 toRange = 5000;
		}else if(range == "0"){
			fromRange = 0;
			 toRange = 0;
		}else{
			rangeArr = range.split("-");
			 fromRange = rangeArr[0];
			 toRange = rangeArr[1];
		}
		str+='<div class="row">';
			str+='<div class="col-sm-12"><h4>No of Panchayaties Vs Expenditure In Lakhs('+range+')</h4></div></div>';
		str+='</div>';
		str+='<div class="row">';
			str+='<div class="col-sm-12">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered" id="larBudExpTableId">';
						str+='<thead>';
							str+='<th>District</th>';
							str+='<th>Assembly</th>';
							str+='<th>Mandal</th>';
							str+='<th>Panchayat</th>';
							str+='<th>Total Expenditure</th>';
							str+='<th>Status</th>';
							str+='<th>Comment</th>';
							str+='<th>Action Plan</th>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result){
							str+='<tr>';
								str+='<td>'+result[i].district+'</td>';
								str+='<td>'+result[i].constituency+'</td>';
								str+='<td>'+result[i].mandal+'</td>';
								if(loggedInUserId == 1){
								str+='<td>'+result[i].panchayat+'<i class="glyphicon glyphicon-info-sign pull-right modalIconOpen"  style="cursor:pointer;" title="click here to update"  attr_unicode="'+result[i].uniqueCode+'" attr_componentId="'+result[i].componentId+'" attr_status_id="'+result[i].statusId+'" attr_fromrange="'+modalAfromRange+'" attr_torange="'+modaltoRange+'" attr_locationType="'+modallocationType+'" attr_locationVal="'+modallocationId+'" attr_range="'+modalRange+'" attr_comments ="'+result[i].comments+'" attr_actionPlan ="'+result[i].actionPlan+'" attr_panchayat="'+result[i].panchayat+'"></i></td>';
								}else{
									str+='<td>'+result[i].panchayat+'<h5 attr_unicode="'+result[i].uniqueCode+'" attr_componentId="'+result[i].componentId+'" attr_status_id="'+result[i].statusId+'"></h5></td>';
								}
								str+='<td>'+result[i].totalExpenditure+'</td>';
								if(result[i].status != null){
								str+='<td>'+result[i].status+'</td>';
								}else{
									str+='<td>-</td>';
								}	
								if(result[i].comments != null){
								str+='<td>'+result[i].comments+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(result[i].actionPlan != null){
								str+='<td>'+result[i].actionPlan+'</td>';
								}else{
									str+='<td>-</td>';
								}
							str+='</tr>';
						}
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		$("#LabBudgtPanExBodyId").html(str);
		$("#larBudExpTableId").dataTable({
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   'Labour Budget',
					filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o"></i>',
					titleAttr: 'PDF',
					title:	   'Labour Budget',
					filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
					orientation: "landscape",
					pageSize:'A3',
					customize: function (doc) {
						doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
					}
				}
			]
		});
	}else if(viewType == 'overView'){
		var str1='';
		str1+='<div class="row">';
			str1+='<div class="col-sm-12"><h4>Overview</h4></div></div>';
		str1+='</div>';
		str1+='<div class="row m_top20">';
			str1+='<div class="col-sm-4 blockHeights">';
				str1+='<div class="blockHeightsScroll">';
					str1+='<table class="table table-bordered dataTableCls">';
						str1+='<thead>';
							str1+='<th>District</th>';
							str1+='<th>Count</th>';
						str1+='</thead>';
						str1+='<tbody>';
						for(var i in result){
							str1+='<tr>';
								str1+='<td>'+result[i].district+'</td>';
								str1+='<td>'+result[i].count+'</td>';
							str1+='</tr>';
						}
						str1+='</tbody>';
					str1+='</table>';
				str1+='</div>';
			str1+='</div>';
			str1+='<div class="col-sm-4 blockHeights">';
				str1+='<div class="blockHeightsScroll">';
					str1+='<table class="table table-bordered dataTableCls">';
						str1+='<thead>';
							str1+='<th>Constituency</th>';
							str1+='<th>Count</th>';
						str1+='</thead>';
						str1+='<tbody>';
						for(var i in result){
							for(var j in result[i].subList)
							{
								str1+='<tr>';
									str1+='<td>'+result[i].subList[j].constituency+'</td>';
									str1+='<td>'+result[i].subList[j].count+'</td>';
								str1+='</tr>';
							}
						}
						str1+='</tbody>';
					str1+='</table>';
				str1+='</div>';
			str1+='</div>';
			str1+='<div class="col-sm-4 blockHeights">';
				str1+='<div class="blockHeightsScroll">';
					str1+='<table class="table table-bordered dataTableCls">';
						str1+='<thead>';
							str1+='<th>Mandal</th>';
							str1+='<th>Count</th>';
						str1+='</thead>';
						str1+='<tbody>';
						for(var i in result){
							for(var j in result[i].subList)
							{
								for(var k in result[i].subList[j].subList)
								{
									str1+='<tr>';
										str1+='<td>'+result[i].subList[j].subList[k].mandal+'</td>';
										str1+='<td>'+result[i].subList[j].subList[k].count+'</td>';
									str1+='</tr>';	
								}
							}
							
						}
						str1+='</tbody>';
					str1+='</table>';
				str1+='</div>';
			str1+='</div>';
		str1+='</div>';
		$("#LabBudgtPanExBodyOverviewId").html(str1);
		//$(".blockHeights").height("400px");
		$(".blockHeightsScroll").mCustomScrollbar();
		$(".dataTableCls").dataTable({
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   'Labour Budget',
					filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o"></i>',
					titleAttr: 'PDF',
					title:	   'Labour Budget',
					filename:  'Labour Budget'+moment().format("DD/MMMM/YYYY  HH:MM"),
					orientation: "landscape",
					pageSize:'A3',
					customize: function (doc) {
						doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
					}
				}
			]
		});
	}
	
}

$(document).on("click","#selectedName,#selectedName1",function(){
	$(".arrowIconChanged").parent().find('i.fa').removeClass("fa-chevron-down");
	$(".arrowIconChanged").parent().find('i.fa').addClass("fa-chevron-up");
});
$(document).on("click","[attr_radioBtn]",function(){
	var blockName = $(this).attr("name");
	var locationType = $(this).attr("attr_locationType");
	var levelId = $(this).attr("attr_levelId");
	var locationId = $(this).attr("overview-locationId");
	var menuLocationType = '';
	var menuLocationId = '';
	var buildType = $(this).attr("attr_name");
	if(levelId == 2)
	{
		menuLocationId = "-1";
		menuLocationType = "state";
	}else if(levelId == 3)
	{
		menuLocationId = locationId;
		menuLocationType = "district";
	}
	getNregaPaymentsDtlsLocationWise(blockName,locationType,menuLocationType,menuLocationId,buildType,'');
});

function getNREGSProjectsAbstractNewFrConstituency(type,locType,locId,districtId,blockName,levelId)
{
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		type : type,
		locationType: locType,
		locationId : locId,
		districtId : districtId
	}
	$.ajax({
		url: 'getNREGSProjectsAbstractNewFrConstituency',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(type,ajaxresp,blockName,locId,locType,levelId)
		}
	});
}

function getNREGSAbstractDataByTypeFrConstituency(type,locType,locId,districtId,blockName,levelId)
{
	var districtId = $("#selectedName").attr("attr_distId");
	if(type == 'FAperformance')
	{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : '2017-05-30',
			type : type,
			locationType: locType,
			locationId : locId,
			districtId : districtId
		}
	}else{
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			type : type,
			locationType: locType,
			locationId : locId,
			districtId : districtId
		}
	}
	
	$.ajax({
		url: 'getNREGSAbstractDataByTypeFrConstituency',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(type,ajaxresp,blockName,locId,locType,levelId)
		}
	});
}

//IHHL Ajax Call
//getIhhlAbstractData();
//getIhhlOverviewData();
//getLocationIhhlData();

function getIhhlAbstractData()
{
	
	var json = {
		fromDateStr:"201704",
        toDateStr:"201707",
        location:"state",
        locationIdStr:"01"
	  }
	$.ajax({
		url: 'getIhhlAbstractData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			console.log(ajaxresp);
		}
	});
}
function getIhhlOverviewData()
{
	var json = {
		fromDateStr:"201704",
        toDateStr:"201707",
        location:"state",
        locationIdStr:"01"
	}
	$.ajax({
		url: 'getIhhlOverviewData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			console.log(ajaxresp);
		}
	});
}
function getLocationIhhlData()
{
	var json = {
		fromDateStr:"201704",
        toDateStr:"201707",
        location:"state",
        locationIdStr:"01",
		subLocation:"district"
	}
	$.ajax({
		url: 'getLocationIhhlData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			  console.log(ajaxresp);
		}
	});
}

function getNregaPaymentsAbsAndOverviewDtls(type,locType,locId,levelId,buildType)
{
	var districtId = $("#selectedName").attr("attr_distid");
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: locType,
		locationId : locId,
		sublocaType :locType,
		sector : buildType,
		districtId : districtId
	}
	$.ajax({
		url: 'getNregaPaymentsAbsAndOverviewDtls',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'abstract')
			{
				buildNREGSAbstractDataByTypeNew(type,ajaxresp,'',locId,locType,levelId);
			}else if(buildType == 'overview')
			{
				buildPaymentsOverviewData(ajaxresp,type);
			}
		}
	});
}

function getNregaDeptWisePaymentsDtlsLocationWise(divIdd,locationType,menuLocationType,menuLocationId,buildType,blockName,department)
{
	$("#"+divIdd).html(spinner);
	var theadArr = 'PaymentsDeptWise';
	
	var menuSelName = $("#selectedName").text();
	if(buildType == 'Wage')
	{
		buildType = 'W'
		
	}else if(buildType == 'Material')
	{
		buildType = 'M'
	}else if(buildType == 'Total')
	{
		buildType = 'T'
	}
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		locationId : menuLocationId,
		sublocaType :locationType,
		type:buildType,
		deptType : department,
	}
	$.ajax({
		url: 'getNregaPaymentsDeptDtlsLocationWise',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					if(ajaxresp[i].subList != null && ajaxresp[i].subList.length > 0){
						for(var j in ajaxresp[i].subList){
							str+='<tr>';
								if(locationType == "state"){
									str+='<td class="text-capitalize">'+locationType+'</td>';
								}
								else if(locationType == "district" && menuLocationType == "district"){
									str+='<td class="text-capitalize">'+menuSelName+'</td>';
								}
								else if(locationType == "district"){
									str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
								}
								else if(locationType == "constituency"){
									str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
									str+='<td class="text-capitalize">'+ajaxresp[i].constName+'</td>';
								}
								else if(locationType == "mandal"){
									str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
									str+='<td class="text-capitalize">'+ajaxresp[i].constName+'</td>';
									str+='<td class="text-capitalize">'+ajaxresp[i].mandalName+'</td>';
								}
								else if(locationType == "panchayat"){
									str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
									str+='<td class="text-capitalize">'+ajaxresp[i].constName+'</td>';
									str+='<td class="text-capitalize">'+ajaxresp[i].mandalName+'</td>';
									str+='<td class="text-capitalize">'+ajaxresp[i].panchayatName+'</td>';
								}
								//var pending = 
								str+='<td>'+ajaxresp[i].subList[j].departMentName+'</td>';
								str+='<td>'+buildType+'</td>';
								
								str+='<td>'+ajaxresp[i].subList[j].totalAmount+'</td>';
								str+='<td>'+ajaxresp[i].subList[j].totalPendinAmount+'</td>';
								str+='<td>'+ajaxresp[i].subList[j].notGeneratedWagesAmount+'</td>';
								//str+='<td>'+ajaxresp[i].generatedWageAmount+'</td>';
								str+='<td>'+ajaxresp[i].subList[j].notUploadedWagesAmount+'</td>';
								//str+='<td>'+ajaxresp[i].uploadedWageAmount+'</td>';
								str+='<td>'+ajaxresp[i].subList[j].notSentBankWageAmount+'</td>';
								//str+='<td>'+ajaxresp[i].sentBankWageAmount+'</td>';
								//str+='<td>'+ajaxresp[i].completedWageAmount+'</td>';
								str+='<td>'+ajaxresp[i].subList[j].rejectedWagesAmount+'</td>';
								str+='<td>'+ajaxresp[i].subList[j].pendingAtBankAmount+'</td>';
								//str+='<td>'+ajaxresp[i].rejectedWagesAmount+'</td>';
								//str+='<td>'+ajaxresp[i].responsePendingWageAmount+'</td>';
								str+='<td>'+ajaxresp[i].subList[j].reprocessPendingWageAmount+'</td>';
							str+='</tr>';
						}
					}
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

function getNregaPaymentsDtlsLocationWise(divIdd,locationType,menuLocationType,menuLocationId,buildType,blockName)
{
	$("#"+divIdd).html(spinner);
	var theadArr = 'Payments';
	
	var menuSelName = $("#selectedName").text();
	if(buildType == 'Wage')
	{
		buildType = 'W'
		
	}else if(buildType == 'Material')
	{
		buildType = 'M'
	}else if(buildType == 'All')
	{
		buildType = 'All'
	}else if(buildType == 'Total')
	{
		if(locationType == 'state')
		{
			buildType = '-Total'
		}else if(locationType == 'district')
		{
			buildType = '-Sub Total'
		}else
		{
			buildType = 'Sub Total'
		}
		
	}
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		locationId : menuLocationId,
		sublocaType :locationType,
		type:buildType,
	}
	$.ajax({
		url: 'getNregaPaymentsDtlsLocationWise',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'W')
			{
				buildType = 'Wage'
				
			}else if(buildType == 'M')
			{
				buildType = 'Material'
			}else if(buildType == 'All')
			{
				buildType = 'All'
			}
			if(locationType == 'state')
			{
				if(buildType == 'Total')
				{
					buildType = 'Total'
				}
			}else if(locationType == 'district')
			{
				buildType = 'Total'
			}else
			{
				buildType = 'Total'
			}
			var str = '';
			var pendingAmount = 0;
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district" && menuLocationType == "district"){
							str+='<td class="text-capitalize">'+menuSelName+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constName+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandalName+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandalName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayatName+'</td>';
						}
						//var pending = 
						pendingAmount = parseFloat(ajaxresp[i].totalPendinAmount) +parseFloat(ajaxresp[i].pendingAtBankAmount);
						str+='<td>'+ajaxresp[i].type+'</td>';
						str+='<td>'+ajaxresp[i].totalAmount+'</td>';
						str+='<td class="toolTipCls" data-toggle="tooltip" data-placement="top" title="Actual Amount: '+ajaxresp[i].totalPendinAmount+'\nPending at Bank: '+ajaxresp[i].pendingAtBankAmount+'">'+pendingAmount.toFixed(2)+'</td>';
						//str+='<td>'+ajaxresp[i].totalPendinAmount+'</td>';
						str+='<td>'+ajaxresp[i].notGeneratedWagesAmount+'</td>';
						//str+='<td>'+ajaxresp[i].generatedWageAmount+'</td>';
						str+='<td>'+ajaxresp[i].notUploadedWagesAmount+'</td>';
						//str+='<td>'+ajaxresp[i].uploadedWageAmount+'</td>';
						str+='<td>'+ajaxresp[i].notSentBankWageAmount+'</td>';
						//str+='<td>'+ajaxresp[i].sentBankWageAmount+'</td>';
						//str+='<td>'+ajaxresp[i].completedWageAmount+'</td>';
						str+='<td>'+ajaxresp[i].rejectedWagesAmount+'</td>';
						str+='<td>'+ajaxresp[i].pendingAtBankAmount+'</td>';
						//str+='<td>'+ajaxresp[i].rejectedWagesAmount+'</td>';
						//str+='<td>'+ajaxresp[i].responsePendingWageAmount+'</td>';
						str+='<td>'+ajaxresp[i].reprocessPendingWageAmount+'</td>';
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

function getNregaOtherMCCLevelData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		groupName : mccType,
		locationId : menuLocationId,
		sublocationType : locationTypeNew,
		districtId:districtId
	}
	
	$.ajax({
		url: 'getNregaOtherMCCLevelData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'Abstract')
			{
				buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
			}else{
				var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state"){
								str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
							}
							else if(locationTypeNew == "district"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							}
							else if(locationTypeNew == "constituency"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							}
							else if(locationTypeNew == "mandal"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							}
							else if(locationTypeNew == "panchayat"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							}
							
							str+='<td>'+ajaxresp[i].target+'</td>';
							str+='<td>'+ajaxresp[i].grounded+'</td>';
							
							var groundValue = ajaxresp[i].grounded;
							var targetValue = ajaxresp[i].target;
							var groundedPerc = "0.00";
							if(targetValue > 0 && groundValue > 0)
								groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
							
							if(groundedPerc >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 90 && groundedPerc < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 60 && groundedPerc < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
							}	
							str+='<td>'+ajaxresp[i].notGrounded+'</td>';
							str+='<td>'+ajaxresp[i].inProgress+'</td>';
							str+='<td>'+ajaxresp[i].completed+'</td>';
							
							if(ajaxresp[i].percentage >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
						str+='</tr>';
					}
				}
				tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			}
			
		}
	});
}
$(document).on("change","[mcctype_click]",function(){
	
	var blockTypeId = $(this).attr("mcctype_click");
	var	mccType = $("[mcctype_click="+blockTypeId+"]").val();
	var divId = $(this).attr("attr_divIdd");
	var levelId = $(this).attr("attr_levelId");
	var blockName = $(this).attr("attr_blockName");
	var districtId = '';
	var menuLocationId = '';
	var menuLocationType = '';
	if(levelId == 2)
	{
		menuLocationId = "-1";
		menuLocationType = "state";
	}else if(levelId == 3)
	{
		menuLocationId = locationId;
		menuLocationType = "district";
	}else if(levelId == 4)
	{
		menuLocationId = locationId;
		menuLocationType = "constituency";
		districtId = $("#selectedName").attr("attr_distid");
	}
	
	var dataArr = '';
	if(levelId == 2)
	{
		dataArr = ['state','district','constituency','mandal','panchayat'];
	}else if(levelId == 3)
	{
		dataArr = ['district','constituency','mandal','panchayat'];
	}else if(levelId == 4)
	{
		dataArr = ['constituency','mandal','panchayat'];		
	}
	for(var i in dataArr)
	{
		var theadArr = [dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
		if(dataArr[i] == "constituency")
			theadArr = ["district",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
		else if(dataArr[i] == "mandal")
			theadArr = ["district","constituency",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
		else if(dataArr[i] == "panchayat")
			theadArr = ["district","constituency","mandal",dataArr[i],'Target','Grounded','Grounded Percentage','Not-Grounded','In Progress','Completed','Achievement Percentage'];
		var tableId = blockName.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i];
		getNregaOtherMCCLevelData(tableId,dataArr[i],theadArr,menuLocationType,menuLocationId,divId,districtId,blockName,'overview',levelId)
	}	
});

function getNregaLevelsWiseDataFrCoffeePlantation(divIdd,locationType,theadArr,menuLocationType,menuLocationId,blockName)
{
	var districtId = $("#selectedName").attr("attr_distid");
	$("#"+divIdd).html(spinner);
	 var theadArr = [locationType,'Target(in Acres)','Pitting  Area (in Acres)','Pitting Expenditure','Planting  Area (in Acres)','Planting Expenditure','Total Expenditure','Pitting Perc','Planting Perc'];
	if(locationType == "constituency")
		theadArr = ["district",locationType,'Target(in Acres)','Pitting  Area (in Acres)','Pitting Expenditure','Planting  Area (in Acres)','Planting Expenditure','Total Expenditure','Pitting Perc','Planting Perc'];
	else if(locationType == "mandal")
		theadArr = ["district","constituency",locationType,'Target(in Acres)','Pitting  Area (in Acres)','Pitting Expenditure','Planting  Area (in Acres)','Planting Expenditure','Total Expenditure','Pitting Perc','Planting Perc'];
	else if(locationType == "panchayat")
		theadArr = ["district","constituency","mandal",locationType,'Target(in Acres)','Pitting  Area (in Acres)','Pitting Expenditure','Planting  Area (in Acres)','Planting Expenditure','Total Expenditure','Pitting Perc','Planting Perc'];
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocaType : locationType,
		districtId:districtId
	}
	$.ajax({
		url: 'getNregaLevelsWiseDataFrCoffeePlantation',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						
							str+='<td>'+ajaxresp[i].targetACRES+'</td>';
							str+='<td>'+ajaxresp[i].pittingArea+'</td>';
							str+='<td>'+ajaxresp[i].pittingExp+'</td>';
							str+='<td>'+ajaxresp[i].plantingArea+'</td>';
							str+='<td>'+ajaxresp[i].plantingExp+'</td>';
							str+='<td>'+ajaxresp[i].totalExpenditure+'</td>';
							
							if(ajaxresp[i].pitingPerc >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].pitingPerc+'</td>';
							}else if(ajaxresp[i].pitingPerc >= 90 && ajaxresp[i].pitingPerc < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].pitingPerc+'</td>';
							}else if(ajaxresp[i].pitingPerc >= 60 && ajaxresp[i].pitingPerc < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].pitingPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].pitingPerc+'</td>';
							}
							if(ajaxresp[i].pencentageOfPlanting >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].pencentageOfPlanting+'</td>';
							}else if(ajaxresp[i].pencentageOfPlanting >= 90 && ajaxresp[i].pencentageOfPlanting < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].pencentageOfPlanting+'</td>';
							}else if(ajaxresp[i].pencentageOfPlanting >= 60 && ajaxresp[i].pencentageOfPlanting < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].pencentageOfPlanting+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].pencentageOfPlanting+'</td>';
							}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

function getNregaMCCNewComponetsLevelData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		groupName : mccType,
		locationId : menuLocationId,
		sublocationType : locationTypeNew,
		districtId:districtId
	}
	
	$.ajax({
		url: 'getNregaMCCNewComponetsLevelData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state"){
								str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
							}
							else if(locationTypeNew == "district"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							}
							else if(locationTypeNew == "constituency"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							}
							else if(locationTypeNew == "mandal"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							}
							else if(locationTypeNew == "panchayat"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							}
							
							str+='<td>'+ajaxresp[i].target+'</td>';
							str+='<td>'+ajaxresp[i].grounded+'</td>';
							
							var groundValue = ajaxresp[i].grounded;
							var targetValue = ajaxresp[i].target;
							var groundedPerc = "0.00";
							if(targetValue > 0 && groundValue > 0)
								groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
							
							if(groundedPerc >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 90 && groundedPerc < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 60 && groundedPerc < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
							}
							str+='<td>'+ajaxresp[i].notGrounded+'</td>';
							str+='<td>'+ajaxresp[i].inProgress+'</td>';
							str+='<td>'+ajaxresp[i].completed+'</td>';
							
							if(ajaxresp[i].percentage >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
						str+='</tr>';
					}
				}
				tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			}
	});
}
function getNregaCovergancePROtherLevelData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		groupName : mccType,
		locationId : menuLocationId,
		sublocationType : locationTypeNew,
		districtId:districtId,
		sector : buildType
	}
	
	$.ajax({
		url: 'getNregaCovergancePROtherLevelData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'Abstract')
			{
				buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
			}else{
				var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state"){
								str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
							}
							else if(locationTypeNew == "district"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							}
							else if(locationTypeNew == "constituency"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							}
							else if(locationTypeNew == "mandal"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							}
							else if(locationTypeNew == "panchayat"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							}
							
							str+='<td>'+ajaxresp[i].target+'</td>';
							str+='<td>'+ajaxresp[i].grounded+'</td>';
							
							var groundValue = ajaxresp[i].grounded;
							var targetValue = ajaxresp[i].target;
							var groundedPerc = "0.00";
							if(targetValue > 0 && groundValue > 0)
								groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
							if(groundedPerc >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 90 && groundedPerc < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 60 && groundedPerc < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
							}
							str+='<td>'+ajaxresp[i].notGrounded+'</td>';
							str+='<td>'+ajaxresp[i].inProgress+'</td>';
							str+='<td>'+ajaxresp[i].completed+'</td>';
							
							if(ajaxresp[i].percentage >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
						str+='</tr>';
					}
				}
				tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			}
		}
	})
}

function getNregasForestPopUpOverview(menuLocationType,menuLocationId)
{
	var districtId = $("#selectedName").attr("attr_distId");
	$("#nregsOverviewBodyId").html(spinner);
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType : menuLocationType,
		locationId : menuLocationId,
		districtId:districtId,
		category : globalDivName
	}
	
	$.ajax({
		url: 'getNregasForestOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildPopupOverviewBlock(ajaxresp,menuLocationType,menuLocationId);
		}
	});
}
function getWorkWiseAbstractForMCCOthers(projectDivId,levelId,menuLocationId)
{
	$("#LabBudgtPanExBodyOverviewId").html(spinner);
	var districtId = $("#selectedName").attr("attr_distId");
	$("#nregsOverviewBodyId").html(spinner);
	var locType = '';
	if(levelId == 2)
	{
		locType = 'state'
	}else if(levelId == 3)
	{
		locType = 'district'
	}else if(levelId == 4)
	{
		locType = 'constituency'
	}
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		groupName : projectDivId,
		locationType: locType,
		sublocaType: locType,
		locationId : menuLocationId,
		districtId : districtId
	}
	
	$.ajax({
		url: 'getWorkWiseAbstractForMCCOthers',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			var str='';
			var targetCheck = 0;
			str+='<div class="row">';
				str+='<div class="col-sm-12">';
					str+='<div style="background-color:#ccc;padding:15px;">';
						str+='<h5 class="text-danger">Other MCC</h5>';
							str+='<div class="row">';	
								for(var i in result)
								{
									str+='<div class="col-sm-2 m_top10">';
										str+='<div class="panel-block-white text-center" overview-popup-block="'+result[i].workName+'" attr_levelId="'+levelId+'" attr_locationId="'+menuLocationId+'" attr_mcc_main_projectId="'+projectDivId+'" style="padding-top: 3px;padding-bottom: 5px;">';
										
										//str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+result[i].workName+'">';
											if(result[i].percentage >= 100){
												str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+result[i].workName+'" style="padding-top: 5px;">';
											}else if(result[i].percentage >= 90 && result[i].percentage < 100){
												str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+result[i].workName+'" style="padding-top: 5px;">';
											}else if(result[i].percentage >= 60 && result[i].percentage < 90){
												str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+result[i].workName+'" style="padding-top: 5px;">';
											}else{
												str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+result[i].workName+'" style="padding-top: 5px;">';
											}
											if(result[i].workName.length > 12)
												{
													str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+result[i].workName+'">'+result[i].workName.substr(0,12)+'..</h4>';
												}else{
													str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+result[i].workName+'">'+result[i].workName+'</h4>';
												}
												if(result[i].percentage != null && result[i].percentage.length > 0)
												{
													str+='<h2 class="text-center">'+result[i].percentage+'<small>%</small>';
												}else{
													str+='<h2 class="text-center">0<small>%</small>';
												}
												 if(result[i].percentage < 60)
												{
													str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
												}else if(result[i].percentage >= 60)
												{ 
													str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
												}else
												{
													str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
												}
												str+='<div class="row">';
													str+='<div class="col-sm-6 text-center">';
														str+='<label style="font-size:12px;">Sanctioned</label>';
														if(result[i].target != null)
														{
															str+='<h4>'+result[i].target+'</h4>';
															targetCheck = targetCheck + result[i].target
														}else{
															str+='<h4>0</h4>';
														}
													str+='</div>';
													str+='<div class="col-sm-6 text-center">';
														str+='<label style="font-size:12px;">Completed</label>';
														if(result[i].completed != null)
														{
															str+='<h4>'+result[i].completed+'</h4>';
														}else{
															str+='<h4>0</h4>';
														}
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
			//console.log(targetCheck);
			$("#LabBudgtPanExBodyOverviewId").html(str);
		}
	});
}
function getNregaOtherMCCAbstarctData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	var distrtId = $("#selectedName").attr("attr_distid");
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		groupName : mccType,
		locationId : menuLocationId,
		sublocationType : locationTypeNew,
		districtId:distrtId,
		sector : buildType
	}
	
	$.ajax({
		url: 'getNregaOtherMCCAbstarctData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'Abstract')
			{
				buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
			} else{
				var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state"){
								str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
							}
							else if(locationTypeNew == "district"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							}
							else if(locationTypeNew == "constituency"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							}
							else if(locationTypeNew == "mandal"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							}
							else if(locationTypeNew == "panchayat"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							}
							
							str+='<td>'+ajaxresp[i].target+'</td>';
							str+='<td>'+ajaxresp[i].grounded+'</td>';
							
							var groundValue = ajaxresp[i].grounded;
							var targetValue = ajaxresp[i].target;
							var groundedPerc = "0.00";
							if(targetValue > 0 && groundValue > 0)
								groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
							if(groundedPerc < 50){
								str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 50 && groundedPerc < 80){
								str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
							}else if(groundedPerc >= 80)
							{
								str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">-</td>';
							}
							
							str+='<td>'+ajaxresp[i].notGrounded+'</td>';
							str+='<td>'+ajaxresp[i].inProgress+'</td>';
							str+='<td>'+ajaxresp[i].completed+'</td>';
							
							if(ajaxresp[i].percentage < 50){
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 50 && ajaxresp[i].percentage < 80){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 80){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
							
						str+='</tr>';
					}
				}
				tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			} 
			
		}
	});
}

$(document).on("click",".OtherMCCPopCls",function(){
	var projectDivId = $(this).attr("attr_project_div_id");
	var levelId = $("[overview-block]").attr("attr_levelId");
	var locationId = $("[overview-block]").attr("attr_locationId");
	
	$("#nregsPanExpModalId").modal('show');
	$("#larBudExpHeadingId").html(projectDivId);
	getWorkWiseAbstractForMCCOthers(projectDivId,levelId,locationId)
});

function saveNregaComponentComments(statusId,comment,actionType,uniqueCode,componentId,locationType,loctionId,fromRange,toRange,districtId,range){
	if(componentId == "undefined"){
		componentId = 0;
	}
	if($("#statusModalId").val() == 0){
		$("#errorId").html("Please Select Status");
		return;
	}else{
	 $("#errorId").html("");	
	}
	if($("#commentId").val().trim() == '' || $("#commentId").val().trim() == null){
		$("#errorId").html("Required Comment");
		return;
	}else{
	 $("#errorId").html("");	
	}
	if($("#actionTypeId").val().trim() == '' || $("#actionTypeId").val().trim() == null){
		$("#errorId").html(" Required Action Plan ");
		return;
	}else{
	 $("#errorId").html("");	
	}
		var json = {
			locationId:componentId,
			sourceId :statusId,
			category :comment,
			assetType :actionType,
			displayType : uniqueCode
			
		}
		$.ajax({                
			type:'POST',    
			url: 'saveNregaComponentComments',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result != null && result.displayType == "success"){
				alert("Comment Updated Successfully.");
				setTimeout(function(){
				$(".closeShowPdfCls1").trigger('click');
			 getNregaLabourBudgetPanchatVsExpData(locationType,loctionId,fromRange,toRange,districtId,range);
				}, 300); 
				
				
			}
		});
	}
	
	function getNregaComponentStatus(statusId,comments,actionPlan){
		$("#statusModalId").empty();
		var json = {
			
			
		}
		$.ajax({                
			type:'POST',    
			url: 'getNregaComponentStatus',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result !=null && result.length>0){
				
				$("#statusModalId").append('<option value="0">Select Status</option>');
				for(var i in result){
					$("#statusModalId").append('<option value="'+result[i].sourceId+'">'+result[i].displayType+' </option>');
					$("#statusModalId").val(statusId);
					if(comments != 'undefined'){
					$("#commentId").val(comments);
					}
					if(actionPlan != 'undefined'){
		            $("#actionTypeId").val(actionPlan);
					}
				}
			}
		
			$("#statusModalId").chosen();
			$("#statusModalId").trigger('chosen:updated');
		});
	}
	
	$(document).on("click",".modalIconOpen",function(){
		$("#statusModalId").val('');
		$("#commentId").val('');
		$("#actionTypeId").val('');
		$("#errorId").html('');
		var unicode = $(this).attr("attr_unicode");
		var componentId = $(this).attr("attr_componentId");
		var statusId=$(this).attr("attr_status_id");
		var comments=$(this).attr("attr_comments");
		var actionPlan =$(this).attr("attr_actionPlan");
		getNregaComponentStatus(statusId,comments,actionPlan);
		var panchayatName=$(this).attr("attr_panchayat");
		$("#iconModalId").modal("show");
		$("#panchayatId").html(panchayatName+"  "+"Panchayats Vs Expenditure Comments Updating");
		$("#updateId").attr("attr_unicode",unicode)
		$("#updateId").attr("attr_componentId",componentId)
		var formRange = $(this).attr("attr_fromrange");
		var toRange = $(this).attr("attr_toRange");
		var locationType =$(this).attr("attr_locationType");
		var locationId = $(this).attr("attr_locationVal");
		var range=$(this).attr("attr_range");
		$("#updateId").attr("attr_fromrange",formRange)
		$("#updateId").attr("attr_toRange",toRange)
		$("#updateId").attr("attr_locationType",locationType)
		$("#updateId").attr("attr_locationVal",locationId)
		$("#updateId").attr("attr_range",range)
	});
	$(document).on("click","#updateId",function(){
		var statusId= $("#statusModalId").val();
		var commentId =$("#commentId").val();
		var actionTypeId =$("#actionTypeId").val();
		var uniqueCode = $(this).attr("attr_unicode");
		var componentId = $(this).attr("attr_componentId");
		var districtId = $("#selectedName").attr("attr_distid"); 
		var locationType = $(this).attr("attr_locationType");
		var locationId =$(this).attr("attr_locationVal");
		var fromRange = $(this).attr("attr_fromrange");
		var toRange = $(this).attr("attr_toRange");
		var range =$(this).attr("attr_range");
		saveNregaComponentComments(statusId,commentId,actionTypeId,uniqueCode,componentId,locationType,locationId,fromRange,toRange,districtId,range);
	});
$(document).on("click",".closeShowPdfCls1",function(){
	setTimeout(function(){
		$('body').addClass("modal-open");
	}, 400);  
});

function getManWorksExpenditureAbstarct(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	var distrtId = $("#selectedName").attr("attr_distId");
	var month;
	//var lastMonthDate = moment().subtract(30,'days').format('YYYY-MM')
	var lastMonthDate = moment().format('YYYY-MM')
	var toDateArr = lastMonthDate.split("-");
	if(toDateArr[1] == 01){
		month = "April,May,June,July,August,September,October,November,December,January"
	}else if(toDateArr[1] == 02){
		month = "April,May,June,July,August,September,October,November,December,January,February"
	}else if(toDateArr[1] == 03){
		month = "April,May,June,July,August,September,October,November,December,January,February,March"
	}else if(toDateArr[1] == 04){
		month = "April"
	}else if(toDateArr[1] == 05){
		month = "April,May"
	}else if(toDateArr[1] == 06){
		month = "April,May,June"
	}else if(toDateArr[1] == 07){
		month = "April,May,June,July"
	}else if(toDateArr[1] == 08){
		month = "April,May,June,July,August"
	}else if(toDateArr[1] == 09){
		month = "April,May,June,July,August,September"
	}else if(toDateArr[1] == 10){
		month = "April,May,June,July,August,September,October"
	}else if(toDateArr[1] == 11){
		month = "April,May,June,July,August,September,October,November"
	}else if(toDateArr[1] == 12){
		month = "April,May,June,July,August,September,October,November,December"
	}
	var json = {
		locationType: menuLocationType,
		locationId : menuLocationId,
		monthType : month,
		sector : buildType,
		districtId : distrtId
	}
	
	$.ajax({
		url: 'getManWorksExpenditureAbstarct',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
		}
	});
}

function getManWorksExpenditureDetails(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	var json = {
		locationType: menuLocationType,
		locationIdStr : menuLocationId,
		type : "MonthWise Expenditure"
		
	}
	
	$.ajax({
		url: 'getManWorksExpenditureDetails',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			var perDays1516 = 0.0;var wageExp1516 = 0.0;var matExp1516 = 0.0;var total1516 = 0.0;
			var perDays1617 = 0.0;var wageExp1617 = 0.0;var matExp1617 = 0.0;var total1617 = 0.0;
			var perDays1718 = 0.0;var wageExp1718 = 0.0;var matExp1718 = 0.0;var total1718 = 0.0;
			var perDays1819 = 0.0;var wageExp1819 = 0.0;var matExp1819 = 0.0;var total1819 = 0.0;
			
			var perDays1617Perc = 0.0;var wageExp1617Perc = 0.0;var matExp1617Perc = 0.0;var total1617Perc = 0.0;
			var perDays1718Perc = 0.0;var wageExp1718Perc = 0.0;var matExp1718Perc = 0.0;var total1718Perc = 0.0;
			var perDays1819Perc = 0.0;var wageExp1819Perc = 0.0;var matExp1819Perc = 0.0;var total1819Perc = 0.0;
			
			str+='<div class="table-responsive m_top10">';
				str+='<table class="table table-bordered dataTable'+divIdd+'" style="width:100%">';
					str+='<thead class="text-capitalize">';
						str+='<tr>';
							str+='<th rowspan="2" style="background-color:#034575;color:#fff">Month</th>';
							str+='<th colspan="4" class="text-center" style="background-color:#565b07;color:#fff">2018-19</th>';
							str+='<th colspan="4" class="text-center" style="background-color:#41c4f4;color:#fff">2017-18</th>';
							str+='<th colspan="4" class="text-center" style="background-color:#ea9009;color:#fff">2016-17</th>';
							str+='<th colspan="4" class="text-center" style="background-color:#26243c;color:#fff">2015-16</th>';
							//str+='<th rowspan="2">Increment/Decrement (%)</th>';
						str+='</tr>';
						str+='<tr>';
							str+='<th style="background-color:#565b07;color:#fff">Person Days</th>';
							//str+='<th style="background-color:#565b07;color:#fff">Actual Person Days</th>';
							str+='<th style="background-color:#565b07;color:#fff">Wage</th>';
							str+='<th style="background-color:#565b07;color:#fff">Material</th>';
							str+='<th style="background-color:#565b07;color:#fff">Total</th>';
							
							str+='<th style="background-color:#41c4f4;color:#fff">Person Days</th>';
							str+='<th style="background-color:#41c4f4;color:#fff">Wage</th>';
							str+='<th style="background-color:#41c4f4;color:#fff">Material</th>';
							str+='<th style="background-color:#41c4f4;color:#fff">Total</th>';
							
							str+='<th style="background-color:#ea9009;color:#fff">Person Days</th>';
							str+='<th style="background-color:#ea9009;color:#fff">Wage</th>';
							str+='<th style="background-color:#ea9009;color:#fff">Material</th>';
							str+='<th style="background-color:#ea9009;color:#fff">Total</th>';
							
							str+='<th style="background-color:#26243c;color:#fff">Person Days</th>';
							str+='<th style="background-color:#26243c;color:#fff">Wage</th>';
							str+='<th style="background-color:#26243c;color:#fff">Material</th>';
							str+='<th style="background-color:#26243c;color:#fff">Total</th>';
							
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						
					if(ajaxresp != null && ajaxresp.length > 0){
						for(var i in ajaxresp){
							str+='<tr>';
							if(menuLocationType != null && menuLocationType == "state")
								str+='<td style="background-color:#034575;color:#fff"><a class="levelWiseExpenditureCls" style="cursor:pointer;" attr_month="'+ajaxresp[i].thisMonth+'" attr_type="district">'+ajaxresp[i].thisMonth+'</a></td>';
							else
								str+='<td style="background-color:#034575;color:#fff">'+ajaxresp[i].thisMonth+'</td>';
								//18-19 PersonDays
								if(ajaxresp[i].overAllPersonDaysIsHigh != null && ajaxresp[i].overAllPersonDaysIsHigh == 'TRUE'){
									if(ajaxresp[i].personDaysIsHigh != null && ajaxresp[i].personDaysIsHigh == '18-19'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
									}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
										if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '18-19'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
										}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1819+'</td>';
										}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].perDays1819+'</td>';
										}
									}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1819+'</td>';
									}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1819+'</td>';
									}
								}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
									if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '18-19'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
									}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1819+'</td>';
									}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1819+'</td>';
									}
								}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1819+'</td>';
								}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].perDays1819+'</td>';
								}
								if(ajaxresp[i].overAllWageIsHigh != null && ajaxresp[i].overAllWageIsHigh == 'TRUE'){
									if(ajaxresp[i].wageIsHigh != null && ajaxresp[i].wageIsHigh == '18-19'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
									}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
										if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '18-19'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
										}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1819+'</td>';
										}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].wageExp1819+'</td>';
										}
									}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1819+'</td>';
									}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1819+'</td>';
									}
								}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
									if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '18-19'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
									}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1819+'</td>';
									}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1819+'</td>';
									}
								}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1819+'</td>';
								}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].wageExp1819+'</td>';
								}
								//18-19 Material
								if(ajaxresp[i].overAllMaterialIsHigh != null && ajaxresp[i].overAllMaterialIsHigh == 'TRUE'){
									if(ajaxresp[i].materialIsHigh != null && ajaxresp[i].materialIsHigh == '18-19'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
									}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
										if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '18-19'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
										}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1819+'</td>';
										}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].matExp1819+'</td>';
										}
									}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1819+'</td>';
									}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1819+'</td>';
									}
								}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
									if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '18-19'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
									}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1819+'</td>';
									}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1819+'</td>';
									}
								}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1819+'</td>';
								}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].matExp1819+'</td>';
								}
								//18-19 Total
								if(ajaxresp[i].overAllTotalIsHigh != null && ajaxresp[i].overAllTotalIsHigh == 'TRUE'){
									if(ajaxresp[i].totalIsHigh != null && ajaxresp[i].totalIsHigh == '18-19'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].total1819+'</td>';
									}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
										if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '18-19'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1819+'</td>';
										}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1819+'</td>';
										}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1819+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].total1819+'</td>';
										}
									}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1819+'</td>';
									}
								}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
									if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '18-19'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1819+'</td>';
									}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1819+'</td>';
									}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1819+'</td>';
									}
								}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1819+'</td>';
								}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1819+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].total1819+'</td>';
								}
								
							//17-18 PersonDays
								if(ajaxresp[i].overAllPersonDaysIsHigh != null && ajaxresp[i].overAllPersonDaysIsHigh == 'TRUE'){
									if(ajaxresp[i].personDaysIsHigh != null && ajaxresp[i].personDaysIsHigh == '17-18'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
									}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
										if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '17-18'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
										}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1718+'</td>';
										}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].perDays1718+'</td>';
										}
									}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1718+'</td>';
									}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1718+'</td>';
									}
								}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
									if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '17-18'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
									}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1718+'</td>';
									}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1718+'</td>';
									}
								}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1718+'</td>';
								}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].perDays1718+'</td>';
								}
								//17-18 Wage
								if(ajaxresp[i].overAllWageIsHigh != null && ajaxresp[i].overAllWageIsHigh == 'TRUE'){
									if(ajaxresp[i].wageIsHigh != null && ajaxresp[i].wageIsHigh == '17-18'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
									}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
										if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '17-18'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
										}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1718+'</td>';
										}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].wageExp1718+'</td>';
										}
									}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1718+'</td>';
									}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1718+'</td>';
									}
								}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
									if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '17-18'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
									}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1718+'</td>';
									}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1718+'</td>';
									}
								}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1718+'</td>';
								}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].wageExp1718+'</td>';
								}
								//17-18 Material
								if(ajaxresp[i].overAllMaterialIsHigh != null && ajaxresp[i].overAllMaterialIsHigh == 'TRUE'){
									if(ajaxresp[i].materialIsHigh != null && ajaxresp[i].materialIsHigh == '17-18'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
									}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
										if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '17-18'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
										}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1718+'</td>';
										}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].matExp1718+'</td>';
										}
									}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1718+'</td>';
									}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1718+'</td>';
									}
								}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
									if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '17-18'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
									}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1718+'</td>';
									}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1718+'</td>';
									}
								}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1718+'</td>';
								}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].matExp1718+'</td>';
								}
								//17-18 Total
								if(ajaxresp[i].overAllTotalIsHigh != null && ajaxresp[i].overAllTotalIsHigh == 'TRUE'){
									if(ajaxresp[i].totalIsHigh != null && ajaxresp[i].totalIsHigh == '17-18'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
										if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '17-18'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1718+'</td>';
										}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
										}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1718+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].total1718+'</td>';
										}
									}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1718+'</td>';
									}
								}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
									if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '17-18'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1718+'</td>';
									}
								}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
								}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1718+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].total1718+'</td>';
								}
								
							//16-17 PersonDays
								if(ajaxresp[i].overAllPersonDaysIsHigh != null && ajaxresp[i].overAllPersonDaysIsHigh == 'TRUE'){
									if(ajaxresp[i].personDaysIsHigh != null && ajaxresp[i].personDaysIsHigh == '16-17'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
									}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
										if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '16-17'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
										}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1617+'</td>';
										}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].perDays1617+'</td>';
										}
									}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1617+'</td>';
									}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1617+'</td>';
									}
								}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
									if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '16-17'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
									}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1617+'</td>';
									}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1617+'</td>';
									}
								}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1617+'</td>';
								}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].perDays1617+'</td>';
								}
								//16-17 Wage
								if(ajaxresp[i].overAllWageIsHigh != null && ajaxresp[i].overAllWageIsHigh == 'TRUE'){
									if(ajaxresp[i].wageIsHigh != null && ajaxresp[i].wageIsHigh == '16-17'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
									}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
										if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '16-17'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
										}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1617+'</td>';
										}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].wageExp1617+'</td>';
										}
									}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1617+'</td>';
									}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1617+'</td>';
									}
								}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
									if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '16-17'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
									}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1617+'</td>';
									}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1617+'</td>';
									}
								}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1617+'</td>';
								}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].wageExp1617+'</td>';
								}
								//16-17 Material
								if(ajaxresp[i].overAllMaterialIsHigh != null && ajaxresp[i].overAllMaterialIsHigh == 'TRUE'){
									if(ajaxresp[i].materialIsHigh != null && ajaxresp[i].materialIsHigh == '16-17'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
									}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
										if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '16-17'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
										}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1617+'</td>';
										}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].matExp1617+'</td>';
										}
									}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1617+'</td>';
									}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1617+'</td>';
									}
								}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
									if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '16-17'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
									}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1617+'</td>';
									}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1617+'</td>';
									}
								}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1617+'</td>';
								}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].matExp1617+'</td>';
								}
								//16-17 Total
								if(ajaxresp[i].overAllTotalIsHigh != null && ajaxresp[i].overAllTotalIsHigh == 'TRUE'){
									if(ajaxresp[i].totalIsHigh != null && ajaxresp[i].totalIsHigh == '16-17'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].total1617+'</td>';
									}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
										if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '16-17'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1617+'</td>';
										}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1617+'</td>';
										}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1617+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].total1617+'</td>';
										}
									}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1617+'</td>';
									}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1617+'</td>';
									}
								}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
									if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '16-17'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1617+'</td>';
									}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1617+'</td>';
									}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1617+'</td>';
									}
								}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1617+'</td>';
								}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1617+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].total1617+'</td>';
								}
								
							//15-16 PersonDays
								if(ajaxresp[i].overAllPersonDaysIsHigh != null && ajaxresp[i].overAllPersonDaysIsHigh == 'TRUE'){
									if(ajaxresp[i].personDaysIsHigh != null && ajaxresp[i].personDaysIsHigh == '15-16'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].perDays1516+'</td>';
									}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
										if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '15-16'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1516+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].perDays1516+'</td>';
										}
									}else{
										str+='<td>'+ajaxresp[i].perDays1516+'</td>';
									}
								}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
									if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '15-16'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1516+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1516+'</td>';
									}
								}else{
									str+='<td>'+ajaxresp[i].perDays1516+'</td>';
								}
								//15-16 Wage
								if(ajaxresp[i].overAllWageIsHigh != null && ajaxresp[i].overAllWageIsHigh == 'TRUE'){
									if(ajaxresp[i].wageIsHigh != null && ajaxresp[i].wageIsHigh == '15-16'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].wageExp1516+'</td>';
									}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
										if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '15-16'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1516+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].wageExp1516+'</td>';
										}
									}else{
										str+='<td>'+ajaxresp[i].wageExp1516+'</td>';
									}
								}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
									if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '15-16'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1516+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1516+'</td>';
									}
								}else{
									str+='<td>'+ajaxresp[i].wageExp1516+'</td>';
								}
								//15-16 Material
								if(ajaxresp[i].overAllMaterialIsHigh != null && ajaxresp[i].overAllMaterialIsHigh == 'TRUE'){
									if(ajaxresp[i].materialIsHigh != null && ajaxresp[i].materialIsHigh == '15-16'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].matExp1516+'</td>';
									}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
										if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '15-16'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1516+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].matExp1516+'</td>';
										}
									}else{
										str+='<td>'+ajaxresp[i].matExp1516+'</td>';
									}
								}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
									if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '15-16'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1516+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1516+'</td>';
									}
								}else{
									str+='<td>'+ajaxresp[i].matExp1516+'</td>';
								}
								//15-16 Total
								if(ajaxresp[i].overAllTotalIsHigh != null && ajaxresp[i].overAllTotalIsHigh == 'TRUE'){
									if(ajaxresp[i].totalIsHigh != null && ajaxresp[i].totalIsHigh == '15-16'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].total1516+'</td>';
									}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
										if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '15-16'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1516+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].total1516+'</td>';
										}
									}else{
										str+='<td>'+ajaxresp[i].total1516+'</td>';
									}
								}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
									if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '15-16'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1516+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1516+'</td>';
									}
								}else{
									str+='<td>'+ajaxresp[i].total1516+'</td>';
								}
								
							perDays1516 = parseFloat(perDays1516)+parseFloat(ajaxresp[i].perDays1516);
							wageExp1516 = parseFloat(wageExp1516)+parseFloat(ajaxresp[i].wageExp1516);
							matExp1516 = parseFloat(matExp1516)+parseFloat(ajaxresp[i].matExp1516);
							total1516 = parseFloat(total1516)+parseFloat(ajaxresp[i].total1516);
							
							perDays1617 = parseFloat(perDays1617)+parseFloat(ajaxresp[i].perDays1617);
							wageExp1617 = parseFloat(wageExp1617)+parseFloat(ajaxresp[i].wageExp1617);
							matExp1617 = parseFloat(matExp1617)+parseFloat(ajaxresp[i].matExp1617);
							total1617 = parseFloat(total1617)+parseFloat(ajaxresp[i].total1617);

							perDays1718 = parseFloat(perDays1718)+parseFloat(ajaxresp[i].perDays1718);
							wageExp1718 = parseFloat(wageExp1718)+parseFloat(ajaxresp[i].wageExp1718);
							matExp1718 = parseFloat(matExp1718)+parseFloat(ajaxresp[i].matExp1718);
							total1718 = parseFloat(total1718)+parseFloat(ajaxresp[i].total1718);
							
							perDays1819 = parseFloat(perDays1819)+parseFloat(ajaxresp[i].perDays1819);
							//actualPersonDays1819 = parseFloat(actualPersonDays1819)+parseFloat(ajaxresp[i].actualPersonDays1819);
							wageExp1819 = parseFloat(wageExp1819)+parseFloat(ajaxresp[i].wageExp1819);
							matExp1819 = parseFloat(matExp1819)+parseFloat(ajaxresp[i].matExp1819);
							total1819 = parseFloat(total1819)+parseFloat(ajaxresp[i].total1819);
							
							str+='</tr>';
						}
					}
					//YTD TOTAL
					if(ajaxresp[0].subList != null && ajaxresp[0].subList.length > 0){
						str+='<tr>';
							str+='<td style="background-color:#3F8EC8;color:#FFFFFF;font-size:16px;" title="Comparision Between Last Fin. Year Upto This Month TO This Fin. Year Upto This Month."><b>YTD&nbsp;Total</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].perDays1819) >= parseFloat(ajaxresp[0].subList[0].perDays1718))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].perDays1819+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].perDays1819+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].wageExp1819) >= parseFloat(ajaxresp[0].subList[0].wageExp1718))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].wageExp1819+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].wageExp1819+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].matExp1819) >= parseFloat(ajaxresp[0].subList[0].matExp1718))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].matExp1819+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].matExp1819+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].total1819) >= parseFloat(ajaxresp[0].subList[0].total1718))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].total1819+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].total1819+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].perDays1718) >= parseFloat(ajaxresp[0].subList[0].perDays1617))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].perDays1718+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].perDays1718+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].wageExp1718) >= parseFloat(ajaxresp[0].subList[0].wageExp1617))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].wageExp1718+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].wageExp1718+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].matExp1718) >= parseFloat(ajaxresp[0].subList[0].matExp1617))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].matExp1718+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].matExp1718+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].total1718) >= parseFloat(ajaxresp[0].subList[0].total1617))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].total1718+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].total1718+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].perDays1617) >= parseFloat(ajaxresp[0].subList[0].perDays1516))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].perDays1617+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].perDays1617+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].wageExp1617) >= parseFloat(ajaxresp[0].subList[0].wageExp1516))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].wageExp1617+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].wageExp1617+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].matExp1617) >= parseFloat(ajaxresp[0].subList[0].matExp1516))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].matExp1617+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].matExp1617+'</b></td>';
							if(parseFloat(ajaxresp[0].subList[0].total1617) >= parseFloat(ajaxresp[0].subList[0].total1516))
								str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+ajaxresp[0].subList[0].total1617+'</b></td>';
							else
								str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+ajaxresp[0].subList[0].total1617+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].perDays1516+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].wageExp1516+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].matExp1516+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].total1516+'</b></td>';
						str+='</tr>';
						//YTD Growth
						str+='<tr>';
							str+='<td style="background-color:#3F8EC8;color:#FFFFFF;font-size:16px;" title="Comparision Between Last Fin. Year Upto This Month TO This Fin. Year Upto This Month."><b>YTD&nbsp;Growth</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].perDays1819Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].wageExp1819Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].matExp1819Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].total1819Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].perDays1718Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].wageExp1718Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].matExp1718Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].total1718Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].perDays1617Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].wageExp1617Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].matExp1617Perc+'</b></td>';
							str+='<td style="font-size:16px;"><b>'+ajaxresp[0].subList[0].total1617Perc+'</b></td>';
							str+='<td></td>';
							str+='<td></td>';
							str+='<td></td>';
							str+='<td></td>';
						str+='</tr>';
					}
					
					str+='<tr>';
						str+='<td style="background-color:#3F8EC8;color:#FFFFFF;font-size:16px;"><b>Total</b></td>';
						
						str+='<td style="font-size:16px;"><b>'+perDays1819.toFixed(2)+'</b></td>';
						//str+='<td style="font-size:16px;"><b>'+actualPersonDays1819.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+wageExp1819.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+matExp1819.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+total1819.toFixed(2)+'</b></td>';
						
						if(parseFloat(perDays1718) >= parseFloat(perDays1617))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+perDays1718.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+perDays1718.toFixed(2)+'</b></td>';
						
						if(parseFloat(wageExp1718) >= parseFloat(wageExp1617))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+wageExp1718.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+wageExp1718.toFixed(2)+'</b></td>';
						
						if(parseFloat(matExp1718) >= parseFloat(matExp1617))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+matExp1718.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+matExp1718.toFixed(2)+'</b></td>';
						
						if(parseFloat(total1718) >= parseFloat(total1617))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+total1718.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+total1718.toFixed(2)+'</b></td>';
						
						if(parseFloat(perDays1617) >= parseFloat(perDays1516))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+perDays1617.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+perDays1617.toFixed(2)+'</b></td>';
						
						if(parseFloat(wageExp1617) >= parseFloat(wageExp1516))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+wageExp1617.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+wageExp1617.toFixed(2)+'</b></td>';
						
						if(parseFloat(matExp1617) >= parseFloat(matExp1516))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+matExp1617.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+matExp1617.toFixed(2)+'</b></td>';
						
						if(parseFloat(total1617) >= parseFloat(total1516))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+total1617.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+total1617.toFixed(2)+'</b></td>';
						
						str+='<td style="font-size:16px;"><b>'+perDays1516.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+wageExp1516.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+matExp1516.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+total1516.toFixed(2)+'</b></td>';
					str+='</tr>';
					
					perDays1617Perc = ((parseFloat(perDays1617)/parseFloat(perDays1516))*100.00)-100.00;
					wageExp1617Perc = ((parseFloat(wageExp1617)/parseFloat(wageExp1516))*100.00)-100.00;
					matExp1617Perc = ((parseFloat(matExp1617)/parseFloat(matExp1516))*100.00)-100.00;
					total1617Perc = ((parseFloat(total1617)/parseFloat(total1516))*100.00)-100.00;
					perDays1718Perc = ((parseFloat(perDays1718)/parseFloat(perDays1617))*100.00)-100.00;
					wageExp1718Perc = ((parseFloat(wageExp1718)/parseFloat(wageExp1617))*100.00)-100.00;
					matExp1718Perc = ((parseFloat(matExp1718)/parseFloat(matExp1617))*100.00)-100.00;
					total1718Perc = ((parseFloat(total1718)/parseFloat(total1617))*100.00)-100.00;
					
					str+='<tr>';
						str+='<td style="background-color:#3F8EC8;color:#FFFFFF;font-size:16px;"><b>Growth</b></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td style="font-size:16px;"><b>'+perDays1718Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+wageExp1718Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+matExp1718Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+total1718Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+perDays1617Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+wageExp1617Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+matExp1617Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+total1617Perc.toFixed(2)+'</b></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td></td>';
					str+='</tr>';
					str+='</tbody>';
					
				str+='</table>';
			str+='</div>';
			$("#"+divIdd).html(str);	
			if(locationTypeNew == 'state'){
				$(".dataTable"+divIdd).dataTable({
					"iDisplayLength": 20,
					"aaSorting": [],
					"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
					"scrollX":        true,
					"scrollCollapse": true,
					"fixedColumns":   {
						"leftColumns": 1,
					},
					"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
					buttons: [
						{
							extend:    'csvHtml5',
							text:      '<i class="fa fa-file-text-o"></i>',
							titleAttr: 'CSV',
							title:	   divIdd,
							filename:  divIdd+''+moment().format("DD/MMMM/YYYY  HH:MM"),
						},
						{
							extend:    'pdfHtml5',
							text:      '<i class="fa fa-file-pdf-o"></i>',
							titleAttr: 'PDF',
							title:	   divIdd,
							filename:  divIdd+''+moment().format("DD/MMMM/YYYY  HH:MM"),
							orientation: "landscape",
							pageSize:'A3',
							customize: function (doc) {
								doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
							}
						}
					]
				});
			}
			if(locationTypeNew == 'constituency' || locationTypeNew == 'mandal' || locationTypeNew == 'panchayat')
			{
				$(".dataTable"+divIdd).dataTable({
					"iDisplayLength": 15,
					"aaSorting": [],
					"scrollX":        true,
					"scrollCollapse": true,
					"fixedColumns":   {
						"leftColumns": 1,
					},
					"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
					"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
					buttons: [
						{
							extend:    'csvHtml5',
							text:      '<i class="fa fa-file-text-o"></i>',
							titleAttr: 'CSV',
							title:	   blockName,
							filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
						},
						{
							extend:    'pdfHtml5',
							text:      '<i class="fa fa-file-pdf-o"></i>',
							titleAttr: 'PDF',
							title:	   blockName,
							filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
							orientation: "landscape",
							pageSize:'A3',
							customize: function (doc) {
								doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
							}
						}
					]
				});
			}else if(locationTypeNew == 'district')
			{
				$(".dataTable"+divIdd).dataTable({
					"iDisplayLength": 20,
					"aaSorting": [],
					"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
					"scrollX":        true,
					"scrollCollapse": true,
					"fixedColumns":   {
						"leftColumns": 1,
					},
					"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
					buttons: [
						{
							extend:    'csvHtml5',
							text:      '<i class="fa fa-file-text-o"></i>',
							titleAttr: 'CSV',
							title:	   divIdd,
							filename:  divIdd+''+moment().format("DD/MMMM/YYYY  HH:MM"),
						},
						{
							extend:    'pdfHtml5',
							text:      '<i class="fa fa-file-pdf-o"></i>',
							titleAttr: 'PDF',
							title:	   divIdd,
							filename:  divIdd+''+moment().format("DD/MMMM/YYYY  HH:MM"),
							orientation: "landscape",
							pageSize:'A3',
							customize: function (doc) {
								doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
							}
						}
					]
				});
			}
			//	tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			//}
		}
	});
	$(".dataTable"+divIdd).closest("[overview-level-new]").trigger("click");
}

function getAllDistricts(locationType)
{
	
	$("#expDistrictId"+locationType).html('');
	var json = {
	}
	
	$.ajax({
		url: 'getAllDistricts',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			$("#expDistrictId"+locationType).html("<option value='0'>Select District</option>");
			if(result != null && result.length > 0){
				for(var i in result){
					$("#expDistrictId"+locationType).append('<option value="'+result[i].locationIdStr+'">'+result[i].locationName+' </option>');
				}
			}
		$("#expDistrictId"+locationType).chosen();
		$("#expDistrictId"+locationType).trigger('chosen:updated');
		}
	});
}	

$(document).on('change','.districtExpCls', function(){
	var blockType = $(this).attr("attr_locationType");
	var blockName = $(this).attr("attr_blockName");
	var divIdd = $(this).attr("attr_divIId");
	
	//var theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
	if(blockType == "district"){
		var value = $(this).val();
		getManWorksExpenditureDetails(divIdd,'district','','district',value,blockName,'','','','');
	}else if(blockType == "constituency"){
		var value = $(this).val();
		getAllConstituiencesFrDistrict(blockType,value)
	}else if(blockType == "mandal"){
		var value = $(this).val();
		getAllConstituiencesFrDistrict(blockType,value)
	}else if(blockType == "panchayat"){
		var value = $(this).val();
		getAllConstituiencesFrDistrict(blockType,value)
	}
});
$(document).on('change','.constituencyExpCls', function(){
	var blockType = $(this).attr("attr_locationType");
	var blockName = $(this).attr("attr_blockName");
	var divIdd = $(this).attr("attr_divIId");
	
	//var theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
	if(blockType == "constituency"){
		var value = $(this).val();
		getManWorksExpenditureDetails(divIdd,'constituency','','constituency',value,blockName,'','','','');
	}else if(blockType == "mandal"){
		var value = $(this).val();
		getTehsilesFrConstituency(blockType,value)
	}else if(blockType == "panchayat"){
		var value = $(this).val();
		getTehsilesFrConstituency(blockType,value)
	}
});
$(document).on('change','.mandalExpCls', function(){
	var blockType = $(this).attr("attr_locationType");
	var blockName = $(this).attr("attr_blockName");
	var divIdd = $(this).attr("attr_divIId");
	
	//var theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
	if(blockType == "mandal"){
		var value = $(this).val();
		getManWorksExpenditureDetails(divIdd,'mandal','','mandal',value,blockName,'','','','');
	}else if(blockType == "panchayat"){
		var value = $(this).val();
		getPanchayatsFrTehsil(blockType,value)
	}
});

$(document).on('change','.panchayatExpCls', function(){
	var blockType = $(this).attr("attr_locationType");
	var blockName = $(this).attr("attr_blockName");
	var divIdd = $(this).attr("attr_divIId");
	
	//var theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
	if(blockType == "panchayat"){
		var value = $(this).val();
		getManWorksExpenditureDetails(divIdd,'panchayat','','panchayat',value,blockName,'','','','');
	}
});
function getAllConstituiencesFrDistrict(blockType,value)
{
	$("#expConstituencyId"+blockType).html('');
	$("#constLoading"+blockType).html(smallSpinner);
	
	var json = {
		locationIdStr:value
	}
	
	$.ajax({
		url: 'getAllConstituiencesFrDistrict',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			$("#constLoading"+blockType).html('');
			$("#expConstituencyId"+blockType).html("<option value='0'>Select Constituency</option>");
			if(result != null && result.length > 0){
				for(var i in result){
					$("#expConstituencyId"+blockType).append('<option value="'+result[i].locationIdStr+'">'+result[i].locationName+' </option>');
				}
			}
		$("#expConstituencyId"+blockType).chosen();
		$("#expConstituencyId"+blockType).trigger('chosen:updated');
		}
	});
}
function getTehsilesFrConstituency(blockType,value)
{
	$("#expMandalId"+blockType).html('');
	$("#mandalLoading"+blockType).html(smallSpinner);
	var json = {
		locationIdStr:value
	}
	
	$.ajax({
		url: 'getTehsilesFrConstituency',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			$("#mandalLoading"+blockType).html('');
			$("#expMandalId"+blockType).html("<option value='0'>Select Mandal</option>");
			if(result != null && result.length > 0){
				for(var i in result){
					$("#expMandalId"+blockType).append('<option value="'+result[i].locationIdStr+'">'+result[i].locationName+' </option>');
				}
			}
		$("#expMandalId"+blockType).chosen();
		$("#expMandalId"+blockType).trigger('chosen:updated');
		}
	});
}
function getPanchayatsFrTehsil(blockType,value)
{
	$("#expPanchayatId"+blockType).html('');
	$("#panchayatLoading"+blockType).html(smallSpinner);
	var json = {
		locationIdStr:value
	}
	
	$.ajax({
		url: 'getPanchayatsFrTehsil',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			$("#panchayatLoading"+blockType).html('');
			$("#expPanchayatId"+blockType).html("<option value='0'>Select panchayat</option>");
			if(result != null && result.length > 0){
				for(var i in result){
					$("#expPanchayatId"+blockType).append('<option value="'+result[i].locationIdStr+'">'+result[i].locationName+' </option>');
				}
			}
		$("#expPanchayatId"+blockType).chosen();
		$("#expPanchayatId"+blockType).trigger('chosen:updated');
		}
	});
}
function buildtheadManDaysExpenditure(){
	var str='';
		str+='<tr>';
			str+='<th rowspan="2" style="background-color:#034575;color:#fff">Month</th>';
			str+='<th colspan="4" class="text-center" style="background-color:#26243c;color:#fff">2015-16</th>';
			str+='<th colspan="4" class="text-center" style="background-color:#ea9009;color:#fff">2016-17</th>';
			str+='<th colspan="4" class="text-center" style="background-color:green;color:#fff">2017-18</th>';
			//str+='<th rowspan="2">Increment/Decrement (%)</th>';
		str+='</tr>';
		str+='<tr>';
			str+='<th style="background-color:#26243c;color:#fff">Person Days</th>';
			str+='<th style="background-color:#26243c;color:#fff">Wage</th>';
			str+='<th style="background-color:#26243c;color:#fff">Material</th>';
			str+='<th style="background-color:#26243c;color:#fff">Total</th>';
			
			str+='<th style="background-color:#ea9009;color:#fff">Person Days</th>';
			str+='<th style="background-color:#ea9009;color:#fff">Wage</th>';
			str+='<th style="background-color:#ea9009;color:#fff">Material</th>';
			str+='<th style="background-color:#ea9009;color:#fff">Total</th>';
			
			str+='<th style="background-color:green;color:#fff">Person Days</th>';
			str+='<th style="background-color:green;color:#fff">Wage</th>';
			str+='<th style="background-color:green;color:#fff">Material</th>';
			str+='<th style="background-color:green;color:#fff">Total</th>';
			
		str+='</tr>';
	return str;
}

function buildtheadNotYetCompletedWorks(locationType){
	var str='';
		str+='<tr>';
			if(locationType == 'state')
			{
				str+='<th rowspan="2">State</th>';
			}else if(locationType == 'district'){
				str+='<th rowspan="2">District</th>';
			}else if(locationType == 'constituency'){
				str+='<th rowspan="2">District</th>';
				str+='<th rowspan="2">Constituency</th>';
			}else if(locationType == 'mandal'){
				str+='<th rowspan="2">District</th>';
				str+='<th rowspan="2">Constituency</th>';
				str+='<th rowspan="2">Mandal</th>';
			}else if(locationType == 'panchayat'){
				str+='<th rowspan="2">District</th>';
				str+='<th rowspan="2">Constituency</th>';
				str+='<th rowspan="2">Mandal</th>';
				str+='<th rowspan="2">Panchayat</th>';
			}
			str+='<th colspan="3" class="text-center">FY 2014-15</th>';
			str+='<th colspan="3" class="text-center">FY 2015-16</th>';
			str+='<th colspan="3" class="text-center">FY 2016-17</th>';
			str+='<th colspan="3" class="text-center">FY 2017-18</th>';
			str+='<th colspan="3" class="text-center">FY 2018-19</th>';
			str+='<th colspan="3" class="text-center">TOTAL</th>';
			//str+='<th rowspan="2">Increment/Decrement (%)</th>';
		str+='</tr>';
		str+='<tr>';
			str+='<th>S</th>';
			str+='<th>P</th>';
			str+='<th>%</th>';

			str+='<th>S</th>';
			str+='<th>P</th>';
			str+='<th>%</th>';

			str+='<th>S</th>';
			str+='<th>P</th>';
			str+='<th>%</th>';

			str+='<th>S</th>';
			str+='<th>P</th>';
			str+='<th>%</th>';

			str+='<th>S</th>';
			str+='<th>P</th>';
			str+='<th>%</th>';

			str+='<th>S</th>';
			str+='<th>P</th>';
			str+='<th>%</th>';
		str+='</tr>';
	return str;
}

function getFieldManDaysWorkDetails(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	var distrtId = $("#selectedName").attr("attr_distId");
	var json = {
		locationType: menuLocationType,
		locationId : menuLocationId,
		sector : buildType,
		districtId : distrtId,
		sublocationType : locationTypeNew
		
	}
	
	$.ajax({
		url: 'getFieldManDaysWorkDetails',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(buildType == 'Abstract')
			{
				buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
			}else{
				var str = '';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationTypeNew == "state"){
								str+='<td class="text-capitalize">state</td>';
							}
							else if(locationTypeNew == "district"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							}
							else if(locationTypeNew == "constituency"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							}
							else if(locationTypeNew == "mandal"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							}
							else if(locationTypeNew == "panchayat"){
								str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
								str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
							}
							
							str+='<td>'+ajaxresp[i].today+'</td>';
							str+='<td>'+ajaxresp[i].yesterday+'</td>';
							str+='<td>'+ajaxresp[i].thisWeek+'</td>';
							str+='<td>'+ajaxresp[i].lastWeek+'</td>';
							str+='<td>'+ajaxresp[i].thisMonth+'</td>';
							str+='<td>'+ajaxresp[i].lastMonth+'</td>';
							str+='<td>'+ajaxresp[i].last3Months+'</td>';
							str+='<td>'+ajaxresp[i].last6Months+'</td>';
							str+='<td>'+ajaxresp[i].thisFinYear+'</td>';
							
						str+='</tr>';
					}
				}
				tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			}
		}
	});
}

$(document).on("click","[attr_labr_budget_radioBtn]",function(){
	var blockName = $(this).attr("name");
	var locationType = $(this).attr("attr_locationType");
	var levelId = $(this).attr("attr_levelId");
	var locationId = $(this).attr("overview-locationId");
	var menuLocationType = '';
	var menuLocationId = '';
	var buildType = $(this).attr("attr_name");
	getNREGSLabourBudgetExpenditure(blockName,locationType,locationId,buildType)
});
$(document).on("click",".commentsBlockCls",function(e){
	var divName = $(this).attr('attr_divName');
	var locationType =$(this).attr('attr_location_Type');
	var locationId = $(this).attr('attr_loaction_id');
	var color =$(this).attr('attr_color');
	getDepartmentCommentsDetails(divName,locationType,locationId,color);
});
function getDepartmentCommentsDetails(globalDivName,menuLocationType,menuLocationId,color){
	$("#nregsPanExpModalId").modal("show");
	$("#LabBudgtPanExBodyId").html(spinner);
	var districtId = $("#selectedName").attr("attr_distId");
	$("#larBudExpHeadingId").html(''+globalDivName+' Achievement Comparision  of '+color+' Color  Summary');
	if(globalDivName == "Farm" || globalDivName == "Timely"){
		var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			locationId : menuLocationId,
			sublocaType : "mandal",
			//districtId:districtId,
			type : color,
			program : "-1"
		}
	}else{
	var json = {
			year : globalFinancialYear,
			fromDate : glStartDate,
			toDate : glEndDate,
			locationType: menuLocationType,
			divType : globalDivName,
			locationId : menuLocationId,
			sublocaType : "mandal",
			//districtId:districtId,
			type : color
		}
	}
	$.ajax({
		url: 'getNregaComponentsData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			buildDepartmentCommentsDetails(result,globalDivName);
		}
	});
}
function buildDepartmentCommentsDetails(result,globalDivName){
	var str='';
		str+='<div class="row">';
			str+='<div class="col-sm-12">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered" id="componentCommentId">';
						str+='<thead>';
							str+='<th>District</th>';
							str+='<th>Assembly</th>';
							str+='<th>Mandal</th>';
							str+='<th>Target</th>';
							str+='<th>Completed</th>';
							str+='<th>Achivement Percentage</th>';
							str+='<th>Status</th>';
							str+='<th>Comment</th>';
							str+='<th>Action Plan</th>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result){
							str+='<tr>';
								str+='<td>'+result[i].district+'</td>';
								str+='<td>'+result[i].constituency+'</td>';
								str+='<td>'+result[i].mandal+'</td>';
								str+='<td>'+result[i].target+'</td>';
								str+='<td>'+result[i].completed+'</td>';
								str+='<td>'+result[i].percentage+'</td>';
								if(result[i].status != null){
								str+='<td>'+result[i].status+'</td>';
								}else{
									str+='<td>-</td>';
								}	
								if(result[i].comments != null){
								str+='<td>'+result[i].comments+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(result[i].actionPlan != null){
								str+='<td>'+result[i].actionPlan+'</td>';
								}else{
									str+='<td>-</td>';
								}
							str+='</tr>';
						}
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		$("#LabBudgtPanExBodyId").html(str);
		$("#componentCommentId").dataTable({
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			 buttons: [] 
		});
}
$(document).on("click","[role='tabCummulative'] li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var finanicialYearType = $(this).attr("attr_type")
	var subLocType = '';
	var locationType = '';
	var divId = '';
	if(finanicialYearType == "thisFin"){
		glStartDate = '2018-04-01'//moment().startOf('year').format("YYYY-MM")+'-1';
		glEndDate = moment().format("YYYY-MM")+'-30';
		globalFinancialYear = "2018";
		$("#dateRangePickerMGNF").val('2018-04');
		$("#dateRangePickerMGNT").val(moment().format("YYYY-MM"));
		
		manDaysStartDate = '201804';
		manDaysEndDate = moment().format("YYYYMM");
	}else{
		glStartDate = '2017-04-01';//moment().startOf('year').format("YYYY-MM")+'-1';
		glEndDate='2018-03-31';
		globalFinancialYear = "2017";
		$("#dateRangePickerMGNF").val('2017-04');
		$("#dateRangePickerMGNT").val('2018-03');
		
		manDaysStartDate = '201704';
		manDaysEndDate = '201803';
	}
	var levelId = $("#selectedName").attr("attr_levelid");
	var districtId = $("#selectedName").attr("attr_distid");
	var locId = $("#selectedName").attr("attr_id");
	if(levelId == 2)
	{
		locationType = 'state';
		subLocType = 'state';
		divId = 'ConsolidatedViewstate'
	}else if(levelId == 3)
	{
		locationType = 'district';
		subLocType = 'district';
		divId = 'ConsolidatedViewdistrict'
	}else if(levelId == 4)
	{
		locationType = 'constituency';
		subLocType = 'constituency';
		divId = 'ConsolidatedViewconstituency';
		districtId = $("#selectedName").attr("attr_distId");
	}
	//$("#projectOverviewBlock,#projectData").html('');
	//$("[overview-block='"+type+"']").removeClass("panel-block-white");
	buildNREGSProjectsOverview(overViewArr,'');
getNREGSLevelWiseConsolidatedReportConsolidated(levelId,locationType,subLocType,locId,divId,districtId,'completed');
	//getNREGSLevelWiseConsolidatedReport(levelId,locationType,subLocType,locId,divId,districtId);
	
	onloadCallsBuilding();
	
});

function getYearWiseExpenditureDetails(divIdd,locationTypeNew,menuLocationType,menuLocationId,blockName,theadArr)
{
	$("#"+divIdd).html(spinner);
	var json = {
		locationType: menuLocationType,
		locationId : menuLocationId,
		sublocationType : locationTypeNew
	}
	
	$.ajax({
		url: 'getYearWiseExpenditureDetails', 
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationTypeNew == "state"){
							str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
						}
						else if(locationTypeNew == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationTypeNew == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationTypeNew == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationTypeNew == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						
						str+='<td>'+ajaxresp[i].total1415+'</td>';
						str+='<td>'+ajaxresp[i].total1516+'</td>';
						str+='<td>'+ajaxresp[i].total1617+'</td>';
						str+='<td>'+ajaxresp[i].total1718+'</td>';
						str+='<td>'+ajaxresp[i].total1819+'</td>';
						if(ajaxresp[i].growthOver1415 != null && ajaxresp[i].growthOver1415 < 0){
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].growthOver1415+'</td>';
						}else if(ajaxresp[i].growthOver1415 != null && ajaxresp[i].growthOver1415 > 0){
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].growthOver1415+'</td>';
						}else{
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].growthOver1415+'</td>';
						}
						if(ajaxresp[i].growthOver1516 != null && ajaxresp[i].growthOver1516 < 0){
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].growthOver1516+'</td>';
						}else if(ajaxresp[i].growthOver1516 != null && ajaxresp[i].growthOver1516 > 0){
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].growthOver1516+'</td>';
						}else{
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].growthOver1516+'</td>';
						}
						if(ajaxresp[i].growthOver1617 != null && ajaxresp[i].growthOver1617 < 0){
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].growthOver1617+'</td>';
						}else if(ajaxresp[i].growthOver1617 != null && ajaxresp[i].growthOver1617 > 0){
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].growthOver1617+'</td>';
						}else{
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].growthOver1617+'</td>';
						}
						if(ajaxresp[i].growthOver1718 != null && ajaxresp[i].growthOver1718 < 0){
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].growthOver1718+'</td>';
						}else if(ajaxresp[i].growthOver1718 != null && ajaxresp[i].growthOver1718 > 0){
							str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].growthOver1718+'</td>';
						}else{
							str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].growthOver1718+'</td>';
						}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationTypeNew,blockName);
		}
	})
}

function getOverallPendingWorksAbstract(divIdd,locType,locId,blockName,levelId,buildDateType)
{
	var json = {
		 locationType: locType , 
		 sublocationType: locType , 
		 locationId: locId, 
		 type:"INPR", 
		 category : locId 
	}
	
	$.ajax({
		url: 'getOverallPendingWorksAbstract', 
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,blockName,locId,locType,levelId);
		}
	})
}
function getComponentWiseYearWisePaymentWisePendingWorksCollapse(){
	var str='';
		str+='<div class="row">';
			str+='<div class="col-sm-12 m_top10">';
				str+='<div class="panel-group" id="accordion_PandingWorks" role="tablist" aria-multiselectable="true">';
					str+='<div class="panel panel-default panel-black">';
						str+='<div class="panel-heading" role="tab" id="heading_PandingWorks">';
							str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion_PandingWorks" href="#collapse_PandingWorks" aria-expanded="true" aria-controls="collapse_PandingWorks">';
							str+='<h4 class="panel-title text-capital">state level overview - Pending Works </h4>';
							str+='</a>';
						str+='</div>';
						str+='<div id="collapse_PandingWorks" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_PandingWorks">';
							str+='<div class="panel-body">';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<label class="radio-inline">';
											str+='<input class="consolidatedViewPendingWorks" level_type_id="yearType" attr_build_type="yearType" name="collapsePendingWorksViewRadiostate"  type="radio" checked="true"> YearWise';
										str+='</label>';
										str+='<label class="radio-inline">';
											str+='<input class="consolidatedViewPendingWorks" attr_build_type="inProgressPaymentType" level_type_id="inProgressPaymentType" name="collapsePendingWorksViewRadiostate" type="radio"> Payment';
										str+='</label>';
									str+='</div>';
								str+='</div>';
								
								str+='<div class="row">';
									str+='<div class="col-sm-12 m_top10 paymentRadioCls" style="display:none;">';
										str+='<label class="radio-inline">';
											str+='<input class="paymentViewPendingWorks" level_type_id="INPR" attr_build_type="inProgressPaymentType" name="paymentViewRadiostate"  type="radio" checked="true"> InProgress';
										str+='</label>';
										str+='<label class="radio-inline">';
											str+='<input class="paymentViewPendingWorks" level_type_id="COMP" attr_build_type="componentPaymentType" name="paymentViewRadiostate" type="radio"> Completed';
										str+='</label>';
									str+='</div>';
								str+='</div>';
								str+='<div class="row">';
									str+='<div class="col-sm-12 m_top10">';
										str+='<div id="stateLevelComponetWisePendingWorks"></div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		$("#projectData").html(str);
		getComponentWiseYearWisePaymentWisePendingWorks("state","state","INPR","-1","yearType");
}
$(document).on("click",".consolidatedViewPendingWorks",function(){
	$("#pendingWorksComponentView").hide();
	$("#pendingWorksComponentDivId").html('');
	var checkType='';
	if($(this).is(":checked")){
		checkType = $(this).attr("level_type_id");
	}
	
	if(checkType == "inProgressPaymentType"){
		$(".paymentRadioCls").show();
	}else{
		$(".paymentRadioCls").hide();
	}
	getComponentWiseYearWisePaymentWisePendingWorks("state","state","INPR","-1",checkType);
});	
$(document).on("click",".paymentViewPendingWorks",function(){
	$("#pendingWorksComponentView").hide();
	$("#pendingWorksComponentDivId").html('');
	var checkType='';
	if($(this).is(":checked")){
		checkType = $(this).attr("level_type_id");
	}
	
	if(checkType == "INPR"){
		getComponentWiseYearWisePaymentWisePendingWorks("state","state","INPR","-1","inProgressPaymentType");
	}else{
		getComponentWiseYearWisePaymentWisePendingWorks("state","state","COMP","-1","componentPaymentType");
	}
	
});	
function getComponentWiseYearWisePaymentWisePendingWorks(locationType,sublocationType,levelType,category,buildType)
{
	$("#stateLevelComponetWisePendingWorks").html(spinner);
	var json = {
		 locationType: locationType, 
		 sublocationType: sublocationType, 
		 locationId: "-1",
		 type:levelType, //default-INPR,InP-INPR,Com-COMP
		 category : category //state -1,Click On Component Name
	}
	
	$.ajax({
		url: 'getComponentWiseYearWisePaymentWisePendingWorks',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp){
			if(ajaxresp !=null && ajaxresp.length>0){
				globalResultsPendingWorks = ajaxresp;
				buildComponentWiseYearWisePaymentWisePendingWorks(ajaxresp,buildType);
			}else{
				$("#stateLevelComponetWisePendingWorks").html("No Data Available");
			}
		}
	})
}


function buildComponentWiseYearWisePaymentWisePendingWorks(ajaxresp,buildType){
	var str='';
	
	var buildTypeArr=[];
	
	if(buildType == "yearType"){
		buildTypeArr=['Component Name','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%','']
	}else if(buildType == "inProgressPaymentType"){
		buildTypeArr=['Component Name','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%','']
	}else if(buildType == "componentPaymentType"){
		buildTypeArr=['Component Name','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
	}
	
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered stateLevelDatatableCls">';
			str+='<thead>';
				str+='<tr>';
					for(var i in buildTypeArr){
						str+='<th>'+buildTypeArr[i]+'</th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in ajaxresp){
					str+='<tr>';
					str+='<td style="text-align:left !important;"><a style="cursor:pointer;" class="componentWiseDetailsCls" attr_component_name="'+ajaxresp[i].groupName+'">'+ajaxresp[i].groupName+'</a></td>';
					if(buildType == "yearType"){
							str+='<td>'+ajaxresp[i].sanctionWorks+'</td>';
							str+='<td>'+ajaxresp[i].inProgressWorks+'</td>';
							str+='<td>'+ajaxresp[i].count1415+'</td>';
							str+='<td>'+ajaxresp[i].perc1415+'</td>';
							str+='<td>'+ajaxresp[i].count1516+'</td>';
							str+='<td>'+ajaxresp[i].perc1516+'</td>';
							str+='<td>'+ajaxresp[i].count1617+'</td>';
							str+='<td>'+ajaxresp[i].perc1617+'</td>';
							str+='<td>'+ajaxresp[i].count1718+'</td>';
							str+='<td>'+ajaxresp[i].perc1718+'</td>';
							str+='<td>'+ajaxresp[i].count1819+'</td>';
							str+='<td>'+ajaxresp[i].perc1819+'</td>';
							str+='<td><h5 class="componentWiseWorksCls" attr_build_type="componentPaymentType" attr_componentName="'+ajaxresp[i].groupName+'">&#9432;</h5></td>';
					}else{
						str+='<td>'+ajaxresp[i].totalWorks+'</td>';
						str+='<td>'+ajaxresp[i].l25Works+'</td>';
						str+='<td>'+ajaxresp[i].b25To50Works+'</td>';
						str+='<td>'+ajaxresp[i].b50To75Works+'</td>';
						str+='<td>'+ajaxresp[i].g75Works+'</td>';
						if(buildType == "inProgressPaymentType"){
							str+='<td><h5 class="componentWiseWorksCls" attr_build_type="yearType" attr_componentName="'+ajaxresp[i].groupName+'">&#9432;</h5></td>';
						}
						
					}
					str+='</tr>';
				}
				
			str+='</tbody>';
		str+='</table>';		
	str+='</div>';
	$("#stateLevelComponetWisePendingWorks").html(str);
	$(".stateLevelDatatableCls").dataTable({
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[15, 20, 50, -1], [15, 20, 50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
			}
		]
	});
}

$(document).on("click",".componentWiseDetailsCls",function(){
	$("#pendingWorksComponentView").show();
	
	$('html,body').animate({
			scrollTop: $("#pendingWorksComponentScollView").offset().top},
	'slow');
		
	
	var componentName = $(this).attr("attr_component_name");
	var checkType='';
	var levelType='';
	var buildType='';
	$(".consolidatedViewPendingWorks").each(function(){
		if($(this).is(":checked"))
		{
			checkType = $(this).attr("level_type_id")
			buildType = $(this).attr("attr_build_type")
		}
	});
	
	if(checkType == "yearType"){
		levelType = "INPR"
	}else{
		$(".paymentViewPendingWorks").each(function(){
			if($(this).is(":checked"))
			{
				levelType = $(this).attr("level_type_id")
				buildType = $(this).attr("attr_build_type")
			}
		});
	}
	locationWisePaymentPendingWorks(levelType,componentName,buildType);
});

function locationWisePaymentPendingWorks(levelType,componentName,buildType){
	var locationArr = ['district','constituency','mandal','panchayat'];
	//var locationArr = ['mandal'];
	
	var collapse='';
		collapse+='<div class="row">';
			collapse+='<div class="col-sm-12">';
				for(var i in locationArr)
				{
					collapse+='<div class="panel-group" id="accordionPendingWorks'+locationArr[i]+'" role="tablist" aria-multiselectable="true">';
						collapse+='<div class="panel panel-default panel-black">';
							collapse+='<div class="panel-heading" role="tab" id="headingPendingWorks'+locationArr[i]+'">';
								if(i == 0)
								{
									collapse+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionPendingWorks'+locationArr[i]+'" href="#collapsePendingWorks'+locationArr[i]+'" aria-expanded="true" aria-controls="collapsePendingWorks'+locationArr[i]+'">';
								}else{
									collapse+='<a role="button"  class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionPendingWorks'+locationArr[i]+'" href="#collapsePendingWorks'+locationArr[i]+'" aria-expanded="true" aria-controls="collapsePendingWorks'+locationArr[i]+'">';
								}
									collapse+='<h4 class="panel-title text-capital">'+locationArr[i]+' level Wise overview - '+componentName+'</h4>';
								collapse+='</a>';
							collapse+='</div>';
							if(i == 0)
							{
								collapse+='<div id="collapsePendingWorks'+locationArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingPendingWorks'+locationArr[i]+'">';
							}else{
								collapse+='<div id="collapsePendingWorks'+locationArr[i]+'"  class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingPendingWorks'+locationArr[i]+'">';
							}
							
								collapse+='<div class="panel-body">';
									collapse+='<div class="m_top20" id="collapsePendingWorksView'+locationArr[i]+'"></div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				}
			collapse+='</div>';
		collapse+='</div>';
	$("#pendingWorksComponentDivId").html(collapse);
	
	for(var i in locationArr){
		getLocationWisePendingWorks("state",locationArr[i],levelType,componentName,buildType);
	}
}
function getLocationWisePendingWorks(locationType,sublocationType,levelType,category,buildType)
{
	$("#collapsePendingWorksView"+sublocationType).html(spinner);
	var json = {
		 locationType: locationType, 
		 sublocationType: sublocationType, 
		 locationId: "-1",
		 type:levelType, //default-INPR,InP-INPR,Com-COMP
		 category : category //state -1,Click On Component Name
	}
	
	$.ajax({
		url: 'getComponentWiseYearWisePaymentWisePendingWorks',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp){
			if(ajaxresp !=null && ajaxresp.length>0){
				buildLocationWisePendingWorks(ajaxresp,sublocationType,buildType,category);
			}else{
				$("#collapsePendingWorksView"+sublocationType).html("No Data Available");
			}
		}
	})
}

function buildLocationWisePendingWorks(ajaxresp,sublocationType,buildType,category){
	var str='';
	
	var buildTypeArr=[];
	
	if(buildType == "yearType"){
		if(sublocationType == "district"){
			buildTypeArr=['District','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%','']
		}else if(sublocationType == "constituency"){
			buildTypeArr=['District','Constituency','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%','']
		}else if(sublocationType == "mandal"){
			buildTypeArr=['District','Constituency','Mandal','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%','']
		}else if(sublocationType == "panchayat"){
			buildTypeArr=['District','Constituency','Mandal','Panchayat','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%','']
		}
		
	}else if(buildType == "inProgressPaymentType"){
		if(sublocationType == "district"){
			buildTypeArr=['District','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%','']
		}else if(sublocationType == "constituency"){
			buildTypeArr=['District','Constituency','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%','']
		}else if(sublocationType == "mandal"){
			buildTypeArr=['District','Constituency','Mandal','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%','']
		}else if(sublocationType == "panchayat"){
			buildTypeArr=['District','Constituency','Mandal','Panchayat','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%','']
		}
		
	}else if(buildType == "componentPaymentType"){
		if(sublocationType == "district"){
			buildTypeArr=['District','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
		}else if(sublocationType == "constituency"){
			buildTypeArr=['District','Constituency','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
		}else if(sublocationType == "mandal"){
			buildTypeArr=['District','Constituency','Mandal','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
		}else if(sublocationType == "panchayat"){
			buildTypeArr=['District','Constituency','Mandal','Panchayat','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
		}
		
	}
	
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered pendingWorksDatatableCls'+sublocationType+'">';
			str+='<thead>';
				str+='<tr>';
					for(var i in buildTypeArr){
						str+='<th>'+buildTypeArr[i]+'</th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in ajaxresp){
					str+='<tr>';
							if(sublocationType == "district"){
								str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
							}else if(sublocationType == "constituency"){
								str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
								str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
							}else if(sublocationType == "mandal"){
								str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
								str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
								str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
							}else if(sublocationType == "panchayat"){
								str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
								str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
								str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
								str+='<td style="text-align:left !important;">'+ajaxresp[i].panchayat+'</td>';
							}
							if(buildType == "yearType"){
									str+='<td>'+ajaxresp[i].sanctionWorks+'</td>';
									str+='<td>'+ajaxresp[i].inProgressWorks+'</td>';
									if(typeof(ajaxresp[i].count1415) != "undefined")
										str+='<td>'+ajaxresp[i].count1415+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].perc1415) != "undefined")	
										str+='<td>'+ajaxresp[i].perc1415+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].count1516) != "undefined")
										str+='<td>'+ajaxresp[i].count1516+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].perc1516) != "undefined")
										str+='<td>'+ajaxresp[i].perc1516+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].count1617) != "undefined")
										str+='<td>'+ajaxresp[i].count1617+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].perc1617) != "undefined")
										str+='<td>'+ajaxresp[i].perc1617+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].count1718) != "undefined")
										str+='<td>'+ajaxresp[i].count1718+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].perc1718) != "undefined")								
										str+='<td>'+ajaxresp[i].perc1718+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].count1819) != "undefined")
										str+='<td>'+ajaxresp[i].count1819+'</td>';
									else 
										str+='<td>0</td>';
									if(typeof(ajaxresp[i].perc1819) != "undefined")
										str+='<td>'+ajaxresp[i].perc1819+'</td>';
									else 
										str+='<td>0</td>';
									str+='<td><h5 class="componentWiseWorksCls" attr_popup_type="locationWise" attr_build_type="yearType" attr_componentName="'+category+'" attr_level_Type="'+sublocationType+'" attr_district_name="'+ajaxresp[i].district+'" attr_constituency_name="'+ajaxresp[i].constituency+'" attr_mandal_name="'+ajaxresp[i].mandal+'" attr_panchayat_name="'+ajaxresp[i].panchayat+'">&#9432;</h5></td>';
							}else{
								str+='<td>'+ajaxresp[i].totalWorks+'</td>';
								str+='<td>'+ajaxresp[i].l25Works+'</td>';
								str+='<td>'+ajaxresp[i].b25To50Works+'</td>';
								str+='<td>'+ajaxresp[i].b50To75Works+'</td>';
								str+='<td>'+ajaxresp[i].g75Works+'</td>';
								if(buildType == "inProgressPaymentType"){
									str+='<td><h5 class="componentWiseWorksCls" attr_popup_type="locationWise" attr_build_type="componentPaymentType" attr_componentName="'+category+'" attr_level_Type="'+sublocationType+'" attr_district_name="'+ajaxresp[i].district+'" attr_constituency_name="'+ajaxresp[i].constituency+'" attr_mandal_name="'+ajaxresp[i].mandal+'" attr_panchayat_name="'+ajaxresp[i].panchayat+'">&#9432;</h5></td>';
								}
								
							}
					str+='</tr>';
				}
				
			str+='</tbody>';
		str+='</table>';		
	str+='</div>';
	$("#collapsePendingWorksView"+sublocationType).html(str);
	$(".pendingWorksDatatableCls"+sublocationType).dataTable({
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[15, 20, 50, -1], [15, 20, 50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
			}
		]
	});
}
$(document).on("click",".componentWiseWorksCls",function(){
	$("#pendingWorksComponentModalId").modal('show');
	
	var buildType1 = $(this).attr("attr_build_type");
	var componentName = $(this).attr("attr_componentName");
	var popupType = $(this).attr("attr_popup_type");
	var sublocationType = $(this).attr("attr_level_Type");
	var districtName = $(this).attr("attr_district_name");
	var constituencyName = $(this).attr("attr_constituency_name");
	var mandalName = $(this).attr("attr_mandal_name");
	var panchayatName = $(this).attr("attr_panchayat_name");
	
	var checkType='';
	var levelType='';
	//var buildType='';
	$(".consolidatedViewPendingWorks").each(function(){
		if($(this).is(":checked"))
		{
			checkType = $(this).attr("level_type_id")
			//buildType = $(this).attr("attr_build_type")
		}
	});
	
	if(checkType == "yearType"){
		levelType = "INPR"
	}else{
		$(".paymentViewPendingWorks").each(function(){
			if($(this).is(":checked"))
			{
				levelType = $(this).attr("level_type_id")
				//buildType = $(this).attr("attr_build_type")
			}
		});
	}
	
	
	
	if(popupType == "locationWise"){
		if(buildType1 == "yearType"){
			if(sublocationType == "district"){
				$("#pendingWorksHeadingId").html(districtName+" "+sublocationType+" level "+componentName+" component Works Payment Details")
			}else if(sublocationType == "constituency"){
				$("#pendingWorksHeadingId").html(constituencyName+" "+sublocationType+" level "+componentName+" component Works Payment Details")
			}else if(sublocationType == "mandal"){
				$("#pendingWorksHeadingId").html(mandalName+" "+sublocationType+" level "+componentName+" component Works Payment Details")
			}else if(sublocationType == "panchayat"){
				$("#pendingWorksHeadingId").html(panchayatName+" "+sublocationType+" level "+componentName+" component Works Payment Details")
			}	
			
		}else{
			if(sublocationType == "district"){
				$("#pendingWorksHeadingId").html(districtName+" "+sublocationType+" level "+componentName+" component Year Wise Works")
			}else if(sublocationType == "constituency"){
				$("#pendingWorksHeadingId").html(constituencyName+" "+sublocationType+" level "+componentName+" component Year Wise Works")
			}else if(sublocationType == "mandal"){
				$("#pendingWorksHeadingId").html(mandalName+" "+sublocationType+" level "+componentName+" component Year Wise Works")
			}else if(sublocationType == "panchayat"){
				$("#pendingWorksHeadingId").html(panchayatName+" "+sublocationType+" level "+componentName+" component Year Wise Works")
			}
			
		}
		getLocationWisePendingWorkspopUp(sublocationType,levelType,componentName,buildType1,districtName,constituencyName,mandalName,panchayatName)
	}else{
		if(buildType1 == "yearType"){
			$("#pendingWorksHeadingId").html(componentName+" Year Wise Works")
		}else{
			$("#pendingWorksHeadingId").html(componentName+" Works Payment Details")
		}
		buildPendingWorksModalDetails(buildType1,componentName);
		
	}
	
	
});

function buildPendingWorksModalDetails(buildType,componentName){
	var str='';
	var buildTypeArr=[];
	
	if(buildType == "yearType"){
		buildTypeArr=['Component Name','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%']
	}else if(buildType == "componentPaymentType"){
		buildTypeArr=['Component Name','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
	}
	
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered">';
			str+='<thead>';
				str+='<tr>';
					for(var i in buildTypeArr){
						str+='<th>'+buildTypeArr[i]+'</th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in globalResultsPendingWorks){
					if(globalResultsPendingWorks[i].groupName == componentName){
						str+='<tr>';
							str+='<td style="text-align:left !important;">'+globalResultsPendingWorks[i].groupName+'</td>';
							if(buildType == "yearType"){
									str+='<td>'+globalResultsPendingWorks[i].sanctionWorks+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].inProgressWorks+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].count1415+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].perc1415+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].count1516+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].perc1516+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].count1617+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].perc1617+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].count1718+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].perc1718+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].count1819+'</td>';
									str+='<td>'+globalResultsPendingWorks[i].perc1819+'</td>';
							}else{
								str+='<td>'+globalResultsPendingWorks[i].totalWorks+'</td>';
								str+='<td>'+globalResultsPendingWorks[i].l25Works+'</td>';
								str+='<td>'+globalResultsPendingWorks[i].b25To50Works+'</td>';
								str+='<td>'+globalResultsPendingWorks[i].b50To75Works+'</td>';
								str+='<td>'+globalResultsPendingWorks[i].g75Works+'</td>';
							}
						str+='</tr>';
					}
				}
				
			str+='</tbody>';
		str+='</table>';		
	str+='</div>';
	$("#pendingWorksComponentBodyId").html(str);
}
function getLocationWisePendingWorkspopUp(sublocationType,levelType,category,buildType,districtName,constituencyName,mandalName,panchayatName)
{
	$("#pendingWorksComponentBodyId").html(spinner);
	var json = {
		 locationType: 'state', 
		 sublocationType: sublocationType, 
		 locationId: "-1",
		 type:levelType, //default-INPR,InP-INPR,Com-COMP
		 category : category //state -1,Click On Component Name
	}
	
	$.ajax({
		url: 'getComponentWiseYearWisePaymentWisePendingWorks',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp){
			if(ajaxresp !=null && ajaxresp.length>0){
				buildLocationWisePendingWorkspopUp(ajaxresp,sublocationType,buildType,districtName,constituencyName,mandalName,panchayatName);
			}else{
				$("#pendingWorksComponentBodyId").html("No Data Available");
			}
		}
	})
}

function buildLocationWisePendingWorkspopUp(ajaxresp,sublocationType,buildType,districtName,constituencyName,mandalName,panchayatName){
	var str='';
	var buildTypeArr=[];

	if(buildType == "yearType"){
		if(sublocationType == "district"){
			buildTypeArr=['District','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
		}else if(sublocationType == "constituency"){
			buildTypeArr=['District','Constituency','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
		}else if(sublocationType == "mandal"){
			buildTypeArr=['District','Constituency','Mandal','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
		}else if(sublocationType == "panchayat"){
			buildTypeArr=['District','Constituency','Mandal','Panchayat','Total Works','Payment <25%','Payment B/W 25 to 50%','Payment B/W 50 to 75%','Payment >75%']
		}
		
		
		
	}if(buildType == "componentPaymentType"){
		
		if(sublocationType == "district"){
			buildTypeArr=['District','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%']
		}else if(sublocationType == "constituency"){
			buildTypeArr=['District','Constituency','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%']
		}else if(sublocationType == "mandal"){
			buildTypeArr=['District','Constituency','Mandal','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%']
		}else if(sublocationType == "panchayat"){
			buildTypeArr=['District','Constituency','Mandal','Panchayat','Sanctioned Works','In Progress','2014-2015','%','2015-2016','%','2016-2017','%','2017-2018','%','2018-2019','%']
		}
	}
	
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered">';
			str+='<thead>';
				str+='<tr>';
					for(var i in buildTypeArr){
						str+='<th>'+buildTypeArr[i]+'</th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in ajaxresp){
					if(sublocationType == "district"){
							if(ajaxresp[i].district == districtName){
									str+='<tr>';
										if(sublocationType == "district"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
										}else if(sublocationType == "constituency"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
										}else if(sublocationType == "mandal"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
										}else if(sublocationType == "panchayat"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].panchayat+'</td>';
										}
										if(buildType == "yearType"){
												str+='<td>'+ajaxresp[i].totalWorks+'</td>';
												str+='<td>'+ajaxresp[i].l25Works+'</td>';
												str+='<td>'+ajaxresp[i].b25To50Works+'</td>';
												str+='<td>'+ajaxresp[i].b50To75Works+'</td>';
												str+='<td>'+ajaxresp[i].g75Works+'</td>';
										}else{
											    str+='<td>'+ajaxresp[i].sanctionWorks+'</td>';
												str+='<td>'+ajaxresp[i].inProgressWorks+'</td>';
												str+='<td>'+ajaxresp[i].count1415+'</td>';
												str+='<td>'+ajaxresp[i].perc1415+'</td>';
												str+='<td>'+ajaxresp[i].count1516+'</td>';
												str+='<td>'+ajaxresp[i].perc1516+'</td>';
												str+='<td>'+ajaxresp[i].count1617+'</td>';
												str+='<td>'+ajaxresp[i].perc1617+'</td>';
												str+='<td>'+ajaxresp[i].count1718+'</td>';
												str+='<td>'+ajaxresp[i].perc1718+'</td>';
												str+='<td>'+ajaxresp[i].count1819+'</td>';
												str+='<td>'+ajaxresp[i].perc1819+'</td>';
										}
									str+='</tr>';
								}
						}else if(sublocationType == "constituency"){
							if(ajaxresp[i].constituency == constituencyName){
									str+='<tr>';
										if(sublocationType == "district"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
										}else if(sublocationType == "constituency"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
										}else if(sublocationType == "mandal"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
										}else if(sublocationType == "panchayat"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].panchayat+'</td>';
										}
										if(buildType == "yearType"){
												str+='<td>'+ajaxresp[i].totalWorks+'</td>';
												str+='<td>'+ajaxresp[i].l25Works+'</td>';
												str+='<td>'+ajaxresp[i].b25To50Works+'</td>';
												str+='<td>'+ajaxresp[i].b50To75Works+'</td>';
												str+='<td>'+ajaxresp[i].g75Works+'</td>';
										}else{
											    str+='<td>'+ajaxresp[i].sanctionWorks+'</td>';
												str+='<td>'+ajaxresp[i].inProgressWorks+'</td>';
												str+='<td>'+ajaxresp[i].count1415+'</td>';
												str+='<td>'+ajaxresp[i].perc1415+'</td>';
												str+='<td>'+ajaxresp[i].count1516+'</td>';
												str+='<td>'+ajaxresp[i].perc1516+'</td>';
												str+='<td>'+ajaxresp[i].count1617+'</td>';
												str+='<td>'+ajaxresp[i].perc1617+'</td>';
												str+='<td>'+ajaxresp[i].count1718+'</td>';
												str+='<td>'+ajaxresp[i].perc1718+'</td>';
												str+='<td>'+ajaxresp[i].count1819+'</td>';
												str+='<td>'+ajaxresp[i].perc1819+'</td>';
										}
									str+='</tr>';
								}
						}else if(sublocationType == "mandal"){
							if(ajaxresp[i].mandal == mandalName){
									str+='<tr>';
										if(sublocationType == "district"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
										}else if(sublocationType == "constituency"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
										}else if(sublocationType == "mandal"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
										}else if(sublocationType == "panchayat"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].panchayat+'</td>';
										}
										if(buildType == "yearType"){
												str+='<td>'+ajaxresp[i].totalWorks+'</td>';
												str+='<td>'+ajaxresp[i].l25Works+'</td>';
												str+='<td>'+ajaxresp[i].b25To50Works+'</td>';
												str+='<td>'+ajaxresp[i].b50To75Works+'</td>';
												str+='<td>'+ajaxresp[i].g75Works+'</td>';
										}else{
											    str+='<td>'+ajaxresp[i].sanctionWorks+'</td>';
												str+='<td>'+ajaxresp[i].inProgressWorks+'</td>';
												str+='<td>'+ajaxresp[i].count1415+'</td>';
												str+='<td>'+ajaxresp[i].perc1415+'</td>';
												str+='<td>'+ajaxresp[i].count1516+'</td>';
												str+='<td>'+ajaxresp[i].perc1516+'</td>';
												str+='<td>'+ajaxresp[i].count1617+'</td>';
												str+='<td>'+ajaxresp[i].perc1617+'</td>';
												str+='<td>'+ajaxresp[i].count1718+'</td>';
												str+='<td>'+ajaxresp[i].perc1718+'</td>';
												str+='<td>'+ajaxresp[i].count1819+'</td>';
												str+='<td>'+ajaxresp[i].perc1819+'</td>';
										}
									str+='</tr>';
								}
						}else if(sublocationType == "panchayat"){
							if(ajaxresp[i].panchayat == panchayatName){
									str+='<tr>';
										if(sublocationType == "district"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
										}else if(sublocationType == "constituency"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
										}else if(sublocationType == "mandal"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
										}else if(sublocationType == "panchayat"){
											str+='<td style="text-align:left !important;">'+ajaxresp[i].district+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].constituency+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].mandal+'</td>';
											str+='<td style="text-align:left !important;">'+ajaxresp[i].panchayat+'</td>';
										}
										if(buildType == "yearType"){
												str+='<td>'+ajaxresp[i].totalWorks+'</td>';
												str+='<td>'+ajaxresp[i].l25Works+'</td>';
												str+='<td>'+ajaxresp[i].b25To50Works+'</td>';
												str+='<td>'+ajaxresp[i].b50To75Works+'</td>';
												str+='<td>'+ajaxresp[i].g75Works+'</td>';
										}else{
											    str+='<td>'+ajaxresp[i].sanctionWorks+'</td>';
												str+='<td>'+ajaxresp[i].inProgressWorks+'</td>';
												if(typeof(ajaxresp[i].count1415) != "undefined")
													str+='<td>'+ajaxresp[i].count1415+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].perc1415) != "undefined")
													str+='<td>'+ajaxresp[i].perc1415+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].count1516) != "undefined")
													str+='<td>'+ajaxresp[i].count1516+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].perc1516) != "undefined")
													str+='<td>'+ajaxresp[i].perc1516+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].count1617) != "undefined")
													str+='<td>'+ajaxresp[i].count1617+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].perc1617) != "undefined")
													str+='<td>'+ajaxresp[i].perc1617+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].count1718) != "undefined")
													str+='<td>'+ajaxresp[i].count1718+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].perc1718) != "undefined")
													str+='<td>'+ajaxresp[i].perc1718+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].count1819) != "undefined")
													str+='<td>'+ajaxresp[i].count1819+'</td>';
												else
													str+='<td>0</td>';
												if(typeof(ajaxresp[i].perc1819) != "undefined")
													str+='<td>'+ajaxresp[i].perc1819+'</td>';
												else
													str+='<td>0</td>';
										}
									str+='</tr>';
								}
						}
						
				}
				
			str+='</tbody>';
		str+='</table>';		
	str+='</div>';
	$("#pendingWorksComponentBodyId").html(str);
}

$(document).on("click",".levelWiseExpenditureCls",function(){
	$("#nregsMnthExpModalId").modal("show");
	$("#mnthExBodyId").html(spinner);
	var monthname = $(this).attr("attr_month");
	var viewType = $(this).attr("attr_type");
	$("#mnthExpHeadingId").html(monthname+" Month "+viewType+" Wise Details");
	getLocationWiseDetilsForMonth(monthname,viewType);
});

function getLocationWiseDetilsForMonth(monthname,viewType){
	var json = {
		 viewType: viewType, 
		 month: monthname 
	}
	$.ajax({
		url: 'getLocationWiseNregaExpenditureForMonth',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp){
			if(ajaxresp !=null && ajaxresp.length>0){
				buildLocationWiseExpenditureDetails(ajaxresp);
			}else{
				$("#mnthExBodyId").html("No Data Available");
			}
		}
	})
}

function buildLocationWiseExpenditureDetails(result){
	var str='';
	
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered dataTablepopUpCls expendituremodalCls" style="width:100%">';
			str+='<thead class="text-capitalize">';
				str+='<tr>';
					str+='<th rowspan="2" style="background-color:#034575;color:#fff">District</th>';
					str+='<th colspan="4" class="text-center" style="background-color:#565b07;color:#fff">2018-19</th>';
					str+='<th colspan="4" class="text-center" style="background-color:#41c4f4;color:#fff">2017-18</th>';
					str+='<th colspan="4" class="text-center" style="background-color:#ea9009;color:#fff">2016-17</th>';
					str+='<th colspan="4" class="text-center" style="background-color:#26243c;color:#fff">2015-16</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th style="background-color:#565b07;color:#fff">Person Days</th>';					
					//str+='<th style="background-color:#565b07;color:#fff">Actual Person Days</th>';					
					str+='<th style="background-color:#565b07;color:#fff">Wage</th>';
					str+='<th style="background-color:#565b07;color:#fff">Material</th>';
					str+='<th style="background-color:#565b07;color:#fff">Total</th>';
					
					str+='<th style="background-color:#41c4f4;color:#fff">Person Days</th>';
					str+='<th style="background-color:#41c4f4;color:#fff">Wage</th>';
					str+='<th style="background-color:#41c4f4;color:#fff">Material</th>';
					str+='<th style="background-color:#41c4f4;color:#fff">Total</th>';
					
					str+='<th style="background-color:#ea9009;color:#fff">Person Days</th>';
					str+='<th style="background-color:#ea9009;color:#fff">Wage</th>';
					str+='<th style="background-color:#ea9009;color:#fff">Material</th>';
					str+='<th style="background-color:#ea9009;color:#fff">Total</th>';
					
					str+='<th style="background-color:#26243c;color:#fff">Person Days</th>';
					str+='<th style="background-color:#26243c;color:#fff">Wage</th>';
					str+='<th style="background-color:#26243c;color:#fff">Material</th>';
					str+='<th style="background-color:#26243c;color:#fff">Total</th>';
					
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			if(result != null && result.length > 0){
				for(var i in result){
					str+='<tr>';
						str+='<td>'+result[i].name+'</td>';
						if(result[i].subList != null && result[i].subList.length > 0){
							for(var j in result[i].subList){
								//Person Days
								if(result[i].subList[j].overAllPersonDaysHigh != null && result[i].subList[j].overAllPersonDaysHigh == "TRUE")
									str+='<td style="background-color:#0000FE;color:#fff">'+result[i].subList[j].personDays+'</td>';
								else if(result[i].subList[j].overAllPersonDaysLow != null && result[i].subList[j].overAllPersonDaysLow == "TRUE")
									str+='<td style="background-color:#FE00FE;color:#fff">'+result[i].subList[j].personDays+'</td>';
								else if(result[i].subList[j].isPersonDaysHigh != null && result[i].subList[j].isPersonDaysHigh == "TRUE")
									str+='<td style="background-color:#a7f442;">'+result[i].subList[j].personDays+'</td>';
								else if(result[i].subList[j].isPersonDaysHigh != null && result[i].subList[j].isPersonDaysHigh == "FALSE")
									str+='<td style="background-color:#FD0100;color:#fff">'+result[i].subList[j].personDays+'</td>';
								else
									str+='<td>'+result[i].subList[j].personDays+'</td>';
								//Actual Person Days
								//if(result[i].subList[j].id != null && result[i].subList[j].id == 13)
									//str+='<td style="background-color:#a7f442;">'+result[i].subList[j].actualPersonDays+'</td>';
								//WAGE
								if(result[i].subList[j].overAllWageIsHigh != null && result[i].subList[j].overAllWageIsHigh == "TRUE")
									str+='<td style="background-color:#0000FE;color:#fff">'+result[i].subList[j].wage+'</td>';
								else if(result[i].subList[j].overAllWageLow != null && result[i].subList[j].overAllWageLow == "TRUE")
									str+='<td style="background-color:#FE00FE;color:#fff">'+result[i].subList[j].wage+'</td>';
								else if(result[i].subList[j].isWageHigh != null && result[i].subList[j].isWageHigh == "TRUE")
									str+='<td style="background-color:#a7f442;">'+result[i].subList[j].wage+'</td>';
								else if(result[i].subList[j].isWageHigh != null && result[i].subList[j].isWageHigh == "FALSE")
									str+='<td style="background-color:#FD0100;color:#fff">'+result[i].subList[j].wage+'</td>';
								else 
									str+='<td>'+result[i].subList[j].wage+'</td>';
								//Material
								if(result[i].subList[j].overAllMatIsHigh != null && result[i].subList[j].overAllMatIsHigh == "TRUE")
									str+='<td style="background-color:#0000FE;color:#fff">'+result[i].subList[j].material+'</td>';
								else if(result[i].subList[j].overAllMatLow != null && result[i].subList[j].overAllMatLow == "TRUE")
									str+='<td style="background-color:#FE00FE;color:#fff">'+result[i].subList[j].material+'</td>';
								else if(result[i].subList[j].isMatHigh != null && result[i].subList[j].isMatHigh == "TRUE")
									str+='<td style="background-color:#a7f442;">'+result[i].subList[j].material+'</td>';
								else if(result[i].subList[j].isMatHigh != null && result[i].subList[j].isMatHigh == "FALSE")
									str+='<td style="background-color:#FD0100;color:#fff">'+result[i].subList[j].material+'</td>';
								else
									str+='<td>'+result[i].subList[j].material+'</td>';
								//Total
								if(result[i].subList[j].overAllTotalIsHigh != null && result[i].subList[j].overAllTotalIsHigh == "TRUE")
									str+='<td style="background-color:#0000FE;color:#fff">'+result[i].subList[j].total+'</td>';
								else if(result[i].subList[j].overAllTotalLow != null && result[i].subList[j].overAllTotalLow == "TRUE")
									str+='<td style="background-color:#FE00FE;color:#fff">'+result[i].subList[j].total+'</td>';
								else if(result[i].subList[j].isTotalHigh != null && result[i].subList[j].isTotalHigh == "TRUE")
									str+='<td style="background-color:#a7f442;">'+result[i].subList[j].total+'</td>';
								else if(result[i].subList[j].isTotalHigh != null && result[i].subList[j].isTotalHigh == "FALSE")
									str+='<td style="background-color:#FD0100;color:#fff">'+result[i].subList[j].total+'</td>';
								else
									str+='<td>'+result[i].subList[j].total+'</td>';
							}
						}
					str+='</tr>';
				}
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	
	$("#mnthExBodyId").html(str);
	$(".expendituremodalCls").dataTable({
		"iDisplayLength": 20,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"scrollX":        true,
		"scrollCollapse": true,
		"fixedColumns":   {
			"leftColumns": 1,
		},
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Expenditure',
				filename:  'Expenditure',
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF',
				title:	   'Expenditure',
				filename:  'Expenditure',
				orientation: "landscape",
				pageSize:'A3',
				customize: function (doc) {
					doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				}
			}
		]
	});
}

function getNregasKeyPropertiesComponentsOverview(projectDivId,menuLocationType,menuLocationId)
{
	//var districtId = $("#selectedName").attr("attr_distId");
	$("#projectOvervw"+projectDivId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')).html(spinner);
	
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType : menuLocationType,
		locationId : menuLocationId,
		divType : projectDivId
	}
	
	$.ajax({
		url: 'getNregasKeyPropertiesComponentsOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNregasOverViewBlock(ajaxresp,projectDivId,menuLocationType,menuLocationId);
		}
	});
}

function getNregaKeyPropertyComponentsLevelsWiseData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName)
{	
	$("#"+divIdd).html(spinner);
	var distrtId = $("#selectedName").attr("attr_distid");
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocationType : locationTypeNew,
		districtId : distrtId
	}
	
	$.ajax({
		url: 'getNregaKeyPropertyComponentsLevelsWiseData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationTypeNew == "state"){
							str+='<td class="text-capitalize">'+locationTypeNew+'</td>';
						}
						else if(locationTypeNew == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
						}
						else if(locationTypeNew == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationTypeNew == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationTypeNew == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].panchayat+'</td>';
						}
						if(globalDivName != null && globalDivName == "Soak Pits"){
							str+='<td>'+ajaxresp[i].totalGps+'</td>';
							str+='<td>'+ajaxresp[i].target+'</td>';
							str+='<td>'+ajaxresp[i].groundedGps+'</td>';
							str+='<td>'+ajaxresp[i].groundedSoakPits+'</td>';
							str+='<td>'+ajaxresp[i].inprGps+'</td>';
							str+='<td>'+ajaxresp[i].inprSoakPits+'</td>';
							str+='<td>'+ajaxresp[i].completedGps+'</td>';
							str+='<td>'+ajaxresp[i].completedSoakpits+'</td>';
							if(ajaxresp[i].percentage >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
						}else{
							str+='<td>'+ajaxresp[i].mulbTarget+'</td>';
							if(globalDivName != null && globalDivName != "NRM Works"){
								str+='<td>'+ajaxresp[i].grounded+'</td>';
						
								var groundValue = ajaxresp[i].grounded;
								var targetValue = ajaxresp[i].mulbTarget;
								var groundedPerc = "0.00";
								if(targetValue > 0 && groundValue > 0)
									groundedPerc = ((groundValue*100)/targetValue).toFixed(2);
							
								if(groundedPerc >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 90 && groundedPerc < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+groundedPerc+'</td>';
								}else if(groundedPerc >= 60 && groundedPerc < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+groundedPerc+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+groundedPerc+'</td>';
								}
								
								if(globalDivName != null && globalDivName == "Mini Percolation tank" && (locationTypeNew == "state" || locationTypeNew == "district")){
									str+='<td>'+ajaxresp[i].sanctionedTarget+'</td>';
									str+='<td>'+ajaxresp[i].sanctionedpercentage+'</td>';
								}
								
								str+='<td>'+ajaxresp[i].notGrounded+'</td>';
								str+='<td>'+ajaxresp[i].mulbInprogress+'</td>';
								str+='<td>'+ajaxresp[i].mulbCompleted+'</td>';
							}else{
								str+='<td>'+ajaxresp[i].mulbCompleted+'</td>';
							}
							
							if(ajaxresp[i].percentage >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 90 && ajaxresp[i].percentage < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 60 && ajaxresp[i].percentage < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percentage+'</td>';
							}
							
							if(globalDivName != null && globalDivName != "Mini Percolation tank" && globalDivName != "Nutri Garden" && globalDivName != "NRM Works"){
								str+='<td>'+ajaxresp[i].wageExpenditure+'</td>';
								str+='<td>'+ajaxresp[i].materialExpenditure+'</td>';
								str+='<td>'+ajaxresp[i].totalExpenditure+'</td>';	
							}
						}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationTypeNew,blockName);
		}
	});
}

function getApWeeklyAcheivementAbstractData(type,locType,locId,blockName,levelId){
	$("#"+type).html(spinner);
	var fridayDate = getLastFridayDate(5);
	//var fridayDate = "31/08/2018";
	var json = {
		fromDate : fridayDate,
		fromMonth : moment().format("YYYYMM"),
		year : "2018-2019",
		locationType: locType
	}
	
	$.ajax({
		url: 'getApWeeklyAcheivementAbstractData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			var str = '';
			$("[overview-block='"+type+"']").removeClass("panel-block-white");
			$("[overview-block='"+type+"']").attr("attr_levelId",levelId);
			$("[overview-block='"+type+"']").attr("attr_locationId",locId);
			str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="padding-top: 5px;">';
			if(type.length > 12)
			{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type.substr(0,12)+'..</h4>';
			}else{
				str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="'+type+'">'+type+'</h4>';
			}
			str+='<small class="text-center font_weight">Week</small>';
			if(result[0].weeklyComp != null && result[0].weeklyComp != 0)
			{
				str+='<h2 class="text-center">'+result[0].weeklyComp+'</h2>';
			}else{
				str+='<h2 class="text-center">0</h2>';
			}
			str+='<div class="row">';
				str+='<div class="col-sm-6 text-center pad_right0">';
					str+='<label style="font-size: 12px;">Month</label>';
					if(result[0].monthlyComp != null && result[0].monthlyComp != 0)
					{
						str+='<h4>'+result[0].monthlyComp+'</h4>';
					}else{
						str+='<h4>0</h4>';
					}
					
				str+='</div>';
				str+='<div class="col-sm-6 text-center pad_left0">';
					str+='<label style="font-size: 12px;">Fin. Year</label>';
					if(result[0].yearlyComp != null && result[0].yearlyComp != 0)
					{
						str+='<h4>'+result[0].yearlyComp+'</h4>';
					}else{
						str+='<h4>0</h4>';
					}
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		$("[overview-block='"+type+"']").html(str);
		if(type == blockName)
		{
			$("[overview-block='"+blockName+"']").trigger("click");
		}
		}
	})
}

function getLastFridayDate(dayOfWeek) {
  var date = new Date();
  date.setDate(date.getDate() + (dayOfWeek - 7 - date.getDay()) % 7);
  return moment(date).format("DD/MM/YYYY");
}

function getComponentWiseWeeklyProgressCollapse(){
	var str='';
		str+='<div class="row">';
			str+='<div class="col-sm-12 m_top10">';
				str+='<div class="panel-group" id="accordion_WeeklyComparision" role="tablist" aria-multiselectable="true">';
					str+='<div class="panel panel-default panel-black">';
						str+='<div class="panel-heading" role="tab" id="heading_WeeklyComparision">';
							str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion_WeeklyComparision" href="#collapse_WeeklyComparision" aria-expanded="true" aria-controls="collapse_WeeklyComparision">';
							str+='<h4 class="panel-title text-capital">state level overview - Weekly Comparision (Expenditure in Crores)</h4>';
							str+='</a>';
						str+='</div>';
						str+='<div id="collapse_WeeklyComparision" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_WeeklyComparision">';
							str+='<div class="panel-body">';
								str+='<div class="row">';
									str+='<div class="col-sm-12 m_top10">';
										str+='<div id="stateLevelComponetWiseWeeklyComparision"></div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		$("#projectData").html(str);
		getApWeeklyAcheivementData();
}

function getApWeeklyAcheivementData(){
	$("#stateLevelComponetWiseWeeklyComparision").html(spinner);
	var fridayDate = getLastFridayDate(5);
	//var fridayDate = "31/08/2018";
	var json = {
		fromDate : fridayDate,
		fromMonth : moment().format("YYYYMM"),
		year : "2018-2019",
		locationType: "state"
	}
	
	$.ajax({
		url: 'getApWeeklyAcheivementData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			globalResultsWeeklyReportWorks = ajaxresp;
			var str='';
			str+='<div class="table-responsive">';
				str+='<table class="table table-bordered stateLevelDatatableCls">';
					str+='<thead>';
						str+='<tr>';
							str+='<th rowspan="2">Department Name</th>';
							str+='<th rowspan="2">Component</th>';
							str+='<th rowspan="2">Units</th>';
							str+='<th colspan="4">This Week</th>';
							str+='<th colspan="4">This Month</th>';
							str+='<th colspan="4">This Year</th>';
						str+='</tr>';
						str+='<tr>';
							str+='<th>Target</th>';
							str+='<th>Completed</th>';
							str+='<th>%</th>';
							str+='<th>Expenditure</th>';
							str+='<th>Target</th>';
							str+='<th>Completed</th>';
							str+='<th>%</th>';
							str+='<th>Expenditure</th>';
							str+='<th>Target</th>';
							str+='<th>Completed</th>';
							str+='<th>%</th>';
							str+='<th>Expenditure</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						for(var i in ajaxresp){
							str+='<tr>';
								str+='<td>'+ajaxresp[i].departmentName+'</td>';
								str+='<td style="text-align:left !important;"><a style="cursor:pointer;" class="weeklyDistDetailsCls" attr_component_name="'+ajaxresp[i].name+'">'+ajaxresp[i].name+'</a></td>';
								str+='<td>'+ajaxresp[i].units+'</td>';
								str+='<td>'+ajaxresp[i].weeklyTarget+'</td>';
								str+='<td>'+ajaxresp[i].weeklyComp+'</td>';
								str+='<td>'+ajaxresp[i].weeklyPerc+'</td>';
								str+='<td>'+parseFloat(ajaxresp[i].weeklyExp).toFixed(2)+'</td>';
								str+='<td>'+ajaxresp[i].monthlyTarget+'</td>';
								str+='<td>'+ajaxresp[i].monthlyComp+'</td>';
								str+='<td>'+ajaxresp[i].monthlyPerc+'</td>';
								str+='<td>'+parseFloat(ajaxresp[i].monthlyExp).toFixed(2)+'</td>';
								str+='<td>'+ajaxresp[i].overAllTarget+'</td>';
								str+='<td>'+ajaxresp[i].yearlyComp+'</td>';
								str+='<td>'+ajaxresp[i].overAllPerc+'</td>';
								str+='<td>'+parseFloat(ajaxresp[i].yearlyExp).toFixed(2)+'</td>';
							str+='</tr>';
						}
						
					str+='</tbody>';
				str+='</table>';		
			str+='</div>';
			$("#stateLevelComponetWiseWeeklyComparision").html(str);
			$(".stateLevelDatatableCls").dataTable({
				"order": [[ 0, "asc" ]],
				"aLengthMenu": [[15, 20, 50, -1], [15, 20, 50, "All"]],
				"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
				buttons: [
					{
						extend:    'csvHtml5',
						text:      '<i class="fa fa-file-text-o"></i>',
						titleAttr: 'CSV',
					}
				]
			});
		}
	})
}

$(document).on("click",".weeklyDistDetailsCls",function(){
	$("#pendingWorksComponentModalId").modal('show');
	var subList = $(this).attr("attr_dist_list");
	var compontName = $(this).attr("attr_component_name");
	$("#pendingWorksHeadingId").html(compontName+" - District Wise Details");
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered stateLevelDatatableModelCls" style="width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">District</th>';
					str+='<th colspan="2">This Week</th>';
					str+='<th colspan="2">This Month</th>';
					str+='<th colspan="2">This Year</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>Completed</th>';
					str+='<th>Expenditure</th>';
					str+='<th>Completed</th>';
					str+='<th>Expenditure</th>';
					str+='<th>Completed</th>';
					str+='<th>Expenditure</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in globalResultsWeeklyReportWorks){
				if(globalResultsWeeklyReportWorks[i].name == compontName){
					for(var j in globalResultsWeeklyReportWorks[i].subList){
					str+='<tr>';
						str+='<td>'+globalResultsWeeklyReportWorks[i].subList[j].districtName+'</a></td>';
						str+='<td>'+globalResultsWeeklyReportWorks[i].subList[j].weeklyComp+'</td>';
						str+='<td>'+parseFloat(globalResultsWeeklyReportWorks[i].subList[j].weeklyExp).toFixed(2)+'</td>';
						str+='<td>'+globalResultsWeeklyReportWorks[i].subList[j].monthlyComp+'</td>';
						str+='<td>'+parseFloat(globalResultsWeeklyReportWorks[i].subList[j].monthlyExp).toFixed(2)+'</td>';
						str+='<td>'+globalResultsWeeklyReportWorks[i].subList[j].yearlyComp+'</td>';
						str+='<td>'+parseFloat(globalResultsWeeklyReportWorks[i].subList[j].yearlyExp).toFixed(2)+'</td>';
					str+='</tr>';
				}
				}
			}
			str+='</tbody>';
		str+='</table>';		
	str+='</div>';
	$("#pendingWorksComponentBodyId").html(str);
	$(".stateLevelDatatableModelCls").dataTable({
		"order": [[ 0, "asc" ]],
		"aLengthMenu": [[15, 20, 50, -1], [15, 20, 50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
			}
		]
	});
});

function getNregaDeptWiseMaterialExpenditureDtlsLocationWise(divIdd,locationType,theadArr,menuLocationType,menuLocationId,blockName)
{	
	$("#"+divIdd).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		locationId : menuLocationId,
		sublocaType :locationType
	}
	$.ajax({
		url: 'getMaterialExpenditureDetails',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
					str+='<tr>';
						if(locationType == "state"){
							str+='<td class="text-capitalize">'+locationType+'</td>';
						}
						else if(locationType == "district"){
							str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
						}
						else if(locationType == "constituency"){
							str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituencyName+'</td>';
						}
						else if(locationType == "mandal"){
							str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituencyName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandalName+'</td>';
						}
						else if(locationType == "panchayat"){
							str+='<td class="text-capitalize">'+ajaxresp[i].districtName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].constituencyName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].mandalName+'</td>';
							str+='<td class="text-capitalize">'+ajaxresp[i].tehsilName+'</td>';
						}
						str+='<td>'+ajaxresp[i].pr+'</td>';
						str+='<td>'+ajaxresp[i].tribalWelfare+'</td>';
						str+='<td>'+ajaxresp[i].forest+'</td>';
						str+='<td>'+ajaxresp[i].serp+'</td>';
						str+='<td>'+ajaxresp[i].housing+'</td>';
						str+='<td>'+ajaxresp[i].animalHusbandry+'</td>';
						str+='<td>'+ajaxresp[i].fisheries+'</td>';
						str+='<td>'+ajaxresp[i].sericulture+'</td>';
						str+='<td>'+ajaxresp[i].education+'</td>';
						str+='<td>'+ajaxresp[i].mcc+'</td>';
						str+='<td>'+ajaxresp[i].wcc+'</td>';
						str+='<td>'+ajaxresp[i].ccc+'</td>';
						str+='<td>'+ajaxresp[i].totalExp+'</td>';
						if(typeof(ajaxresp[i].balanceMaterial) != "undefined"){
							str+='<td>'+ajaxresp[i].balanceMaterial+'</td>';
						}else{
							str+='<td>0</td>';
						}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationType,blockName);
		}
	});
}

function getSoakPitsAbstractLevelsWiseData(divIdd,locationTypeNew,menuLocationType,menuLocationId,levelId,blockName)
{
	$("#"+divIdd).html(spinner);
	var distrtId = $("#selectedName").attr("attr_distid");
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : divIdd,
		locationId : menuLocationId,
		sublocationType : locationTypeNew,
		districtId : distrtId,
		sector : 'abstract'
	}
	
	$.ajax({
		url: 'getNregaSoakPitsAbstractDatabyLocation',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,blockName,menuLocationId,menuLocationType,levelId);
		}
	});
}