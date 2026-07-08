import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Background Music Proxy Route
  // Fetches from Google Drive server-side to bypass CORS, iframe sandbox, and third-party cookie blocks.
  app.get("/api/bgm.mp3", async (req, res) => {
    const fileId = "1WtLiC-3yqCuQIdBAiQ4uraFh1eeHaEqi";
    let url = `https://docs.google.com/uc?export=download&id=${fileId}`;
    
    try {
      console.log(`[BGM Proxy] Fetching audio from Google Drive ID: ${fileId}`);
      
      let response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      let contentType = response.headers.get("content-type") || "";
      
      // Handle the "virus scan warning / confirm" screen if Google Drive serves an HTML warning page
      if (contentType.includes("text/html")) {
        const htmlText = await response.text();
        const confirmMatch = htmlText.match(/confirm=([A-Za-z0-9_]+)/);
        if (confirmMatch && confirmMatch[1]) {
          const confirmToken = confirmMatch[1];
          console.log(`[BGM Proxy] Found Google Drive confirm token: ${confirmToken}. Re-fetching...`);
          url = `https://docs.google.com/uc?export=download&confirm=${confirmToken}&id=${fileId}`;
          
          response = await fetch(url, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
          });
          contentType = response.headers.get("content-type") || "";
        }
      }

      if (!response.ok) {
        throw new Error(`Google Drive returned HTTP ${response.status}`);
      }

      const finalContentType = contentType.includes("audio") ? contentType : "audio/mpeg";
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.log(`[BGM Proxy] Successfully fetched ${buffer.length} bytes of audio. Sending to client...`);

      res.setHeader("Content-Type", finalContentType);
      res.setHeader("Content-Length", buffer.length);
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.send(buffer);
    } catch (error: any) {
      console.error("[BGM Proxy] Error proxying background music:", error.message || error);
      res.status(500).send("Error fetching background music");
    }
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
