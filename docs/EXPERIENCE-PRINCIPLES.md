# Experience Principles

**Status:** Foundational philosophy — meant to remain stable across years of work, the same way README.md's Purpose or DESIGN-SYSTEM.md's four references are. Revise deliberately and rarely, not in response to a single project's convenience. Where this document says *why*, DESIGN-SYSTEM.md and future implementation documents say *how* — this is the layer those decisions get checked against, not a replacement for them.

## How to Read This Document

This document exists to answer one question honestly, before any pixel or line of code: why should this experience feel the way it does? Everything downstream — the motion system, the component library, the specific durations and easing curves that will eventually live in dedicated implementation documents — should be checked against this document, not the other way around. If a technical decision and this philosophy ever disagree, the philosophy wins, and the technical decision gets revisited.

This is deliberately not a specification, and deliberately not a generic design-system preamble. There are no durations, easing curves, or CSS values here, and there's no principle below that couldn't fail — every section should be specific enough that it rules something *out*, by name, for a reason that only makes sense given what this project actually is. A principle that would read the same in any other company's design system hasn't done its job yet.

Three structural changes from a flat list of thirteen equal sections, worth explaining rather than making silently:

Attention, Restraint, and Rhythm move to the front, right after the North Star. They aren't interaction categories the way Motion or Scrolling are — they're the commitments everything else has to answer to. Reading them first makes every later section a consequence of them, not a parallel rule.

Accessibility and Performance are merged into one section. Not because either matters less — because they're the same argument (craftsmanship you can't see is still craftsmanship) applied to two different senses. Two separate checklists at the end of a document is exactly how both quietly become "later, if there's time."

Micro-interactions narrows rather than disappears. Motion and State Transitions already cover how an interaction should move and what it should communicate. Micro-interactions is a different question — whether a new small flourish gets added *at all* — which is a governance question, not a motion question.

---

## I. The North Star

Most websites are built to be noticed. This one is built to be believed by a specific, skeptical reader: someone deciding whether the thinking behind an investigation is substantial enough to keep reading, cite, or build on. That reader isn't won over by a flourish; a flourish is more likely to make them wonder what it's compensating for.

**Confidence should accumulate, not arrive.** The first few moments on the site are the highest-risk moment for the opposite failure, because before a visitor has read a single sentence, the interface is the only thing there is to react to — any impressiveness front-loaded into that moment gets credited to the site, not the work. A homepage that stages its hero element into view, or choreographs a first-load entrance, is optimizing for exactly the wrong reaction to arrive first: "this site is well made," ahead of "this work is worth reading." The right first impression is closer to no impression at all — everything already present, nothing announcing itself — with confidence in the craft building gradually instead, the way it does for a well-made physical object: no one notices a book's stitching in the first second of picking it up, only that it's still intact after the fiftieth read. The reading-progress hairline and the understated, accent-only focus states already work this way — neither shows up in a screenshot or a first glance; both are only apparent to someone actually spending time with the site, which is exactly when they should be noticed.

This matters because the site has an unusual dual audience — curious readers, and organizations evaluating whether the research is substantial enough to collaborate on. Most sites resolve a dual audience by adding signals aimed at the harder-to-convince one: client logos, credibility badges, a "trusted by" strip, a more emphatic call-to-action. That instinct should be resisted here specifically, not softened. This site's credibility signal *is* the writing and the research itself — the moment a page starts asserting its own legitimacy with marketing chrome, it's admitting the writing alone wasn't sufficient, which undermines exactly the audience it's trying hardest to reach.

The practical test for any new page, section, or feature: would this make sense on a page whose only job is to be read carefully, or does it only make sense on a page trying to convert a visitor into something? If it's the second, it belongs on Chyless World Studio, which exists specifically so ChyanneRobbins.com never has to become that kind of page.

---

## II. Attention

This site manages attention through **progressive disclosure**, not through a hierarchy of visual signals — a specific, load-bearing choice, not a restatement of "keep it simple." The Research investigation accordion is the clearest expression of it: a reader sees section labels for the entire piece up front and chooses what to open, rather than the page pre-deciding what matters via size, color, or a "featured" badge and pushing everything else into secondary visual weight. The interface asks what the reader wants to look at closer; it doesn't announce what it thinks they should look at first, beyond the one section that opens by default.

This resolves a specific, recurring temptation directly: when a Research or Journal index page needs to surface more — more entries, more metadata, more ways to sort — "reduce clutter" doesn't tell you what to cut, but this does. Prefer a mechanism the reader operates (click to expand, scroll for more) over one that decides for them (color-coded categories, "trending" ordering, badges marking some entries more important than others). A themes filter on the Research index is a legitimate future feature, but it should only ever supplement the plain-text theme labels already shown next to each entry, never replace them — the text costs a reader nothing to ignore; a filter control costs them a decision before they've read anything.

