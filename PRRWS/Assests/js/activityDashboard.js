var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var currentFromDate=moment().subtract(20, 'years').startOf('year').format("DD-MM-YYYY");
var currentToDate=moment().endOf('year').add(10, 'years').format("DD-MM-YYYY");

$("#dateRangePicker").daterangepicker({
		opens: 'left',
		startDate: currentFromDate,
		endDate: currentToDate,
		locale: {
		  format: 'DD-MM-YYYY'
		},
		ranges: {
		   'All':[moment().subtract(20, 'years').startOf('year').format("DD-MM-YYYY"), moment().add(10, 'years').endOf('year').format("DD-MM-YYYY")],
		   'Today' : [moment(), moment()],
		   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		   'This Month': [moment().startOf('month'), moment()],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'Last 3 Months': [moment().subtract(3, 'month'), moment()],
		   'This Year': [moment().startOf('Year'), moment()],
		   'Last 1 Year': [moment().subtract(1, 'Year'), moment()]
		}
	});
	var dates= $("#dateRangePicker").val();
	var pickerDates = currentFromDate+' - '+currentToDate
	if(dates == pickerDates)
	{
		$("#dateRangePicker").val('All');
	}
	
	$('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
		currentFromDate = picker.startDate.format('DD-MM-YYYY');
		currentToDate = picker.endDate.format('DD-MM-YYYY');
		if(picker.chosenLabel == 'All')
		{
			$("#dateRangePicker").val('All');
		}
	
		onloadCalls();
	});
	
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});

onloadCalls();
function onloadCalls(){
	getChalivendramOverview();
	getLocationLevelRecentDocuments();
	getChalivendramsTimeLineViewDetails();
	getAllDistrictsChalivendram("districtId");
	getAllDistrictsChalivendram("districtMandalId");
	locationsData();
}

