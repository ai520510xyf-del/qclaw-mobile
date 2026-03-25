# QClaw Mobile

📱 A mobile chat app that connects to your local QClaw AI assistant.

## Features

- 💬 Chat interface with streaming responses
- 🌐 Works over local network (no internet needed when on same WiFi)
- 🔒 Secure authentication with token
- ⚡ Fast and lightweight

## Setup

### 1. Configure Your QClaw Gateway

The app connects to your QClaw gateway. Default settings:
- Gateway URL: `http://192.168.31.100:28789` (change to your PC's local IP)
- Token: Your QClaw auth token

### 2. Build APK

#### Option A: Download from GitHub Actions
The APK is automatically built on every push. Go to:
```
Actions → Build Android APK → latest run → Artifacts
```

#### Option B: Build locally
```bash
npm install
npm run build
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```

### 3. Install on Android

1. Transfer the APK to your phone
2. Enable "Install from unknown sources" if needed
3. Open the APK to install

### 4. Connect

1. Make sure your phone is on the same WiFi as your PC
2. Find your PC's local IP (e.g., `192.168.x.x`)
3. Update the Gateway URL in app settings
4. Enter your QClaw token

## Find Your QClaw Token

The token is in your QClaw config. Check:
```
C:\Users\ai520\.qclaw\openclaw.json
```

Look for the `token` field in the `gateway` section.

## Architecture

- **Frontend**: Vanilla TypeScript + Vite
- **Mobile**: Capacitor 6
- **Build**: GitHub Actions (automatic APK on push)

## License

MIT
