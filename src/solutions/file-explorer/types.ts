export interface TreeNode {
  id: number;
  name: string;
  isFolder: boolean;
  children?: TreeNode[];
}

export interface FileAndFolderProps {
  data: TreeNode[];
  expandedIds: Set<number>;
  onToggleExpand: (id: number) => void;
  onDelete: (id: number) => void;
  onOpenAddModal: (parentId: number, type: 'file' | 'folder') => void;
}

export type AddType = 'file' | 'folder';

export interface ModalState {
  parentId: number;
  type: AddType;
}