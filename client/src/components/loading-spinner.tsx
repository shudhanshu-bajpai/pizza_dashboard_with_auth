interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div 
      className={`loading-spinner ${sizeClasses[size]} border-2 border-blue-100 border-t-blue-500 rounded-full animate-spin`}
      style={{
        borderTopColor: '#4285F4',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}
