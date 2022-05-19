import React, { useEffect, useState } from "react";
import { useStyles } from "./Preview.styles";
import { placeholder } from "../../../../Utils/placeholder";
import Widget from "../../general/Widget/Widget";
import Typography from "@mui/material/Typography";

const Preview = ({ pictures, data }) => {
  const classes = useStyles();

  const [preview, setPreview] = useState(
    placeholder.getRandomPlaceholder("small")
  );

  useEffect(() => {
    if (pictures.length) {
      const objectUrl = URL.createObjectURL(pictures[0]);
      setPreview(objectUrl);
    } else {
      setPreview(placeholder.getRandomPlaceholder("small"));
    }
  }, [pictures]);

  console.log(data);

  return (
    <>
      <div className={classes.postContent}>
        <div className={classes.postImage}>
          <img src={preview} alt={"Preview"} className={classes.img} />
        </div>
        <div className={classes.contentBody}>
          {Object.entries(data) && (
            <div className={classes.postCategory}>
              {data.categories.length > 0 ? (
                <>
                  {data.categories.map((item, index) => (
                    <>
                      {index > 0 && index < data.categories.length && "•"}{" "}
                      <div className={classes.categoryItem} key={item.name}>
                        {item.name}
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <div className={classes.categoryItem}>Category</div>
              )}
            </div>
          )}
          {data.Title ? (
            <h3 className={classes.postTitle}>{data.Title}</h3>
          ) : (
            <h3 className={classes.postTitle}>Title</h3>
          )}
          {data.Body ? (
            <Typography variant="body2" mb={2}>
              {data.Body}
            </Typography>
          ) : (
            <div>[Description]</div>
          )}
        </div>
        <div className={classes.contentFooter}>
          <div className={classes.postWidgets}>
            <Widget icon={"Visibility"} data={0} />
            <Widget icon={"ThumbUp"} data={0} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
