import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

const Subscription = () => {
  const [showError, setShowError] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (errors.email) {
      setShowError(true);
    }
  }, [errors.email]);

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
    button: {
      borderRadius: "12px !important",
    },
  }));

  console.log(watch("email"));

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
            disableElevation={true}
            className={classes.button}
          >
            Subscribe
          </Button>
        </Paper>
        {errors.email && (
          <Collapse in={showError}>
            <Alert severity="error" onClose={() => setShowError(false)}>
              {errors.email.message}
            </Alert>
          </Collapse>
        )}
      </div>
    </div>
  );
};

export default Subscription;
