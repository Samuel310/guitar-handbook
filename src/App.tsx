import { RouterProvider } from 'react-router';
import { router } from './view/router';
import { useAuthListener } from './view/hooks/useAuthListener';

function App() {
  // Initialize auth listener
  useAuthListener();

  return <RouterProvider router={router} />;
}

export default App;
