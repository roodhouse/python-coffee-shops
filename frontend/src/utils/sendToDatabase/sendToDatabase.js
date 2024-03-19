import { handleNewSubmission } from "./handleNewSubmission"
import { handleReviewUpdate } from "./handleReviewUpdate"

export const sendToDatabase = async (submission, category, editReview, userData, userAuthenticated, reviewId, newReviewExistVenue, currentVenue, simpleRate) => {
    let venue;
    let answers;
    let hours;
    if ( newReviewExistVenue || simpleRate ) {
        venue = currentVenue
    } else {
        venue = submission.name
    }
    const user_email = userData.user_email
    const user_id = userData.user_id
    const image = submission.image
    const location = submission.location
    const address = submission.address

    if ( submission.hours ) {
        hours = [
            {
                'Sun': submission.hours[6],
                'Mon': submission.hours[0],
                'Tues': submission.hours[1],
                'Wed': submission.hours[2],
                'Thurs': submission.hours[3],
                'Fri': submission.hours[4],
                'Sat': submission.hours[5]
            }
        ]
    }
    const city = submission.city
    const state = submission.state
    const map = submission.map
    const website = submission.website
    const placeId = submission.place_id

    if ( (editReview === false && category === 'new') || (newReviewExistVenue === true && category === 'new' )) {
        let rating;
        if (simpleRate === true) {
            answers = submission
            rating = submission[0].sum
        } else {
            const ratingAnswer = submission?.Summary?.[0]?.answer
            rating = ratingAnswer ? parseInt(ratingAnswer) : null
    
            const summaryAnswer = submission?.Summary?.[0]?.answer
            const summary = summaryAnswer ? parseInt(summaryAnswer) : ''
    
            const p1Answer = submission?.Productivity?.[0]?.answer
            const p1 = p1Answer ? parseInt(p1Answer) : ''
    
            const p2Answer = submission?.Productivity?.[1]?.answer
            const p2 = p2Answer ? parseInt(p2Answer) : ''
    
            const p3Answer = submission?.Productivity?.[2]?.answer
            const p3 = p3Answer ? parseInt(p3Answer) : ''
    
            const p4Answer = submission?.Productivity?.[3]?.answer
            const p4 = p4Answer ? parseInt(p4Answer) : ''
    
            const p5Answer = submission?.Productivity?.[4]?.answer
            const p5 = p5Answer ? parseInt(p5Answer) : ''
    
            const p6Answer = submission?.Productivity?.[5]?.answer
            const p6 = p6Answer ? parseInt(p6Answer) : ''
    
            const c1Answer = submission?.Community?.[0]?.answer
            const c1 = c1Answer ? parseInt(c1Answer) : ''
    
            const c2Answer = submission?.Community?.[1]?.answer
            const c2 = c2Answer ? parseInt(c2Answer) : ''
    
            const ser1Answer = submission?.Service?.[0]?.answer
            const ser1 = ser1Answer ? parseInt(ser1Answer) : ''
    
            const ser2Answer = submission?.Service?.[1]?.answer
            const ser2 = ser2Answer ? parseInt(ser2Answer) : ''
    
            const ser3Answer = submission?.Service?.[2]?.answer
            const ser3 = ser3Answer ? parseInt(ser3Answer) : ''
    
            const ser4Answer = submission?.Service?.[3]?.answer
            const ser4 = ser4Answer ? parseInt(ser4Answer) : ''
    
            const ser5Answer = submission?.Service?.[4]?.answer
            const ser5 = ser5Answer ? parseInt(ser5Answer) : ''
    
            const sp1Answer = submission?.Space?.[0]?.answer
            const sp1 = sp1Answer ? parseInt(sp1Answer) : ''
    
            const sp2Answer = submission?.Space?.[1]?.answer
            const sp2 = sp2Answer ? parseInt(sp2Answer) : ''
            
            const sp3Answer = submission?.Space?.[2]?.answer
            const sp3 = sp3Answer ? parseInt(sp3Answer) : ''
    
            const sp4Answer = submission?.Space?.[3]?.answer
            const sp4 = sp4Answer ? parseInt(sp4Answer) : ''
    
            const sp5Answer = submission?.Space?.[4]?.answer
            const sp5 = sp5Answer ? parseInt(sp5Answer) : ''
    
            const sp6Answer = submission?.Space?.[5]?.answer
            const sp6 = sp6Answer ? parseInt(sp6Answer) : ''
    
            const sp7Answer = submission?.Space?.[6]?.answer
            const sp7 = sp7Answer ? parseInt(sp7Answer) : ''
    
            const sp8Answer = submission?.Space?.[7]?.answer
            const sp8 = sp8Answer ? parseInt(sp8Answer) : ''
    
            const sp9Answer = submission?.Space?.[8]?.answer
            const sp9 = sp9Answer ? parseInt(sp9Answer) : ''
    
            answers = [
                {
                    'p1' : p1,
                    'p2' : p2,
                    'p3' : p3,
                    'p4' : p4,
                    'p5' : p5,
                    'p6' : p6,
                    'c1' : c1,
                    'c2' : c2,
                    'ser1' : ser1,
                    'ser2' : ser2,
                    'ser3' : ser3,
                    'ser4' : ser4,
                    'ser5' : ser5,
                    'sp1' : sp1,
                    'sp2' : sp2,
                    'sp3' : sp3,
                    'sp4' : sp4,
                    'sp5' : sp5,
                    'sp6' : sp6,
                    'sp7' : sp7,
                    'sp8' : sp8,
                    'sp9' : sp9,
                    'sum' : summary,
                    'xcom': submission.com
                }
            ]

        }
        const newSubmission = await handleNewSubmission(user_id, user_email, venue, image, location, address, city, state, map, website, placeId, hours, rating, answers, editReview, reviewId, newReviewExistVenue, simpleRate)
        if (newSubmission) {
            return true
        } else {
            console.error('Error in sendToDatabase: handleNewSubmission')
        }
    } else {
        if (submission[0]) {
            // editing single or not full with added comment
            answers = submission[0]
        } else if (submission.answers && submission.answers[0]) {
            // editing heart or single from large form
            answers = submission.answers[0]
        } else {
            // simple rate update
            answers = submission
        }
        const newUpdate = await handleReviewUpdate(answers, reviewId)
        if (newUpdate){
            return true
        } else {
            console.error('Error in sendToDatabase: handleReviewUpdate')
        }
    }
}