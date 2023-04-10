import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import {
	CubeCamera,
	CubeTextureLoader,
	LinearMipmapLinearFilter,
	RGBAFormat,
	WebGLCubeRenderTarget
} from 'three';
import { Stats, OrbitControls } from '@react-three/drei';

const SkyBox = () => {
	const { scene } = useThree();

	const loader = new CubeTextureLoader();

	const texture = loader.load(
		Array(6)
			.fill(1)
			.map((_, index) => `/images/sky-box/${index + 1}.jpg`)
	);

	scene.background = texture;

	return null;
};

const Sphere = () => {
	const { scene, gl } = useThree();

	// The cubeRenderTarget is used to generate a texture for the reflective sphere.
	// It must be updated on each frame in order to track camera movement and other changes.
	const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
		format: RGBAFormat,
		generateMipmaps: true,
		minFilter: LinearMipmapLinearFilter
	});
	const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
	cubeCamera.position.set(0, 0, 0);
	scene.add(cubeCamera);

	useFrame(() => cubeCamera.update(gl, scene));

	return (
		<mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
			<directionalLight intensity={0.5} />
			<sphereGeometry attach='geometry' args={[2, 32, 32]} />

			<meshStandardMaterial
				attach='material'
				envMap={cubeCamera.renderTarget.texture}
				color='orange'
				roughness={0.1}
				metalness={1}
			/>
		</mesh>
	);
};

const SkyBoxScreen = () => {
	return (
		<Suspense>
			<Canvas>
				<OrbitControls />
				<Stats />
				<Sphere />
				<SkyBox />
			</Canvas>
		</Suspense>
	);
};

export default SkyBoxScreen;
