import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/dashboard-layout";
import StatCard from "@/components/stat-card";
import PizzaCard from "@/components/pizza-card";

export default function WelcomePage() {
  const { user } = useAuth();

  const popularPizzas = [
    {
      name: "Margherita",
      description: "Classic cheese & tomato",
      imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
    },
    {
      name: "Pepperoni",
      description: "Spicy pepperoni slices",
      imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
    },
    {
      name: "Veggie Supreme",
      description: "Fresh vegetables",
      imageUrl: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
    },
    {
      name: "BBQ Chicken",
      description: "Grilled chicken & BBQ sauce",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hello, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Welcome to your pizza dashboard. Here you can manage and track all pizza orders.
          </p>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Orders" 
            value="124" 
            icon="receipt_long" 
            color="blue" 
          />
          <StatCard 
            title="Delivered" 
            value="86" 
            icon="check_circle" 
            color="green" 
          />
          <StatCard 
            title="In Progress" 
            value="32" 
            icon="hourglass_top" 
            color="yellow" 
          />
          <StatCard 
            title="Cancelled" 
            value="6" 
            icon="cancel" 
            color="red" 
          />
        </div>
        
        {/* Popular Pizzas Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Pizzas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPizzas.map((pizza, index) => (
              <PizzaCard
                key={index}
                name={pizza.name}
                description={pizza.description}
                imageUrl={pizza.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
