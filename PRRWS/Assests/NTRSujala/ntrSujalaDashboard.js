var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var globalDistrictLatLagArr=[];
var globalOverviewResult;
var customStartDate =  moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY");
var customEndDate = moment().format('DD/MM/YYYY');

$(".dateRangeYearCls").datetimepicker({
	format: 'YYYY',
	viewMode:'years',
	widgetPositioning: {
		horizontal: "auto",
		vertical: "bottom"
	}
});
$(".dateRangeYearCls").val(moment().format("YYYY"));
$(".dateRangeYearCls").on("dp.change", function(e) {
	$('.activateCls li').removeClass('active');
	$('.activateCls li[attr_name="monthly"]').addClass('active');
	var type=$(".activateCls li.active").attr("attr_name");
	getNtrSujalaWaterDispenceTrending(type);
});


$("#dateRangeForTrainingId").daterangepicker({
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
});
$('#dateRangeForTrainingId').on('apply.daterangepicker', function(ev, picker) {
    customStartDate=picker.startDate.format('DD/MM/YYYY');
	customEndDate=picker.endDate.format('DD/MM/YYYY');
	var rduId = $("#rduHiddenFieldId").val();
	var type = $("#rduTypeHiddenFieldId").val();
	getLast30DaysRDUDetails(rduId,type);
});
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
getNTRSujalaOverviewDetails("","OnLoad");
getNtrSujalaDistrictWiseOverview("districtWiseMpDetailsId");
getNtrSujalaDistrictWiseOverview("constituencyWiseMpDetailsId");
$(".chosen-select").chosen();


function getNTRSujalaOverviewDetails(districtName,callType){
	$("#overViewDetails").html(spinner);
	if(callType == "OnLoad"){
		$("#motherPlantsOverviewId").html(spinner);
	} else if(callType == "districtLoad"){
		$("#districtWiseDetailsDivId").html(spinner);
	}
	//$("#districtWiseMpDetailsId").html(spinner);
	var json = {};
	$.ajax({                
		type:'POST',    
		url: 'getNtrSujalaOverview',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			globalOverviewResult = result;
			buildNTRSujalaOverviewDetails(result);
			//buildMapDetails(result.districtList);
			//buildDistrictWiseMpDetails(result.districtList);
			if(callType == "OnLoad"){
				buildMotherPlantsOverviewDetails(result.motherPlantsList,"motherPlantsOverviewId",districtName,callType);
			} else {
				buildMotherPlantsOverviewDetails(result.motherPlantsList,"districtWiseDetailsDivId",districtName,callType)
			}
			buildRDUsOverviewDetails(result.rdusList);
			buildNTRSujalaRdusMotherStatus(result.rduStatusList,"rdu");
			buildNTRSujalaRdusMotherStatus(result.motherPlantStatusList,"mp");
		}else{
			$("#overViewDetails").html('');
			$("#mpWiseDetailsDivId").html('');
			$("#districtWiseMpDetailsId").html('');
		}
	});
}
/* $(document).on("click",".motherPlantsClass",function(){
	var type = $(this).attr("attr_type");
	buildMotherPlantsOverviewDetails(globalOverviewResult.motherPlantsList,type);
}); */

