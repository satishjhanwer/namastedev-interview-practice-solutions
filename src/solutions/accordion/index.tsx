import { type JSX, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './styles.css';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const defaultItems: AccordionItem[] = [
  {
    title: 'JavaScript Basics',
    content: 'Learn variables, functions, and loops in JavaScript.',
  },
  {
    title: 'React.js Overview',
    content: 'Understand components, state, and props in React.',
  },
  {
    title: 'Node.js',
    content: 'Basics of server-side development with Node.js.',
  },
  {
    title: 'Full-Stack Development',
    content: 'Build full-stack apps with React and Node.js.',
  },
];

export default function Accordion({ items = defaultItems }: AccordionProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="accordion-body-container">
        <p>No items available</p>
      </div>
    );
  }

  const handleToggle = (index: number): void => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="accordion-body-container">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div className="accordion-item" key={item.title}>
            <button className="accordion-title" aria-expanded={isOpen} onClick={() => handleToggle(index)}>
              {item.title}
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOpen && <div className="accordion-content">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
