---
title: 中国地势地貌概览
aside: false
---

# 中国地势地貌概览

中国地势西高东低，呈三级阶梯状分布。这种地势对气候、河流流向及经济发展都有深远影响。

<ClientOnly>
  <div class="terrain-page-container">
    <!-- 1. 五种基本陆地地形占比 -->
    <div class="terrain-section">
      <div class="chart-card">
        <h3>1. 五种基本陆地地形占比</h3>
        <p class="chart-desc">中国山区面积广大，占全国总面积的2/3</p>
        <div id="terrain-type-pie" style="width: 100%; height: 350px;"></div>
      </div>
      <div class="info-card terrain-facts">
        <h3>地势特征</h3>
        <ul class="fact-list">
          <li><strong>一、二级阶梯界线：</strong>昆仑山脉—阿尔金山脉—祁连山脉—横断山脉。</li>
          <li><strong>二、三级阶梯界线：</strong>大兴安岭—太行山脉—巫山—雪峰山。</li>
          <li><strong>地势影响：</strong>利于海洋水汽深入；河流落差大，动力资源丰富。</li>
        </ul>
      </div>
    </div>
    <!-- 2. 四大高原与四大盆地对比 -->
    <div class="terrain-grid">
      <div class="chart-card">
        <h3>2. 四大高原面积对比</h3>
        <p class="chart-desc">单位：万平方公里</p>
        <div id="plateau-bar-chart" style="width: 100%; height: 300px;"></div>
      </div>
      <div class="chart-card">
        <h3>3. 四大盆地海拔对比</h3>
        <p class="chart-desc">单位：米 (柴达木盆地最高)</p>
        <div id="basin-bar-chart" style="width: 100%; height: 300px;"></div>
      </div>
    </div>
    <!-- 4. 三大平原面积对比 -->
    <div class="terrain-grid">
      <div class="chart-card">
        <h3>4. 三大平原面积对比</h3>
        <p class="chart-desc">单位：万平方公里 (东北平原最大)</p>
        <div id="plain-bar-chart" style="width: 100%; height: 300px;"></div>
      </div>
      <div class="info-card terrain-facts">
        <h3>丘陵与平原</h3>
        <ul class="fact-list">
          <li><strong>三大丘陵：</strong>辽东丘陵、山东丘陵、<strong>东南丘陵</strong>（我国最大）。</li>
          <li><strong>东北平原：</strong>黑土广布，我国最大平原。</li>
          <li><strong>华北平原：</strong>黄淮海冲积而成，第二大平原。</li>
          <li><strong>长江中下游平原：</strong>河网纵横，“鱼米之乡”。</li>
        </ul>
      </div>
    </div>
    <!-- 5. 五大淡水湖 -->
    <div class="terrain-section full-width">
      <div class="chart-card">
        <h3>5. 中国五大淡水湖面积排名</h3>
        <p class="chart-desc">单位：平方公里（江西鄱阳湖居首）</p>
        <div id="lake-bar-chart" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</ClientOnly>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let charts = []

