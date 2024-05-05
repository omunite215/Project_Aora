import { Link } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/appWrite";

const SignUp = () => {
	const { setUser, setIsLogged } = useGlobalContext();
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async () => {
		if (form.username === "" || !form.email === "" || !form.password === "") {
			Alert.alert("Error", "Please fill in all the fields");
		}
		setIsSubmitting(true);
		try {
			const result = await createUser(form.email, form.password, form.username);
			setUser(result);
			setIsLogged(true);
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
						Welcome to Aora !!
					</Text>
					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-7"
					/>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
					/>
					<CustomButton
						title="Sign Up"
						handlePress={handleSubmit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already ?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Sign in.
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
