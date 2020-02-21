
var globalMapBlockValue=0;
var globalBenefitName='';
var globalMapPartyId='';
var globalMapEditionId='';
var globalComponentId='';
var globalSubComponentId='';
var mapNewsPaperIds = "";
var  mapPresent="";
var mapPast="";

var  mapPresentC="";
var mapPastC="";

var  mapPresentP="";
var mapPastP="";

function blockMapTypeWiseCalls(blockValue){
	globalMapBlockValue = blockValue;
	printMediaAjaxDistrictCalls(blockValue,"all");
	
}


function printMediaAjaxDistrictCalls(blockValue,durationVal){
		
		globalBenefitName='';
		globalMapPartyId='';
		globalMapEditionId='';
		globalComponentId='';
		globalSubComponentId='';
		mapNewsPaperIds = "";
		
		globalComponentId = $("#componentNameId").val();
		globalSubComponentId =$("#subComponentNameId option:selected").attr("attr_value");
		
		var MapbenefitId = $("#mapBenefitId").val();
		globalMapPartyId = $("#mapPartyId").val();
		globalMapEditionId = $("#mapEditionId").val();
		
		if(MapbenefitId == 1){
			globalBenefitName = "positive"
		}else{
			globalBenefitName = "negative"
		}
		if(blockValue == 0){
			mapNewsPaperIds = "2,3,5,8,1";
		}else{
			mapNewsPaperIds=blockValue;
		}
		
		var componentNameText = $("#componentNameId option:selected").text();
		$("#mapHeadingId").html("District Wise "+componentNameText+ " Details");
		
		var districtInputParamsPresent = {"fromDateStr":mapPresentCustomStartDate,"toDateStr":mapPresentCustomEndDate,"locationId":2,"locationValue":1,"papersIdString":mapNewsPaperIds,"editionTypeId":globalMapEditionId,"locType":"district","partyId":globalMapPartyId,"type":globalBenefitName,"mapComponentId":globalComponentId,"mapSubComponentId":globalSubComponentId}
		
		var districtInputParamsPast = {"fromDateStr":mapPastCustomStartDate,"toDateStr":mapPastCustomEndDate,"locationId":2,"locationValue":1,"papersIdString":mapNewsPaperIds,"editionTypeId":globalMapEditionId,"locType":"district","partyId":globalMapPartyId,"type":globalBenefitName,"mapComponentId":globalComponentId,"mapSubComponentId":globalSubComponentId}
		
		if(durationVal == "presentDuration"){
			printMediaMapDetailsCall("blockWiseMapDistrictPresentDivId",districtInputParamsPresent,"district","present",durationVal);
		}else if(durationVal == "pastDuration"){
			printMediaMapDetailsCall("blockWiseMapDistrictPastDivId",districtInputParamsPast,"district","past",durationVal);
		}else{
			printMediaMapDetailsCall("blockWiseMapDistrictPresentDivId",districtInputParamsPresent,"district","present",durationVal);
			printMediaMapDetailsCall("blockWiseMapDistrictPastDivId",districtInputParamsPast,"district","past",durationVal);
		}
		
}
	
