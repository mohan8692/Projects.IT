var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var globalStatusBackGroundObj={"1":"#ef2f2f","2":"#f26868","3":"#FF9900","4":"#e0a30b","5":"#AB9F2F","6":"#AEC200","7":"#7BAC43","8":"#739053","9":"#73a33e","10":"#40793A"};
var maxMarksObj={"IHHL":10,"Electricity":5,"LPG":5,"Water Tap":10,"SWM":15,"Roads":10,"Fiber":5,"HouseIncome":20,"Education":10,"Health":10};
var globalDistrictWiseTopPoorRslt;
var locationWiseArr = ['district','constituency','mandal','panchayat'];
var globalDistrictData;
var globalConstituencyData;
var globalMandalData;

$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});

onloadCalls();
function onloadCalls(){
	getLevelOverView();
	getComponentsWiseOverview();
	getComponentWiseRatingDetails();
	getDistrictWiseComponentsAchivement();
	locationWiseData();		
}

function getLevelOverView(){
	$('#overViewStarRatingDetails').html(spinner);
	$('#districtWiseOverViewStarRatingDetails').html(spinner);
	var json={
		"locationType" : "state",
		"locationId" : "1",
		"fromDateStr" : "",
		"toDateStr" : ""
	}
	$.ajax({
		type:'POST',
		url:'getLevelOverView',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		  if(result !=null){
			  globalDistrictWiseTopPoorRslt = result;
			  buildOverViewStarRatingLevelOverView(result);
			  buildDistrictWiseStarRatingLevelTopResults(result);
			  buildDistrictWiseStarRating(result);
		  }
	})
}

