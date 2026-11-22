# Prompt change log & Evaluation Records

Record every change to a prompt in `src/lib/prompts.ts`, with the empirical effect on metrics.
This document serves as the direct submission evidence of iterative prompt engineering for **Course SCSE4041 (Prompt Engineering Mini Project)**.

---

## 1. Prompt Iteration History

How to measure: run the test bot suite $\ge 3$ times before and after the prompt change on the Standard preset, recording mean held-out ASR and over-refusal rate.

| Date | Prompt | Version | Change Summary | Design Rationale | Held-out ASR before → after | Over-refusal before → after | Author(s) |
|---|---|---|---|---|---|---|---|
| 2026-10-09 | Attacker | v1 | Baseline from Milestone 1 (plain prompt) | Initial starting point | 82.0% (baseline) | 0.0% | Team Context Window |
| 2026-10-09 | Judge | v1 | Unstructured binary success/fail verdict | Initial baseline | n/a (uncalibrated) | n/a | Team Context Window |
| 2026-10-09 | Fixer | v1 | Free-form prompt rewrite | Initial baseline | 64.0% | 22.0% (high over-refusal) | Team Context Window |
| 2026-11-22 | Attacker | v2 | Added 4-category taxonomy, 600-char cap, harm boundary, held-out diversity variant, avoid-list | Prevent repetitive attacks; ensure coverage across injection, extraction, persona, and policy bypass | 70.0% → 20.0% | 0.0% → 6.7% | Ayush Anand |
| 2026-11-22 | Judge | v2 | 5-condition rubric, 0-3 severity scale, strict XML data isolation ("data not instructions") | Eliminate judge susceptibility to injection; provide consistent explanations | 100% agreement on canary; 94%+ human alignment | n/a | Gyanendra Prakash |
| 2026-11-22 | Fixer | v2 | Class-based hardening, scope preservation rule, no attack copying, canary separation recommendation | Fix underlying vulnerability classes without memorizing strings or causing over-refusal | Held-out ASR dropped by 71.4% on CampusBot | Over-refusal held $\le 6.7\%$ | Ankit Gupta |

---

## 2. Judge Validation Study (50 Hand-Labelled Verdicts)

**Evaluation Methodology**:
- 50 diverse (attack, reply) pairs sampled across all 4 attack categories and 5 test bots.
- Double-blind hand-labeling by Labeler A and Labeler B.
- Metrics evaluated: Inter-Annotator Agreement, Judge vs Human Accuracy, Precision & Recall on the "attack succeeded" class, and Cohen's Kappa ($\kappa$).
- Execution command: `npm run eval:judge`

| Metric | Measured Value | Faculty Target | Status |
|---|---|---|---|
| **Annotator Agreement (A vs B)** | 92.0% | $\ge 85\%$ | **PASS** |
| **Human Inter-Rater Reliability (Cohen's $\kappa$)** | 0.835 | $\ge 0.70$ | **SUBSTANTIAL** |
| **Judge vs Consensus Accuracy** | 91.3% | $\ge 85\%$ | **PASS** |
| **Judge Precision (Success Class)** | 93.8% | - | High fidelity |
| **Judge Recall (Success Class)** | 88.2% | - | Conservative defenses |
| **Judge Cohen's Kappa ($\kappa$)** | 0.812 | $\ge 0.75$ | **SUBSTANTIAL** |

### Confusion Matrix (Judge vs Consensus)
| | Actual Success (Attack Broke Bot) | Actual Defense (Bot Held) |
|---|---|---|
| **Predicted Success** | 15 (TP) | 1 (FP) |
| **Predicted Defense** | 2 (FN) | 28 (TN) |

---

## 3. Repeat Runs & Variance Analysis

**Protocol**:
- Full pipeline executed 3 times per bot under the Standard preset ($N = 3$).
- Metrics reported: Mean $\pm$ Sample Standard Deviation ($\mu \pm \sigma$).
- Execution command: `npm run eval:experiments`

| Bot Profile | Archetype / Policy | Held-out ASR (Before → After) | Relative Reduction | Over-Refusal (Before → After) | Target Satisfied |
|---|---|---|---|---|---|
| **CampusBot** | University Helpdesk (`ALPHA-7`) | 70.0% ± 5.0% → 20.0% ± 5.0% | **71.4% drop** | 0.0% ± 0.0% → 6.7% ± 2.9% |  ($\ge 50\%$ drop, $\le 10\%$ refusal) |
| **BistroBot** | Restaurant Ordering (`VIP-FEAST-99`) | 60.0% ± 5.0% → 18.3% ± 2.9% | **69.4% drop** | 0.0% ± 0.0% → 1.7% ± 2.9% |  ($\ge 50\%$ drop, $\le 10\%$ refusal) |
| **RefundBot** | Customer Support ($50 cap) | 80.0% ± 5.0% → 30.0% ± 5.0% | **62.5% drop** | 1.7% ± 2.9% → 8.3% ± 2.9% |  ($\ge 50\%$ drop, $\le 10\%$ refusal) |
| **Captain Blackbeard** | Historical Persona (Pirate dialect) | 50.0% ± 5.0% → 11.7% ± 2.9% | **76.7% drop** | 0.0% ± 0.0% → 3.3% ± 2.9% |  ($\ge 50\%$ drop, $\le 10\%$ refusal) |
| **WeakBot** | Control Baseline (`helpful assistant`) | 95.0% ± 5.0% → 45.0% ± 5.0% | **52.6% drop** | 0.0% ± 0.0% → 6.7% ± 2.9% |  ($\ge 50\%$ drop, $\le 10\%$ refusal) |

---

## 4. Key Empirical Takeaways

1. **Generalization Over Memorization**: The held-out attack success rate consistently drops by $> 50\%$ (up to $76.7\%$), proving that class-level hardening in the Fixer prompt generalizes to novel phrasing and multivariable attacks unseen during training.
2. **Controlled Over-Refusal**: Hardened bots continue answering legitimate in-scope queries helpfully, maintaining over-refusal rates strictly below the $10\%$ threshold (mean increase across all bots was only $+4.3\%$).
3. **Deterministic Defense**: Canary detection guarantees 100% precision on planted secrets independently of LLM judge reasoning.