function printMediaAjaxConstituencyCalls(blockValue,durationVal){
		
		globalBenefitName='';
		globalMapPartyId='';
		globalMapEditionId='';
		globalComponentId='';
		globalSubComponentId='';
		mapNewsPaperIds = "";
		
		globalComponentId = $("#componentNameId").val();
		globalSubComponentId =$("#subComponentNameId option:selected").attr("attr_value");
		
		var MapbenefitId = $("#mapBenefitId").val();
		globalMapPartyId = $("#mapPartyId").val();
		globalMapEditionId = $("#mapEditionId").val();
		
		if(MapbenefitId == 1){
			globalBenefitName = "positive"
		}else{
			globalBenefitName = "negative"
		}
		
		if(blockValue == 0){
			mapNewsPaperIds = "2,3,5,8,1";
		}else{
			mapNewsPaperIds=blockValue;
		}
		
		var componentNameText = $("#componentNameId option:selected").text();
		$("#mapHeadingId").html("Constituency Wise "+componentNameText+ " Details");
		
		
		
		var constituencyInputParamsPresent = {"fromDateStr":mapPresentCustomStartDate,"toDateStr":mapPresentCustomEndDate,"locationId":2,"locationValue":1,"papersIdString":mapNewsPaperIds,"editionTypeId":globalMapEditionId,"locType":"constituency","partyId":globalMapPartyId,"type":globalBenefitName,"mapComponentId":globalComponentId,"mapSubComponentId":globalSubComponentId}
		
		var constituencyInputParamsPast = {"fromDateStr":mapPastCustomStartDate,"toDateStr":mapPastCustomEndDate,"locationId":2,"locationValue":1,"papersIdString":mapNewsPaperIds,"editionTypeId":globalMapEditionId,"locType":"constituency","partyId":globalMapPartyId,"type":globalBenefitName,"mapComponentId":globalComponentId,"mapSubComponentId":globalSubComponentId}
		
		
		if(durationVal == "presentDuration"){
			printMediaMapDetailsCall("blockWiseMapConstituencyPresentDivId",constituencyInputParamsPresent,"constituency","present",durationVal);
		}else if(durationVal == "pastDuration"){
			printMediaMapDetailsCall("blockWiseMapConstituencyPastDivId",constituencyInputParamsPast,"constituency","past",durationVal);
		}else{
			printMediaMapDetailsCall("blockWiseMapConstituencyPresentDivId",constituencyInputParamsPresent,"constituency","present",durationVal);
			printMediaMapDetailsCall("blockWiseMapConstituencyPastDivId",constituencyInputParamsPast,"constituency","past",durationVal);
		}
				
}

function printMediaAjaxParliamentCalls(blockValue,durationVal){
		
		globalBenefitName='';
		globalMapPartyId='';
		globalMapEditionId='';
		globalComponentId='';
		globalSubComponentId='';
		mapNewsPaperIds = "";
		
		globalComponentId = $("#componentNameId").val();
		globalSubComponentId =$("#subComponentNameId option:selected").attr("attr_value");
		
		var MapbenefitId = $("#mapBenefitId").val();
		globalMapPartyId = $("#mapPartyId").val();
		globalMapEditionId = $("#mapEditionId").val();
		
		if(MapbenefitId == 1){
			globalBenefitName = "positive"
		}else{
			globalBenefitName = "negative"
		}
		
		
		if(blockValue == 0){
			mapNewsPaperIds = "2,3,5,8,1";
		}else{
			mapNewsPaperIds=blockValue;
		}
		
		var componentNameText = $("#componentNameId option:selected").text();
		$("#mapHeadingId").html("Parliament Wise "+componentNameText+ " Details");
		
		
		
		
		var parliamentInputParamsPresent = {"fromDateStr":mapPresentCustomStartDate,"toDateStr":mapPresentCustomEndDate,"locationId":2,"locationValue":1,"papersIdString":mapNewsPaperIds,"editionTypeId":globalMapEditionId,"locType":"parliament","partyId":globalMapPartyId,"type":globalBenefitName,"mapComponentId":globalComponentId,"mapSubComponentId":globalSubComponentId}
		
		var parliamentInputParamsPast = {"fromDateStr":mapPastCustomStartDate,"toDateStr":mapPastCustomEndDate,"locationId":2,"locationValue":1,"papersIdString":mapNewsPaperIds,"editionTypeId":globalMapEditionId,"locType":"parliament","partyId":globalMapPartyId,"type":globalBenefitName,"mapComponentId":globalComponentId,"mapSubComponentId":globalSubComponentId}
		
		if(durationVal == "presentDuration"){
			printMediaMapDetailsCall("blockWiseMapParliamentPresentDivId",parliamentInputParamsPresent,"parliament","present",durationVal);
		}else if(durationVal == "pastDuration"){
			printMediaMapDetailsCall("blockWiseMapParliamentPastDivId",parliamentInputParamsPast,"parliament","past",durationVal);
		}else{
			printMediaMapDetailsCall("blockWiseMapParliamentPresentDivId",parliamentInputParamsPresent,"parliament","present",durationVal);
			printMediaMapDetailsCall("blockWiseMapParliamentPastDivId",parliamentInputParamsPast,"parliament","past",durationVal);
		}
		
		
}	
	
