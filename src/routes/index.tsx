import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  Factory,
  Instagram,
  Leaf,
  MapPin,
  Mail,
  Menu,
  PackageCheck,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/aqua-hero.jpg";
import factoryImage from "@/assets/bottling-line.jpg";
import packagedWaterImage from "@/assets/Packaged Drinking Water.png";
import bulkWaterImage from "@/assets/Bulk Water Supply.png";
import customPacksImage from "@/assets/Custom Packs.png";
import tradeDistributionImage from "@/assets/Trade & Distribution.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hyrich Aqua | Pure Water, Pure Life" },
      {
        name: "description",
        content:
          "Refreshing packaged drinking water, bulk supply, custom packs, and trade distribution from Hyrich Aqua.",
      },
      { property: "og:title", content: "Hyrich Aqua | Pure Water, Pure Life" },
      {
        property: "og:description",
        content: "Refreshing packaged drinking water for homes, businesses, and communities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Products", "#products"],
  ["Why Hyrich", "#why-hyrich"],
  ["Contact", "#contact"],
] as const;

const productCards = [
  {
    icon: Droplets,
    title: "Packaged Drinking Water",
    copy: "Clean, refreshing hydration for every day.",
    tag: "Daily refreshment",
    visual: "bottle",
    detail: "500 ml · 1 L",
  },
  {
    icon: Truck,
    title: "Bulk Water Supply",
    copy: "Dependable volume for offices and institutions.",
    tag: "Reliable supply",
    visual: "canister",
    detail: "20 L returnable",
  },
  {
    icon: PackageCheck,
    title: "Custom Packs",
    copy: "Flexible packs created around your requirements.",
    tag: "Made for you",
    visual: "pack",
    detail: "Private label ready",
  },
  {
    icon: UsersRound,
    title: "Trade & Distribution",
    copy: "A reliable partner for growing local networks.",
    tag: "Partner with us",
    visual: "cases",
    detail: "Route-to-market support",
  },
] as const;

type ProductVisualName = (typeof productCards)[number]["visual"];

