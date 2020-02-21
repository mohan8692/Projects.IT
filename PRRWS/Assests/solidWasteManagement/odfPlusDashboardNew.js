var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>',
	locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}],
	componentsArr = [{name:"IHHL",type:"IHHL"},{name:"Solid Waste Management",type:"SWM"},{name:"Liquid Waste Management",type:"LWM"},{name:"GREENING",type:"greening"}],
	globalLocId = "1" ,globalLocType = "State", globalsubLocType = "",
	//currentFromDate = "01-04-2018",
	//currentToDate= "11-08-2018",
	currentFromDate = "01-04-2014",
	currentToDate= moment().format("DD-MM-YYYY"),
	NODATAMSG = "NO DATA AVAILABLE";

$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
$(document).on("click",".menuDataCollapse",function(){
	globalLocId = $(this).attr("attr_id");
	var levelId = $(this).attr("attr_levelIdValue");	
	$("#selectedName").text($(this).html());
	$("#selectedName").attr("attr_levelid",levelId);
	$("#selectedName").attr("attr_id",globalLocId);	
					
	if(levelId == 2){
		globalLocType = 'State';
		locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}else if(levelId == 3){
		globalLocType = 'District';	
		locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}else if(levelId == 4){
		globalLocType = 'Constituency';
		locationArr =[{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}
	
	onloadcalls();
})

$("#dateRangePickerOdfPlus").daterangepicker({
	opens: 'left',
	startDate: currentFromDate,
	endDate: currentToDate,
	locale: {
	  format: 'DD-MM-YYYY'
	},
	ranges: {
	'OverAll':["01-04-2014",  moment().format("DD-MM-YYYY")],
	   'Today' : [moment(), moment()],
	   'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
	   'This Month': [moment().startOf('month'),moment()],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	   'This Year': [moment().startOf('Year'), moment()],
	   'Last 1 Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
	}
});
var dates= $("#dateRangePickerOdfPlus").val("OverAll");
var pickerDates = currentFromDate+' - '+currentToDate
$('#dateRangePickerOdfPlus').on('apply.daterangepicker', function(ev, picker) {
	var levelId = $("#selectedName").attr("attr_levelid");	
	globalLocId = $("#selectedName").attr("attr_id");	
	
	if(levelId == 2){
		globalLocType = 'State';
		locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}else if(levelId == 3){
		globalLocType = 'District';	
		locationArr =[{name:"District",id:1},{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}else if(levelId == 4){
		globalLocType = 'Constituency';
		locationArr =[{name:"Constituency",id:2},{name:"Mandal",id:3},{name:"Panchayat",id:4}];
	}
	currentFromDate = picker.startDate.format('DD-MM-YYYY');
	currentToDate = picker.endDate.format('DD-MM-YYYY');
	if(picker.chosenLabel == 'OverAll')
	{
		$("#dateRangePickerOdfPlus").val('OverAll');
	}
	onloadcalls();
});
onloadcalls();
function onloadcalls(){
	getOverviewAndComponentsOverview();
	buildlevelWiseODFDetails("odfPlus");
	//getAllPrDistrictsForOdf("constSelect");
}

function getOverviewAndComponentsOverview(){
	$("#overviewTableDivId").html(spinner);
	$("#odfSatisfiedCountId").html("");
	$("#odfSatisfiedPercId").html(spinner);
	$("#totalPanchayatsId").html(spinner);
	$("#componentOverviewDivId").html(spinner);
	var json={
		location : globalLocType,
		locationId :globalLocId,
		fromDate: currentFromDate,
		toDate: currentToDate,
	}
	$.ajax({                
	type:'POST',    
	url: 'getOverviewAndComponentsOverview',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			$("#odfSatisfiedPercId").html(getValues(result.odfSatisfiedPerc)+' %');
			$("#odfSatisfiedCountId").html(getValues(result.odfSatisfied)+' GPs');
			$("#totalPanchayatsId").html(getValues(result.totalPanchayats));
			buildOverviewAndComponentsOverview(result);
			buildComponentOverview(result);
		}else{	
			//$("#overviewTableDivId").html(NODATAMSG);
		}
	});
}

function buildOverviewAndComponentsOverview(result){
	var str='';	
	str+='<div class="table-responsive table_border_seperate">';
		str+='<table class="table table-bordered">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>GPs Achivement <i class="fa fa-angle-double-right pull-right" style="font-size:20px;"aria-hidden="true"></i></th>';
					str+='<th>100%</th>';
					str+='<th>90-100%</th>';
					str+='<th>75-90%</th>';
					str+='<th>60-75%</th>';
					str+='<th>45-60%</th>';
					str+='<th>30-45%</th>';
					str+='<th>15-30%</th>';
					str+='<th>0-15%</th>';
					str+='<th>0%</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			if(result.subList != null && result.subList.length >0){
				for(var i in result.subList){
					if(result.subList[i].name !=null && result.subList[i].name.toUpperCase() == "ODF PLUS"){
						str+='<tr style="background:#e7f9f4 !important;font-weight:bold; color:#0b6e52">';
					}else{
						str+='<tr>';
					}	
					if(result.subList[i].name !=null && result.subList[i].name.toUpperCase() == "ODF PLUS"){
						str+='<td style="background:#e7f9f4 !important;font-weight:bold;color:#0b6e52;">'+getValues(result.subList[i].name).toUpperCase()+'</td>';
					}else{
						str+='<td>'+getValues(result.subList[i].name).toUpperCase()+'</td>';
					}
						str+='<td>'+getValues(result.subList[i].hundPerc)+'</td>';
						str+='<td>'+getValues(result.subList[i].ninToHunPerc)+'</td>';						
						str+='<td>'+getValues(result.subList[i].sevFivToNinPerc)+'</td>';
						str+='<td>'+getValues(result.subList[i].sixToSevFivPerc)+'</td>';
						str+='<td>'+getValues(result.subList[i].fourFivToSixPerc)+'</td>';
						str+='<td>'+getValues(result.subList[i].thirToForFivPerc)+'</td>';
						str+='<td>'+getValues(result.subList[i].fifToThirPerc)+'</td>';						
						str+='<td>'+getValues(result.subList[i].zeroToFifPerc)+'</td>';						
						str+='<td>'+getValues(result.subList[i].zeroPerc)+'</td>';									
					str+='</tr>';
				}
			}else{
				str+='<tr>';
					str+='<td colspan="10">'+NODATAMSG+'</td>';
				str+='</tr>';
			}				
			str+='</tbody>';									
		str+='</table>';
	str+='</div>';
	$("#overviewTableDivId").html(str);
}

function buildComponentOverview(result){
	var resultObj, perc,type,divId;
	var str='';
	str+='<div class="custom_nav_tab m_top10 nav nav-tabs">';
		str+='<ul class="list-inline custom_tabs">';
		for(var i in componentsArr){
			//divId = componentsArr[i].name.replace(/\s+/g, '')+"GPsAnalysisDivId";
			if(componentsArr[i].name == "IHHL"){
				perc = result.ihhlPerc;				
			}if(componentsArr[i].name == "Solid Waste Management"){
				perc = result.swmPerc;	
			}if(componentsArr[i].name == "Liquid Waste Management"){
				perc = result.lwmPerc;	
			}if(componentsArr[i].name == "GREENING"){
				perc = result.greeningPerc;	
			}
			if(i==0){
				str+='<li class="active">';
			}else{
				str+='<li>';
			}
				str+='<a data-toggle="tab" href="#'+componentsArr[i].name.replace(/\s+/g, '')+'Tab">';
					str+='<div class="media">';
						str+='<div class="media-left">';
							str+='<img src="Assests/images/odf plus icons/'+componentsArr[i].name+'.png" class="m_top10" style="width: 55px;"/>';
						str+='</div>';
						str+='<div class="media-body">';
							str+='<h5 class="font_weight m_top10">'+componentsArr[i].name+'</h5>';
							str+='<h4 class="m_top10 font_weight good_color">'+getValues(perc)+' %</h4>';
							str+='<h6>Achivement</h6>';
						str+='</div>';
					str+='</div>';
				str+='</a>';
			str+='</li>';
		}
		str+='</ul>';
		str+='<div class="tab-content">';
		for(var i in componentsArr){
			if(componentsArr[i].name == "IHHL"){
				resultObj = result.ihhlList;
			}if(componentsArr[i].name == "Solid Waste Management"){
				resultObj = result.swmList;
			}if(componentsArr[i].name == "Liquid Waste Management"){
				resultObj = result.lwmList;
			}if(componentsArr[i].name == "GREENING"){
				resultObj = result.greeningList;
			}
			if(i==0){
				str+='<div id="'+componentsArr[i].name.replace(/\s+/g, '')+'Tab" class="tab-pane active">';
			}else{
				str+='<div id="'+componentsArr[i].name.replace(/\s+/g, '')+'Tab" class="tab-pane">';
			}		
				str+='<div class="white-block pad_15" style="position: relative; left:-6px;">';
					str+='<div class="row">';
						str+='<div class="col-sm-12">';
							str+='<table class="table table-bordered table_default" style="table-layout:fixed; width:100%;">';
								str+='<thead>';
									str+='<tr>';
										str+='<th>Sub Components</th>';
										str+='<th>Target GP\'s</th>';
										str+='<th>Achivement</th>';
										str+='<th>%</th>';
									str+='</tr>';
								str+='</thead>';
								str+='<tbody>';
								if(resultObj != null && resultObj.length >0){
									for(var j in resultObj){
										str+='<tr>';
											//console.log(resultObj[i].subComponent);
											str+='<td><h5><img src="Assests/images/odf plus icons/sub components/'+resultObj[j].subComponent+'.png" style="margin-right: 10px;"/>'+getValues(resultObj[j].subComponent)+'</h5></td>';
											str+='<td>'+getValues(resultObj[j].target)+'</td>';
											str+='<td>'+getValues(resultObj[j].acheivement)+'</td>';
											str+='<td>'+getValues(resultObj[j].percentage)+'</td>';										
										str+='</tr>';
									}
								}else{
									str+='<tr>';
										str+='<td colspan="4">'+NODATAMSG+'</td>';
									str+='</tr>';
								}
																	
								str+='</tbody>';
							str+='</table>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				if(componentsArr[i].type != "IHHL"){
					str+='<div id="'+componentsArr[i].name.replace(/\s+/g, '')+'GPsAnalysisDivId"></div>';
				} 
			str+='</div>';			
		}
		str+='</div>';
	str+='</div>';
	$("#componentOverviewDivId").html(str);
	
	for(var i in componentsArr){
		type = componentsArr[i].type;
		divId = componentsArr[i].name.replace(/\s+/g, '')+"GPsAnalysisDivId";		
		if(type == "SWM" || type == "LWM"){
			getSubComponentsGPsAnalysis(type,divId);	
		}			
	}
}
function getSubComponentsGPsAnalysis(type,divId){	
	$("#"+divId).html(spinner)	;
	var json={
		location : globalLocType,
		locationId : globalLocId,		
		fromDate: currentFromDate,
		toDate: currentToDate,
		type : type,
	}
	$.ajax({                
	type:'POST',    
	url: 'getSubComponentsGPsAnalysis',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null && result.length > 0){			
			buildSubComponentsGPsAnalysis(result,divId,type);
		}else{	
			$("#"+divId).html(NODATAMSG);
		}
	});
}
function buildSubComponentsGPsAnalysis(result,divId,type){	
	var str = '';
	str+='<div class="white-block pad_15 m_top20" style="border: solid 1px #cbcbcb;">';
		str+='<div class="row">';
			str+='<div class="col-sm-12">';
				str+='<h5 class="font_weight f_16">SubComponents GPs Analysis</h5>';
				str+='<table class="table table-bordered table_default m_top10" style="table-layout:fixed; width:100%;">';
					str+='<thead>';
						str+='<tr>';
							str+='<th style="background-color:#fff">sub Component</th>';
							for(var i in result){
								str+='<th style="background-color:#fff">'+result[i].subComponent+'</th>';
							}
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						for(var i in result){
							if(type == "SWM"){
								str+='<tr>';											
									str+='<td>'+getValues(result[i].subComponent)+'</td>';
									if(result[i].swmShedsGps != null && result[i].swmShedsGps >0){
										str+='<td class="gpAnalysisCls" attr_xValue="'+result[0].subComponent+'" attr_yValue="'+result[i].subComponent+'" attr_type="'+type+'">'+result[i].swmShedsGps+'</td>';
									}else{
										str+='<td>-</td>';
									}if(result[i].equipGps != null && result[i].equipGps >0){
										str+='<td class="gpAnalysisCls" attr_xValue="'+result[1].subComponent+'" attr_yValue="'+result[i].subComponent+'" attr_type="'+type+'">'+result[i].equipGps+'</td>';						
									}else{
										str+='<td>-</td>';
									}if(result[i].gaGps != null && result[i].gaGps >0){
										str+='<td class="gpAnalysisCls" attr_xValue="'+result[2].subComponent+'" attr_yValue="'+result[i].subComponent+'" attr_type="'+type+'">'+result[i].gaGps+'</td>';					
									}else{
										str+='<td>-</td>';
									}if(result[i].vehiclesGps != null && result[i].vehiclesGps >0){
										str+='<td class="gpAnalysisCls" attr_xValue="'+result[3].subComponent+'" attr_yValue="'+result[i].subComponent+'" attr_type="'+type+'">'+result[i].vehiclesGps+'</td>';					
									}else{
										str+='<td>-</td>';
									}if(result[i].collectionGps != null && result[i].collectionGps >0){
										str+='<td class="gpAnalysisCls" attr_xValue="'+result[4].subComponent+'" attr_yValue="'+result[i].subComponent+'" attr_type="'+type+'">'+result[i].collectionGps+'</td>';					
									}else{
										str+='<td>-</td>';
									}if(result[i].vermiGps != null && result[i].vermiGps >0){
										str+='<td class="gpAnalysisCls" attr_xValue="'+result[5].subComponent+'" attr_yValue="'+result[i].subComponent+'" attr_type="'+type+'">'+result[i].vermiGps+'</td>';					
									}else{
										str+='<td>-</td>';
									}if(result[i].saleGps != null && result[i].saleGps >0){
										str+='<td class="gpAnalysisCls" attr_xValue="'+result[6].subComponent+'" attr_yValue="'+result[i].subComponent+'" attr_type="'+type+'">'+result[i].saleGps+'</td>';					
									}else{
										str+='<td>-</td>';
									}
								str+='</tr>';
							}if(type == "LWM"){							
								str+='<tr>';
									str+='<td>'+getValues(result[i].subComponent)+'</td>';
									str+='<td class="" attr_subValue="'+result[i].subComponent+'">'+getValues(result[i].soakPitsGps)+'</td>';							
									str+='<td class="" attr_subValue="'+result[i].subComponent+'">'+getValues(result[i].drainsGps)+'</td>';							
									str+='<td class="" attr_subValue="'+result[i].subComponent+'">'+getValues(result[i].ugdGps)+'</td>';	
								str+='</tr>';
							}
						}
						
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#"+divId).html(str);
}
//clicks
$(document).on("click",".gpAnalysisCls",function(){
	var X, Y, type,subDiv;
	type = $(this).attr("attr_type");
	$("#odfPlusHeadingId").html(type+" Sub Components");
	$("#odfPlusModalId").modal('show');
	//if(type == "SWM"){
		X = $(this).attr("attr_xValue"),
		Y = $(this).attr("attr_yValue");		
		getSWMSubComponentsGPsAnalysis(type,X,Y);
	//}
	/* if(type == "LWM"){
		subDiv = $(this).attr("attr_subValue");
		getLWMSubComponentsGPsAnalysis(type,subDiv);
	} */
})