function getChalivendramOverview(){
	$("#chalivendramOverViewDivId").html(spinner);
	
	var json = {
		"fromDate":currentFromDate,
		"toDate":currentToDate
	};
	$.ajax({                
		type:'POST',
		url: 'getChalivendramOverview',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildChalivendramOverview(result);
		}else{
			$("#chalivendramOverViewDivId").html("No Data Available");
		}
	});
}
function buildChalivendramOverview(result){
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-6 m_top10">';
			str+='<div class="block_border_styles">';
					str+='<h5 class="f_16 text-center">Total Villages</h5>';
					str+='<h4 class="font_weight m_top5 text-center"> '+result.villagesCount+'</h4>';
					str+='<hr style="border-top:2px solid #ccc;margin-top:5px;margin-bottom:5px;"/>';
					str+='<div class="row">';
						str+='<div class="col-sm-6 border_right_yash m_top10">';
							str+='<h5 class="text-center f_16">No&nbsp;of&nbsp;villages&nbsp;not&nbsp;having&nbsp;Chalivendrams</h5>';
							str+='<h4 class="text-center font_weight  m_top5">'+result.noChalivendramVillagesCount+'</h4>';
						str+='</div>';
						str+='<div class="col-sm-6 m_top10">';
							str+='<h5 class="text-center f_16">No of villages Not Verified</h5>';
							str+='<h4 class="text-center font_weight m_top5">'+result.notVerifiedVillageCount+'</h4>';
						str+='</div>';
					str+='</div>';
			str+='</div>';
		str+='</div>';	
		str+='<div class="col-sm-6 m_top10">';
			str+='<div class="block_border_styles">';
						str+='<h5 class="f_16 text-center">Total Chalivendram</h5>';
						str+='<h4 class="font_weight m_top5 text-center"> '+result.totalChalivendrams+'</h4>';
					str+='<hr style="border-top:2px solid #ccc;margin-top:5px;margin-bottom:5px;"/>';
					str+='<div class="row">';
						str+='<div class="col-sm-6 border_right_yash m_top10">';
							str+='<h5 class="text-center f_16">No of Villages having Chalivendram</h5>';
							str+='<h4 class="text-center font_weight  m_top5">'+result.chalivendramVillagesCount+'<span class="f_15 text-success"> ('+result.villagesHavingChalivendramsPercentage+'%)</span></h4>';
						str+='</div>';
						str+='<div class="col-sm-6 m_top10">';
							str+='<h5 class="text-center f_16">Captured Images</h5>';
							str+='<h4 class="text-center font_weight m_top5">'+result.imagesCapturedCount+'</h4>';
						str+='</div>';
					str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';	
	
	/* 
	str+='<div class="block_border_styles m_top10">';
		str+='<div class="row">';
			str+='<div class="col-sm-2 border_right_yash">';
				str+='<h4 class="text-center">Total <br/>Villages</h4>';
				str+='<h3 class="text-center font_weight m_top10">'+result.villagesCount+'</h3>';
			str+='</div>';
			
			str+='<div class="col-sm-2 border_right_yash">';
				str+='<h4 class="text-center">No of villages not having <br/>Chalivendrams</h4>';
				str+='<h3 class="text-center font_weight  m_top10">'+result.noChalivendramVillagesCount+'</h3>';
			str+='</div>';
			
			str+='<div class="col-sm-2 border_right_yash">';
				str+='<h4 class="text-center">No of villages Not <br/>Verified</h4>';
				str+='<h3 class="text-center font_weight m_top10">'+result.notVerifiedVillageCount+'</h3>';
			str+='</div>';
			
			str+='<div class="col-sm-2 border_right_yash">';
				str+='<h4 class="text-center">No of Villages having <br/>Chalivendram</h4>';
				str+='<h3 class="text-center font_weight  m_top10">'+result.chalivendramVillagesCount+'<span class="f_15 color_black"> '+result.villagesHavingChalivendramsPercentage+'%</span></h3>';
			str+='</div>';
			
			str+='<div class="col-sm-2 border_right_yash">';
				str+='<h4 class="text-center">Total<br/>Chalivendram</h4>';
				str+='<h3 class="text-center font_weight m_top10">'+result.totalChalivendrams+'</h3>';
			str+='</div>';
			
			str+='<div class="col-sm-2 border_right_yash">';
				str+='<h4 class="text-center">Images<br/>Captured</h4>';
				str+='<h3 class="text-center font_weight m_top10">'+result.imagesCapturedCount+'</h3>';
			str+='</div>';
			
		str+='</div>';
	str+='</div>'; */
	
	$("#chalivendramOverViewDivId").html(str);
}

