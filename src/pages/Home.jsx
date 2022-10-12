import React from "react";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PaintingsBlock/Skeleton";
import PaintingsBlock from "../components/PaintingsBlock";
import Pagination from "../components/Pagination"
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";


const Home = () => {
    const {categoryId, sort, currentPage} = useSelector(state => state.filter)
    const sortType = sort.sortProperty;
    const dispatch = useDispatch();

    const [paintings, setPaintings] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }


    const {searchValue} = React.useContext(SearchContext);

    React.useEffect(() => {

        setIsLoading(true)

        const order = sortType.includes('-') ? 'asc' : "desc";
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}`: '';
        const search = searchValue ? `&search=${searchValue}`: '';

        axios.get(`https://63386d3b937ea77bfdbff520.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setPaintings(res.data)
                setIsLoading(false)
            })
            window.scrollTo(0,0)
    },[categoryId, sortType, searchValue, currentPage])

    const drawings = paintings.map((obj) => <PaintingsBlock
        key={obj.id}
        // price={obj.price}
        // title={obj.title}
        // imageUrl={obj.imageUrl}
        // sizes={obj.sizes}
        // можно просто передать целый обьект
        {...obj}/>);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => {onChangeCategory(id)}}
                />
                <Sort/>
            </div>
            <h2 className="content__title">All paintings</h2>
            <div className="content__items">
                {isLoading ? skeletons : drawings}
            </div>
            <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}/>
        </div>
    )
}

export default Home;