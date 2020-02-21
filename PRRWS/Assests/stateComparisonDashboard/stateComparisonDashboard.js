var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var globalResult;
var globalLocationType="";
var globalLocationId="";
var globalLocationName="";
var globalStatusBackGroundObj={"0":"#f7b519","1":"#f7b519","2":"#f7b519","3":"#00AF50","4":"#00AF50","5":"#00AF50","6":"#FF0000","7":"#FF0000","8":"#FF0000","9":"#FF0000","10":"#FF0000","11":"#FF0000","12":"#FF0000","13":"#FF0000","14":"#FF0000","15":"#FF0000","16":"#FF0000","17":"#FF0000","18":"#FF0000","19":"#FF0000","20":"#FF0000","21":"#FF0000","22":"#FF0000","23":"#FF0000","24":"#FF0000","25":"#FF0000","26":"#FF0000","27":"#FF0000","28":"#FF0000","29":"#FF0000","30":"#FF0000","31":"#FF0000","32":"#FF0000","33":"#FF0000","34":"#FF0000","35":"#FF0000","36":"#FF0000",">5":"#FF0000"};

var globalStatusBackGroundObjofApFinancialRanking={"1":"#167522", "2":"#3f9649", "3":"#57aa5f", "4":"#68aa6d", "5":"#63bf69", "6":"#84cc88", "7":"#8bc991", "8":"#96d19b", "9":"#8ddd94", "10":"#75e57e", "11":"#62AB2F", "12":"#65B030", "13":"#68B531", "14":"#6AB931", "15":"#6FBC37", "16":"#74C03D", "17":"#71b775", "18":"#7AC642", "19":"#7EC947", "20":"#7DCB44", "21":"#7DCE42", "22":"#7DD240", "23":"#82D547", "24":"#83D947", "25":"#7cb27f", "26":"#89E14C", "27":"#89E34B", "28":"#8bd38f", "29":"#89ED45", "30":"#89F043", "31":"#91d695", "32":"#93F551", "33":"#97F757", "34":"#9FFB61"};
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
$(".chosen-select").chosen();
getFinancialYear();
getAllDistricts();
function getAllDistricts(){ 
	$("#districtId").html("");
	var json={
		searchLevelId:2,
		searchLevelValue:1,
		type:""
	}
	$.ajax({
		type:'POST',
		url:'getAllSubLocations',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#districtId").append("<option value='0'>Select District</option>")
		 if(result != null && result.length>0){
			 for(var i in result){
				 if(i==0){
					 $("#districtId").append("<option value="+result[i].id+" selected>"+result[i].name+"</option>")
				 }else{
					 $("#districtId").append("<option value="+result[i].id+">"+result[i].name+"</option>")
				 }
				
			 }
			 
		}
		$("#districtId").trigger("chosen:updated");
		
	})
}
$(document).on("change","#districtId",function(){
	var districtId = $("#districtId").val();	
	if(districtId == 0){
		alert("Please Select District");
		return;
	}
	onloadCalls("districtChange");
});
$(document).on("click",".comparisionCls li",function(){	
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	if(type == "state"){
		$(".districtCls").hide();
		onloadCalls("stateChange");
	}else{
		$(".districtCls").show();
		$("#districtId").val(22);
		$("#districtId").trigger("chosen:updated");
		onloadCalls("districtChange");
	}
	
});
function getFinancialYear(){ 
	var json={
		
	}
	$.ajax({
		type:'POST',
		url:'getFinancialYear',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if(result != null && result.length>0){
			buildFinancialYear(result);
		}else{
			$("#finicalYearId").html("No Data Available")
		} 
	})
}

