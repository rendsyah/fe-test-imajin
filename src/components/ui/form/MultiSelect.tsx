import type React from 'react';
import type { Options } from '@/types/commons.types';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { cn } from '@/libs/utils/cn';
import ChevronDownIcon from '@/components/icons/ChevronDown';
import Badge from '../badge/Badge';

type MultiSelectProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  options: Options[];
  className?: string;
  value: (string | number)[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: (string | number)[]) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  label,
  placeholder = 'Choose Option',
  options,
  className,
  value,
  error,
  required,
  disabled,
  onChange,
}) => {
  const selectedOptions = Array.isArray(value)
    ? options.filter((opt) => value.includes(opt.id))
    : [];

  return (
    <div>
      {/* LABEL */}
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {/* SELECT */}
      <Listbox
        value={selectedOptions}
        onChange={(selected: Options[]) => onChange(selected.map((opt) => opt.id))}
        multiple
        disabled={disabled}
      >
        {({ open }) => (
          <div>
            <ListboxButton
              id={id}
              className={cn(
                'relative block w-full input text-left',
                selectedOptions.length > 0 ? 'text-white/90' : 'text-gray-400',
                error && 'input-error',
                disabled && 'input-disabled',
                className,
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
            >
              {selectedOptions.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedOptions.map((opt) => (
                    <Badge key={opt.id} size="sm">
                      {opt.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                placeholder
              )}
              <ChevronDownIcon
                className={cn(
                  'group pointer-events-none absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-gray-400 transform transition-transform duration-200',
                  open && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </ListboxButton>

            <ListboxOptions
              anchor="bottom"
              transition
              className={cn(
                'w-(--button-width) rounded-xl border border-black p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
                'transition duration-100 ease-in data-leave:data-closed:opacity-0',
                'z-50',
              )}
            >
              {options.length > 0 ? (
                options.map((opt) => (
                  <ListboxOption
                    key={opt.id}
                    value={opt}
                    className="group cursor-default rounded-xl px-3 py-1.75 select-none data-focus:bg-ui-800"
                  >
                    <div className="text-sm">{opt.name}</div>
                  </ListboxOption>
                ))
              ) : (
                <div className="text-sm px-3 py-1.75 text-gray-400 select-none">
                  No options available
                </div>
              )}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
      {/* ERROR */}
      {error && (
        <p id={`${id}-error`} className="input-text-error mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultiSelect;
