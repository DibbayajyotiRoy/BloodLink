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
  name_9230315876: z.string(),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Send a POST request to the API endpoint
      const response = await axios.post(
        "http://localhost:3000/api/blooddonor/login",
        values
      );
      console.log(response.data); // Log the response data for debugging

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(response.data, null, 2)}
          </code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name_6544930115"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow hover:shadow-lg"
                      placeholder="Someone"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Password Field */}
            <FormField
              control={form.control}
              name="name_9230315876"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow hover:shadow-lg"
                      placeholder="someone$123456"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your Password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            {/* Submit Button */}
            <Button
              className="min-w-40 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
