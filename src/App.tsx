import type {
	BoxGeometryProps,
	MeshProps,
	MeshStandardMaterialProps
} from '@react-three/fiber';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Stats, OrbitControls } from '@react-three/drei';

interface BoxProps extends MeshProps {
	meshStandardMaterialProps?: MeshStandardMaterialProps;
	geometryProps?: BoxGeometryProps;
}

const Box = ({
	meshStandardMaterialProps = {},
	geometryProps = {},
	...props
}: BoxProps) => {
	const boxMeshRef = useRef<THREE.Mesh>(null);

	useFrame(() => {
		if (!boxMeshRef.current) return;
		boxMeshRef.current.rotation.x += 0.01;
	});

	return (
		<mesh ref={boxMeshRef} {...props}>
			<boxGeometry {...geometryProps} />
			<meshStandardMaterial color={'orange'} {...meshStandardMaterialProps} />
		</mesh>
	);
};

const App = () => {
	// const { camera, gl } = useThree();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [boxesConfig, setBoxesConfig] = useState({
		box1: { isHovered: false },
		box2: { isHovered: false }
	});

	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello Three JS world!</h1>
			<Canvas ref={canvasRef} className='bg-black' dpr={[1, 2]}>
				<OrbitControls />
				<Stats />
				<ambientLight intensity={0.5} />
				<pointLight position={[-10, -10, -10]} />
				{/* <mesh>
					<boxGeometry />
					<meshStandardMaterial color={'orange'} />
				</mesh> */}
				<Box
					position={[2.2, 0, 0]}
					geometryProps={{ args: [2, 2, 2] }}
					scale={boxesConfig.box1.isHovered ? 2 : 1}
					onPointerEnter={() =>
						setBoxesConfig((prev) => ({
							...prev,
							box1: { ...prev.box1, isHovered: true }
						}))
					}
					onPointerLeave={() =>
						setBoxesConfig((prev) => ({
							...prev,
							box1: { ...prev.box1, isHovered: false }
						}))
					}
				/>
				<Box
					position={[-2.2, 0, 0]}
					geometryProps={{ args: [2, 2, 2] }}
					scale={boxesConfig.box2.isHovered ? 2 : 1}
					onPointerEnter={() =>
						setBoxesConfig((prev) => ({
							...prev,
							box2: { ...prev.box2, isHovered: true }
						}))
					}
					onPointerLeave={() =>
						setBoxesConfig((prev) => ({
							...prev,
							box2: { ...prev.box2, isHovered: false }
						}))
					}
				/>
			</Canvas>
		</div>
	);
};

export default App;
