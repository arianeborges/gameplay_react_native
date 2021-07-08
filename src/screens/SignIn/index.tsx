import React from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';
import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function SignIn() {
   const { signIn, loading } = useAuth();

   async function handleSignIn() {
      try {
         await signIn();
      } catch (error) {
         Alert.alert(error);
      }
   }

   return (
      <Background>
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

               {
                  loading
                     ? <ActivityIndicator color={theme.colors.primary}/>
                     : <ButtonIcon title='Sign in with Discord' onPress={handleSignIn} />
               }
            </View>
         </View>
      </Background>
   )
}
