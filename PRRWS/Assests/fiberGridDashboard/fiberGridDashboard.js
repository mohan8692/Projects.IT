var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var smallSpinner = '<img src="Assests/images/spinner.gif" style="width:25px;height:25px;"/>';
var locationsArr = [{name:'district'},{name:'mandal'}];		
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){	
	$(".menu-data-cls").hide();
	
	
});
onloadCalls();
function onloadCalls(){
	getCustomerWiseCafCountDetails();
	getFiberCoverageAreaDetails();
	getPopWiseData();
	getRecentNewConnections();
	locationsData();
	getDistrictIdAndName();	
}
function getCustomerWiseCafCountDetails(){ 
	$("#customerDetailsId").html(spinner)
	var json={}
	$.ajax({
		type:'GET',
		url:'getCustomerWiseCafCountDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildCustomerWiseCafCountDetails(result);
		}else{
			$("#customerDetailsId").html("No Data Available")
		}
	})
}
function buildCustomerWiseCafCountDetails(result){
	var str='';
		str+='<div class="col-sm-12">';
		str+='<div class="col-sm-3">';
			str+='<div class="  text-center" style="background-color: #ffeded;padding: 30px;margin-top: 5px;">';
				if(result.totConnections != null && result.totConnections>0){
					str+='<h2 class="font_weight">'+result.totConnections+'</h2>';					
				}else{
					str+='<h2 class="font_weight"> - </h2>';
				}
				
				str+='<h4 class="m_top10">Total Connections</h4>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3 ">';
			str+='<div class=" m_top10 text-center br_left_con" style=" ">';
				str+='<img src="Assests/img/icon-home.png"/>';
				if(result.homeConnections != null && result.homeConnections>0){
					str+='<h2 class="font_weight m_top10" style="color: #99dfc5;">'+result.homeConnections+'<span class="f-18 good_color_light">&nbsp;&nbsp;'+result.homeConnectionsperc+'<small class="good_color_light">&nbsp;%</small></span></h2>';
				} else{
					str+='<h2 class="font_weight m_top10"> - </h2>';
				}				
				str+='<h4 class="m_top10">Home Connections </h4>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3  " >';
			str+='<div class="m_top10  text-center br_left_con" style="">';
				str+='<img src="Assests/img/icon-govt.png" />';
				if(result.govtCommConnections != null && result.govtCommConnections>0){
					str+='<h2 class="font_weight good_color m_top10">'+result.govtCommConnections+'<span class="f-18 "style="color:#e07474">&nbsp;&nbsp;'+result.govtCommConnectionsperc+'&nbsp;<small style="color:#e07474">&nbsp;%</small></span></h2>';
				} else{
					str+='<h2 class="font_weight m_top10"> - </h2>';
				}						
				str+='<h4 class="m_top10">Govt. Commercial Connections </h4>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3" >';
			str+='<div class="m_top10  text-center br_left_con" style="">';
				str+='<img src="Assests/img/icon-private.png"  />';
				if(result.pvtCommConnections != null && result.pvtCommConnections>0){
					str+='<h2 class="font_weight m_top10" style="color:#9b3c48">'+result.pvtCommConnections+'<span class="f-18" style="color:#9d9d9d">&nbsp;&nbsp;'+result.pvtCommConnectionsperc+'<small style="color:#9d9d9d">&nbsp;%</small></span></h2>';
				} else{
					str+='<h2 class="font_weight m_top10"> - </h2>';
				}					
				str+='<h4 class="m_top10">Private Commercial Connections </h4>';
			str+='</div>';
		str+='</div>';
		str+='</div>';			
	$('#customerDetailsId').html(str);
}
function getFiberCoverageAreaDetails(){ 
	$("#fiberCoverageDetailsId").html(spinner)
	var json={}
	$.ajax({
		type:'GET',
		url:'getFiberCoverageAreaDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildFiberCoverageAreaDetails(result);
		}else{
			$("#fiberCoverageDetailsId").html("No Data Available")
		}
	})
}
function buildFiberCoverageAreaDetails(result){
	var panchayatTotalCount = 12951;
    var corporationsCount = 12;
	var municipalities = 101;
	var connectedVillagesPerc=result[0].panchayatCount*100/panchayatTotalCount;
	var yetConnetcPerc=(panchayatTotalCount - result[0].panchayatCount)*100/panchayatTotalCount;
	var villagesConnectCustomersPerc=result[0].panchayatCon*100/(result[0].panchayatCon + result[0].municipalityCon);
	var munConnectCustomersPerc=result[0].municipalityCon*100/(result[0].panchayatCon + result[0].municipalityCon);
	var villagesNotYetConnectedCount = (panchayatTotalCount-parseInt(result[0].panchayatCount));
	var villagesNotYetConnectedPerc =( villagesNotYetConnectedCount *100) / panchayatTotalCount ;
	var munNotYetConnectedCount = ((corporationsCount + municipalities) - result[0].municipalityCount);
	var munNotYetConnectedPerc =( munNotYetConnectedCount *100) / (corporationsCount + municipalities) ;
	var connectedMuncipalityPer=((result[0].municipalityCount/(corporationsCount + municipalities))*100);
	//console.log(result);
	var str='';
		str+='<div class="col-sm-12">';
			str+='<p class="f_22 ">Fiber Coverage</p>';
		str+='</div>';
		str+='<div class="col-sm-12">';	
				/* str+='<div class="panel">';
					str+='<div class="panel-body" style="border: 1px solid #b4d7ec;">';
							str+='<div class="row m_top10">';
								str+='<div class="col-sm-3  text-center">';
									str+='<h4>Connected<br>Villages</h4>';
									if(result[0].panchayatCount != null && result[0].panchayatCount >0){
										str+='<h4 class="font_weight m_top10">'+result[0].panchayatCount+' <small class="bad_color">'+connectedVillagesPerc.toFixed(2)+' %</small></h4>';
									} else{
										str+='<h4 class="font_weight m_top10"> - </h4>';
									}	
								str+='</div>';	
								str+='<div class="col-sm-3  text-center ">';
									str+='<div class="br_left" style="border-left-color: #b4d7ec;">';
										str+='<h4>Yet To <br>Connected Villages</h4>';
										str+='<h4 class="font_weight m_top10">'+(panchayatTotalCount - result[0].panchayatCount)+' <small class="bad_color">'+yetConnetcPerc.toFixed(2)+' %</small></h4>';
									str+='</div>';
								str+='</div>';								
								str+='<div class="col-sm-3  text-center ">';
									str+='<div class="br_left" style="border-left-color: #b4d7ec;">';
										str+='<h4>Villages Connected<br>Customers</h4>';
										if(result[0].panchayatCon != null && result[0].panchayatCon >0){
											str+='<h4 class="font_weight m_top10">'+result[0].panchayatCon+' <small class="bad_color">'+villagesConnectCustomersPerc.toFixed(2)+' %</small></h4>';
										} else{
											str+='<h4 class="font_weight m_top10"> - </h4>';
										}										
									str+='</div>';
								str+='</div>';
								
								str+='<div class="col-sm-3  text-center ">';
									str+='<div class="br_left" style="border-left-color: #b4d7ec;">';
										str+='<h4>Municipalities Connected<br>Customers</h4>';
										if(result[0].municipalityCon != null && result[0].municipalityCon>0){
											str+='<h4 class="font_weight m_top10">'+result[0].municipalityCon+' <small class="bad_color">'+munConnectCustomersPerc.toFixed(2)+' %</small></h4>';
										} else{
											str+='<h4 class="font_weight m_top10"> - </h4>';
										}
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>'; */
				
			str+='<div class="col-sm-6 m_top10">';
				str+='<div class="panel">';
					str+='<div class="panel-body" style="border: 1px solid #b4d7ec;">';
						str+='<div class="row">';
							str+='<div class="col-sm-6">';
								str+='<h4 class="font_weight" style="font-size: 17px !important;">Total Villages</h4>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<h4 class="font_weight pull-right">'+panchayatTotalCount+'</h4>';
							str+='</div>';
						str+='</div>';
						str+='<div class="pad_border m_top10" style="border-color: #b4d7ec;">';
							str+='<div class="row m_top10">';
								str+='<div class="col-sm-6  text-center">';
									str+='<h4 style="font-size: 17px !important;">Connected<br>Villages</h4>';
									if(result[0].panchayatCount != null && result[0].panchayatCount>0){
										str+='<h4 class="font_weight m_top10">'+result[0].panchayatCount+' <small class="bad_color">'+connectedVillagesPerc.toFixed(2)+' %</small></h4>';
									} else{
										str+='<h4 class="font_weight m_top10"> - </h4>';
									}									
								str+='</div>';						
								str+='<div class="col-sm-6  text-center ">';
									str+='<div class="br_left" style="border-left-color: #b4d7ec;">';
									str+='<h4 style="font-size: 17px !important;">Connected<br>Customers</h4>';
									 if(result[0].panchayatCon != null && result[0].panchayatCon>0){
										str+='<h4 class="font_weight m_top10">'+result[0].panchayatCon+'</h4>';
									} else{
										str+='<h4 class="font_weight m_top10"> - </h4>';
									}								
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					 str+='<div class="panel-footer" style="background-color:#b4d7ec;border: 1px solid #b4d7ec;">';
						str+='<div class="row">';
							str+='<div class="col-sm-6">';
								str+='<p class="f_15 font_weight">Yet To Connected</p>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<p class="f_15 font_weight pull-right">'+villagesNotYetConnectedCount+'<small class="bad_color">'+villagesNotYetConnectedPerc.toFixed(2)+' %</small></p>';
							str+='</div>';
						str+='</div>';
					str+='</div>'; 
				str+='</div>';
			str+='</div>';
			
			str+='<div class="col-sm-6 m_top10">';
				str+='<div class="panel">';
					str+='<div class="panel-body" style="border: 1px solid #b4d7ec;">';
						str+='<div class="row">';
							str+='<div class="col-sm-6">';
								str+='<h4 class="font_weight" style="font-size: 17px !important;">Total Muncipalties/Corporations</h4>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<h4 class="font_weight pull-right">'+(corporationsCount + municipalities)+'</h4>';
							str+='</div>';
						str+='</div>';
						str+='<div class="pad_border m_top10" style="border-color: #b4d7ec;">';
							str+='<div class="row m_top10">';
								str+='<div class="col-sm-6  text-center">';
									str+='<h4 style="font-size: 17px !important;">Connected<br>Muncipalities</h4>';
									if(result[0].municipalityCount != null && result[0].municipalityCount>0){
										str+='<h4 class="font_weight m_top10">'+result[0].municipalityCount+' <small class="bad_color">'+connectedMuncipalityPer.toFixed(2)+'%</small></h4>';
									} else{
										str+='<h4 class="font_weight m_top10"> - </h4>';
									}									
								str+='</div>';						
								str+='<div class="col-sm-6  text-center ">';
									str+='<div class="br_left" style="border-left-color: #b4d7ec;">';
									str+='<h4 style="font-size: 17px !important;">Connected<br>Customers</h4>';
									 if(result[0].municipalityCon != null && result[0].municipalityCon>0){
										str+='<h4 class="font_weight m_top10">'+result[0].municipalityCon+'</h4>';
									} else{
										str+='<h4 class="font_weight m_top10"> - </h4>';
									} 										
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					 str+='<div class="panel-footer" style="background-color:#b4d7ec;border: 1px solid #b4d7ec;">';
						str+='<div class="row">';
							str+='<div class="col-sm-6">';
								str+='<p class="f_15 font_weight">Yet To Connected</p>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<p class="f_15 font_weight pull-right">'+munNotYetConnectedCount+' <span class="bad_color">'+munNotYetConnectedPerc.toFixed(2)+'%</span></p>';
							str+='</div>';
						str+='</div>';
					str+='</div>'; 
				str+='</div>';
			str+='</div>';	
			
		str+='</div>';
		$("#fiberCoverageDetailsId").html(str);
}
function getPopWiseData(){ 
	$("#popWiseDetailsId").html(spinner)
	var json={}
	$.ajax({
		type:'GET',
		url:'getPopWiseData',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildPopWiseData(result);
		}else{
			$("#popWiseDetailsId").html("No Data Available");
		}
	})
}
function buildPopWiseData(result){
	var popColors = [{headColor :"#6fb2db"},{headColor :"#9dcc7c"},{headColor :"#f4898b"},{headColor :"#b596e0"},{headColor: "#ff9800"}];
	var str='';
	if(result.length > popColors.length){
		var addCount = result.length - popColors.length;
		console.log(addCount);
		for(var i=0; i< addCount; i++){
			var defaultColor ={headColor: "#9f9d9a"};
			popColors.push(defaultColor);
		}
	}	
	
		str+='<div class="col-sm-12">';
			str+='<p class="f_22 ">Type of Pops</p>';
		str+='</div>';
		 str+='<div class="custom_ul">';
		str+='<ul class="list-inline custom_li">';
		for(var i in result){
			str+='<li class="m_top10">';
			//str+='<div class="col-sm-3 m_top10">';
				str+='<div class="panel panel-default" style="border-color:'+popColors[i].headColor+'">';
					str+='<div class="panel-heading" style="background-color:'+popColors[i].headColor+'">';
						str+='<h4 class="text-capital text-center white_color">'+result[i].typeOfPop.split("_")[0]+'</h4>';
					str+='</div>';
					str+='<div class="panel-body">';
						str+='<div class="row m_top10">';
							if( result[i].totalPops != null && result[i].totalPops >0){
								str+='<h4 class="text-center font_weight">'+result[i].totalPops+'</h4>';
							} else{
								str+='<h4 class="text-center font_weight"> - </h4>';
							}
							
							str+='<p class="f_16 text-center">Total Pops</p>';
						str+='</div>';
						str+='<hr class="m_top_bottom_5 hidden-sm hidden-xs" style="border-top-color:'+popColors[i].headColor+'">';
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-6">';
								str+='<p class="f_16 text-center">Working</p>';
								if(result[i].workingPops != null && result[i].workingPops > 0){
									str+='<h4 class="text-center font_weight">'+result[i].workingPops+'&nbsp;&nbsp;<span class="good_color_light f_15">'+result[i].workingPopsPerc+'<small class="good_color_light">&nbsp;%</small></span></h4>';
								} else{
									str+='<h4 class="text-center font_weight"> - </h4>';
								}								
							str+='</div>';									
							str+='<div class="col-sm-6">';
								str+='<div class="br_left" style="border-left-color: '+popColors[i].headColor+'">';
									str+='<p class="f_16 text-center">Not Working</p>';
									if(result[i].notWorkingPops != null && result[i].notWorkingPops > 0){
										str+='<h4 class="text-center font_weight">'+result[i].notWorkingPops+'&nbsp;&nbsp;<span class="bad_color f_15">'+result[i].notWorkingPopsPerc+'<small class="bad_color ">&nbsp;%</small></span></h4>';
									} else {
										str+='<h4 class="text-center font_weight"> - </h4>';
									}									
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			//str+='</div>';
			str+='</li>';
		}
		str+='</ul>';
	str+='</div>';
	$("#popWiseDetailsId").html(str);
}
function getRecentNewConnections(){ 
	$("#recentNewConnectionsId").html(spinner);
	var json={}
	$.ajax({
		type:'GET',
		url:'getRecentNewConnections',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildRecentNewConnections(result);
		}else{
			$("#recentNewConnectionsId").html("No Data Available");
		}
	})
}
function buildRecentNewConnections(result){
	var fiberCoverageAreas=["Total Connections","Home Connections","Govt Commercial Connections","Private Connections"]
	var str='';
		str+='<div class="col-sm-12">';	
			str+='<p class="f_22 ">New Connections</p>';
		str+='</div>';
		str+='<div class="col-sm-12">';	
			str+='<div class="table-responsive p_lr15 m_top10">';
				str+='<table class="table table_fibergrid_newConnections">';
					str+='<thead>';
						str+='<tr>';
							str+='<th></th>';
							str+='<th>Today</th>';
							str+='<th>Yesterday</th>';
							str+='<th>Last 7 days</th>';
							str+='<th>Last 30 days</th>';
							str+='<th>Last 3 months</th>';
							str+='<th>Last 6 months</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';	
						for(var i in result){
							str+='<tr>';
							str+='<td><p class="" style="background-color: #9dcc7c;padding: 5px ;border-radius: 4px; width: 75%">'+fiberCoverageAreas[i]+'</p></td>';
							if(result[i].today != null && result[i].today > 0){
								str+='<td>'+result[i].today+'</td>';
							} else{
								str+='<td> - </td>';
							}
							if(result[i].yesterday != null && result[i].yesterday > 0){
								str+='<td>'+result[i].yesterday+'</td>';
							} else{
								str+='<td> - </td>';
							}
							if(result[i].last7Days != null && result[i].last7Days > 0){
								str+='<td>'+result[i].last7Days+'</td>';
							} else{
								str+='<td> - </td>';
							}
							if(result[i].last30Days != null && result[i].last30Days > 0){
								str+='<td>'+result[i].last30Days+'</td>';
							} else{
								str+='<td> - </td>';
							}
							if(result[i].last3Months != null && result[i].last3Months > 0){
								str+='<td>'+result[i].last3Months+'</td>';
							} else{
								str+='<td> - </td>';
							}
							if(result[i].last6Months != null && result[i].last6Months > 0){
								str+='<td>'+result[i].last6Months+'</td>';
							} else{
								str+='<td> - </td>';
							}	
						str+='</tr>	';	
						}
													
					str+='</tbody>';
				str+='</table>';
				/*str+='<div class="m_top10 p_left10">';
					str+='<a href="#"> Click Here Location Wise New Connection Details </a>';
				str+='</div>';*/
			str+='</div>';
		str+='</div>';		
	$("#recentNewConnectionsId").html(str);
}

