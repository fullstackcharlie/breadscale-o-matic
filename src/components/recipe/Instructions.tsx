import { Card } from "@/components/ui/card";

interface InstructionsProps {
  instructions: string[];
}

export const Instructions = ({ instructions }: InstructionsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-serif font-semibold mb-4">Instructions</h2>
      <ol className="space-y-4 list-decimal list-inside">
        {instructions.map((instruction, index) => (
          <li key={index} className="text-muted-foreground">
            {instruction}
          </li>
        ))}
      </ol>
    </Card>
  );
};