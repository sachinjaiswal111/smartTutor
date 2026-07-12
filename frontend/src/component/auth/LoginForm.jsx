import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

import { loginSchema } from "../../validation/auth.validation";
import { useLogin } from "../../hooks/useLogin";

const LoginForm = () => {
    const navigate = useNavigate();
    
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useLogin();

    const onSubmit = async (values) => {
        try {
            const response = await loginMutation.mutateAsync(values);

            // Refetch /auth/me
            await queryClient.refetchQueries({
                queryKey: ["current-user"],
            });

            navigate("/");
            toast.success(response.message || "Login successful");

            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <Card className="w-full max-w-md">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    SmartTutor
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending
                            ? "Signing In..."
                            : "Sign In"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;