function getLocationLevelRecentDocuments(){
	$("#chalivendramOverImagesId").html(spinner);
	var json = {
		"locationScopeId":"1",
		"locationValue":"1",
		"fromDate":currentFromDate,
		"toDate":currentToDate
	};
	$.ajax({                
		type:'POST',
		url: 'getLocationLevelRecentDocuments',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildRecentImagesList(result)
		}else{
			$("#chalivendramOverImagesId").html('NO DATA AVAILABLE');
		}
	});
}
function buildRecentImagesList(result){
		var str='';
		
		str+='<ul class="list-inline imagesSliderCls">';
		for(var i in result)
		{
			//if(i<10){
				str+='<li style="background-color:rgba(0,0,0,0.1);color:#333 !important;margin:0px 8px;border:1px solid #ddd;">';
					str+='<img onerror="setDefaultImage(this);" src="http://www.mydepartments.in/PRRWS'+result[i].documentName+'" alt="" class="img-responsive" style="width: 100%; height: 185px;margin-bottom:5px;"/>';
					str+='<div style="margin-top:-10px;padding:4px 8px;">';
						str+='<h5 class="m_top5"> Panchayat : '+result[i].panchayatName+'</h5>';
						str+='<h5 class="m_top5"> Location : '+result[i].lattitude+'</h5>';
						str+='<h5 class="m_top5"> Date : '+result[i].insertedTime+'</h5>';
					str+='</div>';
				str+='</li>';
			//}
		}
		str+='</ul>';
		$("#chalivendramOverImagesId").html(str);
		$(".tooltipImgCls").tooltip();
		$('.imagesSliderCls').slick({
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
function locationsData()
{
	var locations = [{name:'district',id:'3'},{name:'constituency',id:'4'},{name:'mandal',id:'5'}]
	
	var str='';
	str+='<div class="panel-group" id="locationsCollapse" role="tablist" aria-multiselectable="true">';
		for(var i in locations)
		{
			str+='<div class="panel panel-default panel-black">';
				str+='<div class="panel-heading" role="tab" id="locationsCollapseHeading'+locations[i].name+'">';
					if(i == 0)
					{
						str+='<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#locationsCollapse" href="#locationsCollapse'+locations[i].name+'" aria-expanded="true" aria-controls="locationsCollapse'+locations[i].name+'">';
					}else{
						str+='<a role="button" class="collapsed panelCollapseIcon" data-toggle="collapse" data-parent="#locationsCollapse" href="#locationsCollapse'+locations[i].name+'" aria-expanded="true" aria-controls="locationsCollapse'+locations[i].name+'">';
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
					if(locations[i].id == 4){
						str+='<div class="row">';
							str+='<div class="col-sm-2">';
								str+='<label>District</label>';
								str+='<select class="form-control chosen-select" id="districtId">';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-2">';
								str+='<label>Constituency</label>';
								str+='<select class="form-control chosen-select" id="constituencyId">';
									str+='<option value="0">All</option>';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-2">';
								str+='<button type="button" class="btn btn-primary btn-sm m_top20 getDetailsCls" attr_type="constituency" attr_locationScopeId="4" attr_locationName="constituency">SUBMIT</button>';
							str+='</div>';
						str+='</div>';
					}else if(locations[i].id == 5){
						str+='<div class="row">';
							str+='<div class="col-sm-2">';
								str+='<label>District</label>';
								str+='<select class="form-control chosen-select" id="districtMandalId">';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-2">';
								str+='<label>Constituency</label>';
								str+='<select class="form-control chosen-select" id="constituencyMandalId">';
									str+='<option value="0">All</option>';
								str+='</select>';
							str+='</div>';
								str+='<div class="col-sm-2">';
								str+='<label>Mandal</label>';
								str+='<select class="form-control chosen-select" id="mandalId">';
									str+='<option value="0">All</option>';
								str+='</select>';
							str+='</div>';
							str+='<div class="col-sm-2">';
								str+='<button type="button" class="btn btn-primary btn-sm m_top20 getDetailsCls"  attr_type="mandal" attr_locationScopeId="5" attr_locationName="mandal">SUBMIT</button>';
							str+='</div>';
						str+='</div>';
					}
					str+='<div class="row">';
						str+='<div class="col-sm-12 m_top10">';
							str+='<div id="'+locations[i].name+'BlockData"></div>';
						str+='</div>';	
						str+='</div>';	
					str+='</div>';
				str+='</div>';
			str+='</div>';
		}
	str+='</div>';
	$("#locationsData").html(str);
	$(".chosen-select").chosen();
	for(var i in locations)
	{
		getLocationWiseChalivendramsOverviewCount(locations[i].id,locations[i].name,0,0,0)
	}
}

function getLocationWiseChalivendramsOverviewCount(locationScopeId,locationName,districtId,constituencyId,mandalId){
	$("#"+locationName+"BlockData").html(spinner);
	
	var json = {
		"locationScopeId":locationScopeId,
		"distictId":districtId,
		"mandalId":mandalId,
		"constituencyId":constituencyId,
		"fromDate":currentFromDate,
		"toDate":currentToDate
	};
	$.ajax({                
		type:'POST',
		url: 'getLocationWiseChalivendramsOverviewCount',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildLocationWiseChalivendramsOverviewCount(result,locationScopeId,locationName)
		}else{
			$("#"+locationName+"BlockData").html('NO DATA AVAILABLE');
		}
	});
}
function buildLocationWiseChalivendramsOverviewCount(result,locationScopeId,locationName){
	var str='';
	str+='<table class="table table-bordered dataTable'+locationName+' m_top10 table_custom_SC">';
			str+='<thead class="bg_ED">';
				str+='<th>District</th>';
				if(locationScopeId == 4){
					str+='<th>Constituency</th>';
					str+='<th>Total Mandals</th>';
				}
				if(locationScopeId == 5){
					str+='<th>Constituency</th>';
					str+='<th>Mandal</th>';
				}
				if(locationScopeId == 3){
					str+='<th>Total Constituencies</th>';
				}
				str+='<th>Total No of Villages</th>';
				str+='<th>No of Villages having Chalivendrams</th>';
				str+='<th>No of Villages not having Chalivendrams</th>';
				str+='<th>No of Villages not Verified</th>';
				str+='<th>No of Chalivendrams</th>';
				str+='<th>Chalivendram Images</th>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result)
				{
					str+='<tr>';
						str+='<td style="text-align:left !important;">'+result[i].districtName+'</td>';	
						
						if(locationScopeId == 4){
							str+='<td style="text-align:left !important;">'+result[i].constituencyName+'</td>';
							str+='<th style="text-align:left !important;">'+result[i].mandalCount+'</th>';
						}else if(locationScopeId == 5){
							str+='<td style="text-align:left !important;">'+result[i].constituencyName+'</td>';
							str+='<td style="text-align:left !important;">'+result[i].mandalName+'</td>';
						}else if(locationScopeId == 3){
							str+='<td style="text-align:left !important;">'+result[i].constituencyCount+'</td>';
						}
						str+='<td>'+result[i].villagesCount+'</td>';
						str+='<td>'+result[i].chalivendramVillagesCount+' <small class="good_color">'+result[i].chalivendramVillagesPerc+'%</small></td>';
						
						str+='<td>'+result[i].noChalivendramVillagesCount+'</td>';
						str+='<td>'+result[i].notVerifiedVillageCount+'</td>';
						
						if(locationScopeId == 4){
							str+='<td><a data-toggle="tooltip" data-placement="top" title="Click Here Chalivendram Info" class="chalivendramClickCls tooltipCls" attr_locationScopeId="'+locationScopeId+'" attr_locationValue="'+result[i].constituencyId+'">'+result[i].chalivendramCount+'</a></td>';
						}else if(locationScopeId == 5){
							str+='<td><a data-toggle="tooltip" data-placement="top" title="Click Here Chalivendram Info" class="chalivendramClickCls tooltipCls" attr_locationScopeId="'+locationScopeId+'" attr_locationValue="'+result[i].mandalId+'">'+result[i].chalivendramCount+'</a></td>';
						}else if(locationScopeId == 3){
							str+='<td><a data-toggle="tooltip" data-placement="top" title="Click Here Chalivendram Info" class="chalivendramClickCls tooltipCls" attr_locationScopeId="'+locationScopeId+'" attr_locationValue="'+result[i].districtid+'">'+result[i].chalivendramCount+'</a></td>';
						}
						
						str+='<td>'+result[i].imageCount+'</td>';
					str+='</tr>	';
				}
			str+='</tbody>';
		str+='</table>';
		$("#"+locationName+"BlockData").html(str);
		$(".tooltipCls").tooltip();
		$(".dataTable"+locationName).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15, 20, 30, -1], [15, 20, 30, "All"]],
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "CHV_"+locationName,
					filename:  "CHV_"+locationName+""+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
			
		});
}
$(document).on("change","#districtId",function(){
	var districtId=$(this).val();
	getConstituencyNamesByDistrictIdChalivendram(districtId,'constituencyId');
});	
$(document).on("change","#districtMandalId",function(){
	$("#mandalId").html('<option value="0">All</option>').chosen().trigger("chosen:updated");
	getConstituencyNamesByDistrictIdChalivendram($(this).val(),'constituencyMandalId');
});	
$(document).on("change","#constituencyMandalId",function(){
	getChalivendramMandalNamesByConstituencyId($(this).val(),'mandalId');
});	
function getChalivendramMandalNamesByConstituencyId(constituencyId,divId){
	$("#"+divId).html('');
	var json = {
		constituencyId:constituencyId
	};
	$.ajax({                
		type:'POST',
		url: 'getChalivendramMandalNamesByConstituencyId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId);
		}
	});
}
function getConstituencyNamesByDistrictIdChalivendram(districtId,divId){
	$("#"+divId).html('');
	var json = {
		distictId:districtId
	};
	$.ajax({                
		type:'POST',
		url: 'getConstituencyNamesByDistrictIdChalivendram',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId);
		}
	});
}
function getAllDistrictsChalivendram(divId){
	$("#"+divId).html('');
	var json = {
		
	};
	$.ajax({                
		type:'POST',
		url: 'getAllDistrictsChalivendram',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSelectBox(result,divId);
		}
	});
}
function buildSelectBox(result,divId){
	var str='';
	str+='<option value="0">All</option>';
	for(var i in result){
		str+='<option value="'+result[i].key+'">'+result[i].value+'</option>';
	}
	$("#"+divId).html(str).chosen().trigger("chosen:updated");
}
$(document).on("click",".getDetailsCls",function(){
	var type=$(this).attr("attr_type");
	var locationScopeId=$(this).attr("attr_locationScopeId");
	var locationName=$(this).attr("attr_locationName");
	
	if(type == "constituency"){
		var districtId = $("#districtId").val();
		var constituencyId = $("#constituencyId").val();
		getLocationWiseChalivendramsOverviewCount(locationScopeId,locationName,districtId,constituencyId,0);
	}else{
		var districtMandalId = $("#districtMandalId").val();
		var constituencyMandalId = $("#constituencyMandalId").val();
		var mandalId = $("#mandalId").val();
		getLocationWiseChalivendramsOverviewCount(locationScopeId,locationName,districtMandalId,constituencyMandalId,mandalId);
	} 
});	

