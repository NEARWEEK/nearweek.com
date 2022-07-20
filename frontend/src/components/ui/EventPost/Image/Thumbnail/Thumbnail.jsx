import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { placeholder } from "../../../../../Utils/placeholder";

const Thumbnail = ({ data, url }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const Image = data?.attributes?.Image || null;
  const useStyles = makeStyles(() => ({
    img: {
      minWidth: isMobileMatch ? "68px" : "362px",
      minHeight: isMobileMatch ? "68px" : "100%",
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px",
    },
  }));
  let thumbnail = placeholder.getRandomPlaceholder("small");
  if (Image.data) {
    thumbnail = `${Image.data.attributes.formats.thumbnail.url}`;
  }
  const classes = useStyles();
  return (
    <>
      <a href={url} target="_blank" rel="noreferrer">
        <div
          style={{
            backgroundImage: `url('${thumbnail}')`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }}
          className={"image " + classes.img}
        />
      </a>
    </>
  );
};

export default Thumbnail;
