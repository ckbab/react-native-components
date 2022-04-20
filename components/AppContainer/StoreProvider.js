import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { persistCombineReducers, persistStore } from "redux-persist";

export default function StoreProvider({ children, reducers, reducersTemp }) {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const config = {
      key: "primary",
      storage: AsyncStorage,
      whitelist: Object.keys(reducers),
    };
    const allReducers = { ...reducers, ...reducersTemp };
    const reducer = persistCombineReducers(config, allReducers);
    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    });
    persistStore(store, null, () => setStore(store));
  }, [reducers, reducersTemp]);

  if (!store) {
    return <View />;
  }

  return <Provider store={store}>{children}</Provider>;
}