function buildFinancialYear(result){
	var year='';
	year+='<option value="0">Select Financial Year</option>';
	for(var i in result){
		if(result[i].nregaFinancialYearId >= 9 && result[i].nregaFinancialYearId <= 13){
			if(result[i].nregaFinancialYearId == 13){
				year+='<option value="'+result[i].nregaFinancialYearId+'" selected>'+result[i].yearDesc+'</option>';
			}else{
				year+='<option value="'+result[i].nregaFinancialYearId+'">'+result[i].yearDesc+'</option>';
			}
		}
	}
	$("#finicalYearId").html(year).chosen().trigger("chosen:updated");
	onloadCalls("stateChange");
}
$(document).on("change","#finicalYearId",function(){
	var camparisionChangeVal='';
	var yearId = $("#finicalYearId").val();	
	if(yearId == 0){
		alert("Please Select Financial Year");
		return;
	}
	var districtId = $("#districtId").val();	
	if(districtId == 0){
		alert("Please Select District");
		return;
	}
	$( ".comparisionCls li" ).each(function( index ) {
		if($(this).hasClass("active")){
			var type = $(this).attr("attr_type");
			if(type == "state"){
				camparisionChangeVal = "stateChange"
			}else{
				camparisionChangeVal = "districtChange"
			}
		}
	});	
	onloadCalls(camparisionChangeVal);
	$(".state").prop('checked',false);
	$("#rankCheckedId").prop('checked',true);
});
function getLastUpdatedTime(){
	var json={
		locationType :globalLocationType
	}
	$.ajax({
		type:'POST',
		url:'getLastUpdatedTime',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if(result != null){
			$("#lastUpdatedTimeId").html(result.lastUpdatedTime);
		}else{
			$("#lastUpdatedTimeId").html("");
		} 
	})
}

function onloadCalls(buildTypeChange){
	var yearName = $("#finicalYearId option:selected").text();
	$("#financialNameId").html(yearName+" FINANCIAL YEAR OVERVIEW");
	var locationId = $("#districtId").val();//pj
	var locationName = $("#districtId").find("option:selected").text();
	$(".top5Cls").prop('checked',true);
	$(".rankCls").prop('checked',false);
	var yearId = $("#finicalYearId").val();	
	if(yearId == 0){
		alert("Please Select Financial Year");
		return;
	}
	if(buildTypeChange == "stateChange"){
		globalLocationType="state";
		globalLocationId=1;
		$(".levelTypeCls").html("Andhra Pradesh");
		$(".comparisionHeadingCls").html("States ");
		$(".showHideBasedOnCompCls").show();
		$(".headerTypeCls").html("States ");
	}else{
		globalLocationType="district";
		globalLocationId=locationId;
		$(".levelTypeCls").html(locationName);
		$(".comparisionHeadingCls").html("Districts ");
		globalLocationName = locationName;
		$(".showHideBasedOnCompCls").hide();
		$(".headerTypeCls").html("Districts ");
	}
	
	
	getFinacialYearOverViewDetails();
	getAllStatesComparisionDetails();
	getAPVsFinancialRankings();
	getTopRankStatesComparisionDetails();
	getLastUpdatedTime();
}

