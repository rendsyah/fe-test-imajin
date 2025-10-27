'use client';

import type React from 'react';
import { KeyModal, useGlobal } from '@/contexts/global.context';
import { useLockBody } from '@/hooks/useLockBody';
import XMarkIcon from '@/components/icons/XMark';
import InfoCircleIcon from '@/components/icons/InfoCircle';
import { cn } from '@/libs/utils/cn';

type ModalProps = {
  name: KeyModal;
  title: string;
  children: React.ReactNode;
  size?: keyof typeof SIZE_CLASSES;
  action?: React.ReactNode;
  onClose?: () => void;
};

const SIZE_CLASSES = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
};

const Modal: React.FC<ModalProps> = ({ name, title, children, size = 'lg', action, onClose }) => {
  const { modal, onCloseModal } = useGlobal();

  useLockBody(modal.type === name);

  if (modal.type !== name) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-ui-900/50 backdrop-blur-sm"
        onClick={onClose ?? onCloseModal}
      />
      {/* MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-10 w-full max-w-xs rounded-2xl bg-ui-800 overflow-hidden',
          SIZE_CLASSES[size],
        )}
      >
        {/* HEADER */}
        <div className="w-full flex justify-between px-6 py-5 items-center bg-ui-700">
          {title && (
            <div className="flex items-center gap-2">
              <InfoCircleIcon className="h-6 w-6 text-primary" />
              <h1 className="text-md font-semibold">{title}</h1>
            </div>
          )}
          <button onClick={onClose ?? onCloseModal}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        {/* DIVIDER */}
        <div className="border-b border-gray-400" />
        {/* BODY */}
        <div className="p-6 overflow-y-auto custom-scrollbar max-h-[450px] sm:max-h-[500px]">
          {children}
        </div>
        {/* ACTION */}
        {action && (
          <div>
            <div className="border-t border-gray-400" />
            <div className="px-6 py-5">{action}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
