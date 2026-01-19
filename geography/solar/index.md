---
title: 二十四节气日历
aside: false
---

# 二十四节气日历

二十四节气是高频考点。它起源于黄河流域，通过观察太阳周年运动，将一年划分为24个等份。

<ClientOnly>
  <div class="solar-page-container">
    <div id="calendar-container"></div>
    <div class="solar-info-panel">
      <div class="info-card" id="current-solar-term">
        <h3>节气常识归纳</h3>
        <ul class="solar-quiz-list">
          <li><strong>季节标志：</strong>立春、立夏、立秋、立冬</li>
          <li><strong>天文转折：</strong>春分、秋分、夏至、冬至</li>
          <li><strong>气温变化：</strong>小暑、大暑、处暑、白露、寒露、霜降、小寒、大寒</li>
          <li><strong>降水现象：</strong>雨水、谷雨、小雪、大雪</li>
          <li><strong>物候规律：</strong>惊蛰、清明、小满、芒种</li>
        </ul>
        <div class="solar-mnemonic">
          <h4>记忆口诀</h4>
          <p>春雨惊春清谷天，夏满芒夏暑相连。</p>
          <p>秋处露秋寒霜降，冬雪雪冬小大寒。</p>
        </div>
      </div>
    </div>
  </div>
</ClientOnly>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let chartInstance = null

onMounted(async () => {
  const echarts = await import('echarts')
  const dom = document.getElementById('calendar-container')
  if (!dom) return

  chartInstance = echarts.init(dom)
  
  // 考公常识：节气循环从立春开始，到大寒结束
  const solarTermsData = [
    // 2026年
    ['2026-02-04', '立春'], ['2026-02-18', '雨水'],
    ['2026-03-05', '惊蛰'], ['2026-03-20', '春分'],
    ['2026-04-05', '清明'], ['2026-04-20', '谷雨'],
    ['2026-05-05', '立夏'], ['2026-05-21', '小满'],
    ['2026-06-05', '芒种'], ['2026-06-21', '夏至'],
    ['2026-07-07', '小暑'], ['2026-07-22', '大暑'],
    ['2026-08-07', '立秋'], ['2026-08-23', '处暑'],
    ['2026-09-07', '白露'], ['2026-09-22', '秋分'],
    ['2026-10-08', '寒露'], ['2026-10-23', '霜降'],
    ['2026-11-07', '立冬'], ['2026-11-22', '小雪'],
    ['2026-12-07', '大雪'], ['2026-12-21', '冬至'],
    // 2027年（完成一个轮回）
    ['2027-01-05', '小寒'], ['2027-01-20', '大寒']
  ]

  const option = {
    backgroundColor: 'transparent',
    title: {
      top: 10,
      left: 'center',
      text: '二十四节气标准循环 (2026立春 - 2027大寒)',
      textStyle: { color: '#fff', fontSize: 20 }
    },
    tooltip: {
      formatter: function (p) {
        return '日期: ' + p.value[0] + '<br />节气: ' + p.value[2];
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        color: ['#e0f7fa', '#4caf50']
      }
    },
    calendar: {
      top: 80,
      left: 60,
      right: 40,
      bottom: 20,
      range: ['2026-02-01', '2027-01-31'],
      cellSize: ['auto', 20],
      splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.1)', width: 1, type: 'solid' } },
      yearLabel: { show: false }, // 跨年显示隐藏年份大标签，由月份自行标识
      itemStyle: { color: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
      dayLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, nameMap: 'cn' },
      monthLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, nameMap: 'cn' }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 10,
        label: {
          show: true,
          formatter: function (p) {
            return p.value[2];
          },
          fontSize: 10,
          color: '#ffeb3b',
          position: 'top',
          offset: [0, -2]
        },
        data: solarTermsData.map(item => [item[0], 1, item[1]]),
        itemStyle: {
          color: '#ffeb3b',
          shadowBlur: 10,
          shadowColor: '#ffeb3b'
        }
      }
    ]
  }

  chartInstance.setOption(option)
  window.addEventListener('resize', () => chartInstance && chartInstance.resize())
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style scoped>
.solar-page-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  min-height: 800px;
}

#calendar-container {
  width: 100%;
  height: 400px;
}

.solar-info-panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.info-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eee;
}

.info-card h3 {
  color: #ffeb3b;
  margin-top: 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 10px;
}

.solar-quiz-list {
  list-style: none;
  padding: 0;
}

.solar-quiz-list li {
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.6;
}

.solar-quiz-list li strong {
  color: #4caf50;
  display: inline-block;
  width: 80px;
}

.solar-mnemonic {
  margin-top: 20px;
  padding: 15px;
  background: rgba(76, 175, 80, 0.1);
  border-left: 4px solid #4caf50;
  border-radius: 4px;
}

.solar-mnemonic h4 {
  margin: 0 0 10px 0;
  color: #4caf50;
}

.solar-mnemonic p {
  margin: 5px 0;
  font-family: "楷体", serif;
  font-size: 16px;
  letter-spacing: 1px;
}

:deep(.vp-doc) h1 {
  margin-bottom: 0;
}
</style>