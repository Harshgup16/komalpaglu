"use client"

import * as THREE from "three"
import { Canvas, useThree } from "@react-three/fiber"
import { Suspense, useRef, useEffect } from "react"
import { useProgress, Html, OrbitControls, Environment, Lightformer, Image, Text, MeshTransmissionMaterial } from "@react-three/drei"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Model from "./Model"
import { GroupProps } from "@react-three/fiber"
import { Group } from "three"
import { useControls } from "leva"

const GOLDENRATIO = 1.61803398875

// Frame data with images and corresponding text
const frameData = [
  { image: "/komal/1.jpg", text: "A Bloom for Her Beauty ❤️" },
  { image: "/komal/2.jpg", text: "The Saree I Dreamt Of 😭" },
  { image: "/komal/3.jpg", text: "That Lovely side eye 😘" },
  { image: "/komal/4.jpg", text: "A Dream in Ghibli Style 🩵" },
  { image: "/komal/5.jpg", text: "Our First Frame 😍" },
  { image: "/komal/6.jpg", text: "Love, Paws, and Us 🐾" },
  { image: "/komal/7.jpg", text: "My Favorite Photo 💖" },
  { image: "/komal/8.jpg", text: "The Hug That Lit My Soul 💕" },
  { image: "/komal/9.jpg", text: "Maybe I Was Hidden in That Rose 😣" },
  { image: "/komal/10.jpg", text: "Lost in your eyes 💙" },
  { image: "/komal/11.jpg", text: "The best of us 💖" },
  { image: "/komal/12.jpg", text: "A Ghibli Tale with My Little Paw 🐾" },
]

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

function Frames() {
  const radius = 3
  const angleStep = (Math.PI * 2) / frameData.length

  return (
    <group position={[0, 0, 0]}>
      {frameData.map((item, index) => {
        const angle = index * angleStep
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = 0

        return (
          <Frame
            key={index}
            position={[x, y, z]}
            url={item.image}
            text={item.text}
          />
        )
      })}
    </group>
  )
}

interface FrameProps extends GroupProps {
  url: string
  text: string
}

function Frame({ url, text, position, ...props }: FrameProps) {
  const groupRef = useRef<Group>(null!)

  const materialProps = useControls('Frame Material', {
    thickness: { value: 1.10, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.3, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 3, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.3, min: 0, max: 1 },
    backside: { value: true }
  })

  useEffect(() => {
    if (groupRef.current && position) {
      const [x, y, z] = position as [number, number, number]
      groupRef.current.lookAt(x * 2, y, z * 2)
    }
  }, [position])

  return (
    <group ref={groupRef} position={position} {...props}>
      <Text
        position={[0, GOLDENRATIO + 0.13, 0]}
        fontSize={0.1}
        color="hotpink"
        anchorX="center"
        anchorY="bottom"
      >
        {text}
      </Text>
      <mesh scale={[1, GOLDENRATIO, 0.05]} position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <MeshTransmissionMaterial {...materialProps} />
        <mesh scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} color="white" />
        </mesh>
        <Image position={[0, 0, 0.7]} url={url} />
      </mesh>
    </group>
  )
}

function CameraSetup() {
  const { size } = useThree()
  const isMobile = size.width < 768
  const camera = useThree((state) => state.camera)
  
  useEffect(() => {
    camera.position.z = isMobile ? 10 : 5
  }, [size.width, camera])
  
  return null
}

export default function Scene() {
  return (
    <Canvas 
      gl={{ antialias: true }} 
      className="relative h-svh" 
      style={{ background: "black" }}
      camera={{ 
        position: [0, 2.5, 5],
        fov: 50,
        near: 0.1,
        far: 1000
      }}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.NoToneMapping
      }}
    >
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <directionalLight position={[-5, -5, 5]} intensity={4} />
      
      <Environment files={"/blue_photo_studio_1k.hdr"}>
        <group rotation={[0, 0, 1]}>
          <Lightformer 
            form="circle" 
            intensity={15} 
            position={[0, 10, -10]} 
            scale={20} 
            onUpdate={(self) => self.lookAt(0, 0, 0)} 
          />
          <Lightformer 
            intensity={0.1} 
            onUpdate={(self) => self.lookAt(0, 0, 0)} 
            position={[-5, 1, -1]} 
            rotation-y={Math.PI / 2} 
            scale={[50, 10, 1]} 
          />
          <Lightformer 
            intensity={0.1} 
            onUpdate={(self) => self.lookAt(0, 0, 0)} 
            position={[10, 1, 0]} 
            rotation-y={-Math.PI / 2} 
            scale={[50, 10, 1]} 
          />
          <Lightformer 
            color="white" 
            intensity={0.2} 
            onUpdate={(self) => self.lookAt(0, 0, 0)} 
            position={[0, 1, 0]} 
            scale={[10, 100, 1]} 
          />
        </group>
      </Environment>
      
      <EffectComposer enableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={1} intensity={2} />
      </EffectComposer>
      
      <Suspense fallback={<Loader />}>
        <CameraSetup />
        <OrbitControls />
        <Model />
        <Frames />
      </Suspense>
    </Canvas>
  )
}



// "use client"

// import * as THREE from "three"
// import { Canvas, useThree } from "@react-three/fiber"
// import Model from "./Model"
// import { Suspense } from "react"
// import { useProgress, Html, ScrollControls, OrbitControls, Environment, Lightformer } from "@react-three/drei"

// import { LUTCubeLoader, ToneMappingMode } from 'postprocessing'
// import { EffectComposer, Bloom, LUT, BrightnessContrast, HueSaturation, ToneMapping } from '@react-three/postprocessing'
// function Loader() {
//   const { progress, active } = useProgress()

//   return <Html center>{progress.toFixed(1)} % loaded</Html>
// }

// export default function Scene() {
//   return (
//     <Canvas gl={{ antialias: true }} className="relative h-svh" style={{ background: "black" }}
//       camera={{ position: [0, 2.5, 5], fov: 50 }}
//       onCreated={(state) => {
//         state.gl.toneMapping = THREE.NoToneMapping
//       }}
//     >
//       {/* <color attach="background" args={['#151520']} /> */}
//       <ambientLight intensity={0.5} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//       <pointLight position={[-10, -10, -10]} />
//       <directionalLight position={[-5, -5, 5]} intensity={4} />
//       <Environment files={"/blue_photo_studio_1k.hdr"} >
//         <group rotation={[0, 0, 1]}>
//           <Lightformer form="circle" intensity={10} position={[0, 10, -10]} scale={20} onUpdate={(self) => self.lookAt(0, 0, 0)} />
//           <Lightformer intensity={0.1} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[50, 10, 1]} />
//           <Lightformer intensity={0.1} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={[50, 10, 1]} />
//           <Lightformer color="white" intensity={0.2} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[0, 1, 0]} scale={[10, 100, 1]} />
//         </group>
//       </Environment>
//       <EffectComposer enableNormalPass>
//         <Bloom mipmapBlur luminanceThreshold={1} intensity={2} />
//         {/* <BrightnessContrast brightness={0} contrast={0.1} /> */}
//         {/* <HueSaturation hue={0} saturation={-0.25} /> */}
//       </EffectComposer>
//       <Suspense fallback={<Loader />}>
//           <OrbitControls />
//           <Model />
//       </Suspense>
//     </Canvas>
//   )
// }
