"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
    query: z.string().min(0).max(200),
})

export function SearchBar({ query, setquery }: {
    query: string;
    setquery: Dispatch<SetStateAction<string>>
}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setquery(values.query)
    }
    return (<div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row sm:items-center" >
            <Controller
                name="query"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter file name "
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Button  
            size="sm"
            type="submit"
                disabled={form.formState.isLoading}
                className="flex gap-1 "
            >
                {form.formState.isSubmitting &&
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                }
                <SearchIcon />  Search
            </Button>
        </form>
    </div>)
}