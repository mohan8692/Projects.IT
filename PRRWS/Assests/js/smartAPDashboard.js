var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>',
	overviewArr = [{name:"Donations", id:0}, {name:"Projects", id:1}, {name:"Partnership", id:2}, {name:"NaipunyaRatham", id:3}],
	locationWiseArr = [{name:'District',id:0, type: "districtWise"}, {name:'Mandal',id:1, type: "mandalWise"} ,{name:'Panchayat',id:2, type: "panchayatWise"}, {"name":'Component',id:3, type: ""}],
	componentArr = [{name:'GP', id:0, type: "GPs/wards Adoption Details"}, {name:'Projects Proposed', id:1, type: "Projects Proposed"}, {name:'Partner Activities', id:2, type:"Partner Activities"}, {name:'donations', id:3, type: ""}],
	NODATAMSG = "NO DATA AVAILABLE",
	globalTrendingType = "adoption",
	allTickFromDate=moment().subtract(15, 'years').startOf('year').format("DD-MM-YYYY"),
	allTickToDate=moment().format("DD-MM-YYYY");
	nprYear ="2018",
	partnershipYear ="2018";

$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
	$(".menuCls-table2").hide();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
	$(".menuCls-table2").hide();
});

  $("#dateRangePicker").daterangepicker({
    opens: 'left',
    startDate: allTickFromDate,
    endDate: allTickToDate,
    locale: {
    format: 'DD-MM-YYYY' 
  } ,
  ranges: {
   // 'All':[overallDaterangePicker()],
    'Today' : [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'This Year': [moment().startOf('Year'), moment()],
    'Last 1 Year': [moment().subtract(1, 'Year'), moment()],
	'OverAll':[moment().subtract(15, 'years').startOf('year').format("DD-MM-YYYY"), moment().format("DD-MM-YYYY")]
  }
  });
  
  $('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
		currentfromdate = picker.startDate.format('DD-MM-YYYY');
		currentToDate = picker.endDate.format('DD-MM-YYYY');
		if(picker.chosenLabel == 'OverAll')
		{
			$("#dateRangePicker").val('OverAll');
		}
		
		onloadCalls();
	});
onloadCalls();
function onloadCalls() {
	$(".chosen-select").chosen();
	getSmartAPOverViewDetails();
	getDonationProgressOverViewDetails();
	getDonationTimeLineAnalysisDetails();
	locationWiseData();	
}

function getSmartAPOverViewDetails(){
		$("#overviewId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getSmartAPOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildSmartAPOverViewDetails(result);
		}
	})	
}
function buildSmartAPOverViewDetails(result) {
	var str='';
	imgArr = { 'DONATIONS':"Group 2806",'PROJECTS':"Group 2867",'PARTNERSHIPS':"Group 2870",'NAIPUNYA RATHAM':"Group 2869"};
	colorobj = {"DONATIONS": "#75C14D","PROJECTS": "#96D6F4", "PARTNERSHIPS": "#B2B2B2", "NAIPUNYA RATHAM": "#FFCC2A"};
	str+='<div class="li_blocks m_top10" style="border-spacing: 10px 0px;">';	
		str+='<ul class="blocksCls m_top10">';
			for( var i in result){
				if(i == 0){
				  str+='<li class="displayBlock block_shadow pad_10 border_yash border_radius_5 mediaWiseTabsClickCls detailsCls" attr_tab_name="'+overviewArr[i].name.toLowerCase()+'" attr_tab_id="'+overviewArr[i].id+'" style="border:1px solid #39FF00;">';
				}else{
				  str+='<li class="white-block displayBlock block_shadow pad_10 border_yash border_radius_5 mediaWiseTabsClickCls detailsCls" attr_tab_name="'+overviewArr[i].name.toLowerCase()+'" attr_tab_id="'+overviewArr[i].id+'">';
				}
					str+='<div class="media " >';
						str+='<div class="media-left">';
							str+='<img src="Assests/images/'+imgArr[result[i].name]+'.png" class="media-object">';
						str+='</div>';
						str+='<div class="media-body" style="border-bottom:1px solid '+colorobj[result[i].name]+';">';
							str+='<h4 class="media-heading text-center m_top10" style="text-align: left;">'+getValues(result[i].name)+'</h4>';
						str+='</div>';
						str+='<div class="row m_top10">';
							str+='<div class="col-sm-6">';
								str+='<h6>'+getValues(result[i].totalTitle)+'</h6>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								str+='<h4 style="color: #666665">'+getValues(result[i].totalCount)+'</h4>';
							str+='</div>';
						str+='</div>';
						str+='<div class="m_top10 margin_bottom" style="border-bottom: 1px solid #CFE7BF;"></div>';
					str+='</div>';
					for(var j in result[i].subList){
						str+='<div class="row m_top20">';
							str+='<div class="col-sm-6">';
							if(i == 0){
								str+='<h6 class="text-left">'+getValues(result[i].subList[j].name)+'</h6>';
							}else{
								str+='<h6 class="text-left">'+getValues(result[i].subList[j].name)+'</h6>';
							}
							str+='</div>';
							str+='<div class="col-sm-3">';
								str+='<h5 class="text-center">'+getValues(result[i].subList[j].totalDonationsStr)+'</h5>';
							str+='</div>';
							if(result[i].name.toUpperCase() != "PARTNERSHIPS" ){
								str+='<div class="col-sm-3">';
									if(result[i].subList[j].name.toUpperCase() == "FUND ASSINGED"){
										str+='<h5></h5>';
									}else{
										if(getValues(result[i].subList[j].totalDonationsPerc) != "-"){
											str+='<h5 class="text-success text-right">'+getValues(result[i].subList[j].totalDonationsPerc)+'%</h5>';
										}else{
											str+='<h5 class="text-success text-right">'+getValues(result[i].subList[j].totalDonationsPerc)+'</h5>';
										}
										
									}
									
								str+='</div>';
							}
							
						str+='</div>';
					}
				str+='</li>';
			}
		str+='</ul>';
	str+='</div>';
	$("#overviewId").html(str);
} 

function getDonationProgressOverViewDetails(){
		$("#firstBlockDivId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getDonationProgressOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildcomponentAnalysisDetails(result);
		}
	})	
}
function buildcomponentAnalysisDetails(result) {
	var compAnlysArr = {"Total Donations": "","GP/Wards Donations": "Panchayat/Ward","Projects Donations": "Project","Pool Fund Donations":"Pool Fund"}
	str='';
		str+='<div class="white-block border_yash pad_10 m_top10">';
			str+='<h5 class="text-capital">Progress View</h5>';
			str+='<div class="white-block m_top10">';
				str+='<div class="li_blocks m_top10" style="border-spacing: 10px 0px;">';
					str+='<ul class="blocksCls">';
						for(var i in result){
							if(i == 0){
							str+='<li class="pad_10 border_yash border_radius_5 displayBlock">';
							}else{
							str+='<li class="white-block pad_10 border_yash border_radius_5 displayBlock" style="padding-bottom: 20px;">';
							}
								str+='<div class="row" style="margin-left: 0px !important; margin-right: 0px !important;">';
									str+='<h5 class="text-center">'+getValues(result[i].name)+'</h5>';
								str+='</div>';
								str+='<div class="row m_top20">';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text-center">'+getValues(result[i].totalCount)+'</h6>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										if(getValues(result[i].totalDonors) != "-"){
											str+='<h6 class="text-center"><span class="getDonarsDetailsCls" data-type="'+compAnlysArr[result[i].name]+'" data-name="'+result[i].name+'">'+getValues(result[i].totalDonors)+'</span>&nbsp;Donors</h6>';
										}else{
											str+='<h6 class="text-center">'+getValues(result[i].totalDonors)+'&nbsp;Donors</h6>';
										}
										
									str+='</div>';
								str+='</div>';
								str+='<div class="m_top10 margin_bottom" style="border-bottom: 1px solid #CFE7BF;"></div>';
								str+='<div class="row m_top10">';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text-left">Fund Assigned</h6>';
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<h6>'+getValues(result[i].fundAssigned)+'</h6>';
									str+='</div>';
									str+='<div class="col-sm-3">';
										if(getValues(result[i].fundAssignedPercent) != "-"){
											str+='<h6 class="text-success text-center">'+getValues(result[i].fundAssignedPercent)+'%</h6>';
										}else{
											str+='<h6 class="text-success text-center">'+getValues(result[i].fundAssignedPercent)+'</h6>';
										}
										
									str+='</div>';
								str+='</div>';
								str+='<div class="row m_top10">';
									str+='<div class="col-sm-6">';
										str+='<h6 class="text-left">Balance Fund</h6>';
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<h6>'+getValues(result[i].balanceFund)+'</h6>';
									str+='</div>';
									str+='<div class="col-sm-3">';
									if(getValues(result[i].balanceFundPercent) != "-"){
										str+='<h6 class="text-success text-center">'+getValues(result[i].balanceFundPercent)+'%</h6>';
									}else{
										str+='<h6 class="text-success text-center">'+getValues(result[i].balanceFundPercent)+'</h6>';
									}
									str+='</div>';
								str+='</div>';
							str+='</li>';
						}
					str+='</ul>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	$("#firstBlockDivId").html(str);
} 

