
export const getQuestions = () =>({
    type:'GET_QUESTIONS'
})

export const getQuestionsSuccess = (data) => ({
    type: 'GET_QUESTIONS_SUCCESS',
    data
})
export const addQuestion = (question,timelimit,opt1,opt2,opt3,opt4,answer) => ({
    type: 'ADD_QUESTION',
    question,
    timelimit,
    options: [{'value':opt1},{'value':opt2},{'value':opt3},{'value':opt4}],
    answer
})

export const deleteQuestion = (id) =>({
    type:'DELETE_QUESTION',
    id
})

export const updateQuestion = (id,question,timelimit,opt1,opt2,opt3,opt4,answer) => ({
    type: 'UPDATE_QUESTION',
    id,
    question,
    timelimit,
    options: [{'value':opt1},{'value':opt2},{'value':opt3},{'value':opt4}],
    answer
})

export const questionSelection = (id) =>({
        type:'QUESTION_SELECTION',
        id
})