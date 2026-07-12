import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    ghost:
      "bg-transparent hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",

    md: "px-4 py-2",

    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;