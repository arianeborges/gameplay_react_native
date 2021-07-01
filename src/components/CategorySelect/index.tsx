import React from 'react';
import { ScrollView } from 'react-native';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

import { styles } from './styles';

export function CategorySelect() {
   return (
      <ScrollView
         horizontal
         style={styles.container}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{ padding: 40 }}
      >
         {
            categories.map(category => (
               <Category />
            ))
         }

      </ScrollView>

   )
}
