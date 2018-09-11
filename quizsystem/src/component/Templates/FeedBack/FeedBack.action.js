export const updateFeedback = (userId,feedback,correctCount,totalQuestion)=>({
    type:'UPDATE_FEEDBACK',
    userId,feedback,correctCount,totalQuestion
})