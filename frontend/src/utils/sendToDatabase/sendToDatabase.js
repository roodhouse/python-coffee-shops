import { handleNewSubmission } from "./handleNewSubmission"
import { handleReviewUpdate } from "./handleReviewUpdate"

export const sendToDatabase = async (submission, editReview, userData, userAuthenticated, reviewId) => {
    const user_email = userData.user_email
    const user_id = userData.user_id
    const venue = submission.venue
    const image = submission.image
    const location = submission.location
    const address = submission.address
    const hours = submission.hours
    const rating = parseInt(submission.Summary[0].answer)
    const answers = [
        {
            'p1' : parseInt(submission.Productivity[0].answer),
            'p2' : parseInt(submission.Productivity[1].answer),
            'p3' : parseInt(submission.Productivity[2].answer),
            'p4' : parseInt(submission.Productivity[3].answer),
            'p5' : parseInt(submission.Productivity[4].answer),
            'p6' : parseInt(submission.Productivity[5].answer),
            'c1' : parseInt(submission.Community[0].answer),
            'c2' : parseInt(submission.Community[1].answer),
            'ser1' : parseInt(submission.Service[0].answer),
            'ser2' : parseInt(submission.Service[1].answer),
            'ser3' : parseInt(submission.Service[2].answer),
            'ser4' : parseInt(submission.Service[3].answer),
            'ser5' : parseInt(submission.Service[4].answer),
            'sp1' : parseInt(submission.Space[0].answer),
            'sp2' : parseInt(submission.Space[1].answer),
            'sp3' : parseInt(submission.Space[2].answer),
            'sp4' : parseInt(submission.Space[3].answer),
            'sp5' : parseInt(submission.Space[4].answer),
            'sp6' : parseInt(submission.Space[5].answer),
            'sp7' : parseInt(submission.Space[6].answer),
            'sp8' : parseInt(submission.Space[7].answer),
            'sp9' : parseInt(submission.Space[8].answer),
            'sum' : parseInt(submission.Summary[0].answer)
        }
    ]
    if ( !editReview ) {
        const newSubmission = await handleNewSubmission(user_id, user_email, venue, image, location, address, hours, rating, answers, editReview, reviewId)
        if (newSubmission) {
            return true
        } else {
            console.error('Error in sendToDatabase: handleNewSubmission')
        }
    } else {
         const newUpdate = await handleReviewUpdate(user_id, user_email, venue, image, location, address, hours, rating, answers, editReview, reviewId)
         if (newUpdate){
            return true
         } else {
            console.error('Error in sendToDatabase: handleReviewUpdate')
         }
    }
}