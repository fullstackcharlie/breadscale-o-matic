import { Input } from "@/components/ui/input";

interface DoughWeightControlProps {
  totalDoughWeight: number;
  onWeightChange: (weight: number) => void;
}

export const DoughWeightControl = ({
  totalDoughWeight,
  onWeightChange,
}: DoughWeightControlProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-muted-foreground">Total Dough Weight (g):</span>
      <Input
        type="number"
        value={Math.round(totalDoughWeight)}
        onChange={(e) => onWeightChange(Number(e.target.value))}
        className="w-24"
        min="0"
      />
    </div>
  );
};