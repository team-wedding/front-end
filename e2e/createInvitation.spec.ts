// e2e/createInvitation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('CreateInvitationPage', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 후 초대장 생성 페이지로 이동
    await page.goto('/login');
    //하드 코딩 되어있는 테스트용 계정 로그인 정보
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', ' TestPassword123!');
    await page.click('button[type="submit"]');
    //하드 코딩 되어있는 invitationID
    await page.goto('/create/129');
  });

  test('초기 렌더링 및 필수 입력값 검증', async ({ page }) => {
    await expect(page.getByLabel('이름')).toBeVisible();
    await expect(page.getByLabel('날짜')).toBeVisible();
    // await expect(page.getByText('이름을 입력하세요')).toBeVisible();
    // await expect(page.getByText('날짜를 입력하세요')).toBeVisible();
  });

  // test('이미지 업로드', async ({ page }) => {
  //   const filePath = 'src/assets/image/wedding1.png';
  //   await page.setInputFiles('input[type="file"]', filePath);
  //   await expect(page.locator('.image-preview')).toBeVisible();
  // });

  // test('음악/테마 선택', async ({ page }) => {
  //   await page.selectOption('select[name="music"]', 'aBeautifulPlan');
  //   await page.selectOption('select[name="theme"]', 'classic');
  //   await expect(page.getByText('aBeautifulPlan')).toBeVisible();
  //   await expect(page.getByText('classic')).toBeVisible();
  // });

  test('초대장 미리보기', async ({ page }) => {
    await page.fill('input[name="name"]', '테스트 초대장');
    await page.fill('input[name="date"]', '2024-12-31');
    await page.click('button.preview');
    await expect(page.getByText('테스트 초대장')).toBeVisible();
    await expect(page.getByText('2024-12-31')).toBeVisible();
  });

  // test('초대장 생성 성공', async ({ page }) => {
  //   await page.fill('input[name="name"]', '테스트 초대장');
  //   await page.fill('input[name="date"]', '2024-12-31');
  //   await page.fill('input[name="location"]', '서울');
  //   await page.click('button[type="submit"]');
  //   await expect(page).toHaveURL('/dashboard');
  //   await expect(page.getByText('초대장이 생성되었습니다')).toBeVisible();
  // });

  // test('취소/초기화 동작', async ({ page }) => {
  //   await page.fill('input[name="name"]', '임시 입력');
  //   await page.click('button.cancel');
  //   await expect(page.getByLabel('이름')).toHaveValue('');
  // });
});
