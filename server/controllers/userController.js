import User from "../models/User.js"

// Get User Data
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.auth()

        // ✅ FIX
        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: 'User not Found' })
        }

        res.json({ success: true, user })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Users Enrolled Courses
export const userEnrolledCourses = async (req, res) => {
    try {
        const { userId } = req.auth()

        // ✅ FIX
        const userData = await User.findById(userId).populate('enrolledCourses')

        res.json({
            success: true,
            enrolledCourses: userData.enrolledCourses
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}