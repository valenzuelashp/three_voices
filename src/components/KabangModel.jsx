import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

export default function KabangModel({
  onOpen,
  onRotationChange,
  zoomed = false,
  initialRotation = zoomed ? -0.82 : -0.22,
}) {
  const hostRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
    const cameraStart = zoomed
      ? new THREE.Vector3(10.5, 7.2, 15)
      : new THREE.Vector3(7.5, 5.2, 10.5)
    const cameraTarget = zoomed
      ? new THREE.Vector3(8.5, 6.1, 10.8)
      : new THREE.Vector3(7.5, 5.2, 10.5)
    const cameraLookAt = new THREE.Vector3(0, zoomed ? 2.35 : 2.25, 0)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    camera.position.copy(zoomed && reducedMotion ? cameraTarget : cameraStart)
    camera.lookAt(cameraLookAt)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    host.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0xfff7e8, 0x3b3027, 2.4))
    const key = new THREE.DirectionalLight(0xfff1cf, 4.8)
    key.position.set(-5, 9, 7)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    key.shadow.camera.left = -7
    key.shadow.camera.right = 7
    key.shadow.camera.top = 7
    key.shadow.camera.bottom = -7
    scene.add(key)

    const rim = new THREE.DirectionalLight(0xc7dbd4, 2.2)
    rim.position.set(7, 5, -6)
    scene.add(rim)

    const turntable = new THREE.Group()
    turntable.rotation.y = initialRotation
    scene.add(turntable)

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(4.5, 64),
      new THREE.ShadowMaterial({ opacity: 0.18 }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.78
    ground.receiveShadow = true
    turntable.add(ground)

    let targetRotation = turntable.rotation.y
    let dragging = false
    let moved = false
    let previousX = 0
    let model = null
    let disposed = false

    const loader = new GLTFLoader()
    loader.load(
      "/kabang-bronze.glb",
      (gltf) => {
        if (disposed) return
        model = gltf.scene
        model.traverse((object) => {
          if (!object.isMesh) return
          object.castShadow = true
          object.receiveShadow = true
          if (object.material) {
            const materials = Array.isArray(object.material) ? object.material : [object.material]
            materials.forEach((material) => {
              material.roughness = material.roughness ?? 0.18
              material.metalness = material.metalness ?? 0.88
              material.envMapIntensity = 1.25
            })
          }
        })

        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const maxDimension = Math.max(size.x, size.y, size.z)
        const scale = maxDimension > 0 ? 5.3 / maxDimension : 1

        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))

        const scaledBox = new THREE.Box3().setFromObject(model)
        model.position.y -= scaledBox.min.y
        model.position.y -= 0.72

        turntable.add(model)
        setLoading(false)
        setLoadError("")
      },
      undefined,
      (error) => {
        if (!disposed) {
          setLoading(false)
          setLoadError(error?.message || "The 3D model could not be loaded.")
        }
      },
    )

    function onPointerDown(event) {
      dragging = true
      moved = false
      previousX = event.clientX
      host.setPointerCapture?.(event.pointerId)
    }

    function onPointerMove(event) {
      if (!dragging) return
      const delta = event.clientX - previousX
      if (Math.abs(delta) > 2) moved = true
      previousX = event.clientX
      targetRotation += delta * 0.012
      targetRotation = THREE.MathUtils.clamp(targetRotation, -1.35, 1.35)
      onRotationChange?.(targetRotation)
    }

    function onPointerUp(event) {
      dragging = false
      host.releasePointerCapture?.(event.pointerId)
    }

    function onClick() {
      if (!moved && !zoomed) onOpen?.(host.getBoundingClientRect())
    }

    function onKeyDown(event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        targetRotation = THREE.MathUtils.clamp(targetRotation - 0.18, -1.35, 1.35)
        onRotationChange?.(targetRotation)
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        targetRotation = THREE.MathUtils.clamp(targetRotation + 0.18, -1.35, 1.35)
        onRotationChange?.(targetRotation)
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        if (!zoomed) onOpen?.(host.getBoundingClientRect())
      }
    }

    host.addEventListener("pointerdown", onPointerDown)
    host.addEventListener("pointermove", onPointerMove)
    host.addEventListener("pointerup", onPointerUp)
    host.addEventListener("click", onClick)
    host.addEventListener("keydown", onKeyDown)
    if (zoomed) host.focus()

    const resize = () => {
      const width = host.clientWidth
      const height = host.clientHeight
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.fov = zoomed && width < 768 ? 40 : 28
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    let frame = 0
    let zoomProgress = zoomed && !reducedMotion ? 0 : 1
    function animate() {
      if (zoomProgress < 1) {
        zoomProgress = Math.min(1, zoomProgress + 0.025)
        const eased = 1 - Math.pow(1 - zoomProgress, 3)
        camera.position.lerpVectors(cameraStart, cameraTarget, eased)
      }
      camera.lookAt(cameraLookAt)
      turntable.rotation.y += (targetRotation - turntable.rotation.y) * 0.09
      const direction = zoomed ? Math.sign(targetRotation) : 0
      const horizontalOffset = direction * (host.clientWidth < 768 ? -0.35 : -1.45)
      turntable.position.x += (horizontalOffset - turntable.position.x) * 0.08
      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(animate)
    }
    animate()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      host.removeEventListener("pointerdown", onPointerDown)
      host.removeEventListener("pointermove", onPointerMove)
      host.removeEventListener("pointerup", onPointerUp)
      host.removeEventListener("click", onClick)
      host.removeEventListener("keydown", onKeyDown)
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [initialRotation, onOpen, onRotationChange, zoomed])

  return (
    <div
      ref={hostRef}
      className={`kabang-three-host${zoomed ? " is-zoomed" : ""}`}
      role={zoomed ? "group" : "button"}
      tabIndex={0}
      aria-label={zoomed ? "Drag or use left and right arrow keys to turn Kabang" : "Click Kabang's statue to explore her story"}
      aria-busy={loading}
    >
      {loading && !loadError ? <span className="kabang-model-status">Loading 3D statue...</span> : null}
      {loadError ? <span className="kabang-model-status is-error">{loadError}</span> : null}
    </div>
  )
}
