import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Cpu,
  FileCheck2,
  Github,
  GitFork,
  LockKeyhole,
  Monitor,
  Network,
  ScanLine,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  WalletCards,
} from "lucide-react";

const GITHUB = "https://github.com/ONE-Computer/onecomputer";
const CLOUD = "https://onecomputer-openvtc.eastus2.cloudapp.azure.com";
const DOCS = "/docs/";

const agentOptions = [
  { id: "claude", name: "Claude", kind: "Desktop · Code", href: "https://claude.com/download" },
  { id: "nanoclaw", name: "NanoClaw", kind: "Container-native", href: "https://github.com/qwibitai/nanoclaw" },
  { id: "openclaw", name: "OpenClaw", kind: "Open agent platform", href: "https://github.com/openclaw/openclaw" },
  { id: "codex", name: "Codex", kind: "Coding agent", href: "https://openai.com/codex/" },
  { id: "hermes", name: "Hermes Agent", kind: "Open · extensible", href: "https://github.com/NousResearch/hermes-agent" },
];

const productSteps = [
  {
    id: "workspace",
    eyebrow: "01 · Work",
    title: "Give teams a real Claude workspace in the cloud.",
    body: "A browser-accessible computer with Claude Desktop and Claude Code already available—ready for work, isolated from the rest of the enterprise.",
    image: "/screenshots/claude-desktop-sandbox.png",
    alt: "Remote Ubuntu cloud workspace with Claude Desktop and Claude Code Terminal available",
    kind: "workspace",
    icon: Monitor,
  },
  {
    id: "control",
    eyebrow: "02 · Control",
    title: "See every computer and agent from one live control plane.",
    body: "Security teams get an org-wide view of running sandboxes, active agents, errors, and enforcement state—without entering the agent workspace.",
    image: "/screenshots/ciso-console.png",
    alt: "ONEComputer CISO Console showing sandbox and agent fleet status",
    kind: "ciso",
    icon: ScanLine,
  },
  {
    id: "policy",
    eyebrow: "03 · Govern",
    title: "Set the company floor before an agent connects.",
    body: "Default policy and scoped rules decide which traffic is allowed, denied, or sent to human review. Teams can add stricter controls, never weaker ones.",
    image: "/screenshots/default-policy.png",
    alt: "ONEComputer company default policy screen",
    kind: "policy",
    icon: SlidersHorizontal,
  },
  {
    id: "approve",
    eyebrow: "04 · Verify",
    title: "Keep the approval key outside ONEComputer.",
    body: "Risky actions pause at the gateway. ONEComputer shows the hold, while the signed decision comes from a separate OpenVTC wallet and can be released only once.",
    image: "/screenshots/approvals.png",
    alt: "ONEComputer approvals screen showing OpenVTC Wallet required",
    kind: "approvals",
    icon: WalletCards,
  },
];

const repositories = [
  {
    label: "Product",
    name: "onecomputer",
    text: "Control plane, gateway, policies, sandboxes, and connector orchestration.",
    href: GITHUB,
  },
  {
    label: "Trust plane",
    name: "verifiable-trust-infrastructure",
    text: "Identity, Trust Tasks, verification, and signed evidence primitives.",
    href: "https://github.com/ONE-Computer/verifiable-trust-infrastructure",
  },
  {
    label: "Wallet",
    name: "vta-mobile-agent-ios",
    text: "External device custody and signed human approval responses.",
    href: "https://github.com/ONE-Computer/vta-mobile-agent-ios",
  },
  {
    label: "Protocol docs",
    name: "OpenVTC wiki",
    text: "The open trust architecture behind the ONEComputer integration.",
    href: "https://github.com/OpenVTC/wiki",
  },
];

