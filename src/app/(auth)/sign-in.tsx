import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Failed to login");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Invalid", (err as Error).message);
    }
  };

  return (
    <View className="p-4 justify-center gap-3 flex-1 bg-white">
      {/* <Text className="text-3xl">Sign in</Text> */}
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
        onPress={onSignInPress}
        className="bg-blue-500 rounded-full p-4 items-center"
      >
        <Text className="text-white font-semibold">Continue</Text>
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text className="text-blue-500">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
