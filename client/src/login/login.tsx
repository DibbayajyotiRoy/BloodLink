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
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection

// Define the form schema using Zod
const formSchema = z.object({
  username: z.string().min(8, "Username must be at least 8 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate(); // Hook to navigate to another page

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // First, try to log in as a blood donor
      const donorResponse = await axios.post(
        "http://localhost:3000/blooddonor/signin",
        {
          name: values.username,
          password: values.password, // Send username and password
        }
      );

      console.log(donorResponse.data); // Log the response data for debugging

      // If login is successful, handle as a blood donor
      localStorage.setItem("token", donorResponse.data.token);
      localStorage.setItem("userType", "blooddonor");

      toast.success("Blood Donor Login successful!");
      navigate("/"); // Navigate to home page for blood donor

    } catch (donorError) {
      // If blood donor login fails, try to log in as a blood bank
      try {
        const bankResponse = await axios.post(
          "http://localhost:3000/bloodbank/signin",
          {
            name: values.username,
            password: values.password, // Send username and password
          }
        );

        console.log(bankResponse.data); // Log the response data for debugging

        // If login is successful, handle as a blood bank
        localStorage.setItem("token", bankResponse.data.token);
        localStorage.setItem("userType", "bloodbank");

        toast.success("Blood Bank Login successful!");
        navigate("/dashboard"); // Navigate to blood bank dashboard

      } catch (bankError) {
        // If neither login is successful, show an error message
        console.error("Form submission error", bankError);
        toast.error("Invalid username or password. Please try again.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow hover:shadow-lg"
                      placeholder="Enter username"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow hover:shadow-lg"
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
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
