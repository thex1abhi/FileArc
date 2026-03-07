"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((files) => files.length > 0, "Required"),

})

export default function UploadButton() {

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const organization = useOrganization();
  const user = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,

    },
  })

  const fileRef = form.register("file")

  async function onSubmit(values: z.infer<typeof formSchema>) {

    if (!orgId) return;
    const postUrl = await generateUploadUrl();
    const fileTypes = values.file[0].type;

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileTypes },
      body: values.file[0],
    });
    const { storageId } = await result.json();

    const types = {
      "image/png": "image",
      "application/pdf": "pdf",
      "test/csv": "csv"
    } as Record<string, Doc<"files">["type"]>

    try {
      await createFile({
        name: values.title,
        fileId: storageId,
        orgId,
        type: types[fileTypes]
      })
      form.reset();
      setIsFileDialogOpen(false);
      toast.success("File uplaoded Successfully")
    }
    catch {
      toast.error("Something went wrong")
    }

  }

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }
  console.log(organization.organization?.id)
  const createFile = useMutation(api.files.createfile)


  return (

    <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen} >
      <DialogTrigger asChild >
        <Button  >Upload File
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
                        Select File
                      </FieldLabel>
                      <Input
                        {...fileRef}
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

                  <Button type="submit"
                    disabled={form.formState.isLoading}
                    className="flex gap-1 "
                  >
                    {form.formState.isSubmitting &&
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Submit
                  </Button>
                </Field>

              </FieldGroup>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  );
}
