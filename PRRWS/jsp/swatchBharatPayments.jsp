<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rural Water Supply Dashboard</title>
<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css"/>
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/less" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<script src="https://use.fontawesome.com/07d3416f74.js"></script>
<script src="Assests/Plugins/Less/less.js"></script>
 <link rel="stylesheet" type="text/css" href="Assests/SimplePagination/simplePagination.css"/>
</head>
<body>

<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj & RD & RWS</h4>
					<p>Rural Water Supply - AP</p>
				</div>
				<div class="col-sm-1 col-xs-12">
					<i class="glyphicon glyphicon-th menu-cls pull-right"></i>
					<div class="menu-data-cls">
						<div class="arrow_box_top">
							<div  id="menu"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

</header>
<main>
	<section>
		<div class="container-fluid">
			<div class="row m_top10">
				<div class="col-sm-12">
					<div class="panel panel-black panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">Swatch Bharat - PAYMENTS</h4>
						</div>
						<div class="panel-body">
							<div class="chart" id="swatchBharatPaymentsDivId"></div>
						</div>
					</div>
				</div>
				<div class="col-sm-12 m_top20">
					<div id="sbPaymentDataDivId">
						<div id="levelWiseSwatchBharatPaymentsId"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/SimplePagination/simplePagination3.js" type="text/javascript"></script>
<!--<script src="Assests/ruralWaterSupply/custom.js" type="text/javascript"></script>-->
<script src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<!--<script src="Assests/ruralWaterSupply/ruralWaterSupplyDashBoard.js" type="text/javascript"></script>-->
</body>
</html>

<script>
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});
$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
$(document).on("click",".Paymentsmandal",function(){
		getSBPaymentsLvlWiseData("mandal")
});
$(document).on("click",".Paymentspanchayat",function(){
	getSBPaymentsLvlWiseData("panchayat")
});	
var spinner = '<div class="row"><div class="col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var levelWiseSBArr = ['state','district','constituencies','mandal','panchayat'];
levelWiseSBData("Payments");
getSBPaymentsAbstract();
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
								if(levelWiseSBArr[i] == "state" || levelWiseSBArr[i] == "district" || levelWiseSBArr[i] == "constituencies")
									collapse+='<h4 class="panel-title text-capital">'+levelWiseSBArr[i]+' level overview - (SBM- '+divId+') - All Amounts in Lakhs.</h4>';
								else
									collapse+='<h4 class="panel-title text-capital">'+levelWiseSBArr[i]+' level overview - (SBM- '+divId+') - All Amounts in Rupees.</h4>';
									
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
	
	if(divId == "IHHL"){
		$("#levelWiseSwatchBharatId").html(collapse);
	}else if(divId == "Payments"){
		$("#levelWiseSwatchBharatPaymentsId").html(collapse);
	}	
	
	
	setTimeout(function(){ 
		for(var i in levelWiseSBArr){
			if(levelWiseSBArr[i] == "state"){
				if(divId == "IHHL"){
					getIHHLlocationLvlWiseData("state")
				}else if(divId == "Payments"){
					getSBPaymentsLvlWiseData("state")
				}
				
			}else if(levelWiseSBArr[i] == "district"){
				if(divId == "IHHL"){
					getIHHLlocationLvlWiseData("district")
				}else if(divId == "Payments"){
					getSBPaymentsLvlWiseData("district")
				}
				
			}else if(levelWiseSBArr[i] == "constituencies"){
				if(divId == "IHHL"){
					getIHHLlocationLvlWiseData("constituencies")
				}else if(divId == "Payments"){
					getSBPaymentsLvlWiseData("constituency")
				}
				
			}
		}	
	
	}, 1500);
	
}
function highcharts(id,type,xAxis,yAxis,legend,data,plotOptions,tooltip,colors,title)
{
	'use strict';
	$('#'+id).highcharts({
		 colors: colors,
		chart: type,
		title: title,
		subtitle: {
			text: null
		},
		xAxis: xAxis,
		yAxis: yAxis,
		tooltip: tooltip,
		plotOptions: plotOptions,
		legend: legend,
		series: data
	});
}
function getSBPaymentsAbstract(){
		
	$("#swatchBharatPaymentsDivId").html(spinner);
	var json = {
		//fromDate:"201704",
		//toDate:"201708",
		location:"state",
		locationId:"01",
		subLocation :"state"
			
	}
	$.ajax({                
		type:'POST',    
		url: 'getSBPaymentsAbstract',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null){
			buildSBPaymentsAbstract(result);
		}
	});
}
		
