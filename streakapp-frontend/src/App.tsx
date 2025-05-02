import React, { JSX, ReactNode } from 'react';
import { routes } from './routes';
import { Route, Routes } from 'react-router-dom';

function App() {
   
  return (
    <Routes>
      {routes.map((route : {path: string;
        component: ReactNode;}, index : number) => (
        <Route
          key={index}
          path={route.path}
          element={route.component}
        />
      ))}
    </Routes>
  );
}

export default App;
