import React,{useState} from "react";
import { StyleSheet, Text, View} from 'react-native';
import ProgressBar from 'react-native-progress/Bar'
export default function TaskProgress({completed, total}){
    let msg='';
    let percent=0;
    if (total>0){
        percent=completed/total;
    }
    if (completed == 0 && total>=1){
        msg = "Start Working!";
    }else if(percent>=0.5 && percent<1){
        msg = "Halfway there!";
    }else if (percent>0.5){
        msg = 'Well Done!';
    }
    return(
        <View style={styles.container}>
            <View style={styles.progressHead}>
        
                <Text style={{fontFamily: 'Quicksand_700Bold'}}>Today's progress</Text>
            </View>
            <ProgressBar progress={percent} height={10} width={300} color={'black'}/>
            <View style={styles.progressText}>

                <Text style={{fontFamily: 'pangolin'}}>{msg}</Text>
                <Text style={{fontFamily: 'Quicksand_400Regular'}}>{completed}/{total}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:'96%',
        height:110,
        borderColor:'black',
        borderWidth:2,
        borderRadius:10,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
    },
    progressText:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'70%',
        // alignSelf:'flex-end',
        marginRight:50,
        paddingTop:10
    },
    progressHead:{
        alignSelf:'flex-start',
        fontFamily: 'Quicksand_700Bold',

        paddingLeft:20,
        marginBottom:20,
        marginTop:10
    }
})