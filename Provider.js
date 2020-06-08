import React from 'react';
import { AuthProvider } from './navigation/AuthProvider';
import Playground from './Playground';
export default function Providers() {
  return (
    <AuthProvider>
      <Playground />
    </AuthProvider>
  );
}