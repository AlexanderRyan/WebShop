import { ReactNode } from "react";

type ConditionalRenderProps = {
  predicate: boolean;
  children: ReactNode;
  fallback?: JSX.Element | null;
};

const ConditionalRender = ({
  children,
  predicate,
  fallback = null,
}: ConditionalRenderProps) => {
  return predicate ? children : fallback;
};

export default ConditionalRender;
