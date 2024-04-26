import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import "@/styles/global.css";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/header";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <Stack
      screenOptions={{

        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: "#0C356A",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="upload"
        options={{
          gestureDirection: 'horizontal',
          header: () => <View className="h-28 bg-megb-blue-primary flex-row items-center justify-between">
            <View className="w-10">
              <Link href="/" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="arrow-back"
                      size={30}
                      color="#FFF0CE"
                      style={{ paddingLeft: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
            <View className="flex-1 flex-row justify-center"><Header /></View>
            <View className="w-10" />
          </View>,
          // headerTitle: () => ,
          headerStyle: {
            backgroundColor: '#0C356A',
          },
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="arrow-back"
                    size={30}
                    color="#FFF0CE"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }} />
    </Stack>
  );
}
