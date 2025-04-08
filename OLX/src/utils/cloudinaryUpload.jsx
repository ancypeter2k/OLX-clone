export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "OLX-clone");
  
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyokti6yp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Cloudinary Error: ${data.error.message}`);
      }
  
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };