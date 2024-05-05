import { Avatar, Box, Grid } from "@mui/material";
import { useState } from "react";
import { uploadAvatar } from "~/api";
import {
  CommonTextField,
  CommonUploadFile,
  Heading,
  showToast,
} from "~/common";
import { authKey, statusCode } from "~/constants";
import { setDataLocalStorage, userDataLocalStorage } from "~/utils";

function UploadAvatarField() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { email, avatar, name, userData } = userDataLocalStorage();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setIsLoading(true);
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatar(formData).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        const dataUserReceived = {
          ...userData,
          avatarLink: res?.data,
        };
        setDataLocalStorage(authKey.userData, dataUserReceived);
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Upload avatar fail!", "error");
      }
      setIsLoading(false);
    });
    setFile(null);
  };

  return (
    <Box>
      {email && name && (
        <>
          <Grid align="center">
            <Avatar src={avatar} alt="avatar" />
            <Heading>Upload Avatar</Heading>
          </Grid>
          <CommonTextField label="Email" value={email} disabled={true} />
          <CommonTextField label="Name" value={name} disabled={true} />
        </>
      )}
      <CommonUploadFile
        onChange={handleFileChange}
        file={file}
        onUpload={handleUpload}
        disabled={!file || isLoading}
        progress={isLoading}
      />
    </Box>
  );
}

export default UploadAvatarField;
