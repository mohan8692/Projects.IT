var spinner = '<div class="row"><div class="col-sm-12"><div class="spinner_logo"></div></div></div>';
var currentfromdate=moment().subtract(80, 'years').startOf('year').format("DD-MM-YYYY");
var currentToDate=moment().add(10, 'years').endOf('year').format("DD-MM-YYYY");
var globalLocationScopeId =2;
var	globalLocationValueId = 1;
var globalPreviouslocdistrictid = "";
var globalPreviouslocdivisionid = "";
var globalPreviouslocsubdivisionid = "";
var globalResultsComponentAssestByDetails;
	$("#dateRangePicker").daterangepicker({
		opens: 'left',
		startDate: currentfromdate,
		endDate: currentToDate,
		locale: {
		  format: 'DD-MM-YYYY'
		},
		ranges: {
		   'OverAll':[moment().subtract(80, 'years').startOf('year').format("DD-MM-YYYY"), moment().add(10, 'years').endOf('year').format("DD-MM-YYYY")],
		   'Today' : [moment(), moment()],
		   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		   'This Month': [moment().startOf('month'), moment()],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'Last 3 Months': [moment().subtract(3, 'month'), moment()],
		   'This Year': [moment().startOf('Year'), moment()],
		   'Last 1 Year': [moment().subtract(1, 'Year'), moment()]
		}
	});
	$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
	var dates= $("#dateRangePicker").val();
	var pickerDates = currentfromdate+' - '+currentToDate
	if(dates == pickerDates)
	{
		$("#dateRangePicker").val('OverAll');
	}
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
function onloadCalls(){
	completeOverViewVerifiedCount();
	assetsImageDetailsInfo(globalLocationScopeId,globalLocationValueId,"onload");
	detailedAssestTypesVerifiedCount();
	locationsData();
}

function completeOverViewVerifiedCount(){
	$("#completeOverViewDivId").html(spinner);
	var json={
		  "fromDate":currentfromdate,
		  "toDate":currentToDate,
		  "locationId":globalLocationScopeId,
		  "locationValue":globalLocationValueId
	  }
  $.ajax({
    type:'POST',
    url:'verifiedCount',
    datatType:'json',
    data: JSON.stringify(json),
    beforeSend : function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  if(result !=null){
		  buildcompleteOverViewVerifiedCount(result);
	  }else{
		  $("#completeOverViewDivId").html("No Data");
	  }
  });
}

function buildcompleteOverViewVerifiedCount(result){
	var str='';
	str+='<div class="bg_padding_yash m_top10">';
		str+='<h4 class="panel-title">Complete OverView</h4>';
		str+='<div class="block_border_styles m_top10">';
			str+='<div class="row">';
				str+='<div class="col-sm-2 m_top5">';
					str+='<div class="border_pad" style="border:1px solid #ACACAC;">';
						str+='<h4 class="text-center m_top50 ">Total Assets</h4>';
						if(typeof result.count == null || typeof result.count == "undefined" || typeof result.count === undefined || typeof result.count == "" || typeof result.count == 0){
							str+='<h4 class="text-center m_bottom_50 m_top30 font_weight f_24"> - </h4>';
						}else{
							str+='<h4 class="text-center m_bottom_50 m_top30 font_weight f_24">'+result.count+'</h4>';
						}
						
					str+='</div>';
				str+='</div>';
				str+='<div class="col-sm-7 m_top5">';
					str+='<div class="border_pad" style="border:1px solid #79EEDE;">';
						str+='<div class="row">';
							str+='<div class="col-sm-6">';
								str+='<h4 class="text-right m_top10  text_align_center"><i class="fa fa-check-circle green_color f_20" aria-hidden="true"></i> Verified Assets</h4>';
							str+='</div>';
							str+='<div class="col-sm-6">';
								if(typeof result.verifiedCount == null || typeof result.verifiedCount == "undefined" || typeof result.verifiedCount === undefined || typeof result.verifiedCount == "" || typeof result.verifiedCount == 0 ){
									str+='<h4 class="m_top10 font_weight text_align_center f_24"> - </h4>';
								}else{
									str+='<h4 class="m_top10 font_weight text_align_center f_24">'+result.verifiedCount+'</h4>';
								}
								
							str+='</div>';
						str+='</div>';
						str+='<hr style="border:1px solid #ddd;margin-top: 15px;margin-bottom: 15px;"/>';
						str+='<div class="row">';
							str+='<div class="col-sm-3">';
								str+='<h4 class="text-center  m_top10 ">Working Assets</h4>';
								if(typeof result.workingAsset == null || typeof result.workingAsset	 == "undefined" || typeof result.workingAsset	 === undefined || typeof result.workingAsset == "" || typeof result.workingAsset == 0){
									str+='<h4 class="text-center m_top30 font_weight green_color m_top_res f_24"> - </h4>';
								}else{
									str+='<h4 class="text-center m_top30 font_weight green_color m_top_res f_24">'+result.workingAsset+' <small class="green_color">'+result.workingPerc+'%</small></h4>';
								}
								
							str+='</div>';
							str+='<div class="col-sm-9 border_left">';
								str+='<div class="row">';
									str+='<div class="col-sm-6">';
										str+='<h4 class="text-right  text_align_center">Not Working Assets</h4>';
									str+='</div>';
									str+='<div class="col-sm-6">';
										if(typeof result.notWorkingAsset == null || typeof result.notWorkingAsset	 == "undefined" || typeof result.notWorkingAsset	 === undefined || typeof result.notWorkingAsset	 == "" || typeof result.notWorkingAsset == 0){
											
											str+='<h4 class="font_weight text_align_center f_24"> - </h4>';
											
										}else{
											str+='<h4 class="font_weight text_align_center f_24">'+result.notWorkingAsset+' <small class="red_color_code">'+result.notWorkingPerc+'%</small></h4>';
										}	
										
									str+='</div>';
								str+='</div>';
								str+='<hr style="border:1px solid #ddd;margin-top:10px;margin-bottom:10px;"/>';
								str+='<div class="row">';
									str+='<div class="col-sm-3 border_right">';
										str+='<h5 class="text-center "> Repaired</h5>';
										if(result.repairCount !=null && result.repairCount>0){
											str+='<h4 class="text-center m_top5 font_weight">'+result.repairCount+'</h4>';
										}else{
											str+='<h4 class="text-center m_top5 font_weight"> - </h4>';
										}
										if(result.repairCost !=null && result.repairCost>0 && result.repairCost !='undefined' && typeof result.repairCost !== undefined){
											str+='<h5 class="text-center m_top5 green_color" style="font-size: 10px;">Est Cost: '+result.repairCost+' Lakhs</h5>';
										}else{
											str+='<h4 class="text-center m_top5 font_weight"> - </h4>';
										}
									str+='</div>';
									str+='<div class="col-sm-3 border_right">';
										str+='<h5 class="text-center "> Dried</h5>';
										if(result.driedCount !=null && result.driedCount>0){
											str+='<h4 class="text-center m_top5 font_weight">'+result.driedCount+'</h4>';
										}else{
											str+='<h4 class="text-center m_top5 font_weight"> - </h4>';
										}
										if(result.driedAmount !=null && result.driedAmount>0 && result.driedAmount !='undefined' && typeof result.driedAmount !== undefined){
											str+='<h5 class="text-center m_top5 green_color" style="font-size: 10px;">Est Cost: '+result.driedAmount+' Lakhs</h5>';
										}else{
											str+='<h4 class="text-center m_top5 font_weight"> - </h4>';
										}
									str+='</div>';
									str+='<div class="col-sm-3 border_right">';
										str+='<h5 class="text-center "> Seasonal</h5>';
										if(result.seasonalCount !=null && result.seasonalCount>0){
											str+='<h4 class="text-center m_top5 font_weight">'+result.seasonalCount+'</h4>';
										}else{
											str+='<h4 class="text-center m_top5 font_weight"> - </h4>';
										}
										if(result.seasonalAmount !=null && result.seasonalAmount>0 && result.seasonalAmount !='undefined' && typeof result.seasonalAmount !== undefined){
											str+='<h5 class="text-center m_top5 green_color" style="font-size: 10px;">Est Cost: '+result.seasonalAmount+' Lakhs</h5>';
										}else{
											str+='<h4 class="text-center m_top5 font_weight"> - </h4>';
										}
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<h5 class="text-center ">Condemned</h5>';
										if(result.condemnedCount !=null && result.condemnedCount>0){
											str+='<h4 class="text-center m_top5 font_weight">'+result.condemnedCount+'</h4>';
										}else{
											str+='<h4 class="text-center m_top5 font_weight"> - </h4>';
										}
										
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="col-sm-3 m_top5">';
					str+='<div class="border_pad" style="border:1px solid #FFBA00;">';
						str+='<h4 class="text-center m_top50 "><i class="fa fa-times-circle orange_color_code f_20" aria-hidden="true"></i> Pending Assets</h4>';
						if(result.notVerifiedCount	!=null && result.notVerifiedCount>0){
							str+='<h4 class="text-center m_top30 m_bottom_50 font_weight f_24">'+result.notVerifiedCount+' <small class="red_color_code">'+result.unVerifiedAssetPerc+'%</small></h4>';
						}else{
							str+='<h4 class="text-center m_top30 m_bottom_50 font_weight f_24"> - </h4>';
						}
						
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#completeOverViewDivId").html(str);
	$(".tooltipCls").tooltip();
}

