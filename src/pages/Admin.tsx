import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const Admin = () => {
  const [verify, setVerify] = useState(false);
  useEffect(()=>{document.title = "Admin — HiveSphere"},[]);

  return (
    <main className="container py-8 space-y-6">
      <h1 className="text-3xl font-semibold">Admin Panel</h1>
      <Card>
        <CardHeader>
          <CardTitle>Trust & Verification</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Switch id="verify" checked={verify} onCheckedChange={setVerify} />
          <Label htmlFor="verify">Enable manual influencer verification</Label>
        </CardContent>
      </Card>
    </main>
  );
};

export default Admin;
