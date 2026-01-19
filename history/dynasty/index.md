---
title: 中国历朝历代时间线
aside: false
---

# 中国历朝历代时间线

通过时间轴形式串联中国历史上各主要朝代、开国皇帝及建国时间。

<ClientOnly>
  <div class="dynasty-timeline-container">
    <div id="dynasty-chart" style="width: 100%; height: 800px;"></div>
    <div class="dynasty-info-grid">
      <div class="info-card">
        <h3>核心考点归纳</h3>
        <ul class="exam-list">
          <li><strong>第一个统一国家：</strong>秦朝（前221年），秦始皇嬴政。</li>
          <li><strong>“汉承秦制”：</strong>汉朝延续并完善了秦朝的中央集权制度。</li>
          <li><strong>盛世时期：</strong>贞观之治（唐太宗）、开元盛世（唐玄宗）、康乾盛世（清朝）。</li>
          <li><strong>最后一个封建王朝：</strong>清朝（1912年辛亥革命后宣告终结）。</li>
        </ul>
      </div>
      <div class="info-card">
        <h3>朝代更替口诀</h3>
        <p class="formula">
          夏商与西周，东周分两段；<br/>
          春秋和战国，一统秦两汉；<br/>
          三分魏蜀吴，二晋前后延；<br/>
          南北朝并立，隋唐五代传；<br/>
          宋元明清后，皇朝至此完。
        </p>
      </div>
    </div>
  </div>
    <!-- 历史常识锦囊 -->
    <div class="dynasty-knowledge-grid">
      <div class="info-card highlight">
        <h3>✨ 千古盛世/治世</h3>
        <div class="knowledge-item"><strong>文景之治：</strong>西汉汉文帝、汉景帝</div>
        <div class="knowledge-item"><strong>光武中兴：</strong>东汉光武帝刘秀</div>
        <div class="knowledge-item"><strong>开皇之治：</strong>隋文帝杨坚</div>
        <div class="knowledge-item"><strong>贞观之治：</strong>唐太宗李世民</div>
        <div class="knowledge-item"><strong>开元盛世：</strong>唐玄宗李隆基</div>
        <div class="knowledge-item"><strong>康乾盛世：</strong>清康熙、雍正、乾隆</div>
      </div>
      <div class="info-card">
        <h3>⚔️ 春秋五霸</h3>
        <p class="knowledge-text">齐桓公、晋文公、楚庄王、秦穆公、宋襄公</p>
        <span class="tip">(另有说法包含：吴王阖闾、越王勾践)</span>
      </div>
      <div class="info-card">
        <h3>🛡️ 战国七雄</h3>
        <p class="knowledge-text">齐、楚、秦、燕、赵、魏、韩</p>
        <span class="tip">(口诀：齐楚秦燕赵魏韩，东南西北到中间)</span>
      </div>
    </div>
</ClientOnly>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let chartInstance = null

