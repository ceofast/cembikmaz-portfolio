import { useEffect, useState } from 'react'

export default function useCountUp(target, duration = 1600, startCounting = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return

    const num = parseInt(target) || 0
    if (num === 0) { setCount(0); return }

    let start = 0
    const startTime = performance.now()

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * num)

      if (current !== start) {
        start = current
        setCount(current)
      }

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [target, duration, startCounting])

  return count
}
