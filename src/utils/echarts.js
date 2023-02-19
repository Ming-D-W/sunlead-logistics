export function liquidFillOne (data) {
  return {
    backgroundColor: '#fff',
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: '58%'
      }
    ],
    series: [
      {
        type: 'liquidFill', // 水位图
        radius: '60%', // 显示比例
        center: ['50%', '45%'], // 中心点
        data: [data / 100], // data个数代表波浪数
        color: ['rgba(226, 93, 62, 1)'], // 波浪颜色
        backgroundStyle: {
          color: '#ffe5e0'
        },
        label: {
          // 标签设置
          position: ['50%', '50%'],
          formatter: data + '%', // 显示文本
          fontSize: '20px',
          fontFamily: 'DINAlternate-Bold',
          fontWeight: '100',
          color: '#000',
          insideColor: '#000'
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: 'red',
            borderWidth: 1
          }
        },
        itemStyle: {
          opacity: 0.95,
          shadowColor: 'rgba(0, 0, 0, 0)'
        }
      }
    ]
  }
}

export function liquidFillTwo (data) {
  return {
    backgroundColor: '#fff',
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: '58%'
      }
    ],
    series: [
      {
        type: 'liquidFill', // 水位图
        radius: '60%', // 显示比例
        center: ['50%', '45%'], // 中心点
        data: [data / 100], // data个数代表波浪数
        color: ['#f6c66f'], // 波浪颜色
        backgroundStyle: {
          color: '#fdf2dc'
        },
        label: {
          // 标签设置
          position: ['50%', '50%'],
          formatter: data + '%', // 显示文本
          fontSize: '20px',
          fontFamily: 'DINAlternate-Bold',
          fontWeight: '100',
          color: '#000',
          insideColor: '#000'
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: '#f6c975',
            borderWidth: 1
          }
        },
        itemStyle: {
          opacity: 0.95,
          shadowColor: 'rgba(0, 0, 0, 0)'
        }
      }
    ]
  }
}

export function liquidFillThree (data) {
  return {
    backgroundColor: '#fff',
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: '58%'
      }
    ],
    series: [
      {
        type: 'liquidFill', // 水位图
        radius: '60%', // 显示比例
        center: ['50%', '45%'], // 中心点
        data: [data / 100], // data个数代表波浪数
        color: ['#f1a054'], // 波浪颜色
        backgroundStyle: {
          color: '#fbebd9'
        },
        label: {
          // 标签设置
          position: ['50%', '50%'],
          formatter: data + '%', // 显示文本
          fontSize: '20px',
          fontFamily: 'DINAlternate-Bold',
          fontWeight: '100',
          color: '#000',
          insideColor: '#000'
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: '#f1a55c', // 边框颜色
            borderWidth: 1
          }
        },
        itemStyle: {
          opacity: 0.95,
          shadowColor: 'rgba(0, 0, 0, 0)'
        }
      }
    ]
  }
}

export function liquidFillForth (data) {
  return {
    backgroundColor: '#fff',
    series: [
      {
        type: 'liquidFill', // 水位图
        radius: '60%', // 显示比例
        center: ['50%', '45%'], // 中心点
        data: [data / 100], // data个数代表波浪数
        color: ['#eadf8f'], // 波浪颜色
        backgroundStyle: {
          color: '#fafae1'
        },
        label: {
          // 标签设置
          position: ['50%', '50%'],
          formatter: data + '%', // 显示文本
          fontSize: '20px',
          fontFamily: 'DINAlternate-Bold',
          fontWeight: '100',
          color: '#000',
          insideColor: '#000'
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: '#ebdf94',
            borderWidth: 1
          }
        },
        itemStyle: {
          opacity: 0.95,
          shadowColor: 'rgba(0, 0, 0, 0)'
        }
      }
    ]
  }
}

// 订单总量
export function orderCount (that, xData, yData) {
  return {
    backgroundColor: '#fff',
    grid: {
      top: '18%',
      // // left: '15%',
      // // right: '5%',
      bottom: '25%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      showContent: true,
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: 'solid',
          color: '#aaaaaa'
        },
        label: {
          show: false,
          color: '#000',
          fontSize: 12,
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }
      },
      formatter: '<div style="width:100%;display:flex;justify-content:space-between;font-size:12px;"><span style="color:#999ca6;">日期：<span/><span style="color:#000">{b}<span/></div><div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:#999ca6;">订单总量：<span/><span style="color:#000;">{c}笔<span/></div>'
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          color: '#000',
          fontSize: 12
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e6e9ed'
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          fontSize: 12,
          color: '#e6e9ed',
          interval: 2,
          margin: 5
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        type: 'line',
        symbol: 'circle',
        showSymbol: true,
        yAxisIndex: 0,
        lineStyle: {
          width: 1,
          color: '#d26043'
        },
        itemStyle: {
          color: '#d25e3f',
          borderColor: '#d25e3f',
          borderWidth: 2
        },
        emphasis: {
          scale: 2.5 // 鼠标悬停，节点放大倍数
        },
        areaStyle: {
          color: new that.$echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#fff'
              },
              {
                offset: 1,
                color: '#f8e7e3'
              }
            ],
            false
          )
        },
        data: yData
      }
    ]
  }
}

