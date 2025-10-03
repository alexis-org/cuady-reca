import { Outlet } from 'react-router-dom';


export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-4">
      <div className="w-full max-w-6xl flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
