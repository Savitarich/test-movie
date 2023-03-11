import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MovieList.module.scss";
import axios from "axios";
import { NextPage } from "next";

import MovieItem from "./MovieItem/MovieItem";

import { MovieSearchListType } from "@/types";
import { RootState } from "@/redux/store";

const MovieList: NextPage = () => {
    const { listRow, paginationNav, paginationNavInner, listEmpty } = styles;
    const [movies, setMovies] = useState<MovieSearchListType[]>();

    const searchValue = useSelector(
        (state: RootState) => state.movies.searchValue
    );

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
    let endPage = Math.min(currentPage + halfMaxPagesToShow, totalPages);
    if (endPage - startPage < maxPagesToShow) {
        if (startPage === 1) {
            endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
        } else {
            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }
    }
    useEffect(() => {
        axios
            .get(
                `https://www.omdbapi.com/?apikey=d1dc0d66&s=${searchValue}&type=movie&r=json&page=${currentPage}`
            )
            .then((response) => {
                setMovies(response.data.Search);
                setTotalPages(Math.ceil(response.data.totalResults / 10));
            });
    }, [currentPage, searchValue]);
    if (!searchValue) {
        return (
            <div className={listEmpty}>
                <h2>Use the search</h2>
            </div>
        );
    }
    return (
        <>
            <div className='container'>
                <>
                    {movies ? (
                        <div className={listRow}>
                            {movies.map((movie) => (
                                <MovieItem
                                    key={movie.imdbID}
                                    {...movie}
                                ></MovieItem>
                            ))}
                        </div>
                    ) : (
                        <div className={listEmpty}>
                            <h2>Search found nothing</h2>
                        </div>
                    )}
                </>

                {movies && (
                    <div className={paginationNav}>
                        <div className={paginationNavInner}>
                            {startPage > 1 && (
                                <button onClick={() => setCurrentPage(1)}>
                                    1
                                </button>
                            )}
                            {startPage > 2 && <span>...</span>}
                            {Array.from(
                                { length: endPage - startPage + 1 },
                                (_, index) => (
                                    <button
                                        key={startPage + index}
                                        onClick={() =>
                                            setCurrentPage(startPage + index)
                                        }
                                        disabled={
                                            startPage + index === currentPage
                                        }
                                    >
                                        {startPage + index}
                                    </button>
                                )
                            )}
                            {endPage < totalPages - 1 && <span>...</span>}
                            {endPage < totalPages && (
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MovieList;