// 全国省份
const provinces = ['北京', '天津', '上海', '重庆', '新疆', '西藏', '宁夏', '内蒙古',
  '广西', '黑龙江', '吉林', '辽宁', '河北', '山东', '江苏', '安徽',
  '浙江', '福建', '广东', '海南', '云南', '贵州', '四川', '湖南',
  '湖北', '河南', '山西', '陕西', '甘肃', '青海', '江西', '台湾', '香港', '澳门']

// 全国省份首府地理位置映射表
const chinaGeoCoordMap = {
  黑龙江: [127.9688, 45.368],
  内蒙古: [110.3467, 41.4899],
  吉林: [125.8154, 44.2584],
  北京: [116.4551, 40.2539],
  辽宁: [123.1238, 42.1216],
  河北: [114.4995, 38.1006],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  陕西: [109.1162, 34.2004],
  甘肃: [103.5901, 36.3043],
  宁夏: [106.3586, 38.1775],
  青海: [101.4038, 36.8207],
  新疆: [87.9236, 43.5883],
  西藏: [91.11, 29.97],
  四川: [103.9526, 30.7617],
  重庆: [108.384366, 30.439702],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234],
  江苏: [118.8062, 31.9208],
  安徽: [117.29, 32.0581],
  湖北: [114.3896, 30.6628],
  浙江: [119.5313, 29.8773],
  福建: [119.4543, 25.9222],
  江西: [116.0046, 28.6633],
  湖南: [113.0823, 28.2568],
  贵州: [106.6992, 26.7682],
  云南: [102.9199, 25.4663],
  广东: [113.12244, 23.009505],
  广西: [108.479, 23.1152],
  海南: [110.3893, 19.8516],
  上海: [121.4648, 31.2891]
}

function getNum () {
  const arr = []
  for (let i = 1; i <= 34; i++) {
    arr.push(2500 - 60 * i)
  }
  return arr.reverse()
}

// 订单分布
export function orderDistribution () {
  return {
    tooltip: {
      trigger: 'axis',
      showContent: true,
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: 'solid',
          color: '#aaaaaa'
        },
        label: {
          show: false,
          color: '#000',
          fontSize: 12,
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }
      },
      formatter:
        '<div style="width:100%;display:flex;justify-content:space-between;font-size:12px;"><span style="color:#999ca6;">日期：<span/><span style="color:#000">{b}<span/></div><div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:#999ca6;">订单总量：<span/><span style="color:#000;">{c}笔<span/></div>'
    },
    legend: { show: false },
    grid: {
      left: '7%',
      right: '4%',
      top: '0%',
      height: '95%'
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: provinces,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 10,
        fontWeight: 600
      }
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        data: getNum(),
        barWidth: 4,
        itemStyle: {
          color: '#d15e41'
        }
      }
    ]
  }
}

// 地名转换地理位置
const convertData = function (data) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const dataItem = data[i]
    const fromCoord = chinaGeoCoordMap[dataItem[0].name]
    const toCoord = chinaGeoCoordMap[dataItem[1].name]
    if (fromCoord && toCoord) {
      res.push({
        coords: [fromCoord, toCoord]
      })
    }
  }
  return res
}

// 线路管理
export function lineManager (chinaCoordDatas) {
  return {
    tooltip: {
      trigger: 'item'

    },

    visualMap: {
      show: false,
      min: 0,
      seriesIndex: 0,
      left: 'left',
      top: 'bottom',
      calculable: false,
      inRange: {
        color: ['#FFDED1', '#FEB08F', '#FF9C6F']
      }
    },
    geo: {
      map: 'china',
      zoom: 1.2,
      label: {
        normal: {
          show: true,
          color: '#E68470'
        },
        emphasis: {
          show: false,
          color: '#292929'
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#FFDED1',
          borderColor: '#E68470',
          borderWidth: 1

        },
        emphasis: {
          areaColor: '#05ff09'
        }
      },
      regions: [
        {
          name: '南海诸岛',
          itemStyle: {
            // 隐藏地图
            normal: {
              opacity: 0 // 为 0 时不绘制该图形
            }
          },
          label: {
            show: false // 隐藏文字
          }
        }]
    },
    series: [
      {
        type: 'map',
        mapType: 'china',
        geoIndex: 0,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        }
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        z: 99,
        zlevel: 2,
        effect: {
          show: true,
          period: 4, // 箭头指向速度，值越小速度越快
          trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', // 箭头图标
          symbolSize: 5 // 图标大小
        },
        lineStyle: {
          normal: {
            color: 'rgba(79, 141, 245, 1)',
            width: 1, // 尾迹线条宽度
            opacity: 1, // 尾迹线条透明度
            curveness: 0.3 // 尾迹线条曲直度
          }
        },
        data: convertData(chinaCoordDatas)
      }, {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 11,
        zlevel: 2,
        rippleEffect: { // 涟漪特效
          color: 'transparent'
        },

        symbol: 'circle',
        itemStyle: {
          color: '#4F8DF5',
          borderWidth: 20,
          borderColor: 'rgba(79, 141, 245, 0.05)'
        },
        data: chinaCoordDatas.map(item => ({
          ...item[0],
          value: chinaGeoCoordMap[item[0].name]
        }))
      }
    ]
  }
}
