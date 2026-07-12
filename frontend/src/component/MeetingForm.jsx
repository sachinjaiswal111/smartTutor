import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMeeting } from "../hooks/useCreateMeeting";

const MeetingForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        password: "",
        maxParticipants: 10,
        allowWaitingRoom: false,
    });
    const navigate = useNavigate();

    const { mutate, isPending } = useCreateMeeting();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        mutate(formData, {
            onSuccess: (response) => {
                console.log(response);

                const meetingCode = response.data.meetingCode;

                navigate(`/meeting/${meetingCode}`);
            },

            onError: (error) => {
                console.error(error);

                alert(
                    error.response?.data?.message ??
                    "Failed to create meeting."
                );
            },
        });
    };

    return (
        <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-3xl font-bold">
                Create Meeting
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label className="mb-2 block font-medium">
                        Meeting Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Operating Systems Live Class"
                        className="w-full rounded-md border p-3"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Password (Optional)
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Leave empty for no password"
                        className="w-full rounded-md border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Maximum Participants
                    </label>

                    <input
                        type="number"
                        name="maxParticipants"
                        min="2"
                        max="100"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        className="w-full rounded-md border p-3"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="allowWaitingRoom"
                        checked={formData.allowWaitingRoom}
                        onChange={handleChange}
                    />

                    <label>
                        Enable Waiting Room
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white disabled:opacity-50"
                >
                    {isPending
                        ? "Creating..."
                        : "Create Meeting"}
                </button>
            </form>
        </div>
    );
};

export default MeetingForm;