/* $(document).on("click",".rdusClass",function(){
	var type = $(this).attr("attr_type");
	buildRDUsOverviewDetails(globalOverviewResult.rdusList,type);
}); */
function buildNTRSujalaOverviewDetails(result){
	var str='';
	str+='<img src="Assests/images/avatar3_small.png" class="overlapImg">';
	str+='<div class="row">';
		str+='<div class="col-sm-3">'; 
			str+='<div class="white-block border_yash pad_15_10">';
				str+='<div class="media">';
					str+='<div class="media-left">';
						str+='<img src="Assests/images/icon-motherPlanet.png" class="media-object" style="width:50px">';
					str+='</div>';
					str+='<div class="media-body text-center">';
						str+='<h5 class="media-heading m_top5 font_weight font_15">Total Mother Plants</h5>';
						str+='<h4 class="font_weight text-success m_top10">'+result.totalMotherPlants+'</h4>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3">';
			str+='<div class="white-block border_yash pad_15_10">';
				str+='<div class="media">';
					str+='<div class="media-left">';
						str+='<img src="Assests/images/wpcp-icon-1.png" class="media-object" style="width:50px;">';
					str+='</div>';
					str+='<div class="media-body text-center">';
						str+='<h5 class="media-heading m_top5 font_weight font_15">Total RDUs</h5>';
						str+='<h4 class="font_weight text-success m_top10">'+result.totalRDUs+'</h4>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-6">';
			str+='<div class="white-block border_yash pad_15_10">';
				str+='<div class="row">';
					str+='<div class="col-sm-5">';
						str+='<div class="media">';
							str+='<div class="media-left">';
								str+='<img src="Assests/images/Group 2290.png" class="media-object" style="width:50px;">';
							str+='</div>';
							str+='<div class="media-body text-center">';
								str+='<h5 class="media-heading m_top5 font_weight font_15">Total Customers</h5>';
								str+='<h4 class="font_weight text-success m_top10">'+result.totalCustomers+'</h4>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-7">';
						str+='<div class="row text-center">';
							str+='<div class="col-sm-6">';
								str+='<h5 class="media-heading m_top5 font_weight font_15">Active</h5>';
								str+='<h5 class="m_top10 font_weight">'+result.activeCustomers+' <span class="m_left text-success">'+result.activeCustomersPerc+'%</span></h5>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<h5 class="media-heading m_top5 text-center font_weight font_15">Inactive</h5>';
								str+='<h5 class="m_top10 font_weight">'+result.inActiveCustomers+' <span class="m_left text_danger">'+result.inActiveCustomersPerc+'%</span></h5>';
							str+='</div>';	
						str+='</div>';	
					str+='</div>';	
				str+='</div>';	
			str+='</div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-3">';
			str+='<div class="white-block border_yash pad_10">';
				str+='<div class="row">';
					str+='<div class="col-sm-6 text-center" style="border-right:1px solid #ddd;">';
						str+='<h5 class="m_top5 font_weight font_15">Standard</h5>';
						str+='<h5 class="m_top5 font_weight font_15">PH Value</h5>';
						str+='<h5 class="m_top10 font_weight">5.7 to 7</h5>';
					str+='</div>';
					str+='<div class="col-sm-6 text-center">';
						str+='<h5 class="m_top5 font_weight font_15">Avg PH Value</h5>';
						str+='<h5 class="m_top5">(Maintained)</h5>';
						str+='<h4 class="m_top10 font_weight text-success">'+result.phAvg+'</h4>';
					str+='</div>';
				str+='</div>';	
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-3">';
			str+='<div class="white-block border_yash pad_10">';
				str+='<div class="row">';
					str+='<div class="col-sm-6 text-center" style="border-right:1px solid #ddd;">';
						str+='<h5 class="m_top5 font_weight font_15">Standard</h5>';
						str+='<h5 class="m_top5 font_weight font_15">TDS Value</h5>';
						str+='<h5 class="m_top10 font_weight">50 - 70</h5>';
					str+='</div>';
					str+='<div class="col-sm-6 text-center">';
						str+='<h5 class="m_top5 font_weight font_15">Avg TDS Value</h5>';
						str+='<h5 class="m_top5">(Maintained)</h5>';
						str+='<h4 class="m_top10 font_weight text-success">'+result.tdsAvg+'</h4>';
					str+='</div>';
				str+='</div>';	
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-6">';
			str+='<div class="white-block border_yash" style="padding:5px 15px;">';
				str+='<div class="row">';
					str+='<div class="col-sm-4" style="z-index:999;">';
						str+='<h5 class="font_weight font_15">Health Status</h5>';
						str+='<h5 class="m_top20 font_weight font_15">Mother Plants <a id="motherId" class="popoverCls" rel="popover" data-trigger="hover" data-toggle="popover" data-html="true"  data-placement="top" data-trigger="click" data-content=""> <i class="fa fa-info-circle" style="color:#6C50DF;cursor:pointer;" aria-hidden="true"></i></a>';
						str+='<h5 class="m_top10 font_weight font_15">RDUs <a id="rdusId" class="popoverCls" rel="popover" data-trigger="hover" data-toggle="popover" data-html="true"  data-placement="top" data-trigger="click" data-content=""> <i class="fa fa-info-circle" style="color:#6C50DF;cursor:pointer;" aria-hidden="true"></i></a>';
					str+='</div>';
					str+='<div class="col-sm-4 text-center">';
						str+='<h5 class="m_top15 font_weight font_15">Good</h5>';
						str+='<h5 class="m_top10 font_weight">'+result.activeMotherPlants+' <span class="m_left text-success">'+result.activeMotherPlantsPerc+'%</span></h5>';
						str+='<h5 class="m_top10 font_weight">'+result.activeRDUs+' <span class="m_left text-success">'+result.activeRDUsPerc+'%</span></h5>';
					str+='</div>';
					str+='<div class="col-sm-4 text-center">';
						str+='<h5 class="m_top15 font_weight font_15">Bad</h5>';
						str+='<h5 class="m_top10 font_weight">'+result.inActiveMotherPlants+' <span class="m_left text_danger">'+result.inActiveMotherPlantsPerc+'%</span></h5>';
						str+='<h5 class="m_top10 font_weight">'+result.inActiveRDUs+' <span class="m_left text_danger">'+result.inActiveRDUsPerc+'%</span></h5>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-3">';
			str+='<div class="white-block border_yash pad_20 text-center">';
				str+='<h5 class="font_weight font_15">Total Water Sell Till Date</h5>';
				str+='<h5 class="m_top15 font_weight">'+result.rduSellWater+' Lt.s</h5>	';
			str+='</div>';
			str+='<div class="white-block border_yash pad_20 m_top10 text-center">';
				str+='<h5 class="m_top5 font_weight font_15">Daily Avg Dispense Mother Plants</h5>';
				str+='<h5 class="m_top15 font_weight">'+result.dailyAvgDispenceMPs+' Lt.s</h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-9">';
			str+='<div class="white-block border_yash pad_10">';
				str+='<div class="white-block border_yash pad_10">';
					str+='<div class="row">';
						str+='<div class="col-sm-6" style="border-right:1px solid #ccc;">';
							str+='<div class="row">';
								str+='<div class="col-sm-10 col-sm-offset-1">';
									str+='<h5 class="font_weight text-center font_15">High Dispense RDU</h5>';
									str+='<div class="border_yash pad_10 m_top5" style="background-color:#E4FCF2; border-radius:3px;">';
										str+='<div class="row">';
											str+='<div class="col-sm-8" style="border-right:1px solid #ccc; z-index: 999;">';
											if(result.highDispanceRDUName.length>18){
												str+='<h5 class="font_weight toolTipCls" title="'+result.highDispanceRDUName+'">'+result.highDispanceRDUName.substring(0,18)+'..</h5>';
											} else {
												str+='<h5 class="font_weight">'+result.highDispanceRDUName.substring(0,18)+'</h5>';
											}
											str+='</div>';
											str+='<div class="col-sm-4">';
												str+='<h5 class="font_weight">'+result.highRDUDispanceLtrs+' Lts</h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<div class="row">';
								str+='<div class="col-sm-10 col-sm-offset-1">';
									str+='<h5 class="font_weight text-center font_15">Low Dispense RDU</h5>';
									str+='<div class="border_yash pad_10 m_top5" style="background-color:#FFC4C4; border-radius:3px;">';
										str+='<div class="row">';
											str+='<div class="col-sm-8" style="border-right:1px solid #ccc;">';
											if(result.lowDispanceRDUName.length>13){
												str+='<h5 class="font_weight toolTipCls" title="'+result.lowDispanceRDUName+'">'+result.lowDispanceRDUName.substring(0,13)+'..</h5>';
											} else {
												str+='<h5 class="font_weight">'+result.lowDispanceRDUName.substring(0,13)+'</h5>';
											}
											str+='</div>';
											str+='<div class="col-sm-4">';
												str+='<h5 class="font_weight">'+result.lowRDUDispanceLtrs+' Lts</h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="white-block border_yash m_top10 pad_10">';
					str+='<div class="row">';
					for(var i in result.subList) {
						if(result.subList[i].mandal == "HIgh Capacity Mother Plant") {
							str+='<div class="col-sm-6" style="border-right:1px solid #ccc;">';
						} else {
							str+='<div class="col-sm-6">';
						}
							str+='<div class="row">';
								str+='<div class="col-sm-10 col-sm-offset-1">';
									str+='<h5 class="font_weight text-center font_15">'+result.subList[i].mandal+'</h5>';
									if(result.subList[i].mandal == "HIgh Capacity Mother Plant") {
										str+='<div class="border_yash pad_10 m_top5" style="background-color:#E4FCF2; border-radius:3px;">';
									} else {
										str+='<div class="border_yash pad_10 m_top5" style="background-color:#FFC4C4; border-radius:3px;">';
									}
										str+='<div class="row">';
											str+='<div class="col-sm-8" style="border-right:1px solid #ccc;">';
											if(result.subList[i].name.length>10){
												str+='<h5 class="font_weight"><a class="toolTipCls" title="'+result.subList[i].name+'" style="color:#333;">'+result.subList[i].name.substring(0,10)+'..</a> - '+result.subList[i].district+'</h5>';
											} else {
												str+='<h5 class="font_weight">'+result.subList[i].name.substring(0,10)+' - '+result.subList[i].district+'</h5>';
											}
											str+='</div>';
											str+='<div class="col-sm-4">';
												str+='<h5 class="font_weight">'+result.subList[i].waterTankCapacity+' Lts</h5>';
											str+='</div>';
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
	str+='</div>';
	$("#overViewDetails").html(str);
	$(".toolTipCls").tooltip();
}
function buildMapDetails(result){
	var str='';
	str+='<div class="row m_top10">';
		str+='<div class="col-sm-12">';
			str+='<div id="map_canvas"></div>';
		str+='</div>';
	str+='</div>';
	$("#mapDetailsDivId").html(str);
	
	var str1 = '';
	if(result != null && result.length > 0){
		for(var i in result){
			if(i == 1)
				str1+='<option value="'+result[i].name+'" selected>'+result[i].name+'</option>';
			else
				str1+='<option value="'+result[i].name+'">'+result[i].name+'</option>';
		}
		$("#districtId").html(str1);
		$("#districtId").trigger("chosen:updated");
		
		str1 = '';
		if(result[1].subList != null && result[1].subList.length > 0){
			for(var i in result[1].subList){
				if(i == 1)
					str1+='<option value="'+result[1].subList[i].id+'" selected>'+result[1].subList[i].name+'</option>';
				else
					str1+='<option value="'+result[1].subList[i].id+'">'+result[1].subList[i].name+'</option>';
			}
			$("#motherPlantId").html(str1);
			$("#motherPlantId").trigger("chosen:updated");
			buildMotherPlantWiseDetails(result[1].subList[1]);
		}
	}
	
	var myOptions = {
        zoom: 10,
        //center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var bounds = new google.maps.LatLngBounds();
	if(result != null && result.length > 0){
		var result1 = result[1].subList;
		if(result1 != null && result1.length > 0){
			for(var i in result1){
				var pos = new google.maps.LatLng(result1[i].latitude, result1[i].longitude);
				bounds.extend(pos);
				marker = new google.maps.Marker({
					position: pos,
					map: map
				});
				google.maps.event.addListener(marker, 'click', (function (marker, i) {
					return function () {
						infowindow.setContent(result1[i].name);
						infowindow.open(map, marker);
					}
				})(marker, i));
				 //new google.maps.event.trigger( marker, 'click' );	
			}
		map.fitBounds(bounds);
		}
	}
}

$(document).on("change","#districtId",function(){
	 var districtName = $(this).val();
	 for(var i in globalOverviewResult.districtList){
		if(globalOverviewResult.districtList[i].name == districtName){
			var str='';
			var result = globalOverviewResult.districtList[i].subList;
			if(result != null && result.length > 0){
				for(var j in result){
					str+='<option value="'+result[j].id+'">'+result[j].name+'</option>';
				}
				$("#motherPlantId").html(str);
				$("#motherPlantId").trigger("chosen:updated");
				buildMotherPlantWiseDetails(result[0]);
			}
			
			var myOptions = {
				zoom: 10,
				//center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false
			};
			var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			var infowindow = new google.maps.InfoWindow();
			var marker, k;
			var bounds = new google.maps.LatLngBounds();
			if(result != null && result.length > 0){
				for(var l in result){
					var pos = new google.maps.LatLng(result[l].latitude, result[l].longitude);
					bounds.extend(pos);
					marker = new google.maps.Marker({
						position: pos,
						map: map
					});
					google.maps.event.addListener(marker, 'click', (function (marker, k) {
						return function () {
							infowindow.setContent(result[l].name);
							infowindow.open(map, marker);
						}
					})(marker, k));
					 //new google.maps.event.trigger( marker, 'click' );	
				}
			map.fitBounds(bounds);
			}
		} 
	 }
	 
});

$(document).on("change","#motherPlantId",function(){
	 var mpId = $(this).val();
	 var districtName = $("#districtId").val();
	 for(var i in globalOverviewResult.districtList){
		if(globalOverviewResult.districtList[i].name == districtName){
			var result = globalOverviewResult.districtList[i].subList;
			if(result != null && result.length > 0){
				for(var j in result){
					if(result[j].id == mpId)
						buildMotherPlantWiseDetails(result[j]);
				}
			}
		}
	 }
});

function buildMotherPlantWiseDetails(result){
	var str='';
	str+='<div class="pad_5_fff" style="border-radius: 3px;">';
		str+='<div class="row">';
				str+='<div class="col-sm-12">';
					str+='<div class="pad_yash_5">';
						str+='<div class="media">';
						  str+='<div class="media-left">';
							str+='<a href="#">';
							  str+='<img class="media-object" src="Assests/images/icon-motherPlanet.png" alt="..." style="width: 40px;height: 40px;">';
							str+='</a>';
						  str+='</div>';
						  str+='<div class="media-body">';
							str+='<h4 class="media-heading font_weight motherPlantDetailsCls"  attr_mp_id="'+result.id+'" style="cursor:pointer;text-decoration:underline;">'+result.name+'</h4>';
							str+='<h5 class="m_top5 pull-right">Mother Plant</h5>';
						  str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				/*str+='<div class="col-sm-5">';
					str+='<h5 class="font_weight text-right">Water Generated</h5>';
					if(result.mpSafeWaterDispenced != null && result.mpSafeWaterDispenced != 'N/A' && result.mpSafeWaterDispenced > 0)
						str+='<h3 class="text-right">'+result.mpSafeWaterDispenced+'</h3>';
					else
						str+='<h3 class="text-right m_top5" style="margin-left: 120px;"><img class="media-object" src="Assests/images/not_applicable.png" alt="..." style="width:25px;height:25px;"></h3>';
					//str+='<h5 class="text-right">Lts Per Day</h5>';
				str+='</div>';*/
			str+='</div>';
			str+='<div class="row m_top10">';
				str+='<div class="col-sm-12">';
					str+='<div class="row">';
						str+='<div class="col-sm-1">';
							str+='<img class="media-object" src="Assests/images/icon-healthStatus.png" alt="..." style="width: 40px;height: 40px;">';
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<h4 class="font_weight m_top10">Health Status</h4>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="row">';
						str+='<div class="col-sm-4 m_top5">';
							str+='<div class="pad_5_F6F7FF">';
								str+='<h5 class="text-center">Plant Health</h5>';
								if(result.health != null && result.health == 'OK')
									str+='<h5 class="good_color m_top10 text-center">Good</h5>';
								else
									str+='<h5 class="bad_color m_top10 text-center">Bad</h5>';
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-8 m_top5">';
							str+='<div class="pad_5_F6F7FF">';
								str+='<div class="row">';
									if($(window).width>800){
										str+='<div class="col-sm-5 m_top10">';
									}else{
										str+='<div class="col-sm-5 ">';
									}
									str+='<h5 class="margin_left_5">Water&nbsp;Quality</h5>';
									if(result.waterQuality != null && result.waterQuality == 'OK')
										str+='<h5 class="good_color margin_left_5 m_top10">Good</h5>';
									else
										str+='<h5 class="bad_color margin_left_5 m_top10">Bad</h5>';
									str+='</div>';
									if($(window).width>800){
										str+='<div class="col-sm-3 m_top10">';
									}else{
										str+='<div class="col-sm-3 ">';
									}
										str+='<div class="border_width_tds">';
											str+='<h5 class="margin_left_5">TDS</h5>';
											str+='<h5 class="margin_left_5 m_top10">'+result.tds+'</h5>';
										str+='</div>';
									str+='</div>';
									if($(window).width>800){
										str+='<div class="col-sm-3 m_top10">';
									}else{
										str+='<div class="col-sm-3 ">';
									}
										str+='<div class="border_width_ph">';
											str+='<h5 class="margin_left_5">pH</h5>';
											str+='<h5 class="good_color margin_left_5 m_top10">'+result.ph+'</h5>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
	str+='</div>';
	str+='<div class="pad_5_fff" style="background-color:#EEF0FF;border-radius: 3px;">';
		str+='<h5 class="font_weight pad_15">Remote Dispensing Units - '+result.subList.length+'</h5>';
		str+='<div class="desig-scroll">';
		var k=0;
			if(result.subList != null && result.subList.length > 0){
				for(var i in result.subList){
					k=k+1;
					str+='<div class="row">';
						str+='<div class="col-sm-12">';
							str+='<div class="pad_5_border" style="background: #F0F0F0;border-bottom: none;">';
								str+='<div class="row">';
									str+='<div class="col-sm-8">';
										str+='<div class="pad_yash_5">';
											str+='<div class="row">';
												str+='<div class="col-sm-6">';
													str+='<div class="media">';
													  str+='<div class="media-left">';
														str+='<h5 class="numberCircle">'+k+'</h5>';
													  str+='</div>';
													  str+='<div class="media-body">';
														str+='<h5 class="media-heading font_weight">RDU Location</h5>';
														str+='<h5 class="m_top5 f_12">'+result.subList[i].name+'</h5>';
													  str+='</div>';
													str+='</div>';
												str+='</div>';
												str+='<div class="col-sm-6">';
													str+='<div class="border_left_width_water_tank">';
														str+='<h5 class="font_weight m_left_5">Water&nbsp;Tank&nbsp;Capacity</h5>';
														str+='<h5 class="m_top10 m_left_5">'+result.subList[i].waterTankCapacity+'</h5>';
													str+='</div>';
												str+='</div>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
									str+='<div class="col-sm-4" >';
										str+='<div class="pad_blue_5">';
											str+='<h5 class="text-center font_weight">Water&nbsp;Dispence:</h5>';
											str+='<h5 class="text-center">'+result.subList[i].mpSafeWaterDispenced+' Lts</h5>';
											str+='<h5 class="text-center f_10 font_weight">Avg&nbsp;per&nbsp;Day</h5>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
							str+='<div class="pad_5_border" style="background: #fff;border:none;border-left: 1px solid #ccc;border-right: 1px solid #ccc;">';
								str+='<div class="row">';
									str+='<div class="col-sm-4">';
										str+='<h5 class="font_weight f_11">Old Customers</h5>';
										str+='<h4 class="m_top10">'+result.subList[i].oldCustomers+'</h4>';
									str+='</div>';
									str+='<div class="col-sm-4">';
										str+='<h5 class="font_weight f_11">New Customers</h5>';
										str+='<h4 class="m_top10">'+result.subList[i].newCustomers+'</h4>';
									str+='</div>';
									str+='<div class="col-sm-4">';
										str+='<h5 class="font_weight f_11">Customers&nbsp;Visit</h5>';
										str+='<h4 class="m_top10">'+result.subList[i].totalCustomers+'</h4>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					
				}
			}
		str+='</div>';	
	str+='</div>';
	$("#mpWiseDetailsDivId").html(str);
	if(result.subList.length>1){
		$(".desig-scroll").mCustomScrollbar({setHeight:'180px'});
	}
	
}
function getNtrSujalaDistrictWiseOverview(divId){
	$("#"+divId).html(spinner);
	/**
	if(calltype=="onClickType"){
		var json = {
			"callType":divId
		};
	}else{**/
		var json = {};
	//}
	$.ajax({                
		type:'POST',    
		url: 'getNtrSujalaDistrictWiseOverview',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			if(divId == "districtWiseMpDetailsId"){
				buildNtrSujalaDistrictWiseOverview(result.subList,divId);
			} else {
				buildNtrSujalaDistrictWiseOverview(result.motherPlantsList,divId);
			}
		}else{
			$("#"+divId).html('No Data Available');
		}
	});
}
function buildNtrSujalaDistrictWiseOverview(result,divId){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_Ntr_Custom1" id="'+divId+'dataTableId" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
				if(divId == "districtWiseMpDetailsId"){
					str+='<th rowspan="2">District Name</th>';
				} else {
					str+='<th rowspan="2">Constituency Name</th>';
				}
					str+='<th rowspan="2">Avg PH Value</th>';
					str+='<th rowspan="2">Avg TDS Value</th>';
					str+='<th colspan="5">Mother Plants</th>';
					str+='<th colspan="5">RDUs</th>';
					str+='<th colspan="5">Customers</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>Total</th>';
					str+='<th>Good</th>';
					str+='<th>%</th>';
					str+='<th>Bad</th>';
					str+='<th>%</th>';
					str+='<th>Total</th>';
					str+='<th>Good</th>';
					str+='<th>%</th>';
					str+='<th>Bad</th>';
					str+='<th>%</th>';
					str+='<th>Total</th>';
					str+='<th>Active</th>';
					str+='<th>%</th>';
					str+='<th>InActive</th>';
					str+='<th>%</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {//pj
				if(result[i].district!="Hyderabad"){
					str+='<tr>';
						if(divId == "districtWiseMpDetailsId"){
							str+='<td class="text_left districtWiseClkCls" attr_head_id="'+result[i].district+'" attr_input_name="'+result[i].district+'" style="cursor:pointer;"><a>'+result[i].district+'</a></td>';
						} else {
							str+='<td class="text_left districtWiseClkCls"attr_head_id="'+result[i].district+'" attr_input_name="'+result[i].district+'" style="cursor:pointer;" ><a>'+result[i].district+'</a></td>';
						}
						str+='<td>'+result[i].phAvg+'</td>';
						str+='<td>'+result[i].tdsAvg+'</td>';
						str+='<td>'+result[i].totalMotherPlants+'</td>';
						str+='<td>'+result[i].activeMotherPlants+'</td>';
						str+='<td class="text-success">'+result[i].mpGoodPerc+'</td>';
						str+='<td>'+result[i].inActiveMotherPlants+'</td>';
						str+='<td class="text_danger">'+result[i].mpBadPerc+'</td>';
						str+='<td>'+result[i].totalRDUs+'</td>';
						str+='<td>'+result[i].activeRDUs+'</td>';
						str+='<td class="text-success">'+result[i].rduGoodPerc+'</td>';
						str+='<td>'+result[i].inActiveRDUs+'</td>';
						str+='<td class="text_danger">'+result[i].rduBadPerc+'</td>';
						str+='<td>'+result[i].totalCustomers+'</td>';
						str+='<td>'+result[i].activeCustomers+'</td>';
						str+='<td class="text-success">'+result[i].activeCustomersPerc+'</td>';
						str+='<td>'+result[i].inActiveCustomers+'</td>';
						str+='<td class="text_danger">'+result[i].inActiveCustomersPerc+'</td>';
					str+='</tr>';
				}
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$("#"+divId+'dataTableId').dataTable({
		"order": [[ 7, "desc" ]],
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, "All"]],
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
			
		]
	});
}

