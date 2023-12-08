import { type State } from '@prisma/client';
import Link from 'next/link';
import { Button, type ButtonProps } from 'primereact/button';
import { type ActionButton } from '../types/modified-types';

type ObjectWithNameKey = {
  name: string
}

type TableRecord<T, > = T & { state: State, id: string }

function HocLink (idx: number, configLink: { readonly id: string, readonly goto: string | undefined, readonly button: JSX.Element }) {
  if (configLink.goto === undefined) return <div key={idx}>{configLink.button}</div>;

  if (configLink.goto !== undefined) return <Link key={idx} href={`${configLink.goto.replace('{id}', configLink.id)}`} >{configLink.button}</Link>;
}

const styleStateButton = (state: State, { severity, label, severityenabled, labeldisabled, severitydisabled }: ActionButton): ButtonProps => {
  if (state === 'enabled') { return { severity: severityenabled as ButtonProps['severity'], label }; }

  if (state === 'disabled') { return { severity: severitydisabled as ButtonProps['severity'], label: labeldisabled }; }

  return { severity, label };
};

const addActions = <T, >(item: TableRecord<T>, actionButtons: ActionButton[]) => {
  return <div className='display grid pr-2 flex justify-content-center'>
    {actionButtons.map((actionButton, idx) => {
      const stateStyles = (actionButton.isstatebutton === 'true'
        ? styleStateButton(item.state, actionButton)
        : actionButton as ButtonProps);

      return HocLink(idx, {
        id   : item.id,
        goto : actionButton.goto,
        button:
  <Button key={idx} size='small' id={item.id} {...actionButton} {...stateStyles}
                  style={{ minWidth: 'min-content', width: 'min-content' }}
                  className={`${actionButton.className}  mt-1 ml-2 col`}/>
      });
    })}
  </div>;
};

const objectKeysToValue = <T, >(item: TableRecord<T>, actionButtons: ActionButton[] | undefined) => {
  const convertedItem: Record<string, unknown> = {};

  Object.keys(item as object).forEach((key) => {
    if (typeof item[key as keyof T] === 'object' && key !== 'actions') {
      convertedItem[key] = (item[key as keyof T] as unknown as ObjectWithNameKey)?.name;
    }

    if (typeof item[key as keyof T] !== 'object') convertedItem[key] = item[key as keyof T];

    if (actionButtons !== undefined) {
      convertedItem.actions = addActions(item, actionButtons);
    }
  });

  return convertedItem;
};

export const processData = <T,>(data: T[], actionButtons: ActionButton[] | undefined) => {
  return data.map((item) =>
    objectKeysToValue(item as TableRecord<T>, actionButtons)
  );
};
