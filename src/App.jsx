import 'animate.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { StateMachineProvider } from 'little-state-machine';
import Page from './components/helmet';
import AllRoutes from './routes';
import SettingsModel from './components/setting-model';
import { littleMachineStore } from './utils';

export default function App() {
  return (
    <Page title="Home">
      <StateMachineProvider createStore={littleMachineStore}>
        <Toaster position="top-center" reverseOrder={false} />
        <SettingsModel />
        <AllRoutes />
      </StateMachineProvider>
    </Page>
  );
}
