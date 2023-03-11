import React, { useState, useCallback, useRef, ChangeEvent } from "react";
import { NextPage } from "next";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "@/redux/slices/moviesSlice";
import Image from "next/image";
import styles from "./SearchMovie.module.scss";

const SearchMovie: NextPage = () => {
    const { root, row, icon, input, iconClose } = styles;
    const [value, setValue] = useState<string>("");

    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const onClickClear = () => {
        setValue("");
        dispatch(setSearchValue(""));
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 500),
        []
    );

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };
    return (
        <>
            <div className='container'>
                <div className={root}>
                    <div className={row}>
                        <input
                            ref={inputRef}
                            value={value}
                            onChange={(event) => onChangeInput(event)}
                            className={input}
                            type='text'
                            placeholder='Search...'
                        />
                        {value && (
                            <Image
                                onClick={() => onClickClear()}
                                className={iconClose}
                                src='images/Search/iconClose.svg'
                                alt='iconClose'
                                width={40}
                                height={40}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchMovie;
