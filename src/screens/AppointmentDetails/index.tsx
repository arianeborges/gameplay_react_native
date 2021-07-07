import React from 'react';
import { FlatList, ImageBackground, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { Fontisto } from '@expo/vector-icons';
import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentDetails() {
   const members = [
      {
         id: '1',
         username: 'Ariane',
         avatar_url: 'https://github.com/arianeborges.png',
         status: 'online'
      },
      {
         id: '2',
         username: 'Ari',
         avatar_url: 'https://github.com/arianeborges.png',
         status: 'offline'
      }
   ]

   return (
      <Background>
         <Header title="Details" action={
            <BorderlessButton>
               <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
         } />

         <ImageBackground source={BannerImg} style={styles.banner}>
            <View style={styles.bannerContent}>
               <Text style={styles.title}>Lendários</Text>
               <Text style={styles.subtitle}>It is today that we will reach the challenger without losing a md10 match</Text>
            </View>
         </ImageBackground>

         <ListHeader title="Players" subtitle="Total 3" />

         <FlatList
            data={members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
               <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
            showsVerticalScrollIndicator={false}
         />

         <View style={styles.footer}>
            <ButtonIcon title="Join the match" />
         </View>
      </Background >
   )
}
