import { Canvas, useFrame, createT } from "solid-three";
import * as THREE from "three";

const T = createT(THREE);

function Planet(props) {
  let mesh: THREE.Mesh;
  let group: THREE.Group;

  useFrame((_, delta) => {
    if (mesh) {
      mesh.rotation.y += delta * props.rotationSpeed;
    }
    if (group) {
      group.rotation.y += delta * props.orbitSpeed;
    }
  });

  return (
    <T.Group ref={group!} position={[0, 0, 0]}>
      <T.Mesh ref={mesh!} position={[props.distance, 0, 0]}>
        <T.SphereGeometry args={[props.size, 32, 32]} />
        <T.MeshStandardMaterial color={props.color} />
      </T.Mesh>
    </T.Group>
  );
}

function Sun() {
  return (
    <T.Mesh>
      <T.SphereGeometry args={[2, 32, 32]} />
      <T.MeshBasicMaterial color="yellow" />
    </T.Mesh>
  );
}

export function SolarSystem() {
  return (
    <Canvas camera={{ position: [0, 20, 40], fov: 75 }}>
      <T.AmbientLight intensity={0.1} />
      <T.PointLight color="white" intensity={100} position={[0, 0, 0]} />
      <Sun />
      <Planet
        color="orange"
        size={0.5}
        distance={5}
        orbitSpeed={0.5}
        rotationSpeed={1}
      />
      <Planet
        color="blue"
        size={0.8}
        distance={10}
        orbitSpeed={0.3}
        rotationSpeed={0.8}
      />
      <Planet
        color="red"
        size={0.6}
        distance={15}
        orbitSpeed={0.2}
        rotationSpeed={1.2}
      />
    </Canvas>
  );
}
