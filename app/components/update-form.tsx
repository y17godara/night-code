"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { updateSchema } from "../lib/validation";
import { useToast } from "@/app/components/ui/use-toast";

export function UsernameUpdateForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      username: "",
      newUsername: "",
    },
  });

  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof updateSchema>) => {
    setLoading(true);

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: json.error,
          variant: "destructive",
        });
      }

      console.log(json);
      toast({
        title: json.status,
        description: json.message,
        variant: "default",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="y17godara" {...field} />
              </FormControl>
              <FormMessage className="text-xs text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                New Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="y17" {...field} />
              </FormControl>
              <FormMessage className="text-xs text-red-700" />
            </FormItem>
          )}
        />
        <Button variant={"default"} type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
}