function printMediaMapDetailsCall(mapDivId,inputParams,levelTypeBuild,presentPastVal,durationVal){
	$("#"+mapDivId).html(spinner);
	
	var json = inputParams
	
	$.ajax({
		url: "getNewsMapWisePartyCounts",
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(response) {
			$("#"+mapDivId).html('');
			
			if(response !=null && response.length>0){
				if(levelTypeBuild == "district"){
					if(presentPastVal == "present"){
						mapPresent = L.map('blockWiseMapDistrictPresentDivId', { center: [16.211306, 80.479963], zoom: 6.5 });
						plotLayeronMapPresentDistrict(mapPresent,response,levelTypeBuild);
					}else if(presentPastVal == "past"){
						mapPast = L.map('blockWiseMapDistrictPastDivId', { center: [16.211306, 80.479963], zoom: 6.5 });
						plotLayeronMapPastDistrict(mapPast,response,levelTypeBuild);
					}
				}else if(levelTypeBuild == "constituency"){
					if(presentPastVal == "present"){
						mapPresentC = L.map('blockWiseMapConstituencyPresentDivId', { center: [16.211306, 80.479963], zoom: 6.5 });
						plotLayeronMapPresentConstituency(mapPresentC,response,levelTypeBuild);
					}else if(presentPastVal == "past"){
						mapPastC = L.map('blockWiseMapConstituencyPastDivId', { center: [16.211306, 80.479963], zoom: 6.5 });
						plotLayeronMapPastConstituency(mapPastC,response,levelTypeBuild);
					}
				}else if(levelTypeBuild == "parliament"){
					if(presentPastVal == "present"){
						mapPresentP = L.map('blockWiseMapParliamentPresentDivId', { center: [16.211306, 80.479963], zoom: 6.5 });
						plotLayeronMapPresentParliament(mapPresentP,response,levelTypeBuild);
					}else if(presentPastVal == "past"){
						mapPastP = L.map('blockWiseMapParliamentPastDivId', { center: [16.211306, 80.479963], zoom: 6.5 });
						plotLayeronMapPastParliament(mapPastP,response,levelTypeBuild);
					}
				}
				//90-100:DARKGREEN 70-89.99:GREEN 50-69.99:LIGHTGREEN 35-49.99:ORANGE 0-34.99:RED 
				var rangeBuild='';
				var rangeColorObj={'DARKGREEN':'#28A745','GREEN':'#109800','LIGHTGREEN':'#16D400','ORANGE':'#FBAA07','RED':'#FF2020','PINK':'#FF61EA','DARKRED':'#FF2020'};
				rangeBuild+='<ul class="list-inline basic_list_type m_bottom_0 float-right" style="position: relative;top: 8px;">';
					    var overAllRage = response[0].overallRange.split(" ");
						
						var range0 = overAllRage[0];
						var range1 = overAllRage[1];
						var range2 = overAllRage[2];
						var range3 = overAllRage[3];
						var range4 = overAllRage[4];
						
						var range0Split = overAllRage[0].split(":");
						var range1Split = overAllRage[1].split(":");
						var range2Split = overAllRage[2].split(":");
						var range3Split = overAllRage[3].split(":");
						var range4Split = overAllRage[4].split(":");
						
						rangeBuild+='<li>';
							rangeBuild+='<p><span class="debates_border" style="background-color:'+rangeColorObj[range0Split[1]]+'"></span> '+range0Split[0]+' </p>';
						rangeBuild+='</li>';
						rangeBuild+='<li>';	
							rangeBuild+='<p><span class="debates_border" style="background-color:'+rangeColorObj[range1Split[1]]+'"></span> '+range1Split[0]+' </p>';
						rangeBuild+='</li>';	
						rangeBuild+='<li>';	
							rangeBuild+='<p><span class="debates_border" style="background-color:'+rangeColorObj[range2Split[1]]+'"></span> '+range2Split[0]+' </p>';
						rangeBuild+='</li>';
						rangeBuild+='<li>';	
							rangeBuild+='<p><span class="debates_border" style="background-color:'+rangeColorObj[range3Split[1]]+'"></span> '+range3Split[0]+' </p>';
						rangeBuild+='</li>';
						rangeBuild+='<li>';	
							rangeBuild+='<p><span class="debates_border" style="background-color:'+rangeColorObj[range4Split[1]]+'"></span> '+range4Split[0]+' </p>';
						rangeBuild+='</li>';							
				rangeBuild+='</ul>';
				$("#rangeBuildMapId").html(rangeBuild)
			
			}else{
				$("#"+mapDivId).html("No Data Available");
			}
		},
		failure: function(xhr) {
			return xhr;
		}
	}); 
		
	
	
}

