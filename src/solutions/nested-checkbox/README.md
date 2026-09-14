# Nested Checkbox

## Description

A recursive tree of checkboxes (`CheckboxesData`) where checking/unchecking a node cascades to all its descendants, and a parent's checked/indeterminate state is always derived from its children.

## Approach

- Only leaf node ids are ever stored in state (`checkedIds: Set<number>`). Parent/ancestor state is never stored directly — it's always derived, so it can't drift out of sync with its children.
- `getStatus(node, checkedIds)` recursively computes `'checked' | 'unchecked' | 'indeterminate'` for any node: a leaf reads directly from `checkedIds`; a parent looks at its children's statuses — all checked → checked, all unchecked → unchecked, otherwise indeterminate.
- Toggling any node (leaf or parent) calls `getLeafIds(node)` to collect every leaf under it (or just itself, if it's a leaf) and adds/removes all of them from `checkedIds` in one update — this is what makes parent→child cascading work, and child→parent propagation falls out for free since `getStatus` recomputes on every render.
- The indeterminate visual state is set imperatively via a ref (`el.indeterminate = ...`) since there's no React/HTML prop for it — the browser only exposes it as a DOM property, not an attribute.
- `Checkboxes` is a small recursive component (`data` → renders each node in a `<label>` wrapping the `<input>`, then recurses into `children` if present), so accessible names come for free from native label association.

## Trade-offs

- Recomputing `getStatus` top-down on every render is O(n) over the visible subtree rather than maintaining incrementally-updated parent state; simpler and correct-by-construction, and the tree here is small enough that this is a non-issue.
