var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var locationArr =[{name :"state",id:0},{name:"district",id:1},{name:"constituency",id:2},{name:"mandal",id:3},{name:"panchayat",id:4}];

var LWMObj=[{title: "Soak Pits - No.s (population < 2000)",subTitle:["Target","Achieved"]},{title: "Drains - Kms. (population b/w 2000 to 5000)",subTitle:["Target","Achieved"]},{title: "UGD - Kms.(population > 5000)",subTitle:["Target","Achieved"]}];
var SWMObj=[{title: "Rikshaw"},{title: "Power Auto"},{title: "Tractor"},{title: "shedders"},{title: "Incinerartors"},{title: "Pulverizer"},{title: "Bush Cutters "},{title: "Mechanized Sprayers"},{title: "Drain Cleaning Machines"}];


$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
$(document).on("click",".lwmDetailsCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type= $(this).attr("attr_type");
	var locationId= $(this).attr("attr_locationId");
	if(type == "gps"){
		$(".hhs_"+locationId+"Cls").hide();
		$(".gps_"+locationId+"Cls").show();
	}else if(type == "hhs"){
		$(".gps_"+locationId+"Cls").hide();
		$(".hhs_"+locationId+"Cls").show();
	}	
	
});

onloadCallsODFPlus();
function onloadCallsODFPlus(){	
	buildlevelWiseODFeDetails("odfPlus");
	getOdfPlusLevelWiseDetails("state",0);
}
function buildlevelWiseODFeDetails(divId){	
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
						if(locationArr[i].name != "panchayat"){
							collapse+='<div class="col-sm-12">';
								collapse+='<ul class="list-inline switch-btn lwmDetailsCls" role="tabCummulative">';
									collapse+='<li class="active" attr_type="gps" attr_locationId ="'+locationArr[i].id+'" style="font-size:12px !important;">GPs</li>';
									collapse+='<li attr_type="hhs"  attr_locationId ="'+locationArr[i].id+'" style="font-size:12px !important;">HHs</li>';															
								collapse+='</ul>';
							collapse+='</div>';
						}
							collapse+='<div class="col-sm-12 m_top10">'
								collapse+='<div id="'+divId.replace(/\s+/g, '')+''+locationArr[i].name+'Details"></div>';
								//console.log(divId.replace(/\s+/g, '')+''+locationArr[i].name+'Details');
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';		
	}
	$("#odfLocationWiseDetailsDivId").html(collapse);
}

