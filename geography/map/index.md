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
      <div id="area-rank-chart" style="width: 100%; height: 350px; margin-top: 20px; pointer-events: auto;"></div>
    </div><div id="map-container"></div>
  </div>
  <div class="full-area-section">
    <div class="full-area-card">
      <h3>省级行政区面积全排名 (单位：万km²)</h3>
      <div id="full-area-chart" style="width: 100%; height: 1000px;"></div>
    </div>
  </div>
</ClientOnly>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

let chartInstance = null
let areaChartInstance = null
let fullAreaChartInstance = null

const resizeHandler = () => {
  chartInstance && chartInstance.resize()
  areaChartInstance && areaChartInstance.resize()
  fullAreaChartInstance && fullAreaChartInstance.resize()
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
          const provinceInfo = {
            '北京市': { abbr: '京', capital: '北京' },
            '天津市': { abbr: '津', capital: '天津' },
            '河北省': { abbr: '冀', capital: '石家庄' },
            '山西省': { abbr: '晋', capital: '太原' },
            '内蒙古自治区': { abbr: '蒙', capital: '呼和浩特' },
            '辽宁省': { abbr: '辽', capital: '沈阳' },
            '吉林省': { abbr: '吉', capital: '长春' },
            '黑龙江省': { abbr: '黑', capital: '哈尔滨' },
            '上海市': { abbr: '沪', capital: '上海' },
            '江苏省': { abbr: '苏', capital: '南京' },
            '浙江省': { abbr: '浙', capital: '杭州' },
            '安徽省': { abbr: '皖', capital: '合肥' },
            '福建省': { abbr: '闽', capital: '福州' },
            '江西省': { abbr: '赣', capital: '南昌' },
            '山东省': { abbr: '鲁', capital: '济南' },
            '河南省': { abbr: '豫', capital: '郑州' },
            '湖北省': { abbr: '鄂', capital: '武汉' },
            '湖南省': { abbr: '湘', capital: '长沙' },
            '广东省': { abbr: '粤', capital: '广州' },
            '广西壮族自治区': { abbr: '桂', capital: '南宁' },
            '海南省': { abbr: '琼', capital: '海口' },
            '重庆市': { abbr: '渝', capital: '重庆' },
            '四川省': { abbr: '川', capital: '成都' },
            '贵州省': { abbr: '黔', capital: '贵阳' },
            '云南省': { abbr: '滇', capital: '昆明' },
            '西藏自治区': { abbr: '藏', capital: '拉萨' },
            '陕西省': { abbr: '陕', capital: '西安' },
            '甘肃省': { abbr: '甘', capital: '兰州' },
            '青海省': { abbr: '青', capital: '西宁' },
            '宁夏回族自治区': { abbr: '宁', capital: '银川' },
            '新疆维吾尔自治区': { abbr: '新', capital: '乌鲁木齐' },
            '香港特别行政区': { abbr: '港', capital: '香港' },
            '澳门特别行政区': { abbr: '澳', capital: '澳门' },
            '台湾省': { abbr: '台', capital: '台北' }
          };
          const info = provinceInfo[params.name];
          if (info) {
            return `<div style="font-weight:bold">${params.name}</div>
                    简称：${info.abbr}<br/>
                    省会：${info.capital}`;
          }
          return params.name;
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

    // 初始化面积排名柱状图
    const areaDom = document.getElementById('area-rank-chart')
    if (areaDom) {
      areaChartInstance = echarts.init(areaDom)
      const areaData = [
        { name: '新疆', value: 166 },
        { name: '西藏', value: 122 },
        { name: '内蒙古', value: 118 },
        { name: '青海', value: 72 },
        { name: '四川', value: 48.6 },
        { name: '黑龙江', value: 47.3 },
        { name: '甘肃', value: 42.6 },
        { name: '云南', value: 39.4 },
        { name: '广西', value: 23.6 },
        { name: '湖南', value: 21.1 }
      ].reverse()

      areaChartInstance.setOption({
        backgroundColor: 'transparent',
        title: {
          text: '面积排名前十 (万km²)',
          left: 'center',
          textStyle: { color: '#ffeb3b', fontSize: 13 }
        },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '12%', bottom: '3%', top: '15%', containLabel: true },
        xAxis: { type: 'value', axisLabel: { show: false }, splitLine: { show: false } },
        yAxis: { 
          type: 'category', 
          data: areaData.map(i => i.name),
          axisLabel: { color: '#fff', fontSize: 10 },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: [{
          name: '面积',
          type: 'bar',
          data: areaData.map(i => i.value),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#ffeb3b' },
              { offset: 1, color: '#fbc02d' }
            ]),
            borderRadius: [0, 10, 10, 0]
          },
          label: { show: true, position: 'right', color: '#ffeb3b', fontSize: 10 }
        }]
      })
    }

    // 初始化全省面积排名柱状图
    const fullAreaDom = document.getElementById('full-area-chart')
    if (fullAreaDom) {
      fullAreaChartInstance = echarts.init(fullAreaDom)
      const fullData = [
        { name: '新疆', value: 166 }, { name: '西藏', value: 122 }, { name: '内蒙古', value: 118 },
        { name: '青海', value: 72.2 }, { name: '四川', value: 48.6 }, { name: '黑龙江', value: 47.3 },
        { name: '甘肃', value: 42.6 }, { name: '云南', value: 39.4 }, { name: '广西', value: 23.6 },
        { name: '湖南', value: 21.1 }, { name: '陕西', value: 20.6 }, { name: '河北', value: 18.8 },
        { name: '吉林', value: 18.7 }, { name: '湖北', value: 18.6 }, { name: '广东', value: 18.0 },
        { name: '贵州', value: 17.6 }, { name: '江西', value: 16.7 }, { name: '河南', value: 16.7 },
        { name: '山东', value: 15.7 }, { name: '山西', value: 15.6 }, { name: '辽宁', value: 14.8 },
        { name: '安徽', value: 13.9 }, { name: '福建', value: 12.1 }, { name: '江苏', value: 10.7 },
        { name: '浙江', value: 10.4 }, { name: '重庆', value: 8.2 }, { name: '宁夏', value: 6.6 },
        { name: '台湾', value: 3.6 }, { name: '海南', value: 3.5 }, { name: '北京', value: 1.6 },
        { name: '天津', value: 1.2 }, { name: '上海', value: 0.6 }, { name: '香港', value: 0.1 },
        { name: '澳门', value: 0.003 }
      ].reverse()

      fullAreaChartInstance.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '10%', bottom: '3%', top: '2%', containLabel: true },
        xAxis: { type: 'value', axisLabel: { color: '#999' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } } },
        yAxis: { 
          type: 'category', 
          data: fullData.map(i => i.name),
          axisLabel: { color: '#fff', fontSize: 12 },
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
        },
        series: [{
          name: '面积',
          type: 'bar',
          data: fullData.map(i => i.value),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#4caf50' },
              { offset: 1, color: '#2e7d32' }
            ]),
            borderRadius: [0, 5, 5, 0]
          },
          label: { show: true, position: 'right', color: '#4caf50', fontSize: 11 }
        }]
      })
    }
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
  if (areaChartInstance) {
    areaChartInstance.dispose()
    areaChartInstance = null
  }
  if (fullAreaChartInstance) {
    fullAreaChartInstance.dispose()
    fullAreaChartInstance = null
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

/* 全排名区域样式 */
.full-area-section {
  background: #0d1621;
  padding: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.full-area-card {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(16, 31, 48, 0.6);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
.full-area-card h3 {
  color: #ffeb3b;
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid rgba(255, 235, 59, 0.2);
  padding-bottom: 15px;
}
</style>
