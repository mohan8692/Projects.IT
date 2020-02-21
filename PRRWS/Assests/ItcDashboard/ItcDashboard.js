var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var smallSpinner='<i class="fa fa-spinner fa-spin" ></i>';
var orgChart = '';
//var departmentWiseArr=[{name:'Promotions',id:'1',color:'#0D3B54',image:'promotions',blockName:'promotions'},{name:'E Office',id:'2',color:'#1394B9',image:'eOffice',blockName:'eOffice'},{name:'Meeseva & SLA',id:'3',color:'#638D00',image:'meeseva',blockName:'meesevaSla'},{name:'Meeseva & KPI',id:'4',color:'#9B7A00',image:'meesevaHigh',blockName:'meesevaKpi'},{name:'eProcurement',id:'5',color:'#F06C1F',image:'eProcurement',blockName:'eProcurement'},{name:'CM eoDB',id:'6',color:'#C02D1D',image:'cMeoDB',blockName:'cMeoDB'}];

var departmentWiseArr = [{name:'e Office',id:'2',color:'#1394B9',image:'eOffice',blockName:'eOffice'},{name:'Meeseva - SLA/KPI',id:'3',color:'#638D00',image:'meeseva',blockName:'meesevaSlaKpi'},{name:'AP Innovation Society',id:'7',color:'#F06C1F',image:'apInnovationSociety',blockName:'apInnovationSociety'},{name:'CM EODB',id:'6',color:'#C02D1D',image:'cMeoDB',blockName:'cMeoDB'},{name:'Bio-Metric',id:'8',color:'#9B7A00',image:'BioMetric',blockName:'BioMetric'},{name:'AP Digital Literacy',id:'10',color:'#FFBA00',image:'digitalLiteracy',blockName:'APDigitalLiteracy'},{name:'D T P',id:'11',color:'#274662',image:'DTP-Logo',blockName:'DTP'},{name:'APITA',id:'12',color:'#008077',image:'icon-APITA',blockName:'APITA'},{name:'E-PRAGATI',id:'13',color:'#63B0FB',image:'e-pragathi',blockName:'EPRAGATI'}];

var globalFromDateSLA = moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY");
var globalToDateSLA = moment().format("DD/MM/YYYY");

var globalFromDateKPI ="2018-04-01";
var globalToDateKPI = "2019-03-31";

var globalFromDate = moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY");
var globalToDate = moment().format("DD/MM/YYYY");

var globalFromDateAPI=moment().subtract(15, 'years').startOf('year').format("DD/MM/YYYY");
var globalToDateAPI=moment().format("DD/MM/YYYY");

var globalDeptCode = "27001701024";
$(document).on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){	
	$(".menu-data-cls").hide();	
	
});
/*$(document).on('cut copy paste', function (e) {
	e.preventDefault();
});*/
$(document).on("click","#promotionsBlockSwitch li",function(){	
	$("#promotionsBlockSwitch li").removeClass("active");
	$(this).addClass("active");
	var typeOfBlock = $(this).attr("attr_type");
	if(typeOfBlock != 'Total')
	{
		$("[promotions]").hide();
		$("[promotions="+typeOfBlock+"]").show();
	}else{
		$("[promotions]").show();
	}
	//getITSectorWiseOverviewDetails();
	//getITSectorCategoryWiseDetails("RED",typeOfBlock);
	//getITSectorCategoryWiseDetails("GREEN",typeOfBlock);
	//getITSectorCategoryWiseDetails("DROPPED",typeOfBlock);
	//getITSectorLeadCategoryWiseDetails("RED",typeOfBlock);
	//getITSectorLeadCategoryWiseDetails("GREEN",typeOfBlock);
	//getITSectorLeadCategoryWiseDetails("DROPPED",typeOfBlock);
});
function highcharts(id,type,data,plotOptions,title,tooltip,legend){
	'use strict';
	$('#'+id).highcharts({
		chart: type,
		title: title,
		tooltip:tooltip,
		subtitle: {
			text: null
		},
		plotOptions: plotOptions,
		legend:legend,
		series: data
	});
}
onloadCalls();
function onloadCalls(){
	if(searchParams == null)
	{
		departmentBlockWiseDetails("eOffice");
		
	}else{
		departmentBlockWiseDetails(searchParams);
	}
	
	departmentWiseOverView();
	//getITSectorWiseOverviewDetails();
	//getMeesevaSLAOverviewDtls("meesevaSla",5);
	getMeesevaSLACatWiseAbstarctDetails("meesevaSla",5,"onload")
	getMeesevaKPIOverViewDetails("onload","","");
	
	//AP Innovation Society Ajax Call Start
	//getAPInnovationSocietyOverviewHtml(divId.replace(/\s+/g, '')+'Block'+levelWiseBlockArr[i].id)
	//getAPInnovationSocietyOverview('onload','apInnovationSociety');
	getCompleteOverviewForAPIS('onLoad','apInnovationSociety');
	getEOfcDepartWiseOverviewDetails('onload');
	getCMEDOBOverview("","","overview");
	getBioMetricDashboardOverViewDtls();
	getAPDigitalLiteracyDetails('APDigitalLiteracy','onload');
	getDeveloperOrITCompanyPropertyOverviewDetails("getDeveloperPropertyOverviewDetails","DEVELOPERS");//DTP
	getTrainingAndPlacementOverViewDetails();
	getEpragatiModulesData();
}
$(document).on("click",".cohortIdClick",function(){
	$("#modalId").modal('show');
	var id = $(this).attr("attr_id");
	getCohortDetailsByCohortId(id);
});
function departmentWiseOverView(){
	var block='';
	block+='<ul class="list-inline blockWiseSliderCls">';
	for(var i in departmentWiseArr){
		if(departmentWiseArr[i].id ==8){
			block+='<li class="m_top10 biometricTextAlign">';
					if(searchParams == null)
					{
						block+='<a href="bioMetricDashBoard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
					}else{
						if(searchParams == departmentWiseArr[i].blockName)
						{
							block+='<a href="bioMetricDashBoard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="active block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
						}else{
							block+='<a href="bioMetricDashBoard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
						}
					}
					block+='<div class="media">';
						block+='<div class="media-left">';
							block+='<img src="Assests/icons/ITC/'+departmentWiseArr[i].image+'.png" class="media-object" style="height:20px;width:20px;">';
						block+='</div>';
						block+='<div class="media-body">';
							block+='<h5><b>'+departmentWiseArr[i].name+'</b></h5>';
						block+='</div>';
					block+='</div>';	
					
					block+='<div class="m_top20">';
						block+='<h3 id="bioMetricBlockId"></h3>';
						block+='<h6 class="m_top10">TotalEmployee/Present</h6>';
					block+='</div>';
					
				block+='</div></a>';
			block+='</li>';
		}else if(departmentWiseArr[i].id ==11){
			block+='<li class="m_top10 biometricTextAlign">';
					if(searchParams == null)
					{
						block+='<a href="itMinisterDashboard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
					}else{
						if(searchParams == departmentWiseArr[i].blockName)
						{
							block+='<a href="itMinisterDashboard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="active block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
						}else{
							block+='<a href="itMinisterDashboard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
						}
					}
					block+='<div class="media">';
						block+='<div class="media-left">';
							block+='<img src="Assests/icons/ITC/'+departmentWiseArr[i].image+'.png" class="media-object" style="height:20px;width:41px;">';
						block+='</div>';
						block+='<div class="media-body">';
							block+='<h5><b>'+departmentWiseArr[i].name+'</b></h5>';
						block+='</div>';
					block+='</div>';	
					
					block+='<div class="m_top20" style="height:50px;">';
						block+='<h3 class="DTPAllCls"></h3>';
						block+='<h6 class="m_top5">DEV&nbsp;/&nbsp;IT&nbsp;COM<br/>IN-PROGRESS&nbsp;,PENDING</h6>';
					block+='</div>';
					
				block+='</div></a>';
			block+='</li>';
		}else if(departmentWiseArr[i].id ==12){
			block+='<li class="m_top10 biometricTextAlign">';
					if(searchParams == null)
					{
						block+='<a href="APITADashboard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
					}else{
						if(searchParams == departmentWiseArr[i].blockName)
						{
							block+='<a href="APITADashboard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="active block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
						}else{
							block+='<a href="APITADashboard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
						}
					}
					block+='<div class="media">';
						block+='<div class="media-left">';
							block+='<img src="Assests/icons/ITC/'+departmentWiseArr[i].image+'.png" class="media-object" style="height:20px;width:41px;">';
						block+='</div>';
						block+='<div class="media-body">';
							block+='<h5><b>'+departmentWiseArr[i].name+'</b></h5>';
						block+='</div>';
					block+='</div>';	
					
					block+='<div class="m_top20" style="height:50px;">';
						block+='<h3 class="APITAAllCls"></h3>';
						block+='<h6 class="m_top5">REGISTERED/PLACEDSTUDENTS</h6>';
					block+='</div>';
					
				block+='</div></a>';
			block+='</li>';
		}
		else if(departmentWiseArr[i].id ==13){
			block+='<li class="m_top10 biometricTextAlign">';
					if(searchParams == null)
					{
						block+='<a href="epragathiDashBoard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
					}else{
						if(searchParams == departmentWiseArr[i].blockName)
						{
							block+='<a href="epragathiDashBoard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="active block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
						}else{
							block+='<a href="epragathiDashBoard"  target="_blank"><div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer;color: #ffffff;padding: 10px;" class="block_style_ITC" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
						}
					}
					block+='<div class="media">';
						block+='<div class="media-left">';
							block+='<img src="Assests/icons/ITC/'+departmentWiseArr[i].image+'.png" class="media-object" style="height:20px;width:41px;">';
						block+='</div>';
						block+='<div class="media-body">';
							block+='<h5><b>'+departmentWiseArr[i].name+'</b></h5>';
						block+='</div>';
					block+='</div>';	
					
					block+='<div class="m_top20" style="height:50px;">';
						block+='<h3 class="EPRAGATIAllCls"></h3>';
						block+='<h6 class="m_top5">PRODUCTION/TOTAL</h6>';
					block+='</div>';
					
				block+='</div></a>';
			block+='</li>';
		}
		else{
			block+='<li class="m_top10">';
				if(searchParams == null)
				{
					if(i == 0)
					{
						block+='<div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer" class="active block_style_ITC blockWiseDetails" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
					}else{
						block+='<div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer" class="block_style_ITC blockWiseDetails" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
					}
				}else{
					if(searchParams == departmentWiseArr[i].blockName)
					{
						block+='<div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer" class="active block_style_ITC blockWiseDetails" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
					}else{
						block+='<div style="background-color:'+departmentWiseArr[i].color+';cursor:pointer" class="block_style_ITC blockWiseDetails" main-block="'+departmentWiseArr[i].blockName+'" attr_block_name="'+departmentWiseArr[i].blockName+'">';
					}
				}
				
				
						block+='<div class="media">';
							block+='<div class="media-left">';
								block+='<img src="Assests/icons/ITC/'+departmentWiseArr[i].image+'.png" class="media-object" style="height:20px;width:20px;">';
								
							block+='</div>';
							block+='<div class="media-body">';
							block+='<h5><b>'+departmentWiseArr[i].name+'</b></h5>';
							if(departmentWiseArr[i].id ==3){
								//block+='<h6 style="font-size:8px;color:#d3d3d3;">Department & District Wise SLA Monitoring</h6>';
							}else if(departmentWiseArr[i].id ==4){
								block+='<h6 style="font-size:8px;color:#d3d3d3;">Highest Performance</h6>';
							}
						  block+='</div>';
						block+='</div>';
						if(departmentWiseArr[i].id ==1){
							block+='<div class="m_top20">';
								block+='<h3 id="promotionsHeadingId">10,301.43 Cr</h3>';
								block+='<h6>Committed Investment</h6>';
							block+='<h6>(IT,E&F)</h6>';
							block+='</div>';
						}else if(departmentWiseArr[i].id ==2){
							block+='<div class="m_top20">';
								block+='<h3 id="itcDeptWiseCount"></h3>';
								block+='<h6 class="m_top10">Total Pendency</h6>';
							block+='</div>';
						}else if(departmentWiseArr[i].id ==3){
							block+='<div class="m_top20">';
								block+='<h6 class="m_top10">Beyond SLA <span id="meesevaHeadingId" class="pull-right" style="font-size: 18px;"></span> </h6>';
								block+='<h6 class="m_top20">eTaal - KPI <span id="meesevaKPIHeadingId" class="pull-right" style="font-size: 18px;"></span> </h6>';
							block+='</div>';
						}else if(departmentWiseArr[i].id ==4){
							block+='<div class="m_top20">';
								block+='<h3>3499</h3>';
								block+='<h6 class="m_top10">eTaal - KPI</h6>';
							block+='</div>';
						}else if(departmentWiseArr[i].id ==5){
							block+='<div class="m_top20">';
								block+='<h3>11,25.Cr</h3>';
								block+='<h6 class="m_top10">IT&E Department Tenders</h6>';
							block+='</div>';
						}else if(departmentWiseArr[i].id ==6){
							block+='<div class="m_top5">';
								block+='<h4 id="cMeoDBTotalId"></h4>';
								block+='<h3 id="cMeoDBApprovedId"></h3>';
								block+='<h6 class="m_top10">Total / Approved</h6>';
							block+='</div>';
						}else if(departmentWiseArr[i].id ==7){
							block+='<div class="m_top20">';
								block+='<h3 id="apInnovationSociety"></h3>';
								block+='<h6 class="m_top10">Startups</h6>';
							block+='</div>';
						}else if(departmentWiseArr[i].id ==10){
							block+='<div class="m_top20" style="height:50px;">';
								block+='<h3 id="APDigitalLiteracy"></h3>';
								block+='<h6 class="m_top10">OverAllRegistered/FailedStudents</h6>';
							block+='</div>';
						}
				block+='</div>';
			block+='</li>';
		}
		
	}
	block+='</ul>';
	$("#departmentWiseDivId").html(block);
	$('.blockWiseSliderCls').slick({
		slide: 'li',
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: false,
		//autoplaySpeed: 2000,
		variableWidth:false,
		responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2
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
$(document).on('click','.blockWiseDetails',function(){
	$(".blockWiseDetails").removeClass("active");
	$(this).addClass("active");
	$("#campusOverviewBlock,#APISXLr8APOverview,#campaignsOverviewBlock").html("");
	var blockName = $(this).attr("attr_block_name");
	departmentBlockWiseDetails(blockName);	
});

$(document).on('click','#droppedShowHideId',function(){
	$(".droppedClass").toggle();
});

function departmentBlockWiseDetails(divId)
{
	var levelWiseBlockArr='';
	/*if(divId == "promotions"){
		
		levelWiseBlockArr=[{name:'Promotions',id:'1'}]//,{name:'Electronics',id:'2'},{name:'FinTech',id:'3'}];
		
	}else*/ if(divId == "eOffice"){
		
		levelWiseBlockArr=[{name:'e Office',id:'4'}];
		
	}else if(divId == "meesevaSlaKpi"){
		
		levelWiseBlockArr=[{name:'Meeseva-SLA/KPI',id:'5'}];//
		
	}else if(divId == "meesevaKpi"){
		
		levelWiseBlockArr=[{name:'Meeseva & KPI',id:'6'}];
		
	}else if(divId == "eProcurement"){
		levelWiseBlockArr = [{name:'eProcurement',id:'7'}];
		
	}else if(divId == "cMeoDB"){
		
		levelWiseBlockArr = [{name:'CM EODB',id:'8'}];
	}else if(divId == "apInnovationSociety"){
		
		levelWiseBlockArr = [{name:'AP Innovation Society',id:'9'}];
	}else if(divId == "APDigitalLiteracy"){
		
		levelWiseBlockArr = [{name:'AP Digital Literacy',id:'10'}];
	}
	
	var collapse='';
		for(var i in levelWiseBlockArr)
		{
			collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" role="tablist" aria-multiselectable="true">';
				collapse+='<div class="panel panel-default panel-black">';
					collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+levelWiseBlockArr[i].id+'">';
						if(i == 0)
						{
							collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" href="#collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'">';
						}else{
							collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" href="#collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'">';
						}
						
						collapse+='<h4 class="panel-title">'+levelWiseBlockArr[i].name+' Overview</h4>';
							
						collapse+='</a>';
					collapse+='</div>';
					if(i == 0)
					{
						collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'">';
					}else{
						collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'">';
					}
					
						collapse+='<div class="panel-body">';
							
							/* if(divId == 'apInnovationSociety')
							{
								collapse+='<h4 style="margin-bottom:20px">Applications Received</h4>';
							} */
							if(divId == 'eOffice')
							{
								collapse+='<div class="row">';
										collapse+='<div id="eOfficeDeparmentsOverViewBlock"></div>';
								collapse+='</div>';
								
								collapse+='<div class="row m_top10">';
									collapse+='<div class="col-sm-12">';
										collapse+='<div id="hieraricalShowHideDiv"></div>';
									collapse+='</div>';	
								collapse+='</div>';
								
								collapse+='<div class="row m_top10">';
									collapse+='<div class="col-sm-12">';
										collapse+='<div id="hieraricalViewErr"></div>';
										collapse+='<div id="hieraricalView"></div>';
									collapse+='</div>';
								collapse+='</div>';
							}
							/*if(divId == "promotions")
							{
								collapse+='<div class="row">';
									collapse+='<div class="col-sm-12">';
										collapse+='<iframe class="embed-responsive-item" width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background:#FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiNzgxZTkxMDctNjI2My00YTk3LTg4ZTctMWM1YTZjNzQyNTNiIiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>';
									collapse+='</div>';
								collapse+='</div>';	
								
								collapse+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
								  collapse+='<div class="panel panel-default panel-black">';
									collapse+='<div class="panel-heading" role="tab" id="headingOne">';
									  collapse+='<h4 class="panel-title">';
										collapse+='<a class="panelCollapseIcon collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" attr_type="frame2">';
										 collapse+='<h4>Company Investment & Employeement Details</h4>';
										collapse+='</a>';
									  collapse+='</h4>';
									collapse+='</div>';
									collapse+='<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">';
									  collapse+='<div class="panel-body">';
										collapse+='<div class="row">';
											collapse+='<div id="frame2DivID"></div>';
											
										collapse+='</div>';
									  collapse+='</div>';
									collapse+='</div>';
								 collapse+='</div>';
								  collapse+='<div class="panel panel-default panel-black">';
									collapse+='<div class="panel-heading" role="tab" id="headingTwo">';
									 collapse+='<h4 class="panel-title">';
										collapse+='<a class="collapsed panelCollapseIcon" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" attr_type="frame3">';
										  collapse+='<h4>Company Employee Duration Details</h4>';
										collapse+='</a>';
									  collapse+='</h4>';
									collapse+='</div>';
									collapse+='<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">';
									  collapse+='<div class="panel-body">';
										collapse+='<div class="row">';
											collapse+='<div id="frame3DivID"></div>';
										collapse+='</div>';
									  collapse+='</div>';
									collapse+='</div>';
								  collapse+='</div>';
								 collapse+='<div class="panel panel-default panel-black">';
									collapse+='<div class="panel-heading" role="tab" id="headingThree">';
									  collapse+='<h4 class="panel-title">';
										collapse+='<a class="collapsed panelCollapseIcon" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree" attr_type="frame4">';
										   collapse+='<h4 class="panel-tit1e">Information Lead Details</h4>';
										collapse+='</a>';
									  collapse+='</h4>';
									collapse+='</div>';
									collapse+='<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">';
									  collapse+='<div class="panel-body">';
										collapse+='<div class="row">';
											collapse+='<div id="frame4DivID"></div>';
										collapse+='</div>';
									  collapse+='</div>';
									collapse+='</div>';
								  collapse+='</div>';
								collapse+='</div>';
								
								/* collapse+='<div class="row">';
									collapse+='<div class="col-sm-12">';
										collapse+='<div class="row">';
											collapse+='<div class="col-sm-7">';
												collapse+='<h4>INFORMATION TECHNOLOGY ELECTRONICS AND COMMUNICATION OVERVIEW</h4>';
												collapse+='<hr/>';
											collapse+='</div>';
											collapse+='<div class="col-sm-3">';
												collapse+='<ul class="list-inline switch-btn" id="promotionsBlockSwitch">';
													collapse+='<li class="active" attr_type="Total">ALL</li>';
													collapse+='<li attr_type="Electronics">Electronics</li>';
													collapse+='<li attr_type="Fintech">Fintech</li>';
													collapse+='<li attr_type="IT">IT</li>';
												collapse+='</ul>';
											collapse+='</div>';
											collapse+='<div class="col-sm-2" id="">';
												collapse+='<i class="glyphicon glyphicon-download pull-right" id="addIcon" aria-hidden="true" style="cursor:pointer;font-size:35px;display:none;"></i>';
												collapse+='<div class="col-sm-12" id="promotionsStageDroppedBlockId" style="display:none;"></div>';
												collapse+='<div class="col-sm-12" id="promotionsStageDroppedBlockId1" style="display:none;"></div>';
											collapse+='</div>';
										collapse+='</div>';
									
									collapse+='</div>';
									collapse+='<div class="col-sm-3" id="promotionsTotalBlockId"></div>';
									collapse+='<div class="col-sm-4" id="">';
										collapse+='<div class="col-sm-12" id="promotionsStageGreenBlockId"></div>';
										collapse+='<div class="col-sm-12" id="promotionsStageGreenBlockId1"></div>';
									collapse+='</div>';
									collapse+='<div class="col-sm-4" id="">';
										collapse+='<div class="col-sm-12" id="promotionsStageRedBlockId"></div>';
										collapse+='<div class="col-sm-12" id="promotionsStageRedBlockId1"></div>';
									collapse+='</div>';
									collapse+='<div class="col-sm-12">';
										collapse+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
										var	levelWiseBlockArrPromotions =[{name:'IT',id:'1'},{name:'Electronics',id:'2'},{name:'Fintech',id:'3'}];
										for(var l in levelWiseBlockArrPromotions)
										{
											collapse+='<div class="panel panel-default m_top20" promotions="'+levelWiseBlockArrPromotions[l].name+'">';
												collapse+='<div class="panel-heading" role="tab" id="headingOne'+levelWiseBlockArrPromotions[l].name+'">';
													collapse+='<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+levelWiseBlockArrPromotions[l].name+'" aria-expanded="true" aria-controls="collapseOne'+levelWiseBlockArrPromotions[l].name+'">';
														collapse+='<h4 class="panel-title">'+levelWiseBlockArrPromotions[l].name+' Overview</h4>';
													collapse+='</a>';
												collapse+='</div>';
												collapse+='<div id="collapseOne'+levelWiseBlockArrPromotions[l].name+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne'+levelWiseBlockArrPromotions[l].name+'">';
													collapse+='<div class="panel-body">';
														collapse+='<div id="'+levelWiseBlockArrPromotions[l].name+'OverviewBlockCheckBoxId"></div>';
														collapse+='<div id="'+levelWiseBlockArrPromotions[l].name+'OverviewBlockDivId" class="m_top20"></div>';
													collapse+='</div>';
												collapse+='</div>';
											collapse+='</div>';
										}													
											
										collapse+='</div>';
									collapse+='</div>';
								collapse+='</div>'; 
							}*/
							if(divId == "cMeoDB")
							{
								collapse+='<div class="row">';	
									collapse+='<div class="col-sm-12">';
											collapse+='<ul class="list-inline pull-right">';
												  collapse+='<div class="input-group">';
													collapse+='<span class="input-group-addon">';
														collapse+='<i class="glyphicon glyphicon-calendar"></i>';
													collapse+='</span>';
													collapse+=' <input type="text" class="form-control" id="itcDateRangePickerId" style="width: 200px;"/>';
												collapse+=' </div>';
											collapse+='</ul>';
										collapse+='</div>';
									collapse+='</div>';
								
								collapse+='<div class="row m_top10">';	
									collapse+='<div class="col-sm-4">';
										collapse+='<div id="cmedobBlockMainDivId"></div>';
									collapse+='</div>';
									collapse+='<div class="col-sm-4">';
										collapse+='<div id="cmedobSectorWiseInformationId"></div>';
									collapse+='</div>';
									collapse+='<div class="col-sm-4">';
										collapse+='<div id="cmedobSectorWiseElectronicSectorId"></div>';
									collapse+='</div>';
								collapse+='</div>';
									
								/* collapse+='<div class="row">';	
									collapse+='<div class="col-sm-12 m_top10">';
										collapse+='<div id="cmedobSectorWiseStatusId"></div>';
									collapse+='</div>';
								collapse+='</div>';
								
								collapse+='<div class="row" style="margin-bottom:50px;">';
									collapse+='<div class="col-sm-12 m_top10" style="margin-bottom: 20px; padding-left: 0px; padding-right: 0px;">';
										collapse+='<div id="cmedobBlockMainDivId"></div>';
									collapse+='</div>';	
								collapse+='</div>'; */
								collapse+='<div class="row m_top20">';
									collapse+='<div class="col-sm-12">';
										collapse+='<div id="cmedobDepartmentBlockMainDivId"></div>';
									collapse+='</div>';	
								collapse+='</div>';
								collapse+='<div class="row m_top20" style="margin-top:60px;">';
									collapse+='<div class="col-sm-3">'
										collapse+='<h4><b>IT & E &nbsp Sector Wise Status Report</b></h4>';
									collapse+='</div>';
									collapse+='<div class="col-sm-4">'
										collapse+='<div class="form-group form-inline">';
										collapse+='<label class="col-sm-2  control-label" for="Sector" style="margin-top: 6px;">Sector: </label>';
												collapse+='<select class="form-control chosenSelect" id="sectorSelId">';
													collapse+='<option value="B">All</option>';
													collapse+='<option value="E">Electronics</option>';
													collapse+='<option value="I">Information Technology</option>';;
												collapse+='</select>';
										collapse+='</div>';
									collapse+='</div>';
									
								collapse+='</div>';
								
								collapse+='<div class="row">';
									collapse+='<div id="cmedobDivId"></div>';
								collapse+='</div>';
							}
							if(divId == "meesevaSlaKpi"){
								collapse+='<div class="row meeSevaDetailsCls">';
									collapse+='<div class="col-sm-1 m_top5 pull-right">';
										collapse+='<h5 class="blink_me newServicesClass" style =" cursor:pointer; width:100px;margin-left: -10px;">New&nbspServices</h5>';
									collapse+='</div>'; 
									collapse+='<div class="col-sm-11">';
										collapse+='<ul class="list-inline switch-btn pull-right meesevaSlaKpiCls">';
											collapse+='<li class="active" attr_type="meesevaSla">SLA</li>';
											collapse+='<li attr_type="meesevaKpi">KPI</li>';
										collapse+='</ul>';
									collapse+='</div>';
								collapse+='</div>';
							}
							/* if(divId == "APDigitalLiteracy"){
								collapse+='<div class="row m_top20">';
									collapse+='<div class="col-sm-12">';
										collapse+='<div id=""></div>';
									collapse+='</div>';	
								collapse+='</div>';
							} */
							collapse+='<div class="meeSevaDetailsCls" id="'+divId.replace(/\s+/g, '')+'Block'+levelWiseBlockArr[i].id+'"></div>';
							
							if(divId == 'apInnovationSociety'){
							 collapse+='<section style="background-color:#fff !important;">';
								collapse+='<div class="container-fluid">';
								collapse+='<div class="">';
								collapse+='<div class="row">';
									collapse+='<div class="col-sm-12">				';
								collapse+='<div class="pad_15 border_yash" style="background-color:#F5F5F5;">';
								collapse+='<div class="tableResponce">';
								collapse+='<div class="li_blocks">';
									collapse+='<ul class="list-inline blocksCls">';
									collapse+='<li>';
										collapse+='<div class="custom-div">';
											collapse+='<div class="media">';
												collapse+='<div class="media-left">';
													collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2294.png"  />';
													collapse+='</div>';
													collapse+='<div class="media-body text-center">';
													collapse+='<h5 class="font_weight" style="font-size:small">Startups</h5>';
													collapse+='<h4 class="text-success font_weight spinnerCls m_top20" id="startupsId"></h4>';
												collapse+='</div>';
											collapse+='</div>';
										collapse+='</div>';
									collapse+='</li>';
									collapse+='<li>';
										collapse+='<div class="custom-div">';
											collapse+='<div class="media">';
												collapse+='<div class="media-left">';
												collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2590.png"/>';
												collapse+='</div>';
												collapse+='<div class="media-body text-center">';
												collapse+='<h5 class="font_weight" style="font-size:small">Accelerators</h5>';
												collapse+='<h4 class="text-success font_weight spinnerCls m_top20" id="acceleratorsId"></h4>';
												collapse+='</div>';
											collapse+='</div>';
										collapse+='</div>';
									collapse+='</li>';
									collapse+='<li>';
										collapse+='<div class="custom-div">';
											collapse+='<div class="media">';
												collapse+='<div class="media-left">';
												collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2592.png" />';
												collapse+='</div>';
												collapse+='<div class="media-body text-center">';
												collapse+='<h5 class="font_weight" style="font-size:small">Incubators</h5>';
												collapse+='<h4 class="text-success font_weight spinnerCls m_top20" id="incubatorsId"></h4>';
												collapse+='</div>';
											collapse+='</div>';
										collapse+='</div>';
									collapse+='</li>';
									collapse+='<li>';
										collapse+='<div class="custom-div">';
											collapse+='<div class="media">';
												collapse+='<div class="media-left">';
												collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2594.png"/>';
												collapse+='</div>';
												collapse+='<div class="media-body text-center">';
												collapse+='<h5 class="font_weight" style="font-size:small">Enablers</h5>';
												collapse+='<h4 class="text-success font_weight spinnerCls m_top20" id="enablersId"></h4>';
												collapse+='</div>';
											collapse+='</div>';
										collapse+='</div>';
									collapse+='</li>';
									collapse+='<li>';
										collapse+='<div class="custom-div">';
											collapse+='<div class="media">';
												collapse+='<div class="media-left">';
												collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2626.png"/>';
												collapse+='</div>';
												collapse+='<div class="media-body text-center">';
												collapse+='<h5 class="font_weight" style="font-size:small">Mentors</h5>';
												collapse+='<h4 class="text-success font_weight spinnerCls m_top20" id="mentorsId"></h4>';
												collapse+='</div>';
											collapse+='</div>';
										collapse+='</div>';
									collapse+='</li>';
									collapse+='<li>';
										collapse+='<div class="custom-div">';
											collapse+='<div class="media">';
												collapse+='<div class="media-left">';
												collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2598.png"/>';
												collapse+='</div>';
												collapse+='<div class="media-body text-center">';
												collapse+='<h5 class="font_weight" style="font-size:small">Activities Completed</h5>';
												collapse+='<h4 class="text-success font_weight spinnerCls m_top10" id="activitiesId"></h4>';
												collapse+='</div>';
											collapse+='</div>';
										collapse+='</div>';
									collapse+='</li>';
									collapse+='<li>';
										collapse+='<div class="custom-div">';
											collapse+='<div class="media">';
												collapse+='<div class="media-left">';
												collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2598.png"/>';
												collapse+='</div>';
												collapse+='<div class="media-body text-center">';
												collapse+='<h5 class="font_weight" style="font-size:small" >Activities Upcoming</h5>';
												collapse+='<h4 class="text-success font_weight spinnerCls m_top10" id="activitiesUpComingId"></h4>';
											   collapse+='</div>';											
										    collapse+='</div>';
									    collapse+='</div>';
								    collapse+='</li>';
								collapse+='</ul>';
								collapse+='<ul class="list-inline blocksCls" style="top:5px !important;">';
								collapse+='<li>';
								collapse+='<div class="custom-div m_top10">';
								collapse+='<div class="media">';
								collapse+='<div class="media-left">';
								collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2604.png"/>';
								collapse+='</div>';
								collapse+='<div class="media-body text-center">';
								collapse+='<h5 class="font_weight" style="font-size:small">VC & Angel Investors</h5>';
								collapse+='<h4 class="text-success font_weight spinnerCls m_top10" id="vCAngInvestId"></h4>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</li>';
								collapse+='<li>';
								collapse+='<div class="custom-div">';
								collapse+='<div class="media">';
								collapse+='<div class="media-left">';
								collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2606.png"/>';
								collapse+='</div>';
								collapse+='<div class="media-body text-center">';
								collapse+='<h5 class="font_weight" style="font-size:small">Industry Collaborations</h5>';
								collapse+='<h4 class="text-success font_weight spinnerCls m_top10" id="industCollId"></h4>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</li>';
								collapse+='<li>';
								collapse+='<div class="custom-div">';
								collapse+='<div class="media">';
								collapse+='<div class="media-left">';
								collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2608.png"/>';
								collapse+='</div>';
								collapse+='<div class="media-body text-center">';
								collapse+='<h5 class="font_weight" style="font-size:small">Atal Tinkering Labs</h5>';
								collapse+='<h4 class="text-success font_weight spinnerCls m_top10" id="atalTinkerLabsId"></h4>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</li>';
								collapse+='<li>';
								collapse+='<div class="custom-div">';
								collapse+='<div class="media">';
								collapse+='<div class="media-left">';
								collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2610.png"/>';
								collapse+='</div>';
								collapse+='<div class="media-body text-center">';
								collapse+='<h5 class="font_weight" style="font-size:small">EDC</h5>';
								collapse+='<h4 class="text-success font_weight spinnerCls m_top30" id="edcId"></h4>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</li>';
								collapse+='<li>';
								collapse+='<div class="custom-div">';
								collapse+='<div class="media">';
								collapse+='<div class="media-left">';
								collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2612.png"/>';
								collapse+='</div>';
								collapse+='<div class="media-body text-center">';
								collapse+='<h5 class="font_weight" style="font-size:small">Employment Generation</h5>';
								collapse+='<h4 class="text-success font_weight spinnerCls m_top10" id="empGenId"></h4>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</li>';
								collapse+='<li>';
								collapse+='<div class="custom-div">';
								collapse+='<div class="media">';
								collapse+='<div class="media-left">';
								collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 2600.png"/>';
								collapse+='</div>';
								collapse+='<div class="media-body text-center">';
								collapse+='<h5 class="font_weight" style="font-size:small">Revenue Generation</h5>';
								collapse+='<h4 class="text-success font_weight spinnerCls m_top10" id="revGenId"></h4>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</li>';
								collapse+='<li>';
								collapse+='<div class="custom-div">';
								collapse+='<div class="media">';
								collapse+='<div class="media-left">';
								collapse+='<img class= "inno_img" src="Assests/APInnovation/Group 3429.png"/>';
								collapse+='</div>';
								collapse+='<div class="media-body text-center">';
								collapse+='<h5 class="font_weight" style="font-size:small">Leads</h5>';
								collapse+='<h4 class="text-success font_weight spinnerCls m_top30" id="leadId"></h4>';
								collapse+='</div>';											
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</li>';
								collapse+='</ul>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="panel-group m_top10" id="accordionApInnovationStratUps" role="tablist" aria-multiselectable="true">';
								collapse+='<div class="panel panel-default panel-black m_top20">';
								collapse+='<div class="panel-heading" role="tab">		';
								collapse+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionApInnovationStratUps" href="#collapseApInnovationStratUps" aria-expanded="true" aria-controls="collapseApInnovation">		';
								collapse+='<h4 class="panel-title text-capital">Startups Profile</h4>						';
								collapse+='</a>';
								collapse+='</div>';
								collapse+='<div id="collapseApInnovationStratUps" class="panel-collapse collapse in" role="tabpanel">	';
								collapse+='<div class="panel-body">';
								collapse+='<div class="row">						';
								collapse+='<div class="col-sm-12">';
								collapse+='<div id="startUpsProfileTabId"></div>							';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="row m_top10">';
								collapse+='<div class="col-sm-9 m_top10">';
								collapse+='<div class="custom-div">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-4 m_top10">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-8">';
								collapse+='<div class="media font_weight">';
								collapse+='<div class="media-left">';
								collapse+='<i class="fa fa-rupee icon-name indRupStyCls"></i>';
								collapse+='</div>';
								collapse+='<div class="media-body">';
								collapse+='<h5 class="media-heading m_top10 font_weight">Revenue Generated</h5>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="col-sm-4 m_top10">';
								collapse+='<h5 class="font_weight startupBlcSpinner" id="revGenBlcId"></h5>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="col-sm-4 m_top5">';
								collapse+='<div class="pad_15 maroonBlc">';
								collapse+='<div class="row ">';
								collapse+='<div class="col-sm-8">';
								collapse+='<h5 class="font_weight">Incubators Startups</h5>';
								collapse+='</div>';
								collapse+='<div class="col-sm-4 ">';
								collapse+='<h5 class="font_weight startupBlcSpinner" id="incStartupsId"></h5>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="col-sm-4 m_top5">';
								collapse+='<div class="pad_15 purGreyBlc ">';
								collapse+='<div class="row ">';
								collapse+='<div class="col-sm-8">';
								collapse+='<h5 class="font_weight">Accelerators Startups</h5>';
								collapse+='</div>';
								collapse+='<div class="col-sm-4 ">';
								collapse+='<h5 class="font_weight startupBlcSpinner" id="accStartupsId"></h5>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="col-sm-3 m_top10">';
								collapse+='<div class="custom-div" style="padding: 20px;">';
								collapse+='<div class="row ">';
								collapse+='<div class="col-sm-8">';
								collapse+='<div class="media font_weight"><div class="media-left">';
								collapse+='<i class="fa fa-rupee icon-name indRupStyCls"></i></div>';
								collapse+='<div class="media-body">';
								collapse+='<h5 class="media-heading m_top10 font_weight">Fund Raised</h5>';
								collapse+='</div></div>';
								collapse+='</div>';
								collapse+='<div class="col-sm-4 ">';
								collapse+='<h5 class="font_weight startupBlcSpinner m_top10" id="funRaisedId"></h5>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div id="stageTableBlcId"></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div id="sectTableBlcId"></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>	';
								collapse+='</div>	';
								collapse+='<div class="panel-group m_top10" id="accordionApInnovationStartUpComplete" role="tablist" aria-multiselectable="true">';
								collapse+='<div class="panel panel-default panel-black">';
								collapse+='<div class="panel-heading" role="tab">		';
								collapse+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationStartUpComplete" href="#collapseApInnovationStartUp" aria-expanded="true" aria-controls="collapseApInnovationStartUp">		';
								collapse+='<h4 class="panel-title text-capital">startups complete  information</h4>						';
								collapse+='</a>';
								collapse+='</div>';
								collapse+='<div id="collapseApInnovationStartUp" class="panel-collapse collapse" role="tabpanel">	';
								collapse+='<div class="panel-body">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<ul class="nav nav-tabs ulTabStyleCls alltypeClsClc" role="tablist">';
								collapse+='<li role="presentation" class="active"><a href="#startups" att_tab_id="startupsTabId" attr_type="Startup" aria-controls="startups" role="tab" data-toggle="tab">Startups</a></li>';
								collapse+='<li role="presentation"><a href="#incubator" att_tab_id="incubatorTabId" attr_type="Incubators" aria-controls="incubator" role="tab" data-toggle="tab">Incubator/Accelerators</a></li>';
								collapse+='<li role="presentation"><a href="#enablers" att_tab_id="enablersTabId" attr_type="Enablers" aria-controls="enablers" role="tab" data-toggle="tab">Enablers</a></li>';
								collapse+='<li role="presentation"><a href="#mentors" att_tab_id="mentorsTabId" attr_type="Mentors" aria-controls="mentors" role="tab" data-toggle="tab">Mentors</a></li>';
								collapse+='<li role="presentation"><a href="#edc" att_tab_id="edcTabId" attr_type="EDC" aria-controls="edc" role="tab" data-toggle="tab">EDC</a></li>';
								collapse+='<li role="presentation"><a href="#atal" att_tab_id="atalTabId"  attr_type="AtalTinkeringLabs" aria-controls="atal" role="tab" data-toggle="tab">Atal Tinkering Labs</a></li>';
								collapse+='<li role="presentation"><a href="#vc" att_tab_id="vcTabId" attr_type="AngelInvestors" aria-controls="vC" role="tab" data-toggle="tab">VC& Angel Investors</a></li>';
								collapse+='<li role="presentation"><a href="#iC" att_tab_id="iCTabId" attr_type="IndustryCollaborations" aria-controls="vC" role="tab" data-toggle="tab">Industry Collaborations</a></li>';
								collapse+='<li role="presentation"><a href="#lt" att_tab_id="leadsTabId" attr_type="Leads" aria-controls="lt" role="tab" data-toggle="tab">Leads</a></li>';
								collapse+='</ul>';
								collapse+='<div class="tab-content">';
								collapse+='<div role="tabpanel" class="tab-pane active" id="startups">';
								collapse+='<div id="startupsTabId"></div>';
								collapse+='</div>';
								collapse+='<div role="tabpanel" class="tab-pane " id="incubator">';
								collapse+='<div id="incubatorTabId"></div>';
								collapse+='</div>';
								collapse+='<div role="tabpanel" class="tab-pane " id="enablers">';
								collapse+='<div id="enablersTabId"></div>';
								collapse+='</div>';
								collapse+='<div role="tabpanel" class="tab-pane " id="mentors">';
								collapse+='<div id="mentorsTabId"></div>';
								collapse+='</div>';
								collapse+='<div role="tabpanel" class="tab-pane " id="edc">';
								collapse+='<div id="edcTabId"></div>';
								collapse+='</div>';
								collapse+='<div role="tabpanel" class="tab-pane " id="atal">';
								collapse+='<div id="atalTabId"></div>';
								collapse+='</div>';
								collapse+='<div role="tabpanel" class="tab-pane " id="vc">';
								collapse+='<div id="vcTabId"></div>';
								collapse+='</div>';
								collapse+='<div role="tabpanel" class="tab-pane " id="iC">';
								collapse+='<div id="iCTabId"></div>';
								collapse+='</div>';
								collapse+='<div role="tabpanel" class="tab-pane " id="lt">';
								collapse+='<div id="leadsTabId"></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="panel-group m_top10" id="accordionApInnovationActivity" role="tablist" aria-multiselectable="true">';
								collapse+='<div class="panel panel-default panel-black">';
								collapse+='<div class="panel-heading" role="tab">		';
								collapse+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationActivity" href="#collapseApInnovationActivity" aria-expanded="true" aria-controls="collapseApInnovationActivity">		';
								collapse+='<h4 class="panel-title text-capital">Activity Profile</h4>						';
								collapse+='</a>';
								collapse+='</div>';
								collapse+='<div id="collapseApInnovationActivity" class="panel-collapse collapse" role="tabpanel">	';
								collapse+='<div class="panel-body">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div class=" ">									';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div id="activityProfTabId"></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="panel-group m_top10" id="accordionApInnovationTargetAchievements" role="tablist" aria-multiselectable="true">';
								collapse+='<div class="panel panel-default panel-black">';
								collapse+='<div class="panel-heading" role="tab">		';
								collapse+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationTargetAchievements" href="#collapseApInnovationTargetAchievements" aria-expanded="true" aria-controls="collapseApInnovationTargetAchievements">		';
								collapse+='<h4 class="panel-title text-capital">Targets vs Achivements</h4>						';
								collapse+='</a>';
								collapse+='</div>';
								collapse+='<div id="collapseApInnovationTargetAchievements" class="panel-collapse collapse" role="tabpanel">	';
								collapse+='<div class="panel-body">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div class="">									';
								collapse+='<div class="row m_top10">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div id="targVsAchTabId"></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="panel-group m_top10" id="accordionApInnovationDistrictWise" role="tablist" aria-multiselectable="true">';
								collapse+='<div class="panel panel-default panel-black">';
								collapse+='<div class="panel-heading" role="tab">		';
								collapse+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationDistrictWise" href="#collapseApInnovationDistrictWise" aria-expanded="true" aria-controls="collapseApInnovationDistrictWise">		';
								collapse+='<h4 class="panel-title text-capital">District Wise Details</h4>						';
								collapse+='</a>';
								collapse+='</div>';
								collapse+='<div id="collapseApInnovationDistrictWise" class="panel-collapse collapse" role="tabpanel">	';
								collapse+='<div class="panel-body">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div id="districtWiseDetTabId"></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>			';
								collapse+='</div>';
								collapse+='<div class="panel-group m_top10" id="accordionApInnovationBoothCamp" role="tablist" aria-multiselectable="true">';
								collapse+='<div class="panel panel-default panel-black">';
								collapse+='<div class="panel-heading" role="tab">		';
								collapse+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationBoothCamp" href="#collapseApInnovationBoothCamp" aria-expanded="true" aria-controls="collapseApInnovationBoothCamp">		';
								collapse+='<h4 class="panel-title text-capital">bootCamp Details</h4>						';
								collapse+='</a>';
								collapse+='</div>';
								collapse+='<div id="collapseApInnovationBoothCamp" class="panel-collapse collapse" role="tabpanel">	';
								collapse+='<div class="panel-body">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div id="bootCampDetailsDivId"></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>			';
								collapse+='</div>';
								collapse+='<div class="panel-group m_top10" id="accordionApInnovationHackathons" role="tablist" aria-multiselectable="true">';
								collapse+='<div class="panel panel-default panel-black">';
								collapse+='<div class="panel-heading" role="tab">		';
								collapse+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationHackathons" href="#collapseApInnovationHackathons" aria-expanded="true" aria-controls="collapseApInnovationHackathons">		';
								collapse+='<h4 class="panel-title text-capital">Hackathons</h4>						';
								collapse+='</a>';
								collapse+='</div>';
								collapse+='<div id="collapseApInnovationHackathons" class="panel-collapse collapse" role="tabpanel">	';
								collapse+='<section class="sectioncs">';
								collapse+='<div class="block displayNone">	';
								collapse+='<div class="container-fluid">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-3 pull-right">';
								collapse+='<div class="input-group">';
								collapse+='<span class="input-group-addon">';
								collapse+='<i class="glyphicon glyphicon-calendar"></i>';
								collapse+='</span>';
								collapse+='<input class="form-control" id="dateRangePicker" style="width:200px;" type="text">';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</section>';
								collapse+='<div class="panel-body">';
								collapse+='<div class="row">';
								collapse+='<div class="col-sm-12">';
								collapse+='<div id="trainingDetailsDivId"></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='<div class="row m_top30">';
								collapse+='<div class="col-sm-12 m_top20">';
								collapse+='<div id="trainHackathonDetailsDivId" ></div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</div>';
								collapse+='</section>';
							}  
						collapse+='</div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
			/* if(divId == 'eOffice')
			{
				collapse+='<div class="panel-group" id="accordionEOffc" role="tablist" aria-multiselectable="true">';
					collapse+='<div class="panel panel-default panel-black">';
						collapse+='<div class="panel-heading" role="tab" id="headingOneEOffc">';
							collapse+='<a role="button" class="panelCollapseIcon " data-toggle="collapse" data-parent="#accordionEOffc" href="#collapseOneEOffc" aria-expanded="true" aria-controls="collapseOneEOffc">';
								collapse+='<h4 class="panel-title">E-OFFICE PENDENCY STATUS</h4>';
							collapse+='</a>';
						collapse+='</div>';
						collapse+='<div id="collapseOneEOffc" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOneEOffc">';
							collapse+='<div class="panel-body">';
								collapse+='<div id="eOfficePendencyWise"></div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				collapse+='</div>';
			} */
			
		}
	$("#departmentBlockWiseDetailsId").html(collapse);
	//CMEDOB
	$("#itcDateRangePickerId").daterangepicker({
		opens: 'left',
		startDate: globalFromDate,
		endDate: globalToDate,
		locale: {
			format: 'DD/MM/YYYY'
		},
		ranges: {
		   'All':[moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY"), moment().format("DD/MM/YYYY")],
		   'Today' : [moment(), moment()],
		   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		   'This Month': [moment().startOf('month'), moment()],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'Last 3 Months': [moment().subtract(3, 'month'), moment()],
		   'This Year': [moment().startOf('Year'), moment()],
		   'Last 1 Year': [moment().subtract(1, 'Year'), moment()]
		}
	});
	var dates= $("#itcDateRangePickerId").val();
	var pickerDates = globalFromDate+' - '+globalToDate
	if(dates == pickerDates)
	{
		$("#itcDateRangePickerId").val('All');
	}
	//MeesavaSLA
	$("#itcMessavaSlaDateRangePickerId").daterangepicker({
		opens: 'left',
		startDate: globalFromDateSLA,
		endDate: globalToDateSLA,
		locale: {
			format: 'DD/MM/YYYY'
		},
		ranges: {
		   'All':[moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY"),  moment().format("DD/MM/YYYY")],
	       'Today' : [moment(), moment()],
		   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		   'This Month': [moment().startOf('month'), moment()],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'Last 3 Months': [moment().subtract(3, 'month'), moment()],
		   'This Year': [moment().startOf('Year'), moment()],
		   'Last 1 Year': [moment().subtract(1, 'Year'), moment()]
		}
	});
	var dates= $("#itcMessavaSlaDateRangePickerId").val();
	var pickerDates = globalFromDateSLA+' - '+globalToDateSLA
	if(dates == pickerDates)
	{
		$("#itcMessavaSlaDateRangePickerId").val('All');
	}
	
	for(var i in levelWiseBlockArr){
		if(divId == "meesevaSlaKpi"){
			//getMeesevaSLAOverviewDtls(divId,levelWiseBlockArr[i].id);
			getMeesevaSLACatWiseAbstarctDetails(divId,levelWiseBlockArr[i].id,"change")
		}else if(divId == 'apInnovationSociety')
		{
			/* startUpsArr = [];
			bootCampArrIds = [];
			var incubatorsIdsArr = [1,2,3];
			getAPInnovationSocietyOverviewHtml(divId.replace(/\s+/g, '')+'Block'+levelWiseBlockArr[i].id,incubatorsIdsArr)
			/* getAPInnovationSocietyOverview('overview',divId.replace(/\s+/g, '')+'Block'+levelWiseBlockArr[i].id);
			getAPISXLR8APDetailedData();
			getCampaignsDetailedData();
			getCampusInnovationCentersDetailedData(); */
			/* getApInnovationIndicatorDetails();
			getApInnovationIncubatorsDroneAssemblyDetails(4);
			getApInnovationIncubatorsIPFecilitationDetails(8);
			getAtalTinkeringLabSummary();
			getAllAtalTinkeringList();
			getApInnovationOverviewDetails();
			getCompleteOverviewForAPIS('overView','incubatorsOverviewId');
			getStartupsEmploymentFundingPatternAcquisitionsDetails(); */
			//getApInnovationIncubatorsXLr8APDetails(1); */
			onloadcalls();
		}else if(divId == 'eOffice')
		{
			getEOfcDepartWiseOverviewDetails('overview');
			//getEofficeDesignationWisePendencyDetails();
		}else if(divId == 'meesevaKpi'){
			getMeesavaKpiGraphBuild(divId,levelWiseBlockArr[i].id);
		}else if(divId == 'cMeoDB'){
			getCMEDOBOverview(divId,levelWiseBlockArr[i].id,"Detailed");
			getCMEDOBReportStatusWise("B");
			getCMeoDBSectorWiseStatusDetais();
		}else if(divId == "APDigitalLiteracy"){
			getAPDigitalLiteracyDetails(divId.replace(/\s+/g, '')+'Block'+levelWiseBlockArr[i].id,'overview');
		}
	}
	if(divId == 'promotions')
	{
		//getITSectorWiseOverviewDetails();
		//getITSectorCategoryWiseDetails("RED",'Total');
		//getITSectorCategoryWiseDetails("GREEN",'Total');
		//getITSectorCategoryWiseDetails("DROPPED",'Total');
		//getITSectorLeadCategoryWiseDetails("RED",'Total');
		//getITSectorLeadCategoryWiseDetails("GREEN",'Total');
		//getITSectorLeadCategoryWiseDetails("DROPPED",'Total');
		//getITDistrictWiseDetails("IT","ALL",'body');
		//getITDistrictWiseDetails("Electronics","ALL",'body');
		//getITDistrictWiseDetails("Fintech","ALL",'body');
	}
	
	$("#dateRangePicker").daterangepicker({
		opens: 'left',
		startDate: globalFromDateAPI,
		endDate: globalToDateAPI,
		locale: {
		format: 'DD/MM/YYYY' 
	  } ,
	  ranges: {
	   // 'All':[overallDaterangePicker()],
		'Today' : [moment(), moment()],
		'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
		'This Month': [moment().startOf('month'), moment()],
		'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		'This Year': [moment().startOf('Year'), moment()],
		'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
		'OverAll':[moment().subtract(15, 'years').startOf('year').format("DD/MM/YYYY"), moment().format("DD/MM/YYYY")]
	  }
	  });
	  
	  $('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
			globalFromDateAPI = picker.startDate.format('DD/MM/YYYY');
			globalToDateAPI = picker.endDate.format('DD/MM/YYYY');
			if(picker.chosenLabel == 'OverAll')
			{
				$("#dateRangePicker").val('OverAll');
			}
			getTrainingOverviewCourseWise(0);
			getTrainingAndPlacementOverViewDetails(0);
		});
		
	
	$('#itcDateRangePickerId').on('apply.daterangepicker', function(ev, picker) {
		globalFromDate = picker.startDate.format('DD/MM/YYYY');
		globalToDate = picker.endDate.format('DD/MM/YYYY'); 
		if(picker.chosenLabel == 'All')
		{
			$("#itcDateRangePickerId").val('All');
		}
		$("#sectorSelId").val("B");
		$("#cmedobSectorWiseInformationId,#cmedobSectorWiseElectronicSectorId,#cmedobBlockMainDivId,#cmedobDivId").html('');
		getCMEDOBOverview("cMeoDB",5,"Detailed");
		getCMEDOBReportStatusWise("B");
		getCMeoDBSectorWiseStatusDetais();
	});

	/* $('#itcMessavaSlaDateRangePickerId').on('apply.daterangepicker', function(ev, picker) {
		
		globalFromDateSLA = picker.startDate.format('DD/MM/YYYY');
		globalToDateSLA = picker.endDate.format('DD/MM/YYYY'); 
		if(picker.chosenLabel == 'All')
		{
			$("#itcMessavaSlaDateRangePickerId").val('All');
		}
			getMeesevaSLAOverviewDtls("meesevaSla",8);
	}); */
}

/* function getOverAllDetils(divId,blockId){
	
	var str='';
	
	if(divId == "promotions"){
		if(blockId == 1){
			str+='Promotionsfsdfsdfs';
		}else if(blockId == 2){
			str+='electronics';
		}else if(blockId == 3){
			str+='fintech';
		}
	}else if(divId == "eOffice"){
		str+='Promotionsdfsdfs';
	}else if(divId == "meesevaSla"){
		
		
		
	}else if(divId == "meesevaKpi"){
		str+='Promotiondasdsadada233sdfss';
	}else if(divId == "eProcurement"){
		str+='Promotionsadfse';
	}else if(divId == "cMeoDB"){
		str+='Promotiosadsaedsansf';
	} 
	$("#"+divId+"Block"+blockId).html(str);
} */
function getMeesevaSLAOverviewDtls(divId,blockId){
	$("#meesevaHeadingId").html(spinner);
	$("#"+divId+"Block"+blockId).html(spinner);
	var json = {
	    fromDate:globalFromDateSLA,
		toDate:globalToDateSLA,
		filterId:"2",//sending type in web service 2 means getting department wise data
		year:""
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLAOverviewDtls',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#meesevaHeadingId").html('');
	    $("#"+divId+"Block"+blockId).html('');
		if(result !=null && result.length>0){
			buildMeesevaSLAOverviewDtls(result,divId,blockId);
		}else {
			$("#"+divId+"Block"+blockId).html('NO DATA AVAILABLE.');
		}
		getMeesevaSLAMonitoringDtlsDepartmentWise(divId,blockId);
	});		
}

function buildMeesevaSLAOverviewDtls(result,divId,blockId){
	var str='';
		str+='<div class="row">';
			str+='<div class="col-sm-12">';
				for(var i in result){
					str+='<div class="col-sm-4">';
						str+='<div class="white_block_ITC">';
							if(result[i].name == "TOTAL TRANSACTIONS"){
								str+='<div style="border-left:5px solid #000;">';
							}else if(result[i].name == "With in SLA"){
								str+='<div style="border-left:5px solid #009587;">';
							}else if(result[i].name == "Beyond SLA"){
								$("#meesevaHeadingId").html(result[i].totalCount);
								str+='<div style="border-left:5px solid #F75C5D;">';
							}
							
								str+='<h4 class="m_left10"><b>'+result[i].name+'</b></h4>';
								str+='<h5 class="m_left10">('+result[i].departmentCount+' DEPARTMENTS)</h5>';
								str+='<h1 class="m_top10 m_left10">'+result[i].totalCount+'</h1>';
							str+='</div>';
							str+='<div class="row m_top20">';
								str+='<div class="col-sm-12 white_block_Dep">';
									for(var j in result[i].subList){
										str+='<div class="col-sm-6">';
											str+='<h5 class="m_top5"><b>'+result[i].subList[j].name+'</b>';
											str+='<h3 class="m_top10">'+result[i].subList[j].totalCount+'</h3>';
										str+='</div>';
									}
								str+='</div>';	
							str+='</div>';
						str+='</div>';
						str+='</div>';
				}
			str+='</div>';
		str+='</div>';
		str+='<div class="m_top20">';
			str+='<div class="col-sm-12">';
				str+='<div class="white_block_ITC">';
					str+='<h3>MEESEVA SLA MONITORING</h3>';
					str+='<div id="meesevaSalTable'+divId+''+blockId+'"></div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	$("#"+divId+"Block"+blockId).html(str);
}

function getMeesevaSLAMonitoringDtlsDepartmentWise(divId,blockId){
	$("#meesevaSalTable"+divId+blockId).html(spinner);
	var json = {
		fromDate:globalFromDate,
		toDate:globalToDate,
		year:"",
		filterId:"2"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLAMonitoringDtlsDepartmentWise',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if (result != null && result.length > 0) {
			 buildMeesevaSlaMonitoringDtls(result,divId,blockId);
		 } 
	});		
}
function buildMeesevaSlaMonitoringDtls(result,divId,blockId) {
	var str = '';
	str+='<div class="table-responsive m_top20">';	
	str+='<table class="table table-bordered" id="meesevaSlaMonitoringDataTblId">';
		str+='<thead>';
			str+='<tr>';
				str+='<th rowspan="2">Departments</th>';
				str+='<th colspan="2" style="text-align:center;">Category - A</th>';
				str+='<th colspan="6" style="text-align:center;">Category - B</th>';
			str+='</tr>';				
			str+='<tr>';
				str+='<th>Grand Total</th>';
				str+='<th>Total</th>';
				str+='<th>Total</th>';
				str+='<th>Approved</th>';
				str+='<th>Rejected</th>';
				str+='<th>Pending with in SLA</th>';
				str+='<th>Pending Beyond SLA</th>';
				str+='<th>Revoked</th>';
			str+='</tr>';			
		str+='</thead>';
		str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+result[i].name+'</td>';
					str+='<td>'+result[i].totalTransactionCount+'</td>';
					str+='<td>'+result[i].cateoryA+'</td>';
					str+='<td>'+result[i].categoryB+'</td>';
					str+='<td>'+result[i].bApproved+'</td>';
					str+='<td>'+result[i].bRejected+'</td>';
					str+='<td>'+result[i].pendingWithinSla+'</td>';
					str+='<td>'+result[i].pendingBeyondSla+'</td>';
					str+='<td>'+result[i].revoked+'</td>';
				str+='</tr>';
			}
		str+='</tbody>';
	str+='</table>';
	str+='</div>';
	$("#meesevaSalTable"+divId+blockId).html(str);
	$("#meesevaSlaMonitoringDataTblId").dataTable({
		"retrieve": true,
	});
}

function getITSectorWiseOverviewDetails(){
	$("#promotionsTotalBlockId").html(spinner);
	var json = {
		category:'ALL'
	}
	$.ajax({                
		type:'POST',    
		url: 'getITSectorCategoryWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			return buildData(result);
		}
	});		
	function buildData(result)
	{
		var selectedBlockType = $("#promotionsBlockSwitch li.active").attr("attr_type");
		for(var i in result)
		{
			if(result[i].sector == "Total")
			{
				//$("#promotionsHeadingId").html(result[i].investment+" Cr");
			}
			
			var str = '';
			var str1 = '';
			if(selectedBlockType == result[i].sector)
			{
				str1+='<div class="white_block_ITC" style="background-color:#F1F1F1">';
					str1+='<p>TOTAL</p>';
					str1+='<div class="media m_top40">';
						str1+='<div class="media-left">';
							str1+='<img src="Assests/icons/ITC/Group 2818.png" class="media-object"/>';
						str1+='</div>';
						str1+='<div class="media-body">';
							str1+='<p>Industry Count</p>';
							str1+='<h3 class="m_top10">'+result[i].noProjects+'</h3>';
						str1+='</div>';
					str1+='</div>';
					str1+='<div class="media m_top40">';
						str1+='<div class="media-left">';
							str1+='<img src="Assests/icons/ITC/Group 2817.png" class="media-object"/>';
						str1+='</div>';
						str1+='<div class="media-body">';
							str1+='<p>Commited Investments</p>';
							str1+='<h3 class="m_top10">'+result[i].investment+' Cr</h3>';
						str1+='</div>';
					str1+='</div>';
					str1+='<div class="media m_top40">';
						str1+='<div class="media-left">';
							str1+='<img src="Assests/icons/ITC/Group 2813.png" class="media-object"/>';
						str1+='</div>';
						str1+='<div class="media-body">';
							str1+='<p>Commited Employment</p>';
							str1+='<h3 class="m_top10">'+result[i].employment+'</h3>';
						str1+='</div>';
					str1+='</div>';
				str1+='</div>';
				/* str1+='<ul class="list-inline m_top10">';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#058E46;color:#fff">G1</span>Gone into Production';
					str1+='</li>';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#058E46;color:#fff">G2</span>Trial Production	';
					str1+='</li>';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#058E46;color:#fff">G4</span>Civil Works commenced	';
					str1+='</li>';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#058E46;color:#fff">Y</span>Ready for Foundation Stone';
					str1+='</li>';
				str1+='</ul>';
				str1+='<ul class="list-inline m_top20">';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#F75C5D;color:#fff">R1</span>Land in possession and approvals granted	';
					str1+='</li>';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#F75C5D;color:#fff">R2</span>Land in possession and approvals in progress	';
					str1+='</li>';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#F75C5D;color:#fff">R3</span>Government land sought, but not allocated	';
					str1+='</li>';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#F75C5D;color:#fff">R4</span>DPR to be submitted';
					str1+='</li>';
				str1+='</ul>';
				str1+='<ul class="list-inline m_top20">';
					str1+='<li>';
						str1+='<span class="roundCircle" style="background-color:#91CCC7;color:#fff">D</span>Dropped';
					str1+='</li>';
				str1+='</ul>'; */
				$("#promotionsTotalBlockId").html(str1);
			}
		}
	}
}
$(document).on("click",".overview-click",function(){
	var selectedBlockType = $("#promotionsBlockSwitch li.active").attr("attr_type");
	var categoryType = $(this).attr("attr_category");
	if(categoryType != null)
	{
		getITSectorSubLeadCategoryWiseDetails(selectedBlockType,categoryType)
	}else{
		getITDistrictWiseDetails(selectedBlockType,$(this).attr("attr_type"),'modal');
	}
});
function getITSectorCategoryWiseDetails(type,typeOfBlock){
	if(type == "GREEN")
	{
		$("#promotionsStageGreenBlockId").html(spinner);
	}else if(type == "RED")
	{
		$("#promotionsStageRedBlockId").html(spinner);
	}else if(type == "DROPPED")
	{
		$("#promotionsStageDroppedBlockId").html(spinner);
		$("#droppedDataFormModal").html(spinner);
	}
	var json = {
		category:type
	}
	$.ajax({                
		type:'POST',    
		url: 'getITSectorCategoryWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			//if(typeOfBlock == 'Total')
			//{
				//getITSectorLeadCategoryWiseDetails(type,typeOfBlock);
			//}
			return buildData(result,type);
		}else{
			if(type == "GREEN")
			{
				$("#promotionsStageGreenBlockId").html("");
			}else if(type == "RED")
			{
				$("#promotionsStageRedBlockId").html("");
			}else if(type == "DROPPED")
			{
				$("#promotionsStageDroppedBlockId").html("");
				$("#addIcon").hide();
			}
		}
	});		
	function buildData(result,type)
	{
		var str='';
		var selectedBlockType = $("#promotionsBlockSwitch li.active").attr("attr_type");
		
		for(var i in result)
		{
			if(selectedBlockType == result[i].sector)
			{
				if(type == "GREEN")
				{
					str+='<div class="white_block_ITC" style="padding:5px 10px;background-color:#058E46;color:#fff">';
						str+='<p class="text-center">';
							str+='<span>Civil Works commencement and beyond</span>';
						str+='</p>';
					str+='</div>';
				}else if(type == "RED")
				{	
					str+='<div class="white_block_ITC" style="padding:5px 10px;background-color:#F75C5D;color:#fff">';
						str+='<p class="text-center">';
							str+='<span>Before Civil Works commencement</span>';
						str+='</p>';
					str+='</div>';
				}else if(type == "DROPPED")
				{	
					str+='<div class="white_block_ITC" style="padding:5px 10px;background-color:#91CCC7;color:#fff;cursor:pointer;display:none;" id="droppedShowHideId">';
						str+='<i class="fa fa-plus" id="addIcon" aria-hidden="true"></i>';
					str+='</div>';
				}
					//str+='<div class="white_block_ITC m_top20" style="background-color:#F1F1F1">';
						if(type == "GREEN")
						{
							str+='<div class="white_block_ITC m_top10" style="background-color:#F1F1F1;padding:8px;">';
							str+='<p>';
								str+='<span style="padding:5px 10px;background-color:#058E46;color:#fff">Overall</span>';
							str+='</p>';
						}else if(type == "RED")
						{
							str+='<div class="white_block_ITC m_top10" style="background-color:#F1F1F1;padding:8px;">';
							str+='<p>';
								str+='<span style="padding:5px 10px;background-color:#F75C5D;color:#fff">Overall</span>';
							str+='</p>';
						}else if(type == "DROPPED")
						{
							str+='<div class="white_block_ITC m_top10 droppedClass" style="background-color:#F1F1F1;padding:8px;">';
								str+='<p>';
									str+='<span style="padding:5px 10px;background-color:#91CCC7;color:#fff">Overall</span>';
								str+='</p>';
						}
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-4">';
								str+='<h4 class="overview-click" style="cursor:pointer;color:rgb(51, 122, 183);" attr_type="'+type+'">'+result[i].noProjects+'</h4>';
								str+='<p><small>INDUSTRIES</small></p>';
							str+='</div>';
							str+='<div class="col-sm-4">';
								str+='<h4 style="font-size:16px;">'+result[i].investment+'&nbsp;Cr</h4>';
								str+='<p><small>INVESTMENTS</small></p>';
							str+='</div>';
							str+='<div class="col-sm-4">';
								str+='<h4>'+result[i].employment+'</h4>';
								str+='<p><small>EMPLOYMENT</small></p>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				
			}
			
			if(type == "GREEN")
			{
				$("#promotionsStageGreenBlockId").html(str);
			}else if(type == "RED")
			{
				$("#promotionsStageRedBlockId").html(str);
			}else if(type == "DROPPED")
			{
				$("#promotionsStageDroppedBlockId").html(str);
				$('#droppedDataFormModal').html(str);
				$("#addIcon").show();
			}
		}
	}
	
}
function getITSectorLeadCategoryWiseDetails(type,sector){
	if(type == "GREEN")
	{
		$("#promotionsStageGreenBlockId1").html(spinner);
	}else if(type == "RED")
	{
		$("#promotionsStageRedBlockId1").html(spinner);
	}else if(type == "DROPPED")
	{
		$("#promotionsStageDroppedBlockId1").html(spinner);
		$("#droppedDataFormModal1").html(spinner);
	}
	var json = {
		leadName:"0",
		category:type,
		sector:sector
	}
	$.ajax({                
		type:'POST',    
		url: 'getITSectorLeadCategoryWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			return buildData(result,type);
		}else{
			if(type == "GREEN")
			{
				$("#promotionsStageGreenBlockId1").html("");
			}else if(type == "RED")
			{
				$("#promotionsStageRedBlockId1").html("");
			}else if(type == "DROPPED")
			{
				$("#promotionsStageDroppedBlockId1").html("");
				$("#addIcon").hide();
			}
		}
	});
	function buildData(result,type)
	{
		var str='';
		var selectedBlockType = $("#promotionsBlockSwitch li.active").attr("attr_type");
		for(var i in result)
		{
			//str+='<div class="white_block_ITC m_top20 droppedClass" style="background-color:#F1F1F1">';
				if(type == "GREEN")
				{
					str+='<div class="white_block_ITC m_top10" style="background-color:#F1F1F1;padding:8px;">';
					str+='<p>';
						str+='<span style="padding:5px 10px;background-color:#058E46;color:#fff">'+result[i].category+' <span style="font-size:12px;"> - '+result[i].name+'</span> </span>';
					str+='</p>';
				}else if(type == "RED")
				{
					str+='<div class="white_block_ITC m_top10" style="background-color:#F1F1F1;padding:8px;">';
					str+='<p>';
						str+='<span style="padding:5px 10px;background-color:#F75C5D;color:#fff">'+result[i].category+' <span style="font-size:12px;"> - '+result[i].name+'</span> </span>';
					str+='</p>';
				}else if(type == "DROPPED")
				{
					str+='<div class="white_block_ITC m_top10 droppedClass" style="background-color:#F1F1F1;padding:8px;">';
					str+='<p>';
						str+='<span style="padding:5px 10px;background-color:#91CCC7;color:#fff">'+result[i].category+' <span style="font-size:12px;"> - '+result[i].name+'</span> </span>';
					str+='</p>';
				}
				str+='<div class="row m_top10">';
					str+='<div class="col-sm-4">';
						str+='<h4 class="overview-click" attr_category="'+result[i].category+'" style="cursor:pointer;color:rgb(51, 122, 183);"  attr_type="'+type+'">'+result[i].categoryCount+'</h4>';
						str+='<p><small>INDUSTRIES</small></p>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<h4 style="font-size:16px;">'+result[i].investment+'&nbsp;Cr</h4>';
						str+='<p><small>INVESTMENTS</small></p>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<h4>'+result[i].employment+'</h4>';
						str+='<p><small>EMPLOYMENT</small></p>';
					str+='</div>';
				str+='</div>';
			str+='</div>';				
		}
		if(type == "GREEN")
		{
			$("#promotionsStageGreenBlockId1").html(str);
		}else if(type == "RED")
		{
			$("#promotionsStageRedBlockId1").html(str);
		}else if(type == "DROPPED")
		{
			$("#promotionsStageDroppedBlockId1").html(str);
			$('#droppedDataFormModal1').html(str);
			$("#addIcon").show();
		}
	}
}

function getITSectorSubLeadCategoryWiseDetails(type,categoryType){
	$("#modalId").modal('show');
	$("#cohortId").html(spinner);
	
	var json = {
		leadName:"0",
		category:type,
		reportType:categoryType
	}
	$.ajax({                
		type:'POST',    
		url: 'getITSectorSubLeadCategoryWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			return buildData(result,type)
		}
	});
	function buildData(result,type)
	{
		var str='';
		str+='<table class="table table-bordered" id="'+type+'DataTable">';
			str+='<thead>';
				str+='<th>District</th>';
				str+='<th>Sector</th>';
				str+='<th>Sub Sector</th>';
				str+='<th>Department</th>';
				str+='<th>Company</th>';
				str+='<th>Line Of Activity</th>';
				str+='<th>Committed Investment(<i class="fa fa-inr"></i> in Cr.)</th>';
				str+='<th>Committed Employment</th>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result)
			{
				str+='<tr>';
					str+='<td>'+result[i].districtName+'</td>';
					str+='<td>'+result[i].itSector+'</td>';
					str+='<td>'+result[i].subSector+'</td>';
					str+='<td>'+result[i].deptName+'</td>';
					str+='<td>'+result[i].nameOfCompany+'</td>';
					str+='<td>'+result[i].lineOfActivity+'</td>';
					str+='<td>'+result[i].investment+'</td>';
					str+='<td>'+result[i].employment+'</td>';
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
		$("#modalTitleId").html(type+' '+categoryType+' '+'Indurstrices');
		$("#cohortId").html(str);
		$("#"+type+"DataTable").dataTable({
			"retrieve": true,
		});
	}
}
function getITDistrictWiseDetails(type,category,divType){
	if(divType == 'body')
	{
		$("#"+type+"OverviewBlockDivId").html(spinner);
	}else{
		$("#modalId").modal('show');
		$("#cohortId").html(spinner);
	}
	
	var json = {
		category:category,
		sector:type
	}
	$.ajax({                
		type:'POST',    
		url: 'getITDistrictWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			return buildData(result,type,divType,category);
		}else{
			$("#"+type+"OverviewBlockDivId").html("NO DATA AVAILABLE");
		}
	});
	function buildData(result,type,divType,category)
	{
		var str='';
		var cstr='';
		
		str+='<div class="row">';
			cstr+='<div class="col-sm-12">';
				cstr+='<div class="pull-right"><label class="checkbox-inline"><input type="checkbox" class="checkBoxCls'+type+'" attr_divType="'+type+'" id="droppedForCheckId" ></input>Dropped</label></div>';
			cstr+='</div>';
			str+='<div class="col-sm-12 m_top20">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered" id="'+type+'DataTable'+divType+'">';
						str+='<thead>';
							str+='<tr>';
								str+='<th rowspan="2">District</th>';
								//str+='<th colspan="3" class="text-center">Total</th>';
								str+='<th colspan="5" class="text-center">Green</th>';
								str+='<th colspan="3" class="text-center">Red</th>';
								str+='<th colspan="3" class="text-center dropedCls'+type+'"  style="display:none;">Dropped</th>';
							str+='</tr>';
							str+='<tr>';
								//str+='<th>Industries</th>';
								//str+='<th>Committed Investment(<i class="fa fa-inr"></i> in Cr.)</th>';
								//str+='<th>Committed Employment</th>';
								str+='<th>Industries</th>';
								str+='<th>Actual Investment(<i class="fa fa-inr"></i> in Cr.)</th>';
								str+='<th>Committed Investment(<i class="fa fa-inr"></i> in Cr.)</th>';
								str+='<th>Actual Employment</th>';
								str+='<th>Committed Employment</th>';
								str+='<th>Industries</th>';
								str+='<th>Committed Investment(<i class="fa fa-inr"></i> in Cr.)</th>';
								str+='<th>Committed Employment</th>';
								str+='<th class="dropedCls'+type+'" style="display:none;">Industries</th>';
								str+='<th class="dropedCls'+type+'" style="display:none;">Committed Investment(<i class="fa fa-inr"></i> in Cr.)</th>';
								str+='<th class="dropedCls'+type+'" style="display:none;">Committed Employment</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result)
						{
							if(result[i].district != 'ZTotal')
							{
								str+='<tr>';
								
								str+='<td>'+result[i].district+'</td>';
								//if(result[i].district != null && result[i].district == 'ZTotal'){
									//str+='<td>'+result[i].noProjects+'</td>';
								//}else{
									//str+='<td class="sectorWiseCuntCls" attr_block_name="'+type+'" attr_category="'+category+'" attr_district="'+result[i].district+'" style="cursor:pointer;">'+result[i].noProjects+'</td>';
								//}
								
								//str+='<td>'+result[i].investment+'</td>';
								//str+='<td>'+result[i].employment+'</td>';
								for(var j in result[i].subList)
								{
									if(result[i].subList[j].category != null && result[i].subList[j].category == 'DROPPED'){
										if(result[i].subList[j].noProjects == 'undefined' || result[i].subList[j].noProjects === undefined)
										{
											str+='<td class="dropedCls'+type+'" style="display:none;">-</td>';
										}else{
											str+='<td class="dropedCls'+type+' sectorWiseCuntCls" style="cursor:pointer;display:none;color:rgb(51, 122, 183);"  attr_block_name="'+type+'" attr_category="'+result[i].subList[j].category+'" attr_district="'+result[i].district+'">'+result[i].subList[j].noProjects+'</td>';
										}
										
										if(result[i].subList[j].investment == 'undefined' || result[i].subList[j].investment === undefined)
										{
											str+='<td class="dropedCls'+type+'" style="display:none;">-</td>';
										}else{
											str+='<td class="dropedCls'+type+'" style="display:none;">'+result[i].subList[j].investment+'</td>';
										}
										
										if(result[i].subList[j].employment == 'undefined' || result[i].subList[j].employment === undefined)
										{
											str+='<td class="dropedCls'+type+'" style="display:none;">-</td>';
										}else{
											str+='<td class="dropedCls'+type+'" style="display:none;">'+result[i].subList[j].employment+'</td>';
										}	
									}else{
										if(result[i].subList[j].noProjects == 'undefined' || result[i].subList[j].noProjects === undefined)
										{
											str+='<td>-</td>';
										}else{
											str+='<td class="sectorWiseCuntCls" attr_block_name="'+type+'" attr_category="'+result[i].subList[j].category+'" attr_district="'+result[i].district+'" style="cursor:pointer;color:rgb(51, 122, 183);">'+result[i].subList[j].noProjects+'</td>';
										}
										if(result[i].subList[j].category != null && result[i].subList[j].category == 'GREEN'){
											str+='<td>-</td>';
										}
										if(result[i].subList[j].investment == 'undefined' || result[i].subList[j].investment === undefined)
										{
											str+='<td>-</td>';
										}else{
											str+='<td>'+result[i].subList[j].investment+'</td>';
										}
										if(result[i].subList[j].category != null && result[i].subList[j].category == 'GREEN'){
											str+='<td>-</td>';
										}
										if(result[i].subList[j].employment == 'undefined' || result[i].subList[j].employment === undefined)
										{
											str+='<td>-</td>';
										}else{
											str+='<td>'+result[i].subList[j].employment+'</td>';
										}
									}
									
								}
							str+='</tr>';
							}
						}
						str+='</tbody>';
						for(var i in result)
						{
							if(result[i].district == 'ZTotal')
							{
								str+='<tfoot>';
									str+='<tr style="background-color:#ddd;">';
								
										str+='<td>Total</td>';
										//if(result[i].district != null && result[i].district == 'ZTotal'){
											//str+='<td>'+result[i].noProjects+'</td>';
										//}else{
											//str+='<td class="sectorWiseCuntCls" attr_block_name="'+type+'" attr_category="'+category+'" attr_district="'+result[i].district+'" style="cursor:pointer;">'+result[i].noProjects+'</td>';
										//}
										//if(result[i].subList[j].category != null && result[i].subList[j].category == 'GREEN'){
											//str+='<td>-</td>';
										//}
										//str+='<td>'+result[i].investment+'</td>';
										//if(result[i].subList[j].category != null && result[i].subList[j].category == 'GREEN'){
											//str+='<td>-</td>';
										//}
										//str+='<td>'+result[i].employment+'</td>';
										 for(var j in result[i].subList)
										{
											if(result[i].subList[j].category != null && result[i].subList[j].category == 'DROPPED'){
												if(result[i].subList[j].noProjects == 'undefined' || result[i].subList[j].noProjects === undefined)
												{
													str+='<td class="dropedCls'+type+'" style="display:none;">-</td>';
												}else{
													str+='<td class="dropedCls'+type+'" style="display:none;">'+result[i].subList[j].noProjects+'</td>';
												}
												
												if(result[i].subList[j].investment == 'undefined' || result[i].subList[j].investment === undefined)
												{
													str+='<td class="dropedCls'+type+'" style="display:none;">-</td>';
												}else{
													str+='<td class="dropedCls'+type+'" style="display:none;">'+result[i].subList[j].investment+'</td>';
												}
												
												if(result[i].subList[j].employment == 'undefined' || result[i].subList[j].employment === undefined)
												{
													str+='<td class="dropedCls'+type+'" style="display:none;">-</td>';
												}else{
													str+='<td class="dropedCls'+type+'" style="display:none;">'+result[i].subList[j].employment+'</td>';
												}	
											}else{
												if(result[i].subList[j].noProjects == 'undefined' || result[i].subList[j].noProjects === undefined)
												{
													str+='<td>-</td>';
												}else{
													str+='<td>'+result[i].subList[j].noProjects+'</td>';
												}
												if(result[i].subList[j].category != null && result[i].subList[j].category == 'GREEN'){
													str+='<td>-</td>';
												}
												if(result[i].subList[j].investment == 'undefined' || result[i].subList[j].investment === undefined)
												{
													str+='<td>-</td>';
												}else{
													str+='<td>'+result[i].subList[j].investment+'</td>';
												}
												if(result[i].subList[j].category != null && result[i].subList[j].category == 'GREEN'){
													str+='<td>-</td>';
												}
												if(result[i].subList[j].employment == 'undefined' || result[i].subList[j].employment === undefined)
												{
													str+='<td>-</td>';
												}else{
													str+='<td>'+result[i].subList[j].employment+'</td>';
												}
											}
										} 
									str+='</tr>';
								str+='</tfoot>';
							}
						}						
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';		
		if(divType == 'body')
		{
			$("#"+type+"OverviewBlockCheckBoxId").html(cstr);
			$("#"+type+"OverviewBlockDivId").html(str);
			
		}else{
			$("#modalTitleId").html(type);
			$("#cohortId").html(str);
		}
		$("#"+type+"DataTable"+divType).dataTable({
			"retrieve": true,
		});
	}
}
function getAPInnovationSocietyOverview(type,divId){
	$("#"+divId).html(spinner);
	var json = {
		fromDate:"",
		toDate:"",
		year:""
	}
	$.ajax({                
		type:'POST',    
		url: 'getAPInnovationSocietyOverview',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(type == 'onload')
		{
			$("#apInnovationSociety").html(result.startups);
		}else if(type == 'overview'){
			return buildOverview(result,divId);
		}
	});		
	function buildOverview(result,divId)
	{
		var str='';
		var dataArr = [{"name":'startups',"color":"#007810"},{"name":"schools","color":"#5C28AB"},{"name":"colleges","color":"#F75C5D"},{"name":"incubators","color":"#D28000"},{"name":"mentors","color":"#950038"}];
		str+='<div class="row">';
		for(var i in dataArr)
		{
			str+='<div class="col-sm-2">';
				str+='<div class="panel panel-default">';
					str+='<div class="panel-body"><h4 class=" text-capitalize" style="color:'+dataArr[i].color+'">'+dataArr[i].name+' &nbsp;&nbsp;<img src="Assests/icons/ITC/'+dataArr[i].name+'.png"/></h4></div>';
					if(dataArr[i].name == 'startups')
					{
						str+='<div class="panel-footer"><h4>'+result.startups+'</h4></div>';
					}else if(dataArr[i].name == 'schools')
					{
						str+='<div class="panel-footer"><h4>'+result.schools+'</h4></div>';
					}else if(dataArr[i].name == 'colleges')
					{
						str+='<div class="panel-footer"><h4>'+result.colleges+'</h4></div>';
					}else if(dataArr[i].name == 'incubators')
					{
						str+='<div class="panel-footer"><h4>'+result.incubators+'</h4></div>';
					}else if(dataArr[i].name == 'mentors')
					{
						str+='<div class="panel-footer"><h4>'+result.mentors+'</h4></div>';
					}
				str+='</div>';
			str+='</div>';
		}
		str+='</div>';
		$("#"+divId).html(str);
	}
}
function getAPISXLR8APDetailedData(){
	$("#APISXLr8APOverview,#Campaigns").html(spinner);
	var json = {
		fromDate:"",
		toDate:"",
		year:""
	}
	$.ajax({                
		type:'POST',    
		url: 'getAPISXLR8APDetailedData',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		return buildData(result);
	});
	function buildData(result)
	{
		var overview = '';
		var tableView ='';
		var totalBatches = 0;
		var totalCompanies = 0;
		var totalJobsCreated = 0;
		for(var i in result)
		{
			totalBatches = result.length;
			totalCompanies = totalCompanies + result[i].companiesRegisterd;
			if(result[i].jobsCreated != null && result[i].jobsCreated != '-' && result[i].jobsCreated.length > 0)
			{
				totalJobsCreated = totalJobsCreated + parseInt(result[i].jobsCreated);
			}
		}
		overview+='<div class="white_block_ITC" style="border:1px solid #F87071;border-radius:5px;">';
			overview+='<h4 class="m_top10"><span  style="padding:5px 10px;background-color:#F87071">APIS-XLr8AP</span></h4>';
			overview+='<div style="padding:10px;">';
				overview+='<div class="row">';
					overview+='<div class="col-sm-12">';
						overview+='<h4>Batches</h4>';
						overview+='<h3 class="m_top10">'+totalBatches+'</h3>';
					overview+='</div>';
					overview+='<div class="col-sm-6">';
						overview+='<h4>Companies Registered</h4>';
						overview+='<h3 class="m_top10">'+totalCompanies+'</h3>';
					overview+='</div>';
					overview+='<div class="col-sm-6">';
						overview+='<h4>Job Created</h4>';
						overview+='<h3 class="m_top10">'+totalJobsCreated+'</h3>';
					overview+='</div>';
				overview+='</div>';
			overview+='</div>';
		overview+='</div>';
		
		tableView+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
			tableView+='<div class="panel panel-default panel-black">';
				tableView+='<div class="panel-heading" role="tab" id="headingOne">';
					tableView+='<a role="button" class="panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">';
						tableView+='<h4 class="panel-title">APIS-XLr8AP</h4>';
					tableView+='</a>';
				tableView+='</div>';
				tableView+='<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">';
					tableView+='<div class="panel-body">';
						tableView+='<table class="table table-bordered" id="APISXLr8APOverviewTable">';
							tableView+='<thead>';
								tableView+='<th>Batch</th>';
								tableView+='<th style="background-color:#F8F8F8">Duration</th>';
								tableView+='<th style="background-color:#FFFAF3">Companies Registered</th>';
								tableView+='<th style="background-color:#FFFAF3">Jobs Created</th>';
							tableView+='</thead>';
							for(var i in result)
							{
								tableView+='<tr>';
									tableView+='<td class="cohortIdClick" style="cursor:pointer" attr_id="'+result[i].batchId+'">'+result[i].batch+'</td>';
									tableView+='<td style="background-color:#F8F8F8">'+result[i].duration+'</td>';
									tableView+='<td style="background-color:#FFFAF3">'+result[i].companiesRegisterd+'</td>';
									tableView+='<td style="background-color:#FFFAF3">'+result[i].jobsCreated+'</td>';
								tableView+='</tr>';
							}
						tableView+='</table>';
					tableView+='</div>';
				tableView+='</div>';
			tableView+='</div>';
		tableView+='</div>';
		
		$("#APISXLr8AP").html(overview);
		$("#APISXLr8APOverview").html(tableView);
		$("#APISXLr8APOverviewTable").dataTable({
			"retrieve": true,
		})
	}
}
function getCampaignsDetailedData(){
	$("#campaignsOverviewBlock,#Campaigns").html(spinner);
	var json = {
		fromDate:"",
		toDate:"",
		year:""
	}
	$.ajax({                
		type:'POST',    
		url: 'getCampaignsDetailedData',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		return buildData(result);
	});	
	function buildData(result)
	{
		var overview = '';
		var tableView ='';
		overview+='<div class="white_block_ITC" style="border:1px solid #D78F1F;border-radius:5px;">';
			overview+='<h4 class="m_top10"><span  style="padding:5px 10px;background-color:#D78F1F">Campaigns</span></h4>';
			overview+='<div style="padding:10px;">';
				overview+='<div class="row">';
					overview+='<div class="col-sm-12 m_top25" style="margin-bottom:42px;">';
						overview+='<h4>Batchs</h4>';
						overview+='<h3>'+result.length+'</h3>';
					overview+='</div>';
				overview+='</div>';
			overview+='</div>';
		overview+='</div>';
		tableView+='<div class="panel-group" id="accordionCampaign" role="tablist" aria-multiselectable="true">';
			tableView+='<div class="panel panel-default panel-black">';
				tableView+='<div class="panel-heading" role="tab" id="headingOneCampaign">';
					tableView+='<a role="button" class="panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordionCampaign" href="#collapseOneCampaign" aria-expanded="true" aria-controls="collapseOneCampaign">';
						tableView+='<h4 class="panel-title">Campaigns</h4>';
					tableView+='</a>';
				tableView+='</div>';
				tableView+='<div id="collapseOneCampaign" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOneCampaign">';
					tableView+='<div class="panel-body">';
						tableView+='<table class="table table-bordered m_top20" id="campaignsOverviewBlockTable">';
							tableView+='<thead>';
								tableView+='<th style="background-color:#FFFAF3">Name</th>';
								tableView+='<th>Submited Date</th>';
								tableView+='<th>Campaign Name</th>';
								tableView+='<th>Campaign Type</th>';
							tableView+='</thead>';
							for(var i in result)
							{
								tableView+='<tr>';
									tableView+='<td style="background-color:#FFFAF3">'+result[i].location+'</td>';
									tableView+='<td>'+result[i].duration+'</td>';
									tableView+='<td>'+result[i].campaignName+'</td>';
									tableView+='<td>'+result[i].campaignType+'</td>';
								tableView+='</tr>';
							}
						tableView+='</table>';
					tableView+='</div>';
				tableView+='</div>';
			tableView+='</div>';
		tableView+='</div>';
		
		$("#Campaigns").html(overview);
		$("#campaignsOverviewBlock").html(tableView);
		$("#campaignsOverviewBlockTable").dataTable({
			"retrieve": true,
		})
	}	
}
function getCampusInnovationCentersDetailedData(){
	$("#campusOverviewBlock,#CampusInnovationCenters").html(spinner);
	var json = {
		fromDate:"",
		toDate:"",
		year:""
	}
	$.ajax({                
		type:'POST',    
		url: 'getCampusInnovationCentersDetailedData',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		return buildData(result);
	});	
	function buildData(result)
	{
		var overview = '';
		var tableView ='';
		overview+='<div class="white_block_ITC" style="border:1px solid #4C4C4C;border-radius:5px;">';
			overview+='<h4 class="m_top10"><span  style="padding:5px 10px;background-color:#4C4C4C;color:#fff;">Campus Innovation Centers</span></h4>';
			overview+='<div style="padding:10px;">';
				overview+='<div class="row">';
					overview+='<div class="col-sm-12 m_top25" style="margin-bottom:42px;">';
						overview+='<h4>No Of University / No Of  College</h4>';
						overview+='<h3>'+result.length+'</h3>';
					overview+='</div>';
				overview+='</div>';
			overview+='</div>';
		overview+='</div>';
		tableView+='<div class="panel-group" id="accordionCampus" role="tablist" aria-multiselectable="true">';
			tableView+='<div class="panel panel-default panel-black">';
				tableView+='<div class="panel-heading" role="tab" id="headingOneCampus">';
					tableView+='<a role="button" class="panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordionCampus" href="#collapseOneCampus" aria-expanded="true" aria-controls="collapseOneCampus">';
						tableView+='<h4 class="panel-title">Campus Innovation Centers</h4>';
					tableView+='</a>';
				tableView+='</div>';
				tableView+='<div id="collapseOneCampus" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOneCampus">';
					tableView+='<div class="panel-body">';
						tableView+='<table class="table table-bordered m_top20" id="campusOverviewBlockTable">';
							tableView+='<thead>';
								tableView+='<th style="background-color:#F8F8F8">NAME OF THE UNIVERSITY OR COLLEGE</th>';
								tableView+='<th>NAME OF THE INNOVATION CENTRE</th>';
								tableView+='<th>LOCATION</th>';
							tableView+='</thead>';
							for(var i in result)
							{
								tableView+='<tr>';
									tableView+='<td style="background-color:#F8F8F8">'+result[i].universityORCollegeName+'</td>';
									tableView+='<td>'+result[i].innovationCentreName+'</td>';
									tableView+='<td>'+result[i].location+'</td>';
								tableView+='</tr>';
							}
						tableView+='</table>';
					tableView+='</div>';
				tableView+='</div>';
			tableView+='</div>';
		tableView+='</div>';
		$("#CampusInnovationCenters").html(overview);
		$("#campusOverviewBlock").html(tableView);
		$("#campusOverviewBlockTable").dataTable({
			"retrieve": true,
		})
	}	
}
function getCohortDetailsByCohortId(id){
	$("#cohortId").html(spinner);
	var json = {
		fromDate:"",
		toDate:"",
		year:"",
		searchLevelId:id
	}
	$.ajax({                
		type:'POST',    
		url: 'getCohortDetailsByCohortId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			return buildData(result);
		}else{
			$("#cohortId").html("NO DATA AVAILABLE");
		}
	});		
	function buildData(result)
	{
		var str='';
		str+='<table class="table table-bordered" id="cohortIdTable">';
			str+='<thead class="text-capital">';
				str+='<th>cohort</th>';
				str+='<th>innovator name</th>';
				str+='<th>company name</th>';
				str+='<th>permanent</th>';
				str+='<th>Intern</th>';
				str+='<th>innovation</th>';
			str+='</thead>';
			for(var i in result)
			{
				str+='<tr>';
					str+='<td>'+result[i].cohort+'</td>';
					str+='<td>'+result[i].innovator_name+'</td>';
					str+='<td>'+result[i].company_name+'</td>';
					if(result[i].permanent_jobs != null && result[i].permanent_jobs.length > 0)
					{
						str+='<td>'+result[i].permanent_jobs+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].interns != null && result[i].interns.length > 0)
					{
						str+='<td>'+result[i].interns+'</td>';
					}else{
						str+='<td>-</td>';
					}
					str+='<td>'+result[i].innovation+'</td>';
				str+='</tr>';
			}
		str+='</table>';
		$("#cohortId").html(str);
		$("#cohortIdTable").dataTable({
			"retrieve": true,
		});
	}
}

var eOfcDeptResult = '';
/* function getEOfcDepartWiseOverviewDetails(type){
	if(type == 'onload')
	{
		$("#itcDeptWiseCount").html(spinner);
	}else{
		$("#eOfficeDeparmentsOverViewBlock").html(spinner);
	}
	var json = {
		departmentid:"",		
	}
	$.ajax({                
		type:'POST',    
		url: 'getEOfcDepartWiseOverviewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		eOfcDeptResult = result;
		//getEofficeDesignationWiseDetails()
		if(type == 'onload')
		{
			for(var i in result){
				if(result[i].departmentName != null && result[i].departmentName == "ITE & C")
					$("#itcDeptWiseCount").html(result[i].totalCount+'/<small style="color:#fff;font-size:14px;top:0px;">'+result[i].created+'</small>');
			}
		}else{
			buildEOfcDepartWiseOverviewDetails(result);
		}
	});		
} */
//getEOfcDepartOverviewDetails
function getEOfcDepartWiseOverviewDetails(type){
	if(type == 'onload')
	{
		$("#itcDeptWiseCount").html(spinner);
	}else{
		$("#eOfficeDeparmentsOverViewBlock").html(spinner);
	}
	var json = {
		//fromDate:"",	
		//toDate:""	
	}
	$.ajax({                
		type:'POST',    
		url: 'getEOfcDepartOverviewDetailsNew',//'getEOfcDepartOverviewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		eOfcDeptResult = result;
		//getEofficeDesignationWiseDetails()
		if(type == 'onload')
		{
			for(var i in result){
				if(result[i].departmentName != null && result[i].departmentName == "ITE & C")
					$("#itcDeptWiseCount").html(result[i].totalCount+'/<small style="color:#fff;font-size:14px;top:0px;">'+result[i].created+'</small>');
			}
		}else{
			buildEOfcDepartWiseOverviewDetails(result);
		}
	});		
}
function getEOfcDeptPendancyStatusWiseDetails(){
	$("#departmentWise").html(spinner);
	var json = {
		departmentid:"",		
	}
	$.ajax({                
		type:'POST',    
		url: 'getEOfcDeptPendancyStatusWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			return buildTable(result);
		}else{
			$("#departmentWise").html("NO DATA AVAILABLE");
		}
	});
	function buildTable(result)
	{
		var tableView = '';
		tableView+='<div class="table-responsive">';
			tableView+='<table class="table table-bordered" id="eOfcDataTableId">';
				tableView+='<thead>';
					tableView+='<th style="background-color:#fff;">Departments</th>';
					tableView+='<th style="background-color:#B2DFDB">Total</th>';
					tableView+='<th style="background-color:#FBACAC">Total Pendency</th>';
					tableView+='<th style="background-color:#FBACAC">%</th>';
					tableView+='<th style="background-color:#FDCECE">0 - 7 days</th>';
					tableView+='<th style="background-color:#FDCECE">8 - 15 days</th>';
					tableView+='<th style="background-color:#FDCECE">16 - 30 days</th>';
					tableView+='<th style="background-color:#FDCECE">31 - 60 days</th>';
					tableView+='<th style="background-color:#FDCECE"> > 60 days</th>';
				tableView+='</thead>';
				for(var i in result)
				{
					tableView+='<tr>';
						tableView+='<td>'+result[i].departmentName+'</td>';
						tableView+='<td style="background-color:#B2DFDB">'+result[i].created+'</td>';
						tableView+='<td style="background-color:#FBACAC">'+result[i].totalCount+'</td>';
						tableView+='<td style="background-color:#FBACAC">'+result[i].percentage+'</td>';
						tableView+='<td style="background-color:#FDCECE">'+result[i].zeroToSeven+'</td>';
						tableView+='<td style="background-color:#FDCECE">'+result[i].eightToFifteen+'</td>';
						tableView+='<td style="background-color:#FDCECE">'+result[i].sixteenToThirty+'</td>';
						tableView+='<td style="background-color:#FDCECE">'+result[i].thirtyoneToSixty+'</td>';
						tableView+='<td style="background-color:#FDCECE">'+result[i].aboveSixty+'</td>';
					tableView+='</tr>';
				}			
			tableView+='</table>';
		tableView+='</div>';
		$("#departmentWise").html(tableView);
		$("#eOfcDataTableId").dataTable({
			"retrieve": true
		});
	}
}

function getEofficeDesignationWiseDetails(){
	$("#eOfficeBlock4").html(spinner);
	var json = {
		designation:"",		
	}
	$.ajax({                
		type:'POST',    
		url: 'getEofficeDesignationWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			return buildTable(result);
		}else{
			$("#eOfficeBlock4").html("NO DATA AVAILABLE");
		}
	});
	function buildTable(result)
	{
		var tableView = '';
		var colorsArr = ['#009587','#84ED50','#FFB300','#FF2C95','#F75C5D','#FF2C95','#FFB300','#009587','#84ED50','#FFB300','#FF2C95','#F75C5D','#FF2C95','#FFB300'];
		tableView+='<div class="table-responsive" style="height:600px;">';
			tableView+='<table class="table-desig">';
				tableView+='<tr>';
					tableView+='<td>DEPARTMENT WISE</td>';
					for(var i in eOfcDeptResult)
					{
						tableView+='<td style="border-left:3px solid '+colorsArr[i]+'">';
							tableView+='<p class="f-16"><b>'+eOfcDeptResult[i].departmentName+'</b></p>';
							tableView+='<p>'+eOfcDeptResult[i].totalCount+' / <small>'+eOfcDeptResult[i].created+'</small></p>';
						tableView+='</td>';
					}
				tableView+='</tr>';
				for(var i in result)
				{
					tableView+='<tr>';
						tableView+='<td>'+result[i].designation+'</td>';
						for(var j in result[i].subList)
						{
							tableView+='<td style="border-left:3px solid '+colorsArr[j]+'">';
								tableView+='<p class="f-16"><b>'+result[i].subList[j].employeeName+'</b></p>';
								tableView+='<p>'+result[i].subList[j].totalCount+' / <small>'+result[i].subList[j].created+'</small></p>';
							tableView+='</td>';
						}
					tableView+='</tr>';
				}
			tableView+='</table>';
		tableView+='</div>';
		$("#eOfficeBlock4").html(tableView);
		//$(".table-desig-scroll").mCustomScrollbar({setHeight:'500px'});
	}
}
function getEofficeDesignationWisePendencyDetails()
{
	$("#eOfficePendencyWise").html(spinner);
	var json = {
		departmentid:"",		
	}
	$.ajax({                
		type:'POST',    
		url: 'getEofficeDesignationWisePendencyDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			buildTabs(result);
		}else{
			$("#eOfficePendencyWise").html("NO DATA AVAILABLE");
		}
	});
	function buildTabs(result)
	{
		var tabView = '';
		tabView+='<div class="row">';
			/* tabView+='<div class="col-sm-3">';
				tabView+='<div class="eOfcScroll">';
					tabView+='<ul class="nav nav-tabs tab-view-eofc" role="tablist">';
						tabView+='<li role="presentation" class="active"><a EofficeDesignationId="" EofficeDesignation="departmentWise" href="#departmentWise" aria-controls="departmentWise" role="tab" data-toggle="tab">DEPARTMENT WISE</a></li>';
						for(var i in result)
						{
							tabView+='<li role="presentation"><a EofficeDesignationId="'+result[i].departmentId+'" EofficeDesignation="'+result[i].designation.replace(/\s+/g, '')+'" href="#'+result[i].designation.replace(/\s+/g, '')+'" aria-controls="'+result[i].designation.replace(/\s+/g, '')+'" role="tab" data-toggle="tab">'+result[i].designation+'</a></li>';
						}
					tabView+='</ul>';
				tabView+='</div>';
			tabView+='</div>'; */
			tabView+='<div class="col-sm-12">';
				/* tabView+='<div class="tab-content">';
					tabView+='<div role="tabpanel" class="tab-pane active" id="departmentWise">'+spinner+'</div>';
					
						tabView+='<div role="tabpanel" class="tab-pane" id="'+result[i].designation.replace(/\s+/g, '')+'">'; */
							tabView+='<div class="table-responsive">';
								tabView+='<table class="table table-bordered" id="eOfcDataTableId">';
									tabView+='<thead>';
										tabView+='<th style="background-color:#fff;">Designation</th>';
										tabView+='<th style="background-color:#fff;">Employee</th>';
										tabView+='<th style="background-color:#B2DFDB">Total</th>';
										tabView+='<th style="background-color:#FBACAC">Total Pendency</th>';
										tabView+='<th style="background-color:#FBACAC">%</th>';
										tabView+='<th style="background-color:#FDCECE">0 - 7 days</th>';
										tabView+='<th style="background-color:#FDCECE">8 - 15 days</th>';
										tabView+='<th style="background-color:#FDCECE">16 - 30 days</th>';
										tabView+='<th style="background-color:#FDCECE">31 - 60 days</th>';
										tabView+='<th style="background-color:#FDCECE"> > 60 days</th>';
									tabView+='</thead>';
									for(var i in result)
									{
										for(var j in result[i].subList)
										{
											tabView+='<tr>';
												tabView+='<td>'+result[i].designation+'</td>';
												tabView+='<td>'+result[i].subList[j].employeeName+'</td>';
												tabView+='<td style="background-color:#B2DFDB">'+result[i].subList[j].created+'</td>';
												tabView+='<td style="background-color:#FBACAC">'+result[i].subList[j].totalCount+'</td>';
												tabView+='<td style="background-color:#FBACAC">'+result[i].subList[j].percentage+'</td>';
												tabView+='<td style="background-color:#FDCECE">'+result[i].subList[j].zeroToSeven+'</td>';
												tabView+='<td style="background-color:#FDCECE">'+result[i].subList[j].eightToFifteen+'</td>';
												tabView+='<td style="background-color:#FDCECE">'+result[i].subList[j].sixteenToThirty+'</td>';
												tabView+='<td style="background-color:#FDCECE">'+result[i].subList[j].thirtyoneToSixty+'</td>';
												tabView+='<td style="background-color:#FDCECE">'+result[i].subList[j].aboveSixty+'</td>';
											tabView+='</tr>';
										}
									}									
								tabView+='</table>';
						/* 	tabView+='</div>';
						tabView+='</div>'; */
					
				tabView+='</div>';
			tabView+='</div>';
		tabView+='</div>';
		$("#eOfficePendencyWise").html(tabView);
		$("#eOfcDataTableId").dataTable({
			"retrieve": true
		});
		//getEOfcDeptPendancyStatusWiseDetails();
	}
}
function getMeesavaKpiGraphBuild(divId,id){
	var str='';
	var dateWiseArr=['Monthly','Quarterly','HalfYearly','Yearly']
	var meesavaCenterOpenedArr=[{name:"Srikakulam",id:45},{name:"Vizianagaram",id:0},{name:"Visakhapatnam",id:0},{name:"East Godavari",id:74},{name:"West Godavari",id:341},{name:"Krishna",id:0},{name:"Guntur",id:36},{name:"Prakasam",id:0},{name:"Sri Potti Sriramulu Nellore",id:0},{name:"Chittoor",id:0},{name:"Y.S.R",id:0},{name:"Ananthapuramu",id:53},{name:"Kurnool",id:0},{name:"Total",id:549}]
	
	var meesavaOnlineArr=[{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE CHANGE OF FIRM NAME',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE CHANGE OF OFFICE ADDRESS',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE CHANGE OF RESPONSIBLE PERSON DETAILS',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE DELETION OF UNITS',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE INCLUSION OF IMPORTED PRIVATE VARIETIES',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE INCLUSION OF NOTIFIED VARIETIES',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE INCLUSION OF PRIVATE VARIETIES FOR STORAGE',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE INCLUSION OF PRIVATE VARIETY FOR REGULAR MARKETING',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE INCLUSION OF PRIVATE VARIETY FOR TRAIL MARKETING',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT CENTRALIZED SEED LICENSE INCLUSION OF UNITS',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT SEED DEAER LICENSE CHANGE OF FIRM NAME',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT SEED DEALER CHANGE OF OFFICE ADDRESS',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT SEED DEALER LICENSE CHANGE IN SALE POINT PREMISES',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT SEED DEALER LICENSE CHANGE OF PERSON RESPONSIBLE',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT SEED DEALER LICENSE STORAGE POINT INCLUSION',year:"2016-2017"},{name:'AGRICULTURE',service:'AMENDMENT SEED DEALER STORAGE POINT DELETION',year:"2016-2017"},{name:'AGRICULTURE',service:'DUPLICATE CENTRALIZED SEED LICENSE',year:"2016-2017"},{name:'AGRICULTURE',service:'DUPLICATE SEED DEALER LICENSE',year:"2016-2017"},{name:'AGRICULTURE',service:'NEW CENTRALIZED SEED LICENSE',year:"2016-2017"},{name:'AGRICULTURE',service:'NEW SEED DEALER LICENSE',year:"2016-2017"},{name:'AGRICULTURE',service:'OTHER STATE OFFICE ADDRESS CHANGE FOR AMENDMENT SEED CSL',year:"2016-2017"},{name:'AGRICULTURE',service:'RENEWAL CENTRALIZED SEED LICENSE',year:"2016-2017"},{name:'AGRICULTURE',service:'RENEWAL SEED DEALER LICENSE',year:"2016-2017"},{name:'CRDA',service:'My Brick - My Amaravati',year:"2016-2017"},{name:'ELECTION',service:'Correct your Card (Form - 8)',year:"2016-2017"},{name:'ELECTION',service:'Know your status',year:"2016-2017"},{name:'ELECTION',service:'New Enrollment (Form - 6)',year:"2016-2017"},{name:'ELECTION',service:'Objection to Inclusion of Names (Form - 7)',year:"2016-2017"},{name:'ELECTION',service:'Transpose your Card (Form - 8A)',year:"2016-2017"},{name:'HEALTH CARE',service:'AP Pharmacy Council Fee Payment',year:"2016-2017"},{name:'Income Tax Pan Services Unit',service:'Changes or Corrections in PAN Details',year:"2016-2017"},{name:'Income Tax Pan Services Unit',service:'New Pan for Foreign Citizens (Form 49AA)',year:"2016-2017"},{name:'Income Tax Pan Services Unit',service:'New Pan for Indian Citizens (Form 49A)',year:"2016-2017"},{name:'Income Tax Pan Services Unit',service:'Reprint of PAN Card',year:"2016-2017"},{name:'Income Tax Pan Services Unit',service:'Status Track for PAN Application',year:"2016-2017"},{name:'Income Tax Pan Services Unit',service:'Transaction Status Enquiry',year:"2016-2017"},{name:'LABOUR',service:'APPLICATION FOR AMENDMENT OF ISSUE OF INTEGRATED REGISTRATION OF ESTABLISHMENT UNDER LABOUR LAWS',year:"2016-2017"},{name:'LABOUR',service:'Combined Annual Return under Labour Laws',year:"2016-2017"},{name:'MEE BHOOMI (REVENUE)',service:'Aadhaar Seeding Request',year:"2016-2017"},{name:'MEE BHOOMI (REVENUE)',service:'FMB',year:"2016-2017"},{name:'MEE BHOOMI (REVENUE)',service:'ROR 1B',year:"2016-2017"},{name:'MEE BHOOMI (REVENUE)',service:'Village Adangal',year:"2016-2017"},{name:'MEE BHOOMI (REVENUE)',service:'Village Map Copy',year:"2016-2017"},{name:'MEE BHOOMI (REVENUE)',service:'Village ROR',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'Building Permission',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'House Tax online Payment',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'Layout Permission',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'Marriage Certificate',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'Mutation',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'NOC for small,medium and large scale industries',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'Private Water Tap Connection',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'Property Valuation Certificate',year:"2016-2017"},{name:'PANCHAYATHIRAJ DEPARTMENT',service:'Trade License',year:"2016-2017"},{name:'REVENUE',service:'Issuance Of Local Status Certificate',year:"2016-2017"},{name:'TECHNICAL EDUCATION',service:'e Pariksha Exam Fee Payment Service',year:"2016-2017"},{name:'APMAPB (Ayush): Andhra Pradesh Medical & Aromatic Plants Board',service:'FARMERS SUBSIDY APPLICATION FORM',year:"2016-2017"}]
	
	var meesavaAppArr=['TSSPDCL','Aadhaar Card Printing','Vodafone','Aircel','Bsnl','Idea','Indicom','Docomo','Reliance GSM','Uninor','Airtel','Relinace CDMA','Airtel TV','Big TV','Dish TV','Sun TV','Tatasky TV','Videcon TV','Reliance NetConnect','Idea Netsetter','BSNL Data','Aircel Data','AIRTEL - Postpaid','BSNL LANDLINE','IDEA - Postpaid','Tata Docomo - Postpaid','Vodafone - Postpaid','Aircel - Postpaid','Reliance - Postpaid','AIRTEL Landline','CellOne - Postpaid','BSNL','Tikona','Airtel','Idea','Aircel','MTS','Reliance CDMA','Tata Indicom','Tata Docomo','Vodafone','Uninor','T24','Airtel Data','Idea Netsetter','BSNL Data','Vodafone Data','Airtel DTH','DISH TV','SUN TV','Videocon D2H','Reliance GSM','LIC','SBI LIFE','ICICI PRUDENTIAL','AVIVA','Hyderabad Metropolitan Water Supply & Sewerage Board','Bookmyshow','Airtel','Idea','Reliance CDMA','Reliance GSM','Tata Indicom','Tata Docomo','Uninor','Vodafone','JIO','ADANGAL / PHAHANI','ROR 1B','BIRTH CERTIFICATE','DEATH CERTIFICATE','AGRICULTURE INCOME','INCOME CERTIFICATE','EBC CERTIFICATE','OBC CERTIFICATE','INTEGRATED CERTIFICATE','FAMILY MEMBERSHIP','NO EARNING MEMBER','ENCUMBRANCE CERTIFICATE','Sri Kalahasteeswara Swamy Vari Devasthanam Seva Booking, Srikalahasti','Sri Durga Malleswara Swamy Seva Booking, Vijayawada','Sri Venkateswara Swamy Seva Booking, Dwaraka Tirumala','AMARAVATI DONATIONS','F.M.B COPY','New Issuance Of Voter/EPIC Card(PVC)','Re-Issuance of Integrated Certificate','Issuance Of Voter/EPIC Card','Child Name Inclusion - CDMA','Corrections in birth certificate -CDMA','Non availability birth application - CDMA','Non availability death application - CDMA','Late Registration Of Birth/Death','Surrender of Ration Card','New Gas Connection Application','Sanction of Incentives','Sri Kalahasteeswara Swamy Temple Room Booking, Srikalahasti','Sri Veera Venkata Satyanarayana Swamy Temple Room Booking, Annavaram','Sri Venkateswara Swamy Temple Room Booking, Dwaraka Tirumala','POSESSION CERTIFICATE','Corrections in death certificate -CDMA','Ration Card Transfer','AIRTEL POSTPAID','AIRTEL LANDLINE','IDEA POSTPAID','ELECTRICITY BILL - EPDCL','ELECTRICITY BILL - SPDCL','Traffic Challan - Chittoor Dist','Traffic Challan - Prakasam Dist','Traffic Challan - Vizianagaram Dist','Traffic Challan - West Godavari Dist','Traffic Challan - Nellore Dist','Traffic Challan - East Godavari Dist','Traffic Challan - Krishna Dist','Traffic Challan - Srikakulam Dist','Traffic Challan - Ananthapur Dist','Traffic Challan - VISAKHAPATNAM Dist']
	
		str+='<div class="row">';
			str+='<ul class="list-inline calendar_active_IHHL_cls meesavaKpi">';
				str+='<li class="active" attr_type="meesavaCenterEst" >No.of MeeSeva Centres Established</li>';
				str+='<li attr_type="meeasvaCenterOpen">No.of Meeseva Centers opened</li>';
				str+='<li attr_type="meeasvaOnline">Online Services</li>';
				str+='<li attr_type="meesavaApp">MeeSeva App Services</li>';
			str+='</ul>';
		str+='</div>';
		
		str+='<div class="row">';
			str+='<div class="m_top20 meesavaCenterEst">';
			for(var i in dateWiseArr){
				str+='<div class="col-sm-3">';
					str+='<div id="indicatorProgressGraphId'+dateWiseArr[i]+'" style="height:300px;"></div>';
				str+='</div>';
			}
			str+='</div>';
		str+='</div>';
		
		str+='<div class="row">';
			str+='<div class="col-sm-6 meeasvaCenterOpen" style="display:none;">';
			str+='<div class="table-responsive">';
				str+='<table class="table table-bordered" id="meeasvaCenterOpenDT">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>District Name</th>';
						str+='<th>No.Of Meeseva Centers opened</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in meesavaCenterOpenedArr){
					str+='<tr>';
						str+='<td>'+meesavaCenterOpenedArr[i].name+'</td>';
						str+='<td>'+meesavaCenterOpenedArr[i].id+'</td>';
					str+='</tr>';
				}
				str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
		str+='</div>';
		
		str+='<div class="row">';
		str+='<div class="col-sm-12 meeasvaOnline" style="display:none;">';
			str+='<div class="table-responsive">';
				str+='<table class="table table-bordered" id="meeasvaOnlineDT">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Department Name</th>';
						str+='<th>No.Of Meeseva Centers opened</th>';
						str+='<th>Year</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in meesavaOnlineArr){
					str+='<tr>';
						str+='<td>'+meesavaOnlineArr[i].name+'</td>';
						str+='<td>'+meesavaOnlineArr[i].service+'</td>';
						str+='<td>'+meesavaOnlineArr[i].year+'</td>';
					str+='</tr>';
				}
				str+='</tbody>';
				str+='</table>';
			str+='</div>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="row">';
			str+='<div class="col-sm-6 meesavaApp" style="display:none;">';
			str+='<h4 style="text-align:center;text-transform:uppercase;"><b>Total Meesava  App  Services - 116</b></h4>';	
			str+='<div class="table-responsive m_top10">';
				str+='<table class="table table-bordered" id="meesavaAppDT">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>MeeSeva App Services </th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in meesavaAppArr){
					str+='<tr>';
						str+='<td>'+meesavaAppArr[i]+'</td>';
					str+='</tr>';
				}
				str+='</tbody>';
				str+='</table>';
			str+='</div>';
			str+='</div>';
		str+='</div>';
		
	$("#"+divId+"Block"+id).html(str);
	$("#meesavaAppDT ,#meeasvaOnlineDT, #meeasvaCenterOpenDT").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"retrieve": true
	});
	
	for(var i in dateWiseArr){
		var mainArr=[];
		if(dateWiseArr[i] == "Monthly"){
			var obj= {
				name:'Monthly',
				data:[{"y":300,color:"#009587"},{"y":549,color:"#ADD2CE"}]
			}
		}else if(dateWiseArr[i] == "Quarterly"){
			var obj= {
				name:'Quarterly',
				data:[{"y":800,color:"#009587"},{"y":1802,color:"#ADD2CE"}]
			}
		}else if(dateWiseArr[i] == "HalfYearly"){
			var obj= {
				name:'Half Yearly',
				data:[{"y":1400,color:"#009587"},{"y":1935,color:"#ADD2CE"}]
			}
		}else if(dateWiseArr[i] == "Yearly"){
			var obj= {
				name:'Yearly',
				data:[{"y":3499,color:"#009587"},{"y":1935,color:"#ADD2CE"}]
			}
		}
		mainArr.push(obj);
		$("#indicatorProgressGraphId"+dateWiseArr[i]).highcharts({
			chart: {
				type: 'column'
			},

			title: {
				text: dateWiseArr[i],
				align:'left',
					style: {
						color: '#000',
						font: 'bold 16px "Lato", sans-serif'
					}
			},
			xAxis: {
				 min: 0,
				 gridLineWidth: 0,
				 minorGridLineWidth: 0,	
				categories: ['Target', 'Achivement']
			},
			yAxis: {
				 min: 0,
				 gridLineWidth: 0,
				 minorGridLineWidth: 0,
				title: {
					text: ''
				},
			},
			legend: {
				enabled: false
			},
			tooltip: {
				formatter: function () {
					return '<b>' + this.x + '</b><br/>' +
						this.series.name + ': ' + this.y
				}
			},

			plotOptions: {
				column: {
				   // stacking: 'normal',
				      dataLabels: {
						enabled: true,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'gray',
						formatter: function() {
							return (this.y);
						},
					},
				}
			},

			series: mainArr
		});
		
	}
	
}
$(document).on("click",".calendar_active_IHHL_cls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var blockType = $(this).attr("attr_type");
	if(blockType == "meesavaCenterEst"){
		$(".meesavaCenterEst").show();
		$(".meeasvaCenterOpen").hide();
		$(".meeasvaOnline").hide();
		$(".meesavaApp").hide();
		
	}else if(blockType == "meeasvaCenterOpen"){
		$(".meesavaCenterEst").hide();
		$(".meeasvaCenterOpen").show();
		$(".meeasvaOnline").hide();
		$(".meesavaApp").hide();
	}else if(blockType == "meeasvaOnline"){
		$(".meesavaCenterEst").hide();
		$(".meeasvaCenterOpen").hide();
		$(".meeasvaOnline").show();
		$(".meesavaApp").hide();
	}else if(blockType == "meesavaApp"){
		$(".meesavaCenterEst").hide();
		$(".meeasvaCenterOpen").hide();
		$(".meeasvaOnline").hide();
		$(".meesavaApp").show();
	}
});

$(document).on("click",".sectorWiseCuntCls",function(){
	$("#sectorModalTitleId").html("");
	var sectorType = $(this).attr("attr_block_name");
	var category = $(this).attr("attr_category");
	var district = $(this).attr("attr_district");
	getSectorWiseOverviewCountDetails(sectorType,category,district);
});

function getSectorWiseOverviewCountDetails(sectorType,category,district){
	$("#sectorModalId").modal('show');
	$("#sectorModalDivId").html(spinner);
	
	var json = {
		leadName:"0",
		category:category,
		sector : sectorType,
		districtValue : district
	}
	$.ajax({                
		type:'POST',    
		url: 'getSectorWiseOverviewCountDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0)
		{
			return buildData(result,district,sectorType)
		}
	});
}
function buildData(result,district,sectorType){
	var str='';
	str+='<table class="table table-bordered" id="'+district.replace(/\s+/g, '')+'DataTable">';
		str+='<thead>';
			//str+='<th>District</th>';
			//str+='<th>Sector</th>';
			str+='<th>Sub Sector</th>';
			str+='<th>Department</th>';
			str+='<th>Company</th>';
			str+='<th>Line Of Activity</th>';
			str+='<th>Category</th>';
			str+='<th>Committed Investment(<i class="fa fa-inr"></i> in Cr.)</th>';
			str+='<th>Committed Employment</th>';
		str+='</thead>';
		for(var i in result)
		{
			str+='<tr>';
				//str+='<td>'+result[i].districtName+'</td>';
				//str+='<td>'+result[i].itSector+'</td>';
				str+='<td>'+result[i].subSector+'</td>';
				str+='<td>'+result[i].deptName+'</td>';
				str+='<td>'+result[i].nameOfCompany+'</td>';
				str+='<td>'+result[i].lineOfActivity+'</td>';
				str+='<td>'+result[i].category+'</td>';
				str+='<td>'+result[i].investment+'</td>';
				str+='<td>'+result[i].employment+'</td>';
			str+='</tr>';
		}
		
	str+='</table>';
	$("#sectorModalTitleId").html(district+' '+'District'+' '+sectorType+' '+'Industries'+' '+'Details');
	$("#sectorModalDivId").html(str);
	$("#"+district.replace(/\s+/g, '')+"DataTable").dataTable({
		"retrieve": true
	});
}

function getDepartmentWiseHierarchicalDetails(){
	$("#hieraricalViewErr").html(spinner);
	$("#hieraricalViewErr").append("<p>Please wait till the chart loads</p>");
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getDepartmentWiseHierarchicalDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#hieraricalViewErr").html(" ");
		var str='';
		str+='<button type="button" class="btn btn-default btn-sm hieraricalViewCls pull-right" attr_type="hide">Hide Graph View</button>';
		$("#hieraricalShowHideDiv").html(str);
		
		var hodCount = 0;
		var hodTotal = 0;
		for(var i in result)
		{
			if(i != 0 )
			{
				hodCount = hodCount + result[0].created;
				hodTotal = hodTotal + result[0].totalCount;
			}
		}
		var dataArr = [];
			dataArr.push({"id": 1, "parentId": 0, "Name": "SECRETARY IT,E & C DEPARTMENT", "title": "SECRETARY IT,E & C DEPARTMENT"});
			//dataArr.push({"id": 2, "parentId": 1, "Name": "MINISTER NARA LOKESH", "title": "MINISTER NARA LOKESH"});
			for(var i in result[0].ministerList)
			{
				dataArr.push({"id": 2, "parentId":1,"Name": result[0].ministerList[i].employeeName, "title": result[0].ministerList[i].employeeName, "postname": result[0].ministerList[i].postName, "count": result[0].ministerList[i].totalCount+"/"+result[0].ministerList[i].created});
			
			}
			dataArr.push({"id": 3, "parentId": 2, "Name": "VIJAYANAND", "title": "VIJAYANAND"});
			dataArr.push({"id": 4, "parentId": 3, "Name": "IT,E & C", "title": "IT,E & C", "count": result[0].totalCount+"/"+result[0].created});
			dataArr.push({"id": 5, "parentId": 3, "Name": "HODS", "title": "HODS", "count": hodTotal+"/"+hodCount});
			var k = 6;
			
			for(var i in result)
			{
				if(i == 0 )
				{
					dataArr.push({"id": k, "parentId": 4 , "Name": result[i].departmentName, "title": result[i].departmentName , "count": result[i].totalCount+"/"+result[i].created});
				}else{
					if(result[i].departmentName == 'ANDHRA PRADESH TECHNOLOGY SERVICES')
					{
						dataArr.push({"id": k, "parentId": 5, "Name": result[i].departmentName, "title": result[i].departmentName, "postname": "VALETI PREMCHAND", "count": result[i].totalCount+"/"+result[i].created});
					}else if(result[i].departmentName == 'DIRECTOR ESD')
					{
						dataArr.push({"id": k, "parentId": 5, "Name": result[i].departmentName, "title": result[i].departmentName, "postname": "SUNDAR B", "count": result[i].totalCount+"/"+result[i].created});
					}else if(result[i].departmentName == 'ANDHRAPRADESH INFORMATION TECHNOLOGY ACADEMY')
					{
						dataArr.push({"id": k, "parentId": 5, "Name": result[i].departmentName, "title": result[i].departmentName, "postname": "SUNDAR B", "count": result[i].totalCount+"/"+result[i].created});
					}else if(result[i].departmentName == 'ANDHRAPRADESH INNOVATION SOCIETY')
					{
						dataArr.push({"id": k, "parentId": 5, "Name": result[i].departmentName, "title": result[i].departmentName, "postname": "VALLI KUMARI VATSAVAYI", "count": result[i].totalCount+"/"+result[i].created});
					}else if(result[i].departmentName == 'ANDHRAPRADESH E PRAGATI AUTHORITY')
					{
						dataArr.push({"id": k, "parentId": 5, "Name": result[i].departmentName, "title": result[i].departmentName, "postname": "SUNDAR B", "count": result[i].totalCount+"/"+result[i].created});
					}else if(result[i].departmentName == 'ANDHRAPRADESH ELECTRONICS AND IT AGENCY')
					{
						dataArr.push({"id": k, "parentId": 5, "Name": result[i].departmentName, "title": result[i].departmentName, "postname": "K. BHASKAR REDDY", "count": result[i].totalCount+"/"+result[i].created});
					}else if(result[i].departmentName == 'SOCIETY FOR ANDHRA PRADESH NETWORK')
					{
						dataArr.push({"id": k, "parentId": 5, "Name": result[i].departmentName, "title": result[i].departmentName, "postname": "SUNDAR B", "count": result[i].totalCount+"/"+result[i].created});
					}
					
				}
				k = k +1;
			}
			for(var i in result[0].jsList)
			{
				dataArr.push({"id": k, "parentId": 6,"Name": result[0].jsList[i].employeeName, "title": result[0].jsList[i].employeeName, "postname": result[0].jsList[i].postName, "count": result[0].jsList[i].totalCount+"/"+result[0].jsList[i].created});
				k = k +1;
			}
			for(var i in result[0].directorList)
			{
				dataArr.push({"id": k, "parentId": 6, "Name": result[0].directorList[i].employeeName, "title": result[0].directorList[i].employeeName, "postname": result[0].directorList[i].postName, "count": result[0].directorList[i].totalCount+"/"+result[0].directorList[i].created});
				k = k +1;
			}
			for(var i in result[0].jdList)
			{
				dataArr.push({"id": k, "parentId": 6, "Name": result[0].jdList[i].employeeName, "title": result[0].jdList[i].employeeName, "postname": result[0].jdList[i].postName, "count": result[0].jdList[i].totalCount+"/"+result[0].jdList[i].created});
				k = k +1;
			}
			for(var i in result[0].specialOfficerList)
			{
				dataArr.push({"id": k, "parentId": 14, "Name": result[0].specialOfficerList[i].employeeName, "title": result[0].specialOfficerList[i].employeeName, "postname": result[0].specialOfficerList[i].postName, "count": result[0].specialOfficerList[i].totalCount+"/"+result[0].specialOfficerList[i].created});
				k = k +1;
			}
			for(var i in result[0].aaoList)
			{
				dataArr.push({"id": k, "parentId": 14, "Name": result[0].aaoList[i].employeeName, "title": result[0].aaoList[i].employeeName, "postname": result[0].aaoList[i].postName,"count": result[0].aaoList[i].totalCount+"/"+result[0].aaoList[i].created});
				k = k +1;
			}
			for(var i in result[0].pmList)
			{
				dataArr.push({"id": k, "parentId": 15, "Name": result[0].pmList[i].employeeName, "title": result[0].pmList[i].employeeName, "postname": result[0].pmList[i].postName,"count": result[0].pmList[i].totalCount+"/"+result[0].pmList[i].created});
				k = k +1;
			}
			for(var i in result[0].soList)
			{
				dataArr.push({"id": k, "parentId": 18, "Name": result[0].soList[i].employeeName, "title": result[0].soList[i].employeeName, "postname": result[0].soList[i].postName, "count": result[0].soList[i].totalCount+"/"+result[0].soList[i].created});
				k = k +1;
			}
			for(var i in result[0].asoList)
			{
				dataArr.push({"id": k, "parentId": 27, "Name": result[0].asoList[i].employeeName, "title": result[0].asoList[i].employeeName, "postname": result[0].asoList[i].postName, "count": result[0].asoList[i].totalCount+"/"+result[0].asoList[i].created});
				k = k +1;
			}
			for(var i in result[0].otherList)
			{
				dataArr.push({"id": k, "parentId": 28, "Name": result[0].otherList[i].employeeName, "title": result[0].otherList[i].employeeName, "postname": result[0].otherList[i].postName, "count": result[0].otherList[i].totalCount+"/"+result[0].otherList[i].created});
				k = k +1;
			}
			for(var i in result)
			{
				if(i != 0 )
				{
					if(result[i].otherList != null && result[i].otherList.length > 0)
					{
						for(var j in result[i].otherList)
						{
							if(result[i].departmentName == "ANDHRA PRADESH TECHNOLOGY SERVICES")
							{
								dataArr.push({"id": k, "parentId": 7, "Name": result[i].otherList[j].employeeName, "title": result[i].otherList[j].employeeName, "postname": result[i].otherList[j].postName, "count": result[i].otherList[j].totalCount+"/"+result[i].otherList[j].created});
								k = k +1;
							}else if(result[i].departmentName == "DIRECTOR ESD")
							{
								dataArr.push({"id": k, "parentId": 8, "Name": result[i].otherList[j].employeeName, "title": result[i].otherList[j].employeeName, "postname": result[i].otherList[j].postName, "count": result[i].otherList[j].totalCount+"/"+result[i].otherList[j].created});
								k = k +1;
							}else if(result[i].departmentName == "ANDHRAPRADESH INFORMATION TECHNOLOGY ACADEMY")
							{
								dataArr.push({"id": k, "parentId": 9, "Name": result[i].otherList[j].employeeName, "title": result[i].otherList[j].employeeName, "postname": result[i].otherList[j].postName, "count": result[i].otherList[j].totalCount+"/"+result[i].otherList[j].created});
								k = k +1;
							}else if(result[i].departmentName == "SOCIETY FOR ANDHRA PRADESH NETWORK")
							{
								dataArr.push({"id": k, "parentId": 10, "Name": result[i].otherList[j].employeeName, "title": result[i].otherList[j].employeeName, "postname": result[i].otherList[j].postName, "count": result[i].otherList[j].totalCount+"/"+result[i].otherList[j].created});
								k = k +1;
							}else if(result[i].departmentName == "ANDHRAPRADESH INNOVATION SOCIETY")
							{
								dataArr.push({"id": k, "parentId": 11, "Name": result[i].otherList[j].employeeName, "title": result[i].otherList[j].employeeName, "postname": result[i].otherList[j].postName, "count": result[i].otherList[j].totalCount+"/"+result[i].otherList[j].created});
								k = k +1;
							}else if(result[i].departmentName == "ANDHRAPRADESH E PRAGATI AUTHORITY")
							{
								dataArr.push({"id": k, "parentId": 12, "Name": result[i].otherList[j].employeeName, "title": result[i].otherList[j].employeeName, "postname": result[i].otherList[j].postName, "count": result[i].otherList[j].totalCount+"/"+result[i].otherList[j].created});
								k = k +1;
							}else if(result[i].departmentName == "ANDHRAPRADESH ELECTRONICS AND IT AGENCY")
							{
								dataArr.push({"id": k, "parentId": 13, "Name": result[i].otherList[j].employeeName, "title": result[i].otherList[j].employeeName, "postname": result[i].otherList[j].postName, "count": result[i].otherList[j].totalCount+"/"+result[i].otherList[j].created});
								k = k +1;
							}
						}
					}
					
				}
			}
		var peopleElement = document.getElementById("hieraricalView");
		orgChart = new getOrgChart(peopleElement, {
			primaryFields: ["name", "title", "postname", "count"],
			enableEdit: false,
			expandToLevel: 4,
			scale: 12,
			enableDetailsView: false,
			layout: getOrgChart.MIXED_HIERARCHY_RIGHT_LINKS,
			boxSizeInPercentage: {
				minBoxSize: {
					width: 7,
					height: 7
				},
				boxSize: {
					width: 22,
					height: 25
				},
				maxBoxSize: {
					width: 120,
					height: 120
				}
			},
			dataSource: dataArr
		});
		//orgChart.insertNode(5,{"id": k , "Name": "JS(HRD)"});
		//orgChart.insertNode(5,{"id": k , "Name": "Director (Comms & Infra)"});
		//orgChart.insertNode(5,{"id": k , "Name": "JD (Prom - 1)"});
	});
}
function getCMEDOBOverview(divId,blockId,type){
	if(type =="overview"){
		$("#cMeoDBTotalId").html(spinner)
	}else{
		$("#cmedobBlockMainDivId").html(spinner);
		$("#cmedobDepartmentBlockMainDivId").html(spinner);
	}
	var json = {
		 sector:"B",
		 fromDate:getDateInRequiredFormat(globalFromDate),
		 toDate:getDateInRequiredFormat(globalToDate)
	}
	$.ajax({                
		type:'POST',    
		url: 'getCMEDOBOverview',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			if(type =="overview"){
				buildgetCMEDOBOverview(result);
			}else{
				buildgetCMEDOBOverview(result);
				buildgetCMEDOBDetailed(result,divId,blockId,type);
				buildgetCMEDOBDepartmentDetailed(result);
			}
		}else{
			if(type =="overview"){
				$("#cMeoDBTotalId").html("0 /")
				$("#cMeoDBApprovedId").html("0")
			}else{
				$("#"+divId+"Block"+blockId).html("No Data Available");
				$("#cmedobBlockMainDivId").html("No Data Available");
				$("#cmedobDepartmentBlockMainDivId").html("No Data Available");
			}
			
		}
	});		
}
function buildgetCMEDOBOverview(result){
	
	if(result !=null && result.overviewDtls != null){
		if(result.overviewDtls.total !=null && result.overviewDtls.total>0){
			$("#cMeoDBTotalId").html(result.overviewDtls.total+ "/")
		}else{
			$("#cMeoDBTotalId").html("0 /")
		}
		if(result.overviewDtls.aprooved !=null && result.overviewDtls.aprooved>0){
			$("#cMeoDBApprovedId").html(result.overviewDtls.aprooved)
		}else{
			$("#cMeoDBApprovedId").html("0")
		}
		
	}
}
function buildgetCMEDOBDetailed(result,divId,blockId,type){
	var str='';
	if(result !=null && result.overviewDtls !=null){
	str+='<div class="block_styles">';
		str+='<div class="row">';
			str+='<div class="col-sm-2">';	
				str+='<img src="Assests/images/total-icon.png" />';
			str+='</div>';
			str+='<div class="col-sm-10">';
				str+='<h3 class="font_weight">Total Status<br> OverView </h3>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="row">';
			str+='<div class="col-sm-6">';	
				str+='<h4 class="font_weight m_top10">Total - '+result.overviewDtls.total+'</h4>';
				str+='<div id="totalStatusGraphId" style="height:200px;"></div>';	
			str+='</div>';
			str+='<div class="col-sm-6">';	
				str+='<div class="statusColorCss">';
					str+='<div class="row">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Approved_icon.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#47E68D"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='Approved';
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.overviewDtls.aprooved+' <small style="color:green;font-weight:bold;">'+result.overviewDtls.approvedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
		
				str+='<div class="statusColorCss" style="border-top:none;">';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Rejected_iocn.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#F55A5A"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='Rejected'; 
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.overviewDtls.rejected+' <small style="color:green;font-weight:bold;">'+result.overviewDtls.rejectedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
		
				str+='<div class="statusColorCss" style="border-top:none;">';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Approved_icon.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#8D4653"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='ReApproved'; 
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.overviewDtls.reAprooved+' <small style="color:green;font-weight:bold;">'+result.overviewDtls.reApprovedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';

	str+='<div class="pendingstatusColorCss">';
		str+='<div class="row">';
			str+='<div class="col-sm-3">';	
				str+='<img src="Assests/images/Pending_icon 70x70.png" />';
			str+='</div>';
			str+='<div class="col-sm-9">';	
				str+='<h4 class="font_weight"><span class="approvedMainCss" style="background-color:#71A8EE;margin-right: 5px;"></span>Pending</h4>';
					str+='<h4 class="font_weight m_top10">'+result.overviewDtls.totalPending+' <small style="color:green;font-weight:bold;">'+result.overviewDtls.pendingPerc+'%</small></h4>';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-6">';
							str+='<h5 class="">Within SLA</h5>';
							str+='<h4 class="font_weight">'+result.overviewDtls.pendingWithinSLA+' <small style="color:green;font-weight:bold;">'+result.overviewDtls.withinSLAPerc+'%</small></h4>';
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<h5 class="">Beyond SLA</h5>';
							str+='<h4 class="font_weight">'+result.overviewDtls.pendingBeyondSLA+' <small style="color:green;font-weight:bold;">'+result.overviewDtls.beyongSLAPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';	
		str+='</div>';	
	str+='</div>';
	$("#cmedobBlockMainDivId").html(str);
}else{
	$("#cmedobBlockMainDivId").html("No Data Available");
}

	var ApprovedCount=0;
	var RejectedCount=0;
	var ReApprovedCount=0;
	var PendingCount=0;
	
	if(result !=null){
		var pendingTotal = result.overviewDtls.pendingWithinSLA+result.overviewDtls.pendingBeyondSLA;
		
		ApprovedCount=parseFloat(result.overviewDtls.approvedPerc);
		RejectedCount=parseFloat(result.overviewDtls.rejectedPerc);
		ReApprovedCount=parseFloat(result.overviewDtls.reApprovedPerc);
		PendingCount=parseFloat(result.overviewDtls.pendingPerc);
	}
	
	var id = 'totalStatusGraphId';
	var type = {
		//width:350,
		type: 'pie',
		backgroundColor:'transparent',
		options3d: {
			enabled: true,
			alpha: 25
		}
	};
	var title = {
		text: ''
	};
	var tooltip = {
		useHTML: true,
		backgroundColor: '#FCFFC5', 
		formatter: function() {
			var cnt = this.point.count;
			return "<b style='color:"+this.point.color+"'>"+this.point.name+" - "+Highcharts.numberFormat(this.percentage,1)+"%</b>";
		}  
	}; 
	var plotOptions ={ 
		pie: {
			innerSize: 100,
			depth: 70,
			dataLabels:{
				useHTML: true,
				enabled: false,
				formatter: function() {
						if (this.y === 0) {
							return null;
						} else {
							return "<b style='color:"+this.point.color+"'>"+this.point.name+"<br/>("+Highcharts.numberFormat(this.percentage,1)+"%)</b>";
						}
					} 
			},
			showInLegend: true
		},
	};
	var legend = {
		enabled: false,
		layout: 'vertical',
		align: 'left',
		verticalAlign: 'bottom',
		useHTML: true,
		
		labelFormatter: function() {
			return '<div><span style="color:'+this.color+'">'+this.name + '-'+Highcharts.numberFormat(this.percentage,1)+'%</span></div>';
		}
	};
	var data = [{
		name: '',
		data: [{
				name: 'Approved',
				y: ApprovedCount,
				color:"#47E68D"
			}, {
				name: 'Rejected',
				y: RejectedCount,
				color:"#F55A5A"
			}, {
				name: 'Re-Approved',
				y: ReApprovedCount,
				color:"#8D4653"
			}, {
				name: 'Pending',
				y: PendingCount,
				color:"#71A8EE"
			}]
	}];
	highcharts(id,type,data,plotOptions,title,tooltip,legend);
	
	
}
function buildgetCMEDOBDepartmentDetailed(result){
	
	var str='';
	
	str+='<div class="row m_top20">';
		str+='<div class="col-sm-4">';
			str+='<div class="department_block" style="border:2px solid #007500">';
				str+='<div class="media">';
					str+='<div class="media-left" style="vertical-align: middle;">';
						str+='<img src="Assests/images/Approved_icon.png">';
					str+='</div>';
					str+='<div class="media-body">';
							str+='<h3 class="font_weight">High <span style="color:#007500">Approval</span> Department</h3>';
							str+='<p class="m_top5">'+result.highApprovalDepartmentName+'</p>';
							str+='<h3 class="font_weight m_top5">'+result.highApprovalDepartmentCount+'</h3>';
							str+='<p class="m_top10" style="border-top: 1px solid green;"></p>';	
							str+='<h3 class="font_weight m_top10">Low <span style="color:#007500">Approval</span> Department</h3>';
							str+='<p class="m_top5">'+result.lowApprovalDepartmentName+'</p>';
							str+='<h3 class="font_weight m_top5">'+result.lowApprovalDepartmentCount+'</h3>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="col-sm-4">';
			str+='<div class="department_block" style="border:2px solid #FF003C">';
				str+='<div class="media">';
					str+='<div class="media-left" style="vertical-align: middle;">';
						str+='<img src="Assests/images/Rejected_iocn.png">';
					str+='</div>';
					str+='<div class="media-body">';
							str+='<h3 class="font_weight">High <span style="color:#FF003C">Rejected</span> Department</h3>';
							str+='<p class="m_top5">'+result.highRejectedDepartmentName+'</p>';
							str+='<h3  class="font_weight m_top5">'+result.highRejectedDepartmentCount+'</h3>';
						str+='<p class="m_top10" style="border-top: 1px solid #FF003C;"></p>';	
							str+='<h3 class="font_weight m_top10">Low <span style="color:#FF003C">Rejected</span> Department</h3>';
							str+='<p class="m_top5">'+result.lowRejectedDepartmentName+'</p>';
							str+='<h3 class="font_weight m_top5">'+result.lowRejectedDepartmentCount+'</h3>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="col-sm-4">';
			str+='<div class="department_block" style="border:2px solid #71A8EE">';
				str+='<div class="media">';
					str+='<div class="media-left" style="vertical-align: middle;">';
						str+='<img src="Assests/images/Pending_Icon.png">';
					str+='</div>';
					str+='<div class="media-body">';
							str+='<h3 class="font_weight">High <span style="color:#71A8EE">Pending</span> Department</h3>';
							str+='<p class="m_top5">'+result.highPendingDepartmentName+'</p>';
							str+='<h3  class="font_weight m_top5">'+result.highPendingDepartmentCount+'</h3>';
						str+='<p class="m_top10" style="border-top: 1px solid #71A8EE;"></p>';	
							str+='<h3 class="font_weight m_top10">Low <span style="color:#71A8EE">Pending</span> Department</h3>';
							str+='<p class="m_top5">'+result.lowPendingDepartmentName+'</p>';
							str+='<h3 class="font_weight m_top5">'+result.lowPendingDepartmentCount+'</h3>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';		
			
	  str+='</div>';
	  $("#cmedobDepartmentBlockMainDivId").html(str);
}

function getCMEDOBReportStatusWise(sectorType){
	$("#cmedobDivId").html(spinner);
	   var json = {
		 sector:sectorType,
		 fromDate:getDateInRequiredFormat(globalFromDate),
		 toDate:getDateInRequiredFormat(globalToDate)
	     }
	$.ajax({                
		type:'POST',    
		url: 'getCMEDOBReportStatusWise',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if (result != null && result.length > 0) {
			buildCMEDOBReportStatusWise(result,sectorType)	
		} else {
			$("#cmedobDivId").html("<p style='margin-left:13px'>NO DATA AVAILABLE.</p>");
		}
		
	});
		
}
function buildCMEDOBReportStatusWise(result,sectorType){
	var str='';
		str+='<div class="col-sm-12  m_top20">';
			str+='<div class="table-responsive">';	
				str+='<table  class="table table-bordered"  id="cmedobTableId">';
					str+='<thead>';
						str+='<tr>';
							str+='<th>Departments Name</th>';
							str+='<th>Clearance Name</th>';
							str+='<th>Total</th>';
							str+='<th>Approved</th>';
							str+='<th>Rejected</th>';
							str+='<th>Re-Approved</th>';
							str+='<th>Total Pending</th>';
							str+='<th>Pending Within SLA </th>';
							str+='<th>Pending Beyond SLA</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
					for(var i in result){
					
						for(var j in result[i].subList){
							str+='<tr>';
								str+='<td >'+result[i].dashboardName+'</td>';
								str+='<td id="'+result[i].subList[j].clearenceId+'">'+result[i].subList[j].clearenceName+'</td>';
								if (result[i].subList[j].totalApplications > 0) {
									str+='<td  style="cursor:pointer;color:rgb(51, 122, 183);" class="cmeodbStatusCls" attr_status_id = "0" attr_clearncr_id ='+result[i].subList[j].clearenceId+' attr_dept_code = '+result[i].subList[j].dashBoardNO+' attr_sector_type="'+sectorType+'">'+result[i].subList[j].totalApplications+'</td>';
								} else {
									str+='<td > - </td>';
								}
								if (result[i].subList[j].totalApproved > 0) {
									str+='<td class="cmeodbStatusCls" style="cursor:pointer;color:rgb(51, 122, 183);" attr_status_id = "1" attr_clearncr_id ='+result[i].subList[j].clearenceId+' attr_dept_code = '+result[i].subList[j].dashBoardNO+' attr_sector_type="'+sectorType+'">'+result[i].subList[j].totalApproved+'</td>';
								} else {
									str+='<td > - </td>';
								}
								if (result[i].subList[j].totalRejected > 0) {
									str+='<td class="cmeodbStatusCls" style="cursor:pointer;color:rgb(51, 122, 183);" attr_status_id = "3" attr_clearncr_id ='+result[i].subList[j].clearenceId+' attr_dept_code = '+result[i].subList[j].dashBoardNO+' attr_sector_type="'+sectorType+'">'+result[i].subList[j].totalRejected+'</td>';
								} else {
									str+='<td > - </td>';
								}
								if (result[i].subList[j].totalReApproved > 0) {
									str+='<td class="cmeodbStatusCls" style="cursor:pointer;color:rgb(51, 122, 183);" attr_status_id = "2" attr_clearncr_id ='+result[i].subList[j].clearenceId+' attr_dept_code = '+result[i].subList[j].dashBoardNO+' attr_sector_type="'+sectorType+'">'+result[i].subList[j].totalReApproved+'</td>';
								} else {
									str+='<td > - </td>';
								}
								if (result[i].subList[j].totalPending > 0) {
									str+='<td class="cmeodbStatusCls"  style="cursor:pointer;color:rgb(51, 122, 183);" attr_status_id = "4" attr_clearncr_id ='+result[i].subList[j].clearenceId+' attr_dept_code = '+result[i].subList[j].dashBoardNO+' attr_sector_type="'+sectorType+'">'+result[i].subList[j].totalPending+'</td>';
								} else {
									str+='<td >- </td>';
								}
								
								if (result[i].subList[j].pendingWithInSLA > 0) {
									str+='<td class="cmeodbStatusCls" style="cursor:pointer;color:rgb(51, 122, 183);" attr_status_id = "5" attr_clearncr_id ='+result[i].subList[j].clearenceId+' attr_dept_code = '+result[i].subList[j].dashBoardNO+' attr_sector_type="'+sectorType+'">'+result[i].subList[j].pendingWithInSLA+'</td>';
								} else {
									str+='<td >- </td>';
								}
								if (result[i].subList[j].pendingBeyondSLA > 0) {
									str+='<td class="cmeodbStatusCls" style="cursor:pointer;color:rgb(51, 122, 183);" attr_status_id = "6" attr_clearncr_id ='+result[i].subList[j].clearenceId+' attr_dept_code = '+result[i].subList[j].dashBoardNO+' attr_sector_type="'+sectorType+'">'+result[i].subList[j].pendingBeyondSLA+'</td>';
							
								} else {
									str+='<td >- </td>';
								}
							str+='</tr>';
						}
					}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
		$("#cmedobDivId").html(str);
		$("#cmedobTableId").dataTable({
			"retrieve": true
		});
}


$(document).on("click",".cmeodbStatusCls",function(){
  $("#emeodbStatusModalId").modal("show");
  $("#emeodbApplicationDtlsDivId").html(spinner)
   var statusId=$(this).attr("attr_status_id");
   var clearenceCode=$(this).attr("attr_clearncr_id");
   var deptCode=$(this).attr("attr_dept_code");
   var sectorType=$(this).attr("attr_sector_type");
	var json = {
		 sector:sectorType,
		 fromDate:getDateInRequiredFormat(globalFromDate),
		 toDate:getDateInRequiredFormat(globalToDate),
		 deptCode:deptCode,
		 clearence:clearenceCode,
		 status:statusId
		
	}
  $.ajax({                
    type:'POST',    
    url: 'getCMeoDBStatusCountDetails',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
    if (result != null && result.length > 0) {
     buildCMeoDBStatusCountDetails(result)  
    } else {
      $("#emeodbApplicationDtlsDivId").html("NO DATA AVAILABLE.");
    }
  });
    
});
function buildCMeoDBStatusCountDetails(result){
	var str='';
		str+='<div class="table-responsive">';	
			str+='<table  class="table table-bordered"  id="emeodbApplicationDtlsDataTblId">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>District Name</th>';
						str+='<th>Sector Name</th>';
						str+='<th>Industry Name</th>';
						str+='<th>Category Name</th>';
						str+='<th>Activity</th>';
						str+='<th>Employment</th>';
						str+='<th>Investment Amount</th>';
						str+='<th>Status</th>';
						str+='<th>Approval File Id</th>';
						str+='<th>Address</th>';
						str+='<th>Application Filled Date</th>';
						str+='<th>Recieved Date</th>';
						str+='<th>Approval Date</th>';
						str+='<th>PermApproval Date</th>';
						str+='<th>Sla Days </th>';
						//str+='<th>Document URL</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result){
				str+='<tr>';
							str+='<td >'+result[i].districtName+'</td>';
							if (result[i].sectorName != null && result[i].sectorName.length > 0) {
									str+='<td class="tooltipCls" data-container="body"  title="'+result[i].sectorName+'" style="cursor:pointer;">'+result[i].sectorName.substr(0,10)+'...</td>';
							} else {
								str+='<td>-</td>';
							}
							if (result[i].industryName != null ) {
							str+='<td class="tooltipCls" data-container="body" title="'+result[i].industryName+'" style="cursor:pointer;">'+result[i].industryName.substr(0,10)+"..."+'</td>';	
							} else {
								str+='<td>-</td>';
							}
							str+='<td >'+result[i].category+'</td>';
							if (result[i].activity != null && result[i].activity.length > 0) {
							  str+='<td class="tooltipCls" data-container="body" title="'+result[i].activity+'" style="cursor:pointer;">'+result[i].activity.substr(0,10)+"..."+'</td>';	
							} else {
								 str+='<td>-</td>';
							}
							str+='<td >'+result[i].empolyeement+'</td>';
							str+='<td >'+result[i].investmentAmount+'</td>';
							str+='<td >'+result[i].status+'</td>';
							//str+='<td >'+result[i].approvalFileId+'</td>';
							 if (result[i].url != null && result[i].url.length > 0) {
								 var urlDtsArr = result[i].url.split("=");
								str+='<td><a href="'+result[i].url+'" target="_blank">'+urlDtsArr[1]+'</a></td>';
							} else {
								str+='<td>-</td>';
							} 
							str+='<td class="tooltipCls" data-container="body" title="'+result[i].address+'" style="cursor:pointer;">'+result[i].address.substr(0,10)+"..."+'</td>';
							str+='<td >'+result[i].appFilledDate+'</td>';
							str+='<td >'+result[i].recievedDate+'</td>';
							str+='<td >'+result[i].approvalDate+'</td>';
							str+='<td >'+result[i].permApprovalDate+'</td>';
							str+='<td >'+result[i].slaDays+'</td>';
							
							
				str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#emeodbApplicationDtlsDivId").html(str);
	$("#emeodbApplicationDtlsDataTblId").dataTable({
		"retrieve": true
	});
	$(".tooltipCls").tooltip();	
}

function getCMeoDBSectorWiseStatusDetais(){
	$("#cmedobSectorWiseInformationId").html(spinner)
	$("#cmedobSectorWiseElectronicSectorId").html(spinner)
	
	var json={
		sector:"B",
		fromDate:getDateInRequiredFormat(globalFromDate),
		toDate:getDateInRequiredFormat(globalToDate)
	}
	$.ajax({                
		type:'POST',    
		url: 'getCMeoDBSectorWiseStatusDetais',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildCMeoDBSectorWiseStatusDetais(result);
			buildCMeoDBSectorWiseElectronicSectorDetais(result);
		}else{
			$("#cmedobSectorWiseInformationId").html("No Data Available")
			$("#cmedobSectorWiseElectronicSectorId").html("No Data Available")
		}
	});	
}

function buildEOfcDepartWiseOverviewDetails(result){
	var str = '';
	var daysArr=["0to7DAYS","8to15DAYS","16to30DAYS","31to60DAYS","60DAYS"];
	str+='<div class="row">';	
		str+='<div class="col-sm-12">';	
			str+='<h4 class="text-capital font_weight text-center">Information TECHNOLOGY Electronics And Communication Department</h4>';
		str+='</div>';
		/*str+='<div class="col-sm-2">';	
			str+='<button type="button" class="btn btn-default btn-sm hieraricalViewCls pull-right hieraricalButtonShowCls" attr_type="show" >Show Graph View</button>';
		str+='</div>';*/
	str+='</div>';
	str+='<div class="row">';
	str+='<div class="col-sm-6" style="padding-left: 30px;">';	
			str+='<ul class="list-inline ">';	
				str+='<li><span class="roundCircleITC" style="background-color:#00af50"></span> 0% - 10%</li>';	
				str+='<li><span class="roundCircleITC" style="background-color:#ffba00"></span> 10% - 20%</li>';	
				str+='<li><span class="roundCircleITC" style="background-color:#ff0000"></span> 20% and above&nbsp;&nbsp;&nbsp;</li>';	
			str+='</ul>  ';	
	str+='</div>'; 
	str+='<div class="col-sm-6 ">';	
			str+='<div class="pull-right" id="lastUpdatedTimeDivId"><span style="padding-right: 15px;"><b>Last Updated Time : </b>'+result[0].lastUpdatedTime+'</span></div>';
	str+='</div>'; 
	str+='</div>'; 
	for(var i in result){
		if(result[i].departmentName == "INFORMATION TECHNOLOGY ELECTRONICS AND COMMUNICATION DEPARTMENT"){
				str+='<div class="col-sm-12 m_top20">';	
				str+='<div class="col-sm-12" style="border:1px solid #000;padding:5px;">';	
						
						str+='<div class="col-sm-4">';
							str+='<h3 class="font_weight" style="text-align: center;margin-top: 40px;">Secretariat Department</h3>';
							str+='<div class="row" style="margin-top: 50px;">';
								str+='<div class="col-sm-4">';
									str+='<h4 class="font_weight">'+result[i].created+'</h4>';
									str+='<h5 class="font_weight m_top10">TOTAL</h5>';
								str+='</div>';
								str+='<div class="col-sm-4">';
									str+='<h4 class="font_weight">'+result[i].actionFiles+'</h4>';
									str+='<h5 class="font_weight m_top10">ACTION</h5>';
								str+='</div>';
								str+='<div class="col-sm-4">';
									str+='<h4 class="font_weight">'+result[i].totalCount+' <span style="color:green;">&nbsp; &nbsp;&nbsp;'+result[i].percentage+'%</span></h4>';
									str+='<h5 class="font_weight m_top10">TOTAL PENDENCY</h5>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-8">';
							/* str+='<div class="row">';
							for(var d in daysArr){
								str+='<div class="col-sm-2 border_left_RightE">';
									str+='<div id="'+daysArr[d]+'" style="height:200px;"></div>';
								str+='</div>';
							}
							str+='</div>'; */
							str+='<ul class="itcdashboard-list">';
							for(var d in daysArr){
								str+='<li class=" border_left_RightE">';
									str+='<div id="'+daysArr[d]+'" style="height:200px;"></div>';
								str+='</li>';
							}
							str+='</ul>';
						str+='</div>';
				str+='</div>';
			str+='</div>';
		
		}
	}
	
	str+='<div class="col-sm-12 m_top20">';	
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_ITC" id="dataTableITCDepartment">';
				str+='<thead style="background-color:#CCCCCC">';
					str+='<tr>';
						str+='<th>Departments</th>';
						str+='<th>Total</th>';
						str+='<th>Action</th>';
						str+='<th>Total Pendency</th>';
						str+='<th>%</th>';
						str+='<th>0 - 7 days</th>';
						str+='<th>8 - 15 days</th>';
						str+='<th>16 - 30 days</th>';
						str+='<th>31 - 60 days</th>';
						str+='<th> > 60 days</th>';
					str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
					for(var i in result){
						if(result[i].departmentName != "ITE & C"){
							str+='<tr>';
							if(result[i].departmentName == "INFORMATION TECHNOLOGY ELECTRONICS AND COMMUNICATION DEPARTMENT"){
								str+='<td style="cursor:pointer;"><i class="fa fa-external-link departmentDetailsCls" aria-hidden="true" class="" attr_department_id="'+result[i].departmentId+'" attr_department_name="'+result[i].departmentName+'"></i><b>SECRETARIAT DEPARTMENT</b></td>';
							}else{
								str+='<td style="cursor:pointer;"><i class="fa fa-external-link departmentDetailsCls" aria-hidden="true" class="" attr_department_id="'+result[i].departmentId+'" attr_department_name="'+result[i].departmentName+'"></i><b> '+result[i].departmentName+'</b></td>';
							}
								
								str+='<td >'+result[i].created+'</td>';
								str+='<td >'+result[i].actionFiles+'</td>';
								str+='<td >'+result[i].totalCount+'</td>';
								if(result[i].percentage < 10){
									str+='<td style="background-color:#00AF50;color:#fff">'+result[i].percentage+'</td>';
								}else if(result[i].percentage >= 10 && result[i].percentage < 20){
									str+='<td style="background-color:#FFBA00;color:#fff">'+result[i].percentage+'</td>';
								}else if(result[i].percentage >= 20){
									str+='<td style="background-color:#ff0000;color:#fff">'+result[i].percentage+'</td>';
								}
								str+='<td >'+result[i].zeroToSeven+'</td>';
								str+='<td >'+result[i].eightToFifteen+'</td>';
								str+='<td >'+result[i].sixteenToThirty+'</td>';
								str+='<td >'+result[i].thirtyoneToSixty+'</td>';
								str+='<td >'+result[i].aboveSixty+'</td>';
							str+='</tr>';
						}
					}
					str+='</tbody>';
					for(var i in result){
						if(result[i].departmentName == "ITE & C"){
							str+='<tr>';
								str+='<td style="text-align: right;" class="font_weight">GRAND TOTAL</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].created+'</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].actionFiles+'</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].totalCount+'</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].percentage+'</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].zeroToSeven+'</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].eightToFifteen+'</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].sixteenToThirty+'</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].thirtyoneToSixty+'</td>';
								str+='<td class="font_weight" style="background-color:#e7e7e7;">'+result[i].aboveSixty+'</td>';
							str+='</tr>';
						}
					}
					
			str+='</table>';
		str+='</div>';
	str+='</div>';
	str+='<div class="col-sm-12 m_top20">';	
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_ITC" id="dataTableITCHODS">';
				str+='<thead style="background-color:#CCCCCC">';
					str+='<tr>';
						//str+='<th style="color:#A349A4;text-align:center">HODS</th>';
						str+='<th>HODS</th>';
						str+='<th>Department</th>';
						str+='<th>Total</th>';
						str+='<th>Action</th>';
						str+='<th>Total Pendency</th>';
						str+='<th>%</th>';
						str+='<th>0 - 7 days</th>';
						str+='<th>8 - 15 days</th>';
						str+='<th>16 - 30 days</th>';
						str+='<th>31 - 60 days</th>';
						str+='<th> > 60 days</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result[0].subList){
						if(result[0].subList[i] != null){
							str+='<tr>';
								str+='<td>'+result[0].subList[i].postName+'</td>';
								str+='<td>'+result[0].subList[i].departmentName+'</a></td>';
								str+='<td>'+result[0].subList[i].created+'</td>';
								str+='<td>'+result[0].subList[i].actionFiles+'</td>';
								str+='<td>'+result[0].subList[i].totalCount+'</td>';
								if(result[0].subList[i].percentage < 10){
									str+='<td style="background-color:#00AF50;color:#fff">'+result[0].subList[i].percentage+'</td>';
								}else if(result[0].subList[i].percentage >= 10 && result[0].subList[i].percentage < 20){
									str+='<td style="background-color:#FFBA00;color:#fff">'+result[0].subList[i].percentage+'</td>';
								}else if(result[0].subList[i].percentage >= 20){
									str+='<td style="background-color:#FF0000;color:#fff">'+result[0].subList[i].percentage+'</td>';
								}
								str+='<td >'+result[0].subList[i].zeroToSeven+'</td>';
								str+='<td >'+result[0].subList[i].eightToFifteen+'</td>';
								str+='<td >'+result[0].subList[i].sixteenToThirty+'</td>';
								str+='<td >'+result[0].subList[i].thirtyoneToSixty+'</td>';
								str+='<td >'+result[0].subList[i].aboveSixty+'</td>';
							str+='</tr>';
						}
					}
					str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	
$("#eOfficeDeparmentsOverViewBlock").html(str);
$("#dataTableITCDepartment").dataTable({
		"paging":   false,
		"info":     false,
		"searching": false,
		"autoWidth": true,
		"retrieve": true
});
$("#dataTableITCHODS").dataTable({
	"paging":   false,
	"info":     false,
	"searching": false,
	"autoWidth": true,
	"retrieve": true
});
for(var i in daysArr){
		var mainArr=[];
		var daysNamesArr=[];
		var globalStatusObj={}
		for(var j in result){
			if(result[j].departmentName == "INFORMATION TECHNOLOGY ELECTRONICS AND COMMUNICATION DEPARTMENT"){
				globalStatusObj={"0-7 DAYS":result[j].zeroToSeven,"8-15 DAYS":result[j].eightToFifteen,"16-30 DAYS":result[j].sixteenToThirty,"31-60 DAYS":result[j].thirtyoneToSixty,"Above 60 DAYS":result[j].aboveSixty}
				
				var eightToFifteenPercArr=[];
				var sixteenToThirtyPercArr=[];
				var thirtyoneToSixtyPercArr=[];
				var aboveSixtyPercArr=[];
				var zeroToSevenPercArr=[];
				eightToFifteenPercArr.push(parseFloat(result[j].eightToFifteenPerc))
				sixteenToThirtyPercArr.push(parseFloat(result[j].sixteenToThirtyPerc))
				thirtyoneToSixtyPercArr.push(parseFloat(result[j].thirtyoneToSixtyPerc))
				aboveSixtyPercArr.push(parseFloat(result[j].aboveSixtyPerc))
				zeroToSevenPercArr.push(parseFloat(result[j].zeroToSevenPerc))
			}
		}
		if(daysArr[i] == "0to7DAYS"){
			mainArr.push(zeroToSevenPercArr)
			daysNamesArr.push("0-7 DAYS")
		}else if(daysArr[i] == "8to15DAYS"){
			mainArr.push(eightToFifteenPercArr)
			daysNamesArr.push("8-15 DAYS")
		}else if(daysArr[i] == "16to30DAYS"){
			mainArr.push(sixteenToThirtyPercArr)
			daysNamesArr.push("16-30 DAYS")
		}else if(daysArr[i] == "31to60DAYS"){
			mainArr.push(thirtyoneToSixtyPercArr)
			daysNamesArr.push("31-60 DAYS")
		}else if(daysArr[i] == "60DAYS"){
			mainArr.push(aboveSixtyPercArr)
			daysNamesArr.push("Above 60 DAYS")
		}
		
		
		$("#"+daysArr[i]).highcharts({
			colors:['#12A89D'],
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
				 categories:daysNamesArr,
				 labels: {
					useHTML:true,
					formatter: function() {
						return '<h5>'+this.value+'<br/><p style="color:#000;text-align:center;"><b>'+globalStatusObj[this.value]+'</b></p></h5>';
						
						
					},
					
				}
			},
			yAxis: {
				 min: 0,
				 gridLineWidth: 0,
				 minorGridLineWidth: 0,
				labels: {
					enabled: false
				},
				title: {
					text: ''
				}
			},
			legend: {
				enabled: false
			},
			plotOptions:{
				column: {
						pointWidth: 30,
						gridLineWidth: 15,
					}
				},
			tooltip: {
				 positioner: function () {
					return { x: 20, y: 50 };
				},
				backgroundColor:'#fff',
				pointFormat: '<span style="background-color:#fff">Pendency:<b>{point.y}</b></span>'
			},
			series: [{
				name: 'Pendency',
				data: mainArr,
				dataLabels: {
					useHTML:true,
					enabled: true,
					color: '#000',
					align: 'center',
					style: {
						fontSize:"14px",
						fontWeight:"bold"
					},
					formatter: function() {
							return '<span>'+this.y+' %</span>';
					},
						
				}
			}]
		});
	}
}
$(document).on("click",".departmentDetailsCls",function(){	
	var departmentId =  $(this).attr("attr_department_id")
	var departmentName =  $(this).attr("attr_department_name")
	$("#departmentModalId").modal("show");
	$("#headingTitle").html("<b>"+departmentName+ "  DETAILS</b>")
	getEofficeDesginationDetailsByDepartment(departmentId);
});
function getEofficeDesginationDetailsByDepartment(departmentId){
	$("#departmentDetailsDivId").html(spinner);
	var json = {
		departmentId:departmentId,	
		//fromDate:"2017-11-01",	
		//toDate:"2017-12-31"		
	}
	$.ajax({                
		type:'POST',    
		url: 'getEofficeDesginationWiseDetailsFrDepartmentNew',  //'getEofficeDesginationWiseDetailsFrDepartment',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildEofficeDesginationDetailsByDepartment(result)
		}else{
			$("#departmentDetailsDivId").html("No Data Available");
		}
	});		
}
function buildEofficeDesginationDetailsByDepartment(result){
	var str='';
			str+='<div class="table-responsive">';
				str+='<table class="table table-bordered table_ITC" id="dataTableDepartmentId">';
						str+='<thead style="background-color:#CCCCCC">';
						str+='<tr>';
							str+='<th class="text-center">POST NAME</th>';
							str+='<th class="text-center">EMPLOYEE</th>';
							str+='<th>Total</th>';
							str+='<th>Action</th>';
							str+='<th>Total Pendency</th>';
							str+='<th>%</th>';
							str+='<th>0 - 7 days</th>';
							str+='<th>8 - 15 days</th>';
							str+='<th>16 - 30 days</th>';
							str+='<th>31 - 60 days</th>';
							str+='<th> > 60 days</th>';
						str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result){
							str+='<tr>';
								str+='<td>'+result[i].designation+'</td>';
								str+='<td>'+result[i].employeeName+'</td>';
								str+='<td>'+result[i].created+'</td>';
								str+='<td>'+result[i].actionFiles+'</td>';
								str+='<td>'+result[i].totalCount+'</td>';
								if(result[i].percentage < 10){
									str+='<td style="background-color:#00AF50;color:#fff">'+result[i].percentage+'</td>';
								}else if(result[i].percentage>= 10 && result[i].percentage < 20){
									str+='<td style="background-color:#FFBA00;color:#fff">'+result[i].percentage+'</td>';
								}else if(result[i].percentage >= 20){
									str+='<td style="background-color:#FF0000;color:#fff">'+result[i].percentage+'</td>';
								}
								//str+='<td>'+result[i].percentage+'</td>';
								str+='<td>'+result[i].zeroToSeven+'</td>';
								str+='<td >'+result[i].eightToFifteen+'</td>';
								str+='<td>'+result[i].sixteenToThirty+'</td>';
								str+='<td >'+result[i].thirtyoneToSixty+'</td>';
								str+='<td>'+result[i].aboveSixty+'</td>';
							str+='</tr>';
						}
						str+='</tbody>';
				str+='</table>';
			str+='</div>';
		$("#departmentDetailsDivId").html(str);
		$("#dataTableDepartmentId").dataTable({
			"paging":   true,
			"info":     false,
			"searching": true,
			"autoWidth": true,
			"iDisplayLength": 13,
			"aaSorting": [], 
			"aLengthMenu": [[13, 15, 20, -1], [13, 15, 20, "All"]],
			"retrieve": true
		});
}
$(document).on("click",".hieraricalViewCls",function(){	
	var type = $(this).attr("attr_type");
	
	if(type == "show"){
		$(".hieraricalButtonShowCls").hide();
		$("#hieraricalShowHideDiv").html('');
		$("#hieraricalViewErr").html('');
		$("#hieraricalView").html('');
		getDepartmentWiseHierarchicalDetails();
	}else{
		$("#hieraricalShowHideDiv").html('');
		$("#hieraricalViewErr").html('');
		$("#hieraricalView").html('');
		$("#hieraricalView").removeAttr('style');
		$(".hieraricalButtonShowCls").show();
	}
});

$(document).on("click",".blockWiseDetails",function(){
	$("#dateRAngeSectionHideId").hide();
	var blockName=$(this).attr("main-block");
	if( blockName == "cMeoDB" || blockName == "meesevaSla" ){
	 //$("#dateRAngeSectionHideId").show();
	}
});
function getDateInRequiredFormat(date) {
	var dateArr = date.split("/");
	return [dateArr[2],dateArr[1],dateArr[0]].join("-");
}
function buildCMeoDBSectorWiseStatusDetais(result){
	var str='';
	if(result !=null && result.itDtlsVO !=null){
	str+='<div class="block_styles">';
		str+='<div class="row">';
			str+='<div class="col-sm-2">';	
				str+='<img src="Assests/images/IT_icon.png" />';
			str+='</div>';
			str+='<div class="col-sm-10">';
				str+='<h3 class="font_weight">IT Sector<br>Status Overview </h3>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="row">';
			str+='<div class="col-sm-6">';	
				str+='<h4 class="font_weight m_top10">Total - '+result.itDtlsVO.total+'</h4>';
				str+='<div id="informationSectorGraphId" style="height:200px;"></div>';	
			str+='</div>';
			str+='<div class="col-sm-6">';	
				str+='<div class="statusColorCss">';
					str+='<div class="row">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Approved_icon.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#47E68D"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='Approved';
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.itDtlsVO.aprooved+' <small style="color:green;font-weight:bold;">'+result.itDtlsVO.approvedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
		
				str+='<div class="statusColorCss" style="border-top:none;">';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Rejected_iocn.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#F55A5A"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='Rejected'; 
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.itDtlsVO.rejected+' <small style="color:green;font-weight:bold;">'+result.itDtlsVO.rejectedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
		
				str+='<div class="statusColorCss" style="border-top:none;">';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Approved_icon.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#8D4653"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='ReApproved'; 
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.itDtlsVO.reAprooved+' <small style="color:green;font-weight:bold;">'+result.itDtlsVO.reApprovedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';

	str+='<div class="pendingstatusColorCss">';
		str+='<div class="row">';
			str+='<div class="col-sm-3">';	
				str+='<img src="Assests/images/Pending_icon 70x70.png" />';
			str+='</div>';
			str+='<div class="col-sm-9">';	
				str+='<h4 class="font_weight"><span class="approvedMainCss" style="background-color:#71A8EE;margin-right: 5px;"></span>Pending</h4>';
					str+='<h4 class="font_weight m_top10">'+result.itDtlsVO.totalPending+' <small style="color:green;font-weight:bold;">'+result.itDtlsVO.pendingPerc+'%</small></h4>';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-6">';
							str+='<h5 class="">Within SLA</h5>';
							str+='<h4 class="font_weight">'+result.itDtlsVO.pendingWithinSLA+' <small style="color:green;font-weight:bold;">'+result.itDtlsVO.withinSLAPerc+'%</small></h4>';
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<h5 class="">Beyond SLA</h5>';
							str+='<h4 class="font_weight">'+result.itDtlsVO.pendingBeyondSLA+' <small style="color:green;font-weight:bold;">'+result.itDtlsVO.beyongSLAPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';	
		str+='</div>';	
	str+='</div>';
	$("#cmedobSectorWiseInformationId").html(str)
}else{
	$("#cmedobSectorWiseInformationId").html("No Data Available")
}
	var ApprovedCount=0;
	var RejectedCount=0;
	var ReApprovedCount=0;
	var PendingCount=0;
	
	if(result !=null){
		var pendingTotal = result.itDtlsVO.pendingWithinSLA+result.itDtlsVO.pendingBeyondSLA;
		
		ApprovedCount=parseFloat(result.itDtlsVO.approvedPerc);
		RejectedCount=parseFloat(result.itDtlsVO.rejectedPerc);
		ReApprovedCount=parseFloat(result.itDtlsVO.reApprovedPerc);
		PendingCount=parseFloat(result.itDtlsVO.pendingPerc);
	}
	
	var id = 'informationSectorGraphId';
	var type = {
		//width:350,
		type: 'pie',
		backgroundColor:'transparent',
		options3d: {
			enabled: true,
			alpha: 25
		}
	};
	var title = {
		text: ''
	};
	var tooltip = {
		useHTML: true,
		backgroundColor: '#FCFFC5', 
		formatter: function() {
			var cnt = this.point.count;
			return "<b style='color:"+this.point.color+"'>"+this.point.name+" - "+Highcharts.numberFormat(this.percentage,1)+"%</b>";
		}  
	}; 
	var plotOptions ={ 
		pie: {
			innerSize: 100,
			depth: 70,
			dataLabels:{
				useHTML: true,
				enabled: false,
				formatter: function() {
						if (this.y === 0) {
							return null;
						} else {
							return "<b style='color:"+this.point.color+"'>"+this.point.name+"<br/>("+Highcharts.numberFormat(this.percentage,1)+"%)</b>";
						}
					} 
			},
			showInLegend: true
		},
	};
	var legend = {
		enabled: false,
		layout: 'vertical',
		align: 'left',
		verticalAlign: 'bottom',
		useHTML: true,
		
		labelFormatter: function() {
			return '<div><span style="color:'+this.color+'">'+this.name + '-'+Highcharts.numberFormat(this.percentage,1)+'%</span></div>';
		}
	};
	var data = [{
		name: '',
		data: [{
				name: 'Approved',
				y: ApprovedCount,
				color:"#47E68D"
			}, {
				name: 'Rejected',
				y: RejectedCount,
				color:"#F55A5A"
			}, {
				name: 'Re-Approved',
				y: ReApprovedCount,
				color:"#8D4653"
			}, {
				name: 'Pending',
				y: PendingCount,
				color:"#71A8EE"
			}]
	}];
	highcharts(id,type,data,plotOptions,title,tooltip,legend);
										
	
}
function buildCMeoDBSectorWiseElectronicSectorDetais(result){
	var str='';
	if(result !=null && result.electronicsDtlsVO !=null){
	str+='<div class="block_styles">';
		str+='<div class="row">';
			str+='<div class="col-sm-2">';	
				str+='<img src="Assests/images/Ec_icon.png" />';
			str+='</div>';
			str+='<div class="col-sm-10">';
				str+='<h3 class="font_weight">Electronic Sector<br>Status Overview</h3>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="row">';
			str+='<div class="col-sm-6">';	
				str+='<h4 class="font_weight m_top10">Total - '+result.electronicsDtlsVO.total+'</h4>';
				str+='<div id="electronicSectorGraphId" style="height:200px;"></div>';	
			str+='</div>';
			str+='<div class="col-sm-6">';	
				str+='<div class="statusColorCss">';
					str+='<div class="row">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Approved_icon.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#47E68D"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='Approved';
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.electronicsDtlsVO.aprooved+' <small style="color:green;font-weight:bold;">'+result.electronicsDtlsVO.approvedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
		
				str+='<div class="statusColorCss" style="border-top:none;">';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Rejected_iocn.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#F55A5A"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='Rejected'; 
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.electronicsDtlsVO.rejected+' <small style="color:green;font-weight:bold;">'+result.electronicsDtlsVO.rejectedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
		
				str+='<div class="statusColorCss" style="border-top:none;">';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-4">';	
							str+='<img src="Assests/images/Approved_icon.png" />';
						str+='</div>';
						str+='<div class="col-sm-8">';	
							str+='<h4 class="font_weight">';
								str+='<div class="row">';
									str+='<div class="col-sm-1" style="padding-right:0px;">';
										str+='<span class="approvedMainCss" style="background-color:#8D4653"></span>'; 
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='ReApproved'; 
									str+='</div>';
								str+='</div>';
							str+='</h4>';
							str+='<h4 class="font_weight m_top10">'+result.electronicsDtlsVO.reAprooved+' <small style="color:green;font-weight:bold;">'+result.electronicsDtlsVO.reApprovedPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';

	str+='<div class="pendingstatusColorCss">';
		str+='<div class="row">';
			str+='<div class="col-sm-3">';	
				str+='<img src="Assests/images/Pending_icon 70x70.png" />';
			str+='</div>';
			str+='<div class="col-sm-9">';	
				str+='<h4 class="font_weight"><span class="approvedMainCss" style="background-color:#71A8EE;margin-right: 5px;"></span>Pending</h4>';
					str+='<h4 class="font_weight m_top10">'+result.electronicsDtlsVO.totalPending+' <small style="color:green;font-weight:bold;">'+result.electronicsDtlsVO.pendingPerc+'%</small></h4>';
					str+='<div class="row m_top10">';
						str+='<div class="col-sm-6">';
							str+='<h5 class="">Within SLA</h5>';
							str+='<h4 class="font_weight">'+result.electronicsDtlsVO.pendingWithinSLA+' <small style="color:green;font-weight:bold;">'+result.electronicsDtlsVO.withinSLAPerc+'%</small></h4>';
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<h5 class="">Beyond SLA</h5>';
							str+='<h4 class="font_weight">'+result.electronicsDtlsVO.pendingBeyondSLA+' <small style="color:green;font-weight:bold;">'+result.electronicsDtlsVO.beyongSLAPerc+'%</small></h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';	
		str+='</div>';	
	str+='</div>';
	$("#cmedobSectorWiseElectronicSectorId").html(str)
}else{
	$("#cmedobSectorWiseElectronicSectorId").html("No Data Available")
}
	var ApprovedCount=0;
	var RejectedCount=0;
	var ReApprovedCount=0;
	var PendingCount=0;
	
	if(result !=null){
		var pendingTotal = result.electronicsDtlsVO.pendingWithinSLA+result.electronicsDtlsVO.pendingBeyondSLA;
		
		ApprovedCount=parseFloat(result.electronicsDtlsVO.approvedPerc);
		RejectedCount=parseFloat(result.electronicsDtlsVO.rejectedPerc);
		ReApprovedCount=parseFloat(result.electronicsDtlsVO.reApprovedPerc);
		PendingCount=parseFloat(result.electronicsDtlsVO.pendingPerc);
	}
	
	var id = 'electronicSectorGraphId';
	var type = {
		//width:350,
		type: 'pie',
		backgroundColor:'transparent',
		options3d: {
			enabled: true,
			alpha: 25
		}
	};
	var title = {
		text: ''
	};
	var tooltip = {
		useHTML: true,
		backgroundColor: '#FCFFC5', 
		formatter: function() {
			var cnt = this.point.count;
			return "<b style='color:"+this.point.color+"'>"+this.point.name+" - "+Highcharts.numberFormat(this.percentage,1)+"%</b>";
		}  
	}; 
	var plotOptions ={ 
		pie: {
			innerSize: 100,
			depth: 70,
			dataLabels:{
				useHTML: true,
				enabled: false,
				formatter: function() {
						if (this.y === 0) {
							return null;
						} else {
							return "<b style='color:"+this.point.color+"'>"+this.point.name+"<br/>("+Highcharts.numberFormat(this.percentage,1)+"%)</b>";
						}
					} 
			},
			showInLegend: true
		},
	};
	var legend = {
		enabled: false,
		layout: 'vertical',
		align: 'left',
		verticalAlign: 'bottom',
		useHTML: true,
		
		labelFormatter: function() {
			return '<div><span style="color:'+this.color+'">'+this.name + '-'+Highcharts.numberFormat(this.percentage,1)+'%</span></div>';
		}
	};
	var data = [{
		name: '',
		data: [{
				name: 'Approved',
				y: ApprovedCount,
				color:"#47E68D"
			}, {
				name: 'Rejected',
				y: RejectedCount,
				color:"#F55A5A"
			}, {
				name: 'Re-Approved',
				y: ReApprovedCount,
				color:"#8D4653"
			}, {
				name: 'Pending',
				y: PendingCount,
				color:"#71A8EE"
			}]
	}];
	highcharts(id,type,data,plotOptions,title,tooltip,legend);
	
}
$(document).on("change","#sectorSelId",function(){
var sectorVal=$("#sectorSelId").val();
getCMEDOBReportStatusWise(sectorVal);
});
$(document).on("click",".meesevaSlaKpiCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
		
	var blockType = $(this).attr("attr_type");
	if(blockType == "meesevaSla"){
		//getMeesevaSLAOverviewDtls("meesevaSlaKpi",5);
		getMeesevaSLACatWiseAbstarctDetails("meesevaSlaKpi",5,"change");
	}else{
		
		getMeesevaKPIOverViewDetails("change","meesevaSlaKpi",5);
		//getMeesavaKpiGraphBuild("meesevaSlaKpi",5);
	}
});


function getBioMetricDashboardOverViewDtls(){
	$("#bioMetricBlockId").html(spinner);
	var json = {
		deptCode:globalDeptCode
	}
	$.ajax({                
		type:'POST',    
		url: 'getBioMetricDashboardOverViewDtls',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			$("#bioMetricBlockId").html(result.totalCount+"/"+result.presentCount);
		}else{
			$("#bioMetricBlockId").html("0/0");
		}
		
	});	
}

function getMeesevaSLACatWiseAbstarctDetails(divId,blockId,type){
	if(type == "onload"){
		$("#meesevaHeadingId").html(spinner);
	}
	$("#"+divId+"Block"+blockId).html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLACatWiseAbstarctDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(type == "onload"){
			$("#meesevaHeadingId").html('');
		}
		
	    $("#"+divId+"Block"+blockId).html('');
		if(result !=null){
			var totalBeyondSlaCount = result.catgryABeyondSLACount+result.catgryBBeyondSLACount;
			if(type == "onload"){
				$("#meesevaHeadingId").html(totalBeyondSlaCount)
			}
			buildMeesevaSLACatWiseAbstarctDetails(result,divId,blockId);
		}else {
			$("#"+divId+"Block"+blockId).html('NO DATA AVAILABLE.');
		}
		getMeesevaSlaCentersOverviewDetails(divId,blockId);
		getMeesevaSLADepartmentDetails(divId,blockId);
		getMeesevaSLAServiceWiseDetails(divId,blockId);
		getMeesevaSLADistrictWiseDetails(divId,blockId)
		getMeesevaCatBtoCatACompletedDetails(divId,blockId);
		getMeesevaCatBtoCatAUnderDevelopmentDetails(divId,blockId);
		buildPendingTransactionOverViewDetails(divId,blockId);
		
		
	});	
}
function buildMeesevaSLACatWiseAbstarctDetails(result,divId,blockId){
	
	var str='';
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div class="col-sm-4">';
				str+='<div class="white_block_ITC border_right">';
					str+='<h4 class="panel-title f_18 font_weight">CATEGORY - A</h4>';
						str+='<div class="row border_top m_top10">';
							str+='<div class="col-sm-4 border_right m_top10">';
								str+='<h4 class="font_weight f_16 m_top10">Total<br/>Departments</h4>';
								str+='<h4 class="font_weight m_top40">'+result.categoryACount+'</h4>';
							str+='</div>';
							str+='<div class="col-sm-4 border_right m_top10">';
								str+='<h4 class="font_weight f_16 m_top10">Total<br/>Services</h4>';
								str+='<h4 class="font_weight m_top40">'+result.catgryAServicesCount+'</h4>';
							str+='</div>';
							str+='<div class="col-sm-4 m_top10">';
								str+='<h4 class="font_weight f_16 m_top10">Total<br/>Transactions</h4>';
								str+='<h4 class="font_weight m_top40">'+result.catgryATransCount+'</h4>';
									//str+='<div class="border_top m_top5">';
										/* str+='<div class="row m_top5">';
											str+='<div class="col-sm-6">';
												str+='<h4 class="font_weight f_18">With In SLA</h4>';
												str+='<h4 class="font_weight m_top5">'+result.catgryAWithInSLACount+'</h4>';
											str+='</div>';
											str+='<div class="col-sm-6">';
												str+='<h4 class="font_weight f_18">Beyond SLA</h4>';
												str+='<h4 class="font_weight m_top5">'+result.catgryABeyondSLACount+'</h4>';
											str+='</div>';
										str+='</div>'; */
							//str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			
			str+='<div class="col-sm-5">';
				str+='<div class="white_block_ITC border_left">';
					str+='<h4 class="panel-title f_18 font_weight">CATEGORY - B</h4>';
						str+='<div class="row border_top m_top10">';
							str+='<div class="col-sm-3 border_right m_top10">';
								str+='<h4 class="font_weight f_16">Total<br/>Departments</h4>';
								str+='<h4 class="font_weight m_top30">'+result.categoryBCount+'</h4>';
							str+='</div>';
							str+='<div class="col-sm-2 border_right m_top10">';
								str+='<h4 class="font_weight f_16">Total<br/>Services</h4>';
								str+='<h4 class="font_weight m_top30">'+result.catgryBServicesCount+'</h4>';
							str+='</div>';
							str+='<div class="col-sm-7 m_top10">';
								str+='<h4 class="font_weight f_16 text-center">Total Transactions</h4>';
								str+='<h4 class="font_weight text-center">'+result.catgryBTransCount+'</h4>';
									str+='<div class="m_top5">';
									str+='<div class="border_top">';
										str+='<div class="col-sm-4">';
											str+='<h5 class="font_weight m_top5">Total Pending</h5>';
											str+='<h5 class="font_weight m_top5">'+result.catBTotalSlaCunt+'</h5>';
										str+='</div>';
										str+='<div class="col-sm-4">';
											str+='<h5 class="font_weight  m_top5">With&nbsp;In&nbsp;SLA</h5>';
											str+='<h5 class="font_weight m_top5">'+result.catgryBWithInSLACount+'<br><span class="meesavaKpiPerc">('+result.withInSLAPerc+'&nbsp;%)</span></h4>';
										str+='</div>';
										str+='<div class="col-sm-4">';
											str+='<h5 class="font_weight   m_top5">Beyond&nbsp;SLA</h5>';
											str+='<h5 class="font_weight m_top5">'+result.catgryBBeyondSLACount+'<br><span class="meesavaKpiPerc">('+result.beyondSLAPerc+'&nbsp;%)</span></h5>';
										str+='</div>';
									str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			
			str+='<div class="col-sm-3">';
				str+='<div class="white_block_ITC border_right">';
					str+='<h4 class="panel-title f_16 font_weight">Cat B to Cat A&nbsp;&nbsp;Achievements</h4>';
						str+='<div class="row border_top m_top10">';
							str+='<div class="col-sm-3 border_right m_top10">';
								str+='<h4 class="font_weight f_16 m_top10">Targets</h4>';
								str+='<h4 class="font_weight m_top40">'+result.target+'</h4>';
							str+='</div>';
							str+='<div class="col-sm-5 border_right m_top10">';
								str+='<h4 class="font_weight f_16 m_top10">Achievement</h4>';
								str+='<h4 class="font_weight m_top40">'+result.achievement+'</h4>';
							str+='</div>';
							str+='<div class="col-sm-4 m_top10">';
								str+='<h4 class="font_weight f_16 m_top10">Pending</h4>';
								str+='<h4 class="font_weight m_top40">'+result.pending+'</h4>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			
		str+='</div>';
	str+='</div>';
	
	str+='<div class="m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div id="meesevaSlaCenters'+divId+''+blockId+'"></div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="m_top10">';
		str+='<div class="col-sm-12 m_top20">';
			str+='<div id="meesevaSlaComparision'+divId+''+blockId+'"></div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div id="meesevaSlaDepartmentWise'+divId+''+blockId+'"></div>';
		str+='</div>';
	str+='</div>';
	
	str+='<div class="m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div id="meesevaSlaServiceWise'+divId+''+blockId+'"></div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div id="meesevaSlaDistrictWise'+divId+''+blockId+'"></div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div id="meesevaCompleted'+divId+''+blockId+'"></div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div id="meesevaUnderDevelopment'+divId+''+blockId+'"></div>';
		str+='</div>';
	str+='</div>';
	
	$("#"+divId+"Block"+blockId).html("");					
	$("#"+divId+"Block"+blockId).html(str);					
}
function buildPendingTransactionOverViewDetails(divId,blockId){
	var date,month,year;
	date= new Date();
	month = date.getMonth();
	year=2018;
	var str='';
		str+='<div class="panel-group" id="accordionPendingTransaction" role="tablist" aria-multiselectable="true">';
			str+='<div class="panel panel-default panel-black">';
				str+='<div class="panel-heading" role="tab" id="headingPendingTransaction">';
					str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionPendingTransaction" href="#collapsePendingTransaction" aria-expanded="true" aria-controls="collapsePendingTransaction">';
						str+='<h4 class="panel-title">COMPARISION</h4>';
					str+='</a>';
				str+='</div>';
				str+='<div id="collapsePendingTransaction" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingPendingTransaction">';
					str+='<div class="panel-body">';
						str+='<div class="row">';
							str+='<div class="col-sm-3 m_top20">';
								str+='<ul class="list-inline switch-btn meeSevaCompViewCls" >';
									str+='<li class="active" attr_type="Week"  attr_div_id="'+divId+'" attr_blc_id="'+blockId+'">Daily</li>';
									str+='<li attr_type="Month"  attr_div_id="'+divId+'" attr_blc_id="'+blockId+'">Weekly</li>';
									str+='<li attr_type="Year"  attr_div_id="'+divId+'" attr_blc_id="'+blockId+'">Monthly</li>';
								str+='</ul>';
							str+='</div>';
							str+='<div class="col-sm-3">';
								str+='<label>Select Year</label>';
								str+='<select class="chosen-select form-control" id="meeSevaCompYearId"  attr_div_id="'+divId+'" attr_blc_id="'+blockId+'">';
									str+='<option value="2018">2018</option>';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-3 meeSevaCompMonthDrpBlcId">';
								str+='<label>Select Month</label>';
								str+='<select class="chosen-select form-control" id="meeSevaCompMonthId"  attr_div_id="'+divId+'" attr_blc_id="'+blockId+'">';
									str+='<option value="01">January</option>';
									str+='<option value="02">February</option>';
									str+='<option value="03">March</option>';
									str+='<option value="04">April</option>';
									str+='<option value="05">May</option>';
									str+='<option value="06">June</option>';
									str+='<option value="07">July</option>';
									str+='<option value="08">August</option>';
									str+='<option value="09">September</option>';
									str+='<option value="10">October</option>';
									str+='<option value="11">November</option>';
									str+='<option value="12">December</option>';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-3 meeSevaCompWeekDrpBlcId">';
								str+='<label>Select Week&nbsp;<span id="meeSevaCompWeekSpinnerId"></span></label>';
								str+='<select class="chosen-select form-control" id="meeSevaCompWeekId"  attr_div_id="'+divId+'" attr_blc_id="'+blockId+'">';
								str+='</select>';
							str+='</div>';
						str+='</div>';
						str+='<div class="pad_yash_bg border_yash m_top10">';
							str+='<div class="row">';
								str+='<div class="col-sm-12">';
									str+='<div id="meesevaSlaComparisionLineCgartId'+divId+''+blockId+'"></div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-12">';
								str+='<div id="meesevaSlaComparisionTableId'+divId+''+blockId+'" ></div>';
							str+='<div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	$("#meesevaSlaComparision"+divId+blockId).html(str);
	$('.chosen-select').chosen();
	$('#meeSevaCompMonthId option:eq('+month+')').prop('selected', true);
	$("#meeSevaCompMonthId").trigger("chosen:updated");
	if(divId == "meesevaSlaKpi"){
		getWeeksOfMonth("meeSevaCompWeekId",$("#meeSevaCompMonthId").val()+"-2018","Week",divId,blockId,$("#meeSevaCompMonthId").val(),year,"week_1");
	}
}
function getWeeksOfMonth(dropId,filterValue,type,divId,blockId,month,year,week){
	$('#meeSevaCompWeekSpinnerId').html(smallSpinner);
	var json = {
		"filterValue":filterValue, 
	}
	$.ajax({                
		type:'POST',    
		url: 'getWeeksOfMonth',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length > 0){
			$('#meeSevaCompWeekSpinnerId').html('');
			var str='';
			for(var i in result){
				if(result[i].id !=null && result[i].id ==1){
					str+='<option value="'+result[i].name.split("(")[0]+'" selected>'+result[i].name+'</option>';
				}else{
					str+='<option value="'+result[i].name.split("(")[0]+'">'+result[i].name+'</option>';
				}
				
			}
			$("#"+dropId).html(str);
			$("#"+dropId).trigger("chosen:updated");
			getPendingTransactionOverViewDetails(type,divId,blockId,month,year,$("#"+dropId).val());
			getDeptWiseTransactionOverViewDetails("department",type,month,year,$("#"+dropId).val(),"departmentWiseMeesavaSlaComparisionId");
			getDeptWiseTransactionOverViewDetails("service",type,month,year,$("#"+dropId).val(),"serviceWiseMeesavaSlaCmpBlcId");
		}
	});	
}
function getPendingTransactionOverViewDetails(type,divId,blockId,month,year,week){
	var jsonObj=getFilterTypeAndFilterValue(type,month,year,week);
	$("#meesevaSlaComparisionLineCgartId"+divId+blockId).html(spinner);
	$("#meesevaSlaComparisionTableId"+divId+blockId).html(spinner);
	var json = {
		"filterType":jsonObj.filterType,
		"filterValue":jsonObj.filterValue, 
		"locationScopeId":"2",
		"locationId":"1"	
	}
	$.ajax({                
		type:'POST',    
		url: 'getPendingTransactionOverViewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length > 0){
			buildPendingTransactionOverViewDetailsGrpah(result,"meesevaSlaComparisionLineCgartId",divId,blockId);
			buildPendingTransactionOverViewDetailsTable(result,"meesevaSlaComparisionTableId",divId,blockId);
		}else{
			$("#meesevaSlaComparisionLineCgartId"+divId+blockId).html("No Data Available");
			$("#meesevaSlaComparisionTableId"+divId+blockId).html("No Data Available");
		}
	});	
}
function buildPendingTransactionOverViewDetailsGrpah(result,graphId,divId,blockId){
	var categories=[];
	var beyondSLATotalPerc=[];
	var mainDataArr=[];
	for(var i in result[0].dayWiseList){
		categories.push(result[0].dayWiseList[i].name);
		beyondSLATotalPerc.push({"name":"Beyond SLA","count":parseInt(result[0].dayWiseList[i].beyondSLATotalCount),"y":parseFloat(result[0].dayWiseList[i].beyondSLATotalPerc)});
	}
	mainDataArr.push({"name":"Beyond SLA","data":beyondSLATotalPerc});
	buildPieChart(categories,mainDataArr,graphId,divId,blockId);
}
function buildPieChart(categories,mainDataArr,graphId,divId,blockId){
$("#"+graphId+divId+blockId).highcharts( {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Pending Transactions',
		align:'left',
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: categories
    },
    yAxis: {
        title: {
            text: 'T r a n s a c t i o n s'
        }
    },
	tooltip: {
		useHTML: true,
		formatter: function() {
			return '<h5 class="font_weight">'+ this.point.name+'</h5><h5 class="font_weight m_top5">Count: '+ this.point.count + '</h5><h5 class="font_weight text-success m_top5">Percentage: ' + this.y + ' %</h5>';
		}
	},
    plotOptions: {
        line: {
            dataLabels: {
                enabled	: true,
				format	:	'{y} %'
            },
            
        }
    },
    series: mainDataArr
});
	
}
function buildPendingTransactionOverViewDetailsTable(result,tableId,divId,blockId){
	var str='';
		str='<h5 class="pad_yash_bg border_yash m_top10">Meeseva SLA Comparision</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_custom_SC" id="meesevaSlaComparisionTableIdDataTable'+divId+''+blockId+'">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Date/Month/Week</th>';
						str+='<th>Total Pending</th>';
						str+='<th>Beyond SLA</th>';
						str+='<th>%</th>';
						str+='<th>With In SLA</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result[0].dayWiseList){
						if(result[0].dayWiseList[i].pendingTransactionCount !=null && result[0].dayWiseList[i].pendingTransactionCount>0){
							str+='<tr>';
								str+='<td>'+result[0].dayWiseList[i].name+'</td>';
								str+='<td>'+result[0].dayWiseList[i].pendingTransactionCount+'</td>';
								str+='<td>'+result[0].dayWiseList[i].beyondSLATotalCount+'</td>';
								if(result[0].dayWiseList[i].locationName != null && result[0].dayWiseList[i].locationName !=undefined){
									if(result[0].dayWiseList[i].locationName == "+ve"){
										str+='<td class="good_color">'+result[0].dayWiseList[i].beyondSLATotalPerc+'&nbsp;<i class="fa fa-arrow-down" aria-hidden="true" style="color:green;"></i></td>';
									}else{
										str+='<td class="bad_color">'+result[0].dayWiseList[i].beyondSLATotalPerc+'&nbsp;<i class="fa fa-arrow-up" aria-hidden="true" style="color:red;"></i></td>';
									}
								}else{
									str+='<td >'+result[0].dayWiseList[i].beyondSLATotalPerc+'</td>';
								}
								str+='<td>'+result[0].dayWiseList[i].withInSLATotalCount+'</td>';
								str+='<td>'+result[0].dayWiseList[i].withInSLATotalPerc+'</td>';
							str+='</tr>';
						}
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';	
		$("#meesevaSlaComparisionTableId"+divId+blockId).html(str);
		$("#meesevaSlaComparisionTableIdDataTable"+divId+blockId).dataTable({
			"iDisplayLength": 5,
			"aaSorting": [],
			"aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
		});
}
function getDeptWiseTransactionOverViewDetails(stateWise,type,month,year,week,tabId){
	var jsonObj=getFilterTypeAndFilterValue(type,month,year,week);
	$("#"+tabId).html(spinner);
	var json = {
		"filterType":jsonObj.filterType,
		"filterValue":jsonObj.filterValue,
		"type" : stateWise	
	}
	$.ajax({                
		type:'POST',    
		url: 'getDeptWiseTransactionOverViewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length > 0){
			buildDeptWiseTransactionOverViewDetails(result,tabId);
		}else{
			$("#"+tabId).html("No Data Available");
		}
	});	
}
function buildDeptWiseTransactionOverViewDetails(result,tabId){
	var str='';
	str='<h5 class="pad_yash_bg border_yash m_top10">Meeseva SLA Comparision</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_custom_SC" id="'+tabId+'DataTableId" style="width:100%;">';
				str+='<thead>';
					if(result[0].dayWiseList.length > 0){
						str+='<tr>';
							str+='<th rowspan="2" style="width:30%;text-align:left ! important;">Name</th>';
							for(var i in result[0].dayWiseList){
								str+='<th colspan="4">'+result[0].dayWiseList[i].name+'</th>';
							}
						str+='</tr>';
						str+='<tr>';
							for(var i in result[0].dayWiseList){
								str+='<th>Total</th>';
								str+='<th>Beyond SLA</th>';
								str+='<th style="min-width:6%;">%</th>';
								str+='<th></th>';
							}
						str+='</tr>'; 	
					}else{
						str+='<tr>';
							str+='<th style="text-align:left ! important;">Name</th>';
						str+='</str>';	
					}
				str+='</thead>';
				str+='<tbody>';
				for(var i in result){
					if(result[i].name != "Others"){
						str+='<tr>';
							str+='<td style="text-align:left !important;">'+result[i].name+'</td>';
							for(var j in result[i].dayWiseList){
								if(result[i].dayWiseList[j].pendingTransactionCount !=null && result[i].dayWiseList[j].pendingTransactionCount !=undefined 
								  && result[i].dayWiseList[j].pendingTransactionCount > 0 ){
									 str+='<td>'+result[i].dayWiseList[j].pendingTransactionCount+'</td>'; 
								}else{
									str+='<td>-</td>';
								}
								if(result[i].dayWiseList[j].beyondSLATotalCount !=null && result[i].dayWiseList[j].pendingTransactionCount !=undefined 
								  && result[i].dayWiseList[j].pendingTransactionCount > 0 ){
									 str+='<td>'+result[i].dayWiseList[j].beyondSLATotalCount+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if( result[i].dayWiseList[j].beyondSLATotalPerc !=null && result[i].dayWiseList[j].beyondSLATotalPerc !=undefined 
								   ){
									if(result[i].dayWiseList[j].locationName == "+ve"){
										str+='<td class="good_color">'+result[i].dayWiseList[j].beyondSLATotalPerc+'</td>';
										str+='<td class="good_color"><i class="fa fa-arrow-down" aria-hidden="true" style="color:green;"></i></td>';
									}else if(result[i].dayWiseList[j].locationName == "-ve"){
										str+='<td class="bad_color">'+result[i].dayWiseList[j].beyondSLATotalPerc+'</td>';
										str+='<td class="bad_color"><i class="fa fa-arrow-up" aria-hidden="true" style="color:red;"></i></td>';
										
									}else{
										str+='<td>'+result[i].dayWiseList[j].beyondSLATotalPerc+'</td>';
										str+='<td>-</td>'; 
									}
									
								}else{
									str+='<td>-</td>';
									str+='<td>-</td>';
								}
								
							}
						str+='</tr>';
					}
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';	
		$("#"+tabId).html(str);
		$("#"+tabId+"DataTableId").dataTable({
			"iDisplayLength": 5,
			"aaSorting": [],
			"aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
		});
	
}
function getFilterTypeAndFilterValue(type,month,year,week){
	var jsonObj=[];
	var filterType="";
	var filterValue="";
	if(type == "Week"){
		filterType="Week";
		filterValue=month+"-"+year+"-"+week;
	}else if(type == "Month"){
		filterType="Month";
		filterValue=month+"-"+year;
	}else if(type == "Year"){
		filterType="Year";
		filterValue=year;
	}
	jsonObj ={"filterType":filterType,"filterValue":filterValue};
	return jsonObj;
}
function getMeesevaSLADepartmentDetails(divId,blockId){
	$("#meesevaSlaDepartmentWise"+divId+blockId).html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLADepartmentDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLADepartmentDetails(result,divId,blockId);
		}else{
			$("#meesevaSlaDepartmentWise"+divId+blockId).html("No Data Available");
		}
		
	});	
}
function buildMeesevaSLADepartmentDetails(result,divId,blockId){
	var totalCatAServices = 0;
	var totalCatATransactions = 0;
	var totalCatBServices = 0;
	var totalCatBTransactions = 0;
	var totalCatBSLATransactions = 0;
	var totalCatBWithinSLA = 0;
	var totalCatBbeyondSLA = 0;
	var totalCatBwithinSLAperc =0.0;
	var totalCatBBeyondSLAPerc =0.0;
	var str='';
	str+='<div class="panel-group" id="accordionDeptSLA" role="tablist" aria-multiselectable="true">';
			str+='<div class="panel panel-default panel-black">';
				str+='<div class="panel-heading" role="tab" id="headingDeptSLA">';
					str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionDeptSLA" href="#collapseDeptSLA" aria-expanded="true" aria-controls="collapseDeptSLA">';
						str+='<h4 class="panel-title">DEPARTMENTS WISE</h4>';
					str+='</a>';
				str+='</div>';
			str+='<div id="collapseDeptSLA" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingDeptSLA">';
				str+='<div class="panel-body">';
					str+='<ul class="list-inline switch-btn meeSevaOverViewCmpDeptWiseCls">';
						str+='<li attr_type="details" attr_tab_id="departmentWiseMeesavaSlaId">Details</li>';
						str+='<li class="active" attr_type="comparison" attr_tab_id="departmentWiseMeesavaSlaComparisionId">Comparison</li>';
					str+='</ul>';
					str+='<div class="table-responsive departmentWiseOverAllShowHideCls m_top10" id="departmentWiseMeesavaSlaId" style="display:none;">';
						str+='<table class="table table_customP " id="departmentWiseMeesavaSla" style="width:100%">';
							str+='<thead>';
								str+='<tr>';
									str+='<th rowspan="2">Department</th>';
									str+='<th colspan="2" class="text-center" style="border-left:1px solid #ccc;">Category - A</th>';
									str+='<th colspan="7" class="text-center" style="border-left:1px solid #ccc;">Category - B</th>';
								str+='</tr>';
								str+='<tr>';
									str+='<th style="background-color: #FDF1F1 !important;">Services</th>';
									str+='<th>Transactions</th>';
									//str+='<th>With in SLA</th>';
									//str+='<th>Beyond SLA</th>';
									str+='<th style="border-left:1px solid #ccc;">Services</th>';
									str+='<th>Transactions</th>';
									str+='<th>Total Pending</th>';
									str+='<th>With in SLA</th>';
									str+='<th>%</th>';
									str+='<th>Beyond SLA</th>';
									str+='<th>%</th>';
								str+='</tr>';
							str+='</thead>';
							str+='<tbody>';
								for(var i in result){
									var catBWithSLAValue = result[i].catgryBWithInSLACount;
									var catBBeyondSLAValue = result[i].catgryBBeyondSLACount;
									var catBTotalSLATrans = parseInt(catBWithSLAValue)+parseInt(catBBeyondSLAValue);
									var catBWithSLAPerc = "0.00";
									var catBBeyondSLAPerc = "0.00";
									totalCatAServices = totalCatAServices + result[i].catgryAServicesCount ;
									totalCatATransactions = totalCatATransactions + result[i].catgryATransCount;
									totalCatBServices = totalCatBServices + result[i].catgryBServicesCount;
									totalCatBTransactions = totalCatBTransactions + result[i].catgryBTransCount;
									totalCatBSLATransactions = totalCatBSLATransactions + catBTotalSLATrans;
									totalCatBWithinSLA = totalCatBWithinSLA + result[i].catgryBWithInSLACount;
									totalCatBbeyondSLA = totalCatBbeyondSLA + result[i].catgryBBeyondSLACount;
									
									if(catBWithSLAValue > 0 && result[i].catgryBTransCount > 0)
										catBWithSLAPerc = ((catBWithSLAValue*100)/catBTotalSLATrans).toFixed(2);
									if(catBBeyondSLAValue > 0 && result[i].catgryBTransCount > 0)
										catBBeyondSLAPerc = ((catBBeyondSLAValue*100)/catBTotalSLATrans).toFixed(2);
									str+='<tr>';
										str+='<td style="border-right:1px solid #ccc; text-align:left !important;" attr_dept_id="'+result[i].id+'" class="departmentModalClkCls" attr_header="'+result[i].name+'" attr_block_name="departmentWiseBlock" attr_levelType="department"><a>'+result[i].name+'</a></td>';
										if(result[i].catgryAServicesCount !=null && result[i].catgryAServicesCount>0 ){
											str+='<td>'+result[i].catgryAServicesCount+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].catgryATransCount !=null && result[i].catgryATransCount>0){
											str+='<td>'+result[i].catgryATransCount+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].catgryBServicesCount !=null && result[i].catgryBServicesCount>0){
											str+='<td>'+result[i].catgryBServicesCount+'</td>';
										}else{
											str+='<td>-</td>';
										}
										
										/* if(result[i].catgryAWithInSLACount !=null && result[i].catgryAWithInSLACount>0){
											str+='<td>'+result[i].catgryAWithInSLACount+'</td>';
										}else{
											str+='<td>-</td>';
										}
										
										if(result[i].catgryABeyondSLACount !=null && result[i].catgryABeyondSLACount>0){
											str+='<td>'+result[i].catgryABeyondSLACount+'</td>';
										}else{
											str+='<td>-</td>';
										} */
										if(result[i].catgryBTransCount !=null && result[i].catgryBTransCount>0){
											str+='<td>'+result[i].catgryBTransCount+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(catBTotalSLATrans !=null && catBTotalSLATrans >0)
											str+='<td>'+catBTotalSLATrans+'</td>';
										else
											str+='<td>-</td>';
										
										if(result[i].catgryBWithInSLACount !=null && result[i].catgryBWithInSLACount>0){
											str+='<td>'+result[i].catgryBWithInSLACount+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(catBWithSLAPerc !=null && catBWithSLAPerc >0)
											str+='<td>'+catBWithSLAPerc+'</td>';
										else
											str+='<td>-</td>';
										
										if(result[i].catgryBBeyondSLACount !=null && result[i].catgryBBeyondSLACount>0){
											str+='<td>'+result[i].catgryBBeyondSLACount+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(catBBeyondSLAPerc !=null && catBBeyondSLAPerc >0)
											str+='<td>'+catBBeyondSLAPerc+'</td>';
										else
											str+='<td>-</td>';
										//str+='<td>'+catBBeyondSLAPerc+'</td>';
									str+='</tr>';
								}
							str+='</tbody>';
							if(totalCatBWithinSLA > 0 && totalCatBSLATransactions > 0)
								totalCatBwithinSLAperc = ((totalCatBWithinSLA*100)/totalCatBSLATransactions).toFixed(2);
							if(totalCatBbeyondSLA > 0 && totalCatBSLATransactions > 0)
								totalCatBBeyondSLAPerc = ((totalCatBbeyondSLA*100)/totalCatBSLATransactions).toFixed(2);
							str+='<tr>';
								str+='<th>Total</th>';
								if(totalCatAServices !=null && totalCatAServices>0 ){
									str+='<td>'+totalCatAServices+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCatATransactions !=null && totalCatATransactions>0 ){
									str+='<td>'+totalCatATransactions+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCatBServices !=null && totalCatBServices>0 ){
									str+='<td>'+totalCatBServices+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCatBTransactions !=null && totalCatBTransactions>0 ){
									str+='<td>'+totalCatBTransactions+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCatBSLATransactions != null && totalCatBSLATransactions>0 ){
									str+='<td>'+totalCatBSLATransactions+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCatBWithinSLA !=null && totalCatBWithinSLA>0 ){
									str+='<td>'+totalCatBWithinSLA+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCatBwithinSLAperc !=null && totalCatBwithinSLAperc>0 ){
									str+='<td>'+totalCatBwithinSLAperc+'</td>';
								}else{
									str+='<td>-</td>';
								} 
								if(totalCatBbeyondSLA !=null && totalCatBbeyondSLA>0 ){
									str+='<td>'+totalCatBbeyondSLA+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCatBBeyondSLAPerc !=null && totalCatBBeyondSLAPerc>0 ){
									str+='<td>'+totalCatBBeyondSLAPerc+'</td>';
								}else{
									str+='<td>-</td>';
								} 
							str+='</tr>';
						str+='</table>';
					str+='</div>';
					str+='<div id="departmentWiseMeesavaSlaComparisionId" class="departmentWiseOverAllShowHideCls m_top10"></div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	$("#meesevaSlaDepartmentWise"+divId+blockId).html(str);
	$("#departmentWiseMeesavaSla").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"retrieve": true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}, 
			/* {
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o" attr_id="departmentWiseMeesavaSla"></i>',
				titleAttr: 'PDF',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				orientation: "landscape",
				pageSize:'A3',
				customize: function(doc) {
					 doc.defaultStyle.alignment = 'center';
					 doc.styles.tableHeader.alignment = 'center';
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				}  				
			}  */
		]
	});
}
function getMeesevaSLAServiceWiseDetails(divId,blockId){
	$("#meesevaSlaServiceWise"+divId+blockId).html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLAServiceWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLAServiceWiseDetails(result,divId,blockId);
		}else{
			$("#meesevaSlaServiceWise"+divId+blockId).html("No Data Available");
		}
		
	});	
}
function buildMeesevaSLAServiceWiseDetails(result,divId,blockId){
	var totalTransactions = 0;
	var totalApproved = 0;
	var totalRevoked = 0;
	var totalRejected = 0;
	var totalInprogress = 0;
	var totalWithinSLA = 0;
	var totalBeyondSLA = 0;
	var rejectedPerc = 0.0;
	var beyondSLAPerc = 0.0;
	var str='';
	str+='<div class="panel-group" id="accordionServSLA" role="tablist" aria-multiselectable="true">';
			str+='<div class="panel panel-default panel-black">';
				str+='<div class="panel-heading" role="tab" id="headingServSLA">';
					str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionDeptSLA" href="#collapseServSLA" aria-expanded="true" aria-controls="collapseServSLA">';
						str+='<h4 class="panel-title">SERVICE WISE</h4>';
					str+='</a>';
				str+='</div>';
			str+='<div id="collapseServSLA" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingServSLA">';
				str+='<div class="panel-body">';
					str+='<div class="row">';
						str+='<div class="col-sm-12">';
							str+='<ul class="list-inline switch-btn meeSevaOverViewCmpSerWiseCls">';
								str+='<li class="active" attr_type="details" attr_tab_id="serviceWiseMeesavaSlaCmpDetBlcId">Details</li>';
								str+='<li attr_type="comparison" attr_tab_id="serviceWiseMeesavaSlaCmpBlcId">Comparison</li>';
							str+='</ul>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="row">';
						str+='<div class="col-sm-12 m_top10">';
							str+='<label class="checkbox-inline">';
							  str+='<input type="checkbox" name="filter" id="inlineCheckbox1" value="CATA">CATA';
							str+='</label>';
							str+='<label class="checkbox-inline">';
							  str+='<input type="checkbox" name="filter" id="inlineCheckbox2" value="CATB">CATB';
							str+='</label>';
							str+='<label class="checkbox-inline">';
							 str+='<input type="checkbox" name="filter" id="inlineCheckbox3" value="CATAB">CAT A&B';
							str+='</label>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="row">';
						str+='<div class="col-sm-12 m_top20">';
							str+='<div id="serviceWiseMeesavaSlaCmpDetBlcId" class="showHideMeesavaSlaServiceTabCls">';
								str+='<div class="table-responsive">';
									str+='<table class="table table_customPS" id="serviceWiseMeesavaSla">';
										str+='<thead>';
											str+='<tr>';
												str+='<th>Department</th>';
												str+='<th>Service name</th>';
												str+='<th>Category</th>';
												str+='<th>Transactions</th>';
												str+='<th style="border-left:1px solid #ddd !important">Approved</th>';
												str+='<th>Revoked</th>';
												str+='<th>Rejected</th>';
												str+='<th style="border-right:1px solid #ddd !important">Rejected %</th>';
												str+='<th>InProgess</th>';
												str+='<th>With in SLA</th>';
												str+='<th>Beyond SLA</th>';
												str+='<th>Beyond SLA%</th>';									
											str+='</tr>';
										str+='</thead>';
										str+='<tbody>';
											for(var i in result){
												var BeyondPerc=0;
												var totalRejectedPerc=0;
												var total=result[i].totalWithInSlaCount+result[i].totalBeyondSlaCount;
												var totalRejectedCount=result[i].approved+result[i].revoke+result[i].rejected;
												BeyondPerc = (result[i].totalBeyondSlaCount*100/total).toFixed(2);
												totalRejectedPerc = (result[i].rejected/totalRejectedCount*100).toFixed(2);
												
												totalTransactions =totalTransactions + result[i].totalTransactionCount;
												totalApproved = totalApproved + result[i].approved;
												totalRevoked = totalRevoked + result[i].revoke;
												totalRejected = totalRejected + result[i].rejected; 
												totalInprogress = totalInprogress + total;
												totalWithinSLA = totalWithinSLA + result[i].totalWithInSlaCount;
												totalBeyondSLA = totalBeyondSLA + result[i].totalBeyondSlaCount; 
												rejectedPerc = rejectedPerc + parseFloat(totalRejectedPerc);
												beyondSLAPerc = beyondSLAPerc + parseFloat(BeyondPerc);
												str+='<tr>';
													str+='<td>'+result[i].name+'</td>';
													str+='<td class="departmentModalClkCls" attr_block_name="serviceBlock" attr_header="'+result[i].serviceName+'" attr_dept_id="'+result[i].departmentId+'" attr_serviceId="'+result[i].id+'" attr_serviceType="'+result[i].serviceType+'" attr_levelType="service"     style="text-align:left !important;"><a>'+result[i].serviceName+'</a></td>';
													
													str+='<td>'+result[i].cateoryA.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'</td>';
													
													if(result[i].totalTransactionCount !=null && result[i].totalTransactionCount>0){
														str+='<td>'+result[i].totalTransactionCount+'</td>';
													}else{
														str+='<td>-</td>';
													}
													if(result[i].approved !=null && result[i].approved>0){
														str+='<td style="border-left:1px solid #ddd !important">'+result[i].approved+'</td>';
													}else{
														str+='<td style="border-left:1px solid #ddd !important">-</td>';
													}
													if(result[i].revoke !=null && result[i].revoke>0){
														str+='<td>'+result[i].revoke+'</td>';
													}else{
														str+='<td>-</td>';
													}
													if(result[i].rejected !=null && result[i].rejected>0){
														str+='<td>'+result[i].rejected+'</td>';
													}else{
														str+='<td>-</td>';
													}
													if(totalRejectedCount !=null && totalRejectedCount>0){
														str+='<td style="border-right:1px solid #ddd !important">'+totalRejectedPerc+'</td>';
													}else{
														str+='<td style="border-right:1px solid #ddd !important">-</td>';
													}
													
													str+='<td>'+total+'</td>';
													str+='<td>'+result[i].totalWithInSlaCount+'</td>';
													str+='<td>'+result[i].totalBeyondSlaCount+'</td>';
													if(total !=null && total>0){
														str+='<td>'+BeyondPerc+'</td>';
													}else{
														str+='<td>-</td>';
													}	
												str+='</tr>';
											}
										str+='</tbody>';
										if(totalRejected >0 && totalApproved >0 && totalRevoked >0 && totalRejected>0){
											rejectedPerc = ((totalRejected)*100/(totalApproved+totalRevoked+totalRejected)).toFixed(2);
										}
										if(totalBeyondSLA >0 && totalInprogress >0){
											beyondSLAPerc = (totalBeyondSLA*100/totalInprogress).toFixed(2);
										}
										str+='<tr>';
											str+='<th>Total</th>';
											str+='<td>-</td>';
											str+='<td>-</td>';
											if(totalTransactions !=null && totalTransactions>0){
												str+='<td>'+totalTransactions+'</td>';
											}else{
												str+='<td>-</td>';
											}
											if(totalApproved !=null && totalApproved>0){
												str+='<td>'+totalApproved+'</td>';
											}else{
												str+='<td>-</td>';
											}
											if(totalRevoked !=null && totalRevoked>0){
												str+='<td>'+totalRevoked+'</td>';
											}else{
												str+='<td>-</td>';
											}
											if(totalRejected !=null && totalRejected>0){
												str+='<td>'+totalRejected+'</td>';
											}else{
												str+='<td>-</td>';
											}
											if(rejectedPerc !=null && rejectedPerc>0){
												str+='<td>'+rejectedPerc+'</td>';
											}else{
												str+='<td>-</td>';
											}
											if(totalInprogress !=null && totalInprogress>0){
												str+='<td>'+totalInprogress+'</td>';
											}else{
												str+='<td>-</td>';
											}
											if(totalWithinSLA !=null && totalWithinSLA>0){
												str+='<td>'+totalWithinSLA+'</td>';
											}else{
												str+='<td>-</td>';
											}
											if(totalBeyondSLA !=null && totalBeyondSLA>0){
												str+='<td>'+totalBeyondSLA+'</td>';
											}else{
												str+='<td>-</td>';
											}
											if(beyondSLAPerc !=null && beyondSLAPerc>0){
												str+='<td>'+beyondSLAPerc+'</td>';
											}else{
												str+='<td>-</td>';
											}
										str+='</tr>';
									str+='</table>';
									
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="row">';
						str+='<div class="col-sm-12">';
							str+='<div id="serviceWiseMeesavaSlaCmpBlcId" class="showHideMeesavaSlaServiceTabCls" style="display:none;"></div>';
						str+='</div>';
					str+='</div>';
					
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	$("#meesevaSlaServiceWise"+divId+blockId).html(str);
	var filter_magic = function(e) {
		var trs = $('#serviceWiseMeesavaSla tr:not(:first)');

		trs.hide();
		var showAll = true;
		$('input[type="checkbox"][name="filter"]').each(function() {
			if ($(this).is(':checked')) {
				var val = $(this).val();
				trs.each(function() {
					var tr = $(this);
					var td = tr.find('td:nth-child(3)');
					
					if (td.text() === val) {
						tr.show();
						showAll = false;
					}
				});
			}
		});
		if (showAll) {
			trs.show();
		}
	};

	$('input[type="checkbox"][name="filter"]').on('change', filter_magic);
	filter_magic();
	
	$("#serviceWiseMeesavaSla").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"retrieve": true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			} ,
			/* {
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				orientation: "landscape",
				pageSize:'A3',
				customize: function(doc) {
					 doc.defaultStyle.alignment = 'center';
					 doc.styles.tableHeader.alignment = 'center';
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				} 
			}  */
		]
	});
	
		
		
	
}

function getMeesevaKPIOverViewDetails(type,divId,blockId){
	$("#"+divId+"Block"+blockId).html(spinner);
	
	var json = {
		type:"KPI"
		//year : "2017"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPIOverViewDetailsNew',//'getMeesevaKPIOverViewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			var totalCentres = 0;
			if(type == "onload"){
				for(var i in result){
					if(i == 0){
						totalCentres=result[0].ruralCount+result[0].urbanCount;
					}
					$("#meesevaKPIHeadingId").html(totalCentres);
				}/* else{
					$("#meesevaKPIHeadingId").html("0")
				} */
			}
			buildMeesevaKPIOverViewDetails(result,divId,blockId);
		}else{
			$("#"+divId+"Block"+blockId).html("No Data Available");
		}
		getMeesevaKPITargetAchieveDetails();
		getMeesevaKPILocationWiseDetails(divId,blockId);
		//getMeesevaKPIOnlineServiceDetails();Old Call FR Online Services
		//getMeesevaKPIMobileSevicesDetails();Old Call FR Mobile App Services
		getMeesevaKPIOnlineServiceOverviewCount();
		getMeesevaKPIMobileAppServiceOverviewCount();
		getMeesevaKPIOnlineServiceYearWiseDetails();//New Call FR Online Services
		getMeesevaKPIMobileSevicesYearWiseDetails();//New Call FR Mobile App Services
		getMeesevaKPINewOnlineServiceOverviewCount();//New OnLine Services OverView
		getMeesevaKPINewOnlineServiceYearWiseDetails();//New OnLine Services Year Data
	});	
}
function buildMeesevaKPIOverViewDetails(result,divId,blockId){
	var str='';
	var totalCentresMain=0;
	var totalCentresYears=0;
	if(result !=null && result.length>0){
		str+='<div class="white_block_ITC m_top10">';
			str+='<div class="row">';
			for(var i in result){
				totalCentres=result[i].ruralCount+result[i].urbanCount+result[0].totalMeesevaCentres;
					if(i==0){
						str+='<div class="col-sm-4">';
							str+='<div class="media">';
								str+='<div class="media-left">';
									str+='<img src="Assests/icons/ITC/police-station.png" style="padding-left:20px;">';
								str+='</div>';
								str+='<div class="media-body" style="padding-left:20px;padding-top:10px;">';
										str+='<h4 class="">Total Meeseva Centers</h4>';
										str+='<h3 class="font_weight m_top10">'+totalCentres+'</h3>';
								str+='</div>';
							str+='</div>';
							str+='<div class="row">';
								str+='<div class="col-sm-6 m_top40">';
									str+='<h4 class="">Rural Centers</h4>';
									str+='<h3 class="font_weight m_top5">'+result[i].ruralCount+'</h3>';
								str+='</div>';
								str+='<div class="col-sm-6 m_top40">';
									str+='<h4 class="">Urban Centers</h4>';
									str+='<h3 class="font_weight m_top5">'+result[i].urbanCount+'</h3>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					}
				}
				//
				str+='<div class="col-sm-8">';
					str+='<div class="row">';
					
					for(var i in result){
						if(i!=0){
						totalCentresYears=result[i].ruralCount+result[i].urbanCount;
						str+='<div class="col-sm-3">';
							str+='<div style="padding:10px;border: 2px solid #B8B8B8;border-radius:10px;">';
									str+='<h4 class="f_16 text-center">'+result[i].name+'</h4>';
									str+='<h3 class="font_weight m_top10 text-center">'+totalCentresYears+'</h3>';
									str+='<div class="row">';
										str+='<div class="col-sm-6 m_top15 text-center">';
											str+='<h4 class="" style="font-size:15px;">Rural</h4>';
											str+='<h4 class="font_weight m_top10">'+result[i].ruralCount+'</h4>';
										str+='</div>';
										str+='<div class="col-sm-6 m_top15 text-center">';
											str+='<h4 class="" style="font-size:15px;">Urban</h4>';
											str+='<h4 class="font_weight m_top10">'+result[i].urbanCount+'</h4>';
										str+='</div>';
									str+='</div>';	
								str+='</div>';
							str+='</div>';
						}
					}	
					str+='</div>';
				str+='</div>';
				
				str+='</div>';	
			str+='</div>';
	}
	str+='<div class="row">';
		str+='<div class="col-sm-4  m_top10">';
			str+='<div class="white_block_ITC">';
				str+='<div id="newOnlineSerOvrCuntCls"></div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-4  m_top10">';
			str+='<div class="white_block_ITC">';
				str+='<div id="onlineSerOvrCuntCls"></div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-4  m_top10">';
			str+='<div class="white_block_ITC">';
					str+='<div id="mobileAppSerOvrCuntCls"></div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-12">';
		
			str+='<div class="panel-group" id="accordionMonthKPI" role="tablist" aria-multiselectable="true">';
				str+='<div class="panel panel-default panel-black">';
						str+='<div class="panel-heading" role="tab" id="headingMonthKPI">';
							str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionMonthKPI" href="#collapseMonthKPI" aria-expanded="true" aria-controls="collapseMonthKPI">';
								str+='<h4 class="panel-title">MEESEVA CENTERS TARGET VS ACHIEVEMENT</h4>';
							str+='</a>';
						str+='</div>';
					str+='<div id="collapseMonthKPI" class="panel-collapse collapse in " role="tabpanel" aria-labelledby="headingMonthKPI">';
						str+='<div class="panel-body">';
							str+='<div class="row">';
							str+='<div class="col-sm-12">';
								str+='<ul class="list-inline liboderCls pull-right" style="cursor:pointer;">';
									str+='<li attr_type="2014-15">2014-15</li>';
									str+='<li attr_type="2016-17">2016-17</li>';
									str+='<li attr_type="2017-18">2017-18</li>';
									str+='<li class="active" attr_type="2018-19">2018-19</li>'
								str+='</ul>'; 
							str+='</div>';
							str+='</div>';
							str+='<div id="monthWiseMeesavaKPIGraph" style="height:300px;" class="m_top15"></div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			
			
		str+='</div>';
	str+='</div>';
	
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-12">';
		
			str+='<div class="panel-group" id="accordionlocationKPI" role="tablist" aria-multiselectable="true">';
				str+='<div class="panel panel-default panel-black">';
						str+='<div class="panel-heading" role="tab" id="headinglocationKPI">';
							str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionlocationKPI" href="#collapselocationKPI" aria-expanded="true" aria-controls="collapselocationKPI">';
								str+='<h4 class="panel-title">LOCATION WISE MEESEVA CENTERS</h4>';
							str+='</a>';
						str+='</div>';
					str+='<div id="collapselocationKPI" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headinglocationKPI">';
						str+='<div class="panel-body">';
							str+='<div id="locationWiseMeesavaCentres"></div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			
			
		str+='</div>';
	str+='</div>';
	
	//New OnLine Services
	str+='<div class="row m_top10 OnlinServiceKPIOpen">';
		str+='<div class="col-sm-4">';
			str+='<div class="panel-group" id="accordionNewOnlinServiceKPI" role="tablist" aria-multiselectable="true">';
				str+='<div class="panel panel-default panel-black">';
						str+='<div class="panel-heading" role="tab" id="headingNewOnlinServiceKPI">';
							str+='<a role="button" class="panelCollapseIcon NewOnlinServiceKPICollapsed collapsed"  data-toggle="collapse" data-parent="#accordionNewOnlinServiceKPI" href="#collapseNewOnlinServiceKPI" aria-expanded="true" aria-controls="collapseNewOnlinServiceKPI">';
								str+='<h4 class="panel-title">KIOSK-MEESEVA SERVICES</h4>';
							str+='</a>';
						str+='</div>';
					str+='<div id="collapseNewOnlinServiceKPI" class="panel-collapse collapse newOnlinServiceKPICollapsedIN" role="tabpanel" aria-labelledby="headingNewOnlinServiceKPI">';
						str+='<div class="panel-body borderColorCSSBlack table-responsive">';
							str+='<div id="newOnlineServicesDiv"></div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		//OnLine Services
	 // str+='<div class="row m_top10 OnlinServiceKPIOpen">';
		str+='<div class="col-sm-4">';
			str+='<div class="panel-group" id="accordionOnlinServiceKPI" role="tablist" aria-multiselectable="true">';
				str+='<div class="panel panel-default panel-black">';
						str+='<div class="panel-heading" role="tab" id="headingOnlinServiceKPI">';
							str+='<a role="button" class="panelCollapseIcon OnlinServiceKPICollapsed collapsed"  data-toggle="collapse" data-parent="#accordionOnlinServiceKPI" href="#collapseOnlinServiceKPI" aria-expanded="true" aria-controls="collapseOnlinServiceKPI">';
								str+='<h4 class="panel-title">ONLINE SERVICES</h4>';
							str+='</a>';
						str+='</div>';
					str+='<div id="collapseOnlinServiceKPI" class="panel-collapse collapse OnlinServiceKPICollapsedIN" role="tabpanel" aria-labelledby="headingOnlinServiceKPI">';
						str+='<div class="panel-body borderColorCSSBlack table-responsive">';
							str+='<div id="onlineServicesDiv"></div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		//Mobile App Services
		str+='<div class="col-sm-4">';
			str+='<div class="panel-group" id="accordionMobileAppServiceKPI" role="tablist" aria-multiselectable="true">';
				str+='<div class="panel panel-default panel-black">';
						str+='<div class="panel-heading" role="tab" id="headingMobileAppServiceKPI">';
							str+='<a role="button" class="panelCollapseIcon mobileKPICollapsed collapsed"  data-toggle="collapse" data-parent="#accordionMobileAppServiceKPI" href="#collapseMobileAppServiceKPI" aria-expanded="true" aria-controls="collapseMobileAppServiceKPI">';
								str+='<h4 class="panel-title">MOBILE APP SERVICES</h4>';
							str+='</a>';
						str+='</div>';
					str+='<div id="collapseMobileAppServiceKPI" class="panel-collapse collapse mobileKPICollapsedIN" role="tabpanel" aria-labelledby="headingMobileAppServiceKPI">';
						str+='<div class="panel-body borderColorCSSBlack table-responsive">';
							str+='<div id="mobileAppServicesDiv"></div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	
	$("#"+divId+"Block"+blockId).html(str);
}
function getMeesevaKPITargetAchieveDetails(){
	$("#monthWiseMeesavaKPIGraph").html(spinner)
	var json = {
		fromDate:globalFromDateKPI,
		toDate:globalToDateKPI
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaCentersTargetAchievement',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			var targetArr=[];
			var ruralArr=[];
			var urbanArr=[];
			var monthArr=[];
			for(var i in result){
					targetArr.push(result[i].target)
					ruralArr.push(result[i].ruralCount)
					urbanArr.push(result[i].urbanCount)
					monthArr.push(result[i].name)
				}
					$("#monthWiseMeesavaKPIGraph").highcharts({
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
							 categories:monthArr
						},
						yAxis: {
							 min: 0,
							 gridLineWidth: 0,
							 minorGridLineWidth: 0,
							title: {
								text: ''
							},
						},
						legend: {
							enabled: true
						},
						tooltip: {
							 pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
							 shared: true
						},

						plotOptions: {
							column: {
								stacking: 'normal',
								  dataLabels: {
									enabled: true,
									color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'gray',
									formatter: function() {
										return (this.y);
									},
								},
							}
						},

						series: [
							{
								name: 'Target',
								data: targetArr,
								 stack: 'male',
								color:"#7CB5EC"

							},
							{
								name: 'Rural',
								data: ruralArr,
								stack: 'female',
								color:"#D8AEEC"

							},{
								name: 'Urban',
								data: urbanArr,
								stack: 'female',
								color:"#7E576F"

							}]
					});
			}else{
				$("#monthWiseMeesavaKPIGraph").html("No Data Available")
			}
		});	
	}

function getMeesevaKPILocationWiseDetails(divId,blockId){
	$("#locationWiseMeesavaCentres").html(spinner);
	var json = {
		type : "district"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPILocationWiseDetailsNew',//'getMeesevaKPILocationWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaKPILocationWiseDetails(result);
		}else{
			$("#locationWiseMeesavaCentres").html("No Data Available")
		}
	});	
}
function buildMeesevaKPILocationWiseDetails(result){
	var str='';
	str+='<table class="table table_custom_slaKPI table-bordered" id="locationWiseMeesavaKPI" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2" class="text-center">District</th>';
					str+='<th colspan="3" class="text-center">Total Meeseva Center</th>';
					str+='<th colspan="3" class="text-center">Est. From 2014</th>';
					str+='<th colspan="3" class="text-center">Est. In Last Year</th>';
					str+='<th colspan="3" class="text-center">Est. In This Year</th>';
					str+='<th colspan="3" class="text-center">Est. Last 30 Days</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th style="background-color:#F5F0F7 !important;">Total</th>';
					str+='<th>Rural</th>';
					str+='<th style="background-color:#F5F0F7 !important;">Urban</th>';
					str+='<th>Total</th>';
					str+='<th>Rural</th>';
					str+='<th>Urban</th>';
					str+='<th>Total</th>';
					str+='<th>Rural</th>';
					str+='<th>Urban</th>';
					str+='<th>Total</th>';
					str+='<th>Rural</th>';
					str+='<th>Urban</th>';
					str+='<th>Total</th>';
					str+='<th>Rural</th>';
					str+='<th>Urban</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td>'+result[i].name+'</td>';
						/* str+='<td class="mesevaCntrDetailsCls" attr_district_id="'+result[i].districtIdStr+'" attr_district_name="'+result[i].name+'" style="cursor:pointer;"><u>'+result[i].totalMeesevaCentres+'</u></td>'; */
						if(result[i].totalMeesevaCentres != null && result[i].totalMeesevaCentres > 0){
							str+='<td>'+result[i].totalMeesevaCentres+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].meesevaCentersRural != null && result[i].meesevaCentersRural > 0){
							str+='<td>'+result[i].meesevaCentersRural+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].meesevaCentersUrban != null && result[i].meesevaCentersUrban > 0){
							str+='<td>'+result[i].meesevaCentersUrban+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].establishedFrom2014 != null && result[i].establishedFrom2014 > 0){
							str+='<td>'+result[i].establishedFrom2014+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].from2014Rural != null && result[i].from2014Rural > 0){
							str+='<td>'+result[i].from2014Rural+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].from2014Urban != null && result[i].from2014Urban > 0){
							str+='<td>'+result[i].from2014Urban+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].establishedLastYear != null && result[i].establishedLastYear > 0){
							str+='<td>'+result[i].establishedLastYear+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].lastYearRural != null && result[i].lastYearRural > 0){
							str+='<td>'+result[i].lastYearRural+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].lastYearUrban != null && result[i].lastYearUrban > 0){
							str+='<td>'+result[i].lastYearUrban+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].establishedThisYear != null && result[i].establishedThisYear > 0){
							str+='<td>'+result[i].establishedThisYear+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].thisYearRural != null && result[i].thisYearRural > 0){
							str+='<td>'+result[i].thisYearRural+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].thisYearUrban != null && result[i].thisYearUrban > 0){
							str+='<td>'+result[i].thisYearUrban+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].establishedLastOneMonth != null && result[i].establishedLastOneMonth > 0){
							str+='<td>'+result[i].establishedLastOneMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].lastMnthRural != null && result[i].lastMnthRural > 0){
							str+='<td>'+result[i].lastMnthRural+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].lastMnthUrban != null && result[i].lastMnthUrban > 0){
							str+='<td>'+result[i].lastMnthUrban+'</td>';
						}else{
							str+='<td>-</td>';
						}
					str+='</tr>';
				}
			str+='</tbody>';
		str+='</table>';
		$("#locationWiseMeesavaCentres").html(str);
		$("#locationWiseMeesavaKPI").dataTable({
				"iDisplayLength": 15,
				"order": [ 1, 'desc' ],
				"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
				"retrieve": true
			});
}
function getMeesevaKPIOnlineDeptWiseDetails(departmentId,year){
	$("#kpiOnlineDeptDivId").html(spinner);
	var json = {
		year : year,
		deptId : departmentId
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPIOnlineDeptWiseCuntDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaKPIOnlineDeptWiseDetails(result);
		}else{
			$("#kpiOnlineDeptDivId").html("No Data Available")
		}
	});	
}

function getMeesevaKPIOnlineServiceYearWiseDetails(){
	$("#onlineServicesDiv").html(spinner);
	var json = {
		year : "2014"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPIOnlineServiceYearWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaKPIOnlineServiceDetails(result,'online');
		}else{
			$("#onlineServicesDiv").html("No Data Available")
		}
	});	
}

function buildMeesevaKPIOnlineServiceDetails(result,type){
	var str='';
	str+='<h4><b>Summary</b></h4>';
	if(type != null && type == 'online'){
		str+='<div class="row">';
		str+='<div class="status_itc">';
			str+='<ul class="list-inline workStagesCls">';
				str+='<li>';
					str+='<h4><b>2014</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2014+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2015</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2015+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2016</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2016+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2017</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2017+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2018</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2018+'</h5>';
				str+='</li>';
			str+='</ul>';
		str+='</div>';
		/*str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2014</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2014+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2015</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2015+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2016</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2016+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="text-align:center;">';
				str+='<h4><b>2017</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalOnlServ2017+'</h5>';
			str+='</div>';
		str+='</div>';*/
	str+='</div>';
	}else{
		str+='<div class="row">';
		str+='<div class="status_itc">';
			str+='<ul class="list-inline workStagesCls">';
				str+='<li>';
					str+='<h4><b>2014</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2014+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2015</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2015+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2016</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2016+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2017</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2017+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2018</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2018+'</h5>';
				str+='</li>';
			str+='</ul>';
		str+='</div>';
		/*str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2014</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2014+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2015</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2015+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2016</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2016+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="text-align:center;">';
				str+='<h4><b>2017</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalNewOnlServ2017+'</h5>';
			str+='</div>';
		str+='</div>';*/
	str+='</div>';
	}
	
	
	str+='<div class="m_top20">';
			if(type != null && type == 'online'){
				str+='<table class="table" id="onlineServicesTableId">';
			}else{
				str+='<table class="table" id="newOnlineServicesTableId">';
			}
			str+='<thead>';
				str+='<tr>';
					str+='<th>Department</th>';
					str+='<th>2014</th>';
					str+='<th>2015</th>';
					str+='<th>2016</th>';
					str+='<th>2017</th>';
					str+='<th>2018</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td>'+result[i].name+'</td>';
						if(result[i].onLineServices2014 != null && result[i].onLineServices2014 != 0){
							str+='<td class="dptSrvCuntCls" attr_dept_id = "'+result[i].id+'" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'" attr_type="'+type+'" attr_year="2014"><u>'+result[i].onLineServices2014+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						if(result[i].onLineServices2015 != null && result[i].onLineServices2015 != 0){
							str+='<td class="dptSrvCuntCls" attr_dept_id = "'+result[i].id+'" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'"  attr_type="'+type+'" attr_year="2015"><u>'+result[i].onLineServices2015+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						if(result[i].onLineServices2016 != null && result[i].onLineServices2016 != 0){
							str+='<td class="dptSrvCuntCls" attr_dept_id = "'+result[i].id+'" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'"  attr_type="'+type+'" attr_year="2016"><u>'+result[i].onLineServices2016+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						if(result[i].onLineServices2017 != null && result[i].onLineServices2017 != 0){
							str+='<td class="dptSrvCuntCls" attr_dept_id = "'+result[i].id+'" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'"  attr_type="'+type+'" attr_year="2017"><u>'+result[i].onLineServices2017+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						if(result[i].onLineServices2018 != null && result[i].onLineServices2018 != 0){
							str+='<td class="dptSrvCuntCls" attr_dept_id = "'+result[i].id+'" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'"  attr_type="'+type+'" attr_year="2018"><u>'+result[i].onLineServices2018+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						//str+='<td class="dptSrvCuntCls" attr_dept_id = "'+result[i].id+'" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'"><u>'+result[i].onLineServicesCount+'</u></td>';
					str+='</tr>';
				}
			str+='</tbody>';
		str+='</table>';
		str+='</div>';
		if(type != null && type == 'online'){
			$("#onlineServicesDiv").html(str);
			$("#onlineServicesTableId").dataTable({								
				"iDisplayLength": 15,
				"aaSorting": [],
				"aLengthMenu": [[15, 30, 45, -1], [15, 30, 45, "All"]],
				"retrieve": true
			});
		}else{
			$("#newOnlineServicesDiv").html(str);
			$("#newOnlineServicesTableId").dataTable({							
				"iDisplayLength": 15,
				"aaSorting": [],
				"aLengthMenu": [[15, 30, 45, -1], [15, 30, 45, "All"]],
				"retrieve": true
			});
		}
}
$(document).on("click",".dptSrvCuntCls",function(){
	$("#kpiOnlineDeptModalId").modal("show");
	var deptName =  $(this).attr("attr_dept_name");
	var year =  $(this).attr("attr_year");
	var type =  $(this).attr("attr_type");
	$("#deptServiceHeadingId").html(deptName +" Department "+year+" Services");
	if(type != null && type == 'online'){
		getMeesevaKPIOnlineDeptWiseDetails($(this).attr("attr_dept_id"),year);
	}else{
		getMeesevaKPINewOnlineDeptWiseCuntDetails($(this).attr("attr_dept_id"),year);
	}
	
});
function buildMeesevaKPIOnlineDeptWiseDetails(result){
	var str='';
	str+='<table class="table" id="kpiOnlineDeptTableId">';
		str+='<thead>';
			str+='<tr>';
				str+='<th>Service Name</th>';
				str+='</tr>';
		str+='</thead>';
		str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+result[i].serviceName+'</td>';
				str+='</tr>';
			}
		str+='</tbody>';
	str+='</table>';
	$("#kpiOnlineDeptDivId").html(str);
	$("#kpiOnlineDeptTableId").dataTable({
		"retrieve": true
	});
}

function getMeesevaKPIMobileSevicesYearWiseDetails(){
	$("#mobileAppServicesDiv").html(spinner);
	var json = {
		year : "2014"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPIMobileSevicesYearWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaKPIMobileSevicesDetails(result);
		}else{
			$("#mobileAppServicesDiv").html("No Data Available")
		}
	});	
}

function buildMeesevaKPIMobileSevicesDetails(result){
	var str='';
	str+='<h4><b>Summary</b></h4>';
	str+='<div class="row">';
		str+='<div class="status_itc">';
			str+='<ul class="list-inline workStagesCls">';
				str+='<li>';
					str+='<h4><b>2014</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+globalMblAppServ2014+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2015</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+globalMblAppServ2015+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2016</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+globalMblAppServ2016+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2017</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+globalMblAppServ2017+'</h5>';
				str+='</li>';
				str+='<li>';
					str+='<h4><b>2018</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+globalMblAppServ2018+'</h5>';
				str+='</li>';
			str+='</ul>';
		str+='</div>';
		/*str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2014</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalMblAppServ2014+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2015</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalMblAppServ2015+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="border-right:1px solid #000;text-align:center;">';
				str+='<h4><b>2016</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalMblAppServ2016+'</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 m_top10">';
			str+='<div style="text-align:center;">';
				str+='<h4><b>2017</b></h4>';
				str+='<h5 class="m_top10 onlinePanelBlock">'+globalMblAppServ2017+'</h5>';
			str+='</div>';
		str+='</div>';*/
	str+='</div>';
	str+='<div class="m_top20">';
	str+='<table class="table" id="mobileAppServicesTableId">';
		str+='<thead>';
			str+='<tr>';
				str+='<th>Department</th>';
				str+='<th>2014</th>';
				str+='<th>2015</th>';
				str+='<th>2016</th>';
				str+='<th>2017</th>';
				str+='<th>2018</th>';
			str+='</tr>';
		str+='</thead>';
		str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+result[i].name+'</td>';
					if(result[i].mobileAppServices2014 != null && result[i].mobileAppServices2014 != 0){
							str+='<td class="dptMbleSrvCuntCls" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'" attr_year="2014"><u>'+result[i].mobileAppServices2014+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						if(result[i].mobileAppServices2015 != null && result[i].mobileAppServices2015 != 0){
							str+='<td class="dptMbleSrvCuntCls" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'" attr_year="2015"><u>'+result[i].mobileAppServices2015+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						if(result[i].mobileAppServices2016 != null && result[i].mobileAppServices2016 != 0){
							str+='<td class="dptMbleSrvCuntCls" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'" attr_year="2016"><u>'+result[i].mobileAppServices2016+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						if(result[i].mobileAppServices2017 != null && result[i].mobileAppServices2017 != 0){
							str+='<td class="dptMbleSrvCuntCls" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'" attr_year="2017"><u>'+result[i].mobileAppServices2017+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
						if(result[i].mobileAppServices2018 != null && result[i].mobileAppServices2018 != 0){
							str+='<td class="dptMbleSrvCuntCls" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'" attr_year="2018"><u>'+result[i].mobileAppServices2018+'</u></td>';
						}else{
							str+='<td>0</td>';
						}
					//str+='<td class="dptMbleSrvCuntCls" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'" attr_year="2017"><u>'+result[i].currentYearAchievement+'</u></td>';
					//str+='<td class="dptMbleSrvCuntCls" style="cursor:pointer;" attr_dept_name = "'+result[i].name+'" attr_year="'+year+'"><u>'+result[i].previousYearAchievementCount+'</u></td>';
				str+='</tr>';
			}
		str+='</tbody>';
	str+='</table>';
	str+='</div>';
	$("#mobileAppServicesDiv").html(str);
	$("#mobileAppServicesTableId").dataTable({
		"retrieve": true
	});
}

$(document).on("click",".dptMbleSrvCuntCls",function(){
	$("#kpiMobileAppDeptModalId").modal("show");
	var deptName =  $(this).attr("attr_dept_name");
	var year =  $(this).attr("attr_year");
	$("#mobileAppHeadingId").html(deptName +" Department "+year+" Mobile App Services");
	getMeesevaKPIMobileDeptSevicesDetails(deptName,year);
});

function getMeesevaKPIMobileDeptSevicesDetails(department,year){
	$("#kpiMobileAppDeptDivId").html(spinner);
	var json = {
		year : year,
		groupName : department  //DepartmentName
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPIMobileDeptSevicesDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaKPIMobileDeptSevicesDetails(result);
		}else{
			$("#kpiMobileAppDeptDivId").html("No Data Available")
		}
	});	
}

function buildMeesevaKPIMobileDeptSevicesDetails(result){
	var str='';
	str+='<table class="table" id="kpiMobileAppDeptTableId">';
		str+='<thead>';
			str+='<tr>';
				str+='<th>Name</th>';
				str+='</tr>';
		str+='</thead>';
		str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+result[i].serviceName+'</td>';
				str+='</tr>';
			}
		str+='</tbody>';
	str+='</table>';
	$("#kpiMobileAppDeptDivId").html(str);
	$("#kpiMobileAppDeptTableId").dataTable({
		"retrieve": true
	});
}

function getMeesevaKPIOnlineServiceOverviewCount(){
	$("#onlineSerOvrCuntCls").html(spinner);
	var json = {
		year : "2014"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPIOnlineServiceOverviewCount',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildMeesevaKPIOnlineServiceOverviewCount(result);
		}else{
			$("#onlineSerOvrCuntCls").html("No Data Available")
		}
	});	
}
var globalOnlServ2014;
var globalOnlServ2015;
var globalOnlServ2016;
var globalOnlServ2017;
var globalOnlServ2018;
function buildMeesevaKPIOnlineServiceOverviewCount(result){
	globalOnlServ2014 = result.onLineServices2014;
	globalOnlServ2015 = result.onLineServices2015;
	globalOnlServ2016 = result.onLineServices2016;
	globalOnlServ2017 = result.onLineServices2017;
	globalOnlServ2018 = result.onLineServices2018;
	var str='';
		str+='<h4 class="text-center"><b style="font-size: 20px !important;">Online Services - '+result.onLineServicesCount+'</b></h4>';
		str+='<div class="row m_top10">';
			str+='<div class="status_itc">';
				str+='<ul class="list-inline workStagesCls">';
					str+='<li>';
						str+='<h4><b>2014</b></h4>';
						str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2014+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2015</b></h4>';
						str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2015+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2016</b></h4>';
						str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2016+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2017</b></h4>';
						str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2017+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2018</b></h4>';
						str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2018+'</h5>';
					str+='</li>';
				str+='</ul>';
			str+='</div>';
			
			/* str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2014</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2014+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2015</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2015+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2016</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2016+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="text-align:center;">';
					str+='<h4><b>2017</b></h4>';
					str+='<h5 class="m_top10 onlinePanelBlock">'+result.onLineServices2017+'</h5>';
				str+='</div>';
			str+='</div>'; */
		str+='</div>';
		$("#onlineSerOvrCuntCls").html(str);
		
}
function getMeesevaKPIMobileAppServiceOverviewCount(){
	$("#mobileAppSerOvrCuntCls").html(spinner);
	var json = {
		year : "2014"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPIMobileAppServiceOverviewCount',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildMeesevaKPIMobileAppServiceOverviewCount(result);
		}else{
			$("#mobileAppSerOvrCuntCls").html("No Data Available")
		}
	});	
}
var globalMblAppServ2014;
var globalMblAppServ2015;
var globalMblAppServ2016;
var globalMblAppServ2017;
var globalMblAppServ2018;
function buildMeesevaKPIMobileAppServiceOverviewCount(result){
	globalMblAppServ2014 = result.mobileAppServices2014;
	globalMblAppServ2015 = result.mobileAppServices2015;
	globalMblAppServ2016 = result.mobileAppServices2016;
	globalMblAppServ2017 = result.mobileAppServices2017;
	globalMblAppServ2018 = result.mobileAppServices2018;
	var str='';
		str+='<h4 class="text-center"><b style="font-size: 20px !important;">Mobile App Services - '+result.totalMobileAppServices+'</b></h4>';
		str+='<div class="row m_top10">';
			str+='<div class="status_itc">';
				str+='<ul class="list-inline workStagesCls">';
					str+='<li>';
						str+='<h4><b>2014</b></h4>';
						str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2014+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2015</b></h4>';
						str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2015+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2016</b></h4>';
						str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2016+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2017</b></h4>';
						str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2017+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2018</b></h4>';
						str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2018+'</h5>';
					str+='</li>';
				str+='</ul>';
			str+='</div>';
			/*str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2014</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2014+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2015</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2015+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2016</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2016+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="text-align:center;">';
					str+='<h4><b>2017</b></h4>';
					str+='<h5 class="m_top10 mobilePanelBlock">'+result.mobileAppServices2017+'</h5>';
				str+='</div>';
			str+='</div>';*/
		str+='</div>';
	$("#mobileAppSerOvrCuntCls").html(str);
}
/*$(document).on("click",".onlinePanelBlock",function(){
	if(!$(".OnlinServiceKPICollapsedIN").hasClass("in")){
		$(".OnlinServiceKPICollapsed").removeClass("collapsed")
		$(".OnlinServiceKPICollapsedIN").addClass("in")
		$('html,body').animate({
			scrollTop: $(".OnlinServiceKPIOpen").offset().top},
		'slow');
		$(".borderColorCSSBlack").addClass("border_black")
	}else{
		$('html,body').animate({
			scrollTop: $(".OnlinServiceKPIOpen").offset().top},
		'slow');
		$(".borderColorCSSBlack").addClass("border_black")
	}
});
$(document).on("click",".mobilePanelBlock",function(){	
	if(!$(".mobileKPICollapsedIN").hasClass("in")){
		$(".mobileKPICollapsed").removeClass("collapsed")
		$(".mobileKPICollapsedIN").addClass("in")
		$('html,body').animate({
			scrollTop: $(".OnlinServiceKPIOpen").offset().top},
		'slow');
		$(".borderColorCSSBlack").addClass("border_black")
	}else{
		$('html,body').animate({
			scrollTop: $(".OnlinServiceKPIOpen").offset().top},
		'slow');
		$(".borderColorCSSBlack").addClass("border_black")
	}
});*/
$(document).on("click","#addIcon",function(){
	$('#droppedBlockModalId').modal('show');

});

function getMeesevaKPINewOnlineServiceOverviewCount(){
	$("#newOnlineSerOvrCuntCls").html(spinner);
	var json = {
		year : "2014"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPINewOnlineServiceOverviewCount',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildMeesevaKPINewOnlineServiceOverviewCount(result);
		}else{
			$("#newOnlineSerOvrCuntCls").html("No Data Available")
		}
	});	
}
var globalNewOnlServ2014;
var globalNewOnlServ2015;
var globalNewOnlServ2016;
var globalNewOnlServ2017;
var globalNewOnlServ2018;
function buildMeesevaKPINewOnlineServiceOverviewCount(result){
	globalNewOnlServ2014 = result.onLineServices2014;
	globalNewOnlServ2015 = result.onLineServices2015;
	globalNewOnlServ2016 = result.onLineServices2016;
	globalNewOnlServ2017 = result.onLineServices2017;
	globalNewOnlServ2018 = result.onLineServices2018;
	var str='';
		str+='<h4 class="text-center"><b style="font-size: 20px !important;">KIOSK-Meeseva Services - '+result.onLineServicesCount+'</b></h4>';
		str+='<div class="row m_top10">';
			str+='<div class="status_itc">';
				str+='<ul class="list-inline workStagesCls">';
					str+='<li>';
						str+='<h4><b>2014</b></h4>';
						str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2014+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2015</b></h4>';
						str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2015+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2016</b></h4>';
						str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2016+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2017</b></h4>';
						str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2017+'</h5>';
					str+='</li>';
					str+='<li>';
						str+='<h4><b>2018</b></h4>';
						str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2018+'</h5>';
					str+='</li>';
				str+='</ul>';
			str+='</div>';
			/*str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2014</b></h4>';
					str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2014+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2015</b></h4>';
					str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2015+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="border-right:1px solid #000;text-align:center;">';
					str+='<h4><b>2016</b></h4>';
					str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2016+'</h5>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<div style="text-align:center;">';
					str+='<h4><b>2017</b></h4>';
					str+='<h5 class="m_top10 newOnlinePanelBlock">'+result.onLineServices2017+'</h5>';
				str+='</div>';
			str+='</div>';*/
		str+='</div>';
		$("#newOnlineSerOvrCuntCls").html(str);
}
$(document).on("click",".newOnlinePanelBlock",function(){
if(!$(".newOnlinServiceKPICollapsedIN").hasClass("in")){
		$(".NewOnlinServiceKPICollapsed").removeClass("collapsed")
		$(".newOnlinServiceKPICollapsedIN").addClass("in")
		$('html,body').animate({
			scrollTop: $(".OnlinServiceKPIOpen").offset().top},
		'slow');
		$(".borderColorCSSBlack").addClass("border_black")
	}else{
		$('html,body').animate({
			scrollTop: $(".OnlinServiceKPIOpen").offset().top},
		'slow');
		$(".borderColorCSSBlack").addClass("border_black")
	}
});

function getMeesevaKPINewOnlineServiceYearWiseDetails(){
	$("#newOnlineServicesDiv").html(spinner);
	var json = {
		year : "2014"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPINewOnlineServiceYearWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaKPIOnlineServiceDetails(result,'New Online');
		}else{
			$("#newOnlineServicesDiv").html("No Data Available")
		}
	});	
}
function getMeesevaKPINewOnlineDeptWiseCuntDetails(departmentId,year){
	$("#kpiOnlineDeptDivId").html(spinner);
	var json = {
		year : year,
		deptId : departmentId
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPINewOnlineDeptWiseCuntDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaKPIOnlineDeptWiseDetails(result);
		}else{
			$("#kpiOnlineDeptDivId").html("No Data Available")
		}
	});	
}
$(document).on("click","#droppedForCheckId",function(){
	var divType = $(this).attr('attr_divType');
	if($(".checkBoxCls"+divType).prop("checked")==true)
		$('.dropedCls'+divType).show();
	else
		$('.dropedCls'+divType).hide();	
});
$(document).on("click",".panelCollapseIcon",function(){
	var frameType = $(this).attr("attr_type");
	if(frameType == "frame2"){
		$("#frame2DivID").html('<iframe  width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background:#FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiOGU3OWJlZTAtZDE1My00YjJkLWE4MzQtZjE0NWFlMmI3YWU0IiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>')
	}else if(frameType == "frame3"){
		$("#frame3DivID").html('<iframe  width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background:#FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiNTZlMzJiMDQtN2EwZi00OGNhLTg0YzItZTQ5OGI1ZGJmMDhjIiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>');
	}else if(frameType == "frame4"){
		$("#frame4DivID").html('<iframe  width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background: #FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiNjJjM2VjMzQtOGQ5ZC00YjE1LTliOGYtY2IyMjNjNzgwMmM4IiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>');
	}
});

$(document).on("click",".mesevaCntrDetailsCls",function(){
	$("#kpiDistrictModalId").modal('show');
	var districtId = $(this).attr("attr_district_id");
	var districtName = $(this).attr("attr_district_name");
	getMeesevaCentersForDistrict(districtId,districtName);
});
function getMeesevaCentersForDistrict(districtId,districtName){
	$("#kpiDistrictDivId").html(spinner);
	$("#kpiDistrictHeadingId").html(districtName+" District Meeseva Centers Details.");
	var json = {
		locationIdStr : districtId
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaCentersForDistrict',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaCentersForDistrict(result);
		}else{
			$("#kpiDistrictDivId").html("No Data Available")
		}
	});	
}

function buildMeesevaCentersForDistrict(result){
	var str='';
	str+='<table class="table" id="kpiDistrictTableId">';
		str+='<thead>';
			str+='<tr>';
				str+='<th>Mandal</th>';
				str+='<th>Village</th>';
				str+='<th>AgentId</th>';
				str+='<th>Agent Name</th>';
				str+='<th>Mobile No</th>';
				str+='<th>Address</th>';
				str+='<th>Type</th>';
				str+='<th>Established Date</th>';
				str+='</tr>';
		str+='</thead>';
		str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+result[i].mandalName+'</td>';
					str+='<td>'+result[i].villageName+'</td>';
					str+='<td>'+result[i].agentId+'</td>';
					str+='<td>'+result[i].agentName+'</td>';
					str+='<td>'+result[i].mobileNo+'</td>';
					str+='<td>'+result[i].address+'</td>';
					str+='<td>'+result[i].centerType+'</td>';
					str+='<td>'+result[i].estDate+'</td>';
				str+='</tr>';
			}
		str+='</tbody>';
	str+='</table>';
	$("#kpiDistrictDivId").html(str);
	$("#kpiDistrictTableId").dataTable({
		"retrieve": true
	});
}
//var incubatorsIdsArr = [1,2,3];
function getAPInnovationSocietyOverviewHtml(divId,incubatorsIdsArr){
	var str='';
	//first Block
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="panel panel-default" style="border: none;">';
				str+='<div class="panel-body">';
					str+='<h4 class="font_weight" style="background: #90979E;padding: 10px;border-top-left-radius: 5px;border-top-right-radius: 5px;color: #fff;">INCUBATORS</h4>';
					str+='<div class="pad_border20" style="border-radius:none;">';
						str+='<h5 class="f_16"><b>Complete Overview</b></h5>';
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-6">';
								str+='<div id="incubatorsOverviewId"></div>';
							str+='</div>';
							str+='<div class="col-sm-6 border-graph">';
								str+='<div id="startupsHighchartsDivId" style="height:155px;"></div>';
							str+='</div>';
						str+='</div>';
						//Second Block
						
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-12">';
								str+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
									str+='<div class="panel panel-default" style="border: 1px solid #ddd;">';
										str+='<div class="panel-heading" role="tab" id="headingOverview" style="background-color:grey !important;padding: 15px;color: #fff !important;">';
											str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion" href="#collapseOverview" aria-expanded="true" aria-controls="collapseOverview">';
											str+='<h4 class="panel-title text-capital">Indicators OverView</h4>';
												
											str+='</a>';
										str+='</div>';
										str+='<div id="collapseOverview" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOverview">';
											str+='<div class="panel-body">';
												str+='<div id="startUpsOverviewDivId"></div>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						
						//Second Block End
						//Third Block Start
							
						//Third Block End
						//Fourth Block Start
							str+='<div class="row m_top10">';
								str+='<div class="col-sm-12">';
								str+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
									str+='<div class="panel panel-default" style="border: 1px solid #ddd;">';
										str+='<div class="panel-heading" role="tab" id="headingIndicators" style="background-color:grey !important;padding: 15px;color: #fff !important;">';
											str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordion" href="#collapseIndicators" aria-expanded="true" aria-controls="collapseIndicators">';
											str+='<h4 class="panel-title text-capital">Indicators View For Incubators</h4>';
											str+='</a>';
										str+='</div>';
										str+='<div id="collapseIndicators" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingIndicators">';
											str+='<div class="panel-body">';
												str+='<div id="indicatorsDivId"></div>';
												//str+='<div id="row m_top10">';
													str+='<div id="indicatorsDroneDivId"></div>';
													str+='<div id="indicatorsFecilitationDivId"></div>';
												//str+='</div>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
								str+='</div>';
								
								//str+='<div class="row m_top10">';
									str+='<div class="col-sm-12 m_top10">';
									str+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
										str+='<div class="panel panel-default" style="border: 1px solid #ddd;">';
											str+='<div class="panel-heading" role="tab" id="headingAPIS" style="background-color:grey !important;padding: 15px;color: #fff !important;">';
												str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordion" href="#collapseAPIS" aria-expanded="true" aria-controls="collapseAPIS">';
												str+='<h4 class="panel-title text-capital">Incubators - Details</h4>';
												str+='</a>';
											str+='</div>';
											str+='<div id="collapseAPIS" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingAPIS">';
											for(var i in incubatorsIdsArr){
												str+='<div id="incubatorsDetailsDivId'+incubatorsIdsArr[i]+'" class="m_top10"></div>';
											}
												//str+='<div id="incubatorsDetailsDivId"></div>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								//str+='</div>';
								str+='</div>';
								str+='</div>';
								str+='<div class="row m_top10">';
									str+='<div class="col-sm-12">';
										str+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
											str+='<div class="panel panel-default" style="border: 1px solid #ddd;">';
												str+='<div class="panel-heading" role="tab" id="headingIndicators" style="background-color:grey !important;padding: 15px;color: #fff !important;">';
													str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordion" href="#collapseAtalTinkering" aria-expanded="true" aria-controls="collapseAtalTinkering">';
													str+='<h4 class="panel-title text-capital">Atal Tinkering Lab Details</h4>';
													str+='</a>';
												str+='</div>';
												str+='<div id="collapseAtalTinkering" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingAtalTinkering">';
													str+='<div class="panel-body">';
														str+='<div id="atalTinkeringOverviewDivId"></div>';
														str+='<div id="atalTinkeringListDivId"></div>';
													str+='</div>';
												str+='</div>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						//Fourth Block End						
					str+='</div>';
					/* str+='<div class="row m_top10">';
						str+='<div class="col-sm-12">';
						str+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
							str+='<div class="panel panel-default" style="border: 1px solid #ddd;">';
								str+='<div class="panel-heading" role="tab" id="headingAPIS" style="background-color:grey !important;padding: 15px;color: #fff !important;">';
									str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordion" href="#collapseAPIS" aria-expanded="true" aria-controls="collapseAPIS">';
									str+='<h4 class="panel-title text-capital">Incubators - Details</h4>';
									str+='</a>';
								str+='</div>';
								str+='<div id="collapseAPIS" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingAPIS">';
								for(var i in incubatorsIdsArr){
									str+='<div id="incubatorsDetailsDivId'+incubatorsIdsArr[i]+'" class="m_top10"></div>';
								}
									//str+='<div id="incubatorsDetailsDivId"></div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='</div>'; */
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-12">';
								str+='<div id="bootEventsActivitiesBlockId"></div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-12 ">';
								str+='<div id="bootCampDetailsDivId"></div>';
							str+='</div>';
						str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+divId).html(str);
	for(var i in incubatorsIdsArr){
		if(incubatorsIdsArr[i] != null && incubatorsIdsArr[i] == 1){
			getApInnovationIncubatorsXLr8APDetails(incubatorsIdsArr[i]);
		}else if(incubatorsIdsArr[i] != null && (incubatorsIdsArr[i] == 2 || incubatorsIdsArr[i] == 3)){
			getApInnovationIncubatorsOtherBlockDetails(incubatorsIdsArr[i]);
		}
	}
}

function getApInnovationIndicatorDetails(){
	$("#indicatorsDivId").html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationIndicatorDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildApInnovationIndicatorDetails(result);
		}else{
			$("#indicatorsDivId").html("No Data Available")
		}
	});	
}

function buildApInnovationIndicatorDetails(result){
	var str='';
	str+='<div class="table-responsive">';
	str+='<table class="table table_API" id="indicatorsTableId">';
		str+='<thead>';
			str+='<tr>';
				str+='<th class="header-white2">INDICATORS</th>';
				str+='<th class="header-white2">Total</th>';
				str+='<th class="header-white">XLr8AP<br>Tirupathi</th>';
				str+='<th class="header-white">NASSCOM 10K Startups<br>Visakhapatnam</th>';
				str+='<th class="header-white">GOVIN CAPITAL<br>Visakhapatnam</th>';
				//str+='<th class="header-white">DRONE ASSEMBLY<br>Visakhapatnam</th>';
			str+='</tr>';
		str+='</thead>';
		str+='<tbody>';
		for(var i in result){
			str+='<tr>';
				str+='<td>'+result[i].name+'</td>';
				str+='<td>'+result[i].totalParticipaints+'</td>';
				if(result[i].xlr8apCount != null && result[i].xlr8apCount != 0){
					str+='<td>'+result[i].xlr8apCount+'</td>';
				}else{
					str+='<td>-</td>';
				}
				if(result[i].nassomCount != null && result[i].nassomCount != 0){
					str+='<td>'+result[i].nassomCount+'</td>';
				}else{
					str+='<td>-</td>';
				}
				if(result[i].govinCount != null && result[i].govinCount != 0){
					str+='<td>'+result[i].govinCount+'</td>';
				}else{
					str+='<td>-</td>';
				}
				//str+='<td>-</td>';
			str+='</tr>';
		}
		str+='</tbody>';
	str+='</table>';
	str+='</div>';
	$("#indicatorsDivId").html(str);
	//$("#indicatorsTableId").dataTable();
	$("#indicatorsTableId").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 30, 45, -1], [15, 30, 45, "All"]],
		"retrieve": true
	});
}
function getApInnovationOverviewDetails(){
	$("#bootEventsActivitiesBlockId").html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationOverviewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildApInnovationOverviewDetails(result);
		}else{
			$("#bootEventsActivitiesBlockId").html("No Data Available")
		}
	});	
}
var bootCampArrIds=[];
var activitiesNameArr = [];
function buildApInnovationOverviewDetails(result){
	var str='';
	//str+='<div class="col-sm-12">';
	for (var i in result){
		str+='<div class="col-sm-4">';
			str+='<div class="panel panel-default panel-grey">';
				if(result[i].name != null && result[i].name == 'BootCamp'){
					bootCampArrIds.push(result[i].subList.length);
					str+='<div class="panel-heading" style="height:50px !important; background-color: #E17779 !important;padding: 15px;color: #fff !important;">';
					str+='<h4 class="font_weight" style="float:left;"><i class="fa fa-laptop" aria-hidden="true"></i>&nbsp;&nbsp;Bootcamps</h4>';
					str+='<span class="pull-right"><a class=font-color-white><i class="fa fa-clone APISDetailsCls" aria-hidden="true" attr_type="Bootcamps" style="cursor:pointer;"></i></a></span>';
				}else if(result[i].name != null && result[i].name == 'Events'){
					str+='<div class="panel-heading" style="height:50px !important; background-color: #77B1CF !important;padding: 15px;color: #fff !important;">';
					str+='<h4 class="font_weight"  style="float:left;"><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;&nbsp;Events participated by APIS</h4>';
					str+='<span class="pull-right"><a class=font-color-white><i class="fa fa-clone APISDetailsCls" aria-hidden="true" attr_type="Events" style="cursor:pointer;"></i></a></span>';
				}else if(result[i].name != null && result[i].name == 'Activities'){
					str+='<div class="panel-heading" style="height:50px !important; background-color: #77BA7C !important;padding: 15px;color: #fff !important;">';
					str+='<h4 class="font_weight"  style="float:left;"><i class="fa fa-gears" aria-hidden="true"></i>&nbsp;&nbsp;Activities by APIS</h4>';
					str+='<span class="pull-right"><a class=font-color-white><i class="fa fa-clone APISDetailsCls" aria-hidden="true" attr_type="Activities" style="cursor:pointer;"></i></a></span>';
				}
				str+='</div>';
				str+='<div class="panel-body" style="padding:0px;background-color: #f9f9f9;">';
					str+='<div class="scrollDivCls">';
					str+='<div class="table-responsive">';
						str+='<table class="table table-bordered">';
							str+='<tbody>';
							for(var j in result[i].subList){
								str+='<tr>';
									str+='<td>'+result[i].subList[j].incubatorName+'</td>';
									str+='<td>'+result[i].subList[j].location+'</td>';
								str+='</tr>';
								if(result[i].name != null && result[i].name == 'Activities'){
									activitiesNameArr.push(result[i].subList[j].incubatorName.trim())
								}
							}
							
							str+='</tbody>';
						str+='</table>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='</div>';
		str+='</div>';
		$("#bootEventsActivitiesBlockId").html(str);
		var length='';
		for(var i in result){
			length = result[i].subList.length;
			
		}
		if(length>5){
			$(".scrollDivCls").mCustomScrollbar({setHeight:'250px'});
		}
		
		
	}
	//str+='</div>';
}
function getApInnovationBootCampDetails(deptId){
	$("#bootCampId"+deptId).html(spinner);
	var json = {
		deptId : deptId
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationBootCampDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildApInnovationBootCampDetails(result,deptId);
		}else{
			$("#bootCampBlockDetailsId").html("No Data Available")
		}
	});	
}
function buildApInnovationBootCampDetails(result,deptId){
	var str='';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered dataTableCls'+deptId+'" id="dataTable'+deptId+'">';
				str+='<thead>';
					str+='<tr>';
					if(result.fromDate != '' && result.fromDate != 'undefined' &&  result.fromDate != null){
						str+='<th colspan="5"><h4 style="color:#fff !important;">Venue: '+result.name+' ( '+result.fromDate+' )</h4></th>';
					}else{
						str+='<th colspan="5"><h4 style="color:#fff !important;">Venue: '+result.name+'</h4></th>';	
					}
					str+='</tr>';
					str+='<tr>';
						//str+='<th style="background-color:#fff !important;">ID</th>';
						str+='<th style="background-color:#fff !important;">STUDENT NAME</th>';
						str+='<th style="background-color:#fff !important;">COLLEGE</th>';
						str+='<th style="background-color:#fff !important;">COURSE</th>';
						str+='<th style="background-color:#fff !important;">YEAR</th>';
						str+='<th style="background-color:#fff !important;">BRANCH</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result.subList){
					str+='<tr>';
						//str+='<td>'+result.subList[i].id+'</td>';
						if(result.subList[i].studentName != null){
							str+='<td>'+result.subList[i].studentName+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].college != null && result.subList[i].college.length !=0){
							str+='<td>'+result.subList[i].college+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].course != null && result.subList[i].course !=0){
							str+='<td>'+result.subList[i].course+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].year != null && result.subList[i].year != 0 && result.subList[i].year == '3'){
							str+='<td>3rd</td>';
						}else if(result.subList[i].year != null && result.subList[i].year != 0 && result.subList[i].year == '4'){
							str+='<td>4th</td>';
						}else if(result.subList[i].year != null && result.subList[i].year != 0 && result.subList[i].year == '2'){
							str+='<td>2rd</td>';
						}else if(result.subList[i].year != null && result.subList[i].year != 0 && result.subList[i].year == '1'){
							str+='<td>1st</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].branch != null && result.subList[i].branch !=0){
							str+='<td>'+result.subList[i].branch+'</td>';
						}else{
							str+='<td>-</td>';
						}
						
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#bootCampId"+deptId).html(str);
	//$("#dataTable"+deptId).dataTable();
	//$(".dataTableCls").dataTable();
	$(".dataTableCls"+deptId).dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"retrieve": true
	});
}

$(document).on("click",".APISDetailsCls",function(){
	var type = $(this).attr("attr_type");
	$('html,body').animate({
		scrollTop: $("#bootCampDetailsDivId").offset().top},
	'slow');
	var str='';
	if(type != null && type == "Bootcamps"){
			str+='<div class="col-sm-12">';
					str+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
						str+='<div class="panel panel-default" style="border: 1px solid #ddd;">';
							str+='<div class="panel-heading" role="tab" id="headingAP" style="background-color: #E17779 !important;padding: 15px;color: #fff !important;">';
								str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion" href="#collapseAP" aria-expanded="true" aria-controls="collapseAP">';
								str+='<h4 class="panel-title text-capital">Bootcamps - Details</h4>';
									
								str+='</a>';
							str+='</div>';
							str+='<div id="collapseAP" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAP">';
								str+='<div class="panel-body">';
								//alert(bootCampArrIds)
									for(var i=1;i<=bootCampArrIds;i++){
										str+='<div id="bootCampId'+i+'" class="m_top10"></div>';
									}
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
			str+='</div>';
		$("#bootCampDetailsDivId").html(str);
		setTimeout(function(){
			 for(var i=1;i<=bootCampArrIds;i++){
				getApInnovationBootCampDetails(i);
			}
		}, 500); 
	}else if(type != null && type == "Events"){
		getApInnovationEventDetails("bootCampDetailsDivId"); 
	}else if(type != null && type == "Activities"){
		str+='<div class="col-sm-12">';
				str+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
					str+='<div class="panel panel-default" style="border: 1px solid #ddd;">';
						str+='<div class="panel-heading" role="tab" id="headingAP" style="background-color: #77BA7C !important;padding: 15px;color: #fff !important;">';
							str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion" href="#collapseAP" aria-expanded="true" aria-controls="collapseAP">';
							str+='<h4 class="panel-title text-capital">Activities - Details (Category wise)</h4>';
								
							str+='</a>';
						str+='</div>';
						str+='<div id="collapseAP" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAP">';
							str+='<div class="panel-body">';
								for(var i in activitiesNameArr){
									str+='<div id="activities'+activitiesNameArr[i].replace(/\s+/g, '')+'" class="m_top10"></div>';
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
		str+='</div>';
	$("#bootCampDetailsDivId").html(str);
		setTimeout(function(){
			 for(var i in activitiesNameArr){
				getApInnovationActivityDetails(activitiesNameArr[i]);
			}
		}, 500);
	}
});

function getApInnovationEventDetails(divId){
	$("#"+divId).html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationEventDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildApInnovationEventDetails(result,divId);
		}else{
			$("#"+divId).html("No Data Available")
		}
	});	
}
function buildApInnovationEventDetails(result,divId){
	var str='';
	str+='<div class="col-sm-12">';
		str+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
			str+='<div class="panel panel-default" style="border: 1px solid #ddd;">';
				str+='<div class="panel-heading" role="tab" id="headingAP" style="background-color: #77B1CF !important;padding: 15px;color: #fff !important;">';
					str+='<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion" href="#collapseAP" aria-expanded="true" aria-controls="collapseAP">';
					str+='<h4 class="panel-title text-capital">Events - Details</h4>';
					str+='</a>';
				str+='</div>';
				str+='<div id="collapseAP" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAP">';
					str+='<div class="panel-body">';
						str+='<div class="table-responsive">';
							str+='<table class="table table-bordered" id="dataTable'+divId+'">';
								str+='<thead>';
									str+='<tr>';
										str+='<th colspan="7"><h4 style="color:#fff !important;">APIS In EXPO</h4></th>';
									str+='</tr>';
									str+='<tr>';
										str+='<th style="background-color:#fff !important;">EVENT NAME</th>';
										str+='<th style="background-color:#fff !important;">EVENT TYPE</th>';
										str+='<th style="background-color:#fff !important;">LOCATION</th>';
										str+='<th style="background-color:#fff !important;">VENUE</th>';
										str+='<th style="background-color:#fff !important;">FROM DATE</th>';
										str+='<th style="background-color:#fff !important;">TO DATE</th>';
										str+='<th style="background-color:#fff !important;">TOTAL PARTICIPANTS</th>';
									str+='</tr>';
								str+='</thead>';
								str+='<tbody>';
								for(var i in result){
									str+='<tr>';
										//str+='<td>'+result[i].id+'</td>';
										if(result[i].eventName != null){
											str+='<td>'+result[i].eventName+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].eventType != null && result[i].eventType !=0){
											str+='<td>'+result[i].eventType+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].location != null && result[i].location != 0){
											str+='<td>'+result[i].location+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].venue != null && result[i].venue !=0){
											str+='<td>'+result[i].venue+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].fromDate != null && result[i].fromDate !=0){
											str+='<td>'+result[i].fromDate+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].toDtae != null && result[i].toDtae !=0){
											str+='<td>'+result[i].toDtae+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].totalParticipaints != null && result[i].totalParticipaints !=0){
											str+='<td>'+result[i].totalParticipaints+'</td>';
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
					str+='</div>';
				str+='</div>';
			str+='</div>';
		$("#"+divId).html(str);
		//$("#dataTable"+divId).dataTable();
		$("#dataTable"+divId).dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			"retrieve": true
		
		});
}

function getApInnovationActivityDetails(category){
	$("#activities"+category.replace(/\s+/g, '')).html(spinner);
	var json = {
		category : category
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationActivityDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildApInnovationActivityDetails(result,category)
		}else{
			$("#bootCampBlockDetailsId").html("No Data Available")
		}
	});	
}
function buildApInnovationActivityDetails(result,category){
	var str='';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered" id="dataTable'+category.replace(/\s+/g, '')+'">';
				str+='<thead>';
					str+='<tr>';
						str+='<th colspan="5"><h4 style="color:#fff !important;">'+result.name+'</h4></th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th style="background-color:#fff !important;">CONDUCTED BY</th>';
						str+='<th style="background-color:#fff !important;">VENUE</th>';
						str+='<th style="background-color:#fff !important;">FROM DATE</th>';
						str+='<th style="background-color:#fff !important;">TO DATE</th>';
						str+='<th style="background-color:#fff !important;">DESCRIPTION</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result.subList){
					str+='<tr>';
						if(result.subList[i].conductedBy != null && result.subList[i].conductedBy !=0){
							str+='<td>'+result.subList[i].conductedBy+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].venue != null && result.subList[i].venue !=0){
							str+='<td>'+result.subList[i].venue+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].fromDate != null && result.subList[i].fromDate !=0){
							str+='<td>'+result.subList[i].fromDate+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].toDtae != null && result.subList[i].toDtae !=0){
							str+='<td>'+result.subList[i].toDtae+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].remarks != null && result.subList[i].remarks !=0){
							str+='<td>'+result.subList[i].remarks+'</td>';
						}else{
							str+='<td>-</td>';
						}
						
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#activities"+category.replace(/\s+/g, '')).html(str);
	//$("#dataTable"+category.replace(/\s+/g, '')).dataTable();
	$("#dataTable"+category.replace(/\s+/g, '')).dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			"retrieve": true
		
		});
}
function getCompleteOverviewForAPIS(type,divId){
	$("#"+divId).html(spinner);
	$("#startupsHighchartsDivId").html(spinner);
	var json = {
		fromDate : "",
		toDate : "",
		locationType : "",
		locationId : ""
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationOverViewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			/* if(type == 'onLoad'){
				var startUpsCount = 0;
				for(var i in result){
					if(result[i].startUps != null && result[i].startUps !='NA' && result[i].startUps !=''){
						startUpsCount = startUpsCount+parseInt(result[i].startUps);
					}
				} */
				$("#"+divId).html(result.startUps);
			/* }else if(type == 'overView'){
				return buildCompleteOverviewForAPIS(result,divId);
			} */
		}else{
			$("#"+divId).html("No Data Available")
		}
	});	
}
var startUpsArr = [];
function buildCompleteOverviewForAPIS(result,divId){
	//$("#startupsHighchartsDivId").html("");
	var str='';
	var assetTypeArr=[];
	str+='<div class="media" style="border: 1px solid #ddd;border-top-left-radius: 5px;border-bottom-left-radius: 5px; background-color:#cbd0b6;">';
		str+='<div class="pull-left" style="padding:10px;">';
			str+='<h5 style="margin-top:40px;">Incubators</h5>';
			str+='<h2 class="m_top20 font_weight text-center number-color">'+result.length+'</h2>';
		str+='</div>';
	  str+='<div class="media-body">';
			str+='<div class="table-responsive tbl-bg-white">';
					str+='<table class="table table_API">';
						str+='<thead>';
							str+='<tr>';
								str+='<th class="tbl-header-white">Incubator Name</th>';
								str+='<th class="tbl-header-white">Since</th>';
								str+='<th class="tbl-header-white">Location</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';
						for(var i in result){
							assetTypeArr.push(result[i].name);
							str+='<tr>';
								str+='<td>'+result[i].name+'</td>';
								str+='<td>'+result[i].year+'</td>';
								str+='<td>'+result[i].location+'</td>';
								if(result[i].startUps != null && result[i].startUps == 'NA'){
									startUpsArr.push(0);
								}else{
									startUpsArr.push(parseInt(result[i].startUps));
								}
								//incubatorsIdsArr.push(result[i].id);
							str+='</tr>';
						}
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
	  str+='</div>';
	str+='</div>';
	$("#"+divId).html(str);
	
	//var assetTypeArr=['XLr8AP','NASSCOM','GOVIN','DRONE'];
	$("#startupsHighchartsDivId").highcharts({
		 colors: ['#8DC760','#5EA5D6','#F688EB','#C6CCB1'],
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
			categories: assetTypeArr,
			
		},
		yAxis:{
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
				title: {
					text: 'Startups'
				},
		},
		legend: {
			enabled: false
		},
		plotOptions:{ 
			column: {
				colorByPoint: true
			}
		},
		tooltip: {
			useHTML:true,
			formatter: function () {
				return '<b>' + this.x + '</b><br/>' +
					this.y+'';
			}
		},
		series: [{
			name: 'Count',
			data: startUpsArr,
			dataLabels: {
				useHTML:true,
				enabled: true,
				color: '#000',
				align: 'center',
				formatter: function() {
						return '<span>'+this.y+'</span>';
				} 
			}
		}]
	});
}
function getStartupsEmploymentFundingPatternAcquisitionsDetails(){
	$("#startUpsOverviewDivId").html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getStartupsEmploymentFundingPatternAcquisitionsDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildStartupsEmploymentFundingPatternAcquisitionsDetails(result)
		}else{
			$("#startUpsOverviewDivId").html("No Data Available")
		}
	});	
}

function buildStartupsEmploymentFundingPatternAcquisitionsDetails(result){
	var str='';
	str+='<div class="row m_top20">';
	str+='<div class="col-sm-6">';
	str+='<div class="">';
	str+='<h5 class="f_16"><b>Startups Overview</b></h5>';
	str+='<div class="pad-border3 m_top10">';
		str+='<div class="row">';
		str+='<div class="col-sm-3 border_right_yash padding-startups">';
			str+='<h5 class="font_weight text-center h5-pad-top">Applications <br>Assessed</h5>';
			str+='<h4 class="font_weight text-center m_top25 h4-bg number-color">'+result.applicationsAssessed+'</h4>';
		str+='</div>';
		str+='<div class="col-sm-3 border_right_yash no-padding">';
			str+='<h5 class="font_weight text-center h5-pad-top">APIS <br/>Screened</h5>';
			str+='<h4 class="font_weight text-center m_top25 h4-bg-middle number-color">'+result.apisScreened+'</h4>';
		str+='</div>';
		str+='<div class="col-sm-3 border_right_yash no-padding">';
			str+='<h5 class="font_weight text-center h5-pad-top">APIS Povided <br>Training</h5>';
			str+='<h4 class="font_weight text-center m_top25 h4-bg-middle number-color">'+result.apisProvidedTraining+'</h4>';
		str+='</div>';
		str+='<div class="col-sm-3 no-padding">';
			str+='<h5 class="font_weight text-center h5-pad-top">Startups placed in Advanced <br>Acceleration</h5>';
			str+='<h4 class="font_weight text-center m_top10 h4-bg-rt number-color">'+result.startupsPlaced+'</h4>';
		str+='</div>';
		str+='</div>';
		str+='</div>';
	str+='</div>';
str+='</div>';
str+='<div class="col-sm-6 m-top-10">';
	str+='<h4 class="f_16 m_top10"><b>Employment Overview</b></h4>';
	str+='<div class="pad-border3 m_top10">';
		str+='<div class="row">';
		str+='<div class="col-sm-4 border_right_yash padding-startups">';
			str+='<h5 class="font_weight text-center h5-pad-top">Full-Time jobs <br/>created</h5>';
			str+='<h4 class="font_weight text-center m_top25 h4-bg number-color empDetailsCls" style="cursor:pointer;text-decoration-line: underline">'+result.ftJobsCreated+'</h4>';
		str+='</div>';
		str+='<div class="col-sm-4 border_right_yash no-padding">';
			str+='<h5 class="font_weight text-center h5-pad-top">Part-Time jobs <br/>created</h5>';
			str+='<h4 class="font_weight text-center m_top25 h4-bg-middle number-color empDetailsCls" style="cursor:pointer;text-decoration-line: underline">'+result.ptJobsCreated+'</h4>';
		str+='</div>';
		str+='<div class="col-sm-4 no-padding">';
			str+='<h5 class="font_weight text-center no-padding pad-top-17t">Internship</h5>';
			str+='<h4 class="font_weight text-center m_top30 h4-bg-rt number-color empDetailsCls" style="cursor:pointer;text-decoration-line: underline">'+result.internship+'</h4>';
		str+='</div>';
		str+='</div>';
	str+='</div>';
str+='</div>';
str+='</div>';
str+='<div class="row m_top20">';
	str+='<div class="col-sm-8">';
		str+='<h4 class="f_16"><b>Funding Pattern</b></h4>';
	str+='</div>';
	str+='<div class="col-sm-4">';
		str+='<h4 class="f_16"><b>Acquisitions</b></h4>';
	str+='</div>';
		str+='<div class="col-sm-8 m_top10">';
			str+='<div class="row">';
				str+='<div class="col-sm-8" style="padding-right:0px !important;">';
					str+='<div class="panel panel-default panel-grey">';
						str+='<div class="panel-heading">';
							str+='<h5 class="font_weight header-white">Funding Raised</h5>';
						str+='</div>';
						str+='<div class="panel-body no-padding">';
							str+='<div class="row">';
								str+='<div class="col-sm-4 border_right_yash padding-startups">';
									str+='<h5 class="font_weight text-center h5-pad-top">No.of startups  <br/>got fund</h5>';
									/* if(result.startupsGotFund != null && result.startupsGotFund !=0){
										str+='<h4 class="font_weight text-center m_top25 h4-bg-funding">'+result.startupsGotFund+'</h4>';
									}else{
										str+='<h4 class="font_weight text-center m_top25 h4-bg-funding">-</h4>';
									} */
									str+='<h4 class="font_weight text-center m_top25 h4-bg-funding number-color fundingPatternCls" id="fundRaisedCompaniesListDivID"   attr_call_type="funds" style="cursor:pointer;text-decoration-line: underline">-</h4>';
								str+='</div>';
								str+='<div class="col-sm-4 border_right_yash no-padding">';
									str+='<h5 class="font_weight text-center h5-pad-top">Fund  <br/>Value</h5>';
									str+='<h4 class="font_weight text-center m_top25 h4-bg-middle number-color">'+result.fundValue+'</h4>';
								str+='</div>';
								str+='<div class="col-sm-4 no-padding pad-t-r">';
									str+='<h5 class="font_weight text-center">Proposals In Progress for startups</h5>';
									str+='<h4 class="font_weight text-center m_top25 h4-bg-rt2 number-color">'+result.proposalsInProgress+'</h4>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="col-sm-4 pad-lt-1">';
					str+='<div class="panel panel-default panel-grey" style="margin-left:5px !important;">';
						str+='<div class="panel-heading">';
							str+='<h5 class="font_weight header-white">Revenue Generated</h5>';
						str+='</div>';
						str+='<div class="panel-body no-padding">';
							str+='<div class="row">';
								str+='<div class="col-sm-6 border_right_yash padding-startups">';
									str+='<h5 class="font_weight text-center h5-pad-top">Revenue from<br/>No.of startups</h5>';
									/* if(result.revenueStartups != null && result.revenueStartups !=0){
										str+='<h4 class="font_weight text-center m_top25 h4-bg-funding number-color">'+result.revenueStartups+'</h4>';
									}else{
										str+='<h4 class="font_weight text-center m_top25 h4-bg-funding number-color">-</h4>';
									} */
									str+='<h4 class="font_weight text-center m_top25 h4-bg-funding number-color fundingPatternCls" id="revenueGeneratedtratupDivID" attr_call_type="revenue" style="cursor:pointer;text-decoration-line: underline">-</h4>';
								str+='</div>';
								str+='<div class="col-sm-6 no-padding pad-t-r">';
									str+='<h5 class="font_weight text-center">Fund <br/>Value</h5>';
									str+='<h4 class="font_weight text-center m_top25 h4-bg-rt2 number-color">'+result.revenueFundValue+'</h4>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="col-sm-4">';
		
			str+='<div class="pad_border m_top10 no-padding">';
				str+='<div class="row">';
				
				str+='<div class="col-sm-4 border_right_yash padding-startups padding-top-1024">';
					str+='<h5 class="font_weight text-center h5-pad-top">Merged <br/>No.of <br>startups</h5>';
					str+='<h4 class="font_weight text-center m_top40 h4-bg-funding number-color">'+result.mergedStartups+'</h4>';
				str+='</div>';
				str+='<div class="col-sm-4 border_right_yash no-padding">';
					str+='<h5 class="font_weight text-center h5-pad-top">Progressing Commercial deals with startups</h5>';
					str+='<h4 class="font_weight text-center m_top40 h4-bg-middle number-color">'+result.commercialStartups+'</h4>';
				str+='</div>';
				str+='<div class="col-sm-4 no-padding">';
					str+='<h5 class="font_weight text-center pad-tr">Faculty & <br>Students <br>Trained</h5>';
					str+='<h4 class="font_weight text-center m_top40 h4-bg-rt3 number-color">'+result.studentsTrained+'</h4>';
				str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
str+='</div>';
$("#startUpsOverviewDivId").html(str);
getFundRaisedCompaniesList("count");
getRevenueGeneratedStartUps("count");
}

$(document).on("click",".fundingPatternCls",function(){
	$("#fundingPatternModalId").modal('show');
	var callType = $(this).attr("attr_call_type");
	if(callType != null && callType == "revenue"){
		getRevenueGeneratedStartUps("click");
		$("#fundingPatternModalTitleId").html("Revenue Generated Companies List");
	}
	else if(callType != null && callType == "funds"){
		getFundRaisedCompaniesList("click");
		$("#fundingPatternModalTitleId").html("Funds Raised Companies List");
	}
});
function getFundRaisedCompaniesList(type){
	if(type != null && type == "click")
		$("#fundingPatternModalDivId").html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getFundRaisedCompaniesList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result != ""){
			if(type != null && type == "count")
				$("#fundRaisedCompaniesListDivID").html(result.subList.length);
			else if(type != null && type == "click")
				buildModelTable(result);
		}
	});	
}
function getRevenueGeneratedStartUps(type){	
	if(type != null && type == "click")
		$("#fundingPatternModalDivId").html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getRevenueGeneratedStartUps',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result != ""){
			if(type != null && type == "count")
				$("#revenueGeneratedtratupDivID").html(result.subList.length);
			else if(type != null && type == "click")
				buildModelTable(result);
		}
	});	
}

function buildModelTable(result){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered fundPattDataTableCls" style="width:100%">';
			str+='<thead>';
				str+='<th>StartUp</th>';
				str+='<th>Amount</th>';
			str+='</thead>';
			str+='<tbody>';
			if(result != null && result.subList != null && result.subList.length > 0){
				for(var i in result.subList){
					str+='<tr>';
						str+='<td>'+result.subList[i].startUps+'</td>';
						str+='<td>'+result.subList[i].fundValue+'</td>';
					str+='</tr>';
				}
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#fundingPatternModalDivId").html(str);
	$(".fundPattDataTableCls").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"retrieve": true
	});
}
function getApInnovationIncubatorsXLr8APDetails(divId){
	$("#incubatorsDetailsDivId"+divId).html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationIncubatorsXLr8APDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length > 0){
			buildApInnovationIncubatorsXLr8APDetails(result,divId)
		}else{
			$("#incubatorsDetailsDivId"+divId).html("No Data Available")
		}
	});	
}

function buildApInnovationIncubatorsXLr8APDetails(result,divId){
	var str='';
	str+='<div class="panel-body">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered" id="XLr8APdataTableId" style="width:100%">';
				str+='<thead>';
					str+='<tr>';
						str+='<th colspan="9"><h4 style="color:#fff !important;">XLr8AP - Tirupathi</h4></th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th rowspan="2" style="background-color:#fff !important;">CHOHORT NAME </th>';
						str+='<th rowspan="2" style="background-color:#fff !important;">DURATION</th>';
						str+='<th rowspan="2" style="background-color:#fff !important;">REGISTERED<br>COMPANIES</th>';
						str+='<th colspan="4"style="background-color:#fff !important;text-align:center;">JOBS</th>';
						str+='<th rowspan="2" style="background-color:#fff !important;text-align:center;">STATUS</th>';
					str+='</tr>';
					str+='<tr>';	
						str+='<th style="background-color:#fff !important;">TOTAL</th>';
						str+='<th style="background-color:#fff !important;">TEMP</th>';
						str+='<th style="background-color:#fff !important;">PERM</th>';
						str+='<th style="background-color:#fff !important;">INTERNS</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						//str+='<td>'+result[i].id+'</td>';
						if(result[i].name != null){
							str+='<td>'+result[i].name+'<span class="glyphicon glyphicon-edit pull-right incubatorChorotCls" style="cursor:pointer;" attr_chorot_id="'+result[i].id+'" attr_cohort_name="'+result[i].name+'"></span></td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].year != null && result[i].year !=0){
							str+='<td>'+result[i].year+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].compReg != null && result[i].compReg !=0){
							str+='<td>'+result[i].compReg+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].totalJobs != null && result[i].totalJobs != 0){
							str+='<td>'+result[i].totalJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].temporaryJobs != null && result[i].temporaryJobs !=0){
							str+='<td>'+result[i].temporaryJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].permentJobs != null && result[i].permentJobs !=0){
							str+='<td>'+result[i].permentJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].internJobs != null && result[i].internJobs !=0){
							str+='<td>'+result[i].internJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].remarks != null && result[i].remarks !=0){
							str+='<td>'+result[i].remarks+'</td>';
						}else{
							str+='<td>-</td>';
						}
						
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#incubatorsDetailsDivId"+divId).html(str);
}
function getApInnovationIncubatorsOtherBlockDetails(divId){
	$("#incubatorsDetailsDivId"+divId).html(spinner);
	var json = {
		deptId : divId
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationIncubatorsOtherBlockDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildApInnovationIncubatorsOtherBlockDetails(result,divId)
		}else{
			$("#incubatorsDetailsDivId"+divId).html("No Data Available")
		}
	});	
}

function buildApInnovationIncubatorsOtherBlockDetails(result,divId){
	var totalJobs = 0;
	var str='';
	str+='<div class="panel-body">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered" id="dataTable'+divId+'" style="width:100%">';
				str+='<thead>';
					str+='<tr>';
						str+='<th colspan="9"><h4 style="color:#fff !important;">'+result.name+'- '+result.location+'</h4></th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th rowspan="2" style="background-color:#fff !important;">COMPANY NAME </th>';
						str+='<th rowspan="2" style="background-color:#fff !important;">STATE</th>';
						str+='<th colspan="4"style="background-color:#fff !important;text-align:center;">JOBS</th>';
						str+='<th rowspan="2" style="background-color:#fff !important;">SECTOR</th>';
						str+='<th rowspan="2" style="background-color:#fff !important;text-align:center;">DESCRIPTION</th>';
					str+='</tr>';
					str+='<tr>';	
						str+='<th style="background-color:#fff !important;">TOTAL</th>';
						str+='<th style="background-color:#fff !important;">TEMP</th>';
						str+='<th style="background-color:#fff !important;">PERM</th>';
						str+='<th style="background-color:#fff !important;">INTERNS</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result.subList){
					str+='<tr>';
						totalJobs = parseInt(result.subList[i].temporaryJobs)+parseInt(result.subList[i].permentJobs)+parseInt(result.subList[i].internJobs);
						if(result.subList[i].name != null){
							str+='<td>'+result.subList[i].name+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].state != null && result.subList[i].state !=0){
							str+='<td>'+result.subList[i].state+'</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='<td>'+totalJobs+'</td>';
						if(result.subList[i].temporaryJobs != null && result.subList[i].temporaryJobs !=0){
							str+='<td>'+result.subList[i].temporaryJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].permentJobs != null && result.subList[i].permentJobs !=0){
							str+='<td>'+result.subList[i].permentJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].internJobs != null && result.subList[i].internJobs !=0){
							str+='<td>'+result.subList[i].internJobs+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].sector != null && result.subList[i].sector !=0){
							str+='<td>'+result.subList[i].sector+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].remarks != null && result.subList[i].remarks !=0){
							str+='<td>'+result.subList[i].remarks+'</td>';
						}else{
							str+='<td>-</td>';
						}
						
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#incubatorsDetailsDivId"+divId).html(str);
	//$("#dataTable"+divId).dataTable();
	$("#dataTable"+divId).dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"retrieve": true
	});
}
function getApInnovationIncubatorsDroneAssemblyDetails(deptId){
	$("#indicatorsDroneDivId").html(spinner);
	var json = {
		deptId : deptId
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationIncubatorsDroneAssemblyDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildApInnovationIncubatorsDroneAssemblyDetails(result)
		}else{
			$("#indicatorsDroneDivId").html("No Data Available")
		}
	});	
}
function buildApInnovationIncubatorsDroneAssemblyDetails(result){
	var str='';
	str+='<div class="col-sm-6">';
		str+='<div class="panel panel-default">';
			str+='<div class=" panel-heading">';
				str+='<h5 class="font_weight">'+result.name+'- '+result.location+'</h5>';
			str+='</div>';
			str+='<div class=" panel-body">';
				str+='<div class="scrollbarDivCls">';
					str+='<div class="table-responsive">';
						str+='<table class="table table-bordered">';
							str+='<thead>';
								str+='<tr>';
									str+='<th  style="background-color:#fff !important;">PARAMETER</th>';
									str+='<th  style="background-color:#fff !important;">2017-18 Target</th>';
									str+='<th  style="background-color:#fff !important;">2017-18 Achieved</th>';
								str+='</tr>';
							str+='</thead>';
							str+='<tbody>';
							for(var i in result.subList){
								str+='<tr>';
									if(result.subList[i].parameter != null && result.subList[i].parameter != ''){
										str+='<td>'+result.subList[i].parameter+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(result.subList[i].target != null && result.subList[i].target !=0){
										str+='<td>'+result.subList[i].target+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(result.subList[i].achieved != null && result.subList[i].achieved !=0){
										str+='<td>'+result.subList[i].achieved+'</td>';
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
		str+='</div>';
	str+='</div>';
	$("#indicatorsDroneDivId").html(str);
	var	len = result.subList.length;
	if(len > 5){
		$(".scrollbarDivCls").mCustomScrollbar({setHeight:'250px'});
	}
}
function getApInnovationIncubatorsIPFecilitationDetails(deptId){
	$("#indicatorsFecilitationDivId").html(spinner);
	var json={
		deptId :deptId
	}
	$.ajax({
		type:'POST',    
		url: 'getApInnovationIncubatorsIPFecilitationDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildApInnovationIncubatorsIPFecilitationDetails(result)
		}else{
			$("#indicatorsFecilitationDivId").html("No Data Available")
		}
	});	
}
function buildApInnovationIncubatorsIPFecilitationDetails(result){
	var str ='';
	str+='<div class="col-sm-6">';
		str+='<div class="panel panel-default">';
			str+='<div class=" panel-heading">';
				str+='<h5 class="font_weight">'+result.name+'- '+result.location+'</h5>';
			str+='</div>';
			str+='<div class=" panel-body">';
				str+='<div class="scrollbarDivCls">';
					str+='<div class="table-responsive">';
						str+='<table class="table table-bordered">';
							str+='<thead>';
								str+='<tr>';
									str+='<th  style="background-color:#fff !important;">PARAMETER</th>';
									str+='<th  style="background-color:#fff !important;">2017-18 Achieved</th>';
								str+='</tr>';
							str+='</thead>';
							str+='<tbody>';
							for(var i in result.subList){
								str+='<tr>';
									if(result.subList[i].parameter != null && result.subList[i].parameter != ''){
										str+='<td>'+result.subList[i].parameter+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(result.subList[i].achieved != null && result.subList[i].achieved !=0){
										str+='<td>'+result.subList[i].achieved+'</td>';
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
		str+='</div>';
	str+='</div>';
	$("#indicatorsFecilitationDivId").html(str);
	var	len = result.subList.length;
	if(len > 5){
		$(".scrollbarDivCls").mCustomScrollbar({setHeight:'250px'});
	}
}
$(document).on("click",".incubatorChorotCls",function(){
	var cohortId = $(this).attr("attr_chorot_id");
	var cohortName = $(this).attr("attr_cohort_name");
	getApInnovationCohortWiseDetails(cohortId,cohortName);
});

function getApInnovationCohortWiseDetails(cohortId,cohortName){
	$("#cohortModalId").modal('show');
	$("#cohortModalTitleId").html(cohortName+' Details.')
	$("#cohortModalDivId").html(spinner);
	var json = {
		deptId : cohortId
	}
	$.ajax({                
		type:'POST',    
		url: 'getApInnovationCohortWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildApInnovationCohortWiseDetails(result)
		}else{
			$("#cohortModalDivId").html("No Data Available")
		}
	});	
}

function buildApInnovationCohortWiseDetails(result){
	var str='';
	str+='<table class="table table-bordered" id="dataTableId">';
			str+='<thead>';
				str+='<tr>';
					//str+='<th rowspan="2">ID</th>';
					str+='<th rowspan="2">COMPANY NAME</th>';
					str+='<th colspan="3" style="text-align:center;background-color:#f3f3f3">JOBS</th>';
					str+='<th rowspan="2" style="text-align:center;">INNOVATION</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th style="background-color:#f3f3f3">FULL&nbsp;-&nbsp;TIME</th>';
					str+='<th style="background-color:#f3f3f3">PART&nbsp;-&nbsp;TIME</th>';
					str+='<th style="background-color:#f3f3f3">INTERNS</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					/* if(result[i].id != null){
						str+='<td>'+result[i].id+'</td>';
					} */
					if(result[i].companyName != null && result[i].companyName !=0){
						str+='<td>'+result[i].companyName+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].permentJobs != null && result[i].permentJobs !=0){
						str+='<td>'+result[i].permentJobs+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].temporaryJobs != null && result[i].temporaryJobs !=0){
						str+='<td>'+result[i].temporaryJobs+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].internJobs != null && result[i].internJobs !=0){
						str+='<td>'+result[i].internJobs+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].innovation != null && result[i].innovation !=0){
						str+='<td>'+result[i].innovation+'</td>';
					}else{
						str+='<td>-</td>';
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
		$("#cohortModalDivId").html(str);
		//$("#dataTableId").dataTable();
		$("#dataTableId").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"retrieve": true
	});
		
}
$(document).on("click",".liboderCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var dateType = $(this).attr("attr_type");
	if(dateType != null && dateType == '2014-15'){
		globalFromDateKPI ="2014-04-01";
		 globalToDateKPI = "2015-03-31";
	}else if(dateType != null && dateType == '2016-17'){
		 globalFromDateKPI ="2016-04-01";
		 globalToDateKPI = "2017-03-31";
	}else if(dateType != null && dateType == '2017-18'){
		globalFromDateKPI ="2017-04-01";
		globalToDateKPI = "2018-03-31";
	}else{
		globalFromDateKPI ="2018-04-01";
		globalToDateKPI = "2019-03-31";
	}
	getMeesevaKPITargetAchieveDetails();
});

checkeOfficeDataExists();
function checkeOfficeDataExists(){
	$.ajax({                 
		type:'GET',    
		url: 'checkeOfficeDataExists',
		dataType: 'text',
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result == "notExists")
			geteOfficeDataFromWebservice();
	});
}

function geteOfficeDataFromWebservice() 
{
	var eofficeToDate = moment().format("YYYY-MM-DD");
	var data="hello";
	$.get("https://demo.eoffice.ap.gov.in/TTReports/Filesumm1.php?strFromDate=2014-01-01&strToDate="+eofficeToDate+"", function(response) {
		data = response;
		console.log(data);
		saveeOfficeWebserviceData(data);
	}).error(function(){
		console.log("Sorry,eOffice Data could not proceed");
	});
}

function saveeOfficeWebserviceData(data){
	var json = {
	    subject:data
	}
	$.ajax({                
		type:'POST',    
		url: 'saveeOfficeWebServiceData',
		dataType: 'text',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		console.log(result);
	});
}


function getAPDigitalLiteracyDetails(divId,type){
	if(type == 'onload'){
		$("#APDigitalLiteracy").html(spinner);
	}
	$("#"+divId).html(spinner);
	var json = {
	    
	}
	$.ajax({                
		type:'POST',    
		url: 'getAPDigitalLiteracyDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(type == 'onload')
		{
			$("#APDigitalLiteracy").html(result[2].cummulative+"/"+result[6].cummulative);
		}else if(type == 'overview'){
			buildAPDigitalLiteracyDetails(result,divId);
		}
		else{
			$("#APDigitalLiteracy").html("No Data Available");
		}
	});
}

function buildAPDigitalLiteracyDetails(result,divId){
	
	var str='';
	str+='<div class="table-responsive m_top20">';	
	str+='<table class="table table-bordered" id="apDigitalDataTable">';
		str+='<thead>';
				str+='<tr>';
					str+='<th>Sno</th>';
					str+='<th>Details</th>';
					str+='<th>Today</th>';
					str+='<th>Last 7 Days</th>';
					str+='<th>Last 30 Days</th>';
					str+='<th>Last 90 Days</th>';
					str+='<th>Cummulative</th>';
			str+='</tr>';
			
		str+='</thead>';
		str+='<tbody>';
			for(var i in result){
					str+='<tr>';
					 str+='<td>'+result[i].id+'</td>';
					 str+='<td>'+result[i].name+'</td>';
					 str+='<td>'+result[i].today+'</td>';
					 str+='<td>'+result[i].last7Days+'</td>';
					 str+='<td>'+result[i].last30Days+'</td>';
					 str+='<td>'+result[i].last3Months+'</td>';
					 str+='<td>'+result[i].cummulative+'</td>';
				 str+='</tr>';
			}
		str+='</tbody>';
	str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#apDigitalDataTable").dataTable({
		"retrieve": true,
	});
	
}
var globalDTPResult;
function getDeveloperOrITCompanyPropertyOverviewDetails(url,propertyType){   
	if(propertyType != null && propertyType == "DEVELOPERS")
		$(".DTPAllCls").html(spinner);
     var jsObj={
      url:url            
      }                                        
     $.ajax({
        url:'getDeveloperOrITCompanyPropertyOverviewDetails',                                       
        data: JSON.stringify(jsObj),
        type: "POST",             
        dataType :'json',
      beforeSend: function(xhr) {
         xhr.setRequestHeader("Accept", "application/json");
         xhr.setRequestHeader("Content-Type", "application/json");
      }
	  }).done(function(result){
		if(result != null && result.length > 0){
			if(propertyType != null && propertyType == "DEVELOPERS"){
				globalDTPResult = result;
				getDeveloperOrITCompanyPropertyOverviewDetails("getItCompanyPropertyOverviewDetails","ITCOMPANIES");
			}else if(propertyType != null && propertyType == "ITCOMPANIES"){
				var developerCount = parseFloat(globalDTPResult[2].count)+parseFloat(globalDTPResult[3].count);
				var itcCount = parseFloat(result[2].count)+parseFloat(result[3].count);
				var developerPerc = developerCount*100.00/parseFloat(globalDTPResult[1].count);
				var itcPerc = itcCount*100.00/parseFloat(result[1].count);
				
				$(".DTPAllCls").html(developerCount+"<small style='color:#000;top: -5px;left: 3px;font-size:16px;font-weight:bold;'>("+developerPerc.toFixed(2)+"%)</small> /"+itcCount+"<small style='color:#000;top: -5px;left: 3px;font-size:16px;font-weight:bold;'>("+itcPerc.toFixed(2)+"%)</small>");
			}
		}else{
			$(".DTPAllCls").html("0");
		}
	});
 }
 function getTrainingAndPlacementOverViewDetails(){
	$(".APITAAllCls").html(spinner);
	var json={
		"fromDateStr" :"01/01/1998",
		"toDateStr" : moment().format("DD/MM/YYYY"),
		"locationId" : ""
	}
	$.ajax({
		type:'POST',
		url:'getTrainingAndPlacementOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			var registered = result.registeredCandidates;
			var placed = result.selectedCandidates;
			var perc = (parseInt(placed)*100.00/parseInt(registered)).toFixed(2);
			$(".APITAAllCls").html(registered+" / "+placed+"<small style='color:#000;top: -5px;left: 3px;font-size:16px;font-weight:bold;'>("+perc+"%)</small>");
		}
	})
}
function getEpragatiModulesData(){
	$(".EPRAGATIAllCls").html(spinner);
	var json ={
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getModuleandStatusOverview',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			var Prodcount= 0; var total=0;
			if(result.statusList !=null ){
				for(var i in result.statusList){
					total =total+result.statusList[i].count;
					if(result.statusList[i].name !=null && result.statusList[i].name=='Production'){
						Prodcount=Prodcount+result.statusList[i].count;
					}
				}
			}
			$(".EPRAGATIAllCls").html(Prodcount+"<small style='color:#000;top: -5px;left: 3px;font-size:16px;font-weight:bold;'>("+parseFloat((Prodcount/total)*100).toFixed(2)+"%)</small>&nbsp/&nbsp"+total);
		}else{
			$(".EPRAGATIAllCls").html(0);
		}
	});
	
}
 //Lab Tinkering
 function getAtalTinkeringLabSummary(){
	$("#atalTinkeringOverviewDivId").html(spinner);
	var json={

	}
	$.ajax({
		type:'POST',    
		url: 'getAtalTinkeringLabSummary',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildAtalTinkeringLabSummary(result);
		}else{
			$("#atalTinkeringOverviewDivId").html("No Data Available");
		}
	});	
}
function buildAtalTinkeringLabSummary(result){
	var str='';
	str+='<div class="col-sm-12 m_top10">';
		str+='<h5 class="font_weight m_top10 text-capital">Atal Tinkering Summary</h5>';
		str+='<table class="table table-bordered table_custom_SC m_top10">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Year</th>';
					str+='<th>Spell</th>';
					str+='<th>Total</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';	
			for(var i in result.subList){
				str+='<tr>';
					if(result.subList[i].year != null){
						str+='<td>'+result.subList[i].year+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result.subList[i].spell != null && result.subList[i].spell > 0){
						str+='<td>'+result.subList[i].spell+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result.subList[i].total != null && result.subList[i].total > 0){
						str+='<td>'+result.subList[i].total+'</td>';
					}else{
						str+='<td>-</td>';
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#atalTinkeringOverviewDivId").html(str);
}
function getAllAtalTinkeringList(){
	$("#atalTinkeringListDivId").html(spinner);
	var json={

	}
	$.ajax({
		type:'POST',    
		url: 'getAllAtalTinkeringList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildAllAtalTinkeringList(result);
		}else{
			$("#atalTinkeringListDivId").html("No Data Available");
		}
	});	
}
function buildAllAtalTinkeringList(result){
	var str='';
	str+='<div class="col-sm-12 m_top10">';
		str+='<h5 class="font_weight m_top10 text-capital">Atal Tinkering Overall Details</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_custom_SC" id="dataTableAtlaTinkering">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>District</th>';
						str+='<th>School Name</th>';
						str+='<th>Code</th>';
						str+='<th>Year</th>';
						str+='<th>Spell</th>';					
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';	
				for(var i in result.subList){
					str+='<tr>';
						if(result.subList[i].districtName != null && typeof(result.subList[i].districtName) != "undefined"){
							str+='<td style="text-align: left !important;">'+result.subList[i].districtName+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].schoolName != null && typeof(result.subList[i].schoolName) != "undefined"){
							str+='<td style="text-align: left !important;">'+result.subList[i].schoolName+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].code != null && result.subList[i].code > 0){
							str+='<td>'+result.subList[i].code+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].year != null){
							str+='<td>'+result.subList[i].year+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].spell != null && result.subList[i].spell > 0){
							str+='<td>'+result.subList[i].spell+'</td>';
						}else{
							str+='<td>-</td>';
						}
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#atalTinkeringListDivId").html(str);
	$("#dataTableAtlaTinkering").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"retrieve": true,
		
	});
		
}

function getMeesevaSLADistrictWiseDetails(divId,blockId){
	$("#meesevaSlaDistrictWise"+divId+blockId).html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLADistrictWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLADistrictWiseDetails(result,divId,blockId);
		}else{
			$("#meesevaSlaDistrictWise"+divId+blockId).html("No Data Available");
		}
	});	
}

function buildMeesevaSLADistrictWiseDetails(result,divId,blockId){
	var totalTransactions = 0;
	var totalCatADepartments = 0;
	var totalCatATransactions = 0;
	var totalCatBDepartments = 0;
	var totalCatBTransactions = 0;
	var totalCatBApproved = 0;
	var totalCatBRejected = 0;
	var totalCatBRevoked = 0;
	var totalCatBPendingWithSLA = 0;
	var totalCatBbeyondSLA = 0;
	var totalRejectedPerc = 0.0;
	var totalWithinSLAPerc = 0.0;
	var totalBeyondSLAPerc = 0.0;
	var str = '';
		
	str+='<div class="panel-group" id="accordiondistSLA" role="tablist" aria-multiselectable="true">';
			str+='<div class="panel panel-default panel-black">';
				str+='<div class="panel-heading" role="tab" id="headingdeptSLA">';
					str+='<a role="button" class="panelCollapseIcon collapsed distSLACls"  data-toggle="collapse" data-parent="#accordionDeptSLA" href="#collapseDistSLA" aria-expanded="true" aria-controls="collapseDistSLA">';
						str+='<h4 class="panel-title">DISTRICT WISE</h4>';
					str+='</a>';
				str+='</div>';
				
			str+='<div id="collapseDistSLA" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingServSLA">';
				str+='<div class="panel-body">';
					str+='<div class="table-responsive">';
						str+='<table class="table table_custom_SC" id="districtWiseMeesavaSla" style ="width: 100%;">';
							str+='<thead>';
								str+='<tr>';
									str+='<th rowspan="2">District</th>';
									str+='<th rowspan="2">Total Transactions</th>';
									str+='<th colspan="2" style="background-color:#fdf1f1 !important;">Category - A</th>';
									str+='<th colspan="10" ">Category - B</th>';
								str+='</tr>';
								str+='<tr>';
									str+='<th style="background-color:#fdf1f1 !important;">No of Depts</th>';
									str+='<th style="background-color:#fdf1f1 !important;">Transactions</th>';
									str+='<th>No of Depts</th>';
									str+='<th>Transactions</th>';
									str+='<th>Approved</th>';
									str+='<th>Rejected</th>';
									str+='<th>Rejected %</th>';
									str+='<th>Revoked</th>';
									str+='<th>Pending With SLA</th>';									
									str+='<th> With SLA %</th>';									
									str+='<th>Beyond SLA</th>';	
									str+='<th>Beyond SLA %</th>';									
									
								str+='</tr>';
							str+='</thead>';
							str+='<tbody>';								
								for(var i in result){
									var RejectedPerc=0;	
									var bWithInSLAPerc=0;
									var BeyondPerc=0;
									var catAtotalServices = 0;
									var totalSLA = result[i].bPendingWithInSla + result[i].bPendingBeyondSla;
									RejectedPerc = (result[i].distBRejected/result[i].catgryBTransCount*100).toFixed(2);
									bWithInSLAPerc = (result[i].bPendingWithInSla*100/totalSLA).toFixed(2);
									BeyondPerc = (result[i].bPendingBeyondSla*100/totalSLA).toFixed(2);
									
									totalTransactions = totalTransactions + result[i].totalTransactionCount;
									totalCatADepartments = totalCatADepartments + result[i].catADepartments;
									totalCatATransactions = totalCatATransactions + result[i].catgryATransCount;
									totalCatBDepartments = totalCatBDepartments + result[i].catBDepartments;
									totalCatBTransactions = totalCatBTransactions + result[i].catgryBTransCount;
									totalCatBApproved = totalCatBApproved + result[i].distBApproved;
									totalCatBRejected = totalCatBRejected + result[i].distBRejected;
									totalCatBRevoked = totalCatBRevoked + result[i].revoke;
									totalCatBPendingWithSLA = totalCatBPendingWithSLA + result[i].bPendingWithInSla;
									totalCatBbeyondSLA = totalCatBbeyondSLA + result[i].bPendingBeyondSla;
									str+='<tr>';										
										str+='<td class="departmentModalClkCls odf_FixedCol" attr_block_name="districtBlock" attr_header="'+result[i].name+'" attr_dept_id="'+result[i].id+'" attr_levelType="district" style="text-align:left !important;"><a>'+result[i].name+'</a></td>';//pj
										if(result[i].totalTransactionCount !=null && result[i].totalTransactionCount>0){
											str+='<td class="odf_FixedCol">'+result[i].totalTransactionCount+'</td>';
										}else{
											str+='<td class="odf_FixedCol">-</td>';
										}
										if(result[i].catADepartments !=null && result[i].catADepartments>0){
											str+='<td style="background-color:#fdf1f1 !important;">'+result[i].catADepartments+'</td>';
										}else{
											str+='<td style="background-color:#fdf1f1 !important;">-</td>';
										}
										if(result[i].catgryATransCount !=null && result[i].catgryATransCount>0){
											str+='<td style="background-color:#fdf1f1 !important;">'+result[i].catgryATransCount+'</td>';
										}else{
											str+='<td style="background-color:#fdf1f1 !important;">-</td>';
										}										
										if(result[i].catBDepartments !=null && result[i].catBDepartments>0){
											str+='<td>'+result[i].catBDepartments+'</td>';
										}else{
											str+='<td>-</td>';
										} 
										if(result[i].catgryBTransCount !=null && result[i].catgryBTransCount>0){
											str+='<td>'+result[i].catgryBTransCount+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].distBApproved !=null && result[i].distBApproved>0){
											str+='<td>'+result[i].distBApproved+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].distBRejected !=null && result[i].distBRejected>0){
											str+='<td>'+result[i].distBRejected+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(RejectedPerc != null && RejectedPerc >0){
											str+='<td>'+RejectedPerc+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].revoke !=null && result[i].revoke>0){
											str+='<td>'+result[i].revoke+'</td>';
										}else{
											str+='<td>-</td>';
										}
										
										if(result[i].bPendingWithInSla !=null && result[i].bPendingWithInSla>0){
											str+='<td>'+result[i].bPendingWithInSla+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(bWithInSLAPerc != null && bWithInSLAPerc >0){
											str+='<td>'+bWithInSLAPerc+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(result[i].bPendingBeyondSla !=null && result[i].bPendingBeyondSla>0){
											str+='<td>'+result[i].bPendingBeyondSla+'</td>';
										}else{
											str+='<td>-</td>';
										}
										if(BeyondPerc != null && BeyondPerc >0){
											str+='<td>'+BeyondPerc+'</td>';
										}else{
											str+='<td>-</td>';
										}										
										
									str+='</tr>';
								}
								if(totalCatBRejected >0 && totalCatBTransactions >0){
									totalRejectedPerc = (totalCatBRejected*100/totalCatBTransactions).toFixed(2);
								}
								if(totalCatBPendingWithSLA >0 && totalCatBbeyondSLA >0){
									totalWithinSLAPerc = (totalCatBPendingWithSLA*100/(totalCatBPendingWithSLA+totalCatBbeyondSLA)).toFixed(2);
								}
								if(totalCatBbeyondSLA >0 && totalCatBPendingWithSLA >0){
									totalBeyondSLAPerc = (totalCatBbeyondSLA*100/(totalCatBPendingWithSLA+totalCatBbeyondSLA)).toFixed(2);
								}
								str+='<tr>';
									str+='<td class="odf_FixedCol" style="text-align: left !important;">Total</td>';
									if(totalTransactions != null && totalTransactions >0){
										str+='<td class="odf_FixedCol">'+totalTransactions+'</td>';
									}else{
										str+='<td class="odf_FixedCol">-</td>';
									}
									if(totalCatADepartments != null && totalCatADepartments >0){
										str+='<td>'+totalCatADepartments+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalCatATransactions != null && totalCatATransactions >0){
										str+='<td>'+totalCatATransactions+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalCatBDepartments != null && totalCatBDepartments >0){
										str+='<td>'+totalCatBDepartments+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalCatBTransactions != null && totalCatBTransactions >0){
										str+='<td>'+totalCatBTransactions+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalCatBApproved != null && totalCatBApproved >0){
										str+='<td>'+totalCatBApproved+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalCatBRejected != null && totalCatBRejected >0){
										str+='<td>'+totalCatBRejected+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalRejectedPerc != null && totalRejectedPerc >0){
										str+='<td>'+totalRejectedPerc+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalCatBRevoked != null && totalCatBRevoked >0){
										str+='<td>'+totalCatBRevoked+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalCatBPendingWithSLA != null && totalCatBPendingWithSLA >0){
										str+='<td>'+totalCatBPendingWithSLA+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalWithinSLAPerc != null && totalWithinSLAPerc >0){
										str+='<td>'+totalWithinSLAPerc+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalCatBbeyondSLA != null && totalCatBbeyondSLA >0){
										str+='<td>'+totalCatBbeyondSLA+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(totalBeyondSLAPerc != null && totalBeyondSLAPerc >0){
										str+='<td>'+totalBeyondSLAPerc+'</td>';
									}else{
										str+='<td>-</td>';
									}
								str+='</tr>';
							str+='</tbody>';
								
						str+='</table>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#meesevaSlaDistrictWise"+divId+blockId).html(str);
	$(".distSLACls").trigger("click");
	$("#districtWiseMeesavaSla").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 20, 50, -1], [15, 20, 50, "All"]],
		"retrieve": true,
		"scrollX":        true,		
		"scrollCollapse": true,		
		"fixedColumns":   {
			"leftColumns": 2,
		},
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			} ,
			/* {
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				orientation: "landscape",
				pageSize:'A3',
				customize: function(doc) {
					 doc.defaultStyle.alignment = 'center';
					 doc.styles.tableHeader.alignment = 'center';
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				} 
			}  */
		]
	});
	$(".DTFC_LeftBodyLiner").css({
		"overflow-x":"hidden",
		"overflow-y":"hidden",
		"top": "-11px"
	});
	setTimeout(function(){
		$(".distSLACls").trigger("click");
	},500);
}
function getMeesevaCatBtoCatACompletedDetails(divId,blockId){
	$("#meesevaCompleted"+divId+blockId).html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaCatBtoCatACompletedDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaCatBtoCatACompletedDetails(result,divId,blockId);
		}else{
			$("#meesevaCompleted"+divId+blockId).html("No Data Available");
		}
	});	
}

function buildMeesevaCatBtoCatACompletedDetails(result,divId,blockId){
	var str = '';
	str+='<div class="panel-group" id="accordionMeesevaComp" role="tablist" aria-multiselectable="true">';
			str+='<div class="panel panel-default panel-black">';
				str+='<div class="panel-heading" role="tab" id="headingdeptMeeseva">';
					str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionMeesevaComp" href="#collapseMeesevaComp" aria-expanded="true" aria-controls="collapseMeesevaComp">';
						str+='<h4 class="panel-title">Cat B  Business Process Re-engineered to Cat A</h4>';
					str+='</a>';
				str+='</div>';
				
			str+='<div id="collapseMeesevaComp" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingMeesevaComp">';
				str+='<div class="panel-body">';
					str+='<div class="table-responsive">';
						str+='<table class="table table_custom_SC table-bordered" id="MeesevaComp" style ="width: 100%;">';
							str+='<thead>';
								str+='<tr>';
									str+='<th>Department</th>';
									str+='<th>Total Services Count</th>';
									str+='<th> < 30 days</th>';
									str+='<th>30 - 90 days</th>';
									str+='<th> > 90 days</th>';
								str+='</tr>';
							str+='</thead>';
							str+='<tbody>';
							for(var i in result){
								str+='<tr>';	
									if(result[i].department != null && typeof(result[i].department) != "undefined"){
										str+='<td>'+result[i].department+'</a></td>';
									}else{
										str+='<td>-</td>';
									}
									if(result[i].totalCount != null && result[i].totalCount >0){
										str+='<td><a class="departmentCls" attr_dept_name = "'+result[i].department+'"" style = "cursor:pointer;">'+result[i].totalCount+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(result[i].compinThirtyDays != null && result[i].compinThirtyDays >0){
										str+='<td><a class="departmentCls" attr_dept_name = "'+result[i].department+'" attr_from_range ="0" attr_to_range="30" " style ="cursor:pointer;">'+result[i].compinThirtyDays+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(result[i].compInThirtytoNinty != null && result[i].compInThirtytoNinty >0){
										str+='<td><a class="departmentCls" attr_dept_name = "'+result[i].department+'" attr_from_range ="30" attr_to_range="90" " style ="cursor:pointer;">'+result[i].compInThirtytoNinty+'</td>';
									}else{
										str+='<td>-</td>';
									}
									if(result[i].compInmorethanNinty != null && result[i].compInmorethanNinty >0){
										str+='<td><a class="departmentCls" attr_dept_name = "'+result[i].department+'" attr_from_range ="90" attr_to_range="" " style ="cursor:pointer;">'+result[i].compInmorethanNinty+'</td>';
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
		str+='</div>';
	str+='</div>';
	$("#meesevaCompleted"+divId+blockId).html(str);
	 $("#MeesevaComp").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 20, 50, -1], [15, 20, 50, "All"]],
		"retrieve": true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			} ,
			/* {
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				orientation: "landscape",
				pageSize:'A3',
				customize: function(doc) {
					 doc.defaultStyle.alignment = 'center';
					 doc.styles.tableHeader.alignment = 'center';
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				} 
			}  */
		]
	}); 
}
function getMeesevaCatBtoCatAUnderDevelopmentDetails(divId,blockId){
	$("#meesevaUnderDevelopment"+divId+blockId).html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaCatBtoCatAUnderDevelopmentDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaCatBtoCatAUnderDevelopmentDetails(result,divId,blockId);
		}else{
			$("#meesevaUnderDevelopment"+divId+blockId).html("No Data Available");
		}
	});	
}

function buildMeesevaCatBtoCatAUnderDevelopmentDetails(result,divId,blockId){
	var str = '';
	str+='<div class="panel-group" id="accordionMeesevaUp" role="tablist" aria-multiselectable="true">';
			str+='<div class="panel panel-default panel-black">';
				str+='<div class="panel-heading" role="tab" id="headingMeesevaUp">';
					str+='<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionMeesevaUp" href="#collapseMeesevaUp" aria-expanded="true" aria-controls="collapseMeesevaUp">';
						str+='<h4 class="panel-title">Cat B  Business Process Re-engineered to Cat A&nbsp-&nbspIdentified</h4>';
					str+='</a>';
				str+='</div>';
				
			str+='<div id="collapseMeesevaUp" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingServSLA">';
				str+='<div class="panel-body">';
					str+='<div class="table-responsive">';
						str+='<table class="table table_custom_SC" id="MeesevaDevelopment" style ="width: 100%;">';
							str+='<thead>';
								str+='<tr>';
									str+='<th>Department</th>';
									str+='<th>Service Name</th>';
									//str+='<th>Status</th>';
									str+='<th>Remarks</th>';
								str+='</tr>';
							str+='</thead>';
							str+='<tbody>';
								for(var i in result){
									str+='<tr>';
										str+='<td>'+result[i].department+'</td>';
										str+='<td style="text-align:left !important;">'+result[i].serviceName+'</td>';
										//str+='<td style="text-align:left !important;">'+result[i].status+'</td>';
										str+='<td style="text-align:left !important;">'+result[i].remark+'</td>';
									str+='</tr>';
								}
							str+='</tbody>';
						str+='</table>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#meesevaUnderDevelopment"+divId+blockId).html(str);
	 $("#MeesevaDevelopment").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 20, 50, -1], [15, 20, 50, "All"]],
		"retrieve": true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			} ,
			/* {
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				orientation: "landscape",
				pageSize:'A3',
				customize: function(doc) {
					 doc.defaultStyle.alignment = 'center';
					 doc.styles.tableHeader.alignment = 'center';
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				} 
			}  */
		]
	});  
}
function getCatBtoCatADetailsforClick(deptType,fromRange,toRange){
	$("#catBtoCatAModalDivIdHeading").html(deptType+" Department Details");
	$("#catBtoCatAModalDivId").html(spinner);
	var json = {
		"deptType":deptType,
		"fromRange":fromRange,
		"toRange":toRange
	}
	$.ajax({                
		type:'POST',    
		url: 'getCatBtoCatADetailsforClick',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			$("#CatBtoCatAModalId").modal('show');
			buildMeesevaCatBtoCatADetailsforClick(result);
			
		}else{
			$("#catBtoCatAModalDivId").html("No Data Available");
		}
	});	
}
function buildMeesevaCatBtoCatADetailsforClick(result){
	var str='';
		str='<div class="table-responsive">';
			str+='<table class="table table-bordered" id="deptTypeCls">';
				str+='<thead>';
					str+='<tr>';
						str+='<th class="text-center"`>Department</th>';
						str+='<th class="text-center">Service Name</th>';
						str+='<th class="text-center">Service Description</th>';
						str+='<th class="text-center">Date Of Launch</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i  in result){
						str+='<tr>';
							str+='<td>'+result[i].department+'</td>';
							str+='<td>'+result[i].serviceName+'</td>';
							str+='<td>'+result[i].serviceDescription+'</td>';
							str+='<td>'+result[i].date+'</td>';
						str+='</tr>';	
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#catBtoCatAModalDivId").html(str);
	$("#deptTypeCls").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
	}); 
	
}
$(document).on("click",".departmentCls",function(){
	var deptType = $(this).attr("attr_dept_name");
	var fromRange = parseInt($(this).attr("attr_from_range"));
	var toRange = parseInt($(this).attr("attr_to_range"));
	$("#catBtoCatAModalDivIdModalId").modal('show');
	getCatBtoCatADetailsforClick(deptType,fromRange,toRange);
});
$(document).on("click",".empDetailsCls",function(){
	$("#catBtoCatAModalDivIdModalId").modal('show');
	$("#catBtoCatAModalDivIdHeading").html("EMPLOYMENT DETAILS");
	$("#catBtoCatAModalDivId").html(spinner);
	var json = {
	}
	$.ajax({                
		type:'POST',    
		url: 'getApiInnovationEmployeeDetails',
		dataType: 'json',	
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildAPInnovativeEmployementDetails(result);
		}else{
			$("#catBtoCatAModalDivId").html("NO DATA AVAILABLE");
		}
	});	
});
function buildAPInnovativeEmployementDetails(result){
	var str='';
		str='<div class="table-responsive">';
			str+='<table class="table table-bordered" id="empTypeCls">';
				str+='<thead>';
					str+='<tr>';
						str+='<th class="text-center"`>Employee Id</th>';
						str+='<th class="text-center">Employee Name</th>';
						str+='<th class="text-center">Employement Type</th>';
						str+='<th class="text-center">Company Name</th>';
						str+='<th class="text-center">Work Location</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i  in result.subList){
						str+='<tr>';
							str+='<td>'+result.subList[i].id+'</td>';
							str+='<td>'+result.subList[i].employeeName+'</td>';
							str+='<td>'+result.subList[i].employeeType+'</td>';
							str+='<td>'+result.subList[i].companyName+'</td>';
							str+='<td>'+result.subList[i].location+'</td>';
						str+='</tr>';	
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#catBtoCatAModalDivId").html(str);
	$("#empTypeCls").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Employee Details',
				filename:  'Employee Details'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		] 
	}); 
}

function getMeesevaSLADepartmentDetailsForClick(divId,deptId,blockName,serviceType,levelType){
	$("#locationModalServicePopupDivId").html("");
	$("#locationModalPopupDivId").html("");
	$("#"+divId).html(spinner);
	var json = {
		"deptCode":deptId,
		"USERID":"ITGRIDS",
		"PASSWORD":"ITGRIDS@123"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLADepartmentDetailsForClick',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLADepartmentDetailsForClick(result,divId,deptId,"",blockName,serviceType,levelType);
		}else{
			$("#"+divId).html("No Data Available");
		}
	});	
}
function buildMeesevaSLADepartmentDetailsForClick(result,divId,deptId,serviceId,blockName,serviceType,levelType) {
	var str='';
	var rejectedPerc = 0;
	var pendingWithinSlaPerc = 0;
	var pendingBeyondSla = 0;
	var totalSLA = 0;
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC" id="'+divId+'DataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">District</th>';
					str+='<th rowspan="2">Total Transactions</th>';
					str+='<th colspan="2">category - A</th>';
					str+='<th colspan="10">category - B</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>No of depts</th>';
					str+='<th>Transactions</th>';
					str+='<th>No of depts</th>';
					str+='<th>Transactions</th>';
					str+='<th>Approved</th>';
					str+='<th>Rejected</th>';
					str+='<th>Rejected %</th>';
					str+='<th>Revoked</th>';
					str+='<th>pending with in SLA</th>';
					str+='<th>pending with in SLA %</th>';
					str+='<th>Pending Beyond SLA</th>';
					str+='<th>Pending Beyond SLA %</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				rejectedPerc =((result[i].rejected/result[i].catgryBTransCount)*100).toFixed(2);
				totalSLA = result[i].pendingWithinSla + result[i].pendingBeyondSla;
				pendingWithinSlaPerc = ((result[i].pendingWithinSla/totalSLA)*100).toFixed(2);
				pendingBeyondSlaPerc = ((result[i].pendingBeyondSla/totalSLA)*100).toFixed(2);
				str+='<tr>';//pj
				if(blockName == "departmentWiseBlock") {
					str+='<td class="departmentModalPopupClkCls" attr_block_name="departmentWiseLevelThreePopupBlock" attr_district_id="'+result[i].id+'" attr_dept_id="'+deptId+'" attr_header="'+result[i].name+'" attr_serviceType ="'+result[i].serviceType+'" style="text-align:left !important; cursor:pointer;"><a>'+result[i].name+'</a></td>';
				} else{
					str+='<td class="serviceModalPopupClkCls" attr_block_name="servicePopupBlock" attr_name="districtPopup" attr_serviceId="'+serviceId+'" attr_district_id="'+result[i].id+'" attr_dept_id="'+deptId+'"  attr_header="'+result[i].name+'" attr_serviceType="'+serviceType+'"  attr_levelType="'+levelType+'" style="text-align:left !important; cursor:pointer;"><a>'+result[i].name+'</a></td>';
				}
					if(result[i].totalTransactionCount != 0 && result[i].totalTransactionCount != null) {
						str+='<td>'+result[i].totalTransactionCount+'</td>';
					} else {
						str+='<td>-</td>';
					}
					str+='<td>'+result[i].catADepartments+'</td>';
					if(result[i].catgryATransCount != 0 && result[i].catgryATransCount != null) {
						str+='<td>'+result[i].catgryATransCount+'</td>';
					} else {
						str+='<td>-</td>';
					}
					str+='<td>'+result[i].catBDepartments+'</td>';
					if(result[i].catgryBTransCount != 0 && result[i].catgryBTransCount != null) {
						str+='<td>'+result[i].catgryBTransCount+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].approved != 0 && result[i].approved != null) {
						str+='<td>'+result[i].approved+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].rejected != 0 && result[i].rejected != null) {
						str+='<td>'+result[i].rejected+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(rejectedPerc != null && rejectedPerc >0) {
						str+='<td>'+rejectedPerc+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].revoke != 0 && result[i].revoke != null) {
						str+='<td>'+result[i].revoke+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].pendingWithinSla != 0 && result[i].pendingWithinSla != null) {
						str+='<td>'+result[i].pendingWithinSla+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(pendingWithinSlaPerc != null && pendingWithinSlaPerc > 0) {
						str+='<td>'+pendingWithinSlaPerc+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].pendingBeyondSla != 0 && result[i].pendingBeyondSla != null) {
						str+='<td>'+result[i].pendingBeyondSla+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(pendingBeyondSlaPerc != null && pendingBeyondSlaPerc > 0) {
						str+='<td>'+pendingBeyondSlaPerc+'</td>';
					} else {
						str+='<td>-</td>';
					}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+divId+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 30, 45, -1], [15, 30, 45, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			} 
		]
	});
}
function getMeesevaSLAServiceDetailsForClick(divId,deptId,serviceId,serviceType,levelType){
	$("#locationModalServicePopupDivId").html("");
	$("#locationModalPopupDivId").html("");
	$("#"+divId).html(spinner);
	var json = {
		"deptCode":deptId,
		 "uniqueIdStr":serviceId,
		 "USERID":"ITGRIDS",
		 "PASSWORD":"ITGRIDS@123",
		 "type" : serviceType
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLAServiceDetailsForClick',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLADepartmentDetailsForClick(result,divId,deptId,serviceId,"",serviceType,levelType);
		}else{
			$("#"+divId).html("No Data Available");
		}
	});	
}
function getMeesevaSLADistrictWiseDetailsForClick(divId,distId){
	$("#locationModalServicePopupDivId").html("");
	$("#locationModalPopupDivId").html("");
	$("#"+divId).html(spinner);
	var json = {
		 "locationIdStr":distId,
		 "USERID":"ITGRIDS",
		 "PASSWORD":"ITGRIDS@123"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLADistrictWiseDetailsForClick',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLADistrictWiseDetailsForClick(result,divId,distId);
		}else{
			$("#"+divId).html("No Data Available");
		}
	});	
}
function buildMeesevaSLADistrictWiseDetailsForClick(result,divId,distId) {
	var str='';
	var totalSLA = 0;
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC" id="'+divId+'DataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Department</th>';
					str+='<th>No.of.Services</th>';
					str+='<th>Total Transactions</th>';
					str+='<th>Pending Beyond SLA</th>';
					str+='<th>%</th>';
					str+='<th>Pending with in SLA</th>';
					str+='<th>%</th>';
				str+='</tr>';
			str+='</thead>';	
			str+='<tbody>';	
			for(var i in result) {
				str+='<tr>';
					totalSLA = result[i].pendingBeyondSla + result[i].pendingWithinSla;
					pendingBeyondSlaPerc = ((result[i].pendingBeyondSla/totalSLA)*100).toFixed(2);
					pendingWithinSlaPerc = ((result[i].pendingWithinSla/totalSLA)*100).toFixed(2);
					str+='<td class="departmentModalPopupClkCls" attr_block_name="districtWiseLevelThreePopupBlock" attr_district_id="'+distId+'" attr_dept_id="'+result[i].id+'" attr_header="'+result[i].department+'" style="text-align:left !important; cursor:pointer;"><a>'+result[i].department+'</a></td>';
					if(result[i].catgryAServicesCount != 0 && result[i].catgryAServicesCount != null) {
						str+='<td>'+result[i].catgryAServicesCount+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].totalTransactionCount != 0 && result[i].totalTransactionCount != null) {
						str+='<td>'+result[i].totalTransactionCount+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].pendingBeyondSla != 0 && result[i].pendingBeyondSla != null) {
						str+='<td>'+result[i].pendingBeyondSla+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(pendingBeyondSlaPerc != null && pendingBeyondSlaPerc > 0){
						str+='<td>'+pendingBeyondSlaPerc+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].pendingWithinSla != 0 && result[i].pendingWithinSla != null) {
						str+='<td>'+result[i].pendingWithinSla+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(pendingWithinSlaPerc != null && pendingWithinSlaPerc > 0){
						str+='<td>'+pendingWithinSlaPerc+'</td>';
					}else{
						str+='<td>-</td>';
					}					
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';	
	$("#"+divId).html(str);
	$("#"+divId+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 30, 45, -1], [15, 30, 45, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			} 
		]
	});
}
function getMeesevaSLADepatmentWiseLevelThreeDetailsForClick(divId,deptId,locationId,heading,blockName){
	$("#locationModalServicePopupDivId").html("");
	$("#locationModalPopupDivId").html("");
	$("#"+divId).html(spinner);
	var json = {
		  "deptCode":deptId,
		  "locationIdStr":locationId,
		  "USERID":"ITGRIDS",
		  "PASSWORD":"ITGRIDS@123"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLADepatmentWiseLevelThreeDetailsForClick',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLADepatmentWiseLevelThreeDetailsForClick(result,divId,deptId,locationId,heading,blockName);
		}else{
			$("#"+divId).html("No Data Available");
		}
	});	
}
function buildMeesevaSLADepatmentWiseLevelThreeDetailsForClick(result,divId,deptId,locationId,heading,blockName) {
	var str='';
	var rejectedPerc = 0;
	var pendingBeyondSlaPerc = 0;
	var pendingWithinSlaPerc = 0;
	str+='<div class="panel-group m_top15" id="trainingaccordion" role="tablist" aria-multiselectable="true">';
		str+='<div class="panel panel-default panel-white" style="border:1px solid #ccc;">';
			str+='<div class="panel-heading" role="tab" id="trainingHeadingOne" style="box-shadow:0 0 2px 2px rgba(0,0,0,0.2);">';
				str+='<a class="panelCollapseIconChange"role="button" data-toggle="collapse" data-parent="#trainingaccordion" href="#trainingcollapseOne" aria-expanded="false" aria-controls="trainingcollapseOne" style="color:#333;">';
					str+='<h4 class="font-weight" id="modalHeadingPopupId"></h4>';
				str+='</a>';
			str+='</div>';
			str+='<div id="trainingcollapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="trainingHeadingOne">';
				str+='<div class="panel-body">';
					str+='<div class="table-responsive">';
						str+='<table class="table table-bordered table_custom_SC" id="'+divId+'DataTable">';
							str+='<thead>';
								str+='<tr>';
									str+='<th>Department</th>';
									str+='<th>Service Name</th>';
									str+='<th>Category</th>';
									str+='<th>Total Transactions</th>';
									str+='<th>Approved</th>';
									str+='<th>Rejected</th>';
									str+='<th>%</th>';
									str+='<th>Revoked</th>';
									str+='<th>Pending Beyond SLA</th>';
									str+='<th>%</th>';
									str+='<th>Pending with in SLA</th>';
									str+='<th>%</th>';
								str+='</tr>';
							str+='</thead>';	
							str+='<tbody>';	
							for(var i in result) {
								rejectedPerc = ((result[i].rejected/result[i].totalTransactionCount)*100).toFixed(2);
								pendingBeyondSlaPerc = ((result[i].pendingBeyondSla/(result[i].pendingBeyondSla + result[i].pendingWithinSla))*100).toFixed(2);
								pendingWithinSlaPerc = ((result[i].pendingWithinSla/(result[i].pendingBeyondSla + result[i].pendingWithinSla))*100).toFixed(2);
								str+='<tr>';
									str+='<td style="text-align:left !important;">'+result[i].name+'</td>';
									str+='<td class="serviceModalPopupClkCls" attr_block_name="servicePopupBlock" attr_name="servicePopup" attr_header="'+result[i].serviceName+'" attr_dept_id="'+deptId+'" attr_district_id="'+locationId+'" attr_serviceId="'+result[i].serviceId+'"  attr_serviceType ="'+result[i].serviceType+'" style="text-align:left !important; cursor:pointer;"><a>'+result[i].serviceName+'</a></td>';
									str+='<td>'+result[i].serviceDescription+'</td>';
									if(result[i].totalTransactionCount != 0 && result[i].totalTransactionCount != null) {
										str+='<td>'+result[i].totalTransactionCount+'</td>';
									} else {
										str+='<td>-</td>';
									}
									if(result[i].approved != 0 && result[i].approved != null) {
										str+='<td>'+result[i].approved+'</td>';
									} else {
										str+='<td>-</td>';
									}
									if(result[i].rejected != 0 && result[i].rejected != null) {
										str+='<td>'+result[i].rejected+'</td>';
									} else {
										str+='<td>-</td>';
									}
									if(rejectedPerc != "NaN" && rejectedPerc != 0) {
										str+='<td>'+rejectedPerc+'</td>';
									} else {
										str+='<td>-</td>';
									}
									if(result[i].revoke != 0 && result[i].revoke != null) {
										str+='<td>'+result[i].revoke+'</td>';
									} else {
										str+='<td>-</td>';
									}									
									if(result[i].pendingBeyondSla != 0 && result[i].pendingBeyondSla != null) {
										str+='<td>'+result[i].pendingBeyondSla+'</td>';
									} else {
										str+='<td>-</td>';
									}
									if(pendingBeyondSlaPerc != "NaN" && pendingBeyondSlaPerc != 0) {
										str+='<td>'+pendingBeyondSlaPerc+'</td>';
									} else {
										str+='<td>-</td>';
									}
									if(result[i].pendingWithinSla != 0 && result[i].pendingWithinSla != null) {
										str+='<td>'+result[i].pendingWithinSla+'</td>';
									} else {
										str+='<td>-</td>';
									}									
									if(pendingWithinSlaPerc != "NaN" && pendingWithinSlaPerc != 0) {
										str+='<td>'+pendingWithinSlaPerc+'</td>';
									} else {
										str+='<td>-</td>';
									}
								str+='</tr>';
							}
							str+='</tbody>';
						str+='</table>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';	
	
	$("#"+divId).html(str);
	if(blockName != "departmentWiseLevelThreePopupBlock") {
		$("#modalHeadingPopupId").html(heading+'&nbsp;Department - Service Wise Details');
	} else {
		$("#modalHeadingPopupId").html(heading+'&nbsp;District - Service Wise Details');
	}
	$("#"+divId+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 30, 45, -1], [15, 30, 45, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			} 
		]
	});
}
function getMeesevaSLADistrictWiseLevelThreeDetailsForClick(divId,deptId,locationId,heading){
	$("#locationModalServicePopupDivId").html("");
	$("#locationModalPopupDivId").html("");
	$("#"+divId).html(spinner);
	var json = {
		  "deptCode":deptId,
		  "locationIdStr":locationId,
		  "USERID":"ITGRIDS",
		  "PASSWORD":"ITGRIDS@123"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLADistrictWiseLevelThreeDetailsForClick',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLADepatmentWiseLevelThreeDetailsForClick(result,divId,deptId,locationId,heading);
		}else{
			$("#"+divId).html("No Data Available");
		}
	});	
}

//getMeesevaSLAOfficerWiseDetailsForClick("locationModalServicePopupDivId",departmentId,districtId,serviceId,heading,name,type);
function getMeesevaSLAOfficerWiseDetailsForClick(divId,deptId,locationId,serviceId,heading,name,serviceType){
	$("#"+divId).html(spinner);
	var json = {
		"deptCode":deptId,
		"locationIdStr":locationId,
		"uniqueIdStr":serviceId,
		"USERID":"ITGRIDS",
		"PASSWORD":"ITGRIDS@123",
		"type" : serviceType
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaSLAOfficerWiseDetailsForClick',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSLAOfficerWiseDetailsForClick(result,divId,heading,name,serviceType);
		}else{
			$("#"+divId).html('<b class="text-capital">'+heading+" - </b>&nbsp; Data Not Available");
		}
	});	
}
function buildMeesevaSLAOfficerWiseDetailsForClick(result,divId,heading,name,serviceType) {
	var str='';
	str+='<div class="panel-group" id="OfficerAccordion" role="tablist" aria-multiselectable="true">';
		str+='<div class="panel panel-default panel-white" style="border:1px solid #ccc;">';
			str+='<div class="panel-heading" role="tab" id="OfficerHeadingOne" style="box-shadow:0 0 2px 2px rgba(0,0,0,0.2);">';
				str+='<a class="panelCollapseIconChange"role="button" data-toggle="collapse" data-parent="#OfficerAccordion" href="#OfficercollapseOne" aria-expanded="false" aria-controls="OfficercollapseOne" style="color:#333;">';
					str+='<h4 class="font-weight" id="modalHeadingOfficerPopupId"></h4>';
				str+='</a>';
			str+='</div>';
			str+='<div id="OfficercollapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="OfficerHeadingOne">';
				str+='<div class="panel-body">';
					str+='<div class="table-responsive">';
						str+='<table class="table table-bordered table_custom_SC" id="'+divId+'DataTable">';
							str+='<thead>';
								str+='<tr>';
									str+='<th>Officer Name</th>';
									str+='<th>Mandal Name</th>';
									str+='<th>Role</th>';
									str+='<th>Pending Beyond SLA</th>';
								str+='</tr>';
							str+='</thead>';	
							str+='<tbody>';	
							for(var i in result) {
								str+='<tr>';
									str+='<td style="text-align:left !important;">'+result[i].name+'</td>';
									str+='<td>'+result[i].locationName+'</td>';
									str+='<td>'+result[i].status+'</td>';
									str+='<td>'+result[i].bPendingBeyondSla+'</td>';
								str+='</tr>';
							}
							str+='</tbody>';
						str+='</table>';
					str+='</div>';	
				str+='</div>';	
			str+='</div>';	
		str+='</div>';	
	str+='</div>';	
	$("#"+divId).html(str);
	if(name == "districtPopup") {
		$("#modalHeadingOfficerPopupId").html(heading+'&nbsp;District - Officer Wise Details');
	} else if(name == "servicePopup"){
		$("#modalHeadingOfficerPopupId").html(heading+'&nbsp;Service - Officer Wise Details');
	} else {
		$("#modalHeadingOfficerPopupId").html(heading+'&nbsp;Department - Officer Wise Details');
	}
	$("#"+divId+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 30, 45, -1], [15, 30, 45, "All"]], 
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   divId,
				filename:  divId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			} 
		]
	});
}
function getMeesevaNewServiceDetails(){
	$("#newServiceId").html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaNewServiceDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildMeesevaNewServiceDetails(result);
		}else{
			$("#newServiceId").html("No Data Available");
		}
	});	
}
function buildMeesevaNewServiceDetails(result){
	var str = '';
	str+='<div class="row m_top10">';
	str+='<div class="col-sm-12">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_default" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						//str+='<th>Service Id</th>';
						str+='<th>Service Name</th>';
						str+='<th>Department</th>';
						str+='<th>Category</th>';
						str+='<th>Launch Date</th>';
						//str+='<th>User Charge</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result){
						str+='<tr>';
						//str+='<td>'+result.serviceId+'</span></td>';						
						str+='<td>'+result[i].serviceName+'</td>';
						str+='<td>'+result[i].department+'</td>';
						str+='<td>'+result[i].cateoryA+'</td>';
						//str+='<td>'+result.totalCount+'</td>';
						str+='<td>'+result[i].date+'</td>';
						str+='</tr>';
				}
				str+='</tbody>';
			str+='<table>';
		str+='</div>';
	str+='</div>';
	str+='</div>';
	$("#newServiceId").html(str);
}
function getMeesevaSlaCentersOverviewDetails(divId,blockId){
	$("#meesevaSlaCenters"+divId+blockId).html(spinner);
	var json = {
		type:"SLA"
	}
	$.ajax({                
		type:'POST',    
		url: 'getMeesevaKPIOverViewDetailsNew',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildMeesevaSlaCentersOverViewDetails(result,divId,blockId);
		}else{
			$("#meesevaSlaCenters"+divId+blockId).html("No Data Available");
		}
		
	});	
}
function buildMeesevaSlaCentersOverViewDetails(result,divId,blockId){
	var str='';
	var totalCentresMain=0;
	var totalCentresYears=0;
	if(result !=null && result.length>0){
		
		str+='<div class="white_block_ITC m_top10">';
			str+='<div class="row">';
				str+='<h4 class="panel-title f_18 font_weight">Meeseva Centers Overview</h4>';
			str+='</div>';
			str+='<div class="row m_top10">';
			for(var i in result){
				totalCentres=result[i].ruralCount+result[i].urbanCount;
					if(i==0){
						str+='<div class="col-sm-4">';
							str+='<div class="media">';
								str+='<div class="media-left">';
									str+='<img src="Assests/icons/ITC/police-station.png" style="padding-left:20px;">';
								str+='</div>';
								str+='<div class="media-body" style="padding-left:20px;padding-top:10px;">';
										str+='<h4 class="">Total Meeseva Centers</h4>';
										str+='<h3 class="font_weight m_top10">'+totalCentres+'</h3>';
								str+='</div>';
							 str+='</div>';
							/*str+='<div class="row">';
								str+='<div class="col-sm-6 m_top40">';
									str+='<h4 class="">Rural Centers</h4>';
									str+='<h3 class="font_weight m_top5">'+result[i].ruralCount+'</h3>';
								str+='</div>';
								str+='<div class="col-sm-6 m_top40">';
									str+='<h4 class="">Urban Centers</h4>';
									str+='<h3 class="font_weight m_top5">'+result[i].urbanCount+'</h3>';
								str+='</div>';
							str+='</div>'; */
						str+='</div>';
					}
				}
				//
				str+='<div class="col-sm-8">';
					str+='<div class="row">';
						str+='<div class="custom_ul">';
							str+='<ul class="list-inline custom_li">';
							for(var i in result){
								if(i!=0){
								totalCentresYears=result[i].ruralCount+result[i].urbanCount;
								/*str+='<div class="col-sm-3">';
									str+='<div style="padding:10px;border: 2px solid #B8B8B8;border-radius:10px;">';
											str+='<h4 class="f_16 text-center">'+result[i].name+'</h4>';
											str+='<h3 class="font_weight m_top10 text-center">'+totalCentresYears+'</h3>';
											 str+='<div class="row">';
												str+='<div class="col-sm-6 m_top15 text-center">';
													str+='<h4 class="" style="font-size:15px;">Rural</h4>';
													str+='<h4 class="font_weight m_top10">'+result[i].ruralCount+'</h4>';
												str+='</div>';
												str+='<div class="col-sm-6 m_top15 text-center">';
													str+='<h4 class="" style="font-size:15px;">Urban</h4>';
													str+='<h4 class="font_weight m_top10">'+result[i].urbanCount+'</h4>';
												str+='</div>';
											str+='</div>';
										str+='</div>';
									str+='</div>';*/						
									str+='<li style="padding:10px;border: 2px solid #B8B8B8;border-radius:10px;">';
										str+='<h4 class="f_16 text-center">'+result[i].name+'</h4>';
										str+='<h3 class="font_weight m_top10 text-center">'+totalCentresYears+'</h3>';
									str+='</li>';
								}
							}	
							str+='</ul>';
						str+='</div>';
					str+='</div>';
				str+='</div>';	
			str+='</div>';
		$("#meesevaSlaCenters"+divId+blockId).html(str);
	}
}
$(document).on("click",".departmentModalClkCls",function(){
	$("#departmentModalDivId").modal("show");
	var heading = $(this).attr("attr_header");
	var blockName = $(this).attr("attr_block_name");
	var departmentId = $(this).attr("attr_dept_id");
	var serviceId = $(this).attr("attr_serviceId");
	var serviceType = $(this).attr("attr_serviceType");
	var levelType = $(this).attr("attr_levelType");
	if(blockName == "departmentWiseBlock") {
		getMeesevaSLADepartmentDetailsForClick("locationModalDivId",departmentId,blockName,serviceType,levelType);
		$("#modalHeadingId").html(heading+'&nbsp;Department - District Wise Details');
	} else if(blockName == "serviceBlock") {
		getMeesevaSLAServiceDetailsForClick("locationModalDivId",departmentId,serviceId,serviceType,levelType);
		$("#modalHeadingId").html(heading+'&nbsp;Service - District Wise Details');
	}else if(blockName == "districtBlock") {
		getMeesevaSLADistrictWiseDetailsForClick("locationModalDivId",departmentId);
		$("#modalHeadingId").html(heading+'&nbsp;District - Department Wise Details');
	}
});
$(document).on("click",".departmentModalPopupClkCls",function(){
	var blockName = $(this).attr("attr_block_name");
	var heading = $(this).attr("attr_header");
	var departmentId = $(this).attr("attr_dept_id");
	var districtId = $(this).attr("attr_district_id");
	var serviceId = $(this).attr("attr_serviceId");
	if(blockName == "departmentWiseLevelThreePopupBlock") {
		getMeesevaSLADepatmentWiseLevelThreeDetailsForClick("locationModalPopupDivId",departmentId,districtId,heading,blockName);
		$("#departmentModalDivId").animate({ scrollTop: $("#locationModalPopupDivId").offset().top},'slow');
	} else if(blockName == "districtWiseLevelThreePopupBlock") {
		getMeesevaSLADistrictWiseLevelThreeDetailsForClick("locationModalPopupDivId",departmentId,districtId,heading)
		$("#departmentModalDivId").animate({ scrollTop: $("#locationModalPopupDivId").offset().top},'slow');
	}
});
$(document).on("click",".serviceModalPopupClkCls",function(){
	var blockName = $(this).attr("attr_block_name");
	var heading = $(this).attr("attr_header");
	var name = $(this).attr("attr_name");
	var departmentId = $(this).attr("attr_dept_id");
	var districtId = $(this).attr("attr_district_id");
	var serviceId = $(this).attr("attr_serviceId");
	var serviceType = $(this).attr("attr_serviceType");
	var levelType = $(this).attr("attr_levelType");
	getMeesevaSLAOfficerWiseDetailsForClick("locationModalServicePopupDivId",departmentId,districtId,serviceId,heading,name,serviceType);
	$("#departmentModalDivId").animate({ scrollTop: $("#locationModalServicePopupDivId").offset().top},'slow');
});
$(document).on("click",".newServicesClass",function(){	
	$("#newServicesModalDivId").modal('show');
	getMeesevaNewServiceDetails();
});
$(document).on("click",".meeSevaCompViewCls li",function(){
	var type,divId,blockId,month,year,week;
	$(".meeSevaCompViewCls li").removeClass('active');
	$(this).addClass('active');
	type=$(this).attr('attr_type');
	divId=$(this).attr('attr_div_id');
	blockId=$(this).attr('attr_blc_id');
	week=$("#meeSevaCompWeekId").val();
	month=$("#meeSevaCompMonthId").val();
	year=$("#meeSevaCompYearId").val();
	if(type == "Month"){
		$(".meeSevaCompWeekDrpBlcId").hide();
		$(".meeSevaCompMonthDrpBlcId").show();
		$('#meeSevaCompWeekId').val(' ').trigger("chosen:updated");
		getPendingTransactionOverViewDetails(type,divId,blockId,month,year,week);
		getDeptWiseTransactionOverViewDetails("department",type,month,year,week,"departmentWiseMeesavaSlaComparisionId");
		getDeptWiseTransactionOverViewDetails("service",type,month,year,week,"serviceWiseMeesavaSlaCmpBlcId");
		
	}else if(type == "Year"){
		$(".meeSevaCompWeekDrpBlcId").hide();
		$(".meeSevaCompMonthDrpBlcId").hide();
		getPendingTransactionOverViewDetails(type,divId,blockId,month,year,week);
		getDeptWiseTransactionOverViewDetails("department",type,month,year,week,"departmentWiseMeesavaSlaComparisionId");
		getDeptWiseTransactionOverViewDetails("service",type,month,year,week,"serviceWiseMeesavaSlaCmpBlcId");
	}else{
		$(".meeSevaCompWeekDrpBlcId").show();
		$(".meeSevaCompMonthDrpBlcId").show();
		$("#meeSevaCompWeekId").val('week_1').trigger("chosen:updated");
		getWeeksOfMonth("meeSevaCompWeekId",month+"-2018",type,divId,blockId,month,year,"week_1");
	}
});
$(document).on("change","#meeSevaCompMonthId",function(){
	var type,divId,blockId,month,year,week;
	type=$(".meeSevaCompViewCls").find('li.active').attr('attr_type');
	divId=$(this).attr('attr_div_id');
	blockId=$(this).attr('attr_blc_id');
	week=$("#meeSevaCompWeekId").val();
	month=$(this).val();
	year=$("#meeSevaCompYearId").val();
	if(type =="Week"){
		$("#meeSevaCompWeekId").val('week_1').trigger("chosen:updated");
		week = week.trim();
		getWeeksOfMonth("meeSevaCompWeekId",month+"-2018",type,divId,blockId,month,year,week);
	}else{
		getPendingTransactionOverViewDetails(type,divId,blockId,month,year,week);
		getDeptWiseTransactionOverViewDetails("department",type,month,year,week,"departmentWiseMeesavaSlaComparisionId");
		getDeptWiseTransactionOverViewDetails("service",type,month,year,week,"serviceWiseMeesavaSlaCmpBlcId");
	}
});
$(document).on("change","#meeSevaCompWeekId",function(){
	var type,divId,blockId,month,year,week;
	type=$(".meeSevaCompViewCls").find('li.active').attr('attr_type');
	divId=$(this).attr('attr_div_id');
	blockId=$(this).attr('attr_blc_id');
	week=$(this).val();
	month=$("#meeSevaCompMonthId").val();
	year=$("#meeSevaCompYearId").val();
	getPendingTransactionOverViewDetails(type,divId,blockId,month,year,week.trim());
	getDeptWiseTransactionOverViewDetails("department",type,month,year,week.trim(),"departmentWiseMeesavaSlaComparisionId");
	getDeptWiseTransactionOverViewDetails("service",type,month,year,week.trim(),"serviceWiseMeesavaSlaCmpBlcId");
	
});
$(document).on("click",".meeSevaOverViewCmpDeptWiseCls li",function(){
	$(".meeSevaOverViewCmpDeptWiseCls li").removeClass('active');
	$(this).addClass('active');
	$(".departmentWiseOverAllShowHideCls").hide();
	var tableId=$(this).attr('attr_tab_id');
	$("#"+tableId).show();
});
$(document).on("click",".meeSevaOverViewCmpSerWiseCls li",function(){
	$(".meeSevaOverViewCmpSerWiseCls li").removeClass('active');
	$(this).addClass('active');
	$(".showHideMeesavaSlaServiceTabCls").hide();
	var tableId=$(this).attr('attr_tab_id');
	$("#"+tableId).show();
});

jQuery(document).on('ready', function() {
	
	});