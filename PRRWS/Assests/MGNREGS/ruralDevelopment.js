var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
$("#dateRangePickerMGNF").val('2018-04-01');
$("#dateRangePickerMGNT").val(moment().format("YYYY-MM")+'-30');
var glStartDate = '2018-04-01'//moment().startOf('year').format("YYYY-MM")+'-1';
var glEndDate = moment().format("YYYY-MM")+'-30';
var globalFinancialYear = "2018";
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
$("#dateRangePickerMGNF").datetimepicker({
	format: 'YYYY-MM',
	viewMode:'months'
});
$("#dateRangePickerMGNT").datetimepicker({
	format: 'YYYY-MM',
	viewMode:'months'
});
/*$(document).on('cut copy paste', function (e) {
	e.preventDefault();
});*/
$('#dateRangePickerMGNF').on('dp.change', function(e){ 
	glStartDate = e.date.format("YYYY-MM")+"-01";
	var levelId = $("#selectedName").attr("attr_levelId");
	var locId = $("#selectedName").attr("attr_id");
	var locType = '';
	if(levelId == 2)
	{
		locType = 'state'
	}else if(levelId == 3)
	{
		locType = 'district'
	}
	
	var fromDatteee = new Date(glStartDate);
	var lastFinaYearDatee = new Date("2018-03-31");
	
	//alert(fromDatteee > lastFinaYearDatee)
	if(fromDatteee > lastFinaYearDatee)
		globalFinancialYear = "2018";
	else
		globalFinancialYear = "2017";
	//alert(globalFinancialYear);
	for(var i in overViewArr)
	{
		$("[overview-block='"+overViewArr[i]+"']").append(spinner);
		$("[overview-block='"+overViewArr[i]+"']").append(spinner);
		if(overViewArr[i] == 'SMC Trench' || overViewArr[i] == 'Imp to CD' || overViewArr[i] == 'MPT_PT' || overViewArr[i] == 'GC Works' || overViewArr[i] == 'CD_CW' || overViewArr[i] == 'WaterBudget' || overViewArr[i] == 'GH')
		{
			getRDAbstractDataByType(overViewArr[i],'state',"0",'',2);
		}else if(overViewArr[i] == 'Ntr Jalasiri')
		{
			getNtrJalaSiriLvlWiseData("","state","",locType,locId,"Abstract");
		}
	}

	buildOverviewAbstract();
});
$('#dateRangePickerMGNT').on('dp.change', function(e){ 
	glEndDate = e.date.format("YYYY-MM")+"-31";
	var levelId = $("#selectedName").attr("attr_levelId");
	var locId = $("#selectedName").attr("attr_id");
	var locType = '';
	if(levelId == 2)
	{
		locType = 'state'
	}else if(levelId == 3)
	{
		locType = 'district'
	}
	for(var i in overViewArr)
	{
		$("[overview-block='"+overViewArr[i]+"']").append(spinner);
		$("[overview-block='"+overViewArr[i]+"']").append(spinner);
		if(overViewArr[i] == 'SMC Trench' || overViewArr[i] == 'Imp to CD' || overViewArr[i] == 'MPT_PT' || overViewArr[i] == 'GC Works' || overViewArr[i] == 'CD_CW' || overViewArr[i] == 'WaterBudget' || overViewArr[i] == 'GH')
		{
			getRDAbstractDataByType(overViewArr[i],'state',"0",'',2);
		}else if(overViewArr[i] == 'Ntr Jalasiri')
		{
			getNtrJalaSiriLvlWiseData("","state","",locType,locId,"Abstract");
		}
	}

	buildOverviewAbstract();
});
$(document).on('click','[overview-block]', function(){
	$("[overview-state],[overview-district]").removeClass("active");
	var projectDivId = $(this).attr("overview-block");
	var levelId = $(this).attr("attr_levelId");
	var locationId = $(this).attr("attr_locationId");
	$("[overview-state='"+projectDivId+"'],[overview-district='"+projectDivId+"']").addClass("active");
	globalDivName = projectDivId;
	overviewData(projectDivId,levelId,locationId);
	projectData(projectDivId,levelId,locationId);
	$('html,body').animate({
		scrollTop: $("#projectOverviewBlock").offset().top},
	'slow');
});
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
	if(levelId == 3)
	{
		for(var i in overViewArr)
		{
			$("[overview-block='"+overViewArr[i]+"']").html(spinner);
			if(overViewArr[i] == 'SMC Trench' || overViewArr[i] == 'Imp to CD' || overViewArr[i] == 'MPT_PT' || overViewArr[i] == 'GC Works' || overViewArr[i] == 'CD_CW' || overViewArr[i] == 'WaterBudget' || overViewArr[i] == 'GH')
			{
				getRDAbstractDataByType(overViewArr[i],'district',locId,blockName,levelId,'onLoad');
			}else if(overViewArr[i] == 'Ntr Jalasiri')
			{
				getNtrJalaSiriLvlWiseData("","state","",menuLocationType,menuLocationId,"Abstract",blockName);
			}
		}
	}else if(levelId == 4)
	{
		for(var i in overViewArr)
		{
			$("[overview-block='"+overViewArr[i]+"']").html(spinner);
			if(overViewArr[i] == 'SMC Trench' || overViewArr[i] == 'Imp to CD' || overViewArr[i] == 'MPT_PT' || overViewArr[i] == 'GC Works' || overViewArr[i] == 'CD_CW' || overViewArr[i] == 'WaterBudget' || overViewArr[i] == 'GH')
			{
				getRDAbstractDataByType(overViewArr[i],'constituency',locId,blockName,levelId,'onLoad');
			}else if(overViewArr[i] == 'Ntr Jalasiri')
			{
				getNtrJalaSiriLvlWiseData("","state","",menuLocationType,menuLocationId,"Abstract",blockName);
			}
		}
	}else if(levelId == 2)
	{
		for(var i in overViewArr)
		{
			$("[overview-block='"+overViewArr[i]+"']").html(spinner);
			if(overViewArr[i] == 'SMC Trench' || overViewArr[i] == 'Imp to CD' || overViewArr[i] == 'MPT_PT' || overViewArr[i] == 'GC Works' || overViewArr[i] == 'CD_CW' || overViewArr[i] == 'WaterBudget' || overViewArr[i] == 'GH')
			{
				getRDAbstractDataByType(overViewArr[i],'state',locId,blockName,levelId,'onLoad');
			}else if(overViewArr[i] == 'Ntr Jalasiri')
			{
				getNtrJalaSiriLvlWiseData("","state","",menuLocationType,menuLocationId,"Abstract",blockName);
			}
		}
	}
	
});
$(document).on("click",".panelCollapseIconClick",function(e){
	e.stopPropagation();
	var buildId = $(this).attr("attr_targetId");
	var locationScopeId = $(this).attr("attr_id");
	var levelId = $(this).attr("attr_levelIdValue");
	
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
$(document).on("click","#selectedName",function(e){
	e.stopPropagation();
	$(".multi-level-selection-menu").show();
});
$(document).on('click','[overview-level]', function(){
		var collapseExpanded = $(this).attr("aria-expanded");
		if(collapseExpanded == true || collapseExpanded == 'true')
		{
			var levelType = $(this).attr("overview-level");
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
			var theadArr = [];
			if((globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW') )
			{
				theadArr = [levelType,'Target','Sanctioned Target','Grounded','Not-Grounded','In Progress','Completed','Achievement Percentage','Sanctioned Percentage'];
				if(levelType == "constituency")
					theadArr = ["District",levelType,'Target','Grounded','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(levelType == "mandal")
					theadArr = ["District","Constituency",levelType,'Target','Grounded','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				else if(levelType == "panchayat")
					theadArr = ["district","constituency","mandal",levelType,'TARGET','Grounded','Not-Grounded','In Progress','Completed','Achievement Percentage'];
				
			}
			if(globalDivName == 'Ntr Jalasiri')
			{
				if(levelType == "state" || levelType == "district")
				{
					theadArr = [levelType,'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
				}else if(levelType == "constituency")
				{
					theadArr = ["district",levelType,'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
				}else if(levelType == "mandal")
				{
					theadArr = ["district","constituency",levelType,'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
				}else if(levelType == "panchayat")
				{
					theadArr = ["district","constituency","mandal",levelType,'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
				}
			}
			
			if(globalDivName == 'WaterBudget')
			{
				if(levelType == "state" || levelType == "district")
				{
					theadArr = [levelType,'Targeted','Achievement','Balance','Gps with RunOff > 0','Gps with RunOff < 0','Area(In Ha)','Gross RunOff(Lakh cum)','Storage Capacity(Lakh cum)','Balance Runoff(Lakh cum)','Achievement Percentage'];
				}else if(levelType == "constituency")
				{
					theadArr = ["district",levelType,'Targeted','Achievement','Balance','Gps With RunOff > 0','Gps Witth RunOff < 0','Area(In Ha)','Gross RunOff(Lakh cum)','Storage Capacity(Lakh cum)','Balance Runoff(Lakh cum)','Achievement Percentage'];
				}else if(levelType == "mandal")
				{
					theadArr = ["district","constituency",levelType,'Targeted','Achievement','Balance','Gps With RunOff > 0','Gps With RunOff < 0','Area(In Ha)','Gross RunOff(Lakh cum)','Storage Capacity(Lakh cum)','Balance Runoff(Lakh cum)','Achievement Percentage'];
				}else if(levelType == "panchayat")
				{
					theadArr = ["district","constituency","mandal",levelType,'Water Budget Uploaded','Area(In Ha)','Gross RunOff(Lakh cum)','Storage Capacity(Lakh cum)','Balance Runoff(Lakh cum)'];
				}
			}
			if(globalDivName == 'GH')
			{
				if(levelType == "state" || levelType == "district")
				{
					theadArr = [levelType,'District Target(in Ha)','Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Acheivement Percentage','Expenditure(in Lakhs)'];
				}else if(levelType == "constituency")
				{
					theadArr = ["district",levelType,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Acheivement Percentage','Expenditure(in Lakhs)'];
				}else if(levelType == "mandal")
				{
					theadArr = ["district","constituency",levelType,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Acheivement Percentage','Expenditure(in Lakhs)'];
				}else if(levelType == "panchayat")
				{
					theadArr = ["district","constituency","mandal",levelType,'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Acheivement Percentage','Expenditure(in Lakhs)'];
				}
			}
			
			var tableId = divId.replace(/\s+/g, '')+''+levelType;
			$("#"+tableId).html(spinner);
			if(levelType == 'district' || levelType == 'constituency' || levelType == 'panchayat' || levelType == 'mandal')
			{
				if(divId == 'Ntr Jalasiri')
				{
					getNtrJalaSiriLvlWiseData(divId,levelType,theadArr,menuLocationType,menuLocationId,"Data","");
				}else{
					getRDLevelsWiseData(divId,levelType,theadArr,menuLocationType,menuLocationId);
				}
			}
		}
		
	});

var overViewArr = ['Ntr Jalasiri','Imp to CD','MPT_PT','GC Works','CD_CW','WaterBudget','GH'];
for(var i in overViewArr)
{
	$("[overview-block='"+overViewArr[i]+"']").append(spinner);
	$("[overview-block='"+overViewArr[i]+"']").append(spinner);
	if(overViewArr[i] == 'SMC Trench' || overViewArr[i] == 'Imp to CD' || overViewArr[i] == 'MPT_PT' || overViewArr[i] == 'GC Works' || overViewArr[i] == 'CD_CW' || overViewArr[i] == 'WaterBudget' || overViewArr[i] == 'GH')
	{
		getRDAbstractDataByType(overViewArr[i],'state',"0",'',2);
	}else if(overViewArr[i] == 'Ntr Jalasiri')
	{
		getNtrJalaSiriLvlWiseData("","state","","state","0","Abstract","");
	}
}

var stateArr = [{'name':'Andhra Pradesh','type':1}];
collapseMenu(1,stateArr,'multi-level-selection-menu');
buildOverviewAbstract();
function buildOverviewAbstract()
{
	
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="block-border">';
				str+='<h5 class="text-danger">Neeru Chettu</h5>';
				str+='<div class="row">';	
					for(var i in overViewArr)
					{
						if(overViewArr[i] == 'SMC Trench' || overViewArr[i] == 'Imp to CD'|| overViewArr[i] == 'MPT_PT'|| overViewArr[i] == 'GC Works'|| overViewArr[i] == 'CD_CW')
						{
							str+='<div class="col-sm-2 m_top10">';
								str+='<div class="panel-block-white text-center" overview-block="'+overViewArr[i]+'">';
									if(overViewArr[i].length > 12)
									{
										str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+overViewArr[i]+'">'+overViewArr[i].substr(0,12)+'..</h4>';
									}else{
										str+='<h4 class="panel-block-white-title text-capitalize text-center">'+overViewArr[i]+'</h4>';
									}
								str+='</div>';
							str+='</div>';
						}else if(overViewArr[i] == 'GH'){
							str+='<div class="col-sm-2 m_top10">';
								str+='<div class="panel-block-white text-center" overview-block="'+overViewArr[i]+'">';
									str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Greening Of Hillocks">Greening O..</h4>';
								str+='</div>';
							str+='</div>';
						}
					}
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="row">';
		for(var i in overViewArr)
		{
			if(overViewArr[i] == 'Ntr Jalasiri' || overViewArr[i] == 'WaterBudget')
			{
				str+='<div class="col-sm-2 m_top10">';
					str+='<div class="panel-block-white text-center" overview-block="'+overViewArr[i]+'">';
						if(overViewArr[i].length > 12)
						{
							str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+overViewArr[i]+'">'+overViewArr[i].substr(0,12)+'..</h4>';
						}else{
							str+='<h4 class="panel-block-white-title text-capitalize text-center">'+overViewArr[i]+'</h4>';
						}
					str+='</div>';
				str+='</div>';
			}
		}
	str+='</div>';
	
	$("#overViewAbstract").html(str);
	$("[overview-block]").append(spinner);
}
function getNtrJalaSiriAbstract(type,locType,locId,blockName,levelId)
{
	//$("#overViewAbstract").html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType : "district",
		locationId : locId
	}
	$.ajax({
		url: 'getNtrJalaSiriAbstract',
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
	$("[overview-block='"+type+"']").removeClass("panel-block-white");
	var str='';
	$("[overview-block='"+type+"']").attr("attr_levelId",levelId);
	$("[overview-block='"+type+"']").attr("attr_locationId",locId);
	
	if(result != null && result.length > 0)
	{
		for(var i in result)
		{
			if(levelId == 2 || levelId == "2" || levelId == 4 || levelId == "4"){
				
				if(result[i].percentage >= 100){
					str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'">';
				}else if(result[i].percentage >= 90 && result[i].percentage < 100){
					str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'">';
				}else if(result[i].percentage >= 60 && result[i].percentage < 90){
					str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'">';
				}else{
					str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'">';
				}
				
				/* if(result[i].percentage < 50)
				{
					str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'">';
				}else if(result[i].percentage >= 50 && result[i].percentage < 80)
				{
					str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'">';
					
				}else if(result[i].percentage >= 80)
				{
					str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'">';
				} */
					if(type == 'SMC Trench')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center" title="SMC Trenches">SMC Trench..</h4>';
					}else if(type == 'Imp to CD')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Improvements to Check Dams and Percolation Tanks">Improvements..</h4>';
					}else if(type == 'MPT_PT')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Mini Percolation Tanks and Percolation Tanks">Mini Perco..</h4>';
					}else if(type == 'GC Works')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Gully Control Works">Gully Contr..</h4>';
					}else if(type == 'CD_CW')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Check Dams and Check Walls">Check Dam..</h4>';
					}else if(type == 'GH')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Greening Of Hillocks">Greening O..</h4>';
					}else if(type == 'WaterBudget')
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center" title="Water Budget">Water Bu..</h4>';
					}else if(type.length > 12)
					{
						str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+type+'">'+type.substr(0,12)+'..</h4>';
					}else{
						str+='<h4 class="panel-block-white-title text-capitalize text-center">'+type+'</h4>';
					}
					str+='<small class="text-center">Achieved</small>';
					if(result[i].percentage != null && result[i].percentage.length > 0)
					{
						str+='<h1 class="text-center">'+result[i].percentage+'<small>%</small>';
					}else{
						str+='<h1 class="text-center">0<small>%</small>';
					}
					
					if(result[i].percentage >= 100){
						str+='<small><i class="fa fa-long-arrow-up"></i></small></h1>';
					}else if(result[i].percentage >= 90 && result[i].percentage < 100){
						str+='<small><i class="fa fa-long-arrow-up"></i></small></h1>';
					}else if(result[i].percentage >= 60 && result[i].percentage < 90){
						str+='<small><i class="fa fa-arrows-v"></i></small></h1>';
					}else{
						str+='<small><i class="fa fa-long-arrow-down"></i></small></h1>';
					}	
					/* if(result[i].percentage < 50)
					{
						str+='<small><i class="fa fa-long-arrow-down"></i></small></h1>';
					}else if(result[i].percentage >= 50 && result[i].percentage < 80)
					{
						str+='<small><i class="fa fa-arrows-v"></i></small></h1>';
					}else if(result[i].percentage >= 80)
					{
						str+='<small><i class="fa fa-long-arrow-up"></i></small></h1>';
					} */
					str+='<div class="row">';
						str+='<div class="col-sm-6 text-center">';
							str+='<label>Target</label>';
							if(result[i].target != null && result[i].target > 0)
							{
								if(result[i].parameter == 'Labour Budget' && levelId == 2)
								{
									str+='<h4>'+result[0].target+'L</h4>';
								}else if(result[0].parameter == 'Timely Payments'){
									str+='<h4>'+result[0].target+'%</h4>';
								}else{
									str+='<h4>'+result[0].target+'</h4>';
								}
							}else{
								str+='<h4>0</h4>';
							}
						str+='</div>';
						str+='<div class="col-sm-6 text-center">';
							str+='<label>Completed</label>';
							if(type == 'Ntr Jalasiri')
							{
								str+='<h4>'+result[i].borewellenergisation+'</h4>';
							}
							else if(result[i].completed != null && result[i].completed > 0)
							{
								if(result[i].parameter == 'Timely Payments'){
									str+='<h4>'+result[i].completed+'%</h4>';
								}else{
									str+='<h4>'+result[i].completed+'</h4>';
								}
								
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
										str+='<h2 class="text-center">'+result[i].subList[j].percentage+'</h2>';
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
							str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'">';
						}else if(result[i].percentage >= 90 && result[i].percentage < 100){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'">';
						}else if(result[i].percentage >= 60 && result[i].percentage < 90){
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'">';
						}
						
						/* if(result[i].percentage < 50)
						{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'">';
						}else if(result[i].percentage >= 50 && result[i].percentage < 80)
						{
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'">';
							
						}else if(result[i].percentage >= 80)
						{
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'">';
						} */
						
							if(type.length > 12)
							{
								str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+type+'">'+type.substr(0,12)+'..</h4>';
							}else{
								str+='<h4 class="panel-block-white-title text-capitalize text-center">'+type+'</h4>';
							}
							str+='<small class="text-center">Achieved</small>';
							if(result[i].percentage != null && result[i].percentage.length > 0)
							{
								str+='<h1 class="text-center">'+result[i].percentage+'<small>%</small>';
							}else{
								str+='<h1 class="text-center">0<small>%</small>';
							}
							
							if(result[i].percentage >= 100){
								str+='<small><i class="fa fa-long-arrow-up"></i></small></h1>';
							}else if(result[i].percentage >= 90 && result[i].percentage < 100){
								str+='<small><i class="fa fa-long-arrow-up"></i></small></h1>';
							}else if(result[i].percentage >= 60 && result[i].percentage < 90){
								str+='<small><i class="fa fa-arrows-v"></i></small></h1>';
							}else{
								str+='<small><i class="fa fa-long-arrow-down"></i></small></h1>';
							}	
							/* if(result[i].percentage < 50)
							{
								str+='<small><i class="fa fa-long-arrow-down"></i></small></h1>';
							}else if(result[i].percentage >= 50 && result[i].percentage < 80)
							{
								str+='<small><i class="fa fa-arrows-v"></i></small></h1>';
							}else if(result[i].percentage >= 80)
							{
								str+='<small><i class="fa fa-long-arrow-up"></i></small></h1>';
							} */
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label>Target</label>';
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
									str+='<label>Completed</label>';
									if(result[i].completed != null && result[i].completed.length > 0)
									{
										if(result[i].parameter == 'Timely Payments'){
											str+='<h4>'+result[i].completed+'%</h4>';
										}else{
											str+='<h4>'+result[i].completed+'</h4>';
										}
										
									}else{
										str+='<h4>0</h4>';
									}
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'">';
							str+='<h1 class="text-center">0<small>%</small></h1>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 text-center">';
									str+='<label>Target</label>';
									str+='<h4>0</h4>';
								str+='</div>';
								str+='<div class="col-sm-6 text-center">';
									str+='<label>Completed</label>';
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
							str+='<div class="panel-black-white panel-block-white-gold text-center" overview-district="'+type+'" style="border-top:1px solid #333;">';
						}else if(result[i].percentage >= 90 && result[i].percentage < 100){
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-district="'+type+'" style="border-top:1px solid #333;">';
						}else if(result[i].percentage >= 60 && result[i].percentage < 90){
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-district="'+type+'" style="border-top:1px solid #333;">';
						}else{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-district="'+type+'" style="border-top:1px solid #333;">';
						}
						
						/* if(result[i].percentage < 50)
						{
							str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
						}else if(result[i].percentage >= 50 && result[i].percentage < 80)
						{
							str+='<div class="panel-black-white panel-block-white-medium text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
							
						}else if(result[i].percentage >= 80)
						{
							str+='<div class="panel-black-white panel-block-white-high text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
						} */
						
							str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - ACHIEVED</small>';
							if(result[i].percentage != null && result[i].percentage.length > 0)
							{
								str+='<h2 class="text-center">'+result[i].percentage+'</h2>';
							}else{
								str+='<h2 class="text-center">0</h2>';
							}
						str+='</div>';
					}else{
						str+='<div class="panel-black-white panel-block-white-low text-center" overview-state="'+type+'" style="border-top:1px solid #333;">';
							str+='<small class="panel-block-white-title text-capitalize text-center">STATE LEVEL - ACHIEVED</small>';
							str+='<h2 class="text-center">0</h2>';
						str+='</div>';
					}
				}
			}
		}
	}
	
	$("[overview-block='"+type+"']").html(str);
	$(".panel-block-white-title").tooltip();
	if(type == blockName)
	{
		$("[overview-block='"+blockName+"']").trigger("click");
	}
	if(searchParams != null && type.replace(/\s+/g, '') == searchParams.replace(/\s+/g, ''))
	{
		$('[overview-block="'+searchParams+'"]').trigger('click');
	}
}
function overviewData(divId,levelId,locationId)
{
	var collapse = '';
	collapse+='<section>';
		collapse+='<div class="row">';
			collapse+='<div class="col-sm-12">';
				collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+'" role="tablist" aria-multiselectable="true">';
					collapse+='<div class="panel panel-default panel-black">';
						collapse+='<div class="panel-heading" role="tab" id="heading'+divId+'">';
							collapse+='<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+'" href="#collapse'+divId.replace(/\s+/g, '')+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+'">';
							if(divId == 'FAperformance')
							{
								collapse+='<h4 class="panel-title text-capital">FA Performance overview</h4>';
							}else if(divId == 'SMC Trench')
							{
								collapse+='<h4 class="panel-title text-capital">SMC Trenches overview</h4>';
							}else if(divId == 'Imp to CD')
							{
								collapse+='<h4 class="panel-title text-capital">Improvements to Check Dams and Percolation Tanks overview</h4>';
							}else if(divId == 'MPT_PT')
							{
								collapse+='<h4 class="panel-title text-capital">Mini Percolation Tanks and Percolation Tanks overview</h4>';
							}else if(divId == 'GC Works')
							{
								collapse+='<h4 class="panel-title text-capital">Gully Control Works overview</h4>';
							}else if(divId == 'CD_CW')
							{
								collapse+='<h4 class="panel-title text-capital">Check Dams and Check Walls overview</h4>';
							}else if(divId == 'WaterBudget')
							{
								collapse+='<h4 class="panel-title text-capital">Water Budget overview</h4>';
							}else if(divId == 'GH')
							{
								collapse+='<h4 class="panel-title text-capital">Greening Of Hillocks</h4>';
							}else{
								collapse+='<h4 class="panel-title text-capital">'+divId+' overview</h4>';
							}
								
							collapse+='</a>';
						collapse+='</div>';
						collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+'">';
							collapse+='<div class="panel-body">';
								collapse+='<div id="projectOvervw'+divId.replace(/\s+/g, '')+'"></div>';
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
	if(divId == 'Ntr Jalasiri')
	{
		getNtrJalaSiriOverview(divId)
	}else{
		getRDOverview(divId,menuLocationType,menuLocationId);	
	}
		
	
}
function getRDOverview(divId,menuLocationType,menuLocationId)
{
	$("#projectOvervw"+divId.replace(/\s+/g, '')).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		divType : divId,
		locationType : menuLocationType,
		locationId : menuLocationId
	}
	
	
	$.ajax({
		url: 'getRDOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNregasOverViewBlock(ajaxresp,divId,menuLocationType,menuLocationId);
		}
	});
}
function buildNregasOverViewBlock(result,projectDivId,menuLocationType,menuLocationId){
	var $windowWidth = $(window).width();
	var str1="";
	if(result.averagePerDistrict != null)
	{
		str1+='<div class="table-responsive">';
			str1+='<table class="table table-bordered" >';
				str1+='<tbody>';
					str1+='<tr>';
						str1+='<td>';
							str1+='<p>Average Per District : '+result.averagePerDistrict+'</p>';
						str1+='</td>';
						str1+='<td>';
							str1+='<p>Total Avg '+projectDivId+' in District : '+result.totalAvgFarmsInDistrict+'</p>';
						str1+='</td>';
					str1+='</tr>';
					str1+='<tr>';
						str1+='<td>';
							str1+='<p>Average Per Constituency : '+result.averagePerConstituency+'</p>';
						str1+='</td>';
						str1+='<td>';
							str1+='<p>Total Avg '+projectDivId+' in Constituency : '+result.totalAvgFarmsInConstituency+'</p>';
						str1+='</td>';
					str1+='</tr>';
					str1+='<tr>';
						str1+='<td>';
							str1+='<p>Average Per Mandal : '+result.averagePerMandal+'</p>';
						str1+='</td>';
						str1+='<td>';
							str1+='<p>Total Avg '+projectDivId+' in Mandal: '+result.totalAvgFarmsInMandal+'</p>';
						str1+='</td>';
					str1+='</tr>';
					str1+='<tr>';
						str1+='<td>';
							str1+='<p>Total Budget</p>';
							str1+='<h4>'+result.totalBudget+'</h4>';
						str1+='</td>';
						str1+='<td>';
							str1+='<p>Total '+projectDivId+'</p>';
							str1+='<h4>'+result.totalBudget+'</h4>';
						str1+='</td>';
					str1+='</tr>';
				str1+='</tbody>';
			str1+='</table>';
		str1+='</div>';
	}
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
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'" attr_locationType="district" attr_type="red">Districts in Red : '+result.districtsInRed+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="district" attr_type="red">Districts in Red : '+result.districtsInRed+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
								if(result.districtsInOrange != null && result.districtsInOrange > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="district" attr_type="orange">Districts in Orange : '+result.districtsInOrange+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="district" attr_type="orange" >Districts in Orange : '+result.districtsInOrange+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
								if(result.districtsInGreen != null && result.districtsInGreen > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="district" attr_type="green">Districts in Green : '+result.districtsInGreen+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="district" attr_type="green" >Districts in Green : '+result.districtsInGreen+'</p>';
							str1+='</div>';
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
								str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="constituency" attr_type="red">Constituencies in Red : '+result.constituenciesInRed+'</p>';
							else
								str1+='<p class="media-body" attr_locationType="constituency" attr_type="red" >Constituencies in Red : '+result.constituenciesInRed+'</p>';
								str1+='</div>';
							str1+='<div class="media">';
							str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
							if(result.constituenciesInOrange != null && result.constituenciesInOrange > 0)
								str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="constituency" attr_type="orange">Constituencies in Orange : '+result.constituenciesInOrange+'</p>';
							else
								str1+='<p class="media-body" attr_locationType="constituency" attr_type="orange" >Constituencies in Orange : '+result.constituenciesInOrange+'</p>';
								str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
								if(result.constituenciesInGreen != null && result.constituenciesInGreen > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="constituency" attr_type="green">Constituencies in Green : '+result.constituenciesInGreen+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="constituency" attr_type="green" >Constituencies in Green : '+result.constituenciesInGreen+'</p>';
							str1+='</div>';
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
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="mandal" attr_type="red">Mandals in Red : '+result.mandalsInRed+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="mandal" attr_type="red">Mandals in Red : '+result.mandalsInRed+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
								if(result.mandalsInOrange != null && result.mandalsInOrange > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="mandal" attr_type="orange">Mandals in Orange : '+result.mandalsInOrange+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="mandal" attr_type="orange">Mandals in Orange : '+result.mandalsInOrange+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
								if(result.mandalsInGreen != null && result.mandalsInGreen > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="mandal" attr_type="green">Mandals in Green : '+result.mandalsInGreen+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="mandal" attr_type="green">Mandals in Green : '+result.mandalsInGreen+'</p>';
							str1+='</div>';
						str1+='</div>';	
					str1+='</td>';
					str1+='<td>';
						str1+='<div class="col-sm-12">';
							str1+='<h4><strong>Total Villages : '+result.totalVillages+'</strong></h4>';
						str1+='</div>';
						str1+='<div class="col-sm-12 m_top10">';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
								if(result.villagesInRed != null && result.villagesInRed > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="panchayat" attr_type="red">Villages in Red : '+result.villagesInRed+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="panchayat" attr_type="red" style="cursor:pointer;"">Villages in Red : '+result.villagesInRed+'</p>';
							str1+='</div>';
							str1+=' <div class="media">';
							   str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
							   if(result.villagesInOrange != null && result.villagesInOrange > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="panchayat" attr_type="orange">Villages in Orange : '+result.villagesInOrange+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="panchayat" attr_type="orange" style="cursor:pointer;">Villages in Orange : '+result.villagesInOrange+'</p>';
							str1+='</div>';
							str1+='<div class="media">';
								str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
								if(result.villagesInGreen != null && result.villagesInGreen > 0)
									str1+='<p class="media-body overviewPopupCls" attr_menuLocationType="'+menuLocationType+'" attr_menuLocationId="'+menuLocationId+'"  attr_locationType="panchayat" attr_type="green">Villages in Green : '+result.villagesInGreen+'</p>';
								else
									str1+='<p class="media-body" attr_locationType="panchayat" attr_type="green">Villages in Green : '+result.villagesInGreen+'</p>';
							str1+='</div>';
						str1+='</div>';	
					str1+='</td>';
				str1+='</tr>';
			str1+='</tbody>';
		str1+='</table>';
	str1+='</div>';

	if(result.targettedPersonDays != null)
	{
		str1+='<div id="projectExp'+projectDivId.replace(/\s+/g, '')+'" style="margin-top:10px;"></div>';
		str1+='<div class="table-responsive">';
		
			str1+='<table class="table table-bordered m_top20">';
				str1+='<tr>';
					str1+='<td>';
						str1+='<p class="col-sm-9">Targeted Person days</p>';
						str1+='<p class="col-sm-3 text-center">'+result.targettedPersonDays+'</p>';
						str1+='<p class="col-sm-9">Generated person days</p>';
						str1+='<p class="col-sm-3 text-center">'+result.generatedPersonDays+'</p>';
						str1+='<p class="col-sm-9">Acheivement Percentage</p>';
						str1+='<p class="col-sm-3 bg-danger text-danger text-center">'+result.achievementPerc+'</p>';
					str1+='</td>';
					str1+='<td>';
						//str1+='<p class="col-sm-9">(%) of Labour reported over target</p>';
						//str1+='<p class="col-sm-3 bg-success text-success text-center"></p>';
						str1+='<p class="col-sm-9">Average Wage Per Person: Rs</p>';
						str1+='<p class="col-sm-3 bg-danger text-danger text-center">'+result.avgWagePerPerson+'</p>';
						str1+='<p class="col-sm-9">Total Expenditure: Rs</p>';
						str1+='<p class="col-sm-3 text-center">'+result.totalExpenditure+'</p>';
					str1+='</td>';
				str1+='</tr>';
			str1+='</table>';
		str1+='</div>';
		getNREGSLabourBudgetExpenditure(projectDivId,menuLocationType,menuLocationId);
	}
	
	$("#projectOvervw"+projectDivId.replace(/\s+/g, '')).html(str1);
	
}
function getNtrJalaSiriOverview(divId)
{
	$("#projectOvervw"+divId.replace(/\s+/g, '')).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate
	}
	$.ajax({
		url: 'getNtrJalaSiriOverview',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			console.log(ajaxresp);
			var str1='';
			str1+='<div class="table-responsive">';
				str1+='<table class="table table-bordered" >';
					str1+='<tbody>';
						str1+='<tr>';
							str1+='<td>';
								str1+='<p>Average Per District : '+ajaxresp.averagePerDistrict+'</p>';
							str1+='</td>';
							str1+='<td>';
								str1+='<p>Total Avg NTR Jalasiri in District : '+ajaxresp.totalAvgFarmsInDistrict+'</p>';
							str1+='</td>';
						str1+='</tr>';
						str1+='<tr>';
							str1+='<td>';
								str1+='<p>Average Per Constituency : '+ajaxresp.averagePerConstituency+'</p>';
							str1+='</td>';
							str1+='<td>';
								str1+='<p>Total Avg NTR Jalasiri in Constituency : '+ajaxresp.totalAvgFarmsInConstituency+'</p>';
							str1+='</td>';
						str1+='</tr>';
						str1+='<tr>';
							str1+='<td>';
								str1+='<p>Average Per Mandal : '+ajaxresp.averagePerMandal+'</p>';
							str1+='</td>';
							str1+='<td>';
								str1+='<p>Total Avg NTR Jalasiri in Mandal: '+ajaxresp.totalAvgFarmsInMandal+'</p>';
							str1+='</td>';
						str1+='</tr>';
						str1+='<tr>';
							str1+='<td>';
								str1+='<p>Total Budget</p>';
								str1+='<h4>'+ajaxresp.totalBudget+'</h4>';
							str1+='</td>';
							str1+='<td>';
								str1+='<p>Total NTR Jalasiri</p>';
								str1+='<h4>'+ajaxresp.totalBudget1+'</h4>';
							str1+='</td>';
						str1+='</tr>';
					str1+='</tbody>';
				str1+='</table>';
			str1+='</div>';
			str1+='<div class="table-responsive">';
				
			str1+='</div>';
			str1+='<div class="table-responsive">';
				str1+='<table class="table table-bordered m_top10" >';
					str1+='<tbody>';
						str1+='<tr>';
							str1+='<td>';
								str1+='<div class="col-sm-9">';
									str1+='<div class="media">';
										str1+='<h4  attr_type="total">Total Districts : '+ajaxresp.totalDistricts+'</h4>';
									str1+='</div>';
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
										if(ajaxresp.districtsInRed != null && ajaxresp.districtsInRed > 0)
											str1+='<p class="media-body detailsCls">Districts in Red : '+ajaxresp.districtsInRed+'</p>';
										else
											str1+='<p class="media-body">Districts in Red : '+ajaxresp.districtsInRed+'</p>';
									str1+='</div>';
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
										if(ajaxresp.districtsInOrange != null && ajaxresp.districtsInOrange > 0)
											str1+='<p class="media-body detailsCls">Districts in Orange : '+ajaxresp.districtsInOrange+'</p>';
										else
											str1+='<p class="media-body"  >Districts in Orange : '+ajaxresp.districtsInOrange+'</p>';
									str1+='</div>';
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
										if(ajaxresp.districtsInGreen != null && ajaxresp.districtsInGreen > 0)
											str1+='<p class="media-body detailsCls"    >Districts in Green : '+ajaxresp.districtsInGreen+'</p>';
										else
											str1+='<p class="media-body"  >Districts in Green : '+ajaxresp.districtsInGreen+'</p>';
									str1+='</div>';
								str1+='</div>';
							str1+='</td>';
							str1+='<td>';
								str1+='<div class="col-sm-9">';
									str1+='<div class="media">';
										str1+='<h4  attr_type="total">Total Constituencies : '+ajaxresp.totalConstituencies+'</h4>';
									str1+='</div>';
									str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
									if(ajaxresp.constituenciesInRed != null && ajaxresp.constituenciesInRed > 0)
										str1+='<p class="media-body detailsCls">Constituencies in Red : '+ajaxresp.constituenciesInRed+'</p>';
									else
										str1+='<p class="media-body"  >Constituencies in Red : '+ajaxresp.constituenciesInRed+'</p>';
										str1+='</div>';
									str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
									if(ajaxresp.constituenciesInOrange != null && ajaxresp.constituenciesInOrange > 0)
										str1+='<p class="media-body detailsCls">Constituencies in Orange : '+ajaxresp.constituenciesInOrange+'</p>';
									else
										str1+='<p class="media-body"  >Constituencies in Orange : '+ajaxresp.constituenciesInOrange+'</p>';
										str1+='</div>';
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
										if(ajaxresp.constituenciesInGreen != null && ajaxresp.constituenciesInGreen > 0)
											str1+='<p class="media-body detailsCls">Constituencies in Green : '+ajaxresp.constituenciesInGreen+'</p>';
										else
											str1+='<p class="media-body">Constituencies in Green : '+ajaxresp.constituenciesInGreen+'</p>';
									str1+='</div>';
								str1+='</div>';	
							str1+='</td>';
							str1+='<td>';
								str1+='<div class="col-sm-9">';
									str1+='<div class="media">';
										str1+='<h4  attr_type="total">Total Mandals : '+ajaxresp.totalMandals+'</h4>';
									str1+='</div>';
									str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Red.png"></p>';
									if(ajaxresp.mandalsInRed != null && ajaxresp.mandalsInRed > 0)
										str1+='<p class="media-body detailsCls">Mandals in Red : '+ajaxresp.mandalsInRed+'</p>';
									else
										str1+='<p class="media-body"  >Mandals in Red : '+ajaxresp.mandalsInRed+'</p>';
										str1+='</div>';
									str1+='<div class="media">';
									str1+='<p class="media-left"><img src="Assests/icons/Orange.png"></p>';
									if(ajaxresp.mandalsInOrange != null && ajaxresp.mandalsInOrange > 0)
										str1+='<p class="media-body detailsCls">Mandals in Orange : '+ajaxresp.mandalsInOrange+'</p>';
									else
										str1+='<p class="media-body"  >Mandals in Orange : '+ajaxresp.mandalsInOrange+'</p>';
										str1+='</div>';
									str1+='<div class="media">';
										str1+='<p class="media-left"><img src="Assests/icons/Green.png"></p>';
										if(ajaxresp.mandalsInGreen != null && ajaxresp.mandalsInGreen > 0)
											str1+='<p class="media-body detailsCls">Mandals in Green : '+ajaxresp.mandalsInGreen+'</p>';
										else
											str1+='<p class="media-body">Mandals in Green : '+ajaxresp.mandalsInGreen+'</p>';
									str1+='</div>';
								str1+='</div>';	
							str1+='</td>';
							
						str1+='</tr>';
					str1+='</tbody>';
				str1+='</table>';
			str1+='</div>';
			$("#projectOvervw"+divId.replace(/\s+/g, '')).html(str1);
		}
	});
}

function projectData(divId,levelId,locationId)
{
	//alert(divId);
	var collapse='';
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
	collapse+='<section>';
		collapse+='<div class="row">';
			collapse+='<div class="col-sm-12">';
				for(var i in dataArr)
				{
					collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+dataArr[i]+'" role="tablist" aria-multiselectable="true">';
						collapse+='<div class="panel panel-default panel-black">';
							collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+dataArr[i]+'">';
								if(i == 0)
								{
									collapse+='<a role="button" class="panelCollapseIcon" overview-levelId="'+levelId+'" overview-locationId="'+locationId+'" overview-divId="'+divId+'" overview-level="'+dataArr[i]+'" data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+dataArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+dataArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+dataArr[i]+'">';
								}else{
									collapse+='<a role="button" class="panelCollapseIcon collapsed" overview-levelId="'+levelId+'" overview-locationId="'+locationId+'" overview-divId="'+divId+'" overview-level="'+dataArr[i]+'" data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+dataArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+dataArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+dataArr[i]+'">';
								}
									if(divId == 'SMC Trench')
									{
										collapse+='<h4 class="panel-title text-capital">'+dataArr[i]+' level overview - SMC Trenches</h4>';
									}else if(divId == 'Imp to CD')
									{
										collapse+='<h4 class="panel-title text-capital">'+dataArr[i]+' level overview - Improvements to Check Dams and Percolation Tanks</h4>';
									}else if(divId == 'MPT_PT')
									{
										collapse+='<h4 class="panel-title text-capital">'+dataArr[i]+' level overview - Mini Percolation Tanks and Percolation Tanks</h4>';
									}else if(divId == 'GC Works')
									{
										collapse+='<h4 class="panel-title text-capital">'+dataArr[i]+' level overview - Gully Control Works</h4>';
									}else if(divId == 'CD_CW')
									{
										collapse+='<h4 class="panel-title text-capital">'+dataArr[i]+' level overview - Check Dams and Check Walls</h4>';
									}else if(divId == 'WaterBudget')
									{
										collapse+='<h4 class="panel-title text-capital">'+dataArr[i]+' level overview - Water Budget</h4>';
									}else if(divId == 'GH')
									{
										collapse+='<h4 class="panel-title text-capital">'+dataArr[i]+' level overview - Greening Of Hillocks</h4>';
									}else{
										collapse+='<h4 class="panel-title text-capital">'+dataArr[i]+' level overview - '+divId+'</h4>';
									}
									
								collapse+='</a>';
							collapse+='</div>';
							if(i == 0)
							{
								collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+dataArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+dataArr[i]+'">';
							}else{
								collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+dataArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+dataArr[i]+'">';
							}
							
								collapse+='<div class="panel-body">';
									if(divId == "Ntr Jalasiri"){
										collapse+='<div class="row" style="margin-bottom:10px;">';
											collapse+='<div class="col-sm-12">';
												collapse+='<ul class="list-inline switch-btn-ntr-jalasiri ntrJalasariLocCls ntrJalasariLocCls'+dataArr[i]+'">';
													
													collapse+='<li class="active" attr_type="First" attr_divid="'+divId+'" attr_level_type="'+dataArr[i]+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">Location Wise Overview</li>';
													
													collapse+='<li attr_type="Second" attr_divid="'+divId+'" attr_level_type="'+dataArr[i]+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">Benificiary Paid Vs Paid To Transco</li>';
													
													collapse+='<li attr_type="Third" attr_divid="'+divId+'" attr_level_type="'+dataArr[i]+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">Paid To Transco Vs Installed</li>';
												collapse+='</ul>';
											collapse+='</div>';
										collapse+='</div>';
									}
									collapse+='<div id="'+divId.replace(/\s+/g, '')+''+dataArr[i]+'"></div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				}
			collapse+='</div>';
		collapse+='</div>';
	collapse+='</section>';
	$("#projectData").html(collapse);
	
	var theadArr = [];
	
	if(globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW')
	{
		theadArr = [dataArr[0],'TARGET','sanctioned Target','Grounded','Not-Grounded','In Progress','Completed','Achievement Percentage','sanctioned Percentage'];
		if(dataArr[0] == "constituency")
			theadArr = ["district",dataArr[0],'TARGET','Grounded','Not-Grounded','In Progress','Completed','Achievement Percentage'];
		else if(dataArr[0] == "mandal")
			theadArr = ["district","constituency",dataArr[0],'TARGET','Grounded','Not-Grounded','In Progress','Completed','Achievement Percentage'];
		else if(dataArr[0] == "panchayat")
			theadArr = ["district","constituency","mandal",dataArr[0],'TARGET','Grounded','Not-Grounded','In Progress','Completed','Achievement Percentage'];
		
	}
	if(globalDivName == 'Ntr Jalasiri')
	{
		if(dataArr[0] == "state" || dataArr[0] == "district")
		{
			theadArr = [dataArr[0],'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
		}else if(dataArr[0] == "constituency")
		{
			theadArr = ["district",dataArr[0],'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
		}else if(dataArr[0] == "mandal")
		{
			theadArr = ["district","constituency",dataArr[0],'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
		}else if(dataArr[0] == "panchayat")
		{
			theadArr = ["district","constituency","mandal",dataArr[0],'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
		}
	}
	if(globalDivName == 'WaterBudget')
	{
		if(dataArr[0] == "state" || dataArr[0] == "district")
		{
			theadArr = [dataArr[0],'Targeted','Achievement','Balance','Gps with RunOff > 0','Gps with RunOff < 0','Area(In Ha)','Gross RunOff(Lakh cum)','Storage Capacity(Lakh cum)','Balance Runoff(Lakh cum)','Achievement Percentage'];
		}else if(dataArr[0] == "constituency")
		{
			theadArr = ["district",dataArr[0],'Targeted','Achievement','Balance','Gps With RunOff > 0','Gps Witth RunOff < 0','Area(In Ha)','Gross RunOff(Lakh cum)','Storage Capacity(Lakh cum)','Balance Runoff(Lakh cum)','Achievement Percentage'];
		}else if(dataArr[0] == "mandal")
		{
			theadArr = ["district","constituency",dataArr[0],'Targeted','Achievement','Balance','Gps With RunOff > 0','Gps With RunOff < 0','Area(In Ha)','Gross RunOff(Lakh cum)','Storage Capacity(Lakh cum)','Balance Runoff(Lakh cum)','Achievement Percentage'];
		}else if(dataArr[0] == "panchayat")
		{
			theadArr = ["district","constituency","mandal",dataArr[0],'Water Budget Uploaded','Area(In Ha)','Gross RunOff(Lakh cum)','Storage Capacity(Lakh cum)','Balance Runoff(Lakh cum)'];
		}
		
	}
	if(globalDivName == 'GH')
	{
		if(dataArr[0] == "state" || dataArr[0] == "district")
		{
			theadArr = [dataArr[0],'District Target(in Ha)','Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Acheivement Percentage','Expenditure(in Lakhs)'];
		}else if(dataArr[0] == "constituency")
		{
			theadArr = ["district",dataArr[0],'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Acheivement Percentage','Expenditure(in Lakhs)'];
		}else if(dataArr[0] == "mandal")
		{
			theadArr = ["district","constituency",dataArr[0],'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Acheivement Percentage','Expenditure(in Lakhs)'];
		}else if(dataArr[0] == "panchayat")
		{
			theadArr = ["district","constituency","mandal",dataArr[0],'Sanctioned Target(in Ha)','Pitting Extent(in Ha)','Planting Extent(in Ha)','Acheivement Percentage','Expenditure(in Lakhs)'];
		}
	}
	
	
	var tableId = divId.replace(/\s+/g, '')+''+dataArr[0];
	if(divId == 'Ntr Jalasiri')
	{
		getNtrJalaSiriLvlWiseData(divId,dataArr[0],theadArr,menuLocationType,menuLocationId,"Data","");
	}else{
		getRDLevelsWiseData(divId,dataArr[0],theadArr,menuLocationType,menuLocationId);
	}
}
function getNregaLevelsWiseData(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId)
{
	$("#"+divIdd).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: menuLocationType,
		divType : globalDivName,
		locationId : menuLocationId,
		sublocaType : locationTypeNew
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
							str+='<td class="text-capital">'+locationTypeNew+'</td>';
						}
						else if(locationTypeNew == "district"){
							str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
						}
						else if(locationTypeNew == "constituency"){
							str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationTypeNew == "mandal"){
							str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationTypeNew == "panchayat"){
							str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].panchayat+'</td>';
						}
						str+='<td>'+ajaxresp[i].target+'</td>';
						if((globalDivName == 'Mulbery' || globalDivName == 'Silk worms' || globalDivName == 'Cattle drinking water troughs' || globalDivName == 'Raising of Perinnial Fodders') && locationTypeNew == "state"){
							str+='<td>'+ajaxresp[i].sanctionedTarget+'</td>';
							//str+='<td>'+ajaxresp[i].sanctionedPerventage+'</td>';
						}
						if((globalDivName == 'Fish Ponds' || globalDivName == 'Fish Drying Platforms' || globalDivName == 'Anganwadi Buildings' || globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW') && (locationTypeNew == "state" || locationTypeNew == "district")){
							str+='<td>'+ajaxresp[i].sanctionedTarget+'</td>';
							//str+='<td>'+ajaxresp[i].sanctionedPerventage+'</td>';
						}
						
						str+='<td>'+ajaxresp[i].grounded+'</td>';
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
						
						/* if(ajaxresp[i].percentage < 50){
							str+='<td style="background-color:#FF0000">'+ajaxresp[i].percentage+'</td>';
						}else if(ajaxresp[i].percentage >= 50 && ajaxresp[i].percentage < 80){
							str+='<td style="background-color:#FFBA00">'+ajaxresp[i].percentage+'</td>';
						}else if(ajaxresp[i].percentage >= 80){
							str+='<td style="background-color:#00AF50">'+ajaxresp[i].percentage+'</td>';
						} */
						
						if((globalDivName == 'Mulbery' || globalDivName == 'Silk worms' || globalDivName == 'Cattle drinking water troughs' || globalDivName == 'Raising of Perinnial Fodders') && locationTypeNew == "state"){
							
							if(ajaxresp[i].percSant >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 90 && ajaxresp[i].percSant < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 60 && ajaxresp[i].percSant < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}
							
							/* if(ajaxresp[i].percSant < 50){
								str+='<td style="background-color:#FF0000">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 50 && ajaxresp[i].percSant < 80){
								str+='<td style="background-color:#FFBA00">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 80){
								str+='<td style="background-color:#00AF50">'+ajaxresp[i].percSant+'</td>';
							} */
						}
						if((globalDivName == 'Fish Ponds' || globalDivName == 'Fish Drying Platforms' || globalDivName == 'Anganwadi Buildings' || globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW') && (locationTypeNew == "state" || locationTypeNew == "district")){
							if(ajaxresp[i].percSant >= 100){
								str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 90 && ajaxresp[i].percSant < 100){
								str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 60 && ajaxresp[i].percSant < 90){
								str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}else{
								str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percSant+'</td>';
							}
							
							/* if(ajaxresp[i].percSant < 50){
								str+='<td style="background-color:#FF0000">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 50 && ajaxresp[i].percSant < 80){
								str+='<td style="background-color:#FFBA00">'+ajaxresp[i].percSant+'</td>';
							}else if(ajaxresp[i].percSant >= 80){
								str+='<td style="background-color:#00AF50">'+ajaxresp[i].percSant+'</td>';
							} */
						}
					str+='</tr>';
				}
			}
			tableView(divIdd,theadArr,str,locationTypeNew);
		}
	});
}

function tableView(blockId,theadArr,result,locationType)
{
	var tableView='';
	
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered dataTable'+blockId+'">';
			tableView+='<thead class="text-capital">';
				for(var i in theadArr)
				{
					tableView+='<th>'+theadArr[i]+'</th>';
				}
			tableView+='</thead>';
			tableView+='<tbody>';
				tableView+=result;
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	$("#"+blockId).html(tableView);	
	if(locationType == 'constituency' || locationType == 'mandal' || locationType == 'panchayat')
	{
		$(".dataTable"+blockId).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
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
	}else if(locationType == 'district')
	{
		$(".dataTable"+blockId).dataTable({
			"iDisplayLength": 20,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
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
function getNtrJalaSiriLvlWiseData(divId,locationType,theadArr,menuLocationType,menuLocationId,resultType,blockName)
{
	var tableId = divId.replace(/\s+/g, '')+''+locationType;
		$("#"+tableId).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType : locationType
	}
	$.ajax({
		url: 'getNtrJalaSiriLvlWiseData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			if(resultType == "Abstract"){
				buildNREGSAbstractDataByTypeNew("Ntr Jalasiri",result,blockName,menuLocationId,menuLocationType,2);
			}
			else{
				var str = '';
				if(result != null && result.length > 0){
					for(var i in result){
						str+='<tr>';
							if(locationType == "state"){
								str+='<td class="text-capital">'+locationType+'</td>';
							}
							else if(locationType == "district"){
								str+='<td class="text-capital">'+result[i].district+'</td>';
							}
							else if(locationType == "constituency"){
								str+='<td class="text-capital">'+result[i].district+'</td>';
								str+='<td class="text-capital">'+result[i].constituency+'</td>';
							}
							else if(locationType == "mandal"){
								str+='<td class="text-capital">'+result[i].district+'</td>';
								str+='<td class="text-capital">'+result[i].constituency+'</td>';
								str+='<td class="text-capital">'+result[i].mandal+'</td>';
							}
							else if(locationType == "panchayat"){
								str+='<td class="text-capital">'+result[i].district+'</td>';
								str+='<td class="text-capital">'+result[i].constituency+'</td>';
								str+='<td class="text-capital">'+result[i].mandal+'</td>';
								str+='<td class="text-capital">'+result[i].panchayat+'</td>';
							}	
							
							str+='<td>'+result[i].target+'</td>';
							str+='<td>'+result[i].borewellsDrilled+'</td>';
							str+='<td>'+result[i].ltFiles+'</td>';
							str+='<td>'+result[i].sentToTransco+'</td>';
							str+='<td>'+result[i].beneficaryContribution+'</td>';
							str+='<td>'+result[i].amountPaidTransco+'</td>';
							str+='<td>'+result[i].borewellenergisation+'</td>';
							var percen = 0;
							if(result[i].borewellenergisation > 0 && result[i].amountPaidTransco > 0)
								percen = (parseFloat(result[i].borewellenergisation)*100.00/parseFloat(result[i].amountPaidTransco)).toFixed(2);
							
							if(percen >= 100){
								str+='<td style="background-color:#f7b519">'+percen+'</td>';
							}else if(percen >= 90 && percen < 100){
								str+='<td style="background-color:#00AF50">'+percen+'</td>';
							}else if(percen >= 60 && percen < 90){
								str+='<td style="background-color:#FFBA00">'+percen+'</td>';
							}else{
								str+='<td style="background-color:#FF0000">'+percen+'</td>';
							}
							
							if(result[i].percentage >= 100){
								str+='<td style="background-color:#f7b519">'+result[i].percentage+'</td>';
							}else if(result[i].percentage >= 90 && result[i].percentage < 100){
								str+='<td style="background-color:#00AF50">'+result[i].percentage+'</td>';
							}else if(result[i].percentage >= 60 && result[i].percentage < 90){
								str+='<td style="background-color:#FFBA00">'+result[i].percentage+'</td>';
							}else{
								str+='<td style="background-color:#FF0000">'+result[i].percentage+'</td>';
							}
							
							/* if(result[i].percentage < 50)
							{
								str+='<td style="background-color:#FF0000">'+result[i].percentage+'</td>';
							}else if(result[i].percentage >= 50 && result[i].percentage < 80)
							{
								str+='<td style="background-color:#FFBA00">'+result[i].percentage+'</td>';
							}else if(result[i].percentage >= 80)
							{
								str+='<td style="background-color:#00AF50">'+result[i].percentage+'</td>';
							} */
						str+='</tr>';
					}
				}
				tableView(tableId,theadArr,str,locationType);
			}
		}
	});
}
function tableViewOld(blockId,theadArr,result,locationType)
{
	var tableView='';
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered dataTable'+blockId+'">';
			tableView+='<thead class="text-capital">';
				for(var i in theadArr)
				{
					tableView+='<th>'+theadArr[i]+'</th>';
				}
			tableView+='</thead>';
			tableView+='<tbody>';
				if(result != null && result.length > 0){
					for(var i in result){
						tableView+='<tr>';
							if(locationType == "state"){
								tableView+='<td class="text-capital">'+locationType+'</td>';
							}
							else if(locationType == "district"){
								tableView+='<td class="text-capital">'+result[i].district+'</td>';
							}
							else if(locationType == "constituency"){
								tableView+='<td class="text-capital">'+result[i].district+'</td>';
								tableView+='<td class="text-capital">'+result[i].constituency+'</td>';
							}
							else if(locationType == "mandal"){
								tableView+='<td class="text-capital">'+result[i].district+'</td>';
								tableView+='<td class="text-capital">'+result[i].constituency+'</td>';
								tableView+='<td class="text-capital">'+result[i].mandal+'</td>';
							}
							else if(locationType == "panchayat"){
								tableView+='<td class="text-capital">'+result[i].district+'</td>';
								tableView+='<td class="text-capital">'+result[i].constituency+'</td>';
								tableView+='<td class="text-capital">'+result[i].mandal+'</td>';
								tableView+='<td class="text-capital">'+result[i].panchayat+'</td>';
							}	
							
							tableView+='<td>'+result[i].target+'</td>';
							tableView+='<td>'+result[i].borewellsDrilled+'</td>';
							tableView+='<td>'+result[i].ltFiles+'</td>';
							tableView+='<td>'+result[i].sentToTransco+'</td>';
							tableView+='<td>'+result[i].beneficaryContribution+'</td>';
							tableView+='<td>'+result[i].amountPaidTransco+'</td>';
							tableView+='<td>'+result[i].borewellenergisation+'</td>';
							
							if(result[i].percentage >= 100){
								tableView+='<td style="background-color:#f7b519">'+result[i].percentage+'</td>';
							}else if(result[i].percentage >= 90 && result[i].percentage < 100){
								tableView+='<td style="background-color:#00AF50">'+result[i].percentage+'</td>';
							}else if(result[i].percentage >= 60 && result[i].percentage < 90){
								tableView+='<td style="background-color:#FFBA00">'+result[i].percentage+'</td>';
							}else{
								tableView+='<td style="background-color:#FF0000">'+result[i].percentage+'</td>';
							}
							
							/* if(result[i].percentage < 50)
							{
								tableView+='<td style="background-color:#FF0000">'+result[i].percentage+'</td>';
							}else if(result[i].percentage >= 50 && result[i].percentage < 80)
							{
								tableView+='<td style="background-color:#FFBA00">'+result[i].percentage+'</td>';
							}else if(result[i].percentage >= 80)
							{
								tableView+='<td style="background-color:#00AF50">'+result[i].percentage+'</td>';
							} */
						tableView+='</tr>';
					}
				}
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	
	$("#"+blockId).html(tableView);	
	if(locationType == 'constituency' || locationType == 'mandal' || locationType == 'panchayat')
	{
		$(".dataTable"+blockId).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
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
	}else if(locationType == 'district')
	{
		$(".dataTable"+blockId).dataTable({
			"iDisplayLength": 20,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
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
function getRDAbstractDataByType(type,locType,locId,blockName,levelId)
{
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		type : type,
		locationType: locType,
		locationId : locId
	}
	
	$.ajax({
		url: 'getRDAbstractDataByType',
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

function getRDLevelsWiseData(divId,subLocationType,theadArr,locationTypeNew,menuLocationId)
{
	var tableId = divId.replace(/\s+/g, '')+''+subLocationType;
	$("#"+tableId).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : glStartDate,
		toDate : glEndDate,
		locationType: locationTypeNew,
		divType : divId,
		locationId : menuLocationId,
		sublocaType : subLocationType
	}
	$.ajax({
		url: 'getRDLevelsWiseData',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var ghPercSant;
			var str = '';
			if(ajaxresp != null && ajaxresp.length > 0){
				for(var i in ajaxresp){
						str+='<tr>';
							if(subLocationType == "state"){
							  str+='<td class="text-capital">'+subLocationType+'</td>';
							}
							else if(subLocationType == "district"){
							  str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							}
							else if(subLocationType == "constituency"){
							  str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							  str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
							}
							else if(subLocationType == "mandal"){
							  str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							  str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
							  str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
							}
							else if(subLocationType == "panchayat"){
							  str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							  str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
							  str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
							  str+='<td class="text-capital">'+ajaxresp[i].panchayat+'</td>';
							}
							if(globalDivName == 'SMC Trench' || globalDivName == 'Imp to CD' || globalDivName == 'MPT_PT' || globalDivName == 'GC Works' || globalDivName == 'CD_CW'){
							  str+='<td>'+ajaxresp[i].target+'</td>';
							if(subLocationType == "state" || subLocationType == "district"){
							  str+='<td>'+ajaxresp[i].sanctionedTarget+'</td>';
							  
							}
							str+='<td>'+ajaxresp[i].grounded+'</td>';
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
							
							/* if(ajaxresp[i].percentage < 50){
							  str+='<td style="background-color:#FF0000">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 50 && ajaxresp[i].percentage < 80){
							  str+='<td style="background-color:#FFBA00">'+ajaxresp[i].percentage+'</td>';
							}else if(ajaxresp[i].percentage >= 80){
							  str+='<td style="background-color:#00AF50">'+ajaxresp[i].percentage+'</td>';
							} */
							
							if(subLocationType == "state" || subLocationType == "district"){
							
								if(ajaxresp[i].percSant >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else if(ajaxresp[i].percSant >= 90 && ajaxresp[i].percSant < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else if(ajaxresp[i].percSant >= 60 && ajaxresp[i].percSant < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}
								
							  /* if(ajaxresp[i].percSant < 50){
								str+='<td style="background-color:#FF0000">'+ajaxresp[i].percSant+'</td>';
							  }else if(ajaxresp[i].percSant >= 50 && ajaxresp[i].percSant < 80){
								str+='<td style="background-color:#FFBA00">'+ajaxresp[i].percSant+'</td>';
							  }else if(ajaxresp[i].percSant >= 80){
								str+='<td style="background-color:#00AF50">'+ajaxresp[i].percSant+'</td>';
							  } */
							}
						  }else if(globalDivName == "WaterBudget"){
							  if(subLocationType == 'panchayat')
								 str+='<td>'+ajaxresp[i].waterBudgtUploaded+'</td>';
							 else{
								str+='<td>'+ajaxresp[i].target+'</td>';
								str+='<td>'+ajaxresp[i].achivement+'</td>';
								str+='<td>'+ajaxresp[i].balance+'</td>';
								str+='<td>'+ajaxresp[i].achmtGT0+'</td>';
								str+='<td>'+ajaxresp[i].achmtLT0+'</td>';
							 }
							
							str+='<td>'+ajaxresp[i].area+'</td>';
							str+='<td>'+ajaxresp[i].gross+'</td>';
							str+='<td>'+ajaxresp[i].stroageCap+'</td>';
							str+='<td>'+ajaxresp[i].balanceRunOff+'</td>';
							 if(subLocationType != 'panchayat'){
								 if(ajaxresp[i].percSant >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else if(ajaxresp[i].percSant >= 90 && ajaxresp[i].percSant < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else if(ajaxresp[i].percSant >= 60 && ajaxresp[i].percSant < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+ajaxresp[i].percSant+'</td>';
								}
								
							/* 	if(ajaxresp[i].percSant < 50){
									str+='<td style="background-color:#FF0000">'+ajaxresp[i].percSant+'</td>';
								  }else if(ajaxresp[i].percSant >= 50 && ajaxresp[i].percSant < 80){
									str+='<td style="background-color:#FFBA00">'+ajaxresp[i].percSant+'</td>';
								  }else if(ajaxresp[i].percSant >= 80){
									str+='<td style="background-color:#00AF50">'+ajaxresp[i].percSant+'</td>';
								  }  */
							 }
						  }else if(globalDivName == "GH"){
								if(subLocationType == 'state' || subLocationType == 'district')
								{
									str+='<td>'+ajaxresp[i].target+'</td>';
								}
								str+='<td>'+ajaxresp[i].sanctionedTarget+'</td>';
								str+='<td>'+ajaxresp[i].pittingKMS+'</td>';
								str+='<td>'+ajaxresp[i].plantingKMS+'</td>';
								ghPercSant = (((ajaxresp[i].plantingKMS)*(100.00))/(ajaxresp[i].sanctionedTarget)).toFixed(2);
								//str+='<td>'+(((ajaxresp[i].plantingKMS)*(100.00))/(ajaxresp[i].sanctionedTarget)).toFixed(2)+'</td>';
								 if(ghPercSant >= 100){
									str+='<td style="background-color:#f7b519;color:#fff">'+ghPercSant+'</td>';
								}else if(ghPercSant >= 90 && ghPercSant < 100){
									str+='<td style="background-color:#00AF50;color:#fff">'+ghPercSant+'</td>';
								}else if(ghPercSant >= 60 && ghPercSant < 90){
									str+='<td style="background-color:#ff6600;color:#fff">'+ghPercSant+'</td>';
								}else{
									str+='<td style="background-color:#FF0000;color:#fff">'+ghPercSant+'</td>';
								}
								
								/* if(ghPercSant < 50){
									str+='<td style="background-color:#FF0000">'+ghPercSant+'</td>';
								}else if(ghPercSant >= 50 && ghPercSant < 80){
									str+='<td style="background-color:#FFBA00">'+ghPercSant+'</td>';
								}else if(ghPercSant >= 80){
									str+='<td style="background-color:#00AF50">'+ghPercSant+'</td>';
								} */
								str+='<td>'+ajaxresp[i].percentage+'</td>';
							}
									
					str+='</tr>';
				}
						
					
			}
			
			tableView(tableId,theadArr,str,subLocationType);
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

$(document).on("click","[role='tabCummulative'] li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var finanicialYearType = $(this).attr("attr_type")
	var levelId = $("#selectedName").attr("attr_levelId");
	var locId = $("#selectedName").attr("attr_id");
	var locType = '';
	if(levelId == 2)
	{
		locType = 'state'
	}else if(levelId == 3)
	{
		locType = 'district'
	}
	if(finanicialYearType == "thisFin"){
		glStartDate = '2018-04-01'//moment().startOf('year').format("YYYY-MM")+'-1';
		glEndDate = moment().format("YYYY-MM")+'-30';
		globalFinancialYear = "2018";
		$("#dateRangePickerMGNF").val('2018-04');
		$("#dateRangePickerMGNT").val(moment().format("YYYY-MM"));
	}else{
		
		glStartDate = '2017-04-01';//moment().startOf('year').format("YYYY-MM")+'-1';
		glEndDate='2018-03-31';
		globalFinancialYear = "2017";
		$("#dateRangePickerMGNF").val('2017-04');
		$("#dateRangePickerMGNT").val('2018-03');
	}
	for(var i in overViewArr)
	{
		$("[overview-block='"+overViewArr[i]+"']").append(spinner);
		$("[overview-block='"+overViewArr[i]+"']").append(spinner);
		if(overViewArr[i] == 'SMC Trench' || overViewArr[i] == 'Imp to CD' || overViewArr[i] == 'MPT_PT' || overViewArr[i] == 'GC Works' || overViewArr[i] == 'CD_CW' || overViewArr[i] == 'WaterBudget' || overViewArr[i] == 'GH')
		{
			getRDAbstractDataByType(overViewArr[i],'state',"0",'',2);
		}else if(overViewArr[i] == 'Ntr Jalasiri')
		{
			getNtrJalaSiriLvlWiseData("","state","",locType,locId,"Abstract");
		}
	}
	buildOverviewAbstract();
});

function getNTRJalasiriLocationWiseDetails(divId,subLocationType,menuLocationId,menuLocationType,levelType)
{
	var tableId = divId.replace(/\s+/g, '')+''+subLocationType;
	$("#"+tableId).html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : "2018/04/01",
		toDate : moment().format("YYYY/MM/DD"),// "2018/06/30"
		locationType:menuLocationType,
		locationId :menuLocationId,
		sublocaType : subLocationType,
		type		:levelType
	}
	$.ajax({
		url: 'getNTRJalasiriLocationWiseDetails',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNTRJalasiriLevelWiseDetails(ajaxresp,subLocationType,tableId,menuLocationId,menuLocationType,levelType);
		}
	});
}

function buildNTRJalasiriLevelWiseDetails(ajaxresp,locationTypeNew,tableId,menuLocationId,menuLocationType,levelType){
	var str='';
	
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered dataTable'+tableId+'">';
			str+='<thead class="text-capital">';
				if(levelType == "Days Difference"){
					str+='<tr>';
						if(locationTypeNew == "state"){
							str+='<th rowspan="2" class="text-capital">State</th>';
						}
						else if(locationTypeNew == "district"){
							str+='<th rowspan="2" class="text-capital">District</th>';
						}
						else if(locationTypeNew == "constituency"){
							str+='<th rowspan="2" class="text-capital">District</th>';
							str+='<th rowspan="2" class="text-capital">Constituency</th>';
						}
						else if(locationTypeNew == "mandal"){
							str+='<th rowspan="2" class="text-capital">District</th>';
							str+='<th rowspan="2" class="text-capital">Constituency</th>';
							str+='<th rowspan="2" class="text-capital">Mandal</th>';
						}
						else if(locationTypeNew == "panchayat"){
							str+='<th rowspan="2" class="text-capital">District</th>';
							str+='<th rowspan="2" class="text-capital">Constituency</th>';
							str+='<th rowspan="2" class="text-capital">Mandal</th>';
							str+='<th rowspan="2" class="text-capital">Panchayat</th>';
						}
						str+='<th colspan="3">Total</th>';
						str+='<th colspan="3">Last 0-10 Days</th>';
						str+='<th colspan="3">Last 10-20 Days</th>';
						str+='<th colspan="3">Last 20-30 Days</th>';
						str+='<th colspan="3">Last 30-45 Days</th>';
						str+='<th colspan="3">Last 45-60 Days</th>';
						str+='<th colspan="3">Last 60-90 Days</th>';
						str+='<th colspan="3">Last 90-180 Days</th>';
						str+='<th colspan="3">Last 180-365 Days</th>';
						str+='<th colspan="3">More Than Year</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
						str+='<th>Paid To Transco</th>';
						str+='<th>Installed</th>';
						str+='<th>Not Installed</th>';
					str+='</tr>';
					}else{
						str+='<tr>';
							if(locationTypeNew == "state"){
								str+='<th class="text-capital">State</th>';
							}
							else if(locationTypeNew == "district"){
								str+='<th class="text-capital">District</th>';
							}
							else if(locationTypeNew == "constituency"){
								str+='<th class="text-capital">District</th>';
								str+='<th class="text-capital">Constituency</th>';
							}
							else if(locationTypeNew == "mandal"){
								str+='<th class="text-capital">District</th>';
								str+='<th class="text-capital">Constituency</th>';
								str+='<th class="text-capital">Mandal</th>';
							}
							else if(locationTypeNew == "panchayat"){
								str+='<th class="text-capital">District</th>';
								str+='<th class="text-capital">Constituency</th>';
								str+='<th class="text-capital">Mandal</th>';
								str+='<th class="text-capital">Panchayat</th>';
							}
							str+='<th>In 0-10 Days</th>';
							str+='<th>In 10-20 Days</th>';
							str+='<th>In 20-30 Days</th>';
							str+='<th>In 30-45 Days</th>';
							str+='<th>In 45-60 Days</th>';
							str+='<th>In 60-90 Days</th>';
							str+='<th>In 90-180 Days</th>';
							str+='<th>In 180-365 Days</th>';
							str+='<th>More Than Year</th>';
						str+='</tr>';
					}
			str+='</thead>';
			str+='<tbody>';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
						if(locationTypeNew == "state"){
							str+='<td class="text-capital">'+locationTypeNew+'</td>';
						}
						else if(locationTypeNew == "district"){
							str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
						}
						else if(locationTypeNew == "constituency"){
							str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
						}
						else if(locationTypeNew == "mandal"){
							str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
						}
						else if(locationTypeNew == "panchayat"){
							str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
							str+='<td class="text-capital">'+ajaxresp[i].panchayat+'</td>';
						}
						if(levelType == "Days Difference"){
							if(ajaxresp[i].totalPaidToTransco != null && ajaxresp[i].totalPaidToTransco > 0)
								str+='<td>'+ajaxresp[i].totalPaidToTransco+'</td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].totalInstalled != null && ajaxresp[i].totalInstalled > 0)
								str+='<td>'+ajaxresp[i].totalInstalled+'</td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].totalNotInstalled != null && ajaxresp[i].totalNotInstalled > 0)
								str+='<td>'+ajaxresp[i].totalNotInstalled+'</td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTransco0to10 != null && ajaxresp[i].paidToTransco0to10 > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="1" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTransco0to10+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installed0to10 != null && ajaxresp[i].installed0to10 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="10" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installed0to10+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalled0to10 != null && ajaxresp[i].notInstalled0to10 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="19" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalled0to10+'</a></td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTransco10to20 != null && ajaxresp[i].paidToTransco10to20 > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="2" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTransco10to20+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installed10to20 != null && ajaxresp[i].installed10to20 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="11" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installed10to20+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalled10to20 != null && ajaxresp[i].notInstalled10to20 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="20" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalled10to20+'</a></td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTransco20to30 != null && ajaxresp[i].paidToTransco20to30 > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="3" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTransco20to30+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installed20to30 != null && ajaxresp[i].installed20to30 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="12" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installed20to30+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalled20to30 != null && ajaxresp[i].notInstalled20to30 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="21" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalled20to30+'</a></td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTransco30to45 != null && ajaxresp[i].paidToTransco30to45 > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="4" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTransco30to45+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installed30to45 != null && ajaxresp[i].installed30to45 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="13" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installed30to45+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalled30to45 != null && ajaxresp[i].notInstalled30to45 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="22" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalled30to45+'</a></td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTransco45to60 != null && ajaxresp[i].paidToTransco45to60 > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="5" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTransco45to60+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installed45to60 != null && ajaxresp[i].installed45to60 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="14" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installed45to60+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalled45to60 != null && ajaxresp[i].notInstalled45to60 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="23" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalled45to60+'</a></td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTransco60to90 != null && ajaxresp[i].paidToTransco60to90 > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="6" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTransco60to90+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installed60to90 != null && ajaxresp[i].installed60to90 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="15" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installed60to90+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalled60to90 != null && ajaxresp[i].notInstalled60to90 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="24" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalled60to90+'</a></td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTransco90to180 != null && ajaxresp[i].paidToTransco90to180 > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="7" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTransco90to180+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installed90to180 != null && ajaxresp[i].installed90to180 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="16" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installed90to180+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalled90to180 != null && ajaxresp[i].notInstalled90to180 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="25" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalled90to180+'</a></td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTransco180to365 != null && ajaxresp[i].paidToTransco180to365 > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="8" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTransco180to365+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installed180to365 != null && ajaxresp[i].installed180to365 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="17" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installed180to365+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalled180to365 != null && ajaxresp[i].notInstalled180to365 > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="26" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalled180to365+'</a></td>';
							else
								str+='<td>0</td>';
						}
						if(ajaxresp[i].paidToTranscomoreThanYear != null && ajaxresp[i].paidToTranscomoreThanYear > 0)
							str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="9" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].paidToTranscomoreThanYear+'</a></td>';
						else
							str+='<td>0</td>';
						if(levelType == "Days Difference"){
							if(ajaxresp[i].installedmoreThanYear != null && ajaxresp[i].installedmoreThanYear > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="18" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].installedmoreThanYear+'</a></td>';
							else
								str+='<td>0</td>';
							if(ajaxresp[i].notInstalledmoreThanYear != null && ajaxresp[i].notInstalledmoreThanYear > 0)
								str+='<td><a class="installedDetailsCls" attr_uniqueId="'+ajaxresp[i].uniqueId+'" attr_type="27" attr_locationType="'+locationTypeNew+'" attr_menuLocationId="'+menuLocationId+'" attr_menuLocationType="'+menuLocationType+'">'+ajaxresp[i].notInstalledmoreThanYear+'</a></td>';
							else
								str+='<td>0</td>';
						}
						str+='</tr>';
					}
				}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	
	$("#"+tableId).html(str);
	if(locationTypeNew == 'constituency' || locationTypeNew == 'mandal' || locationTypeNew == 'panchayat')
	{
		$(".dataTable"+tableId).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   tableId,
					filename:  tableId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o"></i>',
					titleAttr: 'PDF',
					title:	   tableId,
					filename:  tableId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
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
		$(".dataTable"+tableId).dataTable({
			"iDisplayLength": 20,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   tableId,
					filename:  tableId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend:    'pdfHtml5',
					text:      '<i class="fa fa-file-pdf-o"></i>',
					titleAttr: 'PDF',
					title:	   tableId,
					filename:  tableId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
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
$(document).on('click','.installedDetailsCls', function(){
	var uniqueId = $(this).attr("attr_uniqueId");
	var lengthType = $(this).attr("attr_type");
	var locationType = $(this).attr("attr_locationType");
	var menuLocationId = $(this).attr("attr_menuLocationId");
	var menuLocationType = $(this).attr("attr_menuLocationType");
	if(menuLocationType == "state"){
		menuLocationId = "1";
	}
	$("#installedDetailsModalId").modal("show");
	var typeDiff = '';

	$(".ntrJalasariLocCls"+locationType+" li").each(function(){
		if($(this).hasClass('active')){
			typeDiff = $(this).attr("attr_type")
		}
	});
	
	if(typeDiff == "Second"){
		getNTRJalasiriInstalledDetails(uniqueId,lengthType,locationType,menuLocationId,menuLocationType,"");
	}else if(typeDiff == "Third"){
		getNTRJalasiriInstalledDetails(uniqueId,lengthType,locationType,menuLocationId,menuLocationType,"Days Difference");
	}else{
		getNTRJalasiriInstalledDetails(uniqueId,lengthType,locationType,menuLocationId,menuLocationType,"");
	}
	
});	

function getNTRJalasiriInstalledDetails(uniqueId,lengthType,locationType,menuLocationId,menuLocationType,typeDiffVal)
{
	$("#installedDetailsModalBodyId").html(spinner);
	var json = {
		year : globalFinancialYear,
		fromDate : "2018/04/01",
		toDate : moment().format("YYYY/MM/DD"),//"2018/06/30",
		locationType:menuLocationType,
		locationId : menuLocationId,
		sublocaType : locationType,
		category :lengthType,
		uniqueIdStr : uniqueId,
		type:typeDiffVal
	}
	$.ajax({
		url: 'getNTRJalasiriInstalledDetails',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			if(ajaxresp !=null && ajaxresp.length>0){
				buildNTRJalasiriInstalledDetails(ajaxresp);
			}else{
				$("#installedDetailsModalBodyId").html("No Data Available");
			}
		}
	});
}

function buildNTRJalasiriInstalledDetails(ajaxresp){
	
	var str='';
	
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered dataTableinstalledDetails">';
			str+='<thead class="text-capital">';
				str+='<tr>';
					str+='<th class="text-capital">District</th>';
					str+='<th class="text-capital">Constituency</th>';
					str+='<th class="text-capital">Mandal</th>';
					str+='<th class="text-capital">Panchayat</th>';
					str+='<th class="text-capital">Lead Name</th>';
					str+='<th class="text-capital">Benefiary Payment Date</th>';
					str+='<th class="text-capital">Transco Paid Date</th>';
					str+='<th class="text-capital">Installed Date</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				if(ajaxresp != null && ajaxresp.length > 0){
					for(var i in ajaxresp){
						str+='<tr>';
						str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
						str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
						str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
						str+='<td class="text-capital">'+ajaxresp[i].panchayat+'</td>';
						str+='<td class="text-capital">'+ajaxresp[i].lead+'</td>';
						str+='<td class="text-capital">'+ajaxresp[i].benePaymentDate+'</td>';
						str+='<td class="text-capital">'+ajaxresp[i].transoPaidDate+'</td>';
						if(ajaxresp[i].installDate != null){
							str+='<td class="text-capital">'+ajaxresp[i].installDate+'</td>';
						}else{
							str+='<td class="text-capital"> - </td>';
						}
						
						
						str+='</tr>';
					}
				}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	
	$("#installedDetailsModalBodyId").html(str);
	$(".dataTableinstalledDetails").dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			
	});
}


$(document).on('click','.ntrJalasariLocCls li', function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var blockType = $(this).attr("attr_type");
	var divId = $(this).attr("attr_divid");
	var levelType = $(this).attr("attr_level_type");
	var menuLocationId = $(this).attr("attr_menuLocationId");
	var menuLocationType = $(this).attr("attr_menuLocationType");
	
	
	if(levelType == "state" || levelType == "district")
	{
		theadArr = [levelType,'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
	}else if(levelType == "constituency")
	{
		theadArr = ["district",levelType,'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
	}else if(levelType == "mandal")
	{
		theadArr = ["district","constituency",levelType,'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
	}else if(levelType == "panchayat")
	{
		theadArr = ["district","constituency","mandal",levelType,'Targeted Bore Wells ','Number of Bore Wells Drilled Succesfully','No of LT applications Filled','Demand Notices Received from TRANSCO','Beneficiaries Contribution Received (Nos)','Amount Paid to TRANSCO (Nos)','No of Solar Pumpsets Installed','Perc On Paid to Transco','OverAll Pumpsets Installed Perc'];
	}
	
	if(blockType == "Second"){
		if(menuLocationType == "state"){
			menuLocationId = "1";
		}
		getNTRJalasiriLocationWiseDetails(divId,levelType,menuLocationId,menuLocationType,"");
	}else if(blockType == "Third"){
		if(menuLocationType == "state"){
			menuLocationId = "1";
		}
		getNTRJalasiriLocationWiseDetails(divId,levelType,menuLocationId,menuLocationType,"Days Difference");
	}else{
		getNtrJalaSiriLvlWiseData(divId,levelType,theadArr,menuLocationType,menuLocationId,"Data","");
	}
	
});