function getFinacialYearOverViewDetails(){ //Main Call
	$('#componentsOverview').html(spinner);
	$('#rankingOverview').html(spinner);
	var yearId = $("#finicalYearId").val();
	
	var json={
		deptId : yearId,
		locationType :globalLocationType,
		locationId :globalLocationId
	}
	$.ajax({
		type:'POST',
		url:'getFinacialYearOverViewDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if(result != null && result.length>0){
			buildOverviewForCompoents(result);
		}else{
			$("#rankingOverview").html("No Data Available")
		} 
	})
}
function buildOverviewForCompoents(result){
	var str='';
	var str1='';
	str1+='<div class="table-responsive m_top10">';
		str1+='<table class="table text_cen border_0">';
			str1+='<thead class="theadClr">';
				str1+='<tr>';
					str1+='<th>Rank No</th>';
					str1+='<th>No.of components</th>';
				str1+='</tr>';
			str1+='</thead>';
			str1+='<tbody>';
			for(var i in result){
				for(var j in result[i].subList){
				str1+='<tr>';
					/* if(j==0){
						str1+='<td><div class="roundCircle color_white bgcolor_mar" style="background-color:rgba(31, 124, 46,1.'+j+')">'+result[i].subList[j].name+'</div></td>';
					}
					else{
						str1+='<td><div class="roundCircle color_white bgcolor_mar" style="background-color:rgba(31, 124, 46,0.'+[(parseInt(result[i].subList.length)-j)+4]+')">'+result[i].subList[j].name+'</div></td>';
					} */
					
					str1+='<td><div class="roundCircle color_white bgcolor_mar" style="background-color:'+globalStatusBackGroundObj[result[i].subList[j].name]+'">'+result[i].subList[j].name+'</div></td>';
					if(result[i].subList[j].name == '>5'){
						str1+='<td><h4 class="font_weight m_top10">'+result[i].subList[j].rankWiseComponetCunt+' <small class="" style="color:#FF9800;">('+result[i].subList[j].percentage+'%)</small></h4></td>';
					} else {
						str1+='<td><h4 class="font_weight m_top10">'+result[i].subList[j].rankWiseComponetCunt+' <small class="" style="color:#1F5E2F;">('+result[i].subList[j].percentage+'%)</small></h4></td>';
					}
				str1+='</tr>';
				}
			}
			str1+='</tbody>';
		str1+='</table>';
	str1+='</div>';
	
	//var globalStatusBackGroundObjofApFinancialRanking={"1":"rgba(31, 124, 46,1.0)", "2":"#39641B", "3":"#40701E", "4":"#477D22", "5":"#4B8524", "6":"#4F8C26", "7":"#549428", "8":"#599A2C", "9":"#5B9E2C", "10":"#5EA42D"};
	
	for(var i in result){
		str+='<div class="col-sm-4 m_top5">';
			str+='<div class="panel-body" style="border:1px solid #ddd;">';
				str+='<div class=row>';
					str+='<div class="col-sm-6">';
						if(result[i].parameterName !=null && result[i].parameterName.length>10){
							str+='<h5 class="font_weight text-center tooltipCls" style="cursor:pointer;" data-toggle="tooltip" data-placement="right" title="'+result[i].parameterName+'">'+result[i].parameterName.substring(0,10)+'...</h5>';
						}else{
							str+='<h5 class="font_weight text-center">'+result[i].parameterName+'</h5>';
						}
						
						if(result[i].parameterType == 'Amount In Lakhs') {
							str+='<h6 class="font_weight m_top15 text-center" style="color:#1F5E2F;">'+result[i].amount1+'&nbsp;(Cr)</h6>';
						}else if(result[i].parameterType == 'Kilo Meters'){
							str+='<h6 class="font_weight m_top15 text-center" style="color:#1F5E2F;">'+result[i].amount1+'&nbsp;(KM)</h6>';
						}else if(result[i].parameterType == 'Units'){
							str+='<h6 class="font_weight m_top15 text-center" style="color:#1F5E2F;">'+result[i].amount1+'&nbsp;(Un)</h6>';
						}else if(result[i].parameterType == 'Percentage'){
							str+='<h6 class="font_weight m_top15 text-center" style="color:#1F5E2F;">'+result[i].amount1+'&nbsp;(%)</h6>';
						}else{
							str+='<h6 class="font_weight m_top15 text-center" style="color:#1F5E2F;">'+result[i].amount1+'&nbsp;(&nbsp;'+result[i].parameterType+'&nbsp;)</h6>';
						}
					str+='</div>';
					str+='<div class="col-sm-6">';
						str+='<h4>';
						/* if(result[i].rank==1)
						{
							str+='<span class="f_16 roundCircle color_white" style="background-color:rgba(31, 124, 46,1.0);">'+result[i].rank+'</span>';
						}else{
							str+='<span class="f_16 roundCircle color_white" style="background-color:rgba(31, 124, 46,0.7)">'+result[i].rank+'</span>';
						} */
						
						if(result[i].parameterName == "Total Expenditure" || result[i].parameterName == "Wages" || result[i].parameterName == "Material & Skilled" || result[i].parameterName == "Payments Generated In 15 D") {
							str+='<img src="Assests/icons/Group 3146.png">';
							
						}else if(result[i].parameterName == "HH Employement Provided" || result[i].parameterName == "HH 100 Days"){
							str+='<img src="Assests/icons/Group 3148.png">';
							
						}else if(result[i].parameterName == "Person Days"){
							str+='<img src="Assests/icons/Group 3147.png">';
							
						}else if(result[i].parameterName == "Vermi"){
							str+='<img src="Assests/icons/Group 3149.png">';
							
						}else if(result[i].parameterName == "AWC"){
							str+='<img src="Assests/icons/Group 3150.png">';
							
						}else if(result[i].parameterName == "IHHL"){
							str+='<img src="Assests/icons/Group 3151.png">';
							
						}else if(result[i].parameterName == "Avenue"){
							str+='<img src="Assests/icons/Group 3152.png">';
							
						}else if(result[i].parameterName == "Form Ponds"){
							str+='<img src="Assests/icons/Group 3153.png">';
							
						}
						str+='<span class="f_16 roundCircle color_white pull-right" style="background-color:'+globalStatusBackGroundObj[result[i].rank]+'">'+result[i].rank+'</span>';
						str+='</h4>';
					str+='</div>';
					
				str+='</div>';
			str+='</div>';
			str+='</div>';
			
	}
	$('#componentsOverview').html(str);
	$('#rankingOverview').html(str1);
	$(".tooltipCls").tooltip();
}