function assetsImageDetailsInfo(locationScopeId,locationValue,type){
	if(type == "click"){
		$("#onclickimagesSliderDivId").html(spinner);
	}else{
		$("#imagesSliderDivId").html(spinner);
	}
	
  var json={
		  "fromDate":currentfromdate,
		  "toDate":currentToDate,
		  "locationId":locationScopeId,
		  "locationValue":locationValue
	  }
  $.ajax({
    type:'POST',
    url:'assetsImageDetailsInfo',
    datatType:'json',
    data: JSON.stringify(json),
    beforeSend : function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  if(result !=null && result.length>0){
			buildRecentImagesList(result,type)
		}else{
			if(type == "click"){
				$("#onclickimagesSliderDivId").html("NO DATA AVAILABLE");
			}else{
				$("#imagesSliderDivId").html("NO DATA AVAILABLE");
			}
		}
  });
}

function buildRecentImagesList(result,type){
	var str='';
	str+='<div class="bg_padding_yash m_top10">';
		str+='<h4 class="panel-title">Assets Images</h4>';
		str+='<div class="block_border_styles m_top10">';
			str+='<ul class="list-inline '+type+'ImagesSliderCls">';
				for(var i in result)
				{
					str+='<li style="background-color:rgba(0,0,0,0.1);color:#333 !important;margin:0px 8px;border:1px solid #ddd;">';
						str+='<img onerror="setDefaultImage(this);" src="http://mytdp.com/PRRWS/'+result[i].imagePath+'" alt="" class="img-responsive" style="width: 100%; height: 185px;margin-bottom:5px;"/>';
						str+='<div style="margin-top:-10px;padding:4px 8px;">';
							str+='<h5 class="m_top5"> <span class="f_12">Asset Name</span> : <b>'+result[i].schemename+'<b></h5>';
							str+='<h5 class="m_top5"> <span class="f_12">Status</span> : <b>'+result[i].statusName+'<b></h5>';
							//str+='<h5 class="m_top5"> Verified By  : '+result[i].startDate+'</h5>';
							str+='<h5 class="m_top5"> <span class="f_12">Habitation Name</span>  : <b>'+result[i].habitatioName+'<b></h5>';
							str+='<h5 class="m_top5"> <span class="f_12">Mandal Name</span>  : <b>'+result[i].mandalName+'<b></h5>';
							str+='<h5 class="m_top5"> <span class="f_12">Panchayat Name</span>  : <b>'+result[i].panchayatName+'<b></h5>';
							str+='<h5 class="m_top5"> <span class="f_12">District Name</span>  : <b>'+result[i].locationName	+'<b></h5>';
							str+='<h5 class="m_top5"> <span class="f_12">Latitude</span>  : <b>'+result[i].latitude	+'<b></h5>';
							str+='<h5 class="m_top5"> <span class="f_12">Longitude</span>  : <b>'+result[i].longitude+'<b></h5>';
						str+='</div>';
					str+='</li>';
				}
				str+='</ul>';
			str+='</div>';
	str+='</div>';
	
	if(type == "click"){
		$("#onclickimagesSliderDivId").html(str);
	}else{
		$("#imagesSliderDivId").html(str);
	}
	$(".tooltipImgCls").tooltip();
	$('.'+type+'ImagesSliderCls').slick({
		slide: 'li',
		slidesToShow: 4,
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
function setDefaultImage(img){
	img.src = "Assests/images/NoImage.png";
}

function detailedAssestTypesVerifiedCount(){
	$("#assestsTypeComponentsDivId").html(spinner);
	var json={
		  "fromdate":currentfromdate,
		  "toDate":currentToDate,
		  "locationScopeId":globalLocationScopeId,
		  "locationScopeValue":globalLocationValueId
  }
  $.ajax({
    type:'POST',
    url:'detailVerifiedCount',
    datatType:'json',
    data: JSON.stringify(json),
    beforeSend : function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  if(result !=null && result.length>0){
		  buildDetailedAssestTypesVerifiedCount(result);
	  }else{
		  $("#assestsTypeComponentsDivId").html("No Data Available...");
	  }
  });
}
function buildDetailedAssestTypesVerifiedCount(result){
	var str='';
	
	str+='<div class="panel panel-default panel-grey">';
	 str+=' <div class="panel-heading">';
		str+='<h4 class="panel-title">Asset Types</h4>';
	 str+=' </div>';
	  str+='<div class="panel-body">';
		str+='<div class="table-responsive block_border_styles" style="box-shadow:1px 1px 1px 1px rgba(0, 0, 0, 0.2);">';
			str+='<table class="table table_custom_css" id="dataTableAssestsId">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan=2>Scheme Name</th>';
						str+='<th rowspan=2>Total Assets</th>';
						str+='<th rowspan=2>Pending</th>';
						str+='<th rowspan=2>%</th>';
						str+='<th rowspan=2>Verfied</th>';
						str+='<th rowspan=2>%</th>';
						str+='<th rowspan=2>Working</th>';
						str+='<th rowspan=2>%</th>';
						str+='<th colspan=3>Not Working</th>';
						//str+='<th rowspan=2>%</th>';
						//str+='<th colspan=2>RepairCost</th>';
						str+='<th colspan=3>CONDEMNED</th>';
						str+='<th colspan=3>SEASONAL</th>';
						str+='<th colspan=3>DRIED</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>count</th>';
						str+='<th>%</th>';
						str+='<th>cost</th>';
						
						str+='<th>count</th>';
						str+='<th>%</th>';
						str+='<th>cost</th>';
						
						str+='<th>count</th>';
						str+='<th>%</th>';
						str+='<th>cost</th>';
						
						str+='<th>count</th>';
						str+='<th>%</th>';
						str+='<th>cost</th>';
						//str+='<th><span calss="tooltipCls" data-toggle="tooltip" data-placement="top" title="CONDEMNED,SEASONAL,DRIED">Others </span></th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in  result){
						str+='<tr>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="componentColorCls">';
											str+='<h4 style="text-align:left !important;" class="getComponentCls" attr_source_id="'+result[i].id+'" attr_source_name="'+result[i].name+'">'+result[i].name+'</h4>';
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].count !=null && result[i].count>0){
												str+='<h4>'+result[i].count+'</h4>';
											}else{
												str+='<h4>-</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].notVerifiedCount !=null && result[i].notVerifiedCount>0){
												str+='<h4>'+result[i].notVerifiedCount+'</h4>';
											}else{
												str+='<h4>-</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].unVerifiedAssetPerc !=null && result[i].unVerifiedAssetPerc>0){
												str+='<h4>'+result[i].unVerifiedAssetPerc+'</h4>';
											}else{
												str+='<h4>-</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].verifiedCount !=null && result[i].verifiedCount>0){
												str+='<h4>'+result[i].verifiedCount+'</h4>';
											}else{
												str+='<h4>-</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].perc !=null && result[i].perc>0){
												str+='<h4>'+result[i].perc+'</h4>';
											}else{
												str+='<h4> - </h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].workingcount !=null && result[i].workingcount>0){
												str+='<h4>'+result[i].workingcount+'</h4>';
											}else{
												str+='<h4> - </h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].workingPerc !=null && result[i].workingPerc>0){
												str+='<h4>'+result[i].workingPerc+'</h4>';
											}else{
												str+='<h4> - </h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].notWorkingCount !=null && result[i].notWorkingCount>0){
												str+='<h4 class="schemeWiseDetailsCls" attr_scheme_id="'+result[i].id+'" attr_scheme_name="'+result[i].name+'" attr_locationScopeId="'+globalLocationScopeId+'" attr_locationScopeValue="'+globalLocationValueId+'">'+result[i].notWorkingCount+'</h4>';
											}else{
												str+='<h4> - </h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].notWorkingPerc !=null && result[i].notWorkingPerc>0){
												str+='<h4>'+result[i].notWorkingPerc+'</h4>';
											}else{
												str+='<h4> - </h4>';
											}
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							/* str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
										if(result[i].esitmatedCost ==null  || result[i].esitmatedCost =="undefined"){
											str+='<h4>-</h4>';
										}else{
											str+='<h4>'+result[i].esitmatedCost+'</h4>';
										}
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>'; */
							
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].repairCostlng == null || result[i].repairCostlng == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].repairCostlng+'Rs.</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].condemnedCount == null || result[i].condemnedCount == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].condemnedCount+'</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							/* str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].condemnedAssetPerc == null || result[i].condemnedAssetPerc == 0 || result[i].condemnedAssetPerc =="undefined"){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].condemnedAssetPerc+'</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>'; */
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].condemnedAssetPerc !=null && result[i].condemnedAssetPerc>0){
												str+='<h4>'+result[i].condemnedAssetPerc+'</h4>';
											}else{
												str+='<h4> - </h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].condemnedAmount == null || result[i].condemnedAmount == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].condemnedAmount+'Rs.</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].seasonalCount == null || result[i].seasonalCount == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].seasonalCount+'</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							/* str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].seasonalAssetPerc == null || result[i].seasonalAssetPerc == 0 || 
											 result[i].seasonalAssetPerc == "undefined"){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].seasonalAssetPerc+'</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>'; */
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].seasonalAssetPerc !=null && result[i].seasonalAssetPerc>0){
												str+='<h4>'+result[i].seasonalAssetPerc+'</h4>';
											}else{
												str+='<h4> - </h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].seasonalAmount == null || result[i].seasonalAmount == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].seasonalAmount+'Rs.</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].driedCount == null || result[i].driedCount == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].driedCount+'</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							/* str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].driedAssetPerc == null || result[i].driedAssetPerc == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].driedAssetPerc+'</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>'; */
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(result[i].driedAssetPerc !=null && result[i].driedAssetPerc>0){
												str+='<h4>'+result[i].driedAssetPerc+'</h4>';
											}else{
												str+='<h4> - </h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].driedAmount == null || result[i].driedAmount == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].driedAmount+'Rs.</h4>';
											}
											
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>';
							/* str+='<td>';
								str+='<div class="row">';
									str+='<div class="col-sm-12">';
										str+='<div class="yashColorCls">';
											if(typeof result[i].replaceCostlng == "null" || result[i].replaceCostlng == 0){
												str+='<h4> - </h4>';
											}else{
												str+='<h4>'+result[i].replaceCostlng+'Rs.</h4>';
											}
										str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</td>'; */
							
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	  str+='</div>';
	str+='</div>';
	
	$("#assestsTypeComponentsDivId").html(str);
	 $("#dataTableAssestsId").dataTable({
		"paging":   false,
		"info":     false,
		"searching": true,
		"autoWidth": false,
	});
	$(".tooltipCls").tooltip();
}
function locationsData()
{
	if(globalLocationScopeId == 2){
		var locations = [{name:'district',id:'3'},{name:'division',id:'15'},{name:'subDivision',id:'16'},{name:'mandal',id:'5'}]
	}else if(globalLocationScopeId == 3){
		var locations = [{name:'district',id:'3'}]
	}else if(globalLocationScopeId == 15){
		var locations = [{name:'district',id:'3'},{name:'division',id:'15'}]
	}else if(globalLocationScopeId == 16){
		var locations = [{name:'district',id:'3'},{name:'division',id:'15'},{name:'subDivision',id:'16'}]
	}else if(globalLocationScopeId == 5){
		var locations = [{name:'district',id:'3'},{name:'division',id:'15'},{name:'subDivision',id:'16'},{name:'mandal',id:'5'}]
	}
	
	
	var str='';
	str+='<div class="panel-group" id="locationsCollapse">';
		for(var i in locations)
		{
			str+='<div class="panel panel-default panel-black">';
				str+='<div class="panel-heading" role="tab" id="locationsCollapseHeading'+locations[i].name+'">';
					if(i == 0)
					{
						str+='<a role="button" class="panelCollapseIcon_AMS" data-toggle="collapse" data-parent="#locationsCollapse" href="#locationsCollapse'+locations[i].name+'" aria-expanded="true" aria-controls="locationsCollapse'+locations[i].name+'">';
					}else{
						str+='<a role="button" class="collapsed panelCollapseIcon_AMS" data-toggle="collapse" data-parent="#locationsCollapse" href="#locationsCollapse'+locations[i].name+'" aria-expanded="true" aria-controls="locationsCollapse'+locations[i].name+'">';
					}
						str+='<h4 class="panel-title text-capital" style="color:#fff">'+locations[i].name+' Wise Overview</h4>';
					str+='</a>';
				str+='</div>';
				if(i == 0)
				{
					str+='<div id="locationsCollapse'+locations[i].name+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="locationsCollapseHeading'+locations[i].name+'">';
				}else{
					str+='<div id="locationsCollapse'+locations[i].name+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="locationsCollapseHeading'+locations[i].name+'">';
				}
					str+='<div class="panel-body">';
						str+='<div id="'+locations[i].name+'BlockData"></div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		}
	str+='</div>';
	$("#locationWiseAssestTypeDivId").html(str);
	for(var i in locations)
	{
		if(globalLocationScopeId == 2){
			getLocationLevelWiseDetailsInfo(locations[i].id,0,locations[i].name);
		}else if(globalLocationScopeId == 3){
			getLocationLevelWiseDetailsInfo(locations[i].id,globalLocationValueId,locations[i].name);
		}else if(globalLocationScopeId == 15){
			if(locations[i].id == 3){
				getLocationLevelWiseDetailsInfo(locations[i].id,globalPreviouslocdistrictid,locations[i].name);
			}else{
				getLocationLevelWiseDetailsInfo(locations[i].id,globalLocationValueId,locations[i].name);
			}
			
		}else if(globalLocationScopeId == 16){
			if(locations[i].id == 3){
				getLocationLevelWiseDetailsInfo(locations[i].id,globalPreviouslocdistrictid,locations[i].name);
			}else if(locations[i].id == 15){
				getLocationLevelWiseDetailsInfo(locations[i].id,globalPreviouslocdivisionid,locations[i].name);
			}else{
				getLocationLevelWiseDetailsInfo(locations[i].id,globalLocationValueId,locations[i].name);
			}
			
		}else if(globalLocationScopeId == 5){
			if(locations[i].id == 3){
				getLocationLevelWiseDetailsInfo(locations[i].id,globalPreviouslocdistrictid,locations[i].name);
			}else if(locations[i].id == 15){
				getLocationLevelWiseDetailsInfo(locations[i].id,globalPreviouslocdivisionid,locations[i].name);
			}else if(locations[i].id == 16){
				getLocationLevelWiseDetailsInfo(locations[i].id,globalPreviouslocsubdivisionid,locations[i].name);
			}else{
				getLocationLevelWiseDetailsInfo(locations[i].id,globalLocationValueId,locations[i].name);
			}
			
		}   
		
	}
}
function getLocationLevelWiseDetailsInfo(locationScopeId,locationScopeValue,loationName){
		$("#"+loationName+"BlockData").html(spinner);
		
		var json={
			  "fromDate":currentfromdate,
			  "toDate":currentToDate,
			  "locationId":locationScopeId,
			  "locationValue":locationScopeValue
		  }
	  $.ajax({
		type:'POST',
		url:'getLocationLevelWiseDetailsInfo',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		}
	  }).done(function(result){
		  if(result !=null && result.length>0){
			  buildLocationLevelWiseDetailsInfo(result,locationScopeId,loationName,locationScopeValue);
		  }else{
			  $("#"+loationName+"BlockData").html("No Data Available...");
		  }
	  });
}

