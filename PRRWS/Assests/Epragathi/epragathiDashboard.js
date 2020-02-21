var spinner = '<div class="row"><div class="col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>',
	customStartDate =  moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY"),
	customEndDate = moment().format('DD/MM/YYYY'),
	globalpType="department",existingSystem=[],categoryList=[],globalStatusIds=[],
	windowWidth = $(window).width();
var globalDeptListArr, globalSubdeptListArr;
var globaldeptAnaListArr,globalSubdeptAnalListArr;
onloadCalls();
function onloadCalls() {	
	getOverviewDetails();
	getModuleandStatusOverview("","","");
	buildOverviewCollapse();
	$('.chosen-select').chosen();
	getAllStatusList("statusDivId");
	getOverAlldata("modules","departmentTableDivId");
}
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
/* $("#dateRangeForTrainingId").daterangepicker({
	opens: 'left',
	 startDate: customStartDate,
	 endDate: customEndDate,
	locale: {
	  format: 'DD/MM/YYYY'
	},
	ranges: {
	   'All':[moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY"), moment().format("DD/MM/YYYY")],
	   'Today' : [moment(), moment()],
	   'Yesterday' : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	   'This Month': [moment().startOf('month'), moment().endOf('month')],
	   'Last 7 Days': [moment().subtract(7, 'days'), moment()],
	   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	}
}); */
/* $('#dateRangeForTrainingId').on('apply.daterangepicker', function(ev, picker) {
    customStartDate=picker.startDate.format('DD/MM/YYYY');
	customEndDate=picker.endDate.format('DD/MM/YYYY');
	onloadCalls();
}); */
// over view block start
function getOverviewDetails(){
	$("#overviewId").html(spinner);
	var url = 'getOverviewDetails',
		type = 'POST',
		json={
			
		}
	$.ajax({
		type:'POST',
		url:'getOverviewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result){
			overviewDetails(result);
		}
	})	
}

function overviewDetails(result) {
	var str='',
		overviewArr = [{name:"Modules",count:result.moduleCount,img:"modules_icon"},
					   {name:"Frameworks",count:result.frameWorkCount,img:"framework_icon"},
					   {name:"Core Dashboards",count:result.coreDashboardCount,img:"core_icon"},
					   {name:"Datalytics",count:result.dataAnalyticsCount,img:"data_icon"},
					   {name:"Localization",count:result.localizationCount,img:"localization"}]
	str+='<div class="li_blocks m_top10" style="border-spacing: 10px 0px;">';
		str+='<ul class="blocksCls blockClkCls">';
		for(var i in overviewArr){
				if(i==0){
					str+='<li class="pad_5 border_borRad pragathiActiveCls displayBlock wid_100_20" attr_type="'+overviewArr[i].name+'" attr_div_id="showHideId'+i+'">';
				}else{
					str+='<li class="pad_5 border_borRad displayBlock wid_100_20" attr_type="'+overviewArr[i].name+'" style="background-color:#F6F6F6;" attr_div_id="showHideId'+i+'">';
				}
				str+='<div class="pad_10" style="border-left:10px solid #FAB012;">';
					str+='<h5 class="font_weight font_16">'+overviewArr[i].name+' <img src="Assests/images/'+overviewArr[i].img+'.png" alt="..." class="pull-right"></h5>';
					str+='<h2 class="font_weight m_top10">'+overviewArr[i].count+'</h2>';
				str+='</div>';
			str+='</li>';
		}
		str+='</ul>';
	str+='</div>';
	$("#overviewId").html(str);
}
//over view block End
function getModuleandStatusOverview(dept_type,exist_type,category_type){
	$("#stateWiseDonutGraphId,#statusWiseBlockId").html(spinner);
	var existtypes=[];
	if(exist_type && exist_type.length>0){
		existtypes.push(exist_type);
	}
	var json={
		"fromDate":"30-07-2018",
		"toDate":"31-07-2018",
		"departmentAproval": dept_type,
		"existingSystem":existtypes,
		"category":category_type
	}
	$.ajax({
		type:'POST',
		url:'getModuleandStatusOverview',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildModuleandStatusOverview(result);
		}
	})
}

