var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var mainBlockDevITOverView=['getcitywiseDetailsForProperty','getDeveloperPropertyOverviewDetails','getItCompanyPropertyOverviewDetails','getPendingLevelPropertiesDetails','getPendingLevelOverviewDetails','getDtpStatusBuildingSpaceDetails'];//Developer , ITCOMPANY,Staus Properties
var govtFlowAndStatusWiseBuilding=['getBuildingStatusDetails'];//Flow ,Status

onloadCalls();
function onloadCalls(){
	$('.tooltipTitle').tooltip();
	$(".select-chosen").chosen();
	$("#developerPropertyOverviewDetailsId").html(spinner);
	$("#itCompanyPropertyOverviewDetailsId").html(spinner);
	$('#pendingLevelPropertiesDetailsId').html(spinner);
	$("#PropertiesOccupancyDivId").html(spinner);
	$("#locationWiseDetailsDivId").html(spinner);
	$("#propertyCompanyOverViewBlockId").html(spinner);
	$("#districtWisePropartyDivId").html(spinner);
	callFilterCalls(1,"getAllDistrictsForDashBoard","filters","districtSelId");
	callFilterCalls(1,"getAllCompanyNamesForDashBoard","filters","companySelId");
	callFilterCalls(1,"getAllPendingOfficalNameForDashBoard","filters","pendingLevelSelId");
	callFilterCalls(0,"getAllOccupancyForDashBoard","filters","occupancySelId");
	callFilterCalls(0,"getAllCityNameForDashBoard","filters","citySelId")
	for(var i in mainBlockDevITOverView){
		getDeveloperOrITCompanyPropertyOverviewDetails(mainBlockDevITOverView[i]);
	}
	var json={
		url:"getBuildingStatusDetails",
		type:"GovernmentProperties"
	}
	var json2={
		url:"getBuildingStatusDetails",
		type:"SubmitedProperties"
	}
	var json3={
	  "locationId":0, // DistrictId
	  "typeId":0, // CityId
	  "facilityTypeId":0, // CompanyId
	  "statusId":0, // Pending Offcial
	  "buildingTypeId":0, // Occupancy  buildLocationBlock
	  "type":"All",
	  "url":"getAllPropertyDetailsListForDashBoard"
	}
	json4={
		url:"getApplicationPendingOverViewDetails"
	}
	getPendingLevelAndBuildingDtpStatusOverviewDetails( json,"GovernmentProperties","dtpStatusPropertiesDivId");
	//getPendingLevelAndBuildingDtpStatusOverviewDetails( json2,"SubmitedProperties","submitedPropertiesDivId");
	getPendingLevelAndBuildingDtpStatusOverviewDetails( json3,"LocationWisePropertiesForBuilding","locationWiseDetailsDivId");
	getPendingLevelAndBuildingDtpStatusOverviewDetails( json4,"pendingTimeLineOverview","pendingTimeLineOverviewId");
}              

function getDeveloperOrITCompanyPropertyOverviewDetails(blockTypeURL){ //Main Block Developer And ITCompany	
	var json={
		url:blockTypeURL
	}
	$.ajax({
		type:'POST',
		url:'getDeveloperOrITCompanyPropertyOverviewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(blockTypeURL == 'getDeveloperPropertyOverviewDetails'){
			buildMainBlockDevITOverView(result,'developerPropertyOverviewDetailsId',"DEVELOPER","getBuildingDetailsByclick");
		} else if(blockTypeURL == 'getItCompanyPropertyOverviewDetails'){
			buildMainBlockDevITOverView(result,'itCompanyPropertyOverviewDetailsId',"ITCOMPANIES","getITCompanyDetailsBYAprovalStatus");
		}else if(blockTypeURL == 'getPendingLevelPropertiesDetails'){
			//buildStatusPropertiesDetails(result,'statusPropertiesDetailsDivId');
		}else if(blockTypeURL == 'getPendingLevelOverviewDetails'){
			buildPendingLevelPropertiesDetails(result);
		} else if(blockTypeURL == 'getDtpStatusBuildingSpaceDetails'){
			buildPropertiesOccupancyDetails(result);
		}else if(blockTypeURL =='getSpaceAvaialabilityDetails'){
			//showAvailableBuildingDetails(result);
		}else if(blockTypeURL =='getcitywiseDetailsForProperty'){
			buildCitywiseDetailsForProperty(result);
				
		}
	}) 
}

