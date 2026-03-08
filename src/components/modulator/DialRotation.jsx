import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const DialRotation = ({
  maxIntensity = 200,
  maxFrequency = 100,
  breathDuration = 3,
  breathIntensity = 10,
  separationAmount = 16,
  globalScale = 50,
  globalTime = 100,
  circleCount = 1,
  controlMode = 'relative',
  quantizeWaves = false
}) => {
  const circleRef = useRef(null)
  const circlePathRef = useRef(null)
  const circlePathsRef = useRef([])
  const driftRef = useRef(0)
  const breathingRef = useRef(0)
  const breathSeparationRef = useRef(0)
  const globalScaleRef = useRef(globalScale)
  const globalTimeRef = useRef(globalTime)
  const separationAmountRef = useRef(separationAmount)
  const baseIntensityRef = useRef(maxIntensity)
  const baseFrequencyRef = useRef(maxFrequency)
  const breathIntensityRef = useRef(breathIntensity)
  const controlModeRef = useRef(controlMode)
  const quantizeWavesRef = useRef(quantizeWaves)
  const breathingAnimationRef = useRef(null)

  // Keep refs in sync with props
  globalScaleRef.current = globalScale
  globalTimeRef.current = globalTime
  separationAmountRef.current = separationAmount
  baseIntensityRef.current = maxIntensity
  baseFrequencyRef.current = maxFrequency
  breathIntensityRef.current = breathIntensity
  controlModeRef.current = controlMode
  quantizeWavesRef.current = quantizeWaves

  // Generate warped circle path with sine wave - smooth curve
  const generateCirclePath = (radius, amp = 0, freq = 20, damp = 60, centerX = 200, centerY = 200, phaseOffset = 0) => {
    const points = []
    const numPoints = 180

    const shouldQuantize = quantizeWavesRef.current || (circleCount > 2 && amp > 10)

    let wavePhaseCalc
    if (shouldQuantize) {
      const cyclesPerCircle = Math.round(freq / 10)
      wavePhaseCalc = (angle) => angle * cyclesPerCircle + ((driftRef.current + phaseOffset) * 0.1)
    } else {
      wavePhaseCalc = (angle, i) => ((i + driftRef.current + phaseOffset) / damp) * freq
    }

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const wavePhase = shouldQuantize ? wavePhaseCalc(angle) : wavePhaseCalc(angle, i)
      const waveOffset = amp * Math.sin(wavePhase)
      const r = radius + waveOffset

      const x = centerX + Math.cos(angle) * r
      const y = centerY + Math.sin(angle) * r

      points.push({ x, y })
    }

    let pathData = `M ${points[0].x},${points[0].y}`

    for (let i = 0; i < points.length; i++) {
      const current = points[i]
      const next = points[(i + 1) % points.length]
      const midX = (current.x + next.x) / 2
      const midY = (current.y + next.y) / 2

      pathData += ` Q ${current.x},${current.y} ${midX},${midY}`
    }

    pathData += ' Z'
    return pathData
  }

  // Update circle path animation
  const updateCirclePath = (amp = 0, freq = 20) => {
    if (!circlePathRef.current) return

    const centerX = 200
    const centerY = 200
    const radius = 200

    const path = generateCirclePath(radius, amp, freq, 60, centerX, centerY, 0)
    circlePathRef.current.setAttribute('d', path)

    circlePathsRef.current.forEach((pathRef, index) => {
      if (!pathRef) return

      const pairIndex = Math.floor(index / 2) + 1
      const isInner = index % 2 === 0

      const baseOffset = pairIndex * separationAmountRef.current * (globalScaleRef.current / 100)
      const totalSeparation = breathSeparationRef.current * pairIndex

      const circleRadius = isInner
        ? radius - baseOffset - totalSeparation
        : radius + baseOffset + totalSeparation

      const phaseOffset = pairIndex * 15
      const ampVariation = amp * (1 + (pairIndex * 0.1))
      const freqVariation = freq * (1 + (pairIndex * 0.05))

      const circlePath = generateCirclePath(
        circleRadius,
        ampVariation,
        freqVariation,
        60,
        centerX,
        centerY,
        phaseOffset
      )
      pathRef.setAttribute('d', circlePath)
    })
  }

  useEffect(() => {
    if (!circleRef.current) return

    updateCirclePath(0)

    // Continuous breathing effect
    breathingAnimationRef.current = gsap.to(breathingRef, {
      current: 1,
      duration: breathDuration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        if (globalScaleRef.current === 0) {
          breathSeparationRef.current = 0
          updateCirclePath(0, 20)
          return
        }

        driftRef.current += breathingRef.current * 0.5

        let totalAmp, totalFreq

        if (controlModeRef.current === 'absolute') {
          const breathModulation = breathingRef.current * breathIntensityRef.current
          totalAmp = (baseIntensityRef.current * 0.1 + breathModulation) * (globalScaleRef.current / 100)
          totalFreq = (baseFrequencyRef.current * 0.2) * (globalScaleRef.current / 100)
        } else {
          const baseAmp = baseIntensityRef.current * 0.05
          const baseFreq = baseFrequencyRef.current * 0.15
          const breathModulation = breathingRef.current * breathIntensityRef.current
          totalAmp = (baseAmp + breathModulation) * (globalScaleRef.current / 100)
          totalFreq = (baseFreq) * (globalScaleRef.current / 100)
        }

        const breathProgress = Math.abs(breathingRef.current)
        breathSeparationRef.current = breathProgress * separationAmountRef.current * (globalScaleRef.current / 100)

        updateCirclePath(totalAmp, totalFreq)
      }
    })

    return () => {
      if (breathingAnimationRef.current) breathingAnimationRef.current.kill()
    }
  }, [circleCount, breathDuration])

  // Update timeScale when globalTime changes
  useEffect(() => {
    const timeScale = globalTime / 100
    if (breathingAnimationRef.current) {
      breathingAnimationRef.current.timeScale(timeScale)
    }
  }, [globalTime])

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        ref={circleRef}
        style={{
          width: '400px',
          height: '400px',
          position: 'relative',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'visible'
          }}
          viewBox="0 0 400 400"
        >
          {Array.from({ length: (circleCount - 1) * 2 }).map((_, index) => (
            <path
              key={`circle-${index}`}
              ref={(el) => (circlePathsRef.current[index] = el)}
              fill="none"
              stroke="var(--kol-surface-on-primary)"
              strokeWidth="2"
              opacity="1"
            />
          ))}
          <path
            ref={circlePathRef}
            fill="none"
            stroke="var(--kol-surface-on-primary)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  )
}

export default DialRotation
