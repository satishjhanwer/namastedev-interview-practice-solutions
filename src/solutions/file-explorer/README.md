# File Explorer

## Description

A recursive file/folder tree viewer: folders expand/collapse, and files/folders can be added (via a modal) or deleted at any depth.

## Approach

- `TreeNode` (`types.ts`) is `{ id, name, isFolder, children? }`; the tree lives as `data` state in `index.tsx`, the only component that owns it.
- `FileAndFolder.tsx` is purely recursive rendering: it takes a `data: TreeNode[]` slice (siblings at one level) plus `onDelete`/`onOpenAddModal` callbacks, and renders itself again for an expanded folder's `children`. Each instance keeps its own `expandedIds` set, so expand/collapse state is local to the level it belongs to.
- Adding and deleting are implemented as pure recursive tree functions in `index.tsx` (`addNode`, `deleteNode`) that rebuild only the path to the affected node, then `setData` replaces the whole tree — no mutation of the existing tree.
- A single modal (rendered once, in `index.tsx`, not per recursion level) opens when either the folder-add or file-add icon is clicked; `modalState` tracks which folder id it's targeting and whether it's adding a file or a folder. Submitting reads the trimmed input, generates the next id from a monotonically increasing `idCounter`, and calls `addNode`.
- Icons (`react-icons`) double as the interactive controls: `MdExpandMore`/`MdExpandLess` toggle a folder, `FiFolderPlus`/`AiOutlineFileAdd` open the modal for that folder, `MdDeleteOutline` deletes that node (and its subtree, via the recursive filter).
- `data-testid`s: `add`/`cancel` on the modal buttons, `add-folder-{id}`/`add-file-{id}` on the per-folder icons, `delete` on every delete icon.

## Trade-offs

- Deleting a folder deletes its whole subtree with no confirmation step, since none was specified.
- Ids are assigned from a single incrementing counter rather than derived from the tree, which is simpler but means the counter must be seeded past the highest id already in `initialData`.
