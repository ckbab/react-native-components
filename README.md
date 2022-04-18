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

Or if you want to use styles/utils:

```js
import { getScreenHeight } from "@ckbab/react-native-components/utils";

console.log(getScreenHeight());
// outout: 822

import { textShadow } from "@ckbab/react-native-components/styles";

<Text style={{ textShadow }}>This text has a shadow</Text>;
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
- `FlatButton({ disabled, label, onPress, type, style })`
- `Icon({ name, size, color, style })`
- `Loader({ type, style })`
- `Modal({ children, footer, header, isOpen, onRequestClose, style })`
- `Text({ bold, children, color, italic, numberOfLines, onPress, selectable, size, style })`
- `TextInput({ disabled, style, ...rest })`
- `Theme({ children, colors, fonts })`
- `ToolbarButton({ disabled, icon, label, loading, onPress, style })`

## Utils

### Screen

- `getBottomMargin()`
- `getScreenHeight(factor = 1)`
- `getScreenWidth(factor = 1)`
- `getStatusBarHeight()`

## Styles

### Shadows

- `shadow2`
- `shadow4`
- `shadow8`
- `textShadow`
