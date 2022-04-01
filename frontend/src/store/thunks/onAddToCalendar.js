import { thunk } from "easy-peasy";
import ApiCalendar from "react-google-calendar-api";

export const onAddToCalendar = thunk(async (actions, payload, helpers) => {
  const showMessage = actions.showMessage;
  const { event } = payload;
  try {
    if (!ApiCalendar.sign) await ApiCalendar.handleAuthClick();
    const createEvent = await ApiCalendar.createEvent(event, "primary");
    if (createEvent) showMessage("Event created successfully!");
  } catch (e) {
    showMessage(e.result.error.message);
  }
});
