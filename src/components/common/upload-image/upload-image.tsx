import { Upload } from "antd";
import { Toast } from "../../common/toast/toast";
import { uploadMedia } from "../../../store/media/media-slice";
import { useAppDispatch } from "../../../store/store";
import uploadIcon from "../../../assets/icons/layout/upload-icon.png";

interface Upload {
  showUpload: any;
  setShowUpload: any;
  setProductImage: any;
}
const UploadImage: React.FC<Upload> = ({
  showUpload,
  setShowUpload,
  setProductImage,
}) => {
  const dispatch = useAppDispatch();

  const imageUpload = async (e: any, state?: any) => {
    const file = e?.file;
    delete file?.uid;
    setShowUpload(!showUpload);
    if (showUpload) {
      const res = await dispatch(uploadMedia(file));
      if (res?.meta?.requestStatus == "fulfilled") {
        setProductImage(res?.payload?.data?.fileName);
      } else Toast("Something went wrong", "error");
    }
    // setFile(e.file);
  };
  return (
    <div>
      <Upload
        beforeUpload={() => false}
        onChange={(e) => imageUpload(e)}
        action=""
        listType="picture-card"
        multiple={false}
        maxCount={1}
        showUploadList={{
          showPreviewIcon: false,
        }}
        accept="image/*"
      >
        {showUpload && (
          <div>
            <img src={uploadIcon} alt="" />
          </div>
        )}
      </Upload>
    </div>
  );
};

export default UploadImage;