function getDonationTimeLineAnalysisDetails(){
		$("#secondBlockDivId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getDonationTimeLineAnalysisDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildDonationTimelineAnalysis(result);
		}
	})	
}
function buildDonationTimelineAnalysis(result){
	var str='';
	str+='<div class="white-block border_yash pad_10 m_top20">';
		str+='<h5 class="text-capital">Time line Analysis</h5>';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC m_top10" style="font-size: 12px !important" id="donationTimelineAnalysisDataTable">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Timeline</th>';
						str+='<th>Total Donations</th>';
						str+='<th>No. of Donors</th>';
						str+='<th>GP/Wards</th>';
						str+='<th>%</th>';
						str+='<th>Projects</th>';
						str+='<th>%</th>';
						str+='<th>Pool Fund</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for( var i in result.timelienList){
					str+='<tr>';
						str+='<td>'+getValues(result.timelienList[i].name)+'</td>';
						str+='<td>'+getValues(result.timelienList[i].totalDonationsStr)+'</td>';
						str+='<td>'+getValues(result.timelienList[i].totalDonors)+'</td>';
						str+='<td>'+getValues(result.timelienList[i].gpDonationsStr)+'</td>';
						str+='<td class="text-success m_left">'+getValues(result.timelienList[i].gpDonationsPerc)+'</td>';
						str+='<td>'+getValues(result.timelienList[i].projectDonationsStr)+'</td>';
						str+='<td class="text-success m_left">'+getValues(result.timelienList[i].projectDonationsPerc)+'</td>';
						str+='<td>'+getValues(result.timelienList[i].poolDonations)+'</td>';
						str+='<td class="text-success m_left">'+getValues(result.timelienList[i].poolDonationsPerc)+'</td>';
					str+='</tr>';
						}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#secondBlockDivId").html(str);
	$("#donationTimelineAnalysisDataTable").dataTable({
		"aaSorting": [],
		"searching": false,
		"paging":   false,		
		"info":     false,
		/* "dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "APInnovationSociety",
				filename:  'APInnovationSociety_Activities'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		] */
	});
}




function locationWiseData(){
	var collapse='';
	for(var i in locationWiseArr){
		collapse+='<div class="panel-group m_top20" id="accordion'+locationWiseArr[i].name+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+locationWiseArr[i].name+'">';
					if(i == 0){
						collapse+='<a id="smart'+locationWiseArr[i].name+'" role="button" class="panelCollapseIcon '+locationWiseArr[i].name+'"  data-toggle="collapse" data-parent="#accordion'+locationWiseArr[i].name+'" href="#collapse'+locationWiseArr[i].name+'" aria-expanded="true" aria-controls="collapseheading'+locationWiseArr[i].name+'">';
					}else{
						collapse+='<a id="smart'+locationWiseArr[i].name+'" role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordion'+locationWiseArr[i].name+'" href="#collapse'+locationWiseArr[i].name+'" aria-expanded="true" aria-controls="collapseheading'+locationWiseArr[i].name+'">';
					}
					 collapse+='<h4 class="panel-title text-capital">'+locationWiseArr[i].name+' Wise Details</h4>';
						
					collapse+='</a>';
				collapse+='</div>';
				if(i == 0){
					collapse+='<div id="collapse'+locationWiseArr[i].name+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+locationWiseArr[i].name+'">';
				}else{
					collapse+='<div id="collapse'+locationWiseArr[i].name+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+locationWiseArr[i].name+'">';
				}
					collapse+='<div class="panel-body">';
						if(locationWiseArr[i].name == 'Component'){
							collapse+='<div class="li_blocks m_top10">';
								collapse+='<ul class="ulTabStyleCls1 blocksCls">';
										for(var i in componentArr){
											if(i == 0){
												collapse+='<li class="active text-capital" attr_type="'+componentArr[i].type+'">'+componentArr[i].name.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'/Wards Adoption Details</li>';
											}else{
												collapse+='<li class="text-capital" attr_type="'+componentArr[i].type+'">'+componentArr[i].name.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+'</li>';
											}
										}
								collapse+='</ul>';
							collapse+='</div>';
						}
						collapse+='<div id="locationWise'+locationWiseArr[i].name+'"></div>';
						
						
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	}
	$("#levelWiseDivId").html(collapse);
	 for(var i in locationWiseArr){	
			if(locationWiseArr[i].type == ""){
				getComponentWiseDetails("","GPs/wards Adoption Details","","","","","","onload","");
			}
			else{				
				getDonationsLocationWiseDetails(locationWiseArr[i].type,locationWiseArr[i].name);				
				/*				
				getPartnershipLocationWiseDetails(locationWiseArr[i].type,locationWiseArr[i].name);				
				getNPRLocationWiseDetails(locationWiseArr[i].type,locationWiseArr[i].name);			
				 */
			} 
			
			
		} 
	}

function getDonationsLocationWiseDetails(locationtype,divId){
		$("#locationWise"+divId).html(spinner);
		json={
			fromDate:	allTickFromDate,
			toDate:		allTickToDate,
			"pType":	locationtype
		}
	$.ajax({
		type:'POST',
		url:'getDonationsLocationWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			buildDonationsDistrictWiseDetails(result,locationtype,divId);
			
		}else{
			$("#locationWise"+divId).html("NO DATA AVAILABLE");
		}
	})	
}
function buildDonationsDistrictWiseDetails(result,locationtype,divId){
	var str='';	
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="dataTable'+locationtype+'" style="width:100%;">';
				str+='<thead style="background-color: #EFEFEF !important;">';
					str+='<tr>';
					  str+='<th rowspan="2">District Name</th>';
					  if(locationtype=="mandalWise"){
						str+='<th rowspan="2">Mandal Name</th>';
					  }if(locationtype == "panchayatWise"){
						str+='<th rowspan="2">Mandal Name</th>';
						str+='<th rowspan="2">Panchayat Name</th>';
					  }
						str+='<th colspan="7">Donations</th>';
						str+='<th colspan="7">Donations Assinged To Projects</th>';
					  str+='</tr>';
					  str+='<tr>';
						str+='<th>Total</th>';
						str+='<th>Total Projects</th>';
						str+='<th>Project Donations</th>';
						str+='<th>%</th>';
						str+='<th>GPs Covered</th>';
						str+='<th>GPs Donations</th>';
						str+='<th>%</th>';
						str+='<th>Assigned Fund</th>';
						str+='<th>Covered Projects</th>';
						str+='<th>Balance Fund</th>';
					  str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				  for(var i in result){
					str+='<tr>';
					  if(locationtype=="districtWise"){
						str+='<td>'+getValues(result[i].name)+'</td>';
					  }
					  if(locationtype=="mandalWise"){
						str+='<td>'+getValues(result[i].districtName)+'</td>';
						str+='<td>'+getValues(result[i].name)+'</td>';
					  }
					  if(locationtype=="panchayatWise"){
						str+='<td>'+getValues(result[i].districtName)+'</td>';
						str+='<td>'+getValues(result[i].mandalName)+'</td>';
						str+='<td>'+getValues(result[i].name)+'</td>';
					  }
					  str+='<td>'+getValues(result[i].totalDonationsStr)+'</td>';
					  str+='<td>'+getValues(result[i].totalProjects)+'</td>';
					  str+='<td>'+getValues(result[i].projectDonationsStr)+'</td>';
					  str+='<td class="text-success">'+getValues(result[i].projectDonationsPerc)+'</td>';
					  str+='<td>'+getValues(result[i].gpsCovered)+'</td>';
					  str+='<td>'+getValues(result[i].gpDonationsStr)+'</td>';
					  str+='<td class="text-success">'+getValues(result[i].gpDonationsPerc)+'</td>';
					  str+='<td>'+getValues(result[i].fundAssigned)+'</td>';
					  str+='<td>'+getValues(result[i].approved)+'</td>';
					  str+='<td>'+getValues(result[i].balanceFund)+'</td>';
					str+='</tr>';
				  }
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#locationWise"+divId).html(str);
	if(locationtype=="districtWise"){
		$("#dataTable"+locationtype).dataTable({
		"aaSorting": [],
		"searching": false,
		"paging":   false,		
		"info":     false,
		/* "dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "APInnovationSociety",
				filename:  'APInnovationSociety_Activities'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		] */
	});
	}else{
		$("#dataTable"+locationtype).dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP Donations",
				filename:  'SmartAP Donations'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
	}
	
}
function getProjectsProgressViewDetails(){
		$("#firstBlockDivId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getProjectsProgressViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildProjectProgressDetails(result);
		}
	})	
}
function buildProjectProgressDetails(result){
  str='';
  str+='<div class="white-block border_yash pad_10 m_top10">';
      str+='<h5 class="text-capital">Progress View</h5>';
      str+='<div class="li_blocks m_top10" style="border-spacing: 10px 0px;">';
        str+='<ul class="blocksCls">';
          for(var i in result){
            str+='<li class="pad_5 border_yash border_radius_5 displayBlock">';
              str+='<div class="row" style="margin-left: 0px !important; margin-right: 0px !important;">';
                str+='<h5 class="text-center">'+result[i].name+'</h5>';
              str+='</div>';
              str+='<div class="row m_top10">';
                str+='<div class="col-sm-6">';
                  str+='<h5>'+result[i].totalProjects+'</h5>';
                str+='</div>';
                str+='<div class="col-sm-6">';
                  if(result[i].fundAssignedPercent !=null && result[i].fundAssignedPercent>0){
                    str+='<h5 class="text-success">'+result[i].fundAssignedPercent+'%</h5>';
                  }else{
                    str+='<h5 class="text-success">'+result[i].fundAssignedPercent+'%</h5>';
                  }
              str+='</div>';
              str+='<div class="white-block border_yash pad_10 m_top30 border_radius_5" style="margin-left: 19px;margin-right: 26px;">';
                if(result[i].name.toUpperCase() == "IN PROGRESS" || result[i].name.toUpperCase() == "COMPLETED"){
					str+='<div class="row ">';
						str+='<div class="col-sm-6" style="border-right: 1px solid #7DAC8A;">';
							str+='<p>Donations Fund</p>';
							str+='<h5 class="m_top10">'+result[i].fundAssigned+'</h5>';
						str+='</div>';
						str+='<div class="col-sm-6">';
						  str+='<p>Govt Fund</p>';
						  str+='<h5 class="m_top10">'+result[i].govtFunds+'</h5>';
						str+='</div>';
					 str+='</div>';
				}else{
                  str+='<div class="row">';
                    str+='<div class="col-sm-12">';
                      str+='<p class="text-center">Donations Fund</p>';
                      str+='<h5 class="text-center m_top10">'+result[i].fundAssigned+'</h5>';
                    str+='</div>';
                  str+='</div>';
                }
              str+='</div>';
            str+='</li>';
          }
        str+='</ul>';
      str+='</div>';
    str+='</div>';
  $("#firstBlockDivId").html(str);
}

