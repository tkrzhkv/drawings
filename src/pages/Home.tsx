import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PaintingsBlock/Skeleton";
import PaintingsBlock from "../components/PaintingsBlock";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPaintings } from "../redux/slices/paintingSlice";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { sortItems } from "../components/Sort";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);
  const { items, status } = useSelector((state: any) => state.painting);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: any) => state.filter
  );

  const sortType = sort.sortProperty;
  const isSearch = React.useRef(false);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPaintings = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      // @ts-ignore
      fetchPaintings({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  //If first render passed, then check url params and save it in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItems.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //If params changed and first render passed
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  //If first render was then request drawing(paintings).
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPaintings();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const drawings = items.map((obj: any) => (
    <Link
      key={obj.id}
      to={`/paintingInfo/${obj.id}`}
    >
      <PaintingsBlock {...obj} />
    </Link>
  ));

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => {
            onChangeCategory(id);
          }}
        />
        <Sort />
      </div>
      <h2 className='content__title'>All paintings</h2>
      {status === "error" ? (
        <div className='content__error-info'>
          <h2>Error , please try again.</h2>
        </div>
      ) : (
        <div className='content__items'>
          {status === "loading" ? skeletons : drawings}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;
