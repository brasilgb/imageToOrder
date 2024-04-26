import { Formik } from "formik";
import { Pressable, Text, TextInput, View } from 'react-native';
import orderSc from "@/schemas/ordersc";
import { useState } from "react";
import apisos from "@/services/apisos";
import ListOrder from "@/components/ListOrder";
import { StatusBar } from "expo-status-bar";

const Customer = () => {
  const [dataOrder, setDataOrder] = useState<any>([]);

  const onsubmit = async (values: any) => {
    // console.log('Submitted Data:', values.order);
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
            validationSchema={orderSc}
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
        
        <ListOrder data={dataOrder} />

      </View>
    </View>
  );
}
export default Customer;
