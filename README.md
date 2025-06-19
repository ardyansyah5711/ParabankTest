# 🧪 Parabank Test Suite with Playwright

[![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-%2300adee)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)

Automated UI test suite for [ParaBank Demo Website](https://parabank.parasoft.com/parabank), built with [Playwright](https://playwright.dev).

---

## 📌 Test Coverage

- ✅ **Login Sukses**
- ❌ **Login Gagal (Invalid Credentials)**
- 🔄 **Transfer Dana Antar Akun**
- ⚠️ **Transfer Gagal (Amount Kosong)**
- 🧾 **Pembayaran Tagihan (Bill Pay)**
- ❗ **Gagal Bayar (Form Kosong)**

---

## 📂 Project Structure
ParabankTest/
├── tests/
│ └── parabank.test.js # All test scenarios
├── playwright.config.js # Configuration (screenshot, trace, video)
├── package.json # Scripts & dependencies
├── README.md
└── html-report/ # Auto-generated after test run

---

## 🚀 Quick Start

### 1. Clone Repository
2. Install Dependencies

npm install

3. Install Playwright Browsers

npx playwright install

4. Run the Tests

npm test

5. View Test Report

npx playwright show-report

🖼️ Automatic Attachments on Failure

    📸 Screenshot: captured when a test fails

    🎞️ Video recording: recorded only on failure

    🧭 Trace viewer: inspect what happened step-by-step

🔐 Default Credentials

    Username: john

    Password: demo

📌 You can register your own account at ParaBank Register Page
🛠 Built With

    Playwright Test

    Node.js 18+
