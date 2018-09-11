export const getQuizs = ()=>({
    type:'GET_QUIZS'
})

export const getQuizsSuccess = (data) => ({
    type:'GET_QUIZS_SUCCESS',
    data
})

export const addQuiz = (name, purpose, questions) => ({
    type:'ADD_QUIZ',
    name, purpose, questions
})

export const updateQuiz = (name, purpose, questions,id) => ({
    type: 'UPDATE_QUIZ',
    name, purpose, questions,id
})

export const deleteQuiz = (id) =>({
    type:'DELETE_QUIZ',
    id
})