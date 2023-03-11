import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import styles from "./MoviePage.module.scss";

import { MovieType, infoForTableType } from "@/types";

const MoviePage: NextPage = () => {
    const {
        root,
        rowTop,
        rowTopInfo,
        rowbottom,
        firstColumn,
        secondColumn,
        table,
    } = styles;
    const router = useRouter();
    const { imdbID } = router.query;

    const [movieInfo, setMovieInfo] = useState<MovieType>();
    const [infoForTable, setInfoForTable] = useState<infoForTableType>();
    console.log(movieInfo);
    useEffect(() => {
        if (imdbID) {
            axios
                .get(`http://www.omdbapi.com/?i=${imdbID}&apikey=d1dc0d66`)
                .then((response) => {
                    setMovieInfo(response.data);
                    const infoForTableTemporary: any = {};
                    response.data.Year !== "N/A"
                        ? (infoForTableTemporary.Year = response.data.Year)
                        : null;
                    response.data.Released !== "N/A"
                        ? (infoForTableTemporary.Released =
                              response.data.Released)
                        : null;
                    response.data.Runtime !== "N/A"
                        ? (infoForTableTemporary.Runtime =
                              response.data.Runtime)
                        : null;
                    response.data.Genre !== "N/A"
                        ? (infoForTableTemporary.Genre = response.data.Genre)
                        : null;
                    response.data.Director !== "N/A"
                        ? (infoForTableTemporary.Director =
                              response.data.Director)
                        : null;
                    response.data.Actors !== "N/A"
                        ? (infoForTableTemporary.Actors = response.data.Actors)
                        : null;
                    response.data.Country !== "N/A"
                        ? (infoForTableTemporary.Country =
                              response.data.Country)
                        : null;
                    response.data.imdbRating !== "N/A"
                        ? (infoForTableTemporary.imdbRating =
                              response.data.imdbRating)
                        : null;
                    setInfoForTable(infoForTableTemporary);
                });
        }
    }, [imdbID]);

    return (
        <>
            <div className='container'>
                {movieInfo && (
                    <div className={root}>
                        <button
                            className='button'
                            onClick={() => router.back()}
                        >
                            BACK
                        </button>
                        <div className={rowTop}>
                            <Image
                                alt={movieInfo.Title}
                                src={movieInfo.Poster}
                                width={200}
                                height={300}
                            ></Image>
                            <div className={rowTopInfo}>
                                <h2>{movieInfo.Title}</h2>
                                <p>{movieInfo.Plot}</p>
                            </div>
                        </div>
                        <div className={rowbottom}>
                            {infoForTable && (
                                <table className={table}>
                                    <tbody>
                                        {Object.keys(infoForTable).map(
                                            (key) => (
                                                <tr key={key}>
                                                    <td className={firstColumn}>
                                                        {key}
                                                    </td>
                                                    <td
                                                        className={secondColumn}
                                                    >
                                                        {infoForTable[key]}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MoviePage;
