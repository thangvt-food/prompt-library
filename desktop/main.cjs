const { app, BrowserWindow, shell } = require("electron");

const appUrl = "https://thangvt-food.github.io/prompt-library/";
const appOrigin = new URL(appUrl).origin;

function isTrustedAppUrl(value) {
  try {
    const url = new URL(value);
    return url.origin === appOrigin && url.pathname.startsWith("/prompt-library/");
  } catch {
    return false;
  }
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 360,
    minHeight: 560,
    title: "Prompt Library",
    backgroundColor: "#f5f4f0",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://")) void shell.openExternal(url);
    return { action: "deny" };
  });

  window.webContents.on("will-navigate", (event, url) => {
    if (!isTrustedAppUrl(url)) {
      event.preventDefault();
      if (url.startsWith("https://")) void shell.openExternal(url);
    }
  });

  void window.loadURL(appUrl).catch((error) => {
    console.error("Could not load Prompt Library:", error);
    if (!window.isDestroyed()) {
      void window.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(`
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <body style="font:16px sans-serif;padding:32px;background:#f5f4f0;color:#232722">
          <h2>Không thể kết nối Prompt Library</h2>
          <p>Hãy kiểm tra kết nối Internet rồi thử mở lại ứng dụng.</p>
          <button onclick="location.href='${appUrl}'">Thử lại</button>
        </body>
      `)}`);
    }
  });

  return window;
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
