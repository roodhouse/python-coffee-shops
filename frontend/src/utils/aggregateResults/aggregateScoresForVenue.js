export async function aggregateScoresForVenue(allReviews, venue) {
    let pairedAnswers = []
    let c1 = [], c2 = [], p1 = [], p2 = [], p3 = [], p4 = [], p5 = [], ser1 = [], ser2 = [], ser3 = [], ser4 = [], ser5 = [];
    let sp1 = [], sp2 = [], sp3 = [], sp4 = [], sp5 = [], sp6 = [], sp7 = [], sp8 = [], sp9 = [], sum = [];
    let aggScore = []

    const allReviewsForVenue = []
        allReviewsForVenue.push(allReviews.reviews.filter(review => review.venue === venue))

        allReviewsForVenue[0].forEach(review => {

            if (!review.answers[0]) {
                console.error("Review answers are missing or malformed", review)
            } 
            
            Object.keys(review.answers[0]).forEach(key => {
                let answer = review.answers[0][key] * 100
                if (!isNaN(answer)) {
                    switch (key) {
                        case 'c1':
                            c1.push(answer)
                            break;
                        case 'c2':
                            c2.push(answer)
                            break;
                        case 'p1':
                            p1.push(answer)
                            break;
                        case 'p2':
                            p2.push(answer)
                            break;
                        case 'p3':
                            p3.push(answer)
                            break;
                        case 'p4':
                            p4.push(answer)
                            break;
                        case 'p5':
                            p5.push(answer)
                            break;
                        case 'ser1':
                            ser1.push(answer)
                            break;
                        case 'ser2':
                            ser2.push(answer)
                            break;
                        case 'ser3':
                            ser3.push(answer)
                            break;
                        case 'ser4':
                            ser4.push(answer)
                            break;
                        case 'ser5':
                            ser5.push(answer)
                            break;
                        case 'sp1':
                            sp1.push(answer)
                            break;
                        case 'sp2':
                            sp2.push(answer)
                            break;
                        case 'sp3':
                            sp3.push(answer)
                            break;
                        case 'sp4':
                            sp4.push(answer)
                            break;
                        case 'sp5':
                            sp5.push(answer)
                            break;
                        case 'sp6':
                            sp6.push(answer)
                            break;
                        case 'sp7':
                            sp7.push(answer)
                            break;
                        case 'sp8':
                            sp8.push(answer)
                            break;
                        case 'sp9':
                            sp9.push(answer)
                            break;
                        case 'sum':
                            sum.push(answer)
                            break;
                        default:
                            break;
                    }

                }
            })
        })

        pairedAnswers = [c1, c2, p1, p2, p3, p4, p5, ser1, ser2, ser3, ser4, ser4, ser5, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sum]
        aggScore = pairedAnswers.map(answers => {
            let sumOfAnswers = answers.reduce((acc, val) => acc + val, 0)
            return (sumOfAnswers / answers.length) / 100
        })
        
        return aggScore
}