import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText type="title">title.</ThemedText>
    </View>
  );
}