function buildSBPaymentsAbstract(result){
	
	var dataArr=[];
	
	dataArr.push({"y":result.ttlAmt,"extra":result.totalAmount});
	dataArr.push({"y":result.paidAmt,"extra":result.paidAmount});
	dataArr.push({"y":result.pndgAmt,"extra":result.pendingAmount});
	var colors = ['#14BBAE'];
	var id = 'swatchBharatPaymentsDivId';
		var type = {
			type: 'bar',
			backgroundColor:'transparent'
		};
		var legend = {
			enabled: false
		};
		
		var title = {
			text: '',
			align:'left',
			 style: {
				 color: '#777',
				 font: 'bold 8px "Lato", sans-serif'
			  } 
		};
		var yAxis = {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
				text: null
			},
		};
		var xAxis = {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			categories: ["TOTAL","PAID","PENDING"]
			
		};
		var plotOptions ={ bar: {
				colorByPoint: true
			}};
		var tooltip = {
			useHTML:true,
			formatter: function () {
				//var pcnt = (this.y / totalCount) * 100;
				return '<b>' + this.x + ' Amount</b><br/>' +
					this.point.extra;
			}
		};

		var data = [{
			name: '',
			data: dataArr,

			dataLabels: {
				enabled: true,
				color: '#000',
				align: 'canter',
				formatter: function() {
						//var pcnt = (this.y / totalCount) * 100;
						//return '<span>'+this.y+'<br>('+Highcharts.numberFormat(pcnt)+'%)</span>';
						return '<span>'+this.point.extra+'</span>';
				} 
			}
		}];
	highcharts(id,type,xAxis,yAxis,legend,data,plotOptions,tooltip,colors,title);
}
$(document).on("click",".overViewDtlsSwatchBharatPaymentCls",function(){
	$("#sbPaymentModalDivId").modal('show');
	var str='';
		str+='<div id="levelWiseSwatchBharatPaymentsId"></div>';
	$("#sbPaymentDataDivId").html(str);
	
	levelWiseSBData("Payments")
	//$('html,body').animate({
	//	scrollTop: $("#overViewBlockId").offset().top},
	//'slow');
});
	
function getSBPaymentsLvlWiseData(locationType){
	$("#Payments"+locationType).html(spinner);
	
	var json = {
		//fromDate:"201704",
		//toDate:"201708",
		location:"state",
		locationId:"01",
		subLocation :locationType
			
	}
	$.ajax({                
		type:'POST',    
		url: 'getSBPaymentsLevelsWiseData',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildSBPaymentsLvlWiseData(result,locationType);
		}
	});
}
	
	
function buildSBPaymentsLvlWiseData(ajaxresp,locationType){
	if(ajaxresp != null && ajaxresp.length > 0){
		var str = '';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered dataTablePayments'+locationType+'">';
				str+='<thead class="text-capital">';
					if(locationType == "state"){
						str+='<th class="text-capital">'+locationType+'</th>';
					}
					else if(locationType == "district"){
						str+='<th class="text-capital">district</th>';
					}
					else if(locationType == "constituency"){
						str+='<th class="text-capital">district</th>';
						str+='<th class="text-capital">constituency</th>';
					}
					else if(locationType == "mandal"){
						str+='<th class="text-capital">district</th>';
						str+='<th class="text-capital">constituency</th>';
						str+='<th class="text-capital">mandal</th>';
					}
					else if(locationType == "panchayat"){
						str+='<th class="text-capital">district</th>';
						str+='<th class="text-capital">constituency</th>';
						str+='<th class="text-capital">mandal</th>';
						str+='<th class="text-capital">panchayat</th>';
					}
					str+='<th class="text-capital">TOTAL FTO</th>';
					str+='<th class="text-capital">Total Amount</th>';
					str+='<th class="text-capital">Paid Fto</th>';
					str+='<th class="text-capital">Paid Amount</th>';
					str+='<th class="text-capital">Pending Fto</th>';
					str+='<th class="text-capital">Pending AMount</th>';
					
				str+='</thead>';
				str+='<tbody>';
					for(var i in ajaxresp){
						str+='<tr>';
							if(locationType == "state"){
								str+='<td class="text-capital">'+locationType+'</td>';
							}
							else if(locationType == "district"){
								str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
							}
							else if(locationType == "constituency"){
								str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
							}
							else if(locationType == "mandal"){
								str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
							}
							else if(locationType == "panchayat"){
								str+='<td class="text-capital">'+ajaxresp[i].district+'</td>';
								str+='<td class="text-capital">'+ajaxresp[i].constituency+'</td>';
								str+='<td class="text-capital">'+ajaxresp[i].mandal+'</td>';
								str+='<td class="text-capital">'+ajaxresp[i].panchayt+'</td>';
							}
							str+='<td class="text-capital">'+ajaxresp[i].totalFTO+'</td>';										
							str+='<td class="text-capital">'+ajaxresp[i].totalAmount+'</td>';										
							str+='<td class="text-capital">'+ajaxresp[i].paidFTO+'</td>';										
							str+='<td class="text-capital">'+ajaxresp[i].paidAmount+'</td>';										
							str+='<td class="text-capital">'+ajaxresp[i].pendingFTO+'</td>';	
							str+='<td class="text-capital">'+ajaxresp[i].pendingAmount+'</td>';	
							
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		if(locationType == "constituency"){
			$("#Paymentsconstituencies").html(str);
		}else{
			$("#Payments"+locationType).html(str);
		}
		if(locationType !="state" || locationType !="district"){
			$(".dataTablePayments"+locationType).dataTable({
				"iDisplayLength": 20,
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
						title:	   locationType,
						filename:  locationType+''+moment().format("DD/MMMM/YYYY  HH:MM"),
					},
					{
						extend:    'pdfHtml5',
						text:      '<i class="fa fa-file-pdf-o"></i>',
						titleAttr: 'PDF',
						title:	   locationType,
						filename:  locationType+''+moment().format("DD/MMMM/YYYY  HH:MM"),
						orientation: "landscape",
						pageSize:'A3',
						customize: function (doc) {
							doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
						}
					}
				]
			});
		}
	}
}
</script>
