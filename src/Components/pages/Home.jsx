import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import {
  setCategoryId,
  setPageCount,
  setFiltres,
  selectorFilter,
} from '../../redux/slices/filterSlice';
import Pagination from '../Pagination/Pagination';
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import Skeleton from '../PizzaBlock/Skelet';
import { sortData } from '../Sort/Sort';
import { fetchPizzas, selectorPizza } from '../../redux/slices/pizzasSlice';
import { categoryData } from '../Categories/Categories';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const state = useSelector(selectorFilter);
  const { items, status } = useSelector(selectorPizza);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
    onPageClick(1);
  };

  const onPageClick = (number) => {
    dispatch(setPageCount(number));
  };

  const getPizzas = async () => {
    const category = state.categoryId ? `category=${state.categoryId}` : '';

    const sort = state.sort.sortProperty.replace('-', '');

    const order = state.sort.sortProperty.includes('-') ? 'asc' : 'desc';

    const search = state.searchValue && `&search=${state.searchValue}`;

    dispatch(
      fetchPizzas({
        category,
        sort,
        order,
        search,
        state,
      })
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: state.sort.sortProperty,
        categoryId: state.categoryId,
        pageCount: state.pageCount,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [state.categoryId, state.sort, state.searchValue, state.pageCount]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortData.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFiltres({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [state.categoryId, state.sort, state.searchValue, state.pageCount]);

  const fakeArr = [...new Array(6)];

  const skeletons = fakeArr.map((_, index) => {
    return <Skeleton key={index} />;
  });

  const pizzas = items.map((block) => {
    return <PizzaBlock key={block.id} {...block} />;
  });

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            index={state.categoryId}
            onClickCategory={onClickCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">
          {categoryData[state.categoryId]} пиццы
        </h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла шибка!</h2>
            <p>
              К сожалению, не удалось получить пиццы. Попробуйте повторить
              попытку позже!
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === 'loading' ? skeletons : pizzas}
          </div>
        )}

        <Pagination
          pageCount={state.pageCount}
          onChangePage={(number) => onPageClick(number)}
        />
      </div>
    </>
  );
};

export default Home;
