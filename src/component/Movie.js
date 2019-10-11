import React from 'react';
import { Link } from "react-router-dom";

export default function Movie(props) {
	const { movie } = props;
	return (
		<div style={style.container}>
			<Link to={'/movie?id=' + movie.id}>
				<img src={movie.image} style={style.image} alt='NA'></img>
			</Link>
			<span style={style.title}>{movie.title}</span>
		</div>
	);
}

const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		margin: '10px',
		padding: '10px',
		backgroundColor: '#36404a',
		borderRadius: '5px',
	},
	image: {
		marginBottom: '5px',
	},
	title: {
		fontSize: '0.9rem'
	}
}