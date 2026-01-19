---
title: 中国地图
aside: false
---

<ClientOnly>
  <div class="map-wrapper">
    <div id="regions-info">
      <div class="region-item">
        <span class="region-title">华北：</span>
        <span class="region-content">北京市、天津市、河北省、山西省、内蒙古自治区（中部和东部）</span>
      </div>
      <div class="region-item">
        <span class="region-title">东北：</span>
        <span class="region-content">辽宁省、吉林省、黑龙江省、内蒙古自治区东部</span>
      </div>
      <div class="region-item">
        <span class="region-title">华东：</span>
        <span class="region-content">上海市、江苏省、浙江省、安徽省、福建省、江西省、山东省、台湾省</span>
      </div>
      <div class="region-item">
        <span class="region-title">华中：</span>
        <span class="region-content">河南省、湖北省、湖南省</span>
      </div>
      <div class="region-item">
        <span class="region-title">华南：</span>
        <span class="region-content">广东省、广西壮族自治区、海南省、香港、澳门</span>
      </div>
      <div class="region-item">
        <span class="region-title">西南：</span>
        <span class="region-content">重庆市、四川省、贵州省、云南省、西藏自治区</span>
      </div>
      <div class="region-item">
        <span class="region-title">西北：</span>
        <span class="region-content">陕西省、甘肃省、青海省、宁夏、新疆</span>
      </div>
    </div><div id="stats-info">
      <div class="stats-title">行政区划统计</div>
      <div class="stats-grid">
        <div class="stats-item">
          <span class="stats-value">23</span>
          <span class="stats-label">省</span>
        </div>
        <div class="stats-item">
          <span class="stats-value">5</span>
          <span class="stats-label">自治区</span>
        </div>
        <div class="stats-item">
          <span class="stats-value">4</span>
          <span class="stats-label">直辖市</span>
        </div>
        <div class="stats-item">
          <span class="stats-value">2</span>
          <span class="stats-label">特别行政区</span>
        </div>
      </div>
      <div class="stats-total">共 34 个省级行政区</div>
    </div><div id="map-container"></div>
  </div>
</ClientOnly>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

let chartInstance = null

const resizeHandler = () => {
  chartInstance && chartInstance.resize()
}

