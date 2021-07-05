import React from 'react';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme';

export function AppointmentDetails() {

   return (
      <Background>
         <Header title="Details" action={
            <BorderlessButton>
               <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
         } />
      </Background>
   )
}