function callMaps(type,blockValue,durationVal){
	var componentId = $("#componentNameId").val();
	var subComponentId = $("#subComponentNameId").val();
	var partyId = $("#mapPartyId").val();
	var benefitId = $("#mapBenefitId").val();
	var editionId = $("#mapEditionId").val();
	
	if(componentId == 0){
		alert("Please Select Component");
		return;
	}
	if(subComponentId == 'select'){
		alert("Please Select Sub Component");
		return;
	}
	if(partyId == 0){
		alert("Please Select Party");
		return;
	}
	if(benefitId == 0){
		alert("Please Select Benefit Name");
		return;
	}
	
	if(type == "district"){
		if(durationVal == "all"){
			if(mapPresent != null && mapPresent != ""){
				mapPresent.remove();
			}
			if(mapPast != null && mapPast != ""){
				mapPast.remove();
			}
		}else if(durationVal == "presentDuration"){
			if(mapPresent != null && mapPresent != ""){
				mapPresent.remove();
			}
		}else if(durationVal == "pastDuration"){
			if(mapPast != null && mapPast != ""){
				mapPast.remove();
			}
		}
		printMediaAjaxDistrictCalls(blockValue,durationVal);
		$(".districtMapCls").show()
		$(".constituencyMapCls").hide()
		$(".parliamentMapCls").hide()
		
	}else if(type == "constituency"){
		if(durationVal == "all"){
			if(mapPresentC != null && mapPresentC != ""){
				mapPresentC.remove();
			}
			if(mapPastC != null && mapPastC != ""){
				mapPastC.remove();
			}
		}else if(durationVal == "presentDuration"){
			if(mapPresentC != null && mapPresentC != ""){
				mapPresentC.remove();
			}
		}else if(durationVal == "pastDuration"){
			if(mapPastC != null && mapPastC != ""){
				mapPastC.remove();
			}
		}
		printMediaAjaxConstituencyCalls(blockValue,durationVal);
		$(".constituencyMapCls").show()
		$(".districtMapCls").hide()
		$(".parliamentMapCls").hide()
	
	}else if(type == "parliament"){
		if(durationVal == "all"){
			if(mapPresentP != null && mapPresentP != ""){
				mapPresentP.remove();
			}
			if(mapPastP != null && mapPastP != ""){
				mapPastP.remove();
			}
		}else if(durationVal == "presentDuration"){
			if(mapPresentP != null && mapPresentP != ""){
				mapPresentP.remove();
			}
		}else if(durationVal == "pastDuration"){
			if(mapPastP != null && mapPastP != ""){
				mapPastP.remove();
			}
		}
		
		printMediaAjaxParliamentCalls(blockValue,durationVal);
		$(".parliamentMapCls").show()
		$(".districtMapCls").hide()
		$(".constituencyMapCls").hide()
	}
	
}

$(document).on("click",".mapLevelCss li",function(e){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	
	var type = $(this).attr("attr_type");
	var blockvalue = $(this).attr("attr_block_value");
	var componentNameText = $("#componentNameId option:selected").text();
	$("#mapHeadingId").html(type+" Wise "+componentNameText+ " Details");
	
	callMaps(type,blockvalue,"all");
	
	
});	