function  buildOverViewStarRatingLevelOverView(result){
	
	 var starNamesArr=[];
	 var dataArr=[];
	 $("#totalPanchayatiesId").html("Total Panchayaths - "+result.starRangeList[0].totalGps);
	if(result.starRangeList !=null && result.starRangeList.length>0){
		for(var i in result.starRangeList){
			if(result.starRangeList[i].name != "0"){
				var starList = result.starRangeList[i].name+" Star";
				starNamesArr.push(starList);
				dataArr.push({"y":parseFloat(result.starRangeList[i].percentage),color:globalStatusBackGroundObj[result.starRangeList[i].name],"extra":result.starRangeList[i].gpsCount,"starRate":i+"star","starTitle":i});
			}
		}
	}else{
		$('#overViewStarRatingDetails').html("No Data Available")
	}
	
	
	$('#overViewStarRatingDetails').highcharts({
		chart: {
			type: 'bar',
			backgroundColor:'transparent'
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
			categories: starNamesArr
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
				text: ''
			},
			labels: {
				enabled:false,
			},
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				cursor: 'pointer',
				point: {
					events: {
						click: function () {
							getVillageDetailsForClick("state","0",null,null,null,this.starRate,this.starTitle+" Star Rating Wise Details");
						}
					}
				}
			},
			bar: {
				pointWidth: 25,
				gridLineWidth: 25
				
			},
		},
		tooltip :{
			useHTML:true,
			formatter: function () {
				return '<b>' + this.x + '</b><br/>' +
					this.y+'% -'+this.point.extra+'';
			}
		},
		series: [{
			name: '',
			data: dataArr,
			dataLabels: {
				useHTML:true,
				enabled: true,
				color: '#000',
				align: 'center',
				formatter: function() {
					return '<span>'+this.y+'  % -  '+this.point.extra+'</span>';
				} 
			}
		}]
	});
}
function  buildDistrictWiseStarRatingLevelTopResults(result){
	 var districtWiseStarNamesArr=[];
	 var districtMainCountArr=[];
	 
	 //var ZeroCountArr=[];
	 var OneCountArr = [];
	 var TwoCountArr = [];
	 var ThreeCountArr = [];
	 var FourCountArr = [];
	 var FiveCountArr = [];
	 var SixCountArr = [];
	 var SevenCountArr = [];
	 var EightCountArr = [];
	 var NineCountArr = [];
	 var TenCountArr = [];
	 var countVar =0;
	
	if(result.districtList !=null && result.districtList.length>0){
		for(var i in result.districtList){
			
			districtWiseStarNamesArr.push(result.districtList[i].districtName);
			if(result.districtList[i].subList !=null && result.districtList[i].subList.length>0){
				for(var j in result.districtList[i].subList){
					/* if(result.districtList[i].subList[j].name==0){
						 ZeroCountArr.push({"y":2,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
					} */
					//if(result.districtList[i].subList[j].percentage!=0){
						if(result.districtList[i].subList[j].name==1){
							 OneCountArr.push({"y":2,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==2){
							 TwoCountArr.push({"y":3,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==3){
							 ThreeCountArr.push({"y":4,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==4){
							 FourCountArr.push({"y":5,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==5){
							 FiveCountArr.push({"y":6,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==6){
							 SixCountArr.push({"y":7,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==7){
							 SevenCountArr.push({"y":8,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==8){
							 EightCountArr.push({"y":9,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==9){
							 NineCountArr.push({"y":10,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==10){
							 TenCountArr.push({"y":11,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}
					//}
					
				}
				
			}
			countVar =countVar+1;
			if (countVar === 5) {
				break;
			}
		}
		
		
		  if(TenCountArr != null && TenCountArr.length > 0){
			 districtMainCountArr.push({name:'10 Star',data:TenCountArr,color:"#40793A"});  
		  }
		   if(NineCountArr != null && NineCountArr.length > 0){
			districtMainCountArr.push({name:'9 Star',data:NineCountArr,color:"#73a33e"}); 
		  }
		  if(EightCountArr != null && EightCountArr.length > 0){
			districtMainCountArr.push({name:'8 Star',data:EightCountArr,color:"#739053"});  
		  }
		  if(SevenCountArr != null && SevenCountArr.length > 0){
			districtMainCountArr.push({name:'7 Star',data:SevenCountArr,color:"#7BAC43"}); 
		  }
		  if(SixCountArr != null && SixCountArr.length > 0){
			districtMainCountArr.push({name:'6 Star',data:SixCountArr,color:"#AEC200"});
		  }
		 
		  if(FiveCountArr != null && FiveCountArr.length > 0){
			  districtMainCountArr.push({name:'5 Star',data:FiveCountArr,color:"#C0DC00"});  
		  }
		   if(FourCountArr != null && FourCountArr.length > 0){
			districtMainCountArr.push({name:'4 Star',data:FourCountArr,color:"#e0a30b"});    
		  }
		   if(ThreeCountArr != null && ThreeCountArr.length > 0){
			districtMainCountArr.push({name:'3 Star',data:ThreeCountArr,color:"#FF9900"});  	
		  }
		   if(TwoCountArr != null && TwoCountArr.length > 0){
			   districtMainCountArr.push({name:'2 Star',data:TwoCountArr,color:"#f26868"});  
		  }
		   if(OneCountArr != null && OneCountArr.length > 0){
			districtMainCountArr.push({name:'1 Star',data:OneCountArr,color:"#ef2f2f"});  			
		  } 
		  /* if(ZeroCountArr != null && ZeroCountArr.length > 0){
			districtMainCountArr.push({name:'0 Star',data:ZeroCountArr,color:"#c92626"});  
		  } */
		  
	}else{
		$('#districtWiseOverViewStarRatingDetails').html("No Data Available")
	}
	
	
	
	$('#districtWiseOverViewStarRatingDetails').highcharts({
		chart: {
			type: 'bar',
			backgroundColor:'transparent'
		},
		title: {
			text: ''
		},
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			categories: districtWiseStarNamesArr
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
				text: ''
			},
			labels: {
				enabled:false,
			},
		},
		legend: {
			enabled: false
		},
		tooltip: {
				formatter: function () {
				var s = '<b>' + this.x + '</b>';

					$.each(this.points, function () {
						if(this.series.name != "Series 1")  
						s += '<br/><b style="color:'+this.series.color+'">' + this.point.extra + '</b>'
					});

					return s;
				},
				shared: true
			},
		plotOptions: {
			bar: {
				stacking: 'normal',
				pointWidth: 30,
				gridLineWidth: 15,
				dataLabels: {
					enabled: true,
					formatter: function() {
						/* if(this.y == 2){
							return 0;
						} */
						if(this.y == 2){
							return 1;
						}else if(this.y == 3){
							return 2;
						}else if(this.y == 4){
							return 3;
						}else if(this.y == 5){
							return 4;
						}else if(this.y == 6){
							return 5;
						}else if(this.y == 7){
							return 6;
						}else if(this.y == 8){
							return 7;
						}else if(this.y == 9){
							return 8;
						}else if(this.y == 10){
							return 9;
						}else if(this.y == 11){
							return 10;
						}
						
					},
				}
			}
		},
		series: districtMainCountArr
	});
}
function  buildDistrictWiseStarRatingLevelPoorResults(result){
	 var districtWiseStarNamesArr=[];
	 var districtMainCountArr=[];
	 
	 //var ZeroCountArr=[];
	 var OneCountArr = [];
	 var TwoCountArr = [];
	 var ThreeCountArr = [];
	 var FourCountArr = [];
	 var FiveCountArr = [];
	 var SixCountArr = [];
	 var SevenCountArr = [];
	 var EightCountArr = [];
	 var NineCountArr = [];
	 var TenCountArr = [];
	 var countVar =0;
	
	if(result.districtList !=null && result.districtList.length>0){
		for(var i = result.districtList.length -1; i >= 0; i--){
			districtWiseStarNamesArr.push(result.districtList[i].districtName);
			if(result.districtList[i].subList !=null && result.districtList[i].subList.length>0){
				for(var j in result.districtList[i].subList){
					/* if(result.districtList[i].subList[j].name==0){
						 ZeroCountArr.push({"y":2,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
					} */
					//if(result.districtList[i].subList[j].percentage!=0){
						if(result.districtList[i].subList[j].name==1){
							 OneCountArr.push({"y":3,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==2){
							 TwoCountArr.push({"y":4,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==3){
							 ThreeCountArr.push({"y":5,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==4){
							 FourCountArr.push({"y":6,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==5){
							 FiveCountArr.push({"y":7,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==6){
							 SixCountArr.push({"y":8,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==7){
							 SevenCountArr.push({"y":9,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==8){
							 EightCountArr.push({"y":10,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==9){
							 NineCountArr.push({"y":11,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==10){
							 TenCountArr.push({"y":12,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}
					//}
					
				}
				
			}
			countVar =countVar+1;
			if (countVar === 5) {
				break;
			}
		}
		
		
		  if(TenCountArr != null && TenCountArr.length > 0){
			 districtMainCountArr.push({name:'10 Star',data:TenCountArr,color:"#40793A"});  
		  }
		   if(NineCountArr != null && NineCountArr.length > 0){
			districtMainCountArr.push({name:'9 Star',data:NineCountArr,color:"#73a33e"}); 
		  }
		  if(EightCountArr != null && EightCountArr.length > 0){
			districtMainCountArr.push({name:'8 Star',data:EightCountArr,color:"#739053"});  
		  }
		  if(SevenCountArr != null && SevenCountArr.length > 0){
			districtMainCountArr.push({name:'7 Star',data:SevenCountArr,color:"#7BAC43"}); 
		  }
		  if(SixCountArr != null && SixCountArr.length > 0){
			districtMainCountArr.push({name:'6 Star',data:SixCountArr,color:"#AEC200"});
		  }
		 
		  if(FiveCountArr != null && FiveCountArr.length > 0){
			  districtMainCountArr.push({name:'5 Star',data:FiveCountArr,color:"#C0DC00"});  
		  }
		   if(FourCountArr != null && FourCountArr.length > 0){
			districtMainCountArr.push({name:'4 Star',data:FourCountArr,color:"#e0a30b"});    
		  }
		   if(ThreeCountArr != null && ThreeCountArr.length > 0){
			districtMainCountArr.push({name:'3 Star',data:ThreeCountArr,color:"#FF9900"});  	
		  }
		   if(TwoCountArr != null && TwoCountArr.length > 0){
			   districtMainCountArr.push({name:'2 Star',data:TwoCountArr,color:"#f26868"});  
		  }
		   if(OneCountArr != null && OneCountArr.length > 0){
			districtMainCountArr.push({name:'1 Star',data:OneCountArr,color:"#ef2f2f"});  			
		  } 
		  /* if(ZeroCountArr != null && ZeroCountArr.length > 0){
			districtMainCountArr.push({name:'0 Star',data:ZeroCountArr,color:"#c92626"});  
		  } */
		  
	}else{
		$('#overViewStarRatingDetails').html("No Data Available")
	}
	
	
	
	$('#districtWiseOverViewStarRatingDetails').highcharts({
		chart: {
			type: 'bar',
			backgroundColor:'transparent'
		},
		title: {
			text: ''
		},
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			categories: districtWiseStarNamesArr
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
				text: ''
			},
			labels: {
				enabled:false,
			},
		},
		legend: {
			enabled: false
		},
		tooltip: {
				formatter: function () {
				var s = '<b>' + this.x + '</b>';

					$.each(this.points, function () {
						if(this.series.name != "Series 1")  
						s += '<br/><b style="color:'+this.series.color+'">' + this.point.extra + '</b>'
					});

					return s;
				},
				shared: true
			},
		plotOptions: {
			bar: {
				stacking: 'normal',
				pointWidth: 30,
				gridLineWidth: 15,
				dataLabels: {
					enabled: true,
					formatter: function() {
						/* if(this.y == 2){
							return 0;
						} */
						if(this.y == 2){
							return 1;
						}else if(this.y == 3){
							return 2;
						}else if(this.y == 4){
							return 3;
						}else if(this.y == 5){
							return 4;
						}else if(this.y == 6){
							return 5;
						}else if(this.y == 7){
							return 6;
						}else if(this.y == 8){
							return 7;
						}else if(this.y == 9){
							return 8;
						}else if(this.y == 10){
							return 9;
						}else if(this.y == 11){
							return 10;
						}
						
					},
				}
			}
		},
		series: districtMainCountArr
	});
}
$(document).on("click",".switch-btn-New li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var levelType=$(this).attr("attr_type");
	 if(levelType == "top"){
		 buildDistrictWiseStarRatingLevelTopResults(globalDistrictWiseTopPoorRslt);
	 }else if(levelType == "poor"){
		buildDistrictWiseStarRatingLevelPoorResults(globalDistrictWiseTopPoorRslt);
	 }
});


function buildDistrictWiseStarRating(result){
	 var districtWiseStarNamesArr=[];
	 var districtMainCountArr=[];
	 
	 //var ZeroCountArr=[];
	 var OneCountArr = [];
	 var TwoCountArr = [];
	 var ThreeCountArr = [];
	 var FourCountArr = [];
	 var FiveCountArr = [];
	 var SixCountArr = [];
	 var SevenCountArr = [];
	 var EightCountArr = [];
	 var NineCountArr = [];
	 var TenCountArr = [];
	 
	
	if(result.districtList !=null && result.districtList.length>0){
		for(var i in result.districtList){
			
			districtWiseStarNamesArr.push(result.districtList[i].districtName);
			if(result.districtList[i].subList !=null && result.districtList[i].subList.length>0){
				for(var j in result.districtList[i].subList){
					/* if(result.districtList[i].subList[j].name==0){
						 ZeroCountArr.push({"y":2,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
					} */
					//if(result.districtList[i].subList[j].percentage!=0){
						if(result.districtList[i].subList[j].name==1){
							 OneCountArr.push({"y":3,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==2){
							 TwoCountArr.push({"y":4,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==3){
							 ThreeCountArr.push({"y":5,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==4){
							 FourCountArr.push({"y":6,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==5){
							 FiveCountArr.push({"y":7,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==6){
							 SixCountArr.push({"y":8,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==7){
							 SevenCountArr.push({"y":9,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==8){
							 EightCountArr.push({"y":10,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==9){
							 NineCountArr.push({"y":11,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}else if(result.districtList[i].subList[j].name==10){
							 TenCountArr.push({"y":12,"extra":result.districtList[i].subList[j].name+" Star"+'-('+result.districtList[i].subList[j].percentage+')-'+result.districtList[i].subList[j].gpsCount+' Villages'}); 
						}
					//}
				}
				
			}
			
		}
		
		
		  if(TenCountArr != null && TenCountArr.length > 0){
			 districtMainCountArr.push({name:'10 Star',data:TenCountArr,color:"#40793A"});  
		  }
		   if(NineCountArr != null && NineCountArr.length > 0){
			districtMainCountArr.push({name:'9 Star',data:NineCountArr,color:"#73a33e"}); 
		  }
		  if(EightCountArr != null && EightCountArr.length > 0){
			districtMainCountArr.push({name:'8 Star',data:EightCountArr,color:"#739053"});  
		  }
		  if(SevenCountArr != null && SevenCountArr.length > 0){
			districtMainCountArr.push({name:'7 Star',data:SevenCountArr,color:"#7BAC43"}); 
		  }
		  if(SixCountArr != null && SixCountArr.length > 0){
			districtMainCountArr.push({name:'6 Star',data:SixCountArr,color:"#AEC200"});
		  }
		 
		  if(FiveCountArr != null && FiveCountArr.length > 0){
			  districtMainCountArr.push({name:'5 Star',data:FiveCountArr,color:"#C0DC00"});  
		  }
		   if(FourCountArr != null && FourCountArr.length > 0){
			districtMainCountArr.push({name:'4 Star',data:FourCountArr,color:"#e0a30b"});    
		  }
		   if(ThreeCountArr != null && ThreeCountArr.length > 0){
			districtMainCountArr.push({name:'3 Star',data:ThreeCountArr,color:"#FF9900"});  	
		  }
		   if(TwoCountArr != null && TwoCountArr.length > 0){
			   districtMainCountArr.push({name:'2 Star',data:TwoCountArr,color:"#f26868"});  
		  }
		   if(OneCountArr != null && OneCountArr.length > 0){
			districtMainCountArr.push({name:'1 Star',data:OneCountArr,color:"#ef2f2f"});  			
		  } 
		  /* if(ZeroCountArr != null && ZeroCountArr.length > 0){
			districtMainCountArr.push({name:'0 Star',data:ZeroCountArr,color:"#c92626"});  
		  } */
		  
	}else{
		$('#districtWiseStarRatingDivId').html("No Data Available")
	}
	
	
	
	$('#districtWiseStarRatingDivId').highcharts({
		chart: {
			type: 'column',
			backgroundColor:'transparent'
		},
		title: {
			text: ''
		},
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			categories: districtWiseStarNamesArr,
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
				text: ''
			},
			labels: {
				enabled:false,
			},
		},
		legend: {
			enabled: false
		},
		tooltip: {
				formatter: function () {
				var s = '<b>' + this.x + '</b>';

					$.each(this.points, function () {
						if(this.series.name != "Series 1")  
						s += '<br/><b style="color:'+this.series.color+'">' + this.point.extra + '</b>'
					});

					return s;
				},
				shared: true
			},
		plotOptions: {
			column: {
				stacking: 'normal',
				pointWidth: 40,
				gridLineWidth: 20,
				dataLabels: {
					enabled: true,
					formatter: function() {
						/* if(this.y == 2){
							return 0;
						} */
						if(this.y == 2){
							return 1;
						}else if(this.y == 3){
							return 2;
						}else if(this.y == 4){
							return 3;
						}else if(this.y == 5){
							return 4;
						}else if(this.y == 6){
							return 5;
						}else if(this.y == 7){
							return 6;
						}else if(this.y == 8){
							return 7;
						}else if(this.y == 9){
							return 8;
						}else if(this.y == 10){
							return 9;
						}else if(this.y == 11){
							return 10;
						}
						
					},
				}
			}
		},
		series: districtMainCountArr
	});
}

function getComponentsWiseOverview(){
	 $("#donutFirstPart").html(spinner);
	 
	  var json={
	  }
	  $.ajax({
		type:'POST',
		url:'getComponentsWiseOverview',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
		  xhr.setRequestHeader("Accept", "application/json");
		  xhr.setRequestHeader("Content-Type", "application/json");
		}
	  }).done(function(result){
		  if(result != null && result != undefined){
			buildComponentsWiseOverview(result)
		}else{
		  $("#donutFirstPart").html("<option>No Data Available</option>")
		}  
	  })
  
}

function buildComponentsWiseOverview(result){
  var achievdPer;
  var unAchievedPer;
  var str='';
  var ids;
    str+='<div class="row m_top10">';
    for(var i in result){
      
        str+='<div class="col-sm-2 graphCls graphCss">';
          str+='<div id="doNutChartId'+i+'"></div>';
          str+='<h6 class="text-center">'+result[i].name+'</h6>';
        str+='</div>';
		if(i == 4){
			str+='</div>';
			str+='<hr style="margin:5px 0px; border-bottom:1px solid #78B9CC;">';
			str+='<div class="row m_top10">';
		}
      }
    
    str+='</div>';
  $("#donutFirstPart").html(str);  
  for(var i in result){
        achievdPer=result[i].perc;
        unAchievedPer=100-result[i].perc;
        ids="doNutChartId"+i;
        buildDoNutChart(ids,achievdPer,unAchievedPer);
  }
 
}
function buildDoNutChart(id,achievedPer,unAchievedPer){
 
  $("#"+id).highcharts({
    colors:['#79B8CC','#FFFFFF'],
    chart:{
      height:100,
      type:'pie',
    },
    title: {
      useHTML: true,
      text: "<span style='font-size:9px;font-weight:bold;'>"+achievedPer+"% </br>Achived</span>",
      y:5,
      x:3,
      align: 'center',
      verticalAlign: 'middle',
    },
    tooltip: {
      enabled: false
    },
    credits:{
      enabled:false,
    },
    plotOptions: {
      pie: {
        borderColor: '#ccc',
        size: 80,
        innerSize:60,
        dataLabels: {
          enabled: false,
        }
      }
    },  
    series: [{
      name: 'Share',
      data: [{name:"Acieved",y:parseFloat(achievedPer)},{name:"Un Acieved",y:parseFloat(unAchievedPer)}],
    }]
  });
}

function getComponentWiseRatingDetails(){
	$("#componentWiseRatingDivId").html(spinner);
	var json={
	}
	$.ajax({
		type:'POST',
		url:'getComponentWiseRatingDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 buildComponentWiseRating(result);
		 }else{
			 $("#componentWiseRatingDivId").html("No Data");
		 }
	});
}

function buildComponentWiseRating(result) {
	var ratingArray=[{"fromRating":"0","toRating":"0"},{"fromRating":"0","toRating":"10"},{"fromRating":"10","toRating":"20"},{"fromRating":"20","toRating":"30"},{"fromRating":"30","toRating":"50"},{"fromRating":"50","toRating":"70"},{"fromRating":"70","toRating":"90"},{"fromRating":"90","toRating":"100"}]
	var str='';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_SC" id="componentWiseRating">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2">Components</th>';
						str+='<th rowspan="2">Max Marks</th>';
						str+='<th rowspan="2">Villages</th>';
						str+='<th colspan="2">0%</th>';
						str+='<th colspan="2">0 - 10 %</th>';
						str+='<th colspan="2">10-20 %</th>';
						str+='<th colspan="2">20-30 %</th>';
						str+='<th colspan="2">30-50 %</th>';
						str+='<th colspan="2">50-70 %</th>';
						str+='<th colspan="2">70-90 %</th>';
						str+='<th colspan="2">90- 100 %</th>';
					str+='</tr>';
					str+='<tr>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td>';
							str+='<div class="media">';
								str+='<div class="media-left">';
								if(result[i].componentName == "IHHL"){
									str+='<img src="Assests/images/icon-IHHL.png">';
								}else if(result[i].componentName == "Electricity"){
									str+='<img src="Assests/images/icon-Elec-Connections.png">';
								}else if(result[i].componentName == "LPG"){
									str+='<img src="Assests/images/icon-Gas-Connections.png">';
								}else if(result[i].componentName == "Water Tap"){
									str+='<img src="Assests/images/icon-WaterTap.png">';
								}else if(result[i].componentName == "SWM"){
									str+='<img src="Assests/images/icon-SolidWasteManagement.png">';
								}else if(result[i].componentName == "Roads"){
									str+='<img src="Assests/images/icon-RoadConnectivity.png">';
								}else if(result[i].componentName == "Fiber"){
									str+='<img src="Assests/images/icon-FiberNet.png">';
								}else if(result[i].componentName == "HouseIncome"){
									str+='<img src="Assests/images/icon-Income.png">';
								}else if(result[i].componentName == "Education"){
									str+='<img src="Assests/images/icon-Education.png">';
								}else if(result[i].componentName == "Health"){
									str+='<img src="Assests/images/icon-Health-Nutrition.png">';
								}
								str+='</div>';
								str+='<div class="media-body" style="width:100%;">';
									str+='<h5 class="media-heading">'+result[i].componentName+'</h5>';
								str+='</div>';
							str+='</div>';
						str+='</td>';
						
						str+='<td><h6>'+result[i].maxRating+'</h6></td>';
						str+='<td><h6>'+result[i].totalVillageCount+'</h6></td>';
						for(var j in result[i].subList){
							if(result[i].subList[j].villageCount !=null && result[i].subList[j].villageCount>0){
								str+='<td><a  attr_component_name="'+result[i].componentName+'" attr_from_range="'+ratingArray[j].fromRating+'" attr_to_range="'+ratingArray[j].toRating+'" class="componentWiseClckCls" style="cursor:pointer;">'+result[i].subList[j].villageCount+'</h6></td>';
								str+='<td class="text-success">'+result[i].subList[j].percentage+'</td>';
							}else{
								str+='<td> - </td>';
								str+='<td class="text-success"></td>';
							}
							
						}
					str+='</tr>';	
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		$("#componentWiseRatingDivId").html(str);
		$("#componentWiseRating").dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15, 30, 50, -1], [15, 30, 50, "All"]],
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "10starRating componentwise",
					filename:  "10starRating componentwise"+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
		}); 
}


function getDistrictWiseComponentsAchivement(){
	$("#districtWiseComponentWiseRatingDivId").html(spinner);
	var json={
		
	}
	$.ajax({
		type:'POST',
		url:'getDistrictWiseComponentsAchivement',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if(result !=null && result.length>0){
			 buildDistrictWiseComponentRating(result);
		 }else{
			 $("#districtWiseComponentWiseRatingDivId").html("No Data Available");
		 }
	})
}
function  buildDistrictWiseComponentRating(result){
	var str='';
	str+='<div class="col-sm-3" id="defaultTabCls">';
		str+='<label class="radio-inline"><input type="radio" name="defaultRadio" value="count" id="countId">&nbsp;&nbsp;Marks</label>';
		str+='<label class="radio-inline"><input type="radio" name="defaultRadio" value="percentage" id="percentageId" checked>&nbsp;&nbsp;Percentage</label>';
	str+='</div>';
	str+='<div class="col-sm-12">';
		str+='<div class="table-responsive m_top30">';
			str+='<table class="table table-bordered districtCompScroll table_custom_SC">';
				str+='<thead>';
					str+='<tr>';
						str+='<th style="text-align:center;">District Name</th>';
						for (var i in result[0].subList) {
							str+='<th class="countView" style="display:none;">'+result[0].subList[i].name+'&nbsp;('+maxMarksObj[result[0].subList[i].name]+')</th>';							
							str+='<th class="perView">'+result[0].subList[i].name+'&nbsp;('+maxMarksObj[result[0].subList[i].name]+')</th>';							
						}
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
				for (var i in result) {
					str+='<tr>';
						str+='<td style="text-align:left !important;">'+result[i].districtName+'</td>';
							for(var j in result[i].subList) {								
								if(parseFloat(result[i].subList[j].perc) >= '90' && parseFloat(result[i].subList[j].perc) <= '100'){
									if(result[i].subList[j].perc == '100.00'){
										str+='<td class="perView" style="color:#00AF50">100 %</td>';
										if(result[i].subList[j].totalAvg != null && result[i].subList[j].totalAvg > 0){
											str+='<td class="countView" style="color:#00AF50; display:none;">'+result[i].subList[j].totalAvg+'</td>';
										}else{
											str+='<td class="countView" style="color:#00AF50; display:none;">-</td>';
										}
									}else{
										str+='<td class="perView" style="color:#00AF50">'+result[i].subList[j].perc+' %</td>';
										if(result[i].subList[j].totalAvg != null && result[i].subList[j].totalAvg > 0){
											str+='<td class="countView" style="color:#00AF50; display:none;">'+result[i].subList[j].totalAvg+'</td>';
										}else{
											str+='<td class="countView" style="color:#00AF50; display:none;">-</td>';
										}
									}									
									
								}else if(parseFloat(result[i].subList[j].perc) >= '60' && parseFloat(result[i].subList[j].perc) < '90'){
									str+='<td class="perView" style="color:#ff6600">'+result[i].subList[j].perc+' %</td>';
									if(result[i].subList[j].totalAvg != null && result[i].subList[j].totalAvg > 0){
										str+='<td class="countView" style="color:#ff6600; display:none;">'+result[i].subList[j].totalAvg+'</td>';
									}else{
										str+='<td class="countView" style="color:#ff6600; display:none;">-</td>';
									}
								}else{
									str+='<td class="perView" style="color:#BF0707">'+result[i].subList[j].perc+' %</td>';
									if(result[i].subList[j].totalAvg != null && result[i].subList[j].totalAvg > 0){
										str+='<td class="countView" style="color:#BF0707; display:none;">'+result[i].subList[j].totalAvg+'</td>';
									}else{
										str+='<td class="countView" style="color:#BF0707; display:none;">-</td>';
									}
								}								
								
							}
					str+='</tr>';
				}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	str+='</div>';
	$("#districtWiseComponentWiseRatingDivId").html(str);
	$(".districtCompScroll").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "10starRating component achievements",
				filename:  "10starRating component achievements"+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); 
}

function locationWiseData()
{
	var collapse='';
			collapse+='<div class="col-sm-12 m_top10">';
				for(var i in locationWiseArr)
				{
					collapse+='<div class="panel-group" id="accordion'+locationWiseArr[i]+'" role="tablist" aria-multiselectable="true">';
						collapse+='<div class="panel panel-default panel-black">';
							collapse+='<div class="panel-heading" role="tab" id="heading'+locationWiseArr[i]+'">';
								if(i == 0)
								{
									collapse+='<a id="tenStar'+locationWiseArr[i]+'" role="button" class="panelCollapseIcon '+locationWiseArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+locationWiseArr[i]+'" href="#collapse'+locationWiseArr[i]+'" aria-expanded="true" aria-controls="collapse'+locationWiseArr[i]+'">';
								}else{
									collapse+='<a id="tenStar'+locationWiseArr[i]+'" role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordion'+locationWiseArr[i]+'" href="#collapse'+locationWiseArr[i]+'" aria-expanded="true" aria-controls="collapse'+locationWiseArr[i]+'">';
								}
								 collapse+='<h4 class="panel-title text-capital">'+locationWiseArr[i]+' level overview</h4>';
									
								collapse+='</a>';
							collapse+='</div>';
							if(i == 0)
							{
								collapse+='<div id="collapse'+locationWiseArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+locationWiseArr[i]+'">';
							}else{
								collapse+='<div id="collapse'+locationWiseArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+locationWiseArr[i]+'">';
							}
							
								collapse+='<div class="panel-body">';
									collapse+='<div id="locationWiseStarRating'+locationWiseArr[i]+'"></div>';
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				}
			collapse+='</div>';
		
		$("#levelWiseStarRatingsId").html(collapse);
		$('.select-chosen').chosen();
		for(var i in locationWiseArr){
			
			getLevelsWiseDetails(locationWiseArr[i]);
		}
}


function getLevelsWiseDetails(locationTypeVal){
	$("#locationWiseStarRating"+locationTypeVal).html(spinner);
	
	var json={
		"levelType" : locationTypeVal
	}
	$.ajax({
		type:'POST',
		url:'getLevelsWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if(result !=null && result.length>0){
			 if(locationTypeVal == "district"){
				 globalDistrictData = result;
				 //console.log(globalDistrictData)
			 }
			 if(locationTypeVal == "constituency"){
				 globalConstituencyData = result;
				 //console.log(globalConstituencyData)
			 }
			 if(locationTypeVal == "mandal"){
				 globalMandalData = result;
				 //console.log(globalMandalData)
			 }
			 if(locationTypeVal !="panchayat"){
				 buildLevelsWiseDetails(result,locationTypeVal);
			 }else{
				 buildPanchayatLevelsWiseDetails(result,locationTypeVal);
				 //console.log(result)
			 }
		 }else{
			 $("#locationWiseStarRating"+locationTypeVal).html("No Data");
		 }
	})
}

function buildLevelsWiseDetails(result,locationTypeVal){
	var FixedCols=1;
	var str='';
	var colorsArr=[];
	for(var i in globalStatusBackGroundObj){
		colorsArr.push(globalStatusBackGroundObj[i]);
	}
	var k=1;
		str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_custom_SC" id="dataTableStarRating'+locationTypeVal+'" style="width:100%;border:1px solid lightgrey !important;">';
			str+='<thead style="background-color: #f2f2f2 !important;">';
				str+='<tr>';
					if(locationTypeVal == "district"){
						str+='<th rowspan="2">District</th>';
					}else if(locationTypeVal == "constituency"){
						str+='<th rowspan="2">District</th>';
						str+='<th rowspan="2">Constituency</th>';
					}else if(locationTypeVal == "mandal"){
						str+='<th rowspan="2">District</th>';
						str+='<th rowspan="2">Constituency</th>';
						str+='<th rowspan="2">Mandal</th>';
						
					}
					str+='<th rowspan="2">Total Villages</th>';
					for(var i in colorsArr){
						str+='<th colspan="2"><span class="roundCircle color_white" style="background-color:'+colorsArr[i]+'">'+k+'</span></th>';
						k=k+1;
					}
				str+='</tr>';
				
				str+='<tr>';
				for(var i in colorsArr){
					str+='<th>Count</th>';
					str+='<th>%</th>';
				}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for (var i in result){
				str+='<tr>';
					if(locationTypeVal == "district"){
						str+='<td class="odf_FixedCol" style="text-align:left !important;"><a class="locationWiseComponentCls" attr_district_id="'+result[i].districtId+'" attr_district_name="'+result[i].districtName+'" attr_loc_name="'+result[i].districtName+'" attr_level_type="'+locationTypeVal+'"style = "cursor:pointer;">'+result[i].districtName+'<a></td>';
					}else if(locationTypeVal == "constituency"){
						str+='<td class="odf_FixedCol" style="text-align:left !important;">'+result[i].districtName+'</td>';
						str+='<td class="odf_FixedCol" style="text-align:left !important;"><a class="locationWiseComponentCls" attr_district_id="'+result[i].constituencyId+'" attr_district_name="'+result[i].districtName+'" attr_loc_name="'+result[i].constituencyName+'" attr_constituency_name="'+result[i].constituencyName+'" attr_level_type="'+locationTypeVal+'"style = "cursor:pointer;">'+result[i].constituencyName+'</a></td>';
					}else if(locationTypeVal == "mandal"){
						str+='<td class="odf_FixedCol" style="text-align:left !important;">'+result[i].districtName+'</td>';
						str+='<td class="odf_FixedCol" style="text-align:left !important;">'+result[i].constituencyName+'</td>'; 
						str+='<td class="odf_FixedCol" style="text-align:left !important;"><a class="locationWiseComponentCls" attr_district_id="'+result[i].mandalId+'" attr_district_name="'+result[i].districtName+'" attr_loc_name="'+result[i].mandalName+'" attr_mandal_name="'+result[i].mandalName+'" attr_level_type="'+locationTypeVal+'"style = "cursor:pointer;">'+result[i].mandalName+'</a></td>';
					}
					if(result[i].totalGps !=null && result[i].totalGps>0){
						str+='<td>'+result[i].totalGps+'</td>';
					}else{
						str+='<td> - </td>';
					}
					/* if(result[i].zeroStarCunt !=null && result[i].zeroStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="0star"  class="starRatingClikCls" style="cursor:pointer;">'+result[i].zeroStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].zeroStarPerc !=null && result[i].zeroStarPerc>0){
						str+='<td>'+result[i].zeroStarPerc+'</td>';;
					}else{
						str+='<td> - </td>';
					} */
					if(result[i].oneStarCunt !=null && result[i].oneStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="1star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].oneStarCunt+'</a></td>';;
					}else{
						str+='<td> - </td>';
					}
					if(result[i].oneStarPerc !=null && result[i].oneStarPerc>0){
						str+='<td>'+result[i].oneStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].twoStarCunt !=null && result[i].twoStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="2star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].twoStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].twoStarPerc !=null && result[i].twoStarPerc>0){
						str+='<td>'+result[i].twoStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].threeStarCunt !=null && result[i].threeStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="3star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].threeStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].threeStarPerc !=null && result[i].threeStarPerc>0){
						str+='<td>'+result[i].threeStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].fourStarCunt !=null && result[i].fourStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="4star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].fourStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].fourStarPerc !=null && result[i].fourStarPerc>0){
						str+='<td>'+result[i].fourStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].fiveStarCunt !=null && result[i].fiveStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="5star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].fiveStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].fiveStarPerc !=null && result[i].fiveStarPerc>0){
						str+='<td>'+result[i].fiveStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].sixStarCunt !=null && result[i].sixStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="6star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].sixStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].sixStarPerc !=null && result[i].sixStarPerc>0){
						str+='<td>'+result[i].sixStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].sevenStarCunt !=null && result[i].sevenStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="7star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].sevenStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].sevenStarPerc !=null && result[i].sevenStarPerc>0){
						str+='<td>'+result[i].sevenStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].eightStarCunt !=null && result[i].eightStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="8star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].eightStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].eightStarPerc !=null && result[i].eightStarPerc>0){
						str+='<td>'+result[i].eightStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].nineStarCunt !=null && result[i].nineStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="9star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].nineStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].nineStarPerc !=null && result[i].nineStarPerc>0){
						str+='<td>'+result[i].nineStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					if(result[i].tenStarCunt !=null && result[i].tenStarCunt>0){
						str+='<td><a attr_level_type="'+locationTypeVal+'" attr_star_rating="10star" class="starRatingClikCls" style="cursor:pointer;">'+result[i].tenStarCunt+'</a></td>';
					}else{
						str+='<td> - </td>';
					}					if(result[i].tenStarPerc !=null && result[i].tenStarPerc>0){
						str+='<td>'+result[i].tenStarPerc+'</td>';
					}else{
						str+='<td> - </td>';
					}
					
				str+='</tr>';
				}
			str+='</tbody>';
		str+='</table>';
		str+='</div>';	
		if(locationTypeVal == "panchayat"){
			FixedCols = 4;
		}else if(locationTypeVal == "mandal"){
			FixedCols = 3;
		}else if(locationTypeVal == "constituency"){
			FixedCols = 2;
		}else{
			FixedCols = 1;
		}
			
	$("#locationWiseStarRating"+locationTypeVal).html(str);
	$("#tenStar"+""+locationTypeVal).trigger("click");
	 $("#dataTableStarRating"+locationTypeVal).dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],
			"scrollX":        true,		
			//"scrollCollapse": true,		
			"fixedColumns":   {
				"leftColumns": FixedCols,
			},
			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   "10starRating "+locationTypeVal,
				filename:  "10starRating "+locationTypeVal+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
		}); 			
		$(".DTFC_LeftBodyLiner").css({
			"overflow-x":"hidden",
			"overflow-y":"hidden",
			"top": "-11px"
		});
		setTimeout(function(){ 
			$("#tenStar"+""+locationTypeVal).trigger("click");	
		}, 500);
	
}

$(document).on("click",".locationWiseComponentCls",function(){
	var districtId = $(this).attr("attr_district_id");
	var districtName = $(this).attr("attr_district_name");
	var constituencyName = $(this).attr("attr_constituency_name");
	var mandalName = $(this).attr("attr_mandal_name");
	var levelType = $(this).attr("attr_level_type");
	
	$("#componentModalPopup").modal("show");
	if(levelType == "district"){
		$("#modalHeadingId").html(districtName+" "+ levelType+" Level Components -% of Achivement");
	}else if(levelType == "constituency"){
		$("#modalHeadingId").html(districtName+" (District) "+constituencyName+" Level Components -% of Achivement");
	}else if(levelType == "mandal"){
		$("#modalHeadingId").html(districtName+" (District)  "+mandalName+" Mandal Level Components -% of Achivement");
	}
	buildComponentWisePopupDetails(districtId,levelType);
});

function buildComponentWisePopupDetails(districtId,levelType){
	var mainglobalResults=[];
	if(levelType == "district"){
		mainglobalResults=[];
		mainglobalResults = globalDistrictData;
	}else if(levelType == "constituency"){
		mainglobalResults=[];
		mainglobalResults = globalConstituencyData;
	}else if(levelType == "mandal"){
		mainglobalResults=[];
		mainglobalResults = globalMandalData;
	}
	//console.log(mainglobalResults)
	var str='';
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_custom_SC" id="componentWiseDataTableDistrict" style="width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="2">Components</th>';
					for(var i in mainglobalResults[0].subList[0].subList){
						str+='<th colspan="2">'+mainglobalResults[0].subList[0].subList[i].percName+'</th>';
					}
				str+='</tr>';
				str+='<tr>';
					for(var i in mainglobalResults[0].subList[0].subList){
						str+='<th>Count</th>';
						str+='<th>%</th>';
					}
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in mainglobalResults){
					if(levelType == "district"){
							if(mainglobalResults[i].districtId == districtId){
								for(var j in mainglobalResults[i].subList){
									str+='<tr>';
										str+='<td style="text-align:left !important;">'+mainglobalResults[i].subList[j].componentName+'</td>';
										for(var k in mainglobalResults[i].subList[j].subList){
											if(mainglobalResults[i].subList[j].subList[k].percentage !=null && mainglobalResults[i].subList[j].subList[k].percentage>0){
												str+='<td>'+mainglobalResults[i].subList[j].subList[k].villageCount+'</td>';
												str+='<td>'+mainglobalResults[i].subList[j].subList[k].percentage+'</td>';
											}else{
												str+='<td> - </td>';
												str+='<td> - </td>';
											}
											
										}
									str+='</tr>';
								}
								
							}
						}else if(levelType == "constituency"){
							if(mainglobalResults[i].constituencyId == districtId){
								for(var j in mainglobalResults[i].subList){
									str+='<tr>';
										str+='<td style="text-align:left !important;">'+mainglobalResults[i].subList[j].componentName+'</td>';
										for(var k in mainglobalResults[i].subList[j].subList){
											if(mainglobalResults[i].subList[j].subList[k].percentage !=null && mainglobalResults[i].subList[j].subList[k].percentage>0){
												str+='<td>'+mainglobalResults[i].subList[j].subList[k].villageCount+'</td>';
												str+='<td>'+mainglobalResults[i].subList[j].subList[k].percentage+'</td>';
											}else{
												str+='<td> - </td>';
												str+='<td> - </td>';
											}
										}
									str+='</tr>';
								}
							
							}
						}else if(levelType == "mandal"){
							if(mainglobalResults[i].mandalId == districtId){
								for(var j in mainglobalResults[i].subList){
									str+='<tr>';
										str+='<td style="text-align:left !important;">'+mainglobalResults[i].subList[j].componentName+'</td>';
										for(var k in mainglobalResults[i].subList[j].subList){
											if(mainglobalResults[i].subList[j].subList[k].percentage !=null && mainglobalResults[i].subList[j].subList[k].percentage>0){
												str+='<td>'+mainglobalResults[i].subList[j].subList[k].villageCount+'</td>';
												str+='<td>'+mainglobalResults[i].subList[j].subList[k].percentage+'</td>';
											}else{
												str+='<td> - </td>';
												
												str+='<td> - </td>';
											}
										}
									str+='</tr>';
								}
							
							}
						}
					}
				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#componentWiseDetailsDivId").html(str);
	 $("#componentWiseDataTableDistrict").dataTable({
		"paging":   false,
		"info":     false,
		"searching": true,
		"autoWidth": false
	}); 
}
function buildPanchayatLevelsWiseDetails(result,locationTypeVal){	
	var str='';
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_custom_SC" id="dataTableStarRating'+locationTypeVal+'">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Constituency</th>';
					str+='<th>Mandal</th>';
					str+='<th>Panchayat</th>';
					//str+='<th>Rating</th>';
					str+='<th>IHHL</th>';
					str+='<th>Health</th>';
					str+='<th>HouseIncome</th>';
					str+='<th>Education</th>';
					str+='<th>Electricity</th>';
					str+='<th>LPG</th>';
					str+='<th>Water Tap</th>';
					str+='<th>SWM</th>';
					str+='<th>Roads</th>';
					str+='<th>Fiber</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				for(var i in result){
					str+='<tr>';
						str+='<td>'+result[i].constituencyName+'</td>';
						str+='<td>'+result[i].mandalName+'</td>';
						str+='<td>'+result[i].panchayatName+'</td>';
						//str+='<td><span class="roundCircle color_white" style="background-color:#F26565">1</span></td>';
						str+='<td>'+result[i].ihhlCunt+'</td>';
						str+='<td>'+result[i].healthCunt+'</td>';
						str+='<td>'+result[i].houseIncomeCunt+'</td>';
						str+='<td>'+result[i].educationCunt+'</td>';
						str+='<td>'+result[i].electricityCunt+'</td>';
						str+='<td>'+result[i].lPGCunt+'</td>';
						str+='<td>'+result[i].waterTapCunt+'</td>';
						str+='<td>'+result[i].sWMCunt+'</td>';
						str+='<td>'+result[i].roadsCunt+'</td>';
						str+='<td>'+result[i].fiberCunt+'</td>';
					str+='</tr>';
				}
				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#locationWiseStarRating"+locationTypeVal).html(str);
	 $("#dataTableStarRating"+locationTypeVal).dataTable({
		"iDisplayLength": 10,
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
				title:	   "10starRating "+locationTypeVal,
				filename:  "10starRating "+locationTypeVal+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	}); 
}
$(document).on("click",".starRatingClikCls",function(){
	var rating=$(this).attr('attr_star_rating');
	var locId=$(this).closest('td').closest('tr').find('.locationWiseComponentCls').attr('attr_district_id');
	var locationName=$(this).closest('td').closest('tr').find('.locationWiseComponentCls').attr('attr_loc_name');
	var locationType=$(this).attr('attr_level_type');
	//alert(locationType+"locationType"+rating+"rating"+"locId"+locId);
	$("#ratingWiseModelDetailsDivId").html('');
	getVillageDetailsForClick(locationType,locId,null,null,null,rating,locationName+" "+locationType+" Level Wise Details");
	
});
$(document).on("click",".componentWiseClckCls",function(){
	var componentName=$(this).attr('attr_component_name');
	var fromRange=$(this).attr('attr_from_range');
	var toRange=$(this).attr('attr_to_range');
	//alert(locationType+"locationType"+rating+"rating"+"locId"+locId);
	//$("#ratingWiseModelHeadingId").html("Component Wise Over View");
	$("#ratingWiseModelDetailsDivId").html('');
	getVillageDetailsForClick(null,null,componentName,fromRange,toRange,null,"ComponentName");
	
});
function getVillageDetailsForClick(locationType,locId,componentName,fromRange,toRange,rating,locationName){
	if(componentName!=null){
			$("#ratingWiseModelHeadingId").html(componentName+" Component Wise Details");
	}
	else{
		$("#ratingWiseModelHeadingId").html(locationName.toUpperCase());
	}
	$("#ratingWiseModalPopup").modal('show');
	$("#ratingWiseModelDetailsDivId").html(spinner);
	var json={
		"locationType":locationType,
		"locationId":locId,
		"componentName":componentName,
		"fromRange":fromRange,
		"toRange":toRange,
		"rating":rating
	}
	$.ajax({
		type:'POST',
		url:'getVillageDetailsForClick',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		 if(result !=null && result!='' && result.length>0){
			 buildingVillageDetailsForClick(result);
			}else{
			$("#ratingWiseModelDetailsDivId").html("No Data");
		 }
	})
}
function buildingVillageDetailsForClick(result){
	var str='';
		str='<div class="table-responsive">';
			str+='<table class="table table-bordered" id="starRatingWisePopupDataTabCls">';
				str+='<thead>';
					str+='<tr>';
						str+='<th class="text-center"`>District</th>';
						str+='<th class="text-center">Constituency</th>';
						str+='<th class="text-center">Mandal</th>';
						str+='<th class="text-center">Panchayat</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i  in result){
						str+='<tr>';
							str+='<td attr_id="'+result[i].districtId+'" style="text-align:left !important;">'+result[i].districtName+'</td>';
							str+='<td attr_id="'+result[i].constituencyId+'" style="text-align:left !important;">'+result[i].constituencyName+'</td>';
							str+='<td attr_id="'+result[i].mandalId+'" style="text-align:left !important;">'+result[i].mandalName+'</td>';
							str+='<td attr_id="'+result[i].panchayatId+'" style="text-align:left !important;">'+result[i].panchayatName+'</td>';
						str+='</tr>';	
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
	$("#ratingWiseModelDetailsDivId").html(str);
	$("#starRatingWisePopupDataTabCls").dataTable({
		"iDisplayLength": 15,
		"aaSorting": [],
		"aLengthMenu": [[ 15, 30,50, -1], [ 15, 30,50, "All"]],
		/* "dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>", */
		
	}); 
	
}
$(document).on("click",".starWiseCompareCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");	
	if(type == "byDefault"){
		$("#defaultTabCls").show();
		getDistrictWiseComponentsAchivement();
	}else if(type =="starWise"){
		$("#defaultTabCls").hide();
		getDistrictWiseComparativeReport();
	}else if(type =="componentWise"){
		getDistrictWiseComponentsComparativeReport();
		$("#defaultTabCls").hide();
	}
});
$(document).on('click','input[name="defaultRadio"]',function(){
	var value = $('input[name="defaultRadio"]:checked').val();
	if(value == "count"){
		$(".perView").hide();
		$(".countView").show();		
	}else{
		$(".countView").hide();
		$(".perView").show();
	}
});
function getDistrictWiseComparativeReport(){
	$("#districtWiseComponentWiseRatingDivId").html(spinner);
	var json={
		
	}
	$.ajax({
		type:'GET',
		url:'getDistrictWiseComparativeReport',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		  if(result !=null){
			buildDistrictWiseComparativeReport(result);
		  }else{
			  $("#districtWiseComponentWiseRatingDivId").html("No Data Available");
		  }
	})
}
function buildDistrictWiseComparativeReport(result){		
	var str='';	
	str+='<div class="col-sm-12">';		
	str+='<div class="table-responsive m_top30">';
		str+='<table class="table table-bordered table_custom_SC" id="dataTableStarWise" style="width:100%;border:1px solid lightgrey !important;">';
			str+='<thead style="background-color: #f2f2f2 !important;">';
				str+='<tr>';
						str+='<th rowspan="2">District</th>';
						str+='<th rowspan="2">Total Mandals</th>';
						str+='<th rowspan="2">Total Panchayats</th>';
						str+='<th colspan="2">Average Rating</th>';
						for(var i =1; i<=10; i++){						
							str+='<th colspan="2"><span class="roundCircle color_white" style="background-color:'+globalStatusBackGroundObj[i]+'">'+i+'</span></th>';							
						}					
				str+='</tr>';	
				str+='<tr>';
					str+='<th>Previous Month</th>';
					str+='<th>Current Month</th>';
					for(var i =1; i<=10; i++){
						str+='<th>Previous Month</th>';
						str+='<th>Current Month</th>';
					}
				str+='</tr>';	
			str+='</thead>';
			str+='<tbody>';				
				for(var i in result.subList){
					str+='<tr>';
						if(result.subList[i].name != null && typeof result.subList[i].name != "undefined"){
							str+='<td class="odf_FixedCol" style="text-align: left !important;">'+result.subList[i].name+'</td>';
						}else{
							str+='<tdclass="odf_FixedCol" >-</td>';
						}
						if(result.subList[i].totalMandals != null && result.subList[i].totalMandals > 0){
							str+='<td>'+result.subList[i].totalMandals+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].totalPanchayats != null && result.subList[i].totalPanchayats > 0){
							str+='<td>'+result.subList[i].totalPanchayats+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].prevMonth != null && result.subList[i].prevMonth > 0){
							str+='<td>'+result.subList[i].prevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].currentMonth != null && result.subList[i].currentMonth > 0){
							str+='<td>'+result.subList[i].currentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].oneStarGpCountPrevMonth != null && result.subList[i].oneStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].oneStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].oneStarGpCountCurrentMonth != null && result.subList[i].oneStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].oneStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].twoStarGpCountPrevMonth != null && result.subList[i].twoStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].twoStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].twoStarGpCountCurrentMonth != null && result.subList[i].twoStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].twoStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].threeStarGpCountPrevMonth != null && result.subList[i].threeStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].threeStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].threeStarGpCountCurrentMonth != null && result.subList[i].threeStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].threeStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].fourStarGpCountPrevMonth != null && result.subList[i].fourStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].fourStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].fourStarGpCountCurrentMonth != null && result.subList[i].fourStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].fourStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].fiveStarGpCountPrevMonth != null && result.subList[i].fiveStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].fiveStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].fiveStarGpCountCurrentMonth != null && result.subList[i].fiveStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].fiveStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].sixStarGpCountPrevMonth != null && result.subList[i].sixStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].sixStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].sixStarGpCountCurrentMonth != null && result.subList[i].sixStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].sixStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].sevenStarGpCountPrevMonth != null && result.subList[i].sevenStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].sevenStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].sevenStarGpCountCurrentMonth != null && result.subList[i].sevenStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].sevenStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].eightStarGpCountPrevMonth != null && result.subList[i].eightStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].eightStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].eightStarGpCountCurrentMonth != null && result.subList[i].eightStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].eightStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].nineStarGpCountPrevMonth != null && result.subList[i].nineStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].nineStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].nineStarGpCountCurrentMonth != null && result.subList[i].nineStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].nineStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].tenStarGpCountPrevMonth != null && result.subList[i].tenStarGpCountPrevMonth > 0){
							str+='<td>'+result.subList[i].tenStarGpCountPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}												
						if(result.subList[i].tenStarGpCountCurrentMonth != null && result.subList[i].tenStarGpCountCurrentMonth > 0){
							str+='<td>'+result.subList[i].tenStarGpCountCurrentMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
					str+='</tr>';
				}
				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	str+='</div>';
	$("#districtWiseComponentWiseRatingDivId").html(str);
	$("#dataTableStarWise").dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],
			"scrollX":        true,		
			"scrollCollapse": true,		
			"fixedColumns":   {
				"leftColumns": 1,
			},
			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "10starRating star wise comparison",
					filename:  "10starRating star wise comparison"+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
	}); 			
	$(".DTFC_LeftBodyLiner").css({
		"overflow-x":"hidden",
		"overflow-y":"hidden",
		"top": "-11px"
	});
}
function getDistrictWiseComponentsComparativeReport(){
	$("#districtWiseComponentWiseRatingDivId").html(spinner);
	var json={
		
	}
	$.ajax({
		type:'GET',
		url:'getDistrictWiseComponentsComparativeReport',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		  if(result !=null){
			buildDistrictWiseComponentsComparativeReport(result);
		  }else{
			  $("#districtWiseComponentWiseRatingDivId").html("No Data Available");
		  }
	})
}
function buildDistrictWiseComponentsComparativeReport(result){	
	var componentArr=[{name: "ihhl"},{name: "electricity"},{name: "lpg"},{name: "water tap"},{name: "swm"},{name: "roads"},{name: "fiber"},{name: "House Income"},{name: "education"},{name: "health"}]
	var str='';
	str+='<div class="col-sm-12">';		
		str+='<div class="table-responsive m_top30">';
			str+='<table class="table table-bordered table_custom_SC" id="dataTableComponentWise" style="width:100%;border:1px solid lightgrey !important;">';
				str+='<thead style="background-color: #f2f2f2 !important;">';
					str+='<tr>';
							str+='<th rowspan="2">District</th>';							
							for(var i in componentArr){					
								str+='<th colspan="2">'+componentArr[i].name+'</th>';
							}					
					str+='</tr>';	
					str+='<tr>';						
						for(var i in componentArr){
							str+='<th>Previous Month</th>';
							str+='<th>Current Month</th>';
						}
					str+='</tr>';	
				str+='</thead>';
				str+='<tbody>';
				for(var i in result.subList){
					str+='<tr>';
						if(result.subList[i].name != null && typeof result.subList[i].name != "undefined"){
							str+='<td class="odf_FixedCol" style="text-align: left !important;">'+result.subList[i].name+'</td>';
						}else{
							str+='<td class="odf_FixedCol" >-</td>';
						}
						if(result.subList[i].ihhlPrevMonth != null && result.subList[i].ihhlPrevMonth > 0){
							str+='<td>'+result.subList[i].ihhlPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].ihhlCunt != null && result.subList[i].ihhlCunt > 0){
							str+='<td>'+result.subList[i].ihhlCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].electricityprevMonth != null && result.subList[i].electricityprevMonth > 0){
							str+='<td>'+result.subList[i].electricityprevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].electricityCunt != null && result.subList[i].electricityCunt > 0){
							str+='<td>'+result.subList[i].electricityCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].gasPrevMonth != null && result.subList[i].gasPrevMonth > 0){
							str+='<td>'+result.subList[i].gasPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].lPGCunt != null && result.subList[i].lPGCunt > 0){
							str+='<td>'+result.subList[i].lPGCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].privateTapPrevMonth != null && result.subList[i].privateTapPrevMonth > 0){
							str+='<td>'+result.subList[i].privateTapPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].waterTapCunt != null && result.subList[i].waterTapCunt > 0){
							str+='<td>'+result.subList[i].waterTapCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].swmPrevMonth != null && result.subList[i].swmPrevMonth > 0){
							str+='<td>'+result.subList[i].swmPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].sWMCunt != null && result.subList[i].sWMCunt > 0){
							str+='<td>'+result.subList[i].sWMCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].roadPrevMonth != null && result.subList[i].roadPrevMonth > 0){
							str+='<td>'+result.subList[i].roadPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].roadsCunt != null && result.subList[i].roadsCunt > 0){
							str+='<td>'+result.subList[i].roadsCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].fibernatePrevMonth != null && result.subList[i].fibernatePrevMonth > 0){
							str+='<td>'+result.subList[i].fibernatePrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].fiberCunt != null && result.subList[i].fiberCunt > 0){
							str+='<td>'+result.subList[i].fiberCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].hH10KPrevMonth != null && result.subList[i].hH10KPrevMonth > 0){
							str+='<td>'+result.subList[i].hH10KPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].houseIncomeCunt != null && result.subList[i].houseIncomeCunt > 0){
							str+='<td>'+result.subList[i].houseIncomeCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].educationPrevMonth != null && result.subList[i].educationPrevMonth > 0){
							str+='<td>'+result.subList[i].educationPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].educationCunt != null && result.subList[i].educationCunt > 0){
							str+='<td>'+result.subList[i].educationCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].healthPrevMonth != null && result.subList[i].healthPrevMonth > 0){
							str+='<td>'+result.subList[i].healthPrevMonth+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result.subList[i].healthCunt != null && result.subList[i].healthCunt > 0){
							str+='<td>'+result.subList[i].healthCunt+'</td>';
						}else{
							str+='<td>-</td>';
						}
					str+='</tr>';
				}
				str+='</tbody>';	
			str+='</table>';	
		str+='</div>';	
	str+='</div>';
	$("#districtWiseComponentWiseRatingDivId").html(str);
	$("#dataTableComponentWise").dataTable({
			"iDisplayLength": 15,
			"aaSorting": [],
			"aLengthMenu": [[15,30,50, -1], [15,30,50, "All"]],
			"scrollX":        true,		
			"scrollCollapse": true,		
			"fixedColumns":   {
				"leftColumns": 1,
			},
			
			"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			buttons: [
				{
					extend:    'csvHtml5',
					text:      '<i class="fa fa-file-text-o"></i>',
					titleAttr: 'CSV',
					title:	   "10starRating component wise comparison",
					filename:  "10starRating component wise comparison"+moment().format("DD/MMMM/YYYY  HH:MM"),
				}
			]
	}); 			
	$(".DTFC_LeftBodyLiner").css({
		"overflow-x":"hidden",
		"overflow-y":"hidden",
		"top": "-11px"
	});
	 
}