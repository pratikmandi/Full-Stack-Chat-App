import React from "react";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="(home)"
        options={{ title: "Home", headerShown: false }}
      />
      <Drawer.Screen name="about" options={{ title: "About" }} />
    </Drawer>
  );
};

export default DrawerLayout;