$(document).on("click",".getSelectionWiseMapDetailsCls",function(e){
	var type="";
	$('.mapLevelCss li').each(function () {
		if($(this).hasClass("active")){
			type = $(this).attr("attr_type");
		}
	});
	$(".mapLevelCss li").removeClass("active");
	$(".mapLevelCss li:nth-child(1)").addClass("active");
	
	if(mapPresentC != null && mapPresentC != ""){
		mapPresentC.remove();
	}
	if(mapPastC != null && mapPastC != ""){
		mapPastC.remove();
	}
	
	if(mapPresentP != null && mapPresentP != ""){
		mapPresentP.remove();
	}
	if(mapPastP != null && mapPastP != ""){
		mapPastP.remove();
	}
	
	
	if(mapPresent != null && mapPresent != ""){
		mapPresent.remove();
	}
	if(mapPast != null && mapPast != ""){
		mapPast.remove();
	}
	
	$(".districtMapCls").show()
	$(".constituencyMapCls").hide()
	$(".parliamentMapCls").hide()
	printMediaAjaxDistrictCalls(globalMapBlockValue,"all");
	
});	

function plotLayeronMapPresentDistrict(mapPresent,response,levelTypeBuild) {
		
		mapPresent.eachLayer(function (layerGroup) {
			mapPresent.removeLayer(layerGroup);
		});
		var featureLayer = new L.GeoJSON();
		var onEachFeature = function (feature, layer) {
			//var statusColorObj={'11':'#ef4747','12':'#ef4747','14':'#ef4747','15':'#ef4747','17':'#ef4747','16':'#E8C8C7','19':'#E8C8C7','18':'#E8C8C7','21':'#20b25d','20':'#20b25d','23':'#ff0000','22':'#ff0000','517':'#5ae2a3'};
			//console.log(feature.properties.id)
			var colorObj='';
			 for (var i in response) {
				   if (response[i].organizationId == feature.properties.id) {
					   colorObj = response[i].mapColorCode;
				   }
			 }
			 //console.log(colorObj)
			layer.setStyle({ color: colorObj, fillOpacity: 0.7,weight: 1});
			var label = L.marker(layer.getBounds().getCenter(), {
				icon: L.divIcon({
					className: 'm1y-div-icon',
					html: layer.feature.properties.district,
					iconSize: [65,25]
				})
			}).addTo(mapPresent);
			
			
			if (feature.properties && feature.properties.district) {
				layer.on("mouseover", function (e) {
                    layer.bindPopup(feature.properties.district,{closeButton: true, offset: L.point(0, -10) });
                   
                    for (var i in response) {
                       if (response[i].organizationId == e.target.feature.properties.id) {
							
							var districtName = response[i].organization;
							var count = response[i].positiveCountMain;
							var percentage = response[i].positivePerc;
							
                            var tbl = "<span>"+districtName+" - <span class='font_weight'>"+count+" (<span class='font_weight'>"+percentage+" %</span>)</span></span>";
							
							layer.openPopup().bindPopup(tbl).addTo(mapPresent);
							
							
                        }
                    }

                });
				layer.on('mouseout', function(e) { 
						layer.bindPopup(feature.properties.district,{closeButton: true, offset: L.point(0, -10) });
                   
						for (var i in response) {
						   if (response[i].organizationId == e.target.feature.properties.id) {
								
								var districtName = response[i].organization;
								var count = response[i].positiveCountMain;
								var percentage = response[i].positivePerc;
								
								var tbl = "<span>"+districtName+" - <span class='font_weight'>"+count+" (<span class='font_weight'>"+percentage+" %</span>)</span></span>";
								
								layer.closePopup().bindPopup(tbl).addTo(mapPresent);
								
								
							}
						}
					
				});
				
				
			}
		  
		};
		var featureLayer = L.geoJson(Distboundary, {
			 onEachFeature: onEachFeature
		})
		
		//    .bindTooltip(function (layer) {
		//    return layer.feature.properties.district // Needs to be a string
		//}) //, {permanent: true, opacity: 0.5};
		// Finally, add the layer to the map.
		mapPresent.addLayer(featureLayer);
	
}


