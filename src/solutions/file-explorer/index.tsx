import { type JSX, useState } from 'react';
import FileAndFolder from './FileAndFolder';
import type { AddType, ModalState, TreeNode } from './types';
import './styles.css';

const initialData: TreeNode[] = [
  {
    id: 1,
    name: 'public',
    isFolder: true,
    children: [{ id: 2, name: 'index.html', isFolder: false }],
  },
  {
    id: 3,
    name: 'src',
    isFolder: true,
    children: [
      { id: 4, name: 'App.js', isFolder: false },
      { id: 5, name: 'index.js', isFolder: false },
    ],
  },
  { id: 6, name: 'package.json', isFolder: false },
];

function addNode(nodes: TreeNode[], parentId: number, newNode: TreeNode): TreeNode[] {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return { ...node, children: [...(node.children ?? []), newNode] };
    }
    if (node.children) {
      return { ...node, children: addNode(node.children, parentId, newNode) };
    }
    return node;
  });
}

function deleteNode(nodes: TreeNode[], id: number): TreeNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => (node.children ? { ...node, children: deleteNode(node.children, id) } : node));
}

export default function FileExplorer(): JSX.Element {
  const [data, setData] = useState<TreeNode[]>(initialData);
  const [idCounter, setIdCounter] = useState<number>(7);
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleOpenAddModal = (parentId: number, type: AddType): void => {
    setModalState({ parentId, type });
    setInputValue('');
  };

  const handleCancel = (): void => {
    setModalState(null);
    setInputValue('');
  };

  const handleAdd = (): void => {
    if (!modalState) return;
    const trimmedName = inputValue.trim();
    if (!trimmedName) return;

    const newNode: TreeNode = {
      id: idCounter,
      name: trimmedName,
      isFolder: modalState.type === 'folder',
      ...(modalState.type === 'folder' ? { children: [] } : {}),
    };

    setData((prev) => addNode(prev, modalState.parentId, newNode));
    setIdCounter((prev) => prev + 1);
    setModalState(null);
    setInputValue('');
  };

  const handleDelete = (id: number): void => {
    setData((prev) => deleteNode(prev, id));
  };

  return (
    <div className="file-explorer-body-container">
      <h2>File Explorer</h2>
      <FileAndFolder data={data} onDelete={handleDelete} onOpenAddModal={handleOpenAddModal} />

      {modalState && (
        <div className="file-explorer-modal-overlay">
          <div className="file-explorer-modal">
            <h3>Add {modalState.type === 'folder' ? 'Folder' : 'File'}</h3>
            <input
              type="text"
              autoFocus
              value={inputValue}
              placeholder={`Enter ${modalState.type} name`}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <div className="file-explorer-modal-actions">
              <button data-testid="add" onClick={handleAdd}>
                Add
              </button>
              <button data-testid="cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
