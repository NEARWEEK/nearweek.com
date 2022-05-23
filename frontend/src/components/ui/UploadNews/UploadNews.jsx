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
import { useStoreActions, useStoreState } from "easy-peasy";
import { apiConfig } from "../../../config/apiConfig";
import LoadingButton from "@mui/lab/LoadingButton";

const UploadNews = () => {
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const state = useStoreState((state) => state);
  const wallet = state.main.entities.wallet;
  const accountId = wallet.getAccountId();
  const showMessage = useStoreActions((actions) => actions.main.showMessage);

  const validationSchema = Yup.object().shape({
    Title: Yup.string().required("Title is required"),
    Author: Yup.string().required("Title is required"),
    Body: Yup.string().required("Description is required"),
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

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      Author: accountId,
      Image: null,
      categories: [],
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

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => submitButtonHandler(data);

  const onCancel = () =>
    reset({
      Title: "",
      Body: "",
      LinkTo: "",
      categories: [],
    });

  const submitButtonHandler = async (data) => {
    setLoading(true);
    if (image.length) {
      const uploadImage = await apiConfig.upload(image);
      data.Image = uploadImage.data[0].id;
    }
    data.categories = { ...data }.categories.map((category) => category.id);
    const newArticle = await apiConfig.postArticle({ data });
    showMessage("You successfully created your article!");
    reset({
      Title: "",
      Body: "",
      LinkTo: "",
      categories: [],
    });
    setLoading(false);
  };

  const onDrop = async (image) => {
    setImage([...image]);
  };

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box className={classes.page}>
        <Box className={classes.container}>
          <Box className={classes.wrapper}>
            <Box>
              <SectionHeader title={"Upload News"} />
            </Box>
            <Box className={classes.content}>
              <Box className={classes.column}>
                <Typography variant="h5" className={classes.columnTitle}>
                  Upload Cover
                </Typography>
                <Box className={classes.inputGroup}>
                  <FormControl {...register("Image")} sx={{ width: "100%" }}>
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
                      name="Title"
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
                      name="categories"
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
                    label="URL"
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: 14 },
                    }}
                    {...register("LinkTo")}
                  />
                  {errors && (
                    <ErrorMessage
                      errors={errors}
                      name="LinkTo"
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
                  <Box display="flex" sx={{ maxWidth: "100%" }}>
                    <TextareaAutosize
                      aria-label="empty textarea"
                      maxLength={300}
                      placeholder="Description"
                      className={classes.textarea}
                      {...register("Body")}
                    />
                  </Box>
                  {errors && (
                    <ErrorMessage
                      errors={errors}
                      name="Description"
                      as={
                        <span
                          className="error-message"
                          style={{ color: "red" }}
                        />
                      }
                    />
                  )}
                </Box>
              </Box>
              <Box className={classes.column}>
                <Typography variant="h5" className={classes.columnTitle}>
                  Preview
                </Typography>
                <Preview image={image} data={watch()} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.pageFooter}>
        <Button onClick={onCancel}>Cancel</Button>
        <LoadingButton
          variant="contained"
          disableElevation
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </LoadingButton>
      </Box>
    </>
  );
};

export default UploadNews;
