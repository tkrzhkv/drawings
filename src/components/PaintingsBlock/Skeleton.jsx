import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="painting-block"
        speed={1}
        width={300}
        height={500}
        viewBox="0 0 260 535"
        backgroundColor="#c7c7c7"
        foregroundColor="#bad3de"
    >
        <rect x="111" y="209" rx="0" ry="0" width="0" height="1" />
        <rect x="0" y="0" rx="50" ry="50" width="260" height="346" />
        <rect x="-1" y="357" rx="9" ry="9" width="260" height="28" />
        <rect x="2" y="396" rx="10" ry="10" width="260" height="88" />
        <rect x="1" y="494" rx="10" ry="10" width="89" height="39" />
        <rect x="134" y="495" rx="20" ry="20" width="122" height="39" />
    </ContentLoader>
)

export default Skeleton;