function buildMotherPlantsOverviewDetails(result,divId,districtName,callType){
	var str='';
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_custom_SC motherPlant motherPlantsTableCls'+callType+'" style="width:100%;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Plant Name</th>';
					str+='<th>Location</th>';
					str+='<th>Mandal</th>';
					str+='<th>District</th>';
					str+='<th>Health Status</th>';
					str+='<th>PH Value</th>';
					str+='<th>TDS Value</th>';
					str+='<th>Today Water&nbsp;Dispence</th>';
					str+='<th>No.of RDUs</th>';
					str+='<th>Customers</th>';
					str+='<th>Contact No</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				if(result[i].name != "NTRTRUST" && callType == "OnLoad") {
					str+='<tr>';
						if(result[i].name=="DUMMY"){
							str+='<td class="motherPlantDetailsCls" attr_mp_id="'+result[i].id+'" style="cursor:pointer; text-align:left !important;"><a>CHITTOR</a></td>';
						}else{
							str+='<td class="motherPlantDetailsCls" attr_mp_id="'+result[i].id+'" style="cursor:pointer; text-align:left !important;"><a>'+result[i].name+'</a></td>';
						}
						
						//str+='<td style="text-align:left !important;"><a>'+result[i].name+'</a></td>';
						str+='<td style="text-align:left !important;">'+result[i].location+'</td>';
						str+='<td>'+result[i].mandal+'</td>';
						str+='<td>'+result[i].district+'</td>';
						//str+='<td>'+result[i].health+'</td>';
						if(result[i].health != null && result[i].health == 'OK')
							str+='<td class="good_color"><p ><i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;Good </p></td>';
						else
							str+='<td class="bad_color"><p ><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;'+result[i].health+' </p></td>';
						if(result[i].ph != null && result[i].ph != undefined){
							str+='<td>'+result[i].ph+'</td>';
						} else {
							str+='<td>-</td>';
						}
						if(result[i].tds != null && result[i].tds != undefined){
							str+='<td>'+result[i].tds+'</td>';
						} else {
							str+='<td>-</td>';
						}
						if(result[i].waterTankCapacity != null && result[i].waterTankCapacity != undefined){
							str+='<td>'+result[i].waterTankCapacity+'</td>';
						} else {
							str+='<td>-</td>';
						}
						str+='<td>'+result[i].totalRDUs+'</td>';
						str+='<td>'+result[i].totalCustomers+'</td>';
						str+='<td>'+result[i].mobileNo+'</td>';
					str+='</tr>';
				}	
				if(result[i].name != "NTRTRUST" && (result[i].district == districtName || result[i].constituencyName == districtName))
					{
					str+='<tr>';
						if(result[i].name=="DUMMY"){
						str+='<td class="motherPlantDetailsCls modalClkCls" attr_mp_id="'+result[i].id+'" style="cursor:pointer; text-align:left !important;"><a>CHITTOR</a></td>';
						}else{
							str+='<td class="motherPlantDetailsCls modalClkCls" attr_mp_id="'+result[i].id+'" style="cursor:pointer; text-align:left !important;"><a>'+result[i].name+'</a></td>';
						}
						//str+='<td style="text-align:left !important;"><a>'+result[i].name+'</a></td>';
						str+='<td style="text-align:left !important;">'+result[i].location+'</td>';
						str+='<td>'+result[i].mandal+'</td>';
						str+='<td>'+result[i].district+'</td>';
						//str+='<td>'+result[i].health+'</td>';
						if(result[i].health != null && result[i].health == 'OK')
							str+='<td class="good_color"><p ><i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;Good </p></td>';
						else
							str+='<td class="bad_color"><p ><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;'+result[i].health+' </p></td>';
						if(result[i].ph != null && result[i].ph != undefined){
							str+='<td>'+result[i].ph+'</td>';
						} else {
							str+='<td>-</td>';
						}
						if(result[i].tds != null && result[i].tds != undefined){
							str+='<td>'+result[i].tds+'</td>';
						} else {
							str+='<td>-</td>';
						}
						if(result[i].waterTankCapacity != null && result[i].waterTankCapacity != undefined){
							str+='<td>'+result[i].waterTankCapacity+'</td>';
						} else {
							str+='<td>-</td>';
						}
						str+='<td>'+result[i].totalRDUs+'</td>';
						str+='<td>'+result[i].totalCustomers+'</td>';
						str+='<td>'+result[i].mobileNo+'</td>';
					str+='</tr>';
				}
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$(".motherPlantsTableCls"+callType).dataTable({
		"paging":   true,
		"info":     true,
		"searching": true,
		"autoWidth": true,
		//"sDom": '<"top"iflp>rt<"bottom"><"clear">',
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, "All"]]
	});
}

