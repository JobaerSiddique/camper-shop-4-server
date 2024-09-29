import { z } from "zod";




const createUserValidation = z.object({
    body:z.object({
        name:z.string(),
        email:z.string(),
        password:z.string()
    })
})



export const AuthValidation = {
    createUserValidation
} 