function getProjectTimeLineAnalysisDetails(){
		$("#secondBlockDivId").html(spinner);
		json={
		}
	$.ajax({
		type:'POST',
		url:'getProjectTimeLineAnalysisDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildProjectsTimelineAnalysisDetails(result);
		}
	})	
}
function buildProjectsTimelineAnalysisDetails(result){
	var cols = 2 * (result[0].timelienList.length + 1 );
	var str='';
	str+='<div class="white-block border_yash pad_15 m_top20">';
		str+='<h5 class="text-capital">Timeline Analysis Matching Grants</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="ProjectsTimelineAnalysisdataTable">';
				str+='<thead style="background-color: #73A3AE !important;">';
					str+='<tr>';
						str+='<th rowspan="2">Project Life</th>';
						str+='<th rowspan="2">Total</th>';
						str+='<th rowspan="2">Pending(I)</th>';
						str+='<th rowspan="2">%</th>';
						str+='<th rowspan="2">Approved(II)</th>';
						str+='<th rowspan="2">%</th>';						
						str+='<th colspan="'+cols+'">In Progress(III)</th>';
						str+='<th rowspan="2">Completed(IV)</th>';
						str+='<th rowspan="2">%</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Total</th>';
						str+='<th>%</th>';
					for(var i in result[0].timelienList){												
						str+='<th>'+result[0].timelienList[i].inProgressName+'</th>';
						str+='<th>%</th>';
					}
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for( var i in result){
					str+='<tr>';
						str+='<td>'+getValues(result[i].name)+'</td>';
						str+='<td>'+getValues(result[i].total)+'</td>';
						str+='<td>'+getValues(result[i].pending)+'</td>';
						str+='<td class="text-success">'+getValues(result[i].pendingPerc)+'</td>';
						str+='<td>'+getValues(result[i].approved)+'</td>';
						str+='<td class="text-success">'+getValues(result[i].approvedPerc)+'</td>';
						str+='<td>'+getValues(result[i].inProgress)+'</td>';
						str+='<td class="text-success">'+getValues(result[i].inProgressPerc)+'</td>';
						for(var j in result[i].timelienList){
							if(getValues(result[i].timelienList[j].inProgress) != "-"){
								str+='<td class="projectTimelyanalysisCls" data-program="'+result[i].timelienList[j].inProgressName+'" data-type="'+result[i].name+'" data-phase="'+(parseInt(j)+1)+'">'+getValues(result[i].timelienList[j].inProgress)+'</td>';
							}else{
								str+='<td>'+getValues(result[i].timelienList[j].inProgress)+'</td>';
							}							
							str+='<td class="text-success">'+getValues(result[i].timelienList[j].inProgressPerc)+'</td>';
						}
						str+='<td>'+getValues(result[i].completed)+'</td>';
						str+='<td class="text-success">'+getValues(result[i].completedPerc)+'</td>';
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#secondBlockDivId").html(str);
	$("#ProjectsTimelineAnalysisdataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP",
				filename:  'SmartAP'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); 			
}
function getProjectsSectorWiseAnalysis(){
		$("#thirdBlockDivId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getProjectsSectorWiseAnalysis',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildProjectsSectorWiseDetails(result);
		}
	})	
}
function buildProjectsSectorWiseDetails(result){
	str='';
	str+='<div class="white-block border_yash pad_15 m_top20">';
		str+='<h5 class="text-capital">Sector Wise Analysis</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" style="padding: 6px !important;" id="projectsSectorWiseDataTable">';
				str+='<thead style="background-color: #fff !important;">';
					str+='<tr>';
						str+='<th rowspan="2">Sector Name</th>';
						str+='<th rowspan="2">Total projects</th>';
						str+='<th rowspan="2">Donations Fund</th>';
						str+='<th colspan="2">Pending</th>';
						str+='<th colspan="2">Approved</th>';
						str+='<th colspan="3">In Progress</th>';
						str+='<th colspan="3">completed</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Projects</th>';
						str+='<th>Donations Fund</th>';
						str+='<th>Projects</th>';
						str+='<th>Donations Fund</th>';
						str+='<th>Projects</th>';
						str+='<th>Donations Fund</th>';
						str+='<th>Govt Fund</th>';
						str+='<th>Projects</th>';
						str+='<th>Donations Fund</th>';
						str+='<th>Govt Fund</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for( var i in result){
						str+='<tr>';
							str+='<td>'+getValues(result[i].name)+'</td>';
							str+='<td class="projSectorWiseDetailsCls" data-sector-id="'+result[i].id+'" data-type="Projects Proposed" data-status-id="">'+getValues(result[i].totalProjects)+'</td>';
							str+='<td>'+getValues(result[i].totalDonationsStr)+'</td>';
							
							if(getValues(result[i].pending) != "-"){
								str+='<td class="projSectorWiseDetailsCls" data-sector-id="'+result[i].id+'" data-type="Projects Proposed" data-status-id="Pending">'+getValues(result[i].pending)+'</td>';
							}else{
								str+='<td>'+getValues(result[i].pending)+'</td>';
							}							
							str+='<td>'+getValues(result[i].pendingDonations)+'</td>';
							
							if(getValues(result[i].approved) != "-"){
								str+='<td class="projSectorWiseDetailsCls" data-sector-id="'+result[i].id+'" data-type="Projects Proposed" data-status-id="Approved">'+getValues(result[i].approved)+'</td>';
							}else{
								str+='<td>'+getValues(result[i].approved)+'</td>';
							}							
							str+='<td>'+getValues(result[i].approvedDonations)+'</td>';
							
							if(getValues(result[i].inProgress) != "-"){
								str+='<td class="projSectorWiseDetailsCls" data-sector-id="'+result[i].id+'" data-type="Projects Proposed" data-status-id="In Progress">'+getValues(result[i].inProgress)+'</td>';
							}else{
								str+='<td>'+getValues(result[i].inProgress)+'</td>';
							}							
							str+='<td>'+getValues(result[i].inprogressDonations)+'</td>';
							str+='<td>'+getValues(result[i].inprogressGovt)+'</td>';
							
							if(getValues(result[i].completed) != "-"){
								str+='<td class="projSectorWiseDetailsCls" data-sector-id="'+result[i].id+'" data-type="Projects Proposed" data-status-id="Completed">'+getValues(result[i].completed)+'</td>';
							}else{
								str+='<td>'+getValues(result[i].completed)+'</td>';
							}
							str+='<td>'+getValues(result[i].compeltedDonations)+'</td>';
							str+='<td>'+getValues(result[i].completedGovt)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#thirdBlockDivId").html(str);
	$("#projectsSectorWiseDataTable").dataTable({
		"aaSorting": [],
		"searching": false,
		"paging":   false,		
		"info":     false,
		/* "dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "APInnovationSociety",
				filename:  'APInnovationSociety_Activities'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		] */
	});
}

