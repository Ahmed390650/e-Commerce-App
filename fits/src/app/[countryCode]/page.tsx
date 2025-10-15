import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-pink-100 via-white to-blue-100">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Fresh Styles, Everyday
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
          Discover the latest fashion trends with our exclusive clothing
          collections.
        </p>
        <Button size="lg" className="rounded-2xl">
          Shop Now
        </Button>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-2xl shadow-md overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src={`/clothes-${i}.jpg`}
                  alt={`Product ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg">Trendy Outfit {i}</h3>
                <p className="text-sm text-gray-500">Casual Collection</p>
                <div className="flex items-center gap-1 text-yellow-500 my-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="font-semibold text-lg">$49.99</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full flex items-center gap-2">
                  <ShoppingBag size={16} /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
