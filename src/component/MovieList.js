import React from 'react';
import MovieGroup from './MovieGroup';
import { get } from './Util';

const apiUrl = 'https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=[page]&perPage=20';
const groupType = 'Multi-Title-Manual-Curation';
const imageType = 'POSTER';

class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieGroups: []
    }
    this.page = 0;
  }

  componentDidMount() {
    this.getFeed();
  }

  getFeed = () => {
		window.removeEventListener('scroll', this.handleScroll);
		
		this.page += 1;
		const url = apiUrl.replace('[page]', this.page);
		get(url, this.updateFeed);
  }

  updateFeed = (feed) => {
    if (feed.data.length === 0) return;

    const groups = feed.data;
    const multiTitleGroups = groups.filter(group => group.type === groupType);
    const movieGroups = multiTitleGroups.map(group => {
      const groupName = group.row_name;
      const movies = group.data.map(movie => {
        const poster = movie.images.filter(image => image.type === imageType)[0];
        const posterUrl = poster ? poster.url : ''; 
        return {
					id: movie.id,
          title: movie.title,
          image: posterUrl, 
        }
      });
      return { groupName, movies }
    })
    const newMovieGroup = [ ...this.state.movieGroups, ...movieGroups ];
    this.setState({ movieGroups: newMovieGroup });
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const percent = scrollTop / scrollHeight;
    const needLoadNewPage = percent > 0.8;
    if (needLoadNewPage) this.getFeed();
  }

  render() {
    return (
      <div style={style.container} onScroll={this.handleScroll}>
        {this.state.movieGroups.map((movieGroup, index) => {
          return (
            <MovieGroup key={index} movieGroup={movieGroup} />
          );
        })}
      </div>
    );
  }
}

const style = {
  container: {
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    padding: '20px',
  }
}

export default MovieList;
