import React from 'react';
import { View, Text, Image } from 'react-native';
import { ButtonIcon } from '../../components/ButtonIcon';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';

export function SignIn() {
   return (
      <View style={styles.container}>
         <Image source={IllustrationImg} style={styles.image} resizeMode='stretch' />

         <View style={styles.content}>
            <Text style={styles.title}>
               Organize {'\n'} your games {'\n'} easily
            </Text>

            <Text style={styles.subtitle}>
               Create groups to play your favorite {'\n'}
               games with your friends
            </Text>

            <ButtonIcon title='Sign in with Discord' activeOpacity={.7} />
         </View>
      </View>
   )
}
