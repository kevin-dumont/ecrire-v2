"use client";

import { useState } from "react";
import { usePostContext } from "@/contexts/PostContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function BodyStep() {
  const {
    postData,
    setPostData,
    bodyState: { bodies, isInitialLoad, isGenerating },
    generateNewBodies,
  } = usePostContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const bodiesPerPage = 3;

  const startIndex = currentPage * bodiesPerPage;
  const currentBodies = bodies.slice(startIndex, startIndex + bodiesPerPage);
  const totalPages = Math.ceil(bodies.length / bodiesPerPage);

  const handleGenerateMore = () => {
    if (attempts < maxAttempts) {
      generateNewBodies();
      setAttempts(attempts + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Contenu du post</h2>
        <p className="text-muted-foreground mb-6">
          Choisissez et personnalisez le contenu de votre post
        </p>
      </div>

      {isInitialLoad && isGenerating ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mr-3" />
          Génération des contenus en cours...
        </div>
      ) : (
        <>
          <div className="relative">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${
                isGenerating ? "opacity-50" : ""
              }`}
            >
              {currentBodies.map((body, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    postData.selectedBody === body
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : ""
                  }`}
                  onClick={() =>
                    setPostData({ ...postData, selectedBody: body })
                  }
                >
                  <Textarea
                    value={body}
                    readOnly
                    className="min-h-[200px] resize-none border-none focus-visible:ring-0"
                  />
                </Card>
              ))}
            </div>

            {isGenerating && !isInitialLoad && (
              <div className="absolute inset-0 flex justify-center items-center bg-white dark:bg-black bg-opacity-70">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {currentPage + 1} sur {totalPages}
                </span>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
                  }
                  disabled={currentPage === totalPages - 1}
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              onClick={handleGenerateMore}
              disabled={isGenerating || attempts >= maxAttempts}
            >
              <RefreshCw
                className={`mr-2 h-5 w-5 stroke-[1.5] ${
                  isGenerating ? "animate-spin" : ""
                }`}
              />
              Générer de nouveaux contenus ({maxAttempts - attempts} restantes)
            </Button>
          </div>
        </>
      )}

      {attempts >= maxAttempts && (
        <p className="text-muted-foreground mb-4 text-sm text-center">
          Vous avez atteint le nombre maximum de tentatives.
        </p>
      )}
    </div>
  );
}