function buildLocationLevelWiseDetailsInfo(result,locationScopeId,loationName,locationScopeValue){
	var verifiedPerc=0.0,notVerifiedPerc=0.0,workingperc=0.0,notWorkingPerc=0.0,repairPerc=0.0;replacePerc=0.0;
	var condemnedPerc=0.0;seasonalPerc=0.0,driedPerc=0.0;
	var str='',
		windowWidth = $(window).width();
	if(windowWidth > 767){
		str+='<div class="table-responsive">';
	}
	
	str+='<table class="table table-bordered table_custom dataTable'+loationName+'" style="width:100%">';
			str+='<thead class="">';
				str+='<tr>';
					if(loationName == "locationWiseComponent"){
						str+='<th rowspan="2">Component Name</th>';
					}else{
						if(locationScopeId == 3){
							str+='<th rowspan="2">District</th>';
						}else if(locationScopeId == 15){
							str+='<th rowspan="2">Division</th>';
						}else if(locationScopeId == 16){
							str+='<th rowspan="2">Sub Division</th>';
						}else if(locationScopeId == 5){
							str+='<th rowspan="2">District</th>';
						}
					}
					str+='<th colspan="5" style="background-color:#f3e5eb !important;">Total Assets</th>';
					str+='<th colspan="10">Verified</th>';
					str+='<th colspan="3">Repaired Assets (<small>Amount in RS.</small>)</th>';
					if(loationName != "locationWiseComponent"){
						str+='<th rowspan="2">Images Count</th>';
					}
				str+='</tr>';
				str+='<tr>';
					str+='<th style="background-color:#f3e5eb !important;">Total</th>';
					str+='<th style="background-color:#f3e5eb !important;">Verified</th>';
					str+='<th style="background-color:#f3e5eb !important;">%</th>';
					str+='<th style="background-color:#f3e5eb !important;">Not Verified</th>';
					str+='<th style="background-color:#f3e5eb !important;">%</th>';
					
					str+='<th>Working</th>';
					str+='<th>%</th>';
					str+='<th>Not Working</th>';
					str+='<th>%</th>';
					str+='<th>Condemned</th>';
					str+='<th>%</th>';
					str+='<th>Seasonal</th>';
					str+='<th>%</th>';
					str+='<th>Dried</th>';
					str+='<th>%</th>';
					
					str+='<th>Not Working </th>';
					//str+='<th>Condemned </th>';
					str+='<th>Seasonal </th>';
					str+='<th>Dried </th>';
					/* str+='<th colspan="1"><span calss="tooltipCls" data-toggle="tooltip" data-placement="top" title="CONDEMNED,SEASONAL,DRIED">Others </span></th>'; */
					
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result)
				{
					str+='<tr>';
						if(loationName == "locationWiseComponent"){
							str+='<td text-align:left !important;">'+result[i].name+'</td>';
						}else{
							str+='<td text-align:left !important;"><a class="levelWiseComponentCls" attr_name="'+result[i].name+'" attr_locationScopeValue="'+result[i].id+'" attr_locationScopeId="'+locationScopeId+'" attr_level_name="'+loationName+'">'+result[i].name+'</a></td>';
						}
						
						if(result[i].count !=null && result[i].count>0){
							str+='<td style="background-color:#f3e5eb; text-align:left !important;">'+result[i].count+'</td>';
						}else{
							str+='<td style="background-color:#f3e5eb;"> - </td>';
						}
						if(result[i].verifiedCount !=null && result[i].verifiedCount>0){
							str+='<td style="background-color:#f3e5eb; text-align:left !important;">'+result[i].verifiedCount+'</td>';
						}else{
							str+='<td style="background-color:#f3e5eb;"> - </td>';
						}
						verifiedPerc = ((result[i].verifiedCount* 100)/result[i].count).toFixed(2);
						if(verifiedPerc !=null && verifiedPerc>0){
							str+='<td style="background-color:#f3e5eb;">'+verifiedPerc+'</td>';//Verified%
						}else{
							str+='<td style="background-color:#f3e5eb;"> - </td>';
						}
						
						
						if(result[i].notVerifiedCount !=null && result[i].notVerifiedCount>0){
							str+='<td style="background-color:#f3e5eb;">'+result[i].notVerifiedCount+'</td>';
						}else{
							str+='<td style="background-color:#f3e5eb;"> - </td>';
						}
						notVerifiedPerc = ((result[i].notVerifiedCount* 100)/result[i].count).toFixed(2);
						if(notVerifiedPerc !=null && notVerifiedPerc>0){
							str+='<td style="background-color:#f3e5eb;">'+notVerifiedPerc+'</td>';//Not Verified %
						}else{
							str+='<td style="background-color:#f3e5eb;"> - </td>';
						}
						
						
						if(result[i].workingcount !=null && result[i].workingcount>0){
							str+='<td>'+result[i].workingcount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						workingperc = ((result[i].workingcount* 100)/result[i].verifiedCount).toFixed(2);
						if(workingperc !=null && workingperc>0){
							str+='<td>'+workingperc+'</td>';//Working%
						}else{
							str+='<td> - </td>';
						}
						if(result[i].notWorkingCount !=null && result[i].notWorkingCount>0){
							if(loationName == "locationWiseComponent"){
								str+='<td class="schemeWiseDetailsCls" attr_scheme_id="'+result[i].id+'" attr_scheme_name="'+result[i].name+'" attr_locationScopeId="'+locationScopeId+'" attr_locationScopeValue="'+locationScopeValue+'">'+result[i].notWorkingCount+'</td>';
							}else{
								str+='<td>'+result[i].notWorkingCount+'</td>';
							}
							
						}else{
							str+='<td> - </td>';
						}
						notWorkingPerc = ((result[i].notWorkingCount* 100)/result[i].verifiedCount).toFixed(2);
						if(notWorkingPerc !=null && notWorkingPerc>0){
							str+='<td>'+notWorkingPerc+'</td>';//Not Working%
						}else{
							str+='<td> - </td>';
						}
						if(result[i].condemnedCount !=null && result[i].condemnedCount>0){
							str+='<td>'+result[i].condemnedCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						condemnedPerc = ((result[i].condemnedCount* 100)/result[i].verifiedCount).toFixed(2);
						if(condemnedPerc !=null && condemnedPerc>0){
							str+='<td>'+condemnedPerc+'</td>';//condemned%
						}else{
							str+='<td> - </td>';
						}
						if(result[i].seasonalCount !=null && result[i].seasonalCount>0){
							str+='<td>'+result[i].seasonalCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						seasonalPerc = ((result[i].seasonalCount* 100)/result[i].verifiedCount).toFixed(2);
						if(seasonalPerc !=null && seasonalPerc>0){
							str+='<td>'+seasonalPerc+'</td>';//seasonal%
						}else{
							str+='<td> - </td>';
						}
						if(result[i].driedCount !=null && result[i].driedCount>0){
							str+='<td>'+result[i].driedCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						driedPerc = ((result[i].driedCount* 100)/result[i].verifiedCount).toFixed(2);
						if(driedPerc !=null && driedPerc>0){
							str+='<td>'+driedPerc+'</td>';//dried%
						}else{
							str+='<td> - </td>';
						}
						
						 if(result[i].repairCostlng !=null && result[i].repairCostlng>0){
							str+='<td>'+result[i].repairCostlng+'</td>';
						}else{
							str+='<td> - </td>';
						}
						if(result[i].seasonalAmount !=null && result[i].seasonalAmount>0){
							str+='<td>'+result[i].seasonalAmount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						if(result[i].driedAmount !=null && result[i].driedAmount>0){
							str+='<td>'+result[i].driedAmount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						/* if(result[i].replaceCount && result[i].replaceCount>0){
							str+='<td>'+result[i].replaceCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						if(result[i].replaceCount !=null && result[i].replaceCount>0){
							replacePerc = ((result[i].replaceCount* 100)/result[i].notWorkingCount).toFixed(2);
						}
						if(replacePerc !=null && replacePerc>0){
							str+='<td>'+replacePerc+'</td>';//reparirCount %
						}else{
							str+='<td> - </td>';
						} */
						/* if(result[i].replaceCostlng !=null && result[i].replaceCostlng>0){
							str+='<td>'+result[i].replaceCostlng+'</td>';
						}else{
							str+='<td> - </td>';
						} */
						if(loationName != "locationWiseComponent"){
							if(result[i].imageCount !=null && result[i].imageCount >0){
								str+='<td style=" cursor:pointer;"><a class="levelWiseImageCls" " attr_locationScopeValue="'+result[i].id+'" attr_locationScopeId="'+locationScopeId+'" attr_level_name="'+loationName+'" attr_name="'+result[i].name+'">'+result[i].imageCount+'</td>';
							}else{
								str+='<td>-</td>';
							}
							
						}
					str+='</tr>	';
				}
			str+='</tbody>';
		str+='</table>';	
		str+='<table class="table table-bordered table_custom"  id="dataTable22'+loationName+'"  style="width:100%;display:none;">';
			str+='<thead class="">';
				str+='<tr>';
					if(loationName == "locationWiseComponent"){
						str+='<th rowspan="3">Component Name</th>';
					}else{
						if(locationScopeId == 3){
							str+='<th rowspan="3">District</th>';
						}else if(locationScopeId == 15){
							str+='<th rowspan="3">Division</th>';
						}else if(locationScopeId == 16){
							str+='<th rowspan="3">Sub Division</th>';
						}else if(locationScopeId == 5){
							str+='<th rowspan="3">Mandal</th>';
						}
						
					}
					
					str+='<th colspan="5">Total Assets</th>';
					str+='<th colspan="4">Verified</th>';
					str+='<th colspan="2">Not Working Assets</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th rowspan="2">Total</th>';
					str+='<th rowspan="2">Verified</th>';
					str+='<th rowspan="2">%</th>';
					str+='<th rowspan="2">Not Verified</th>';
					str+='<th rowspan="2">%</th>';
					
					str+='<th rowspan="2">Working</th>';
					str+='<th rowspan="2">%</th>';
					str+='<th rowspan="2">Not Working</th>';
					str+='<th rowspan="2">%</th>';
					
					str+='<th colspan="1">Not Working</th>';
					str+='<th colspan="1">Others</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result)
				{
					str+='<tr>';
						if(loationName == "locationWiseComponent"){
							str+='<td style="text-align:left !important;">'+result[i].name+'</td>';
						}else{
							str+='<td style="text-align:left !important;"><a class="levelWiseComponentCls" attr_name="'+result[i].name+'" attr_locationScopeValue="'+result[i].id+'" attr_locationScopeId="'+locationScopeId+'" attr_level_name="'+loationName+'">'+result[i].name+'</a></td>';
						}
						
						if(result[i].totalAssetsCount !=null && result[i].totalAssetsCount>0){
							str+='<td>'+result[i].totalAssetsCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						if(result[i].verifiedCount !=null && result[i].verifiedCount>0){
							str+='<td>'+result[i].verifiedCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						verifiedPerc = ((result[i].verifiedCount* 100)/result[i].totalAssetsCount).toFixed(2);
						if(verifiedPerc !=null && verifiedPerc>0){
							str+='<td>'+verifiedPerc+'</td>';//Verified%
						}else{
							str+='<td> - </td>';
						}
						
						
						if(result[i].notVerifiedCount !=null && result[i].notVerifiedCount>0){
							str+='<td>'+result[i].notVerifiedCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						notVerifiedPerc = ((result[i].notVerifiedCount* 100)/result[i].totalAssetsCount).toFixed(2);
						if(notVerifiedPerc !=null && notVerifiedPerc>0){
							str+='<td>'+notVerifiedPerc+'</td>';//Not Verified %
						}else{
							str+='<td> - </td>';
						}
						
						
						if(result[i].workingcount !=null && result[i].workingcount>0){
							str+='<td>'+result[i].workingcount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						if(result[i].workingcount !=null && result[i].workingcount >0){
							workingperc = ((result[i].workingcount* 100)/result[i].verifiedCount).toFixed(2);
						}
						
						if(workingperc !=null && workingperc>0){
							str+='<td>'+workingperc+'</td>';//Working%
						}else{
							str+='<td> - </td>';
						}
						
						
						if(result[i].notWorkingCount !=null && result[i].notWorkingCount>0){
							str+='<td>'+result[i].notWorkingCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						if(result[i].notWorkingCount !=null && result[i].notWorkingCount>0){
							notWorkingPerc = ((result[i].notWorkingCount* 100)/result[i].verifiedCount).toFixed(2);
						}
						if(notWorkingPerc !=null && notWorkingPerc>0){
							str+='<td>'+notWorkingPerc+'</td>';//Not Working %
						}else{
							str+='<td> - </td>';
						}
						
						
						/* if(result[i].repairCount !=null && result[i].repairCount>0){
							str+='<td>'+result[i].repairCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						if(result[i].repairCount !=null && result[i].repairCount>0){
							repairPerc = ((result[i].repairCount* 100)/result[i].notWorkingCount).toFixed(2);
						}
						if(repairPerc !=null && repairPerc>0){
							str+='<td>'+repairPerc+'</td>';//repairCount %
						}else{
							str+='<td> - </td>';
						} */
						
						
						if(result[i].repairCostlng !=null && result[i].repairCostlng>0){
							str+='<td>'+result[i].repairCostlng+'</td>';
						}else{
							str+='<td> - </td>';
						}
						/* if(result[i].replaceCount && result[i].replaceCount>0){
							str+='<td>'+result[i].replaceCount+'</td>';
						}else{
							str+='<td> - </td>';
						}
						if(result[i].replaceCount !=null && result[i].replaceCount>0){
							replacePerc = ((result[i].replaceCount* 100)/result[i].notWorkingCount).toFixed(2);
						}
						if(replacePerc !=null && replacePerc>0){
							str+='<td>'+replacePerc+'</td>';//reparirCount %
						}else{
							str+='<td> - </td>';
						} */
						
						
						if(result[i].replaceCostlng !=null && result[i].replaceCostlng>0){
							str+='<td>'+result[i].replaceCostlng+'</td>';
						}else{
							str+='<td> - </td>';
						}
						
					str+='</tr>	';
				}
			str+='</tbody>';
		str+='</table>';
	if(windowWidth > 767){
		str+='</div>';
	}
		
	$("#"+loationName+"BlockData").html(str);
	if(loationName == "district"){
		$(".dataTable"+loationName).dataTable({
			"paging":   false,
			"info":     false,
			"searching": true,
			"autoWidth": true,
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					//extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o generateExcelcdfdf" attr_id="dataTable22'+loationName+'" title="Excel"></i>',
					//titleAttr: 'CSV',
				}
			]
		});
	}else{
		$(".dataTable"+loationName).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15, 20, 50, -1], [15, 20, 50, "All"]],
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					//extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o generateExcelcdfdf" attr_id="dataTable22'+loationName+'" title="Excel"></i>',
					//titleAttr: 'CSV',
				}
			]
		});
	}
	$(".tooltipCls").tooltip();
}
$(document).on("click",".generateExcelcdfdf",function(){
	var id = $(this).attr("attr_id");
	tableToExcel(id, 'ASSESTS DASHBOARD');
});
$(document).on("click",".levelWiseComponentCls",function(){
	var locationScopeValue=$(this).attr("attr_locationScopeValue");
	var locationScopeId=$(this).attr("attr_locationScopeId");
	var name=$(this).attr("attr_name");
	var levelName=$(this).attr("attr_level_name");
	$("#locationWiseComponentModalId").modal('show');
	$("#onclickimagesSliderDivId").html("");
	$("#locationWiseComponentBlockData").html("");
	$("#headingId").html(name+" "+levelName+" Wise Details");	
	
	getSchemeWiseAssetDetailsInfo(locationScopeId,locationScopeValue);
});
$(document).on("click",".levelWiseImageCls",function(){
	var locationValue =$(this).attr("attr_locationScopeValue");
	var locationScopeId=$(this).attr("attr_locationScopeId");
	var name=$(this).attr("attr_name");
	var levelName=$(this).attr("attr_level_name");
	$("#locationWiseComponentModalId").modal('show');
	$("#locationWiseComponentBlockData").html("");
	$("#onclickimagesSliderDivId").html("");
	$("#headingId").html(name+" "+levelName+" Wise Image Details");	
	
	assetsImageDetailsInfo(locationScopeId,locationValue,"click");
});

function getSchemeWiseAssetDetailsInfo(locationScopeId,locationScopeValue){
	$("#locationWiseComponentBlockData").html(spinner);
	var json={
		"fromdate":currentfromdate,
		"toDate":currentToDate,
		"locationScopeId":locationScopeId,
		"locationScopeValue":locationScopeValue
			 
	  }
  $.ajax({
    type:'POST',
    url:'detailVerifiedCount',
    datatType:'json',
    data: JSON.stringify(json),
    beforeSend : function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	   if(result !=null && result.length>0){
		  buildLocationLevelWiseDetailsInfo(result,locationScopeId,"locationWiseComponent",locationScopeValue);
	  }else{
		  $("#locationWiseComponentBlockData").html("No Data");
	  }
  });
}
$(document).on("click",".getComponentCls",function(){
	var sourceId=$(this).attr("attr_source_id");
	var sourceName=$(this).attr("attr_source_name");
	
	$("#componentModalId").modal('show');
	$("#headingComponentId").html(sourceName+" &nbsp;&nbsp;Scheme Wise Asset Verification Details");
	
	getSchemeWiseUserDetailsANDVerifiedAsstesDetailsInfo(sourceId);
});

function getSchemeWiseUserDetailsANDVerifiedAsstesDetailsInfo(sourceId){
	$("#componentBlockData").html(spinner);
	var json={
			  "fromdate":currentfromdate,
			  "toDate":currentToDate,
			  "locationScopeId":globalLocationScopeId,
			  "locationScopeValue":globalLocationValueId,
			  "sourceId":sourceId
	  }
  $.ajax({
    type:'POST',
    url:'getSchemeWiseUserDetailsANDVerifiedAsstesDetailsInfo',
    datatType:'json',
    data: JSON.stringify(json),
    beforeSend : function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  if(result !=null){
		  buildSchemeWiseUserDetailsANDVerifiedAsstesDetailsInfo(result);
	  }else{
		  $("#componentBlockData").html("No Data");
	  }
  });
}

function buildSchemeWiseUserDetailsANDVerifiedAsstesDetailsInfo(result){
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			//str+='<div class="row">';
				str+='<div class="panel panel-default panel-grey">';
				 str+=' <div class="panel-heading">';
					str+='<h4 class="panel-title">Assets Verification</h4>';
				 str+=' </div>';
				str+='<div class="panel-body">';
					str+='<div class="col-sm-2">';
						str+='<div class="panel panel-default">';
						  str+='<div class="panel-heading">';
							str+='<h4 class="panel-title text-center" style="font-size:13px;">Total visited Assets</h4>';
						  str+='</div>';
						  str+='<div class="panel-body">';
								str+='<h4 class="text-center m_top15 font_weight">'+result.totalCount+'</h4>';
						  str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-10">';
						str+='<div class="bg_padding_yash">';
							str+='<div class="row">';
								str+='<div class="col-sm-3">';
									str+='<div class="panel panel-default m_bottom_10">';
									  str+='<div class="panel-heading" style="background-color: #96b9f2;color: #fff;">';
										str+='<h4 class="panel-title text-center">Visited Times : 1</h4>';
									  str+='</div>';
									  str+='<div class="panel-body pad_5">';
											str+='<h4 class="text-center m_top10 font_weight">'+result.firstVisit+'&nbsp;&nbsp;- <small style="color:#285F90">'+result.percentage+'%</small></h4>';
									  str+='</div>';
									str+='</div>';
								str+='</div>';
								
								str+='<div class="col-sm-3">';
									str+='<div class="panel panel-default m_bottom_10">';
									  str+='<div class="panel-heading" style="background-color: #449D44;color: #fff;">';
										str+='<h4 class="panel-title text-center">Visited Times : 2</h4>';
									  str+='</div>';
									  str+='<div class="panel-body pad_5">';
											str+='<h4 class="text-center m_top10 font_weight">'+result.secondVisit+'&nbsp;&nbsp;- <small style="color:#449D44">'+result.secondPerc+'%</small></h4>';
									  str+='</div>';
									str+='</div>';
								str+='</div>';
								
								str+='<div class="col-sm-3">';
									str+='<div class="panel panel-default m_bottom_10">';
									  str+='<div class="panel-heading" style="background-color: #30AFD4;color: #fff;">';
										str+='<h4 class="panel-title text-center">Visited Times : 3</h4>';
									  str+='</div>';
									  str+='<div class="panel-body pad_5">';
											str+='<h4 class="text-center m_top10 font_weight">'+result.thirdVisit+'&nbsp;&nbsp;- <small style="color:#30AFD4">'+result.thirdPerc+'%</small></h4>';
									  str+='</div>';
									str+='</div>';
								str+='</div>';
								
								str+='<div class="col-sm-3">';
									str+='<div class="panel panel-default m_bottom_10">';
									  str+='<div class="panel-heading" style="background-color: #EB961F;color: #fff;">';
										str+='<h4 class="panel-title text-center" style="font-size:13px;">More Than 3 Times Visted</h4>';
									  str+='</div>';
									  str+='<div class="panel-body pad_5">';
											str+='<h4 class="text-center m_top10 font_weight">'+result.morethanFourthVisit+'&nbsp;&nbsp;- <small style="color:#EB961F">'+result.moreThanPerc+'%</small></h4>';
									  str+='</div>';
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			//str+='</div>';
		str+='</div>';		
		str+='<div class="col-sm-12 m_top20">';
			str+='<div class="row">';
				str+='<div class="panel panel-default panel-grey">';
					str+=' <div class="panel-heading">';
						str+='<h4 class="panel-title">Designation Wise Visited Assets</h4>';
					str+=' </div>';
					str+='<div class="panel-body">';
						for(var i in result.subList){
							str+='<div class="col-sm-4 m_top10">';
								str+='<div class="panel-body" style="border: 1px solid #ddd; background-color:#fff ">';
									str+='<div class="media">';
										str+='<div class="media-body">';
											str+='<h3 class="text-center">'+result.subList[i].name+'</h3>';
										str+='</div>';
										str+='<div class="media-right">';
											str+='<img src="Assests/images/engineer.PNG">';
										str+='</div>';
									str+='</div>';
									str+='<h4 class="text-center m_top15 font_weight" style="margin-right: 40px;" >'+result.subList[i].count+'</h4>';
									str+='<h4 class="text-center m_top15 font_weight text-success" style="margin-right: 40px;">'+result.subList[i].userPerc+'%</h4>';
								str+='</div>';
							str+='</div>';
							
						}
					str+=' </div>';
				str+=' </div>';
			str+='</div>';	
		str+='</div>';	
	str+='</div>';	
	$("#componentBlockData").html(str);
}
$(document).on("click",".menuDataCollapse",function(){
	
	globalLocationScopeId = $(this).attr("attr_levelidvalue");
	globalLocationValueId = $(this).attr("attr_id");
	globalLocationPreViousValueId = $(this).attr("attr_previousLocId");
	
	globalPreviouslocdistrictid = $(this).attr("attr_previouslocdistrictid");
	globalPreviouslocdivisionid = $(this).attr("attr_previouslocdivisionid");
	globalPreviouslocsubdivisionid = $(this).attr("attr_previouslocsubdivisionid");
	
	$("#selectedName").html($(this).html());
	if(globalLocationScopeId == 3){
		$("#levelWiseOverViewId").html($(this).html()+" District Level OverView")
	}else if(globalLocationScopeId == 15){
		$("#levelWiseOverViewId").html($(this).html()+" Division Level OverView")
	}else if(globalLocationScopeId == 16){
		$("#levelWiseOverViewId").html($(this).html()+" Sub Division Level OverView")
	}else if(globalLocationScopeId == 5){
		$("#levelWiseOverViewId").html($(this).html()+" Mandal Level OverView")
	}else if(globalLocationScopeId == 2){
		$("#levelWiseOverViewId").html("State Level OverView")
	}
	onloadCalls();
});
$(document).on("click",".schemeWiseDetailsCls",function(){
	var schemeId = $(this).attr("attr_scheme_id")
	var schemeName = $(this).attr("attr_scheme_name")
	var locationScopeId = $(this).attr("attr_locationScopeId")
	var locationScopeValue = $(this).attr("attr_locationScopeValue")
	$("#schemeWiseModalId").modal();
	$("#schemeHeadingId").html("("+schemeName+") Scheme Wise Not Working Assest Details")
	getComponentsByAssetId(schemeId,locationScopeId,locationScopeValue);
});

function getComponentsByAssetId(schemeId,locationScopeId,locationScopeValue){
	$("#schemeWiseModalBodyDivId").html(spinner);

	var json={
		"fromdate":currentfromdate,
		"toDate":currentToDate,
		"assetSchemeId":schemeId,
		"locationScopeId":locationScopeId,
		"locationIdStr":locationScopeValue,
		"assetStatusId":2
	  }
  $.ajax({
    type:'POST',
    url:'getComponentsByAssetId',
    datatType:'json',
    data: JSON.stringify(json),
    beforeSend : function(xhr){
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  }).done(function(result){
	  if(result !=null){
		  buildComponentsByAssetId(result);
		  globalResultsComponentAssestByDetails = result;
	  }else{
		  $("#schemeWiseModalBodyDivId").html("No Data");
	  }
  });
}

function buildComponentsByAssetId(result){
	var str='';
	str+='<div class="table-responsive">';
		str+='<table class="table table-bordered table_custom_SC" id="dataTableComponentsByAsset">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Assest Code</th>';
					str+='<th>Assest Name</th>';
					str+='<th>District</th>';
					str+='<th>Mandal</th>';
					str+='<th>Panchayat</th>';
					str+='<th>Habitation</th>';
					str+='<th>Verification Time</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td style="text-align:left !important;"><a style="cursor:pointer;" class="assestWiseDetailsCls" attr_assest_code="'+result[i].assetCode+'" attr_assest_name="'+result[i].name+'">'+result[i].assetCode+'</a></td>';
						str+='<td>'+result[i].name+'</td>';
						str+='<td>'+result[i].locationName+'</td>';
						str+='<td>'+result[i].mandalName+'</td>';
						str+='<td>'+result[i].panchayatName+'</td>';
						str+='<td>'+result[i].habitatioName+'</td>';
						str+='<td>'+result[i].verifcationTime.replace('.0','')+'</td>';
					str+='</tr>';
				}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#schemeWiseModalBodyDivId").html(str);
	$("#dataTableComponentsByAsset").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15, 20, 30, -1], [15, 20, 30, "All"]],
	});
}

