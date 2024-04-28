import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '@/contexts/Auth'
import { router } from 'expo-router'

type Props = {}

const Home = (props: Props) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  
  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="light" />
      <Text>{'user.nome'}</Text>
    </View>
  )
}

export default Home