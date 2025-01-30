import { Switch } from "@/components/ui/switch";

interface BakersMathToggleProps {
  useBakersMath: boolean;
  onToggle: (checked: boolean) => void;
}

export const BakersMathToggle = ({
  useBakersMath,
  onToggle,
}: BakersMathToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={useBakersMath}
        onCheckedChange={onToggle}
        id="bakers-math"
      />
      <label
        htmlFor="bakers-math"
        className="text-sm text-muted-foreground cursor-pointer"
      >
        Show Baker's Percentages
      </label>
    </div>
  );
};