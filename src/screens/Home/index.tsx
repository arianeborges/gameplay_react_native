import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';

import { styles } from './styles';

export function Home() {
   const [category, setCategory] = useState('');

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
      }
   ]

   function handleCategorySelect(categoryId: string) {
      categoryId === category ? setCategory('') : setCategory(categoryId);
   }

   return (
      <View>
         <View style={styles.header}>
            <Profile />
            <ButtonAdd />
         </View>

         <View>
            <CategorySelect
               categorySelected={category}
               setCategory={handleCategorySelect}
            />
         </View>

         <View style={styles.content}>
            <ListHeader
               title="Scheduled matches"
               subtitle="Total 6"
            />
            
            <FlatList
               data={appointments}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                  <Text>{item.description}</Text>
               )}
            />
         </View>
      </View>
   )
}