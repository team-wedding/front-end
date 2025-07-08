// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('DashBoardPage', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 후 대시보드로 이동 (로그인 경로/방식에 따라 수정)
    await page.goto('/login');
    //하드 코딩 되어있는 테스트용 계정 로그인 정보
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('초기 렌더링 및 주요 섹션 확인', async ({ page }) => {
    await expect(page.getByText('아직 저장된 청첩장이 없어요')).toBeVisible();
    await expect(page.getByText('청첩장 만들기')).toBeVisible();
  });

  test('만들기 페이지로 이동', async ({ page }) => {
    await expect(page.getByText('청첩장 만들기')).toBeVisible();
    await page.getByText('청첩장 만들기').click();
    await page.fill('input[name="invitation-title"]', '친구용 청첩장');
    await page.getByTestId('title-submit').click();
    await page.waitForURL((url) => url.pathname.startsWith('/create/'));
  });

  // test('초대장 목록이 보이고, 상세 진입 가능', async ({ page }) => {
  //   const invitation = page.locator('.invitation-item').first();
  //   await expect(invitation).toBeVisible();
  //   await invitation.click();
  //   await expect(page).toHaveURL(/\/invitation\/\d+/);
  // });

  // test('초대장 삭제', async ({ page }) => {
  //   const deleteButton = page.locator('.invitation-item .delete-btn').first();
  //   await deleteButton.click();
  //   await expect(page.getByText('정말 삭제하시겠습니까?')).toBeVisible();
  //   await page.click('button.confirm-delete');
  //   await expect(deleteButton).not.toBeVisible();
  // });

  // test('에러/로딩 처리', async ({ page }) => {
  //   // 네트워크 차단 등으로 에러 상황을 시뮬레이션할 수 있음
  //   // 예시: await page.route('/api/invitations', route => route.abort());
  //   // await page.reload();
  //   // await expect(page.getByText('에러')).toBeVisible();
  // });

  // test('로그아웃 동작', async ({ page }) => {
  //   await page.click('button.logout');
  //   await expect(page).toHaveURL('/login');
  // });
});
