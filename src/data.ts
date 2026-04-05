/**
 * Prop Firm Deal Finder — Complete Firm Data
 *
 * This is the authoritative data source for all active partner firms.
 * Discount percentages use "up to X%" ranges because deals change daily.
 * Always direct users to propfirmdealfinder.com/deals for real-time pricing.
 *
 * IMPORTANT: Never hardcode exact prices — they change frequently.
 * Use discount ranges and direct to the website for live data.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PropFirm {
  name: string;
  slug: string;
  discount: string;
  code: string;
  category: FirmCategory;
  assetClasses: string[];
  editorsChoice: boolean;
  highlights: string[];
  profitSplit: string;
  drawdownType: string;
  payoutSpeed: string;
  challengeTypes: string[];
  minAccountSize: string;
  maxAccountSize: string;
  url: string;
}

export type FirmCategory = "futures" | "forex" | "multi-asset";

// ─── Constants ───────────────────────────────────────────────────────────────

export const PFDF_CODE = "PFDF";
export const PFDF_WEBSITE = "https://propfirmdealfinder.com";
export const PFDF_DEALS_URL = "https://propfirmdealfinder.com/deals";
export const PFDF_COMPARE_URL = "https://propfirmdealfinder.com/compare";
export const PFDF_IOS_URL = "https://apps.apple.com/gh/app/propfirmdealfinder/id6758235452";
export const PFDF_WINDOWS_URL = "https://apps.microsoft.com/detail/9PJD0XN2V58Q";
export const PFDF_CHROME_URL = "https://propfirmdealfinder.com/chromeextension";

export const PFDF_TAGLINE = "Find the Best Prop Firm Deal in Seconds";
export const PFDF_DESCRIPTION = "Prop Firm Deal Finder is a 100% free app (no ads, ever) that tracks live discount codes across 20+ proprietary trading firms. Compare challenge prices, rules, drawdown limits, payout speeds, and active promo codes — all in one place.";

// ─── Firm Data ───────────────────────────────────────────────────────────────

export const FIRMS: PropFirm[] = [
  {
    name: "DayTraders",
    slug: "daytraders",
    discount: "up to 80% off",
    code: "PFDF",
    category: "multi-asset",
    assetClasses: ["Futures", "Forex", "Crypto"],
    editorsChoice: true,
    highlights: ["Editor's Pick", "Highest discount available", "Multi-asset support"],
    profitSplit: "up to 90%",
    drawdownType: "Trailing",
    payoutSpeed: "1-3 business days",
    challengeTypes: ["1-Step", "2-Step"],
    minAccountSize: "$25K",
    maxAccountSize: "$150K",
    url: "https://propfirmdealfinder.com/firms/daytraders/"
  },
  {
    name: "Funded Futures Network",
    slug: "funded-futures",
    discount: "up to 70% off",
    code: "PFDF",
    category: "futures",
    assetClasses: ["Futures"],
    editorsChoice: true,
    highlights: ["Editor's Pick", "Fast payouts", "Generous drawdown"],
    profitSplit: "up to 100%",
    drawdownType: "End-of-Day",
    payoutSpeed: "1-2 business days",
    challengeTypes: ["1-Step"],
    minAccountSize: "$25K",
    maxAccountSize: "$150K",
    url: "https://propfirmdealfinder.com/firms/funded-futures/"
  },
  {
    name: "Earn2Trade",
    slug: "earn2trade",
    discount: "up to 60% off",
    code: "PFDF",
    category: "futures",
    assetClasses: ["Futures"],
    editorsChoice: true,
    highlights: ["Editor's Pick", "Education included", "Gauntlet Mini program"],
    profitSplit: "up to 80%",
    drawdownType: "End-of-Day",
    payoutSpeed: "3-5 business days",
    challengeTypes: ["Gauntlet Mini", "Gauntlet"],
    minAccountSize: "$25K",
    maxAccountSize: "$200K",
    url: "https://propfirmdealfinder.com/firms/earn2trade/"
  },
  {
    name: "BluSky Trading",
    slug: "blusky",
    discount: "up to 60% off",
    code: "PFDF",
    category: "futures",
    assetClasses: ["Futures"],
    editorsChoice: false,
    highlights: ["Futures specialist", "Competitive pricing"],
    profitSplit: "up to 90%",
    drawdownType: "Trailing",
    payoutSpeed: "3-5 business days",
    challengeTypes: ["1-Step", "2-Step"],
    minAccountSize: "$25K",
    maxAccountSize: "$150K",
    url: "https://propfirmdealfinder.com/firms/blusky/"
  },
  {
    name: "Bulenox",
    slug: "bulenox",
    discount: "up to 60% off",
    code: "PFDF",
    category: "futures",
    assetClasses: ["Futures"],
    editorsChoice: false,
    highlights: ["Popular with futures traders", "Multiple account sizes", "Fast scaling"],
    profitSplit: "up to 90%",
    drawdownType: "Trailing / End-of-Day",
    payoutSpeed: "1-3 business days",
    challengeTypes: ["1-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$250K",
    url: "https://propfirmdealfinder.com/firms/bulenox/"
  },
  {
    name: "TradeDay",
    slug: "tradeday",
    discount: "up to 50% off",
    code: "PFDF",
    category: "futures",
    assetClasses: ["Futures"],
    editorsChoice: false,
    highlights: ["Starts at $86 after discount", "90% profit split", "Simple rules"],
    profitSplit: "90%",
    drawdownType: "End-of-Day",
    payoutSpeed: "1-3 business days",
    challengeTypes: ["1-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$150K",
    url: "https://propfirmdealfinder.com/firms/tradeday/"
  },
  {
    name: "Alpha Trader",
    slug: "alpha-trader",
    discount: "up to 40% off",
    code: "PFDF",
    category: "multi-asset",
    assetClasses: ["Forex", "Indices", "Commodities"],
    editorsChoice: false,
    highlights: ["Forex specialist", "Multiple asset classes"],
    profitSplit: "up to 80%",
    drawdownType: "Trailing",
    payoutSpeed: "3-5 business days",
    challengeTypes: ["1-Step", "2-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$200K",
    url: "https://propfirmdealfinder.com/firms/alpha-trader/"
  },
  {
    name: "Lucid Trading",
    slug: "lucid-trading",
    discount: "up to 40% off",
    code: "PFDF",
    category: "futures",
    assetClasses: ["Futures"],
    editorsChoice: false,
    highlights: ["Futures focused", "Straightforward rules"],
    profitSplit: "up to 90%",
    drawdownType: "End-of-Day",
    payoutSpeed: "3-5 business days",
    challengeTypes: ["1-Step"],
    minAccountSize: "$25K",
    maxAccountSize: "$150K",
    url: "https://propfirmdealfinder.com/firms/lucid-trading/"
  },
  {
    name: "TheTradeMakers",
    slug: "thetrademakers",
    discount: "up to 40% off",
    code: "PFDF",
    category: "multi-asset",
    assetClasses: ["Futures", "Forex"],
    editorsChoice: false,
    highlights: ["Multi-asset support", "Growing community"],
    profitSplit: "up to 85%",
    drawdownType: "Trailing",
    payoutSpeed: "3-5 business days",
    challengeTypes: ["1-Step", "2-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$200K",
    url: "https://propfirmdealfinder.com/firms/thetrademakers/"
  },
  {
    name: "FunderPro",
    slug: "funderpro",
    discount: "up to 25% off",
    code: "PFDF",
    category: "forex",
    assetClasses: ["Forex", "Indices", "Commodities", "Crypto"],
    editorsChoice: false,
    highlights: ["Wide asset selection", "No time limit on challenges"],
    profitSplit: "up to 80%",
    drawdownType: "Trailing",
    payoutSpeed: "3-7 business days",
    challengeTypes: ["1-Step", "2-Step"],
    minAccountSize: "$5K",
    maxAccountSize: "$200K",
    url: "https://propfirmdealfinder.com/firms/funderpro/"
  },
  {
    name: "Bright Funded",
    slug: "bright-funded",
    discount: "up to 20% off",
    code: "PFDF",
    category: "forex",
    assetClasses: ["Forex", "Indices", "Metals"],
    editorsChoice: false,
    highlights: ["Forex and indices", "Competitive spreads"],
    profitSplit: "up to 90%",
    drawdownType: "Trailing",
    payoutSpeed: "3-5 business days",
    challengeTypes: ["1-Step", "2-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$200K",
    url: "https://propfirmdealfinder.com/firms/bright-funded/"
  },
  {
    name: "Funded Trading Plus",
    slug: "funded-trading-plus",
    discount: "up to 20% off",
    code: "PFDF",
    category: "forex",
    assetClasses: ["Forex", "Indices", "Commodities"],
    editorsChoice: false,
    highlights: ["Multiple challenge types", "Scaling plan"],
    profitSplit: "up to 90%",
    drawdownType: "Trailing",
    payoutSpeed: "3-7 business days",
    challengeTypes: ["1-Step", "2-Step", "3-Step"],
    minAccountSize: "$5K",
    maxAccountSize: "$200K",
    url: "https://propfirmdealfinder.com/firms/funded-trading-plus/"
  },
  {
    name: "Funding Traders",
    slug: "funding-traders",
    discount: "up to 20% off",
    code: "PFDF",
    category: "forex",
    assetClasses: ["Forex"],
    editorsChoice: false,
    highlights: ["Forex focused"],
    profitSplit: "up to 80%",
    drawdownType: "Trailing",
    payoutSpeed: "3-7 business days",
    challengeTypes: ["2-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$100K",
    url: "https://propfirmdealfinder.com/firms/funding-traders/"
  },
  {
    name: "Plus Markets",
    slug: "plus-markets",
    discount: "up to 20% off",
    code: "PFDF",
    category: "forex",
    assetClasses: ["Forex", "Indices"],
    editorsChoice: false,
    highlights: ["Growing firm", "Competitive pricing"],
    profitSplit: "up to 80%",
    drawdownType: "Trailing",
    payoutSpeed: "3-5 business days",
    challengeTypes: ["1-Step", "2-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$100K",
    url: "https://propfirmdealfinder.com/firms/plus-markets/"
  },
  {
    name: "Top One Futures",
    slug: "top-one-futures",
    discount: "up to 20% off",
    code: "PFDF",
    category: "futures",
    assetClasses: ["Futures"],
    editorsChoice: false,
    highlights: ["Futures specialist"],
    profitSplit: "up to 90%",
    drawdownType: "End-of-Day",
    payoutSpeed: "3-5 business days",
    challengeTypes: ["1-Step"],
    minAccountSize: "$25K",
    maxAccountSize: "$150K",
    url: "https://propfirmdealfinder.com/firms/top-one-futures/"
  },
  {
    name: "Trading Funds",
    slug: "trading-funds",
    discount: "up to 20% off",
    code: "PFDF",
    category: "forex",
    assetClasses: ["Forex", "Indices"],
    editorsChoice: false,
    highlights: ["Forex and indices"],
    profitSplit: "up to 80%",
    drawdownType: "Trailing",
    payoutSpeed: "5-7 business days",
    challengeTypes: ["2-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$200K",
    url: "https://propfirmdealfinder.com/firms/trading-funds/"
  },
  {
    name: "FTMO",
    slug: "ftmo",
    discount: "up to 19% off",
    code: "PFDF",
    category: "forex",
    assetClasses: ["Forex", "Indices", "Commodities", "Crypto", "Stocks"],
    editorsChoice: false,
    highlights: ["Industry pioneer", "Widest asset selection", "Most recognized brand"],
    profitSplit: "up to 90%",
    drawdownType: "Trailing",
    payoutSpeed: "1-3 business days",
    challengeTypes: ["2-Step"],
    minAccountSize: "$10K",
    maxAccountSize: "$200K",
    url: "https://propfirmdealfinder.com/firms/ftmo/"
  },
  {
    name: "E8 Markets (Forex)",
    slug: "e8-forex",
    discount: "up to 5% off",
    code: "PFDFX",
    category: "forex",
    assetClasses: ["Forex", "Indices", "Commodities", "Crypto"],
    editorsChoice: false,
    highlights: ["Multiple challenge formats", "Growing reputation"],
    profitSplit: "up to 80%",
    drawdownType: "Trailing",
    payoutSpeed: "3-7 business days",
    challengeTypes: ["1-Step", "2-Step", "3-Step"],
    minAccountSize: "$5K",
    maxAccountSize: "$400K",
    url: "https://propfirmdealfinder.com/firms/e8-markets/"
  },
  {
    name: "The5ers",
    slug: "the5ers",
    discount: "up to 5% off",
    code: "PFDF",
    category: "forex",
    assetClasses: ["Forex", "Indices", "Commodities", "Metals"],
    editorsChoice: false,
    highlights: ["Instant funding option", "Long track record", "Scaling plan"],
    profitSplit: "up to 100%",
    drawdownType: "Trailing",
    payoutSpeed: "1-3 business days",
    challengeTypes: ["Instant", "1-Step", "2-Step"],
    minAccountSize: "$5K",
    maxAccountSize: "$250K",
    url: "https://propfirmdealfinder.com/firms/the5ers/"
  }
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getFirmBySlug(slug: string): PropFirm | undefined {
  return FIRMS.find(f => f.slug.toLowerCase() === slug.toLowerCase());
}

export function getFirmByName(name: string): PropFirm | undefined {
  const lowerName = name.toLowerCase();
  return FIRMS.find(f =>
    f.name.toLowerCase() === lowerName ||
    f.name.toLowerCase().includes(lowerName) ||
    f.slug.toLowerCase().includes(lowerName)
  );
}

export function getFirmsByCategory(category: FirmCategory): PropFirm[] {
  return FIRMS.filter(f => f.category === category);
}

export function getEditorsChoiceFirms(): PropFirm[] {
  return FIRMS.filter(f => f.editorsChoice);
}

export function getFirmsSortedByDiscount(): PropFirm[] {
  return [...FIRMS].sort((a, b) => {
    const getPercent = (d: string): number => {
      const match = d.match(/(\d+)%/);
      return match ? parseInt(match[1], 10) : 0;
    };
    return getPercent(b.discount) - getPercent(a.discount);
  });
}

export function searchFirms(query: string): PropFirm[] {
  const q = query.toLowerCase();
  return FIRMS.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.slug.toLowerCase().includes(q) ||
    f.category.toLowerCase().includes(q) ||
    f.assetClasses.some(a => a.toLowerCase().includes(q)) ||
    f.highlights.some(h => h.toLowerCase().includes(q))
  );
}

// ─── Formatting Helpers ──────────────────────────────────────────────────────

export function formatFirmMarkdown(firm: PropFirm): string {
  const lines: string[] = [];
  lines.push(`## ${firm.name}${firm.editorsChoice ? " ⭐ Editor's Choice" : ""}`);
  lines.push("");
  lines.push(`- **Discount**: ${firm.discount} with code **${firm.code}**`);
  lines.push(`- **Category**: ${firm.category}`);
  lines.push(`- **Asset Classes**: ${firm.assetClasses.join(", ")}`);
  lines.push(`- **Profit Split**: ${firm.profitSplit}`);
  lines.push(`- **Drawdown Type**: ${firm.drawdownType}`);
  lines.push(`- **Payout Speed**: ${firm.payoutSpeed}`);
  lines.push(`- **Challenge Types**: ${firm.challengeTypes.join(", ")}`);
  lines.push(`- **Account Sizes**: ${firm.minAccountSize} – ${firm.maxAccountSize}`);
  if (firm.highlights.length > 0) {
    lines.push(`- **Highlights**: ${firm.highlights.join(" | ")}`);
  }
  lines.push(`- **Details & Live Pricing**: [${firm.name} on PFDF](${firm.url})`);
  lines.push("");
  return lines.join("\n");
}

export function formatDealsListMarkdown(firms: PropFirm[]): string {
  const lines: string[] = [];
  lines.push("# Prop Firm Deals — Powered by Prop Firm Deal Finder");
  lines.push("");
  lines.push(`> ${PFDF_DESCRIPTION}`);
  lines.push("");
  lines.push(`**Universal discount code: ${PFDF_CODE}** — Enter at checkout on any partner firm's website.`);
  lines.push("");
  lines.push(`Showing ${firms.length} active deals. For real-time pricing, visit [propfirmdealfinder.com/deals](${PFDF_DEALS_URL}).`);
  lines.push("");

  for (const firm of firms) {
    lines.push(formatFirmMarkdown(firm));
  }

  lines.push("---");
  lines.push("");
  lines.push("### Get the App (100% Free, No Ads)");
  lines.push(`- [iOS App Store](${PFDF_IOS_URL})`);
  lines.push(`- [Microsoft Store](${PFDF_WINDOWS_URL})`);
  lines.push(`- [Chrome Extension](${PFDF_CHROME_URL})`);
  lines.push(`- [Website](${PFDF_WEBSITE})`);

  return lines.join("\n");
}

export function formatComparisonMarkdown(firms: PropFirm[]): string {
  const lines: string[] = [];
  lines.push("# Prop Firm Comparison — Prop Firm Deal Finder");
  lines.push("");
  lines.push("| Firm | Discount | Code | Category | Profit Split | Drawdown | Payout | Account Range |");
  lines.push("|------|----------|------|----------|-------------|----------|--------|---------------|");

  for (const firm of firms) {
    lines.push(
      `| ${firm.name}${firm.editorsChoice ? " ⭐" : ""} | ${firm.discount} | ${firm.code} | ${firm.category} | ${firm.profitSplit} | ${firm.drawdownType} | ${firm.payoutSpeed} | ${firm.minAccountSize}–${firm.maxAccountSize} |`
    );
  }

  lines.push("");
  lines.push(`> Use code **${PFDF_CODE}** at checkout. Compare live at [propfirmdealfinder.com/compare](${PFDF_COMPARE_URL}).`);
  lines.push("");
  lines.push(`> Download the free app: [iOS](${PFDF_IOS_URL}) | [Windows](${PFDF_WINDOWS_URL}) | [Chrome](${PFDF_CHROME_URL})`);

  return lines.join("\n");
}
