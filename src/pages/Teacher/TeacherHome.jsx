import TeacherDashboard from "../../DashboardLayout/TeacherDashboard.jsx";
import { useDispatch , useSelector } from "react-redux";
import { useEffect , useState } from "react";
import { getQuizzesApi } from "../../redux/api/GetQuizzesSlice.js";
import ReactPaginate from "react-paginate";
import moment from 'moment';

const TeacherHome = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuizzesApi())
    } , [])
    const { loading , data , error } = useSelector((state) => state.getQuizzesSlice)
    let items = data;
    const [itemOffset , setItemOffset] = useState(0);
    const [currentItems , setCurrentItems] = useState([]);
    const itemsPerPage = 5;
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        if (Array.isArray(items)) {

            setCurrentItems(items.slice(itemOffset , endOffset));
        }
    } , [itemOffset , items]);

    let pageCount = Array.isArray(items) ? Math.ceil(items.length / itemsPerPage) : 0;

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };
    if (data.length === 0) {
        return (
            <TeacherDashboard>
                <div className={ 'flex items-center justify-center h-[80vh] w-full text-lg ' }>
                    <h1>No Test Created Yet</h1>
                </div>
            </TeacherDashboard>
        );
    }
    return (
        <TeacherDashboard>
            <div className={ 'w-full ' }>
                <div className={ 'w-full' }>
                    <table
                        className="border border-black mx-auto w-auto sm:w-[500px] md:w-[800px] lg:w-[1050px]  mt-2">
                        <thead className="bg-black text-white">
                        <tr>
                            <th className="px-4 py-2 text-center">S.No</th>
                            <th className="px-4 py-2 text-center">Subject Name</th>
                            <th className="px-4 py-2 text-center">Test Creation Date</th>
                            <th className="px-4 py-2 text-center">Test Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        { currentItems.map((item , index) => (
                            <tr key={ item._id } className="bg-white">
                                <td className="px-4 py-2 text-center">{ index + 1 }</td>
                                <td className="px-4 py-2 text-center">{ item?.subjectName?.subjectName }</td>
                                <td className="px-4 py-2 text-center">{ moment(item.createdAt).format("MMM Do YY") }</td>
                                <td className="px-4 py-2 text-center">{ moment(item.quizDate).format("MMM Do YY") }</td>
                            </tr>
                        )) }
                        </tbody>
                    </table>
                </div>
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={ handlePageClick }
                pageRangeDisplayed={ 5 }
                pageCount={ pageCount }
                previousLabel="< previous"
                renderOnZeroPageCount={ null }
                containerClassName="flex items-center gap-x-2 justify-center text-lg my-4"
                pageClassName="text-purple-500 px-2"
                activeClassName="text-purple-800 bg-gray-100"
                nextLinkClassName="text-purple-500"
                previousLinkClassName="text-purple-500"
            />
        </TeacherDashboard>
    );
}

export default TeacherHome;