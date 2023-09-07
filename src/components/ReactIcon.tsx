import loadable from '@loadable/component';
import React from 'react';
import { IconBaseProps } from 'react-icons/lib';

interface IReactIcon extends IconBaseProps {
  nameicon: string;
  lib: string;
}

function ReactIcon(props: IReactIcon): React.JSX.Element {
  const ElementIcon = loadable(
    () => import(`react-icons/${props.lib}/index.esm.js`),
    {
      resolveComponent: (el: React.JSX.Element) =>
        el[props.nameicon as keyof React.JSX.Element],
    },
  );

  return <ElementIcon {...props} />;
}

export default ReactIcon;