$(document).on("click",".modalClkCls",function(){
	$("#districtWiseModalDivId").css("z-index",9);
});
$(document).on("click",".zIndexCls",function(){
	$("#districtWiseModalDivId").css("z-index",9999);
});
$(document).on("click",".motherPlantDetailsCls",function(){
	$("#mother_plants_Details").modal("show");
	var mpId = $(this).attr("attr_mp_id");
	$(".motherPlantLowLevelDtsCls").attr("attr_mpId",mpId);
	var result;
	if(globalOverviewResult.motherPlantsList != null && globalOverviewResult.motherPlantsList.length > 0){
		for(var i in globalOverviewResult.motherPlantsList){
			if(globalOverviewResult.motherPlantsList[i].id == mpId)
				result = globalOverviewResult.motherPlantsList[i];
		}
	}
	buildMotherPlantAndRDUDetails(result);
});
function buildMotherPlantAndRDUDetails(result){
	var str='';
	if(result != null){
		if(result.name=="DUMMY"){
			$("#mpDetailsHeadingId").html("CHITTOR");
		}else{
			$("#mpDetailsHeadingId").html(result.name);
		}
		//$("#mpDetailsHeadingMobileId").html(" +91 "+result.mobileNo);
		str+='<div class="row">';
			str+='<div class="col-sm-5">';
				str+='<div class="row">';
					str+='<div class="col-sm-4">';
						str+='<div class="pad_border text-center" style="background-color:#E9E9E9;">';
							str+='<h5 class="font_weight">Plant Health</h5>';
							if(result.health != null && result.health == "OK") {
								str+='<h5 class="font_weight m_top10">GOOD</h5>';
							} else {
								str+='<h5 class="font_weight m_top10">'+result.health+'</h5>';
							}
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="pad_border text-center" style="background-color:#E9E9E9;">';
							str+='<h5 class="font_weight">PH Value</h5>';
							str+='<h5 class="font_weight m_top10">'+result.ph+'</h5>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="pad_border text-center" style="background-color:#E9E9E9;">';
							str+='<h5 class="font_weight">TDS Value</h5>';
							str+='<h5 class="font_weight m_top10">'+result.tds+'</h5>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-5">';
				str+='<div class="row">';
					str+='<div class="col-sm-6">';
						str+='<div class="pad_border" style="background-color:#E9E9E9;">';
							str+='<h5 class="font_weight text-center">High Dispence RDU</h5>';
							str+='<h5 class="font_weight m_top10">'+result.highDispanceRDUName+' <span class="pull-right">'+result.highRDUDispanceLtrs+' Lts</span></h5>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-6">';
						str+='<div class="pad_border" style="background-color:#E9E9E9;">';
							str+='<h5 class="font_weight text-center">Low Dispence RDU</h5>';
							str+='<h5 class="font_weight m_top10">'+result.lowDispanceRDUName+' <span class="pull-right">'+result.lowRDUDispanceLtrs+' Lts</span></h5>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-2">';
				str+='<div class="pad_border text-center" style="background-color:#E9E9E9;">';
					str+='<h5 class="font_weight">Customers</h5>';
					str+='<h5 class="font_weight m_top10">'+result.totalCustomers+'</h5>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_Ntr_Custom1 mpWiseRdusCls">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>RDU&nbsp;Location</th>';
					str+='<th>Health</th>';
					str+='<th>Water&nbsp;Tank&nbsp;Capacity</th>';
					str+='<th>Water&nbsp;Dispence</th>';
					str+='<th>Customers Visit</th>';
					str+='<th>Old Customers</th>';
					str+='<th>New Customers</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			if(result.subList != null && result.subList.length > 0){
				for(var i in result.subList){
					str+='<tr>';
						str+='<td class="text_left motherPlantWaterTankDtsCls" attr_type="'+result.subList[i].name+'" attr_head_id="'+result.subList[i].name+'" attr_rdu_id="'+result.subList[i].id+'" style="cursor:pointer;" title=""><a>'+result.subList[i].name+'</a></td>';
						if(result.subList[i].health != null && result.subList[i].health == 'OK')
							str+='<td class="good_color">Good </td>';
						else
							str+='<td class="bad_color">'+result.subList[i].health+'</td>';
						str+='<td>'+result.subList[i].waterTankCapacity+'</td>';
						str+='<td>'+result.subList[i].mpSafeWaterDispenced+'</td>';
						str+='<td>'+result.subList[i].totalCustomers+'</td>';
						str+='<td>'+result.subList[i].oldCustomers+'</td>';
						str+='<td>'+result.subList[i].newCustomers+'</td>';
					str+='</tr>';
				}
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	}
	
	$("#motherPlantsDetailsId").html(str);
	$(".toolTipCls").tooltip();
	$(".mpWiseRdusCls").dataTable({
		"paging":   true,
		"info":     true,
		"searching": true,
		"autoWidth": true,
		//"sDom": '<"top"iflp>rt<"bottom"><"clear">',
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, "All"]]
	});
}
$(document).on("click",".motherPlantLowLevelDtsCls",function(){
	$("#mother_plants_Details_low_level").modal("show");
	var mpId = $(this).attr("attr_mpId");
	getLast30DaysMpDetails(mpId);
	//buildMotherPlantLowLevelDetails();
});
function getLast30DaysMpDetails(mpId){
	$("#motherPlantsLowLevelDetailsId").html(spinner);
	var json = {
		locationId : mpId
	};
	$.ajax({                
		type:'POST',    
		url: 'getLast30DaysMotherPlantDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null)
			buildMotherPlantLowLevelDetails(result);
		else
			$("#motherPlantsLowLevelDetailsId").html('NO DATA AVAILABLE...');
	});
}
function buildMotherPlantLowLevelDetails(result){
	var str='';
	$("#mp30DaysHeadingId").html(result.name);
	str+='<div class="scrollerDivCls1">';
	if(result.subList != null && result.subList.length > 0){
		for(var i in result.subList){
			str+='<div class="row m_top10">';
				str+='<div class="col-sm-2">';
					str+='<div class="dateMotherCss">';
						str+='<h4 class="" style="">'+result.subList[i].date+'</h4>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='<div class="pad_border">';
				str+='<div class="row">';
					str+='<div class="col-sm-4">';
						str+='<h5 class=""><img src="Assests/images/icon-healthStatus.png" style="width:25px;"/><span class="font_weight m_left_5">Health Status</span></h5>';
						str+='<div class="row">';
							str+='<div class="col-sm-4 m_top10">';
								str+='<div class="pad_5_F6F7FF">';
									str+='<h5 class="text-center f_12 font_weight">Plant Health</h5>';
									if(result.subList[i].plantHealthStatus != null && result.subList[i].plantHealthStatus == "OK")
										str+='<h5 class="good_color m_top15 text-center">Good</h5>';
									else
										str+='<h5 class="bad_color m_top15 text-center">Bad</h5>';
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-8 m_top10">';
								str+='<div class="pad_5_F6F7FF">';
									str+='<div class="row">';
										if($(window).width>800){
											str+='<div class="col-sm-5 m_top10">';
										}else{
											str+='<div class="col-sm-5 ">';
										}
											str+='<h5 class="margin_left_5 f_12 font_weight">Water&nbsp;Quality</h5>';
											if(result.subList[i].waterQuanStatus != null && result.subList[i].waterQuanStatus == "OK")
												str+='<h5 class="good_color margin_left_5 m_top15">Good</h5>';
											else
												str+='<h5 class="bad_color margin_left_5 m_top15">Bad</h5>';
										str+='</div>';
										if($(window).width>800){
											str+='<div class="col-sm-3 m_top10">';
										}else{
											str+='<div class="col-sm-3 ">';
										}
											str+='<div class="border_width_tds">';
												str+='<h5 class="margin_left_5 f_12 font_weight">TDS</h5>';
												str+='<h5 class="margin_left_5 m_top15">'+result.subList[i].tdsCount+'</h5>';
											str+='</div>';
										str+='</div>';
										if($(window).width>800){
											str+='<div class="col-sm-3 m_top10">';
										}else{
											str+='<div class="col-sm-3 ">';
										}
											str+='<div class="border_width_ph">';
												str+='<h5 class="margin_left_5 f_12 font_weight">pH</h5>';
												str+='<h5 class="good_color margin_left_5 m_top15">'+result.subList[i].phCount+'</h5>';
											str+='</div>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<h5 class=""><img src="Assests/images/RMD.png" style="width:25px;"/><span class="font_weight m_left_5">Remote Dispensing Units - '+result.subList[i].rduCount+'</span></h5>';
						str+='<div class="row">';
							str+='<div class="col-sm-6 m_top10">';
								str+='<div class="pad_5_F6F7FF">';
									str+='<div class="border_left_width_water_tank">';
										str+='<h5 class="m_left_5 f_12 font_weight">High Dispence RDU - '+result.subList[i].highDispanceRDUName+'</h5>';
										str+='<h4 class="m_top10  m_left_5">'+result.subList[i].highDispanceRDUCount+' Lts</h4>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-6 m_top10">';
								str+='<div class="pad_5_F6F7FF">';
									str+='<div class="border_left_width_red">';
										str+='<h5 class="m_left_5 f_12 font_weight">Low Dispence RDU - '+result.subList[i].lowDispanceRDUName+'</h5>';
										str+='<h4 class="m_top10  m_left_5">'+result.subList[i].lowDispanceRDUCount+' Lts</h4>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="row">';
							str+='<div class="col-sm-6">';
								str+='<h5 class=""><img src="Assests/images/water_icon.png" style="width:25px;"/><span class="font_weight m_left_5">Water Generated</span></h5>';
								str+='<div class="pad_5_F6F7FF m_top10">';
									str+='<div class="m_top_bottom">';
										if(result.subList[i].mpWaterDispenced != null && result.subList[i].mpWaterDispenced != 'N/A' && result.subList[i].mpWaterDispenced > 0)
											str+='<h4 class="m_left_5">'+result.subList[i].mpWaterDispenced+' Per&nbsp;Lts</h4>';
										else
											str+='<h4 class="m_left_5"> - Per&nbsp;Lts</h4>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-3">';
							str+='<h5 class=""><span class="font_weight m_left_5">Customers</span></h5>';
							str+='<div class="pad_5_F6F7FF m_top20">';
								str+='<div class="m_top_bottom">';
									str+='<h4 class="">'+result.subList[i].customers+'</h4>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-3">';
							str+='<h5 class=""><span class="font_weight m_left_5">Revenue</span></h5>';
							str+='<div class="pad_5_F6F7FF m_top20">';
								str+='<div class="m_top_bottom_5">';
									str+='<h4 class=""> - </h4>';
									str+='<h5 class="f_11">In Lac</h5>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		}
	}
	str+='</div>';
	$("#motherPlantsLowLevelDetailsId").html(str);
	if(result.subList.length>6){
		$(".scrollerDivCls1").mCustomScrollbar({setHeight:'350px'});
	}
}
$(document).on("click",".motherPlantWaterTankDtsCls",function(){
	customStartDate =  moment().subtract(20, 'years').startOf('year').format("DD/MM/YYYY");
	customEndDate = moment().format('DD/MM/YYYY');
	$("#dateRangeForTrainingId").val(customStartDate+'-'+customEndDate);
	$("#mother_plants_Details_water_tank").modal("show");
	var headingId = $(this).attr("attr_head_id");
	var typeId = $(this).attr("attr_type");
	var rduId = $(this).attr("attr_rdu_id");
	$("#rduHeadingId").html(headingId);
	getLast30DaysRDUDetails(rduId,typeId);
	//buildMothePantWaterTankDetails();
});
$(document).on("click",".districtWiseClkCls",function(){
	$("#districtWiseModalDivId").modal("show");
	var districtName = $(this).attr("attr_input_name");
	var headingId = $(this).attr("attr_head_id");
	$("#districtHeadId").html(headingId);
	getNTRSujalaOverviewDetails(districtName,"districtLoad");
});

function getLast30DaysRDUDetails(rduId,type){
	$("#motherPlantsRDUDetailsId").html(spinner);
	var json = {//pj
		//locationId : rduId
		"fromDateStr":customStartDate,
		"toDateStr":customEndDate,
		"deptId":rduId,
		"type":type
	};
	$.ajax({                
		type:'POST',    
		url: 'getLast30DaysRDUDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.subList != null && result.subList.length > 0 ){
			buildMothePantRDUDetails(result,rduId,type);
		}else{
			$("#motherPlantsRDUDetailsId").html('NO DATA AVAILABLE...');
		}
	});
} 
function buildMothePantRDUDetails(result,rduId,type){
	 $("#rduHiddenFieldId").val(rduId);
	$("#rduTypeHiddenFieldId").val(type);	
	var str='';
	var totalCustomersSum = 0;
	var totalDispenseSum = 0;
	$("#rduHeadingId").html(result.name);
	//$("#rduheadingCapacityId").html(result.waterTankCapacity+" Lts");
	str+='<div class="row">';
		str+='<div class="col-sm-4">';
			str+='<div class="pad_border text-center" style="background-color:#E9E9E9;">';
				str+='<h5 class="font_weight">Total Dispence</h5>';
				str+='<h5 class="font_weight m_top10" id="dispenseSumId"></h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-4">';
			str+='<div class="pad_border text-center" style="background-color:#E9E9E9;">';
				str+='<h5 class="font_weight">Customers</h5>';
				str+='<h5 class="font_weight m_top10" id="customerSumId"></h5>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-4">';
			str+='<div class="pad_border text-center" style="background-color:#E9E9E9;">';
				str+='<h5 class="font_weight">WaterTank Capacity</h5>';
				str+='<h5 class="font_weight m_top10">'+result.subList[0].waterTankCapacity+' Lts</h5>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_custom_SC waterDispenceDataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Date</th>';
					str+='<th>Health</th>';
					str+='<th>Water Dispence Lts</th>';
					str+='<th>No.of Customers</th>';
					str+='<th>Old Customers</th>';
					str+='<th>New Customers</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result.subList){
				totalCustomersSum += result.subList[i].totalCustomers;
				totalDispenseSum += result.subList[i].waterDispence;
				str+='<tr>';
					str+='<td>'+result.subList[i].date+'</td>';
					if(result.subList[i].rduHealthStatus != null && result.subList[i].rduHealthStatus == 'OK') {
						str+='<td class="good_color m_top15 text-center">Good</td>';
					} else {
						str+='<td class="bad_color m_top15 text-center">'+result.subList[i].rduHealthStatus+'</td>';
					}
					str+='<td>'+result.subList[i].waterDispence+'</td>';
					str+='<td>'+result.subList[i].totalCustomers+'</td>';
					str+='<td>'+result.subList[i].oldCustomers+'</td>';
					str+='<td>'+result.subList[i].newCustomers+'</td>';
				str+='</tr>';
			}
			
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#motherPlantsRDUDetailsId").html(str);
	$(".waterDispenceDataTable").dataTable({
		"paging":   true,
		"info":     true,
		"searching": true,
		"autoWidth": true,
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, "All"]]
	});
	$("#customerSumId").html(totalCustomersSum);
	$("#dispenseSumId").html(totalDispenseSum+'&nbsp; Lts');
}
$(document).on("click",function(){
	setTimeout(function(){
		if (!($("#mother_plants_Details,#mother_plants_Details_water_tank,#districtWiseModalDivId").hasClass( "in" ))) {
			$('body').removeClass("modal-open");
		}else{
			$('body').addClass("modal-open");
		}
	}, 500); 
}); 
function buildRDUsOverviewDetails(result,type){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_Ntr_Custom1 rdusTableCls">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>District</th>';
					str+='<th>Mandal</th>';
					str+='<th>Mother&nbsp;Plant</th>';
					str+='<th>RDU&nbsp;Name</th>';
					str+='<th>Health</th>';
					str+='<th>Location</th>';
					str+='<th>Water&nbsp;Tank&nbsp;Capacity</th>';
					str+='<th>Today&nbsp;Water&nbsp;Dispence</th>';
					str+='<th>Total Customers</th>';
					str+='<th>Old Customers</th>';
					str+='<th>New Customers</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			if(result != null && result.length > 0){
				//if(type != null && type == 'total'){
				for(var i in result){
					if(result[i].district != "HYDERABAD") {
						str+='<tr>';
							str+='<td class=>'+result[i].district+'</td>';
							str+='<td>'+result[i].mandal+'</td>';
							str+='<td>'+result[i].mpName+'</td>';
							str+='<td class="text_left motherPlantWaterTankDtsCls" attr_type="'+result[i].name+'" attr_head_id="'+result[i].name+'" attr_rdu_id="'+result[i].id+'" style="cursor:pointer;"><a>'+result[i].name+'</a></td>';
							if(result[i].health != null && result[i].health == 'OK'){
								str+='<td class="good_color"><p ><i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;Good </p></td>';
							}else{
								str+='<td class="bad_color"><p ><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;'+result[i].health+' </p></td>';
							}
							str+='<td>'+result[i].location+'</td>';
							str+='<td>'+result[i].waterTankCapacity+'</td>';
							str+='<td>'+result[i].mpSafeWaterDispenced+'</td>';
							str+='<td>'+result[i].totalCustomers+'</td>';
							str+='<td>'+result[i].oldCustomers+'</td>';
							str+='<td>'+result[i].newCustomers+'</td>';
						str+='</tr>';
					}
				}
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#rdusOverviewId").html(str);
	$(".rdusTableCls").dataTable({
		"paging":   true,
		"info":     true,
		"searching": true,
		"autoWidth": true,
		//"sDom": '<"top"iflp>rt<"bottom"><"clear">',
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, "All"]]
	});
}

