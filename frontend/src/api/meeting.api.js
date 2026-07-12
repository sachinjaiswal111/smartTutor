import axiosInstance from "./axios";

export const createMeeting = async (payload) => {
  const { data } = await axiosInstance.post(
    "/meetings",
    payload
  );

  return data;
};
export const joinMeeting = async (meetingCode,payload) => {
  const { data } = await axiosInstance.post(
    `/meetings/${meetingCode}/join`,
    payload
  );

  return data;
};