function getProjectProposalsInProgressDetails(type,program){
		$("#inProgProjDetailsDivId").html(spinner);
		json={
			fromDate: allTickFromDate,
			toDate: allTickToDate,
			//type: type,	//overall
			program: program	//phaseName
		}
	$.ajax({
		type:'POST',
		url:'getProjectProposalsInProgressDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildInProgressProjectDetails(result);
		}
	})	
}
function buildInProgressProjectDetails(result){
	str='';
	
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_default" id="inProgressProjectDetailsDataTable">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Project Name</th>';
					str+='<th>In Progress On</th>';
					str+='<th>Sector</th>';
					str+='<th>Contribution</th>';
					str+='<th>Govt Grants</th>';
					str+='<th>Project Created By</th>';
					str+='<th>Panchayath</th>';
					str+='<th>Mandal/Muncipality</th>';
					str+='<th>District</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td>'+getValues(result[i].name)+'</td>';
						str+='<td>'+getValues(result[i].inProgressOn)+'</td>';
						str+='<td>'+getValues(result[i].sector)+'</td>';
						str+='<td>'+getValues(result[i].total)+'</td>';
						str+='<td>'+getValues(result[i].govt)+'</td>';
						str+='<td>'+getValues(result[i].createdBy)+'</td>';
						str+='<td>'+getValues(result[i].panchayatName)+'</td>';
						str+='<td>'+getValues(result[i].mandalName)+'</td>';
						str+='<td>'+getValues(result[i].districtName)+'</td>';
					str+='</tr>';
				}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
				
	$("#inProgProjDetailsDivId").html(str);
	$("#inProgressProjectDetailsDataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP",
				filename:  'SmartAP'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); 
}

//PARTNERSHIP TAB START

function getPartnerShipAdoptionProgressViewDetails(){
		$("#firstBlockDivId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getPartnerShipAdoptionProgressViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildpartnerShipAdoptionProgressDetails(result);
		}
	})	
}
function buildpartnerShipAdoptionProgressDetails(result){
	str='';
	str+='<div class="white-block border_yash pad_10 m_top10">';
		str+='<h5 class="text-capital">Adoption Progress</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="partnerShipAdoptionProgressDataTable">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2" colspan="2">Indicator</th>';
						str+='<th rowspan="2">Total</th>';
						str+='<th colspan="8">Open</th>';
						str+='<th rowspan="2">Rejected</th>';
						str+='<th rowspan="2">Approved</th>';
					str+='</tr> ';
					str+='<tr>';
						str+='<th>Total</th>';
						str+='<th>%</th>';
						str+='<th>SAPF</th>';
						str+='<th>%</th>';
						str+='<th>ZPCEO</th>';
						str+='<th>%</th>';
						str+='<th>MPDO</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td rowspan="'+result[i].subList.length+'" style="vertical-align: middle;">'+result[i].name+'</td>';						;
						for(var j in result[i].subList){								
							str+='<td>'+getValues(result[i].subList[j].name)+'</td>';
							str+='<td>'+getValues(result[i].subList[j].total)+'</td>';
							str+='<td>'+getValues(result[i].subList[j].openTotal)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].subList[j].openTotalPerc)+'</td>';
							str+='<td>'+getValues(result[i].subList[j].openSAPF)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].subList[j].openSAPFPerc)+'</td>';
							str+='<td>'+getValues(result[i].subList[j].openZPCEO)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].subList[j].openZPCEOPerc)+'</td>';
							str+='<td>'+getValues(result[i].subList[j].openMPDO)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].subList[j].openMPDOPerc)+'</td>';
							str+='<td>'+getValues(result[i].subList[j].rejected)+'</td>';
							str+='<td>'+getValues(result[i].subList[j].approved)+'</td>';
						str+='</tr>';						
						}
					
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#firstBlockDivId").html(str);
	$("#partnerShipAdoptionProgressDataTable").dataTable({
		"aaSorting": [],
		"searching": false,
		"paging":   false,		
		"info":     false,
		/* "dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "APInnovationSociety",
				filename:  'APInnovationSociety_Activities'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		] */
	});
}
function getSectorWiseActivitiesForPartnerShip(){
		$("#secondBlockDivId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getSectorWiseActivitiesForPartnerShip',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildpartnerShipSectorWiseDetails(result);
		}
	})	
}
function buildpartnerShipSectorWiseDetails(result){
	str='';
	str+='<div class="white-block border_yash pad_10 m_top20">';
		str+='<h5 class="text-capital">Sector wise Activities</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="partnerShipSectorWiseDataTable">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Sector Name</th>';
						str+='<th>Partnership Activities</th>';
						str+='<th>Covered GPs</th>';
						str+='<th>Spendings</th>';
					str+='</tr> ';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
						if(getValues(result[i].name) != "-"){
							/* str+='<td class="ptnrshpSectorWiseDtlsCls" data-sector-id="'+result[i].id+'" data-type="Partner Activities" data-name="'+result[i].name+'">'+getValues(result[i].name)+'</td>'; */
							str+='<td>'+getValues(result[i].name)+'</td>';
						}else{
							str+='<td>'+getValues(result[i].name)+'</td>';
						}
							
							str+='<td>'+getValues(result[i].totalPartnerActivities)+'</td>';
							str+='<td>'+getValues(result[i].gpsCovered)+'</td>';
							str+='<td>'+getValues(result[i].spendings)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#secondBlockDivId").html(str);
	$("#partnerShipSectorWiseDataTable").dataTable({
		"aaSorting": [],
		"searching": false,
		"paging":   false,		
		"info":     false,
		/* "dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "APInnovationSociety",
				filename:  'APInnovationSociety_Activities'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		] */
	});
}
function getMonthlyTrendingGraphForPartnership(){
	$("#partnershipLineChartId").html(spinner);
	json={
		"year":partnershipYear,
	}
	$.ajax({
		type:'POST',
		url:'getMonthlyTrendingGraphForPartnership',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildMonthlyTrendingGraphForPartnership(result);
		}
	})	
}
function buildMonthlyTrendingGraphForPartnership(result){
	var str = '';
	var categories=[];
	var data=[];
	var mainData=[];	
	if(globalTrendingType == "adoption"){
		for(var i in result){
			categories.push(result[i].name);
			data.push(result[i].totalAdoption);	
		}
	} else {
		for(var i in result){
			categories.push(result[i].name);
			data.push(result[i].totalPartnerActivities);	
		}
	}
	mainData.push({"name" : '',"color" : '#353592', "data" : data});
	
	buildLineChart("partnershipLineChartId",categories,mainData)
}