function getOdfPlusLevelWiseDetails(locationType,locationId){
	if(locationType != null && locationType == "state")
		$("#odfOverviewDivId").html(spinner);
	
	//for(var i in locationArr){
		$("#odfPlus"+locationType+"Details").html(spinner);
	//}		
	var json={
		"location" : "State",
		"locationId" : "2",
		"type" : locationType
	}
	$.ajax({                
	type:'POST',    
	url: 'getOdfPlusLevelWiseDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			buildOdfPlusLevelWiseDetails(result,locationType,locationId);
			if(locationType != null && locationType == "state"){				
				buildOdfPlusOverView(result);
				for(var i in locationArr){
					if(locationArr[i].name != null && locationArr[i].name != "state")
						getOdfPlusLevelWiseDetails(locationArr[i].name,locationArr[i].id)
				}
			}
			
		}else{
			$("#odfOverviewDivId").html('NO DATA AVLABLE');
			//for(var i in locationArr){
				$("#odfPlus"+locationArr[i]+"Details").html('NO DATA AVLABLE');	
			//}
		}
	});
}
function buildOdfPlusOverView(result){	
	var soakPitGpsPerc= ((result.stateList[0].soakPitsAchievGpsCunt*100)/result.stateList[0].totalGpsCunt).toFixed(2);
	var soakPithhsPerc= ((result.stateList[0].soakPitsAchievHhsCunt*100)/result.stateList[0].totalHhsCunt).toFixed(2);
	var drainsGpsPerc= ((result.stateList[0].drainsAchievGpsCunt*100)/result.stateList[0].totalHhsCunt).toFixed(2);
	var drainshhsPerc= ((result.stateList[0].drainsAchievHhsCunt*100)/result.stateList[0].totalHhsCunt).toFixed(2);
	var ugdGpsPerc= ((result.stateList[0].ugdAchievGpsCunt*100)/result.stateList[0].totalHhsCunt).toFixed(2);
	var ugdGpshhsPerc= ((result.stateList[0].ugdAchievHhsCunt*100)/result.stateList[0].totalHhsCunt).toFixed(2);
	var str='';
	str+='<div class="box_shad5 pad_10">';			
		str+='<div class="row">';
			str+='<div class="col-sm-4">';
				str+='<h5 class="font_weight text-capital">ODF Plus Overview</h5>';
				str+='<div class="pad_10  m_top10 blue_block">';
					str+='<div class="row">';
						str+='<div class="col-sm-6 text-center">';
							str+='<h5 class="font_weight">Total GPs</h5>';
						if(result.totalGpsCunt != null && result.totalGpsCunt > 0){
							str+='<h4 class="font_weight m_top20" style="margin-bottom:13px !important;">'+result.totalGpsCunt+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top20" style="margin-bottom:13px !important;">-</h4>';
						}							
						str+='</div>';
						str+='<div class="col-sm-6 text-center">';
							str+='<h5 class="font_weight">ODF Plus GPs</h5>';
						if(result.totalGpsCunt != null && result.odfPlusGpsCount > 0){
							str+='<h4 class="font_weight m_top20" style="margin-bottom:13px !important;">'+result.odfPlusGpsCount+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top20" style="margin-bottom:13px !important;">-</h4>';
						}
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-8">';
				str+='<h5 class="font_weight text-capital">Liquid Waste Management Overview</h5>';
				str+='<div class="pad_10 m_top10 red_block">';
					str+='<div class="row">';
						str+='<div class="col-sm-4 text-center">';
							str+='<h5 class="font_weight">Soak Pits</h5>';
							str+='<div class="row">';
								str+='<div class="col-sm-6">';
								if(result.stateList[0].soakPitsAchievGpsCunt != null && result.stateList[0].soakPitsAchievGpsCunt > 0){
									str+='<h4 class="m_top15 font_weight">'+result.stateList[0].soakPitsAchievGpsCunt+'<small class=" m_left_5">'+soakPitGpsPerc+' %</small></h4>';
								}else{
									str+='<h4 class="m_top15 font_weight">-</h4>';
								}
									str+='<h6 class="m_top5 font_weight">GPs</h6>';
								str+='</div>';
								str+='<div class="col-sm-6">';
								if(result.stateList[0].soakPitsAchievHhsCunt != null && result.stateList[0].soakPitsAchievHhsCunt > 0){
									str+='<h4 class="m_top15 font_weight">'+result.stateList[0].soakPitsAchievHhsCunt+'<small class="m_left_5">'+soakPitGpsPerc+' %</small></h4>';
								}else{
									str+='<h4 class="m_top15 font_weight">-</h4>';
								}
									str+='<h6 class="m_top5 font_weight">HHs</h6>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-4 text-center">';
							str+='<div class="br_left" style="border-color: #ba0727;">';
								str+='<h5 class="font_weight">Drains</h5>';
								str+='<div class="row">';
									str+='<div class="col-sm-6">';
									if(result.stateList[0].drainsAchievGpsCunt != null && result.stateList[0].drainsAchievGpsCunt > 0){
										str+='<h4 class="m_top10 font_weight">'+result.stateList[0].drainsAchievGpsCunt+'<small class="m_left_5">'+drainsGpsPerc+' %</small></h4>';
									}else{
										str+='<h4 class="m_top15 font_weight">-</h4>';
									}
										str+='<h6 class="m_top5 font_weight">GPs</h6>';
									str+='</div>';
									str+='<div class="col-sm-6">';
									if(result.stateList[0].drainsAchievHhsCunt != null && result.stateList[0].drainsAchievHhsCunt > 0){
										str+='<h4 class="m_top10 font_weight">'+result.stateList[0].drainsAchievHhsCunt+'<small class="m_left_5">'+drainshhsPerc+' %</small></h4>';
									}else{
										str+='<h4 class="m_top15 font_weight">-</h4>';
									}
										str+='<h6 class="m_top5 font_weight">HHs</h6>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-4 text-center">';
							str+='<div class="br_left" style="border-color: #ba0727;">';
								str+='<h5 class="font_weight">UGD</h5>';
								str+='<div class="row">';
									str+='<div class="col-sm-6">';
									if(result.stateList[0].ugdAchievGpsCunt != null && result.stateList[0].ugdAchievGpsCunt > 0){
										str+='<h4 class="m_top15 font_weight">'+result.stateList[0].ugdAchievGpsCunt+'<small class="m_left_5">'+ugdGpsPerc+' %</small></h4>';
									}else{
										str+='<h4 class="m_top15 font_weight">-</h4>';
									}
										str+='<h6 class="m_top5 font_weight">GPs</h6>';
									str+='</div>';
									str+='<div class="col-sm-6">';
									if(result.stateList[0].ugdAchievHhsCunt != null && result.stateList[0].ugdAchievHhsCunt > 0){
										str+='<h4 class="m_top15 font_weight">'+result.stateList[0].ugdAchievHhsCunt+'<small class="m_left_5">'+ugdGpshhsPerc+' %</small></h4>';
									}else{
										str+='<h4 class="m_top15 font_weight">-</h4>';
									}
										str+='<h6 class="m_top5 font_weight">HHs</h6>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';	
				str+='</div>';	
			str+='</div>';			
		str+='</div>';			
	str+='</div>';
	$("#odfOverviewDivId").html(str);
}
function buildOdfPlusLevelWiseDetails(result,locationType,locationId){
	var resultObj=result.stateList;	
	var str='';
	str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC" id="odfDatatable_'+locationType+'" style="width:100%;border:1px solid lightgrey !important;">';
				str+='<thead style="background-color: #f2f2f2 !important;">';
				if(locationType != "panchayat"){
						str+='<tr>';
						if(locationType != null && locationType =="state"){
							str+='<th rowspan="3">'+locationType+'</th>';
						}
						if(locationType != null && locationType !="state"){
							str+='<th rowspan="3">District</th>';						
						}
						if(locationType != null && locationType !="district" && locationType != "state"){
							str+='<th rowspan="3">Constituency</th>';						
						} 
						if(locationType != null && (locationType =="mandal")){
							str+='<th rowspan="3">Mandal</th>';						
						}
							str+='<th rowspan="3">Total GPs</th>';
							str+='<th rowspan="3">Total HHs</th>';
							str+='<th rowspan="3">ODF Plus GPs</th>';
							str+='<th colspan="6" class="bg_LWM">Liquid Waste Management</th>';								
							str+='<th colspan="18" class="bg_SWM">Solid Waste Machinery</th>';								
						str+='</tr>';
						str+='<tr>';
							for(var i in LWMObj){
								str+='<th colspan="2" class="bg_LWM">'+LWMObj[i].title+'</th>';
							}
							for(var i in SWMObj){
								str+='<th colspan="2" class="bg_SWM">'+SWMObj[i].title+'</th>';
							}
						str+='</tr>';
						str+='<tr>';
						for(var i in LWMObj){
							str+='<th class="bg_LWM gps_'+locationId+'Cls">Target GPs</th>';
							str+='<th class="bg_LWM hhs_'+locationId+'Cls" style="display: none;">Target HHs</th>';
							str+='<th class="bg_LWM gps_'+locationId+'Cls">Achieved GPs</th>';
							str+='<th class="bg_LWM hhs_'+locationId+'Cls" style="display: none;">Achieved HHs</th>';
						}
							for(var i in SWMObj){
								str+='<th class="bg_SWM">Required </th>';
								str+='<th class="bg_SWM">Achieved </th>';
							}
						str+='</tr>';
						/*str+='<tr>';
							for(var i in LWMObj){
								for(var j in LWMObj[i].subTitle){
									str+='<th class="bg_LWM gps_'+locationId+'Cls">GPs</th>';									
									str+='<th class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">HHs</th>';									
								}
							}
						str+='</tr>';*/
					}else{
						str+='<tr>';
							str+='<th rowspan="3">District</th>';
							str+='<th rowspan="3">Constituency</th>';
							str+='<th rowspan="3">Mandal</th>';	
							str+='<th rowspan="3">Panchayat</th>';							
							str+='<th rowspan="3">ODF Plus</th>';
							str+='<th colspan="5" class="bg_LWM">Liquid Waste Management</th>';								
							str+='<th colspan="18" class="bg_SWM">Solid Waste Machinery</th>';
						str+='</tr>';
						str+='<tr>';
							str+='<th rowspan="2" class="bg_LWM">Total HHs</th>';
							str+='<th rowspan="2" class="bg_LWM">Population</th>';
							str+='<th rowspan="2" class="bg_LWM">Soak Pits - No.s</th>';
							str+='<th rowspan="2" class="bg_LWM">Drains - Kms.</th>';
							str+='<th rowspan="2" class="bg_LWM">UGD - Kms.</th>';
							for(var i in SWMObj){
								str+='<th colspan="2" class="bg_SWM">'+SWMObj[i].title+'</th>';
							}
						str+='</tr>';
						str+='<tr>';						
							for(var i in SWMObj){
								str+='<th class="bg_SWM">Required </th>';
								str+='<th class="bg_SWM">Achieved </th>';
							}
						str+='</tr>';
					}					
				str+='</thead>';
				str+='<tbody>';
				if(locationType =="state"){
					resultObj = result.stateList;
				}else if(locationType =="district"){
					resultObj = result.districtList;
				}else if(locationType =="constituency"){
					resultObj = result.constituencyList;
				}else if(locationType =="mandal"){
					resultObj = result.mandalList;
				}else if(locationType =="panchayat"){
					resultObj = result.panchayatList;
				}
				for(var i in resultObj){
					str+='<tr>';
						if(locationType != null && locationType =="state"){
							str+='<td style="text-align:left !important">Andhra Pradesh</td>';
						}
						if(locationType != null && locationType =="district"){
							if(resultObj[i].locationName != null && typeof(resultObj[i].locationName) !== "undefined"){
								str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].locationName+'</td>';	
							}else{
								str+='<td>-</td>';	
							}											
						}
						if(locationType != null && locationType == "constituency"){
							if(resultObj[i].districtName != null && typeof(resultObj[i].districtName) !== "undefined"){
									str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].districtName+'</td>';	
								}else{
									str+='<td>-</td>';	
								}					
								if(resultObj[i].locationName != null && typeof(resultObj[i].locationName) !== "undefined"){
									str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].locationName+'</td>';	
								}else{
									str+='<td>-</td>';	
								}											
						} 
						if(locationType != null && locationType =="mandal"){
							if(resultObj[i].districtName != null && typeof(resultObj[i].districtName) !== "undefined"){
									str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].districtName+'</td>';	
								}else{
									str+='<td>-</td>';	
								}				
							if(resultObj[i].assemblyName != null && typeof(resultObj[i].assemblyName) !== "undefined"){
									str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].assemblyName+'</td>';	
								}else{
									str+='<td>-</td>';	
								}			
								if(resultObj[i].locationName != null && typeof(resultObj[i].locationName) !== "undefined"){
									str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].locationName+'</td>';	
								}else{
									str+='<td>-</td>';	
								}											
						}
						if(locationType != null && locationType == "panchayat"){
							if(resultObj[i].districtName != null && typeof(resultObj[i].districtName) !== "undefined"){
									str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].districtName+'</td>';	
								}else{
									str+='<td>-</td>';	
								}				
							if(resultObj[i].assemblyName != null && typeof(resultObj[i].assemblyName) !== "undefined"){
									str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].assemblyName+'</td>';	
								}else{
									str+='<td>-</td>';	
								}			
							if(resultObj[i].mandalName != null && typeof(resultObj[i].mandalName) !== "undefined"){
									str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].mandalName+'</td>';	
								}else{
									str+='<td>-</td>';	
								}
							if(resultObj[i].locationName != null && typeof(resultObj[i].locationName) !== "undefined"){
								str+='<td class="odf_FixedCol" style="text-align:left !important">'+resultObj[i].locationName+'</td>';	
							}else{
								str+='<td>-</td>';	
							}											
													
						}
						if(locationType != "panchayat"){
							if(resultObj[i].totalGpsCunt != null && resultObj[i].totalGpsCunt > 0){
								str+='<td>'+resultObj[i].totalGpsCunt+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(resultObj[i].totalHhsCunt != null && resultObj[i].totalHhsCunt > 0){
								str+='<td>'+resultObj[i].totalHhsCunt+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(resultObj[i].odfPlusGpsCount != null && resultObj[i].odfPlusGpsCount > 0){
								str+='<td>'+resultObj[i].odfPlusGpsCount+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(resultObj[i].soakPitsTargetGpsCunt != null && resultObj[i].soakPitsTargetGpsCunt > 0){
								str+='<td class="bg_LWM gps_'+locationId+'Cls">'+resultObj[i].soakPitsTargetGpsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM gps_'+locationId+'Cls">-</td>';
							}
							if(resultObj[i].soakPitsTargetHhsCunt != null && resultObj[i].soakPitsTargetHhsCunt > 0){
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">'+resultObj[i].soakPitsTargetHhsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">-</td>';
							} 
							if(resultObj[i].soakPitsAchievGpsCunt != null && resultObj[i].soakPitsAchievGpsCunt > 0){
								str+='<td class="bg_LWM gps_'+locationId+'Cls">'+resultObj[i].soakPitsAchievGpsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM gps_'+locationId+'Cls">-</td>';
							}
							if(resultObj[i].soakPitsAchievHhsCunt != null && resultObj[i].soakPitsAchievHhsCunt > 0){
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">'+resultObj[i].soakPitsAchievHhsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">-</td>';
							}
							if(resultObj[i].drainsTargetGpsCunt != null && resultObj[i].drainsTargetGpsCunt > 0){
								str+='<td class="bg_LWM gps_'+locationId+'Cls">'+resultObj[i].drainsTargetGpsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM gps_'+locationId+'Cls">-</td>';
							}
							if(resultObj[i].drainsTargetHhsCunt != null && resultObj[i].drainsTargetHhsCunt > 0){
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">'+resultObj[i].drainsTargetHhsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">-</td>';
							}
							if(resultObj[i].drainsAchievGpsCunt != null && resultObj[i].drainsAchievGpsCunt > 0){
								str+='<td class="bg_LWM gps_'+locationId+'Cls">'+resultObj[i].drainsAchievGpsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM gps_'+locationId+'Cls">-</td>';
							}
							if(resultObj[i].drainsAchievHhsCunt != null && resultObj[i].drainsAchievHhsCunt > 0){
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">'+resultObj[i].drainsAchievHhsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">-</td>';
							} 
							if(resultObj[i].ugdTargetGpsCunt != null && resultObj[i].ugdTargetGpsCunt > 0){
								str+='<td class="bg_LWM gps_'+locationId+'Cls">'+resultObj[i].ugdTargetGpsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM gps_'+locationId+'Cls">-</td>';
							}
							if(resultObj[i].ugdTargetHhsCunt != null && resultObj[i].ugdTargetHhsCunt > 0){
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">'+resultObj[i].ugdTargetHhsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">-</td>';
							} 
							if(resultObj[i].ugdAchievGpsCunt != null && resultObj[i].ugdAchievGpsCunt > 0){
								str+='<td class="bg_LWM gps_'+locationId+'Cls">'+resultObj[i].ugdAchievGpsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM gps_'+locationId+'Cls">-</td>';
							}
							if(resultObj[i].ugdAchievHhsCunt != null && resultObj[i].ugdAchievHhsCunt > 0){
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">'+resultObj[i].ugdAchievHhsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM hhs_'+locationId+'Cls" style="display:none;">-</td>';
							}							
						}else{ 
							if(resultObj[i].odfPlusGpStatus != null && typeof(resultObj[i].odfPlusGpStatus) !== "undefined"){
								str+='<td>'+resultObj[i].odfPlusGpStatus+'</td>';	
							}else{
								str+='<td>-</td>';	
							}
							if(resultObj[i].totalHhsCunt != null && resultObj[i].totalHhsCunt > 0){
								str+='<td class="bg_LWM">'+resultObj[i].totalHhsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM">-</td>';
							}
							if(resultObj[i].populationCunt != null && resultObj[i].populationCunt > 0){
								str+='<td class="bg_LWM">'+resultObj[i].populationCunt+'</td>';
							}else{
								str+='<td class="bg_LWM">-</td>';
							}
							if(resultObj[i].soakPitsCut != null && resultObj[i].soakPitsCut > 0){
								str+='<td class="bg_LWM">'+resultObj[i].soakPitsCut+'</td>';
							}else{
								str+='<td class="bg_LWM">-</td>';
							}
							if(resultObj[i].drainsCunt != null && resultObj[i].drainsCunt > 0){
								str+='<td class="bg_LWM">'+resultObj[i].drainsCunt+'</td>';
							}else{
								str+='<td class="bg_LWM">-</td>';
							}
							if(resultObj[i].ugdCunt != null && resultObj[i].ugdCunt > 0){
								str+='<td class="bg_LWM">'+resultObj[i].ugdCunt+'</td>';
							}else{
								str+='<td class="bg_LWM">-</td>';
							}
						}
						if(resultObj[i].rikshawReqCunt != null && resultObj[i].rikshawReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].rikshawReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].rikshawAchiedCunt != null && resultObj[i].rikshawAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].rikshawAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].powerAutoReqCunt != null && resultObj[i].powerAutoReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].powerAutoReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].powerAutoAchiedCunt != null && resultObj[i].powerAutoAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].powerAutoAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].tractorReqCunt != null && resultObj[i].tractorReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].tractorReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].tractorAchiedCunt != null && resultObj[i].tractorAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].tractorAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].sheddersReqCunt != null && resultObj[i].sheddersReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].sheddersReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].sheddersAchiedCunt != null && resultObj[i].sheddersAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].sheddersAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].incinerartorsReqCunt != null && resultObj[i].incinerartorsReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].incinerartorsReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].incinerartorsAchiedCunt != null && resultObj[i].incinerartorsAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].incinerartorsAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].pulverizerReqCunt != null && resultObj[i].pulverizerReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].pulverizerReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].pulverizerAchiedCunt != null && resultObj[i].pulverizerAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].pulverizerAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].bushCuttersReqCunt != null && resultObj[i].bushCuttersReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].bushCuttersReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].bushCuttersAchiedCunt != null && resultObj[i].bushCuttersAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].bushCuttersAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].sprayersReqCunt != null && resultObj[i].sprayersReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].sprayersReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].sprayersAchiedCunt != null && resultObj[i].sprayersAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].sprayersAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].draincleanMacReqCunt != null && resultObj[i].draincleanMacReqCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].draincleanMacReqCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
						if(resultObj[i].draincleanMacAchiedCunt != null && resultObj[i].draincleanMacAchiedCunt > 0){
							str+='<td class="bg_SWM">'+resultObj[i].draincleanMacAchiedCunt+'</td>';
						}else{
							str+='<td class="bg_SWM">-</td>';
						}
					str+='</tr>';
				}				
				str+='</tbody>';					
			str+='</table>';
		str+='</div>';		
	$("#odfPlus"+locationType+"Details").html(str);		
	if(locationType != "state"){
		$(".odfPlus"+""+locationType).trigger("click");
		 $("#odfDatatable_"+locationType).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],
			"scrollX":        true,		
			"scrollCollapse": true,		
			"fixedColumns":   {
				"leftColumns": locationId,
			},
			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "odfPlus",
					filename:  'odfPlus'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		}); 			
		$(".DTFC_LeftBodyLiner").css({
			"overflow-x":"hidden",
			"overflow-y":"hidden",
			"top": "-11px"
		});	 	 
		setTimeout(function(){ 
			$(".odfPlus"+""+locationType).trigger("click");	
		}, 500);
		
	}
	
}
