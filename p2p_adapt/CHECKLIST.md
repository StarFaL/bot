PRIORITY CHECKLIST (short-term)
1) Run the existing app locally and point me to runtime errors (I can try to auto-fix).
2) Add server-side escrow flow (template provided) and integrate with frontend flows (Create trade / Release / Refund).
3) Implement chat (WebSocket) and upload attachments for payment proofs.
4) Add 2FA and basic KYC flow (staged: optional -> required for fiat).
5) Add admin panel for disputes and audit logs.
6) Add monitoring, backups, encryption for secrets, and schedule a smart-contract audit.

SECURITY HIGHEST PRIORITIES
- Do NOT use any private keys in repo. Move to KMS/HSM.
- Use multisig for admin keys if handling on-chain escrows.
- Audit smart contracts and pen-test the backend before real funds.
- Rate-limit critical endpoints and add velocity checks (withdraws, offers).
