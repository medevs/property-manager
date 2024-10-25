import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import Layout from '@/components/Layout/Layout';
import { PropertyList } from '@/components/PropertyList/PropertyList';
import PropertyFormContainer from './components/PropertyFormContainer/PropertyFormContainer';
import { store } from '@/store/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/properties" replace />} />
              <Route path="/properties" element={<PropertyList />} />
              <Route path="/properties/new" element={<PropertyFormContainer />} />
              <Route path="/properties/:id/edit" element={<PropertyFormContainer />} />
              {/* Add these routes later when implemented */}
              <Route path="/profile" element={<div>Profile Page</div>} />
              <Route path="/settings" element={<div>Settings Page</div>} />
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/properties" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;