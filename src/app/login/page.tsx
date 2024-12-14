"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useDependencies } from "@/contexts/DependenciesContext";

const formSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { auth } = useDependencies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const { error } = await auth.signInWithEmail(data.email);

      if (error) {
        throw error;
      }

      toast({
        title: "Lien de connexion envoyé !",
        description: "Vérifiez votre boîte mail pour vous connecter.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 gradient-bg">
      <Card className="w-full max-w-md bg-card border-border/40">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">LinkedPost</CardTitle>
          <CardDescription className="text-muted-foreground">
            Connectez-vous avec votre adresse email pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="nom@exemple.com"
                  className="pl-10 bg-background border-border/40"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full button-gradient"
              disabled={isLoading}
            >
              {isLoading
                ? "Envoi en cours..."
                : "Recevoir le lien de connexion"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
