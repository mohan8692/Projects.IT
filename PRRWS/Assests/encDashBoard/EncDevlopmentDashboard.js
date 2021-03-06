var levelWiseSBArr = ['state','district','constituency','mandal'];
var globalCasteColorObj = {"BTCC":"#0ad82f","WBM":"#4abef8","GRAVEL":"#161817","EARTHEN":"#f5af2c"};
var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
levelWiseSBData("levelWiseEnc");
getKeyPerformanceIndicatorsInfo('state','graph');
function levelWiseSBData(divId)
{
	var collapse='';
		collapse+='<section>';
			collapse+='<div class="row">';
			collapse+='<div class="col-sm-12">';
				for(var i in levelWiseSBArr)
				{
					collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'" role="tablist" aria-multiselectable="true">';
						collapse+='<div class="panel panel-default panel-black">';
							collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+levelWiseSBArr[i]+'">';
								if(i == 0)
								{
									collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'">';
								}else{
									collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'">';
								}
								if(levelWiseSBArr[i] == "state" || levelWiseSBArr[i] == "district" || levelWiseSBArr[i] == "constituency")
									collapse+='<h4 class="panel-title text-capital">'+levelWiseSBArr[i]+' level overview</h4>';
								else
									collapse+='<h4 class="panel-title text-capital">'+levelWiseSBArr[i]+' level overview</h4>';
									
								collapse+='</a>';
							collapse+='</div>';
							if(i == 0)
							{
								collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'">';
							}else{
								collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'">';
							}
							
								collapse+='<div class="panel-body">';
									collapse+='<div id="'+divId.replace(/\s+/g, '')+''+levelWiseSBArr[i]+'"></div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				}
			collapse+='</div>';
			collapse+='</div>';
			collapse+='</section>';
	
	$("#levelWiseEncId").html(collapse);
	setTimeout(function(){ 
		for(var i in levelWiseSBArr){
			getKeyPerformanceIndicatorsInfo(levelWiseSBArr[i],null);
		}	
	
	}, 1500);
	
}
function getKeyPerformanceIndicatorsInfo(locationType,type){//ara1
	if(type=='graph'){
		$("#roadsChartinfo").html(spinner);
		$("#btccBlockId").html(spinner);
		$("#wbmBlockId").html(spinner);
		$("#grveBlockId").html(spinner);
		$("#earthenblockId").html(spinner);
		$("#roadsBlockId").html(spinner);
	}else{
		$("#levelWiseEnc"+locationType).html(spinner);
	}
	
	var locationType1='';
	var url='';
	if(locationType=='state'){
		url='getStateWiseRoadsInformation';
		locationType1='s';
	}else{
		url='getLocationWiseRoadsInformation';
		if(locationType=='district'){
			locationType1 ='d'
		}else if(locationType=='constituency'){
			locationType1='a'
		}else if(locationType=='mandal'){
			locationType1='M'
		}
	}

	var json={
				
			locationType:locationType1,	
			}
	$.ajax({
		url: url,
		data: JSON.stringify(json),
		type:'POST',    
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp){
			if(ajaxresp !=null){
				build(ajaxresp,locationType);
				if(type=="graph"){
					buildKeyPerformanceIndicatorsInfo(ajaxresp);
					buildroadsBlock(ajaxresp);
				}
			}else{
				$("#btccBlockId").html("No Data Available");
				$("#wbmBlockId").html("No Data Available");
				$("#grveBlockId").html("No Data Available");
				$("#earthenblockId").html("No Data Available");
				
				$("#levelWiseEnc"+locationType).html("No Data Avaliable");
			}
			
		}
	});
	
}
		
