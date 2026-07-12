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
  BellRing,
  BadgeCheck,
  Building2,
  Check,
  CircleCheck,
  Cpu,
  Database,
  FileCheck2,
  Fingerprint,
  Github,
  GitFork,
  KeyRound,
  Layers3,
  LockKeyhole,
  Monitor,
  Network,
  PlugZap,
  ScanLine,
  Send,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";

const GITHUB = "https://github.com/ONE-Computer/onecomputer";
const CLOUD = "https://onecomputer-openvtc.eastus2.cloudapp.azure.com";
const DOCS = "/docs/";

const agentOptions = [
  { id: "claude", name: "Claude", mark: "C", kind: "Desktop · Code", command: "claude", badges: ["Claude Desktop", "Claude Code"], accent: "#d9946d", href: "https://claude.com/download" },
  { id: "nanoclaw", name: "NanoClaw", mark: "N", kind: "Container-native", command: "nanoclaw", badges: ["NanoClaw runtime", "Container-native"], accent: "#d3b75e", href: "https://github.com/qwibitai/nanoclaw" },
  { id: "openclaw", name: "OpenClaw", mark: "O", kind: "Open agent platform", command: "openclaw gateway", badges: ["OpenClaw gateway", "Channel bridge"], accent: "#c976e4", href: "https://github.com/openclaw/openclaw" },
  { id: "codex", name: "Codex", mark: "X", kind: "Coding agent", command: "codex", badges: ["Codex workspace", "Terminal agent"], accent: "#8bd8b0", href: "https://openai.com/codex/" },
  { id: "hermes", name: "Hermes Agent", mark: "H", kind: "Open · extensible", command: "hermes", badges: ["Hermes Agent", "Tool runtime"], accent: "#8fb6ed", href: "https://github.com/NousResearch/hermes-agent" },
];

const productSteps = [
  {
    id: "workspace",
    eyebrow: "01 · Work",
    title: "Give every employee a ready-to-use computer for AI work.",
    body: "Open a private cloud desktop with Claude Desktop and Claude Code already available. People can begin working without installing agents or exposing their own machine.",
    image: "/screenshots/claude-desktop-sandbox.png",
    alt: "Remote Ubuntu cloud workspace with Claude Desktop and Claude Code Terminal available",
    kind: "workspace",
    icon: Monitor,
  },
  {
    id: "control",
    eyebrow: "02 · See",
    title: "See where agents are running—and what they can reach.",
    body: "IT and security teams can see active workspaces, connected agents, errors, and policy status without opening an employee's workspace.",
    image: "/screenshots/ciso-console.png",
    alt: "ONEComputer CISO Console showing sandbox and agent fleet status",
    kind: "ciso",
    icon: ScanLine,
  },
  {
    id: "policy",
    eyebrow: "03 · Guide",
    title: "Set clear rules before the work begins.",
    body: "Company policy decides which data, tools, and destinations are allowed, blocked, or sent to a person for review. Teams can make those rules stricter, but not weaker.",
    image: "/screenshots/default-policy.png",
    alt: "ONEComputer company default policy screen",
    kind: "policy",
    icon: SlidersHorizontal,
  },
  {
    id: "approve",
    eyebrow: "04 · Decide",
    title: "Keep important decisions with people.",
    body: "When an action needs approval, ONEComputer pauses it. A manager reviews the exact request in a separate OpenVTC wallet, and only that signed decision can release it.",
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
    text: "The application for people, policy, cloud workspaces, and agent access.",
    href: GITHUB,
  },
  {
    label: "Trust infrastructure",
    name: "verifiable-trust-infrastructure",
    text: "The open infrastructure for identity, secure requests, and signed decisions.",
    href: "https://github.com/ONE-Computer/verifiable-trust-infrastructure",
  },
  {
    label: "Wallet",
    name: "vta-mobile-agent-ios",
    text: "A separate mobile wallet that keeps a person's key and signs their decision.",
    href: "https://github.com/ONE-Computer/vta-mobile-agent-ios",
  },
  {
    label: "Protocol docs",
    name: "OpenVTC wiki",
    text: "The concepts, standards, and projects behind the OpenVTC ecosystem.",
    href: "https://github.com/OpenVTC/wiki",
  },
];

const flowNodes = [
  { label: "Company policy", detail: "Set the rules", icon: SlidersHorizontal },
  { label: "Private workspace", detail: "Let the agent work", icon: Cpu },
  { label: "A careful pause", detail: "Hold what matters", icon: LockKeyhole },
  { label: "Manager wallet", detail: "Review separately", icon: WalletCards },
  { label: "Verified decision", detail: "Release only once", icon: BadgeCheck },
];

const enterpriseJourneySteps = [
  { role: "Company admin", title: "Create the company workspace", detail: "Connect the organization, choose its owners, and give teams one place to launch secure AI workspaces.", icon: Building2 },
  { role: "Company admin", title: "Set the rules everyone inherits", detail: "Decide which data, tools, networks, and actions are acceptable across the company.", icon: SlidersHorizontal },
  { role: "Manager", title: "Tailor the rules for the team", detail: "Add tighter controls for the team's repositories, customer data, connectors, and higher-risk work.", icon: UsersRound },
  { role: "Employee", title: "Open a private sandbox", detail: "Launch a cloud computer with the approved agent, tools, and company rules already in place.", icon: UserRound },
  { role: "Agent", title: "Do useful work", detail: "Claude, OpenClaw, Codex, or another agent can use approved tools without gaining access to the wider enterprise.", icon: Cpu },
  { role: "ONEComputer", title: "Pause what needs a person", detail: "If an action crosses policy, ONEComputer holds the exact request and asks the right manager to decide.", icon: LockKeyhole },
  { role: "Manager", title: "Review it on a separate device", detail: "The manager sees what the agent wants to do, why it was held, and signs approval or denial in their wallet.", icon: Smartphone },
  { role: "ONEComputer", title: "Release only what was approved", detail: "ONEComputer checks the signer and the exact request, then releases it once—or keeps it blocked.", icon: BadgeCheck },
];

