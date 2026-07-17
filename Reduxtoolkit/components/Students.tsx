import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Form, Input, InputNumber, Modal, Table } from "antd"
import { useSelector, useDispatch } from "react-redux"
import type { SelectorType } from "../redux/store"
import { deleteStudent, updateStudent, type StudentInterface, resetStudents } from "../redux/slices/student-slice"
import { useState } from "react"

const Students = () => {
  const [open, setOpen] = useState(false)
  const [studentForm] = Form.useForm()
  const studentSlice = useSelector((res: SelectorType)=>res.studentSlice)
  const dispatch = useDispatch()
  const [editId, setEditId] = useState<number | null>(null)

  const handleDeleteStudent = (id: number)=>{
    dispatch(deleteStudent({id: id}))
  }

  const handleEditStudent = (item: StudentInterface)=>{
    setEditId(item.id)
    setOpen(true)
    studentForm.setFieldsValue(item)
  }
  
  const columns = [
    {
      title: 'Student`s name',
      dataIndex: "fullname",
      key: "fullname"
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (item: any)=>(
        <div className="space-x-4">
          <Button icon={<EditOutlined />} type="primary" className="!bg-green-400" onClick={()=>handleEditStudent(item)} />
          <Button icon={<DeleteOutlined />} type="primary" className="!bg-rose-400" onClick={()=>handleDeleteStudent(item.id)} />
        </div>
      )
    }
  ]

  const saveStudent = (value: StudentInterface)=>{
    if(!editId)
      return

    value.id = editId
    handleClose()
    dispatch(updateStudent(value))
  }

  const handleClose = ()=>{
    setOpen(false)
    studentForm.resetFields()
  }

  return (
    <div className="w-8/12 mx-auto py-16 space-y-12">
      <h1 className="text-4xl font-bold">Redux App</h1>
      <Button type="primary" onClick={()=>dispatch(resetStudents())}>Reset all data</Button>
      <Table 
        columns={columns}
        dataSource={studentSlice}
        rowKey={'id'}
      />
      <Modal open={open} footer={null} onCancel={handleClose}>
        <Form layout="vertical" onFinish={saveStudent} form={studentForm}>
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
              <Button size="large" htmlType="submit" type="primary" danger icon={<SaveOutlined />}>Save changes</Button>
            </Form.Item>
          </Form>
      </Modal>
    </div>
  )
}

export default Students