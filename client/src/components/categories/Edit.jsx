import { Form, Modal, Table } from "antd";

const Edit = ({ isEditModalOpen, setIsEditModalOpen }) => {
  return (
    <Modal
      title="Kategori İşlemleri"
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form>
        <Table bordered />
      </Form>
    </Modal>
  );
};

export default Edit;
