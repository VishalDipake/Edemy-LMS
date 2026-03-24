import { clerkClient } from '@clerk/express'
import Course from '../models/Course.js';
import { v2 as cloudinary } from 'cloudinary'
import { Purchase } from '../models/purchase.js';
import { DashboardAccessOut } from 'svix';
import User from '../models/User.js'


// Update Role To educator
export const updateRoleToEducator = async (req, res)=> {
    try{

        const { userId } = req.auth()   // ✅ FIXED

        console.log("USER ID:", userId);

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'educator',
            }
        })

        res.json({success: true, message: 'You can publish a course now'})

    } catch (error) {

        console.error("ERROR:", error);

        res.json({success: false, message: error.message})

    }
}

//Add new Course

export const addCourse = async (req, res)=>{
    try {
        const { courseData } = req.body
        const imageFile = req.file
       const { userId } = req.auth()

         if(!imageFile){
            return res.json({ success: false, message: 'Thumbnail Not Attached' })
         }
          
         const parseCourseData = await JSON.parse(courseData)
         parseCourseData.educator = userId
         const newCourse = await Course.create(parseCourseData)
         const imageupload =  await cloudinary.uploader.upload(imageFile.path)
         newCourse.courseThumbnail = imageupload.secure_url
         await newCourse.save()

         res.json({success: true, message: 'Course Added' })

        
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }

}

// Get Educator Courses
export const getEducatorCourses = async (req, res) => {
    try {
        const { userId } = req.auth()

        // 🔥 ADD THESE LINES HERE
        console.log("userId:", userId)

        const allCourses = await Course.find({})
        console.log("ALL COURSES:", allCourses)

        // ❌ YOUR WRONG LINE (REMOVE THIS)
        // const courses = await Course.find({ userId })

        // ✅ CORRECT LINE
        const courses = await Course.find({ educator: userId })

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get Educator Dshboard Daata (Total Earnings, Enrolled Students, no. of Courses)

export const educatorDashboardData = async (req, res)=>{
    try {
         const { userId } = req.auth() 
       const courses = await Course.find({ educator: userId });
       const totalCourses = courses.length;

       const courseIds =courses.map(course => course._id);

       // Calculate TotalEarning from Purchase
       const purchases = await Purchase.find({
        courseId: {$in: courseIds}, 
        status: 'completed'
       });

       const totalEarnings = purchases.reduce((sum, purchase)=> sum + purchase.amount, 0);

       //Collect unique enrolled student IDs with their course titles

       const enrolledStudentsData = [];
       for(const course of courses){
        const students = await User.find({
            _id: {$in: course.enrolledStudents}
        }, 'name imageUrl');

        students.forEach(student =>{
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                });

        });
       }

       res.json({success: true, dashboardData: {
        totalEarnings, enrolledStudentsData, totalCourses
       } })
        
    } catch (error) {
        res.json({ success: false, message: error.message });
        
    }

}

// Get Enrolled Students Data with  Puurchased Data

export const getEnrolledStudentsData = async(req, res)=>{

    try{
         const { userId } = req.auth();
         const courses = await Course.find({ educator: userId });
          const courseIds =courses.map(course => course._id);

          const purchases = await Purchase.find({
            courseId: {$in: courseIds},
            status: 'completed'
          }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

          const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
          }));

          res.json({success: true, enrolledStudents})

        }catch (error){
            res.json({success: false, message: error.message });

    }

}