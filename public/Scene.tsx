// "use client"

// import * as THREE from "three"
// import { Canvas, useThree } from "@react-three/fiber"
// import { Suspense } from "react"
// import { useProgress, Html, OrbitControls, Environment, Lightformer, Image } from "@react-three/drei"
// import { EffectComposer, Bloom } from '@react-three/postprocessing'
// import Model from "./Model"
// import { GroupProps } from "@react-three/fiber"

// const GOLDENRATIO = 1.61803398875

// // Sample image URLs - replace with your actual images
// const frameImages = [
//   "/harsh_1.jpg",
//   "/harsh_1.jpg", 
//   "/harsh_1.jpg",
//   "/harsh_1.jpg"
// ]

// function Loader() {
//   const { progress } = useProgress()
//   return <Html center>{progress.toFixed(1)} % loaded</Html>
// }

// function Frames() {
//   const radius = 3
//   const angleStep = (Math.PI * 2) / frameImages.length
//   const startAngle = 0
  
//   return (
//     <group position={[0, 0, 0]}>
//       {frameImages.map((url, index) => {
//         const angle = startAngle + (index * angleStep)
//         const x = Math.cos(angle) * radius
//         const z = Math.sin(angle) * radius
//         const y = 0
        
//         return (
//           <Frame
//             key={index}
//             position={[x, y, z]}
//             rotation={[0, Math.PI / 2 + angle, 0]}
//             url={url}
//           />
//         )
//       })}
//     </group>
//   )
// }

// interface FrameProps extends GroupProps {
//   url: string
// }

// function Frame({ url, ...props }: FrameProps) {
//   return (
//     <group {...props}>
//       <mesh scale={[1, GOLDENRATIO, 0.05]} position={[0, GOLDENRATIO / 2, 0]}>
//         <boxGeometry />
//         <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
//         <mesh scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
//           <boxGeometry />
//           <meshBasicMaterial toneMapped={false} fog={false} color="white" />
//         </mesh>
//         <Image position={[0, 0, 0.7]} url={url} />
//       </mesh>
//     </group>
//   )
// }

// export default function Scene() {
//   return (
//     <Canvas 
//       gl={{ antialias: true }} 
//       className="relative h-svh" 
//       style={{ background: "black" }}
//       camera={{ 
//         position: [0, 2, 5],
//         fov: 50,
//         near: 0.1,
//         far: 1000
//       }}
//       onCreated={(state) => {
//         state.gl.toneMapping = THREE.NoToneMapping
//       }}
//     >
//       <ambientLight intensity={0.5} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//       <pointLight position={[-10, -10, -10]} />
//       <directionalLight position={[-5, -5, 5]} intensity={4} />
      
//       <Environment files={"/blue_photo_studio_1k.hdr"}>
//         <group rotation={[0, 0, 1]}>
//           <Lightformer 
//             form="circle" 
//             intensity={10} 
//             position={[0, 10, -10]} 
//             scale={20} 
//             onUpdate={(self) => self.lookAt(0, 0, 0)} 
//           />
//           <Lightformer 
//             intensity={0.1} 
//             onUpdate={(self) => self.lookAt(0, 0, 0)} 
//             position={[-5, 1, -1]} 
//             rotation-y={Math.PI / 2} 
//             scale={[50, 10, 1]} 
//           />
//           <Lightformer 
//             intensity={0.1} 
//             onUpdate={(self) => self.lookAt(0, 0, 0)} 
//             position={[10, 1, 0]} 
//             rotation-y={-Math.PI / 2} 
//             scale={[50, 10, 1]} 
//           />
//           <Lightformer 
//             color="white" 
//             intensity={0.2} 
//             onUpdate={(self) => self.lookAt(0, 0, 0)} 
//             position={[0, 1, 0]} 
//             scale={[10, 100, 1]} 
//           />
//         </group>
//       </Environment>
      
//       <EffectComposer enableNormalPass>
//         <Bloom mipmapBlur luminanceThreshold={1} intensity={2} />
//       </EffectComposer>
      
//       <Suspense fallback={<Loader />}>
//         <OrbitControls />
//         <Model />
//         <Frames />
//       </Suspense>
//     </Canvas>
//   )
// }


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
