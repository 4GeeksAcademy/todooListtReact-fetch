import React, { useState, useEffect } from "react";
import Task from "./task.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	const createUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/EuclidesTeran", {
				method: "POST",
				headers: { "Content-Type": "application/json" }
			})
			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}


	const getTask = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/EuclidesTeran", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
			// console.log(response)
			const data = await response.json()
			if (response.status == 404) {
				createUser()
			}
			// console.log(data.todos)
			setTaskList(data.todos)
		} catch (error) {
			console.log(error)
		}
	}


	const createTask = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/EuclidesTeran", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body:JSON.stringify({
					"label": newTask,
  					"is_done": false
				})
			})
			const data = await response.json()
			console.log(data)
			getTask()
		} catch (error) {
			console.log(error)
		}
	}

	//https://playground.4geeks.com/todo/todos/9

	const deleteTask = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			})
			const data = await response.json()
			console.log(data)
			getTask()
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getTask()
	}, [])

	return (
		<div className="container">
			<h1 className="mt-2 text-success">Todo list</h1>
			<input className="form-control mb-2" type="text" value={newTask} placeholder="What do you want to do next?"
				onChange={(event) => setNewTask(event.target.value)}

				onKeyUp={(event) => {
					if (event.key == "Enter") {
						// setTaskList([newTask, ...taskList])
						createTask()
						setNewTask("");
					}
				}}
			/>
			{(taskList.length == 0) && <div>No more task! Time for a drink</div>}
			{taskList.map((tarea) => <Task task={tarea} key={tarea.id} onRemove={() => {
				// setTaskList(taskList
				// 	.filter((_tarea, indiceBorrar) => indice != indiceBorrar))
				deleteTask(tarea.id)
			}} />)}
			<p>{taskList.length} items left</p>

		</div>
	);
};

export default Home;
