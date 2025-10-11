from playwright.sync_api import Page, expect

def test_vue_migration(page: Page):
    """
    This test verifies that the Vue migration was successful.
    """
    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:3000")

    # 2. Assert: Confirm the page title is correct.
    expect(page).to_have_title("Elliot > Home")

    # 3. Assert: Confirm the heading is correct.
    heading = page.get_by_role("heading", name="Home")
    expect(heading).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")