function plotLayeronMapPastDistrict(mapPast,response,levelTypeBuild) {
	
		mapPast.eachLayer(function (layerGroup) {
			mapPast.removeLayer(layerGroup);
		});
		var featureLayer = new L.GeoJSON();
		var onEachFeature = function (feature, layer) {
			//var statusColorObj={'11':'#ef4747','12':'#ef4747','14':'#ef4747','15':'#ef4747','17':'#ef4747','16':'#E8C8C7','19':'#E8C8C7','18':'#E8C8C7','21':'#20b25d','20':'#20b25d','23':'#ff0000','22':'#ff0000','517':'#5ae2a3'};
			//console.log(feature.properties.id)
			var colorObj='';
			 for (var i in response) {
				   if (response[i].organizationId == feature.properties.id) {
					   colorObj = response[i].mapColorCode;
				   }
			 }
			 //console.log(colorObj)
			layer.setStyle({ color: colorObj, fillOpacity: 0.7,weight: 1});
			var label = L.marker(layer.getBounds().getCenter(), {
				icon: L.divIcon({
					className: 'm1y-div-icon',
					html: layer.feature.properties.district,
					iconSize: [65,25]
				})
			}).addTo(mapPast);
			
			
			if (feature.properties && feature.properties.district) {
				layer.on("mouseover", function (e) {
                    layer.bindPopup(feature.properties.district,{closeButton: true, offset: L.point(0, -10) });
                   
                    for (var i in response) {
                       if (response[i].organizationId == e.target.feature.properties.id) {
							
							var districtName = response[i].organization;
							var count = response[i].positiveCountMain;
							var percentage = response[i].positivePerc;
							
                            var tbl = "<span>"+districtName+" - <span class='font_weight'>"+count+" (<span class='font_weight'>"+percentage+" %</span>)</span></span>";
							
							layer.openPopup().bindPopup(tbl).addTo(mapPast);
                        }
                    }

                });
				layer.on('mouseout', function(e) { 
						layer.bindPopup(feature.properties.district,{closeButton: true, offset: L.point(0, -10) });
                   
						for (var i in response) {
						   if (response[i].organizationId == e.target.feature.properties.id) {
								
								var districtName = response[i].organization;
								var count = response[i].positiveCountMain;
								var percentage = response[i].positivePerc;
								
								var tbl = "<span>"+districtName+" - <span class='font_weight'>"+count+" (<span class='font_weight'>"+percentage+" %</span>)</span></span>";
								
								layer.closePopup().bindPopup(tbl).addTo(mapPast);
								
								
							}
						}
					
				});
				
				
			}
		  
		};
		var featureLayer = L.geoJson(Distboundary, {
			 onEachFeature: onEachFeature
		})
		//    .bindTooltip(function (layer) {
		//    return layer.feature.properties.district // Needs to be a string
		//}) //, {permanent: true, opacity: 0.5};
		// Finally, add the layer to the map.
		mapPast.addLayer(featureLayer);
	
}


function plotLayeronMapPresentConstituency(mapPresentC,response,levelTypeBuild) {
	
		mapPresentC.eachLayer(function (layerGroup) {
			mapPresentC.removeLayer(layerGroup);
		});
		var featureLayer = new L.GeoJSON();
		var onEachFeature = function (feature, layer) {
			//var statusColorObj={'11':'#ef4747','12':'#ef4747','14':'#ef4747','15':'#ef4747','17':'#ef4747','16':'#E8C8C7','19':'#E8C8C7','18':'#E8C8C7','21':'#20b25d','20':'#20b25d','23':'#ff0000','22':'#ff0000','517':'#5ae2a3'};
			//console.log(feature.properties.id)
			var colorObj='';
			 for (var i in response) {
				   if (response[i].organizationId == feature.properties.AC_NO) {
					   colorObj = response[i].mapColorCode;
				   }
			 }
			 //console.log(colorObj)
			layer.setStyle({ color: colorObj, fillOpacity: 0.7,weight: 1});
			var label = L.marker(layer.getBounds().getCenter(), {
				icon: L.divIcon({
					className: 'm1y-div-icon',
					html: '',
					iconSize: [0, 0]
				})
			}).addTo(mapPresentC);
			
			
			if (feature.properties && feature.properties.AC_NAME) {
				layer.on("mouseover", function (e) {
                    layer.bindPopup(feature.properties.AC_NAME, {closeButton: true, offset: L.point(0, 0) });
					
                   for (var i in response) {
                       if (response[i].organizationId == e.target.feature.properties.AC_NO) {
							
							var districtName = response[i].organization;
							var count = response[i].positiveCountMain;
							var percentage = response[i].positivePerc;
							
                            var tbl = "<span>"+districtName+" - <span class='font_weight'>"+count+" (<span class='font_weight'>"+percentage+" %</span>)</span></span>";
							
							layer.openPopup().bindPopup(tbl).addTo(mapPresentC);
                        }
                    }

                });
				layer.on('mouseout', function() { layer.closePopup(); });
				
			}
		  
		};
		var featureLayer = L.geoJson(Assemblyboundary, {
			 onEachFeature: onEachFeature
		})
		
		//    .bindTooltip(function (layer) {
		//    return layer.feature.properties.district // Needs to be a string
		//}) //, {permanent: true, opacity: 0.5};
		// Finally, add the layer to the map.
		mapPresentC.addLayer(featureLayer);
	
}

