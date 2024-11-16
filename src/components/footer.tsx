"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="gradient-bg border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo et description */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">LinkedPost</h3>
              <p className="text-sm text-gray-400">
                Créez des posts LinkedIn professionnels et engageants en quelques clics grâce à notre assistant IA spécialisé.
              </p>
            </div>

            {/* Liens rapides */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Liens rapides</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-primary transition-colors">
                    Commencer
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="text-gray-400 hover:text-primary transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-gray-400 hover:text-primary transition-colors">
                    Tarifs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border/40">
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} LinkedPost. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}