const enterpriseIntegrations = [
  { name: "Microsoft Purview DLP", label: "Protect sensitive data", text: "Use the classifications and data-movement rules your security team already maintains.", icon: Database },
  { name: "Microsoft Intune", label: "Check device health", text: "Bring managed-device and compliance signals into decisions about workspace access.", icon: Smartphone },
  { name: "SIEM · OpenTelemetry", label: "See what happened", text: "Send policy decisions, held actions, approvals, and workspace events to your monitoring tools.", icon: ScanLine },
  { name: "EDR · network controls", label: "Respond with context", text: "Use endpoint risk and network policy without tying your security program to one AI agent.", icon: PlugZap },
];

const approvalScenarios = [
  {
    id: "customer-report",
    label: "Share customer data",
    agent: "Claude Code",
    title: "Export customer report",
    action: "Send customer-report.csv to an external collaboration workspace.",
    walletBody: "Claude Code wants to send a sensitive file outside the company workspace.",
    requestedBy: "Research team workspace",
    policy: "A manager must approve",
    policyDetail: "Customer data cannot leave the company without a manager's decision.",
    destination: "external.collab",
    digest: "8F2A…9C11",
    icon: Database,
  },
  {
    id: "production-change",
    label: "Change production",
    agent: "Codex",
    title: "Update production workflow",
    action: "Modify the deployment workflow used by the production environment.",
    walletBody: "Codex wants to change a workflow that can deploy code to production.",
    requestedBy: "Platform team workspace",
    policy: "Engineering lead approval",
    policyDetail: "Production changes require an engineering lead to review the exact update.",
    destination: "github.com/company/app",
    digest: "2C41…A77B",
    icon: GitFork,
  },
  {
    id: "private-repository",
    label: "Connect private code",
    agent: "OpenClaw",
    title: "Connect private repository",
    action: "Give a new agent access to a private source-code repository.",
    walletBody: "OpenClaw wants access to private company code for the first time.",
    requestedBy: "Operations workspace",
    policy: "Repository owner approval",
    policyDetail: "A repository owner must approve new agent access to private code.",
    destination: "private repository",
    digest: "71DD…3B04",
    icon: PlugZap,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function useAgentCycle(interval = 4200, paused = false) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion || paused) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % agentOptions.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [active, interval, paused, reduceMotion]);

  return { active, setActive, agent: agentOptions[active] };
}