function getChalivendramsTimeLineViewDetails(){
	$("#chalivendramTimeLineSeriesDivId").html(spinner);
	
	var json = {
		"fromDate":currentFromDate,
		"toDate":currentToDate
	};
	$.ajax({                
		type:'POST',
		url: 'getChalivendramsTimeLineViewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length > 0){
			buildChalivendramsTimeLineViewDetails(result);
		}else{
			$("#chalivendramTimeLineSeriesDivId").html("No Data Available");
		}
	});
}

function buildChalivendramsTimeLineViewDetails(result){
	var mainDataArr=[];
	var categoriesArr=[];
	
	var wpPosArr=[];
	for(var i in result){
		categoriesArr.push(result[i].value);
		wpPosArr.push(result[i].key)
	}
	var obj={
		name:"Chalivendrams",
		data: wpPosArr,
		color:"#00CA85"
	};
	mainDataArr.push(obj)
	
	$('#chalivendramTimeLineSeriesDivId').highcharts({
		chart: {
			type: 'spline'
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
			categories:categoriesArr
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
				text: ''
			},
			labels: {
				formatter: function () {
					return this.value;
				}
			}
		},
		tooltip: {
			formatter: function () {
			var s = '<b>' + this.x + '</b>';

				$.each(this.points, function () {
					if(this.series.name != "Series 1")  
					s += '<br/><b style="color:'+this.series.color+'">' + this.series.name + '</b> : ' +
					this.y+"";
				});

				return s;
			},
			shared: true
		},
		plotOptions: {
			
		},
		series: mainDataArr
	});
}

