import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Paper,
  Box,
  Button,
  IconButton,
  Alert,
  SvgIcon,
  InputBase,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import Collapse from "@mui/material/Collapse";
import * as Utils from "../../../../Utils/Utils";

import { useStoreActions } from "easy-peasy";

const Subscription = () => {
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const showMessage = useStoreActions((actions) => actions.main.showMessage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => handleSubscribe(data);

  useEffect(() => {
    if (errors.email) {
      setShowError(true);
    }
  }, [errors.email]);

  const handleSubscribe = async (request) => {
    setLoading(true);
    const { response, err } = await Utils.api.subscribeNewsletter({
      data: request,
    });
    setLoading(false);
    if (response && response.status === "subscribed") {
      showMessage(
        "You have successfully subscribed to the NEARWEEK newsletter."
      );
    } else {
      showMessage(err.title);
    }
    reset();
  };

  const useStyles = makeStyles((theme) => ({
    subscribeBlock: {
      padding: 24,
      borderRadius: 12,
      background: "#f7f7f7",
    },
    formTitle: {
      fontSize: 18,
      fontWeight: 900,
    },
    formWrapper: {
      marginTop: 24,
      marginBottom: 24,
      display: "flex",
      gap: 24,
      "@media screen and (max-width: 600px)": {
        flexDirection: "column",
      },
      "& .Mui-error": {
        color: theme.palette.error.main,
      },
    },
    message: {
      marginTop: 24,
    },
    button: {
      borderRadius: "12px !important",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.subscribeBlock}>
      <div className={classes.formTitle}>
        Subscribe to The NEARWEEK newsletter{" "}
      </div>
      <div className={classes.formWrapper}>
        <Paper
          onSubmit={handleSubmit(onSubmit)}
          elevation={0}
          sx={{
            p: "2px 4px",
            display: "flex",
            flex: 0.5,
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            sx={{ p: "10px" }}
            aria-label="email"
            disableRipple={true}
            color={errors.email ? "error" : "default"}
          >
            <EmailIcon />
          </IconButton>
          <InputBase
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            error={!!errors.email}
            type="email"
            sx={{ ml: 1, flex: 1 }}
            placeholder="example@mail.com"
          />
        </Paper>
        <Paper
          elevation={0}
          sx={{
            p: "2px 4px",
            display: "flex",
            flex: 0.5,
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            sx={{ p: "10px" }}
            aria-label="account"
            disableRipple={true}
          >
            <SvgIcon viewBox="-4 -4 24 24">
              <path
                id="near"
                fill="#222"
                d="m17.3125,1.0009c0,-0.0626 0,-0.0626 0,0c-0.125,-0.1251 -0.1875,-0.2502 -0.3125,-0.3753l-0.0625,-0.0626c-0.0625,-0.0626 -0.1875,-0.1251 -0.3125,-0.1877c-0.0625,0 -0.0625,-0.0625 -0.125,-0.0625c-0.125,-0.0626 -0.1875,-0.0626 -0.3125,-0.1251c-0.0625,0 -0.0625,0 -0.125,-0.0626c-0.125,-0.0625 -0.3125,-0.0625 -0.5,-0.0625c-0.125,0 -0.3125,0 -0.4375,0.0625c-0.0625,0 -0.0625,0 -0.125,0.0626c-0.125,0 -0.1875,0.0625 -0.3125,0.1251c0,0 0,0 -0.0625,0c-0.25,0.1251 -0.4375,0.2502 -0.625,0.4379l-3.375,5.5049l4,-2.252l0,9.5085l-10.625,-12.7614c-0.375,-0.4379 -0.9375,-0.7507 -1.5625,-0.7507l-0.4375,0c-1.125,0 -2,0.8758 -2,2.0018l0,13.512c0,0.3754 0.125,0.6882 0.25,0.9384c0,0.0625 0.0625,0.0625 0.0625,0.1251c0,0 0,0.0626 0.0625,0.0626c0.0625,0.0625 0.125,0.1876 0.1875,0.2502c0,0 0.0625,0 0.0625,0.0625c0.0625,0.0626 0.125,0.1251 0.1875,0.1877l0.0625,0.0626c0.125,0.0625 0.1875,0.1251 0.3125,0.1876c0,0 0,0 0.0625,0c0.125,0.0626 0.1875,0.0626 0.3125,0.0626l0.0625,0c0.125,0 0.25,0.0625 0.375,0.0625c0.125,0 0.3125,0 0.4375,-0.0625c0.0625,0 0.0625,0 0.125,-0.0626c0.125,0 0.1875,-0.0625 0.3125,-0.1251c0,0 0,0 0.0625,0c0.25,-0.1251 0.4375,-0.2502 0.625,-0.4379l3.875,-5.3798l-4.4375,1.9393l0,-9.3834l10.625,12.7614c0.375,0.4379 0.9375,0.7506 1.5625,0.7506l0.4375,0c1.125,0 2,-0.8757 2,-2.0018l0,-13.512c0,-0.3753 -0.125,-0.7507 -0.3125,-1.0009z"
              />
            </SvgIcon>
          </IconButton>
          <InputBase
            {...register("merge_fields.MMERGE6")}
            type="text"
            sx={{ ml: 1, flex: 1 }}
            placeholder="example.near"
          />
        </Paper>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          disableElevation={true}
          onClick={handleSubmit(onSubmit)}
          className={classes.button}
        >
          Subscribe
        </Button>
      </div>
      <Box className={classes.message}>
        {errors.email && (
          <Collapse in={showError}>
            <Alert severity="error" onClose={() => setShowError(false)}>
              {errors.email.message}
            </Alert>
          </Collapse>
        )}
      </Box>
    </div>
  );
};

export default Subscription;
