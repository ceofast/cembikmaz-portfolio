import { useState, useEffect } from 'react'

export default function RotatingText({ words, interval = 3000, style = {} }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % words.length)
        setVisible(true)
      }, 300)
    }, interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span style={{
      ...style,
      display: 'inline-block',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(6px)',
    }}>
      {words[index]}
    </span>
  )
}
