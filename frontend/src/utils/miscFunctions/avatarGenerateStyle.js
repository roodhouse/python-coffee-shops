import randomColorGenerator from "./randomColorGenerator";
import { userPatch } from "../sendToDatabase/userAPI/userPatch";

const randomColor = randomColorGenerator;

export default function avatarGenerateStyle(user, userId, pic, index, comment, name) {
  let avatarStyle;
  if (user) {
    console.log('user is:', user)
    console.log('pic is', pic)
    let initial = document.getElementById(`${index}-${name}-Avatar`);
    if (pic === null) {
      let userStyle = user.split("")[0];
      if (initial) {
        initial.classList.add(
          "text-center",
          "capitalize",
          "rounded-[50%]",
          "text-white",
          "text-2xl",
          "flex",
          "justify-center",
          "items-center"
        );

        // add random bg color
        const randomBgColor = randomColor();
        initial.classList.add(`bg-${randomBgColor}`);
        try {
          userPatch(userId, randomBgColor);
        } catch (error) {
          console.error("Error saving color to db", error);
        }
        initial.innerHTML = userStyle;
        avatarStyle = "";
        return avatarStyle;
      }
    } else {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (initial) {
        if (urlRegex.test(pic)) {
          avatarStyle = `url("${pic}")`;
          initial.innerHTML = "";
          return avatarStyle
        } else {
          let userStyle = user.split("")[0];
          initial.classList.add(
            `bg-${pic}`,
            "text-center",
            "capitalize",
            "rounded-[50%]",
            "text-white",
            "text-2xl",
            "flex",
            "justify-center",
            "items-center"
          );
          initial.innerHTML = userStyle;
          avatarStyle = "";
        }
      }
    }
  } else {
    console.log('user is not')
  }
  return avatarStyle;
}
