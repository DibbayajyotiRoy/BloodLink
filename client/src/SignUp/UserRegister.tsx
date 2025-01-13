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
  name_8219849486: z.string().regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
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
    setDonorInput({
      name: form.getValues("name_6544930115"),
      email: form.getValues("name_6037749245"),
      password: form.getValues("name_9230315876"),
      number: form.getValues("name_8219849486"),
      bloodType: form.getValues("name_7157177887"),
      subdivision: form.getValues("name_5062014857"),
    });
  }, [form.watch()]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:3000/blooddonor/signup",
        donorInput
      );
      console.log(response.data);
      toast.success("Registration successful!");
      setIsSubmitted(true);
      
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-full max-w-2xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Successfully Signed In!</h2>
          <p>Redirecting to home page in 3 seconds...</p>
        </div>
      </div>
    );
  }

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
                      <option value="Dukli">Dukli</option>
                      <option value="Jirania">Jirania</option>
                      <option value="Mohanpur">Mohanpur</option>
                      <option value="Mandwi">Mandwi</option>
                      <option value="Khowai">Khowai</option>
                      <option value="Teliamura">Teliamura</option>
                      <option value="Tulasikhar">Tulasikhar</option>
                      <option value="Bishalgarh">Bishalgarh</option>
                      <option value="Melaghar">Melaghar</option>
                      <option value="Matabari">Matabari</option>
                      <option value="Amarpur">Amarpur</option>
                      <option value="Rajnagar">Rajnagar</option>
                      <option value="Bakafa">Bakafa</option>
                      <option value="Satchand">Satchand</option>
                      <option value="Rupaichari">Rupaichari</option>
                      <option value="Kadamtala">Kadamtala</option>
                      <option value="Kanchanpur">Kanchanpur</option>
                      <option value="Panisagar">Panisagar</option>
                      <option value="Salema">Salema</option>
                      <option value="Gandacherra">Gandacherra</option>
                      <option value="Chawmanu">Chawmanu</option>
                      <option value="Sadar">Sadar</option>
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

