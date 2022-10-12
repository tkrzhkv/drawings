import React from "react"
import {SearchContext} from "../../App"
import debounce from 'lodash.debounce'
import styles from "./Search.module.scss"



const Search = () => {
    const [value, setValue] = React.useState('')
    const {setSearchValue} = React.useContext(SearchContext)
    const inputRef = React.useRef()

    const onClickClear = () => {
        setSearchValue('');
        setValue('')
        inputRef.current.focus();
    }

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 500),
        [],
    )

    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }
    return (
        <div className={styles.root}>
            <img
                className={styles.icon__search}
                src="/img/search.svg"
                alt="search"
            />
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder='Searching...'
            />
            {value && (
                <img
                    onClick={() => onClickClear()}
                    className={styles.icon__close}
                    src="/img/close.svg"
                    alt="close"
                />
            )}
        </div>
    )
}

export default Search;