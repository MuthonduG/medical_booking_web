"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { formFieldType } from "./forms/PatientForm"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { E164Number } from "libphonenumber-js/core";

interface CustomProps {
  control: Control<any>,
  fieldType: formFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: string,
  dateFormat?: string,
  showTimeSelect?: string,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;
  switch(fieldType) {
    case formFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {
            iconSrc && (
              <Image
                src={iconSrc}
                height = {24}
                width = {24}
                alt={iconAlt || "icon"}
                className="ml-2"
              />
            )
          }
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    case formFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder = {placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      ) 
    default:
      break;
  }
}

const CustomFormField = (props: CustomProps) => {
  const {control, fieldType, name, label} = props
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
        {
          fieldType !== formFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )
        }
        <RenderField field={field} props={props}/>
        <FormMessage className="shd-error"/>
      </FormItem>
    )}
  />
  )
}

export default CustomFormField
