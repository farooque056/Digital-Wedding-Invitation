import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Background Music Proxy Route
  // Fetches from high-reliability classical MP3 servers to ensure background music is always audible.
  app.get("/api/bgm.mp3", async (req, res) => {
    const audioUrls = [
      "https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d.mp3",
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    ];

    for (const url of audioUrls) {
      try {
        console.log(`[BGM Proxy] Fetching background music from: ${url}`);
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        });

        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const contentType = response.headers.get("content-type") || "audio/mpeg";

          console.log(`[BGM Proxy] Successfully fetched ${buffer.length} bytes from ${url}. Sending to client...`);

          res.setHeader("Content-Type", contentType);
          res.setHeader("Content-Length", buffer.length);
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader("Cache-Control", "public, max-age=86400");
          res.send(buffer);
          return;
        } else {
          console.warn(`[BGM Proxy] Failed response from ${url}: status ${response.status}`);
        }
      } catch (error: any) {
        console.error(`[BGM Proxy] Error fetching from ${url}:`, error.message || error);
      }
    }

    res.status(500).send("Error fetching background music");
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