function animateNumber(id,count) {
	$("#"+id).animateNumber({ number: count });	
}
function buildModuleandStatusOverview(result) {
	var str='';
	var dataArr=[];
	var total=0;
	for(var i in result.statusList){
		dataArr.push({"name": result.statusList[i].name,"y":result.statusList[i].count});		
		total += result.statusList[i].count;
	}
	var totalModules = result.moduleCount;
	var deptApproved = result.deptApproved;
	var deptNotApproved = result.deptNotApproved;
	var departmentCount = result.departmentCount;
	var serviceCount = result.serviceCount;
	var moduleCount = result.moduleCount;
	for(var i in result.existingSystem){
		var manualName = result.existingSystem[i].name;
		manualName = manualName.toString().replace(/\s/g, '');
		manualName = manualName.toString().replace(/\//g, '');
		var manualListArr=[{id:manualName+"CountId",count:result.existingSystem[i].count},{id:manualName+"ApprovedId",count:result.existingSystem[i].deptApproved},{id:manualName+"NotApprovedId",count:result.existingSystem[i].deptNotApproved}];
		for(var i in manualListArr) {
			animateNumber(manualListArr[i].id,manualListArr[i].count);
			if ( manualListArr[0].count != null && manualListArr[0].count  > 0 ){
				$("#"+manualListArr[i].id).closest(".deptTypeCls").addClass('modulesOverviewClkCls');
			}else{
				$("#"+manualListArr[i].id).closest(".deptTypeCls").removeClass('modulesOverviewClkCls');
			}			
		}
	}
	for(var i in result.subList){
		if(result.subList[i].name != undefined){
			var categoryName = result.subList[i].name;
			$("#"+categoryName+"NameId").html(categoryName);
			var manualListArr=[{id:categoryName+"CountId",count:result.subList[i].count},{id:categoryName+"ApprovedId",count:result.subList[i].deptApproved},{id:categoryName+"NotApprovedId",count:result.subList[i].deptNotApproved}];
			for(var i in manualListArr) {
				animateNumber(manualListArr[i].id,manualListArr[i].count);
				if ( manualListArr[0].count != null && manualListArr[0].count  > 0 ){
					$("#"+manualListArr[i].id).closest(".catTypeCls").addClass('modulesOverviewClkCls');
				}else{
					$("#"+manualListArr[i].id).closest(".catTypeCls").removeClass('modulesOverviewClkCls');
				}	
			}
		}
	}
	/* str+='<div class="row">';
	for(var i in result.statusList) {
		str+='<div class="col-sm-4 m_top10">';
		if(result.statusList[i].name == "UAT"){
			str+='<div class="pad_15 default_white border_radius_5" style="border:1px solid #fa9426;">';
		} else if(result.statusList[i].name == "Development"){
			str+='<div class="pad_15 default_white border_radius_5" style="border:1px solid #e75351;">';
		} else if(result.statusList[i].name == "Requirement"){
			str+='<div class="pad_15 default_white border_radius_5" style="border:1px solid #fdc334;">';
		} else if(result.statusList[i].name == "Testing"){
			str+='<div class="pad_15 default_white border_radius_5" style="border:1px solid #a856aa;">';
		} else if(result.statusList[i].name == "Production"){
			str+='<div class="pad_15 default_white border_radius_5" style="border:1px solid #25aee4;">';
		} else {
			str+='<div class="pad_15 default_white border_radius_5" style="border:1px solid #00b506;">';
		}
				str+='<h5 class="font_weight">'+result.statusList[i].name+'</h5>';
				str+='<h2 class="m_top10 font_weight">'+result.statusList[i].count+'</h2>';
			str+='</div>';
		str+='</div>';
	}
	str+='</div>';
	$("#statusWiseBlockId").html(str); */
	for(var i in result.statusList){
		var statusName = result.statusList[i].name;
		statusName = statusName.toString().replace(/\s/g, '');
		
		var statusListArr=[{id:"count"+statusName,count:result.statusList[i].count}];
		for(var i in statusListArr) {
			animateNumber(statusListArr[i].id,statusListArr[i].count);	
		}
	}
	//graph
		$('#stateWiseDonutGraphId').highcharts({
			colors:['#fa9426','#e75351','#fdc334','#a856aa','#25aee4','#00b506'],
			chart: {
				backgroundColor: '#FBFBFB',
				type: 'pie',
			},
			legend: {
				align: 'right',
				verticalAlign: 'top',
				layout: 'vertical',
				symbolWidth:14,
				symbolHeight:14,
				symbolRadius:7,
				itemMarginTop: 2,
				itemStyle:{
					fontWeight:'bold',
					fontSize:'14px',
				},
			},
		title: {
			text: '<h3><span style="margin-left:20px;">'+total+'</span><br/><span class="font_12 font_weight">MODULES</span></h3>',
			align: 'center',
			verticalAlign: 'middle',
			x:-70,
			y:-5,
			useHTML: true
		},
		subtitle: {
			text: ''
		},
		plotOptions: {
			pie:{
				innerSize:100,
				showInLegend: true
			},
			series: {
				dataLabels: {
					enabled: false,
					format: '{point.name}: {point.y:.1f}%'
				}
			},
			
		},

		tooltip :{
          useHTML: true,
          backgroundColor: '#FCFFC5', 
          formatter: function() {
            var cnt = this.point.count;
            return "<b style='color:"+this.point.color+"'>"+this.point.name+" -<br/>"+Highcharts.numberFormat(this.percentage,1)+"%)</b>";
          }  
        },
		series: [
			{
				
				data: dataArr
			}
		],
	});
	//graph
	
	var idListArr=[{id:"moduleId",count:moduleCount},{id:"serviceId",count:serviceCount},{id:"departmentId",count:departmentCount},{id:"totalModulesId",count:totalModules},{id:"deptApprovedId",count:deptApproved},{id:"deptNotApprovedId",count:deptNotApproved}];
	for(var i in idListArr) {
		animateNumber(idListArr[i].id,idListArr[i].count);	
		if ( idListArr[i].count != null && idListArr[i].count  > 0 ){
			$("#"+idListArr[i].id).closest(".deptAct").addClass('modulesOverviewClkCls');
		}else{
			$("#"+idListArr[i].id).closest(".deptAct").removeClass('modulesOverviewClkCls');
		}
	}
}

function getAllFrameworkOverviewDetails(){
	$("#frameworkId").html(spinner);
	var json={
			"fromDate":"30-07-2018",
			"toDate":"31-07-2018"
	}
	$.ajax({
		type:'POST',
		url:'getAllFrameworkOverviewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildAllFrameworkOverviewDetails(result);
		}
	})
}
function buildAllFrameworkOverviewDetails(result) {
	var str='';
	var str1='';
	var nameArr = {"My AP Portal":"Services","CLGS":"Services","App Store":"Apps","e-Highway":"API/Webservices"};
	str+='<div class="li_blocks" style="border-spacing: 10px 0px;">';
		str+='<ul class="blocksCls">';
			for(var i in result){
				if(i==0){
					str+='<li class="pad_5 borderBorRadDept displayBlock active frameAct frameClkCls" attr_id="'+result[i].id+'" attr_dept_count="'+result[i].deptCount+'" attr_service_count="'+result[i].count+'" attr_frame_type="'+result[i].name+'" style="border: solid 2px #b4d7ff;">';
				}else{
					str+='<li class="pad_5 borderBorRadDept displayBlock frameAct frameClkCls" attr_id="'+result[i].id+'" attr_dept_count="'+result[i].deptCount+'" attr_service_count="'+result[i].count+'" attr_frame_type="'+result[i].name+'" style="border: solid 2px #b4d7ff;">';
				}
				str+='<div  class="pad_10 brdLeft">';
				str+='<h5 class="font_weight font_16">'+result[i].name+'</h5>';
					str+='<h2 class="font_weight m_top10">'+result[i].count+' <span class="font_12">'+nameArr[result[i].name]+'</span></h2>';
				str+='</div>';
			str+='</li>';
			}
		str+='</ul>';
	str+='</div>';	
	$("#frameworkId").html(str);
	getArchitectureandDesignOverview(1);
}
function getArchitectureandDesignOverview(frameId){
	$("#architectureId").html(spinner);
	var json={
			"fromDate":"30-07-2018",
			"toDate":"31-07-2018",
			"statusId":frameId 
	}
	$.ajax({
		type:'POST',
		url:'getArchitectureandDesignOverview',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result){
			buildArchitectureandDesignOverview(result);
		}
	})
}
function buildArchitectureandDesignOverview(result) {
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-4">';
			str+='<div class="pad_5 brdR_3 bor_bag_F6">';
				str+='<h5 class="font_weight font_16 pad_15" style="border-left:10px solid #acacac;">Departments <span class="pull-right mTop8" style="font-size:30px;">'+result.deptCount+'</span></h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-4">';
			str+='<div class="pad_5 brdR_3 bor_bag_F6">';
				str+='<h5 class="font_weight font_16 pad_15" style="border-left:10px solid #acacac;">Services  <span class="pull-right mTop8" style="font-size:30px;">'+result.serviceCount+'</span></h5>';
			str+='</div>';
		str+='</div>';
		if(result.webServiceCount !=null && typeof result.webServiceCount !='undefined'  && result.webServiceCount !=0){
			str+='<div class="col-sm-4">';
				str+='<div class="pad_5 brdR_3 bor_bag_F6">';
					str+='<h5 class="font_weight font_16 pad_15" style="border-left:10px solid #acacac;">Web Services  <span class="pull-right mTop8" style="font-size:30px;">'+result.webServiceCount+'</span></h5>';
				str+='</div>';
			str+='</div>';
		}else{
			str+='<div class="col-sm-4">';
				str+='<div class="pad_5 brdR_3 bor_bag_F6">';
					str+='<h5 class="font_weight font_16 pad_15" style="border-left:10px solid #acacac;">Web Services  <span class="pull-right mTop8" style="font-size:30px;">0</span></h5>';
				str+='</div>';
			str+='</div>';
		}
		
	str+='</div>';
	str+='<div class="table-responsive m_top15 brdR_3">';
		str+='<table class="table table_architecture">';
			str+='<thead>';
				str+='<tr>';
					for(var i in result.statusList){
						str+='<th>'+result.statusList[i].name+'</th>';	
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				str+='<tr>';
				for(var i in result.statusList){
					str+='<td>'+result.statusList[i].count+'</td>';	
				}
				str+='</tr>';
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#architectureId").html(str);
}
getAllLocalizationDetailsForClick();
function getAllLocalizationDetailsForClick(){
	var json={
			
	}
	$.ajax({
		type:'POST',
		url:'getAllLocalizationDetailsForClick',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			
		}
	})
}
function getCoreDashboardOverviewDetails(){
	$("#coreDashboardId").html(spinner);
	var json={
			
	}
	$.ajax({
		type:'POST',
		url:'getCoreDashboardOverviewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildCoreDashboardOverviewDetails(result);
		}
	})
}
function buildCoreDashboardOverviewDetails(result) {
	var str='';
	var str1='';
	var str2='';
	str+='<div class="li_blocks" style="border-spacing: 10px 0px;">';//pj peez
		str+='<ul class="blocksCls coreDashboardClkCls">';
			for(var i in result.subList) {
				if(i == 0){
					str+='<li class="pad_5 brdR_3 coreCls active" attr_type="department" style="border: solid 2px #b4d7ff; cursor:pointer;">';
				} else {
					str+='<li class="pad_5 brdR_3 coreCls" attr_type="subDepartment" style="border: solid 2px #b4d7ff; cursor:pointer;">';
				}
					str+='<div class="pad_15 borderLeftStl" style="border-left:10px solid #acacac;">';
						str+='<h5 class="font_weight font_16">'+result.subList[i].coreDashboardTypeName+' <span class="pull-right mTop8" style="font-size:30px;">'+result.subList[i].coreDashboardTypeCount+'</span></h5>';
					str+='</div>';
				str+='</li>';
			}
		str+='</ul>';	
	str+='</div>';
	globalDeptListArr=[{id:"p1Id",count:result.subList[0].priorityP1Count},{id:"p2Id",count:result.subList[0].priorityP2Count},{id:"newId",count:result.subList[0].priorityNewCount},{id:"deptYesId",count:result.subList[0].yesCount},{id:"deptNoId",count:result.subList[0].noCount},{id:"deptWipId",count:result.subList[0].wipCount},{id:"deptNoWipId",count:result.subList[0].noWipCount}];
	
    globalSubdeptListArr=[{id:"p1Id",count:result.subList[1].priorityP1Count},{id:"p2Id",count:result.subList[1].priorityP2Count},{id:"newId",count:result.subList[1].priorityNewCount},{id:"deptYesId",count:result.subList[1].yesCount},{id:"deptNoId",count:result.subList[1].noCount},{id:"deptWipId",count:result.subList[1].wipCount},{id:"deptNoWipId",count:result.subList[1].noWipCount}];
	for(var i in globalDeptListArr) {
		animateNumber(globalDeptListArr[i].id,globalDeptListArr[i].count);	
	}
	$("#coreDashboardId").html(str);
}

