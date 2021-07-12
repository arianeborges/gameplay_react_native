import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Text, View, Alert } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentsProps } from '../../components/Appointment';
import { api } from '../../services/api';

import BannerImg from '../../assets/banner.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { Load } from '../../components/Load';

type Params = {
   guildSelected: AppointmentsProps;
}

type GuildWidget = {
   id: string;
   name: string;
   instant_invite: string;
   members: MemberProps[];
}

export function AppointmentDetails() {
   const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
   const [loading, setLoading] = useState(true);

   const routes = useRoute();
   const { guildSelected } = routes.params as Params;

   async function fetchGuildInfo() {
      try {
         const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
         setWidget(response.data);
      } catch (error) {
         Alert.alert('Check server settings. Is the Widget enabled?')
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      fetchGuildInfo();
   }, [])

   return (
      <Background>
         <Header title="Details" action={
            <BorderlessButton>
               <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
         } />

         <ImageBackground source={BannerImg} style={styles.banner}>
            <View style={styles.bannerContent}>
               <Text style={styles.title}>{guildSelected.guild.name}</Text>
               <Text style={styles.subtitle}>{guildSelected.description}</Text>
            </View>
         </ImageBackground>

         {
            loading ? <Load /> :
               <>
                  <ListHeader title="Players" subtitle={`Total ${widget.members.length}`} />

                  <FlatList
                     data={widget.members}
                     keyExtractor={item => item.id}
                     renderItem={({ item }) => (
                        <Member data={item} />
                     )}
                     ItemSeparatorComponent={() => <ListDivider isCentered />}
                     style={styles.members}
                     showsVerticalScrollIndicator={false}
                  />
               </>
         }

         <View style={styles.footer}>
            <ButtonIcon title="Join the match" />
         </View>
      </Background >
   )
}
