import React from "react";
import { NextPage } from "next";
import styles from "./MovieItem.module.scss";
import Link from "next/link";
import Image from "next/image";

import { MovieSearchListType } from "@/types";

const MovieItem: NextPage<MovieSearchListType> = ({
    Title,
    Year,
    imdbID,
    Poster,
}) => {
    const { card, cardTop, cardBottom, cardInfo } = styles;
    console.log(Poster);
    return (
        <>
            <div className={card}>
                <div className={cardTop}>
                    {Poster.length > 3 ? (
                        <Image
                            alt={Title}
                            src={Poster}
                            width={300}
                            height={400}
                        ></Image>
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundImage:
                                    "linear-gradient(180deg, #f6ffff 0, #f3ffff 7.14%, #f2ffff 14.29%, #f1ffff 21.43%, #f0ffff 28.57%, #efffff 35.71%, #edf7f5 42.86%, #ebebeb 50%, #e8dfe2 57.14%, #e4d5dc 64.29%, #dfcbd7 71.43%, #d9c3d4 78.57%, #d2bcd3 85.71%, #cbb7d2 92.86%, #c3b3d2 100%)",
                            }}
                        ></div>
                    )}
                </div>
                <div className={cardBottom}>
                    <div className={cardInfo}>
                        <h4>{Title}</h4>
                        <p>{Year}</p>
                    </div>
                    <div>
                        <Link
                            href={`/movie/${imdbID}`}
                            className='button'
                        >
                            more
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieItem;
