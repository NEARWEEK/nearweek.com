import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import SectionHeader from "../general/Section/SectionHeader/SectionHeader";
import {
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  Chip,
  InputLabel,
} from "@mui/material";
import ImageUploader from "react-images-upload";
import { ErrorMessage } from "@hookform/error-message";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../Utils/Utils";
import { useStyles } from "./UploadNews.styles";
import Preview from "./Preview/Preview";

const UploadNews = () => {
  const [pictures, setPictures] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    Title: Yup.string().required("Title is required"),
    url: Yup.string().required("Url name is required"),
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.getCategories();
      if (data.length > 0) {
        setCategory(
          data.map((item) => {
            return {
              id: item.id,
              name: item.attributes.Name,
            };
          })
        );
      }
    })();
  }, []);

  console.log(category);

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      Title: "",
      category: [],
    },
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => submitButtonHandler(data);

  const submitButtonHandler = (data) => {
    console.log(data);
    //setLoading(true);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue("category", [...category, value]);
  };

  const onDrop = async (picture) => {
    setPictures([...picture]);
    setValue("image", [...picture]);
    //const upload = await api.upload(picture);
  };

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
              <Typography variant="h5" className={classes.columnTitle}>
                Upload Cover
              </Typography>
              <Box className={classes.inputGroup}>
                <FormControl {...register("image")} sx={{ width: "100%" }}>
                  <ImageUploader
                    singleImage={true}
                    withPreview={true}
                    className={classes.fileUploader}
                    withIcon={true}
                    buttonText="Upload file"
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png"]}
                    maxFileSize={5242880}
                  />
                </FormControl>
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
                  {...register("Title")}
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
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => {
                      return (
                        <Select
                          labelId="category-label"
                          id="category-multiple-chip"
                          multiple
                          value={field.value}
                          disableUnderline
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          renderValue={(selected) => {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((item) => (
                                  <Chip key={item.name} label={item.name} />
                                ))}
                              </Box>
                            );
                          }}
                          MenuProps={MenuProps}
                        >
                          {category.map((item) => (
                            <MenuItem key={item.name} value={item}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                </FormControl>
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
                  maxLength={500}
                  placeholder="Description"
                  className={classes.input}
                  style={{ width: "100%" }}
                  {...register("Body")}
                />
              </Box>
              <Box>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
              </Box>
            </Box>
            <Box className={classes.column}>
              <Typography variant="h5" className={classes.columnTitle}>
                Preview
              </Typography>
              <Preview pictures={pictures} data={watch()} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UploadNews;
