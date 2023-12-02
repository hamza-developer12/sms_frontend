import TeacherDashboard from "../../DashboardLayout/TeacherDashboard.jsx";
import { useEffect , useState } from "react";
import { uploadImagesApi } from "../../redux/api/UploadImagesSlice.js";
import { useSelector , useDispatch } from "react-redux"
import { toast } from "react-toastify";
import { getTeacherSubjectsApi } from "../../redux/api/GetTeacherSubjectsSlice.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addTestApi } from "../../redux/api/AddTestSlice.js";

const AddTest = () => {
    const dispatch = useDispatch();
    const [numberOfQuestions , setNumberOfQuestions] = useState(0);
    const [questions , setQuestions] = useState([]);
    const [options , setOptions] = useState([]);
    const [correctAnswers , setCorrectAnswers] = useState([])
    const [imageUpload , setImageUpload] = useState([])
    const [images , setImages] = useState([])
    const [totalMarks , setTotalMarks] = useState(0);
    const [eachMcqMarks , setEachMcqMarks] = useState(0);
    const [totalTime , setTotalTime] = useState(0)
    const [subjectId , setSubjectId] = useState('')
    const [testDate , setTestDate] = useState('');
    const modules = {
        toolbar : [
            [{ header : [1 , 2 , 3 , 4 , 5 , 6 , false] }] ,
            [{ font : [] }] ,
            [{ size : [] }] ,
            ["bold" , "italic" , "underline" , "strike" , "blockquote"] ,
            [
                { list : "ordered" } ,
                { list : "bullet" } ,
                { indent : "-1" } ,
                { indent : "+1" } ,
            ] ,
            ["image"] ,
        ] ,
    };
    const uploadedData = useSelector((state) => state.uploadImagesSlice)
    useEffect(() => {
        dispatch(getTeacherSubjectsApi())
    } , []);
    const { data , loading , error } = useSelector((state) => state.getTeacherSubjectsSlice)
    const handleNumberOfQuestionsChange = (e) => {
        let value = parseInt(e.target.value);

        if (value < 0) {
            setNumberOfQuestions(0);
        }
        setNumberOfQuestions(value);

        setQuestions(Array.from({ length : value } , () => ""))
        setOptions(Array.from({ length : value } , () => Array.from({ length : 5 } , () => (["" , "" , "" , "" , ""]))))
        setImageUpload(Array.from({ length : value } , () => (false)))
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let apiData = {
            questions ,
            options ,
            subjectId ,
            correctAnswers ,
            totalTime ,
            testDate ,
            totalMarks ,
            eachMcqMarks ,

        }
        dispatch(addTestApi(apiData))
        console.log(apiData)
    }
    const handleQuestionChange = (e , index) => {
        let updatedQuestions = [...questions];
        updatedQuestions[index] = e;
        setQuestions(updatedQuestions)
    }
    const handleOptionsChange = (e , index , optionIndex) => {
        let updatedOptions = [...options];
        updatedOptions[index][optionIndex] = e.target.value;
        setOptions(updatedOptions)
    }
    const handleCorrectAnswerChange = (e , index) => {
        let updatedCorrectAnswers = [...correctAnswers]
        updatedCorrectAnswers[index] = e.target.value;
        setCorrectAnswers(updatedCorrectAnswers)
    }
    const handleCheckBoxChange = (index) => {
        let updatedCheckBox = [...imageUpload];
        updatedCheckBox[index] = !imageUpload[index];
        setImageUpload(updatedCheckBox)
    }
    const handleImages = (e , index , optionIndex) => {
        let updatedImages = [...images]
        updatedImages[optionIndex] = e.target.files[0];
        setImages(updatedImages)
    }
    const handleUploadImages = (index) => {
        dispatch(uploadImagesApi(images))
            .then((data) => {
                console.log(data.payload)
                setOptions((prevOptions) => {
                    const newOptions = [...prevOptions];
                    newOptions[index] = data.payload;
                    toast.success("Images Uploaded")
                    setImages([])
                    return newOptions;
                });
            })
            .catch((error) => {
                console.error("Error uploading images:" , error);
            });
    }
    const ShowOptions = ({ index }) => {
        if (index === 1) {
            return <p>Option A:</p>
        }
        if (index === 2) {
            return <p>Option B:</p>
        }
        if (index === 3) {
            return <p>Option C:</p>
        }
        if (index === 4) {
            return <p>Option D:</p>
        }
        if (index === 5) {
            return <p>Option E:</p>
        }

    }
    return <TeacherDashboard>

        <form onSubmit={ handleSubmit } encType={ "multipart/form-data" }>
            <div className={ 'flex items-center justify-center flex-col mt-10 w-full' }>

                <select className={ 'w-[50%] bg-white p-4 my-2 text-center text-lg' } required={ true }
                        value={ subjectId }
                        onChange={ (e) => {
                            setSubjectId(e.target.value)
                        } }>
                    <option>Select a Subject</option>
                    { Array.isArray(data.subjects) && data.subjects.map((subject , index) => (
                        <option key={ index } value={ subject._id }>{ subject.subjectName }</option>
                    )) }
                </select>

                <input
                    placeholder={ 'Enter Number Of Questions' }
                    className={ 'my-2 p-4 w-[50%] rounded border' }

                    type={ "number" }
                    required={ true }
                    onChange={ (e) => {
                        handleNumberOfQuestionsChange(e);
                    } }
                />
                <input
                    type={ 'number' }
                    className={ 'my-2 p-4 w-[50%] rounded border' }
                    required={ true }
                    onChange={ (e) => {
                        if (e.target.value < 0) {
                            setTotalMarks(0)
                        }
                        setTotalMarks(parseInt(e.target.value))
                    } }
                    placeholder={ 'Total Marks' }/>
                <input
                    type={ 'number' }
                    className={ 'my-2 p-4 w-[50%] rounded border' }
                    required={ true }
                    onChange={ (e) => {
                        if (e.target.value < 0) {
                            setEachMcqMarks(0)
                        }
                        setEachMcqMarks(parseInt(e.target.value))
                    } }
                    placeholder={ 'Each Mcq Marks' }/>
                <input
                    type={ 'number' }
                    onChange={ (e) => {
                        setTotalTime(parseInt(e.target.value))
                    } }
                    className={ 'my-2 p-4 w-[50%] rounded border' }
                    placeholder={ 'Enter Test Time in Minutes' }/>
                <input
                    className={ 'my-2 p-4 w-[50%] rounded border' }
                    type={ 'date' }
                    onChange={ (e) => {
                        setTestDate(e.target.value)
                    } }
                    placeholder={ 'Enter Test Date' }/>

                { questions.map((question , index) => {
                    return <div key={ index } className={ 'w-full' }>

                        <div className={ 'flex items-center justify-center' }>
                            <ReactQuill
                                theme={ 'snow' }
                                className={ 'bg-white h-[30vh] w-[50%] overflow-y-scroll my-2 placeholder:text-xl' }
                                value={ question }
                                placeholder={ 'Enter Your Questions here....' }
                                onChange={ (event) => {
                                    handleQuestionChange(event , index)
                                } }

                                modules={ modules }
                            />
                        </div>
                        {/*Checkbox for adding Images*/ }
                        <div className={ 'flex items-center justify-center gap-4 my-4' }>
                            <input type={ "checkbox" }
                                   className={ 'mt-1' }
                                   onChange={ (e) => handleCheckBoxChange(index) }/>
                            <label>Select this if you want to add images</label>
                        </div>
                        {/*Checkbox code ends here........*/ }

                        { options[index].map((optionData , optionIndex) => (
                            <div key={ optionIndex }
                                 className={ 'flex  items-center justify-center flex-col w-[50%] mx-auto' }>
                                <label className={ 'text-left p-2 my-2 w-full' }><ShowOptions
                                    index={ optionIndex + 1 }/></label>
                                {
                                    imageUpload[index] ? <>

                                            <input type={ 'file' }
                                                   className={ 'w-full p-2 bg-white rounded' }
                                                   onChange={ (e) => handleImages(e , index , optionIndex) }
                                            />
                                        </>
                                        :
                                        <>
                                            <input type={ "text" }
                                                   className={ 'w-full p-2 rounded w-[50%]' }
                                                   onChange={ (e) => handleOptionsChange(e , index , optionIndex) }/>
                                        </>
                                }

                            </div>
                        )) }
                        { imageUpload[index] ? <>
                            <div className={ 'flex items-center justify-center mt-4' }>
                                <button
                                    className={ 'bg-green-400 w-[30%] p-2 rounded text-white' }
                                    type={ "button" } onClick={ () => {
                                    // upload images to cloud and in response store image url in options
                                    handleUploadImages(index)
                                } }>{ uploadedData.loading ? "Uploading Images..." : "Upload Images" }
                                </button>
                            </div>
                        </> : <></> }
                        <div className={ 'flex items-center justify-center my-6' }>
                            <input placeholder={ "Enter correct Option" }
                                   className={ 'w-[50%] mx-auto p-2 rounded my-4' }
                                   onChange={ (e) => handleCorrectAnswerChange(e , index) }/>

                        </div>
                    </div>
                }) }
                <button className={ 'w-[50%] bg-blue-500 text-white rounded mb-10 p-2' }>Submit</button>
            </div>
        </form>
    </TeacherDashboard>
}
export default AddTest