$(document).on("click",".assestWiseDetailsCls",function(){
	var assestCode = $(this).attr("attr_assest_code")
	var assestName = $(this).attr("attr_assest_name")
	$("#assestLowLevelModalId").modal({
		show: true,
		keyboard: false,
		backdrop: 'static'
	});
	$("#headindassestId").html(assestName+" Wise Component Details");
	buildAssestNameWiseDetails(assestCode);
});
function buildAssestNameWiseDetails(assestCode){
	var str='';
	str+='<div class="scrollerDivCls">';
	for(var i in globalResultsComponentAssestByDetails){
		if(globalResultsComponentAssestByDetails[i].assetCode == assestCode){
			if(globalResultsComponentAssestByDetails[i].subList !=null && globalResultsComponentAssestByDetails[i].subList.length>0){
				for(var j in globalResultsComponentAssestByDetails[i].subList){
						str+='<div class="pad_border m_top10" style="background: #DEDEDE;">';
							str+='<div class="row">';
								str+='<div class="col-sm-3">';
									str+='<div class="bg_border_yash_color">';
										str+='<h5 class="text-center">Component Name</h5>';
										str+='<h5 class="text-center font_weight m_top10">'+globalResultsComponentAssestByDetails[i].subList[j].componentName+'</h5>';
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<div class="bg_border_yash_color">';
										str+='<h5 class="text-center">Sub Component Name</h5>';
										str+='<h5 class="text-center font_weight m_top10">'+globalResultsComponentAssestByDetails[i].subList[j].subComponentName+'</h5>';
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<div class="bg_border_yash_color">';
										str+='<h5 class="text-center">Replace Cost</h5>';
										if(globalResultsComponentAssestByDetails[i].subList[j].replaceCost !=null && globalResultsComponentAssestByDetails[i].subList[j].replaceCost>0){
											str+='<h5 class="text-center font_weight m_top10">'+globalResultsComponentAssestByDetails[i].subList[j].replaceCost+'</h5>';
										}else{
											str+='<h5 class="text-center font_weight m_top10"> - </h5>';
										}
										
									str+='</div>';
								str+='</div>';
								str+='<div class="col-sm-3">';
									str+='<div class="bg_border_yash_color">';
										str+='<h5 class="text-center">Repair Cost</h5>';
										if(globalResultsComponentAssestByDetails[i].subList[j].repairCost !=null && globalResultsComponentAssestByDetails[i].subList[j].repairCost>0){
											str+='<h5 class="text-center font_weight m_top10">'+globalResultsComponentAssestByDetails[i].subList[j].repairCost+'</h5>';
										}else{
											str+='<h5 class="text-center font_weight m_top10"> - </h5>';
										}
										
									str+='</div>';
								str+='</div>';
							str+='</div>';
							
							str+='<div class="row">';
								str+='<div class="col-sm-12 m_top10">';
									str+='<ul class="list-inline">';
									if(globalResultsComponentAssestByDetails[i].subList[j].subList !=null && globalResultsComponentAssestByDetails[i].subList[j].subList.length>0){
											for(var k in globalResultsComponentAssestByDetails[i].subList[j].subList){
												str+='<li>';
													str+='<a href="http://www.mydepartments.in/PRRWS/'+globalResultsComponentAssestByDetails[i].subList[j].subList[k].imagePath+'" class="fancybox" data-fancybox="gallery" data-width="640" data-height="360" >';
														str+='<img class="thumbnail img-responsive" onerror="setDefaultImage(this);" src="http://www.mydepartments.in/PRRWS/'+globalResultsComponentAssestByDetails[i].subList[j].subList[k].imagePath+'" alt="" style="width: 100%; height: 80px;"/>';
													str+='</a>';
												str+='</li>';
												
											}
										}
									str+='</ul>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
				}
			}		
		}
	}	
	str+='</div>';
	$("#assestModalLowLevelBodyDivId").html(str);
	$(".scrollerDivCls").mCustomScrollbar();
	$('.fancybox').fancybox();
}

$(document).on("click",".closeModalSecond",function(){
    setTimeout(function(){
      $('body').addClass("modal-open");
    }, 500);                     
  });