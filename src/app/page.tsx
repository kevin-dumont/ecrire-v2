"use client";

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

export default function Home() {
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

  const freePlanFeatures = [
    "5 posts par mois",
    "Tous les types de contenus",
    "Suggestions d'accroches",
    "Édition assistée par IA",
  ];

  const proPlanFeatures = [
    "Posts illimités",
    "Tous les types de contenus",
    "Suggestions d'accroches multiples",
    "Édition assistée par IA",
    "Analyse de performance",
    "Support prioritaire",
    "Garantie satisfait ou remboursé",
  ];

  return (
    <>
      <Navbar />

      <section className="relative py-48 overflow-hidden hero-gradient">
        <RetroGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center border border-gray-800 text-white py-2 px-4 rounded-full text-sm font-medium mb-4">
                <SparklesIcon className="h-4 w-4 mr-2 text-[hsl(153,65%,65%)]" />
                Propulsé par l&apos;IA
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-4 mb-8 max-w-4xl mx-auto">
                Générez des posts LinkedIn{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(153,65%,65%)] to-[hsl(153,65%,55%)]">
                  qui explosent{" "}
                </span>
                grâce à l&apos;IA
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                Générez des posts LinkedIn professionnels et engageants en
                quelques clics grâce à notre assistant IA spécialisé.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2 button-gradient">
                    Essayer gratuitement <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 gradient-bg">
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
                    <feature.icon className="h-6 w-6 text-[hsl(153,65%,55%)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Tarification Simple
            </h2>
            <p className="text-xl text-gray-400">
              Choisissez le plan qui vous convient
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plan Gratuit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-card p-8 rounded-lg h-full flex flex-col">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Gratuit
                  </h3>
                  <div className="flex justify-center items-baseline mb-4">
                    <span className="text-5xl font-extrabold text-white">
                      0€
                    </span>
                    <span className="text-xl text-gray-400 ml-2">/mois</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {freePlanFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="text-[hsl(153,65%,55%)] h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/login" className="block mt-auto">
                  <Button className="w-full" variant="outline" size="lg">
                    Commencer
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Plan Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="feature-card p-8 rounded-lg relative h-full flex flex-col border-primary">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Populaire
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                  <div className="flex justify-center items-baseline mb-4">
                    <span className="text-5xl font-extrabold text-white">
                      20€
                    </span>
                    <span className="text-xl text-gray-400 ml-2">/mois</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {proPlanFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="text-[hsl(153,65%,55%)] h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/login" className="block mt-auto">
                  <Button className="w-full button-gradient" size="lg">
                    Commencer
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
