import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import SectionHeader from "../general/Section/SectionHeader/SectionHeader";
import Typography from "@mui/material/Typography";
import ImageUploader from "react-images-upload";
import { ErrorMessage } from "@hookform/error-message";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const UploadNews = () => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    last_name: Yup.string().required("Last name is required"),
    dob: Yup.string().required("Birthday is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  useEffect(async () => {
    /*    const response = await api.getCountries();
    if (response.length > 0) {
      const supportedIdentityReport = response.filter(
        (item) => item.supported_identity_report === true
      );
      setCountries(supportedIdentityReport);
    }*/
  }, []);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => submitButtonHandler(data);

  const submitButtonHandler = (data) => {
    setLoading(true);
    console.log(data);
  };

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };

  const useStyles = makeStyles((theme) => ({
    wrapper: {
      marginLeft: 16,
      marginRight: 16,
    },
    container: {
      maxWidth: "640px",
      minWidth: "480px",
      margin: "0 auto",
      position: "relative",
    },
    content: {
      display: "flex",
      flexDirection: "row",
    },
    column: {
      width: "50%",
      height: "100%",
    },
    inputGroup: {
      marginBottom: "24px !important",
      textAlign: "left",
      "& .MuiDivider-root::before": {
        width: "0 !important",
      },
    },
    input: {
      "& .MuiFilledInput-root": {
        borderRadius: 4,
        "& input": {
          paddingTop: 16,
          paddingRight: 36,
          paddingBottom: 14,
          paddingLeft: 14,
        },
      },
    },
  }));

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          <Box>
            <SectionHeader title={"Upload News"} />
          </Box>
          <Box className={classes.content}>
            <Box className={classes.column}>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                Upload Cover
              </Typography>
              <Box className={classes.inputGroup}>
                <ImageUploader
                  singleImage={true}
                  withPreview={true}
                  withIcon={true}
                  buttonText="Choose image"
                  onChange={onDrop}
                  imgExtension={[".jpg", ".gif", ".png"]}
                  maxFileSize={5242880}
                />
              </Box>
              <Box className={classes.inputGroup}>
                <TextField
                  className={classes.input}
                  required
                  id="field-title"
                  fullWidth
                  type="text"
                  label="Title"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: 14 },
                  }}
                  {...register("title")}
                />
                {errors && (
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    as={
                      <span
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    }
                  />
                )}
              </Box>
              <Box className={classes.inputGroup}>
                <TextField
                  className={classes.input}
                  required
                  id="field-url"
                  fullWidth
                  type="text"
                  label="Url"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: 14 },
                  }}
                  {...register("url")}
                />
                {errors && (
                  <ErrorMessage
                    errors={errors}
                    name="url"
                    as={
                      <span
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    }
                  />
                )}
              </Box>
              <Box className={classes.inputGroup}>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Empty"
                  style={{ width: "100%" }}
                />
              </Box>
            </Box>
            <Box className={classes.column}>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                Preview
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UploadNews;