function getDataAnalyticsOverviewDetails(){
	$("#dataAnalyticsId").html(spinner);
	var json={
			
	}
	$.ajax({
		type:'POST',
		url:'getDataAnalyticsOverviewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildDataAnalyticsOverviewDetails(result);	
		}
	})
}

function buildDataAnalyticsOverviewDetails(result) {
	var str='';
	var str1='';
	var str2='';
	str+='<div class="li_blocks" style="border-spacing: 10px 0px;">';//pj peez
		str+='<ul class="blocksCls dataAnalyticsClkCls">';
			for(var i in result.subList) {
			//Rahul	
			if(i == 0){
					str+='<li class="pad_5 brdR_3 dataCls active" attr_type="department" style="border: solid 2px #b4d7ff; cursor:pointer;">';
				} else {
					str+='<li class="pad_5 brdR_3 dataCls" attr_type="subDepartment" style="border: solid 2px #b4d7ff; cursor:pointer;">';
				}
					str+='<div class="pad_15 borderLeftStl" style="border-left:10px solid #acacac;">';
						str+='<h5 class="font_weight font_16">'+result.subList[i].coreDashboardTypeName+' <span class="pull-right mTop8" style="font-size:30px;">'+result.subList[i].dataAnalyticsTypeCount+'</span></h5>';
					str+='</div>';
				str+='</li>';
			}
		str+='</ul>';	
	str+='</div>';
		globaldeptAnaListArr=[{id:"deptyetToInitiate",count:result.subList[0].yetToInitiateCount},{id:"deptInteraction",count:result.subList[0].deptInteractionCount},{id:"pocComp",count:result.subList[0].pocCompletedCount},{id:"dataReq",count:result.subList[0].dataRquestedCount}];
	
		globalSubdeptAnalListArr=[{id:"deptyetToInitiate",count:result.subList[1].yetToInitiateCount},{id:"deptInteraction",count:result.subList[1].deptInteractionCount},{id:"pocComp",count:result.subList[1].pocCompletedCount},{id:"dataReq",count:result.subList[1].dataRquestedCount}];
		for(var i in globaldeptAnaListArr) {
			animateNumber(globaldeptAnaListArr[i].id,globaldeptAnaListArr[i].count);	
		}
		
		$("#dataAnalyticsId").html(str); //Rahul
	/*$("#dataAnalaticDeptCountId").animateNumber({ number: result.subList[0].dataAnalyticsTypeCount });
	$("#dataAnalaticSubDeptCountId").animateNumber({ number: result.subList[1].dataAnalyticsTypeCount });
	str+='<h4 class="font_weight font_16">STATUS</h4>';
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-3">';
			str+='<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">';
				str+='<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">Yet to Initiate<span class="pull-right mTop8" style="font-size:30px;">'+result.subList[0].yetToInitiateCount+'</span></h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3">';
			str+='<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">';
				str+='<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">Dept. Interaction <span class="pull-right mTop8" style="font-size:30px;">'+result.subList[0].deptInteractionCount+'</span></h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3">';
			str+='<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">';
				str+='<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">POC Completed <span class="pull-right mTop8" style="font-size:30px;">'+result.subList[0].pocCompletedCount+'</span></h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3">';
			str+='<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">';
				str+='<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">Data Requested <span class="pull-right mTop8" style="font-size:30px;">'+result.subList[0].dataRquestedCount+'</span></h5>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#statusId").html(str);*/
}
function getAllLocalizationDetailsForClick(){
	$("#statusId").html(spinner);
	$("#localDeptBlockId").html(spinner);
	$("#websitesStatusId").html(spinner);
	var json={
			
	}
	$.ajax({
		type:'POST',
		url:'getAllLocalizationDetailsForClick',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildAllLocalizationDetailsForClick(result);	
		}
	})
}
function buildAllLocalizationDetailsForClick(result) {
	var str='';
	var str1='';
	str+='<div class="row">';
		str+='<div class="col-sm-6">';
			str+='<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">';
				str+='<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">Department <span class="pull-right mTop8" style="font-size:30px;">'+result.deptCount+'</span></h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-6">';
			str+='<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">';
				str+='<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">URL <span class="pull-right mTop8" style="font-size:30px;">'+result.count+'</span></h5>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	str1+='<h4 class="font_weight font_16">WEBSITES STATUS</h4>';
	str1+='<div class="row m_top10">';//pj
		str1+='<div class="li_blocks m_top10" style="border-spacing: 10px 0px;">';
			str1+='<ul class="blocksCls">';
			for(var i in result.statusList) {
				str1+='<li class="pad_5 displayBlock">';
					str1+='<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">';
						str1+='<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">'+result.statusList[i].status+' <span class="pull-right mTop8" style="font-size:30px;">'+result.statusList[i].count+'</span></h5>';
					str1+='</div>';
				str1+='</li>';
			}
			str1+='</ul>';
		str1+='</div>';	
	str1+='</div>';
	$("#localDeptBlockId").html(str);
	$("#websitesStatusId").html(str1);
}
$(document).on("click",".frameClkCls",function(){
	$(".frameClkCls").removeClass('active');
	$(this).addClass("active");
	var serviceCount = $(this).attr("attr_service_count");
	var deptCount = $(this).attr("attr_dept_count");
	var frameType = $(this).attr("attr_frame_type");
	var frameId = $(this).attr("attr_id");
	//if(frameType == "My AP Portal") {
		getArchitectureandDesignOverview(frameId);
	//}
});
$(document).on("click",".blockClkCls li",function(){
	$('.blockClkCls li').removeClass('pragathiActiveCls');
	$('.blockClkCls li').css("background-color",'#F6F6F6');
	$(this).css("background-color",'');
	$(this).addClass('pragathiActiveCls');
	var attrType = $(this).attr("attr_type");
	var attrDivId = $(this).attr("attr_div_id");
	$('.showHideCls').hide();
	$('#'+attrDivId).show();
	if(attrType == "Modules") {
		getModuleandStatusOverview("","","");
		$("a[href='#modulesTab']").trigger("click");
	} else if(attrType == "Frameworks") {
		getAllFrameworkOverviewDetails();
		$("a[href='#frameworkTab']").trigger("click");
	} else if(attrType == "Core Dashboards") {
		getCoreDashboardOverviewDetails();
		$("a[href='#coreDashboardTab']").trigger("click");
	} else if(attrType == "Datalytics") {
		getDataAnalyticsOverviewDetails();
		$("a[href='#datalyticsTab']").trigger("click");
	} else if(attrType == "Localization") {
		getAllLocalizationDetailsForClick();
		$("a[href='#localizationTab']").trigger("click");
	}
});

