import React from "react";
import styles from "./NotFoundBlock.module.scss"
console.log(styles)
const NotFoundBlock = () => {
    return (
            <h1 className={styles.root}>
                <span>🥲</span>
                <br/>
                Nothing found
            </h1>
    )
}

export default NotFoundBlock;