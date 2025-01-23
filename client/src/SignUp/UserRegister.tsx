import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

const formSchema = z.object({
  name_6544930115: z.string().min(8),
  name_5062014857: z.string(),
  name_6037749245: z.string().email(),
  name_7157177887: z.string(),
  name_9230315876: z.string(),
  name_8219849486: z
    .string()
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
});

export default function DonorForm() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [donorInput, setDonorInput] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    bloodType: "",
    subdivision: "",
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setDonorInput({
        name: values.name_6544930115 || "",
        email: values.name_6037749245 || "",
        password: values.name_9230315876 || "",
        number: values.name_8219849486 || "",
        bloodType: values.name_7157177887 || "",
        subdivision: values.name_5062014857 || "",
      });
    });
  
    // Cleanup the subscription on unmount
    return () => subscription.unsubscribe();
  }, [form]);
  
  async function onSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:3000/blooddonor/signup",
        donorInput
      );
      console.log(response.data.user.id)
  
      // Assuming the response contains the donor's _id
      
  
      // Set the donor's id in localStorage
      localStorage.setItem("donorId", response.data.user.id);
  
      toast.success("Registration successful!");
  
      // Redirect to the eligibility page
      navigate("/eligibility");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  
  


  // if (isSubmitted) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-full max-w-2xl text-center">
  //         <h2 className="text-2xl font-semibold mb-4">
  //           Successfully Signed In!
  //         </h2>
  //         <p>Redirecting to home page in 3 seconds...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Donor Registration
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
                    This is your public display name. Please enter your name
                  </FormDescription>
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
                    <select
                      className="w-full shadow hover:shadow-lg border rounded-md p-1.5"
                      {...field}
                    >
                      <option value="">Select your Sub-Division</option>
                      <option value="Sadar">Sadar</option>
                      <option value="Mohanpur">Mohanpur</option>
                      <option value="Jirania">Jirania</option>
                      <option value="Belonia">Belonia</option>
                      <option value="Santirbazar">Santirbazar</option>
                      <option value="Sabroom">Sabroom</option>
                      <option value="Udaipur">Udaipur</option>
                      <option value="Amarpur">Amarpur</option>
                      <option value="Karbook">Karbook</option>
                      <option value="Khowai">Khowai</option>
                      <option value="Teliamura">Teliamura</option>
                      <option value="Bishalgarh">Bishalgarh</option>
                      <option value="Jampuijala">Jampuijala</option>
                      <option value="Sonamura">Sonamura</option>
                      <option value="Kumarghat">Kumarghat</option>
                      <option value="Kailashahar">Kailashahar</option>
                      <option value="Dharmanagar">Dharmanagar</option>
                      <option value="Kanchanpur">Kanchanpur</option>
                      <option value="Panisagar">Panisagar</option>
                      <option value="Ambassa">Ambassa</option>
                      <option value="Kamalpur">Kamalpur</option>
                      <option value="Longtarai Valley">Longtarai Valley</option>
                      <option value="Gandachera">Gandachera</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    This is your public display address. Kindly write your city,
                    state.
                  </FormDescription>
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
                        <Input
                          className="shadow hover:shadow-lg"
                          placeholder="someone@gmail.com"
                          type="email"
                          {...field}
                        />
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
                        <select
                          className="w-full shadow hover:shadow-lg border rounded-md p-1.5"
                          {...field}
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </FormControl>
                      <FormDescription>Enter your Blood group.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
                  <FormDescription>Choose a strong password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name_8219849486"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Contact No.</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow hover:shadow-lg"
                      placeholder="1234567890"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display contact No. Please enter your
                    contact number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="min-w-40 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
