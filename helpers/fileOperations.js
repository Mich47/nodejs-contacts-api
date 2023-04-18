const path = require("path");
const fs = require("fs").promises;

const deleteFile = async (fullFilePath) => {
  try {
    await fs.unlink(fullFilePath);
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

const getAbsolutePath = (id, filePath) => {
  const fileName = path.basename(filePath);

  const relativePath = path.join("public", "avatars", `${id}`, fileName);

  const absolutePath = path.join(process.cwd(), relativePath);

  return absolutePath;
};

module.exports = { getAbsolutePath, deleteFile };
