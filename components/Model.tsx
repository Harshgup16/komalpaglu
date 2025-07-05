import { useGLTF } from "@react-three/drei"
import { MeshTransmissionMaterial, MeshReflectorMaterial } from "@react-three/drei"
import { GroupProps } from "@react-three/fiber"
import { Mesh, BufferGeometry } from "three"
import { GLTF } from "three-stdlib"
import { useControls } from "leva"

interface GLTFResult extends GLTF {
  nodes: {
    petals: Mesh
    Sphere: Mesh
    Sphere001: Mesh
  }
}

export default function Model(props: GroupProps) {
  const { nodes } = useGLTF('/flower-transformed.glb') as unknown as GLTFResult

  const petalControls = useControls('Petal Material', {
    backside: true,
    backsideThickness: { value: 1, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    thickness: { value: 0.2, min: 0, max: 1 },
    anisotropicBlur: { value: 0.1, min: 0, max: 1 },
    iridescence: { value: 1, min: 0, max: 1 },
    iridescenceIOR: { value: 1, min: 0, max: 2 },
    clearcoat: { value: 1, min: 0, max: 1 },
    envMapIntensity: { value: 0.5, min: 0, max: 2 }
  })

  const sphereControls = useControls('Inner Sphere Material', {
    samples: { value: 6, min: 1, max: 32, step: 1 },
    resolution: { value: 512, min: 128, max: 1024, step: 128 },
    thickness: { value: -1, min: -2, max: 2 },
    anisotropy: { value: 0.25, min: 0, max: 1 }
  })

  const glowControls = useControls('Glow Sphere Material', {
    emissiveIntensity: { value: 2, min: 0, max: 5 },
    color: '#ff0000',
    emissive: '#ff69b4'
  })

  const reflectorControls = useControls('Reflective Surface', {
    blur: { value: [300, 100], min: 0, max: 1000, step: 50 },
    resolution: { value: 2048, min: 128, max: 2048, step: 128 },
    mixBlur: { value: 1, min: 0, max: 1 },
    mixStrength: { value: 80, min: 0, max: 100 },
    roughness: { value: 1, min: 0, max: 1 },
    depthScale: { value: 1.2, min: 0, max: 2 },
    minDepthThreshold: { value: 0.4, min: 0, max: 1 },
    maxDepthThreshold: { value: 1.4, min: 0, max: 2 },
    color: '#050505',
    metalness: { value: 0.5, min: 0, max: 1 },
    mirror: { value: 1, min: 0, max: 1 }
  })

  return (
    <group {...props} dispose={null} position={[0, .5, 0]}>
      <fog attach="fog" args={['#a79', 8.5, 12]} />
      <mesh geometry={nodes.petals.geometry}>
        <MeshTransmissionMaterial
          {...petalControls}
          iridescenceThicknessRange={[0, 1400]}
        />
        <mesh geometry={nodes.Sphere.geometry}>
          <MeshTransmissionMaterial {...sphereControls} />
        </mesh>
      </mesh>
      <mesh geometry={nodes.Sphere001.geometry}>
        <meshStandardMaterial 
          toneMapped={false} 
          emissive={glowControls.emissive}
          color={glowControls.color}
          emissiveIntensity={glowControls.emissiveIntensity}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={reflectorControls.blur}
          resolution={reflectorControls.resolution}
          mixBlur={reflectorControls.mixBlur}
          mixStrength={reflectorControls.mixStrength}
          roughness={reflectorControls.roughness}
          depthScale={reflectorControls.depthScale}
          minDepthThreshold={reflectorControls.minDepthThreshold}
          maxDepthThreshold={reflectorControls.maxDepthThreshold}
          color={reflectorControls.color}
          metalness={reflectorControls.metalness}
          mirror={reflectorControls.mirror}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/flower-transformed.glb')




// import { useGLTF } from "@react-three/drei"
// import { MeshTransmissionMaterial } from "@react-three/drei"
// import { GroupProps } from "@react-three/fiber"
// import { Mesh, BufferGeometry } from "three"
// import { GLTF } from "three-stdlib"

// interface GLTFResult extends GLTF {
//   nodes: {
//     petals: Mesh
//     Sphere: Mesh
//     Sphere001: Mesh
//   }
// }

// export default function Model(props: GroupProps) {
//   const { nodes } = useGLTF('/flower-transformed.glb') as unknown as GLTFResult
//   return (
//     <group {...props} dispose={null}>
//       <mesh geometry={nodes.petals.geometry}>
//         <MeshTransmissionMaterial
//           backside
//           backsideThickness={1}
//           samples={16}
//           thickness={0.2}
//           anisotropicBlur={0.1}
//           iridescence={1}
//           iridescenceIOR={1}
//           iridescenceThicknessRange={[0, 1400]}
//           clearcoat={1}
//           envMapIntensity={0.5}
//         />
//         <mesh geometry={nodes.Sphere.geometry}>
//           <MeshTransmissionMaterial samples={6} resolution={512} thickness={-1} anisotropy={0.25} />
//         </mesh>
//       </mesh>
//       <mesh geometry={nodes.Sphere001.geometry}>
//         <meshStandardMaterial toneMapped={false} emissive="hotpink" color="red" emissiveIntensity={2} />
//       </mesh>
//     </group>
//   )
// }

// useGLTF.preload('/flower-transformed.glb')
