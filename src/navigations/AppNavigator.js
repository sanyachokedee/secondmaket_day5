import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeedNavigator from './FeedNavigator';
import MarketScreen from './../screens/MarketScreen'
import PostingScreen from './../screens/PostingScreen'
import NewListingButton from './NewListingButton'
import ChatScreen from './../screens/ChatScreen'
import ProfileNavigator from './ProfileNavigator'

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          headerShown: true,
          headerTitle: 'Markets',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="storefront" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Posting"
        component={PostingScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Posting',
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate('Posting')}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="add-circle-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: true,
          headerTitle: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat-bubble-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator