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
  Network,
  ScanLine,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  WalletCards,
} from "lucide-react";

const GITHUB = "https://github.com/ONE-Computer/onecomputer";
const CLOUD = "https://onecomputer-openvtc.eastus2.cloudapp.azure.com";

const productSteps = [
  {
    id: "control",
    eyebrow: "01 · Control",
    title: "See every computer and agent from one live control plane.",
    body: "Security teams get an org-wide view of running sandboxes, active agents, errors, and enforcement state—without entering the agent workspace.",
    image: "/screenshots/ciso-console.png",
    alt: "ONEComputer CISO Console showing sandbox and agent fleet status",
    kind: "ciso",
    icon: ScanLine,
  },
  {
    id: "policy",
    eyebrow: "02 · Govern",
    title: "Set the company floor before an agent connects.",
    body: "Default policy and scoped rules decide which traffic is allowed, denied, or sent to human review. Teams can add stricter controls, never weaker ones.",
    image: "/screenshots/default-policy.png",
    alt: "ONEComputer company default policy screen",
    kind: "policy",
    icon: SlidersHorizontal,
  },
  {
    id: "approve",
    eyebrow: "03 · Verify",
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
    href: "https://github.com/ONE-Computer/wiki",
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

function Nav({ progress }) {
  return (
    <motion.header
      className="site-nav"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <nav className="shell nav-inner" aria-label="Primary navigation">
        <a href="#top" aria-label="ONEComputer home">
          <Logo />
        </a>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#security">Security</a>
          <a href="#open-source">Open source</a>
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
            The governed computer for <span>AI agents.</span>
          </motion.h1>
          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
          >
            Give Claude and other agents a real workspace—then enforce company
            policy, hold consequential actions, and verify approval through a
            separate OpenVTC wallet.
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
              See the product <ArrowDown size={15} />
            </motion.a>
            <motion.a
              className="button button-quiet"
              href={CLOUD}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Open cloud demo <ArrowUpRight size={14} />
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
              Policy posture <b>enforced</b>
            </span>
          </motion.div>
          <motion.div
            className="floating-proof proof-wallet"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <WalletCards size={17} />
            <span>
              Approval authority <b>external</b>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="shell trust-strip" aria-label="ONEComputer capabilities">
        <span><Server size={15} /> Isolated computers</span>
        <span><ShieldCheck size={15} /> Policy gateway</span>
        <span><WalletCards size={15} /> External wallet</span>
        <span><FileCheck2 size={15} /> Durable evidence</span>
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
          <h2>One system from policy to proof.</h2>
          <p>
            These are live ONEComputer product surfaces—not concept art. Raw
            test identifiers are redacted in the marketing presentation.
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
              <a href={`${CLOUD}/${activeStep.id === "control" ? "console" : activeStep.id === "policy" ? "settings/policy" : "approvals"}`} target="_blank" rel="noreferrer">
                Open surface <ArrowUpRight size={13} />
              </a>
            </motion.div>
          </div>
        </div>
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
          <h2>The browser can request approval. It cannot manufacture it.</h2>
          <p>
            ONEComputer owns the business workflow. OpenVTC owns identity,
            wallet custody, Trust Tasks, and the signed decision.
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
            <p>Users, company policy, computers, agents, connectors, gateway holds, and correlated audit state.</p>
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
            <h2>Thin product layer. Open trust infrastructure.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              ONEComputer is forked from ONECli and evolves as the business
              application over OpenVTC. Upstream ancestry remains visible and
              every trust boundary stays independently auditable.
            </p>
            <a className="inline-link" href={GITHUB} target="_blank" rel="noreferrer">
              Explore the organization <ArrowUpRight size={14} />
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
          <h2>Give agents computers.<br />Keep authority human.</h2>
        </div>
        <div className="cta-actions">
          <motion.a className="button button-brand" href={GITHUB} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Github size={16} /> View on GitHub <ArrowUpRight size={14} />
          </motion.a>
          <motion.a className="button button-quiet" href={CLOUD} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            Open cloud demo <ArrowUpRight size={14} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <div className="app-shell">
      <Nav progress={progress} />
      <main>
        <Hero />
        <ProductTour />
        <SecurityFlow />
        <OpenSource />
        <FinalCta />
      </main>
      <footer className="shell footer">
        <Logo />
        <span>Open-source governed AI computers · forked from ONECli</span>
        <a href="https://github.com/ONE-Computer" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
      </footer>
    </div>
  );
}
