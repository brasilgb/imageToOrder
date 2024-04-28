import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Loading from "@/components/Loading";
import { AuthContext } from "@/contexts/Auth";
import signinsc from "@/schemas/signinsc";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface SignInProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, showModal } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const onsubmit = async (values: SignInProps, { resetForm }: any) => {
    await signIn({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <Loading visible={showModal} />
      <View className="flex-1 items-center justify-center bg-megb-blue-primary">
        <View className="my-16">
          <Image
            source={require("@/assets/images/logosolar.png")}
            className="w-80 h-16"
          />
        </View>
        <Formik
          validationSchema={signinsc}
          initialValues={{
            email: "",
            password: ""
          }}
          enableReinitialize
          onSubmit={onsubmit}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldTouched,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <View className="bg-gray-50 px-8 py-10 w-10/12 rounded-lg">
              <View className="mt-2">
                <Text className="label-form">E-mail</Text>
                <TextInput
                  className={`input-form ${touched && errors.email && 'border border-red-600'}`}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  value={values.email}
                  autoCorrect={false}
                  spellCheck={false}
                  autoComplete="off"
                  keyboardType="email-address"
                />
                {touched && errors && (
                  <Text className="self-end pr-6 pt-1 text-base text-red-600">
                    {errors.email}
                  </Text>
                )}
              </View>

              <View className="mt-6 relative">
                <Text className="label-form">Senha</Text>
                <TextInput
                  className={`input-form ${touched && errors.password && 'border border-red-600'}`}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  value={values.password}
                  secureTextEntry={!showPassword ? true : false}
                />
                {touched && errors && (
                  <Text className="self-end pr-6 pt-1 text-base text-red-600">
                    {errors.password}
                  </Text>
                )}
                {!showPassword ? (
                  <Ionicons
                    name="eye"
                    size={32}
                    color="#64748b"
                    className="absolute top-10 right-4"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Ionicons
                    name="eye-off"
                    size={32}
                    color="#64748b"
                    className="absolute top-10 right-4"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                )}
              </View>

              <View className="mt-6">
                <Pressable
                  className={`${!isValid ? "bg-gray-200" : "bg-megb-yellow-primary"} px-8 py-3 rounded-full flex-row justify-center`}
                  onPress={handleSubmit as any}
                >
                  <Text
                    className={`text-xl font-bold ${!isValid ? "text-gray-300" : "text-megb-blue-primary"
                      }`}
                  >
                    Entrar
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
        <StatusBar style="light" />
      </View>
    </>
  );
};

export default SignIn;
