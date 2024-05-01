import React, { useCallback, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Pressable, Image, StatusBar } from "react-native";
import { Link, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import apisos from '@/services/apisos';
import Loading from '@/components/Loading';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const Upload = () => {
	const { order, url } = useLocalSearchParams();
    const height = StatusBar.currentHeight;
	const [loading, setLoading] = useState<boolean>(false);
	const [imageView, setImageView] = useState<any[]>([]);

	const getPermission = async () => {
		const { granted } = await ImagePicker.requestCameraPermissionsAsync();

		if (!granted) {
			alert('Você precisa dar permissão!');
		}
	};
	useEffect(() => {
		getPermission();
	}, []);

	const selectImage = async (useLibrary: boolean) => {
		let result;
		const options: ImagePicker.ImagePickerOptions = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1,
			base64: true
		};

		if (useLibrary) {
			result = await ImagePicker.launchImageLibraryAsync(options);
		} else {
			await ImagePicker.requestCameraPermissionsAsync();
			result = await ImagePicker.launchCameraAsync(options);
		}

		// Save image if not cancelled
		if (!result.canceled) {
			uploadImage(result.assets[0].base64);
			// setImageView([...imageView, { 'image': result.assets[0].uri }]);
		}
	};

	const uploadImage = async (image: any) => {
		setLoading(true);
		await apisos.post('/upload', {
			ordem_id: order,
			imagem: image,
		}).then((res) => {
			// console.log(res.data.message);
			getShowImages();
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			setLoading(false);
		})
	}
	const getShowImages = async () => {
		await apisos.get(`images/${order}`)
			.then((res) => {
				const { result } = res.data;
				setImageView(result);
			})
	};

	useFocusEffect(
		useCallback(() => {
			getShowImages();
		}, [])
	);

	return (
		<>
            <Loading visible={loading} />
            <View className='flex-1 bg-gray-200' style={{ paddingTop: height }}>
                <View className='bg-megb-blue-secundary p-4'>
				<Link asChild href={`/(tabs)/${url === 'order' ? 'order' : 'customer'}`}>
                        <Ionicons name='arrow-back' size={25} color={'#FFF0CE'} />
                    </Link>
                    <View className='py-4 flex-col items-center'>
                        <Text className='text-xl uppercase font-bold text-megb-yellow-secundary'>Uplod de arquivos para a ordem</Text>
                        <Text className='text-5xl uppercase font-bold text-megb-yellow-primary mt-4'>{order}</Text>
                    </View>
                </View>
				<View className='flex-row justify-center py-4'>
				</View>
				<View className='flex-row items-center justify-around'>
					<View>
						<Pressable
							onPress={() => selectImage(true)}
							className='w-36 flex-row justify-center py-2 bg-megb-yellow-primary rounded-md shadow-sm shadow-slate-700'
						>
							<Text className='text-lg font-bold'>Galeria</Text>
						</Pressable>
					</View>
					<View>
						<Pressable
							onPress={() => selectImage(false)}
							className='w-36 flex-row justify-center py-2 bg-megb-yellow-primary rounded-md shadow-sm shadow-slate-700'
						>
							<Text className='text-lg font-bold'>Camera</Text>
						</Pressable>
					</View>
				</View>
				<View className='flex-wrap flex-row items-center justify-center gap-4 mt-8 mx-3'>
					{imageView.map((img: any, idx: number) => (
						<View key={idx} className='bg-megb-blue-secundary p-2'>
							<Image
								className="w-24 h-24"
								source={{ uri: `${process.env.EXPO_PUBLIC_SERVER_IP}/storage/ordens/${order}/${img.imagem}` }}
							/>
						</View>
					))}
				</View>
			</View>
            <ExpoStatusBar style='light' backgroundColor='#0174BE' />
		</>
	)
}

export default Upload