---
title: 3D 全球国家分布
aside: false
---

# � 3D 全球国家分布

这是一个交互式 3D 全球地图，通过 Three.js 渲染地表纹理与行政边界，直观展示全球国家分布。

<ClientOnly>
  <Earth3D />
</ClientOnly>

<script setup>
import { onMounted, onUnmounted, ref, defineComponent, h } from 'vue'

const Earth3D = defineComponent({
  setup() {
    const container = ref(null)
    const currentCountry = ref('移动鼠标以查看国家')
    let scene, camera, renderer, labelRenderer, controls, animationId
    let earth, clouds, stars, bordersGroup, labelsGroup

    // 坐标转换函数：经纬度转 3D 向量
    const lglt2xyz = (lng, lat, radius) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 90) * (Math.PI / 180)
      return {
        x: -radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta)
      }
    }

    onMounted(async () => {
      if (typeof window === 'undefined') return

      const THREE = await import('three')
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls')
      const { CSS2DRenderer, CSS2DObject } = await import('three/examples/jsm/renderers/CSS2DRenderer')

      // 1. 初始化场景
      scene = new THREE.Scene()
      scene.background = new THREE.Color('#030307')

      const width = container.value.clientWidth
      const height = 700
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000)
      camera.position.set(0, 50, 350)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.value.appendChild(renderer.domElement)

      labelRenderer = new CSS2DRenderer()
      labelRenderer.setSize(width, height)
      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = '0px'
      labelRenderer.domElement.style.pointerEvents = 'none'
      container.value.appendChild(labelRenderer.domElement)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.autoRotate = false // 暂时关闭自动旋转以便寻找特定国家
      controls.minDistance = 120
      controls.maxDistance = 800

      // 2. 光源
      scene.add(new THREE.AmbientLight(0xffffff, 0.4))
      const sun = new THREE.DirectionalLight(0xffffff, 1.2)
      sun.position.set(5, 3, 5)
      scene.add(sun)

      // 3. 地球球体
      const loader = new THREE.TextureLoader()
      const RADIUS = 100
      
      const earthTex = loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg')
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTex,
        shininess: 5,
        transparent: true,
        opacity: 0.95
      })
      earth = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 64, 64), earthMaterial)
      scene.add(earth)

      // 4. 国家边界
      bordersGroup = new THREE.Group()
      scene.add(bordersGroup)
      labelsGroup = new THREE.Group()
      scene.add(labelsGroup)

      try {
        const res = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
        const geoData = await res.json()

        geoData.features.forEach(feature => {
          const { geometry, properties } = feature
          const type = geometry.type
          const coords = geometry.coordinates

          const drawBorders = (polygon) => {
            const points = []
            polygon.forEach(coord => {
              const { x, y, z } = lglt2xyz(coord[0], coord[1], RADIUS + 0.2)
              points.push(new THREE.Vector3(x, y, z))
            })
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
            const lineMaterial = new THREE.LineBasicMaterial({ 
              color: properties.name === 'China' ? '#ffeb3b' : '#409eff', 
              opacity: 0.6,
              transparent: true 
            })
            bordersGroup.add(new THREE.Line(lineGeometry, lineMaterial))
          }

          if (type === 'Polygon') {
            coords.forEach(poly => drawBorders(poly))
          } else if (type === 'MultiPolygon') {
            coords.forEach(multi => multi.forEach(poly => drawBorders(poly)))
          }

          // 添加主要国家标签（过滤掉太小的国家以防混乱）
          const importantCountries = ['China', 'USA', 'Russia', 'Brazil', 'Canada', 'Australia', 'India', 'France', 'Egypt', 'South Africa']
          if (importantCountries.includes(properties.name)) {
            // 解析各国的中心点（GeoJSON 可能没有直接提供，简易方案取坐标平均值）
            const flatCoords = coords.flat(Infinity)
            let lonSum = 0, latSum = 0
            for(let i=0; i<flatCoords.length; i+=2) {
              lonSum += flatCoords[i]
              latSum += flatCoords[i+1]
            }
            const avgLon = lonSum / (flatCoords.length / 2)
            const avgLat = latSum / (flatCoords.length / 2)
            
            const { x, y, z } = lglt2xyz(avgLon, avgLat, RADIUS + 2)
            const div = document.createElement('div')
            div.className = 'country-label'
            div.textContent = properties.name === 'China' ? '中国' : properties.name
            if (properties.name === 'China') div.classList.add('highlight-china')
            
            const label = new CSS2DObject(div)
            label.position.set(x, y, z)
            labelsGroup.add(label)
          }
        })
      } catch (e) {
        console.error('Borders Load Fail', e)
      }

      // 5. 星空
      const starGeometry = new THREE.BufferGeometry()
      const starVertices = []
      for (let i = 0; i < 3000; i++) {
        const x = (Math.random() - 0.5) * 2000
        const y = (Math.random() - 0.5) * 2000
        const z = (Math.random() - 0.5) * 2000
        starVertices.push(x, y, z)
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
      stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0x888888, size: 0.5 }))
      scene.add(stars)

      const animate = () => {
        animationId = requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
        labelRenderer.render(scene, camera)
      }

      animate()

      window.addEventListener('resize', () => {
        if (!container.value) return
        const w = container.value.clientWidth
        camera.aspect = w / height
        camera.updateProjectionMatrix()
        renderer.setSize(w, height)
        labelRenderer.setSize(w, height)
      })
    })

    onUnmounted(() => {
      cancelAnimationFrame(animationId)
      if (renderer) renderer.dispose()
    })

    return () => h('div', {
      style: { position: 'relative' }
    }, [
      h('div', {
        ref: container,
        style: { width: '100%', height: '700px', background: '#030307', borderRadius: '16px', overflow: 'hidden' }
      }),
      h('div', {
        style: { position: 'absolute', bottom: '20px', left: '20px', color: '#aaa', fontSize: '12px', pointerEvents: 'none' }
      }, '提示：中国已用黄色高亮标注，支持鼠标旋转/缩放')
    ])
  }
})
</script>

<style>
.country-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 6px;
  border-radius: 4px;
  pointer-events: none;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.highlight-china {
  color: #ffeb3b !important;
  font-weight: bold;
  font-size: 13px !important;
  border-color: #ffeb3b !important;
  background: rgba(255, 235, 59, 0.1) !important;
}
</style>