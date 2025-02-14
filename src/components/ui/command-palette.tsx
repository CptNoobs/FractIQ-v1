import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[750px] p-4 rounded-lg bg-background border shadow-lg"
    >
      <div className="flex items-center gap-2 px-3 border-b pb-4 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Command.Input
          placeholder="Type a command or search..."
          className="w-full bg-transparent outline-none"
        />
      </div>

      <Command.List className="max-h-[300px] overflow-y-auto">
        <Command.Group heading="Navigation">
          <Command.Item
            onSelect={() => {
              navigate("/main");
              setOpen(false);
            }}
          >
            Go to Home
          </Command.Item>
          <Command.Item
            onSelect={() => {
              navigate("/dashboard");
              setOpen(false);
            }}
          >
            Go to Dashboard
          </Command.Item>
          <Command.Item
            onSelect={() => {
              navigate("/analysis");
              setOpen(false);
            }}
          >
            Go to Analysis
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Actions">
          <Command.Item
            onSelect={() => {
              /* Add trade */
            }}
          >
            Add New Trade
          </Command.Item>
          <Command.Item
            onSelect={() => {
              /* Start analysis */
            }}
          >
            Start New Analysis
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
