import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard-layout";
import StatusBadge from "@/components/status-badge";
import LoadingSpinner from "@/components/loading-spinner";
import { OrderStatus, PizzaOrder } from "@shared/schema";
import { format } from "date-fns";

export default function OrdersPage() {
  // Fetch orders
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['/api/orders'],
  });

  // State for sorting and filtering
  const [filteredOrders, setFilteredOrders] = useState<PizzaOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("date-desc");

  // Process orders when data changes or filters change
  useEffect(() => {
    if (!orders) return;

    let processed = [...orders];

    // Apply status filter
    if (statusFilter !== "all") {
      processed = processed.filter(order => order.status === statusFilter);
    }

    // Apply sorting
    processed.sort((a, b) => {
      switch (sortOption) {
        case "date-desc":
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        case "date-asc":
          return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        case "id-asc":
          return a.orderId.localeCompare(b.orderId);
        case "id-desc":
          return b.orderId.localeCompare(a.orderId);
        default:
          return 0;
      }
    });

    setFilteredOrders(processed);
  }, [orders, statusFilter, sortOption]);

  // Handle filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Format date for display
  const formatDate = (date: Date | string) => {
    return format(new Date(date), "yyyy-MM-dd HH:mm");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Pizza Orders</h1>
            
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <select
                  id="status-filter"
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-md py-2 pl-3 pr-8 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                >
                  <option value="all">All Statuses</option>
                  <option value={OrderStatus.PENDING}>{OrderStatus.PENDING}</option>
                  <option value={OrderStatus.PREPARING}>{OrderStatus.PREPARING}</option>
                  <option value={OrderStatus.OUT_FOR_DELIVERY}>{OrderStatus.OUT_FOR_DELIVERY}</option>
                  <option value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</option>
                  <option value={OrderStatus.CANCELLED}>{OrderStatus.CANCELLED}</option>
                </select>
                <span className="material-icons absolute right-2 top-2.5 text-gray-600 pointer-events-none">expand_more</span>
              </div>
              
              <div className="relative">
                <select
                  id="sort-by"
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-md py-2 pl-3 pr-8 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="id-asc">Order ID (A-Z)</option>
                  <option value="id-desc">Order ID (Z-A)</option>
                </select>
                <span className="material-icons absolute right-2 top-2.5 text-gray-600 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500">Error loading orders. Please try again.</p>
            </div>
          )}
          
          {/* Orders Table */}
          {!isLoading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pizza Type</th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Order Date</th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderId}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{order.customerName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{order.pizzaType}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{order.quantity}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatDate(order.orderDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusBadge status={order.status as OrderStatus} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                        No orders found with the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination Controls */}
          {!isLoading && !error && filteredOrders.length > 0 && (
            <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of <span className="font-medium">{filteredOrders.length}</span> orders
              </div>
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 border border-gray-200 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled
                >
                  Previous
                </button>
                <button 
                  className="px-3 py-1 border border-gray-200 rounded-md bg-white text-gray-600 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
