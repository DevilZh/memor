/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useContext, Context, FC, createElement, ReactNode } from "react";

export const createMemoComponent =
  <T>(Context: Context<T>) =>
  <R extends object>(mapStateToProps: (v: T) => R) =>
  <P>(Component: FC<R & P>) =>
  (props: P) => {
    const state = useContext(Context);
    const dependencies = mapStateToProps(state);
    return useMemo(
      () => createElement(Component, { ...dependencies, ...props }),
      [...Object.values(dependencies), ...Object.values(props)]
    );
  };

export type ConnectedProps<T> = T extends (v: FC<infer P>) => (props: any) => ReactNode ? P : never;