function plotLayeronMapPastConstituency(mapPastC,response,levelTypeBuild) {
	
		mapPastC.eachLayer(function (layerGroup) {
			mapPastC.removeLayer(layerGroup);
		});
		var featureLayer = new L.GeoJSON();
		var onEachFeature = function (feature, layer) {
			//var statusColorObj={'11':'#ef4747','12':'#ef4747','14':'#ef4747','15':'#ef4747','17':'#ef4747','16':'#E8C8C7','19':'#E8C8C7','18':'#E8C8C7','21':'#20b25d','20':'#20b25d','23':'#ff0000','22':'#ff0000','517':'#5ae2a3'};
			//console.log(feature.properties.id)
			var colorObj='';
			 for (var i in response) {
				   if (response[i].organizationId == feature.properties.AC_NO) {
					   colorObj = response[i].mapColorCode;
				   }
			 }
			 //console.log(colorObj)
			layer.setStyle({ color: colorObj, fillOpacity: 0.7,weight: 1});
			var label = L.marker(layer.getBounds().getCenter(), {
				icon: L.divIcon({
					className: 'm1y-div-icon',
					html: '',
					iconSize: [0, 0]
				})
			}).addTo(mapPastC);
			
			
			if (feature.properties && feature.properties.AC_NAME) {
				layer.on("mouseover", function (e) {
                    layer.bindPopup(feature.properties.AC_NAME,{ closeButton: true, offset: L.point(0, 0) });
                   
                    for (var i in response) {
                       if (response[i].organizationId == e.target.feature.properties.AC_NO) {
							
							var districtName = response[i].organization;
							var count = response[i].positiveCountMain;
							var percentage = response[i].positivePerc;
							
                            var tbl = "<span>"+districtName+" - <span class='font_weight'>"+count+" (<span class='font_weight'>"+percentage+" %</span>)</span></span>";
							
							layer.openPopup().bindPopup(tbl).addTo(mapPastC);
                        }
                    }

                });
				layer.on('mouseout', function() { layer.closePopup(); });
				
			}
		  
		};
		var featureLayer = L.geoJson(Assemblyboundary, {
			 onEachFeature: onEachFeature
		})
		//    .bindTooltip(function (layer) {
		//    return layer.feature.properties.district // Needs to be a string
		//}) //, {permanent: true, opacity: 0.5};
		// Finally, add the layer to the map.
		mapPastC.addLayer(featureLayer);
	
}