onMounted(async () => {
  const echarts = await import('echarts')
  
  const initChart = (id, option) => {
    const dom = document.getElementById(id)
    if (dom) {
      const chart = echarts.init(dom)
      chart.setOption(option)
      charts.push(chart)
      return chart
    }
  }

  // 1. 地形占比饼图
  initChart('terrain-type-pie', {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    legend: { bottom: '0', textStyle: { color: '#ccc' }, itemWidth: 10, itemHeight: 10 },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 8, borderColor: '#1a1a1a', borderWidth: 2 },
      label: { show: true, color: '#fff', formatter: '{b}\n{d}%' },
      data: [
        { value: 33, name: '山地', itemStyle: { color: '#5470c6' } },
        { value: 26, name: '高原', itemStyle: { color: '#91cc75' } },
        { value: 19, name: '盆地', itemStyle: { color: '#fac858' } },
        { value: 12, name: '平原', itemStyle: { color: '#ee6666' } },
        { value: 10, name: '丘陵', itemStyle: { color: '#73c0de' } }
      ]
    }]
  })

  // 2. 四大高原面积 (万平方公里)
  initChart('plateau-bar-chart', {
    backgroundColor: 'transparent',
    grid: { top: 40, bottom: 40, left: 50, right: 20 },
    xAxis: { type: 'category', data: ['青藏', '内蒙古', '黄土', '云贵'], axisLabel: { color: '#ccc' } },
    yAxis: { type: 'value', name: '万km²', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, axisLabel: { color: '#999' } },
    series: [{
      data: [250, 70, 50, 50],
      type: 'bar',
      itemStyle: { color: '#91cc75', borderRadius: [5, 5, 0, 0] },
      label: { show: true, position: 'top', color: '#fff' }
    }]
  })

  // 3. 四大盆地平均海拔 (米)
  initChart('basin-bar-chart', {
    backgroundColor: 'transparent',
    grid: { top: 40, bottom: 40, left: 60, right: 20 },
    xAxis: { type: 'category', data: ['柴达木', '塔里木', '准噶尔', '四川'], axisLabel: { color: '#ccc' } },
    yAxis: { type: 'value', name: '海拔(米)', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, axisLabel: { color: '#999' } },
    series: [{
      data: [3000, 1000, 500, 500],
      type: 'bar',
      itemStyle: { color: '#fac858', borderRadius: [5, 5, 0, 0] },
      label: { show: true, position: 'top', color: '#fff' }
    }]
  })

  // 4. 三大平原面积对比 (万平方公里)
  initChart('plain-bar-chart', {
    backgroundColor: 'transparent',
    grid: { top: 40, bottom: 40, left: 50, right: 20 },
    xAxis: { type: 'category', data: ['东北平原', '华北平原', '长江中下游'], axisLabel: { color: '#ccc' } },
    yAxis: { type: 'value', name: '万km²', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, axisLabel: { color: '#999' } },
    series: [{
      data: [35, 30, 20],
      type: 'bar',
      itemStyle: { color: '#ee6666', borderRadius: [5, 5, 0, 0] },
      label: { show: true, position: 'top', color: '#fff' }
    }]
  })

  // 5. 五大淡水湖面积 (平方公里)
  initChart('lake-bar-chart', {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { top: 40, bottom: 60, left: 80, right: 40 },
    xAxis: { 
      type: 'value', 
      name: 'km²', 
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, 
      axisLabel: { color: '#999' } 
    },
    yAxis: { 
      type: 'category', 
      data: ['鄱阳湖', '洞庭湖', '太湖', '洪泽湖', '巢湖'].reverse(), 
      axisLabel: { color: '#fff' } 
    },
    series: [{
      name: '面积',
      type: 'bar',
      data: [3960, 2740, 2445, 2069, 780].reverse(),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#1890ff' },
          { offset: 1, color: '#003a8c' }
        ]),
        borderRadius: [0, 5, 5, 0]
      },
      label: { show: true, position: 'right', color: '#40a9ff' }
    }]
  })

  window.addEventListener('resize', handleResize)
})

const handleResize = () => {
  charts.forEach(chart => chart.resize())
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  charts.forEach(chart => chart.dispose())
})
</script>

<style scoped>
.terrain-page-container {
  background: #1a1a1a;
  padding: 24px;
  border-radius: 12px;
  margin-top: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.terrain-section {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}

.terrain-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.full-width {
  grid-template-columns: 1fr;
}

@media (max-width: 900px) {
  .terrain-section, .terrain-grid {
    grid-template-columns: 1fr;
  }
}

.chart-card, .info-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-card h3, .info-card h3 {
  margin-top: 0;
  font-size: 18px;
  color: #fb8c00;
  border-left: 4px solid #fb8c00;
  padding-left: 12px;
  margin-bottom: 15px;
}

.terrain-facts {
  background: rgba(251, 140, 0, 0.05);
}

.fact-list {
  list-style: none;
  padding: 0;
}

.fact-list li {
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.6;
  border-bottom: 1px dashed rgba(255,255,255,0.1);
  padding-bottom: 8px;
}

.fact-list li strong {
  color: #fb8c00;
}

.chart-desc {
  font-size: 12px;
  color: #888;
  margin-bottom: 15px;
}

:deep(.vp-doc) h1 {
  margin-bottom: 10px;
}
</style>