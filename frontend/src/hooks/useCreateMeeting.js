import { useMutation } from "@tanstack/react-query";

import { createMeeting } from "../api/meeting.api";

export const useCreateMeeting = () => {
  return useMutation({
    mutationFn: createMeeting,
  });
};