import { Webhook } from "svix";
import User from "../models/user.js";

// API Controller Function to manage Clerk User With database
export const clerkWebhooks = async (req, res) => {
    try {
        // create a Svix instance with clerk webhook
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)


        // Verifying Headers
        await webhook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // Geting Data From request body
        const { data, type } = req.body



        // switch case for diffent events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
        }


    } catch (error) {
console.log(error.message);
res.json({success:false,message:'Webhooks Error'})
    }
}