$(document).on("click",".resetClkCls",function(){
	var reset_type = $(this).attr("attr_type");
	if(reset_type == "moduleReset") {
		$(".deptAct").removeClass("active");
		$(".moduleAct").addClass("active");
		$(".catAct").css("box-shadow","");
		$(".existAct").css("box-shadow","");
		$(".deptTypeCls").attr("attr_dept_type","");
		$(".catTypeCls").attr("attr_dept_type","");
		$(".catTypeCls").attr("attr_exist_type","");
		getModuleandStatusOverview("","","");
	} else if(reset_type == "frameReset") {
		getAllFrameworkOverviewDetails();
	}
});
$(document).on("click",".modulesOverviewClkCls",function(){
	$(".catAct").css("box-shadow","");
	var category_type = $(this).attr("attr_category_type");
	var exist_type = $(this).attr("attr_exist_type");
	var dept_type = $(this).attr("attr_dept_type");
	var blockType = $(this).attr("attr_block_type");
	if(blockType == "moduleBlock") {
		$(".existAct").css("box-shadow","");
		$(".modulesOverviewClkCls").removeClass("active");
		$(this).addClass("active");
		$(".deptTypeCls").attr("attr_dept_type",dept_type);
		getModuleandStatusOverview(dept_type,"");
	} else if(blockType == "existingBlock") {
		$(".existAct").css("box-shadow","");
		$(this).css("box-shadow","0 0 4px 2px rgba(0,0,0,0.2)");
		$(".catTypeCls").attr("attr_dept_type",dept_type);
		$(".catTypeCls").attr("attr_exist_type",exist_type);
		getModuleandStatusOverview(dept_type,exist_type);
	} else if(blockType == "categoryBlock") {
		$(this).css("box-shadow","0 0 4px 2px rgba(0,0,0,0.2)");
		getModuleandStatusOverview(dept_type,exist_type,category_type);
	}
});
$(document).on("click",".coreDashboardClkCls li",function(){
	$(".coreCls").removeClass("active");
	var type = $(this).attr("attr_type");
	$(this).addClass("active");
	if(type == "department") {
		for(var i in globalDeptListArr) {
			animateNumber(globalDeptListArr[i].id,globalDeptListArr[i].count);	
		}
	} else {
		for(var i in globalSubdeptListArr) {
			animateNumber(globalSubdeptListArr[i].id,globalSubdeptListArr[i].count);	
		}
	}
});

