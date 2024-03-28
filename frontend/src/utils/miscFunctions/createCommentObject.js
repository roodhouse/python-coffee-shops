export default function commentObjectCreation(reviews) {
    let commentObject = []
    let count = 0
    reviews.map((review) => {
    if (review.answers[0].xcom !== undefined) {
        count++
        commentObject = [...commentObject, {
            'userId': review.user_id, 
            'userEmail': review.user_email,
            'date': review.date,
            'avatar': review.avatar,
            'comment': review.answers[0].xcom
        }]
    }
});
    return [commentObject, count];
}
