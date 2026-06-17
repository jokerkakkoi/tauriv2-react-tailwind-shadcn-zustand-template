import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app.config";
import { useAppStore } from "@/stores/app-store";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const stackItems = [
  "Tauri v2",
  "React 19",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Zustand",
];

function App() {
  const theme = useAppStore((state) => state.theme);
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  async function handleGreet() {
    const result = await invoke<string>("greet", { name });
    setGreeting(result);
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
        <div className="bg-card space-y-8 rounded-3xl border p-8 shadow-sm md:p-12">
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm font-medium">
              Desktop application starter
            </p>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                {appConfig.name}
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base leading-7 md:text-lg">
                {appConfig.description}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {stackItems.map((item) => (
              <div
                key={item}
                className="bg-background rounded-2xl border px-4 py-3 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Start building</Button>
            <Button variant="outline" size="lg">
              Read the docs
            </Button>
          </div>

          <div className="border-t pt-6">
            <h2 className="mb-3 text-lg font-semibold">Frontend ↔ Backend Demo</h2>
            <div className="flex gap-3">
              <input
                className="bg-background flex-1 rounded-lg border px-3 py-2 text-sm"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button onClick={handleGreet}>Greet</Button>
            </div>
            {greeting && (
              <p className="text-muted-foreground mt-3 text-sm">{greeting}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
