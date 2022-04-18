import * as Application from "expo-application";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import React from "react";
import InfoItem from "./InfoItem";

export default function DevInfo() {
  const getItems = () => {
    const items = [];
    items.push({
      key: "Application.androidId",
      value: Application.androidId,
    });
    items.push({
      key: "Application.applicationId",
      value: Application.applicationId,
    });
    items.push({
      key: "Application.applicationName",
      value: Application.applicationName,
    });
    items.push({
      key: "Application.nativeApplicationVersion",
      value: Application.nativeApplicationVersion,
    });
    items.push({
      key: "Application.nativeBuildVersion",
      value: Application.nativeBuildVersion,
    });
    items.push({
      key: "Constants.expoVersion",
      value: Constants.expoVersion,
    });
    items.push({
      key: "Constants.manifest.version",
      value: Constants.manifest?.version,
    });
    items.push({
      key: "Constants.manifest",
      value: Constants.manifest,
    });
    items.push({
      key: "Updates.channel",
      value: Updates.channel,
    });
    items.push({
      key: "Updates.isEmergencyLaunch",
      value: Updates.isEmergencyLaunch,
    });
    items.push({
      key: "Updates.manifest",
      value: Updates.manifest,
    });
    items.push({
      key: "Updates.releaseChannel",
      value: Updates.releaseChannel,
    });
    items.push({
      key: "Updates.updateId",
      value: Updates.updateId,
    });
    return items;
  };

  const renderItem = (item) => {
    return <InfoItem key={item.key} label={item.key} value={item.value} />;
  };

  return <>{getItems().map(renderItem)}</>;
}

DevInfo.propTypes = {};

DevInfo.defaultProps = {};
