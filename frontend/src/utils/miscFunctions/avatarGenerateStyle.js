import randomColorGenerator from "./randomColorGenerator";

const randomColor = randomColorGenerator

export default function avatarGenerateStyle(user, pic, index) {
  let avatarStyle;
  if (user) {
    let initial = document.getElementById(`${index}Avatar`);
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
        initial.classList.add(`bg-${randomColor()}`)
        // need to create a random color function
        // need to patch a request that will save the color to the db for the next time
        initial.innerHTML = userStyle;
        avatarStyle = "";
        return avatarStyle
      }
    } else {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (initial) {
        if (urlRegex.test(pic)) {
          avatarStyle = `url("${pic}")`;
          initial.innerHTML = "";
        } else {
          initial.classList.add(`${pic}`);
        }
      }
      return avatarStyle
    }
  }
  return avatarStyle
}
