
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/logo.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve001.geometry}
        material={materials.SVGMat}
        rotation={[1.583, -0.012, -1.571]}
        scale={[101.014, 20.846, 101.007]}
        onBeforeRender={(e)=>{e.material.metalness = 0.85
e.material.roughness = 0.18
e.material.envMapIntensity = 1.5}}
      />
    </group>
  )
}

useGLTF.preload('/logo.glb')