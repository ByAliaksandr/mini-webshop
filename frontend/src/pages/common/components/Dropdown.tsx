import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Dropdown = ({ options, value, onChange, placeholder = 'Select...' }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  const selected = options.find((option) => option.value === value);
  const label = selected?.label ?? placeholder;

  const select = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={`${styles.trigger} ${open ? styles.open : ''}`}
        onClick={() => setOpen((val) => !val)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{label}</span>
      </button>

      {open && (
        <ul className={styles.list} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.item} ${value === option.value ? styles.selected : ''}`}
              onClick={() => select(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
