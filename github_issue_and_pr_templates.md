# GitHub Issue & PR Audit Ledger

## Feature: Interactive Event Roadmap for Multi-Day Festivals

- **Issue Number**: [#3944](https://github.com/krushit1307/CampusConnect/issues/3944)
- **Pull Request**: [#3969](https://github.com/krushit1307/CampusConnect/pull/3969)
- **Feature Title**: `feat(architecture): build interactive event roadmap for multi-day festivals`
- **Domain**: UI/UX & Festival Event Scheduling
- **Status**: PR Submitted & Live
- **Branch**: `feature/festival-event-roadmap-3944`
- **Components & Services**:
  - `src/components/festivals/InteractiveFestivalRoadmap.tsx` (634 lines)
  - `src/services/festivalRoadmapService.ts` (440 lines)
  - `src/routes/events.$id.festival-roadmap.tsx` (103 lines)
  - `src/types/festivalRoadmap.ts` (78 lines)
  - `supabase/migrations/20261231000026_festival_multi_track_roadmap.sql` (105 lines)
- **Summary**:
  Interactive multi-track Gantt timeline roadmap displaying concurrent sessions, multi-day switchers, track filters, real-time schedule conflict resolution, session inspectors, and RFC 5545 iCalendar (.ics) export.

---

## Feature: Dynamic Ride-Share Carbon Offset Engine

## Feature: Dynamic Ride-Share Carbon Offset Engine

- **Issue Number**: [#3936](https://github.com/krushit1307/CampusConnect/issues/3936)
- **Pull Request**: [#3968](https://github.com/krushit1307/CampusConnect/pull/3968)
- **Feature Title**: `feat(analytics): develop dynamic ride-share carbon offset calculator`
- **Domain**: Sustainability & Environmental Analytics
- **Status**: PR Submitted & Live
- **Branch**: `feature/rideshare-carbon-offset-3936`
- **Components & Services**:
  - `src/components/sustainability/DynamicRideShareCarbonOffset.tsx` (498 lines)
  - `src/services/carbonOffsetService.ts` (326 lines)
  - `src/routes/sustainability.carbon-offset.tsx` (44 lines)
  - `src/types/carbonOffset.ts` (63 lines)
  - `supabase/migrations/20261231000025_rideshare_carbon_offsets.sql` (85 lines)
- **Summary**:
  Calculates real-time greenhouse gas emissions prevented by carpooling using EPA emissions factors, geodesic Haversine distances, ecological equivalency models, and an aggregated campus-wide sustainability leaderboard with ESG audit reporting.

---

## Feature: Interactive Event Budget ROI & Break-Even Calculator

## Feature: Interactive Event Budget ROI & Break-Even Calculator

- **Issue Number**: [#3941](https://github.com/krushit1307/CampusConnect/issues/3941)
- **Pull Request**: [#3967](https://github.com/krushit1307/CampusConnect/pull/3967)
- **Feature Title**: `feat(analytics): build interactive event budget roi calculator`
- **Domain**: Financial Analytics & Event Solvency
- **Status**: PR Submitted & Live
- **Branch**: `feature/event-budget-roi-3941`
- **Components & Services**:
  - `src/components/events/InteractiveEventRoiCalculator.tsx` (571 lines)
  - `src/services/eventRoiCalculatorService.ts` (306 lines)
  - `src/routes/events.$id.budget-roi.tsx` (105 lines)
  - `src/types/eventRoiCalculator.ts` (83 lines)
  - `supabase/migrations/20261231000024_event_budget_roi.sql` (121 lines)
- **Summary**:
  Interactive financial feasibility and break-even simulator empowering club treasurers to stress-test ticket prices, attendance rates, fixed/variable costs, 2D sensitivity matrix heatmaps, and exportable financial summaries.

---

## Feature: Dynamic Sponsorship Value Calculator

## Feature: Dynamic Sponsorship Value Calculator

- **Issue Number**: [#3951](https://github.com/krushit1307/CampusConnect/issues/3951)
- **Pull Request**: [#3966](https://github.com/krushit1307/CampusConnect/pull/3966)
- **Feature Title**: `feat(analytics): develop dynamic sponsorship value calculator`
- **Domain**: Analytics & Sponsor Acquisition
- **Status**: PR Submitted & Live
- **Branch**: `feature/sponsorship-value-calculator-3951`
- **Components & Services**:
  - `src/components/sponsorship/DynamicSponsorshipCalculator.tsx` (634 lines)
  - `src/services/sponsorshipCalculatorService.ts` (333 lines)
  - `src/routes/clubs.$slug.sponsorship-calculator.tsx` (102 lines)
  - `src/types/sponsorshipCalculator.ts` (88 lines)
  - `supabase/migrations/20261231000023_sponsorship_value_calculator.sql` (97 lines)
- **Summary**:
  Algorithmic pricing engine calculating fair-market valuations for student club sponsorship packages based on historical reach, CPM/CPV benchmarks, demographic talent premiums, and custom perk deliverables with pitch deck proposal generation.

---

## Feature: Interactive Event Budget vs Actual Sankey Diagram

- **Issue Number**: [#3947](https://github.com/krushit1307/CampusConnect/issues/3947)
- **Pull Request**: [#3965](https://github.com/krushit1307/CampusConnect/pull/3965)
- **Feature Title**: `feat(data-viz): build interactive event budget vs actual sankey diagram`
- **Domain**: Financial Transparency & Data Visualization
- **Status**: PR Submitted & Live
- **Branch**: `feature/event-budget-sankey-3947`
- **Components & Services**:
  - `src/components/budget/EventBudgetSankeyDiagram.tsx` (652 lines)
  - `src/services/budgetSankeyService.ts` (504 lines)
  - `src/routes/clubs.$slug.budget-sankey.tsx` (106 lines)
  - `src/types/budgetSankey.ts` (98 lines)
  - `supabase/migrations/20261231000022_event_budget_sankey.sql` (94 lines)
- **Summary**:
  Interactive 3-tier Sankey diagram visualizer mapping funding sources (grants, ticket sales, sponsorships) to expenditure categories (catering, venue, marketing) and downstream vendors with real-time variance calculations, inspector drawers, and CSV ledger exports.
