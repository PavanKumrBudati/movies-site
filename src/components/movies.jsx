import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviestable";
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        pageSize: 10,
        currentPage: 1,
        genres: [],
        selectedGenre: '',
        sortColumn: { path: "title", order: "asc" }
    };

    componentDidMount() {
        this.setState({ movies: getMovies(), genres: getGenres() });
    }
    
    handleDelete = (movie) => {
        const movies = this.state.movies.filter((m) => m._id !== movie._id);
        this.setState({ movies: movies });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSort = path => {
        const tempOrd = this.state.sortColumn.path !== path ? 'asc' : ((this.state.sortColumn.order === 'asc') ? 'desc' : 'asc')
        this.setState({ sortColumn: { path: path, order: tempOrd } });
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;
        let filtered = selectedGenre ?
            allMovies.filter(m => m.genre.name === selectedGenre.name) :
            allMovies;

        filtered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(filtered, currentPage, pageSize);

        if (count === 0) return <p>There are no movies in the database.</p>;
        return (
            <main className="row">
                <div className="col-3 ">
                    <ListGroup
                        items={this.state.genres}
                        textProperty="name"
                        valueProperty="_id"
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {filtered.length} movies.</p>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        className="pagination"
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </main >
        );
    }
}

export default Movies;
