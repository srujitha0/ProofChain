import { CooL, verifyEvidence } from "cool-nwc";

const cool = new CooL({
  applicationId: "proofchain",
});

async function main() {
  console.log("🚀 ProofChain starting...\n");

  const { evidence, recordId, executionId, digest } = await cool.record({
    type: "ai.payment_decision",

    metadata: {
      agent: "Claude",
      action: "payment_approval",
      amount: "1800000 INR",
      decision: "APPROVED",
    },

    payloads: {
      input: "Should this ₹18,00,000 invoice be approved?",
      output: "APPROVED — invoice meets the configured approval conditions.",
    },
  });

  console.log("✅ CooL evidence receipt created!");
  console.log("Record ID:", recordId);
  console.log("Execution ID:", executionId);
  console.log("Digest:", digest);

  console.log("\n🔍 Verifying evidence...\n");

  const verdict = await verifyEvidence(evidence);

  console.log("Verification result:");
  console.log(verdict);
}

main().catch((error) => {
  console.error("❌ ProofChain error:", error);
});