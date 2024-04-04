import { Suspense, lazy } from 'react';

// suspense fallback
const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const Login = Loadable(lazy(() => import('../pages/juidco-app/auth/login')));
const Register = Loadable(
  lazy(() => import('../pages/juidco-app/auth/register'))
);

const Dashboard = Loadable(lazy(() => import('../pages/juidco-app')));

const WaterTankerHome = Loadable(
  lazy(() => import('../pages/juidco-app/water-tanker'))
);
const EPramanLogin = Loadable(
  lazy(() => import('../pages/juidco-app/auth/login-e-praman'))
);

const RedirectEPramaan = Loadable(
  lazy(() => import('../pages/juidco-app/auth/login-e-praman/rediectEpramaan'))
);

const Crud = Loadable(lazy(() => import('../pages/juidco-app/crud')));

const routes = [
  // auth routes
  {
    layout: 'Auth',
    pages: [
      {
        id: 1,
        name: 'Login',
        path: 'login',
        element: <Login />,
        exact: true
      },
      {
        id: 2,
        name: 'Register',
        path: 'register',
        element: <Register />,
        exact: true
      },
      {
        id: 3,
        name: 'E-Praman Login',
        path: 'e-praman-login',
        element: <EPramanLogin />,
        exact: true
      },
      {
        id: 4,
        name: 'E-Praman Redirect',
        path: 'login-e-praman',
        element: <RedirectEPramaan />,
        exact: true
      }
    ]
  },

  // dashboard layout
  {
    layout: 'Dashboard',
    pages: [
      {
        id: 1,
        name: 'Home',
        path: 'home',
        element: <Dashboard />
      },
      {
        id: 2,
        name: 'Crud',
        path: 'crud',
        element: <Crud />
      }
    ]
  },

  // water tanker routes
  {
    layout: 'WaterTanker',
    pages: [
      {
        id: 1,
        name: 'Home',
        path: '',
        element: <WaterTankerHome />,
        exact: true
      }
    ]
  }
];

export { routes };
