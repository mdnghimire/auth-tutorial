import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button size="lg" variant="custom">
        Click me
      </Button>
      <p className="font-semibold text-green-500">Hello Auth!</p>
    </div>
  );
}
