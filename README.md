# Crossword Columns Layout

A React-based crossword layout application with intelligent column balancing algorithms.

## Features

- **Configurable Layout**: Adjust column count, puzzle size, gaps, and spacing
- **Smart Balancing**: Advanced algorithms to balance content across columns
- **Visual Feedback**: Real-time preview of layout changes
- **Persistent Settings**: Configuration saved to localStorage
- **Fast Simulation**: In-memory balancing simulation for optimal performance

## Development

This project uses [Bun](https://bun.sh) as the runtime and package manager.

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Start the development server:
   ```bash
   bun run dev
   ```
4. Open your browser to `http://localhost:3000`

### Building

To build the project for production:

```bash
bun run build
```

### Testing

Run the test suite:

```bash
bun test
```

## Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

### Manual Deployment Setup

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on push to main

## Configuration Options

- **Columns**: Number of columns (3-8)
- **Puzzle Width/Height**: Crossword puzzle dimensions
- **Puzzle Span**: How many columns the puzzle spans
- **Column Gap**: Horizontal spacing between columns
- **Row Gap**: Vertical spacing between rows
- **Item Gap**: Padding within each clue item
- **Pixel-Perfect Alignment**: Add dynamic spacing for exact height matching

## Balancing Algorithm

The application uses a sophisticated two-phase balancing approach:

1. **Primary Distribution**: Sequential placement with overshoot detection
2. **Visual Optimization**: In-memory simulation to find optimal item arrangements

The algorithm respects content ordering constraints while maximizing visual balance.

## License

MIT License - see LICENSE file for details