function getNPRProgressView(){
		$("#firstBlockDivId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getNPRProgressView',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildNRPProgressViewDetails(result);
		}
	})	
}
function buildNRPProgressViewDetails(result){
	str='';
	str+='<div class="white-block border_yash pad_10 m_top10">';
		str+='<h5 class="text-capital">Sector wise Activities</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default">';
				str+='<thead>';
					str+='<tr>';
						str+='<th style="background-color: #73A3AE;">Program Name</th>';
						str+='<th style="background-color: #73A3AE;">Benefitted</th>';
						str+='<th style="background-color: #73A3AE;">Covered Panchayaths</th>';
						str+='<th style="background-color: #73A3AE;">Scheduled</th>';
						str+='<th style="background-color: #73A3AE;">Images</th>';
					str+='</tr> ';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td>'+getValues(result[i].name)+'</td>';
							str+='<td>'+getValues(result[i].benificiaries)+'</td>';
							str+='<td>'+getValues(result[i].gpsCovered)+'</td>';
							str+='<td>'+getValues(result[i].scheduledPanchayats)+'</td>';
							str+='<td>'+getValues(result[i].scheduledPanchayats)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#firstBlockDivId").html(str);
}
function getNPRTimelineAnalysis(){
		$("#secondBlockDivId").html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate
		}
	$.ajax({
		type:'POST',
		url:'getNPRTimelineAnalysis',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildNRPTimelineAnalysisDetails(result);
		}
	})	
}
function buildNRPTimelineAnalysisDetails(result){
	str='';
	str+='<div class="white-block border_yash pad_10 m_top20">';
		str+='<h5 class="text-capital">Time line Analysis</h5>';
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default"  id="nrpTimelinedataTable">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Timeline</th>';
						str+='<th>Benefitted</th>';
						str+='<th>Covered Panchayaths</th>';
						str+='<th>Images</th>';
					str+='</tr> ';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td>'+getValues(result[i].name)+'</td>';
							str+='<td>'+getValues(result[i].benificiaries)+'</td>';
							str+='<td>'+getValues(result[i].gpsCovered)+'</td>';
							str+='<td>'+getValues(result[i].imagesCount)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#secondBlockDivId").html(str);
	$("#nrpTimelinedataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP NRP TimeLine",
				filename:  'SmartAP NRP TimeLine'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); 		
}
function getNPRMonthlyTrendingDetails(){
	$("#NPRLineChartId").html(spinner);
	json={
		"year":nprYear
	}
	$.ajax({
		type:'POST',
		url:'getNPRMonthlyTrendingDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildNPRMonthlyTrendingDetails(result);
		}
	})	
}
function buildNPRMonthlyTrendingDetails(result){
	var categories=[];
	var data=[];
	var mainData=[];	
	for(var i in result){
		categories.push(result[i].name);
		data.push(result[i].total);	
	}
	mainData.push({"name" : '',"color" : '#353592', "data" : data});
	buildLineChart("NPRLineChartId",categories,mainData)
}
function buildLineChart(graphId,categories,mainData){
	$('#'+graphId).highcharts( {
	   chart: {
		  type: 'line',
		  //plotBorderColor: '#BFBFBF',
		 // plotBorderWidth: 1
		},
		title: "",
		xAxis: {
		  categories: categories,
		},
		yAxis: {
		  title: {
				text: 'P a n c h a y a t s / W a r d s'
		  },
		},  
		 tooltip: {
		  enabled: false
		},
		plotOptions: {
		  line: {
			dataLabels: {
			  enabled: false
			},
			enableMouseTracking: false
		  }
		},
		legend: {
		  enabled:false
		},
		series: mainData
  });
}
  

 
function getProjectLocationWiseDetails(locationtype,divId){
		$("#locationWise"+divId).html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate,
			"pType":locationtype
		}
	$.ajax({
		type:'POST',
		url:'getProjectLocationWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			buildProjectLocationWiseDetails(result,locationtype,divId);
			
		}
	})	
}
function buildProjectLocationWiseDetails(result,locationtype,divId){
	var str='';	
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="dataTable'+locationtype+'" style="width; 100%;">';
				str+='<thead style="background-color: #EFEFEF !important;">';
					str+='<tr>';
					str+='<th rowspan="2">District Name</th>';
					if(locationtype=="mandalWise"){
						str+='<th rowspan="2">Mandal Name</th>';
					}if(locationtype == "panchayatWise"){
						str+='<th rowspan="2">Mandal Name</th>';
						str+='<th rowspan="2">Panchayat Name</th>';
					}
						str+='<th rowspan="2">Total Projects</th>';
						str+='<th rowspan="2">Pendings</th>';
						str+='<th rowspan="2">%</th>';
						str+='<th rowspan="2">Approved</th>';
						str+='<th rowspan="2">%</th>';						
						str+='<th colspan="14">In Progress</th>';
						str+='<th rowspan="2">Completed</th>';
						str+='<th rowspan="2">%</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Total</th>';
						str+='<th>%</th>';
						str+='<th>Project Approved by State Level Committee for Matching Grants</th>';
						str+='<th>%</th>';
						str+='<th>Line estimate created by Executing Agency</th>';
						str+='<th>%</th>';
						str+='<th>Issue of G.O. by Planning Department</th>';
						str+='<th>%</th>';
						str+='<th>Partner Contribution deposited in District Collectors Account</th>';
						str+='<th>%</th>';
						str+='<th>Administrative Sanction issued by District Collector</th>';
						str+='<th>%</th>';
						str+='<th>Project Execution by Executing Agency/Line Department</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							if(locationtype=="districtWise"){
								str+='<td>'+getValues(result[i].name)+'</td>';
							}
							if(locationtype=="mandalWise"){
								str+='<td>'+getValues(result[i].districtName)+'</td>';
								str+='<td>'+getValues(result[i].name)+'</td>';
							}
							if(locationtype=="panchayatWise"){
								str+='<td>'+getValues(result[i].districtName)+'</td>';
								str+='<td>'+getValues(result[i].mandalName)+'</td>';
								str+='<td>'+getValues(result[i].name)+'</td>';
							}
							str+='<td>'+getValues(result[i].total)+'</td>';
							str+='<td>'+getValues(result[i].pending)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].pendingPerc)+'</td>';
							str+='<td>'+getValues(result[i].approved)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].approvedPerc)+'</td>';
							str+='<td>'+getValues(result[i].inProgress)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].inProgressPerc)+'</td>';
							for(var j in result[i].timelienList){
								//getComponentWiseDetails(type,sectorId,status,locationIdStr,filterValue,subFilterType,buildType)
								if(getValues(result[i].timelienList[j].inProgress) != "-"){
									if(locationtype=="districtWise"){
										str+='<td class="ProjLocDtlsCls" data-location-id-str="'+result[i].id+'" data-filter-value="" data-sub-filter-type="" data-level-type="Disrtict" data-name="'+result[i].name+'" data-phase="'+(parseInt(j)+1)+'">'+getValues(result[i].timelienList[j].inProgress)+'</td>';
									}if(locationtype=="mandalWise"){
										str+='<td class="ProjLocDtlsCls" data-location-id-str="'+result[i].districtId+'" data-filter-value="'+result[i].id+'" data-sub-filter-type="" data-level-type ="Mandal" data-name="'+result[i].name+'" data-phase="'+(parseInt(j)+1)+'">'+getValues(result[i].timelienList[j].inProgress)+'</td>';
									}if(locationtype=="panchayatWise"){
										str+='<td class="ProjLocDtlsCls" data-location-id-str="'+result[i].districtId+'" data-filter-value="'+result[i].mandalId+'" data-sub-filter-type="'+result[i].id+'" data-level-type="Panchayat" data-name="'+result[i].name+'" data-phase="'+(parseInt(j)+1)+'">'+getValues(result[i].timelienList[j].inProgress)+'</td>';
									}
								}else{
									str+='<td>'+getValues(result[i].timelienList[j].inProgress)+'</td>';
								}
								
								str+='<td class="text-success">'+getValues(result[i].timelienList[j].inProgressPerc)+'</td>';
							}
							str+='<td>'+getValues(result[i].completed)+'</td>';
							str+='<td class="text-success">'+getValues(result[i].completedPerc)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#locationWise"+divId).html(str);
	$("#dataTable"+locationtype).dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP Projects",
				filename:  'SmartAP Projects'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}

