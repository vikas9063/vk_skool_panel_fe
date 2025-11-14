"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { PageHeading } from "@/app/components/PageHeading"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import axiosInstance from "@/lib/AxiosInstance"
import { ApiResponse } from "@/app/types/user"
import { CreateInstituteResponse } from "@/app/types/Institute"
import InstituteEmailIdVerifier from "@/app/components/InstituteEmailIdVerifier"

// ----------------- Schema -----------------
const formSchema = z.object({
  instituteCode: z.string().min(1, "Institute code is required"),
  instituteName: z.string().min(1, "Institute name is required"),
  displayName: z.string().min(1, "Display name is required"),
  instituteType: z.string().min(1, "Please select institute type"),
  primaryPhone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Phone number too long"),
  email: z.string().email("Enter a valid email"),
  academicYearStartMonth: z.number().min(1).max(12),
  academicYearEndMonth: z.number().min(1).max(12),
  instituteCredentials: z.object({
    email: z.email("Enter a valid admin email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  }),
})

type FormValues = z.infer<typeof formSchema>

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]



const newEmailField = () => {
  return (
    <div>
      kjhkhkh
    </div>
  )
}

const CreateInstitutePage = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instituteCode: "",
      instituteName: "",
      displayName: "",
      instituteType: "",
      primaryPhone: "",
      email: "",
      academicYearStartMonth: 4,
      academicYearEndMonth: 3,
      instituteCredentials: { email: "", password: "", confirmPassword: "" },
    },
  })


  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/institute/verify-institute-admin-email/${data.instituteCredentials.email}`);
      if (response.status === 200 && response.data.status === 'success' && response.data.result.isEmailExist) {
        // Email already exists
        toast.warning("Email is already registered!");
        setFormData(data);
        setOpenModal(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handleUseSameEmail = async () => {
    if (!formData) return;
    try {
      const response = await axiosInstance.post("/institute/create", formData);
      toast.success(response.data.message || "Institute linked to existing email!");
    } catch (err) {
      toast.error("Failed to link institute with existing email.");
    }
  };

  const handleNewEmail = async (newEmail: string) => {
    if (!formData) return;
    try {
      const updatedData = {
        ...formData,
        instituteCredentials: {
          ...formData.instituteCredentials,
          email: newEmail,
        },
      };
      const response = await axiosInstance.post("/institute/create", updatedData);
      toast.success(response.data.message || "Institute created with new email!");
    } catch (err) {
      toast.error("Failed to create institute with new email.");
    }
  };

  return (
    <div className="w-full min-h-[90vh] py-6">
      <PageHeading title="Create New Institution" />

      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg ">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Institute Registration
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill out the form below to register your institution
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Info */}
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="instituteCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Institute Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instituteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Institute Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Display Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instituteType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PRE_SCHOOL">Pre School</SelectItem>
                            <SelectItem value="PRIMARY">Primary</SelectItem>
                            <SelectItem value="SECONDARY">Secondary</SelectItem>
                            <SelectItem value="COLLEGE">College</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <Separator />

              {/* Contact Info */}
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Contact Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="primaryPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Phone No." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <Separator />

              {/* Academic Year */}
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Academic Year
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="academicYearStartMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Month</FormLabel>
                        <Select
                          onValueChange={(v) => field.onChange(Number(v))}
                          value={String(field.value ?? "")}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((m, i) => (
                              <SelectItem key={m} value={String(i + 1)}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="academicYearEndMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Month</FormLabel>
                        <Select
                          onValueChange={(v) => field.onChange(Number(v))}
                          value={String(field.value ?? "")}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((m, i) => (
                              <SelectItem key={m} value={String(i + 1)}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <Separator />

              {/* Credentials */}
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Admin Credentials
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="instituteCredentials.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instituteCredentials.password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instituteCredentials.confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <div className="pt-4">
                <Button type="submit" className="w-full h-10" disabled={loading}>
                  {loading ? "Submitting..." : "Register Institute"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <InstituteEmailIdVerifier
        open={openModal}
        onOpenChange={setOpenModal}
        onConfirm={handleNewEmail}
        onCancel={handleUseSameEmail}
      />

    </div>
  )
}

export default CreateInstitutePage
