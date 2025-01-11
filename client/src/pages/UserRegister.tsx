"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios"; // Import Axios
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the form schema using Zod
const formSchema = z.object({
  name_6544930115: z.string().min(8),
  name_5062014857: z.string(),
  name_6037749245: z.string().email(), // Ensure it's a valid email
  name_7157177887: z.string(),
  name_9230315876: z.string(),
  name_8219849486: z.number().min(1000000000).max(9999999999), // Adjusted to ensure it's a valid phone number
});

export default function DonorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Send a POST request to the API endpoint
      const response = await axios.post("http://localhost:3000/api/blooddonor/signup", values);
      console.log(response.data); // Log the response data for debugging

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(response.data, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 max-w-xl mx-80 py-10 ">
        <FormField
          control={form.control}
          name="name_6544930115"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">Username</FormLabel>
              <FormControl>
                <Input className="shadow hover:shadow-lg" placeholder="Someone" type="text" {...field} />
              </FormControl>
              <FormDescription>This is your public display name. Please enter your name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_5062014857"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">Address</FormLabel>
              <FormControl>
                <Input className="shadow hover:shadow-lg" placeholder="Agartala, Tripura" type="text" {...field} />
              </FormControl>
              <FormDescription>This is your public display address. Kindly write your city, state.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_6037749245"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">E-Mail</FormLabel>
                  <FormControl>
                    <Input className="shadow hover:shadow-lg" placeholder="someone@gmail.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_7157177887"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Blood Group</FormLabel>
                  <FormControl>
                    <Input className="shadow hover:shadow-lg" placeholder="A+" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter your Blood group.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Password Field */}
        <FormField
          control={form.control}
          name="name_9230315876"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">Password</FormLabel>
              <FormControl>
                <Input className="shadow hover:shadow-lg" placeholder="someone$123456" type="password" {...field} />
              </FormControl>
              <FormDescription>Choose a strong password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Number Field */}
        <FormField
          control={form.control}
          name="name_8219849486"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">Contact No.</FormLabel>
              <FormControl>
                <Input className="shadow hover:shadow-lg" placeholder="1234567890" type="number" {...field} />
              </FormControl>
              <FormDescription>This is your public display contact No. Please enter your contact number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}



























































































































































// "use client";

// // import { useState } from "react";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// // import { cn } from "@/lib/utils";  // Ensure this utility function is defined in your project
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// // Define the form schema using Zod
// const formSchema = z.object({
//   name_6544930115: z.string().min(8),
//   name_5062014857: z.string(),
//   name_6037749245: z.string(),
//   name_7157177887: z.string(),
//   name_9230315876: z.string(),
//   name_8219849486: z.number().min(1000000000).max(9999999999), // Adjusted to ensure it's a valid phone number
// });

// export default function DonorForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       console.log(values);
//       toast(
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(values, null, 2)}</code>
//         </pre>
//       );
//     } catch (error) {
//       console.error("Form submission error", error);
//       toast.error("Failed to submit the form. Please try again.");
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 max-w-xl mx-80 py-10 ">
//         <FormField
//           control={form.control}
//           name="name_6544930115"
//           render={({ field }) => (
            
//             <FormItem>
//               <FormLabel className="flex">Username</FormLabel>
//               <FormControl>
//                 <Input className="shadow hover:shadow-lg" placeholder="Someone" type="text" {...field} />
//               </FormControl>
//               <FormDescription>This is your public display name. Please enter your name</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />


     
//         <FormField
//           control={form.control}
//           name="name_5062014857"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="flex">Address</FormLabel>
//               <FormControl>
//                 <Input className="shadow hover:shadow-lg" placeholder="Agartala, Tripura" type="text" {...field} />
//               </FormControl>
//               <FormDescription>This is your public display address. Kindly write your city, state.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-12 gap-4">
//           <div className="col-span-6">

    
//             <FormField
//               control={form.control}
//               name="name_6037749245"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex">E-Mail</FormLabel>
//                   <FormControl>
//                     <Input className="shadow hover:shadow-lg" placeholder="someone@gmail.com" type="email" {...field} />
//                   </FormControl>
//                   <FormDescription>Enter your email</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>


//           <div className="col-span-6">
//             <FormField
//               control={form.control}
//               name="name_7157177887"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex">Blood Group</FormLabel>
//                   <FormControl>
//                     <Input className="shadow hover:shadow-lg" placeholder="A+" type="text" {...field} />
//                   </FormControl>
//                   <FormDescription>Enter your Blood group.</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>

//         <FormField
//               control={form.control}
//               name="name_6037749245"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex">Password</FormLabel>
//                   <FormControl>
//                     <Input className="shadow hover:shadow-lg" placeholder="someone$123456" type="password" {...field} />
//                   </FormControl>
//                   <FormDescription>Choose a strong password.</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//         <FormField
//           control={form.control}
//           name="name_8219849486"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="flex">Contact No.</FormLabel>
//               <FormControl>
//                 <Input className="shadow hover:shadow-lg" placeholder="1234567890" type="number" {...field} />
//               </FormControl>
//               <FormDescription>This is your public display contact No. Please enter your contact number</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Submit Button */}
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }
