export const FileService = {
  uploadImage: (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    return fetch("mock", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};

// services/uploadService.ts

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("mock", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
