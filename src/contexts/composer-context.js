export const ContextProvider = ({ contexts = [], children }) =>
    contexts.reduceRight(
        (AccumulatedContexts, CurrentContext) => (
            <CurrentContext>{AccumulatedContexts}</CurrentContext>
        ),
        children
    );
