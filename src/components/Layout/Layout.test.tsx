// src/components/Layout/Layout.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders children content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders app title', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Property Manager')).toBeInTheDocument();
  });

  it('toggles drawer when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    
    // Find button by its aria-label
    const menuButton = screen.getByLabelText('open drawer');
    await user.click(menuButton);
    
    // After clicking, the drawer items should be visible
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});