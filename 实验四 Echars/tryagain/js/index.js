//大模块
// 左模块一
(function(){
  var myChart = echarts.init(document.querySelector('.line .chart'));
  //指定配置项和数据
    data = [{
        name: '水象',
        value: 25,
        },
        {
            name: '火象',
            value: 25,
        },
        {
            name: '土象',
            value: 18,
        },
        {
            name: '风象',
            value: 31,
        }
    ];
    getArrByKey = (data, k) => {
        let key = k || "value";
        let res = [];
        if (data) {
            data.forEach(function(t) {
                res.push(t[key]);
            });
        }
        return res;
    };
    getSymbolData = (data) => {
        let arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push({
                value: data[i].value,
                symbolPosition: 'end'
            })
        }
        return arr;
    }
    var option = {
        grid: {
            top: '2%',
            bottom: -15,
            right: 100,
            left: 50,
            containLabel: true
        },
        xAxis: {
            show: false
        },
        yAxis: [{
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, 'name'),
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            
            axisLabel: {
                show: true,
                interval: 0,
                color: '#fff',
                align: 'left',
                margin: 60,
                formatter: function(value, index) {
                    return '{title|' + value + '}'
                },
                rich: {
                    title: {
                        width: 50,
                        align:'right',
                        fontSize:18
                    }
                }
            },
        }, {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, 'name'),
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                shadowOffsetX: '-20px',
                color: ['#fff'],
                align: 'left',
                verticalAlign: 'center',
                lineHeight: 40,
                fontSize: 18,
                formatter: function(value, index) {
                    return data[index].value
                },
                
            }
        }],
        series: [{
            name: 'XXX',
            type: 'pictorialBar',
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==',
            symbolSize: [50, 50],
            symbolOffset: [20, 0],
            z: 12,
            itemStyle: {
                normal: {
                    color: '#fff'
                }
            },
            data: getSymbolData(data)
        }, {
            name: '条',
            type: 'bar',
            showBackground: true,
            // barBorderRadius: 30,
            yAxisIndex: 0,
            data: data,
            barWidth: 10,
            // align: left,
            itemStyle: {
                normal: {
                    color: "rgba(41, 162, 245, 1)",
                    // barBorderRadius: 10
                },
                // color: '#A71A2B',
                // barBorderRadius: 4,
            },
            // label: {
            //     normal: {
            //         color: '#fff',
            //         show: true,
            //         position: ["-80px", 0],
            //         textStyle: {
            //             fontSize: 16
            //         },
            //         formatter: function(a, b) {
            //             return a.name
            //         }
            //     }
            // }
        }]
    };
    //将配置项给实例化对象
    myChart.setOption(option);
        // 自适应屏幕
    window.addEventListener('resize',function(){
            myChart.resize();
        })
})();
//中模块一
(function(){
    var myChart = echarts.init(document.querySelector('.pie1 .chart'));
    var colorList = ['#03acd1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'];
    var option = {
        tooltip: {
            trigger: 'item'
        },
        series: [{
            type: 'pie',
            center: ['47%', '28%'],
            radius: ['25%', '40%'],
            minAngle: 10 ,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
                color: (params) => {
                    return colorList[params.dataIndex]
                }
            },
            label: {
                show: true,
                position: 'outer',
                alignTo: 'labelLine',
                // ·圆点
                backgroundColor: 'auto',//圆点颜色，auto：映射的系列色
                height: 0,
                width: 0,
                lineHeight: 0,
                // height,width.lineHeight必须为0
                distanceToLabelLine: 0,//圆点到labelline距离
                borderRadius: 2.5,
                padding: [2.5, -2.5, 2.5, -2.5],
                formatter: '{a|{b}：}{b|{d}%}',
                rich: {
                    a: {
                        padding: [0, 0, 0, 10]
                    },
                    b: {
                        padding: [0, 10, 0, 0]
                    }
                }
            },
            data: [
                {
                    name: '金牛',
                    value: 1
                }, {
                    name: '天蝎',
                    value: 4
                }, {
                    name: '摩羯',
                    value: 3
                }, {
                    name: '双鱼',
                    value: 7
                },{
                    name:'处女',
                    value:1
                }]
        }, {
            type: 'pie',
            center: ['73%', '77%'],
            radius: ['25%', '40%'],
            minAngle: 10,
            avoidLabelOverlap: true,
            roseType: 'radius',
            hoverOffset: 15,
            itemStyle: {
                color: (params) => {
                    return colorList[params.dataIndex]
                }
            },
            label: {
                show: true,
                position: 'outer',
                width:0,
                height: 0,
                lineHeight: 0,
                backgroundColor: 'auto',
                padding: [2,-2,2,-2],
                borderRadius: 2,
                distanceToLabelLine: 0,
                formatter: '{top|{b}}\n{bottom|{d}%}',
                align: 'center',
                rich: {
                    top: {
                        verticalAlign: 'bottom',
                        padding: [10, 10, 0, 10],
                        align: 'center'
                    },
                    bottom: {
                        padding: [0, 10, 10, 10],
                        verticalAlign: 'top',
                        align: 'center'
                    }
                }
            },
            data: [
                {
                name: '白羊',
                value: 3
            },{
                name: '射手',
                value: 2
            },{
                name: '天秤',
                value: 5
            },{
                name: '水瓶',
                value: 4
            }]
        }]
    };
    //将配置项给实例化对象
    myChart.setOption(option);
    // 自适应屏幕
    window.addEventListener('resize',function(){
            myChart.resize();
        })
})();
//中模块二
(function(){
    var myChart = echarts.init(document.querySelector('.pie2 .chart'));
    let dashedPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC';
    let color = ['#FF8700', '#ffc300', '#00e473', '#009DFF'];
    let chartData = [{
            name: "风",
            value: 31,
            unit: '%'
        },
        {
            name: "土",
            value: 18,
            unit: '%'
        },
        {
            name: "火",
            value: 25,
            unit: '%'
        },
        {
            name: "水",
            value: 25,
            unit: '%'
        }
    ];
    let arrName = [];
    let arrValue = [];
    let sum = 0;
    let pieSeries = [],
        lineYAxis = [];
    
    // 数据处理
    chartData.forEach((v, i) => {
        arrName.push(v.name);
        arrValue.push(v.value);
        sum = sum + v.value;
    })
    
    // 图表option整理
    chartData.forEach((v, i) => {
        pieSeries.push({
            name: '元素',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
            center: ["42%", "35%"],
            label: {
                show: false
            },
            data: [{
                value: v.value,
                name: v.name
            }, {
                value: sum - v.value,
                name: '',
                itemStyle: {
                    color: "rgba(0,0,0,0)"
                }
            }]
        });
        pieSeries.push({
            name: '',
            type: 'pie',
            silent: true,
            z: 1,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [65 - i * 15 + '%',57 - i * 15 + '%'],
            center: ["42%", "35%"],
            label: {
                show: false
            },
            data: [{
                value: 7.5,
                itemStyle: {
                    color: "#E3F0FF"
                }
            }, {
                value: 2.5,
                name: '',
                itemStyle: {
                    color: "rgba(0,0,0,0)"
                }
            }]
        });
        v.percent = (v.value / sum * 100).toFixed(1) + "%";
        lineYAxis.push({
            value: i,
            textStyle: {
                rich: {
                    circle: {
                        color: color[i],
                        padding: [0, 5]
                    }
                }
            }
        });
    })
    var option = {
        color: color,
        grid: {
            top: '1%',
            bottom: '67%',
            left: "42%",
            containLabel: false
        },
        yAxis: [{
            type: 'category',
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                formatter: function(params) {
                    let item = chartData[params];
                    console.log(item)
                    return '{line|}{circle|●}{name|'+ item.name +'}{bd||}{percent|'+item.percent+'}{value|'+ item.value+'}{unit|%}'
                },
                interval: 0,
                inside: true,
                textStyle: {
                    color: "#333",
                    fontSize: 14,
                    rich: {
                        name: {
                            color: '#666',
                            fontSize: 14,
                        },
                        bd: {
                            color: '#ccc',
                            padding: [0, 5],
                            fontSize: 14,
                        },
                        percent:{
                            color: '#333',
                            fontSize: 14,
                        },
                        value: {
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 500,
                            padding: [0, 0, 0, 5]
                        },
                        unit: {
                            fontSize: 14
                        }
                    }
                },
                show: true
            },
            data: lineYAxis
        }],
        xAxis: [{
            show: false
        }],
        series: pieSeries
    };
    //将配置项给实例化对象
    myChart.setOption(option);
    // 自适应屏幕
    window.addEventListener('resize',function(){
            myChart.resize();
        })
})();
//中模块三
(function(){
    var myChart = echarts.init(document.querySelector('.pie3 .chart'));
    var dataAll = [43, 18, 37, 56, 43];
    var yAxisData = [];
	var option = {
	    title:[
	        {text:"本位固定变动元素占比",x: '2%', y: '1%',textStyle:{color:"#fff",fontSize:"12"}},
	        {text:"阴性阳性星座元素占比",x: '2%', y: '51%',textStyle:{color:"#fff",fontSize:"12"}},
	    ],
	    tooltip: {
	        formatter: '{b} ({c})'
	    },
	    xAxis: [
	        {gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},
	    ],
	    yAxis: [
            {  gridIndex: 0, interval:0,data:yAxisData.reverse(),
               axisTick: {show:false}, axisLabel: {show:true},splitLine: {show:false},
           }
       ],
	    series: [
	        {
	            name: '本位固定变动元素占比',
	            type: 'pie',
	            radius : '30%',
	            center: ['50%', '28%'],
	            color:['#86c9f4','#4da8ec','#3a91d2','#005fa6','#315f97'],
	            data:[
	                {value:43, name:'本位'},
	                {value:18, name:'固定'},
	                {value:37, name:'变动'},
	            ],
	            labelLine:{normal:{show:false}},
	            itemStyle: {normal: {label:{ show: true,  formatter: '{b} \n ({d}%)', textStyle:{color:'#B1B9D3'}} },},
	        },
	        {
	            name: '阴性阳性星座元素占比',
	            type: 'pie',
	            radius : '30%',
	            center: ['50%', '80%'],
	            color:['#86c9f4','#4da8ec','#3a91d2','#005fa6','#315f97'],
	            labelLine:{normal:{show:false}},
	            data:[
	                {value:43, name:'阳性'},
	                {value:56, name:'阴性'},
	            ],
	            itemStyle: {normal: {label:{ show: true,  formatter: '{b} \n ({d}%)', textStyle:{color:'#B1B9D3'}} },},
	        },
	        
	    ]
	};
    //将配置项给实例化对象
    myChart.setOption(option);
    // 自适应屏幕
    window.addEventListener('resize',function(){
            myChart.resize();
        })
})();
//右模块一
(function(){
    var myChart = echarts.init(document.querySelector('.line1 .chart'));
    //指定配置项和数据
      let xLabel = ['3.26', '3.27', '3.28', '3.29', '3.30', '3.31']
      let goToSchool = ["40", "60", "22", "85", "50", "40"]
      let goOutSchool = ["20", "50", "12", "65", "30", "60"]
  
      var option = {
          // backgroundColor: '#0e1c47',
          tooltip: {
              trigger: 'axis',
              backgroundColor:'transparent',
              axisPointer: {
                  lineStyle: {
                      color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                              offset: 0,
                              color: 'rgba(126,199,255,0)' // 0% 处的颜色
                          }, {
                              offset: 0.5,
                              color: 'rgba(126,199,255,1)' // 100% 处的颜色
                          }, {
                              offset: 1,
                              color: 'rgba(126,199,255,0)' // 100% 处的颜色
                          }],
                          global: false // 缺省为 false
                      }
                  },
              },
              formatter: (p) => {
                  let dom = `<div style="width: 79px;
          height: 50px;;color:#fff;position: relative;">
              <svg style="position: absolute;top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
          <defs>
              <style>
              .cls-1 {
                  fill: #07172c;
                  fill-opacity: 0.8;
                  stroke: #a7d8ff;
                  stroke-linejoin: round;
                  stroke-opacity: 0.2;
                  stroke-width: 1px;
                  fill-rule: evenodd;
              }
  
              </style>
          </defs>
          <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
              transform="translate(-258.5 -592.5)" />
          </svg>
              <div style="padding: 4px 8px 4px 14px;display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;position: relative;z-index: 1;">
                  <div style="margin-bottom: 4px;width:100%;display:${p[0]?'flex':'none'};justify-content:space-between;align-items:center;">
                      <span style="font-size:14px;color:#7ec7ff;">${p[0]?p[0].seriesName:''}</span>
                      <span style="font-size:14px;color:#fff;">${p[0]?p[0].data:''}</span>
                  </div>
                  <div style="width:100%;height:100%;display:${p[1]?'flex':'none'};justify-content:space-between;align-items:center;">
                      <span style="font-size:14px;color:#7ec7ff;">${p[1]?p[1].seriesName:''}</span>
                      <span style="font-size:14px;color:#fff;">${p[1]?p[1].data:''}</span>
                  </div>
              </div>
          </div>`
                  return dom
              }
          },
          legend: {
              align: "left",
              right: '8%',
              top:'8%',
              type:'plain',
              textStyle:{
                  color:'#7ec7ff',
                  fontSize:16
              },
              // icon:'rect',
              itemGap:25,
              itemWidth:18,
              icon:'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
  
              data: [
                  {
                      name: '认可'
                  },
                  {
                      name: '不认可'
                  }
              ]
          },
          grid: {
              top: '18%',
              left: '12%',
              right: '10%',
              bottom: '30%',
              // containLabel: true
          },
          xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLine: { //坐标轴轴线相关设置。数学上的x轴
                  show: true,
                  lineStyle: {
                      color: '#233653'
                  },
              },
              axisLabel: { //坐标轴刻度标签的相关设置
                  textStyle: {
                      color: '#7ec7ff',
                      padding: 5,
                      fontSize: 14
                  },
                  formatter: function(data) {
                      return data
                  }
              },
              splitLine: {
                  show: true,
                  lineStyle: {
                      color: '#192a44'
                  },
              },
              axisTick: {
                  show: false,
              },
              data: xLabel
          }],
          yAxis: [{
              name: '人数',
              nameTextStyle: {
                  color: "#7ec7ff",
                  fontSize: 16,
                  padding: 10
              },
              min: 0,
              splitLine: {
                  show: true,
                  lineStyle: {
                      color: '#192a44'
                  },
              },
              axisLine: {
                  show: true,
                  lineStyle: {
                      color: "#233653"
                  }
  
              },
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#7ec7ff',
                      padding: 10
                  },
                  formatter: function(value) {
                      if (value === 0) {
                          return value
                      }
                      return value
                  }
              },
              axisTick: {
                  show: false,
              },
          }],
          series: [{
              name: '认可',
              type: 'line',
              symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              symbolSize: 0,
              smooth: true,
              lineStyle: {
                  normal: {
                      width: 5,
                      color: "rgba(25,163,223,1)", // 线条颜色
                  },
                  borderColor: 'rgba(0,0,0,.4)',
              },
              itemStyle: {
                  color: "rgba(25,163,223,1)",
                  borderColor: "#646ace",
                  borderWidth: 2
  
              },
              tooltip: {
                  show: true
              },
              areaStyle: { //区域填充样式
                  normal: {
                      //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: "rgba(25,163,223,.3)"
  
  
                          },
                          {
                              offset: 1,
                              color: "rgba(25,163,223, 0)"
                          }
                      ], false),
                      shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                      shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                  }
              },
              data: goToSchool
          }, {
              name: '不认可',
              type: 'line',
              symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              symbolSize: 0,
              smooth: true,
              lineStyle: {
                  normal: {
                      width: 5,
                      color: "rgba(10,219,250,1)", // 线条颜色
                  },
                  borderColor: 'rgba(0,0,0,.4)',
              },
              itemStyle: {
                  color: "rgba(10,219,250,1)",
                  borderColor: "#646ace",
                  borderWidth: 2
  
              },
              tooltip: {
                  show: true
              },
              areaStyle: { //区域填充样式
                  normal: {
                      //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: "rgba(10,219,250,.3)"
                          },
                          {
                              offset: 1,
                              color: "rgba(10,219,250, 0)"
                          }
                      ], false),
                      shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
                      shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                  }
              },
              data: goOutSchool
          }]
      };
      let len = 0
      setInterval(()=>{
          if(len === xLabel.length){
              len = 0
          }
          myChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: len,
          })
          len ++
      }, 1000)
  
    //将配置项给实例化对象
    myChart.setOption(option);
    // 自适应屏幕
    window.addEventListener('resize',function(){
      myChart.resize();
    })
})();
//右模块二
(function(){
    var myChart = echarts.init(document.querySelector('.bar2 .chart'));   
    var xData = (function () {
        var data = ['处女', '天秤', '巨蟹', '狮子', '射手', '摩羯']
        return data
    })()
    var option = {
        legend: {
          data: ['落座数目', '代表行星相位', '飞宫', '宫位'],
          left: '18%',
          top: 30,
          itemWidth: 16.7,
          itemHeight: 7.6,
          type: 'plain',
          textStyle: {
            color: 'RGBA(154, 209, 253, 1)',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff',
            },
          },
        },
        grid: {
          borderWidth: 0,
          top: 100,
          bottom: 80,
          left: 55,
          right: 45,
          textStyle: {
            color: '#fff',
          },
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)',
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 10,
            },
            data: xData,
          },
        ],
        yAxis: [
            {
                name: '数',
                nameTextStyle: {
                  color: '#FDFDFD',
                  padding: [0, 0, 0, -50],
                },
                nameGap: 15,
                type: 'value',
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: 'dashed',
                    color: 'RGBA(3, 75, 97, 1)',
                  },
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  interval: 0,
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 10,
                },
                splitArea: {
                  show: false,
                },
              },
          {
            name: '宫位',
            nameTextStyle: {
              color: '#FDFDFD',
              padding: [0, 0, 0, 35],
            },
            type: 'value',
            splitLine: {
              show: false,
            },
            min: 0,
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 10,
              formatter: '{value}',
            },
          },
        ],
        series: [
          {
            name: '落座数目',
            type: 'bar',
            stack: '1',
            barMaxWidth: 15,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#2764CA', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#6D9EEE', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                opacity: 1,
              },
            },
            data: [2,2, 4, 1, 3, 1],
          },

          {
            name: '代表行星相位',
            type: 'bar',
            stack: '1',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#FF8B77', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#FE6AAC', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                opacity: 0.9,
                barBorderRadius: 0,
              },
            },
            data: [8, 3,5,  5, 2, 5],
          },
          {
            name: '宫位',
            type: 'bar',
            stack: '1',
            barMaxWidth: 15,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#FFC130', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#FFDB68', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                opacity: 1,
              },
            },
            data: [9,10, 8,  8, 1, 1],
          },
          {
            name: '飞宫',
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 0,
            symbol: 'emptyCircle',
            itemStyle: {
              normal: {
                color: '#FFC130',
                barBorderRadius: '100%',
              },
              borderWidth: 0,
            },
            smooth: true,
            lineStyle: {
              normal: {
                width: 3,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#FF8B77', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#FE6AAC', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            data: [10,8, 8,9, 1, 1]
          },
        ],
    }
    //将配置项给实例化对象
    myChart.setOption(option);
    // 自适应屏幕
    window.addEventListener('resize',function(){
            myChart.resize();
        })
})();
//右模块三
(function(){
    var myChart = echarts.init(document.querySelector('.pie4 .chart'));   
    var option = {
        tooltip: {},
        animationDurationUpdate: function(idx) {
            // 越往后的数据延迟越大
            return idx * 100;
        },
        animationEasingUpdate: 'bounceIn',
        color: ['#fff', '#fff', '#fff'],
        series: [{
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 30,
                edgeLength: 10
            },
            roam: true,
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}' + '\n\n' + '{b}',
                    fontSize: 16,
                    fontStyle: '400',
                }
            },
            data: [{
                "name": "狮子",
                "value": "NO.2",
                x: 80,
                y: 6,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#ff8400",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#ff8400",
                        "color": "#11213b"
                    }
                }
            }, {
                "name": "处女",
                "value": "NO.3",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#03fc62",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#03fc62",
                        "color": "#11213b"
                    }
                },
   
            }, {
                "name": "天秤",
                "value": "NO.4",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#aa61b2",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#aa61b2",
                        "color": "#11213b"
                    }
                }
            }, {
                "name": "星座",
                "value": 'NO.1',
                "symbolSize": 60,
                x: 0,
                y: 0,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#0a95e6",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#0a95e6",
                        "color": "#11213b"
                    }
                }
            }, {
                "name": "双鱼",
                "value": "NO.5",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#00fff7",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#00fff7",
                        "color": "#11213b"
                    }
                }
            }, {
                "name": "天蝎",
                "value": "NO.6",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#f06467",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#f06467",
                        "color": "#11213b"
                    }
                }
            }, {
                "name": "金牛",
                "value": "NO.7",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#f06467",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#f06467",
                        "color": "#11213b"
                    }
                }
            }, {
                "name": "双子",
                "value": "NO.8",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#03fc62",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#03fc62",
                        "color": "#11213b"
                    }
                }
            }, {
                "name": "水瓶",
                "value": "NO.9",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#00fff7",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#00fff7",
                        "color": "#11213b"
                    }
                }
            }, {
                "name": "摩羯",
                "value": "NO.10",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#f06467",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#f06467",
                        "color": "#11213b"
                    }
                }
            },{
                "name": "射手",
                "value": "NO.11",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#ffc300",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#ffc300",
                        "color": "#11213b"
                    }
                }
            },{
                "name": "白羊",
                "value": "NO.12",
                x: 0,
                y: 0,
                "symbolSize": 50,
                "draggable": true,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#b8860b",
                        "borderWidth": 4,
                        "shadowBlur": 20,
                        "shadowColor": "#b8860b",
                        "color": "#11213b"
                    }
                }
            }],
            links: [{
                    "source": "狮子",
                    "target": "星座"
                },
                {
                    "source": "处女",
                    "target": "星座"
                },
                {
                    "source": "天秤",
                    "target": "星座"
                },
                {
                    "source": "双鱼",
                    "target": "星座"
                },
                {
                    "source": "天蝎",
                    "target": "星座"
                },
                {
                    "source": "金牛",
                    "target": "星座"
                }, {
                    "source": "双子",
                    "target": "星座"
                }, {
                    "source": "水瓶",
                    "target": "星座"
                }, {
                    "source": "摩羯",
                    "target": "星座"
                },{
                    "source": "射手",
                    "target": "星座"
                },{
                    "source": "白羊",
                    "target": "星座"
                }
            ]
        }]
    }
    //将配置项给实例化对象
    myChart.setOption(option);
    // 自适应屏幕
    window.addEventListener('resize',function(){
            myChart.resize();
        })
})();