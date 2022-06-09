import Placeholder1 from "../images/placeholders/large/placeholder_1.jpg";
import PlaceholderMedium1 from "../images/placeholders/medium/placeholder_1.jpg";
import PlaceholderSmall1 from "../images/placeholders/small/placeholder_1.jpg";
import Placeholder2 from "../images/placeholders/large/placeholder_2.jpg";
import PlaceholderMedium2 from "../images/placeholders/medium/placeholder_2.jpg";
import PlaceholderSmall2 from "../images/placeholders/small/placeholder_2.jpg";
import Placeholder3 from "../images/placeholders/large/placeholder_3.jpg";
import Placeholder4 from "../images/placeholders/large/placeholder_4.jpg";
import Placeholder5 from "../images/placeholders/large/placeholder_5.jpg";
import Placeholder6 from "../images/placeholders/large/placeholder_6.jpg";
import Placeholder7 from "../images/placeholders/large/placeholder_7.jpg";
import Placeholder8 from "../images/placeholders/large/placeholder_8.jpg";
import Placeholder9 from "../images/placeholders/large/placeholder_9.jpg";
import PlaceholderMedium3 from "../images/placeholders/medium/placeholder_3.jpg";
import PlaceholderSmall3 from "../images/placeholders/small/placeholder_3.jpg";

const placeholders = {
  large: [
    Placeholder1,
    Placeholder2,
    Placeholder3,
    Placeholder4,
    Placeholder5,
    Placeholder6,
    Placeholder7,
    Placeholder8,
    Placeholder9,
  ],
  medium: [PlaceholderMedium1],
  small: [PlaceholderSmall1],
};

const getRandomPlaceholder = (size) => {
  return placeholders[size][
    Math.floor(Math.random() * placeholders[size].length)
  ];
};

export const placeholder = {
  getRandomPlaceholder: getRandomPlaceholder,
};
