import Placeholder1 from "../images/placeholders/large/placeholder_1.jpg";
import PlaceholderMedium1 from "../images/placeholders/medium/placeholder_1.jpg";
import PlaceholderSmall1 from "../images/placeholders/small/placeholder_1.jpg";
import Placeholder2 from "../images/placeholders/large/placeholder_2.jpg";
import PlaceholderMedium2 from "../images/placeholders/medium/placeholder_2.jpg";
import PlaceholderSmall2 from "../images/placeholders/small/placeholder_2.jpg";
import Placeholder3 from "../images/placeholders/large/placeholder_3.jpg";
import PlaceholderMedium3 from "../images/placeholders/medium/placeholder_3.jpg";
import PlaceholderSmall3 from "../images/placeholders/small/placeholder_3.jpg";

const placeholders = {
  large: [Placeholder1, Placeholder2, Placeholder3],
  medium: [PlaceholderMedium1, PlaceholderMedium2, PlaceholderMedium3],
  small: [PlaceholderSmall1, PlaceholderSmall2, PlaceholderSmall3],
};

const getRandomPlaceholder = (size) => {
  return placeholders[size][
    Math.floor(Math.random() * placeholders[size].length)
  ];
};

export const placeholder = {
  getRandomPlaceholder: getRandomPlaceholder,
};
