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
import ui from "./store/ui";
import user from "./store/user";
...

const fonts = {
  "Roboto": require("../../../assets/fonts/RobotoCondensed-Regular.ttf"),
  "Roboto Italic": require("../../../assets/fonts/RobotoCondensed-Italic.ttf"),
  "Arsenal Bold": require("../../../assets/fonts/Arsenal-Bold.ttf"),
  ...
};

const images = [require("./images/logo.png"), ...];

const english = { hello: "Hello" };
const swedish = { hello: "Hej" };

<AppContainer
  api={{
    baseUrl: "https://ckbab.se/project/api",
    paramsSelector: (state) => ({
      apiToken: state?.user?.apiToken,
      userId: state?.user?.userId,
      ...
    }),
  }}
  language={{
    en: english,
    sv: swedish,
    selector: (state) => state?.settings?.language,
  }}
  load={{
    fonts: fonts,
    images: images,
  }}
  reducers={{
    blacklist: { ui },
    whitelist: { settings, user, ... }
  }}
  style={{
    colors: {
      background: "#eeeeee",
      error: "#ff0000",
      success: "#006600",
    },
    fonts: {
      regular: "Roboto",
      bold: "Arsenal Bold",
    },
  }}
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
- `DevButton`
- `DevInfo`
- `Flag`
- `Icon`

## Hooks

- `useDialog`
- `useLocalization`
- `useMessage`
- `usePushToken`
- `useScreen`
- `useServer`

## Styles

- `shadow2`
- `shadow4`
- `shadow8`
- `textShadow`
