import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import Layout from '@/components/Layout/Layout';
import { PropertyList } from '@/components/PropertyList/PropertyList';
import { store } from '@/store/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <PropertyList />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;