function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string | undefined;
  decimals?: number | undefined;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  const animate = useCallback(() => {
    if (animated.current) return;
    animated.current = true;
    const duration = 1800;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <span ref={ref}>
      {decimals ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

function AnimatedStat({
  target,
  suffix = "",
  decimals = 0,
  label,
  index,
}: {
  target: number;
  suffix?: string | undefined;
  decimals?: number | undefined;
  label: string;
  index: number;
}) {
  return (
    <div
      className={`border-l border-border px-5 first:border-l-0 sm:px-7 scroll-animate scroll-up scroll-stagger-${index + 1}`}
    >
      <p className="font-display text-3xl font-bold text-deep sm:text-4xl">
        <AnimatedCounter
          target={target}
          suffix={suffix}
          decimals={decimals}
        />
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function ProductVisual({
  title,
  visual,
  detail,
  Icon,
}: {
  title: string;
  visual: ProductVisualName;
  detail: string;
  Icon: (typeof productCards)[number]["icon"];
}) {
  return (
    <div className="product-visual" aria-label={`${title} packaging preview`} role="img">
      <span className="product-visual-kicker">HYRICH AQUA</span>
      {visual === "bottle" && (
        <img
          src={packagedWaterImage}
          alt="Packaged Drinking Water"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      {visual === "canister" && (
        <img
          src={bulkWaterImage}
          alt="Bulk Water Supply"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      {visual === "pack" && (
        <img
          src={customPacksImage}
          alt="Custom Packs"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      {visual === "cases" && (
        <img
          src={tradeDistributionImage}
          alt="Trade & Distribution"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-background/90 text-primary shadow-sm backdrop-blur">
        <Icon className="size-5" />
      </span>
      <span className="product-visual-detail">{detail}</span>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    main.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen overflow-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-2" aria-label="Hyrich Aqua home">
            <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-button)]">
              <Droplets className="size-6" aria-hidden="true" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl font-bold text-deep">Hyrich</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.32em] text-primary">
                Aqua
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, href], index) => (
              <a
                key={label}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-primary ${index === 0 ? "text-primary" : "text-foreground/75"}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild variant="aqua" className="rounded-full">
              <a href="#contact">
                Order now <ArrowRight />
              </a>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-border bg-background px-5 py-5 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="relative min-h-[760px] pt-20 lg:min-h-[800px]">
        <img
          src={heroImage}
          alt="Hyrich Aqua water bottle beside a pristine mountain lake"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover object-[66%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_92%,transparent)_34%,color-mix(in_oklab,var(--background)_12%,transparent)_68%,transparent_100%)]" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-16 lg:px-8">
          <div className="animate-float-in max-w-xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-primary">
              Pure water · Pure life
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.12] text-deep sm:text-6xl lg:text-7xl">
              More than water,
              <br />
              <span className="text-primary">it&apos;s life.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-foreground/75 sm:text-lg">
              Pure, safe, and refreshing water crafted for homes, businesses, and communities across
              Kerala.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="aqua" size="lg">
                <a href="#products">
                  Explore products <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="aquaOutline" size="lg">
                <a href="#about">Our story</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-background/40 bg-background/88 backdrop-blur-lg">
          <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-border px-5 py-5 lg:px-8">
            {[
              { icon: Droplets, title: "Pure water", copy: "Pure life" },
              { icon: ShieldCheck, title: "Quality", copy: "Assured" },
              { icon: Leaf, title: "Freshness", copy: "In every drop" },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="flex items-center justify-center gap-3 px-2 sm:px-6">
                <Icon className="size-6 shrink-0 text-primary" />
                <span>
                  <strong className="block text-xs text-deep sm:text-sm">{title}</strong>
                  <span className="hidden text-xs text-muted-foreground sm:block">{copy}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
          <div className="relative scroll-animate scroll-left">
            <img
              src={factoryImage}
              alt="Hyrich Aqua bottles on a hygienic production line"
              loading="lazy"
              width={1200}
              height={800}
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-[var(--shadow-card)]"
            />
            <div className="absolute -bottom-5 right-5 rounded-md bg-deep px-5 py-4 text-deep-foreground shadow-xl sm:right-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-soft">
                Care in every step
              </p>
              <p className="mt-1 font-display text-lg font-bold">Bottled with precision</p>
            </div>
          </div>
          <div className="lg:pl-8 scroll-animate scroll-right">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-primary">
              About Hyrich Aqua
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-deep sm:text-5xl">
              Purity you can trust
            </h2>
            <p className="mt-6 text-base leading-8 text-foreground/70">
              We believe water should feel as pure as its source. Every bottle is handled through a
              careful, hygienic process designed to preserve freshness and deliver a clean,
              consistent taste.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { icon: Sparkles, label: "Careful filtration" },
                { icon: ShieldCheck, label: "Hygienic packing" },
                { icon: BadgeCheck, label: "Quality focused" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 sm:block">
                  <Icon className="size-7 text-primary sm:mb-3" />
                  <span className="text-sm font-semibold text-deep">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="bg-sky-wash py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center scroll-animate scroll-up">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-primary">
              Our products
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-deep sm:text-5xl">
              Refreshment in every drop
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              From daily hydration to large-scale supply, there is a Hyrich solution for every
              setting.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productCards.map(({ icon: Icon, title, copy, tag, visual, detail }, index) => (
              <article
                key={title}
                className={`group overflow-hidden rounded-lg border border-border/70 bg-card shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 scroll-animate scroll-up scroll-stagger-${index + 1}`}
              >
                <ProductVisual title={title} visual={visual} detail={detail} Icon={Icon} />
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {tag}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-deep">{title}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{copy}</p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-strong"
                  >
                    Enquire <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 sm:grid-cols-4 lg:px-8">
          {([
            { target: 15, suffix: "+", label: "Years of care" },
            { target: 98, suffix: "%", label: "On-time fulfilment" },
            { target: 4.9, suffix: "/5", label: "Partner rating", decimals: 1 },
            { target: 24, suffix: " hrs", label: "Typical dispatch" },
          ] as { target: number; suffix: string; label: string; decimals?: number }[]).map(
            ({ target, suffix, label, decimals }, index) => (
              <AnimatedStat
                key={label}
                target={target}
                suffix={suffix}
                decimals={decimals}
                label={label}
                index={index}
              />
            ),
          )}
        </div>
      </section>

      <section id="why-hyrich" className="border-y border-border bg-background py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:grid-cols-[1.4fr_2fr] lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep scroll-animate scroll-left">Why choose Hyrich Aqua?</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Droplets, label: "Pure" },
              { icon: Sparkles, label: "Fresh" },
              { icon: ShieldCheck, label: "Protected" },
              { icon: Truck, label: "Dependable" },
            ].map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className={`flex flex-col items-center border-l border-border px-3 text-center scroll-animate scroll-up scroll-stagger-${index + 1}`}
              >
                <Icon className="mb-2 size-7 text-primary" />
                <span className="text-sm font-semibold text-deep">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-wash py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="scroll-animate scroll-left">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-primary">
              Built for the route ahead
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-deep sm:text-5xl">
              A better water partner, from source to doorstep.
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-muted-foreground">
              Our team keeps quality, consistency, and delivery moving together. That means fewer
              surprises for families, businesses, and the retailers who serve them.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-strong"
            >
              Plan your supply <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Factory,
                title: "Carefully handled",
                copy: "From filtration to final seal, every batch follows a documented hygiene routine.",
              },
              {
                icon: Truck,
                title: "Flexible delivery",
                copy: "Scheduled drops and dependable replenishment for changing demand.",
              },
              {
                icon: MapPin,
                title: "Local knowledge",
                copy: "A growing Kerala network built around the needs of each service area.",
              },
              {
                icon: Clock3,
                title: "Quick response",
                copy: "A real team on hand when an order, question, or change comes up.",
              },
            ].map(({ icon: Icon, title, copy }, index) => (
              <div
                key={title}
                className={`rounded-lg border border-border/70 bg-background p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)] scroll-animate scroll-right scroll-stagger-${index + 1}`}
              >
                <Icon className="size-7 text-primary" />
                <h3 className="mt-5 font-display text-lg font-bold text-deep">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_.8fr] lg:items-center lg:px-8">
          <div className="relative overflow-hidden rounded-lg bg-deep p-7 text-deep-foreground sm:p-10 scroll-animate scroll-left">
            <Quote className="absolute right-7 top-7 size-16 text-sky-soft/20" />
            <p className="relative max-w-xl font-display text-2xl font-bold leading-relaxed sm:text-3xl">
              "When water arrives on time and tastes right every time, it becomes one less thing to
              worry about."
            </p>
            <div className="relative mt-8 flex items-center gap-3 border-t border-deep-foreground/15 pt-5">
              <span className="grid size-10 place-items-center rounded-full bg-primary font-bold">
                AN
              </span>
              <span>
                <strong className="block text-sm">Akhil Nair</strong>
                <span className="text-xs text-deep-foreground/60">
                  Operations lead, Northline Offices
                </span>
              </span>
            </div>
          </div>
          <div className="scroll-animate scroll-right">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-primary">
              Distribution coverage
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-deep">
              Close to the people we serve.
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              From homes and cafés to offices, clinics, and neighbourhood retailers, our delivery
              routes are designed around dependable access.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 text-sm font-semibold text-deep">
              <span className="flex items-center gap-2">
                <Check className="size-4 text-primary" /> Kochi & suburbs
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-primary" /> Thrissur corridor
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-primary" /> Offices & institutions
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-primary" /> Retail partners
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-sky-wash py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div className="scroll-animate scroll-left">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-primary">
              Good to know
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-deep sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              A little clarity goes a long way when you are planning your next supply.
            </p>
            <a
              href="mailto:hello@hyrichaqua.com"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              Ask our team <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="divide-y divide-border rounded-lg border border-border bg-background px-5 sm:px-7 scroll-animate scroll-right">
            {[
              {
                question: "What areas do you deliver to?",
                answer:
                  "We currently serve homes, offices, institutions, and retail partners across Kochi, nearby suburbs, and the Thrissur corridor. Contact us to confirm your pin code.",
              },
              {
                question: "Can I set up a recurring delivery?",
                answer:
                  "Yes. We can create a recurring schedule for homes, workplaces, events, and retail replenishment, with flexibility to adjust volume.",
              },
              {
                question: "Do you support private-label packs?",
                answer:
                  "Our custom pack service can help with pack sizes, event quantities, and private-label requirements. Share your brief and our team will guide the next steps.",
              },
            ].map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-deep [&::-webkit-details-marker]:hidden">
                  <span>{question}</span>
                  <ChevronDown className="size-5 shrink-0 text-primary transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 max-w-2xl pr-8 text-sm leading-7 text-muted-foreground">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-deep py-16 text-deep-foreground">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_75%_130%,var(--sky-soft),transparent_45%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8 scroll-animate scroll-up">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-soft">
              Stay hydrated · Stay healthy
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Choose Hyrich Aqua today
            </h2>
            <p className="mt-3 text-sm text-deep-foreground/70">
              Pure water for your home, family, and business.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-deep-foreground/70">
              <span className="flex items-center gap-2">
                <Phone className="size-4 text-sky-soft" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-2">
                <Mail className="size-4 text-sky-soft" /> hello@hyrichaqua.com
              </span>
            </div>
          </div>
          <Button asChild variant="aqua" size="lg">
            <a href="mailto:hello@hyrichaqua.com">
              Get in touch <Mail />
            </a>
          </Button>
        </div>
      </section>

      <footer className="bg-deep pb-8 pt-12 text-deep-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-8 border-b border-deep-foreground/15 pb-10 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-primary">
                <Droplets className="size-5" />
              </span>
              <span>
                <strong className="block font-display text-xl">Hyrich Aqua</strong>
                <span className="text-[10px] uppercase tracking-[0.22em] text-deep-foreground/55">
                  Pure · Safe · Refreshing
                </span>
              </span>
            </div>
            <nav
              className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-deep-foreground/70"
              aria-label="Footer navigation"
            >
              {navItems.map(([label, href]) => (
                <a key={label} href={href} className="hover:text-deep-foreground">
                  {label}
                </a>
              ))}
            </nav>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-full border border-deep-foreground/25 hover:bg-deep-foreground/10"
            >
              <Instagram className="size-4" />
            </a>
          </div>
          <p className="pt-7 text-center text-[11px] text-deep-foreground/45">
            © 2026 Hyrich Aqua. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
