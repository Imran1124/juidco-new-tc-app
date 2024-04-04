import { Routes, Route, Navigate } from 'react-router-dom';
import { GuestGuard, AuthGuard } from '../guard';
import { AuthLayout, MainLayout } from '../layouts';
import { routes } from './allRoutes';
import NotFound from '../pages/404.jsx';

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/juidco-app/home" />}
        index={true}
      />
      <Route
        path="/juidco-app"
        element={<Navigate to="/juidco-app/home" />}
        index={true}
      />

      {/* auth routes */}
      <Route
        path="/juidco-app/auth"
        element={
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'Auth' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/* dashboard routes */}
      <Route
        path="/juidco-app"
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'Dashboard' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/* water tanker routes */}
      <Route
        path="/juidco-app/water-tanker"
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'WaterTanker' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/* not found */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
