import { test, expect } from '@playwright/test';

// 회원가입 E2E 테스트

test('회원가입 후 /dashboard 진입', async ({ page }) => {
  // 1. 메인 페이지 접속
  await page.goto('http://localhost:5173/');

  // 2. "시작하기" 버튼 클릭
  await page.getByRole('button', { name: '시작하기' }).click();

  // 3. "회원가입" 링크 클릭
  await page.getByRole('link', { name: '회원가입' }).click();

  // 4. 회원정보 입력
  await page.getByRole('textbox', { name: '이름' }).fill('테스트유저');
  // 이메일은 매번 다르게 생성 (중복 방지)
  const email = `testuser+${Date.now()}@example.com`;
  await page.getByRole('textbox', { name: '이메일' }).fill(email);
  await page
    .getByRole('textbox', { name: '비밀번호', exact: true })
    .fill('TestPassword123!');
  await page
    .getByRole('textbox', { name: '비밀번호 확인' })
    .fill('TestPassword123!');

  // 5. "회원가입" 버튼 클릭
  await page.getByRole('button', { name: '회원가입' }).click();

  // 6. /dashboard로 이동하는지 확인 (자동 로그인 또는 리다이렉트)
  await page.waitForTimeout(1000); // 네트워크/애니메이션 대기
  await expect(page).toHaveURL(/.*login/);

  // 7. 로그인 페이지에서 이메일과 비밀번호 입력
  await page.getByRole('textbox', { name: '이메일' }).fill(email);
  await page
    .getByRole('textbox', { name: '비밀번호', exact: true })
    .fill('TestPassword123!');

  // 8. "로그인" 버튼 클릭
  await page.getByRole('button', { name: '로그인' }).click();
  await page.waitForTimeout(1000); // 네트워크/애니메이션 대기
  await expect(page).toHaveURL(/.*dashboard/);
});