// Rahul
$(document).on("click",".dataAnalyticsClkCls li",function(){
	$(".dataCls").removeClass("active");
	var type = $(this).attr("attr_type");
	$(this).addClass("active");
	if(type == "department") {
		for(var i in globaldeptAnaListArr) {
			animateNumber(globaldeptAnaListArr[i].id,globaldeptAnaListArr[i].count);	
		}
	} else {
		for(var i in globalSubdeptAnalListArr) {
			animateNumber(globalSubdeptAnalListArr[i].id,globalSubdeptAnalListArr[i].count);	
		}
	}
}); 

// @ vasanthi
function buildOverviewCollapse(){
	var categoriesTabArr=[{name: "Overall Departments",type:"department"},
						  {name: "Overall Services",type:"service"},
						  {name: "Overall Modules",type:"modules"},
						  {name: "Frame Work",type:"framework"},
						  {name: "Core Dashboard",type:"core Dashboard"},
						  {name: "Datalytics",type:"datalytics"},
						  {name: "Localization",type:"localization"}];
	var str='';
	str+='<div class="panel-group m_top30 panel-d9 panel-box-shadow">'; //remove inline css
		str+='<div class="panel panel-default">';
			str+='<div class="panel-heading">';
				str+='<a class="panelCollapseIconBlack" data-toggle="collapse" href="#overviewCollapse">';
					str+='<h4 class="panel-title">OVERVIEW</h4>';
				str+='</a>';
			str+='</div>';
			str+='<div id="overviewCollapse" class="panel-collapse collapse in">';
				str+='<div class="panel-body">';
					str+='<div class="custom-tabs-d9">';
						str+='<ul class="nav nav-tabs">';
						for(var i in categoriesTabArr){
							if(categoriesTabArr[i].name == "Overall Modules"){
								str+='<li class="active">';
							}else{
								str+='<li>';
							}					
								str+='<a class="overview-tabs" data-toggle="tab" href="#'+categoriesTabArr[i].type.replace(/\s+/g, '')+'Tab" attr_pType="'+categoriesTabArr[i].type+'">'+categoriesTabArr[i].name+'</a>';
							str+='</li>';
							
						}							
						str+='</ul>';						
						str+='<div class="pad_e5" id="overallviewCls">';
							str+='<div class="row">	';								
								str+='<div class="col-sm-2 m_top10">';
									str+='<h5 class="font_weight">STATUS<span class="bad_color m_left_10 f_12" id="validatationTextId" style="display:none;">Please Select Status</span></h5>';
									str+='<select id="statusDivId" class="form-control chosen-select" multiple></select>';
								str+='</div>';
								str+='<div class="col-sm-6 m_top10 existing-system">';
									str+='<h5 class="font_weight">EXISTING SYSTEM</h5>';
									str+='<div class="row">';
										str+='<div class="col-sm-4 m_top10">';
											str+='<div class="white-block pad_5">';
												str+='<label class="checkbox-inline"><input class="overview-checkbox" type="checkbox" value="Manual" name="existingSys">Manual</label>';
											str+='</div>';
										str+='</div>';
										str+='<div class="col-sm-4 m_top10">';
											str+='<div class="white-block pad_5">';
												str+='<label class="checkbox-inline"><input class="overview-checkbox" type="checkbox" value="Legacy/Brown Filed" name="existingSys">Legacy Application</label>';
											str+='</div>';
										str+='</div>';
										str+='<div class="col-sm-4 m_top10">';
											str+='<div class="white-block pad_5">';
												str+='<label class="checkbox-inline"><input class="overview-checkbox" type="checkbox" value="Green Filed" name="existingSys">Green Field</label>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-3 m_top10 category">';
									str+='<h5 class="font_weight">CATEGORY</h5>';
									str+='<div class="row">';
										str+='<div class="col-sm-4 m_top10">';
											str+='<div class="white-block pad_5">';
												str+='<label class="checkbox-inline"><input class="overview-checkbox" type="checkbox" value="G2G" name="category">G to G </label>';
											str+='</div>';
										str+='</div>';
										str+='<div class="col-sm-4 m_top10">';
											str+='<div class="white-block pad_5">';
												str+='<label class="checkbox-inline"><input class="overview-checkbox" type="checkbox" value="G2B" name="category">G to B</label>';
											str+='</div>';
										str+='</div>';
										str+='<div class="col-sm-4 m_top10">';
											str+='<div class="white-block pad_5">';
												str+='<label class="checkbox-inline"><input class="overview-checkbox" type="checkbox" value="G2C" name="category">G to C</label>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-1" style="margin-top:35px;">';
									str+='<button type="button" class="btn btn-sm btn-info getDetails" attr_divId="departmentTableDivId" attr_type="department">Get Details</button>';
								str+='</div>';											
							str+='</div>';
						str+='</div>';
						str+='<div class="tab-content">';
						for(var i in categoriesTabArr){
							if(i == 0){
								str+='<div id="'+categoriesTabArr[i].type.replace(/\s+/g, '')+'Tab" class="tab-pane active">';
							}							
							else{
								str+='<div id="'+categoriesTabArr[i].type.replace(/\s+/g, '')+'Tab" class="tab-pane">';
							}								
								str+='<div class="pad_20">';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';										
										str+='<div id="'+categoriesTabArr[i].type.replace(/\s+/g, '')+'TableDivId"></div>';
									str+='</div>';
								str+='</div>';
								str+='</div>';
							str+='</div>';				
						}
						str+='</div>';
					str+='</div>';
				str+='</div>';					
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#overviewCollpseDivId").html(str);	
}
var statusArr =[];
	statusArr.push("0");
	$(document).on("change","#statusDivId",function(){//ara1
	 	values = $(this).val();//debugger;		
		if(values != null && values.length > 0){
			$('#validatationTextId').hide();
			$('.getDetails').prop("disabled", false);
			for(var i=0; i<values.length; i++) {
				if($.inArray(values[i], statusArr) == -1){
					if(values[i] == 0){values=[];values.push("0");
						$('#statusDivId').find($('option')).attr('selected',false)
						$("#statusDivId").val(0);
						$("#statusDivId").trigger('chosen:updated');
						statusArr = [];
						statusArr.push("0");
					}else{
						$('#statusDivId option:selected').each(function (index, option) { 							
							if($(this).val()==0){
								$(option).attr('selected',false); 
								$("#statusDivId").trigger('chosen:updated');
							}
							statusArr=[];
							statusArr.push($(this).val());
						});
					}
				}
				
			 }
		}else{
			$('.getDetails').prop("disabled", true);
			$('#validatationTextId').show();
		}		
});
$(document).on("click",".overview-tabs",function(){	
	globalStatusIds=[];
	existingSystem=[];
	categoryList=[];	
	var type=$(this).attr("attr_pType");
	var divId = type.replace(/\s+/g, '')+"TableDivId";
	$('#validatationTextId').hide();
	$('.getDetails').prop("disabled", false);
	$(".getDetails").attr("attr_divId",divId).attr("attr_type",type);	
	$("#statusDivId").val(0).trigger('chosen:updated');
	 $(".overview-checkbox").each(function(){		
        if($(this).is(":checked")){
			$(this).trigger("click");
		}
	 });
	if(type=="department" || type=="service" || type=="modules"){
		$("#overallviewCls").show()
		getOverAlldata(type,divId);
	}else if(type== "core Dashboard" || type== "datalytics" || type== "localization" || type == "framework"){
		$("#overallviewCls").hide();
		getOverAllDatabyCategory(type,divId)
	}
	
})
$(document).on("click",".getDetails",function(){
	var name,value;
	existingSystem=[];
	categoryList=[];
	globalStatusIds=[];
	var divId=$(this).attr("attr_divId");
	var type=$(this).attr("attr_type");
    $(".overview-checkbox").each(function(){		
        if($(this).is(":checked")){
            name= $(this).attr("name");
			value= $(this).val();			
			if(name== "existingSys"){
				existingSystem.push(value);				
			}else if(name== "category"){
				categoryList.push(value);
			}
		}
    });
	globalStatusIds =$("#statusDivId").val();
	if(globalStatusIds == null){
		$('#validatationTextId').show();
	}else{
		$('#validatationTextId').hide();
		if(globalStatusIds != null && globalStatusIds[0] == "0"){
			globalStatusIds =[];
		}
		
		if(type == "department" || type =="service" || type =="modules"){		
			getOverAlldata(type,divId);
		}else if(type== "core Dashboard" || type== "datalytics" || type== "localization" || type == "framework"){
			getOverAllDatabyCategory(type,divId);
		}
	}
	
})
function getAllStatusList(divId){
	//$("#overviewId").html(spinner);
	var json={
			
	}
	$.ajax({
		type:'POST',
		url:'getAllStatusList',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildSelectBox(result,divId);
		}
	})
}
function buildSelectBox(result,divId){	
	var str='';	
	$("#"+divId).append('<option value="0" selected>All</option>');
	for(var i in result){
		$("#"+divId).append('<option value="'+result[i].id+'">'+result[i].name+'</option>');
	}
	$("#"+divId).trigger("chosen:updated");
}

