import FirstProject from '~/components/screens/FirstProject';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useRouteError } from 'react-router-dom';
import RuloxScreen from '../screens/Rulox';

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

const router = createBrowserRouter([
	{ path: '/', element: <FirstProject />, errorElement: <ErrorPage /> },
	{
		path: '/first-project',
		element: <FirstProject />,
		errorElement: <ErrorPage />
	},
	{
		path: '/rulox',
		element: <RuloxScreen />,
		errorElement: <ErrorPage />
	}
]);

export default router;
