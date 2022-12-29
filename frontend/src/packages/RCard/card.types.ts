import { ReactNode } from 'react';

export interface ICardProps {
  theme?: 'light' | 'dark';
  children: ReactNode;
  className?: string;
  click?:any
}
