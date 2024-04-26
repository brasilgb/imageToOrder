import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface OrderProps {
    data: any;
}

const ListOrder = (props: OrderProps) => {
  return (
    <>
    {props.data &&
          <View>
            <Text className=" mt-8">{props.data[0]?.cliente.nome}</Text>
            {props.data?.map((order: any, idx: number) => (
              <View key={idx} className="flex-row items-center justify-start mt-2 gap-2 bg-white shadow shadow-black p-3 rounded-md">
                <Text className="text-lg font-bold">{order.id}</Text>
                <Text className="flex-1 text-lg font-medium">{order.equipamento} - {order.modelo}</Text>
                <Ionicons name='arrow-forward' size={32} onPress={() => {router.push({ pathname: "/upload", params: { order: order.id} })}} />
              </View>
            ))}

          </View>
        }
    </>
  )
}

export default ListOrder