onMounted(async () => {
  const echarts = await import('echarts')
  const dom = document.getElementById('dynasty-chart')
  if (!dom) return
  
  chartInstance = echarts.init(dom)
  
  const dynastyData = [
    { name: '夏朝', start: -2070, end: -1600, founder: '禹', type: 'ancient' },
    { name: '商朝', start: -1600, end: -1046, founder: '汤', type: 'ancient' },
    { name: '西周', start: -1046, end: -771, founder: '周武王', type: 'ancient' },
    { name: '东周', start: -770, end: -256, founder: '周平王', type: 'ancient' },
    { name: '秦朝', start: -221, end: -207, founder: '秦始皇', type: 'imperial' },
    { name: '西汉', start: -202, end: 8, founder: '汉高祖', type: 'imperial' },
    { name: '东汉', start: 25, end: 220, founder: '汉光武帝', type: 'imperial' },
    { name: '三国', start: 220, end: 280, founder: '曹丕/刘备/孙权', type: 'divided' },
    { name: '西晋', start: 265, end: 316, founder: '晋武帝司马炎', type: 'imperial' },
    { name: '东晋', start: 317, end: 420, founder: '晋元帝司马睿', type: 'divided' },
    { name: '南北朝', start: 420, end: 589, founder: '刘裕等', type: 'divided' },
    { name: '隋朝', start: 581, end: 618, founder: '隋文帝杨坚', type: 'imperial' },
    { name: '唐朝', start: 618, end: 907, founder: '唐高祖李渊', type: 'imperial' },
    { name: '五代十国', start: 907, end: 960, founder: '朱温等', type: 'divided' },
    { name: '北宋', start: 960, end: 1127, founder: '宋太祖赵匡胤', type: 'imperial' },
    { name: '南宋', start: 1127, end: 1279, founder: '宋高宗赵构', type: 'divided' },
    { name: '元朝', start: 1271, end: 1368, founder: '元世祖忽必烈', type: 'imperial' },
    { name: '明朝', start: 1368, end: 1644, founder: '明太祖朱元璋', type: 'imperial' },
    { name: '清朝', start: 1644, end: 1912, founder: '清世祖福临', type: 'imperial' }
  ]

  const colors = {
    ancient: ['#8d6e63', '#5d4037'],
    imperial: ['#fbc02d', '#f57f17'],
    divided: ['#78909c', '#455a64']
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      formatter: function(p) {
        const d = p.data;
        return `<div style="font-weight:bold;color:#ffeb3b">${d.name}</div>
                时期：${d.start < 0 ? '前' + Math.abs(d.start) : d.start}年 - ${d.end < 0 ? '前' + Math.abs(d.end) : d.end}年<br/>
                历时：${d.end - d.start} 年<br/>
                开国君主：${d.founder}`;
      }
    },
    grid: { left: '15%', right: '15%', top: '5%', bottom: '5%' },
    xAxis: { 
      type: 'value',
      show: false,
      min: -150,
      max: 150
    },
    yAxis: {
      type: 'value',
      inverse: true,
      min: -2100,
      max: 2100,
      axisLabel: {
        color: '#666',
        formatter: (v) => v < 0 ? `前${Math.abs(v)}` : `${v}年`
      },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.03)' } }
    },
    series: [
      {
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 6,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#8d6e63' },
            { offset: 0.3, color: '#fbc02d' },
            { offset: 0.7, color: '#4caf50' },
            { offset: 1, color: '#2196f3' }
          ]),
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.5)'
        },
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {
          color: '#fff',
          borderColor: '#ffeb3b',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: (p) => `{name|${p.data.name}}\n{info|${p.data.year} ${p.data.founder}}`,
          rich: {
            name: { color: '#ffeb3b', fontSize: 14, fontWeight: 'bold', padding: [5, 0] },
            info: { color: '#ccc', fontSize: 11 }
          }
        },
        data: dynastyData.map((d, idx) => {
          // 使用正弦函数生成蜿蜒的 X 坐标
          const x = Math.sin(idx * 0.8) * 100;
          return {
            value: [x, d.start],
            name: d.name,
            year: d.start < 0 ? '前' + Math.abs(d.start) : d.start,
            start: d.start,
            end: d.end,
            founder: d.founder,
            label: {
              position: x > 0 ? 'right' : 'left',
              distance: 15,
              align: x > 0 ? 'left' : 'right'
            }
          };
        })
      }
    ]
  }

  chartInstance.setOption(option)
  window.addEventListener('resize', () => chartInstance?.resize())
})

onBeforeUnmount(() => {
  chartInstance?.dispose()
})
</script>

<style scoped>
.dynasty-timeline-container {
  background: #0a0a0a;
  padding: 30px;
  border-radius: 16px;
  color: #fff;
  min-height: 1600px;
}

#dynasty-chart {
  height: 1400px;
  background: radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%);
  border-radius: 12px;
  margin-bottom: 30px;
}

.dynasty-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.info-card {
  background: rgba(255,255,255,0.05);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
}

.info-card h3 {
  margin-top: 0;
  color: #4caf50;
  border-left: 4px solid #4caf50;
  padding-left: 12px;
  margin-bottom: 15px;
}

.exam-list {
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.8;
  color: #ccc;
}

.formula {
  font-family: serif;
  font-size: 18px;
  line-height: 1.8;
  color: #ffeb3b;
  text-align: center;
  background: rgba(0,0,0,0.2);
  padding: 15px;
  border-radius: 8px;
}

.dynasty-knowledge-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.knowledge-item {
  font-size: 14px;
  padding: 10px;
  margin-bottom: 4px;
  color: #ccc;
  border-radius: 8px;
  transition: background 0.2s;
}

.knowledge-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.knowledge-item strong {
  color: #ffeb3b;
  margin-right: 8px;
}

.knowledge-text {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin: 15px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  text-align: center;
}

.tip {
  display: block;
  font-size: 12px;
  color: #888;
  font-style: italic;
  margin-top: 10px;
  text-align: center;
}

.info-card.highlight {
  border: 1px solid rgba(255, 235, 59, 0.3);
  background: rgba(255, 235, 59, 0.05);
}

@media (max-width: 900px) {
  .dynasty-info-grid, .dynasty-knowledge-grid {
    grid-template-columns: 1fr;
  }
}
</style>
