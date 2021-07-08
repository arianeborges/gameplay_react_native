import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { GuildProps } from '../../components/Appointment';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Background } from '../../components/Background';

export function AppointmentCreate() {
   const [category, setCategory] = useState('');
   const [openGuildsModal, setOpenGuildsModal] = useState(false);
   const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

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

   return (
      <KeyboardAvoidingView
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
         <Background>
            <ScrollView>
               <Header title="Schedule match" />

               <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>Category</Text>

               <CategorySelect
                  hasCheckBox
                  setCategory={setCategory}
                  categorySelected={category}
               />

               <View style={styles.form}>
                  <RectButton onPress={handleOpenGuilds}>
                     <View style={styles.select}>
                        {
                           guild.icon
                              ? <GuildIcon />
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
                           <SmallInput maxLength={2} />
                           <Text style={styles.divider}>/</Text>
                           <SmallInput maxLength={2} />
                        </View>
                     </View>

                     <View>
                        <Text style={[styles.label, { marginBottom: 12 }]}>Hour and minute</Text>
                        <View style={styles.column}>
                           <SmallInput maxLength={2} />
                           <Text style={styles.divider}>:</Text>
                           <SmallInput maxLength={2} />
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
                  />

                  <View style={styles.footer}>
                     <Button title="Schedule" />
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