function getPendingLevelAndBuildingDtpStatusOverviewDetails(json,type,divId){ //Government Approval Process Flow And Status Buildings,Non DTP Status Buildings Blocks
	$('#'+divId).html(spinner);	
	$.ajax({
		type:'POST',
		url:'getPendingLevelAndBuildingDtpStatusOverviewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if(type == 'GovernmentProperties' ){
			buildStatusBuildingDetails(result,type,divId,type);
		 }/*  if( type == 'SubmitedProperties' ){
			 buildStatusBuildingDetails(result,type,divId,type);
		 } */else if(type == 'LocationWisePropertiesForBuilding'){
			buildLocationWiseStatusBuildingDetails(result,divId);
		}else if(type == 'filters'){
			buildLocationBlock(result,divId);
		}else if(type == "PropertiesOccupancyView"){
			buildLocationWiseStatusBuildingDetails(result,"propertyDetailsDivId")
		}else if(type == 'LocationWisePropertiesForITCompany'){
			buildLocationWiseStatusITcompanyDetails(result);
		}else if(type == "pendingTimeLineOverview"){
			buildPendingTimeLineOverview(result);
		}else if(type ==  "CheckAvailableSpace"){
			showAvailableBuildingDetails(result);
		}
	}) 
}
function buildLocationWiseStatusITcompanyDetails(result){
	console.log("it Companies Details " + result);
	var str='';
	 if($(window).width() < 800)
	{
		str+='<div class="table-responsive m_top20">';
	} else {
		str+='<div class="m_top20">';
	}
		str+='<table class="table table_custom_SC table-bordered dataTablelocationWiseForITcompany" id="dataTablelocationWiseForITcompanyTableId" style="border:1px solid #ccc;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>IT COMPANY NAME</th>';
					str+='<th>REQUESTED PROPERTY NAME</th>';
					str+='<th>CITY</th>';
					str+='<th>REQUESTED DATE</th>';
					str+='<th>REQUESTED ITSPACE IN SQFT</th>';
					str+='<th>NO.OF.FLOORS</th>';
					str+='<th>PENDING LEVEL</th>';
					str+='<th>STATUS</th>';
					str+='<th>ACTIONS</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				str+='<tr>';
					str+='<td style="text-align: left !important;">'+result[i].name+'</td>';
					str+='<td style="text-align: left !important;">'+result[i].buildingName+'</td>';
					str+='<td>'+result[i].districtName+'</td>';
					str+='<td style="text-align: left !important;">'+result[i].requestedDate+'</td>';
					if(result[i].areaInSQFT != null || result[i].areaInSQFT != 0){
					str+='<td>';
						str+='<img src="Assests/images/area_icon.png" alt="..." class="">';
						str+='<span class="f_12 font_weight">'+result[i].areaInSQFT+'</span>';          
					str+='</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].noOfFloor > 0) {
						str+='<td>'+result[i].noOfFloor+'</td>';
					} else {
						str+='<td>-</td>';
					}
					if(result[i].subStatus != null && result[i].subStatus.length > 0 ){              
					str+='<td class="text-success">'+result[i].subStatus+'</td>';
					}else{
						str+='<td>-</td>';
					}
					if(result[i].pendingAt != null && result[i].pendingAt.length > 0 ){
						if(result[i].pendingAt == "Final Approval") {
							str+='<td class="text-success">Approved</td>';
						} else {
							str+='<td class="text-success">'+result[i].pendingAt+'</td>';
						}
					}else{
						str+='<td>-</td>';
					}
					str+='<td><i style="cursor:pointer;" attr_heading_name="ITC Software" attr_building_id="'+result[i].buildingDetailsId+'" attr_requisition_id="'+result[i].id+'" attr_prop_type="ITCompany" aria-hidden="true" title="" class="fa fa-eye fa-lg buildingdetailsCls removeModalCls tooltipCls" data-original-title="view Details"></i></td>';
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#locationWiseDetailsDivId").html(str);
	$(".tooltipCls").tooltip();
	$("#dataTablelocationWiseForITcompanyTableId").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
	  });
	  $(".dataTables_filter").css("float","right");	
		
}
function buildStatusBuildingDetails(result,type,divId,blockType){
	$('#'+divId).html(spinner);
	var str='';
	//var seatsCount = result.availableSum/100;
	var objName = ["Total","Not Approved","Approved","Occupied","Available"];
	
		$('#goveApprovedCntId').html(result.appliedItCompanyCount);
		$('#goveApprovedsqftCntId').html(result.govermentapprovedspace+'&nbsp;<span class="font_12">Sqft</span>');
		$('#totPropertiesCntId').html(result.count);
		$('#totPropertiessqftCntId').html(result.sum+'&nbsp;<span class="font_12">Sqft</span>');
		
		str+='<div class="table-responsive white_block_border">';
			str+='<table class="table table-bordered table_custom_SC propertyTableCls">';
				str+='<thead>';
					str+='<tr>';
						str+='<th style="background-color:#fff;"></th>';
						for(var i in objName) {
							str+='<th style="background-color:#fff;">'+objName[i]+'</th>';
						}
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result.subList) {
					str+='<tr>';
						str+='<td style="text-align:left !important;">'+result.subList[i].name+'</td>';
						str+='<td>'+result.subList[i].totalPropertiesCount+'</td>';
						str+='<td>'+result.subList[i].notApproved+'</td>';
						str+='<td>'+result.subList[i].approved+'</td>';
						str+='<td>'+result.subList[i].occupiedCount+'</td>';
						str+='<td>'+result.subList[i].availabe+'</td>';
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
				
			/* if(type == "SubmitedProperties") {
						str+='<div class="col-sm-6" style="border-right:1px solid #707070;">';
							str+='<div class="row">';
								str+='<div class="col-sm-6">';
									str+='<h6 class="text_lt_blue font_weight">Overall</h6>';
								str+='</div>';
								str+='<div class="col-sm-6">';
									str+='<h6 class="text_lt_blue font_weight">Total</h6>';
								str+='</div>';
							str+='</div>';
							str+='<div class="pad_15 m_top10 white_block_border">';
							
								str+='<div class="row">';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text_lt_blue font_weight">Floors</h6>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<h4 class="font_weight font_16">'+result.floorcount+'</h4>';
									str+='</div>';
								str+='</div>';
								str+='<div class="row m_top15">';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text_lt_blue font_weight">Wings</h6>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<h4 class="font_weight font_16">'+result.wingCount+'</h4>';
									str+='</div>';
								str+='</div>';
								str+='<div class="row m_top15">';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text_lt_blue font_weight">IT Usable Area</h6>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<h4 class="font_weight font_16" id="ITUsableCountId">'+result.availableSum+'<span class="font_12"> Sqft</span></h4>';
									str+='</div>';
								str+='</div>';
								str+='<div class="row m_top15">';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text_lt_blue font_weight">Seats</h6>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<h4 class="font_weight font_16">'+Math.round(seatsCount)+'</h4>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
			}
			if(type == "GovernmentProperties") {
							str+='<div class="col-sm-6">';
								str+='<div class="row">';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text_lt_blue font_weight">Approved</h6>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text_lt_blue font_weight">Total</h6>';
									str+='</div>';
								str+='</div>';
								str+='<div class="pad_15 m_top10 white_block_border">';
									str+='<div class="row">';
										str+='<div class="col-sm-6">';
											str+='<h6 class="text_lt_blue font_weight">Floors</h6>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<h4 class="font_weight font_16">'+result.floorcount+'</h4>';
										str+='</div>';
									str+='</div>';
									str+='<div class="row m_top15">';
										str+='<div class="col-sm-6">';
											str+='<h6 class="text_lt_blue font_weight">Wings</h6>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<h4 class="font_weight font_16">'+result.wingCount+'</h4>';
										str+='</div>';
									str+='</div>';
									str+='<div class="row m_top15">';
										str+='<div class="col-sm-6">';
											str+='<h6 class="text_lt_blue font_weight">IT Usable Area</h6>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<h4 class="font_weight font_16">'+result.availableSum+'<span class="font_12"> Sqft</span></h4>';
										str+='</div>';
									str+='</div>';
									str+='<div class="row m_top15">';
										str+='<div class="col-sm-6">';
											str+='<h6 class="text_lt_blue font_weight">Seats</h6>';
										str+='</div>';
										str+='<div class="col-sm-6">';
											str+='<h4 class="font_weight font_16">'+Math.round(seatsCount)+'</h4>';
										str+='</div>';
									str+='</div>';
									str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			} */
								
	$("#"+divId).html(str);
}
function buildPropertiesOccupancyDetails(result) {
	/* var OccupancyColoObj={"0 %":"#FEF7E5","1 % to 30 %":"#FFEFD0","31 % to 60 %":"#FFE1A4","61 % to 80 %":"#FEC74E","81 % to 100 %":"#FDBB11"}; */
	var OccupancyImgObj={"0 %":"DTP_0","1 % - 30 %":"DTP_30","31 % - 60 %":"DTP_60","61 % - 80 %":"DTP_80","81 % - 90 %":"DTP_90","91 % - 100%":"DTP_100"};
	var spaceCnt;
	$('#occupiedSpaceCntId').html(result.occupiedSum+'&nbsp;<span class="font_12">Sqft</span>');
	spaceCnt=Math.round(result.occupiedSum/100);
	$("#occupiedSpaceCntstId").html("Seats "+spaceCnt);
	$('#availableSpcCntId').html(result.availableSum+'&nbsp;<span class="font_12">Sqft</span>');
	spaceCnt=Math.round(result.availableSum/100);
	$("#availableSpcCntstId").html("Seats "+spaceCnt);
	var str='';
		var count=0;
		str='<div class="table-responsive white_block_border m_top10">';
			str+='<table class="table propertyCls">';
				str+='<tbody>';
					str+='<tr>';
					for(var i in result.subList){
						count=i+1;
						str+='<td>';
							str+='<h5 class="text_lt_blue" style="font-size:13px;">'+result.subList[i].name+'</h5>';       
							if(result.subList[i].count != 0){
								str+='<h4 class="font_weight m_top15 font_16 propertiesOccupancyViewCls" attr_url="getAllPropertyDetailsListForDashBoard" attr_heading="Properties Occupancy overview" attr_occupancy_val="'+result.subList[i].occupiedPerc+'" style="cursor:pointer;">'+result.subList[i].count+'<img class="pull-right" src="Assests/images/'+OccupancyImgObj[result.subList[i].name]+'.png" alt="..."></h4>';
							} else {
								str+='<h4 class="m_top15"> - <img class="pull-right" src="Assests/images/'+OccupancyImgObj[result.subList[i].name]+'.png" alt="..."></h4>';
							}
						str+='</td>';
						if(count %3==0){
							str+='</tr>';
							str+='<tr>';
						}
						
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		$("#occupiedCompId").html(result.occupiedCount);
		$("#notOccupiedCompId").html(result.nonoccupiedcompany);
	$("#propertyCompanyOverViewBlockId").html(str);
}
function buildLocationWiseStatusBuildingDetails(result,divId){
	console.log("JSON Data" +divId);
	var str='';
	/* if($(window).width() < 800)
	{
		str+='<div class="table-responsive m_top20">';
	} else {
		str+='<div class="m_top20">';
	} */
	str+='<div class="table-responsive m_top20">';
		str+='<table class="table table_custom_SC dataTablelocationWise table-bordered" id="'+divId+'dataTableId" style="border:1px solid #ccc;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2" style="text-align:left !important; width:100%;">PROPERTY NAME</th>';
					str+='<th rowspan="2">CITY</th>';
					str+='<th rowspan="2">REQUESTED DATE</th>';
					str+='<th rowspan="2">BUILDING TYPE</th>';
					str+='<th rowspan="2">AREA IN SQFT</th>';
					str+='<th rowspan="2">Total SEATING CAPACITY</th>';
					str+='<th colspan="4">AVAILABILITY</th>';
					str+='<th rowspan="2">Approval Status</th>';

					str+='<th rowspan="2">OCCUPIED %</th>';
					str+='<th rowspan="2">ACTIONS</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th>FLOORS</th>';
					str+='<th>SEATS</th>';
					str+='<th>WING</th>';
					str+='<th>SEATS</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result) {
				str+='<tr>';
				/* if(divId != "propertyDetailsDivId") {
					if(result[i].buildingName.length>18) {
						str+='<td style="text-align: left !important; min-width:15%;">';//pj
							str+='<h5 class="font_weight font_14 text-capital"><i class="fa fa-plus-circle buildDetClkCls" attr_sub_blc_id="buildDetSubBlock'+i+'" attr_building_id="'+result[i].id+'" style="color:green;font-size:20px;cursor:pointer;"></i>&nbsp;&nbsp;<span class="tooltipCls" title="'+result[i].buildingName+'">'+result[i].buildingName.substring(0,18)+'...</span></h5>';
						str+='</td>';
					} else {
						str+='<td style="text-align: left !important; min-width:15%;">';
							str+='<h5 class="font_weight font_14 text-capital"><i class="fa fa-plus-circle buildDetClkCls" attr_sub_blc_id="buildDetSubBlock'+i+'" attr_building_id="'+result[i].id+'" style="color:green;font-size:20px;cursor:pointer;"></i>&nbsp;&nbsp;'+result[i].buildingName.substring(0,18)+'</h5>';
						str+='</td>';
					}
				} else {
					str+='<td style="text-align: left !important;">';
						str+='<h5 class="font_weight font_14 text-capital">'+result[i].buildingName+'</span></h5>';
					str+='</td>';
				} */
				if(result[i].buildingName.length>18) {
					str+='<td class="buildDetClkCls" attr_header="'+result[i].buildingName+'" attr_building_id="'+result[i].id+'" style="text-align: left !important; min-width:15%;"><a class="tooltipCls" title="'+result[i].buildingName+'">'+result[i].buildingName.substring(0,18)+'...</a></td>';
				} else {
					str+='<td class="buildDetClkCls" attr_header="'+result[i].buildingName+'" attr_building_id="'+result[i].id+'" style="text-align: left !important; min-width:15%;"><a>'+result[i].buildingName.substring(0,18)+'</a></td>';
				} 
					str+='<td>'+result[i].districtName+'</td>';
					str+='<td>'+result[i].requestedDate+'</td>';
					str+='<td>';
						if(result[i].buildingType == "Fully Plug & Play") {
							str+='<img src="Assests/images/plug_icon.png" class="">&nbsp';
						} else {
							str+='<img src="Assests/images/semiPlug_icon.png" class="">&nbsp';
						}
						str+='<span class="f_12 font_weight">'+result[i].buildingType+'</span>';
					str+='</td>';
					str+='<td><img src="Assests/images/area_icon.png" class="">&nbsp';
						str+='<span class="f_12 font_weight">'+result[i].areaInSQFT+'</span></td>';
					str+='<td><img src="Assests/images/seat_icon.png" class="">&nbsp;&nbsp';
						str+='<span class="f_12 font_weight">'+result[i].seatingCapicity+'</span></td>';
					if(result[i].noOfFloor != undefined){
						str+='<td>'+result[i].noOfFloor+'&nbsp<span class="text-success">('+Math.round(result[i].isActive)+'%)</span></td>';
						str+='<td>'+result[i].itUsableArea+'</td>';
					}else{
						str+='<td>-</td>';
						str+='<td>-</td>';
					}
					if(result[i].noOfWing != undefined){
						str+='<td>'+result[i].noOfWing+'&nbsp<span class="text-success">('+Math.round(result[i].leasedPendingTime)+'%)</span></td>';
						str+='<td>'+result[i].commonArea+'</td>';
					}else{
						str+='<td>-</td>';
						str+='<td>-</td>';
					}
					
					str+='<td class="text-success">'+result[i].subStatus+'</td>';
					str+='<td class="text-success">'+result[i].occupiedItSpace+'%</td>';
					str+='<td><i class="fa fa-eye fa-lg buildingdetailsCls removeModalCls tooltipCls" title="view Details"aria-hidden="true"  attr_building_id="'+result[i].id+'" attr_heading_name="'+result[i].buildingName+'" style="cursor:pointer;"></i></td>';
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#"+divId).html(str);
	$(".tooltipCls").tooltip();
	$("#"+divId+'dataTableId').dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
	  });
	 // $(".dataTables_filter").css("float","right");
	
	
}
function buildMainBlockDevITOverView(result,divId,propertyType,ajaxUrl){
	var blockColors ={'Registered Properties':'#7D5622','Approved':'#0D955C','In Progress':'#FDBB11','Pending':'#F36F23','Rejected':'#EE1F25'}
	var str ='';
	str+='<div class="pad_border">';
		str+='<div class="media">';
			if(divId == 'developerPropertyOverviewDetailsId'){
				str+='<div class="media-left">';				
					str+='<img src="Assests/img/icon-developers.png"/>';
				str+='</div>';
				str+='<div class="media-body">';
					str+='<h5 class="font_weight m_top10">DEVELOPERS</h5>';
				str+='</div>';
			}else if(divId =='itCompanyPropertyOverviewDetailsId'){
				str+='<div class="media-left">';				
					str+='<img src="Assests/img/icon-itcompanies.png"/>';
				str+='</div>';
				str+='<div class="media-body">';
					str+='<h5 class="font_weight m_top10">IT COMPANIES</h5>';
				str+='</div>';
			}		
		str+='</div>';
			for(var i in result){
				if( i%2 == 0){
					str+='<div class="row">';
				}
				str+='<div class="col-sm-6 m_top10">';
				if(result[i].name == 'Registered Companies'){
					str+='<div class="panel panel-default mb_0" style="background-color:#122E44; color:#fff; border:none;">';
				} else {
					str+='<div class="panel panel-default mb_0" style="border:1px solid '+blockColors[result[i].name]+';">';
				}
						str+='<div class="panel-body">';
							str+='<div class="row text-center">';
								str+='<div class="col-sm-7">';
								if(result[i].name != null){
									str+='<h5 class="font_weight text-capital text-center">'+result[i].name+'</h5>';
								}else{
									str+='<h5>-</h5>';
								}
								str+='</div>';
								str+='<div class="col-sm-5">';
								if(result[i].name == 'Registered Companies'){
									if(result[i].count != null && result[i].count>0){
										str+='<h3 class="font_weight devItOverviewCls" attr_url="getCompanyDetailsByEnterPriseType" attr_type_comp="'+propertyType+'" attr_heading_type="REGISTERED COMPANIES" attr_block_type="mainBlock" attr_level_type="'+result[i].name+'" style="margin-right: 20px;cursor:pointer;" attr_prop_status="'+propertyType+'">'+result[i].count+'</h3>';
									}else{
										str+='<h3 class="font_weight"> - </h3>';
									}	
								} else {
									if(result[i].count != null && result[i].count > 0){
										if(result[i].name == "Registered Properties" || result[i].name == "Requested Properties" ) {
											str+='<h3 class="font_weight devItOverviewCls" attr_status_id="'+result[i].id+'" attr_url="'+ajaxUrl+'" attr_heading_type="'+result[i].name+'" attr_block_type="statusBlock" attr_level_type="'+result[i].name+'" style="cursor:pointer;" attr_prop_status="'+propertyType+'">'+result[i].count+'</h3>';
										}else {
											str+='<h3 class="font_weight devItOverviewCls" attr_status_id="'+result[i].id+'" attr_url="'+ajaxUrl+'" attr_heading_type="'+result[i].name+'" attr_block_type="statusBlock" attr_level_type="'+result[i].name+'" style="cursor:pointer;" attr_prop_status="'+propertyType+'">'+result[i].count+' <span class="font_12" style="color:'+blockColors[result[i].name]+';">'+result[i].percentage+'%</span></h3>';
										}
									}else{
										str+='<h3>-</h3>'; 
									}
								}	
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
					if( i%2 == 1){
					str+='</div>';
				}
			}
		str+='</div>';
	str+='</div>';
	$('#'+divId).html(str);
}
function buildPendingLevelPropertiesDetails(result){
	var count=0;
	var globalTitleArr=["Pending"];
	var processClr={'Applicant':'#E6EBF4','Staff':'#CCB064','CEO - INFRA/CEO Promotions':'#CCB064','Technical Team':'#CCB064','JD Promotions':'#CCB064','HMIT':'#CCB064',}
	var tableView='';
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table-bordered">';
			tableView+='<tbody>';
				tableView+='<tr>';
					tableView+='<td class="font_weight"></td>';
					for(var j in result[0].subList){
						tableView+='<td class="font_weight text-capital headingTitleCls'+j+'">'+result[0].subList[j].name+'</td>';	
							globalTitleArr.push(result[0].subList[j].name);			
					}	
				tableView+='</tr>';
				for(var i in result){
					tableView+='<tr>';
						tableView+='<td>';
						if(result[i].name != null){
							tableView+='<h5 class="font_weight m_top10 text-capital">'+result[i].name+'</h5>';
						}else{
							tableView+='<h5 class="font_weight m_top10"> - </h5>';
						}									
						tableView+='</td>';
						count++;
						if( result[i].name == "developer"){
							count=1;
							for(var j in result[i].subList){
								if(result[i].subList[j].count != null && result[i].subList[j].count >0){
									tableView+='<td style="vertical-align: middle;"><h5 class="font_weight label p_lr15 devItOverviewCls" attr_status_id="'+result[i].subList[j].id+'" attr_url="getBuildingDetailsByclick" attr_heading_type="'+result[i].subList[j].name+'&nbsp;pending Work" attr_block_type="pendingBlock" attr_prop_status="DEVELOPER" attr_level_type="" attr_state_type="3" style="background-color:'+processClr[result[i].subList[j].name]+';font-size:16px !important; cursor:pointer; color:#000">'+result[i].subList[j].count+'</h5></td>';
								}else{
									tableView+='<td style="vertical-align: middle;"><h5 class="font_weight label p_lr15" style="background-color:'+processClr[result[i].subList[j].name]+';font-size:16px !important;color:#000">-</h5></td>';
								}
								count++;
							}
						}else {
							count=1;
							for(var j in result[i].subList){
								if(result[i].subList[j].name == "Technical Team"){
									tableView+='<td></td>';
								} else {
									if(result[i].subList[j].count != null && result[i].subList[j].count >0){
										tableView+='<td style="vertical-align: middle;"><h5 class="font_weight label p_lr15 devItOverviewCls" attr_status_id="'+result[i].subList[j].id+'" attr_url="getITCompanyDetailsBYAprovalStatus" attr_heading_type="'+result[i].subList[j].name+'&nbsp;pending Work" attr_block_type="pendingBlock" attr_prop_status="ITCOMPANIES" attr_level_type="" attr_state_type="2" style="background-color:'+processClr[result[i].subList[j].name]+';font-size:16px !important; cursor:pointer; color:#000">'+result[i].subList[j].count+'</h5></td>';
									}else{
										tableView+='<td style="vertical-align: middle;"><h5 class="font_weight label p_lr15" style="background-color:'+processClr[result[i].subList[j].name]+';font-size:16px !important;color:#000">-</h5></td>';
									}	
								}
								count++;
							}
						}
					tableView+='</tr>';
				}
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	$('#pendingLevelPropertiesDetailsId').html(tableView);
}

