import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

const Watch = (props: {
	rotation: [number, number, number];
	position: [number, number, number];
	scale: number;
}) => {
	const ref = useRef<Group>(null);
	const originalRotationRef = useRef(props.rotation);

	const { scene } = useGLTF('/3d-models/watch-v1.glb');

	useFrame((state) => {
		const watchGroup = ref.current!;
		// if (!ref.current) return;

		const elapsedTime = state.clock.getElapsedTime();

		watchGroup.rotation.x =
			originalRotationRef.current[0] + Math.cos(elapsedTime / 4) / 8;
		watchGroup.rotation.y =
			originalRotationRef.current[1] + Math.sin(elapsedTime / 4) / 8;
		watchGroup.rotation.z =
			originalRotationRef.current[2] + (1 + Math.cos(elapsedTime / 1.5)) / 10;
		watchGroup.position.y = (1 + Math.sin(elapsedTime / 1.5)) / 10;
	});

	return (
		<group {...props} ref={ref}>
			<Html
				scale={125}
				rotation={[0, -Math.PI / 5, Math.PI / 4]}
				position={[200, -350, 200]}
				transform
			>
				<p className='text-white bg-green-500 p-2 rounded-lg hover:bg-red-500 transition-colors'>
					600$
				</p>
			</Html>
			<primitive object={scene} />
		</group>
	);
};

export default Watch;
