import FirstProject from '~/components/screens/FirstProject';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

import { useRouteError } from 'react-router-dom';
import RuloxScreen from '../screens/Rulox';
import SkyBoxScreen from '../screens/Skybox';

function ErrorPage() {
	const error = useRouteError() as {
		statusText?: string | number;
		message?: string;
	};
	console.error(error);

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}

const HomePage = () => {
	return (
		<ul>
			{browserRoutes.map((route) => (
				<li key={route.path}>
					<Link to={route.path}>{route.path}</Link>
				</li>
			))}
		</ul>
	);
};

const browserRoutes = [
	{ path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
	{
		path: '/first-project',
		element: <FirstProject />,
		errorElement: <ErrorPage />
	},
	{
		path: '/rulox',
		element: <RuloxScreen />,
		errorElement: <ErrorPage />
	},
	{
		path: '/sky-box',
		element: <SkyBoxScreen />,
		errorElement: <ErrorPage />
	}
];

const router = createBrowserRouter(browserRoutes);

export default router;
