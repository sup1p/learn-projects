import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ChatPage } from './pages/ChatPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/chat/:chatId',
                element: <ChatPage />
            }
        ]
    }
]);

export const AppRouter = () => <RouterProvider router={router} />;