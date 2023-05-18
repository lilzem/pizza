import React, { ChangeEvent } from 'react'
import Icon from '@mdi/react';
import { mdiMagnify, mdiWindowClose } from '@mdi/js';
import styles from './Search.module.scss'
import debounce  from 'lodash.debounce'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, setSearchValue } from '../../redux/slices/filterSlice';

const Search : React.FC = () => {

const dispatch = useDispatch();
const [value, setValue] = React.useState('');    
const searchValue  = useSelector((selectSearch))
const inputRef = React.useRef<HTMLInputElement>(null); 
const onClickClear = () => {
  setValue('');
  dispatch(setSearchValue(''));
  inputRef.current?.focus();
}

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      console.log(str);
      dispatch(setSearchValue(str));
    }, 250),
    []
  )

  const onChangeInput = (event : ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
        <Icon className={styles.search_icon} path={mdiMagnify} size={1} />
        <input
            ref={inputRef}
            onChange={onChangeInput}
            value={value} 
            className={styles.input} 
            placeholder='Пошук піци...' />
        {searchValue &&  <Icon onClick={onClickClear} className={styles.close_icon} path={mdiWindowClose} size={1} />}
    </div>
  )
}

export default Search;
