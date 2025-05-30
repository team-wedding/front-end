// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';
import * as Sentry from '@sentry/react';
import { StrictMode, useEffect } from 'react';
import {
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: 'production',
  sendDefaultPii: true,
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [import.meta.env.VITE_CLOUDETYPE_API_URL, /^\/api/],
  profilesSampleRate: 1.0,
});

https: createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Sentry.ErrorBoundary
        fallback={<p>에러가 발생하였습니다. 잠시 후 다시 시도해주세요.</p>}
        showDialog
      >
        <App />
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
