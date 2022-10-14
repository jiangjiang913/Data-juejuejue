// 饼图模块一
(function(){
    var myChart = echarts.init(document.querySelector('.pie .chart')); 
    const sourceData = [
        {
            name: '小学',
            value: 129
        },
        {
            name: '中学',
            value: 224
        },
        {
            name: '高中',
            value: 384
        },
        {
            name: '大专',
            value: 420
        },
        {
            name: '本科',
            value: 558
        },
        {
            name: '研究生',
            value: 238
        }
    ]

    const total = sourceData.reduce((num, item) => {
        num += item.value
        return num
    }, 0)

    // 内环间隔距离
    const inSplitWidth = 3
    // 为了实现内环间隔距离，需要额外插入的数值。200 只是个系数，值越大，单位间隔的距离越小。
    const inSplitValue = Math.floor(total / (200 / inSplitWidth))

    // 外环间隔比内环间隔大的值
    const itemSplitWidth = 2
    // 外环间隔距离
    const outSplitWidth = inSplitWidth + itemSplitWidth
    // 为了实现外环间隔距离，需要额外插入的数值。
    const outSplitValue = Math.floor(total / (200 / outSplitWidth))

    // 内环数据的总数
    const valueTotal = total + inSplitValue * sourceData.length

    function getTextAngle(currentAngle, angle) {
        currentAngle = currentAngle + angle
        console.log('currentAngle', currentAngle)
        if (currentAngle <= 90) {
            return -currentAngle;
        } else if (currentAngle <= 180 && currentAngle > 90) {
            return 180 - currentAngle;
        } else if (currentAngle < 270 && currentAngle > 180) {
            return 180 - currentAngle;
        } else if (currentAngle < 360 && currentAngle >= 270) {
            return 360 - currentAngle;
        }
    }

    // 内环数据。在原数据的后面添加间隔数据（间隔块设置颜色透明）
    const valueData = sourceData.reduce((arr, item) => {
        const currentTotal = arr.reduce((total, item) => {
            total += item.value
            return total
        }, 0)
        
        const currentAngle = 360 * (currentTotal / valueTotal)
        const angle = 360 * (item.value / valueTotal) / 2
        console.log('current  angle', currentAngle)
        arr.push({
            name: item.name,
            value: item.value,
            itemStyle: {
                
            },
            label: {
                lineHeight: 80,
                rotate: getTextAngle(currentAngle, angle)
            }
        }, {
            name: '',
            value: inSplitValue,
            itemStyle: {
                color: 'transparent',
                opacity: 0
            },
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        })
        return arr
    }, [])


    // 原数据需要减去的值（外环每块的数据都要比原数据少一点才能达到外环嵌在内环的效果）
    const itemReduced = outSplitValue - inSplitValue
    // 外环数据
    const outValueData = sourceData.reduce((arr, item, index) => {
        const currentTotal = arr.reduce((total, item) => {
            total += item.value
            return total
        }, 0)
        
        const currentAngle = 360 * (currentTotal / valueTotal)
        const angle = 360 * (item.value / valueTotal) / 2
        
        arr.push({
            name: item.name,
            value: item.value - itemReduced,
            itemStyle: {
                // color: 'rgba(160, 60, 60, 0.3)'
            },
            label: {
                color: 'rgb(160, 60, 60)',
                position: 'inside',
                align: 'center',
                // lineHeight: 20,
                // verticalAlign: 'top',
                rotate: getTextAngle(currentAngle, angle)
            }
        }, {
            name: '',
            value: outSplitValue,
            itemStyle: {
                color: 'transparent',
                opacity: 0
            },
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        })
        
        return arr
    }, [])

    var option = {
        series: [
            {
            type: 'pie',
            data: valueData,
            // startAngle: 0,
            label: {
                show: false,
                position: 'outside',
                align: 'center',
                verticalAlign: 'middle',
                // rotate: true,
                formatter(params) {
                    // console.log('label params', params)
                    return params.data.name
                }
            },
            labelLine: {
                show: false
            },
            emphasis: {
                scale: true,
                scaleSize: 20
            },
            blur: {
                itemStyle: {
                    opacity: 1
                }  
            },
            // labelLayout(params) {
            //     return {
            //         x: params.rect.x,
            //         y: params.rect.y + params.rect.height / 2
            //     }  
            // },
            radius: ['60%', '80%'],
            itemStyle: {
                // borderWidth: 5,
                // borderColor: '#000',
                // borderRadius: [10, 20],
                // opacity: 0.5,
                // borderCap: 'square',
                // borderJoin: 'round'
            }
        },
        {
            type: 'pie',
            startAngle: -360 * (itemReduced / 2 / valueTotal) + 90,
            radius: ['79%', '95%'],
            itemStyle: {
                // color: 'rgba(160, 60, 60, 0.5)',
                opacity: 0.7,
                // borderWidth: 15,
                // borderColor: 'rgba(0, 0, 0, 0)'
            },
            label: {
                show: true,
                formatter(params) {
                    return '{a|'+ params.data.name +'}'
                },
                rich: {
                    a: {
                        lineHeight: 50,
                        color: 'white'
                    }
                }
            },
            labelLine: {
                show: false,
                length: 10,
            },
            data: outValueData
        }
        ]
    };
  //将配置项给实例化对象
  myChart.setOption(option);
  // 自适应屏幕
  window.addEventListener('resize',function(){
    myChart.resize();
  })
 
})();

