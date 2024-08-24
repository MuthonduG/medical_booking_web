"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/validations"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum formFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = 'chekbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

export function PatientForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof userFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There 👋</h1>
          <p className="text-dark-700">
            Book your first appointment
          </p>
        </section>
        <CustomFormField 
          fieldType = {formFieldType.INPUT}
          control={form.control}
          name = "name"
          label = "Full name"
          placeholder = "John doe"
          iconSrc = "/assets/icons/user.svg"
          iconAlt = "user"
        />
        <CustomFormField 
          fieldType = {formFieldType.INPUT}
          control={form.control}
          name = "email"
          label = "Email"
          placeholder = "johndoe@email.com"
          iconSrc = "/assets/icons/email.svg"
          iconAlt = "email"
        />
        <CustomFormField 
          fieldType = {formFieldType.PHONE_INPUT}
          control={form.control}
          name = "phone"
          label = "Phone number"
          placeholder = "(254) 712-345-678"
        />
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  )
}


export default PatientForm
