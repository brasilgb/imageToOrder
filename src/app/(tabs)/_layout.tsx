import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import Header from "@/components/header";


const TabLayout = () => {

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#FFF0CE",
        tabBarInactiveBackgroundColor: '#0C356A',
        tabBarActiveTintColor: '#FFC436',
        tabBarActiveBackgroundColor: '#0C356A',
        tabBarStyle: {
          height: 55,
        },
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarLabelStyle: {
          fontSize: 14,
          textAlign: 'center',
          marginVertical: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <Ionicons name="home" color="#FFF0CE" size={22} />,
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#0C356A',
            height: 120,
          },
        }}
      />
      <Tabs.Screen
        name="customer/index"
        options={{
          title: 'Customer',
          tabBarIcon: () => <Ionicons name="people" color='#FFF0CE' size={22} />,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="arrow-back"
                    size={30}
                    color="#FFF0CE"
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#0C356A',
            height: 120,
          }
        }}
      />
      <Tabs.Screen
        name="order/index"
        options={{
          title: 'Order',
          tabBarIcon: () => <Ionicons name="construct" color='#FFF0CE' size={22} />,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                  name="arrow-back"
                    size={30}
                    color="#FFF0CE"
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#0C356A',
            height: 120,
          },
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="#FFF0CE"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
    </Tabs>
  );
}
export default TabLayout;