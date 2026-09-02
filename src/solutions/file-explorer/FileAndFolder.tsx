import { type JSX, useState } from 'react';
import { MdExpandLess, MdExpandMore, MdDeleteOutline } from 'react-icons/md';
import { FiFolderPlus } from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';
import type { FileAndFolderProps } from './types';

export default function FileAndFolder({ data, onDelete, onOpenAddModal }: FileAndFolderProps): JSX.Element {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number): void => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <ul className="file-explorer-list">
      {data.map((node) => {
        const isExpanded = expandedIds.has(node.id);
        const hasChildren = Boolean(node.children && node.children.length > 0);

        return (
          <li key={node.id} className="file-explorer-item">
            <div className="file-explorer-row">
              {node.isFolder ? (
                <span
                  className="file-explorer-toggle"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(node.id)}
                  onKeyDown={(e) => e.key === 'Enter' && toggleExpand(node.id)}
                >
                  {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                </span>
              ) : (
                <span className="file-explorer-toggle-spacer" />
              )}

              <span className="file-explorer-name">{node.name}</span>

              {node.isFolder && (
                <>
                  <FiFolderPlus
                    data-testid={`add-folder-${node.id}`}
                    className="file-explorer-icon"
                    title="Add Folder"
                    onClick={() => onOpenAddModal(node.id, 'folder')}
                  />
                  <AiOutlineFileAdd
                    data-testid={`add-file-${node.id}`}
                    className="file-explorer-icon"
                    title="Add File"
                    onClick={() => onOpenAddModal(node.id, 'file')}
                  />
                </>
              )}

              <MdDeleteOutline
                data-testid="delete"
                className="file-explorer-icon"
                title="Delete"
                onClick={() => onDelete(node.id)}
              />
            </div>

            {node.isFolder && isExpanded && hasChildren && (
              <div className="file-explorer-children">
                <FileAndFolder data={node.children ?? []} onDelete={onDelete} onOpenAddModal={onOpenAddModal} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
