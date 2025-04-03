import * as z from 'zod';


export const LoginSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}),
    
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long"

  })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: "Password must include at least one uppercase letter, one lowercase letter, and one number",
  })
  ,
})
export const RegisterSchema = z.object({
  fullName: z.string().min(3, {
      message: "First name must be at least 3 characters long"

  }),
  phoneNumber:  z.string()
  .length(8, { message: "Phone number must be exactly 8 digits long" }) // Exactly 8 digits
  .regex(/^[0-9]+$/, {
    message: "Phone number must contain only digits", // 
  }),


 
  
  email: z.string().email({message: "Please enter a valid email"}),
  role: z.string().min(1, {message: "Please select a role"}),
  
  password: z.string().min(6, {
      message: "Password must be at least 6 characters long"

  })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: "Password must include at least one uppercase letter, one lowercase letter, and one number",
  })
  ,
 
})


export const ResetSchema=z.object({
    email:z.string().email({message:"Please enter a valid email"})
})

export const NewPasswordSchema=z.object({
    password:z.string().min(6,{message:"Password must be at least 6 characters long"})
})

export const ProfileSchema=z.object({
    date:z.date().refine((date)=>date!==undefined,{message:"Please select a date"}),
    optionSelected:z.string().min(0,{message:"Please select you filiers "}).optional(),
    about:z.string().min(0,{message:"Please enter a valid about"}),
    imageUrl:z.string().min(1,{message:"Please enter a valid image url"}),
    country: z.object({
        value: z.string().min(0, { message: "Please select a country" }),
        label: z.string().min(0, { message: "Please select a country" }),
        flag: z.string().min(0, { message: "Please select a country" }),
        region: z.string().min(0, { message: "Please select a country" }),
        lalng: z.array(z.number()).min(0, { message: "Please select a country" })
    
    }).optional(),
    subtitle:z.string().min(0,{message:"Please enter a valid subtitle"}).optional(),
    patients:z.array(z.string()).min(0,{message:"Please select a patient"}).optional(),
    linkedin:z.string().min(0,{message:"Please enter a valid linkedin"}).optional(),
    github:z.string().min(0,{message:"Please enter a valid github"}).optional(),
    twitter:z.string().min(0,{message:"Please enter a valid twitter"}).optional()
    
})

export const QuizSchema=z.object({
    question:z.string().min(1,{message:"Please enter a question"}),
    option1:z.string().min(1,{message:"Please enter option 1"}),
    option2:z.string().min(1,{message:"Please enter option 2"}),
    option3:z.string().min(1,{message:"Please enter option 3"}),
    option4:z.string().min(1,{message:"Please enter option 4"}),
    
})

export const ChangePasswordSchema=z.object({
    oldPassword:z.string().min(6,{message:"Password must be at least 6 characters long"}),
    newPassword:z.string().min(6,{message:"Password must be at least 6 characters long"}),
    confirmNewPassword:z.string().min(6,{message:"Password must be at least 6 characters long"})
})

export const RejectCourseSchema=z.object({
    reason:z.string().min(1,{message:" Without a reason, you can't reject the course. Please enter a reason"})
    

})
export const createMessageSchema = z.object({
    message: z.string().min(1, {
      message: "The message field is required.",
    }),
  });
  export type CreateMessageSchemaType = z.infer<typeof createMessageSchema>;


  export const setupAccountSchema = z.object({
    name: z.string().min(2, {
      message: "The name field must be at least 2 characters long.",
    }),
    gender: z.enum(["Male", "Female", "Other"]),
    image: z.string().min(1, {
      message: "The image field is required.",
    }),
    email: z
      .string()
      .email({ message: "Please enter a valid email." })
      .min(1, { message: "The email field is required." }),
    birthdate: z.date().min(new Date("1900-01-01"), {
      message: "Please enter a valid birthdate.",
    }),
    country: z.object({
      value: z.string(),
      label: z.string(),
      flag: z.string(),
      latlang: z.array(z.number()),
      region: z.string(),
    }),
    city: z.string().min(1, {
      message: "The state field is required.",
    }),
    occupation: z.string().min(1, {
      message: "The occupation field is required.",
    }),
    bio: z
      .string()
      .min(1, {
        message: "The bio field is required.",
      })
      .max(300, {
        message: "The bio field must be less than 300 characters long.",
      }),
      patients:z.array(z.string()).min(0,{message:"Please select a patient"}).optional(),
      linkedin:z.string().min(0,{message:"Please enter a valid linkedin"}).optional(),
      github:z.string().min(0,{message:"Please enter a valid github"}).optional(),
      twitter:z.string().min(0,{message:"Please enter a valid twitter"}).optional()
      

  });
  export type SetupAccountSchemaType = z.infer<typeof setupAccountSchema>;





