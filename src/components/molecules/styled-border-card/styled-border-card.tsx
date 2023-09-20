import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { LayoutContext } from '@/components/layouts/app-layout/contexts/layout-context';
import './styled-border-card.scss';

export default function StyledBorderCard ({
  children
}: {
  children: React.ReactNode
}) {
  const { layoutConfig } = useContext(LayoutContext);

  const containerClassName = classNames(
    'styled-border-card surface-ground flex w-full align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  );
  return (
    <div className={containerClassName}>
      <div className="styled-border-card__container flex flex-column w-full mx-3 sm:w-8 md:w-7 lg:w-6 xl:w-6 align-items-center justify-content-center">
        <div
          style={{
            borderRadius : '56px',
            padding      : '0.3rem',
            background:
              'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
          className="w-full"
        >
          <div
            className="w-full surface-card py-8 px-6 sm:px-7"
            style={{ borderRadius: '53px' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