function getTopRankStatesComparisionDetails(){ //Main Call
	$('#allStatesComparison').html(spinner);
	var yearId = $("#finicalYearId").val();
	var json={
		deptId : yearId,
		locationType :globalLocationType,
		locationId :globalLocationId
	}
	$.ajax({
		type:'POST',
		url:'getTopRankStatesComparisionDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if(result != null && result.length > 0){
			buildAllStatesComparison(result,5);
			globalResult = result;
		}else{
			$("#allStatesComparison").html("No Data Available")
		} 
	})
}

function buildAllStatesComparison(result,value){
	var str='';
	
		str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered  dataTableTopRankStatesComparison table_custom_SC">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2" class="text_middle text-center">Component Name</th>';
					for(var i in result[0].subList){
						if(parseInt(i) < parseInt(value)) {
							str+='<th colspan="2"><h6 class="text-center"><span class="all_states_rounded" style="background-color:'+globalStatusBackGroundObj[result[0].subList[i].rank]+'">'+result[0].subList[i].rank+'</span></h6>';
						}
					}
				str+='</tr>';
				str+='<tr>';
					for(var i in result[0].subList){
						if(parseInt(i) < parseInt(value)) {
							str+='<th>'+globalLocationType+'&nbsp;Name</th>';
							str+='<th>value</th>';
						}
					}
					
				str+='</tr>';
				
			str+='</thead>';
			str+='<tbody class="text_cen td_padding">';
			for(var i in result){
				if(result[i] != null){
				str+='<tr>';
					str+='<td class="" style="text-align:left !important;">'+result[i].parameterName+'</td>';
						for(var j in result[i].subList){
							if(parseInt(j) < parseInt(value)){
								if(result[i].subList[j].name == "Andhra Pradesh"){
									str+='<td style="background-color:rgba(31, 124, 46,0.4)"><h6>'+result[i].subList[j].name+'</h6></td>';
									str+='<td style="background-color:rgba(31, 124, 46,0.4)">';
										 if(result[i].subList[j].parameterType == 'Amount In Lakhs') {
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(Cr)</h6>';
										}else if(result[i].subList[j].parameterType == 'Kilo Meters'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(KM)</h6>';
										}else if(result[i].subList[j].parameterType == 'Units'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(Un)</h6>';
										}else if(result[i].subList[j].parameterType == 'Percentage'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(%)</h6>';
										}else{
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(&nbsp;'+result[i].subList[j].parameterType+'&nbsp;)</h6>';
										} 
									str+='</td>';
								}else if(result[i].subList[j].name == globalLocationName){
									str+='<td style="background-color:rgba(31, 124, 46,0.4)"><h6>'+result[i].subList[j].name+'</h6></td>';
									str+='<td style="background-color:rgba(31, 124, 46,0.4)">';
										 if(result[i].subList[j].parameterType == 'Amount In Lakhs') {
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(Cr)</h6>';
										}else if(result[i].subList[j].parameterType == 'Kilo Meters'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(KM)</h6>';
										}else if(result[i].subList[j].parameterType == 'Units'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(Un)</h6>';
										}else if(result[i].subList[j].parameterType == 'Percentage'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(%)</h6>';
										}else{
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(&nbsp;'+result[i].subList[j].parameterType+'&nbsp;)</h6>';
										} 
									str+='</td>';
								}else{
									str+='<td><h6>'+result[i].subList[j].name+'</h6></td>';
									str+='<td>';
										 if(result[i].subList[j].parameterType == 'Amount In Lakhs') {
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(Cr)</h6>';
										}else if(result[i].subList[j].parameterType == 'Kilo Meters'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(KM)</h6>';
										}else if(result[i].subList[j].parameterType == 'Units'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(Un)</h6>';
										}else if(result[i].subList[j].parameterType == 'Percentage'){
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(%)</h6>';
										}else{
											str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(&nbsp;'+result[i].subList[j].parameterType+'&nbsp;)</h6>';
										} 
									str+='</td>';
								}
								
							}
						}
 				str+='</tr>';
				}
			}
			str+='</tbody>';
		str+='</table>';
		str+='</div>';
		
	$('#allStatesComparison').html(str);
	 $(".dataTableTopRankStatesComparison").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 20,50,100, -1], [15, 20,50,100, "All"]],
	}); 
}