$(document).on("click",".devItOverviewCls",function(){
	var url = $(this).attr("attr_url");
	var type_comp = $(this).attr("attr_type_comp");	
	var block_type = $(this).attr("attr_block_type");
	var status_id = $(this).attr("attr_status_id");
	var level_type = $(this).attr("attr_level_type");
	var title = $(this).attr("attr_heading_type");
	var attrStateType=$(this).attr('attr_state_type');
	var attrPropStatus=$(this).attr('attr_prop_status');
	var attrStatus=$(this).attr('attr_status');
	$('#propertyDetailsModalId').modal("show");
	$('#headingTitle').html(title.toUpperCase()+"  DETAILS");
	if(block_type =="statusBlock"){
		if( title !="Registered Properties" && attrPropStatus == "DEVELOPER"){
			$('#headingTitle').html(title.toUpperCase()+" PROPERTIES DETAILS");
		}else if(title !="Requested Properties" && attrPropStatus == "ITCOMPANIES"){
			$('#headingTitle').html(title.toUpperCase()+" IT COMPANIES DETAILS");
		}
		if(level_type != "Approved"){ 
			level_type="overView"
		}
	}
	if(block_type=="pendingBlock"){
		getCompanyDetailsByEnterPriseType(url,type_comp,block_type,status_id,level_type,attrStateType,attrPropStatus,attrStatus);
	}
	else{
		getCompanyDetailsByEnterPriseType(url,type_comp,block_type,status_id,level_type,attrStateType,attrPropStatus,attrStatus);
	}
});

function getCompanyDetailsByEnterPriseType(url,type_comp,block_type,status_id,level_type,state_type,attrPropStatus,attrStatus){ 
	console.log("Test Data " +url);
	$('#propertyDetailsDivId').html(spinner);
	$('#pendingSummeryDivId').html('')
	if(block_type == "mainBlock"){
		var jsonObj= {
			type: type_comp,
			url: url 
		}
	}else if(block_type == "statusBlock"){
		if(level_type == "Approved"){
			block_type="dtpPropertyBlock";
		}
		var jsonObj= {
			statusId: status_id,
			url: url ,
			type: level_type
		}
	}else if(block_type == "pendingBlock" && state_type=="1"){
		var jsonObj= {
			url: url ,
			type: level_type
		}
	}else if(block_type == "pendingBlock" && state_type=="2"){
		var jsonObj= {
			type: level_type,
			pendingLevelId: status_id,
			url: url 
		}
	}else if(block_type == "pendingBlock" && state_type=="3"){
		var jsonObj= {
			pendingLevelId: status_id,
			url: url 
		}
	}else if(block_type == "dtpPropertyBlock" && state_type == "1"){
		var jsonObj= {
			subStatusIds:[17],
			url: url ,
			type: level_type
		}
	}else if(block_type == "dtpPropertyBlock" && (state_type == "2" || state_type == "3" || state_type == "4")){
		var jsonObj= {
			url: url ,
			type: level_type
		}
	}else if(block_type == "GovernmentProperties"){
		var jsonObj= {
			status: attrStatus,
			type: level_type,
			subStatusIds:[17],
			url: url
		}
	}else if(block_type == "SubmitedProperties"){
		if(attrStatus== "" ){
			attrStatus =0
		}
		var jsonObj= {
			buildingTypeId: attrStatus,
			type: level_type,
			url: url
		}
	}			
	$.ajax({
		url:"getBuildingDetailsViewDetails",
		type : "POST",
		data: JSON.stringify(jsonObj) ,       
		 dataType: 'json', 
		 beforeSend: function(xhr) {
		   xhr.setRequestHeader("Accept", "application/json");
		   xhr.setRequestHeader("Content-Type", "application/json"); 
	 },
	  success : function(ajaxresp) {
		if(attrPropStatus == "DEVELOPER"){
			if(block_type == "mainBlock"){
				buildItAndConstructionCompanyDetails(ajaxresp);
			}else{
				buildBuildingdetails(ajaxresp,block_type,status_id);
			}
		}else if(attrPropStatus == "ITCOMPANIES"){
			if(block_type == "mainBlock"){
				buildItAndConstructionCompanyDetails(ajaxresp);
			}else{
				buildItCompanyDetails(ajaxresp,block_type,status_id);
			}
		}
	  },
	  error:function(error,request){
		console.log("UNABLE TO DISPLAY");
	  }
	});
}
function buildItAndConstructionCompanyDetails(result){
	console.log("Test Data " +result);
	var table="";
	if($(window).width() < 800)
	{
		table+='<div class="table-responsive">';
	} else {
		table+='<div>';
	}
		table+='<table class="table table-bordered" id="companyTableId">';
			table+='<thead>';
				table+='<tr >';
					table+='<th>ENTERPRISE NAME </th>';
					table+='<th>REGISTRATION DATE </th>';
					table+='<th>BUSINESS TYPE</th>';
					table+='<th>OWNER NAME</th>';
					table+='<th>ADDRESS </th>';
				table+='</tr>';
			table+='</thead>';
			table+='<tbody>';
			for( var i in result){
				table+='<tr>';
					table+='<td style="text-align:left !important;">'+result[i].enterpriserName+'</td>';
					console.log("Test Data " +result[i].enterpriserName);
					if(result[i].regDate != undefined){
						table+='<td>'+result[i].regDate+'</td>';
						console.log("Test Data " +result[i].regDate);
					}else{
						table+='<td>-</td>';
					}
					if(result[i].businessTypeName != undefined){
						table+='<td>'+result[i].businessTypeName+'</td>';
						console.log("Test Data " +result[i].businessTypeName);
					}else{
						table+='<td>-</td>';
					}
					if(result[i].ownerName != undefined){
						table+='<td>'+result[i].ownerName+'</td>';
						console.log("Test Data " +result[i].ownerName);
					}else{
						table+='<td>-</td>';
					}
					table+='<td>';
						if(result[i].houseNo != null && result[i].houseNo.trim().length > 0){
							table+='<p class="color_484848">#'+result[i].houseNo+', '+result[i].streetName+'</p>';
							console.log("Test Data " +result[i].houseNo);
						}
						if((result[i].cityName !=null && result[i].cityName.trim().length>0)&&(result[i].landMark	!=null && result[i].landMark.trim().length>0)){
							table+='<p class="color_484848">'+result[i].landMark+','+result[i].cityName+'</p>';
							console.log("Test Data " +result[i].landMark);
						}
						if( result[i].districtName !=null && result[i].districtName.trim().length>0 ){
							table+='<p class="color_484848">'+result[i].districtName+'</p>';
							console.log("Test Data " +result[i].districtName);
						}
						if( result[i].stateName !=null && result[i].stateName.trim().length >0 ){
							table+='<p class="color_484848">,'+result[i].stateName+'</p>';
						}
						if( result[i].pincode !=null && result[i].pincode.trim().length >0 ){
							table+='<p class="color_484848">,pincode : '+result[i].pincode+'</p>';
						}
					table+='</td>'; 
				table+='</tr>';
			}
			table+='</tbody>';
		table+='</table>';
	table+='</div>';
	$("#propertyDetailsDivId").html(table);
	if(result != null && result.length > 10 ){
		$("#companyTableId").dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]]
		});
		$(".dataTables_filter").css("float","right");
	}
}
function buildBuildingdetails(result,block_type,status_id){
	$("#pendingSummeryDivId").html('');
	var table='';
	if(block_type=='pendingBlock'){
		 // str+='<h4 class="font_weight">PENDING SUMMARY</h4>';
		table+='<div class="row"   style="margin-bottom:30px;">';
			table+='<div class="col-sm-10 col-sm-offset-1">';
				table+='<div class="table-responsive m_top20" >';
					table+='<table class="table table-bordered table_head_cls" id="buildingPendingDetailTableId"  style="border: 2px solid #ddd">';
						table+='<thead>';
							table+='<tr>';
								table+='<th>DAYS RANGE</th>';
								for( var j in result[0].subList){
									table+='<th>'+result[0].subList[j].dateStr+'</th>';
								}
							table+='</tr>';
							table+='<tr >';
								table+='<th> COUNT</th>';
								for( var j in result[0].subList){
									table+='<th>'+result[0].subList[j].pendingCount+'</th>';
								}
							table+='</tr>';
						table+='</thead>';
					table+='</table>';
				table+='</div>';
			table+='</div>';
		table+='</div>';
	}
	if($(window).width() < 800)
	{
		table+='<div class="table-responsive">';
	} else {
		table+='<div>';
	}
		table+='<table class="table table_custom_cls dataTablelocationWise " id="buildingDetailTableId" style="border:1px solid #ccc;">';
			table+='<thead>';
				table+='<tr >';
					table+='<th>PROPERTY NAME</th>';
					table+='<th>REQUESTED DATE</th>';
					table+='<th>BUILDING TYPE</th>';
					table+='<th>AREA IN SQFT</th>';
					table+='<th>SEATING CAPACITY</th>';
					table+='<th>FLOORS</th>';
					if(block_type == "pendingBlock"){
						table+='<th>PENDING DAYS </th>';
					}else if(block_type == "statusBlock" ){
						table+='<th>PENDING LEVEL </th>';
						table+='<th>Status</th>';
						table+='<th>LAG DAYS </th>';
					}else if(block_type == "dtpStatusBuilding" || block_type == "dtpPropertyBlock" ||block_type == "GovernmentProperties"){
						table+='<th>APPROVED DATE </th>';
						table+='<th>APPROVED DAYS </th>';
					}
					table+='<th>ACTIONS</th>';
				table+='</tr>';
			table+='</thead>';
			table+='<tbody>';
			for( var i in result){
				table+='<tr>';
									//table+='<td class="buildingdetailsCls modal_close_cls" attr_heading_name="'+result[i].nameOfBuilding+'" attr_building_id="'+result[i].buildingDetailsId+'" style="text-align:left !important; cursor:pointer;"><a>'+result[i].nameOfBuilding+'</a></td>';
					table+='<td style="text-align: left !important;" class="" attr_heading_name="'+result[i].nameOfBuilding+'" attr_building_id="'+result[i].buildingDetailsId+'">';
						table+='<h5 class="font_weight font_14 text-capital">'+result[i].nameOfBuilding+'</h5>';
						if(result[i].enterpriseName != null && result[i].enterpriseName.trim().length > 0){
							table+='<h5 class="color_blue m_5" style="color:#132C44;font-weight:bold;">#'+result[i].enterpriseName+'</h5>';
						}
						if(result[i].houseNumber != null && result[i].houseNumber.trim().length > 0){
							table+='<p class="color_484848 mb_0 f_11 font_weight">#'+result[i].houseNumber+', '+result[i].streetName+',</p>';
						}
						if((result[i].cityName !=null && result[i].cityName.trim().length>0)&&(result[i].landMark	!=null && result[i].landMark.trim().length>0)){
							table+='<p class="color_484848 mb_0 f_11 font_weight">'+result[i].landMark+','+result[i].cityName+',</p>';
						}
						if((result[i].district !=null && result[i].district.trim().length>0) && (result[i].state !=null && result[i].state.trim().length>0)){
							table+='<p class="color_484848 mb_0 f_11 font_weight">'+result[i].district+','+result[i].state+'</p>';
						}
					table+='</td>';
					if(result[i].fromDate != null && result[i].fromDate.trim().length > 0 ){
						table+='<td>'+result[i].fromDate+'</td>';
					}else{
						table+='<td>-</td>';
					}
					if(result[i].facilityType != null && result[i].facilityType.trim().length > 0 ){
						table+='<td>';
								table+='<h5 style="float:left">';
									if(result[i].facilityType == "Fully Plug & Play") {
										table+='<img src="Assests/images/plug_icon.png" class="">';
									} else {
										table+='<img src="Assests/images/semiPlug_icon.png" class="">';
									}
									table+='<span class="f_12 font_weight">'+result[i].facilityType+'</span></h5>';
								table+='</div>';
							  table+='</div>';
						table+='</td>';
					}else{
						table+='<td> - </td>';
					}
					if(result[i].itSpaceUsableArea != null && result[i].itSpaceUsableArea > 0 ){
						table+='<td>'
								table+='<h5>';
								table+='<img src="Assests/images/area_icon.png" class="">';
								table+='<span class="f_12 font_weight">'+result[i].itSpaceUsableArea+' Sqft</span></h5>';
						table+='</td>'
					}else{
						table+='<td>-</td>';
					}
					if(result[i].itSpaceUsableArea != null && result[i].itSpaceUsableArea > 0 ){
						table+='<td>'
								table+='<h5>';
									table+='<img src="Assests/images/seat_icon.png" class="">';
									table+='<span class="f_12 font_weight">'+Math.round(result[i].itSpaceUsableArea/100)+' Seater</span></h5>';
						table+='</td>'
					}else{
						table+='<td>-</td>';
					}
					if(result[i].noOfFloors != null && result[i].noOfFloors > 0 ){
						table+='<td>'+result[i].noOfFloors+'</td>';
					}else{
						table+='<td>-</td>';
					}
					if(block_type == "pendingBlock"){
						table+='<td>'+result[i].noOfDays+'</td>';
					}else if( block_type == "statusBlock"){
						if(result[i].pendingLevel != null && result[i].pendingLevel.trim().length > 0 ){
							table+='<td>'+result[i].pendingLevel+'</td>';
						}else{
							table+='<td>-</td>';
						}
						if(result[i].status != null && result[i].status.trim().length > 0 ){
							table+='<td>'+result[i].status+'</td>';
						}else{
							table+='<td>-</td>';
						}
						if(result[i].status != null && result[i].status == "Approved"){
							table+='<td>'+result[i].count+'</td>';
						}else{
							table+='<td>'+result[i].noOfDays+'</td>';
						}   
						//table+='<td>'+result[i].noOfDays+'</td>';
					} else if(block_type == "dtpStatusBuilding" || block_type == "dtpPropertyBlock" ||block_type == "GovernmentProperties"){
						if(result[i].toDate != undefined){
							table+='<td>'+result[i].toDate+'</td>';
						} else {
							table+='<td>-</td>';
						}
						if(result[i].count != undefined && result[i].count != null){
							table+='<td>'+result[i].count+'</td>';
						} else {
							table+='<td>-</td>';
						}
					}				//attr_heading_name="'+result[i].nameOfBuilding+'" attr_building_id="'+result[i].buildingDetailsId+'"
				table+='<td><i class="fa fa-eye fa-lg buildingdetailsCls removeModalCls tooltipCls" title="view Details"aria-hidden="true"  attr_prop_type="Building" attr_building_id="'+result[i].buildingDetailsId+'" attr_heading_name="'+result[i].nameOfBuilding+'" style="cursor:pointer;"></i></td>';
				table+='</tr>';
			}
			table+='</tbody>';
		table+='</table>';
	table+='</div>';
	$("#propertyDetailsDivId").html(table);
	$(".tooltipCls").tooltip();
	if(result != null && result.length > 10 ){
		$("#buildingDetailTableId").dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]]
		}); 
		$(".dataTables_filter").css("float","right");
	}
}

