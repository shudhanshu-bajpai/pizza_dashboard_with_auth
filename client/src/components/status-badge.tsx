import { OrderStatus } from "@shared/schema";

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-gray-100 text-gray-600";
      case OrderStatus.PREPARING:
        return "bg-yellow-100 text-[#FBBC05]";
      case OrderStatus.OUT_FOR_DELIVERY:
        return "bg-blue-100 text-[#4285F4]";
      case OrderStatus.DELIVERED:
        return "bg-green-100 text-[#34A853]";
      case OrderStatus.CANCELLED:
        return "bg-red-100 text-[#EA4335]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <span className={`status-badge ${getStatusStyles()} px-3 py-1 rounded-full text-xs font-medium`}>
      {status}
    </span>
  );
}
