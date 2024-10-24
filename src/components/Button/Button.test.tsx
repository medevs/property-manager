import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('Button', () => {
  it('renders button with correct label', () => {
    render(<Button label="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant styles correctly', () => {
    render(<Button label="Submit" variant="contained" />)
    const button = screen.getByText('Submit')
    expect(button).toHaveClass('MuiButton-contained')
  })
})