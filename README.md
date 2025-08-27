# Web Performance and Security Analyzer

This is a Chrome extension that analyzes the current webpage for key performance metrics and security vulnerabilities.

## Development and Testing

Follow these steps to set up and test the extension in your local environment.

### 1. Install Dependencies

Install the necessary project dependencies using pnpm.

```bash
pnpm install
```

### 2. Run the Development Server

This command starts the Next.js development server for the dashboard UI and simultaneously watches for changes in the extension's background scripts and popup UI, rebuilding them automatically.

**You must keep this process running in a terminal.**

```bash
pnpm dev
```

### 3. Load the Extension in Chrome

1.  Open your Chrome browser and navigate to `chrome://extensions`.
2.  In the top right corner, enable the **Developer mode** switch.
3.  Click the **Load unpacked** button that appears on the top left.
4.  In the file selection dialog, navigate to the project folder and select the **`public`** directory. Click "Select Folder".

> **Important**: You must select the `public` folder, not the entire project folder.

5.  The "Web Analyzer" extension should now appear in your list of extensions.

### 4. How to Use

1.  Pin the "Web Analyzer" extension to your toolbar for easy access (click the puzzle icon, then the pin icon next to Web Analyzer).
2.  Navigate to any website you want to analyze (e.g., `https://www.google.com`).
3.  Click the Web Analyzer icon in your toolbar.
4.  In the popup window, click the **Analyze** button.
5.  After a brief loading period, the button will change to **View Details**. Click it.
6.  A new tab should open with the dashboard page (`http://localhost:3000/dashboard/...`), showing the analysis report.