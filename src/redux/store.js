import {configureStore} from '@reduxjs/toolkit';
import loginSliceReducer from './api/loginSlice.js';
import addClassSliceReducer from "./api/AddClassSlice.js";
import getAllClassesReducer from "./api/GetAllClasses.js";
import getAllSubjectsReducer from "./api/GetAllSubjects.js";
import getAllTeachersReducer from "./api/GetAllTeachers.js";
import getAllStudentsReducer from "./api/GetAllStudents.js";
import getAllStaffReducer from "./api/GetAllStaff.js";
import addSubjectReducer from "./api/AddSubjectSlice.js";
import deleteSubjectSliceReducer from "./api/DeleteSubjectSlice.js";
import getSingleClassSliceReducer from "./api/GetSingleClass.js";
import addStudentSliceReducer from './api/AddStudentSlice.js'
import addStaffSliceReducer from "./api/AddStaffSlice.js";
import addTeacherSliceReducer from "./api/AddTeacherSlice.js";
import deleteStudentSliceReducer from './api/DeleteStudentSlice.js'
import getSingleSubjectSliceReducer from "./api/GetSingleSubject.js";
import deleteClassSliceReducer from './api/DeleteClassSlice.js';
import deleteTeacherSliceReducer from "./api/DeleteTeacherSlice.js";
import deleteStaffSliceReducer from "./api/DeleteStaffSlice.js";
import getSingleStaffSliceReducer from "./api/GetSingleStaffSlice.js";
import addSubjectStudentsSliceReducer from "./api/AddSubjectStudentsSlice.js";
import userDetailsSliceReducer from "./api/UserDetailsSlice.js";
import logoutUserSliceReducer from "./api/LogoutUserSlice.js";
import getSingleTeacherSliceReducer from "./api/getSingleTeacherSlice.js";
import addTeacherSubjectsSliceReducer from "./api/AddTeacherSubjectsSlice.js";
import createAttendanceSliceReducer from "./api/CreateAttendanceSlice.js";
import attendanceRecordSliceReducer from "./api/AttendanceRecordSlice.js";
import markAttendanceSliceReducer from "./api/MarkAttendanceSlice.js";
import getTeacherSubjectsSliceReducer from "./api/GetTeacherSubjectsSlice.js";
import addTestSliceReducer from "./api/AddTestSlice.js";
import getQuizzesSliceReducer from "./api/GetQuizzesSlice.js";
import getSingleStudentSliceReducer from "./api/GetSingleStudentSlice.js";
import getSpecificSubjectsSliceReducer from "./api/GetSpecificSubjectsSlice.js";
import getTeacherStudentsSliceReducer from "./api/GetTeacherStudentsSlice.js";
import getStudentTestsSliceReducer from "./api/GetStudentTestsSlice.js";
import getSingleQuizSliceReducer from "./api/GetSingleQuizSlice.js";
import attemptQuizSliceReducer from "./api/AttemptQuizSlice.js";
import studentMarksSliceReducer from "./api/StudentMarksSlice.js";
import getSingleStudentMarksSliceReducer from "./api/GetSingleStudentMarksSlice.js";
import getSearchResultSliceReducer from "./api/GetSearchResultSlice.js";
import uploadImagesSliceReducer from "./api/UploadImagesSlice.js";

export const store = configureStore({
    // middleware: [...getDefaultMiddleware({serializableCheck: false})],
    reducer: {
        loginSlice: loginSliceReducer,
        addClassSlice: addClassSliceReducer,
        getAllClassesSlice: getAllClassesReducer,
        getAllSubjectsSlice: getAllSubjectsReducer,
        getAllTeachersSlice: getAllTeachersReducer,
        getAllStudentsSlice: getAllStudentsReducer,
        getAllStaffSlice: getAllStaffReducer,
        addSubjectSlice: addSubjectReducer,
        deleteSubjectSlice: deleteSubjectSliceReducer,
        getSingleClassSlice: getSingleClassSliceReducer,
        addStudentSlice: addStudentSliceReducer,
        addStaffSlice: addStaffSliceReducer,
        addTeacherSlice: addTeacherSliceReducer,
        deleteStudentSlice: deleteStudentSliceReducer,
        getSingleSubjectSlice: getSingleSubjectSliceReducer,
        deleteClassSlice: deleteClassSliceReducer,
        deleteTeacherSlice: deleteTeacherSliceReducer,
        deleteStaffSlice: deleteStaffSliceReducer,
        getSingleStaffSlice: getSingleStaffSliceReducer,
        addSubjectStudentsSlice: addSubjectStudentsSliceReducer,
        userDetailsSlice: userDetailsSliceReducer,
        logoutUserSlice: logoutUserSliceReducer,
        getSingleTeacherSlice: getSingleTeacherSliceReducer,
        addTeacherSubjectsSlice: addTeacherSubjectsSliceReducer,
        createAttendanceSlice: createAttendanceSliceReducer,
        attendanceRecordSlice: attendanceRecordSliceReducer,
        markAttendanceSlice: markAttendanceSliceReducer,
        getTeacherSubjectsSlice: getTeacherSubjectsSliceReducer,
        addTestSlice: addTestSliceReducer,
        getQuizzesSlice: getQuizzesSliceReducer,
        getSingleStudentSlice: getSingleStudentSliceReducer,
        getSpecificSubjectsSlice: getSpecificSubjectsSliceReducer,
        getTeacherStudentsSlice: getTeacherStudentsSliceReducer,
        getStudentTestsSlice: getStudentTestsSliceReducer,
        getSingleQuizSlice: getSingleQuizSliceReducer,
        attemptQuizSlice: attemptQuizSliceReducer,
        studentMarksSlice: studentMarksSliceReducer,
        getSingleStudentMarksSlice: getSingleStudentMarksSliceReducer,
        getSearchResultSlice: getSearchResultSliceReducer,
        uploadImagesSlice: uploadImagesSliceReducer,
    }
})