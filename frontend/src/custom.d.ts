declare module '*.svg' {
    const content: string;
    export default content;
}

declare module "*.svg" {
    import * as React from "react";

    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    export default ReactComponent;
}

