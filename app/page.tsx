"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z.custom<File | null>((val) => val instanceof File, "Required")

})


export default function Home() {
  const organization = useOrganization();
  const user = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: null,

    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }
  console.log(organization.organization?.id)
  const createFile = useMutation(api.files.createfile)
  const files = useQuery(api.files.getFiles,
    orgId ? { orgId } : "skip")

  return (
    <>
      <div className="container mx-auto pt-12  " >
        <div className="flex justify-between items-center" >
          <h1 className="text-4xl font-bold" > Your files</h1>

          <Dialog>
            <DialogTrigger asChild >
              <Button onClick={() => {
                if (!orgId) return;
                createFile({
                  name: "hello next.js ",
                  orgId,
                })
              }} >Upload File
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Files to Organization </DialogTitle>
                <DialogDescription>
                  <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                      <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                              Title of your file
                            </FieldLabel>
                            <Input
                              {...field}
                              id="form-rhf-demo-title"
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter title"
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />


                      <Controller
                        name="file"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">

                            </FieldLabel>
                            <Input
                              id="form-rhf-demo-title"
                              aria-invalid={fieldState.invalid}
                              type="file"
                              autoComplete="off"
                              onChange={(event) => {
                                if (!event.target.files) return;
                                field.onChange(event.target.files[0])
                              }}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                          Reset
                        </Button>
                        <Button type="submit" form="form-rhf-demo">
                          Submit
                        </Button>
                      </Field>

                    </FieldGroup>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>


        </div>

        {files?.map((file) => {
          return <div key={file._id}> {file.name} </div>
        })}


      </div>
    </>
  );
}
