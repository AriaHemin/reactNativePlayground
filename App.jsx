/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';

function App(){
  	const [modalVisible, setModalVisible] = useState(false);
  	const [count , setCount] = useState(0)
  	const [tasks, setTasks] = useState([])
  	const [userInput , setUserInput] = useState()
  	const [isInEditMode ,setIsInEditMode] = useState(false)

	
	
	

  	setlocalcount = async (value) => {
	  const jsonValue = JSON.stringify(value)
	  await AsyncStorage.setItem('count', jsonValue)
	}
	
	getlocalcount  = async () => {
		const jsonValue = await AsyncStorage.getItem('count')
		if(jsonValue  === null){
			setCount(0)
		}else{
			setCount(jsonValue != null ? JSON.parse(jsonValue) : null)
			
		}	
	}

	setLocalStorage = async (value) => {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem('key', jsonValue)
	}

	getMyObject = async () => {
		const jsonValue = await AsyncStorage.getItem('key')
		
		if(jsonValue  === null){
	  		setTasks([])
		}else{
			setTasks(jsonValue != null ? JSON.parse(jsonValue) : null)
		}
  	}
	
	useEffect(()=>{
		getMyObject()
		getlocalcount()
	},[])
	useEffect(()=>{
		setlocalcount(count)
		setLocalStorage(tasks)
	},[count , tasks])
  clearAll = async () => {
	try {
	  await AsyncStorage.clear()
	} catch(e) {
	  // clear error
	}
  
	console.log('Done.')
  }

  return (
    <SafeAreaView>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        >
        <View style={{display:"flex", alignItems:"center", flexDirection:"row", justifyContent: "space-between", paddingTop: 5}} >
			<Text  style={styles.titleText} >todo list app !!!</Text>
			<Pressable
				onPress={()=>{
					setIsInEditMode(!isInEditMode)
				}}
				>
				<Text style={styles.editButton}> {isInEditMode ? "done" : "edit"}</Text>
			</Pressable>
		</View>
        <ScrollView  >{ tasks !== undefined ? 
			tasks.map((task)=>{
				return(
					<View style={styles.task} key={task.key} >
						{isInEditMode ? 
						<View style={styles.task} >
							<Pressable onPress={()=>{
								
								setTasks(
									tasks.filter(t => t.key !== task.key)
								)
								setLocalStorage(tasks)
								
							}} >
								<Text style={{color: "white", fontSize: 30 , color: "red", paddingHorizontal:10 }}  >x</Text>
							</Pressable>
							<Text style={styles.counter}>{task.title}</Text>
						</View>
						:
						<View style={styles.task} >
							<CheckBox
							disabled={false}
							value={task.done}
							onValueChange={()=>{
								task.done = !task.done
								/*tasks.map((t)=>{
									t.key === task.key ? t.done = !t.done: t
								}*/
								setTasks(tasks)
								setLocalStorage(tasks)
							}}
							/>
							<Text style={styles.counter}>{task.title}</Text>
						</View>
						}</View>
				)
			}) : null
        }</ScrollView>
		
		<View>
			<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setModalVisible(!modalVisible);
			}}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: " 100%", paddingHorizontal: 10 }} >
						<TextInput style={{width: "80%", marginHorizontal: 5}}
							onChangeText={(e)=>{setUserInput(e)}}
							placeholder="buy milk"
							/>
						<Button onPress={()=>{
							setCount(count + 1)
							setTasks([...tasks, {title: userInput, key: count, done: false}])
							setUserInput("")
							setLocalStorage(tasks)
							setlocalcount(count)
							setModalVisible(!modalVisible)
						}} title="add" />
					</View>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => setModalVisible(!modalVisible)}>
						<Text style={styles.textStyle}>Hide Modal</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
		<View>
			<Pressable style={styles.bottomLeft}
			onPress={() => setModalVisible(true)}>
				<View style={styles.addTaskButton}>
					<Text style={{fontSize: 30, color: "white"}} >+</Text>
				</View>
			</Pressable>
		</View>
		</View>
		{/*
		<Button  onPress={()=>{
			clearAll()
		}} title='reset' />*/}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  counter: {
    fontSize: 30,
	color: "white"
  },
  titleText: {
	marginHorizontal: 20,
    fontSize: 30,
	color: "white"
  },
  checkbox:{
	width: 30,
	height: 30,
	backgroundColor: "white",
	borderRadius: 15,
	marginHorizontal: 5
  },
  task: {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",

  },
  checkboxPressed:{
	width: 30,
	height: 30,
	backgroundColor: "black",
	borderRadius: 15,
	marginHorizontal: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
	width: "75%",
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addTaskButton:{
	width: 50,
	height: 50,
	borderRadius: 25,
	backgroundColor: "#2196F3",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "white",
  }
  ,
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bottomLeft:{
	margin: 10,
	position: "relative"
	,top: 0,
	left: 0
  },
  editButton:{
	marginHorizontal: 20,
	paddingRight:10,
    fontSize: 30,
	color: "white",
	backgroundColor: "#2196F3",
	borderRadius: 10,
	marginTop: 5,
  },
  button: {
	borderRadius: 10,
	padding: 10,
	margin: 10,
  }
});

export default App;
