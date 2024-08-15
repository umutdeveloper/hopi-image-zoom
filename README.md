# Image Zoom Library

Image Zoom is a versatile JavaScript library that enables users to zoom in and out on images, as well as pan around them with ease. Designed with a focus on modern design patterns, this library supports advanced interaction methods, including double-tap zooming for MacOS trackpads and custom key bindings for a seamless user experience.

## Features

- **Zoom In/Out:** Allows users to zoom in and out on images up to 5x magnification (default), which can be customized.
- **Panning:** Users can pan around the image effortlessly when zoomed in.
- **Trackpad Support:** Double-tap zoom functionality for MacOS trackpad users.
- **Custom Key Bindings:** Users can assign a key that, when held, allows mouse wheel zooming. Releasing the key enables panning. Default keys are `Meta` and `Control`.
- **State Management:** Implements a robust state management system with three states: `IdleState`, `KeyPressState`, and `PanningState`.
- **DOM Interaction:** Utilizes the Strategy pattern for DOM interaction, providing a default `ContainerViewStrategy` while allowing custom strategies.
- **Command Pattern:** For handling zoom and pan commands efficiently.
- **Observer Pattern:** Real-time updates to the DOM during interactions, ensuring smooth user experience.

## Design Patterns

Image Zoom was developed with clean code principles in mind, utilizing various design patterns:

- **Facade Pattern:** The `ImageZoom` class serves as the main interface, hiding the complexity of underlying subsystems like view strategies, state management, and notifications.
- **Strategy Pattern:** The `ViewStrategy` class handles DOM interaction, allowing for easy customization. The default strategy provided is `ContainerViewStrategy`, but users can extend `ViewStrategy` to implement their own.
- **State Pattern:** Three states (`IdleState`, `KeyPressState`, `PanningState`) extend the base `State` class, each implementing methods like `wheel`, `keyUp`, `keyDown`, `mouseUp`, `mouseDown`, `mouseMove`, and `mouseLeave`.
- **Chain of Responsibility Pattern:** Used within state classes to manage events such as `wheel`, with handlers like `DoubleTapForMac`, `MoveWithTouchpad`, and `Zoom`.
- **Command Pattern:** Each handler within the Chain of Responsibility creates and executes command objects (e.g., `ZoomCommand`), ensuring clear and maintainable code.
- **Observer Pattern:** The `ViewNotifier` class, designed with the Observer pattern, notifies `ViewObserver` of changes in zoom levels and offsets, triggering updates to the DOM via the strategy’s `update` method.

## Installation

You can install Image Zoom via npm:

```bash
npm install @umutcakir/image-zoom
```

## Usage

Here’s a simple example of how to use the Image Zoom library:

```html
<div id="zoom-container">
    <img src="/image-1.jpg" />
</div>
```

```javascript
import { ImageZoom, ContainerViewStrategy } from '@umutcakir/image-zoom';

const containerElement = document.getElementById('zoom-container');
const viewStrategy = new ContainerViewStrategy(containerElement as HTMLDivElement);
const imageZoom = new ImageZoom(viewStrategy);

// You can manage the zoom manually. 1x for each call
imageZoom.zoomIn();
imageZoom.zoomOut();

// Removes the event listeners in the view strategy.
// You should call this whenever you destroy the component
imageZoom.destroy();
```

For detailed examples and advanced usage, please refer to the [documentation](https://github.com/umutdeveloper/image-zoom).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## Repository

For more detailed information, visit the [GitHub repository](https://github.com/umutdeveloper/image-zoom).
