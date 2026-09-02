import { type JSX } from 'react';
import { MdExpandLess, MdExpandMore, MdDeleteOutline } from 'react-icons/md';
import { FiFolderPlus } from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';
import type { FileAndFolderProps } from './types';

export default function FileAndFolder({ data, expandedIds, onToggleExpand, onDelete, onOpenAddModal }: FileAndFolderProps): JSX.Element {
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
                  onClick={() => onToggleExpand(node.id)}
                  onKeyDown={(e) => e.key === 'Enter' && onToggleExpand(node.id)}
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
                <FileAndFolder
                  data={node.children ?? []}
                  expandedIds={expandedIds}
                  onToggleExpand={onToggleExpand}
                  onDelete={onDelete}
                  onOpenAddModal={onOpenAddModal}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
