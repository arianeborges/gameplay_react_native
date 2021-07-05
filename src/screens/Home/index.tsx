import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Appointment } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';

import { styles } from './styles';

export function Home() {
   const [category, setCategory] = useState('');
   const navigation = useNavigation();

   const appointments = [
      {
         id: '1',
         guild: {
            id: '1',
            name: 'Lendários',
            icon: null,
            owner: true
         },
         category: '1',
         date: '22/06 at 20:40h',
         description: 'It is today that we will reach the challenger without losing a md10 match'
      },
      {
         id: '2',
         guild: {
            id: '1',
            name: 'Lendários',
            icon: null,
            owner: true
         },
         category: '2',
         date: '22/06 at 20:40h',
         description: 'It is today that we will reach the challenger without losing a md10 match'
      }
   ]

   function handleCategorySelect(categoryId: string) {
      categoryId === category ? setCategory('') : setCategory(categoryId);
   }

   function handleAppointmentDetails() {
      navigation.navigate('AppointmentDetails');
   }

   return (
      <Background>
         <View style={styles.header}>
            <Profile />
            <ButtonAdd />
         </View>

         <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
         />

         <View style={styles.content}>
            <ListHeader
               title="Scheduled matches"
               subtitle="Total 6"
            />

            <FlatList
               data={appointments}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                  <Appointment
                     data={item}
                     onPress={handleAppointmentDetails}
                  />
               )}
               ItemSeparatorComponent={() => <ListDivider />}
               style={styles.matches}
               showsVerticalScrollIndicator={false}
            />
         </View>
      </Background>
   )
}