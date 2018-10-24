function loadCharts() {
	loadLineChart();
	loadPieChart();
	loadDynamicChart();
	loadBarGraph();
}

function loadLineChart() {
	var offset = 0;
	var sin = [], cos = [];
	for (var i = 0; i < 12; i += 0.2) {
		sin.push([ i, Math.sin(i + offset) ]);
		cos.push([ i, Math.cos(i + offset) ]);
	}

	var options = {
		series : {
			lines : {
				show : true
			},
			points : {
				show : true
			}
		},
		grid : {
			hoverable : true
		// IMPORTANT! this is needed for tooltip to work
		},
		yaxis : {
			min : -1.2,
			max : 1.2
		},
		tooltip : true,
		tooltipOpts : {
			content : "'%s' of %x.1 is %y.4",
			shifts : {
				x : -60,
				y : 25
			}
		}
	};

	var plotObj = $.plot($("#flot-line-chart"), [ {
		data : sin,
		label : "sin(x)"
	}, {
		data : cos,
		label : "cos(x)"
	} ], options);
}

function loadPieChart() {
	var data = [ {
		label : "Series 0",
		data : 1
	}, {
		label : "Series 1",
		data : 3
	}, {
		label : "Series 2",
		data : 9
	}, {
		label : "Series 3",
		data : 20
	} ];

	var plotObj = $.plot($("#flot-pie-chart"), data, {
		series : {
			pie : {
				show : true
			}
		},
		grid : {
			hoverable : true
		},
		tooltip : true,
		tooltipOpts : {
			content : "%p.0%, %s", // show percentages, rounding to 2 decimal
			// places
			shifts : {
				x : 20,
				y : 0
			},
			defaultTheme : false
		}
	});
}

function loadDynamicChart() {
	var container = $("#flot-moving-line-chart");

	// Determine how many data points to keep based on the placeholder's initial
	// size;
	// this gives us a nice high-res plot while avoiding more than one point per
	// pixel.

	var maximum = container.outerWidth() / 2 || 300;

	//

	var data = [];

	function getRandomData() {

		if (data.length) {
			data = data.slice(1);
		}

		while (data.length < maximum) {
			var previous = data.length ? data[data.length - 1] : 50;
			var y = previous + Math.random() * 10 - 5;
			data.push(y < 0 ? 0 : y > 100 ? 100 : y);
		}

		// zip the generated y values with the x values

		var res = [];
		for (var i = 0; i < data.length; ++i) {
			res.push([ i, data[i] ])
		}

		return res;
	}

	//

	series = [ {
		data : getRandomData(),
		lines : {
			fill : true
		}
	} ];

	//

	var plot = $
			.plot(
					container,
					series,
					{
						grid : {
							borderWidth : 1,
							minBorderMargin : 20,
							labelMargin : 10,
							backgroundColor : {
								colors : [ "#fff", "#e4f4f4" ]
							},
							margin : {
								top : 8,
								bottom : 20,
								left : 20
							},
							markings : function(axes) {
								var markings = [];
								var xaxis = axes.xaxis;
								for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
									markings.push({
										xaxis : {
											from : x,
											to : x + xaxis.tickSize
										},
										color : "rgba(232, 232, 255, 0.2)"
									});
								}
								return markings;
							}
						},
						xaxis : {
							tickFormatter : function() {
								return "";
							}
						},
						yaxis : {
							min : 0,
							max : 110
						},
						legend : {
							show : true
						}
					});

	// Update the random dataset at 25FPS for a smoothly-animating chart

	setInterval(function updateRandom() {
		series[0].data = getRandomData();
		plot.setData(series);
		plot.draw();
	}, 40);
}

function loadBarGraph() {
    var barOptions = {
            series: {
                bars: {
                    show: true,
                    barWidth: 43200000
                }
            },
            xaxis: {
                mode: "time",
                timeformat: "%m/%d",
                minTickSize: [1, "day"]
            },
            grid: {
                hoverable: true
            },
            legend: {
                show: false
            },
            tooltip: true,
            tooltipOpts: {
                content: "x: %x, y: %y"
            }
        };
        var barData = {
            label: "bar",
            data: [
                [1354521600000, 1000],
                [1355040000000, 2000],
                [1355223600000, 3000],
                [1355306400000, 4000],
                [1355487300000, 5000],
                [1355571900000, 6000]
            ]
        };
        $.plot($("#flot-bar-chart"), barData, barOptions);
}

