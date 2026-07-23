import { useEffect, useState } from "react";

const API = "https://reimagined-spoon-447vq94vw7wfgvr-8000.app.github.dev";

export default function BackendStatus() {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    fetch(`${API}/health`)
      .then((res) => {
        if (res.ok) setOnline(true);
        else setOnline(false);
      })
      .catch(() => setOnline(false));
  }, []);

  return (
    <div>
      {online ? "🟢 Backend Online" : "🔴 Backend Offline"}
    </div>
  );
}