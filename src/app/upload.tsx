import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";

const Upload = () => {

	const [images, setImages] = useState<any[]>([]);

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
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.75
		};

		if (useLibrary) {
			result = await ImagePicker.launchImageLibraryAsync(options);
		} else {
			await ImagePicker.requestCameraPermissionsAsync();
			result = await ImagePicker.launchCameraAsync(options);
		}

		// Save image if not cancelled
		if (!result.canceled) {
			console.log(result.assets[0].uri);
			// saveImage(result.assets[0].uri);
		}
	};

	return (
		<View>
		</View>
	)
}

export default Upload