// 走势图模块二
(function(){
    var myChart = echarts.init(document.querySelector('.bar1 .chart')); 
    var xData = ['2016', '2017', '2018', '2019', '2020'];
    var data0 = [1, 1, 1, 1, 1];
    var data1 = [35, 100,55, 30, 20]; //高度认可
    var data4 = [40, 90,26, 30, 20]; //一般认可
    var getvalue1 = [95, 230,100, 60, 50]; // 认可总汇
    var data3 = [];
    var data5 = [];
    for (let i = 0; i < data1.length; i++) {
        data3.push(data1[i] + data4[i]);
    }
    for (let i = 0; i < data1.length; i++) {
        data5.push(data1[i]);
    }
    var maxnum1 = Math.max.apply(null, getvalue1);
    var maxlen1 = Math.pow(10, String(Math.ceil(maxnum1)).length - 2);
    if (maxnum1 >= 5) {
        var max1 = Math.ceil(maxnum1 / (10 * maxlen1)) * maxlen1 * 10;
    } else {
        var max1 = 5;
    }
    var option = {
        // backgroundColor: '#000E1A', //背景色
        tooltip: {
            trigger: 'axis',
            borderColor: 'rgba(255,255,255,.3)',
            backgroundColor: 'rgba(13,5,30,.6)',
            textStyle: {
                color: 'white', //设置文字颜色
            },
            borderWidth: 0.3,
            padding: 4,
            formatter: function (parms) {
                var str =
                    '年份：' +
                    parms[0].axisValue +
                    '</br>' +
                    parms[0].marker +
                    '上衣：' +
                    parms[0].value +
                    '</br>' +
                    parms[1].marker +
                    '裤子：' +
                    parms[1].value +
                    '</br>' +
                    parms[2].marker +
                    '裙子:' +
                    parms[2].value;
                return str;
            },
        },
        textStyle: {
            color: '#C9C9C9',
        },

        // color: ['#fbc292', '#06fbfe',  '#f06e91'],
        legend: {
            type: 'scroll',
            orient: 'vertical',
            selectedMode: false, //图例点击失效
            right: '10%',
            top: '15%',
            textStyle: {
                color: '#ffffff',
                fontSize: 25,
            },

            // data: datas.legendData,
        },
        grid: {
            containLabel: true,
            left: '10%',
            top: '20%',
            bottom: '10%',
            right: '10%',
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#B5B5B5',
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                margin: 20, //刻度标签与轴线之间的距离。
                textStyle: {
                    fontFamily: 'Microsoft YaHei',
                    color: '#FFF',
                },
                fontSize: 10,
                fontStyle: 'bold',
            },
        },
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#B5B5B5',
                    },
                },
                splitLine: {
                    show: false,
                    // lineStyle: {
                    //     // 使用深浅的间隔色
                    //     color: ["#B5B5B5"],
                    //     type: "dashed",
                    //     opacity: 0.5,
                    // },
                },
                axisLabel: {
                    show: false,
                    textStyle: {
                        fontFamily: 'Microsoft YaHei',
                        color: '#FFF',
                    },
                    fontSize: 10,
                },
            },
            {
                show: false,
                type: 'value',
                min: 0,
                max: max1, // 计算最大值
                interval: max1 / 5, // 平均分为5份
                splitNumber: 5,
                name: '人数',
                nameTextStyle: {
                    color: '#82AFC6',
                    fontSize: 12,
                    padding: [0, 0, -8, -100],
                },
                axisLabel: {
                    formatter: function (value) {
                        num = value;
                        if (num && num != 'undefined' && num != 'null') {
                            let numS = num;
                            numS = numS.toString();
                            numS = numS.replace(/,/gi, '');
                            return numS;
                        } else {
                            return num;
                        }
                    },
                    color: '#82AFC6',
                    textStyle: {
                        fontSize: 12,
                    },
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#3E5B7D',
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: '#102E74',
                    },
                },
            },
        ],
        series: [
            {
                type: 'bar',
                name: '一般认可',
                type: 'bar',
                data: data1,
                stack: 'zs',
                barMaxWidth: 'auto',
                barWidth: 20,
                itemStyle: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: 'linear',
                        global: false,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#017ebb',
                            },
                            {
                                offset: 1,
                                color: '#06fbfe',
                            },
                        ],
                    },
                },
            },

            {
                name: '高度认可',
                type: 'bar',
                data: data4,
                stack: 'zs',
                type: 'bar',
                barMaxWidth: 'auto',
                barWidth: 20,
                itemStyle: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: 'linear',
                        global: false,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#fbc292',
                            },
                            {
                                offset: 1,
                                color: '#f06e91',
                            },
                        ],
                    },
                },
            },
            {
                name: '认可总汇',
                type: 'line',
                data: getvalue1,
                smooth: true,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(255, 227, 168, 0)',
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(255, 227, 168, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255, 227, 168, 0)',
                                },
                            ]),
                            shadowColor: 'rgba(255, 120, 0,1)',
                            shadowBlur: 8,
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(197, 106, 255, 0.6)',
                                },
                                {
                                    offset: 0.6,
                                    color: 'rgba(255, 120, 0, 0)',
                                },
                            ]),
                        },
                    },
                },
            },

            {
                data: data0,
                type: 'pictorialBar',
                barMaxWidth: '20',
                symbol: 'diamond',
                symbolOffset: [0, '50%'],
                symbolSize: [60, 20],
                zlevel: 2,
                itemStyle: {
                    normal: {
                        color: '#06fbfe',
                    },
                },
            },
            {
                data: data1,
                type: 'pictorialBar',
                barMaxWidth: '20',
                symbolPosition: 'end',
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [60, 20],
                zlevel: 2,
            },
            {
                data: data1,
                type: 'pictorialBar',
                barMaxWidth: '20',
                symbolPosition: 'end',
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [60, 20],
                zlevel: 2,
            },
            {
                data: data5,
                type: 'pictorialBar',
                barMaxWidth: '20',
                symbolPosition: 'end',
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [0, 20],
                zlevel: 2,
            },
            {
                data: data5,
                type: 'pictorialBar',
                barMaxWidth: '20',
                symbolPosition: 'end',
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [60, 20],
                zlevel: 2,
                itemStyle: {
                    normal: {
                        color: '#06fbfe',
                    },
                },
            },
            {
                data: data3,
                type: 'pictorialBar',
                barMaxWidth: '20',
                symbolPosition: 'end',
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [60, 20],
                zlevel: 2,
                itemStyle: {
                    normal: {
                        color: '#fbc292',
                    },
                },
            },
        ],
    };

      //将配置项给实例化对象
    myChart.setOption(option);
        // 自适应屏幕
     window.addEventListener('resize',function(){
     myChart.resize();
  })
})();
// 折线图模块三
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
              right: '10%',
              top:'10%',
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
              top: '15%',
              left: '10%',
              right: '10%',
              bottom: '15%',
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

