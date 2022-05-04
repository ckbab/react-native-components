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
import settings from "./store/settings";
import user from "./store/ui";
import user from "./store/user";
...

const fonts = {
  bold: require("../../../assets/fonts/RobotoCondensed-Regular.ttf"),
  boldItalic: require("../../../assets/fonts/RobotoCondensed-Italic.ttf"),
  ...
  "Arsenal-Bold": require("../../../assets/fonts/Arsenal-Bold.ttf"),
  ...
};

const english = { hello: "Hello" };
const swedish = { hello: "Hej" };

const images = [require("./images/logo.png"), ...];

<AppContainer
  apiUrl={apiUrl}
  apiParamsSelector={(state) => ({
    apiToken: state?.user?.apiToken,
    userId: state?.user?.userId,
    ...
  })}
  colors={{
    background: backgroundColor,
    error: errorColor,
    ...
  }}
  fonts={fonts}
  languages={{ en: english, sv: swedish, ... }}
  languageSelector={(state) => state?.settings?.language}
  images={images}
  reducers={{ settings, user, ... }}
  reducersTemp={{ ui, ... }}
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

- `AppContainer`
- `Button`
- `DevButton`
- `DevInfo`
- `Dialog`
- `Flag`
- `FlatButton`
- `Icon`
- `Loader`
- `Modal`
- `Screen`
- `Text`
- `TextInput`
- `ToolbarButton`

## Hooks

- `useDialog`
- `useLocalization`
- `useMessage`
- `useNavigator`
- `usePushToken`
- `useScreen`
- `useServer`

## Styles

- `shadow2`
- `shadow4`
- `shadow8`
- `textShadow`
