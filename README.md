# react-native-components

## Installation

```bash
npm install @ckbab/react-native-components
```

## Usage

### Wrap main component

First you need to wrap your app's main component with `AppContainer` and load with available props. Your component will be rendered when fonts, images, languages and reducers have been loaded and Expo has downloaded latest update (if any).

```js
import { AppContainer } from "@ckbab/react-native-components";
import English from "./languages/en.json";
import Swedish from "./languages/sv.json";
import settings from "./store/settings";
import user from "./store/user";

const fonts = {
  bold: require("../../../assets/fonts/RobotoCondensed-Regular.ttf"),
  boldItalic: require("../../../assets/fonts/RobotoCondensed-Italic.ttf"),
  italic: require("../../../assets/fonts/RobotoCondensed-LightItalic.ttf"),
  regular: require("../../../assets/fonts/RobotoCondensed-Light.ttf"),
  "Arsenal-Bold": require("../../../assets/fonts/Arsenal-Bold.ttf"),
  ...
};

const images = [require("./images/logo.png")];

<AppContainer
  colors={{
    background: "#eee",
    error: "#ff0000",
    font: "#000000",
    primary: "#0000ff",
    success: "#00ff00",
  }}
  dictionary={{ en: English, sv: Swedish }}
  fonts={fonts}
  languageSelector={(state) => state?.settings?.language}
  images={images}
  reducers={{ settings, user }}
  storeReducers={["settings", "user"]}
>
  /* Main app component */
</AppContainer>
```

### Use components

```js
import { Flag } from "@ckbab/react-native-components";

<Flag code="FR" size={32} />;
```

### Use hooks

```js
import { useDialog } from "@ckbab/react-native-components/hooks";

const dialog = useDialog();

dialog.alert("Hello");
```

### Use styles

```js
import { textShadow } from "@ckbab/react-native-components/styles";

<Text style={{ textShadow }}>This text has a shadow</Text>;
```

## Components

- `AppContainer({ children, colors, dictionary, fonts, images, languageSelector, reducers, storeReducers })`
- `Button({ children, disabled, onLongPress, onPress, style })`
- `DevButton({ children, onSuccess, trigger })`
- `DevInfo()`
- `Dialog({ children, isOpen, onRequestClose, style })`
- `Flag({ code, size, style })`
- `FlatButton({ disabled, label, onPress, type, style })`
- `Icon({ name, size, color, style })`
- `Loader({ type, style })`
- `Modal({ children, footer, header, isOpen, onRequestClose, style })`
- `Screen({ children, component, contentContainerStyle, navigation, style, ...rest })`
- `Text({ bold, children, color, italic, numberOfLines, onPress, selectable, size, style })`
- `TextInput({ disabled, style, ...rest })`
- `ToolbarButton({ disabled, icon, label, loading, onPress, style })`

## Hooks

- `useDialog()`
- `useLocalization()`
- `useMessage()`
- `useNavigator()`
- `usePushToken()`
- `useScreen()`

## Styles

- `shadow2`
- `shadow4`
- `shadow8`
- `textShadow`