function buildItCompanyDetails(result,block_type,status_id){
    $("#pendingSummeryDivId").html('');
	var table='';
	if(block_type=='pendingBlock'){
		 //table+='<h4 class="font_weight">PENDING SUMMARY</h4>';
		table+='<div class="row">';
			table+='<div class="col-sm-10 col-sm-offset-1">';
				table+='<div class="table-responsive m_top20" style="margin-bottom:30px;">';
					table+='<table class="table table-bordered table_head_cls" id="itCompanyPendingDetailTableId">';
						table+='<thead>';
							table+='<tr>';
								table+='<th>DAYS RANGE</th>';
								for( var j in result[0].subList){
									table+='<th>'+result[0].subList[j].dateStr+'</th>';
								}
							table+='</tr>';
							table+='<tr >';
								table+='<th> COUNT</th>';
								for( var j in result[0].subList){
									table+='<th>'+result[0].subList[j].pendingCount+'</th>';
								}
							table+='</tr>';
						table+='</thead>';
					table+='</table>';
				table+='</div>';
			table+='</div>';
		table+='</div>';
	}
  	table+='<div class="table-responsive ">';
		table+='<table class="table table_custom_cls" id="itCompanyTableId" style="border:1px solid #ccc;">';
			table+='<thead>';
				table+='<tr >';
					table+='<th class="text-center">ENTERPRISE NAME </th>';
					table+='<th class="text-center text-capital">Requested Property</th>';
					table+='<th class="text-center text-capital">Requested date </th>';
					table+='<th class="text-center text-capital">Requested IT Space </th>';
					table+='<th>SEATING CAPACITY</th>';
					table+='<th class="text-center text-capital">NO.OF FLOORS </th>';
					if(block_type == "pendingBlock"){
						table+='<th class="text-center">STATUS </th>';
						table+='<th class="text-center">PENDING DAYS </th>';
					}else if(block_type == "dtpPropertyBlock" || block_type == "dtpStatusBuilding" ){
						table+='<th class="text-center">APPROVED DATE </th>';
						table+='<th class="text-center">APPROVED DAYS </th>';
					}else if( block_type == "statusBlock"){
						table+='<th class="text-center">STATUS </th>';
						table+='<th class="text-center">PENDING LEVEL </th>';
						table+='<th class="text-center">LAG DAYS </th>';
					}
					table+='<th class="text-center">ACTION</th>';
				table+='</tr>';
			table+='</thead>';
			table+='<tbody>';
			for( var i in result){
				table+='<tr>';
					table+='<td class="text-center">'+result[i].enterpriserName+'</td>';
					 table+='<td class="text-center">';
						table+='<h5 class="font_weight font_14 text-capital">'+result[i].buildingName+'</h5>';
						  table+='<p class="color_484848 mb_0 f_11 font_weight">';
							  if(result[i].houseNo != null && result[i].houseNo.trim().length > 0){
								table+='#'+result[i].houseNo+', ';
							  }
							  if(result[i].streetName != null && result[i].streetName.trim().length > 0){
								table+='#'+result[i].streetName;
							  }
							  if(result[i].landMark != null && result[i].landMark.trim().length > 0){
								table+=','+result[i].landMark;
							  }
							  if( result[i].cityName !=null && result[i].cityName.trim().length>0 ){
								table+=','+result[i].cityName;
							  }
							  if( result[i].districtName !=null && result[i].districtName.trim().length>0 ){
								table+=','+result[i].districtName;
							  }
							   if( result[i].stateName !=null && result[i].stateName.trim().length>0 ){
								table+=','+result[i].stateName+'.';
							  }
						  table+='</p>';
					  table+='</td>';
					 if( result[i].regDate !=null && result[i].regDate.trim().length>0 ){
						table+='<td class="text-center">'+result[i].regDate+'</td>';
					 }else{
						 table+='<td class="text-center">-</td>';
					 }
					 if( result[i].area !=null && result[i].area > 0 ){
						table+='<td>'
									table+='<h5>';
									table+='<img src="Assests/images/area_icon.png" class="">';
									table+='<span class="f_12 font_weight">'+result[i].area+' Sqft</span></h5>';
						table+='</td>'
					 }else{
						 table+='<td class="text-center">-</td>';
					 }
					 if( result[i].area !=null && result[i].area > 0 ){
						table+='<td>';
							table+='<div class="media">';
								table+='<div class="media-left" style="padding-right:0px;">';
									table+='<img src="Assests/images/seat_icon.png" class="">';
								table+='</div>';
								table+='<div class="media-body" style="width:100%;">';	
									table+='<h6 class="font_weight m_top10" style="font-size: 11px;">'+Math.round(result[i].area/100)+' Seater</h6>';
								table+='</div>';
							table+='</div>';		
						table+='</td>'
					 }else{
						 table+='<td class="text-center">-</td>';
					 }
					 if( result[i].noOfFloors !=null && result[i].noOfFloors >0 ){
						table+='<td class="text-center">'+result[i].noOfFloors+'</td>';
					 }else{
						 table+='<td class="text-center">-</td>';
					 }
					if(block_type == "dtpPropertyBlock"  || block_type == "dtpStatusBuilding"){
						table+='<td class="text-center">'+result[i].toDateStr+'</td>';
						table+='<td class="text-center">'+result[i].count+'</td>';
					}else if( block_type == "statusBlock" || block_type == "pendingBlock" ){
						 if( result[i].status !=null && result[i].status.trim().length >0 ){
							table+='<td class="text-center">'+result[i].status+'</td>';
						 }else{
							 table+='<td class="text-center">-</td>';
						 }
						 if(block_type != "pendingBlock"){
							 if( result[i].pendingLevel !=null && result[i].pendingLevel.trim().length >0 ){
								table+='<td class="text-center">'+result[i].pendingLevel+'</td>';
							 }else{
								 table+='<td class="text-center">-</td>';
							 }
						 }
						 if( result[i].status !=null && result[i].status == "Approved" ){
							if( result[i].noOfDays !=null && result[i].noOfDays >0 ){
								table+='<td class="text-center">'+result[i].noOfDays+'</td>';
							}else{
								table+='<td class="text-center">-</td>';
							}
						}else{
							if( result[i].count !=null && result[i].count >0 ){
								table+='<td class="text-center">'+result[i].count+'</td>';
							}else{
								table+='<td class="text-center">-</td>';
							}
						}
					}
				table+='<td><i class="fa fa-eye fa-lg buildingdetailsCls removeModalCls tooltipCls" title="view Details" aria-hidden="true"  attr_prop_type="ITCompany" attr_requisition_id="'+result[i].buildingRequisitionId+'" attr_building_id="'+result[i].id+'" attr_heading_name="'+result[i].enterpriserName+'" style="cursor:pointer;"></i></td>';
				table+='</tr>';
			}
			table+='</tbody>';
		table+='</table>';
	table+='</div>';
   $("#propertyDetailsDivId").html(table);
   $(".tooltipCls").tooltip();
   if(result != null && result.length > 10 ){
		$("#itCompanyTableId").dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]]
		});
		$(".dataTables_filter").css("float","right");
	}
}
/*DTP Modal View*/
function setDefaultImage(img){
	img.src = "Assests/images/image_not_available.jpg";
}
function setDefaultImage1(img){
	$("#mainBuildingImageId").html('<img class="" src="Assests/images/image_not_available.jpg" alt="Card image" style="height:250px;">');
	$(".addColorCss").removeClass("color_white").addClass("color_blue")
}
$(document).on("click",".buildingdetailsCls",function(){
	$('#buildingImageId').html('');///
	$('#requisationDetailsDivId').html('');
	$('#buildingImageAddressId').html('');
	var attr_building = $(this).attr("attr_building_id");
	var propType = $(this).attr("attr_prop_type");
	var attr_heading = $(this).attr("attr_heading_name");
	$('#DTPModalId').modal("show");  //
	$('#headingTitle1').html(attr_heading.toUpperCase()+" DETAILS");
	getBuildingViewDetails(attr_building,0,"getCompleteBuildingDetailsBybuidingId","Buildingdetails");
	if(propType != null && propType != "undefined" && propType == "ITCompany"){
		$("#requisationDetailsDivId").html(spinner);	
		var requisitionId = $(this).attr("attr_requisition_id");
		getBuildingViewDetails(0,requisitionId,"getBuildingRequisitionDetails","RequisitionDetails");
	}
}); 
$(document).on("click",function(){
	setTimeout(function(){
		if (!($("#propertyDetailsModalId,#DTPModalId,#spaceAvailabilityModelDetailsId,#propertyDetailsModalDivId").hasClass( "in" ))) {
			$('body').removeClass("modal-open");
		}else{
			$('body').addClass("modal-open");
		}
	}, 500); 
});
function getBuildingViewDetails(buildingId,requisitionId,blockUrl,propType){ 
	$("#mainBuildingImageId").html(spinner);
	$("#builderWiseStatusDetailsDivId").html(spinner);
	var jsonObj ={
		"type":"building",
		"buildingDetailsId":buildingId,
		"buildingRequisitionId":requisitionId,
		url:blockUrl //
	}
	$.ajax({
		url:"getBuildingDetailsViewDetails",
		type : "POST",
		data: JSON.stringify(jsonObj) ,       
		 dataType: 'json', 
		 beforeSend: function(xhr) {
		   xhr.setRequestHeader("Accept", "application/json");
		   xhr.setRequestHeader("Content-Type", "application/json"); 
	 },
	  success : function(result) {
		if(result !=null){
			if( propType =="Buildingdetails"){
			  buildCompleteBuildingDetails(result);
			}else{
			 buildBuildingRequestionDetails(result);
			}

		} else {
			$("#builderWiseStatusDetailsDivId").html("No Data Available");
		}
	  },
	  error:function(error,request){
		console.log("UNABLE TO DISPLAY");
	  }
	});
}
function buildCompleteBuildingDetails(result){
	var str='';
	$(".addColorCss").removeClass("color_blue")
	$("#mainBuildingImageId").html('<img class="card-img" src="http://dtp.ap.gov.in/'+result.buildingFrontImageurl+'" alt="Card image" style="height:250px;width:100%;" onerror="setDefaultImage1(this);">');
	$("#buildingImageId").html(result.buildingName);
	 
	 var addressStr = '';
	 if (result.addressVO.houseNo != null && result.addressVO.houseNo.length > 0){
		 addressStr+="#"+result.addressVO.houseNo;
	 }if (result.addressVO.street != null && result.addressVO.street.length > 0){
		 addressStr+=","+result.addressVO.street;
	 }
	 if (result.addressVO.landmark != null && result.addressVO.landmark.length > 0){
		 addressStr+=","+result.addressVO.landmark;
	 }
	 addressStr+=","+result.addressVO.districtName;
	 addressStr+=","+result.addressVO.stateName;
	$("#buildingImageAddressId").html(addressStr);
	str+='<div class="row">';
		str+='<div class="col-sm-4">';
			str+='<img src="http://dtp.ap.gov.in/'+result.buildingFrontImageurl+'" class="rounded" alt="..." style="width:100%" onerror="setDefaultImage(this);">';
			str+='<div class="row m_top20">';
				str+='<div class="col-sm-6 m_top5">';
					if(result.buildingFloorImageList !=null && result.buildingFloorImageList.length>0){
						floorImageArr = result.buildingFloorImageList;
						str+='<button type="button" class="btn btn-primary btn-sm doc_button_view docsViewCls f_14" attr_type="floorImages">Floor layouts View</button>';
					}else{
						str+='<button type="button" class="btn btn-primary btn-sm doc_button_view f_14" disabled>Floor layouts View</button>';
					}
				str+='</div>';
				str+='<div class="col-sm-6 m_top5">';
					if(result.buildingWingImageList !=null && result.buildingWingImageList.length>0){
						wingImagesArr=result.buildingWingImageList;
						str+='<button type="button" class="btn btn-primary btn-sm doc_button_view docsViewCls f_14" attr_type="wingImages">Wing layouts View</button>';
					}else{
						str+='<button type="button" class="btn btn-primary btn-sm doc_button_view f_14" disabled>Wing layouts View</button>';
					}
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-6">';
			str+='<div class="bgYashColor">';
				str+='<div class="row">';
					str+='<div class="col-sm-3">';
						str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">YEAR BUILT</h6>';
						if(result.buildYear !=null && result.buildYear>0){
							str+='<h6 class="color_blue f_14 m_top20 text-center">'+result.buildYear+'</h6>';
						}else{
							str+='<h6 class="color_blue f_14 m_top20 text-center"> - </h6>';
						}
					str+='</div>';
					str+='<div class="col-sm-3">';
						str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">OWNERSHIP</h6>';
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.ownershipType;
							if(result.leasedPendingTime != null && result.leasedPendingTime.trim().length > 0){
								str+='<br>'+result.leasedPendingTime+' Left';
							}	
					str+='</div>';
					str+='<div class="col-sm-3">';
						str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">STATUS</h6>';
						if(result.buildingStatus !=null && result.buildingStatus.trim().length>0){
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.buildingStatus+'</h6>';
						}else{
							str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
						}
					str+='</div>';
					str+='<div class="col-sm-3">';
						str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">BUILDING TYPE</h6>';
						if(result.buildingType !=null && result.buildingType.trim().length>0){
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.buildingType+'</h6>';
						}else{
							str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
						}
					str+='</div>';
				str+='</div>';
				str+='<hr style="border-top: 2px solid #ccc; margin:8px 0px;">';	
				str+='<div class="m_top5">';
					str+='<div class="row">';
						str+='<div class="col-sm-6">';
							str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">IT SPACE PER SQ FT</h6>';
							if(result.itSpacePrice !=null && result.itSpacePrice>0){
								str+='<h6 class="color_blue f_14 text-center m_top20">Rs: '+result.itSpacePrice+'/- per month</h6>';
							}else{
								str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
							}	
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">COMMON AREA PER SQ FT</h6>';
							if(result.commonSpacePrice !=null && result.commonSpacePrice>0){
								str+='<h6 class="color_blue f_14 text-center m_top20">Rs: '+result.commonSpacePrice+'/- per month</h6>';
							}else{
								str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
							}
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='<div class="bgYashColor" style="margin-bottom: 20px;margin-top:5px;">';
				str+='<div class="row">';
					str+='<div class="col-sm-3">';
						str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">TOTAL AREA</h6>';
						if(result.totalArea !=null && result.totalArea>0){
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.totalArea+' Sq ft</h6>';
						}else{
							str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
						}
					str+='</div>';
					str+='<div class="col-sm-3">';
						str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">IT USABLE AREA</h6>';
						if(result.itUsableArea !=null && result.itUsableArea>0){
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.itUsableArea+' Sq ft</h6>';
						}else{
							str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
						}
					str+='</div>';
					str+='<div class="col-sm-3">';
						str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">COMMON AREA</h6>';
						if(result.commonArea !=null && result.commonArea>0){
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.commonArea+' Sq ft</h6>';
						}else{
							str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
						}
					str+='</div>';
					str+='<div class="col-sm-3">';
						str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">PARKING AREA</h6>';
						if(result.parkingArea !=null && result.parkingArea>0){
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.parkingArea+' Sq ft</h6>';
						}else{
							str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
						}
					str+='</div>';
				str+='</div>';
				str+='<hr style="border-top: 2px solid #ccc; margin:8px 0px;">';
				str+='<div class="m_top5">';
					str+='<div class="row">';
						str+='<div class="col-sm-3">';
							str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">FLOORS</h6>';
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.floorCount+'</h6>';
						str+='</div>';
						str+='<div class="col-sm-3">';
							str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">WINGS</h6>';
							str+='<h6 class="color_blue f_14 text-center m_top20">'+result.wingCount+'</h6>';
						str+='</div>';
						str+='<div class="col-sm-3">';
							str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">OCCUPIED IT SPACE</h6>';
							if(result.occupiedItSpace !=null && result.occupiedItSpace>0){
								str+='<h6 class="color_blue f_14 text-center m_top20">'+result.occupiedItSpace+'  Sq ft</h6>';
							}else{
								str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
							}
						str+='</div>';
						str+='<div class="col-sm-3">';
							str+='<h6 class="color_yash f_13 m_top_bottom_5 text-center">AVAILABLE&nbsp;IT&nbsp;SPACE</h6>';
							if(result.availableItSpace !=null && result.availableItSpace>0){
								str+='<h6 class="color_blue f_14 text-center m_top20">'+result.availableItSpace+' Sq ft</h6>';
							}else{
								str+='<h6 class="color_blue f_14 text-center m_top20"> - </h6>';
							}
							 
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		var colorBorderObj={"Pending":"#FFB300","In Progress":"#FFB300","Approved":"#34CAC1","Rejected":"#D5475B"}
		str+='<div class="col-sm-2">';
			str+='<div class="bgYashColor">';
				str+='<h4 class="font_weight text-center text-capital" style="color:'+colorBorderObj[result.status]+'">Status:'+result.status+'</h4>';
			str+='</div>';
			 str+='<div class="bgYashColor m_top10">';
				str+='<h4 class="font_weight color_blue">SEATING&nbsp;CAPACITY</h4>';
				if(result.seatingCapicity !=null && result.seatingCapicity>0){
					str+='<span class="text-center font_weight" style="color: #F7629F;">';
						str+='<div class="media">';
							str+='<div class="media-left">';
								str+='<img src="Assests/images/icon-seating-capacity.png" style="position:relative; top:8px; left:20px;"/> ';
							str+='</div>';
							str+='<div class="media-body">';
								str+='<span class="media-heading" style="font-size:34px; position:relative; top:-2px;">'+result.seatingCapicity+'</span>';
							str+='</div>';
						str+='</div>';
					str+='</span>';
				}else{
					str+='<span class="text-center font_weight" style="color: #F7629F;"> - </span>';
				}
			str+='</div>';
			str+='<h6 class="heading_text_color m_top5">Business Name</h6>';
			str+='<div class="bgYashColor m_top10" style="background-color:#fff;">';
				
				if(result.registratedCompanyName !=null && result.registratedCompanyName.trim().length>0){
					str+='<h4 class="font_weight color_blue text-center m_top0">'+result.registratedCompanyName+'</h4>';
				}else{
					str+='<h4 class="font_weight color_blue text-center"> - </h4>';
				}
				str+='<p class="mb_0 f_12 font_weight color_blue m_top10">'+result.enterpriseAddressVO.houseNo+','+result.enterpriseAddressVO.street+'</p>';
				str+='<p class="mb_0 f_12 font_weight color_blue">'+result.enterpriseAddressVO.districtName+'</p>';
				str+='<p class="mb_0 f_12 font_weight color_blue">'+result.enterpriseAddressVO.stateName+'</p>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#builderWiseStatusDetailsDivId").html(str);
}