function build(ajaxresp,locationType){
	
	var tableView='';
	var paramname='';
	var totalhabsCon=0;
	var totalhabsunCon=0;
	var totalhabsLocCon=0;
	var totalhabsLocunCon=0;
	
	var totalhabs=ajaxresp.totalHabs;
	tableView+='<div class="table-responsive">';
	tableView+='<table class="table encTable" id="dataTable1'+locationType+'" style="width:100%;border:1px solid lightgrey">';
	tableView+='<thead class="text-capital">';
	tableView+='<tr>';
		tableView+='<th rowspan="2" style="background-color:#fff">'+locationType+'</th>';
		tableView+='<th colspan="5" style="text-align:center;background-color:#EDFEFF">ROAD NETWORK</th>';
		tableView+='<th colspan="3" style="text-align:center;background-color:#FFF5d9">HABITATION CONNECTIVITY</th>';
	tableView+='</tr>';
	tableView+='<tr>';
	//if(locationType =="state"){
		tableView+='<th style="background-color:#EDFEFF">TOTAL ROADS</th>';
		tableView+='<th style="background-color:#EDFEFF">BTCC</th>';
		tableView+='<th style="background-color:#EDFEFF">EARTHEN</th>';
		tableView+='<th style="background-color:#EDFEFF">GRVEL</th>';
		tableView+='<th style="background-color:#EDFEFF">WBM</th>';
		tableView+='<th style="background-color:#FFF5d9">HABCON</th>';
		tableView+='<th style="background-color:#FFF5d9">HABUNCON</th>';
		tableView+='<th style="background-color:#FFF5d9">TOTAL HABS</th>';
		
	//}
	tableView+='</tr>';
	tableView+='</thead>';
	tableView+='<tbody>';
	if(locationType =="state"){
		tableView+='<tr>';
		tableView+='<td>AndraPradesh</td>';
		tableView+='<td style="background-color:#EDFEFF">'+ajaxresp.totalRoadsLength+'</td>';
		if(ajaxresp.subList !=null){
			for(var j in ajaxresp.subList){
				tableView+='<td style="background-color:#EDFEFF">'+ajaxresp.subList[j].paramValue+'</td>';
				if(ajaxresp.subList[j].paramName == 'GRAVEL'){
					tableView+='<td style="background-color:#EDFEFF">'+ajaxresp.subList[5].paramValue+'</td>';
					totalhabsCon=ajaxresp.subList[j].paramValue;
				}
				if(ajaxresp.subList[j].paramName == 'HABUNCON'){
					totalhabsunCon=ajaxresp.subList[j].paramValue;
					//totalhabs=totalhabsCon+totalhabsunCon;
					tableView+='<td style="background-color:#FFF5d9">'+totalhabs+'</td>';
					break;
				}
			}

			}else{
				tableView+='<td> - </td>';
			}
		tableView+='</tr>';
	}else{
		for(var i in ajaxresp){
			tableView+='<tr>';
				tableView+='<td>'+ajaxresp[i].locationName+'</td>';
				tableView+='<td style="background-color:#EDFEFF">'+ajaxresp[i].totalRoadsLength+'</td>';
			if(ajaxresp[i].subList !=null){
				var totalhabsLoc=ajaxresp[i].totalHabs;
				for(var j in ajaxresp[i].subList){
					
					tableView+='<td style="background-color:#EDFEFF">'+ajaxresp[i].subList[j].paramValue+'</td>';
					if(ajaxresp[i].subList[j].paramName == 'GRAVEL'){
						tableView+='<td style="background-color:#EDFEFF">'+ajaxresp[i].subList[5].paramValue+'</td>';
						totalhabsLocCon=ajaxresp[i].subList[j].paramValue;
					}
					if(ajaxresp[i].subList[j].paramName == 'HABUNCON'){
						
						totalhabsLocunCon=ajaxresp[i].subList[j].paramValue;
						//totalhabsLoc=totalhabsLocCon+totalhabsLocunCon;
						tableView+='<td style="background-color:#FFF5d9">'+totalhabsLoc+'</td>';
						break;
					}
					
				}
			}else{
				tableView+='<td> - </td>';
			}
			tableView+='</tr>';
		}
	}
	tableView+='</tbody>';
	
	$("#levelWiseEnc"+locationType).html(tableView);
	if(locationType != "state"){
		$('#dataTable1'+locationType).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"order": [ 0, 'asc' ],
			"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			buttons: [
				{
					extend		:'csvHtml5',
					text		:'<i class="fa fa-file-text-o"></i>',
					titleAttr	: 'CSV',
					title		:  "ENC WORKS DASHBOARD",
					filename	:  'ENC Roads'+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
						
		});
	}

}
var btccCnt=0;
var earthenCnt=0;
var gravelCnt=0;
var wbmCnt=0;
function buildKeyPerformanceIndicatorsInfo(result){
	var totalRoadLength=result.totalRoadsLength;
	var mainArr=[];
	var str='';
	if(result !=null){
		for(var i in result.subList){
			var casteName ='';
			var count=0;
			var colorsId ='';
			if(result.subList[i].paramName=="BTCC"){
				casteName ="BT+CC";
				count =result.subList[i].paramValue;
				btccCnt=count;
				$("#btccBlockId").html(count);
				colorsId = globalCasteColorObj[result.subList[i].paramName.trim()];
			}else if(result.subList[i].paramName=="EARTHEN"){
				casteName = result.subList[i].paramName;
				count =result.subList[i].paramValue;
				$("#earthenblockId").html(count);
				colorsId = globalCasteColorObj[result.subList[i].paramName.trim()];
			}else if(result.subList[i].paramName=="GRAVEL"){
				casteName = result.subList[i].paramName;
				count =result.subList[i].paramValue;
				$("#grveBlockId").html(count);
				colorsId = globalCasteColorObj[result.subList[i].paramName.trim()];
			}else if(result.subList[i].paramName=="WBM"){
				casteName = result.subList[i].paramName;
				count =result.subList[i].paramValue;
				$("#wbmBlockId").html(count);
				colorsId = globalCasteColorObj[result.subList[i].paramName.trim()];
			}
			
			var obj = {
				name: casteName,
				y:count,
				color:colorsId
			}
			if(result.subList[i].paramName !="HABCON" && result.subList[i].paramName !="HABUNCON"){
						mainArr.push(obj);
			}
		}
	}
	
	$("#roadsChartinfo").highcharts({
		chart: {
			type: 'pie',
			backgroundColor:'transparent',
			options3d: {
				enabled: true,
				alpha: 25
			}
		},
		title: {
			  text: 'TOTAL ROAD LENGTH -'+totalRoadLength,
			  //align: 'left',
			   style: {
				fontWeight: 'bold',
			  }
		},
		tooltip: {
			useHTML: true,
			backgroundColor: '#FCFFC5', 
			formatter: function() {
				var cnt = this.point.count;
				return "<b style='color:"+this.point.color+"'>"+this.point.name+" - "+Highcharts.numberFormat(this.percentage,1)+"%</b>";
			}  
		},
		plotOptions: {
			pie: {
				innerSize: 140,
				depth: 80,
				dataLabels:{
					useHTML: true,
					enabled: false,
					formatter: function() {
							if (this.y === 0) {
								return null;
							} else {
								return "<b style='color:"+this.point.color+"'>"+this.point.name+"<br/>("+Highcharts.numberFormat(this.percentage,1)+"%)</b>";
							}
						} 
				},
				showInLegend: true
			},
		},
		legend : {
			enabled: true,
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			y: 30,
			//backgroundColor: '#FCFFC5',
			padding: 4,
			itemMarginTop: 5,
			itemMarginBottom: 5,
			itemStyle: {
				lineHeight: '20px',
				color: '#000000',
				//fontWeight: 'bold'
				
				
			},
			useHTML: true,
			
			labelFormatter: function() {
				return '<div><span>'+this.name +'</span></div>';
			}
		},
		series: [{
			name: '',
			data: mainArr,
			
		}]
	});
	
}

