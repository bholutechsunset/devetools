import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, InputNumber, message } from "antd"
import { createStudent } from "../redux/slices/student-slice"
import { useDispatch } from "react-redux"
import '@ant-design/v5-patch-for-react-19';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleStudent = (values: any)=>{
    values.id = Date.now()
    dispatch(createStudent(values))
    navigate("/students")
  }

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <Card className="w-1/2" hoverable title={<h1 className="text-xl">Add a new student</h1>}>
          <Form layout="vertical" onFinish={handleStudent}>
            <Form.Item name="fullname" label='Student`s name' rules={[{required: true}]}>
              <Input size="large" placeholder="Enter student name" />
            </Form.Item>

            <Form.Item name="email" label='Email' rules={[{required: true, type: 'email'}]}>
              <Input size="large" placeholder="mail@mail.com" />
            </Form.Item>

            <Form.Item name="mobile" label='Mobile' rules={[{required: true, type: 'number'}]}>
              <InputNumber size="large" placeholder="Mobile no" className="!w-full" />
            </Form.Item>

            <Form.Item name="address" label='Address' rules={[{required: true}]}>
              <Input.TextArea rows={5} size="large" placeholder="Your address goes here..." />
            </Form.Item>

            <Form.Item>
              <Button size="large" htmlType="submit" type="primary" danger icon={<ArrowRightOutlined />}>Add now</Button>
            </Form.Item>
          </Form>
      </Card>
    </div>
  )
}

export default Home