import { useEffect, useRef, useState } from "react"

const LIFESPAN = 1400 // ms
const MAX_POINTS = 10

function getSmoothPath(points) {
  if (points.length < 2) return ""

  let d = `M ${points[0].x} ${points[0].y}`

  for (let i = 1; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]

    const cx = (p1.x + p2.x) / 2
    const cy = (p1.y + p2.y) / 2

    d += ` Q ${p1.x} ${p1.y} ${cx} ${cy}`
  }

  return d
}

export default function PenTrail({ stroke = "#fff" }) {
  const ref = useRef(null)
  const pointsRef = useRef([])
  const [, forceRender] = useState(0)

  // Mouse tracking
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return

      const last = pointsRef.current.at(-1)
      if (last && Math.hypot(x - last.x, y - last.y) < 1.5) return

      pointsRef.current.push({
        x,
        y,
        t: performance.now()
      })

      if (pointsRef.current.length > MAX_POINTS) {
        pointsRef.current.shift()
      }
    }

    el.addEventListener("mousemove", move)
    return () => el.removeEventListener("mousemove", move)
  }, [])

  // Lifespan + fade loop
  useEffect(() => {
    let raf

    const tick = () => {
      const now = performance.now()
      pointsRef.current = pointsRef.current.filter(
        p => now - p.t < LIFESPAN
      )

      forceRender(n => n + 1)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const path = getSmoothPath(pointsRef.current)

  return (
    <div
      ref={ref}
      className="w-screen h-[80vh]"
      style={{
        position: "absolute",
        overflow: "hidden",
        zIndex: 0
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none"
        }}
      >
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
