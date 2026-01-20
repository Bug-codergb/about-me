---
title: 中国3D地理分布
aside: false
---

# 3D 中国地图分布图

通过 3D 视觉可视化，直观展示中国各省份地理位置、行政区域及省会分布。

<ClientOnly>
  <ChinaMap3D />
</ClientOnly>

<script setup>
import { onMounted, onUnmounted, ref, defineComponent, h } from 'vue'

const ChinaMap3D = defineComponent({
  setup() {
    const container = ref(null)
    let scene, camera, renderer, labelRenderer, controls, raycaster, mouse
    let mapGroup = null
    let tooltip = null

    // 省份 -> 省会 映射表
    const capitalMap = {
      '北京市': '北京', '天津市': '天津', '上海市': '上海', '重庆市': '重庆',
      '河北省': '石家庄', '山西省': '太原', '辽宁省': '沈阳', '吉林省': '长春',
      '黑龙江省': '哈尔滨', '江苏省': '南京', '浙江省': '杭州', '安徽省': '合肥',
      '福建省': '福州', '江西省': '南昌', '山东省': '济南', '河南省': '郑州',
      '湖北省': '武汉', '湖南省': '长沙', '广东省': '广州', '海南省': '海口',
      '四川省': '成都', '贵州省': '贵阳', '云南省': '昆明', '陕西省': '西安',
      '甘肃省': '兰州', '青海省': '西宁', '台湾省': '台北', '内蒙古自治区': '呼和浩特',
      '广西壮族自治区': '南宁', '西藏自治区': '拉萨', '宁夏回族自治区': '银川',
      '新疆维吾尔自治区': '乌鲁木齐', '香港特别行政区': '香港', '澳门特别行政区': '澳门'
    }

    // 随机颜色
    const getColor = () => {
      const colors = [
        '#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399',
        '#7265e6', '#ffbf00', '#00a2ae', '#f5222d', '#722ed1',
        '#eb2f96', '#fa8c16', '#a0d911', '#13c2c2', '#52c41a'
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    onMounted(async () => {
      if (typeof window === 'undefined') return

      // 动态导入依赖
      const THREE = await import('three')
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls')
      const { CSS2DRenderer, CSS2DObject } = await import('three/examples/jsm/renderers/CSS2DRenderer')
      const d3 = await import('d3-geo')

      // 1. 初始化场景
      scene = new THREE.Scene()
      scene.background = new THREE.Color('#050510')

      // 2. 初始化相机
      const width = container.value.clientWidth
      const height = 800
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
      camera.position.set(0, -60, 100)

      // 3. 初始化渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.value.appendChild(renderer.domElement)

      // 3a. 初始化标签渲染器 (CSS2D)
      labelRenderer = new CSS2DRenderer()
      labelRenderer.setSize(width, height)
      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = '0px'
      labelRenderer.domElement.style.pointerEvents = 'none'
      container.value.appendChild(labelRenderer.domElement)

      // 4. 控制器
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      
      // 5. 灯光
      scene.add(new THREE.AmbientLight(0xffffff, 0.8))
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(200, 300, 500)
      scene.add(directionalLight)

      raycaster = new THREE.Raycaster()
      mouse = new THREE.Vector2()

      mapGroup = new THREE.Group()
      scene.add(mapGroup)

      try {
        const response = await fetch('/about-me/map.json')
        const data = await response.json()

        const projection = d3.geoMercator()
          .center([104.0, 37.5])
          .scale(115) 
          .translate([0, 0])

        data.features.forEach(feature => {
          if (!feature.geometry) return
          
          const provinceGroup = new THREE.Group()
          const color = getColor()
          const name = feature.properties.name

          const createMesh = (coordinates) => {
            const shape = new THREE.Shape()
            coordinates.forEach((points) => {
              points.forEach((point, j) => {
                const [x, y] = projection(point)
                if (j === 0) shape.moveTo(x, -y)
                else shape.lineTo(x, -y)
              })
            })

            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 2, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.2
            })
            const material = new THREE.MeshStandardMaterial({
              color: color, transparent: true, opacity: 0.8, metalness: 0.5, roughness: 0.3
            })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.userData = { originalColor: color, name: name }
            provinceGroup.add(mesh)

            // 边缘线条
            const edges = new THREE.EdgesGeometry(geometry)
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#ffffff', opacity: 0.2, transparent: true }))
            provinceGroup.add(line)
          }

          if (feature.geometry.type === 'Polygon') createMesh(feature.geometry.coordinates)
          else if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(coords => createMesh(coords))
          }

          // 添加省会点及名称
          const center = feature.properties.center || feature.properties.centroid
          if (center) {
            const [x, y] = projection(center)
            
            // 黄金点
            const dot = new THREE.Mesh(
              new THREE.SphereGeometry(0.4, 16, 16),
              new THREE.MeshBasicMaterial({ color: '#ffeb3b' })
            )
            dot.position.set(x, -y, 2.5)
            provinceGroup.add(dot)

            // 省会名称文字 (CSS2D)
            const cityDiv = document.createElement('div')
            cityDiv.className = 'province-label'
            cityDiv.textContent = capitalMap[name] || name
            const label = new CSS2DObject(cityDiv)
            label.position.set(x, -y, 3.5)
            provinceGroup.add(label)
          }

          mapGroup.add(provinceGroup)
        })

      } catch (err) {
        console.error('Map Load Error:', err)
      }

      // 提示框
      tooltip = document.createElement('div')
      Object.assign(tooltip.style, {
        position: 'absolute', padding: '8px 12px', background: 'rgba(0,0,0,0.8)',
        color: '#fff', borderRadius: '4px', pointerEvents: 'none', display: 'none',
        zIndex: '1000', border: '1px solid #409eff', fontSize: '14px'
      })
      document.body.appendChild(tooltip)

      const animate = () => {
        requestAnimationFrame(animate)
        if (controls) controls.update()
        
        if (mapGroup && camera && renderer) {
          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObjects(mapGroup.children, true)
          
          mapGroup.children.forEach(p => {
            p.children.forEach(c => {
              if (c.type === 'Mesh' && c.userData.originalColor) {
                c.material.color.set(c.userData.originalColor)
                c.material.opacity = 0.8
              }
            })
          })

          if (intersects.length > 0) {
            const obj = intersects[0].object
            if (obj.userData.name) {
              obj.material.color.set('#ffffff')
              obj.material.opacity = 1
              tooltip.innerText = obj.userData.name
              tooltip.style.display = 'block'
            }
          } else tooltip.style.display = 'none'

          renderer.render(scene, camera)
          labelRenderer.render(scene, camera)
        }
      }

      const onMouseMove = (e) => {
        if (!container.value) return
        const rect = container.value.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / width) * 2 - 1
        mouse.y = -((e.clientY - rect.top) / height) * 2 + 1
        tooltip.style.left = e.clientX + 15 + 'px'
        tooltip.style.top = e.clientY + 15 + 'px'
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('resize', () => {
        if (!container.value) return
        const w = container.value.clientWidth
        camera.aspect = w / height
        camera.updateProjectionMatrix()
        renderer.setSize(w, height)
        labelRenderer.setSize(w, height)
      })
      animate()
    })

    onUnmounted(() => {
      if (tooltip?.parentNode) tooltip.parentNode.removeChild(tooltip)
    })

    return () => h('div', { 
      ref: container, 
      style: { width: '100%', height: '800px', position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#050510' } 
    })
  }
})
</script>

<style>
.province-label {
  color: #fff;
  font-size: 10px;
  text-shadow: 1px 1px 2px #000;
  pointer-events: none;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.3);
  padding: 1px 3px;
  border-radius: 3px;
}
</style>
