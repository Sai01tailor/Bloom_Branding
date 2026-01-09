import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  MeshReflectorMaterial,
  Environment,
  PerspectiveCamera,
  useGLTF,
  Clone,
  Decal,
  RenderTexture,
  Text,
  Box,
  useHelper,
} from "@react-three/drei";
import { Model } from "./Logo";
import { Model as RopePole } from "./RopePole";
import { Model as LIght } from "./LIght";
import { Model as Vase } from "./Vase1";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
const pi = Math.PI;

const Carpet = (props) => {
  return (
    <group {...props}>
      <mesh
        receiveShadow // Carpets should receive shadows from poles/people
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.79, 0]}
      >
        <planeGeometry args={[3, 64]} />
        <meshStandardMaterial color="red" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
};

const CircleCarpet = () => {
  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.78, 0]}
    >
      <circleGeometry args={[3, 64]} />
      <meshStandardMaterial color="red" roughness={1} metalness={0} />
    </mesh>
  );
};

const RichCeiling = () => {
  // Load the light asset once at the top
  const { scene } = useGLTF("./plafonnier.glb");

  const rows = 5; // Total depth rows
  const cols = 5; // Total width columns
  const spacing = 10; // Space between lights

  return (
    <group position={[0, 5, -0.5]}>
      {/* Main Ceiling Slab */}
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.2} />
      </mesh>
    </group>
  );
};

