import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Paper,
  Box,
  Button,
  IconButton,
  Alert,
  InputBase,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
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
    if (response) {
      showMessage(
        "You have successfully subscribed to the NEARWEEK newsletter."
      );
    } else {
      showMessage(err.title);
    }
    reset();
  };

  const useStyles = makeStyles(() => ({
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
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={0}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="email">
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
            type="email"
            sx={{ ml: 1, flex: 1 }}
            placeholder="example@mail.com"
          />
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
        </Paper>
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
    </div>
  );
};

export default Subscription;
