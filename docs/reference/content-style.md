# Writing and messaging

ONEComputer helps people use capable AI agents at work without giving those agents more access than the task requires. Our writing should make that idea feel understandable and useful—not remote or intimidating.

## Voice

Write with calm confidence. Begin with what a person is trying to accomplish, explain the practical tension, and then describe how the product helps. Use technical language when it adds precision, but explain the human meaning first.

Our voice is:

- **Human-first.** Talk about employees, managers, and security teams before systems and layers.
- **Concrete.** Name the file, action, decision, or workspace instead of relying on abstract nouns.
- **Candid.** Distinguish what works today from what is planned, and describe limitations plainly.
- **Empowering.** Security exists to help people use agents responsibly, not to make AI sound frightening.
- **Measured.** Avoid absolute safety claims. Explain the safeguards and what each one contributes.

## A useful order

Most product explanations should follow this sequence:

1. What people want to do.
2. What becomes difficult or risky.
3. How ONEComputer responds in practical terms.
4. How OpenVTC supports decisions that need a person.
5. Technical names and implementation detail, when the reader needs them.

For example:

> An employee asks Claude Code to prepare a customer report. Company policy allows the analysis but requires a manager to approve external sharing. ONEComputer pauses the export, and OpenVTC sends the exact request to the manager's separate wallet. The signed decision releases that request once.

## Preferred language

| Prefer | Avoid when plain language works |
| --- | --- |
| isolated cloud workspace | governed runtime |
| company rules | policy plane |
| pause the request | durable hold orchestration |
| separate wallet | external authority surface |
| signed decision | verifiable approval evidence |
| the application cannot approve its own request | explicit trust-boundary separation |
| works with different agents | agent-agnostic control plane |

Some technical terms remain necessary in architecture and protocol documentation. Introduce them after the reader understands their purpose.

## Claims and roadmap language

Use present tense only for capabilities in the working product. Mark roadmap integrations as **Planned** or **Coming soon**, and do not imply that a product is certified, compliant, or fully secure unless the repository contains current evidence for that claim.

Prefer descriptions such as “adds a safeguard,” “limits what the workspace can reach,” and “helps a manager verify the request” over absolute claims such as “guarantees safety” or “eliminates risk.”

## Calls to action

Buttons should tell the reader what they will see or do. Prefer “See how approvals work,” “Open this view,” and “Install locally” over vague labels such as “Learn more” or “Explore the surface.”
