import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/RopePole.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.296}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PolesRope_mGrandEntrance_0.geometry}
            material={materials.mGrandEntrance}
            position={[65.906, 66.948, 0.004]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={100}
          />
          
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/RopePole.glb')