function plotLayeronMapPresentParliament(mapPresentP,response,levelTypeBuild) {
	
		mapPresentP.eachLayer(function (layerGroup) {
			mapPresentP.removeLayer(layerGroup);
		});
		var featureLayer = new L.GeoJSON();
		var onEachFeature = function (feature, layer) {
			//var statusColorObj={'11':'#ef4747','12':'#ef4747','14':'#ef4747','15':'#ef4747','17':'#ef4747','16':'#E8C8C7','19':'#E8C8C7','18':'#E8C8C7','21':'#20b25d','20':'#20b25d','23':'#ff0000','22':'#ff0000','517':'#5ae2a3'};
			//console.log(feature.properties.id)
			var colorObj='';
			 for (var i in response) {
				   if (response[i].organizationId == feature.properties.PC_NO.trim()) {
					   colorObj = response[i].mapColorCode;
				   }
			 }
			 //console.log(colorObj)
			layer.setStyle({ color: colorObj, fillOpacity: 0.7,weight: 1});
			var label = L.marker(layer.getBounds().getCenter(), {
				icon: L.divIcon({
					className: 'm1y-div-icon',
					html: '',
					iconSize: [0, 0]
				})
			}).addTo(mapPresentP);
			
			
			if (feature.properties && feature.properties.PC_NAME) {
				layer.on("mouseover", function (e) {
                    layer.bindPopup(feature.properties.PC_NAME, {closeButton: true, offset: L.point(0, 0) });
                   
                    for (var i in response) {
                       if (response[i].organizationId == e.target.feature.properties.PC_NO.trim()) {
							
							var districtName = response[i].organization;
							var count = response[i].positiveCountMain;
							var percentage = response[i].positivePerc;
							
                            var tbl = "<span>"+districtName+" - <span class='font_weight'>"+count+" (<span class='font_weight'>"+percentage+" %</span>)</span></span>";
							
							layer.openPopup().bindPopup(tbl).addTo(mapPresentP);
                        }
                    }

                });
				layer.on('mouseout', function() { layer.closePopup(); });
				
			}
		  
		};
		var featureLayer = L.geoJson(Parliamentboundary, {
			 onEachFeature: onEachFeature
		})
		
		//    .bindTooltip(function (layer) {
		//    return layer.feature.properties.district // Needs to be a string
		//}) //, {permanent: true, opacity: 0.5};
		// Finally, add the layer to the map.
		mapPresentP.addLayer(featureLayer);
	
}

function plotLayeronMapPastParliament(mapPastP,response,levelTypeBuild) {
	
		mapPastP.eachLayer(function (layerGroup) {
			mapPastP.removeLayer(layerGroup);
		});
		var featureLayer = new L.GeoJSON();
		var onEachFeature = function (feature, layer) {
			//var statusColorObj={'11':'#ef4747','12':'#ef4747','14':'#ef4747','15':'#ef4747','17':'#ef4747','16':'#E8C8C7','19':'#E8C8C7','18':'#E8C8C7','21':'#20b25d','20':'#20b25d','23':'#ff0000','22':'#ff0000','517':'#5ae2a3'};
			//console.log(feature.properties.id)
			var colorObj='';
			 for (var i in response) {
				   if (response[i].organizationId == feature.properties.PC_NO.trim()) {
					   colorObj = response[i].mapColorCode;
				   }
			 }
			 //console.log(colorObj)
			layer.setStyle({ color: colorObj, fillOpacity: 0.7,weight: 1});
			var label = L.marker(layer.getBounds().getCenter(), {
				icon: L.divIcon({
					className: 'm1y-div-icon',
					html: '',
					iconSize: [0, 0]
				})
			}).addTo(mapPastP);
			
			
			if (feature.properties && feature.properties.PC_NAME) {
				layer.on("mouseover", function (e) {
                    layer.bindPopup(feature.properties.PC_NAME,{closeButton: true, offset: L.point(0, 0) });
                   
                    for (var i in response) {
                       if (response[i].organizationId == e.target.feature.properties.PC_NO.trim()) {
							
							var districtName = response[i].organization;
							var count = response[i].positiveCountMain;
							var percentage = response[i].positivePerc;
							
                            var tbl = "<span>"+districtName+" - <span class='font_weight'>"+count+" (<span class='font_weight'>"+percentage+" %</span>)</span></span>";
							
							layer.openPopup().bindPopup(tbl).addTo(mapPastP);
                        }
                    }

                });
				layer.on('mouseout', function() { layer.closePopup(); });
				
			}
		  
		};
		var featureLayer = L.geoJson(Parliamentboundary, {
			 onEachFeature: onEachFeature
		})
		//    .bindTooltip(function (layer) {
		//    return layer.feature.properties.district // Needs to be a string
		//}) //, {permanent: true, opacity: 0.5};
		// Finally, add the layer to the map.
		mapPastP.addLayer(featureLayer);
	
}