import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ number, setNumber ] = useState(Math.floor(Math.random() * 61));
	const [ data, setData ] = useState(null);
	const endpoint = 'http://localhost:3000/planets';

	function getRandomNumber() {
		return Math.floor(Math.random() * 61);
	}

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

	useEffect(() => {
		getData(endpoint);
	});

	//const userFetchResponse = getData(endpoint);

	if (isLoading === true || !data) {
		return 'Loading...';
	}

	//const { name, population, climate, terrain, films } = userFetchResponse.data[0];

	//console.log(userFetchResponse);

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
