import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Layout } from './Layout';
import { describe, it, expect } from 'vitest';

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

  it('toggles drawer when menu button is clicked', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});