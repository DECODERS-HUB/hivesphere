import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

interface Msg { id: number; text: string; from: "brand" | "influencer"; time: string; }

const Messages = () => {
  const [list, setList] = useState<Msg[]>([
    { id: 1, text: "Hi! Can you share your rate for a TikTok video?", from: "brand", time: "09:30" },
    { id: 2, text: "Hey! ₦80,000 per video, includes basic edits.", from: "influencer", time: "09:32" },
  ]);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{document.title = "Messages — HiveSphere"},[]);
  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [list]);

  const send = () => {
    if (!value.trim()) return;
    setList((l) => [...l, { id: Date.now(), text: value.trim(), from: "brand", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setValue("");
  };

  return (
    <main className="container py-8 grid md:grid-cols-[260px_1fr] gap-6">
      <aside className="hidden md:block">
        <Card className="h-[70vh] flex flex-col">
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2">
            {['Seyi V.', 'Ada E.', 'Chisom'].map((n, idx) => (
              <div key={idx} className="p-2 rounded-md hover:bg-muted cursor-pointer flex items-center justify-between">
                <span className="text-sm">{n}</span>
                <span className="text-[11px] text-muted-foreground">9:{30 + idx}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>

      <section>
        <Card className="h-[70vh] flex flex-col">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-3">
            {list.map(m => (
              <div key={m.id} className={`max-w-[80%] ${m.from === 'brand' ? 'ml-auto' : ''}`}>
                <div className={`rounded-lg px-3 py-2 ${m.from === 'brand' ? 'bg-gradient-brand text-primary-foreground' : 'bg-secondary'}`}>
                  <p className="text-sm">{m.text}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{m.time}</span>
              </div>
            ))}
            <div ref={endRef} />
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Input placeholder="Type a message…" value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); send(); } }} />
            <Button onClick={send} variant="hero">Send</Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default Messages;
