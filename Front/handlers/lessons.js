export const fetchCourseDetails = async () => {
    //fetching course
    let temp = new Promise((res, rej) => {
        setTimeout(() => {
            // res(15)
            rej(4)
        }, 5000)
    })

    return temp
}