function getSWMSubComponentsGPsAnalysis(type,xValue,yValue){	
	$("#subComponentsGpsAnalysisDivId").html(spinner);
	var json={
		location : globalLocType,
		locationId : globalLocId,		
		fromDate: currentFromDate,
		toDate: currentToDate,
		type : type,
		xValue : xValue,
		yValue : yValue
	}
	$.ajax({                
	type:'POST',    
	url: 'getSWMSubComponentsGPsAnalysis',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){			
			buildSubComponentsGPsAnalysisDetails(result,type);
		}else{	
			$("#subComponentsGpsAnalysisDivId").html(NODATAMSG);
		}
	});
}
function getLWMSubComponentsGPsAnalysis(type,subValue){	
	//$("#subComponentsGpsAnalysisDivId").html(spinner)	;
	var json={
		location : globalLocType,
		locationId : globalLocId,		
		fromDate: currentFromDate,
		toDate: currentToDate,
		type : type,
		subValue : subValue
	}
	$.ajax({                
	type:'POST',    
	url: 'getLWMSubComponentsGPsAnalysis',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){			
			//buildSubComponentsGPsAnalysisDetails(result,type);
		}else{	
			//$("#subComponentsGpsAnalysisDivId").html(NODATAMSG);
		}
	});
}
function buildSubComponentsGPsAnalysisDetails(result,type){	
	var swmObj = [{name:"Sheds"},{name:"Equipments"},{name:"Green Ambassadors"},
				  {name:"Vehicles"},{name:"Swm Collection"},{name:"Vermi Compost"},{name:"Sales"}],
		lwmObj = [{name: "Soak Pits"},{name: "Drains(Km)"},{name: "UGD(Km)"}],
		str= '';
		str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="table-responsive">';
				str+='<table class="table table-bordered table_default" style="width:100%;" id="odfplus'+type+'SubComponentDataTable">';
					str+='<thead>';
					//if(type == "SWM"){
						str+='<tr>';
							str+='<th>District Name</th>';
							str+='<th>Constituency Name</th>';
							str+='<th>Madal  Name</th>';
							str+='<th>Panchayat  Name</th>';
							str+='<th>Satisfied</th>';
							for(var i in swmObj){
								str+='<th>'+swmObj[i].name+'</th>';
							}
						str+='</tr>';
					//}
					/* if(type == "LWM"){
						str+='<tr>';
							str+='<th rowspan="2">District Name</th>';
							str+='<th rowspan="2">Constituency Name</th>';
							str+='<th rowspan="2">Madal  Name</th>';
							str+='<th rowspan="2">Panchayat  Name</th>';
							str+='<th rowspan="2">Satisfied</th>';
							str+='<th colspan="2">'+lwmObj[i].name+'</th>';
						str+='</tr>';
						str+='<tr>';
						for(var i in lwmObj){
							str+='<th>Required</th>';
							str+='<th>Done</th>';
						}
						str+='</tr>';
					} */
						
					str+='</thead>';
					str+='</tbody>';
						for(var i in result){
							str+='<tr>';
								str+='<td>'+result[i].districtName+'</td>';
								str+='<td>'+result[i].assemblyName+'</td>';
								str+='<td>'+result[i].mandalName+'</td>';
								str+='<td>'+result[i].panchayatName+'</td>';
								str+='<td>'+result[i].isOdfSatisfied+'</td>';
								//if(type == "SWM"){
									str+='<td>'+result[i].sheds+'</td>';
									str+='<td>'+result[i].equipments+'</td>';
									str+='<td>'+result[i].greenAmbasadors+'</td>';
									str+='<td>'+result[i].vehicles+'</td>';
									str+='<td>'+result[i].swmCollections+'</td>';
									str+='<td>'+result[i].vermiCompost+'</td>';
									str+='<td>'+result[i].sales+'</td>';
								//}								
							str+='</tr>';
						}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
		str+='</div>';
		$("#subComponentsGpsAnalysisDivId").html(str);		
		$('#odfplus'+type+'SubComponentDataTable').dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "odfPlus",
					filename:  'odfPlus'+type+'SubComponents'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
				
}
function buildlevelWiseODFDetails(divId){	
	var collapse='';
	for(var i in locationArr){
		collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+locationArr[i].name+'">';
				if(i == 0){
					collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+locationArr[i].name+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'">';
				}else{
					collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+locationArr[i].name+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'">';
				}	
						collapse+='<h4 class="panel-title text-capital">'+locationArr[i].name+' level overview</h4>';
								
					collapse+='</a>';
				collapse+='</div>';
				
				if(i == 0){
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'">';
				}else{
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'">';
				}
					collapse+='<div class="panel-body">';
						collapse+='<div class="row">';
							if(locationArr[i].name == "Constituency"){
								collapse+='<div class="col-sm-2">';
									collapse+='<label>District</label>';
									collapse+='<select class="chosen-select form-control" id="constLevelDistrictId">';
										collapse+='<option value="0">All</option>';
									collapse+='</select>';
								collapse+='</div>'; 
							}
							if(locationArr[i].name == "Mandal"){
								collapse+='<div class="col-sm-2">';
									collapse+='<label>District</label>';
									collapse+='<select class="chosen-select form-control" id="mandalLevelDistrictId">';
										collapse+='<option>Select District</option>';
									collapse+='</select>';
								collapse+='</div>';
								collapse+='<div class="col-sm-2">';
									collapse+='<label>Constituency</label>';
									collapse+='<select class="chosen-select form-control" id="mandalLevelConstituencyId">';
										collapse+='<option>Select Constituency</option>';
									collapse+='</select>';
								collapse+='</div>';
								/* collapse+='<div class="col-sm-2">';
									collapse+='<button type="button" class="btn btn-success m_top20 mandalWiseDetailsCls" style="border-radius:0px;">SUBMIT</button>';
								collapse+='</div>'; */
							}
							if(locationArr[i].name == "Panchayat"){
								collapse+='<div class="col-sm-2">';
									collapse+='<label>District</label>';
									collapse+='<select class="chosen-select form-control" id="panchayatLevelDistrictId">';
										collapse+='<option>Select District</option>';
									collapse+='</select>';
								collapse+='</div>';
								collapse+='<div class="col-sm-2">';
									collapse+='<label>Constituency</label>';
									collapse+='<select class="chosen-select form-control" id="panchayatLevelConstituencyId">';
										collapse+='<option>Select Constituency</option>';
									collapse+='</select>';
								collapse+='</div>';
								collapse+='<div class="col-sm-2">';
									collapse+='<label>Mandal</label>';
									collapse+='<select class="chosen-select form-control" id="panchayatLevelMandalId">';
										collapse+='<option>Select Mandal</option>';
									collapse+='</select>';
								collapse+='</div>';
								/* collapse+='<div class="col-sm-2">';
									collapse+='<button type="button" class="btn btn-success m_top20 villageWiseDetailsCls" style="border-radius:0px;">SUBMIT</button>';
								collapse+='</div>'; */
							}
						collapse+='</div>';
						collapse+='<div class="row">';						
							collapse+='<div class="col-sm-12 m_top10">'
								collapse+='<div id="'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'Details"></div>';								
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';		
	}
	$("#odfLocationWiseDetailsDivId").html(collapse);
	for(var i in locationArr){
		getLocationWiseOdfDetails(locationArr[i].name);
	}
	getAllPrDistrictsForOdf("constLevelDistrictId");
	getAllPrDistrictsForOdf("mandalLevelDistrictId");
	getAllPrDistrictsForOdf("panchayatLevelDistrictId");
	
	//getConstituenciesForPrDistrict("mandalLevelConstituencyId","");
	//getConstituenciesForPrDistrict("panchayatLevelConstituencyId","");
	
	//getMandalsForConstituencies("panchayatLevelMandalId","");
	
}

