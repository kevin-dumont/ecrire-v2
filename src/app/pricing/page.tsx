"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tarification Simple et Transparente</h1>
          <p className="text-xl text-muted-foreground">
            Tout ce dont vous avez besoin pour réussir sur LinkedIn
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Abonnement Pro</h2>
              <div className="flex justify-center items-baseline mb-4">
                <span className="text-5xl font-extrabold">20€</span>
                <span className="text-xl text-muted-foreground">/mois</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Traitement..." : "S'abonner Maintenant"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

const features = [
  "Génération illimitée de posts",
  "Tous les types de contenus (TOFU, MOFU, BOFU)",
  "Suggestions d'accroches multiples",
  "Édition assistée par IA",
  "Analyse de performance",
  "Support prioritaire",
  "Garantie satisfait ou remboursé",
];