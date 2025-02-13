import { useState, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SymbolSearchProps {
  value: string;
  onChange: (symbol: string) => void;
}

interface SymbolInfo {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  status: string;
}

export function SymbolSearch({ value, onChange }: SymbolSearchProps) {
  const [open, setOpen] = useState(false);
  const [symbols, setSymbols] = useState<SymbolInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/exchangeInfo",
        );
        const data = await response.json();
        const activeSymbols = data.symbols
          .filter(
            (s: SymbolInfo) =>
              s.status === "TRADING" && s.quoteAsset === "USDT",
          )
          .sort((a: SymbolInfo, b: SymbolInfo) =>
            a.symbol.localeCompare(b.symbol),
          );
        setSymbols(activeSymbols);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSymbols();
  }, []);

  const selectedSymbol = symbols.find((s) => s.symbol === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedSymbol ? selectedSymbol.baseAsset : "Select symbol..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search symbol..." />
          <CommandList>
            <CommandEmpty>No symbol found.</CommandEmpty>
            <CommandGroup>
              {symbols.map((symbol) => (
                <CommandItem
                  key={symbol.symbol}
                  value={symbol.symbol}
                  onSelect={() => {
                    onChange(symbol.symbol);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === symbol.symbol ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {symbol.baseAsset}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {symbol.symbol}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
