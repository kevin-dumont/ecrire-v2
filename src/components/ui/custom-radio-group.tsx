import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CustomRadioGroupProps<T extends string> {
  options: Array<{
    value: T;
    label: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  selectedValue: T | undefined;
  onValueChange: (value: T) => void;
}

export function CustomRadioGroup<T extends string>({
  options,
  selectedValue,
  onValueChange,
}: CustomRadioGroupProps<T>) {
  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={onValueChange}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
    >
      {options.map((option) => (
        <div key={option.value} className="flex-1">
          <RadioGroupItem
            value={option.value}
            id={option.value}
            className="peer sr-only"
          />
          <Label
            htmlFor={option.value}
            className="flex flex-col items-start space-y-2 border bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-neutral-950/40 shadow-sm hover:bg-accent/50 dark:border-neutral-800 rounded-lg p-3 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary mb-0"
          >
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 mr-2 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                {selectedValue === option.value && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
              {option.icon && (
                <option.icon className="h-5 w-5 text-primary shrink-0" />
              )}
              <p className="font-medium leading-none">{option.label}</p>
            </div>
            {option.description && (
              <div className="flex items-center space-x-2">
                <div className="w-5"></div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            )}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
