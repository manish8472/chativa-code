export const reduceSize = (name, length = 25) => {
  if (name.length > length) {
    return name.slice(0, length) + "...";
  }
  return name;
};

export const getFileExtension = (filename) => {
  const parts = filename.split(".");
  return parts[parts.length - 1];
}

export const formatTimeFromTimestamp = (timestamp)=> {
  const date = new Date(timestamp);

  // Extract hours and minutes from the date
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Pad minutes with leading zero if less than 10
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Return the formatted time in "HH:MM" format
  return `${hours}:${minutes}`;
}

export const formatDateFromTimestamp = (timestamp) =>{
  const date = new Date(timestamp); // Convert the string to a Date object

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Format the date as DD-MM-YYYY
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

export const DateMatched = (timestamp1, timestamp2) =>{
  return formatDateFromTimestamp(timestamp1) !== formatDateFromTimestamp(timestamp2);
}

export const formatTimestamp = (timestamp)=> {
    const date = new Date(timestamp);  // Convert the string timestamp to a Date object
    const now = new Date();  // Get the current date

    // Helper function to format date as DD-MM-YYYY
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Check if the timestamp is for today
    if (date.toDateString() === now.toDateString()) {
        return "Today";
    }

    // Check if the timestamp is for yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);  // Go back one day
    if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    // Otherwise, return the formatted date
    return formatDate(date);
}

export const downloadMedia = async (message) => {
  try {
    fetch(message.fileUrl)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;

        // the filename you want
        a.download = "" + message.message + "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) =>
        console.log("Error while downloading the image ", error)
      );
  } catch (error) {
    console.log("Error while downloading the image ", error);
  }
};


export const moveConversationToTop = (chatContacts, conversationId) =>{
  // Find the index of the object with the matching conversationId
  const index = chatContacts.findIndex((obj) => obj.conversationId === conversationId);

  // If the conversationId is found in the array
  if (index !== -1) {
    // Remove the object from its current position
    const [matchedObject] = chatContacts.splice(index, 1);

    // Place the matched object at the beginning of the array
    chatContacts.unshift(matchedObject);
  }

  // Return the updated array
  return chatContacts;
}
