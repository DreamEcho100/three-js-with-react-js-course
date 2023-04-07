import { RouterProvider } from 'react-router-dom';
import router from './components/Routes';

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
