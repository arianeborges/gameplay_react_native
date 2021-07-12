import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { GuildProps } from '../../components/Appointment';
import { ModalView } from '../../components/ModalView';
import { Background } from '../../components/Background';
import { Guilds } from '../Guilds';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function AppointmentCreate() {
   const [category, setCategory] = useState('');
   const [openGuildsModal, setOpenGuildsModal] = useState(false);
   const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

   const [day, setDay] = useState('');
   const [month, setMonth] = useState('');
   const [hour, setHour] = useState('');
   const [minute, setMinute] = useState('');
   const [description, setDescription] = useState('');

   const navigation = useNavigation();

   function handleOpenGuilds() {
      setOpenGuildsModal(true);
   }

   function handleCloseGuilds() {
      setOpenGuildsModal(false);
   }

   function handleGuildSelected(guildSelected: GuildProps) {
      setGuild(guildSelected);
      setOpenGuildsModal(false);
   }

   function handleCategorySelect(categoryId: string) {
      setCategory(categoryId);
   }

   async function handleSave() {
      const newAppointment = {
         id: uuid.v4(),
         guild,
         category,
         date: `${day}/${month} às ${hour}:${minute}h`,
         description
      };

      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
      const appointments = storage ? JSON.parse(storage) : [];

      await AsyncStorage.setItem(
         COLLECTION_APPOINTMENTS,
         JSON.stringify([...appointments, newAppointment])
      );

      navigation.navigate('Home');
   }

   return (
      <KeyboardAvoidingView
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
         <Background>
            <Header title="Schedule match" />

            <ScrollView>
               <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>Category</Text>

               <CategorySelect
                  hasCheckBox
                  setCategory={handleCategorySelect}
                  categorySelected={category}
               />

               <View style={styles.form}>
                  <RectButton onPress={handleOpenGuilds}>
                     <View style={styles.select}>
                        {
                           guild.icon
                              ? <GuildIcon guildId={guild.id} iconId={guild.icon} />
                              : <View style={styles.image} />
                        }
                        <View style={styles.selectBody}>
                           <Text style={styles.label}>
                              {guild.name ? guild.name : 'Select a Server'}
                           </Text>
                        </View>

                        <Feather
                           name="chevron-right"
                           color={theme.colors.heading}
                           size={18}
                        />
                     </View>
                  </RectButton>

                  <View style={styles.field}>
                     <View>
                        <Text style={[styles.label, { marginBottom: 12 }]}>Day and month</Text>
                        <View style={styles.column}>
                           <SmallInput maxLength={2} onChangeText={setDay} />
                           <Text style={styles.divider}>/</Text>
                           <SmallInput maxLength={2} onChangeText={setMonth} />
                        </View>
                     </View>

                     <View>
                        <Text style={[styles.label, { marginBottom: 12 }]}>Hour and minute</Text>
                        <View style={styles.column}>
                           <SmallInput maxLength={2} onChangeText={setHour} />
                           <Text style={styles.divider}>:</Text>
                           <SmallInput maxLength={2} onChangeText={setMinute} />
                        </View>
                     </View>
                  </View>

                  <View style={[styles.field, { marginBottom: 12 }]}>
                     <Text style={styles.label}>Description</Text>
                     <Text style={styles.charactersLimit}>Max 100 characters</Text>
                  </View>

                  <TextArea
                     multiline
                     maxLength={100}
                     numberOfLines={5}
                     autoCorrect={false}
                     onChangeText={setDescription}
                  />

                  <View style={styles.footer}>
                     <Button title="Schedule" onPress={handleSave} />
                  </View>
               </View>
            </ScrollView>
         </Background>

         <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
            <Guilds handleGuildSelected={handleGuildSelected} />
         </ModalView>
      </KeyboardAvoidingView>
   )
}
