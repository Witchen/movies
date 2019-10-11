import React from 'react';
import Movie from './Movie';

export default function MovieGroup(props) {
	const { groupName, movies } = props.movieGroup;
	return (
		<div style={style.container}>
			<div style={style.groupNameContainer}>
				<span>{groupName}</span>
			</div>
			<div style={style.moviesContainer}>
				{movies.map((movie, index) => {
					return (
						<Movie key={index} movie={movie} />
					);
				})}
			</div>
		</div>
	);
}

const style = {
	container: {
		maxWidth: '100%',
		width: '100%',
		border: '3px solid white',
		borderRadius: '5px',
		marginBottom: '20px',
	},
	groupNameContainer: {
		margin: '10px 0px',
		fontSize: '2rem',
	},
	moviesContainer: {
		display: 'flex',
		overflowX: 'auto',
		paddingBottom: '20px',
	}
};