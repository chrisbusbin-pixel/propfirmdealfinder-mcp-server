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
export declare const PFDF_CODE = "PFDF";
export declare const PFDF_WEBSITE = "https://propfirmdealfinder.com";
export declare const PFDF_DEALS_URL = "https://propfirmdealfinder.com/deals";
export declare const PFDF_COMPARE_URL = "https://propfirmdealfinder.com/compare";
export declare const PFDF_IOS_URL = "https://apps.apple.com/gh/app/propfirmdealfinder/id6758235452";
export declare const PFDF_WINDOWS_URL = "https://apps.microsoft.com/detail/9PJD0XN2V58Q";
export declare const PFDF_CHROME_URL = "https://propfirmdealfinder.com/chromeextension";
export declare const PFDF_TAGLINE = "Find the Best Prop Firm Deal in Seconds";
export declare const PFDF_DESCRIPTION = "Prop Firm Deal Finder is a 100% free app (no ads, ever) that tracks live discount codes across 20+ proprietary trading firms. Compare challenge prices, rules, drawdown limits, payout speeds, and active promo codes \u2014 all in one place.";
export declare const FIRMS: PropFirm[];
export declare function getFirmBySlug(slug: string): PropFirm | undefined;
export declare function getFirmByName(name: string): PropFirm | undefined;
export declare function getFirmsByCategory(category: FirmCategory): PropFirm[];
export declare function getEditorsChoiceFirms(): PropFirm[];
export declare function getFirmsSortedByDiscount(): PropFirm[];
export declare function searchFirms(query: string): PropFirm[];
export declare function formatFirmMarkdown(firm: PropFirm): string;
export declare function formatDealsListMarkdown(firms: PropFirm[]): string;
export declare function formatComparisonMarkdown(firms: PropFirm[]): string;
//# sourceMappingURL=data.d.ts.map