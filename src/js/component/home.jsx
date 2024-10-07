import React, { useState, useEffect } from "react";
import Task from "./task.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	const createUser= async() => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/EuclidesTeran",{
				method:"POST",
				headers:{"Content-Type":"application/json"}
			})
			const data = await response.json()
				console.log(data)
		} catch (error) {
			console.log(error)
		}
	}


	const getTask= async() => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/EuclidesTeran",{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			})
			const data = await response.json()
				console.log(data.todos)
				setTaskList(data.todos)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getTask()
	},[])

	return (
		<div className="container">
			<h1>Todo list</h1>
			<input type="text" value={newTask} placeholder="What do you want to do next?"
				onChange={(event) => setNewTask(event.target.value)}

				onKeyUp={(event) => {
					if (event.key == "Enter") {
						setTaskList([newTask, ...taskList])
						setNewTask("");
					}
				}}
			/>
			{(taskList.length == 0) && <div>No more task! Time for a drink</div>}
			{taskList.map((tarea, indice) => <Task task={tarea} key={indice} onRemove={() => {
				setTaskList(taskList
					.filter((_tarea, indiceBorrar) => indice != indiceBorrar))
			}} />)}
			<p>{taskList.length} items left</p>

		</div>
	);
};

export default Home;
