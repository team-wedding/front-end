import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    port: 5173,
    timeout: 120 * 1000,
    // reuseExistingServer:  // CI 환경이 아니면 기존 서버 재사용
  },
});