const flowNodes = [
  { label: "Admin policy", detail: "Define the floor", icon: SlidersHorizontal },
  { label: "Agent computer", detail: "Run in isolation", icon: Cpu },
  { label: "Gateway hold", detail: "Pause the action", icon: LockKeyhole },
  { label: "VTI wallet", detail: "Sign externally", icon: WalletCards },
  { label: "Verified release", detail: "Release once", icon: BadgeCheck },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AgentRotator({ compact = false }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % agentOptions.length),
      2700,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const agent = agentOptions[active];

  return (
    <span className={`agent-rotator ${compact ? "agent-rotator-compact" : ""}`} aria-live="polite">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={agent.id}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {agent.name}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Logo() {
  return (
    <span className="logo-lockup">
      <span className="logo-mark" aria-hidden="true">
        <img src="/favicon.svg" alt="" />
      </span>
      <span>ONEComputer</span>
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

function ProductCapture({ step, hero = false }) {
  return (
    <motion.div
      className={`capture capture-${step.kind} ${hero ? "capture-hero" : ""}`}
      initial={{ opacity: 0, scale: 0.975, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.985, y: -12 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="capture-bar">
        <span className="capture-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="capture-url">cloud.onecomputer.dev/{step.id}</span>
        <span className="capture-live">
          <i /> Live Azure build
        </span>
      </div>
      <div className="capture-viewport">
        <img src={step.image} alt={step.alt} loading={hero ? "eager" : "lazy"} />
        {step.kind === "workspace" && (
          <div className="workspace-badges" aria-hidden="true">
            <span><Monitor size={13} /> Claude Desktop</span>
            <span><Cpu size={13} /> Claude Code</span>
            <span className="workspace-badge-live"><i /> Isolated sandbox</span>
          </div>
        )}
        <div className="capture-redactions" aria-hidden="true">
          {step.kind === "ciso" && (
            <>
              <span className="redaction ciso-r1">Research workspace</span>
              <span className="redaction ciso-r2">Engineering sandbox</span>
              <span className="redaction ciso-r3">Customer operations</span>
              <span className="redaction ciso-r4">Security test</span>
            </>
          )}
          {step.kind === "approvals" && (
            <>
              <span className="redaction approval-r1">Send customer update</span>
              <span className="redaction approval-r2">Export governed report</span>
              <span className="redaction approval-r3">Change production workflow</span>
            </>
          )}
        </div>
        {hero && <div className="capture-fade" />}
      </div>
    </motion.div>
  );
}

function Nav({ progress, page = "home" }) {
  const homeAnchor = (id) => page === "home" ? `#${id}` : `/#${id}`;

  return (
    <motion.header
      className="site-nav"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <nav className="shell nav-inner" aria-label="Primary navigation">
        <a href={page === "home" ? "#top" : "/"} aria-label="ONEComputer home">
          <Logo />
        </a>
        <div className="nav-links">
          <a href={homeAnchor("product")}>Product</a>
          <a href={homeAnchor("agents")}>Agents</a>
          <a href="/openvtc/">OpenVTC</a>
          <a href={homeAnchor("security")}>Security</a>
          <a href={DOCS}>Docs</a>
          <a href="/open-source/">Open source</a>
        </div>
        <motion.a
          className="button button-quiet nav-cta"
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Github size={15} /> GitHub <ArrowUpRight size={14} />
        </motion.a>
      </nav>
    </motion.header>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="shell hero-grid">
        <motion.div className="hero-copy" style={{ opacity: copyOpacity }}>
          <motion.div
            className="status-chip"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="live-dot" /> Open source · forked from ONECli
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            A safe computer for <span><AgentRotator /></span>
          </motion.h1>
          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
          >
            Give your enterprise one governed cloud runtime for the agent stack
            your teams choose. ONEComputer combines isolated workspaces,
            company policy, and human-governed approvals—without forcing one
            agent vendor on the business.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <motion.a
              className="button button-brand"
              href="#product"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              See the six-part story <ArrowDown size={15} />
            </motion.a>
            <motion.a
              className="button button-quiet"
              href={DOCS}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Read the docs <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-product"
          style={{ y: visualY, scale: visualScale }}
          initial={{ opacity: 0, y: 45, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProductCapture step={productSteps[0]} hero />
          <motion.div
            className="floating-proof proof-policy"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck size={17} />
            <span>
              Workspace <b>isolated</b>
            </span>
          </motion.div>
          <motion.div
            className="floating-proof proof-wallet"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <WalletCards size={17} />
            <span>
              Company policy <b>connected</b>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="shell trust-strip" aria-label="ONEComputer capabilities">
        <span><Server size={15} /> Agent workspaces</span>
        <span><ShieldCheck size={15} /> Policy gateway</span>
        <span><WalletCards size={15} /> External approval</span>
        <span><FileCheck2 size={15} /> Audit evidence</span>
      </div>
    </section>
  );
}

function ProductTour() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % productSteps.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const activeStep = productSteps[active];

  return (
    <section className="section product-section" id="product">
      <div className="shell">
        <Reveal className="section-intro">
          <p className="eyebrow">Real product · deployed on Azure</p>
          <h2>One control plane for every agent surface.</h2>
          <p>
            These are live ONEComputer product surfaces—not concept art. The
            screenshots use Claude as one concrete workspace; the control,
            policy, hold, and evidence model is designed to stay agent-agnostic.
          </p>
        </Reveal>

        <div className="product-tour">
          <div className="product-tabs" role="tablist" aria-label="Product tour">
            {productSteps.map((step, index) => {
              const Icon = step.icon;
              const selected = index === active;
              return (
                <motion.button
                  key={step.id}
                  className={`product-tab ${selected ? "is-active" : ""}`}
                  onClick={() => setActive(index)}
                  role="tab"
                  id={`product-tab-${step.id}`}
                  aria-selected={selected}
                  aria-controls="product-panel"
                  whileHover={{ x: selected ? 0 : 4 }}
                >
                  <span className="tab-icon"><Icon size={17} /></span>
                  <span>
                    <small>{step.eyebrow}</small>
                    <b>{step.title}</b>
                    <em>{step.body}</em>
                  </span>
                  <ArrowRight className="tab-arrow" size={17} />
                  {selected && (
                    <motion.i
                      className="tab-progress"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduceMotion ? 0 : 6, ease: "linear" }}
                      key={`progress-${active}`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          <div
            className="product-stage"
            id="product-panel"
            role="tabpanel"
            aria-labelledby={`product-tab-${activeStep.id}`}
          >
            <div className="capture-stack">
              <AnimatePresence initial={false}>
                <ProductCapture key={activeStep.id} step={activeStep} />
              </AnimatePresence>
            </div>
            <motion.div
              className="stage-caption"
              key={`caption-${activeStep.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span><span className="live-dot" /> Captured from the deployed cloud build</span>
              <a href={`${CLOUD}/${activeStep.id === "workspace" || activeStep.id === "control" ? "console" : activeStep.id === "policy" ? "settings/policy" : "approvals"}`} target="_blank" rel="noreferrer">
                Open surface <ArrowUpRight size={13} />
              </a>
            </motion.div>
          </div>
        </div>

        <div className="subpage-link-row" aria-label="Product pages">
          <a href="/agents/"><span>01</span><strong>Agent workspaces</strong><ArrowRight size={14} /></a>
          <a href="/architecture/"><span>02</span><strong>Architecture</strong><ArrowRight size={14} /></a>
          <a href="/security/"><span>03</span><strong>Security model</strong><ArrowRight size={14} /></a>
          <a href="/getting-started/"><span>04</span><strong>Get started</strong><ArrowRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

function AgentCoverage() {
  return (
    <section className="section agent-section" id="agents">
      <div className="shell">
        <Reveal className="section-intro narrow">
          <p className="eyebrow">Agent-agnostic by design</p>
          <h2>Bring your agent stack. Keep one security plane.</h2>
          <p>
            Claude, NanoClaw, OpenClaw, Codex, Hermes Agent, and the next
            runtime your team adopts should not each require a new security
            operating model. ONEComputer gives them the same governed place to
            work.
          </p>
        </Reveal>

        <div className="agent-command">
          <Reveal className="agent-command-visual">
            <div className="agent-command-grid" aria-hidden="true" />
            <span className="agent-command-orbit agent-command-orbit-one" />
            <span className="agent-command-orbit agent-command-orbit-two" />
            <span className="agent-command-status"><i /> Runtime boundary active</span>
            <span className="agent-command-label">Safe place for</span>
            <div className="agent-command-name"><AgentRotator /></div>
            <span className="agent-command-caption">same workspace · same policy · same evidence</span>
          </Reveal>
          <Reveal className="agent-command-copy" delay={0.12}>
            <p className="eyebrow">No vendor lock-in at the boundary</p>
            <h3>Adopt faster without multiplying risk.</h3>
            <p>
              The agent can change. Your policy, isolation, approval authority,
              and audit trail do not have to. Connect the surface your teams
              need while ONEComputer keeps the operating boundary consistent.
            </p>
            <div className="agent-command-points">
              <span><Check size={14} /> One cloud computer model</span>
              <span><Check size={14} /> One policy gateway</span>
              <span><Check size={14} /> One external trust boundary</span>
            </div>
            <a className="inline-link" href="/agents/">Explore agent workspaces <ArrowRight size={14} /></a>
          </Reveal>
        </div>

        <div className="agent-grid" aria-label="Agent surfaces ONEComputer is designed to host">
          {agentOptions.map((agent, index) => (
            <motion.a
              key={agent.id}
              className="agent-card"
              href={agent.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              whileHover={{ y: -5, borderColor: "rgba(25, 186, 93, .55)" }}
            >
              <span className={`agent-mark agent-mark-${agent.id}`} aria-hidden="true">{agent.name.slice(0, 1)}</span>
              <span className="agent-card-copy"><strong>{agent.name}</strong><small>{agent.kind}</small></span>
              <ArrowUpRight size={15} className="agent-card-arrow" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseStory() {
  return (
    <section className="section enterprise-section">
      <div className="shell enterprise-grid">
        <Reveal className="workspace-frame">
          <div className="workspace-frame-top">
            <span className="capture-dots" aria-hidden="true"><i /><i /><i /></span>
            <span>cloud.onecomputer.dev / sandbox / claude</span>
            <span className="workspace-state"><i /> Running</span>
          </div>
          <div className="workspace-frame-image">
            <img src="/screenshots/claude-desktop-sandbox.png" alt="ONEComputer cloud sandbox desktop with Claude Desktop and Claude Code Terminal" loading="lazy" />
            <div className="workspace-callout workspace-callout-one"><Monitor size={14} /> Claude Desktop</div>
            <div className="workspace-callout workspace-callout-two"><Cpu size={14} /> Claude Code</div>
            <div className="workspace-inset">
              <img src="/screenshots/claude-desktop-welcome.png" alt="Claude Desktop running inside the ONEComputer sandbox" loading="lazy" />
              <span><Monitor size={12} /> Claude Desktop · governed gateway</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="enterprise-copy" delay={0.12}>
          <p className="eyebrow">The enterprise path to agentic work</p>
          <h2>Give teams their agents. Give security a boundary.</h2>
          <p>
            A chat window is not an operating model. ONEComputer gives every
            agent a controlled computer where it can work with files, tools,
            and context—while the company keeps the controls that make
            adoption responsible.
          </p>
          <div className="enterprise-points">
            <div><span><Server size={16} /></span><p><b>Provision in minutes</b><small>Spin up an isolated workspace from the control plane.</small></p></div>
            <div><span><ShieldCheck size={16} /></span><p><b>Enforce the company floor</b><small>Apply identity, network, data, and action policy before work begins.</small></p></div>
            <div><span><FileCheck2 size={16} /></span><p><b>Leave an evidence trail</b><small>Connect holds, approvals, releases, and runtime activity.</small></p></div>
          </div>
          <a className="inline-link" href="#security">See how the boundary works <ArrowRight size={14} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function SecurityFlow() {
  return (
    <section className="section flow-section" id="security">
      <div className="shell">
        <Reveal className="section-intro narrow">
          <p className="eyebrow">Security by separation</p>
          <h2>Let the agent move fast. Keep authority outside the app.</h2>
          <p>
            ONEComputer owns the business workflow and runtime boundary.
            OpenVTC owns identity, wallet custody, Trust Tasks, and the signed
            decision. That separation is the feature.
          </p>
        </Reveal>

        <motion.div
          className="flow-rail"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.div
            className="flow-line"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="flow-packet"
            variants={{ hidden: { left: "1%", opacity: 0 }, visible: { left: "96%", opacity: [0, 1, 1, 0] } }}
            transition={{ duration: 3.2, delay: 0.7, ease: "easeInOut" }}
          />
          {flowNodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                className="flow-node"
                key={node.label}
                variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
                transition={{ delay: 0.18 * index, duration: 0.5 }}
              >
                <span><Icon size={18} /></span>
                <b>{node.label}</b>
                <small>{node.detail}</small>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="boundary-grid">
          <Reveal className="boundary-card">
            <span className="boundary-icon"><Cpu size={20} /></span>
            <p className="eyebrow">ONEComputer control plane</p>
            <h3>Run the work.</h3>
            <p>Users, company policy, cloud computers, agents, connectors, gateway holds, and correlated audit state.</p>
            <ul>
              <li><Check size={14} /> Business workflow</li>
              <li><Check size={14} /> Runtime enforcement</li>
              <li><Check size={14} /> Durable holds</li>
            </ul>
          </Reveal>
          <Reveal className="boundary-card boundary-card-trust" delay={0.12}>
            <span className="boundary-icon"><Network size={20} /></span>
            <p className="eyebrow">OpenVTC trust plane</p>
            <h3>Prove the decision.</h3>
            <p>Verifiable identity, external key custody, DIDComm delivery, signed approval evidence, and replay resistance.</p>
            <ul>
              <li><Check size={14} /> External wallet</li>
              <li><Check size={14} /> Signed Trust Tasks</li>
              <li><Check size={14} /> One-time release proof</li>
            </ul>
          </Reveal>
        </div>
        <a className="inline-link flow-link" href="/security/">Read the security model <ArrowRight size={14} /></a>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section className="section open-section" id="open-source">
      <div className="shell">
        <div className="open-heading">
          <Reveal>
            <p className="eyebrow">Open source by design</p>
            <h2>Enterprise control. Open foundations.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              ONEComputer is forked from ONECli and evolves as the business
              application over OpenVTC. The stack stays open at the trust
              boundary, while teams get a practical control plane for running
              their chosen agents securely in their own cloud.
            </p>
            <a className="inline-link" href={GITHUB} target="_blank" rel="noreferrer">
              Explore the organization <ArrowUpRight size={14} />
            </a>
            <a className="inline-link" href={DOCS}>
              Read the architecture docs <ArrowRight size={14} />
            </a>
          </Reveal>
        </div>

        <div className="repo-grid">
          {repositories.map((repo, index) => (
            <motion.a
              href={repo.href}
              target="_blank"
              rel="noreferrer"
              className="repo-card"
              key={repo.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5, borderColor: "rgba(25, 186, 93, .55)" }}
            >
              <span className="repo-top"><GitFork size={16} /> {repo.label}</span>
              <strong>{repo.name}</strong>
              <p>{repo.text}</p>
              <span className="repo-link">View repository <ArrowUpRight size={13} /></span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section cta-section">
      <motion.div
        className="shell cta-card"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="cta-signal"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
        <div>
          <p className="eyebrow">Build the governed path</p>
          <h2>Give teams their agents.<br />Keep the boundary human.</h2>
        </div>
        <div className="cta-actions">
          <motion.a className="button button-brand" href={GITHUB} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Github size={16} /> View on GitHub <ArrowUpRight size={14} />
          </motion.a>
          <motion.a className="button button-quiet" href={CLOUD} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            Open cloud demo <ArrowUpRight size={14} />
          </motion.a>
          <motion.a className="button button-quiet" href={DOCS} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            Read the docs <ArrowRight size={14} />
          </motion.a>
          <motion.a className="button button-quiet" href="/getting-started/" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            Get started <ArrowRight size={14} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="shell footer">
      <Logo />
      <span>Open-source governed AI computers · forked from ONECli</span>
      <a href="https://github.com/ONE-Computer" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
    </footer>
  );
}

function SubpageHero({ eyebrow, title, body, step, primaryHref = DOCS, primaryText = "Read the docs", secondaryHref = GITHUB, secondaryText = "View on GitHub" }) {
  return (
    <section className="subpage-hero">
      <div className="shell subpage-hero-grid">
        <Reveal className="subpage-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{body}</p>
          <div className="hero-actions">
            <motion.a className="button button-brand" href={primaryHref} target={primaryHref.startsWith("http") ? "_blank" : undefined} rel={primaryHref.startsWith("http") ? "noreferrer" : undefined} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              {primaryText} <ArrowRight size={15} />
            </motion.a>
            <motion.a className="button button-quiet" href={secondaryHref} target={secondaryHref.startsWith("http") ? "_blank" : undefined} rel={secondaryHref.startsWith("http") ? "noreferrer" : undefined} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              {secondaryText} <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </Reveal>
        <Reveal className="subpage-hero-capture" delay={0.12}>
          <ProductCapture step={step} hero />
        </Reveal>
      </div>
    </section>
  );
}

function ScreenshotGrid({ steps }) {
  return (
    <div className="subpage-screenshot-grid">
      {steps.map((step, index) => (
        <Reveal key={step.id} delay={index * 0.08}>
          <ProductCapture step={step} />
        </Reveal>
      ))}
    </div>
  );
}

function AgentsSubpage() {
  return (
    <>
      <SubpageHero
        eyebrow="Agent workspaces"
        title={<>A safe computer for <span><AgentRotator /></span>.</>}
        body="Give teams a governed place to run the agent they choose. ONEComputer standardizes the workspace, policy boundary, human approval, and evidence trail while the agent surface keeps evolving."
        step={productSteps[0]}
        primaryHref="#agent-surfaces"
        primaryText="Explore agent surfaces"
        secondaryHref={CLOUD}
        secondaryText="Open cloud console"
      />
      <section className="section subpage-section" id="agent-surfaces">
        <div className="shell">
          <AgentCoverage />
          <ScreenshotGrid steps={[productSteps[0], productSteps[1]]} />
        </div>
      </section>
    </>
  );
}

function SecuritySubpage() {
  return (
    <>
      <SubpageHero
        eyebrow="Security by separation"
        title={<>Let any agent move fast. <span>Keep authority outside the app.</span></>}
        body="ONEComputer owns the business workflow and runtime boundary. OpenVTC owns identity, wallet custody, Trust Tasks, and the signed decision. The browser can request approval; it cannot manufacture it."
        step={productSteps[3]}
        primaryHref={DOCS + "governance/approvals"}
        primaryText="Read the approval model"
        secondaryHref={CLOUD + "/approvals"}
        secondaryText="Open approvals"
      />
      <SecurityFlow />
      <section className="section subpage-section">
        <div className="shell">
          <Reveal className="section-intro narrow">
            <p className="eyebrow">Evidence in the product</p>
            <h2>Policy and approval are visible, testable, and separate.</h2>
          </Reveal>
          <ScreenshotGrid steps={[productSteps[2], productSteps[3]]} />
        </div>
      </section>
    </>
  );
}

function ArchitectureSubpage() {
  const layers = [
    ["Agent runtime", "Claude, NanoClaw, OpenClaw, Codex, Hermes Agent, or another agent works inside an isolated computer."],
    ["ONEComputer control plane", "The business layer owns users, policy, sandbox lifecycle, gateway holds, and evidence views."],
    ["OpenVTC trust plane", "Verified identity, Trust Tasks, external wallet custody, signed decisions, expiry, and replay protection."],
  ];

  return (
    <>
      <SubpageHero
        eyebrow="Architecture"
        title={<>A thin business layer over an <span>open trust plane.</span></>}
        body="ONEComputer is the enterprise control and enforcement edge. OpenVTC is the independent trust layer underneath. The boundary is explicit so the business app can move quickly without becoming its own root of trust."
        step={productSteps[1]}
        primaryHref={DOCS + "architecture/"}
        primaryText="Read the architecture docs"
        secondaryHref="https://github.com/OpenVTC/wiki"
        secondaryText="Open OpenVTC wiki"
      />
      <section className="section subpage-section">
        <div className="shell">
          <Reveal className="section-intro narrow">
            <p className="eyebrow">Three layers, one operating model</p>
            <h2>Work in the computer. Govern in the control plane. Prove in the trust plane.</h2>
          </Reveal>
          <div className="architecture-layers">
            {layers.map(([name, text], index) => (
              <Reveal className="architecture-layer" delay={index * 0.08} key={name}>
                <span className="architecture-layer-number">0{index + 1}</span>
                <div><h3>{name}</h3><p>{text}</p></div>
              </Reveal>
            ))}
          </div>
          <ScreenshotGrid steps={[productSteps[1], productSteps[0]]} />
        </div>
      </section>
    </>
  );
}

function OpenSourceSubpage() {
  return (
    <>
      <SubpageHero
        eyebrow="Open source by design"
        title={<>Enterprise control. <span>Open foundations.</span></>}
        body="ONEComputer is forked from ONECli and evolves as the business application over OpenVTC. Explore the repositories, understand the runtime boundary, and build the governed path with us."
        step={productSteps[1]}
        primaryHref={GITHUB}
        primaryText="Explore GitHub"
        secondaryHref={DOCS}
        secondaryText="Read the docs"
      />
      <OpenSource />
      <section className="section subpage-section">
        <div className="shell">
          <div className="resource-banner">
            <div><p className="eyebrow">Build with the source</p><h2>Fork the app. Keep the trust boundary explicit.</h2></div>
            <div className="cta-actions resource-actions">
              <motion.a className="button button-brand" href={GITHUB} target="_blank" rel="noreferrer" whileHover={{ y: -2 }}>View ONEComputer <ArrowUpRight size={14} /></motion.a>
              <motion.a className="button button-quiet" href={DOCS + "reference/repository-map"} whileHover={{ y: -2 }}>Repository map <ArrowRight size={14} /></motion.a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GettingStartedSubpage() {
  return (
    <>
      <SubpageHero
        eyebrow="Getting started"
        title={<>From first install to your first <span>governed workspace.</span></>}
        body="The open-source setup path gets a contributor from a clean machine to the local web/API, Rust gateway, PostgreSQL, and documentation in a few commands."
        step={productSteps[0]}
        primaryHref={DOCS + "getting-started/installation"}
        primaryText="Open installation guide"
        secondaryHref="https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh"
        secondaryText="View install script"
      />
      <section className="section subpage-section">
        <div className="shell">
          <div className="install-layout">
            <Reveal className="install-card">
              <p className="eyebrow">One-line install</p>
              <h2>Start with the OSS path.</h2>
              <pre><code>{"curl -fsSL https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh | sh"}</code></pre>
              <p>Review the script first for sensitive environments. It is designed to be rerunnable, preserves existing `.env` and Docker volumes, and never uploads credentials.</p>
              <a className="inline-link" href={DOCS + "getting-started/installation"}>See prerequisites and options <ArrowRight size={14} /></a>
            </Reveal>
            <Reveal className="install-checklist" delay={0.12}>
              <p className="eyebrow">What happens next</p>
              {[
                "Clone or reuse the ONEComputer checkout",
                "Install locked dependencies and generate Prisma",
                "Start PostgreSQL and apply migrations",
                "Run the portal and Rust gateway locally",
              ].map((item) => <span key={item}><Check size={15} /> {item}</span>)}
            </Reveal>
          </div>
          <ScreenshotGrid steps={[productSteps[0], productSteps[2]]} />
        </div>
      </section>
    </>
  );
}

function OpenVtcSubpage() {
  const concepts = [
    ["Identity", "A verifiable answer to: who is this person, wallet, or service?"],
    ["Trust Task", "A structured request that says what decision is needed, for which exact action, and until when."],
    ["Wallet", "The separate place that holds the private key and lets an authorized person sign."],
    ["Proof", "The signed response that ONEComputer verifies before it releases the held action."],
  ];

  return (
    <>
      <SubpageHero
        eyebrow="OpenVTC for humans"
        title={<>What is <span>OpenVTC?</span></>}
        body="OpenVTC is the trust layer underneath ONEComputer. In plain language: it helps software prove who is acting, ask the right person for a decision, and verify that the decision is authentic before anything consequential is released."
        step={productSteps[3]}
        primaryHref={DOCS + "architecture/openvtc-boundary"}
        primaryText="Read the trust boundary"
        secondaryHref="https://github.com/OpenVTC/wiki"
        secondaryText="Explore the OpenVTC wiki"
      />
      <section className="section subpage-section">
        <div className="shell">
          <Reveal className="section-intro narrow">
            <p className="eyebrow">The simple version</p>
            <h2>It is the part that proves the decision.</h2>
            <p>ONEComputer can run the work and pause an action. OpenVTC keeps the identity, key custody, and signed approval outside the business app.</p>
          </Reveal>
          <div className="concept-grid">
            {concepts.map(([name, text], index) => (
              <Reveal className="concept-card" delay={index * 0.08} key={name}>
                <span>0{index + 1}</span><h3>{name}</h3><p>{text}</p>
              </Reveal>
            ))}
          </div>
          <div className="trust-explainer-flow">
            {["Agent asks", "ONEComputer holds", "OpenVTC delivers", "Wallet signs", "ONEComputer verifies"].map((label, index) => (
              <motion.div className="trust-explainer-node" key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.08 }}>
                <b>{label}</b><small>{index === 0 ? "consequential action" : index === 1 ? "stable digest" : index === 2 ? "Trust Task" : index === 3 ? "external key" : "release once"}</small>
              </motion.div>
            ))}
          </div>
          <ScreenshotGrid steps={[productSteps[3], productSteps[1]]} />
        </div>
      </section>
    </>
  );
}

function Subpage({ page }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const content = {
    agents: <AgentsSubpage />,
    security: <SecuritySubpage />,
    architecture: <ArchitectureSubpage />,
    "open-source": <OpenSourceSubpage />,
    "getting-started": <GettingStartedSubpage />,
    openvtc: <OpenVtcSubpage />,
  }[page] || <GettingStartedSubpage />;

  return (
    <div className="app-shell subpage-shell">
      <Nav progress={progress} page={page} />
      <main>{content}</main>
      <SiteFooter />
    </div>
  );
}

export default function App({ page = "home" }) {
  if (page !== "home") return <Subpage page={page} />;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <div className="app-shell">
      <Nav progress={progress} />
      <main>
        <Hero />
        <ProductTour />
        <AgentCoverage />
        <EnterpriseStory />
        <SecurityFlow />
        <OpenSource />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
