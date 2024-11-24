import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TaskList from "../components/tasklist";
import TaskProgress from '../components/progress';
export default function HomeScreen() {
    const [tasklist, setTasklist] = useState([]);
    const [isModalVisible, setModalVisibility] = useState(false);
    const [desc, setDesc] = useState('');
    const [editId, setEditId]= useState(null);
    const [priority, setPriority] = useState(null)
    function addNew() {
        if (desc.trim()) {
          if (editId){
            const uTask = tasklist.map((task)=>(task.id===editId)?{...task, desc:desc, priority:priority}:task);
            setTasklist(uTask);
            setEditId(null);
          }else{
            if(priority){
                const newTask = { id: Date.now().toString(), desc: desc , done:false, priority:priority};
                console.log(newTask);
                setPriority(null);
                setTasklist([...tasklist, newTask]);
            }else{
            const newTask = { id: Date.now().toString(), desc: desc , done:false, priority:null};
            console.log(newTask);
            setTasklist([...tasklist, newTask]);
            }

        }
        setDesc('');
        setModalVisibility(false);
      }
    }
    function checkTask(id, status){
      const uTask = tasklist.map((task)=>(task.id===id)?{...task, done:!status}:task);
      setTasklist(uTask);
    }
    function deleteTask(id){
      setTasklist(tasklist.filter((task)=>task.id!=id));
    }
    function editTask(id, desc){
      setEditId(id);
      setDesc(desc);
      setModalVisibility(true);
    }
    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {setModalVisibility(false);setPriority(null)}}
                animationType='slide'
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter your task"
                            value={desc}
                            onChangeText={setDesc}
                        />
                        <Text style={{alignSelf:'flex-start', padding:10, fontFamily:'Quicksand_700Bold'}}>Priority : {(priority)?priority:''}</Text>
                        <View style={styles.chipsection}>
                            <TouchableOpacity style={styles.chip} onPress={()=>setPriority('low')}>
                                <MaterialCommunityIcons name="gauge-empty" size={24} color="white" />
                                <Text style={{color:'white'}}>Low</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.chip} onPress={()=>setPriority('high')}>
                                <MaterialCommunityIcons name="gauge-full" size={24} color="white" />
                                <Text style={{color:'white'}}>High</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonField}>
                            <TouchableOpacity style={styles.button} onPress={addNew}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisibility(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View>
                <Text style={styles.appTitle}>Todo</Text>
            </View>
            <TaskProgress completed={tasklist.filter((task)=>task.done).length} total={tasklist.length}/>
            <View style={{width:'100%',alignItems:'center',justifyContent:'space-between', flexDirection:'row'}}>
                <Text style={styles.sectionTitle}>Today</Text>
                <TouchableOpacity style={styles.chip} onPress={()=>setTasklist([])}>
                    <MaterialCommunityIcons name="close-circle-multiple-outline" size={24} color="white" />
                    <Text style={{marginLeft:10, color:'white'}}>clear all</Text>
                </TouchableOpacity>
            </View>
            
            <TaskList taskdata={tasklist} onDeleteTask={deleteTask} onEditTask={editTask} onCheckTask={checkTask}/>

            <TouchableOpacity style={styles.newButton} onPress={() => setModalVisibility(true)}>
                <AntDesign name="pluscircle" size={40} color="black" />
            </TouchableOpacity>
            
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:20,
        backgroundColor:'white'
    },
    appTitle: {
        alignSelf:'flex-start',
        width: '100%',
        padding: 15,
        textAlign: 'left',
        fontSize: 30,
        // fontWeight: 'bold',
        fontFamily:'pangolin'
    },
    sectionTitle: {
        alignSelf:'flex-start',
        // width: '100%',
        padding: 15,
        textAlign: 'left',
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily:'Quicksand_700Bold'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical:20,
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent:'center',
        alignItems: 'center',
        // marginVertical:20,
    },
    inputField: {
        height: 40,
        width: 250,
        borderColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 5,
        fontFamily:'Quicksand_700Bold',
    },
    buttonField: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    newButton: {
        position: 'absolute',
        bottom: 50,
        right: 50,
    },
    chipsection:{
        flexDirection:'row',
        marginBottom:20,
        borderBottomWidth:1,
    },
    chip:{
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        backgroundColor:'black',
        paddingHorizontal:15,
        borderRadius:50,
        height:30,
    }
});
