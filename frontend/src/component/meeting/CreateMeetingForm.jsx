import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

import { createMeetingSchema } from "../../validation/meeting.validation";
import { useCreateMeeting } from "../../hooks/useCreateMeeting";

const CreateMeetingForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createMeetingMutation = useCreateMeeting();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      title: "",
      maxParticipants: 10,
      allowWaitingRoom: false,
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await createMeetingMutation.mutateAsync(values);

      toast.success(response.message);

      await queryClient.invalidateQueries({
        queryKey: ["meetings"],
      });

      navigate(`/meeting/${response.data.meetingCode}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create meeting"
      );
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <h1 className="mb-6 text-3xl font-bold">
          Create Meeting
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Meeting Title"
            placeholder="Operating Systems Live Class"
            error={errors.title?.message}
            {...register("title")}
          />

          <Input
            label="Maximum Participants"
            type="number"
            error={errors.maxParticipants?.message}
            {...register("maxParticipants", {
              valueAsNumber: true,
            })}
          />

          <div className="flex items-center gap-3">
            <input
              id="waiting-room"
              type="checkbox"
              {...register("allowWaitingRoom")}
            />

            <label htmlFor="waiting-room">
              Enable Waiting Room
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createMeetingMutation.isPending}
          >
            {createMeetingMutation.isPending
              ? "Creating..."
              : "Create Meeting"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateMeetingForm;