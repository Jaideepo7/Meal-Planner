
import React from 'react';
import { Tabs } from 'expo-router';
import { Heart, Lightbulb, Home, User, Settings } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

function TabBarIcon(props: {
  name: 'Home' | 'Heart' | 'Lightbulb' | 'User' | 'Settings';
  color: string;
}) {
    switch (props.name) {
        case 'Home':
            return <Home color={props.color} />;
        case 'Heart':
            return <Heart color={props.color} />;
        case 'Lightbulb':
            return <Lightbulb color={props.color} />;
        case 'User':
            return <User color={props.color} />;
        case 'Settings':
            return <Settings color={props.color} />;
        default:
            return null;
    }
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          elevation: 0,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="Home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="Heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: 'Suggestions',
          tabBarIcon: ({ color }) => <TabBarIcon name="Lightbulb" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="User" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="Settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
