import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface Post { id: number; userType: "brand" | "influencer"; text: string; likes: number; }

const Feed = () => {
  const [filter, setFilter] = useState<"all" | "brand" | "influencer">("all");
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, userType: "influencer", text: "New rates for September! DM.", likes: 4 },
    { id: 2, userType: "brand", text: "Looking for Lagos food creators this weekend.", likes: 8 },
  ]);
  const [text, setText] = useState("");

  useEffect(()=>{document.title = "Community Feed — HiveSphere"},[]);

  const add = () => {
    if (!text.trim() || text.length > 280) return;
    setPosts((p) => [{ id: Date.now(), userType: "brand", text: text.trim(), likes: 0 }, ...p]);
    setText("");
  };

  const visible = posts.filter(p => filter === 'all' ? true : p.userType === filter);

  return (
    <main className="container py-8 max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant={filter==='all' ? 'hero' : 'subtle'} onClick={()=>setFilter('all')}>All</Button>
        <Button variant={filter==='brand' ? 'hero' : 'subtle'} onClick={()=>setFilter('brand')}>Brands</Button>
        <Button variant={filter==='influencer' ? 'hero' : 'subtle'} onClick={()=>setFilter('influencer')}>Influencers</Button>
      </div>

      <Card className="p-4">
        <Input placeholder="Share something (max 280 chars)" value={text} onChange={(e)=>setText(e.target.value)} />
        <div className="flex justify-end pt-3">
          <Button variant="hero" onClick={add}>Post</Button>
        </div>
      </Card>

      <section className="space-y-4">
        {visible.map(p => (
          <Card key={p.id} className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{p.userType === 'brand' ? 'Brand' : 'Influencer'}</span>
                <span className="text-xs text-muted-foreground">{p.text.length}/280</span>
              </div>
              <p className="mb-3">{p.text}</p>
              <Button size="sm" variant="subtle" onClick={()=>setPosts(ps=>ps.map(x=>x.id===p.id?{...x, likes:x.likes+1}:x))}>Like ({p.likes})</Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default Feed;