//buildroadsBlock();
function buildroadsBlock(ajaxresp){
	
	var habCon=0;
	var habUnCon=0;
	var totalhab=0;
	var covertedCnt=0;
	var str='';
	str+='<div class="col-sm-12">';
		str+='<div class="enc_block">';
			str+='<div class="row">';
				str+='<div class="col-sm-6" style="border-right:2px dashed lightgrey">';
					str+='<div class="col-sm-4">';
							str+='<img src="Assests/icons/Road_Network_icon.png">';
						str+='</div>';
						str+='<div class="col-sm-8">';
							str+='<h4><b>ROAD NETWORK</b></h4>';
							str+='<h3 class="m_top10"><b>'+ajaxresp.totalRoadsLength+'</b></h3>';
						str+='</div>';
					str+='<div class="col-sm-12 border_cls pad_10_10">';
						for(var i in ajaxresp.subList){
							covertedCnt=covertedCnt+ajaxresp.subList[i].paramValue;
							if(ajaxresp.subList[i].paramName != 'HABCON' && ajaxresp.subList[i].paramName != 'HABUNCON'){
								str+='<div class="col-sm-3">';
									str+='<b>'+ajaxresp.subList[i].paramName+'</b></br>';
									str+='<p style="font-size:18px">'+ajaxresp.subList[i].paramValue+'</p>';
								str+='</div>';
							}
							
						}
					str+='</div>';
					str+='<div class="col-sm-12 m_top10 roadnetwork_block">';
						str+='<h3><b style="font-size:17px">CONVERTED </b><b class="pull-right">'+ajaxresp.totalRoadsLength+'</b></h3>';
					str+='</div>';
				str+='</div>';
				
				str+='<div class="col-sm-6">';
					str+='<div class="roadsConnectedBlock" style="background-color:#F8F8F8;padding:10px;border-radius:5px">';
						for(var i in ajaxresp.subList){
							if(ajaxresp.subList[i].paramName == 'HABCON'){
								habCon = ajaxresp.subList[i].paramValue;
							}
							if(ajaxresp.subList[i].paramName == 'HABUNCON'){
								habUnCon = ajaxresp.subList[i].paramValue;
								totalhab=habCon+habUnCon;
							}
						}
						str+='<div class="row">';
							str+='<div class="col-sm-4">';
								str+='<h5><b>TOTAL HABITATION COUNT</b></h5>';
								str+='<h3 class="m_top10"><b>'+totalhab+'</b><span style="margin-left:10px;color:green"></span></h3>';
							str+='</div>';
							str+='<div class="col-sm-4">';
								str+='<h5><b>HABITATION CONNECTED</b></h5>';
								str+='<h3 class="m_top10"><b>'+habCon+'</b><span class="" style="margin-left:10px;color:green"></span></h3>';
							str+='</div>';
							str+='<div class="col-sm-4">';
								str+='<h5><b>HABITATION NOT-CONNECTED</b></h5>';
								str+='<h3 class="m_top10"><b>'+habUnCon+'</b><span class="" style="margin-left:10px;color:green"></span></h3>';
							str+='</div>';
							
						
						
					str+='</div>';
				str+='</div>';
				
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#roadsBlockId").html(str);
}