# ProofChain

> **The AI did it. But did it?**

ProofChain is an AI evidence layer that turns important AI actions into cryptographically verifiable digital receipts.

Instead of relying only on ordinary logs, ProofChain creates evidence that can be independently checked for integrity, signatures, and transparency-log inclusion.

## Problem

AI agents are increasingly able to make decisions and perform actions on behalf of users and organizations.

A normal log can tell us what supposedly happened, but it does not necessarily provide independently verifiable evidence that the record has not been changed.

ProofChain addresses this trust gap by turning important AI actions into tamper-evident evidence.

## What We Built

ProofChain allows a user to:

1. Create an AI decision evidence record.
2. Generate a cryptographic receipt for that action.
3. Verify the receipt through the CooL evidence layer.
4. Detect tampering after the evidence has been created.
5. Review previously created evidence in Verification History.

Each receipt contains information such as:

* Agent
* Agent version
* Action
* Timestamp
* Invoice
* Amount
* Record ID
* Cryptographic digest
* Verification status

## How CooL Is Used

CooL supplies the cryptographic evidence layer for ProofChain.

The ProofChain backend uses the CooL SDK to record AI decision evidence and then uses CooL verification to check the resulting evidence.

The verification flow checks:

* Evidence integrity / binding
* Cryptographic signatures
* Transparency-log inclusion
* Attestation status

This makes CooL a meaningful part of the product rather than only a visual integration.

## Architecture

```text
USER
  ↓
ProofChain
  ↓
AI Decision
  ↓
CooL SDK
  ↓
Cryptographic Evidence Receipt
  ↓
Verification
  ↓
VALID / TAMPER DETECTED
```

## Evidence Flow

```text
OBSERVE → COMMIT → SIGN → VERIFY
```

ProofChain captures the important AI action, creates a tamper-evident evidence record through CooL, and allows the resulting receipt to be independently verified.

## Tech Stack

* Node.js
* JavaScript
* HTML
* CSS
* CooL SDK (`cool-nwc`)
* CooL cryptographic verification

## Project Structure

```text
ProofChain/
├── public/
│   └── index.html
├── server.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.ts
```

Then open:

```text
http://localhost:3000
```

## Demo

### Create Evidence

Enter an invoice and payment amount, then select:

**ANALYZE & CREATE PROOF**

ProofChain creates a cryptographic receipt through the CooL evidence layer.

### Verify Evidence

The receipt is automatically verified and displays the verification checks.

### Test Tampering

Select:

**TAMPER WITH EVIDENCE**

ProofChain modifies the evidence and sends it through verification again.

The verification should fail and report:

**VERIFICATION FAILED — TAMPER DETECTED**

## Why CooL Matters

Without a cryptographic evidence layer, ProofChain would primarily be another application log.

CooL provides the evidence primitives that allow the application to demonstrate whether the recorded evidence remains valid.

ProofChain focuses on the product experience and use case, while CooL provides the underlying evidence and verification layer.

## Limitations

* Hardware-based attestation may be simulated depending on the environment.
* The current prototype focuses on AI payment decisions.
* Persistent hosted history is not yet implemented.
* External witnesses and public anchoring are future improvements.

## Future Improvements

* External evidence witnesses
* Hosted verification service
* Standardized JSON evidence schema
* More trusted execution environments
* Confidential GPU support
* Additional AI agent integrations
* Enterprise audit dashboards

## Hackathon Context

ProofChain was built as a functional prototype around the question:

> **Can someone independently prove what an AI actually did?**

The goal is to move from:

**LOGS → EVIDENCE**

and make AI actions easier to audit, investigate, and trust.