//柱状图模块四
(function () {
    //实例化对象
    var myChart = echarts.init(document.querySelector('.bar .chart'));
    //指定配置项和数据
    var option = {
      color: ['#40979F','#4E241A','#4A6986','#28459F']
      ,
      tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
          data: ['风', '火', '土','水',]
      },
      // 修改图标大小
      grid: {
          left: '0%',
          right: '0%',
          bottom: '4%',
          top: '10px',
          containLabel: true
      },
      xAxis: {
          type: 'value'
      },
      yAxis: {
          type: 'category',
          data: ['基本', '固定', '变动']
      },
      series: [
          {
              name: '风',
              type: 'bar',
              barWidth:'50%',
              itemStyle:{
                barBorderRadius:5
              },
              stack: '总量',
              label: {
                  show: true,
                  position: 'insideRight'
              },
              data: [320, 302, 301]
          },
          {
              name: '火',
              type: 'bar',
              barWidth:'50%',
              itemStyle:{
                barBorderRadius:5
              },
              stack: '总量',
              label: {
                  show: true,
                  position: 'insideRight'
              },
              data: [120, 132, 101]
          },
          {
              name: '土',
              type: 'bar',
              barWidth:'50%',
              itemStyle:{
                barBorderRadius:5
              },
              stack: '总量',
              label: {
                  show: true,
                  position: 'insideRight'
              },
              data: [220, 182, 191]
          },
          {
              name: '水',
              type: 'bar',
              barWidth:'50%',
              itemStyle:{
                barBorderRadius:5
              },
              stack: '总量',
              label: {
                  show: true,
                  position: 'insideRight'
              },
              data: [150, 212, 201]
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