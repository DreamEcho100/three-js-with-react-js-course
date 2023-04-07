import {
	ContactShadows,
	PresentationControls,
	useGLTF
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, lazy } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LazyWatch = lazy(() => import('./components/Watch'));

const RuloxScreen = () => {
	const location = useLocation();
	useGLTF.preload(['/3d-models/watch-v1.glb']);

	return (
		<div>
			<header className='h-16 bg-black/75 text-white'>
				<div className='px-4 h-full max-w-screen-xl mx-auto'>
					<nav className='flex h-full'>
						<ul className='capitalize flex items-center font-semibold'>
							<li>
								<Link to={location.pathname}>{location.pathname.slice(1)}</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<section className='text-black bg-slate-200'>
				<div className='max-w-screen-xl mx-auto py-16 px-8 flex flex-wrap gap-2 md:flex-nowrap'>
					<div className='w-2/5 flex-grow flex items-center justify-center'>
						<div className='text-center'>
							<h1 className='text-5xl leading-none'>
								Check out our best and cheapest watches
							</h1>
						</div>
					</div>
					<div className='w-3/5 flex-grow'>
						<Canvas
							className='min-h-[25rem]'
							shadows
							dpr={[1, 2]}
							camera={{ position: [0, 0, 4], fov: 50 }}
						>
							<ambientLight intensity={0.2} />
							<spotLight
								position={[10, 10, 10]}
								angle={0.15}
								penumbra={1}
								// shadow={{
								// 	mapSize: { width: 512, height: 512 },
								// }}
								// shadowMapWidth={512}
								// shadowMapHeight={512}
								castShadow
							/>
							<PresentationControls
								global
								snap={{ mass: 4, tension: 1500 }}
								config={{ mass: 2, tension: 500 }}
								polar={[-Math.PI / 2, Math.PI / 2]}
								azimuth={[-Math.PI / 1.4, Math.PI / 2]}
							>
								<Suspense>
									<LazyWatch
										rotation={[Math.PI / 20, Math.PI / 5, 0]}
										position={[0, 0.25, 0]}
										scale={0.003}
									/>
								</Suspense>
							</PresentationControls>
							<ContactShadows
								rotation={[Math.PI / 2, 0, 0]}
								position={[0, -1.3, 0.1]}
								opacity={0.95}
								width={10}
								height={10}
								blur={0.6}
							/>
						</Canvas>
					</div>
				</div>
			</section>
		</div>
	);
};

export default RuloxScreen;
