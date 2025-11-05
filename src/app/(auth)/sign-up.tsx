import * as React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", (err as Error).message);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert("Sign Up Attempt Failed");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", (err as Error).message);
    }
  };

  if (pendingVerification) {
    return (
      <View className="p-4 justify-center gap-3 flex-1 bg-white">
        <Text className="text-3xl">Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          className="border border-neutral-500 p-4 rounded-lg"
        />
        <TouchableOpacity
          onPress={onVerifyPress}
          className="border border-neutral-50 rounded-full bg-blue-500 items-center p-4"
        >
          <Text className="text-white font-semibold">Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="p-4 justify-center gap-3 flex-1 bg-white">
      <>
        {/* <Text className="text-3xl">Sign up</Text> */}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
          className="border border-neutral-500 p-4 rounded-lg"
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          className="border border-neutral-500 p-4 rounded-lg"
        />
        <TouchableOpacity
          onPress={onSignUpPress}
          className="bg-blue-500 rounded-full p-4 items-center"
        >
          <Text className="text-white font-semibold">Continue</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text className="text-blue-500">Sign in</Text>
          </Link>
        </View>
      </>
    </View>
  );
}
