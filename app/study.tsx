import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

function Study() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="titleLarge" style={{fontSize: 72, fontWeight: 600}}>Study</Text>
    </View>
  )
}

export default Study