# Oracle Canister - Internet Computer Project

A decentralized oracle service built with Azle on the Internet Computer (ICP) platform.

## Prerequisites

- **Node.js 20+** (recommended to use nvm)
- **Rust 1.82+** (for Azle compilation)
- **Podman** (for containerized builds)
- **DFX 0.20.1+** (Internet Computer SDK)

## Installation

### 1. Install Node.js 20
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Restart terminal
nvm install 20
nvm use 20
```

### 2. Install Podman
**Ubuntu/WSL:**
```bash
sudo apt-get install podman
```

**macOS:**
```bash
brew install podman
```

### 3. Install DFX
```bash
DFX_VERSION=0.20.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

Add to your PATH if needed:
```bash
echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
```

### 4. Install Rust (if not already installed)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup update
```

## Project Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Install DFX Extension
```bash
npx azle install-dfx-extension
```

## Development

### 1. Start Local Network
```bash
dfx start --clean --host 127.0.0.1:8000
```

### 2. Deploy Canister
In a separate terminal:
```bash
dfx deploy
```

### 3. Build Frontend Assets
```bash
npm run build
```

### 4. View Application
Access your application at: `http://[canisterId].localhost:8000`

Get your canister ID:
```bash
dfx canister id backend
```

## Development with Auto-reload
For development with automatic reloading (DO NOT use in production):
```bash
AZLE_AUTORELOAD=true dfx deploy
```

## Testing
```bash
npm run pretest
npm run test
```

## Project Structure
```
oracle/
├── src/
│   ├── backend/          # Canister backend logic
│   │   ├── services/     # Business logic services
│   │   └── index.ts      # Main entry point
│   └── frontend/         # Frontend assets
├── test/                 # Test files
├── dfx.json             # DFX configuration
└── package.json         # Dependencies
```

## Troubleshooting

### Common Issues

1. **Rust version errors**: Ensure Rust 1.82+ is installed
2. **Podman issues**: Make sure Podman is running and accessible
3. **Port conflicts**: Check if port 8000 is available
4. **Build failures**: Clear cache with `rm -rf .azle .dfx`

### Reset Environment
```bash
dfx stop
rm -rf .azle .dfx
dfx start --clean --host 127.0.0.1:8000
```

## Production Deployment

For production deployment, ensure:
- Auto-reload is disabled
- Proper environment variables are set
- Security configurations are in place

## Contributing

1. Follow the project's coding standards
2. Write tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## License

[Add your license information here]
