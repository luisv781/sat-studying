import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

function Search() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
        backgroundColor: theme.colors.background,
      }}
    >
        <Text variant="titleLarge" style={{fontSize: 72, fontWeight: 600}}>Search Questions</Text>
    </View>
  )
}

export default Search