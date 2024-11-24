import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home.js';
import { useFonts } from 'expo-font';
import {Quicksand_400Regular, Quicksand_700Bold} from '@expo-google-fonts/quicksand';
import { Pangolin_400Regular} from '@expo-google-fonts/pangolin'

export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontStatus] = useFonts({Quicksand_400Regular,Quicksand_700Bold, pangolin:Pangolin_400Regular});
  if (!fontStatus) {
    return null;
}
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="To do" 
        component={HomeScreen}
        options={
          {
            headerShown:false,
          }
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
