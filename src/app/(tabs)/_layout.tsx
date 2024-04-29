import React, { useContext, useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, router, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import Header from "@/components/header";
import { AuthContext } from '@/contexts/Auth';


const TabLayout = () => {
const {signOut} = useContext(AuthContext);
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
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="lock-open-outline"
                    size={25}
                    color="#ffffff"
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
              <Pressable
              onPress={() => signOut()}
              >
                {({ pressed }) => (
                  <Ionicons
                    name="exit-outline"
                    size={25}
                    color="#ffffff"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          )
        }}
      />
      <Tabs.Screen
        name="customer/index"
        options={{
          title: 'Clientes',
          tabBarIcon: () => <Ionicons name="people" color='#FFF0CE' size={22} />,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="arrow-back"
                    size={30}
                    color="#ffffff"
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
          title: 'Ordens',
          tabBarIcon: () => <Ionicons name="construct" color='#FFF0CE' size={22} />,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                  name="arrow-back"
                    size={30}
                    color="#ffffff"
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
        }}
      />
    </Tabs>
  );
}
export default TabLayout;