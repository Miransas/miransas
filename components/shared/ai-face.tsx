import React from 'react'
import AIOrbFace from '../smoothui/ai-orb-face'
import { AIState } from '../smoothui/ai-core'

const AiFaceOrb = ({ state }: { state: AIState }) => {
  return (
    <div>
        <AIOrbFace gaze={false} size={32} state={state} />
    </div>
  )
}

export default AiFaceOrb