import React from 'react';
import queryString from 'query-string';
import { Link } from "react-router-dom";
import { get } from './Util';

const apiUrl = 'https://cdn-discover.hooq.tv/v1.2/discover/titles/';

export default class MovieDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: null
		}
	}

	componentDidMount() {
		const values = queryString.parse(document.location.search);
		const movieId = values.id;
		const url = apiUrl + movieId;
		get(url, (response) => {
			if (response.data) {
				this.setState({ movie: response.data });
			}
		});
	}

	getPeopleNames(people, role) {
		return people
			.filter(people => people.role === role)
			.map(people => people.name)
			.join(", "); 
	}

	getNotNull(value) {
		return value || '-';
	}

	render() {
		const { movie } = this.state;
		if (!movie) return null;
		
		const backgroundImageUrl = movie.images[1].url;
		const director = this.getPeopleNames(movie.people, 'DIRECTOR');
		const cast = this.getPeopleNames(movie.people, 'CAST');
		const details = [
			{ label: 'Age Rating', value: this.getNotNull(movie.meta.ageRating) },
			{ label: 'Release', value: this.getNotNull(movie.meta.releaseYear) },
			{ label: 'Run Time', value: this.getNotNull(movie.running_time_friendly) },
			{ label: 'Director', value: this.getNotNull(director) },
			{ label: 'Cast', value: this.getNotNull(cast) },
		];
		return (
			<div style={style.container}>
				<div style={style.imageContainer}><img src={backgroundImageUrl} alt='NA' style={style.image}></img></div>
				<div style={{ ...style.card, fontSize: '1.5em' }}><span>{movie.title}</span></div>
				<div style={style.card}><span>{movie.description}</span></div>
				<div style={style.card}>
					<table>
						<tbody style={{ verticalAlign: 'top' }}>
							{details.map(({label, value}, index) => {
								return (
								<tr key={index} style={style.row}>
									<td style={style.label}>{label}</td>
									<td>{value}</td>
								</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div>
				<Link to={'/'}><button style={style.backButton}>Back</button></Link>
				</div>
			</div>
		);
	}
}

const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'stretch',
		alignItems: 'stretch',
		maxWidth: '580px',
		margin: '30px auto',
		padding: '20px',
		borderRadius: '20px',
		backgroundColor: '#226ec1',
	},
	card: {
		backgroundColor: 'darkcyan',
    padding: '15px 10px',
    marginBottom: '15px',
    borderRadius: '10px',
	},
	imageContainer: {
		margin: 'auto',
		marginBottom: '15px',
	},
	image: {
		width: '100%',
		borderRadius: '10px'
	},
	row: {
		padding: '10px 0px'
	},
	label: {
		whiteSpace: 'nowrap',
		paddingRight: '20px',
		paddingBottom: '10px',
	},
	backButton: {
		width: '100%',
    height: '40px',
    backgroundColor: 'skyblue',
    borderColor: 'cornflowerblue',
    borderRadius: '10px',
    cursor: 'pointer',
	}
};