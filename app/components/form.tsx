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

import { inputSchema, updateSchema } from "../lib/validation";
import { useToast } from "@/app/components/ui/use-toast";

export function UsernameForm({
  updateReq,
  loading,
  handleLoading,
}: {
  updateReq: () => void;
  loading: boolean;
  handleLoading: (loading: boolean) => void;
}) {
  const [ms, setMs] = useState<any>(0);

  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      username: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof inputSchema>) => {
    handleLoading(true);

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        // If the request is successful, show a success toast
        toast({
          title: `Response ${res.status}`,
          description: `${json.message.username} in ${json.ms}ms`,
        });
      } else {
        // If the request fails, show an error toast
        toast({
          title: `Error ${res.status}`,
          description: json.error || "An error occurred",
          variant: "destructive",
        });
      }

      setMs(json.ms);
      console.log(json);
    } catch (error: any) {
      console.error(error);
      // If an error occurs during the request, show an error toast
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      form.reset();
      updateReq();
      handleLoading(false);
    }
  };

  return (
    <Form {...form}>
      <h2 className="text-2xl font-semibold">Create User</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-red-800">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="y17godara" {...field} />
              </FormControl>
              <FormMessage className="text-xs text-red-700" />
            </FormItem>
          )}
        />
        <Button disabled={loading} variant={"default"} type="submit">
          Submit
        </Button>
        <div className="text-sm text-green-500">Created in {ms}ms</div>
      </form>
    </Form>
  );
}
