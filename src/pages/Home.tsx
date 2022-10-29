import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Skeleton from "../components/PaintingsBlock/Skeleton";
import PaintingsBlock from "../components/PaintingsBlock";
import Pagination from "../components/Pagination";
import SortPopup from "../components/Sort";

import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchPaintings } from "../redux/painting/asyncActions";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPainting } from "../redux/painting/selectors";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPainting);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const sortType = sort.sortProperty;
  const isSearch = React.useRef(false);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPaintings = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPaintings({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  // //If first render passed, then check url params and save it in redux
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPaintingParams;
  //     const sort = sortItems.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortItems[0],
  //       })
  //     );
  //   }
  //   isSearch.current = true;
  // }, []);

  // //If params changed and first render passed
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, searchValue, currentPage]);

  // //If first render was then request drawing(paintings).
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);

  //   if (!isSearch.current) {
  //     getPaintings();
  //   }
  //   isSearch.current = false;
  // }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    getPaintings();
  }, [categoryId, sortType, searchValue, currentPage]);

  const drawings = items.map((obj: any) => (
    <PaintingsBlock
      key={obj.id}
      {...obj}
    />
  ));

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => {
            onChangeCategory(id);
          }}
        />
        <SortPopup value={sort} />
      </div>
      <h2 className='content__title'>All paintings</h2>
      {status === "error" ? (
        <div className='content__error-info'>
          <h2>Error , please try again.</h2>
        </div>
      ) : (
        <div className='content__items'>{status === "loading" ? skeletons : drawings}</div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;
