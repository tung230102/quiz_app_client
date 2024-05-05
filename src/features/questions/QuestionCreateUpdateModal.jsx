import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CommonBoxModal,
  CommonButton,
  CommonTextField,
  CommonUploadFile,
  Heading,
  showToast,
} from "~/common";
import { uploadThumbnail } from "~/api";
import { statusCode } from "~/constants";

const QuestionCreateUpdateModal = ({
  open = false,
  onClose = () => {},
  title = "",
  onCreate = () => {},
  dataToUpdate = {},
  onUpdate = () => {},
}) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [thumbnail_link, setThumbnail_link] = useState("");
  const { id, ...updateValues } = dataToUpdate;
  const isUpdateSession = Boolean(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(isUpdateSession ? updateValues : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClickCreate = debounce(onCreate, 100);
  const handleClickUpdate = debounce(onUpdate, 100);
  const handleClickClose = debounce(onClose, 100);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setIsLoading(true);
    if (!file) return;
    const formData = new FormData();
    formData.append("thumbnail", file);

    uploadThumbnail(formData).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        setThumbnail_link(res.data);
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Upload file fail!", "error");
      }
      setIsLoading(false);
    });
    setFile(null);
  };

  const onSubmit = (data) => {
    const newData = { ...data, thumbnail_link };
    if (isUpdateSession) {
      handleClickUpdate(newData);
    } else {
      handleClickCreate(newData);
    }
    setThumbnail_link("");
  };

  return (
    <CommonBoxModal open={open} onClose={handleClickClose}>
      <Heading>{title}</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonTextField
          label="Title"
          name="title"
          register={register}
          errors={errors}
          required
        />
        <CommonTextField
          label="Thumbnail Link"
          name="thumbnail_link"
          register={register}
          disabled={true}
          value={thumbnail_link ? thumbnail_link : updateValues.thumbnail_link}
        />
        <CommonUploadFile
          onChange={handleFileChange}
          file={file}
          onUpload={handleUpload}
          disabled={!file || isLoading}
          progress={isLoading}
        />
        <CommonButton fullWidth sx={{ mt: 1 }}>
          {isUpdateSession ? "Update" : "Create"}
        </CommonButton>
      </form>
    </CommonBoxModal>
  );
};

export default QuestionCreateUpdateModal;
