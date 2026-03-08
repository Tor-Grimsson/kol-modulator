import { useState } from 'react'
import ControlPanel from './ControlPanel'
import DialRotation from './DialRotation'

const frequencyControls = [
  {
    id: 'intensity',
    type: 'slider',
    label: 'Intensity',
    hasToggle: true,
    toggleStates: ['A', 'B'],
    min: 0,
    max: 400,
    defaultValue: 200,
  },
  {
    id: 'frequency',
    type: 'slider',
    label: 'Frequency',
    min: 10,
    max: 200,
    defaultValue: 100,
  },
  {
    id: 'breathTime',
    type: 'slider',
    label: 'Breath Time',
    min: 1,
    max: 10,
    defaultValue: 3,
  },
  {
    id: 'breathAmp',
    type: 'slider',
    label: 'Breath Amp',
    min: 0,
    max: 40,
    defaultValue: 10,
  },
  {
    id: 'separation',
    type: 'slider',
    label: 'Separation',
    min: 0,
    max: 60,
    defaultValue: 16,
  },
  {
    id: 'globalScale',
    type: 'slider',
    label: 'Global Scale',
    min: 0,
    max: 100,
    defaultValue: 50,
  },
  {
    id: 'globalTime',
    type: 'slider',
    label: 'Global Time',
    min: 0,
    max: 100,
    defaultValue: 100,
  },
  {
    id: 'circles',
    type: 'slider',
    label: 'Circles',
    min: 1,
    max: 8,
    defaultValue: 1,
  },
  {
    id: 'quantize',
    type: 'toggle-button',
    label: 'Quantize',
    toggleStates: ['OFF', 'ON'],
  },
  {
    id: 'snapshot',
    type: 'button',
    label: 'Snapshot',
  },
]

// Curated calibration preset from the docs
const SNAPSHOT_PRESET = {
  intensity: 362,
  frequency: 100,
  breathTime: 5,
  breathAmp: 40,
  separation: 16,
  globalScale: 22,
  globalTime: 100,
  circles: 1,
}

const FrequencyModulator = () => {
  const [dialProps, setDialProps] = useState({
    maxIntensity: 200,
    maxFrequency: 100,
    breathDuration: 3,
    breathIntensity: 10,
    separationAmount: 16,
    globalScale: 50,
    globalTime: 100,
    circleCount: 1,
    controlMode: 'relative',
    quantizeWaves: false,
  })

  const handleControlChange = (id, value, toggleState) => {
    setDialProps(prev => {
      switch (id) {
        case 'intensity':
          return {
            ...prev,
            maxIntensity: value,
            controlMode: toggleState === 'B' ? 'absolute' : 'relative',
          }
        case 'frequency':
          return { ...prev, maxFrequency: value }
        case 'breathTime':
          return { ...prev, breathDuration: value }
        case 'breathAmp':
          return { ...prev, breathIntensity: value }
        case 'separation':
          return { ...prev, separationAmount: value }
        case 'globalScale':
          return { ...prev, globalScale: value }
        case 'globalTime':
          return { ...prev, globalTime: value }
        case 'circles':
          return { ...prev, circleCount: value }
        case 'quantize':
          return { ...prev, quantizeWaves: toggleState === 'ON' }
        case 'snapshot':
          return {
            ...prev,
            maxIntensity: SNAPSHOT_PRESET.intensity,
            maxFrequency: SNAPSHOT_PRESET.frequency,
            breathDuration: SNAPSHOT_PRESET.breathTime,
            breathIntensity: SNAPSHOT_PRESET.breathAmp,
            separationAmount: SNAPSHOT_PRESET.separation,
            globalScale: SNAPSHOT_PRESET.globalScale,
            globalTime: SNAPSHOT_PRESET.globalTime,
            circleCount: SNAPSHOT_PRESET.circles,
            controlMode: 'absolute',
          }
        default:
          return prev
      }
    })
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <DialRotation {...dialProps} />
      </div>
      <div className="absolute bottom-6 left-6 w-[400px]">
        <ControlPanel
          controls={frequencyControls}
          onControlChange={handleControlChange}
        />
      </div>
    </div>
  )
}

export default FrequencyModulator
