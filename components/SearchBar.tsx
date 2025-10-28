import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface Props {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ value, placeholder, onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        tintColor="#ab8bff"
        resizeMode="contain"
      />
      <TextInput
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#ab8bff"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