$(document).on("click",".docsViewCls",function(){
	$("#docsModalDivId").modal("show");
	var docsList = [];
	var str="";
	if($(this).attr("attr_type") == "wingImages"){
		docsList=[];
		$("#viewDocumentHeading").html("Wing Layouts")
		docsList = wingImagesArr;
	}else if($(this).attr("attr_type") == "floorImages"){
		docsList=[];
		$("#viewDocumentHeading").html("Floor Layouts")
		docsList = floorImageArr;
	}
	if(docsList != null && docsList.length >0){
		for(var j in docsList){
			var fileName = docsList[j].name.split("/"); 
			var scanCopySpl = docsList[j].name.split("."); 
			var scanCopyExt = $.trim(scanCopySpl[scanCopySpl.length-1].toLowerCase()); 
				str+='<div class="col-sm-4">';
					str+='<div class="viewImageCss">';
					if(scanCopyExt =="pdf"){
						str+='<object class="thumbnail m_5"  data="http://dtp.ap.gov.in/'+docsList[j].name+'" type="application/pdf" width="100%"height="150px;"></object>';
						str+='<h5>'+fileName[4]+' <a class="fancyboxView image_open_link" href="#inlinePDFD'+j+'"><i class="fa fa-external-link" aria-hidden="true"></i></a></h5>';
						str+='<div id="inlinePDFD'+j+'" style="width:100%;display: none;">';
							str+='<object data="http://dtp.ap.gov.in/'+docsList[j].name+'" type="application/pdf"   style="cursor:pointer;height:1000px;width:1000px"></object>';
						str+='</div>';
					}else if( scanCopyExt =="jpeg" || scanCopyExt =="jpg"  || scanCopyExt =="gif"  || scanCopyExt =="bmp"  || scanCopyExt =="png"){
						str+='<img src="http://dtp.ap.gov.in/'+docsList[j].name+'"  width="100%" height="150px;"></img>';
						str+='<h5>'+fileName[4]+' <a class="fancyboxView image_open_link" href="#inlineImgeD'+j+'"><i class="fa fa-external-link" aria-hidden="true"></i></a></h5>';
						str+='<div id="inlineImgeD'+j+'" style="width:100%;display: none;">';
							str+='<img src="http://dtp.ap.gov.in/'+docsList[j].name+'" style="cursor:pointer;height:1000px;width:1000px"></object>';
						str+='</div>';
					}else{ 
						str+='<b>Click <a href="javascript:{};" onclick="openDoc(\'http://dtp.ap.gov.in/'+docsList[j].name+'\')">Here</a> To View Document</b>';
					}
				str+='</div>';
			str+='</div>';
		}
	}
	$("#docsViewModalId").html(str);
	$(".fancyboxView").fancybox();
});
function callFilterCalls(id,url,type,divId){
	var json={
		locationId:id,
		url:url
	}
	getPendingLevelAndBuildingDtpStatusOverviewDetails(json,type,divId)
 }