$(document).on("change",".state",function(){	
  $(".state").prop('checked',false);
  var value = $(this).val();
  $(this).prop('checked',true);
  buildAllStatesComparison(globalResult,value);
});

function getAllStatesComparisionDetails(){
	$('#allStatesComparisonDetails').html(spinner);
	var yearId = $("#finicalYearId").val();
    var json = {
		deptId : yearId,
		locationType :globalLocationType,
		locationId :globalLocationId
	}
  
  $.ajax({                
    type:'POST',    
    url: 'getAllStatesComparisionDetails',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
     if(result !=undefined  && result !=null && result.length>0){
      buildAllStatesComparisionDetails(result);
    }else{
		$("#allStatesComparisonDetails").html('No Data Available');
    }
  });
}
function buildAllStatesComparisionDetails(result){
	var table='';
	
	table+='<div class="table-responsive m_top10">';
		table+='<table class="table table-bordered table_custom_SC dataTableAllStates">';
			table+='<thead class="theadClr">';
				table+='<tr>';
					table+='<th class="text_middle" rowspan="2">'+globalLocationType+'&nbsp;Name</th>';
					for(var j in result[0].subList){
						if(result[0].subList[j].parameterType != undefined){
							table+='<th class="text_middle" colspan="2">'+result[0].subList[j].parameterName+'</th>';
						}
						
					}
				table+='</tr>';
				table+='<tr>';
					for(var j in result[0].subList){
						if(result[0].subList[j].parameterType != undefined){
						table+='<th class="text_middle">R</th>';
							if(result[0].subList[j].parameterType == 'Amount In Lakhs') {
								table+='<th class="text_middle">Cr</th>';
							}else if(result[0].subList[j].parameterType == 'Kilo Meters'){
								table+='<th class="text_middle">KM</th>';
							}else if(result[0].subList[j].parameterType == 'Units'){
								table+='<th class="text_middle">Un</th>';
							}else if(result[0].subList[j].parameterType == 'Percentage'){
								table+='<th class="text_middle">%</th>';
							}else{
								table+='<th class="text_middle">'+result[0].subList[j].parameterType+'</th>';
							}
						}
					}
				table+='</tr>';
			table+='</thead>';
			table+='<tbody>';
				for(var i in result){
					table+='<tr>';
						table+='<td class="" style="text-align:left !important;">'+result[i].name+'</td>';
						for(var j in result[i].subList){
							if(result[i].subList[j].rank >0){
								table+='<td><h6><span class="all_states_rounded" style="background-color:'+globalStatusBackGroundObj[result[i].subList[j].rank]+'">'+result[i].subList[j].rank+'</span></h6></td>';
							
							table+='<td><h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'</h6></td>';
							
							/* if(result[i].subList[j].amount1 && result[i].subList[j].amount1 != undefined ){
								table+='<td><span class="color_white" style="background-color:'+globalStatusBackGroundObj[result[i].subList[j].rank]+'; padding:3px 7px;">'+result[i].subList[j].rank+'</span><h5 class="m_top10">'+result[i].subList[j].amount1+'</h5></td>';
							}else{
								table+='<td><span class="color_white" style="background-color:'+globalStatusBackGroundObj[result[i].subList[j].rank]+'; padding:3px 7px;">'+result[i].subList[j].rank+'</span><h5 class="m_top10">-</h5></td>';
							} */
							}
						}
					table+='</tr>';
				}
			table+='</tbody>';
		table+='</table>';
	table+='</div>';
 $("#allStatesComparisonDetails").html(table);
 $(".dataTableAllStates").dataTable({
	"iDisplayLength": 15,
	"aaSorting": [],
	"aLengthMenu": [[15, 20,50,100, -1], [15, 20,50,100, "All"]],
});
}   

