import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner"; // Assuming you use 'sonner' for notifications
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the validation schema using Zod
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  email: z.string().email("Invalid email format").min(3).max(100),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  state: z.string().min(2).max(100, "State must be between 2 and 100 characters"),
  district: z.string().min(2).max(100, "District must be between 2 and 100 characters"),
});

type FormData = z.infer<typeof formSchema>;

const BloodBankRegister: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:3000/bloodbank/signup", data);
      toast.success(response.data.message || "Successfully registered!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Blood Bank Registration
        </h2>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("name")}
                      placeholder="Blood Bank Name"
                    />
                  </FormControl>
                  <FormDescription>Enter the name of the blood bank.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("email")}
                      placeholder="example@bloodbank.com"
                    />
                  </FormControl>
                  <FormDescription>Enter your contact email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={() => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...form.register("password")}
                      placeholder="Enter a strong password"
                    />
                  </FormControl>
                  <FormDescription>Choose a strong password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="number"
              render={() => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("number")}
                      placeholder="1234567890"
                    />
                  </FormControl>
                  <FormDescription>Enter your contact number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                name="state"
                render={() => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <select
                        {...form.register("state")}
                        className="border p-1.5 rounded-md shadow hover:shadow-lg w-full"
                      >
                        <option value="Tripura">Tripura</option>
                      </select>
                    </FormControl>
                    <FormDescription>Enter the state of the blood bank.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="district"
                render={() => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <select
                        {...form.register("district")}
                        className="border p-1.5 rounded-md shadow hover:shadow-lg w-full"
                      >
                        <option value="West_Tripura">West Tripura</option>
                        <option value="Khowai">Khowai</option>
                        <option value="Sepahijala">Sepahijala</option>
                        <option value="Gomati">Gomati</option>
                        <option value="South_Tripura">South Tripura</option>
                        <option value="Unakoti">Unakoti</option>
                        <option value="North_Tripura">North Tripura</option>
                        <option value="Dhalai">Dhalai</option>
                      </select>
                    </FormControl>
                    <FormDescription>Enter the district of the blood bank.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="min-w-40 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Register
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default BloodBankRegister;
