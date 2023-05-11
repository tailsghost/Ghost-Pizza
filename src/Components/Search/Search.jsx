import { useCallback, useRef, useState } from 'react';
import { setSearchValue } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';
import style from './Search.module.scss';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  // eslint-disable-next-line
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    []
  );

  const onChangeValue = (event) => {
    setValue(event);
    updateSearchValue(event);
  };

  return (
    <div className={style.root}>
      <svg
        className={style.icon}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path d="M0 0h48v48h-48z" fill="none" />
      </svg>
      {value && (
        <svg
          className={style.clear}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => onClickClear()}
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск пиццы"
        className={style.input}
        value={value}
        onChange={(event) => onChangeValue(event.target.value)}
      />
    </div>
  );
};

export default Search;
