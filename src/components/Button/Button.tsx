import React from 'react'
import { ButtonProps } from '@mui/material'
import { Button as MuiButton } from '@mui/material'

interface CustomButtonProps extends ButtonProps {
  label: string;
}

export const Button: React.FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <MuiButton {...props}>
      {label}
    </MuiButton>
  )
}