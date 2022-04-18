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

Or if you want to use hooks/styles:

```js
import { useDialog } from "@ckbab/react-native-components/hooks";

const dialog = useDialog();

dialog.alert("Hello");
```

```js
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
- `MessageContainer()`
- `Modal({ children, footer, header, isOpen, onRequestClose, style })`
- `Screen({ children, component, contentContainerStyle, navigation, style, ...rest })`
- `Text({ bold, children, color, italic, numberOfLines, onPress, selectable, size, style })`
- `TextInput({ disabled, style, ...rest })`
- `Theme({ children, colors, fonts, labels, language })`
- `ToolbarButton({ disabled, icon, label, loading, onPress, style })`

## Hooks

- `useDialog()`
- `useLocalization()`
- `useMessage()`
- `useNavigator()`
- `usePushToken()`
- `useScreen()`

Note that `useMessage` requires that `MessageContainer` is rendered.

## Styles

- `shadow2`
- `shadow4`
- `shadow8`
- `textShadow`