onMounted(async () => {
  const echarts = await import('echarts')
  const dom = document.getElementById('map-container')
  if (!dom) return
  chartInstance = echarts.init(dom)
  chartInstance.showLoading()
  try {
    const response = await axios.get('/about-me/map.json')
    const geoJson = response.data
    chartInstance.hideLoading()
    echarts.registerMap('china', geoJson)
    const data = geoJson.features
      .filter(f => f.properties.name !== '南海诸岛')
      .map((f, i) => ({ name: f.properties.name, value: i }))
    chartInstance.setOption({
      backgroundColor: 'transparent',
      title: {
        text: '中国地图 - 全省份多彩显示',
        subtext: '基于 Canvas (ECharts) 绘制',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    const provinceToCapital = {
                        '北京': '北京', '北京市': '北京',
                        '天津': '天津', '天津市': '天津',
                        '河北': '石家庄', '河北省': '石家庄',
                        '山西': '太原', '山西省': '太原',
                        '内蒙古': '呼和浩特', '内蒙古自治区': '呼和浩特',
                        '辽宁': '沈阳', '辽宁省': '沈阳',
                        '吉林': '长春', '吉林省': '长春',
                        '黑龙江': '哈尔滨', '黑龙江省': '哈尔滨',
                        '上海': '上海', '上海市': '上海',
                        '江苏': '南京', '江苏省': '南京',
                        '浙江': '杭州', '浙江省': '杭州',
                        '安徽': '合肥', '安徽省': '合肥',
                        '福建': '福州', '福建省': '福州',
                        '江西': '南昌', '江西省': '南昌',
                        '山东': '济南', '山东省': '济南',
                        '河南': '郑州', '河南省': '郑州',
                        '湖北': '武汉', '湖北省': '武汉',
                        '湖南': '长沙', '湖南省': '长沙',
                        '广东': '广州', '广东省': '广州',
                        '广西': '南宁', '广西壮族自治区': '南宁',
                        '海南': '海口', '海南省': '海口',
                        '重庆': '重庆', '重庆市': '重庆',
                        '四川': '成都', '四川省': '成都',
                        '贵州': '贵阳', '贵州省': '贵阳',
                        '云南': '昆明', '云南省': '昆明',
                        '西藏': '拉萨', '西藏自治区': '拉萨',
                        '陕西': '西安', '陕西省': '西安',
                        '甘肃': '兰州', '甘肃省': '兰州',
                        '青海': '西宁', '青海省': '西宁',
                        '宁夏': '银川', '宁夏回族自治区': '银川',
                        '新疆': '乌鲁木齐', '新疆维吾尔自治区': '乌鲁木齐',
                        '香港': '香港', '香港特别行政区': '香港',
                        '澳门': '澳门', '澳门特别行政区': '澳门',
                        '台湾': '台北', '台湾省': '台北'
                    };
                    const capital = provinceToCapital[params.name] || '';
                    return capital ? `${params.name}(${capital})` : params.name;
                }
            },
            // 视觉映射：用于自动分配 34 种不同的颜色
            visualMap: {
                show: false, // 隐藏映射条
                min: 0,
                max: 34,
                inRange: {
                    color: [
                        '#5470c6', '#91cc75', '#fac858', '#ee6666', 
                        '#73c0de', '#3ba272', '#fc8452', '#9a60b4', 
                        '#ea7ccc', '#2b83ba', '#abdda4', '#fdae61'
                    ]
                }
            },
       geo: {
                map: 'china',
                roam: true,
                layoutCenter: ['52%', '69%'], // 将地图位置下移，靠向页面底部
                layoutSize: '125%',
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 500,
                    textShadowBlur: 5,
                    textShadowColor: 'rgba(0,0,0,0.5)'
                },
                regions: [
                    {
                        name: '南海诸岛',
                        itemStyle: {
                            areaColor: 'rgba(0,0,0,0)',
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                            opacity: 0
                        },
                        label: {
                            show: false
                        },
                        emphasis: {
                            label: { show: false },
                            itemStyle: { areaColor: 'rgba(0,0,0,0)' }
                        },
                        select: {
                            label: { show: false },
                            itemStyle: { areaColor: 'rgba(0,0,0,0)' }
                        }
                    }
                ],
                itemStyle: {
                    borderColor: '#1e3752', // 使用深蓝灰色，降低亮度
                    borderWidth: 0.8
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#ffeb3b', // 悬停时文字变为亮黄色
                        fontSize: 14,
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        areaColor: '#3850a2', // 修改为亮丽的宝蓝色，不再是阴暗的灰黑色
                        shadowBlur: 20,
                        shadowColor: 'rgba(0,0,0,0.5)'
                    }
                }
            },
            series: [
                {
                    name: '中国地图',
                    type: 'map',
                    geoIndex: 0,
                    data: data
                }
            ]
    })
  } catch (error) {
    console.error('Failed to fetch GeoJSON data:', error)
    chartInstance.hideLoading()
  }
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style scoped>
:deep(.vp-doc) {
  max-width: 100% !important;
  padding: 0 !important;
}
:deep(.VPSidebar), :deep(.VPDocAside) {
  display: none !important;
}
:deep(.VPContent.has-sidebar) {
  padding-left: 0 !important;
}
.map-wrapper {
  position: relative;
  width: 100%;
  height: calc(100vh - 64px);
  background: #101f30;
  overflow: hidden;
}
#map-container {
  width: 100%;
  height: 100%;
  z-index: 0.8;
}
#regions-info,
#stats-info {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(16, 31, 48, 0.85);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  pointer-events: none;
  z-index: 6;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
#regions-info {
  left: 40px;
  width: 320px;
}
#stats-info {
  right: 40px;
  width: 260px;
  text-align: center;
}
.region-item { margin-bottom: 14px; }
.region-title { color: #ffeb3b; font-weight: bold; font-size: 16px; display: block; margin-bottom: 4px; }
.region-content { color: rgba(255, 255, 255, 0.85); font-size: 13px; line-height: 1.5; }
.stats-title { color: #ffeb3b; font-size: 20px; font-weight: bold; margin-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 12px; }
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.stats-item { background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); }
.stats-value { color: #fff; font-size: 24px; font-weight: bold; display: block; }
.stats-label { color: rgba(255, 255, 255, 0.5); font-size: 12px; }
.stats-total { margin-top: 24px; color: rgba(255, 255, 255, 0.6); font-style: italic; font-size: 14px; }
</style>
