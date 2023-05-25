import React, { useState, useRef, useEffect } from 'react'
import Icon from '@mdi/react';
import { mdiSort } from '@mdi/js';
import { useSelector } from "react-redux";
import { setSortType, setSortOrder, selectFilter, SortBy, Order} from "../redux/slices/filterSlice";
import { useAppDispatch } from '../redux/store';

export const sortList: SortBy[] = [{name : 'популярности', sortProperty : 'rating'},
                        {name : 'цене', sortProperty : 'price'},
                        {name : 'алфавиту', sortProperty : 'title'}];

export const sortOrderList: Order[] = [ {name : 'за зростанням', order : 'asc'},
          {name : 'за спаданням', order : 'desc'}];

          
const Sort: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [openSort, setOpenSort] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  

  const dispatch = useAppDispatch();
  const {sortProperty, sortOrder} = useSelector(selectFilter);
  

  const onClickSortType = ( obj: SortBy) => {
    dispatch(setSortType(obj));
    setOpen(false);
  }

  const onClickSortOrder = (obj : Order) => {
    dispatch(setSortOrder(obj));
    setOpenSort(false);
  }

  const toggleSortVisibility = () => {
    setOpen(!open);
    setOpenSort(false);
  }

  const toggleOrderVisibility = () => {
    setOpenSort(!openSort);
    setOpen(false);
  }

  useEffect(() => {
    const togglePopUp = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path : Node[];
        composedPath : Node[];
      }

      const path = event.composedPath ? event.composedPath() : _event.path;
      if (sortRef.current && !path.includes(sortRef.current)) {
        setOpen(false);
        setOpenSort(false);
      }
    }

    document.body.addEventListener('click', togglePopUp);

    return () => {
      document.body.removeEventListener('click', togglePopUp);
    }
  }, []);
  
  return (
      <div ref={sortRef} className="sort">
            <div className="sort__label">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
                />
              </svg>
              <b>Сортировка по:</b>
              <span onClick={toggleSortVisibility}>{sortProperty.name}</span>
              <span onClick={toggleOrderVisibility}>
                <Icon className='sort__icon' path={mdiSort} size={1} color='#fe5f1e'/>
              </span>
            </div>
            {open && (
            <div className="sort__popup">
              <ul>
                {sortList.map((obj, index) => (
                  <li onClick={() => onClickSortType(obj)}
                    key={index}  
                    className={ sortProperty.sortProperty === obj.sortProperty ? 'active' : '' }>
                    {obj.name}
                  </li>
                ))}
              </ul>
            </div>
            )}
            {openSort && (
            <div className="sort__popup">
              <ul>
                {sortOrderList.map((obj, index) => (
                  <li onClick={() => onClickSortOrder(obj)}
                    key={index}
                    className= {sortOrder.order === obj.order ? 'active' : ''}>
                      {obj.name}
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
  )
}

export default Sort;