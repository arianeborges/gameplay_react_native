import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Platform } from 'react-native';
import { Button } from '../../components/Button';


export function AppointmentCreate() {
   const [category, setCategory] = useState('');

   return (
      <KeyboardAvoidingView
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
         <ScrollView>
            <Background>
            <Header title="Schedule match" />

            <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>Category</Text>

            <CategorySelect
               hasCheckBox
               setCategory={setCategory}
               categorySelected={category}
            />

            <View style={styles.form}>
               <RectButton>
                  <View style={styles.select}>
                     {/* <View style={styles.image} /> */}
                     <GuildIcon />

                     <View style={styles.selectBody}>
                        <Text style={styles.label}>Select a Server</Text>
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
                     <Text style={styles.label}>Day and month</Text>
                     <View style={styles.column}>
                        <SmallInput maxLength={2} />
                        <Text style={styles.divider}>/</Text>
                        <SmallInput maxLength={2} />
                     </View>
                  </View>

                  <View>
                     <Text style={styles.label}>Hour and minute</Text>
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
         </Background >
         </ScrollView>
      </KeyboardAvoidingView>
   )
}