function getAPVsFinancialRankings(){
	$('#apVsFinancialYearRanking').html(spinner);
	var yearId = $("#finicalYearId").val();
    var json = {
		deptId : yearId,
		locationType :globalLocationType,
		locationId :globalLocationId
	}
  
  $.ajax({                
    type:'POST',    
    url: 'getAPVsFinancialRankings',
    dataType: 'json',
    data : JSON.stringify(json),
    beforeSend :   function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  if(result !=undefined  && result !=null && result.length>0){
		  buildAndhraPradeshvsFinancialYearRanking(result);
		}else{
			$("#apVsFinancialYearRanking").html('No Data Available');
		}
  });
}

function buildAndhraPradeshvsFinancialYearRanking(result){
var str='';   
if($(window).width() < 800){
	str+='<div class="table-responsive m_top10">';
}else{
	str+='<div class="m_top10">';
}

		str+='<table class="table table-bordered apFinancialYearRanking table_custom_SC">';
			str+='<thead class="">';
				str+='<tr>';
					str+='<th class="" rowspan="2" style="width:90px !important;">Component<br/>Name</th>';
					for(var j in result[0].subList){
						if(result[0].subList[j].yearDesc == "2018-2019"){
						str+='<th class="" colspan="2">'+result[0].subList[j].yearDesc+'<br/>(On Going)</th>';
						}else{
							str+='<th class="" colspan="2">'+result[0].subList[j].yearDesc+'</th>';
						}
					}
				str+='</tr>';
				str+='<tr>';
					for(var j in result[0].subList){
						str+='<th>Rank</th>';
						str+='<th>Value</th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td class="text_left">'+result[i].parameterName+'</td>';
				for(var j in result[i].subList){
					
					str+='<td class="">';
					/* if(result[i].subList[j].rank ==1){
						str+='<h4><span class="all_states_rounded" style="background-color:rgba(31, 124, 46,1.0)">'+parseInt(result[i].subList[j].rank)+'</span></h4>';
					}else if(result[i].subList[j].rank ==2){
						str+='<h4><span class="all_states_rounded" style="background-color:rgba(31, 124, 46,0.9)">'+parseInt(result[i].subList[j].rank)+'</span></h4>';
					}else if(result[i].subList[j].rank ==3){
						str+='<h4><span class="all_states_rounded" style="background-color:rgba(31, 124, 46,0.8)">'+parseInt(result[i].subList[j].rank)+'</span></h4>';
					}else{
						str+='<h4><span class="all_states_rounded" style="background-color:rgba(31, 124, 46,0.6)">'+parseInt(result[i].subList[j].rank)+'</span></h4>';
					} */
					str+='<h4><span class="all_states_rounded" style="background-color:'+globalStatusBackGroundObj[result[i].subList[j].rank]+'">'+parseInt(result[i].subList[j].rank)+'</span></h4>';
					str+='</td>';
					str+='<td>';
					 if(result[i].subList[j].parameterName == 'Amount In Lakhs') {
						str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(Cr)</h6>';
					}else if(result[i].subList[j].parameterName == 'Kilo Meters'){
						str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(KM)</h6>';
					}else if(result[i].subList[j].parameterName == 'Units'){
						str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(Un)</h6>';
					}else if(result[i].subList[j].parameterName == 'Percentage'){
						str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(%)</h6>';
					}else{
						str+='<h6 class="font_weight m_top5 text-center">'+result[i].subList[j].amount1+'&nbsp;(&nbsp;'+result[i].subList[j].parameterName+'&nbsp;)</h6>';
					} 
					
					str+='</td>';
				}
				str+='</tr>';
			}
			str+='</tbody>';
		str+='</table>';
	
	if($(window).width() < 800){
		str+='</div>';
	}else{
		str+='</div>';
	}
 $("#apVsFinancialYearRanking").html(str);
 $(".apFinancialYearRanking").dataTable({
	"iDisplayLength": 15,
	"aaSorting": [],
	"aLengthMenu": [[15, 20,50,100, -1], [15, 20,50,100, "All"]],
});
}