function getNtrSujalaWaterDispenceTrending(type){
	$("#waterDispenseChartId").html(spinner);
	var year = $("#dateYearId").val();
	var json = {
		"yearsStr":year,   
		"type": type
	};
	$.ajax({                
		type:'POST',    
		url: 'getNtrSujalaWaterDispenceTrending',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null)
			buildNtrSujalaWaterDispenceTrending(result);
		else
			$("#waterDispenseChartId").html('NO DATA AVAILABLE...');
	});
}
function buildNtrSujalaWaterDispenceTrending(result) {
	var categoriesArr=[];
	var dataArr=[];
	for(var i in result.subList){
		var categeoriesList = result.subList[i].name;
		categoriesArr.push(categeoriesList);
		dataArr.push({"y":result.subList[i].dispenceWaterQuantity});
	}
	Highcharts.chart('waterDispenseChartId', {
		chart: {
			type: 'line'
		},
		title: "",
		xAxis: {
			categories: categoriesArr
		},
		yAxis: {
			title: {
				
				text: 'S e l l W a t e r I n L t s'
			},
			min: 0
		},	
		 tooltip: {
			formatter: function() {
				return 'Dispatched ' + this.y + ' Lts';
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: false
				},
				enableMouseTracking: true
			}
		},
		legend: {
			enabled:false
		},
		series: [{
			name: '',
			color: '#4E61AA',
			data: dataArr
		}]
	});
}
function buildNTRSujalaRdusMotherStatus(result,type){
var str='';
	if(type == "rdu"){
		str="<h5 class='font_weight'>RDU plants</h5>";
	}else if(type == "mp") {
		str="<h5 class='font_weight'>Mother plants</h5>";
	}
		str+="<table class='table borderNone'>";
			str+="<tbody>";
				for(var i in result){
					str+="<tr>";
						if(result[i].name != null && result[i].name == 'OK'){
							str+="<td class='good_color'><div class='media' style='width:140px;'><div class='media-left'><i class='fa fa-check-circle' aria-hidden='true' ></i>&nbsp;Good</div></div></td>";
						}
						else{
							if(result[i].name.length>11){
								str+="<td class='bad_color'><div class='media' style='width:140px;'><div class='media-left toolTipCls' title="+result[i].name+"><i class='fa fa-times-circle' aria-hidden='true'></i>&nbsp;"+result[i].name.substring(0,11)+".. </div></div></td>";//pj
							} else {
								str+="<td class='bad_color'><div class='media' style='width:140px;'><div class='media-left'><i class='fa fa-times-circle' aria-hidden='true'></i>&nbsp;"+result[i].name.substring(0,11)+" </div></div></td>";
							}
						}
						str+="<td>"+result[i].activeRDUs+"</td>";
						str+="<td class='text-success'>"+result[i].activeRDUsPerc+"%</td>";
					str+='</tr>';
				}
			str+="</tbody>";
		str+="</table>";
	if(type == "rdu"){
		$("#rdusId").attr('data-content',str);
	}else if(type == "mp"){
		$("#motherId").attr('data-content',str);
	}
	$('[data-toggle="popover"]').popover();
	$(".toolTipCls").tooltip();
}