function locationsData(){		
	var collapse='';
	collapse+='<div class="panel-group" id="locationsCollapse" role="tablist" aria-multiselectable="true">';
		for(var i in locationsArr)	{
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="locationsCollapseHeading'+locationsArr[i].name+'">';
					if(i == 0){
						collapse+='<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#locationsCollapse" href="#locationsCollapse'+locationsArr[i].name+'" aria-expanded="true" aria-controls="locationsCollapse'+locationsArr[i].name+'">';
					}else{
						collapse+='<a role="button" class="collapsed panelCollapseIcon" data-toggle="collapse" data-parent="#locationsCollapse" href="#locationsCollapse'+locationsArr[i].name+'" aria-expanded="true" aria-controls="locationsCollapse'+locationsArr[i].name+'">';
					}
						collapse+='<h4 class="panel-title text-capital" style="color:#fff">'+locationsArr[i].name+' Wise Overview</h4>';
					collapse+='</a>';
				collapse+='</div>';
				if(i == 0){
					collapse+='<div id="locationsCollapse'+locationsArr[i].name+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="locationsCollapseHeading'+locationsArr[i].name+'">';
				}else{
					collapse+='<div id="locationsCollapse'+locationsArr[i].name+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="locationsCollapseHeading'+locationsArr[i].name+'">';
				}
				collapse+='<div class="panel-body">';
					if(locationsArr[i].name == 'mandal')	{
						collapse+='<div class="row margin_bottom">';
							//collapse+='<div class="col-sm-12">';
								collapse+='<div class="col-sm-2">';
									collapse+='<label>District</label>';
									collapse+='<select class="form-control chosen-select" id="districtId" style="margin-bottom: 10px;">';
									//collapse+='<option value ="0">All</option>';
									collapse+='</select>';
								collapse+='</div>';
							//collapse+='</div>';
						collapse+='</div>';
					}
					collapse+='<div id="'+locationsArr[i].name+'BlockId"></div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	}
	collapse+='</div>';
	$("#locationsData").html(collapse);
	$(".chosen-select").chosen();
	for(var i in locationsArr){
		getDistrictandMandalWiseConnectionDetails(locationsArr[i].name+"BlockId",locationsArr[i].name,0);		
	}
}

function getDistrictandMandalWiseConnectionDetails(blockId,locationType,locationId){ 
	$("#"+blockId).html(spinner);
	var json={
		blockId : blockId,
		locationType : locationType,
		locationId : locationId
	}
	$.ajax({
		type:'POST',
		url:'getDistrictandMandalWiseConnectionDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildDistrictandMandalWiseConnectionDetails(result,blockId,locationType);
		}else{
			$("#"+blockId).html("No Data Available");
		}
	})
}