$(document).on("click",".chalivendramClickCls",function(){
	$("#chalivendramsModalId").modal("show");
	getPanchayatWiseChalivendrams($(this).attr("attr_locationScopeId"),$(this).attr("attr_locationValue"));
	//getLocationChalivendramInfo($(this).attr("attr_locationScopeId"),$(this).attr("attr_locationValue"));
});

function getPanchayatWiseChalivendrams(locationScopeId,locationValue){
	$("#chalivendramsModalBodyDivId").html(spinner);
	var json = {
		"locationScopeId":locationScopeId,
		"locationValue":locationValue,
		"fromDate":currentFromDate,
		"toDate":currentToDate
	};
	$.ajax({                
		type:'POST',
		url: 'getPanchayatWiseChalivendrams',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0){
			var str='';
			str+='<table class="table table-bordered table_custom_SC" id="dataTablePanWiseChalivendram">';
				str+='<thead>';
					str+='<tr>';
						str+='<th >Mandal</th>';
						str+='<th >Panchayat</th>';
						str+='<th >Chalivendram Count</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td style="text-align:left !important;"><a style="cursor:pointer;" class="openModalPanchayatChalivendram" attr_locationScopeId="6" attr_locationLevelId="'+result[i].districtid+'" attr_mandal_name="'+result[i].mandalName+'" attr_panchayat_name="'+result[i].districtName+'">'+result[i].mandalName+'</a></td>';
							
							str+='<td style="text-align:left !important;">'+result[i].districtName+'</td>';
							str+='<td>'+result[i].villagesCount+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
			$("#chalivendramsModalBodyDivId").html(str);
			$("#dataTablePanWiseChalivendram").dataTable({
				"iDisplayLength": 15,
				"aaSorting": [],
				"aLengthMenu": [[15, 20, 30, -1], [15, 20, 30, "All"]],
			});
		} 
	});
}
$(document).on("click",".openModalPanchayatChalivendram",function(){
	var locationScopeId = $(this).attr("attr_locationScopeId");
	var locationLevelId = $(this).attr("attr_locationLevelId");
	
	var mandalName = $(this).attr("attr_mandal_name");
	var panchayatName = $(this).attr("attr_panchayat_name");
	$("#chalivendramsLowLevelModalId").modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	$("#headindChalivendramId").html(mandalName+" (M)"+" "+panchayatName+" (P)"+" Chalivendrams Details")
	
	getLocationChalivendramInfo(locationScopeId,locationLevelId)
});

