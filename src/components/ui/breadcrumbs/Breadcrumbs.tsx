import type React from 'react';
import Link from 'next/link';
import ChevronRightIcon from '@/components/icons/ChevronRight';

type BreadcrumbItems = {
  title: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItems[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {/* ITEMS */}
        {items.map((item, index) => (
          <li key={item.title} className="flex items-center gap-1 md:gap-2">
            {index > 0 && <ChevronRightIcon className="w-4 h-4 text-gray-400" />}
            <div className="text-sm font-medium">
              {index < items.length - 1 ? (
                <Link href={item.href} className="text-primary">
                  {item.title}
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