function buildLocationBlock( ajaxresp,selId ){
	if(ajaxresp != null && ajaxresp.length > 0){
		var str=''
		if(selId !="occupancySelId"){
			str+='<option value="0">All</option>';
		}
		for(var i in ajaxresp){
			if(selId=="occupancySelId"){
				str+='<option value='+ajaxresp[i].name+'>'+ajaxresp[i].name+'</option>';
			}else{
				str+='<option value='+ajaxresp[i].id+'>'+ajaxresp[i].name+'</option>';
			}
		}
		$("#"+selId).html(str);
		$("#"+selId).trigger("chosen:updated");	
	}

}
$(document).on("change","#districtSelId",function() {
	var id = $(this).val();
	callFilterCalls(id,"getAllCityNameForDashBoard","filters","citySelId")
});
$(document).on("click",".buildingOnChangeCls",function() {
	$("#locationWiseDetailsDivId").html(spinner);
	/* var slider,itUsableSpaceStart,itUsableSpaceEnd,commonAreaStart,commonAreaEnd,buildArr=[];
		slider= $("#itUsblPrcId").data("ionRangeSlider");		
		itUsableSpaceStart = slider.result.from;
		itUsableSpaceEnd = slider.result.to;
		slider = $("#commanArePrcId").data("ionRangeSlider");		
		commonAreaStart = slider.result.from;
		commonAreaEnd = slider.result.to;
		$('.containerChk input').each(function(){
			if($(this).is(":checked")){
			  buildArr.push($(this).attr('attr_value'));
			}
       }); */
		var enterpriseType=$("#userTypeId").val();
		var distrctId = $("#districtSelId").val();
		var cityId = $("#citySelId").val();
		var companyId = $("#companySelId").val();
		var pendingLevelId = $("#pendingLevelSelId").val();
		var occupancyVal = $("#occupancySelId").val();
	
	if(enterpriseType == 2){//it company
		var jsonObj ={
		 "locationId":distrctId, // DistrictId
		  "typeId":cityId, // CityId
		  "facilityTypeId":companyId, // CompanyId                          
		  "statusId":pendingLevelId, // Pending Offcial
		  "url":"getITCompanyDetailsListForDashBoard"
		}
	getPendingLevelAndBuildingDtpStatusOverviewDetails( jsonObj,"LocationWisePropertiesForITCompany","locationWiseDetailsDivId");
	}else{//building
		var jsonObj ={
		  "locationId":distrctId, // DistrictId
		  "typeId":cityId, // CityId
	      "facilityTypeId":companyId, // CompanyId
	      "statusId":pendingLevelId, // Pending Offcial
	      "type":occupancyVal ,   // Occupancy  buildLocationBlock,
		 /*  "itUsableSpaceStart":itUsableSpaceStart,
		  "itUsableSpaceEnd":itUsableSpaceEnd,
		  "commonAreaStart":commonAreaStart,
		  "commonAreaEnd":commonAreaEnd,
		  "buildingTypeList":buildArr, */
	      "url":"getAllPropertyDetailsListForDashBoard"
		}
		getPendingLevelAndBuildingDtpStatusOverviewDetails( jsonObj,"LocationWisePropertiesForBuilding","locationWiseDetailsDivId");
	} 
});
$(document).on("click",".propertiesOccupancyViewCls",function(){
	$("#propertyDetailsDivId").html(spinner);
	var url = $(this).attr("attr_url");
	var block_type = $(this).attr("attr_block_type");
	var title = $(this).attr("attr_heading");
	var occupancyVal = $(this).attr("attr_occupancy_val");
	
	$('#propertyDetailsModalId').modal("show");
		$('#headingTitle').html(title.toUpperCase()+"  DETAILS");
		var jsonObj ={
		  "locationId":0, // DistrictId
	  "typeId":0, // CityId
	  "facilityTypeId":0,    // CompanyId
	  "statusId":0, // Pending Offcial
	  "type":occupancyVal, // Occupancy  buildLocationBlock
	 "buildingTypeId":17 ,	 // approval sub status id
	  "url":url
	}
		getPendingLevelAndBuildingDtpStatusOverviewDetails( jsonObj,"PropertiesOccupancyView");
});
function buildPropertiesOccupancyBuildingdetails(result){
	 $("#pendingSummeryDivId").html('');
	 var table='';
	 table+='<div class="table-responsive">';
		 table+='<table class="table table-bordered table_custom_SC" id="buildingDetailPropertiesTableId">';
			 table+='<thead>';
				table+='<tr >';
					table+='<th>BUILDING NAME</th>';
					table+='<th>ADDRESS </th>';
					table+='<th>FACILITY TYPE</th>';
					table+='<th>AREA IN SQFT</th>';
					table+='<th>REGISTRATION DATE </th>';
					table+='<th>APPROVED DATE </th>';
					table+='<th>APPROVED DAYS </th>';
				table+='</tr>';
				table+='</thead>';
			 table+='<tbody>';
			  for( var i in result){
				  table+='<tr>';
				   table+='<td class="buildingdetailsCls modal_close_cls" attr_heading_name="'+result[i].buildingName+'" attr_building_id="'+result[i].id+'" style="text-align:left !important; cursor:pointer;"><a>'+result[i].buildingName+'</a></td>';
				   table+='<td>';
						if(result[i].houseNo != null && result[i].houseNo.trim().length > 0){
							table+='<p class="color_484848 mb_0 f_11 font_weight">#'+result[i].houseNo+',</p>';
						}
						if(result[i].streetName != null && result[i].streetName.trim().length > 0){
							table+='<p class="color_484848 mb_0 f_11 font_weight">#'+result[i].streetName+',</p>';
						}
						if(result[i].landMark	!=null && result[i].landMark.trim().length>0 ){
							table+='<p class="color_484848 mb_0 f_11 font_weight">'+result[i].landMark+',</p>';
						}
						if(result[i].districtName !=null && result[i].districtName.trim().length>0){
							table+='<p class="color_484848 mb_0 f_11 font_weight">'+result[i].districtName+',Andhra Pradhesh</p>';
						}
					table+='</td>';
					if(result[i].buildingType != null && result[i].buildingType.trim().length > 0){
						table+='<td>'+result[i].buildingType+'</td>';
					}
					table+='<td>'+result[i].areaInSQFT+'</td>';
					table+='<td>'+result[i].requestedDate+'</td>';
					table+='<td>'+result[i].dtpAccordedOnDate+'</td>';
					table+='<td>'+result[i].totalRequest+'</td>';
					
				  table+='</tr>';
			  }
			  table+='</tbody>';
		 table+='</table>';
	table+='</div>';
	$("#propertyDetailsDivId").html(table);
	if(result != null && result.length > 10 ){
		$("#buildingDetailPropertiesTableId").dataTable({
			"iDisplayLength": 10,
			"aaSorting": [],
			"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]]
		}); 
		//$(".dataTables_filter").css("float","right");
	}
}
function buildBuildingRequestionDetails(result) {
		var table='';
		if($(window).width() < 800)
		{
			table+='<div class="table-responsive m_top10">';
		}
		table+='<div class="col-sm-12">';
		table+='<h4 class="font_weight">Requisition Details</h4>';
		table+='<table class="table table-bordered table_custom_SC m_top20" id="buildingDetailsDataTblId" style="width:100%;padding:10px;">';
			table+='<thead>';
				table+='<tr>';
					table+='<th class="text-center">Floor</th>';
					table+='<th class="text-center">Wing Name</th>';
					table+='<th class="text-center">Floor Type</th>';
					table+='<th class="text-center">Total Area Sq.ft</th>';
					table+='<th class="text-center">IT Space Usable Area Sq.ft</th>';
					table+='<th class="text-center">Common Area Sq.ft</th>';
					table+='<th class="text-center">Seating Capacity</th>';
					table+='<th class="text-center">Applied Companies</th>';
					table+='<th class="text-center">Layout</th>';
				table+='</tr>';
			table+='</thead>';
			table+='<tbody>';
			for(var i in result){
				table+='<tr >';
					table+='<td class="text-center">';
							if (result[i].floorName != null && result[i].floorName.length > 0) {
								table+='<h5 class="font_weight color_blue">'+result[i].floorName+'</h5>';	
							} else {
								table+='<h5 class="font_weight color_blue">-</h5>';	
							}
					table+='</td>';
					table+='<td class="text-center">';//this is wing name
						if (result[i].name != null && result[i].name.length > 0) {
							table+='<h5 class="font_weight color_blue">'+result[i].name+'</h5>';	
						} else {
							table+='<h5 class="font_weight color_blue">-</h5>';	
						}
				   table+='</td>';
				   table+='<td class="text-center">';
							if (result[i].floorType != null && result[i].floorType.length > 0) {
								table+='<h5 class="font_weight color_blue">'+result[i].floorType+'</h5>';	
							} else {
								table+='<h5 class="font_weight color_blue">-</h5>';	
							}
					table+='</td>';
					table+='<td class="text-center">';
						if (result[i].totalArea != null && result[i].totalArea > 0) {
							table+='<h5 class="font_weight color_blue">'+result[i].totalArea
							+'</h5>';	
						} else {
							table+='<h5 class="font_weight color_blue">-</h5>';	
						}
				   table+='</td>';
				   table+='<td class="text-center">';
						if (result[i].itUsableArea != null && result[i].itUsableArea > 0) {
							table+='<h5 class="font_weight color_blue">'+result[i].itUsableArea
							+'</h5>';	
						} else {
							table+='<h5 class="font_weight color_blue">-</h5>';	
						}
				   table+='</td>';
				   table+='<td class="text-center">';
						if (result[i].commonArea != null && result[i].commonArea > 0) {
							table+='<h5 class="font_weight color_blue">'+result[i].commonArea
							+'</h5>';	
						} else {
							table+='<h5 class="font_weight color_blue">-</h5>';	
						}
				   table+='</td>';
				   table+='<td class="text-center">';
						if (result[i].seatingCapicity != null && result[i].seatingCapicity > 0) {
							table+='<h5 class="font_weight color_blue">'+result[i].seatingCapicity
							+'</h5>';	
						} else {
							table+='<h5 class="font_weight color_blue">-</h5>';	
						}
				   table+='</td>';
				   table+='<td class="text-center">';
						if (result[i].count != null && result[i].count > 0) {
							table+='<h5 class="font_weight color_blue"  attr_building_id="'+result[i].buildingDetailsId+'"  attr_wing_id="'+result[i].id+'"  attr_floor_id="'+result[i].floorId+'"  attr_wing_id="'+result[i].id+'" style="color:#132C44;">'+result[i].count
							+'</h5>';	
						} else {
							table+='<h5 class="font_weight color_blue">-</h5>';	
						}
				   table+='</td>';
				   table+='<td class="text-center">';
							if(result[i].filePathList !=null && result[i].filePathList.length>0){
									floorLayoutArr = result[i].filePathList;
									for(var l in result[i].filePathList){
											var scanCopySpl = result[i].filePathList[l].split("."); 
											var scanCopyExt = $.trim(scanCopySpl[scanCopySpl.length-1].toLowerCase()); 
											var floorLayout = result[i].filePathList[l].split('/');
											if(scanCopyExt =="pdf"){
												table+='<span><a class="fancyboxView" href="#inlineMainFLPDF'+i+''+l+'">';
													table+='<span class="">'+floorLayout[4]+'</span>';
												table+='</a></span>';
												table+='<div id="inlineMainFLPDF'+i+''+l+'" style="width:100%;display: none;">';
													table+='<object data="'+result[i].filePathList[l]+'" type="application/pdf"  style="cursor:pointer;height:1000px;width:1000px"></object>';
												table+='</div>';
											}else if( scanCopyExt =="jpeg" || scanCopyExt =="jpg"  || scanCopyExt =="gif"  || scanCopyExt =="bmp"  || scanCopyExt =="png"){
												table+='<span><a class="fancyboxView" href="#inlineMainFLIMG'+i+''+l+'">';
													table+='<span class="" >'+floorLayout[4]+'</span>';
												table+='</a></span>';
												table+='<div id="inlineMainFLIMG'+i+''+l+'" style="width:100%;display: none;">';
													table+='<img src="'+result[i].filePathList[l]+'"    style="cursor:pointer;height:1000px;width:1000px"></img>';		
												table+='</div>';
											}else{
												table+='<span><b>Click <a href="javascript:{};" onclick="openDoc(\''+result[i].filePathList[l]+'\')">Here</a> To View Document</b></span>';
											}
									}
						} else {
							table+='<h5 class="font_weight color_blue">-</h5>';	
						}
				   table+='</td>';
				table+='</tr>';
			}
			table+='</tbody>';
		table+='</table>';
	table+='</div>';
		if($(window).width() < 800)
		{
			table+='</div>';
		}
	    $("#requisationDetailsDivId").html(table);	
		$(".fancyboxView").fancybox();
		$(".tooltipCls").tooltip();

	}
