import { clerkClient } from '@clerk/express'


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