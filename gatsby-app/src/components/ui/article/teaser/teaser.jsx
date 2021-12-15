import * as React from "react";
import * as classes from "./teaser.module.css";

const Teaser = ({ image, title, desc }) => {
    return (
        <div className={classes.teaserBlock}>
            <div className={classes.teaserImage}>{image}</div>
            <h2 className={classes.teaserTitle}>{title}</h2>
            <div className={classes.teaserDesc}>{desc}</div>
            <div className={classes.teaserFooter}>

            </div>
        </div>
    );
};

export default Teaser;