$(document).on("change","#userTypeId",function(){
	var value=$(this).val();
	$("#districtSelId").val(0);
	$("#districtSelId").trigger('chosen:updated');
	if(value == 2){
		$(".occupancyCls").hide();
		callFilterCalls(2,"getAllCompanyNamesForDashBoard","filters","companySelId");
	    callFilterCalls(2,"getAllPendingOfficalNameForDashBoard","filters","pendingLevelSelId");
	}else{
		$(".occupancyCls").show();
		callFilterCalls(1,"getAllCompanyNamesForDashBoard","filters","companySelId");
	    callFilterCalls(1,"getAllPendingOfficalNameForDashBoard","filters","pendingLevelSelId");
	}
		callFilterCalls(0,"getAllCityNameForDashBoard","filters","citySelId");
	
});
$(document).on("click","#spaceAvailabilityDivId",function(){
	$('#spaceAvailabilityModelDetailsId').modal("show");
	$("#spaceAvailabilityId").html(spinner);
	$("#buildingCountsId").html(spinner);
	//getDeveloperOrITCompanyPropertyOverviewDetails('getSpaceAvaialabilityDetails');
	var json = {
		url:"getSpaceAvaialabilityDetails",
		locationId:"0"
	}
	getPendingLevelAndBuildingDtpStatusOverviewDetails(json,"CheckAvailableSpace","spaceAvailabilityId");
	
});
function showAvailableBuildingDetails(result){
	var table='';
	var str='';
	var floorCount = 0, wingsCount = 0, totalArea = 0, seatersCount = 0;
		table+='<div class="pad_10" style="background-color:#EDEFF6; border-radius:4px;">';
		for( var i in result){
			table+='<div class="table-responsive default_white m_top10">';
				table+='<table class="table table_custom_SC">';
					table+='<tbody>';
						table+='<tr>';
							table+='<td><span class="categoryRondedCss" style="padding:0px; background-color:#17539D; line-height: 23px; border:0px;">'+Number(parseInt(i)+1)+'</span></td>';
							table+='<td class="font_weight text-capital"><div style="border: 1px solid #006FFF;">'+result[i].buildingName+'</div></td>';
							table+='<td class="font_weight text-capital">'+result[i].districtName+'</td>';
							table+='<td class="font_weight">'+result[i].regDate+'</td>';
							table+='<td class="font_weight">';
								table+='<div class="media">';
									table+='<div class="media-left">';
										table+='<img src="Assests/images/plug_icon.png" class="media-object">';
									table+='</div>';
									table+='<div class="media-body" style="width:0%;">';
										table+='<h5 class="media-heading m_top5">'+result[i].enterpriseType+'</h5>';
									table+='</div>';
								table+='</div>';
							table+='</td>';
							table+='<td class="font_weight">';
								table+='<div class="media">';
									table+='<div class="media-left">';
										table+='<img src="Assests/images/DTP_primary.png" class="media-object">';
									table+='</div>';
									table+='<div class="media-body" style="width:0%;">';
										table+='<h5 class="media-heading m_top5">'+result[i].area+'<span class="font_12"> Sqft</span></h5>';
									table+='</div>';
								table+='</div>';
							table+='</td>';
							table+='<td class="font_weight">';
								table+='<div class="media">';
									table+='<div class="media-left">';
										table+='<img src="Assests/images/DTP_success.png" class="media-object">';
									table+='</div>';
									table+='<div class="media-body" style="width:0%;">';
										table+='<h5 class="media-heading m_top5">'+result[i].availableSpace+'<span class="font_12"> Sqft</span></h5>';
									table+='</div>';
								table+='</div>';
							table+='</td>';
							table+='<td class="font_weight">';
								table+='<div class="media">';
									table+='<div class="media-left">';
										table+='<img src="Assests/images/DTP_seater_primary.png" class="media-object">';
									table+='</div>';
									table+='<div class="media-body" style="width:0%;">';
										table+='<h5 class="media-heading m_top5">'+result[i].totalSeater+' Seater</h5>';
									table+='</div>';
								table+='</div>';
							table+='</td>';
							table+='<td class="font_weight">';
								table+='<div class="media">';
									table+='<div class="media-left">';
										table+='<img src="Assests/images/DTP_seater_success.png" class="media-object">';
									table+='</div>';
									table+='<div class="media-body" style="width:0%;">';
										table+='<h5 class="media-heading m_top5">'+result[i].availableSeater+' Seater</h5>';
									table+='</div>';
								table+='</div>';
							table+='</td>';
						table+='</tr>';
					   table+='</tbody>';
				table+='</table>';
			table+='</div>';
			table+='<div class="table-responsive  default_white m_top10">';
				table+='<table class="table table_custom_SC">';
					table+='<thead>';
						table+='<tr>';
							table+='<th>FLOOR</th>';
							table+='<th>WING</th>';
							//table+='<th>COMPANY</th>';
							//table+='<th>OCCUPIED DATE</th>';
							table+='<th>IT USABLE AREA IN SQFT</th>';
							table+='<th>SEATING CAPACITY</th>';
							table+='<th>STATUS</th>';
						table+='</tr>';
					table+='</thead>';
					table+='<tbody>';
					/* for(var j in result[i].wingList){
						table+='<tr>';
							 table+='<td>'+result[i].wingList[j].streetName+'</td>';
							table+='<td>'+result[i].wingList[j].status+'</td>';
							table+='<td>-</td>';
							table+='<td>-</td>';
							table+='<td>'+result[i].wingList[j].availableSpace+'Sqft</td>';
							table+='<td class="font_weight">';
								table+='<div class="media" style="display:inline;">';
									table+='<div class="media-left">';
										table+='<img src="Assests/images/seat_icon.png" class="media-object">';
									table+='</div>';
									table+='<div class="media-body" style="width:0%;">';
											table+='<h5 class="media-heading m_top5">'+result[i].wingList[j].availableSeater+' Seater</h5>';
									table+='</div>';
								table+='</div>';
							table+='</td>';
							table+='<td><button class="btn default_white" style="border:1px solid #00945C;">Available</button></td>';
						table+='</tr>';
					} */
					for(var j in result[i].buildingList){
						
						table+='<tr>';
							 table+='<td>'+result[i].buildingList[j].streetName+'</td>';
							 if(result[i].buildingList[j].status != null){
								 wingsCount++;
								table+='<td>'+result[i].buildingList[j].status+'</td>';
							}else{
								floorCount++;
								table+='<td>-</td>';
							}
							//table+='<td>-</td>';
							//table+='<td>-</td>';
							if(result[i].buildingList[j].status != null){
								totalArea +=  result[i].buildingList[j].area;
								table+='<td>'+result[i].buildingList[j].area+'</td>';
							}else{
								totalArea +=  result[i].buildingList[j].availableSpace;
								table+='<td>'+result[i].buildingList[j].availableSpace+'</td>';
							}
							table+='<td class="font_weight">';
								table+='<div class="media" style="display:inline;">';
									table+='<div class="media-left">';
										table+='<img src="Assests/images/seat_icon.png" class="media-object">';
									table+='</div>';
									table+='<div class="media-body" style="width:0%;">';
											if(result[i].buildingList[j].status != null){
												table+='<h5 class="media-heading m_top5">'+result[i].buildingList[j].totalSeater+'</h5>';
											}else{
												table+='<h5 class="media-heading m_top5">'+result[i].buildingList[j].availableSeater+'</h5>';
											}
											
									table+='</div>';
								table+='</div>';
							table+='</td>';
							table+='<td><div class="btn_custom" style="border:1px solid #00945C;">Available</div></td>';
						table+='</tr>';
					}
					
					table+='</tbody>';
				table+='</table>';
			table+='</div>';		
		}
		table+='</div>';
		seatersCount = Math.round(totalArea/100);
		str+='<ul class="list-inline timeLineCLs" style="border:1px solid #ccc; border-radius:3px;">';
			str+='<li>';
				str+='<label>Total Buildings</label>';
				str+='<h5 class="text-center font_weight">'+result.length+'</h5>';
			str+='</li>';
			str+='<li>';
				str+='<label>Total floors</label>';
				str+='<h5 class="text-center font_weight">'+floorCount+'</h5>';
			str+='</li>';
			str+='<li>';
				str+='<label>Total Wings</label>';
				str+='<h5 class="text-center font_weight">'+wingsCount+'</h5>';
			str+='</li>';
			str+='<li>';
				str+='<label>Total Area in Sqft</label>';
				str+='<h5 class="text-center font_weight">'+totalArea+'</h5>';
			str+='</li>';
			str+='<li>';
				str+='<label>Total Seaters</label>';
				str+='<h5 class="text-center font_weight">'+seatersCount+'</h5>';
			str+='</li>';
		str+='</ul>';
		 $("#buildingCountsId").html(str);	
		 $("#spaceAvailabilityId").html(table);	
}
/* $(document).on("click",".buildDetClkCls",function(){
	var subBlcId=$(this).attr('attr_sub_blc_id');
	var buildingDetailsId=$(this).attr("attr_building_id");
		if($(this).hasClass('fa-plus-circle')){
			$(this).addClass('fa-minus-circle').removeClass('fa-plus-circle');
			$(this).css("color","red");
			$("."+subBlcId).show();
			$("#"+subBlcId).html(spinner);
			var json={
				"url":"getSpaceAvaialabilityFloorDetails",
				"buildingRequisitionId":buildingDetailsId
			}
			$.ajax({
					url:"getBuildingDetailsViewDetails",
					type : "POST",
					data: JSON.stringify(json) ,       
					 dataType: 'json', 
					 beforeSend: function(xhr) {
					   xhr.setRequestHeader("Accept", "application/json");
					   xhr.setRequestHeader("Content-Type", "application/json"); 
				 },
				 success : function(ajaxresp) {
					buildingDetailsBybuilingId(ajaxresp,subBlcId);
				 },
			});	
		}else {
				$(this).addClass('fa-plus-circle').removeClass('fa-minus-circle');
				$(this).css("color","green");
				$("."+subBlcId).hide();
			}
}); */
 $(document).on("click",".buildDetClkCls",function(){
	var headingId=$(this).attr("attr_header");
	var buildingDetailsId=$(this).attr("attr_building_id");
	$("#propertyDetailsModalDivId").modal("show");
	$("#headingId").html(headingId+'&nbsp;Details');
	getSpaceAvaialabilityFloorDetails(buildingDetailsId,"subTableModalDivId");
 });
