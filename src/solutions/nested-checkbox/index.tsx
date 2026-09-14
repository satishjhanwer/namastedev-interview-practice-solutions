import { type JSX, useState } from 'react';
import './styles.css';

interface CheckboxNode {
  id: number;
  label: string;
  children?: CheckboxNode[];
}

const CheckboxesData: CheckboxNode[] = [
  {
    id: 1,
    label: 'Fruits',
    children: [
      { id: 2, label: 'Apple' },
      { id: 3, label: 'Banana' },
      {
        id: 4,
        label: 'Citrus',
        children: [
          { id: 5, label: 'Orange' },
          { id: 6, label: 'Lemon' },
        ],
      },
    ],
  },
  {
    id: 7,
    label: 'Vegetables',
    children: [
      { id: 8, label: 'Carrot' },
      { id: 9, label: 'Broccoli' },
    ],
  },
];

type CheckStatus = 'checked' | 'unchecked' | 'indeterminate';

function getLeafIds(node: CheckboxNode): number[] {
  if (!node.children || node.children.length === 0) return [node.id];
  return node.children.flatMap(getLeafIds);
}

function getStatus(node: CheckboxNode, checkedIds: Set<number>): CheckStatus {
  if (!node.children || node.children.length === 0) {
    return checkedIds.has(node.id) ? 'checked' : 'unchecked';
  }
  const childStatuses = node.children.map((child) => getStatus(child, checkedIds));
  if (childStatuses.every((status) => status === 'checked')) return 'checked';
  if (childStatuses.every((status) => status === 'unchecked')) return 'unchecked';
  return 'indeterminate';
}

interface CheckboxesProps {
  data: CheckboxNode[];
  checkedIds: Set<number>;
  onToggle: (node: CheckboxNode, checked: boolean) => void;
}

const Checkboxes = ({ data, checkedIds, onToggle }: CheckboxesProps): JSX.Element => {
  return (
    <ul className="nested-checkbox-list">
      {data.map((node) => {
        const status = getStatus(node, checkedIds);
        const hasChildren = Boolean(node.children && node.children.length > 0);

        return (
          <li key={node.id} className="nested-checkbox-item">
            <div className="nested-checkbox-row">
              <input
                type="checkbox"
                aria-label={node.label}
                checked={status === 'checked'}
                ref={(el) => {
                  if (el) el.indeterminate = status === 'indeterminate';
                }}
                onChange={(e) => onToggle(node, e.target.checked)}
              />
              <span>{node.label}</span>
            </div>
            {hasChildren && <Checkboxes data={node.children ?? []} checkedIds={checkedIds} onToggle={onToggle} />}
          </li>
        );
      })}
    </ul>
  );
};

export default function NestedCheckbox(): JSX.Element {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  const handleToggle = (node: CheckboxNode, checked: boolean): void => {
    const leafIds = getLeafIds(node);
    setCheckedIds((prev) => {
      const next = new Set(prev);
      leafIds.forEach((id) => (checked ? next.add(id) : next.delete(id)));
      return next;
    });
  };

  return (
    <div className="nested-checkbox-body-container">
      <h2>Nested Checkbox</h2>
      <Checkboxes data={CheckboxesData} checkedIds={checkedIds} onToggle={handleToggle} />
    </div>
  );
}
