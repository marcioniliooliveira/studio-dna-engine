# Contributing to Site Cloner DNA

Thank you for your interest in contributing to **Site Cloner DNA**! 🎉

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/site-cloner-dna.git
   cd site-cloner-dna
   ```

2. Run the setup script:
   - **Windows:** Run `setup.bat`
   - **Linux/macOS:** Run `chmod +x setup.sh && ./setup.sh`
   - **Manual:** `npm install && npx playwright install --with-deps chromium`

3. Test your changes locally:
   ```bash
   node bin/cli.js https://example.com
   ```

## Pull Request Guidelines

1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. Keep commits concise and descriptive.
3. Test extraction against both static sites and dynamic/modern SPAs (GSAP, Webflow, Framer, Next.js).
4. Submit a Pull Request describing what changes were made and why.

## Code of Conduct

Please adhere to respectful and collaborative open-source communication standards.
