export const getQuiz = (quizid) =>( {
    type: 'GET_QUIZ',
    quizid
})

export const getQuizSuccess = (data) => ({
    type:'GET_QUIZ_SUCCESS',
    data
})

export const getUser = (userid) =>( {
    type: 'GET_USER',
    userid
})

export const getUserSuccess = (data) =>({
    type:'GET_USER_SUCCESS',
    data
})