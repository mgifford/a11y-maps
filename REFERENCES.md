# References

A curated list of academic papers, open source projects, and live demos that directly informed the accessibility patterns and design choices in this project.

---

## Research & Academic Papers

### [Systematically Evaluating Equivalent Purpose for Digital Maps](https://arxiv.org/abs/2512.05310)

- **Source:** arXiv preprint 2512.05310
- **Summary:** Introduces a systematic framework for evaluating whether a digital map has an accessible equivalent that fulfils the same purpose for users who cannot use the visual map. Goes beyond surface-level compliance to assess true equivalence of meaning and task completion.
- **Relevance to this project:** Directly supports the core principle that text alternatives must serve the same *purpose* as the map, not merely describe its appearance.

---

## Open Source Projects

### Indoor Wayfinding & Navigation

#### [indoor-wayfinder (KnotzerIO)](https://github.com/KnotzerIO/indoor-wayfinder)

- **Live demo:** [indoor.knotzer.io](https://indoor.knotzer.io/?position=v35)
- An indoor wayfinding tool built on open standards. A practical example of applying accessibility thinking to interior navigation.

#### [OpenIndoorMaps](https://github.com/openindoormaps/openindoormaps)

- **Live demo:** [openindoormaps.vercel.app](https://openindoormaps.vercel.app/)
- Open source project for rendering and navigating indoor maps, focused on accessibility and open data.

### Government & Civic Map Components

#### [DEFRA Interactive Map](https://github.com/DEFRA/interactive-map)

- **Live demo:** [defra.github.io/interactive-map](https://defra.github.io/interactive-map/)
- UK government (Department for Environment, Food & Rural Affairs) interactive map component designed with public-sector accessibility requirements in mind.

### Accessible Map Patterns

#### [accessible-map (sammyhawkrad)](https://github.com/sammyhawkrad/accessible-map)

- **Live demo:** [hawkrad.dev/accessible-map](https://hawkrad.dev/accessible-map/)
- Lightweight accessible map implementation demonstrating keyboard navigation and screen reader support patterns.

#### [AccMaps (tillgrosse)](https://github.com/tillgrosse/accmaps)

- **Documentation:** [Accessible Maps WS 2021/22 (PDF)](https://github.com/tillgrosse/accmaps/blob/develop/Accessible_Maps_WS%202021_22.pdf)
- Research and prototype project focused on making maps accessible to screen reader users.

### Indoor OSM & Spatial Data Conversion

#### [IndoorOSMtoSITConverter (AccessibleMaps)](https://github.com/AccessibleMaps/IndoorOSMtoSITConverter)

- Converts OpenStreetMap indoor data to the SIT (Spatial Indoor Topology) format, enabling accessible indoor navigation with OSM data.

#### [2.5D Indoor Maps (Accessible-InfoPoint)](https://github.com/Accessible-InfoPoint/2.5D-Indoor-Maps)

- A 2.5D rendering approach to indoor maps intended to improve comprehension and accessibility for users with visual or cognitive impairments.

---

## Related Documentation in This Repository

- [RESOURCES.md](RESOURCES.md) — Broader collection of guidelines, articles, and technical libraries for accessible mapping
- [ACCESSIBILITY.md](ACCESSIBILITY.md) — WCAG 2.2 AA commitment, testing procedures, and contributor guidelines
- [ATTRIBUTION.md](ATTRIBUTION.md) — License and attribution details for all dependencies
