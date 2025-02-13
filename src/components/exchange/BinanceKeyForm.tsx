import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, AlertTriangle, CheckCircle } from "lucide-react";
import { binanceService } from "@/lib/binance-rest";

const formSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  apiSecret: z.string().min(1, "API Secret is required"),
  testMode: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

export function BinanceKeyForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      apiSecret: "",
      testMode: true,
    },
  });

  const testConnection = async (data: FormData) => {
    try {
      const client = binanceService.futures(
        data.apiKey,
        data.apiSecret,
        data.testMode,
      );
      await client.account();
      return true;
    } catch (error: any) {
      console.error("Binance connection test failed:", error);
      throw error;
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError("");
      setSuccess(false);

      await testConnection(data);

      // Save API keys securely
      localStorage.setItem("binance_api_key", data.apiKey);
      localStorage.setItem("binance_api_secret", data.apiSecret);
      localStorage.setItem("binance_test_mode", String(data.testMode));

      setError("");
      setSuccess(true);
    } catch (error) {
      setError("Failed to validate API keys. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-primary/10 border-primary/20">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription>API keys configured successfully!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="apiKey">API Key</Label>
        <Input
          id="apiKey"
          type="password"
          {...form.register("apiKey")}
          placeholder="Enter your Binance API key"
        />
        {form.formState.errors.apiKey && (
          <p className="text-sm text-destructive">
            {form.formState.errors.apiKey.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="apiSecret">API Secret</Label>
        <Input
          id="apiSecret"
          type="password"
          {...form.register("apiSecret")}
          placeholder="Enter your Binance API secret"
        />
        {form.formState.errors.apiSecret && (
          <p className="text-sm text-destructive">
            {form.formState.errors.apiSecret.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="testMode" {...form.register("testMode")} />
        <Label htmlFor="testMode">Use Testnet</Label>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" className="gap-2" disabled={isLoading}>
          <Key className="h-4 w-4" />
          {isLoading ? "Validating..." : "Save API Keys"}
        </Button>
      </div>
    </form>
  );
}
