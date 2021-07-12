import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Appointment, AppointmentsProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Load } from '../../components/Load';
import { Profile } from '../../components/Profile';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { styles } from './styles';

export function Home() {
   const [category, setCategory] = useState('');
   const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);
   const [loading, setLoading] = useState(true);

   const navigation = useNavigation();

   function handleCategorySelect(categoryId: string) {
      categoryId === category ? setCategory('') : setCategory(categoryId);
   }

   function handleAppointmentDetails() {
      navigation.navigate('AppointmentDetails');
   }

   function handleAppointmentCreate() {
      navigation.navigate('AppointmentCreate');
   }

   async function loadAppointments() {
      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
      const appointmentsStorage: AppointmentsProps[] = storage ? JSON.parse(storage) : [];

      if (category) {
         setAppointments(appointmentsStorage.filter(item => item.category === category));
      } else {
         setAppointments(appointmentsStorage);
      }

      setLoading(false);
   }

   useFocusEffect(useCallback(() => {
      loadAppointments();
   }, [category]));

   return (
      <Background>
         <View style={styles.header}>
            <Profile />
            <ButtonAdd onPress={handleAppointmentCreate} />
         </View>

         <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
         />


         {
            loading ? <Load /> :
               <>
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
                     contentContainerStyle={{ paddingBottom: 69 }}
                     style={styles.matches}
                     showsVerticalScrollIndicator={false}
                  />
               </>
         }

      </Background>
   )
}