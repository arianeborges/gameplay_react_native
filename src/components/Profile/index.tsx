import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

export function Profile() {
   return (
      <View style={styles.container}>
         <View>
            <View style={styles.user}>
               <Text style={styles.greeting}>Hello,</Text>
               <Text style={styles.username}>Ariane</Text>
            </View>
            <Text style={styles.message}>Today is the winning day</Text>
         </View>
      </View>
   )
}
