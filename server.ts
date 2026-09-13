import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";
import { CooL, verifyEvidence } from "cool-nwc";

const cool = new CooL({
  applicationId: "proofchain",
});


const PORT = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

async function createProof(data) {
  const {
    amount = "1800000",
    invoice = "INV-1042",
    action = "payment_approval",
    decision = "APPROVED",
    reasoning = "The payment meets the configured approval conditions.",
  } = data;

  const { evidence, recordId, executionId, digest } = await cool.record({
    type: "ai.payment_decision",

    metadata: {
  product: "ProofChain",
  agent: "Finance-Agent-07",
  version: "1.0.0",
  action,
  amount: `${amount} INR`,
  invoice,
  decision,
  timestamp: new Date().toISOString(),
  },

    payloads: {
      input: `Should invoice ${invoice} for ₹${amount} be approved?`,
      output: `${decision} — ${reasoning}`,
    },
  });

  return {
    evidence,
    recordId,
    executionId,
    digest,
    decision,
    amount,
    invoice,
    reasoning,
  };
}

const server = http.createServer(async (req, res) => {
  try {    if (req.method === "GET" && req.url === "/") {
      const html = fs.readFileSync(
        path.join(process.cwd(), "public", "index.html"),
        "utf8"
      );

      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(html);
      return;
    }
    if (req.method === "GET" && req.url === "/create.html") {
  const html = fs.readFileSync(
    path.join(process.cwd(), "public", "create.html"),
    "utf8"
  );

  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });

  res.end(html);
  return;
}

if (req.method === "GET" && req.url === "/receipt.html") {
  const html = fs.readFileSync(
    path.join(process.cwd(), "public", "receipt.html"),
    "utf8"
  );

  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });

  res.end(html);
  return;
}
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      res.end();
      return;
    }

    if (req.method === "GET" && req.url === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        service: "ProofChain",
        cool: "connected",
      });
      return;
    }

    if (req.method === "POST" && req.url === "/api/create-proof") {
      const data = await readBody(req);
      const proof = await createProof(data);

      sendJson(res, 200, {
        ok: true,
        proof,
      });

      return;
    }

    if (req.method === "POST" && req.url === "/api/verify") {
      const data = await readBody(req);

      if (!data.evidence) {
        sendJson(res, 400, {
          ok: false,
          error: "Evidence is required.",
        });
        return;
      }

      const verdict = await verifyEvidence(data.evidence);

      sendJson(res, 200, {
        ok: verdict.ok,
        verdict,
      });

      return;
    }

    sendJson(res, 404, {
      ok: false,
      error: "Route not found.",
    });
  } catch (error) {
    console.error(error);

    sendJson(res, 500, {
      ok: false,
      error: error.message,
    });
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 ProofChain server running at http://localhost:${PORT}`);
  console.log("🔐 CooL evidence engine ready.");
  console.log("📡 Waiting for prototype requests...\n");
});