The test for any proposed addition to a list or index page: does it let the reader ask for more, or does it insist on giving them more before they asked? The first is this site's attention model. The second is every other index page's.

---

## III. Restraint

Restraint is not the absence of design decisions. It's a design decision, applied consistently, that happens to look like nothing was decided. The operating rule: the burden of proof is on adding something, never on leaving it out. A new interaction, a new visual flourish, a new transition gets added because its absence would make the experience measurably worse — harder to understand, slower to trust, less clear — never because it's possible, easy, or something a comparable site has. If no one can articulate what's lost by cutting it, it doesn't survive.

This is already load-bearing elsewhere in the system: DESIGN-SYSTEM.md bans cards, shadows, and icons outright, with a single, deliberately narrow exception — the collapse chevron on Research investigations — added only after being weighed against the rule directly, not around it. That's what restraint looks like in practice: not zero exceptions, but every exception earning its place individually, in the open, rather than accumulating by default.

The next real test of this rule is already foreseeable: when Chyless World Studio launches, ChyanneRobbins.com will need to link out to it — from the Studio page, possibly from investigations that grew into studio work. The near-universal instinct for an external destination is an "external link" icon or a distinct badge marking the departure. That instinct should lose here: the link stays plain text, in the same register as any other link in the piece, at most followed by a plain arrow character in running prose, matching how SITE-MAP.md already describes Studio linking out "with a single understated call-to-action." An icon flagging "you are now leaving this site" is a habit borrowed from software UI, not from the editorial publications this site is modeled on — a magazine doesn't badge a reference to another publication.

Restraint fails quietly if it isn't actively defended. Every individual addition looks small and justifiable in isolation. The discipline is checking the total against this rule every time, not just the next increment in isolation.

---

## IV. Rhythm

Rhythm is different from spacing. Spacing is a token, applied consistently everywhere. Rhythm is how that spacing behaves differently depending on what a reader is actually doing — and this site has two registers that should have visibly different rhythm, on purpose, because they ask different things of a reader.

Research is paced for sustained, structured attention: an investigation may be returned to across more than one sitting, so its rhythm is deliberately gated — sections stay collapsed until asked for, one section open by default, so the piece can be picked up and put down without the reader losing their place. Journal is paced for a single, continuous read: an essay or field note has no sections to gate, no accordion, nothing to expand, because breaking a shorter, looser piece into progressive-disclosure chunks would apply Research's rhythm to a register deliberately built without one. CONTENT-STANDARDS.md already resolves the specific case — Journal stays "plain paragraphs" — and Rhythm is the reasoning behind why: it isn't a lighter version of Research's structure, it's structured differently because the reading act itself is different.

This also means "consistency" is the wrong goal the day someone proposes giving Journal entries section markers "to match Research," or giving Research entries Journal's unbroken scroll "to feel less chopped up." Both proposals sound like coherence and are actually rhythm mismatches — the register should keep dictating the pacing, not the other way around.

---

## V. Motion Principles

Motion's only legitimate job here is to clarify a change of state the reader would otherwise have to work out for themselves. Two decisions this resolves directly, both close to being built:

**Navigating between pages** — from the Research index into an investigation, or from one investigation to a related one — should be an instant, hard navigation, not an animated route transition (crossfade, slide, shared-element morph). An animated page transition is one of the most recognizable signatures of the "premium template" register this project is explicitly not trying to resemble, and it solves a problem this site doesn't have: nothing about moving from an index entry to its full piece is ambiguous enough to need a transition explaining it. The reference point is a book, not an app — turning a page in a magazine doesn't fade or slide, it just turns.

**The accordion's expand animation should be a height/reveal change, not an opacity fade.** An opacity fade communicates "something is changing," which is vague; a height reveal communicates "content that was compressed is now taking its actual space," which is the specific thing happening. The rule this generalizes: match the animated property to what's *actually* changing — space, position, presence — rather than defaulting to fade for everything because fade is the easiest animation to reach for.

Motion should also resolve calmly wherever it's used — arrives, settles, done, with nothing that draws a second glance at the animation rather than the content it revealed. Bounce and spring physics read as "delightful" for a few years and dated for much longer after, because they're borrowed from whichever platform popularized them at the time; a vocabulary built only from clarity and calm resolution was never tied to that trend to begin with.

---

## VI. State Transitions

Every interactive element exists in more than one state — at rest, hovered, focused, active, expanded, visited — and two specific state decisions follow directly from the color system DESIGN-SYSTEM.md already fixes, where `accent` is "used only for links and focus states, never decoratively."