function getLocationWiseOdfDetails(locationType){	
	$("#odfPlus"+locationType+"Details").html(spinner);
	var selectBoxValue;
	if(globalLocId == 0){
		if(globalLocType == "Mandal"){
			selectBoxValue = $("#panchayatLevelMandalId").val();
			if(selectBoxValue == 0){
				selectBoxValue = $("#panchayatLevelConstituencyId").val();
				if(selectBoxValue == 0){
					selectBoxValue = $("#panchayatLevelDistrictId").val();
					if(selectBoxValue == 0){
						globalLocType = "State";
						globalLocId = 1;
					}else{
						globalLocType = "District";
						globalLocId = selectBoxValue;
					}
				}else{
					globalLocType = "Constituency";
					globalLocId = selectBoxValue;
				}
			}
		}else if(globalLocType == "Constituency"){
			selectBoxValue = $("#mandalLevelConstituencyId").val();
			if(selectBoxValue == 0){
				selectBoxValue = $("#mandalLevelDistrictId").val();
				if(selectBoxValue == 0){
					globalLocType = "State";
					globalLocId = 1;
				}else{
					globalLocType = "District";
					globalLocId = selectBoxValue;
				}	
			}
		}else if(globalLocType == "District"){
			selectBoxValue = $("#constLevelDistrictId").val();
			if(selectBoxValue == 0){
					globalLocType = "State";
					globalLocId = 1;
				}else{
					globalLocType = "District";
					globalLocId = selectBoxValue;
				}	
		}
	}
	var json={
		location : globalLocType, // menu
		locationId : globalLocId,
		subLocation: locationType,
		fromDate: currentFromDate,
		toDate: currentToDate,
	}
	$.ajax({                
	type:'POST',    
	url: 'getLocationWiseOdfDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){			
			buildLocationWiseOdfDetails(result,locationType);
		}else{	
			$("#odfPlus"+locationType+"Details").html(NODATAMSG);
		}
	});
}
function buildLocationWiseOdfDetails(result,locationType){
	var str='';
	
	str+='<div class="table-responsive m_top20">';
		str+='<table class="table table-bordered table_default" style="width:100%;" id="odfplus'+locationType+'DataTable">';
			str+='<thead>';
				str+='<tr>';
					if(locationType != "District"){
						str+='<th>District</th>';
					}if(locationType == "Panchayat" || locationType == "Mandal"){
						str+='<th>constituency</th>';
					}if(locationType == "Panchayat"){
						str+='<th>mandal</th>';
					}
					str+='<th>'+locationType+'</th>';
					
					if(locationType == "Panchayat"){
						str+='<th>Is ODF GP</th>';
					}else{
						str+='<th>Total GP</th>';
					}
										
					str+='<th>ODF Plus Satisfied</th>';
					if(locationType != "Panchayat"){
						str+='<th>%</th>';
					}					
					str+='<th >100% IIHL GPs</th>';
					str+='<th>%</th>';
					str+='<th >100% SWM GPs</th>';
					str+='<th>%</th>';
					str+='<th>100% LWM GPs</th>';
					str+='<th>%</th>';
					str+='<th>100% GREENING GPs</th>';
					str+='<th>%</th>';
				str+='</tr>';				
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td>'+getValues(result[i].districtName)+'</td>';
					if(locationType != "District"){
						str+='<td>'+getValues(result[i].assemblyName)+'</td>';
					}if(locationType == "Mandal" || locationType == "Panchayat"){
						str+='<td>'+getValues(result[i].mandalName)+'</td>';
					}if(locationType == "Panchayat"){
						str+='<td>'+getValues(result[i].panchayatName)+'</td>';
					}
					if(locationType == "Panchayat"){
						str+='<td>'+getValues(result[i].isOdfSatisfied)+'</td>';
					}else{
						str+='<td>'+getValues(result[i].noOfGps)+'</td>';
					}					
					if(locationType != "Panchayat"){
						str+='<td>'+getValues(result[i].odfPlusGps)+'</td>';
						str+='<td>'+getValues(result[i].odfPlusPerc)+'</td>';
					}else{
						str+='<td>'+getValues(result[i].odfPlusPerc)+'</td>';
					}
					
					str+='<td>'+getValues(result[i].ihhl)+'</td>';
					str+='<td>'+getValues(result[i].ihhlPerc)+'</td>';
					str+='<td>'+getValues(result[i].swm)+'</td>';
					str+='<td>'+getValues(result[i].swmPerc)+'</td>';
					str+='<td>'+getValues(result[i].lwm)+'</td>';
					str+='<td>'+getValues(result[i].lwmPerc)+'</td>';
					str+='<td>'+getValues(result[i].greening)+'</td>';
					str+='<td>'+getValues(result[i].greeningPerc)+'</td>';
				str+='</tr>';
			}
				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$('.chosen-select').chosen();
	$('#odfPlus'+locationType+'Details').html(str);
	$('#odfplus'+locationType+'DataTable').dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "odfPlus",
					filename:  'odfPlus'+locationType+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		});
		
}
function getValues(value){
	var type= typeof value;	
	if(type == "string"){
		if(value == null || value.length == 0 || value == 0){
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

//get All districts
function getAllPrDistrictsForOdf(divId){
		$("#"+divId).html('');
		var json = {
			locationType : globalLocType,
			locationIdStr : globalLocId
			
		}
		$.ajax({                
			type:'POST',    
			url: 'getAllPrDistrictsForOdf',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
		if(result){
			buildSelectBox(result,divId);	
		}
	});
}
    
//Constituency Level Onchange
$(document).on("change","#mandalLevelDistrictId",function(){
	var value = $(this).val();
	globalLocType = "district";
	getConstituenciesForPrDistrict("mandalLevelConstituencyId",value)
});	

function getConstituenciesForPrDistrict(divId,value){
		if(globalLocType == "Constituency"){
			value = globalLocId;
		}
		$("#"+divId).html("");		
		var json = {
			locationType : globalLocType,
			locationIdStr : value	
		}
		$.ajax({                
			type:'POST',    
			url: 'getConstituenciesForPrDistrict',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			buildSelectBox(result,divId);
		
	});
}


	
//Mandal Level Onchange
$(document).on("change","#panchayatLevelDistrictId",function(){
	var value = $(this).val();
	globalLocType = "District";
	globalLocId = value;
	$("#panchayatLevelConstituencyId").html("");
	getConstituenciesForPrDistrict("panchayatLevelConstituencyId",value);	
	getLocationWiseOdfDetails("Panchayat");
});	
$(document).on("change","#panchayatLevelConstituencyId",function(){
	var value = $(this).val();
	getMandalsForConstituencies("panchayatLevelMandalId",value);
	globalLocType = "Constituency";
	globalLocId = value;
	getLocationWiseOdfDetails("Panchayat");
});	
$(document).on("change","#constLevelDistrictId",function(){
	var value = $(this).val();
	globalLocType = "District";
	globalLocId = value;
	getLocationWiseOdfDetails("Constituency");
});
$(document).on("change","#mandalLevelDistrictId",function(){
	var value = $(this).val();
	globalLocType = "District";
	globalLocId = value;
	getLocationWiseOdfDetails("Mandal");
});	
$(document).on("change","#mandalLevelConstituencyId",function(){
	var value = $(this).val();
	globalLocType = "Constituency";
	globalLocId = value;
	getLocationWiseOdfDetails("Mandal");
});

$(document).on("change","#panchayatLevelMandalId",function(){
	var value = $(this).val();
	globalLocType = "Mandal";
	globalLocId = value;
	getLocationWiseOdfDetails("Panchayat");
});
// Constituency onchange tehsil
function getMandalsForConstituencies(divId,value){
		$("#"+divId).html("");
		$("#"+divId).trigger('chosen:updated');
		var json = {
			locationIdStr : value
		}
		$.ajax({                
			type:'POST',    
			url: 'getMandalsForConstituencies',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			buildSelectBox(result,divId);
		});
	}
	
function buildSelectBox(result,divId){	
	var str='';	
	if(result.length != 1){
		$("#"+divId).append('<option value="0" selected>All</option>');
	}
	
	for(var i in result){
		//if(divId == "mandalLevelConstituencyId"){
			$("#"+divId).append('<option value="'+result[i].assemblyCode+'">'+result[i].name+'</option>');
		/* }else{
			$("#"+divId).append('<option value="'+result[i].id+'">'+result[i].name+'</option>');
		} */
		
	}
	$("#"+divId).trigger("chosen:updated");
	
	if(divId == "mandalLevelDistrictId"){
		var disrictId = $("#mandalLevelDistrictId").val();
		getConstituenciesForPrDistrict("mandalLevelConstituencyId",disrictId);
	}else if(divId == "panchayatLevelDistrictId"){
		var disrictId = $("#panchayatLevelDistrictId").val();
		getConstituenciesForPrDistrict("panchayatLevelConstituencyId",disrictId);
	}else if(divId == "panchayatLevelConstituencyId"){
		var constId = $("#panchayatLevelConstituencyId").val();
		getMandalsForConstituencies("panchayatLevelMandalId",constId);
	}
}
$(document).on("click",".mandalWiseDetailsCls",function(){
	var districtId = $("#mandalLevelDistrictId").val();
	var constituencyId = $("#mandalLevelConstituencyId").val();
	
	globalLocId = constituencyId;
	globalLocType = "Constituency";
	getLocationWiseOdfDetails("Constituency");
});
