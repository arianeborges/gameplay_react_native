import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { GuildProps } from '../Appointment';
import { GuildIcon } from '../GuildIcon';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = TouchableOpacityProps & {
   data: GuildProps
}

export function Guild({ data, ...rest }: Props) {
   return (
      <TouchableOpacity
         style={styles.container}
         activeOpacity={0.7}
         {...rest}
      >
         <GuildIcon guildId={data.id} iconId={data.icon} />

         <View style={styles.content}>
            <View>
               <Text style={styles.title}>
                  {data.name}
               </Text>

               <Text style={styles.type}>
                  {data.owner ? 'Admin' : 'Guest'}
               </Text>
            </View>
         </View>

         <Feather 
            name="chevron-right"
            color={theme.colors.heading}
            size={24}
         />

      </TouchableOpacity>
   )
}