**Visited links should not get a second color.** Traditional visited-link styling — a distinct hue once a link has been clicked — introduces a second color into a system that has exactly one accent, reserved for exactly one job. Adding a visited state means either reusing `accent` for two different meanings at once (clickable, and already-opened, now indistinguishable) or introducing a second hue — and a second hue for "just this one state" is precisely the kind of addition Restraint already rules out by name.

**A Research entry's `ongoing` / `concluded` status should stay plain text, never a colored dot or badge.** Color-coded status pills are a dashboard-UI pattern — the same category of thing CONTENT-STANDARDS.md already rules out for the investigation body ("no cards, borders, shadows, colored boxes, timelines, or dashboard UI, ever"). The word "Ongoing" sitting in the metadata row, in the same muted sans as everything beside it, communicates the fact without giving color a second decorative use in a system that currently has zero.

The general rule both fall out of: before giving a new interface state its own color, check whether the color system already has a slot for it. If it doesn't, the answer is almost never "add one" — it's "say it in words instead."

---

## VII. Hover & Focus States

This is a reading site, not a product with dozens of interactive controls competing for a click, so most hover states here have exactly one job: answer "is this clickable?" honestly. That resolves a specific, easy-to-miss decision on index pages: a Research or Journal list item should not get a full background-color fill on hover, the way a table row or card-style list item commonly does elsewhere. A background fill on hover draws a bounded rectangle around the item — temporarily, but visibly — and a temporary card is still a card. The no-cards, no-boxes rule doesn't earn a hover-state exemption just because the box disappears when the cursor moves away; the hover treatment for a list item should stay text-level (accent color, underline), matching every other link on the site, not introduce a shape the rest of the system was built to avoid.

Focus states carry more weight than hover states, not less, because focus is what makes the site usable at all for anyone navigating by keyboard, and unlike hover, focus cannot be treated as a nice-to-have refinement — without it the site is simply broken for that reader. DESIGN-SYSTEM.md already resolves the specific version of this most systems get wrong: focus reuses the same `accent` token as links, rather than introducing a louder, separate "focus color" the way many component libraries do to guarantee visibility. That's a concrete instance of accessibility and restraint being the same decision rather than a compromise between them — a second, more attention-grabbing focus color was never necessary here because the accent token was already tuned to clear AA/AAA on its own.

Touch interfaces have no hover state at all: nothing on this site should depend on hover to be discoverable or usable. If a piece of information or functionality only reveals itself on hover, it doesn't exist for a meaningful share of visitors — a completeness failure, not an edge case to accept.

---

## VIII. Scrolling Behavior

The strongest default is the browser's native scroll — no custom easing, no scroll-jacking, no injected momentum overriding what the reader's own trackpad or thumb is already doing. Every custom scroll behavior has to actively earn a departure from that baseline.

Exactly one thing currently earns it: the reading-progress hairline on Research investigations, a thin neutral line tracking scroll position — no percentage, no label, the smallest possible signal that still tells a long-form reader something a plain scrollbar doesn't (how much is left), the same reason a printed book shows a visible page count.

The most likely future temptation, worth naming directly: **parallax on Journal's photo-led entries.** Parallax scrolling is common in exactly the documentary and editorial photography sites this project draws its reference points from — it would be easy to justify as "on brand" for that reason alone. It should be rejected anyway, and DESIGN-SYSTEM.md already says so explicitly ("no parallax"). The reason generalizes past this one case: parallax asks a reader to notice the scroll mechanism itself, which is a "look at the interface" effect no matter how tastefully it's executed, and it fails the same test as a scroll-triggered fade-in — decorating the act of scrolling rather than clarifying anything the reader needed to know.

---

## IX. Loading & Perceived Performance

Because this site renders as static, pre-generated pages rather than assembling content at request time, the honest default for most navigation is that there shouldn't be a perceptible loading state at all — the content should simply already be there. Reaching for a loading treatment before confirming one is actually needed usually means solving a problem the architecture already solved.

Where a genuine wait exists — most commonly a large photograph still arriving on a slow connection — the specific decision is a calm, neutral placeholder in the image's correct final proportions, not a shimmering skeleton screen. This isn't a stylistic preference between two equally valid options: a skeleton screen represents "loading" as an abstract state — a generic gray shape animating regardless of what's coming — while a fixed-proportion placeholder represents the *actual photograph's own shape* arriving. One decorates the wait; the other honestly reserves the specific space the real content needs, which is also why it prevents layout shift the skeleton pattern doesn't guarantee against.

Perceived performance is a layout problem before it's an engineering one for the same reason: a page that reserves the correct space for its content before that content arrives never jumps, never asks the reader to re-find their place mid-sentence. A page that loads quickly but visibly rearranges itself while doing so will feel slower and less careful than one that takes a little longer but never moves once it starts rendering.

