import React from "react";
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import Task from './task.js'

export default function TaskList({taskdata, onDeleteTask, onEditTask, onCheckTask}){
    if (taskdata.length==0){
        return(
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image style={styles.loading} source={require('../assets/horse.gif')}/>
                <Text style={{fontFamily:'pangolin', fontSize:20}}>Start thinking!</Text>
            </View>

        );
    }
    return(
        <FlatList
        data={taskdata}
        renderItem={({item})=>(
            <Task key={item.id.toString()} task={item} onDelete = {()=>onDeleteTask(item.id)} onEdit={onEditTask} onCheck={onCheckTask}/>
    )}
        keyExtractor = {(item)=>{item.id.toString()}}
        style={styles.tasklist}
        />
    )
}
const styles=StyleSheet.create({
    tasklist:{
        flex:1,
        width:'100%',
    },
    loading:{
        
        width:200,
        height:200,
        resizeMode:'contain'
    }
})