from playwright.sync_api import sync_playwright, expect
import re

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the home page
        page.goto("http://localhost:3000")

        # Expect the home page title and take a screenshot
        expect(page.get_by_role("heading", name="Home")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/01_home_page.png")

        # Navigate to the About page
        page.get_by_role("link", name="About").click()
        expect(page.get_by_role("heading", name="About Me")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/02_about_page.png")

        # Click the subtitle to reveal the joke footer
        page.get_by_role("heading", name="A site to test things").click()

        # Expect the joke footer to be visible and take a screenshot
        joke_header = page.get_by_role("heading", name="Have a laugh!")
        expect(joke_header).to_be_visible()
        page.screenshot(path="jules-scratch/verification/03_joke_footer.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)