function buildDistrictandMandalWiseConnectionDetails(result,blockId,locationType){
	var tableView = '';	
		tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered table_custom_fiberGrid dataTable'+blockId+'">';
			tableView+='<thead class="bg_ed ">';
				tableView+='<tr class="">';
					if(locationType == "mandal"){
						tableView+='<th class="">District name</th>';		
					}						
					tableView+='<th class="">'+locationType+' name</th>';							
					if(locationType == "district"){
						tableView+='<th class="">Connected Villages</th>';
						tableView+='<th class="">%</th>';
						tableView+='<th class="">Connected Towns</th>';
						//tableView+='<th class="">%</th>';
					}
					tableView+='<th class="">Total Connections</th>';
					tableView+='<th class="">Home Connections</th>';
					tableView+='<th class="">%</th>';
					tableView+='<th class="">Govt Commercial</th>';
					tableView+='<th class="">%</th>';
					tableView+='<th class="">Private Commercial</th>';
					tableView+='<th class="">%</th>'
				tableView+='</tr>';
			tableView+='</thead>';
			tableView+='<tbody>';
				for( var i in result){
					tableView+='<tr class="">';
						if(locationType == "district"){
							if( result[i].districtName != null){
								tableView+='<td class="f_15">'+result[i].districtName+'</td>';
							} else{
								tableView+='<td class="f_15 "> - </td>';
							}
						}else if( locationType == "mandal"){	
							if( result[i].districtName != null){
								tableView+='<td class="f_15" >'+result[i].districtName+'</td>';
							} else{
								tableView+='<td class="f_15 "> - </td>';
							}
							if( result[i].mandalName != null){
								tableView+='<td class="f_15 " style="text-align: left;!important">'+result[i].mandalName+'</td>';
							} else{
								tableView+='<td class="f_15 "> - </td>';
							}
						}
						if(locationType == "district"){
							if( result[i].connectedVillages != null && result[i].connectedVillages > 0){
								tableView+='<td class="f_15 ">'+result[i].connectedVillages+'</td>';
							} else{
								tableView+='<td class="f_15 "> - </td>';
							}
							if( result[i].conVillagesperc != null && result[i].conVillagesperc > 0){
								tableView+='<td class="f_15  good_color">'+result[i].conVillagesperc+'<small class="good_color">%</small></td>';
							} else{
								tableView+='<td class="f_15 "> - </td>';
							}
							if( result[i].connectedTowns!= null && result[i].connectedTowns > 0){
								tableView+='<td class="f_15 ">'+result[i].connectedTowns+'</td>';
							} else{
								tableView+='<td class="f_15 "> - </td>';
							}
							/* if( result[i].conTownsperc != null && result[i].conTownsperc > 0){
								tableView+='<td class="f_15  good_color">'+result[i].conTownsperc+'<small class="good_color">%</small></td>';
							} else{
								tableView+='<td class="f_15 "> - </td>';
							} */
						}						
						if( result[i].totConnections != null && result[i].totConnections > 0){
							tableView+='<td class="f_15">'+result[i].totConnections+'</td>';
						} else{
							tableView+='<td class="f_15 "> - </td>';
						}
						if( result[i].homeConnections != null && result[i].homeConnections > 0){
							tableView+='<td class="f_15 ">'+result[i].homeConnections+'</td>';
						} else{
							tableView+='<td class="f_15 "> - </td>';
						}
						if( result[i].homeConnectionsperc != null && result[i].homeConnectionsperc > 0){
							tableView+='<td class="f_15  good_color">'+result[i].homeConnectionsperc+'<small class="good_color">%</small></td>';
						} else{
							tableView+='<td class="f_15 "> - </td>';
						}
						if( result[i].govtCommConnections != null && result[i].govtCommConnections > 0){
							tableView+='<td class="f_15 ">'+result[i].govtCommConnections+'</td>';
						} else{
							tableView+='<td class="f_15 "> - </td>';
						}
						if( result[i].govtCommConnectionsperc != null && result[i].govtCommConnectionsperc > 0){
							tableView+='<td class="f_15 good_color">'+result[i].govtCommConnectionsperc+'<small class="good_color">%</small></td>';
						} else{
							tableView+='<td class="f_15 "> - </td>';
						}
						if( result[i].pvtCommConnections != null && result[i].pvtCommConnections > 0){
							tableView+='<td class="f_15 ">'+result[i].pvtCommConnections+'</td>';
						} else{
							tableView+='<td class="f_15 "> - </td>';
						}	
						if( result[i].pvtCommConnectionsperc != null && result[i].pvtCommConnectionsperc > 0){
							tableView+='<td class="f_15  good_color">'+result[i].pvtCommConnectionsperc+'<small class="good_color">%</small></td>';
						} else{
							tableView+='<td class="f_15 "> - </td>';
						}											
				tableView+='</tr>';
				}						
			tableView+='</tbody>';
		tableView+='</table>';
		tableView+='</div>';
		$("#"+blockId).html(tableView);
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
					title		: "FIBER GRID DASHBOARD",
					filename	:  blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
				},
				{
					extend		:'pdfHtml5',
					text		:'<i class="fa fa-file-pdf-o"></i>',
					titleAttr	:'PDF',
					title		: "FIBER GRID DASHBOARD",
					filename	: blockId+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					orientation	: "landscape",
					pageSize	: 'A3',
					customize	: function (doc) {
								doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
						}
				}
			]
		});
	
}
function getDistrictIdAndName(){ 
	$("#districtId").html(spinner);
	var json={
		
	}
	$.ajax({
		type:'POST',
		url:'getDistrictIdAndName',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildDistrictIdAndName(result);
		}else{
			$("#districtId").html("No Data Available");
		}
		
	})
}
function buildDistrictIdAndName(result){
	var str='';
	str+='<option value="0">All</option>';
	for(var  i in result){
		str+='<option value='+result[i].districtId+'>'+result[i].districtName+'</option>';
	}
	$("#districtId").html(str).chosen().trigger("chosen:updated");
}

$(document).on("change","#districtId",function(){
	var districtId = $(this).val();
	getDistrictandMandalWiseConnectionDetails("mandalBlockId","mandal",districtId);	
});
