# Handoff - Figma Plugin

**Handoff** is a Figma plugin designed to streamline the design-to-development process by creating a basic handoff sheet that iterates through variants for each property definition. This makes it easier to share design component variations with developers in a clear and organized manner.

## Features

- Automatically generates a handoff sheet for Figma components.
- Lists variants for each property definition.
- Simplifies the design-to-development communication.
- Easy-to-use and time-saving tool for design teams.

## Installation

To install and use **Handoff** for local development:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/handoff.git
   cd handoff
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Build the plugin:

   ```bash
   npm run build
   ```

4. To start development with live reloading:

   ```bash
   npm run watch
   ```

Once you've built the plugin, you can load it into Figma for testing:

1. Open Figma, go to `Plugins > Development > New Plugin`.
2. Choose **Click to choose a manifest.json** and select the `manifest.json` file from this project.

## Usage

1. In your Figma file, select the components or variants you want to hand off.
2. Open the **Handoff** plugin from the Figma plugin menu.
3. **Handoff** will generate a basic handoff sheet, iterating through each variant property.
4. Review or edit the sheet as needed before sharing it with developers.

### Example

Here’s a quick example of how the generated handoff sheet might look:

- **Component**: Button
  - **Property 1**: Size (Small, Medium, Large)
  - **Property 2**: Color (Primary, Secondary, Tertiary)
  - **Property 3**: State (Active, Disabled, Hover)

The handoff sheet will iterate over these properties and list all possible combinations.

## Contributing

Contributions are welcome! If you’d like to contribute:

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

## Issues

If you encounter any issues or have feature requests, feel free to [open an issue](https://github.com/yourusername/handoff/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
