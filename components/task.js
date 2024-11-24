import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import CheckBox from "react-native-check-box";
export default function TaskList({task, onDelete, onEdit, onCheck}){
    return(
        <View style={styles.taskview}>


            <View style={styles.task}>
            <CheckBox isChecked={task.done} onClick={()=>onCheck(task.id, task.done)}/>
            <Text style={[styles.desc, task.done&&styles.completed]}>{ task.desc }</Text> 
            </View>
            {task.priority&&(
            <View style={styles.chip} onPress={()=>setPriority('high')}>
                <MaterialCommunityIcons name={task.priority=='high'?'gauge-full':'gauge-empty'} size={24} color="white" />
                <Text style={{color:'white'}}>{task.priority.charAt(0).toUpperCase()+task.priority.slice(1,task.priority.length)}</Text>
            </View>
           )}
           <View style={{flexDirection:'row', justifyContent:'center', alignSelf:'space-between',marginTop:-30, marginRight:10, paddingBottom:10}}>
  

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="cancel" size={22} color="black" style={{paddingRight:10}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onEdit(task.id, task.desc)}>
            <MaterialIcons name="edit" size={22} color="black"/>

            </TouchableOpacity>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    taskview:{
        flexDirection: 'column',
        margin: 5,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
    },
    task:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    desc:{
        fontSize:16,
        fontFamily:'Quicksand_400Regular',
        paddingLeft:10
    },
    completed:{
        textDecorationLine:'line-through',
        color:'grey',
    },
    chip:{
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        backgroundColor:'black',
        paddingHorizontal:15,
        borderRadius:50,
        height:30,
        alignSelf:'flex-start',
    }
})