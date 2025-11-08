"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { PageHeading } from "@/app/components/PageHeading"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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
    email: z.string().email("Enter a valid admin email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
})

type FormValues = z.infer<typeof formSchema>

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const CreateInstitutePage = () => {
  const [loading, setLoading] = useState(false)

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
      instituteCredentials: { email: "", password: "" },
    },
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    try {
      console.log("Form submitted:", data)
      // TODO: send data to your API
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-[90vh] pt-2 ">
      <PageHeading title="Create New Institution" />
      <div className="w-full min-h-[90vh] py-6 flex flex-col items-center">
        <div className="w-[80%] bg-white rounded-md shadow-md p-8 ">
          <h2 className="text-2xl font-semibold text-center mb-6">Institute Registration</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="instituteCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Code</FormLabel>
                      <FormControl>
                        <Input placeholder="INST001" {...field} />
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
                        <Input placeholder="My School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="MS" {...field} />
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
                        <FormControl>
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

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="primaryPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} />
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
                        <Input placeholder="school@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Academic Year */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="academicYearStartMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year Start Month</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value ?? "")}
                      >
                        <FormControl>
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
                      <FormLabel>Academic Year End Month</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value ?? "")}
                      >
                        <FormControl>
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

              {/* Credentials */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Institute Credentials</h3>
                <FormField
                  control={form.control}
                  name="instituteCredentials.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com" {...field} />
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
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Register Institute"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateInstitutePage
