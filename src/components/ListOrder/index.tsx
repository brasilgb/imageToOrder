import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface OrderProps {
  data: any;
  url: string;
}

const ListOrder = (props: OrderProps) => {


  return (
    <>
      {props.data &&
        <View className='mx-4'>
          <Text className="text-xl font-bold text-megb-blue-primary mt-8">{props.data[0]?.cliente.nome}</Text>
          {props.data?.map((order: any, idx: number) => (
            <View key={idx} className="flex-row items-center justify-start mt-2 gap-2 bg-white p-3 rounded-md border border-gray-300">
              <Text className="text-lg font-bold text-megb-blue-secundary">{order.id}</Text>
              <Text className="flex-1 text-lg font-semibold text-gray-500">{order.equipamento} - {order.modelo}</Text>
              <Ionicons name='information-circle' size={28} color="#0174BE" onPress={() => { router.push({ pathname: "/information", params: { order: order.id, url: props.url }})}} />
              <Ionicons name='camera' size={28} color="#0174BE" onPress={() => { router.push({ pathname: "/upload", params: { order: order.id, url: props.url }})}} />
            </View>
          ))}
        </View>
      }
    </>
  )
}

export default ListOrder