function getOverAlldata(type,divId){
	$("#"+divId).html(spinner);
	var json={
	existingSystem: existingSystem,
	statusIds: globalStatusIds,
	categoryList: categoryList,
	pType: type			
	}
	$.ajax({
		type:'POST',
		url:'getOverAlldata',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0){
			if(type == "department"){
				buildOverviewDetails(result);
			}else if(type =="service" || type =="modules"){
				buildOverallServiceModuleDetails(result,type,divId);
			}
		}else{
			$("#"+divId).html("NO DATA AVAILABLE");
		}
	})
}

function buildOverviewDetails(result){
	var str='';
	var count=0;
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_default" id="overAllDepartmentsDataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>S.No.</th>';
					str+='<th>Department Name</th>';
					str+='<th>Count of Service</th>';
					str+='<th>No.of Approvals(services)</th>';
					str+='<th>Business Requirement Captured</th>';
					str+='<th>Existing System</th>';
					str+='<th>Service Impact(Count of primary beneficiaries)</th>';
					str+='<th>Primary Beneficiary</th>';
					str+='<th>Roll Out Status on Modules Considered</th>';					
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				count= count+1;
				str+='<tr>';
					str+='<td class="text-center">'+count+'</td>';
					str+='<td>'+getValues(result[i].name)+'</td>';
					str+='<td>'+getValues(result[i].servicesCount)+'</td>';
					str+='<td>'+getValues(result[i].approvedCount)+'</td>';
					str+='<td>'+getValues(result[i].capturedCount)+'</td>';
					str+='<td>'+getValues(result[i].existingType)+'</td>';
					str+='<td>'+getValues(result[i].benificirayPeople)+'</td>';
					str+='<td>'+getValues(result[i].benficiary)+'</td>';					
					str+='<td>'+getValues(result[i].dashboardProgress)+'</td>';	
									
				str+='</tr>';
			}				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#departmentTableDivId").html(str);
	$("#overAllDepartmentsDataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"order": [ 0, 'asc' ],
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		"aLengthMenu": [[15, 20, 25, -1], [15, 20, 25, "All"]],
		buttons: [
			{
				extend		:'csvHtml5',
				text		:'<i class="fa fa-file-text-o"></i>',
				titleAttr	: 'CSV',
				title		:  "Epragathi DASHBOARD",
				filename	:  'Epragathi_department'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function buildOverallServiceModuleDetails(result,type,divId){
	var str='';
	var count=0;
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_default" id="'+type.replace(/\s+/g, '')+'DataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>S.No.</th>';
					str+='<th>Department Name</th>';
					str+='<th>Service</th>';
					str+='<th>Module</th>';
					str+='<th>Dept. Approval</th>';
					str+='<th>Business Requirement Captured</th>';
					str+='<th>Existing System</th>';
					if(type == "service"){
						str+='<th>Service Impact(Count of primary beneficiaries)</th>';
						str+='<th>Primary Beneficiary</th>';
					}				
					str+='<th>Current Status</th>';
					str+='<th>Targeted Roll out date</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				count= count+1;
				str+='<tr>';
					str+='<td style="text-align: left !important;">'+count+'</td>';
					str+='<td style="text-align: left !important;">'+getValues(result[i].departmentName)+'</td>';
					str+='<td style="text-align: left !important;">'+getValues(result[i].service)+'</td>';
					if(type == "service"){
						str+='<td>'+getValues(result[i].moduleCount)+'</td>';
					}else{
						str+='<td>'+getValues(result[i].module)+'</td>';
					}
					str+='<td>'+getValues(result[i].deptAproved)+'</td>';
					str+='<td>'+getValues(result[i].businessCaptured)+'</td>';
					str+='<td>'+getValues(result[i].existingType)+'</td>';
					if(type == "service"){
						str+='<td>'+getValues(result[i].benificirayPeople)+'</td>';
						str+='<td>'+getValues(result[i].benficiary)+'</td>';
					}
					str+='<td>'+getValues(result[i].status)+'</td>';		
					if(result[i].targetDate !=null && typeof result[i].targetDate !=='undefined' && result[i].targetDate !='undefined'){
						str+='<td>'+getValues(result[i].targetDate)+'</td>';
					}else{
						str+='<td>-</td>';
					}
					
				str+='</tr>';
			}				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+type.replace(/\s+/g, '')+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"order": [ 0, 'asc' ],
		"retrieve": true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		"aLengthMenu": [[15, 20, 25, -1], [15, 20, 25, "All"]],
		buttons: [
			{
				extend		:'csvHtml5',
				text		:'<i class="fa fa-file-text-o"></i>',
				titleAttr	: 'CSV',
				title		:  "Epragathi DASHBOARD",
				filename	:  'Epragathi_'+type.replace(/\s+/g, '')+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}

function getOverAllDatabyCategory(type,divId){
	$("#"+divId).html(spinner);
	var json={	
	pType: type			
	}
	$.ajax({
		type:'POST',
		url:'getOverAllDatabyCategory',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result){
			if(type == "framework"){
				buildFrameWorksDetails(result,type,divId);
			}else{
				buildOverAllDatabyCategory(result,type,divId);
			}
			
				
		} else {
			$("#"+divId).html("NO DATA AVAILABLE");
		}
	})
}
function buildOverAllDatabyCategory(result,type,divId){
	var str='';
	var count=0;
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_default" id="'+type.replace(/\s+/g, '')+'DataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>S.No.</th>';
					str+='<th>Department Name</th>';
					if(type== "core Dashboard"){
						str+='<th>Sub Department / Office</th>';
						str+='<th>Core Dashboard Priority</th>';
						str+='<th>Dept. Interaction</th>';
						str+='<th>Core Dashboard Progress</th>';
					}if(type== "datalytics" || type== "localization"){
						str+='<th>Status</th>';
					}
					if(type == "localization"){
						str+='<th>URL</th>';
					}										
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				count= count+1;
				str+='<tr>';
					str+='<td class="text-center">'+count+'</td>';
					str+='<td style="text-align: left !important;">'+getValues(result[i].departmentName)+'</td>';
					if(type== "core Dashboard"){
						str+='<td style="text-align: left !important;">'+getValues(result[i].name)+'</td>';
						str+='<td>'+getValues(result[i].dashboardPriority)+'</td>';
						str+='<td>'+getValues(result[i].deptInteraction)+'</td>';
						str+='<td>'+getValues(result[i].dashboardProgress)+'</td>';
					}if(type== "datalytics" || type== "localization"){
						str+='<td>'+getValues(result[i].status)+'</td>';		
					}if(type == "localization"){
						str+='<td style="text-align: left !important;"><a href="'+result[i].urlName+'" target="_blank">'+getValues(result[i].urlName)+'</a></td>';
					}
				str+='</tr>';
			}				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+type.replace(/\s+/g, '')+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"order": [ 0, 'asc' ],
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		"aLengthMenu": [[15, 20, 25, -1], [15, 20, 25, "All"]],
		buttons: [
			{
				extend		:'csvHtml5',
				text		:'<i class="fa fa-file-text-o"></i>',
				titleAttr	: 'CSV',
				title		:  "Epragathi DASHBOARD",
				filename	:  'Epragathi_'+type.replace(/\s+/g, '')+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function buildFrameWorksDetails(result,type,divId){
	var str = '';
	var count=0;
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_default" id="'+type.replace(/\s+/g, '')+'DataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">S.NO.</th>';
					str+='<th rowspan="2">Framework</th>';
					for(var i in result[0].subList){
						str+='<th colspan="2">'+result[0].subList[i].name+'</th>';
					}					
					str+='</tr>';					
					str+='<tr>';
					for(var i in result[0].subList){
						str+='<th>No. of Services/Apps Onboarded</th>';
						str+='<th>No. of API/Webservices</th>';
					}
					str+='</tr>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				count++;
				str+='<tr>';
					str+='<td>'+count+'</td>';
					str+='<td style="text-align: left !important;">'+result[i].name+'</td>';
					for(var j in result[i].subList){
						str+='<td>'+getValues(result[i].subList[j].serviceCount)+'</td>';
						str+='<td>'+getValues(result[i].subList[j].webServiceCount)+'</td>';
					}
				str+='</tr>';
			}				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+type.replace(/\s+/g, '')+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"order": [ 0, 'asc' ],
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		"aLengthMenu": [[15, 20, 25, -1], [15, 20, 25, "All"]],
		buttons: [
			{
				extend		:'csvHtml5',
				text		:'<i class="fa fa-file-text-o"></i>',
				titleAttr	: 'CSV',
				title		:  "Epragathi DASHBOARD",
				filename	:  'Epragathi_'+type.replace(/\s+/g, '')+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function getValues(value){
	var type= typeof value;	
	if(type == "string"){
		if(value == null || value.length == 0){
			value = "-";
		}
	}else if(type == "number"){
		if(value == null || value == 0){
			value = "-";
		}
	}else if(type == "undefined"){
		value = "-";
	}		
	return value;
}

