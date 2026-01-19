---
title: 中国56个民族人口分布
aside: false
---

# 中国56个民族人口分布

民族知识是“国情省情”模块的重点。中国是一个统一的多民族国家，通过“第七次全国人口普查”数据，我们可以清晰地看到民族人口的构成特点。

<ClientOnly>
  <div class="ethnic-page-container">
    <!-- 顶部概览 -->
    <div class="ethnic-overview">
      <div class="overview-card pie-chart-box">
        <h3>1. 汉族与少数民族占比</h3>
        <div id="ethnic-pie-chart" style="width: 100%; height: 350px;"></div>
      </div>
      <div class="overview-card info-text-box">
        <h3>考公常识速记</h3>
        <ul class="quick-facts">
          <li><strong>人口比例：</strong>汉族约占 <strong>91.11%</strong>，少数民族约占 <strong>8.89%</strong>。</li>
          <li><strong>最大少数民族：</strong><strong>壮族</strong>（约1957万人）。</li>
          <li><strong>民族分布特点：</strong>大杂居、小聚居、交错居住。</li>
          <li><strong>自治区：</strong>内蒙古、广西、西藏、宁夏、新疆（共5个）。</li>
          <li><strong>少数民族增长：</strong>少数民族人口增长速度高于汉族（比重上升0.4%）。</li>
        </ul>
      </div>
    </div>
    <!-- 底部柱状图 -->
    <div class="ethnic-charts-grid">
      <div class="ethnic-detail-card">
        <h3>2. 人口过百万的少数民族排名 (前18名)</h3>
        <p class="chart-desc">基于第七次人口普查数据（单位：万人）</p>
        <div id="ethnic-bar-chart" style="width: 100%; height: 500px;"></div>
      </div>
      <div class="ethnic-detail-card">
        <h3>3. 人口最少的少数民族 (万人以下)</h3>
        <p class="chart-desc">注：高山族数据仅统计大陆地区（单位：人）</p>
        <div id="ethnic-bottom-chart" style="width: 100%; height: 500px;"></div>
      </div>
    </div>
  </div>
</ClientOnly>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let pieChart = null
let barChart = null
let bottomChart = null

onMounted(async () => {
  const echarts = await import('echarts')
  
  // 初始化饼图
  const pieDom = document.getElementById('ethnic-pie-chart')
  if (pieDom) {
    pieChart = echarts.init(pieDom)
    pieChart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
      legend: { bottom: '5%', textStyle: { color: '#ccc' } },
      series: [{
        name: '占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#1a1a1a', borderWidth: 2 },
        label: { show: true, color: '#fff', formatter: '{b}\n{d}%' },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
        data: [
          { value: 91.11, name: '汉族', itemStyle: { color: '#ef5350' } },
          { value: 8.89, name: '少数民族', itemStyle: { color: '#42a5f5' } }
        ]
      }]
    })
  }

  // 初始化顶部柱状图 (百万级别)
  const barDom = document.getElementById('ethnic-bar-chart')
  if (barDom) {
    barChart = echarts.init(barDom)
    const dataTop = [
      { name: '壮族', value: 1957 }, { name: '维吾尔族', value: 1177 },
      { name: '回族', value: 1138 }, { name: '苗族', value: 1107 },
      { name: '满族', value: 1042 }, { name: '彝族', value: 983 },
      { name: '土家族', value: 959 }, { name: '藏族', value: 706 },
      { name: '蒙古族', value: 629 }, { name: '布依族', value: 358 },
      { name: '侗族', value: 350 }, { name: '瑶族', value: 331 },
      { name: '白族', value: 209 }, { name: '哈尼族', value: 173 },
      { name: '朝鲜族', value: 170 }, { name: '黎族', value: 160 },
      { name: '哈萨克族', value: 156 }, { name: '傣族', value: 133 }
    ].reverse()

    barChart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '15%', bottom: '3%', containLabel: true },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, axisLabel: { color: '#999' } },
      yAxis: { type: 'category', data: dataTop.map(i => i.name), axisLabel: { color: '#fff', fontSize: 13 } },
      series: [{
        name: '人口(万人)',
        type: 'bar',
        data: dataTop.map(i => i.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#4caf50' },
            { offset: 1, color: '#2e7d32' }
          ]),
          borderRadius: [0, 5, 5, 0]
        },
        label: { show: true, position: 'right', color: '#4caf50', formatter: '{c}万' }
      }]
    })
  }

  // 初始化底部柱状图 (万人级别以下)
  const bottomDom = document.getElementById('ethnic-bottom-chart')
  if (bottomDom) {
    bottomChart = echarts.init(bottomDom)
    const dataBottom = [
       { name: '门巴族', value: 11130 },
       { name: '鄂伦春族', value: 9168 },
       { name: '独龙族', value: 7310 },
       { name: '赫哲族', value: 5373 },
       { name: '珞巴族', value: 4237 },
       { name: '塔塔尔族', value: 3544 },
       { name: '高山族', value: 3479 }
    ] // 已经是从多到少排列

    bottomChart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '15%', bottom: '3%', containLabel: true },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, axisLabel: { color: '#999' } },
      yAxis: { type: 'category', data: dataBottom.map(i => i.name).reverse(), axisLabel: { color: '#fff', fontSize: 13 } },
      series: [{
        name: '人口(人)',
        type: 'bar',
        data: dataBottom.map(i => i.value).reverse(),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#ffa726' },
            { offset: 1, color: '#ef6c00' }
          ]),
          borderRadius: [0, 5, 5, 0]
        },
        label: { show: true, position: 'right', color: '#ffa726', formatter: '{c}人' }
      }]
    })
  }

  window.addEventListener('resize', () => {
    pieChart?.resize()
    barChart?.resize()
    bottomChart?.resize()
  })
})

onBeforeUnmount(() => {
  pieChart?.dispose()
  barChart?.dispose()
  bottomChart?.dispose()
})
</script>

<style scoped>
.ethnic-page-container {
  background: #1a1a1a;
  padding: 24px;
  border-radius: 12px;
  margin-top: 20px;
  color: #fff;
}

.ethnic-overview {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.ethnic-charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 1100px) {
  .ethnic-charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .ethnic-overview {
    grid-template-columns: 1fr;
  }
}
/* ... 保持原有样式不变 ... */
.overview-card, .ethnic-detail-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.overview-card h3, .ethnic-detail-card h3 {
  margin-top: 0;
  font-size: 18px;
  color: #42a5f5;
  border-left: 4px solid #42a5f5;
  padding-left: 12px;
  margin-bottom: 15px;
}

.info-text-box {
  background: rgba(66, 165, 245, 0.05);
}

.quick-facts {
  list-style: none;
  padding: 0;
}

.quick-facts li {
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.6;
  border-bottom: 1px dashed rgba(255,255,255,0.1);
  padding-bottom: 8px;
}

.quick-facts li strong {
  color: #ffca28;
}

.chart-desc {
  font-size: 12px;
  color: #888;
  margin-bottom: 20px;
}

:deep(.vp-doc) h1 {
  margin-bottom: 10px;
}
</style>
