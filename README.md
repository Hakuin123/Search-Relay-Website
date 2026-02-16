# Search Relay Onboarding

This is the onboarding/welcome page for the Search Relay browser extension. It guides users through the initial setup and introduces key features.

## Features

- **Multi-step Wizard**: Walks users through the extension's capabilities.
- **Browser Detection**: Automatically detects the user's browser (Chrome, Edge, Firefox) to show relevant instructions.
- **Internationalization**: Supports English and Chinese (Simplified).
- **Responsive Design**: Built with React, Framer Motion, and Tailwind CSS.

## Development

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Start Development Server**

    ```bash
    npm run dev
    ```

3.  **Build**
    ```bash
    npm run build
    ```

## Project Structure

- `App.tsx`: Main application component managing steps and state.
- `components/`: Individual step components (`StepWelcome`, `StepRelay`, `StepSelection`, `StepCompletion`) and UI elements.
- `constants.ts`: Translation strings and configuration.
- `types.ts`: TypeScript definitions.

## Integration

The built output from this project is intended to be bundled with the Search Relay extension, typically served as an onboarding page upon installation.