---

## X. Micro-interactions

Motion and State Transitions already govern how an interaction should move and what it should communicate. Micro-interactions asks a narrower question: should this small interactive flourish exist at all? Two contrasting cases make the bar concrete.

**The chevron that rotates when a Research section expands passes the bar.** It exists because the interaction it supports — something is collapsed and can be expanded — has no other legible way to announce itself without an icon, full stop; there's no purely typographic way to signal "expandable" the way there is for a link. It was weighed against the site's own no-icons rule explicitly, in writing, before being added as the one exception.

**A hypothetical "copied!" confirmation on a future copy-link button would also pass it, for the same underlying reason** — the browser gives zero native feedback when a clipboard copy succeeds, so without some acknowledgment, a reader has no way to know their click did anything. A hover animation on a nav link, by contrast, would fail the bar even if it were tasteful and cheap to build, because the nav link's clickability is already obvious from its position and underline — the flourish wouldn't resolve any actual ambiguity, just add motion where none was needed.

The distinguishing question, every time: is there a real ambiguity this specific flourish resolves that nothing else on the page already resolves? "It would be a nice touch" is not that case, no matter how well executed the nice touch is.

---

## XI. Accessibility and Performance: The Invisible Craftsmanship

Accessibility and performance are usually two separate checklists, each considered after the design is otherwise finished. That framing is a mistake worth naming directly: they're the same argument — quality includes what a visitor doesn't consciously notice, not only what they do — applied to two different senses. Accessibility is who can use the site at all; performance is how using it feels in real time. Neither is a layer added to a finished design; both are the design, at a resolution most visitors will never articulate but every visitor will feel.

This resolves a specific, concrete constraint on every future color decision: DESIGN-SYSTEM.md's contrast pairs already clear AA everywhere and AAA everywhere except light-mode `muted` text (5.1:1, AA only). That number is a floor, not a target to trade against a quieter, more minimal-looking gray — if a future request is "make the muted text a little lighter, it'll feel calmer," and the proposed value drops below 4.5:1, the answer is no, without a compromise search, the same way a structural safety margin isn't negotiated down for aesthetics. The reuse of `accent` for both links and focus states — rather than a separate, louder focus color many systems add specifically for visibility — is the positive version of the same constraint: it was possible here because the accent token was already accessible enough to not need a louder, uglier backup.

Performance gets the same reframing: a site that's visually restrained but slow to load or janky to scroll isn't restrained, it's just quiet in the wrong way. Speed is one of the interactions a visitor feels most directly, more than almost anything discussed above — a slow site actively undermines the North Star, because nothing erodes a skeptical reader's trust faster than an interface that feels like it's struggling to keep up with them.

---

## XII. The Decision Framework

Every principle above resolves, in practice, into five questions, applicable to any new interaction, visual treatment, page, or proposed change to something that already exists:

Does this increase clarity?

Does it reduce cognitive load?

Does it reinforce trust?

Does it feel timeless — would it still feel appropriate in five years, not just the next six months?

Would removing this make the experience stronger?

Walked through a real, currently-open question from SITE-MAP.md — should the Research theme filter (Behavioral Science, Design, Systems Thinking, Technology, Public Health) ship as a clickable filter control on the index page? Clarity: marginal at best — themes already appear as plain text next to each entry, which already answers "what is this about" without an interactive control. Cognitive load: a filter UI asks a reader to decide which theme they're in the mood for before they've read anything, overhead that outweighs its benefit while the archive is still small. Trust: an elaborate filter system on a small archive can read as compensating for thinness rather than signaling substance — the opposite of its intent. Timeless: filter chips are a recognizable content-dashboard pattern tied to a specific era of SaaS product design, not to the editorial references this site is built from. Removal test: cut it entirely today, and nothing is lost — a flat, chronological list with visible theme tags already does the job. Conclusion: don't build it yet; revisit only once linear browsing genuinely fails a reader, which is a size problem this archive doesn't have yet.

That's the intended use of this framework: not five abstract checkboxes, but five specific questions applied to one real proposal until they produce an actual answer. If a proposal can't get a genuine, specific yes from at least the first four, it doesn't belong in the system regardless of how well it's executed. The fifth is the tie-breaker whenever the others feel ambiguous — a feature that inspires a serious argument for its own removal is usually clever rather than necessary, and cleverness is not what this system optimizes for.

The default posture whenever these five questions don't produce a clear result is not to build the polished version and revisit it later. It's to not build it yet. This document — not the next deadline, not what a comparable site is doing, not what would be technically interesting to build — is what any future decision should be checked against. If a future implementation ever seems to require breaking one of the principles above, that's a signal to return to this document and either revise it deliberately and explicitly, or change the implementation instead. It should never quietly drift.
