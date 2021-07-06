import React, { useState } from 'react';
import { FlatList, ImageBackground, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';


export function AppointmentCreate() {
   const [category, setCategory] = useState('');

   return (
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

         </View>
      </Background >
   )
}
