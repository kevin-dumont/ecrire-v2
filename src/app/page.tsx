"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Target,
  Trophy,
  Zap,
  SparklesIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import RetroGrid from "@/components/ui/retro-grid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(true);

  const features = [
    {
      title: "Posts optimisés",
      description:
        "Créez des posts LinkedIn parfaitement structurés qui captent l'attention et génèrent de l'engagement.",
      icon: Zap,
    },
    {
      title: "Processus guidé",
      description:
        "Notre assistant vous guide étape par étape pour créer du contenu pertinent et professionnel.",
      icon: Target,
    },
    {
      title: "Résultats garantis",
      description:
        "Augmentez votre visibilité et générez plus d'opportunités commerciales sur LinkedIn.",
      icon: Trophy,
    },
  ];

  const pricingPlans = {
    free: {
      name: "Essai gratuit",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        "3 posts",
        "Tous les types de contenus",
        "Suggestions d'accroches",
        "Édition assistée par IA",
      ],
    },
    pro: {
      name: "Pro",
      monthlyPrice: 29,
      annualPrice: 25,
      popular: true,
      features: [
        "20 posts / mois",
        "Tous les types de contenus",
        "Suggestions d'accroches",
        "Édition assistée par IA",
        "Support prioritaire",
      ],
    },
    unlimited: {
      name: "Illimité",
      monthlyPrice: 99,
      annualPrice: 80,
      popular: false,
      features: [
        "Posts illimités",
        "Tous les types de contenus",
        "Suggestions d'accroches",
        "Édition assistée par IA",
        "Analyse de performance",
        "Support prioritaire",
      ],
    },
  };

  const getPrice = (plan: "free" | "pro" | "unlimited") => {
    return isAnnual
      ? pricingPlans[plan].annualPrice
      : pricingPlans[plan].monthlyPrice;
  };

  return (
    <>
      <Navbar />

      <section className="relative py-48 overflow-hidden hero-gradient text-foreground">
        <RetroGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center border border-border text-foreground py-2 px-4 rounded-full text-sm font-medium mb-4 bg-neutral-50">
                <SparklesIcon className="h-4 w-4 mr-2 text-primary" />
                Propulsé par l&apos;IA
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-4 mb-8 max-w-4xl mx-auto">
                Générez des posts LinkedIn{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/90">
                  qui explosent{" "}
                </span>
                grâce à l&apos;IA
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Générez des posts LinkedIn professionnels et engageants en
                quelques clics grâce à notre assistant IA spécialisé.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/login">
                  <Button size="2xl" className="gap-2">
                    Essayer gratuitement <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="py-24 bg-zinc-50 dark:bg-neutral-950 border-t border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-card rounded-lg p-8">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 ">Tarification Simple</h2>
            <p className="text-xl text-muted-foreground">
              Choisissez le plan qui vous convient
            </p>
            <Tabs
              defaultValue={isAnnual ? "annual" : "monthly"}
              onValueChange={(value) => setIsAnnual(value === "annual")}
            >
              <TabsList className="mt-8 bg-primary/5">
                <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                <TabsTrigger value="annual">Annuel</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {Object.entries(pricingPlans).map(([key, plan], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`relative bg-card p-8 border rounded-lg h-full flex flex-col shadow-sm ${
                    plan.popular ? "border-primary" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Populaire
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      {plan.name}
                    </h3>
                    <div className="flex justify-center items-baseline mb-4">
                      <span className="text-5xl font-extrabold text-foreground">
                        {getPrice(key as "free" | "pro" | "unlimited")}€
                      </span>
                      <span className="text-xl text-muted-foreground ml-2">
                        /mois
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="text-primary h-5 w-5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/login" className="block mt-auto">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      Commencer
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
