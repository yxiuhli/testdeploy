'use client';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

const UploadImageWidget = ({ imageUrl, setImageUrl }) => {
  return (
    <div>
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/signature"
        onSuccess={(result) => {
          if (result?.info?.secure_url) {
            setImageUrl(result.info.secure_url);
          }
        }}
      >
        {({ open }) => (
          <Button icon={<UploadOutlined />} variant='outlined' color='primary' onClick={() => open()}>
            Upload Image
          </Button>
        )}
      </CldUploadWidget>

      {imageUrl && (
        <div className="mt-2">
          <Image
            src={imageUrl}
            alt="Uploaded preview"
            width={100}
            height={100}
            className="object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImageWidget;