function loadMorrisChartData() {
	// Area Chart
	Morris.Area({
		element : 'morris-area-chart',
		data : [ {
			period : '2010 Q1',
			iphone : 2666,
			ipad : null,
			itouch : 2647
		}, {
			period : '2010 Q2',
			iphone : 2778,
			ipad : 2294,
			itouch : 2441
		}, {
			period : '2010 Q3',
			iphone : 4912,
			ipad : 1969,
			itouch : 2501
		}, {
			period : '2010 Q4',
			iphone : 3767,
			ipad : 3597,
			itouch : 5689
		}, {
			period : '2011 Q1',
			iphone : 6810,
			ipad : 1914,
			itouch : 2293
		}, {
			period : '2011 Q2',
			iphone : 5670,
			ipad : 4293,
			itouch : 1881
		}, {
			period : '2011 Q3',
			iphone : 4820,
			ipad : 3795,
			itouch : 1588
		}, {
			period : '2011 Q4',
			iphone : 15073,
			ipad : 5967,
			itouch : 5175
		}, {
			period : '2012 Q1',
			iphone : 10687,
			ipad : 4460,
			itouch : 2028
		}, {
			period : '2012 Q2',
			iphone : 8432,
			ipad : 5713,
			itouch : 1791
		} ],
		xkey : 'period',
		ykeys : [ 'iphone', 'ipad', 'itouch' ],
		labels : [ 'iPhone', 'iPad', 'iPod Touch' ],
		pointSize : 2,
		hideHover : 'auto',
		resize : true
	});

	// Donut Chart
	Morris.Donut({
		element : 'morris-donut-chart',
		data : [ {
			label : "Download Sales",
			value : 12
		}, {
			label : "In-Store Sales",
			value : 30
		}, {
			label : "Mail-Order Sales",
			value : 20
		} ],
		resize : true
	});

	// Line Chart
	Morris.Line({
		// ID of the element in which to draw the chart.
		element : 'morris-line-chart',
		// Chart data records -- each entry in this array corresponds to a point
		// on
		// the chart.
		data : [ {
			d : '2012-10-01',
			visits : 802
		}, {
			d : '2012-10-02',
			visits : 783
		}, {
			d : '2012-10-03',
			visits : 820
		}, {
			d : '2012-10-04',
			visits : 839
		}, {
			d : '2012-10-05',
			visits : 792
		}, {
			d : '2012-10-06',
			visits : 859
		}, {
			d : '2012-10-07',
			visits : 790
		}, {
			d : '2012-10-08',
			visits : 1680
		}, {
			d : '2012-10-09',
			visits : 1592
		}, {
			d : '2012-10-10',
			visits : 1420
		}, {
			d : '2012-10-11',
			visits : 882
		}, {
			d : '2012-10-12',
			visits : 889
		}, {
			d : '2012-10-13',
			visits : 819
		}, {
			d : '2012-10-14',
			visits : 849
		}, {
			d : '2012-10-15',
			visits : 870
		}, {
			d : '2012-10-16',
			visits : 1063
		}, {
			d : '2012-10-17',
			visits : 1192
		}, {
			d : '2012-10-18',
			visits : 1224
		}, {
			d : '2012-10-19',
			visits : 1329
		}, {
			d : '2012-10-20',
			visits : 1329
		}, {
			d : '2012-10-21',
			visits : 1239
		}, {
			d : '2012-10-22',
			visits : 1190
		}, {
			d : '2012-10-23',
			visits : 1312
		}, {
			d : '2012-10-24',
			visits : 1293
		}, {
			d : '2012-10-25',
			visits : 1283
		}, {
			d : '2012-10-26',
			visits : 1248
		}, {
			d : '2012-10-27',
			visits : 1323
		}, {
			d : '2012-10-28',
			visits : 1390
		}, {
			d : '2012-10-29',
			visits : 1420
		}, {
			d : '2012-10-30',
			visits : 1529
		}, {
			d : '2012-10-31',
			visits : 1892
		}, ],
		// The name of the data record attribute that contains x-visitss.
		xkey : 'd',
		// A list of names of data record attributes that contain y-visitss.
		ykeys : [ 'visits' ],
		// Labels for the ykeys -- will be displayed when you hover over the
		// chart.
		labels : [ 'Visits' ],
		// Disables line smoothing
		smooth : false,
		resize : true
	});

	// Bar Chart
	Morris.Bar({
		element : 'morris-bar-chart',
		data : [ {
			device : 'iPhone',
			geekbench : 136
		}, {
			device : 'iPhone 3G',
			geekbench : 137
		}, {
			device : 'iPhone 3GS',
			geekbench : 275
		}, {
			device : 'iPhone 4',
			geekbench : 380
		}, {
			device : 'iPhone 4S',
			geekbench : 655
		}, {
			device : 'iPhone 5',
			geekbench : 1571
		} ],
		xkey : 'device',
		ykeys : [ 'geekbench' ],
		labels : [ 'Geekbench' ],
		barRatio : 0.4,
		xLabelAngle : 35,
		hideHover : 'auto',
		resize : true
	});
}