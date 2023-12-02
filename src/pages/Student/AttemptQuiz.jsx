import StudentDashboard from "../../DashboardLayout/StudentDashboard.jsx";
import { useEffect , useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleQuizApi } from "../../redux/api/GetSingleQuizSlice.js";
import usePopState from 'react-usepopstate'
import { deleteClassApi } from "../../redux/api/DeleteClassSlice.js";
import { getAllClassesApi } from "../../redux/api/GetAllClasses.js";
import { attemptQuizApi } from "../../redux/api/AttemptQuizSlice.js";
import { unstable_usePrompt } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AttemptQuiz = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [timeRemaining , setTimeRemaining] = useState(0);
    const [seconds , setSeconds] = useState(0);
    const [time , setTime] = useState(0);
    const [selectedOptions , setSelectedOptions] = useState([]);
    const [popup , setPopup] = useState(false);
    const [alphabets , setAlphabets] = useState(['A' , 'B' , 'C' , 'D'])
    useEffect(() => {
        dispatch(getSingleQuizApi(id));
    } , []);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            if (window.confirm("Are You Sure You Want to Refresh")) {
                return (event.returnValue = '')
            }

        }
        window.addEventListener('beforeunload' , handleBeforeUnload , { capture : true })

        return () => {
            window.removeEventListener('beforeunload' , handleBeforeUnload , { capture : true })
        }
    } , []);
    const { loading , data , error } = useSelector((state) => state.getSingleQuizSlice);
    let [questionIndex , setQuestionIndex] = useState(0);
    useEffect(() => {
        if (data && data.quizTime) {
            setTime(data.quizTime);
            setTimeRemaining(data.quizTime * 60 - 1); // Calculate timeRemaining in seconds
            setSeconds(59); // Set initial seconds
        }
    } , [data]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        return 59; // Reset seconds to 59
                    }
                    return prevSeconds - 1;
                });
            } else {
                clearInterval(timer);
                // handleSubmit()
                // Handle the end of the quiz when timeRemaining reaches 0.
            }
        } , 1000);

        return () => clearInterval(timer);
    } , [timeRemaining]);


    const increment = () => {
        if (questionIndex < data.questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
        }
    };

    const decrement = () => {
        // Implement your decrement logic here
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
        }
    };

    const handleOptionSelect = (questionIndex , optionIndex , optionValue) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[questionIndex] = optionValue;
        setSelectedOptions(updatedSelectedOptions);
    };

    const handleSubmit = () => {

        let correctAnswers = 0;
        for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions[i] === data.answers[i]) {
                correctAnswers++;
            }
        }
        let marksObtained = correctAnswers * data.eachMcqMarks;
        let totalMarks = data.totalMarks;
        let quizId = data._id;
        let quizName = data.subjectName?.subjectName;
        let apiData = { marksObtained , totalMarks , quizId , quizName }

        dispatch(attemptQuizApi(apiData)).then(() => {
            alert("Quiz Completed");
            window.location.href = '/student-dashboard/marks';
        })
    }

    const [optionIndex , setOpitonIndex] = useState(['A' , 'B' , 'C' , 'D' , 'E'])
    if (loading === true) {
        return (

            <div className={ 'flex items-center justify-center h-[80vh] w-full' }>
                <h1 className={ 'text-2xl text-gray-700' }>Loading...</h1>
            </div>

        );
    }

    if (error) {
        return (

            <div className={ 'flex items-center justify-center h-screen w-full' }>
                <h1 className={ 'text-2xl text-gray-700' }>{ error }</h1>
            </div>

        );
    }
    if (data) {
        return (
            <div>
                <div>
                    <div className={ 'w-full flex items-center  text-lg bg-[#B0926A] py-1 border-2 border-black' }>
                        <div
                            className={ 'flex items-center bg-[#FAE7C9] w-[90%] justify-center p-4 border-2 gap-5 border-black mx-1' }>
                            <div>
                                <h1>Quiz: { data.subjectName?.subjectName }</h1>
                            </div>
                            <h1>Total Marks: { data.totalMarks }</h1>
                            <h1>Quiz Time: { data.quizTime } minutes</h1>
                            <h1>Time Remaining: { Math.floor(timeRemaining / 60) } minutes { seconds } seconds</h1>
                        </div>
                        <div className={ 'bg-white w-[120px] h-[120px] border-2 rounded border-black mx-4' }></div>
                    </div>

                    <div className={ ' flex w-full mt-20 mx-2 flex-col rounded py-4' }>
                        {
                            data?.questions && data.questions.length > questionIndex &&
                            data.questions[questionIndex].includes('<img') ? (
                                <>
                                    <RenderImage data={ data?.questions[questionIndex] }
                                                 options={ data?.options[questionIndex] }/>
                                </>

                            ) : (
                                <>
                                    <div>
                                        <ReactQuill
                                            value={ Array.isArray(data.questions) && data.questions[questionIndex] }
                                            className={ 'h-[10vh]  text-xl font-bold bg-white' }
                                            readOnly={ true }
                                            theme={ 'snow' }
                                            modules={ { toolbar : false } }
                                            formats={ [] }
                                        />
                                        <div className={ 'flex items-center' }>
                                            <div className={ 'bg-yellow-600 w-[80px] p-2.5' }>
                                                { optionIndex.map((item , i) => {
                                                    return <div key={ i } className={ 'my-4' }>
                                                        <label className={ 'mx-2' }>{ item }</label>
                                                        <input type={ 'radio' }/>
                                                    </div>
                                                }) }
                                            </div>
                                            <div className={ 'w-full' }>
                                                { Array.isArray(data.options) && data.options[questionIndex].map((option , optIndex) => {
                                                    return <div key={ optIndex }
                                                                className={ ' border my-1 border-black py-2' }>{ option }</div>
                                                }) }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }


                        <div className={ 'w-full flex items-center justify-center gap-8 mt-10' }>
                            <button className={ 'bg-blue-500 px-4 py-3 rounded text-white' } onClick={ decrement }>
                                Prev
                            </button>
                            <button className={ 'bg-blue-500 px-4 py-3 rounded text-white' } onClick={ increment }>
                                Next
                            </button>
                            <button className={ 'bg-blue-500 px-4 py-3 rounded text-white' }
                                    onClick={ () => {
                                        setPopup(true)
                                    } }>Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={ `absolute lg:top-[40%] left-[25%] lg:left-[30%] top-[30%] w-[70%] lg:w-[40%] h-[40%] bg-gray-100 ${
                        popup === false ? "hidden" : "block"
                    } shadow-lg rounded flex items-center justify-center flex-col duration-100` }
                >
                    <h1 className="text-center text-xl mt-2">
                        Are You Sure You Want To Submit
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <button
                            className="py-1 px-5 rounded bg-red-500 text-white"
                            onClick={ () => {

                                handleSubmit()
                                setPopup(false)
                            } }
                        >
                            Yes
                        </button>
                        <button
                            className="py-1 px-5 rounded bg-purple-500 text-white"
                            onClick={ () => {
                                setPopup(false)
                            } }
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null; // Return null if data is not available yet
};

const RenderImage = ({ data , options }) => {
    const [optionsIndex , setOptionIndex] = useState(['A' , 'B' , 'C' , 'D' , 'E'])
    let tempDiv = document.createElement('div')
    tempDiv.innerHTML = data;
    console.log(options)
    const containsImgTag = tempDiv.querySelector('img') !== null;
    const baseUrl = import.meta.env.VITE_IMAGES_URL;
    return (
        <div>

            <div className={ 'border-2 border-black flex flex-col' }>
                {/* Render the HTML content in a div */ }
                <div dangerouslySetInnerHTML={ { __html : data } }
                     className={ 'w-full h-[30vh] flex items-center justify-center text-center' }/>
                <div>
                    <div className={ 'flex items-center justify-center gap-x-10' }>
                        { optionsIndex.map((item , index) => {
                            return <h1 key={ index } className={ 'mx-24 my-4 text-xl font-bold' }>{ item }</h1>
                        }) }
                    </div>
                    <div className={ 'flex w-full items-center justify-evenly gap-4' }>

                        { options.map((option , optionIndex) => {
                            return <div key={ optionIndex } className={ 'grid items-center justify-center bg-red-500' }>
                                <img src={ `${ baseUrl }/${ option }` } className={ 'w-[140px] grid-cols-2' }/>
                            </div>
                        }) }
                    </div>
                    <div className={ 'bg-red-500' }>h</div>
                </div>
            </div>
        </div>
    )
}
export default AttemptQuiz;
