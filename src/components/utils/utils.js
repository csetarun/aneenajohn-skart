import { SET_NEWUSER_INFO } from "../utils/constants";

export function getTrimmedTitle(title) {
  if (title.length > 30) {
    let trimmedTitle = title.substr(0, 25);
    trimmedTitle = trimmedTitle.concat("...");
    return trimmedTitle;
  } else return title;
}

export const isAddedInList = (_id, list) => {
  const itemFound = list?.find((item) => item._id === _id);
  return itemFound;
};

export const toggleActive = (isSelected, setSelected) =>
  setSelected(!isSelected);
