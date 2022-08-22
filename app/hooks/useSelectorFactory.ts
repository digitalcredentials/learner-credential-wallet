import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Selector, SelectorProps } from '../store/selectorFactories';

export function useSelectorFactory<S extends Selector<SelectorProps, unknown>>(selectorFactory: () => S, props?: Parameters<S>[1]): ReturnType<S> {
  const selector = useMemo(selectorFactory, []);
  const value = useSelector<RootState>((state) =>
    selector(state, props)
  );

  return value as ReturnType<S>;
}