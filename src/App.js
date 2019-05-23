//Imports to use React Hooks

import React, { useState, useEffect } from 'react';
import './App.css';

// Main component, "functional component"

export default function App() {
	//Initial states and their default values

	const [ isLoading, setIsLoading ] = useState(true);
	const [ number, setNumber ] = useState(Math.floor(Math.random() * 61));
	const [ data, setData ] = useState(null);

	// Stores the endpoint to access the api

	const endpoint = 'http://localhost:3000/planets';

	// Simple function to generate a random number from 0 to the length of the array

	function getRandomNumber() {
		return Math.floor(Math.random() * data.length);
	}

	// Asynchronous function to fetch the data from the API
	// After getting the fetch response, use the hooks to update the state

	async function getData(url) {
		try {
			const res = await fetch(url);
			const data = await res.json();
			setData(data);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}

		return data;
	}

	// A React Hook used to keep track of the changes and executes the function once

	useEffect(() => {
		getData(endpoint);
	});

	if (isLoading || !data) {
		return 'Loading...';
	}

	// Here is the return, where we choose what will be rendered (returned) from the App component when its called on index.js

	// The onClick function called by the button uses the setNumber function to update the state with the result
	// of getRandomNumber function It also shows in the console the previous state before changing.

	return (
		<div className="App">
			<div className="main">
				<div className="name">
					<h3>{data[number].name}</h3>
				</div>
				<div className="info">
					<h3>Population: {data[number].population}</h3>
					<h3>Climate: {data[number].climate}</h3>
					<h3>Terrain: {data[number].terrain}</h3>
					<h3>Featured in {data[number].films.length} films</h3>
				</div>
			</div>

			<button
				id="btn"
				onClick={() => {
					setNumber(getRandomNumber());
					console.log(`Last planet was: ${data[number].name} , number ${number}`);
				}}
			>
				Next
			</button>
		</div>
	);
}
