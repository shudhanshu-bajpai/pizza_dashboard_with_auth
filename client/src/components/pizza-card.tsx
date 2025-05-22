import { Card, CardContent } from "@/components/ui/card";

interface PizzaCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export default function PizzaCard({ name, description, imageUrl }: PizzaCardProps) {
  return (
    <Card className="rounded-lg overflow-hidden border border-gray-200">
      <img 
        src={imageUrl} 
        alt={`${name} Pizza`} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-3">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
