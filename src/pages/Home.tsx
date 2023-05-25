import React, { useEffect } from "react";

import Categories from "../components/Categories";
import Sort, { sortList, sortOrderList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useSelector } from "react-redux";
import { selectFilter, setCategoryId, setFilter} from "../redux/slices/filterSlice";
import qs from "qs"
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {

const navigate = useNavigate();
const dispatch = useAppDispatch();
const isSearch = useRef(false);
const isMounted = useRef(false);

const { items, status }  = useSelector(selectPizzaData);

const { categoryId, sortProperty, sortOrder} = useSelector(selectFilter);
const onClickCategory = (id : number) => {
  dispatch(setCategoryId(id));
};



const { searchValue } = useSelector(selectFilter);


const getPizzas = () => {
  const category = categoryId > 0 ? `&category=${categoryId}` : '';
  const search = searchValue ? `search=${searchValue}` : '';
  const sortBy = sortProperty ? `&sortBy=${sortProperty.sortProperty}` : '';
  const order = sortOrder ? `&order=${sortOrder.order}` : '';
 
  dispatch(fetchPizzas({
    category,
    search,
    sortBy,
    order,
  }))

  window.scrollTo(0, 0);
}

useEffect(() => {
  if(window.location.search) {
    const params = qs.parse(window.location.search.substring(1));

    const _sortProperty = sortList.find((obj) => obj.sortProperty === params.sortProperty);
    const _sortOrder = sortOrderList.find((obj) => obj.order === params.sortOrder);
    
    if (!_sortOrder || !_sortProperty) {
      return;
    }
    dispatch(setFilter({
      ...params,
      sortProperty: _sortProperty,
      sortOrder: _sortOrder,
      categoryId: 0,
      searchValue: ""
    }))

    isSearch.current = true;
  }
}, [])

useEffect(() => {
  window.scrollTo(0, 0);

  if(!isSearch.current) {
    getPizzas();
  }

  isSearch.current = false;

}, [categoryId, sortProperty, sortOrder, searchValue]);

useEffect(() => {
  if(isMounted.current) {
    const queryStrings = qs.stringify({
      categoryId,
      sortProperty : sortProperty.sortProperty,
      sortOrder : sortOrder.order
    },
    {
      addQueryPrefix: true
    } 
    )
    navigate(`${queryStrings}`)
  }
  
  isMounted.current = true;
}, [categoryId, sortProperty, sortOrder]);

const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
const pizzas = items.map((pizza : any) => (<PizzaBlock key={pizza.id} {...pizza} />));

  return (
    <>
        <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onClickCategory} />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {
            status == 'error' ? <div>На жаль, піц немає <span>:(</span> </div>

            : <div className="content__items">
                {status == 'loading' ? skeletons : pizzas}
              </div>
          }
          
    </>
  )
}