function getLocationChalivendramInfo(locationScopeId,locationValue,tr_id){
	$("#chalivendramsModalLowLevelBodyDivId").html(spinner);
	var json = {
		"locationScopeId":locationScopeId,
		"locationValue":locationValue,
		"fromDate":currentFromDate,
		"toDate":currentToDate
	};
	$.ajax({                
		type:'POST',
		url: 'getLocationChalivendramInfo',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0){
			var str='';
		
			for(var i in result){
				str+='<div class="pad_border m_top10" style="background: #DEDEDE;">';
					str+='<div class="row">';	
						str+='<div class="col-sm-4">';
							str+='<div class="bg_border_yash_color">';
								str+='<h5 class="text-center">Chalivendram Location</h5>';
								str+='<h5 class="text-center font_weight m_top10">'+result[i].locationName+'</h5>';
							str+='</div>';
						str+='</div>';
						
						str+='<div class="col-sm-4">';
							str+='<div class="bg_border_yash_color">';
								str+='<h5 class="text-center">Organised By - <b>'+result[i].districtName+'<b></h5>';
								str+='<h5 class="text-center font_weight m_top10">'+result[i].constituencyName+'</h5>';
							str+='</div>';
						str+='</div>';
						
						str+='<div class="col-sm-4">';
							str+='<div class="bg_border_yash_color">';
								str+='<h5 class="text-center">Created At</h5>';
								str+='<h5 class="text-center font_weight m_top10">'+result[i].mandalName+'</h5>';
							str+='</div>';
						str+='</div>';
				
					str+='</div>';
				
					str+='<div class="row">';
						str+='<div class="col-sm-12 m_top10">';
							str+='<ul class="list-inline ChalivendramsSliderCls'+i+'">';
							if(result[i].locationList !=null && result[i].locationList.length>0){
								for(var j in result[i].locationList){
									str+='<li>';
										str+='<img class="thumbnail" onerror="setDefaultImage(this);" src="http://www.mydepartments.in/PRRWS'+result[i].locationList[j].locationScope+'" alt="" class="img-responsive" style="width: 100%; height: 150px;"/>';
									str+='</li>';
								}
							}
						str+='</ul>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		}	
		
			$("#chalivendramsModalLowLevelBodyDivId").html(str);
			
			for(var i in result){
				$('.ChalivendramsSliderCls'+i).slick({
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
			//if(result.length>5){
			//	$(".scrollerbar").mCustomScrollbar({setHeight:'180px'});
			//}
		}
	});
}
$(document).on("click",".closeModalSecond",function(){
    setTimeout(function(){
      $('body').addClass("modal-open");
    }, 500);                     
  });