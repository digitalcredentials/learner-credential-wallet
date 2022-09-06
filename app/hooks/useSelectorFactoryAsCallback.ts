import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Selector, SelectorProps } from '../store/selectorFactories';

export function useSelectorFactoryAsCallback<S extends Selector<SelectorProps, unknown>>(selectorFactory: () => S): (props: Parameters<S>[1]) => ReturnType<S> {
  const state = useSelector<RootState, RootState>((state) => state);
  const selector = useMemo(selectorFactory, []);
  
  return (props) => selector(state, props) as ReturnType<S>;
}
