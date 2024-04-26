import { Formik } from "formik";
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from "react";
import apisos from "@/services/apisos";
import { Ionicons } from "@expo/vector-icons";
import ListOrder from "@/components/ListOrder";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import ordersc from "@/schemas/ordersc";

const Order = () => {
  const [dataOrder, setDataOrder] = useState<any>([]);

  const onsubmit = async (values: any) => {
    await apisos.get(`/order/${values.order}`)
      .then((res) => {
        setDataOrder(res.data.result);
      }).catch((err) => {
        console.log(err)
      });
  };

  return (
    <View className="flex-1 flex-col items-center justify-start">
      <StatusBar style="light" />
      <View>
        <View className='mt-4 flex-row items-center justify-center'>
          <Text className='text-xl font-bold'>Inserir imagem em uma ordem de serviço</Text>
        </View>
        <View>
          <Formik
            validationSchema={ordersc}
            initialValues={{
              order: ""
            }}
            onSubmit={onsubmit}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldTouched,
              touched,
              values,
              errors,
              isValid,
            }) => (
              <View>
                <View className="mt-6">
                  <Text className="label-form">Order</Text>
                  <TextInput
                    className={`input-form `}
                    onChangeText={handleChange("order")}
                    onBlur={() => setFieldTouched("order")}
                    value={values.order}
                    keyboardType="numeric"
                  />
                  {touched && errors && (
                    <Text className="self-end pr-6 pt-1 text-base text-red-600">
                      {errors.order}
                    </Text>
                  )}
                </View>

                <View className="flex-row items-center justify-end">
                  <Pressable
                    className={` ${!isValid
                      ? "bg-solar-gray-dark"
                      : "bg-solar-blue-dark"
                      } px-8 py-3 rounded-full`}
                    onPress={handleSubmit as any}
                  >
                    <Text
                      className={`text-lg font-bold ${!isValid ? "text-gray-300" : "text-gray-50"
                        }`}
                    >
                      Avançar
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </View>

        <Link href="/upload" asChild>
          <Pressable>
            <Ionicons
              name="camera"
              size={30}
              color="#000"
            />
          </Pressable>
        </Link>

        <ListOrder data={dataOrder} />

      </View>
    </View>
  );
}
export default Order;