import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.tsx';
import { cn } from './utils/classNames.ts';

function App() {
  return (
    <div className={cn("flex h-screen bg-gray-50")}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default App;