function getSpaceAvaialabilityFloorDetails(buildingDetailsId,divId) {
	$("#"+divId).html(spinner);
	var json={
		"url":"getSpaceAvaialabilityFloorDetails",
		"buildingRequisitionId":buildingDetailsId
	}
	$.ajax({
		type:'POST',
		url:'getBuildingDetailsViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildingDetailsBybuilingId(result,divId);
		}
	})
}
function buildingDetailsBybuilingId(result,divId){
	var str='';
		str='<div class="table-responsive">';
			str+='<table class="table table_custom_SC table-bordered dataTablelocationWise no-footer" id="'+divId+'dataTable">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Floor</th>';
						str+='<th>Wing</th>';
						str+='<th>Company</th>';
						str+='<th>Occupied Date</th>';
						str+='<th>IT usable Area In Sqft</th>';
						str+='<th>Seating Capacity</th>';
						str+='<th>Status</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result){
						str+='<tr>';
							str+='<td>'+result[i].streetName+'</td>';
							if(result[i].status != undefined){
								str+='<td>'+result[i].status+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].ownerName != undefined){
								str+='<td style="text-align:left !important;">'+result[i].ownerName+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].regDate != undefined){
								str+='<td>'+result[i].regDate+'</td>';
							}else{
								str+='<td>-</td>';
							}
							if(result[i].status != undefined){
								str+='<td>'+result[i].area+'Sqft</td>';	
							}else if(result[i].streetName != undefined){
								str+='<td>'+result[i].availableSpace+'Sqft</td>';	
							}
							if(result[i].status != undefined){
							str+='<td><img src="Assests/images/seat_icon.png" class="">&nbsp;&nbsp;<span class="f_12 font_weight">'+result[i].totalSeater+'</span></td>';
							}else if(result[i].streetName != undefined){
							str+='<td><img src="Assests/images/seat_icon.png" class="">&nbsp;&nbsp;<span class="f_12 font_weight">'+result[i].availableSeater+'</span></td>';	
							}
							
							if(result[i].url == "Available"){
								str+='<td><div class="btn_custom" style="border:1px solid green;">'+result[i].url+'</div></td>';	
							}else{
								str+='<td><div class="btn_custom" style="border:1px solid red;">'+result[i].url+'</div></td>';
							} 
							
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#"+divId).html(str);//pj
	$("#"+divId+'dataTable').dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]]
	});
}
function buildPendingTimeLineOverview(result) {
	var str='';
	str+='<div class="table-responsive m_top20">';
		str+='<table class="table table-bordered table_custom_SC">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Offcials</th>';
					str+='<th>Total</th>';
					for(var i in result[0].subList){
						str+='<th>'+result[0].subList[i].dateStr+'<br><span style="color:#868080;">Days</span></th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td class="font_weight">'+result[i].name+'</td>';
					str+='<td>'+result[i].totalCount+'</td>';
					for(var j in result[i].subList){
						str+='<td>'+result[i].subList[j].pendingCount+'</td>';
					}
				str+='</tr>';
			}
			str+='</tbody>';	
		str+='</table>';
	str+='</div>';
	$("#pendingTimeLineOverviewId").html(str);
}
function buildCitywiseDetailsForProperty(result){
	var str=""
		str+='<div class="table-responsive">';
			str+='<table class="table  table_custom_SC table-bordered" id="districtWisePropartyTableId">'; 
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2">City</th>';
						str+='<th rowspan="2">Total Properties</th>';
						str+='<th colspan="3">Not Approved </th>';
						str+='<th colspan="5">Approved </th>';
						str+='<th colspan="5"> AVAILABILITY </th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Buildings</th>';
						str+='<th>IT USABLE Area ( 	SQ.ft )</th>';
						str+='<th>SEATING CAPACITY</th>';
						str+='<th>Buildings</th>';
						str+='<th>IT USABLE Area ( 	SQ.ft )</th>';
						str+='<th>Floors</th>';
						str+='<th>Wings</th>';
						str+='<th>SEATING</th>';
						str+='<th>Buildings</th>';
						str+='<th>IT USABLE Area ( 	SQ.ft )</th>';
						str+='<th>Floors</th>';
						str+='<th>Wings</th>';
						str+='<th>SEATING CAPACITY</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result ){
					str+='<tr>';
						str+='<td class="text-capital">'+result[i].name+'</th>';
						if(result[i].totalCount != null && result[i].totalCount > 0){
							str+='<td class="cityWisePropertiesCls"  attr_heading="'+result[i].name+' Total Properties Details" attr_type="" attr_city_id="'+result[i].id+'" attr_url="getBuildingDetailsBasedOnCity" style="cursor:pointer;color:#337AB7;">'+result[i].totalCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						
						if(result[i].notApprovedCount != null && result[i].notApprovedCount > 0){
							str+='<td class="cityWisePropertiesCls" attr_heading="'+result[i].name+' Not Approved Properties DETAILS" attr_type="NotApproved" attr_city_id="'+result[i].id+'" attr_url="getBuildingDetailsBasedOnCity" style="cursor:pointer;color:#337AB7;">'+result[i].notApprovedCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].notAppprovedItSpace != null && result[i].notAppprovedItSpace > 0){
							str+='<td class="" attr_heading="'+result[i].name+' Not Approved Properties DETAILS" attr_type="NotApproved" attr_city_id="'+result[i].id+'" attr_url="getBuildingDetailsBasedOnCity">'+result[i].notAppprovedItSpace+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].notAppprovedItSpace != null && result[i].notAppprovedItSpace > 100){
							str+='<td class="" attr_heading="'+result[i].name+' Not Approved Properties DETAILS" attr_type="NotApproved" attr_city_id="'+result[i].id+'" attr_url="getBuildingDetailsBasedOnCity">'+(result[i].notAppprovedItSpace/100).toFixed(0)+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].aprrovedBuildingCount != null && result[i].aprrovedBuildingCount > 0){
							str+='<td class="cityWisePropertiesCls" attr_heading="'+result[i].name+' Approved Properties  DETAILS" attr_type="Approved" attr_city_id="'+result[i].id+'" attr_url="getBuildingDetailsBasedOnCity" style="cursor:pointer;color:#337AB7;">'+result[i].aprrovedBuildingCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].totalSpace != null && result[i].totalSpace > 0){
							str+='<td>'+result[i].totalSpace+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].approvedFloors != null && result[i].approvedFloors > 0){
							str+='<td>'+result[i].approvedFloors+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].approvedWings != null && result[i].approvedWings > 0){
							str+='<td>'+result[i].approvedWings+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].totalSpace != null && result[i].totalSpace > 100){
							str+='<td>'+(result[i].totalSpace/100).toFixed(0)+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].availebleBuildings != null && result[i].availebleBuildings > 0){
							str+='<td class="cityWisePropertiesCls" attr_heading="'+result[i].name+' AVAILABILe Properties  DETAILS"  attr_type="Availabile" attr_city_id="'+result[i].id+'" attr_url="getBuildingDetailsBasedOnCity" style="cursor:pointer;color:#337AB7;">'+result[i].availebleBuildings+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].itUsableArea != null && result[i].itUsableArea > 0){
							str+='<td>'+result[i].itUsableArea+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].availebleFloors != null && result[i].availebleFloors > 0){
							str+='<td>'+result[i].availebleFloors+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].availebleWings != null && result[i].availebleWings > 0){
							str+='<td>'+result[i].availebleWings+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].itUsableArea != null && result[i].itUsableArea > 100){
							str+='<td>'+(result[i].itUsableArea/100).toFixed(0)+'</td>';
						}else{
							str+='<td>-</td>';
						}
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#districtWisePropartyDivId").html(str);
	//$("#districtWisePropartyTableId").dataTable();
}

$(document).on("click",".cityWisePropertiesCls",function(){
	var url = $(this).attr("attr_url");
	var cityId = $(this).attr("attr_city_id");
	var typeVal = $(this).attr("attr_type");
	if(typeVal != "Availabile"){
		var attrHeading = $(this).attr("attr_heading");
		$("#headingTitle").html('<span class="text-capital">'+attrHeading+'</span>');
		$('#propertyDetailsModalId').modal("show");
		getBuildingDetailsBasedOnCity(typeVal,cityId,url,"propertyDetailsDivId");
	}else{
		$('#spaceAvailabilityModelDetailsId').modal("show");
		$("#spaceAvailabilityId").html(spinner);
		$("#buildingCountsId").html(spinner);
		var json = {
		url:"getSpaceAvaialabilityDetails",
		locationId:cityId
	}
	getPendingLevelAndBuildingDtpStatusOverviewDetails(json,"CheckAvailableSpace","spaceAvailabilityId");
	}
	
	
});

function getBuildingDetailsBasedOnCity(typeVal,cityId,urlVal,divId) {
	$("#"+divId).html(spinner);
	var json={
		"url":urlVal,
		"type":typeVal,
		"locationId":cityId
	}
	$.ajax({
		type:'POST',
		url:'getPendingLevelAndBuildingDtpStatusOverviewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildBuildingdetails(result,"",0)	
		}else{
			$("#propertyDetailsDivId").html('No Data Availabile');
		}
	})
}