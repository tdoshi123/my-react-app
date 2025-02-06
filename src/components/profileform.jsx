import React, { useState } from "react";
import "../styles/profileform.css";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 2 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setImageError("Invalid file type. Please upload a JPG, PNG, or GIF.");
        setImage(null);
        return;
      }

      if (file.size > maxSize) {
        setImageError("File size exceeds 2MB. Please upload a smaller image.");
        setImage(null);
        return;
      }

      setImageError("");
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageError) {
      alert("Please fix the image upload error before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("email", email);
    formData.append("bio", bio);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://web.ics.purdue.edu/~tdoshi/test/send-data.php", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      console.log("Raw response:", text);

      try {
        const data = JSON.parse(text);
        console.log("Success:", data);
        setSuccessMessage("Data submission successful!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        alert(`Error: Server response not valid JSON. Raw response: ${text}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error submitting profile. Check console for details.");
    }
  };

  return (
    <div className="profile-form-container">
      <h2>Profile Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          name="bio"
          placeholder="Some Description"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imageError && <p className="error-message">{imageError}</p>}
        <button type="submit">Submit</button>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default ProfileForm;