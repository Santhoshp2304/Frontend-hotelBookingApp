import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { Container } from "react-bootstrap";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function AddRoom() {
  
  
  const [media, setMedia] = useState([]);
  const handleUpload = ({ fileList }) => setMedia(fileList);

  const onFinish = async (values) => {
    // setLoading(true);
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    media.forEach((file) => {
      formData.append("media", file.originFileObj);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/apiRoom/addRoom",
        formData
      );
      
      message.success('Room added successfully!');
    } catch (error) {
      message.error('Room adding Failed!')
    }
  };
  return (
    <div>
      <Container className="mt-3 p-2 bs">
        <h3 className="p-2 text-center">ADD ROOM HERE</h3>
        <Form name="add-room" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your room name!" },
            ]}
          >
            <Input placeholder="Name"></Input>
          </Form.Item>
          <Form.Item
            name="location"
            rules={[{ required: true, message: "Please input your location!" }]}
          >
            <Input placeholder="Location"></Input>
          </Form.Item>
          <Form.Item
            name="phonenumber"
            rules={[
              {
                required: true,
                type: Number,
                message: "Please input your phonenumber!",
              },
            ]}
          >
            <Input placeholder="Phonenumber"></Input>
          </Form.Item>
          <Form.Item
            name="maxcount"
            rules={[
              {
                required: true,
                type: Number,
                message: "Please input your maximum count!",
              },
            ]}
          >
            <Input placeholder="Maximum Count"></Input>
          </Form.Item>
          <Form.Item
            name="rentperday"
            rules={[
              {
                required: true,
                type: Number,
                message: "Please input your room rent per day!",
              },
            ]}
          >
            <Input placeholder="Rent per day"></Input>
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please input your description!" }]}
          >
            <Input placeholder="Description"></Input>
          </Form.Item>
          <Form.Item>
            <h3>Upload room photos here</h3>
            <Upload
              fileList={media}
              beforeUpload={() => false}
              onChange={handleUpload}
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload Media</Button>
            </Upload>
          </Form.Item>
          <Form.Item className="d-flex justify-content-center">
            <Button
              className="btn btn-dark"
              htmlType="submit"
              
            >
              Add Room
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
}

export default AddRoom;
