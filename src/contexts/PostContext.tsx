import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useToast } from "@/hooks/use-toast";
import PostConfigurationStep from "@/components/post-generator/post-configuration-step";
import HookStep from "@/components/post-generator/hook-step";
import BodyStep from "@/components/post-generator/body-step";
import { PostEditionsStep } from "@/components/post-generator/post-editions-step";
import { useDependencies } from "@/contexts/DependenciesContext";
import { PostData } from "./PostData";

interface Step {
  title: string;
  component: React.ComponentType;
  validate: (data: PostData) => boolean;
}

interface PostContextProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
  hookState: { hooks: string[]; isGenerating: boolean; isInitialLoad: boolean };
  bodyState: {
    bodies: string[];
    isGenerating: boolean;
    isInitialLoad: boolean;
  };
  currentStep: number;
  setCurrentStep: (step: number) => void;
  generateNewHooks: () => Promise<void>;
  generateNewBodies: () => Promise<void>;
  isNextEnabled: boolean;
  steps: Step[];
}

const defaultPostData: PostData = {
  type: null,
  ideas: "",
  selectedHook: "",
  selectedBody: "",
  tone: "normal",
  finalPost: "",
  size: "short",
};

const defaultContext: PostContextProps = {
  postData: defaultPostData,
  setPostData: () => {},
  hookState: { hooks: [], isGenerating: false, isInitialLoad: true },
  bodyState: { bodies: [], isGenerating: false, isInitialLoad: true },
  currentStep: 1,
  setCurrentStep: () => {},
  generateNewHooks: async () => {},
  generateNewBodies: async () => {},
  isNextEnabled: false,
  steps: [],
};

const PostContext = createContext<PostContextProps>(defaultContext);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [postData, setPostData] = useState<PostData>(defaultPostData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const [hookState, setHookState] = useState({
    hooks: [] as string[],
    isGenerating: false,
    isInitialLoad: true,
  });

  const [bodyState, setBodyState] = useState({
    bodies: [] as string[],
    isGenerating: false,
    isInitialLoad: true,
  });

  const { toast } = useToast();
  const {
    postGenerator: { generateHooks, generateBody },
  } = useDependencies();

  const steps: Step[] = [
    {
      title: "Configuration du Post",
      component: PostConfigurationStep,
      validate: (data: PostData) =>
        data.type !== null && data.ideas !== "" && data.tone !== "",
    },
    {
      title: "Accroche",
      component: HookStep,
      validate: (data: PostData) => data.selectedHook !== "",
    },
    {
      title: "Corps du Post",
      component: BodyStep,
      validate: (data: PostData) => data.selectedBody !== "",
    },
    {
      title: "Edition du post",
      component: PostEditionsStep,
      validate: (data: PostData) => true,
    },
  ];

  useEffect(() => {
    const currentValidation = steps[currentStep - 1].validate;
    setIsNextEnabled(currentValidation(postData));
  }, [postData, currentStep, steps]);

  useEffect(() => {
    setPostData((prevData) => ({
      ...prevData,
      finalPost: `${prevData.selectedHook}\n\n${prevData.selectedBody}`,
    }));
  }, [postData.selectedHook, postData.selectedBody]);

  const generateNewHooks = useCallback(async () => {
    if (!postData.type || !postData.ideas) {
      toast({
        title: "Information manquante",
        description: "Veuillez d'abord remplir le type et les idées du post.",
        variant: "destructive",
      });
      return;
    }

    setHookState((prevState) => ({ ...prevState, isGenerating: true }));

    try {
      const result = await generateHooks(postData);

      if (result.error) {
        throw new Error(result.error);
      }
      if (result.hooks && result.hooks.length > 0) {
        setHookState((prevState) => ({
          ...prevState,
          hooks: [...prevState.hooks, ...result.hooks],
        }));
      }
    } catch (error) {
      console.error("Error generating hooks:", error);
      toast({
        title: "Erreur",
        description:
          "Impossible de générer de nouvelles accroches. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setHookState((prevState) => ({
        ...prevState,
        isGenerating: false,
        isInitialLoad: false,
      }));
    }
  }, [postData.type, postData.ideas, toast]);

  const generateNewBodies = useCallback(async () => {
    if (!postData.type || !postData.ideas || !postData.selectedHook) {
      toast({
        title: "Information manquante",
        description: "Veuillez d'abord sélectionner une accroche.",
        variant: "destructive",
      });
      return;
    }

    setBodyState((prevState) => ({ ...prevState, isGenerating: true }));

    try {
      const result = await generateBody(postData);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.bodies) {
        setBodyState((prevState) => ({
          ...prevState,
          bodies: [...prevState.bodies, ...(result.bodies || [])],
        }));
      }
    } catch {
      toast({
        title: "Erreur",
        description:
          "Impossible de générer de nouveaux contenus. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setBodyState((prevState) => ({
        ...prevState,
        isGenerating: false,
        isInitialLoad: false,
      }));
    }
  }, [postData, toast]);

  useEffect(() => {
    if (currentStep === 2 && hookState.hooks.length === 0) {
      generateNewHooks();
    }
  }, [currentStep, hookState.hooks.length, generateNewHooks]);

  useEffect(() => {
    if (
      currentStep === 3 &&
      bodyState.bodies.length === 0 &&
      bodyState.isInitialLoad
    ) {
      generateNewBodies();
    }
  }, [
    currentStep,
    bodyState.bodies.length,
    bodyState.isInitialLoad,
    generateNewBodies,
  ]);

  return (
    <PostContext.Provider
      value={{
        postData,
        setPostData,
        hookState,
        bodyState,
        currentStep,
        setCurrentStep,
        generateNewHooks,
        generateNewBodies,
        isNextEnabled,
        steps,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