const Painting = ({ position, color }) => (
  <group position={position}>
    <mesh position={[0, 5, -9.8]} castShadow>
      <boxGeometry args={[6.5, 8.5, 0.4]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
    </mesh>
    <mesh position={[0, 5, -9.55]}>
      <planeGeometry args={[6, 8]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
    {/* Key: castShadow on the light source */}
    {/* <spotLight
      position={[0, 12, 10]}
      target-position={[0, 5, -10]}
      intensity={5}
      angle={0.4}
      castShadow
      shadow-mapSize={[1024, 1024]}
    /> */}
  </group>
);

const Stage = (props) => {
  return (
    <group {...props}>
      <mesh position={[0, -0.79, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.5, 64]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.1} />
      </mesh>
    </group>
  );
};
const StageUp = (props) => {
  return (
    <group {...props}>
      <mesh position={[0, -0.79, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.5, 64]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.1} />
        <TextDecal
          text="Bloom Branding"
          position={[0, 0.05, 2]}
          rotation={[0, -0.2, 0]}
          scale={[3.2, 3, 1]}
          color="gold"
          fontSize={0.45}
          fontUrl={"./Bigilla-Bold.otf"}
        />
      </mesh>
    </group>
  );
};

function TextDecal({
  text = "HELLO",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color = "white",
  fontSize = 1,
  fontUrl = "./Bigilla-Bold.otf",
}) {
  return (
    <Decal position={position} rotation={rotation} scale={scale}>
      {/* 1. Create a material for the Decal */}
      <meshStandardMaterial
        transparent
        polygonOffset
        polygonOffsetFactor={-1}
        roughness={1}
        metalness={0}
        // Ensures it stays above the surface
        opacity={0.4}
      >
        {/* 2. Render the Text into a texture map */}
        <RenderTexture attach="map">
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1}
            position={[0, 0, 5]}
          />
          <color attach="background" args={["#333333"]} />
          <Text
            font={fontUrl}
            text={text}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
          />
        </RenderTexture>
      </meshStandardMaterial>
    </Decal>
  );
}

export default function Hero2() {
  // Pre-load the scenes from your existing model files
  // Note: Ensure the paths here match where your .glb files actually live
  const logoAsset = useGLTF("./logo.glb");
  const ropeAsset = useGLTF("./RopePole.glb");
  const Vaseasset = useGLTF("./lavender_vase.glb");

  const lightRef = React.useRef();

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#050505" }}>
      <Canvas shadows>
      <PerspectiveCamera
  makeDefault
  position={[0, 1.2, 16]}

  fov={42}
/>

        {/* GLOBAL AMBIENT — VERY LOW */}
        <ambientLight intensity={0.12} />

        {/* KEY LIGHT — MAIN FOCUS ON LOGO */}
        <spotLight
          position={[0, 5.5, 4]}
          angle={0.25}
          penumbra={0.4}
          intensity={4}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          target-position={[0, 1.5, 0]}
        />

        {/* SIDE FILL — SOFT */}
        <spotLight
          position={[-4, 3, 2]}
          angle={0.4}
          intensity={0.8}
          penumbra={1}
          color="#ffffff"
        />

        {/* RIM LIGHT — EDGE GLOW */}
        <spotLight
          position={[0, 4, -6]}
          angle={0.35}
          intensity={1.4}
          penumbra={0.6}
          color="#ffe7b3"
        />

        {/* VERY DIM ENVIRONMENT */}
        <Environment files="./studio_small_08_1k.hdr" intensity={0.15} />

        <RichCeiling />

        {/* Walls & Artworks remain the same */}
        <mesh position={[0, 5, -10]} receiveShadow castShadow>
          <boxGeometry args={[60, 15, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh
          position={[-5, 5, 5]}
          rotation={[0, Math.PI / 6, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[30, 15, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[4.7, 5, 5]}
          rotation={[0, -Math.PI / 6, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[30, 15, 1]} />
          <meshStandardMaterial color="white" />
        </mesh>

        <Painting position={[-12, 0, 0]} color="#2a4d69" />
        <Painting position={[0, 0, 0]} color="#63ace5" />
        <Painting position={[12, 0, 0]} color="#adcbe3" />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[600, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={20}
            roughness={0.6}
            metalness={0.9}
            color="#0b0b0b"
            depthScale={1}
            minDepthThreshold={0.8}
          />
        </mesh>

        <group position={[0, 0.8, 10]}>
          {/* THE FIX: Using Clone to inject castShadow into every mesh inside the GLB */}
          <Clone
            object={logoAsset.scene}
            castShadow
            position={[-2.5, -1.09, 1]}
            rotation={[Math.PI / 2, -Math.PI / 2, Math.PI / 2]}
            scale={1.2}

          />

          {/* <OrbitControls enableZoom={true} /> */}

          <Clone
            object={ropeAsset.scene}
            castShadow
            position={[-1.2, -0.8, 4.5]}
            rotation={[0, (84 * pi) / 180, 0]}
            scale={[0.8, 0.8, 0.8]}
          />

          <Clone
            object={ropeAsset.scene}
            castShadow
            position={[1.4, -0.8, 4.5]}
            rotation={[0, (96 * pi) / 180, 0]}
            scale={[0.8, 0.8, 0.8]}
          />
          <Stage></Stage>

          <StageUp position={[0, 0.2, 0]} scale={0.8} />
          <Carpet />
          <Carpet rotation={[0, pi / 2, 0]} />
          <CircleCarpet />
          <Clone
            object={Vaseasset.scene}
            castShadow
            position={[-1.8, -0.4, 3]}
            rotation={[0, 0, 0]}
            scale={[0.4, 0.4, 0.4]}
          />
          <Clone
            object={Vaseasset.scene}
            castShadow
            position={[-2.4, -0.2, 2.3]}
            rotation={[0, 0, 0]}
            scale={[0.6, 0.6, 0.6]}
          />
          <Clone
            object={Vaseasset.scene}
            castShadow
            position={[1.7, -0.4, 3]}
            rotation={[0, 0, 0]}
            scale={[0.4, 0.4, 0.4]}
          />
          <Clone
            object={Vaseasset.scene}
            castShadow
            position={[2.3, -0.2, 2.3]}
            rotation={[0, 0, 0]}
            scale={[0.6, 0.6, 0.6]}
          />
        </group>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={10}
            height={300}
            intensity={1.2}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
