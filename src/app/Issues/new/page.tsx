"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface FormValue {
  title: string;
  description: string; 
  status: string;
}


const NewIssuePage = () => {
 const router = useRouter();
  //here we cant destructure 2 time with useForm because we are using react-hook-form
  //so we need to use the register and control from useForm
  const { register, control, handleSubmit } = useForm<FormValue>();

  return (
    <form
    onSubmit={handleSubmit(async (data) => {
        const response = await fetch("/api/issues", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            router.push("/issues");
        } else {
            console.error("Failed to submit issue");
        }

    })}
      className="max-w-xl p-5 space-y-4 "
    >
      <TextField.Root
        placeholder="Search Title"
        color="green"
        variant="soft"
        radius="large"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE
            placeholder="Description"
            {...field}
            className="rounded-md mt-12"
          />
        )}
      />
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select status</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </div>
      {/* we can use this if we want custom dropdown menu for status */}
      {/* <Controller
  name="status"
  control={control}
  render={({ field }) => (
    <DropdownMenu.Root onValueChange={field.onChange}>
      <DropdownMenu.Trigger>
        <Button variant="soft">{field.value || "Select status"}</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={() => field.onChange("OPEN")}>OPEN</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => field.onChange("IN_PROGRESS")}>IN_PROGRESS</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => field.onChange("CLOSED")}>CLOSED</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )}
/> */}

      <br />
      <Button color="crimson" variant="soft" className="space-y-5">
        Submit New Issue
      </Button>
    </form>
  );
};

export default NewIssuePage;
