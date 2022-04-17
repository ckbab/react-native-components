# react-native-components

## Installation

```bash
npm install @ckbab/react-native-components
```

## Usage

```js
import { Flag } from "@ckbab/react-native-components";

<Flag code="FR" size={32} />;
```

Some of the components such as `Text`, `Dialog` etc have styling which requires some initial config. Wrap your main component with `Theme` and provide props for `colors` and `fonts`.

```js
import { Theme } from "@ckbab/react-native-components";

<Theme
  colors={{
    fonts: { bold: "RobotoBold", regular: "RobotoRegular", ... },
    colors: { background: "#fff", font: "#000", ... },
  }}
>
  /* Main app component */
</Theme>
```

## Components

- `Button({ children, disabled, onLongPress, onPress, style })`
- `DevButton({ children, onSuccess, trigger })`
- `DevInfo()`
- `Dialog({ children, isOpen, onRequestClose, style })`
- `Flag({ code, size, style })`
- `Loader({ type, style })`
- `Text({ bold, children, color, italic, numberOfLines, onPress, selectable, size, style })`
- `Theme({ children, colors, fonts })`