function getPartnershipLocationWiseDetails(locationtype,divId){
		$("#locationWise"+divId).html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate,
			"type":locationtype
		}
	$.ajax({
		type:'POST',
		url:'getPartnershipLocationWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			buildPartnershipsLocationWiseDetails(result,locationtype,divId);
			
		}
	})	
}
function buildPartnershipsLocationWiseDetails(result,locationtype,divId){
	var str='';	
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="dataTable'+locationtype+'" style="width: 100%;">';
				str+='<thead style="background-color: #EFEFEF !important;">';
					str+='<tr>';
					str+='<th rowspan="2">District Name</th>';
					if(locationtype=="mandalWise"){
						str+='<th rowspan="2">Mandal Name</th>';
					}if(locationtype == "panchayatWise"){
						str+='<th rowspan="2">Mandal Name</th>';
						str+='<th rowspan="2">Panchayat Name</th>';
					}
						str+='<th rowspan="2">Total GP/Wards</th>';
						str+='<th colspan="3">Adoption GP/Wards</th>';
						str+='<th colspan="2">Activities</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Total</th>';
						str+='<th>General</th>';
						str+='<th>Sector</th>';
						str+='<th>Total</th>';
						str+='<th>Covered GP/Wards</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							if(locationtype=="districtWise"){
								str+='<td>'+getValues(result[i].name)+'</td>';
							}
							if(locationtype=="mandalWise"){
								str+='<td>'+getValues(result[i].districtName)+'</td>';
								str+='<td>'+getValues(result[i].name)+'</td>';
							}
							if(locationtype=="panchayatWise"){
								str+='<td>'+getValues(result[i].districtName)+'</td>';
								str+='<td>'+getValues(result[i].mandalName)+'</td>';
								str+='<td>'+getValues(result[i].name)+'</td>';
							}
							str+='<td>'+getValues(result[i].total)+'</td>';
							if(getValues(result[i].totalAdoption) != "-"){
								if(locationtype=="districtWise"){
									/* str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].id+'" data-filter-value="" data-sub-filter-type="" data-level-type="Disrtict" data-name="'+result[i].name+'" data-category ="">'+getValues(result[i].totalAdoption)+'</td>'; */
									str+='<td>'+getValues(result[i].totalAdoption)+'</td>';
								}if(locationtype=="mandalWise"){
									/* str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].districtId+'" data-filter-value="'+result[i].id+'" data-sub-filter-type="" data-level-type ="Mandal" data-name="'+result[i].name+'" data-category ="">'+getValues(result[i].totalAdoption)+'</td>'; */
									str+='<td>'+getValues(result[i].totalAdoption)+'</td>';
								}/* if(locationtype=="panchayatWise"){
									str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].districtId+'" data-filter-value="'+result[i].mandalId+'" data-sub-filter-type="'+result[i].id+'" data-level-type="Panchayat" data-name="'+result[i].name+'" data-category ="">'+getValues(result[i].totalAdoption)+'</td>';
								} */
							}else{
								str+='<td>'+getValues(result[i].totalAdoption)+'</td>';
							}
							if(getValues(result[i].generalAdoption) != "-"){
								if(locationtype=="districtWise"){
									str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].id+'" data-filter-value="" data-sub-filter-type="" data-level-type="Disrtict" data-name="'+result[i].name+'" data-category ="General">'+getValues(result[i].generalAdoption)+'</td>';
								}if(locationtype=="mandalWise"){
									str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].districtId+'" data-filter-value="'+result[i].id+'" data-sub-filter-type="" data-level-type ="Mandal" data-name="'+result[i].name+'" data-category ="General">'+getValues(result[i].generalAdoption)+'</td>';
								}if(locationtype=="panchayatWise"){
									str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].districtId+'" data-filter-value="'+result[i].mandalId+'" data-sub-filter-type="'+result[i].id+'" data-level-type="Panchayat" data-name="'+result[i].name+'" data-category ="General">'+getValues(result[i].generalAdoption)+'</td>';
								}
							}else{
								str+='<td>'+getValues(result[i].generalAdoption)+'</td>';
							}		
							/* if(result[i].totalAdoption !=null && result[i].totalAdoption !='undefined' && typeof result[i].totalAdoption !='undefined'){
								str+='<td>'+parseFloat((result[i].generalAdoption/result[i].totalAdoption)*100).toFixed(2)+'</td>';
							}else{
								str+='<td>-</td>';
							} */
							
							if(getValues(result[i].sectorAdoption) != "-"){
								if(locationtype=="districtWise"){
									str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].id+'" data-filter-value="" data-sub-filter-type="" data-level-type="Disrtict" data-name="'+result[i].name+'" data-category ="Sector">'+getValues(result[i].sectorAdoption)+'</td>';
								}if(locationtype=="mandalWise"){
									str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].districtId+'" data-filter-value="'+result[i].id+'" data-sub-filter-type="" data-level-type ="Mandal" data-name="'+result[i].name+'" data-category ="Sector">'+getValues(result[i].sectorAdoption)+'</td>';
								}if(locationtype=="panchayatWise"){
									str+='<td class="prtnrshpLocDtlsCls" data-location-id-str="'+result[i].districtId+'" data-filter-value="'+result[i].mandalId+'" data-sub-filter-type="'+result[i].id+'" data-level-type="Panchayat" data-name="'+result[i].name+'" data-category ="Sector">'+getValues(result[i].sectorAdoption)+'</td>';
								}
							}else{
								str+='<td>'+getValues(result[i].sectorAdoption)+'</td>';
							}
							/* if(result[i].totalAdoption !=null && result[i].totalAdoption !='undefined' && typeof result[i].totalAdoption !='undefined'){
								str+='<td>'+parseFloat((result[i].sectorAdoption/result[i].totalAdoption)*100).toFixed(2)+'</td>';
							}else{
								str+='<td>-</td>';
							} */
							str+='<td class="text-success">'+getValues(result[i].totalPartnerActivities)+'</td>';
							str+='<td>'+getValues(result[i].gpsCovered)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#locationWise"+divId).html(str);
	$("#dataTable"+locationtype).dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP Partnerships",
				filename:  'SmartAP Partnerships'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function getNPRLocationWiseDetails(locationtype,divId){
		$("#locationWise"+divId).html(spinner);
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate,
			"type":locationtype
		}
	$.ajax({
		type:'POST',
		url:'getNPRLocationWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			buildNPRLocationWiseDetails(result,locationtype,divId);
			
		}else{
			$("#locationWise"+divId).html(NODATAMSG);
		}
	})	
}
function buildNPRLocationWiseDetails(result,locationtype,divId){
	var str='';	
		str+='<div class="table-responsive m_top10">';
			str+='<table class="table table-bordered table_default" id="dataTable'+locationtype+'" style="width: 100%;">';
				str+='<thead style="background-color: #EFEFEF !important;">';
					str+='<tr>';
					str+='<th rowspan="2">District Name</th>';
					if(locationtype=="mandalWise"){
						str+='<th rowspan="2">Mandal Name</th>';
					}if(locationtype == "panchayatWise"){
						str+='<th rowspan="2">Mandal Name</th>';
						str+='<th rowspan="2">Panchayat Name</th>';
					}
						str+='<th rowspan="2">Total GPs</th>';
						str+='<th rowspan="2">Covered</th>';
						str+='<th rowspan="2">%</th>';
						str+='<th rowspan="2">Benefitted</th>';
						str+='<th colspan="7">Completed Tentatives</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Total</th>';
						str+='<th>School</th>';
						str+='<th>%</th>';
						str+='<th>Youth</th>';
						str+='<th>%</th>';
						str+='<th>Community</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						if(getValues(result[i].totalBenifitted) !="-"){
							str+='<tr>';
								if(locationtype=="districtWise"){
									str+='<td>'+getValues(result[i].name)+'</td>';
								}
								if(locationtype=="mandalWise"){
									str+='<td>'+getValues(result[i].districtName)+'</td>';
									str+='<td>'+getValues(result[i].name)+'</td>';
								}
								if(locationtype=="panchayatWise"){
									str+='<td>'+getValues(result[i].districtName)+'</td>';
									str+='<td>'+getValues(result[i].mandalName)+'</td>';
									str+='<td>'+getValues(result[i].name)+'</td>';
								}
								str+='<td>'+getValues(result[i].total)+'</td>';
								str+='<td>'+getValues(result[i].gpsCovered)+'</td>';
								str+='<td class="text-success">'+getValues(result[i].projectDonationsPerc)+'</td>';
								str+='<td>'+getValues(result[i].totalBenifitted)+'</td>';
								str+='<td>'+getValues(result[i].completed)+'</td>';
								if(locationtype=="panchayatWise"){
									str+='<td class="nprImagesCls" data-id="'+result[i].id+'" data-program="School" data-location="'+result[i].name+'">'+getValues(result[i].studentsBenifitted)+'</td>';
								}else{
									str+='<td>'+getValues(result[i].studentsBenifitted)+'</td>';
								}
								str+='<td class="text-success">'+getValues(result[i].studentsBenifittedPercent)+'</td>';
								if(locationtype=="panchayatWise"){
									str+='<td class="nprImagesCls" data-id="'+result[i].id+'" data-program="Youth" data-location="'+result[i].name+'">'+getValues(result[i].youthBenifitted)+'</td>';
								}else{
									str+='<td>'+getValues(result[i].youthBenifitted)+'</td>';
								}
								str+='<td class="text-success">'+getValues(result[i].youthBenifittedPercent)+'</td>';
								if(locationtype=="panchayatWise"){
									str+='<td class="nprImagesCls" data-id="'+result[i].id+'" data-program="Community" data-location="'+result[i].name+'">'+getValues(result[i].publicBenifitted)+'</td>';
								}else{
									str+='<td>'+getValues(result[i].publicBenifitted)+'</td>';
								}
								str+='<td class="text-success">'+getValues(result[i].publicBenifittedPercent)+'</td>';
								
							str+='</tr>';
						}
						
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#locationWise"+divId).html(str);
	$("#dataTable"+locationtype).dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP NPR",
				filename:  'SmartAP NPR'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function getComponentWiseDetails(category,type,sectorId,status,locationIdStr,filterValue,subFilterType,buildType,pType){
		if(buildType == "onload"){
			$("#locationWiseComponent").html(spinner);
		}else if(buildType == "popup"){
			$("#inProgProjDetailsDivId").html(spinner);
		}		
		
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate,
			type: type,
			category: category,
			sector: sectorId,
			status:status,
			locationIdStr:locationIdStr,
			filterValue: filterValue,
			subFilterType: subFilterType,
			pType: pType
		}
	$.ajax({
		type:'POST',
		url:'getComponentWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			if(type =="GPs/wards Adoption Details"){
				buildComponentWiseGpDetails(result,buildType);
			}else if(type =="Projects Proposed"){
				buildComponentWiseProjectsDetails(result,sectorId,buildType);
			}else if(type =="Partner Activities"){
				buildComponentWisePartnerDetails(result,buildType);
			}
		}else{
			if(sectorId == "" && locationIdStr == ""){
				$("#locationWiseComponent").html(NODATAMSG);
			}else{
				$("#inProgProjDetailsDivId").html(NODATAMSG);
			}
		}
	})	
}
function buildComponentWiseGpDetails(result,buildType){
	var str='';
		str+='<div class="table-responsive m_top10" style="width; 100%;">';
		if(buildType == "onload"){
			str+='<table class="table table-bordered table_default" id="ComponentWiseGpDetailsDataTable" style="width; 100%;">';
		}else if(buildType == "popup"){
			str+='<table class="table table-bordered table_default" id="ComponentWiseGpDetailsDataTable1" style="width; 100%;">';
		}	
			
				str+='<thead style="background-color: #EFEFEF !important;">';
					str+='<tr>';
						str+='<th>Date</th>';
						str+='<th>Type</th>';
						str+='<th>Partner Name</th>';
						str+='<th>Email</th>';
						str+='<th>PhoneNumber</th>';
						str+='<th>District</th>';
						str+='<th>Mandal/Municipality</th>';
						str+='<th>Panchayat/Ward</th>';
						str+='<th>Status</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td>'+getValues(result[i].date)+'</td>';
							str+='<td>'+getValues(result[i].type)+'</td>';
							str+='<td>'+getValues(result[i].name)+'</td>';
							str+='<td>'+getValues(result[i].email)+'</td>';
							str+='<td>'+getValues(result[i].phoneNum)+'</td>';
							str+='<td>'+getValues(result[i].districtName)+'</td>';
							str+='<td>'+getValues(result[i].mandalName)+'</td>';
							str+='<td>'+getValues(result[i].panchayatName)+'</td>';
							str+='<td>'+getValues(result[i].status)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		if(buildType == "onload"){
			$("#locationWiseComponent").html(str);
			$("#ComponentWiseGpDetailsDataTable").dataTable({
				"iDisplayLength": 15,
				"aaSorting": [],
				"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
				"retrieve":true,
				"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-5'i><'col-sm-7'p>>",
				buttons: [
					{
						extend:    'csvHtml5',
						text:      '<i class="fa fa-file-text-o"></i>',
						titleAttr: 'CSV',
						title:	   "SmartAP Donations",
						filename:  'SmartAP Donations'+moment().format("DD/MMMM/YYYY  HH:MM"),
					}
				]
			});
		}else if(buildType == "popup"){
			$("#inProgProjDetailsDivId").html(str);
			$("#ComponentWiseGpDetailsDataTable1").dataTable({
				"iDisplayLength": 15,
				"aaSorting": [],
				"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
				"retrieve":true,
				"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-5'i><'col-sm-7'p>>",
				buttons: [
					{
						extend:    'csvHtml5',
						text:      '<i class="fa fa-file-text-o"></i>',
						titleAttr: 'CSV',
						title:	   "SmartAP Donations",
						filename:  'SmartAP Donations'+moment().format("DD/MMMM/YYYY  HH:MM"),
					}
				]
			});
		}		
	
	
}
function buildComponentWiseProjectsDetails(result,sectorId,buildType){
	var str='';
		str+='<div class="table-responsive m_top10" style="width; 100%;">';
			str+='<table class="table table-bordered table_default" id="componentProjectsDtls'+buildType.replace(/\s+/g, '')+'DataTable">';
				str+='<thead style="background-color: #EFEFEF !important;">';
					str+='<tr>';
						str+='<th>Project Created On</th>';
						str+='<th>Project Name</th>';
						str+='<th>Status</th>';
						str+='<th>Sector</th>';
						str+='<th>Donations</th>';
						str+='<th>Project Created By</th>';
						str+='<th>Panchayath</th>';
						str+='<th>Mandal/Muncipality</th>';
						str+='<th>District</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td>'+getValues(result[i].date)+'</td>';
							str+='<td>'+getValues(result[i].projectName)+'</td>';
							str+='<td>'+getValues(result[i].status)+'</td>';
							str+='<td>'+getValues(result[i].sector)+'</td>';
							str+='<td>'+getValues(result[i].totalDonations)+'</td>';
							str+='<td>'+getValues(result[i].createdBy)+'</td>';
							str+='<td>'+getValues(result[i].panchayatName)+'</td>';
							str+='<td>'+getValues(result[i].mandalName)+'</td>';
							str+='<td>'+getValues(result[i].districtName)+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	if(buildType == "onload"){
			$("#locationWiseComponent").html(str);
		}else{
			$("#inProgProjDetailsDivId").html(str);
		}
	$("#componentProjectsDtls"+buildType.replace(/\s+/g, '')+"DataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP",
				filename:  'SmartAP'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
function buildComponentWisePartnerDetails(result,buildType){
	if(buildType == "onload"){
		var str='';
			str+='<div class="table-responsive m_top10">';
				str+='<table class="table table-bordered table_default" id="componentWisePartnerdataTable">';
					str+='<thead style="background-color: #EFEFEF !important;">';
						str+='<tr>';
							str+='<th>Date</th>';
							str+='<th>Partner Name</th>';
							str+='<th>Title</th>';
							str+='<th>Sector</th>';
							str+='<th>Cost</th>';
							str+='<th>Panchayath</th>';
							str+='<th>Mandal/Municipality</th>';
							str+='<th>District</th>';
							str+='<th>Status</th>';
							str+='<th>Img</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						for(var i in result){
							str+='<tr>';
								str+='<td>'+getValues(result[i].date)+'</td>';
								str+='<td>'+getValues(result[i].name)+'</td>';
								str+='<td>'+getValues(result[i].title)+'</td>';
								str+='<td>'+getValues(result[i].sector)+'</td>';
								str+='<td>'+getValues(result[i].activitycost)+'</td>';
								str+='<td>'+getValues(result[i].panchayatName)+'</td>';
								str+='<td>'+getValues(result[i].mandalName)+'</td>';
								str+='<td>'+getValues(result[i].districtName)+'</td>';
								str+='<td>'+getValues(result[i].status)+'</td>';
								if(getValues(result[i].imagesCount) != "-"){
									str+='<td class="imgClkCls go_clickCr" style="cursor:pointer; width:230px;height: 140px;" attr_sector_id="'+result[i].sectorId+'" attr_count="'+result[i].imagesCount+'" attr_district_id="'+result[i].districtId+'" attr_mandal_id="'+result[i].mandalId+'" attr_village_id="'+result[i].panchayatId+'">'+getValues(result[i].imagesCount)+'</td>';	
								}
								else{
									str+='<td>'+getValues(result[i].imagesCount)+'</td>';	
								}
							str+='</tr>';
						}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		$("#locationWiseComponent").html(str);
	}else{
		var str='';
		str+='<ul class="list-inline m_top10 imagesSliderCls">';
		for(var i in result){
			for(var j in result[i].imageList){
				str+='<li>';
				str+='<div class="thumbnail">';
				  str+='<img class= "m_top5 img-responsive" onerror="setDefaultImage(this);"alt="" style="cursor:pointer; width:230px;height: 140px;" src="'+result[i].imageList[j]+'" >';
					
					str+='<div class="caption">';
					  str+='<h5>Status :<span class="font_weight m_left_5" style="cursor:pointer;">'+result[i].status+'</span></h5>';
					  str+='<h5 class="m_top5">District :<span class="font_weight m_left_5" >'+result[i].districtName+'</span></h5>';
					  str+='<h5 class="m_top5">Tehsil :<span class="font_weight m_left_5" >'+result[i].mandalName+'</span></h5>';
					  str+='<h5 class="m_top5">Panchayat :<span class="font_weight m_left_5" >'+result[i].panchayatName+'</span></h5>';
					  str+='<h5 class="m_top5">Date :<span class="font_weight m_left_5" >'+result[i].date+'</span></h5>';
					str+='</div>';
				  str+='</div>';
			str+='</li>';
			}
			
		}
		str+='</ul>';
		$("#inProgProjDetailsDivId").html(str);
		$('.imagesSliderCls').slick({
			slide: 'li',
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
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
	$("#componentWisePartnerdataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP",
				filename:  'SmartAP'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
 function getComponentWiseDonationDetails(type,districtId,locationTypeId,locationId,buildType){
		if(buildType == "onload"){
			$("#locationWiseComponent").html(spinner);
		}else if(buildType == "popup"){
			$("#inProgProjDetailsDivId").html(spinner);
		}
		
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate,
			type: type,	//DonatedTowards(Project,Panchayat/Ward,Pool Fund)
			districtId: districtId,		//District Id
			locationTypeId: locationTypeId,		//Mandal Id
			locationId: locationId		//Panchayat Id 
		}
	$.ajax({
		type:'POST',
		url:'getComponentWiseDonationDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildComponentWiseDonationDetails(result,buildType);			
		}else{
			if(buildType == "onload"){
			$("#locationWiseComponent").html(NODATAMSG);
		}else if(buildType == "popup"){
			$("#inProgProjDetailsDivId").html(NODATAMSG);
		}
		}
	})	
}
function buildComponentWiseDonationDetails(result,buildType){
	var str='';
		str+='<div class="groupBox border_yash pad_10">';
			str+='<div class="table-responsive m_top10">';
				str+='<table class="table table-bordered table_default" style="font-size: 12px;" id="compDonationsDataTable">';
					str+='<thead>';
						str+='<tr>';
							str+='<th>Date</th>';
							str+='<th>Partner</th>';
							str+='<th>Amount</th>';
							str+='<th>Type</th>';
							str+='<th>Project</th>';
							str+='<th>District</th>';
							str+='<th>Mandal/Muncipality</th>';
							str+='<th>Panchayat/Ward</th>';
						str+'</tr>';
					str+='</thead>';
					str+='<tbody style="background-color: #fff;">';
						for(var i in result){
							if(result[i].status != null && result[i].status == "TXN_SUCCESS"){
								str+='<tr>';
								str+='<td>'+getValues(result[i].date)+'</td>';
								str+='<td>'+getValues(result[i].partnerName)+'</td>';
								str+='<td>'+getValues(result[i].amount)+'</td>';
								str+='<td>'+getValues(result[i].type)+'</td>';
								if(result[i].projectName !='null'){
									str+='<td>'+getValues(result[i].projectName)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td>'+getValues(result[i].districtName)+'</td>';
								str+='<td>'+getValues(result[i].mandalName)+'</td>';
								str+='<td>'+getValues(result[i].panchayatName)+'</td>';
							str+='</tr>'
							}
						}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
	if(buildType == "onload"){
		$("#locationWiseComponent").html(str);
	}else if(buildType == "popup"){
		$("#inProgProjDetailsDivId").html(str);
	}
	
	$("#compDonationsDataTable").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [15, 30,50, "All"]],
		"retrieve":true,
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "SmartAP Donations",
				filename:  'SmartAP Donations'+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}


//NPR clicks call
 function getNPRImageDetailsLocationWise(locationId,programName){		
		$("#inProgProjDetailsDivId").html(spinner);		
		json={
			fromDate:allTickFromDate,
			toDate:allTickToDate,
			locationId: locationId,	//Panchayat Id	
			program:programName
		}
	$.ajax({
		type:'POST',
		url:'getNPRImageDetailsLocationWise',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length >0){
			buildtNPRImageDetailsLocationWise(result,locationId);			
		}else{		
			$("#inProgProjDetailsDivId").html(NODATAMSG);
		
		}
	})	
}

function buildtNPRImageDetailsLocationWise(result,locationId){
	var str = '';
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="table-responsive m_top10">';
				str+='<table class="table table-bordered table_custom_SC" id="">';
					str+='<thead>';
						str+='<tr>';
							str+='<th>Programme Name</th>';
							str+='<th>Status</th>';
							str+='<th>Start Date</th>';
							str+='<th>End Date</th>';
							str+='<th>Time Between</th>';
							str+='<th>Duration</th>';
							str+='<th>Module on</th>';
							str+='<th>Benefitted</th>';
							str+='<th>Images</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						str+='<tr>';
							str+='<td>'+result[0].projectName+'</td>';
							if(result[0].status != null && result[0].status){
								str+='<td><i class="fa fa-check" aria-hidden="true"></i></td>';
							}else{
								str+='<td><i class="fa fa-times" aria-hidden="true"></i></td>';
							}							
							str+='<td>'+result[0].startDate+'</td>';
							str+='<td>'+result[0].endDate+'</td>';
							str+='<td>'+result[0].timeBetween+'</td>';
							str+='<td>'+result[0].duration+'</td>';
							str+='<td>'+result[0].moduleOn+'</td>';
							str+='<td>'+result[0].benificiaries+'</td>';
							str+='<td>'+result[0].imagesCount+'</td>';
							
						str+='</tr>';
						
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-12">';
			str+='<ul class="list-inline smartAPImagesSlickSlider'+locationId+'">';
			for(var i in result[0].imageList){
				str+='<li class="col-sm-3 m_top10">';
					str+='<div class="ugdImagesCss">';
						str+='<img src="'+result[0].imageList[i]+'" style="width: 100%;height: 200px;"/>';
						str+='<div class="card-img-overlay1">';							
						str+='</div>';
					str+='</div>';
				str+='</li>';
			}
			str+='</ul>';
		str+='</div>';
	str+='</div>';
	$("#inProgProjDetailsDivId").html(str);
	$(".smartAPImagesSlickSlider"+locationId).slick({
		slides:'li',
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		variableWidth: false,
		autoplay:true,
		arrows: true,
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
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	 });
}
// MAIN TABS 
$(document).on("click",".mediaWiseTabsClickCls",function(){
  var tabId=$(this).attr('attr_tab_name'); 
  $('.mediaWiseTabsClickCls').css("border","");
  $(this).css("border","1px solid #39FF00");
  $('.componentAnalysisShowHideCls').hide();
  $("#componentWiseTabId").html(tabId.toUpperCase()+" COMPONENT ANALYSIS");
  $('#'+tabId).show();
  if(tabId == "projects"){
	getProjectsProgressViewDetails();
	getProjectTimeLineAnalysisDetails();
	getProjectsSectorWiseAnalysis(); 
	for(var i in locationWiseArr){
		if(locationWiseArr[i].type != ""){
			 getProjectLocationWiseDetails(locationWiseArr[i].type,locationWiseArr[i].name);
		}
	}
  }else if(tabId == "partnership"){
	  getPartnerShipAdoptionProgressViewDetails();
	  getSectorWiseActivitiesForPartnerShip();
	  getMonthlyTrendingGraphForPartnership();
	  $("#partnerShipsGraphDivId").show();
	  $("#thirdBlockDivId").html("");	
	  for(var i in locationWiseArr){
		if(locationWiseArr[i].type != ""){
			 getPartnershipLocationWiseDetails(locationWiseArr[i].type,locationWiseArr[i].name);
		}
	}
  }else if(tabId == "naipunyaratham"){
	  getNPRProgressView();
	  getNPRTimelineAnalysis();
	  getNPRMonthlyTrendingDetails();
	  $("#NPRGraphDivId").show();	
	  $("#partnerShipsGraphDivId").hide();
	  $("#thirdBlockDivId").html("");
	  for(var i in locationWiseArr){
		if(locationWiseArr[i].type != ""){
			 getNPRLocationWiseDetails(locationWiseArr[i].type,locationWiseArr[i].name);
		}
	}
  }else if(tabId == "donations"){
	getDonationProgressOverViewDetails();
	getDonationTimeLineAnalysisDetails();
	$("#thirdBlockDivId").html("");
	$("#partnerShipsGraphDivId").hide();
	$("#NPRGraphDivId").hide();
	  for(var i in locationWiseArr){
		if(locationWiseArr[i].type != ""){
			getDonationsLocationWiseDetails(locationWiseArr[i].type,locationWiseArr[i].name);
		}
	}
  }

});
$(document).on("click",".getDonarsDetailsCls",function(){
	var type= $(this).data("type");
	var name= $(this).data("name");
	$("#inProgProjTitle").html(name+" Donors  Details")
	$("#inProgProjId").modal('show');
	getComponentWiseDonationDetails(type,"","","","popup");
})

$(document).on("click",".monthlyTrndingulStyleCls li",function(){
	$(this).closest('ul').find("li").removeClass('active');
	$(this).addClass('active');
	globalTrendingType=$(this).attr('attr_type');	
	getMonthlyTrendingGraphForPartnership();
});

$(document).on("change","#partnershipYearId",function(){
	partnershipYear = $("#partnershipYearId option:selected").val();
	getMonthlyTrendingGraphForPartnership();
});
$(document).on("change","#NRPYearId",function(){
	nprYear = $("#NRPYearId option:selected").val();
	getNPRMonthlyTrendingDetails();
})

$(document).on("click",".projectTimelyanalysisCls",function(){
	var $this = $(this),
		type = $this.data("type"),
		phase = $this.data("phase"),
		program = $this.data("program");
		$("#inProgProjTitle").html("Phase "+phase+" Details ( "+type+" )");
		$("#inProgProjId").modal('show');
		getProjectProposalsInProgressDetails(type,program);
})
	//getComponentWiseDetails(type,sectorId,status,locationIdStr,filterValue,subFilterType)

$(document).on("click",".projSectorWiseDetailsCls",function(){
	var $this = $(this),
		type = $this.data("type"),
		sectorId = $this.data("sector-id"),	
		statusId = $this.data("status-id");	
		$("#inProgProjTitle").html(" "+statusId+" Details");
		$("#inProgProjId").modal('show');
	    getComponentWiseDetails("",type,sectorId,statusId,"","","","popup","")
})

$(document).on("click",".ptnrshpSectorWiseDtlsCls",function(){
	var $this = $(this);
		type = $this.data("type"),
		name = $this.data("name"),
		sectorId = $this.data("sector-id"),
		$("#inProgProjTitle").html(name+" Details");
		$("#inProgProjId").modal('show');
		getComponentWiseDetails("",type,sectorId,"","","","","popup","")
});

// location wise clicks(Projects)
$(document).on("click",".ProjLocDtlsCls",function(){
	var $this =$(this),
		locationIdStr = $this.data("location-id-str"),
		filterValue = $this.data("filter-value"),
		subFilterType = $this.data("sub-filter-type"),
		levelType = $this.data("level-type"),
		phase = $this.data("phase"),
		name = $this.data("name");
		$("#inProgProjTitle").html(name+" "+levelType+" Phase "+phase+" Details");
		$("#inProgProjId").modal('show');
		getComponentWiseDetails("","Projects Proposed","","",locationIdStr,filterValue,subFilterType,"popup","");
})



// location wise clicks (Partnership)
$(document).on("click",".prtnrshpLocDtlsCls",function(){
	var $this =$(this),
		locationIdStr = $this.data("location-id-str"),
		filterValue = $this.data("filter-value"),
		subFilterType = $this.data("sub-filter-type"),
		levelType = $this.data("level-type"),
		category = $this.data("category"),
		name = $this.data("name");
		$("#inProgProjTitle").html(name+" "+levelType+" "+category +" Details");
		$("#inProgProjId").modal('show');
		getComponentWiseDetails(category,"GPs/wards Adoption Details","","",locationIdStr,filterValue,subFilterType,"popup","");
})

// NPR Panchayat level click
 $(document).on("click",".nprImagesCls",function(){
	var $this = $(this),
		locationId  = $this.data("id");
		programName = $this.data("program");
		locationName=  $this.data("location");
	$("#inProgProjTitle").html("Naipunya Ratham Of ("+locationName+")- WOW");
	$("#inProgProjId").modal('show');
	getNPRImageDetailsLocationWise(locationId,programName)	//13286
}) 



$(document).on("click",".ulTabStyleCls1 li",function(){
	$(".ulTabStyleCls1 li").removeClass("active"); 
	 $(this).addClass("active");  
	var type = $(this).attr("attr_type");
	if(type ==""){
		getComponentWiseDonationDetails("","","","","onload")
	}else{
		getComponentWiseDetails("",type,"","","","","","onload","");
	} 
	 
});
 $(document).on("click",".imgClkCls",function(){
	 var sectorId=$(this).attr("attr_sector_id");
	 var districtId =$(this).attr("attr_district_id");
	 var mandalId =$(this).attr("attr_mandal_id");
	 var villageId =$(this).attr("attr_village_id");
	$("#inProgProjTitle").html("PartnerActivity ("+$(this).attr("attr_count")+") Images");
	$("#inProgProjId").modal('show');
	getComponentWiseDetails("","Partner Activities",sectorId,"",districtId,mandalId,villageId,"popup","click");
}); 
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