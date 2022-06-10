import React from "react";

export const ContextProvider: React.FC<{
    contexts: React.FC<React.PropsWithChildren>[];
    children: JSX.Element;
}> = ({ contexts = [], children }) =>
    contexts.reduceRight(
        (AccumulatedContexts, CurrentContext) => (
            <CurrentContext>{AccumulatedContexts}</CurrentContext>
        ),
        children
    );