function AgentName({ agent, compact = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={`agent-rotator ${compact ? "agent-rotator-compact" : ""}`} aria-live="polite">
      <AnimatePresence initial={false}>
        <motion.span
          key={agent.id}
          initial={{ opacity: 0, y: 12, filter: "blur(7px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(7px)" }}
          transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {agent.name}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AgentRotator({ compact = false }) {
  const { agent } = useAgentCycle(3200);

  return (
    <AgentName agent={agent} compact={compact} />
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

function ProductCapture({ step, hero = false, agent = null }) {
  const workspaceBadges = agent?.badges || ["Claude Desktop", "Claude Code"];

  return (
    <motion.div
      className={`capture capture-${step.kind} ${hero ? "capture-hero" : ""}`}
      style={agent ? { "--agent-accent": agent.accent } : undefined}
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
          <AnimatePresence initial={false}>
            <motion.div
              className="workspace-badges"
              key={agent?.id || "claude"}
              aria-hidden="true"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.32 }}
            >
              <span><Monitor size={13} /> {workspaceBadges[0]}</span>
              <span><Cpu size={13} /> {workspaceBadges[1]}</span>
              <span className="workspace-badge-live"><i /> Isolated sandbox</span>
            </motion.div>
          </AnimatePresence>
        )}
        {hero && agent && (
          <AnimatePresence initial={false}>
            <motion.div
              className="agent-runtime-layer"
              key={agent.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
            >
              <div className="agent-visual-tint" />
              <motion.div
                className="agent-runtime-card"
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="agent-runtime-top">
                  <span className="agent-runtime-mark">{agent.mark}</span>
                  <span className="agent-runtime-title"><small>Connected agent</small><strong>{agent.name}</strong></span>
                  <span className="agent-runtime-ready"><i /> Ready</span>
                </div>
                <div className="agent-runtime-command"><small>$ onecomputer agent attach</small><code>{agent.command}</code></div>
                <div className="agent-runtime-foot">
                  <span><ShieldCheck size={12} /> Policy-bound</span>
                  <span><LockKeyhole size={12} /> Isolated</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
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
              <span className="redaction approval-r2">Export customer report</span>
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
  const [rotationPaused, setRotationPaused] = useState(false);
  const { active: activeAgentIndex, setActive: setActiveAgentIndex, agent: activeAgent } = useAgentCycle(4400, rotationPaused);
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
            <span className="live-dot" /> Open source · built from ONECli
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-headline-static">A safe computer</span>
            <span className="hero-agent-line">
              <span className="hero-headline-for">for</span>
              <span className="hero-agent-stage" style={{ "--agent-accent": activeAgent.accent }}><AgentName agent={activeAgent} /></span>
            </span>
          </motion.h1>
          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
          >
            AI agents are most useful when they can work with files, tools, and
            the web. ONEComputer gives each employee an isolated cloud workspace
            where agents can do real work, while company policy and human
            approval stay in control.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <motion.a
              className="button button-brand"
              href="#approval-demo"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Try a signed approval <ArrowDown size={15} />
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
          onMouseEnter={() => setRotationPaused(true)}
          onMouseLeave={() => setRotationPaused(false)}
          onFocusCapture={() => setRotationPaused(true)}
          onBlurCapture={() => setRotationPaused(false)}
          style={{ y: visualY, scale: visualScale }}
          initial={{ opacity: 0, y: 45, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProductCapture step={productSteps[0]} hero agent={activeAgent} />
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
          <div className="hero-agent-dock" aria-label="Choose an agent runtime">
            <span className="hero-agent-dock-label">Runtime</span>
            {agentOptions.map((agent, index) => (
              <motion.button
                type="button"
                key={agent.id}
                className={index === activeAgentIndex ? "is-active" : ""}
                style={{ "--agent-accent": agent.accent }}
                aria-label={`Show ${agent.name} workspace`}
                aria-pressed={index === activeAgentIndex}
                title={agent.name}
                onClick={() => setActiveAgentIndex(index)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                <span>{agent.mark}</span>
                <small>{agent.name}</small>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="shell trust-strip" aria-label="ONEComputer capabilities">
        <span><Server size={15} /> Isolated workspaces</span>
        <span><ShieldCheck size={15} /> Company-wide policy</span>
        <span><WalletCards size={15} /> Approvals outside the app</span>
        <span><FileCheck2 size={15} /> A clear audit trail</span>
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
          <p className="eyebrow">Built and running on Azure</p>
          <h2>One place to give every team a safe workspace.</h2>
          <p>
            The screens below come from the working product. We use Claude in
            the example workspace, but the same approach is designed for
            OpenClaw, Codex, Hermes Agent, and the tools teams choose next.
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
              <span><span className="live-dot" /> From the current cloud build</span>
              <a href={`${CLOUD}/${activeStep.id === "workspace" || activeStep.id === "control" ? "console" : activeStep.id === "policy" ? "settings/policy" : "approvals"}`} target="_blank" rel="noreferrer">
                Open this view <ArrowUpRight size={13} />
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
          <p className="eyebrow">Choose the agent that fits the work</p>
          <h2>Your security model should outlast your agent stack.</h2>
          <p>
            Different teams will choose different agents—and those choices will
            change. ONEComputer gives them a consistent place to work, with the
            same company rules and approval process around each one.
          </p>
        </Reveal>

        <div className="agent-command">
          <Reveal className="agent-command-visual">
            <div className="agent-command-grid" aria-hidden="true" />
            <span className="agent-command-orbit agent-command-orbit-one" />
            <span className="agent-command-orbit agent-command-orbit-two" />
            <span className="agent-command-status"><i /> Workspace protected</span>
            <span className="agent-command-label">Safe place for</span>
            <div className="agent-command-name"><AgentRotator /></div>
            <span className="agent-command-caption">one workspace · one set of rules · one audit trail</span>
          </Reveal>
          <Reveal className="agent-command-copy" delay={0.12}>
            <p className="eyebrow">Built to stay open</p>
            <h3>Change the agent, not your security architecture.</h3>
            <p>
              Your teams can adopt a new agent without starting security review
              from zero. The workspace, company policy, human approvals, and
              evidence stay familiar.
            </p>
            <div className="agent-command-points">
              <span><Check size={14} /> An isolated computer for each user</span>
              <span><Check size={14} /> Rules that follow the work</span>
              <span><Check size={14} /> Human approval for sensitive actions</span>
            </div>
            <a className="inline-link" href="/agents/">See supported agents <ArrowRight size={14} /></a>
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
              <span><Monitor size={12} /> Claude Desktop · company rules applied</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="enterprise-copy" delay={0.12}>
          <p className="eyebrow">Bring agents to work responsibly</p>
          <h2>Give people room to explore. Give security the controls it needs.</h2>
          <p>
            ONEComputer gives each employee a private computer where AI can
            work with files, tools, and context. Admins set the company rules,
            managers can make them stricter, and employees can focus on the
            work instead of configuring infrastructure.
          </p>
          <div className="enterprise-points">
            <div><span><Server size={16} /></span><p><b>Ready when people need it</b><small>Launch an isolated workspace without setting up a local machine.</small></p></div>
            <div><span><ShieldCheck size={16} /></span><p><b>Clear rules at every level</b><small>Company policy applies everywhere; managers can add stricter controls for their team.</small></p></div>
            <div><span><FileCheck2 size={16} /></span><p><b>A record people can understand</b><small>See why work was held, who approved it, and what happened next.</small></p></div>
          </div>
          <a className="inline-link" href="#security">Follow the employee journey <ArrowRight size={14} /></a>
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
          <p className="eyebrow">Keep consequential decisions human</p>
          <h2>Agents can move quickly without holding the keys.</h2>
          <p>
            ONEComputer runs the workspace and applies company rules. When an
            action needs a person, it pauses the request and sends it to a
            separate OpenVTC wallet. The manager's signed decision—not a button
            in the portal—determines what happens next.
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
            <p className="eyebrow">What ONEComputer does</p>
            <h3>Creates a safe place to work.</h3>
            <p>It manages people, policy, cloud workspaces, connected agents, and the moments where work must pause.</p>
            <ul>
              <li><Check size={14} /> Company and team workflow</li>
              <li><Check size={14} /> Rules enforced at the workspace</li>
              <li><Check size={14} /> Requests stay held until resolved</li>
            </ul>
          </Reveal>
          <Reveal className="boundary-card boundary-card-trust" delay={0.12}>
            <span className="boundary-icon"><Network size={20} /></span>
            <p className="eyebrow">What OpenVTC does</p>
            <h3>Makes the decision independently verifiable.</h3>
            <p>It connects the request to a known person, keeps their signing key elsewhere, and returns proof tied to that exact action.</p>
            <ul>
              <li><Check size={14} /> A separate wallet</li>
              <li><Check size={14} /> A signed request and response</li>
              <li><Check size={14} /> Protection against reuse</li>
            </ul>
          </Reveal>
        </div>
        <a className="inline-link flow-link" href="/security/">See how approvals work <ArrowRight size={14} /></a>
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
            <p className="eyebrow">Open source, from workspace to wallet</p>
            <h2>Inspect it. Run it. Help shape it.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              ONEComputer began as a fork of ONECli and is being built in the
              open as the workplace layer over OpenVTC. You can follow the code
              from the employee workspace to the policy gateway and the
              external wallet—and run the stack in your own cloud.
            </p>
            <a className="inline-link" href={GITHUB} target="_blank" rel="noreferrer">
              Explore the code <ArrowUpRight size={14} />
            </a>
            <a className="inline-link" href={DOCS}>
              Read how the pieces fit <ArrowRight size={14} />
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
              <span className="repo-link">Open repository <ArrowUpRight size={13} /></span>
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
          <p className="eyebrow">A practical path to agentic work</p>
          <h2>Let teams move faster—<br />with limits everyone can understand.</h2>
        </div>
        <div className="cta-actions">
          <motion.a className="button button-brand" href={GITHUB} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Github size={16} /> Explore on GitHub <ArrowUpRight size={14} />
          </motion.a>
          <motion.a className="button button-quiet" href={CLOUD} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            Try the cloud build <ArrowUpRight size={14} />
          </motion.a>
          <motion.a className="button button-quiet" href={DOCS} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            Read the docs <ArrowRight size={14} />
          </motion.a>
          <motion.a className="button button-quiet" href="/getting-started/" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            Install locally <ArrowRight size={14} />
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
      <span>Open-source workspaces for safer agentic work · built from ONECli</span>
      <a href="https://github.com/ONE-Computer" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
    </footer>
  );
}

function SubpageHero({ eyebrow, title, body, step, visual = null, primaryHref = DOCS, primaryText = "Read the docs", secondaryHref = GITHUB, secondaryText = "View on GitHub" }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="subpage-hero">
      <motion.div
        className="subpage-hero-signal"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
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
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {visual || <ProductCapture step={step} hero />}
          </motion.div>
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

function TrustFoundationVisual() {
  const reduceMotion = useReducedMotion();
  const nodes = [
    { label: "Agent request", detail: "What it wants to do", icon: Cpu },
    { label: "OpenVTC / VTI", detail: "Carries and checks", icon: Network },
    { label: "Manager wallet", detail: "Makes the decision", icon: Smartphone },
  ];

  return (
    <div className="trust-foundation-visual" aria-label="OpenVTC trust foundation diagram">
      <div className="trust-foundation-grid" aria-hidden="true" />
      <motion.div
        className="trust-foundation-orbit trust-foundation-orbit-one"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="trust-foundation-orbit trust-foundation-orbit-two"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <div className="trust-foundation-nodes">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              className={`trust-foundation-node ${index === 1 ? "is-core" : ""}`}
              key={node.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + index * 0.12 }}
            >
              <span><Icon size={17} /></span>
              <b>{node.label}</b>
              <small>{node.detail}</small>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        className="trust-foundation-packet"
        animate={reduceMotion ? undefined : { left: ["8%", "48%", "88%", "48%", "8%"], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="trust-foundation-proof"><Fingerprint size={16} /><span><small>Decision verified</small><b>Person · request · expiry · signature</b></span></div>
    </div>
  );
}

function AgentSecurityPrimer() {
  const risks = [
    ["Agents can take an unexpected path", "An agent chooses how to pursue a goal. Even with good intent, it can do something the user did not expect."],
    ["Anything an agent reads can influence it", "A document, website, message, or tool result can contain instructions designed to redirect the agent."],
    ["More access means more can go wrong", "Every file, credential, system, and network destination increases the consequences of a mistake or compromise."],
  ];

  const layers = [
    ["Limit what the workspace can reach", "ONEComputer separates each agent from the employee's device and from systems the work does not need."],
    ["Turn company expectations into clear rules", "Admins decide what is allowed, blocked, recorded, or sent to a person before work begins."],
    ["Ask people to confirm the moments that matter", "OpenVTC keeps the final decision and signing key outside the application requesting permission."],
  ];

  return (
    <section className="section openvtc-primer" id="openvtc-foundation">
      <div className="shell">
        <Reveal className="section-intro openvtc-intro">
          <p className="eyebrow">Start with the security problem</p>
          <h2>A safe model still needs a safe place to work.</h2>
          <p>Models matter, but an agent's tools, data, and environment determine what it can actually do. We designed ONEComputer around a simple question: how can people benefit from capable agents without giving them more access than the work requires?</p>
        </Reveal>

        <div className="security-primer-grid">
          <Reveal className="security-primer-column">
            <p className="security-primer-kicker"><BellRing size={15} /> Why agents need a different approach</p>
            {risks.map(([title, text], index) => (
              <motion.div className="security-primer-card is-risk" key={title} whileHover={{ x: 5 }} transition={{ duration: 0.18 }}>
                <span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div>
              </motion.div>
            ))}
          </Reveal>
          <Reveal className="security-primer-equation" delay={0.08}>
            <p className="eyebrow">A layered approach</p>
            <div className="security-equation-row"><span><Server size={17} /> A safe place to work</span><i>+</i></div>
            <div className="security-equation-row"><span><SlidersHorizontal size={17} /> Clear company rules</span><i>+</i></div>
            <div className="security-equation-row"><span><Fingerprint size={17} /> A human decision you can verify</span><i>=</i></div>
            <div className="security-equation-result"><ShieldCheck size={21} /><b>AI people can use<br />with confidence</b></div>
          </Reveal>
          <Reveal className="security-primer-column" delay={0.16}>
            <p className="security-primer-kicker"><ShieldCheck size={15} /> How ONEComputer responds</p>
            {layers.map(([title, text], index) => (
              <motion.div className="security-primer-card is-control" key={title} whileHover={{ x: -5 }} transition={{ duration: 0.18 }}>
                <span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div>
              </motion.div>
            ))}
          </Reveal>
        </div>

        <div className="openvtc-definition">
          <Reveal>
            <p className="eyebrow">Where OpenVTC fits</p>
            <h2>OpenVTC gives important decisions a source you can verify.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>OpenVTC is an open ecosystem for digital identity and trust. VTI carries secure requests and checks signed responses. A VTA wallet keeps the person's private key on a separate device.</p>
            <p>Together, they let ONEComputer ask for approval without being able to approve its own request.</p>
            <div className="openvtc-terms">
              <span><b>OpenVTC</b><small>The open trust ecosystem</small></span>
              <span><b>VTI</b><small>The services that carry and verify trust</small></span>
              <span><b>VTA wallet</b><small>The app that keeps a person's key</small></span>
            </div>
          </Reveal>
        </div>

        <div className="security-reading">
          <span>Further reading</span>
          <a href="https://www.anthropic.com/research/trustworthy-agents" target="_blank" rel="noreferrer">Anthropic · Trustworthy agents <ArrowUpRight size={13} /></a>
          <a href="https://www.anthropic.com/engineering/how-we-contain-claude" target="_blank" rel="noreferrer">Anthropic · Containing agents <ArrowUpRight size={13} /></a>
          <a href="https://github.com/OpenVTC/wiki" target="_blank" rel="noreferrer">OpenVTC ecosystem wiki <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </section>
  );
}

function VtiWalletMock({ available, decision, onApprove, onDeny, onReset, request = approvalScenarios[0] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="wallet-demo-wrap">
      <div className="wallet-demo-label"><span><i /> Interactive wallet example</span><small>Separate device · separate key</small></div>
      <motion.div className="wallet-phone" animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="wallet-phone-status"><span>9:41</span><span>● ● ●</span></div>
        <div className="wallet-phone-header"><span><Fingerprint size={16} /></span><div><b>VTI Wallet</b><small>Manager identity ready</small></div><CircleCheck size={16} /></div>
        <AnimatePresence mode="wait">
          {!available && decision === "pending" ? (
            <motion.div className="wallet-idle" key="idle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <motion.span animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }}><Fingerprint size={27} /></motion.span>
              <p className="eyebrow">Ready when needed</p>
              <h3>Nothing needs your attention</h3>
              <p>When ONEComputer needs your decision, the wallet retrieves the signed request through its secure connection. A notification only tells the app to check.</p>
              <div className="wallet-idle-status"><i /><span><small>Secure connection</small><b>Listening</b></span></div>
            </motion.div>
          ) : decision === "pending" ? (
            <motion.div className="wallet-request" key="pending" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="wallet-request-icon"><BellRing size={20} /></div>
              <p className="eyebrow">ONEComputer needs a decision</p>
              <h3>{request.title}</h3>
              <p>{request.walletBody}</p>
              <div className="wallet-request-facts">
                <span><small>Requested by</small><b>{request.requestedBy}</b></span>
                <span><small>Policy</small><b>{request.policy}</b></span>
                <span><small>Task digest</small><code>{request.digest}</code></span>
                <span><small>Expires</small><b>4 minutes</b></span>
              </div>
              <div className="wallet-actions">
                <motion.button type="button" className="wallet-deny" onClick={onDeny} whileTap={{ scale: 0.97 }}><X size={15} /> Deny</motion.button>
                <motion.button type="button" className="wallet-approve" onClick={onApprove} whileTap={{ scale: 0.97 }}><Check size={15} /> Approve</motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div className={`wallet-result is-${decision}`} key={decision} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <motion.span initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220 }}>
                {decision === "approved" ? <BadgeCheck size={30} /> : <X size={30} />}
              </motion.span>
              <p className="eyebrow">Decision signed</p>
              <h3>{decision === "approved" ? "Approval signed" : "Request denied"}</h3>
              <p>The wallet signed this exact request. ONEComputer can verify the decision, but it cannot change it.</p>
              <div className="wallet-signature"><KeyRound size={14} /><code>did:webvh:manager • ed25519</code></div>
              <button type="button" className="wallet-reset" onClick={onReset}>Try another decision</button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="wallet-home-indicator" />
      </motion.div>
    </div>
  );
}

function HomeApprovalDemo() {
  const reduceMotion = useReducedMotion();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [decision, setDecision] = useState("pending");
  const request = approvalScenarios[scenarioIndex];
  const RequestIcon = request.icon;

  const chooseScenario = (index) => {
    setScenarioIndex(index);
    setDecision("pending");
  };

  const outcome = decision === "approved"
    ? "Approval verified · this action may continue once"
    : decision === "denied"
      ? "Denial verified · this action remains blocked"
      : "Action paused · waiting for the manager";

  return (
    <section className="section home-approval" id="approval-demo">
      <div className="home-approval-glow" aria-hidden="true" />
      <div className="shell">
        <Reveal className="section-intro home-approval-intro">
          <p className="eyebrow">Try the approval path</p>
          <h2>A sensitive action should never approve itself.</h2>
          <p>Choose something an agent wants to do, then make the decision in the separate VTI wallet. ONEComputer can pause the request and verify the answer—but it cannot create the answer.</p>
        </Reveal>

        <div className="approval-scenarios" role="group" aria-label="Choose an approval example">
          {approvalScenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            const selected = index === scenarioIndex;
            return (
              <motion.button
                type="button"
                className={selected ? "is-active" : ""}
                key={scenario.id}
                aria-pressed={selected}
                onClick={() => chooseScenario(index)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span><Icon size={15} /></span>
                <small>Example {String(index + 1).padStart(2, "0")}</small>
                <b>{scenario.label}</b>
              </motion.button>
            );
          })}
        </div>

        <div className={`approval-playground is-${decision}`}>
          <div className="approval-request-panel">
            <div className="approval-panel-top">
              <span><i /> ONEComputer workspace</span>
              <small>{request.agent} · isolated</small>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className="approval-request-copy"
                key={request.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span className="approval-request-icon"><RequestIcon size={20} /></span>
                <p className="eyebrow">Agent request</p>
                <h3>{request.title}</h3>
                <p>{request.action}</p>
                <div className="approval-request-details">
                  <span><small>Destination</small><b>{request.destination}</b></span>
                  <span><small>Request digest</small><code>{request.digest}</code></span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="approval-policy-trigger">
              <ShieldCheck size={17} />
              <span><small>Why ONEComputer paused it</small><b>{request.policyDetail}</b></span>
            </div>

            <div className="approval-event-list" aria-label="Approval verification progress">
              <span className="is-complete"><i><Check size={11} /></i><b>Request detected</b><small>{request.agent}</small></span>
              <span className="is-complete"><i><LockKeyhole size={11} /></i><b>Action paused</b><small>Policy applied</small></span>
              <span className="is-complete"><i><Send size={11} /></i><b>Sent to wallet</b><small>Encrypted</small></span>
              <span className={decision !== "pending" ? "is-complete" : ""}><i>{decision !== "pending" ? <Check size={11} /> : <span />}</i><b>Decision verified</b><small>{decision === "pending" ? "Waiting" : "Signed"}</small></span>
            </div>

            <motion.div
              className="approval-outcome"
              aria-live="polite"
              key={`${request.id}-${decision}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>{decision === "approved" ? <BadgeCheck size={18} /> : decision === "denied" ? <X size={18} /> : <BellRing size={18} />}</span>
              <div><small>ONEComputer status</small><b>{outcome}</b></div>
            </motion.div>
          </div>

          <div className="approval-secure-link" aria-hidden="true">
            <motion.span
              animate={reduceMotion ? undefined : { x: ["-42%", "42%", "-42%"] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div><Fingerprint size={15} /><b>OpenVTC</b><small>Secure request · signed response</small></div>
          </div>

          <div className="approval-wallet-column">
            <div className="approval-instruction"><Smartphone size={15} /><span><b>Your turn</b><small>Approve or deny in the wallet</small></span><ArrowRight size={14} /></div>
            <VtiWalletMock
              available
              decision={decision}
              request={request}
              onApprove={() => setDecision("approved")}
              onDeny={() => setDecision("denied")}
              onReset={() => setDecision("pending")}
            />
          </div>
        </div>

        <div className="approval-principles">
          <span><b>01</b><small>ONEComputer pauses the exact action</small></span>
          <span><b>02</b><small>The manager decides on a separate device</small></span>
          <span><b>03</b><small>The signed answer works for this request only</small></span>
          <a href="/openvtc/">Understand OpenVTC <ArrowRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

function EnterpriseJourney({ id = "journey" }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [decision, setDecision] = useState("pending");

  useEffect(() => {
    if (reduceMotion || paused || decision !== "pending" || active >= 6) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % enterpriseJourneySteps.length), 3600);
    return () => window.clearInterval(timer);
  }, [active, decision, paused, reduceMotion]);

  const step = enterpriseJourneySteps[active];
  const StepIcon = step.icon;
  const approve = () => { setDecision("approved"); setActive(7); setPaused(true); };
  const deny = () => { setDecision("denied"); setActive(6); setPaused(true); };
  const reset = () => { setDecision("pending"); setActive(5); setPaused(false); };

  return (
    <section className="section enterprise-journey" id={id}>
      <div className="shell">
        <Reveal className="section-intro enterprise-journey-intro">
          <p className="eyebrow">How work moves through ONEComputer</p>
          <h2>From a company rule to a safe agent action.</h2>
          <p>Admins set the baseline. Managers adapt it for their teams. Employees work inside those rules, and sensitive actions pause for a decision in a separate wallet.</p>
        </Reveal>

        <div className="journey-timeline" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <motion.div className="journey-progress" animate={{ scaleX: (active + 1) / enterpriseJourneySteps.length }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
          {enterpriseJourneySteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                type="button"
                className={`${index === active ? "is-active" : ""} ${index < active ? "is-complete" : ""}`}
                key={item.title}
                onClick={() => { setActive(index); setPaused(true); }}
                whileHover={{ y: -4 }}
                aria-pressed={index === active}
                disabled={index === 7 && decision === "pending"}
              >
                <span><Icon size={15} /></span><small>{item.role}</small><b>{item.title}</b>
              </motion.button>
            );
          })}
        </div>

        <div className="journey-demo">
          <div className="journey-control">
            <AnimatePresence mode="wait">
              <motion.div className="journey-active-copy" key={step.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <span className="journey-step-icon"><StepIcon size={19} /></span>
                <p className="eyebrow">Step {String(active + 1).padStart(2, "0")} · {step.role}</p>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </motion.div>
            </AnimatePresence>

            <div className="policy-inheritance">
              <motion.div className="policy-layer company-layer" animate={{ x: active >= 1 ? 0 : -5, opacity: active >= 1 ? 1 : 0.55 }}><Building2 size={14} /><span><small>Company rule</small><b>Sensitive data stays private</b></span><Check size={13} /></motion.div>
              <motion.div className="policy-layer manager-layer" animate={{ x: active >= 2 ? 0 : -5, opacity: active >= 2 ? 1 : 0.45 }}><UsersRound size={14} /><span><small>Team rule</small><b>A manager reviews external sharing</b></span><Check size={13} /></motion.div>
              <motion.div className="policy-layer employee-layer" animate={{ x: active >= 3 ? 0 : -5, opacity: active >= 3 ? 1 : 0.35 }}><Monitor size={14} /><span><small>Workspace</small><b>Claude · isolated · rules applied</b></span><Check size={13} /></motion.div>
            </div>

            <div className={`gateway-event ${decision !== "pending" ? `is-${decision}` : ""}`}>
              <span className="gateway-event-icon">{decision === "approved" ? <BadgeCheck size={18} /> : decision === "denied" ? <X size={18} /> : <LockKeyhole size={18} />}</span>
              <div><small>Gateway state</small><b>{decision === "approved" ? "Approval verified · action released once" : decision === "denied" ? "Denial verified · action stays blocked" : active >= 5 ? "Request paused · waiting for the manager" : "Routine work continues"}</b></div>
              <code>8F2A…9C11</code>
            </div>
          </div>

          <div className="journey-trust-link" aria-hidden="true">
            <motion.span animate={reduceMotion ? undefined : { y: ["8%", "84%", "8%"] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />
            <small><Send size={13} /> encrypted request</small>
          </div>

          <VtiWalletMock available={active >= 5} decision={decision} onApprove={approve} onDeny={deny} onReset={reset} />
        </div>
      </div>
    </section>
  );
}

function EnterpriseIntegrations() {
  return (
    <section className="section integration-section">
      <div className="shell">
        <Reveal className="section-intro">
          <p className="eyebrow">Works with the security tools you already have</p>
          <h2>ONEComputer should fit your controls—not ask you to replace them.</h2>
          <p>We are designing clear connections to the data, device, endpoint, and monitoring systems enterprises already operate. These integrations are on the roadmap and are not yet part of the production release.</p>
        </Reveal>
        <div className="integration-grid">
          {enterpriseIntegrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <motion.div className="integration-card" key={integration.name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.07 }} whileHover={{ y: -5 }}>
                <div className="integration-card-top"><span><Icon size={17} /></span><small>Planned</small></div>
                <p className="eyebrow">{integration.label}</p>
                <h3>{integration.name}</h3>
                <p>{integration.text}</p>
              </motion.div>
            );
          })}
        </div>
        <div className="integration-note"><Layers3 size={16} /><span><b>Our approach</b> Use existing security signals where they are strongest, while OpenVTC remains responsible for identity and signed human decisions.</span></div>
      </div>
    </section>
  );
}

function AgentsSubpage() {
  return (
    <>
      <SubpageHero
        eyebrow="Agent workspaces"
        title={<>A safe computer for <span><AgentRotator /></span>.</>}
        body="Give people an isolated cloud computer for the agent that fits their work. As tools change, the company rules, approval process, and audit trail stay consistent."
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
        eyebrow="Keep consequential decisions human"
        title={<>Let agents move quickly. <span>Keep the final say with people.</span></>}
        body="ONEComputer runs the workspace and enforces company rules. OpenVTC keeps identity, signing keys, and important decisions outside the application asking for permission."
        step={productSteps[3]}
        primaryHref={DOCS + "governance/approvals"}
        primaryText="Read the approval model"
        secondaryHref={CLOUD + "/approvals"}
        secondaryText="Open approvals"
      />
      <SecurityFlow />
      <EnterpriseIntegrations />
      <section className="section subpage-section">
        <div className="shell">
          <Reveal className="section-intro narrow">
            <p className="eyebrow">See it in the product</p>
            <h2>Clear rules, a visible pause, and a decision made elsewhere.</h2>
          </Reveal>
          <ScreenshotGrid steps={[productSteps[2], productSteps[3]]} />
        </div>
      </section>
    </>
  );
}

function ArchitectureSubpage() {
  const layers = [
    ["The employee workspace", "Claude, NanoClaw, OpenClaw, Codex, Hermes Agent, or another agent works inside an isolated cloud computer."],
    ["ONEComputer", "The workplace application manages people, company rules, workspace lifecycle, paused requests, and a clear record of what happened."],
    ["OpenVTC", "The independent trust layer verifies identity, carries secure requests, keeps signing keys in a separate wallet, and protects decisions from reuse."],
  ];

  return (
    <>
      <SubpageHero
        eyebrow="Architecture"
        title={<>A workplace for AI, built on an <span>independent trust layer.</span></>}
        body="ONEComputer handles the everyday work of people, policy, and cloud computers. OpenVTC handles identity and signed human decisions. Keeping those responsibilities separate makes the system easier to understand and harder to spoof."
        step={productSteps[1]}
        primaryHref={DOCS + "architecture/"}
        primaryText="Read the architecture docs"
        secondaryHref="https://github.com/OpenVTC/wiki"
        secondaryText="Open OpenVTC wiki"
      />
      <section className="section subpage-section">
        <div className="shell">
          <Reveal className="section-intro narrow">
            <p className="eyebrow">Three parts with clear responsibilities</p>
            <h2>Work in the computer. Apply the rules in ONEComputer. Verify decisions with OpenVTC.</h2>
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
        eyebrow="Open source, end to end"
        title={<>See how it works. <span>Run it in your own cloud.</span></>}
        body="ONEComputer began as a fork of ONECli and is being built in the open on top of OpenVTC. Explore the repositories, trace an approval from workspace to wallet, and help shape what comes next."
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
            <div><p className="eyebrow">Build with the source</p><h2>Adapt the workplace without weakening the approval path.</h2></div>
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
        title={<>From a clean machine to your first <span>safe workspace.</span></>}
        body="The open-source installer sets up the portal, gateway, database, and documentation locally so you can understand the complete flow before deploying it to the cloud."
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
              <h2>Start locally and see every part.</h2>
              <pre><code>{"curl -fsSL https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh | sh"}</code></pre>
              <p>Review the script first in sensitive environments. You can run it again safely: it keeps your existing `.env` file and Docker volumes, and it does not upload credentials.</p>
              <a className="inline-link" href={DOCS + "getting-started/installation"}>See prerequisites and options <ArrowRight size={14} /></a>
            </Reveal>
            <Reveal className="install-checklist" delay={0.12}>
              <p className="eyebrow">What happens next</p>
              {[
                "Download or reuse the ONEComputer source",
                "Install the exact dependencies used by the project",
                "Start PostgreSQL and prepare the database",
                "Run the portal and policy gateway on your machine",
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
    ["Know who is making the decision", "OpenVTC connects the employee, manager, service, or agent to an identity that can be verified—not just a name shown on a screen."],
    ["Describe exactly what needs approval", "The request includes the action, relevant data, company rule, person responsible, and a short expiry time."],
    ["Keep the person's key somewhere else", "The manager's private signing key stays in a VTA wallet on a separate device, outside ONEComputer."],
    ["Return a decision anyone can check", "The signed approval or denial is tied to that request. ONEComputer can verify it, but cannot quietly change or reuse it."],
  ];

  return (
    <>
      <SubpageHero
        eyebrow="Why ONEComputer is built on OpenVTC"
        title={<>Agents can act. <span>People decide what matters.</span></>}
        body="AI agents become more useful when they can read files, use tools, and take action. ONEComputer limits where that work can happen. OpenVTC gives important decisions a verifiable human source, separate from the application requesting permission."
        visual={<TrustFoundationVisual />}
        primaryHref="#openvtc-foundation"
        primaryText="Start with the fundamentals"
        secondaryHref="#openvtc-journey"
        secondaryText="See the E2E journey"
      />
      <AgentSecurityPrimer />
      <section className="section subpage-section openvtc-mechanics">
        <div className="shell">
          <Reveal className="section-intro">
            <p className="eyebrow">From a request to a decision you can trust</p>
            <h2>OpenVTC answers four practical questions.</h2>
            <p>Who is deciding? What exactly are they deciding? Where is their key kept? And how can the result be checked later? ONEComputer waits until OpenVTC can answer all four.</p>
          </Reveal>
          <div className="concept-grid">
            {concepts.map(([name, text], index) => (
              <Reveal className="concept-card" delay={index * 0.08} key={name}>
                <span>0{index + 1}</span><h3>{name}</h3><p>{text}</p>
              </Reveal>
            ))}
          </div>
          <div className="trust-explainer-flow">
            {["Agent asks", "ONEComputer pauses", "VTI delivers", "Manager decides", "Decision releases once"].map((label, index) => (
              <motion.div className="trust-explainer-node" key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.08 }}>
                <b>{label}</b><small>{index === 0 ? "a sensitive action" : index === 1 ? "the exact request" : index === 2 ? "through a secure channel" : index === 3 ? "in a separate wallet" : "verified and not reused"}</small>
              </motion.div>
            ))}
          </div>
          <div className="mechanics-rule"><LockKeyhole size={17} /><span><b>The key rule</b> The application asking for permission cannot also create the decision that grants it.</span></div>
        </div>
      </section>
      <EnterpriseJourney id="openvtc-journey" />
      <EnterpriseIntegrations />
      <section className="section subpage-section">
        <div className="shell">
          <Reveal className="section-intro narrow">
            <p className="eyebrow">See the separation for yourself</p>
            <h2>ONEComputer shows why work paused. The wallet decides what happens next.</h2>
          </Reveal>
          <ScreenshotGrid steps={[productSteps[3], productSteps[1]]} />
          <div className="openvtc-doc-links">
            <a className="inline-link" href={DOCS + "architecture/openvtc-boundary"}>Read the ONEComputer trust boundary <ArrowRight size={14} /></a>
            <a className="inline-link" href="https://github.com/OpenVTC/wiki" target="_blank" rel="noreferrer">Explore the OpenVTC ecosystem wiki <ArrowUpRight size={14} /></a>
          </div>
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
        <HomeApprovalDemo />
        <AgentCoverage />
        <EnterpriseStory />
        <SecurityFlow />
        <EnterpriseIntegrations />
        <OpenSource />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
